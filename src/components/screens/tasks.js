// @flow

// types
import type { Task } from '../../types/task'

import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

// components
import { View, TouchableOpacity } from 'react-native'
import { Header } from 'react-native-elements'
import TaskRow from '../commons/task-row'

// hocs
import tabBarIconHOC from '../../hocs/tab-bar-icon'
import { textWhite } from '../../colors'

// libs
import { createActions as createTaskActions } from '../../reducers/task'
import demoTasks from '../../../assets/demo-tasks'

type Props = {
  tasks: Task[],
  updateTasks: (tasks: Task[]) => void,
  toggleTask: (index: number) => void,
}

type RenderItemProps = {
  item: Task,
  index: number,
}

const FlatList = styled.FlatList`
  height: 100%;
`

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
   * constructor
   * @param  {object} props React props.
   * @return {void}
   */
  constructor(props: Props) {
    super(props)
    // set demodata
    // TODO: remove this
    setTimeout(() => this.props.updateTasks(demoTasks), 1000)
  }

  renderItem = ({ item, index }: RenderItemProps) => (
    <TouchableOpacity
      onPress={ () => console.log(this.props) || this.props.toggleTask(index) }
    >
      <TaskRow task={ item } />
    </TouchableOpacity>
  )

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    const { tasks } = this.props
    return (
      <View>
        <Header
          centerComponent={ {
            text: 'お仕事',
            style: { color: textWhite },
          } }
        />
        <FlatList data={ tasks } renderItem={ this.renderItem } />
      </View>
    )
  }
}

export const mapStateToProps = (state: any) => {
  return {
    tasks: state.task.data.map(task => ({ ...task, key: task.id.toString() })),
  }
}

export const mapDispatchToProps = (dispatch: any) => ({
  updateTasks: (tasks: Task[]) =>
    dispatch(createTaskActions.updateTasks(tasks)),
  toggleTask: (index: number) => dispatch(createTaskActions.toggleTask(index)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tasks)
