import { useState } from 'react';

import { LineChart } from '@mui/x-charts/LineChart';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import LocationForm from '../api/LocationForm'
import DisplayIcon from './DisplayIcon';
import TabPanel from './TabPanel';
import Footer from './Footer';


function DisplayWeather() {
    const hours: number = 24
    const [addressForm, dailyWeather, hourlyWeather, newCity] = LocationForm(hours)
    const currentWeather = hourlyWeather[0]
    
    // Logic to create data for hourly graphs
    // **************************************
    var timelog = Array<any>(hours).fill(0)
    var templog = Array<number>(hours).fill(0)
    var perciplog = Array<number>(hours).fill(0)
    var humidlog = Array<number>(hours).fill(0)
    var windlog = Array<number>(hours).fill(0)
    var shortlog = Array<any>(hours).fill(0)
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
    var weekforcast = []
    for (var i = 0; i < dayindex.length ; i++){
        dailyWeather[dayindex[i].index]['dayofweek'] = dayindex[i].day
        if(dailyWeather[dayindex[i].index]?.probabilityOfPrecipitation?.value == null){
            dailyWeather[dayindex[i].index]['percip'] = 0
        } else {
            dailyWeather[dayindex[i].index]['percip'] = dailyWeather[dayindex[i].index]?.probabilityOfPrecipitation?.value
        }
        
        weekforcast.push(dailyWeather[dayindex[i].index])
    }

    // Logic for background render
    // *****************************************
    const BackgroundRender = (isDaytime: Boolean): [any, any, any]  => {
        var background = ''
        var indicatorColor = ''
        var chartcolor = ''
        
        if (isDaytime) {
            background = 'article grid bg-gradient-to-b from-blue-500 to-cyan-500'
            indicatorColor = 'primary'
            chartcolor = '#F5F5F5'
        } else {
            background = 'article grid bg-gradient-to-b from-violet-700 to-blue-800'
            indicatorColor = 'primary'
            chartcolor = '#0099ff'
        }
        return [background, indicatorColor, chartcolor]
    }

    const [background, indicatorColor, chartcolor] = BackgroundRender(currentWeather?.isDaytime)

    // For Tabs
    // ********
    const [value, setValue] = useState(0);
    // @ts-ignore
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    // SX props for line chart
    const sxprops = {
        "& .MuiChartsAxis-bottom .MuiChartsAxis-line ":{
         stroke:"#F5F5F5",
        },
        "& .MuiChartsAxis-bottom .MuiChartsAxis-tick ":{
           stroke:"#F5F5F5",
          },
        "& .MuiChartsAxis-left .MuiChartsAxis-line":{
         stroke:"#F5F5F5",
        },
        "& .MuiChartsAxis-left .MuiChartsAxis-tick ":{
           stroke:"#F5F5F5",
          },
     }


    // For Accordian
    const [expanded, setExpanded] = useState<string | false>(false);
    // @ts-ignore
    const handleAccordian = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
    
    
  return (
<div className={background}>
    <div className='header grid justify-items-center mt-6 text-white'>

        <div className='text-center'>
            {addressForm}
        </div>

        {/* Current Weather Display */}
        <div className='bg-white bg-opacity-35 rounded mt-4  w-fit p-4 justify-items-center grid'>
            <div className='LocationText text-center border-b-2 w-fit'>{newCity}</div>
            <div className='ParagraphText flex justify-center items-center gap-3 md:gap-40 mt-1'>
                <div className='text-center flex items-center'>
                    <DisplayIcon description={currentWeather?.shortForecast} className='h-20'/>
                    <div className="TempText">{currentWeather?.temperature}°</div>
                    <div className='hidden md:grid col-span-2 text-start ms-2'>
                        <div>Precipitation: {currentWeather?.probabilityOfPrecipitation?.value}%</div>
                        <div>Humidity: {currentWeather?.relativeHumidity?.value}%</div>
                        <div>Wind: {currentWeather?.windSpeed} {currentWeather?.windDirection}</div>
                    </div>
                    <div className='grid md:hidden col-span-2 text-start ms-2'>
                        <div><i className="fa-solid fa-cloud-rain SubtitleText"/> {currentWeather?.probabilityOfPrecipitation?.value}%</div>
                        <div><i className="fa-solid fa-droplet SubtitleText"/> {currentWeather?.relativeHumidity?.value}%</div>
                        <div><i className="fa-solid fa-wind SubtitleText"/> {currentWeather?.windSpeed}</div>
                    </div>
                </div>
                <div className='grid text-end items-center'>
                    <div>{Date().slice(0,10)}</div>
                    <div>Time: {currentWeather?.startTime?.slice(11,16)}</div>
                    <div>{currentWeather?.shortForecast}</div>
                </div>
            </div>
        </div>

        {/* Line Chart Section - hiddem when <medium */}
        <div className='w-full max-w-7xl mt-2 ms-4 hidden md:grid'>
            <div className='text-center'>
                <div className='SubtitleText underline'>Hourly Forecast</div>
                {/* @ts-ignore */}
                <Tabs value={value} onChange={handleChange} aria-label="inherit tabs example" centered textColor="inherit"
                indicatorColor={indicatorColor}>
                    <Tab label="Temperature" id='simple-tab-0' aria-controls='simple-tabpanel-0'/>
                    <Tab label="Percipitation" id='simple-tab-1' aria-controls='simple-tabpanel-1'/>
                    <Tab label="Humidity" id='simple-tab-2' aria-controls='simple-tabpanel-2' />
                    <Tab label="Wind" id='simple-tab-3' aria-controls='simple-tabpanel-3' />
                </Tabs>
            </div>
            <TabPanel value={value} index={0}>
                <LineChart
                xAxis={[{ data: timelog, tickNumber:hours , scaleType: 'time', tickLabelStyle: {fill: '#F5F5F5'}}]}
                yAxis={[{ min:Math.min(...templog)-1, max:Math.max(...templog)+1, label: 'Temperature °F', labelStyle:{
                    fill: '#F5F5F5'}, tickLabelStyle: {fill: '#F5F5F5'}}]}
                series={[
                {
                    data: templog,
                    color: chartcolor,
                },
                ]}
                tooltip={{ trigger: 'none' }}
                sx={sxprops}
                />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <LineChart
                xAxis={[{ data: timelog, tickNumber:hours , scaleType: 'time', tickLabelStyle: {fill: '#F5F5F5'}}]}
                yAxis={[{ min:Math.min(...perciplog)-1, max:Math.max(...perciplog)+1, label: 'Percipitation %', labelStyle:{
                    fill: '#F5F5F5'}, tickLabelStyle: {fill: '#F5F5F5'}}]}
                series={[
                {
                    data: perciplog,
                    color: chartcolor
                },
                ]}
                tooltip={{ trigger: 'none' }}
                sx={sxprops}
                />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <LineChart
                xAxis={[{ data: timelog, tickNumber:hours , scaleType: 'time', tickLabelStyle: {fill: '#F5F5F5'}}]}
                yAxis={[{ min:Math.min(...humidlog)-1, max:Math.max(...humidlog)+1, label: 'Humidity %', labelStyle:{
                    fill: '#F5F5F5'}, tickLabelStyle: {fill: '#F5F5F5'}}]}
                series={[
                {
                    data: humidlog,
                    color: chartcolor
                },
                ]}
                tooltip={{ trigger: 'none' }}
                sx={sxprops}
                />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <LineChart
                xAxis={[{ data: timelog, tickNumber:hours , scaleType: 'time', tickLabelStyle: {fill: '#F5F5F5'}}]}
                yAxis={[{ min:Math.min(...windlog)-1, max:Math.max(...windlog)+1, label: 'Wind mph', labelStyle:{
                    fill: '#F5F5F5'}, tickLabelStyle: {fill: '#F5F5F5'}}]}
                series={[
                {
                    data: windlog,
                    color: chartcolor
                },
                ]}
                tooltip={{ trigger: 'none' }}
                sx={sxprops}
                />
            </TabPanel>
        </div>

        {/* 7-Day Forecast: hidden when <medium */}
        <div className=' bg-white bg-opacity-25 rounded py-2 w-full max-w-7xl hidden md:grid'>
            <div className='SubtitleText text-center underline mb-2'>7-Day Forecast</div>
            <div className='grid grid-cols-7 justify-items-center text-sm lg:text-base'>
                {weekforcast.map((day:any) => (
                <div key={day?.number} className='ParagraphText text-center grid justify-items-center'>
                    <div className='SubtitleText  border-b w-full text-opacity-60 border-opacity-60 border-white'>{day?.dayofweek}</div>
                    <div>{day?.temperature}°F</div>
                    <DisplayIcon description={day?.shortForecast} className='h-12 self-center'/>
                    <div>Percip: {day?.percip}%</div>
                    <div>Humidity: {day?.relativeHumidity?.value}%</div>
                    <div>Wind: {day?.windSpeed.slice(0,2)} mph</div>
                </div>
                ))}

            </div>        
        </div>

        {/* small Accordian */}
        <div className='mt-4 w-11/12 grid md:hidden'>
        <Accordion onChange={handleAccordian('panel1')} expanded={expanded === 'panel1'}
        sx={{backgroundColor: "transparent"}}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            sx={{bgcolor:"rgba(255,255,255,0.4)", borderRadius:'0.4rem 0.4rem 0rem 0rem' }}
            color='#FFF'
            >
                <div className='w-full grid justify-center SubtitleText h-full text-white'>7-Day Forecast</div>
            </AccordionSummary>
            <AccordionDetails
                sx={{bgcolor:"rgba(240,240,240,0.4)", borderRadius: '0rem 0rem 0.4rem 0.4rem' }}
                color='#FFF'>
                <div className='list-none'>
                    {weekforcast.map((day:any) => (
                    <li key={day?.number} className='ParagraphText text-center flex text-white border-b py-2 items-center'>
                        <div className='grid SubtitleText me-4'>
                            <div className=''>{day?.dayofweek}</div>
                            <div>{day?.temperature}°F</div>
                        </div>
                        <DisplayIcon description={day?.shortForecast} className='h-12 self-center'/>
                        <div className='flex w-full justify-end'>
                            <div className='grid me-4'>
                                <div><i className="fa-solid fa-cloud-rain SubtitleText"/></div>
                                <div>{day?.percip}%</div>
                            </div>
                            <div className='grid me-3'>
                                <div><i className="fa-solid fa-droplet SubtitleText"/></div>
                                <div>{day?.relativeHumidity?.value}%</div>
                            </div>
                            <div className='grid'>
                                <div><i className="fa-solid fa-wind SubtitleText"/></div>
                                <div>{day?.windSpeed.slice(0,2)} mph</div>
                            </div>
                        </div>
                        
                    </li>
                    ))}
                </div>
            </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === 'panel2'} onChange={handleAccordian('panel2') }
        sx={{backgroundColor: "transparent"}}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
            sx={{bgcolor:"rgba(255,255,255,0.4)", borderRadius:'0rem 0rem 0.4rem 0.4rem'}}
            color='#FFF'
            >
            <div className='w-full grid justify-center SubtitleText h-full text-white'>Hourly Forecast</div>
            </AccordionSummary>
            <AccordionDetails
            sx={{bgcolor:"rgba(240,240,240,0.4)", borderRadius:'0.2rem 0.2rem 0.4rem 0.4rem' }}
            color='#FFF'>
            <div className='list-none'>
                    {hourlyWeather.map((day:any) => (
                    <li key={day?.number} className='ParagraphText text-center flex text-white border-b py-2 items-center'>
                        <div className='grid SubtitleText me-4'>
                            <div className=''>{day?.startTime?.slice(11,16)}</div>
                            <div>{day?.temperature}°F</div>
                        </div>
                        <DisplayIcon description={day?.shortForecast} className='h-12 self-center'/>
                        <div className='flex w-full justify-end'>
                            <div className='grid me-4'>
                                <div><i className="fa-solid fa-cloud-rain SubtitleText"/></div>
                                <div>{day?.probabilityOfPrecipitation?.value}%</div>
                            </div>
                            <div className='grid me-3'>
                                <div><i className="fa-solid fa-droplet SubtitleText"/></div>
                                <div>{day?.relativeHumidity?.value}%</div>
                            </div>
                            <div className='grid'>
                                <div><i className="fa-solid fa-wind SubtitleText"/></div>
                                <div>{day?.windSpeed.slice(0,2)} mph</div>
                            </div>
                        </div>
                        
                    </li>
                    ))}
                </div>
            </AccordionDetails>
        </Accordion>
        </div>

    </div>

    <div className='mt-8'>
        <Footer/>
    </div>

    
</div>
  )
}

export default DisplayWeather