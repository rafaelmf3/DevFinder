import React from 'react'
import StarButton from '../StarButton'

import {
  Line,
  Container,
  ContainerProfile,
  ImgPerfil,
  ContainerInfo,
  FooterProfile,
  Txt
} from './styles'

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
      <Line />
      <Container>
        <ContainerProfile>

          <StarButton
            status={favorite}
            onPress={onPressFavorite}
          />
          <ImgPerfil
            resizeMode={'contain'}
            source={{ uri: image }}
          />
          <ContainerInfo>
            <Txt>{name}</Txt>
            <Txt>@{username}</Txt>
            <Txt>Followers: {followers}</Txt>
          </ContainerInfo>
        </ContainerProfile>
        <FooterProfile>
          <Txt>{email}</Txt>
          <Txt>http://github.com/{username}</Txt>
          <Txt numberOfLines={2}>Bio: {bio}</Txt>
        </FooterProfile>
      </Container>
      <Line />
    </>
  )
}

