// @flow

import type { TaskState } from '../reducers/task'
import type { ProfileState } from '../reducers/profile'

export type StoreState = {
  task: TaskState,
  profile: ProfileState,
}
