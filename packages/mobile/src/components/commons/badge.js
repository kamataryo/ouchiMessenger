// @flow

import React from 'react'
import styled from 'styled-components'
import { badgeRed, textWhite } from 'src/colors'

const BadgeWrap = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  background-color: ${badgeRed};
  width: 16px;
  height: 16px;
  border-radius: 8px;
  top: 0;
  right: -12px;
`

const BadgeText = styled.Text`
  color: ${textWhite};
  text-align: center;
  font-size: 10px;
  padding-left: ${props => (props.offset ? '1px' : 0)};
`

export const Badge = ({ number }: { number: number }) => {
  const offset = number > 9
  const numberDisplay = offset ? '9+' : number.toString()
  return (
    <BadgeWrap>
      <BadgeText offset={ offset }>{numberDisplay}</BadgeText>
    </BadgeWrap>
  )
}

export default Badge
