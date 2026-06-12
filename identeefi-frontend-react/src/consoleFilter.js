// // consoleFilter.js

// // Save the original console.log
// const originalConsoleLog = console.log;

// // Override console.log
// console.log = function (...args) {
//   // Check if the message contains the unwanted text
//   if (args[0] && (args[0].includes('@w3m-frame/IS_CONNECTED_SUCCESS') || args[0].includes('@w3m-app/IS_CONNECTED'))) {
//     // Do not log these messages
//     return;
//   }
//   // Call the original console.log
//   originalConsoleLog.apply(console, args);
// };
