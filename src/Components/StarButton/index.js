import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

type StarButtonProps = {
    onPress: Function,
    size: Number,
    status: Boolean
}

export default StarButton = (props: StarButtonProps) => {
    const { onPress, status, size = 50 } = props
    const activeStar = require('./../../../assets/star2.png')
    const disabledStar = require('./../../../assets/star.png')
    return (
        <TouchableOpacity onPress={onPress}>
            <View>
                <Image style={{ height: size, width: size }} resizeMode={'contain'} source={status ? activeStar : disabledStar} />
            </View>
        </TouchableOpacity>
    )
}

