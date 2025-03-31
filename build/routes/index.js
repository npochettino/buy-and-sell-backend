"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _addViewToListing = require("./addViewToListing");
var _createNewListings = require("./createNewListings");
var _deleteListing = require("./deleteListing");
var _files = require("./files");
var _getAllListings = require("./getAllListings");
var _getListing = require("./getListing");
var _getUserListings = require("./getUserListings");
var _updateListingRoute = require("./updateListingRoute");
var _default = exports["default"] = [_getAllListings.getAllListingRoute, _getListing.getListingRoute, _addViewToListing.addViewToListingRoute, _getUserListings.getUserListingsRoute, _createNewListings.createNewListingRoute, _updateListingRoute.updateListingRoute, _deleteListing.deleteListingRoute, _files.staticFilesRoute].concat((0, _toConsumableArray2["default"])(_files.filesRoutes));