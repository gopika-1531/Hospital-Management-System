import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaEnvelope, FaLock, FaHeartbeat } from 'react-icons/fa';

export default function RegisterPage({ showToast }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', phone: '', role: 'patient' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Please enter your full name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Please enter a valid email address.';
    if (form.password.length < 6) nextErrors.password = 'Password must be at least 6 characters.';
    if (form.confirmPassword !== form.password) nextErrors.confirmPassword = 'Passwords do not match.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await register({ ...form, phone: form.phone || '' });
      showToast?.('Account created successfully', 'success');
      if (response.user.role === 'doctor') navigate('/doctor-dashboard');
      else if (response.user.role === 'admin') navigate('/admin-dashboard');
      else navigate('/dashboard');
    } catch (error) {
      showToast?.(error.response?.data?.message || 'Registration failed', 'danger');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="row g-0 rounded-5 overflow-hidden shadow-lg auth-card">
            <div className="col-lg-5 p-4 p-lg-5 bg-gradient text-white d-flex flex-column justify-content-center">
              <div className="d-flex align-items-center gap-2 mb-3">
                <FaHeartbeat size={24} />
                <h4 className="fw-bold mb-0">Create Account</h4>
              </div>
              <h2 className="fw-bold">Join Book A Doctor</h2>
              <p className="text-light">Open a secure account for appointments, records, and trusted care.</p>
              <div className="rounded-4 bg-white/15 p-3 border border-white/20 mt-3">
                <p className="mb-0 small">Trusted by patients and healthcare professionals.</p>
              </div>
            </div>
            <div className="col-lg-7 p-4 p-lg-5 bg-white">
              <h3 className="fw-bold text-dark">Create your account</h3>
              <p className="text-muted">Start booking appointments and managing healthcare smoothly.</p>
              <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                  <label className="form-label fw-semibold">Full Name</label>
                  <div className="input-group">
                    <span className="input-group-text"><FaUser /></span>
                    <input className={`form-control ${errors.name ? 'is-invalid' : ''}`} name="name" value={form.name} onChange={handleChange} placeholder="Enter your name" />
                  </div>
                  {errors.name && <div className="invalid-feedback d-block">{errors.name}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Email</label>
                  <div className="input-group">
                    <span className="input-group-text"><FaEnvelope /></span>
                    <input className={`form-control ${errors.email ? 'is-invalid' : ''}`} type="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter your email" />
                  </div>
                  {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
                </div>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Password</label>
                    <div className="input-group">
                      <span className="input-group-text"><FaLock /></span>
                      <input className={`form-control ${errors.password ? 'is-invalid' : ''}`} type="password" name="password" value={form.password} onChange={handleChange} placeholder="Create password" />
                    </div>
                    {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Confirm Password</label>
                    <div className="input-group">
                      <span className="input-group-text"><FaLock /></span>
                      <input className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm password" />
                    </div>
                    {errors.confirmPassword && <div className="invalid-feedback d-block">{errors.confirmPassword}</div>}
                  </div>
                </div>
                <div className="mt-3">
                  <label className="form-label fw-semibold">Role</label>
                  <select className="form-select" name="role" value={form.role} onChange={handleChange}>
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                  </select>
                </div>
                <button className="btn btn-primary w-100 py-2 mt-4" disabled={loading}>{loading ? 'Creating account...' : 'Register'}</button>
              </form>
              <p className="mt-3 mb-0 text-center">Already have an account? <Link to="/login" className="text-primary fw-semibold">Login</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
