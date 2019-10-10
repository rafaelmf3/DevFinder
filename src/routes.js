import React from 'react';
// import * as screens from './screens';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Header } from './Components/Header';
import Login from './screens/Login';
import DevsList from './screens/DevsList';
import DevProfile from './screens/DevProfile';

const Screens = createStackNavigator({
  DevsList,
  DevProfile
}, {
  defaultNavigationOptions: ({ navigation }) => {
    const user = navigation.getParam('user')
    const city = navigation.getParam('city');
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

const AppNavigator = createSwitchNavigator({
  Login,
  Screens
});

export default createAppContainer(AppNavigator);
