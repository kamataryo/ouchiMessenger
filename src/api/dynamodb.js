export const get = ({ TableName, client }) => () => {
  const params = { TableName }
  new Promise((resolve, reject) =>
    client.scan(
      params,
      (err, data) => (err ? reject(err) : resolve(data.Items)),
    ),
  )
}

export const put = ({ TableName, client }) => task => {
  const params = { TableName, Item: task }
  return new Promise((resolve, reject) =>
    client.put(
      params,
      (err, data) => (err ? reject(err) : resolve(data.Items)),
    ),
  )
}

export const remove = ({ TableName, client }) => taskId => {
  const params = { TableName, Key: { taskId } }
  return new Promise((resolve, reject) =>
    client.delete(
      params,
      (err, data) => (err ? reject(err) : resolve(data.Items)),
    ),
  )
}

export const batch = ({ TableName, client }) => () => {
  get().then(tasks => {
    const { removingTaskIds, resurrectingTask } = tasks.reduce(
      (prev, task) => {
        if (task.repeat) {
          prev.resurrectingTask.push({
            ...task,
            done: false,
            updatedBy: '==batch',
            updatedAt: Date(),
          })
        } else if (!task.done) {
          prev.removingTaskIds.push(task.taskId)
        }

        return prev
      },
      {
        removingTaskIds: [],
        resurrectingTask: [],
      },
    )

    const params = {
      RequestItems: {
        [TableName]: [
          ...removingTaskIds.map(taskId => ({
            DeleteRequest: { Key: { taskId } },
          })),
          ...resurrectingTask.map(task => ({
            PutRequest: { Item: task },
          })),
        ],
      },
    }

    return new Promise((resolve, reject) =>
      client.batchWrite(
        params,
        (err, data) => (err ? reject(err) : resolve(data.Items)),
      ),
    )
  })
}
