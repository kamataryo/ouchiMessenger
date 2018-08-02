// @flow
import React from 'react'
import { connect } from 'react-redux'
import Modal from 'react-native-modal'
import Username from './username'
import styled from 'styled-components'
// import { createActions as createProfileActions } from '../../reducers/profile'
import { updateEndpoint } from 'src/api'

const Title = styled.Text`
  color: white;
  text-align: center;
  font-size: 18px;
`

type Props = {
  username: string,
  deviceToken: string,
  // updateUsername: (username: string) => void,
}

export class InitialModal extends React.Component<Props> {
  onChange = () => {
    const deviceToken = this.props.deviceToken

    updateEndpoint(deviceToken)
      .then(console.log)
      .catch(console.error)
  }
  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    const { username } = this.props
    return (
      <Modal isVisible={ !username }>
        <Title>{'お名前を教えてください'}</Title>
        <Username onChange={ this.onChange } />
      </Modal>
    )
  }
}

/**
 * map state to props
 * @param  {object} state    state tree
 * @param  {object} ownProps own props
 * @return {object}          state props
 */
const mapStateToProps = state => {
  return {
    username: state.profile.username,
    deviceToken: state.notification.deviceToken,
  }
}

/**
 * map dispatch to props
 * @param  {function} dispatch dispatcher
 * @param  {object}   ownProps own props
 * @return {object}            dispatch props
 */
// const mapDispatchToProps = dispatch => {
//   return {
// updateUsername: (username: string) =>
// dispatch(createProfileActions.updateUsername(username)),
//   }
// }

export default connect(
  mapStateToProps,
  // mapDispatchToProps,
)(InitialModal)
