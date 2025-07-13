import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCityAQI } from '../services/api';
import { Line } from 'react-chartjs-2';

const CityDetail = () => {
  const { cityName } = useParams();
  const [aqi, setAqi] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getCityAQI(cityName);
      setAqi(res.data);
    };
    fetchData();
  }, [cityName]);

  if (!aqi) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{cityName} - AQI Details</h1>
      <div className="bg-white rounded p-4 shadow-md">
        <p>AQI: {aqi.aqi}</p>
        <p>Dominant Pollutant: {aqi.dominentpol}</p>
        <p>Time: {aqi.time?.s}</p>
      </div>
    </div>
  );
};

export default CityDetail;
