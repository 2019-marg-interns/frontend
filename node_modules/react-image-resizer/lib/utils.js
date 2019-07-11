'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var m = function m() {
  var res = {};

  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  for (var i = 0; i < args.length; ++i) {
    if (args[i]) (0, _objectAssign2.default)(res, args[i]);
  }
  return res;
};
exports.default = m;
//# sourceMappingURL=utils.js.map