interface IconProps {
    description?: string
    className?: string;
  }

function DisplayIcon(props:IconProps) {
    // @ts-ignore
    const des:string = props?.description
    const classname = props?.className

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
    const lightshower = ["Slight Chance Rain Showers", "Chance Rain Showers", "Light Rain", "Light Rain Likely", "Slight Chance Light Rain"]
    const raining = ["Rain Likely", "Heavy Rain", "Rain Showers Likely"]
    const sunnystorm = ["Slight Chance Showers And Thunderstorms"]
    // const stormywind = []
    const stormyrain = ["Chance Showers And Thunderstorms"]
    const sunnyflurries = ["Chance Snow Showers", "Chance Light Snow"]
    const flurries = ["Slight Chance Snow Showers", "Chance Snow", "Rain And Snow", "Light Snow Likely", "Chance Rain And Snow", "Light Snow"]
    const snowing = ["Chance Snow And Patchy Blowing Snow", "Snow Likely", "Rain And Snow Likely", "Patchy Blowing Snow", "Snow Showers Likely", "Chance Light Snow And Patchy Blowing Snow"]
    const coldfrost = ["Snow", "Snow And Patchy Blowing Snow", "Areas Of Blowing Snow", "Blowing Snow"]

    if (sunny.includes(des)) {
        return <img src='images/icons/sunny.png' className={classname}/>
    }

    else if (partlycloudy.includes(des)) {
        return <img src='images/icons/partlycloudy.png' className={classname}/>
    }

    else if (cloudy.includes(des)) {
        return <img src='images/icons/cloudy.png' className={classname}/>
    }

    else if (overcast.includes(des)) {
        return <img src='images/icons/overcast.png' className={classname}/>
    }

    // else if (sunnywind.includes(des)) {
    //     return <img src='images/icons/sunnywind.png' className={classname}/>
    // }

    // else if (windy.includes(des)) {
    //     return <img src='images/icons/windy.png' className={classname}/>
    // }

    // else if (cloudywind.includes(des)) {
    //     return <img src='images/icons/cloudywind.png' className={classname}/>
    // }

    // else if (coldsunny.includes(des)) {
    //     return <img src='images/icons/coldsunny.png' className={classname}/>
    // }

    else if (moist.includes(des)) {
        return <img src='images/icons/moist.png' className={classname}/>
    }

    // else if (sunnyrain.includes(des)) {
    //     return <img src='images/icons/sunnyrain.png' className={classname}/>
    // }

    else if (lightshower.includes(des)) {
        return <img src='images/icons/lightshower.png' className={classname}/>
    }

    else if (raining.includes(des)) {
        return <img src='images/icons/raining.png' className={classname}/>
    }

    else if (sunnystorm.includes(des)) {
        return <img src='images/icons/sunnystorm.png' className={classname}/>
    }

    // else if (stormywind.includes(des)) {
    //     return <img src='images/icons/stormywind.png' className={classname}/>
    // }

    else if (stormyrain.includes(des)) {
        return <img src='images/icons/stormyrain.png' className={classname}/>
    }

    else if (sunnyflurries.includes(des)) {
        return <img src='images/icons/sunnyflurries.png' className={classname}/>
    }

    else if (flurries.includes(des)){
        return <img src='images/icons/flurries.png' className={classname}/>
    } 

    else if (snowing.includes(des)) {
        return <img src='images/icons/snowing.png' className={classname}/>
    }

    else if (coldfrost.includes(des)) {
        return <img src='images/icons/coldfrost.png' className={classname}/>
    }

    else {
        return <img src='images/icons/partlycloudy.png' className={classname}/>
    }
}

export default DisplayIcon