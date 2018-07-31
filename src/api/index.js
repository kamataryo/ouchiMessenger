import AWS from 'aws-sdk'
import credentials from '../../.env'
import {
  getTasks as dynamoGetTasks,
  putTask as dynamoPutTask,
  removeTask as dynamoRemoveTask,
  getUsers as dynamoGetUsers,
  putUser as dynamoPutUser,
} from './aws/dynamodb'

import {
  updateEndpoint as snsUpdateEndpoint,
  listEndpoints as snsListEndpoints,
  publish as snsPublish,
} from './aws/sns'

const {
  accessKeyId,
  secretAccessKey,
  region,
  TableNames: { task: TaskTableName, user: UserTableName },
  PlatformApplicationArn,
} = credentials

AWS.config = new AWS.Config()
AWS.config.accessKeyId = accessKeyId
AWS.config.secretAccessKey = secretAccessKey
AWS.config.region = region

const dynamoClient = new AWS.DynamoDB.DocumentClient({ region })
const snsClient = new AWS.SNS({ region })

const taskOptions = { TableName: TaskTableName, client: dynamoClient }
const userOptions = { TableName: UserTableName, client: dynamoClient }
const snsOptions = { PlatformApplicationArn, client: snsClient }

export const getTasks = dynamoGetTasks(taskOptions)
export const putTask = dynamoPutTask(taskOptions)
export const removeTask = dynamoRemoveTask(taskOptions)

export const getUsers = dynamoGetUsers(userOptions)
export const putUser = dynamoPutUser(userOptions)

export const updateEndpoint = snsUpdateEndpoint(snsOptions)
export const listEndpoints = snsListEndpoints(snsOptions)
export const publish = snsPublish(snsOptions)
