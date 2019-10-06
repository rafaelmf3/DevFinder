import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

type HeaderProps = {
    image: String,
    city: String,
}

export const Header = (props: HeaderProps) => {
    const { image = "https://img.olhardigital.com.br/uploads/acervo_imagens/2014/12/r16x9/20141204130826_1200_675_-_perfil_facebook.jpg", city } = props
    return (
        <View style={Styles.container}>
            <Image style={Styles.imagePerfil} source={{ uri: image }} />
            <Text style={Styles.textLocation}>{city ? city : "Não Encontrado"}</Text>
            <Image style={Styles.imageLogo} resizeMode={'contain'} source={require('./../../../assets/logo.png')} />
        </View>
    )
}

const Styles = StyleSheet.create({
    container: { 
        paddingTop: 30, 
        paddingBottom: 10,
        paddingHorizontal: 10,
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        backgroundColor: '#191970' 
    },
    imagePerfil: { 
        width: 50, 
        height: 50, 
        borderRadius: 50/2 
    },
    imageLogo: { 
        height: 50, 
        width: 60 
    },
    textLocation: {
        color: 'white'
    }
})