// @flow
import React from 'react'
import { connect } from 'react-redux'
import TextInput from 'src/components/commons/text-input'
import { Button, View } from 'react-native'
import { createActions as createProfileActions } from 'src/reducers/profile'
import { Title, TransitionButton } from '../styled'

// libs
import { Alert, Keyboard } from 'react-native'
import { updateEndpoint, login } from 'src/api'
import * as Keychain from 'react-native-keychain'

type Props = {
  // ownProps
  credentials: {
    username: string,
    password: string,
  },
  closeMe: () => void,
  toSignUp: () => void,

  // stateProps
  deviceToken: string,
  // dispatchProps
  updateUsername: (username: string) => void,
  updateAccessToken: (accessToken: string) => void,
}

type State = {
  username: string,
  password: string,
}

export class Login extends React.Component<Props, State> {
  /**
   * constructor
   * @param  {object} props React props.
   * @return {void}
   */
  constructor(props: Props) {
    super(props)
    this.state = {
      email: '',
      username: props.credentials.username,
      password: props.credentials.password,
    }
  }

  createChangeHandler = (key: string) => (e: any) => {
    const value = e.nativeEvent.text
    this.setState({ ...this.state, [key]: value })
  }

  onPress = () => {
    Keyboard.dismiss()

    const { username, password } = this.state

    // const deviceToken = this.props.deviceToken

    login(username, password)
      .then(accessToken => {
        this.props.updateUsername(username)
        this.props.updateAccessToken(accessToken)
        return Keychain.setGenericPassword(username, password)
      })
      .then(this.props.closeMe)
      .catch(() => Alert.alert('通信エラー', 'ごめんだにゃん 😹'))

    // updateEndpoint(deviceToken)
    //   .then(() => this.props.updateUsername(nextUsername))
    //   .catch(() => Alert.alert('通信エラー', 'ごめんね😿'))
  }

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    const { username, password } = this.state

    return (
      <View>
        <Title>{'ログイン'}</Title>

        <TextInput
          onChange={ this.createChangeHandler('username') }
          value={ username }
          label={ 'ユーザー名' }
        />

        <TextInput
          onChange={ this.createChangeHandler('password') }
          value={ password }
          label={ 'パスワード' }
          secureTextEntry
        />

        <Button onPress={ this.onPress } title={ 'OK' } />
        <TransitionButton
          onPress={ this.props.toSignUp }
          title={ '新規ユーザー登録' }
        />
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
    updateAccessToken: (accessToken: string) =>
      dispatch(createProfileActions.updateAccessToken(accessToken)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login)
