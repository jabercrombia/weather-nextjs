import React from 'react';

interface Props {
  cityname: string;
  sunrise: number;
  sunset: number;
}

const Location: React.FC<Props> = ({ cityname, sunrise, sunset }) => {
    
  return (
    <div className='mx-auto text-center'>
      <h2>{cityname}</h2>
      <p>Sunrise: {new Date(sunrise * 1000).toLocaleTimeString()}</p>
      <p>Sunset: {new Date(sunset * 1000).toLocaleTimeString()}</p>
    </div>
  );
};

export default Location;