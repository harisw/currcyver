import React, { useState } from "react";
import { View, Text } from "react-native";

import Loading from "../components/Loading";
import axios from '../../config/axios';
import CurrFeed from '../components/CurrFeed';

const Home = props => {

    const [currencies, setCurrencies] = useState(false);

    axios.get("currencies").then(data => {
        setCurrencies(data.data);
    }).catch(err => {
        return <Text>Error {err} </Text>;
    });

    if(!currencies) return <Loading />;
    
    var mappedResult = Object.keys(currencies).map((key, index) => {
        return {
            id: key,
            val: currencies[key]
        };
    });

    return <CurrFeed currencies={mappedResult} 
            navigation={props.navigation}/>;
};

Home.navigationOptions = {
    title: 'Home'
};

export default Home;