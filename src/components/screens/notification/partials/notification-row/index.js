// @flow

import React from 'react'

// components
import { FlexRow, FlexCol, Title, FlexBothSide, Description } from './styled'
import Ionicons from 'react-native-vector-icons/Ionicons'

import type { Notification } from 'src/types/notification'

import moment from 'moment'

type OwnProps = {
  notification: Notification,
  // removeMe: () => void,
}

export const NotificationRow = (props: OwnProps) => {
  const {
    notification: { title, data: { updatedBy, updatedAt } = {} },
  } = props
  const description = [
    `${updatedBy || '(不明)'} さん`,
    updatedAt ? moment(updatedAt).format('M/DD HH:mm') : false,
  ]
    .filter(x => !!x)
    .join(' ')

  return (
    <FlexBothSide>
      <FlexRow>
        <Ionicons name={ 'ios-star-outline' } size={ 26 } style={ { padding: 15 } } />
        <FlexCol>
          <Title numberOfLines={ 1 } ellipsizeMode={ 'tail' }>
            {title}
          </Title>
          <Description numberOfLines={ 1 } ellipsizeMode={ 'tail' }>
            {description}
          </Description>
        </FlexCol>
      </FlexRow>
      <FlexRow fixed>
        {/*
        <Ionicons
          name={ 'ios-trash' }
          size={ 26 }
          style={ { color: 'red', padding: 15 } }
        /> */}
      </FlexRow>
    </FlexBothSide>
  )
}

export default NotificationRow
