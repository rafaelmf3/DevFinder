import React, { useEffect, useState } from 'react'
import {
  FlatList, ActivityIndicator, Platform, Alert, AsyncStorage,
} from 'react-native';
import { MaterialIcons } from "@expo/vector-icons"
import Constants from 'expo-constants';
import Dev from '../../Components/Dev';
import Search from '../../Components/Search';
import { Container, DevList, Txt, Touchable } from './styles'
import { NavigationEvents } from 'react-navigation';
import DevService from '../../services/Dev.service';
import LocationService from '../../services/Location.service';
import FavoriteService from '../../services/Favorite.service';

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
      const devs = await DevService.getDevsWithFilter(search, city)

      if (devs == []) {
        Alert.alert('Não encontrou nenhum dev');
      }
      setDevs(devs);

      if (devs.length === 0) {
        Alert.alert('Não foram encontrados devs!!!');
      }
      setLoading(false);
    } else {
      setCity(navigation.getParam('city'));
    }
  }

  _getLocationAsync = async () => {
    let coords = await LocationService.getGeoLocation()
    setGeoLocation(coords);
  }

  useEffect(() => {
    if (geoLocation != null) {
      LocationService.getCityWithCoords(geoLocation).then(city => {
        if(city){
          setCity(response[0].city);
          navigation.setParams({ city: response[0].city });
        }else{
          setCity(navigation.getParam('city'));
        }
      })
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
    FavoriteService.getFavorites(user.login).then(favoritesAsync => {
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


