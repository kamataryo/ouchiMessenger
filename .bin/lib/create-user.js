module.exports = idempotentivelyCreateUser = (iam, UserName) =>
  new Promise((resolve, reject) => {
    iam.listUsers({}, (err, data) => {
      if (err) {
        reject(err)
      } else {
        const user = data.Users.find(user => user.UserName === UserName)
        if (!user) {
          iam.createUser({ UserName }, (err, data) => {
            if (err) {
              reject(err)
            } else {
              resolve(data)
            }
          })
        } else {
          resolve(data)
        }
      }
    })
  })
