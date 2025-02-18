import React from 'react';
import { Cloud, CloudRain, Sun, Sunrise, Sunset, CloudFog, SnowflakeIcon } from 'lucide-react';

interface Props {
    data: {
        name: string;
        sunrise: string;
        sunset: string;
        weather?: {
            main: string;
            description: string;
            icon: string;
        }[];
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
    <div className='mx-auto text-center todayforecast w-1/2 shadow-md text-white'>
        <div className='grid grid-cols-2 items-center align-center'>
            <div className='text-left card-left'>
                <p className='text-8xl'>{Math.floor(data.main.temp)}&deg;</p>
                <h2 className='text-2xl'>{data.name}</h2>
                <p><Sunrise/> {data.sunrise}</p>
                <p><Sunset/>  {data.sunset}</p>
            </div>
            <div className='todayicon justify-items-center'>
                {data?.weather?.[0]?.main == 'clouds' && <Cloud strokeWidth={1}/>}
                {data?.weather?.[0]?.main == 'rain' && <CloudRain strokeWidth={1}/>}
                {data?.weather?.[0]?.main == 'clear' && <Sun strokeWidth={1}/>}
                {data?.weather?.[0]?.main == 'mist' && <CloudFog strokeWidth={1}/>}
                {data?.weather?.[0]?.main == 'snow' && <SnowflakeIcon strokeWidth={1} />}
                <p className="uppercase">{data?.weather?.[0]?.main}</p>
            </div>
        </div>
    </div>
  );
};

export default Location;