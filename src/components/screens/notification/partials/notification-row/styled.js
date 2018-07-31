// @flow

import styled from 'styled-components'
import { textGray } from 'src/colors'

export const TitleWrap = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: baseline;
`

export const BothSide = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom-width: 0.5;
  border-bottom-color: #d6d7da;
`

export const OuterRow = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 55px;
`

export const InnerRow = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const Title = styled.Text`
  font-size: 16px;
  color: ${textGray};
  margin: 2px;
`
