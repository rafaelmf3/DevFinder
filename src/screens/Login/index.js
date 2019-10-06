import React from 'react'
import { View, TextInput, StyleSheet, Image, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const _Login = ({ navigation }) => {

    return (
        <View style={Styles.container}>
            <View style={Styles.form}>
                <Image style={{ width: '100%', height: 200 }} resizeMode={'contain'} source={require('./../../../assets/logo.png')} />
                <TextInput
                    placeholder="Enter GitHub email or username"
                    style={Styles.textInput}
                />
                <TextInput
                    placeholder="Enter password"
                    style={Styles.textInput}
                />
                <TouchableOpacity
                    onPress={() => console.warn('apertou')}
                    disabled={{}}>
                    <View
                        style={Styles.button}
                    >
                        <Text style={Styles.textButton}>Login</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

_Login.navigationOptions = {
    header: null
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#191970'
    },
    form: {
        paddingHorizontal: 30
    },
    textInput: {
        backgroundColor: 'white',
        marginTop: 20,
        borderRadius: 10,
        height: 40,
        paddingLeft: 10
    },
    button: {
        backgroundColor: '#00BFFF',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: 20,
        borderRadius: 10,
        height: 40
    },
    textButton: {
        color: 'white'
    }
})


export const Login = _Login