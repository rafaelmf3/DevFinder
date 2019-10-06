import React from 'react';
import * as screens from './screens'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

console.log(screens)

const AppNavigator = createStackNavigator({
  ...screens
});

export default createAppContainer(AppNavigator);