// @flow

import React from 'react'
import styled from 'styled-components'

// comopnents
import Username from 'src/components/commons/username'
import { Header } from 'react-native-elements'

// HOCs
import tabBarIconHOC from 'src/hocs/tab-bar-icon'

// libs
import { bgGray, textGray } from 'src/colors'
import { headerTitleStyle } from 'src/styles'

const ProfileBackground = styled.View`
  background-color: ${bgGray};
  height: 100%;
`

const TextLine = styled.Text`
  text-align: center;
  padding-top: 20px;
  color: ${textGray};
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
        <TextLine>{'☀️タスクは毎朝3:00にリセットされます。'}</TextLine>
      </ProfileBackground>
    )
  }
}

export default Tasks
