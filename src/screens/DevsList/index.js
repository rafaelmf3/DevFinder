import React, { useEffect, useState } from 'react'
import {
  FlatList, ActivityIndicator, Platform, Alert, AsyncStorage,
} from 'react-native';
import { MaterialIcons } from "@expo/vector-icons"

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

import api from '../../services/api';

import Dev from '../../Components/Dev';
import Search from '../../Components/Search';
import { Container, DevList, Txt, Touchable } from './styles'
import { NavigationEvents } from 'react-navigation';

export default DevsList = ({ navigation }) => {
  const [city, setCity] = useState();
  const [loading, setLoading] = useState(false);
  const [devs, setDevs] = useState([]);
  const [geoLocation, setGeoLocation] = useState();
  const [lookingFavorites, setLookFavorites] = useState(false);
  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState([])

  const user = navigation.getParam('user')

  useEffect(() => {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      Alert.alert('Oops, this will not work on Sketch in an Android emulator. Try it on your device!');
    } else {
      _getLocationAsync()
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    if (city != null) {
      loadDevs();
    }
  }, [city]);

  async function loadDevs() {

    if (city) {
      const cityForSearch = city.split(' ').join('-').replace(',', '')
      const response = await api.get('/search/users', {
        params: {
          q: `${search} location:${cityForSearch}`,
        },
        headers: {
          Accept: 'application/vnd.github.mercy-preview+json'
        }
      });

      setDevs(response.data.items);

      if (response.data.items.length === 0) {
        Alert.alert('Não foram encontrados devs!!!');
      }
      setLoading(false);
    } else {
      setCity(navigation.getParam('city'));
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
    if (geoLocation != null) {
      Location.reverseGeocodeAsync(geoLocation).then(response => {
        if (response[0] && response[0].city !== null) {
          setCity(response[0].city);
          navigation.setParams({ city: response[0].city });
        } else {
          setCity(navigation.getParam('city'));
        }

      });
    }
  }, [geoLocation]);

  _handleLogOut = () => {
    AsyncStorage.removeItem('user');
    navigation.navigate('Login')
  }


  onSearch = () => {
    setLoading(true)
    loadDevs()
  }

  getFavorites = () => {
    AsyncStorage.getItem(`favorites:${user.login}`).then(favoritesAsync => {
      if (favoritesAsync)
        setFavorites(favoritesAsync)
    })
  }

  return (

    <Container>
      <NavigationEvents onWillFocus={getFavorites} />
      <Search
        favoriteSearchStatus={lookingFavorites}
        onFavoriteSearch={(value) => { getFavorites(); setLookFavorites(value) }}
        textValue={search}
        onChangeText={setSearch}
      />
      <DevList>
        {
          loading
            ? <ActivityIndicator size="large" color="white" />
            : <FlatList
              data={devs}
              extraData={lookingFavorites}
              keyExtractor={item => String(item.login)}
              renderItem={({ item }) => {
                if (!lookingFavorites || favorites.includes(item.login))//melhor desempenho na refatoração
                  return <Dev dev={item} user={user} city={city} />
              }
              }
            />

        }

      </DevList>
      <Touchable onPress={() => _handleLogOut()}>
        <MaterialIcons name="arrow-back" size={32} color="white" ></MaterialIcons>
        <Txt>Logout</Txt>
      </Touchable>
    </Container>

  )
}


