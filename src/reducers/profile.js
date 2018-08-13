// @flow

// libs
import update from 'immutability-helper'

export type ProfileState = {
  username: string,
  accessToken: string,
  isInitialModalVisible: boolean,
}

const UPDATE_USERNAME = 'PROFILE.UPDATE_USERNAME'
const UPDATE_ACCESS_TOKEN = 'PROFILE.UPDATE_ACCESS_TOKEN'
const TOGGLE_INITIAL_MODAL_VISIBILITY =
  'PROFILE.TOGGLE_INITIAL_MODAL_VISIBILITY'

type UpdateUsernameAction = {
  type: typeof UPDATE_USERNAME,
  payload: {
    username: string,
  },
}

type UpdateAccessTokenAction = {
  type: typeof UPDATE_ACCESS_TOKEN,
  payload: {
    accessToken: string,
  },
}

type ToggleInitialModalVisibilityAction = {
  type: typeof TOGGLE_INITIAL_MODAL_VISIBILITY,
  payload: { isVisible: boolean },
}

export const initialState: ProfileState = {
  username: '',
  accessToken: '',
  isInitialModalVisible: true,
}

type ProfileActions = UpdateUsernameAction | UpdateAccessTokenAction

export const createActions = {
  updateUsername: (username: string): UpdateUsernameAction => ({
    type: UPDATE_USERNAME,
    payload: { username },
  }),
  updateAccessToken: (accessToken: string): UpdateAccessTokenAction => ({
    type: UPDATE_ACCESS_TOKEN,
    payload: { accessToken },
  }),
  toggleInitialModalVisibility: (isVisible: boolean) => ({
    type: TOGGLE_INITIAL_MODAL_VISIBILITY,
    payload: { isVisible },
  }),
}

export const reducer = (
  state: ProfileState = initialState,
  action: ProfileActions,
) => {
  if (action.type === UPDATE_USERNAME) {
    const updateUsernameAction: UpdateUsernameAction = action
    return update(state, {
      username: { $set: updateUsernameAction.payload.username },
    })
  }
  if (action.type === UPDATE_ACCESS_TOKEN) {
    const updateAcceeeTokenAction: UpdateAccessTokenAction = action
    return update(state, {
      accessToken: { $set: updateAcceeeTokenAction.payload.accessToken },
    })
  } else if (action.type === TOGGLE_INITIAL_MODAL_VISIBILITY) {
    const toggleInitialModalVisibilityAction: ToggleInitialModalVisibilityAction = action
    return update(state, {
      isInitialModalVisible: {
        $set: toggleInitialModalVisibilityAction.payload.isVisible,
      },
    })
  }
  {
    return state
  }
}

export default reducer
