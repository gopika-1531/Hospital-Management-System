import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const [statsRes, usersRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/appointments/admin/stats`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/users`, { headers: { Authorization: `Bearer ${token}` } }),
        ]);
        setStats(statsRes.data.stats);
        setUsers(usersRes.data.users || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="container py-5 text-center"><span className="loading-spinner" /></div>;

  return (
    <div className="container py-5">
      <div className="row g-4 mb-4">
        <div className="col-md-3"><div className="card p-4"><h6 className="text-muted">Total Doctors</h6><h3 className="fw-bold">{stats?.doctors || 0}</h3></div></div>
        <div className="col-md-3"><div className="card p-4"><h6 className="text-muted">Total Patients</h6><h3 className="fw-bold">{stats?.patients || 0}</h3></div></div>
        <div className="col-md-3"><div className="card p-4"><h6 className="text-muted">Appointments</h6><h3 className="fw-bold">{stats?.appointments || 0}</h3></div></div>
        <div className="col-md-3"><div className="card p-4"><h6 className="text-muted">Revenue</h6><h3 className="fw-bold">₹{stats?.revenue || 0}</h3></div></div>
      </div>

      <div className="card p-4">
        <h4 className="fw-bold text-primary">Welcome, {user?.name}</h4>
        <p className="text-muted">Admin control center for doctors, patients, and appointments.</p>

        <div className="table-responsive mt-3">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((entry) => (
                <tr key={entry._id}>
                  <td>{entry.name}</td>
                  <td>{entry.email}</td>
                  <td><span className="badge bg-primary">{entry.role}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
