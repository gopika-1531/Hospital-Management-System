import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function DoctorDetailPage() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <div className="text-center py-5"><span className="loading-spinner" /></div>;
  if (!doctor) return <div className="container py-5"><div className="alert alert-danger">Doctor not found.</div></div>;

  return (
    <div className="container py-5">
      <div className="card p-5">
        <h2 className="text-primary fw-bold">{doctor.doctorName}</h2>
        <p className="text-muted">{doctor.specialization}</p>
        <p><strong>Qualification:</strong> {doctor.qualification}</p>
        <p><strong>Experience:</strong> {doctor.experience} years</p>
        <p><strong>Consultation Fee:</strong> ${doctor.consultationFee}</p>
        <p><strong>Available Days:</strong> {doctor.availableDays?.join(', ') || 'Flexible'}</p>
        <p><strong>Available Time:</strong> {doctor.availableTime}</p>
      </div>
    </div>
  );
}
