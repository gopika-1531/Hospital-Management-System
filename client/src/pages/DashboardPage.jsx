import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="container py-5">
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card p-4">
            <h2 className="text-primary fw-bold">Welcome back, {user?.name || 'there'}.</h2>
            <p className="text-muted">Your patient workspace is ready. Book visits, review appointments, and stay on top of your care plan.</p>
            <div className="d-flex flex-wrap gap-2 mt-3">
              <Link to="/doctors" className="btn btn-primary">Find a doctor</Link>
              <Link to="/appointments" className="btn btn-outline-primary">View appointments</Link>
              <Link to="/reports" className="btn btn-outline-secondary">Upload reports</Link>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card p-4">
            <h5 className="fw-bold">Quick actions</h5>
            <ul className="list-unstyled mt-3 mb-0">
              <li className="mb-2">• Browse trusted specialists</li>
              <li className="mb-2">• Manage upcoming visits</li>
              <li>• Keep medical reports handy</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
