import AWS from 'aws-sdk'
import credentials from '../../.env'
const { accessKeyId, secretAccessKey, region, TableName } = credentials

AWS.config = new AWS.Config()
AWS.config.accessKeyId = accessKeyId
AWS.config.secretAccessKey = secretAccessKey
AWS.config.region = region

const client = new AWS.DynamoDB.DocumentClient({ region })

export const get = () =>
  new Promise((resolve, reject) => {
    const params = { TableName }
    client.scan(
      params,
      (err, data) => (err ? reject(err) : resolve(data.Items)),
    )
  })

export const put = task =>
  new Promise((resolve, reject) => {
    const params = { TableName, Item: task }
    client.put(params, (err, data) => (err ? reject(err) : resolve(data.Items)))
  })

export const remove = taskId =>
  new Promise((resolve, reject) => {
    const params = { TableName, Key: { taskId } }
    client.delete(
      params,
      (err, data) => (err ? reject(err) : resolve(data.Items)),
    )
  })

export const batch = () => {
  get().then(tasks => {
    const { removes, resurrections } = tasks.reduce(
      (prev, task) => {
        if (task.repeat) {
          prev.resurrections.push(
            put({
              ...task,
              done: false,
              updatedBy: '==batch',
              updatedAt: Date(),
            }),
          )
        } else if (!task.done) {
          prev.removes.push(remove(task.taskId))
        }

        return prev
      },
      {
        removes: [],
        resurrections: [],
      },
    )

    return Promise.all([...removes, ...resurrections])
  })
}
