import { useState } from 'react';
import axios from 'axios';

export default function UploadReportsPage({ showToast }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      showToast?.('Please choose a file', 'danger');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/upload`, formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
      });
      showToast?.(`Uploaded successfully: ${res.data.filePath}`, 'success');
    } catch (error) {
      showToast?.(error.response?.data?.message || 'Upload failed', 'danger');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-7">
          <div className="card p-4">
            <h2 className="text-primary fw-bold">Upload reports</h2>
            <p className="text-muted">Share lab reports or supporting documents securely.</p>
            <form onSubmit={handleSubmit} className="mt-3">
              <input className="form-control" type="file" onChange={(e) => setFile(e.target.files[0])} />
              <button className="btn btn-primary mt-3" disabled={loading}>{loading ? 'Uploading...' : 'Upload report'}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
