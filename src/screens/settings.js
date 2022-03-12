import React, {useEffect, useState} from "react";
import {View, Text, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import styled from "styled-components/native";

import Loading from "../components/Loading";

const SettingsView = styled.View`
    padding: 10px;
`;
const StyledText = styled.Text`
    text-align: center;
    font-size: 18px;
`
const FormButton = styled.TouchableOpacity`
    background: #0077cc;
    width: 100%;
    padding: 8px;
    margin-bottom: 20px;
`;

const ButtonText = styled.Text`
    text-align: center;
    color: #fff;
    font-weight: bold;
    font-size: 18px;
`;
const Settings = props => {

    const [isLoggedIn, setLoggedIn] = useState('');
    const checkLoginState = async() => {
        const userToken = await SecureStore.getItemAsync('token');
        if(userToken){
            // const storedName = await SecureStore.getItemAsync('username'); 
            // setUsername(storedName);
            setLoggedIn(true);
        }
    };
    useEffect(() => {
        checkLoginState();
    })

    const signOut = () => {
        SecureStore.deleteItemAsync('token').then(
            props.navigation.navigate('Settings')
        );
    };

    if(!isLoggedIn) {
        return (
            <SettingsView>
                <StyledText>You are not Signed in yet</StyledText>
                <FormButton onPress={() => props.navigation.navigate('SignIn')}>
                    <ButtonText>Sign In</ButtonText>
                </FormButton>
                <FormButton onPress={() => props.navigation.navigate('SignUp')}>
                    <ButtonText>Sign Up</ButtonText>
                </FormButton>
            </SettingsView>
        )
    } else {
        return (
            <SettingsView>
                <StyledText>Welcome to settings page</StyledText>
                <FormButton onPress={signOut}>
                    <ButtonText>Sign Out</ButtonText>
                </FormButton>
            </SettingsView>
        );
    }
};

Settings.navigationOptions = {
    title: 'Account'
};

export default Settings;