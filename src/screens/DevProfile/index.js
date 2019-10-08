import React, { useState, useEffect } from 'react'
import { View, FlatList, RefreshControl, Text } from 'react-native'
import Profile from '../../Components/Profile'
import Repository from '../../Components/Repository'
import api from '../../services/api'

export const DevProfile = ({ navigation }) => {
    const [repos, setRepos] = useState([])
    const [loading, setLoading] = useState(false)

    const user = navigation.getParam('user')

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
    }, [])

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
            />

        )
    }

    return (
        <View style={{ backgroundColor: '#191970', flex: 1 }}>
            <View>
                <FlatList
                    data={repos}
                    ListHeaderComponent={renderProfile}
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