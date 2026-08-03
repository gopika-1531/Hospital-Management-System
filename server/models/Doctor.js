import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    doctorName: { type: String, required: true, trim: true },
    specialization: { type: String, required: true, trim: true },
    qualification: { type: String, required: true, trim: true },
    experience: { type: Number, required: true, min: 0 },
    consultationFee: { type: Number, required: true, min: 0 },
    availableDays: [{ type: String }],
    availableTime: { type: String, default: '' },
    profileImage: { type: String, default: '' },
    approved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Doctor = mongoose.model('Doctor', doctorSchema);
export default Doctor;
