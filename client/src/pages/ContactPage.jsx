import { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-5" style={{ background: 'linear-gradient(135deg, #E8F5E9 0%, #FFFFFF 100%)' }}>
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="fw-bold text-success">Contact Us</h1>
          <p className="text-muted mx-auto" style={{ maxWidth: '680px' }}>
            Simple, secure, and professional support for your healthcare needs. Send a message and our team will respond quickly.
          </p>
        </div>

        <div className="row g-4">
          <div className="col-lg-5">
            <div className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white">
              <h4 className="fw-bold text-success mb-4">Contact Information</h4>

              <div className="d-flex align-items-start gap-3 mb-4">
                <div className="rounded-circle bg-success-subtle p-3 text-success">
                  <FaPhoneAlt />
                </div>
                <div>
                  <h6 className="fw-semibold mb-1">Phone</h6>
                  <p className="text-muted mb-0">+91 9876543210</p>
                </div>
              </div>

              <div className="d-flex align-items-start gap-3 mb-4">
                <div className="rounded-circle bg-success-subtle p-3 text-success">
                  <FaEnvelope />
                </div>
                <div>
                  <h6 className="fw-semibold mb-1">Email</h6>
                  <p className="text-muted mb-0">support@bookadoctor.com</p>
                </div>
              </div>

              <div className="d-flex align-items-start gap-3 mb-4">
                <div className="rounded-circle bg-success-subtle p-3 text-success">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h6 className="fw-semibold mb-1">Location</h6>
                  <p className="text-muted mb-0">New Delhi, India</p>
                </div>
              </div>

              <p className="text-muted small">
                Our team is available Monday through Saturday to support your appointment and care questions.
              </p>
            </div>
          </div>

          <div className="col-lg-7">
            <div className="card border-0 shadow-sm rounded-4 p-4 p-lg-5 bg-white">
              <h3 className="fw-bold text-dark mb-4">Send a Message</h3>

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="name" className="form-label fw-semibold">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className="form-control form-control-lg"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label fw-semibold">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="form-control form-control-lg"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label htmlFor="message" className="form-label fw-semibold">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="6"
                      className="form-control form-control-lg"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="How can we help you today?"
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-success btn-lg rounded-pill mt-4 px-5">
                  Send Message
                </button>

                {submitted && (
                  <div className="alert alert-success mt-4 mb-0 rounded-4">
                    Thank you! Your message has been sent successfully.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
