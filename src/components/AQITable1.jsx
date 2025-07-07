import React from "react";

const AQITable1 = () => {
  const aqiData = [
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

  const getColor = (aqi) => {
    if (aqi > 300) return "hazardous";
    if (aqi > 200 && aqi<300) return "severe";
    if (aqi > 150 && aqi<200) return "unhealthy";
    if (aqi > 100 && aqi<150) return "poor";
    if (aqi > 50 && aqi<100) return "modarate";
    return "good";
  };

  return (
    <div style={{ background: "#22272C", padding: "2rem", color: "white", fontFamily: "sans-serif" }}>
      <header style={{ 
         background: 'linear-gradient(90deg,rgb(126, 32, 115),rgb(142, 117, 255))',
        textAlign: 'center',
        marginBottom: '30px',
        padding: '25px 0',
        borderBottom: '1px solid #334155'
      }}>
        <h1 style={{ 
          fontSize: '2.8rem', 
          margin: '0 0 12px 0',
          fontWeight: '800',
          background: 'linear-gradient(90deg, #3b82f6, #10b981)',
          // color: 'white',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.5px',
          // color: 'white',
        }}>
          India's AQI Rankings 2024
        </h1>
        <p style={{
          color: 'white',
          maxWidth: '800px',
          margin: '0 auto',
          lineHeight: '1.7',
          fontSize: '1.1rem'
        }}>
          2024 air quality monitoring across major Indian cities. 
          {/* Click on stations for detailed information and historical trends. */}
        </p>
      </header>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={thStyle}>Rank</th>
              <th style={thStyle}>City</th>
              <th style={thStyle}>2024 Avg</th>
              {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month) => (
                <th key={month} style={thStyle}>{month}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {aqiData.map((row, idx) => (
              <tr key={idx}>
                <td style={tdStyle}>{row.rank}</td>
                <td style={tdStyle}>🇮🇳 {row.city}</td>
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
  );
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
//    if (aqi > 300) return "hazardous";
//    if (aqi > 200 && aqi<300) return "severe";
 //   if (aqi > 150 && aqi<200) return "unhealthy";
const getCellStyle = (level) => {
  const styles = {
    "good": { backgroundColor: "#a8e05f", color: "#000" },
    "moderate": { backgroundColor: "#FFFF00", color: "#000" },
    "poor": { backgroundColor: "#fe9b57", color: "#000" },
    "unhealthy": { backgroundColor: "#fe6a69", color: "#fff" },
    "severe": { backgroundColor: "#a97abc", color: "#fff" },
    "hazardous": { backgroundColor: "#a87383", color: "#fff" },
  };
  return styles[level] || {};
};

export default AQITable1;
