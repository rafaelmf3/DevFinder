import React from 'react'

import {
  Container,
  InfoLeft,
  InfoRight,
  Txt,
  Line,
  Title,
  TxtRight
} from './styles'

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
      <Container>
        <InfoLeft>
          <Title>{title}</Title>
          <Txt numberOfLines={1}>{description}</Txt>
          <Txt>{language}</Txt>
        </InfoLeft>
        <InfoRight>
          <TxtRight>Stars: {qtyStars || 0}</TxtRight>
        </InfoRight>
      </Container>
      <Line />
    </>
  )
}


