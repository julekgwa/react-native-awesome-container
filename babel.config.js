module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'react-native-reanimated/plugin',
      {
        relativeSourceLocation: true,
      },
    ],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.jsx', '.js', '.ts', '.tsx', 'json'],
        alias: {
          app: './src',
          underscore: 'lodash',
        },
      },
    ],
  ],
};
