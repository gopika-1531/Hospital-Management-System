import { FaHeartbeat, FaLock, FaLightbulb, FaHandsHelping, FaStethoscope, FaCalendarCheck, FaShieldAlt, FaHeadset, FaUserMd } from 'react-icons/fa';

const reasons = [
  { icon: <FaUserMd />, title: 'Trusted Doctors', description: 'Access experienced and verified specialists across multiple disciplines.', color: 'primary' },
  { icon: <FaCalendarCheck />, title: 'Easy Booking', description: 'Book appointments quickly with minimal effort and instant confirmations.', color: 'success' },
  { icon: <FaShieldAlt />, title: 'Secure Records', description: 'Keep medical reports and prescriptions organized in a protected dashboard.', color: 'info' },
  { icon: <FaHeadset />, title: '24/7 Support', description: 'Receive dependable support whenever you need care guidance or help.', color: 'warning' },
];

const team = [
  { name: 'Dr. Maya Rao', role: 'Cardiologist', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80' },
  { name: 'Dr. Arjun Singh', role: 'Neurologist', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80' },
  { name: 'Dr. Priya Nair', role: 'Pediatrician', image: 'https://images.unsplash.com/photo-1594824476967-48c8b64b1f54?auto=format&fit=crop&w=600&q=80' },
];

export default function AboutPage() {
  return (
    <div className="py-5" style={{ background: 'linear-gradient(135deg, #E3F2FD 0%, #FFFFFF 100%)' }}>
      <div className="container">
        <div className="card border-0 shadow-lg overflow-hidden mb-4">
          <div className="row g-0 align-items-center">
            <div className="col-lg-7 p-4 p-lg-5">
              <div className="d-inline-flex align-items-center gap-2 rounded-pill px-3 py-2 mb-3 text-primary" style={{ backgroundColor: '#E3F2FD' }}>
                <FaHeartbeat /> Healthcare Excellence
              </div>
              <h1 className="display-5 fw-bold text-dark">About Book A Doctor</h1>
              <p className="lead text-muted mt-3">
                We are redefining how people access medical care by combining trusted doctors, simple booking, and secure digital records in one elegant platform.
              </p>
              <div className="d-flex flex-wrap gap-2 mt-4">
                <span className="badge bg-primary-subtle text-primary px-3 py-2">Verified Specialists</span>
                <span className="badge bg-success-subtle text-success px-3 py-2">Easy Scheduling</span>
                <span className="badge bg-info-subtle text-info px-3 py-2">Secure Care</span>
              </div>
            </div>
            <div className="col-lg-5">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80"
                alt="Healthcare team"
                className="img-fluid h-100 w-100"
                style={{ objectFit: 'cover', minHeight: '320px' }}
              />
            </div>
          </div>
        </div>

        <div className="row g-4 mb-4">
          <div className="col-md-6">
            <div className="card border-0 shadow-sm p-4 h-100 hover-card">
              <div className="text-primary mb-3" style={{ fontSize: '1.5rem' }}><FaLightbulb /></div>
              <h4 className="fw-bold text-dark">Our Mission</h4>
              <p className="text-muted mb-0">To make healthcare more accessible, efficient, and compassionate for every patient and family.</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card border-0 shadow-sm p-4 h-100 hover-card">
              <div className="text-success mb-3" style={{ fontSize: '1.5rem' }}><FaStethoscope /></div>
              <h4 className="fw-bold text-dark">Our Vision</h4>
              <p className="text-muted mb-0">To build a trusted digital healthcare ecosystem that connects patients with the right care at the right time.</p>
            </div>
          </div>
        </div>

        <div className="card border-0 shadow-sm p-4 p-lg-5 mb-4">
          <h3 className="fw-bold text-dark mb-4">Why Choose Us</h3>
          <div className="row g-4">
            {reasons.map((item) => (
              <div key={item.title} className="col-md-6 col-lg-3">
                <div className={`card border-0 h-100 p-4 hover-card bg-${item.color} bg-opacity-10`}>
                  <div className={`text-${item.color} mb-3`} style={{ fontSize: '1.4rem' }}>{item.icon}</div>
                  <h5 className="fw-semibold text-dark">{item.title}</h5>
                  <p className="text-muted mb-0">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card border-0 shadow-sm p-4 p-lg-5 mb-4">
          <h3 className="fw-bold text-dark mb-4">Our Impact</h3>
          <div className="row g-4 text-center">
            <div className="col-md-4">
              <div className="rounded-4 bg-primary-subtle p-4">
                <h2 className="fw-bold text-primary mb-1">500+</h2>
                <p className="text-muted mb-0">Doctors</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="rounded-4 bg-success-subtle p-4">
                <h2 className="fw-bold text-success mb-1">10,000+</h2>
                <p className="text-muted mb-0">Patients</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="rounded-4 bg-info-subtle p-4">
                <h2 className="fw-bold text-info mb-1">50+</h2>
                <p className="text-muted mb-0">Specializations</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card border-0 shadow-sm p-4 p-lg-5">
          <h3 className="fw-bold text-dark mb-4">Meet Our Team</h3>
          <div className="row g-4">
            {team.map((member) => (
              <div key={member.name} className="col-md-4">
                <div className="card border-0 shadow-sm overflow-hidden hover-card">
                  <img src={member.image} alt={member.name} className="img-fluid" style={{ height: '240px', objectFit: 'cover' }} />
                  <div className="card-body">
                    <h5 className="fw-semibold text-dark">{member.name}</h5>
                    <p className="text-muted mb-0">{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
