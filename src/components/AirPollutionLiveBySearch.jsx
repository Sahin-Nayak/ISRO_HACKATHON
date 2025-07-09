import React, { useState } from 'react';

const AirPollutionLiveBySearch = () => {
  const [pollutionData, setPollutionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState({
    city: '',
    stationId: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocation(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const fetchAirQualityData = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let apiUrl;
      if (location.city) {
        apiUrl = `https://api.waqi.info/feed/${encodeURIComponent(location.city)}/?token=4651f75d4b06d6af245ca5dee7e45334373e3b4d`;
      } else if (location.stationId) {
        apiUrl = `https://api.waqi.info/feed/@${location.stationId}/?token=4651f75d4b06d6af245ca5dee7e45334373e3b4d`;
      } else {
        if (navigator.geolocation) {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
          apiUrl = `https://api.waqi.info/feed/geo:${position.coords.latitude};${position.coords.longitude}/?token=4651f75d4b06d6af245ca5dee7e45334373e3b4d`;
        } else {
          apiUrl = 'https://api.waqi.info/feed/here/?token=4651f75d4b06d6af245ca5dee7e45334373e3b4d';
        }
      }

      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('Failed to fetch data');
      
      const data = await response.json();
      if (data.status !== 'ok') {
        throw new Error(data.data || 'Unable to get air quality data');
      }
      
      setPollutionData(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getAqiQuality = (aqi) => {
    const quality = {
      0: { text: 'Good', color: '#4CAF50', emoji: '😊', description: 'Air quality is satisfactory, and air pollution poses little or no risk.' },
      51: { text: 'Moderate', color: '#FFC107', emoji: '😐', description: 'Air quality is acceptable; however, there may be a moderate health concern for a very small number of people.' },
      101: { text: 'Unhealthy for Sensitive Groups', color: '#FF9800', emoji: '😷', description: 'Members of sensitive groups may experience health effects.' },
      151: { text: 'Unhealthy', color: '#F44336', emoji: '😨', description: 'Everyone may begin to experience health effects.' },
      201: { text: 'Very Unhealthy', color: '#9C27B0', emoji: '😱', description: 'Health warnings of emergency conditions.' },
      301: { text: 'Hazardous', color: '#880E4F', emoji: '☠️', description: 'Health alert: everyone may experience more serious health effects.' }
    };
    
    let category;
    if (aqi <= 50) category = quality[0];
    else if (aqi <= 100) category = quality[51];
    else if (aqi <= 150) category = quality[101];
    else if (aqi <= 200) category = quality[151];
    else if (aqi <= 300) category = quality[201];
    else category = quality[301];
    
    return category;
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  const getPollutantName = (code) => {
    const names = {
      'pm25': 'PM2.5',
      'pm10': 'PM10',
      'o3': 'Ozone (O₃)',
      'no2': 'Nitrogen Dioxide (NO₂)',
      'so2': 'Sulfur Dioxide (SO₂)',
      'co': 'Carbon Monoxide (CO)',
      't': 'Temperature',
      'w': 'Wind',
      'r': 'Rain',
      'h': 'Humidity',
      'd': 'Dew',
      'p': 'Atmospheric Pressure'
    };
    return names[code] || code;
  };

  const getPollutantUnit = (code) => {
    const units = {
      'pm25': 'µg/m³',
      'pm10': 'µg/m³',
      'o3': 'ppb',
      'no2': 'ppb',
      'so2': 'ppb',
      'co': 'ppm',
      't': '°C',
      'w': 'm/s',
      'r': 'mm',
      'h': '%',
      'd': '°C',
      'p': 'hPa'
    };
    return units[code] || '';
  };

  return (
    <div className="air-pollution-app">
      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1>Check Live Air Quality </h1>
          <p>Check real-time air pollution levels anywhere in the world</p>
        </header>

        <div className="search-card">
          <form onSubmit={fetchAirQualityData} className="search-form">
            <div className="form-group">
              <input
                type="text"
                name="city"
                value={location.city}
                onChange={handleInputChange}
                placeholder="Enter city name (e.g. Delhi)"
                className="search-input"
              />
              <button 
                type="submit" 
                className="search-button"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading-spinner"></span>
                ) : (
                  'Search'
                )}
              </button>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="stationId"
                value={location.stationId}
                onChange={handleInputChange}
                placeholder="Or enter station ID"
                className="search-input secondary"
              />
              <button 
                type="button" 
                className="location-button"
                onClick={fetchAirQualityData}
                disabled={loading}
              >
                <span className="location-icon">📍</span> My Location
              </button>
            </div>
          </form>
        </div>

        {error && (
          <div className="error-card">
            <div className="error-icon">⚠️</div>
            <div className="error-text">{error}</div>
          </div>
        )}

        {loading && !pollutionData && (
          <div className="loading-card">
            <div className="loading-spinner large"></div>
            <p>Fetching air quality data...</p>
          </div>
        )}

        {pollutionData && (
          <div className="results-container">
            <div className="location-card">
              <h2>
                <span className="location-icon">📍</span> {pollutionData.city.name}
              </h2>
              <div className="location-details">
                <div className="detail-item">
                  <span className="detail-label">Coordinates:</span>
                  <span>{pollutionData.city.geo?.join(', ') || 'Unknown'}</span>
                </div>
                <div className="detail-item">
                  {/* <span className="detail-label">Last Updated:</span>
                  <span>{formatTimestamp(pollutionData.time.v)}</span> */}
                </div>
              </div>
            </div>

            <div className="aqi-card" style={{ 
              backgroundColor: getAqiQuality(pollutionData.aqi).color
            }}>
              <div className="aqi-emoji">{getAqiQuality(pollutionData.aqi).emoji}</div>
              <div className="aqi-main">
                <div className="aqi-value">{pollutionData.aqi}</div>
                <div className="aqi-label">Air Quality Index</div>
              </div>
              <div className="aqi-status">
                {getAqiQuality(pollutionData.aqi).text}
              </div>
              <div className="aqi-description">
                {getAqiQuality(pollutionData.aqi).description}
              </div>
              {pollutionData.dominentpol && (
                <div className="dominant-pollutant">
                  Dominant Pollutant: {getPollutantName(pollutionData.dominentpol)}
                </div>
              )}
            </div>

            <div className="pollutants-section">
              <h3 className="section-title">
                <span className="section-icon">📊</span> Pollutants Concentration
              </h3>
              <div className="pollutants-grid">
                {Object.entries(pollutionData.iaqi).map(([code, data]) => (
                  <div className="pollutant-card" key={code}>
                    <div className="pollutant-value">
                      {data.v} <span className="pollutant-unit">{getPollutantUnit(code)}</span>
                    </div>
                    <div className="pollutant-name">{getPollutantName(code)}</div>
                  </div>
                ))}
              </div>
            </div>

            {pollutionData.forecast?.daily && (
              <div className="forecast-section">
                <h3 className="section-title">
                  <span className="section-icon">🔮</span> 3-Day Forecast
                </h3>
                <div className="forecast-container">
                  {Object.entries(pollutionData.forecast.daily).map(([pollutant, days]) => (
                    <div key={pollutant} className="forecast-pollutant">
                      <h4>{getPollutantName(pollutant)}</h4>
                      <div className="forecast-days">
                        {days.slice(0, 3).map((day, index) => (
                          <div key={index} className="forecast-day">
                            <div className="day-name">
                              {new Date(day.day).toLocaleDateString('en-US', { weekday: 'short' })}
                            </div>
                            <div className="day-values">
                              <div className="day-value">
                                <span>Avg:</span>
                                <span>{day.avg}</span>
                              </div>
                              <div className="day-value">
                                <span>Max:</span>
                                <span>{day.max}</span>
                              </div>
                              <div className="day-value">
                                <span>Min:</span>
                                <span>{day.min}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            
          </div>
        )}
      </div>

      <style jsx>{`
        .air-pollution-app {
          min-height: 20vh;
          background: #0f172a;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #2d3748;
        }

        .dashboard-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        .dashboard-header {
          text-align: center;
          margin-bottom: 30px;
          padding: 20px 0;
        }

        .dashboard-header h1 {
          margin: 0;
          font-size: 3rem;
          color: #1a365d;
          font-weight: 700;
          background: linear-gradient(to right, #3182ce, #805ad5);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .dashboard-header p {
          margin: 10px 0 0;
          font-size: 1.1rem;
          color: #4a5568;
        }

        .search-card {
          background: white;
          border-radius: 12px;
          padding: 25px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          margin-bottom: 20px;
        }

        .search-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .form-group {
          display: flex;
          gap: 10px;
        }

        .search-input {
          flex: 1;
          padding: 12px 15px;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.2s;
        }

        .search-input:focus {
          outline: none;
          border-color: #4299e1;
          box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
        }

        .search-input.secondary {
          background-color: #0f172a;
        }

        .search-button, .location-button {
          padding: 0 20px;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 120px;
        }

        .search-button {
          background-color: #4299e1;
          color: white;
        }

        .search-button:hover {
          background-color: #3182ce;
        }

        .location-button {
          background-color:#4299e1;
          color:rgb(255, 255, 255);
        }

        .location-button:hover {
          background-color: #3182ce;
        }

        .location-icon {
          margin-right: 8px;
        }

        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s ease-in-out infinite;
        }

        .loading-spinner.large {
          width: 40px;
          height: 40px;
          border-width: 4px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .error-card {
          background-color: #fff5f5;
          color: #c53030;
          padding: 15px 20px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }

        .error-icon {
          font-size: 1.5rem;
        }

        .error-text {
          font-weight: 500;
        }

        .loading-card {
          background: white;
          border-radius: 12px;
          padding: 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 20px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          margin-bottom: 20px;
        }

        .loading-card p {
          margin: 0;
          color: #4a5568;
          font-size: 1.1rem;
        }

        .results-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .location-card {
          background: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

        .location-card h2 {
          margin: 0 0 10px;
          font-size: 1.5rem;
          color: #2d3748;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .location-details {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 10px;
        }

        .detail-item {
          display: flex;
          gap: 5px;
          font-size: 0.95rem;
        }

        .detail-label {
          font-weight: 600;
          color: #4a5568;
        }

        .aqi-card {
          color: white;
          padding: 25px;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .aqi-card::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%);
        }

        .aqi-emoji {
          font-size: 3rem;
          margin-bottom: 10px;
        }

        .aqi-main {
          margin-bottom: 10px;
        }

        .aqi-value {
          font-size: 4rem;
          font-weight: 700;
          line-height: 1;
        }

        .aqi-label {
          font-size: 1.2rem;
          opacity: 0.9;
        }

        .aqi-status {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 10px;
        }

        .aqi-description {
          font-size: 1rem;
          opacity: 0;
                    max-width: 600px;
          margin: 0 auto;
          line-height: 1.5;
        }

        .dominant-pollutant {
          background: rgba(0, 0, 0, 0.1);
          display: inline-block;
          padding: 8px 15px;
          border-radius: 20px;
          font-size: 0.9rem;
          margin-top: 15px;
        }

        .pollutants-section {
          background: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

        .section-title {
          margin: 0 0 20px;
          font-size: 1.3rem;
          color: #2d3748;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .section-icon {
          font-size: 1.2rem;
        }

        .pollutants-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 15px;
        }

        .pollutant-card {
          background: #f8fafc;
          border-radius: 8px;
          padding: 15px;
          text-align: center;
          transition: all 0.2s;
        }

        .pollutant-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .pollutant-value {
          font-size: 1.8rem;
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 5px;
        }

        .pollutant-unit {
          font-size: 1rem;
          color: #718096;
        }

        .pollutant-name {
          font-size: 0.9rem;
          color: #4a5568;
          margin-top: 5px;
        }

        .forecast-section {
          background: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

        .forecast-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .forecast-pollutant {
          background: #f8fafc;
          border-radius: 8px;
          padding: 15px;
        }

        .forecast-pollutant h4 {
          margin: 0 0 15px;
          color: #2d3748;
          font-size: 1.1rem;
        }

        .forecast-days {
          display: flex;
          gap: 10px;
          overflow-x: auto;
          padding-bottom: 5px;
        }

        .forecast-day {
          min-width: 120px;
          background: white;
          border-radius: 8px;
          padding: 12px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .day-name {
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 10px;
          text-align: center;
        }

        .day-values {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .day-value {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
        }

        .day-value span:first-child {
          color: #718096;
        }

        .day-value span:last-child {
          font-weight: 500;
          color: #2d3748;
        }

        .data-source {
          text-align: center;
          color: #718096;
          font-size: 0.9rem;
          margin-top: 10px;
        }

        @media (max-width: 768px) {
          .dashboard-header h1 {
            font-size: 2rem;
          }

          .form-group {
            flex-direction: column;
          }

          .search-button, .location-button {
            width: 100%;
          }

          .pollutants-grid {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          }

          .aqi-value {
            font-size: 3rem;
          }
        }

        @media (max-width: 480px) {
          .dashboard-container {
            padding: 15px;
          }

          .dashboard-header h1 {
            font-size: 1.8rem;
          }

          .search-card {
            padding: 20px;
          }

          .aqi-card {
            padding: 20px;
          }

          .aqi-value {
            font-size: 2.5rem;
          }

          .forecast-day {
            min-width: 100px;
            padding: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default AirPollutionLiveBySearch;