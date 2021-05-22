const app = require("./app");
const config = require("./config");

let server;

try{
    server = app.listen(config.port, () => {
        console.info(`Listening to port ${config.port}`);
    });
}
catch(error){
    console.error(err);
    process.exit(1);
}

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