// @flow

import type { Notification } from 'src/types/notification'
import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

// compoennts
import Swipeable from 'react-native-swipeable'
// import TouchSwipe from 'src/components/commons/touch-swipe'
import { View, FlatList } from 'react-native'
import { Header } from 'react-native-elements'
import NotificationRow from './partials/notification-row'
import tabBarIconHOC from 'src/hocs/tab-bar-icon'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createRightButtons } from 'src/components/commons/swipe-buttons'

// libs
import { Alert } from 'react-native'

// constants
import { BOTTOM_TAB_NAVIGATION_HEIGHT } from '../'
import { headerTitleStyle, headerIcons } from 'src/styles'
import { createActions as createNotificationActions } from 'src/reducers/notification'
import { textGray } from 'src/colors'

const TextLine = styled.Text`
  text-align: center;
  padding-top: 20px;
  color: ${textGray};
`

type Props = {
  // StateProps
  notifications: Notification[],
  removeNotification: (index: number) => void,
  clearNotifications: () => void,
}

type State = {
  jesture: 'none' | 'swipe' | 'scroll',
  move: { x: number, y: number },
}

export class TaskScreen extends React.Component<Props, State> {
  /**
   * [navigationOptions description]
   * @type {{navigation: function}} args navigation args
   */
  static navigationOptions = () => {
    return {
      title: 'お知らせ',
      tabBarIcon: tabBarIconHOC(
        'notifications',
        state => state.notification.data.length,
      ),
    }
  }

  /**
   * constructor
   * @param  {object} props React props.
   * @return {void}
   */
  constructor(props: Props) {
    super(props)
    this.state = { jesture: 'none', move: { x: 0, y: 0 } }
  }

  /**
   * componentDidMount
   * @return {void}
   */
  componentDidMount() {
    // NOTE: debugging
    // this.props.addNotification(1)
    // this.props.addNotification(2)
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

  // eslint-disable-next-line
  renderItem = ({ item, index }: { item: any, index: number }) => (
    <Swipeable
      // swipeEnabled={ this.state.jesture === 'swipe' }
      rightButtons={ createRightButtons(() =>
        this.props.removeNotification(index),
      ) }
    >
      <NotificationRow notification={ item.notification } />
    </Swipeable>
  )

  tryClearNotifications = () => {
    Alert.alert('全てのお知らせを読みましたか？', '既読にして削除していい？', [
      {
        text: 'OK',
        onPress: this.props.clearNotifications,
      },
      { text: 'キャンセル' },
    ])
  }

  onWrapperTouchStart = (e: any) =>
    this.setState({
      ...this.state,
      move: { x: e.nativeEvent.locationX, y: e.nativeEvent.locationY },
    })

  onWrapperTouchMove = (e: any) => {
    const diffX = Math.abs(this.state.move.x - e.nativeEvent.locationX)
    const diffY = Math.abs(this.state.move.y - e.nativeEvent.locationY)
    const diff = Math.sqrt(diffX ** 2 + diffY ** 2)
    if (diff > 15 && this.state.jesture === 'none') {
      const jesture = diffX > diffY ? 'swipe' : 'scroll'
      this.setState({
        ...this.state,
        jesture,
      })
    }
  }

  onWrapperTouchEnd = () => {
    this.setState({
      ...this.state,
      jesture: 'none',
      move: { x: 0, y: 0 },
    })
  }

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    // const scrollEnabled = this.state.jesture === 'scroll'
    const { notifications } = this.props
    const listData = notifications.map((notification, index) => ({
      notification,
      key: index.toString(),
    }))

    return (
      <View
        onTouchStart={ this.onWrapperTouchStart }
        onTouchMove={ this.onWrapperTouchMove }
        onTouchEnd={ this.onWrapperTouchEnd }
      >
        <Header
          centerComponent={ {
            text: 'お知らせ',
            style: headerTitleStyle,
          } }
          rightComponent={
            notifications.length > 0 ? (
              <Ionicons
                name={ 'ios-checkmark' }
                size={ headerIcons.right.size }
                style={ headerIcons.right.style }
                onPress={ this.tryClearNotifications }
              />
            ) : (
              void 0
            )
          }
        />
        <View style={ { paddingBottom: BOTTOM_TAB_NAVIGATION_HEIGHT } }>
          <FlatList
            data={ listData }
            renderItem={ this.renderItem }
            // scrollEnabled={ scrollEnabled }
          />
          {notifications.length === 0 && (
            <TextLine>{'全てのメッセージを見ました。素晴らしい💖'}</TextLine>
          )}
        </View>
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
    notifications: state.notification.data,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    removeNotification: (index: number) =>
      dispatch(createNotificationActions.removeNotification(index)),
    clearNotifications: () =>
      dispatch(createNotificationActions.clearNotifications()),
    // NOTE: for Debug
    // addNotification: (notification: Notification) =>
    //   dispatch(createNotificationActions.addNotification(notification)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TaskScreen)
