import React, { useEffect, useState } from 'react';
import { Icon } from 'native-base';
import { StyleSheet, View, SafeAreaView, Text, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import { Grid, Row, Col } from 'react-native-easy-grid'
import Network from '../../network'
import IconType from '../../helper/IconType'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCALE = 375;

const scaleFontSize = (fontSize) => {
    const ratio = fontSize / SCALE; 
    const newSize = Math.round(ratio * SCREEN_WIDTH);
    return newSize;
}

const AbsoluteBackground = () => {
    return (
        <View style={styles.absolute} />
    )
}

const timeStampToDate = (timestamp) => {
    var data = []
    let unix_timestamp = timestamp
    var date = new Date(unix_timestamp * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var currentDay = new Date().getDate();
    var weatherDate = date.getDate();
    var weatherTime = hours + ':' + minutes.substr(-2)

    if (weatherDate === currentDay) {
        data.push(weatherTime);
        data.push('Bugün');
        return data
    }
    else if (weatherDate === currentDay + 1) {
        data.push(weatherTime);
        data.push('Yarın');
        return data
    } else if (weatherDate === currentDay + 2){
        data.push(weatherTime);
        data.push('Yarından Sonra');
        return data
    }
    else {
        data.push(weatherTime);
        data.push('Dün');
        return data
    }
}
const DailyForecast = (props) => {
    const [dailyForecast, setDailyForecast] = useState();
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        Network.fetchTwoDaysWeather((res) => {
            setDailyForecast(res.hourly);
            setIsLoading(true);
        },[props.long,props.lat])
    }, [])
    if (!isLoading) {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={50} />
            </View>
        )
    }
    else {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <AbsoluteBackground />
                    <Grid>
                        {
                            Object.keys(dailyForecast).map((obj, i) => {
                                return (
                                    <Row key={obj}>
                                        <Col size={1} style={{ alignItems: 'center', justifyContent: 'center', padding: 3 }}>
                                            <Icon type="MaterialCommunityIcons" name={IconType(dailyForecast[obj].weather[0].main)[0].iconType} style={{ fontSize: scaleFontSize(40) }} />
                                        </Col>
                                        <Col size={4} style={{ padding: 3 }}>
                                            <Row>
                                                <Text style={{ fontSize: scaleFontSize(25) }}>{timeStampToDate(dailyForecast[obj].dt)[0]}</Text>
                                            </Row>
                                            <Row>
                                                <Text style={{ fontSize: scaleFontSize(15), color: 'grey' }}>
                                                    {timeStampToDate(dailyForecast[obj].dt)[1]} - 
                                                {IconType(dailyForecast[obj].weather[0].main)[0].turkish}</Text>
                                            </Row>
                                        </Col>
                                        <Col size={1} style={{ alignItems: 'center', justifyContent: 'center', padding: 3 }}>
                                            <Text style={{ fontSize: scaleFontSize(30) }}>{(dailyForecast[obj].temp).toFixed(0)}&#186;</Text> 
                                        </Col>
                                    </Row>
                                )
                            })}
                    </Grid>
                </ScrollView>
            </SafeAreaView>

        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    absolute: {
        flex: 1,
        backgroundColor: '#FDFDFD',
        opacity: 0.3,
    },
    content: {
        position: 'absolute',
        width: '100%',
        padding: 10,
        flex: 1
    }
});

export default DailyForecast;
