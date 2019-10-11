import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, ActivityIndicator, Platform } from 'react-native'

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

import api from '../../services/api';

import Dev from '../../Components/Dev';

export default DevsList = ({ navigation }) => {
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [devs, setDevs] = useState([]);
  const [geoLocation, setGeoLocation] = useState({
    latitude: 0,
    longitude: 0
  });

  useEffect(() => {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      Alert.alert('Oops, this will not work on Sketch in an Android emulator. Try it on your device!');
    } else {
      _getLocationAsync()
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    loadDevs();
  }, [city]);

  async function loadDevs() {
    if (city) {
      const response = await api.get('/search/users', {
        params: {
          q: `location:${city}`,
        },
        // headers: {
        //   Accept: 'application/vnd.github.mercy-preview+json'
        // }
      });

      if (response.data.items == []) {
        Alert.alert('Não encontrou nenhum dev');
      }
      setDevs(response.data.items);
      setLoading(false);
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      Alert.alert("Permission to access location was denied");
    }

    let { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});
    setGeoLocation({ latitude, longitude });
  }

  useEffect(() => {
    Location.reverseGeocodeAsync(geoLocation).then(response => {
      setCity(response[0].city);
      navigation.setParams({city: response[0].city});
    });
  }, [geoLocation]);

  return (
    <View style={{ backgroundColor: '#191970', flex: 1 }}>
      {
        loading
          ? <ActivityIndicator size="large" color="white" />
          : <FlatList
            data={devs}
            keyExtractor={item => String(item.login)}
            renderItem={({ item }) => (
              <Dev dev={item} user={navigation.getParam('user')} city={city}/>
            )}
          />

      }


    </View>

  )
}
