import React, { useState } from 'react'
import { KeyboardAvoidingView, Platform, View, TextInput, StyleSheet, Image, Text, AsyncStorage, ActivityIndicator } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import api from './../../services/api'

const _Login = ({ navigation }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const canLogin = username.length > 0 && !loading
    const handleLogin = () => {
        setLoading(true)
        api.get(`users/${username}`)
            .then(({ data }) => {
                const user = data
                AsyncStorage.setItem('user', JSON.stringify(user)).then(() => {
                    navigation.setParams({ user: user })
                    navigation.navigate('DevsList', { user })
                })
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior="padding" style={Styles.container}>
            <View style={Styles.form}>
                <Image style={Styles.logo} resizeMode={'contain'} source={require('./../../../assets/logo.png')} />
                <TextInput
                    placeholder="Enter GitHub email or username"
                    style={Styles.textInput}
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    placeholder="Enter password"
                    style={Styles.textInput}
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity
                    onPress={handleLogin}
                    disabled={!canLogin}>
                    <View
                        style={[Styles.button, canLogin ? {} : { backgroundColor: '#ADD8E6' }]}
                    >
                        {
                            loading ?
                                <ActivityIndicator />
                                :
                                <Text style={Styles.textButton}>Login</Text>
                        }
                    </View>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

_Login.navigationOptions = {
    header: null
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#191970'
    },
    form: {
        paddingHorizontal: 30
    },
    logo: {
        width: '100%',
        height: 200
    },
    textInput: {
        backgroundColor: 'white',
        marginTop: 20,
        borderRadius: 10,
        height: 40,
        paddingLeft: 10
    },
    button: {
        backgroundColor: '#00BFFF',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: 20,
        borderRadius: 10,
        height: 40
    },
    textButton: {
        color: 'white'
    }
})


export const Login = _Login
