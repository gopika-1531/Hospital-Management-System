import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUserMd, FaHeartbeat, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

export default function MainLayout({ children, toast, setToast }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setToast?.({ message: 'You have been logged out', type: 'success' });
    setMenuOpen(false);
    navigate('/');
  };

  const dashboardPath = user?.role === 'doctor' ? '/doctor-dashboard' : user?.role === 'admin' ? '/admin-dashboard' : '/dashboard';
  const navLinkClass = ({ isActive }) => `nav-link px-2 px-lg-3 fw-semibold${isActive ? ' text-primary' : ' text-dark'}`;

  return (
    <div className="d-flex flex-column min-vh-100">
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top border-bottom">
        <div className="container">
          <Link className="navbar-brand fw-bold text-primary d-flex align-items-center gap-2" to="/" onClick={() => setMenuOpen(false)}>
            <span className="rounded-circle bg-primary text-white p-2 d-inline-flex"><FaUserMd /></span>
            <span>Book A Doctor</span>
          </Link>
          <button className="navbar-toggler" type="button" aria-label="Toggle navigation" onClick={() => setMenuOpen((prev) => !prev)}>
            <span className="navbar-toggler-icon" />
          </button>
          <div className={`navbar-collapse collapse${menuOpen ? ' show' : ''}`}>
            <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
              <li className="nav-item"><NavLink end className={navLinkClass} to="/" onClick={() => setMenuOpen(false)}>Home</NavLink></li>
              <li className="nav-item"><NavLink className={navLinkClass} to="/about" onClick={() => setMenuOpen(false)}>About</NavLink></li>
              <li className="nav-item"><NavLink className={navLinkClass} to="/doctors" onClick={() => setMenuOpen(false)}>Doctors</NavLink></li>
              <li className="nav-item"><NavLink className={navLinkClass} to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink></li>
              {!user && (
                <>
                  <li className="nav-item"><NavLink className={navLinkClass} to="/login" onClick={() => setMenuOpen(false)}>Login</NavLink></li>
                  <li className="nav-item">
                    <NavLink className="btn btn-primary btn-sm ms-lg-2" to="/register" onClick={() => setMenuOpen(false)}>
                      Register
                    </NavLink>
                  </li>
                </>
              )}
              {user && (
                <>
                  <li className="nav-item"><NavLink className={navLinkClass} to={dashboardPath} onClick={() => setMenuOpen(false)}>Dashboard</NavLink></li>
                  <li className="nav-item"><button className="btn btn-outline-primary btn-sm ms-lg-2" onClick={handleLogout}>Logout</button></li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <main className="flex-grow-1 pt-5">
        {toast && (
          <div className="container mt-4">
            <div className={`alert alert-${toast.type || 'success'} shadow-sm mb-0`} role="alert">{toast.message}</div>
          </div>
        )}
        {children}
      </main>

      <footer className="footer-section mt-4 py-5 text-white">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-lg-4">
              <div className="d-flex align-items-center gap-2 fw-bold fs-5">
                <FaHeartbeat className="text-info" /> Book A Doctor
              </div>
              <p className="mt-3 text-light-emphasis mb-0">Secure, modern healthcare booking designed for patients, providers, and care teams.</p>
            </div>
            <div className="col-lg-4">
              <h6 className="fw-semibold">Quick Links</h6>
              <ul className="list-unstyled mt-3 mb-0">
                <li className="mb-2"><Link to="/about" className="text-white-50 text-decoration-none">About Us</Link></li>
                <li className="mb-2"><Link to="/doctors" className="text-white-50 text-decoration-none">Find a Doctor</Link></li>
                <li><Link to="/login" className="text-white-50 text-decoration-none">Patient Login</Link></li>
              </ul>
            </div>
            <div className="col-lg-4">
              <h6 className="fw-semibold">Contact</h6>
              <ul className="list-unstyled mt-3 mb-0">
                <li className="mb-2 d-flex align-items-center gap-2 text-white-50"><FaPhoneAlt /> +91 98765 43210</li>
                <li className="d-flex align-items-center gap-2 text-white-50"><FaEnvelope /> support@bookadoctor.com</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
