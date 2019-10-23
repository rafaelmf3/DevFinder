import React, { useState, useEffect } from 'react'
import {
  Platform,
  ActivityIndicator,
  TouchableOpacity,
  Alert
} from 'react-native'

import { Container, Form, Img, Input, Btn, BtnText } from './styles';
import UserService from '../../services/User.service';

const _Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const canLogin = username.length > 0 && !loading

  useEffect(() => {
    _checkLogin();
  }, []);

  _checkLogin = () => {
    UserService.getLoggedUser().then(user => {
      if (user) {
        navigation.navigate('DevsList', { user, city: user.location });
      }
    })
  }

  const handleLogin = () => {
    setLoading(true)

    UserService.login(username, password)
      .then((user) => {
        UserService.saveUser(user).then(() => {
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
    <Container enabled={Platform.OS === 'ios'} behavior="padding">
      <Form>
        <Img resizeMode={'contain'} source={require('./../../../assets/logo.png')} />
        <Input
          placeholder="Enter GitHub email or username"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={username}
          onChangeText={setUsername}
        />
        <Input
          placeholder="Enter password"
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
          value={password}
          onChangeText={setPassword}
          returnKeyType="send"
          onSubmitEditing={handleLogin}
        />
        <TouchableOpacity
          onPress={handleLogin}
          disabled={!canLogin}>
          <Btn
            style={[canLogin ? {} : { backgroundColor: '#35B' }]}
          >
            {
              loading ?
                <ActivityIndicator />
                :
                <BtnText>Login</BtnText>
            }
          </Btn>
        </TouchableOpacity>
      </Form>
    </Container>
  )
}

_Login.navigationOptions = {
  header: null
}

export default Login = _Login;
