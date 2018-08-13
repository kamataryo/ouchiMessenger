import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js'

export const signUp = ({ poolData }) => (username, email, password) => {
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
      resolve(cognitoUser)
    })
  })
}

export const verify = ({ poolData }) => (username, code) => {
  const userData = {
    Username: username,
    Pool: new CognitoUserPool(poolData),
  }
  const cognitoUser = new CognitoUser(userData)

  return new Promise((resolve, reject) => {
    cognitoUser.confirmRegistration(code, true, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

export const login = ({ poolData }) => (Username, Password) => {
  const authenticationData = { Username, Password }
  const authenticationDetails = new AuthenticationDetails(authenticationData)

  const userData = {
    Username,
    Pool: new CognitoUserPool(poolData),
  }
  const cognitoUser = new CognitoUser(userData)

  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: result => {
        const accessToken = result.getAccessToken().getJwtToken()
        resolve(accessToken)
      },
      onFailure: reject,
    })
  })
}
