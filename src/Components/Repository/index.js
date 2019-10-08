import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import StarButton from '../StarButton'
type RepositoryProps = {
    title: String,
    description: String,
    qtyStars: Number,
    language: String,
}
export default Repository = (props: RepositoryProps) => {

    const {
        title,
        description,
        qtyStars,
        language,
    } = props

    return (
        <>
            <View style={Styles.container}>
                <View style={Styles.infoLeft}>
                    <Text style={[Styles.text, Styles.title]}>{title}</Text>
                    <Text numberOfLines={1} style={Styles.text}>{description}</Text>
                    <Text style={Styles.text}>{language}</Text>
                </View>
                <View style={Styles.infoRight}>
                    <Text style={[Styles.text, Styles.rightText]}>Stars: { qtyStars || 0 }</Text>
                </View>
            </View>
            <View style={Styles.line} />
        </>
    )
}

const Styles = StyleSheet.create({
    container: {
        paddingHorizontal: 41,
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
    },
    infoLeft: {
        flex: 1
    },
    infoRight: {
        flex: 1
    },
    line: {
        height: 2,
        backgroundColor: 'grey',
        marginHorizontal: 40,
    },
    title: {
        fontWeight: 'bold'
    },
    text: {
        color: 'white'
    },
    rightText: {
        textAlign: 'right'
    }
})