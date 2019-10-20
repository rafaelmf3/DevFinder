import React from 'react'
import { View, TextInput } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import StarButton from '../StarButton'

type SearchProps = {
    favoriteSearchStatus: Boolean,
    onFavoriteSearch: Function,
    textValue: String,
    onChangeText: Function,
    onSearch: Function
}

export default Search = (props: SearchProps) => {
    const {
        favoriteSearchStatus,
        onFavoriteSearch,
        textValue,
        onChangeText,
    } = props
    return (
        <View style={{ flexDirection: 'row', paddingHorizontal: 10, paddingBottom: 20 }}>
            <StarButton
                status={favoriteSearchStatus}
                onPress={onFavoriteSearch}
            />
            <View style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#2d2d5d',
                borderRadius: 13,
                paddingLeft: 10
            }}>
                <MaterialIcons name="search" size={25} color="grey" />
                <TextInput
                    style={{ width: '100%', height: 40, color: 'white' }}
                    placeholder='Search'
                    placeholderTextColor='grey'
                    value={textValue}
                    onBlur={onSearch}
                    onChangeText={onChangeText}
                />
            </View>
        </View>
    )
}
