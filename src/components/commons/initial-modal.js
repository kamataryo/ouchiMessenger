// @flow
import React from 'react'
import { connect } from 'react-redux'
import Modal from 'react-native-modal'
import TextInput from 'src/components/commons/text-input'
import { Button } from 'react-native'
import styled from 'styled-components'
import { createActions as createProfileActions } from 'src/reducers/profile'

// libs
import { Alert, Keyboard } from 'react-native'
import { updateEndpoint, signUp } from 'src/api'

// constants
import { textWhite } from 'src/colors'

const Title = styled.Text`
  color: ${textWhite};
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
  error: | ''
    | 'UsernameExistsException'
    | 'InvalidPasswordException'
    | 'unknown',
}

const messages = {
  UsernameExistsException: 'その名前はすでに登録されています。',
  InvalidPasswordException:
    'パスワードには大文字と小文字のアルファベット、数字、記号を含めてください。',
  unknown: '不明なエラーです。',
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
      error: '',
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

    signUp('username2', 'mugil.cephalus@gmail.com', 'Password123!')
      .then(console.log)
      .catch(err => {
        if (err.code === 'UsernameExistsException') {
          this.setState({ ...this.state, error: 'UsernameExistsException' })
        } else if (err.code === 'InvalidPasswordException') {
          this.setState({ ...this.state, error: 'InvalidPasswordException' })
        } else {
          console.error(err)
          this.setState({ ...this.state, error: 'unknown' })
        }
      })

    // updateEndpoint(deviceToken)
    //   .then(() => this.props.updateUsername(nextUsername))
    //   .catch(() => Alert.alert('通信エラー', 'ごめんね😿'))
  }

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    const { editingUsername, error } = this.state
    const { username } = this.props

    const displayUsername = editingUsername || username

    return (
      <Modal isVisible={ true || !username }>
        <Title>{'ユーザー登録'}</Title>
        <TextInput
          onFocus={ this.onFocus }
          onChange={ this.onChange }
          value={ displayUsername }
          label={ 'メールアドレス' }
          // validationMessage={ error === 'UsernameExistsException' && messages[error] }
        />

        <TextInput
          onFocus={ this.onFocus }
          onChange={ this.onChange }
          value={ displayUsername }
          label={ 'ユーザー名' }
          validationMessage={
            error === 'UsernameExistsException' && messages[error]
          }
        />
        <TextInput
          onFocus={ this.onFocus }
          onChange={ this.onChange }
          value={ displayUsername }
          label={ 'パスワード' }
          validationMessage={
            error === 'InvalidPasswordException' && messages[error]
          }
        />

        <Button onPress={ this.onPress } title={ 'OK' } />
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
