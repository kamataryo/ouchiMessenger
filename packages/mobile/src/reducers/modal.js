// @flow

// types
import type { Task } from 'src/types/task'
export type ModalState = {
  task?: Task,
  taskIndex: number,
  isOpen: boolean,
}

// libs
import update from 'immutability-helper'

const OPEN_EMPTY = 'MODAL.OPEN_EMPTY'
const OPEN = 'MODAL.OPEN'
const CLOSE = 'MODAL.CLOSE'
const UPDATE = 'MODAL.UPDATE'
const RESET = 'MODAL.RESET'

type OpenEmptyAction = {
  type: typeof OPEN_EMPTY,
  payload: {},
}

type OpenAction = {
  type: typeof OPEN,
  payload: { task: Task, index: number },
}

type CloseAction = {
  type: typeof CLOSE,
  payload: {},
}

type UpdateAction = {
  type: typeof UPDATE,
  payload: { taskProps: any },
}

type ResetAction = {
  type: typeof RESET,
  payload: {},
}

export const initialState: ModalState = {
  task: void 0,
  taskIndex: -1,
  isOpen: false,
}

type ModalActions =
  | OpenEmptyAction
  | OpenAction
  | CloseAction
  | UpdateAction
  | ResetAction

export const createActions = {
  openEmpty: (): OpenEmptyAction => ({
    type: OPEN_EMPTY,
    payload: {},
  }),
  open: (task: Task, index: number): OpenAction => ({
    type: OPEN,
    payload: { task, index },
  }),
  close: (): CloseAction => ({
    type: CLOSE,
    payload: {},
  }),
  update: (taskProps: any) => ({
    type: UPDATE,
    payload: { taskProps },
  }),
  reset: (): ResetAction => ({
    type: RESET,
    payload: {},
  }),
}

export const reducer = (
  state: ModalState = initialState,
  action: ModalActions,
) => {
  if (action.type === OPEN_EMPTY) {
    return update(state, {
      task: { $set: void 0 },
      taskIndex: { $set: -1 },
      isOpen: { $set: true },
    })
  } else if (action.type === OPEN) {
    const openAction: OpenAction = action
    return update(state, {
      task: { $set: openAction.payload.task },
      taskIndex: { $set: openAction.payload.index },
      isOpen: { $set: true },
    })
  } else if (action.type === CLOSE) {
    return update(state, {
      task: { $set: void 0 },
      taskIndex: { $set: -1 },
      isOpen: { $set: false },
    })
  } else if (action.type === UPDATE) {
    const updateAction: UpdateAction = action
    return update(state, {
      task: {
        [state.task ? '$merge' : '$set']: updateAction.payload.taskProps,
      },
    })
  } else if (action.type === RESET) {
    return update(state, {
      task: { $set: void 0 },
    })
  } else {
    return state
  }
}

export default reducer
