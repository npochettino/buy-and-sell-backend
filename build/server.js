"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _hapi = _interopRequireDefault(require("@hapi/hapi"));
var admin = _interopRequireWildcard(require("firebase-admin"));
var _routes = _interopRequireDefault(require("./routes"));
var _database = require("./database");
var _credentials = _interopRequireDefault(require("../credentials.json"));
var _inert = _interopRequireDefault(require("@hapi/inert"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
_dotenv["default"].config();
admin.initializeApp({
  credential: admin.credential.cert(_credentials["default"])
});
var server;
var start = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          server = _hapi["default"].server({
            port: 8080,
            host: '0.0.0.0',
            routes: {
              cors: {
                origin: ['*'],
                headers: ['Accept', 'Content-Type', 'Authorization', 'authtoken'],
                exposedHeaders: ['Authorization'],
                credentials: true
              }
            }
          });
          _context.next = 3;
          return server.register(_inert["default"]);
        case 3:
          _routes["default"].forEach(function (route) {
            return server.route(route);
          });
          _database.db.connect();
          _context.next = 7;
          return server.start();
        case 7:
          console.log("Server is listening on port ".concat(server.info.uri));
        case 8:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function start() {
    return _ref.apply(this, arguments);
  };
}();
process.on('unhandledRejection', function (err) {
  console.log(err);
  process.exit(1);
});
process.on('SIGINT', /*#__PURE__*/(0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2() {
  return _regenerator["default"].wrap(function _callee2$(_context2) {
    while (1) switch (_context2.prev = _context2.next) {
      case 0:
        console.log('Stopping the server...');
        _context2.next = 3;
        return server.stop({
          timeout: 1000
        });
      case 3:
        _database.db.end();
        console.log('Server stopped.');
        process.exit(0);
      case 6:
      case "end":
        return _context2.stop();
    }
  }, _callee2);
})));
start();