# Weather App
![homepage image](/public/images/results.png)
A simple weather application built with Next.js that fetches real-time weather data from the OpenWeatherMap API. The app allows users to search for any city and view current weather conditions.

## Features
- Search for weather by city name
- Displays temperature, weather conditions, humidity, and wind speed
- User-friendly interface with responsive design
- Deployed on Vercel for fast and reliable hosting

## Technologies Used
- **Next.js**: React framework for server-side rendering and static site generation
- **OpenWeatherMap API**: Provides real-time weather data
- **Tailwind CSS**: For styling and responsive design
- **Vercel**: Deployment and hosting

## Getting Started
### Prerequisites
- Node.js installed
- API key from [OpenWeatherMap](https://openweathermap.org/api)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/jabercrombia/weather-nextjs.git
   cd weather-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory and add your OpenWeatherMap API key:
   ```env
   NEXT_PUBLIC_APIKEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Deployment
This project is deployed using [Vercel](https://vercel.com/).

1. Push your code to GitHub.
2. Import the repository to Vercel.
3. Set up environment variables in Vercel with your API key.
4. Deploy and get a live link!

## API Usage
The app fetches data from OpenWeatherMap using:
```javascript
const fetchWeather = async (city) => {
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_APIKEY}&units=metric`);
  const data = await res.json();
  return data;
};
```

## Contributing
Feel free to submit a pull request if you'd like to improve the app!

## License
This project is open-source and available under the MIT License.

