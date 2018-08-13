const AWS = require('aws-sdk')

const region = process.env.REGION || 'ap-northeast-1'
const TableName = process.env.TABLE_NAME
const client = new AWS.DynamoDB.DocumentClient({ region })

const get = () => {
  const params = { TableName }
  return new Promise((resolve, reject) =>
    client.scan(
      params,
      (err, data) => (err ? reject(err) : resolve(data.Items)),
    ),
  )
}

const batch = tasks => {
  const { removingTaskIds, resurrectingTask } = tasks.reduce(
    (prev, task) => {
      if (task.repeat) {
        prev.resurrectingTask.push({
          ...task,
          done: false,
          updatedBy: '==batch',
          updatedAt: new Date().toISOString(),
        })
      } else if (task.done) {
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
}

exports.handler = async () => get().then(batch)
