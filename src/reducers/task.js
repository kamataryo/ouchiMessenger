// @flow

// types
import type { Task } from '../types/task'
type TaskState = { data: Task[] }

// libs
import update from 'immutability-helper'

const UPDATE_TASKS = 'TASKS.UPDATE_TASKS'
const TOGGLE_TASK = 'TASKS.TOGGLE_TASK'
const ADD_TASK = 'TASKS.ADD_TASK'

type UpdateTasksAction = {
  type: typeof UPDATE_TASKS,
  payload: { tasks: Task[] },
}

type ToggleTaskAction = {
  type: typeof TOGGLE_TASK,
  payload: { index: number },
}

type AddTaskAction = {
  type: typeof ADD_TASK,
  payload: { task: Task },
}

export const initialState: TaskState = {
  data: [],
}

type TaskActions = UpdateTasksAction | ToggleTaskAction | AddTaskAction

export const createActions = {
  updateTasks: (tasks: Task[]): UpdateTasksAction => ({
    type: UPDATE_TASKS,
    payload: { tasks },
  }),
  toggleTask: (index: number): ToggleTaskAction => ({
    type: TOGGLE_TASK,
    payload: { index },
  }),
  addTask: (task: Task): AddTaskAction => ({
    type: ADD_TASK,
    payload: { task },
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
  } else if (action.type === ADD_TASK) {
    const addTaskAction: AddTaskAction = action
    return update(state, {
      data: { $push: [addTaskAction.payload.task] },
    })
  } else {
    return state
  }
}

export default reducer
