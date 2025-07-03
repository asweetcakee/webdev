import { useEffect, useState } from 'react'
import countryService from '../services/countries'

const CountryDetail = ({country}) => {
  if (!country) return null
  
  const [weather, setWeather] = useState(null)
  const { capital } = country
  const { svg: imgPath, alt: imgDescription} = country.flags

  useEffect(() => {
    setWeather(null)
    console.log('capital:', capital)
    countryService
      .getWeatherByCapital(capital)
      .then(data => setWeather(data))
      .catch(error => {
        console.log('Weather fetch failed:', error)
      })
  },[country])

  if (!weather) return null
  
  const { speed: windSpeed } = weather.wind
  const { temp: temperature } = weather.main
  const { icon, description } = weather.weather[0]
  const weatherIconURL = countryService.getIcon(icon)

  console.log('weather:', weather)
  return(
    <>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital}</p>
      <p>Area {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.entries(country.languages)
          .map(entry => <li key={entry[0]}>{entry[1]}</li>)
        }
      </ul>
      <img src={imgPath} alt={imgDescription} style={{width: "200px", height: "auto"}}/>
      <h2>Weather in {capital}</h2>
      <p>Temperature {temperature} Celcius</p>
      <img src={weatherIconURL} alt={description} style={{width: "120px", height: "auto"}} />
      <p>Wind {windSpeed} m/s</p>
    </>
  )
}

export default CountryDetail