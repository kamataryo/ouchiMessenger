// @flow

// types
import type { Task } from 'src/types/task'
import type { Props, State } from './types'
import type { StoreState } from 'src/types/store'
import type { Dispatch } from 'redux'

import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

// components
import { View, RefreshControl, TouchableOpacity } from 'react-native'
import Swipeable from 'react-native-swipeable'
import { createRightButtons } from '../swipe-buttons'
import TaskRow from '../task-row'
import TaskModal from '../task-modal'

// libs
import { createActions as createModalActions } from 'src/reducers/modal'
import { createActions as createTaskActions } from 'src/reducers/task'
import { Alert } from 'react-native'

// APIs
import {
  put as dynamoPut,
  get as dynamoGet,
  remove as dynamoRemove,
} from 'src/api'

const FlatList = styled.FlatList`
  height: 100%;
`

export class Tasks extends React.Component<Props, State> {
  static initialTask: Task = {
    taskId: '',
    title: '',
    done: false,
    repeat: false,
    displayOrder: -1,
  }

  /**
   * constructor
   * @param  {object} props React props.
   * @return {void}
   */
  constructor(props: Props) {
    super(props)
    this.state = {
      editingTask: { ...Tasks.initialTask },
      refreshing: false,
    }
  }

  /**
   * componentWillMount
   * @return {void}
   */
  componentDidMount = () => this.onRefresh(false)

  shouldComponentUpdate = () => true

  onRefresh = (showDialog: boolean = true) => {
    showDialog && this.setState({ ...this.state, refreshing: true })

    dynamoGet()
      .then((tasks: Task[]) => {
        this.props.updateTasks(tasks)
        showDialog && this.setState({ ...this.state, refreshing: false })
      })
      .catch(() => {
        showDialog && Alert.alert('通信エラー', 'ごめんだにゃん 😹')
        showDialog && this.setState({ ...this.state, refreshing: false })
      })
  }

  renderItem = ({ item }: any) => {
    const { task, index } = item
    return (
      <Swipeable
        rightButtons={ createRightButtons(
          this.itemProps.deleteTask(task, index),
        ) }
      >
        <TouchableOpacity
          onPress={ this.itemProps.openModal(task, index) }
          onLongPress={ this.itemProps.toggleTask(task, index) }
        >
          <TaskRow task={ task } mode={ this.props.mode } />
        </TouchableOpacity>
      </Swipeable>
    )
  }

  itemProps = {
    toggleTask: (task: Task, index: number) => () => {
      const updatedAt = new Date().toISOString()
      const updatedBy = this.props.username

      dynamoPut({ ...task, updatedAt, updatedBy, done: !task.done })
        .then(() => {
          this.props.toggleTask(index, updatedAt, updatedBy)
        })
        .catch(() => Alert.alert('通信エラー', 'ごめんだにゃん 😹'))
    },

    deleteTask: (task: Task, index: number) => () => {
      Alert.alert('タスクの削除', 'このタスクを削除します。よろしいですか？', [
        {
          text: 'OK',
          onPress: () =>
            dynamoRemove(task.taskId)
              .then(() => {
                this.props.deleteTask(index)
                this.onRefresh(false)
              })
              .catch(() => Alert.alert('通信エラー', 'ごめんだにゃん 😹')),
        },
        { text: 'キャンセル' },
      ])
    },
    openModal: (task: Task, index: number) => () =>
      this.props.openModal(task, index),
  }

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    const { refreshing } = this.state
    const { tasks } = this.props

    const listData = tasks.map((task, index) => ({
      task: {
        ...task,
      },
      index,
      key: (task.taskId || '').toString(),
    }))

    const sortingList = [...listData]

    sortingList.sort((a, b) => {
      const compareA: number =
        a.task.displayOrder === void 0 ? 10 : a.task.displayOrder
      const compareB: number =
        b.task.displayOrder === void 0 ? 10 : b.task.displayOrder
      return compareA - compareB
    })

    return (
      <View>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={ refreshing }
              onRefresh={ this.onRefresh }
            />
          }
          data={ sortingList }
          renderItem={ this.renderItem }
        />
        <TaskModal />
      </View>
    )
  }
}

export const mapStateToProps = (state: StoreState) => {
  const tasks = Array.isArray(state.task.data) ? state.task.data : []
  return {
    username: state.profile.username,
    tasks: tasks,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<{ type: string }>) => ({
  updateTasks: (tasks: Task[]) =>
    dispatch(createTaskActions.updateTasks(tasks)),
  toggleTask: (index: number, updatedAt: string, updatedBy: string) =>
    dispatch(createTaskActions.toggleTask(index, updatedAt, updatedBy)),
  addTask: (task: Task) => dispatch(createTaskActions.addTask(task)),
  deleteTask: (index: number) => dispatch(createTaskActions.deleteTask(index)),
  clearTasks: () => dispatch(createTaskActions.clearTasks()),
  openModal: (task: Task, index: number) =>
    dispatch(createModalActions.open(task, index)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tasks)
