import { useState, useEffect } from "react";

interface WeatherDetails {
  number: number
  name: string
  startTime: string
  temperature: number
  windDirection: string
  windSpeed: string
  probabilityOfPrecipitation: {
    value: number
  }
  relativeHumidity: {
    value:number
  }
  shortForecast: string
  isDaytime: boolean
  }
  
function GetWeather(coordinates: any): [any, any, any] {

    const location = coordinates
    const [hourlyweather, setHourly] = useState<WeatherDetails[]>([]);
    const [dailyweather, setDaily] = useState<WeatherDetails[]>([]);
    const [city, setCity] = useState([])
    const [state, setState] = useState([])


    const getHourlyWeather = async (api:any) => {
      await fetch(`${api}`,
      {method: 'GET',})
      .then((e) => e.json())
      .then((e) => setHourly(e.properties.periods as WeatherDetails[]))
    }

    const getDailyWeather = async (api:any) => {
      await fetch(`${api}`,
      {method: 'GET',})
      .then((e) => e.json())
      .then((e) => setDaily(e.properties.periods as WeatherDetails[]))
    }

    useEffect(() => {

      const fetchdata = async (): Promise<Response> => {
        return await fetch(`https://api.weather.gov/points/${location}`,
        {method: 'GET',})
      }

      fetchdata()
      .then((e) => e.json())
      .then((e) => {
        getHourlyWeather(e.properties.forecastHourly)
        getDailyWeather(e.properties.forecast)
        setCity(e.properties.relativeLocation.properties.city)
        setState(e.properties.relativeLocation.properties.state)
      } );
    }, [])

    const nwsCity = city + ", " + state
    

  return [dailyweather, hourlyweather.slice(0,12), nwsCity]
  }
  
  export default GetWeather