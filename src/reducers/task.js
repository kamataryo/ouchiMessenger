// @flow

type Task = {
  title: string,
  description: string,
  category: string,
  createdAt: string,
  createdBy: string,
  done: boolean,
}

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
