import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    phone: { type: String, default: '' },
    gender: { type: String, default: '' },
    dob: { type: Date, default: null },
    age: { type: Number, min: 0, default: null },
    bloodGroup: { type: String, default: '' },
    address: { type: String, default: '' },
    role: { type: String, enum: ['patient', 'doctor', 'admin'], default: 'patient' },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;
