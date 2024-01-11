import GetLocation from '../api/GetLocation'

function DisplayWeather() {

    const hours: number = 8
    const [buttontocall, dailyWeather, hourlyWeather, newCity] = GetLocation(hours)

    const currentWeather = hourlyWeather[0]
    // @ts-ignore */
    const currentForecast = dailyWeather[0]
    
    
  return (
    <div className='mt-4 flex justify-center'>

        
        <div className='container max-w-6xl'>
            <div className='mt-4'>
                {buttontocall}
            </div>
            <div className='text-center text-4xl'>{newCity}</div>

            <div className='grid grid-cols-2 items-center'>
                <div className='text-center grid grid-cols-4 items-center'>
                    <i className="fa-solid fa-sun text-7xl"></i>
                    <div className="text-7xl">{currentWeather?.temperature}°</div>
                    <div className='grid col-span-2 text-start ms-3'>
                        <div>Precipitation: {currentWeather?.probabilityOfPrecipitation?.value}%</div>
                        <div>Humidity: {currentWeather?.relativeHumidity?.value}%</div>
                        <div>Wind: {currentWeather?.windSpeed} {currentWeather?.windDirection}</div>
                    </div>

                </div>
                <div className='grid text-end items-center'>
                    <div>Time: {currentWeather?.startTime?.slice(11,16)}</div>
                    <div>{currentWeather?.shortForecast}</div>
                </div>
            </div>
            <div className='grid grid-cols-8 items-center mt-8'>
                
            {hourlyWeather.map((hourly:any) => (
                <div key={hourly?.number} className='grid justify-center'>
                    <div className='border border-blue-500 rounded'>
                        <div>{hourly?.temperature}°F</div>
                        <div>Percipitation: {hourly?.probabilityOfPrecipitation?.value}%</div>
                        <div>Humidity: {hourly?.relativeHumidity?.value}%</div>
                        <div>Wind: {hourly?.windSpeed}</div>
                    </div>
                    <div>{hourly?.startTime?.slice(11,16)}</div>
                </div>
            ))}

                
            </div>

            
            
            

        

        </div>

    </div>
  )
}

export default DisplayWeather