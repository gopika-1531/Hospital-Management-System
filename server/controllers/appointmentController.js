import Appointment from '../models/Appointment.js';
import Doctor from '../models/Doctor.js';
import User from '../models/User.js';

export const getAppointments = async (req, res, next) => {
  try {
    const query = req.user.role === 'doctor'
      ? { doctorId: req.user._id }
      : req.user.role === 'patient'
        ? { patientId: req.user._id }
        : {};

    const appointments = await Appointment.find(query)
      .populate({ path: 'doctorId', populate: { path: 'user', select: 'name email phone' } })
      .populate('patientId', 'name email phone');

    res.json({ success: true, appointments });
  } catch (error) {
    next(error);
  }
};

export const createAppointment = async (req, res, next) => {
  try {
    const { doctorId, appointmentDate, appointmentTime, symptoms } = req.body;
    const doctorProfile = await Doctor.findById(doctorId);
    if (!doctorProfile) return res.status(404).json({ message: 'Doctor not found' });

    const appointment = await Appointment.create({
      patientId: req.user._id,
      doctorId,
      appointmentDate,
      appointmentTime,
      symptoms,
      status: 'pending',
    });

    const populated = await Appointment.findById(appointment._id)
      .populate({ path: 'doctorId', populate: { path: 'user', select: 'name email phone' } })
      .populate('patientId', 'name email phone');

    res.status(201).json({ success: true, appointment: populated });
  } catch (error) {
    next(error);
  }
};

export const updateAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    if (req.user.role !== 'admin' && String(appointment.patientId) !== String(req.user._id) && String(appointment.doctorId) !== String(req.user._id)) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updated = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate({ path: 'doctorId', populate: { path: 'user', select: 'name email phone' } })
      .populate('patientId', 'name email phone');
    res.json({ success: true, appointment: updated });
  } catch (error) {
    next(error);
  }
};

export const deleteAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    if (req.user.role !== 'admin' && String(appointment.patientId) !== String(req.user._id)) return res.status(403).json({ message: 'Not authorized' });

    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Appointment deleted' });
  } catch (error) {
    next(error);
  }
};

export const updateAppointmentStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    if (req.user.role !== 'admin' && String(appointment.doctorId) !== String(req.user._id)) return res.status(403).json({ message: 'Not authorized' });

    appointment.status = status;
    await appointment.save();

    const populated = await Appointment.findById(appointment._id)
      .populate({ path: 'doctorId', populate: { path: 'user', select: 'name email phone' } })
      .populate('patientId', 'name email phone');

    res.json({ success: true, appointment: populated });
  } catch (error) {
    next(error);
  }
};

export const getAdminStats = async (_req, res, next) => {
  try {
    const [doctors, patients, appointments] = await Promise.all([
      Doctor.countDocuments({}),
      User.countDocuments({ role: 'patient' }),
      Appointment.countDocuments({}),
    ]);

    const revenue = await Appointment.aggregate([
      { $lookup: { from: 'doctors', localField: 'doctorId', foreignField: '_id', as: 'doctor' } },
      { $unwind: '$doctor' },
      { $group: { _id: null, total: { $sum: '$doctor.consultationFee' } } },
    ]);

    res.json({ success: true, stats: { doctors, patients, appointments, revenue: revenue[0]?.total || 0 } });
  } catch (error) {
    next(error);
  }
};
