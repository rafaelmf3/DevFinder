import React from 'react'
import { View } from 'react-native'

const _Login = ({ navigation }) => {
    navigation.push('DevsList')
    return (
        <View style={{ flex: 1, backgroundColor: 'red'}}>

        </View>
    )
}

_Login.navigationOptions = {
    header: null
}

export const Login = _Login