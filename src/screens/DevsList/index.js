import React, { useEffect, useState } from 'react'
import {
  View, Text, FlatList, ActivityIndicator, Platform, Alert,
  StyleSheet, AsyncStorage, SafeAreaView, Button
} from 'react-native'
// import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

import api from '../../services/api';

import Dev from '../../Components/Dev';
import Search from '../../Components/Search';
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
      //console.log(response.data.items)

      if (response.data.items.length === 0) {
        Alert.alert('Que vergonha, sua cidade não tem outros devs!!!');
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

    <View style={{ backgroundColor: '#191970', flex: 1 }}>

      <NavigationEvents onWillFocus={getFavorites} />
      <Search
        favoriteSearchStatus={lookingFavorites}
        onFavoriteSearch={(value) => { getFavorites(); setLookFavorites(value) }}
        textValue={search}
        onChangeText={setSearch}
      />
      <View style={{ flex: 1 }}>
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

      </View>
      <Button
        icon={
          <Icon
            name="arrow-right"
            size={10}
            color="white"
          />
        }
        style={Styles.btnLogout} title="Sair" type="clear"
        onPress={() => _handleLogOut()}
      />
    </View>

  )
}
const Styles = StyleSheet.create({
  btnLogout: {
    //width: 30
  },
})


