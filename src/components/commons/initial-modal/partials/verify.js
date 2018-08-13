// @flow

export type Props = {
  // ownProps
  next: () => void,
  // stateProps
  username: string,
}

export type State = {
  code: string,
}

import React from 'react'
import { connect } from 'react-redux'

// components
import { Title, Welcome } from '../styled'
import { View, Button } from 'react-native'
import TextInput from 'src/components/commons/text-input'

// libs
import { Keyboard } from 'react-native'
import { verify } from 'src/api'

export class Verify extends React.Component<Props, State> {
  static isValid = (code: string) => /^[0-9]{6}$/.test(code)

  /**
   * constructor
   * @param  {object} props React props.
   * @return {void}
   */
  constructor(props: Props) {
    super(props)
    this.state = { code: '' }
  }

  /**
   * shouldComponentUpdate
   * @param  {object} nextProps next props
   * @param  {object} nextState next state
   * @return {boolean}          should component update
   */
  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return this.state.code !== nextState.code
  }

  onChange = (e: any) =>
    this.setState({ ...this.state, code: e.nativeEvent.text })

  onPress = () => {
    const { username } = this.props
    const { code } = this.state

    Keyboard.dismiss()
    verify(username, code)
      .then(this.props.next)
      .catch(console.error)
  }

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    const { username } = this.props
    const { code } = this.state
    const isValid = Verify.isValid(code)

    return (
      <View>
        {username && <Welcome>{`ようこそ、${username}さん`}</Welcome>}
        <Title>{'検証コードを入力してください'}</Title>
        <TextInput
          label={ '検証コード' }
          value={ code }
          onChange={ this.onChange }
          keyboardType={ 'number-pad' }
        />
        <Button onPress={ this.onPress } title={ 'OK' } disabled={ !isValid } />
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
    username: state.profile.username,
  }
}

export default connect(mapStateToProps)(Verify)
