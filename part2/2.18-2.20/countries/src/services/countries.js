import axios from "axios";

const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api'
const openWeatherBaseURL = 'https://api.openweathermap.org/data/2.5/weather'
const openWeatherIconBaseURL = 'https://openweathermap.org/img/wn'
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const getAll = () => {
  const request = axios.get(`${baseURL}/all`)
  return request.then(response => response.data)
}

const getWeatherByCapital = (city) => {
  const request = axios.get(`${openWeatherBaseURL}?q=${city}&appid=${API_KEY}&units=metric`)
  return request.then(response => response.data)
}

const getIcon = (code) => {
  return `${openWeatherIconBaseURL}/${code}@2x.png`
}

export default { getAll, getWeatherByCapital , getIcon }