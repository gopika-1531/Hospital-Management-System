import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUserMd } from 'react-icons/fa';

export default function MainLayout({ children, toast, setToast }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setToast?.({ message: 'You have been logged out', type: 'success' });
    navigate('/');
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold text-primary d-flex align-items-center gap-2" to="/">
            <FaUserMd size={24} /> Book A Doctor
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="mainNav">
            <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
              <li className="nav-item"><NavLink className="nav-link" to="/">Home</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/about">About</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/doctors">Doctors</NavLink></li>
              {user ? (
                <>
                  <li className="nav-item"><NavLink className="nav-link" to="/dashboard">Dashboard</NavLink></li>
                  <li className="nav-item"><NavLink className="nav-link" to="/appointments">Appointments</NavLink></li>
                  <li className="nav-item"><NavLink className="nav-link" to="/reports">Reports</NavLink></li>
                  <li className="nav-item"><button className="btn btn-outline-primary btn-sm" onClick={handleLogout}>Logout</button></li>
                </>
              ) : (
                <>
                  <li className="nav-item"><NavLink className="nav-link" to="/login">Login</NavLink></li>
                  <li className="nav-item"><NavLink className="btn btn-primary btn-sm" to="/register">Register</NavLink></li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <main className="flex-grow-1">
        {toast && (
          <div className="container mt-3">
            <div className={`alert alert-${toast.type || 'success'} mb-0`} role="alert">{toast.message}</div>
          </div>
        )}
        {children}
      </main>

      <footer className="bg-dark text-white py-4 mt-4">
        <div className="container text-center">
          <p className="mb-0">© 2026 Book A Doctor. Secure, modern healthcare booking for patients and providers.</p>
        </div>
      </footer>
    </div>
  );
}
