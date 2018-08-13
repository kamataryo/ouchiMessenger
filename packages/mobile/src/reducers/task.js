// @flow

// types
import type { Task } from 'src/types/task'
export type TaskState = { data: Task[] }

// libs
import update from 'immutability-helper'

const UPDATE_TASKS = 'TASKS.UPDATE_TASKS'
const TOGGLE_TASK = 'TASKS.TOGGLE_TASK'
const ADD_TASK = 'TASKS.ADD_TASK'
const UPDATE_TASK = 'TASKS.UPDATE_TASK'
const DELETE_TASK = 'TASKS.DELETE_TASK'
const CLEAR_TASKS = 'TASKS.CLEAR_TASKS'

type UpdateTasksAction = {
  type: typeof UPDATE_TASKS,
  payload: { tasks: Task[] },
}

type ToggleTaskAction = {
  type: typeof TOGGLE_TASK,
  payload: { index: number, updatedAt: string, updatedBy: string },
}

type AddTaskAction = {
  type: typeof ADD_TASK,
  payload: { task: Task },
}

type UpdateTaskAction = {
  type: typeof UPDATE_TASK,
  payload: { index: number, taskProps: any },
}

type DeleteTaskAction = {
  type: typeof DELETE_TASK,
  payload: { index: number },
}

type ClearTasksAction = {
  type: typeof CLEAR_TASKS,
  payload: {},
}

export const initialState: TaskState = {
  data: [],
}

type TaskActions =
  | UpdateTasksAction
  | ToggleTaskAction
  | AddTaskAction
  | UpdateTaskAction
  | DeleteTaskAction
  | ClearTasksAction

export const createActions = {
  updateTasks: (tasks: Task[]): UpdateTasksAction => ({
    type: UPDATE_TASKS,
    payload: { tasks },
  }),
  toggleTask: (
    index: number,
    updatedAt: string,
    updatedBy: string,
  ): ToggleTaskAction => ({
    type: TOGGLE_TASK,
    payload: { index, updatedAt, updatedBy },
  }),
  addTask: (task: Task): AddTaskAction => ({
    type: ADD_TASK,
    payload: { task },
  }),
  updateTask: (index: number, taskProps: any): UpdateTaskAction => ({
    type: UPDATE_TASK,
    payload: { index, taskProps },
  }),
  deleteTask: (index: number): DeleteTaskAction => ({
    type: DELETE_TASK,
    payload: { index },
  }),
  clearTasks: (): ClearTasksAction => ({
    type: CLEAR_TASKS,
    payload: {},
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
    const { index, updatedBy, updatedAt } = toggleTaskAction.payload
    return update(state, {
      data: {
        [index]: {
          done: { $set: !state.data[index].done },
          updatedBy: { $set: updatedBy },
          updatedAt: { $set: updatedAt },
        },
      },
    })
  } else if (action.type === ADD_TASK) {
    const addTaskAction: AddTaskAction = action
    return update(state, {
      data: { $push: [addTaskAction.payload.task] },
    })
  } else if (action.type === UPDATE_TASK) {
    const updateTaskAction: UpdateTaskAction = action
    const { index, taskProps } = updateTaskAction.payload
    return update(state, {
      data: {
        [index]: {
          $merge: taskProps,
        },
      },
    })
  } else if (action.type === DELETE_TASK) {
    const deleteTaskAction: DeleteTaskAction = action
    const index = deleteTaskAction.payload.index
    return update(state, {
      data: {
        $splice: [[index, 1]],
      },
    })
  } else if (action.type === CLEAR_TASKS) {
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
