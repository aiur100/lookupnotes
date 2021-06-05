const express = require('express');
const app = express();
const useragent = require('express-useragent');
const routes = require("./src/routes/api");
const config = require("./config");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

 
app.use(useragent.express());

//CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    if ('OPTIONS' === req.method) res.send(200);
    else next();
  });

app.use((req,res,next) => {
    req.config = config;
    const log = require("lambda-log");
    log.options.meta = {
        method: req.method,
        path: req.path,
        host: req.hostname,
        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
    };
    req.logger = log;
    req.logger.info("Request received",{ useragent: req.useragent });
    next();
});

app.use("/api", routes);

module.exports = app;