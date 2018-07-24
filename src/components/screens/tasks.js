// @flow

import React from 'react'
import { connect } from 'react-redux'
import { Task } from 'src/types/task'
import { Text, View } from 'react-native'

type props = {
  tasks: Task[],
}

export class Tasks extends React.PureComponent<props> {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'タスク',
    }
  }

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    const { tasks } = this.props
    return (
      <View>
        <Text>{'タスク'}</Text>
        <Text>{'タスク'}</Text>
        <Text>{'タスク'}</Text>
        <Text>{'タスク'}</Text>
        <Text>{'タスク'}</Text>
        {tasks.map(task => <Text key={task.id}>{task.title}</Text>)}
      </View>
    )
  }
}

export const mapStateToProps = state => ({
  tasks: [],
})

export default connect(mapStateToProps)(Tasks)
