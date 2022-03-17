import React, { useEffect, useState } from "react";
import {StyleSheet, View, Text} from 'react-native';
//import axios from 'axios';
import fx from "money";
import styled from "styled-components/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import accounting from "accounting";

// import Loading from "../components/Loading";
// import RateChart from "../components/RateChart";
import ConverterForm from "../components/ConverterForm";

const URL = "https://api.frankfurter.app/";

const RateView = styled.View`
    padding: 10px;
    background-color: #F0FFC2;
    height: 100%;
`;
const HeaderText = styled.Text`
    font-size: 35px;
    font-weight: bold;
`;

const ButtonText = styled.Text`
    text-align: center;
    color: #fff;
    font-weight: bold;
    font-size: 18px;
`;

const RateScreen = props => {
    const [baseValue, setBaseValue] = useState(props.navigation.getParam('fromId'));
    const [toValue , setToValue] = useState(props.navigation.getParam('toId'));
    const [rate, setRate] = useState(props.navigation.getParam('toRate'));
    
    // const setupFX = () => {
    //     fx.base = baseId;
    //     fx.rates = {
    //         [baseId]: 1,
    //         [toId]: rate
    //     };
    // };
    // useEffect(() => {
    //     setupFX();
    //     return () => {};
    // }, [rate]);

    const swapState = (newRate) => {
        const currentTo = toValue;
        setToValue(baseValue);
        setBaseValue(currentTo);
        setRate(newRate);
    }
    const formatRate = convertedValue => {
        return accounting.formatMoney(convertedValue, {
            symbol: toValue,
            format: "%v"
        });
    };

    return (
        <RateView>
            <View style={{alignItems: 'center'}}>
                <HeaderText>1 {baseValue} = {formatRate(rate)} {toValue}</HeaderText>
            </View>
            <ConverterForm baseId={baseValue} toId={toValue} rate={rate}
                swapState={swapState}/>
            {/* <View style={{flexDirection: "row", margin: 10}}>
            
            </View> */}
        </RateView>
    );
};

const styles = StyleSheet.create({
    rowFlexContainer: {
      flexDirection: "row",
    }
});
export default RateScreen;