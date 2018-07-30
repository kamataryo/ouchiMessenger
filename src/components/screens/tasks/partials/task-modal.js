// @flow
import type { Task } from 'src/types/task'
import type { StoreState } from 'src/types/store'

import React from 'react'
import { connect } from 'react-redux'
import TextInput from 'src/components/commons/text-input'
import Modal from 'react-native-modal'
import {
  View,
  Button,
  Switch,
  Keyboard,
  // Dimensions,
  Alert,
  Picker,
  Text,
} from 'react-native'
import Username from 'src/components/commons/username'
import { textGray } from 'src/colors'
import styled from 'styled-components'

import moment from 'moment'
// APIs
import { put as dynamoPut } from 'src/api'

// action creators
import { createActions as createModalActions } from 'src/reducers/modal'
import { createActions as createTaskActions } from 'src/reducers/task'

// const BOX_HEIGHT =
//   67.5 * 3 + // 3 TextInput
//   111 + // Toggle Switch
//   55 * 2 // 2Buttons
// const { height: WINDOW_HEIGHT } = Dimensions.get('window')
const OFFSET = 0 // (WINDOW_HEIGHT - BOX_HEIGHT) / 2 - 20

const ButtonLine = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding-top: 20px;
`

const SwitchLine = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  margin: 20px;
`

const SwitchLabel = styled.Text`
  color: white;
`

export type OwnProps = {}

export type StateProps = {
  isOpen: boolean,
  task?: Task,
  taskIndex: number,
  username: string,
}

export type DispatchProps = {
  resetModal: () => void,
  closeModal: () => void,
  updateModalTask: (taskProps: any) => void,
  addTask: (task: Task) => void,
  updateTask: (index: number, taskProps: any) => void,
}

export type Props = {
  ...$Exact<OwnProps>,
  ...$Exact<StateProps>,
  ...$Exact<DispatchProps>,
}

export type State = {
  listeners: any[],
  offset: boolean,
}

export class TaskModal extends React.Component<Props, State> {
  /**
   * constructor
   * @param  {object} props React props.
   * @return {void}
   */
  constructor(props: Props) {
    super(props)
    this.state = {
      listeners: [
        Keyboard.addListener('keyboardWillShow', () =>
          this.setState({ ...this.state, offset: true }),
        ),
        Keyboard.addListener('keyboardWillHide', () =>
          this.setState({ ...this.state, offset: false }),
        ),
      ],
      offset: false,
    }
  }

  shouldComponentUpdate = () => true

  componentWillUnmount() {
    this.state.listeners.forEach(listener => listener.remove())
  }

  isEditMode = () => this.props.taskIndex > -1

  createUpdateHandler = (key: string) => (value: string | boolean | number) => {
    this.props.updateModalTask({ [key]: value })
  }

  onCancelClick = () => {
    this.props.resetModal()
    this.props.closeModal()
  }

  onFixClick = () =>
    this.isEditMode() ? this.onUpdateClick() : this.onAddClick()

  onUpdateClick = () =>
    dynamoPut(this.props.task)
      .then(() => {
        this.props.updateTask(this.props.taskIndex, this.props.task)
        this.props.closeModal()
      })
      .catch(() => Alert.alert('通信エラー', 'ごめんだにゃん 😹'))

  onAddClick = () => {
    const nextTask = {
      ...this.props.task,
      taskId: moment().unix() + '_' + this.props.username,
      done: false,
      updatedAt: new Date().toISOString(),
      updatedBy: this.props.username,
      displayOrder: 0,
    }

    dynamoPut(nextTask)
      .then(() => {
        this.props.addTask(nextTask)
        this.props.closeModal()
      })
      .catch(() => Alert.alert('通信エラー', 'ごめんだにゃん 😹'))
  }

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    const { offset } = this.state
    const { isOpen, task = {} } = this.props

    return (
      <Modal isVisible={ isOpen }>
        <View style={ { top: offset ? -OFFSET : 0 } }>
          <Username />
          <TextInput
            label={ 'タイトル' }
            value={ task.title || '' }
            onChange={ this.createUpdateHandler('title') }
          />
          <TextInput
            label={ '概要' }
            value={ task.description || '' }
            onChange={ this.createUpdateHandler('description') }
          />
          <ButtonLine>
            <Text style={ { color: 'white' } }>
              {'優先度(1に近いほど上に表示されます)'}
            </Text>
          </ButtonLine>
          <Picker
            selectedValue={ task.displayOrder || 10 }
            itemStyle={ { color: 'white' } }
            onValueChange={ this.createUpdateHandler('displayOrder') }
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => (
              <Picker.Item
                key={ item.toString() }
                label={ item.toString() }
                value={ item }
              />
            ))}
          </Picker>
          <SwitchLine>
            <SwitchLabel>{'繰り返し'}</SwitchLabel>
            <Switch
              value={ !!task.repeat }
              onValueChange={ this.createUpdateHandler('repeat') }
            />
          </SwitchLine>
          <ButtonLine>
            <Button
              title={ this.isEditMode() ? '修正' : '追加' }
              onPress={ this.onFixClick }
              disabled={ !task.title || !task.description }
            />
            <Button
              title={ 'キャンセル' }
              onPress={ this.onCancelClick }
              color={ textGray }
            />
          </ButtonLine>
        </View>
      </Modal>
    )
  }
}

export const mapStateToProps = (state: StoreState) => ({
  isOpen: state.modal.isOpen,
  task: state.modal.task,
  taskIndex: state.modal.taskIndex,
  username: state.profile.username,
})

export const mapDispatchToProps = (dispatch: any) => ({
  resetModal: () => dispatch(createModalActions.reset()),
  closeModal: () => dispatch(createModalActions.close()),
  updateModalTask: (taskProps: any) =>
    dispatch(createModalActions.update(taskProps)),
  addTask: (task: Task) => dispatch(createTaskActions.addTask(task)),
  updateTask: (taskIndex: number, taskProps: any) =>
    dispatch(createTaskActions.updateTask(taskIndex, taskProps)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TaskModal)
