"use client"

import { useState } from "react";
import Location from "../components/location";
import WeatherForecast from "@/components/weatherforecast";
import 'dotenv/config';
export default function Home() {
  const [input, setInput] = useState("");
  interface WeatherData {
    city: {
      name: string;
      sunrise: number;
      sunset: number;
    };
    list: Array<{
      dt: number;
      main: {
        temp: number;
        // Add other properties as needed
      };
      // Add other properties as needed
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

      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?zip=${input}&units=${units}&appid=${apiKey}`);
      if (!response.ok) throw new Error("Failed to fetch data");
      
      const result = await response.json();
      console.log(result);
      setData(result);
    } catch (err) {
      setError((err as Error).message);
    }

    setLoading(false);
  };

  return (
    <div className="w-3/4 mx-auto">
      <h1>Next.js Form with API Call</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter zipcode..."
          required
        />
        <button type="submit" className="bg-cyan-600 p-[5px]">Submit</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {data && <Location cityname={data?.city?.name || "Unknown"} sunrise={data?.city?.sunrise || 0} sunset={data?.city?.sunset || 0}/>} 
      

      {data && <WeatherForecast temperature={data?.list}/>}
    </div>
  );
}
