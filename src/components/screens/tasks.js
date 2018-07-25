// @flow

// types
import type { Task } from '../../types/task'

import React from 'react'
import { connect } from 'react-redux'

// components
import { Text } from 'react-native'
import { SafeAreaView } from 'react-navigation'

// hocs
import tabBarIconHOC from '../../hocs/tab-bar-icon'

type Props = {
  tasks: Task[],
}

export class Tasks extends React.PureComponent<Props> {
  /**
   * [navigationOptions description]
   * @type {{navigation: function}} args navigation args
   */
  static navigationOptions = () => {
    return {
      title: 'タスク',
      tabBarIcon: tabBarIconHOC('checkbox'),
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
        {tasks.map(task => <Text key={ task.title }>{task.title}</Text>)}
      </SafeAreaView>
    )
  }
}

export const mapStateToProps = () => ({
  tasks: [],
})

export default connect(mapStateToProps)(Tasks)
