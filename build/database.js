"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.db = void 0;
var _dotenv = _interopRequireDefault(require("dotenv"));
var _mysql = _interopRequireDefault(require("mysql2"));
_dotenv["default"].config();
var connection;
var db = exports.db = {
  connect: function connect() {
    connection = _mysql["default"].createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      socketPath: process.env.DB_SOCKET,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
    console.log("MySQL Connected!");
  },
  query: function query(queryString, escapedValue) {
    return new Promise(function (resolve, reject) {
      connection.execute(queryString, escapedValue, function (error, results, fields) {
        if (error) return reject(error);
        resolve({
          results: results,
          fields: fields
        });
      });
    });
  },
  end: function end() {
    return connection.end();
  }
};