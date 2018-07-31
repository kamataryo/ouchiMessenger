// @flow

import type { StoreState } from 'src/types/store'

import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

// comopnents
import Username from 'src/components/commons/username'
import { Header } from 'react-native-elements'

// HOCs
import tabBarIconHOC from 'src/hocs/tab-bar-icon'

// libs
import { Alert } from 'react-native'
import { bgGray, textGray } from 'src/colors'
import { headerTitleStyle } from 'src/styles'
import { putUser } from 'src/api'

const ProfileBackground = styled.View`
  background-color: ${bgGray};
  height: 100%;
`

const TextLine = styled.Text`
  text-align: center;
  padding-top: 20px;
  color: ${textGray};
`

type Props = {
  // stateProps
  deviceToken: string,
}

type State = { requesting: boolean }

export class Profile extends React.PureComponent<Props, State> {
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

  onChange = (username: string) => {
    const user = { username, deviceToken: this.props.deviceToken }

    putUser(user).catch(() => Alert.alert('通信エラー', 'ごめんだにゃん 😹'))
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
        <Username onChange={ this.onChange } />
        <TextLine>{'☀️タスクは毎朝3:00にリセットされます。'}</TextLine>
      </ProfileBackground>
    )
  }
}

/**
 * map state to props
 * @param  {object} state    state tree
 * @param  {object} ownProps own props
 * @return {object}          state props
 */
const mapStateToProps = (state: StoreState) => {
  return {
    deviceToken: state.notification.deviceToken,
  }
}

export default connect(mapStateToProps)(Profile)
