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
import { createRightButtons } from 'src/components/commons/swipe-buttons'
import TaskRow from '../task-row'
import TaskModal from '../task-modal'

// libs
import { createActions as createModalActions } from 'src/reducers/modal'
import { createActions as createTaskActions } from 'src/reducers/task'
import { Alert } from 'react-native'

// APIs
import { putTask, getTasks, removeTask } from 'src/api'
import { listEndpointArns, publish } from 'src/api'

import { textGray } from 'src/colors'

const FlatList = styled.FlatList`
  height: 100%;
`

const TextLine = styled.Text`
  text-align: center;
  padding-top: 20px;
  color: ${textGray};
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

    getTasks()
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
          onLongPress={ this.itemProps.openModal(task, index) }
          onPress={ this.itemProps.toggleTask(task, index) }
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

      const nextTaskProps = {
        ...task,
        updatedAt,
        updatedBy,
        done: !task.done,
      }

      const { deviceToken } = this.props
      const message = {
        type: 'complete',
        title: `「${task.title}」が完了しました！`,
        data: { taskId: task.taskId, updatedBy, updatedAt },
      }

      return putTask(nextTaskProps)
        .then(() => this.props.toggleTask(index, updatedAt, updatedBy))
        .then(() => (nextTaskProps.done ? listEndpointArns() : []))
        .then(data =>
          publish({
            message,
            endpointArns: data
              .filter(e => e.Attributes.Token !== deviceToken)
              .map(e => e.EndpointArn),
          }),
        )
        .catch(() => Alert.alert('通信エラー', 'ごめんだにゃん 😹'))
    },

    deleteTask: (task: Task, index: number) => () => {
      Alert.alert('タスクの削除', 'このタスクを削除します。よろしいですか？', [
        {
          text: 'OK',
          onPress: () =>
            removeTask(task.taskId)
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
        {tasks.length === 0 && <TextLine>{'タスクはありません😕'}</TextLine>}

        <TaskModal />
      </View>
    )
  }
}

export const mapStateToProps = (state: StoreState) => {
  const tasks = Array.isArray(state.task.data) ? state.task.data : []
  return {
    deviceToken: state.notification.deviceToken,
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
