// @flow

import React from 'react'
import { connect } from 'react-redux'
import TextInput from './text-input'

// action creators
import { createActions as createProfileActions } from '../../reducers/profile'

type OwnProps = {}

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
  const { username, update } = props
  return <TextInput label={ 'お名前' } value={ username } onChange={ update } />
}

export const mapStateToProps = (state: any) => ({
  username: state.profile.username,
})

export const mapDispatchToProps = (dispatch: any) => ({
  update: (username: string) =>
    dispatch(createProfileActions.updateUsername(username)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Username)
