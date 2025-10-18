const adonisConfig = require('@adonisjs/prettier-config')

module.exports = {
  ...adonisConfig,
  plugins: [...adonisConfig.plugins, '@trivago/prettier-plugin-sort-imports'],
  importOrder: [
    '^@(.*)$', // @ imports (external packages starting with @)
    '^#(.*)$', // # imports (internal path aliases)
    '^[./]', // relative imports
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  importOrderParserPlugins: ['typescript', 'decorators-legacy'],
}
