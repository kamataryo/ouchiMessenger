// @flow

import React from 'react'

// components
import Ionicons from 'react-native-vector-icons/Ionicons'
import {
  OuterRow,
  InnerRow,
  Title,
  Description,
  BothSide,
  TitleWrap,
  Priority,
} from './styled'

import type { Task } from 'src/types/task'
import { textGreen, textPaleGray } from 'src/colors'
import moment from 'moment'

type OwnProps = {
  task: Task,
  mode: 'description' | 'priority',
}

export const TaskRow = (props: OwnProps) => {
  const { task, mode } = props

  const description =
    mode === 'description'
      ? task.done
        ? `${task.updatedBy || '(不明)'} さん ${moment(task.updatedAt).format(
          'M/DD HH:mm',
        ) || ''}`
        : task.description || ''
      : `優先度 ${(task.displayOrder || 10).toString()}`

  return (
    <BothSide>
      <OuterRow>
        <Ionicons
          name={
            task.done ? 'ios-checkmark-circle' : 'ios-checkmark-circle-outline'
          }
          size={ 26 }
          style={ {
            color: task.done ? textGreen : textPaleGray,
            padding: 15,
          } }
        />
        <InnerRow>
          <TitleWrap>
            <Title>{task.title}</Title>
          </TitleWrap>
          <Description>{description}</Description>
        </InnerRow>
      </OuterRow>
      {task.repeat && (
        <Ionicons
          name={ 'ios-repeat' }
          size={ 26 }
          style={ { color: textPaleGray, padding: 15 } }
        />
      )}
    </BothSide>
  )
}

export default TaskRow
