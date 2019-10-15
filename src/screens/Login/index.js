import React, { useState, useEffect } from 'react'
import {
  KeyboardAvoidingView,
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

import buffer from 'buffer';

import api from './../../services/api'

const _Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const canLogin = username.length > 0 && !loading

  useEffect(() => {

    _checkLogin();
  }, []);

  _checkLogin = () => {

    AsyncStorage.getItem('user').then(user => {
      if (user) {
        user = JSON.parse(user);
        navigation.navigate('DevsList', { user, city: user.location });
      }
    })
  }

  const handleLogin = () => {
    setLoading(true)

    let b = new buffer.Buffer(username + ':' + password);
    let encondedAuth = b.toString('base64');
    setLoading(true)
    api.get('/user', {
      headers: {
        'Authorization': 'Basic ' + encondedAuth
      }
    })
      .then(({ data }) => {
        const user = data
        AsyncStorage.setItem('user', JSON.stringify(user)).then(() => {
          navigation.setParams({ user: user })
          navigation.navigate('DevsList', { user, city: user.location });
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
          style={Styles.textInput}
          placeholder="Enter GitHub email or username"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={Styles.textInput}
          placeholder="Enter password"
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={handleLogin}
          disabled={!canLogin}>
          <View
            style={[Styles.button, canLogin ? {} : { backgroundColor: '#35B' }]}
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


export default Login = _Login;
