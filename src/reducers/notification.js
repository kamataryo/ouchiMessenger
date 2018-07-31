// @flow

// types
import type { Notification } from 'src/types/notification'
export type NotificationState = {
  deviceToken: string,
  data: Notification[],
}

// libs
import update from 'immutability-helper'

const UPDATE_DEVICE_TOKEN = 'NOTIFICATION.UPDATE_DEVICE_TOKEN'
const ADD_NOTIFICATION = 'NOTIFICATION.ADD_NOTIFICATION'
const REMOVE_NOTIFICATION = 'NOTIFICATION.REMOVE_NOTIFICATION'
const CLEAR_NOTIFICATIONS = 'NOTIFICATION.CLEAR_NOTIFICATION'

export type UpdateDeviceTokenAction = {
  type: typeof UPDATE_DEVICE_TOKEN,
  payload: { deviceToken: string },
}

export type AddNotificationAction = {
  type: typeof ADD_NOTIFICATION,
  payload: { notification: Notification },
}

export type RemoveNotificationAction = {
  type: typeof REMOVE_NOTIFICATION,
  payload: { index: number },
}

export type ClearNotificationActions = {
  type: typeof CLEAR_NOTIFICATIONS,
  payload: {},
}

export const initialState: NotificationState = {
  deviceToken: '',
  data: [],
}

type NotificationAction =
  | UpdateDeviceTokenAction
  | AddNotificationAction
  | RemoveNotificationAction
  | ClearNotificationActions

export const createActions = {
  updateDeviceToken: (deviceToken: string): UpdateDeviceTokenAction => ({
    type: UPDATE_DEVICE_TOKEN,
    payload: { deviceToken },
  }),
  addNotification: (notification: Notification): AddNotificationAction => ({
    type: ADD_NOTIFICATION,
    payload: { notification },
  }),
  removeNotification: (index: number): RemoveNotificationAction => ({
    type: REMOVE_NOTIFICATION,
    payload: { index },
  }),
  clearNotifications: (): ClearNotificationActions => ({
    type: CLEAR_NOTIFICATIONS,
    payload: {},
  }),
}

export const reducer = (
  state: NotificationState = initialState,
  action: NotificationAction,
) => {
  if (action.type === UPDATE_DEVICE_TOKEN) {
    const updateDeviceTokenAction: updateDeviceTokenAction = action
    return update(state, {
      deciceToken: { $set: action.payload.deviceToken },
    })
  } else if (action.type === ADD_NOTIFICATION) {
    const addNotificationAction: addNotificationAction = action
    return update(state, {
      data: { $push: [addNotificationAction.payload.notification] },
    })
  } else if (action.type === REMOVE_NOTIFICATION) {
    const removeNotificationAction: RemoveNotificationAction = action
    return update(state, {
      data: { $splice: [[removeNotificationAction.payload.index, 1]] },
    })
  } else if (action.type === CLEAR_NOTIFICATIONS) {
    return update(state, {
      data: {
        $set: [],
      },
    })
  } else {
    return state
  }
}

export default reducer
