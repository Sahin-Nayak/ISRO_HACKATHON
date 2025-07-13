import React from 'react';
// import AirPollutionLive from '../components/AirPollutionLive';
import IndiaAQIMap from '../components/IndiaAQIMap';
import AirQualitySearch from '../components/AirQualitySearch';

const AirPrevData = () => {
    return (
        <div>
            <AirQualitySearch />
            <IndiaAQIMap />
        </div>
    );
};

export default AirPrevData;