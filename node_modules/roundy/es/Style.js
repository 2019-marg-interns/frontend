var _templateObject = _taggedTemplateLiteralLoose(['\n  display: inline-block;\n  position: relative;\n  pointer-events: ', ';\n\n  svg {\n    path {\n      opacity: 0.7;\n    }\n  }\n\n  .sliderHandle {\n    width: 50%;\n    pointer-events: all;\n    position: absolute;\n    left: 50%;\n    top: 50%;\n    transform-origin: 0 50%;\n  }\n  .sliderHandle:after {\n    content: \'\';\n    display: block;\n    width: ', 'px;\n    height: ', 'px;\n    border-radius: 30px;\n    position: absolute;\n    right: ', 'px;\n    background: linear-gradient(to top, #fff, #f2f2f2);\n    border: 1px solid #ccc;\n    top: -10px;\n    transform: all ease 0.4s;\n  }\n  .sliderHandle:hover:after {\n    box-shadow: 0 0 10px rgb(37, 205, 247);\n  }\n  ', '\n'], ['\n  display: inline-block;\n  position: relative;\n  pointer-events: ', ';\n\n  svg {\n    path {\n      opacity: 0.7;\n    }\n  }\n\n  .sliderHandle {\n    width: 50%;\n    pointer-events: all;\n    position: absolute;\n    left: 50%;\n    top: 50%;\n    transform-origin: 0 50%;\n  }\n  .sliderHandle:after {\n    content: \'\';\n    display: block;\n    width: ', 'px;\n    height: ', 'px;\n    border-radius: 30px;\n    position: absolute;\n    right: ', 'px;\n    background: linear-gradient(to top, #fff, #f2f2f2);\n    border: 1px solid #ccc;\n    top: -10px;\n    transform: all ease 0.4s;\n  }\n  .sliderHandle:hover:after {\n    box-shadow: 0 0 10px rgb(37, 205, 247);\n  }\n  ', '\n']);

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

import styled from 'styled-components';

export var Wrapper = styled.div(_templateObject, function (_ref) {
  var allowClick = _ref.allowClick;
  return allowClick ? 'auto' : 'none';
}, function (_ref2) {
  var thumbSize = _ref2.thumbSize;
  return thumbSize;
}, function (_ref3) {
  var thumbSize = _ref3.thumbSize;
  return thumbSize;
}, function (_ref4) {
  var strokeWidth = _ref4.strokeWidth,
      thumbSize = _ref4.thumbSize;
  return Math.ceil(strokeWidth / 2) - thumbSize / 2;
}, function (_ref5) {
  var overrideStyle = _ref5.overrideStyle;
  return overrideStyle;
});