// @flow

import React from 'react'
import styled from 'styled-components'
import { textWhite } from 'src/colors'

export const Title = styled.Text`
  color: ${textWhite};
  text-align: center;
  font-size: 18px;
`
export const Welcome = styled.Text`
  color: ${textWhite};
  text-align: center;
  font-size: 14px;
  margin-bottom: 10px;
`
const TransitionButtonWrap = styled.TouchableOpacity`
  margin: 30px 30px 50px;
`

const TransitionButtonText = styled.Text`
  text-align: center;
  font-size: 12px;
  color: ${textWhite};
`

type Props = {
  title: string,
}

export const TransitionButton = (props: Props) => (
  <TransitionButtonWrap { ...props }>
    <TransitionButtonText>{props.title}</TransitionButtonText>
  </TransitionButtonWrap>
)
