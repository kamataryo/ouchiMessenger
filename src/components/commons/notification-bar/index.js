// @flow

import React from 'react'
import { Animated } from 'react-native'
import styled from 'styled-components'

import { textWhite, accent } from 'src/colors'

const InnerText = styled.Text`
  color: ${textWhite};
`

type Props = {
  notification: {
    title: string,
  },
}

type State = {
  height: number,
}

export class NotificationBar extends React.Component<Props, State> {
  /**
   * constructor
   * @param  {object} props React props.
   * @return {void}
   */
  constructor(props: Props) {
    super(props)
    this.state = {
      height: new Animated.Value(0),
    }
  }

  /**
   * componentDidMount
   * @return {void}
   */
  componentDidMount() {
    this.showMe().then(this.hideMe)
  }

  /**
   * shouldComponentUpdate
   * @param  {object} nextProps next props
   * @param  {object} nextState next state
   * @return {boolean}          should component update
   */
  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return this.state.height !== nextState.height
  }

  showMe = () =>
    new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          Animated.timing(this.state.height, {
            toValue: 50,
            duration: 200,
          }).start()
          resolve()
        }, 0)
      } catch (e) {
        reject(e)
      }
    })

  hideMe = () =>
    new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          Animated.timing(this.state.height, {
            toValue: 0,
            duration: 200,
          }).start()
          resolve()
        }, 3000)
      } catch (e) {
        reject(e)
      }
    })

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    const wrapStyle = {
      position: 'absolute',
      bottom: 0,
      height: this.state.height,
      width: '100%',
      backgroundColor: accent,
      dislay: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingLeft: 20,
      paddingRight: 20,
    }

    const {
      notification: { title },
    } = this.props

    return (
      <Animated.View style={ wrapStyle }>
        <InnerText>{title}</InnerText>
      </Animated.View>
    )
  }
}

export default NotificationBar
