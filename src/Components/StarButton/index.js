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
    // const activeStar = require('./../../../assets/star2.png')
    // const disabledStar = require('./../../../assets/star.png')
  return (
    <TouchableOpacity onPress={onPress}>
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

