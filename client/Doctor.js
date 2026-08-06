import React from 'react';
import { FaUserMd, FaGraduationCap, FaHourglassHalf, FaMoneyBillWave, FaCalendarAlt, FaClock } from 'react-icons/fa';

const Doctor = ({ doctor }) => {
  const {
    name = 'Dr. Name',
    specialization = 'Specialization',
    qualification = 'Qualification',
    experience = '0 years',
    fee = '0',
    availableDays = [],
    availableTime = 'N/A',
    profileImage = 'https://via.placeholder.com/400x300?text=Doctor+Photo',
  } = doctor || {};

  return (
    <div className="card h-100 shadow-sm">
      <img src={profileImage} className="card-img-top object-fit-cover" alt={`${name} profile`} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title mb-1">{name}</h5>
        <p className="text-secondary mb-3">{specialization}</p>

        <div className="mb-3">
          <div className="d-flex align-items-center mb-2">
            <FaGraduationCap className="me-2 text-primary" />
            <span>{qualification}</span>
          </div>
          <div className="d-flex align-items-center mb-2">
            <FaHourglassHalf className="me-2 text-primary" />
            <span>{experience} experience</span>
          </div>
          <div className="d-flex align-items-center mb-2">
            <FaMoneyBillWave className="me-2 text-primary" />
            <span>Consultation fee: ₹{fee}</span>
          </div>
          <div className="d-flex align-items-center mb-2 flex-wrap">
            <FaCalendarAlt className="me-2 text-primary" />
            <span>{availableDays.length ? availableDays.join(', ') : 'Not available'}</span>
          </div>
          <div className="d-flex align-items-center">
            <FaClock className="me-2 text-primary" />
            <span>{availableTime}</span>
          </div>
        </div>

        <button type="button" className="btn btn-primary mt-auto">
          <FaUserMd className="me-2" />
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default Doctor;