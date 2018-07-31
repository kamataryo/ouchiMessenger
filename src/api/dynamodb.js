// @flow

import type { Task } from '../types/task'

type DynamoDependencies = {
  TableName: string,
  client: any,
}

export const getTasks = ({ TableName, client }: DynamoDependencies) => () => {
  const params = { TableName }
  return new Promise((resolve, reject) =>
    client.scan(
      params,
      (err, data) => (err ? reject(err) : resolve(data.Items)),
    ),
  )
}

export const putTask = ({ TableName, client }: DynamoDependencies) => (
  task: Task,
) => {
  const params = { TableName, Item: task }
  return new Promise((resolve, reject) =>
    client.put(
      params,
      (err, data) => (err ? reject(err) : resolve(data.Items)),
    ),
  )
}

export const removeTask = ({ TableName, client }: DynamoDependencies) => (
  taskId: string,
) => {
  const params = { TableName, Key: { taskId } }
  return new Promise((resolve, reject) =>
    client.delete(
      params,
      (err, data) => (err ? reject(err) : resolve(data.Items)),
    ),
  )
}
