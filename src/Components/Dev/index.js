import React from 'react';
import { View } from 'react-native';

export default function Dev({dev}) {
  return (
    <View>
      <Text>{dev.login}</Text>
    </View>
  );
}
