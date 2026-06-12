// /* eslint-disable no-undef */
// /* eslint-disable @typescript-eslint/no-var-requires */
// const { pathsToModuleNameMapper } = require('ts-jest')
// // const { ESLINT_MODES } = require('@craco/craco')
// const { compilerOptions } = require('./tsconfig.path.json')
// const path = require('path')

// module.exports = {
//   webpack: {
//     resolve:{
//       extensions:['.js','jsx','tsx','ts']
//     },
//     alias: {
//       '@pages': path.resolve(__dirname, 'src/pages'),
//       '@components': path.resolve(__dirname, 'src/components'),
//       '@redux': path.resolve(__dirname, 'src/redux'),
//       '@utils': path.resolve(__dirname, 'src/utils'),
//       '@hooks': path.resolve(__dirname, 'src/hooks/*'),
//       '@api': path.resolve(__dirname, 'src/api'),
//       '@assets': path.resolve(__dirname, 'src/assets'),
//       '@contracts': path.resolve(__dirname, 'src/contracts'),
//     },
//   },
//   jest: {
//     configure: {
//       preset: 'ts-jest',
//       moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
//         prefix: '<rootDir>/src/',
//       }),
//     },
//   },
//   // eslint: {
//   //   mode: ESLINT_MODES.file,
//   // },
// }
