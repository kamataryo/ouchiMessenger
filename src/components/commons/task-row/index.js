// @flow

import React from 'react'

import { View, TouchableOpacity } from 'react-native'
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
} from './styled'

import type { Task } from '../../../types/task'
import { textGreen, textPaleGray } from '../../../colors'

type OwnProps = {
  task: Task,
  toggleTask: () => void,
  deleteTask: () => void,
}

export const TaskRow = (props: OwnProps) => {
  const { task, toggleTask, deleteTask } = props

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
      <TouchableOpacity onPress={ toggleTask }>
        <View>
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
                  {`${task.updatedBy || '(不明)'} さん ${task.updatedAt || ''}`}
                </Description>
              ) : (
                <Description>{task.description}</Description>
              )}
            </InnerRow>
          </OuterRow>
        </View>
      </TouchableOpacity>
    </Swipeable>
  )
}

export default TaskRow
