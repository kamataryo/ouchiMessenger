// @flow
import type { Task } from '../../../../types/task'
import type { StoreState } from '../../../../types/store'

import React from 'react'
import { connect } from 'react-redux'
import TextInput from '../../../commons/text-input'
import Modal from 'react-native-modal'
import { View, Button } from 'react-native'
import Username from '../../../commons/username'
import { textGray } from '../../../../colors'
import styled from 'styled-components'

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

export const TaskModal = (props: Props) => {
  const {
    isOpen,
    task,
    onTitleChange,
    onDescriptionChange,
    onRegisterClick,
    onCancelClick,
  } = props

  return (
    <Modal isVisible={ isOpen }>
      <View>
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

export const mapStateToProps = (state: StoreState) => ({
  username: state.profile.username,
})

export default connect(mapStateToProps)(TaskModal)
