// @flow

import type { Node as ReactNode } from 'react'
import React from 'react'
import { View, Text, Animated, Dimensions } from 'react-native'

export type TouchSwipeOptions = {
  minimumSwipeableDistance?: number,
}

export type Props = {
  children: ReactNode,
}
export type State = {
  swiping: boolean,
  locationXFrom: number,
  offsetLeft: number,
}

export class TouchSwipe extends React.Component<Props, State> {
  /**
   * constructor
   * @param  {object} props React props.
   * @return {void}
   */
  constructor(props: Props) {
    super(props)
    this.state = {
      swiping: false,
      locationXFrom: -1,
      offsetLeft: new Animated.Value(0),
    }
  }

  /**
   * shouldComponentUpdate
   * @param  {object} nextProps next props
   * @param  {object} nextState next state
   * @return {boolean}          should component update
   */
  shouldComponentUpdate() {
    return true
  }

  onTouchStart = (e: any) =>
    this.setState({
      ...this.state,
      swiping: true,
      locationXFrom: e.nativeEvent.locationX,
    })

  onTouchMove = (e: any) => {
    const nextOffsetLeft = this.state.locationXFrom - e.nativeEvent.locationX
    if (nextOffsetLeft - this.state.offsetLeft === 0) {
      return
    }
    Animated.timing(this.state.offsetLeft, {
      toValue: nextOffsetLeft,
      duration: 10,
    }).start()
    // this.setState({
    //   ...this.state,
    //   offsetLeft: nextOffsetLeft,
    // })
  }

  onTouchEnd = (e: any) => {
    Animated.timing(this.state.offsetLeft, {
      toValue: 0,
      duration: 20,
    }).start()

    this.setState({
      ...this.state,
      swiping: false,
    })
  }

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    const Child = this.props.children
    return (
      <View>
        <Animated.View
          style={ {
            height: 50,
            width: '100%',
            borderWidth: 1,
            right: this.state.offsetLeft,
          } }
          onTouchStart={ this.onTouchStart }
          onTouchMove={ this.onTouchMove }
          onTouchEnd={ this.onTouchEnd }
        >
          {/* <Child /> */}
          <Text>{'center'}</Text>
        </Animated.View>
        {/* <Animated.View
          style={ {
            position: 'absolute',
            top: 0,
            height: 50,
            backgroundColor: 'red',
          } }
        >
          <Text style={ { color: 'white' } }>{'right'}</Text>
        </Animated.View> */}
      </View>
    )
  }
}

export default TouchSwipe
