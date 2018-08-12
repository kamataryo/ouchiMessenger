import {
  CognitoUserPool,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js'

export const signUp = poolData => (username, email, password) => {
  const userPool = new CognitoUserPool(poolData)
  const dataEmail = {
    Name: 'email',
    Value: email,
  }
  const attributeList = [new CognitoUserAttribute(dataEmail)]

  return new Promise((resolve, reject) => {
    userPool.signUp(username, password, attributeList, null, (err, result) => {
      if (err) {
        reject(err)
      }
      const cognitoUser = result.user
      console.log(cognitoUser)
      resolve(cognitoUser)
    })
  })
}
