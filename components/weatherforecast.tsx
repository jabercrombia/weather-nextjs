"use client"


import { Cloud, CloudRain, Sun, SnowflakeIcon } from 'lucide-react';

interface TemperatureData {
  dt_txt: string;
  main: {
    temp: number;
  };
  weather: {
    main: string;
  }[];
  wind: {
    speed: number;
  };
};


function reformatObj(temperature: TemperatureData[]) {
    const groupByDayOfWeek = temperature.reduce((acc: { [key: string]: { temps: number[]; time: string[]; weathertype: string[]; windspeed: number[]; dayOfWeek: string; tempRange: { lowestTemp: number; highestTemp: number }; majorityWeatherType: string | null } }, curr : TemperatureData) => {
        const date = new Date(curr.dt_txt); // Create a date object from dt_txt
        const dayOfWeek = date.toLocaleString('en-us', { weekday: 'short' }); // Get the day of the week (e.g., "Thursday")
      
        // If the day of the week doesn't exist in the accumulator, add it
        if (!acc[dayOfWeek]) {
           
            acc[dayOfWeek] = { temps: [], time: [], weathertype: [], windspeed:[], dayOfWeek, tempRange: { lowestTemp: 0, highestTemp: 0 }, majorityWeatherType: null };
        }
        
        // Push the current object into the corresponding day of week
        acc[dayOfWeek].temps.push(curr.main.temp); 
        acc[dayOfWeek].time.push(curr.dt_txt.split(' ')[1]); 
        acc[dayOfWeek].weathertype.push(curr.weather[0].main); 
        acc[dayOfWeek].windspeed.push(curr.wind.speed);
      
        return acc;
      }, {});

      //remove day of week key in array
      const groupedArray = Object.values(groupByDayOfWeek);
      // now we sort specific keys in the object
      console.log('grouped array');
      console.log(groupedArray);
      return updateWeatherObj(groupedArray);
  }

    interface GroupedData {
      temps: number[];
      time: string[];
      weathertype: string[];
      windspeed: number[];
      dayOfWeek: string;
      tempRange: {
        lowestTemp: number;
        highestTemp: number;
      };
      majorityWeatherType: string | null;
    }
    
    function updateWeatherObj(arrObj: GroupedData[]) {

        const mostCommonString = (arr: string[]) => {
            const frequencyMap: { [key: string]: number } = {};
            let maxCount = 0;
            let mostFrequent = null;
        
            for (const str of arr) {
                frequencyMap[str] = (frequencyMap[str] || 0) + 1;
        
                if (frequencyMap[str] > maxCount) {
                    maxCount = frequencyMap[str];
                    mostFrequent = str;
                }
            }
        
            return mostFrequent;
        };
        // we are gathering highest and lowest temp for each day AND getting weathertype
        for (const day in arrObj) {
            const data = arrObj[day];
            
            let lowestTemp = Math.min(...data.temps);
            let highestTemp = Math.max(...data.temps);

            // remove decimals
            lowestTemp = Math.floor(lowestTemp);
            highestTemp = Math.floor(highestTemp);

            // Add an object with the min and max values to each day's data
            data.tempRange = {
                lowestTemp: lowestTemp,
                highestTemp: highestTemp
            };

            // returns the most common weathertype in the array weathertype
            data.majorityWeatherType = mostCommonString(data.weathertype)?.toLowerCase() ?? null;
            
        }

        return arrObj;
    }


  interface Props {
    temperature: TemperatureData[];
  }

export default function WeatherForecast({ temperature }: Props) {
    const data = reformatObj(temperature)
  return (
    <div className="grid md:grid-cols-2 gap-4 container mx-auto weatherforecast drop-shadow-md">
      {data.map((elem: { dayOfWeek: string; majorityWeatherType : string | null | undefined; tempRange: { lowestTemp: number; highestTemp: number } }, index : number) => (
        <div className="flex" key={index}>
          <div className="w-1/3 content-center">
              <p className='text-2xl text-black'>{elem.dayOfWeek}</p>
          </div>
          <div className="w-1/3">
            {elem.majorityWeatherType === 'snow' && <SnowflakeIcon/>}
            {elem.majorityWeatherType === 'clouds' && <Cloud/>}
            {elem.majorityWeatherType === 'rain' && <CloudRain />}
            {elem.majorityWeatherType === 'clear' && <Sun />}
          </div>
          

          <div className="w-1/3 text-right content-center">
            <p className="md:text-2xl text-black inline-block mr-[10px]">{elem.tempRange.highestTemp}&deg;</p>
            <p className="md:text-2xl text-color-[grey] inline-block">{elem.tempRange.lowestTemp}&deg;</p>
          </div>
        </div>
      ))}
    </div>
    
  );
}