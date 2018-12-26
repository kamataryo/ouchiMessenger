const AWS = require('aws-sdk')

AWS.config.setPromisesDependency(Promise)
AWS.config.region = 'ap-northeast-1'

const dynamoDB = require('./libs/dynamo-db')
const sns = require('./libs/sns')
const cloudWatchEvents = require('./libs/cloud-watch-events')

const lambdaFunctionRepos = ['aws-lamnda-recycle-tasks']

// 1. DynamoDB - Table
// 2. SNS - Platform Application
// 3. Cognito - User Pool & Identity Pool
// 4. API Gateway
// 5. IAM - Roles // TODO: each Lambda
// 6. CloudWatch - Events for batch
// 7. Lambda - Function

const create = async () => {
  const TableArn = await dynamoDB.create()
  // const PlatoformApplicationArn = await sns.create()
  const { UserPoolArn, IdentityPoolArn } = await cognito.create()

  const RuleArn = await cloudWatchEvents.create()
}

const clean = async () => {
  dynamoDB.clean()
  // sns.clean()
  cognito.clean()

  cloudWatchEvents.clean()
}

if (process.argv[2] === 'create') {
  create()
} else if (process.argv[2] === 'clean') {
  clean()
} else {
  process.stdout.write('invalid sub command')
}
