
import React, { useState, useEffect } from 'react'
import { KeyboardAvoidingView, 
  Platform, 
  View, 
  TextInput, 
  StyleSheet, 
  Image, 
  Text, 
  AsyncStorage, 
  ActivityIndicator, 
  TouchableOpacity, 
  Alert 
} from 'react-native'
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import buffer from 'buffer';

import api from './../../services/api'

const _Login = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [geoLocation, setGeoLocation] = useState({
      latitude: null,
      longitude: null
    });
    const [city, setCity] = useState('');

    const canLogin = username.length > 0 && !loading

    useEffect(() => {
      if (Platform.OS === 'android' && !Constants.isDevice) {
        Alert.alert('Oops, this will not work on Sketch in an Android emulator. Try it on your device!');
      } else {
        _getLocationAsync();
      }
      _checkLogin();
    }, []);

    _checkLogin = async () => {
      AsyncStorage.getItem('user').then(user => {
        if(user){
          user = JSON.parse(user)
          navigation.setParams({ user: user })
          navigation.navigate('DevsList', { user, city })
        }
      })
    }

    _getLocationAsync = async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        Alert.alert("Permission to access location was denied");
      }

      let {coords: {latitude, longitude} } = await Location.getCurrentPositionAsync({});
      setGeoLocation({latitude, longitude});
    }

    useEffect(() => {
      Location.reverseGeocodeAsync(geoLocation).then(response => {
        setCity(response[0].city);
      });
    }, [geoLocation]);

    const handleLogin = () => {
        setLoading(true)

        let b = new buffer.Buffer(username + ':' + password);
        let encondedAuth = b.toString('base64');
        setLoading(true)
        api.get('/user', {
          headers: {
            'Authorization' : 'Basic ' + encondedAuth
          }
        })
          .then(({ data }) => {
                const user = data
                AsyncStorage.setItem('user', JSON.stringify(user)).then(() => {
                    navigation.setParams({ user: user })
                    navigation.navigate('DevsList', { user, city })
                })
            })
            .catch((error) => {
              Alert.alert('Não foi possível efetuar login! Tente novamente!');
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
                    secureTextEntry
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
