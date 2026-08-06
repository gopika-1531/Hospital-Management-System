import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function DoctorDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState({ appointmentDate: '', appointmentTime: '', symptoms: '' });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/doctors/${id}`);
        setDoctor(res.data.doctor);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  const handleBook = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    setSubmitting(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/appointments`, { doctorId: doctor._id, ...booking }, { headers: { Authorization: `Bearer ${token}` } });
      setMessage('Appointment request created successfully.');
      setBooking({ appointmentDate: '', appointmentTime: '', symptoms: '' });
    } catch (error) {
      setMessage(error.response?.data?.message || 'Unable to book appointment.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center py-5"><span className="loading-spinner" /></div>;
  if (!doctor) return <div className="container py-5"><div className="alert alert-danger">Doctor not found.</div></div>;

  return (
    <div className="container py-5">
      <div className="row g-4">
        <div className="col-lg-7">
          <div className="card p-5">
            <h2 className="text-primary fw-bold">{doctor.doctorName}</h2>
            <p className="text-muted">{doctor.specialization}</p>
            <p><strong>Qualification:</strong> {doctor.qualification}</p>
            <p><strong>Experience:</strong> {doctor.experience} years</p>
            <p><strong>Consultation Fee:</strong> ₹{doctor.consultationFee}</p>
            <p><strong>Available Days:</strong> {doctor.availableDays?.join(', ') || 'Flexible'}</p>
            <p><strong>Available Time:</strong> {doctor.availableTime}</p>
            <p className="text-muted">{doctor.about}</p>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="card p-4">
            <h4 className="fw-bold text-primary">Book appointment</h4>
            <form onSubmit={handleBook} className="mt-3">
              <div className="mb-3">
                <label className="form-label">Date</label>
                <input className="form-control" type="date" value={booking.appointmentDate} onChange={(e) => setBooking({ ...booking, appointmentDate: e.target.value })} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Time</label>
                <input className="form-control" type="time" value={booking.appointmentTime} onChange={(e) => setBooking({ ...booking, appointmentTime: e.target.value })} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Symptoms</label>
                <textarea className="form-control" rows="4" value={booking.symptoms} onChange={(e) => setBooking({ ...booking, symptoms: e.target.value })} required />
              </div>
              <button className="btn btn-primary w-100" disabled={submitting}>{submitting ? 'Booking...' : 'Confirm booking'}</button>
            </form>
            {message && <div className="alert alert-info mt-3 mb-0">{message}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
