// @flow

import styled from 'styled-components'
import { textGray } from 'src/colors'

export const FlexBothSide = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom-width: 0.5;
  border-bottom-color: #d6d7da;
  padding-right: 10px;
`

export const FlexRow = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 55px;
  flex-shrink: ${props => (props.fixed ? 0 : 1)}
  flex-grow: ${props => (props.fixed ? 0 : 1)}
`

export const FlexCol = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const Title = styled.Text`
  font-size: 16px;
  color: ${textGray};
  margin: 2px;
`

export const Description = styled.Text`
  font-size: 12px;
  margin: 2px;
`
