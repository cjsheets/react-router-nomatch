"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRouterDom = require("react-router-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var NoMatch = function NoMatch(props) {
  var children = props.children,
      location = props.location,
      component = props.component,
      render = props.render,
      alwaysRender = props.alwaysRender,
      shouldBypass = props.shouldBypass;
  var match = false;

  if (shouldBypass && shouldBypass(location)) {
    return _react.default.createElement(_react.default.Fragment, null, children);
  }

  _react.default.Children.forEach(children, function (child) {
    if (!match && _react.default.isValidElement(child)) {
      var path = child.props.path || child.props.from;
      var _children = child.props.children;

      if (path != null) {
        match = !!(0, _reactRouterDom.matchPath)(location.pathname, _objectSpread({}, child.props, {
          path: path
        }));
      } else if (_children && _children.forEach) {
        // Support <Switch> components
        _children.forEach(function (_child) {
          var _path = _child.props.path || _child.props.from;

          if (_path != null) {
            match = !!(0, _reactRouterDom.matchPath)(location.pathname, _objectSpread({}, _child.props, {
              _path: _path
            }));
          }
        });
      }
    }
  });

  return _react.default.createElement(_react.default.Fragment, null, (!match || alwaysRender) && (component ? _react.default.createElement(component, {
    match: match
  }) : render ? render(match) : null), children);
};

NoMatch.propTypes = {
  children: _propTypes.default.node,
  location: _propTypes.default.object,
  component: _propTypes.default.elementType,
  render: _propTypes.default.func,
  alwaysRender: _propTypes.default.bool,
  shouldBypass: _propTypes.default.func
};
NoMatch.defaultProps = {
  alwaysRender: false
};

var _default = (0, _reactRouterDom.withRouter)(NoMatch);

exports.default = _default;