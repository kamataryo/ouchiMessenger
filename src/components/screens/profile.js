// @flow

import React from 'react'
import { connect } from 'react-redux'
import { Task } from 'src/types/task'
import { Text, View } from 'react-native'

type props = {}

export class Tasks extends React.PureComponent<props> {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'ユーザー',
    }
  }

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    return (
      <View>
        <Text>{'ユーザー'}</Text>
        <Text>{'ユーザー'}</Text>
        <Text>{'ユーザー'}</Text>
        <Text>{'ユーザー'}</Text>
        <Text>{'ユーザー'}</Text>
      </View>
    )
  }
}

export const mapStateToProps = state => ({
  tasks: [],
})

export default connect(mapStateToProps)(Tasks)
