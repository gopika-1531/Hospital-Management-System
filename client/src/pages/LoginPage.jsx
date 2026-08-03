import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage({ showToast }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form);
      showToast?.('Logged in successfully', 'success');
      navigate('/dashboard');
    } catch (error) {
      showToast?.(error.response?.data?.message || 'Login failed', 'danger');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4">
            <h2 className="text-primary fw-bold">Login</h2>
            <form onSubmit={handleSubmit} className="mt-3">
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input className="form-control" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input className="form-control" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
              </div>
              <button className="btn btn-primary w-100" disabled={loading}>{loading ? 'Signing in...' : 'Login'}</button>
            </form>
            <p className="mt-3 mb-0">Need an account? <Link to="/register">Create one</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}
