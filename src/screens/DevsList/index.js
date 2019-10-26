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
  const [refreshing, setRefreshing] = useState(false);
  const [geoLocation, setGeoLocation] = useState();
  const [lookingFavorites, setLookFavorites] = useState(false);
  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [feed, setFeed] = useState([]);
  const perPage = 10;

  const user = navigation.getParam('user')

  useEffect(() => {
    if (loading) return;
    setLoading(true);

    if (Platform.OS === 'android' && !Constants.isDevice) {
      Alert.alert('Oops, this will not work on Sketch in an Android emulator. Try it on your device!');
    } else {
      _getLocationAsync()
    }
  }, []);

  useEffect(() => {
    if (city != null) {
      loadDevs();
    }
  }, [city]);

  async function loadDevs(pageNumber = page, shouldRefresh = false) {
    if (pageNumber === total) return;


    if (city) {
      const response = await DevService.getDevsWithFilter(search, city, page, perPage)

      if (response.total_count === 0) {
        Alert.alert('Não encontrou nenhum dev');
      }
      const totalItens = await response.total_count;
      const data = await response.items;

      setLoading(false);
      //setDevs(response.items);
      setTotal(Math.floor(totalItens / 10));
      setPage(pageNumber + 1);

      setFeed(shouldRefresh ? data : [...feed, ...data]);
    } else {
      setCity(navigation.getParam('city'));
    }
  }

  async function refreshList() {
    setRefreshing(true);

    await loadDevs(1, true);

    setRefreshing(false);
  }

  _getLocationAsync = async () => {
    let coords = await LocationService.getGeoLocation()
    setGeoLocation(coords);
  }

  useEffect(() => {
    if (geoLocation != null) {
      LocationService.getCityWithCoords(geoLocation).then(city => {
        if(city){
          setCity(city);
          navigation.setParams({ city });
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
              data={feed}
              extraData={lookingFavorites}
              keyExtractor={item => String(item.login)}
              onRefresh={refreshList}
              refreshing={refreshing}
              showsVerticalScrollIndicator={false}
              onEndReachedThreshold={0.1}
              onEndReached={() => loadDevs()}
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


