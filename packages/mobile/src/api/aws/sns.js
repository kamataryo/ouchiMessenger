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

export const listEndpointArns = ({ PlatformApplicationArn, client }) => () => {
  const params = { PlatformApplicationArn }
  return new Promise((resolve, reject) =>
    client.listEndpointsByPlatformApplication(
      params,
      (err, data) =>
        err
          ? reject(err)
          : resolve(
            data.Endpoints.filter(
              endpoint => endpoint.Attributes.Enabled === 'true',
            ),
          ),
    ),
  )
}

export const publish = ({ client }) => ({ message, endpointArns }) => {
  return Promise.all(
    endpointArns.map(TargetArn => {
      const params = {
        TargetArn,
        Message: JSON.stringify({
          default: JSON.stringify({ aps: { alert: message, badge: 1 } }),
          APNS: JSON.stringify({ aps: { alert: message, badge: 1 } }),
          APNS_SANDBOX: JSON.stringify({
            aps: { alert: message, badge: 1 },
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
