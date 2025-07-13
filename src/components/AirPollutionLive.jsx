import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { HeatmapLayer } from 'react-leaflet-heatmap-layer-v3';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Helper functions defined outside the component
const getAqiQuality = (aqi) => {
  if (!aqi || aqi === '-') return null;
  
  const aqiNum = parseInt(aqi);
  const quality = {
    0: { 
      text: 'Good', 
      color: '#4CAF50', 
      description: 'Air quality is satisfactory, and air pollution poses little or no risk.',
      icon: '😊'
    },
    51: { 
      text: 'Moderate', 
      color: '#FFC107', 
      description: 'Air quality is acceptable; however, there may be a moderate health concern for a very small number of people.',
      icon: '😐'
    },
    101: { 
      text: 'Unhealthy for Sensitive Groups', 
      color: '#FF9800', 
      description: 'Members of sensitive groups may experience health effects.',
      icon: '😷'
    },
    151: { 
      text: 'Unhealthy', 
      color: '#F44336', 
      description: 'Everyone may begin to experience health effects.',
      icon: '😨'
    },
    201: { 
      text: 'Very Unhealthy', 
      color: '#9C27B0', 
      description: 'Health warnings of emergency conditions.',
      icon: '😱'
    },
    301: { 
      text: 'Hazardous', 
      color: '#880E4F', 
      description: 'Health alert: everyone may experience more serious health effects.',
      icon: '☠️'
    }
  };
  
  let category;
  if (aqiNum <= 50) category = quality[0];
  else if (aqiNum <= 100) category = quality[51];
  else if (aqiNum <= 150) category = quality[101];
  else if (aqiNum <= 200) category = quality[151];
  else if (aqiNum <= 300) category = quality[201];
  else category = quality[301];
  
  return category;
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

const getPollutantColor = (code) => {
  const colors = {
    'pm25': '#FF5733',
    'pm10': '#33FF57',
    'o3': '#3357FF',
    'no2': '#F333FF',
    'so2': '#FF33F3',
    'co': '#33FFF5',
    'default': '#94a3b8'
  };
  return colors[code] || colors.default;
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

const formatTimestamp = (timestamp) => {
  if (!timestamp) return 'Unknown';
  return new Date(timestamp * 1000).toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const AirPollutionLive = () => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStation, setSelectedStation] = useState(null);
  const [mapCenter, setMapCenter] = useState([20.5937, 78.9629]);
  const [zoomLevel, setZoomLevel] = useState(5);
  const [graphData, setGraphData] = useState(null);
  const [mapMode, setMapMode] = useState('stations');
  const mapRef = useRef(null);

  // Prepare heatmap data
  const heatmapData = stations.map(station => ({
    lat: station.city.geo[0],
    lng: station.city.geo[1],
    intensity: station.aqi === '-' ? 0 : parseInt(station.aqi)
  }));

  // Prepare graph view data
  const graphViewData = {
    labels: stations.slice(0, 20).map(station => station.city.name),
    datasets: [{
      label: 'AQI',
      data: stations.slice(0, 20).map(station => station.aqi === '-' ? 0 : parseInt(station.aqi)),
      backgroundColor: stations.slice(0, 20).map(station => 
        getAqiQuality(station.aqi)?.color || '#94a3b8'
      ),
      borderColor: '#1e293b',
      borderWidth: 1,
    }]
  };

  // Chart options for graph view
  const graphViewOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `AQI: ${context.raw}`,
          afterLabel: (context) => {
            const station = stations[context.dataIndex];
            return `Dominant Pollutant: ${getPollutantName(station.dominentpol || 'N/A')}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'AQI Value' }
      },
      x: {
        title: { display: true, text: 'Monitoring Stations' },
        ticks: {
          autoSkip: false,
          maxRotation: 45,
          minRotation: 45
        }
      }
    },
    maintainAspectRatio: false
  };

  // Create custom marker icon based on AQI
  const createAqiIcon = (aqi) => {
    const aqiNum = aqi === '-' ? 0 : parseInt(aqi);
    const size = Math.max(30, Math.min(50, aqiNum / 5));
    const quality = getAqiQuality(aqi);
    const color = quality?.color || '#94a3b8';
    const emoji = quality?.icon || '❓';
    
    return L.divIcon({
      html: `
        <div style="
          width: ${size}px;
          height: ${size}px;
          background: ${color};
          border-radius: 50%;
          border: 2px solid white;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: ${size / 2.5}px;
          box-shadow: 0 0 10px rgba(0,0,0,0.3);
        ">
          ${emoji}
        </div>
      `,
      className: '',
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2]
    });
  };

  // Reset map view to show all of India
  const resetMapView = () => {
    setSelectedStation(null);
    setMapCenter([20.5937, 78.9629]);
    setZoomLevel(5);
    if (mapRef.current) {
      mapRef.current.flyTo([20.5937, 78.9629], 5);
    }
  };

  // Chart options for station details
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) label += ': ';
            if (context.parsed.y !== null) {
              label += context.parsed.y + ' ' + getPollutantUnit(context.dataset.label.split(' ')[0].toLowerCase());
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Concentration' }
      },
      x: {
        title: { display: true, text: 'Time' }
      }
    },
    maintainAspectRatio: false
  };

  // Fetch all stations in India
  useEffect(() => {
    const fetchStations = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const boundsResponse = await fetch('https://api.waqi.info/map/bounds/?latlng=6.4626999,68.1097,35.5087008,97.395561&token=4651f75d4b06d6af245ca5dee7e45334373e3b4d');
        
        if (!boundsResponse.ok) throw new Error('Failed to fetch stations');
        
        const boundsData = await boundsResponse.json();
        
        if (boundsData.status !== 'ok') {
          throw new Error(boundsData.data || 'Unable to get station data');
        }
        
        const validStations = boundsData.data.filter(station => 
          station.lat && station.lon && station.aqi !== '-'
        );

        const stationsWithDetails = await Promise.all(
          validStations.map(async (station) => {
            try {
              const detailResponse = await fetch(`https://api.waqi.info/feed/@${station.uid}/?token=4651f75d4b06d6af245ca5dee7e45334373e3b4d`);
              if (!detailResponse.ok) return null;
              
              const detailData = await detailResponse.json();
              return detailData.status === 'ok' ? detailData.data : null;
            } catch {
              return null;
            }
          })
        );

        setStations(stationsWithDetails.filter(Boolean));
      } catch (err) {
        setError(err.message);
        console.error('Error fetching stations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStations();
  }, []);

  // Fetch historical data for graphs when a station is selected
  useEffect(() => {
    const fetchHistoricalData = async () => {
      if (!selectedStation) return;
      
      try {
        const response = await fetch(`https://api.waqi.info/api/feed/@${selectedStation.idx}/obs.en.json?token=4651f75d4b06d6af245ca5dee7e45334373e3b4d`);
        
        if (!response.ok) throw new Error('Failed to fetch historical data');
        
        const data = await response.json();
        
        if (data.rxs?.obs?.length > 0) {
          prepareGraphData(data.rxs.obs[0].msg);
        }
      } catch (err) {
        console.error('Error fetching historical data:', err);
      }
    };

    fetchHistoricalData();
  }, [selectedStation]);

  // Prepare graph data from historical observations
  const prepareGraphData = (observations) => {
    if (!observations || !observations.iaqi) return;
    
    const pollutants = Object.keys(observations.iaqi).filter(p => p !== 'p' && p !== 't');
    const timeStamps = observations.time?.v || [];
    
    const datasets = pollutants.map(pollutant => {
      const values = observations.iaqi[pollutant].map(item => item.v);
      const color = getPollutantColor(pollutant);
      
      return {
        label: getPollutantName(pollutant),
        data: values,
        borderColor: color,
        backgroundColor: `${color}40`,
        tension: 0.3,
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: color,
      };
    });
    
    const labels = timeStamps.map(ts => 
      new Date(ts * 1000).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    );
    
    setGraphData({
      labels,
      datasets,
    });
  };

  return (
    <div className="main-container">
      <div className="dashboard-container" id="dashboard-container">
        <header className="dashboard-header">
          <h1>India's Air Quality Live Dashboard</h1>
          <p>Real-time air quality monitoring across Indian cities</p>
        </header>

        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        {loading && (
          <div className="loading-indicator">
            <div className="spinner"></div>
            <p>Loading air quality data...</p>
          </div>
        )}

        <div className="map-controls">
          <button 
            className={`map-mode-button ${mapMode === 'stations' ? 'active' : ''}`}
            onClick={() => setMapMode('stations')}
          >
            Station View
          </button>
          <button 
            className={`map-mode-button ${mapMode === 'heatmap' ? 'active' : ''}`}
            onClick={() => setMapMode('heatmap')}
          >
            Heatmap View
          </button>
          <button 
            className={`map-mode-button ${mapMode === 'graph' ? 'active' : ''}`}
            onClick={() => setMapMode('graph')}
          >
            Graph View
          </button>
        </div>

        {mapMode !== 'graph' ? (
          <div className="map-container">
            <MapContainer 
              center={mapCenter} 
              zoom={zoomLevel} 
              style={{ height: '70vh', width: '100%' }}
              zoomControl={false}
              whenCreated={(map) => { mapRef.current = map; }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              
              {mapMode === 'stations' && stations.map((station) => (
                <Marker
                  key={station.idx}
                  position={[station.city.geo[0], station.city.geo[1]]}
                  icon={createAqiIcon(station.aqi)}
                  eventHandlers={{
                    click: () => {
                      setSelectedStation(station);
                      setMapCenter([station.city.geo[0], station.city.geo[1]]);
                      setZoomLevel(12);
                    },
                  }}
                >
                  <Popup>
                    <div className="station-popup">
                      <h3>{station.city.name}</h3>
                      <div className="popup-aqi">
                        <span className="aqi-value">{station.aqi}</span>
                        <span className="aqi-text">
                          {getAqiQuality(station.aqi)?.text || 'Unknown'}
                        </span>
                      </div>
                      <p className="popup-time">
                        Updated: {formatTimestamp(station.time?.v)}
                      </p>
                      <button 
                        className="details-button"
                        onClick={() => {
                          setSelectedStation(station);
                          if (mapRef.current) {
                            mapRef.current.closePopup();
                          }
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}

              {mapMode === 'heatmap' && (
                <HeatmapLayer
                  fitBoundsOnLoad
                  fitBoundsOnUpdate
                  points={heatmapData}
                  longitudeExtractor={point => point.lng}
                  latitudeExtractor={point => point.lat}
                  intensityExtractor={point => point.intensity}
                  radius={20}
                  max={300}
                  minOpacity={0.5}
                  useLocalExtrema={false}
                  gradient={{
                    0.1: '#4CAF50',  // Good
                    0.3: '#FFC107',  // Moderate
                    0.5: '#FF9800',  // Unhealthy for Sensitive Groups
                    0.7: '#F44336',  // Unhealthy
                    0.9: '#9C27B0',  // Very Unhealthy
                    1.0: '#880E4F'   // Hazardous
                  }}
                />
              )}
              
              <ZoomControl position="bottomright" />
            </MapContainer>

            <button 
              className="reset-button"
              onClick={resetMapView}
              disabled={loading}
            >
              Reset View
            </button>
          </div>
        ) : (
          <div className="graph-view-container">
            <h3>Top 20 Monitoring Stations by AQI</h3>
            <div className="graph-view">
              <Bar data={graphViewData} options={graphViewOptions} />
            </div>
            <div className="graph-legend">
              <p>Hover over bars to see station details and dominant pollutants</p>
            </div>
          </div>
        )}

        {selectedStation && (
          <div className="station-details">
            <div className="station-header">
              <h2>{selectedStation.city.name}</h2>
              <button 
                className="close-button"
                onClick={() => setSelectedStation(null)}
              >
                ×
              </button>
            </div>

            <div className="aqi-display">
              <div 
                className="aqi-indicator"
                style={{ backgroundColor: getAqiQuality(selectedStation.aqi)?.color || '#94a3b8' }}
              >
                <div className="aqi-emoji">
                  {getAqiQuality(selectedStation.aqi)?.icon || '❓'}
                </div>
                <div className="aqi-main">
                  <span className="aqi-value">{selectedStation.aqi}</span>
                  <span className="aqi-label">Air Quality Index</span>
                </div>
                <div className="aqi-description">
                  {getAqiQuality(selectedStation.aqi)?.text || 'Unknown'} - 
                  {getAqiQuality(selectedStation.aqi)?.description || ''}
                </div>
              </div>

              <div className="location-info" id="location-info">
                <div className="info-item">
                  <span className="info-label">📍 Coordinates:</span>
                  <span className="info-value">
                    {selectedStation.city.geo?.join(', ') || 'Unknown'}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">🕒 Last Updated:</span>
                  <span className="info-value">
                    {formatTimestamp(selectedStation.time?.v)}
                  </span>
                </div>
                {selectedStation.dominentpol && (
                  <div className="info-item">
                    <span className="info-label">⚠️ Dominant Pollutant:</span>
                    <span className="info-value">
                      {getPollutantName(selectedStation.dominentpol)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {graphData && (
              <>
                <h3 className="section-title">Pollutant Trends (Last 24 Hours)</h3>
                <div className="graph-container">
                  <Line data={graphData} options={chartOptions} />
                </div>
              </>
            )}

            <h3 className="section-title">Pollutants Concentration</h3>
            <div className="pollutants-grid" id="pollutants-grid">
              {Object.entries(selectedStation.iaqi).map(([code, data]) => (
                <div className="pollutant-card" key={code}>
                  <div className="pollutant-name">
                    {getPollutantName(code)}
                  </div>
                  <div className="pollutant-value">
                    {data.v} <span className="pollutant-unit">{getPollutantUnit(code)}</span>
                  </div>
                </div>
              ))}
            </div>

            {selectedStation.forecast?.daily && (
              <>
                <h3 className="section-title">3-Day Forecast</h3>
                <div className="forecast-container">
                  {Object.entries(selectedStation.forecast.daily).map(([pollutant, days]) => (
                    <div key={pollutant} className="forecast-item">
                      <h4>{getPollutantName(pollutant)}</h4>
                      <div className="forecast-days">
                        {days.slice(0, 3).map((day, index) => (
                          <div key={index} className="forecast-day">
                            <div className="day-name">
                              {new Date(day.day).toLocaleDateString('en-IN', { weekday: 'short' })}
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
              </>
            )}
          </div>
        )}

        <div className="aqi-legend">
          <h3>AQI Scale Guide</h3>
          <div className="legend-items">
            {[
              { range: '0-50', level: 'Good', color: '#4CAF50', icon: '😊' },
              { range: '51-100', level: 'Moderate', color: '#FFC107', icon: '😐' },
              { range: '101-150', level: 'Unhealthy for Sensitive Groups', color: '#FF9800', icon: '😷' },
              { range: '151-200', level: 'Unhealthy', color: '#F44336', icon: '😨' },
              { range: '201-300', level: 'Very Unhealthy', color: '#9C27B0', icon: '😱' },
              { range: '300+', level: 'Hazardous', color: '#880E4F', icon: '☠️' }
            ].map((item) => (
              <div key={item.range} className="legend-item">
                <div 
                  className="legend-color" 
                  style={{ backgroundColor: item.color }}
                >
                  {item.icon}
                </div>
                <div className="legend-text">
                  <span className="legend-range">{item.range}</span>
                  <span className="legend-level">{item.level}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .main-container {
          min-height: 100vh;
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(
            120deg,
            #0d0d0d 0%,
            #1a1f2b 50%,
            #16213e 100%
          );
          color: #f1f1f1;
          border-top: 3px solid tomato;
        }

        #dashboard-container {
          max-width: 100%;
          margin: 0 auto;
          padding: 20px;
          border-radius: 12px;
          overflow: hidden;
        }

        .dashboard-header {
          text-align: center;
          padding: 20px;
          margin-bottom: 20px;
        }

        .dashboard-header h1 {
          margin: 0;
          font-size: 2.2rem;
          color: white;
        }

        .dashboard-header p {
          margin: 10px 0 0;
          font-size: 1.1rem;
          opacity: 0.9;
        }

        .error-message {
          background-color: #fee2e2;
          color: #b91c1c;
          padding: 15px 20px;
          margin: 0 20px 20px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 500;
        }

        .error-icon {
          font-size: 1.2rem;
        }

        .loading-indicator {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px;
          gap: 20px;
        }

        .spinner {
          width: 50px;
          height: 50px;
          border: 5px solid #e2e8f0;
          border-top-color: #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .loading-indicator p {
          margin: 0;
          color: #64748b;
          font-size: 1.1rem;
        }

        .map-controls {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin: 0 20px 15px;
          flex-wrap: wrap;
        }

        .map-mode-button {
          padding: 8px 16px;
          background: #334155;
          color: white;
          border: none;
          border-radius: 20px;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .map-mode-button:hover {
          background: #475569;
        }

        .map-mode-button.active {
          background: #3b82f6;
          font-weight: 500;
        }

        .map-container {
          height: 70vh;
          // width:100%;
          margin: 0 20px 20px;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          position: relative;
        }

        .graph-view-container {
          margin: 0 20px 20px;
          background: white;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

        .graph-view-container h3 {
          color: #1e293b;
          margin-top: 0;
        }

        .graph-view {
          height: 60vh;
          width: 100%;
          position: relative;
        }

        .graph-legend {
          margin-top: 10px;
          font-size: 0.9rem;
          color: #64748b;
          text-align: center;
        }

        .reset-button {
          position: absolute;
          bottom: 20px;
          right: 20px;
          z-index: 1000;
          padding: 10px 15px;
          background-color: white;
          border: none;
          border-radius: 4px;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          transition: all 0.2s;
        }

        .reset-button:hover {
          background-color: #f1f5f9;
        }

        .reset-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .station-popup {
          min-width: 200px;
          padding: 10px;
        }

        .station-popup h3 {
          margin: 0 0 10px;
          font-size: 1.1rem;
          color: #1e293b;
        }

        .popup-aqi {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }

        .aqi-value {
          font-size: 1.5rem;
          font-weight: 700;
        }

        .aqi-text {
          font-size: 0.9rem;
          background: #f1f5f9;
          padding: 3px 8px;
          border-radius: 20px;
        }

        .popup-time {
          margin: 0 0 10px;
          font-size: 0.8rem;
          color: #64748b;
        }

        .details-button {
          width: 100%;
          padding: 8px;
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 0.9rem;
          cursor: pointer;
          transition: background 0.2s;
        }

        .details-button:hover {
          background: #2563eb;
        }

        .station-details {
          padding: 20px;
          margin: 0 20px 20px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          position: relative;
        }

        .station-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .station-header h2 {
          margin: 0;
          color: #1e293b;
          font-size: 1.5rem;
        }

        .close-button {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #64748b;
          padding: 5px;
          line-height: 1;
        }

        .close-button:hover {
          color: #334155;
        }

        .aqi-display {
          display: flex;
          gap: 20px;
          margin-bottom: 30px;
          flex-wrap: wrap;
        }

        .aqi-indicator {
          flex: 1;
          min-width: 250px;
          padding: 20px;
          border-radius: 8px;
          color: white;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .aqi-emoji {
          font-size: 2.5rem;
          margin-bottom: 10px;
        }

        .aqi-main {
          margin-bottom: 10px;
        }

        .aqi-value {
          font-size: 3rem;
          font-weight: 700;
          line-height: 1;
        }

        .aqi-label {
          display: block;
          font-size: 1rem;
          opacity: 0.9;
        }

        .aqi-description {
          font-size: 0.9rem;
          opacity: 0.9;
        }

        #location-info {
          flex: 1;
          min-width: 250px;
          padding: 15px;
          background: #f8fafc;
          border-radius: 8px;
        }

        .info-item {
          margin-bottom: 10px;
          display: flex;
          gap: 10px;
        }

        .info-label {
          font-weight: 500;
          color: #334155;
          min-width: 120px;
        }

        .info-value {
          color: #475569;
        }

        .section-title {
          color: #1e293b;
          font-size: 1.2rem;
          margin: 0 0 15px;
          padding-bottom: 5px;
          border-bottom: 1px solid #e2e8f0;
        }

        .graph-container {
          height: 300px;
          width: 100%;
          margin-bottom: 30px;
          background: white;
          padding: 15px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        #pollutants-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 15px;
          margin-bottom: 30px;
        }

        .pollutant-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 15px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .pollutant-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .pollutant-name {
          font-size: 0.9rem;
          color: #64748b;
          margin-bottom: 5px;
        }

        .pollutant-value {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1e293b;
        }

        .pollutant-unit {
          font-size: 1rem;
          color: #64748b;
        }

        .forecast-container {
          margin-bottom: 30px;
        }

        .forecast-item {
          margin-bottom: 20px;
        }

        .forecast-item h4 {
          margin: 0 0 10px;
          color: #334155;
        }

        .forecast-days {
          display: flex;
          gap: 10px;
          overflow-x: auto;
          padding-bottom: 10px;
        }

        .forecast-day {
          min-width: 120px;
          background: #f8fafc;
          border-radius: 8px;
          padding: 10px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .day-name {
          font-weight: 500;
          color: #334155;
          margin-bottom: 5px;
        }

        .day-values {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .day-value {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
        }

        .day-value span:first-child {
          color: #64748b;
        }

        .day-value span:last-child {
          font-weight: 500;
          color: #1e293b;
        }

        .aqi-legend {
          background: #f8fafc;
          padding: 20px;
          margin: 0 20px 20px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

        .aqi-legend h3 {
          margin: 0 0 15px;
          color: #1e293b;
          font-size: 1.2rem;
        }

        .legend-items {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 10px;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .legend-color {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          color: white;
        }

        .legend-text {
          display: flex;
          flex-direction: column;
        }

        .legend-range {
          font-weight: 500;
          color: #334155;
        }

        .legend-level {
          font-size: 0.9rem;
          color: #64748b;
        }

        @media (max-width: 768px) {
          .dashboard-header h1 {
            font-size: 1.8rem;
          }

          .aqi-display {
            flex-direction: column;
          }

          #pollutants-grid {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          }

          .legend-items {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          }
        }

        @media (max-width: 480px) {
          #dashboard-container {
            border-radius: 0;
          }

          .map-container {
            margin: 0 0 20px;
            height: 60vh;
          }

          .station-details {
            margin: 0 0 20px;
          }

          .aqi-legend {
            margin: 0 0 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default AirPollutionLive;