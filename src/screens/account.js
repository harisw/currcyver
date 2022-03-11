import React from "react";
import {View, Text} from 'react-native';

import Loading from "../components/Loading";

const Account = props => {

    return (
        <View>
            <Text>This is Account page</Text>
        </View>
    );
};

Account.navigationOptions = {
    title: 'Account'
};

export default Account;