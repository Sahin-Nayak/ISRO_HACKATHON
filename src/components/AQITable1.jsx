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

const AQITable1 = () => {
  // Initial data
  const initialData = [
    { rank: 1, city: "New Delhi, India", avg: 169, months: [263, 176, 155, 151, 172, 130, 98, 78, 104, 174, 285, 247] },
    { rank: 2, city: "Greater Noida, India", avg: 166, months: [272, 192, 160, 164, 199, 147, 104, 86, 113, 167, 211, 179] },
    { rank: 3, city: "Noida, India", avg: 161, months: [262, 189, 145, 141, 184, 133, 83, 81, 105, 170, 231, 209] },
    { rank: 4, city: "Ghaziabad, India", avg: 159, months: [252, 172, 139, 137, 157, 119, 91, 78, 106, 176, 261, 222] },
    { rank: 5, city: "Faridabad, India", avg: 154, months: [252, 176, 164, 167, 182, 123, 105, 86, 100, 139, 190, 169] },
    { rank: 6, city: "Gurgaon, India", avg: 154, months: [234, 167, 154, 168, 163, 123, 102, 93, 102, 149, 210, 190] },
    { rank: 7, city: "Bhiwadi, India", avg: 153, months: [242, 175, 153, 150, 175, 128, 106, 93, 104, 159, 190, 157] },
    { rank: 8, city: "Patna, India", avg: 145, months: [194, 163, 148, 182, 149, 128, 78, 89, 106, 136, 188, 177] },
    { rank: 9, city: "Sonipat, India", avg: 145, months: [240, 167, 130, 121, 151, 116, 89, 75, 91, 154, 229, 179] },
    { rank: 10, city: "Muzaffarnagar, India", avg: 144, months: [217, 159, 140, 137, 161, 120, 97, 91, 107, 157, 184, 154] },
    { rank: 11, city: "Rohtak, India", avg: 144, months: [235, 161, 142, 136, 157, 117, 82, 68, 93, 153, 216, 165] },
    { rank: 12, city: "Bhiwani, India", avg: 143, months: [208, 146, 139, 141, 156, 133, 95, 81, 101, 148, 194, 168] },
    { rank: 14, city: "Kairana, India", avg: 139, months: [203, 149, 135, 128, 151, 121, 92, 91, 101, 150, 179, 163] },
    { rank: 15, city: "Saharsa, India", avg: 139, months: [195, 160, 133, 137, 134, 136, 113, 124, 100, 106, 174, 155] },
    { rank: 16, city: "Bulandshahr, India", avg: 136, months: [232, 173, 130, 122, 136, 112, 86, 67, 85, 151, 194, 153] },
    { rank: 17, city: "Hapur, India", avg: 136, months: [231, 174, 125, 112, 130, 98, 73, 64, 87, 162, 208, 167] },
    { rank: 19, city: "Bankura, India", avg: 135, months: [172, 157, 146, 170, 142, 114, 77, 102, 99, 132, 156, 158] },
    { rank: 20, city: "Lucknow, India", avg: 135, months: [175, 141, 140, 147, 148, 120, 98, 99, 104, 133, 171, 149] },
    { rank: 21, city: "Meerut, India", avg: 135, months: [237, 157, 121, 114, 147, 103, 72, 64, 85, 161, 200, 159] },
    { rank: 22, city: "Panipat, India", avg: 135, months: [204, 144, 129, 118, 146, 119, 87, 96, 102, 143, 178, 156] },
    { rank: 23, city: "Durgapur, India", avg: 134, months: [176, 156, 148, 171, 135, 113, 78, 95, 89, 129, 158, 162] },
    { rank: 24, city: "Asansol, India", avg: 133, months: [168, 151, 139, 165, 140, 107, 75, 98, 98, 135, 158, 163] },
    { rank: 25, city: "Jamuria, India", avg: 133, months: [169, 153, 139, 165, 140, 105, 74, 99, 98, 134, 157, 160] },
    { rank: 26, city: "Kulti, India", avg: 132, months: [168, 153, 139, 165, 140, 105, 74, 99, 98, 133, 155, 155] },
    { rank: 27, city: "Muzaffarpur, India", avg: 131, months: [176, 160, 140, 178, 138, 95, 78, 79, 74, 122, 177, 159] },
    { rank: 28, city: "Saharanpur, India", avg: 131, months: [186, 143, 126, 124, 148, 112, 86, 78, 92, 150, 172, 159] },
    { rank: 29, city: "Begusarai, India", avg: 130, months: [172, 147, 143, 149, 132, 113, 103, 88, 84, 104, 168, 157] },
    { rank: 30, city: "Bhagalpur, India", avg: 130, months: [197, 152, 132, 133, 123, 107, 76, 95, 107, 121, 160, 157] },
    { rank: 31, city: "Hisar, India", avg: 130, months: [184, 138, 131, 112, 146, 103, 78, 67, 96, 148, 192, 161] },
    { rank: 32, city: "Khurja, India", avg: 130, months: [204, 137, 124, 115, 122, 112, 92, 83, 93, 146, 186, 144] },
    { rank: 33, city: "Baharampur, India", avg: 129, months: [170, 152, 140, 164, 123, 103, 72, 89, 90, 124, 159, 162] },
    { rank: 34, city: "Karnal, India", avg: 129, months: [190, 141, 120, 119, 147, 113, 75, 78, 90, 145, 174, 152] },
    { rank: 35, city: "Amritsar, India", avg: 127, months: [216, 148, 108, 102, 118, 98, 84, 82, 102, 133, 175, 162] },
    { rank: 37, city: "Agartala, India", avg: 126, months: [217, 185, 159, 147, 116, 77, 61, 74, 84, 106, 119, 167] },
    { rank: 40, city: "Ludhiana, India", avg: 126, months: [182, 124, 110, 109, 136, 122, 89, 92, 99, 133, 168, 151] },
    { rank: 41, city: "Barddhaman, India", avg: 125, months: [184, 160, 139, 157, 102, 99, 65, 79, 77, 114, 159, 160] },
    { rank: 42, city: "Howrah, India", avg: 125, months: [218, 174, 142, 145, 94, 83, 63, 79, 80, 106, 158, 164] },
    { rank: 43, city: "Mauli, India", avg: 125, months: [182, 128, 122, 110, 143, 105, 79, 68, 88, 135, 177, 158] },
    { rank: 44, city: "Patiala, India", avg: 125, months: [176, 122, 114, 117, 139, 123, 83, 82, 96, 138, 168, 148] },
    { rank: 45, city: "Chandigarh, India", avg: 124, months: [177, 131, 114, 114, 146, 102, 78, 63, 87, 136, 180, 164] },
    { rank: 46, city: "Gorakhpur, India", avg: 124, months: [156, 128, 136, 141, 136, 110, 82, 91, 91, 134, 146, 133] },
    { rank: 47, city: "Bali, India", avg: 123, months: [219, 177, 139, 139, 81, 89, 59, 75, 71, 106, 161, 164] },
    { rank: 48, city: "Faizabad, India", avg: 123, months: [164, 138, 128, 122, 114, 118, 96, 92, 93, 122, 150, 137] },
    { rank: 49, city: "Kamarhati, India", avg: 123, months: [222, 175, 140, 142, 81, 89, 58, 75, 71, 107, 159, 165] },
    { rank: 50, city: "Khardah, India", avg: 123, months: [222, 175, 140, 142, 80, 86, 57, 74, 70, 106, 159, 165] }
  ];

  const [aqiData, setAqiData] = useState(initialData);
  const [newCity, setNewCity] = useState({
    city: "",
    avg: "",
    months: Array(12).fill("")
  });
  const [chartType, setChartType] = useState("bar");
  const [showAllCities, setShowAllCities] = useState(false);
  const [selectedCities, setSelectedCities] = useState([]);

  const { toPDF, targetRef } = usePDF({
    filename: 'India-AQI-Rankings-2024.pdf',
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
  
  // Cities to display in charts (either all or selected)
  const chartCities = showAllCities ? aqiData : 
    selectedCities.length > 0 ? 
      aqiData.filter(city => selectedCities.includes(city.city)) : 
      aqiData.slice(0, 5);

  const barChartData = {
    labels: chartCities.map(city => city.city.split(",")[0]),
    datasets: [{
      label: 'Average AQI 2024',
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
            return `${context.dataset.label}: ${context.raw.y || context.raw} AQI (${getColor(context.raw.y || context.raw).toUpperCase()})`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'AQI Value'
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

  const handleAddCity = () => {
    const newCityData = {
      rank: aqiData.length + 1,
      city: newCity.city,
      avg: parseInt(newCity.avg),
      months: newCity.months.map(month => parseInt(month))
    };
    
    setAqiData([...aqiData, newCityData]);
    setNewCity({
      city: "",
      avg: "",
      months: Array(12).fill("")
    });
  };

  const handleMonthChange = (index, value) => {
    const updatedMonths = [...newCity.months];
    updatedMonths[index] = value;
    setNewCity({...newCity, months: updatedMonths});
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
    <div style={{  padding: "2rem", color: "white", fontFamily: "sans-serif" }}>
      

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
            India's AQI Rankings 2024
          </h1>
          <p style={{
            color: 'rgba(255, 255, 255, 0.8)',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.7',
            fontSize: '1.1rem'
          }}>
            Dynamic air quality monitoring dashboard with real-time updates
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
        {/* Add New City Form */}
        

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
            {chartType === 'bar' && 'Average AQI by City'}
            {chartType === 'line' && 'Monthly AQI Trends'}
            {chartType === 'scatter' && 'AQI Distribution by Month'}
          </h2>
          <div style={{ height: '500px' }}>
            {chartType === 'bar' && <Bar data={barChartData} options={chartOptions} />}
            {chartType === 'line' && <Line data={lineChartData} options={chartOptions} />}
            {chartType === 'scatter' && <Scatter data={scatterChartData} options={chartOptions} />}
          </div>
        </div>

        {/* Data Table */}
        <div style={{ 
          backgroundColor: '#2D3748',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{ marginTop: '0', color: 'white' }}>Complete AQI Data</h2>
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

export default AQITable1;