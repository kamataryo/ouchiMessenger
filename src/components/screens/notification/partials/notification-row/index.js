// @flow

import React from 'react'

// components
import { OuterRow, InnerRow, Title, BothSide, TitleWrap } from './styled'

import type { Notification } from 'src/types/notification'

type OwnProps = {
  notification: Notification,
  // removeMe: () => void,
}

export const NotificationRow = (props: OwnProps) => {
  const { notification } = props
  console.log(notification)
  return (
    <BothSide>
      <OuterRow>
        <InnerRow>
          <TitleWrap>
            <Title>{'aaa'}</Title>
          </TitleWrap>
        </InnerRow>
      </OuterRow>
    </BothSide>
  )
}

export default NotificationRow
