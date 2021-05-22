const express = require('express');
const app = express();
const useragent = require('express-useragent');
const routes = require("./src/routes/api");
const config = require("./config");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

 
app.use(useragent.express());

app.use((req,res,next) => {
    req.config = config;
    const log = require("lambda-log");
    log.options.meta = {
        method: req.method,
        path: req.path,
        host: req.hostname,
        useragent: req.useragent,
        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
    };
    req.logger = log;
    req.logger.info("Request received");
    next();
});

app.use("/api", routes);

module.exports = app;