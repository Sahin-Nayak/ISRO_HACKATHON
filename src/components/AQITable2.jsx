import React, { useState } from "react";
import { usePDF } from 'react-to-pdf';
import { Bar, Line, Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const AQITable2 = () => {
  const initialData = [
{
rank: 1,
city: "New Delhi, India",
avg: 95,
months: [217, 104, 76, 68, 84, 47, 35, 25, 39, 102, 202, 134]
},
{
rank: 2,
city: "Ghaziabad, India",
avg: 88,
months: [199, 106, 76, 67, 68, 40, 32, 25, 43, 103, 178, 116]
},
{
rank: 3,
city: "Greater Noida, India",
avg: 88,
months: [242, 122, 74, 69, 90, 57, 33, 26, 42, 83, 130, 91]
},
{
rank: 4,
city: "Noida, India",
avg: 88,
months: [221, 120, 69, 69, 83, 46, 27, 26, 40, 94, 152, 109]
},
{
rank: 5,
city: "Faridabad, India",
avg: 84,
months: [201, 106, 80, 87, 114, 55, 41, 29, 36, 62, 109, 85]
},

{
rank: 6,
city: "Bhiwadi, India",
avg: 82,
months: [199, 102, 74, 70, 98, 61, 41, 33, 40, 82, 115, 71]
},
{
rank: 7,
city: "Gurgaon, India",
avg: 81,
months: [180, 91, 71, 91, 81, 48, 37, 32, 37, 73, 132, 100]
},
{
rank: 9,
city: "Sonipat, India",
avg: 75,
months: [185, 92, 57, 49, 67, 43, 30, 23, 31, 81, 151, 92]
},
{
rank: 11,
city: "Rohtak, India",
avg: 74,
months: [178, 85, 65, 60, 76, 44, 27, 20, 32, 81, 144, 80]
},
{
rank: 12,
city: "Hapur, India",
avg: 73,
months: [171, 131, 54, 56, 62, 29, 23, 19, 32, 88, 130, 83]
},
{
rank: 14,
city: "Bhiwani, India",
avg: 71,
months: [146, 70, 61, 68, 78, 62, 35, 26, 38, 72, 115, 82]
},
{
rank: 15,
city: "Muzaffarnagar, India",
avg: 71,
months: [158, 84, 63, 61, 80, 46, 35, 31, 41, 80, 104, 70]
},
{
rank: 16,
city: "Bulandshahr, India",
avg: 70,
months: [174, 129, 55, 48, 65, 39, 28, 20, 30, 74, 115, 69]
},
{
rank: 17,
city: "Saharsa, India",
avg: 70,
months: [126, 87, 61, 61, 70, 72, 52, 62, 41, 41, 96, 70]
},
{
rank: 18,
city: "Patna, India",
avg: 68,
months: [113, 79, 67, 93, 70, 52, 25, 29, 38, 63, 106, 87]
},
{
rank: 19,
city: "Meerut, India",
avg: 67,
months: [178, 87, 50, 38, 62, 33, 23, 19, 31, 87, 125, 76]
},
{
rank: 20,
city: "Kairana, India",
avg: 65,
months: [141, 72, 55, 51, 67, 46, 31, 31, 36, 71, 100, 79]
},
{
rank: 23,
city: "Muzaffarpur, India",
avg: 63,
months: [100, 80, 64, 103, 66, 37, 29, 29, 27, 56, 98, 73]
},
{
rank: 24,
city: "Bankura, India",
avg: 62,
months: [97, 80, 63, 94, 64, 44, 25, 36, 36, 56, 76, 71]
},
{
rank: 25,
city: "Durgapur, India",
avg: 62,
months: [105, 81, 65, 96, 59, 43, 25, 33, 31, 53, 79, 75]
},
{
rank: 26,
city: "Panipat, India",
avg: 62,
months: [139, 66, 50, 43, 59, 46, 29, 33, 36, 67, 98, 72]
},
{
rank: 27,
city: "Begusarai, India",
avg: 61,
months: [97, 71, 65, 67, 57, 49, 49, 39, 35, 42, 89, 70]
},
{
rank: 28,
city: "Lucknow, India",
avg: 61,
months: [103, 62, 60, 68, 72, 49, 35, 35, 38, 56, 92, 64]
},
{
rank: 29,
city: "Agartala, India",
avg: 60,
months: [157, 113, 80, 65, 44, 24, 17, 23, 27, 41, 48, 80]
},
{
rank: 30,
city: "Amritsar, India",
avg: 60,
months: [150, 79, 45, 37, 48, 38, 28, 27, 36, 59, 91, 77]
},
{
rank: 31,
city: "Asansol, India",
avg: 60,
months: [91, 73, 59, 86, 62, 42, 24, 34, 35, 59, 78, 76]
},
{
rank: 32,
city: "Saharanpur, India",
avg: 60,
months: [121, 74, 50, 50, 65, 44, 29, 24, 32, 71, 91, 75]
},
{
rank: 33,
city: "Bali, India",
avg: 59,
months: [158, 101, 62, 60, 26, 35, 17, 24, 23, 39, 82, 78]
},
{
rank: 34,
city: "Bhagalpur, India",
avg: 59,
months: [124, 76, 58, 56, 51, 42, 26, 33, 39, 50, 80, 70]
},
{
rank: 35,
city: "Hisar, India",
avg: 59,
months: [118, 59, 49, 42, 65, 38, 25, 20, 33, 72, 113, 76]
},
{
rank: 36,
city: "Howrah, India",
avg: 59,
months: [156, 101, 63, 61, 32, 28, 18, 25, 25, 40, 78, 77]
},
{
rank: 37,
city: "Jamuria, India",
avg: 59,
months: [91, 74, 59, 86, 62, 40, 23, 34, 35, 58, 76, 72]
},
{
rank: 38,
city: "Khurja, India",
avg: 59,
months: [143, 70, 50, 45, 49, 34, 30, 27, 31, 70, 101, 63]
},
{
rank: 39,
city: "Kamarhati, India",
avg: 58,
months: [159, 100, 62, 60, 27, 33, 16, 23, 23, 39, 80, 78]
},
{
rank: 40,
city: "Karnal, India",
avg: 58,
months: [123, 64, 45, 45, 65, 44, 23, 24, 30, 69, 92, 68]
},
{
rank: 42,
city: "Khardah, India",
avg: 58,
months: [160, 100, 62, 59, 26, 31, 16, 23, 22, 39, 80, 78]
},
{
rank: 43,
city: "Kulti, India",
avg: 58,
months: [91, 74, 59, 86, 62, 40, 23, 34, 35, 57, 74, 68]
},
{
rank: 44,
city: "Panihati, India",
avg: 58,
months: [161, 100, 62, 60, 27, 31, 16, 23, 22, 39, 79, 78]
},
{
rank: 45,
city: "Rishra, India",
avg: 58,
months: [160, 100, 62, 60, 27, 32, 16, 23, 22, 39, 81, 78]
},
{
rank: 46,
city: "Shrirampur, India",
avg: 58,
months: [160, 100, 61, 58, 26, 31, 16, 23, 22, 39, 81, 79]
},
{
rank: 47,
city: "Titagarh, India",
avg: 58,
months: [160, 100, 61, 59, 26, 31, 16, 23, 22, 39, 78, 78]
},
{
rank: 48,
city: "Baharampur, India",
avg: 57,
months: [96, 78, 59, 82, 49, 37, 22, 30, 31, 49, 79, 74]
},
{
rank: 49,
city: "Bhadreswar, India",
avg: 57,
months: [159, 100, 61, 57, 25, 29, 16, 23, 22, 38, 77, 74]
},
{
rank: 50,
city: "Bhatpara, India",
avg: 57,
months: [158, 100, 60, 55, 25, 29, 16, 23, 22, 39, 76, 78]
}
    // ... rest of your data
  ];

  const [aqiData, setAqiData] = useState(initialData);
  const [chartType, setChartType] = useState("bar");
  const [showAllCities, setShowAllCities] = useState(false);
  const [selectedCities, setSelectedCities] = useState([]);

  const { toPDF, targetRef } = usePDF({
    filename: 'India-AQI-PM2.5-Rankings-2024.pdf',
    page: {
      margin: 10,
      format: 'a4',
    }
  });

  const getColor = (aqi) => {
    if (aqi > 300) return "hazardous";
    if (aqi > 200) return "severe";
    if (aqi > 150) return "unhealthy";
    if (aqi > 100) return "poor";
    if (aqi > 50) return "moderate";
    return "good";
  };

  const getCellStyle = (level) => {
    const styles = {
      "good": { backgroundColor: "#a8e05f", color: "#000" },
      "moderate": { backgroundColor: "#fdd64b", color: "#000" },
      "poor": { backgroundColor: "#fe9b57", color: "#000" },
      "unhealthy": { backgroundColor: "#fe6a69", color: "#fff" },
      "severe": { backgroundColor: "#a97abc", color: "#fff" },
      "hazardous": { backgroundColor: "#a87383", color: "#fff" },
    };
    return styles[level] || {};
  };

  const getChartColor = (aqi) => {
    if (aqi > 300) return "#880E4F";
    if (aqi > 200) return "#9C27B0";
    if (aqi > 150) return "#F44336";
    if (aqi > 100) return "#FF9800";
    if (aqi > 50) return "#FFC107";
    return "#4CAF50";
  };

  // Prepare data for charts
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  // Cities to display in charts
  const chartCities = showAllCities ? aqiData : 
    selectedCities.length > 0 ? 
      aqiData.filter(city => selectedCities.includes(city.city)) : 
      aqiData.slice(0, 5);

  const barChartData = {
    labels: chartCities.map(city => city.city.split(",")[0]),
    datasets: [{
      label: 'Average PM2.5 (µg/m³)',
      data: chartCities.map(city => city.avg),
      backgroundColor: chartCities.map(city => getChartColor(city.avg)),
      borderColor: chartCities.map(city => getChartColor(city.avg)),
      borderWidth: 1,
    }]
  };

  const lineChartData = {
    labels: months,
    datasets: chartCities.map(city => ({
      label: city.city.split(",")[0],
      data: city.months,
      borderColor: getChartColor(city.avg),
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      tension: 0.3,
      fill: true,
      pointRadius: 4,
      pointHoverRadius: 6,
    }))
  };

  const scatterChartData = {
    datasets: aqiData.map(city => ({
      label: city.city.split(",")[0],
      data: city.months.map((value, index) => ({
        x: index + 1,
        y: value
      })),
      backgroundColor: getChartColor(city.avg),
      borderColor: getChartColor(city.avg),
    }))
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.raw.y || context.raw} µg/m³ (${getColor(context.raw.y || context.raw).toUpperCase()})`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'PM2.5 (µg/m³)'
        }
      },
      x: chartType === 'scatter' ? {
        title: {
          display: true,
          text: 'Month (1-12)'
        }
      } : {}
    }
  };

  const toggleCitySelection = (city) => {
    if (selectedCities.includes(city)) {
      setSelectedCities(selectedCities.filter(c => c !== city));
    } else {
      setSelectedCities([...selectedCities, city]);
    }
  };

  const thStyle = {
    padding: "8px 12px",
    border: "1px solid #333",
    backgroundColor: "#333",
    color: "white",
  };

  const tdStyle = {
    padding: "8px 12px",
    border: "1px solid #333",
    textAlign: "center",
    fontWeight: "bold",
  };

  const tdStyle1 = {
    backgroundColor: "#22272C",
    color: "white",
    padding: "8px 12px",
    border: "1px solid #333",
    textAlign: "center",
    fontWeight: "bold",
  };

  return (
    <div style={{ padding: "2rem", color: "white", fontFamily: "sans-serif" }}>
      

      <div ref={targetRef}>
        <header style={{ 
          background: 'linear-gradient(90deg, #1a365d, #153e75)',
          textAlign: 'center',
          marginBottom: '30px',
          padding: '25px 0',
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <h1 style={{ 
            fontSize: '2.8rem', 
            margin: '0 0 12px 0',
            fontWeight: '800',
            color: 'white',
            letterSpacing: '-0.5px',
          }}>
            India's PM2.5 Air Quality Rankings 2024
          </h1>
          <p style={{
            color: 'rgba(255, 255, 255, 0.8)',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.7',
            fontSize: '1.1rem'
          }}>
            Particulate Matter (PM2.5) concentrations in µg/m³ across major Indian cities
          </p>
        </header>
          <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        marginBottom: '20px',
        gap: '10px',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setChartType("bar")} 
            style={{
              background: chartType === "bar" ? '#3b82f6' : '#4B5563',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Bar Chart
          </button>
          <button 
            onClick={() => setChartType("line")} 
            style={{
              background: chartType === "line" ? '#3b82f6' : '#4B5563',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Line Chart
          </button>
          <button 
            onClick={() => setChartType("scatter")} 
            style={{
              background: chartType === "scatter" ? '#3b82f6' : '#4B5563',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Scatter Plot
          </button>
          <button 
            onClick={() => setShowAllCities(!showAllCities)} 
            style={{
              background: showAllCities ? '#10b981' : '#4B5563',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            {showAllCities ? 'Show Top 5' : 'Show All Cities'}
          </button>
        </div>
        <button 
          onClick={() => toPDF()} 
          style={{
            background: 'linear-gradient(90deg, #3b82f6, #10b981)',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
          </svg>
          Download PDF
        </button>
      </div>

      
        {/* Summary Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #4CAF50, #2E7D32)',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: 'white' }}>Best Air Quality</h3>
            <p style={{ fontSize: '1.5rem', margin: '0', fontWeight: 'bold', color: 'white' }}>
              {aqiData[aqiData.length - 1].city.split(",")[0]} - {aqiData[aqiData.length - 1].avg} µg/m³
            </p>
          </div>
          
          <div style={{
            background: 'linear-gradient(135deg, #F44336, #C62828)',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: 'white' }}>Worst Air Quality</h3>
            <p style={{ fontSize: '1.5rem', margin: '0', fontWeight: 'bold', color: 'white' }}>
              {aqiData[0].city.split(",")[0]} - {aqiData[0].avg} µg/m³
            </p>
          </div>
          
          <div style={{
            background: 'linear-gradient(135deg, #FF9800, #EF6C00)',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: 'white' }}>National Average</h3>
            <p style={{ fontSize: '1.5rem', margin: '0', fontWeight: 'bold', color: 'white' }}>
              {Math.round(aqiData.reduce((sum, city) => sum + city.avg, 0) / aqiData.length)} µg/m³
            </p>
          </div>
        </div>

        {/* City Selection */}
        {!showAllCities && (
          <div style={{
            backgroundColor: '#2D3748',
            padding: '15px',
            borderRadius: '8px',
            marginBottom: '20px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ marginTop: '0', marginBottom: '10px' }}>Select Cities to Display</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {aqiData.map(city => (
                <button
                  key={city.city}
                  onClick={() => toggleCitySelection(city.city)}
                  style={{
                    background: selectedCities.includes(city.city) ? '#3b82f6' : '#4B5563',
                    color: 'white',
                    border: 'none',
                    padding: '8px 12px',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                  }}
                >
                  {city.city.split(",")[0]}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Charts Section */}
        <div style={{
          backgroundColor: '#2D3748',
          padding: '20px',
          borderRadius: '10px',
          marginBottom: '40px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{ marginTop: '0', color: 'white' }}>
            {chartType === 'bar' && 'Average PM2.5 by City'}
            {chartType === 'line' && 'Monthly PM2.5 Trends'}
            {chartType === 'scatter' && 'PM2.5 Distribution by Month'}
          </h2>
          <div style={{ height: '500px' }}>
            {chartType === 'bar' && <Bar data={barChartData} options={chartOptions} />}
            {chartType === 'line' && <Line data={lineChartData} options={chartOptions} />}
            {chartType === 'scatter' && <Scatter data={scatterChartData} options={chartOptions} />}
          </div>
        </div>

        {/* AQI Legend */}
        <div style={{
          backgroundColor: '#2D3748',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '30px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '15px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '20px', height: '20px', backgroundColor: '#4CAF50', borderRadius: '4px' }}></div>
            <span>Good (0-50 µg/m³)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '20px', height: '20px', backgroundColor: '#FFC107', borderRadius: '4px' }}></div>
            <span>Moderate (51-100 µg/m³)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '20px', height: '20px', backgroundColor: '#FF9800', borderRadius: '4px' }}></div>
            <span>Poor (101-150 µg/m³)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '20px', height: '20px', backgroundColor: '#F44336', borderRadius: '4px' }}></div>
            <span>Unhealthy (151-200 µg/m³)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '20px', height: '20px', backgroundColor: '#9C27B0', borderRadius: '4px' }}></div>
            <span>Severe (201-300 µg/m³)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '20px', height: '20px', backgroundColor: '#880E4F', borderRadius: '4px' }}></div>
            <span>Hazardous (300+ µg/m³)</span>
          </div>
        </div>

        {/* Data Table */}
        <div style={{ 
          backgroundColor: '#2D3748',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{ marginTop: '0', color: 'white' }}>Complete PM2.5 Data (µg/m³)</h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={thStyle}>Rank</th>
                  <th style={thStyle}>City</th>
                  <th style={thStyle}>2024 Avg</th>
                  {months.map((month) => (
                    <th key={month} style={thStyle}>{month}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {aqiData.map((row, idx) => (
                  <tr key={idx}>
                    <td style={tdStyle1}>{row.rank}</td>
                    <td style={tdStyle1}>🇮🇳 {row.city}</td>
                    <td style={{ ...tdStyle, ...getCellStyle(getColor(row.avg)) }}>{row.avg}</td>
                    {row.months.map((val, i) => (
                      <td key={i} style={{ ...tdStyle, ...getCellStyle(getColor(val)) }}>{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AQITable2;