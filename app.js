const newRelic = require("newrelic");
const express = require("express");
const compression = require("compression");
const favicon = require("serve-favicon");
const helmet = require("helmet");
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require("body-parser");
const parseConfig = require('./src/config/parse-platform');

/** ================== EXPRESS CONFIG ================== **/
const app = express();
app.use(helmet()); // user helmet for safety
app.disable("x-powered-by"); // disable for safety
app.use(compression()); // gzip
app.set('views', path.join(__dirname, 'views')); // view engine setup
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true})); // body parser
app.use(bodyParser.json());
app.locals.newrelic = newRelic; // NewRelic
app.use(favicon(__dirname + "/public/favicon/favicon-32x32.png")); // Favicon From http://www.favicon-generator.org/
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

/** ================== ROUTER ================== **/
app.use("/public", express.static(path.join(__dirname, 'public')));
app.use("/parse", parseConfig.ParseServer());
app.use("/dashboard", parseConfig.Dashboard());
app.use("/", require("./src/routes/main/main.js"));
app.use("/api/data/read", require("./src/routes/api/read"));

module.exports = app;
