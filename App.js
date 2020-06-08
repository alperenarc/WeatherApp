import React, { useEffect, useState } from 'react';
import { Container, Header, Left, Body, Right, Button, Content, Icon, Title, Tabs, Tab, TabHeading } from 'native-base';
import { StyleSheet, View, Text, StatusBar, SafeAreaView } from 'react-native';
import { Grid, Row, Col } from 'react-native-easy-grid'
import CurrentWeather from './src/components/currentWeather'
const App = () => {
  const [city, setCity] = useState('Kayseri');

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
                <CurrentWeather />
              </Tab>
              <Tab heading={<TabHeading style={{ backgroundColor: '#1D2028' }}><Text style={{ color: '#fff' }}>Saatlik</Text></TabHeading>}>
              </Tab>
              <Tab heading={<TabHeading style={{ backgroundColor: '#1D2028' }}><Text style={{ color: '#fff' }}>Hava Durumu</Text></TabHeading>}>
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
  }
});

export default App;
