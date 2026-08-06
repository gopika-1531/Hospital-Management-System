import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/appointments`, { headers: { Authorization: `Bearer ${token}` } });
      setAppointments(res.data.appointments || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const cancelAppointment = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/appointments/${id}/status`, { status: 'cancelled' }, { headers: { Authorization: `Bearer ${token}` } });
      setMessage('Appointment cancelled.');
      fetchAppointments();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Unable to cancel appointment.');
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold text-primary mb-1">My appointments</h2>
          <p className="text-muted mb-0">Track upcoming visits and appointment updates.</p>
        </div>
      </div>
      {message && <div className="alert alert-info">{message}</div>}
      {loading ? <div className="text-center py-5"><span className="loading-spinner" /></div> : (
        <div className="row g-4">
          {appointments.map((appointment) => (
            <div className="col-md-6" key={appointment._id}>
              <div className="card p-4">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h5 className="fw-bold mb-0">{appointment.doctorId?.doctorName || appointment.doctorId?.user?.name || 'Doctor'}</h5>
                  <span className="badge bg-primary">{appointment.status}</span>
                </div>
                <p className="mb-1"><strong>Date:</strong> {appointment.appointmentDate}</p>
                <p className="mb-1"><strong>Time:</strong> {appointment.appointmentTime}</p>
                <p className="mb-1"><strong>Symptoms:</strong> {appointment.symptoms}</p>
                {appointment.status === 'pending' && <button className="btn btn-outline-danger btn-sm mt-2" onClick={() => cancelAppointment(appointment._id)}>Cancel</button>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
