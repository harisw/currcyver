import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

import ax from '../../config/axios';
import Loading from "../components/Loading";
import CurrFeed from '../components/CurrFeed';

const Home = props => {

    const [currencies, setCurrencies] = useState(false);
    const [error, setError] = useState(false);
    
    const getCurrencies = () => {
        ax.get("currencies").then(data => {
            const mappedResult = Object.keys(data.data).map((key, index) => {
                return {
                    id: key,
                    val: data.data[key]
                };
            });
            setCurrencies(mappedResult);
        }).catch(err => {
            console.log(err);
            setError(err);
        });
    }

    useEffect(() => {
        getCurrencies();
        return () => {};
    }, []);

    if(error)   return <View><Text>Error {error}</Text></View>;
    if(!currencies) return <Loading />;

    return <CurrFeed currencies={currencies} 
            navigation={props.navigation}/>;
};

Home.navigationOptions = {
    title: 'Home'
};

export default Home;