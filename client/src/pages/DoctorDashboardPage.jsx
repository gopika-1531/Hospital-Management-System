import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function DoctorDashboardPage() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/appointments`, { headers: { Authorization: `Bearer ${token}` } });
        setAppointments(res.data.appointments || []);
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
      <div className="card p-4 mb-4">
        <h3 className="fw-bold text-primary">Welcome Dr. {user?.name}</h3>
        <p className="text-muted mb-0">Manage your appointments and patient care from one professional dashboard.</p>
      </div>

      <div className="row g-4">
        {appointments.map((appointment) => (
          <div className="col-md-6" key={appointment._id}>
            <div className="card p-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="fw-bold mb-0">{appointment.patientId?.name || 'Patient'}</h5>
                <span className="badge bg-primary">{appointment.status}</span>
              </div>
              <p className="mb-1"><strong>Date:</strong> {appointment.appointmentDate}</p>
              <p className="mb-1"><strong>Time:</strong> {appointment.appointmentTime}</p>
              <p className="mb-0"><strong>Symptoms:</strong> {appointment.symptoms}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
