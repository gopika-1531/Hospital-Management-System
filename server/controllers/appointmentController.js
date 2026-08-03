import Appointment from '../models/Appointment.js';
import Doctor from '../models/Doctor.js';

export const getAppointments = async (req, res, next) => {
  try {
    const query = req.user.role === 'doctor' ? { doctorId: req.user._id } : req.user.role === 'patient' ? { patientId: req.user._id } : {};
    const appointments = await Appointment.find(query).populate('doctorId').populate('patientId', 'name email');
    res.json({ success: true, appointments });
  } catch (error) {
    next(error);
  }
};

export const createAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.create({ ...req.body, patientId: req.user._id });
    res.status(201).json({ success: true, appointment });
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

    const updated = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
