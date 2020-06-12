import React, { useEffect, useState } from 'react';
import { Container, Header, Left, Body, Right, Button, Content, Icon, Title, Tabs, Tab, TabHeading } from 'native-base';
import { StyleSheet, View, Text, StatusBar, SafeAreaView, ScrollView, RefreshControl, ActivityIndicator, } from 'react-native';
import { Grid, Row, Col } from 'react-native-easy-grid'
import CurrentWeather from './src/components/currentWeather'
import DailyForecast from './src/components/dailyForecast'
import WeeklyForecast from './src/components/weeklyWeather'
import Geolocation from '@react-native-community/geolocation'

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const App = () => {
  const [city, setCity] = useState('Kayseri');
  const [refreshing, setRefreshing] = React.useState(false);
  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);
  useEffect(() => {
    Geolocation.getCurrentPosition(data => {
      setLongitude(data.coords.longitude);
      setLatitude(data.coords.latitude);
      setIsLoading(true);
    })
  }, [])
  if (!city) {
    return (
      <View>
        <Text>Choose City</Text>
      </View>
    )
  } else {
    return (
      <SafeAreaView style={{ flex: 1 }}>

        <Container>
          <Header style={styles.header} hasTabs >
            <Body style={{ flexDirection: 'row' }}>
              <Title>Kayseri </Title>
            </Body>
            <Right>
              <Button transparent>
                <Icon type="MaterialCommunityIcons" name="menu" />
              </Button>
            </Right>
          </Header>
          <StatusBar barStyle='light-content' backgroundColor='#1D2028' />
          <Tabs>
            <Tab heading={<TabHeading style={{ backgroundColor: '#1D2028' }}><Text style={{ color: '#fff' }}>Şimdi</Text></TabHeading>}>

              <View style={styles.container}>
                <ScrollView
                  contentContainerStyle={styles.scrollView}
                  refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                  }
                >
                  <View>
                    {
                      isLoading ? <CurrentWeather long={longitude} lat={latitude} /> : <View style={{ justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator size={30} /></View>
                    }
                  </View>
                </ScrollView>
              </View>


            </Tab>
            <Tab heading={<TabHeading style={{ backgroundColor: '#1D2028' }}><Text style={{ color: '#fff' }}>Saatlik</Text></TabHeading>}>
              <DailyForecast long={longitude} lat={latitude}/>
            </Tab>
            <Tab heading={<TabHeading style={{ backgroundColor: '#1D2028' }}><Text style={{ color: '#fff' }}>Hava Durumu</Text></TabHeading>}>
              <WeeklyForecast long={longitude} lat={latitude}/>
            </Tab>
          </Tabs>

        </Container>
      </SafeAreaView>
    );
  }

};

const styles = StyleSheet.create({
  header: {
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
});

export default App;
