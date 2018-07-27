// @flow

import styled from 'styled-components'
import { textGray } from '../../../colors'

export const OuterRow = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 55px;
  border-bottom-width: 0.5;
  border-bottom-color: #d6d7da;
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

export const Description = styled.Text`
  font-size: 12px;
  margin: 2px;
`

export const SwipedButton = styled.TouchableHighlight`
  height: 100%;
  background-color: ${props => props.color};
  padding: 0 10px;
`

export const SwipeButtonInnerView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const SwipeButtonInnerText = styled.Text`
  color: white;
  font-size: 16px;
`
