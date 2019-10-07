import React from 'react';
import * as screens from './screens';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Header } from './Components/Header';

const AppNavigator = createStackNavigator({
    ...screens
}, {
    defaultNavigationOptions: ({ navigation }) => {
        const user = navigation.getParam('user')
        const city = navigation.getParam('city');
        console.log(city);
        console.log(user)
        if (!user)
            return {
                header: null
            }
        return {
            header: (
                <Header image={user.avatar_url} city={city} />
            )
        }
    }

});

export default createAppContainer(AppNavigator);
