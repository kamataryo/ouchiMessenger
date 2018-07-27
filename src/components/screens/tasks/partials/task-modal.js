// @flow
import type { Task } from '../../../../types/task'
import type { StoreState } from '../../../../types/store'

import React from 'react'
import { connect } from 'react-redux'
import TextInput from '../../../commons/text-input'
import Modal from 'react-native-modal'
import { View, Button, Keyboard, Dimensions } from 'react-native'
import Username from '../../../commons/username'
import { textGray } from '../../../../colors'
import styled from 'styled-components'

const BOX_HEIGHT = 67.5 * 3 + 55 * 2
const { height: WINDOW_HEIGHT } = Dimensions.get('window')
const OFFSET = (WINDOW_HEIGHT - BOX_HEIGHT) / 2 - 20

const ButtonLine = styled.View`
  padding-top: 20px;
`
export type OwnProps = {
  isOpen: boolean,
  task: Task,
  onTitleChange: (value: string) => void,
  onDescriptionChange: (value: string) => void,
  onRegisterClick: () => void,
  onCancelClick: () => void,
}

export type StateProps = {
  username: string,
}

export type Props = {
  ...$Exact<OwnProps>,
  ...$Exact<StateProps>,
}

export type State = {
  listeners: any[],
  offset: boolean,
}

export class TaskModal extends React.PureComponent<Props, State> {
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

  componentWillUnmount() {
    this.state.listeners.forEach(listener => listener.remove())
  }

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    const { offset } = this.state
    const {
      isOpen,
      task,
      onTitleChange,
      onDescriptionChange,
      onRegisterClick,
      onCancelClick,
    } = this.props

    return (
      <Modal isVisible={ isOpen }>
        <View style={ { top: offset ? -OFFSET : 0 } }>
          <Username />
          <TextInput
            label={ 'タイトル' }
            value={ task.title }
            onChange={ onTitleChange }
          />
          <TextInput
            label={ '概要' }
            value={ task.description }
            onChange={ onDescriptionChange }
          />
          <ButtonLine>
            <Button title={ '追加' } onPress={ onRegisterClick } />
          </ButtonLine>
          <ButtonLine>
            <Button
              title={ 'キャンセル' }
              onPress={ onCancelClick }
              color={ textGray }
            />
          </ButtonLine>
        </View>
      </Modal>
    )
  }
}

export const mapStateToProps = (state: StoreState) => ({
  username: state.profile.username,
})

export default connect(mapStateToProps)(TaskModal)
