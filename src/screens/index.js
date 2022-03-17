import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Home from './home';
import Alarm from './alarm';
import CurrScreen from './currency';
import RateScreen from './rate';
import SignUp from './signup';
import SignIn from './signin';
import Settings from './settings';

const HomeStack = createStackNavigator({
    Home: Home,
    Currency: CurrScreen,
    Rate: RateScreen
});

const AlarmStack = createStackNavigator({
    Alarm: Alarm
});

const SettingsStack = createStackNavigator({
    Settings: Settings,
    SignIn: SignIn,
    SignUp: SignUp
});

const TabNavigator = createBottomTabNavigator({
    HomeScreen: {
        screen: HomeStack,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: ({ tintColor }) => (
                <MaterialCommunityIcons name="home" size={24} color={tintColor} />
            )
        }
    },
    AlarmScreen: {
        screen: AlarmStack,
        navigationOptions: {
            tabBarLabel: 'Alarm',
            tabBarIcon: ({ tintColor }) => (
                <MaterialCommunityIcons name="bell-alert" size={24} color={tintColor} />
            )
        }
    },
    SettingsScreen: {
        screen: SettingsStack,
        navigationOptions: {
            tabBarLabel: 'Account',
            tabBarIcon: ({ tintColor }) => (
                <MaterialCommunityIcons name="cog" size={24} color={tintColor} />
            )
        }
    },
});

export default createAppContainer(TabNavigator);