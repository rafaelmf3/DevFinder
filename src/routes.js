import React from 'react';
import { View, Text } from 'react-native'
import * as screens from './screens'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Header } from './Components/Header';

const AppNavigator = createStackNavigator({
    ...screens
}, {
    defaultNavigationOptions: ({ navigation }) => {
        const user = navigation.getParam('user')
        console.log(user)
        if (!user)
            return {
                header: null
            }
        return {
            header: (
                <Header image={user.avatar_url} city={user.location} />
            )
        }
    }

});

export default createAppContainer(AppNavigator);
