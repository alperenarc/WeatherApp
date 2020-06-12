const Keys = require('../../keys.json')

const OPENWEATHER_API_KEY = Keys.OPENWEATHER_API_KEY

class Network {
    //https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=tr&APPID=${OPENWEATHER_API_KEY}
    //https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${OPENWEATHER_API_KEY}
    //https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,current,minutely&appid=${OPENWEATHER_API_KEY}
    fetchCurrentWeather = async (callback = f => f, coords) => {
        await fetch(`https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=439d4b804bc8187953eb36d2a8c26a02`)
            .then(response => response.json())
            .then(data => {
                callback(data)
            })
            .catch(err => console.warn(err));
    }

    fetchTwoDaysWeather = async (callback = f => f, coords) => {
        await fetch(`https://gist.githubusercontent.com/alperenarc/b5ef4565f1022e61e412204d6b78d871/raw/f30fe73eff8f98df766110a3518ca3f4653b754d/2Days`)
            .then(response => response.json())
            .then(data => {
                callback(data)
            })
            .catch(err => console.warn(err));
    }

    fetchWeeklyWeather = async (callback = f => f, coords) => {
        await fetch(`https://gist.githubusercontent.com/alperenarc/2ea244c28b956ae42a9d37ba6757b40c/raw/dd9970b0a123a857925d778b61efc58cebedf068/G%25C3%25BCnl%25C3%25BCk%2520Hava%2520Durumu`)
            .then(response => response.json())
            .then(data => {
                callback(data)
            })
            .catch(err => console.warn(err));
    }
}

export default new Network()