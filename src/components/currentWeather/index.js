import React, { useEffect, useState } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { StyleSheet, View, Text, ImageBackground, Dimensions, Linking } from 'react-native';
import { Grid, Row, Col } from 'react-native-easy-grid'
import AbsoluteBackground from './absoluteBackground'
import Network from '../../network'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCALE = 375;

const scaleFontSize = (fontSize) => {
  const ratio = fontSize / SCALE; // get ratio based on your standard scale 
  const newSize = Math.round(ratio * SCREEN_WIDTH);
  return newSize;
}

const Datas = () => {

  useEffect(() => {
    Network.fetchCurrentWeather("Kayseri");
  }, [])

  return (
    <View styles={styles.container}>
      <Grid size={3}>
        <Row>
          <Col size={1} style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Icon type="MaterialCommunityIcons" name="weather-partlycloudy" style={{ fontSize: scaleFontSize(60) }} />
          </Col>
          <Col size={2} style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: scaleFontSize(30) }}>Kısmen Güneşli</Text>
          </Col>
        </Row>
      </Grid>
      <Grid size={3}>
        <Row>
          <Col size={1} style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Row>
              <Text style={{ fontSize: scaleFontSize(40) }}>30&#186; </Text>
              <Col>
                <Col>
                  <Text style={{ fontWeight: 'bold' }}>Y:32&#186;</Text>
                </Col>
                <Col>
                  <Text style={{ fontWeight: 'bold' }}>D:16&#186;</Text>
                </Col>
              </Col>
            </Row>
          </Col>
          <Col size={2}>
            <Row>
              <Col size={2} style={{ paddingLeft: 20 }}>
                <Text style={{ fontSize: scaleFontSize(15), textAlign: 'left' }}>Gerçek Hissedilen</Text>
                <Text style={{ fontSize: scaleFontSize(15), textAlign: 'left' }}>Rüzgar</Text>
                <Text style={{ fontSize: scaleFontSize(15), textAlign: 'left' }}>Nem</Text>
                <Text style={{ fontSize: scaleFontSize(15), textAlign: 'left' }}>Görünürlük</Text>
              </Col>
              <Col size={1} style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: scaleFontSize(15) }}>12&#186;</Text>
                <Text style={{ fontSize: scaleFontSize(15) }}>12&#186;</Text>
                <Text style={{ fontSize: scaleFontSize(15) }}>12&#186;</Text>
                <Text style={{ fontSize: scaleFontSize(15) }}>12&#186;</Text>
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
  );

};

const CurrentWeather = () => {
  const image = require("../../assets/WeatherPhotos/clear.jpg");
  return (
    <ImageBackground source={image} style={styles.image}>
      <Grid size={1}>

      </Grid>
      <Grid size={1}>
        <AbsoluteBackground />
        <View style={{ position: 'absolute', padding: 10, width: '100%', paddingTop: '15%' }}>
          <Datas />
        </View>
      </Grid>
    </ImageBackground>
  );

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
});

export default CurrentWeather;
