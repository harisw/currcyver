import React, {useEffect, useState} from "react";
import {Text, View, TouchableOpacity} from 'react-native';
import styled from "styled-components/native";
import ax from '../../config/axios';
import RNPickerSelect from 'react-native-picker-select';
import Loading from "../components/Loading";
import { query_insertAlarm, query_getAllAlarm, query_deleteAllAlarm } from "../query";

const HeaderText = styled.Text`
    font-size: 20px;
    font-weight: bold;
`;
const AlarmView = styled.View`
    padding: 10px;
    height: 100%;
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
const StyledInput = styled.TextInput`
    border: 2px solid black;
    border-radius: 10px;
    font-size: 20px;
    padding: 5px;
    margin-bottom: 5px;
    margin-top: 15px;
    background-color: white;
    width: 100px;
`;
const FormButton = styled.TouchableOpacity`
    background: #0077cc;
    width: 100%;
    padding: 8px;
    margin: 5px;
    justify-content: center;
    border-radius: 20px;
`;

const ButtonText = styled.Text`
    justify-content: center;
    text-align: center;
    color: #fff;
    font-weight: bold;
    font-size: 18px;
`;
const AlarmScreen = props => {
    const [currencies, setCurrencies] = useState();
    const [error, setError] = useState(false);

    const [baseCurrency, setBaseCurrency] = useState();
    const [targetCurrency, setTargetCurrency] = useState();
    const [targetValue, setTargetValue] = useState();

    const [alarms, setAlarms] = useState();

    const getCurrencies = () => {
        ax.get("currencies").then(data => {
            const mappedResult = Object.keys(data.data).map((key, index) => {
                return {
                    label: `(${key}) ${data.data[key]}`,
                    key: key,
                    value: key,
                };
            });
            
            setCurrencies(mappedResult);
        }).catch(err => {
            setError(err);
        });
    }

    useEffect(() => {
        getCurrencies();
        
        return () => {};
    }, []);

    const getAlarm = () => {
        query_getAllAlarm()
        .then(res => {setAlarms(res); console.log(res)})
        .catch(err => console.log(err));
    }
    const insertAlarm = () => {
        const res = query_insertAlarm(baseCurrency, targetCurrency, targetValue);
        getAlarm();
    };
    const resetAlarm = () => {
        query_deleteAllAlarm();
        getAlarm();
    };

    if(error)   return <View><Text>Error {error}</Text></View>;
    if(!currencies) return <Loading />;

    return (
        <AlarmView>
            <HeaderText>Here is Alarm Screen</HeaderText>
            <Text>You can set an alarm if any of the currency meets an entered value</Text>
            <View style={{flexDirection: 'row', display: 'flex', justifyContent: 'center'}}>
                <View style={{flex: 4}}>
                    <RNPickerSelect
                        useNativeAndroidPickerStyle={false}
                        style={{inputAndroid:{color: 'black',
                        borderWidth: 2, borderRadius: 10, backgroundColor: 'gray'}}}
                        onValueChange={(v) => setBaseCurrency(v)}
                        items={currencies}
                    />
                    <StyledInput style={{marginLeft:'auto'}}
                    editable={false} value="1"/>
                </View>
                <FormLabel style={{flex: 1, marginTop: 'auto', marginBottom: 'auto'}}>=</FormLabel>
                <View style={{flex: 4}}>
                    <RNPickerSelect
                        useNativeAndroidPickerStyle={false}
                        style={{inputAndroid:{color: 'black'}}}
                        onValueChange={(v) => setTargetCurrency(v)}
                        items={currencies}
                    />
                    <StyledInput onChangeText={text => setTargetValue(text)}
                    keyboardType="numeric"/>
                </View>
                
            </View>
            <View style={{flexDirection: 'row'}}>
                <FormButton style={{flex: 3}}>
                    <ButtonText onPress={insertAlarm}>
                        Turn Off
                    </ButtonText>
                </FormButton>
                <FormButton style={{flex: 5}}>
                    <ButtonText onPress={insertAlarm}>
                        Set Alarm
                    </ButtonText>
                </FormButton>
            </View>
            <FormButton>
                <ButtonText onPress={insertAlarm}>
                    + Add More Alarm
                </ButtonText>
            </FormButton>
            <View>
                <ButtonText onPress={resetAlarm}>
                    Reset/Empty Alarm
                </ButtonText>
            </View>
        </AlarmView>
    );
};

export default AlarmScreen;