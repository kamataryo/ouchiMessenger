const AWS = require('aws-sdk')
const iam = new AWS.IAM()

const PolicyDocument = JSON.stingify({})
const PolicyName = 'aaa'
const UserName = 'ouchi-messenger__lambda_exec_role'

module.exports = {
  put: () =>
    iam
      .listUser({})
      .promise()
      .then(({ Users }) => {
        const user = Users.find(user => user.UserName === UserName)
        if (!user) {
          return iam.createUser({ UserName }).promise
        } else {
          return user
        }
      })
      .then(
        iam.putUserPolicy({ PolicyDocument, PolicyName, UserName }).promise
      ),

  delete: () => iam.deleteUser({ UserName }).promise()
}
