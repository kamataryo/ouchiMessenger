// @flow

import { Task } from '../types/task'

type TaskState = {
  data: Task[],
}

export const initialState: TaskState = {
  data: [],
}

export const reducer = (state: TaskState = initialState, action) => {
  return state
}

export default reducer
