// @flow

import React from 'react'
import { View, Keyboard } from 'react-native'
import { FormLabel, FormInput } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { textGreen, textRed } from 'src/colors'
import styled from 'styled-components'

type OwnProps = {
  label: string,
  value: string,
  onChange: (value: string) => void,
  color?: string,
}

type Props = {
  ...$Exact<OwnProps>,
}

type State = {
  value: string,
}

const TouchableIconWrap = styled.TouchableOpacity`
  position: absolute;
  right: 20px;
  top: 20px;
`

export class TextInput extends React.Component<Props, State> {
  /**
   * constructor
   * @param  {object} props React props.
   * @return {void}
   */
  constructor(props: Props) {
    super(props)
    this.state = { value: props.value }
  }

  /**
   * shouldComponentUpdate
   * @param  {object} nextProps next props
   * @param  {object} nextState next state
   * @return {boolean}          should component update
   */
  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return (
      this.props.value !== nextProps.value ||
      this.state.value !== nextState.value
    )
  }

  // ref
  Input: any

  onChangeText = (value: string) => this.setState({ ...this.state, value })

  onBlur = () => this.props.onChange(this.state.value)

  onIconTap = () => {
    this.Input.blur()
    Keyboard.dismiss()
  }

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    const { value } = this.state
    const { label, color } = this.props

    const disabled = !value

    return (
      <View>
        <FormLabel>{label}</FormLabel>
        <FormInput
          ref={ ref => (this.Input = ref) }
          value={ value }
          onChangeText={ this.onChangeText }
          onBlur={ this.onBlur }
          inputStyle={ color ? { color } : void 0 }
        />
        <TouchableIconWrap onPress={ this.onIconTap } disabled={ disabled }>
          <Ionicons
            name={ disabled ? 'ios-close' : 'ios-checkmark' }
            size={ 30 }
            style={ { color: disabled ? textRed : textGreen, padding: 15 } }
          />
        </TouchableIconWrap>
      </View>
    )
  }
}

export default TextInput
