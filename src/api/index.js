import AWS from 'aws-sdk'
import credentials from '../../.env'
import {
  getTasks as dynamoGetTasks,
  putTask as dynamoPutTask,
  removeTask as dynamoRemoveTask,
} from './dynamodb'

const {
  accessKeyId,
  secretAccessKey,
  region,
  TableName: { task: TaskTableName },
} = credentials

AWS.config = new AWS.Config()
AWS.config.accessKeyId = accessKeyId
AWS.config.secretAccessKey = secretAccessKey
AWS.config.region = region

const client = new AWS.DynamoDB.DocumentClient({ region })

export const getTasks = dynamoGetTasks({ TableName: TaskTableName, client })
export const putTask = dynamoPutTask({ TableName: TaskTableName, client })
export const removeTask = dynamoRemoveTask({ TableName: TaskTableName, client })
