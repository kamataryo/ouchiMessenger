// @flow
import type { Task } from '../../../../types/task'

import React from 'react'
import { FormLabel, FormInput } from 'react-native-elements'
import Modal from 'react-native-modal'
import { View, Button } from 'react-native'
import { textGray } from '../../../../colors'

export type Props = {
  isOpen: boolean,
  task: Task,
  onEditTitle: () => void,
  onEditDescription: () => void,
  onRegisterClick: () => void,
  onCancelClick: () => void,
}

export const TaskModal = (props: Props) => {
  const {
    isOpen,
    task,
    onEditTitle,
    onEditDescription,
    onRegisterClick,
    onCancelClick,
  } = props
  return (
    <Modal isVisible={ isOpen }>
      <View>
        <View>
          <FormLabel>{'タイトル'}</FormLabel>
          <FormInput value={ task.title } onTextInput={ onEditTitle } />
        </View>
        <View>
          <FormLabel>{'概要'}</FormLabel>
          <FormInput value={ task.description } onTextInput={ onEditDescription } />
        </View>
        <Button title={ '追加' } onPress={ onRegisterClick } />
        <Button title={ 'キャンセル' } onPress={ onCancelClick } color={ textGray } />
      </View>
    </Modal>
  )
}

export default TaskModal
