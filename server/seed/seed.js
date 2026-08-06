import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Doctor from '../models/Doctor.js';
import Appointment from '../models/Appointment.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const usersSeedPath = path.join(__dirname, 'users.json');
const doctorsSeedPath = path.join(__dirname, 'doctors.json');
const appointmentsSeedPath = path.join(__dirname, 'appointments.json');

const normalizeStatus = (status) => {
  const normalized = (status || '').toLowerCase();
  switch (normalized) {
    case 'confirmed':
      return 'confirmed';
    case 'completed':
      return 'completed';
    case 'cancelled':
      return 'cancelled';
    case 'pending':
      return 'pending';
    default:
      return 'pending';
  }
};

const main = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/book-a-doctor';

  await mongoose.connect(mongoUri);
  console.log('MongoDB connected for seeding');

  const [usersRaw, doctorsRaw, appointmentsRaw] = await Promise.all([
    fs.readFile(usersSeedPath, 'utf-8'),
    fs.readFile(doctorsSeedPath, 'utf-8'),
    fs.readFile(appointmentsSeedPath, 'utf-8'),
  ]);

  const usersData = JSON.parse(usersRaw);
  const doctorsData = JSON.parse(doctorsRaw);
  const appointmentsData = JSON.parse(appointmentsRaw);

  await Promise.all([
    Appointment.deleteMany({}),
    Doctor.deleteMany({}),
    User.deleteMany({}),
  ]);

  const hashedUsers = await Promise.all(
    usersData.map(async (user) => ({
      ...user,
      password: await bcrypt.hash(user.password, 10),
    }))
  );

  const createdUsers = await User.insertMany(hashedUsers);
  const userIdByEmail = new Map(createdUsers.map((user) => [user.email.toLowerCase(), user._id]));

  const createdDoctors = [];
  const doctorIdByEmail = new Map();

  for (const doctorSeed of doctorsData) {
    const userId = userIdByEmail.get(doctorSeed.email.toLowerCase());
    if (!userId) {
      throw new Error(`No user found for doctor email: ${doctorSeed.email}`);
    }

    const doctorDoc = await Doctor.create({
      user: userId,
      doctorName: doctorSeed.doctorName,
      specialization: doctorSeed.specialization,
      qualification: doctorSeed.qualification,
      experience: doctorSeed.experience,
      consultationFee: doctorSeed.consultationFee,
      availableDays: doctorSeed.availableDays,
      availableTime: doctorSeed.availableTime,
      profileImage: doctorSeed.profileImage,
      approved: doctorSeed.approved,
      rating: doctorSeed.rating,
      about: doctorSeed.about,
    });

    createdDoctors.push(doctorDoc);
    doctorIdByEmail.set(doctorSeed.email.toLowerCase(), doctorDoc._id);
  }

  const appointmentDocs = appointmentsData.map((appointmentSeed) => {
    const patientId = userIdByEmail.get(appointmentSeed.patientEmail.toLowerCase());
    const doctorId = doctorIdByEmail.get(appointmentSeed.doctorEmail.toLowerCase());

    if (!patientId || !doctorId) {
      throw new Error(`Missing patient or doctor mapping for appointment: ${appointmentSeed.patientEmail} -> ${appointmentSeed.doctorEmail}`);
    }

    return {
      patientId,
      doctorId,
      appointmentDate: appointmentSeed.appointmentDate,
      appointmentTime: appointmentSeed.appointmentTime,
      symptoms: appointmentSeed.symptoms,
      status: normalizeStatus(appointmentSeed.status),
    };
  });

  await Appointment.insertMany(appointmentDocs);

  console.log(`Seeded ${createdUsers.length} users, ${createdDoctors.length} doctors, and ${appointmentDocs.length} appointments successfully.`);
};

main()
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
