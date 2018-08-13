// @flow
import React from 'react'
import { connect } from 'react-redux'
import TextInput from 'src/components/commons/text-input'
import { Button, View } from 'react-native'
import { createActions as createProfileActions } from 'src/reducers/profile'
import { Title } from '../styled'

// libs
import { Alert, Keyboard } from 'react-native'
import { updateEndpoint, signUp } from 'src/api'
import * as Keychain from 'react-native-keychain'

type Props = {
  // ownProps
  next: () => void,
  // stateProps
  deviceToken: string,
  // dispatchProps
  updateUsername: (username: string) => void,
}

type State = {
  email: string,
  username: string,
  password: string,
  error: | ''
    | 'UsernameExistsException'
    | 'InvalidPasswordException'
    | 'unknown',
}

const messages = {
  UsernameExistsException: 'そのユーザー名はすでに使用されています。',
  InvalidPasswordException:
    'パスワードは8文字以上を設定し、大文字と小文字のアルファベット、数字、記号の全てを含めてください。',
  unknown: '不明なエラーです。',
  '': '',
}

export class SignUp extends React.Component<Props, State> {
  static isEmailValid = (email: string) =>
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email,
    )

  static isUsernameValid = (username: string) => username.length > 0

  static isPasswordValid = (password: string) =>
    /^(?=.*?[a-z])(?=.*?\d)(?=.*?[!-/:-@[-`{-~])[!-~]{8,100}$/i.test(password)

  /**
   * constructor
   * @param  {object} props React props.
   * @return {void}
   */
  constructor(props: Props) {
    super(props)
    this.state = {
      email: '',
      username: '',
      password: '',
      error: '',
    }
  }

  createChangeHandler = (key: string) => (e: any) => {
    const value = e.nativeEvent.text
    this.setState({ ...this.state, [key]: value })
  }

  onPress = () => {
    Keyboard.dismiss()
    this.setState({ ...this.state, error: '' })
    const { email, username, password } = this.state

    // const deviceToken = this.props.deviceToken

    signUp(username, email, password)
      .then(() => {
        this.props.updateUsername(username)
        return Keychain.setGenericPassword(username, password)
      })
      .then(this.props.next)
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
    const { email, username, password, error } = this.state

    const isEmailValid = SignUp.isEmailValid(email)
    const isUsernameValid = SignUp.isUsernameValid(username)
    const isPasswordValid = SignUp.isPasswordValid(password)

    const ok = isEmailValid || isUsernameValid || isPasswordValid

    return (
      <View>
        <Title>{'ユーザー登録'}</Title>
        <TextInput
          onChange={ this.createChangeHandler('email') }
          value={ email }
          label={ 'メールアドレス' }
          keyboardType={ 'email-address' }
          validationMessage={
            !isEmailValid && '正しいメールアドレスを入力してください。'
          }
        />

        <TextInput
          onChange={ this.createChangeHandler('username') }
          value={ username }
          label={ 'ユーザー名' }
          validationMessage={
            error === 'UsernameExistsException' && messages[error]
          }
        />
        <TextInput
          onChange={ this.createChangeHandler('password') }
          value={ password }
          label={ 'パスワード' }
          secureTextEntry
          validationMessage={
            (error === 'InvalidPasswordException' || !isPasswordValid) &&
            messages[error]
          }
        />

        <Button onPress={ this.onPress } title={ 'OK' } disabled={ !ok } />
      </View>
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
)(SignUp)
