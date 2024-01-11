import { useState, useEffect } from "react";
import ColorButton from "../components/ColorButton";


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

function GetLocation(hours:number): [any, any, any, any] {

    const key = '659effe85cc3c335889818uhkf02452'
    
    const [hourlyweather, setHourly] = useState<WeatherDetails[]>([]);
    const [dailyweather, setDaily] = useState<WeatherDetails[]>([]);
    const [city, setCity] = useState([])
    const [state, setState] = useState([])

    const [lat, setLat] = useState('38.797675')
    const [lon, setLon] = useState('-104.913634')

    const coordinates = lat + "," + lon

    const locationfunction = (event: any) => {
      event.preventDefault();
      const target = event.target;
      const userinput = target.userinput.value

      const address = userinput.split(' ').join('+')

      const fetchdata = async (): Promise<Response> => {
        return await fetch(`https://geocode.maps.co/search?q=${address}&api_key=${key}`,
          {method: 'GET'})
      }

      fetchdata()
      .then((e) => e.json())
      .then((e) => {
        setLat(e[0].lat)
        setLon(e[0].lon)
      } );
    }

    useEffect(() => {
      const fetchdata = async (): Promise<Response> => {
        return await fetch(`https://api.weather.gov/points/${coordinates}`,
        {method: 'GET',})
      }

      fetchdata()
      .then((e) => e.json())
      .then((e) => {
        getHourlyWeather(e.properties.forecastHourly)
        getDailyWeather(e.properties.forecast)
        setCity(e.properties.relativeLocation.properties.city)
        setState(e.properties.relativeLocation.properties.state)
      } );;
    }, [lat])

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

    const nwsCity = city + ", " + state

    const addressform = (
      <form onSubmit={locationfunction}>
        <label><input type="text" name='userinput' placeholder="Input an Address, Zip Code, or City" className="w-3/5 border border-blue-500 rounded" /></label>

        <ColorButton type="submit" className="p-2"/>
      </form>
    )
    

  return[addressform , dailyweather, hourlyweather.slice(0,hours), nwsCity]
  }
  
  export default GetLocation