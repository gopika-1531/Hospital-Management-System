import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Doctor from '../models/Doctor.js';

const signToken = (user) => jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

const buildUserResponse = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  phone: user.phone,
  gender: user.gender,
  age: user.age,
  bloodGroup: user.bloodGroup,
  address: user.address,
  dob: user.dob,
});

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, phone, gender, dob, role, age, bloodGroup, address } = req.body;
    const normalizedEmail = email?.toLowerCase().trim();
    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    const safeRole = role === 'doctor' ? 'doctor' : 'patient';
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email: normalizedEmail,
      password: hash,
      phone,
      gender,
      dob,
      age,
      bloodGroup,
      address,
      role: safeRole,
    });

    if (safeRole === 'doctor') {
      await Doctor.create({
        user: user._id,
        doctorName: name,
        specialization: 'General Physician',
        qualification: 'MBBS',
        experience: 3,
        consultationFee: 700,
        availableDays: ['Monday', 'Wednesday', 'Friday'],
        availableTime: '09:00 AM - 05:00 PM',
        approved: false,
        rating: 4.5,
        about: 'New doctor joining the platform.',
      });
    }

    res.status(201).json({
      success: true,
      token: signToken(user),
      user: buildUserResponse(user),
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email?.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

    res.json({
      success: true,
      token: signToken(user),
      user: buildUserResponse(user),
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    const doctorProfile = user.role === 'doctor' ? await Doctor.findOne({ user: user._id }) : null;
    res.json({ success: true, user: buildUserResponse(user), doctorProfile });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { name, phone, gender, dob, age, bloodGroup, address } = req.body;
    const update = {};
    if (name) update.name = name;
    if (phone !== undefined) update.phone = phone;
    if (gender) update.gender = gender;
    if (dob !== undefined) update.dob = dob;
    if (age !== undefined) update.age = age;
    if (bloodGroup !== undefined) update.bloodGroup = bloodGroup;
    if (address !== undefined) update.address = address;

    const user = await User.findByIdAndUpdate(req.user._id, update, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ success: true, user: buildUserResponse(user) });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const valid = await bcrypt.compare(currentPassword, user.password);
    if (!valid) return res.status(401).json({ message: 'Current password is incorrect' });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    next(error);
  }
};
