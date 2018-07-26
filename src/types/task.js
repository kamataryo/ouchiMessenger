// @flow

export type Task = {
  id: number,
  title: string,
  description: string,
  category: ?string,
  updatedAt: ?string,
  updatedBy: ?string,
  done: boolean,
}
