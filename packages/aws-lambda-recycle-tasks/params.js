const fs = require('fs')
const meta = require('./package.json')

const npm2functionName = npmname => {
  const {
    groups: { scope, name }
  } = npmname.match(/^@(?<scope>.+)\/(?<name>.+)$/)
  return `${scope}__${name}`
}

const params = {
  Code: {
    ZipFile: fs.readFileSync('./archive.zip')
  },
  Description: meta.description,
  FunctionName: npm2functionName(meta.name),
  Handler: 'index.handler',
  MemorySize: 128,
  Publish: true,
  Role: 'arn:aws:iam::433371742295:role/ouchi-messenger-batch', // NOTE: debug
  Environment: {
    Variables: {
      REGION: 'ap-northeast-1', // NOTE: debug
      TABLE_NAME: 'ouchi-messenger' // NOTE: debug
    }
  },
  Runtime: 'nodejs8.10',
  Timeout: 3,
  VpcConfig: {}
}

module.exports = params
