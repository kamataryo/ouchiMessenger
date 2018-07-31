// @flow

import React from 'react'

// components
import { Button } from 'react-native'
import { OuterRow, InnerRow, Title, BothSide, TitleWrap } from './styled'

import type { Notification } from 'src/types/notification'

type OwnProps = {
  notification: Notification,
  removeMe: () => void,
}

export const NotificationRow = (props: OwnProps) => {
  const { notification, removeMe } = props

  return (
    <BothSide>
      <OuterRow>
        <InnerRow>
          <TitleWrap>
            <Title>{'aaa'}</Title>
          </TitleWrap>
        </InnerRow>
      </OuterRow>
      <Button title={ '既読にする' } onPress={ removeMe } />
    </BothSide>
  )
}

export default NotificationRow
