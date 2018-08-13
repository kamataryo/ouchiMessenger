// @flow

import type { StoreState } from 'src/types/store'

import React from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import Modal from 'react-native-modal'
import SignUp from './partials/sign-up'
import Verify from './partials/verify'
import Login from './partials/login'
import * as Keychain from 'react-native-keychain'
import { createActions as createProfileActions } from 'src/reducers/profile'

type Props = {
  // stateProps
  isVisible: boolean,
  // dispatchProps
  closeInitialModal: () => void,
}

type Mode = 'sign-up' | 'login' | 'verify' | 'none'

type State = {
  mode: Mode,
  credentials: {
    password: string,
    username: string,
  },
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
      mode: 'none',
      credentials: {
        password: '',
        username: '',
      },
    }
  }

  /**
   * componentDidMount
   * @return {void}
   */
  componentDidMount() {
    Keychain.getGenericPassword().then(credentials => {
      if (credentials) {
        this.setState({ ...this.state, mode: 'login', credentials })
      } else {
        this.setState({ ...this.state, mode: 'sign-up' })
      }
    })
  }

  /**
   * shouldComponentUpdate
   * @param  {object} nextProps next props
   * @param  {object} nextState next state
   * @return {boolean}          should component update
   */
  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return (
      this.state.mode !== nextState.mode ||
      this.props.isVisible !== nextProps.isVisible
    )
  }

  toggleMode = (mode: Mode) => this.setState({ ...this.state, mode })

  toSignUp = () => this.toggleMode('sign-up')
  toLogin = () => this.toggleMode('login')
  toVerify = () => this.toggleMode('verify')

  renderItem = (mode: Mode) => {
    const { credentials } = this.state
    if (mode === 'none') {
      return <View />
    } else if (mode === 'sign-up') {
      return <SignUp toLogin={ this.toLogin } toVerify={ this.toVerify } />
    } else if (mode === 'verify') {
      return (
        <Verify
          toSignUp={ this.toSignUp }
          closeMe={ this.props.closeInitialModal }
        />
      )
    } else if (mode === 'login') {
      return (
        <Login
          toSignUp={ this.toSignUp }
          credentials={ credentials }
          closeMe={ this.props.closeInitialModal }
        />
      )
    } else {
      return <View />
    }
  }

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    const { isVisible } = this.props
    const { mode } = this.state
    return <Modal isVisible={ isVisible }>{this.renderItem(mode)}</Modal>
  }
}

/**
 * map state to props
 * @param  {object} state    state tree
 * @param  {object} ownProps own props
 * @return {object}          state props
 */
const mapStateToProps = (state: StoreState) => {
  console.log(state.profile.isInitialModalVisible)
  return {
    isVisible: state.profile.isInitialModalVisible,
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
    closeInitialModal: () =>
      dispatch(createProfileActions.toggleInitialModalVisibility(false)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InitialModal)
