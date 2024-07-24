module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        cwd: 'babelrc',
        extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@screens': './src/screens',
          '@constants': './src/constants',
          '@context': './src/context',
          '@navigation': './src/navigation',
          '@utils': './src/utils',
          '@hooks': './src/hooks',
          '@services': './src/services',
        }
      }
    ],
    'jest-hoist',
    'react-native-reanimated/plugin',
  ],
};
