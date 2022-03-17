import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components/native';
import fx from "money";
import accounting from 'accounting';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const StyledInput = styled.TextInput`
    border: 2px solid black;
    border-radius: 10px;
    font-size: 25px;
    padding: 5px;
    margin-bottom: 5px;
    flex: 1;
    background-color: white;
    width: 100%;
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

const FormButton = styled.TouchableOpacity`
    background: #0077cc;
    border: 2px solid gray;
    padding: 0px;
    width: 50px;
`;

const ConverterForm = props => {

    const [baseId, setBaseId] = useState(props.baseId);
    const [toId , setToId] = useState(props.toId);
    const [rate, setRate] = useState(props.rate);

    // const baseId = props.baseId;
    // const toId = props.toId;
    // const rate = props.rate;

    const [baseAmount, setBaseAmount] = useState(1);
    const [toAmount, setToAmount] = useState(props.rate);

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
    }, [rate]);
    const formatRate = convertedValue => {
        return accounting.formatMoney(convertedValue, {
            symbol: toId,
            format: "%v"
        });
    };

    const convertRate = _input => {
        if(_input.length == 0)  setToAmount(0);
        else {
            const result = fx(_input).from(baseId).to(toId);        
            setToAmount(result);
        }
        setBaseAmount(_input);
    };
    const swapRate = () => {
        const newRate = fx(1).from(toId).to(baseId);

        const temp = toId;
        setToId(baseId);
        setBaseId(toId);
        setRate(newRate);

        const tempAmount = toAmount;
        setToAmount(baseAmount);
        setBaseAmount(tempAmount);
        props.swapState(newRate);
    };

    return (
        <View style={{flexDirection: "row", margin: 10}}>
            <View style={{flex: 8, flexDirection: "column", marginRight: 0, height: 150}}>
                <View style={{flex: 1, flexDirection: "row", marginBottom: 20}}>
                    <StyledInput value={baseAmount.toString()}
                    onChangeText={convertRate}
                    keyboardType="numeric"/>
                    <FormLabel>{baseId}</FormLabel>
                </View>
                <View style={{flex: 1, flexDirection: "row"}}>
                    <StyledInput editable={false} value={formatRate(toAmount)}/>
                    <FormLabel>{toId}</FormLabel>
                </View>
            </View>
            <View style={{flex: 2}}>
                <FormButton onPress={swapRate}>
                    <MaterialCommunityIcons style={{}}
                    name="arrow-up-down-bold" size={50} color="black" />
                </FormButton>
            </View>
        </View>
    );
};

export default ConverterForm;