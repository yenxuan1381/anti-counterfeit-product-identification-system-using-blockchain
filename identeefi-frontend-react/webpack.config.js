// // const { rules } = require('@typescript-eslint/eslint-plugin');
// // const {loaders} = require('ts-loader');
// const path = require('path');
// module.exports = {
//   entry: './src/index.js',
//       alias: {
//       '@pages': path.resolve(__dirname, 'src/pages'),
//       '@components': path.resolve(__dirname, 'src/components'),
//       '@redux': path.resolve(__dirname, 'src/redux'),
//       '@utils': path.resolve(__dirname, 'src/utils'),
//       '@hooks': path.resolve(__dirname, 'src/hooks/*'),
//       '@api': path.resolve(__dirname, 'src/api'),
//       '@assets': path.resolve(__dirname, 'src/assets'),
//       '@contracts': path.resolve(__dirname, 'src/contracts'),
//     },
//   module: {
//     rules: [
//       {
//         test: /\.tsx?$/,
//         use: 'ts-loader',
//         exclude: /node_modules/,
//       },
      
//     ],
//   },
//   resolve: {
//     extensions: ['','.tsx', '.ts', '.js',".jsx"],
//   },
//   output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname, 'dist'),
//   },
// };