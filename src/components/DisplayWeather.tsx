import { useState } from 'react';
import GetLocation from '../api/GetLocation'
import { LineChart } from '@mui/x-charts/LineChart';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from './TabPanel';


function DisplayIcon(props:any) {
    const des = props.description

    const sunny = ["Sunny", "Mostly Clear", "Mostly Sunny", "Clear"]
    const partlycloudy = ["Partly Sunny"]
    const cloudy = ["Partly Cloudy"]
    const overcast = ["Mostly Cloudy"]
    // const sunnywind = []
    // const windy = []
    // const cloudywind = []
    // const coldsunny = []
    const moist = ["Patchy Fog", "Fog"]
    // const sunnyrain = []
    const lightshower = ["Slight Chance Rain Showers", "Chance Rain Showers", "Light Rain", "Light Rain Likely"]
    const raining = ["Rain Likely", "Heavy Rain", "Rain Showers Likely"]
    const sunnystorm = ["Slight Chance Showers And Thunderstorms"]
    // const stormywind = []
    const stormyrain = ["Chance Showers And Thunderstorms"]
    const sunnyflurries = ["Chance Snow Showers", "Chance Light Snow"]
    const flurries = ["Slight Chance Snow Showers", "Chance Snow", "Rain And Snow", "Light Snow Likely", "Chance Rain And Snow", "Light Snow"]
    const snowing = ["Chance Snow And Patchy Blowing Snow", "Snow Likely", "Rain And Snow Likely", "Patchy Blowing Snow", "Snow Showers Likely", "Chance Light Snow And Patchy Blowing Snow"]
    const coldfrost = ["Snow", "Snow And Patchy Blowing Snow", "Areas Of Blowing Snow", "Blowing Snow"]

    if (sunny.includes(des)) {
        return <img src='images/icons/sunny.png'/>
    }

    else if (partlycloudy.includes(des)) {
        return <img src='images/icons/partlycloudy.png'/>
    }

    else if (cloudy.includes(des)) {
        return <img src='images/icons/cloudy.png'/>
    }

    else if (overcast.includes(des)) {
        return <img src='images/icons/overcast.png'/>
    }

    // else if (sunnywind.includes(des)) {
    //     return <img src='images/icons/sunnywind.png'/>
    // }

    // else if (windy.includes(des)) {
    //     return <img src='images/icons/windy.png'/>
    // }

    // else if (cloudywind.includes(des)) {
    //     return <img src='images/icons/cloudywind.png'/>
    // }

    // else if (coldsunny.includes(des)) {
    //     return <img src='images/icons/coldsunny.png'/>
    // }

    else if (moist.includes(des)) {
        return <img src='images/icons/moist.png'/>
    }

    // else if (sunnyrain.includes(des)) {
    //     return <img src='images/icons/sunnyrain.png'/>
    // }

    else if (lightshower.includes(des)) {
        return <img src='images/icons/lightshower.png'/>
    }

    else if (raining.includes(des)) {
        return <img src='images/icons/raining.png'/>
    }

    else if (sunnystorm.includes(des)) {
        return <img src='images/icons/sunnystorm.png'/>
    }

    // else if (stormywind.includes(des)) {
    //     return <img src='images/icons/stormywind.png'/>
    // }

    else if (stormyrain.includes(des)) {
        return <img src='images/icons/stormyrain.png'/>
    }

    else if (sunnyflurries.includes(des)) {
        return <img src='images/icons/sunnyflurries.png'/>
    }

    else if (flurries.includes(des)){
        return <img src='images/icons/flurries.png'/>
    } 

    else if (snowing.includes(des)) {
        return <img src='images/icons/snowing.png'/>
    }

    else if (coldfrost.includes(des)) {
        return <img src='images/icons/coldfrost.png'/>
    }

    else {
        return <img src='images/icons/partlycloudy.png'/>
    }
}

function DisplayWeather() {
    const hours: number = 12
    const [buttontocall, dailyWeather, hourlyWeather, newCity] = GetLocation(hours)
    const currentWeather = hourlyWeather[0]

    // For Tabs
    // ********
    const [value, setValue] = useState(0);

    // @ts-ignore
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


    // Logic to create data for hourly graphs
    // **************************************
    var timelog = Array<any>(hours).fill(0)
    var templog = Array<number>(hours).fill(0)
    var perciplog = Array<number>(hours).fill(0)
    var humidlog = Array<number>(hours).fill(0)
    var windlog = Array<number>(hours).fill(0)
    var shortlog = Array<number>(hours).fill(0)
    for (var i = 0; i < timelog.length ; i++) {
        timelog[i] = new Date(hourlyWeather[i]?.startTime?.slice(0,16))
        templog[i] = hourlyWeather[i]?.temperature
        perciplog[i] = hourlyWeather[i]?.probabilityOfPrecipitation?.value
        humidlog[i] = hourlyWeather[i]?.relativeHumidity?.value
        windlog[i] = Number(hourlyWeather[i]?.windSpeed?.slice(0,2))
        shortlog[i] = hourlyWeather[i]?.shortForecast
    }
    

    // Logic to create data for weekly forecast
    // *****************************************
    const dayname = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    var previousindex = (new Date(dailyWeather[0]?.startTime?.slice(0,16))).getDay()
    var dayindex =  []

    for (var i = 0; i < dailyWeather.length ; i++){
        if (dayindex.length >=7){
            break;
        }
        if (i==0){
            dayindex.push({'index': i, 'day': dayname[previousindex]}) 
        } else {
            var currentday = (new Date(dailyWeather[i]?.startTime?.slice(0,16))).getDay()

            if (currentday != previousindex) {
                dayindex.push({'index': i, 'day': dayname[currentday]}) 
                previousindex = currentday
            } 
        }
    }
    var weeklyforcast = []
    for (var i = 0; i < dayindex.length ; i++){
        dailyWeather[dayindex[i].index]['dayofweek'] = dayindex[i].day
        weeklyforcast.push(dailyWeather[dayindex[i].index])
    }
    
    
  return (
<div className='mt-4 flex justify-center'>

    <div className='container max-w-6xl'>
        <div className='mt-4'>
            {buttontocall}
        </div>
        <div className='text-center text-4xl'>{newCity}</div>

        <div className='grid grid-cols-2 items-center'>
            <div className='text-center grid grid-cols-4 items-center'>
                <DisplayIcon description={currentWeather?.shortForecast}/>
                <div className="text-7xl">{currentWeather?.temperature}°</div>
                <div className='grid col-span-2 text-start ms-3'>
                    <div>Precipitation: {currentWeather?.probabilityOfPrecipitation?.value}%</div>
                    <div>Humidity: {currentWeather?.relativeHumidity?.value}%</div>
                    <div>Wind: {currentWeather?.windSpeed} {currentWeather?.windDirection}</div>
                </div>

            </div>
            <div className='grid text-end items-center'>
                <div>{Date().slice(0,10)}</div>
                <div>Time: {currentWeather?.startTime?.slice(11,16)}</div>
                <div>{currentWeather?.shortForecast}</div>
            </div>
        </div>
        

        <div className='w-full'>
            <div className='border-b'>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                    <Tab label="Temperature" id='simple-tab-0' aria-controls='simple-tabpanel-0' />
                    <Tab label="Percipitation" id='simple-tab-1' aria-controls='simple-tabpanel-1' color='black'/>
                    <Tab label="Humidity" id='simple-tab-2' aria-controls='simple-tabpanel-2' />
                    <Tab label="Wind" id='simple-tab-3' aria-controls='simple-tabpanel-3' />
                </Tabs>
            </div>
            <TabPanel value={value} index={0}>
                <LineChart
                xAxis={[{ data: timelog, tickNumber:hours , scaleType: 'time'}]}
                yAxis={[{ min:Math.min(...templog)-1, max:Math.max(...templog)+1, label: 'Temperature °F'}]}
                series={[
                {
                    data: templog,
                    color: '#4e79a7',
                },
                ]}
                tooltip={{ trigger: 'none' }}
                />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <LineChart
                xAxis={[{ data: timelog, tickNumber:hours , scaleType: 'time'}]}
                yAxis={[{ min:Math.min(...perciplog)-1, max:Math.max(...perciplog)+1, label: 'Percipitation %'}]}
                series={[
                {
                    data: perciplog,
                    color: '#4e79a7',
                },
                ]}
                tooltip={{ trigger: 'none' }}
                />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <LineChart
                xAxis={[{ data: timelog, tickNumber:hours , scaleType: 'time'}]}
                yAxis={[{ min:Math.min(...humidlog)-1, max:Math.max(...humidlog)+1, label: 'Humidity %'}]}
                series={[
                {
                    data: humidlog,
                    color: '#4e79a7',
                },
                ]}
                tooltip={{ trigger: 'none' }}
                />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <LineChart
                xAxis={[{ data: timelog, tickNumber:hours , scaleType: 'time'}]}
                yAxis={[{ min:Math.min(...windlog)-1, max:Math.max(...windlog)+1, label: 'Wind mph'}]}
                series={[
                {
                    data: windlog,
                    color: '#4e79a7',
                },
                ]}
                tooltip={{ trigger: 'none' }}
                />
            </TabPanel>
        </div>

        <div className='grid grid-cols-7 gap-6'>
        {weeklyforcast.map((week:any) => (
            <div key={week?.number} className='grid justify-center'>
                <div className='border border-blue-500 rounded'>
                    <div>{week?.temperature}°F</div>
                    <div>Percipitation: {week?.probabilityOfPrecipitation?.value}%</div>
                    <div>Humidity: {week?.relativeHumidity?.value}%</div>
                    <div>Wind: {week?.windSpeed}</div>
                </div>
                <div>{week?.dayofweek}</div>
            </div>
        ))}
        </div>


    </div>

</div>
  )
}

export default DisplayWeather