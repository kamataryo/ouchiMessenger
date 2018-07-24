// @flow

import React from 'react'
import { connect } from 'react-redux'

// types
import { Task } from '../../types/task'

// components
import { Text } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'

type Props = {
  tasks: Task[],
}

export class Tasks extends React.PureComponent<Props> {
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
