const Keys = require('../../keys.json')

const OPENWEATHER_API_KEY = Keys.OPENWEATHER_API_KEY

class Network {
    
    fetchCurrentWeather = async (cityName) => {
        console.warn(OPENWEATHER_API_KEY)
        console.warn(cityName)
       /* fetch('')
            .then(response => response.json())
            .then(data => this.setState({ hits: data.hits }));*/
    }

}

export default new Network()