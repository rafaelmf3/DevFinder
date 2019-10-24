import { AsyncStorage } from "react-native";


export default FavoriteService = {
  async checkFavorite(LoggedUserLogin, devToCheck) {
    let favorites = await AsyncStorage.getItem(`favorites:${LoggedUserLogin}`)
    if (favorites) {
      favorites = JSON.parse(favorites);
      if (favorites.includes(devToCheck))
        return true
    }
    return false
  },
  async getFavorites(LoggedUserLogin) {
    return await AsyncStorage.getItem(`favorites:${LoggedUserLogin}`)
  },
  async addFavorite(LoggedUserLogin, devToCheck) {
    try {
      let favorites = await AsyncStorage.getItem(`favorites:${LoggedUserLogin}`)
      if (favorites)
        favorites = JSON.parse(favorites);
      else
        favorites = []
      favorites.push(devToCheck)
      await AsyncStorage.setItem(`favorites:${LoggedUserLogin}`, JSON.stringify(favorites))
      return true
    } catch (error) {
      return false
    }

  },
  async removeFavorite(LoggedUserLogin, devToCheck) {
    try {
      let favorites = await AsyncStorage.getItem(`favorites:${LoggedUserLogin}`)

      if (favorites) {
        favorites = JSON.parse(favorites);
        let newFavorites = favorites.filter(favorite => {
          return favorite != devToCheck
        })
        await AsyncStorage.setItem(`favorites:${LoggedUserLogin}`, JSON.stringify(newFavorites))

        return true
      } else {
        await AsyncStorage.setItem(`favorites:${LoggedUserLogin}`, JSON.stringify([]))

        return true
      }
    } catch (error) {
      return false
    }

  }
}