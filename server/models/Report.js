import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    reportFile: { type: String, required: true },
    uploadedDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Report = mongoose.model('Report', reportSchema);
export default Report;
