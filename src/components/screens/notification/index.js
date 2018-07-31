// @flow

import type { Notification } from 'src/types/notification'
import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

// compoennts
import { View, FlatList, Button } from 'react-native'
import { Header } from 'react-native-elements'
import NotificationRow from './partials/notification-row'
import tabBarIconHOC from 'src/hocs/tab-bar-icon'

// constants
import { BOTTOM_TAB_NAVIGATION_HEIGHT } from '../'
import { headerTitleStyle } from 'src/styles'
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

export class TaskScreen extends React.Component<Props> {
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
   * componentDidMount
   * @return {void}
   */
  // componentDidMount() {
  //   // NOTE: debugging
  //   this.props.addNotification(1)
  //   this.props.addNotification(2)
  // }

  // eslint-disable-next-line
  renderItem = ({ item, index }: { item: any, index: number }) => (
    <NotificationRow
      notification={ item.notification }
      // eslint-disable-next-line
      removeMe={() => this.props.removeNotification(index)}
    />
  )

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    const { notifications, clearNotifications } = this.props

    const listData = notifications.map((notification, index) => ({
      notification,
      key: index.toString(),
    }))

    return (
      <View>
        <Header
          centerComponent={ {
            text: 'お知らせ',
            style: headerTitleStyle,
          } }
        />
        <View style={ { paddingBottom: BOTTOM_TAB_NAVIGATION_HEIGHT } }>
          <FlatList data={ listData } renderItem={ this.renderItem } />
          {notifications.length > 0 ? (
            <Button title={ '全て既読にする' } onPress={ clearNotifications } />
          ) : (
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
