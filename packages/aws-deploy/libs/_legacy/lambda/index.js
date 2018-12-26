#!/usr/bin/env node

const AWS = require('aws-sdk')
AWS.config.region = 'ap-northeast-1'
const lambda = new AWS.Lambda({ apiVersion: '2015-03-31' })

const baseParams = require('./params')

const existsFunction = () =>
  new Promise((resolve, reject) =>
    lambda.getFunction(
      { FunctionName: baseParams.FunctionName },
      (err, data) => {
        console.log(data)
        if (err) {
          if (err.statusCode === 404) {
            resolve(false)
          } else {
            reject(err)
          }
        } else {
          resolve(true)
        }
      }
    )
  )

const existsEventSourceMapping = () =>
  new Promise((resolve, reject) =>
    lambda.getEventSourceMappping(
      { FunctionName: baseParams.FunctionName },
      (err, data) => {
        if (err) {
          if (err.statusCode === 404) {
            resolve(false)
          } else {
            reject(err)
          }
        } else {
          resolve(true)
        }
      }
    )
  )

const updateFunction = () => {
  const updateCode = new Promise((resolve, reject) => {
    const params = {
      FunctionName: baseParams.FunctionName,
      Publish: baseParams.Publish,
      ZipFile: baseParams.Code.ZipFile
    }
    lambda.updateFunctionCode(
      params,
      (err, data) => (err ? reject(err) : resolve(data))
    )
  })

  const updateConfig = new Promise((resolve, reject) => {
    const params = {
      ...baseParams
    }
    delete params.Code
    delete params.Publish
    lambda.updateFunctionConfiguration(
      params,
      (err, data) => (err ? reject(err) : resolve(data))
    )
  })

  return updateCode.then(() => updateConfig)
}

const createFunction = () =>
  new Promise((resolve, reject) =>
    lambda.createFunction(
      baseParams,
      (err, data) => (err ? reject(err) : resolve(data))
    )
  )

const main = async () => {
  let exists

  exists = await existsFunction()
  await (exists ? updateFunction : createFunction)()

  // exists = await existsEventSourceMapping()
}

main()
// Events: {
//   Schedule1: {
//     Type: 'Schedule',
//     Properties: {
//       Schedule: 'cron(0 18 * * ? *)'
//     }
//   }
// },
