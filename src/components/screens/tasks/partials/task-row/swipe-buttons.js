import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {
  SwipedButton,
  SwipeButtonInnerView,
  SwipeButtonInnerText,
} from './styled'

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
