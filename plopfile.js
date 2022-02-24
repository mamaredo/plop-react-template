const componentGenerater = require('./generator/component')
const featureGenerater = require('./generator/feature')

module.exports = function (
  /** @type {import('plop').NodePlopAPI} */
  plop
) {
  componentGenerater('components', plop)
  featureGenerater('features', plop)
}
