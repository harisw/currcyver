import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// import screen components
// import Feed from './feed';
// import Favorites from './favorites';
// import MyNotes from './mynotes';
// import NoteScreen from './note';
import Home from './home';
import Account from './account';
import CurrScreen from './currency';
import RateScreen from './rate';

// const FeedStack = createStackNavigator({
//     Feed: Feed,
//     Note: NoteScreen
// });

// const MyStack = createStackNavigator({
//     MyNotes: MyNotes,
//     Note: NoteScreen
// });

// const FavStack = createStackNavigator({
//     Favorites: Favorites,
//     Note: NoteScreen
// });

const HomeStack = createStackNavigator({
    Home: Home,
    Currency: CurrScreen,
    Rate: RateScreen
});

const AccStack = createStackNavigator({
    Account: Account,
    Currency: CurrScreen
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
    AccScreen: {
        screen: AccStack,
        navigationOptions: {
            tabBarLabel: 'Account',
            tabBarIcon: ({ tintColor }) => (
                <MaterialCommunityIcons name="account" size={24} color={tintColor} />
            )
        }
    },
});

export default createAppContainer(TabNavigator);