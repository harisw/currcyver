import React from "react";
import {View, Text, TouchableOpacity } from 'react-native';
import styled from "styled-components/native";
import { useMutation, gql } from "@apollo/client";
import * as SecureStore from 'expo-secure-store';

import Loading from "../components/Loading";
import AuthForm from "../components/AuthForm";

const SIGNIN_USER = gql`
    mutation signIn($email: String, $password: String!) {
        signIn(email: $email, password: $password)
    }
`;
const SignInScreen = props => {

    const storeToken = token => {
        SecureStore.setItemAsync('token', token).then(
            props.navigation.navigate('Settings')
        );
    };

    const [signIn, {loading, error}] = useMutation(SIGNIN_USER, {
        onCompleted: data => {
            console.log(data.signIn);
            storeToken(data.signIn)
        }
    });

    if(loading) return <Loading />;
    return (
        <React.Fragment>
            {error && <Text>Error Signing In! {error.message}</Text> }
            <AuthForm action={signIn} 
                formType="signIn"
                navigation={props.navigation}/>
        </React.Fragment>
    );
};

SignInScreen.navigationOptions = {
    title: 'Sign In'
};
export default SignInScreen;