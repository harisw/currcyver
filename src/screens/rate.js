import React, { useEffect, useState } from "react";
import {View, Text} from 'react-native';
import axios from '../../config/axios';
import Loading from "../components/Loading";

const RateScreen = props => {
    const fromId = props.navigation.getParam('fromId');
    const toId = props.navigation.getParam('toId');
    const currencyName = props.navigation.getParam('currencyName');
    const [data, setData] = useState();
    const getRate = async() => {
        axios.get(`latest?from=${fromId}&to=${toId}`).then(res => {
            console.log(res.data);
            setData(res.data);
        }).catch(err => {
            return <Text>Error {err}</Text>
        });
    }

    useEffect(() =>{
        getRate();
    });
    if(!data)   return <Loading />;

    const rate = Object.values(data.rates)[0];
    return (
        <View>
            <Text>{data.amount} {currencyName} equals</Text>
            <Text>{rate} {toId}</Text>
        </View>
    );
};

export default RateScreen;