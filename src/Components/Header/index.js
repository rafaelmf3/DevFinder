import React from 'react'

import { Container, ImgPerfil, TxtLocation, ImgLogo } from './styles';


type HeaderProps = {
  image: String,
  city: String,
}

export const Header = (props: HeaderProps) => {
  const { image = "https://img.olhardigital.com.br/uploads/acervo_imagens/2014/12/r16x9/20141204130826_1200_675_-_perfil_facebook.jpg", city } = props
  return (
    <Container>
      <ImgPerfil source={{ uri: image }} />
      <TxtLocation >{city ? city : "Não Encontrado"}</TxtLocation>
      <ImgLogo resizeMode={'contain'} source={require('./../../../assets/logo.png')} />
    </Container>
  )
}

