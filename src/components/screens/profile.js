// @flow

import React from 'react'
import styled from 'styled-components'

// comopnents
import { Button, Alert } from 'react-native'
import Username from '../commons/username'
import { Header } from 'react-native-elements'

// HOCs
import tabBarIconHOC from '../../hocs/tab-bar-icon'

// libs
import { bgGray } from '../../colors'
import { headerTitleStyle } from '../../styles'
import { batch } from '../../api/dynamodb'

const ProfileBackground = styled.View`
  background-color: ${bgGray};
  height: 100%;
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
   * constructor
   * @param  {object} props React props.
   * @return {void}
   */
  constructor(props: Props) {
    super(props)
    this.state = { requesting: false }
  }

  execBatch = () => {
    this.setState({ ...this.state, requesting: true })
    batch()
      .then(() => {
        this.setState({ ...this.state, requesting: false })
        Alert.alert('繰越処理完了', '新しいあさが来た')
      })
      .catch(() => {
        this.setState({ ...this.state, requesting: false })
        Alert.alert('通信失敗', 'ごめんだにゃん')
      })
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
        <Button onPress={ batch } title={ '日付の繰越' } />
      </ProfileBackground>
    )
  }
}

export default Tasks
