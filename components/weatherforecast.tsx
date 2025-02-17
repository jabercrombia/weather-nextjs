"use client"


import { Cloud, CloudRain, Sun, SnowflakeIcon } from 'lucide-react';

function reformatObj(temperature: any) {
    let groupByDayOfWeek = temperature.reduce((acc: { [key: string]: { temps: number[]; time: number[]; weathertype: string[]; windspeed: number[]; dayOfWeek: string } }, curr: any, index : number) => {
        const date = new Date(curr.dt_txt); // Create a date object from dt_txt
        const dayOfWeek = date.toLocaleString('en-us', { weekday: 'long' }); // Get the day of the week (e.g., "Thursday")
      
        // If the day of the week doesn't exist in the accumulator, add it
        if (!acc[dayOfWeek]) {
           
            acc[dayOfWeek] = { temps: [], time: [], weathertype: [], windspeed:[], dayOfWeek, };
        }
        
        // Push the current object into the corresponding day of week
        acc[dayOfWeek].temps.push(curr.main.temp); 
        acc[dayOfWeek].time.push(curr.dt_txt.split(' ')[1]); 
        acc[dayOfWeek].weathertype.push(curr.weather[0].main); 
        acc[dayOfWeek].windspeed.push(curr.wind.speed); 
        
        
      
        return acc;
      }, {});

      //remove day of week key in array
      groupByDayOfWeek = Object.values(groupByDayOfWeek);
      // now we sort specific keys in the object
      return updateWeatherObj(groupByDayOfWeek);
  }

    function updateWeatherObj(arrObj : any) {

        const mostCommonString = (arr: string[]) => {
            let frequencyMap: { [key: string]: number } = {};
            let maxCount = 0;
            let mostFrequent = null;
        
            for (let str of arr) {
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
            data.majorityWeatherType = mostCommonString(data.weathertype)?.toLowerCase();
            
        }

        return arrObj;
    }


export default function WeatherForecast({ temperature }: props) {
  console.log('weatherforecast');
    let data = reformatObj(temperature)
  console.log(reformatObj(temperature));
  return (
    <div className="grid grid-cols w-1/2 mx-auto weatherforecast drop-shadow-md">
      {data.map((elem: { dayOfWeek: string; majorityWeatherType : string; tempRange: { lowestTemp: number; highestTemp: number } }, index : number) => (
        <div className="flex" key={index}>
          <div className="w-1/3">
            {elem.majorityWeatherType == 'snow' && <SnowflakeIcon/>}
                {elem.majorityWeatherType == 'clouds' && <Cloud/>}
                {elem.majorityWeatherType == 'rain' && <CloudRain />}
                {elem.majorityWeatherType == 'clear' && <Sun />}
        
           

          </div>
          <div className="w-1/3 content-center">
              <p className='text-3xl text-white'>{elem.dayOfWeek}</p>
          </div>

          <div className="w-1/3 text-right content-center">
            <p className="text-2xl text-white">{elem.tempRange.highestTemp}</p>
            <p className="text-white">{elem.tempRange.lowestTemp}</p>
          </div>
        </div>
      ))}
    </div>
    
  );
}