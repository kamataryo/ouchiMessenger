// @flow

// Graceful patch by @watanabe_yu
// http://watanabeyu.blogspot.com/2018/04/react-native0542textinputonchangetext.html
// https://gist.github.com/watanabeyu/ccf59b069987494a03a5f24d005a9857import React from 'react'

import React from 'react'
import { View, TextInput as NativeInput } from 'react-native'
import { FormLabel, FormValidationMessage } from 'react-native-elements'

type Props = {
  value: string,
  label: string,
  color: string,
  onFocus: () => void,
  validationMessage: false | string,
}

type State = {
  value: string,
  refresh: boolean,
}

export default class TextInput extends React.Component<Props, State> {
  /**
   * defaultProps
   * @type {object}
   */
  static defaultProps = {
    onFocus: (x: any) => x,
    color: '#86939e',
    validationMessage: false,
  }

  constructor(props: Props) {
    super(props)
    this.state = {
      value: this.props.value,
      refresh: false,
    }
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    if (this.state.value !== nextState.value) {
      return false
    }

    return true
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.value !== this.props.value && this.props.value === '') {
      // eslint-disable-next-line  react/no-did-update-set-state
      this.setState({ value: '', refresh: true }, () =>
        this.setState({ refresh: false }),
      )
    }
  }

  nativeInput: any

  onFocus = () => {
    this.nativeInput.focus()
    this.props.onFocus()
  }

  render() {
    if (this.state.refresh) {
      return null
    }

    return (
      <View>
        <FormLabel>{this.props.label}</FormLabel>
        <NativeInput
          { ...this.props }
          ref={ ref => (this.nativeInput = ref) }
          value={ this.state.value }
          onFocus={ this.onFocus }
          style={ {
            minHeight: 36,
            marginLeft: 20,
            marginRight: 20,
            paddingBottom: 3,
            borderBottomColor: '#bdc6cf',
            borderBottomWidth: 1,
            color: this.props.color,
            fontSize: 16,
          } }
        />
        <FormValidationMessage>
          {this.props.validationMessage}
        </FormValidationMessage>
      </View>
    )
  }
}
