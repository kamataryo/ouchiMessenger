const JSONparse = jsonstr => {
  let result
  try {
    result = JSON.parse(jsonstr)
  } catch (e) {
    console.warn('json parse error: ' + jsonstr + ' cannot be convert to json')
    result = {}
  }

  if (typeof result !== 'object') {
    console.warn('invalid object')
    result = {}
  }

  return result
}

export const updateEndpoint = ({ PlatformApplicationArn, client }) => ({
  username,
  deviceToken,
}) => {
  const params = {
    PlatformApplicationArn,
    Token: deviceToken,
    CustomUserData: JSON.stringify({ username }),
  }

  return new Promise((resolve, reject) =>
    client.createPlatformEndpoint(
      params,
      (err, data) => (err ? reject(err) : resolve(data)),
    ),
  )
}

export const listEndpoints = ({ PlatformApplicationArn, client }) => () => {
  const params = { PlatformApplicationArn }
  return new Promise((resolve, reject) =>
    client.listEndpointsByPlatformApplication(
      params,
      (err, data) =>
        err
          ? reject(err)
          : resolve(
            data.Endpoints.map(endpoint => ({
              arn: endpoint.EndpointArn,
              ...JSONparse(endpoint.Attributes.CustomUserData),
            })),
          ),
    ),
  )
}

export const publish = ({ client }) => ({ title, body, endpointArns }) => {
  return Promise.all(
    endpointArns.map(TargetArn => {
      const params = {
        TargetArn,
        Message: JSON.stringify({
          APNS: JSON.stringify({ message: 'test', title, body }),
        }),
        MessageStructure: 'json',
      }

      return new Promise((resolve, reject) =>
        client.publish(
          params,
          (err, data) => (err ? reject(err) : resolve(data)),
        ),
      )
    }),
  )
}
