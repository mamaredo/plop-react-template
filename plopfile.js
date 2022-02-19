const componentGenerater = require("./generator/component")
const featureGenerater = require("./generator/feature")

module.exports = function (plop) {
  /** @type {import('plop').NodePlopAPI} */
  plop.setGenerator('controller', {
    description: 'application controller logic',
    prompts: [{
        type: 'input',
        name: 'name',
        message: 'controller name please'
    }],
    actions: [{
        type: 'add',
        path: 'src/{{name}}.js',
        templateFile: 'generator/controller.hbs'
    }]
  })
  plop.setGenerator('component', componentGenerater)
  plop.setGenerator('features', featureGenerater)
}