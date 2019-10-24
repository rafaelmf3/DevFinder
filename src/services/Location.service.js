import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';


export default LocationService = {
  async getGeoLocation() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      Alert.alert("Permission to access location was denied");
    }

    let { coords } = await Location.getCurrentPositionAsync({});
    return coords
  },
  async getCityWithCoords(geoLocation) {
    const response = await Location.reverseGeocodeAsync(geoLocation)
    if (response[0] && response[0].city !== null) {
      return response[0].city
    } else {
      return null
    }
  }
}