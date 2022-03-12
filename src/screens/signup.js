import React from "react";
import {View, Text, TouchableOpacity } from 'react-native';
import styled from "styled-components/native";
import { useMutation, gql } from "@apollo/client";
import * as SecureStore from 'expo-secure-store';

import Loading from "../components/Loading";
import AuthForm from "../components/AuthForm";

const SIGNUP_USER = gql`
    mutation signUp($email: String!, $username: String!, $password: String!) {
        signUp(email: $email, username: $username, password: $password)
    }
`;

const SignUpScreen = props => {

    const storeToken = token => {
        SecureStore.setItemAsync('token').then(
            props.navigation.navigate('Settings')
        );
    };

    const [signUp, {loading, error}] = useMutation(SIGNUP_USER, {
        onCompleted: data => {
            storeToken(data.signUp)
        }
    });

    if(loading) return <Loading />;

    return (
        <React.Fragment>
            {error && <Text>Error Signing Up!</Text> }
            <AuthForm action={signUp} 
                formType="signUp"
                navigation={props.navigation}/>
        </React.Fragment>
    );
};

SignUpScreen.navigationOptions = {
    title: 'Sign Up'
};
export default SignUpScreen;