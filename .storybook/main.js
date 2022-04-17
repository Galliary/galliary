const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const toPath = (_path) => path.join(process.cwd(), _path)

module.exports = {
  stories: ['../stories/**/*.story.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/react',
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript-loader',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
  webpackFinal: async (config) => {
    config.resolve.plugins = config.resolve.plugins || []

    config.resolve.plugins.push(
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, '../tsconfig.json'),
      }),
    )

    config.resolve.extensions.push('.ts', '.tsx')

    config.node = {
      ...config.node,
      fs: 'empty',
      global: true,
    }

    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@emotion/core': toPath('node_modules/@emotion/react'),
      'emotion-theming': toPath('node_modules/@emotion/react'),
    }

    return config
  },
}
