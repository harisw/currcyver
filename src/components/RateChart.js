import React, {useEffect, useState} from "react";
import {Text, View } from 'react-native';
import axios from 'axios';
import fx from "money";
import moment from 'moment';
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

import Loading from "../components/Loading";
import styled from "styled-components/native";

const URL = "https://api.frankfurter.app/";
const screenWidth = Dimensions.get("window").width;
const CHART_CFG = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};

const RateChart = props => {

    const currentDay = moment().format('YYYY-MM-DD').toString();
    const startDay = moment().subtract(1, 'month').format('YYYY-MM-DD').toString();
    
    console.log(startDay);
    console.log(currentDay);
    const [dateStart, setDateStart] = useState(currentDay);
    const [dateEnd, setDateEnd] = useState(startDay);
    const [data, setData] = useState();
    const [error, setError] = useState();
    
    const getData = () => {
        axios.get(`${URL}${startDay}..${currentDay}?from=${props.from}&to=${props.to}`).then(res => {
            console.log(res.data);
            setData(res.data);
        }).catch(err => {
            setError(err.message);
        });
    };
    useEffect(() => {
        getData();
    }, [dateStart, dateEnd]);

    if(!data)   return <Loading />;
    if(error)   return <View><Text>Error ${error.message}</Text></View>;

    const chartData = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
            data: [20, 45, 28, 80, 99, 43],
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            strokeWidth: 2 // optional
            }
        ],
        legend: ["Rainy Days"] // optional
    };
    return (
        <View>
            <LineChart
                data={chartData}
                width={screenWidth}
                height={220}
                chartConfig={CHART_CFG}
            />
        </View>
    );
};

export default RateChart;