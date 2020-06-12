export default function IconType(weatherState) {
    var weatherPackage = []
    switch (weatherState) {
        case 'Thunderstorm':
            weatherPackage = []
            weatherPackage.push({
                turkish: 'Gök Gürültülü Sağanak Yağış',
                iconType:'weather-lightning-rainy',
                photo:'thunderstorms.jpg'
            })
            break;
        case 'Drizzle':
            weatherPackage = []
            weatherPackage.push({
                turkish: 'Hafif Yağmurlu',
                iconType:'weather-pouring',
                photo:'rainy.jpg'
            })
            break;
        case 'Rain':
            weatherPackage = []
            weatherPackage.push({
                turkish: 'Yağmurlu',
                iconType:'weather-pouring',
                photo:'rainy.jpg'
            })
            break;
        case 'Snow':
            weatherPackage = []
            weatherPackage.push({
                turkish: 'Karlı',
                iconType:'weather-snowy',
                photo:'snow.jpg'
            })
            break;
        case 'Clear':
            weatherPackage = []
            weatherPackage.push({
                turkish: 'Güneşli',
                iconType:'weather-sunny',
                photo:'clear.jpg'
            })
            break;
        case 'Clouds':
            weatherPackage = []
            weatherPackage.push({
                turkish: 'Bulutlu',
                iconType:'weather-cloudy',
                photo:'cloudly.jpg'
            })
            break;
        default:
            break;
    }
    return weatherPackage
}


