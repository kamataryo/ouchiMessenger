import AWS from 'aws-sdk'
import credentials from '../../.env'
import {
  get as dynamoGet,
  put as dynamoPut,
  remove as dynamoRemove,
} from './dynamodb'

const { accessKeyId, secretAccessKey, region, TableName } = credentials

AWS.config = new AWS.Config()
AWS.config.accessKeyId = accessKeyId
AWS.config.secretAccessKey = secretAccessKey
AWS.config.region = region

const client = new AWS.DynamoDB.DocumentClient({ region })

export const get = dynamoGet({ TableName, client })
export const put = dynamoPut({ TableName, client })
export const remove = dynamoRemove({ TableName, client })
