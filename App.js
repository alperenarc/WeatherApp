import React, { useEffect, useState } from 'react';
import { Container, Header, Body, Title, Tabs, Tab, TabHeading } from 'native-base';
import { StyleSheet, View, Text, StatusBar, SafeAreaView, ActivityIndicator, } from 'react-native';
import CurrentWeather from './src/components/currentWeather'
import DailyForecast from './src/components/dailyForecast'
import WeeklyForecast from './src/components/weeklyWeather'
import Geolocation from '@react-native-community/geolocation'
import Network from './src/network'


const App = () => {
  const [city, setCity] = useState();
  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [overFecthing, setOverFecthing] = useState(false);

  useEffect(() => {
    Geolocation.getCurrentPosition(data => {
      setLongitude(data.coords.longitude);
      setLatitude(data.coords.latitude);
      setOverFecthing(true)
    })
    if (overFecthing) {
      Network.getCityNameByCoords((data) => {
        setCity(data);
        setIsLoading(true);
      }, [latitude, longitude])
    }
  }, [overFecthing])

  return (
    !isLoading ?
      <View style={styles.centered}>
        <ActivityIndicator size={30} />
      </View>
      :
      <SafeAreaView style={{ flex: 1 }}>
        <Container>
          <Header style={styles.darkColor} hasTabs >
            <Body style={{ flexDirection: 'row' }}>
              <Title style={{ paddingLeft: 10 }}>{city}</Title>
            </Body>
          </Header>
          <StatusBar barStyle='light-content' backgroundColor='#1D2028' />
          <Tabs>
            <Tab heading={
              <TabHeading style={styles.darkColor}>
                <Text style={{ color: '#fff' }}>
                  Şimdi
                </Text>
              </TabHeading>
            }>
              {
                isLoading ? <CurrentWeather long={longitude} lat={latitude} /> :
                  <View style={styles.centered}>
                    <ActivityIndicator size={30} />
                  </View>
              }
            </Tab>
            <Tab heading={
              <TabHeading style={styles.darkColor}>
                <Text style={{ color: '#fff' }}>
                  Saatlik
                </Text>
              </TabHeading>}>
              <DailyForecast long={longitude} lat={latitude} />
            </Tab>
            <Tab heading={
              <TabHeading style={styles.darkColor}>
                <Text style={{ color: '#fff' }}>
                  Hava Durumu
                </Text>
              </TabHeading>}>
              <WeeklyForecast long={longitude} lat={latitude} />
            </Tab>
          </Tabs>
        </Container>
      </SafeAreaView>

  )
};

const styles = StyleSheet.create({
  darkColor: {
    backgroundColor: '#1D2028'
  },
  container: {
    flex: 1
  },
  scrollView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  centered:{
    justifyContent: 'center', 
    alignItems: 'center'
  }
});

export default App;
