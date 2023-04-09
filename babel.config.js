module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
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
