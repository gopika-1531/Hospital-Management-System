import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

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

  const filteredDoctors = doctors.filter((doctor) => {
    const query = search.toLowerCase();
    return doctor.doctorName.toLowerCase().includes(query) || doctor.specialization.toLowerCase().includes(query);
  });

  return (
    <div className="container py-5">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
        <div>
          <h2 className="fw-bold text-primary">Available doctors</h2>
          <p className="text-muted mb-0">Search by name or specialty.</p>
        </div>
        <input className="form-control w-auto mt-3 mt-md-0" placeholder="Search doctors" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      {loading ? <div className="text-center py-5"><span className="loading-spinner" /></div> : (
        <div className="row g-4">
          {filteredDoctors.map((doctor) => (
            <div className="col-md-6 col-lg-4" key={doctor._id}>
              <div className="card h-100 p-4">
                <h5 className="fw-bold text-primary">{doctor.doctorName}</h5>
                <p className="mb-1"><strong>Specialization:</strong> {doctor.specialization}</p>
                <p className="mb-1"><strong>Experience:</strong> {doctor.experience} years</p>
                <p className="mb-1"><strong>Fee:</strong> ${doctor.consultationFee}</p>
                <p className="text-muted">{doctor.availableDays?.join(', ') || 'Flexible schedule'}</p>
                <Link to={`/doctors/${doctor._id}`} className="btn btn-primary mt-3">View Profile</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
