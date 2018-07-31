// @flow

import type { Notification } from 'src/types/notification'

import React from 'react'
import { connect } from 'react-redux'
import { createActions as createNotificationActions } from 'src/reducers/notification'

import PushNotification, {
  PushNotificationIOS,
} from 'react-native-push-notification'

type Props = {
  // stateProps
  notifications: Notification[],
  // dispatchProps
  updateDeviceToken: (deviceToken: string) => void,
  addNotification: (notification: Notification) => void,
}

export class NotificationHandler extends React.Component<Props> {
  /**
   * componentDidMount
   * @return {void}
   */
  componentDidMount() {
    PushNotification.configure({
      onRegister: this.props.updateDeviceToken,

      onNotification: notification => {
        const currentBadgeNumber = this.props.notifications.length
        PushNotification.setApplicationIconBadgeNumber(currentBadgeNumber + 1)
        this.props.addNotification(notification)
        notification.finish(PushNotificationIOS.FetchResult.NoData)
      },
      // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
      // senderID: 'YOUR GCM (OR FCM) SENDER ID',
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    })
  }

  /**
   * shouldComponentUpdate
   * @param  {object} nextProps next props
   * @param  {object} nextState next state
   * @return {boolean}          should component update
   */
  shouldComponentUpdate() {
    return false
  }

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    return null
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
