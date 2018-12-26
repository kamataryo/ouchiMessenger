const identityServiceProvider = require('./identity-service-provider')
const identity = require('./identity')

module.exports = {
  create: () => {
    identityServiceProvider.create()
    identity.create()
  },

  clean: () => {
    identityServiceProvider.clean()
    identiity.clean()
  }
}
