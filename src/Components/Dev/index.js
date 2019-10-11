import React, { useState, useEffect } from 'react';
import { withNavigation } from 'react-navigation';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import api from '../../services/api';

function Dev({dev, navigation, user, city}) {
  const [devs,setDevs] = useState([]);

  // useEffect(() => {
  //   devSearchInfo();
  // }, []);

  // async function devSearchInfo() {
  //   const devInfo = await api.get(`/users/${dev.login}`);

  //   setDevs(devInfo);

  // }

  function handleDevProfile() {
    navigation.navigate('DevProfile', { dev, user, city });
  }
  console.log(dev);


  return (
    <View>
      <TouchableOpacity onPress={handleDevProfile} >
        <Image source={{uri: dev.avatar_url}} style={{height: 50, width: 50, borderRadius: 4, marginLeft: 15}} />
        <Text style={{fontSize: 20, margin: 20}}>@{dev.login}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default withNavigation(Dev);
