// @flow

import React from 'react'

import { TouchableOpacity } from 'react-native'
import Swipeable from 'react-native-swipeable'

// components
import Ionicons from 'react-native-vector-icons/Ionicons'
import {
  OuterRow,
  InnerRow,
  Title,
  Description,
  SwipedButton,
  SwipeButtonInnerView,
  SwipeButtonInnerText,
  BothSide,
} from './styled'

import type { Task } from 'src/types/task'
import { textGreen, textPaleGray } from 'src/colors'
import moment from 'moment'

type OwnProps = {
  task: Task,
  toggleTask: () => void,
  deleteTask: () => void,
  openModal: (task: Task) => void,
}

export const TaskRow = (props: OwnProps) => {
  const { toggleTask, deleteTask, openModal, task } = props

  const rightButtons = [
    // <SwipedButton key={ '1' } color={ 'red' }>
    //   <SwipeButtonInnerView>
    //     <Ionicons
    //       name={ 'ios-notifications' }
    //       size={ 20 }
    //       style={ { color: 'white', padding: 2 } }
    //     />
    //     <SwipeButtonInnerText>{'お願い！'}</SwipeButtonInnerText>
    //   </SwipeButtonInnerView>
    // </SwipedButton>,

    // <SwipedButton key={ 'l-1' } color={ bgGreen }>
    //   <SwipeButtonInnerView>
    //     <SwipeButtonInnerText>{'🤔'}</SwipeButtonInnerText>
    //   </SwipeButtonInnerView>
    // </SwipedButton>,

    <SwipedButton key={ '2' } color={ 'red' } onPress={ deleteTask }>
      <SwipeButtonInnerView>
        <Ionicons
          name={ 'ios-trash' }
          size={ 20 }
          style={ { color: 'white', padding: 2 } }
        />
        <SwipeButtonInnerText>{'削除'}</SwipeButtonInnerText>
      </SwipeButtonInnerView>
    </SwipedButton>,
  ]

  return (
    <Swipeable rightButtons={ rightButtons }>
      <TouchableOpacity onPress={ openModal } onLongPress={ toggleTask }>
        <BothSide>
          <OuterRow>
            <Ionicons
              name={
                task.done
                  ? 'ios-checkmark-circle'
                  : 'ios-checkmark-circle-outline'
              }
              size={ 26 }
              style={ {
                color: task.done ? textGreen : textPaleGray,
                padding: 15,
              } }
            />
            <InnerRow>
              <Title>{task.title}</Title>
              {task.done ? (
                <Description>
                  {`${task.updatedBy || '(不明)'} さん ${moment(
                    task.updatedAt,
                  ).format('M/DD HH:mm') || ''}`}
                </Description>
              ) : (
                <Description>{task.description}</Description>
              )}
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
      </TouchableOpacity>
    </Swipeable>
  )
}

export default TaskRow
