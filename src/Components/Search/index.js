import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import StarButton from '../StarButton'
import { Star, Find, Input } from './styles'

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
    <Star>
      <StarButton
        status={favoriteSearchStatus}
        onPress={onFavoriteSearch}
      />
      <Find>
        <MaterialIcons name="search" size={25} color="grey" />
        <Input
          placeholder='Search'
          placeholderTextColor='grey'
          value={textValue}
          onBlur={onSearch}
          onChangeText={onChangeText}
        />
      </Find>
    </Star>
  )
}
