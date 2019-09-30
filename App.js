import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import logo from './assets/logo.png'

export default function App() {
  return (
    <View style={styles.container}>
      <Image source={logo} style={{width: 250, height: 70}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
