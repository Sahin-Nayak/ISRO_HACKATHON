import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AQIDashboardCompact = () => {
  const [aqiData, setAqiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userCity, setUserCity] = useState('');
  const [indianCitiesAqi, setIndianCitiesAqi] = useState([]);
  const [showAllCities, setShowAllCities] = useState(false);

  // List of major Indian cities
  const indianCities = [
    'Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Ahmedabad', 
    'Chennai', 'Kolkata', 'Surat', 'Pune', 'Jaipur',
    'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane',
    'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad', 'Patna', 'Vadodara',
    'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik', 'Faridabad',
    'Meerut', 'Rajkot', 'Kalyan-Dombivli', 'Vasai-Virar', 'Varanasi',
    'Srinagar', 'Aurangabad', 'Dhanbad', 'Amritsar', 'Navi Mumbai',
    'Allahabad', 'Howrah', 'Gwalior', 'Jabalpur', 'Coimbatore',
    'Vijayawada', 'Jodhpur', 'Madurai', 'Raipur', 'Kota',
    'Guwahati', 'Chandigarh', 'Solapur', 'Hubli', 'Bareilly',
    'Moradabad', 'Mysore', 'Tiruchirappalli', 'Gurgaon', 'Aligarh',
    'Jalandhar', 'Bhubaneswar', 'Salem', 'Mira-Bhayandar', 'Warangal',
    'Guntur', 'Bhiwandi', 'Saharanpur', 'Gorakhpur', 'Bikaner',
    'Amravati', 'Noida', 'Jamshedpur', 'Bhilai', 'Cuttack',
    'Firozabad', 'Kochi', 'Nellore', 'Bhavnagar', 'Dehradun',
    'Durgapur', 'Asansol', 'Rourkela', 'Nanded', 'Kolhapur',
    'Ajmer', 'Akola', 'Gulbarga', 'Jamnagar', 'Ujjain',
    'Loni', 'Siliguri', 'Jhansi', 'Ulhasnagar', 'Jammu',
    'Mangalore', 'Erode', 'Belgaum', 'Kurnool', 'Tirunelveli',
    'Malegaon', 'Gaya', 'Udaipur', 'Davanagere', 'Tirupati'
  ];

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
    
    const fetchIndianCitiesAQI = async () => {
      try {
        // Fetch AQI for each city individually
        const promises = indianCities.map(city => 
          fetch(`https://api.waqi.info/feed/${encodeURIComponent(city)}/?token=4651f75d4b06d6af245ca5dee7e45334373e3b4d`)
            .then(response => response.json())
            .then(data => ({
              city: city,
              data: data.status === 'ok' ? data.data : null
            }))
            .catch(() => ({
              city: city,
              data: null
            }))
        );

        const results = await Promise.all(promises);
        
        // Filter out cities with no data and sort by AQI
        const validCities = results
          .filter(result => result.data && result.data.aqi !== '-')
          .sort((a, b) => b.data.aqi - a.data.aqi);
        
        setIndianCitiesAqi(validCities);
      } catch (err) {
        console.error('Error fetching Indian cities AQI:', err);
      }
    };
    
    fetchUserLocation();
    fetchIndianCitiesAQI();
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
    if (!aqi || aqi === '-') return {
      text: 'No Data', 
      color: '#9E9E9E', 
      emoji: '❓', 
      icon: '❓',
      gradient: 'linear-gradient(135deg, #9E9E9E 0%, #BDBDBD 100%)',
      advice: 'Air quality data not available for this location.'
    };
    
    const quality = {
      0: { 
        text: 'Good', 
        color: '#4CAF50', 
        emoji: '😊', 
        icon: '🌿',
        gradient: 'linear-gradient(135deg, #4CAF50 0%, #81C784 100%)',
        advice: 'Air quality is satisfactory. Enjoy outdoor activities!'
      },
      51: { 
        text: 'Moderate', 
        color: '#FFC107', 
        emoji: '😐', 
        icon: '🌤️',
        gradient: 'linear-gradient(135deg, #FFC107 0%, #FFD54F 100%)',
        advice: 'Air quality is acceptable. Unusually sensitive people should consider reducing prolonged outdoor exertion.'
      },
      101: { 
        text: 'Unhealthy', 
        color: '#F44336', 
        emoji: '😷', 
        icon: '⚠️',
        gradient: 'linear-gradient(135deg, #F44336 0%, #E57373 100%)',
        advice: 'Sensitive groups should reduce outdoor activities. Everyone may begin to experience health effects.'
      },
      151: { 
        text: 'Very Unhealthy', 
        color: '#9C27B0', 
        emoji: '😨', 
        icon: '💀',
        gradient: 'linear-gradient(135deg, #9C27B0 0%, #BA68C8 100%)',
        advice: 'Health alert: Everyone may experience more serious health effects. Avoid outdoor activities.'
      },
      201: { 
        text: 'Hazardous', 
        color: '#880E4F', 
        emoji: '☠️', 
        icon: '🚨',
        gradient: 'linear-gradient(135deg, #880E4F 0%, #AD1457 100%)',
        advice: 'Health warnings of emergency conditions. Entire population is likely to be affected.'
      }
    };
    
    aqi = parseInt(aqi);
    if (aqi <= 50) return quality[0];
    if (aqi <= 100) return quality[51];
    if (aqi <= 150) return quality[101];
    if (aqi <= 200) return quality[151];
    return quality[201];
  };

  return (
    <div className="aqi-compact-dashboard">
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
          <div className="dashboard-row">
            {/* Location and Main AQI */}
            <motion.div 
              className="aqi-main-card"
              style={{ background: getAqiQuality(aqiData.aqi).gradient }}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 10 }}
            >
              <div className="location-info">
                <div className="location-icon">📍</div>
                <div className="location-details">
                  <h3>{aqiData.city.name}</h3>
                  <p>{new Date(aqiData.time.iso).toLocaleString()}</p>
                </div>
              </div>
              
              <div className="aqi-display">
                <div className="aqi-emoji">{getAqiQuality(aqiData.aqi).emoji}</div>
                <div className="aqi-value">{aqiData.aqi}</div>
                <div className="aqi-status">{getAqiQuality(aqiData.aqi).text}</div>
              </div>
              
              <div className="aqi-gauge-container">
                <div className="aqi-gauge-labels">
                  <span>0</span>
                  <span>50</span>
                  <span>100</span>
                  <span>150</span>
                  <span>200+</span>
                </div>
                <div className="aqi-gauge">
                  <motion.div 
                    className="gauge-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (aqiData.aqi !== '-' ? aqiData.aqi : 0) / 3)}%` }}
                    transition={{ delay: 0.5, duration: 1 }}
                    style={{ background: getAqiQuality(aqiData.aqi).color }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Pollutants */}
            <motion.div 
              className="pollutants-card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <h4>Pollutants Level</h4>
              <div className="pollutants-grid">
                {Object.entries(aqiData.iaqi).slice(0, 4).map(([code, data]) => (
                  <motion.div
                    key={code}
                    className="pollutant-item"
                    whileHover={{ y: -3 }}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    <div className="pollutant-icon">
                      {code === 'pm25' ? '💨' : 
                       code === 'pm10' ? '🌫️' : 
                       code === 'no2' ? '🚗' : 
                       code === 'o3' ? '☀️' : '📊'}
                    </div>
                    <div className="pollutant-details">
                      <div className="pollutant-name">
                        {code === 'pm25' ? 'PM2.5' : 
                         code === 'pm10' ? 'PM10' : 
                         code === 'no2' ? 'NO₂' : 
                         code === 'o3' ? 'O₃' : code}
                      </div>
                      <div className="pollutant-value">{data.v} 
                        <span className="pollutant-unit">
                          {code === 'pm25' || code === 'pm10' ? 'µg/m³' : 
                           code === 'no2' || code === 'o3' ? 'ppb' : ''}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Health Advice */}
            <motion.div 
              className="advice-card"
              id='advice-card'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="advice-header">
                <div className="advice-icon">{getAqiQuality(aqiData.aqi).icon}</div>
                <h4>Health Advice</h4>
              </div>
              <div className="advice-text">
                {getAqiQuality(aqiData.aqi).advice}
              </div>
              {/* <div className="advice-actions">
                <button className="action-button">
                  <span>📱</span> Get Alerts
                </button>
                <button className="action-button">
                  <span>🗺️</span> View Map
                </button>
              </div> */}
            </motion.div>
          </div>

          {/* Indian Cities AQI Section */}
          <div className="indian-cities-section">
            <h3>Major Indian Cities Air Quality</h3>
            <div className="cities-grid">
              {indianCitiesAqi.slice(0, showAllCities ? indianCitiesAqi.length : 6).map((cityData, index) => {
                const quality = getAqiQuality(cityData.data.aqi);
                return (
                  <motion.div
                    key={index}
                    className="city-aqi-card"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    style={{ 
                      background: quality.gradient,
                      color: 'white'
                    }}
                  >
                    <div className="city-name">{cityData.city}</div>
                    <div className="city-aqi-value">{cityData.data.aqi || '--'}</div>
                    <div className="city-aqi-status">{quality.text}</div>
                  </motion.div>
                );
              })}
            </div>
            {indianCitiesAqi.length > 6 && (
              <button 
                className="toggle-cities-button"
                onClick={() => setShowAllCities(!showAllCities)}
              >
                {showAllCities ? 'Show Less' : `Show All ${indianCitiesAqi.length} Cities`}
              </button>
            )}
          </div>
        </motion.div>
      )}

      {/* Styles remain the same as previous version */}
      <style jsx>{`
.aqi-compact-dashboard {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  border-radius: 16px;
  overflow: hidden;
  max-width: 100%;
  margin: 0 auto;
  color: white;
  position: relative;
  border-bottom: 4px solid transparent;
  border-image: linear-gradient(to right,rgb(255, 30, 30),rgb(255, 71, 71),rgb(255, 30, 30));
  border-image-slice: 1;
}


/* Good (0-50) - Fresh air animation */
.aqi-compact-dashboard[data-aqi-level="good"] {
  background: linear-gradient(135deg, #56ab2f, #a8e063);
  animation: goodPulse 8s infinite alternate;
}

/* Moderate (51-100) - Mild caution animation */
.aqi-compact-dashboard[data-aqi-level="moderate"] {
  background: linear-gradient(135deg, #f9d423, #f83600);
  animation: moderateWave 12s infinite alternate;
}

/* Unhealthy for Sensitive Groups (101-150) */
.aqi-compact-dashboard[data-aqi-level="unhealthy-sg"] {
  background: linear-gradient(135deg, #ff5e62, #ff9966);
  animation: unhealthyPulse 6s infinite alternate;
}

/* Unhealthy (151-200) - Warning animation */
.aqi-compact-dashboard[data-aqi-level="unhealthy"] {
  background: linear-gradient(135deg, #eb3349, #f45c43);
  animation: unhealthyAlert 4s infinite alternate;
}

/* Very Unhealthy (201-300) - Dangerous animation */
.aqi-compact-dashboard[data-aqi-level="very-unhealthy"] {
  background: linear-gradient(135deg, #8e2de2, #4a00e0);
  animation: veryUnhealthy 3s infinite alternate;
}

/* Hazardous (300+) - Emergency animation */
.aqi-compact-dashboard[data-aqi-level="hazardous"] {
  background: linear-gradient(135deg, #d31027, #ea384d);
  animation: hazardFlash 2s infinite alternate;
}

/* Keyframes for animations */
@keyframes goodPulse {
  0% { background-size: 100% 100%; }
  100% { background-size: 150% 150%; }
}

@keyframes moderateWave {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes unhealthyPulse {
  0%, 100% { opacity: 0.8; }
  50% { opacity: 1; }
}

@keyframes unhealthyAlert {
  0% { background-color: #eb3349; }
  50% { background-color: #f45c43; }
  100% { background-color: #eb3349; }
}

@keyframes veryUnhealthy {
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(20deg); }
}

@keyframes hazardFlash {
  0%, 49% { background-color: #d31027; }
  50%, 100% { background-color: #000000; }
}

/* Optional particle effect overlay */
.aqi-compact-dashboard::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(white 1px, transparent 1px);
  background-size: 10px 10px;
  opacity: 0.1;
  pointer-events: none;
  animation: particleMove 20s linear infinite;
}

@keyframes particleMove {
  0% { background-position: 0 0; }
  100% { background-position: 100px 100px; }
}

        .loading-overlay {
          position: absolute;
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
          border-radius: 16px;
        }

        .spinner {
          width: 50px;
          height: 50px;
          border: 4px solid rgba(66, 153, 225, 0.2);
          border-top-color: #4299e1;
          border-radius: 50%;
          margin-bottom: 15px;
        }

        .loading-overlay p {
          font-size: 1rem;
          color: #495057;
          font-weight: 500;
        }

        .error-card {
          background: white;
          border-radius: 12px;
          padding: 16px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          max-width: 100%;
          margin: 10px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .error-content {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .error-icon {
          font-size: 1.5rem;
          color: #dc3545;
        }

        .error-text {
          flex: 1;
          font-weight: 500;
          color: #dc3545;
          font-size: 0.95rem;
        }

        .retry-button {
          align-self: flex-end;
          background: #dc3545;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 8px;
          font-weight: 500;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .retry-button:hover {
          background: #c82333;
          transform: translateY(-1px);
        }

        .dashboard-container {
          width: 100%;
          padding: 16px;
        }

        .dashboard-row {
          display: flex;
          gap: 16px;
          width: 100%;
          overflow-x: auto;
          padding-bottom: 8px;
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 #f1f5f9;
        }

        .dashboard-row::-webkit-scrollbar {
          height: 6px;
        }

        .dashboard-row::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }

        .dashboard-row::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 3px;
        }

        
        .aqi-main-card,
        .pollutants-card,
        .advice-card {
          flex: 1 0 300px;
          background: linear-gradient(to right, #FF6347, #DC143C);
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          min-height: 220px;
          display: flex;
          flex-direction: column;
        }

        .aqi-main-card {
          color: white;
          position: relative;
          overflow: hidden;
          max-width: 280px;
        }

        .aqi-main-card::after {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%);
        }

        .location-info {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 15px;
        }

        .location-icon {
          font-size: 1.5rem;
          opacity: 0.9;
        }

        .location-details h3 {
          margin: 0;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .location-details p {
          margin: 4px 0 0;
          font-size: 0.75rem;
          opacity: 0.9;
        }

        .aqi-display {
          text-align: center;
          margin: 10px 0;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .aqi-emoji {
          font-size: 2.5rem;
          margin-bottom: 5px;
        }

        .aqi-value {
          font-size: 3rem;
          font-weight: 800;
          line-height: 1;
          margin: 5px 0;
          text-shadow: 0 3px 6px rgba(0,0,0,0.2);
        }

        .aqi-status {
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 10px;
          text-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .aqi-gauge-container {
          margin-top: auto;
        }

        .aqi-gauge-labels {
          display: flex;
          justify-content: space-between;
          font-size: 0.7rem;
          margin-bottom: 5px;
          opacity: 0.9;
        }

        .aqi-gauge {
          height: 8px;
          background: rgba(0,0,0,0.2);
          border-radius: 4px;
          overflow: hidden;
        }

        .gauge-fill {
          height: 100%;
          border-radius: 4px;
        }

        .pollutants-card h4,
         {
          margin: 0 0 15px;
          font-size: 1rem;
          font-weight: 600;
          color: #1e293b;
        }

        .pollutants-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          flex-grow: 1;
        }

        .pollutant-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px;
          background: rgba(241, 245, 249, 0.5);
          border-radius: 8px;
        }

        .pollutant-icon {
          font-size: 1.5rem;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .pollutant-details {
          flex: 1;
        }

        .pollutant-name {
          font-size: 0.8rem;
          color: #64748b;
          font-weight: 500;
        }

        .pollutant-value {
          font-size: 1.1rem;
          font-weight: 700;
          color: #1e293b;
          margin-top: 2px;
        }

        .pollutant-unit {
          font-size: 0.7rem;
          color: #94a3b8;
          margin-left: 4px;
        }

        .advice-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 15px;
        }

        .advice-icon {
          font-size: 1.5rem;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f1f5f9;
          border-radius: 8px;
        }

        .advice-text {
          font-size: 0.9rem;
          color:rgb(255, 255, 255);
          line-height: 1.4;
          flex-grow: 1;
        }

        .advice-actions {
          display: flex;
          gap: 10px;
          margin-top: 15px;
        }

        .action-button {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px;
          border: none;
          border-radius: 8px;
          background: #f1f5f9;
          color: #334155;
          font-size: 0.8rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .action-button:hover {
          background: #e2e8f0;
          transform: translateY(-1px);
        }

        .action-button span {
          font-size: 1rem;
        }

        /* Indian Cities Section Styles */
        .indian-cities-section {
          margin-top: 24px;
          padding: 16px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
        }

        .indian-cities-section h3 {
          margin: 0 0 16px;
          font-size: 1.2rem;
          font-weight: 600;
        }

        .cities-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 12px;
        }

        .city-aqi-card {
          padding: 12px;
          border-radius: 8px;
          text-align: center;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s;
          cursor: pointer;
        }

        .city-aqi-card:hover {
          transform: translateY(-3px);
        }

        .city-name {
          font-size: 0.9rem;
          font-weight: 500;
          margin-bottom: 8px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .city-aqi-value {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 4px 0;
        }

        .city-aqi-status {
          font-size: 0.8rem;
          opacity: 0.9;
        }

        .toggle-cities-button {
          margin-top: 16px;
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s;
          display: block;
          margin-left: auto;
          margin-right: auto;
        }

        .toggle-cities-button:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        @media (max-width: 1024px) {
          .dashboard-row {
            flex-wrap: wrap;
            overflow-x: visible;
          }
          
          .aqi-main-card,
          .pollutants-card,
          .advice-card {
            flex: 1 0 calc(50% - 8px);
            min-width: 0;
          }

          .cities-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .aqi-main-card,
          .pollutants-card,
          .advice-card {
            flex: 1 0 100%;
          }
          
          .pollutants-grid {
            grid-template-columns: repeat(4, 1fr);
          }

          .cities-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 480px) {
          .pollutants-grid {
            grid-template-columns: 1fr 1fr;
          }
          
          .aqi-value {
            font-size: 2.5rem;
          }
          
          .aqi-status {
            font-size: 1.1rem;
          }

          .cities-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default AQIDashboardCompact;
