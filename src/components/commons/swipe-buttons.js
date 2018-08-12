import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styled from 'styled-components'

// constants
import { textWhite } from 'src/colors'

export const SwipedButton = styled.TouchableHighlight`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  background-color: ${props => props.color};
  padding: 0 10px;
`

export const SwipeButtonInnerView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const SwipeButtonInnerText = styled.Text`
  color: ${textWhite};
  font-size: 16px;
`

const iconStyle = { color: textWhite, padding: 2 }

export const createRightButtons = deleteTask => [
  <SwipedButton key={ '2' } color={ 'red' } onPress={ deleteTask }>
    <SwipeButtonInnerView>
      <Ionicons name={ 'ios-trash' } size={ 20 } style={ iconStyle } />
      <SwipeButtonInnerText>{'削除'}</SwipeButtonInnerText>
    </SwipeButtonInnerView>
  </SwipedButton>,
]

export const createNotificationRightButtons = deleteTask => [
  <SwipedButton key={ '2' } color={ 'red' } onPress={ deleteTask }>
    <SwipeButtonInnerView>
      <Ionicons name={ 'ios-trash' } size={ 20 } style={ iconStyle } />
      <SwipeButtonInnerText>{'削除'}</SwipeButtonInnerText>
    </SwipeButtonInnerView>
  </SwipedButton>,
]
