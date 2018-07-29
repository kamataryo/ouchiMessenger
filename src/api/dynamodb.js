import AWS from 'aws-sdk'
import credentials from '../../.env'
const { accessKeyId, secretAccessKey, region, TableName } = credentials

AWS.config = new AWS.Config()
AWS.config.accessKeyId = accessKeyId
AWS.config.secretAccessKey = secretAccessKey
AWS.config.region = region

const client = new AWS.DynamoDB.DocumentClient({ region })

const baseParams = { TableName }
const afterAll = (resolve, reject) => (err, data) =>
  err ? reject(err) : resolve(data.Items)

export const get = () =>
  new Promise((resolve, reject) =>
    client.scan(baseParams, afterAll(resolve, reject)),
  )

export const put = task => {
  const params = { ...baseParams, Item: task }
  return new Promise((resolve, reject) =>
    client.put(params, afterAll(resolve, reject)),
  )
}

export const remove = taskId => {
  const params = { ...baseParams, Key: { taskId } }
  return new Promise((resolve, reject) =>
    client.delete(params, afterAll(resolve, reject)),
  )
}

export const batch = () => {
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
      client.batchWrite(params, afterAll(resolve, reject)),
    )
  })
}
