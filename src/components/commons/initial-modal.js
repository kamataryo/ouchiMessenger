// @flow
import React from 'react'
import { connect } from 'react-redux'
import Modal from 'react-native-modal'
import TextInput from 'src/components/commons/text-input'
import { Button } from 'react-native'
import styled from 'styled-components'
import { createActions as createProfileActions } from '../../reducers/profile'
import { updateEndpoint } from 'src/api'

// libs
import { Alert, Keyboard } from 'react-native'

const Title = styled.Text`
  color: white;
  text-align: center;
  font-size: 18px;
`

type Props = {
  // stateProps
  username: string,
  deviceToken: string,
  // dispatchProps
  updateUsername: (username: string) => void,
}

type State = {
  avoidInitialValidationMessage: boolean,
  editingUsername: string,
  edit: boolean,
}

export class InitialModal extends React.Component<Props, State> {
  /**
   * constructor
   * @param  {object} props React props.
   * @return {void}
   */
  constructor(props: Props) {
    super(props)
    this.state = {
      avoidInitialValidationMessage: true,
      editingUsername: '',
      edit: false,
    }
  }

  onFocus = () => {
    const { username } = this.props
    this.setState({ ...this.state, editingUsername: username, edit: true })
  }

  onChange = (e: any) =>
    this.setState({
      ...this.state,
      editingUsername: e.nativeEvent.text,
      avoidInitialValidationMessage: false,
    })

  onPress = () => {
    Keyboard.dismiss()
    const nextUsername = this.state.editingUsername
    this.setState({ ...this.state, editingUsername: '', edit: false })

    const deviceToken = this.props.deviceToken

    updateEndpoint(deviceToken)
      .then(() => this.props.updateUsername(nextUsername))
      .catch(() => {
        Alert.alert('通信エラー', 'ごめんね😿')
      })
  }

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    const { avoidInitialValidationMessage, editingUsername, edit } = this.state
    const { username } = this.props

    const displayUsername = editingUsername || username

    return (
      <Modal isVisible={ !username }>
        <Title>{'お名前を教えてください'}</Title>
        <TextInput
          onFocus={ this.onFocus }
          onChange={ this.onChange }
          value={ displayUsername }
          label={ 'お名前' }
          validationMessage={
            avoidInitialValidationMessage || !edit || editingUsername !== ''
              ? false
              : '正しい名前を入力してください'
          }
        />
        <Button
          onPress={ this.onPress }
          title={ 'OK' }
          disabled={ !editingUsername || editingUsername === username }
        />
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
const mapDispatchToProps = (dispatch: any) => {
  return {
    updateUsername: (username: string) =>
      dispatch(createProfileActions.updateUsername(username)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InitialModal)
