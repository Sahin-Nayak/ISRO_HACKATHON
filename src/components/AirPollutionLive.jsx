import React, { useState } from 'react';

const AirPollutionLive = () => {
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
        // Use geolocation if available, otherwise fallback to 'here'
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
      0: { text: 'Good', color: '#4CAF50', description: 'Air quality is satisfactory, and air pollution poses little or no risk.' },
      51: { text: 'Moderate', color: '#FFC107', description: 'Air quality is acceptable; however, there may be a moderate health concern for a very small number of people.' },
      101: { text: 'Unhealthy for Sensitive Groups', color: '#FF9800', description: 'Members of sensitive groups may experience health effects.' },
      151: { text: 'Unhealthy', color: '#F44336', description: 'Everyone may begin to experience health effects.' },
      201: { text: 'Very Unhealthy', color: '#9C27B0', description: 'Health warnings of emergency conditions.' },
      301: { text: 'Hazardous', color: '#880E4F', description: 'Health alert: everyone may experience more serious health effects.' }
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
    <div className="main-div">
    <div className="air-pollution-container">
      <h1 className="header">Air Quality Dashboard (WAQI)</h1>
      
      <form onSubmit={fetchAirQualityData} className="input-form">
        <div className="input-group">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={location.city}
            onChange={handleInputChange}
            placeholder="e.g. Delhi"
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="stationId">Station ID (optional):</label>
          <input
            type="text"
            id="stationId"
            name="stationId"
            value={location.stationId}
            onChange={handleInputChange}
            placeholder="e.g. 1437"
          />
        </div>
        
        <div className="button-group">
          <button className="button" type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Get Air Quality'}
          </button>
          <button 
            className="button secondary" 
            type="button" 
            onClick={fetchAirQualityData}
            disabled={loading}
          >
            Use My Location
          </button>
        </div>
      </form>

      {error && <div className="error-message">{error}</div>}
      
      {loading && <div className="loading">Loading air quality data...</div>}

      {pollutionData && (
        <div className="pollution-data">
          <div className="location-info">
            <h2>{pollutionData.city.name}</h2>
            <p>Station: {pollutionData.city.url || 'Unknown'}</p>
            <p>Coordinates: {pollutionData.city.geo?.join(', ') || 'Unknown'}</p>
          </div>
          
          {(() => {
            const aqi = pollutionData.aqi;
            const aqiQuality = getAqiQuality(aqi);
            
            return (
              <>
                <div 
                  className="aqi-indicator"
                  style={{ backgroundColor: aqiQuality.color }}
                >
                  <h2>Air Quality Index (AQI)</h2>
                  <p className="aqi-value">{aqi}</p>
                  <p className="aqi-text">{aqiQuality.text}</p>
                  <p className="aqi-description">{aqiQuality.description}</p>
                  {pollutionData.dominentpol && (
                    <p className="dominant-pollutant">
                      Dominant Pollutant: {getPollutantName(pollutionData.dominentpol)}
                    </p>
                  )}
                </div>
                
                <h3 className="section-title">Pollutants Concentration</h3>
                <div className="pollutants-grid">
                  {Object.entries(pollutionData.iaqi).map(([code, data]) => (
                    <div className="pollutant-card" key={code}>
                      <h3>{getPollutantName(code)}</h3>
                      <p>{data.v} {getPollutantUnit(code)}</p>
                      <p className="pollutant-name">{getPollutantName(code)}</p>
                    </div>
                  ))}
                </div>
                
                <h3 className="section-title">Forecast</h3>
                {pollutionData.forecast?.daily ? (
                  <div className="forecast-container">
                    {Object.entries(pollutionData.forecast.daily).map(([pollutant, days]) => (
                      <div key={pollutant} className="forecast-item">
                        <h4>{getPollutantName(pollutant)}</h4>
                        <div className="forecast-days">
                          {days.map((day, index) => (
                            <div key={index} className="forecast-day">
                              <p>{new Date(day.day).toLocaleDateString('en-US', { weekday: 'short' })}</p>
                              <p>Avg: {day.avg}</p>
                              <p>Max: {day.max}</p>
                              <p>Min: {day.min}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No forecast data available</p>
                )}
                
                <p className="timestamp">
                  Last updated: {formatTimestamp(pollutionData.time.v)}
                </p>
                
              </>
            );
          })()}
        </div>
      )}

      <style jsx>{`
        .main-div {
          ;
          min-height: 90vh;
          padding: 20px;    
          box-sizing: border-box;}
              
        .air-pollution-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
        }

        .header {
          text-align: center;
          color: #2c3e50;
          margin-bottom: 30px;
        }

        .input-form {
          background: #f5f5f5;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 20px;
        }

        .input-group {
          margin-bottom: 15px;
        }

        .input-group label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }

        .input-group input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
        }

        .button-group {
          display: flex;
          gap: 10px;
        }

        .button {
          flex: 1;
          padding: 12px;
          background-color: #3498db;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .button.secondary {
          background-color: #95a5a6;
        }

        .button:hover {
          background-color: #2980b9;
        }

        .button.secondary:hover {
          background-color: #7f8c8d;
        }

        .button:disabled {
          background-color: #bdc3c7;
          cursor: not-allowed;
        }

        .loading {
          text-align: center;
          padding: 50px;
          font-size: 18px;
          color: #666;
        }

        .error-message {
          background-color: #ffebee;
          color: #c62828;
          padding: 15px;
          border-radius: 5px;
          margin-bottom: 20px;
          text-align: center;
        }

        .location-info {
          text-align: center;
          margin-bottom: 20px;
          color: #555;
        }

        .location-info h2 {
          margin: 0;
          color: #2c3e50;
        }

        .aqi-indicator {
          color: white;
          padding: 20px;
          border-radius: 10px;
          text-align: center;
          margin-bottom: 30px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .aqi-value {
          font-size: 48px;
          font-weight: bold;
          margin: 10px 0;
        }

        .aqi-text {
          font-size: 24px;
          margin: 0;
          font-weight: bold;
        }

        .aqi-description {
          font-size: 16px;
          margin: 10px 0 0;
          font-style: italic;
        }

        .dominant-pollutant {
          font-size: 16px;
          margin: 10px 0 0;
          background: rgba(0, 0, 0, 0.1);
          display: inline-block;
          padding: 5px 10px;
          border-radius: 20px;
        }

        .section-title {
          color: #2c3e50;
          border-bottom: 2px solid #eee;
          padding-bottom: 10px;
          margin-top: 30px;
        }

        .pollutants-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 15px;
          margin-bottom: 20px;
        }

        .pollutant-card {
          background-color: white;
          border-radius: 8px;
          padding: 15px;
          text-align: center;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s;
        }

        .pollutant-card:hover {
          transform: translateY(-5px);
        }

        .pollutant-card h3 {
          margin: 0;
          font-size: 18px;
          color: #2c3e50;
        }

        .pollutant-card p {
          margin: 5px 0;
          font-size: 16px;
        }

        .pollutant-name {
          font-size: 14px;
          color: #7f8c8d;
        }

        .forecast-container {
          margin-bottom: 20px;
        }

        .forecast-item {
          margin-bottom: 20px;
        }

        .forecast-days {
          display: flex;
          gap: 10px;
          overflow-x: auto;
          padding-bottom: 10px;
        }

        .forecast-day {
          background-color: white;
          border-radius: 8px;
          padding: 10px;
          min-width: 100px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          text-align: center;
        }

        .forecast-day p {
          margin: 5px 0;
          font-size: 14px;
        }

        .timestamp {
          text-align: center;
          color: #7f8c8d;
          font-size: 14px;
          margin-top: 20px;
        }

        .attribution {
          text-align: center;
          margin-top: 20px;
          font-size: 14px;
          color: #7f8c8d;
        }

        .attribution a {
          color: #3498db;
          text-decoration: none;
        }

        .attribution a:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .pollutants-grid {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          }
          
          .button-group {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
    </div>
  );
};

export default AirPollutionLive;