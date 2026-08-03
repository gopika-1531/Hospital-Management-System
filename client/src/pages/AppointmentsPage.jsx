import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchAppointments();
  }, []);

  return (
    <div className="container py-5">
      <h2 className="fw-bold text-primary mb-4">My appointments</h2>
      {loading ? <div className="text-center py-5"><span className="loading-spinner" /></div> : (
        <div className="row g-4">
          {appointments.map((appointment) => (
            <div className="col-md-6" key={appointment._id}>
              <div className="card p-4">
                <h5 className="fw-bold">{appointment.doctorId?.doctorName || 'Doctor'}</h5>
                <p className="mb-1"><strong>Date:</strong> {appointment.appointmentDate}</p>
                <p className="mb-1"><strong>Time:</strong> {appointment.appointmentTime}</p>
                <p className="mb-1"><strong>Symptoms:</strong> {appointment.symptoms}</p>
                <span className="badge bg-primary">{appointment.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
