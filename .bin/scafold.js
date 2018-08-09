const AWS = require('aws-sdk')
const iam = new AWS.IAM()
const idempotentivelyCreateUser = require('./lib/create-user')
const idempotentivelyCreateAccessKey = require('./lib/create-access-key')

const configuration = require('../secrets/.env.aws')
const { UserName } = configuration

const main = async () => {
  idempotentivelyCreateUser(iam, UserName)
    .then(() => idempotentivelyCreateAccessKey(iam, UserName))
    .then(console.log)
    .catch(console.error)
}

main()
