import React, { useState, useEffect } from 'react'
import { View, FlatList, RefreshControl, AsyncStorage } from 'react-native'
import Profile from '../../Components/Profile'
import Repository from '../../Components/Repository'
import api from '../../services/api'
import DevService from '../../services/Dev.service'

export default DevProfile = ({ navigation }) => {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  const dev = navigation.getParam('dev')
  const user = navigation.getParam('user')

  const _getRepositories = () => {
    setLoading(true)
    DevService.getDevRepos(dev.login)
      .then(setRepos)
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    _getRepositories()
    checkFavorite()
  }, []);

  function checkFavorite() {
    AsyncStorage.getItem(`favorites:${user.login}`).then(favorites => {
      if (favorites) {
        favorites = JSON.parse(favorites);
        if (favorites.includes(dev.login))
          setIsFavorite(true)
      }
    })
  }

  function storeFavorites(isAdd) {
    if (isAdd) {
      AsyncStorage.getItem(`favorites:${user.login}`)
        .then(favorites => {
          console.log(favorites)
          if (favorites)
            favorites = JSON.parse(favorites);
          else
            favorites = []
          favorites.push(dev.login)
          AsyncStorage.setItem(`favorites:${user.login}`, JSON.stringify(favorites)).then(() => {
            setIsFavorite(true)
          });
        })
    } else {
      AsyncStorage.getItem(`favorites:${user.login}`)
        .then(favorites => {
          if (favorites) {
            favorites = JSON.parse(favorites);
            let newFavorites = favorites.filter(favorite => {
              return favorite != dev.login
            })
            AsyncStorage.setItem(`favorites:${user.login}`, JSON.stringify(newFavorites)).then(() => {
              setIsFavorite(false)
            });
          } else {
            AsyncStorage.setItem(`favorites:${user.login}`, JSON.stringify([]));
          }
        })
    }

  }

  const renderRepository = ({ item }) => {
    return (
      <Repository
        description={item.description}
        language={item.language}
        qtyStars={item.stargazers_count}
        title={item.name}
      />
    )
  }

  const renderProfile = () => {
    return (
      <Profile
        image={dev.avatar_url}
        name={dev.name}
        followers={dev.followers}
        username={dev.login}
        email={dev.email}
        bio={dev.bio}
        favorite={isFavorite}
        onPressFavorite={storeFavorites}
      />

    )
  }

  return (
    <View style={{ backgroundColor: '#191970', flex: 1 }}>
      <View>
        {renderProfile()}
        <FlatList
          data={repos}
          keyExtractor={item => item.node_id}
          // ListHeaderComponent={renderProfile}
          renderItem={renderRepository}
          //ListEmptyComponent={<Text>Não encontramos nenhum repositório!</Text>}
          refreshControl={
            <RefreshControl

              refreshing={loading}
              onRefresh={_getRepositories}
            />
          }
        />

      </View>
    </View>
  )
}
