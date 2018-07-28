// @flow

import type { Task } from '../../../types/task'

export type OwnProps = {}

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
}

export type Props = {
  ...$Exact<OwnProps>,
  ...$Exact<StateProps>,
  ...$Exact<DispatchProps>,
}

export type State = {
  isModalOpen: boolean,
  editingTask: Task,
  refreshing: boolean,
}
