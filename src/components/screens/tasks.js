// @flow

import React from 'react'
import { connect } from 'react-redux'
import { Task } from 'src/types/task'
import { SafeAreaView } from 'react-navigation'
import { Text } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

type props = {
  tasks: Task[],
}

export class Tasks extends React.PureComponent<props> {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'タスク',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={ focused ? 'ios-checkbox' : 'ios-checkbox-outline' }
          size={ 26 }
          style={ { color: tintColor } }
        />
      ),
    }
  }

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    const { tasks } = this.props
    return (
      <SafeAreaView>
        <Text>{'タスク'}</Text>
        <Text>{'タスク'}</Text>
        <Text>{'タスク'}</Text>
        <Text>{'タスク'}</Text>
        <Text>{'タスク'}</Text>
        {tasks.map(task => <Text key={ task.id }>{task.title}</Text>)}
      </SafeAreaView>
    )
  }
}

export const mapStateToProps = state => ({
  tasks: [],
})

export default connect(mapStateToProps)(Tasks)
