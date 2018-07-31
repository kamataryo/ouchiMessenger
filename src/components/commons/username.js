// @flow

import React from 'react'
import { connect } from 'react-redux'
import TextInput from './text-input'

// action creators
import { createActions as createProfileActions } from '../../reducers/profile'

type OwnProps = {
  onChange?: (username: string) => void,
  color?: string,
}

type StateProps = {
  username: string,
}

type DispatchProps = {
  update: (username: string) => void,
}

type Props = {
  ...$Exact<OwnProps>,
  ...$Exact<StateProps>,
  ...$Exact<DispatchProps>,
}

export const Username = (props: Props) => {
  const { username, update, color } = props
  return (
    <TextInput
      label={ 'お名前' }
      value={ username }
      onChange={ update }
      color={ color }
      disabled={ username === '' }
    />
  )
}

export const mapStateToProps = (state: any) => ({
  username: state.profile.username,
})

export const mapDispatchToProps = (dispatch: any, ownProps: OwnProps) => ({
  update: (username: string) => {
    dispatch(createProfileActions.updateUsername(username))
    typeof ownProps.onChange === 'function' && ownProps.onChange(username)
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Username)
