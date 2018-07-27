// @flow

import React from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { FormLabel, FormInput } from 'react-native-elements'

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

export class Username extends React.Component<Props> {
  /**
   * shouldComponentUpdate
   * @param  {object} nextProps next props
   * @param  {object} nextState next state
   * @return {boolean}          should component update
   */
  shouldComponentUpdate(nextProps: Props) {
    return this.props.username !== nextProps.username
  }

  onTextInput = (e: any) => this.props.update(e.nativeEvent.text)

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    const { username } = this.props
    return (
      <View>
        <FormLabel>{'お名前'}</FormLabel>
        <FormInput value={ username } onTextInput={ this.onTextInput } />
      </View>
    )
  }
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
