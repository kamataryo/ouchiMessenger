// @flow

import React from 'react'
import Modal from 'react-native-modal'
import SignUp from './partials/sign-up'
import Verify from './partials/verify'
import * as Keychain from 'react-native-keychain'

type Props = {}

type State = {
  step: number,
  isVisible: boolean,
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
      step: 0,
      isVisible: false, // TODO: handle with keychain
    }
  }

  /**
   * componentDidMount
   * @return {void}
   */
  componentDidMount() {
    Keychain.getGenericPassword().then(credentials => {
      if (!credentials) {
        this.setState({ ...this.state, isVisible: true })
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
      this.state.step !== nextState.step ||
      this.state.isVisible !== nextState.isVisible
    )
  }

  next = () => {
    if (this.state.step === 1) {
      this.setState({ ...this.state, isVisible: false })
    } else {
      this.setState({ ...this.state, step: this.state.step + 1 })
    }
  }

  prev = () => {
    if (this.state.step > 0) {
      this.setState({ ...this.state, step: this.state.step - 1 })
    }
  }

  renderItem = (index: number) => {
    if (index === 0) {
      return <SignUp next={ this.next } />
    } else {
      return <Verify next={ this.next } />
    }
  }

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    const { step, isVisible } = this.state
    return <Modal isVisible={ isVisible }>{this.renderItem(step)}</Modal>
  }
}

export default InitialModal
