// @flow

import React from 'react'
import { Header } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { textWhite } from '../../../../colors'
import { headerTitleStyle } from '../../../../styles'

export type Props = { toggleModal: () => void }

export const TaskHeader = (props: Props) => (
  <Header
    leftComponent={
      <Ionicons
        name={ 'ios-add' }
        size={ 26 }
        style={ { color: 'transparent', padding: 20 } }
      />
    }
    centerComponent={ {
      text: 'お仕事',
      style: headerTitleStyle,
    } }
    rightComponent={
      <Ionicons
        name={ 'ios-add' }
        size={ 26 }
        style={ { color: textWhite, padding: 20 } }
        onPress={ props.toggleModal }
      />
    }
  />
)

export default TaskHeader
