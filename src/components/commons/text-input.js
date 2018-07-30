// @flow

import React from 'react'
import { View } from 'react-native'
import { FormLabel, FormInput } from 'react-native-elements'

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
  shouldComponentUpdate(nextProps: Props) {
    return this.props.value !== nextProps.value
  }

  onChangeText = (value: string) => this.setState({ ...this.state, value })

  onBlur = () => this.props.onChange(this.state.value)

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    const { value } = this.state
    const { label, color } = this.props

    return (
      <View>
        <FormLabel>{label}</FormLabel>
        <FormInput
          value={ value }
          onChangeText={ this.onChangeText }
          onBlur={ this.onBlur }
          inputStyle={ color ? { color } : void 0 }
        />
      </View>
    )
  }
}

export default TextInput
