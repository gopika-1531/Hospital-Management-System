import { useAuth } from '../context/AuthContext';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="container py-5">
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card p-4">
            <h2 className="text-primary fw-bold">Welcome back, {user?.name || 'there'}.</h2>
            <p className="text-muted">Your {user?.role || 'patient'} workspace is ready.</p>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card p-4">
            <h5 className="fw-bold">Quick actions</h5>
            <ul className="list-unstyled mt-3 mb-0">
              <li className="mb-2">• Browse doctors</li>
              <li className="mb-2">• Manage your appointments</li>
              <li>• Upload medical reports</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
