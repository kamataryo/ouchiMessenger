module.exports = idempotentivelyCreateAccessKey = (iam, UserName) =>
  new Promise((resolve, reject) => {
    iam.listAccessKeys({ UserName }, (err, data) => {
      if (err) {
        reject(err)
      } else {
        const AccessKeyIds = data.AccessKeyMetadata.map(x => x.AccessKeyId)
        return Promise.all(
          AccessKeyIds.map(
            AccessKeyId =>
              new Promise((resolve, reject) => {
                iam.deleteAccessKey({ UserName, AccessKeyId }, (err, data) => {
                  if (err) {
                    reject(err)
                  } else {
                    resolve(data)
                  }
                })
              }),
          ),
        ).then(() =>
          iam.createAccessKey({ UserName }, (err, data) => {
            if (err) {
              reject(err)
            } else {
              resolve(data)
            }
          }),
        )
      }
    })
  })
