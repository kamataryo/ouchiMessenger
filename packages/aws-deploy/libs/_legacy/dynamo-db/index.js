const AWS = require('aws-sdk')
const dynamodb = new AWS.DynamoDB()

const TableName = 'ouchi-messenger__tasks'
const AttributeDefinitions = [{ AttributeName: 'taskId', AttributeType: 'S' }]
const KeySchema = [
  {
    AttributeName: 'taskId',
    KeyType: 'HASH'
  }
]
const ProvisionedThroughput = {
  ReadCapacityUnits: 1,
  WriteCapacityUnits: 1
}

const createParams = {
  TableName,
  AttributeDefinitions,
  KeySchema,
  ProvisionedThroughput
}

const getParams = { TableName }

const deleteParams = { TableName }

module.exports = {
  create: () =>
    dynamodb
      .createTable(createParams)
      .promise()
      .then(result => result.TableDescription.TableArn)
      .catch(err => {
        if (err.code === 'ResourceInUseException') {
          console.warn(
            `[warn] DynamoDB table named ${TableName} already exists.`
          )

          return dynamodb
            .describeTable(getParams)
            .promise()
            .then(result => result.Table.TableArn)
        } else {
          throw err
        }
      }),

  clean: () =>
    dynamodb
      .deleteTable(deleteParams)
      .promise()
      .catch(err => {
        if (err.code === 'ResourceNotFoundException') {
          console.warn(
            `[warn] No DynamoDB table named "${TableName}" to delete.`
          )
          return false
        } else {
          throw err
        }
      })
}
