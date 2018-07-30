// @flow

import type { Task } from 'src/types/task'

export type OwnProps = {
  mode: 'description' | 'priority',
}

export type StateProps = {
  username: string,
  tasks: Task[],
}

export type DispatchProps = {
  updateTasks: (tasks: Task[]) => void,
  toggleTask: (index: number, updatedAt: string, updatedBy: string) => void,
  addTask: (task: Task) => void,
  deleteTask: (index: number) => void,
  clearTasks: () => void,
  openModal: (task: Task, index: number) => void,
}

export type Props = {
  ...$Exact<OwnProps>,
  ...$Exact<StateProps>,
  ...$Exact<DispatchProps>,
}

export type State = {
  editingTask: Task,
  refreshing: boolean,
}
