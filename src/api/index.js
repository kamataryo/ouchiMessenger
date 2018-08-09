import AWS from 'aws-sdk'
import credentials from '../../.env'
import {
  getTasks as dynamoGetTasks,
  putTask as dynamoPutTask,
  removeTask as dynamoRemoveTask,
} from './aws/dynamodb'

import {
  updateEndpoint as snsUpdateEndpoint,
  listEndpointArns as snsListEndpointArns,
  publish as snsPublish,
} from './aws/sns'

const {
  accessKeyId,
  secretAccessKey,
  region,
  TableName,
  PlatformApplicationArn: _PlatformApplicationArn,
  IdentityPoolId,
} = credentials

const PlatformApplicationArn = __DEV__
  ? _PlatformApplicationArn.development
  : _PlatformApplicationArn.production

// AWS.config = new AWS.Config()
// AWS.config.accessKeyId = accessKeyId
// AWS.config.secretAccessKey = secretAccessKey
AWS.config.region = region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId,
})

const dynamoClient = new AWS.DynamoDB.DocumentClient({ region })
const snsClient = new AWS.SNS({ region })

const taskOptions = { TableName, client: dynamoClient }
const snsOptions = { PlatformApplicationArn, client: snsClient }

export const getTasks = dynamoGetTasks(taskOptions)
export const putTask = dynamoPutTask(taskOptions)
export const removeTask = dynamoRemoveTask(taskOptions)

export const updateEndpoint = snsUpdateEndpoint(snsOptions)
export const listEndpointArns = snsListEndpointArns(snsOptions)
export const publish = snsPublish(snsOptions)
