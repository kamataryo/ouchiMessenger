// @flow

import type { Notification } from 'src/types/notification'

import React from 'react'
import { connect } from 'react-redux'
import { createActions as createNotificationActions } from 'src/reducers/notification'

import NotificationBar from 'src/components/commons/notification-bar'

import PushNotification from 'react-native-push-notification'
import { PushNotificationIOS, AppState } from 'react-native'
/* eslint-disable import/default */
// $FlowFixMe
import DeviceInfo from 'react-native-device-info'
// $FlowFixMe
import { DUMMY_ACCESS_TOKEN } from '../../../.env'
/* eslint-enable import/default */

type Props = {
  // stateProps
  notifications: Notification[],
  // dispatchProps
  updateDeviceToken: (deviceToken: string) => void,
  addNotification: (notification: Notification) => void,
}

type State = {
  foregroundNotifications: { [string]: { id: string } },
}

export class NotificationHandler extends React.Component<Props, State> {
  /**
   * constructor
   * @param  {object} props React props.
   * @return {void}
   */
  constructor(props: Props) {
    super(props)
    this.state = { foregroundNotifications: {} }
  }

  /**
   * componentDidMount
   * @return {void}
   */
  componentDidMount() {
    PushNotification.configure({
      onRegister: ({ token }) => {
        // NOTE: Did it called with Emulator?
        this.props.updateDeviceToken(token || DUMMY_ACCESS_TOKEN)
      },

      onNotification: notification => {
        if (notification.foreground) {
          const currentBadgeNumber = this.props.notifications.length
          PushNotification.setApplicationIconBadgeNumber(currentBadgeNumber + 1)
          this.props.addNotification(notification.message)

          // toggle foreground notify components
          const { id } = notification

          this.setState(
            {
              ...this.state,
              foregroundNotifications: {
                ...this.state.foregroundNotifications,
                [id]: notification.message,
              },
            },
            () => {
              const nextForegroundnotifications = {
                ...this.state.foregroundNotifications,
              }
              delete nextForegroundnotifications[id]
              setTimeout(() => {
                this.setState({
                  ...this.state,
                  foregroundNotifications: nextForegroundnotifications,
                })
              }, 10000)
            },
          )
        }

        notification.finish(PushNotificationIOS.FetchResult.NoData)
      },
      // senderID: 'YOUR GCM (OR FCM) SENDER ID',
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    })

    if (DeviceInfo.isEmulator()) {
      this.props.updateDeviceToken(DUMMY_ACCESS_TOKEN)
    }

    // set handler to process notifications reached when app is in background
    AppState.addEventListener('change', this.handleAppStateChange)
  }

  /**
   * shouldComponentUpdate
   * @param  {object} nextProps next props
   * @param  {object} nextState next state
   * @return {boolean}          should component update
   */
  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return (
      this.props.notifications !== nextProps.notifications ||
      this.state.foregroundNotifications !== nextState.foregroundNotifications
    )
  }

  /**
   * componentDidUpdate
   * @param  {object} prevProps prev props
   * @param  {object} prevState prev state
   * @param  {object} snapshot  snapshot
   * @return {void}
   */
  componentDidUpdate() {
    const currentBadgeNumber = this.props.notifications.length
    PushNotification.setApplicationIconBadgeNumber(currentBadgeNumber)
  }

  /**
   * componentWillUnmount
   * @return {void}
   */
  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange)
  }

  handleAppStateChange = (nextState: string) => {
    if (nextState === 'active') {
      PushNotificationIOS.getDeliveredNotifications(
        notifications =>
          notifications &&
          notifications.forEach(({ userInfo }) =>
            this.props.addNotification(userInfo.aps.alert),
          ),
      )
      PushNotificationIOS.removeAllDeliveredNotifications()
    }
  }

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    const foregroundNotifications = Object.values(
      this.state.foregroundNotifications,
    )

    // $FlowFixMe
    return foregroundNotifications.map(notification => (
      // $FlowFixMe
      <NotificationBar key={ notification.id } notification={ notification } />
    ))
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

/**
 * map dispatch to props
 * @param  {function} dispatch dispatcher
 * @param  {object}   ownProps own props
 * @return {object}            dispatch props
 */
const mapDispatchToProps = (dispatch: any) => {
  return {
    updateDeviceToken: deviceToken =>
      dispatch(createNotificationActions.updateDeviceToken(deviceToken)),
    addNotification: notification =>
      dispatch(createNotificationActions.addNotification(notification)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotificationHandler)
