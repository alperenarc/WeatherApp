import React, { useEffect, useState } from 'react';
import { Container, Header, Left, Body, Right, Icon, Title } from 'native-base';
import { StyleSheet, View, SafeAreaView, Text, ScrollView, ImageBackground, Button, TouchableOpacity, Dimensions, Linking, ActivityIndicator } from 'react-native';
import { Grid, Row, Col } from 'react-native-easy-grid'
import Network from '../../network'
import IconType from '../../helper/IconType'
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCALE = 375;

const scaleFontSize = (fontSize) => {
    const ratio = fontSize / SCALE; // get ratio based on your standard scale 
    const newSize = Math.round(ratio * SCREEN_WIDTH);
    return newSize;
}
const AbsoluteBackground = () => {
    return (
        <View style={styles.absolute} />
    )
}
const timeStampToDate = (timestamp) => {
    
    var days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
    let unix_timestamp = timestamp
    var date = new Date(unix_timestamp * 1000);
    var dayName = days[date.getDay()];
    return dayName;

}
const WeeklyForecast = (props) => {
    const [weeklyForecast, setWeeklyForecast] = useState();
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        Network.fetchWeeklyWeather((res) => {
            setWeeklyForecast(res.daily);
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
                            Object.keys(weeklyForecast).map((obj, i) => {
                                return (
                                    <Row key={obj}>
                                        <Col size={1} style={{ alignItems: 'center', justifyContent: 'center', padding: 3 }}>
                                            <Icon type="MaterialCommunityIcons" name={IconType(weeklyForecast[obj].weather[0].main)[0].iconType} style={{ fontSize: scaleFontSize(40) }} />
                                        </Col>
                                        <Col size={4} style={{ padding: 3 }}>
                                            <Row>
                                                <Text style={{ fontSize: scaleFontSize(20) }}>{timeStampToDate(weeklyForecast[obj].dt)}</Text>
                                            </Row>
                                            <Row>
                                                <Text style={{ fontSize: scaleFontSize(15), color: 'grey' }}>
                                                    
                                                 {IconType(weeklyForecast[obj].weather[0].main)[0].turkish}</Text>
                                            </Row>
                                        </Col>
                                        <Col size={2} style={{ alignItems: 'center', justifyContent: 'center', padding: 3 }}>
                                            <Text style={{ fontSize: scaleFontSize(25) }}>
                                                {(weeklyForecast[obj].temp.max - 273.15).toFixed(0)}&#186;/
                                                <Text style={{ fontSize: scaleFontSize(20) }}>
                                                    {(weeklyForecast[obj].temp.min - 273.15).toFixed(0)}&#186;
                                                </Text>
                                            </Text>
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

export default WeeklyForecast;
