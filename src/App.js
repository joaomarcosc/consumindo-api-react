import React, {Fragment, useState, useEffect} from 'react';
import axios from 'axios'
import './App.css'

function App() {
  const [location, setLocation] = useState(false)
  const [weather, setWeather] = useState(false)

  let getWeather = async(lat, long) => {
    let response = await axios.get('http://api.openweathermap.org/data/2.5/weather', {
      params: {
        lat: lat,
        lon: long,
        appid: process.env.REACT_APP_WEATHER_KEY,
        lang: 'pt',
        units: 'metric'
      }
    })
    setWeather(response.data)
  }



  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      getWeather(position.coords.latitude, position.coords.longitude)
      setLocation(true)
    })
  }, [])


  if(location === false ) {
    return(
      <Fragment>
        <h1>Voce precisa ativar a localização =)</h1>
      </Fragment>
    )
  } else if(weather === false)
  return(
    <Fragment>
      <h1>Carregando informações...</h1>
    </Fragment>
  )
  
    else {
    return (
      <Fragment>
        <div className="body">
          <div className="Container">
            <h2>({weather['weather'][0]['description']})</h2> 
          </div>
          <hr/>
          <ul>
            <li>Temperatura atual: {weather['main']['temp']}°</li>
            <li>Temperatura máxima: {weather['main']['temp_max']}°</li>
            <li>Temperatura minima: {weather['main']['temp_min']}°</li>
            <li>Pressão:  {weather['main']['pressure']} hpa</li>
            <li>Unidade: {weather['main']['humidity']}%</li>
          </ul>
        </div>
      </Fragment>
    );
  }

}

export default App;
