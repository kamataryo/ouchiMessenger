// @flow

import type { ModalState } from 'src/reducers/modal'
import type { NotificationState } from 'src/reducers/notification'
import type { TaskState } from 'src/reducers/task'
import type { ProfileState } from 'src/reducers/profile'

export type StoreState = {
  modal: ModalState,
  notification: NotificationState,
  task: TaskState,
  profile: ProfileState,
}
