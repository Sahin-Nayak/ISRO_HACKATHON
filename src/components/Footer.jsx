import React, { useEffect } from 'react';
import emailjs from '@emailjs/browser';

const Footer = () => {
  useEffect(() => {
    // Initialize EmailJS with your public key
    emailjs.init({
      publicKey: "FJe8guE1m7yvTfVa5", // Replace with your actual public key
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get the current date and time
    const now = new Date();
    const timeString = now.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Add timestamp to form data
    const form = e.target;
    const timeInput = document.createElement('input');
    timeInput.type = 'hidden';
    timeInput.name = 'time';
    timeInput.value = timeString;
    form.appendChild(timeInput);

    // Send form using EmailJS
    emailjs.sendForm('service_rsyunmc', 'template_xfardxu', form)
      .then(() => {
        alert('Message sent successfully!');
        form.reset();
      }, (error) => {
        alert('Failed to send message. Please try again later.');
        console.error('EmailJS error:', error);
      });
  };

  return (
    <footer style={{
      backgroundColor: '#0f172a',
      padding: '50px 20px 30px',
      borderTop: '1px solid #1e293b',
      color: '#e2e8f0',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '50px',
        maxWidth: '1200px',
        margin: '0 auto',
        paddingBottom: '40px'
      }}>
        {/* About Section */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ color: '#ffffff', fontSize: '1.3rem', fontWeight: '700' }}>AQ-INDIA</h3>
          </div>
          <p style={{ color: '#94a3b8', lineHeight: '1.6', marginBottom: '20px' }}>
            Real-time air quality monitoring platform developed for ISRO Hackathon 2025. 
            Providing hyperlocal AQI data with satellite, grounded data integration.
          </p>
          <div style={{ display: 'flex', gap: '15px' }}>
            <a href="#" style={{ color: '#94a3b8', fontSize: '1.2rem' }}>🌐</a>
            <a href="#" style={{ color: '#94a3b8', fontSize: '1.2rem' }}>🐦</a>
            <a href="#" style={{ color: '#94a3b8', fontSize: '1.2rem' }}>📸</a>
            <a href="#" style={{ color: '#94a3b8', fontSize: '1.2rem' }}>🔗</a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 style={{ color: '#ffffff', fontSize: '1.1rem', marginBottom: '20px', fontWeight: '600' }}>AQI Resources</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ marginBottom: '12px' }}>
              <a href="#" style={linkStyle}>
                <span style={{ marginRight: '8px' }}>🗺️</span> Live Pollution Map
              </a>
            </li>
            <li style={{ marginBottom: '12px' }}>
              <a href="/AirPrevData" style={linkStyle}>
                <span style={{ marginRight: '8px' }}>🛰️</span> Previous Year Data
              </a>
            </li>
            <li style={{ marginBottom: '12px' }}>
              <a href="/AQITables" style={linkStyle}>
                <span style={{ marginRight: '8px' }}>🏥</span> AQI City Ranking 2024
              </a>
            </li>
            <li style={{ marginBottom: '12px' }}>
              <a href="/AQITables2" style={linkStyle}>
                <span style={{ marginRight: '8px' }}>🚀</span> AQI Ranking 2024 Based On PM2.5
              </a>
            </li>
          </ul>
        </div>

        {/* Hackathon Team */}
        <div>
          <h3 style={{ color: '#ffffff', fontSize: '1.1rem', marginBottom: '20px', fontWeight: '600' }}>Team AQ-INDIA</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', color: '#cbd5e1' }}>
              <span style={{ marginRight: '8px', color: '#60a5fa' }}>👨‍🚀</span> Team Lead: Sahin Nayak
            </li>
            <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', color: '#cbd5e1' }}>
              <span style={{ marginRight: '8px', color: '#60a5fa' }}>👩‍🔬</span> MCA Student: Vishal Parui
            </li>
            <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', color: '#cbd5e1' }}>
              <span style={{ marginRight: '8px', color: '#60a5fa' }}>👨‍💻</span> Deploma Student: Soumen Mishra
            </li>
            <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', color: '#cbd5e1' }}>
              <span style={{ marginRight: '8px', color: '#60a5fa' }}>👩‍💼</span> MCA Student: Sudip Bakuli
            </li>
          </ul>
          <div style={{ marginTop: '20px', padding: '12px', backgroundColor: '#1e293b', borderRadius: '6px' }}>
            <p style={{ color: '#60a5fa', margin: '0', fontSize: '0.9rem' }}>
              🚀 Bharatiya Antariksh Hackathon 2025 Participant
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h3 style={{ color: '#ffffff', fontSize: '1.1rem', marginBottom: '20px', fontWeight: '600' }}>Collaborate With Us</h3>
          <form id="contact-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input 
              type="text" 
              name="name"
              placeholder="Your Name" 
              style={inputStyle}
              required 
            />
            <input 
              type="email" 
              name="email"
              placeholder="Your Email" 
              style={inputStyle}
              required 
            />
            <input 
              type="text" 
              name="title"
              placeholder="Subject" 
              style={inputStyle}
              required 
            />
            <textarea 
              name="message"
              placeholder="Your Message" 
              rows="3" 
              style={{ ...inputStyle, resize: 'vertical' }}
              required
            ></textarea>
            <button 
              type="submit" 
              style={buttonStyle}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Footer */}
      <div style={{
        textAlign: 'center',
        paddingTop: '30px',
        borderTop: '1px solid #1e293b',
        color: '#94a3b8',
        fontSize: '0.85rem'
      }}>
        <p>🚀 data integration with ISRO • Data updated every 15 minutes</p>
        <p style={{ marginTop: '8px' }}>© {new Date().getFullYear()} AQ-INDIA | Team VishSa - ISRO Hackathon Project</p>
      </div>
    </footer>
  );
};

// Styles
const linkStyle = {
  color: '#94a3b8',
  textDecoration: 'none',
  transition: 'color 0.2s',
  display: 'flex',
  alignItems: 'center',
  fontSize: '0.95rem'
};

const inputStyle = {
  padding: '12px',
  border: '1px solid #334155',
  borderRadius: '6px',
  fontSize: '0.9rem',
  backgroundColor: '#1e293b',
  color: '#f8fafc',
  outline: 'none',
  transition: 'border-color 0.2s'
};

const buttonStyle = {
  backgroundColor: '#3b82f6',
  color: 'white',
  padding: '12px 20px',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '0.95rem',
  fontWeight: '500',
  transition: 'all 0.2s',
  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
};

export default Footer;