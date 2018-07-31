export const updateEndpoint = ({
  PlatformApplicationArn,
  client,
}) => deviceToken => {
  const params = {
    PlatformApplicationArn,
    Token: deviceToken,
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
          : resolve(data.Endpoints.map(endpoint => endpoint.EndpointArn)),
    ),
  )
}

export const publish = ({ client }) => ({ title, body, endpointArns }) => {
  return Promise.all(
    endpointArns.map(TargetArn => {
      const params = {
        TargetArn,
        Message: JSON.stringify({
          default: JSON.stringify({ message: 'test', title, body }),
          APNS_SANDBOX: JSON.stringify({
            aps: { message: 'test', title, body },
          }),
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
