// @flow

import type { ModalState } from 'src/reducers/modal'
import type { TaskState } from 'src/reducers/task'
import type { ProfileState } from 'src/reducers/profile'

export type StoreState = {
  modal: ModalState,
  task: TaskState,
  profile: ProfileState,
}
