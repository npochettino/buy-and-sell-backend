"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserListingsRoute = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _database = require("../database");
var _boom = _interopRequireDefault(require("@hapi/boom"));
var admin = _interopRequireWildcard(require("firebase-admin"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var getUserListingsRoute = exports.getUserListingsRoute = {
  method: 'GET',
  path: '/api/users/{userId}/listings',
  handler: function () {
    var _handler = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, h) {
      var token, user, userId, _yield$db$query, results;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            token = req.headers.authtoken;
            if (token) {
              _context.next = 4;
              break;
            }
            throw _boom["default"].unauthorized("Missing authentication token.");
          case 4:
            _context.next = 6;
            return admin.auth().verifyIdToken(token);
          case 6:
            user = _context.sent;
            userId = req.params.userId;
            if (!(user.uid !== userId)) {
              _context.next = 10;
              break;
            }
            throw _boom["default"].unauthorized("Users can only access their own listings.");
          case 10:
            _context.next = 12;
            return _database.db.query('SELECT * FROM `buy-and-sell`.listings WHERE user_id = ?', [userId]);
          case 12:
            _yield$db$query = _context.sent;
            results = _yield$db$query.results;
            return _context.abrupt("return", results);
          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](0);
            console.error("Error fetching user listings:", _context.t0);
            throw _boom["default"].badImplementation("Internal Server Error");
          case 21:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 17]]);
    }));
    function handler(_x, _x2) {
      return _handler.apply(this, arguments);
    }
    return handler;
  }()
};