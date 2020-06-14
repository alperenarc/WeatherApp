const Keys = require('../../keys.json')

const OPENWEATHER_API_KEY = Keys.OPENWEATHER_API_KEY
const OPENCAGEDATA_API_KEY = Keys.OPENCAGEDATA_API_KEY
const GOOGLEMAPS_API_KEY = Keys.GOOGLEMAPS_API_KEY
class Network {
    //https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=tr&APPID=${OPENWEATHER_API_KEY} //https://samples.openweathermap.org/data/2.5/weather?q=London,uk&units=metric&appid=439d4b804bc8187953eb36d2a8c26a02
    //https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${OPENWEATHER_API_KEY} //https://gist.githubusercontent.com/alperenarc/b5ef4565f1022e61e412204d6b78d871/raw/f30fe73eff8f98df766110a3518ca3f4653b754d/2Days
    //https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,current,minutely&appid=${OPENWEATHER_API_KEY} //https://gist.githubusercontent.com/alperenarc/2ea244c28b956ae42a9d37ba6757b40c/raw/dd9970b0a123a857925d778b61efc58cebedf068/G%25C3%25BCnl%25C3%25BCk%2520Hava%2520Durumu
    //https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${OPENCAGEDATA_API_KEY}
    //https://api.opencagedata.com/geocode/v1/json?q=${coords[0]}+${coords[1]}&key=${OPENCAGEDATA_API_KEY}
    fetchCurrentWeather = async (callback = f => f, coords) => {
        await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords[1]}&lon=${coords[0]}&units=metric&lang=tr&APPID=${OPENWEATHER_API_KEY}`)
            .then(response => response.json())
            .then(data => {
                callback(data)
            })
            .catch(err => console.warn(err));
    }

    fetchTwoDaysWeather = async (callback = f => f, coords) => {
        await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coords[1]}&lon=${coords[0]}&units=metric&exclude=daily,current,minutely&appid=${OPENWEATHER_API_KEY}`)
        .then(response => response.json())
            .then(data => {
                callback(data)
            })
            .catch(err => console.warn(err));
    }

    fetchWeeklyWeather = async (callback = f => f, coords) => {
        await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coords[1]}&lon=${coords[0]}&units=metric&exclude=hourly,current,minutely&appid=${OPENWEATHER_API_KEY}`)
            .then(response => response.json())
            .then(data => {
                callback(data)
            })
            .catch(err => console.warn(err));
    }

    getCityNameByCoords = async (callback = f => f, coords) => {
        await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords[0]},${coords[1]}&key=${GOOGLEMAPS_API_KEY}`)
            .then(response => response.json())
            .then(data => {
                //console.warn(data.results[0].components.state_district)
                //callback(data.results[0].components.state_district)
                console.warn(data.results[0].address_components[2].short_name)
                callback(data.results[0].address_components[2].short_name)
            })
            .catch(err => console.warn(err));
    }
}

export default new Network()