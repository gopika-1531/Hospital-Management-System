import Doctor from '../models/Doctor.js';
import User from '../models/User.js';

export const getDoctors = async (req, res, next) => {
  try {
    const { specialization, minFee, maxFee, search } = req.query;
    const filter = { approved: true };

    if (specialization) filter.specialization = { $regex: specialization, $options: 'i' };
    if (minFee || maxFee) filter.consultationFee = {};
    if (minFee) filter.consultationFee.$gte = Number(minFee);
    if (maxFee) filter.consultationFee.$lte = Number(maxFee);
    if (search) filter.doctorName = { $regex: search, $options: 'i' };

    const doctors = await Doctor.find(filter).populate('user', 'name email phone');
    res.json({ success: true, doctors });
  } catch (error) {
    next(error);
  }
};

export const getDoctorById = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate('user', 'name email phone');
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.json({ success: true, doctor });
  } catch (error) {
    next(error);
  }
};

export const createDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.create({ ...req.body, user: req.user._id });
    res.status(201).json({ success: true, doctor });
  } catch (error) {
    next(error);
  }
};

export const updateDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    if (req.user.role !== 'admin' && String(doctor.user) !== String(req.user._id)) return res.status(403).json({ message: 'Not authorized' });

    const updated = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, doctor: updated });
  } catch (error) {
    next(error);
  }
};

export const deleteDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    if (req.user.role !== 'admin' && String(doctor.user) !== String(req.user._id)) return res.status(403).json({ message: 'Not authorized' });

    await Doctor.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Doctor deleted' });
  } catch (error) {
    next(error);
  }
};

export const approveDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    doctor.approved = true;
    await doctor.save();
    res.json({ success: true, doctor });
  } catch (error) {
    next(error);
  }
};

export const listPendingDoctors = async (_req, res, next) => {
  try {
    const doctors = await Doctor.find({ approved: false }).populate('user', 'name email');
    res.json({ success: true, doctors });
  } catch (error) {
    next(error);
  }
};
