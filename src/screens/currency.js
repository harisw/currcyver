import React, {useState} from "react";
import { Text, View } from 'react-native';
import styled from "styled-components/native";

import Loading from "../components/Loading";
import Currency from "../components/Currency";
import RateFeed from "../components/RateFeed";

import axios from "../../config/axios";

const Header = styled.View`
    height: 150px;
    background-color: #F0FFC2
    border-bottom-width: 2px;
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
    const [data, setRate] = useState(false);

    axios.get(`latest?from=${id}`).then(res => {
        setRate(res.data);
    }).catch(err => {
        return <Text>Error {err}</Text>
    });

    if(!data) return <Loading />;

    var mappedRates = Object.keys(data.rates).map((key, index) => {
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
            <RateFeed rates={mappedRates} navigation={props.navigation}
                currencyName={name}/>
        </View>
    );
};

export default CurrScreen;