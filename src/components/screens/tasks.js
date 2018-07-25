// @flow

// types
import type { Task } from '../../types/task'

import React from 'react'
import { connect } from 'react-redux'

// components
import { Header } from 'react-native-elements'

// hocs
import tabBarIconHOC from '../../hocs/tab-bar-icon'
import { textWhite } from '../../colors'

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
    console.log(tasks)
    return (
      <Header
        centerComponent={ {
          text: 'お仕事',
          style: { color: textWhite },
        } }
      />
    )
  }
}

export const mapStateToProps = () => ({
  tasks: [],
})

export default connect(mapStateToProps)(Tasks)
