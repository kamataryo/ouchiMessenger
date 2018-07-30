// @flow

// types
import type { Task } from 'src/types/task'
import type { StoreState } from 'src/types/store'

import React from 'react'
import { connect } from 'react-redux'

// components
import { View, FlatList } from 'react-native'
import TaskRow from '../../partials/task-row'

// libs
// import { createActions as createTaskActions } from 'src/reducers/task'

// APIs
// import { put as dynamoPut } from 'src/api'

type Props = { tasks: Task[] }

export class Sort extends React.Component<Props> {
  shouldComponentUpdate = () => true

  renderItem = ({ item }: any) => <TaskRow task={ item } />

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    const { tasks } = this.props

    const listData: Task[] = tasks.map(task => ({
      ...task,
      key: (task.taskId || '').toString(),
    }))

    const sortingList = [...listData]

    sortingList.sort((a, b) => {
      const compareA: number =
        a.displayOrder === void 0 ? Infinity : a.displayOrder
      const compareB: number =
        b.displayOrder === void 0 ? Infinity : b.displayOrder
      return compareA - compareB
    })

    return (
      <View>
        <FlatList data={ listData } renderItem={ this.renderItem } />
      </View>
    )
  }
}

export const mapStateToProps = (state: StoreState) => {
  const tasks = Array.isArray(state.task.data) ? state.task.data : []
  return {
    tasks: tasks,
  }
}

export default connect(mapStateToProps)(Sort)
