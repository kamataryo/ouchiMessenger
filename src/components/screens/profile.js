// @flow

import React from 'react'
import styled from 'styled-components'

// comopnents
import { SafeAreaView } from 'react-navigation'
import Username from '../commons/username'

// HOCs
import tabBarIconHOC from '../../hocs/tab-bar-icon'

// libs
import { bgGray } from '../../colors'

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
        <SafeAreaView>
          <Username />
        </SafeAreaView>
      </ProfileBackground>
    )
  }
}

export default Tasks
