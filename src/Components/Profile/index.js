import React, { useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import StarButton from '../StarButton'
type ProfileProps = {
    name: String,
    username: String,
    followers: Number,
    email: String,
    bio: String,
    image: String,
    favorite: Boolean,
    onPressFavorite: Function
}
export default Profile = (props: ProfileProps) => {
    const {
        name,
        username,
        followers,
        email,
        bio,
        image,
        favorite,
        onPressFavorite,
    } = props


    return (
        <>
            <View style={Styles.line} />
            <View style={Styles.container}>
                <View style={Styles.containerInitProfile}>
{/* //o estado da estrela, depende do que esta no async storage, tem que fazer uma busca do login do Dev no array Favorites

// Ao clicar na estrela vazia, deve-se incluir o login do usuário do array de Favorites
// Ao clicar na estrela colorida, deve-se retirar o login do usuário do array de Favorites */}
                    <StarButton
                        status={favorite}
                        onPress={onPressFavorite}
                    />
                    <Image
                        style={Styles.imagePerfil}
                        resizeMode={'contain'}
                        source={{ uri: image }}
                    />
                    <View style={Styles.containerInitTextInfo}>
                        <Text style={Styles.text}>{name}</Text>
                        <Text style={Styles.text}>@{username}</Text>
                        <Text style={Styles.text}>Followers: {followers}</Text>
                    </View>
                </View>
                <View style={Styles.profileFooter}>
                    <Text style={Styles.text}>{email}</Text>
                    <Text style={Styles.text}>http://github.com/{username}</Text>
                    <Text numberOfLines={2} style={Styles.text}>Bio: {bio}</Text>
                </View>
            </View>
            <View style={Styles.line} />
        </>
    )
}

const Styles = StyleSheet.create({
    imagePerfil: {
        height: 70,
        width: 70,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 3
    },
    containerInitProfile: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    container: {
        paddingHorizontal: 20,
        marginVertical: 10,
        height: 150,
        alignItems: 'stretch',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    containerInitTextInfo: {
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    text: {
        color: 'white'
    },
    profileFooter: {
        height: 90,
        alignItems: 'center',
    },
    line: {
        height: 2,
        backgroundColor: 'grey',
        marginHorizontal: 40,
    }
})
