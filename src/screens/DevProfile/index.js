import React, { useState, useEffect } from 'react'
import { View, FlatList, RefreshControl, Text, AsyncStorage } from 'react-native'
import Profile from '../../Components/Profile'
import Repository from '../../Components/Repository'
import api from '../../services/api'

export default DevProfile = ({ navigation}) => {
    const [repos, setRepos] = useState([])
    const [loading, setLoading] = useState(false)

    // console.log('teste', navigation.state);
    const user = navigation.getParam('dev')
    // console.log(user);
    const _getRepositories = () => {
        setLoading(true)
        api.get(`/users/${user.login}/repos`)
            .then(({ data }) => {
                const repos = data
                setRepos(repos)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        _getRepositories()
    }, []);

    function storeFavorites() {

      var favorites = AsyncStorage.getItem('favorites');
      console.log(favorites);
      AsyncStorage.setItem('favorites', favorites += JSON.stringify(user.login));

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
                image={user.avatar_url}
                name={user.name}
                followers={user.followers}
                username={user.login}
                email={user.email}
                bio={user.bio}
                onPressFavorite={() => storeFavorites}
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
