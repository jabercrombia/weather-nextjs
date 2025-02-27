import React from 'react';
import { Cloud, CloudRain, Sun, Sunrise, Sunset, CloudFog, SnowflakeIcon, Droplets, Wind } from 'lucide-react';

interface Props {
    data: {
        name: string;
        sunrise: string;
        sunset: string;
        weather?: {
            main: string;
            description: string;
            icon: string;
        };
        wind: number;
        main: {
            temp: number;
            feels_like: number;
            temp_min: number;
            temp_max: number;
            pressure: number;
            humidity: number;
        };
    };
}

const Location: React.FC<Props> = ({ data }) => {
    console.log(data);
  return (
    <div className='mx-auto text-center todayforecast container shadow-md text-white'>
        <div className='grid grid-cols-2 items-center align-center'>
            <div className='text-left card-left'>
                <h2 className='text-6xl'>{data.name}</h2>
                <p className='text-l capitalize'>{data?.weather?.description}</p>
            </div>
            <div className='text-right card-right'>
                <p className='text-8xl'>{Math.floor(data.main.temp)}&deg;</p>
                <p className='text-xl'>Feels Like {Math.floor(data.main.feels_like)}&deg;</p>
            </div>
        </div>
        <div className="flex todaybottomdata mt-[40px]">
            <div className="basis-1/4"><Droplets/><p>Humidity: {data?.main?.humidity}%</p></div>
            <div className="basis-1/4"><Wind/><p>Wind: {Math.floor(data?.wind)} mph</p></div>
            <div className="basis-1/4"><Sunrise/><p>Sunrise: {data.sunrise}</p></div>
            <div className="basis-1/4"><Sunset/> <p>Sunset: {data.sunset}</p></div>
        </div>
    </div>
  );
};

export default Location;