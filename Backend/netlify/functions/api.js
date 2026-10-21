
const serverless = require("serverless-http");
const app = require("../../Server");

exports.handler = serverless(app);
