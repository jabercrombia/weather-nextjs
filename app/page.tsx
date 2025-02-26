"use client"

import { useState } from "react";
import Location from "../components/location";
import WeatherForecast from "@/components/weatherforecast";
import 'dotenv/config';
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
      weather: {
        main: string;
        description: string;
        icon: string;
      }[];
    };
    list: Array<{
      dt: number;
      main: {
        temp: number;
        // Add other properties as needed
      };
      dt_txt: string;
      weather: {
        main: string;
        description: string;
        icon: string;
      }[];
      wind: {
        speed: number;
        deg: number;
      };
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
          weather: data2.weather[0].main.toLowerCase(),
        },
        list: data1.list,
        
        
      });


      console.log(data);
      //console.log(data2);
      //return { data1, data2 };
      //const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?zip=${input}&units=${units}&appid=${apiKey}`);
      //if (data1) throw new Error("Failed to fetch data");
      
      console.log('data');
      console.log(data);
      // const result = await data1.json();
      // console.log(result);
      // setData([data1,data2]); // This line is incorrect and should be removed
    } catch (err) {
      setError((err as Error).message);
    }

    setLoading(false);
  };

  return (
    <div className="w-3/4 mx-auto">
      <div className="form-conatiner text-center">
        <h1 className="text-7xl text-white pb-[20px]">Weather Forecast</h1>
        <p className="text-white">Enter the name of a US City</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter US City..."
            required
          />
          <button type="submit" className="bg-cyan-600 p-[5px]">{loading ? <p>Loading...</p> : <p>Submit</p>}</button>
        </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      </div>

      {data?.today && <Location data={data?.today} />}
      

      {data?.list && <WeatherForecast temperature={data?.list}/>}
    </div>
  );
}
