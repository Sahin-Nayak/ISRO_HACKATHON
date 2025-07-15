import React from 'react';
// import AirPollutionLive from '../components/AirPollutionLive';
import IndiaAQIMap from '../components/IndiaAQIMap';
import AirQualitySearch from '../components/AirQualitySearch';

const AirPrevData = () => {
    return (
        <div>
            <IndiaAQIMap />
            <AirQualitySearch />
        </div>
    );
};

export default AirPrevData;