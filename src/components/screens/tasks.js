// @flow

// types
import type { Task } from '../../types/task'

import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

// components
import { View, Button, RefreshControl } from 'react-native'
import { Header, FormLabel, FormInput } from 'react-native-elements'

import TaskRow from '../commons/task-row'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Modal from 'react-native-modal'

// hocs
import tabBarIconHOC from '../../hocs/tab-bar-icon'
import { textWhite } from '../../colors'

// libs
import { createActions as createTaskActions } from '../../reducers/task'
import demoTasks from '../../../assets/demo-tasks'
import { headerTitleStyle } from '../../styles'
import { textGray } from '../../colors'
import moment from 'moment'

type Props = {
  username: string,
  tasks: Task[],
  updateTasks: (tasks: Task[]) => void,
  toggleTask: (index: number, updatedAt: string, updatedBy: string) => void,
  addTask: (task: Task) => void,
  deleteTask: (index: number) => void,
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
    // set demodata
    // TODO: remove this
    props.tasks.length === 0 &&
      setTimeout(() => this.props.updateTasks(demoTasks), 1000)
  }

  onRefresh = () => {
    this.setState({ ...this.state, refreshing: true })
    this.fetchData().then(() => {
      this.setState({ ...this.state, refreshing: false })
    })
  }

  fetchData = () =>
    new Promise(resolve => {
      setTimeout(() => {
        this.props.updateTasks(demoTasks)
        resolve()
      }, 1000)
    })

  renderItem = ({ item, index }: any) => (
    <TaskRow
      task={ item }
      toggleTask={ () =>
        this.props.toggleTask(
          index,
          moment(Date()).format('hh:mm'),
          this.props.username,
        )
      }
      deleteTask={ () => this.props.deleteTask(index) }
    />
  )

  toggleModal = () =>
    this.setState({ ...this.state, isModalOpen: !this.state.isModalOpen })

  updateEditingTask = (key: string) => (value: any) =>
    this.setState({
      ...this.state,
      editingTask: { ...this.state.editingTask, [key]: value },
    })

  resetEditingTask = () => this.setState({ ...this.state, editingTask: {} })

  onRegisterClick = () => {
    // TODO serialize and obtain id
    const nextTask = { ...this.state.editingTask, id: Date() }
    this.props.addTask(nextTask)
    this.resetEditingTask()
    this.toggleModal()
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
                onChangeText={ this.updateEditingTask('title') }
              />
            </View>
            <View>
              <FormLabel>{'概要'}</FormLabel>
              <FormInput
                value={ editingTask.description }
                onChangeText={ this.updateEditingTask('description') }
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
  return {
    username: state.profile.username,
    tasks: state.task.data.map(task => ({
      ...task,
      key: (task.id || '').toString(),
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
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tasks)
