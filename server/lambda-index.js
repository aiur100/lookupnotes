/**
 * ------ WARNING --------
 * This is script is the main 
 * AWS Lambda handler version of the 
 * ./index.js file.  
 * 
 * For local development, index.js is used.  
 * Please limit changes to index.js or this file
 * and ensure application logic is handled in the manner
 * described in the README.md
 * 
 */
const app = require("./app");
const serverless = require('serverless-http');

let server;

const exitHandler = () => {
    if (server) {
      server.close(() => {
        console.info('Server closed');
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  };
  
const unexpectedErrorHandler = (error) => {
    console.error(error);
    exitHandler();
};
  
process.on('uncaughtException', unexpectedErrorHandler); // TODO this is bad fix it: https://expressjs.com/en/advanced/best-practice-performance.html#handle-exceptions-properly
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
console.info('SIGTERM received');
    if (server) {
        server.close();
    }
});
 
 module.exports.handler = serverless(app);