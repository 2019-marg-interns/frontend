var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _templateObject = _taggedTemplateLiteralLoose(['\n  position: relative;\n  display: inline-block;\n  width: 300px;\n  height: 300px;\n  > * {\n    position: absolute;\n    left: 50%;\n    top: 50%;\n    transform: translate(-50%, -50%);\n  }\n'], ['\n  position: relative;\n  display: inline-block;\n  width: 300px;\n  height: 300px;\n  > * {\n    position: absolute;\n    left: 50%;\n    top: 50%;\n    transform: translate(-50%, -50%);\n  }\n']);

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

import React, { Component } from 'react';
import Roundy from './index';
import styled from 'styled-components';

var Wrap = styled.div(_templateObject);

var RoundGroup = function (_Component) {
  _inherits(RoundGroup, _Component);

  function RoundGroup() {
    _classCallCheck(this, RoundGroup);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  RoundGroup.prototype.render = function render() {
    var _props = this.props,
        sliders = _props.sliders,
        rest = _objectWithoutProperties(_props, ['sliders']);

    var maxSize = sliders.reduce(function (sum, s) {
      return sum.radius > s.radius ? sum.radius : s.radius;
    }, 100) * 2 + 10; //default radius is 100
    return React.createElement(
      Wrap,
      _extends({ style: { width: maxSize, height: maxSize } }, rest),
      sliders.map(function (slider, i) {
        return React.createElement(Roundy, _extends({ key: i }, slider));
      })
    );
  };

  return RoundGroup;
}(Component);

export default RoundGroup;