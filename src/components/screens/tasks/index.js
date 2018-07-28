// @flow

// types
import type { Task } from '../../../types/task'
import type { Props, State } from './types'
import type { StoreState } from '../../../types/store'
import type { Dispatch } from 'redux'

import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

// components
import { View, RefreshControl, Alert } from 'react-native'
import TaskHeader from './partials/task-header'
import TaskRow from '../../commons/task-row'
import TaskModal from './partials/task-modal'

// hocs
import tabBarIconHOC from '../../../hocs/tab-bar-icon'

// libs
import { createActions as createTaskActions } from '../../../reducers/task'
import moment from 'moment'

// APIs
import {
  put as dynamoPut,
  get as dynamoGet,
  remove as dynamoRemove,
} from '../../../api/dynamodb'

const FlatList = styled.FlatList`
  height: 100%;
`

export class Tasks extends React.Component<Props, State> {
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

  static initialTask: Task = {
    taskId: '',
    title: '',
    done: false,
    repeat: false,
  }

  /**
   * constructor
   * @param  {object} props React props.
   * @return {void}
   */
  constructor(props: Props) {
    super(props)
    this.state = {
      isModalOpen: false,
      editingTask: { ...Tasks.initialTask },
      refreshing: false,
    }
  }

  shouldComponentUpdate = () => true

  onRefresh = () => {
    this.setState({ ...this.state, refreshing: true })

    dynamoGet()
      .then(tasks => {
        this.props.updateTasks(tasks)
        this.setState({ ...this.state, refreshing: false })
      })
      .catch(() => Alert.alert('通信エラー', 'ごめんだにゃん 😹'))
  }

  renderItem = ({ item, index }: any) => (
    <TaskRow
      task={ item }
      toggleTask={ this.itemProps.toggleTask(item, index) }
      deleteTask={ this.itemProps.deleteTask(item, index) }
    />
  )

  itemProps = {
    toggleTask: (task: Task, index: number) => () => {
      const updatedAt = moment(Date()).format('HH:mm')
      const updatedBy = this.props.username
      this.props.toggleTask(index, updatedAt, updatedBy)
      dynamoPut({ ...task, updatedAt, updatedBy, done: !task.done }).catch(() =>
        Alert.alert('通信エラー', 'ごめんだにゃん 😹'),
      )
    },

    deleteTask: (task: Task, index: number) => () => {
      const { taskId } = task
      dynamoRemove(taskId).catch(() =>
        Alert.alert('通信エラー', 'ごめんだにゃん 😹'),
      )
      this.props.deleteTask(index)
    },
  }

  toggleModal = () =>
    this.setState({ ...this.state, isModalOpen: !this.state.isModalOpen })

  updateEditingTask = (key: string) => (value: string | boolean) =>
    this.setState({
      ...this.state,
      editingTask: { ...this.state.editingTask, [key]: value },
    })

  resetEditingTask = () =>
    this.setState({ ...this.state, editingTask: { ...Tasks.initialTask } })

  onRegisterClick = () => {
    const nextTask = {
      ...this.state.editingTask,
      taskId: moment().unix() + '_' + this.props.username,
      done: false,
      updatedAt: Date(),
      updatedBy: this.props.username,
    }

    dynamoPut(nextTask)
      .then(() => {
        this.props.addTask(nextTask)
        this.resetEditingTask()
        this.toggleModal()
      })
      .catch(
        err =>
          console.log(nextTask) ||
          console.error(err) ||
          Alert.alert('通信エラー', 'ごめんだにゃん 😹'),
      )
  }

  onCancelClick = () => {
    this.resetEditingTask()
    this.toggleModal()
  }

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    const { isModalOpen, editingTask, refreshing } = this.state
    const { tasks } = this.props

    return (
      <View style={ { paddingBottom: 67 } }>
        <TaskHeader toggleModal={ this.toggleModal } />
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={ refreshing }
              onRefresh={ this.onRefresh }
            />
          }
          data={ tasks.map(task => ({ ...task, key: task.taskId.toString() })) }
          renderItem={ this.renderItem }
        />
        <TaskModal
          task={ editingTask }
          isOpen={ isModalOpen }
          onTitleChange={ this.updateEditingTask('title') }
          onDescriptionChange={ this.updateEditingTask('description') }
          onRepeatChange={ this.updateEditingTask('repeat') }
          onRegisterClick={ this.onRegisterClick }
          onCancelClick={ this.onCancelClick }
        />
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
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tasks)
