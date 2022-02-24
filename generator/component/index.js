const path = require('path')
const fs = require('fs')

const existElementsIndexFile = () => {
  return fs.existsSync(
    path.resolve(__dirname, '../../src/components/Elements/index.ts')
  )
}

module.exports = function (
  name = 'components',
  /** @type {import('plop').NodePlopAPI} */
  plop
) {
  plop.setGenerator(name, {
    description: 'src/components/*',
    prompts: [
      {
        type: 'list',
        name: 'choice',
        message: 'どこにコンポーネントを作成しますか？',
        choices: ['components/*', 'components/Elements/*']
      },
      {
        type: 'input',
        name: 'compoent',
        message: 'pascalCase component name'
      }
    ],
    actions: ({ choice }) => {
      const actions = []
      if (choice === 'components/*') {
        actions.push(
          {
            type: 'add',
            path: 'src/components/{{pascalCase compoent}}/{{pascalCase compoent}}.tsx',
            templateFile: 'generator/component/Component.tsx.hbs'
          },
          {
            type: 'add',
            path: 'src/components/{{pascalCase compoent}}/index.ts',
            templateFile: 'generator/component/index.ts.hbs'
          }
        )

        return actions
      }

      if (choice === 'components/Elements/*') {
        actions.push(
          {
            type: 'add',
            path: 'src/components/Elements/{{pascalCase compoent}}/index.ts',
            templateFile: 'generator/component/index.ts.hbs'
          },
          {
            type: 'add',
            path: 'src/components/Elements/{{pascalCase compoent}}/{{pascalCase compoent}}.tsx',
            templateFile: 'generator/component/Component.tsx.hbs'
          }
        )

        existElementsIndexFile()
          ? actions.push({
              type: 'modify',
              path: 'src/components/Elements/index.ts',
              templateFile: 'generator/component/index.ts.hbs',
              transform: (current, data) => {
                const currentModules = current.trim()
                const addedModule = plop.renderString(
                  "export * from './{{pascalCase compoent}}'",
                  data
                )
                const updatedModules =
                  currentModules + '\n' + addedModule + '\n'

                return Promise.resolve(updatedModules)
              }
            })
          : actions.push({
              type: 'add',
              path: 'src/components/Elements/index.ts',
              templateFile: 'generator/component/index.ts.hbs'
            })

        return actions
      }
    }
  })
}
