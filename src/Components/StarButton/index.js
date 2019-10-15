import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';

type StarButtonProps = {
    onPress: Function, // ADICIONAR A RECEPÇÃO DO STATUS ATUAL
    size: Number,
    status: Boolean
}

export default StarButton = (props: StarButtonProps) => {
  const { onPress, status, size = 50 } = props

  return (
    <TouchableOpacity onPress={() => onPress(!status)}>
      <View>
        {
          status
          ? <MaterialIcons name="star" size={size} color="yellow"></MaterialIcons>
          : <MaterialIcons name="star-border" size={size} color="yellow"></MaterialIcons>
        }
      </View>
    </TouchableOpacity>
  )
}

