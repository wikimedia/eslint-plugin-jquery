'use strict'

const utils = require('./utils.js')

module.exports = utils.createCollectionMethodRule(
  'val',
  'Prefer value to $.val'
)
