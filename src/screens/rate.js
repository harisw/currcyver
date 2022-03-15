import React, { useEffect, useState } from "react";
import {StyleSheet, View, Text,
    TouchableOpacity, TextInput} from 'react-native';
import axios from 'axios';
import styled from "styled-components/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import fx from "money";

import Loading from "../components/Loading";
import RateChart from "../components/RateChart";

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

const StyledInput = styled.TextInput`
    border: 2px solid black;
    border-radius: 10px;
    font-size: 20px;
    padding: 5px;
    margin-bottom: 5px;
    flex: 1;
    background-color: white;
    width: 100%;
`;
const FormButton = styled.TouchableOpacity`
    background: #0077cc;
    border: 2px solid gray;
    padding: 0px;
    width: 50px;
`;

const FormLabel = styled.Text`
    font-size: 25px;
    font-weight: bold;
    display: flex;
    flex: 1;
    justify-content: center;
    padding-left: 15px;
    padding-top: 5px;
`;
const ButtonText = styled.Text`
    text-align: center;
    color: #fff;
    font-weight: bold;
    font-size: 18px;
`;

const RateScreen = props => {
    const [baseId, setBaseId] = useState(props.navigation.getParam('fromId'));
    const [toId , setToId] = useState(props.navigation.getParam('toId'));
    const [rate, setRate] = useState(props.navigation.getParam('toRate'));
    
    const [baseAmount, setBaseAmount] = useState(1);
    const [toAmount, setToAmount] = useState(rate);

    const setupFX = () => {
        fx.base = baseId;
        fx.rates = {
            [baseId]: 1,
            [toId]: rate
        };
    };
    useEffect(() => {
        setupFX();
        return () => {};
    }, []);

    const convertRate = _input => {
        if(_input.length == 0)  setToAmount(0);
        else {
            const result = fx(_input).from(baseId).to(toId);        
            setToAmount(result);
        }
        setBaseAmount(_input);
    };

    return (
        <RateView>
            <View style={{alignItems: 'center'}}>
            <HeaderText>1 {baseId} = {rate} {toId}</HeaderText>
            </View>
            <View style={{flexDirection: "row", margin: 10, height: '20%'}}>
                <View style={{flex: 8, flexDirection: "column", marginRight: 0}}>
                    <View style={{flex: 1, flexDirection: "row", marginBottom: 20}}>
                        <StyledInput value={baseAmount.toString()}
                        onChangeText={convertRate}
                        keyboardType="numeric"/>
                        <FormLabel>{baseId}</FormLabel>
                    </View>
                    <View style={{flex: 1, flexDirection: "row"}}>
                        <StyledInput editable={false} value={toAmount.toString()}/>
                        <FormLabel>{toId}</FormLabel>
                    </View>
                </View>
                <View style={{display: 'flex', flex: 2, justifyContent: 'center'}}>
                    <FormButton>
                        <MaterialCommunityIcons style={{}}
                        name="arrow-up-down-bold" size={50} color="black" />
                    </FormButton>
                </View>
            </View>
            <RateChart from={baseId} to={toId}/>
        </RateView>
    );
};

const styles = StyleSheet.create({
    rowFlexContainer: {
      flexDirection: "row",
    }
});
export default RateScreen;