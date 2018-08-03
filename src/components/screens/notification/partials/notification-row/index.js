// @flow

import React from 'react'

// components
import {
  OuterRow,
  InnerRow,
  Title,
  BothSide,
  TitleWrap,
  Description,
} from './styled'
import Ionicons from 'react-native-vector-icons/Ionicons'

import type { Notification } from 'src/types/notification'

import moment from 'moment'

type OwnProps = {
  notification: Notification,
  // removeMe: () => void,
}

export const NotificationRow = (props: OwnProps) => {
  const {
    notification: {
      title,
      data: { updatedBy, updatedAt },
    },
  } = props
  const description = `${updatedBy || '(不明)'} さん ${moment(updatedAt).format(
    'M/DD HH:mm',
  ) || ''}`

  return (
    <BothSide>
      <OuterRow>
        <Ionicons name={ 'ios-star-outline' } size={ 26 } style={ { padding: 15 } } />
        <InnerRow>
          <TitleWrap>
            <Title>{title}</Title>
          </TitleWrap>
          <Description>{description}</Description>
        </InnerRow>
      </OuterRow>
      {/* <Ionicons
        name={ 'ios-trash' }
        size={ 26 }
        style={ { color: textRed, padding: 15 } }
        onPress={ removeMe }
      /> */}
    </BothSide>
  )
}

export default NotificationRow
