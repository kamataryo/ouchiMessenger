const AWS = require('aws-sdk')
const cloudwatchevents = new AWS.CloudWatchEvents({ apiVersion: '2015-10-07' })

const baseParams = {
  Name: 'ouchi-messenger__run-every-midnight',
  Description: 'Triger every midnight',
  ScheduleExpression: 'cron(0 18 * * ? *)',
  State: 'ENABLED'
}

const putParams = { ...baseParams }
const deleteParams = { Name: baseParams.Name }

module.exports = {
  create: () => cloudwatchevents.putRule(putParams).promise(),
  clean: () => cloudwatchevents.deleteRule(deleteParams).promise()
}
