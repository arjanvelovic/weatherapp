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

function LocationForm(hours:number): [any, any, any, any] {

    const key = '659effe85cc3c335889818uhkf02452'

    const defaultForm = ({classname: 'border-b border-slate-50 focus:outline-blue-500', placeholder: 'Enter a US Address, Zip Code, or City'})
    const [formValues, setFormValues]=useState("")
    const [Error, setError] = useState(defaultForm)
    
    const [hourlyweather, setHourly] = useState<WeatherDetails[]>([]);
    const [dailyweather, setDaily] = useState<WeatherDetails[]>([]);
    const [city, setCity] = useState([])
    const [state, setState] = useState([])

    const [lat, setLat] = useState('40.734554')
    const [lon, setLon] = useState('-73.886961')

    const coordinates = lat + "," + lon

    const locationfunction = (event: any) => {
      event.preventDefault();
      const target = event.target;
      const userinput = target.userinput.value
      setFormValues("")

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
      })
      .catch((err)=>{
        console.log(err.message);
        setError({classname: 'border-b border-red-500 placeholder:text-red-500 placeholder:text-opacity-70', placeholder: 'Uh-Oh, try another location'})
      });
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
      })
      .catch((err) => {
        console.log(err.message);
        setError({classname: 'border-b border-red-500 placeholder:text-red-500 placeholder:text-opacity-70', placeholder: 'Uh-Oh, try a location in the US'})
      });
      
    }, [lat])

    const getHourlyWeather = async (api:any) => {
      await fetch(`${api}`,
      {method: 'GET',})
      .then((e) => e.json())
      .then((e) => setHourly(e.properties.periods as WeatherDetails[]))
      setError(defaultForm)
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
        <input className={Error.classname + "appearance-none w-80 bg-transparent text-slate-50 ps-2 focus:outline-none "} type="text" name='userinput' placeholder={Error.placeholder} value={formValues} onChange={(e) => {setFormValues(e.target.value)}} autoComplete="off"></input>
      </form>
    )
    
  return[addressform , dailyweather, hourlyweather.slice(0,hours), nwsCity]
  }
  
  export default LocationForm