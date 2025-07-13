import { useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Import your components
import AQIDashboardUser from '../components/AQIDashboardUser';
import AirPollutionLiveBySearch from '../components/AirPollutionLiveBySearch';
import AirPollutionLive from '../components/AirPollutionLive';
import AQITable1 from '../components/AQITable1';
import AQITable2 from '../components/AQITable2';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Dashboard = () => {
  const [activeTable, setActiveTable] = useState('AQI');
  
  // Glowing animation effect
  const glowAnimation = `
    @keyframes glow {
      0% { box-shadow: 0 0 5px currentColor; }
      50% { box-shadow: 0 0 20px currentColor; }
      100% { box-shadow: 0 0 5px currentColor; }
    }
  `;

  return (
    <div style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      color: '#f8fafc',
      fontFamily: '"Inter", -apple-system, sans-serif',
      minHeight: '100vh',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <style>{glowAnimation}</style>
      
      <AQIDashboardUser/>
      <AirPollutionLiveBySearch/>
      <AirPollutionLive />
      
      {/* Floating Tab Bar */}
      <div style={{
        position: 'sticky',
        top: '20px',
        zIndex: '100',
        background: 'rgba(15, 23, 42, 0.9)',
        backdropFilter: 'blur(12px)',
        padding: '15px',
        margin: '30px auto',
        borderRadius: '12px',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        maxWidth: 'fit-content',
        display: 'flex',
        gap: '15px'
      }}>
        <button
          onClick={() => setActiveTable('AQI')}
          style={{
            padding: '14px 28px',
            background: activeTable === 'AQI' 
              ? 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)' 
              : 'rgba(30, 41, 59, 0.7)',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: '700',
            fontSize: '16px',
            transition: 'all 0.4s cubic-bezier(0.68, -0.6, 0.32, 1.6)',
            transform: activeTable === 'AQI' ? 'scale(1.05)' : 'scale(1)',
            boxShadow: activeTable === 'AQI' 
              ? '0 0 15px rgba(37, 99, 235, 0.7)' 
              : 'none',
            animation: activeTable === 'AQI' ? 'glow 2s infinite' : 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span style={{
            display: 'inline-block',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: activeTable === 'AQI' ? '#fff' : '#3b82f6',
            boxShadow: activeTable === 'AQI' ? '0 0 8px #fff' : 'none'
          }}></span>
          AQI Data
        </button>
        
        <button
          onClick={() => setActiveTable('PM2.5')}
          style={{
            padding: '14px 28px',
            background: activeTable === 'PM2.5' 
              ? 'linear-gradient(135deg, #10b981 0%, #047857 100%)' 
              : 'rgba(30, 41, 59, 0.7)',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: '700',
            fontSize: '16px',
            transition: 'all 0.4s cubic-bezier(0.68, -0.6, 0.32, 1.6)',
            transform: activeTable === 'PM2.5' ? 'scale(1.05)' : 'scale(1)',
            boxShadow: activeTable === 'PM2.5' 
              ? '0 0 15px rgba(16, 185, 129, 0.7)' 
              : 'none',
            animation: activeTable === 'PM2.5' ? 'glow 2s infinite' : 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span style={{
            display: 'inline-block',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: activeTable === 'PM2.5' ? '#fff' : '#10b981',
            boxShadow: activeTable === 'PM2.5' ? '0 0 8px #fff' : 'none'
          }}></span>
          PM2.5 Data
        </button>
      </div>

      {/* Table Content */}
      <div style={{ 
        marginTop: '30px',
        transition: 'opacity 0.3s ease',
        opacity: activeTable ? '1' : '0.8'
      }}>
        {activeTable === 'AQI' ? <AQITable1 /> : <AQITable2 />}
      </div>

      <footer style={{
        textAlign: 'center',
        marginTop: '60px',
        paddingTop: '20px',
        borderTop: '1px solid #334155',
        color: '#64748b',
        fontSize: '0.9rem'
      }}>
        <p>Data updated hourly • Last refresh: {new Date().toLocaleString()}</p>
        <p style={{ marginTop: '8px' }}>© {new Date().getFullYear()} India Air Quality Monitoring System</p>
      </footer>
    </div>
  );
};

export default Dashboard;