import React from 'react';
import { Sunrise, Sunset, Droplets, Wind } from 'lucide-react';

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
                <h2 className='md:text-6xl'>{data.name}</h2>
                <p className='md:text-l text-sm capitalize'>{data?.weather?.description}</p>
            </div>
            <div className='text-right card-right'>
                <p className='md:text-8xl'>{Math.floor(data.main.temp)}&deg;</p>
                <p className='md:text-xl'>Feels Like {Math.floor(data.main.feels_like)}&deg;</p>
            </div>
        </div>
        <div className="grid md:grid-cols-4 todaybottomdata mt-[40px]">
            <div className="md:basis-1/4 basis-1 mx-auto pb-[10px] text-start"><Droplets/><p>Humidity: {data?.main?.humidity}%</p></div>
            <div className="md:basis-1/4 basis-1 mx-auto pb-[10px] text-start"><Wind/><p>Wind: {Math.floor(data?.wind)} mph</p></div>
            <div className="md:basis-1/4 basis-1 mx-auto pb-[10px] text-start"><Sunrise/><p>Sunrise: {data.sunrise}</p></div>
            <div className="md:basis-1/4 basis-1 mx-auto pb-[10px] text-start"><Sunset/> <p>Sunset: {data.sunset}</p></div>
        </div>
    </div>
  );
};

export default Location;