// @flow

import React from 'react'
import styled from 'styled-components'

// comopnents
import { SafeAreaView } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Username from '../commons/username'

// libs
import { bgGray } from '../../colors'

const ProfileBackground = styled.View`
  background-color: ${bgGray};
  height: 100%;
`

type props = {}

export class Tasks extends React.PureComponent<props> {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'ユーザー',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={ focused ? 'ios-paw' : 'ios-paw-outline' }
          size={ 26 }
          style={ { color: tintColor } }
        />
      ),
      headerForceInset: { top: '24px' },
    }
  }

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    return (
      <ProfileBackground>
        <SafeAreaView>
          <Username />
        </SafeAreaView>
      </ProfileBackground>
    )
  }
}

export default Tasks
