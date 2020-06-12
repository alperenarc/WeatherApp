import React, { useEffect, useState } from 'react';
import { Container, Header, Left, Body, Right, Icon, Title } from 'native-base';
import { StyleSheet, View, Text, ImageBackground, Button, TouchableOpacity, Dimensions, Linking, ActivityIndicator } from 'react-native';
import { Grid, Row, Col } from 'react-native-easy-grid'
import AbsoluteBackground from './absoluteBackground'
import Network from '../../network'
import IconType from '../../helper/IconType'
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCALE = 375;

const scaleFontSize = (fontSize) => {
  const ratio = fontSize / SCALE; // get ratio based on your standard scale 
  const newSize = Math.round(ratio * SCREEN_WIDTH);
  return newSize;
}

const CurrentWeather = (props) => {
  const [isFullScreen, setIsFullScreen] = useState(true);
  const [currentWeather, setCurrentWeather] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [iconName, setIconName] = useState();
  const [weatherStateTurkish, setWeatherStateTurkish] = useState();
  const [overFecthing, setOverFecthing] = useState(false);
  const [image, setImage] = useState();

  useEffect(() => {
    Network.fetchCurrentWeather((data) => {
      setCurrentWeather(data);
      setOverFecthing(true);
    }, [props.long, props.lat]).then(() => {
      if (overFecthing) {
        const state = IconType(currentWeather.weather[0].main);
        setWeatherStateTurkish(state[0].turkish)
        setIconName(state[0].iconType)
        /*
                switch (state[0].photo) {
                  case 'thunderstorms.jpg':
                    setImage('../../assets/WeatherPhotos/thunderstorms.jpg')
                    break;
                  case 'rainy.jpg':
                    setImage('../../assets/WeatherPhotos/rainy.jpg')
                    break;
                  case 'snow.jpg':
                    setImage('../../assets/WeatherPhotos/snow.jpg')
                    break;
                  case 'clear.jpg':
                    setImage('../../assets/WeatherPhotos/clear.jpg')
                    break;
                  case 'cloudly.jpg':
                    setImage('../../assets/WeatherPhotos/cloudly.jpg')
                    break;
                  default:
                    break;
                }*/

        setIsLoading(true);
      }
    })
  }, [overFecthing]);

  const images = {
    photos: {
      rainy: require('../../assets/WeatherPhotos/rainy.jpg'),
      thunderstorms: require('../../assets/WeatherPhotos/thunderstorms.jpg'),
      snow: require('../../assets/WeatherPhotos/snow.jpg'),
      clear: require('../../assets/WeatherPhotos/clear.jpg'),
      cloudly: require('../../assets/WeatherPhotos/cloudly.jpg'),
    }
  };
  const imageSelect = network => {

    const networkArray = {
      'rainy.jpg': images.photos.rainy,
      'thunderstorms.jpg': images.photos.thunderstorms,
      'snow.jpg': images.photos.snow,
      'clear.jpg': images.photos.clear,
      'cloudly.jpg': images.photos.cloudly
    };

    return networkArray[network];
  };
  if (!isLoading) {
    return (
      <View>
        <ActivityIndicator size={50} />
      </View>
    )
  }
  //require("../../assets/WeatherPhotos/clear.jpg");
  //IconType(currentWeather.weather[0].main)[0].photo
  else {
    return (
      <ImageBackground source={imageSelect(IconType(currentWeather.weather[0].main)[0].photo)} style={styles.image}>
        <Grid size={1}>
          <TouchableOpacity style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'transparent',
            border: 'none'
          }} title='' onPress={() => setIsFullScreen(!isFullScreen)} />
        </Grid>
        {isFullScreen ?
          <Grid size={1} >
            <AbsoluteBackground />
            <View style={{ position: 'absolute', padding: 10, width: '100%', paddingTop: '10%' }}>
              <View styles={styles.container}>

                <Grid size={3}>
                  <Row>
                    <Col size={1} style={{ justifyContent: 'center', alignItems: 'center' }}>
                      <Icon type="MaterialCommunityIcons" name={iconName} style={{ fontSize: scaleFontSize(60) }} />
                    </Col>
                    <Col size={2} style={{ justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={[currentWeather.weather[0].description.length < 15 ? styles.textLenghtUnderFrom15 : styles.textLenghtUpperFrom15]}>
                        {IconType(currentWeather.weather[0].main)[0].turkish}
                      </Text>
                    </Col>
                  </Row>
                </Grid>
                <Grid size={3}>
                  <Row>
                    <Col size={1} style={{ justifyContent: 'center', alignItems: 'center' }}>
                      <Row>
                        <Text style={{ fontSize: scaleFontSize(40) }}> {(currentWeather.main.temp - 273.15).toFixed(0)}&#186; </Text>
                        <Col>
                          <Col>
                            <Text style={{ fontWeight: 'bold' }}>Y:{(currentWeather.main.temp_max - 273.15).toFixed(0)}&#186;</Text>
                          </Col>
                          <Col>
                            <Text style={{ fontWeight: 'bold' }}>D:{(currentWeather.main.temp_min - 273.15).toFixed(0)}&#186;</Text>
                          </Col>
                        </Col>
                      </Row>
                    </Col>
                    <Col size={2}>
                      <Row>
                        <Col size={2} style={{ paddingLeft: 20 }}>
                          <Text style={{ fontSize: scaleFontSize(15), textAlign: 'left' }}>Gerçek Hissedilen</Text>
                          <Text style={{ fontSize: scaleFontSize(15), textAlign: 'left' }}>Basınç</Text>
                          <Text style={{ fontSize: scaleFontSize(15), textAlign: 'left' }}>Nem</Text>
                          <Text style={{ fontSize: scaleFontSize(15), textAlign: 'left' }}>Görünürlük</Text>
                          <Text style={{ fontSize: scaleFontSize(15), textAlign: 'left' }}>Rüzgar</Text>
                        </Col>
                        <Col size={1} style={{ justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={{ fontSize: scaleFontSize(15) }}>{(currentWeather.main.feels_like - 273.15).toFixed(0)}&#186;</Text>
                          <Text style={{ fontSize: scaleFontSize(15) }}>{currentWeather.main.pressure} hPa</Text>
                          <Text style={{ fontSize: scaleFontSize(15) }}>{currentWeather.main.humidity} %</Text>
                          <Text style={{ fontSize: scaleFontSize(15) }}>{(currentWeather.visibility / 1000)} KM</Text>
                          <Text style={{ fontSize: scaleFontSize(15) }}>{(currentWeather.wind.speed)} KM</Text>
                        </Col>
                      </Row>
                    </Col>


                  </Row>
                </Grid>
                <Grid size={1} style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 10 }}>

                  <Text style={{ fontSize: scaleFontSize(13) }}>Veriler &nbsp;
    <Text style={{ fontWeight: 'bold', fontSize: scaleFontSize(13) }}
                      onPress={() => Linking.openURL('https://openweathermap.org')}>
                      openweathermap.org
    </Text>&nbsp;
        tarafından sağlanmaktadır.</Text>

                </Grid>
              </View>
            </View>
          </Grid>
          :
          <View />
        }
      </ImageBackground>
    );
  }
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  container: {
    flex: 1,

  },
  textLenghtUnderFrom15: {
    fontSize: scaleFontSize(30)
  },
  textLenghtUpperFrom15: {
    fontSize: scaleFontSize(25)
  }
});

export default CurrentWeather;
