"use client"

import { useState } from "react";
import Location from "../components/location";
import WeatherForecast from "@/components/weatherforecast";

export default function Home() {
  const [input, setInput] = useState("");
  interface WeatherData {
    today: {
      name: string;
      sunrise: string;
      sunset: string;
      main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
      };
      wind: {
        speed: number;
      }
      weather: {
        main: string;
        description: string;
        icon: string;
      };
    };
    list: Array<{
      dt: number;
      main: {
        temp: number;
      };
      dt_txt: string;
      weather: {
        main: string;
        description: string;
        icon: string;
      }[];
    }>;
    
    
  }

  

  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
    const apiKey = process.env.NEXT_PUBLIC_APIKEY;

      const units = "imperial";

      const [data1, data2] = await Promise.all([
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${input}&units=${units}&appid=${apiKey}`).then(res => res.json()),
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&units=${units}&appid=${apiKey}`).then(res => res.json())
      ]);

      setData({
        today: {
          name: data2.name,
          sunrise: new Date(data2.sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
          sunset: new Date(data2.sys.sunset * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
          main: data2.main,
          weather: data2.weather[0],
          wind: data2.wind.speed,
        },
        list: data1.list,
        
        
      });

      console.log(data);

    } catch (err) {
      setError((err as Error).message);
    }

    setLoading(false);
  };

  return (
    <div className="w-3/4 mx-auto">
      <div className="form-conatiner text-center">
        <h1 className="text-7xl  pb-[20px]">Weather Forecast</h1>
        <p className="">Enter the name of a US City</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter US City..."
            required
          />
          <button type="submit" className="bg-gray-600 p-[5px]">{loading ? <p>Loading...</p> : <p>Submit</p>}</button>
        </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      </div>

      {data?.today && <Location data={data?.today} />}
      

      {data?.list && <WeatherForecast temperature={data?.list}/>}
    </div>
  );
}
