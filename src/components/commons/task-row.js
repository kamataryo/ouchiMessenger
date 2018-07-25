// @flow

import React from 'react'

import { Text, View } from 'react-native'
import Swipeout from 'react-native-swipeout'
import styled from 'styled-components'
import Ionicons from 'react-native-vector-icons/Ionicons'

import type { Task } from '../../types/task'
import { bgGray, textGreen, textPaleGray } from '../../colors'
const swipeoutButtons = [{ text: 'お願い！', textStyle: { background: 'red' } }]

type Props = {
  task: Task,
}

const OuterRow = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 55px;
  border-bottom-width: 0.5;
  border-bottom-color: #d6d7da;
`

const InnerRow = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

export const TaskRow = ({ task }: Props) => {
  return (
    <Swipeout
      right={ task.done ? void 0 : swipeoutButtons }
      backgroundColor={ bgGray }
    >
      <View>
        <OuterRow>
          <Ionicons
            name={ 'ios-checkmark-circle-outline' }
            size={ 26 }
            style={ { color: task.done ? textGreen : textPaleGray, padding: 15 } }
          />
          <InnerRow>
            <Text>{task.title}</Text>
            <Text>{task.description}</Text>
          </InnerRow>
        </OuterRow>
      </View>
    </Swipeout>
  )
}

export default TaskRow
