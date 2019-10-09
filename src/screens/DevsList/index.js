import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, ActivityIndicator } from 'react-native'

import api from '../../services/api';

import Dev from '../../Components/Dev';

export const DevsList = ({navigation}) => {
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [devs, setDevs] = useState([]);

  useEffect(() => {

    setLoading(true);
    // console.log(city);
    async function loadDevs() {
      const cidade = navigation.getParam('city');
      // console.log(cidade);
      const response = await api.get('/search/users', {
        params: {
          q: `location:${cidade}`,
        },
        headers: {
          Accept: 'application/vnd.github.mercy-preview+json'
        }
      });
      setDevs(response.data.items);
      console.log(response.data.items);
      setLoading(false);
    }
    loadDevs();
  }, []);

  return (
    <View style={{backgroundColor: '#191970' , flex: 1}}>
      {
        loading
        ? <ActivityIndicator size="large" color="white" />
        : <FlatList
            data={devs}
            keyExtractor={item => String(devs.id)}
            renderItem={({ item }) => (
              <Dev dev={item} />
            )}
          />

      }


    </View>

  )
}
