// @flow

import React from 'react'
import { connect } from 'react-redux'
import { Header } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { headerTitleStyle, headerIcons } from 'src/styles'

// action creators
import { createActions as createModalActions } from 'src/reducers/modal'

export type Props = {
  // ownProps
  toggleMode: () => void,
  mode: 'description' | 'priority',
  // dispatchProps
  openModal: () => void,
}

export const TaskHeader = (props: Props) => {
  const { openModal, mode, toggleMode } = props

  const headerTitle =
    mode === 'description'
      ? 'お仕事'
      : mode === 'priority'
        ? 'お仕事（優先度）'
        : '(不明)'

  return (
    <Header
      leftComponent={
        <Ionicons
          name={ mode === 'description' ? 'ios-swap' : 'ios-list' }
          size={ headerIcons.left.size }
          style={ headerIcons.left.style }
          onPress={ toggleMode }
        />
      }
      centerComponent={ {
        text: headerTitle,
        style: headerTitleStyle,
      } }
      rightComponent={
        <Ionicons
          name={ mode === 'sort' ? 'ios-checkmark' : 'ios-add' }
          size={ headerIcons.right.size }
          style={ headerIcons.right.style }
          onPress={ openModal }
        />
      }
    />
  )
}

const mapDispatchToProps = (dispatch: any) => ({
  openModal: () => dispatch(createModalActions.openEmpty()),
})

export default connect(
  void 0,
  mapDispatchToProps,
)(TaskHeader)
