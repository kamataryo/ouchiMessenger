// @flow

export type Task = {
  id: number,
  title: string,
  description: string,
  category: ?string,
  createdAt: ?string,
  createdBy: ?string,
  done: boolean,
}
