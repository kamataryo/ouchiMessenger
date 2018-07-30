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
  // toggleMode: () => void,
  mode: 'normal' | 'sort',
  // dispatchProps
  openModal: () => void,
}

export const TaskHeader = (props: Props) => {
  const { openModal, mode } = props

  const headerTitle =
    mode === 'normal'
      ? 'お仕事'
      : mode === 'sort'
        ? 'お仕事（並べ替え）'
        : '(不明)'

  return (
    <Header
      leftComponent={
        <Ionicons
          name={ mode === 'sort' ? 'ios-list' : 'ios-shuffle' }
          size={ headerIcons.left.size }
          style={ { ...headerIcons.left.style, color: 'transparent' } }
          //     onPress={ toggleMode }
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
          onPress={ mode === 'sort' ? () => {} : openModal }
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
