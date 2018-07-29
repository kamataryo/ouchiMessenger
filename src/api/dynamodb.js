export const get = ({ TableName, client }) => () => {
  const params = { TableName }
  return new Promise((resolve, reject) =>
    client.scan(
      params,
      (err, data) => (err ? reject(err) : resolve(data.Items)),
    ),
  )
}

export const put = ({ TableName, client }) => task => {
  const params = { TableName, Item: task }
  return new Promise((resolve, reject) =>
    client.put(
      params,
      (err, data) => (err ? reject(err) : resolve(data.Items)),
    ),
  )
}

export const remove = ({ TableName, client }) => taskId => {
  const params = { TableName, Key: { taskId } }
  return new Promise((resolve, reject) =>
    client.delete(
      params,
      (err, data) => (err ? reject(err) : resolve(data.Items)),
    ),
  )
}
