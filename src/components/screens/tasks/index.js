// @flow
import React from 'react'

// compoennts
import { View } from 'react-native'
import TaskHeader from './partials/task-header'
import TaskContent from './partials/task-content'

import tabBarIconHOC from 'src/hocs/tab-bar-icon'

// constants
import { BOTTOM_TAB_NAVIGATION_HEIGHT } from '../'

type Props = {}
type State = { mode: 'description' | 'priority' }

export class TaskScreen extends React.Component<Props, State> {
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
    this.state = { mode: 'description' }
  }

  /**
   * shouldComponentUpdate
   * @param  {object} nextProps next props
   * @param  {object} nextState next state
   * @return {boolean}          should component update
   */
  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return this.state.mode !== nextState.mode
  }

  toggleMode = () =>
    this.setState({
      ...this.state,
      mode: this.state.mode === 'priority' ? 'description' : 'priority',
    })

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    const { mode } = this.state

    return (
      <View>
        <TaskHeader toggleMode={ this.toggleMode } mode={ mode } />
        <View style={ { paddingBottom: BOTTOM_TAB_NAVIGATION_HEIGHT } }>
          <TaskContent mode={ mode } />
        </View>
      </View>
    )
  }
}

export default TaskScreen
