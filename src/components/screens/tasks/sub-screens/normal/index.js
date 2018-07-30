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
import { View, RefreshControl, Alert } from 'react-native'
import TaskRow from '../../partials/task-row'
import TaskModal from '../../partials/task-modal'

// libs
import { createActions as createModalActions } from 'src/reducers/modal'
import { createActions as createTaskActions } from 'src/reducers/task'

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

  renderItem = ({ item, index }: any) => (
    <TaskRow
      task={ item }
      toggleTask={ this.itemProps.toggleTask(item, index) }
      deleteTask={ this.itemProps.deleteTask(item, index) }
      openModal={ this.itemProps.openModal(item, index) }
    />
  )

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

  updateEditingTask = (key: string) => (value: string | boolean) =>
    this.setState({
      ...this.state,
      editingTask: { ...this.state.editingTask, [key]: value },
    })

  resetEditingTask = () =>
    this.setState({ ...this.state, editingTask: { ...Tasks.initialTask } })

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    const { refreshing } = this.state
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
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={ refreshing }
              onRefresh={ this.onRefresh }
            />
          }
          data={ listData }
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
