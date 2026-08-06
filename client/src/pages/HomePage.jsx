import { Link } from 'react-router-dom';
import { FaHeartbeat, FaUserMd, FaShieldAlt, FaCalendarCheck, FaHeadset, FaVideo, FaFileMedical, FaPhoneAlt, FaStar } from 'react-icons/fa';

const services = [
  { icon: <FaVideo className="text-primary" size={22} />, title: 'Online Consultation', description: 'Connect with doctors in real time from the comfort of your home.' },
  { icon: <FaCalendarCheck className="text-primary" size={22} />, title: 'Appointment Booking', description: 'Reserve visits instantly and manage schedules with simple reminders.' },
  { icon: <FaFileMedical className="text-primary" size={22} />, title: 'Medical Records', description: 'Upload and securely maintain reports in one centralized dashboard.' },
  { icon: <FaPhoneAlt className="text-primary" size={22} />, title: 'Emergency Support', description: 'Get fast help and urgent guidance whenever every minute matters.' },
];

const stats = [
  { value: '500+', label: 'Doctors' },
  { value: '10,000+', label: 'Patients' },
  { value: '24/7', label: 'Support' },
];

export default function HomePage() {
  return (
    <>
      <section className="hero-section py-5 py-lg-6">
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-7 text-white">
              <div className="d-inline-flex align-items-center gap-2 rounded-pill bg-white/15 px-3 py-2 border border-white/20 mb-4">
                <FaHeartbeat /> Trusted healthcare platform
              </div>
              <h1 className="display-4 fw-bold mb-3">Your Health, Our Priority</h1>
              <p className="lead text-light mb-4">Book appointments with trusted doctors anytime, anywhere.</p>
              <div className="d-flex flex-wrap gap-3">
                <Link to="/doctors" className="btn btn-light btn-lg fw-semibold px-4">Book Appointment</Link>
                <Link to="/register" className="btn btn-outline-light btn-lg fw-semibold px-4">Create Account</Link>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="hero-card p-4 p-lg-4 shadow-lg">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <div>
                    <p className="text-muted mb-1">Today’s overview</p>
                    <h5 className="fw-bold text-dark mb-0">Dr. Maya Rao</h5>
                    <p className="text-primary mb-0">Cardiology Specialist</p>
                  </div>
                  <div className="rounded-circle bg-primary text-white p-3"><FaUserMd size={24} /></div>
                </div>
                <div className="row g-3">
                  <div className="col-6">
                    <div className="rounded-4 bg-light p-3">
                      <p className="small text-muted mb-1">Next slot</p>
                      <p className="fw-bold mb-0">10:30 AM</p>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="rounded-4 bg-light p-3">
                      <p className="small text-muted mb-1">Fee</p>
                      <p className="fw-bold mb-0">$45</p>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="rounded-4 bg-primary-subtle p-3">
                      <div className="d-flex align-items-center gap-2 text-primary fw-semibold">
                        <FaShieldAlt /> Secure records ready
                      </div>
                      <p className="small text-muted mb-0 mt-2">Access reports, prescriptions, and bookings from one place.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-5">
        <div className="row g-4 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="col-md-4">
              <div className="card border-0 h-100 shadow-sm p-4">
                <h3 className="display-6 fw-bold text-primary mb-2">{stat.value}</h3>
                <p className="text-muted mb-0">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container py-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold text-dark">Healthcare services built for convenience</h2>
          <p className="text-muted mt-2">Everything you need to book, track, and manage care in one place.</p>
        </div>
        <div className="row g-4">
          {services.map((service) => (
            <div key={service.title} className="col-md-6 col-lg-3">
              <div className="card border-0 h-100 shadow-sm p-4 hover-card">
                <div className="rounded-circle bg-primary-subtle p-3 d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '48px', height: '48px' }}>
                  {service.icon}
                </div>
                <h5 className="fw-bold text-dark">{service.title}</h5>
                <p className="text-muted mb-0">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container py-5">
        <div className="card border-0 shadow-sm p-4 p-lg-5 hero-card">
          <div className="row g-4 align-items-center">
            <div className="col-lg-8">
              <h3 className="fw-bold text-dark">Why patients trust Book A Doctor</h3>
              <p className="text-muted mt-2 mb-0">From expert physicians to secure records and instant booking, our platform makes healthcare simple, safe, and accessible.</p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <Link to="/about" className="btn btn-primary px-4">Learn More</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
