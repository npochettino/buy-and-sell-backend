"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createNewListingRoute = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _database = require("../database");
var _uuid = require("uuid");
var admin = _interopRequireWildcard(require("firebase-admin"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var createNewListingRoute = exports.createNewListingRoute = {
  method: 'POST',
  path: '/api/listings',
  handler: function () {
    var _handler = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, h) {
      var token, user, userId, _ref, _ref$name, name, _ref$description, description, _ref$price, price, id, views;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            token = req.headers.authtoken;
            if (token) {
              _context.next = 4;
              break;
            }
            throw Boom.unauthorized("Missing authentication token.");
          case 4:
            _context.next = 6;
            return admin.auth().verifyIdToken(token);
          case 6:
            user = _context.sent;
            userId = user.uid;
            _ref = req.payload || {}, _ref$name = _ref.name, name = _ref$name === void 0 ? '' : _ref$name, _ref$description = _ref.description, description = _ref$description === void 0 ? '' : _ref$description, _ref$price = _ref.price, price = _ref$price === void 0 ? 0 : _ref$price;
            if (!(typeof name !== "string" || typeof description !== "string" || typeof price !== "number")) {
              _context.next = 11;
              break;
            }
            throw Boom.badRequest("Invalid input data.");
          case 11:
            id = (0, _uuid.v4)();
            views = 0;
            _context.next = 15;
            return _database.db.query("INSERT INTO listings (id, name, description, price, user_id, views)\n                 VALUES (?, ?, ?, ?, ?, ?);", [id, name.trim(), description.trim(), price, userId, views]);
          case 15:
            return _context.abrupt("return", h.response({
              id: id,
              name: name,
              description: description,
              price: price,
              userId: userId,
              views: views
            }).code(201));
          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](0);
            console.error("Error creating new listing:", _context.t0);
            throw Boom.badImplementation("Internal Server Error");
          case 22:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 18]]);
    }));
    function handler(_x, _x2) {
      return _handler.apply(this, arguments);
    }
    return handler;
  }()
};