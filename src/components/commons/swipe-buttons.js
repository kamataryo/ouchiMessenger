import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styled from 'styled-components'

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
  color: white;
  font-size: 16px;
`

export const createRightButtons = deleteTask => [
  <SwipedButton key={ '2' } color={ 'red' } onPress={ deleteTask }>
    <SwipeButtonInnerView>
      <Ionicons
        name={ 'ios-trash' }
        size={ 20 }
        style={ { color: 'white', padding: 2 } }
      />
      <SwipeButtonInnerText>{'削除'}</SwipeButtonInnerText>
    </SwipeButtonInnerView>
  </SwipedButton>,
]

export const createNotificationRightButtons = deleteTask => [
  <SwipedButton key={ '2' } color={ 'red' } onPress={ deleteTask }>
    <SwipeButtonInnerView>
      <Ionicons
        name={ 'ios-trash' }
        size={ 20 }
        style={ { color: 'white', padding: 2 } }
      />
      <SwipeButtonInnerText>{'削除'}</SwipeButtonInnerText>
    </SwipeButtonInnerView>
  </SwipedButton>,
]
