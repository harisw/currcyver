import React, {useState, useEffect} from "react";
import { Text, View } from 'react-native';
import styled from "styled-components/native";

import Loading from "../components/Loading";
import RateFeed from "../components/RateFeed";

import axios from "axios";

const URL = "https://api.frankfurter.app/";

const Header = styled.View`
    height: 100px;
    background-color: #F0FFC2
    border-bottom-width: 5px;
    border-bottom-color: black;
`;
const HeaderText = styled.Text`
    margin-top: 10px;
    font-weight: bold;
    font-size: 24px;
`;

const CurrScreen = props => {
    const id = props.navigation.getParam('id');
    const name = props.navigation.getParam('currencyName');
    const [data, setData] = useState(false);
    const [error, setError] = useState(false);

    const getData = () => {
        axios.get(`${URL}latest?from=${id}`).then(res => {
            setData(res.data);
        }).catch(err => {
            setError(err.message);
        });
    };

    useEffect(() => {
        getData();
        return () => {};
    }, []);

    if(error)   return <View><Text>Error {error}</Text></View>;
    if(!data) return <Loading />;

    const mappedRate = Object.keys(data.rates).map((key, index) => {
        return {
            id: key,
            val: data.rates[key]
        };
    });
    return (
        <View style={{ flex: 1}}>
            <Header>
                <HeaderText>{name}</HeaderText>
                <Text>{data.amount} {data.base}</Text>
            </Header>
            <RateFeed fromRate={id} rates={mappedRate} navigation={props.navigation}
                currencyName={name}/>
        </View>
    );
};

export default CurrScreen;