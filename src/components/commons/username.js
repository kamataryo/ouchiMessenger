// @flow

import React from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { FormLabel, FormInput } from 'react-native-elements'

// action creators
import { createActions as createProfileActions } from '../../reducers/profile'

type Props = {
  // stateProps
  username: string,
  // dispatchProps
  update: (username: string) => void,
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

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    const { username, update } = this.props
    return (
      <View>
        <FormLabel>{'お名前'}</FormLabel>
        <FormInput
          value={ username }
          onTextInput={ e => update(e.nativeEvent.text) }
        />
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
