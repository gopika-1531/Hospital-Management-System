import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaHeartbeat } from 'react-icons/fa';

export default function LoginPage({ showToast }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Please enter a valid email address.';
    if (form.password.length < 6) nextErrors.password = 'Password must be at least 6 characters.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await login(form);
      showToast?.('Logged in successfully', 'success');
      if (response.user.role === 'doctor') navigate('/doctor-dashboard');
      else if (response.user.role === 'admin') navigate('/admin-dashboard');
      else navigate('/dashboard');
    } catch (error) {
      showToast?.(error.response?.data?.message || 'Login failed', 'danger');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="row g-0 rounded-5 overflow-hidden shadow-lg auth-card">
            <div className="col-lg-5 p-4 p-lg-5 d-flex flex-column justify-content-center text-white bg-gradient">
              <div className="d-flex align-items-center gap-2 mb-3">
                <FaHeartbeat size={24} />
                <h4 className="fw-bold mb-0">Book A Doctor</h4>
              </div>
              <h2 className="fw-bold">Welcome Back</h2>
              <p className="text-light">Sign in to manage your appointments and healthcare records.</p>
              <div className="rounded-4 bg-white/15 p-3 border border-white/20 mt-3">
                <p className="mb-0 small">Secure access for patients, doctors, and care teams.</p>
              </div>
            </div>
            <div className="col-lg-7 p-4 p-lg-5 bg-white">
              <h3 className="fw-bold text-dark">Login to your account</h3>
              <p className="text-muted">Access your dashboard and continue your care journey.</p>
              <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                  <label className="form-label fw-semibold">Email</label>
                  <div className="input-group">
                    <span className="input-group-text"><FaEnvelope /></span>
                    <input className={`form-control ${errors.email ? 'is-invalid' : ''}`} type="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter your email" />
                  </div>
                  {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Password</label>
                  <div className="input-group">
                    <span className="input-group-text"><FaLock /></span>
                    <input className={`form-control ${errors.password ? 'is-invalid' : ''}`} type={showPassword ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange} placeholder="Enter your password" />
                    <button type="button" className="btn btn-outline-secondary" onClick={() => setShowPassword((prev) => !prev)}>
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <a href="#" className="text-primary small text-decoration-none">Forgot Password?</a>
                </div>
                <button className="btn btn-primary w-100 py-2" disabled={loading}>{loading ? 'Signing in...' : 'Login'}</button>
              </form>
              <p className="mt-3 mb-0 text-center">New here? <Link to="/register" className="text-primary fw-semibold">Create an account</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
