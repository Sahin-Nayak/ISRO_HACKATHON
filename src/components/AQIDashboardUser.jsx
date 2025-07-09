import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AQIDashboardCompact = () => {
  const [aqiData, setAqiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userCity, setUserCity] = useState('');

  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const ipResponse = await fetch('https://ipapi.co/json/');
        const ipData = await ipResponse.json();
        setUserCity(ipData.city);
        fetchAQIData(ipData.city);
      } catch (err) {
        fetchAQIData('Delhi');
      }
    };
    fetchUserLocation();
  }, []);

  const fetchAQIData = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.waqi.info/feed/${encodeURIComponent(city)}/?token=4651f75d4b06d6af245ca5dee7e45334373e3b4d`
      );
      const data = await response.json();
      if (data.status !== 'ok') throw new Error(data.data || 'Unable to get air quality data');
      setAqiData(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getAqiQuality = (aqi) => {
    const quality = {
      0: { text: 'Good', color: '#4CAF50', emoji: '😊', gradient: 'linear-gradient(135deg, #4CAF50 0%, #81C784 100%)' },
      51: { text: 'Moderate', color: '#FFC107', emoji: '😐', gradient: 'linear-gradient(135deg, #FFC107 0%, #FFD54F 100%)' },
      101: { text: 'Unhealthy', color: '#F44336', emoji: '😷', gradient: 'linear-gradient(135deg, #F44336 0%, #E57373 100%)' },
      151: { text: 'Very Unhealthy', color: '#9C27B0', emoji: '😨', gradient: 'linear-gradient(135deg, #9C27B0 0%, #BA68C8 100%)' },
      201: { text: 'Hazardous', color: '#880E4F', emoji: '☠️', gradient: 'linear-gradient(135deg, #880E4F 0%, #AD1457 100%)' }
    };
    if (aqi <= 50) return quality[0];
    if (aqi <= 100) return quality[51];
    if (aqi <= 150) return quality[101];
    if (aqi <= 200) return quality[151];
    return quality[201];
  };

  return (
    <div className="fancy-dashboard">
      <AnimatePresence>
        {loading && (
          <motion.div 
            className="loading-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="spinner"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
            <p>Detecting your air quality...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <motion.div 
          className="error-card"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div className="error-content">
            <div className="error-icon">⚠️</div>
            <div className="error-text">{error}</div>
          </div>
          <button 
            className="retry-button"
            onClick={() => fetchAQIData(userCity || 'Delhi')}
          >
            Try Again
          </button>
        </motion.div>
      )}

      {aqiData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="dashboard-container"
        >
          <div className="location-header">
            <motion.div 
              className="city-badge"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="location-icon">📍</span>
              <h2>{aqiData.city.name}</h2>
              <div className="timestamp">
                {new Date(aqiData.time.v * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </motion.div>
          </div>

          <div className="main-display">
            <motion.div 
              className="aqi-display"
              style={{ background: getAqiQuality(aqiData.aqi).gradient }}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 10 }}
            >
              <div className="aqi-emoji">{getAqiQuality(aqiData.aqi).emoji}</div>
              <motion.div 
                className="aqi-value"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                {aqiData.aqi}
              </motion.div>
              <motion.div 
                className="aqi-status"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {getAqiQuality(aqiData.aqi).text}
              </motion.div>
              <div className="aqi-gauge">
                <motion.div 
                  className="gauge-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, aqiData.aqi / 3)}%` }}
                  transition={{ delay: 0.5, duration: 1 }}
                  style={{ background: getAqiQuality(aqiData.aqi).color }}
                />
              </div>
            </motion.div>

            <motion.div 
              className="pollutants-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {Object.entries(aqiData.iaqi).slice(0, 4).map(([code, data]) => (
                <motion.div
                  key={code}
                  className="pollutant-card"
                  whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <div className="pollutant-value">{data.v}</div>
                  <div className="pollutant-name">
                    {code === 'pm25' ? 'PM2.5' : 
                     code === 'pm10' ? 'PM10' : 
                     code === 'no2' ? 'NO₂' : 
                     code === 'o3' ? 'O₃' : code}
                  </div>
                  <div className="pollutant-unit">
                    {code === 'pm25' || code === 'pm10' ? 'µg/m³' : 
                     code === 'no2' || code === 'o3' ? 'ppb' : ''}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div 
            className="health-tip"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="tip-icon">💡</div>
            <div className="tip-text">
              {getAqiQuality(aqiData.aqi).text} air quality means {getAqiQuality(aqiData.aqi).text.toLowerCase()} health effects.
              {aqiData.aqi > 100 && ' Consider reducing outdoor activities.'}
            </div>
          </motion.div>
        </motion.div>
      )}

      <style jsx>{`
        .fancy-dashboard {
          font-family: 'Segoe UI', system-ui, sans-serif;
        //   background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        //   min-height: 100vh;
          padding: 20px;
          color: #212529;
        }

        .loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.95);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 100;
        }

        .spinner {
          width: 60px;
          height: 60px;
          border: 5px solid rgba(66, 153, 225, 0.2);
          border-top-color: #4299e1;
          border-radius: 50%;
          margin-bottom: 20px;
        }

        .loading-overlay p {
          font-size: 1.2rem;
          color: #495057;
        }

        .error-card {
          background: white;
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          max-width: 500px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .error-content {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .error-icon {
          font-size: 1.8rem;
          color: #dc3545;
        }

        .error-text {
          flex: 1;
          font-weight: 500;
          color: #dc3545;
        }

        .retry-button {
          align-self: flex-end;
          background: #dc3545;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 50px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 6px rgba(220, 53, 69, 0.2);
        }

        .retry-button:hover {
          background: #c82333;
          transform: translateY(-2px);
          box-shadow: 0 6px 8px rgba(220, 53, 69, 0.3);
        }

        .dashboard-container {
          max-width: 800px;
          margin: 0 auto;
        //   background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        }

        .location-header {
          padding: 20px;
          background: linear-gradient(135deg,rgb(7, 126, 230) 0%,rgb(12, 105, 199) 100%);
          color: white;
        }

        .city-badge {
          display: flex;
          align-items: center;
          gap: 10px;
        //   background: rgba(255, 255, 255, 0.1);
          padding: 10px 15px;
          border-radius: 50px;
          backdrop-filter: blur(5px);
          width: fit-content;
        }

        .location-icon {
          font-size: 1.2rem;
        }

        .city-badge h2 {
          margin: 0;
          font-size: 1.3rem;
          font-weight: 600;
        }

        .timestamp {
          margin-left: auto;
          font-size: 0.9rem;
          opacity: 0.8;
        }

        .main-display {
          padding: 30px;
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .aqi-display {
          border-radius: 20px;
          padding: 30px;
          color: white;
          text-align: center;
          position: relative;
          overflow: hidden;
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }

        .aqi-display::after {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%);
        }

        .aqi-emoji {
          font-size: 3.5rem;
          margin-bottom: 10px;
        }

        .aqi-value {
          font-size: 5rem;
          font-weight: 800;
          line-height: 1;
          margin: 10px 0;
          text-shadow: 0 5px 10px rgba(0,0,0,0.2);
        }

        .aqi-status {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 20px;
          text-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }

        .aqi-gauge {
          height: 10px;
          background: rgba(0,0,0,0.1);
          border-radius: 10px;
          overflow: hidden;
          margin: 0 auto;
          max-width: 400px;
        }

        .gauge-fill {
          height: 100%;
          border-radius: 10px;
        }

        .pollutants-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 15px;
        }

        .pollutant-card {
          background: white;
          border-radius: 15px;
          padding: 20px;
          text-align: center;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
          transition: all 0.3s ease;
          border: 1px solid #e9ecef;
        }

        .pollutant-value {
          font-size: 2rem;
          font-weight: 700;
          color: #212529;
          margin-bottom: 5px;
        }

        .pollutant-name {
          font-size: 1rem;
          font-weight: 600;
          color: #495057;
        }

        .pollutant-unit {
          font-size: 0.8rem;
          color: #6c757d;
          margin-top: 5px;
        }

        .health-tip {
          background: #f8f9fa;
          padding: 15px 20px;
          border-radius: 0 0 20px 20px;
          display: flex;
          align-items: center;
          gap: 15px;
          border-top: 1px solid #e9ecef;
        }

        .tip-icon {
          font-size: 1.5rem;
          flex-shrink: 0;
        }

        .tip-text {
          font-size: 0.95rem;
          color: #495057;
        }

        @media (max-width: 600px) {
          .aqi-value {
            font-size: 4rem;
          }

          .aqi-status {
            font-size: 1.5rem;
          }

          .pollutants-grid {
            grid-template-columns: 1fr 1fr;
          }

          .main-display {
            padding: 20px;
          }
        }

        @media (max-width: 400px) {
          .aqi-value {
            font-size: 3.5rem;
          }

          .pollutants-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default AQIDashboardCompact;