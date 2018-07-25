// @flow

// types
import type { Task } from '../types/task'
type TaskState = { data: Task[] }

// libs
import update from 'immutability-helper'

const UPDATE_TASKS = 'TASKS.UPDATE_TASKS'
const TOGGLE_TASK = 'TASKS.TOGGLE_TASK'

type UpdateTasksAction = {
  type: typeof UPDATE_TASKS,
  payload: { tasks: Task[] },
}

type ToggleTaskAction = {
  type: typeof TOGGLE_TASK,
  payload: { index: number },
}

export const initialState: TaskState = {
  data: [],
}

type TaskActions = UpdateTasksAction | ToggleTaskAction

export const createActions = {
  updateTasks: (tasks: Task[]): UpdateTasksAction => ({
    type: UPDATE_TASKS,
    payload: { tasks },
  }),
  toggleTask: (index: number): ToggleTaskAction => ({
    type: TOGGLE_TASK,
    payload: { index },
  }),
}

export const reducer = (
  state: TaskState = initialState,
  action: TaskActions,
) => {
  if (action.type === UPDATE_TASKS) {
    const updateTasksAction: UpdateTasksAction = action
    return update(state, {
      data: { $set: updateTasksAction.payload.tasks },
    })
  } else if (action.type === TOGGLE_TASK) {
    const toggleTaskAction: ToggleTaskAction = action
    const index = toggleTaskAction.payload.index
    return update(state, {
      data: {
        [index]: {
          done: { $set: !state.data[index].done },
        },
      },
    })
  } else {
    return state
  }
}

export default reducer
