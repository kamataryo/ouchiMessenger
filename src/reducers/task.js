// @flow

import { Task } from 'src/types/task'

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
