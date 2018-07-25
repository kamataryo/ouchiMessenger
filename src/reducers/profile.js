// @flow

// libs
import update from 'immutability-helper'

type ProfileState = { username: string }

const UPDATE_USERNAME = 'PROFILE.UPDATE_USERNAME'

type UpdateUsernameAction = {
  type: typeof UPDATE_USERNAME,
  payload: {
    username: string,
  },
}

export const initialState: ProfileState = {
  username: '',
}

type ProfileActions = UpdateUsernameAction

export const createActions = {
  updateUsername: (username: string): UpdateUsernameAction => ({
    type: UPDATE_USERNAME,
    payload: { username },
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
  } else {
    return state
  }
}

export default reducer
