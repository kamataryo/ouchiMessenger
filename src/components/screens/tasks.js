// @flow

// types
import type { Task } from '../../types/task'

import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

// components
import { View, Button, RefreshControl, Alert } from 'react-native'
import { Header, FormLabel, FormInput } from 'react-native-elements'

import TaskRow from '../commons/task-row'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Modal from 'react-native-modal'

// hocs
import tabBarIconHOC from '../../hocs/tab-bar-icon'
import { textWhite } from '../../colors'

// libs
import { createActions as createTaskActions } from '../../reducers/task'
import { headerTitleStyle } from '../../styles'
import { textGray } from '../../colors'
import moment from 'moment'

// APIs
import {
  put as dynamoPut,
  get as dynamoGet,
  remove as dynamoRemove,
} from '../../api/dynamodb'

type Props = {
  username: string,
  tasks: Task[],
  updateTasks: (tasks: Task[]) => void,
  toggleTask: (index: number, updatedAt: string, updatedBy: string) => void,
  addTask: (task: Task) => void,
  deleteTask: (index: number) => void,
  clearTasks: () => void,
}

type State = {
  isModalOpen: boolean,
  editingTask: any,
  refreshing: boolean,
}

const FlatList = styled.FlatList`
  height: 100%;
`

export class Tasks extends React.PureComponent<Props, State> {
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
   * constructor
   * @param  {object} props React props.
   * @return {void}
   */
  constructor(props: Props) {
    super(props)
    this.state = { isModalOpen: false, editingTask: {}, refreshing: false }
  }

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
    toggleTask: (task, index) => () => {
      const updatedAt = moment(Date()).format('hh:mm')
      const updatedBy = this.props.username
      this.props.toggleTask(index, updatedAt, updatedBy)
      dynamoPut({ ...task, updatedAt, updatedBy, done: !task.done }).catch(() =>
        Alert.alert('通信エラー', 'ごめんだにゃん 😹'),
      )
    },

    deleteTask: (task, index) => () => {
      const { taskId } = task
      dynamoRemove(taskId).catch(() =>
        Alert.alert('通信エラー', 'ごめんだにゃん 😹'),
      )
      this.props.deleteTask(index)
    },
  }

  toggleModal = () =>
    this.setState({ ...this.state, isModalOpen: !this.state.isModalOpen })

  updateEditingTask = (key: string) => (e: any) =>
    this.setState({
      ...this.state,
      editingTask: { ...this.state.editingTask, [key]: e.nativeEvent.text },
    })

  resetEditingTask = () => this.setState({ ...this.state, editingTask: {} })

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
          console.error(err) || Alert.alert('通信エラー', 'ごめんだにゃん 😹'),
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
      <View>
        <Header
          leftComponent={
            <Ionicons
              name={ 'ios-add' }
              size={ 26 }
              style={ { color: 'transparent', padding: 20 } }
            />
          }
          centerComponent={ {
            text: 'お仕事',
            style: headerTitleStyle,
          } }
          rightComponent={
            <Ionicons
              name={ 'ios-add' }
              size={ 26 }
              style={ { color: textWhite, padding: 20 } }
              onPress={ this.toggleModal }
            />
          }
        />
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={ refreshing }
              onRefresh={ this.onRefresh }
            />
          }
          data={ tasks }
          renderItem={ this.renderItem }
        />
        <Modal isVisible={ isModalOpen }>
          <View>
            <View>
              <FormLabel>{'タイトル'}</FormLabel>
              <FormInput
                value={ editingTask.title }
                onTextInput={ this.updateEditingTask('title') }
              />
            </View>
            <View>
              <FormLabel>{'概要'}</FormLabel>
              <FormInput
                value={ editingTask.description }
                onTextInput={ this.updateEditingTask('description') }
              />
            </View>
            <Button title={ '追加' } onPress={ this.onRegisterClick } />
            <Button
              title={ 'キャンセル' }
              onPress={ this.onCancelClick }
              color={ textGray }
            />
          </View>
        </Modal>
      </View>
    )
  }
}

export const mapStateToProps = (state: any) => {
  const tasks = Array.isArray(state.task.data) ? state.task.data : []
  return {
    username: state.profile.username,
    tasks: tasks.map(task => ({
      ...task,
      key: task.taskId.toString(),
    })),
  }
}

export const mapDispatchToProps = (dispatch: any) => ({
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
