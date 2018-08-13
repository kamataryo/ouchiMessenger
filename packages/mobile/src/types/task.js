// @flow

export type Task = {
  taskId: string,
  title: string,
  description?: string,
  category?: string,
  updatedAt?: string,
  updatedBy?: string,
  done: boolean,
  repeat: boolean,
  displayOrder?: number,
}
