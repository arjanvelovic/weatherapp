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

    const defaultForm = ({classname: 'ps-2 w-3/5 rounded focus:outline-blue-500', placeholder: 'Input an Address, Zip Code, or City'})
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
        setError({classname: 'ps-2 w-3/5 border border-red-500 rounded focus:outline-red-500', placeholder: 'Uh-Oh something went wrong'})
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
        setError({classname: 'ps-2 w-3/5 border border-red-500 rounded focus:outline-red-500', placeholder: 'Uh-Oh, try a location in the US'})
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
        <label><input type="text" name='userinput' placeholder={Error.placeholder} className={Error.classname} value={formValues} onChange={(e) => {setFormValues(e.target.value)}}/></label>

        <ColorButton type="submit" className="p-2"/>
      </form>
    )
    

  return[addressform , dailyweather, hourlyweather.slice(0,hours), nwsCity]
  }
  
  export default GetLocation