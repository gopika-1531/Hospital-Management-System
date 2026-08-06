import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="container py-5 text-center">
      <div className="card p-5">
        <h1 className="display-4 fw-bold text-primary">404</h1>
        <h3 className="fw-bold">Page not found</h3>
        <p className="text-muted">The page you are looking for does not exist or has moved.</p>
        <Link to="/" className="btn btn-primary mt-3">Go home</Link>
      </div>
    </div>
  );
}
