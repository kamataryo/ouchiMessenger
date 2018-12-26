const AWS = require('aws-sdk')
const sns = new AWS.SNS()

const Name = 'ouchi-messenger__apple_push_notification_service_production'
const Platform = 'APNS'
const Attributes = {}

const createParams = {
  Name,
  Platform,
  Attributes
}

const deleteParams = {
  Name
}

module.exports = {
  create: () =>
    sns
      .createPlatformApplication(createParams)
      .promise()
      .then(console.log)
      .catch(err => {
        if (err.code === 'ResourceInUseException') {
          console.warn(
            `[warn] DynamoDB table named ${TableName} already exists.`
          )
          return false
        } else {
          throw err
        }
      }),

  clean: () =>
    sns
      .deletePlatformApplication(deleteParams)
      .promise()
      .catch(err => {
        console.log(err)
        // if (err.code === 'ResourceNotFoundException') {
        //   console.warn(
        //     `[warn] No DynamoDB table named "${TableName}" to delete.`
        //   )
        //   return false
        // } else {
        //   throw err
        // }
      })
}
