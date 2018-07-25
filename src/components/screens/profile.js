// @flow

import React from 'react'
import styled from 'styled-components'

// comopnents
import Username from '../commons/username'
import { Header } from 'react-native-elements'

// HOCs
import tabBarIconHOC from '../../hocs/tab-bar-icon'

// libs
import { bgGray, textWhite } from '../../colors'

const ProfileBackground = styled.View`
  background-color: ${bgGray};
  height: 100%;
`

type props = {}

export class Tasks extends React.PureComponent<props> {
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
            style: { color: textWhite },
          } }
        />
        <Username />
      </ProfileBackground>
    )
  }
}

export default Tasks
