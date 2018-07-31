import AWS from 'aws-sdk'
import credentials from '../../.env'
import {
  getTasks as dynamoGetTasks,
  putTask as dynamoPutTask,
  removeTask as dynamoRemoveTask,
  getUsers as dynamoGetUsers,
  putUser as dynamoPutUser,
} from './dynamodb'

const {
  accessKeyId,
  secretAccessKey,
  region,
  TableNames: { task: TaskTableName, user: UserTableName },
} = credentials

AWS.config = new AWS.Config()
AWS.config.accessKeyId = accessKeyId
AWS.config.secretAccessKey = secretAccessKey
AWS.config.region = region

const client = new AWS.DynamoDB.DocumentClient({ region })

const taskOptions = { TableName: TaskTableName, client }
const userOptions = { TableName: UserTableName, client }

export const getTasks = dynamoGetTasks(taskOptions)
export const putTask = dynamoPutTask(taskOptions)
export const removeTask = dynamoRemoveTask(taskOptions)

export const getUsers = dynamoGetUsers(userOptions)
export const putUser = dynamoPutUser(userOptions)
