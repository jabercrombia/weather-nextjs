import React from 'react';
import { Cloud, CloudRain, Sun, Sunrise, Sunset } from 'lucide-react';

interface Props {
    data: {
        name: string;
        sunrise: string;
        sunset: string;
        weather?: string;
        main: {
            temp: number;
        };
    };
}

const Location: React.FC<Props> = ({ data}) => {
    console.log(data);
  return (
    <div className='mx-auto text-center todayforecast w-1/2 shadow-md text-white'>
        <div className='grid grid-cols-2 items-center align-center'>
            <div className='text-left card-left'>
                <p className='text-8xl'>{Math.floor(data.main.temp)}&deg;</p>
                <h2 className='text-2xl'>{data.name}</h2>
                <p><Sunrise/> {data.sunrise}</p>
                <p><Sunset/>  {data.sunset}</p>
            </div>
            <div className='todayicon justify-items-center'>
                {data?.weather == 'clouds' && <Cloud/>}
                {data?.weather == 'rain' && <CloudRain />}
                {data?.weather == 'clear' && <Sun />}
            </div>
        </div>

  

    </div>
  );
};

export default Location;