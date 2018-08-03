// @flow

import type { StoreState } from 'src/types/store'

import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

// comopnents
import TextInput from 'src/components/commons/text-input'
import { Header } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'
// import LottieView from 'lottie-react-native'

// HOCs
import tabBarIconHOC from 'src/hocs/tab-bar-icon'

// libs
import { Alert, Keyboard } from 'react-native'
import { updateEndpoint } from 'src/api'

// constants
import { createActions as createProfileActions } from 'src/reducers/profile'
import { bgGray, textGray } from 'src/colors'
import { headerTitleStyle, headerIcons } from 'src/styles'

const ProfileBackground = styled.View`
  background-color: ${bgGray};
  height: 100%;
`

const TextLine = styled.Text`
  text-align: center;
  padding-top: 20px;
  color: ${textGray};
`

type Props = {
  // stateProps
  username: string,
  deviceToken: string,
  // dispatchProps
  updateUsername: (username: string) => void,
}

type State = {
  editingUsername: string,
  edit: boolean,
}

export class Profile extends React.Component<Props, State> {
  /**
   * [navigationOptions description]
   * @type {{navigation: function}} args navigation args
   */
  static navigationOptions = () => {
    return {
      title: 'ユーザー',
      tabBarIcon: tabBarIconHOC('paw'),
    }
  }

  /**
   * constructor
   * @param  {object} props React props.
   * @return {void}
   */
  constructor(props: Props) {
    super(props)
    this.state = { editingUsername: '', edit: false }
  }

  /**
   * shouldComponentUpdate
   * @param  {object} nextProps next props
   * @param  {object} nextState next state
   * @return {boolean}          should component update
   */
  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return (
      this.props.username !== nextProps.username ||
      this.state.editingUsername !== nextState.editingUsername ||
      this.state.edit !== nextState.edit
    )
  }

  onFocus = () =>
    this.setState({
      ...this.state,
      editingUsername: this.props.username,
      edit: true,
    })

  onChange = (e: any) =>
    this.setState({ ...this.state, editingUsername: e.nativeEvent.text })

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
    const { editingUsername, edit } = this.state
    const { username } = this.props

    const displayUsername = editingUsername || username

    return (
      <ProfileBackground>
        <Header
          leftComponent={
            // an padding component 😭
            !!editingUsername && editingUsername !== username ? (
              <Ionicons
                name={ 'ios-checkmark' }
                size={ headerIcons.right.size }
                style={ { ...headerIcons.right.style, color: 'transparent' } }
              />
            ) : (
              void 0
            )
          }
          centerComponent={ {
            text: 'ユーザー',
            style: headerTitleStyle,
          } }
          rightComponent={
            !!editingUsername && editingUsername !== username ? (
              <Ionicons
                name={ 'ios-checkmark' }
                size={ headerIcons.right.size }
                style={ headerIcons.right.style }
                onPress={ this.onPress }
              />
            ) : (
              void 0
            )
          }
        />
        <TextInput
          onFocus={ this.onFocus }
          onChange={ this.onChange }
          value={ displayUsername }
          label={ 'お名前' }
          validationMessage={
            !edit || editingUsername !== ''
              ? false
              : '正しい名前を入力してください'
          }
        />
        {/* <LottieView
          source={ require('src/assets/lottie/paw-like.json') }
          autoPlay
          loop
        /> */}
        <TextLine>{'☀️タスクは毎朝3:00にリセットされます。'}</TextLine>
      </ProfileBackground>
    )
  }
}

/**
 * map state to props
 * @param  {object} state    state tree
 * @param  {object} ownProps own props
 * @return {object}          state props
 */
const mapStateToProps = (state: StoreState) => {
  return {
    username: state.profile.username,
    deviceToken: state.notification.deviceToken,
  }
}

const mapDispatchProps = (dispatch: any) => {
  return {
    updateUsername: username =>
      dispatch(createProfileActions.updateUsername(username)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchProps,
)(Profile)
