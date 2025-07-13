import axios from 'axios';

const TOKEN = "11a9dd37a145dfe58f0f8eb17a4c5df3e9e4f86b"; // Replace with your actual API token from waqi.info

export const getCityAQI = async (city) => {
  try {
    const res = await axios.get(`https://api.waqi.info/feed/${city}/?token=${TOKEN}`);
    return res.data;
  } catch (e) {
    console.error("AQI Fetch Error", e);
    return { data: { aqi: null } };
  }
};
