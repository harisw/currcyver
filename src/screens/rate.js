import React, { useEffect, useState } from "react";
import {StyleSheet, View, Text,
    TouchableOpacity, TextInput} from 'react-native';
import axios from 'axios';
import Loading from "../components/Loading";
import styled from "styled-components/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import fx from "money";

const URL = "https://api.frankfurter.app/";

const RateView = styled.View`
    padding: 10px;
    background-color: #F0FFC2;
    height: 100%;
`;
const HeaderText = styled.Text`
    font-size: 20px;
    font-weight: bold;
`;

const StyledInput = styled.TextInput`
    border: 1px solid gray;
    font-size: 15px;
    padding: 5px;
    margin-bottom: 20px;
`;
const FormButton = styled.TouchableOpacity`
    background: #0077cc;
    width: 100%;
    padding: 8px;
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
            <HeaderText>1 {baseId} equals</HeaderText>
            <HeaderText>{rate} {toId}</HeaderText>
            <View style={{flexDirection: "row", margin: 10}}>
                <View style={{flex: 1, flexDirection: "row"}}>
                    <View style={{flex: 1, flexDirection: "column"}}>
                        <StyledInput value={baseAmount.toString()}
                        onChangeText={convertRate}
                        keyboardType="numeric"/>
                        <StyledInput editable={false} value={toAmount.toString()}/>
                    </View>
                    <View style={{flex: 1, flexDirection: "column"}}>
                        <Text>{baseId}</Text>
                        <Text>{toId}</Text>
                    </View>
                </View>
                <View style={{flex: 1}}>
                    <TouchableOpacity>
                        <MaterialCommunityIcons name="arrow-up-down-bold" size={50} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        </RateView>
    );
};

const styles = StyleSheet.create({
    rowFlexContainer: {
      flexDirection: "row",
    }
});
export default RateScreen;