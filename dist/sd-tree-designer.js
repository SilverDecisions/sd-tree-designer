require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppUtils = void 0;

var d3 = _interopRequireWildcard(require("./d3"));

var _templates = require("./templates");

var _i18n = require("./i18n/i18n");

var _sdUtils = require("sd-utils");

function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== "function") return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}

function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache(nodeInterop);

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var AppUtils = /*#__PURE__*/function () {
  function AppUtils() {
    _classCallCheck(this, AppUtils);
  }

  _createClass(AppUtils, null, [{
    key: "placeTextWithEllipsis",
    value: //places textString in textObj, adds an ellipsis if text can't fit in width
    function placeTextWithEllipsis(textD3Obj, textString, width) {
      var textObj = textD3Obj.node();
      textObj.textContent = textString;
      var margin = 0;
      var ellipsisLength = 9; //ellipsis is needed

      if (textObj.getComputedTextLength() > width + margin) {
        for (var x = textString.length - 3; x > 0; x -= 1) {
          if (textObj.getSubStringLength(0, x) + ellipsisLength <= width + margin) {
            textObj.textContent = textString.substring(0, x) + "...";
            return true;
          }
        }

        textObj.textContent = "..."; //can't place at all

        return true;
      }

      return false;
    }
  }, {
    key: "placeTextWithEllipsisAndTooltip",
    value: function placeTextWithEllipsisAndTooltip(textD3Obj, textString, width, tooltip) {
      var ellipsisPlaced = AppUtils.placeTextWithEllipsis(textD3Obj, textString, width);

      if (ellipsisPlaced && tooltip) {
        textD3Obj.on("mouseover", function (d) {
          tooltip.transition().duration(200).style("opacity", .9);
          tooltip.html(textString).style("left", d3.event.pageX + 5 + "px").style("top", d3.event.pageY - 28 + "px");
        });
        textD3Obj.on("mouseout", function (d) {
          tooltip.transition().duration(500).style("opacity", 0);
        });
      }
    }
  }, {
    key: "getFontSize",
    value: function getFontSize(element) {
      return window.getComputedStyle(element, null).getPropertyValue("font-size");
    }
  }, {
    key: "getTranslation",
    value: function getTranslation(transform) {
      // Create a dummy g for calculation purposes only. This will never
      // be appended to the DOM and will be discarded once this function
      // returns.
      var g = document.createElementNS("http://www.w3.org/2000/svg", "g"); // Set the transform attribute to the provided string value.

      g.setAttributeNS(null, "transform", transform); // consolidate the SVGTransformList containing all transformations
      // to a single SVGTransform of type SVG_TRANSFORM_MATRIX and get
      // its SVGMatrix.

      var matrix = g.transform.baseVal.consolidate().matrix; // As per definition values e and f are the ones for the translation.

      return [matrix.e, matrix.f];
    }
  }, {
    key: "closestPoint",
    value: function closestPoint(pathNode, point) {
      var pathLength = pathNode.getTotalLength(),
          precision = 8,
          best,
          bestLength,
          bestDistance = Infinity; // linear scan for coarse approximation

      for (var scan, scanLength = 0, scanDistance; scanLength <= pathLength; scanLength += precision) {
        if ((scanDistance = distance2(scan = pathNode.getPointAtLength(scanLength))) < bestDistance) {
          best = scan, bestLength = scanLength, bestDistance = scanDistance;
        }
      } // binary search for precise estimate


      precision /= 2;

      while (precision > 0.5) {
        var before, after, beforeLength, afterLength, beforeDistance, afterDistance;

        if ((beforeLength = bestLength - precision) >= 0 && (beforeDistance = distance2(before = pathNode.getPointAtLength(beforeLength))) < bestDistance) {
          best = before, bestLength = beforeLength, bestDistance = beforeDistance;
        } else if ((afterLength = bestLength + precision) <= pathLength && (afterDistance = distance2(after = pathNode.getPointAtLength(afterLength))) < bestDistance) {
          best = after, bestLength = afterLength, bestDistance = afterDistance;
        } else {
          precision /= 2;
        }
      }

      best = [best.x, best.y];
      best.distance = Math.sqrt(bestDistance);
      return best;

      function distance2(p) {
        var dx = p.x - point[0],
            dy = p.y - point[1];
        return dx * dx + dy * dy;
      }
    }
  }, {
    key: "growl",
    value: function growl(message) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'info';
      var position = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'right';
      var time = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 2000;

      var html = _templates.Templates.get('growl', {
        message: message,
        type: type
      });

      var g = d3.select('body').selectOrAppend('div.sd-growl-list.' + position).append('div').html(html);
      setTimeout(function () {
        g.remove();
      }, time);
    }
  }, {
    key: "createElement",
    value: function createElement(tag, attribs, parent) {
      var el = document.createElement(tag);

      if (attribs) {
        AppUtils.deepExtend(el, attribs);
      }

      if (parent) {
        parent.appendChild(el);
      }

      return el;
    }
  }, {
    key: "removeElement",
    value: function removeElement(element) {
      element.parentNode.removeChild(element);
    }
  }, {
    key: "replaceUrls",
    value: function replaceUrls(text) {
      if (!text) {
        return text;
      }

      var urlRegexp = /((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/;
      return text.replace(urlRegexp, '<a href="$1" target="_blank">$1</a>');
    }
  }, {
    key: "escapeHtml",
    value: function escapeHtml(html) {
      var text = document.createTextNode(html);
      var div = document.createElement('div');
      div.appendChild(text);
      return div.innerHTML;
    }
  }, {
    key: "dispatchHtmlEvent",
    value: function dispatchHtmlEvent(element, name) {
      if ("createEvent" in document) {
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent(name, false, true);
        element.dispatchEvent(evt);
      } else element.fireEvent("on" + name);
    }
  }, {
    key: "dispatchEvent",
    value: function dispatchEvent(name, data) {
      var event;

      try {
        event = new CustomEvent(name, {
          'detail': data
        });
      } catch (e) {
        //IE
        event = document.createEvent('CustomEvent');
        event.initCustomEvent(name, false, false, data);
      }

      document.dispatchEvent(event);
    }
  }, {
    key: "getValidationMessage",
    value: function getValidationMessage(error) {
      if (_sdUtils.Utils.isString(error)) {
        error = {
          name: error
        };
      }

      var key = 'validation.' + error.name;
      return _i18n.i18n.t(key, error.data);
    }
  }, {
    key: "hide",
    value: function hide(selection) {
      selection.classed('sd-hidden', true);
    }
  }, {
    key: "show",
    value: function show(selection) {
      var _show = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      selection.classed('sd-hidden', !_show);
    }
  }, {
    key: "isHidden",
    value: function isHidden(el) {
      var exact = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (!el) {
        return true;
      }

      if (exact) {
        var style = window.getComputedStyle(el);
        return style.display === 'none';
      }

      return el.offsetParent === null;
    }
  }, {
    key: "getJSON",
    value: function getJSON(url, callback) {
      var xhr = new XMLHttpRequest();
      xhr.open('get', url, true);
      xhr.responseType = 'json';

      xhr.onload = function () {
        var status = xhr.status;

        if (status == 200) {
          callback(xhr.response, null);
        } else {
          callback(null, status);
        }
      };

      xhr.send();
    }
  }]);

  return AppUtils;
}();

exports.AppUtils = AppUtils;

AppUtils.sanitizeHeight = function (height, container) {
  return height || parseInt(container.style('height'), 10) || 400;
};

AppUtils.sanitizeWidth = function (width, container) {
  return width || parseInt(container.style('width'), 10) || 960;
};

AppUtils.availableHeight = function (height, container, margin) {
  return Math.max(0, AppUtils.sanitizeHeight(height, container) - margin.top - margin.bottom);
};

AppUtils.availableWidth = function (width, container, margin) {
  return Math.max(0, AppUtils.sanitizeWidth(width, container) - margin.left - margin.right);
};

},{"./d3":8,"./i18n/i18n":12,"./templates":20,"sd-utils":"sd-utils"}],2:[function(require,module,exports){
"use strict";

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContextMenu = void 0;

var d3 = _interopRequireWildcard(require("../d3"));

function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== "function") return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}

function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache(nodeInterop);

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
/*based on:
 * github.com/patorjk/d3-context-menu */


var ContextMenu = /*#__PURE__*/function () {
  function ContextMenu(menu, opts) {
    _classCallCheck(this, ContextMenu);

    var self = this;

    if (typeof opts === 'function') {
      self.openCallback = opts;
    } else {
      opts = opts || {};
      self.openCallback = opts.onOpen;
      self.closeCallback = opts.onClose;
    } // create the div element that will hold the context menu


    d3.selectAll('.d3-context-menu').data([1]).enter().append('div').attr('class', 'd3-context-menu'); // close menu

    d3.select('body').on('click.d3-context-menu', function () {
      d3.select('.d3-context-menu').style('display', 'none');

      if (self.closeCallback) {
        self.closeCallback();
      }
    }); // this gets executed when a contextmenu event occurs

    return function (data, index) {
      var elm = this;
      d3.selectAll('.d3-context-menu').html('');
      var list = d3.selectAll('.d3-context-menu').on('contextmenu', function (d) {
        d3.select('.d3-context-menu').style('display', 'none');
        d3.event.preventDefault();
        d3.event.stopPropagation();
      }).append('ul');
      list.selectAll('li').data(typeof menu === 'function' ? menu(data) : menu).enter().append('li').attr('class', function (d) {
        var ret = '';

        if (d.divider) {
          ret += ' is-divider';
        }

        if (d.disabled) {
          ret += ' is-disabled';
        }

        if (!d.action) {
          ret += ' is-header';
        }

        return ret;
      }).html(function (d) {
        if (d.divider) {
          return '<hr>';
        }

        if (!d.title) {
          console.error('No title attribute set. Check the spelling of your options.');
        }

        return typeof d.title === 'string' ? d.title : d.title(data);
      }).on('click', function (d, i) {
        if (d.disabled) return; // do nothing if disabled

        if (!d.action) return; // headers have no "action"

        d.action(elm, data, index);
        d3.select('.d3-context-menu').style('display', 'none');

        if (self.closeCallback) {
          self.closeCallback();
        }
      }); // the openCallback allows an action to fire before the menu is displayed
      // an example usage would be closing a tooltip

      if (self.openCallback) {
        if (self.openCallback(data, index) === false) {
          return;
        }
      } // display context menu


      d3.select('.d3-context-menu').style('left', d3.event.pageX - 2 + 'px').style('top', d3.event.pageY - 2 + 'px').style('display', 'block');
      d3.event.preventDefault();
      d3.event.stopPropagation();
    };
  }

  _createClass(ContextMenu, null, [{
    key: "hide",
    value: function hide() {
      d3.select('.d3-context-menu').style('display', 'none');
    }
  }]);

  return ContextMenu;
}();

exports.ContextMenu = ContextMenu;

},{"../d3":8}],3:[function(require,module,exports){
"use strict";

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EdgeContextMenu = void 0;

var _contextMenu = require("./context-menu");

var _i18n = require("../i18n/i18n");

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

var EdgeContextMenu = /*#__PURE__*/function (_ContextMenu) {
  _inherits(EdgeContextMenu, _ContextMenu);

  var _super = _createSuper(EdgeContextMenu);

  function EdgeContextMenu(treeDesigner) {
    var _this;

    _classCallCheck(this, EdgeContextMenu);

    var menu = function menu(d) {
      var menu = [];
      menu.push({
        title: _i18n.i18n.t('contextMenu.edge.injectDecisionNode'),
        action: function action(elm, d, i) {
          treeDesigner.injectDecisionNode(d);
        }
      });
      menu.push({
        title: _i18n.i18n.t('contextMenu.edge.injectChanceNode'),
        action: function action(elm, d, i) {
          treeDesigner.injectChanceNode(d);
        }
      });
      return menu;
    };

    _this = _super.call(this, menu);
    _this.treeDesigner = treeDesigner;
    return _this;
  }

  return EdgeContextMenu;
}(_contextMenu.ContextMenu);

exports.EdgeContextMenu = EdgeContextMenu;

},{"../i18n/i18n":12,"./context-menu":2}],4:[function(require,module,exports){
"use strict";

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MainContextMenu = void 0;

var _contextMenu = require("./context-menu");

var _sdModel = require("sd-model");

var d3 = _interopRequireWildcard(require("../d3"));

var _i18n = require("../i18n/i18n");

function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== "function") return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}

function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache(nodeInterop);

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

var MainContextMenu = /*#__PURE__*/function (_ContextMenu) {
  _inherits(MainContextMenu, _ContextMenu);

  var _super = _createSuper(MainContextMenu);

  function MainContextMenu(treeDesigner) {
    var _this;

    _classCallCheck(this, MainContextMenu);

    var mousePosition = null;

    var menu = function menu(d) {
      var menu = [];
      menu.push({
        title: _i18n.i18n.t('contextMenu.main.addDecisionNode'),
        action: function action(elm, d, i) {
          var newNode = new _sdModel.domain.DecisionNode(mousePosition);
          treeDesigner.addNode(newNode);
        }
      });
      menu.push({
        title: _i18n.i18n.t('contextMenu.main.addChanceNode'),
        action: function action(elm, d, i) {
          var newNode = new _sdModel.domain.ChanceNode(mousePosition);
          treeDesigner.addNode(newNode);
        }
      });
      menu.push({
        divider: true
      });
      menu.push({
        title: _i18n.i18n.t('contextMenu.main.addText'),
        action: function action(elm, d, i) {
          var newText = new _sdModel.domain.Text(mousePosition);
          treeDesigner.addText(newText);
        }
      });
      menu.push({
        divider: true
      });
      menu.push({
        title: _i18n.i18n.t('contextMenu.main.paste'),
        action: function action(elm, d, i) {
          treeDesigner.pasteToNewLocation(mousePosition);
        },
        disabled: !treeDesigner.copiedNodes || !treeDesigner.copiedNodes.length
      });
      menu.push({
        divider: true
      });
      menu.push({
        title: _i18n.i18n.t('contextMenu.main.selectAllNodes'),
        action: function action(elm, d, i) {
          treeDesigner.selectAllNodes();
        }
      });
      return menu;
    };

    _this = _super.call(this, menu, {
      onOpen: function onOpen() {
        treeDesigner.clearSelection();
        mousePosition = new _sdModel.domain.Point(d3.mouse(treeDesigner.svg.node())).move(treeDesigner.getMainGroupTranslation(true));
      }
    });
    _this.treeDesigner = treeDesigner;
    return _this;
  }

  return MainContextMenu;
}(_contextMenu.ContextMenu);

exports.MainContextMenu = MainContextMenu;

},{"../d3":8,"../i18n/i18n":12,"./context-menu":2,"sd-model":"sd-model"}],5:[function(require,module,exports){
"use strict";

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NodeContextMenu = void 0;

var _contextMenu = require("./context-menu");

var _sdModel = require("sd-model");

var _i18n = require("../i18n/i18n");

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

var NodeContextMenu = /*#__PURE__*/function (_ContextMenu) {
  _inherits(NodeContextMenu, _ContextMenu);

  var _super = _createSuper(NodeContextMenu);

  function NodeContextMenu(treeDesigner, operationsForObject) {
    var _this;

    _classCallCheck(this, NodeContextMenu);

    var menu = function menu(d) {
      var copyMenuItem = {
        title: _i18n.i18n.t('contextMenu.node.copy'),
        action: function action(elm, d, i) {
          treeDesigner.selectNode(d, !treeDesigner.isNodeSelected(d));
          treeDesigner.copySelectedNodes();
        }
      };
      var cutMenuItem = {
        title: _i18n.i18n.t('contextMenu.node.cut'),
        action: function action(elm, d, i) {
          treeDesigner.selectNode(d, !treeDesigner.isNodeSelected(d));
          treeDesigner.cutSelectedNodes();
        }
      };
      var pasteMenuItem = {
        title: _i18n.i18n.t('contextMenu.node.paste'),
        action: function action(elm, d, i) {
          treeDesigner.pasteToNode(d);
        },
        disabled: d.folded || !treeDesigner.copiedNodes || !treeDesigner.copiedNodes.length
      };
      var deleteMenuItem = {
        title: _i18n.i18n.t('contextMenu.node.delete'),
        action: function action(elm, d, i) {
          treeDesigner.selectNode(d, !treeDesigner.isNodeSelected(d));
          treeDesigner.removeSelectedNodes();
        }
      };
      var menu = [];

      if (d.type == _sdModel.domain.TerminalNode.$TYPE) {
        menu = [copyMenuItem, cutMenuItem, deleteMenuItem];
        NodeContextMenu.addNodeConversionOptions(d, menu, treeDesigner);
        return menu;
      }

      if (!d.folded) {
        menu.push({
          title: _i18n.i18n.t('contextMenu.node.addDecisionNode'),
          action: function action(elm, d, i) {
            treeDesigner.addDecisionNode(d);
          }
        });
        menu.push({
          title: _i18n.i18n.t('contextMenu.node.addChanceNode'),
          action: function action(elm, d, i) {
            treeDesigner.addChanceNode(d);
          }
        });
        menu.push({
          title: _i18n.i18n.t('contextMenu.node.addTerminalNode'),
          action: function action(elm, d, i) {
            treeDesigner.addTerminalNode(d);
          }
        });
        menu.push({
          divider: true
        });
      }

      menu.push(copyMenuItem);
      menu.push(cutMenuItem);
      menu.push(pasteMenuItem);
      menu.push(deleteMenuItem);
      NodeContextMenu.addNodeConversionOptions(d, menu, treeDesigner);
      menu.push({
        divider: true
      });
      menu.push({
        title: _i18n.i18n.t('contextMenu.node.selectSubtree'),
        action: function action(elm, d, i) {
          treeDesigner.selectSubTree(d, true);
        }
      });

      if (!d.folded) {
        menu.push({
          title: _i18n.i18n.t('contextMenu.node.fold'),
          action: function action(elm, d, i) {
            treeDesigner.foldSubtree(d);
          }
        });
      } else {
        menu.push({
          title: _i18n.i18n.t('contextMenu.node.unfold'),
          action: function action(elm, d, i) {
            treeDesigner.foldSubtree(d, false);
          }
        });
      }

      if (operationsForObject) {
        var operations = operationsForObject(d);

        if (operations.length) {
          menu.push({
            divider: true
          });
          operations.forEach(function (op) {
            menu.push({
              title: _i18n.i18n.t('contextMenu.node.' + op.name),
              action: function action(elm, d, i) {
                treeDesigner.performOperation(d, op);
              },
              disabled: !op.canPerform(d)
            });
          });
        }
      }

      return menu;
    };

    _this = _super.call(this, menu);
    _this.treeDesigner = treeDesigner;
    return _this;
  }

  _createClass(NodeContextMenu, null, [{
    key: "addNodeConversionOptions",
    value: function addNodeConversionOptions(d, menu, treeDesigner) {
      var conversionOptions = NodeContextMenu.getNodeConversionOptions(d, treeDesigner);

      if (conversionOptions.length) {
        menu.push({
          divider: true
        });
        conversionOptions.forEach(function (o) {
          return menu.push(o);
        });
      }
    }
  }, {
    key: "getNodeConversionOptions",
    value: function getNodeConversionOptions(d, treeDesigner) {
      var options = [];

      if (d.folded) {
        return [];
      }

      var allAllowedTypes = [_sdModel.domain.DecisionNode.$TYPE, _sdModel.domain.ChanceNode.$TYPE, _sdModel.domain.TerminalNode.$TYPE];

      if (!d.childEdges.length && d.$parent) {
        allAllowedTypes.filter(function (t) {
          return t !== d.type;
        }).forEach(function (type) {
          options.push(NodeContextMenu.getNodeConversionOption(type, treeDesigner));
        });
      } else {
        if (d instanceof _sdModel.domain.DecisionNode) {
          options.push(NodeContextMenu.getNodeConversionOption(_sdModel.domain.ChanceNode.$TYPE, treeDesigner));
        } else {
          options.push(NodeContextMenu.getNodeConversionOption(_sdModel.domain.DecisionNode.$TYPE, treeDesigner));
        }
      }

      return options;
    }
  }, {
    key: "getNodeConversionOption",
    value: function getNodeConversionOption(typeToConvertTo, treeDesigner) {
      return {
        title: _i18n.i18n.t('contextMenu.node.convert.' + typeToConvertTo),
        action: function action(elm, d, i) {
          treeDesigner.convertNode(d, typeToConvertTo);
        }
      };
    }
  }]);

  return NodeContextMenu;
}(_contextMenu.ContextMenu);

exports.NodeContextMenu = NodeContextMenu;

},{"../i18n/i18n":12,"./context-menu":2,"sd-model":"sd-model"}],6:[function(require,module,exports){
"use strict";

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextContextMenu = void 0;

var _contextMenu = require("./context-menu");

var _i18n = require("../i18n/i18n");

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

var TextContextMenu = /*#__PURE__*/function (_ContextMenu) {
  _inherits(TextContextMenu, _ContextMenu);

  var _super = _createSuper(TextContextMenu);

  function TextContextMenu(treeDesigner) {
    var _this;

    _classCallCheck(this, TextContextMenu);

    var menu = function menu(d) {
      var deleteMenuItem = {
        title: _i18n.i18n.t('contextMenu.text.delete'),
        action: function action(elm, d, i) {
          treeDesigner.selectText(d, true, true);
          treeDesigner.removeSelectedTexts();
        }
      };
      var menu = [];
      menu.push(deleteMenuItem);
      return menu;
    };

    _this = _super.call(this, menu);
    _this.treeDesigner = treeDesigner;
    return _this;
  }

  return TextContextMenu;
}(_contextMenu.ContextMenu);

exports.TextContextMenu = TextContextMenu;

},{"../i18n/i18n":12,"./context-menu":2}],7:[function(require,module,exports){
"use strict";

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.D3Extensions = void 0;

var d3 = _interopRequireWildcard(require("./d3"));

function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== "function") return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}

function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache(nodeInterop);

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var D3Extensions = /*#__PURE__*/function () {
  function D3Extensions() {
    _classCallCheck(this, D3Extensions);
  }

  _createClass(D3Extensions, null, [{
    key: "extend",
    value: function extend() {
      d3.selection.prototype.enter.prototype.insertSelector = d3.selection.prototype.insertSelector = function (selector, before) {
        return D3Extensions.insertSelector(this, selector, before);
      };

      d3.selection.prototype.enter.prototype.appendSelector = d3.selection.prototype.appendSelector = function (selector) {
        return D3Extensions.appendSelector(this, selector);
      };

      d3.selection.prototype.enter.prototype.selectOrAppend = d3.selection.prototype.selectOrAppend = function (selector) {
        return D3Extensions.selectOrAppend(this, selector);
      };

      d3.selection.prototype.enter.prototype.selectOrInsert = d3.selection.prototype.selectOrInsert = function (selector, before) {
        return D3Extensions.selectOrInsert(this, selector, before);
      };
    }
  }, {
    key: "insertOrAppendSelector",
    value: function insertOrAppendSelector(parent, selector, operation, before) {
      var selectorParts = selector.split(/([\.\#])/);
      var element = parent[operation](selectorParts.shift(), before); //":first-child"

      while (selectorParts.length > 1) {
        var selectorModifier = selectorParts.shift();
        var selectorItem = selectorParts.shift();

        if (selectorModifier === ".") {
          element = element.classed(selectorItem, true);
        } else if (selectorModifier === "#") {
          element = element.attr('id', selectorItem);
        }
      }

      return element;
    }
  }, {
    key: "insertSelector",
    value: function insertSelector(parent, selector, before) {
      return D3Extensions.insertOrAppendSelector(parent, selector, "insert", before);
    }
  }, {
    key: "appendSelector",
    value: function appendSelector(parent, selector) {
      return D3Extensions.insertOrAppendSelector(parent, selector, "append");
    }
  }, {
    key: "selectOrAppend",
    value: function selectOrAppend(parent, selector, element) {
      var selection = parent.select(selector);

      if (selection.empty()) {
        if (element) {
          return parent.append(element);
        }

        return D3Extensions.appendSelector(parent, selector);
      }

      return selection;
    }
  }, {
    key: "selectOrInsert",
    value: function selectOrInsert(parent, selector, before) {
      var selection = parent.select(selector);

      if (selection.empty()) {
        return D3Extensions.insertSelector(parent, selector, before);
      }

      return selection;
    }
  }]);

  return D3Extensions;
}();

exports.D3Extensions = D3Extensions;

},{"./d3":8}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _d3Dispatch = require("d3-dispatch");

Object.keys(_d3Dispatch).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _d3Dispatch[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _d3Dispatch[key];
    }
  });
});

var _d3Scale = require("d3-scale");

Object.keys(_d3Scale).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _d3Scale[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _d3Scale[key];
    }
  });
});

var _d3Selection = require("d3-selection");

Object.keys(_d3Selection).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _d3Selection[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _d3Selection[key];
    }
  });
});

var _d3Shape = require("d3-shape");

Object.keys(_d3Shape).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _d3Shape[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _d3Shape[key];
    }
  });
});

var _d3Drag = require("d3-drag");

Object.keys(_d3Drag).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _d3Drag[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _d3Drag[key];
    }
  });
});

var _d3Brush = require("d3-brush");

Object.keys(_d3Brush).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _d3Brush[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _d3Brush[key];
    }
  });
});

var _d3Array = require("d3-array");

Object.keys(_d3Array).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _d3Array[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _d3Array[key];
    }
  });
});

var _d3Hierarchy = require("d3-hierarchy");

Object.keys(_d3Hierarchy).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _d3Hierarchy[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _d3Hierarchy[key];
    }
  });
});

var _d3TimeFormat = require("d3-time-format");

Object.keys(_d3TimeFormat).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _d3TimeFormat[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _d3TimeFormat[key];
    }
  });
});

},{"d3-array":"d3-array","d3-brush":"d3-brush","d3-dispatch":"d3-dispatch","d3-drag":"d3-drag","d3-hierarchy":"d3-hierarchy","d3-scale":"d3-scale","d3-selection":"d3-selection","d3-shape":"d3-shape","d3-time-format":"d3-time-format"}],9:[function(require,module,exports){
module.exports={
    "contextMenu":{
        "main":{
            "addDecisionNode": "Entscheidungsknoten hinzufügen",
            "addChanceNode": "Zufall Knoten hinzufügen",
            "addText": "Text hinzufügen ",
            "paste": "Einfügen",
            "selectAllNodes": "Alle Knoten auswählen"
        },
        "node":{
            "copy": "Kopieren",
            "cut": "Ausschneiden",
            "paste": "Einfügen",
            "delete": "Löschen",
            "addDecisionNode": "Entscheidungsknoten hinzufügen",
            "addChanceNode": "Zufall Knoten hinzufügen",
            "addTerminalNode": "Endknotten hinzufügen",
            "convert":{
                "decision": "Als Entscheidungsknoten",
                "chance": "Als Zufall Knoten",
                "terminal": "Als Endknoten"
            },
            "selectSubtree": "Teilbaum wählen",
            "fold": "Teilbaum falten",
            "unfold": "Teilbaum entfalten",

            "flipSubtree": "Teilbaum umdrehen",
            "payoffsTransformation": "Auszahlungen transformieren"
        },
        "edge":{
            "injectDecisionNode": "Entscheidungsknoten Injizieren",
            "injectChanceNode": "Zufall Knoten Injizieren"
        },
        "text":{
            "delete": "Löschen"
        }
    },
    "validation":{
        "incompletePath": "Pfad, der nicht mit dem Endknoten endet",
        "probabilityDoNotSumUpTo1": "Die Summe der Wahrscheinlichkeiten ist nicht gleich 1",
        "invalidProbability": "Ungültige Wahrscheinlichkeit im Zweig #{{number}}",
        "invalidPayoff": "Ungültige Auszahlung in Zweig #{{number}}"
    },
    "growl":{
        "brushDisabled": "Auswahlbürste deaktiviert",
        "brushEnabled": "Auswahlbürste aktiviert"
    },
    "tooltip":{
        "node":{
            "payoff": {
                "default": "Auszahlung {{number}}",
                "named": "{{name}}"
            },
            "aggregatedPayoff": {
                "default": "Aggregierte Auszahlung {{number}}",
                "named": "Aggregierte {{name}}"
            },
            "probabilityToEnter": "Wahrscheinlichkeit"
        },
        "edge":{
            "payoff": {
                "default": "Auszahlung {{number}}: {{value}}",
                "named": "{{name}}: {{value}}"
            },
            "probability": "Wahrscheinlichkeit: {{value}}"
        }
    }
}

},{}],10:[function(require,module,exports){
module.exports={
    "contextMenu":{
        "main":{
            "addDecisionNode": "Add Decision Node",
            "addChanceNode": "Add Chance Node",
            "addText": "Add Text",
            "paste": "Paste",
            "selectAllNodes": "Select all nodes"
        },
        "node":{
            "copy": "Copy",
            "cut": "Cut",
            "paste": "Paste",
            "delete": "Delete",
            "addDecisionNode": "Add Decision Node",
            "addChanceNode": "Add Chance Node",
            "addTerminalNode": "Add Terminal Node",
            "convert":{
                "decision": "As Decision Node",
                "chance": "As Chance Node",
                "terminal": "As Terminal Node"
            },
            "selectSubtree": "Select subtree",
            "fold": "Fold subtree",
            "unfold": "Unfold subtree",
            "flipSubtree": "Flip subtree",
            "payoffsTransformation": "Transform payoffs"
        },
        "edge":{
            "injectDecisionNode": "Inject Decision Node",
            "injectChanceNode": "Inject Chance Node"
        },
        "text":{
            "delete": "Delete"
        }
    },
    "validation":{
        "incompletePath": "Path not ending with terminal node",
        "probabilityDoNotSumUpTo1": "Probabilities do not sum up to 1",
        "invalidProbability": "Invalid probability in edge #{{number}}",
        "invalidPayoff": "Invalid payoff in edge #{{number}}"
    },
    "growl":{
        "brushDisabled": "Selection brush disabled",
        "brushEnabled": "Selection brush enabled"
    },
    "tooltip":{
        "node":{
            "payoff": {
                "default": "Payoff {{number}}",
                "named": "{{name}}"
            },
            "aggregatedPayoff": {
                "default": "Aggregated Payoff {{number}}",
                "named": "Aggregated {{name}}"
            },
            "probabilityToEnter": "Probability to enter"
        },
        "edge":{
            "payoff": {
                "default": "Payoff {{number}}: {{value}}",
                "named": "{{name}}: {{value}}"
            },
            "probability": "Probability: {{value}}"
        }
    }
}

},{}],11:[function(require,module,exports){
module.exports={
    "contextMenu":{
        "main":{
            "addDecisionNode": "Ajouter noud de décision",
            "addChanceNode": "Ajouter noud aléatoire",
            "addText": "Ajouter du texte",
            "paste": "Coller",
            "selectAllNodes": "Sélectionner tous les nouds"
        },
        "node":{
            "copy": "Copie",
            "cut": "Couper",
            "paste": "Coller",
            "delete": "Effacer",
            "addDecisionNode": "Ajouter noud de décision",
            "addChanceNode": "Ajouter noud aléatoire",
            "addTerminalNode": "Ajouter un noeud terminal",
            "convert":{
                "decision": "Comme noud de décision",
                "chance": "Comme noud aléatoire",
                "terminal": "Comme un noeud terminal"
            },
            "selectSubtree": "Sélectionner une sous-arborescence",
            "fold": "Plier sous-arbre",
            "unfold": "Déplier arbre sous-arbre",
            "flipSubtree": "Basculer sous-arbre",
            "payoffsTransformation": "Transformez les gains"
        },
        "edge":{
            "injectDecisionNode": "Injecter un noeud de décision",
            "injectChanceNode": "Injecter un noeud de chance"
        },
        "text":{
            "delete": "Effacer"
        }
    },
    "validation":{
        "incompletePath": "Parcours non terminé par noeud terminal",
        "probabilityDoNotSumUpTo1": "La somme des probabilités n'est pas 1 ou plus",
        "invalidProbability": "Probabilité invalide - le bord #{{number}}",
        "invalidPayoff": "Avantage invalide - le bord #{{number}}"
    },
    "growl":{
        "brushDisabled": "Brosse de sélection désactivée",
        "brushEnabled": "Brosse de sélection activée"
    },
    "tooltip":{
        "node":{
            "payoff": {
                "default": "Avantage {{number}}",
                "named": "{{name}}"
            },
            "aggregatedPayoff": {
                "default": "Avantage agrégé {{number}}",
                "named": "Agrégé  {{name}}"
            },
            "probabilityToEnter": "Probabilité d'entrée"
        },
        "edge":{
            "payoff": {
                "default": "Avantage {{number}}: {{value}}",
                "named": "{{name}}: {{value}}"
            },
            "probability": "Probabilité: {{value}}"
        }
    }
}

},{}],12:[function(require,module,exports){
"use strict";

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.i18n = void 0;

var _i18next = _interopRequireDefault(require("i18next"));

var en = _interopRequireWildcard(require("./en.json"));

var pl = _interopRequireWildcard(require("./pl.json"));

var it = _interopRequireWildcard(require("./it.json"));

var de = _interopRequireWildcard(require("./de.json"));

var fr = _interopRequireWildcard(require("./fr.json"));

function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== "function") return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}

function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache(nodeInterop);

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var i18n = /*#__PURE__*/function () {
  function i18n() {
    _classCallCheck(this, i18n);
  }

  _createClass(i18n, null, [{
    key: "init",
    value: function init(lng) {
      i18n.language = lng;
      var resources = {
        en: {
          translation: en
        },
        pl: {
          translation: pl
        },
        it: {
          translation: it
        },
        de: {
          translation: de
        },
        fr: {
          translation: fr
        }
      };
      i18n.$instance = _i18next["default"].createInstance({
        lng: lng,
        fallbackLng: 'en',
        resources: resources
      }, function (err, t) {});
    }
  }, {
    key: "t",
    value: function t(key, opt) {
      return i18n.$instance.t(key, opt);
    }
  }]);

  return i18n;
}();

exports.i18n = i18n;

},{"./de.json":9,"./en.json":10,"./fr.json":11,"./it.json":13,"./pl.json":14,"i18next":"i18next"}],13:[function(require,module,exports){
module.exports={
    "contextMenu":{
        "main":{
            "addDecisionNode": "Aggiungi un nodo di decisione",
            "addChanceNode": "Aggiungi un nodo opportunità",
            "addText": "Aggiungi testo",
            "paste": "Incolla",
            "selectAllNodes": "Seleziona tutti i nodi"
        },
        "node":{
            "copy": "Copia",
            "cut": "Taglia",
            "paste": "Incolla",
            "delete": "Cancella",
            "addDecisionNode": "Aggiungi un nodo di decisione",
            "addChanceNode": "Aggiungi un nodo opportunità",
            "addTerminalNode": "Aggiungi un nodo terminale",
            "convert":{
                "decision": "Come Decision Node",
                "chance": "Come Chance Node",
                "terminal": "Come Terminal Node"
            },
            "selectSubtree": "Seleziona Sotto-albero",
            "fold": "Piega sotto-albero",
            "unfold": "Dispiegarsi sotto-albero",
            "flipSubtree": "Ribalta sotto-albero",
            "payoffsTransformation": "Trasforma i profitti"
        },
        "edge":{
            "injectDecisionNode": "Inietta nodo di decisione",
            "injectChanceNode": "Inietta nodo opportunità"
        },
        "text":{
            "delete": "Cancella"
        }
    },
    "validation":{
        "incompletePath": "Percorso senza nodo terminale",
        "probabilityDoNotSumUpTo1": "La somma delle probabilità è diversa da 1",
        "invalidProbability": "Probabilità non valida - bordo #{{number}}",
        "invalidPayoff": "Saldo non valido - bordo #{{number}}"
    },
    "growl":{
        "brushDisabled": "Selezione pennello disabilitata",
        "brushEnabled": "Selezione pennello abilitata"
    },
    "tooltip":{
        "node":{
            "payoff": {
                "default": "Saldo {{number}}",
                "named": "{{name}}"
            },
            "aggregatedPayoff": {
                "default": "Saldo aggregato {{number}}",
                "named": "Aggregato {{name}}"
            },
            "probabilityToEnter": "Probabilità da inserire"
        },
        "edge":{
            "payoff": {
                "default": "Saldo {{number}}: {{value}}",
                "named": "{{name}}: {{value}}"
            },
            "probability": "Probabilità: {{value}}"
        }
    }
}

},{}],14:[function(require,module,exports){
module.exports={

    "contextMenu":{
        "main":{
            "addDecisionNode": "Dodaj Węzeł Decyzyjny",
            "addChanceNode": "Dodaj Węzeł Losowy",
            "addText": "Dodaj Tekst",
            "paste": "Wklej",
            "selectAllNodes": "Zaznacz wszystkie węzły"
        },
        "node":{
            "copy": "Kopiuj",
            "cut": "Wytnij",
            "paste": "Wklej",
            "delete": "Usuń",
            "addDecisionNode": "Dodaj Węzeł Decyzyjny",
            "addChanceNode": "Dodaj Węzeł Losowy",
            "addTerminalNode": "Dodaj Węzeł Końcowy",
            "convert":{
                "decision": "Jako Węzeł Decyzyjny",
                "chance": "Jako Węzeł Losowy",
                "terminal": "Jako Węzeł Końcowy"
            },
            "selectSubtree": "Zaznacz poddrzewo",
            "fold": "Zwiń poddrzewo",
            "unfold": "Rozwiń poddrzewo",
            "flipSubtree": "Przewróć poddrzewo",
            "payoffsTransformation": "Przekształć wypłaty"
        },
        "edge":{
            "injectDecisionNode": "Wstrzyknij Węzeł Decyzyjny",
            "injectChanceNode": "Wstrzyknij Węzeł Losowy"
        },
        "text":{
            "delete": "Usuń"
        }
    },

    "validation":{
        "incompletePath": "Ostatnim węzłem w ścieżce powinien być Węzeł Końcowy",
        "probabilityDoNotSumUpTo1": "Prawdopodobieństwa nie sumują sie do 1",
        "invalidProbability": "Niepoprawne prawdopodobieństwo na krawędzi #{{number}}",
        "invalidPayoff": "Niepoprawna wypłata na krawędzi #{{number}}"
    },
    "growl":{
        "brushDisabled": "Zaznaczanie wyłączone",
        "brushEnabled": "Zaznaczanie włączone"
    },
    "tooltip":{
        "node":{
            "payoff": {
                "default": "Wypłata {{number}}",
                "named": "{{name}}"
            },
            "aggregatedPayoff": {
                "default": "Zagregowana wypłata {{number}}",
                "named": "Zagregowana {{name}}"
            },
            "probabilityToEnter": "Prawdopodobieństwo wejścia"
        },
        "edge":{
            "payoff": {
                "default": "Wypłata {{number}}: {{value}}",
                "named": "{{name}}: {{value}}"
            },
            "probability": "Prawdopodobieństwo: {{value}}"
        }
    }
}

},{}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  d3: true
};
Object.defineProperty(exports, "d3", {
  enumerable: true,
  get: function get() {
    return _d["default"];
  }
});

var _d3Extensions = require("./d3-extensions");

Object.keys(_d3Extensions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _d3Extensions[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _d3Extensions[key];
    }
  });
});

var _treeDesigner = require("./tree-designer");

Object.keys(_treeDesigner).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _treeDesigner[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _treeDesigner[key];
    }
  });
});

var _appUtils = require("./app-utils");

Object.keys(_appUtils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _appUtils[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _appUtils[key];
    }
  });
});

var _templates = require("./templates");

Object.keys(_templates).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _templates[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _templates[key];
    }
  });
});

var _tooltip = require("./tooltip");

Object.keys(_tooltip).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _tooltip[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _tooltip[key];
    }
  });
});

var _d = _interopRequireDefault(require("./d3"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

_d3Extensions.D3Extensions.extend();

},{"./app-utils":1,"./d3":8,"./d3-extensions":7,"./templates":20,"./tooltip":23,"./tree-designer":24}],16:[function(require,module,exports){
"use strict";

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Layout = void 0;

var _sdUtils = require("sd-utils");

var _sdModel = require("sd-model");

var d3 = _interopRequireWildcard(require("./d3"));

var _circle = _interopRequireDefault(require("./symbols/circle"));

var _triangle = _interopRequireDefault(require("./symbols/triangle"));

var _appUtils = require("./app-utils");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== "function") return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}

function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache(nodeInterop);

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
/*Tree layout manager*/


var Layout = /*#__PURE__*/function () {
  function Layout(treeDesigner, data, config) {
    _classCallCheck(this, Layout);

    this.nodeTypeToSymbol = {
      'decision': d3.symbolSquare,
      'chance': _circle["default"],
      "terminal": _triangle["default"]
    };
    this.onAutoLayoutChanged = [];
    this.nodeTypeOrder = {
      'decision': 0,
      'chance': 0,
      'terminal': 1
    };
    this.treeMargin = 50;
    this.targetSymbolSize = {};

    this.nodeSeparation = function (a, b) {
      return a.parent === b.parent ? 1 : 1.2;
    };

    this.nodeSymbolSize = {};
    this.treeDesigner = treeDesigner;
    this.data = data;
    this.config = config;
  }

  _createClass(Layout, [{
    key: "update",
    value: function update(node) {
      if (node && node.$parent) {
        node.$parent.childEdges.sort(function (a, b) {
          return a.childNode.location.y - b.childNode.location.y;
        });
      }

      if (!this.isManualLayout()) {
        return this.autoLayout(this.config.type, true);
      }

      if (node) {
        this.moveNodeToEmptyPlace(node);
      } else {
        this.treeDesigner.redraw(true);
      }
    }
  }, {
    key: "isManualLayout",
    value: function isManualLayout() {
      return this.config.type === Layout.MANUAL_LAYOUT_NAME;
    }
  }, {
    key: "getNewChildLocation",
    value: function getNewChildLocation(parent) {
      if (!parent) {
        return new _sdModel.domain.Point(this.getNodeMinX(), this.getNodeMinY());
      }

      var x = parent.location.x + this.config.gridWidth;
      var y = parent.location.y;

      if (parent.childEdges.length) {
        y = parent.childEdges[parent.childEdges.length - 1].childNode.location.y + 1;
      }

      return new _sdModel.domain.Point(x, y);
    }
  }, {
    key: "getInjectedNodeLocation",
    value: function getInjectedNodeLocation(edge) {
      var p = edge.$linePoints[2];
      return new _sdModel.domain.Point(p[0], p[1]);
    }
  }, {
    key: "moveNodeToEmptyPlace",
    value: function moveNodeToEmptyPlace(node) {
      var redrawIfChanged = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var positionMap = {};
      var self = this;
      node.location.x = Math.max(this.getNodeMinX(node), node.location.x);
      node.location.y = Math.max(this.getNodeMinY(node), node.location.y);
      this.nodesSortedByX = this.data.nodes.slice();
      this.nodesSortedByX.sort(function (a, b) {
        return a.location.x - b.location.x;
      });

      function findCollidingNode(node, location) {
        return _sdUtils.Utils.find(self.nodesSortedByX, function (n) {
          if (node == n) {
            return false;
          }

          var margin = self.config.nodeSize / 3;
          var x = n.location.x;
          var y = n.location.y;
          return location.x - margin <= x && location.x + margin >= x && location.y - margin <= y && location.y + margin >= y;
        });
      }

      var stepX = this.config.nodeSize / 2;
      var stepY = this.config.nodeSize + 10;
      var stepXsameParent = 0;
      var stepYsameParent = 75;
      var changed = false;
      var colidingNode;
      var newLocation = new _sdModel.domain.Point(node.location);

      while (colidingNode = findCollidingNode(node, newLocation)) {
        changed = true;
        var sameParent = node.$parent && colidingNode.$parent && node.$parent === colidingNode.$parent;

        if (sameParent) {
          newLocation.move(stepXsameParent, stepYsameParent);
        } else {
          newLocation.move(stepX, stepY);
        }
      }

      if (changed) {
        node.moveTo(newLocation.x, newLocation.y, true);

        if (redrawIfChanged) {
          this.treeDesigner.redraw(true);
        }
      }
    }
  }, {
    key: "disableAutoLayout",
    value: function disableAutoLayout() {
      this.config.type = Layout.MANUAL_LAYOUT_NAME;

      this._fireOnAutoLayoutChangedCallbacks();
    }
  }, {
    key: "drawNodeSymbol",
    value: function drawNodeSymbol(path, transition) {
      var self = this;
      var nodeSize = this.config.nodeSize;
      this.nodeSymbol = d3.symbol().type(function (d) {
        return self.nodeTypeToSymbol[d.type];
      }).size(function (d) {
        return self.nodeSymbolSize[d.id] ? _sdUtils.Utils.get(self.targetSymbolSize, d.type + "['" + self.config.nodeSize + "']", 64) : 64;
      });
      path.each(function (d) {
        var path = d3.select(this);
        var prev = path.attr("d");

        if (!prev) {
          path.attr("d", self.nodeSymbol);
        }

        var size = _sdUtils.Utils.get(self.targetSymbolSize, d.type + "['" + self.config.nodeSize + "']");

        if (!size) {
          var box = path.node().getBBox();
          var error = Math.min(nodeSize / box.width, nodeSize / box.height);
          size = error * error * (self.nodeSymbolSize[d.id] || 64);

          _sdUtils.Utils.set(self.targetSymbolSize, d.type + "['" + self.config.nodeSize + "']", size);
        }

        if (transition) {
          path = path.transition();
        } else {
          self.nodeSymbolSize[d.id] = size;
        }

        path.attr("d", self.nodeSymbol);

        if (transition) {
          self.nodeSymbolSize[d.id] = size;
        }
      });
    }
  }, {
    key: "nodeLabelPosition",
    value: function nodeLabelPosition(selection) {
      return selection.attr('x', 0).attr('y', -this.config.nodeSize / 2 - 7);
    }
  }, {
    key: "nodePayoffPosition",
    value: function nodePayoffPosition(selection) {
      return Layout.setHangingPosition(selection).attr('x', 0).attr('y', this.config.nodeSize / 2 + 7).attr('text-anchor', 'middle');
    }
  }, {
    key: "nodeAggregatedPayoffPosition",
    value: function nodeAggregatedPayoffPosition(selection) {
      var x = this.config.nodeSize / 2 + 7;
      var self = this;
      selection.attr('x', x).attr('y', function (d) {
        var fontSize = parseInt(_appUtils.AppUtils.getFontSize(this));
        var items = d.displayValue('aggregatedPayoff');
        var number = _sdUtils.Utils.isArray(items) ? items.filter(function (it) {
          return it !== undefined;
        }).length : 1;

        if (number > 1) {
          return -this.getBBox().height / 2 + fontSize / 2;
        }

        return -Math.max(2, 1.8 * self.config.nodeSize / fontSize);
      });
      selection.selectAll('tspan').attr('x', x);
      return selection; // .attr('text-anchor', 'middle')
      // .attr('dominant-baseline', 'hanging')
    }
  }, {
    key: "nodeProbabilityToEnterPosition",
    value: function nodeProbabilityToEnterPosition(selection) {
      var self = this;
      return Layout.setHangingPosition(selection).attr('x', this.config.nodeSize / 2 + 7).attr('y', function (d) {
        var fontSize = parseInt(_appUtils.AppUtils.getFontSize(this));
        var aggregatedPayoffs = d.displayValue('aggregatedPayoff');
        var aggregatedPayoffsNumber = _sdUtils.Utils.isArray(aggregatedPayoffs) ? aggregatedPayoffs.filter(function (it) {
          return it !== undefined;
        }).length : 1;

        if (aggregatedPayoffsNumber > 1) {
          return fontSize * 0.6;
        }

        return Math.max(2, 1.8 * self.config.nodeSize / fontSize);
      }); // .attr('text-anchor', 'middle')
      // .attr('dominant-baseline', 'central')
    }
  }, {
    key: "nodeIndicatorPosition",
    value: function nodeIndicatorPosition(selection) {
      return selection.attr('x', this.config.nodeSize / 2 + 8).attr('y', -this.config.nodeSize / 2).attr('dominant-baseline', 'central').attr('text-anchor', 'middle');
    }
  }, {
    key: "nodeUnfoldButtonPosition",
    value: function nodeUnfoldButtonPosition(selection) {
      return selection.attr('x', this.config.nodeSize / 2 + 5).attr('y', 0).attr('dominant-baseline', 'central');
    }
  }, {
    key: "edgeLineD",
    value: function edgeLineD(edge) {
      var line = d3.line().x(function (d) {
        return d[0];
      }).y(function (d) {
        return d[1];
      }); // .curve(d3.curveCatmullRom.alpha(0.5));

      var parentNode = edge.parentNode;
      var childNode = edge.childNode;
      var dX = childNode.location.x - parentNode.location.x;
      var dY = childNode.location.y - parentNode.location.y;
      var sign = dX >= 0 ? 1 : -1;
      var slantStartXOffset = Math.min(dX / 2, this.config.nodeSize / 2 + 10);
      var slantWidth = Math.min(this.config.edgeSlantWidthMax, Math.max(dX / 2 - slantStartXOffset, 0));
      var point1 = [parentNode.location.x + this.config.nodeSize / 2 + 1, parentNode.location.y];
      var point2 = [Math.max(parentNode.location.x + slantStartXOffset, point1[0]), parentNode.location.y];
      var point3 = [parentNode.location.x + slantStartXOffset + slantWidth, childNode.location.y];
      var point4 = [childNode.location.x - sign * Math.max(0, Math.min(this.config.nodeSize / 2 + 8, dX / 2)), childNode.location.y]; // var point2 = [parentNode.location.x+dX/2-slantWidth/2, parentNode.location.y];
      // var point3 = [childNode.location.x-(dX/2-slantWidth/2), childNode.location.y];

      edge.$linePoints = [point1, point2, point3, point4];
      return line(edge.$linePoints);
    }
  }, {
    key: "edgePayoffPosition",
    value: function edgePayoffPosition(selection) {
      Layout.setHangingPosition(selection).attr('x', function (d) {
        return d.$linePoints[2][0] + 2;
      }).attr('y', function (d) {
        return d.$linePoints[2][1] + 7;
      });
      selection.selectAll('tspan').attr('x', function (d) {
        return d3.select(this.parentNode).datum().$linePoints[2][0] + 2;
      });
      return selection;
    }
  }, {
    key: "edgeLabelPosition",
    value: function edgeLabelPosition(selection) {
      return selection.attr('transform', function (d) {
        return 'translate(' + (d.$linePoints[2][0] + 2) + ',' + (d.$linePoints[2][1] - 7) + ')';
      }); // .attr('x', d=>d.$linePoints[2][0] + 2)
      // .attr('y', d=>d.$linePoints[2][1] - 7)
    }
  }, {
    key: "edgeProbabilityPosition",
    value: function edgeProbabilityPosition(selection) {
      return Layout.setHangingPosition(selection).attr('x', function (d) {
        var len = this.getComputedTextLength();
        var min = d.$linePoints[2][0] + 2 + this.previousSibling.childNodes[0].getComputedTextLength() + 7 + len;
        return Math.max(min, d.$linePoints[3][0] - 8);
      }).attr('y', function (d) {
        return d.$linePoints[2][1] + 7;
      });
    }
  }, {
    key: "getMinMarginBetweenNodes",
    value: function getMinMarginBetweenNodes() {
      return this.config.nodeSize + 30;
    }
  }, {
    key: "getTextMinX",
    value: function getTextMinX(d) {
      var minX = 0;

      if (d) {
        var bb = this.treeDesigner.getTextD3Selection(d).select('text').node().getBBox();

        if (bb.x < 0) {
          minX -= bb.x;
        }
      }

      return minX;
    }
  }, {
    key: "getTextMinY",
    value: function getTextMinY(d) {
      var minY = 0;

      if (d) {
        var bb = this.treeDesigner.getTextD3Selection(d).select('text').node().getBBox();

        if (bb.y < 0) {
          minY -= bb.y;
        }
      }

      return minY;
    }
  }, {
    key: "getTextMaxX",
    value: function getTextMaxX(d) {
      return Number.MAX_SAFE_INTEGER;
    }
  }, {
    key: "getNodeMinX",
    value: function getNodeMinX(d) {
      var self = this;

      if (d && d.$parent) {
        // && !self.isNodeSelected(d.$parent)
        return d.$parent.location.x + self.getMinMarginBetweenNodes();
      }

      return self.config.nodeSize / 2;
    }
  }, {
    key: "getNodeMinY",
    value: function getNodeMinY(d) {
      return this.config.nodeSize / 2;
    }
  }, {
    key: "getNodeMaxX",
    value: function getNodeMaxX(d) {
      var self = this;

      if (d && d.childEdges.length) {
        return d3.min(d.childEdges, function (e) {
          return !e.childNode.$hidden ? e.childNode.location.x : 9999999;
        }) - self.getMinMarginBetweenNodes();
      }

      return Number.MAX_SAFE_INTEGER;
    }
  }, {
    key: "setGridWidth",
    value: function setGridWidth(width, withoutStateSaving) {
      var self = this;

      if (this.config.gridWidth === width) {
        return;
      }

      if (!withoutStateSaving) {
        this.data.saveState({
          data: {
            gridWidth: self.config.gridWidth
          },
          onUndo: function onUndo(data) {
            self.setGridWidth(data.gridWidth, true);
          },
          onRedo: function onRedo(data) {
            self.setGridWidth(width, true);
          }
        });
      }

      this.config.gridWidth = width;
      this.update();
    }
  }, {
    key: "setGridHeight",
    value: function setGridHeight(gridHeight, withoutStateSaving) {
      var self = this;

      if (this.config.gridHeight === gridHeight) {
        return;
      }

      if (!withoutStateSaving) {
        this.data.saveState({
          data: {
            gridHeight: self.config.gridHeight
          },
          onUndo: function onUndo(data) {
            self.setGridHeight(data.gridHeight, true);
          },
          onRedo: function onRedo(data) {
            self.setGridHeight(gridHeight, true);
          }
        });
      }

      this.config.gridHeight = gridHeight;
      this.update();
    }
  }, {
    key: "setNodeSize",
    value: function setNodeSize(nodeSize, withoutStateSaving) {
      var self = this;

      if (this.config.nodeSize === nodeSize) {
        return;
      }

      if (!withoutStateSaving) {
        this.data.saveState({
          data: {
            nodeSize: self.config.nodeSize
          },
          onUndo: function onUndo(data) {
            self.setNodeSize(data.nodeSize, true);
          },
          onRedo: function onRedo(data) {
            self.setNodeSize(nodeSize, true);
          }
        });
      }

      this.config.nodeSize = nodeSize;
      this.update();

      if (this.isManualLayout()) {
        this.fitNodesInPlottingRegion(self.data.getRoots());
        this.treeDesigner.redraw(true);
      }
    }
  }, {
    key: "setEdgeSlantWidthMax",
    value: function setEdgeSlantWidthMax(width, withoutStateSaving) {
      var self = this;

      if (this.config.edgeSlantWidthMax === width) {
        return;
      }

      if (!withoutStateSaving) {
        this.data.saveState({
          data: {
            edgeSlantWidthMax: self.config.edgeSlantWidthMax
          },
          onUndo: function onUndo(data) {
            self.setEdgeSlantWidthMax(data.edgeSlantWidthMax, true);
          },
          onRedo: function onRedo(data) {
            self.setEdgeSlantWidthMax(width, true);
          }
        });
      }

      this.config.edgeSlantWidthMax = width;
      this.treeDesigner.redraw(true);
    }
  }, {
    key: "autoLayout",
    value: function autoLayout(type, withoutStateSaving) {
      var self = this;

      if (!withoutStateSaving) {
        this.data.saveState({
          data: {
            newLayout: type,
            currentLayout: self.config.type
          },
          onUndo: function onUndo(data) {
            self.config.type = data.currentLayout;

            self._fireOnAutoLayoutChangedCallbacks();
          },
          onRedo: function onRedo(data) {
            self.autoLayout(data.newLayout, true);
          }
        });
      }

      this.config.type = type;

      if (!this.data.nodes.length) {
        this._fireOnAutoLayoutChangedCallbacks();

        return;
      }

      var prevTreeMaxY = self.getNodeMinY();
      this.data.getRoots().forEach(function (r) {
        var root = d3.hierarchy(r, function (d) {
          return d.childEdges.filter(function (e) {
            return !e.$hidden;
          }).map(function (e) {
            return e.childNode;
          });
        }); // root.sort((a,b)=>self.nodeTypeOrder[a.data.type]-self.nodeTypeOrder[b.data.type]);

        root.sort(function (a, b) {
          return a.data.location.y - b.data.location.y;
        });
        var layout;

        if (type === 'cluster') {
          layout = d3.cluster();
        } else {
          layout = d3.tree();
        }

        layout.nodeSize([self.config.gridHeight, self.config.gridWidth]);
        layout.separation(self.nodeSeparation);
        layout(root);
        var minY = 999999999;
        root.each(function (d) {
          minY = Math.min(minY, d.x);
        });
        var dy = root.x - minY + prevTreeMaxY;
        var dx = self.getNodeMinX();
        var maxY = 0;
        root.each(function (d) {
          d.data.location.x = d.y + dx;
          d.data.location.y = d.x + dy;
          maxY = Math.max(maxY, d.data.location.y);
        });
        prevTreeMaxY = maxY + self.config.nodeSize + self.treeMargin;
      }); // this.transition = true;

      this.treeDesigner.redraw(true); // this.transition = false;

      this._fireOnAutoLayoutChangedCallbacks();

      return this;
    }
  }, {
    key: "fitNodesInPlottingRegion",
    value: function fitNodesInPlottingRegion(nodes) {
      var self = this;
      var topY = d3.min(nodes, function (n) {
        return n.location.y;
      });
      var minY = self.getNodeMinY();
      var dy = topY - minY;
      var minX = d3.min(nodes, function (n) {
        return n.location.x;
      });
      var dx = minX - self.getNodeMinX();

      if (dy < 0 || dx < 0) {
        nodes.forEach(function (n) {
          return n.move(-dx, -dy);
        });
      }
    }
  }, {
    key: "moveNodes",
    value: function moveNodes(nodes, dx, dy, pivot) {
      var self = this;
      var limit = self.config.limitNodePositioning;

      if (limit) {
        if (dx < 0) {
          nodes.sort(function (a, b) {
            return a.location.x - b.location.x;
          });
        } else {
          nodes.sort(function (a, b) {
            return b.location.x - a.location.x;
          });
        }
      }

      var minY = d3.min(nodes, function (d) {
        return d.location.y;
      });

      if (minY + dy < self.getNodeMinY()) {
        dy = self.getNodeMinY() - minY;
      }

      nodes.forEach(function (d) {
        if (limit) {
          Layout.backupNodeLocation(d);
          var minX = self.getNodeMinX(d);
          var maxX = self.getNodeMaxX(d);
          d.location.x = Math.min(Math.max(d.location.x + dx, minX), maxX);
          d.location.y += dy;
        } else {
          d.location.x += dx;
          d.location.y += dy;
        }
      });
      var revertX = pivot && self.config.limitNodePositioning && pivot.location.x === pivot.$location.x;
      nodes.forEach(function (d) {
        if (revertX) {
          d.location.x = d.$location.x;
        }

        self.treeDesigner.updateNodePosition(d);
      });
    }
  }, {
    key: "moveTexts",
    value: function moveTexts(texts, dx, dy) {
      var self = this;
      var limit = self.config.limitTextPositioning;

      if (limit) {
        if (dx < 0) {
          texts.sort(function (a, b) {
            return a.location.x - b.location.x;
          });
        } else {
          texts.sort(function (a, b) {
            return b.location.x - a.location.x;
          });
        }
      }

      texts.forEach(function (d) {
        if (limit) {
          var minX = self.getTextMinX(d);
          var maxX = self.getTextMaxX(d);
          var minY = self.getTextMinY(d);
          d.location.x = Math.min(Math.max(d.location.x + dx, minX), maxX);
          d.location.y = Math.max(d.location.y + dy, minY);
        } else {
          d.location.move(dx, dy);
        }

        self.treeDesigner.updateTextPosition(d);
      });
    }
  }, {
    key: "_fireOnAutoLayoutChangedCallbacks",
    value: function _fireOnAutoLayoutChangedCallbacks() {
      var _this = this;

      this.onAutoLayoutChanged.forEach(function (c) {
        return c(_this.config.type);
      });
    }
  }], [{
    key: "backupNodeLocation",
    value: function backupNodeLocation(node) {
      node.$location = new _sdModel.domain.Point(node.location);
    }
  }, {
    key: "setHangingPosition",
    value: function setHangingPosition(selection) {
      // window.setTimeout(function(){
      //     selection.each(function(){
      //         var h =  this.getBBox().height;
      //         d3.select(this).attr('dy', h);
      //     });
      // },0);
      if (_appUtils.AppUtils.isHidden(selection.node())) {
        // setting hanging position of hidden elements fails on firefox
        return selection;
      }

      selection.each(function () {
        var h = this.getBBox().height;
        d3.select(this).attr('dy', '0.75em');
      });
      return selection;
    }
  }]);

  return Layout;
}();

exports.Layout = Layout;
Layout.MANUAL_LAYOUT_NAME = 'manual';

},{"./app-utils":1,"./d3":8,"./symbols/circle":18,"./symbols/triangle":19,"sd-model":"sd-model","sd-utils":"sd-utils"}],17:[function(require,module,exports){
"use strict";

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NodeDragHandler = void 0;

var _appUtils = require("./app-utils");

var d3 = _interopRequireWildcard(require("./d3"));

var _contextMenu = require("./context-menu/context-menu");

function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== "function") return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}

function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache(nodeInterop);

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var NodeDragHandler = /*#__PURE__*/function () {
  function NodeDragHandler(treeDesigner, data) {
    _classCallCheck(this, NodeDragHandler);

    this.stateSnapshot = null;
    this.treeDesigner = treeDesigner;
    this.data = data;
    var self = this;
    this.drag = d3.drag().subject(function (d) {
      if (d == null) {
        return {
          x: event.x,
          y: event.y
        };
      }

      var t = d3.select(this);
      return {
        x: t.attr("x") + _appUtils.AppUtils.getTranslation(t.attr("transform"))[0],
        y: t.attr("y") + _appUtils.AppUtils.getTranslation(t.attr("transform"))[1]
      };
    }).on("start", function (d) {
      self.dragStarted.call(this, d, self);
    }).on("drag", function (d) {
      self.onDrag.call(this, d, self);
    }).on("end", function (d) {
      self.dragEnded.call(this, d, self);
    });
  }

  _createClass(NodeDragHandler, [{
    key: "dragStarted",
    value: function dragStarted(d, self) {
      if (self.ignoreDrag) {
        self.ignoreDrag = false;
        self.ignoredDrag = true;
        return;
      }

      self.ignoredDrag = false;
      self.stateSnapshot = self.data.createStateSnapshot(); // self.treeDesigner.layout.disableAutoLayout();

      _contextMenu.ContextMenu.hide();

      var node = d3.select(this);

      if (!node.classed("selected")) {
        self.treeDesigner.clearSelection();
      }

      self.treeDesigner.selectNode(d);
      node.classed("selected dragging", true);
      self.selectedNodes = self.treeDesigner.getSelectedNodes(true);
      self.prevDragEvent = d3.event;
      self.dragEventCount = 0;
    }
  }, {
    key: "onDrag",
    value: function onDrag(draggedNode, self) {
      if (self.ignoredDrag) {
        return;
      }

      if (self.dragEventCount === 2 && self.stateSnapshot) {
        self.data.saveStateFromSnapshot(self.stateSnapshot); // TODO save only if something has really changed

        self.stateSnapshot = null;
      }

      self.dragEventCount++;

      if (self.selectedNodes.length > 5 && self.dragEventCount % 2 !== 1) {
        return;
      }

      var dx = d3.event.x - self.prevDragEvent.x;
      var dy = d3.event.y - self.prevDragEvent.y;
      self.treeDesigner.layout.moveNodes(self.selectedNodes, dx, dy, draggedNode);
      self.prevDragEvent = d3.event;
      self.treeDesigner.redrawEdges();
      self.treeDesigner.updatePlottingRegionSize();
    }
  }, {
    key: "dragEnded",
    value: function dragEnded(draggedNode, self) {
      var node = d3.select(this).classed("dragging", false);

      if (self.ignoredDrag) {
        return;
      }

      self.treeDesigner.layout.update(draggedNode);
    }
  }, {
    key: "cancelDrag",
    value: function cancelDrag() {
      this.ignoreDrag = true;
    }
  }]);

  return NodeDragHandler;
}();

exports.NodeDragHandler = NodeDragHandler;

},{"./app-utils":1,"./context-menu/context-menu":2,"./d3":8}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var epsilon = 1e-12;
var pi = Math.PI;
var halfPi = pi / 2;
var tau = 2 * pi;
var _default = {
  /*draw: function(context, size) {
      var r = Math.sqrt(size / pi);
      context.moveTo(r, 0);
      context.arc(0, 0, r, 0, tau);
  }*/
  draw: function draw(context, size) {
    var r = Math.sqrt(size / pi);
    var dist = 0.552284749831 * r;
    context.moveTo(-r, 0); // context.lineTo(2*r, 2*r)
    // context.bezierCurveTo(-r, -dist, -dist, -r, 0,-r);

    context.bezierCurveTo(-r, -dist, -dist, -r, 0, -r);
    context.bezierCurveTo(dist, -r, r, -dist, r, 0);
    context.bezierCurveTo(r, dist, dist, r, 0, r);
    context.bezierCurveTo(-dist, r, -r, dist, -r, 0);
  }
};
exports["default"] = _default;

},{}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var sqrt3 = Math.sqrt(3);
var _default = {
  draw: function draw(context, size) {
    var r = Math.sqrt(size / Math.PI);
    context.moveTo(-r, 0);
    context.lineTo(0.9 * r, -r);
    context.lineTo(0.9 * r, r);
    context.closePath();
  }
};
exports["default"] = _default;

},{}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Templates = void 0;

var _sdUtils = require("sd-utils");

var _i18n = require("./i18n/i18n");

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var Templates = /*#__PURE__*/function () {
  function Templates() {
    _classCallCheck(this, Templates);
  }

  _createClass(Templates, null, [{
    key: "get",
    value: function get(templateName, variables) {
      var compiled = _sdUtils.Utils.template(Templates[templateName], {
        'imports': {
          'i18n': _i18n.i18n,
          'Templates': Templates,
          'include': function include(n, v) {
            return Templates.get(n, v);
          }
        }
      });

      if (variables) {
        variables.variables = variables;
      } else {
        variables = {
          variables: {}
        };
      }

      return compiled(variables);
    }
  }, {
    key: "styleRule",
    value: function styleRule(selector, props) {
      var s = selector + '{';
      props.forEach(function (p) {
        return s += Templates.styleProp(p[0], p[1]);
      });
      s += '} ';
      return s;
    }
  }, {
    key: "styleProp",
    value: function styleProp(styleName, variableName) {
      return styleName + ': <%= ' + variableName + ' %>; ';
    }
  }, {
    key: "nodeSelector",
    value: function nodeSelector(type, clazz) {
      var s = Templates.treeDesignerSelector + ' .node';

      if (type) {
        s += '.' + type + '-node';
      }

      if (clazz) {
        s += '.' + clazz;
      }

      return s;
    }
  }, {
    key: "edgeSelector",
    value: function edgeSelector(clazz) {
      var s = Templates.treeDesignerSelector + ' .edge';

      if (clazz) {
        s += '.' + clazz;
      }

      return s;
    }
  }]);

  return Templates;
}();

exports.Templates = Templates;
Templates.growl = require('./templates/growl_message.html');
Templates.treeDesignerSelector = 'svg.sd-tree-designer';
Templates.treeDesignerStyles = Templates.styleRule(Templates.treeDesignerSelector, [['font-size', 'fontSize'], ['font-family', 'fontFamily'], ['font-weight', 'fontWeight'], ['font-style', 'fontStyle']]) + //   node
Templates.styleRule(Templates.nodeSelector() + ' path', [['fill', 'node.fill'], ['stroke-width', 'node.strokeWidth']]) + Templates.styleRule(Templates.nodeSelector('decision', 'optimal') + ' path, ' + Templates.nodeSelector('chance', 'optimal') + ' path,' + Templates.nodeSelector('terminal', 'optimal') + ' path', [['stroke', 'node.optimal.stroke'], ['stroke-width', 'node.optimal.strokeWidth']]) + Templates.styleRule(Templates.nodeSelector() + ' .label', [['font-size', 'node.label.fontSize'], ['fill', 'node.label.color']]) + Templates.styleRule(Templates.nodeSelector() + ' .payoff', [['font-size', 'node.payoff.fontSize'], ['fill', 'node.payoff.color']]) + Templates.styleRule(Templates.nodeSelector() + ' .payoff.negative', [['fill', 'node.payoff.negativeColor']]) + //    decision node
Templates.styleRule(Templates.nodeSelector('decision') + ' path', [['fill', 'node.decision.fill'], ['stroke', 'node.decision.stroke']]) + Templates.styleRule(Templates.nodeSelector('decision', 'selected') + ' path', [['fill', 'node.decision.selected.fill']]) + //    chance node
Templates.styleRule(Templates.nodeSelector('chance') + ' path', [['fill', 'node.chance.fill'], ['stroke', 'node.chance.stroke']]) + Templates.styleRule(Templates.nodeSelector('chance', 'selected') + ' path', [['fill', 'node.chance.selected.fill']]) + //    terminal node
Templates.styleRule(Templates.nodeSelector('terminal') + ' path', [['fill', 'node.terminal.fill'], ['stroke', 'node.terminal.stroke']]) + Templates.styleRule(Templates.nodeSelector('terminal', 'selected') + ' path', [['fill', 'node.terminal.selected.fill']]) + Templates.styleRule(Templates.nodeSelector('terminal') + ' .aggregated-payoff', [['font-size', 'node.terminal.payoff.fontSize'], ['fill', 'node.terminal.payoff.color']]) + Templates.styleRule(Templates.nodeSelector('terminal') + ' .aggregated-payoff.negative', [['fill', 'node.terminal.payoff.negativeColor']]) + //probability
Templates.styleRule(Templates.treeDesignerSelector + ' .node .probability-to-enter, ' + Templates.treeDesignerSelector + ' .edge .probability', [['font-size', 'probability.fontSize'], ['fill', 'probability.color']]) + //edge
Templates.styleRule(Templates.edgeSelector() + ' path', [['stroke', 'edge.stroke'], ['stroke-width', 'edge.strokeWidth']]) + Templates.styleRule(Templates.treeDesignerSelector + ' marker#arrow path', [['fill', 'edge.stroke']]) + Templates.styleRule(Templates.edgeSelector('optimal') + ' path', [['stroke', 'edge.optimal.stroke'], ['stroke-width', 'edge.optimal.strokeWidth']]) + Templates.styleRule(Templates.treeDesignerSelector + ' marker#arrow-optimal path', [['fill', 'edge.optimal.stroke']]) + Templates.styleRule(Templates.edgeSelector('selected') + ' path', [['stroke', 'edge.selected.stroke'], ['stroke-width', 'edge.selected.strokeWidth']]) + Templates.styleRule(Templates.treeDesignerSelector + ' marker#arrow-selected path', [['fill', 'edge.selected.stroke']]) + Templates.styleRule(Templates.edgeSelector() + ' .label', [['font-size', 'edge.label.fontSize'], ['fill', 'edge.label.color']]) + Templates.styleRule(Templates.edgeSelector() + ' .payoff', [['font-size', 'edge.payoff.fontSize'], ['fill', 'edge.payoff.color']]) + Templates.styleRule(Templates.edgeSelector() + ' .payoff.negative', [['fill', 'edge.payoff.negativeColor']]) + Templates.styleRule(Templates.treeDesignerSelector + ' .sd-title-container text.sd-title', [['font-size', 'title.fontSize'], ['font-weight', 'title.fontWeight'], ['font-style', 'title.fontStyle'], ['fill', 'title.color']]) + Templates.styleRule(Templates.treeDesignerSelector + ' .sd-title-container text.sd-description', [['font-size', 'description.fontSize'], ['font-weight', 'description.fontWeight'], ['font-style', 'description.fontStyle'], ['fill', 'description.color']]);

},{"./i18n/i18n":12,"./templates/growl_message.html":21,"sd-utils":"sd-utils"}],21:[function(require,module,exports){
module.exports = "module.exports = \"<div class=\\\"sd-growl-message <%=type%>\\\">\\r\\n    <div class=\\\"sd-growl-message-text\\\">\\r\\n        <%= message %>\\r\\n    </div>\\r\\n</div>\\r\\n\";\n";

},{}],22:[function(require,module,exports){
"use strict";

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextDragHandler = void 0;

var _appUtils = require("./app-utils");

var d3 = _interopRequireWildcard(require("./d3"));

var _contextMenu = require("./context-menu/context-menu");

function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== "function") return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}

function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache(nodeInterop);

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var TextDragHandler = /*#__PURE__*/function () {
  function TextDragHandler(treeDesigner, data) {
    _classCallCheck(this, TextDragHandler);

    this.treeDesigner = treeDesigner;
    this.data = data;
    var self = this;
    this.drag = d3.drag().subject(function (d) {
      if (d == null) {
        return {
          x: event.x,
          y: event.y
        };
      }

      var t = d3.select(this);
      return {
        x: t.attr("x") + _appUtils.AppUtils.getTranslation(t.attr("transform"))[0],
        y: t.attr("y") + _appUtils.AppUtils.getTranslation(t.attr("transform"))[1]
      };
    }).on("start", function (d) {
      self.dragStarted.call(this, d, self);
    }).on("drag", function (d) {
      self.onDrag.call(this, d, self);
    }).on("end", function (d) {
      self.dragEnded.call(this, d, self);
    });
  }

  _createClass(TextDragHandler, [{
    key: "dragStarted",
    value: function dragStarted(d, self) {
      // self.treeDesigner.layout.disableAutoLayout();
      _contextMenu.ContextMenu.hide();

      var text = d3.select(this);

      if (!text.classed("selected")) {
        self.treeDesigner.clearSelection();
      }

      self.treeDesigner.selectText(d);
      text.classed("selected dragging", true);
      self.selectedNodes = self.treeDesigner.getSelectedNodes();
      self.prevDragEvent = d3.event;
      self.dragEventCount = 0;
    }
  }, {
    key: "onDrag",
    value: function onDrag(draggedText, self) {
      if (self.dragEventCount == 2) {
        self.data.saveState();
      }

      self.dragEventCount++;
      var dx = d3.event.x - self.prevDragEvent.x;
      var dy = d3.event.y - self.prevDragEvent.y;
      self.treeDesigner.layout.moveTexts([draggedText], dx, dy);
      self.prevDragEvent = d3.event;
      self.treeDesigner.updatePlottingRegionSize();
    }
  }, {
    key: "dragEnded",
    value: function dragEnded(draggedNode, self) {
      d3.select(this).classed("dragging", false);
    }
  }]);

  return TextDragHandler;
}();

exports.TextDragHandler = TextDragHandler;

},{"./app-utils":1,"./context-menu/context-menu":2,"./d3":8}],23:[function(require,module,exports){
"use strict";

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tooltip = void 0;

var d3 = _interopRequireWildcard(require("./d3"));

var _sdUtils = require("sd-utils");

function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== "function") return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}

function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache(nodeInterop);

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var Tooltip = /*#__PURE__*/function () {
  function Tooltip() {
    _classCallCheck(this, Tooltip);
  }

  _createClass(Tooltip, null, [{
    key: "getContainer",
    value: function getContainer() {
      return d3.select("body").selectOrAppend('div.sd-tooltip');
    }
  }, {
    key: "show",
    value: function show(html) {
      var xOffset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
      var yOffset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 28;
      var event = arguments.length > 3 ? arguments[3] : undefined;
      var duration = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
      var container = Tooltip.getContainer().style("opacity", 0);
      container.transition().duration(200).style("opacity", .98);
      container.html(html);
      Tooltip.updatePosition(xOffset, yOffset, event);

      if (duration) {
        setTimeout(function () {
          Tooltip.hide();
        }, duration);
      }
    }
  }, {
    key: "updatePosition",
    value: function updatePosition() {
      var xOffset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;
      var yOffset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 28;
      var event = arguments.length > 2 ? arguments[2] : undefined;
      event = event || d3.event;
      Tooltip.getContainer().style("left", event.pageX + xOffset + "px").style("top", event.pageY - yOffset + "px");
    }
  }, {
    key: "hide",
    value: function hide() {
      var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 500;
      var t = Tooltip.getContainer();

      if (duration) {
        t = t.transition().duration(duration);
      }

      t.style("opacity", 0);
    }
  }, {
    key: "attach",
    value: function attach(target, htmlOrFn, xOffset, yOffset) {
      target.on('mouseover', function (d, i) {
        var html = null;

        if (_sdUtils.Utils.isFunction(htmlOrFn)) {
          html = htmlOrFn(d, i);
        } else {
          html = htmlOrFn;
        }

        if (html !== null && html !== undefined && html !== '') {
          Tooltip.show(html, xOffset, yOffset);
        } else {
          Tooltip.hide(0);
        }
      }).on('mousemove', function (d) {
        Tooltip.updatePosition(xOffset, yOffset);
      }).on("mouseout", function (d) {
        Tooltip.hide();
      });
    }
  }]);

  return Tooltip;
}();

exports.Tooltip = Tooltip;

},{"./d3":8,"sd-utils":"sd-utils"}],24:[function(require,module,exports){
"use strict";

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TreeDesigner = exports.TreeDesignerConfig = void 0;

var d3 = _interopRequireWildcard(require("./d3"));

var _sdUtils = require("sd-utils");

var _appUtils = require("./app-utils");

var _sdModel = require("sd-model");

var _contextMenu = require("./context-menu/context-menu");

var _mainContextMenu = require("./context-menu/main-context-menu");

var _nodeContextMenu = require("./context-menu/node-context-menu");

var _layout = require("./layout");

var _nodeDragHandler = require("./node-drag-handler");

var _tooltip = require("./tooltip");

var _templates = require("./templates");

var _textDragHandler = require("./text-drag-handler");

var _textContextMenu = require("./context-menu/text-context-menu");

var _edgeContextMenu = require("./context-menu/edge-context-menu");

var Hammer = _interopRequireWildcard(require("hammerjs"));

var _i18n = require("./i18n/i18n");

function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== "function") return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}

function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache(nodeInterop);

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var TreeDesignerConfig = function TreeDesignerConfig(custom) {
  _classCallCheck(this, TreeDesignerConfig);

  this.width = undefined;
  this.height = undefined;
  this.margin = {
    left: 25,
    right: 25,
    top: 25,
    bottom: 25
  };
  this.scale = 1;
  this.lng = 'en';
  this.layout = {
    type: 'tree',
    nodeSize: 40,
    limitNodePositioning: true,
    limitTextPositioning: true,
    gridHeight: 75,
    gridWidth: 150,
    edgeSlantWidthMax: 20
  };
  this.fontFamily = 'sans-serif';
  this.fontSize = '12px';
  this.fontWeight = 'normal';
  this.fontStyle = 'normal';
  this.node = {
    strokeWidth: '1px',
    optimal: {
      stroke: '#006f00',
      strokeWidth: '1.5px'
    },
    label: {
      fontSize: '1em',
      color: 'black'
    },
    payoff: {
      fontSize: '1em',
      color: 'black',
      negativeColor: '#b60000'
    },
    decision: {
      fill: '#ff7777',
      stroke: '#660000',
      selected: {
        fill: '#aa3333' // stroke: '#666600'

      }
    },
    chance: {
      fill: '#ffff44',
      stroke: '#666600',
      selected: {
        fill: '#aaaa00' // stroke: '#666600'

      }
    },
    terminal: {
      fill: '#44ff44',
      stroke: 'black',
      selected: {
        fill: '#00aa00' // stroke: 'black'

      },
      payoff: {
        fontSize: '1em',
        color: 'black',
        negativeColor: '#b60000'
      }
    }
  };
  this.edge = {
    stroke: '#424242',
    strokeWidth: '1.5',
    optimal: {
      stroke: '#006f00',
      strokeWidth: '2.4'
    },
    selected: {
      stroke: '#045ad1',
      strokeWidth: '3.5'
    },
    label: {
      fontSize: '1em',
      color: 'back'
    },
    payoff: {
      fontSize: '1em',
      color: 'black',
      negativeColor: '#b60000'
    }
  };
  this.probability = {
    fontSize: '1em',
    color: '#0000d7'
  };
  this.title = {
    fontSize: '16px',
    fontWeight: 'bold',
    fontStyle: 'normal',
    color: '#000000',
    margin: {
      top: 15,
      bottom: 10
    }
  };
  this.description = {
    show: true,
    fontSize: '12px',
    fontWeight: 'bold',
    fontStyle: 'normal',
    color: '#000000',
    margin: {
      top: 5,
      bottom: 10
    }
  };
  this.readOnly = false;
  this.disableAnimations = false;
  this.forceFullEdgeRedraw = false;
  this.hideLabels = false;
  this.hidePayoffs = false;
  this.hideProbabilities = false;
  this.raw = false;

  this.payoffNumberFormatter = function (v, i) {
    return v;
  };

  this.probabilityNumberFormatter = function (v) {
    return v;
  };

  this.onNodeSelected = function (node) {};

  this.onEdgeSelected = function (edge) {};

  this.onTextSelected = function (text) {};

  this.onSelectionCleared = function () {};

  this.operationsForObject = function (o) {
    return [];
  };

  this.performOperation = function (object, operation) {
    return Promise.resolve();
  };

  this.payoffNames = [null, null];
  this.maxPayoffsToDisplay = 1;

  if (custom) {
    _sdUtils.Utils.deepExtend(this, custom);
  }
};

exports.TreeDesignerConfig = TreeDesignerConfig;

var TreeDesigner = /*#__PURE__*/function () {
  //data model manager
  function TreeDesigner(container, dataModel, config) {
    _classCallCheck(this, TreeDesigner);

    this.setConfig(config);
    this.data = dataModel;
    this.initContainer(container);
    this.init();
  }

  _createClass(TreeDesigner, [{
    key: "setConfig",
    value: function setConfig(config) {
      this.config = new TreeDesignerConfig(config);

      if (this.layout) {
        this.layout.config = this.config.layout;
      }

      this.updateCustomStyles();
      return this;
    }
  }, {
    key: "init",
    value: function init() {
      this.initSvg();
      this.initLayout();
      this.initI18n();
      this.initBrush();
      this.initEdgeMarkers();
      this.updateCustomStyles();

      if (!this.config.readOnly) {
        this.initMainContextMenu();
        this.initNodeContextMenu();
        this.initEdgeContextMenu();
        this.initNodeDragHandler();
        this.initTextDragHandler();
        this.initTextContextMenu();
      }

      this.redraw();
    }
  }, {
    key: "initI18n",
    value: function initI18n() {
      _i18n.i18n.init(this.config.lng);
    }
  }, {
    key: "updateCustomStyles",
    value: function updateCustomStyles() {
      d3.select('head').selectOrAppend('style#sd-tree-designer-style').html(_templates.Templates.get('treeDesignerStyles', this.config));
      return this;
    }
  }, {
    key: "initLayout",
    value: function initLayout() {
      this.layout = new _layout.Layout(this, this.data, this.config.layout);
    }
  }, {
    key: "initNodeDragHandler",
    value: function initNodeDragHandler() {
      this.nodeDragHandler = new _nodeDragHandler.NodeDragHandler(this, this.data);
    }
  }, {
    key: "initTextDragHandler",
    value: function initTextDragHandler() {
      this.textDragHandler = new _textDragHandler.TextDragHandler(this, this.data);
    }
  }, {
    key: "redraw",
    value: function redraw() {
      var withTransitions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var self = this;
      withTransitions = !self.config.disableAnimations && withTransitions;
      this.redrawDiagramTitle();
      this.redrawDiagramDescription();
      this.updateScale(withTransitions);
      this.updateMargin(withTransitions);

      if (withTransitions) {
        self.transitionPrev = self.transition;
        self.transition = true;
      }

      this.redrawNodes();
      this.redrawEdges();
      this.redrawFloatingTexts();
      this.updateValidationMessages();

      if (withTransitions) {
        self.transition = self.transitionPrev;
      }

      setTimeout(function () {
        self.updatePlottingRegionSize();
      }, 10);
      return this;
    }
  }, {
    key: "computeAvailableSpace",
    value: function computeAvailableSpace() {
      this.availableHeight = _appUtils.AppUtils.sanitizeHeight(this.config.height, this.container, this.config.margin);
      this.availableWidth = _appUtils.AppUtils.sanitizeWidth(this.config.width, this.container, this.config.margin);
    }
  }, {
    key: "initSvg",
    value: function initSvg() {
      var c = this;
      var self = this;
      this.computeAvailableSpace();
      this.svg = this.container.selectOrAppend('svg.sd-tree-designer');
      this.svg.attr('width', this.availableWidth).attr('height', this.availableHeight);
      this.wrapperGroup = this.svg.selectOrAppend('g.sd-wrapper-group');
      this.mainGroup = this.wrapperGroup.selectOrAppend('g.main-group');
      this.updateScale();
      this.updateMargin();

      if (!this.config.width) {
        d3.select(window).on("resize.tree-designer", function () {
          self.updatePlottingRegionSize();
          self.redrawDiagramTitle();
        });
      }

      var mc = new Hammer.Manager(this.svg.node(), {
        touchAction: 'auto'
      });
      mc.add(new Hammer.Press({
        pointerType: 'touch'
      }));
      mc.add(new Hammer.Pinch({
        pointerType: 'touch'
      }));
      var cancel;
      mc.on('pinchstart', function () {
        self.disableBrush();
      });
      mc.on('pinch', function () {
        cancel = _sdUtils.Utils.waitForFinalEvent(function () {
          return self.enableBrush();
        }, 'pinchend', 5000);
      });
    }
  }, {
    key: "updateMargin",
    value: function updateMargin(withTransitions) {
      var self = this;
      var margin = this.config.margin;
      var group = this.mainGroup;

      if (withTransitions) {
        group = group.transition();
      }

      this.topMargin = margin.top;

      if (this.diagramTitle || this.diagramDescription) {
        this.topMargin = parseInt(this.diagramTitle ? this.config.title.margin.top : 0) + this.getTitleGroupHeight() + Math.max(this.topMargin, parseInt(this.config.title.margin.bottom));
      }

      group.attr("transform", "translate(" + margin.left + "," + this.topMargin + ")").on("end", function () {
        return self.updatePlottingRegionSize();
      });
    }
  }, {
    key: "setMargin",
    value: function setMargin(margin, withoutStateSaving) {
      var self = this;

      if (!withoutStateSaving) {
        this.data.saveState({
          data: {
            margin: _sdUtils.Utils.clone(self.config.margin)
          },
          onUndo: function onUndo(data) {
            self.setMargin(data.margin, true);
          },
          onRedo: function onRedo(data) {
            self.setMargin(margin, true);
          }
        });
      }

      _sdUtils.Utils.deepExtend(this.config.margin, margin);

      this.redrawDiagramTitle();
      this.updateMargin(true);
    }
  }, {
    key: "updateScale",
    value: function updateScale(withTransitions) {
      var self = this;
      var scale = this.config.scale;
      var group = this.wrapperGroup;

      if (withTransitions) {
        group = group.transition();
      }

      group.attr("transform", "scale(" + scale + ")").on("end", function () {
        return self.updatePlottingRegionSize();
      });
    }
  }, {
    key: "setScale",
    value: function setScale(scale, withoutStateSaving) {
      var self = this;

      if (!withoutStateSaving) {
        this.data.saveState({
          data: {
            scale: _sdUtils.Utils.clone(self.config.scale)
          },
          onUndo: function onUndo(data) {
            self.setScale(data.scale, true);
          },
          onRedo: function onRedo(data) {
            self.setScale(scale, true);
          }
        });
      }

      this.config.scale = scale;
      this.updateScale(true);
    }
  }, {
    key: "initContainer",
    value: function initContainer(containerIdOrElem) {
      if (_sdUtils.Utils.isString(containerIdOrElem)) {
        var selector = containerIdOrElem.trim();

        if (!_sdUtils.Utils.startsWith(selector, '#') && !_sdUtils.Utils.startsWith(selector, '.')) {
          selector = '#' + selector;
        }

        this.container = d3.select(selector);
      } else if (containerIdOrElem._parents) {
        this.container = containerIdOrElem;
      } else {
        this.container = d3.select(containerIdOrElem);
      }
    }
  }, {
    key: "updatePlottingRegionSize",
    value: function updatePlottingRegionSize() {
      var changed = false;
      this.computeAvailableSpace();
      var margin = this.config.margin;
      var svgWidth = this.svg.attr('width');
      var svgHeight = this.svg.attr('height');
      var mainGroupBox = this.mainGroup.node().getBBox();
      var boxWidth = mainGroupBox.width;
      var newSvgWidth = boxWidth + mainGroupBox.x + margin.left + margin.right;
      newSvgWidth *= this.config.scale;
      this.container.classed('with-overflow-x', newSvgWidth >= this.availableWidth);
      newSvgWidth = Math.max(newSvgWidth, this.availableWidth);

      if (svgWidth != newSvgWidth) {
        changed = true;
        this.svg.attr('width', newSvgWidth);
      }

      var boxHeight = mainGroupBox.height;
      var newSvgHeight = boxHeight + mainGroupBox.y + this.topMargin + margin.bottom;
      newSvgHeight *= this.config.scale;
      this.container.classed('with-overflow-y', newSvgHeight >= this.availableHeight);
      newSvgHeight = Math.max(newSvgHeight, this.availableHeight);

      if (svgHeight != newSvgHeight) {
        changed = true;
        this.svg.attr('height', newSvgHeight);
      }

      if (changed) {
        this.updateBrushExtent();
      }
    }
  }, {
    key: "redrawNodes",
    value: function redrawNodes() {
      var self = this;
      var nodesContainer = this.mainGroup.selectOrAppend('g.nodes');
      var nodes = nodesContainer.selectAll('.node').data(this.data.nodes.filter(function (d) {
        return !d.$hidden;
      }), function (d, i) {
        return d.id;
      });
      nodes.exit().remove();
      var nodesEnter = nodes.enter().append('g').attr('id', function (d) {
        return 'node-' + d.id;
      }).attr('class', function (d) {
        return d.type + '-node node';
      }).attr('transform', function (d) {
        return 'translate(' + d.location.x + '  ' + d.location.y + ')';
      });
      nodesEnter.append('path');
      var labelEnter = nodesEnter.append('text').attr('class', 'label');
      var payoffEnter = nodesEnter.append('text').attr('class', 'payoff computed');
      var indicatorEnter = nodesEnter.append('text').attr('class', 'error-indicator').text('!!');
      var aggregatedPayoffEnter = nodesEnter.append('text').attr('class', 'aggregated-payoff');
      var probabilityToEnterEnter = nodesEnter.append('text').attr('class', 'probability-to-enter');
      var nodesMerge = nodesEnter.merge(nodes);
      nodesMerge.classed('optimal', function (d) {
        return self.isOptimal(d);
      });
      var nodesMergeT = nodesMerge;

      if (this.transition) {
        nodesMergeT = nodesMerge.transition();
        nodesMergeT.on('end', function () {
          return self.updatePlottingRegionSize();
        });
      }

      nodesMergeT.attr('transform', function (d) {
        return 'translate(' + d.location.x + '  ' + d.location.y + ')';
      });
      var path = nodesMerge.select('path');
      this.layout.drawNodeSymbol(path, this.transition);
      /*path
          .style('fill', d=> {
              // if(self.isNodeSelected(d)){
              //     return self.config.node[d.type].selected.fill
              // }
              return self.config.node[d.type].fill
          })
          .style('stroke', d=> self.config.node[d.type].stroke)
          .style('stroke-width', d=> {
              if(self.config.node[d.type].strokeWidth!==undefined){
                  return self.config.node[d.type].strokeWidth;
              }
              return self.config.node.strokeWidth;
          });
      */

      this.layout.nodeLabelPosition(labelEnter);
      var labelMerge = nodesMerge.select('text.label');
      labelMerge.classed('sd-hidden', this.config.hideLabels);
      var labelMergeT = nodesMergeT.select('text.label');
      labelMergeT.each(this.updateTextLines);
      this.layout.nodeLabelPosition(labelMergeT).attr('text-anchor', 'middle');
      var payoff = nodesMerge.select('text.payoff');
      var payoffTspans = payoff.selectAll('tspan').data(function (d) {
        var item = d.displayValue('childrenPayoff');
        return _sdUtils.Utils.isArray(item) ? item.filter(function (i) {
          return i !== undefined;
        }) : [item];
      });
      payoffTspans.exit().remove();
      var payoffTspansM = payoffTspans.enter().append('tspan').merge(payoffTspans);
      payoffTspansM // .attr('dominant-baseline', 'hanging')
      .attr('dy', function (d, i) {
        return i > 0 ? '1.1em' : undefined;
      }).attr('x', '0').classed('negative', function (d) {
        return d !== null && d < 0;
      }).classed('sd-hidden', this.config.hidePayoffs || this.config.raw).text(function (d, i) {
        var val = d;
        return val !== null ? isNaN(val) ? val : self.config.payoffNumberFormatter(val, i) : '';
      });
      this.attachPayoffTooltip(payoffTspansM);
      var payoffT = payoff;

      if (this.transition) {
        payoffT = payoff.transition();
      }

      this.layout.nodePayoffPosition(payoffEnter);
      this.layout.nodePayoffPosition(payoffT);
      var aggregatedPayoff = nodesMerge.select('text.aggregated-payoff');
      var aggregatedPayoffTspans = aggregatedPayoff.selectAll('tspan').data(function (d) {
        var item = d.displayValue('aggregatedPayoff');
        return _sdUtils.Utils.isArray(item) ? item.filter(function (i) {
          return i !== undefined;
        }) : [item];
      });
      aggregatedPayoffTspans.exit().remove();
      var aggregatedPayoffTspansM = aggregatedPayoffTspans.enter().append('tspan').merge(aggregatedPayoffTspans).attr('dy', function (d, i) {
        return i > 0 ? '0.95em' : undefined;
      }).classed('negative', function (d) {
        return d !== null && d < 0;
      }).classed('sd-hidden', this.config.hidePayoffs || this.config.raw).text(function (val, i) {
        return val !== null ? isNaN(val) ? val : self.config.payoffNumberFormatter(val, i) : '';
      });
      this.attachPayoffTooltip(aggregatedPayoffTspansM, 'aggregatedPayoff');
      var aggregatedPayoffT = aggregatedPayoff;

      if (this.transition) {
        aggregatedPayoffT = aggregatedPayoff.transition();
      }

      this.layout.nodeAggregatedPayoffPosition(aggregatedPayoffEnter);
      this.layout.nodeAggregatedPayoffPosition(aggregatedPayoffT);
      var probabilityToEnter = nodesMerge.select('text.probability-to-enter').text(function (d) {
        var val = d.displayValue('probabilityToEnter');
        return val !== null ? isNaN(val) ? val : self.config.probabilityNumberFormatter(val) : '';
      }).classed('sd-hidden', this.config.hideProbabilities || this.config.raw);

      _tooltip.Tooltip.attach(probabilityToEnter, _i18n.i18n.t('tooltip.node.probabilityToEnter'));

      var probabilityToEnterT = probabilityToEnter;

      if (this.transition) {
        probabilityToEnterT = probabilityToEnter.transition();
      }

      this.layout.nodeProbabilityToEnterPosition(probabilityToEnterEnter);
      this.layout.nodeProbabilityToEnterPosition(probabilityToEnterT);
      var indicator = nodesMerge.select('text.error-indicator');
      indicator.classed('sd-hidden', this.config.raw);
      this.layout.nodeIndicatorPosition(indicatorEnter);
      this.layout.nodeIndicatorPosition(indicator);

      if (this.nodeDragHandler) {
        nodesMerge.call(this.nodeDragHandler.drag);
      }

      nodesMerge.on('contextmenu', this.nodeContextMenu);
      nodesMerge.on('dblclick', this.nodeContextMenu);
      nodesMerge.each(function (d, i) {
        var nodeElem = this;
        var mc = new Hammer.Manager(nodeElem);
        mc.add(new Hammer.Press({
          pointerType: 'touch'
        }));
        mc.on('press', function (e) {
          if (e.pointerType == 'touch') {
            self.nodeDragHandler.cancelDrag();
          }
        });

        if (d.folded) {
          var button = d3.select(nodeElem).selectOrAppend('text.sd-unfold-button').text("[+]").on('click dbclick mousedown', function () {
            return self.foldSubtree(d, false);
          }); //firefox detects only mousedown event - related to drag handler

          self.layout.nodeUnfoldButtonPosition(button);

          _tooltip.Tooltip.attach(button, _i18n.i18n.t('contextMenu.node.unfold'));
        } else {
          d3.select(nodeElem).select('.sd-unfold-button').remove();
        }
      });
    }
  }, {
    key: "attachPayoffTooltip",
    value: function attachPayoffTooltip(selection) {
      var payoffFiledName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'payoff';
      var object = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'node';
      var self = this;

      _tooltip.Tooltip.attach(selection, function (d, i) {
        if (self.config.payoffNames.length > i && self.config.payoffNames[i] !== null) {
          return _i18n.i18n.t('tooltip.' + object + '.' + payoffFiledName + '.named', {
            value: d.payoff,
            number: i + 1,
            name: self.config.payoffNames[i]
          });
        }

        return _i18n.i18n.t('tooltip.' + object + '.' + payoffFiledName + '.default', {
          value: d.payoff,
          number: self.config.maxPayoffsToDisplay < 2 ? '' : i + 1
        });
      });
    }
  }, {
    key: "updateTextLines",
    value: function updateTextLines(d) {
      //helper method for splitting text to tspans
      var lines = d.name ? d.name.split('\n') : [];
      lines.reverse();
      var tspans = d3.select(this).selectAll('tspan').data(lines);
      tspans.enter().append('tspan').merge(tspans).text(function (l) {
        return l;
      }).attr('dy', function (d, i) {
        return i > 0 ? '-1.1em' : undefined;
      }).attr('x', '0');
      tspans.exit().remove();
    }
  }, {
    key: "isOptimal",
    value: function isOptimal(d) {
      return d.displayValue('optimal');
    }
  }, {
    key: "redrawEdges",
    value: function redrawEdges() {
      var _this = this;

      var self = this;
      var edgesContainer = this.mainGroup.selectOrAppend('g.edges');

      if (self.config.forceFullEdgeRedraw) {
        edgesContainer.selectAll("*").remove();
      }

      var edges = edgesContainer.selectAll('.edge').data(this.data.edges.filter(function (e) {
        return !e.$hidden;
      }), function (d, i) {
        return d.id;
      });
      edges.exit().remove();
      var edgesEnter = edges.enter().append('g').attr('id', function (d) {
        return 'edge-' + d.id;
      }).attr('class', 'edge');
      edgesEnter.append('path');
      var labelEnter = edgesEnter.appendSelector('g.label-group');
      labelEnter.append('text').attr('class', 'label');
      var payoffEnter = edgesEnter.append('text').attr('class', 'payoff');
      var probabilityEnter = edgesEnter.append('text').attr('class', 'probability');
      var edgesMerge = edgesEnter.merge(edges);
      var optimalClassName = 'optimal';
      edgesMerge.classed(optimalClassName, function (d) {
        return self.isOptimal(d);
      });
      var edgesMergeT = edgesMerge;

      if (this.transition) {
        edgesMergeT = edgesMerge.transition();
      }

      edgesMergeT.select('path').attr('d', function (d) {
        return _this.layout.edgeLineD(d);
      }) // .attr("stroke", "black")
      // .attr("stroke-width", 2)
      .attr("fill", "none").attr("marker-end", function (d) {
        var suffix = d3.select(this.parentNode).classed('selected') ? '-selected' : self.isOptimal(d) ? '-optimal' : '';
        return "url(#arrow" + suffix + ")";
      }); // .attr("shape-rendering", "optimizeQuality")

      edgesMerge.on('click', function (d) {
        self.selectEdge(d, true);
      });
      this.layout.edgeLabelPosition(labelEnter);
      edgesMergeT.select('text.label').each(this.updateTextLines);
      var labelMerge = edgesMerge.select('g.label-group');
      labelMerge.classed('sd-hidden', this.config.hideLabels);
      var labelMergeT = edgesMergeT.select('g.label-group');
      this.layout.edgeLabelPosition(labelMergeT); // .text(d=>d.name);

      var payoff = edgesMerge.select('text.payoff');
      var payoffTspans = payoff.selectAll('tspan').data(function (d) {
        var item = d.displayValue('payoff');
        return _sdUtils.Utils.isArray(item) ? item.slice(0, Math.min(item.length, self.config.maxPayoffsToDisplay)).map(function (_) {
          return d;
        }) : [d];
      });
      payoffTspans.exit().remove();
      var payoffTspansM = payoffTspans.enter().append('tspan').merge(payoffTspans);
      payoffTspansM // .attr('dominant-baseline', 'hanging')
      .attr('dy', function (d, i) {
        return i > 0 ? '1.1em' : undefined;
      }) // .attr('x', '0')
      // .attr('dominant-baseline', 'hanging')
      .classed('negative', function (d, i) {
        var val = d.displayPayoff(undefined, i);
        return val !== null && val < 0;
      }).classed('sd-hidden', this.config.hidePayoffs) // .text(d=> isNaN(d.payoff) ? d.payoff : self.config.payoffNumberFormatter(d.payoff))
      .text(function (d, i) {
        if (_this.config.raw) {
          return d.payoff[i];
        }

        var item = d.displayValue('payoff');
        var items = _sdUtils.Utils.isArray(item) ? item : [item];
        var val = items[i];

        if (val !== null) {
          if (!isNaN(val)) {
            return self.config.payoffNumberFormatter(val, i);
          }

          if (_sdUtils.Utils.isString(val)) {
            return val;
          }
        }

        if (d.payoff[i] !== null && !isNaN(d.payoff[i])) return self.config.payoffNumberFormatter(d.payoff[i], i);
        return d.payoff[i];
      });

      _tooltip.Tooltip.attach(payoffTspansM, function (d, i) {
        if (self.config.payoffNames.length > i && self.config.payoffNames[i] !== null) {
          return _i18n.i18n.t('tooltip.edge.payoff.named', {
            value: d.payoff[i],
            number: i + 1,
            name: self.config.payoffNames[i]
          });
        }

        return _i18n.i18n.t('tooltip.edge.payoff.default', {
          value: d.payoff[i],
          number: self.config.maxPayoffsToDisplay < 2 ? '' : i + 1
        });
      });

      var payoffTextT = payoff;

      if (this.transition) {
        payoffTextT = payoff.transition();
      }

      this.layout.edgePayoffPosition(payoffEnter);
      this.layout.edgePayoffPosition(payoffTextT);

      _tooltip.Tooltip.attach(edgesMerge.select('text.probability'), function (d) {
        return _i18n.i18n.t('tooltip.edge.probability', {
          value: d.probability === undefined ? d.displayProbability() : d.probability
        });
      });

      edgesMerge.select('text.probability').classed('sd-hidden', this.config.hideProbabilities);
      var probabilityMerge = edgesMerge.select('text.probability');
      probabilityMerge.attr('text-anchor', 'end').text(function (d) {
        if (_this.config.raw) {
          return d.probability;
        }

        var val = d.displayProbability();

        if (val !== null) {
          if (!isNaN(val)) {
            return self.config.probabilityNumberFormatter(val);
          }

          if (_sdUtils.Utils.isString(val)) {
            return val;
          }
        }

        if (d.probability !== null && !isNaN(d.probability)) return self.config.probabilityNumberFormatter(d.probability);
        return d.probability;
      });
      var probabilityMergeT = probabilityMerge;

      if (this.transition) {
        probabilityMergeT = probabilityMerge.transition();
      }

      this.layout.edgeProbabilityPosition(probabilityEnter);
      this.layout.edgeProbabilityPosition(probabilityMergeT);
      edgesContainer.selectAll('.edge.' + optimalClassName).raise();
      edgesMerge.on('contextmenu', this.edgeContextMenu);
      edgesMerge.on('dblclick', this.edgeContextMenu);
      edgesMerge.each(function (d, i) {
        var elem = this;
        var mc = new Hammer.Manager(elem);
        mc.add(new Hammer.Press({
          pointerType: Hammer.POINTER_TOUCH
        }));
      });
    }
  }, {
    key: "redrawFloatingTexts",
    value: function redrawFloatingTexts() {
      var self = this;
      var textsContainer = this.mainGroup.selectOrAppend('g.floating-texts');
      var texts = textsContainer.selectAll('.floating-text').data(this.data.texts, function (d, i) {
        return d.id;
      });
      texts.exit().remove();
      var textsEnter = texts.enter().appendSelector('g.floating-text').attr('id', function (d) {
        return 'text-' + d.id;
      });
      var rectWidth = 40;
      var rectHeight = 20;
      textsEnter.append('rect').attr('x', -5).attr('y', -16).attr('fill-opacity', 0);
      textsEnter.append('text');
      var textsMerge = textsEnter.merge(texts);
      var textsMergeT = textsMerge;

      if (this.transition) {
        textsMergeT = textsMerge.transition();
      }

      textsMergeT.attr('transform', function (d) {
        return 'translate(' + d.location.x + '  ' + d.location.y + ')';
      });
      var tspans = textsMerge.select('text').selectAll('tspan').data(function (d) {
        return d.value ? d.value.split('\n') : [];
      });
      tspans.enter().append('tspan').merge(tspans).html(function (l) {
        return _appUtils.AppUtils.replaceUrls(_appUtils.AppUtils.escapeHtml(l));
      }).attr('dy', function (d, i) {
        return i > 0 ? '1.1em' : undefined;
      }).attr('x', '0');
      tspans.exit().remove();
      textsMerge.classed('sd-empty', function (d) {
        return !d.value || !d.value.trim();
      });
      textsMerge.select('rect').attr('width', rectWidth).attr('height', rectHeight);
      textsMerge.each(function (d) {
        if (!d.value) {
          return;
        }

        var bb = d3.select(this).select('text').node().getBBox();
        d3.select(this).select('rect').attr('y', bb.y - 5).attr('width', Math.max(bb.width + 10, rectWidth)).attr('height', Math.max(bb.height + 10, rectHeight));
      });

      if (this.textDragHandler) {
        textsMerge.call(this.textDragHandler.drag);
      }

      textsMerge.on('contextmenu', this.textContextMenu);
      textsMerge.on('dblclick', this.textContextMenu);
      textsMerge.each(function (d, i) {
        var elem = this;
        var mc = new Hammer.Manager(elem);
        mc.add(new Hammer.Press({
          pointerType: 'touch'
        }));
      });
    }
  }, {
    key: "updateValidationMessages",
    value: function updateValidationMessages() {
      var _this2 = this;

      var nodes = this.mainGroup.selectAll('.node');
      nodes.classed('error', false);
      this.data.validationResults.forEach(function (validationResult) {
        if (validationResult.isValid()) {
          return;
        }

        Object.getOwnPropertyNames(validationResult.objectIdToError).forEach(function (id) {
          var errors = validationResult.objectIdToError[id];

          var nodeSelection = _this2.getNodeD3SelectionById(id);

          nodeSelection.classed('error', true);
          var tooltipHtml = '';
          errors.forEach(function (e) {
            if (tooltipHtml) {
              tooltipHtml += '<br/>';
            }

            tooltipHtml += _appUtils.AppUtils.getValidationMessage(e);
          });

          _tooltip.Tooltip.attach(nodeSelection.select('.error-indicator'), tooltipHtml);
        });
      });
    }
  }, {
    key: "initEdgeMarkers",
    value: function initEdgeMarkers() {
      var defs = this.svg.append("svg:defs");
      this.initArrowMarker("arrow");
      this.initArrowMarker("arrow-optimal");
      this.initArrowMarker("arrow-selected");
    }
  }, {
    key: "initArrowMarker",
    value: function initArrowMarker(id) {
      var defs = this.svg.select("defs");
      defs.append("marker").attr("id", id).attr("viewBox", "0 -5 10 10").attr("refX", 5).attr("refY", 0).attr("markerWidth", 4).attr("markerHeight", 4).attr("orient", "auto").append("path").attr("d", "M0,-5L10,0L0,5").attr("class", "arrowHead");
    }
  }, {
    key: "updateBrushExtent",
    value: function updateBrushExtent() {
      var self = this;
      this.brush.extent([[0, 0], [self.svg.attr('width'), self.svg.attr('height')]]);
      this.brushContainer.call(this.brush);
    }
  }, {
    key: "initBrush",
    value: function initBrush() {
      var self = this;
      var brushContainer = self.brushContainer = this.brushContainer = this.wrapperGroup.selectOrInsert("g.brush", ":first-child").attr("class", "brush");
      var brush = this.brush = d3.brush().on("start", brushstart).on("brush", brushmove).on("end", brushend);
      this.updateBrushExtent();
      brushContainer.select('.overlay').on("mousemove.edgeSelection", mousemoved);

      function mousemoved() {
        var m = d3.mouse(this);
        var mgt = self.getMainGroupTranslation();
        var margin = 10;
        var closest = [null, 999999999];
        var closeEdges = [];
        self.mainGroup.selectAll('.edge').each(function (d) {
          var selection = d3.select(this);
          selection.classed('sd-hover', false);
          var pathNode = selection.select('path').node();
          var b = pathNode.getBBox();

          if (b.x + mgt[0] <= m[0] && b.x + b.width + mgt[0] >= m[0] && b.y + mgt[1] - margin <= m[1] && b.y + b.height + mgt[1] + margin >= m[1]) {
            var cp = _appUtils.AppUtils.closestPoint(pathNode, [m[0] - mgt[0], m[1] - mgt[1]]);

            if (cp.distance < margin && cp.distance < closest[1]) {
              closest = [selection, cp.distance];
            }
          }
        });
        self.hoveredEdge = null;

        if (closest[0]) {
          closest[0].classed('sd-hover', true);
          self.hoveredEdge = closest[0];
        }
      }

      function brushstart() {
        if (!d3.event.selection) return;

        if (self.hoveredEdge) {
          self.selectEdge(self.hoveredEdge.datum(), true);
        } else {
          self.clearSelection();
        }

        _contextMenu.ContextMenu.hide();
      } // Highlight the selected nodes.


      function brushmove() {
        var s = d3.event.selection;
        if (!s) return;
        self.mainGroup.selectAll(".node").classed('selected', function (d) {
          var mainGroupTranslation = self.getMainGroupTranslation();
          var x = d.location.x + mainGroupTranslation[0];
          var y = d.location.y + mainGroupTranslation[1];
          var nodeSize = self.config.layout.nodeSize;
          var offset = nodeSize * 0.25;
          return s[0][0] <= x + offset && x - offset <= s[1][0] && s[0][1] <= y + offset && y - offset <= s[1][1];
        });
      } // If the brush is empty, select all circles.


      function brushend() {
        if (!d3.event.selection) return;
        brush.move(brushContainer, null);
        var selectedNodes = self.getSelectedNodes();

        if (selectedNodes && selectedNodes.length === 1) {
          self.selectNode(selectedNodes[0]);
        } // if (!d3.event.selection) self.mainGroup.selectAll(".selected").classed('selected', false);

      }
    }
  }, {
    key: "disableBrush",
    value: function disableBrush() {
      if (!this.brushDisabled) {
        _appUtils.AppUtils.growl(_i18n.i18n.t('growl.brushDisabled'), 'info', 'left');
      }

      this.brushDisabled = true;
      this.brushContainer.remove();
    }
  }, {
    key: "enableBrush",
    value: function enableBrush() {
      if (this.brushDisabled) {
        _appUtils.AppUtils.growl(_i18n.i18n.t('growl.brushEnabled'), 'info', 'left');

        this.initBrush();
        this.brushDisabled = false;
      }
    }
  }, {
    key: "getMainGroupTranslation",
    value: function getMainGroupTranslation(invert) {
      var translation = _appUtils.AppUtils.getTranslation(this.mainGroup.attr("transform"));

      if (invert) {
        translation[0] = -translation[0];
        translation[1] = -translation[1];
      }

      return translation;
    }
  }, {
    key: "initNodeContextMenu",
    value: function initNodeContextMenu() {
      this.nodeContextMenu = new _nodeContextMenu.NodeContextMenu(this, this.config.operationsForObject);
    }
  }, {
    key: "initEdgeContextMenu",
    value: function initEdgeContextMenu() {
      this.edgeContextMenu = new _edgeContextMenu.EdgeContextMenu(this);
    }
  }, {
    key: "initTextContextMenu",
    value: function initTextContextMenu() {
      this.textContextMenu = new _textContextMenu.TextContextMenu(this);
    }
  }, {
    key: "initMainContextMenu",
    value: function initMainContextMenu() {
      this.mainContextMenu = new _mainContextMenu.MainContextMenu(this);
      this.svg.on('contextmenu', this.mainContextMenu);
      this.svg.on('dblclick', this.mainContextMenu);
    }
  }, {
    key: "addText",
    value: function addText(text) {
      this.data.saveState();
      this.data.addText(text);
      this.redraw();
      this.selectText(text);
    }
  }, {
    key: "addNode",
    value: function addNode(node, parent) {
      var redraw = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      this.data.saveState();
      this.data.addNode(node, parent);
      this.redraw(true);
      this.layout.update(node);
      return node;
    }
  }, {
    key: "addDecisionNode",
    value: function addDecisionNode(parent) {
      var newNode = new _sdModel.domain.DecisionNode(this.layout.getNewChildLocation(parent));
      this.addNode(newNode, parent);
    }
  }, {
    key: "addChanceNode",
    value: function addChanceNode(parent) {
      var newNode = new _sdModel.domain.ChanceNode(this.layout.getNewChildLocation(parent));
      this.addNode(newNode, parent);
    }
  }, {
    key: "addTerminalNode",
    value: function addTerminalNode(parent) {
      var newNode = new _sdModel.domain.TerminalNode(this.layout.getNewChildLocation(parent));
      this.addNode(newNode, parent);
    }
  }, {
    key: "injectNode",
    value: function injectNode(node, edge) {
      this.data.saveState();
      this.data.injectNode(node, edge);
      this.redraw();
      this.layout.update(node);
      return node;
    }
  }, {
    key: "injectDecisionNode",
    value: function injectDecisionNode(edge) {
      var newNode = new _sdModel.domain.DecisionNode(this.layout.getInjectedNodeLocation(edge));
      this.injectNode(newNode, edge);
    }
  }, {
    key: "injectChanceNode",
    value: function injectChanceNode(edge) {
      var newNode = new _sdModel.domain.ChanceNode(this.layout.getInjectedNodeLocation(edge));
      this.injectNode(newNode, edge);
    }
  }, {
    key: "removeNode",
    value: function removeNode(node) {
      this.data.saveState();
      this.data.removeNode(node);

      if (!this.layout.isManualLayout()) {
        this.layout.update();
      } else {
        this.redraw();
      }
    }
  }, {
    key: "removeSelectedNodes",
    value: function removeSelectedNodes() {
      var selectedNodes = this.getSelectedNodes();

      if (!selectedNodes.length) {
        return;
      }

      this.data.saveState();
      this.data.removeNodes(selectedNodes);
      this.clearSelection();
      this.redraw();
      this.layout.update();
    }
  }, {
    key: "removeSelectedTexts",
    value: function removeSelectedTexts() {
      var selectedTexts = this.getSelectedTexts();

      if (!selectedTexts.length) {
        return;
      }

      this.data.saveState();
      this.data.removeTexts(selectedTexts);
      this.clearSelection();
      this.redraw();
    }
  }, {
    key: "copyNode",
    value: function copyNode(d, notClearPrevSelection) {
      var clone = this.data.cloneSubtree(d);

      if (notClearPrevSelection) {
        if (!this.copiedNodes) {
          this.copiedNodes = [];
        }

        this.copiedNodes.push(clone);
      } else {
        this.copiedNodes = [clone];
      }
    }
  }, {
    key: "cutNode",
    value: function cutNode(d) {
      this.copyNode(d);
      this.removeNode(d);
    }
  }, {
    key: "cutSelectedNodes",
    value: function cutSelectedNodes() {
      var selectedNodes = this.getSelectedNodes();
      var selectedRoots = this.data.findSubtreeRoots(selectedNodes);
      this.copyNodes(selectedRoots);
      this.removeSelectedNodes();
    }
  }, {
    key: "copySelectedNodes",
    value: function copySelectedNodes() {
      var self;
      var selectedNodes = this.getSelectedNodes();
      var selectedRoots = this.data.findSubtreeRoots(selectedNodes);
      this.copyNodes(selectedRoots);
    }
  }, {
    key: "copyNodes",
    value: function copyNodes(nodes) {
      var _this3 = this;

      this.copiedNodes = nodes.map(function (d) {
        return _this3.data.cloneSubtree(d);
      });
    }
  }, {
    key: "pasteToNode",
    value: function pasteToNode(node) {
      var _this4 = this;

      if (!this.copiedNodes || !this.copiedNodes.length) {
        return;
      }

      this.data.saveState();
      var self = this;
      self.clearSelection();
      var nodesToAttach = this.copiedNodes;
      self.copyNodes(this.copiedNodes);
      nodesToAttach.forEach(function (toAttach) {
        var attached = _this4.data.attachSubtree(toAttach, node).childNode;

        if (attached.folded) {
          self.foldSubtree(attached, attached.folded, false);
        }

        var location = self.layout.getNewChildLocation(node);
        attached.moveTo(location.x, location.y, true);
        self.layout.moveNodeToEmptyPlace(attached, false);
        self.layout.fitNodesInPlottingRegion(_this4.data.getAllDescendantNodes(attached));
        self.selectSubTree(attached, false, nodesToAttach.length > 1);
      });

      if (node.folded) {
        self.foldSubtree(node, node.folded, false);
      }

      setTimeout(function () {
        self.redraw();
        self.layout.update();
      }, 10);
    }
  }, {
    key: "pasteToNewLocation",
    value: function pasteToNewLocation(point) {
      var _this5 = this;

      this.data.saveState();
      var self = this;
      self.clearSelection();
      var nodesToAttach = this.copiedNodes;
      self.copyNodes(this.copiedNodes);
      nodesToAttach.forEach(function (toAttach) {
        var attached = _this5.data.attachSubtree(toAttach);

        if (attached.folded) {
          self.foldSubtree(attached, attached.folded, false);
        }

        attached.moveTo(point.x, point.y, true);
        self.layout.moveNodeToEmptyPlace(attached, false);
        self.layout.fitNodesInPlottingRegion(_this5.data.getAllDescendantNodes(attached));
        self.selectSubTree(attached, false, nodesToAttach.length > 1);
      });
      setTimeout(function () {
        self.redraw();
        self.layout.update();
      }, 10);
    }
  }, {
    key: "convertNode",
    value: function convertNode(node, typeToConvertTo) {
      var self = this;
      this.data.saveState();
      this.data.convertNode(node, typeToConvertTo);
      setTimeout(function () {
        self.redraw(true);
      }, 10);
    }
  }, {
    key: "performOperation",
    value: function performOperation(object, operation) {
      var self = this;
      this.data.saveState();
      this.config.performOperation(object, operation).then(function () {
        setTimeout(function () {
          self.redraw();
          self.layout.update();
        }, 10);
      });
    }
  }, {
    key: "foldSubtree",
    value: function foldSubtree(node) {
      var fold = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var redraw = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var self = this;
      node.folded = fold;
      this.data.getAllDescendantNodes(node).forEach(function (n) {
        n.$hidden = fold;
        n.folded = false;
      });
      this.data.getAllDescendantEdges(node).forEach(function (e) {
        return e.$hidden = fold;
      });

      if (!redraw) {
        return;
      }

      setTimeout(function () {
        self.redraw();
        self.layout.update();
      }, 10);
    }
  }, {
    key: "updateVisibility",
    value: function updateVisibility() {
      var _this6 = this;

      var node = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (!node) {
        this.data.getRoots().forEach(function (n) {
          return _this6.updateVisibility(n);
        });
        return;
      }

      if (node.folded) {
        this.foldSubtree(node, true, false);
        return;
      }

      node.childEdges.forEach(function (e) {
        return _this6.updateVisibility(e.childNode);
      });
    }
  }, {
    key: "moveNodeTo",
    value: function moveNodeTo(x, y) {}
  }, {
    key: "updateNodePosition",
    value: function updateNodePosition(node) {
      this.getNodeD3Selection(node).raise().attr('transform', 'translate(' + node.location.x + ' ' + node.location.y + ')');
    }
  }, {
    key: "updateTextPosition",
    value: function updateTextPosition(text) {
      this.getTextD3Selection(text).raise().attr('transform', 'translate(' + text.location.x + ' ' + text.location.y + ')');
    }
  }, {
    key: "getNodeD3Selection",
    value: function getNodeD3Selection(node) {
      return this.getNodeD3SelectionById(node.id);
    }
  }, {
    key: "getNodeD3SelectionById",
    value: function getNodeD3SelectionById(id) {
      return this.mainGroup.select('#node-' + id);
    }
  }, {
    key: "getTextD3Selection",
    value: function getTextD3Selection(text) {
      return this.getTextD3SelectionById(text.id);
    }
  }, {
    key: "getTextD3SelectionById",
    value: function getTextD3SelectionById(id) {
      return this.mainGroup.select('#text-' + id);
    }
  }, {
    key: "getSelectedNodes",
    value: function getSelectedNodes() {
      var _this7 = this;

      var visibleOnly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var selectedVisible = this.mainGroup.selectAll(".node.selected").data();

      if (visibleOnly) {
        return selectedVisible;
      }

      var allSelected = [];
      allSelected.push.apply(allSelected, _toConsumableArray(selectedVisible));
      selectedVisible.forEach(function (n) {
        if (n.folded) {
          var descendants = _this7.data.getAllDescendantNodes(n);

          if (descendants) {
            allSelected.push.apply(allSelected, _toConsumableArray(descendants));
          }
        }
      });
      return allSelected;
    }
  }, {
    key: "getSelectedTexts",
    value: function getSelectedTexts() {
      return this.mainGroup.selectAll(".floating-text.selected").data();
    }
  }, {
    key: "clearSelection",
    value: function clearSelection() {
      var _this8 = this;

      this.mainGroup.selectAll(".edge.selected").select('path').attr("marker-end", function (d) {
        return "url(#arrow" + (_this8.isOptimal(d) ? '-optimal' : '') + ")";
      });
      this.mainGroup.selectAll(".selected").classed('selected', false);
      this.config.onSelectionCleared();
    }
  }, {
    key: "selectEdge",
    value: function selectEdge(edge, clearSelectionBeforeSelect) {
      if (clearSelectionBeforeSelect) {
        this.clearSelection();
      }

      this.config.onEdgeSelected(edge);
      this.mainGroup.select('#edge-' + edge.id).classed('selected', true).select('path').attr("marker-end", function (d) {
        return "url(#arrow-selected)";
      });
    }
  }, {
    key: "isNodeSelected",
    value: function isNodeSelected(node) {
      return this.getNodeD3Selection(node).classed('selected');
    }
  }, {
    key: "selectNode",
    value: function selectNode(node, clearSelectionBeforeSelect, skipCallback) {
      if (clearSelectionBeforeSelect) {
        this.clearSelection();
      }

      if (!skipCallback) {
        this.config.onNodeSelected(node);
      }

      this.getNodeD3SelectionById(node.id).classed('selected', true);
    }
  }, {
    key: "selectText",
    value: function selectText(text, clearSelectionBeforeSelect, skipCallback) {
      if (clearSelectionBeforeSelect) {
        this.clearSelection();
      }

      if (!skipCallback) {
        this.config.onTextSelected(text);
      }

      this.getTextD3SelectionById(text.id).classed('selected', true);
    }
  }, {
    key: "selectSubTree",
    value: function selectSubTree(node, clearSelectionBeforeSelect, skipCallback) {
      var _this9 = this;

      if (clearSelectionBeforeSelect) {
        this.clearSelection();
      }

      this.selectNode(node, false, skipCallback);
      node.childEdges.forEach(function (e) {
        return _this9.selectSubTree(e.childNode, false, true);
      });
    }
  }, {
    key: "selectAllNodes",
    value: function selectAllNodes() {
      this.mainGroup.selectAll(".node").classed('selected', true);
    }
  }, {
    key: "autoLayout",
    value: function autoLayout(type, withoutStateSaving) {
      this.layout.autoLayout(type, withoutStateSaving);
    }
  }, {
    key: "updateDiagramTitle",
    value: function updateDiagramTitle(titleValue) {
      if (!titleValue) {
        titleValue = '';
      }

      this.diagramTitle = titleValue;
      this.redrawDiagramTitle();
      this.redrawDiagramDescription();
      this.updateMargin(true);
    }
  }, {
    key: "redrawDiagramTitle",
    value: function redrawDiagramTitle() {
      var svgWidth = this.svg.attr('width');
      var svgHeight = this.svg.attr('height');
      this.titleContainer = this.svg.selectOrAppend('g.sd-title-container');
      var title = this.titleContainer.selectOrAppend('text.sd-title');
      title.text(this.diagramTitle);

      _layout.Layout.setHangingPosition(title);

      var marginTop = parseInt(this.config.title.margin.top);
      this.titleContainer.attr('transform', 'translate(' + svgWidth / 2 + ',' + marginTop + ')');
    }
  }, {
    key: "redrawDiagramDescription",
    value: function redrawDiagramDescription() {
      var svgWidth = this.svg.attr('width');
      var svgHeight = this.svg.attr('height');
      this.titleContainer = this.svg.selectOrAppend('g.sd-title-container');
      var desc = this.titleContainer.selectOrAppend('text.sd-description');

      if (!this.config.description.show) {
        desc.remove();
        return;
      }

      var lines = this.diagramDescription ? this.diagramDescription.split('\n') : [];
      var tspans = desc.selectAll('tspan').data(lines);
      tspans.enter().append('tspan').merge(tspans).html(function (l) {
        return _appUtils.AppUtils.replaceUrls(_appUtils.AppUtils.escapeHtml(l));
      }).attr('dy', function (d, i) {
        return i > 0 ? '1.1em' : undefined;
      }).attr('x', '0');
      tspans.exit().remove();

      _layout.Layout.setHangingPosition(desc);

      var title = this.titleContainer.selectOrAppend('text.sd-title');
      var marginTop = 0;

      if (this.diagramTitle) {
        marginTop += title.node().getBBox().height;
        marginTop += Math.max(parseInt(this.config.description.margin.top), 0);
      }

      desc.attr('transform', 'translate(0,' + marginTop + ')');
    }
  }, {
    key: "updateDiagramDescription",
    value: function updateDiagramDescription(descriptionValue) {
      if (!descriptionValue) {
        descriptionValue = '';
      }

      this.diagramDescription = descriptionValue;
      this.redrawDiagramTitle();
      this.redrawDiagramDescription();
      this.updateMargin(true);
    }
  }, {
    key: "getTitleGroupHeight",
    value: function getTitleGroupHeight(withMargins) {
      if (!this.titleContainer) {
        return 0;
      }

      var h = this.titleContainer.node().getBBox().height;

      if (withMargins) {
        h += parseInt(this.config.title.margin.bottom);
        h += parseInt(this.config.title.margin.top);
      }

      return h;
    }
  }]);

  return TreeDesigner;
}();

exports.TreeDesigner = TreeDesigner;

},{"./app-utils":1,"./context-menu/context-menu":2,"./context-menu/edge-context-menu":3,"./context-menu/main-context-menu":4,"./context-menu/node-context-menu":5,"./context-menu/text-context-menu":6,"./d3":8,"./i18n/i18n":12,"./layout":16,"./node-drag-handler":17,"./templates":20,"./text-drag-handler":22,"./tooltip":23,"hammerjs":"hammerjs","sd-model":"sd-model","sd-utils":"sd-utils"}],"sd-tree-designer":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require("./src/index");

Object.keys(_index).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _index[key];
    }
  });
});

},{"./src/index":15}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLXV0aWxzLmpzIiwic3JjL2NvbnRleHQtbWVudS9jb250ZXh0LW1lbnUuanMiLCJzcmMvY29udGV4dC1tZW51L2VkZ2UtY29udGV4dC1tZW51LmpzIiwic3JjL2NvbnRleHQtbWVudS9tYWluLWNvbnRleHQtbWVudS5qcyIsInNyYy9jb250ZXh0LW1lbnUvbm9kZS1jb250ZXh0LW1lbnUuanMiLCJzcmMvY29udGV4dC1tZW51L3RleHQtY29udGV4dC1tZW51LmpzIiwic3JjL2QzLWV4dGVuc2lvbnMuanMiLCJzcmMvZDMuanMiLCJzcmMvaTE4bi9kZS5qc29uIiwic3JjL2kxOG4vZW4uanNvbiIsInNyYy9pMThuL2ZyLmpzb24iLCJzcmMvaTE4bi9pMThuLmpzIiwic3JjL2kxOG4vaXQuanNvbiIsInNyYy9pMThuL3BsLmpzb24iLCJzcmMvaW5kZXguanMiLCJzcmMvbGF5b3V0LmpzIiwic3JjL25vZGUtZHJhZy1oYW5kbGVyLmpzIiwic3JjL3N5bWJvbHMvY2lyY2xlLmpzIiwic3JjL3N5bWJvbHMvdHJpYW5nbGUuanMiLCJzcmMvdGVtcGxhdGVzLmpzIiwic3JjL3RlbXBsYXRlcy9ncm93bF9tZXNzYWdlLmh0bWwiLCJzcmMvdGV4dC1kcmFnLWhhbmRsZXIuanMiLCJzcmMvdG9vbHRpcC5qcyIsInNyYy90cmVlLWRlc2lnbmVyLmpzIiwiaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBLElBQUEsRUFBQSxHQUFBLHVCQUFBLENBQUEsT0FBQSxDQUFBLE1BQUEsQ0FBQSxDQUFBOztBQUNBLElBQUEsVUFBQSxHQUFBLE9BQUEsQ0FBQSxhQUFBLENBQUE7O0FBQ0EsSUFBQSxLQUFBLEdBQUEsT0FBQSxDQUFBLGFBQUEsQ0FBQTs7QUFDQSxJQUFBLFFBQUEsR0FBQSxPQUFBLENBQUEsVUFBQSxDQUFBOzs7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QUEsQ0FBQSxDQUFBLENBREQsa0NBQ0MsQ0FERDtBQUVOLFFBQUEsTUFBTSxFQUFFLFNBQUEsTUFBQSxDQUFBLEdBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFxQjtBQUN6QixjQUFJLE9BQU8sR0FBRyxJQUFJLFFBQUEsQ0FBQSxNQUFBLENBQUosWUFBQSxDQUFkLGFBQWMsQ0FBZDtBQUNBLFVBQUEsWUFBWSxDQUFaLE9BQUEsQ0FBQSxPQUFBO0FBQ0g7QUFMSyxPQUFWO0FBT0EsTUFBQSxJQUFJLENBQUosSUFBQSxDQUFVO0FBQ04sUUFBQSxLQUFLLEVBQUUsS0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLENBREQsZ0NBQ0MsQ0FERDtBQUVOLFFBQUEsTUFBTSxFQUFFLFNBQUEsTUFBQSxDQUFBLEdBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFxQjtBQUN6QixjQUFJLE9BQU8sR0FBRyxJQUFJLFFBQUEsQ0FBQSxNQUFBLENBQUosVUFBQSxDQUFkLGFBQWMsQ0FBZDtBQUNBLFVBQUEsWUFBWSxDQUFaLE9BQUEsQ0FBQSxPQUFBO0FBQ0g7QUFMSyxPQUFWO0FBT0EsTUFBQSxJQUFJLENBQUosSUFBQSxDQUFVO0FBQUMsUUFBQSxPQUFPLEVBQUU7QUFBVixPQUFWO0FBQ0EsTUFBQSxJQUFJLENBQUosSUFBQSxDQUFVO0FBQ04sUUFBQSxLQUFLLEVBQUUsS0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLENBREQsMEJBQ0MsQ0FERDtBQUVOLFFBQUEsTUFBTSxFQUFFLFNBQUEsTUFBQSxDQUFBLEdBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFxQjtBQUN6QixjQUFJLE9BQU8sR0FBRyxJQUFJLFFBQUEsQ0FBQSxNQUFBLENBQUosSUFBQSxDQUFkLGFBQWMsQ0FBZDtBQUNBLFVBQUEsWUFBWSxDQUFaLE9BQUEsQ0FBQSxPQUFBO0FBQ0g7QUFMSyxPQUFWO0FBUUEsTUFBQSxJQUFJLENBQUosSUFBQSxDQUFVO0FBQUMsUUFBQSxPQUFPLEVBQUU7QUFBVixPQUFWO0FBQ0EsTUFBQSxJQUFJLENBQUosSUFB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LENBQUEsRUFBQTtBQUFBLEVBQUEsTUFBQSxDQUFBLGNBQUEsQ0FBQSxPQUFBLEVBQUEsR0FBQSxFQUFBO0FBQUEsSUFBQSxVQUFBLEVBQUEsSUFBQTtBQUFBLElBQUEsR0FBQSxFQUFBLFNBQUEsR0FBQSxHQUFBO0FBQUEsYUFBQSxXQUFBLENBQUEsR0FBQSxDQUFBO0FBQUE7QUFBQSxHQUFBO0FBQUEsQ0FBQTs7QUFDQSxJQUFBLFFBQUEsR0FBQSxPQUFBLENBQUEsVUFBQSxDQUFBOztBQUFBLE1BQUEsQ0FBQSxJQUFBLENBQUEsUUFBQSxFQUFBLE9BQUEsQ0FBQSxVQUFBLEdBQUEsRUFBQTtBQUFBLE1BQUEsR0FBQSxLQUFBLFNBQUEsSUFBQSxHQUFBLEtBQUEsWUFBQSxFQUFBO0FBQUEsTUFBQSxHQUFBLElBQUEsT0FBQSxJQUFBLE9BQUEsQ0FBQSxHQUFBLENBQUEsS0FBQSxRQUFBLENBQUEsR0FBQSxDQUFBLEVBQUE7QUFBQSxFQUFBLE1BQUEsQ0FBQSxjQUFBLENBQUEsT0FBQSxFQUFBLEdBQUEsRUFBQTtBQUFBLElBQUEsVUFBQSxFQUFBLElBQUE7QUFBQSxJQUFBLEdBQUEsRUFBQSxTQUFBLEdBQUEsR0FBQTtBQUFBLGFBQUEsUUFBQSxDQUFBLEdBQUEsQ0FBQTtBQUFBO0FBQUEsR0FBQTtBQUFBLENBQUE7O0FBQ0EsSUFBQSxZQUFBLEdBQUEsT0FBQSxDQUFBLGNBQUEsQ0FBQTs7QUFBQSxNQUFBLENBQUEsSUFBQSxDQUFBLFlBQUEsRUFBQSxPQUFBLENBQUEsVUFBQSxHQUFBLEVBQUE7QUFBQSxNQUFBLEdBQUEsS0FBQSxTQUFBLElBQUEsR0FBQSxLQUFBLFlBQUEsRUFBQTtBQUFBLE1BQUEsR0FBQSxJQUFBLE9BQUEsSUFBQSxPQUFBLENBQUEsR0FBQSxDQUFBLEtBQUEsWUFBQSxDQUFBLEdBQUEsQ0FBQSxFQUFBO0FBQUEsRUFBQSxNQUFBLENBQUEsY0FBQSxDQUFBLE9BQUEsRUFBQSxHQUFBLEVBQUE7QUFBQSxJQUFBLFVBQUEsRUFBQSxJQUFBO0FBQUEsSUFBQSxHQUFBLEVBQUEsU0FBQSxHQUFBLEdBQUE7QUFBQSxhQUFBLFlBQUEsQ0FBQSxHQUFBLENBQUE7QUFBQTtBQUFBLEdBQUE7QUFBQSxDQUFBOztBQUNBLElBQUEsUUFBQSxHQUFBLE9BQUEsQ0FBQSxVQUFBLENBQUE7O0FBQUEsTUFBQSxDQUFBLElBQUEsQ0FBQSxRQUFBLEVBQUEsT0FBQSxDQUFBLFVBQUEsR0FBQSxFQUFBO0FBQUEsTUFBQSxHQUFBLEtBQUEsU0FBQSxJQUFBLEdBQUEsS0FBQSxZQUFBLEVBQUE7QUFBQSxNQUFBLEdBQUEsSUFBQSxPQUFBLElBQUEsT0FBQSxDQUFBLEdBQUEsQ0FBQSxLQUFBLFFBQUEsQ0FBQSxHQUFBLENBQUEsRUFBQTtBQUFBLEVBQUEsTUFBQSxDQUFBLGNBQUEsQ0FBQSxPQUFBLEVBQUEsR0FBQSxFQUFBO0FBQUEsSUFBQSxVQUFBLEVBQUEsSUFBQTtBQUFBLElBQUEsR0FBQSxFQUFBLFNBQUEsR0FBQSxHQUFBO0FBQUEsYUFBQSxRQUFBLENBQUEsR0FBQSxDQUFBO0FBQUE7QUFBQSxHQUFBO0FBQUEsQ0FBQTs7QUFDQSxJQUFBLE9BQUEsR0FBQSxPQUFBLENBQUEsU0FBQSxDQUFBOztBQUFBLE1BQUEsQ0FBQSxJQUFBLENBQUEsT0FBQSxFQUFBLE9BQUEsQ0FBQSxVQUFBLEdBQUEsRUFBQTtBQUFBLE1BQUEsR0FBQSxLQUFBLFNBQUEsSUFBQSxHQUFBLEtBQUEsWUFBQSxFQUFBO0FBQUEsTUFBQSxHQUFBLElBQUEsT0FBQSxJQUFBLE9BQUEsQ0FBQSxHQUFBLENBQUEsS0FBQSxPQUFBLENBQUEsR0FBQSxDQUFBLEVBQUE7QUFBQSxFQUFBLE1BQUEsQ0FBQSxjQUFBLENBQUEsT0FBQSxFQUFBLEdBQUEsRUFBQTtBQUFBLElBQUEsVUFBQSxFQUFBLElBQUE7QUFBQSxJQUFBLEdBQUEsRUFBQSxTQUFBLEdBQUEsR0FBQTtBQUFBLGFBQUEsT0FBQSxDQUFBLEdBQUEsQ0FBQTtBQUFBO0FBQUEsR0FBQTtBQUFBLENBQUE7O0FBQ0EsSUFBQSxRQUFBLEdBQUEsT0FBQSxDQUFBLFVBQUEsQ0FBQTs7QUFBQSxNQUFBLENBQUEsSUFBQSxDQUFBLFFBQUEsRUFBQSxPQUFBLENBQUEsVUFBQSxHQUFBLEVBQUE7QUFBQSxNQUFBLEdBQUEsS0FBQSxTQUFBLElBQUEsR0FBQSxLQUFBLFlBQUEsRUFBQTtBQUFBLE1BQUEsR0FBQSxJQUFBLE9BQUEsSUFBQSxPQUFBLENBQUEsR0FBQSxDQUFBLEtBQUEsUUFBQSxDQUFBLEdBQUEsQ0FBQSxFQUFBO0FBQUEsRUFBQSxNQUFBLENBQUEsY0FBQSxDQUFBLE9BQUEsRUFBQSxHQUFBLEVBQUE7QUFBQSxJQUFBLFVBQUEsRUFBQSxJQUFBO0FBQUEsSUFBQSxHQUFBLEVBQUEsU0FBQSxHQUFBLEdBQUE7QUFBQSxhQUFBLFFBQUEsQ0FBQSxHQUFBLENBQUE7QUFBQTtBQUFBLEdBQUE7QUFBQSxDQUFBOztBQUNBLElBQUEsUUFBQSxHQUFBLE9BQUEsQ0FBQSxVQUFBLENBQUE7O0FBQUEsTUFBQSxDQUFBLElBQUEsQ0FBQSxRQUFBLEVBQUEsT0FBQSxDQUFBLFVBQUEsR0FBQSxFQUFBO0FBQUEsTUFBQSxHQUFBLEtBQUEsU0FBQSxJQUFBLEdBQUEsS0FBQSxZQUFBLEVBQUE7QUFBQSxNQUFBLEdBQUEsSUFBQSxPQUFBLElBQUEsT0FBQSxDQUFBLEdBQUEsQ0FBQSxLQUFBLFFBQUEsQ0FBQSxHQUFBLENBQUEsRUFBQTtBQUFBLEVBQUEsTUFBQSxDQUFBLGNBQUEsQ0FBQSxPQUFBLEVBQUEsR0FBQSxFQUFBO0FBQUEsSUFBQSxVQUFBLEVBQUEsSUFBQTtBQUFBLElBQUEsR0FBQSxFQUFBLFNBQUEsR0FBQSxHQUFBO0FBQUEsYUFBQSxRQUFBLENBQUEsR0FBQSxDQUFBO0FBQUE7QUFBQSxHQUFBO0FBQUEsQ0FBQTs7QUFDQSxJQUFBLFlBQUEsR0FBQSxPQUFBLENBQUEsY0FBQSxDQUFBOztBQUFBLE1BQUEsQ0FBQSxJQUFBLENBQUEsWUFBQSxFQUFBLE9BQUEsQ0FBQSxVQUFBLEdBQUEsRUFBQTtBQUFBLE1BQUEsR0FBQSxLQUFBLFNBQUEsSUFBQSxHQUFBLEtBQUEsWUFBQSxFQUFBO0FBQUEsTUFBQSxHQUFBLElBQUEsT0FBQSxJQUFBLE9BQUEsQ0FBQSxHQUFBLENBQUEsS0FBQSxZQUFBLENBQUEsR0FBQSxDQUFBLEVBQUE7QUFBQSxFQUFBLE1BQUEsQ0FBQSxjQUFBLENBQUEsT0FBQSxFQUFBLEdBQUEsRUFBQTtBQUFBLElBQUEsVUFBQSxFQUFBLElBQUE7QUFBQSxJQUFBLEdBQUEsRUFBQSxTQUFBLEdBQUEsR0FBQTtBQUFBLGFBQUEsWUFBQSxDQUFBLEdBQUEsQ0FBQTtBQUFBO0FBQUEsR0FBQTtBQUFBLENBQUE7O0FBQ0EsSUFBQSxhQUFBLEdBQUEsT0FBQSxDQUFBLGdCQUFBLENBQUE7O0FBQUEsTUFBQSxDQUFBLElBQUEsQ0FBQSxhQUFBLEVBQUEsT0FBQSxDQUFBLFVBQUEsR0FBQSxFQUFBO0FBQUEsTUFBQSxHQUFBLEtBQUEsU0FBQSxJQUFBLEdBQUEsS0FBQSxZQUFBLEVBQUE7QUFBQSxNQUFBLEdBQUEsSUFBQSxPQUFBLElBQUEsT0FBQSxDQUFBLEdBQUEsQ0FBQSxLQUFBLGFBQUEsQ0FBQSxHQUFBLENBQUEsRUFBQTtBQUFBLEVBQUEsTUFBQSxDQUFBLGNBQUEsQ0FBQSxPQUFBLEVBQUEsR0FBQSxFQUFBO0FBQUEsSUFBQSxVQUFBLEVBQUEsSUFBQTtBQUFBLElBQUEsR0FBQSxFQUFBLFNBQUEsR0FBQSxHQUFBO0FBQUEsYUFBQSxhQUFBLENBQUEsR0FBQSxDQUFBO0FBQUE7QUFBQSxHQUFBO0FBQUEsQ0FBQTs7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkVBLElBQUEsUUFBQSxHQUFBLHNCQUFBLENBQUEsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFBOztBQUNBLElBQUEsRUFBQSxHQUFBLHVCQUFBLENBQUEsT0FBQSxDQUFBLFdBQUEsQ0FBQSxDQUFBOztBQUNBLElBQUEsRUFBQSxHQUFBLHVCQUFBLENBQUEsT0FBQSxDQUFBLFdBQUEsQ0FBQSxDQUFBOztBQUNBLElBQUEsRUFBQSxHQUFBLHVCQUFBLENBQUEsT0FBQSxDQUFBLFdBQUEsQ0FBQSxDQUFBOztBQUNBLElBQUEsRUFBQSxHQUFBLHVCQUFBLENBQUEsT0FBQSxDQUFBLFdBQUEsQ0FBQSxDQUFBOztBQUNBLElBQUEsRUFBQSxHQUFBLHVCQUFBLENBQUEsT0FBQSxDQUFBLFdBQUEsQ0FBQSxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVhLEk7Ozs7Ozs7V0FLVCxTQUFBLElBQUEsQ0FBQSxHQUFBLEVBQWdCO0FBQ1osTUFBQSxJQUFJLENBQUosUUFBQSxHQUFBLEdBQUE7QUFDQSxVQUFJLFNBQVMsR0FBRztBQUNaLFFBQUEsRUFBRSxFQUFFO0FBQ0EsVUFBQSxXQUFXLEVBQUU7QUFEYixTQURRO0FBSVosUUFBQSxFQUFFLEVBQUU7QUFDQSxVQUFBLFdBQVcsRUFBRTtBQURiLFNBSlE7QUFPWixRQUFBLEVBQUUsRUFBRTtBQUNBLFVBQUEsV0FBVyxFQUFFO0FBRGIsU0FQUTtBQVVaLFFBQUEsRUFBRSxFQUFFO0FBQ0EsVUFBQSxXQUFXLEVBQUU7QUFEYixTQVZRO0FBYVosUUFBQSxFQUFFLEVBQUU7QUFDQSxVQUFBLFdBQVcsRUFBRTtBQURiO0FBYlEsT0FBaEI7QUFpQkEsTUFBQSxJQUFJLENBQUosU0FBQSxHQUFpQixRQUFBLENBQUEsU0FBQSxDQUFBLENBQUEsY0FBQSxDQUF1QjtBQUNwQyxRQUFBLEdBQUcsRUFEaUMsR0FBQTtBQUVwQyxRQUFBLFdBQVcsRUFGeUIsSUFBQTtBQUdwQyxRQUFBLFNBQVMsRUFBRTtBQUh5QixPQUF2QixFQUlkLFVBQUEsR0FBQSxFQUFBLENBQUEsRUFBWSxDQUpmLENBQWlCLENBQWpCO0FBTUg7OztXQUVELFNBQUEsQ0FBQSxDQUFBLEdBQUEsRUFBQSxHQUFBLEVBQWtCO0FBQ2QsYUFBTyxJQUFJLENBQUosU0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFBLEVBQVAsR0FBTyxDQUFQO0FBQ0g7Ozs7Ozs7OztBQ3pDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyRUEsSUFBQSxhQUFBLEdBQUEsT0FBQSxDQUFBLGlCQUFBLENBQUE7O0FBT0EsTUFBQSxDQUFBLElBQUEsQ0FBQSxhQUFBLEVBQUEsT0FBQSxDQUFBLFVBQUEsR0FBQSxFQUFBO0FBQUEsTUFBQSxHQUFBLEtBQUEsU0FBQSxJQUFBLEdBQUEsS0FBQSxZQUFBLEVBQUE7QUFBQSxNQUFBLE1BQUEsQ0FBQSxTQUFBLENBQUEsY0FBQSxDQUFBLElBQUEsQ0FBQSxZQUFBLEVBQUEsR0FBQSxDQUFBLEVBQUE7QUFBQSxNQUFBLEdBQUEsSUFBQSxPQUFBLElBQUEsT0FBQSxDQUFBLEdBQUEsQ0FBQSxLQUFBLGFBQUEsQ0FBQSxHQUFBLENBQUEsRUFBQTtBQUFBLEVBQUEsTUFBQSxDQUFBLGNBQUEsQ0FBQSxPQUFBLEVBQUEsR0FBQSxFQUFBO0FBQUEsSUFBQSxVQUFBLEVBQUEsSUFBQTtBQUFBLElBQUEsR0FBQSxFQUFBLFNBQUEsR0FBQSxHQUFBO0FBQUEsYUFBQSxhQUFBLENBQUEsR0FBQSxDQUFBO0FBQUE7QUFBQSxHQUFBO0FBQUEsQ0FBQTs7QUFKQSxJQUFBLGFBQUEsR0FBQSxPQUFBLENBQUEsaUJBQUEsQ0FBQTs7QUFBQSxNQUFBLENBQUEsSUFBQSxDQUFBLGFBQUEsRUFBQSxPQUFBLENBQUEsVUFBQSxHQUFBLEVBQUE7QUFBQSxNQUFBLEdBQUEsS0FBQSxTQUFBLElBQUEsR0FBQSxLQUFBLFlBQUEsRUFBQTtBQUFBLE1BQUEsTUFBQSxDQUFBLFNBQUEsQ0FBQSxjQUFBLENBQUEsSUFBQSxDQUFBLFlBQUEsRUFBQSxHQUFBLENBQUEsRUFBQTtBQUFBLE1BQUEsR0FBQSxJQUFBLE9BQUEsSUFBQSxPQUFBLENBQUEsR0FBQSxDQUFBLEtBQUEsYUFBQSxDQUFBLEdBQUEsQ0FBQSxFQUFBO0FBQUEsRUFBQSxNQUFBLENBQUEsY0FBQSxDQUFBLE9BQUEsRUFBQSxHQUFBLEVBQUE7QUFBQSxJQUFBLFVBQUEsRUFBQSxJQUFBO0FBQUEsSUFBQSxHQUFBLEVBQUEsU0FBQSxHQUFBLEdBQUE7QUFBQSxhQUFBLGFBQUEsQ0FBQSxHQUFBLENBQUE7QUFBQTtBQUFBLEdBQUE7QUFBQSxDQUFBOztBQUNBLElBQUEsU0FBQSxHQUFBLE9BQUEsQ0FBQSxhQUFBLENBQUE7O0FBQUEsTUFBQSxDQUFBLElBQUEsQ0FBQSxTQUFBLEVBQUEsT0FBQSxDQUFBLFVBQUEsR0FBQSxFQUFBO0FBQUEsTUFBQSxHQUFBLEtBQUEsU0FBQSxJQUFBLEdBQUEsS0FBQSxZQUFBLEVBQUE7QUFBQSxNQUFBLE1BQUEsQ0FBQSxTQUFBLENBQUEsY0FBQSxDQUFBLElBQUEsQ0FBQSxZQUFBLEVBQUEsR0FBQSxDQUFBLEVBQUE7QUFBQSxNQUFBLEdBQUEsSUFBQSxPQUFBLElBQUEsT0FBQSxDQUFBLEdBQUEsQ0FBQSxLQUFBLFNBQUEsQ0FBQSxHQUFBLENBQUEsRUFBQTtBQUFBLEVBQUEsTUFBQSxDQUFBLGNBQUEsQ0FBQSxPQUFBLEVBQUEsR0FBQSxFQUFBO0FBQUEsSUFBQSxVQUFBLEVBQUEsSUFBQTtBQUFBLElBQUEsR0FBQSxFQUFBLFNBQUEsR0FBQSxHQUFBO0FBQUEsYUFBQSxTQUFBLENBQUEsR0FBQSxDQUFBO0FBQUE7QUFBQSxHQUFBO0FBQUEsQ0FBQTs7QUFDQSxJQUFBLFVBQUEsR0FBQSxPQUFBLENBQUEsYUFBQSxDQUFBOztBQUFBLE1BQUEsQ0FBQSxJQUFBLENBQUEsVUFBQSxFQUFBLE9BQUEsQ0FBQSxVQUFBLEdBQUEsRUFBQTtBQUFBLE1BQUEsR0FBQSxLQUFBLFNBQUEsSUFBQSxHQUFBLEtBQUEsWUFBQSxFQUFBO0FBQUEsTUFBQSxNQUFBLENBQUEsU0FBQSxDQUFBLGNBQUEsQ0FBQSxJQUFBLENBQUEsWUFBQSxFQUFBLEdBQUEsQ0FBQSxFQUFBO0FBQUEsTUFBQSxHQUFBLElBQUEsT0FBQSxJQUFBLE9BQUEsQ0FBQSxHQUFBLENBQUEsS0FBQSxVQUFBLENBQUEsR0FBQSxDQUFBLEVBQUE7QUFBQSxFQUFBLE1BQUEsQ0FBQSxjQUFBLENBQUEsT0FBQSxFQUFBLEdBQUEsRUFBQTtBQUFBLElBQUEsVUFBQSxFQUFBLElBQUE7QUFBQSxJQUFBLEdBQUEsRUFBQSxTQUFBLEdBQUEsR0FBQTtBQUFBLGFBQUEsVUFBQSxDQUFBLEdBQUEsQ0FBQTtBQUFBO0FBQUEsR0FBQTtBQUFBLENBQUE7O0FBQ0EsSUFBQSxRQUFBLEdBQUEsT0FBQSxDQUFBLFdBQUEsQ0FBQTs7QUFBQSxNQUFBLENBQUEsSUFBQSxDQUFBLFFBQUEsRUFBQSxPQUFBLENBQUEsVUFBQSxHQUFBLEVBQUE7QUFBQSxNQUFBLEdBQUEsS0FBQSxTQUFBLElBQUEsR0FBQSxLQUFBLFlBQUEsRUFBQTtBQUFBLE1BQUEsTUFBQSxDQUFBLFNBQUEsQ0FBQSxjQUFBLENBQUEsSUFBQSxDQUFBLFlBQUEsRUFBQSxHQUFBLENBQUEsRUFBQTtBQUFBLE1BQUEsR0FBQSxJQUFBLE9BQUEsSUFBQSxPQUFBLENBQUEsR0FBQSxDQUFBLEtBQUEsUUFBQSxDQUFBLEdBQUEsQ0FBQSxFQUFBO0FBQUEsRUFBQSxNQUFBLENBQUEsY0FBQSxDQUFBLE9BQUEsRUFBQSxHQUFBLEVBQUE7QUFBQSxJQUFBLFVBQUEsRUFBQSxJQUFBO0FBQUEsSUFBQSxHQUFBLEVBQUEsU0FBQSxHQUFBLEdBQUE7QUFBQSxhQUFBLFFBQUEsQ0FBQSxHQUFBLENBQUE7QUFBQTtBQUFBLEdBQUE7QUFBQSxDQUFBOztBQUVBLElBQUEsRUFBQSxHQUFBLHNCQUFBLENBQUEsT0FBQSxDQUFBLE1BQUEsQ0FBQSxDQUFBOzs7Ozs7OztBQVBBLGFBQUEsQ0FBQSxZQUFBLENBQUEsTUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNEQSxJQUFBLFFBQUEsR0FBQSxPQUFBLENBQUEsVUFBQSxDQUFBOztBQUNBLElBQUEsUUFBQSxHQUFBLE9BQUEsQ0FBQSxVQUFBLENBQUE7O0FBQ0EsSUFBQSxFQUFBLEdBQUEsdUJBQUEsQ0FBQSxPQUFBLENBQUEsTUFBQSxDQUFBLENBQUE7O0FBQ0EsSUFBQSxPQUFBLEdBQUEsc0JBQUEsQ0FBQSxPQUFBLENBQUEsa0JBQUEsQ0FBQSxDQUFBOztBQUNBLElBQUEsU0FBQSxHQUFBLHNCQUFBLENBQUEsT0FBQSxDQUFBLG9CQUFBLENBQUEsQ0FBQTs7QUFDQSxJQUFBLFNBQUEsR0FBQSxPQUFBLENBQUEsYUFBQSxDQUFBOzs7Ozs7Ozs7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QUFBQSxJQUFBLEdBQUEsRUFBQSxTQUFBLEdBQUEsR0FBQTtBQUFBLGFBQUEsTUFBQSxDQUFBLEdBQUEsQ0FBQTtBQUFBO0FBQUEsR0FBQTtBQUFBLENBQUEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgKiBhcyBkMyBmcm9tIFwiLi9kM1wiO1xyXG5pbXBvcnQge1RlbXBsYXRlc30gZnJvbSBcIi4vdGVtcGxhdGVzXCI7XHJcbmltcG9ydCB7aTE4bn0gZnJvbSBcIi4vaTE4bi9pMThuXCI7XHJcbmltcG9ydCB7VXRpbHN9IGZyb20gXCJzZC11dGlsc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFwcFV0aWxzIHtcclxuXHJcbiAgICBzdGF0aWMgc2FuaXRpemVIZWlnaHQgPSBmdW5jdGlvbiAoaGVpZ2h0LCBjb250YWluZXIpIHtcclxuICAgICAgICByZXR1cm4gKGhlaWdodCB8fCBwYXJzZUludChjb250YWluZXIuc3R5bGUoJ2hlaWdodCcpLCAxMCkgfHwgNDAwKTtcclxuICAgIH07XHJcblxyXG4gICAgc3RhdGljIHNhbml0aXplV2lkdGggPSBmdW5jdGlvbiAod2lkdGgsIGNvbnRhaW5lcikge1xyXG4gICAgICAgIHJldHVybiAod2lkdGggfHwgcGFyc2VJbnQoY29udGFpbmVyLnN0eWxlKCd3aWR0aCcpLCAxMCkgfHwgOTYwKTtcclxuICAgIH07XHJcblxyXG4gICAgc3RhdGljIGF2YWlsYWJsZUhlaWdodCA9IGZ1bmN0aW9uIChoZWlnaHQsIGNvbnRhaW5lciwgbWFyZ2luKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KDAsIEFwcFV0aWxzLnNhbml0aXplSGVpZ2h0KGhlaWdodCwgY29udGFpbmVyKSAtIG1hcmdpbi50b3AgLSBtYXJnaW4uYm90dG9tKTtcclxuICAgIH07XHJcblxyXG4gICAgc3RhdGljIGF2YWlsYWJsZVdpZHRoID0gZnVuY3Rpb24gKHdpZHRoLCBjb250YWluZXIsIG1hcmdpbikge1xyXG4gICAgICAgIHJldHVybiBNYXRoLm1heCgwLCBBcHBVdGlscy5zYW5pdGl6ZVdpZHRoKHdpZHRoLCBjb250YWluZXIpIC0gbWFyZ2luLmxlZnQgLSBtYXJnaW4ucmlnaHQpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvL3BsYWNlcyB0ZXh0U3RyaW5nIGluIHRleHRPYmosIGFkZHMgYW4gZWxsaXBzaXMgaWYgdGV4dCBjYW4ndCBmaXQgaW4gd2lkdGhcclxuICAgIHN0YXRpYyBwbGFjZVRleHRXaXRoRWxsaXBzaXModGV4dEQzT2JqLCB0ZXh0U3RyaW5nLCB3aWR0aCkge1xyXG4gICAgICAgIHZhciB0ZXh0T2JqID0gdGV4dEQzT2JqLm5vZGUoKTtcclxuICAgICAgICB0ZXh0T2JqLnRleHRDb250ZW50ID0gdGV4dFN0cmluZztcclxuXHJcbiAgICAgICAgdmFyIG1hcmdpbiA9IDA7XHJcbiAgICAgICAgdmFyIGVsbGlwc2lzTGVuZ3RoID0gOTtcclxuICAgICAgICAvL2VsbGlwc2lzIGlzIG5lZWRlZFxyXG4gICAgICAgIGlmICh0ZXh0T2JqLmdldENvbXB1dGVkVGV4dExlbmd0aCgpID4gd2lkdGggKyBtYXJnaW4pIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgeCA9IHRleHRTdHJpbmcubGVuZ3RoIC0gMzsgeCA+IDA7IHggLT0gMSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRleHRPYmouZ2V0U3ViU3RyaW5nTGVuZ3RoKDAsIHgpICsgZWxsaXBzaXNMZW5ndGggPD0gd2lkdGggKyBtYXJnaW4pIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0T2JqLnRleHRDb250ZW50ID0gdGV4dFN0cmluZy5zdWJzdHJpbmcoMCwgeCkgKyBcIi4uLlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRleHRPYmoudGV4dENvbnRlbnQgPSBcIi4uLlwiOyAvL2Nhbid0IHBsYWNlIGF0IGFsbFxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBwbGFjZVRleHRXaXRoRWxsaXBzaXNBbmRUb29sdGlwKHRleHREM09iaiwgdGV4dFN0cmluZywgd2lkdGgsIHRvb2x0aXApIHtcclxuICAgICAgICB2YXIgZWxsaXBzaXNQbGFjZWQgPSBBcHBVdGlscy5wbGFjZVRleHRXaXRoRWxsaXBzaXModGV4dEQzT2JqLCB0ZXh0U3RyaW5nLCB3aWR0aCk7XHJcbiAgICAgICAgaWYgKGVsbGlwc2lzUGxhY2VkICYmIHRvb2x0aXApIHtcclxuICAgICAgICAgICAgdGV4dEQzT2JqLm9uKFwibW91c2VvdmVyXCIsIGZ1bmN0aW9uIChkKSB7XHJcbiAgICAgICAgICAgICAgICB0b29sdGlwLnRyYW5zaXRpb24oKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kdXJhdGlvbigyMDApXHJcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCAuOSk7XHJcbiAgICAgICAgICAgICAgICB0b29sdGlwLmh0bWwodGV4dFN0cmluZylcclxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIChkMy5ldmVudC5wYWdlWCArIDUpICsgXCJweFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcInRvcFwiLCAoZDMuZXZlbnQucGFnZVkgLSAyOCkgKyBcInB4XCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRleHREM09iai5vbihcIm1vdXNlb3V0XCIsIGZ1bmN0aW9uIChkKSB7XHJcbiAgICAgICAgICAgICAgICB0b29sdGlwLnRyYW5zaXRpb24oKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kdXJhdGlvbig1MDApXHJcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCAwKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0Rm9udFNpemUoZWxlbWVudCkge1xyXG4gICAgICAgIHJldHVybiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50LCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKFwiZm9udC1zaXplXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXRUcmFuc2xhdGlvbih0cmFuc2Zvcm0pIHtcclxuICAgICAgICAvLyBDcmVhdGUgYSBkdW1teSBnIGZvciBjYWxjdWxhdGlvbiBwdXJwb3NlcyBvbmx5LiBUaGlzIHdpbGwgbmV2ZXJcclxuICAgICAgICAvLyBiZSBhcHBlbmRlZCB0byB0aGUgRE9NIGFuZCB3aWxsIGJlIGRpc2NhcmRlZCBvbmNlIHRoaXMgZnVuY3Rpb25cclxuICAgICAgICAvLyByZXR1cm5zLlxyXG4gICAgICAgIHZhciBnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJnXCIpO1xyXG5cclxuICAgICAgICAvLyBTZXQgdGhlIHRyYW5zZm9ybSBhdHRyaWJ1dGUgdG8gdGhlIHByb3ZpZGVkIHN0cmluZyB2YWx1ZS5cclxuICAgICAgICBnLnNldEF0dHJpYnV0ZU5TKG51bGwsIFwidHJhbnNmb3JtXCIsIHRyYW5zZm9ybSk7XHJcblxyXG4gICAgICAgIC8vIGNvbnNvbGlkYXRlIHRoZSBTVkdUcmFuc2Zvcm1MaXN0IGNvbnRhaW5pbmcgYWxsIHRyYW5zZm9ybWF0aW9uc1xyXG4gICAgICAgIC8vIHRvIGEgc2luZ2xlIFNWR1RyYW5zZm9ybSBvZiB0eXBlIFNWR19UUkFOU0ZPUk1fTUFUUklYIGFuZCBnZXRcclxuICAgICAgICAvLyBpdHMgU1ZHTWF0cml4LlxyXG4gICAgICAgIHZhciBtYXRyaXggPSBnLnRyYW5zZm9ybS5iYXNlVmFsLmNvbnNvbGlkYXRlKCkubWF0cml4O1xyXG5cclxuICAgICAgICAvLyBBcyBwZXIgZGVmaW5pdGlvbiB2YWx1ZXMgZSBhbmQgZiBhcmUgdGhlIG9uZXMgZm9yIHRoZSB0cmFuc2xhdGlvbi5cclxuICAgICAgICByZXR1cm4gW21hdHJpeC5lLCBtYXRyaXguZl07XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHN0YXRpYyBjbG9zZXN0UG9pbnQocGF0aE5vZGUsIHBvaW50KSB7XHJcbiAgICAgICAgdmFyIHBhdGhMZW5ndGggPSBwYXRoTm9kZS5nZXRUb3RhbExlbmd0aCgpLFxyXG4gICAgICAgICAgICBwcmVjaXNpb24gPSA4LFxyXG4gICAgICAgICAgICBiZXN0LFxyXG4gICAgICAgICAgICBiZXN0TGVuZ3RoLFxyXG4gICAgICAgICAgICBiZXN0RGlzdGFuY2UgPSBJbmZpbml0eTtcclxuXHJcbiAgICAgICAgLy8gbGluZWFyIHNjYW4gZm9yIGNvYXJzZSBhcHByb3hpbWF0aW9uXHJcbiAgICAgICAgZm9yICh2YXIgc2Nhbiwgc2Nhbkxlbmd0aCA9IDAsIHNjYW5EaXN0YW5jZTsgc2Nhbkxlbmd0aCA8PSBwYXRoTGVuZ3RoOyBzY2FuTGVuZ3RoICs9IHByZWNpc2lvbikge1xyXG4gICAgICAgICAgICBpZiAoKHNjYW5EaXN0YW5jZSA9IGRpc3RhbmNlMihzY2FuID0gcGF0aE5vZGUuZ2V0UG9pbnRBdExlbmd0aChzY2FuTGVuZ3RoKSkpIDwgYmVzdERpc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICBiZXN0ID0gc2NhbiwgYmVzdExlbmd0aCA9IHNjYW5MZW5ndGgsIGJlc3REaXN0YW5jZSA9IHNjYW5EaXN0YW5jZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gYmluYXJ5IHNlYXJjaCBmb3IgcHJlY2lzZSBlc3RpbWF0ZVxyXG4gICAgICAgIHByZWNpc2lvbiAvPSAyO1xyXG4gICAgICAgIHdoaWxlIChwcmVjaXNpb24gPiAwLjUpIHtcclxuICAgICAgICAgICAgdmFyIGJlZm9yZSxcclxuICAgICAgICAgICAgICAgIGFmdGVyLFxyXG4gICAgICAgICAgICAgICAgYmVmb3JlTGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgYWZ0ZXJMZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBiZWZvcmVEaXN0YW5jZSxcclxuICAgICAgICAgICAgICAgIGFmdGVyRGlzdGFuY2U7XHJcbiAgICAgICAgICAgIGlmICgoYmVmb3JlTGVuZ3RoID0gYmVzdExlbmd0aCAtIHByZWNpc2lvbikgPj0gMCAmJiAoYmVmb3JlRGlzdGFuY2UgPSBkaXN0YW5jZTIoYmVmb3JlID0gcGF0aE5vZGUuZ2V0UG9pbnRBdExlbmd0aChiZWZvcmVMZW5ndGgpKSkgPCBiZXN0RGlzdGFuY2UpIHtcclxuICAgICAgICAgICAgICAgIGJlc3QgPSBiZWZvcmUsIGJlc3RMZW5ndGggPSBiZWZvcmVMZW5ndGgsIGJlc3REaXN0YW5jZSA9IGJlZm9yZURpc3RhbmNlO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKChhZnRlckxlbmd0aCA9IGJlc3RMZW5ndGggKyBwcmVjaXNpb24pIDw9IHBhdGhMZW5ndGggJiYgKGFmdGVyRGlzdGFuY2UgPSBkaXN0YW5jZTIoYWZ0ZXIgPSBwYXRoTm9kZS5nZXRQb2ludEF0TGVuZ3RoKGFmdGVyTGVuZ3RoKSkpIDwgYmVzdERpc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICBiZXN0ID0gYWZ0ZXIsIGJlc3RMZW5ndGggPSBhZnRlckxlbmd0aCwgYmVzdERpc3RhbmNlID0gYWZ0ZXJEaXN0YW5jZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHByZWNpc2lvbiAvPSAyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBiZXN0ID0gW2Jlc3QueCwgYmVzdC55XTtcclxuICAgICAgICBiZXN0LmRpc3RhbmNlID0gTWF0aC5zcXJ0KGJlc3REaXN0YW5jZSk7XHJcbiAgICAgICAgcmV0dXJuIGJlc3Q7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGRpc3RhbmNlMihwKSB7XHJcbiAgICAgICAgICAgIHZhciBkeCA9IHAueCAtIHBvaW50WzBdLFxyXG4gICAgICAgICAgICAgICAgZHkgPSBwLnkgLSBwb2ludFsxXTtcclxuICAgICAgICAgICAgcmV0dXJuIGR4ICogZHggKyBkeSAqIGR5O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ3Jvd2wobWVzc2FnZSwgdHlwZT0naW5mbycsIHBvc2l0aW9uPSdyaWdodCcsIHRpbWUgPSAyMDAwKXtcclxuICAgICAgICB2YXIgaHRtbCA9IFRlbXBsYXRlcy5nZXQoJ2dyb3dsJywge21lc3NhZ2U6bWVzc2FnZSwgdHlwZTp0eXBlfSlcclxuXHJcbiAgICAgICAgdmFyIGcgPSBkMy5zZWxlY3QoJ2JvZHknKS5zZWxlY3RPckFwcGVuZCgnZGl2LnNkLWdyb3dsLWxpc3QuJytwb3NpdGlvbikuYXBwZW5kKCdkaXYnKS5odG1sKGh0bWwpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgZy5yZW1vdmUoKTtcclxuICAgICAgICB9LCB0aW1lKVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBzdGF0aWMgY3JlYXRlRWxlbWVudCh0YWcsIGF0dHJpYnMsIHBhcmVudCkge1xyXG4gICAgICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcclxuXHJcbiAgICAgICAgaWYgKGF0dHJpYnMpIHtcclxuICAgICAgICAgICAgQXBwVXRpbHMuZGVlcEV4dGVuZChlbCwgYXR0cmlicyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwYXJlbnQpIHtcclxuICAgICAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKGVsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGVsO1xyXG4gICAgfTtcclxuXHJcbiAgICBzdGF0aWMgcmVtb3ZlRWxlbWVudChlbGVtZW50KSB7XHJcbiAgICAgICAgZWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyByZXBsYWNlVXJscyh0ZXh0KXtcclxuICAgICAgICBpZighdGV4dCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0ZXh0O1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgdXJsUmVnZXhwID0gLygoZnRwfGh0dHB8aHR0cHMpOlxcL1xcLyhcXHcrOnswLDF9XFx3KkApPyhcXFMrKSg6WzAtOV0rKT8oXFwvfFxcLyhbXFx3IyE6Lj8rPSYlQCFcXC1cXC9dKSk/KS9cclxuXHJcbiAgICAgICAgcmV0dXJuIHRleHQucmVwbGFjZSh1cmxSZWdleHAsICc8YSBocmVmPVwiJDFcIiB0YXJnZXQ9XCJfYmxhbmtcIj4kMTwvYT4nKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZXNjYXBlSHRtbChodG1sKVxyXG4gICAge1xyXG4gICAgICAgIHZhciB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoaHRtbCk7XHJcbiAgICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZCh0ZXh0KTtcclxuICAgICAgICByZXR1cm4gZGl2LmlubmVySFRNTDtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZGlzcGF0Y2hIdG1sRXZlbnQoZWxlbWVudCwgbmFtZSl7XHJcbiAgICAgICAgaWYgKFwiY3JlYXRlRXZlbnRcIiBpbiBkb2N1bWVudCkge1xyXG4gICAgICAgICAgICB2YXIgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJIVE1MRXZlbnRzXCIpO1xyXG4gICAgICAgICAgICBldnQuaW5pdEV2ZW50KG5hbWUsIGZhbHNlLCB0cnVlKTtcclxuICAgICAgICAgICAgZWxlbWVudC5kaXNwYXRjaEV2ZW50KGV2dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgZWxlbWVudC5maXJlRXZlbnQoXCJvblwiK25hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBkaXNwYXRjaEV2ZW50KG5hbWUsIGRhdGEpe1xyXG4gICAgICAgIHZhciBldmVudDtcclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIGV2ZW50ID0gbmV3ICBDdXN0b21FdmVudChuYW1lLHsgJ2RldGFpbCc6IGRhdGEgfSk7XHJcbiAgICAgICAgfWNhdGNoIChlKXsgLy9JRVxyXG4gICAgICAgICAgICBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xyXG4gICAgICAgICAgICBldmVudC5pbml0Q3VzdG9tRXZlbnQobmFtZSwgZmFsc2UsIGZhbHNlLCBkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldFZhbGlkYXRpb25NZXNzYWdlKGVycm9yKXtcclxuICAgICAgICBpZihVdGlscy5pc1N0cmluZyhlcnJvcikpe1xyXG4gICAgICAgICAgICBlcnJvciA9IHtuYW1lOiBlcnJvcn07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBrZXkgPSAndmFsaWRhdGlvbi4nICsgZXJyb3IubmFtZTtcclxuICAgICAgICByZXR1cm4gaTE4bi50KGtleSwgZXJyb3IuZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGhpZGUoc2VsZWN0aW9uKXtcclxuICAgICAgICBzZWxlY3Rpb24uY2xhc3NlZCgnc2QtaGlkZGVuJywgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHNob3coc2VsZWN0aW9uLCBzaG93PXRydWUpe1xyXG4gICAgICAgIHNlbGVjdGlvbi5jbGFzc2VkKCdzZC1oaWRkZW4nLCAhc2hvdyk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBzdGF0aWMgaXNIaWRkZW4oZWwsIGV4YWN0ID0gdHJ1ZSkge1xyXG4gICAgICAgIGlmKCFlbCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihleGFjdCl7XHJcbiAgICAgICAgICAgIHZhciBzdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsKTtcclxuICAgICAgICAgICAgcmV0dXJuIChzdHlsZS5kaXNwbGF5ID09PSAnbm9uZScpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAoZWwub2Zmc2V0UGFyZW50ID09PSBudWxsKVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXRKU09OKHVybCwgY2FsbGJhY2spIHtcclxuICAgICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgeGhyLm9wZW4oJ2dldCcsIHVybCwgdHJ1ZSk7XHJcbiAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcclxuICAgICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgc3RhdHVzID0geGhyLnN0YXR1cztcclxuICAgICAgICAgICAgaWYgKHN0YXR1cyA9PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHhoci5yZXNwb25zZSwgbnVsbCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCBzdGF0dXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB4aHIuc2VuZCgpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCAqIGFzIGQzIGZyb20gJy4uL2QzJ1xyXG5cclxuLypiYXNlZCBvbjpcclxuICogZ2l0aHViLmNvbS9wYXRvcmprL2QzLWNvbnRleHQtbWVudSAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbnRleHRNZW51IHtcclxuICAgIG9wZW5DYWxsYmFjaztcclxuICAgIGNsb3NlQ2FsbGJhY2s7XHJcblxyXG4gICAgY29uc3RydWN0b3IobWVudSwgb3B0cykge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRzID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHNlbGYub3BlbkNhbGxiYWNrID0gb3B0cztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBvcHRzID0gb3B0cyB8fCB7fTtcclxuICAgICAgICAgICAgc2VsZi5vcGVuQ2FsbGJhY2sgPSBvcHRzLm9uT3BlbjtcclxuICAgICAgICAgICAgc2VsZi5jbG9zZUNhbGxiYWNrID0gb3B0cy5vbkNsb3NlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIHRoZSBkaXYgZWxlbWVudCB0aGF0IHdpbGwgaG9sZCB0aGUgY29udGV4dCBtZW51XHJcbiAgICAgICAgZDMuc2VsZWN0QWxsKCcuZDMtY29udGV4dC1tZW51JykuZGF0YShbMV0pXHJcbiAgICAgICAgICAgIC5lbnRlcigpXHJcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXHJcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdkMy1jb250ZXh0LW1lbnUnKTtcclxuXHJcbiAgICAgICAgLy8gY2xvc2UgbWVudVxyXG4gICAgICAgIGQzLnNlbGVjdCgnYm9keScpLm9uKCdjbGljay5kMy1jb250ZXh0LW1lbnUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGQzLnNlbGVjdCgnLmQzLWNvbnRleHQtbWVudScpLnN0eWxlKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICAgICAgaWYgKHNlbGYuY2xvc2VDYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5jbG9zZUNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gdGhpcyBnZXRzIGV4ZWN1dGVkIHdoZW4gYSBjb250ZXh0bWVudSBldmVudCBvY2N1cnNcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGRhdGEsIGluZGV4KSB7XHJcbiAgICAgICAgICAgIHZhciBlbG0gPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgZDMuc2VsZWN0QWxsKCcuZDMtY29udGV4dC1tZW51JykuaHRtbCgnJyk7XHJcbiAgICAgICAgICAgIHZhciBsaXN0ID0gZDMuc2VsZWN0QWxsKCcuZDMtY29udGV4dC1tZW51JylcclxuICAgICAgICAgICAgICAgIC5vbignY29udGV4dG1lbnUnLCBmdW5jdGlvbiAoZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGQzLnNlbGVjdCgnLmQzLWNvbnRleHQtbWVudScpLnN0eWxlKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICAgICAgICAgICAgICBkMy5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGQzLmV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJ3VsJyk7XHJcbiAgICAgICAgICAgIGxpc3Quc2VsZWN0QWxsKCdsaScpLmRhdGEodHlwZW9mIG1lbnUgPT09ICdmdW5jdGlvbicgPyBtZW51KGRhdGEpIDogbWVudSkuZW50ZXIoKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgnbGknKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgZnVuY3Rpb24gKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmV0ID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGQuZGl2aWRlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXQgKz0gJyBpcy1kaXZpZGVyJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGQuZGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0ICs9ICcgaXMtZGlzYWJsZWQnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWQuYWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldCArPSAnIGlzLWhlYWRlcic7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXQ7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmh0bWwoZnVuY3Rpb24gKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZC5kaXZpZGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnPGhyPic7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZC50aXRsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdObyB0aXRsZSBhdHRyaWJ1dGUgc2V0LiBDaGVjayB0aGUgc3BlbGxpbmcgb2YgeW91ciBvcHRpb25zLicpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHR5cGVvZiBkLnRpdGxlID09PSAnc3RyaW5nJykgPyBkLnRpdGxlIDogZC50aXRsZShkYXRhKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24gKGQsIGkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZC5kaXNhYmxlZCkgcmV0dXJuOyAvLyBkbyBub3RoaW5nIGlmIGRpc2FibGVkXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFkLmFjdGlvbikgcmV0dXJuOyAvLyBoZWFkZXJzIGhhdmUgbm8gXCJhY3Rpb25cIlxyXG4gICAgICAgICAgICAgICAgICAgIGQuYWN0aW9uKGVsbSwgZGF0YSwgaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGQzLnNlbGVjdCgnLmQzLWNvbnRleHQtbWVudScpLnN0eWxlKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYuY2xvc2VDYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNsb3NlQ2FsbGJhY2soKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIHRoZSBvcGVuQ2FsbGJhY2sgYWxsb3dzIGFuIGFjdGlvbiB0byBmaXJlIGJlZm9yZSB0aGUgbWVudSBpcyBkaXNwbGF5ZWRcclxuICAgICAgICAgICAgLy8gYW4gZXhhbXBsZSB1c2FnZSB3b3VsZCBiZSBjbG9zaW5nIGEgdG9vbHRpcFxyXG4gICAgICAgICAgICBpZiAoc2VsZi5vcGVuQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIGlmIChzZWxmLm9wZW5DYWxsYmFjayhkYXRhLCBpbmRleCkgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBkaXNwbGF5IGNvbnRleHQgbWVudVxyXG4gICAgICAgICAgICBkMy5zZWxlY3QoJy5kMy1jb250ZXh0LW1lbnUnKVxyXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdsZWZ0JywgKGQzLmV2ZW50LnBhZ2VYIC0gMikgKyAncHgnKVxyXG4gICAgICAgICAgICAgICAgLnN0eWxlKCd0b3AnLCAoZDMuZXZlbnQucGFnZVkgLSAyKSArICdweCcpXHJcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuXHJcbiAgICAgICAgICAgIGQzLmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGQzLmV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG5cclxuICAgIHN0YXRpYyBoaWRlKCkge1xyXG4gICAgICAgIGQzLnNlbGVjdCgnLmQzLWNvbnRleHQtbWVudScpLnN0eWxlKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHtDb250ZXh0TWVudX0gZnJvbSAnLi9jb250ZXh0LW1lbnUnXHJcbmltcG9ydCB7aTE4bn0gZnJvbSBcIi4uL2kxOG4vaTE4blwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEVkZ2VDb250ZXh0TWVudSBleHRlbmRzIENvbnRleHRNZW51IHtcclxuICAgIHRyZWVEZXNpZ25lcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih0cmVlRGVzaWduZXIpIHtcclxuICAgICAgICB2YXIgbWVudSA9IGZ1bmN0aW9uIChkKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgbWVudSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgbWVudS5wdXNoKHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51LmVkZ2UuaW5qZWN0RGVjaXNpb25Ob2RlJyksXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuaW5qZWN0RGVjaXNpb25Ob2RlKGQpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBtZW51LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUuZWRnZS5pbmplY3RDaGFuY2VOb2RlJyksXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuaW5qZWN0Q2hhbmNlTm9kZShkKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbWVudTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBzdXBlcihtZW51KTtcclxuICAgICAgICB0aGlzLnRyZWVEZXNpZ25lciA9IHRyZWVEZXNpZ25lcjtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQge0NvbnRleHRNZW51fSBmcm9tICcuL2NvbnRleHQtbWVudSdcclxuaW1wb3J0IHtkb21haW4gYXMgbW9kZWx9IGZyb20gJ3NkLW1vZGVsJ1xyXG5pbXBvcnQgKiBhcyBkMyBmcm9tICcuLi9kMydcclxuaW1wb3J0IHtpMThufSBmcm9tIFwiLi4vaTE4bi9pMThuXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTWFpbkNvbnRleHRNZW51IGV4dGVuZHMgQ29udGV4dE1lbnUge1xyXG4gICAgdHJlZURlc2lnbmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHRyZWVEZXNpZ25lcikge1xyXG4gICAgICAgIHZhciBtb3VzZVBvc2l0aW9uID0gbnVsbDtcclxuICAgICAgICB2YXIgbWVudSA9IGZ1bmN0aW9uIChkKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgbWVudSA9IFtdO1xyXG4gICAgICAgICAgICBtZW51LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubWFpbi5hZGREZWNpc2lvbk5vZGUnKSxcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdOb2RlID0gbmV3IG1vZGVsLkRlY2lzaW9uTm9kZShtb3VzZVBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuYWRkTm9kZShuZXdOb2RlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbWVudS5wdXNoKHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm1haW4uYWRkQ2hhbmNlTm9kZScpLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld05vZGUgPSBuZXcgbW9kZWwuQ2hhbmNlTm9kZShtb3VzZVBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuYWRkTm9kZShuZXdOb2RlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbWVudS5wdXNoKHtkaXZpZGVyOiB0cnVlfSk7XHJcbiAgICAgICAgICAgIG1lbnUucHVzaCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5tYWluLmFkZFRleHQnKSxcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdUZXh0ID0gbmV3IG1vZGVsLlRleHQobW91c2VQb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLmFkZFRleHQobmV3VGV4dCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG1lbnUucHVzaCh7ZGl2aWRlcjogdHJ1ZX0pO1xyXG4gICAgICAgICAgICBtZW51LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubWFpbi5wYXN0ZScpLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLnBhc3RlVG9OZXdMb2NhdGlvbihtb3VzZVBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogIXRyZWVEZXNpZ25lci5jb3BpZWROb2RlcyB8fCAhdHJlZURlc2lnbmVyLmNvcGllZE5vZGVzLmxlbmd0aFxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG1lbnUucHVzaCh7ZGl2aWRlcjogdHJ1ZX0pO1xyXG5cclxuICAgICAgICAgICAgbWVudS5wdXNoKHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm1haW4uc2VsZWN0QWxsTm9kZXMnKSxcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5zZWxlY3RBbGxOb2RlcygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIG1lbnU7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgc3VwZXIobWVudSwge29uT3BlbjogKCkgPT4ge1xyXG4gICAgICAgICAgICB0cmVlRGVzaWduZXIuY2xlYXJTZWxlY3Rpb24oKTtcclxuICAgICAgICAgICAgbW91c2VQb3NpdGlvbiA9IG5ldyBtb2RlbC5Qb2ludChkMy5tb3VzZSh0cmVlRGVzaWduZXIuc3ZnLm5vZGUoKSkpLm1vdmUodHJlZURlc2lnbmVyLmdldE1haW5Hcm91cFRyYW5zbGF0aW9uKHRydWUpKTtcclxuXHJcbiAgICAgICAgfX0pO1xyXG4gICAgICAgIHRoaXMudHJlZURlc2lnbmVyID0gdHJlZURlc2lnbmVyO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7Q29udGV4dE1lbnV9IGZyb20gJy4vY29udGV4dC1tZW51J1xyXG5pbXBvcnQge2RvbWFpbiBhcyBtb2RlbH0gZnJvbSAnc2QtbW9kZWwnXHJcbmltcG9ydCB7aTE4bn0gZnJvbSBcIi4uL2kxOG4vaTE4blwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE5vZGVDb250ZXh0TWVudSBleHRlbmRzIENvbnRleHRNZW51IHtcclxuICAgIHRyZWVEZXNpZ25lcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih0cmVlRGVzaWduZXIsIG9wZXJhdGlvbnNGb3JPYmplY3QpIHtcclxuICAgICAgICB2YXIgbWVudSA9IGZ1bmN0aW9uIChkKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgY29weU1lbnVJdGVtID0ge1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubm9kZS5jb3B5JyksXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuc2VsZWN0Tm9kZShkLCAhdHJlZURlc2lnbmVyLmlzTm9kZVNlbGVjdGVkKGQpKTtcclxuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuY29weVNlbGVjdGVkTm9kZXMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdmFyIGN1dE1lbnVJdGVtID0ge1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubm9kZS5jdXQnKSxcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5zZWxlY3ROb2RlKGQsICF0cmVlRGVzaWduZXIuaXNOb2RlU2VsZWN0ZWQoZCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5jdXRTZWxlY3RlZE5vZGVzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHZhciBwYXN0ZU1lbnVJdGVtID0ge1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubm9kZS5wYXN0ZScpLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLnBhc3RlVG9Ob2RlKGQpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiBkLmZvbGRlZCB8fCAhdHJlZURlc2lnbmVyLmNvcGllZE5vZGVzIHx8ICF0cmVlRGVzaWduZXIuY29waWVkTm9kZXMubGVuZ3RoXHJcblxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB2YXIgZGVsZXRlTWVudUl0ZW0gPSB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5ub2RlLmRlbGV0ZScpLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5zZWxlY3ROb2RlKGQsICF0cmVlRGVzaWduZXIuaXNOb2RlU2VsZWN0ZWQoZCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5yZW1vdmVTZWxlY3RlZE5vZGVzKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIG1lbnUgPSBbXTtcclxuICAgICAgICAgICAgaWYgKGQudHlwZSA9PSBtb2RlbC5UZXJtaW5hbE5vZGUuJFRZUEUpIHtcclxuICAgICAgICAgICAgICAgIG1lbnUgPSBbY29weU1lbnVJdGVtLCBjdXRNZW51SXRlbSwgZGVsZXRlTWVudUl0ZW1dO1xyXG4gICAgICAgICAgICAgICAgTm9kZUNvbnRleHRNZW51LmFkZE5vZGVDb252ZXJzaW9uT3B0aW9ucyhkLCBtZW51LCB0cmVlRGVzaWduZXIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1lbnU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKCFkLmZvbGRlZCl7XHJcbiAgICAgICAgICAgICAgICBtZW51LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm5vZGUuYWRkRGVjaXNpb25Ob2RlJyksXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5hZGREZWNpc2lvbk5vZGUoZClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIG1lbnUucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubm9kZS5hZGRDaGFuY2VOb2RlJyksXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5hZGRDaGFuY2VOb2RlKGQpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBtZW51LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm5vZGUuYWRkVGVybWluYWxOb2RlJyksXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5hZGRUZXJtaW5hbE5vZGUoZClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIG1lbnUucHVzaCh7ZGl2aWRlcjogdHJ1ZX0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBtZW51LnB1c2goY29weU1lbnVJdGVtKTtcclxuICAgICAgICAgICAgbWVudS5wdXNoKGN1dE1lbnVJdGVtKTtcclxuICAgICAgICAgICAgbWVudS5wdXNoKHBhc3RlTWVudUl0ZW0pO1xyXG4gICAgICAgICAgICBtZW51LnB1c2goZGVsZXRlTWVudUl0ZW0pO1xyXG5cclxuICAgICAgICAgICAgTm9kZUNvbnRleHRNZW51LmFkZE5vZGVDb252ZXJzaW9uT3B0aW9ucyhkLCBtZW51LCB0cmVlRGVzaWduZXIpO1xyXG4gICAgICAgICAgICBtZW51LnB1c2goe2RpdmlkZXI6IHRydWV9KTtcclxuICAgICAgICAgICAgbWVudS5wdXNoKHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm5vZGUuc2VsZWN0U3VidHJlZScpLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLnNlbGVjdFN1YlRyZWUoZCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYoIWQuZm9sZGVkKXtcclxuICAgICAgICAgICAgICAgIG1lbnUucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubm9kZS5mb2xkJyksXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5mb2xkU3VidHJlZShkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBtZW51LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm5vZGUudW5mb2xkJyksXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5mb2xkU3VidHJlZShkLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKG9wZXJhdGlvbnNGb3JPYmplY3Qpe1xyXG4gICAgICAgICAgICAgICAgdmFyIG9wZXJhdGlvbnMgPSBvcGVyYXRpb25zRm9yT2JqZWN0KGQpO1xyXG4gICAgICAgICAgICAgICAgaWYob3BlcmF0aW9ucy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBtZW51LnB1c2goe2RpdmlkZXI6IHRydWV9KTtcclxuICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25zLmZvckVhY2gob3A9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVudS5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm5vZGUuJytvcC5uYW1lKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5wZXJmb3JtT3BlcmF0aW9uKGQsIG9wKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogIW9wLmNhblBlcmZvcm0oZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG1lbnU7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgc3VwZXIobWVudSk7XHJcbiAgICAgICAgdGhpcy50cmVlRGVzaWduZXIgPSB0cmVlRGVzaWduZXI7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGFkZE5vZGVDb252ZXJzaW9uT3B0aW9ucyhkLCBtZW51LCB0cmVlRGVzaWduZXIpe1xyXG4gICAgICAgIHZhciBjb252ZXJzaW9uT3B0aW9ucyA9IE5vZGVDb250ZXh0TWVudS5nZXROb2RlQ29udmVyc2lvbk9wdGlvbnMoZCwgdHJlZURlc2lnbmVyKTtcclxuICAgICAgICBpZihjb252ZXJzaW9uT3B0aW9ucy5sZW5ndGgpe1xyXG4gICAgICAgICAgICBtZW51LnB1c2goe2RpdmlkZXI6IHRydWV9KTtcclxuICAgICAgICAgICAgY29udmVyc2lvbk9wdGlvbnMuZm9yRWFjaChvPT5tZW51LnB1c2gobykpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldE5vZGVDb252ZXJzaW9uT3B0aW9ucyhkLCB0cmVlRGVzaWduZXIpe1xyXG4gICAgICAgIHZhciBvcHRpb25zID0gW107XHJcblxyXG4gICAgICAgIGlmKGQuZm9sZGVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGFsbEFsbG93ZWRUeXBlcyA9IFttb2RlbC5EZWNpc2lvbk5vZGUuJFRZUEUsIG1vZGVsLkNoYW5jZU5vZGUuJFRZUEUsIG1vZGVsLlRlcm1pbmFsTm9kZS4kVFlQRV07XHJcblxyXG4gICAgICAgIGlmKCFkLmNoaWxkRWRnZXMubGVuZ3RoICYmIGQuJHBhcmVudCl7XHJcbiAgICAgICAgICAgIGFsbEFsbG93ZWRUeXBlcy5maWx0ZXIodD0+dCE9PWQudHlwZSkuZm9yRWFjaCh0eXBlPT57XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLnB1c2goTm9kZUNvbnRleHRNZW51LmdldE5vZGVDb252ZXJzaW9uT3B0aW9uKHR5cGUsIHRyZWVEZXNpZ25lcikpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGlmKGQgaW5zdGFuY2VvZiBtb2RlbC5EZWNpc2lvbk5vZGUpe1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5wdXNoKE5vZGVDb250ZXh0TWVudS5nZXROb2RlQ29udmVyc2lvbk9wdGlvbihtb2RlbC5DaGFuY2VOb2RlLiRUWVBFLCB0cmVlRGVzaWduZXIpKVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaChOb2RlQ29udGV4dE1lbnUuZ2V0Tm9kZUNvbnZlcnNpb25PcHRpb24obW9kZWwuRGVjaXNpb25Ob2RlLiRUWVBFLCB0cmVlRGVzaWduZXIpKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvcHRpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXROb2RlQ29udmVyc2lvbk9wdGlvbih0eXBlVG9Db252ZXJ0VG8sIHRyZWVEZXNpZ25lcil7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubm9kZS5jb252ZXJ0LicrdHlwZVRvQ29udmVydFRvKSxcclxuICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XHJcbiAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuY29udmVydE5vZGUoZCwgdHlwZVRvQ29udmVydFRvKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHtDb250ZXh0TWVudX0gZnJvbSAnLi9jb250ZXh0LW1lbnUnXHJcbmltcG9ydCB7aTE4bn0gZnJvbSBcIi4uL2kxOG4vaTE4blwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRleHRDb250ZXh0TWVudSBleHRlbmRzIENvbnRleHRNZW51IHtcclxuICAgIHRyZWVEZXNpZ25lcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih0cmVlRGVzaWduZXIpIHtcclxuICAgICAgICB2YXIgbWVudSA9IGZ1bmN0aW9uIChkKSB7XHJcblxyXG5cclxuICAgICAgICAgICAgdmFyIGRlbGV0ZU1lbnVJdGVtID0ge1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUudGV4dC5kZWxldGUnKSxcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuc2VsZWN0VGV4dChkLCB0cnVlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIucmVtb3ZlU2VsZWN0ZWRUZXh0cygpXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB2YXIgbWVudSA9IFtdO1xyXG4gICAgICAgICAgICBtZW51LnB1c2goZGVsZXRlTWVudUl0ZW0pO1xyXG4gICAgICAgICAgICByZXR1cm4gbWVudTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBzdXBlcihtZW51KTtcclxuICAgICAgICB0aGlzLnRyZWVEZXNpZ25lciA9IHRyZWVEZXNpZ25lcjtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgKiBhcyBkMyBmcm9tICcuL2QzJ1xyXG5cclxuZXhwb3J0IGNsYXNzIEQzRXh0ZW5zaW9ucyB7XHJcblxyXG4gICAgc3RhdGljIGV4dGVuZCgpIHtcclxuXHJcbiAgICAgICAgZDMuc2VsZWN0aW9uLnByb3RvdHlwZS5lbnRlci5wcm90b3R5cGUuaW5zZXJ0U2VsZWN0b3IgPVxyXG4gICAgICAgICAgICBkMy5zZWxlY3Rpb24ucHJvdG90eXBlLmluc2VydFNlbGVjdG9yID0gZnVuY3Rpb24gKHNlbGVjdG9yLCBiZWZvcmUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBEM0V4dGVuc2lvbnMuaW5zZXJ0U2VsZWN0b3IodGhpcywgc2VsZWN0b3IsIGJlZm9yZSk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICBkMy5zZWxlY3Rpb24ucHJvdG90eXBlLmVudGVyLnByb3RvdHlwZS5hcHBlbmRTZWxlY3RvciA9XHJcbiAgICAgICAgICAgIGQzLnNlbGVjdGlvbi5wcm90b3R5cGUuYXBwZW5kU2VsZWN0b3IgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBEM0V4dGVuc2lvbnMuYXBwZW5kU2VsZWN0b3IodGhpcywgc2VsZWN0b3IpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICBkMy5zZWxlY3Rpb24ucHJvdG90eXBlLmVudGVyLnByb3RvdHlwZS5zZWxlY3RPckFwcGVuZCA9XHJcbiAgICAgICAgICAgIGQzLnNlbGVjdGlvbi5wcm90b3R5cGUuc2VsZWN0T3JBcHBlbmQgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBEM0V4dGVuc2lvbnMuc2VsZWN0T3JBcHBlbmQodGhpcywgc2VsZWN0b3IpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICBkMy5zZWxlY3Rpb24ucHJvdG90eXBlLmVudGVyLnByb3RvdHlwZS5zZWxlY3RPckluc2VydCA9XHJcbiAgICAgICAgICAgIGQzLnNlbGVjdGlvbi5wcm90b3R5cGUuc2VsZWN0T3JJbnNlcnQgPSBmdW5jdGlvbiAoc2VsZWN0b3IsIGJlZm9yZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEQzRXh0ZW5zaW9ucy5zZWxlY3RPckluc2VydCh0aGlzLCBzZWxlY3RvciwgYmVmb3JlKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBpbnNlcnRPckFwcGVuZFNlbGVjdG9yKHBhcmVudCwgc2VsZWN0b3IsIG9wZXJhdGlvbiwgYmVmb3JlKSB7XHJcblxyXG4gICAgICAgIHZhciBzZWxlY3RvclBhcnRzID0gc2VsZWN0b3Iuc3BsaXQoLyhbXFwuXFwjXSkvKTtcclxuICAgICAgICB2YXIgZWxlbWVudCA9IHBhcmVudFtvcGVyYXRpb25dKHNlbGVjdG9yUGFydHMuc2hpZnQoKSwgYmVmb3JlKTsvL1wiOmZpcnN0LWNoaWxkXCJcclxuXHJcbiAgICAgICAgd2hpbGUgKHNlbGVjdG9yUGFydHMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICB2YXIgc2VsZWN0b3JNb2RpZmllciA9IHNlbGVjdG9yUGFydHMuc2hpZnQoKTtcclxuICAgICAgICAgICAgdmFyIHNlbGVjdG9ySXRlbSA9IHNlbGVjdG9yUGFydHMuc2hpZnQoKTtcclxuICAgICAgICAgICAgaWYgKHNlbGVjdG9yTW9kaWZpZXIgPT09IFwiLlwiKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5jbGFzc2VkKHNlbGVjdG9ySXRlbSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2VsZWN0b3JNb2RpZmllciA9PT0gXCIjXCIpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBlbGVtZW50LmF0dHIoJ2lkJywgc2VsZWN0b3JJdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgaW5zZXJ0U2VsZWN0b3IocGFyZW50LCBzZWxlY3RvciwgYmVmb3JlKSB7XHJcbiAgICAgICAgcmV0dXJuIEQzRXh0ZW5zaW9ucy5pbnNlcnRPckFwcGVuZFNlbGVjdG9yKHBhcmVudCwgc2VsZWN0b3IsIFwiaW5zZXJ0XCIsIGJlZm9yZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGFwcGVuZFNlbGVjdG9yKHBhcmVudCwgc2VsZWN0b3IpIHtcclxuICAgICAgICByZXR1cm4gRDNFeHRlbnNpb25zLmluc2VydE9yQXBwZW5kU2VsZWN0b3IocGFyZW50LCBzZWxlY3RvciwgXCJhcHBlbmRcIik7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHNlbGVjdE9yQXBwZW5kKHBhcmVudCwgc2VsZWN0b3IsIGVsZW1lbnQpIHtcclxuICAgICAgICB2YXIgc2VsZWN0aW9uID0gcGFyZW50LnNlbGVjdChzZWxlY3Rvcik7XHJcbiAgICAgICAgaWYgKHNlbGVjdGlvbi5lbXB0eSgpKSB7XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyZW50LmFwcGVuZChlbGVtZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gRDNFeHRlbnNpb25zLmFwcGVuZFNlbGVjdG9yKHBhcmVudCwgc2VsZWN0b3IpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNlbGVjdGlvbjtcclxuICAgIH07XHJcblxyXG4gICAgc3RhdGljIHNlbGVjdE9ySW5zZXJ0KHBhcmVudCwgc2VsZWN0b3IsIGJlZm9yZSkge1xyXG4gICAgICAgIHZhciBzZWxlY3Rpb24gPSBwYXJlbnQuc2VsZWN0KHNlbGVjdG9yKTtcclxuICAgICAgICBpZiAoc2VsZWN0aW9uLmVtcHR5KCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIEQzRXh0ZW5zaW9ucy5pbnNlcnRTZWxlY3RvcihwYXJlbnQsIHNlbGVjdG9yLCBiZWZvcmUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2VsZWN0aW9uO1xyXG4gICAgfTtcclxufVxyXG4iLCJleHBvcnQgKiBmcm9tICdkMy1kaXNwYXRjaCc7XHJcbmV4cG9ydCAqIGZyb20gJ2QzLXNjYWxlJztcclxuZXhwb3J0ICogZnJvbSAnZDMtc2VsZWN0aW9uJztcclxuZXhwb3J0ICogZnJvbSAnZDMtc2hhcGUnXHJcbmV4cG9ydCAqIGZyb20gJ2QzLWRyYWcnO1xyXG5leHBvcnQgKiBmcm9tICdkMy1icnVzaCdcclxuZXhwb3J0ICogZnJvbSAnZDMtYXJyYXknXHJcbmV4cG9ydCAqIGZyb20gJ2QzLWhpZXJhcmNoeSdcclxuZXhwb3J0ICogZnJvbSAnZDMtdGltZS1mb3JtYXQnXHJcbiIsIm1vZHVsZS5leHBvcnRzPXtcclxuICAgIFwiY29udGV4dE1lbnVcIjp7XHJcbiAgICAgICAgXCJtYWluXCI6e1xyXG4gICAgICAgICAgICBcImFkZERlY2lzaW9uTm9kZVwiOiBcIkVudHNjaGVpZHVuZ3Nrbm90ZW4gaGluenVmw7xnZW5cIixcclxuICAgICAgICAgICAgXCJhZGRDaGFuY2VOb2RlXCI6IFwiWnVmYWxsIEtub3RlbiBoaW56dWbDvGdlblwiLFxyXG4gICAgICAgICAgICBcImFkZFRleHRcIjogXCJUZXh0IGhpbnp1ZsO8Z2VuIFwiLFxyXG4gICAgICAgICAgICBcInBhc3RlXCI6IFwiRWluZsO8Z2VuXCIsXHJcbiAgICAgICAgICAgIFwic2VsZWN0QWxsTm9kZXNcIjogXCJBbGxlIEtub3RlbiBhdXN3w6RobGVuXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwibm9kZVwiOntcclxuICAgICAgICAgICAgXCJjb3B5XCI6IFwiS29waWVyZW5cIixcclxuICAgICAgICAgICAgXCJjdXRcIjogXCJBdXNzY2huZWlkZW5cIixcclxuICAgICAgICAgICAgXCJwYXN0ZVwiOiBcIkVpbmbDvGdlblwiLFxyXG4gICAgICAgICAgICBcImRlbGV0ZVwiOiBcIkzDtnNjaGVuXCIsXHJcbiAgICAgICAgICAgIFwiYWRkRGVjaXNpb25Ob2RlXCI6IFwiRW50c2NoZWlkdW5nc2tub3RlbiBoaW56dWbDvGdlblwiLFxyXG4gICAgICAgICAgICBcImFkZENoYW5jZU5vZGVcIjogXCJadWZhbGwgS25vdGVuIGhpbnp1ZsO8Z2VuXCIsXHJcbiAgICAgICAgICAgIFwiYWRkVGVybWluYWxOb2RlXCI6IFwiRW5ka25vdHRlbiBoaW56dWbDvGdlblwiLFxyXG4gICAgICAgICAgICBcImNvbnZlcnRcIjp7XHJcbiAgICAgICAgICAgICAgICBcImRlY2lzaW9uXCI6IFwiQWxzIEVudHNjaGVpZHVuZ3Nrbm90ZW5cIixcclxuICAgICAgICAgICAgICAgIFwiY2hhbmNlXCI6IFwiQWxzIFp1ZmFsbCBLbm90ZW5cIixcclxuICAgICAgICAgICAgICAgIFwidGVybWluYWxcIjogXCJBbHMgRW5ka25vdGVuXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJzZWxlY3RTdWJ0cmVlXCI6IFwiVGVpbGJhdW0gd8OkaGxlblwiLFxyXG4gICAgICAgICAgICBcImZvbGRcIjogXCJUZWlsYmF1bSBmYWx0ZW5cIixcclxuICAgICAgICAgICAgXCJ1bmZvbGRcIjogXCJUZWlsYmF1bSBlbnRmYWx0ZW5cIixcclxuXHJcbiAgICAgICAgICAgIFwiZmxpcFN1YnRyZWVcIjogXCJUZWlsYmF1bSB1bWRyZWhlblwiLFxyXG4gICAgICAgICAgICBcInBheW9mZnNUcmFuc2Zvcm1hdGlvblwiOiBcIkF1c3phaGx1bmdlbiB0cmFuc2Zvcm1pZXJlblwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImVkZ2VcIjp7XHJcbiAgICAgICAgICAgIFwiaW5qZWN0RGVjaXNpb25Ob2RlXCI6IFwiRW50c2NoZWlkdW5nc2tub3RlbiBJbmppemllcmVuXCIsXHJcbiAgICAgICAgICAgIFwiaW5qZWN0Q2hhbmNlTm9kZVwiOiBcIlp1ZmFsbCBLbm90ZW4gSW5qaXppZXJlblwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInRleHRcIjp7XHJcbiAgICAgICAgICAgIFwiZGVsZXRlXCI6IFwiTMO2c2NoZW5cIlxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcInZhbGlkYXRpb25cIjp7XHJcbiAgICAgICAgXCJpbmNvbXBsZXRlUGF0aFwiOiBcIlBmYWQsIGRlciBuaWNodCBtaXQgZGVtIEVuZGtub3RlbiBlbmRldFwiLFxyXG4gICAgICAgIFwicHJvYmFiaWxpdHlEb05vdFN1bVVwVG8xXCI6IFwiRGllIFN1bW1lIGRlciBXYWhyc2NoZWlubGljaGtlaXRlbiBpc3QgbmljaHQgZ2xlaWNoIDFcIixcclxuICAgICAgICBcImludmFsaWRQcm9iYWJpbGl0eVwiOiBcIlVuZ8O8bHRpZ2UgV2FocnNjaGVpbmxpY2hrZWl0IGltIFp3ZWlnICN7e251bWJlcn19XCIsXHJcbiAgICAgICAgXCJpbnZhbGlkUGF5b2ZmXCI6IFwiVW5nw7xsdGlnZSBBdXN6YWhsdW5nIGluIFp3ZWlnICN7e251bWJlcn19XCJcclxuICAgIH0sXHJcbiAgICBcImdyb3dsXCI6e1xyXG4gICAgICAgIFwiYnJ1c2hEaXNhYmxlZFwiOiBcIkF1c3dhaGxiw7xyc3RlIGRlYWt0aXZpZXJ0XCIsXHJcbiAgICAgICAgXCJicnVzaEVuYWJsZWRcIjogXCJBdXN3YWhsYsO8cnN0ZSBha3RpdmllcnRcIlxyXG4gICAgfSxcclxuICAgIFwidG9vbHRpcFwiOntcclxuICAgICAgICBcIm5vZGVcIjp7XHJcbiAgICAgICAgICAgIFwicGF5b2ZmXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIkF1c3phaGx1bmcge3tudW1iZXJ9fVwiLFxyXG4gICAgICAgICAgICAgICAgXCJuYW1lZFwiOiBcInt7bmFtZX19XCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJhZ2dyZWdhdGVkUGF5b2ZmXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIkFnZ3JlZ2llcnRlIEF1c3phaGx1bmcge3tudW1iZXJ9fVwiLFxyXG4gICAgICAgICAgICAgICAgXCJuYW1lZFwiOiBcIkFnZ3JlZ2llcnRlIHt7bmFtZX19XCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwcm9iYWJpbGl0eVRvRW50ZXJcIjogXCJXYWhyc2NoZWlubGljaGtlaXRcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJlZGdlXCI6e1xyXG4gICAgICAgICAgICBcInBheW9mZlwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJBdXN6YWhsdW5nIHt7bnVtYmVyfX06IHt7dmFsdWV9fVwiLFxyXG4gICAgICAgICAgICAgICAgXCJuYW1lZFwiOiBcInt7bmFtZX19OiB7e3ZhbHVlfX1cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInByb2JhYmlsaXR5XCI6IFwiV2FocnNjaGVpbmxpY2hrZWl0OiB7e3ZhbHVlfX1cIlxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJtb2R1bGUuZXhwb3J0cz17XHJcbiAgICBcImNvbnRleHRNZW51XCI6e1xyXG4gICAgICAgIFwibWFpblwiOntcclxuICAgICAgICAgICAgXCJhZGREZWNpc2lvbk5vZGVcIjogXCJBZGQgRGVjaXNpb24gTm9kZVwiLFxyXG4gICAgICAgICAgICBcImFkZENoYW5jZU5vZGVcIjogXCJBZGQgQ2hhbmNlIE5vZGVcIixcclxuICAgICAgICAgICAgXCJhZGRUZXh0XCI6IFwiQWRkIFRleHRcIixcclxuICAgICAgICAgICAgXCJwYXN0ZVwiOiBcIlBhc3RlXCIsXHJcbiAgICAgICAgICAgIFwic2VsZWN0QWxsTm9kZXNcIjogXCJTZWxlY3QgYWxsIG5vZGVzXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwibm9kZVwiOntcclxuICAgICAgICAgICAgXCJjb3B5XCI6IFwiQ29weVwiLFxyXG4gICAgICAgICAgICBcImN1dFwiOiBcIkN1dFwiLFxyXG4gICAgICAgICAgICBcInBhc3RlXCI6IFwiUGFzdGVcIixcclxuICAgICAgICAgICAgXCJkZWxldGVcIjogXCJEZWxldGVcIixcclxuICAgICAgICAgICAgXCJhZGREZWNpc2lvbk5vZGVcIjogXCJBZGQgRGVjaXNpb24gTm9kZVwiLFxyXG4gICAgICAgICAgICBcImFkZENoYW5jZU5vZGVcIjogXCJBZGQgQ2hhbmNlIE5vZGVcIixcclxuICAgICAgICAgICAgXCJhZGRUZXJtaW5hbE5vZGVcIjogXCJBZGQgVGVybWluYWwgTm9kZVwiLFxyXG4gICAgICAgICAgICBcImNvbnZlcnRcIjp7XHJcbiAgICAgICAgICAgICAgICBcImRlY2lzaW9uXCI6IFwiQXMgRGVjaXNpb24gTm9kZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjaGFuY2VcIjogXCJBcyBDaGFuY2UgTm9kZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0ZXJtaW5hbFwiOiBcIkFzIFRlcm1pbmFsIE5vZGVcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInNlbGVjdFN1YnRyZWVcIjogXCJTZWxlY3Qgc3VidHJlZVwiLFxyXG4gICAgICAgICAgICBcImZvbGRcIjogXCJGb2xkIHN1YnRyZWVcIixcclxuICAgICAgICAgICAgXCJ1bmZvbGRcIjogXCJVbmZvbGQgc3VidHJlZVwiLFxyXG4gICAgICAgICAgICBcImZsaXBTdWJ0cmVlXCI6IFwiRmxpcCBzdWJ0cmVlXCIsXHJcbiAgICAgICAgICAgIFwicGF5b2Zmc1RyYW5zZm9ybWF0aW9uXCI6IFwiVHJhbnNmb3JtIHBheW9mZnNcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJlZGdlXCI6e1xyXG4gICAgICAgICAgICBcImluamVjdERlY2lzaW9uTm9kZVwiOiBcIkluamVjdCBEZWNpc2lvbiBOb2RlXCIsXHJcbiAgICAgICAgICAgIFwiaW5qZWN0Q2hhbmNlTm9kZVwiOiBcIkluamVjdCBDaGFuY2UgTm9kZVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInRleHRcIjp7XHJcbiAgICAgICAgICAgIFwiZGVsZXRlXCI6IFwiRGVsZXRlXCJcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJ2YWxpZGF0aW9uXCI6e1xyXG4gICAgICAgIFwiaW5jb21wbGV0ZVBhdGhcIjogXCJQYXRoIG5vdCBlbmRpbmcgd2l0aCB0ZXJtaW5hbCBub2RlXCIsXHJcbiAgICAgICAgXCJwcm9iYWJpbGl0eURvTm90U3VtVXBUbzFcIjogXCJQcm9iYWJpbGl0aWVzIGRvIG5vdCBzdW0gdXAgdG8gMVwiLFxyXG4gICAgICAgIFwiaW52YWxpZFByb2JhYmlsaXR5XCI6IFwiSW52YWxpZCBwcm9iYWJpbGl0eSBpbiBlZGdlICN7e251bWJlcn19XCIsXHJcbiAgICAgICAgXCJpbnZhbGlkUGF5b2ZmXCI6IFwiSW52YWxpZCBwYXlvZmYgaW4gZWRnZSAje3tudW1iZXJ9fVwiXHJcbiAgICB9LFxyXG4gICAgXCJncm93bFwiOntcclxuICAgICAgICBcImJydXNoRGlzYWJsZWRcIjogXCJTZWxlY3Rpb24gYnJ1c2ggZGlzYWJsZWRcIixcclxuICAgICAgICBcImJydXNoRW5hYmxlZFwiOiBcIlNlbGVjdGlvbiBicnVzaCBlbmFibGVkXCJcclxuICAgIH0sXHJcbiAgICBcInRvb2x0aXBcIjp7XHJcbiAgICAgICAgXCJub2RlXCI6e1xyXG4gICAgICAgICAgICBcInBheW9mZlwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJQYXlvZmYge3tudW1iZXJ9fVwiLFxyXG4gICAgICAgICAgICAgICAgXCJuYW1lZFwiOiBcInt7bmFtZX19XCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJhZ2dyZWdhdGVkUGF5b2ZmXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIkFnZ3JlZ2F0ZWQgUGF5b2ZmIHt7bnVtYmVyfX1cIixcclxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJBZ2dyZWdhdGVkIHt7bmFtZX19XCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwcm9iYWJpbGl0eVRvRW50ZXJcIjogXCJQcm9iYWJpbGl0eSB0byBlbnRlclwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImVkZ2VcIjp7XHJcbiAgICAgICAgICAgIFwicGF5b2ZmXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIlBheW9mZiB7e251bWJlcn19OiB7e3ZhbHVlfX1cIixcclxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJ7e25hbWV9fToge3t2YWx1ZX19XCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwcm9iYWJpbGl0eVwiOiBcIlByb2JhYmlsaXR5OiB7e3ZhbHVlfX1cIlxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJtb2R1bGUuZXhwb3J0cz17XHJcbiAgICBcImNvbnRleHRNZW51XCI6e1xyXG4gICAgICAgIFwibWFpblwiOntcclxuICAgICAgICAgICAgXCJhZGREZWNpc2lvbk5vZGVcIjogXCJBam91dGVyIG5vdWQgZGUgZMOpY2lzaW9uXCIsXHJcbiAgICAgICAgICAgIFwiYWRkQ2hhbmNlTm9kZVwiOiBcIkFqb3V0ZXIgbm91ZCBhbMOpYXRvaXJlXCIsXHJcbiAgICAgICAgICAgIFwiYWRkVGV4dFwiOiBcIkFqb3V0ZXIgZHUgdGV4dGVcIixcclxuICAgICAgICAgICAgXCJwYXN0ZVwiOiBcIkNvbGxlclwiLFxyXG4gICAgICAgICAgICBcInNlbGVjdEFsbE5vZGVzXCI6IFwiU8OpbGVjdGlvbm5lciB0b3VzIGxlcyBub3Vkc1wiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIm5vZGVcIjp7XHJcbiAgICAgICAgICAgIFwiY29weVwiOiBcIkNvcGllXCIsXHJcbiAgICAgICAgICAgIFwiY3V0XCI6IFwiQ291cGVyXCIsXHJcbiAgICAgICAgICAgIFwicGFzdGVcIjogXCJDb2xsZXJcIixcclxuICAgICAgICAgICAgXCJkZWxldGVcIjogXCJFZmZhY2VyXCIsXHJcbiAgICAgICAgICAgIFwiYWRkRGVjaXNpb25Ob2RlXCI6IFwiQWpvdXRlciBub3VkIGRlIGTDqWNpc2lvblwiLFxyXG4gICAgICAgICAgICBcImFkZENoYW5jZU5vZGVcIjogXCJBam91dGVyIG5vdWQgYWzDqWF0b2lyZVwiLFxyXG4gICAgICAgICAgICBcImFkZFRlcm1pbmFsTm9kZVwiOiBcIkFqb3V0ZXIgdW4gbm9ldWQgdGVybWluYWxcIixcclxuICAgICAgICAgICAgXCJjb252ZXJ0XCI6e1xyXG4gICAgICAgICAgICAgICAgXCJkZWNpc2lvblwiOiBcIkNvbW1lIG5vdWQgZGUgZMOpY2lzaW9uXCIsXHJcbiAgICAgICAgICAgICAgICBcImNoYW5jZVwiOiBcIkNvbW1lIG5vdWQgYWzDqWF0b2lyZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0ZXJtaW5hbFwiOiBcIkNvbW1lIHVuIG5vZXVkIHRlcm1pbmFsXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJzZWxlY3RTdWJ0cmVlXCI6IFwiU8OpbGVjdGlvbm5lciB1bmUgc291cy1hcmJvcmVzY2VuY2VcIixcclxuICAgICAgICAgICAgXCJmb2xkXCI6IFwiUGxpZXIgc291cy1hcmJyZVwiLFxyXG4gICAgICAgICAgICBcInVuZm9sZFwiOiBcIkTDqXBsaWVyIGFyYnJlIHNvdXMtYXJicmVcIixcclxuICAgICAgICAgICAgXCJmbGlwU3VidHJlZVwiOiBcIkJhc2N1bGVyIHNvdXMtYXJicmVcIixcclxuICAgICAgICAgICAgXCJwYXlvZmZzVHJhbnNmb3JtYXRpb25cIjogXCJUcmFuc2Zvcm1leiBsZXMgZ2FpbnNcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJlZGdlXCI6e1xyXG4gICAgICAgICAgICBcImluamVjdERlY2lzaW9uTm9kZVwiOiBcIkluamVjdGVyIHVuIG5vZXVkIGRlIGTDqWNpc2lvblwiLFxyXG4gICAgICAgICAgICBcImluamVjdENoYW5jZU5vZGVcIjogXCJJbmplY3RlciB1biBub2V1ZCBkZSBjaGFuY2VcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJ0ZXh0XCI6e1xyXG4gICAgICAgICAgICBcImRlbGV0ZVwiOiBcIkVmZmFjZXJcIlxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcInZhbGlkYXRpb25cIjp7XHJcbiAgICAgICAgXCJpbmNvbXBsZXRlUGF0aFwiOiBcIlBhcmNvdXJzIG5vbiB0ZXJtaW7DqSBwYXIgbm9ldWQgdGVybWluYWxcIixcclxuICAgICAgICBcInByb2JhYmlsaXR5RG9Ob3RTdW1VcFRvMVwiOiBcIkxhIHNvbW1lIGRlcyBwcm9iYWJpbGl0w6lzIG4nZXN0IHBhcyAxIG91IHBsdXNcIixcclxuICAgICAgICBcImludmFsaWRQcm9iYWJpbGl0eVwiOiBcIlByb2JhYmlsaXTDqSBpbnZhbGlkZSAtIGxlIGJvcmQgI3t7bnVtYmVyfX1cIixcclxuICAgICAgICBcImludmFsaWRQYXlvZmZcIjogXCJBdmFudGFnZSBpbnZhbGlkZSAtIGxlIGJvcmQgI3t7bnVtYmVyfX1cIlxyXG4gICAgfSxcclxuICAgIFwiZ3Jvd2xcIjp7XHJcbiAgICAgICAgXCJicnVzaERpc2FibGVkXCI6IFwiQnJvc3NlIGRlIHPDqWxlY3Rpb24gZMOpc2FjdGl2w6llXCIsXHJcbiAgICAgICAgXCJicnVzaEVuYWJsZWRcIjogXCJCcm9zc2UgZGUgc8OpbGVjdGlvbiBhY3RpdsOpZVwiXHJcbiAgICB9LFxyXG4gICAgXCJ0b29sdGlwXCI6e1xyXG4gICAgICAgIFwibm9kZVwiOntcclxuICAgICAgICAgICAgXCJwYXlvZmZcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiQXZhbnRhZ2Uge3tudW1iZXJ9fVwiLFxyXG4gICAgICAgICAgICAgICAgXCJuYW1lZFwiOiBcInt7bmFtZX19XCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJhZ2dyZWdhdGVkUGF5b2ZmXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIkF2YW50YWdlIGFncsOpZ8OpIHt7bnVtYmVyfX1cIixcclxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJBZ3LDqWfDqSAge3tuYW1lfX1cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInByb2JhYmlsaXR5VG9FbnRlclwiOiBcIlByb2JhYmlsaXTDqSBkJ2VudHLDqWVcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJlZGdlXCI6e1xyXG4gICAgICAgICAgICBcInBheW9mZlwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJBdmFudGFnZSB7e251bWJlcn19OiB7e3ZhbHVlfX1cIixcclxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJ7e25hbWV9fToge3t2YWx1ZX19XCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwcm9iYWJpbGl0eVwiOiBcIlByb2JhYmlsaXTDqToge3t2YWx1ZX19XCJcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IGkxOG5leHQgZnJvbSAnaTE4bmV4dCc7XHJcbmltcG9ydCAqIGFzIGVuIGZyb20gJy4vZW4uanNvbidcclxuaW1wb3J0ICogYXMgcGwgZnJvbSAnLi9wbC5qc29uJ1xyXG5pbXBvcnQgKiBhcyBpdCBmcm9tICcuL2l0Lmpzb24nXHJcbmltcG9ydCAqIGFzIGRlIGZyb20gJy4vZGUuanNvbidcclxuaW1wb3J0ICogYXMgZnIgZnJvbSAnLi9mci5qc29uJ1xyXG5cclxuZXhwb3J0IGNsYXNzIGkxOG57XHJcblxyXG4gICAgc3RhdGljICRpbnN0YW5jZTtcclxuICAgIHN0YXRpYyBsYW5ndWFnZTtcclxuXHJcbiAgICBzdGF0aWMgaW5pdChsbmcpe1xyXG4gICAgICAgIGkxOG4ubGFuZ3VhZ2UgPSBsbmc7XHJcbiAgICAgICAgbGV0IHJlc291cmNlcyA9IHtcclxuICAgICAgICAgICAgZW46IHtcclxuICAgICAgICAgICAgICAgIHRyYW5zbGF0aW9uOiBlblxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBwbDoge1xyXG4gICAgICAgICAgICAgICAgdHJhbnNsYXRpb246IHBsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGl0OiB7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGlvbjogaXRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGU6IHtcclxuICAgICAgICAgICAgICAgIHRyYW5zbGF0aW9uOiBkZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmcjoge1xyXG4gICAgICAgICAgICAgICAgdHJhbnNsYXRpb246IGZyXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIGkxOG4uJGluc3RhbmNlID0gaTE4bmV4dC5jcmVhdGVJbnN0YW5jZSh7XHJcbiAgICAgICAgICAgIGxuZzogbG5nLFxyXG4gICAgICAgICAgICBmYWxsYmFja0xuZzogJ2VuJyxcclxuICAgICAgICAgICAgcmVzb3VyY2VzOiByZXNvdXJjZXNcclxuICAgICAgICB9LCAoZXJyLCB0KSA9PiB7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHQoa2V5LCBvcHQpe1xyXG4gICAgICAgIHJldHVybiBpMThuLiRpbnN0YW5jZS50KGtleSwgb3B0KVxyXG4gICAgfVxyXG59XHJcbiIsIm1vZHVsZS5leHBvcnRzPXtcclxuICAgIFwiY29udGV4dE1lbnVcIjp7XHJcbiAgICAgICAgXCJtYWluXCI6e1xyXG4gICAgICAgICAgICBcImFkZERlY2lzaW9uTm9kZVwiOiBcIkFnZ2l1bmdpIHVuIG5vZG8gZGkgZGVjaXNpb25lXCIsXHJcbiAgICAgICAgICAgIFwiYWRkQ2hhbmNlTm9kZVwiOiBcIkFnZ2l1bmdpIHVuIG5vZG8gb3Bwb3J0dW5pdMOgXCIsXHJcbiAgICAgICAgICAgIFwiYWRkVGV4dFwiOiBcIkFnZ2l1bmdpIHRlc3RvXCIsXHJcbiAgICAgICAgICAgIFwicGFzdGVcIjogXCJJbmNvbGxhXCIsXHJcbiAgICAgICAgICAgIFwic2VsZWN0QWxsTm9kZXNcIjogXCJTZWxlemlvbmEgdHV0dGkgaSBub2RpXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwibm9kZVwiOntcclxuICAgICAgICAgICAgXCJjb3B5XCI6IFwiQ29waWFcIixcclxuICAgICAgICAgICAgXCJjdXRcIjogXCJUYWdsaWFcIixcclxuICAgICAgICAgICAgXCJwYXN0ZVwiOiBcIkluY29sbGFcIixcclxuICAgICAgICAgICAgXCJkZWxldGVcIjogXCJDYW5jZWxsYVwiLFxyXG4gICAgICAgICAgICBcImFkZERlY2lzaW9uTm9kZVwiOiBcIkFnZ2l1bmdpIHVuIG5vZG8gZGkgZGVjaXNpb25lXCIsXHJcbiAgICAgICAgICAgIFwiYWRkQ2hhbmNlTm9kZVwiOiBcIkFnZ2l1bmdpIHVuIG5vZG8gb3Bwb3J0dW5pdMOgXCIsXHJcbiAgICAgICAgICAgIFwiYWRkVGVybWluYWxOb2RlXCI6IFwiQWdnaXVuZ2kgdW4gbm9kbyB0ZXJtaW5hbGVcIixcclxuICAgICAgICAgICAgXCJjb252ZXJ0XCI6e1xyXG4gICAgICAgICAgICAgICAgXCJkZWNpc2lvblwiOiBcIkNvbWUgRGVjaXNpb24gTm9kZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjaGFuY2VcIjogXCJDb21lIENoYW5jZSBOb2RlXCIsXHJcbiAgICAgICAgICAgICAgICBcInRlcm1pbmFsXCI6IFwiQ29tZSBUZXJtaW5hbCBOb2RlXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJzZWxlY3RTdWJ0cmVlXCI6IFwiU2VsZXppb25hIFNvdHRvLWFsYmVyb1wiLFxyXG4gICAgICAgICAgICBcImZvbGRcIjogXCJQaWVnYSBzb3R0by1hbGJlcm9cIixcclxuICAgICAgICAgICAgXCJ1bmZvbGRcIjogXCJEaXNwaWVnYXJzaSBzb3R0by1hbGJlcm9cIixcclxuICAgICAgICAgICAgXCJmbGlwU3VidHJlZVwiOiBcIlJpYmFsdGEgc290dG8tYWxiZXJvXCIsXHJcbiAgICAgICAgICAgIFwicGF5b2Zmc1RyYW5zZm9ybWF0aW9uXCI6IFwiVHJhc2Zvcm1hIGkgcHJvZml0dGlcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJlZGdlXCI6e1xyXG4gICAgICAgICAgICBcImluamVjdERlY2lzaW9uTm9kZVwiOiBcIkluaWV0dGEgbm9kbyBkaSBkZWNpc2lvbmVcIixcclxuICAgICAgICAgICAgXCJpbmplY3RDaGFuY2VOb2RlXCI6IFwiSW5pZXR0YSBub2RvIG9wcG9ydHVuaXTDoFwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInRleHRcIjp7XHJcbiAgICAgICAgICAgIFwiZGVsZXRlXCI6IFwiQ2FuY2VsbGFcIlxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcInZhbGlkYXRpb25cIjp7XHJcbiAgICAgICAgXCJpbmNvbXBsZXRlUGF0aFwiOiBcIlBlcmNvcnNvIHNlbnphIG5vZG8gdGVybWluYWxlXCIsXHJcbiAgICAgICAgXCJwcm9iYWJpbGl0eURvTm90U3VtVXBUbzFcIjogXCJMYSBzb21tYSBkZWxsZSBwcm9iYWJpbGl0w6Agw6ggZGl2ZXJzYSBkYSAxXCIsXHJcbiAgICAgICAgXCJpbnZhbGlkUHJvYmFiaWxpdHlcIjogXCJQcm9iYWJpbGl0w6Agbm9uIHZhbGlkYSAtIGJvcmRvICN7e251bWJlcn19XCIsXHJcbiAgICAgICAgXCJpbnZhbGlkUGF5b2ZmXCI6IFwiU2FsZG8gbm9uIHZhbGlkbyAtIGJvcmRvICN7e251bWJlcn19XCJcclxuICAgIH0sXHJcbiAgICBcImdyb3dsXCI6e1xyXG4gICAgICAgIFwiYnJ1c2hEaXNhYmxlZFwiOiBcIlNlbGV6aW9uZSBwZW5uZWxsbyBkaXNhYmlsaXRhdGFcIixcclxuICAgICAgICBcImJydXNoRW5hYmxlZFwiOiBcIlNlbGV6aW9uZSBwZW5uZWxsbyBhYmlsaXRhdGFcIlxyXG4gICAgfSxcclxuICAgIFwidG9vbHRpcFwiOntcclxuICAgICAgICBcIm5vZGVcIjp7XHJcbiAgICAgICAgICAgIFwicGF5b2ZmXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIlNhbGRvIHt7bnVtYmVyfX1cIixcclxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJ7e25hbWV9fVwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiYWdncmVnYXRlZFBheW9mZlwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJTYWxkbyBhZ2dyZWdhdG8ge3tudW1iZXJ9fVwiLFxyXG4gICAgICAgICAgICAgICAgXCJuYW1lZFwiOiBcIkFnZ3JlZ2F0byB7e25hbWV9fVwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicHJvYmFiaWxpdHlUb0VudGVyXCI6IFwiUHJvYmFiaWxpdMOgIGRhIGluc2VyaXJlXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiZWRnZVwiOntcclxuICAgICAgICAgICAgXCJwYXlvZmZcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiU2FsZG8ge3tudW1iZXJ9fToge3t2YWx1ZX19XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwie3tuYW1lfX06IHt7dmFsdWV9fVwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicHJvYmFiaWxpdHlcIjogXCJQcm9iYWJpbGl0w6A6IHt7dmFsdWV9fVwiXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsIm1vZHVsZS5leHBvcnRzPXtcclxuXHJcbiAgICBcImNvbnRleHRNZW51XCI6e1xyXG4gICAgICAgIFwibWFpblwiOntcclxuICAgICAgICAgICAgXCJhZGREZWNpc2lvbk5vZGVcIjogXCJEb2RhaiBXxJl6ZcWCIERlY3l6eWpueVwiLFxyXG4gICAgICAgICAgICBcImFkZENoYW5jZU5vZGVcIjogXCJEb2RhaiBXxJl6ZcWCIExvc293eVwiLFxyXG4gICAgICAgICAgICBcImFkZFRleHRcIjogXCJEb2RhaiBUZWtzdFwiLFxyXG4gICAgICAgICAgICBcInBhc3RlXCI6IFwiV2tsZWpcIixcclxuICAgICAgICAgICAgXCJzZWxlY3RBbGxOb2Rlc1wiOiBcIlphem5hY3ogd3N6eXN0a2llIHfEmXrFgnlcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJub2RlXCI6e1xyXG4gICAgICAgICAgICBcImNvcHlcIjogXCJLb3BpdWpcIixcclxuICAgICAgICAgICAgXCJjdXRcIjogXCJXeXRuaWpcIixcclxuICAgICAgICAgICAgXCJwYXN0ZVwiOiBcIldrbGVqXCIsXHJcbiAgICAgICAgICAgIFwiZGVsZXRlXCI6IFwiVXN1xYRcIixcclxuICAgICAgICAgICAgXCJhZGREZWNpc2lvbk5vZGVcIjogXCJEb2RhaiBXxJl6ZcWCIERlY3l6eWpueVwiLFxyXG4gICAgICAgICAgICBcImFkZENoYW5jZU5vZGVcIjogXCJEb2RhaiBXxJl6ZcWCIExvc293eVwiLFxyXG4gICAgICAgICAgICBcImFkZFRlcm1pbmFsTm9kZVwiOiBcIkRvZGFqIFfEmXplxYIgS2/FhGNvd3lcIixcclxuICAgICAgICAgICAgXCJjb252ZXJ0XCI6e1xyXG4gICAgICAgICAgICAgICAgXCJkZWNpc2lvblwiOiBcIkpha28gV8SZemXFgiBEZWN5enlqbnlcIixcclxuICAgICAgICAgICAgICAgIFwiY2hhbmNlXCI6IFwiSmFrbyBXxJl6ZcWCIExvc293eVwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0ZXJtaW5hbFwiOiBcIkpha28gV8SZemXFgiBLb8WEY293eVwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwic2VsZWN0U3VidHJlZVwiOiBcIlphem5hY3ogcG9kZHJ6ZXdvXCIsXHJcbiAgICAgICAgICAgIFwiZm9sZFwiOiBcIlp3acWEIHBvZGRyemV3b1wiLFxyXG4gICAgICAgICAgICBcInVuZm9sZFwiOiBcIlJvendpxYQgcG9kZHJ6ZXdvXCIsXHJcbiAgICAgICAgICAgIFwiZmxpcFN1YnRyZWVcIjogXCJQcnpld3LDs8SHIHBvZGRyemV3b1wiLFxyXG4gICAgICAgICAgICBcInBheW9mZnNUcmFuc2Zvcm1hdGlvblwiOiBcIlByemVrc3p0YcWCxIcgd3lwxYJhdHlcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJlZGdlXCI6e1xyXG4gICAgICAgICAgICBcImluamVjdERlY2lzaW9uTm9kZVwiOiBcIldzdHJ6eWtuaWogV8SZemXFgiBEZWN5enlqbnlcIixcclxuICAgICAgICAgICAgXCJpbmplY3RDaGFuY2VOb2RlXCI6IFwiV3N0cnp5a25paiBXxJl6ZcWCIExvc293eVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInRleHRcIjp7XHJcbiAgICAgICAgICAgIFwiZGVsZXRlXCI6IFwiVXN1xYRcIlxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgXCJ2YWxpZGF0aW9uXCI6e1xyXG4gICAgICAgIFwiaW5jb21wbGV0ZVBhdGhcIjogXCJPc3RhdG5pbSB3xJl6xYJlbSB3IMWbY2llxbxjZSBwb3dpbmllbiBiecSHIFfEmXplxYIgS2/FhGNvd3lcIixcclxuICAgICAgICBcInByb2JhYmlsaXR5RG9Ob3RTdW1VcFRvMVwiOiBcIlByYXdkb3BvZG9iaWXFhHN0d2EgbmllIHN1bXVqxIUgc2llIGRvIDFcIixcclxuICAgICAgICBcImludmFsaWRQcm9iYWJpbGl0eVwiOiBcIk5pZXBvcHJhd25lIHByYXdkb3BvZG9iaWXFhHN0d28gbmEga3Jhd8SZZHppICN7e251bWJlcn19XCIsXHJcbiAgICAgICAgXCJpbnZhbGlkUGF5b2ZmXCI6IFwiTmllcG9wcmF3bmEgd3lwxYJhdGEgbmEga3Jhd8SZZHppICN7e251bWJlcn19XCJcclxuICAgIH0sXHJcbiAgICBcImdyb3dsXCI6e1xyXG4gICAgICAgIFwiYnJ1c2hEaXNhYmxlZFwiOiBcIlphem5hY3phbmllIHd5xYLEhWN6b25lXCIsXHJcbiAgICAgICAgXCJicnVzaEVuYWJsZWRcIjogXCJaYXpuYWN6YW5pZSB3xYLEhWN6b25lXCJcclxuICAgIH0sXHJcbiAgICBcInRvb2x0aXBcIjp7XHJcbiAgICAgICAgXCJub2RlXCI6e1xyXG4gICAgICAgICAgICBcInBheW9mZlwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJXeXDFgmF0YSB7e251bWJlcn19XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwie3tuYW1lfX1cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImFnZ3JlZ2F0ZWRQYXlvZmZcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiWmFncmVnb3dhbmEgd3lwxYJhdGEge3tudW1iZXJ9fVwiLFxyXG4gICAgICAgICAgICAgICAgXCJuYW1lZFwiOiBcIlphZ3JlZ293YW5hIHt7bmFtZX19XCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwcm9iYWJpbGl0eVRvRW50ZXJcIjogXCJQcmF3ZG9wb2RvYmllxYRzdHdvIHdlasWbY2lhXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiZWRnZVwiOntcclxuICAgICAgICAgICAgXCJwYXlvZmZcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiV3lwxYJhdGEge3tudW1iZXJ9fToge3t2YWx1ZX19XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwie3tuYW1lfX06IHt7dmFsdWV9fVwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicHJvYmFiaWxpdHlcIjogXCJQcmF3ZG9wb2RvYmllxYRzdHdvOiB7e3ZhbHVlfX1cIlxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQge0QzRXh0ZW5zaW9uc30gZnJvbSAnLi9kMy1leHRlbnNpb25zJ1xyXG5EM0V4dGVuc2lvbnMuZXh0ZW5kKCk7XHJcblxyXG5leHBvcnQgKiBmcm9tICcuL3RyZWUtZGVzaWduZXInXHJcbmV4cG9ydCAqIGZyb20gJy4vYXBwLXV0aWxzJ1xyXG5leHBvcnQgKiBmcm9tICcuL3RlbXBsYXRlcydcclxuZXhwb3J0ICogZnJvbSAnLi90b29sdGlwJ1xyXG5leHBvcnQgKiBmcm9tICcuL2QzLWV4dGVuc2lvbnMnXHJcbmV4cG9ydCB7ZGVmYXVsdCBhcyBkM30gZnJvbSAnLi9kMydcclxuXHJcblxyXG4iLCJpbXBvcnQge1V0aWxzfSBmcm9tICdzZC11dGlscydcclxuaW1wb3J0IHtkb21haW4gYXMgbW9kZWx9IGZyb20gJ3NkLW1vZGVsJ1xyXG5pbXBvcnQgKiBhcyBkMyBmcm9tICcuL2QzJ1xyXG5pbXBvcnQgY2lyY2xlU3ltYm9sIGZyb20gJy4vc3ltYm9scy9jaXJjbGUnXHJcbmltcG9ydCB0cmlhbmdsZVN5bWJvbCBmcm9tICcuL3N5bWJvbHMvdHJpYW5nbGUnXHJcbmltcG9ydCB7QXBwVXRpbHN9IGZyb20gXCIuL2FwcC11dGlsc1wiO1xyXG5cclxuLypUcmVlIGxheW91dCBtYW5hZ2VyKi9cclxuZXhwb3J0IGNsYXNzIExheW91dHtcclxuXHJcbiAgICB0cmVlRGVzaWduZXI7XHJcbiAgICBkYXRhO1xyXG4gICAgY29uZmlnO1xyXG5cclxuICAgIG5vZGVUeXBlVG9TeW1ib2wgPSB7XHJcbiAgICAgICAgJ2RlY2lzaW9uJzogZDMuc3ltYm9sU3F1YXJlLFxyXG4gICAgICAgICdjaGFuY2UnOiBjaXJjbGVTeW1ib2wsXHJcbiAgICAgICAgXCJ0ZXJtaW5hbFwiOiB0cmlhbmdsZVN5bWJvbFxyXG4gICAgfTtcclxuXHJcbiAgICBzdGF0aWMgTUFOVUFMX0xBWU9VVF9OQU1FID0gJ21hbnVhbCc7XHJcblxyXG5cclxuICAgIG9uQXV0b0xheW91dENoYW5nZWQ9W107XHJcblxyXG4gICAgbm9kZVR5cGVPcmRlciA9IHtcclxuICAgICAgICAnZGVjaXNpb24nIDogMCxcclxuICAgICAgICAnY2hhbmNlJzogMCxcclxuICAgICAgICAndGVybWluYWwnOiAxXHJcbiAgICB9O1xyXG5cclxuICAgIHRyZWVNYXJnaW4gPSA1MDtcclxuICAgIHRhcmdldFN5bWJvbFNpemU9e307XHJcbiAgICBub2RlU2VwYXJhdGlvbiA9IChhLCBiKSA9PiBhLnBhcmVudCA9PT0gYi5wYXJlbnQgPyAxIDogMS4yXHJcblxyXG4gICAgY29uc3RydWN0b3IodHJlZURlc2lnbmVyLCBkYXRhLCBjb25maWcpe1xyXG4gICAgICAgIHRoaXMudHJlZURlc2lnbmVyID0gdHJlZURlc2lnbmVyO1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShub2RlKXtcclxuICAgICAgICBpZihub2RlICYmIG5vZGUuJHBhcmVudCl7XHJcbiAgICAgICAgICAgIG5vZGUuJHBhcmVudC5jaGlsZEVkZ2VzLnNvcnQoKGEsYik9PmEuY2hpbGROb2RlLmxvY2F0aW9uLnkgLSBiLmNoaWxkTm9kZS5sb2NhdGlvbi55KVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZighdGhpcy5pc01hbnVhbExheW91dCgpKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXV0b0xheW91dCh0aGlzLmNvbmZpZy50eXBlLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYobm9kZSl7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZU5vZGVUb0VtcHR5UGxhY2Uobm9kZSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMudHJlZURlc2lnbmVyLnJlZHJhdyh0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaXNNYW51YWxMYXlvdXQoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcudHlwZSA9PT0gTGF5b3V0Lk1BTlVBTF9MQVlPVVRfTkFNRTtcclxuICAgIH1cclxuXHJcbiAgICBnZXROZXdDaGlsZExvY2F0aW9uKHBhcmVudCl7XHJcbiAgICAgICAgaWYoIXBhcmVudCl7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgbW9kZWwuUG9pbnQodGhpcy5nZXROb2RlTWluWCgpLCB0aGlzLmdldE5vZGVNaW5ZKCkpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciB4ID0gcGFyZW50LmxvY2F0aW9uLnggKyB0aGlzLmNvbmZpZy5ncmlkV2lkdGg7XHJcbiAgICAgICAgdmFyIHkgPSBwYXJlbnQubG9jYXRpb24ueTtcclxuICAgICAgICBpZihwYXJlbnQuY2hpbGRFZGdlcy5sZW5ndGgpe1xyXG4gICAgICAgICAgICB5ID0gcGFyZW50LmNoaWxkRWRnZXNbcGFyZW50LmNoaWxkRWRnZXMubGVuZ3RoLTFdLmNoaWxkTm9kZS5sb2NhdGlvbi55KzE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbmV3IG1vZGVsLlBvaW50KHgsIHkpXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SW5qZWN0ZWROb2RlTG9jYXRpb24oZWRnZSl7XHJcblxyXG4gICAgICAgIHZhciBwID0gZWRnZS4kbGluZVBvaW50c1syXTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBtb2RlbC5Qb2ludChwWzBdLCBwWzFdKVxyXG4gICAgfVxyXG5cclxuICAgIG1vdmVOb2RlVG9FbXB0eVBsYWNlKG5vZGUsIHJlZHJhd0lmQ2hhbmdlZD10cnVlKXtcclxuICAgICAgICB2YXIgcG9zaXRpb25NYXAgPSB7fTtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbm9kZS5sb2NhdGlvbi54ID0gTWF0aC5tYXgodGhpcy5nZXROb2RlTWluWChub2RlKSwgbm9kZS5sb2NhdGlvbi54KTtcclxuICAgICAgICBub2RlLmxvY2F0aW9uLnkgPSBNYXRoLm1heCh0aGlzLmdldE5vZGVNaW5ZKG5vZGUpLCBub2RlLmxvY2F0aW9uLnkpO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5ub2Rlc1NvcnRlZEJ5WCA9IHRoaXMuZGF0YS5ub2Rlcy5zbGljZSgpO1xyXG4gICAgICAgIHRoaXMubm9kZXNTb3J0ZWRCeVguc29ydCgoYSxiKT0+YS5sb2NhdGlvbi54IC0gYi5sb2NhdGlvbi54KTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZmluZENvbGxpZGluZ05vZGUobm9kZSwgbG9jYXRpb24pe1xyXG4gICAgICAgICAgICByZXR1cm4gVXRpbHMuZmluZChzZWxmLm5vZGVzU29ydGVkQnlYLCBuPT57XHJcbiAgICAgICAgICAgICAgICBpZihub2RlID09IG4pe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgbWFyZ2luID0gc2VsZi5jb25maWcubm9kZVNpemUvMztcclxuICAgICAgICAgICAgICAgIHZhciB4ID0gbi5sb2NhdGlvbi54O1xyXG4gICAgICAgICAgICAgICAgdmFyIHkgPSBuLmxvY2F0aW9uLnk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChsb2NhdGlvbi54IC0gbWFyZ2luIDw9IHggJiYgbG9jYXRpb24ueCArIG1hcmdpbiA+PSB4XHJcbiAgICAgICAgICAgICAgICAgICAgJiYgbG9jYXRpb24ueSAtIG1hcmdpbiA8PSB5ICYmIGxvY2F0aW9uLnkgKyBtYXJnaW4gPj0geSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgc3RlcFggPSB0aGlzLmNvbmZpZy5ub2RlU2l6ZS8yO1xyXG4gICAgICAgIHZhciBzdGVwWSA9IHRoaXMuY29uZmlnLm5vZGVTaXplKzEwO1xyXG4gICAgICAgIHZhciBzdGVwWHNhbWVQYXJlbnQgPSAwO1xyXG4gICAgICAgIHZhciBzdGVwWXNhbWVQYXJlbnQgPSA3NTtcclxuICAgICAgICB2YXIgY2hhbmdlZCA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBjb2xpZGluZ05vZGU7XHJcbiAgICAgICAgdmFyIG5ld0xvY2F0aW9uID0gbmV3IG1vZGVsLlBvaW50KG5vZGUubG9jYXRpb24pO1xyXG4gICAgICAgIHdoaWxlKGNvbGlkaW5nTm9kZSA9IGZpbmRDb2xsaWRpbmdOb2RlKG5vZGUsIG5ld0xvY2F0aW9uKSl7XHJcbiAgICAgICAgICAgIGNoYW5nZWQ9dHJ1ZTtcclxuICAgICAgICAgICAgdmFyIHNhbWVQYXJlbnQgPSBub2RlLiRwYXJlbnQgJiYgY29saWRpbmdOb2RlLiRwYXJlbnQgJiYgbm9kZS4kcGFyZW50PT09Y29saWRpbmdOb2RlLiRwYXJlbnQ7XHJcbiAgICAgICAgICAgIGlmKHNhbWVQYXJlbnQpe1xyXG4gICAgICAgICAgICAgICAgbmV3TG9jYXRpb24ubW92ZShzdGVwWHNhbWVQYXJlbnQsIHN0ZXBZc2FtZVBhcmVudCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgbmV3TG9jYXRpb24ubW92ZShzdGVwWCwgc3RlcFkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGNoYW5nZWQpe1xyXG4gICAgICAgICAgICBub2RlLm1vdmVUbyhuZXdMb2NhdGlvbi54LG5ld0xvY2F0aW9uLnksIHRydWUpO1xyXG4gICAgICAgICAgICBpZihyZWRyYXdJZkNoYW5nZWQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy50cmVlRGVzaWduZXIucmVkcmF3KHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRpc2FibGVBdXRvTGF5b3V0KCl7XHJcbiAgICAgICAgdGhpcy5jb25maWcudHlwZSA9IExheW91dC5NQU5VQUxfTEFZT1VUX05BTUU7XHJcbiAgICAgICAgdGhpcy5fZmlyZU9uQXV0b0xheW91dENoYW5nZWRDYWxsYmFja3MoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgbm9kZVN5bWJvbFNpemUgPSB7fTtcclxuICAgIGRyYXdOb2RlU3ltYm9sKHBhdGgsIHRyYW5zaXRpb24pe1xyXG5cclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdmFyIG5vZGVTaXplID0gdGhpcy5jb25maWcubm9kZVNpemU7XHJcbiAgICAgICAgdGhpcy5ub2RlU3ltYm9sID0gZDMuc3ltYm9sKCkudHlwZShkPT4gc2VsZi5ub2RlVHlwZVRvU3ltYm9sW2QudHlwZV0pXHJcbiAgICAgICAgICAgIC5zaXplKGQ9PnNlbGYubm9kZVN5bWJvbFNpemVbZC5pZF0gPyBVdGlscy5nZXQoc2VsZi50YXJnZXRTeW1ib2xTaXplLCBkLnR5cGUrXCJbJ1wiK3NlbGYuY29uZmlnLm5vZGVTaXplK1wiJ11cIiwgNjQpIDogNjQpO1xyXG5cclxuICAgICAgICBwYXRoXHJcbiAgICAgICAgICAgIC5lYWNoKGZ1bmN0aW9uIChkKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGF0aCA9IGQzLnNlbGVjdCh0aGlzKTtcclxuICAgICAgICAgICAgICAgIHZhciBwcmV2ID0gcGF0aC5hdHRyKFwiZFwiKTtcclxuICAgICAgICAgICAgICAgIGlmKCFwcmV2KXtcclxuICAgICAgICAgICAgICAgICAgICBwYXRoLmF0dHIoXCJkXCIsIHNlbGYubm9kZVN5bWJvbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgc2l6ZSA9IFV0aWxzLmdldChzZWxmLnRhcmdldFN5bWJvbFNpemUsIGQudHlwZStcIlsnXCIrc2VsZi5jb25maWcubm9kZVNpemUrXCInXVwiKTtcclxuICAgICAgICAgICAgICAgIGlmKCFzaXplKXtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYm94ID0gcGF0aC5ub2RlKCkuZ2V0QkJveCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IE1hdGgubWluKG5vZGVTaXplIC8gYm94LndpZHRoLCBub2RlU2l6ZSAvIGJveC5oZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNpemUgPSBlcnJvciAqIGVycm9yICogKHNlbGYubm9kZVN5bWJvbFNpemVbZC5pZF18fDY0KTtcclxuICAgICAgICAgICAgICAgICAgICBVdGlscy5zZXQoc2VsZi50YXJnZXRTeW1ib2xTaXplLCBkLnR5cGUrXCJbJ1wiK3NlbGYuY29uZmlnLm5vZGVTaXplK1wiJ11cIiwgc2l6ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZih0cmFuc2l0aW9uKXtcclxuICAgICAgICAgICAgICAgICAgICBwYXRoID0gIHBhdGgudHJhbnNpdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYubm9kZVN5bWJvbFNpemVbZC5pZF0gPSBzaXplO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcGF0aC5hdHRyKFwiZFwiLCBzZWxmLm5vZGVTeW1ib2wpO1xyXG4gICAgICAgICAgICAgICAgaWYodHJhbnNpdGlvbil7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5ub2RlU3ltYm9sU2l6ZVtkLmlkXSA9IHNpemU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG5vZGVMYWJlbFBvc2l0aW9uKHNlbGVjdGlvbikge1xyXG4gICAgICAgIHJldHVybiBzZWxlY3Rpb25cclxuICAgICAgICAgICAgLmF0dHIoJ3gnLCAwKVxyXG4gICAgICAgICAgICAuYXR0cigneScsIC10aGlzLmNvbmZpZy5ub2RlU2l6ZSAvIDIgLSA3KVxyXG4gICAgfVxyXG5cclxuICAgIG5vZGVQYXlvZmZQb3NpdGlvbihzZWxlY3Rpb24pIHtcclxuICAgICAgICByZXR1cm4gTGF5b3V0LnNldEhhbmdpbmdQb3NpdGlvbihzZWxlY3Rpb24pXHJcbiAgICAgICAgICAgIC5hdHRyKCd4JywgMClcclxuICAgICAgICAgICAgLmF0dHIoJ3knLCB0aGlzLmNvbmZpZy5ub2RlU2l6ZSAvIDIgKyA3KVxyXG4gICAgICAgICAgICAuYXR0cigndGV4dC1hbmNob3InLCAnbWlkZGxlJylcclxuICAgIH1cclxuXHJcbiAgICBub2RlQWdncmVnYXRlZFBheW9mZlBvc2l0aW9uKHNlbGVjdGlvbikge1xyXG4gICAgICAgIHZhciB4ID0gdGhpcy5jb25maWcubm9kZVNpemUgLyAyICsgNztcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgc2VsZWN0aW9uXHJcbiAgICAgICAgICAgIC5hdHRyKCd4JywgeClcclxuICAgICAgICAgICAgLmF0dHIoJ3knLCBmdW5jdGlvbihkKXtcclxuICAgICAgICAgICAgICAgIGxldCBmb250U2l6ZSA9IHBhcnNlSW50KEFwcFV0aWxzLmdldEZvbnRTaXplKHRoaXMpKTtcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtcyA9IGQuZGlzcGxheVZhbHVlKCdhZ2dyZWdhdGVkUGF5b2ZmJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbnVtYmVyID0gVXRpbHMuaXNBcnJheShpdGVtcykgPyBpdGVtcy5maWx0ZXIoaXQ9Pml0ICE9PSB1bmRlZmluZWQpLmxlbmd0aCA6IDE7XHJcbiAgICAgICAgICAgICAgICBpZihudW1iZXI+MSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC10aGlzLmdldEJCb3goKS5oZWlnaHQvMiArIGZvbnRTaXplLzI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gLU1hdGgubWF4KDIsIDEuOCogc2VsZi5jb25maWcubm9kZVNpemUvZm9udFNpemUpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgc2VsZWN0aW9uLnNlbGVjdEFsbCgndHNwYW4nKS5hdHRyKCd4JywgeCk7XHJcbiAgICAgICAgcmV0dXJuIHNlbGVjdGlvbjtcclxuICAgICAgICAgICAgLy8gLmF0dHIoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXHJcbiAgICAgICAgICAgIC8vIC5hdHRyKCdkb21pbmFudC1iYXNlbGluZScsICdoYW5naW5nJylcclxuICAgIH1cclxuXHJcbiAgICBub2RlUHJvYmFiaWxpdHlUb0VudGVyUG9zaXRpb24oc2VsZWN0aW9uKSB7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICByZXR1cm4gTGF5b3V0LnNldEhhbmdpbmdQb3NpdGlvbihzZWxlY3Rpb24pXHJcbiAgICAgICAgICAgIC5hdHRyKCd4JywgdGhpcy5jb25maWcubm9kZVNpemUgLyAyICsgNylcclxuICAgICAgICAgICAgLmF0dHIoJ3knLCBmdW5jdGlvbihkKXtcclxuICAgICAgICAgICAgICAgIGxldCBmb250U2l6ZSA9IHBhcnNlSW50KEFwcFV0aWxzLmdldEZvbnRTaXplKHRoaXMpKTtcclxuICAgICAgICAgICAgICAgIGxldCBhZ2dyZWdhdGVkUGF5b2ZmcyA9IGQuZGlzcGxheVZhbHVlKCdhZ2dyZWdhdGVkUGF5b2ZmJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgYWdncmVnYXRlZFBheW9mZnNOdW1iZXIgPSBVdGlscy5pc0FycmF5KGFnZ3JlZ2F0ZWRQYXlvZmZzKSA/IGFnZ3JlZ2F0ZWRQYXlvZmZzLmZpbHRlcihpdD0+aXQgIT09IHVuZGVmaW5lZCkubGVuZ3RoIDogMTtcclxuICAgICAgICAgICAgICAgIGlmKGFnZ3JlZ2F0ZWRQYXlvZmZzTnVtYmVyPjEpe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZm9udFNpemUqMC42XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGgubWF4KDIsIDEuOCogc2VsZi5jb25maWcubm9kZVNpemUvZm9udFNpemUpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAvLyAuYXR0cigndGV4dC1hbmNob3InLCAnbWlkZGxlJylcclxuICAgICAgICAgICAgLy8gLmF0dHIoJ2RvbWluYW50LWJhc2VsaW5lJywgJ2NlbnRyYWwnKVxyXG4gICAgfVxyXG5cclxuICAgIG5vZGVJbmRpY2F0b3JQb3NpdGlvbihzZWxlY3Rpb24pIHtcclxuICAgICAgICByZXR1cm4gc2VsZWN0aW9uXHJcbiAgICAgICAgICAgIC5hdHRyKCd4JywgdGhpcy5jb25maWcubm9kZVNpemUgLyAyICsgOClcclxuICAgICAgICAgICAgLmF0dHIoJ3knLCAtIHRoaXMuY29uZmlnLm5vZGVTaXplLzIpXHJcbiAgICAgICAgICAgIC5hdHRyKCdkb21pbmFudC1iYXNlbGluZScsICdjZW50cmFsJylcclxuICAgICAgICAgICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXHJcbiAgICB9XHJcblxyXG4gICAgbm9kZVVuZm9sZEJ1dHRvblBvc2l0aW9uKHNlbGVjdGlvbikge1xyXG5cclxuICAgICAgICByZXR1cm4gc2VsZWN0aW9uXHJcbiAgICAgICAgICAgIC5hdHRyKCd4JywgdGhpcy5jb25maWcubm9kZVNpemUgLyAyICsgNSlcclxuICAgICAgICAgICAgLmF0dHIoJ3knLCAwKVxyXG4gICAgICAgICAgICAuYXR0cignZG9taW5hbnQtYmFzZWxpbmUnLCAnY2VudHJhbCcpXHJcbiAgICB9XHJcblxyXG4gICAgZWRnZUxpbmVEKGVkZ2Upe1xyXG4gICAgICAgIHZhciBsaW5lID0gZDMubGluZSgpXHJcbiAgICAgICAgICAgIC54KGQ9PiBkWzBdKVxyXG4gICAgICAgICAgICAueShkPT4gZFsxXSk7XHJcbiAgICAgICAgLy8gLmN1cnZlKGQzLmN1cnZlQ2F0bXVsbFJvbS5hbHBoYSgwLjUpKTtcclxuXHJcblxyXG4gICAgICAgIHZhciBwYXJlbnROb2RlID0gZWRnZS5wYXJlbnROb2RlO1xyXG4gICAgICAgIHZhciBjaGlsZE5vZGUgPSBlZGdlLmNoaWxkTm9kZTtcclxuXHJcbiAgICAgICAgdmFyIGRYID0gY2hpbGROb2RlLmxvY2F0aW9uLnggLSBwYXJlbnROb2RlLmxvY2F0aW9uLng7XHJcbiAgICAgICAgdmFyIGRZID0gY2hpbGROb2RlLmxvY2F0aW9uLnkgLSBwYXJlbnROb2RlLmxvY2F0aW9uLnk7XHJcblxyXG4gICAgICAgIHZhciBzaWduID0gZFg+PTAgPyAxIDogLTE7XHJcblxyXG4gICAgICAgIHZhciBzbGFudFN0YXJ0WE9mZnNldCA9IE1hdGgubWluKGRYLzIsIHRoaXMuY29uZmlnLm5vZGVTaXplLzIrMTApO1xyXG4gICAgICAgIHZhciBzbGFudFdpZHRoID0gTWF0aC5taW4odGhpcy5jb25maWcuZWRnZVNsYW50V2lkdGhNYXgsIE1hdGgubWF4KGRYLzIgLSBzbGFudFN0YXJ0WE9mZnNldCwgMCkpO1xyXG5cclxuICAgICAgICB2YXIgcG9pbnQxID0gW3BhcmVudE5vZGUubG9jYXRpb24ueCArdGhpcy5jb25maWcubm9kZVNpemUvMiArIDEsIHBhcmVudE5vZGUubG9jYXRpb24ueV07XHJcbiAgICAgICAgdmFyIHBvaW50MiA9IFtNYXRoLm1heChwYXJlbnROb2RlLmxvY2F0aW9uLngrc2xhbnRTdGFydFhPZmZzZXQsIHBvaW50MVswXSksIHBhcmVudE5vZGUubG9jYXRpb24ueV07XHJcbiAgICAgICAgdmFyIHBvaW50MyA9IFtwYXJlbnROb2RlLmxvY2F0aW9uLngrc2xhbnRTdGFydFhPZmZzZXQrc2xhbnRXaWR0aCwgY2hpbGROb2RlLmxvY2F0aW9uLnldO1xyXG4gICAgICAgIHZhciBwb2ludDQgPSBbY2hpbGROb2RlLmxvY2F0aW9uLnggLSAoc2lnbiooTWF0aC5tYXgoMCwgTWF0aC5taW4odGhpcy5jb25maWcubm9kZVNpemUvMis4LCBkWC8yKSkpKSwgY2hpbGROb2RlLmxvY2F0aW9uLnldO1xyXG4gICAgICAgIC8vIHZhciBwb2ludDIgPSBbcGFyZW50Tm9kZS5sb2NhdGlvbi54K2RYLzItc2xhbnRXaWR0aC8yLCBwYXJlbnROb2RlLmxvY2F0aW9uLnldO1xyXG4gICAgICAgIC8vIHZhciBwb2ludDMgPSBbY2hpbGROb2RlLmxvY2F0aW9uLngtKGRYLzItc2xhbnRXaWR0aC8yKSwgY2hpbGROb2RlLmxvY2F0aW9uLnldO1xyXG5cclxuICAgICAgICBlZGdlLiRsaW5lUG9pbnRzID0gW3BvaW50MSwgcG9pbnQyLCBwb2ludDMsIHBvaW50NF07XHJcbiAgICAgICAgcmV0dXJuIGxpbmUoZWRnZS4kbGluZVBvaW50cyk7XHJcbiAgICB9XHJcblxyXG4gICAgZWRnZVBheW9mZlBvc2l0aW9uKHNlbGVjdGlvbikge1xyXG4gICAgICAgIExheW91dC5zZXRIYW5naW5nUG9zaXRpb24oc2VsZWN0aW9uKVxyXG4gICAgICAgICAgICAuYXR0cigneCcsIGQ9PmQuJGxpbmVQb2ludHNbMl1bMF0gKyAyKVxyXG4gICAgICAgICAgICAuYXR0cigneScsIGQ9PmQuJGxpbmVQb2ludHNbMl1bMV0gKyA3KTtcclxuXHJcbiAgICAgICAgc2VsZWN0aW9uLnNlbGVjdEFsbCgndHNwYW4nKS5hdHRyKCd4JywgZnVuY3Rpb24oZCl7XHJcbiAgICAgICAgICAgIHJldHVybiBkMy5zZWxlY3QodGhpcy5wYXJlbnROb2RlKS5kYXR1bSgpLiRsaW5lUG9pbnRzWzJdWzBdICsgMlxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBzZWxlY3Rpb247XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGVkZ2VMYWJlbFBvc2l0aW9uKHNlbGVjdGlvbikge1xyXG4gICAgICAgIHJldHVybiBzZWxlY3Rpb25cclxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGQ9Pid0cmFuc2xhdGUoJysoZC4kbGluZVBvaW50c1syXVswXSArIDIpKycsJysoZC4kbGluZVBvaW50c1syXVsxXSAtIDcpKycpJylcclxuICAgICAgICAgICAgLy8gLmF0dHIoJ3gnLCBkPT5kLiRsaW5lUG9pbnRzWzJdWzBdICsgMilcclxuICAgICAgICAgICAgLy8gLmF0dHIoJ3knLCBkPT5kLiRsaW5lUG9pbnRzWzJdWzFdIC0gNylcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZWRnZVByb2JhYmlsaXR5UG9zaXRpb24oc2VsZWN0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuIExheW91dC5zZXRIYW5naW5nUG9zaXRpb24oc2VsZWN0aW9uKVxyXG4gICAgICAgICAgICAuYXR0cigneCcsIGZ1bmN0aW9uIChkKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGVuID0gdGhpcy5nZXRDb21wdXRlZFRleHRMZW5ndGgoKTtcclxuICAgICAgICAgICAgICAgIHZhciBtaW4gPSBkLiRsaW5lUG9pbnRzWzJdWzBdICsgMiArIHRoaXMucHJldmlvdXNTaWJsaW5nLmNoaWxkTm9kZXNbMF0uZ2V0Q29tcHV0ZWRUZXh0TGVuZ3RoKCkgKyA3ICsgbGVuO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGgubWF4KG1pbiwgZC4kbGluZVBvaW50c1szXVswXSAtIDgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuYXR0cigneScsIGQ9PmQuJGxpbmVQb2ludHNbMl1bMV0gKyA3KVxyXG4gICAgfVxyXG5cclxuICAgIGdldE1pbk1hcmdpbkJldHdlZW5Ob2Rlcygpe1xyXG4gICAgICByZXR1cm4gdGhpcy5jb25maWcubm9kZVNpemUgKyAzMDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRUZXh0TWluWChkKXtcclxuICAgICAgICBsZXQgbWluWCA9IDA7XHJcbiAgICAgICAgaWYoZCl7XHJcbiAgICAgICAgICAgIGxldCBiYiA9IHRoaXMudHJlZURlc2lnbmVyLmdldFRleHREM1NlbGVjdGlvbihkKS5zZWxlY3QoJ3RleHQnKS5ub2RlKCkuZ2V0QkJveCgpO1xyXG4gICAgICAgICAgICBpZiAoYmIueCA8IDApIHtcclxuICAgICAgICAgICAgICAgIG1pblggLT0gYmIueDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWluWDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRUZXh0TWluWShkKXtcclxuICAgICAgICBsZXQgbWluWSA9IDA7XHJcbiAgICAgICAgaWYoZCl7XHJcbiAgICAgICAgICAgIGxldCBiYiA9IHRoaXMudHJlZURlc2lnbmVyLmdldFRleHREM1NlbGVjdGlvbihkKS5zZWxlY3QoJ3RleHQnKS5ub2RlKCkuZ2V0QkJveCgpO1xyXG4gICAgICAgICAgICBpZiAoYmIueSA8IDApIHtcclxuICAgICAgICAgICAgICAgIG1pblkgLT0gYmIueTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWluWTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRUZXh0TWF4WChkKXtcclxuICAgICAgICByZXR1cm4gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVI7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGdldE5vZGVNaW5YKGQpe1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICBpZihkICYmIGQuJHBhcmVudCl7Ly8gJiYgIXNlbGYuaXNOb2RlU2VsZWN0ZWQoZC4kcGFyZW50KVxyXG4gICAgICAgICAgICByZXR1cm4gZC4kcGFyZW50LmxvY2F0aW9uLnggKyBzZWxmLmdldE1pbk1hcmdpbkJldHdlZW5Ob2RlcygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2VsZi5jb25maWcubm9kZVNpemUvMjtcclxuICAgIH1cclxuXHJcbiAgICBnZXROb2RlTWluWShkKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcubm9kZVNpemUvMjtcclxuICAgIH1cclxuXHJcbiAgICBnZXROb2RlTWF4WChkKXtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIGlmKGQgJiYgZC5jaGlsZEVkZ2VzLmxlbmd0aCl7XHJcbiAgICAgICAgICAgIHJldHVybiBkMy5taW4oZC5jaGlsZEVkZ2VzLCBlPT4hZS5jaGlsZE5vZGUuJGhpZGRlbiA/IGUuY2hpbGROb2RlLmxvY2F0aW9uLnggOiA5OTk5OTk5KS1zZWxmLmdldE1pbk1hcmdpbkJldHdlZW5Ob2RlcygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVI7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0R3JpZFdpZHRoKHdpZHRoLCB3aXRob3V0U3RhdGVTYXZpbmcpe1xyXG4gICAgICAgIHZhciBzZWxmPXRoaXM7XHJcbiAgICAgICAgaWYodGhpcy5jb25maWcuZ3JpZFdpZHRoPT09d2lkdGgpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCF3aXRob3V0U3RhdGVTYXZpbmcpe1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKHtcclxuICAgICAgICAgICAgICAgIGRhdGE6e1xyXG4gICAgICAgICAgICAgICAgICAgIGdyaWRXaWR0aDogc2VsZi5jb25maWcuZ3JpZFdpZHRoXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgb25VbmRvOiAoZGF0YSk9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRHcmlkV2lkdGgoZGF0YS5ncmlkV2lkdGgsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG9uUmVkbzogKGRhdGEpPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0R3JpZFdpZHRoKHdpZHRoLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNvbmZpZy5ncmlkV2lkdGg9d2lkdGg7XHJcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRHcmlkSGVpZ2h0KGdyaWRIZWlnaHQsIHdpdGhvdXRTdGF0ZVNhdmluZyl7XHJcbiAgICAgICAgdmFyIHNlbGY9dGhpcztcclxuICAgICAgICBpZih0aGlzLmNvbmZpZy5ncmlkSGVpZ2h0PT09Z3JpZEhlaWdodCl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIXdpdGhvdXRTdGF0ZVNhdmluZyl7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgZGF0YTp7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZEhlaWdodDogc2VsZi5jb25maWcuZ3JpZEhlaWdodFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG9uVW5kbzogKGRhdGEpPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0R3JpZEhlaWdodChkYXRhLmdyaWRIZWlnaHQsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG9uUmVkbzogKGRhdGEpPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0R3JpZEhlaWdodChncmlkSGVpZ2h0LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNvbmZpZy5ncmlkSGVpZ2h0PWdyaWRIZWlnaHQ7XHJcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXROb2RlU2l6ZShub2RlU2l6ZSwgd2l0aG91dFN0YXRlU2F2aW5nKXtcclxuICAgICAgICB2YXIgc2VsZj10aGlzO1xyXG4gICAgICAgIGlmKHRoaXMuY29uZmlnLm5vZGVTaXplPT09bm9kZVNpemUpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCF3aXRob3V0U3RhdGVTYXZpbmcpe1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKHtcclxuICAgICAgICAgICAgICAgIGRhdGE6e1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGVTaXplOiBzZWxmLmNvbmZpZy5ub2RlU2l6ZVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG9uVW5kbzogKGRhdGEpPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0Tm9kZVNpemUoZGF0YS5ub2RlU2l6ZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgb25SZWRvOiAoZGF0YSk9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXROb2RlU2l6ZShub2RlU2l6ZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jb25maWcubm9kZVNpemU9bm9kZVNpemU7XHJcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgICAgICBpZih0aGlzLmlzTWFudWFsTGF5b3V0KCkpe1xyXG4gICAgICAgICAgICB0aGlzLmZpdE5vZGVzSW5QbG90dGluZ1JlZ2lvbihzZWxmLmRhdGEuZ2V0Um9vdHMoKSk7XHJcbiAgICAgICAgICAgIHRoaXMudHJlZURlc2lnbmVyLnJlZHJhdyh0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RWRnZVNsYW50V2lkdGhNYXgod2lkdGgsIHdpdGhvdXRTdGF0ZVNhdmluZyl7XHJcbiAgICAgICAgdmFyIHNlbGY9dGhpcztcclxuICAgICAgICBpZih0aGlzLmNvbmZpZy5lZGdlU2xhbnRXaWR0aE1heD09PXdpZHRoKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZighd2l0aG91dFN0YXRlU2F2aW5nKXtcclxuICAgICAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBkYXRhOntcclxuICAgICAgICAgICAgICAgICAgICBlZGdlU2xhbnRXaWR0aE1heDogc2VsZi5jb25maWcuZWRnZVNsYW50V2lkdGhNYXhcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBvblVuZG86IChkYXRhKT0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldEVkZ2VTbGFudFdpZHRoTWF4KGRhdGEuZWRnZVNsYW50V2lkdGhNYXgsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG9uUmVkbzogKGRhdGEpPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0RWRnZVNsYW50V2lkdGhNYXgod2lkdGgsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY29uZmlnLmVkZ2VTbGFudFdpZHRoTWF4PXdpZHRoO1xyXG4gICAgICAgIHRoaXMudHJlZURlc2lnbmVyLnJlZHJhdyh0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBhdXRvTGF5b3V0KHR5cGUsIHdpdGhvdXRTdGF0ZVNhdmluZyl7XHJcbiAgICAgICAgdmFyIHNlbGY9dGhpcztcclxuXHJcblxyXG5cclxuICAgICAgICBpZighd2l0aG91dFN0YXRlU2F2aW5nKXtcclxuICAgICAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBkYXRhOntcclxuICAgICAgICAgICAgICAgICAgICBuZXdMYXlvdXQ6IHR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudExheW91dDogc2VsZi5jb25maWcudHlwZVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG9uVW5kbzogKGRhdGEpPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY29uZmlnLnR5cGUgPSBkYXRhLmN1cnJlbnRMYXlvdXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5fZmlyZU9uQXV0b0xheW91dENoYW5nZWRDYWxsYmFja3MoKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBvblJlZG86IChkYXRhKT0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmF1dG9MYXlvdXQoZGF0YS5uZXdMYXlvdXQsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb25maWcudHlwZSA9IHR5cGU7XHJcbiAgICAgICAgaWYoIXRoaXMuZGF0YS5ub2Rlcy5sZW5ndGgpe1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlT25BdXRvTGF5b3V0Q2hhbmdlZENhbGxiYWNrcygpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgcHJldlRyZWVNYXhZID0gc2VsZi5nZXROb2RlTWluWSgpO1xyXG4gICAgICAgIHRoaXMuZGF0YS5nZXRSb290cygpLmZvckVhY2gocj0+e1xyXG4gICAgICAgICAgICB2YXIgcm9vdCA9IGQzLmhpZXJhcmNoeShyLCBkPT57XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5jaGlsZEVkZ2VzLmZpbHRlcihlPT4hZS4kaGlkZGVuKS5tYXAoZT0+ZS5jaGlsZE5vZGUpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIHJvb3Quc29ydCgoYSxiKT0+c2VsZi5ub2RlVHlwZU9yZGVyW2EuZGF0YS50eXBlXS1zZWxmLm5vZGVUeXBlT3JkZXJbYi5kYXRhLnR5cGVdKTtcclxuICAgICAgICAgICAgcm9vdC5zb3J0KChhLGIpPT5hLmRhdGEubG9jYXRpb24ueSAtIGIuZGF0YS5sb2NhdGlvbi55KTtcclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgbGF5b3V0O1xyXG4gICAgICAgICAgICBpZih0eXBlPT09J2NsdXN0ZXInKXtcclxuICAgICAgICAgICAgICAgIGxheW91dCA9IGQzLmNsdXN0ZXIoKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBsYXlvdXQgPSBkMy50cmVlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGF5b3V0Lm5vZGVTaXplKFtzZWxmLmNvbmZpZy5ncmlkSGVpZ2h0LCBzZWxmLmNvbmZpZy5ncmlkV2lkdGhdKTtcclxuICAgICAgICAgICAgbGF5b3V0LnNlcGFyYXRpb24oc2VsZi5ub2RlU2VwYXJhdGlvbik7XHJcblxyXG4gICAgICAgICAgICBsYXlvdXQocm9vdCk7XHJcbiAgICAgICAgICAgIHZhciBtaW5ZID0gOTk5OTk5OTk5O1xyXG4gICAgICAgICAgICByb290LmVhY2goZD0+e1xyXG4gICAgICAgICAgICAgICAgbWluWSA9IE1hdGgubWluKG1pblksIGQueCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdmFyIGR5ID0gcm9vdC54IC0gbWluWSArIHByZXZUcmVlTWF4WTtcclxuICAgICAgICAgICAgdmFyIGR4ID0gc2VsZi5nZXROb2RlTWluWCgpO1xyXG4gICAgICAgICAgICB2YXIgbWF4WT0wO1xyXG4gICAgICAgICAgICByb290LmVhY2goZD0+e1xyXG4gICAgICAgICAgICAgICAgZC5kYXRhLmxvY2F0aW9uLnggPSBkLnkgKyBkeDtcclxuICAgICAgICAgICAgICAgIGQuZGF0YS5sb2NhdGlvbi55ID0gZC54ICsgZHk7XHJcblxyXG4gICAgICAgICAgICAgICAgbWF4WSA9IE1hdGgubWF4KG1heFksIGQuZGF0YS5sb2NhdGlvbi55KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBwcmV2VHJlZU1heFkgPSBtYXhZICsgc2VsZi5jb25maWcubm9kZVNpemUrc2VsZi50cmVlTWFyZ2luO1xyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgLy8gdGhpcy50cmFuc2l0aW9uID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnRyZWVEZXNpZ25lci5yZWRyYXcodHJ1ZSk7XHJcbiAgICAgICAgLy8gdGhpcy50cmFuc2l0aW9uID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMuX2ZpcmVPbkF1dG9MYXlvdXRDaGFuZ2VkQ2FsbGJhY2tzKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgZml0Tm9kZXNJblBsb3R0aW5nUmVnaW9uKG5vZGVzKXtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHRvcFkgPSBkMy5taW4obm9kZXMsIG49Pm4ubG9jYXRpb24ueSk7XHJcbiAgICAgICAgdmFyIG1pblkgPSBzZWxmLmdldE5vZGVNaW5ZKCk7XHJcbiAgICAgICAgdmFyIGR5ID0gdG9wWSAtIG1pblk7XHJcblxyXG4gICAgICAgIHZhciBtaW5YID0gZDMubWluKG5vZGVzLCBuPT5uLmxvY2F0aW9uLngpO1xyXG4gICAgICAgIHZhciBkeCA9IG1pblggLSBzZWxmLmdldE5vZGVNaW5YKCk7XHJcblxyXG4gICAgICAgIGlmKGR5PDAgfHwgIGR4PDApe1xyXG4gICAgICAgICAgICBub2Rlcy5mb3JFYWNoKG49Pm4ubW92ZSgtZHgsIC1keSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtb3ZlTm9kZXMobm9kZXMsIGR4LCBkeSwgcGl2b3Qpe1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICB2YXIgbGltaXQgPSBzZWxmLmNvbmZpZy5saW1pdE5vZGVQb3NpdGlvbmluZztcclxuICAgICAgICBpZihsaW1pdCl7XHJcbiAgICAgICAgICAgIGlmKGR4PDApe1xyXG4gICAgICAgICAgICAgICAgbm9kZXMuc29ydCgoYSxiKT0+YS5sb2NhdGlvbi54LWIubG9jYXRpb24ueCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgbm9kZXMuc29ydCgoYSxiKT0+Yi5sb2NhdGlvbi54LWEubG9jYXRpb24ueCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB2YXIgbWluWSA9IGQzLm1pbihub2RlcywgZD0+ZC5sb2NhdGlvbi55KTtcclxuICAgICAgICBpZihtaW5ZICsgZHkgPCBzZWxmLmdldE5vZGVNaW5ZKCkpe1xyXG4gICAgICAgICAgICBkeSA9IHNlbGYuZ2V0Tm9kZU1pblkoKSAtIG1pblk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBub2Rlcy5mb3JFYWNoKGQ9PntcclxuICAgICAgICAgICAgaWYobGltaXQpe1xyXG4gICAgICAgICAgICAgICAgTGF5b3V0LmJhY2t1cE5vZGVMb2NhdGlvbihkKTtcclxuICAgICAgICAgICAgICAgIHZhciBtaW5YID0gc2VsZi5nZXROb2RlTWluWChkKTtcclxuICAgICAgICAgICAgICAgIHZhciBtYXhYID0gc2VsZi5nZXROb2RlTWF4WChkKTtcclxuXHJcbiAgICAgICAgICAgICAgICBkLmxvY2F0aW9uLnggPSBNYXRoLm1pbihNYXRoLm1heChkLmxvY2F0aW9uLngrZHgsIG1pblgpLCBtYXhYKTtcclxuICAgICAgICAgICAgICAgIGQubG9jYXRpb24ueSArPSBkeTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBkLmxvY2F0aW9uLnggKz1keDtcclxuICAgICAgICAgICAgICAgIGQubG9jYXRpb24ueSArPSBkeTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIHZhciByZXZlcnRYID0gcGl2b3QgJiYgc2VsZi5jb25maWcubGltaXROb2RlUG9zaXRpb25pbmcgJiYgKHBpdm90LmxvY2F0aW9uLnggPT09IHBpdm90LiRsb2NhdGlvbi54KTtcclxuXHJcbiAgICAgICAgbm9kZXMuZm9yRWFjaChkPT57XHJcbiAgICAgICAgICAgIGlmKHJldmVydFgpe1xyXG4gICAgICAgICAgICAgICAgZC5sb2NhdGlvbi54ID0gZC4kbG9jYXRpb24ueDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZWxmLnRyZWVEZXNpZ25lci51cGRhdGVOb2RlUG9zaXRpb24oZCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBtb3ZlVGV4dHModGV4dHMsIGR4LCBkeSl7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBsaW1pdCA9IHNlbGYuY29uZmlnLmxpbWl0VGV4dFBvc2l0aW9uaW5nO1xyXG4gICAgICAgIGlmKGxpbWl0KXtcclxuICAgICAgICAgICAgaWYoZHg8MCl7XHJcbiAgICAgICAgICAgICAgICB0ZXh0cy5zb3J0KChhLGIpPT5hLmxvY2F0aW9uLngtYi5sb2NhdGlvbi54KTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0ZXh0cy5zb3J0KChhLGIpPT5iLmxvY2F0aW9uLngtYS5sb2NhdGlvbi54KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICB0ZXh0cy5mb3JFYWNoKGQ9PntcclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmKGxpbWl0KXtcclxuICAgICAgICAgICAgICAgIGxldCBtaW5YID0gc2VsZi5nZXRUZXh0TWluWChkKTtcclxuICAgICAgICAgICAgICAgIGxldCBtYXhYID0gc2VsZi5nZXRUZXh0TWF4WChkKTtcclxuICAgICAgICAgICAgICAgIGxldCBtaW5ZID0gc2VsZi5nZXRUZXh0TWluWShkKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgZC5sb2NhdGlvbi54ID0gTWF0aC5taW4oTWF0aC5tYXgoZC5sb2NhdGlvbi54K2R4LCBtaW5YKSwgbWF4WCk7XHJcbiAgICAgICAgICAgICAgICBkLmxvY2F0aW9uLnkgPSBNYXRoLm1heChkLmxvY2F0aW9uLnkrZHksIG1pblkpO1xyXG5cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBkLmxvY2F0aW9uLm1vdmUoZHgsIGR5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZWxmLnRyZWVEZXNpZ25lci51cGRhdGVUZXh0UG9zaXRpb24oZCk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgYmFja3VwTm9kZUxvY2F0aW9uKG5vZGUpIHtcclxuICAgICAgICBub2RlLiRsb2NhdGlvbiA9IG5ldyBtb2RlbC5Qb2ludChub2RlLmxvY2F0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBfZmlyZU9uQXV0b0xheW91dENoYW5nZWRDYWxsYmFja3MoKXtcclxuICAgICAgICB0aGlzLm9uQXV0b0xheW91dENoYW5nZWQuZm9yRWFjaChjPT5jKHRoaXMuY29uZmlnLnR5cGUpKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgc2V0SGFuZ2luZ1Bvc2l0aW9uKHNlbGVjdGlvbil7XHJcbiAgICAgICAgLy8gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAvLyAgICAgc2VsZWN0aW9uLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICAvLyAgICAgICAgIHZhciBoID0gIHRoaXMuZ2V0QkJveCgpLmhlaWdodDtcclxuICAgICAgICAvLyAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5hdHRyKCdkeScsIGgpO1xyXG4gICAgICAgIC8vICAgICB9KTtcclxuICAgICAgICAvLyB9LDApO1xyXG5cclxuICAgICAgICBpZihBcHBVdGlscy5pc0hpZGRlbihzZWxlY3Rpb24ubm9kZSgpKSl7IC8vIHNldHRpbmcgaGFuZ2luZyBwb3NpdGlvbiBvZiBoaWRkZW4gZWxlbWVudHMgZmFpbHMgb24gZmlyZWZveFxyXG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0aW9uO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHNlbGVjdGlvbi5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHZhciBoID0gIHRoaXMuZ2V0QkJveCgpLmhlaWdodDtcclxuICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLmF0dHIoJ2R5JywgJzAuNzVlbScpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gc2VsZWN0aW9uO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcbiIsImltcG9ydCB7QXBwVXRpbHN9IGZyb20gJy4vYXBwLXV0aWxzJ1xyXG5pbXBvcnQgKiBhcyBkMyBmcm9tICcuL2QzJ1xyXG5pbXBvcnQge0NvbnRleHRNZW51fSBmcm9tICcuL2NvbnRleHQtbWVudS9jb250ZXh0LW1lbnUnXHJcblxyXG5leHBvcnQgY2xhc3MgTm9kZURyYWdIYW5kbGVye1xyXG5cclxuICAgIHRyZWVEZXNpZ25lcjtcclxuICAgIGRhdGE7XHJcbiAgICBjb25maWc7XHJcblxyXG4gICAgZHJhZztcclxuICAgIHN0YXRlU25hcHNob3QgPSBudWxsO1xyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih0cmVlRGVzaWduZXIsIGRhdGEpe1xyXG4gICAgICAgIHRoaXMudHJlZURlc2lnbmVyID0gdHJlZURlc2lnbmVyO1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcblxyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLmRyYWcgPSBkMy5kcmFnKClcclxuICAgICAgICAgICAgLnN1YmplY3QoZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgaWYoZD09bnVsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IGV2ZW50LngsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IGV2ZW50LnlcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIHQgPSBkMy5zZWxlY3QodGhpcyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHg6IHQuYXR0cihcInhcIikgKyBBcHBVdGlscy5nZXRUcmFuc2xhdGlvbih0LmF0dHIoXCJ0cmFuc2Zvcm1cIikpWzBdLFxyXG4gICAgICAgICAgICAgICAgICAgIHk6IHQuYXR0cihcInlcIikgKyBBcHBVdGlscy5nZXRUcmFuc2xhdGlvbih0LmF0dHIoXCJ0cmFuc2Zvcm1cIikpWzFdXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAub24oXCJzdGFydFwiLCBmdW5jdGlvbihkKXtcclxuICAgICAgICAgICAgICAgIHNlbGYuZHJhZ1N0YXJ0ZWQuY2FsbCh0aGlzLGQsIHNlbGYpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5vbihcImRyYWdcIiwgZnVuY3Rpb24gKGQpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYub25EcmFnLmNhbGwodGhpcywgZCwgc2VsZik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5vbihcImVuZFwiLCBmdW5jdGlvbiAoZCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5kcmFnRW5kZWQuY2FsbCh0aGlzLCBkLCBzZWxmKTtcclxuICAgICAgICAgICAgfSlcclxuICAgIH1cclxuXHJcblxyXG4gICAgZHJhZ1N0YXJ0ZWQoZCxzZWxmKSB7XHJcbiAgICAgICAgaWYoc2VsZi5pZ25vcmVEcmFnKXtcclxuICAgICAgICAgICAgc2VsZi5pZ25vcmVEcmFnPWZhbHNlO1xyXG4gICAgICAgICAgICBzZWxmLmlnbm9yZWREcmFnPXRydWU7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2VsZi5pZ25vcmVkRHJhZz1mYWxzZTtcclxuICAgICAgICBzZWxmLnN0YXRlU25hcHNob3QgPSBzZWxmLmRhdGEuY3JlYXRlU3RhdGVTbmFwc2hvdCgpO1xyXG5cclxuICAgICAgICAvLyBzZWxmLnRyZWVEZXNpZ25lci5sYXlvdXQuZGlzYWJsZUF1dG9MYXlvdXQoKTtcclxuICAgICAgICBDb250ZXh0TWVudS5oaWRlKCk7XHJcbiAgICAgICAgdmFyIG5vZGUgPSBkMy5zZWxlY3QodGhpcyk7XHJcbiAgICAgICAgaWYoIW5vZGUuY2xhc3NlZChcInNlbGVjdGVkXCIpKXtcclxuICAgICAgICAgICAgc2VsZi50cmVlRGVzaWduZXIuY2xlYXJTZWxlY3Rpb24oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGYudHJlZURlc2lnbmVyLnNlbGVjdE5vZGUoZCk7XHJcbiAgICAgICAgbm9kZS5jbGFzc2VkKFwic2VsZWN0ZWQgZHJhZ2dpbmdcIiwgdHJ1ZSk7XHJcbiAgICAgICAgc2VsZi5zZWxlY3RlZE5vZGVzID0gc2VsZi50cmVlRGVzaWduZXIuZ2V0U2VsZWN0ZWROb2Rlcyh0cnVlKTtcclxuICAgICAgICBzZWxmLnByZXZEcmFnRXZlbnQgPSBkMy5ldmVudDtcclxuICAgICAgICBzZWxmLmRyYWdFdmVudENvdW50ID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBvbkRyYWcoZHJhZ2dlZE5vZGUsIHNlbGYpe1xyXG4gICAgICAgIGlmKHNlbGYuaWdub3JlZERyYWcpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihzZWxmLmRyYWdFdmVudENvdW50PT09MiAmJiBzZWxmLnN0YXRlU25hcHNob3Qpe1xyXG4gICAgICAgICAgICBzZWxmLmRhdGEuc2F2ZVN0YXRlRnJvbVNuYXBzaG90KHNlbGYuc3RhdGVTbmFwc2hvdCk7IC8vIFRPRE8gc2F2ZSBvbmx5IGlmIHNvbWV0aGluZyBoYXMgcmVhbGx5IGNoYW5nZWRcclxuICAgICAgICAgICAgc2VsZi5zdGF0ZVNuYXBzaG90ID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2VsZi5kcmFnRXZlbnRDb3VudCsrO1xyXG4gICAgICAgIGlmKHNlbGYuc2VsZWN0ZWROb2Rlcy5sZW5ndGg+NSAmJiBzZWxmLmRyYWdFdmVudENvdW50JTIhPT0xKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGR4ID0gZDMuZXZlbnQueCAtIHNlbGYucHJldkRyYWdFdmVudC54O1xyXG4gICAgICAgIHZhciBkeSA9IGQzLmV2ZW50LnktIHNlbGYucHJldkRyYWdFdmVudC55O1xyXG4gICAgICAgIHNlbGYudHJlZURlc2lnbmVyLmxheW91dC5tb3ZlTm9kZXMoc2VsZi5zZWxlY3RlZE5vZGVzLCBkeCwgZHksIGRyYWdnZWROb2RlKTtcclxuXHJcblxyXG4gICAgICAgIHNlbGYucHJldkRyYWdFdmVudCA9IGQzLmV2ZW50O1xyXG4gICAgICAgIHNlbGYudHJlZURlc2lnbmVyLnJlZHJhd0VkZ2VzKCk7XHJcbiAgICAgICAgc2VsZi50cmVlRGVzaWduZXIudXBkYXRlUGxvdHRpbmdSZWdpb25TaXplKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhZ0VuZGVkKGRyYWdnZWROb2RlLCBzZWxmKXtcclxuICAgICAgICB2YXIgbm9kZSA9IGQzLnNlbGVjdCh0aGlzKS5jbGFzc2VkKFwiZHJhZ2dpbmdcIiwgZmFsc2UpO1xyXG4gICAgICAgIGlmKHNlbGYuaWdub3JlZERyYWcpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlbGYudHJlZURlc2lnbmVyLmxheW91dC51cGRhdGUoZHJhZ2dlZE5vZGUpXHJcbiAgICB9XHJcblxyXG4gICAgY2FuY2VsRHJhZygpe1xyXG4gICAgICAgIHRoaXMuaWdub3JlRHJhZyA9IHRydWU7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5cclxuIiwidmFyIGVwc2lsb24gPSAxZS0xMjtcclxudmFyIHBpID0gTWF0aC5QSTtcclxudmFyIGhhbGZQaSA9IHBpIC8gMjtcclxudmFyIHRhdSA9IDIgKiBwaTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIC8qZHJhdzogZnVuY3Rpb24oY29udGV4dCwgc2l6ZSkge1xyXG4gICAgICAgIHZhciByID0gTWF0aC5zcXJ0KHNpemUgLyBwaSk7XHJcbiAgICAgICAgY29udGV4dC5tb3ZlVG8ociwgMCk7XHJcbiAgICAgICAgY29udGV4dC5hcmMoMCwgMCwgciwgMCwgdGF1KTtcclxuICAgIH0qL1xyXG4gICAgZHJhdzogZnVuY3Rpb24oY29udGV4dCwgc2l6ZSkge1xyXG5cclxuICAgICAgICB2YXIgciA9IE1hdGguc3FydChzaXplIC8gcGkpO1xyXG4gICAgICAgIHZhciBkaXN0ID0wLjU1MjI4NDc0OTgzMSAqIHI7XHJcblxyXG4gICAgICAgIGNvbnRleHQubW92ZVRvKC1yLCAwKVxyXG4gICAgICAgIC8vIGNvbnRleHQubGluZVRvKDIqciwgMipyKVxyXG4gICAgICAgIC8vIGNvbnRleHQuYmV6aWVyQ3VydmVUbygtciwgLWRpc3QsIC1kaXN0LCAtciwgMCwtcik7XHJcbiAgICAgICAgY29udGV4dC5iZXppZXJDdXJ2ZVRvKC1yLCAtZGlzdCwgLWRpc3QsIC1yLCAwLC1yKTtcclxuXHJcbiAgICAgICAgY29udGV4dC5iZXppZXJDdXJ2ZVRvKGRpc3QsIC1yLCByLCAtZGlzdCwgciwwKTtcclxuXHJcbiAgICAgICAgY29udGV4dC5iZXppZXJDdXJ2ZVRvKHIsIGRpc3QsIGRpc3QsIHIsIDAsIHIpO1xyXG5cclxuICAgICAgICBjb250ZXh0LmJlemllckN1cnZlVG8oLWRpc3QsIHIsIC1yLCBkaXN0LCAtciwgMCk7XHJcbiAgICB9XHJcbn07XHJcbiIsInZhciBzcXJ0MyA9IE1hdGguc3FydCgzKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGRyYXc6IGZ1bmN0aW9uKGNvbnRleHQsIHNpemUpIHtcclxuICAgICAgICB2YXIgciA9IE1hdGguc3FydChzaXplIC8gTWF0aC5QSSk7XHJcbiAgICAgICAgY29udGV4dC5tb3ZlVG8oLXIsIDApO1xyXG4gICAgICAgIGNvbnRleHQubGluZVRvKDAuOSpyLCAtcik7XHJcbiAgICAgICAgY29udGV4dC5saW5lVG8oMC45KnIsIHIpO1xyXG4gICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XHJcbiAgICB9XHJcbn07XHJcbiIsImltcG9ydCB7VXRpbHN9IGZyb20gXCJzZC11dGlsc1wiO1xyXG5pbXBvcnQge2kxOG59IGZyb20gJy4vaTE4bi9pMThuJ1xyXG5cclxuZXhwb3J0IGNsYXNzIFRlbXBsYXRlc3tcclxuXHJcbiAgICBzdGF0aWMgZ3Jvd2wgPSByZXF1aXJlKCcuL3RlbXBsYXRlcy9ncm93bF9tZXNzYWdlLmh0bWwnKTtcclxuXHJcbiAgICBzdGF0aWMgZ2V0KHRlbXBsYXRlTmFtZSwgdmFyaWFibGVzKXtcclxuICAgICAgICB2YXIgY29tcGlsZWQgPSBVdGlscy50ZW1wbGF0ZShUZW1wbGF0ZXNbdGVtcGxhdGVOYW1lXSx7ICdpbXBvcnRzJzogeyAnaTE4bic6IGkxOG4sICdUZW1wbGF0ZXMnOiBUZW1wbGF0ZXMsICdpbmNsdWRlJzogZnVuY3Rpb24obiwgdikge3JldHVybiBUZW1wbGF0ZXMuZ2V0KG4sIHYpfSB9IH0pO1xyXG4gICAgICAgIGlmKHZhcmlhYmxlcyl7XHJcbiAgICAgICAgICAgIHZhcmlhYmxlcy52YXJpYWJsZXMgPSB2YXJpYWJsZXM7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHZhcmlhYmxlcyA9IHt2YXJpYWJsZXM6e319XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb21waWxlZCh2YXJpYWJsZXMpXHJcblxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBzdHlsZVJ1bGUoc2VsZWN0b3IsIHByb3BzKXtcclxuICAgICAgICB2YXIgcyA9IHNlbGVjdG9yKyAneyc7XHJcbiAgICAgICAgcHJvcHMuZm9yRWFjaChwPT4gcys9VGVtcGxhdGVzLnN0eWxlUHJvcChwWzBdLCBwWzFdKSk7XHJcbiAgICAgICAgcys9J30gJztcclxuICAgICAgICByZXR1cm4gcztcclxuICAgIH1cclxuICAgIHN0YXRpYyBzdHlsZVByb3Aoc3R5bGVOYW1lLCB2YXJpYWJsZU5hbWUpe1xyXG4gICAgICAgIHJldHVybiAgc3R5bGVOYW1lKyc6IDwlPSAnK3ZhcmlhYmxlTmFtZSsnICU+OyAnXHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHRyZWVEZXNpZ25lclNlbGVjdG9yID0gJ3N2Zy5zZC10cmVlLWRlc2lnbmVyJztcclxuICAgIHN0YXRpYyBub2RlU2VsZWN0b3IodHlwZSwgY2xhenope1xyXG4gICAgICAgIHZhciBzID0gVGVtcGxhdGVzLnRyZWVEZXNpZ25lclNlbGVjdG9yKycgLm5vZGUnO1xyXG4gICAgICAgIGlmKHR5cGUpe1xyXG4gICAgICAgICAgICBzKz0nLicrdHlwZSsnLW5vZGUnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihjbGF6eil7XHJcbiAgICAgICAgICAgIHMrPScuJytjbGF6ejtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHM7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgZWRnZVNlbGVjdG9yKGNsYXp6KXtcclxuICAgICAgICB2YXIgcyA9IFRlbXBsYXRlcy50cmVlRGVzaWduZXJTZWxlY3RvcisnIC5lZGdlJztcclxuICAgICAgICBpZihjbGF6eil7XHJcbiAgICAgICAgICAgIHMrPScuJytjbGF6ejtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHM7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHRyZWVEZXNpZ25lclN0eWxlcyA9XHJcblxyXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLnRyZWVEZXNpZ25lclNlbGVjdG9yLFtcclxuICAgICAgICAgICAgWydmb250LXNpemUnLCAnZm9udFNpemUnXSxcclxuICAgICAgICAgICAgWydmb250LWZhbWlseScsICdmb250RmFtaWx5J10sXHJcbiAgICAgICAgICAgIFsnZm9udC13ZWlnaHQnLCAnZm9udFdlaWdodCddLFxyXG4gICAgICAgICAgICBbJ2ZvbnQtc3R5bGUnLCAnZm9udFN0eWxlJ11cclxuICAgICAgICBdKStcclxuICAgICAgICAvLyAgIG5vZGVcclxuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5ub2RlU2VsZWN0b3IoKSsnIHBhdGgnLFtcclxuICAgICAgICAgICAgWydmaWxsJywgJ25vZGUuZmlsbCddLFxyXG4gICAgICAgICAgICBbJ3N0cm9rZS13aWR0aCcsICdub2RlLnN0cm9rZVdpZHRoJ11cclxuICAgICAgICBdKStcclxuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5ub2RlU2VsZWN0b3IoJ2RlY2lzaW9uJywgJ29wdGltYWwnKSsnIHBhdGgsICcrVGVtcGxhdGVzLm5vZGVTZWxlY3RvcignY2hhbmNlJywgJ29wdGltYWwnKSsnIHBhdGgsJyArVGVtcGxhdGVzLm5vZGVTZWxlY3RvcigndGVybWluYWwnLCAnb3B0aW1hbCcpKycgcGF0aCcsW1xyXG4gICAgICAgICAgICBbJ3N0cm9rZScsICdub2RlLm9wdGltYWwuc3Ryb2tlJ10sXHJcbiAgICAgICAgICAgIFsnc3Ryb2tlLXdpZHRoJywgJ25vZGUub3B0aW1hbC5zdHJva2VXaWR0aCddXHJcbiAgICAgICAgXSkrXHJcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCkrJyAubGFiZWwnLFtcclxuICAgICAgICAgICAgWydmb250LXNpemUnLCAnbm9kZS5sYWJlbC5mb250U2l6ZSddLFxyXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnbm9kZS5sYWJlbC5jb2xvciddXHJcbiAgICAgICAgXSkrXHJcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCkrJyAucGF5b2ZmJyxbXHJcbiAgICAgICAgICAgIFsnZm9udC1zaXplJywgJ25vZGUucGF5b2ZmLmZvbnRTaXplJ10sXHJcbiAgICAgICAgICAgIFsnZmlsbCcsICdub2RlLnBheW9mZi5jb2xvciddLFxyXG4gICAgICAgIF0pK1xyXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLm5vZGVTZWxlY3RvcigpKycgLnBheW9mZi5uZWdhdGl2ZScsW1xyXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnbm9kZS5wYXlvZmYubmVnYXRpdmVDb2xvciddLFxyXG4gICAgICAgIF0pK1xyXG5cclxuICAgICAgICAvLyAgICBkZWNpc2lvbiBub2RlXHJcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCdkZWNpc2lvbicpKycgcGF0aCcsW1xyXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnbm9kZS5kZWNpc2lvbi5maWxsJ10sXHJcbiAgICAgICAgICAgIFsnc3Ryb2tlJywgJ25vZGUuZGVjaXNpb24uc3Ryb2tlJ11cclxuICAgICAgICBdKStcclxuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5ub2RlU2VsZWN0b3IoJ2RlY2lzaW9uJywgJ3NlbGVjdGVkJykrJyBwYXRoJyxbXHJcbiAgICAgICAgICAgIFsnZmlsbCcsICdub2RlLmRlY2lzaW9uLnNlbGVjdGVkLmZpbGwnXVxyXG4gICAgICAgIF0pK1xyXG5cclxuICAgICAgICAvLyAgICBjaGFuY2Ugbm9kZVxyXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLm5vZGVTZWxlY3RvcignY2hhbmNlJykrJyBwYXRoJyxbXHJcbiAgICAgICAgICAgIFsnZmlsbCcsICdub2RlLmNoYW5jZS5maWxsJ10sXHJcbiAgICAgICAgICAgIFsnc3Ryb2tlJywgJ25vZGUuY2hhbmNlLnN0cm9rZSddXHJcbiAgICAgICAgXSkrXHJcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCdjaGFuY2UnLCAnc2VsZWN0ZWQnKSsnIHBhdGgnLFtcclxuICAgICAgICAgICAgWydmaWxsJywgJ25vZGUuY2hhbmNlLnNlbGVjdGVkLmZpbGwnXVxyXG4gICAgICAgIF0pK1xyXG5cclxuICAgICAgICAvLyAgICB0ZXJtaW5hbCBub2RlXHJcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCd0ZXJtaW5hbCcpKycgcGF0aCcsW1xyXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnbm9kZS50ZXJtaW5hbC5maWxsJ10sXHJcbiAgICAgICAgICAgIFsnc3Ryb2tlJywgJ25vZGUudGVybWluYWwuc3Ryb2tlJ11cclxuICAgICAgICBdKStcclxuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5ub2RlU2VsZWN0b3IoJ3Rlcm1pbmFsJywgJ3NlbGVjdGVkJykrJyBwYXRoJyxbXHJcbiAgICAgICAgICAgIFsnZmlsbCcsICdub2RlLnRlcm1pbmFsLnNlbGVjdGVkLmZpbGwnXVxyXG4gICAgICAgIF0pK1xyXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLm5vZGVTZWxlY3RvcigndGVybWluYWwnKSsnIC5hZ2dyZWdhdGVkLXBheW9mZicsW1xyXG4gICAgICAgICAgICBbJ2ZvbnQtc2l6ZScsICdub2RlLnRlcm1pbmFsLnBheW9mZi5mb250U2l6ZSddLFxyXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnbm9kZS50ZXJtaW5hbC5wYXlvZmYuY29sb3InXSxcclxuICAgICAgICBdKStcclxuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5ub2RlU2VsZWN0b3IoJ3Rlcm1pbmFsJykrJyAuYWdncmVnYXRlZC1wYXlvZmYubmVnYXRpdmUnLFtcclxuICAgICAgICAgICAgWydmaWxsJywgJ25vZGUudGVybWluYWwucGF5b2ZmLm5lZ2F0aXZlQ29sb3InXSxcclxuICAgICAgICBdKStcclxuXHJcblxyXG4gICAgICAgIC8vcHJvYmFiaWxpdHlcclxuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy50cmVlRGVzaWduZXJTZWxlY3RvcisnIC5ub2RlIC5wcm9iYWJpbGl0eS10by1lbnRlciwgJytUZW1wbGF0ZXMudHJlZURlc2lnbmVyU2VsZWN0b3IrJyAuZWRnZSAucHJvYmFiaWxpdHknLFtcclxuICAgICAgICAgICAgWydmb250LXNpemUnLCAncHJvYmFiaWxpdHkuZm9udFNpemUnXSxcclxuICAgICAgICAgICAgWydmaWxsJywgJ3Byb2JhYmlsaXR5LmNvbG9yJ11cclxuICAgICAgICBdKStcclxuXHJcbiAgICAgICAgLy9lZGdlXHJcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMuZWRnZVNlbGVjdG9yKCkrJyBwYXRoJyxbXHJcbiAgICAgICAgICAgIFsnc3Ryb2tlJywgJ2VkZ2Uuc3Ryb2tlJ10sXHJcbiAgICAgICAgICAgIFsnc3Ryb2tlLXdpZHRoJywgJ2VkZ2Uuc3Ryb2tlV2lkdGgnXVxyXG4gICAgICAgIF0pK1xyXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLnRyZWVEZXNpZ25lclNlbGVjdG9yKycgbWFya2VyI2Fycm93IHBhdGgnLFtcclxuICAgICAgICAgICAgWydmaWxsJywgJ2VkZ2Uuc3Ryb2tlJ10sXHJcbiAgICAgICAgXSkrXHJcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMuZWRnZVNlbGVjdG9yKCdvcHRpbWFsJykrJyBwYXRoJyxbXHJcbiAgICAgICAgICAgIFsnc3Ryb2tlJywgJ2VkZ2Uub3B0aW1hbC5zdHJva2UnXSxcclxuICAgICAgICAgICAgWydzdHJva2Utd2lkdGgnLCAnZWRnZS5vcHRpbWFsLnN0cm9rZVdpZHRoJ11cclxuICAgICAgICBdKStcclxuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy50cmVlRGVzaWduZXJTZWxlY3RvcisnIG1hcmtlciNhcnJvdy1vcHRpbWFsIHBhdGgnLFtcclxuICAgICAgICAgICAgWydmaWxsJywgJ2VkZ2Uub3B0aW1hbC5zdHJva2UnXSxcclxuICAgICAgICBdKStcclxuXHJcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMuZWRnZVNlbGVjdG9yKCdzZWxlY3RlZCcpKycgcGF0aCcsW1xyXG4gICAgICAgICAgICBbJ3N0cm9rZScsICdlZGdlLnNlbGVjdGVkLnN0cm9rZSddLFxyXG4gICAgICAgICAgICBbJ3N0cm9rZS13aWR0aCcsICdlZGdlLnNlbGVjdGVkLnN0cm9rZVdpZHRoJ11cclxuICAgICAgICBdKStcclxuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy50cmVlRGVzaWduZXJTZWxlY3RvcisnIG1hcmtlciNhcnJvdy1zZWxlY3RlZCBwYXRoJyxbXHJcbiAgICAgICAgICAgIFsnZmlsbCcsICdlZGdlLnNlbGVjdGVkLnN0cm9rZSddLFxyXG4gICAgICAgIF0pK1xyXG5cclxuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5lZGdlU2VsZWN0b3IoKSsnIC5sYWJlbCcsW1xyXG4gICAgICAgICAgICBbJ2ZvbnQtc2l6ZScsICdlZGdlLmxhYmVsLmZvbnRTaXplJ10sXHJcbiAgICAgICAgICAgIFsnZmlsbCcsICdlZGdlLmxhYmVsLmNvbG9yJ11cclxuICAgICAgICBdKStcclxuXHJcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMuZWRnZVNlbGVjdG9yKCkrJyAucGF5b2ZmJyxbXHJcbiAgICAgICAgICAgIFsnZm9udC1zaXplJywgJ2VkZ2UucGF5b2ZmLmZvbnRTaXplJ10sXHJcbiAgICAgICAgICAgIFsnZmlsbCcsICdlZGdlLnBheW9mZi5jb2xvciddLFxyXG4gICAgICAgIF0pK1xyXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLmVkZ2VTZWxlY3RvcigpKycgLnBheW9mZi5uZWdhdGl2ZScsW1xyXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnZWRnZS5wYXlvZmYubmVnYXRpdmVDb2xvciddLFxyXG4gICAgICAgIF0pK1xyXG5cclxuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy50cmVlRGVzaWduZXJTZWxlY3RvcisnIC5zZC10aXRsZS1jb250YWluZXIgdGV4dC5zZC10aXRsZScsW1xyXG4gICAgICAgICAgICBbJ2ZvbnQtc2l6ZScsICd0aXRsZS5mb250U2l6ZSddLFxyXG4gICAgICAgICAgICBbJ2ZvbnQtd2VpZ2h0JywgJ3RpdGxlLmZvbnRXZWlnaHQnXSxcclxuICAgICAgICAgICAgWydmb250LXN0eWxlJywgJ3RpdGxlLmZvbnRTdHlsZSddLFxyXG4gICAgICAgICAgICBbJ2ZpbGwnLCAndGl0bGUuY29sb3InXVxyXG4gICAgICAgIF0pICtcclxuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy50cmVlRGVzaWduZXJTZWxlY3RvcisnIC5zZC10aXRsZS1jb250YWluZXIgdGV4dC5zZC1kZXNjcmlwdGlvbicsW1xyXG4gICAgICAgICAgICBbJ2ZvbnQtc2l6ZScsICdkZXNjcmlwdGlvbi5mb250U2l6ZSddLFxyXG4gICAgICAgICAgICBbJ2ZvbnQtd2VpZ2h0JywgJ2Rlc2NyaXB0aW9uLmZvbnRXZWlnaHQnXSxcclxuICAgICAgICAgICAgWydmb250LXN0eWxlJywgJ2Rlc2NyaXB0aW9uLmZvbnRTdHlsZSddLFxyXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnZGVzY3JpcHRpb24uY29sb3InXVxyXG4gICAgICAgIF0pXHJcbn1cclxuXHJcblxyXG5cclxuXHJcbiIsIm1vZHVsZS5leHBvcnRzID0gXCJtb2R1bGUuZXhwb3J0cyA9IFxcXCI8ZGl2IGNsYXNzPVxcXFxcXFwic2QtZ3Jvd2wtbWVzc2FnZSA8JT10eXBlJT5cXFxcXFxcIj5cXFxcclxcXFxuICAgIDxkaXYgY2xhc3M9XFxcXFxcXCJzZC1ncm93bC1tZXNzYWdlLXRleHRcXFxcXFxcIj5cXFxcclxcXFxuICAgICAgICA8JT0gbWVzc2FnZSAlPlxcXFxyXFxcXG4gICAgPC9kaXY+XFxcXHJcXFxcbjwvZGl2PlxcXFxyXFxcXG5cXFwiO1xcblwiO1xuIiwiaW1wb3J0IHtBcHBVdGlsc30gZnJvbSAnLi9hcHAtdXRpbHMnXHJcbmltcG9ydCAqIGFzIGQzIGZyb20gJy4vZDMnXHJcbmltcG9ydCB7Q29udGV4dE1lbnV9IGZyb20gJy4vY29udGV4dC1tZW51L2NvbnRleHQtbWVudSdcclxuXHJcbmV4cG9ydCBjbGFzcyBUZXh0RHJhZ0hhbmRsZXJ7XHJcblxyXG4gICAgdHJlZURlc2lnbmVyO1xyXG4gICAgZGF0YTtcclxuICAgIGNvbmZpZztcclxuXHJcbiAgICBkcmFnO1xyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih0cmVlRGVzaWduZXIsIGRhdGEpe1xyXG4gICAgICAgIHRoaXMudHJlZURlc2lnbmVyID0gdHJlZURlc2lnbmVyO1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcblxyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLmRyYWcgPSBkMy5kcmFnKClcclxuICAgICAgICAgICAgLnN1YmplY3QoZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgaWYoZD09bnVsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IGV2ZW50LngsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IGV2ZW50LnlcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIHQgPSBkMy5zZWxlY3QodGhpcyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHg6IHQuYXR0cihcInhcIikgKyBBcHBVdGlscy5nZXRUcmFuc2xhdGlvbih0LmF0dHIoXCJ0cmFuc2Zvcm1cIikpWzBdLFxyXG4gICAgICAgICAgICAgICAgICAgIHk6IHQuYXR0cihcInlcIikgKyBBcHBVdGlscy5nZXRUcmFuc2xhdGlvbih0LmF0dHIoXCJ0cmFuc2Zvcm1cIikpWzFdXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAub24oXCJzdGFydFwiLCBmdW5jdGlvbihkKXtcclxuICAgICAgICAgICAgICAgIHNlbGYuZHJhZ1N0YXJ0ZWQuY2FsbCh0aGlzLGQsIHNlbGYpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5vbihcImRyYWdcIiwgZnVuY3Rpb24gKGQpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYub25EcmFnLmNhbGwodGhpcywgZCwgc2VsZik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5vbihcImVuZFwiLCBmdW5jdGlvbiAoZCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5kcmFnRW5kZWQuY2FsbCh0aGlzLCBkLCBzZWxmKTtcclxuICAgICAgICAgICAgfSlcclxuICAgIH1cclxuXHJcblxyXG4gICAgZHJhZ1N0YXJ0ZWQoZCxzZWxmKSB7XHJcbiAgICAgICAgLy8gc2VsZi50cmVlRGVzaWduZXIubGF5b3V0LmRpc2FibGVBdXRvTGF5b3V0KCk7XHJcbiAgICAgICAgQ29udGV4dE1lbnUuaGlkZSgpO1xyXG4gICAgICAgIHZhciB0ZXh0ID0gZDMuc2VsZWN0KHRoaXMpO1xyXG4gICAgICAgIGlmKCF0ZXh0LmNsYXNzZWQoXCJzZWxlY3RlZFwiKSl7XHJcbiAgICAgICAgICAgIHNlbGYudHJlZURlc2lnbmVyLmNsZWFyU2VsZWN0aW9uKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxmLnRyZWVEZXNpZ25lci5zZWxlY3RUZXh0KGQpO1xyXG4gICAgICAgIHRleHQuY2xhc3NlZChcInNlbGVjdGVkIGRyYWdnaW5nXCIsIHRydWUpO1xyXG4gICAgICAgIHNlbGYuc2VsZWN0ZWROb2RlcyA9IHNlbGYudHJlZURlc2lnbmVyLmdldFNlbGVjdGVkTm9kZXMoKTtcclxuICAgICAgICBzZWxmLnByZXZEcmFnRXZlbnQgPSBkMy5ldmVudDtcclxuICAgICAgICBzZWxmLmRyYWdFdmVudENvdW50ID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBvbkRyYWcoZHJhZ2dlZFRleHQsIHNlbGYpe1xyXG4gICAgICAgIGlmKHNlbGYuZHJhZ0V2ZW50Q291bnQ9PTIpe1xyXG4gICAgICAgICAgICBzZWxmLmRhdGEuc2F2ZVN0YXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlbGYuZHJhZ0V2ZW50Q291bnQrKztcclxuXHJcbiAgICAgICAgdmFyIGR4ID0gZDMuZXZlbnQueCAtIHNlbGYucHJldkRyYWdFdmVudC54O1xyXG4gICAgICAgIHZhciBkeSA9IGQzLmV2ZW50LnktIHNlbGYucHJldkRyYWdFdmVudC55O1xyXG5cclxuICAgICAgICBzZWxmLnRyZWVEZXNpZ25lci5sYXlvdXQubW92ZVRleHRzKFtkcmFnZ2VkVGV4dF0sIGR4LCBkeSk7XHJcblxyXG4gICAgICAgIHNlbGYucHJldkRyYWdFdmVudCA9IGQzLmV2ZW50O1xyXG4gICAgICAgIHNlbGYudHJlZURlc2lnbmVyLnVwZGF0ZVBsb3R0aW5nUmVnaW9uU2l6ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYWdFbmRlZChkcmFnZ2VkTm9kZSwgc2VsZil7XHJcbiAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5jbGFzc2VkKFwiZHJhZ2dpbmdcIiwgZmFsc2UpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcbiIsImltcG9ydCAqIGFzIGQzIGZyb20gJy4vZDMnXHJcbmltcG9ydCB7VXRpbHN9IGZyb20gJ3NkLXV0aWxzJ1xyXG5cclxuZXhwb3J0IGNsYXNzIFRvb2x0aXAge1xyXG4gICAgc3RhdGljIGdldENvbnRhaW5lcigpe1xyXG4gICAgICAgIHJldHVybiBkMy5zZWxlY3QoXCJib2R5XCIpLnNlbGVjdE9yQXBwZW5kKCdkaXYuc2QtdG9vbHRpcCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBzaG93KGh0bWwsIHhPZmZzZXQgPSA1LCB5T2Zmc2V0ID0gMjgsIGV2ZW50LCBkdXJhdGlvbj1udWxsKSB7XHJcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IFRvb2x0aXAuZ2V0Q29udGFpbmVyKClcclxuICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCAwKTtcclxuICAgICAgICBjb250YWluZXIudHJhbnNpdGlvbigpXHJcbiAgICAgICAgICAgIC5kdXJhdGlvbigyMDApXHJcbiAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgLjk4KTtcclxuICAgICAgICBjb250YWluZXIuaHRtbChodG1sKTtcclxuICAgICAgICBUb29sdGlwLnVwZGF0ZVBvc2l0aW9uKHhPZmZzZXQsIHlPZmZzZXQsIGV2ZW50KTtcclxuICAgICAgICBpZihkdXJhdGlvbil7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIFRvb2x0aXAuaGlkZSgpO1xyXG4gICAgICAgICAgICB9LCBkdXJhdGlvbilcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHVwZGF0ZVBvc2l0aW9uKHhPZmZzZXQgPSA1LCB5T2Zmc2V0ID0gMjgsIGV2ZW50KSB7XHJcbiAgICAgICAgZXZlbnQgPSBldmVudCB8fCBkMy5ldmVudDtcclxuICAgICAgICBUb29sdGlwLmdldENvbnRhaW5lcigpXHJcbiAgICAgICAgICAgIC5zdHlsZShcImxlZnRcIiwgKGV2ZW50LnBhZ2VYICsgeE9mZnNldCkgKyBcInB4XCIpXHJcbiAgICAgICAgICAgIC5zdHlsZShcInRvcFwiLCAoZXZlbnQucGFnZVkgLSB5T2Zmc2V0KSArIFwicHhcIik7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGhpZGUoZHVyYXRpb24gPSA1MDApIHtcclxuICAgICAgICB2YXIgdCA9IFRvb2x0aXAuZ2V0Q29udGFpbmVyKCk7XHJcbiAgICAgICAgaWYoZHVyYXRpb24pe1xyXG4gICAgICAgICAgICB0ID0gdC50cmFuc2l0aW9uKCkuZHVyYXRpb24oZHVyYXRpb24pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHQuc3R5bGUoXCJvcGFjaXR5XCIsIDApO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBhdHRhY2godGFyZ2V0LCBodG1sT3JGbiwgeE9mZnNldCwgeU9mZnNldCkge1xyXG4gICAgICAgIHRhcmdldC5vbignbW91c2VvdmVyJywgZnVuY3Rpb24gKGQsIGkpIHtcclxuICAgICAgICAgICAgdmFyIGh0bWwgPSBudWxsO1xyXG4gICAgICAgICAgICBpZiAoVXRpbHMuaXNGdW5jdGlvbihodG1sT3JGbikpIHtcclxuICAgICAgICAgICAgICAgIGh0bWwgPSBodG1sT3JGbihkLCBpKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGh0bWwgPSBodG1sT3JGbjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGh0bWwgIT09IG51bGwgJiYgaHRtbCAhPT0gdW5kZWZpbmVkICYmIGh0bWwgIT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICBUb29sdGlwLnNob3coaHRtbCwgeE9mZnNldCwgeU9mZnNldCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgVG9vbHRpcC5oaWRlKDApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pLm9uKCdtb3VzZW1vdmUnLCBmdW5jdGlvbiAoZCkge1xyXG4gICAgICAgICAgICBUb29sdGlwLnVwZGF0ZVBvc2l0aW9uKHhPZmZzZXQsIHlPZmZzZXQpO1xyXG4gICAgICAgIH0pLm9uKFwibW91c2VvdXRcIiwgZnVuY3Rpb24gKGQpIHtcclxuICAgICAgICAgICAgVG9vbHRpcC5oaWRlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgZDMgZnJvbSBcIi4vZDNcIjtcclxuaW1wb3J0IHtVdGlsc30gZnJvbSBcInNkLXV0aWxzXCI7XHJcbmltcG9ydCB7QXBwVXRpbHN9IGZyb20gXCIuL2FwcC11dGlsc1wiO1xyXG5pbXBvcnQge2RvbWFpbiBhcyBtb2RlbH0gZnJvbSBcInNkLW1vZGVsXCI7XHJcbmltcG9ydCB7Q29udGV4dE1lbnV9IGZyb20gXCIuL2NvbnRleHQtbWVudS9jb250ZXh0LW1lbnVcIjtcclxuaW1wb3J0IHtNYWluQ29udGV4dE1lbnV9IGZyb20gXCIuL2NvbnRleHQtbWVudS9tYWluLWNvbnRleHQtbWVudVwiO1xyXG5pbXBvcnQge05vZGVDb250ZXh0TWVudX0gZnJvbSBcIi4vY29udGV4dC1tZW51L25vZGUtY29udGV4dC1tZW51XCI7XHJcbmltcG9ydCB7TGF5b3V0fSBmcm9tIFwiLi9sYXlvdXRcIjtcclxuaW1wb3J0IHtOb2RlRHJhZ0hhbmRsZXJ9IGZyb20gXCIuL25vZGUtZHJhZy1oYW5kbGVyXCI7XHJcbmltcG9ydCB7VG9vbHRpcH0gZnJvbSBcIi4vdG9vbHRpcFwiO1xyXG5pbXBvcnQge1RlbXBsYXRlc30gZnJvbSBcIi4vdGVtcGxhdGVzXCI7XHJcbmltcG9ydCB7VGV4dERyYWdIYW5kbGVyfSBmcm9tIFwiLi90ZXh0LWRyYWctaGFuZGxlclwiO1xyXG5pbXBvcnQge1RleHRDb250ZXh0TWVudX0gZnJvbSBcIi4vY29udGV4dC1tZW51L3RleHQtY29udGV4dC1tZW51XCI7XHJcbmltcG9ydCB7RWRnZUNvbnRleHRNZW51fSBmcm9tIFwiLi9jb250ZXh0LW1lbnUvZWRnZS1jb250ZXh0LW1lbnVcIjtcclxuaW1wb3J0ICogYXMgSGFtbWVyIGZyb20gXCJoYW1tZXJqc1wiO1xyXG5pbXBvcnQge2kxOG59IGZyb20gXCIuL2kxOG4vaTE4blwiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBUcmVlRGVzaWduZXJDb25maWcge1xyXG4gICAgd2lkdGggPSB1bmRlZmluZWQ7XHJcbiAgICBoZWlnaHQgPSB1bmRlZmluZWQ7XHJcbiAgICBtYXJnaW4gPSB7XHJcbiAgICAgICAgbGVmdDogMjUsXHJcbiAgICAgICAgcmlnaHQ6IDI1LFxyXG4gICAgICAgIHRvcDogMjUsXHJcbiAgICAgICAgYm90dG9tOiAyNVxyXG4gICAgfTtcclxuICAgIHNjYWxlID0gMTtcclxuICAgIGxuZyA9ICdlbic7XHJcbiAgICBsYXlvdXQ9IHtcclxuICAgICAgICB0eXBlOiAndHJlZScsXHJcbiAgICAgICAgbm9kZVNpemU6IDQwLFxyXG4gICAgICAgIGxpbWl0Tm9kZVBvc2l0aW9uaW5nOiB0cnVlLFxyXG4gICAgICAgIGxpbWl0VGV4dFBvc2l0aW9uaW5nOiB0cnVlLFxyXG4gICAgICAgIGdyaWRIZWlnaHQ6IDc1LFxyXG4gICAgICAgIGdyaWRXaWR0aDogMTUwLFxyXG4gICAgICAgIGVkZ2VTbGFudFdpZHRoTWF4OiAyMFxyXG4gICAgfTtcclxuICAgIGZvbnRGYW1pbHkgPSAnc2Fucy1zZXJpZic7XHJcbiAgICBmb250U2l6ZSA9ICcxMnB4JztcclxuICAgIGZvbnRXZWlnaHQgPSAnbm9ybWFsJztcclxuICAgIGZvbnRTdHlsZSA9ICdub3JtYWwnO1xyXG4gICAgbm9kZSA9IHtcclxuICAgICAgICBzdHJva2VXaWR0aDogJzFweCcsXHJcbiAgICAgICAgb3B0aW1hbDoge1xyXG4gICAgICAgICAgICBzdHJva2U6ICcjMDA2ZjAwJyxcclxuICAgICAgICAgICAgc3Ryb2tlV2lkdGg6ICcxLjVweCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYWJlbDoge1xyXG4gICAgICAgICAgICBmb250U2l6ZTogJzFlbScsXHJcbiAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwYXlvZmY6IHtcclxuICAgICAgICAgICAgZm9udFNpemU6ICcxZW0nLFxyXG4gICAgICAgICAgICBjb2xvcjogJ2JsYWNrJyxcclxuICAgICAgICAgICAgbmVnYXRpdmVDb2xvcjogJyNiNjAwMDAnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBkZWNpc2lvbjoge1xyXG4gICAgICAgICAgICBmaWxsOiAnI2ZmNzc3NycsXHJcbiAgICAgICAgICAgIHN0cm9rZTogJyM2NjAwMDAnLFxyXG5cclxuICAgICAgICAgICAgc2VsZWN0ZWQ6IHtcclxuICAgICAgICAgICAgICAgIGZpbGw6ICcjYWEzMzMzJyxcclxuICAgICAgICAgICAgICAgIC8vIHN0cm9rZTogJyM2NjY2MDAnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGNoYW5jZToge1xyXG4gICAgICAgICAgICBmaWxsOiAnI2ZmZmY0NCcsXHJcbiAgICAgICAgICAgIHN0cm9rZTogJyM2NjY2MDAnLFxyXG5cclxuICAgICAgICAgICAgc2VsZWN0ZWQ6IHtcclxuICAgICAgICAgICAgICAgIGZpbGw6ICcjYWFhYTAwJyxcclxuICAgICAgICAgICAgICAgIC8vIHN0cm9rZTogJyM2NjY2MDAnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHRlcm1pbmFsOntcclxuICAgICAgICAgICAgZmlsbDogJyM0NGZmNDQnLFxyXG4gICAgICAgICAgICBzdHJva2U6ICdibGFjaycsXHJcbiAgICAgICAgICAgIHNlbGVjdGVkOiB7XHJcbiAgICAgICAgICAgICAgICBmaWxsOiAnIzAwYWEwMCcsXHJcbiAgICAgICAgICAgICAgICAvLyBzdHJva2U6ICdibGFjaydcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcGF5b2ZmOiB7XHJcbiAgICAgICAgICAgICAgICBmb250U2l6ZTogJzFlbScsXHJcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJyxcclxuICAgICAgICAgICAgICAgIG5lZ2F0aXZlQ29sb3I6ICcjYjYwMDAwJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBlZGdlPXtcclxuICAgICAgICBzdHJva2U6ICcjNDI0MjQyJyxcclxuICAgICAgICBzdHJva2VXaWR0aDogJzEuNScsXHJcbiAgICAgICAgb3B0aW1hbDp7XHJcbiAgICAgICAgICAgIHN0cm9rZTogJyMwMDZmMDAnLFxyXG4gICAgICAgICAgICBzdHJva2VXaWR0aDogJzIuNCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZWxlY3RlZDp7XHJcbiAgICAgICAgICAgIHN0cm9rZTogJyMwNDVhZDEnLFxyXG4gICAgICAgICAgICBzdHJva2VXaWR0aDogJzMuNScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYWJlbDoge1xyXG4gICAgICAgICAgICBmb250U2l6ZTogJzFlbScsXHJcbiAgICAgICAgICAgIGNvbG9yOiAnYmFjaydcclxuICAgICAgICB9LFxyXG4gICAgICAgIHBheW9mZjp7XHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMWVtJyxcclxuICAgICAgICAgICAgY29sb3I6ICdibGFjaycsXHJcbiAgICAgICAgICAgIG5lZ2F0aXZlQ29sb3I6ICcjYjYwMDAwJ1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG4gICAgcHJvYmFiaWxpdHkgPSB7XHJcbiAgICAgICAgZm9udFNpemU6ICcxZW0nLFxyXG4gICAgICAgIGNvbG9yOiAnIzAwMDBkNydcclxuICAgIH07XHJcbiAgICB0aXRsZSA9IHtcclxuICAgICAgICBmb250U2l6ZTogJzE2cHgnLFxyXG4gICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcclxuICAgICAgICBmb250U3R5bGU6ICdub3JtYWwnLFxyXG4gICAgICAgIGNvbG9yOiAnIzAwMDAwMCcsXHJcbiAgICAgICAgbWFyZ2luOntcclxuICAgICAgICAgICAgdG9wOiAxNSxcclxuICAgICAgICAgICAgYm90dG9tOiAxMFxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBkZXNjcmlwdGlvbiA9IHtcclxuICAgICAgICBzaG93OiB0cnVlLFxyXG4gICAgICAgIGZvbnRTaXplOiAnMTJweCcsXHJcbiAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxyXG4gICAgICAgIGZvbnRTdHlsZTogJ25vcm1hbCcsXHJcbiAgICAgICAgY29sb3I6ICcjMDAwMDAwJyxcclxuICAgICAgICBtYXJnaW46e1xyXG4gICAgICAgICAgICB0b3A6IDUsXHJcbiAgICAgICAgICAgIGJvdHRvbTogMTBcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHJlYWRPbmx5PSBmYWxzZTtcclxuICAgIGRpc2FibGVBbmltYXRpb25zPWZhbHNlO1xyXG4gICAgZm9yY2VGdWxsRWRnZVJlZHJhdz1mYWxzZTtcclxuICAgIGhpZGVMYWJlbHM9ZmFsc2U7XHJcbiAgICBoaWRlUGF5b2Zmcz1mYWxzZTtcclxuICAgIGhpZGVQcm9iYWJpbGl0aWVzPWZhbHNlO1xyXG4gICAgcmF3PWZhbHNlO1xyXG5cclxuXHJcbiAgICBwYXlvZmZOdW1iZXJGb3JtYXR0ZXIgPSAodiwgaSk9PiB2O1xyXG4gICAgcHJvYmFiaWxpdHlOdW1iZXJGb3JtYXR0ZXIgID0gKHYpPT4gdjtcclxuXHJcbiAgICBvbk5vZGVTZWxlY3RlZCA9IChub2RlKSA9PiB7fTtcclxuICAgIG9uRWRnZVNlbGVjdGVkID0gKGVkZ2UpID0+IHt9O1xyXG4gICAgb25UZXh0U2VsZWN0ZWQgPSAodGV4dCkgPT4ge307XHJcbiAgICBvblNlbGVjdGlvbkNsZWFyZWQgPSAoKSA9PiB7fTtcclxuXHJcbiAgICBvcGVyYXRpb25zRm9yT2JqZWN0ID0gKG8pID0+IFtdO1xyXG4gICAgcGVyZm9ybU9wZXJhdGlvbiA9IChvYmplY3QsIG9wZXJhdGlvbikgPT4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcblxyXG4gICAgcGF5b2ZmTmFtZXMgPSBbbnVsbCwgbnVsbF07XHJcbiAgICBtYXhQYXlvZmZzVG9EaXNwbGF5ID0gMTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihjdXN0b20pIHtcclxuICAgICAgICBpZiAoY3VzdG9tKSB7XHJcbiAgICAgICAgICAgIFV0aWxzLmRlZXBFeHRlbmQodGhpcywgY3VzdG9tKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgVHJlZURlc2lnbmVyIHtcclxuXHJcbiAgICBjb25maWc7XHJcbiAgICBjb250YWluZXI7XHJcbiAgICBkYXRhOyAvL2RhdGEgbW9kZWwgbWFuYWdlclxyXG4gICAgc3ZnO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbnRhaW5lciwgZGF0YU1vZGVsLCBjb25maWcpe1xyXG4gICAgICAgIHRoaXMuc2V0Q29uZmlnKGNvbmZpZyk7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YU1vZGVsO1xyXG4gICAgICAgIHRoaXMuaW5pdENvbnRhaW5lcihjb250YWluZXIpO1xyXG4gICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldENvbmZpZyhjb25maWcpIHtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IG5ldyBUcmVlRGVzaWduZXJDb25maWcoY29uZmlnKTtcclxuICAgICAgICBpZih0aGlzLmxheW91dCl7XHJcbiAgICAgICAgICAgIHRoaXMubGF5b3V0LmNvbmZpZz10aGlzLmNvbmZpZy5sYXlvdXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudXBkYXRlQ3VzdG9tU3R5bGVzKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdCgpe1xyXG5cclxuICAgICAgICB0aGlzLmluaXRTdmcoKTtcclxuICAgICAgICB0aGlzLmluaXRMYXlvdXQoKTtcclxuICAgICAgICB0aGlzLmluaXRJMThuKCk7XHJcbiAgICAgICAgdGhpcy5pbml0QnJ1c2goKTtcclxuICAgICAgICB0aGlzLmluaXRFZGdlTWFya2VycygpO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZUN1c3RvbVN0eWxlcygpO1xyXG4gICAgICAgIGlmKCF0aGlzLmNvbmZpZy5yZWFkT25seSl7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdE1haW5Db250ZXh0TWVudSgpO1xyXG4gICAgICAgICAgICB0aGlzLmluaXROb2RlQ29udGV4dE1lbnUoKTtcclxuICAgICAgICAgICAgdGhpcy5pbml0RWRnZUNvbnRleHRNZW51KCk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdE5vZGVEcmFnSGFuZGxlcigpO1xyXG4gICAgICAgICAgICB0aGlzLmluaXRUZXh0RHJhZ0hhbmRsZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5pbml0VGV4dENvbnRleHRNZW51KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVkcmF3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdEkxOG4oKSB7XHJcbiAgICAgICAgaTE4bi5pbml0KHRoaXMuY29uZmlnLmxuZyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHVwZGF0ZUN1c3RvbVN0eWxlcygpe1xyXG4gICAgICAgIGQzLnNlbGVjdCgnaGVhZCcpLnNlbGVjdE9yQXBwZW5kKCdzdHlsZSNzZC10cmVlLWRlc2lnbmVyLXN0eWxlJykuaHRtbChUZW1wbGF0ZXMuZ2V0KCd0cmVlRGVzaWduZXJTdHlsZXMnLCB0aGlzLmNvbmZpZykpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRMYXlvdXQoKXtcclxuICAgICAgICB0aGlzLmxheW91dCA9IG5ldyBMYXlvdXQodGhpcywgdGhpcy5kYXRhLCB0aGlzLmNvbmZpZy5sYXlvdXQpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXROb2RlRHJhZ0hhbmRsZXIoKXtcclxuICAgICAgICB0aGlzLm5vZGVEcmFnSGFuZGxlciA9IG5ldyBOb2RlRHJhZ0hhbmRsZXIodGhpcywgdGhpcy5kYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0VGV4dERyYWdIYW5kbGVyKCl7XHJcbiAgICAgICAgdGhpcy50ZXh0RHJhZ0hhbmRsZXIgPSBuZXcgVGV4dERyYWdIYW5kbGVyKHRoaXMsIHRoaXMuZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVkcmF3KHdpdGhUcmFuc2l0aW9ucz1mYWxzZSl7XHJcblxyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICB3aXRoVHJhbnNpdGlvbnMgPSAhc2VsZi5jb25maWcuZGlzYWJsZUFuaW1hdGlvbnMgJiYgd2l0aFRyYW5zaXRpb25zO1xyXG4gICAgICAgIHRoaXMucmVkcmF3RGlhZ3JhbVRpdGxlKCk7XHJcbiAgICAgICAgdGhpcy5yZWRyYXdEaWFncmFtRGVzY3JpcHRpb24oKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNjYWxlKHdpdGhUcmFuc2l0aW9ucyk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVNYXJnaW4od2l0aFRyYW5zaXRpb25zKTtcclxuICAgICAgICBpZih3aXRoVHJhbnNpdGlvbnMpe1xyXG4gICAgICAgICAgICBzZWxmLnRyYW5zaXRpb25QcmV2ID0gc2VsZi50cmFuc2l0aW9uO1xyXG4gICAgICAgICAgICBzZWxmLnRyYW5zaXRpb24gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlZHJhd05vZGVzKCk7XHJcbiAgICAgICAgdGhpcy5yZWRyYXdFZGdlcygpO1xyXG4gICAgICAgIHRoaXMucmVkcmF3RmxvYXRpbmdUZXh0cygpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlVmFsaWRhdGlvbk1lc3NhZ2VzKCk7XHJcbiAgICAgICAgaWYod2l0aFRyYW5zaXRpb25zKXtcclxuICAgICAgICAgICAgc2VsZi50cmFuc2l0aW9uID0gIHNlbGYudHJhbnNpdGlvblByZXY7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgc2VsZi51cGRhdGVQbG90dGluZ1JlZ2lvblNpemUoKTtcclxuICAgICAgICB9LDEwKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcHV0ZUF2YWlsYWJsZVNwYWNlKCl7XHJcbiAgICAgICAgdGhpcy5hdmFpbGFibGVIZWlnaHQgPSBBcHBVdGlscy5zYW5pdGl6ZUhlaWdodCh0aGlzLmNvbmZpZy5oZWlnaHQsIHRoaXMuY29udGFpbmVyLCB0aGlzLmNvbmZpZy5tYXJnaW4pO1xyXG4gICAgICAgIHRoaXMuYXZhaWxhYmxlV2lkdGggPSBBcHBVdGlscy5zYW5pdGl6ZVdpZHRoKHRoaXMuY29uZmlnLndpZHRoLCB0aGlzLmNvbnRhaW5lciwgdGhpcy5jb25maWcubWFyZ2luKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0U3ZnKCkge1xyXG4gICAgICAgIHZhciBjID0gdGhpcztcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5jb21wdXRlQXZhaWxhYmxlU3BhY2UoKTtcclxuICAgICAgICB0aGlzLnN2ZyA9IHRoaXMuY29udGFpbmVyLnNlbGVjdE9yQXBwZW5kKCdzdmcuc2QtdHJlZS1kZXNpZ25lcicpO1xyXG4gICAgICAgIHRoaXMuc3ZnLmF0dHIoJ3dpZHRoJywgdGhpcy5hdmFpbGFibGVXaWR0aCkuYXR0cignaGVpZ2h0JywgdGhpcy5hdmFpbGFibGVIZWlnaHQpO1xyXG5cclxuICAgICAgICB0aGlzLndyYXBwZXJHcm91cCA9IHRoaXMuc3ZnLnNlbGVjdE9yQXBwZW5kKCdnLnNkLXdyYXBwZXItZ3JvdXAnKTtcclxuICAgICAgICB0aGlzLm1haW5Hcm91cCA9IHRoaXMud3JhcHBlckdyb3VwLnNlbGVjdE9yQXBwZW5kKCdnLm1haW4tZ3JvdXAnKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNjYWxlKCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVNYXJnaW4oKTtcclxuXHJcblxyXG4gICAgICAgIGlmICghdGhpcy5jb25maWcud2lkdGgpIHtcclxuICAgICAgICAgICAgZDMuc2VsZWN0KHdpbmRvdylcclxuICAgICAgICAgICAgICAgIC5vbihcInJlc2l6ZS50cmVlLWRlc2lnbmVyXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnVwZGF0ZVBsb3R0aW5nUmVnaW9uU2l6ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYucmVkcmF3RGlhZ3JhbVRpdGxlKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBtYyA9IG5ldyBIYW1tZXIuTWFuYWdlcih0aGlzLnN2Zy5ub2RlKCksIHt0b3VjaEFjdGlvbiA6ICdhdXRvJ30pO1xyXG4gICAgICAgIG1jLmFkZChuZXcgSGFtbWVyLlByZXNzKHtcclxuICAgICAgICAgICAgcG9pbnRlclR5cGU6ICd0b3VjaCdcclxuICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIG1jLmFkZChuZXcgSGFtbWVyLlBpbmNoKHtcclxuICAgICAgICAgICAgcG9pbnRlclR5cGU6ICd0b3VjaCdcclxuICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIHZhciBjYW5jZWw7XHJcbiAgICAgICAgbWMub24oJ3BpbmNoc3RhcnQnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBzZWxmLmRpc2FibGVCcnVzaCgpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgbWMub24oJ3BpbmNoJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgY2FuY2VsID0gVXRpbHMud2FpdEZvckZpbmFsRXZlbnQoKCk9PnNlbGYuZW5hYmxlQnJ1c2goKSwgJ3BpbmNoZW5kJywgNTAwMClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZU1hcmdpbih3aXRoVHJhbnNpdGlvbnMpe1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICB2YXIgbWFyZ2luID0gdGhpcy5jb25maWcubWFyZ2luO1xyXG4gICAgICAgIHZhciBncm91cCA9IHRoaXMubWFpbkdyb3VwO1xyXG4gICAgICAgIGlmKHdpdGhUcmFuc2l0aW9ucyl7XHJcbiAgICAgICAgICAgIGdyb3VwID0gZ3JvdXAudHJhbnNpdGlvbigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy50b3BNYXJnaW4gPSBtYXJnaW4udG9wO1xyXG4gICAgICAgIGlmKHRoaXMuZGlhZ3JhbVRpdGxlfHx0aGlzLmRpYWdyYW1EZXNjcmlwdGlvbil7XHJcbiAgICAgICAgICAgIHRoaXMudG9wTWFyZ2luID0gcGFyc2VJbnQodGhpcy5kaWFncmFtVGl0bGUgPyB0aGlzLmNvbmZpZy50aXRsZS5tYXJnaW4udG9wIDogMCkgKyB0aGlzLmdldFRpdGxlR3JvdXBIZWlnaHQoKVxyXG4gICAgICAgICAgICAgICAgKyAgTWF0aC5tYXgodGhpcy50b3BNYXJnaW4sIHBhcnNlSW50KHRoaXMuY29uZmlnLnRpdGxlLm1hcmdpbi5ib3R0b20pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdyb3VwLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoXCIgKyBtYXJnaW4ubGVmdCArIFwiLFwiICsgdGhpcy50b3BNYXJnaW4gKyBcIilcIikub24oXCJlbmRcIiwgKCk9PiBzZWxmLnVwZGF0ZVBsb3R0aW5nUmVnaW9uU2l6ZSgpKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRNYXJnaW4obWFyZ2luLCB3aXRob3V0U3RhdGVTYXZpbmcpe1xyXG4gICAgICAgIHZhciBzZWxmPXRoaXM7XHJcbiAgICAgICAgaWYoIXdpdGhvdXRTdGF0ZVNhdmluZyl7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgZGF0YTp7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luOiBVdGlscy5jbG9uZShzZWxmLmNvbmZpZy5tYXJnaW4pXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgb25VbmRvOiAoZGF0YSk9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRNYXJnaW4oZGF0YS5tYXJnaW4sIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG9uUmVkbzogKGRhdGEpPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0TWFyZ2luKG1hcmdpbiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBVdGlscy5kZWVwRXh0ZW5kKHRoaXMuY29uZmlnLm1hcmdpbiwgbWFyZ2luKTtcclxuICAgICAgICB0aGlzLnJlZHJhd0RpYWdyYW1UaXRsZSgpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlTWFyZ2luKHRydWUpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICB1cGRhdGVTY2FsZSh3aXRoVHJhbnNpdGlvbnMpe1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICB2YXIgc2NhbGUgPSB0aGlzLmNvbmZpZy5zY2FsZTtcclxuICAgICAgICB2YXIgZ3JvdXAgPSB0aGlzLndyYXBwZXJHcm91cDtcclxuICAgICAgICBpZih3aXRoVHJhbnNpdGlvbnMpe1xyXG4gICAgICAgICAgICBncm91cCA9IGdyb3VwLnRyYW5zaXRpb24oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdyb3VwLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJzY2FsZShcIiArIHNjYWxlICsgXCIpXCIpLm9uKFwiZW5kXCIsICgpPT4gc2VsZi51cGRhdGVQbG90dGluZ1JlZ2lvblNpemUoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U2NhbGUoc2NhbGUsIHdpdGhvdXRTdGF0ZVNhdmluZyl7XHJcbiAgICAgICAgdmFyIHNlbGY9dGhpcztcclxuICAgICAgICBpZighd2l0aG91dFN0YXRlU2F2aW5nKXtcclxuICAgICAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBkYXRhOntcclxuICAgICAgICAgICAgICAgICAgICBzY2FsZTogVXRpbHMuY2xvbmUoc2VsZi5jb25maWcuc2NhbGUpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgb25VbmRvOiAoZGF0YSk9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRTY2FsZShkYXRhLnNjYWxlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBvblJlZG86IChkYXRhKT0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldFNjYWxlKHNjYWxlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY29uZmlnLnNjYWxlID0gc2NhbGU7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTY2FsZSh0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0Q29udGFpbmVyKGNvbnRhaW5lcklkT3JFbGVtKSB7XHJcbiAgICAgICAgaWYgKFV0aWxzLmlzU3RyaW5nKGNvbnRhaW5lcklkT3JFbGVtKSkge1xyXG4gICAgICAgICAgICB2YXIgc2VsZWN0b3IgPSBjb250YWluZXJJZE9yRWxlbS50cmltKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIVV0aWxzLnN0YXJ0c1dpdGgoc2VsZWN0b3IsICcjJykgJiYgIVV0aWxzLnN0YXJ0c1dpdGgoc2VsZWN0b3IsICcuJykpIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdG9yID0gJyMnICsgc2VsZWN0b3I7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIgPSBkMy5zZWxlY3Qoc2VsZWN0b3IpO1xyXG4gICAgICAgIH0gZWxzZSBpZihjb250YWluZXJJZE9yRWxlbS5fcGFyZW50cyl7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVySWRPckVsZW1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIgPSBkMy5zZWxlY3QoY29udGFpbmVySWRPckVsZW0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVQbG90dGluZ1JlZ2lvblNpemUoKSB7XHJcbiAgICAgICAgdmFyIGNoYW5nZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNvbXB1dGVBdmFpbGFibGVTcGFjZSgpO1xyXG4gICAgICAgIHZhciBtYXJnaW4gPSB0aGlzLmNvbmZpZy5tYXJnaW47XHJcbiAgICAgICAgdmFyIHN2Z1dpZHRoID0gdGhpcy5zdmcuYXR0cignd2lkdGgnKTtcclxuICAgICAgICB2YXIgc3ZnSGVpZ2h0ID0gdGhpcy5zdmcuYXR0cignaGVpZ2h0Jyk7XHJcbiAgICAgICAgdmFyIG1haW5Hcm91cEJveCA9IHRoaXMubWFpbkdyb3VwLm5vZGUoKS5nZXRCQm94KCk7XHJcbiAgICAgICAgbGV0IGJveFdpZHRoID0gbWFpbkdyb3VwQm94LndpZHRoO1xyXG4gICAgICAgIHZhciBuZXdTdmdXaWR0aCA9IGJveFdpZHRoK21haW5Hcm91cEJveC54K21hcmdpbi5sZWZ0K21hcmdpbi5yaWdodDtcclxuICAgICAgICBuZXdTdmdXaWR0aCAgKj0gdGhpcy5jb25maWcuc2NhbGU7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIuY2xhc3NlZCgnd2l0aC1vdmVyZmxvdy14JywgbmV3U3ZnV2lkdGg+PXRoaXMuYXZhaWxhYmxlV2lkdGgpO1xyXG4gICAgICAgIG5ld1N2Z1dpZHRoID0gTWF0aC5tYXgobmV3U3ZnV2lkdGgsIHRoaXMuYXZhaWxhYmxlV2lkdGgpO1xyXG4gICAgICAgIGlmKHN2Z1dpZHRoIT1uZXdTdmdXaWR0aCl7XHJcbiAgICAgICAgICAgIGNoYW5nZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnN2Zy5hdHRyKCd3aWR0aCcsIG5ld1N2Z1dpZHRoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGJveEhlaWdodCA9IG1haW5Hcm91cEJveC5oZWlnaHQ7XHJcbiAgICAgICAgdmFyIG5ld1N2Z0hlaWdodCA9IGJveEhlaWdodCttYWluR3JvdXBCb3gueSt0aGlzLnRvcE1hcmdpbittYXJnaW4uYm90dG9tO1xyXG4gICAgICAgIG5ld1N2Z0hlaWdodCAqPSB0aGlzLmNvbmZpZy5zY2FsZTtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5jbGFzc2VkKCd3aXRoLW92ZXJmbG93LXknLCBuZXdTdmdIZWlnaHQ+PXRoaXMuYXZhaWxhYmxlSGVpZ2h0KTtcclxuICAgICAgICBuZXdTdmdIZWlnaHQgPSBNYXRoLm1heChuZXdTdmdIZWlnaHQsIHRoaXMuYXZhaWxhYmxlSGVpZ2h0KTtcclxuICAgICAgICBpZihzdmdIZWlnaHQhPW5ld1N2Z0hlaWdodCl7XHJcbiAgICAgICAgICAgIGNoYW5nZWQ9dHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5zdmcuYXR0cignaGVpZ2h0JywgbmV3U3ZnSGVpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoY2hhbmdlZCl7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQnJ1c2hFeHRlbnQoKVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJlZHJhd05vZGVzKCkge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcblxyXG4gICAgICAgIHZhciBub2Rlc0NvbnRhaW5lciA9IHRoaXMubWFpbkdyb3VwLnNlbGVjdE9yQXBwZW5kKCdnLm5vZGVzJyk7XHJcbiAgICAgICAgdmFyIG5vZGVzID0gbm9kZXNDb250YWluZXIuc2VsZWN0QWxsKCcubm9kZScpLmRhdGEodGhpcy5kYXRhLm5vZGVzLmZpbHRlcihkPT4hZC4kaGlkZGVuKSwgKGQsaSk9PiBkLmlkKTtcclxuICAgICAgICBub2Rlcy5leGl0KCkucmVtb3ZlKCk7XHJcbiAgICAgICAgdmFyIG5vZGVzRW50ZXIgPSBub2Rlcy5lbnRlcigpLmFwcGVuZCgnZycpXHJcbiAgICAgICAgICAgIC5hdHRyKCdpZCcsIGQ9Pidub2RlLScrZC5pZClcclxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgZD0+ZC50eXBlKyctbm9kZSBub2RlJylcclxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGQ9Pid0cmFuc2xhdGUoJyArIGQubG9jYXRpb24ueCArICcgICcgKyBkLmxvY2F0aW9uLnkgKyAnKScpO1xyXG4gICAgICAgIG5vZGVzRW50ZXIuYXBwZW5kKCdwYXRoJyk7XHJcblxyXG4gICAgICAgIHZhciBsYWJlbEVudGVyID0gbm9kZXNFbnRlci5hcHBlbmQoJ3RleHQnKS5hdHRyKCdjbGFzcycsICdsYWJlbCcpO1xyXG4gICAgICAgIHZhciBwYXlvZmZFbnRlciA9IG5vZGVzRW50ZXIuYXBwZW5kKCd0ZXh0JykuYXR0cignY2xhc3MnLCAncGF5b2ZmIGNvbXB1dGVkJyk7XHJcbiAgICAgICAgdmFyIGluZGljYXRvckVudGVyID0gbm9kZXNFbnRlci5hcHBlbmQoJ3RleHQnKS5hdHRyKCdjbGFzcycsICdlcnJvci1pbmRpY2F0b3InKS50ZXh0KCchIScpO1xyXG4gICAgICAgIHZhciBhZ2dyZWdhdGVkUGF5b2ZmRW50ZXIgPSBub2Rlc0VudGVyLmFwcGVuZCgndGV4dCcpLmF0dHIoJ2NsYXNzJywgJ2FnZ3JlZ2F0ZWQtcGF5b2ZmJyk7XHJcbiAgICAgICAgdmFyIHByb2JhYmlsaXR5VG9FbnRlckVudGVyID0gbm9kZXNFbnRlci5hcHBlbmQoJ3RleHQnKS5hdHRyKCdjbGFzcycsICdwcm9iYWJpbGl0eS10by1lbnRlcicpO1xyXG5cclxuICAgICAgICB2YXIgbm9kZXNNZXJnZSA9IG5vZGVzRW50ZXIubWVyZ2Uobm9kZXMpO1xyXG4gICAgICAgIG5vZGVzTWVyZ2UuY2xhc3NlZCgnb3B0aW1hbCcsIChkKT0+c2VsZi5pc09wdGltYWwoZCkpO1xyXG5cclxuICAgICAgICB2YXIgbm9kZXNNZXJnZVQgPSBub2Rlc01lcmdlO1xyXG4gICAgICAgIGlmKHRoaXMudHJhbnNpdGlvbil7XHJcbiAgICAgICAgICAgIG5vZGVzTWVyZ2VUID0gbm9kZXNNZXJnZS50cmFuc2l0aW9uKCk7XHJcbiAgICAgICAgICAgIG5vZGVzTWVyZ2VULm9uKCdlbmQnLCAoKT0+IHNlbGYudXBkYXRlUGxvdHRpbmdSZWdpb25TaXplKCkpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5vZGVzTWVyZ2VUXHJcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBkPT4ndHJhbnNsYXRlKCcgKyBkLmxvY2F0aW9uLnggKyAnICAnICsgZC5sb2NhdGlvbi55ICsgJyknKVxyXG5cclxuICAgICAgICB2YXIgcGF0aCA9IG5vZGVzTWVyZ2Uuc2VsZWN0KCdwYXRoJyk7XHJcbiAgICAgICAgdGhpcy5sYXlvdXQuZHJhd05vZGVTeW1ib2wocGF0aCx0aGlzLnRyYW5zaXRpb24pO1xyXG5cclxuICAgICAgICAvKnBhdGhcclxuICAgICAgICAgICAgLnN0eWxlKCdmaWxsJywgZD0+IHtcclxuICAgICAgICAgICAgICAgIC8vIGlmKHNlbGYuaXNOb2RlU2VsZWN0ZWQoZCkpe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIHJldHVybiBzZWxmLmNvbmZpZy5ub2RlW2QudHlwZV0uc2VsZWN0ZWQuZmlsbFxyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYuY29uZmlnLm5vZGVbZC50eXBlXS5maWxsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlJywgZD0+IHNlbGYuY29uZmlnLm5vZGVbZC50eXBlXS5zdHJva2UpXHJcbiAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlLXdpZHRoJywgZD0+IHtcclxuICAgICAgICAgICAgICAgIGlmKHNlbGYuY29uZmlnLm5vZGVbZC50eXBlXS5zdHJva2VXaWR0aCE9PXVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYuY29uZmlnLm5vZGVbZC50eXBlXS5zdHJva2VXaWR0aDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLmNvbmZpZy5ub2RlLnN0cm9rZVdpZHRoO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMubGF5b3V0Lm5vZGVMYWJlbFBvc2l0aW9uKGxhYmVsRW50ZXIpO1xyXG4gICAgICAgIHZhciBsYWJlbE1lcmdlID0gbm9kZXNNZXJnZS5zZWxlY3QoJ3RleHQubGFiZWwnKTtcclxuICAgICAgICBsYWJlbE1lcmdlLmNsYXNzZWQoJ3NkLWhpZGRlbicsIHRoaXMuY29uZmlnLmhpZGVMYWJlbHMpO1xyXG4gICAgICAgIHZhciBsYWJlbE1lcmdlVCA9IG5vZGVzTWVyZ2VULnNlbGVjdCgndGV4dC5sYWJlbCcpO1xyXG4gICAgICAgIGxhYmVsTWVyZ2VULmVhY2godGhpcy51cGRhdGVUZXh0TGluZXMpO1xyXG4gICAgICAgIHRoaXMubGF5b3V0Lm5vZGVMYWJlbFBvc2l0aW9uKGxhYmVsTWVyZ2VUKVxyXG4gICAgICAgICAgICAuYXR0cigndGV4dC1hbmNob3InLCAnbWlkZGxlJylcclxuXHJcbiAgICAgICAgdmFyIHBheW9mZiA9IG5vZGVzTWVyZ2Uuc2VsZWN0KCd0ZXh0LnBheW9mZicpO1xyXG5cclxuICAgICAgICB2YXIgcGF5b2ZmVHNwYW5zID0gcGF5b2ZmLnNlbGVjdEFsbCgndHNwYW4nKS5kYXRhKGQ9PntcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBkLmRpc3BsYXlWYWx1ZSgnY2hpbGRyZW5QYXlvZmYnKTtcclxuICAgICAgICAgICAgcmV0dXJuIFV0aWxzLmlzQXJyYXkoaXRlbSkgPyBpdGVtLmZpbHRlcihpPT5pICE9PSB1bmRlZmluZWQpIDogW2l0ZW1dXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcGF5b2ZmVHNwYW5zLmV4aXQoKS5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgdmFyIHBheW9mZlRzcGFuc00gPSBwYXlvZmZUc3BhbnMuZW50ZXIoKS5hcHBlbmQoJ3RzcGFuJykubWVyZ2UocGF5b2ZmVHNwYW5zKTtcclxuICAgICAgICBwYXlvZmZUc3BhbnNNXHJcbiAgICAgICAgICAgIC8vIC5hdHRyKCdkb21pbmFudC1iYXNlbGluZScsICdoYW5naW5nJylcclxuICAgICAgICAgICAgLmF0dHIoJ2R5JywgKGQsaSk9Pmk+MCA/ICcxLjFlbSc6IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgLmF0dHIoJ3gnLCAnMCcpXHJcbiAgICAgICAgICAgIC5jbGFzc2VkKCduZWdhdGl2ZScsIGQ9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZCE9PW51bGwgJiYgZDwwO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2xhc3NlZCgnc2QtaGlkZGVuJywgdGhpcy5jb25maWcuaGlkZVBheW9mZnMgfHwgdGhpcy5jb25maWcucmF3KVxyXG4gICAgICAgICAgICAudGV4dCgoZCwgaSk9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmFsID0gZFxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWwhPT1udWxsID8gKGlzTmFOKHZhbCkgPyB2YWwgOiBzZWxmLmNvbmZpZy5wYXlvZmZOdW1iZXJGb3JtYXR0ZXIodmFsLCBpKSk6ICcnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuYXR0YWNoUGF5b2ZmVG9vbHRpcChwYXlvZmZUc3BhbnNNKTtcclxuXHJcblxyXG4gICAgICAgIHZhciBwYXlvZmZUID0gcGF5b2ZmO1xyXG4gICAgICAgIGlmKHRoaXMudHJhbnNpdGlvbil7XHJcbiAgICAgICAgICAgIHBheW9mZlQgPSBwYXlvZmYudHJhbnNpdGlvbigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5sYXlvdXQubm9kZVBheW9mZlBvc2l0aW9uKHBheW9mZkVudGVyKTtcclxuICAgICAgICB0aGlzLmxheW91dC5ub2RlUGF5b2ZmUG9zaXRpb24ocGF5b2ZmVCk7XHJcblxyXG4gICAgICAgIHZhciBhZ2dyZWdhdGVkUGF5b2ZmID0gbm9kZXNNZXJnZS5zZWxlY3QoJ3RleHQuYWdncmVnYXRlZC1wYXlvZmYnKTtcclxuICAgICAgICB2YXIgYWdncmVnYXRlZFBheW9mZlRzcGFucyA9IGFnZ3JlZ2F0ZWRQYXlvZmYuc2VsZWN0QWxsKCd0c3BhbicpLmRhdGEoZD0+e1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IGQuZGlzcGxheVZhbHVlKCdhZ2dyZWdhdGVkUGF5b2ZmJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBVdGlscy5pc0FycmF5KGl0ZW0pID8gaXRlbS5maWx0ZXIoaT0+aSAhPT0gdW5kZWZpbmVkKSA6IFtpdGVtXVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGFnZ3JlZ2F0ZWRQYXlvZmZUc3BhbnMuZXhpdCgpLnJlbW92ZSgpO1xyXG4gICAgICAgIHZhciBhZ2dyZWdhdGVkUGF5b2ZmVHNwYW5zTSA9IGFnZ3JlZ2F0ZWRQYXlvZmZUc3BhbnMuZW50ZXIoKS5hcHBlbmQoJ3RzcGFuJykubWVyZ2UoYWdncmVnYXRlZFBheW9mZlRzcGFucylcclxuICAgICAgICAgICAgLmF0dHIoJ2R5JywgKGQsaSk9Pmk+MCA/ICcwLjk1ZW0nOiB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIC5jbGFzc2VkKCduZWdhdGl2ZScsIGQ9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZCE9PW51bGwgJiYgZDwwO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2xhc3NlZCgnc2QtaGlkZGVuJywgdGhpcy5jb25maWcuaGlkZVBheW9mZnMgfHwgdGhpcy5jb25maWcucmF3KVxyXG4gICAgICAgICAgICAudGV4dCgodmFsLCBpKT0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWwhPT1udWxsID8gKGlzTmFOKHZhbCkgPyB2YWwgOiBzZWxmLmNvbmZpZy5wYXlvZmZOdW1iZXJGb3JtYXR0ZXIodmFsLCBpKSk6ICcnXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmF0dGFjaFBheW9mZlRvb2x0aXAoYWdncmVnYXRlZFBheW9mZlRzcGFuc00sICdhZ2dyZWdhdGVkUGF5b2ZmJyk7XHJcblxyXG4gICAgICAgIHZhciBhZ2dyZWdhdGVkUGF5b2ZmVCA9IGFnZ3JlZ2F0ZWRQYXlvZmY7XHJcbiAgICAgICAgaWYodGhpcy50cmFuc2l0aW9uKXtcclxuICAgICAgICAgICAgYWdncmVnYXRlZFBheW9mZlQgPSBhZ2dyZWdhdGVkUGF5b2ZmLnRyYW5zaXRpb24oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubGF5b3V0Lm5vZGVBZ2dyZWdhdGVkUGF5b2ZmUG9zaXRpb24oYWdncmVnYXRlZFBheW9mZkVudGVyKTtcclxuICAgICAgICB0aGlzLmxheW91dC5ub2RlQWdncmVnYXRlZFBheW9mZlBvc2l0aW9uKGFnZ3JlZ2F0ZWRQYXlvZmZUKTtcclxuXHJcbiAgICAgICAgdmFyIHByb2JhYmlsaXR5VG9FbnRlciA9IG5vZGVzTWVyZ2Uuc2VsZWN0KCd0ZXh0LnByb2JhYmlsaXR5LXRvLWVudGVyJylcclxuICAgICAgICAgICAgLnRleHQoZD0+e1xyXG4gICAgICAgICAgICAgICAgdmFyIHZhbCA9IGQuZGlzcGxheVZhbHVlKCdwcm9iYWJpbGl0eVRvRW50ZXInKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWwhPT1udWxsID8gKGlzTmFOKHZhbCkgPyB2YWwgOiBzZWxmLmNvbmZpZy5wcm9iYWJpbGl0eU51bWJlckZvcm1hdHRlcih2YWwpKTogJydcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNsYXNzZWQoJ3NkLWhpZGRlbicsIHRoaXMuY29uZmlnLmhpZGVQcm9iYWJpbGl0aWVzIHx8IHRoaXMuY29uZmlnLnJhdyk7XHJcbiAgICAgICAgVG9vbHRpcC5hdHRhY2gocHJvYmFiaWxpdHlUb0VudGVyLCBpMThuLnQoJ3Rvb2x0aXAubm9kZS5wcm9iYWJpbGl0eVRvRW50ZXInKSk7XHJcblxyXG5cclxuICAgICAgICB2YXIgcHJvYmFiaWxpdHlUb0VudGVyVCA9IHByb2JhYmlsaXR5VG9FbnRlcjtcclxuICAgICAgICBpZih0aGlzLnRyYW5zaXRpb24pe1xyXG4gICAgICAgICAgICBwcm9iYWJpbGl0eVRvRW50ZXJUID0gcHJvYmFiaWxpdHlUb0VudGVyLnRyYW5zaXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sYXlvdXQubm9kZVByb2JhYmlsaXR5VG9FbnRlclBvc2l0aW9uKHByb2JhYmlsaXR5VG9FbnRlckVudGVyKTtcclxuICAgICAgICB0aGlzLmxheW91dC5ub2RlUHJvYmFiaWxpdHlUb0VudGVyUG9zaXRpb24ocHJvYmFiaWxpdHlUb0VudGVyVCk7XHJcblxyXG5cclxuICAgICAgICB2YXIgaW5kaWNhdG9yID0gbm9kZXNNZXJnZS5zZWxlY3QoJ3RleHQuZXJyb3ItaW5kaWNhdG9yJyk7XHJcbiAgICAgICAgaW5kaWNhdG9yLmNsYXNzZWQoJ3NkLWhpZGRlbicsIHRoaXMuY29uZmlnLnJhdylcclxuICAgICAgICB0aGlzLmxheW91dC5ub2RlSW5kaWNhdG9yUG9zaXRpb24oaW5kaWNhdG9yRW50ZXIpO1xyXG4gICAgICAgIHRoaXMubGF5b3V0Lm5vZGVJbmRpY2F0b3JQb3NpdGlvbihpbmRpY2F0b3IpO1xyXG5cclxuICAgICAgICBpZih0aGlzLm5vZGVEcmFnSGFuZGxlcil7XHJcbiAgICAgICAgICAgIG5vZGVzTWVyZ2UuY2FsbCh0aGlzLm5vZGVEcmFnSGFuZGxlci5kcmFnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG5vZGVzTWVyZ2Uub24oJ2NvbnRleHRtZW51JywgdGhpcy5ub2RlQ29udGV4dE1lbnUpO1xyXG4gICAgICAgIG5vZGVzTWVyZ2Uub24oJ2RibGNsaWNrJywgdGhpcy5ub2RlQ29udGV4dE1lbnUpXHJcbiAgICAgICAgbm9kZXNNZXJnZS5lYWNoKGZ1bmN0aW9uKGQsIGkpe1xyXG4gICAgICAgICAgICB2YXIgbm9kZUVsZW0gPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgbWMgPSBuZXcgSGFtbWVyLk1hbmFnZXIobm9kZUVsZW0pO1xyXG4gICAgICAgICAgICBtYy5hZGQobmV3IEhhbW1lci5QcmVzcyh7XHJcbiAgICAgICAgICAgICAgICBwb2ludGVyVHlwZTogJ3RvdWNoJ1xyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIG1jLm9uKCdwcmVzcycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICAgaWYoZS5wb2ludGVyVHlwZT09J3RvdWNoJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5ub2RlRHJhZ0hhbmRsZXIuY2FuY2VsRHJhZygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmKGQuZm9sZGVkKXtcclxuICAgICAgICAgICAgICAgIGxldCBidXR0b24gPSBkMy5zZWxlY3Qobm9kZUVsZW0pLnNlbGVjdE9yQXBwZW5kKCd0ZXh0LnNkLXVuZm9sZC1idXR0b24nKVxyXG4gICAgICAgICAgICAgICAgICAgIC50ZXh0KFwiWytdXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdjbGljayBkYmNsaWNrIG1vdXNlZG93bicsICgpPT5zZWxmLmZvbGRTdWJ0cmVlKGQsIGZhbHNlKSk7IC8vZmlyZWZveCBkZXRlY3RzIG9ubHkgbW91c2Vkb3duIGV2ZW50IC0gcmVsYXRlZCB0byBkcmFnIGhhbmRsZXJcclxuXHJcbiAgICAgICAgICAgICAgICBzZWxmLmxheW91dC5ub2RlVW5mb2xkQnV0dG9uUG9zaXRpb24oYnV0dG9uKTtcclxuICAgICAgICAgICAgICAgIFRvb2x0aXAuYXR0YWNoKGJ1dHRvbiwgaTE4bi50KCdjb250ZXh0TWVudS5ub2RlLnVuZm9sZCcpKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBkMy5zZWxlY3Qobm9kZUVsZW0pLnNlbGVjdCgnLnNkLXVuZm9sZC1idXR0b24nKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGF0dGFjaFBheW9mZlRvb2x0aXAoc2VsZWN0aW9uLCBwYXlvZmZGaWxlZE5hbWUgPSAncGF5b2ZmJywgb2JqZWN0PSdub2RlJyl7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIFRvb2x0aXAuYXR0YWNoKHNlbGVjdGlvbiwgKGQsIGkpPT57XHJcbiAgICAgICAgICAgIGlmKHNlbGYuY29uZmlnLnBheW9mZk5hbWVzLmxlbmd0aD5pICYmIHNlbGYuY29uZmlnLnBheW9mZk5hbWVzW2ldICE9PSBudWxsKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpMThuLnQoJ3Rvb2x0aXAuJytvYmplY3QrJy4nK3BheW9mZkZpbGVkTmFtZSsnLm5hbWVkJyx7dmFsdWU6IGQucGF5b2ZmLCBudW1iZXI6IGkrMSwgbmFtZTogc2VsZi5jb25maWcucGF5b2ZmTmFtZXNbaV19KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBpMThuLnQoJ3Rvb2x0aXAuJytvYmplY3QrJy4nK3BheW9mZkZpbGVkTmFtZSsnLmRlZmF1bHQnLHt2YWx1ZTogZC5wYXlvZmYsIG51bWJlcjogc2VsZi5jb25maWcubWF4UGF5b2Zmc1RvRGlzcGxheSA8IDIgPyAnJyA6IGkrMX0pXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlVGV4dExpbmVzKGQpeyAvL2hlbHBlciBtZXRob2QgZm9yIHNwbGl0dGluZyB0ZXh0IHRvIHRzcGFuc1xyXG4gICAgICAgIHZhciBsaW5lcyA9IGQubmFtZSA/IGQubmFtZS5zcGxpdCgnXFxuJykgOiBbXTtcclxuICAgICAgICBsaW5lcy5yZXZlcnNlKCk7XHJcbiAgICAgICAgdmFyIHRzcGFucyA9IGQzLnNlbGVjdCh0aGlzKS5zZWxlY3RBbGwoJ3RzcGFuJykuZGF0YShsaW5lcyk7XHJcbiAgICAgICAgdHNwYW5zLmVudGVyKCkuYXBwZW5kKCd0c3BhbicpXHJcbiAgICAgICAgICAgIC5tZXJnZSh0c3BhbnMpXHJcbiAgICAgICAgICAgIC50ZXh0KGw9PmwpXHJcbiAgICAgICAgICAgIC5hdHRyKCdkeScsIChkLGkpPT5pPjAgPyAnLTEuMWVtJzogdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAuYXR0cigneCcsICcwJyk7XHJcblxyXG4gICAgICAgIHRzcGFucy5leGl0KCkucmVtb3ZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaXNPcHRpbWFsKGQpe1xyXG4gICAgICAgIHJldHVybiBkLmRpc3BsYXlWYWx1ZSgnb3B0aW1hbCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZHJhd0VkZ2VzKCkge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICB2YXIgZWRnZXNDb250YWluZXIgPSB0aGlzLm1haW5Hcm91cC5zZWxlY3RPckFwcGVuZCgnZy5lZGdlcycpO1xyXG4gICAgICAgIGlmKHNlbGYuY29uZmlnLmZvcmNlRnVsbEVkZ2VSZWRyYXcpe1xyXG4gICAgICAgICAgICBlZGdlc0NvbnRhaW5lci5zZWxlY3RBbGwoXCIqXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGVkZ2VzID0gZWRnZXNDb250YWluZXIuc2VsZWN0QWxsKCcuZWRnZScpLmRhdGEodGhpcy5kYXRhLmVkZ2VzLmZpbHRlcihlPT4hZS4kaGlkZGVuKSwgKGQsaSk9PiBkLmlkKTtcclxuICAgICAgICBlZGdlcy5leGl0KCkucmVtb3ZlKCk7XHJcbiAgICAgICAgdmFyIGVkZ2VzRW50ZXIgPSBlZGdlcy5lbnRlcigpLmFwcGVuZCgnZycpXHJcbiAgICAgICAgICAgIC5hdHRyKCdpZCcsIGQ9PidlZGdlLScrZC5pZClcclxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2VkZ2UnKTtcclxuXHJcblxyXG4gICAgICAgIGVkZ2VzRW50ZXIuYXBwZW5kKCdwYXRoJyk7XHJcbiAgICAgICAgdmFyIGxhYmVsRW50ZXIgPSBlZGdlc0VudGVyLmFwcGVuZFNlbGVjdG9yKCdnLmxhYmVsLWdyb3VwJyk7XHJcbiAgICAgICAgbGFiZWxFbnRlci5hcHBlbmQoJ3RleHQnKS5hdHRyKCdjbGFzcycsICdsYWJlbCcpO1xyXG4gICAgICAgIHZhciBwYXlvZmZFbnRlciA9IGVkZ2VzRW50ZXIuYXBwZW5kKCd0ZXh0JykuYXR0cignY2xhc3MnLCAncGF5b2ZmJyk7XHJcbiAgICAgICAgdmFyIHByb2JhYmlsaXR5RW50ZXIgPSBlZGdlc0VudGVyLmFwcGVuZCgndGV4dCcpLmF0dHIoJ2NsYXNzJywgJ3Byb2JhYmlsaXR5Jyk7XHJcblxyXG5cclxuICAgICAgICB2YXIgZWRnZXNNZXJnZSA9IGVkZ2VzRW50ZXIubWVyZ2UoZWRnZXMpO1xyXG5cclxuXHJcbiAgICAgICAgdmFyIG9wdGltYWxDbGFzc05hbWUgPSAnb3B0aW1hbCc7XHJcbiAgICAgICAgZWRnZXNNZXJnZS5jbGFzc2VkKG9wdGltYWxDbGFzc05hbWUsIChkKT0+c2VsZi5pc09wdGltYWwoZCkpO1xyXG5cclxuICAgICAgICB2YXIgZWRnZXNNZXJnZVQgPSBlZGdlc01lcmdlO1xyXG4gICAgICAgIGlmKHRoaXMudHJhbnNpdGlvbil7XHJcbiAgICAgICAgICAgIGVkZ2VzTWVyZ2VUID0gZWRnZXNNZXJnZS50cmFuc2l0aW9uKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBlZGdlc01lcmdlVC5zZWxlY3QoJ3BhdGgnKVxyXG4gICAgICAgICAgICAuYXR0cignZCcsIGQ9PiB0aGlzLmxheW91dC5lZGdlTGluZUQoZCkpXHJcbiAgICAgICAgICAgIC8vIC5hdHRyKFwic3Ryb2tlXCIsIFwiYmxhY2tcIilcclxuICAgICAgICAgICAgLy8gLmF0dHIoXCJzdHJva2Utd2lkdGhcIiwgMilcclxuICAgICAgICAgICAgLmF0dHIoXCJmaWxsXCIsIFwibm9uZVwiKVxyXG4gICAgICAgICAgICAuYXR0cihcIm1hcmtlci1lbmRcIiwgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN1ZmZpeCA9IGQzLnNlbGVjdCh0aGlzLnBhcmVudE5vZGUpLmNsYXNzZWQoJ3NlbGVjdGVkJykgPyAnLXNlbGVjdGVkJyA6IChzZWxmLmlzT3B0aW1hbChkKT8nLW9wdGltYWwnOicnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBcInVybCgjYXJyb3dcIisgc3VmZml4K1wiKVwiXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyAuYXR0cihcInNoYXBlLXJlbmRlcmluZ1wiLCBcIm9wdGltaXplUXVhbGl0eVwiKVxyXG5cclxuXHJcbiAgICAgICAgZWRnZXNNZXJnZS5vbignY2xpY2snLCBkPT57XHJcbiAgICAgICAgICAgIHNlbGYuc2VsZWN0RWRnZShkLCB0cnVlKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmxheW91dC5lZGdlTGFiZWxQb3NpdGlvbihsYWJlbEVudGVyKTtcclxuICAgICAgICBlZGdlc01lcmdlVC5zZWxlY3QoJ3RleHQubGFiZWwnKS5lYWNoKHRoaXMudXBkYXRlVGV4dExpbmVzKTtcclxuICAgICAgICB2YXIgbGFiZWxNZXJnZSA9IGVkZ2VzTWVyZ2Uuc2VsZWN0KCdnLmxhYmVsLWdyb3VwJyk7XHJcbiAgICAgICAgbGFiZWxNZXJnZS5jbGFzc2VkKCdzZC1oaWRkZW4nLCB0aGlzLmNvbmZpZy5oaWRlTGFiZWxzKTtcclxuICAgICAgICB2YXIgbGFiZWxNZXJnZVQgPSBlZGdlc01lcmdlVC5zZWxlY3QoJ2cubGFiZWwtZ3JvdXAnKTtcclxuICAgICAgICB0aGlzLmxheW91dC5lZGdlTGFiZWxQb3NpdGlvbihsYWJlbE1lcmdlVCk7XHJcbiAgICAgICAgICAgIC8vIC50ZXh0KGQ9PmQubmFtZSk7XHJcblxyXG4gICAgICAgIHZhciBwYXlvZmYgPSBlZGdlc01lcmdlLnNlbGVjdCgndGV4dC5wYXlvZmYnKTtcclxuXHJcbiAgICAgICAgdmFyIHBheW9mZlRzcGFucyA9IHBheW9mZi5zZWxlY3RBbGwoJ3RzcGFuJykuZGF0YShkID0+IHtcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBkLmRpc3BsYXlWYWx1ZSgncGF5b2ZmJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBVdGlscy5pc0FycmF5KGl0ZW0pID8gaXRlbS5zbGljZSgwLCBNYXRoLm1pbihpdGVtLmxlbmd0aCwgc2VsZi5jb25maWcubWF4UGF5b2Zmc1RvRGlzcGxheSkpLm1hcChfPT5kKSA6IFtkXTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBwYXlvZmZUc3BhbnMuZXhpdCgpLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICB2YXIgcGF5b2ZmVHNwYW5zTSA9IHBheW9mZlRzcGFucy5lbnRlcigpLmFwcGVuZCgndHNwYW4nKS5tZXJnZShwYXlvZmZUc3BhbnMpO1xyXG4gICAgICAgIHBheW9mZlRzcGFuc01cclxuICAgICAgICAvLyAuYXR0cignZG9taW5hbnQtYmFzZWxpbmUnLCAnaGFuZ2luZycpXHJcbiAgICAgICAgICAgIC5hdHRyKCdkeScsIChkLGkpPT5pPjAgPyAnMS4xZW0nOiB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIC8vIC5hdHRyKCd4JywgJzAnKVxyXG5cclxuICAgICAgICAgICAgLy8gLmF0dHIoJ2RvbWluYW50LWJhc2VsaW5lJywgJ2hhbmdpbmcnKVxyXG4gICAgICAgICAgICAuY2xhc3NlZCgnbmVnYXRpdmUnLCAoZCwgaSk9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmFsID0gZC5kaXNwbGF5UGF5b2ZmKHVuZGVmaW5lZCwgaSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsIT09bnVsbCAmJiB2YWw8MDtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNsYXNzZWQoJ3NkLWhpZGRlbicsIHRoaXMuY29uZmlnLmhpZGVQYXlvZmZzKVxyXG4gICAgICAgICAgICAvLyAudGV4dChkPT4gaXNOYU4oZC5wYXlvZmYpID8gZC5wYXlvZmYgOiBzZWxmLmNvbmZpZy5wYXlvZmZOdW1iZXJGb3JtYXR0ZXIoZC5wYXlvZmYpKVxyXG4gICAgICAgICAgICAudGV4dCgoZCwgaSk9PntcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuY29uZmlnLnJhdyl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQucGF5b2ZmW2ldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gZC5kaXNwbGF5VmFsdWUoJ3BheW9mZicpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW1zID0gVXRpbHMuaXNBcnJheShpdGVtKSA/IGl0ZW0gOiBbaXRlbV07XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHZhbCA9IGl0ZW1zW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNOYU4odmFsKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5jb25maWcucGF5b2ZmTnVtYmVyRm9ybWF0dGVyKHZhbCwgaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChVdGlscy5pc1N0cmluZyh2YWwpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkLnBheW9mZltpXSAhPT0gbnVsbCAmJiAhaXNOYU4oZC5wYXlvZmZbaV0pKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLmNvbmZpZy5wYXlvZmZOdW1iZXJGb3JtYXR0ZXIoZC5wYXlvZmZbaV0sIGkpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBkLnBheW9mZltpXTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICBUb29sdGlwLmF0dGFjaChwYXlvZmZUc3BhbnNNLCAoZCwgaSk9PntcclxuICAgICAgICAgICAgaWYoc2VsZi5jb25maWcucGF5b2ZmTmFtZXMubGVuZ3RoPmkgJiYgc2VsZi5jb25maWcucGF5b2ZmTmFtZXNbaV0gIT09IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGkxOG4udCgndG9vbHRpcC5lZGdlLnBheW9mZi5uYW1lZCcse3ZhbHVlOiBkLnBheW9mZltpXSwgbnVtYmVyOiBpKzEsIG5hbWU6IHNlbGYuY29uZmlnLnBheW9mZk5hbWVzW2ldfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gaTE4bi50KCd0b29sdGlwLmVkZ2UucGF5b2ZmLmRlZmF1bHQnLHt2YWx1ZTogZC5wYXlvZmZbaV0sIG51bWJlcjogc2VsZi5jb25maWcubWF4UGF5b2Zmc1RvRGlzcGxheSA8IDIgPyAnJyA6IGkrMX0pXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHZhciBwYXlvZmZUZXh0VCA9IHBheW9mZjtcclxuICAgICAgICBpZih0aGlzLnRyYW5zaXRpb24pe1xyXG4gICAgICAgICAgICBwYXlvZmZUZXh0VCA9IHBheW9mZi50cmFuc2l0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubGF5b3V0LmVkZ2VQYXlvZmZQb3NpdGlvbihwYXlvZmZFbnRlcik7XHJcbiAgICAgICAgdGhpcy5sYXlvdXQuZWRnZVBheW9mZlBvc2l0aW9uKHBheW9mZlRleHRUKTtcclxuXHJcbiAgICAgICAgVG9vbHRpcC5hdHRhY2goZWRnZXNNZXJnZS5zZWxlY3QoJ3RleHQucHJvYmFiaWxpdHknKSwgZD0+aTE4bi50KCd0b29sdGlwLmVkZ2UucHJvYmFiaWxpdHknLHt2YWx1ZTogZC5wcm9iYWJpbGl0eT09PSB1bmRlZmluZWQgPyBkLmRpc3BsYXlQcm9iYWJpbGl0eSgpIDogZC5wcm9iYWJpbGl0eX0pKTtcclxuXHJcbiAgICAgICAgZWRnZXNNZXJnZS5zZWxlY3QoJ3RleHQucHJvYmFiaWxpdHknKVxyXG4gICAgICAgICAgICAuY2xhc3NlZCgnc2QtaGlkZGVuJywgdGhpcy5jb25maWcuaGlkZVByb2JhYmlsaXRpZXMpO1xyXG4gICAgICAgIHZhciBwcm9iYWJpbGl0eU1lcmdlID0gZWRnZXNNZXJnZS5zZWxlY3QoJ3RleHQucHJvYmFiaWxpdHknKTtcclxuICAgICAgICBwcm9iYWJpbGl0eU1lcmdlXHJcbiAgICAgICAgICAgIC5hdHRyKCd0ZXh0LWFuY2hvcicsICdlbmQnKVxyXG4gICAgICAgICAgICAudGV4dChkPT57XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmNvbmZpZy5yYXcpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkLnByb2JhYmlsaXR5O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIHZhbCA9IGQuZGlzcGxheVByb2JhYmlsaXR5KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYodmFsIT09bnVsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIWlzTmFOKHZhbCkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5jb25maWcucHJvYmFiaWxpdHlOdW1iZXJGb3JtYXR0ZXIodmFsKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoVXRpbHMuaXNTdHJpbmcodmFsKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKGQucHJvYmFiaWxpdHkhPT1udWxsICYmICFpc05hTihkLnByb2JhYmlsaXR5KSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5jb25maWcucHJvYmFiaWxpdHlOdW1iZXJGb3JtYXR0ZXIoZC5wcm9iYWJpbGl0eSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGQucHJvYmFiaWxpdHk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIHZhciBwcm9iYWJpbGl0eU1lcmdlVCA9IHByb2JhYmlsaXR5TWVyZ2U7XHJcbiAgICAgICAgaWYodGhpcy50cmFuc2l0aW9uKXtcclxuICAgICAgICAgICAgcHJvYmFiaWxpdHlNZXJnZVQgPSBwcm9iYWJpbGl0eU1lcmdlLnRyYW5zaXRpb24oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubGF5b3V0LmVkZ2VQcm9iYWJpbGl0eVBvc2l0aW9uKHByb2JhYmlsaXR5RW50ZXIpO1xyXG4gICAgICAgIHRoaXMubGF5b3V0LmVkZ2VQcm9iYWJpbGl0eVBvc2l0aW9uKHByb2JhYmlsaXR5TWVyZ2VUKTtcclxuXHJcblxyXG4gICAgICAgIGVkZ2VzQ29udGFpbmVyLnNlbGVjdEFsbCgnLmVkZ2UuJytvcHRpbWFsQ2xhc3NOYW1lKS5yYWlzZSgpO1xyXG5cclxuICAgICAgICBlZGdlc01lcmdlLm9uKCdjb250ZXh0bWVudScsIHRoaXMuZWRnZUNvbnRleHRNZW51KTtcclxuICAgICAgICBlZGdlc01lcmdlLm9uKCdkYmxjbGljaycsIHRoaXMuZWRnZUNvbnRleHRNZW51KTtcclxuICAgICAgICBlZGdlc01lcmdlLmVhY2goZnVuY3Rpb24oZCwgaSl7XHJcbiAgICAgICAgICAgIHZhciBlbGVtID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIG1jID0gbmV3IEhhbW1lci5NYW5hZ2VyKGVsZW0pO1xyXG4gICAgICAgICAgICBtYy5hZGQobmV3IEhhbW1lci5QcmVzcyh7XHJcbiAgICAgICAgICAgICAgICBwb2ludGVyVHlwZTogSGFtbWVyLlBPSU5URVJfVE9VQ0hcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcmVkcmF3RmxvYXRpbmdUZXh0cygpIHtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG5cclxuICAgICAgICB2YXIgdGV4dHNDb250YWluZXIgPSB0aGlzLm1haW5Hcm91cC5zZWxlY3RPckFwcGVuZCgnZy5mbG9hdGluZy10ZXh0cycpO1xyXG4gICAgICAgIHZhciB0ZXh0cyA9IHRleHRzQ29udGFpbmVyLnNlbGVjdEFsbCgnLmZsb2F0aW5nLXRleHQnKS5kYXRhKHRoaXMuZGF0YS50ZXh0cywgKGQsaSk9PiBkLmlkKTtcclxuICAgICAgICB0ZXh0cy5leGl0KCkucmVtb3ZlKCk7XHJcbiAgICAgICAgdmFyIHRleHRzRW50ZXIgPSB0ZXh0cy5lbnRlcigpLmFwcGVuZFNlbGVjdG9yKCdnLmZsb2F0aW5nLXRleHQnKVxyXG4gICAgICAgICAgICAuYXR0cignaWQnLCBkPT4ndGV4dC0nK2QuaWQpO1xyXG5cclxuXHJcbiAgICAgICAgdmFyIHJlY3RXaWR0aCA9IDQwO1xyXG4gICAgICAgIHZhciByZWN0SGVpZ2h0ID0gMjA7XHJcblxyXG4gICAgICAgIHRleHRzRW50ZXIuYXBwZW5kKCdyZWN0JykuYXR0cigneCcsIC01KS5hdHRyKCd5JywgLTE2KS5hdHRyKCdmaWxsLW9wYWNpdHknLCAwKTtcclxuICAgICAgICB0ZXh0c0VudGVyLmFwcGVuZCgndGV4dCcpO1xyXG5cclxuICAgICAgICB2YXIgdGV4dHNNZXJnZSA9IHRleHRzRW50ZXIubWVyZ2UodGV4dHMpO1xyXG4gICAgICAgIHZhciB0ZXh0c01lcmdlVCA9IHRleHRzTWVyZ2U7XHJcbiAgICAgICAgaWYodGhpcy50cmFuc2l0aW9uKXtcclxuICAgICAgICAgICAgdGV4dHNNZXJnZVQgPSB0ZXh0c01lcmdlLnRyYW5zaXRpb24oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRleHRzTWVyZ2VULmF0dHIoJ3RyYW5zZm9ybScsIGQ9Pid0cmFuc2xhdGUoJyArIGQubG9jYXRpb24ueCArICcgICcgKyBkLmxvY2F0aW9uLnkgKyAnKScpO1xyXG5cclxuICAgICAgICB2YXIgdHNwYW5zID0gdGV4dHNNZXJnZS5zZWxlY3QoJ3RleHQnKS5zZWxlY3RBbGwoJ3RzcGFuJykuZGF0YShkPT5kLnZhbHVlID8gZC52YWx1ZS5zcGxpdCgnXFxuJykgOiBbXSk7XHJcblxyXG4gICAgICAgIHRzcGFucy5lbnRlcigpLmFwcGVuZCgndHNwYW4nKVxyXG4gICAgICAgICAgICAubWVyZ2UodHNwYW5zKVxyXG4gICAgICAgICAgICAuaHRtbChsPT5BcHBVdGlscy5yZXBsYWNlVXJscyhBcHBVdGlscy5lc2NhcGVIdG1sKGwpKSlcclxuICAgICAgICAgICAgLmF0dHIoJ2R5JywgKGQsaSk9Pmk+MCA/ICcxLjFlbSc6IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgLmF0dHIoJ3gnLCAnMCcpO1xyXG5cclxuICAgICAgICB0c3BhbnMuZXhpdCgpLnJlbW92ZSgpO1xyXG4gICAgICAgIHRleHRzTWVyZ2UuY2xhc3NlZCgnc2QtZW1wdHknLCBkPT4hZC52YWx1ZSB8fCAhZC52YWx1ZS50cmltKCkpO1xyXG4gICAgICAgIHRleHRzTWVyZ2Uuc2VsZWN0KCdyZWN0JykuYXR0cignd2lkdGgnLCByZWN0V2lkdGgpLmF0dHIoJ2hlaWdodCcsIHJlY3RIZWlnaHQpO1xyXG5cclxuICAgICAgICB0ZXh0c01lcmdlLmVhY2goZnVuY3Rpb24oZCl7XHJcbiAgICAgICAgICAgIGlmKCFkLnZhbHVlKXtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgYmIgPSBkMy5zZWxlY3QodGhpcykuc2VsZWN0KCd0ZXh0Jykubm9kZSgpLmdldEJCb3goKTtcclxuICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuc2VsZWN0KCdyZWN0JylcclxuICAgICAgICAgICAgICAgLmF0dHIoJ3knLCBiYi55LTUpXHJcbiAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIE1hdGgubWF4KGJiLndpZHRoKzEwLCByZWN0V2lkdGgpKVxyXG4gICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgTWF0aC5tYXgoYmIuaGVpZ2h0KzEwLCByZWN0SGVpZ2h0KSlcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYodGhpcy50ZXh0RHJhZ0hhbmRsZXIpe1xyXG4gICAgICAgICAgICB0ZXh0c01lcmdlLmNhbGwodGhpcy50ZXh0RHJhZ0hhbmRsZXIuZHJhZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRleHRzTWVyZ2Uub24oJ2NvbnRleHRtZW51JywgdGhpcy50ZXh0Q29udGV4dE1lbnUpO1xyXG4gICAgICAgIHRleHRzTWVyZ2Uub24oJ2RibGNsaWNrJywgdGhpcy50ZXh0Q29udGV4dE1lbnUpO1xyXG4gICAgICAgIHRleHRzTWVyZ2UuZWFjaChmdW5jdGlvbihkLCBpKXtcclxuICAgICAgICAgICAgdmFyIGVsZW0gPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgbWMgPSBuZXcgSGFtbWVyLk1hbmFnZXIoZWxlbSk7XHJcbiAgICAgICAgICAgIG1jLmFkZChuZXcgSGFtbWVyLlByZXNzKHtcclxuICAgICAgICAgICAgICAgIHBvaW50ZXJUeXBlOiAndG91Y2gnXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVWYWxpZGF0aW9uTWVzc2FnZXMoKSB7XHJcbiAgICAgICAgdmFyIG5vZGVzID0gdGhpcy5tYWluR3JvdXAuc2VsZWN0QWxsKCcubm9kZScpO1xyXG4gICAgICAgIG5vZGVzLmNsYXNzZWQoJ2Vycm9yJywgZmFsc2UpO1xyXG5cclxuICAgICAgICB0aGlzLmRhdGEudmFsaWRhdGlvblJlc3VsdHMuZm9yRWFjaCh2YWxpZGF0aW9uUmVzdWx0PT57XHJcbiAgICAgICAgICAgIGlmKHZhbGlkYXRpb25SZXN1bHQuaXNWYWxpZCgpKXtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModmFsaWRhdGlvblJlc3VsdC5vYmplY3RJZFRvRXJyb3IpLmZvckVhY2goaWQ9PntcclxuICAgICAgICAgICAgICAgIHZhciBlcnJvcnMgPSB2YWxpZGF0aW9uUmVzdWx0Lm9iamVjdElkVG9FcnJvcltpZF07XHJcbiAgICAgICAgICAgICAgICB2YXIgbm9kZVNlbGVjdGlvbiA9IHRoaXMuZ2V0Tm9kZUQzU2VsZWN0aW9uQnlJZChpZCk7XHJcbiAgICAgICAgICAgICAgICBub2RlU2VsZWN0aW9uLmNsYXNzZWQoJ2Vycm9yJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgdG9vbHRpcEh0bWwgPSAnJztcclxuICAgICAgICAgICAgICAgIGVycm9ycy5mb3JFYWNoKGU9PntcclxuICAgICAgICAgICAgICAgICAgICBpZih0b29sdGlwSHRtbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXBIdG1sKz0nPGJyLz4nXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXBIdG1sKz1BcHBVdGlscy5nZXRWYWxpZGF0aW9uTWVzc2FnZShlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIFRvb2x0aXAuYXR0YWNoKG5vZGVTZWxlY3Rpb24uc2VsZWN0KCcuZXJyb3ItaW5kaWNhdG9yJyksIHRvb2x0aXBIdG1sKTtcclxuXHJcblxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBpbml0RWRnZU1hcmtlcnMoKSB7XHJcbiAgICAgICAgdmFyIGRlZnMgPSB0aGlzLnN2Zy5hcHBlbmQoXCJzdmc6ZGVmc1wiKTtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0QXJyb3dNYXJrZXIoXCJhcnJvd1wiKTtcclxuICAgICAgICB0aGlzLmluaXRBcnJvd01hcmtlcihcImFycm93LW9wdGltYWxcIik7XHJcbiAgICAgICAgdGhpcy5pbml0QXJyb3dNYXJrZXIoXCJhcnJvdy1zZWxlY3RlZFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0QXJyb3dNYXJrZXIoaWQpIHtcclxuXHJcbiAgICAgICAgdmFyIGRlZnMgPSB0aGlzLnN2Zy5zZWxlY3QoXCJkZWZzXCIpO1xyXG4gICAgICAgIGRlZnMuYXBwZW5kKFwibWFya2VyXCIpXHJcbiAgICAgICAgICAgIC5hdHRyKFwiaWRcIixpZClcclxuICAgICAgICAgICAgLmF0dHIoXCJ2aWV3Qm94XCIsXCIwIC01IDEwIDEwXCIpXHJcbiAgICAgICAgICAgIC5hdHRyKFwicmVmWFwiLDUpXHJcbiAgICAgICAgICAgIC5hdHRyKFwicmVmWVwiLDApXHJcbiAgICAgICAgICAgIC5hdHRyKFwibWFya2VyV2lkdGhcIiw0KVxyXG4gICAgICAgICAgICAuYXR0cihcIm1hcmtlckhlaWdodFwiLDQpXHJcbiAgICAgICAgICAgIC5hdHRyKFwib3JpZW50XCIsXCJhdXRvXCIpXHJcbiAgICAgICAgICAgIC5hcHBlbmQoXCJwYXRoXCIpXHJcbiAgICAgICAgICAgIC5hdHRyKFwiZFwiLCBcIk0wLC01TDEwLDBMMCw1XCIpXHJcbiAgICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIixcImFycm93SGVhZFwiKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVCcnVzaEV4dGVudCgpIHtcclxuICAgICAgICB2YXIgc2VsZiA9dGhpcztcclxuICAgICAgICB0aGlzLmJydXNoLmV4dGVudChbWzAsIDBdLCBbc2VsZi5zdmcuYXR0cignd2lkdGgnKSwgc2VsZi5zdmcuYXR0cignaGVpZ2h0JyldXSk7XHJcbiAgICAgICAgdGhpcy5icnVzaENvbnRhaW5lci5jYWxsKHRoaXMuYnJ1c2gpO1xyXG4gICAgfVxyXG4gICAgaW5pdEJydXNoKCkge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgdmFyIGJydXNoQ29udGFpbmVyID0gc2VsZi5icnVzaENvbnRhaW5lciA9IHRoaXMuYnJ1c2hDb250YWluZXI9IHRoaXMud3JhcHBlckdyb3VwLnNlbGVjdE9ySW5zZXJ0KFwiZy5icnVzaFwiLCBcIjpmaXJzdC1jaGlsZFwiKVxyXG4gICAgICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwiYnJ1c2hcIik7XHJcblxyXG4gICAgICAgIHZhciBicnVzaCA9IHRoaXMuYnJ1c2ggPSBkMy5icnVzaCgpXHJcbiAgICAgICAgICAgIC5vbihcInN0YXJ0XCIsIGJydXNoc3RhcnQpXHJcbiAgICAgICAgICAgIC5vbihcImJydXNoXCIsIGJydXNobW92ZSlcclxuICAgICAgICAgICAgLm9uKFwiZW5kXCIsIGJydXNoZW5kKTtcclxuXHJcblxyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZUJydXNoRXh0ZW50KCk7XHJcblxyXG4gICAgICAgIGJydXNoQ29udGFpbmVyLnNlbGVjdCgnLm92ZXJsYXknKS5vbihcIm1vdXNlbW92ZS5lZGdlU2VsZWN0aW9uXCIsIG1vdXNlbW92ZWQpO1xyXG4gICAgICAgIGZ1bmN0aW9uIG1vdXNlbW92ZWQoKSB7XHJcbiAgICAgICAgICAgIHZhciBtID0gZDMubW91c2UodGhpcyk7XHJcbiAgICAgICAgICAgIHZhciBtZ3QgPSBzZWxmLmdldE1haW5Hcm91cFRyYW5zbGF0aW9uKCk7XHJcbiAgICAgICAgICAgIHZhciBtYXJnaW4gPSAxMDtcclxuXHJcbiAgICAgICAgICAgIHZhciBjbG9zZXN0ID0gW251bGwsIDk5OTk5OTk5OV07XHJcbiAgICAgICAgICAgIHZhciBjbG9zZUVkZ2VzID0gW107XHJcbiAgICAgICAgICAgIHNlbGYubWFpbkdyb3VwLnNlbGVjdEFsbCgnLmVkZ2UnKS5lYWNoKGZ1bmN0aW9uKGQpe1xyXG4gICAgICAgICAgICAgICAgdmFyIHNlbGVjdGlvbiA9IGQzLnNlbGVjdCh0aGlzKTtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGlvbi5jbGFzc2VkKCdzZC1ob3ZlcicsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHZhciBwYXRoTm9kZSA9IHNlbGVjdGlvbi5zZWxlY3QoJ3BhdGgnKS5ub2RlKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgYiA9IHBhdGhOb2RlLmdldEJCb3goKTtcclxuICAgICAgICAgICAgICAgIGlmKGIueCttZ3RbMF0gPD1tWzBdICYmIGIueCtiLndpZHRoK21ndFswXSA+PSBtWzBdICYmXHJcbiAgICAgICAgICAgICAgICAgICBiLnkrbWd0WzFdLW1hcmdpbiA8PW1bMV0gJiYgYi55K2IuaGVpZ2h0K21ndFsxXSttYXJnaW4gPj0gbVsxXSl7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjcCA9IEFwcFV0aWxzLmNsb3Nlc3RQb2ludChwYXRoTm9kZSwgW21bMF0tbWd0WzBdLCBtWzFdLW1ndFsxXV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGNwLmRpc3RhbmNlIDwgbWFyZ2luICYmIGNwLmRpc3RhbmNlPGNsb3Nlc3RbMV0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0ID0gW3NlbGVjdGlvbiwgY3AuZGlzdGFuY2VdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgc2VsZi5ob3ZlcmVkRWRnZSA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmKGNsb3Nlc3RbMF0pe1xyXG4gICAgICAgICAgICAgICAgY2xvc2VzdFswXS5jbGFzc2VkKCdzZC1ob3ZlcicsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5ob3ZlcmVkRWRnZSA9IGNsb3Nlc3RbMF07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBicnVzaHN0YXJ0KCkge1xyXG4gICAgICAgICAgICBpZiAoIWQzLmV2ZW50LnNlbGVjdGlvbikgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZihzZWxmLmhvdmVyZWRFZGdlKXtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2VsZWN0RWRnZShzZWxmLmhvdmVyZWRFZGdlLmRhdHVtKCksIHRydWUpXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgc2VsZi5jbGVhclNlbGVjdGlvbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIENvbnRleHRNZW51LmhpZGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEhpZ2hsaWdodCB0aGUgc2VsZWN0ZWQgbm9kZXMuXHJcbiAgICAgICAgZnVuY3Rpb24gYnJ1c2htb3ZlKCkge1xyXG4gICAgICAgICAgICB2YXIgcyA9IGQzLmV2ZW50LnNlbGVjdGlvbjtcclxuICAgICAgICAgICAgaWYoIXMpcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgc2VsZi5tYWluR3JvdXAuc2VsZWN0QWxsKFwiLm5vZGVcIikuY2xhc3NlZCgnc2VsZWN0ZWQnLCBmdW5jdGlvbiAoZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1haW5Hcm91cFRyYW5zbGF0aW9uID0gc2VsZi5nZXRNYWluR3JvdXBUcmFuc2xhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHggPSBkLmxvY2F0aW9uLngrbWFpbkdyb3VwVHJhbnNsYXRpb25bMF07XHJcbiAgICAgICAgICAgICAgICB2YXIgeSA9IGQubG9jYXRpb24ueSttYWluR3JvdXBUcmFuc2xhdGlvblsxXTtcclxuICAgICAgICAgICAgICAgIHZhciBub2RlU2l6ZSA9IHNlbGYuY29uZmlnLmxheW91dC5ub2RlU2l6ZTtcclxuICAgICAgICAgICAgICAgIHZhciBvZmZzZXQgPSBub2RlU2l6ZSowLjI1O1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNbMF1bMF0gPD0geCtvZmZzZXQgJiYgeC1vZmZzZXQgPD0gc1sxXVswXVxyXG4gICAgICAgICAgICAgICAgICAgICYmIHNbMF1bMV0gPD0geStvZmZzZXQgJiYgeS1vZmZzZXQgPD0gc1sxXVsxXTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIElmIHRoZSBicnVzaCBpcyBlbXB0eSwgc2VsZWN0IGFsbCBjaXJjbGVzLlxyXG4gICAgICAgIGZ1bmN0aW9uIGJydXNoZW5kKCkge1xyXG4gICAgICAgICAgICBpZiAoIWQzLmV2ZW50LnNlbGVjdGlvbikgcmV0dXJuO1xyXG4gICAgICAgICAgICBicnVzaC5tb3ZlKGJydXNoQ29udGFpbmVyLCBudWxsKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBzZWxlY3RlZE5vZGVzID0gc2VsZi5nZXRTZWxlY3RlZE5vZGVzKCk7XHJcbiAgICAgICAgICAgIGlmKHNlbGVjdGVkTm9kZXMgJiYgc2VsZWN0ZWROb2Rlcy5sZW5ndGggPT09IDEpe1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zZWxlY3ROb2RlKHNlbGVjdGVkTm9kZXNbMF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGlmICghZDMuZXZlbnQuc2VsZWN0aW9uKSBzZWxmLm1haW5Hcm91cC5zZWxlY3RBbGwoXCIuc2VsZWN0ZWRcIikuY2xhc3NlZCgnc2VsZWN0ZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRpc2FibGVCcnVzaCgpe1xyXG4gICAgICAgIGlmKCF0aGlzLmJydXNoRGlzYWJsZWQpe1xyXG4gICAgICAgICAgICBBcHBVdGlscy5ncm93bChpMThuLnQoJ2dyb3dsLmJydXNoRGlzYWJsZWQnKSwgJ2luZm8nLCAnbGVmdCcpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYnJ1c2hEaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5icnVzaENvbnRhaW5lci5yZW1vdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBlbmFibGVCcnVzaCgpe1xyXG4gICAgICAgIGlmKHRoaXMuYnJ1c2hEaXNhYmxlZCl7XHJcbiAgICAgICAgICAgIEFwcFV0aWxzLmdyb3dsKGkxOG4udCgnZ3Jvd2wuYnJ1c2hFbmFibGVkJyksICdpbmZvJywgJ2xlZnQnKVxyXG4gICAgICAgICAgICB0aGlzLmluaXRCcnVzaCgpO1xyXG4gICAgICAgICAgICB0aGlzLmJydXNoRGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXRNYWluR3JvdXBUcmFuc2xhdGlvbihpbnZlcnQpIHtcclxuICAgICAgICB2YXIgdHJhbnNsYXRpb24gPSBBcHBVdGlscy5nZXRUcmFuc2xhdGlvbih0aGlzLm1haW5Hcm91cC5hdHRyKFwidHJhbnNmb3JtXCIpKTtcclxuICAgICAgICBpZihpbnZlcnQpe1xyXG4gICAgICAgICAgICB0cmFuc2xhdGlvblswXSA9IC10cmFuc2xhdGlvblswXTtcclxuICAgICAgICAgICAgdHJhbnNsYXRpb25bMV0gPSAtdHJhbnNsYXRpb25bMV1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRyYW5zbGF0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXROb2RlQ29udGV4dE1lbnUoKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlQ29udGV4dE1lbnUgPSBuZXcgTm9kZUNvbnRleHRNZW51KHRoaXMsIHRoaXMuY29uZmlnLm9wZXJhdGlvbnNGb3JPYmplY3QpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRFZGdlQ29udGV4dE1lbnUoKSB7XHJcbiAgICAgICAgdGhpcy5lZGdlQ29udGV4dE1lbnUgPSBuZXcgRWRnZUNvbnRleHRNZW51KHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRUZXh0Q29udGV4dE1lbnUoKSB7XHJcbiAgICAgICAgdGhpcy50ZXh0Q29udGV4dE1lbnUgPSBuZXcgVGV4dENvbnRleHRNZW51KHRoaXMpO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgaW5pdE1haW5Db250ZXh0TWVudSgpIHtcclxuICAgICAgICB0aGlzLm1haW5Db250ZXh0TWVudSA9IG5ldyBNYWluQ29udGV4dE1lbnUodGhpcyk7XHJcbiAgICAgICAgdGhpcy5zdmcub24oJ2NvbnRleHRtZW51Jyx0aGlzLm1haW5Db250ZXh0TWVudSk7XHJcbiAgICAgICAgdGhpcy5zdmcub24oJ2RibGNsaWNrJyx0aGlzLm1haW5Db250ZXh0TWVudSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkVGV4dCh0ZXh0KXtcclxuICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKCk7XHJcbiAgICAgICAgdGhpcy5kYXRhLmFkZFRleHQodGV4dCk7XHJcbiAgICAgICAgdGhpcy5yZWRyYXcoKTtcclxuICAgICAgICB0aGlzLnNlbGVjdFRleHQodGV4dCk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkTm9kZShub2RlLCBwYXJlbnQsIHJlZHJhdz1mYWxzZSl7XHJcbiAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSgpO1xyXG4gICAgICAgIHRoaXMuZGF0YS5hZGROb2RlKG5vZGUsIHBhcmVudCk7XHJcbiAgICAgICAgdGhpcy5yZWRyYXcodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5sYXlvdXQudXBkYXRlKG5vZGUpO1xyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZERlY2lzaW9uTm9kZShwYXJlbnQpe1xyXG4gICAgICAgIHZhciBuZXdOb2RlID0gbmV3IG1vZGVsLkRlY2lzaW9uTm9kZSh0aGlzLmxheW91dC5nZXROZXdDaGlsZExvY2F0aW9uKHBhcmVudCkpO1xyXG4gICAgICAgIHRoaXMuYWRkTm9kZShuZXdOb2RlLCBwYXJlbnQpXHJcbiAgICB9XHJcbiAgICBhZGRDaGFuY2VOb2RlKHBhcmVudCl7XHJcbiAgICAgICAgdmFyIG5ld05vZGUgPSBuZXcgbW9kZWwuQ2hhbmNlTm9kZSh0aGlzLmxheW91dC5nZXROZXdDaGlsZExvY2F0aW9uKHBhcmVudCkpO1xyXG4gICAgICAgIHRoaXMuYWRkTm9kZShuZXdOb2RlLCBwYXJlbnQpXHJcbiAgICB9XHJcbiAgICBhZGRUZXJtaW5hbE5vZGUocGFyZW50KXtcclxuICAgICAgICB2YXIgbmV3Tm9kZSA9IG5ldyBtb2RlbC5UZXJtaW5hbE5vZGUodGhpcy5sYXlvdXQuZ2V0TmV3Q2hpbGRMb2NhdGlvbihwYXJlbnQpKTtcclxuICAgICAgICB0aGlzLmFkZE5vZGUobmV3Tm9kZSwgcGFyZW50KVxyXG4gICAgfVxyXG5cclxuICAgIGluamVjdE5vZGUobm9kZSwgZWRnZSl7XHJcbiAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSgpO1xyXG4gICAgICAgIHRoaXMuZGF0YS5pbmplY3ROb2RlKG5vZGUsIGVkZ2UpO1xyXG4gICAgICAgIHRoaXMucmVkcmF3KCk7XHJcbiAgICAgICAgdGhpcy5sYXlvdXQudXBkYXRlKG5vZGUpO1xyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfVxyXG5cclxuICAgIGluamVjdERlY2lzaW9uTm9kZShlZGdlKXtcclxuICAgICAgICB2YXIgbmV3Tm9kZSA9IG5ldyBtb2RlbC5EZWNpc2lvbk5vZGUodGhpcy5sYXlvdXQuZ2V0SW5qZWN0ZWROb2RlTG9jYXRpb24oZWRnZSkpO1xyXG4gICAgICAgIHRoaXMuaW5qZWN0Tm9kZShuZXdOb2RlLCBlZGdlKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgaW5qZWN0Q2hhbmNlTm9kZShlZGdlKXtcclxuICAgICAgICB2YXIgbmV3Tm9kZSA9IG5ldyBtb2RlbC5DaGFuY2VOb2RlKHRoaXMubGF5b3V0LmdldEluamVjdGVkTm9kZUxvY2F0aW9uKGVkZ2UpKTtcclxuICAgICAgICB0aGlzLmluamVjdE5vZGUobmV3Tm9kZSwgZWRnZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlTm9kZShub2RlKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSgpO1xyXG4gICAgICAgIHRoaXMuZGF0YS5yZW1vdmVOb2RlKG5vZGUpO1xyXG5cclxuXHJcbiAgICAgICAgaWYoIXRoaXMubGF5b3V0LmlzTWFudWFsTGF5b3V0KCkpe1xyXG4gICAgICAgICAgICB0aGlzLmxheW91dC51cGRhdGUoKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5yZWRyYXcoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlU2VsZWN0ZWROb2RlcygpIHtcclxuICAgICAgICB2YXIgc2VsZWN0ZWROb2RlcyA9IHRoaXMuZ2V0U2VsZWN0ZWROb2RlcygpO1xyXG4gICAgICAgIGlmKCFzZWxlY3RlZE5vZGVzLmxlbmd0aCl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSgpO1xyXG4gICAgICAgIHRoaXMuZGF0YS5yZW1vdmVOb2RlcyhzZWxlY3RlZE5vZGVzKTtcclxuICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5yZWRyYXcoKTtcclxuICAgICAgICB0aGlzLmxheW91dC51cGRhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVTZWxlY3RlZFRleHRzKCl7XHJcbiAgICAgICAgdmFyIHNlbGVjdGVkVGV4dHMgPSB0aGlzLmdldFNlbGVjdGVkVGV4dHMoKTtcclxuXHJcbiAgICAgICAgaWYoIXNlbGVjdGVkVGV4dHMubGVuZ3RoKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKCk7XHJcbiAgICAgICAgdGhpcy5kYXRhLnJlbW92ZVRleHRzKHNlbGVjdGVkVGV4dHMpO1xyXG4gICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcclxuICAgICAgICB0aGlzLnJlZHJhdygpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvcHlOb2RlKGQsIG5vdENsZWFyUHJldlNlbGVjdGlvbikge1xyXG4gICAgICAgIHZhciBjbG9uZSA9IHRoaXMuZGF0YS5jbG9uZVN1YnRyZWUoZCk7XHJcbiAgICAgICAgaWYobm90Q2xlYXJQcmV2U2VsZWN0aW9uKXtcclxuICAgICAgICAgICAgaWYoIXRoaXMuY29waWVkTm9kZXMpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb3BpZWROb2Rlcz1bXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmNvcGllZE5vZGVzLnB1c2goY2xvbmUpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmNvcGllZE5vZGVzID0gW2Nsb25lXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGN1dE5vZGUoZCkge1xyXG4gICAgICAgIHRoaXMuY29weU5vZGUoZCk7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVOb2RlKGQpO1xyXG4gICAgfVxyXG5cclxuICAgIGN1dFNlbGVjdGVkTm9kZXMoKXtcclxuICAgICAgICB2YXIgc2VsZWN0ZWROb2RlcyA9IHRoaXMuZ2V0U2VsZWN0ZWROb2RlcygpO1xyXG4gICAgICAgIHZhciBzZWxlY3RlZFJvb3RzID0gdGhpcy5kYXRhLmZpbmRTdWJ0cmVlUm9vdHMoc2VsZWN0ZWROb2Rlcyk7XHJcbiAgICAgICAgdGhpcy5jb3B5Tm9kZXMoc2VsZWN0ZWRSb290cyk7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVTZWxlY3RlZE5vZGVzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29weVNlbGVjdGVkTm9kZXMoKSB7XHJcbiAgICAgICAgdmFyIHNlbGY7XHJcbiAgICAgICAgdmFyIHNlbGVjdGVkTm9kZXMgPSB0aGlzLmdldFNlbGVjdGVkTm9kZXMoKTtcclxuXHJcbiAgICAgICAgdmFyIHNlbGVjdGVkUm9vdHMgPSB0aGlzLmRhdGEuZmluZFN1YnRyZWVSb290cyhzZWxlY3RlZE5vZGVzKTtcclxuICAgICAgICB0aGlzLmNvcHlOb2RlcyhzZWxlY3RlZFJvb3RzKTtcclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIGNvcHlOb2Rlcyhub2Rlcyl7XHJcbiAgICAgICAgdGhpcy5jb3BpZWROb2RlcyA9IG5vZGVzLm1hcChkPT50aGlzLmRhdGEuY2xvbmVTdWJ0cmVlKGQpKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIHBhc3RlVG9Ob2RlKG5vZGUpIHtcclxuICAgICAgICBpZighdGhpcy5jb3BpZWROb2RlcyB8fCAhdGhpcy5jb3BpZWROb2Rlcy5sZW5ndGgpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoKTtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgc2VsZi5jbGVhclNlbGVjdGlvbigpO1xyXG4gICAgICAgIHZhciBub2Rlc1RvQXR0YWNoID0gdGhpcy5jb3BpZWROb2RlcztcclxuICAgICAgICBzZWxmLmNvcHlOb2Rlcyh0aGlzLmNvcGllZE5vZGVzKTtcclxuICAgICAgICBub2Rlc1RvQXR0YWNoLmZvckVhY2godG9BdHRhY2g9PntcclxuICAgICAgICAgICAgdmFyIGF0dGFjaGVkID0gdGhpcy5kYXRhLmF0dGFjaFN1YnRyZWUodG9BdHRhY2gsIG5vZGUpLmNoaWxkTm9kZTtcclxuICAgICAgICAgICAgaWYoYXR0YWNoZWQuZm9sZGVkKXtcclxuICAgICAgICAgICAgICAgIHNlbGYuZm9sZFN1YnRyZWUoYXR0YWNoZWQsIGF0dGFjaGVkLmZvbGRlZCwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBsb2NhdGlvbiA9IHNlbGYubGF5b3V0LmdldE5ld0NoaWxkTG9jYXRpb24obm9kZSk7XHJcbiAgICAgICAgICAgIGF0dGFjaGVkLm1vdmVUbyhsb2NhdGlvbi54LCBsb2NhdGlvbi55LCB0cnVlKTtcclxuICAgICAgICAgICAgc2VsZi5sYXlvdXQubW92ZU5vZGVUb0VtcHR5UGxhY2UoYXR0YWNoZWQsIGZhbHNlKTtcclxuICAgICAgICAgICAgc2VsZi5sYXlvdXQuZml0Tm9kZXNJblBsb3R0aW5nUmVnaW9uKHRoaXMuZGF0YS5nZXRBbGxEZXNjZW5kYW50Tm9kZXMoYXR0YWNoZWQpKTtcclxuXHJcbiAgICAgICAgICAgIHNlbGYuc2VsZWN0U3ViVHJlZShhdHRhY2hlZCwgZmFsc2UsIG5vZGVzVG9BdHRhY2gubGVuZ3RoPjEpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZihub2RlLmZvbGRlZCl7XHJcbiAgICAgICAgICAgIHNlbGYuZm9sZFN1YnRyZWUobm9kZSwgbm9kZS5mb2xkZWQsIGZhbHNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgc2VsZi5yZWRyYXcoKTtcclxuICAgICAgICAgICAgc2VsZi5sYXlvdXQudXBkYXRlKCk7XHJcbiAgICAgICAgfSwxMClcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcGFzdGVUb05ld0xvY2F0aW9uKHBvaW50KSB7XHJcbiAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSgpO1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICBzZWxmLmNsZWFyU2VsZWN0aW9uKCk7XHJcbiAgICAgICAgdmFyIG5vZGVzVG9BdHRhY2ggPSB0aGlzLmNvcGllZE5vZGVzO1xyXG4gICAgICAgIHNlbGYuY29weU5vZGVzKHRoaXMuY29waWVkTm9kZXMpO1xyXG4gICAgICAgIG5vZGVzVG9BdHRhY2guZm9yRWFjaCh0b0F0dGFjaD0+IHtcclxuICAgICAgICAgICAgdmFyIGF0dGFjaGVkID0gdGhpcy5kYXRhLmF0dGFjaFN1YnRyZWUodG9BdHRhY2gpO1xyXG4gICAgICAgICAgICBpZihhdHRhY2hlZC5mb2xkZWQpe1xyXG4gICAgICAgICAgICAgICAgc2VsZi5mb2xkU3VidHJlZShhdHRhY2hlZCwgYXR0YWNoZWQuZm9sZGVkLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYXR0YWNoZWQubW92ZVRvKHBvaW50LngsIHBvaW50LnksIHRydWUpO1xyXG4gICAgICAgICAgICBzZWxmLmxheW91dC5tb3ZlTm9kZVRvRW1wdHlQbGFjZShhdHRhY2hlZCwgZmFsc2UpO1xyXG4gICAgICAgICAgICBzZWxmLmxheW91dC5maXROb2Rlc0luUGxvdHRpbmdSZWdpb24odGhpcy5kYXRhLmdldEFsbERlc2NlbmRhbnROb2RlcyhhdHRhY2hlZCkpO1xyXG5cclxuICAgICAgICAgICAgc2VsZi5zZWxlY3RTdWJUcmVlKGF0dGFjaGVkLCBmYWxzZSwgbm9kZXNUb0F0dGFjaC5sZW5ndGg+MSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgc2VsZi5yZWRyYXcoKTtcclxuICAgICAgICAgICAgc2VsZi5sYXlvdXQudXBkYXRlKCk7XHJcbiAgICAgICAgfSwxMClcclxuXHJcbiAgICB9XHJcblxyXG4gICAgY29udmVydE5vZGUobm9kZSwgdHlwZVRvQ29udmVydFRvKXtcclxuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKCk7XHJcbiAgICAgICAgdGhpcy5kYXRhLmNvbnZlcnROb2RlKG5vZGUsIHR5cGVUb0NvbnZlcnRUbyk7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBzZWxmLnJlZHJhdyh0cnVlKTtcclxuICAgICAgICB9LDEwKVxyXG4gICAgfVxyXG5cclxuICAgIHBlcmZvcm1PcGVyYXRpb24ob2JqZWN0LCBvcGVyYXRpb24pe1xyXG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoKTtcclxuICAgICAgICB0aGlzLmNvbmZpZy5wZXJmb3JtT3BlcmF0aW9uKG9iamVjdCwgb3BlcmF0aW9uKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgc2VsZi5yZWRyYXcoKTtcclxuICAgICAgICAgICAgICAgIHNlbGYubGF5b3V0LnVwZGF0ZSgpO1xyXG4gICAgICAgICAgICB9LDEwKVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZvbGRTdWJ0cmVlKG5vZGUsIGZvbGQgPSB0cnVlLCByZWRyYXc9dHJ1ZSl7XHJcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbm9kZS5mb2xkZWQgPSBmb2xkO1xyXG5cclxuICAgICAgICB0aGlzLmRhdGEuZ2V0QWxsRGVzY2VuZGFudE5vZGVzKG5vZGUpLmZvckVhY2gobj0+e1xyXG4gICAgICAgICAgICBuLiRoaWRkZW4gPSBmb2xkO1xyXG4gICAgICAgICAgICBuLmZvbGRlZCA9IGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuZGF0YS5nZXRBbGxEZXNjZW5kYW50RWRnZXMobm9kZSkuZm9yRWFjaChlPT5lLiRoaWRkZW4gPSBmb2xkKTtcclxuXHJcbiAgICAgICAgaWYoIXJlZHJhdyl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBzZWxmLnJlZHJhdygpO1xyXG4gICAgICAgICAgICBzZWxmLmxheW91dC51cGRhdGUoKTtcclxuICAgICAgICB9LDEwKVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVZpc2liaWxpdHkobm9kZSA9IG51bGwpe1xyXG4gICAgICAgIGlmKCFub2RlKXtcclxuICAgICAgICAgICAgdGhpcy5kYXRhLmdldFJvb3RzKCkuZm9yRWFjaChuPT50aGlzLnVwZGF0ZVZpc2liaWxpdHkobikpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihub2RlLmZvbGRlZCl7XHJcbiAgICAgICAgICAgIHRoaXMuZm9sZFN1YnRyZWUobm9kZSwgdHJ1ZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBub2RlLmNoaWxkRWRnZXMuZm9yRWFjaChlID0+IHRoaXMudXBkYXRlVmlzaWJpbGl0eShlLmNoaWxkTm9kZSkpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBtb3ZlTm9kZVRvKHgseSl7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZU5vZGVQb3NpdGlvbihub2RlKSB7XHJcbiAgICAgICAgdGhpcy5nZXROb2RlRDNTZWxlY3Rpb24obm9kZSkucmFpc2UoKS5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcrbm9kZS5sb2NhdGlvbi54KycgJytub2RlLmxvY2F0aW9uLnkrJyknKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVUZXh0UG9zaXRpb24odGV4dCkge1xyXG4gICAgICAgIHRoaXMuZ2V0VGV4dEQzU2VsZWN0aW9uKHRleHQpLnJhaXNlKCkuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnK3RleHQubG9jYXRpb24ueCsnICcrdGV4dC5sb2NhdGlvbi55KycpJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Tm9kZUQzU2VsZWN0aW9uKG5vZGUpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE5vZGVEM1NlbGVjdGlvbkJ5SWQobm9kZS5pZCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Tm9kZUQzU2VsZWN0aW9uQnlJZChpZCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWFpbkdyb3VwLnNlbGVjdCgnI25vZGUtJytpZCk7XHJcbiAgICB9XHJcbiAgICBnZXRUZXh0RDNTZWxlY3Rpb24odGV4dCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VGV4dEQzU2VsZWN0aW9uQnlJZCh0ZXh0LmlkKTtcclxuICAgIH1cclxuICAgIGdldFRleHREM1NlbGVjdGlvbkJ5SWQoaWQpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1haW5Hcm91cC5zZWxlY3QoJyN0ZXh0LScraWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFNlbGVjdGVkTm9kZXModmlzaWJsZU9ubHkgPSBmYWxzZSkge1xyXG4gICAgICAgIGxldCBzZWxlY3RlZFZpc2libGUgPSB0aGlzLm1haW5Hcm91cC5zZWxlY3RBbGwoXCIubm9kZS5zZWxlY3RlZFwiKS5kYXRhKCk7XHJcbiAgICAgICAgaWYodmlzaWJsZU9ubHkpe1xyXG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0ZWRWaXNpYmxlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGFsbFNlbGVjdGVkICA9IFtdO1xyXG4gICAgICAgIGFsbFNlbGVjdGVkLnB1c2goLi4uc2VsZWN0ZWRWaXNpYmxlKTtcclxuXHJcbiAgICAgICAgc2VsZWN0ZWRWaXNpYmxlLmZvckVhY2gobj0+e1xyXG4gICAgICAgICAgICBpZihuLmZvbGRlZCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGVzY2VuZGFudHMgPSB0aGlzLmRhdGEuZ2V0QWxsRGVzY2VuZGFudE5vZGVzKG4pO1xyXG4gICAgICAgICAgICAgICAgaWYoZGVzY2VuZGFudHMpe1xyXG4gICAgICAgICAgICAgICAgICAgIGFsbFNlbGVjdGVkLnB1c2goLi4uZGVzY2VuZGFudHMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBhbGxTZWxlY3RlZDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTZWxlY3RlZFRleHRzKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWFpbkdyb3VwLnNlbGVjdEFsbChcIi5mbG9hdGluZy10ZXh0LnNlbGVjdGVkXCIpLmRhdGEoKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGVhclNlbGVjdGlvbigpe1xyXG4gICAgICAgIHRoaXMubWFpbkdyb3VwLnNlbGVjdEFsbChcIi5lZGdlLnNlbGVjdGVkXCIpLnNlbGVjdCgncGF0aCcpLmF0dHIoXCJtYXJrZXItZW5kXCIsIGQgPT4gXCJ1cmwoI2Fycm93XCIrKHRoaXMuaXNPcHRpbWFsKGQpPyctb3B0aW1hbCc6JycpK1wiKVwiKVxyXG4gICAgICAgIHRoaXMubWFpbkdyb3VwLnNlbGVjdEFsbChcIi5zZWxlY3RlZFwiKS5jbGFzc2VkKCdzZWxlY3RlZCcsIGZhbHNlKTtcclxuICAgICAgICB0aGlzLmNvbmZpZy5vblNlbGVjdGlvbkNsZWFyZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3RFZGdlKGVkZ2UsIGNsZWFyU2VsZWN0aW9uQmVmb3JlU2VsZWN0KXtcclxuICAgICAgICBpZihjbGVhclNlbGVjdGlvbkJlZm9yZVNlbGVjdCl7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb25maWcub25FZGdlU2VsZWN0ZWQoZWRnZSk7XHJcbiAgICAgICAgdGhpcy5tYWluR3JvdXAuc2VsZWN0KCcjZWRnZS0nK2VkZ2UuaWQpXHJcbiAgICAgICAgICAgIC5jbGFzc2VkKCdzZWxlY3RlZCcsIHRydWUpXHJcbiAgICAgICAgICAgIC5zZWxlY3QoJ3BhdGgnKVxyXG4gICAgICAgICAgICAuYXR0cihcIm1hcmtlci1lbmRcIiwgZCA9PiBcInVybCgjYXJyb3ctc2VsZWN0ZWQpXCIpXHJcbiAgICB9XHJcblxyXG4gICAgaXNOb2RlU2VsZWN0ZWQobm9kZSl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Tm9kZUQzU2VsZWN0aW9uKG5vZGUpLmNsYXNzZWQoJ3NlbGVjdGVkJyk7XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0Tm9kZShub2RlLCBjbGVhclNlbGVjdGlvbkJlZm9yZVNlbGVjdCwgc2tpcENhbGxiYWNrKXtcclxuICAgICAgICBpZihjbGVhclNlbGVjdGlvbkJlZm9yZVNlbGVjdCl7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKCFza2lwQ2FsbGJhY2spe1xyXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5vbk5vZGVTZWxlY3RlZChub2RlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0Tm9kZUQzU2VsZWN0aW9uQnlJZChub2RlLmlkKS5jbGFzc2VkKCdzZWxlY3RlZCcsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbGVjdFRleHQodGV4dCwgY2xlYXJTZWxlY3Rpb25CZWZvcmVTZWxlY3QsIHNraXBDYWxsYmFjayl7XHJcbiAgICAgICAgaWYoY2xlYXJTZWxlY3Rpb25CZWZvcmVTZWxlY3Qpe1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZighc2tpcENhbGxiYWNrKXtcclxuICAgICAgICAgICAgdGhpcy5jb25maWcub25UZXh0U2VsZWN0ZWQodGV4dClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0VGV4dEQzU2VsZWN0aW9uQnlJZCh0ZXh0LmlkKS5jbGFzc2VkKCdzZWxlY3RlZCcsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbGVjdFN1YlRyZWUobm9kZSwgY2xlYXJTZWxlY3Rpb25CZWZvcmVTZWxlY3Qsc2tpcENhbGxiYWNrKSB7XHJcbiAgICAgICAgaWYoY2xlYXJTZWxlY3Rpb25CZWZvcmVTZWxlY3Qpe1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2VsZWN0Tm9kZShub2RlLCBmYWxzZSwgc2tpcENhbGxiYWNrKTtcclxuICAgICAgICBub2RlLmNoaWxkRWRnZXMuZm9yRWFjaChlPT50aGlzLnNlbGVjdFN1YlRyZWUoZS5jaGlsZE5vZGUsIGZhbHNlLCB0cnVlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0QWxsTm9kZXMoKSB7XHJcbiAgICAgICAgdGhpcy5tYWluR3JvdXAuc2VsZWN0QWxsKFwiLm5vZGVcIikuY2xhc3NlZCgnc2VsZWN0ZWQnLCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBhdXRvTGF5b3V0KHR5cGUsIHdpdGhvdXRTdGF0ZVNhdmluZyl7XHJcbiAgICAgICAgdGhpcy5sYXlvdXQuYXV0b0xheW91dCh0eXBlLCB3aXRob3V0U3RhdGVTYXZpbmcpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZURpYWdyYW1UaXRsZSh0aXRsZVZhbHVlKXtcclxuICAgICAgICBpZighdGl0bGVWYWx1ZSl7XHJcbiAgICAgICAgICAgIHRpdGxlVmFsdWUgPSAnJztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5kaWFncmFtVGl0bGUgPSB0aXRsZVZhbHVlO1xyXG4gICAgICAgIHRoaXMucmVkcmF3RGlhZ3JhbVRpdGxlKCk7XHJcbiAgICAgICAgdGhpcy5yZWRyYXdEaWFncmFtRGVzY3JpcHRpb24oKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZU1hcmdpbih0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICByZWRyYXdEaWFncmFtVGl0bGUoKXtcclxuICAgICAgICB2YXIgc3ZnV2lkdGggPSB0aGlzLnN2Zy5hdHRyKCd3aWR0aCcpO1xyXG4gICAgICAgIHZhciBzdmdIZWlnaHQgPSB0aGlzLnN2Zy5hdHRyKCdoZWlnaHQnKTtcclxuICAgICAgICB0aGlzLnRpdGxlQ29udGFpbmVyID0gdGhpcy5zdmcuc2VsZWN0T3JBcHBlbmQoJ2cuc2QtdGl0bGUtY29udGFpbmVyJyk7XHJcblxyXG4gICAgICAgIHZhciB0aXRsZSA9IHRoaXMudGl0bGVDb250YWluZXIuc2VsZWN0T3JBcHBlbmQoJ3RleHQuc2QtdGl0bGUnKTtcclxuICAgICAgICB0aXRsZS50ZXh0KHRoaXMuZGlhZ3JhbVRpdGxlKTtcclxuICAgICAgICBMYXlvdXQuc2V0SGFuZ2luZ1Bvc2l0aW9uKHRpdGxlKTtcclxuXHJcbiAgICAgICAgdmFyIG1hcmdpblRvcCA9IHBhcnNlSW50KHRoaXMuY29uZmlnLnRpdGxlLm1hcmdpbi50b3ApO1xyXG4gICAgICAgIHRoaXMudGl0bGVDb250YWluZXIuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnKyhzdmdXaWR0aC8yKSsnLCcrKCBtYXJnaW5Ub3ApKycpJyk7XHJcbiAgICB9XHJcbiAgICByZWRyYXdEaWFncmFtRGVzY3JpcHRpb24oKXtcclxuICAgICAgICB2YXIgc3ZnV2lkdGggPSB0aGlzLnN2Zy5hdHRyKCd3aWR0aCcpO1xyXG4gICAgICAgIHZhciBzdmdIZWlnaHQgPSB0aGlzLnN2Zy5hdHRyKCdoZWlnaHQnKTtcclxuICAgICAgICB0aGlzLnRpdGxlQ29udGFpbmVyID0gdGhpcy5zdmcuc2VsZWN0T3JBcHBlbmQoJ2cuc2QtdGl0bGUtY29udGFpbmVyJyk7XHJcblxyXG4gICAgICAgIHZhciBkZXNjID0gdGhpcy50aXRsZUNvbnRhaW5lci5zZWxlY3RPckFwcGVuZCgndGV4dC5zZC1kZXNjcmlwdGlvbicpO1xyXG5cclxuICAgICAgICBpZighdGhpcy5jb25maWcuZGVzY3JpcHRpb24uc2hvdyl7XHJcbiAgICAgICAgICAgIGRlc2MucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBsaW5lcyA9IHRoaXMuZGlhZ3JhbURlc2NyaXB0aW9uID8gdGhpcy5kaWFncmFtRGVzY3JpcHRpb24uc3BsaXQoJ1xcbicpIDogW107XHJcbiAgICAgICAgdmFyIHRzcGFucyA9IGRlc2Muc2VsZWN0QWxsKCd0c3BhbicpLmRhdGEobGluZXMpO1xyXG4gICAgICAgIHRzcGFucy5lbnRlcigpLmFwcGVuZCgndHNwYW4nKVxyXG4gICAgICAgICAgICAubWVyZ2UodHNwYW5zKVxyXG4gICAgICAgICAgICAuaHRtbChsPT5BcHBVdGlscy5yZXBsYWNlVXJscyhBcHBVdGlscy5lc2NhcGVIdG1sKGwpKSlcclxuICAgICAgICAgICAgLmF0dHIoJ2R5JywgKGQsaSk9Pmk+MCA/ICcxLjFlbSc6IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgLmF0dHIoJ3gnLCAnMCcpO1xyXG5cclxuICAgICAgICB0c3BhbnMuZXhpdCgpLnJlbW92ZSgpO1xyXG4gICAgICAgIExheW91dC5zZXRIYW5naW5nUG9zaXRpb24oZGVzYyk7XHJcblxyXG4gICAgICAgIHZhciB0aXRsZSA9IHRoaXMudGl0bGVDb250YWluZXIuc2VsZWN0T3JBcHBlbmQoJ3RleHQuc2QtdGl0bGUnKTtcclxuXHJcbiAgICAgICAgdmFyIG1hcmdpblRvcCA9IDA7XHJcbiAgICAgICAgaWYodGhpcy5kaWFncmFtVGl0bGUpe1xyXG4gICAgICAgICAgICBtYXJnaW5Ub3AgKz0gdGl0bGUubm9kZSgpLmdldEJCb3goKS5oZWlnaHQ7XHJcbiAgICAgICAgICAgIG1hcmdpblRvcCs9IE1hdGgubWF4KHBhcnNlSW50KHRoaXMuY29uZmlnLmRlc2NyaXB0aW9uLm1hcmdpbi50b3ApLCAwKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBkZXNjLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoMCwnKyggbWFyZ2luVG9wKSsnKScpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZURpYWdyYW1EZXNjcmlwdGlvbihkZXNjcmlwdGlvblZhbHVlKXtcclxuICAgICAgICBpZighZGVzY3JpcHRpb25WYWx1ZSl7XHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uVmFsdWUgPSAnJztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5kaWFncmFtRGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvblZhbHVlO1xyXG4gICAgICAgIHRoaXMucmVkcmF3RGlhZ3JhbVRpdGxlKCk7XHJcbiAgICAgICAgdGhpcy5yZWRyYXdEaWFncmFtRGVzY3JpcHRpb24oKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZU1hcmdpbih0cnVlKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgZ2V0VGl0bGVHcm91cEhlaWdodCh3aXRoTWFyZ2lucyl7XHJcbiAgICAgICAgaWYoIXRoaXMudGl0bGVDb250YWluZXIpe1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGggPSB0aGlzLnRpdGxlQ29udGFpbmVyLm5vZGUoKS5nZXRCQm94KCkuaGVpZ2h0O1xyXG4gICAgICAgIGlmKHdpdGhNYXJnaW5zKXtcclxuICAgICAgICAgICAgaCs9IHBhcnNlSW50KHRoaXMuY29uZmlnLnRpdGxlLm1hcmdpbi5ib3R0b20pO1xyXG4gICAgICAgICAgICBoKz0gcGFyc2VJbnQodGhpcy5jb25maWcudGl0bGUubWFyZ2luLnRvcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBoO1xyXG4gICAgfVxyXG5cclxufVxyXG4iLCJleHBvcnQgKiBmcm9tICcuL3NyYy9pbmRleCdcclxuIl19
