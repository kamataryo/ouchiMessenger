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
    client.scan(params, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data.Items)
      }
    })
  })

export const put = task =>
  new Promise((resolve, reject) => {
    const params = {
      TableName,
      Item: task,
    }

    client.put(params, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
