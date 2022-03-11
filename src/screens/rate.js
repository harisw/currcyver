import React from "react";
import {View, Text} from 'react-native';

const RateScreen = props => {
    const id = props.navigation.getParam('id');
    return (
        <View>
            <Text>This is {id} rate screen</Text>
        </View>
    );
};

export default RateScreen;