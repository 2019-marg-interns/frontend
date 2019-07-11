'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Image = function (_React$Component) {
  _inherits(Image, _React$Component);

  function Image(props) {
    _classCallCheck(this, Image);

    var _this = _possibleConstructorReturn(this, (Image.__proto__ || Object.getPrototypeOf(Image)).call(this, props));

    _this.resizeImage = function () {
      var target = _reactDom2.default.findDOMNode(_this.refs.image);
      if (target === null) {
        return;
      }
      var originalWidth = target instanceof HTMLImageElement ? target.naturalWidth : 0;
      var originalHeight = target instanceof HTMLImageElement ? target.naturalHeight : 0;
      var widthRatio = _this.props.width / originalWidth;
      var heightRatio = _this.props.height / originalHeight;
      if (widthRatio < heightRatio) {
        _this.setState({
          width: originalWidth * widthRatio,
          height: originalHeight * widthRatio
        });
      } else {
        _this.setState({
          width: originalWidth * heightRatio,
          height: originalHeight * heightRatio
        });
      }
    };

    _this.showNoImage = function () {
      if (_this.props.noImageSrc == undefined) {
        return;
      }
      _this.setState({
        isNoImage: true
      });
    };

    _this.state = {
      width: 0,
      height: 0,
      isNoImage: false
    };
    return _this;
  }

  _createClass(Image, [{
    key: 'render',
    value: function render() {
      var style = {
        wrapper: {
          position: 'relative',
          width: this.props.width,
          height: this.props.height,
          backgroundColor: this.props.backgroundColor
        },
        image: {
          position: 'absolute',
          display: 'block',
          left: (this.props.width - this.state.width) / 2,
          top: (this.props.height - this.state.height) / 2,
          width: this.state.width,
          height: this.state.height
        }
      };
      var wrapperStyle = this.props.style ? (0, _utils2.default)(this.props.style, style.wrapper) : style.wrapper;
      if (this.state.isNoImage) {
        return _react2.default.createElement(
          'div',
          { style: wrapperStyle },
          _react2.default.createElement('img', {
            ref: 'image', src: this.props.noImageSrc, alt: this.props.noImageAlt || 'noimage', style: style.image,
            onLoad: this.resizeImage
          })
        );
      } else {
        return _react2.default.createElement(
          'div',
          { style: wrapperStyle },
          _react2.default.createElement('img', {
            ref: 'image', src: this.props.src, alt: this.props.alt, style: style.image,
            onLoad: this.resizeImage,
            onError: this.showNoImage
          })
        );
      }
    }
  }]);

  return Image;
}(_react2.default.Component);

exports.default = Image;
//# sourceMappingURL=index.js.map