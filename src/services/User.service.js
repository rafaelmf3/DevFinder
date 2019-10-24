import api from "./api";
import buffer from 'buffer';
import { AsyncStorage } from "react-native";


export default UserService = {
  async login(username, password) {
    let b = new buffer.Buffer(username + ':' + password);
    let encondedAuth = b.toString('base64');
    const { data } = await api.get('/user', {
      headers: {
        'Authorization': 'Basic ' + encondedAuth
      }
    })

    return data
  },
  async saveUser(user) {
    if (user) {
      await AsyncStorage.setItem('user', JSON.stringify(user))
      return user
    } else {
      throw new Error("Usuário inválido!")
    }
  },
  async getLoggedUser() {
    try {
      const user = await AsyncStorage.getItem('user')
      return JSON.parse(user);
    } catch (error) {
      return null
    }
  }
}