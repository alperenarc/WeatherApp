import React, { useEffect, useState } from 'react';
import { Icon } from 'native-base';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity, Dimensions, Linking, ActivityIndicator } from 'react-native';
import { Grid, Row, Col } from 'react-native-easy-grid'
import AbsoluteBackground from './absoluteBackground'
import Network from '../../network'
import IconType from '../../helper/IconType'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCALE = 375;

const scaleFontSize = (fontSize) => {
  const ratio = fontSize / SCALE;
  const newSize = Math.round(ratio * SCREEN_WIDTH);
  return newSize;
}

const CurrentWeather = (props) => {
  const [isFullScreen, setIsFullScreen] = useState(true);
  const [currentWeather, setCurrentWeather] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [iconName, setIconName] = useState();
  const [overFecthing, setOverFecthing] = useState(false);

  useEffect(() => {
    Network.fetchCurrentWeather((data) => {
      setCurrentWeather(data);
      setOverFecthing(true);
    }, [props.long, props.lat]).then(() => {
      if (overFecthing) {
        const state = IconType(currentWeather.weather[0].main);
        setIconName(state[0].iconType)
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

  const imageSelect = image => {
    const ImageArray = {
      'rainy.jpg': images.photos.rainy,
      'thunderstorms.jpg': images.photos.thunderstorms,
      'snow.jpg': images.photos.snow,
      'clear.jpg': images.photos.clear,
      'cloudly.jpg': images.photos.cloudly
    };
    return ImageArray[image];
  };

  if (!isLoading) {
    return (
      <View>
        <ActivityIndicator size={50} />
      </View>
    )
  }
  else {
    return (
      <ImageBackground source={imageSelect(IconType(currentWeather.weather[0].main)[0].photo)} style={styles.image}>
        <Grid size={1}>
          <TouchableOpacity style={styles.fullScreenImage} title='' onPress={() => setIsFullScreen(!isFullScreen)} />
        </Grid>
        {isFullScreen ?
          <Grid size={1} >
            <AbsoluteBackground />
            <View style={styles.content}>
              <View styles={styles.container}>
                <Grid size={3}>
                  <Row>
                    <Col size={1} style={styles.eachCol}>
                      <Icon type="MaterialCommunityIcons" name={iconName} style={{ fontSize: scaleFontSize(60) }} />
                    </Col>
                    <Col size={2} style={styles.eachCol}>
                      <Text style={[currentWeather.weather[0].description.length < 15 ? styles.textLenghtUnderFrom15 : styles.textLenghtUpperFrom15]}>
                        {IconType(currentWeather.weather[0].main)[0].turkish}
                      </Text>
                    </Col>
                  </Row>
                </Grid>
                <Grid size={3}>
                  <Row>
                    <Col size={1} style={styles.eachCol}>
                      <Row>
                        <Text style={{ fontSize: scaleFontSize(40) }}> {(currentWeather.main.temp).toFixed(0)}&#186; </Text>
                        <Col>
                          <Col>
                            <Text style={{ fontWeight: 'bold' }}>Y:{(currentWeather.main.temp_max).toFixed(0)}&#186;</Text>
                          </Col>
                          <Col>
                            <Text style={{ fontWeight: 'bold' }}>D:{(currentWeather.main.temp_min).toFixed(0)}&#186;</Text>
                          </Col>
                        </Col>
                      </Row>
                    </Col>
                    <Col size={2}>
                      <Row>
                        <Col size={2} style={{ paddingLeft: 20 }}>
                          <Text style={styles.valueNames}>Gerçek Hissedilen</Text>
                          <Text style={styles.valueNames}>Basınç</Text>
                          <Text style={styles.valueNames}>Nem</Text>
                          <Text style={styles.valueNames}>Rüzgar</Text>
                        </Col>
                        <Col size={1} style={styles.eachCol}>
                          <Text style={styles.values}>{(currentWeather.main.feels_like).toFixed(0)}&#186;</Text>
                          <Text style={styles.values}>{currentWeather.main.pressure} hPa</Text>
                          <Text style={styles.values}>{currentWeather.main.humidity} %</Text>
                          <Text style={styles.values}>{(currentWeather.wind.speed)} KM</Text>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Grid>
                <Grid size={1} style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 10 }}>
                  <Text style={{ fontSize: scaleFontSize(13) }}>
                    Veriler &nbsp;
                    <Text style={{ fontWeight: 'bold', fontSize: scaleFontSize(13) }}
                      onPress={() => Linking.openURL('https://openweathermap.org')}>
                      openweathermap.org
                    </Text>&nbsp; tarafından sağlanmaktadır.
                  </Text>
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
    flex: 1
  },
  textLenghtUnderFrom15: {
    fontSize: scaleFontSize(30)
  },
  textLenghtUpperFrom15: {
    fontSize: scaleFontSize(25)
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  content: {
    position: 'absolute',
    padding: 10,
    width: '100%',
    paddingTop: '10%'
  },
  eachCol: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  valueNames: {
    fontSize: scaleFontSize(15),
    textAlign: 'left'
  },
  values: {
    fontSize: scaleFontSize(15)
  }
});

export default CurrentWeather;
