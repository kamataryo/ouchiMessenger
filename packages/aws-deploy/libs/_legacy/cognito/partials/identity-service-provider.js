const AWS = require('aws-sdk')
AWS.config.setPromisesDependency(Promise)
AWS.config.region = 'ap-northeast-1'

const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider()

const createUserPoolParams = {
  PoolName: 'ouchi-messenger__user-pool'
}

const createUserPool = () => {
  return cognitoidentityserviceprovider
    .createUserPool(createUserPoolParams)
    .promise()
    .then(({ UserPool }) => UserPool)
}

const createAppClientParams = {
  ClientName: 'ouchi-messenger__user-pool-app-client__mobile'
}

const createAppClient = () => {
  return cognitoidentityserviceprovider.createUserPoolClient().promise()
}

createUserPool().then(console.log)
