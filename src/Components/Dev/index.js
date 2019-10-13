import React from 'react';
import { withNavigation } from 'react-navigation';
import { View, TouchableOpacity, Text } from 'react-native';

function Dev({ dev, navigation, user, city }) {
  function handleDevProfile() {
    // const user = dev;
    // console.log(user);
    // navigation.getParam('user', user);
    navigation.navigate('DevProfile', { dev, user, city });
  }

  return (
    <View>
      <TouchableOpacity onPress={handleDevProfile}>
        <Text style={{ fontSize: 20, margin: 20 }}>{dev.login}</Text>
      </TouchableOpacity>
    </View>

  );
}

export default withNavigation(Dev);
