import React, { ChangeEvent, useState } from 'react';
import { getWeather } from './utils/data.utils';


type WeatherType = {
    main: {
    temp:number,
    feels_like: number,
    temp_min:number,
    temp_max:number,
  },
}

function App() {
  const key: string = '0534c91c4d1c318a477201d0477e8a52'
 
  
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState<WeatherType>({
    main: {
      temp: 0,
      feels_like: 0,
      temp_min:0,
      temp_max: 0,
    }
  })
  const url: string =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`

  const getData = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
   try {
    const weather = await getWeather<WeatherType>(url)
    setWeather(weather)
   }
   catch(e) {
    console.log((e as Error).message)
   }
  }

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value)
  }
  return (
    <div className="app container">
      <div className="weather">
        <div className="d-flex justify-content-between align-items-center mb-5">
          <input className="search_input" placeholder="Enter a city" onChange={changeHandler} />
          <button className="search_btn btn btn-primary" onClick={getData}>Поиск</button>
        </div>
        <div className="mb-5">
          <h1>{weather.main.temp}</h1>
          <span>Current temperature </span>
        </div>
        <hr/>
        <div className="d-flex align-items-center justify-content-between mb-2">Feels like <span>{weather.main.feels_like}</span></div>
        <div  className="d-flex align-items-center justify-content-between mb-2">Temperature min <span> {weather.main.temp_min}</span> </div>
        <div className="d-flex align-items-center justify-content-between mb-2">Temperature max <span>{weather.main.temp_max}</span> </div>
      </div>
    </div>
  );
}

export default App;
