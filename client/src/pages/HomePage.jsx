import { Link } from 'react-router-dom';
import { FaHeartbeat, FaUserMd, FaShieldAlt } from 'react-icons/fa';

export default function HomePage() {
  return (
    <>
      <section className="hero-section py-5">
        <div className="container py-5">
          <div className="row align-items-center g-4">
            <div className="col-lg-7">
              <h1 className="display-5 fw-bold">Trusted care, booked in minutes.</h1>
              <p className="lead mt-3">Book appointments with verified doctors, upload reports, and manage your care journey from one clean dashboard.</p>
              <div className="d-flex gap-3 flex-wrap mt-4">
                <Link to="/doctors" className="btn btn-light text-primary fw-semibold">Find a Doctor</Link>
                <Link to="/register" className="btn btn-outline-light">Create Account</Link>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="card p-4 border-0">
                <h5 className="fw-bold text-primary">Why patients choose us</h5>
                <ul className="list-unstyled mt-3 mb-0">
                  <li className="mb-2"><FaShieldAlt className="me-2 text-primary" /> Secure patient portal</li>
                  <li className="mb-2"><FaUserMd className="me-2 text-primary" /> Verified medical professionals</li>
                  <li><FaHeartbeat className="me-2 text-primary" /> Streamlined booking and reports</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-5">
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 p-4">
              <h5 className="fw-bold text-primary">Patient experience</h5>
              <p className="text-muted">Search by specialty, compare fees, and book with confidence.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 p-4">
              <h5 className="fw-bold text-primary">Doctor portal</h5>
              <p className="text-muted">Manage availability, review appointments, and share reports.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 p-4">
              <h5 className="fw-bold text-primary">Admin control</h5>
              <p className="text-muted">Approve registrations, manage users, and monitor platform activity.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
