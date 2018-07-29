// @flow

import React from 'react'
import styled from 'styled-components'

// comopnents
import { Text } from 'react-native'
import Username from '../commons/username'
import { Header } from 'react-native-elements'

// HOCs
import tabBarIconHOC from '../../hocs/tab-bar-icon'

// libs
import { bgGray } from '../../colors'
import { headerTitleStyle } from '../../styles'

const ProfileBackground = styled.View`
  background-color: ${bgGray};
  height: 100%;
`

const ButtonLine = styled.View`
  padding-top: 20px;
`

type Props = {}

type State = { requesting: boolean }

export class Tasks extends React.PureComponent<Props, State> {
  /**
   * [navigationOptions description]
   * @type {{navigation: function}} args navigation args
   */
  static navigationOptions = () => {
    return {
      title: 'ユーザー',
      tabBarIcon: tabBarIconHOC('paw'),
    }
  }

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    return (
      <ProfileBackground>
        <Header
          centerComponent={ {
            text: 'ユーザー',
            style: headerTitleStyle,
          } }
        />
        <Username />
        <ButtonLine>
          <Text>{'☀️タスクは毎朝3:00にリセットされます。'}</Text>
        </ButtonLine>
      </ProfileBackground>
    )
  }
}

export default Tasks
