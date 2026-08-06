import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaStar, FaClock, FaUserMd } from 'react-icons/fa';

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [specialization, setSpecialization] = useState('all');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/doctors`);
        setDoctors(res.data.doctors || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const specializations = ['all', ...new Set(doctors.map((doctor) => doctor.specialization).filter(Boolean))];

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch = `${doctor.doctorName} ${doctor.specialization}`.toLowerCase().includes(search.toLowerCase());
    const matchesSpecialization = specialization === 'all' || doctor.specialization === specialization;
    return matchesSearch && matchesSpecialization;
  });

  const defaultImages = [
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&h=400&q=80',
    'https://images.unsplash.com/photo-1587502536263-835f6b2c9d3b?auto=format&fit=crop&w=400&h=400&q=80',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&h=400&q=80',
    'https://images.unsplash.com/photo-1531123414780-fc5f2f8c8a4b?auto=format&fit=crop&w=400&h=400&q=80',
    'https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=400&h=400&q=80',
    'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=400&h=400&q=80',
  ];

  const specializationImages = {
    cardiology: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&h=400&q=80',
    dermatology: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&h=400&q=80',
    neurology: 'https://images.unsplash.com/photo-1551601651-5f91c8de7f71?auto=format&fit=crop&w=400&h=400&q=80',
    pediatrics: 'https://images.unsplash.com/photo-1601386775107-5e8f2f6b7b6e?auto=format&fit=crop&w=400&h=400&q=80',
    orthopedics: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&h=400&q=80',
    gynecology: 'https://images.unsplash.com/photo-1524504388940-6f8d9b8f3f4e?auto=format&fit=crop&w=400&h=400&q=80',
    psychiatry: 'https://images.unsplash.com/photo-1524504388940-9b1b2b1b3c3d?auto=format&fit=crop&w=400&h=400&q=80',
    ent: 'https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=400&h=400&q=80',
    dentist: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&h=400&q=80',
    ophthalmology: 'https://images.unsplash.com/photo-1580281657521-7e1b6ddc7b36?auto=format&fit=crop&w=400&h=400&q=80',
    default: defaultImages[0],
  };

  return (
    <div className="container py-5">
      <div className="card border-0 shadow-sm p-4 mb-4">
        <div className="row g-3 align-items-end">
          <div className="col-lg-6">
            <h2 className="fw-bold text-primary mb-2">Find your doctor</h2>
            <p className="text-muted mb-0">Search by doctor name or specialty and book a consultation in just a few clicks.</p>
          </div>
          <div className="col-lg-3">
            <label className="form-label fw-semibold">Search</label>
            <input className="form-control" placeholder="Search doctors" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="col-lg-3">
            <label className="form-label fw-semibold">Specialization</label>
            <select className="form-select" value={specialization} onChange={(e) => setSpecialization(e.target.value)}>
              {specializations.map((option) => (
                <option key={option} value={option}>{option === 'all' ? 'All Specializations' : option}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5"><span className="loading-spinner" /></div>
      ) : (
        <div className="row g-4">
          {filteredDoctors.length === 0 ? (
            <div className="col-12">
              <div className="card border-0 shadow-sm p-5 text-center">
                <h5 className="fw-semibold text-dark">No doctors found</h5>
                <p className="text-muted mb-0">Try a different name or specialization to explore available care options.</p>
              </div>
            </div>
          ) : filteredDoctors.map((doctor, idx) => (
            <div className="col-md-6 col-lg-4" key={doctor._id}>
              <div className="card border-0 h-100 shadow-sm overflow-hidden hover-card">
                <div className="d-flex justify-content-center pt-4">
                  {(() => {
                    const specKey = (doctor.specialization || '').toLowerCase().replace(/\s+/g, '') || 'default';
                    const specImage = specializationImages[specKey] || specializationImages[doctor.specialization?.toLowerCase()] || null;
                    const src = doctor.profileImage || specImage || defaultImages[idx % defaultImages.length];
                    return (
                      <img src={src} alt={doctor.doctorName} className="doctor-photo" />
                    );
                  })()}
                </div>
                <div className="card-body p-4">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <FaUserMd className="text-primary" />
                    <h5 className="fw-bold text-dark mb-0">{doctor.doctorName}</h5>
                  </div>
                  <p className="text-primary fw-semibold mb-2">{doctor.specialization}</p>
                  <p className="text-muted mb-2"><strong>Experience:</strong> {doctor.experience} years</p>
                  <div className="d-flex align-items-center gap-2 text-warning mb-2">
                    <FaStar /> <span className="text-dark">{doctor.rating || 4.8}</span>
                  </div>
                  <div className="d-flex align-items-center gap-2 text-muted mb-3">
                    <FaClock /> <span>{doctor.availableTime || 'Flexible schedule'}</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-semibold text-primary">${doctor.consultationFee}</span>
                    <Link to={`/doctors/${doctor._id}`} className="btn btn-primary btn-sm">Book Appointment</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
