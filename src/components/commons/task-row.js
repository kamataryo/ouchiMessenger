// @flow

import React from 'react'

import { View, TouchableOpacity } from 'react-native'
import Swipeable from 'react-native-swipeable'
import styled from 'styled-components'
import Ionicons from 'react-native-vector-icons/Ionicons'

import type { Task } from '../../types/task'
import { textGreen, textGray, textPaleGray } from '../../colors'

type Props = {
  task: Task,
  toggleTask: () => void,
  deleteTask: () => void,
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
  justify-content: space-between;
`

const Title = styled.Text`
  font-size: 16px;
  color: ${textGray};
  margin: 2px;
`

const Description = styled.Text`
  font-size: 12px;
  margin: 2px;
`

const SwipedButton = styled.TouchableHighlight`
  height: 100%;
  background-color: ${props => props.color};
  padding: 0 10px;
`

const SwipeButtonInnerView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const SwipeButtonInnerText = styled.Text`
  color: white;
  font-size: 16px;
`

export const TaskRow = (props: Props) => {
  const { task, toggleTask, deleteTask } = props

  const rightButtons = [
    <SwipedButton key={ '1' } color={ 'red' }>
      <SwipeButtonInnerView>
        <Ionicons
          name={ 'ios-notifications' }
          size={ 20 }
          style={ { color: 'white', padding: 2 } }
        />
        <SwipeButtonInnerText>{'お願い！'}</SwipeButtonInnerText>
      </SwipeButtonInnerView>
    </SwipedButton>,
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
              <Description>{task.description}</Description>
            </InnerRow>
          </OuterRow>
        </View>
      </TouchableOpacity>
    </Swipeable>
  )
}

export default TaskRow
