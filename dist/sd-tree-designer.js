require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

module.exports = _arrayLikeToArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;

},{}],2:[function(require,module,exports){
"use strict";

var arrayLikeToArray = require("./arrayLikeToArray.js");

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}

module.exports = _arrayWithoutHoles;
module.exports["default"] = module.exports, module.exports.__esModule = true;

},{"./arrayLikeToArray.js":1}],3:[function(require,module,exports){
"use strict";

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;
module.exports["default"] = module.exports, module.exports.__esModule = true;

},{}],4:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;
module.exports["default"] = module.exports, module.exports.__esModule = true;

},{}],5:[function(require,module,exports){
"use strict";

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

module.exports = _createClass;
module.exports["default"] = module.exports, module.exports.__esModule = true;

},{}],6:[function(require,module,exports){
"use strict";

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  module.exports["default"] = module.exports, module.exports.__esModule = true;
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;
module.exports["default"] = module.exports, module.exports.__esModule = true;

},{}],7:[function(require,module,exports){
"use strict";

var setPrototypeOf = require("./setPrototypeOf.js");

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
  if (superClass) setPrototypeOf(subClass, superClass);
}

module.exports = _inherits;
module.exports["default"] = module.exports, module.exports.__esModule = true;

},{"./setPrototypeOf.js":12}],8:[function(require,module,exports){
"use strict";

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;
module.exports["default"] = module.exports, module.exports.__esModule = true;

},{}],9:[function(require,module,exports){
"use strict";

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

module.exports = _iterableToArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;

},{}],10:[function(require,module,exports){
"use strict";

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableSpread;
module.exports["default"] = module.exports, module.exports.__esModule = true;

},{}],11:[function(require,module,exports){
"use strict";

var _typeof = require("@babel/runtime/helpers/typeof")["default"];

var assertThisInitialized = require("./assertThisInitialized.js");

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;
module.exports["default"] = module.exports, module.exports.__esModule = true;

},{"./assertThisInitialized.js":3,"@babel/runtime/helpers/typeof":14}],12:[function(require,module,exports){
"use strict";

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  module.exports["default"] = module.exports, module.exports.__esModule = true;
  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;
module.exports["default"] = module.exports, module.exports.__esModule = true;

},{}],13:[function(require,module,exports){
"use strict";

var arrayWithoutHoles = require("./arrayWithoutHoles.js");

var iterableToArray = require("./iterableToArray.js");

var unsupportedIterableToArray = require("./unsupportedIterableToArray.js");

var nonIterableSpread = require("./nonIterableSpread.js");

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;

},{"./arrayWithoutHoles.js":2,"./iterableToArray.js":9,"./nonIterableSpread.js":10,"./unsupportedIterableToArray.js":15}],14:[function(require,module,exports){
"use strict";

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };

    module.exports["default"] = module.exports, module.exports.__esModule = true;
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    module.exports["default"] = module.exports, module.exports.__esModule = true;
  }

  return _typeof(obj);
}

module.exports = _typeof;
module.exports["default"] = module.exports, module.exports.__esModule = true;

},{}],15:[function(require,module,exports){
"use strict";

var arrayLikeToArray = require("./arrayLikeToArray.js");

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

module.exports = _unsupportedIterableToArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;

},{"./arrayLikeToArray.js":1}],16:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppUtils = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

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
      default: obj
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

  newObj.default = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

var AppUtils = /*#__PURE__*/function () {
  function AppUtils() {
    (0, _classCallCheck2.default)(this, AppUtils);
  }

  (0, _createClass2.default)(AppUtils, null, [{
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
        textD3Obj.on("mouseover", function (event, d) {
          tooltip.transition().duration(200).style("opacity", .9);
          tooltip.html(textString).style("left", event.pageX + 5 + "px").style("top", event.pageY - 28 + "px");
        });
        textD3Obj.on("mouseout", function (event, d) {
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

},{"./d3":23,"./i18n/i18n":27,"./templates":35,"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/interopRequireDefault":8,"@babel/runtime/helpers/typeof":14,"sd-utils":"sd-utils"}],17:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContextMenu = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

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
      default: obj
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

  newObj.default = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}
/*based on:
 * github.com/patorjk/d3-context-menu */


var ContextMenu = /*#__PURE__*/function () {
  function ContextMenu(menu, opts) {
    (0, _classCallCheck2.default)(this, ContextMenu);
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

    return function (event, data) {
      var elm = this;
      d3.selectAll('.d3-context-menu').html('');
      var list = d3.selectAll('.d3-context-menu').on('contextmenu', function (event, d) {
        d3.select('.d3-context-menu').style('display', 'none');
        event.preventDefault();
        event.stopPropagation();
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
      }).on('click', function (event, d) {
        if (d.disabled) return; // do nothing if disabled

        if (!d.action) return; // headers have no "action"

        d.action(elm, data);
        d3.select('.d3-context-menu').style('display', 'none');

        if (self.closeCallback) {
          self.closeCallback();
        }
      }); // the openCallback allows an action to fire before the menu is displayed
      // an example usage would be closing a tooltip

      if (self.openCallback) {
        if (self.openCallback(event, data) === false) {
          return;
        }
      } // display context menu


      d3.select('.d3-context-menu').style('left', event.pageX - 2 + 'px').style('top', event.pageY - 2 + 'px').style('display', 'block');
      event.preventDefault();
      event.stopPropagation();
    };
  }

  (0, _createClass2.default)(ContextMenu, null, [{
    key: "hide",
    value: function hide() {
      d3.select('.d3-context-menu').style('display', 'none');
    }
  }]);
  return ContextMenu;
}();

exports.ContextMenu = ContextMenu;

},{"../d3":23,"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/interopRequireDefault":8,"@babel/runtime/helpers/typeof":14}],18:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EdgeContextMenu = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _contextMenu = require("./context-menu");

var _i18n = require("../i18n/i18n");

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = (0, _getPrototypeOf2.default)(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = (0, _getPrototypeOf2.default)(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return (0, _possibleConstructorReturn2.default)(this, result);
  };
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

var EdgeContextMenu = /*#__PURE__*/function (_ContextMenu) {
  (0, _inherits2.default)(EdgeContextMenu, _ContextMenu);

  var _super = _createSuper(EdgeContextMenu);

  function EdgeContextMenu(treeDesigner) {
    var _this;

    (0, _classCallCheck2.default)(this, EdgeContextMenu);

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

},{"../i18n/i18n":27,"./context-menu":17,"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/getPrototypeOf":6,"@babel/runtime/helpers/inherits":7,"@babel/runtime/helpers/interopRequireDefault":8,"@babel/runtime/helpers/possibleConstructorReturn":11}],19:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MainContextMenu = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

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
      default: obj
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

  newObj.default = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = (0, _getPrototypeOf2.default)(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = (0, _getPrototypeOf2.default)(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return (0, _possibleConstructorReturn2.default)(this, result);
  };
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

var MainContextMenu = /*#__PURE__*/function (_ContextMenu) {
  (0, _inherits2.default)(MainContextMenu, _ContextMenu);

  var _super = _createSuper(MainContextMenu);

  function MainContextMenu(treeDesigner) {
    var _this;

    (0, _classCallCheck2.default)(this, MainContextMenu);
    var mousePosition = null;

    var menu = function menu(d) {
      var menu = [];
      menu.push({
        title: _i18n.i18n.t('contextMenu.main.addDecisionNode'),
        action: function action(elm, d) {
          var newNode = new _sdModel.domain.DecisionNode(mousePosition);
          treeDesigner.addNode(newNode);
        }
      });
      menu.push({
        title: _i18n.i18n.t('contextMenu.main.addChanceNode'),
        action: function action(elm, d) {
          var newNode = new _sdModel.domain.ChanceNode(mousePosition);
          treeDesigner.addNode(newNode);
        }
      });
      menu.push({
        divider: true
      });
      menu.push({
        title: _i18n.i18n.t('contextMenu.main.addText'),
        action: function action(elm, d) {
          var newText = new _sdModel.domain.Text(mousePosition);
          treeDesigner.addText(newText);
        }
      });
      menu.push({
        divider: true
      });
      menu.push({
        title: _i18n.i18n.t('contextMenu.main.paste'),
        action: function action(elm, d) {
          treeDesigner.pasteToNewLocation(mousePosition);
        },
        disabled: !treeDesigner.copiedNodes || !treeDesigner.copiedNodes.length
      });
      menu.push({
        divider: true
      });
      menu.push({
        title: _i18n.i18n.t('contextMenu.main.selectAllNodes'),
        action: function action(elm, d) {
          treeDesigner.selectAllNodes();
        }
      });
      return menu;
    };

    _this = _super.call(this, menu, {
      onOpen: function onOpen(event) {
        treeDesigner.clearSelection();
        mousePosition = new _sdModel.domain.Point(d3.pointer(event, treeDesigner.svg.node())).move(treeDesigner.getMainGroupTranslation(true));
      }
    });
    _this.treeDesigner = treeDesigner;
    return _this;
  }

  return MainContextMenu;
}(_contextMenu.ContextMenu);

exports.MainContextMenu = MainContextMenu;

},{"../d3":23,"../i18n/i18n":27,"./context-menu":17,"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/getPrototypeOf":6,"@babel/runtime/helpers/inherits":7,"@babel/runtime/helpers/interopRequireDefault":8,"@babel/runtime/helpers/possibleConstructorReturn":11,"@babel/runtime/helpers/typeof":14,"sd-model":"sd-model"}],20:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NodeContextMenu = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _contextMenu = require("./context-menu");

var _sdModel = require("sd-model");

var _i18n = require("../i18n/i18n");

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = (0, _getPrototypeOf2.default)(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = (0, _getPrototypeOf2.default)(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return (0, _possibleConstructorReturn2.default)(this, result);
  };
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

var NodeContextMenu = /*#__PURE__*/function (_ContextMenu) {
  (0, _inherits2.default)(NodeContextMenu, _ContextMenu);

  var _super = _createSuper(NodeContextMenu);

  function NodeContextMenu(treeDesigner, operationsForObject) {
    var _this;

    (0, _classCallCheck2.default)(this, NodeContextMenu);

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
          action: function action(elm, d) {
            treeDesigner.addDecisionNode(d);
          }
        });
        menu.push({
          title: _i18n.i18n.t('contextMenu.node.addChanceNode'),
          action: function action(elm, d) {
            treeDesigner.addChanceNode(d);
          }
        });
        menu.push({
          title: _i18n.i18n.t('contextMenu.node.addTerminalNode'),
          action: function action(elm, d) {
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
        action: function action(elm, d) {
          treeDesigner.selectSubTree(d, true);
        }
      });

      if (!d.folded) {
        menu.push({
          title: _i18n.i18n.t('contextMenu.node.fold'),
          action: function action(elm, d) {
            treeDesigner.foldSubtree(d);
          }
        });
      } else {
        menu.push({
          title: _i18n.i18n.t('contextMenu.node.unfold'),
          action: function action(elm, d) {
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
              action: function action(elm, d) {
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

  (0, _createClass2.default)(NodeContextMenu, null, [{
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
        action: function action(elm, d) {
          treeDesigner.convertNode(d, typeToConvertTo);
        }
      };
    }
  }]);
  return NodeContextMenu;
}(_contextMenu.ContextMenu);

exports.NodeContextMenu = NodeContextMenu;

},{"../i18n/i18n":27,"./context-menu":17,"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/getPrototypeOf":6,"@babel/runtime/helpers/inherits":7,"@babel/runtime/helpers/interopRequireDefault":8,"@babel/runtime/helpers/possibleConstructorReturn":11,"sd-model":"sd-model"}],21:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextContextMenu = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _contextMenu = require("./context-menu");

var _i18n = require("../i18n/i18n");

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = (0, _getPrototypeOf2.default)(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = (0, _getPrototypeOf2.default)(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return (0, _possibleConstructorReturn2.default)(this, result);
  };
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

var TextContextMenu = /*#__PURE__*/function (_ContextMenu) {
  (0, _inherits2.default)(TextContextMenu, _ContextMenu);

  var _super = _createSuper(TextContextMenu);

  function TextContextMenu(treeDesigner) {
    var _this;

    (0, _classCallCheck2.default)(this, TextContextMenu);

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

},{"../i18n/i18n":27,"./context-menu":17,"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/getPrototypeOf":6,"@babel/runtime/helpers/inherits":7,"@babel/runtime/helpers/interopRequireDefault":8,"@babel/runtime/helpers/possibleConstructorReturn":11}],22:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.D3Extensions = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

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
      default: obj
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

  newObj.default = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

var D3Extensions = /*#__PURE__*/function () {
  function D3Extensions() {
    (0, _classCallCheck2.default)(this, D3Extensions);
  }

  (0, _createClass2.default)(D3Extensions, null, [{
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

},{"./d3":23,"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/interopRequireDefault":8,"@babel/runtime/helpers/typeof":14}],23:[function(require,module,exports){
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

},{"d3-array":"d3-array","d3-brush":"d3-brush","d3-dispatch":"d3-dispatch","d3-drag":"d3-drag","d3-hierarchy":"d3-hierarchy","d3-scale":"d3-scale","d3-selection":"d3-selection","d3-shape":"d3-shape","d3-time-format":"d3-time-format"}],24:[function(require,module,exports){
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

},{}],25:[function(require,module,exports){
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

},{}],26:[function(require,module,exports){
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

},{}],27:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.i18n = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

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
      default: obj
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

  newObj.default = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

var i18n = /*#__PURE__*/function () {
  function i18n() {
    (0, _classCallCheck2.default)(this, i18n);
  }

  (0, _createClass2.default)(i18n, null, [{
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
      i18n.$instance = _i18next.default.createInstance({
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

},{"./de.json":24,"./en.json":25,"./fr.json":26,"./it.json":28,"./pl.json":29,"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/interopRequireDefault":8,"@babel/runtime/helpers/typeof":14,"i18next":"i18next"}],28:[function(require,module,exports){
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

},{}],29:[function(require,module,exports){
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

},{}],30:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  d3: true
};
Object.defineProperty(exports, "d3", {
  enumerable: true,
  get: function get() {
    return _d.default;
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

_d3Extensions.D3Extensions.extend();

},{"./app-utils":16,"./d3":23,"./d3-extensions":22,"./templates":35,"./tooltip":38,"./tree-designer":39,"@babel/runtime/helpers/interopRequireDefault":8}],31:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Layout = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _sdUtils = require("sd-utils");

var _sdModel = require("sd-model");

var d3 = _interopRequireWildcard(require("./d3"));

var _circle = _interopRequireDefault(require("./symbols/circle"));

var _triangle = _interopRequireDefault(require("./symbols/triangle"));

var _appUtils = require("./app-utils");

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
      default: obj
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

  newObj.default = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}
/*Tree layout manager*/


var Layout = /*#__PURE__*/function () {
  function Layout(treeDesigner, data, config) {
    (0, _classCallCheck2.default)(this, Layout);
    this.nodeTypeToSymbol = {
      'decision': d3.symbolSquare,
      'chance': _circle.default,
      "terminal": _triangle.default
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

  (0, _createClass2.default)(Layout, [{
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

},{"./app-utils":16,"./d3":23,"./symbols/circle":33,"./symbols/triangle":34,"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/interopRequireDefault":8,"@babel/runtime/helpers/typeof":14,"sd-model":"sd-model","sd-utils":"sd-utils"}],32:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NodeDragHandler = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

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
      default: obj
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

  newObj.default = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

var NodeDragHandler = /*#__PURE__*/function () {
  function NodeDragHandler(treeDesigner, data) {
    (0, _classCallCheck2.default)(this, NodeDragHandler);
    this.stateSnapshot = null;
    this.treeDesigner = treeDesigner;
    this.data = data;
    var self = this;
    this.drag = d3.drag().subject(function (event, d) {
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
    }).on("start", function (event, d) {
      self.dragStarted.call(this, event, d, self);
    }).on("drag", function (event, d) {
      self.onDrag.call(this, event, d, self);
    }).on("end", function (event, d) {
      self.dragEnded.call(this, event, d, self);
    });
  }

  (0, _createClass2.default)(NodeDragHandler, [{
    key: "dragStarted",
    value: function dragStarted(event, d, self) {
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
      self.prevDragEvent = event;
      self.dragEventCount = 0;
    }
  }, {
    key: "onDrag",
    value: function onDrag(event, draggedNode, self) {
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

      var dx = event.x - self.prevDragEvent.x;
      var dy = event.y - self.prevDragEvent.y;
      self.treeDesigner.layout.moveNodes(self.selectedNodes, dx, dy, draggedNode);
      self.prevDragEvent = event;
      self.treeDesigner.redrawEdges();
      self.treeDesigner.updatePlottingRegionSize();
    }
  }, {
    key: "dragEnded",
    value: function dragEnded(event, draggedNode, self) {
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

},{"./app-utils":16,"./context-menu/context-menu":17,"./d3":23,"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/interopRequireDefault":8,"@babel/runtime/helpers/typeof":14}],33:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
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
exports.default = _default;

},{}],34:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
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
exports.default = _default;

},{}],35:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Templates = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _sdUtils = require("sd-utils");

var _i18n = require("./i18n/i18n");

var Templates = /*#__PURE__*/function () {
  function Templates() {
    (0, _classCallCheck2.default)(this, Templates);
  }

  (0, _createClass2.default)(Templates, null, [{
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

},{"./i18n/i18n":27,"./templates/growl_message.html":36,"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/interopRequireDefault":8,"sd-utils":"sd-utils"}],36:[function(require,module,exports){
module.exports = "module.exports = \"<div class=\\\"sd-growl-message <%=type%>\\\">\\r\\n    <div class=\\\"sd-growl-message-text\\\">\\r\\n        <%= message %>\\r\\n    </div>\\r\\n</div>\\r\\n\";\n";

},{}],37:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextDragHandler = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

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
      default: obj
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

  newObj.default = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

var TextDragHandler = /*#__PURE__*/function () {
  function TextDragHandler(treeDesigner, data) {
    (0, _classCallCheck2.default)(this, TextDragHandler);
    this.treeDesigner = treeDesigner;
    this.data = data;
    var self = this;
    this.drag = d3.drag().subject(function (event, d) {
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
    }).on("start", function (event, d) {
      self.dragStarted.call(this, event, d, self);
    }).on("drag", function (event, d) {
      self.onDrag.call(this, event, d, self);
    }).on("end", function (event, d) {
      self.dragEnded.call(this, event, d, self);
    });
  }

  (0, _createClass2.default)(TextDragHandler, [{
    key: "dragStarted",
    value: function dragStarted(event, d, self) {
      // self.treeDesigner.layout.disableAutoLayout();
      _contextMenu.ContextMenu.hide();

      var text = d3.select(this);

      if (!text.classed("selected")) {
        self.treeDesigner.clearSelection();
      }

      self.treeDesigner.selectText(d);
      text.classed("selected dragging", true);
      self.selectedNodes = self.treeDesigner.getSelectedNodes();
      self.prevDragEvent = event;
      self.dragEventCount = 0;
    }
  }, {
    key: "onDrag",
    value: function onDrag(event, draggedText, self) {
      if (self.dragEventCount == 2) {
        self.data.saveState();
      }

      self.dragEventCount++;
      var dx = event.x - self.prevDragEvent.x;
      var dy = event.y - self.prevDragEvent.y;
      self.treeDesigner.layout.moveTexts([draggedText], dx, dy);
      self.prevDragEvent = event;
      self.treeDesigner.updatePlottingRegionSize();
    }
  }, {
    key: "dragEnded",
    value: function dragEnded(event, draggedNode, self) {
      d3.select(this).classed("dragging", false);
    }
  }]);
  return TextDragHandler;
}();

exports.TextDragHandler = TextDragHandler;

},{"./app-utils":16,"./context-menu/context-menu":17,"./d3":23,"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/interopRequireDefault":8,"@babel/runtime/helpers/typeof":14}],38:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tooltip = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

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
      default: obj
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

  newObj.default = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

var Tooltip = /*#__PURE__*/function () {
  function Tooltip() {
    (0, _classCallCheck2.default)(this, Tooltip);
  }

  (0, _createClass2.default)(Tooltip, null, [{
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
      target.on('mouseover', function (event, d) {
        var i = target.nodes().indexOf(this);
        var html = null;

        if (_sdUtils.Utils.isFunction(htmlOrFn)) {
          html = htmlOrFn(d, i);
        } else {
          html = htmlOrFn;
        }

        if (html !== null && html !== undefined && html !== '') {
          Tooltip.show(html, xOffset, yOffset, event);
        } else {
          Tooltip.hide(0);
        }
      }).on('mousemove', function (event, d) {
        Tooltip.updatePosition(xOffset, yOffset, event);
      }).on("mouseout", function (event, d) {
        Tooltip.hide();
      });
    }
  }]);
  return Tooltip;
}();

exports.Tooltip = Tooltip;

},{"./d3":23,"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/interopRequireDefault":8,"@babel/runtime/helpers/typeof":14,"sd-utils":"sd-utils"}],39:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TreeDesigner = exports.TreeDesignerConfig = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

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
      default: obj
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

  newObj.default = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

var TreeDesignerConfig = function TreeDesignerConfig(custom) {
  (0, _classCallCheck2.default)(this, TreeDesignerConfig);
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
    (0, _classCallCheck2.default)(this, TreeDesigner);
    this.setConfig(config);
    this.data = dataModel;
    this.initContainer(container);
    this.init();
  }

  (0, _createClass2.default)(TreeDesigner, [{
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

      edgesMerge.on('click', function (event, d) {
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

      function mousemoved(event) {
        var m = d3.pointer(event);
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

      function brushstart(event) {
        if (!event.selection) return;

        if (self.hoveredEdge) {
          self.selectEdge(self.hoveredEdge.datum(), true);
        } else {
          self.clearSelection();
        }

        _contextMenu.ContextMenu.hide();
      } // Highlight the selected nodes.


      function brushmove(event) {
        var s = event.selection;
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


      function brushend(event) {
        if (!event.selection) return;
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
      allSelected.push.apply(allSelected, (0, _toConsumableArray2.default)(selectedVisible));
      selectedVisible.forEach(function (n) {
        if (n.folded) {
          var descendants = _this7.data.getAllDescendantNodes(n);

          if (descendants) {
            allSelected.push.apply(allSelected, (0, _toConsumableArray2.default)(descendants));
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

},{"./app-utils":16,"./context-menu/context-menu":17,"./context-menu/edge-context-menu":18,"./context-menu/main-context-menu":19,"./context-menu/node-context-menu":20,"./context-menu/text-context-menu":21,"./d3":23,"./i18n/i18n":27,"./layout":31,"./node-drag-handler":32,"./templates":35,"./text-drag-handler":37,"./tooltip":38,"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/interopRequireDefault":8,"@babel/runtime/helpers/toConsumableArray":13,"@babel/runtime/helpers/typeof":14,"hammerjs":"hammerjs","sd-model":"sd-model","sd-utils":"sd-utils"}],"sd-tree-designer":[function(require,module,exports){
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

},{"./src/index":30}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hcnJheUxpa2VUb0FycmF5LmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXJyYXlXaXRob3V0SG9sZXMuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVjay5qcyIsIm5vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzLmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZ2V0UHJvdG90eXBlT2YuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbmhlcml0cy5qcyIsIm5vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdC5qcyIsIm5vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2l0ZXJhYmxlVG9BcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL25vbkl0ZXJhYmxlU3ByZWFkLmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvcG9zc2libGVDb25zdHJ1Y3RvclJldHVybi5qcyIsIm5vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3NldFByb3RvdHlwZU9mLmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvdG9Db25zdW1hYmxlQXJyYXkuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy90eXBlb2YuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheS5qcyIsInNyYy9hcHAtdXRpbHMuanMiLCJzcmMvY29udGV4dC1tZW51L2NvbnRleHQtbWVudS5qcyIsInNyYy9jb250ZXh0LW1lbnUvZWRnZS1jb250ZXh0LW1lbnUuanMiLCJzcmMvY29udGV4dC1tZW51L21haW4tY29udGV4dC1tZW51LmpzIiwic3JjL2NvbnRleHQtbWVudS9ub2RlLWNvbnRleHQtbWVudS5qcyIsInNyYy9jb250ZXh0LW1lbnUvdGV4dC1jb250ZXh0LW1lbnUuanMiLCJzcmMvZDMtZXh0ZW5zaW9ucy5qcyIsInNyYy9kMy5qcyIsInNyYy9pMThuL2RlLmpzb24iLCJzcmMvaTE4bi9lbi5qc29uIiwic3JjL2kxOG4vZnIuanNvbiIsInNyYy9pMThuL2kxOG4uanMiLCJzcmMvaTE4bi9pdC5qc29uIiwic3JjL2kxOG4vcGwuanNvbiIsInNyYy9pbmRleC5qcyIsInNyYy9sYXlvdXQuanMiLCJzcmMvbm9kZS1kcmFnLWhhbmRsZXIuanMiLCJzcmMvc3ltYm9scy9jaXJjbGUuanMiLCJzcmMvc3ltYm9scy90cmlhbmdsZS5qcyIsInNyYy90ZW1wbGF0ZXMuanMiLCJzcmMvdGVtcGxhdGVzL2dyb3dsX21lc3NhZ2UuaHRtbCIsInNyYy90ZXh0LWRyYWctaGFuZGxlci5qcyIsInNyYy90b29sdGlwLmpzIiwic3JjL3RyZWUtZGVzaWduZXIuanMiLCJpbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsU0FBUyxpQkFBVCxDQUEyQixHQUEzQixFQUFnQyxHQUFoQyxFQUFxQztBQUNuQyxNQUFJLEdBQUcsSUFBSSxJQUFQLElBQWUsR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUE3QixFQUFxQyxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQVY7O0FBRXJDLE9BQUssSUFBSSxDQUFDLEdBQUcsQ0FBUixFQUFXLElBQUksR0FBRyxJQUFJLEtBQUosQ0FBVSxHQUFWLENBQXZCLEVBQXVDLENBQUMsR0FBRyxHQUEzQyxFQUFnRCxDQUFDLEVBQWpELEVBQXFEO0FBQ25ELElBQUEsSUFBSSxDQUFDLENBQUQsQ0FBSixHQUFVLEdBQUcsQ0FBQyxDQUFELENBQWI7QUFDRDs7QUFFRCxTQUFPLElBQVA7QUFDRDs7QUFFRCxNQUFNLENBQUMsT0FBUCxHQUFpQixpQkFBakI7QUFDQSxNQUFNLENBQUMsT0FBUCxDQUFlLFNBQWYsSUFBNEIsTUFBTSxDQUFDLE9BQW5DLEVBQTRDLE1BQU0sQ0FBQyxPQUFQLENBQWUsVUFBZixHQUE0QixJQUF4RTs7Ozs7QUNYQSxJQUFJLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyx1QkFBRCxDQUE5Qjs7QUFFQSxTQUFTLGtCQUFULENBQTRCLEdBQTVCLEVBQWlDO0FBQy9CLE1BQUksS0FBSyxDQUFDLE9BQU4sQ0FBYyxHQUFkLENBQUosRUFBd0IsT0FBTyxnQkFBZ0IsQ0FBQyxHQUFELENBQXZCO0FBQ3pCOztBQUVELE1BQU0sQ0FBQyxPQUFQLEdBQWlCLGtCQUFqQjtBQUNBLE1BQU0sQ0FBQyxPQUFQLENBQWUsU0FBZixJQUE0QixNQUFNLENBQUMsT0FBbkMsRUFBNEMsTUFBTSxDQUFDLE9BQVAsQ0FBZSxVQUFmLEdBQTRCLElBQXhFOzs7OztBQ1BBLFNBQVMsc0JBQVQsQ0FBZ0MsSUFBaEMsRUFBc0M7QUFDcEMsTUFBSSxJQUFJLEtBQUssS0FBSyxDQUFsQixFQUFxQjtBQUNuQixVQUFNLElBQUksY0FBSixDQUFtQiwyREFBbkIsQ0FBTjtBQUNEOztBQUVELFNBQU8sSUFBUDtBQUNEOztBQUVELE1BQU0sQ0FBQyxPQUFQLEdBQWlCLHNCQUFqQjtBQUNBLE1BQU0sQ0FBQyxPQUFQLENBQWUsU0FBZixJQUE0QixNQUFNLENBQUMsT0FBbkMsRUFBNEMsTUFBTSxDQUFDLE9BQVAsQ0FBZSxVQUFmLEdBQTRCLElBQXhFOzs7OztBQ1RBLFNBQVMsZUFBVCxDQUF5QixRQUF6QixFQUFtQyxXQUFuQyxFQUFnRDtBQUM5QyxNQUFJLEVBQUUsUUFBUSxZQUFZLFdBQXRCLENBQUosRUFBd0M7QUFDdEMsVUFBTSxJQUFJLFNBQUosQ0FBYyxtQ0FBZCxDQUFOO0FBQ0Q7QUFDRjs7QUFFRCxNQUFNLENBQUMsT0FBUCxHQUFpQixlQUFqQjtBQUNBLE1BQU0sQ0FBQyxPQUFQLENBQWUsU0FBZixJQUE0QixNQUFNLENBQUMsT0FBbkMsRUFBNEMsTUFBTSxDQUFDLE9BQVAsQ0FBZSxVQUFmLEdBQTRCLElBQXhFOzs7OztBQ1BBLFNBQVMsaUJBQVQsQ0FBMkIsTUFBM0IsRUFBbUMsS0FBbkMsRUFBMEM7QUFDeEMsT0FBSyxJQUFJLENBQUMsR0FBRyxDQUFiLEVBQWdCLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBMUIsRUFBa0MsQ0FBQyxFQUFuQyxFQUF1QztBQUNyQyxRQUFJLFVBQVUsR0FBRyxLQUFLLENBQUMsQ0FBRCxDQUF0QjtBQUNBLElBQUEsVUFBVSxDQUFDLFVBQVgsR0FBd0IsVUFBVSxDQUFDLFVBQVgsSUFBeUIsS0FBakQ7QUFDQSxJQUFBLFVBQVUsQ0FBQyxZQUFYLEdBQTBCLElBQTFCO0FBQ0EsUUFBSSxXQUFXLFVBQWYsRUFBMkIsVUFBVSxDQUFDLFFBQVgsR0FBc0IsSUFBdEI7QUFDM0IsSUFBQSxNQUFNLENBQUMsY0FBUCxDQUFzQixNQUF0QixFQUE4QixVQUFVLENBQUMsR0FBekMsRUFBOEMsVUFBOUM7QUFDRDtBQUNGOztBQUVELFNBQVMsWUFBVCxDQUFzQixXQUF0QixFQUFtQyxVQUFuQyxFQUErQyxXQUEvQyxFQUE0RDtBQUMxRCxNQUFJLFVBQUosRUFBZ0IsaUJBQWlCLENBQUMsV0FBVyxDQUFDLFNBQWIsRUFBd0IsVUFBeEIsQ0FBakI7QUFDaEIsTUFBSSxXQUFKLEVBQWlCLGlCQUFpQixDQUFDLFdBQUQsRUFBYyxXQUFkLENBQWpCO0FBQ2pCLFNBQU8sV0FBUDtBQUNEOztBQUVELE1BQU0sQ0FBQyxPQUFQLEdBQWlCLFlBQWpCO0FBQ0EsTUFBTSxDQUFDLE9BQVAsQ0FBZSxTQUFmLElBQTRCLE1BQU0sQ0FBQyxPQUFuQyxFQUE0QyxNQUFNLENBQUMsT0FBUCxDQUFlLFVBQWYsR0FBNEIsSUFBeEU7Ozs7O0FDakJBLFNBQVMsZUFBVCxDQUF5QixDQUF6QixFQUE0QjtBQUMxQixFQUFBLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLGVBQWUsR0FBRyxNQUFNLENBQUMsY0FBUCxHQUF3QixNQUFNLENBQUMsY0FBL0IsR0FBZ0QsU0FBUyxlQUFULENBQXlCLENBQXpCLEVBQTRCO0FBQzdHLFdBQU8sQ0FBQyxDQUFDLFNBQUYsSUFBZSxNQUFNLENBQUMsY0FBUCxDQUFzQixDQUF0QixDQUF0QjtBQUNELEdBRkQ7QUFHQSxFQUFBLE1BQU0sQ0FBQyxPQUFQLENBQWUsU0FBZixJQUE0QixNQUFNLENBQUMsT0FBbkMsRUFBNEMsTUFBTSxDQUFDLE9BQVAsQ0FBZSxVQUFmLEdBQTRCLElBQXhFO0FBQ0EsU0FBTyxlQUFlLENBQUMsQ0FBRCxDQUF0QjtBQUNEOztBQUVELE1BQU0sQ0FBQyxPQUFQLEdBQWlCLGVBQWpCO0FBQ0EsTUFBTSxDQUFDLE9BQVAsQ0FBZSxTQUFmLElBQTRCLE1BQU0sQ0FBQyxPQUFuQyxFQUE0QyxNQUFNLENBQUMsT0FBUCxDQUFlLFVBQWYsR0FBNEIsSUFBeEU7Ozs7O0FDVEEsSUFBSSxjQUFjLEdBQUcsT0FBTyxDQUFDLHFCQUFELENBQTVCOztBQUVBLFNBQVMsU0FBVCxDQUFtQixRQUFuQixFQUE2QixVQUE3QixFQUF5QztBQUN2QyxNQUFJLE9BQU8sVUFBUCxLQUFzQixVQUF0QixJQUFvQyxVQUFVLEtBQUssSUFBdkQsRUFBNkQ7QUFDM0QsVUFBTSxJQUFJLFNBQUosQ0FBYyxvREFBZCxDQUFOO0FBQ0Q7O0FBRUQsRUFBQSxRQUFRLENBQUMsU0FBVCxHQUFxQixNQUFNLENBQUMsTUFBUCxDQUFjLFVBQVUsSUFBSSxVQUFVLENBQUMsU0FBdkMsRUFBa0Q7QUFDckUsSUFBQSxXQUFXLEVBQUU7QUFDWCxNQUFBLEtBQUssRUFBRSxRQURJO0FBRVgsTUFBQSxRQUFRLEVBQUUsSUFGQztBQUdYLE1BQUEsWUFBWSxFQUFFO0FBSEg7QUFEd0QsR0FBbEQsQ0FBckI7QUFPQSxNQUFJLFVBQUosRUFBZ0IsY0FBYyxDQUFDLFFBQUQsRUFBVyxVQUFYLENBQWQ7QUFDakI7O0FBRUQsTUFBTSxDQUFDLE9BQVAsR0FBaUIsU0FBakI7QUFDQSxNQUFNLENBQUMsT0FBUCxDQUFlLFNBQWYsSUFBNEIsTUFBTSxDQUFDLE9BQW5DLEVBQTRDLE1BQU0sQ0FBQyxPQUFQLENBQWUsVUFBZixHQUE0QixJQUF4RTs7Ozs7QUNsQkEsU0FBUyxzQkFBVCxDQUFnQyxHQUFoQyxFQUFxQztBQUNuQyxTQUFPLEdBQUcsSUFBSSxHQUFHLENBQUMsVUFBWCxHQUF3QixHQUF4QixHQUE4QjtBQUNuQyxlQUFXO0FBRHdCLEdBQXJDO0FBR0Q7O0FBRUQsTUFBTSxDQUFDLE9BQVAsR0FBaUIsc0JBQWpCO0FBQ0EsTUFBTSxDQUFDLE9BQVAsQ0FBZSxTQUFmLElBQTRCLE1BQU0sQ0FBQyxPQUFuQyxFQUE0QyxNQUFNLENBQUMsT0FBUCxDQUFlLFVBQWYsR0FBNEIsSUFBeEU7Ozs7O0FDUEEsU0FBUyxnQkFBVCxDQUEwQixJQUExQixFQUFnQztBQUM5QixNQUFJLE9BQU8sTUFBUCxLQUFrQixXQUFsQixJQUFpQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVIsQ0FBSixJQUF5QixJQUExRCxJQUFrRSxJQUFJLENBQUMsWUFBRCxDQUFKLElBQXNCLElBQTVGLEVBQWtHLE9BQU8sS0FBSyxDQUFDLElBQU4sQ0FBVyxJQUFYLENBQVA7QUFDbkc7O0FBRUQsTUFBTSxDQUFDLE9BQVAsR0FBaUIsZ0JBQWpCO0FBQ0EsTUFBTSxDQUFDLE9BQVAsQ0FBZSxTQUFmLElBQTRCLE1BQU0sQ0FBQyxPQUFuQyxFQUE0QyxNQUFNLENBQUMsT0FBUCxDQUFlLFVBQWYsR0FBNEIsSUFBeEU7Ozs7O0FDTEEsU0FBUyxrQkFBVCxHQUE4QjtBQUM1QixRQUFNLElBQUksU0FBSixDQUFjLHNJQUFkLENBQU47QUFDRDs7QUFFRCxNQUFNLENBQUMsT0FBUCxHQUFpQixrQkFBakI7QUFDQSxNQUFNLENBQUMsT0FBUCxDQUFlLFNBQWYsSUFBNEIsTUFBTSxDQUFDLE9BQW5DLEVBQTRDLE1BQU0sQ0FBQyxPQUFQLENBQWUsVUFBZixHQUE0QixJQUF4RTs7Ozs7QUNMQSxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsK0JBQUQsQ0FBUCxDQUF5QyxTQUF6QyxDQUFkOztBQUVBLElBQUkscUJBQXFCLEdBQUcsT0FBTyxDQUFDLDRCQUFELENBQW5DOztBQUVBLFNBQVMsMEJBQVQsQ0FBb0MsSUFBcEMsRUFBMEMsSUFBMUMsRUFBZ0Q7QUFDOUMsTUFBSSxJQUFJLEtBQUssT0FBTyxDQUFDLElBQUQsQ0FBUCxLQUFrQixRQUFsQixJQUE4QixPQUFPLElBQVAsS0FBZ0IsVUFBbkQsQ0FBUixFQUF3RTtBQUN0RSxXQUFPLElBQVA7QUFDRCxHQUZELE1BRU8sSUFBSSxJQUFJLEtBQUssS0FBSyxDQUFsQixFQUFxQjtBQUMxQixVQUFNLElBQUksU0FBSixDQUFjLDBEQUFkLENBQU47QUFDRDs7QUFFRCxTQUFPLHFCQUFxQixDQUFDLElBQUQsQ0FBNUI7QUFDRDs7QUFFRCxNQUFNLENBQUMsT0FBUCxHQUFpQiwwQkFBakI7QUFDQSxNQUFNLENBQUMsT0FBUCxDQUFlLFNBQWYsSUFBNEIsTUFBTSxDQUFDLE9BQW5DLEVBQTRDLE1BQU0sQ0FBQyxPQUFQLENBQWUsVUFBZixHQUE0QixJQUF4RTs7Ozs7QUNmQSxTQUFTLGVBQVQsQ0FBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0I7QUFDN0IsRUFBQSxNQUFNLENBQUMsT0FBUCxHQUFpQixlQUFlLEdBQUcsTUFBTSxDQUFDLGNBQVAsSUFBeUIsU0FBUyxlQUFULENBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCO0FBQ3pGLElBQUEsQ0FBQyxDQUFDLFNBQUYsR0FBYyxDQUFkO0FBQ0EsV0FBTyxDQUFQO0FBQ0QsR0FIRDs7QUFLQSxFQUFBLE1BQU0sQ0FBQyxPQUFQLENBQWUsU0FBZixJQUE0QixNQUFNLENBQUMsT0FBbkMsRUFBNEMsTUFBTSxDQUFDLE9BQVAsQ0FBZSxVQUFmLEdBQTRCLElBQXhFO0FBQ0EsU0FBTyxlQUFlLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBdEI7QUFDRDs7QUFFRCxNQUFNLENBQUMsT0FBUCxHQUFpQixlQUFqQjtBQUNBLE1BQU0sQ0FBQyxPQUFQLENBQWUsU0FBZixJQUE0QixNQUFNLENBQUMsT0FBbkMsRUFBNEMsTUFBTSxDQUFDLE9BQVAsQ0FBZSxVQUFmLEdBQTRCLElBQXhFOzs7OztBQ1hBLElBQUksaUJBQWlCLEdBQUcsT0FBTyxDQUFDLHdCQUFELENBQS9COztBQUVBLElBQUksZUFBZSxHQUFHLE9BQU8sQ0FBQyxzQkFBRCxDQUE3Qjs7QUFFQSxJQUFJLDBCQUEwQixHQUFHLE9BQU8sQ0FBQyxpQ0FBRCxDQUF4Qzs7QUFFQSxJQUFJLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyx3QkFBRCxDQUEvQjs7QUFFQSxTQUFTLGtCQUFULENBQTRCLEdBQTVCLEVBQWlDO0FBQy9CLFNBQU8saUJBQWlCLENBQUMsR0FBRCxDQUFqQixJQUEwQixlQUFlLENBQUMsR0FBRCxDQUF6QyxJQUFrRCwwQkFBMEIsQ0FBQyxHQUFELENBQTVFLElBQXFGLGlCQUFpQixFQUE3RztBQUNEOztBQUVELE1BQU0sQ0FBQyxPQUFQLEdBQWlCLGtCQUFqQjtBQUNBLE1BQU0sQ0FBQyxPQUFQLENBQWUsU0FBZixJQUE0QixNQUFNLENBQUMsT0FBbkMsRUFBNEMsTUFBTSxDQUFDLE9BQVAsQ0FBZSxVQUFmLEdBQTRCLElBQXhFOzs7OztBQ2JBLFNBQVMsT0FBVCxDQUFpQixHQUFqQixFQUFzQjtBQUNwQjs7QUFFQSxNQUFJLE9BQU8sTUFBUCxLQUFrQixVQUFsQixJQUFnQyxPQUFPLE1BQU0sQ0FBQyxRQUFkLEtBQTJCLFFBQS9ELEVBQXlFO0FBQ3ZFLElBQUEsTUFBTSxDQUFDLE9BQVAsR0FBaUIsT0FBTyxHQUFHLFNBQVMsT0FBVCxDQUFpQixHQUFqQixFQUFzQjtBQUMvQyxhQUFPLE9BQU8sR0FBZDtBQUNELEtBRkQ7O0FBSUEsSUFBQSxNQUFNLENBQUMsT0FBUCxDQUFlLFNBQWYsSUFBNEIsTUFBTSxDQUFDLE9BQW5DLEVBQTRDLE1BQU0sQ0FBQyxPQUFQLENBQWUsVUFBZixHQUE0QixJQUF4RTtBQUNELEdBTkQsTUFNTztBQUNMLElBQUEsTUFBTSxDQUFDLE9BQVAsR0FBaUIsT0FBTyxHQUFHLFNBQVMsT0FBVCxDQUFpQixHQUFqQixFQUFzQjtBQUMvQyxhQUFPLEdBQUcsSUFBSSxPQUFPLE1BQVAsS0FBa0IsVUFBekIsSUFBdUMsR0FBRyxDQUFDLFdBQUosS0FBb0IsTUFBM0QsSUFBcUUsR0FBRyxLQUFLLE1BQU0sQ0FBQyxTQUFwRixHQUFnRyxRQUFoRyxHQUEyRyxPQUFPLEdBQXpIO0FBQ0QsS0FGRDs7QUFJQSxJQUFBLE1BQU0sQ0FBQyxPQUFQLENBQWUsU0FBZixJQUE0QixNQUFNLENBQUMsT0FBbkMsRUFBNEMsTUFBTSxDQUFDLE9BQVAsQ0FBZSxVQUFmLEdBQTRCLElBQXhFO0FBQ0Q7O0FBRUQsU0FBTyxPQUFPLENBQUMsR0FBRCxDQUFkO0FBQ0Q7O0FBRUQsTUFBTSxDQUFDLE9BQVAsR0FBaUIsT0FBakI7QUFDQSxNQUFNLENBQUMsT0FBUCxDQUFlLFNBQWYsSUFBNEIsTUFBTSxDQUFDLE9BQW5DLEVBQTRDLE1BQU0sQ0FBQyxPQUFQLENBQWUsVUFBZixHQUE0QixJQUF4RTs7Ozs7QUNyQkEsSUFBSSxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsdUJBQUQsQ0FBOUI7O0FBRUEsU0FBUywyQkFBVCxDQUFxQyxDQUFyQyxFQUF3QyxNQUF4QyxFQUFnRDtBQUM5QyxNQUFJLENBQUMsQ0FBTCxFQUFRO0FBQ1IsTUFBSSxPQUFPLENBQVAsS0FBYSxRQUFqQixFQUEyQixPQUFPLGdCQUFnQixDQUFDLENBQUQsRUFBSSxNQUFKLENBQXZCO0FBQzNCLE1BQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxTQUFQLENBQWlCLFFBQWpCLENBQTBCLElBQTFCLENBQStCLENBQS9CLEVBQWtDLEtBQWxDLENBQXdDLENBQXhDLEVBQTJDLENBQUMsQ0FBNUMsQ0FBUjtBQUNBLE1BQUksQ0FBQyxLQUFLLFFBQU4sSUFBa0IsQ0FBQyxDQUFDLFdBQXhCLEVBQXFDLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBRixDQUFjLElBQWxCO0FBQ3JDLE1BQUksQ0FBQyxLQUFLLEtBQU4sSUFBZSxDQUFDLEtBQUssS0FBekIsRUFBZ0MsT0FBTyxLQUFLLENBQUMsSUFBTixDQUFXLENBQVgsQ0FBUDtBQUNoQyxNQUFJLENBQUMsS0FBSyxXQUFOLElBQXFCLDJDQUEyQyxJQUEzQyxDQUFnRCxDQUFoRCxDQUF6QixFQUE2RSxPQUFPLGdCQUFnQixDQUFDLENBQUQsRUFBSSxNQUFKLENBQXZCO0FBQzlFOztBQUVELE1BQU0sQ0FBQyxPQUFQLEdBQWlCLDJCQUFqQjtBQUNBLE1BQU0sQ0FBQyxPQUFQLENBQWUsU0FBZixJQUE0QixNQUFNLENBQUMsT0FBbkMsRUFBNEMsTUFBTSxDQUFDLE9BQVAsQ0FBZSxVQUFmLEdBQTRCLElBQXhFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNaQSxJQUFBLEVBQUEsR0FBQSx1QkFBQSxDQUFBLE9BQUEsQ0FBQSxNQUFBLENBQUEsQ0FBQTs7QUFDQSxJQUFBLFVBQUEsR0FBQSxPQUFBLENBQUEsYUFBQSxDQUFBOztBQUNBLElBQUEsS0FBQSxHQUFBLE9BQUEsQ0FBQSxhQUFBLENBQUE7O0FBQ0EsSUFBQSxRQUFBLEdBQUEsT0FBQSxDQUFBLFVBQUEsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVhLFE7Ozs7Ozs7V0FrQlQ7QUFDQSxhQUFBLHFCQUFBLENBQUEsU0FBQSxFQUFBLFVBQUEsRUFBQSxLQUFBLEVBQTJEO0FBQ3ZELFVBQUksT0FBTyxHQUFHLFNBQVMsQ0FBdkIsSUFBYyxFQUFkO0FBQ0EsTUFBQSxPQUFPLENBQVAsV0FBQSxHQUFBLFVBQUE7QUFFQSxVQUFJLE1BQU0sR0FBVixDQUFBO0FBQ0EsVUFBSSxjQUFjLEdBTHFDLENBS3ZELENBTHVELENBTXZEOztBQUNBLFVBQUksT0FBTyxDQUFQLHFCQUFBLEtBQWtDLEtBQUssR0FBM0MsTUFBQSxFQUFzRDtBQUNsRCxhQUFLLElBQUksQ0FBQyxHQUFHLFVBQVUsQ0FBVixNQUFBLEdBQWIsQ0FBQSxFQUFvQyxDQUFDLEdBQXJDLENBQUEsRUFBMkMsQ0FBQyxJQUE1QyxDQUFBLEVBQW1EO0FBQy9DLGNBQUksT0FBTyxDQUFQLGtCQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsSUFBQSxjQUFBLElBQXFELEtBQUssR0FBOUQsTUFBQSxFQUF5RTtBQUNyRSxZQUFBLE9BQU8sQ0FBUCxXQUFBLEdBQXNCLFVBQVUsQ0FBVixTQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsSUFBdEIsS0FBQTtBQUNBLG1CQUFBLElBQUE7QUFDSDtBQUNKOztBQUNELFFBQUEsT0FBTyxDQUFQLFdBQUEsR0FQa0QsS0FPbEQsQ0FQa0QsQ0FPckI7O0FBQzdCLGVBQUEsSUFBQTtBQUNIOztBQUNELGFBQUEsS0FBQTtBQUNIOzs7V0FFRCxTQUFBLCtCQUFBLENBQUEsU0FBQSxFQUFBLFVBQUEsRUFBQSxLQUFBLEVBQUEsT0FBQSxFQUE4RTtBQUMxRSxVQUFJLGNBQWMsR0FBRyxRQUFRLENBQVIscUJBQUEsQ0FBQSxTQUFBLEVBQUEsVUFBQSxFQUFyQixLQUFxQixDQUFyQjs7QUFDQSxVQUFJLGNBQWMsSUFBbEIsT0FBQSxFQUErQjtBQUMzQixRQUFBLFNBQVMsQ0FBVCxFQUFBLENBQUEsV0FBQSxFQUEwQixVQUFBLEtBQUEsRUFBQSxDQUFBLEVBQW9CO0FBQzFDLFVBQUEsT0FBTyxDQUFQLFVBQUEsR0FBQSxRQUFBLENBQUEsR0FBQSxFQUFBLEtBQUEsQ0FBQSxTQUFBLEVBQUEsRUFBQTtBQUdBLFVBQUEsT0FBTyxDQUFQLElBQUEsQ0FBQSxVQUFBLEVBQUEsS0FBQSxDQUFBLE1BQUEsRUFDb0IsS0FBSyxDQUFMLEtBQUEsR0FBRCxDQUFDLEdBRHBCLElBQUEsRUFBQSxLQUFBLENBQUEsS0FBQSxFQUVtQixLQUFLLENBQUwsS0FBQSxHQUFELEVBQUMsR0FGbkIsSUFBQTtBQUpKLFNBQUE7QUFTQSxRQUFBLFNBQVMsQ0FBVCxFQUFBLENBQUEsVUFBQSxFQUF5QixVQUFBLEtBQUEsRUFBQSxDQUFBLEVBQW9CO0FBQ3pDLFVBQUEsT0FBTyxDQUFQLFVBQUEsR0FBQSxRQUFBLENBQUEsR0FBQSxFQUFBLEtBQUEsQ0FBQSxTQUFBLEVBQUEsQ0FBQTtBQURKLFNBQUE7QUFLSDtBQUVKOzs7V0FFRCxTQUFBLFdBQUEsQ0FBQSxPQUFBLEVBQTRCO0FBQ3hCLGFBQU8sTUFBTSxDQUFOLGdCQUFBLENBQUEsT0FBQSxFQUFBLElBQUEsRUFBQSxnQkFBQSxDQUFQLFdBQU8sQ0FBUDtBQUNIOzs7V0FFRCxTQUFBLGNBQUEsQ0FBQSxTQUFBLEVBQWlDO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLFVBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBUixlQUFBLENBQUEsNEJBQUEsRUFKcUIsR0FJckIsQ0FBUixDQUo2QixDQU03Qjs7QUFDQSxNQUFBLENBQUMsQ0FBRCxjQUFBLENBQUEsSUFBQSxFQUFBLFdBQUEsRUFQNkIsU0FPN0IsRUFQNkIsQ0FTN0I7QUFDQTtBQUNBOztBQUNBLFVBQUksTUFBTSxHQUFHLENBQUMsQ0FBRCxTQUFBLENBQUEsT0FBQSxDQUFBLFdBQUEsR0FaZ0IsTUFZN0IsQ0FaNkIsQ0FjN0I7O0FBQ0EsYUFBTyxDQUFDLE1BQU0sQ0FBUCxDQUFBLEVBQVcsTUFBTSxDQUF4QixDQUFPLENBQVA7QUFDSDs7O1dBR0QsU0FBQSxZQUFBLENBQUEsUUFBQSxFQUFBLEtBQUEsRUFBcUM7QUFDakMsVUFBSSxVQUFVLEdBQUcsUUFBUSxDQUF6QixjQUFpQixFQUFqQjtBQUFBLFVBQ0ksU0FBUyxHQURiLENBQUE7QUFBQSxVQUFBLElBQUE7QUFBQSxVQUFBLFVBQUE7QUFBQSxVQUlJLFlBQVksR0FMaUIsUUFDakMsQ0FEaUMsQ0FPakM7O0FBQ0EsV0FBSyxJQUFBLElBQUEsRUFBVSxVQUFVLEdBQXBCLENBQUEsRUFBTCxZQUFBLEVBQTZDLFVBQVUsSUFBdkQsVUFBQSxFQUF1RSxVQUFVLElBQWpGLFNBQUEsRUFBZ0c7QUFDNUYsWUFBSSxDQUFDLFlBQVksR0FBRyxTQUFTLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBUixnQkFBQSxDQUFqQyxVQUFpQyxDQUFSLENBQXpCLElBQUosWUFBQSxFQUE2RjtBQUN6RixVQUFBLElBQUksR0FBSixJQUFBLEVBQWEsVUFBVSxHQUF2QixVQUFBLEVBQXNDLFlBQVksR0FBbEQsWUFBQTtBQUNIO0FBWDRCLE9BQUEsQ0FjakM7OztBQUNBLE1BQUEsU0FBUyxJQUFULENBQUE7O0FBQ0EsYUFBTyxTQUFTLEdBQWhCLEdBQUEsRUFBd0I7QUFDcEIsWUFBQSxNQUFBLEVBQUEsS0FBQSxFQUFBLFlBQUEsRUFBQSxXQUFBLEVBQUEsY0FBQSxFQUFBLGFBQUE7O0FBTUEsWUFBSSxDQUFDLFlBQVksR0FBRyxVQUFVLEdBQTFCLFNBQUEsS0FBQSxDQUFBLElBQWdELENBQUMsY0FBYyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFSLGdCQUFBLENBQXJDLFlBQXFDLENBQVYsQ0FBM0IsSUFBcEQsWUFBQSxFQUFtSjtBQUMvSSxVQUFBLElBQUksR0FBSixNQUFBLEVBQWUsVUFBVSxHQUF6QixZQUFBLEVBQTBDLFlBQVksR0FBdEQsY0FBQTtBQURKLFNBQUEsTUFFTyxJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsR0FBekIsU0FBQSxLQUFBLFVBQUEsSUFBd0QsQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDLEtBQUssR0FBRyxRQUFRLENBQVIsZ0JBQUEsQ0FBbkMsV0FBbUMsQ0FBVCxDQUExQixJQUE1RCxZQUFBLEVBQXdKO0FBQzNKLFVBQUEsSUFBSSxHQUFKLEtBQUEsRUFBYyxVQUFVLEdBQXhCLFdBQUEsRUFBd0MsWUFBWSxHQUFwRCxhQUFBO0FBREcsU0FBQSxNQUVBO0FBQ0gsVUFBQSxTQUFTLElBQVQsQ0FBQTtBQUNIO0FBQ0o7O0FBRUQsTUFBQSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUwsQ0FBQSxFQUFTLElBQUksQ0FBcEIsQ0FBTyxDQUFQO0FBQ0EsTUFBQSxJQUFJLENBQUosUUFBQSxHQUFnQixJQUFJLENBQUosSUFBQSxDQUFoQixZQUFnQixDQUFoQjtBQUNBLGFBQUEsSUFBQTs7QUFFQSxlQUFBLFNBQUEsQ0FBQSxDQUFBLEVBQXNCO0FBQ2xCLFlBQUksRUFBRSxHQUFHLENBQUMsQ0FBRCxDQUFBLEdBQU0sS0FBSyxDQUFwQixDQUFvQixDQUFwQjtBQUFBLFlBQ0ksRUFBRSxHQUFHLENBQUMsQ0FBRCxDQUFBLEdBQU0sS0FBSyxDQURwQixDQUNvQixDQURwQjtBQUVBLGVBQU8sRUFBRSxHQUFGLEVBQUEsR0FBVSxFQUFFLEdBQW5CLEVBQUE7QUFDSDtBQUNKOzs7V0FFRCxTQUFBLEtBQUEsQ0FBQSxPQUFBLEVBQWlFO0FBQUEsVUFBM0MsSUFBMkMsR0FBQSxTQUFBLENBQUEsTUFBQSxHQUFBLENBQUEsSUFBQSxTQUFBLENBQUEsQ0FBQSxDQUFBLEtBQUEsU0FBQSxHQUFBLFNBQUEsQ0FBQSxDQUFBLENBQUEsR0FBdEMsTUFBc0M7QUFBQSxVQUE5QixRQUE4QixHQUFBLFNBQUEsQ0FBQSxNQUFBLEdBQUEsQ0FBQSxJQUFBLFNBQUEsQ0FBQSxDQUFBLENBQUEsS0FBQSxTQUFBLEdBQUEsU0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFyQixPQUFxQjtBQUFBLFVBQVosSUFBWSxHQUFBLFNBQUEsQ0FBQSxNQUFBLEdBQUEsQ0FBQSxJQUFBLFNBQUEsQ0FBQSxDQUFBLENBQUEsS0FBQSxTQUFBLEdBQUEsU0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFMLElBQUs7O0FBQzdELFVBQUksSUFBSSxHQUFHLFVBQUEsQ0FBQSxTQUFBLENBQUEsR0FBQSxDQUFBLE9BQUEsRUFBdUI7QUFBQyxRQUFBLE9BQU8sRUFBUixPQUFBO0FBQWtCLFFBQUEsSUFBSSxFQUFDO0FBQXZCLE9BQXZCLENBQVg7O0FBRUEsVUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFGLE1BQUEsQ0FBQSxNQUFBLEVBQUEsY0FBQSxDQUFpQyx1QkFBakMsUUFBQSxFQUFBLE1BQUEsQ0FBQSxLQUFBLEVBQUEsSUFBQSxDQUFSLElBQVEsQ0FBUjtBQUNBLE1BQUEsVUFBVSxDQUFDLFlBQVU7QUFDakIsUUFBQSxDQUFDLENBQUQsTUFBQTtBQURNLE9BQUEsRUFBVixJQUFVLENBQVY7QUFHSDs7O1dBR0QsU0FBQSxhQUFBLENBQUEsR0FBQSxFQUFBLE9BQUEsRUFBQSxNQUFBLEVBQTJDO0FBQ3ZDLFVBQUksRUFBRSxHQUFHLFFBQVEsQ0FBUixhQUFBLENBQVQsR0FBUyxDQUFUOztBQUVBLFVBQUEsT0FBQSxFQUFhO0FBQ1QsUUFBQSxRQUFRLENBQVIsVUFBQSxDQUFBLEVBQUEsRUFBQSxPQUFBO0FBQ0g7O0FBQ0QsVUFBQSxNQUFBLEVBQVk7QUFDUixRQUFBLE1BQU0sQ0FBTixXQUFBLENBQUEsRUFBQTtBQUNIOztBQUNELGFBQUEsRUFBQTtBQUNIOzs7V0FFRCxTQUFBLGFBQUEsQ0FBQSxPQUFBLEVBQThCO0FBQzFCLE1BQUEsT0FBTyxDQUFQLFVBQUEsQ0FBQSxXQUFBLENBQUEsT0FBQTtBQUNIOzs7V0FFRCxTQUFBLFdBQUEsQ0FBQSxJQUFBLEVBQXdCO0FBQ3BCLFVBQUcsQ0FBSCxJQUFBLEVBQVM7QUFDTCxlQUFBLElBQUE7QUFDSDs7QUFDRCxVQUFJLFNBQVMsR0FBYixxRkFBQTtBQUVBLGFBQU8sSUFBSSxDQUFKLE9BQUEsQ0FBQSxTQUFBLEVBQVAscUNBQU8sQ0FBUDtBQUNIOzs7V0FFRCxTQUFBLFVBQUEsQ0FBQSxJQUFBLEVBQ0E7QUFDSSxVQUFJLElBQUksR0FBRyxRQUFRLENBQVIsY0FBQSxDQUFYLElBQVcsQ0FBWDtBQUNBLFVBQUksR0FBRyxHQUFHLFFBQVEsQ0FBUixhQUFBLENBQVYsS0FBVSxDQUFWO0FBQ0EsTUFBQSxHQUFHLENBQUgsV0FBQSxDQUFBLElBQUE7QUFDQSxhQUFPLEdBQUcsQ0FBVixTQUFBO0FBQ0g7OztXQUVELFNBQUEsaUJBQUEsQ0FBQSxPQUFBLEVBQUEsSUFBQSxFQUF1QztBQUNuQyxVQUFJLGlCQUFKLFFBQUEsRUFBK0I7QUFDM0IsWUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFSLFdBQUEsQ0FBVixZQUFVLENBQVY7QUFDQSxRQUFBLEdBQUcsQ0FBSCxTQUFBLENBQUEsSUFBQSxFQUFBLEtBQUEsRUFBQSxJQUFBO0FBQ0EsUUFBQSxPQUFPLENBQVAsYUFBQSxDQUFBLEdBQUE7QUFISixPQUFBLE1BTUksT0FBTyxDQUFQLFNBQUEsQ0FBa0IsT0FBbEIsSUFBQTtBQUNQOzs7V0FFRCxTQUFBLGFBQUEsQ0FBQSxJQUFBLEVBQUEsSUFBQSxFQUFnQztBQUM1QixVQUFBLEtBQUE7O0FBQ0EsVUFBRztBQUNDLFFBQUEsS0FBSyxHQUFHLElBQUEsV0FBQSxDQUFBLElBQUEsRUFBc0I7QUFBRSxvQkFBVTtBQUFaLFNBQXRCLENBQVI7QUFESixPQUFBLENBRUMsT0FBQSxDQUFBLEVBQVM7QUFBRTtBQUNSLFFBQUEsS0FBSyxHQUFHLFFBQVEsQ0FBUixXQUFBLENBQVIsYUFBUSxDQUFSO0FBQ0EsUUFBQSxLQUFLLENBQUwsZUFBQSxDQUFBLElBQUEsRUFBQSxLQUFBLEVBQUEsS0FBQSxFQUFBLElBQUE7QUFDSDs7QUFDRCxNQUFBLFFBQVEsQ0FBUixhQUFBLENBQUEsS0FBQTtBQUNIOzs7V0FFRCxTQUFBLG9CQUFBLENBQUEsS0FBQSxFQUFrQztBQUM5QixVQUFHLFFBQUEsQ0FBQSxLQUFBLENBQUEsUUFBQSxDQUFILEtBQUcsQ0FBSCxFQUF5QjtBQUNyQixRQUFBLEtBQUssR0FBRztBQUFDLFVBQUEsSUFBSSxFQUFFO0FBQVAsU0FBUjtBQUNIOztBQUNELFVBQUksR0FBRyxHQUFHLGdCQUFnQixLQUFLLENBQS9CLElBQUE7QUFDQSxhQUFPLEtBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUEsRUFBWSxLQUFLLENBQXhCLElBQU8sQ0FBUDtBQUNIOzs7V0FFRCxTQUFBLElBQUEsQ0FBQSxTQUFBLEVBQXNCO0FBQ2xCLE1BQUEsU0FBUyxDQUFULE9BQUEsQ0FBQSxXQUFBLEVBQUEsSUFBQTtBQUNIOzs7V0FFRCxTQUFBLElBQUEsQ0FBQSxTQUFBLEVBQWlDO0FBQUEsVUFBVixLQUFVLEdBQUEsU0FBQSxDQUFBLE1BQUEsR0FBQSxDQUFBLElBQUEsU0FBQSxDQUFBLENBQUEsQ0FBQSxLQUFBLFNBQUEsR0FBQSxTQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUwsSUFBSzs7QUFDN0IsTUFBQSxTQUFTLENBQVQsT0FBQSxDQUFBLFdBQUEsRUFBK0IsQ0FBL0IsS0FBQTtBQUNIOzs7V0FJRCxTQUFBLFFBQUEsQ0FBQSxFQUFBLEVBQWtDO0FBQUEsVUFBZCxLQUFjLEdBQUEsU0FBQSxDQUFBLE1BQUEsR0FBQSxDQUFBLElBQUEsU0FBQSxDQUFBLENBQUEsQ0FBQSxLQUFBLFNBQUEsR0FBQSxTQUFBLENBQUEsQ0FBQSxDQUFBLEdBQU4sSUFBTTs7QUFDOUIsVUFBRyxDQUFILEVBQUEsRUFBTztBQUNILGVBQUEsSUFBQTtBQUNIOztBQUNELFVBQUEsS0FBQSxFQUFTO0FBQ0wsWUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFOLGdCQUFBLENBQVosRUFBWSxDQUFaO0FBQ0EsZUFBUSxLQUFLLENBQUwsT0FBQSxLQUFSLE1BQUE7QUFDSDs7QUFDRCxhQUFRLEVBQUUsQ0FBRixZQUFBLEtBQVIsSUFBQTtBQUNIOzs7V0FFRCxTQUFBLE9BQUEsQ0FBQSxHQUFBLEVBQUEsUUFBQSxFQUE4QjtBQUMxQixVQUFJLEdBQUcsR0FBRyxJQUFWLGNBQVUsRUFBVjtBQUNBLE1BQUEsR0FBRyxDQUFILElBQUEsQ0FBQSxLQUFBLEVBQUEsR0FBQSxFQUFBLElBQUE7QUFDQSxNQUFBLEdBQUcsQ0FBSCxZQUFBLEdBQUEsTUFBQTs7QUFDQSxNQUFBLEdBQUcsQ0FBSCxNQUFBLEdBQWEsWUFBWTtBQUNyQixZQUFJLE1BQU0sR0FBRyxHQUFHLENBQWhCLE1BQUE7O0FBQ0EsWUFBSSxNQUFNLElBQVYsR0FBQSxFQUFtQjtBQUNmLFVBQUEsUUFBUSxDQUFDLEdBQUcsQ0FBSixRQUFBLEVBQVIsSUFBUSxDQUFSO0FBREosU0FBQSxNQUVPO0FBQ0gsVUFBQSxRQUFRLENBQUEsSUFBQSxFQUFSLE1BQVEsQ0FBUjtBQUNIO0FBTkwsT0FBQTs7QUFRQSxNQUFBLEdBQUcsQ0FBSCxJQUFBO0FBQ0g7Ozs7Ozs7QUF4T1EsUSxDQUVGLGNBRkUsR0FFZSxVQUFBLE1BQUEsRUFBQSxTQUFBLEVBQTZCO0FBQ2pELFNBQVEsTUFBTSxJQUFJLFFBQVEsQ0FBQyxTQUFTLENBQVQsS0FBQSxDQUFELFFBQUMsQ0FBRCxFQUFsQixFQUFrQixDQUFsQixJQUFSLEdBQUE7Q0FISzs7QUFBQSxRLENBTUYsYUFORSxHQU1jLFVBQUEsS0FBQSxFQUFBLFNBQUEsRUFBNEI7QUFDL0MsU0FBUSxLQUFLLElBQUksUUFBUSxDQUFDLFNBQVMsQ0FBVCxLQUFBLENBQUQsT0FBQyxDQUFELEVBQWpCLEVBQWlCLENBQWpCLElBQVIsR0FBQTtDQVBLOztBQUFBLFEsQ0FVRixlQVZFLEdBVWdCLFVBQUEsTUFBQSxFQUFBLFNBQUEsRUFBQSxNQUFBLEVBQXFDO0FBQzFELFNBQU8sSUFBSSxDQUFKLEdBQUEsQ0FBQSxDQUFBLEVBQVksUUFBUSxDQUFSLGNBQUEsQ0FBQSxNQUFBLEVBQUEsU0FBQSxJQUE2QyxNQUFNLENBQW5ELEdBQUEsR0FBMEQsTUFBTSxDQUFuRixNQUFPLENBQVA7Q0FYSzs7QUFBQSxRLENBY0YsY0FkRSxHQWNlLFVBQUEsS0FBQSxFQUFBLFNBQUEsRUFBQSxNQUFBLEVBQW9DO0FBQ3hELFNBQU8sSUFBSSxDQUFKLEdBQUEsQ0FBQSxDQUFBLEVBQVksUUFBUSxDQUFSLGFBQUEsQ0FBQSxLQUFBLEVBQUEsU0FBQSxJQUEyQyxNQUFNLENBQWpELElBQUEsR0FBeUQsTUFBTSxDQUFsRixLQUFPLENBQVA7Q0FmSzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTGIsSUFBQSxFQUFBLEdBQUEsdUJBQUEsQ0FBQSxPQUFBLENBQUEsT0FBQSxDQUFBLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBO0FBQ0E7OztJQUVhLFc7QUFJVCxXQUFBLFdBQUEsQ0FBQSxJQUFBLEVBQUEsSUFBQSxFQUF3QjtBQUFBLEtBQUEsR0FBQSxnQkFBQSxDQUFBLE9BQUEsRUFBQSxJQUFBLEVBQUEsV0FBQTtBQUNwQixRQUFJLElBQUksR0FBUixJQUFBOztBQUVBLFFBQUksT0FBQSxJQUFBLEtBQUosVUFBQSxFQUFnQztBQUM1QixNQUFBLElBQUksQ0FBSixZQUFBLEdBQUEsSUFBQTtBQURKLEtBQUEsTUFFTztBQUNILE1BQUEsSUFBSSxHQUFHLElBQUksSUFBWCxFQUFBO0FBQ0EsTUFBQSxJQUFJLENBQUosWUFBQSxHQUFvQixJQUFJLENBQXhCLE1BQUE7QUFDQSxNQUFBLElBQUksQ0FBSixhQUFBLEdBQXFCLElBQUksQ0FBekIsT0FBQTtBQVJnQixLQUFBLENBV3BCOzs7QUFDQSxJQUFBLEVBQUUsQ0FBRixTQUFBLENBQUEsa0JBQUEsRUFBQSxJQUFBLENBQXNDLENBQXRDLENBQXNDLENBQXRDLEVBQUEsS0FBQSxHQUFBLE1BQUEsQ0FBQSxLQUFBLEVBQUEsSUFBQSxDQUFBLE9BQUEsRUFab0IsaUJBWXBCLEVBWm9CLENBaUJwQjs7QUFDQSxJQUFBLEVBQUUsQ0FBRixNQUFBLENBQUEsTUFBQSxFQUFBLEVBQUEsQ0FBQSx1QkFBQSxFQUE4QyxZQUFZO0FBQ3RELE1BQUEsRUFBRSxDQUFGLE1BQUEsQ0FBQSxrQkFBQSxFQUFBLEtBQUEsQ0FBQSxTQUFBLEVBQUEsTUFBQTs7QUFDQSxVQUFJLElBQUksQ0FBUixhQUFBLEVBQXdCO0FBQ3BCLFFBQUEsSUFBSSxDQUFKLGFBQUE7QUFDSDtBQXRCZSxLQWtCcEIsRUFsQm9CLENBeUJwQjs7QUFDQSxXQUFPLFVBQUEsS0FBQSxFQUFBLElBQUEsRUFBdUI7QUFDMUIsVUFBSSxHQUFHLEdBQVAsSUFBQTtBQUVBLE1BQUEsRUFBRSxDQUFGLFNBQUEsQ0FBQSxrQkFBQSxFQUFBLElBQUEsQ0FBQSxFQUFBO0FBQ0EsVUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFGLFNBQUEsQ0FBQSxrQkFBQSxFQUFBLEVBQUEsQ0FBQSxhQUFBLEVBQ1ksVUFBQSxLQUFBLEVBQUEsQ0FBQSxFQUFvQjtBQUNuQyxRQUFBLEVBQUUsQ0FBRixNQUFBLENBQUEsa0JBQUEsRUFBQSxLQUFBLENBQUEsU0FBQSxFQUFBLE1BQUE7QUFDQSxRQUFBLEtBQUssQ0FBTCxjQUFBO0FBQ0EsUUFBQSxLQUFLLENBQUwsZUFBQTtBQUpHLE9BQUEsRUFBQSxNQUFBLENBQVgsSUFBVyxDQUFYO0FBT0EsTUFBQSxJQUFJLENBQUosU0FBQSxDQUFBLElBQUEsRUFBQSxJQUFBLENBQTBCLE9BQUEsSUFBQSxLQUFBLFVBQUEsR0FBNkIsSUFBSSxDQUFqQyxJQUFpQyxDQUFqQyxHQUExQixJQUFBLEVBQUEsS0FBQSxHQUFBLE1BQUEsQ0FBQSxJQUFBLEVBQUEsSUFBQSxDQUFBLE9BQUEsRUFFbUIsVUFBQSxDQUFBLEVBQWE7QUFDeEIsWUFBSSxHQUFHLEdBQVAsRUFBQTs7QUFDQSxZQUFJLENBQUMsQ0FBTCxPQUFBLEVBQWU7QUFDWCxVQUFBLEdBQUcsSUFBSCxhQUFBO0FBQ0g7O0FBQ0QsWUFBSSxDQUFDLENBQUwsUUFBQSxFQUFnQjtBQUNaLFVBQUEsR0FBRyxJQUFILGNBQUE7QUFDSDs7QUFDRCxZQUFJLENBQUMsQ0FBQyxDQUFOLE1BQUEsRUFBZTtBQUNYLFVBQUEsR0FBRyxJQUFILFlBQUE7QUFDSDs7QUFDRCxlQUFBLEdBQUE7QUFiUixPQUFBLEVBQUEsSUFBQSxDQWVVLFVBQUEsQ0FBQSxFQUFhO0FBQ2YsWUFBSSxDQUFDLENBQUwsT0FBQSxFQUFlO0FBQ1gsaUJBQUEsTUFBQTtBQUNIOztBQUNELFlBQUksQ0FBQyxDQUFDLENBQU4sS0FBQSxFQUFjO0FBQ1YsVUFBQSxPQUFPLENBQVAsS0FBQSxDQUFBLDZEQUFBO0FBQ0g7O0FBQ0QsZUFBUSxPQUFPLENBQUMsQ0FBUixLQUFBLEtBQUQsUUFBQyxHQUErQixDQUFDLENBQWpDLEtBQUMsR0FBeUMsQ0FBQyxDQUFELEtBQUEsQ0FBakQsSUFBaUQsQ0FBakQ7QUF0QlIsT0FBQSxFQUFBLEVBQUEsQ0FBQSxPQUFBLEVBd0JpQixVQUFBLEtBQUEsRUFBQSxDQUFBLEVBQW9CO0FBQzdCLFlBQUksQ0FBQyxDQUFMLFFBQUEsRUFENkIsT0FBQSxDQUNMOztBQUN4QixZQUFJLENBQUMsQ0FBQyxDQUFOLE1BQUEsRUFGNkIsT0FBQSxDQUVOOztBQUN2QixRQUFBLENBQUMsQ0FBRCxNQUFBLENBQUEsR0FBQSxFQUFBLElBQUE7QUFDQSxRQUFBLEVBQUUsQ0FBRixNQUFBLENBQUEsa0JBQUEsRUFBQSxLQUFBLENBQUEsU0FBQSxFQUFBLE1BQUE7O0FBRUEsWUFBSSxJQUFJLENBQVIsYUFBQSxFQUF3QjtBQUNwQixVQUFBLElBQUksQ0FBSixhQUFBO0FBQ0g7QUEzQ2lCLE9BVzFCLEVBWDBCLENBOEMxQjtBQUNBOztBQUNBLFVBQUksSUFBSSxDQUFSLFlBQUEsRUFBdUI7QUFDbkIsWUFBSSxJQUFJLENBQUosWUFBQSxDQUFBLEtBQUEsRUFBQSxJQUFBLE1BQUosS0FBQSxFQUE4QztBQUMxQztBQUNIO0FBbkRxQixPQUFBLENBc0QxQjs7O0FBQ0EsTUFBQSxFQUFFLENBQUYsTUFBQSxDQUFBLGtCQUFBLEVBQUEsS0FBQSxDQUFBLE1BQUEsRUFDb0IsS0FBSyxDQUFMLEtBQUEsR0FBRCxDQUFDLEdBRHBCLElBQUEsRUFBQSxLQUFBLENBQUEsS0FBQSxFQUVtQixLQUFLLENBQUwsS0FBQSxHQUFELENBQUMsR0FGbkIsSUFBQSxFQUFBLEtBQUEsQ0FBQSxTQUFBLEVBQUEsT0FBQTtBQUtBLE1BQUEsS0FBSyxDQUFMLGNBQUE7QUFDQSxNQUFBLEtBQUssQ0FBTCxlQUFBO0FBN0RKLEtBQUE7QUErREg7Ozs7V0FFRCxTQUFBLElBQUEsR0FBYztBQUNWLE1BQUEsRUFBRSxDQUFGLE1BQUEsQ0FBQSxrQkFBQSxFQUFBLEtBQUEsQ0FBQSxTQUFBLEVBQUEsTUFBQTtBQUNIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdEdMLElBQUEsWUFBQSxHQUFBLE9BQUEsQ0FBQSxnQkFBQSxDQUFBOztBQUNBLElBQUEsS0FBQSxHQUFBLE9BQUEsQ0FBQSxjQUFBLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVhLGU7Ozs7O0FBR1QsV0FBQSxlQUFBLENBQUEsWUFBQSxFQUEwQjtBQUFBLFFBQUEsS0FBQTs7QUFBQSxLQUFBLEdBQUEsZ0JBQUEsQ0FBQSxPQUFBLEVBQUEsSUFBQSxFQUFBLGVBQUE7O0FBQ3RCLFFBQUksSUFBSSxHQUFHLFNBQUEsSUFBQSxDQUFBLENBQUEsRUFBYTtBQUVwQixVQUFJLElBQUksR0FBUixFQUFBO0FBRUEsTUFBQSxJQUFJLENBQUosSUFBQSxDQUFVO0FBQ04sUUFBQSxLQUFLLEVBQUUsS0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLENBREQscUNBQ0MsQ0FERDtBQUVOLFFBQUEsTUFBTSxFQUFFLFNBQUEsTUFBQSxDQUFBLEdBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFxQjtBQUN6QixVQUFBLFlBQVksQ0FBWixrQkFBQSxDQUFBLENBQUE7QUFDSDtBQUpLLE9BQVY7QUFNQSxNQUFBLElBQUksQ0FBSixJQUFBLENBQVU7QUFDTixRQUFBLEtBQUssRUFBRSxLQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsQ0FERCxtQ0FDQyxDQUREO0FBRU4sUUFBQSxNQUFNLEVBQUUsU0FBQSxNQUFBLENBQUEsR0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQXFCO0FBQ3pCLFVBQUEsWUFBWSxDQUFaLGdCQUFBLENBQUEsQ0FBQTtBQUNIO0FBSkssT0FBVjtBQVFBLGFBQUEsSUFBQTtBQWxCSixLQUFBOztBQXFCQSxJQUFBLEtBQUEsR0FBQSxNQUFBLENBQUEsSUFBQSxDQUFBLElBQUEsRUFBQSxJQUFBLENBQUE7QUFDQSxJQUFBLEtBQUEsQ0FBQSxZQUFBLEdBQUEsWUFBQTtBQXZCc0IsV0FBQSxLQUFBO0FBd0J6Qjs7O0VBM0JnQyxZQUFBLENBQUEsVzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSHJDLElBQUEsWUFBQSxHQUFBLE9BQUEsQ0FBQSxnQkFBQSxDQUFBOztBQUNBLElBQUEsUUFBQSxHQUFBLE9BQUEsQ0FBQSxVQUFBLENBQUE7O0FBQ0EsSUFBQSxFQUFBLEdBQUEsdUJBQUEsQ0FBQSxPQUFBLENBQUEsT0FBQSxDQUFBLENBQUE7O0FBQ0EsSUFBQSxLQUFBLEdBQUEsT0FBQSxDQUFBLGNBQUEsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFYSxlOzs7OztBQUdULFdBQUEsZUFBQSxDQUFBLFlBQUEsRUFBMEI7QUFBQSxRQUFBLEtBQUE7O0FBQUEsS0FBQSxHQUFBLGdCQUFBLENBQUEsT0FBQSxFQUFBLElBQUEsRUFBQSxlQUFBO0FBQ3RCLFFBQUksYUFBYSxHQUFqQixJQUFBOztBQUNBLFFBQUksSUFBSSxHQUFHLFNBQUEsSUFBQSxDQUFBLENBQUEsRUFBYTtBQUVwQixVQUFJLElBQUksR0FBUixFQUFBO0FBQ0EsTUFBQSxJQUFJLENBQUosSUFBQSxDQUFVO0FBQ04sUUFBQSxLQUFLLEVBQUUsS0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLENBREQsa0NBQ0MsQ0FERDtBQUVOLFFBQUEsTUFBTSxFQUFFLFNBQUEsTUFBQSxDQUFBLEdBQUEsRUFBQSxDQUFBLEVBQWtCO0FBQ3RCLGNBQUksT0FBTyxHQUFHLElBQUksUUFBQSxDQUFBLE1BQUEsQ0FBSixZQUFBLENBQWQsYUFBYyxDQUFkO0FBQ0EsVUFBQSxZQUFZLENBQVosT0FBQSxDQUFBLE9BQUE7QUFDSDtBQUxLLE9BQVY7QUFPQSxNQUFBLElBQUksQ0FBSixJQUFBLENBQVU7QUFDTixRQUFBLEtBQUssRUFBRSxLQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsQ0FERCxnQ0FDQyxDQUREO0FBRU4sUUFBQSxNQUFNLEVBQUUsU0FBQSxNQUFBLENBQUEsR0FBQSxFQUFBLENBQUEsRUFBa0I7QUFDdEIsY0FBSSxPQUFPLEdBQUcsSUFBSSxRQUFBLENBQUEsTUFBQSxDQUFKLFVBQUEsQ0FBZCxhQUFjLENBQWQ7QUFDQSxVQUFBLFlBQVksQ0FBWixPQUFBLENBQUEsT0FBQTtBQUNIO0FBTEssT0FBVjtBQU9BLE1BQUEsSUFBSSxDQUFKLElBQUEsQ0FBVTtBQUFDLFFBQUEsT0FBTyxFQUFFO0FBQVYsT0FBVjtBQUNBLE1BQUEsSUFBSSxDQUFKLElBQUEsQ0FBVTtBQUNOLFFBQUEsS0FBSyxFQUFFLEtBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxDQURELDBCQUNDLENBREQ7QUFFTixRQUFBLE1BQU0sRUFBRSxTQUFBLE1BQUEsQ0FBQSxHQUFBLEVBQUEsQ0FBQSxFQUFrQjtBQUN0QixjQUFJLE9BQU8sR0FBRyxJQUFJLFFBQUEsQ0FBQSxNQUFBLENBQUosSUFBQSxDQUFkLGFBQWMsQ0FBZDtBQUNBLFVBQUEsWUFBWSxDQUFaLE9BQUEsQ0FBQSxPQUFBO0FBQ0g7QUFMSyxPQUFWO0FBUUEsTUFBQSxJQUFJLENBQUosSUFBQSxDQUFVO0FBQUMsUUFBQSxPQUFPLEVBQUU7QUFBVixPQUFWO0FBQ0EsTUFBQSxJQUFJLENBQUosSUFBQSxDQUFVO0FBQ04sUUFBQSxLQUFLLEVBQUUsS0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLENBREQsd0JBQ0MsQ0FERDtBQUVOLFFBQUEsTUFBTSxFQUFFLFNBQUEsTUFBQSxDQUFBLEdBQUEsRUFBQSxDQUFBLEVBQWtCO0FBQ3RCLFVBQUEsWUFBWSxDQUFaLGtCQUFBLENBQUEsYUFBQTtBQUhFLFNBQUE7QUFLTixRQUFBLFFBQVEsRUFBRSxDQUFDLFlBQVksQ0FBYixXQUFBLElBQTZCLENBQUMsWUFBWSxDQUFaLFdBQUEsQ0FBeUI7QUFMM0QsT0FBVjtBQVFBLE1BQUEsSUFBSSxDQUFKLElBQUEsQ0FBVTtBQUFDLFFBQUEsT0FBTyxFQUFFO0FBQVYsT0FBVjtBQUVBLE1BQUEsSUFBSSxDQUFKLElBQUEsQ0FBVTtBQUNOLFFBQUEsS0FBSyxFQUFFLEtBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxDQURELGlDQUNDLENBREQ7QUFFTixRQUFBLE1BQU0sRUFBRSxTQUFBLE1BQUEsQ0FBQSxHQUFBLEVBQUEsQ0FBQSxFQUFrQjtBQUN0QixVQUFBLFlBQVksQ0FBWixjQUFBO0FBQ0g7QUFKSyxPQUFWO0FBTUEsYUFBQSxJQUFBO0FBM0NKLEtBQUE7O0FBOENBLElBQUEsS0FBQSxHQUFBLE1BQUEsQ0FBQSxJQUFBLENBQUEsSUFBQSxFQUFBLElBQUEsRUFBWTtBQUFDLE1BQUEsTUFBTSxFQUFFLFNBQUEsTUFBQSxDQUFBLEtBQUEsRUFBVztBQUM1QixRQUFBLFlBQVksQ0FBWixjQUFBO0FBQ0EsUUFBQSxhQUFhLEdBQUcsSUFBSSxRQUFBLENBQUEsTUFBQSxDQUFKLEtBQUEsQ0FBZ0IsRUFBRSxDQUFGLE9BQUEsQ0FBQSxLQUFBLEVBQWtCLFlBQVksQ0FBWixHQUFBLENBQWxDLElBQWtDLEVBQWxCLENBQWhCLEVBQUEsSUFBQSxDQUFpRSxZQUFZLENBQVosdUJBQUEsQ0FBakYsSUFBaUYsQ0FBakUsQ0FBaEI7QUFFSDtBQUpXLEtBQVosQ0FBQTtBQUtBLElBQUEsS0FBQSxDQUFBLFlBQUEsR0FBQSxZQUFBO0FBckRzQixXQUFBLEtBQUE7QUFzRHpCOzs7RUF6RGdDLFlBQUEsQ0FBQSxXOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMckMsSUFBQSxZQUFBLEdBQUEsT0FBQSxDQUFBLGdCQUFBLENBQUE7O0FBQ0EsSUFBQSxRQUFBLEdBQUEsT0FBQSxDQUFBLFVBQUEsQ0FBQTs7QUFDQSxJQUFBLEtBQUEsR0FBQSxPQUFBLENBQUEsY0FBQSxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFYSxlOzs7OztBQUdULFdBQUEsZUFBQSxDQUFBLFlBQUEsRUFBQSxtQkFBQSxFQUErQztBQUFBLFFBQUEsS0FBQTs7QUFBQSxLQUFBLEdBQUEsZ0JBQUEsQ0FBQSxPQUFBLEVBQUEsSUFBQSxFQUFBLGVBQUE7O0FBQzNDLFFBQUksSUFBSSxHQUFHLFNBQUEsSUFBQSxDQUFBLENBQUEsRUFBYTtBQUVwQixVQUFJLFlBQVksR0FBRztBQUNmLFFBQUEsS0FBSyxFQUFFLEtBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxDQURRLHVCQUNSLENBRFE7QUFFZixRQUFBLE1BQU0sRUFBRSxTQUFBLE1BQUEsQ0FBQSxHQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBcUI7QUFDekIsVUFBQSxZQUFZLENBQVosVUFBQSxDQUFBLENBQUEsRUFBMkIsQ0FBQyxZQUFZLENBQVosY0FBQSxDQUE1QixDQUE0QixDQUE1QjtBQUNBLFVBQUEsWUFBWSxDQUFaLGlCQUFBO0FBQ0g7QUFMYyxPQUFuQjtBQU9BLFVBQUksV0FBVyxHQUFHO0FBQ2QsUUFBQSxLQUFLLEVBQUUsS0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLENBRE8sc0JBQ1AsQ0FETztBQUVkLFFBQUEsTUFBTSxFQUFFLFNBQUEsTUFBQSxDQUFBLEdBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFxQjtBQUN6QixVQUFBLFlBQVksQ0FBWixVQUFBLENBQUEsQ0FBQSxFQUEyQixDQUFDLFlBQVksQ0FBWixjQUFBLENBQTVCLENBQTRCLENBQTVCO0FBQ0EsVUFBQSxZQUFZLENBQVosZ0JBQUE7QUFDSDtBQUxhLE9BQWxCO0FBT0EsVUFBSSxhQUFhLEdBQUc7QUFDaEIsUUFBQSxLQUFLLEVBQUUsS0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLENBRFMsd0JBQ1QsQ0FEUztBQUVoQixRQUFBLE1BQU0sRUFBRSxTQUFBLE1BQUEsQ0FBQSxHQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBcUI7QUFDekIsVUFBQSxZQUFZLENBQVosV0FBQSxDQUFBLENBQUE7QUFIWSxTQUFBO0FBS2hCLFFBQUEsUUFBUSxFQUFFLENBQUMsQ0FBRCxNQUFBLElBQVksQ0FBQyxZQUFZLENBQXpCLFdBQUEsSUFBeUMsQ0FBQyxZQUFZLENBQVosV0FBQSxDQUF5QjtBQUw3RCxPQUFwQjtBQVFBLFVBQUksY0FBYyxHQUFHO0FBQ2pCLFFBQUEsS0FBSyxFQUFFLEtBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxDQURVLHlCQUNWLENBRFU7QUFFakIsUUFBQSxNQUFNLEVBQUUsU0FBQSxNQUFBLENBQUEsR0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQXFCO0FBRXpCLFVBQUEsWUFBWSxDQUFaLFVBQUEsQ0FBQSxDQUFBLEVBQTJCLENBQUMsWUFBWSxDQUFaLGNBQUEsQ0FBNUIsQ0FBNEIsQ0FBNUI7QUFDQSxVQUFBLFlBQVksQ0FBWixtQkFBQTtBQUVIO0FBUGdCLE9BQXJCO0FBVUEsVUFBSSxJQUFJLEdBQVIsRUFBQTs7QUFDQSxVQUFJLENBQUMsQ0FBRCxJQUFBLElBQVUsUUFBQSxDQUFBLE1BQUEsQ0FBQSxZQUFBLENBQWQsS0FBQSxFQUF3QztBQUNwQyxRQUFBLElBQUksR0FBRyxDQUFBLFlBQUEsRUFBQSxXQUFBLEVBQVAsY0FBTyxDQUFQO0FBQ0EsUUFBQSxlQUFlLENBQWYsd0JBQUEsQ0FBQSxDQUFBLEVBQUEsSUFBQSxFQUFBLFlBQUE7QUFDQSxlQUFBLElBQUE7QUFDSDs7QUFFRCxVQUFHLENBQUMsQ0FBQyxDQUFMLE1BQUEsRUFBYTtBQUNULFFBQUEsSUFBSSxDQUFKLElBQUEsQ0FBVTtBQUNOLFVBQUEsS0FBSyxFQUFFLEtBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxDQURELGtDQUNDLENBREQ7QUFFTixVQUFBLE1BQU0sRUFBRSxTQUFBLE1BQUEsQ0FBQSxHQUFBLEVBQUEsQ0FBQSxFQUFrQjtBQUN0QixZQUFBLFlBQVksQ0FBWixlQUFBLENBQUEsQ0FBQTtBQUNIO0FBSkssU0FBVjtBQU1BLFFBQUEsSUFBSSxDQUFKLElBQUEsQ0FBVTtBQUNOLFVBQUEsS0FBSyxFQUFFLEtBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxDQURELGdDQUNDLENBREQ7QUFFTixVQUFBLE1BQU0sRUFBRSxTQUFBLE1BQUEsQ0FBQSxHQUFBLEVBQUEsQ0FBQSxFQUFrQjtBQUN0QixZQUFBLFlBQVksQ0FBWixhQUFBLENBQUEsQ0FBQTtBQUNIO0FBSkssU0FBVjtBQU1BLFFBQUEsSUFBSSxDQUFKLElBQUEsQ0FBVTtBQUNOLFVBQUEsS0FBSyxFQUFFLEtBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxDQURELGtDQUNDLENBREQ7QUFFTixVQUFBLE1BQU0sRUFBRSxTQUFBLE1BQUEsQ0FBQSxHQUFBLEVBQUEsQ0FBQSxFQUFrQjtBQUN0QixZQUFBLFlBQVksQ0FBWixlQUFBLENBQUEsQ0FBQTtBQUNIO0FBSkssU0FBVjtBQU1BLFFBQUEsSUFBSSxDQUFKLElBQUEsQ0FBVTtBQUFDLFVBQUEsT0FBTyxFQUFFO0FBQVYsU0FBVjtBQUNIOztBQUVELE1BQUEsSUFBSSxDQUFKLElBQUEsQ0FBQSxZQUFBO0FBQ0EsTUFBQSxJQUFJLENBQUosSUFBQSxDQUFBLFdBQUE7QUFDQSxNQUFBLElBQUksQ0FBSixJQUFBLENBQUEsYUFBQTtBQUNBLE1BQUEsSUFBSSxDQUFKLElBQUEsQ0FBQSxjQUFBO0FBRUEsTUFBQSxlQUFlLENBQWYsd0JBQUEsQ0FBQSxDQUFBLEVBQUEsSUFBQSxFQUFBLFlBQUE7QUFDQSxNQUFBLElBQUksQ0FBSixJQUFBLENBQVU7QUFBQyxRQUFBLE9BQU8sRUFBRTtBQUFWLE9BQVY7QUFDQSxNQUFBLElBQUksQ0FBSixJQUFBLENBQVU7QUFDTixRQUFBLEtBQUssRUFBRSxLQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsQ0FERCxnQ0FDQyxDQUREO0FBRU4sUUFBQSxNQUFNLEVBQUUsU0FBQSxNQUFBLENBQUEsR0FBQSxFQUFBLENBQUEsRUFBa0I7QUFDdEIsVUFBQSxZQUFZLENBQVosYUFBQSxDQUFBLENBQUEsRUFBQSxJQUFBO0FBQ0g7QUFKSyxPQUFWOztBQU9BLFVBQUcsQ0FBQyxDQUFDLENBQUwsTUFBQSxFQUFhO0FBQ1QsUUFBQSxJQUFJLENBQUosSUFBQSxDQUFVO0FBQ04sVUFBQSxLQUFLLEVBQUUsS0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLENBREQsdUJBQ0MsQ0FERDtBQUVOLFVBQUEsTUFBTSxFQUFFLFNBQUEsTUFBQSxDQUFBLEdBQUEsRUFBQSxDQUFBLEVBQWtCO0FBQ3RCLFlBQUEsWUFBWSxDQUFaLFdBQUEsQ0FBQSxDQUFBO0FBQ0g7QUFKSyxTQUFWO0FBREosT0FBQSxNQU9LO0FBQ0QsUUFBQSxJQUFJLENBQUosSUFBQSxDQUFVO0FBQ04sVUFBQSxLQUFLLEVBQUUsS0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLENBREQseUJBQ0MsQ0FERDtBQUVOLFVBQUEsTUFBTSxFQUFFLFNBQUEsTUFBQSxDQUFBLEdBQUEsRUFBQSxDQUFBLEVBQWtCO0FBQ3RCLFlBQUEsWUFBWSxDQUFaLFdBQUEsQ0FBQSxDQUFBLEVBQUEsS0FBQTtBQUNIO0FBSkssU0FBVjtBQU1IOztBQUVELFVBQUEsbUJBQUEsRUFBdUI7QUFDbkIsWUFBSSxVQUFVLEdBQUcsbUJBQW1CLENBQXBDLENBQW9DLENBQXBDOztBQUNBLFlBQUcsVUFBVSxDQUFiLE1BQUEsRUFBc0I7QUFDbEIsVUFBQSxJQUFJLENBQUosSUFBQSxDQUFVO0FBQUMsWUFBQSxPQUFPLEVBQUU7QUFBVixXQUFWO0FBQ0EsVUFBQSxVQUFVLENBQVYsT0FBQSxDQUFtQixVQUFBLEVBQUEsRUFBSTtBQUNuQixZQUFBLElBQUksQ0FBSixJQUFBLENBQVU7QUFDTixjQUFBLEtBQUssRUFBRSxLQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsQ0FBTyxzQkFBb0IsRUFBRSxDQUQ5QixJQUNDLENBREQ7QUFFTixjQUFBLE1BQU0sRUFBRSxTQUFBLE1BQUEsQ0FBQSxHQUFBLEVBQUEsQ0FBQSxFQUFrQjtBQUN0QixnQkFBQSxZQUFZLENBQVosZ0JBQUEsQ0FBQSxDQUFBLEVBQUEsRUFBQTtBQUhFLGVBQUE7QUFLTixjQUFBLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBRixVQUFBLENBQUEsQ0FBQTtBQUxMLGFBQVY7QUFESixXQUFBO0FBU0g7QUFDSjs7QUFFRCxhQUFBLElBQUE7QUE3R0osS0FBQTs7QUFnSEEsSUFBQSxLQUFBLEdBQUEsTUFBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLEVBQUEsSUFBQSxDQUFBO0FBQ0EsSUFBQSxLQUFBLENBQUEsWUFBQSxHQUFBLFlBQUE7QUFsSDJDLFdBQUEsS0FBQTtBQW1IOUM7Ozs7V0FFRCxTQUFBLHdCQUFBLENBQUEsQ0FBQSxFQUFBLElBQUEsRUFBQSxZQUFBLEVBQXNEO0FBQ2xELFVBQUksaUJBQWlCLEdBQUcsZUFBZSxDQUFmLHdCQUFBLENBQUEsQ0FBQSxFQUF4QixZQUF3QixDQUF4Qjs7QUFDQSxVQUFHLGlCQUFpQixDQUFwQixNQUFBLEVBQTRCO0FBQ3hCLFFBQUEsSUFBSSxDQUFKLElBQUEsQ0FBVTtBQUFDLFVBQUEsT0FBTyxFQUFFO0FBQVYsU0FBVjtBQUNBLFFBQUEsaUJBQWlCLENBQWpCLE9BQUEsQ0FBMEIsVUFBQSxDQUFBLEVBQUM7QUFBQSxpQkFBRSxJQUFJLENBQUosSUFBQSxDQUFGLENBQUUsQ0FBRjtBQUEzQixTQUFBO0FBRUg7QUFDSjs7O1dBRUQsU0FBQSx3QkFBQSxDQUFBLENBQUEsRUFBQSxZQUFBLEVBQWdEO0FBQzVDLFVBQUksT0FBTyxHQUFYLEVBQUE7O0FBRUEsVUFBRyxDQUFDLENBQUosTUFBQSxFQUFZO0FBQ1IsZUFBQSxFQUFBO0FBQ0g7O0FBRUQsVUFBSSxlQUFlLEdBQUcsQ0FBQyxRQUFBLENBQUEsTUFBQSxDQUFBLFlBQUEsQ0FBRCxLQUFBLEVBQTJCLFFBQUEsQ0FBQSxNQUFBLENBQUEsVUFBQSxDQUEzQixLQUFBLEVBQW1ELFFBQUEsQ0FBQSxNQUFBLENBQUEsWUFBQSxDQUF6RSxLQUFzQixDQUF0Qjs7QUFFQSxVQUFHLENBQUMsQ0FBQyxDQUFELFVBQUEsQ0FBRCxNQUFBLElBQXdCLENBQUMsQ0FBNUIsT0FBQSxFQUFxQztBQUNqQyxRQUFBLGVBQWUsQ0FBZixNQUFBLENBQXVCLFVBQUEsQ0FBQSxFQUFDO0FBQUEsaUJBQUUsQ0FBQyxLQUFHLENBQUMsQ0FBUCxJQUFBO0FBQXhCLFNBQUEsRUFBQSxPQUFBLENBQThDLFVBQUEsSUFBQSxFQUFNO0FBQ2hELFVBQUEsT0FBTyxDQUFQLElBQUEsQ0FBYSxlQUFlLENBQWYsdUJBQUEsQ0FBQSxJQUFBLEVBQWIsWUFBYSxDQUFiO0FBREosU0FBQTtBQURKLE9BQUEsTUFJSztBQUNELFlBQUcsQ0FBQyxZQUFZLFFBQUEsQ0FBQSxNQUFBLENBQWhCLFlBQUEsRUFBbUM7QUFDL0IsVUFBQSxPQUFPLENBQVAsSUFBQSxDQUFhLGVBQWUsQ0FBZix1QkFBQSxDQUF3QyxRQUFBLENBQUEsTUFBQSxDQUFBLFVBQUEsQ0FBeEMsS0FBQSxFQUFiLFlBQWEsQ0FBYjtBQURKLFNBQUEsTUFFSztBQUNELFVBQUEsT0FBTyxDQUFQLElBQUEsQ0FBYSxlQUFlLENBQWYsdUJBQUEsQ0FBd0MsUUFBQSxDQUFBLE1BQUEsQ0FBQSxZQUFBLENBQXhDLEtBQUEsRUFBYixZQUFhLENBQWI7QUFDSDtBQUNKOztBQUNELGFBQUEsT0FBQTtBQUNIOzs7V0FFRCxTQUFBLHVCQUFBLENBQUEsZUFBQSxFQUFBLFlBQUEsRUFBNkQ7QUFDekQsYUFBTztBQUNILFFBQUEsS0FBSyxFQUFFLEtBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxDQUFPLDhCQURYLGVBQ0ksQ0FESjtBQUVILFFBQUEsTUFBTSxFQUFFLFNBQUEsTUFBQSxDQUFBLEdBQUEsRUFBQSxDQUFBLEVBQWtCO0FBQ3RCLFVBQUEsWUFBWSxDQUFaLFdBQUEsQ0FBQSxDQUFBLEVBQUEsZUFBQTtBQUNIO0FBSkUsT0FBUDtBQU1IOzs7RUEvSmdDLFlBQUEsQ0FBQSxXOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSnJDLElBQUEsWUFBQSxHQUFBLE9BQUEsQ0FBQSxnQkFBQSxDQUFBOztBQUNBLElBQUEsS0FBQSxHQUFBLE9BQUEsQ0FBQSxjQUFBLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVhLGU7Ozs7O0FBR1QsV0FBQSxlQUFBLENBQUEsWUFBQSxFQUEwQjtBQUFBLFFBQUEsS0FBQTs7QUFBQSxLQUFBLEdBQUEsZ0JBQUEsQ0FBQSxPQUFBLEVBQUEsSUFBQSxFQUFBLGVBQUE7O0FBQ3RCLFFBQUksSUFBSSxHQUFHLFNBQUEsSUFBQSxDQUFBLENBQUEsRUFBYTtBQUdwQixVQUFJLGNBQWMsR0FBRztBQUNqQixRQUFBLEtBQUssRUFBRSxLQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsQ0FEVSx5QkFDVixDQURVO0FBRWpCLFFBQUEsTUFBTSxFQUFFLFNBQUEsTUFBQSxDQUFBLEdBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFxQjtBQUV6QixVQUFBLFlBQVksQ0FBWixVQUFBLENBQUEsQ0FBQSxFQUFBLElBQUEsRUFBQSxJQUFBO0FBQ0EsVUFBQSxZQUFZLENBQVosbUJBQUE7QUFFSDtBQVBnQixPQUFyQjtBQVNBLFVBQUksSUFBSSxHQUFSLEVBQUE7QUFDQSxNQUFBLElBQUksQ0FBSixJQUFBLENBQUEsY0FBQTtBQUNBLGFBQUEsSUFBQTtBQWRKLEtBQUE7O0FBaUJBLElBQUEsS0FBQSxHQUFBLE1BQUEsQ0FBQSxJQUFBLENBQUEsSUFBQSxFQUFBLElBQUEsQ0FBQTtBQUNBLElBQUEsS0FBQSxDQUFBLFlBQUEsR0FBQSxZQUFBO0FBbkJzQixXQUFBLEtBQUE7QUFvQnpCOzs7RUF2QmdDLFlBQUEsQ0FBQSxXOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0hyQyxJQUFBLEVBQUEsR0FBQSx1QkFBQSxDQUFBLE9BQUEsQ0FBQSxNQUFBLENBQUEsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVhLFk7Ozs7Ozs7V0FFVCxTQUFBLE1BQUEsR0FBZ0I7QUFFWixNQUFBLEVBQUUsQ0FBRixTQUFBLENBQUEsU0FBQSxDQUFBLEtBQUEsQ0FBQSxTQUFBLENBQUEsY0FBQSxHQUNJLEVBQUUsQ0FBRixTQUFBLENBQUEsU0FBQSxDQUFBLGNBQUEsR0FBd0MsVUFBQSxRQUFBLEVBQUEsTUFBQSxFQUE0QjtBQUNoRSxlQUFPLFlBQVksQ0FBWixjQUFBLENBQUEsSUFBQSxFQUFBLFFBQUEsRUFBUCxNQUFPLENBQVA7QUFGUixPQUFBOztBQU1BLE1BQUEsRUFBRSxDQUFGLFNBQUEsQ0FBQSxTQUFBLENBQUEsS0FBQSxDQUFBLFNBQUEsQ0FBQSxjQUFBLEdBQ0ksRUFBRSxDQUFGLFNBQUEsQ0FBQSxTQUFBLENBQUEsY0FBQSxHQUF3QyxVQUFBLFFBQUEsRUFBb0I7QUFDeEQsZUFBTyxZQUFZLENBQVosY0FBQSxDQUFBLElBQUEsRUFBUCxRQUFPLENBQVA7QUFGUixPQUFBOztBQUtBLE1BQUEsRUFBRSxDQUFGLFNBQUEsQ0FBQSxTQUFBLENBQUEsS0FBQSxDQUFBLFNBQUEsQ0FBQSxjQUFBLEdBQ0ksRUFBRSxDQUFGLFNBQUEsQ0FBQSxTQUFBLENBQUEsY0FBQSxHQUF3QyxVQUFBLFFBQUEsRUFBb0I7QUFDeEQsZUFBTyxZQUFZLENBQVosY0FBQSxDQUFBLElBQUEsRUFBUCxRQUFPLENBQVA7QUFGUixPQUFBOztBQUtBLE1BQUEsRUFBRSxDQUFGLFNBQUEsQ0FBQSxTQUFBLENBQUEsS0FBQSxDQUFBLFNBQUEsQ0FBQSxjQUFBLEdBQ0ksRUFBRSxDQUFGLFNBQUEsQ0FBQSxTQUFBLENBQUEsY0FBQSxHQUF3QyxVQUFBLFFBQUEsRUFBQSxNQUFBLEVBQTRCO0FBQ2hFLGVBQU8sWUFBWSxDQUFaLGNBQUEsQ0FBQSxJQUFBLEVBQUEsUUFBQSxFQUFQLE1BQU8sQ0FBUDtBQUZSLE9BQUE7QUFNSDs7O1dBRUQsU0FBQSxzQkFBQSxDQUFBLE1BQUEsRUFBQSxRQUFBLEVBQUEsU0FBQSxFQUFBLE1BQUEsRUFBbUU7QUFFL0QsVUFBSSxhQUFhLEdBQUcsUUFBUSxDQUFSLEtBQUEsQ0FBcEIsVUFBb0IsQ0FBcEI7QUFDQSxVQUFJLE9BQU8sR0FBRyxNQUFNLENBQU4sU0FBTSxDQUFOLENBQWtCLGFBQWEsQ0FBL0IsS0FBa0IsRUFBbEIsRUFIaUQsTUFHakQsQ0FBZCxDQUgrRCxDQUdBOztBQUUvRCxhQUFPLGFBQWEsQ0FBYixNQUFBLEdBQVAsQ0FBQSxFQUFpQztBQUM3QixZQUFJLGdCQUFnQixHQUFHLGFBQWEsQ0FBcEMsS0FBdUIsRUFBdkI7QUFDQSxZQUFJLFlBQVksR0FBRyxhQUFhLENBQWhDLEtBQW1CLEVBQW5COztBQUNBLFlBQUksZ0JBQWdCLEtBQXBCLEdBQUEsRUFBOEI7QUFDMUIsVUFBQSxPQUFPLEdBQUcsT0FBTyxDQUFQLE9BQUEsQ0FBQSxZQUFBLEVBQVYsSUFBVSxDQUFWO0FBREosU0FBQSxNQUVPLElBQUksZ0JBQWdCLEtBQXBCLEdBQUEsRUFBOEI7QUFDakMsVUFBQSxPQUFPLEdBQUcsT0FBTyxDQUFQLElBQUEsQ0FBQSxJQUFBLEVBQVYsWUFBVSxDQUFWO0FBQ0g7QUFDSjs7QUFDRCxhQUFBLE9BQUE7QUFDSDs7O1dBRUQsU0FBQSxjQUFBLENBQUEsTUFBQSxFQUFBLFFBQUEsRUFBQSxNQUFBLEVBQWdEO0FBQzVDLGFBQU8sWUFBWSxDQUFaLHNCQUFBLENBQUEsTUFBQSxFQUFBLFFBQUEsRUFBQSxRQUFBLEVBQVAsTUFBTyxDQUFQO0FBQ0g7OztXQUVELFNBQUEsY0FBQSxDQUFBLE1BQUEsRUFBQSxRQUFBLEVBQXdDO0FBQ3BDLGFBQU8sWUFBWSxDQUFaLHNCQUFBLENBQUEsTUFBQSxFQUFBLFFBQUEsRUFBUCxRQUFPLENBQVA7QUFDSDs7O1dBRUQsU0FBQSxjQUFBLENBQUEsTUFBQSxFQUFBLFFBQUEsRUFBQSxPQUFBLEVBQWlEO0FBQzdDLFVBQUksU0FBUyxHQUFHLE1BQU0sQ0FBTixNQUFBLENBQWhCLFFBQWdCLENBQWhCOztBQUNBLFVBQUksU0FBUyxDQUFiLEtBQUksRUFBSixFQUF1QjtBQUNuQixZQUFBLE9BQUEsRUFBYTtBQUNULGlCQUFPLE1BQU0sQ0FBTixNQUFBLENBQVAsT0FBTyxDQUFQO0FBQ0g7O0FBQ0QsZUFBTyxZQUFZLENBQVosY0FBQSxDQUFBLE1BQUEsRUFBUCxRQUFPLENBQVA7QUFFSDs7QUFDRCxhQUFBLFNBQUE7QUFDSDs7O1dBRUQsU0FBQSxjQUFBLENBQUEsTUFBQSxFQUFBLFFBQUEsRUFBQSxNQUFBLEVBQWdEO0FBQzVDLFVBQUksU0FBUyxHQUFHLE1BQU0sQ0FBTixNQUFBLENBQWhCLFFBQWdCLENBQWhCOztBQUNBLFVBQUksU0FBUyxDQUFiLEtBQUksRUFBSixFQUF1QjtBQUNuQixlQUFPLFlBQVksQ0FBWixjQUFBLENBQUEsTUFBQSxFQUFBLFFBQUEsRUFBUCxNQUFPLENBQVA7QUFDSDs7QUFDRCxhQUFBLFNBQUE7QUFDSDs7Ozs7Ozs7Ozs7Ozs7QUN6RUwsSUFBQSxXQUFBLEdBQUEsT0FBQSxDQUFBLGFBQUEsQ0FBQTs7QUFBQSxNQUFBLENBQUEsSUFBQSxDQUFBLFdBQUEsRUFBQSxPQUFBLENBQUEsVUFBQSxHQUFBLEVBQUE7QUFBQSxNQUFBLEdBQUEsS0FBQSxTQUFBLElBQUEsR0FBQSxLQUFBLFlBQUEsRUFBQTtBQUFBLE1BQUEsR0FBQSxJQUFBLE9BQUEsSUFBQSxPQUFBLENBQUEsR0FBQSxDQUFBLEtBQUEsV0FBQSxDQUFBLEdBQUEsQ0FBQSxFQUFBO0FBQUEsRUFBQSxNQUFBLENBQUEsY0FBQSxDQUFBLE9BQUEsRUFBQSxHQUFBLEVBQUE7QUFBQSxJQUFBLFVBQUEsRUFBQSxJQUFBO0FBQUEsSUFBQSxHQUFBLEVBQUEsU0FBQSxHQUFBLEdBQUE7QUFBQSxhQUFBLFdBQUEsQ0FBQSxHQUFBLENBQUE7QUFBQTtBQUFBLEdBQUE7QUFBQSxDQUFBOztBQUNBLElBQUEsUUFBQSxHQUFBLE9BQUEsQ0FBQSxVQUFBLENBQUE7O0FBQUEsTUFBQSxDQUFBLElBQUEsQ0FBQSxRQUFBLEVBQUEsT0FBQSxDQUFBLFVBQUEsR0FBQSxFQUFBO0FBQUEsTUFBQSxHQUFBLEtBQUEsU0FBQSxJQUFBLEdBQUEsS0FBQSxZQUFBLEVBQUE7QUFBQSxNQUFBLEdBQUEsSUFBQSxPQUFBLElBQUEsT0FBQSxDQUFBLEdBQUEsQ0FBQSxLQUFBLFFBQUEsQ0FBQSxHQUFBLENBQUEsRUFBQTtBQUFBLEVBQUEsTUFBQSxDQUFBLGNBQUEsQ0FBQSxPQUFBLEVBQUEsR0FBQSxFQUFBO0FBQUEsSUFBQSxVQUFBLEVBQUEsSUFBQTtBQUFBLElBQUEsR0FBQSxFQUFBLFNBQUEsR0FBQSxHQUFBO0FBQUEsYUFBQSxRQUFBLENBQUEsR0FBQSxDQUFBO0FBQUE7QUFBQSxHQUFBO0FBQUEsQ0FBQTs7QUFDQSxJQUFBLFlBQUEsR0FBQSxPQUFBLENBQUEsY0FBQSxDQUFBOztBQUFBLE1BQUEsQ0FBQSxJQUFBLENBQUEsWUFBQSxFQUFBLE9BQUEsQ0FBQSxVQUFBLEdBQUEsRUFBQTtBQUFBLE1BQUEsR0FBQSxLQUFBLFNBQUEsSUFBQSxHQUFBLEtBQUEsWUFBQSxFQUFBO0FBQUEsTUFBQSxHQUFBLElBQUEsT0FBQSxJQUFBLE9BQUEsQ0FBQSxHQUFBLENBQUEsS0FBQSxZQUFBLENBQUEsR0FBQSxDQUFBLEVBQUE7QUFBQSxFQUFBLE1BQUEsQ0FBQSxjQUFBLENBQUEsT0FBQSxFQUFBLEdBQUEsRUFBQTtBQUFBLElBQUEsVUFBQSxFQUFBLElBQUE7QUFBQSxJQUFBLEdBQUEsRUFBQSxTQUFBLEdBQUEsR0FBQTtBQUFBLGFBQUEsWUFBQSxDQUFBLEdBQUEsQ0FBQTtBQUFBO0FBQUEsR0FBQTtBQUFBLENBQUE7O0FBQ0EsSUFBQSxRQUFBLEdBQUEsT0FBQSxDQUFBLFVBQUEsQ0FBQTs7QUFBQSxNQUFBLENBQUEsSUFBQSxDQUFBLFFBQUEsRUFBQSxPQUFBLENBQUEsVUFBQSxHQUFBLEVBQUE7QUFBQSxNQUFBLEdBQUEsS0FBQSxTQUFBLElBQUEsR0FBQSxLQUFBLFlBQUEsRUFBQTtBQUFBLE1BQUEsR0FBQSxJQUFBLE9BQUEsSUFBQSxPQUFBLENBQUEsR0FBQSxDQUFBLEtBQUEsUUFBQSxDQUFBLEdBQUEsQ0FBQSxFQUFBO0FBQUEsRUFBQSxNQUFBLENBQUEsY0FBQSxDQUFBLE9BQUEsRUFBQSxHQUFBLEVBQUE7QUFBQSxJQUFBLFVBQUEsRUFBQSxJQUFBO0FBQUEsSUFBQSxHQUFBLEVBQUEsU0FBQSxHQUFBLEdBQUE7QUFBQSxhQUFBLFFBQUEsQ0FBQSxHQUFBLENBQUE7QUFBQTtBQUFBLEdBQUE7QUFBQSxDQUFBOztBQUNBLElBQUEsT0FBQSxHQUFBLE9BQUEsQ0FBQSxTQUFBLENBQUE7O0FBQUEsTUFBQSxDQUFBLElBQUEsQ0FBQSxPQUFBLEVBQUEsT0FBQSxDQUFBLFVBQUEsR0FBQSxFQUFBO0FBQUEsTUFBQSxHQUFBLEtBQUEsU0FBQSxJQUFBLEdBQUEsS0FBQSxZQUFBLEVBQUE7QUFBQSxNQUFBLEdBQUEsSUFBQSxPQUFBLElBQUEsT0FBQSxDQUFBLEdBQUEsQ0FBQSxLQUFBLE9BQUEsQ0FBQSxHQUFBLENBQUEsRUFBQTtBQUFBLEVBQUEsTUFBQSxDQUFBLGNBQUEsQ0FBQSxPQUFBLEVBQUEsR0FBQSxFQUFBO0FBQUEsSUFBQSxVQUFBLEVBQUEsSUFBQTtBQUFBLElBQUEsR0FBQSxFQUFBLFNBQUEsR0FBQSxHQUFBO0FBQUEsYUFBQSxPQUFBLENBQUEsR0FBQSxDQUFBO0FBQUE7QUFBQSxHQUFBO0FBQUEsQ0FBQTs7QUFDQSxJQUFBLFFBQUEsR0FBQSxPQUFBLENBQUEsVUFBQSxDQUFBOztBQUFBLE1BQUEsQ0FBQSxJQUFBLENBQUEsUUFBQSxFQUFBLE9BQUEsQ0FBQSxVQUFBLEdBQUEsRUFBQTtBQUFBLE1BQUEsR0FBQSxLQUFBLFNBQUEsSUFBQSxHQUFBLEtBQUEsWUFBQSxFQUFBO0FBQUEsTUFBQSxHQUFBLElBQUEsT0FBQSxJQUFBLE9BQUEsQ0FBQSxHQUFBLENBQUEsS0FBQSxRQUFBLENBQUEsR0FBQSxDQUFBLEVBQUE7QUFBQSxFQUFBLE1BQUEsQ0FBQSxjQUFBLENBQUEsT0FBQSxFQUFBLEdBQUEsRUFBQTtBQUFBLElBQUEsVUFBQSxFQUFBLElBQUE7QUFBQSxJQUFBLEdBQUEsRUFBQSxTQUFBLEdBQUEsR0FBQTtBQUFBLGFBQUEsUUFBQSxDQUFBLEdBQUEsQ0FBQTtBQUFBO0FBQUEsR0FBQTtBQUFBLENBQUE7O0FBQ0EsSUFBQSxRQUFBLEdBQUEsT0FBQSxDQUFBLFVBQUEsQ0FBQTs7QUFBQSxNQUFBLENBQUEsSUFBQSxDQUFBLFFBQUEsRUFBQSxPQUFBLENBQUEsVUFBQSxHQUFBLEVBQUE7QUFBQSxNQUFBLEdBQUEsS0FBQSxTQUFBLElBQUEsR0FBQSxLQUFBLFlBQUEsRUFBQTtBQUFBLE1BQUEsR0FBQSxJQUFBLE9BQUEsSUFBQSxPQUFBLENBQUEsR0FBQSxDQUFBLEtBQUEsUUFBQSxDQUFBLEdBQUEsQ0FBQSxFQUFBO0FBQUEsRUFBQSxNQUFBLENBQUEsY0FBQSxDQUFBLE9BQUEsRUFBQSxHQUFBLEVBQUE7QUFBQSxJQUFBLFVBQUEsRUFBQSxJQUFBO0FBQUEsSUFBQSxHQUFBLEVBQUEsU0FBQSxHQUFBLEdBQUE7QUFBQSxhQUFBLFFBQUEsQ0FBQSxHQUFBLENBQUE7QUFBQTtBQUFBLEdBQUE7QUFBQSxDQUFBOztBQUNBLElBQUEsWUFBQSxHQUFBLE9BQUEsQ0FBQSxjQUFBLENBQUE7O0FBQUEsTUFBQSxDQUFBLElBQUEsQ0FBQSxZQUFBLEVBQUEsT0FBQSxDQUFBLFVBQUEsR0FBQSxFQUFBO0FBQUEsTUFBQSxHQUFBLEtBQUEsU0FBQSxJQUFBLEdBQUEsS0FBQSxZQUFBLEVBQUE7QUFBQSxNQUFBLEdBQUEsSUFBQSxPQUFBLElBQUEsT0FBQSxDQUFBLEdBQUEsQ0FBQSxLQUFBLFlBQUEsQ0FBQSxHQUFBLENBQUEsRUFBQTtBQUFBLEVBQUEsTUFBQSxDQUFBLGNBQUEsQ0FBQSxPQUFBLEVBQUEsR0FBQSxFQUFBO0FBQUEsSUFBQSxVQUFBLEVBQUEsSUFBQTtBQUFBLElBQUEsR0FBQSxFQUFBLFNBQUEsR0FBQSxHQUFBO0FBQUEsYUFBQSxZQUFBLENBQUEsR0FBQSxDQUFBO0FBQUE7QUFBQSxHQUFBO0FBQUEsQ0FBQTs7QUFDQSxJQUFBLGFBQUEsR0FBQSxPQUFBLENBQUEsZ0JBQUEsQ0FBQTs7QUFBQSxNQUFBLENBQUEsSUFBQSxDQUFBLGFBQUEsRUFBQSxPQUFBLENBQUEsVUFBQSxHQUFBLEVBQUE7QUFBQSxNQUFBLEdBQUEsS0FBQSxTQUFBLElBQUEsR0FBQSxLQUFBLFlBQUEsRUFBQTtBQUFBLE1BQUEsR0FBQSxJQUFBLE9BQUEsSUFBQSxPQUFBLENBQUEsR0FBQSxDQUFBLEtBQUEsYUFBQSxDQUFBLEdBQUEsQ0FBQSxFQUFBO0FBQUEsRUFBQSxNQUFBLENBQUEsY0FBQSxDQUFBLE9BQUEsRUFBQSxHQUFBLEVBQUE7QUFBQSxJQUFBLFVBQUEsRUFBQSxJQUFBO0FBQUEsSUFBQSxHQUFBLEVBQUEsU0FBQSxHQUFBLEdBQUE7QUFBQSxhQUFBLGFBQUEsQ0FBQSxHQUFBLENBQUE7QUFBQTtBQUFBLEdBQUE7QUFBQSxDQUFBOzs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7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QSxHQUFBLE9BQUEsQ0FBQSxpQkFBQSxDQUFBOztBQU9BLE1BQUEsQ0FBQSxJQUFBLENBQUEsYUFBQSxFQUFBLE9BQUEsQ0FBQSxVQUFBLEdBQUEsRUFBQTtBQUFBLE1BQUEsR0FBQSxLQUFBLFNBQUEsSUFBQSxHQUFBLEtBQUEsWUFBQSxFQUFBO0FBQUEsTUFBQSxNQUFBLENBQUEsU0FBQSxDQUFBLGNBQUEsQ0FBQSxJQUFBLENBQUEsWUFBQSxFQUFBLEdBQUEsQ0FBQSxFQUFBO0FBQUEsTUFBQSxHQUFBLElBQUEsT0FBQSxJQUFBLE9BQUEsQ0FBQSxHQUFBLENBQUEsS0FBQSxhQUFBLENBQUEsR0FBQSxDQUFBLEVBQUE7QUFBQSxFQUFBLE1BQUEsQ0FBQSxjQUFBLENBQUEsT0FBQSxFQUFBLEdBQUEsRUFBQTtBQUFBLElBQUEsVUFBQSxFQUFBLElBQUE7QUFBQSxJQUFBLEdBQUEsRUFBQSxTQUFBLEdBQUEsR0FBQTtBQUFBLGFBQUEsYUFBQSxDQUFBLEdBQUEsQ0FBQTtBQUFBO0FBQUEsR0FBQTtBQUFBLENBQUE7O0FBSkEsSUFBQSxhQUFBLEdBQUEsT0FBQSxDQUFBLGlCQUFBLENBQUE7O0FBQUEsTUFBQSxDQUFBLElBQUEsQ0FBQSxhQUFBLEVBQUEsT0FBQSxDQUFBLFVBQUEsR0FBQSxFQUFBO0FBQUEsTUFBQSxHQUFBLEtBQUEsU0FBQSxJQUFBLEdBQUEsS0FBQSxZQUFBLEVBQUE7QUFBQSxNQUFBLE1BQUEsQ0FBQSxTQUFBLENBQUEsY0FBQSxDQUFBLElBQUEsQ0FBQSxZQUFBLEVBQUEsR0FBQSxDQUFBLEVBQUE7QUFBQSxNQUFBLEdBQUEsSUFBQSxPQUFBLElBQUEsT0FBQSxDQUFBLEdBQUEsQ0FBQSxLQUFBLGFBQUEsQ0FBQSxHQUFBLENBQUEsRUFBQTtBQUFBLEVBQUEsTUFBQSxDQUFBLGNBQUEsQ0FBQSxPQUFBLEVBQUEsR0FBQSxFQUFBO0FBQUEsSUFBQSxVQUFBLEVBQUEsSUFBQTtBQUFBLElBQUEsR0FBQSxFQUFBLFNBQUEsR0FBQSxHQUFBO0FBQUEsYUFBQSxhQUFBLENBQUEsR0FBQSxDQUFBO0FBQUE7QUFBQSxHQUFBO0FBQUEsQ0FBQTs7QUFDQSxJQUFBLFNBQUEsR0FBQSxPQUFBLENBQUEsYUFBQSxDQUFBOztBQUFBLE1BQUEsQ0FBQSxJQUFBLENBQUEsU0FBQSxFQUFBLE9BQUEsQ0FBQSxVQUFBLEdBQUEsRUFBQTtBQUFBLE1BQUEsR0FBQSxLQUFBLFNBQUEsSUFBQSxHQUFBLEtBQUEsWUFBQSxFQUFBO0FBQUEsTUFBQSxNQUFBLENBQUEsU0FBQSxDQUFBLGNBQUEsQ0FBQSxJQUFBLENBQUEsWUFBQSxFQUFBLEdBQUEsQ0FBQSxFQUFBO0FBQUEsTUFBQSxHQUFBLElBQUEsT0FBQSxJQUFBLE9BQUEsQ0FBQSxHQUFBLENBQUEsS0FBQSxTQUFBLENBQUEsR0FBQSxDQUFBLEVBQUE7QUFBQSxFQUFBLE1BQUEsQ0FBQSxjQUFBLENBQUEsT0FBQSxFQUFBLEdBQUEsRUFBQTtBQUFBLElBQUEsVUFBQSxFQUFBLElBQUE7QUFBQSxJQUFBLEdBQUEsRUFBQSxTQUFBLEdBQUEsR0FBQTtBQUFBLGFBQUEsU0FBQSxDQUFBLEdBQUEsQ0FBQTtBQUFBO0FBQUEsR0FBQTtBQUFBLENBQUE7O0FBQ0EsSUFBQSxVQUFBLEdBQUEsT0FBQSxDQUFBLGFBQUEsQ0FBQTs7QUFBQSxNQUFBLENBQUEsSUFBQSxDQUFBLFVBQUEsRUFBQSxPQUFBLENBQUEsVUFBQSxHQUFBLEVBQUE7QUFBQSxNQUFBLEdBQUEsS0FBQSxTQUFBLElBQUEsR0FBQSxLQUFBLFlBQUEsRUFBQTtBQUFBLE1BQUEsTUFBQSxDQUFBLFNBQUEsQ0FBQSxjQUFBLENBQUEsSUFBQSxDQUFBLFlBQUEsRUFBQSxHQUFBLENBQUEsRUFBQTtBQUFBLE1BQUEsR0FBQSxJQUFBLE9BQUEsSUFBQSxPQUFBLENBQUEsR0FBQSxDQUFBLEtBQUEsVUFBQSxDQUFBLEdBQUEsQ0FBQSxFQUFBO0FBQUEsRUFBQSxNQUFBLENBQUEsY0FBQSxDQUFBLE9BQUEsRUFBQSxHQUFBLEVBQUE7QUFBQSxJQUFBLFVBQUEsRUFBQSxJQUFBO0FBQUEsSUFBQSxHQUFBLEVBQUEsU0FBQSxHQUFBLEdBQUE7QUFBQSxhQUFBLFVBQUEsQ0FBQSxHQUFBLENBQUE7QUFBQTtBQUFBLEdBQUE7QUFBQSxDQUFBOztBQUNBLElBQUEsUUFBQSxHQUFBLE9BQUEsQ0FBQSxXQUFBLENBQUE7O0FBQUEsTUFBQSxDQUFBLElBQUEsQ0FBQSxRQUFBLEVBQUEsT0FBQSxDQUFBLFVBQUEsR0FBQSxFQUFBO0FBQUEsTUFBQSxHQUFBLEtBQUEsU0FBQSxJQUFBLEdBQUEsS0FBQSxZQUFBLEVBQUE7QUFBQSxNQUFBLE1BQUEsQ0FBQSxTQUFBLENBQUEsY0FBQSxDQUFBLElBQUEsQ0FBQSxZQUFBLEVBQUEsR0FBQSxDQUFBLEVBQUE7QUFBQSxNQUFBLEdBQUEsSUFBQSxPQUFBLElBQUEsT0FBQSxDQUFBLEdBQUEsQ0FBQSxLQUFBLFFBQUEsQ0FBQSxHQUFBLENBQUEsRUFBQTtBQUFBLEVBQUEsTUFBQSxDQUFBLGNBQUEsQ0FBQSxPQUFBLEVBQUEsR0FBQSxFQUFBO0FBQUEsSUFBQSxVQUFBLEVBQUEsSUFBQTtBQUFBLElBQUEsR0FBQSxFQUFBLFNBQUEsR0FBQSxHQUFBO0FBQUEsYUFBQSxRQUFBLENBQUEsR0FBQSxDQUFBO0FBQUE7QUFBQSxHQUFBO0FBQUEsQ0FBQTs7QUFFQSxJQUFBLEVBQUEsR0FBQSxzQkFBQSxDQUFBLE9BQUEsQ0FBQSxNQUFBLENBQUEsQ0FBQTs7QUFQQSxhQUFBLENBQUEsWUFBQSxDQUFBLE1BQUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0RBLElBQUEsUUFBQSxHQUFBLE9BQUEsQ0FBQSxVQUFBLENBQUE7O0FBQ0EsSUFBQSxRQUFBLEdBQUEsT0FBQSxDQUFBLFVBQUEsQ0FBQTs7QUFDQSxJQUFBLEVBQUEsR0FBQSx1QkFBQSxDQUFBLE9BQUEsQ0FBQSxNQUFBLENBQUEsQ0FBQTs7QUFDQSxJQUFBLE9BQUEsR0FBQSxzQkFBQSxDQUFBLE9BQUEsQ0FBQSxrQkFBQSxDQUFBLENBQUE7O0FBQ0EsSUFBQSxTQUFBLEdBQUEsc0JBQUEsQ0FBQSxPQUFBLENBQUEsb0JBQUEsQ0FB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QSxNQUFBO0FBQ0EsV0FBQSxVQUFBLENBQUEsSUFBQTtBQUNIOzs7V0FFRCxTQUFBLE9BQUEsQ0FBQSxJQUFBLEVBQUEsTUFBQSxFQUFtQztBQUFBLFVBQWIsTUFBYSxHQUFBLFNBQUEsQ0FBQSxNQUFBLEdBQUEsQ0FBQSxJQUFBLFNBQUEsQ0FBQSxDQUFBLENBQUEsS0FBQSxTQUFBLEdBQUEsU0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFOLEtBQU07QUFDL0IsV0FBQSxJQUFBLENBQUEsU0FBQTtBQUNBLFdBQUEsSUFBQSxDQUFBLE9BQUEsQ0FBQSxJQUFBLEVBQUEsTUFBQTtBQUNBLFdBQUEsTUFBQSxDQUFBLElBQUE7QUFDQSxXQUFBLE1BQUEsQ0FBQSxNQUFBLENBQUEsSUFBQTtBQUNBLGFBQUEsSUFBQTtBQUNIOzs7V0FFRCxTQUFBLGVBQUEsQ0FBQSxNQUFBLEVBQXVCO0FBQ25CLFVBQUksT0FBTyxHQUFHLElBQUksUUFBQSxDQUFBLE1BQUEsQ0FBSixZQUFBLENBQXVCLEtBQUEsTUFBQSxDQUFBLG1CQUFBLENBQXJDLE1BQXFDLENBQXZCLENBQWQ7QUFDQSxXQUFBLE9BQUEsQ0FBQSxPQUFBLEVBQUEsTUFBQTtBQUNIOzs7V0FDRCxTQUFBLGFBQUEsQ0FBQSxNQUFBLEVBQXFCO0FBQ2pCLFVBQUksT0FBTyxHQUFHLElBQUksUUFBQSxDQUFBLE1BQUEsQ0FBSixVQUFBLENBQXFCLEtBQUEsTUFBQSxDQUFBLG1CQUFBLENBQW5DLE1BQW1DLENBQXJCLENBQWQ7QUFDQSxXQUFBLE9BQUEsQ0FBQSxPQUFBLEVBQUEsTUFBQTtBQUNIOzs7V0FDRCxTQUFBLGVBQUEsQ0FBQSxNQUFBLEVBQXVCO0FBQ25CLFVBQUksT0FBTyxHQUFHLElBQUksUUFBQSxDQUFBLE1BQUEsQ0FBSixZQUFBLENBQXVCLEtBQUEsTUFBQSxDQUFBLG1CQUFBLENBQXJDLE1BQXFDLENBQXZCLENBQWQ7QUFDQSxXQUFBLE9BQUEsQ0FBQSxPQUFBLEVBQUEsTUFBQTtBQUNIOzs7V0FFRCxTQUFBLFVBQUEsQ0FBQSxJQUFBLEVBQUEs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LElBQUEsT0FBQSxDQUFBLEdBQUEsQ0FBQSxLQUFBLE1BQUEsQ0FBQSxHQUFBLENBQUEsRUFBQTtBQUFBLEVBQUEsTUFBQSxDQUFBLGNBQUEsQ0FBQSxPQUFBLEVBQUEsR0FBQSxFQUFBO0FBQUEsSUFBQSxVQUFBLEVBQUEsSUFBQTtBQUFBLElBQUEsR0FBQSxFQUFBLFNBQUEsR0FBQSxHQUFBO0FBQUEsYUFBQSxNQUFBLENBQUEsR0FBQSxDQUFBO0FBQUE7QUFBQSxHQUFBO0FBQUEsQ0FBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7XG4gIGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoO1xuXG4gIGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykge1xuICAgIGFycjJbaV0gPSBhcnJbaV07XG4gIH1cblxuICByZXR1cm4gYXJyMjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXJyYXlMaWtlVG9BcnJheTtcbm1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzLCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTsiLCJ2YXIgYXJyYXlMaWtlVG9BcnJheSA9IHJlcXVpcmUoXCIuL2FycmF5TGlrZVRvQXJyYXkuanNcIik7XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhvdXRIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycmF5TGlrZVRvQXJyYXkoYXJyKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXJyYXlXaXRob3V0SG9sZXM7XG5tb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0cywgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7IiwiZnVuY3Rpb24gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKSB7XG4gIGlmIChzZWxmID09PSB2b2lkIDApIHtcbiAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7XG4gIH1cblxuICByZXR1cm4gc2VsZjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXNzZXJ0VGhpc0luaXRpYWxpemVkO1xubW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHMsIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlOyIsImZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2NsYXNzQ2FsbENoZWNrO1xubW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHMsIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlOyIsImZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gIGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gIHJldHVybiBDb25zdHJ1Y3Rvcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfY3JlYXRlQ2xhc3M7XG5tb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0cywgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7IiwiZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBfZ2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3QuZ2V0UHJvdG90eXBlT2YgOiBmdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2Yobykge1xuICAgIHJldHVybiBvLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2Yobyk7XG4gIH07XG4gIG1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzLCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbiAgcmV0dXJuIF9nZXRQcm90b3R5cGVPZihvKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfZ2V0UHJvdG90eXBlT2Y7XG5tb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0cywgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7IiwidmFyIHNldFByb3RvdHlwZU9mID0gcmVxdWlyZShcIi4vc2V0UHJvdG90eXBlT2YuanNcIik7XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuICBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uXCIpO1xuICB9XG5cbiAgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7XG4gICAgY29uc3RydWN0b3I6IHtcbiAgICAgIHZhbHVlOiBzdWJDbGFzcyxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfVxuICB9KTtcbiAgaWYgKHN1cGVyQ2xhc3MpIHNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfaW5oZXJpdHM7XG5tb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0cywgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7IiwiZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcbiAgICBcImRlZmF1bHRcIjogb2JqXG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzLCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTsiLCJmdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5KGl0ZXIpIHtcbiAgaWYgKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgaXRlcltTeW1ib2wuaXRlcmF0b3JdICE9IG51bGwgfHwgaXRlcltcIkBAaXRlcmF0b3JcIl0gIT0gbnVsbCkgcmV0dXJuIEFycmF5LmZyb20oaXRlcik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2l0ZXJhYmxlVG9BcnJheTtcbm1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzLCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTsiLCJmdW5jdGlvbiBfbm9uSXRlcmFibGVTcHJlYWQoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gc3ByZWFkIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9ub25JdGVyYWJsZVNwcmVhZDtcbm1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzLCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTsiLCJ2YXIgX3R5cGVvZiA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL3R5cGVvZlwiKVtcImRlZmF1bHRcIl07XG5cbnZhciBhc3NlcnRUaGlzSW5pdGlhbGl6ZWQgPSByZXF1aXJlKFwiLi9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQuanNcIik7XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHtcbiAgaWYgKGNhbGwgJiYgKF90eXBlb2YoY2FsbCkgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikpIHtcbiAgICByZXR1cm4gY2FsbDtcbiAgfSBlbHNlIGlmIChjYWxsICE9PSB2b2lkIDApIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRGVyaXZlZCBjb25zdHJ1Y3RvcnMgbWF5IG9ubHkgcmV0dXJuIG9iamVjdCBvciB1bmRlZmluZWRcIik7XG4gIH1cblxuICByZXR1cm4gYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuO1xubW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHMsIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlOyIsImZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7XG4gICAgby5fX3Byb3RvX18gPSBwO1xuICAgIHJldHVybiBvO1xuICB9O1xuXG4gIG1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzLCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbiAgcmV0dXJuIF9zZXRQcm90b3R5cGVPZihvLCBwKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfc2V0UHJvdG90eXBlT2Y7XG5tb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0cywgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7IiwidmFyIGFycmF5V2l0aG91dEhvbGVzID0gcmVxdWlyZShcIi4vYXJyYXlXaXRob3V0SG9sZXMuanNcIik7XG5cbnZhciBpdGVyYWJsZVRvQXJyYXkgPSByZXF1aXJlKFwiLi9pdGVyYWJsZVRvQXJyYXkuanNcIik7XG5cbnZhciB1bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheSA9IHJlcXVpcmUoXCIuL3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5LmpzXCIpO1xuXG52YXIgbm9uSXRlcmFibGVTcHJlYWQgPSByZXF1aXJlKFwiLi9ub25JdGVyYWJsZVNwcmVhZC5qc1wiKTtcblxuZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikge1xuICByZXR1cm4gYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB8fCBpdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCB1bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIpIHx8IG5vbkl0ZXJhYmxlU3ByZWFkKCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3RvQ29uc3VtYWJsZUFycmF5O1xubW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHMsIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlOyIsImZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gIFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjtcblxuICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgcmV0dXJuIHR5cGVvZiBvYmo7XG4gICAgfTtcblxuICAgIG1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzLCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7XG4gICAgfTtcblxuICAgIG1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzLCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiBfdHlwZW9mKG9iaik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3R5cGVvZjtcbm1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzLCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTsiLCJ2YXIgYXJyYXlMaWtlVG9BcnJheSA9IHJlcXVpcmUoXCIuL2FycmF5TGlrZVRvQXJyYXkuanNcIik7XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHtcbiAgaWYgKCFvKSByZXR1cm47XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIGFycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbiAgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpO1xuICBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lO1xuICBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTtcbiAgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBhcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5O1xubW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHMsIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlOyIsImltcG9ydCAqIGFzIGQzIGZyb20gXCIuL2QzXCI7XHJcbmltcG9ydCB7VGVtcGxhdGVzfSBmcm9tIFwiLi90ZW1wbGF0ZXNcIjtcclxuaW1wb3J0IHtpMThufSBmcm9tIFwiLi9pMThuL2kxOG5cIjtcclxuaW1wb3J0IHtVdGlsc30gZnJvbSBcInNkLXV0aWxzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQXBwVXRpbHMge1xyXG5cclxuICAgIHN0YXRpYyBzYW5pdGl6ZUhlaWdodCA9IGZ1bmN0aW9uIChoZWlnaHQsIGNvbnRhaW5lcikge1xyXG4gICAgICAgIHJldHVybiAoaGVpZ2h0IHx8IHBhcnNlSW50KGNvbnRhaW5lci5zdHlsZSgnaGVpZ2h0JyksIDEwKSB8fCA0MDApO1xyXG4gICAgfTtcclxuXHJcbiAgICBzdGF0aWMgc2FuaXRpemVXaWR0aCA9IGZ1bmN0aW9uICh3aWR0aCwgY29udGFpbmVyKSB7XHJcbiAgICAgICAgcmV0dXJuICh3aWR0aCB8fCBwYXJzZUludChjb250YWluZXIuc3R5bGUoJ3dpZHRoJyksIDEwKSB8fCA5NjApO1xyXG4gICAgfTtcclxuXHJcbiAgICBzdGF0aWMgYXZhaWxhYmxlSGVpZ2h0ID0gZnVuY3Rpb24gKGhlaWdodCwgY29udGFpbmVyLCBtYXJnaW4pIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5tYXgoMCwgQXBwVXRpbHMuc2FuaXRpemVIZWlnaHQoaGVpZ2h0LCBjb250YWluZXIpIC0gbWFyZ2luLnRvcCAtIG1hcmdpbi5ib3R0b20pO1xyXG4gICAgfTtcclxuXHJcbiAgICBzdGF0aWMgYXZhaWxhYmxlV2lkdGggPSBmdW5jdGlvbiAod2lkdGgsIGNvbnRhaW5lciwgbWFyZ2luKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KDAsIEFwcFV0aWxzLnNhbml0aXplV2lkdGgod2lkdGgsIGNvbnRhaW5lcikgLSBtYXJnaW4ubGVmdCAtIG1hcmdpbi5yaWdodCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vcGxhY2VzIHRleHRTdHJpbmcgaW4gdGV4dE9iaiwgYWRkcyBhbiBlbGxpcHNpcyBpZiB0ZXh0IGNhbid0IGZpdCBpbiB3aWR0aFxyXG4gICAgc3RhdGljIHBsYWNlVGV4dFdpdGhFbGxpcHNpcyh0ZXh0RDNPYmosIHRleHRTdHJpbmcsIHdpZHRoKSB7XHJcbiAgICAgICAgdmFyIHRleHRPYmogPSB0ZXh0RDNPYmoubm9kZSgpO1xyXG4gICAgICAgIHRleHRPYmoudGV4dENvbnRlbnQgPSB0ZXh0U3RyaW5nO1xyXG5cclxuICAgICAgICB2YXIgbWFyZ2luID0gMDtcclxuICAgICAgICB2YXIgZWxsaXBzaXNMZW5ndGggPSA5O1xyXG4gICAgICAgIC8vZWxsaXBzaXMgaXMgbmVlZGVkXHJcbiAgICAgICAgaWYgKHRleHRPYmouZ2V0Q29tcHV0ZWRUZXh0TGVuZ3RoKCkgPiB3aWR0aCArIG1hcmdpbikge1xyXG4gICAgICAgICAgICBmb3IgKHZhciB4ID0gdGV4dFN0cmluZy5sZW5ndGggLSAzOyB4ID4gMDsgeCAtPSAxKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGV4dE9iai5nZXRTdWJTdHJpbmdMZW5ndGgoMCwgeCkgKyBlbGxpcHNpc0xlbmd0aCA8PSB3aWR0aCArIG1hcmdpbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHRPYmoudGV4dENvbnRlbnQgPSB0ZXh0U3RyaW5nLnN1YnN0cmluZygwLCB4KSArIFwiLi4uXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGV4dE9iai50ZXh0Q29udGVudCA9IFwiLi4uXCI7IC8vY2FuJ3QgcGxhY2UgYXQgYWxsXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHBsYWNlVGV4dFdpdGhFbGxpcHNpc0FuZFRvb2x0aXAodGV4dEQzT2JqLCB0ZXh0U3RyaW5nLCB3aWR0aCwgdG9vbHRpcCkge1xyXG4gICAgICAgIHZhciBlbGxpcHNpc1BsYWNlZCA9IEFwcFV0aWxzLnBsYWNlVGV4dFdpdGhFbGxpcHNpcyh0ZXh0RDNPYmosIHRleHRTdHJpbmcsIHdpZHRoKTtcclxuICAgICAgICBpZiAoZWxsaXBzaXNQbGFjZWQgJiYgdG9vbHRpcCkge1xyXG4gICAgICAgICAgICB0ZXh0RDNPYmoub24oXCJtb3VzZW92ZXJcIiwgZnVuY3Rpb24gKGV2ZW50LCBkKSB7XHJcbiAgICAgICAgICAgICAgICB0b29sdGlwLnRyYW5zaXRpb24oKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kdXJhdGlvbigyMDApXHJcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCAuOSk7XHJcbiAgICAgICAgICAgICAgICB0b29sdGlwLmh0bWwodGV4dFN0cmluZylcclxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIChldmVudC5wYWdlWCArIDUpICsgXCJweFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcInRvcFwiLCAoZXZlbnQucGFnZVkgLSAyOCkgKyBcInB4XCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRleHREM09iai5vbihcIm1vdXNlb3V0XCIsIGZ1bmN0aW9uIChldmVudCwgZCkge1xyXG4gICAgICAgICAgICAgICAgdG9vbHRpcC50cmFuc2l0aW9uKClcclxuICAgICAgICAgICAgICAgICAgICAuZHVyYXRpb24oNTAwKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgMCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldEZvbnRTaXplKGVsZW1lbnQpIHtcclxuICAgICAgICByZXR1cm4gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZShcImZvbnQtc2l6ZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0VHJhbnNsYXRpb24odHJhbnNmb3JtKSB7XHJcbiAgICAgICAgLy8gQ3JlYXRlIGEgZHVtbXkgZyBmb3IgY2FsY3VsYXRpb24gcHVycG9zZXMgb25seS4gVGhpcyB3aWxsIG5ldmVyXHJcbiAgICAgICAgLy8gYmUgYXBwZW5kZWQgdG8gdGhlIERPTSBhbmQgd2lsbCBiZSBkaXNjYXJkZWQgb25jZSB0aGlzIGZ1bmN0aW9uXHJcbiAgICAgICAgLy8gcmV0dXJucy5cclxuICAgICAgICB2YXIgZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwiZ1wiKTtcclxuXHJcbiAgICAgICAgLy8gU2V0IHRoZSB0cmFuc2Zvcm0gYXR0cmlidXRlIHRvIHRoZSBwcm92aWRlZCBzdHJpbmcgdmFsdWUuXHJcbiAgICAgICAgZy5zZXRBdHRyaWJ1dGVOUyhudWxsLCBcInRyYW5zZm9ybVwiLCB0cmFuc2Zvcm0pO1xyXG5cclxuICAgICAgICAvLyBjb25zb2xpZGF0ZSB0aGUgU1ZHVHJhbnNmb3JtTGlzdCBjb250YWluaW5nIGFsbCB0cmFuc2Zvcm1hdGlvbnNcclxuICAgICAgICAvLyB0byBhIHNpbmdsZSBTVkdUcmFuc2Zvcm0gb2YgdHlwZSBTVkdfVFJBTlNGT1JNX01BVFJJWCBhbmQgZ2V0XHJcbiAgICAgICAgLy8gaXRzIFNWR01hdHJpeC5cclxuICAgICAgICB2YXIgbWF0cml4ID0gZy50cmFuc2Zvcm0uYmFzZVZhbC5jb25zb2xpZGF0ZSgpLm1hdHJpeDtcclxuXHJcbiAgICAgICAgLy8gQXMgcGVyIGRlZmluaXRpb24gdmFsdWVzIGUgYW5kIGYgYXJlIHRoZSBvbmVzIGZvciB0aGUgdHJhbnNsYXRpb24uXHJcbiAgICAgICAgcmV0dXJuIFttYXRyaXguZSwgbWF0cml4LmZdO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBzdGF0aWMgY2xvc2VzdFBvaW50KHBhdGhOb2RlLCBwb2ludCkge1xyXG4gICAgICAgIHZhciBwYXRoTGVuZ3RoID0gcGF0aE5vZGUuZ2V0VG90YWxMZW5ndGgoKSxcclxuICAgICAgICAgICAgcHJlY2lzaW9uID0gOCxcclxuICAgICAgICAgICAgYmVzdCxcclxuICAgICAgICAgICAgYmVzdExlbmd0aCxcclxuICAgICAgICAgICAgYmVzdERpc3RhbmNlID0gSW5maW5pdHk7XHJcblxyXG4gICAgICAgIC8vIGxpbmVhciBzY2FuIGZvciBjb2Fyc2UgYXBwcm94aW1hdGlvblxyXG4gICAgICAgIGZvciAodmFyIHNjYW4sIHNjYW5MZW5ndGggPSAwLCBzY2FuRGlzdGFuY2U7IHNjYW5MZW5ndGggPD0gcGF0aExlbmd0aDsgc2Nhbkxlbmd0aCArPSBwcmVjaXNpb24pIHtcclxuICAgICAgICAgICAgaWYgKChzY2FuRGlzdGFuY2UgPSBkaXN0YW5jZTIoc2NhbiA9IHBhdGhOb2RlLmdldFBvaW50QXRMZW5ndGgoc2Nhbkxlbmd0aCkpKSA8IGJlc3REaXN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgYmVzdCA9IHNjYW4sIGJlc3RMZW5ndGggPSBzY2FuTGVuZ3RoLCBiZXN0RGlzdGFuY2UgPSBzY2FuRGlzdGFuY2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGJpbmFyeSBzZWFyY2ggZm9yIHByZWNpc2UgZXN0aW1hdGVcclxuICAgICAgICBwcmVjaXNpb24gLz0gMjtcclxuICAgICAgICB3aGlsZSAocHJlY2lzaW9uID4gMC41KSB7XHJcbiAgICAgICAgICAgIHZhciBiZWZvcmUsXHJcbiAgICAgICAgICAgICAgICBhZnRlcixcclxuICAgICAgICAgICAgICAgIGJlZm9yZUxlbmd0aCxcclxuICAgICAgICAgICAgICAgIGFmdGVyTGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgYmVmb3JlRGlzdGFuY2UsXHJcbiAgICAgICAgICAgICAgICBhZnRlckRpc3RhbmNlO1xyXG4gICAgICAgICAgICBpZiAoKGJlZm9yZUxlbmd0aCA9IGJlc3RMZW5ndGggLSBwcmVjaXNpb24pID49IDAgJiYgKGJlZm9yZURpc3RhbmNlID0gZGlzdGFuY2UyKGJlZm9yZSA9IHBhdGhOb2RlLmdldFBvaW50QXRMZW5ndGgoYmVmb3JlTGVuZ3RoKSkpIDwgYmVzdERpc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICBiZXN0ID0gYmVmb3JlLCBiZXN0TGVuZ3RoID0gYmVmb3JlTGVuZ3RoLCBiZXN0RGlzdGFuY2UgPSBiZWZvcmVEaXN0YW5jZTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICgoYWZ0ZXJMZW5ndGggPSBiZXN0TGVuZ3RoICsgcHJlY2lzaW9uKSA8PSBwYXRoTGVuZ3RoICYmIChhZnRlckRpc3RhbmNlID0gZGlzdGFuY2UyKGFmdGVyID0gcGF0aE5vZGUuZ2V0UG9pbnRBdExlbmd0aChhZnRlckxlbmd0aCkpKSA8IGJlc3REaXN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgYmVzdCA9IGFmdGVyLCBiZXN0TGVuZ3RoID0gYWZ0ZXJMZW5ndGgsIGJlc3REaXN0YW5jZSA9IGFmdGVyRGlzdGFuY2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBwcmVjaXNpb24gLz0gMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYmVzdCA9IFtiZXN0LngsIGJlc3QueV07XHJcbiAgICAgICAgYmVzdC5kaXN0YW5jZSA9IE1hdGguc3FydChiZXN0RGlzdGFuY2UpO1xyXG4gICAgICAgIHJldHVybiBiZXN0O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBkaXN0YW5jZTIocCkge1xyXG4gICAgICAgICAgICB2YXIgZHggPSBwLnggLSBwb2ludFswXSxcclxuICAgICAgICAgICAgICAgIGR5ID0gcC55IC0gcG9pbnRbMV07XHJcbiAgICAgICAgICAgIHJldHVybiBkeCAqIGR4ICsgZHkgKiBkeTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdyb3dsKG1lc3NhZ2UsIHR5cGU9J2luZm8nLCBwb3NpdGlvbj0ncmlnaHQnLCB0aW1lID0gMjAwMCl7XHJcbiAgICAgICAgdmFyIGh0bWwgPSBUZW1wbGF0ZXMuZ2V0KCdncm93bCcsIHttZXNzYWdlOm1lc3NhZ2UsIHR5cGU6dHlwZX0pXHJcblxyXG4gICAgICAgIHZhciBnID0gZDMuc2VsZWN0KCdib2R5Jykuc2VsZWN0T3JBcHBlbmQoJ2Rpdi5zZC1ncm93bC1saXN0LicrcG9zaXRpb24pLmFwcGVuZCgnZGl2JykuaHRtbChodG1sKTtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGcucmVtb3ZlKCk7XHJcbiAgICAgICAgfSwgdGltZSlcclxuICAgIH1cclxuXHJcblxyXG4gICAgc3RhdGljIGNyZWF0ZUVsZW1lbnQodGFnLCBhdHRyaWJzLCBwYXJlbnQpIHtcclxuICAgICAgICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XHJcblxyXG4gICAgICAgIGlmIChhdHRyaWJzKSB7XHJcbiAgICAgICAgICAgIEFwcFV0aWxzLmRlZXBFeHRlbmQoZWwsIGF0dHJpYnMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocGFyZW50KSB7XHJcbiAgICAgICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChlbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlbDtcclxuICAgIH07XHJcblxyXG4gICAgc3RhdGljIHJlbW92ZUVsZW1lbnQoZWxlbWVudCkge1xyXG4gICAgICAgIGVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbGVtZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgcmVwbGFjZVVybHModGV4dCl7XHJcbiAgICAgICAgaWYoIXRleHQpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGV4dDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHVybFJlZ2V4cCA9IC8oKGZ0cHxodHRwfGh0dHBzKTpcXC9cXC8oXFx3Kzp7MCwxfVxcdypAKT8oXFxTKykoOlswLTldKyk/KFxcL3xcXC8oW1xcdyMhOi4/Kz0mJUAhXFwtXFwvXSkpPykvXHJcblxyXG4gICAgICAgIHJldHVybiB0ZXh0LnJlcGxhY2UodXJsUmVnZXhwLCAnPGEgaHJlZj1cIiQxXCIgdGFyZ2V0PVwiX2JsYW5rXCI+JDE8L2E+Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGVzY2FwZUh0bWwoaHRtbClcclxuICAgIHtcclxuICAgICAgICB2YXIgdGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGh0bWwpO1xyXG4gICAgICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBkaXYuYXBwZW5kQ2hpbGQodGV4dCk7XHJcbiAgICAgICAgcmV0dXJuIGRpdi5pbm5lckhUTUw7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGRpc3BhdGNoSHRtbEV2ZW50KGVsZW1lbnQsIG5hbWUpe1xyXG4gICAgICAgIGlmIChcImNyZWF0ZUV2ZW50XCIgaW4gZG9jdW1lbnQpIHtcclxuICAgICAgICAgICAgdmFyIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiSFRNTEV2ZW50c1wiKTtcclxuICAgICAgICAgICAgZXZ0LmluaXRFdmVudChuYW1lLCBmYWxzZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuZGlzcGF0Y2hFdmVudChldnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIGVsZW1lbnQuZmlyZUV2ZW50KFwib25cIituYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZGlzcGF0Y2hFdmVudChuYW1lLCBkYXRhKXtcclxuICAgICAgICB2YXIgZXZlbnQ7XHJcbiAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICBldmVudCA9IG5ldyAgQ3VzdG9tRXZlbnQobmFtZSx7ICdkZXRhaWwnOiBkYXRhIH0pO1xyXG4gICAgICAgIH1jYXRjaCAoZSl7IC8vSUVcclxuICAgICAgICAgICAgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcclxuICAgICAgICAgICAgZXZlbnQuaW5pdEN1c3RvbUV2ZW50KG5hbWUsIGZhbHNlLCBmYWxzZSwgZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXRWYWxpZGF0aW9uTWVzc2FnZShlcnJvcil7XHJcbiAgICAgICAgaWYoVXRpbHMuaXNTdHJpbmcoZXJyb3IpKXtcclxuICAgICAgICAgICAgZXJyb3IgPSB7bmFtZTogZXJyb3J9O1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIga2V5ID0gJ3ZhbGlkYXRpb24uJyArIGVycm9yLm5hbWU7XHJcbiAgICAgICAgcmV0dXJuIGkxOG4udChrZXksIGVycm9yLmRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBoaWRlKHNlbGVjdGlvbil7XHJcbiAgICAgICAgc2VsZWN0aW9uLmNsYXNzZWQoJ3NkLWhpZGRlbicsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBzaG93KHNlbGVjdGlvbiwgc2hvdz10cnVlKXtcclxuICAgICAgICBzZWxlY3Rpb24uY2xhc3NlZCgnc2QtaGlkZGVuJywgIXNob3cpO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgc3RhdGljIGlzSGlkZGVuKGVsLCBleGFjdCA9IHRydWUpIHtcclxuICAgICAgICBpZighZWwpe1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZXhhY3Qpe1xyXG4gICAgICAgICAgICB2YXIgc3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbCk7XHJcbiAgICAgICAgICAgIHJldHVybiAoc3R5bGUuZGlzcGxheSA9PT0gJ25vbmUnKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKGVsLm9mZnNldFBhcmVudCA9PT0gbnVsbClcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0SlNPTih1cmwsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHhoci5vcGVuKCdnZXQnLCB1cmwsIHRydWUpO1xyXG4gICAgICAgIHhoci5yZXNwb25zZVR5cGUgPSAnanNvbic7XHJcbiAgICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHN0YXR1cyA9IHhoci5zdGF0dXM7XHJcbiAgICAgICAgICAgIGlmIChzdGF0dXMgPT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayh4aHIucmVzcG9uc2UsIG51bGwpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgc3RhdHVzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgeGhyLnNlbmQoKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgKiBhcyBkMyBmcm9tICcuLi9kMydcclxuXHJcbi8qYmFzZWQgb246XHJcbiAqIGdpdGh1Yi5jb20vcGF0b3Jqay9kMy1jb250ZXh0LW1lbnUgKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBDb250ZXh0TWVudSB7XHJcbiAgICBvcGVuQ2FsbGJhY2s7XHJcbiAgICBjbG9zZUNhbGxiYWNrO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG1lbnUsIG9wdHMpIHtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0cyA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICBzZWxmLm9wZW5DYWxsYmFjayA9IG9wdHM7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgb3B0cyA9IG9wdHMgfHwge307XHJcbiAgICAgICAgICAgIHNlbGYub3BlbkNhbGxiYWNrID0gb3B0cy5vbk9wZW47XHJcbiAgICAgICAgICAgIHNlbGYuY2xvc2VDYWxsYmFjayA9IG9wdHMub25DbG9zZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgZGl2IGVsZW1lbnQgdGhhdCB3aWxsIGhvbGQgdGhlIGNvbnRleHQgbWVudVxyXG4gICAgICAgIGQzLnNlbGVjdEFsbCgnLmQzLWNvbnRleHQtbWVudScpLmRhdGEoWzFdKVxyXG4gICAgICAgICAgICAuZW50ZXIoKVxyXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxyXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZDMtY29udGV4dC1tZW51Jyk7XHJcblxyXG4gICAgICAgIC8vIGNsb3NlIG1lbnVcclxuICAgICAgICBkMy5zZWxlY3QoJ2JvZHknKS5vbignY2xpY2suZDMtY29udGV4dC1tZW51JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBkMy5zZWxlY3QoJy5kMy1jb250ZXh0LW1lbnUnKS5zdHlsZSgnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgICAgIGlmIChzZWxmLmNsb3NlQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuY2xvc2VDYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIHRoaXMgZ2V0cyBleGVjdXRlZCB3aGVuIGEgY29udGV4dG1lbnUgZXZlbnQgb2NjdXJzXHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChldmVudCwgZGF0YSkge1xyXG4gICAgICAgICAgICB2YXIgZWxtID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGQzLnNlbGVjdEFsbCgnLmQzLWNvbnRleHQtbWVudScpLmh0bWwoJycpO1xyXG4gICAgICAgICAgICB2YXIgbGlzdCA9IGQzLnNlbGVjdEFsbCgnLmQzLWNvbnRleHQtbWVudScpXHJcbiAgICAgICAgICAgICAgICAub24oJ2NvbnRleHRtZW51JywgZnVuY3Rpb24gKGV2ZW50LCBkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KCcuZDMtY29udGV4dC1tZW51Jykuc3R5bGUoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgndWwnKTtcclxuICAgICAgICAgICAgbGlzdC5zZWxlY3RBbGwoJ2xpJykuZGF0YSh0eXBlb2YgbWVudSA9PT0gJ2Z1bmN0aW9uJyA/IG1lbnUoZGF0YSkgOiBtZW51KS5lbnRlcigpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kKCdsaScpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCBmdW5jdGlvbiAoZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByZXQgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZC5kaXZpZGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldCArPSAnIGlzLWRpdmlkZXInO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZC5kaXNhYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXQgKz0gJyBpcy1kaXNhYmxlZCc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZC5hY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0ICs9ICcgaXMtaGVhZGVyJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJldDtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuaHRtbChmdW5jdGlvbiAoZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkLmRpdmlkZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8aHI+JztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFkLnRpdGxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ05vIHRpdGxlIGF0dHJpYnV0ZSBzZXQuIENoZWNrIHRoZSBzcGVsbGluZyBvZiB5b3VyIG9wdGlvbnMuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAodHlwZW9mIGQudGl0bGUgPT09ICdzdHJpbmcnKSA/IGQudGl0bGUgOiBkLnRpdGxlKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQsIGQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZC5kaXNhYmxlZCkgcmV0dXJuOyAvLyBkbyBub3RoaW5nIGlmIGRpc2FibGVkXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFkLmFjdGlvbikgcmV0dXJuOyAvLyBoZWFkZXJzIGhhdmUgbm8gXCJhY3Rpb25cIlxyXG4gICAgICAgICAgICAgICAgICAgIGQuYWN0aW9uKGVsbSwgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KCcuZDMtY29udGV4dC1tZW51Jykuc3R5bGUoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5jbG9zZUNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY2xvc2VDYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gdGhlIG9wZW5DYWxsYmFjayBhbGxvd3MgYW4gYWN0aW9uIHRvIGZpcmUgYmVmb3JlIHRoZSBtZW51IGlzIGRpc3BsYXllZFxyXG4gICAgICAgICAgICAvLyBhbiBleGFtcGxlIHVzYWdlIHdvdWxkIGJlIGNsb3NpbmcgYSB0b29sdGlwXHJcbiAgICAgICAgICAgIGlmIChzZWxmLm9wZW5DYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYub3BlbkNhbGxiYWNrKGV2ZW50LCBkYXRhKSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGRpc3BsYXkgY29udGV4dCBtZW51XHJcbiAgICAgICAgICAgIGQzLnNlbGVjdCgnLmQzLWNvbnRleHQtbWVudScpXHJcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2xlZnQnLCAoZXZlbnQucGFnZVggLSAyKSArICdweCcpXHJcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3RvcCcsIChldmVudC5wYWdlWSAtIDIpICsgJ3B4JylcclxuICAgICAgICAgICAgICAgIC5zdHlsZSgnZGlzcGxheScsICdibG9jaycpO1xyXG5cclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG4gICAgc3RhdGljIGhpZGUoKSB7XHJcbiAgICAgICAgZDMuc2VsZWN0KCcuZDMtY29udGV4dC1tZW51Jykuc3R5bGUoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQge0NvbnRleHRNZW51fSBmcm9tICcuL2NvbnRleHQtbWVudSdcclxuaW1wb3J0IHtpMThufSBmcm9tIFwiLi4vaTE4bi9pMThuXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRWRnZUNvbnRleHRNZW51IGV4dGVuZHMgQ29udGV4dE1lbnUge1xyXG4gICAgdHJlZURlc2lnbmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHRyZWVEZXNpZ25lcikge1xyXG4gICAgICAgIHZhciBtZW51ID0gZnVuY3Rpb24gKGQpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBtZW51ID0gW107XHJcblxyXG4gICAgICAgICAgICBtZW51LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUuZWRnZS5pbmplY3REZWNpc2lvbk5vZGUnKSxcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5pbmplY3REZWNpc2lvbk5vZGUoZClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG1lbnUucHVzaCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5lZGdlLmluamVjdENoYW5jZU5vZGUnKSxcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5pbmplY3RDaGFuY2VOb2RlKGQpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBtZW51O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHN1cGVyKG1lbnUpO1xyXG4gICAgICAgIHRoaXMudHJlZURlc2lnbmVyID0gdHJlZURlc2lnbmVyO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7Q29udGV4dE1lbnV9IGZyb20gJy4vY29udGV4dC1tZW51J1xyXG5pbXBvcnQge2RvbWFpbiBhcyBtb2RlbH0gZnJvbSAnc2QtbW9kZWwnXHJcbmltcG9ydCAqIGFzIGQzIGZyb20gJy4uL2QzJ1xyXG5pbXBvcnQge2kxOG59IGZyb20gXCIuLi9pMThuL2kxOG5cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBNYWluQ29udGV4dE1lbnUgZXh0ZW5kcyBDb250ZXh0TWVudSB7XHJcbiAgICB0cmVlRGVzaWduZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IodHJlZURlc2lnbmVyKSB7XHJcbiAgICAgICAgdmFyIG1vdXNlUG9zaXRpb24gPSBudWxsO1xyXG4gICAgICAgIHZhciBtZW51ID0gZnVuY3Rpb24gKGQpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBtZW51ID0gW107XHJcbiAgICAgICAgICAgIG1lbnUucHVzaCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5tYWluLmFkZERlY2lzaW9uTm9kZScpLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld05vZGUgPSBuZXcgbW9kZWwuRGVjaXNpb25Ob2RlKG1vdXNlUG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5hZGROb2RlKG5ld05vZGUpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBtZW51LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubWFpbi5hZGRDaGFuY2VOb2RlJyksXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3Tm9kZSA9IG5ldyBtb2RlbC5DaGFuY2VOb2RlKG1vdXNlUG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5hZGROb2RlKG5ld05vZGUpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBtZW51LnB1c2goe2RpdmlkZXI6IHRydWV9KTtcclxuICAgICAgICAgICAgbWVudS5wdXNoKHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm1haW4uYWRkVGV4dCcpLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld1RleHQgPSBuZXcgbW9kZWwuVGV4dChtb3VzZVBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuYWRkVGV4dChuZXdUZXh0KTtcclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbWVudS5wdXNoKHtkaXZpZGVyOiB0cnVlfSk7XHJcbiAgICAgICAgICAgIG1lbnUucHVzaCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5tYWluLnBhc3RlJyksXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIucGFzdGVUb05ld0xvY2F0aW9uKG1vdXNlUG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhdHJlZURlc2lnbmVyLmNvcGllZE5vZGVzIHx8ICF0cmVlRGVzaWduZXIuY29waWVkTm9kZXMubGVuZ3RoXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbWVudS5wdXNoKHtkaXZpZGVyOiB0cnVlfSk7XHJcblxyXG4gICAgICAgICAgICBtZW51LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubWFpbi5zZWxlY3RBbGxOb2RlcycpLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLnNlbGVjdEFsbE5vZGVzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gbWVudTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBzdXBlcihtZW51LCB7b25PcGVuOiAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgdHJlZURlc2lnbmVyLmNsZWFyU2VsZWN0aW9uKCk7XHJcbiAgICAgICAgICAgIG1vdXNlUG9zaXRpb24gPSBuZXcgbW9kZWwuUG9pbnQoZDMucG9pbnRlcihldmVudCwgdHJlZURlc2lnbmVyLnN2Zy5ub2RlKCkpKS5tb3ZlKHRyZWVEZXNpZ25lci5nZXRNYWluR3JvdXBUcmFuc2xhdGlvbih0cnVlKSk7XHJcblxyXG4gICAgICAgIH19KTtcclxuICAgICAgICB0aGlzLnRyZWVEZXNpZ25lciA9IHRyZWVEZXNpZ25lcjtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQge0NvbnRleHRNZW51fSBmcm9tICcuL2NvbnRleHQtbWVudSdcclxuaW1wb3J0IHtkb21haW4gYXMgbW9kZWx9IGZyb20gJ3NkLW1vZGVsJ1xyXG5pbXBvcnQge2kxOG59IGZyb20gXCIuLi9pMThuL2kxOG5cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBOb2RlQ29udGV4dE1lbnUgZXh0ZW5kcyBDb250ZXh0TWVudSB7XHJcbiAgICB0cmVlRGVzaWduZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IodHJlZURlc2lnbmVyLCBvcGVyYXRpb25zRm9yT2JqZWN0KSB7XHJcbiAgICAgICAgdmFyIG1lbnUgPSBmdW5jdGlvbiAoZCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIGNvcHlNZW51SXRlbSA9IHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm5vZGUuY29weScpLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLnNlbGVjdE5vZGUoZCwgIXRyZWVEZXNpZ25lci5pc05vZGVTZWxlY3RlZChkKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLmNvcHlTZWxlY3RlZE5vZGVzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHZhciBjdXRNZW51SXRlbSA9IHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm5vZGUuY3V0JyksXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuc2VsZWN0Tm9kZShkLCAhdHJlZURlc2lnbmVyLmlzTm9kZVNlbGVjdGVkKGQpKTtcclxuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuY3V0U2VsZWN0ZWROb2RlcygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB2YXIgcGFzdGVNZW51SXRlbSA9IHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm5vZGUucGFzdGUnKSxcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5wYXN0ZVRvTm9kZShkKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogZC5mb2xkZWQgfHwgIXRyZWVEZXNpZ25lci5jb3BpZWROb2RlcyB8fCAhdHJlZURlc2lnbmVyLmNvcGllZE5vZGVzLmxlbmd0aFxyXG5cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdmFyIGRlbGV0ZU1lbnVJdGVtID0ge1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubm9kZS5kZWxldGUnKSxcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuc2VsZWN0Tm9kZShkLCAhdHJlZURlc2lnbmVyLmlzTm9kZVNlbGVjdGVkKGQpKTtcclxuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIucmVtb3ZlU2VsZWN0ZWROb2RlcygpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciBtZW51ID0gW107XHJcbiAgICAgICAgICAgIGlmIChkLnR5cGUgPT0gbW9kZWwuVGVybWluYWxOb2RlLiRUWVBFKSB7XHJcbiAgICAgICAgICAgICAgICBtZW51ID0gW2NvcHlNZW51SXRlbSwgY3V0TWVudUl0ZW0sIGRlbGV0ZU1lbnVJdGVtXTtcclxuICAgICAgICAgICAgICAgIE5vZGVDb250ZXh0TWVudS5hZGROb2RlQ29udmVyc2lvbk9wdGlvbnMoZCwgbWVudSwgdHJlZURlc2lnbmVyKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBtZW51O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZighZC5mb2xkZWQpe1xyXG4gICAgICAgICAgICAgICAgbWVudS5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5ub2RlLmFkZERlY2lzaW9uTm9kZScpLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuYWRkRGVjaXNpb25Ob2RlKGQpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBtZW51LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm5vZGUuYWRkQ2hhbmNlTm9kZScpLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuYWRkQ2hhbmNlTm9kZShkKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgbWVudS5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5ub2RlLmFkZFRlcm1pbmFsTm9kZScpLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuYWRkVGVybWluYWxOb2RlKGQpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBtZW51LnB1c2goe2RpdmlkZXI6IHRydWV9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbWVudS5wdXNoKGNvcHlNZW51SXRlbSk7XHJcbiAgICAgICAgICAgIG1lbnUucHVzaChjdXRNZW51SXRlbSk7XHJcbiAgICAgICAgICAgIG1lbnUucHVzaChwYXN0ZU1lbnVJdGVtKTtcclxuICAgICAgICAgICAgbWVudS5wdXNoKGRlbGV0ZU1lbnVJdGVtKTtcclxuXHJcbiAgICAgICAgICAgIE5vZGVDb250ZXh0TWVudS5hZGROb2RlQ29udmVyc2lvbk9wdGlvbnMoZCwgbWVudSwgdHJlZURlc2lnbmVyKTtcclxuICAgICAgICAgICAgbWVudS5wdXNoKHtkaXZpZGVyOiB0cnVlfSk7XHJcbiAgICAgICAgICAgIG1lbnUucHVzaCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5ub2RlLnNlbGVjdFN1YnRyZWUnKSxcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5zZWxlY3RTdWJUcmVlKGQsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmKCFkLmZvbGRlZCl7XHJcbiAgICAgICAgICAgICAgICBtZW51LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm5vZGUuZm9sZCcpLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuZm9sZFN1YnRyZWUoZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgbWVudS5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5ub2RlLnVuZm9sZCcpLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuZm9sZFN1YnRyZWUoZCwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihvcGVyYXRpb25zRm9yT2JqZWN0KXtcclxuICAgICAgICAgICAgICAgIHZhciBvcGVyYXRpb25zID0gb3BlcmF0aW9uc0Zvck9iamVjdChkKTtcclxuICAgICAgICAgICAgICAgIGlmKG9wZXJhdGlvbnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVudS5wdXNoKHtkaXZpZGVyOiB0cnVlfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9ucy5mb3JFYWNoKG9wPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbnUucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5ub2RlLicrb3AubmFtZSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIucGVyZm9ybU9wZXJhdGlvbihkLCBvcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICFvcC5jYW5QZXJmb3JtKGQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBtZW51O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHN1cGVyKG1lbnUpO1xyXG4gICAgICAgIHRoaXMudHJlZURlc2lnbmVyID0gdHJlZURlc2lnbmVyO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBhZGROb2RlQ29udmVyc2lvbk9wdGlvbnMoZCwgbWVudSwgdHJlZURlc2lnbmVyKXtcclxuICAgICAgICB2YXIgY29udmVyc2lvbk9wdGlvbnMgPSBOb2RlQ29udGV4dE1lbnUuZ2V0Tm9kZUNvbnZlcnNpb25PcHRpb25zKGQsIHRyZWVEZXNpZ25lcik7XHJcbiAgICAgICAgaWYoY29udmVyc2lvbk9wdGlvbnMubGVuZ3RoKXtcclxuICAgICAgICAgICAgbWVudS5wdXNoKHtkaXZpZGVyOiB0cnVlfSk7XHJcbiAgICAgICAgICAgIGNvbnZlcnNpb25PcHRpb25zLmZvckVhY2gobz0+bWVudS5wdXNoKG8pKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXROb2RlQ29udmVyc2lvbk9wdGlvbnMoZCwgdHJlZURlc2lnbmVyKXtcclxuICAgICAgICB2YXIgb3B0aW9ucyA9IFtdO1xyXG5cclxuICAgICAgICBpZihkLmZvbGRlZCl7XHJcbiAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBhbGxBbGxvd2VkVHlwZXMgPSBbbW9kZWwuRGVjaXNpb25Ob2RlLiRUWVBFLCBtb2RlbC5DaGFuY2VOb2RlLiRUWVBFLCBtb2RlbC5UZXJtaW5hbE5vZGUuJFRZUEVdO1xyXG5cclxuICAgICAgICBpZighZC5jaGlsZEVkZ2VzLmxlbmd0aCAmJiBkLiRwYXJlbnQpe1xyXG4gICAgICAgICAgICBhbGxBbGxvd2VkVHlwZXMuZmlsdGVyKHQ9PnQhPT1kLnR5cGUpLmZvckVhY2godHlwZT0+e1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5wdXNoKE5vZGVDb250ZXh0TWVudS5nZXROb2RlQ29udmVyc2lvbk9wdGlvbih0eXBlLCB0cmVlRGVzaWduZXIpKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBpZihkIGluc3RhbmNlb2YgbW9kZWwuRGVjaXNpb25Ob2RlKXtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaChOb2RlQ29udGV4dE1lbnUuZ2V0Tm9kZUNvbnZlcnNpb25PcHRpb24obW9kZWwuQ2hhbmNlTm9kZS4kVFlQRSwgdHJlZURlc2lnbmVyKSlcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLnB1c2goTm9kZUNvbnRleHRNZW51LmdldE5vZGVDb252ZXJzaW9uT3B0aW9uKG1vZGVsLkRlY2lzaW9uTm9kZS4kVFlQRSwgdHJlZURlc2lnbmVyKSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb3B0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0Tm9kZUNvbnZlcnNpb25PcHRpb24odHlwZVRvQ29udmVydFRvLCB0cmVlRGVzaWduZXIpe1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm5vZGUuY29udmVydC4nK3R5cGVUb0NvbnZlcnRUbyksXHJcbiAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCkge1xyXG4gICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLmNvbnZlcnROb2RlKGQsIHR5cGVUb0NvbnZlcnRUbyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7Q29udGV4dE1lbnV9IGZyb20gJy4vY29udGV4dC1tZW51J1xyXG5pbXBvcnQge2kxOG59IGZyb20gXCIuLi9pMThuL2kxOG5cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBUZXh0Q29udGV4dE1lbnUgZXh0ZW5kcyBDb250ZXh0TWVudSB7XHJcbiAgICB0cmVlRGVzaWduZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IodHJlZURlc2lnbmVyKSB7XHJcbiAgICAgICAgdmFyIG1lbnUgPSBmdW5jdGlvbiAoZCkge1xyXG5cclxuXHJcbiAgICAgICAgICAgIHZhciBkZWxldGVNZW51SXRlbSA9IHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51LnRleHQuZGVsZXRlJyksXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLnNlbGVjdFRleHQoZCwgdHJ1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLnJlbW92ZVNlbGVjdGVkVGV4dHMoKVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdmFyIG1lbnUgPSBbXTtcclxuICAgICAgICAgICAgbWVudS5wdXNoKGRlbGV0ZU1lbnVJdGVtKTtcclxuICAgICAgICAgICAgcmV0dXJuIG1lbnU7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgc3VwZXIobWVudSk7XHJcbiAgICAgICAgdGhpcy50cmVlRGVzaWduZXIgPSB0cmVlRGVzaWduZXI7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgZDMgZnJvbSAnLi9kMydcclxuXHJcbmV4cG9ydCBjbGFzcyBEM0V4dGVuc2lvbnMge1xyXG5cclxuICAgIHN0YXRpYyBleHRlbmQoKSB7XHJcblxyXG4gICAgICAgIGQzLnNlbGVjdGlvbi5wcm90b3R5cGUuZW50ZXIucHJvdG90eXBlLmluc2VydFNlbGVjdG9yID1cclxuICAgICAgICAgICAgZDMuc2VsZWN0aW9uLnByb3RvdHlwZS5pbnNlcnRTZWxlY3RvciA9IGZ1bmN0aW9uIChzZWxlY3RvciwgYmVmb3JlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gRDNFeHRlbnNpb25zLmluc2VydFNlbGVjdG9yKHRoaXMsIHNlbGVjdG9yLCBiZWZvcmUpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgZDMuc2VsZWN0aW9uLnByb3RvdHlwZS5lbnRlci5wcm90b3R5cGUuYXBwZW5kU2VsZWN0b3IgPVxyXG4gICAgICAgICAgICBkMy5zZWxlY3Rpb24ucHJvdG90eXBlLmFwcGVuZFNlbGVjdG9yID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gRDNFeHRlbnNpb25zLmFwcGVuZFNlbGVjdG9yKHRoaXMsIHNlbGVjdG9yKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZDMuc2VsZWN0aW9uLnByb3RvdHlwZS5lbnRlci5wcm90b3R5cGUuc2VsZWN0T3JBcHBlbmQgPVxyXG4gICAgICAgICAgICBkMy5zZWxlY3Rpb24ucHJvdG90eXBlLnNlbGVjdE9yQXBwZW5kID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gRDNFeHRlbnNpb25zLnNlbGVjdE9yQXBwZW5kKHRoaXMsIHNlbGVjdG9yKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZDMuc2VsZWN0aW9uLnByb3RvdHlwZS5lbnRlci5wcm90b3R5cGUuc2VsZWN0T3JJbnNlcnQgPVxyXG4gICAgICAgICAgICBkMy5zZWxlY3Rpb24ucHJvdG90eXBlLnNlbGVjdE9ySW5zZXJ0ID0gZnVuY3Rpb24gKHNlbGVjdG9yLCBiZWZvcmUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBEM0V4dGVuc2lvbnMuc2VsZWN0T3JJbnNlcnQodGhpcywgc2VsZWN0b3IsIGJlZm9yZSk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgaW5zZXJ0T3JBcHBlbmRTZWxlY3RvcihwYXJlbnQsIHNlbGVjdG9yLCBvcGVyYXRpb24sIGJlZm9yZSkge1xyXG5cclxuICAgICAgICB2YXIgc2VsZWN0b3JQYXJ0cyA9IHNlbGVjdG9yLnNwbGl0KC8oW1xcLlxcI10pLyk7XHJcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBwYXJlbnRbb3BlcmF0aW9uXShzZWxlY3RvclBhcnRzLnNoaWZ0KCksIGJlZm9yZSk7Ly9cIjpmaXJzdC1jaGlsZFwiXHJcblxyXG4gICAgICAgIHdoaWxlIChzZWxlY3RvclBhcnRzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgdmFyIHNlbGVjdG9yTW9kaWZpZXIgPSBzZWxlY3RvclBhcnRzLnNoaWZ0KCk7XHJcbiAgICAgICAgICAgIHZhciBzZWxlY3Rvckl0ZW0gPSBzZWxlY3RvclBhcnRzLnNoaWZ0KCk7XHJcbiAgICAgICAgICAgIGlmIChzZWxlY3Rvck1vZGlmaWVyID09PSBcIi5cIikge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQuY2xhc3NlZChzZWxlY3Rvckl0ZW0sIHRydWUpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNlbGVjdG9yTW9kaWZpZXIgPT09IFwiI1wiKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5hdHRyKCdpZCcsIHNlbGVjdG9ySXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGluc2VydFNlbGVjdG9yKHBhcmVudCwgc2VsZWN0b3IsIGJlZm9yZSkge1xyXG4gICAgICAgIHJldHVybiBEM0V4dGVuc2lvbnMuaW5zZXJ0T3JBcHBlbmRTZWxlY3RvcihwYXJlbnQsIHNlbGVjdG9yLCBcImluc2VydFwiLCBiZWZvcmUpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBhcHBlbmRTZWxlY3RvcihwYXJlbnQsIHNlbGVjdG9yKSB7XHJcbiAgICAgICAgcmV0dXJuIEQzRXh0ZW5zaW9ucy5pbnNlcnRPckFwcGVuZFNlbGVjdG9yKHBhcmVudCwgc2VsZWN0b3IsIFwiYXBwZW5kXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBzZWxlY3RPckFwcGVuZChwYXJlbnQsIHNlbGVjdG9yLCBlbGVtZW50KSB7XHJcbiAgICAgICAgdmFyIHNlbGVjdGlvbiA9IHBhcmVudC5zZWxlY3Qoc2VsZWN0b3IpO1xyXG4gICAgICAgIGlmIChzZWxlY3Rpb24uZW1wdHkoKSkge1xyXG4gICAgICAgICAgICBpZiAoZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcmVudC5hcHBlbmQoZWxlbWVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIEQzRXh0ZW5zaW9ucy5hcHBlbmRTZWxlY3RvcihwYXJlbnQsIHNlbGVjdG9yKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZWxlY3Rpb247XHJcbiAgICB9O1xyXG5cclxuICAgIHN0YXRpYyBzZWxlY3RPckluc2VydChwYXJlbnQsIHNlbGVjdG9yLCBiZWZvcmUpIHtcclxuICAgICAgICB2YXIgc2VsZWN0aW9uID0gcGFyZW50LnNlbGVjdChzZWxlY3Rvcik7XHJcbiAgICAgICAgaWYgKHNlbGVjdGlvbi5lbXB0eSgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBEM0V4dGVuc2lvbnMuaW5zZXJ0U2VsZWN0b3IocGFyZW50LCBzZWxlY3RvciwgYmVmb3JlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNlbGVjdGlvbjtcclxuICAgIH07XHJcbn1cclxuIiwiZXhwb3J0ICogZnJvbSAnZDMtZGlzcGF0Y2gnO1xyXG5leHBvcnQgKiBmcm9tICdkMy1zY2FsZSc7XHJcbmV4cG9ydCAqIGZyb20gJ2QzLXNlbGVjdGlvbic7XHJcbmV4cG9ydCAqIGZyb20gJ2QzLXNoYXBlJ1xyXG5leHBvcnQgKiBmcm9tICdkMy1kcmFnJztcclxuZXhwb3J0ICogZnJvbSAnZDMtYnJ1c2gnXHJcbmV4cG9ydCAqIGZyb20gJ2QzLWFycmF5J1xyXG5leHBvcnQgKiBmcm9tICdkMy1oaWVyYXJjaHknXHJcbmV4cG9ydCAqIGZyb20gJ2QzLXRpbWUtZm9ybWF0J1xyXG4iLCJtb2R1bGUuZXhwb3J0cz17XHJcbiAgICBcImNvbnRleHRNZW51XCI6e1xyXG4gICAgICAgIFwibWFpblwiOntcclxuICAgICAgICAgICAgXCJhZGREZWNpc2lvbk5vZGVcIjogXCJFbnRzY2hlaWR1bmdza25vdGVuIGhpbnp1ZsO8Z2VuXCIsXHJcbiAgICAgICAgICAgIFwiYWRkQ2hhbmNlTm9kZVwiOiBcIlp1ZmFsbCBLbm90ZW4gaGluenVmw7xnZW5cIixcclxuICAgICAgICAgICAgXCJhZGRUZXh0XCI6IFwiVGV4dCBoaW56dWbDvGdlbiBcIixcclxuICAgICAgICAgICAgXCJwYXN0ZVwiOiBcIkVpbmbDvGdlblwiLFxyXG4gICAgICAgICAgICBcInNlbGVjdEFsbE5vZGVzXCI6IFwiQWxsZSBLbm90ZW4gYXVzd8OkaGxlblwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIm5vZGVcIjp7XHJcbiAgICAgICAgICAgIFwiY29weVwiOiBcIktvcGllcmVuXCIsXHJcbiAgICAgICAgICAgIFwiY3V0XCI6IFwiQXVzc2NobmVpZGVuXCIsXHJcbiAgICAgICAgICAgIFwicGFzdGVcIjogXCJFaW5mw7xnZW5cIixcclxuICAgICAgICAgICAgXCJkZWxldGVcIjogXCJMw7ZzY2hlblwiLFxyXG4gICAgICAgICAgICBcImFkZERlY2lzaW9uTm9kZVwiOiBcIkVudHNjaGVpZHVuZ3Nrbm90ZW4gaGluenVmw7xnZW5cIixcclxuICAgICAgICAgICAgXCJhZGRDaGFuY2VOb2RlXCI6IFwiWnVmYWxsIEtub3RlbiBoaW56dWbDvGdlblwiLFxyXG4gICAgICAgICAgICBcImFkZFRlcm1pbmFsTm9kZVwiOiBcIkVuZGtub3R0ZW4gaGluenVmw7xnZW5cIixcclxuICAgICAgICAgICAgXCJjb252ZXJ0XCI6e1xyXG4gICAgICAgICAgICAgICAgXCJkZWNpc2lvblwiOiBcIkFscyBFbnRzY2hlaWR1bmdza25vdGVuXCIsXHJcbiAgICAgICAgICAgICAgICBcImNoYW5jZVwiOiBcIkFscyBadWZhbGwgS25vdGVuXCIsXHJcbiAgICAgICAgICAgICAgICBcInRlcm1pbmFsXCI6IFwiQWxzIEVuZGtub3RlblwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwic2VsZWN0U3VidHJlZVwiOiBcIlRlaWxiYXVtIHfDpGhsZW5cIixcclxuICAgICAgICAgICAgXCJmb2xkXCI6IFwiVGVpbGJhdW0gZmFsdGVuXCIsXHJcbiAgICAgICAgICAgIFwidW5mb2xkXCI6IFwiVGVpbGJhdW0gZW50ZmFsdGVuXCIsXHJcblxyXG4gICAgICAgICAgICBcImZsaXBTdWJ0cmVlXCI6IFwiVGVpbGJhdW0gdW1kcmVoZW5cIixcclxuICAgICAgICAgICAgXCJwYXlvZmZzVHJhbnNmb3JtYXRpb25cIjogXCJBdXN6YWhsdW5nZW4gdHJhbnNmb3JtaWVyZW5cIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJlZGdlXCI6e1xyXG4gICAgICAgICAgICBcImluamVjdERlY2lzaW9uTm9kZVwiOiBcIkVudHNjaGVpZHVuZ3Nrbm90ZW4gSW5qaXppZXJlblwiLFxyXG4gICAgICAgICAgICBcImluamVjdENoYW5jZU5vZGVcIjogXCJadWZhbGwgS25vdGVuIEluaml6aWVyZW5cIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJ0ZXh0XCI6e1xyXG4gICAgICAgICAgICBcImRlbGV0ZVwiOiBcIkzDtnNjaGVuXCJcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJ2YWxpZGF0aW9uXCI6e1xyXG4gICAgICAgIFwiaW5jb21wbGV0ZVBhdGhcIjogXCJQZmFkLCBkZXIgbmljaHQgbWl0IGRlbSBFbmRrbm90ZW4gZW5kZXRcIixcclxuICAgICAgICBcInByb2JhYmlsaXR5RG9Ob3RTdW1VcFRvMVwiOiBcIkRpZSBTdW1tZSBkZXIgV2FocnNjaGVpbmxpY2hrZWl0ZW4gaXN0IG5pY2h0IGdsZWljaCAxXCIsXHJcbiAgICAgICAgXCJpbnZhbGlkUHJvYmFiaWxpdHlcIjogXCJVbmfDvGx0aWdlIFdhaHJzY2hlaW5saWNoa2VpdCBpbSBad2VpZyAje3tudW1iZXJ9fVwiLFxyXG4gICAgICAgIFwiaW52YWxpZFBheW9mZlwiOiBcIlVuZ8O8bHRpZ2UgQXVzemFobHVuZyBpbiBad2VpZyAje3tudW1iZXJ9fVwiXHJcbiAgICB9LFxyXG4gICAgXCJncm93bFwiOntcclxuICAgICAgICBcImJydXNoRGlzYWJsZWRcIjogXCJBdXN3YWhsYsO8cnN0ZSBkZWFrdGl2aWVydFwiLFxyXG4gICAgICAgIFwiYnJ1c2hFbmFibGVkXCI6IFwiQXVzd2FobGLDvHJzdGUgYWt0aXZpZXJ0XCJcclxuICAgIH0sXHJcbiAgICBcInRvb2x0aXBcIjp7XHJcbiAgICAgICAgXCJub2RlXCI6e1xyXG4gICAgICAgICAgICBcInBheW9mZlwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJBdXN6YWhsdW5nIHt7bnVtYmVyfX1cIixcclxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJ7e25hbWV9fVwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiYWdncmVnYXRlZFBheW9mZlwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJBZ2dyZWdpZXJ0ZSBBdXN6YWhsdW5nIHt7bnVtYmVyfX1cIixcclxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJBZ2dyZWdpZXJ0ZSB7e25hbWV9fVwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicHJvYmFiaWxpdHlUb0VudGVyXCI6IFwiV2FocnNjaGVpbmxpY2hrZWl0XCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiZWRnZVwiOntcclxuICAgICAgICAgICAgXCJwYXlvZmZcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiQXVzemFobHVuZyB7e251bWJlcn19OiB7e3ZhbHVlfX1cIixcclxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJ7e25hbWV9fToge3t2YWx1ZX19XCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwcm9iYWJpbGl0eVwiOiBcIldhaHJzY2hlaW5saWNoa2VpdDoge3t2YWx1ZX19XCJcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwibW9kdWxlLmV4cG9ydHM9e1xyXG4gICAgXCJjb250ZXh0TWVudVwiOntcclxuICAgICAgICBcIm1haW5cIjp7XHJcbiAgICAgICAgICAgIFwiYWRkRGVjaXNpb25Ob2RlXCI6IFwiQWRkIERlY2lzaW9uIE5vZGVcIixcclxuICAgICAgICAgICAgXCJhZGRDaGFuY2VOb2RlXCI6IFwiQWRkIENoYW5jZSBOb2RlXCIsXHJcbiAgICAgICAgICAgIFwiYWRkVGV4dFwiOiBcIkFkZCBUZXh0XCIsXHJcbiAgICAgICAgICAgIFwicGFzdGVcIjogXCJQYXN0ZVwiLFxyXG4gICAgICAgICAgICBcInNlbGVjdEFsbE5vZGVzXCI6IFwiU2VsZWN0IGFsbCBub2Rlc1wiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIm5vZGVcIjp7XHJcbiAgICAgICAgICAgIFwiY29weVwiOiBcIkNvcHlcIixcclxuICAgICAgICAgICAgXCJjdXRcIjogXCJDdXRcIixcclxuICAgICAgICAgICAgXCJwYXN0ZVwiOiBcIlBhc3RlXCIsXHJcbiAgICAgICAgICAgIFwiZGVsZXRlXCI6IFwiRGVsZXRlXCIsXHJcbiAgICAgICAgICAgIFwiYWRkRGVjaXNpb25Ob2RlXCI6IFwiQWRkIERlY2lzaW9uIE5vZGVcIixcclxuICAgICAgICAgICAgXCJhZGRDaGFuY2VOb2RlXCI6IFwiQWRkIENoYW5jZSBOb2RlXCIsXHJcbiAgICAgICAgICAgIFwiYWRkVGVybWluYWxOb2RlXCI6IFwiQWRkIFRlcm1pbmFsIE5vZGVcIixcclxuICAgICAgICAgICAgXCJjb252ZXJ0XCI6e1xyXG4gICAgICAgICAgICAgICAgXCJkZWNpc2lvblwiOiBcIkFzIERlY2lzaW9uIE5vZGVcIixcclxuICAgICAgICAgICAgICAgIFwiY2hhbmNlXCI6IFwiQXMgQ2hhbmNlIE5vZGVcIixcclxuICAgICAgICAgICAgICAgIFwidGVybWluYWxcIjogXCJBcyBUZXJtaW5hbCBOb2RlXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJzZWxlY3RTdWJ0cmVlXCI6IFwiU2VsZWN0IHN1YnRyZWVcIixcclxuICAgICAgICAgICAgXCJmb2xkXCI6IFwiRm9sZCBzdWJ0cmVlXCIsXHJcbiAgICAgICAgICAgIFwidW5mb2xkXCI6IFwiVW5mb2xkIHN1YnRyZWVcIixcclxuICAgICAgICAgICAgXCJmbGlwU3VidHJlZVwiOiBcIkZsaXAgc3VidHJlZVwiLFxyXG4gICAgICAgICAgICBcInBheW9mZnNUcmFuc2Zvcm1hdGlvblwiOiBcIlRyYW5zZm9ybSBwYXlvZmZzXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiZWRnZVwiOntcclxuICAgICAgICAgICAgXCJpbmplY3REZWNpc2lvbk5vZGVcIjogXCJJbmplY3QgRGVjaXNpb24gTm9kZVwiLFxyXG4gICAgICAgICAgICBcImluamVjdENoYW5jZU5vZGVcIjogXCJJbmplY3QgQ2hhbmNlIE5vZGVcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJ0ZXh0XCI6e1xyXG4gICAgICAgICAgICBcImRlbGV0ZVwiOiBcIkRlbGV0ZVwiXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwidmFsaWRhdGlvblwiOntcclxuICAgICAgICBcImluY29tcGxldGVQYXRoXCI6IFwiUGF0aCBub3QgZW5kaW5nIHdpdGggdGVybWluYWwgbm9kZVwiLFxyXG4gICAgICAgIFwicHJvYmFiaWxpdHlEb05vdFN1bVVwVG8xXCI6IFwiUHJvYmFiaWxpdGllcyBkbyBub3Qgc3VtIHVwIHRvIDFcIixcclxuICAgICAgICBcImludmFsaWRQcm9iYWJpbGl0eVwiOiBcIkludmFsaWQgcHJvYmFiaWxpdHkgaW4gZWRnZSAje3tudW1iZXJ9fVwiLFxyXG4gICAgICAgIFwiaW52YWxpZFBheW9mZlwiOiBcIkludmFsaWQgcGF5b2ZmIGluIGVkZ2UgI3t7bnVtYmVyfX1cIlxyXG4gICAgfSxcclxuICAgIFwiZ3Jvd2xcIjp7XHJcbiAgICAgICAgXCJicnVzaERpc2FibGVkXCI6IFwiU2VsZWN0aW9uIGJydXNoIGRpc2FibGVkXCIsXHJcbiAgICAgICAgXCJicnVzaEVuYWJsZWRcIjogXCJTZWxlY3Rpb24gYnJ1c2ggZW5hYmxlZFwiXHJcbiAgICB9LFxyXG4gICAgXCJ0b29sdGlwXCI6e1xyXG4gICAgICAgIFwibm9kZVwiOntcclxuICAgICAgICAgICAgXCJwYXlvZmZcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiUGF5b2ZmIHt7bnVtYmVyfX1cIixcclxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJ7e25hbWV9fVwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiYWdncmVnYXRlZFBheW9mZlwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJBZ2dyZWdhdGVkIFBheW9mZiB7e251bWJlcn19XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwiQWdncmVnYXRlZCB7e25hbWV9fVwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicHJvYmFiaWxpdHlUb0VudGVyXCI6IFwiUHJvYmFiaWxpdHkgdG8gZW50ZXJcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJlZGdlXCI6e1xyXG4gICAgICAgICAgICBcInBheW9mZlwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJQYXlvZmYge3tudW1iZXJ9fToge3t2YWx1ZX19XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwie3tuYW1lfX06IHt7dmFsdWV9fVwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicHJvYmFiaWxpdHlcIjogXCJQcm9iYWJpbGl0eToge3t2YWx1ZX19XCJcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwibW9kdWxlLmV4cG9ydHM9e1xyXG4gICAgXCJjb250ZXh0TWVudVwiOntcclxuICAgICAgICBcIm1haW5cIjp7XHJcbiAgICAgICAgICAgIFwiYWRkRGVjaXNpb25Ob2RlXCI6IFwiQWpvdXRlciBub3VkIGRlIGTDqWNpc2lvblwiLFxyXG4gICAgICAgICAgICBcImFkZENoYW5jZU5vZGVcIjogXCJBam91dGVyIG5vdWQgYWzDqWF0b2lyZVwiLFxyXG4gICAgICAgICAgICBcImFkZFRleHRcIjogXCJBam91dGVyIGR1IHRleHRlXCIsXHJcbiAgICAgICAgICAgIFwicGFzdGVcIjogXCJDb2xsZXJcIixcclxuICAgICAgICAgICAgXCJzZWxlY3RBbGxOb2Rlc1wiOiBcIlPDqWxlY3Rpb25uZXIgdG91cyBsZXMgbm91ZHNcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJub2RlXCI6e1xyXG4gICAgICAgICAgICBcImNvcHlcIjogXCJDb3BpZVwiLFxyXG4gICAgICAgICAgICBcImN1dFwiOiBcIkNvdXBlclwiLFxyXG4gICAgICAgICAgICBcInBhc3RlXCI6IFwiQ29sbGVyXCIsXHJcbiAgICAgICAgICAgIFwiZGVsZXRlXCI6IFwiRWZmYWNlclwiLFxyXG4gICAgICAgICAgICBcImFkZERlY2lzaW9uTm9kZVwiOiBcIkFqb3V0ZXIgbm91ZCBkZSBkw6ljaXNpb25cIixcclxuICAgICAgICAgICAgXCJhZGRDaGFuY2VOb2RlXCI6IFwiQWpvdXRlciBub3VkIGFsw6lhdG9pcmVcIixcclxuICAgICAgICAgICAgXCJhZGRUZXJtaW5hbE5vZGVcIjogXCJBam91dGVyIHVuIG5vZXVkIHRlcm1pbmFsXCIsXHJcbiAgICAgICAgICAgIFwiY29udmVydFwiOntcclxuICAgICAgICAgICAgICAgIFwiZGVjaXNpb25cIjogXCJDb21tZSBub3VkIGRlIGTDqWNpc2lvblwiLFxyXG4gICAgICAgICAgICAgICAgXCJjaGFuY2VcIjogXCJDb21tZSBub3VkIGFsw6lhdG9pcmVcIixcclxuICAgICAgICAgICAgICAgIFwidGVybWluYWxcIjogXCJDb21tZSB1biBub2V1ZCB0ZXJtaW5hbFwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwic2VsZWN0U3VidHJlZVwiOiBcIlPDqWxlY3Rpb25uZXIgdW5lIHNvdXMtYXJib3Jlc2NlbmNlXCIsXHJcbiAgICAgICAgICAgIFwiZm9sZFwiOiBcIlBsaWVyIHNvdXMtYXJicmVcIixcclxuICAgICAgICAgICAgXCJ1bmZvbGRcIjogXCJEw6lwbGllciBhcmJyZSBzb3VzLWFyYnJlXCIsXHJcbiAgICAgICAgICAgIFwiZmxpcFN1YnRyZWVcIjogXCJCYXNjdWxlciBzb3VzLWFyYnJlXCIsXHJcbiAgICAgICAgICAgIFwicGF5b2Zmc1RyYW5zZm9ybWF0aW9uXCI6IFwiVHJhbnNmb3JtZXogbGVzIGdhaW5zXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiZWRnZVwiOntcclxuICAgICAgICAgICAgXCJpbmplY3REZWNpc2lvbk5vZGVcIjogXCJJbmplY3RlciB1biBub2V1ZCBkZSBkw6ljaXNpb25cIixcclxuICAgICAgICAgICAgXCJpbmplY3RDaGFuY2VOb2RlXCI6IFwiSW5qZWN0ZXIgdW4gbm9ldWQgZGUgY2hhbmNlXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwidGV4dFwiOntcclxuICAgICAgICAgICAgXCJkZWxldGVcIjogXCJFZmZhY2VyXCJcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJ2YWxpZGF0aW9uXCI6e1xyXG4gICAgICAgIFwiaW5jb21wbGV0ZVBhdGhcIjogXCJQYXJjb3VycyBub24gdGVybWluw6kgcGFyIG5vZXVkIHRlcm1pbmFsXCIsXHJcbiAgICAgICAgXCJwcm9iYWJpbGl0eURvTm90U3VtVXBUbzFcIjogXCJMYSBzb21tZSBkZXMgcHJvYmFiaWxpdMOpcyBuJ2VzdCBwYXMgMSBvdSBwbHVzXCIsXHJcbiAgICAgICAgXCJpbnZhbGlkUHJvYmFiaWxpdHlcIjogXCJQcm9iYWJpbGl0w6kgaW52YWxpZGUgLSBsZSBib3JkICN7e251bWJlcn19XCIsXHJcbiAgICAgICAgXCJpbnZhbGlkUGF5b2ZmXCI6IFwiQXZhbnRhZ2UgaW52YWxpZGUgLSBsZSBib3JkICN7e251bWJlcn19XCJcclxuICAgIH0sXHJcbiAgICBcImdyb3dsXCI6e1xyXG4gICAgICAgIFwiYnJ1c2hEaXNhYmxlZFwiOiBcIkJyb3NzZSBkZSBzw6lsZWN0aW9uIGTDqXNhY3RpdsOpZVwiLFxyXG4gICAgICAgIFwiYnJ1c2hFbmFibGVkXCI6IFwiQnJvc3NlIGRlIHPDqWxlY3Rpb24gYWN0aXbDqWVcIlxyXG4gICAgfSxcclxuICAgIFwidG9vbHRpcFwiOntcclxuICAgICAgICBcIm5vZGVcIjp7XHJcbiAgICAgICAgICAgIFwicGF5b2ZmXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIkF2YW50YWdlIHt7bnVtYmVyfX1cIixcclxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJ7e25hbWV9fVwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiYWdncmVnYXRlZFBheW9mZlwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJBdmFudGFnZSBhZ3LDqWfDqSB7e251bWJlcn19XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwiQWdyw6lnw6kgIHt7bmFtZX19XCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwcm9iYWJpbGl0eVRvRW50ZXJcIjogXCJQcm9iYWJpbGl0w6kgZCdlbnRyw6llXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiZWRnZVwiOntcclxuICAgICAgICAgICAgXCJwYXlvZmZcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiQXZhbnRhZ2Uge3tudW1iZXJ9fToge3t2YWx1ZX19XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwie3tuYW1lfX06IHt7dmFsdWV9fVwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicHJvYmFiaWxpdHlcIjogXCJQcm9iYWJpbGl0w6k6IHt7dmFsdWV9fVwiXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBpMThuZXh0IGZyb20gJ2kxOG5leHQnO1xyXG5pbXBvcnQgKiBhcyBlbiBmcm9tICcuL2VuLmpzb24nXHJcbmltcG9ydCAqIGFzIHBsIGZyb20gJy4vcGwuanNvbidcclxuaW1wb3J0ICogYXMgaXQgZnJvbSAnLi9pdC5qc29uJ1xyXG5pbXBvcnQgKiBhcyBkZSBmcm9tICcuL2RlLmpzb24nXHJcbmltcG9ydCAqIGFzIGZyIGZyb20gJy4vZnIuanNvbidcclxuXHJcbmV4cG9ydCBjbGFzcyBpMThue1xyXG5cclxuICAgIHN0YXRpYyAkaW5zdGFuY2U7XHJcbiAgICBzdGF0aWMgbGFuZ3VhZ2U7XHJcblxyXG4gICAgc3RhdGljIGluaXQobG5nKXtcclxuICAgICAgICBpMThuLmxhbmd1YWdlID0gbG5nO1xyXG4gICAgICAgIGxldCByZXNvdXJjZXMgPSB7XHJcbiAgICAgICAgICAgIGVuOiB7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGlvbjogZW5cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcGw6IHtcclxuICAgICAgICAgICAgICAgIHRyYW5zbGF0aW9uOiBwbFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBpdDoge1xyXG4gICAgICAgICAgICAgICAgdHJhbnNsYXRpb246IGl0XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRlOiB7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGlvbjogZGVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZnI6IHtcclxuICAgICAgICAgICAgICAgIHRyYW5zbGF0aW9uOiBmclxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBpMThuLiRpbnN0YW5jZSA9IGkxOG5leHQuY3JlYXRlSW5zdGFuY2Uoe1xyXG4gICAgICAgICAgICBsbmc6IGxuZyxcclxuICAgICAgICAgICAgZmFsbGJhY2tMbmc6ICdlbicsXHJcbiAgICAgICAgICAgIHJlc291cmNlczogcmVzb3VyY2VzXHJcbiAgICAgICAgfSwgKGVyciwgdCkgPT4ge1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyB0KGtleSwgb3B0KXtcclxuICAgICAgICByZXR1cm4gaTE4bi4kaW5zdGFuY2UudChrZXksIG9wdClcclxuICAgIH1cclxufVxyXG4iLCJtb2R1bGUuZXhwb3J0cz17XHJcbiAgICBcImNvbnRleHRNZW51XCI6e1xyXG4gICAgICAgIFwibWFpblwiOntcclxuICAgICAgICAgICAgXCJhZGREZWNpc2lvbk5vZGVcIjogXCJBZ2dpdW5naSB1biBub2RvIGRpIGRlY2lzaW9uZVwiLFxyXG4gICAgICAgICAgICBcImFkZENoYW5jZU5vZGVcIjogXCJBZ2dpdW5naSB1biBub2RvIG9wcG9ydHVuaXTDoFwiLFxyXG4gICAgICAgICAgICBcImFkZFRleHRcIjogXCJBZ2dpdW5naSB0ZXN0b1wiLFxyXG4gICAgICAgICAgICBcInBhc3RlXCI6IFwiSW5jb2xsYVwiLFxyXG4gICAgICAgICAgICBcInNlbGVjdEFsbE5vZGVzXCI6IFwiU2VsZXppb25hIHR1dHRpIGkgbm9kaVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIm5vZGVcIjp7XHJcbiAgICAgICAgICAgIFwiY29weVwiOiBcIkNvcGlhXCIsXHJcbiAgICAgICAgICAgIFwiY3V0XCI6IFwiVGFnbGlhXCIsXHJcbiAgICAgICAgICAgIFwicGFzdGVcIjogXCJJbmNvbGxhXCIsXHJcbiAgICAgICAgICAgIFwiZGVsZXRlXCI6IFwiQ2FuY2VsbGFcIixcclxuICAgICAgICAgICAgXCJhZGREZWNpc2lvbk5vZGVcIjogXCJBZ2dpdW5naSB1biBub2RvIGRpIGRlY2lzaW9uZVwiLFxyXG4gICAgICAgICAgICBcImFkZENoYW5jZU5vZGVcIjogXCJBZ2dpdW5naSB1biBub2RvIG9wcG9ydHVuaXTDoFwiLFxyXG4gICAgICAgICAgICBcImFkZFRlcm1pbmFsTm9kZVwiOiBcIkFnZ2l1bmdpIHVuIG5vZG8gdGVybWluYWxlXCIsXHJcbiAgICAgICAgICAgIFwiY29udmVydFwiOntcclxuICAgICAgICAgICAgICAgIFwiZGVjaXNpb25cIjogXCJDb21lIERlY2lzaW9uIE5vZGVcIixcclxuICAgICAgICAgICAgICAgIFwiY2hhbmNlXCI6IFwiQ29tZSBDaGFuY2UgTm9kZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0ZXJtaW5hbFwiOiBcIkNvbWUgVGVybWluYWwgTm9kZVwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwic2VsZWN0U3VidHJlZVwiOiBcIlNlbGV6aW9uYSBTb3R0by1hbGJlcm9cIixcclxuICAgICAgICAgICAgXCJmb2xkXCI6IFwiUGllZ2Egc290dG8tYWxiZXJvXCIsXHJcbiAgICAgICAgICAgIFwidW5mb2xkXCI6IFwiRGlzcGllZ2Fyc2kgc290dG8tYWxiZXJvXCIsXHJcbiAgICAgICAgICAgIFwiZmxpcFN1YnRyZWVcIjogXCJSaWJhbHRhIHNvdHRvLWFsYmVyb1wiLFxyXG4gICAgICAgICAgICBcInBheW9mZnNUcmFuc2Zvcm1hdGlvblwiOiBcIlRyYXNmb3JtYSBpIHByb2ZpdHRpXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiZWRnZVwiOntcclxuICAgICAgICAgICAgXCJpbmplY3REZWNpc2lvbk5vZGVcIjogXCJJbmlldHRhIG5vZG8gZGkgZGVjaXNpb25lXCIsXHJcbiAgICAgICAgICAgIFwiaW5qZWN0Q2hhbmNlTm9kZVwiOiBcIkluaWV0dGEgbm9kbyBvcHBvcnR1bml0w6BcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJ0ZXh0XCI6e1xyXG4gICAgICAgICAgICBcImRlbGV0ZVwiOiBcIkNhbmNlbGxhXCJcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJ2YWxpZGF0aW9uXCI6e1xyXG4gICAgICAgIFwiaW5jb21wbGV0ZVBhdGhcIjogXCJQZXJjb3JzbyBzZW56YSBub2RvIHRlcm1pbmFsZVwiLFxyXG4gICAgICAgIFwicHJvYmFiaWxpdHlEb05vdFN1bVVwVG8xXCI6IFwiTGEgc29tbWEgZGVsbGUgcHJvYmFiaWxpdMOgIMOoIGRpdmVyc2EgZGEgMVwiLFxyXG4gICAgICAgIFwiaW52YWxpZFByb2JhYmlsaXR5XCI6IFwiUHJvYmFiaWxpdMOgIG5vbiB2YWxpZGEgLSBib3JkbyAje3tudW1iZXJ9fVwiLFxyXG4gICAgICAgIFwiaW52YWxpZFBheW9mZlwiOiBcIlNhbGRvIG5vbiB2YWxpZG8gLSBib3JkbyAje3tudW1iZXJ9fVwiXHJcbiAgICB9LFxyXG4gICAgXCJncm93bFwiOntcclxuICAgICAgICBcImJydXNoRGlzYWJsZWRcIjogXCJTZWxlemlvbmUgcGVubmVsbG8gZGlzYWJpbGl0YXRhXCIsXHJcbiAgICAgICAgXCJicnVzaEVuYWJsZWRcIjogXCJTZWxlemlvbmUgcGVubmVsbG8gYWJpbGl0YXRhXCJcclxuICAgIH0sXHJcbiAgICBcInRvb2x0aXBcIjp7XHJcbiAgICAgICAgXCJub2RlXCI6e1xyXG4gICAgICAgICAgICBcInBheW9mZlwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJTYWxkbyB7e251bWJlcn19XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwie3tuYW1lfX1cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImFnZ3JlZ2F0ZWRQYXlvZmZcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiU2FsZG8gYWdncmVnYXRvIHt7bnVtYmVyfX1cIixcclxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJBZ2dyZWdhdG8ge3tuYW1lfX1cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInByb2JhYmlsaXR5VG9FbnRlclwiOiBcIlByb2JhYmlsaXTDoCBkYSBpbnNlcmlyZVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImVkZ2VcIjp7XHJcbiAgICAgICAgICAgIFwicGF5b2ZmXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIlNhbGRvIHt7bnVtYmVyfX06IHt7dmFsdWV9fVwiLFxyXG4gICAgICAgICAgICAgICAgXCJuYW1lZFwiOiBcInt7bmFtZX19OiB7e3ZhbHVlfX1cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInByb2JhYmlsaXR5XCI6IFwiUHJvYmFiaWxpdMOgOiB7e3ZhbHVlfX1cIlxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJtb2R1bGUuZXhwb3J0cz17XHJcblxyXG4gICAgXCJjb250ZXh0TWVudVwiOntcclxuICAgICAgICBcIm1haW5cIjp7XHJcbiAgICAgICAgICAgIFwiYWRkRGVjaXNpb25Ob2RlXCI6IFwiRG9kYWogV8SZemXFgiBEZWN5enlqbnlcIixcclxuICAgICAgICAgICAgXCJhZGRDaGFuY2VOb2RlXCI6IFwiRG9kYWogV8SZemXFgiBMb3Nvd3lcIixcclxuICAgICAgICAgICAgXCJhZGRUZXh0XCI6IFwiRG9kYWogVGVrc3RcIixcclxuICAgICAgICAgICAgXCJwYXN0ZVwiOiBcIldrbGVqXCIsXHJcbiAgICAgICAgICAgIFwic2VsZWN0QWxsTm9kZXNcIjogXCJaYXpuYWN6IHdzenlzdGtpZSB3xJl6xYJ5XCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwibm9kZVwiOntcclxuICAgICAgICAgICAgXCJjb3B5XCI6IFwiS29waXVqXCIsXHJcbiAgICAgICAgICAgIFwiY3V0XCI6IFwiV3l0bmlqXCIsXHJcbiAgICAgICAgICAgIFwicGFzdGVcIjogXCJXa2xlalwiLFxyXG4gICAgICAgICAgICBcImRlbGV0ZVwiOiBcIlVzdcWEXCIsXHJcbiAgICAgICAgICAgIFwiYWRkRGVjaXNpb25Ob2RlXCI6IFwiRG9kYWogV8SZemXFgiBEZWN5enlqbnlcIixcclxuICAgICAgICAgICAgXCJhZGRDaGFuY2VOb2RlXCI6IFwiRG9kYWogV8SZemXFgiBMb3Nvd3lcIixcclxuICAgICAgICAgICAgXCJhZGRUZXJtaW5hbE5vZGVcIjogXCJEb2RhaiBXxJl6ZcWCIEtvxYRjb3d5XCIsXHJcbiAgICAgICAgICAgIFwiY29udmVydFwiOntcclxuICAgICAgICAgICAgICAgIFwiZGVjaXNpb25cIjogXCJKYWtvIFfEmXplxYIgRGVjeXp5am55XCIsXHJcbiAgICAgICAgICAgICAgICBcImNoYW5jZVwiOiBcIkpha28gV8SZemXFgiBMb3Nvd3lcIixcclxuICAgICAgICAgICAgICAgIFwidGVybWluYWxcIjogXCJKYWtvIFfEmXplxYIgS2/FhGNvd3lcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInNlbGVjdFN1YnRyZWVcIjogXCJaYXpuYWN6IHBvZGRyemV3b1wiLFxyXG4gICAgICAgICAgICBcImZvbGRcIjogXCJad2nFhCBwb2Rkcnpld29cIixcclxuICAgICAgICAgICAgXCJ1bmZvbGRcIjogXCJSb3p3acWEIHBvZGRyemV3b1wiLFxyXG4gICAgICAgICAgICBcImZsaXBTdWJ0cmVlXCI6IFwiUHJ6ZXdyw7PEhyBwb2Rkcnpld29cIixcclxuICAgICAgICAgICAgXCJwYXlvZmZzVHJhbnNmb3JtYXRpb25cIjogXCJQcnpla3N6dGHFgsSHIHd5cMWCYXR5XCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiZWRnZVwiOntcclxuICAgICAgICAgICAgXCJpbmplY3REZWNpc2lvbk5vZGVcIjogXCJXc3RyenlrbmlqIFfEmXplxYIgRGVjeXp5am55XCIsXHJcbiAgICAgICAgICAgIFwiaW5qZWN0Q2hhbmNlTm9kZVwiOiBcIldzdHJ6eWtuaWogV8SZemXFgiBMb3Nvd3lcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJ0ZXh0XCI6e1xyXG4gICAgICAgICAgICBcImRlbGV0ZVwiOiBcIlVzdcWEXCJcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFwidmFsaWRhdGlvblwiOntcclxuICAgICAgICBcImluY29tcGxldGVQYXRoXCI6IFwiT3N0YXRuaW0gd8SZesWCZW0gdyDFm2NpZcW8Y2UgcG93aW5pZW4gYnnEhyBXxJl6ZcWCIEtvxYRjb3d5XCIsXHJcbiAgICAgICAgXCJwcm9iYWJpbGl0eURvTm90U3VtVXBUbzFcIjogXCJQcmF3ZG9wb2RvYmllxYRzdHdhIG5pZSBzdW11asSFIHNpZSBkbyAxXCIsXHJcbiAgICAgICAgXCJpbnZhbGlkUHJvYmFiaWxpdHlcIjogXCJOaWVwb3ByYXduZSBwcmF3ZG9wb2RvYmllxYRzdHdvIG5hIGtyYXfEmWR6aSAje3tudW1iZXJ9fVwiLFxyXG4gICAgICAgIFwiaW52YWxpZFBheW9mZlwiOiBcIk5pZXBvcHJhd25hIHd5cMWCYXRhIG5hIGtyYXfEmWR6aSAje3tudW1iZXJ9fVwiXHJcbiAgICB9LFxyXG4gICAgXCJncm93bFwiOntcclxuICAgICAgICBcImJydXNoRGlzYWJsZWRcIjogXCJaYXpuYWN6YW5pZSB3ecWCxIVjem9uZVwiLFxyXG4gICAgICAgIFwiYnJ1c2hFbmFibGVkXCI6IFwiWmF6bmFjemFuaWUgd8WCxIVjem9uZVwiXHJcbiAgICB9LFxyXG4gICAgXCJ0b29sdGlwXCI6e1xyXG4gICAgICAgIFwibm9kZVwiOntcclxuICAgICAgICAgICAgXCJwYXlvZmZcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiV3lwxYJhdGEge3tudW1iZXJ9fVwiLFxyXG4gICAgICAgICAgICAgICAgXCJuYW1lZFwiOiBcInt7bmFtZX19XCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJhZ2dyZWdhdGVkUGF5b2ZmXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIlphZ3JlZ293YW5hIHd5cMWCYXRhIHt7bnVtYmVyfX1cIixcclxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJaYWdyZWdvd2FuYSB7e25hbWV9fVwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicHJvYmFiaWxpdHlUb0VudGVyXCI6IFwiUHJhd2RvcG9kb2JpZcWEc3R3byB3ZWrFm2NpYVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImVkZ2VcIjp7XHJcbiAgICAgICAgICAgIFwicGF5b2ZmXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIld5cMWCYXRhIHt7bnVtYmVyfX06IHt7dmFsdWV9fVwiLFxyXG4gICAgICAgICAgICAgICAgXCJuYW1lZFwiOiBcInt7bmFtZX19OiB7e3ZhbHVlfX1cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInByb2JhYmlsaXR5XCI6IFwiUHJhd2RvcG9kb2JpZcWEc3R3bzoge3t2YWx1ZX19XCJcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHtEM0V4dGVuc2lvbnN9IGZyb20gJy4vZDMtZXh0ZW5zaW9ucydcclxuRDNFeHRlbnNpb25zLmV4dGVuZCgpO1xyXG5cclxuZXhwb3J0ICogZnJvbSAnLi90cmVlLWRlc2lnbmVyJ1xyXG5leHBvcnQgKiBmcm9tICcuL2FwcC11dGlscydcclxuZXhwb3J0ICogZnJvbSAnLi90ZW1wbGF0ZXMnXHJcbmV4cG9ydCAqIGZyb20gJy4vdG9vbHRpcCdcclxuZXhwb3J0ICogZnJvbSAnLi9kMy1leHRlbnNpb25zJ1xyXG5leHBvcnQge2RlZmF1bHQgYXMgZDN9IGZyb20gJy4vZDMnXHJcblxyXG5cclxuIiwiaW1wb3J0IHtVdGlsc30gZnJvbSAnc2QtdXRpbHMnXHJcbmltcG9ydCB7ZG9tYWluIGFzIG1vZGVsfSBmcm9tICdzZC1tb2RlbCdcclxuaW1wb3J0ICogYXMgZDMgZnJvbSAnLi9kMydcclxuaW1wb3J0IGNpcmNsZVN5bWJvbCBmcm9tICcuL3N5bWJvbHMvY2lyY2xlJ1xyXG5pbXBvcnQgdHJpYW5nbGVTeW1ib2wgZnJvbSAnLi9zeW1ib2xzL3RyaWFuZ2xlJ1xyXG5pbXBvcnQge0FwcFV0aWxzfSBmcm9tIFwiLi9hcHAtdXRpbHNcIjtcclxuXHJcbi8qVHJlZSBsYXlvdXQgbWFuYWdlciovXHJcbmV4cG9ydCBjbGFzcyBMYXlvdXR7XHJcblxyXG4gICAgdHJlZURlc2lnbmVyO1xyXG4gICAgZGF0YTtcclxuICAgIGNvbmZpZztcclxuXHJcbiAgICBub2RlVHlwZVRvU3ltYm9sID0ge1xyXG4gICAgICAgICdkZWNpc2lvbic6IGQzLnN5bWJvbFNxdWFyZSxcclxuICAgICAgICAnY2hhbmNlJzogY2lyY2xlU3ltYm9sLFxyXG4gICAgICAgIFwidGVybWluYWxcIjogdHJpYW5nbGVTeW1ib2xcclxuICAgIH07XHJcblxyXG4gICAgc3RhdGljIE1BTlVBTF9MQVlPVVRfTkFNRSA9ICdtYW51YWwnO1xyXG5cclxuXHJcbiAgICBvbkF1dG9MYXlvdXRDaGFuZ2VkPVtdO1xyXG5cclxuICAgIG5vZGVUeXBlT3JkZXIgPSB7XHJcbiAgICAgICAgJ2RlY2lzaW9uJyA6IDAsXHJcbiAgICAgICAgJ2NoYW5jZSc6IDAsXHJcbiAgICAgICAgJ3Rlcm1pbmFsJzogMVxyXG4gICAgfTtcclxuXHJcbiAgICB0cmVlTWFyZ2luID0gNTA7XHJcbiAgICB0YXJnZXRTeW1ib2xTaXplPXt9O1xyXG4gICAgbm9kZVNlcGFyYXRpb24gPSAoYSwgYikgPT4gYS5wYXJlbnQgPT09IGIucGFyZW50ID8gMSA6IDEuMlxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHRyZWVEZXNpZ25lciwgZGF0YSwgY29uZmlnKXtcclxuICAgICAgICB0aGlzLnRyZWVEZXNpZ25lciA9IHRyZWVEZXNpZ25lcjtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUobm9kZSl7XHJcbiAgICAgICAgaWYobm9kZSAmJiBub2RlLiRwYXJlbnQpe1xyXG4gICAgICAgICAgICBub2RlLiRwYXJlbnQuY2hpbGRFZGdlcy5zb3J0KChhLGIpPT5hLmNoaWxkTm9kZS5sb2NhdGlvbi55IC0gYi5jaGlsZE5vZGUubG9jYXRpb24ueSlcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIXRoaXMuaXNNYW51YWxMYXlvdXQoKSl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmF1dG9MYXlvdXQodGhpcy5jb25maWcudHlwZSwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKG5vZGUpe1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVOb2RlVG9FbXB0eVBsYWNlKG5vZGUpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLnRyZWVEZXNpZ25lci5yZWRyYXcodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlzTWFudWFsTGF5b3V0KCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLnR5cGUgPT09IExheW91dC5NQU5VQUxfTEFZT1VUX05BTUU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TmV3Q2hpbGRMb2NhdGlvbihwYXJlbnQpe1xyXG4gICAgICAgIGlmKCFwYXJlbnQpe1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IG1vZGVsLlBvaW50KHRoaXMuZ2V0Tm9kZU1pblgoKSwgdGhpcy5nZXROb2RlTWluWSgpKVxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgeCA9IHBhcmVudC5sb2NhdGlvbi54ICsgdGhpcy5jb25maWcuZ3JpZFdpZHRoO1xyXG4gICAgICAgIHZhciB5ID0gcGFyZW50LmxvY2F0aW9uLnk7XHJcbiAgICAgICAgaWYocGFyZW50LmNoaWxkRWRnZXMubGVuZ3RoKXtcclxuICAgICAgICAgICAgeSA9IHBhcmVudC5jaGlsZEVkZ2VzW3BhcmVudC5jaGlsZEVkZ2VzLmxlbmd0aC0xXS5jaGlsZE5vZGUubG9jYXRpb24ueSsxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBtb2RlbC5Qb2ludCh4LCB5KVxyXG4gICAgfVxyXG5cclxuICAgIGdldEluamVjdGVkTm9kZUxvY2F0aW9uKGVkZ2Upe1xyXG5cclxuICAgICAgICB2YXIgcCA9IGVkZ2UuJGxpbmVQb2ludHNbMl07XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgbW9kZWwuUG9pbnQocFswXSwgcFsxXSlcclxuICAgIH1cclxuXHJcbiAgICBtb3ZlTm9kZVRvRW1wdHlQbGFjZShub2RlLCByZWRyYXdJZkNoYW5nZWQ9dHJ1ZSl7XHJcbiAgICAgICAgdmFyIHBvc2l0aW9uTWFwID0ge307XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIG5vZGUubG9jYXRpb24ueCA9IE1hdGgubWF4KHRoaXMuZ2V0Tm9kZU1pblgobm9kZSksIG5vZGUubG9jYXRpb24ueCk7XHJcbiAgICAgICAgbm9kZS5sb2NhdGlvbi55ID0gTWF0aC5tYXgodGhpcy5nZXROb2RlTWluWShub2RlKSwgbm9kZS5sb2NhdGlvbi55KTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMubm9kZXNTb3J0ZWRCeVggPSB0aGlzLmRhdGEubm9kZXMuc2xpY2UoKTtcclxuICAgICAgICB0aGlzLm5vZGVzU29ydGVkQnlYLnNvcnQoKGEsYik9PmEubG9jYXRpb24ueCAtIGIubG9jYXRpb24ueCk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGZpbmRDb2xsaWRpbmdOb2RlKG5vZGUsIGxvY2F0aW9uKXtcclxuICAgICAgICAgICAgcmV0dXJuIFV0aWxzLmZpbmQoc2VsZi5ub2Rlc1NvcnRlZEJ5WCwgbj0+e1xyXG4gICAgICAgICAgICAgICAgaWYobm9kZSA9PSBuKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIG1hcmdpbiA9IHNlbGYuY29uZmlnLm5vZGVTaXplLzM7XHJcbiAgICAgICAgICAgICAgICB2YXIgeCA9IG4ubG9jYXRpb24ueDtcclxuICAgICAgICAgICAgICAgIHZhciB5ID0gbi5sb2NhdGlvbi55O1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAobG9jYXRpb24ueCAtIG1hcmdpbiA8PSB4ICYmIGxvY2F0aW9uLnggKyBtYXJnaW4gPj0geFxyXG4gICAgICAgICAgICAgICAgICAgICYmIGxvY2F0aW9uLnkgLSBtYXJnaW4gPD0geSAmJiBsb2NhdGlvbi55ICsgbWFyZ2luID49IHkpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHN0ZXBYID0gdGhpcy5jb25maWcubm9kZVNpemUvMjtcclxuICAgICAgICB2YXIgc3RlcFkgPSB0aGlzLmNvbmZpZy5ub2RlU2l6ZSsxMDtcclxuICAgICAgICB2YXIgc3RlcFhzYW1lUGFyZW50ID0gMDtcclxuICAgICAgICB2YXIgc3RlcFlzYW1lUGFyZW50ID0gNzU7XHJcbiAgICAgICAgdmFyIGNoYW5nZWQgPSBmYWxzZTtcclxuICAgICAgICB2YXIgY29saWRpbmdOb2RlO1xyXG4gICAgICAgIHZhciBuZXdMb2NhdGlvbiA9IG5ldyBtb2RlbC5Qb2ludChub2RlLmxvY2F0aW9uKTtcclxuICAgICAgICB3aGlsZShjb2xpZGluZ05vZGUgPSBmaW5kQ29sbGlkaW5nTm9kZShub2RlLCBuZXdMb2NhdGlvbikpe1xyXG4gICAgICAgICAgICBjaGFuZ2VkPXRydWU7XHJcbiAgICAgICAgICAgIHZhciBzYW1lUGFyZW50ID0gbm9kZS4kcGFyZW50ICYmIGNvbGlkaW5nTm9kZS4kcGFyZW50ICYmIG5vZGUuJHBhcmVudD09PWNvbGlkaW5nTm9kZS4kcGFyZW50O1xyXG4gICAgICAgICAgICBpZihzYW1lUGFyZW50KXtcclxuICAgICAgICAgICAgICAgIG5ld0xvY2F0aW9uLm1vdmUoc3RlcFhzYW1lUGFyZW50LCBzdGVwWXNhbWVQYXJlbnQpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIG5ld0xvY2F0aW9uLm1vdmUoc3RlcFgsIHN0ZXBZKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihjaGFuZ2VkKXtcclxuICAgICAgICAgICAgbm9kZS5tb3ZlVG8obmV3TG9jYXRpb24ueCxuZXdMb2NhdGlvbi55LCB0cnVlKTtcclxuICAgICAgICAgICAgaWYocmVkcmF3SWZDaGFuZ2VkKXtcclxuICAgICAgICAgICAgICAgIHRoaXMudHJlZURlc2lnbmVyLnJlZHJhdyh0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkaXNhYmxlQXV0b0xheW91dCgpe1xyXG4gICAgICAgIHRoaXMuY29uZmlnLnR5cGUgPSBMYXlvdXQuTUFOVUFMX0xBWU9VVF9OQU1FO1xyXG4gICAgICAgIHRoaXMuX2ZpcmVPbkF1dG9MYXlvdXRDaGFuZ2VkQ2FsbGJhY2tzKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIG5vZGVTeW1ib2xTaXplID0ge307XHJcbiAgICBkcmF3Tm9kZVN5bWJvbChwYXRoLCB0cmFuc2l0aW9uKXtcclxuXHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHZhciBub2RlU2l6ZSA9IHRoaXMuY29uZmlnLm5vZGVTaXplO1xyXG4gICAgICAgIHRoaXMubm9kZVN5bWJvbCA9IGQzLnN5bWJvbCgpLnR5cGUoZD0+IHNlbGYubm9kZVR5cGVUb1N5bWJvbFtkLnR5cGVdKVxyXG4gICAgICAgICAgICAuc2l6ZShkPT5zZWxmLm5vZGVTeW1ib2xTaXplW2QuaWRdID8gVXRpbHMuZ2V0KHNlbGYudGFyZ2V0U3ltYm9sU2l6ZSwgZC50eXBlK1wiWydcIitzZWxmLmNvbmZpZy5ub2RlU2l6ZStcIiddXCIsIDY0KSA6IDY0KTtcclxuXHJcbiAgICAgICAgcGF0aFxyXG4gICAgICAgICAgICAuZWFjaChmdW5jdGlvbiAoZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBhdGggPSBkMy5zZWxlY3QodGhpcyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgcHJldiA9IHBhdGguYXR0cihcImRcIik7XHJcbiAgICAgICAgICAgICAgICBpZighcHJldil7XHJcbiAgICAgICAgICAgICAgICAgICAgcGF0aC5hdHRyKFwiZFwiLCBzZWxmLm5vZGVTeW1ib2wpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIHNpemUgPSBVdGlscy5nZXQoc2VsZi50YXJnZXRTeW1ib2xTaXplLCBkLnR5cGUrXCJbJ1wiK3NlbGYuY29uZmlnLm5vZGVTaXplK1wiJ11cIik7XHJcbiAgICAgICAgICAgICAgICBpZighc2l6ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJveCA9IHBhdGgubm9kZSgpLmdldEJCb3goKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSBNYXRoLm1pbihub2RlU2l6ZSAvIGJveC53aWR0aCwgbm9kZVNpemUgLyBib3guaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgICAgICBzaXplID0gZXJyb3IgKiBlcnJvciAqIChzZWxmLm5vZGVTeW1ib2xTaXplW2QuaWRdfHw2NCk7XHJcbiAgICAgICAgICAgICAgICAgICAgVXRpbHMuc2V0KHNlbGYudGFyZ2V0U3ltYm9sU2l6ZSwgZC50eXBlK1wiWydcIitzZWxmLmNvbmZpZy5ub2RlU2l6ZStcIiddXCIsIHNpemUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYodHJhbnNpdGlvbil7XHJcbiAgICAgICAgICAgICAgICAgICAgcGF0aCA9ICBwYXRoLnRyYW5zaXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLm5vZGVTeW1ib2xTaXplW2QuaWRdID0gc2l6ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHBhdGguYXR0cihcImRcIiwgc2VsZi5ub2RlU3ltYm9sKTtcclxuICAgICAgICAgICAgICAgIGlmKHRyYW5zaXRpb24pe1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYubm9kZVN5bWJvbFNpemVbZC5pZF0gPSBzaXplO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBub2RlTGFiZWxQb3NpdGlvbihzZWxlY3Rpb24pIHtcclxuICAgICAgICByZXR1cm4gc2VsZWN0aW9uXHJcbiAgICAgICAgICAgIC5hdHRyKCd4JywgMClcclxuICAgICAgICAgICAgLmF0dHIoJ3knLCAtdGhpcy5jb25maWcubm9kZVNpemUgLyAyIC0gNylcclxuICAgIH1cclxuXHJcbiAgICBub2RlUGF5b2ZmUG9zaXRpb24oc2VsZWN0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuIExheW91dC5zZXRIYW5naW5nUG9zaXRpb24oc2VsZWN0aW9uKVxyXG4gICAgICAgICAgICAuYXR0cigneCcsIDApXHJcbiAgICAgICAgICAgIC5hdHRyKCd5JywgdGhpcy5jb25maWcubm9kZVNpemUgLyAyICsgNylcclxuICAgICAgICAgICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXHJcbiAgICB9XHJcblxyXG4gICAgbm9kZUFnZ3JlZ2F0ZWRQYXlvZmZQb3NpdGlvbihzZWxlY3Rpb24pIHtcclxuICAgICAgICB2YXIgeCA9IHRoaXMuY29uZmlnLm5vZGVTaXplIC8gMiArIDc7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHNlbGVjdGlvblxyXG4gICAgICAgICAgICAuYXR0cigneCcsIHgpXHJcbiAgICAgICAgICAgIC5hdHRyKCd5JywgZnVuY3Rpb24oZCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgZm9udFNpemUgPSBwYXJzZUludChBcHBVdGlscy5nZXRGb250U2l6ZSh0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbXMgPSBkLmRpc3BsYXlWYWx1ZSgnYWdncmVnYXRlZFBheW9mZicpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG51bWJlciA9IFV0aWxzLmlzQXJyYXkoaXRlbXMpID8gaXRlbXMuZmlsdGVyKGl0PT5pdCAhPT0gdW5kZWZpbmVkKS5sZW5ndGggOiAxO1xyXG4gICAgICAgICAgICAgICAgaWYobnVtYmVyPjEpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAtdGhpcy5nZXRCQm94KCkuaGVpZ2h0LzIgKyBmb250U2l6ZS8yO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIC1NYXRoLm1heCgyLCAxLjgqIHNlbGYuY29uZmlnLm5vZGVTaXplL2ZvbnRTaXplKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHNlbGVjdGlvbi5zZWxlY3RBbGwoJ3RzcGFuJykuYXR0cigneCcsIHgpO1xyXG4gICAgICAgIHJldHVybiBzZWxlY3Rpb247XHJcbiAgICAgICAgICAgIC8vIC5hdHRyKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKVxyXG4gICAgICAgICAgICAvLyAuYXR0cignZG9taW5hbnQtYmFzZWxpbmUnLCAnaGFuZ2luZycpXHJcbiAgICB9XHJcblxyXG4gICAgbm9kZVByb2JhYmlsaXR5VG9FbnRlclBvc2l0aW9uKHNlbGVjdGlvbikge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgcmV0dXJuIExheW91dC5zZXRIYW5naW5nUG9zaXRpb24oc2VsZWN0aW9uKVxyXG4gICAgICAgICAgICAuYXR0cigneCcsIHRoaXMuY29uZmlnLm5vZGVTaXplIC8gMiArIDcpXHJcbiAgICAgICAgICAgIC5hdHRyKCd5JywgZnVuY3Rpb24oZCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgZm9udFNpemUgPSBwYXJzZUludChBcHBVdGlscy5nZXRGb250U2l6ZSh0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgYWdncmVnYXRlZFBheW9mZnMgPSBkLmRpc3BsYXlWYWx1ZSgnYWdncmVnYXRlZFBheW9mZicpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGFnZ3JlZ2F0ZWRQYXlvZmZzTnVtYmVyID0gVXRpbHMuaXNBcnJheShhZ2dyZWdhdGVkUGF5b2ZmcykgPyBhZ2dyZWdhdGVkUGF5b2Zmcy5maWx0ZXIoaXQ9Pml0ICE9PSB1bmRlZmluZWQpLmxlbmd0aCA6IDE7XHJcbiAgICAgICAgICAgICAgICBpZihhZ2dyZWdhdGVkUGF5b2Zmc051bWJlcj4xKXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZvbnRTaXplKjAuNlxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLm1heCgyLCAxLjgqIHNlbGYuY29uZmlnLm5vZGVTaXplL2ZvbnRTaXplKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLy8gLmF0dHIoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXHJcbiAgICAgICAgICAgIC8vIC5hdHRyKCdkb21pbmFudC1iYXNlbGluZScsICdjZW50cmFsJylcclxuICAgIH1cclxuXHJcbiAgICBub2RlSW5kaWNhdG9yUG9zaXRpb24oc2VsZWN0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuIHNlbGVjdGlvblxyXG4gICAgICAgICAgICAuYXR0cigneCcsIHRoaXMuY29uZmlnLm5vZGVTaXplIC8gMiArIDgpXHJcbiAgICAgICAgICAgIC5hdHRyKCd5JywgLSB0aGlzLmNvbmZpZy5ub2RlU2l6ZS8yKVxyXG4gICAgICAgICAgICAuYXR0cignZG9taW5hbnQtYmFzZWxpbmUnLCAnY2VudHJhbCcpXHJcbiAgICAgICAgICAgIC5hdHRyKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKVxyXG4gICAgfVxyXG5cclxuICAgIG5vZGVVbmZvbGRCdXR0b25Qb3NpdGlvbihzZWxlY3Rpb24pIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIHNlbGVjdGlvblxyXG4gICAgICAgICAgICAuYXR0cigneCcsIHRoaXMuY29uZmlnLm5vZGVTaXplIC8gMiArIDUpXHJcbiAgICAgICAgICAgIC5hdHRyKCd5JywgMClcclxuICAgICAgICAgICAgLmF0dHIoJ2RvbWluYW50LWJhc2VsaW5lJywgJ2NlbnRyYWwnKVxyXG4gICAgfVxyXG5cclxuICAgIGVkZ2VMaW5lRChlZGdlKXtcclxuICAgICAgICB2YXIgbGluZSA9IGQzLmxpbmUoKVxyXG4gICAgICAgICAgICAueChkPT4gZFswXSlcclxuICAgICAgICAgICAgLnkoZD0+IGRbMV0pO1xyXG4gICAgICAgIC8vIC5jdXJ2ZShkMy5jdXJ2ZUNhdG11bGxSb20uYWxwaGEoMC41KSk7XHJcblxyXG5cclxuICAgICAgICB2YXIgcGFyZW50Tm9kZSA9IGVkZ2UucGFyZW50Tm9kZTtcclxuICAgICAgICB2YXIgY2hpbGROb2RlID0gZWRnZS5jaGlsZE5vZGU7XHJcblxyXG4gICAgICAgIHZhciBkWCA9IGNoaWxkTm9kZS5sb2NhdGlvbi54IC0gcGFyZW50Tm9kZS5sb2NhdGlvbi54O1xyXG4gICAgICAgIHZhciBkWSA9IGNoaWxkTm9kZS5sb2NhdGlvbi55IC0gcGFyZW50Tm9kZS5sb2NhdGlvbi55O1xyXG5cclxuICAgICAgICB2YXIgc2lnbiA9IGRYPj0wID8gMSA6IC0xO1xyXG5cclxuICAgICAgICB2YXIgc2xhbnRTdGFydFhPZmZzZXQgPSBNYXRoLm1pbihkWC8yLCB0aGlzLmNvbmZpZy5ub2RlU2l6ZS8yKzEwKTtcclxuICAgICAgICB2YXIgc2xhbnRXaWR0aCA9IE1hdGgubWluKHRoaXMuY29uZmlnLmVkZ2VTbGFudFdpZHRoTWF4LCBNYXRoLm1heChkWC8yIC0gc2xhbnRTdGFydFhPZmZzZXQsIDApKTtcclxuXHJcbiAgICAgICAgdmFyIHBvaW50MSA9IFtwYXJlbnROb2RlLmxvY2F0aW9uLnggK3RoaXMuY29uZmlnLm5vZGVTaXplLzIgKyAxLCBwYXJlbnROb2RlLmxvY2F0aW9uLnldO1xyXG4gICAgICAgIHZhciBwb2ludDIgPSBbTWF0aC5tYXgocGFyZW50Tm9kZS5sb2NhdGlvbi54K3NsYW50U3RhcnRYT2Zmc2V0LCBwb2ludDFbMF0pLCBwYXJlbnROb2RlLmxvY2F0aW9uLnldO1xyXG4gICAgICAgIHZhciBwb2ludDMgPSBbcGFyZW50Tm9kZS5sb2NhdGlvbi54K3NsYW50U3RhcnRYT2Zmc2V0K3NsYW50V2lkdGgsIGNoaWxkTm9kZS5sb2NhdGlvbi55XTtcclxuICAgICAgICB2YXIgcG9pbnQ0ID0gW2NoaWxkTm9kZS5sb2NhdGlvbi54IC0gKHNpZ24qKE1hdGgubWF4KDAsIE1hdGgubWluKHRoaXMuY29uZmlnLm5vZGVTaXplLzIrOCwgZFgvMikpKSksIGNoaWxkTm9kZS5sb2NhdGlvbi55XTtcclxuICAgICAgICAvLyB2YXIgcG9pbnQyID0gW3BhcmVudE5vZGUubG9jYXRpb24ueCtkWC8yLXNsYW50V2lkdGgvMiwgcGFyZW50Tm9kZS5sb2NhdGlvbi55XTtcclxuICAgICAgICAvLyB2YXIgcG9pbnQzID0gW2NoaWxkTm9kZS5sb2NhdGlvbi54LShkWC8yLXNsYW50V2lkdGgvMiksIGNoaWxkTm9kZS5sb2NhdGlvbi55XTtcclxuXHJcbiAgICAgICAgZWRnZS4kbGluZVBvaW50cyA9IFtwb2ludDEsIHBvaW50MiwgcG9pbnQzLCBwb2ludDRdO1xyXG4gICAgICAgIHJldHVybiBsaW5lKGVkZ2UuJGxpbmVQb2ludHMpO1xyXG4gICAgfVxyXG5cclxuICAgIGVkZ2VQYXlvZmZQb3NpdGlvbihzZWxlY3Rpb24pIHtcclxuICAgICAgICBMYXlvdXQuc2V0SGFuZ2luZ1Bvc2l0aW9uKHNlbGVjdGlvbilcclxuICAgICAgICAgICAgLmF0dHIoJ3gnLCBkPT5kLiRsaW5lUG9pbnRzWzJdWzBdICsgMilcclxuICAgICAgICAgICAgLmF0dHIoJ3knLCBkPT5kLiRsaW5lUG9pbnRzWzJdWzFdICsgNyk7XHJcblxyXG4gICAgICAgIHNlbGVjdGlvbi5zZWxlY3RBbGwoJ3RzcGFuJykuYXR0cigneCcsIGZ1bmN0aW9uKGQpe1xyXG4gICAgICAgICAgICByZXR1cm4gZDMuc2VsZWN0KHRoaXMucGFyZW50Tm9kZSkuZGF0dW0oKS4kbGluZVBvaW50c1syXVswXSArIDJcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gc2VsZWN0aW9uO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBlZGdlTGFiZWxQb3NpdGlvbihzZWxlY3Rpb24pIHtcclxuICAgICAgICByZXR1cm4gc2VsZWN0aW9uXHJcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBkPT4ndHJhbnNsYXRlKCcrKGQuJGxpbmVQb2ludHNbMl1bMF0gKyAyKSsnLCcrKGQuJGxpbmVQb2ludHNbMl1bMV0gLSA3KSsnKScpXHJcbiAgICAgICAgICAgIC8vIC5hdHRyKCd4JywgZD0+ZC4kbGluZVBvaW50c1syXVswXSArIDIpXHJcbiAgICAgICAgICAgIC8vIC5hdHRyKCd5JywgZD0+ZC4kbGluZVBvaW50c1syXVsxXSAtIDcpXHJcblxyXG4gICAgfVxyXG5cclxuICAgIGVkZ2VQcm9iYWJpbGl0eVBvc2l0aW9uKHNlbGVjdGlvbikge1xyXG4gICAgICAgIHJldHVybiBMYXlvdXQuc2V0SGFuZ2luZ1Bvc2l0aW9uKHNlbGVjdGlvbilcclxuICAgICAgICAgICAgLmF0dHIoJ3gnLCBmdW5jdGlvbiAoZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGxlbiA9IHRoaXMuZ2V0Q29tcHV0ZWRUZXh0TGVuZ3RoKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWluID0gZC4kbGluZVBvaW50c1syXVswXSArIDIgKyB0aGlzLnByZXZpb3VzU2libGluZy5jaGlsZE5vZGVzWzBdLmdldENvbXB1dGVkVGV4dExlbmd0aCgpICsgNyArIGxlbjtcclxuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLm1heChtaW4sIGQuJGxpbmVQb2ludHNbM11bMF0gLSA4KTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmF0dHIoJ3knLCBkPT5kLiRsaW5lUG9pbnRzWzJdWzFdICsgNylcclxuICAgIH1cclxuXHJcbiAgICBnZXRNaW5NYXJnaW5CZXR3ZWVuTm9kZXMoKXtcclxuICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLm5vZGVTaXplICsgMzA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VGV4dE1pblgoZCl7XHJcbiAgICAgICAgbGV0IG1pblggPSAwO1xyXG4gICAgICAgIGlmKGQpe1xyXG4gICAgICAgICAgICBsZXQgYmIgPSB0aGlzLnRyZWVEZXNpZ25lci5nZXRUZXh0RDNTZWxlY3Rpb24oZCkuc2VsZWN0KCd0ZXh0Jykubm9kZSgpLmdldEJCb3goKTtcclxuICAgICAgICAgICAgaWYgKGJiLnggPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBtaW5YIC09IGJiLng7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1pblg7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VGV4dE1pblkoZCl7XHJcbiAgICAgICAgbGV0IG1pblkgPSAwO1xyXG4gICAgICAgIGlmKGQpe1xyXG4gICAgICAgICAgICBsZXQgYmIgPSB0aGlzLnRyZWVEZXNpZ25lci5nZXRUZXh0RDNTZWxlY3Rpb24oZCkuc2VsZWN0KCd0ZXh0Jykubm9kZSgpLmdldEJCb3goKTtcclxuICAgICAgICAgICAgaWYgKGJiLnkgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBtaW5ZIC09IGJiLnk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1pblk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VGV4dE1heFgoZCl7XHJcbiAgICAgICAgcmV0dXJuIE51bWJlci5NQVhfU0FGRV9JTlRFR0VSO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBnZXROb2RlTWluWChkKXtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgaWYoZCAmJiBkLiRwYXJlbnQpey8vICYmICFzZWxmLmlzTm9kZVNlbGVjdGVkKGQuJHBhcmVudClcclxuICAgICAgICAgICAgcmV0dXJuIGQuJHBhcmVudC5sb2NhdGlvbi54ICsgc2VsZi5nZXRNaW5NYXJnaW5CZXR3ZWVuTm9kZXMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNlbGYuY29uZmlnLm5vZGVTaXplLzI7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Tm9kZU1pblkoZCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLm5vZGVTaXplLzI7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Tm9kZU1heFgoZCl7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICBpZihkICYmIGQuY2hpbGRFZGdlcy5sZW5ndGgpe1xyXG4gICAgICAgICAgICByZXR1cm4gZDMubWluKGQuY2hpbGRFZGdlcywgZT0+IWUuY2hpbGROb2RlLiRoaWRkZW4gPyBlLmNoaWxkTm9kZS5sb2NhdGlvbi54IDogOTk5OTk5OSktc2VsZi5nZXRNaW5NYXJnaW5CZXR3ZWVuTm9kZXMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIE51bWJlci5NQVhfU0FGRV9JTlRFR0VSO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEdyaWRXaWR0aCh3aWR0aCwgd2l0aG91dFN0YXRlU2F2aW5nKXtcclxuICAgICAgICB2YXIgc2VsZj10aGlzO1xyXG4gICAgICAgIGlmKHRoaXMuY29uZmlnLmdyaWRXaWR0aD09PXdpZHRoKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZighd2l0aG91dFN0YXRlU2F2aW5nKXtcclxuICAgICAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBkYXRhOntcclxuICAgICAgICAgICAgICAgICAgICBncmlkV2lkdGg6IHNlbGYuY29uZmlnLmdyaWRXaWR0aFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG9uVW5kbzogKGRhdGEpPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0R3JpZFdpZHRoKGRhdGEuZ3JpZFdpZHRoLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBvblJlZG86IChkYXRhKT0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldEdyaWRXaWR0aCh3aWR0aCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jb25maWcuZ3JpZFdpZHRoPXdpZHRoO1xyXG4gICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0R3JpZEhlaWdodChncmlkSGVpZ2h0LCB3aXRob3V0U3RhdGVTYXZpbmcpe1xyXG4gICAgICAgIHZhciBzZWxmPXRoaXM7XHJcbiAgICAgICAgaWYodGhpcy5jb25maWcuZ3JpZEhlaWdodD09PWdyaWRIZWlnaHQpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCF3aXRob3V0U3RhdGVTYXZpbmcpe1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKHtcclxuICAgICAgICAgICAgICAgIGRhdGE6e1xyXG4gICAgICAgICAgICAgICAgICAgIGdyaWRIZWlnaHQ6IHNlbGYuY29uZmlnLmdyaWRIZWlnaHRcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBvblVuZG86IChkYXRhKT0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldEdyaWRIZWlnaHQoZGF0YS5ncmlkSGVpZ2h0LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBvblJlZG86IChkYXRhKT0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldEdyaWRIZWlnaHQoZ3JpZEhlaWdodCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jb25maWcuZ3JpZEhlaWdodD1ncmlkSGVpZ2h0O1xyXG4gICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Tm9kZVNpemUobm9kZVNpemUsIHdpdGhvdXRTdGF0ZVNhdmluZyl7XHJcbiAgICAgICAgdmFyIHNlbGY9dGhpcztcclxuICAgICAgICBpZih0aGlzLmNvbmZpZy5ub2RlU2l6ZT09PW5vZGVTaXplKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZighd2l0aG91dFN0YXRlU2F2aW5nKXtcclxuICAgICAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBkYXRhOntcclxuICAgICAgICAgICAgICAgICAgICBub2RlU2l6ZTogc2VsZi5jb25maWcubm9kZVNpemVcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBvblVuZG86IChkYXRhKT0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldE5vZGVTaXplKGRhdGEubm9kZVNpemUsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG9uUmVkbzogKGRhdGEpPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0Tm9kZVNpemUobm9kZVNpemUsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY29uZmlnLm5vZGVTaXplPW5vZGVTaXplO1xyXG4gICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICAgICAgaWYodGhpcy5pc01hbnVhbExheW91dCgpKXtcclxuICAgICAgICAgICAgdGhpcy5maXROb2Rlc0luUGxvdHRpbmdSZWdpb24oc2VsZi5kYXRhLmdldFJvb3RzKCkpO1xyXG4gICAgICAgICAgICB0aGlzLnRyZWVEZXNpZ25lci5yZWRyYXcodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldEVkZ2VTbGFudFdpZHRoTWF4KHdpZHRoLCB3aXRob3V0U3RhdGVTYXZpbmcpe1xyXG4gICAgICAgIHZhciBzZWxmPXRoaXM7XHJcbiAgICAgICAgaWYodGhpcy5jb25maWcuZWRnZVNsYW50V2lkdGhNYXg9PT13aWR0aCl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIXdpdGhvdXRTdGF0ZVNhdmluZyl7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgZGF0YTp7XHJcbiAgICAgICAgICAgICAgICAgICAgZWRnZVNsYW50V2lkdGhNYXg6IHNlbGYuY29uZmlnLmVkZ2VTbGFudFdpZHRoTWF4XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgb25VbmRvOiAoZGF0YSk9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRFZGdlU2xhbnRXaWR0aE1heChkYXRhLmVkZ2VTbGFudFdpZHRoTWF4LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBvblJlZG86IChkYXRhKT0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldEVkZ2VTbGFudFdpZHRoTWF4KHdpZHRoLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNvbmZpZy5lZGdlU2xhbnRXaWR0aE1heD13aWR0aDtcclxuICAgICAgICB0aGlzLnRyZWVEZXNpZ25lci5yZWRyYXcodHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgYXV0b0xheW91dCh0eXBlLCB3aXRob3V0U3RhdGVTYXZpbmcpe1xyXG4gICAgICAgIHZhciBzZWxmPXRoaXM7XHJcblxyXG5cclxuXHJcbiAgICAgICAgaWYoIXdpdGhvdXRTdGF0ZVNhdmluZyl7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgZGF0YTp7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3TGF5b3V0OiB0eXBlLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRMYXlvdXQ6IHNlbGYuY29uZmlnLnR5cGVcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBvblVuZG86IChkYXRhKT0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmNvbmZpZy50eXBlID0gZGF0YS5jdXJyZW50TGF5b3V0O1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuX2ZpcmVPbkF1dG9MYXlvdXRDaGFuZ2VkQ2FsbGJhY2tzKCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgb25SZWRvOiAoZGF0YSk9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5hdXRvTGF5b3V0KGRhdGEubmV3TGF5b3V0LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY29uZmlnLnR5cGUgPSB0eXBlO1xyXG4gICAgICAgIGlmKCF0aGlzLmRhdGEubm9kZXMubGVuZ3RoKXtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZU9uQXV0b0xheW91dENoYW5nZWRDYWxsYmFja3MoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHByZXZUcmVlTWF4WSA9IHNlbGYuZ2V0Tm9kZU1pblkoKTtcclxuICAgICAgICB0aGlzLmRhdGEuZ2V0Um9vdHMoKS5mb3JFYWNoKHI9PntcclxuICAgICAgICAgICAgdmFyIHJvb3QgPSBkMy5oaWVyYXJjaHkociwgZD0+e1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuY2hpbGRFZGdlcy5maWx0ZXIoZT0+IWUuJGhpZGRlbikubWFwKGU9PmUuY2hpbGROb2RlKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyByb290LnNvcnQoKGEsYik9PnNlbGYubm9kZVR5cGVPcmRlclthLmRhdGEudHlwZV0tc2VsZi5ub2RlVHlwZU9yZGVyW2IuZGF0YS50eXBlXSk7XHJcbiAgICAgICAgICAgIHJvb3Quc29ydCgoYSxiKT0+YS5kYXRhLmxvY2F0aW9uLnkgLSBiLmRhdGEubG9jYXRpb24ueSk7XHJcblxyXG5cclxuICAgICAgICAgICAgdmFyIGxheW91dDtcclxuICAgICAgICAgICAgaWYodHlwZT09PSdjbHVzdGVyJyl7XHJcbiAgICAgICAgICAgICAgICBsYXlvdXQgPSBkMy5jbHVzdGVyKCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgbGF5b3V0ID0gZDMudHJlZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxheW91dC5ub2RlU2l6ZShbc2VsZi5jb25maWcuZ3JpZEhlaWdodCwgc2VsZi5jb25maWcuZ3JpZFdpZHRoXSk7XHJcbiAgICAgICAgICAgIGxheW91dC5zZXBhcmF0aW9uKHNlbGYubm9kZVNlcGFyYXRpb24pO1xyXG5cclxuICAgICAgICAgICAgbGF5b3V0KHJvb3QpO1xyXG4gICAgICAgICAgICB2YXIgbWluWSA9IDk5OTk5OTk5OTtcclxuICAgICAgICAgICAgcm9vdC5lYWNoKGQ9PntcclxuICAgICAgICAgICAgICAgIG1pblkgPSBNYXRoLm1pbihtaW5ZLCBkLngpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHZhciBkeSA9IHJvb3QueCAtIG1pblkgKyBwcmV2VHJlZU1heFk7XHJcbiAgICAgICAgICAgIHZhciBkeCA9IHNlbGYuZ2V0Tm9kZU1pblgoKTtcclxuICAgICAgICAgICAgdmFyIG1heFk9MDtcclxuICAgICAgICAgICAgcm9vdC5lYWNoKGQ9PntcclxuICAgICAgICAgICAgICAgIGQuZGF0YS5sb2NhdGlvbi54ID0gZC55ICsgZHg7XHJcbiAgICAgICAgICAgICAgICBkLmRhdGEubG9jYXRpb24ueSA9IGQueCArIGR5O1xyXG5cclxuICAgICAgICAgICAgICAgIG1heFkgPSBNYXRoLm1heChtYXhZLCBkLmRhdGEubG9jYXRpb24ueSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcHJldlRyZWVNYXhZID0gbWF4WSArIHNlbGYuY29uZmlnLm5vZGVTaXplK3NlbGYudHJlZU1hcmdpbjtcclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIC8vIHRoaXMudHJhbnNpdGlvbiA9IHRydWU7XHJcbiAgICAgICAgdGhpcy50cmVlRGVzaWduZXIucmVkcmF3KHRydWUpO1xyXG4gICAgICAgIC8vIHRoaXMudHJhbnNpdGlvbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLl9maXJlT25BdXRvTGF5b3V0Q2hhbmdlZENhbGxiYWNrcygpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGZpdE5vZGVzSW5QbG90dGluZ1JlZ2lvbihub2Rlcyl7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHZhciB0b3BZID0gZDMubWluKG5vZGVzLCBuPT5uLmxvY2F0aW9uLnkpO1xyXG4gICAgICAgIHZhciBtaW5ZID0gc2VsZi5nZXROb2RlTWluWSgpO1xyXG4gICAgICAgIHZhciBkeSA9IHRvcFkgLSBtaW5ZO1xyXG5cclxuICAgICAgICB2YXIgbWluWCA9IGQzLm1pbihub2Rlcywgbj0+bi5sb2NhdGlvbi54KTtcclxuICAgICAgICB2YXIgZHggPSBtaW5YIC0gc2VsZi5nZXROb2RlTWluWCgpO1xyXG5cclxuICAgICAgICBpZihkeTwwIHx8ICBkeDwwKXtcclxuICAgICAgICAgICAgbm9kZXMuZm9yRWFjaChuPT5uLm1vdmUoLWR4LCAtZHkpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZU5vZGVzKG5vZGVzLCBkeCwgZHksIHBpdm90KXtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGxpbWl0ID0gc2VsZi5jb25maWcubGltaXROb2RlUG9zaXRpb25pbmc7XHJcbiAgICAgICAgaWYobGltaXQpe1xyXG4gICAgICAgICAgICBpZihkeDwwKXtcclxuICAgICAgICAgICAgICAgIG5vZGVzLnNvcnQoKGEsYik9PmEubG9jYXRpb24ueC1iLmxvY2F0aW9uLngpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIG5vZGVzLnNvcnQoKGEsYik9PmIubG9jYXRpb24ueC1hLmxvY2F0aW9uLngpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgdmFyIG1pblkgPSBkMy5taW4obm9kZXMsIGQ9PmQubG9jYXRpb24ueSk7XHJcbiAgICAgICAgaWYobWluWSArIGR5IDwgc2VsZi5nZXROb2RlTWluWSgpKXtcclxuICAgICAgICAgICAgZHkgPSBzZWxmLmdldE5vZGVNaW5ZKCkgLSBtaW5ZO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbm9kZXMuZm9yRWFjaChkPT57XHJcbiAgICAgICAgICAgIGlmKGxpbWl0KXtcclxuICAgICAgICAgICAgICAgIExheW91dC5iYWNrdXBOb2RlTG9jYXRpb24oZCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWluWCA9IHNlbGYuZ2V0Tm9kZU1pblgoZCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWF4WCA9IHNlbGYuZ2V0Tm9kZU1heFgoZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgZC5sb2NhdGlvbi54ID0gTWF0aC5taW4oTWF0aC5tYXgoZC5sb2NhdGlvbi54K2R4LCBtaW5YKSwgbWF4WCk7XHJcbiAgICAgICAgICAgICAgICBkLmxvY2F0aW9uLnkgKz0gZHk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgZC5sb2NhdGlvbi54ICs9ZHg7XHJcbiAgICAgICAgICAgICAgICBkLmxvY2F0aW9uLnkgKz0gZHk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICB2YXIgcmV2ZXJ0WCA9IHBpdm90ICYmIHNlbGYuY29uZmlnLmxpbWl0Tm9kZVBvc2l0aW9uaW5nICYmIChwaXZvdC5sb2NhdGlvbi54ID09PSBwaXZvdC4kbG9jYXRpb24ueCk7XHJcblxyXG4gICAgICAgIG5vZGVzLmZvckVhY2goZD0+e1xyXG4gICAgICAgICAgICBpZihyZXZlcnRYKXtcclxuICAgICAgICAgICAgICAgIGQubG9jYXRpb24ueCA9IGQuJGxvY2F0aW9uLng7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2VsZi50cmVlRGVzaWduZXIudXBkYXRlTm9kZVBvc2l0aW9uKGQpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgbW92ZVRleHRzKHRleHRzLCBkeCwgZHkpe1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgbGltaXQgPSBzZWxmLmNvbmZpZy5saW1pdFRleHRQb3NpdGlvbmluZztcclxuICAgICAgICBpZihsaW1pdCl7XHJcbiAgICAgICAgICAgIGlmKGR4PDApe1xyXG4gICAgICAgICAgICAgICAgdGV4dHMuc29ydCgoYSxiKT0+YS5sb2NhdGlvbi54LWIubG9jYXRpb24ueCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGV4dHMuc29ydCgoYSxiKT0+Yi5sb2NhdGlvbi54LWEubG9jYXRpb24ueCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgdGV4dHMuZm9yRWFjaChkPT57XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBpZihsaW1pdCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgbWluWCA9IHNlbGYuZ2V0VGV4dE1pblgoZCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbWF4WCA9IHNlbGYuZ2V0VGV4dE1heFgoZCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbWluWSA9IHNlbGYuZ2V0VGV4dE1pblkoZCk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGQubG9jYXRpb24ueCA9IE1hdGgubWluKE1hdGgubWF4KGQubG9jYXRpb24ueCtkeCwgbWluWCksIG1heFgpO1xyXG4gICAgICAgICAgICAgICAgZC5sb2NhdGlvbi55ID0gTWF0aC5tYXgoZC5sb2NhdGlvbi55K2R5LCBtaW5ZKTtcclxuXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgZC5sb2NhdGlvbi5tb3ZlKGR4LCBkeSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2VsZi50cmVlRGVzaWduZXIudXBkYXRlVGV4dFBvc2l0aW9uKGQpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGJhY2t1cE5vZGVMb2NhdGlvbihub2RlKSB7XHJcbiAgICAgICAgbm9kZS4kbG9jYXRpb24gPSBuZXcgbW9kZWwuUG9pbnQobm9kZS5sb2NhdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgX2ZpcmVPbkF1dG9MYXlvdXRDaGFuZ2VkQ2FsbGJhY2tzKCl7XHJcbiAgICAgICAgdGhpcy5vbkF1dG9MYXlvdXRDaGFuZ2VkLmZvckVhY2goYz0+Yyh0aGlzLmNvbmZpZy50eXBlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHNldEhhbmdpbmdQb3NpdGlvbihzZWxlY3Rpb24pe1xyXG4gICAgICAgIC8vIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy8gICAgIHNlbGVjdGlvbi5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy8gICAgICAgICB2YXIgaCA9ICB0aGlzLmdldEJCb3goKS5oZWlnaHQ7XHJcbiAgICAgICAgLy8gICAgICAgICBkMy5zZWxlY3QodGhpcykuYXR0cignZHknLCBoKTtcclxuICAgICAgICAvLyAgICAgfSk7XHJcbiAgICAgICAgLy8gfSwwKTtcclxuXHJcbiAgICAgICAgaWYoQXBwVXRpbHMuaXNIaWRkZW4oc2VsZWN0aW9uLm5vZGUoKSkpeyAvLyBzZXR0aW5nIGhhbmdpbmcgcG9zaXRpb24gb2YgaGlkZGVuIGVsZW1lbnRzIGZhaWxzIG9uIGZpcmVmb3hcclxuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdGlvbjtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBzZWxlY3Rpb24uZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB2YXIgaCA9ICB0aGlzLmdldEJCb3goKS5oZWlnaHQ7XHJcbiAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5hdHRyKCdkeScsICcwLjc1ZW0nKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHNlbGVjdGlvbjtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcblxyXG4iLCJpbXBvcnQge0FwcFV0aWxzfSBmcm9tICcuL2FwcC11dGlscydcclxuaW1wb3J0ICogYXMgZDMgZnJvbSAnLi9kMydcclxuaW1wb3J0IHtDb250ZXh0TWVudX0gZnJvbSAnLi9jb250ZXh0LW1lbnUvY29udGV4dC1tZW51J1xyXG5cclxuZXhwb3J0IGNsYXNzIE5vZGVEcmFnSGFuZGxlcntcclxuXHJcbiAgICB0cmVlRGVzaWduZXI7XHJcbiAgICBkYXRhO1xyXG4gICAgY29uZmlnO1xyXG5cclxuICAgIGRyYWc7XHJcbiAgICBzdGF0ZVNuYXBzaG90ID0gbnVsbDtcclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IodHJlZURlc2lnbmVyLCBkYXRhKXtcclxuICAgICAgICB0aGlzLnRyZWVEZXNpZ25lciA9IHRyZWVEZXNpZ25lcjtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG5cclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5kcmFnID0gZDMuZHJhZygpXHJcbiAgICAgICAgICAgIC5zdWJqZWN0KGZ1bmN0aW9uKGV2ZW50LCBkKSB7XHJcbiAgICAgICAgICAgICAgICBpZihkPT1udWxsKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeDogZXZlbnQueCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeTogZXZlbnQueVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgdCA9IGQzLnNlbGVjdCh0aGlzKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgeDogdC5hdHRyKFwieFwiKSArIEFwcFV0aWxzLmdldFRyYW5zbGF0aW9uKHQuYXR0cihcInRyYW5zZm9ybVwiKSlbMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgeTogdC5hdHRyKFwieVwiKSArIEFwcFV0aWxzLmdldFRyYW5zbGF0aW9uKHQuYXR0cihcInRyYW5zZm9ybVwiKSlbMV1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5vbihcInN0YXJ0XCIsIGZ1bmN0aW9uKGV2ZW50LCBkKXtcclxuICAgICAgICAgICAgICAgIHNlbGYuZHJhZ1N0YXJ0ZWQuY2FsbCh0aGlzLCBldmVudCwgZCwgc2VsZilcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLm9uKFwiZHJhZ1wiLCBmdW5jdGlvbiAoZXZlbnQsIGQpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYub25EcmFnLmNhbGwodGhpcywgZXZlbnQsIGQsIHNlbGYpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAub24oXCJlbmRcIiwgZnVuY3Rpb24gKGV2ZW50LCBkKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmRyYWdFbmRlZC5jYWxsKHRoaXMsIGV2ZW50LCBkLCBzZWxmKTtcclxuICAgICAgICAgICAgfSlcclxuICAgIH1cclxuXHJcblxyXG4gICAgZHJhZ1N0YXJ0ZWQoZXZlbnQsIGQsIHNlbGYpIHtcclxuICAgICAgICBpZihzZWxmLmlnbm9yZURyYWcpe1xyXG4gICAgICAgICAgICBzZWxmLmlnbm9yZURyYWc9ZmFsc2U7XHJcbiAgICAgICAgICAgIHNlbGYuaWdub3JlZERyYWc9dHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZWxmLmlnbm9yZWREcmFnPWZhbHNlO1xyXG4gICAgICAgIHNlbGYuc3RhdGVTbmFwc2hvdCA9IHNlbGYuZGF0YS5jcmVhdGVTdGF0ZVNuYXBzaG90KCk7XHJcblxyXG4gICAgICAgIC8vIHNlbGYudHJlZURlc2lnbmVyLmxheW91dC5kaXNhYmxlQXV0b0xheW91dCgpO1xyXG4gICAgICAgIENvbnRleHRNZW51LmhpZGUoKTtcclxuICAgICAgICB2YXIgbm9kZSA9IGQzLnNlbGVjdCh0aGlzKTtcclxuICAgICAgICBpZighbm9kZS5jbGFzc2VkKFwic2VsZWN0ZWRcIikpe1xyXG4gICAgICAgICAgICBzZWxmLnRyZWVEZXNpZ25lci5jbGVhclNlbGVjdGlvbigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZi50cmVlRGVzaWduZXIuc2VsZWN0Tm9kZShkKTtcclxuICAgICAgICBub2RlLmNsYXNzZWQoXCJzZWxlY3RlZCBkcmFnZ2luZ1wiLCB0cnVlKTtcclxuICAgICAgICBzZWxmLnNlbGVjdGVkTm9kZXMgPSBzZWxmLnRyZWVEZXNpZ25lci5nZXRTZWxlY3RlZE5vZGVzKHRydWUpO1xyXG4gICAgICAgIHNlbGYucHJldkRyYWdFdmVudCA9IGV2ZW50O1xyXG4gICAgICAgIHNlbGYuZHJhZ0V2ZW50Q291bnQgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRHJhZyhldmVudCwgZHJhZ2dlZE5vZGUsIHNlbGYpe1xyXG4gICAgICAgIGlmKHNlbGYuaWdub3JlZERyYWcpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihzZWxmLmRyYWdFdmVudENvdW50PT09MiAmJiBzZWxmLnN0YXRlU25hcHNob3Qpe1xyXG4gICAgICAgICAgICBzZWxmLmRhdGEuc2F2ZVN0YXRlRnJvbVNuYXBzaG90KHNlbGYuc3RhdGVTbmFwc2hvdCk7IC8vIFRPRE8gc2F2ZSBvbmx5IGlmIHNvbWV0aGluZyBoYXMgcmVhbGx5IGNoYW5nZWRcclxuICAgICAgICAgICAgc2VsZi5zdGF0ZVNuYXBzaG90ID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2VsZi5kcmFnRXZlbnRDb3VudCsrO1xyXG4gICAgICAgIGlmKHNlbGYuc2VsZWN0ZWROb2Rlcy5sZW5ndGg+NSAmJiBzZWxmLmRyYWdFdmVudENvdW50JTIhPT0xKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGR4ID0gZXZlbnQueCAtIHNlbGYucHJldkRyYWdFdmVudC54O1xyXG4gICAgICAgIHZhciBkeSA9IGV2ZW50LnktIHNlbGYucHJldkRyYWdFdmVudC55O1xyXG4gICAgICAgIHNlbGYudHJlZURlc2lnbmVyLmxheW91dC5tb3ZlTm9kZXMoc2VsZi5zZWxlY3RlZE5vZGVzLCBkeCwgZHksIGRyYWdnZWROb2RlKTtcclxuXHJcblxyXG4gICAgICAgIHNlbGYucHJldkRyYWdFdmVudCA9IGV2ZW50O1xyXG4gICAgICAgIHNlbGYudHJlZURlc2lnbmVyLnJlZHJhd0VkZ2VzKCk7XHJcbiAgICAgICAgc2VsZi50cmVlRGVzaWduZXIudXBkYXRlUGxvdHRpbmdSZWdpb25TaXplKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhZ0VuZGVkKGV2ZW50LCBkcmFnZ2VkTm9kZSwgc2VsZil7XHJcbiAgICAgICAgdmFyIG5vZGUgPSBkMy5zZWxlY3QodGhpcykuY2xhc3NlZChcImRyYWdnaW5nXCIsIGZhbHNlKTtcclxuICAgICAgICBpZihzZWxmLmlnbm9yZWREcmFnKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZWxmLnRyZWVEZXNpZ25lci5sYXlvdXQudXBkYXRlKGRyYWdnZWROb2RlKVxyXG4gICAgfVxyXG5cclxuICAgIGNhbmNlbERyYWcoKXtcclxuICAgICAgICB0aGlzLmlnbm9yZURyYWcgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcbiIsInZhciBlcHNpbG9uID0gMWUtMTI7XHJcbnZhciBwaSA9IE1hdGguUEk7XHJcbnZhciBoYWxmUGkgPSBwaSAvIDI7XHJcbnZhciB0YXUgPSAyICogcGk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICAvKmRyYXc6IGZ1bmN0aW9uKGNvbnRleHQsIHNpemUpIHtcclxuICAgICAgICB2YXIgciA9IE1hdGguc3FydChzaXplIC8gcGkpO1xyXG4gICAgICAgIGNvbnRleHQubW92ZVRvKHIsIDApO1xyXG4gICAgICAgIGNvbnRleHQuYXJjKDAsIDAsIHIsIDAsIHRhdSk7XHJcbiAgICB9Ki9cclxuICAgIGRyYXc6IGZ1bmN0aW9uKGNvbnRleHQsIHNpemUpIHtcclxuXHJcbiAgICAgICAgdmFyIHIgPSBNYXRoLnNxcnQoc2l6ZSAvIHBpKTtcclxuICAgICAgICB2YXIgZGlzdCA9MC41NTIyODQ3NDk4MzEgKiByO1xyXG5cclxuICAgICAgICBjb250ZXh0Lm1vdmVUbygtciwgMClcclxuICAgICAgICAvLyBjb250ZXh0LmxpbmVUbygyKnIsIDIqcilcclxuICAgICAgICAvLyBjb250ZXh0LmJlemllckN1cnZlVG8oLXIsIC1kaXN0LCAtZGlzdCwgLXIsIDAsLXIpO1xyXG4gICAgICAgIGNvbnRleHQuYmV6aWVyQ3VydmVUbygtciwgLWRpc3QsIC1kaXN0LCAtciwgMCwtcik7XHJcblxyXG4gICAgICAgIGNvbnRleHQuYmV6aWVyQ3VydmVUbyhkaXN0LCAtciwgciwgLWRpc3QsIHIsMCk7XHJcblxyXG4gICAgICAgIGNvbnRleHQuYmV6aWVyQ3VydmVUbyhyLCBkaXN0LCBkaXN0LCByLCAwLCByKTtcclxuXHJcbiAgICAgICAgY29udGV4dC5iZXppZXJDdXJ2ZVRvKC1kaXN0LCByLCAtciwgZGlzdCwgLXIsIDApO1xyXG4gICAgfVxyXG59O1xyXG4iLCJ2YXIgc3FydDMgPSBNYXRoLnNxcnQoMyk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBkcmF3OiBmdW5jdGlvbihjb250ZXh0LCBzaXplKSB7XHJcbiAgICAgICAgdmFyIHIgPSBNYXRoLnNxcnQoc2l6ZSAvIE1hdGguUEkpO1xyXG4gICAgICAgIGNvbnRleHQubW92ZVRvKC1yLCAwKTtcclxuICAgICAgICBjb250ZXh0LmxpbmVUbygwLjkqciwgLXIpO1xyXG4gICAgICAgIGNvbnRleHQubGluZVRvKDAuOSpyLCByKTtcclxuICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xyXG4gICAgfVxyXG59O1xyXG4iLCJpbXBvcnQge1V0aWxzfSBmcm9tIFwic2QtdXRpbHNcIjtcclxuaW1wb3J0IHtpMThufSBmcm9tICcuL2kxOG4vaTE4bidcclxuXHJcbmV4cG9ydCBjbGFzcyBUZW1wbGF0ZXN7XHJcblxyXG4gICAgc3RhdGljIGdyb3dsID0gcmVxdWlyZSgnLi90ZW1wbGF0ZXMvZ3Jvd2xfbWVzc2FnZS5odG1sJyk7XHJcblxyXG4gICAgc3RhdGljIGdldCh0ZW1wbGF0ZU5hbWUsIHZhcmlhYmxlcyl7XHJcbiAgICAgICAgdmFyIGNvbXBpbGVkID0gVXRpbHMudGVtcGxhdGUoVGVtcGxhdGVzW3RlbXBsYXRlTmFtZV0seyAnaW1wb3J0cyc6IHsgJ2kxOG4nOiBpMThuLCAnVGVtcGxhdGVzJzogVGVtcGxhdGVzLCAnaW5jbHVkZSc6IGZ1bmN0aW9uKG4sIHYpIHtyZXR1cm4gVGVtcGxhdGVzLmdldChuLCB2KX0gfSB9KTtcclxuICAgICAgICBpZih2YXJpYWJsZXMpe1xyXG4gICAgICAgICAgICB2YXJpYWJsZXMudmFyaWFibGVzID0gdmFyaWFibGVzO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB2YXJpYWJsZXMgPSB7dmFyaWFibGVzOnt9fVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY29tcGlsZWQodmFyaWFibGVzKVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgc3R5bGVSdWxlKHNlbGVjdG9yLCBwcm9wcyl7XHJcbiAgICAgICAgdmFyIHMgPSBzZWxlY3RvcisgJ3snO1xyXG4gICAgICAgIHByb3BzLmZvckVhY2gocD0+IHMrPVRlbXBsYXRlcy5zdHlsZVByb3AocFswXSwgcFsxXSkpO1xyXG4gICAgICAgIHMrPSd9ICc7XHJcbiAgICAgICAgcmV0dXJuIHM7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgc3R5bGVQcm9wKHN0eWxlTmFtZSwgdmFyaWFibGVOYW1lKXtcclxuICAgICAgICByZXR1cm4gIHN0eWxlTmFtZSsnOiA8JT0gJyt2YXJpYWJsZU5hbWUrJyAlPjsgJ1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyB0cmVlRGVzaWduZXJTZWxlY3RvciA9ICdzdmcuc2QtdHJlZS1kZXNpZ25lcic7XHJcbiAgICBzdGF0aWMgbm9kZVNlbGVjdG9yKHR5cGUsIGNsYXp6KXtcclxuICAgICAgICB2YXIgcyA9IFRlbXBsYXRlcy50cmVlRGVzaWduZXJTZWxlY3RvcisnIC5ub2RlJztcclxuICAgICAgICBpZih0eXBlKXtcclxuICAgICAgICAgICAgcys9Jy4nK3R5cGUrJy1ub2RlJztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoY2xhenope1xyXG4gICAgICAgICAgICBzKz0nLicrY2xheno7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGVkZ2VTZWxlY3RvcihjbGF6eil7XHJcbiAgICAgICAgdmFyIHMgPSBUZW1wbGF0ZXMudHJlZURlc2lnbmVyU2VsZWN0b3IrJyAuZWRnZSc7XHJcbiAgICAgICAgaWYoY2xhenope1xyXG4gICAgICAgICAgICBzKz0nLicrY2xheno7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyB0cmVlRGVzaWduZXJTdHlsZXMgPVxyXG5cclxuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy50cmVlRGVzaWduZXJTZWxlY3RvcixbXHJcbiAgICAgICAgICAgIFsnZm9udC1zaXplJywgJ2ZvbnRTaXplJ10sXHJcbiAgICAgICAgICAgIFsnZm9udC1mYW1pbHknLCAnZm9udEZhbWlseSddLFxyXG4gICAgICAgICAgICBbJ2ZvbnQtd2VpZ2h0JywgJ2ZvbnRXZWlnaHQnXSxcclxuICAgICAgICAgICAgWydmb250LXN0eWxlJywgJ2ZvbnRTdHlsZSddXHJcbiAgICAgICAgXSkrXHJcbiAgICAgICAgLy8gICBub2RlXHJcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCkrJyBwYXRoJyxbXHJcbiAgICAgICAgICAgIFsnZmlsbCcsICdub2RlLmZpbGwnXSxcclxuICAgICAgICAgICAgWydzdHJva2Utd2lkdGgnLCAnbm9kZS5zdHJva2VXaWR0aCddXHJcbiAgICAgICAgXSkrXHJcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCdkZWNpc2lvbicsICdvcHRpbWFsJykrJyBwYXRoLCAnK1RlbXBsYXRlcy5ub2RlU2VsZWN0b3IoJ2NoYW5jZScsICdvcHRpbWFsJykrJyBwYXRoLCcgK1RlbXBsYXRlcy5ub2RlU2VsZWN0b3IoJ3Rlcm1pbmFsJywgJ29wdGltYWwnKSsnIHBhdGgnLFtcclxuICAgICAgICAgICAgWydzdHJva2UnLCAnbm9kZS5vcHRpbWFsLnN0cm9rZSddLFxyXG4gICAgICAgICAgICBbJ3N0cm9rZS13aWR0aCcsICdub2RlLm9wdGltYWwuc3Ryb2tlV2lkdGgnXVxyXG4gICAgICAgIF0pK1xyXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLm5vZGVTZWxlY3RvcigpKycgLmxhYmVsJyxbXHJcbiAgICAgICAgICAgIFsnZm9udC1zaXplJywgJ25vZGUubGFiZWwuZm9udFNpemUnXSxcclxuICAgICAgICAgICAgWydmaWxsJywgJ25vZGUubGFiZWwuY29sb3InXVxyXG4gICAgICAgIF0pK1xyXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLm5vZGVTZWxlY3RvcigpKycgLnBheW9mZicsW1xyXG4gICAgICAgICAgICBbJ2ZvbnQtc2l6ZScsICdub2RlLnBheW9mZi5mb250U2l6ZSddLFxyXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnbm9kZS5wYXlvZmYuY29sb3InXSxcclxuICAgICAgICBdKStcclxuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5ub2RlU2VsZWN0b3IoKSsnIC5wYXlvZmYubmVnYXRpdmUnLFtcclxuICAgICAgICAgICAgWydmaWxsJywgJ25vZGUucGF5b2ZmLm5lZ2F0aXZlQ29sb3InXSxcclxuICAgICAgICBdKStcclxuXHJcbiAgICAgICAgLy8gICAgZGVjaXNpb24gbm9kZVxyXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLm5vZGVTZWxlY3RvcignZGVjaXNpb24nKSsnIHBhdGgnLFtcclxuICAgICAgICAgICAgWydmaWxsJywgJ25vZGUuZGVjaXNpb24uZmlsbCddLFxyXG4gICAgICAgICAgICBbJ3N0cm9rZScsICdub2RlLmRlY2lzaW9uLnN0cm9rZSddXHJcbiAgICAgICAgXSkrXHJcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCdkZWNpc2lvbicsICdzZWxlY3RlZCcpKycgcGF0aCcsW1xyXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnbm9kZS5kZWNpc2lvbi5zZWxlY3RlZC5maWxsJ11cclxuICAgICAgICBdKStcclxuXHJcbiAgICAgICAgLy8gICAgY2hhbmNlIG5vZGVcclxuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5ub2RlU2VsZWN0b3IoJ2NoYW5jZScpKycgcGF0aCcsW1xyXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnbm9kZS5jaGFuY2UuZmlsbCddLFxyXG4gICAgICAgICAgICBbJ3N0cm9rZScsICdub2RlLmNoYW5jZS5zdHJva2UnXVxyXG4gICAgICAgIF0pK1xyXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLm5vZGVTZWxlY3RvcignY2hhbmNlJywgJ3NlbGVjdGVkJykrJyBwYXRoJyxbXHJcbiAgICAgICAgICAgIFsnZmlsbCcsICdub2RlLmNoYW5jZS5zZWxlY3RlZC5maWxsJ11cclxuICAgICAgICBdKStcclxuXHJcbiAgICAgICAgLy8gICAgdGVybWluYWwgbm9kZVxyXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLm5vZGVTZWxlY3RvcigndGVybWluYWwnKSsnIHBhdGgnLFtcclxuICAgICAgICAgICAgWydmaWxsJywgJ25vZGUudGVybWluYWwuZmlsbCddLFxyXG4gICAgICAgICAgICBbJ3N0cm9rZScsICdub2RlLnRlcm1pbmFsLnN0cm9rZSddXHJcbiAgICAgICAgXSkrXHJcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCd0ZXJtaW5hbCcsICdzZWxlY3RlZCcpKycgcGF0aCcsW1xyXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnbm9kZS50ZXJtaW5hbC5zZWxlY3RlZC5maWxsJ11cclxuICAgICAgICBdKStcclxuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5ub2RlU2VsZWN0b3IoJ3Rlcm1pbmFsJykrJyAuYWdncmVnYXRlZC1wYXlvZmYnLFtcclxuICAgICAgICAgICAgWydmb250LXNpemUnLCAnbm9kZS50ZXJtaW5hbC5wYXlvZmYuZm9udFNpemUnXSxcclxuICAgICAgICAgICAgWydmaWxsJywgJ25vZGUudGVybWluYWwucGF5b2ZmLmNvbG9yJ10sXHJcbiAgICAgICAgXSkrXHJcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCd0ZXJtaW5hbCcpKycgLmFnZ3JlZ2F0ZWQtcGF5b2ZmLm5lZ2F0aXZlJyxbXHJcbiAgICAgICAgICAgIFsnZmlsbCcsICdub2RlLnRlcm1pbmFsLnBheW9mZi5uZWdhdGl2ZUNvbG9yJ10sXHJcbiAgICAgICAgXSkrXHJcblxyXG5cclxuICAgICAgICAvL3Byb2JhYmlsaXR5XHJcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMudHJlZURlc2lnbmVyU2VsZWN0b3IrJyAubm9kZSAucHJvYmFiaWxpdHktdG8tZW50ZXIsICcrVGVtcGxhdGVzLnRyZWVEZXNpZ25lclNlbGVjdG9yKycgLmVkZ2UgLnByb2JhYmlsaXR5JyxbXHJcbiAgICAgICAgICAgIFsnZm9udC1zaXplJywgJ3Byb2JhYmlsaXR5LmZvbnRTaXplJ10sXHJcbiAgICAgICAgICAgIFsnZmlsbCcsICdwcm9iYWJpbGl0eS5jb2xvciddXHJcbiAgICAgICAgXSkrXHJcblxyXG4gICAgICAgIC8vZWRnZVxyXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLmVkZ2VTZWxlY3RvcigpKycgcGF0aCcsW1xyXG4gICAgICAgICAgICBbJ3N0cm9rZScsICdlZGdlLnN0cm9rZSddLFxyXG4gICAgICAgICAgICBbJ3N0cm9rZS13aWR0aCcsICdlZGdlLnN0cm9rZVdpZHRoJ11cclxuICAgICAgICBdKStcclxuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy50cmVlRGVzaWduZXJTZWxlY3RvcisnIG1hcmtlciNhcnJvdyBwYXRoJyxbXHJcbiAgICAgICAgICAgIFsnZmlsbCcsICdlZGdlLnN0cm9rZSddLFxyXG4gICAgICAgIF0pK1xyXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLmVkZ2VTZWxlY3Rvcignb3B0aW1hbCcpKycgcGF0aCcsW1xyXG4gICAgICAgICAgICBbJ3N0cm9rZScsICdlZGdlLm9wdGltYWwuc3Ryb2tlJ10sXHJcbiAgICAgICAgICAgIFsnc3Ryb2tlLXdpZHRoJywgJ2VkZ2Uub3B0aW1hbC5zdHJva2VXaWR0aCddXHJcbiAgICAgICAgXSkrXHJcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMudHJlZURlc2lnbmVyU2VsZWN0b3IrJyBtYXJrZXIjYXJyb3ctb3B0aW1hbCBwYXRoJyxbXHJcbiAgICAgICAgICAgIFsnZmlsbCcsICdlZGdlLm9wdGltYWwuc3Ryb2tlJ10sXHJcbiAgICAgICAgXSkrXHJcblxyXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLmVkZ2VTZWxlY3Rvcignc2VsZWN0ZWQnKSsnIHBhdGgnLFtcclxuICAgICAgICAgICAgWydzdHJva2UnLCAnZWRnZS5zZWxlY3RlZC5zdHJva2UnXSxcclxuICAgICAgICAgICAgWydzdHJva2Utd2lkdGgnLCAnZWRnZS5zZWxlY3RlZC5zdHJva2VXaWR0aCddXHJcbiAgICAgICAgXSkrXHJcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMudHJlZURlc2lnbmVyU2VsZWN0b3IrJyBtYXJrZXIjYXJyb3ctc2VsZWN0ZWQgcGF0aCcsW1xyXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnZWRnZS5zZWxlY3RlZC5zdHJva2UnXSxcclxuICAgICAgICBdKStcclxuXHJcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMuZWRnZVNlbGVjdG9yKCkrJyAubGFiZWwnLFtcclxuICAgICAgICAgICAgWydmb250LXNpemUnLCAnZWRnZS5sYWJlbC5mb250U2l6ZSddLFxyXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnZWRnZS5sYWJlbC5jb2xvciddXHJcbiAgICAgICAgXSkrXHJcblxyXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLmVkZ2VTZWxlY3RvcigpKycgLnBheW9mZicsW1xyXG4gICAgICAgICAgICBbJ2ZvbnQtc2l6ZScsICdlZGdlLnBheW9mZi5mb250U2l6ZSddLFxyXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnZWRnZS5wYXlvZmYuY29sb3InXSxcclxuICAgICAgICBdKStcclxuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5lZGdlU2VsZWN0b3IoKSsnIC5wYXlvZmYubmVnYXRpdmUnLFtcclxuICAgICAgICAgICAgWydmaWxsJywgJ2VkZ2UucGF5b2ZmLm5lZ2F0aXZlQ29sb3InXSxcclxuICAgICAgICBdKStcclxuXHJcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMudHJlZURlc2lnbmVyU2VsZWN0b3IrJyAuc2QtdGl0bGUtY29udGFpbmVyIHRleHQuc2QtdGl0bGUnLFtcclxuICAgICAgICAgICAgWydmb250LXNpemUnLCAndGl0bGUuZm9udFNpemUnXSxcclxuICAgICAgICAgICAgWydmb250LXdlaWdodCcsICd0aXRsZS5mb250V2VpZ2h0J10sXHJcbiAgICAgICAgICAgIFsnZm9udC1zdHlsZScsICd0aXRsZS5mb250U3R5bGUnXSxcclxuICAgICAgICAgICAgWydmaWxsJywgJ3RpdGxlLmNvbG9yJ11cclxuICAgICAgICBdKSArXHJcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMudHJlZURlc2lnbmVyU2VsZWN0b3IrJyAuc2QtdGl0bGUtY29udGFpbmVyIHRleHQuc2QtZGVzY3JpcHRpb24nLFtcclxuICAgICAgICAgICAgWydmb250LXNpemUnLCAnZGVzY3JpcHRpb24uZm9udFNpemUnXSxcclxuICAgICAgICAgICAgWydmb250LXdlaWdodCcsICdkZXNjcmlwdGlvbi5mb250V2VpZ2h0J10sXHJcbiAgICAgICAgICAgIFsnZm9udC1zdHlsZScsICdkZXNjcmlwdGlvbi5mb250U3R5bGUnXSxcclxuICAgICAgICAgICAgWydmaWxsJywgJ2Rlc2NyaXB0aW9uLmNvbG9yJ11cclxuICAgICAgICBdKVxyXG59XHJcblxyXG5cclxuXHJcblxyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwibW9kdWxlLmV4cG9ydHMgPSBcXFwiPGRpdiBjbGFzcz1cXFxcXFxcInNkLWdyb3dsLW1lc3NhZ2UgPCU9dHlwZSU+XFxcXFxcXCI+XFxcXHJcXFxcbiAgICA8ZGl2IGNsYXNzPVxcXFxcXFwic2QtZ3Jvd2wtbWVzc2FnZS10ZXh0XFxcXFxcXCI+XFxcXHJcXFxcbiAgICAgICAgPCU9IG1lc3NhZ2UgJT5cXFxcclxcXFxuICAgIDwvZGl2PlxcXFxyXFxcXG48L2Rpdj5cXFxcclxcXFxuXFxcIjtcXG5cIjtcbiIsImltcG9ydCB7QXBwVXRpbHN9IGZyb20gJy4vYXBwLXV0aWxzJ1xyXG5pbXBvcnQgKiBhcyBkMyBmcm9tICcuL2QzJ1xyXG5pbXBvcnQge0NvbnRleHRNZW51fSBmcm9tICcuL2NvbnRleHQtbWVudS9jb250ZXh0LW1lbnUnXHJcblxyXG5leHBvcnQgY2xhc3MgVGV4dERyYWdIYW5kbGVye1xyXG5cclxuICAgIHRyZWVEZXNpZ25lcjtcclxuICAgIGRhdGE7XHJcbiAgICBjb25maWc7XHJcblxyXG4gICAgZHJhZztcclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IodHJlZURlc2lnbmVyLCBkYXRhKXtcclxuICAgICAgICB0aGlzLnRyZWVEZXNpZ25lciA9IHRyZWVEZXNpZ25lcjtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG5cclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5kcmFnID0gZDMuZHJhZygpXHJcbiAgICAgICAgICAgIC5zdWJqZWN0KGZ1bmN0aW9uKGV2ZW50LCBkKSB7XHJcbiAgICAgICAgICAgICAgICBpZihkPT1udWxsKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeDogZXZlbnQueCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeTogZXZlbnQueVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgdCA9IGQzLnNlbGVjdCh0aGlzKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgeDogdC5hdHRyKFwieFwiKSArIEFwcFV0aWxzLmdldFRyYW5zbGF0aW9uKHQuYXR0cihcInRyYW5zZm9ybVwiKSlbMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgeTogdC5hdHRyKFwieVwiKSArIEFwcFV0aWxzLmdldFRyYW5zbGF0aW9uKHQuYXR0cihcInRyYW5zZm9ybVwiKSlbMV1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5vbihcInN0YXJ0XCIsIGZ1bmN0aW9uKGV2ZW50LCBkKXtcclxuICAgICAgICAgICAgICAgIHNlbGYuZHJhZ1N0YXJ0ZWQuY2FsbCh0aGlzLCBldmVudCwgZCwgc2VsZilcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLm9uKFwiZHJhZ1wiLCBmdW5jdGlvbiAoZXZlbnQsIGQpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYub25EcmFnLmNhbGwodGhpcywgZXZlbnQsIGQsIHNlbGYpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAub24oXCJlbmRcIiwgZnVuY3Rpb24gKGV2ZW50LCBkKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmRyYWdFbmRlZC5jYWxsKHRoaXMsIGV2ZW50LCBkLCBzZWxmKTtcclxuICAgICAgICAgICAgfSlcclxuICAgIH1cclxuXHJcblxyXG4gICAgZHJhZ1N0YXJ0ZWQoZXZlbnQsIGQsc2VsZikge1xyXG4gICAgICAgIC8vIHNlbGYudHJlZURlc2lnbmVyLmxheW91dC5kaXNhYmxlQXV0b0xheW91dCgpO1xyXG4gICAgICAgIENvbnRleHRNZW51LmhpZGUoKTtcclxuICAgICAgICB2YXIgdGV4dCA9IGQzLnNlbGVjdCh0aGlzKTtcclxuICAgICAgICBpZighdGV4dC5jbGFzc2VkKFwic2VsZWN0ZWRcIikpe1xyXG4gICAgICAgICAgICBzZWxmLnRyZWVEZXNpZ25lci5jbGVhclNlbGVjdGlvbigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZi50cmVlRGVzaWduZXIuc2VsZWN0VGV4dChkKTtcclxuICAgICAgICB0ZXh0LmNsYXNzZWQoXCJzZWxlY3RlZCBkcmFnZ2luZ1wiLCB0cnVlKTtcclxuICAgICAgICBzZWxmLnNlbGVjdGVkTm9kZXMgPSBzZWxmLnRyZWVEZXNpZ25lci5nZXRTZWxlY3RlZE5vZGVzKCk7XHJcbiAgICAgICAgc2VsZi5wcmV2RHJhZ0V2ZW50ID0gZXZlbnQ7XHJcbiAgICAgICAgc2VsZi5kcmFnRXZlbnRDb3VudCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgb25EcmFnKGV2ZW50LCBkcmFnZ2VkVGV4dCwgc2VsZil7XHJcbiAgICAgICAgaWYoc2VsZi5kcmFnRXZlbnRDb3VudD09Mil7XHJcbiAgICAgICAgICAgIHNlbGYuZGF0YS5zYXZlU3RhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2VsZi5kcmFnRXZlbnRDb3VudCsrO1xyXG5cclxuICAgICAgICB2YXIgZHggPSBldmVudC54IC0gc2VsZi5wcmV2RHJhZ0V2ZW50Lng7XHJcbiAgICAgICAgdmFyIGR5ID0gZXZlbnQueS0gc2VsZi5wcmV2RHJhZ0V2ZW50Lnk7XHJcblxyXG4gICAgICAgIHNlbGYudHJlZURlc2lnbmVyLmxheW91dC5tb3ZlVGV4dHMoW2RyYWdnZWRUZXh0XSwgZHgsIGR5KTtcclxuXHJcbiAgICAgICAgc2VsZi5wcmV2RHJhZ0V2ZW50ID0gZXZlbnQ7XHJcbiAgICAgICAgc2VsZi50cmVlRGVzaWduZXIudXBkYXRlUGxvdHRpbmdSZWdpb25TaXplKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhZ0VuZGVkKGV2ZW50LCBkcmFnZ2VkTm9kZSwgc2VsZil7XHJcbiAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5jbGFzc2VkKFwiZHJhZ2dpbmdcIiwgZmFsc2UpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcbiIsImltcG9ydCAqIGFzIGQzIGZyb20gJy4vZDMnXHJcbmltcG9ydCB7VXRpbHN9IGZyb20gJ3NkLXV0aWxzJ1xyXG5cclxuZXhwb3J0IGNsYXNzIFRvb2x0aXAge1xyXG4gICAgc3RhdGljIGdldENvbnRhaW5lcigpe1xyXG4gICAgICAgIHJldHVybiBkMy5zZWxlY3QoXCJib2R5XCIpLnNlbGVjdE9yQXBwZW5kKCdkaXYuc2QtdG9vbHRpcCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBzaG93KGh0bWwsIHhPZmZzZXQgPSA1LCB5T2Zmc2V0ID0gMjgsIGV2ZW50LCBkdXJhdGlvbj1udWxsKSB7XHJcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IFRvb2x0aXAuZ2V0Q29udGFpbmVyKClcclxuICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCAwKTtcclxuICAgICAgICBjb250YWluZXIudHJhbnNpdGlvbigpXHJcbiAgICAgICAgICAgIC5kdXJhdGlvbigyMDApXHJcbiAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgLjk4KTtcclxuICAgICAgICBjb250YWluZXIuaHRtbChodG1sKTtcclxuICAgICAgICBUb29sdGlwLnVwZGF0ZVBvc2l0aW9uKHhPZmZzZXQsIHlPZmZzZXQsIGV2ZW50KTtcclxuICAgICAgICBpZihkdXJhdGlvbil7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIFRvb2x0aXAuaGlkZSgpO1xyXG4gICAgICAgICAgICB9LCBkdXJhdGlvbilcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHVwZGF0ZVBvc2l0aW9uKHhPZmZzZXQgPSA1LCB5T2Zmc2V0ID0gMjgsIGV2ZW50KSB7XHJcbiAgICAgICAgVG9vbHRpcC5nZXRDb250YWluZXIoKVxyXG4gICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIChldmVudC5wYWdlWCArIHhPZmZzZXQpICsgXCJweFwiKVxyXG4gICAgICAgICAgICAuc3R5bGUoXCJ0b3BcIiwgKGV2ZW50LnBhZ2VZIC0geU9mZnNldCkgKyBcInB4XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBoaWRlKGR1cmF0aW9uID0gNTAwKSB7XHJcbiAgICAgICAgdmFyIHQgPSBUb29sdGlwLmdldENvbnRhaW5lcigpO1xyXG4gICAgICAgIGlmKGR1cmF0aW9uKXtcclxuICAgICAgICAgICAgdCA9IHQudHJhbnNpdGlvbigpLmR1cmF0aW9uKGR1cmF0aW9uKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0LnN0eWxlKFwib3BhY2l0eVwiLCAwKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgYXR0YWNoKHRhcmdldCwgaHRtbE9yRm4sIHhPZmZzZXQsIHlPZmZzZXQpIHtcclxuICAgICAgICB0YXJnZXQub24oJ21vdXNlb3ZlcicsIGZ1bmN0aW9uIChldmVudCwgZCkge1xyXG4gICAgICAgICAgICBjb25zdCBpID0gdGFyZ2V0Lm5vZGVzKCkuaW5kZXhPZih0aGlzKTtcclxuICAgICAgICAgICAgdmFyIGh0bWwgPSBudWxsO1xyXG4gICAgICAgICAgICBpZiAoVXRpbHMuaXNGdW5jdGlvbihodG1sT3JGbikpIHtcclxuICAgICAgICAgICAgICAgIGh0bWwgPSBodG1sT3JGbihkLCBpKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGh0bWwgPSBodG1sT3JGbjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGh0bWwgIT09IG51bGwgJiYgaHRtbCAhPT0gdW5kZWZpbmVkICYmIGh0bWwgIT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICBUb29sdGlwLnNob3coaHRtbCwgeE9mZnNldCwgeU9mZnNldCwgZXZlbnQpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIFRvb2x0aXAuaGlkZSgwKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KS5vbignbW91c2Vtb3ZlJywgZnVuY3Rpb24gKGV2ZW50LCBkKSB7XHJcbiAgICAgICAgICAgIFRvb2x0aXAudXBkYXRlUG9zaXRpb24oeE9mZnNldCwgeU9mZnNldCwgZXZlbnQpO1xyXG4gICAgICAgIH0pLm9uKFwibW91c2VvdXRcIiwgZnVuY3Rpb24gKGV2ZW50LCBkKSB7XHJcbiAgICAgICAgICAgIFRvb2x0aXAuaGlkZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCAqIGFzIGQzIGZyb20gXCIuL2QzXCI7XHJcbmltcG9ydCB7VXRpbHN9IGZyb20gXCJzZC11dGlsc1wiO1xyXG5pbXBvcnQge0FwcFV0aWxzfSBmcm9tIFwiLi9hcHAtdXRpbHNcIjtcclxuaW1wb3J0IHtkb21haW4gYXMgbW9kZWx9IGZyb20gXCJzZC1tb2RlbFwiO1xyXG5pbXBvcnQge0NvbnRleHRNZW51fSBmcm9tIFwiLi9jb250ZXh0LW1lbnUvY29udGV4dC1tZW51XCI7XHJcbmltcG9ydCB7TWFpbkNvbnRleHRNZW51fSBmcm9tIFwiLi9jb250ZXh0LW1lbnUvbWFpbi1jb250ZXh0LW1lbnVcIjtcclxuaW1wb3J0IHtOb2RlQ29udGV4dE1lbnV9IGZyb20gXCIuL2NvbnRleHQtbWVudS9ub2RlLWNvbnRleHQtbWVudVwiO1xyXG5pbXBvcnQge0xheW91dH0gZnJvbSBcIi4vbGF5b3V0XCI7XHJcbmltcG9ydCB7Tm9kZURyYWdIYW5kbGVyfSBmcm9tIFwiLi9ub2RlLWRyYWctaGFuZGxlclwiO1xyXG5pbXBvcnQge1Rvb2x0aXB9IGZyb20gXCIuL3Rvb2x0aXBcIjtcclxuaW1wb3J0IHtUZW1wbGF0ZXN9IGZyb20gXCIuL3RlbXBsYXRlc1wiO1xyXG5pbXBvcnQge1RleHREcmFnSGFuZGxlcn0gZnJvbSBcIi4vdGV4dC1kcmFnLWhhbmRsZXJcIjtcclxuaW1wb3J0IHtUZXh0Q29udGV4dE1lbnV9IGZyb20gXCIuL2NvbnRleHQtbWVudS90ZXh0LWNvbnRleHQtbWVudVwiO1xyXG5pbXBvcnQge0VkZ2VDb250ZXh0TWVudX0gZnJvbSBcIi4vY29udGV4dC1tZW51L2VkZ2UtY29udGV4dC1tZW51XCI7XHJcbmltcG9ydCAqIGFzIEhhbW1lciBmcm9tIFwiaGFtbWVyanNcIjtcclxuaW1wb3J0IHtpMThufSBmcm9tIFwiLi9pMThuL2kxOG5cIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgVHJlZURlc2lnbmVyQ29uZmlnIHtcclxuICAgIHdpZHRoID0gdW5kZWZpbmVkO1xyXG4gICAgaGVpZ2h0ID0gdW5kZWZpbmVkO1xyXG4gICAgbWFyZ2luID0ge1xyXG4gICAgICAgIGxlZnQ6IDI1LFxyXG4gICAgICAgIHJpZ2h0OiAyNSxcclxuICAgICAgICB0b3A6IDI1LFxyXG4gICAgICAgIGJvdHRvbTogMjVcclxuICAgIH07XHJcbiAgICBzY2FsZSA9IDE7XHJcbiAgICBsbmcgPSAnZW4nO1xyXG4gICAgbGF5b3V0PSB7XHJcbiAgICAgICAgdHlwZTogJ3RyZWUnLFxyXG4gICAgICAgIG5vZGVTaXplOiA0MCxcclxuICAgICAgICBsaW1pdE5vZGVQb3NpdGlvbmluZzogdHJ1ZSxcclxuICAgICAgICBsaW1pdFRleHRQb3NpdGlvbmluZzogdHJ1ZSxcclxuICAgICAgICBncmlkSGVpZ2h0OiA3NSxcclxuICAgICAgICBncmlkV2lkdGg6IDE1MCxcclxuICAgICAgICBlZGdlU2xhbnRXaWR0aE1heDogMjBcclxuICAgIH07XHJcbiAgICBmb250RmFtaWx5ID0gJ3NhbnMtc2VyaWYnO1xyXG4gICAgZm9udFNpemUgPSAnMTJweCc7XHJcbiAgICBmb250V2VpZ2h0ID0gJ25vcm1hbCc7XHJcbiAgICBmb250U3R5bGUgPSAnbm9ybWFsJztcclxuICAgIG5vZGUgPSB7XHJcbiAgICAgICAgc3Ryb2tlV2lkdGg6ICcxcHgnLFxyXG4gICAgICAgIG9wdGltYWw6IHtcclxuICAgICAgICAgICAgc3Ryb2tlOiAnIzAwNmYwMCcsXHJcbiAgICAgICAgICAgIHN0cm9rZVdpZHRoOiAnMS41cHgnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGFiZWw6IHtcclxuICAgICAgICAgICAgZm9udFNpemU6ICcxZW0nLFxyXG4gICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGF5b2ZmOiB7XHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMWVtJyxcclxuICAgICAgICAgICAgY29sb3I6ICdibGFjaycsXHJcbiAgICAgICAgICAgIG5lZ2F0aXZlQ29sb3I6ICcjYjYwMDAwJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGVjaXNpb246IHtcclxuICAgICAgICAgICAgZmlsbDogJyNmZjc3NzcnLFxyXG4gICAgICAgICAgICBzdHJva2U6ICcjNjYwMDAwJyxcclxuXHJcbiAgICAgICAgICAgIHNlbGVjdGVkOiB7XHJcbiAgICAgICAgICAgICAgICBmaWxsOiAnI2FhMzMzMycsXHJcbiAgICAgICAgICAgICAgICAvLyBzdHJva2U6ICcjNjY2NjAwJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjaGFuY2U6IHtcclxuICAgICAgICAgICAgZmlsbDogJyNmZmZmNDQnLFxyXG4gICAgICAgICAgICBzdHJva2U6ICcjNjY2NjAwJyxcclxuXHJcbiAgICAgICAgICAgIHNlbGVjdGVkOiB7XHJcbiAgICAgICAgICAgICAgICBmaWxsOiAnI2FhYWEwMCcsXHJcbiAgICAgICAgICAgICAgICAvLyBzdHJva2U6ICcjNjY2NjAwJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB0ZXJtaW5hbDp7XHJcbiAgICAgICAgICAgIGZpbGw6ICcjNDRmZjQ0JyxcclxuICAgICAgICAgICAgc3Ryb2tlOiAnYmxhY2snLFxyXG4gICAgICAgICAgICBzZWxlY3RlZDoge1xyXG4gICAgICAgICAgICAgICAgZmlsbDogJyMwMGFhMDAnLFxyXG4gICAgICAgICAgICAgICAgLy8gc3Ryb2tlOiAnYmxhY2snXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHBheW9mZjoge1xyXG4gICAgICAgICAgICAgICAgZm9udFNpemU6ICcxZW0nLFxyXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaycsXHJcbiAgICAgICAgICAgICAgICBuZWdhdGl2ZUNvbG9yOiAnI2I2MDAwMCdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgZWRnZT17XHJcbiAgICAgICAgc3Ryb2tlOiAnIzQyNDI0MicsXHJcbiAgICAgICAgc3Ryb2tlV2lkdGg6ICcxLjUnLFxyXG4gICAgICAgIG9wdGltYWw6e1xyXG4gICAgICAgICAgICBzdHJva2U6ICcjMDA2ZjAwJyxcclxuICAgICAgICAgICAgc3Ryb2tlV2lkdGg6ICcyLjQnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2VsZWN0ZWQ6e1xyXG4gICAgICAgICAgICBzdHJva2U6ICcjMDQ1YWQxJyxcclxuICAgICAgICAgICAgc3Ryb2tlV2lkdGg6ICczLjUnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGFiZWw6IHtcclxuICAgICAgICAgICAgZm9udFNpemU6ICcxZW0nLFxyXG4gICAgICAgICAgICBjb2xvcjogJ2JhY2snXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwYXlvZmY6e1xyXG4gICAgICAgICAgICBmb250U2l6ZTogJzFlbScsXHJcbiAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snLFxyXG4gICAgICAgICAgICBuZWdhdGl2ZUNvbG9yOiAnI2I2MDAwMCdcclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuICAgIHByb2JhYmlsaXR5ID0ge1xyXG4gICAgICAgIGZvbnRTaXplOiAnMWVtJyxcclxuICAgICAgICBjb2xvcjogJyMwMDAwZDcnXHJcbiAgICB9O1xyXG4gICAgdGl0bGUgPSB7XHJcbiAgICAgICAgZm9udFNpemU6ICcxNnB4JyxcclxuICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXHJcbiAgICAgICAgZm9udFN0eWxlOiAnbm9ybWFsJyxcclxuICAgICAgICBjb2xvcjogJyMwMDAwMDAnLFxyXG4gICAgICAgIG1hcmdpbjp7XHJcbiAgICAgICAgICAgIHRvcDogMTUsXHJcbiAgICAgICAgICAgIGJvdHRvbTogMTBcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgZGVzY3JpcHRpb24gPSB7XHJcbiAgICAgICAgc2hvdzogdHJ1ZSxcclxuICAgICAgICBmb250U2l6ZTogJzEycHgnLFxyXG4gICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcclxuICAgICAgICBmb250U3R5bGU6ICdub3JtYWwnLFxyXG4gICAgICAgIGNvbG9yOiAnIzAwMDAwMCcsXHJcbiAgICAgICAgbWFyZ2luOntcclxuICAgICAgICAgICAgdG9wOiA1LFxyXG4gICAgICAgICAgICBib3R0b206IDEwXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICByZWFkT25seT0gZmFsc2U7XHJcbiAgICBkaXNhYmxlQW5pbWF0aW9ucz1mYWxzZTtcclxuICAgIGZvcmNlRnVsbEVkZ2VSZWRyYXc9ZmFsc2U7XHJcbiAgICBoaWRlTGFiZWxzPWZhbHNlO1xyXG4gICAgaGlkZVBheW9mZnM9ZmFsc2U7XHJcbiAgICBoaWRlUHJvYmFiaWxpdGllcz1mYWxzZTtcclxuICAgIHJhdz1mYWxzZTtcclxuXHJcblxyXG4gICAgcGF5b2ZmTnVtYmVyRm9ybWF0dGVyID0gKHYsIGkpPT4gdjtcclxuICAgIHByb2JhYmlsaXR5TnVtYmVyRm9ybWF0dGVyICA9ICh2KT0+IHY7XHJcblxyXG4gICAgb25Ob2RlU2VsZWN0ZWQgPSAobm9kZSkgPT4ge307XHJcbiAgICBvbkVkZ2VTZWxlY3RlZCA9IChlZGdlKSA9PiB7fTtcclxuICAgIG9uVGV4dFNlbGVjdGVkID0gKHRleHQpID0+IHt9O1xyXG4gICAgb25TZWxlY3Rpb25DbGVhcmVkID0gKCkgPT4ge307XHJcblxyXG4gICAgb3BlcmF0aW9uc0Zvck9iamVjdCA9IChvKSA9PiBbXTtcclxuICAgIHBlcmZvcm1PcGVyYXRpb24gPSAob2JqZWN0LCBvcGVyYXRpb24pID0+IFByb21pc2UucmVzb2x2ZSgpO1xyXG5cclxuICAgIHBheW9mZk5hbWVzID0gW251bGwsIG51bGxdO1xyXG4gICAgbWF4UGF5b2Zmc1RvRGlzcGxheSA9IDE7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY3VzdG9tKSB7XHJcbiAgICAgICAgaWYgKGN1c3RvbSkge1xyXG4gICAgICAgICAgICBVdGlscy5kZWVwRXh0ZW5kKHRoaXMsIGN1c3RvbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFRyZWVEZXNpZ25lciB7XHJcblxyXG4gICAgY29uZmlnO1xyXG4gICAgY29udGFpbmVyO1xyXG4gICAgZGF0YTsgLy9kYXRhIG1vZGVsIG1hbmFnZXJcclxuICAgIHN2ZztcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb250YWluZXIsIGRhdGFNb2RlbCwgY29uZmlnKXtcclxuICAgICAgICB0aGlzLnNldENvbmZpZyhjb25maWcpO1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGFNb2RlbDtcclxuICAgICAgICB0aGlzLmluaXRDb250YWluZXIoY29udGFpbmVyKTtcclxuICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRDb25maWcoY29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBuZXcgVHJlZURlc2lnbmVyQ29uZmlnKGNvbmZpZyk7XHJcbiAgICAgICAgaWYodGhpcy5sYXlvdXQpe1xyXG4gICAgICAgICAgICB0aGlzLmxheW91dC5jb25maWc9dGhpcy5jb25maWcubGF5b3V0O1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnVwZGF0ZUN1c3RvbVN0eWxlcygpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXQoKXtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0U3ZnKCk7XHJcbiAgICAgICAgdGhpcy5pbml0TGF5b3V0KCk7XHJcbiAgICAgICAgdGhpcy5pbml0STE4bigpO1xyXG4gICAgICAgIHRoaXMuaW5pdEJydXNoKCk7XHJcbiAgICAgICAgdGhpcy5pbml0RWRnZU1hcmtlcnMoKTtcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVDdXN0b21TdHlsZXMoKTtcclxuICAgICAgICBpZighdGhpcy5jb25maWcucmVhZE9ubHkpe1xyXG4gICAgICAgICAgICB0aGlzLmluaXRNYWluQ29udGV4dE1lbnUoKTtcclxuICAgICAgICAgICAgdGhpcy5pbml0Tm9kZUNvbnRleHRNZW51KCk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdEVkZ2VDb250ZXh0TWVudSgpO1xyXG4gICAgICAgICAgICB0aGlzLmluaXROb2RlRHJhZ0hhbmRsZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5pbml0VGV4dERyYWdIYW5kbGVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdFRleHRDb250ZXh0TWVudSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlZHJhdygpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRJMThuKCkge1xyXG4gICAgICAgIGkxOG4uaW5pdCh0aGlzLmNvbmZpZy5sbmcpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICB1cGRhdGVDdXN0b21TdHlsZXMoKXtcclxuICAgICAgICBkMy5zZWxlY3QoJ2hlYWQnKS5zZWxlY3RPckFwcGVuZCgnc3R5bGUjc2QtdHJlZS1kZXNpZ25lci1zdHlsZScpLmh0bWwoVGVtcGxhdGVzLmdldCgndHJlZURlc2lnbmVyU3R5bGVzJywgdGhpcy5jb25maWcpKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBpbml0TGF5b3V0KCl7XHJcbiAgICAgICAgdGhpcy5sYXlvdXQgPSBuZXcgTGF5b3V0KHRoaXMsIHRoaXMuZGF0YSwgdGhpcy5jb25maWcubGF5b3V0KTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0Tm9kZURyYWdIYW5kbGVyKCl7XHJcbiAgICAgICAgdGhpcy5ub2RlRHJhZ0hhbmRsZXIgPSBuZXcgTm9kZURyYWdIYW5kbGVyKHRoaXMsIHRoaXMuZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdFRleHREcmFnSGFuZGxlcigpe1xyXG4gICAgICAgIHRoaXMudGV4dERyYWdIYW5kbGVyID0gbmV3IFRleHREcmFnSGFuZGxlcih0aGlzLCB0aGlzLmRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZHJhdyh3aXRoVHJhbnNpdGlvbnM9ZmFsc2Upe1xyXG5cclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgd2l0aFRyYW5zaXRpb25zID0gIXNlbGYuY29uZmlnLmRpc2FibGVBbmltYXRpb25zICYmIHdpdGhUcmFuc2l0aW9ucztcclxuICAgICAgICB0aGlzLnJlZHJhd0RpYWdyYW1UaXRsZSgpO1xyXG4gICAgICAgIHRoaXMucmVkcmF3RGlhZ3JhbURlc2NyaXB0aW9uKCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTY2FsZSh3aXRoVHJhbnNpdGlvbnMpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlTWFyZ2luKHdpdGhUcmFuc2l0aW9ucyk7XHJcbiAgICAgICAgaWYod2l0aFRyYW5zaXRpb25zKXtcclxuICAgICAgICAgICAgc2VsZi50cmFuc2l0aW9uUHJldiA9IHNlbGYudHJhbnNpdGlvbjtcclxuICAgICAgICAgICAgc2VsZi50cmFuc2l0aW9uID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZWRyYXdOb2RlcygpO1xyXG4gICAgICAgIHRoaXMucmVkcmF3RWRnZXMoKTtcclxuICAgICAgICB0aGlzLnJlZHJhd0Zsb2F0aW5nVGV4dHMoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVZhbGlkYXRpb25NZXNzYWdlcygpO1xyXG4gICAgICAgIGlmKHdpdGhUcmFuc2l0aW9ucyl7XHJcbiAgICAgICAgICAgIHNlbGYudHJhbnNpdGlvbiA9ICBzZWxmLnRyYW5zaXRpb25QcmV2O1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHNlbGYudXBkYXRlUGxvdHRpbmdSZWdpb25TaXplKCk7XHJcbiAgICAgICAgfSwxMCk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXB1dGVBdmFpbGFibGVTcGFjZSgpe1xyXG4gICAgICAgIHRoaXMuYXZhaWxhYmxlSGVpZ2h0ID0gQXBwVXRpbHMuc2FuaXRpemVIZWlnaHQodGhpcy5jb25maWcuaGVpZ2h0LCB0aGlzLmNvbnRhaW5lciwgdGhpcy5jb25maWcubWFyZ2luKTtcclxuICAgICAgICB0aGlzLmF2YWlsYWJsZVdpZHRoID0gQXBwVXRpbHMuc2FuaXRpemVXaWR0aCh0aGlzLmNvbmZpZy53aWR0aCwgdGhpcy5jb250YWluZXIsIHRoaXMuY29uZmlnLm1hcmdpbik7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdFN2ZygpIHtcclxuICAgICAgICB2YXIgYyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuY29tcHV0ZUF2YWlsYWJsZVNwYWNlKCk7XHJcbiAgICAgICAgdGhpcy5zdmcgPSB0aGlzLmNvbnRhaW5lci5zZWxlY3RPckFwcGVuZCgnc3ZnLnNkLXRyZWUtZGVzaWduZXInKTtcclxuICAgICAgICB0aGlzLnN2Zy5hdHRyKCd3aWR0aCcsIHRoaXMuYXZhaWxhYmxlV2lkdGgpLmF0dHIoJ2hlaWdodCcsIHRoaXMuYXZhaWxhYmxlSGVpZ2h0KTtcclxuXHJcbiAgICAgICAgdGhpcy53cmFwcGVyR3JvdXAgPSB0aGlzLnN2Zy5zZWxlY3RPckFwcGVuZCgnZy5zZC13cmFwcGVyLWdyb3VwJyk7XHJcbiAgICAgICAgdGhpcy5tYWluR3JvdXAgPSB0aGlzLndyYXBwZXJHcm91cC5zZWxlY3RPckFwcGVuZCgnZy5tYWluLWdyb3VwJyk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTY2FsZSgpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlTWFyZ2luKCk7XHJcblxyXG5cclxuICAgICAgICBpZiAoIXRoaXMuY29uZmlnLndpZHRoKSB7XHJcbiAgICAgICAgICAgIGQzLnNlbGVjdCh3aW5kb3cpXHJcbiAgICAgICAgICAgICAgICAub24oXCJyZXNpemUudHJlZS1kZXNpZ25lclwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi51cGRhdGVQbG90dGluZ1JlZ2lvblNpemUoKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnJlZHJhd0RpYWdyYW1UaXRsZSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgbWMgPSBuZXcgSGFtbWVyLk1hbmFnZXIodGhpcy5zdmcubm9kZSgpLCB7dG91Y2hBY3Rpb24gOiAnYXV0byd9KTtcclxuICAgICAgICBtYy5hZGQobmV3IEhhbW1lci5QcmVzcyh7XHJcbiAgICAgICAgICAgIHBvaW50ZXJUeXBlOiAndG91Y2gnXHJcbiAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICBtYy5hZGQobmV3IEhhbW1lci5QaW5jaCh7XHJcbiAgICAgICAgICAgIHBvaW50ZXJUeXBlOiAndG91Y2gnXHJcbiAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICB2YXIgY2FuY2VsO1xyXG4gICAgICAgIG1jLm9uKCdwaW5jaHN0YXJ0JywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgc2VsZi5kaXNhYmxlQnJ1c2goKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIG1jLm9uKCdwaW5jaCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGNhbmNlbCA9IFV0aWxzLndhaXRGb3JGaW5hbEV2ZW50KCgpPT5zZWxmLmVuYWJsZUJydXNoKCksICdwaW5jaGVuZCcsIDUwMDApXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVNYXJnaW4od2l0aFRyYW5zaXRpb25zKXtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdmFyIG1hcmdpbiA9IHRoaXMuY29uZmlnLm1hcmdpbjtcclxuICAgICAgICB2YXIgZ3JvdXAgPSB0aGlzLm1haW5Hcm91cDtcclxuICAgICAgICBpZih3aXRoVHJhbnNpdGlvbnMpe1xyXG4gICAgICAgICAgICBncm91cCA9IGdyb3VwLnRyYW5zaXRpb24oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudG9wTWFyZ2luID0gbWFyZ2luLnRvcDtcclxuICAgICAgICBpZih0aGlzLmRpYWdyYW1UaXRsZXx8dGhpcy5kaWFncmFtRGVzY3JpcHRpb24pe1xyXG4gICAgICAgICAgICB0aGlzLnRvcE1hcmdpbiA9IHBhcnNlSW50KHRoaXMuZGlhZ3JhbVRpdGxlID8gdGhpcy5jb25maWcudGl0bGUubWFyZ2luLnRvcCA6IDApICsgdGhpcy5nZXRUaXRsZUdyb3VwSGVpZ2h0KClcclxuICAgICAgICAgICAgICAgICsgIE1hdGgubWF4KHRoaXMudG9wTWFyZ2luLCBwYXJzZUludCh0aGlzLmNvbmZpZy50aXRsZS5tYXJnaW4uYm90dG9tKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBncm91cC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKFwiICsgbWFyZ2luLmxlZnQgKyBcIixcIiArIHRoaXMudG9wTWFyZ2luICsgXCIpXCIpLm9uKFwiZW5kXCIsICgpPT4gc2VsZi51cGRhdGVQbG90dGluZ1JlZ2lvblNpemUoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0TWFyZ2luKG1hcmdpbiwgd2l0aG91dFN0YXRlU2F2aW5nKXtcclxuICAgICAgICB2YXIgc2VsZj10aGlzO1xyXG4gICAgICAgIGlmKCF3aXRob3V0U3RhdGVTYXZpbmcpe1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKHtcclxuICAgICAgICAgICAgICAgIGRhdGE6e1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbjogVXRpbHMuY2xvbmUoc2VsZi5jb25maWcubWFyZ2luKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG9uVW5kbzogKGRhdGEpPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0TWFyZ2luKGRhdGEubWFyZ2luLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBvblJlZG86IChkYXRhKT0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldE1hcmdpbihtYXJnaW4sIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgVXRpbHMuZGVlcEV4dGVuZCh0aGlzLmNvbmZpZy5tYXJnaW4sIG1hcmdpbik7XHJcbiAgICAgICAgdGhpcy5yZWRyYXdEaWFncmFtVGl0bGUoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZU1hcmdpbih0cnVlKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgdXBkYXRlU2NhbGUod2l0aFRyYW5zaXRpb25zKXtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHNjYWxlID0gdGhpcy5jb25maWcuc2NhbGU7XHJcbiAgICAgICAgdmFyIGdyb3VwID0gdGhpcy53cmFwcGVyR3JvdXA7XHJcbiAgICAgICAgaWYod2l0aFRyYW5zaXRpb25zKXtcclxuICAgICAgICAgICAgZ3JvdXAgPSBncm91cC50cmFuc2l0aW9uKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBncm91cC5hdHRyKFwidHJhbnNmb3JtXCIsIFwic2NhbGUoXCIgKyBzY2FsZSArIFwiKVwiKS5vbihcImVuZFwiLCAoKT0+IHNlbGYudXBkYXRlUGxvdHRpbmdSZWdpb25TaXplKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFNjYWxlKHNjYWxlLCB3aXRob3V0U3RhdGVTYXZpbmcpe1xyXG4gICAgICAgIHZhciBzZWxmPXRoaXM7XHJcbiAgICAgICAgaWYoIXdpdGhvdXRTdGF0ZVNhdmluZyl7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgZGF0YTp7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NhbGU6IFV0aWxzLmNsb25lKHNlbGYuY29uZmlnLnNjYWxlKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG9uVW5kbzogKGRhdGEpPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0U2NhbGUoZGF0YS5zY2FsZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgb25SZWRvOiAoZGF0YSk9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRTY2FsZShzY2FsZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvbmZpZy5zY2FsZSA9IHNjYWxlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2NhbGUodHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdENvbnRhaW5lcihjb250YWluZXJJZE9yRWxlbSkge1xyXG4gICAgICAgIGlmIChVdGlscy5pc1N0cmluZyhjb250YWluZXJJZE9yRWxlbSkpIHtcclxuICAgICAgICAgICAgdmFyIHNlbGVjdG9yID0gY29udGFpbmVySWRPckVsZW0udHJpbSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFVdGlscy5zdGFydHNXaXRoKHNlbGVjdG9yLCAnIycpICYmICFVdGlscy5zdGFydHNXaXRoKHNlbGVjdG9yLCAnLicpKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RvciA9ICcjJyArIHNlbGVjdG9yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyID0gZDMuc2VsZWN0KHNlbGVjdG9yKTtcclxuICAgICAgICB9IGVsc2UgaWYoY29udGFpbmVySWRPckVsZW0uX3BhcmVudHMpe1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcklkT3JFbGVtXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyID0gZDMuc2VsZWN0KGNvbnRhaW5lcklkT3JFbGVtKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlUGxvdHRpbmdSZWdpb25TaXplKCkge1xyXG4gICAgICAgIHZhciBjaGFuZ2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jb21wdXRlQXZhaWxhYmxlU3BhY2UoKTtcclxuICAgICAgICB2YXIgbWFyZ2luID0gdGhpcy5jb25maWcubWFyZ2luO1xyXG4gICAgICAgIHZhciBzdmdXaWR0aCA9IHRoaXMuc3ZnLmF0dHIoJ3dpZHRoJyk7XHJcbiAgICAgICAgdmFyIHN2Z0hlaWdodCA9IHRoaXMuc3ZnLmF0dHIoJ2hlaWdodCcpO1xyXG4gICAgICAgIHZhciBtYWluR3JvdXBCb3ggPSB0aGlzLm1haW5Hcm91cC5ub2RlKCkuZ2V0QkJveCgpO1xyXG4gICAgICAgIGxldCBib3hXaWR0aCA9IG1haW5Hcm91cEJveC53aWR0aDtcclxuICAgICAgICB2YXIgbmV3U3ZnV2lkdGggPSBib3hXaWR0aCttYWluR3JvdXBCb3gueCttYXJnaW4ubGVmdCttYXJnaW4ucmlnaHQ7XHJcbiAgICAgICAgbmV3U3ZnV2lkdGggICo9IHRoaXMuY29uZmlnLnNjYWxlO1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLmNsYXNzZWQoJ3dpdGgtb3ZlcmZsb3cteCcsIG5ld1N2Z1dpZHRoPj10aGlzLmF2YWlsYWJsZVdpZHRoKTtcclxuICAgICAgICBuZXdTdmdXaWR0aCA9IE1hdGgubWF4KG5ld1N2Z1dpZHRoLCB0aGlzLmF2YWlsYWJsZVdpZHRoKTtcclxuICAgICAgICBpZihzdmdXaWR0aCE9bmV3U3ZnV2lkdGgpe1xyXG4gICAgICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5zdmcuYXR0cignd2lkdGgnLCBuZXdTdmdXaWR0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBib3hIZWlnaHQgPSBtYWluR3JvdXBCb3guaGVpZ2h0O1xyXG4gICAgICAgIHZhciBuZXdTdmdIZWlnaHQgPSBib3hIZWlnaHQrbWFpbkdyb3VwQm94LnkrdGhpcy50b3BNYXJnaW4rbWFyZ2luLmJvdHRvbTtcclxuICAgICAgICBuZXdTdmdIZWlnaHQgKj0gdGhpcy5jb25maWcuc2NhbGU7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIuY2xhc3NlZCgnd2l0aC1vdmVyZmxvdy15JywgbmV3U3ZnSGVpZ2h0Pj10aGlzLmF2YWlsYWJsZUhlaWdodCk7XHJcbiAgICAgICAgbmV3U3ZnSGVpZ2h0ID0gTWF0aC5tYXgobmV3U3ZnSGVpZ2h0LCB0aGlzLmF2YWlsYWJsZUhlaWdodCk7XHJcbiAgICAgICAgaWYoc3ZnSGVpZ2h0IT1uZXdTdmdIZWlnaHQpe1xyXG4gICAgICAgICAgICBjaGFuZ2VkPXRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuc3ZnLmF0dHIoJ2hlaWdodCcsIG5ld1N2Z0hlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGNoYW5nZWQpe1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUJydXNoRXh0ZW50KClcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICByZWRyYXdOb2RlcygpIHtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG5cclxuICAgICAgICB2YXIgbm9kZXNDb250YWluZXIgPSB0aGlzLm1haW5Hcm91cC5zZWxlY3RPckFwcGVuZCgnZy5ub2RlcycpO1xyXG4gICAgICAgIHZhciBub2RlcyA9IG5vZGVzQ29udGFpbmVyLnNlbGVjdEFsbCgnLm5vZGUnKS5kYXRhKHRoaXMuZGF0YS5ub2Rlcy5maWx0ZXIoZD0+IWQuJGhpZGRlbiksIChkLGkpPT4gZC5pZCk7XHJcbiAgICAgICAgbm9kZXMuZXhpdCgpLnJlbW92ZSgpO1xyXG4gICAgICAgIHZhciBub2Rlc0VudGVyID0gbm9kZXMuZW50ZXIoKS5hcHBlbmQoJ2cnKVxyXG4gICAgICAgICAgICAuYXR0cignaWQnLCBkPT4nbm9kZS0nK2QuaWQpXHJcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGQ9PmQudHlwZSsnLW5vZGUgbm9kZScpXHJcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBkPT4ndHJhbnNsYXRlKCcgKyBkLmxvY2F0aW9uLnggKyAnICAnICsgZC5sb2NhdGlvbi55ICsgJyknKTtcclxuICAgICAgICBub2Rlc0VudGVyLmFwcGVuZCgncGF0aCcpO1xyXG5cclxuICAgICAgICB2YXIgbGFiZWxFbnRlciA9IG5vZGVzRW50ZXIuYXBwZW5kKCd0ZXh0JykuYXR0cignY2xhc3MnLCAnbGFiZWwnKTtcclxuICAgICAgICB2YXIgcGF5b2ZmRW50ZXIgPSBub2Rlc0VudGVyLmFwcGVuZCgndGV4dCcpLmF0dHIoJ2NsYXNzJywgJ3BheW9mZiBjb21wdXRlZCcpO1xyXG4gICAgICAgIHZhciBpbmRpY2F0b3JFbnRlciA9IG5vZGVzRW50ZXIuYXBwZW5kKCd0ZXh0JykuYXR0cignY2xhc3MnLCAnZXJyb3ItaW5kaWNhdG9yJykudGV4dCgnISEnKTtcclxuICAgICAgICB2YXIgYWdncmVnYXRlZFBheW9mZkVudGVyID0gbm9kZXNFbnRlci5hcHBlbmQoJ3RleHQnKS5hdHRyKCdjbGFzcycsICdhZ2dyZWdhdGVkLXBheW9mZicpO1xyXG4gICAgICAgIHZhciBwcm9iYWJpbGl0eVRvRW50ZXJFbnRlciA9IG5vZGVzRW50ZXIuYXBwZW5kKCd0ZXh0JykuYXR0cignY2xhc3MnLCAncHJvYmFiaWxpdHktdG8tZW50ZXInKTtcclxuXHJcbiAgICAgICAgdmFyIG5vZGVzTWVyZ2UgPSBub2Rlc0VudGVyLm1lcmdlKG5vZGVzKTtcclxuICAgICAgICBub2Rlc01lcmdlLmNsYXNzZWQoJ29wdGltYWwnLCAoZCk9PnNlbGYuaXNPcHRpbWFsKGQpKTtcclxuXHJcbiAgICAgICAgdmFyIG5vZGVzTWVyZ2VUID0gbm9kZXNNZXJnZTtcclxuICAgICAgICBpZih0aGlzLnRyYW5zaXRpb24pe1xyXG4gICAgICAgICAgICBub2Rlc01lcmdlVCA9IG5vZGVzTWVyZ2UudHJhbnNpdGlvbigpO1xyXG4gICAgICAgICAgICBub2Rlc01lcmdlVC5vbignZW5kJywgKCk9PiBzZWxmLnVwZGF0ZVBsb3R0aW5nUmVnaW9uU2l6ZSgpKVxyXG4gICAgICAgIH1cclxuICAgICAgICBub2Rlc01lcmdlVFxyXG4gICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgZD0+J3RyYW5zbGF0ZSgnICsgZC5sb2NhdGlvbi54ICsgJyAgJyArIGQubG9jYXRpb24ueSArICcpJylcclxuXHJcbiAgICAgICAgdmFyIHBhdGggPSBub2Rlc01lcmdlLnNlbGVjdCgncGF0aCcpO1xyXG4gICAgICAgIHRoaXMubGF5b3V0LmRyYXdOb2RlU3ltYm9sKHBhdGgsdGhpcy50cmFuc2l0aW9uKTtcclxuXHJcbiAgICAgICAgLypwYXRoXHJcbiAgICAgICAgICAgIC5zdHlsZSgnZmlsbCcsIGQ9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBpZihzZWxmLmlzTm9kZVNlbGVjdGVkKGQpKXtcclxuICAgICAgICAgICAgICAgIC8vICAgICByZXR1cm4gc2VsZi5jb25maWcubm9kZVtkLnR5cGVdLnNlbGVjdGVkLmZpbGxcclxuICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLmNvbmZpZy5ub2RlW2QudHlwZV0uZmlsbFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuc3R5bGUoJ3N0cm9rZScsIGQ9PiBzZWxmLmNvbmZpZy5ub2RlW2QudHlwZV0uc3Ryb2tlKVxyXG4gICAgICAgICAgICAuc3R5bGUoJ3N0cm9rZS13aWR0aCcsIGQ9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihzZWxmLmNvbmZpZy5ub2RlW2QudHlwZV0uc3Ryb2tlV2lkdGghPT11bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLmNvbmZpZy5ub2RlW2QudHlwZV0uc3Ryb2tlV2lkdGg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5jb25maWcubm9kZS5zdHJva2VXaWR0aDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmxheW91dC5ub2RlTGFiZWxQb3NpdGlvbihsYWJlbEVudGVyKTtcclxuICAgICAgICB2YXIgbGFiZWxNZXJnZSA9IG5vZGVzTWVyZ2Uuc2VsZWN0KCd0ZXh0LmxhYmVsJyk7XHJcbiAgICAgICAgbGFiZWxNZXJnZS5jbGFzc2VkKCdzZC1oaWRkZW4nLCB0aGlzLmNvbmZpZy5oaWRlTGFiZWxzKTtcclxuICAgICAgICB2YXIgbGFiZWxNZXJnZVQgPSBub2Rlc01lcmdlVC5zZWxlY3QoJ3RleHQubGFiZWwnKTtcclxuICAgICAgICBsYWJlbE1lcmdlVC5lYWNoKHRoaXMudXBkYXRlVGV4dExpbmVzKTtcclxuICAgICAgICB0aGlzLmxheW91dC5ub2RlTGFiZWxQb3NpdGlvbihsYWJlbE1lcmdlVClcclxuICAgICAgICAgICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXHJcblxyXG4gICAgICAgIHZhciBwYXlvZmYgPSBub2Rlc01lcmdlLnNlbGVjdCgndGV4dC5wYXlvZmYnKTtcclxuXHJcbiAgICAgICAgdmFyIHBheW9mZlRzcGFucyA9IHBheW9mZi5zZWxlY3RBbGwoJ3RzcGFuJykuZGF0YShkPT57XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gZC5kaXNwbGF5VmFsdWUoJ2NoaWxkcmVuUGF5b2ZmJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBVdGlscy5pc0FycmF5KGl0ZW0pID8gaXRlbS5maWx0ZXIoaT0+aSAhPT0gdW5kZWZpbmVkKSA6IFtpdGVtXVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHBheW9mZlRzcGFucy5leGl0KCkucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgIHZhciBwYXlvZmZUc3BhbnNNID0gcGF5b2ZmVHNwYW5zLmVudGVyKCkuYXBwZW5kKCd0c3BhbicpLm1lcmdlKHBheW9mZlRzcGFucyk7XHJcbiAgICAgICAgcGF5b2ZmVHNwYW5zTVxyXG4gICAgICAgICAgICAvLyAuYXR0cignZG9taW5hbnQtYmFzZWxpbmUnLCAnaGFuZ2luZycpXHJcbiAgICAgICAgICAgIC5hdHRyKCdkeScsIChkLGkpPT5pPjAgPyAnMS4xZW0nOiB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIC5hdHRyKCd4JywgJzAnKVxyXG4gICAgICAgICAgICAuY2xhc3NlZCgnbmVnYXRpdmUnLCBkPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGQhPT1udWxsICYmIGQ8MDtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNsYXNzZWQoJ3NkLWhpZGRlbicsIHRoaXMuY29uZmlnLmhpZGVQYXlvZmZzIHx8IHRoaXMuY29uZmlnLnJhdylcclxuICAgICAgICAgICAgLnRleHQoKGQsIGkpPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIHZhbCA9IGRcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsIT09bnVsbCA/IChpc05hTih2YWwpID8gdmFsIDogc2VsZi5jb25maWcucGF5b2ZmTnVtYmVyRm9ybWF0dGVyKHZhbCwgaSkpOiAnJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmF0dGFjaFBheW9mZlRvb2x0aXAocGF5b2ZmVHNwYW5zTSk7XHJcblxyXG5cclxuICAgICAgICB2YXIgcGF5b2ZmVCA9IHBheW9mZjtcclxuICAgICAgICBpZih0aGlzLnRyYW5zaXRpb24pe1xyXG4gICAgICAgICAgICBwYXlvZmZUID0gcGF5b2ZmLnRyYW5zaXRpb24oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubGF5b3V0Lm5vZGVQYXlvZmZQb3NpdGlvbihwYXlvZmZFbnRlcik7XHJcbiAgICAgICAgdGhpcy5sYXlvdXQubm9kZVBheW9mZlBvc2l0aW9uKHBheW9mZlQpO1xyXG5cclxuICAgICAgICB2YXIgYWdncmVnYXRlZFBheW9mZiA9IG5vZGVzTWVyZ2Uuc2VsZWN0KCd0ZXh0LmFnZ3JlZ2F0ZWQtcGF5b2ZmJyk7XHJcbiAgICAgICAgdmFyIGFnZ3JlZ2F0ZWRQYXlvZmZUc3BhbnMgPSBhZ2dyZWdhdGVkUGF5b2ZmLnNlbGVjdEFsbCgndHNwYW4nKS5kYXRhKGQ9PntcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBkLmRpc3BsYXlWYWx1ZSgnYWdncmVnYXRlZFBheW9mZicpO1xyXG4gICAgICAgICAgICByZXR1cm4gVXRpbHMuaXNBcnJheShpdGVtKSA/IGl0ZW0uZmlsdGVyKGk9PmkgIT09IHVuZGVmaW5lZCkgOiBbaXRlbV1cclxuICAgICAgICB9KTtcclxuICAgICAgICBhZ2dyZWdhdGVkUGF5b2ZmVHNwYW5zLmV4aXQoKS5yZW1vdmUoKTtcclxuICAgICAgICB2YXIgYWdncmVnYXRlZFBheW9mZlRzcGFuc00gPSBhZ2dyZWdhdGVkUGF5b2ZmVHNwYW5zLmVudGVyKCkuYXBwZW5kKCd0c3BhbicpLm1lcmdlKGFnZ3JlZ2F0ZWRQYXlvZmZUc3BhbnMpXHJcbiAgICAgICAgICAgIC5hdHRyKCdkeScsIChkLGkpPT5pPjAgPyAnMC45NWVtJzogdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAuY2xhc3NlZCgnbmVnYXRpdmUnLCBkPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGQhPT1udWxsICYmIGQ8MDtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNsYXNzZWQoJ3NkLWhpZGRlbicsIHRoaXMuY29uZmlnLmhpZGVQYXlvZmZzIHx8IHRoaXMuY29uZmlnLnJhdylcclxuICAgICAgICAgICAgLnRleHQoKHZhbCwgaSk9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsIT09bnVsbCA/IChpc05hTih2YWwpID8gdmFsIDogc2VsZi5jb25maWcucGF5b2ZmTnVtYmVyRm9ybWF0dGVyKHZhbCwgaSkpOiAnJ1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5hdHRhY2hQYXlvZmZUb29sdGlwKGFnZ3JlZ2F0ZWRQYXlvZmZUc3BhbnNNLCAnYWdncmVnYXRlZFBheW9mZicpO1xyXG5cclxuICAgICAgICB2YXIgYWdncmVnYXRlZFBheW9mZlQgPSBhZ2dyZWdhdGVkUGF5b2ZmO1xyXG4gICAgICAgIGlmKHRoaXMudHJhbnNpdGlvbil7XHJcbiAgICAgICAgICAgIGFnZ3JlZ2F0ZWRQYXlvZmZUID0gYWdncmVnYXRlZFBheW9mZi50cmFuc2l0aW9uKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmxheW91dC5ub2RlQWdncmVnYXRlZFBheW9mZlBvc2l0aW9uKGFnZ3JlZ2F0ZWRQYXlvZmZFbnRlcik7XHJcbiAgICAgICAgdGhpcy5sYXlvdXQubm9kZUFnZ3JlZ2F0ZWRQYXlvZmZQb3NpdGlvbihhZ2dyZWdhdGVkUGF5b2ZmVCk7XHJcblxyXG4gICAgICAgIHZhciBwcm9iYWJpbGl0eVRvRW50ZXIgPSBub2Rlc01lcmdlLnNlbGVjdCgndGV4dC5wcm9iYWJpbGl0eS10by1lbnRlcicpXHJcbiAgICAgICAgICAgIC50ZXh0KGQ9PntcclxuICAgICAgICAgICAgICAgIHZhciB2YWwgPSBkLmRpc3BsYXlWYWx1ZSgncHJvYmFiaWxpdHlUb0VudGVyJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsIT09bnVsbCA/IChpc05hTih2YWwpID8gdmFsIDogc2VsZi5jb25maWcucHJvYmFiaWxpdHlOdW1iZXJGb3JtYXR0ZXIodmFsKSk6ICcnXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jbGFzc2VkKCdzZC1oaWRkZW4nLCB0aGlzLmNvbmZpZy5oaWRlUHJvYmFiaWxpdGllcyB8fCB0aGlzLmNvbmZpZy5yYXcpO1xyXG4gICAgICAgIFRvb2x0aXAuYXR0YWNoKHByb2JhYmlsaXR5VG9FbnRlciwgaTE4bi50KCd0b29sdGlwLm5vZGUucHJvYmFiaWxpdHlUb0VudGVyJykpO1xyXG5cclxuXHJcbiAgICAgICAgdmFyIHByb2JhYmlsaXR5VG9FbnRlclQgPSBwcm9iYWJpbGl0eVRvRW50ZXI7XHJcbiAgICAgICAgaWYodGhpcy50cmFuc2l0aW9uKXtcclxuICAgICAgICAgICAgcHJvYmFiaWxpdHlUb0VudGVyVCA9IHByb2JhYmlsaXR5VG9FbnRlci50cmFuc2l0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubGF5b3V0Lm5vZGVQcm9iYWJpbGl0eVRvRW50ZXJQb3NpdGlvbihwcm9iYWJpbGl0eVRvRW50ZXJFbnRlcik7XHJcbiAgICAgICAgdGhpcy5sYXlvdXQubm9kZVByb2JhYmlsaXR5VG9FbnRlclBvc2l0aW9uKHByb2JhYmlsaXR5VG9FbnRlclQpO1xyXG5cclxuXHJcbiAgICAgICAgdmFyIGluZGljYXRvciA9IG5vZGVzTWVyZ2Uuc2VsZWN0KCd0ZXh0LmVycm9yLWluZGljYXRvcicpO1xyXG4gICAgICAgIGluZGljYXRvci5jbGFzc2VkKCdzZC1oaWRkZW4nLCB0aGlzLmNvbmZpZy5yYXcpXHJcbiAgICAgICAgdGhpcy5sYXlvdXQubm9kZUluZGljYXRvclBvc2l0aW9uKGluZGljYXRvckVudGVyKTtcclxuICAgICAgICB0aGlzLmxheW91dC5ub2RlSW5kaWNhdG9yUG9zaXRpb24oaW5kaWNhdG9yKTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5ub2RlRHJhZ0hhbmRsZXIpe1xyXG4gICAgICAgICAgICBub2Rlc01lcmdlLmNhbGwodGhpcy5ub2RlRHJhZ0hhbmRsZXIuZHJhZyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBub2Rlc01lcmdlLm9uKCdjb250ZXh0bWVudScsIHRoaXMubm9kZUNvbnRleHRNZW51KTtcclxuICAgICAgICBub2Rlc01lcmdlLm9uKCdkYmxjbGljaycsIHRoaXMubm9kZUNvbnRleHRNZW51KVxyXG4gICAgICAgIG5vZGVzTWVyZ2UuZWFjaChmdW5jdGlvbihkLCBpKXtcclxuICAgICAgICAgICAgdmFyIG5vZGVFbGVtID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIG1jID0gbmV3IEhhbW1lci5NYW5hZ2VyKG5vZGVFbGVtKTtcclxuICAgICAgICAgICAgbWMuYWRkKG5ldyBIYW1tZXIuUHJlc3Moe1xyXG4gICAgICAgICAgICAgICAgcG9pbnRlclR5cGU6ICd0b3VjaCdcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICBtYy5vbigncHJlc3MnLCBmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgIGlmKGUucG9pbnRlclR5cGU9PSd0b3VjaCcpe1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYubm9kZURyYWdIYW5kbGVyLmNhbmNlbERyYWcoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuXHJcblxyXG4gICAgICAgICAgICBpZihkLmZvbGRlZCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgYnV0dG9uID0gZDMuc2VsZWN0KG5vZGVFbGVtKS5zZWxlY3RPckFwcGVuZCgndGV4dC5zZC11bmZvbGQtYnV0dG9uJylcclxuICAgICAgICAgICAgICAgICAgICAudGV4dChcIlsrXVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5vbignY2xpY2sgZGJjbGljayBtb3VzZWRvd24nLCAoKT0+c2VsZi5mb2xkU3VidHJlZShkLCBmYWxzZSkpOyAvL2ZpcmVmb3ggZGV0ZWN0cyBvbmx5IG1vdXNlZG93biBldmVudCAtIHJlbGF0ZWQgdG8gZHJhZyBoYW5kbGVyXHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZi5sYXlvdXQubm9kZVVuZm9sZEJ1dHRvblBvc2l0aW9uKGJ1dHRvbik7XHJcbiAgICAgICAgICAgICAgICBUb29sdGlwLmF0dGFjaChidXR0b24sIGkxOG4udCgnY29udGV4dE1lbnUubm9kZS51bmZvbGQnKSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgZDMuc2VsZWN0KG5vZGVFbGVtKS5zZWxlY3QoJy5zZC11bmZvbGQtYnV0dG9uJykucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBhdHRhY2hQYXlvZmZUb29sdGlwKHNlbGVjdGlvbiwgcGF5b2ZmRmlsZWROYW1lID0gJ3BheW9mZicsIG9iamVjdD0nbm9kZScpe1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICBUb29sdGlwLmF0dGFjaChzZWxlY3Rpb24sIChkLCBpKT0+e1xyXG4gICAgICAgICAgICBpZihzZWxmLmNvbmZpZy5wYXlvZmZOYW1lcy5sZW5ndGg+aSAmJiBzZWxmLmNvbmZpZy5wYXlvZmZOYW1lc1tpXSAhPT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaTE4bi50KCd0b29sdGlwLicrb2JqZWN0KycuJytwYXlvZmZGaWxlZE5hbWUrJy5uYW1lZCcse3ZhbHVlOiBkLnBheW9mZiwgbnVtYmVyOiBpKzEsIG5hbWU6IHNlbGYuY29uZmlnLnBheW9mZk5hbWVzW2ldfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gaTE4bi50KCd0b29sdGlwLicrb2JqZWN0KycuJytwYXlvZmZGaWxlZE5hbWUrJy5kZWZhdWx0Jyx7dmFsdWU6IGQucGF5b2ZmLCBudW1iZXI6IHNlbGYuY29uZmlnLm1heFBheW9mZnNUb0Rpc3BsYXkgPCAyID8gJycgOiBpKzF9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVRleHRMaW5lcyhkKXsgLy9oZWxwZXIgbWV0aG9kIGZvciBzcGxpdHRpbmcgdGV4dCB0byB0c3BhbnNcclxuICAgICAgICB2YXIgbGluZXMgPSBkLm5hbWUgPyBkLm5hbWUuc3BsaXQoJ1xcbicpIDogW107XHJcbiAgICAgICAgbGluZXMucmV2ZXJzZSgpO1xyXG4gICAgICAgIHZhciB0c3BhbnMgPSBkMy5zZWxlY3QodGhpcykuc2VsZWN0QWxsKCd0c3BhbicpLmRhdGEobGluZXMpO1xyXG4gICAgICAgIHRzcGFucy5lbnRlcigpLmFwcGVuZCgndHNwYW4nKVxyXG4gICAgICAgICAgICAubWVyZ2UodHNwYW5zKVxyXG4gICAgICAgICAgICAudGV4dChsPT5sKVxyXG4gICAgICAgICAgICAuYXR0cignZHknLCAoZCxpKT0+aT4wID8gJy0xLjFlbSc6IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgLmF0dHIoJ3gnLCAnMCcpO1xyXG5cclxuICAgICAgICB0c3BhbnMuZXhpdCgpLnJlbW92ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlzT3B0aW1hbChkKXtcclxuICAgICAgICByZXR1cm4gZC5kaXNwbGF5VmFsdWUoJ29wdGltYWwnKTtcclxuICAgIH1cclxuXHJcbiAgICByZWRyYXdFZGdlcygpIHtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGVkZ2VzQ29udGFpbmVyID0gdGhpcy5tYWluR3JvdXAuc2VsZWN0T3JBcHBlbmQoJ2cuZWRnZXMnKTtcclxuICAgICAgICBpZihzZWxmLmNvbmZpZy5mb3JjZUZ1bGxFZGdlUmVkcmF3KXtcclxuICAgICAgICAgICAgZWRnZXNDb250YWluZXIuc2VsZWN0QWxsKFwiKlwiKS5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBlZGdlcyA9IGVkZ2VzQ29udGFpbmVyLnNlbGVjdEFsbCgnLmVkZ2UnKS5kYXRhKHRoaXMuZGF0YS5lZGdlcy5maWx0ZXIoZT0+IWUuJGhpZGRlbiksIChkLGkpPT4gZC5pZCk7XHJcbiAgICAgICAgZWRnZXMuZXhpdCgpLnJlbW92ZSgpO1xyXG4gICAgICAgIHZhciBlZGdlc0VudGVyID0gZWRnZXMuZW50ZXIoKS5hcHBlbmQoJ2cnKVxyXG4gICAgICAgICAgICAuYXR0cignaWQnLCBkPT4nZWRnZS0nK2QuaWQpXHJcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdlZGdlJyk7XHJcblxyXG5cclxuICAgICAgICBlZGdlc0VudGVyLmFwcGVuZCgncGF0aCcpO1xyXG4gICAgICAgIHZhciBsYWJlbEVudGVyID0gZWRnZXNFbnRlci5hcHBlbmRTZWxlY3RvcignZy5sYWJlbC1ncm91cCcpO1xyXG4gICAgICAgIGxhYmVsRW50ZXIuYXBwZW5kKCd0ZXh0JykuYXR0cignY2xhc3MnLCAnbGFiZWwnKTtcclxuICAgICAgICB2YXIgcGF5b2ZmRW50ZXIgPSBlZGdlc0VudGVyLmFwcGVuZCgndGV4dCcpLmF0dHIoJ2NsYXNzJywgJ3BheW9mZicpO1xyXG4gICAgICAgIHZhciBwcm9iYWJpbGl0eUVudGVyID0gZWRnZXNFbnRlci5hcHBlbmQoJ3RleHQnKS5hdHRyKCdjbGFzcycsICdwcm9iYWJpbGl0eScpO1xyXG5cclxuXHJcbiAgICAgICAgdmFyIGVkZ2VzTWVyZ2UgPSBlZGdlc0VudGVyLm1lcmdlKGVkZ2VzKTtcclxuXHJcblxyXG4gICAgICAgIHZhciBvcHRpbWFsQ2xhc3NOYW1lID0gJ29wdGltYWwnO1xyXG4gICAgICAgIGVkZ2VzTWVyZ2UuY2xhc3NlZChvcHRpbWFsQ2xhc3NOYW1lLCAoZCk9PnNlbGYuaXNPcHRpbWFsKGQpKTtcclxuXHJcbiAgICAgICAgdmFyIGVkZ2VzTWVyZ2VUID0gZWRnZXNNZXJnZTtcclxuICAgICAgICBpZih0aGlzLnRyYW5zaXRpb24pe1xyXG4gICAgICAgICAgICBlZGdlc01lcmdlVCA9IGVkZ2VzTWVyZ2UudHJhbnNpdGlvbigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZWRnZXNNZXJnZVQuc2VsZWN0KCdwYXRoJylcclxuICAgICAgICAgICAgLmF0dHIoJ2QnLCBkPT4gdGhpcy5sYXlvdXQuZWRnZUxpbmVEKGQpKVxyXG4gICAgICAgICAgICAvLyAuYXR0cihcInN0cm9rZVwiLCBcImJsYWNrXCIpXHJcbiAgICAgICAgICAgIC8vIC5hdHRyKFwic3Ryb2tlLXdpZHRoXCIsIDIpXHJcbiAgICAgICAgICAgIC5hdHRyKFwiZmlsbFwiLCBcIm5vbmVcIilcclxuICAgICAgICAgICAgLmF0dHIoXCJtYXJrZXItZW5kXCIsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzdWZmaXggPSBkMy5zZWxlY3QodGhpcy5wYXJlbnROb2RlKS5jbGFzc2VkKCdzZWxlY3RlZCcpID8gJy1zZWxlY3RlZCcgOiAoc2VsZi5pc09wdGltYWwoZCk/Jy1vcHRpbWFsJzonJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJ1cmwoI2Fycm93XCIrIHN1ZmZpeCtcIilcIlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8gLmF0dHIoXCJzaGFwZS1yZW5kZXJpbmdcIiwgXCJvcHRpbWl6ZVF1YWxpdHlcIilcclxuXHJcblxyXG4gICAgICAgIGVkZ2VzTWVyZ2Uub24oJ2NsaWNrJywgKGV2ZW50LCBkKSA9PiB7XHJcbiAgICAgICAgICAgIHNlbGYuc2VsZWN0RWRnZShkLCB0cnVlKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmxheW91dC5lZGdlTGFiZWxQb3NpdGlvbihsYWJlbEVudGVyKTtcclxuICAgICAgICBlZGdlc01lcmdlVC5zZWxlY3QoJ3RleHQubGFiZWwnKS5lYWNoKHRoaXMudXBkYXRlVGV4dExpbmVzKTtcclxuICAgICAgICB2YXIgbGFiZWxNZXJnZSA9IGVkZ2VzTWVyZ2Uuc2VsZWN0KCdnLmxhYmVsLWdyb3VwJyk7XHJcbiAgICAgICAgbGFiZWxNZXJnZS5jbGFzc2VkKCdzZC1oaWRkZW4nLCB0aGlzLmNvbmZpZy5oaWRlTGFiZWxzKTtcclxuICAgICAgICB2YXIgbGFiZWxNZXJnZVQgPSBlZGdlc01lcmdlVC5zZWxlY3QoJ2cubGFiZWwtZ3JvdXAnKTtcclxuICAgICAgICB0aGlzLmxheW91dC5lZGdlTGFiZWxQb3NpdGlvbihsYWJlbE1lcmdlVCk7XHJcbiAgICAgICAgICAgIC8vIC50ZXh0KGQ9PmQubmFtZSk7XHJcblxyXG4gICAgICAgIHZhciBwYXlvZmYgPSBlZGdlc01lcmdlLnNlbGVjdCgndGV4dC5wYXlvZmYnKTtcclxuXHJcbiAgICAgICAgdmFyIHBheW9mZlRzcGFucyA9IHBheW9mZi5zZWxlY3RBbGwoJ3RzcGFuJykuZGF0YShkID0+IHtcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBkLmRpc3BsYXlWYWx1ZSgncGF5b2ZmJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBVdGlscy5pc0FycmF5KGl0ZW0pID8gaXRlbS5zbGljZSgwLCBNYXRoLm1pbihpdGVtLmxlbmd0aCwgc2VsZi5jb25maWcubWF4UGF5b2Zmc1RvRGlzcGxheSkpLm1hcChfPT5kKSA6IFtkXTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBwYXlvZmZUc3BhbnMuZXhpdCgpLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICB2YXIgcGF5b2ZmVHNwYW5zTSA9IHBheW9mZlRzcGFucy5lbnRlcigpLmFwcGVuZCgndHNwYW4nKS5tZXJnZShwYXlvZmZUc3BhbnMpO1xyXG4gICAgICAgIHBheW9mZlRzcGFuc01cclxuICAgICAgICAvLyAuYXR0cignZG9taW5hbnQtYmFzZWxpbmUnLCAnaGFuZ2luZycpXHJcbiAgICAgICAgICAgIC5hdHRyKCdkeScsIChkLGkpPT5pPjAgPyAnMS4xZW0nOiB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIC8vIC5hdHRyKCd4JywgJzAnKVxyXG5cclxuICAgICAgICAgICAgLy8gLmF0dHIoJ2RvbWluYW50LWJhc2VsaW5lJywgJ2hhbmdpbmcnKVxyXG4gICAgICAgICAgICAuY2xhc3NlZCgnbmVnYXRpdmUnLCAoZCwgaSk9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmFsID0gZC5kaXNwbGF5UGF5b2ZmKHVuZGVmaW5lZCwgaSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsIT09bnVsbCAmJiB2YWw8MDtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNsYXNzZWQoJ3NkLWhpZGRlbicsIHRoaXMuY29uZmlnLmhpZGVQYXlvZmZzKVxyXG4gICAgICAgICAgICAvLyAudGV4dChkPT4gaXNOYU4oZC5wYXlvZmYpID8gZC5wYXlvZmYgOiBzZWxmLmNvbmZpZy5wYXlvZmZOdW1iZXJGb3JtYXR0ZXIoZC5wYXlvZmYpKVxyXG4gICAgICAgICAgICAudGV4dCgoZCwgaSk9PntcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuY29uZmlnLnJhdyl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQucGF5b2ZmW2ldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gZC5kaXNwbGF5VmFsdWUoJ3BheW9mZicpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW1zID0gVXRpbHMuaXNBcnJheShpdGVtKSA/IGl0ZW0gOiBbaXRlbV07XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHZhbCA9IGl0ZW1zW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNOYU4odmFsKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5jb25maWcucGF5b2ZmTnVtYmVyRm9ybWF0dGVyKHZhbCwgaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChVdGlscy5pc1N0cmluZyh2YWwpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkLnBheW9mZltpXSAhPT0gbnVsbCAmJiAhaXNOYU4oZC5wYXlvZmZbaV0pKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLmNvbmZpZy5wYXlvZmZOdW1iZXJGb3JtYXR0ZXIoZC5wYXlvZmZbaV0sIGkpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBkLnBheW9mZltpXTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICBUb29sdGlwLmF0dGFjaChwYXlvZmZUc3BhbnNNLCAoZCwgaSk9PntcclxuICAgICAgICAgICAgaWYoc2VsZi5jb25maWcucGF5b2ZmTmFtZXMubGVuZ3RoPmkgJiYgc2VsZi5jb25maWcucGF5b2ZmTmFtZXNbaV0gIT09IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGkxOG4udCgndG9vbHRpcC5lZGdlLnBheW9mZi5uYW1lZCcse3ZhbHVlOiBkLnBheW9mZltpXSwgbnVtYmVyOiBpKzEsIG5hbWU6IHNlbGYuY29uZmlnLnBheW9mZk5hbWVzW2ldfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gaTE4bi50KCd0b29sdGlwLmVkZ2UucGF5b2ZmLmRlZmF1bHQnLHt2YWx1ZTogZC5wYXlvZmZbaV0sIG51bWJlcjogc2VsZi5jb25maWcubWF4UGF5b2Zmc1RvRGlzcGxheSA8IDIgPyAnJyA6IGkrMX0pXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHZhciBwYXlvZmZUZXh0VCA9IHBheW9mZjtcclxuICAgICAgICBpZih0aGlzLnRyYW5zaXRpb24pe1xyXG4gICAgICAgICAgICBwYXlvZmZUZXh0VCA9IHBheW9mZi50cmFuc2l0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubGF5b3V0LmVkZ2VQYXlvZmZQb3NpdGlvbihwYXlvZmZFbnRlcik7XHJcbiAgICAgICAgdGhpcy5sYXlvdXQuZWRnZVBheW9mZlBvc2l0aW9uKHBheW9mZlRleHRUKTtcclxuXHJcbiAgICAgICAgVG9vbHRpcC5hdHRhY2goZWRnZXNNZXJnZS5zZWxlY3QoJ3RleHQucHJvYmFiaWxpdHknKSwgZD0+aTE4bi50KCd0b29sdGlwLmVkZ2UucHJvYmFiaWxpdHknLHt2YWx1ZTogZC5wcm9iYWJpbGl0eT09PSB1bmRlZmluZWQgPyBkLmRpc3BsYXlQcm9iYWJpbGl0eSgpIDogZC5wcm9iYWJpbGl0eX0pKTtcclxuXHJcbiAgICAgICAgZWRnZXNNZXJnZS5zZWxlY3QoJ3RleHQucHJvYmFiaWxpdHknKVxyXG4gICAgICAgICAgICAuY2xhc3NlZCgnc2QtaGlkZGVuJywgdGhpcy5jb25maWcuaGlkZVByb2JhYmlsaXRpZXMpO1xyXG4gICAgICAgIHZhciBwcm9iYWJpbGl0eU1lcmdlID0gZWRnZXNNZXJnZS5zZWxlY3QoJ3RleHQucHJvYmFiaWxpdHknKTtcclxuICAgICAgICBwcm9iYWJpbGl0eU1lcmdlXHJcbiAgICAgICAgICAgIC5hdHRyKCd0ZXh0LWFuY2hvcicsICdlbmQnKVxyXG4gICAgICAgICAgICAudGV4dChkPT57XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmNvbmZpZy5yYXcpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkLnByb2JhYmlsaXR5O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIHZhbCA9IGQuZGlzcGxheVByb2JhYmlsaXR5KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYodmFsIT09bnVsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIWlzTmFOKHZhbCkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5jb25maWcucHJvYmFiaWxpdHlOdW1iZXJGb3JtYXR0ZXIodmFsKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoVXRpbHMuaXNTdHJpbmcodmFsKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKGQucHJvYmFiaWxpdHkhPT1udWxsICYmICFpc05hTihkLnByb2JhYmlsaXR5KSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5jb25maWcucHJvYmFiaWxpdHlOdW1iZXJGb3JtYXR0ZXIoZC5wcm9iYWJpbGl0eSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGQucHJvYmFiaWxpdHk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIHZhciBwcm9iYWJpbGl0eU1lcmdlVCA9IHByb2JhYmlsaXR5TWVyZ2U7XHJcbiAgICAgICAgaWYodGhpcy50cmFuc2l0aW9uKXtcclxuICAgICAgICAgICAgcHJvYmFiaWxpdHlNZXJnZVQgPSBwcm9iYWJpbGl0eU1lcmdlLnRyYW5zaXRpb24oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubGF5b3V0LmVkZ2VQcm9iYWJpbGl0eVBvc2l0aW9uKHByb2JhYmlsaXR5RW50ZXIpO1xyXG4gICAgICAgIHRoaXMubGF5b3V0LmVkZ2VQcm9iYWJpbGl0eVBvc2l0aW9uKHByb2JhYmlsaXR5TWVyZ2VUKTtcclxuXHJcblxyXG4gICAgICAgIGVkZ2VzQ29udGFpbmVyLnNlbGVjdEFsbCgnLmVkZ2UuJytvcHRpbWFsQ2xhc3NOYW1lKS5yYWlzZSgpO1xyXG5cclxuICAgICAgICBlZGdlc01lcmdlLm9uKCdjb250ZXh0bWVudScsIHRoaXMuZWRnZUNvbnRleHRNZW51KTtcclxuICAgICAgICBlZGdlc01lcmdlLm9uKCdkYmxjbGljaycsIHRoaXMuZWRnZUNvbnRleHRNZW51KTtcclxuICAgICAgICBlZGdlc01lcmdlLmVhY2goZnVuY3Rpb24oZCwgaSl7XHJcbiAgICAgICAgICAgIHZhciBlbGVtID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIG1jID0gbmV3IEhhbW1lci5NYW5hZ2VyKGVsZW0pO1xyXG4gICAgICAgICAgICBtYy5hZGQobmV3IEhhbW1lci5QcmVzcyh7XHJcbiAgICAgICAgICAgICAgICBwb2ludGVyVHlwZTogSGFtbWVyLlBPSU5URVJfVE9VQ0hcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcmVkcmF3RmxvYXRpbmdUZXh0cygpIHtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG5cclxuICAgICAgICB2YXIgdGV4dHNDb250YWluZXIgPSB0aGlzLm1haW5Hcm91cC5zZWxlY3RPckFwcGVuZCgnZy5mbG9hdGluZy10ZXh0cycpO1xyXG4gICAgICAgIHZhciB0ZXh0cyA9IHRleHRzQ29udGFpbmVyLnNlbGVjdEFsbCgnLmZsb2F0aW5nLXRleHQnKS5kYXRhKHRoaXMuZGF0YS50ZXh0cywgKGQsaSk9PiBkLmlkKTtcclxuICAgICAgICB0ZXh0cy5leGl0KCkucmVtb3ZlKCk7XHJcbiAgICAgICAgdmFyIHRleHRzRW50ZXIgPSB0ZXh0cy5lbnRlcigpLmFwcGVuZFNlbGVjdG9yKCdnLmZsb2F0aW5nLXRleHQnKVxyXG4gICAgICAgICAgICAuYXR0cignaWQnLCBkPT4ndGV4dC0nK2QuaWQpO1xyXG5cclxuXHJcbiAgICAgICAgdmFyIHJlY3RXaWR0aCA9IDQwO1xyXG4gICAgICAgIHZhciByZWN0SGVpZ2h0ID0gMjA7XHJcblxyXG4gICAgICAgIHRleHRzRW50ZXIuYXBwZW5kKCdyZWN0JykuYXR0cigneCcsIC01KS5hdHRyKCd5JywgLTE2KS5hdHRyKCdmaWxsLW9wYWNpdHknLCAwKTtcclxuICAgICAgICB0ZXh0c0VudGVyLmFwcGVuZCgndGV4dCcpO1xyXG5cclxuICAgICAgICB2YXIgdGV4dHNNZXJnZSA9IHRleHRzRW50ZXIubWVyZ2UodGV4dHMpO1xyXG4gICAgICAgIHZhciB0ZXh0c01lcmdlVCA9IHRleHRzTWVyZ2U7XHJcbiAgICAgICAgaWYodGhpcy50cmFuc2l0aW9uKXtcclxuICAgICAgICAgICAgdGV4dHNNZXJnZVQgPSB0ZXh0c01lcmdlLnRyYW5zaXRpb24oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRleHRzTWVyZ2VULmF0dHIoJ3RyYW5zZm9ybScsIGQ9Pid0cmFuc2xhdGUoJyArIGQubG9jYXRpb24ueCArICcgICcgKyBkLmxvY2F0aW9uLnkgKyAnKScpO1xyXG5cclxuICAgICAgICB2YXIgdHNwYW5zID0gdGV4dHNNZXJnZS5zZWxlY3QoJ3RleHQnKS5zZWxlY3RBbGwoJ3RzcGFuJykuZGF0YShkPT5kLnZhbHVlID8gZC52YWx1ZS5zcGxpdCgnXFxuJykgOiBbXSk7XHJcblxyXG4gICAgICAgIHRzcGFucy5lbnRlcigpLmFwcGVuZCgndHNwYW4nKVxyXG4gICAgICAgICAgICAubWVyZ2UodHNwYW5zKVxyXG4gICAgICAgICAgICAuaHRtbChsPT5BcHBVdGlscy5yZXBsYWNlVXJscyhBcHBVdGlscy5lc2NhcGVIdG1sKGwpKSlcclxuICAgICAgICAgICAgLmF0dHIoJ2R5JywgKGQsaSk9Pmk+MCA/ICcxLjFlbSc6IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgLmF0dHIoJ3gnLCAnMCcpO1xyXG5cclxuICAgICAgICB0c3BhbnMuZXhpdCgpLnJlbW92ZSgpO1xyXG4gICAgICAgIHRleHRzTWVyZ2UuY2xhc3NlZCgnc2QtZW1wdHknLCBkPT4hZC52YWx1ZSB8fCAhZC52YWx1ZS50cmltKCkpO1xyXG4gICAgICAgIHRleHRzTWVyZ2Uuc2VsZWN0KCdyZWN0JykuYXR0cignd2lkdGgnLCByZWN0V2lkdGgpLmF0dHIoJ2hlaWdodCcsIHJlY3RIZWlnaHQpO1xyXG5cclxuICAgICAgICB0ZXh0c01lcmdlLmVhY2goZnVuY3Rpb24oZCl7XHJcbiAgICAgICAgICAgIGlmKCFkLnZhbHVlKXtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgYmIgPSBkMy5zZWxlY3QodGhpcykuc2VsZWN0KCd0ZXh0Jykubm9kZSgpLmdldEJCb3goKTtcclxuICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuc2VsZWN0KCdyZWN0JylcclxuICAgICAgICAgICAgICAgLmF0dHIoJ3knLCBiYi55LTUpXHJcbiAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIE1hdGgubWF4KGJiLndpZHRoKzEwLCByZWN0V2lkdGgpKVxyXG4gICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgTWF0aC5tYXgoYmIuaGVpZ2h0KzEwLCByZWN0SGVpZ2h0KSlcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYodGhpcy50ZXh0RHJhZ0hhbmRsZXIpe1xyXG4gICAgICAgICAgICB0ZXh0c01lcmdlLmNhbGwodGhpcy50ZXh0RHJhZ0hhbmRsZXIuZHJhZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRleHRzTWVyZ2Uub24oJ2NvbnRleHRtZW51JywgdGhpcy50ZXh0Q29udGV4dE1lbnUpO1xyXG4gICAgICAgIHRleHRzTWVyZ2Uub24oJ2RibGNsaWNrJywgdGhpcy50ZXh0Q29udGV4dE1lbnUpO1xyXG4gICAgICAgIHRleHRzTWVyZ2UuZWFjaChmdW5jdGlvbihkLCBpKXtcclxuICAgICAgICAgICAgdmFyIGVsZW0gPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgbWMgPSBuZXcgSGFtbWVyLk1hbmFnZXIoZWxlbSk7XHJcbiAgICAgICAgICAgIG1jLmFkZChuZXcgSGFtbWVyLlByZXNzKHtcclxuICAgICAgICAgICAgICAgIHBvaW50ZXJUeXBlOiAndG91Y2gnXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVWYWxpZGF0aW9uTWVzc2FnZXMoKSB7XHJcbiAgICAgICAgdmFyIG5vZGVzID0gdGhpcy5tYWluR3JvdXAuc2VsZWN0QWxsKCcubm9kZScpO1xyXG4gICAgICAgIG5vZGVzLmNsYXNzZWQoJ2Vycm9yJywgZmFsc2UpO1xyXG5cclxuICAgICAgICB0aGlzLmRhdGEudmFsaWRhdGlvblJlc3VsdHMuZm9yRWFjaCh2YWxpZGF0aW9uUmVzdWx0PT57XHJcbiAgICAgICAgICAgIGlmKHZhbGlkYXRpb25SZXN1bHQuaXNWYWxpZCgpKXtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModmFsaWRhdGlvblJlc3VsdC5vYmplY3RJZFRvRXJyb3IpLmZvckVhY2goaWQ9PntcclxuICAgICAgICAgICAgICAgIHZhciBlcnJvcnMgPSB2YWxpZGF0aW9uUmVzdWx0Lm9iamVjdElkVG9FcnJvcltpZF07XHJcbiAgICAgICAgICAgICAgICB2YXIgbm9kZVNlbGVjdGlvbiA9IHRoaXMuZ2V0Tm9kZUQzU2VsZWN0aW9uQnlJZChpZCk7XHJcbiAgICAgICAgICAgICAgICBub2RlU2VsZWN0aW9uLmNsYXNzZWQoJ2Vycm9yJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgdG9vbHRpcEh0bWwgPSAnJztcclxuICAgICAgICAgICAgICAgIGVycm9ycy5mb3JFYWNoKGU9PntcclxuICAgICAgICAgICAgICAgICAgICBpZih0b29sdGlwSHRtbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXBIdG1sKz0nPGJyLz4nXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXBIdG1sKz1BcHBVdGlscy5nZXRWYWxpZGF0aW9uTWVzc2FnZShlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIFRvb2x0aXAuYXR0YWNoKG5vZGVTZWxlY3Rpb24uc2VsZWN0KCcuZXJyb3ItaW5kaWNhdG9yJyksIHRvb2x0aXBIdG1sKTtcclxuXHJcblxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBpbml0RWRnZU1hcmtlcnMoKSB7XHJcbiAgICAgICAgdmFyIGRlZnMgPSB0aGlzLnN2Zy5hcHBlbmQoXCJzdmc6ZGVmc1wiKTtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0QXJyb3dNYXJrZXIoXCJhcnJvd1wiKTtcclxuICAgICAgICB0aGlzLmluaXRBcnJvd01hcmtlcihcImFycm93LW9wdGltYWxcIik7XHJcbiAgICAgICAgdGhpcy5pbml0QXJyb3dNYXJrZXIoXCJhcnJvdy1zZWxlY3RlZFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0QXJyb3dNYXJrZXIoaWQpIHtcclxuXHJcbiAgICAgICAgdmFyIGRlZnMgPSB0aGlzLnN2Zy5zZWxlY3QoXCJkZWZzXCIpO1xyXG4gICAgICAgIGRlZnMuYXBwZW5kKFwibWFya2VyXCIpXHJcbiAgICAgICAgICAgIC5hdHRyKFwiaWRcIixpZClcclxuICAgICAgICAgICAgLmF0dHIoXCJ2aWV3Qm94XCIsXCIwIC01IDEwIDEwXCIpXHJcbiAgICAgICAgICAgIC5hdHRyKFwicmVmWFwiLDUpXHJcbiAgICAgICAgICAgIC5hdHRyKFwicmVmWVwiLDApXHJcbiAgICAgICAgICAgIC5hdHRyKFwibWFya2VyV2lkdGhcIiw0KVxyXG4gICAgICAgICAgICAuYXR0cihcIm1hcmtlckhlaWdodFwiLDQpXHJcbiAgICAgICAgICAgIC5hdHRyKFwib3JpZW50XCIsXCJhdXRvXCIpXHJcbiAgICAgICAgICAgIC5hcHBlbmQoXCJwYXRoXCIpXHJcbiAgICAgICAgICAgIC5hdHRyKFwiZFwiLCBcIk0wLC01TDEwLDBMMCw1XCIpXHJcbiAgICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIixcImFycm93SGVhZFwiKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVCcnVzaEV4dGVudCgpIHtcclxuICAgICAgICB2YXIgc2VsZiA9dGhpcztcclxuICAgICAgICB0aGlzLmJydXNoLmV4dGVudChbWzAsIDBdLCBbc2VsZi5zdmcuYXR0cignd2lkdGgnKSwgc2VsZi5zdmcuYXR0cignaGVpZ2h0JyldXSk7XHJcbiAgICAgICAgdGhpcy5icnVzaENvbnRhaW5lci5jYWxsKHRoaXMuYnJ1c2gpO1xyXG4gICAgfVxyXG4gICAgaW5pdEJydXNoKCkge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgdmFyIGJydXNoQ29udGFpbmVyID0gc2VsZi5icnVzaENvbnRhaW5lciA9IHRoaXMuYnJ1c2hDb250YWluZXI9IHRoaXMud3JhcHBlckdyb3VwLnNlbGVjdE9ySW5zZXJ0KFwiZy5icnVzaFwiLCBcIjpmaXJzdC1jaGlsZFwiKVxyXG4gICAgICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwiYnJ1c2hcIik7XHJcblxyXG4gICAgICAgIHZhciBicnVzaCA9IHRoaXMuYnJ1c2ggPSBkMy5icnVzaCgpXHJcbiAgICAgICAgICAgIC5vbihcInN0YXJ0XCIsIGJydXNoc3RhcnQpXHJcbiAgICAgICAgICAgIC5vbihcImJydXNoXCIsIGJydXNobW92ZSlcclxuICAgICAgICAgICAgLm9uKFwiZW5kXCIsIGJydXNoZW5kKTtcclxuXHJcblxyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZUJydXNoRXh0ZW50KCk7XHJcblxyXG4gICAgICAgIGJydXNoQ29udGFpbmVyLnNlbGVjdCgnLm92ZXJsYXknKS5vbihcIm1vdXNlbW92ZS5lZGdlU2VsZWN0aW9uXCIsIG1vdXNlbW92ZWQpO1xyXG4gICAgICAgIGZ1bmN0aW9uIG1vdXNlbW92ZWQoZXZlbnQpIHtcclxuICAgICAgICAgICAgdmFyIG0gPSBkMy5wb2ludGVyKGV2ZW50KTtcclxuICAgICAgICAgICAgdmFyIG1ndCA9IHNlbGYuZ2V0TWFpbkdyb3VwVHJhbnNsYXRpb24oKTtcclxuICAgICAgICAgICAgdmFyIG1hcmdpbiA9IDEwO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNsb3Nlc3QgPSBbbnVsbCwgOTk5OTk5OTk5XTtcclxuICAgICAgICAgICAgdmFyIGNsb3NlRWRnZXMgPSBbXTtcclxuICAgICAgICAgICAgc2VsZi5tYWluR3JvdXAuc2VsZWN0QWxsKCcuZWRnZScpLmVhY2goZnVuY3Rpb24oZCl7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2VsZWN0aW9uID0gZDMuc2VsZWN0KHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uLmNsYXNzZWQoJ3NkLWhvdmVyJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHBhdGhOb2RlID0gc2VsZWN0aW9uLnNlbGVjdCgncGF0aCcpLm5vZGUoKTtcclxuICAgICAgICAgICAgICAgIHZhciBiID0gcGF0aE5vZGUuZ2V0QkJveCgpO1xyXG4gICAgICAgICAgICAgICAgaWYoYi54K21ndFswXSA8PW1bMF0gJiYgYi54K2Iud2lkdGgrbWd0WzBdID49IG1bMF0gJiZcclxuICAgICAgICAgICAgICAgICAgIGIueSttZ3RbMV0tbWFyZ2luIDw9bVsxXSAmJiBiLnkrYi5oZWlnaHQrbWd0WzFdK21hcmdpbiA+PSBtWzFdKXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNwID0gQXBwVXRpbHMuY2xvc2VzdFBvaW50KHBhdGhOb2RlLCBbbVswXS1tZ3RbMF0sIG1bMV0tbWd0WzFdXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY3AuZGlzdGFuY2UgPCBtYXJnaW4gJiYgY3AuZGlzdGFuY2U8Y2xvc2VzdFsxXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlc3QgPSBbc2VsZWN0aW9uLCBjcC5kaXN0YW5jZV07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBzZWxmLmhvdmVyZWRFZGdlID0gbnVsbDtcclxuICAgICAgICAgICAgaWYoY2xvc2VzdFswXSl7XHJcbiAgICAgICAgICAgICAgICBjbG9zZXN0WzBdLmNsYXNzZWQoJ3NkLWhvdmVyJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmhvdmVyZWRFZGdlID0gY2xvc2VzdFswXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGJydXNoc3RhcnQoZXZlbnQpIHtcclxuICAgICAgICAgICAgaWYgKCFldmVudC5zZWxlY3Rpb24pIHJldHVybjtcclxuICAgICAgICAgICAgaWYoc2VsZi5ob3ZlcmVkRWRnZSl7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNlbGVjdEVkZ2Uoc2VsZi5ob3ZlcmVkRWRnZS5kYXR1bSgpLCB0cnVlKVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHNlbGYuY2xlYXJTZWxlY3Rpb24oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBDb250ZXh0TWVudS5oaWRlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBIaWdobGlnaHQgdGhlIHNlbGVjdGVkIG5vZGVzLlxyXG4gICAgICAgIGZ1bmN0aW9uIGJydXNobW92ZShldmVudCkge1xyXG4gICAgICAgICAgICB2YXIgcyA9IGV2ZW50LnNlbGVjdGlvbjtcclxuICAgICAgICAgICAgaWYoIXMpcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgc2VsZi5tYWluR3JvdXAuc2VsZWN0QWxsKFwiLm5vZGVcIikuY2xhc3NlZCgnc2VsZWN0ZWQnLCBmdW5jdGlvbiAoZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1haW5Hcm91cFRyYW5zbGF0aW9uID0gc2VsZi5nZXRNYWluR3JvdXBUcmFuc2xhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHggPSBkLmxvY2F0aW9uLngrbWFpbkdyb3VwVHJhbnNsYXRpb25bMF07XHJcbiAgICAgICAgICAgICAgICB2YXIgeSA9IGQubG9jYXRpb24ueSttYWluR3JvdXBUcmFuc2xhdGlvblsxXTtcclxuICAgICAgICAgICAgICAgIHZhciBub2RlU2l6ZSA9IHNlbGYuY29uZmlnLmxheW91dC5ub2RlU2l6ZTtcclxuICAgICAgICAgICAgICAgIHZhciBvZmZzZXQgPSBub2RlU2l6ZSowLjI1O1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNbMF1bMF0gPD0geCtvZmZzZXQgJiYgeC1vZmZzZXQgPD0gc1sxXVswXVxyXG4gICAgICAgICAgICAgICAgICAgICYmIHNbMF1bMV0gPD0geStvZmZzZXQgJiYgeS1vZmZzZXQgPD0gc1sxXVsxXTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIElmIHRoZSBicnVzaCBpcyBlbXB0eSwgc2VsZWN0IGFsbCBjaXJjbGVzLlxyXG4gICAgICAgIGZ1bmN0aW9uIGJydXNoZW5kKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGlmICghZXZlbnQuc2VsZWN0aW9uKSByZXR1cm47XHJcbiAgICAgICAgICAgIGJydXNoLm1vdmUoYnJ1c2hDb250YWluZXIsIG51bGwpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHNlbGVjdGVkTm9kZXMgPSBzZWxmLmdldFNlbGVjdGVkTm9kZXMoKTtcclxuICAgICAgICAgICAgaWYoc2VsZWN0ZWROb2RlcyAmJiBzZWxlY3RlZE5vZGVzLmxlbmd0aCA9PT0gMSl7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNlbGVjdE5vZGUoc2VsZWN0ZWROb2Rlc1swXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gaWYgKCFkMy5ldmVudC5zZWxlY3Rpb24pIHNlbGYubWFpbkdyb3VwLnNlbGVjdEFsbChcIi5zZWxlY3RlZFwiKS5jbGFzc2VkKCdzZWxlY3RlZCcsIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGlzYWJsZUJydXNoKCl7XHJcbiAgICAgICAgaWYoIXRoaXMuYnJ1c2hEaXNhYmxlZCl7XHJcbiAgICAgICAgICAgIEFwcFV0aWxzLmdyb3dsKGkxOG4udCgnZ3Jvd2wuYnJ1c2hEaXNhYmxlZCcpLCAnaW5mbycsICdsZWZ0JylcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5icnVzaERpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmJydXNoQ29udGFpbmVyLnJlbW92ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGVuYWJsZUJydXNoKCl7XHJcbiAgICAgICAgaWYodGhpcy5icnVzaERpc2FibGVkKXtcclxuICAgICAgICAgICAgQXBwVXRpbHMuZ3Jvd2woaTE4bi50KCdncm93bC5icnVzaEVuYWJsZWQnKSwgJ2luZm8nLCAnbGVmdCcpXHJcbiAgICAgICAgICAgIHRoaXMuaW5pdEJydXNoKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYnJ1c2hEaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldE1haW5Hcm91cFRyYW5zbGF0aW9uKGludmVydCkge1xyXG4gICAgICAgIHZhciB0cmFuc2xhdGlvbiA9IEFwcFV0aWxzLmdldFRyYW5zbGF0aW9uKHRoaXMubWFpbkdyb3VwLmF0dHIoXCJ0cmFuc2Zvcm1cIikpO1xyXG4gICAgICAgIGlmKGludmVydCl7XHJcbiAgICAgICAgICAgIHRyYW5zbGF0aW9uWzBdID0gLXRyYW5zbGF0aW9uWzBdO1xyXG4gICAgICAgICAgICB0cmFuc2xhdGlvblsxXSA9IC10cmFuc2xhdGlvblsxXVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJhbnNsYXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdE5vZGVDb250ZXh0TWVudSgpIHtcclxuICAgICAgICB0aGlzLm5vZGVDb250ZXh0TWVudSA9IG5ldyBOb2RlQ29udGV4dE1lbnUodGhpcywgdGhpcy5jb25maWcub3BlcmF0aW9uc0Zvck9iamVjdCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdEVkZ2VDb250ZXh0TWVudSgpIHtcclxuICAgICAgICB0aGlzLmVkZ2VDb250ZXh0TWVudSA9IG5ldyBFZGdlQ29udGV4dE1lbnUodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdFRleHRDb250ZXh0TWVudSgpIHtcclxuICAgICAgICB0aGlzLnRleHRDb250ZXh0TWVudSA9IG5ldyBUZXh0Q29udGV4dE1lbnUodGhpcyk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBpbml0TWFpbkNvbnRleHRNZW51KCkge1xyXG4gICAgICAgIHRoaXMubWFpbkNvbnRleHRNZW51ID0gbmV3IE1haW5Db250ZXh0TWVudSh0aGlzKTtcclxuICAgICAgICB0aGlzLnN2Zy5vbignY29udGV4dG1lbnUnLHRoaXMubWFpbkNvbnRleHRNZW51KTtcclxuICAgICAgICB0aGlzLnN2Zy5vbignZGJsY2xpY2snLHRoaXMubWFpbkNvbnRleHRNZW51KTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRUZXh0KHRleHQpe1xyXG4gICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoKTtcclxuICAgICAgICB0aGlzLmRhdGEuYWRkVGV4dCh0ZXh0KTtcclxuICAgICAgICB0aGlzLnJlZHJhdygpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0VGV4dCh0ZXh0KTtcclxuICAgIH1cclxuXHJcbiAgICBhZGROb2RlKG5vZGUsIHBhcmVudCwgcmVkcmF3PWZhbHNlKXtcclxuICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKCk7XHJcbiAgICAgICAgdGhpcy5kYXRhLmFkZE5vZGUobm9kZSwgcGFyZW50KTtcclxuICAgICAgICB0aGlzLnJlZHJhdyh0cnVlKTtcclxuICAgICAgICB0aGlzLmxheW91dC51cGRhdGUobm9kZSk7XHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkRGVjaXNpb25Ob2RlKHBhcmVudCl7XHJcbiAgICAgICAgdmFyIG5ld05vZGUgPSBuZXcgbW9kZWwuRGVjaXNpb25Ob2RlKHRoaXMubGF5b3V0LmdldE5ld0NoaWxkTG9jYXRpb24ocGFyZW50KSk7XHJcbiAgICAgICAgdGhpcy5hZGROb2RlKG5ld05vZGUsIHBhcmVudClcclxuICAgIH1cclxuICAgIGFkZENoYW5jZU5vZGUocGFyZW50KXtcclxuICAgICAgICB2YXIgbmV3Tm9kZSA9IG5ldyBtb2RlbC5DaGFuY2VOb2RlKHRoaXMubGF5b3V0LmdldE5ld0NoaWxkTG9jYXRpb24ocGFyZW50KSk7XHJcbiAgICAgICAgdGhpcy5hZGROb2RlKG5ld05vZGUsIHBhcmVudClcclxuICAgIH1cclxuICAgIGFkZFRlcm1pbmFsTm9kZShwYXJlbnQpe1xyXG4gICAgICAgIHZhciBuZXdOb2RlID0gbmV3IG1vZGVsLlRlcm1pbmFsTm9kZSh0aGlzLmxheW91dC5nZXROZXdDaGlsZExvY2F0aW9uKHBhcmVudCkpO1xyXG4gICAgICAgIHRoaXMuYWRkTm9kZShuZXdOb2RlLCBwYXJlbnQpXHJcbiAgICB9XHJcblxyXG4gICAgaW5qZWN0Tm9kZShub2RlLCBlZGdlKXtcclxuICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKCk7XHJcbiAgICAgICAgdGhpcy5kYXRhLmluamVjdE5vZGUobm9kZSwgZWRnZSk7XHJcbiAgICAgICAgdGhpcy5yZWRyYXcoKTtcclxuICAgICAgICB0aGlzLmxheW91dC51cGRhdGUobm9kZSk7XHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgaW5qZWN0RGVjaXNpb25Ob2RlKGVkZ2Upe1xyXG4gICAgICAgIHZhciBuZXdOb2RlID0gbmV3IG1vZGVsLkRlY2lzaW9uTm9kZSh0aGlzLmxheW91dC5nZXRJbmplY3RlZE5vZGVMb2NhdGlvbihlZGdlKSk7XHJcbiAgICAgICAgdGhpcy5pbmplY3ROb2RlKG5ld05vZGUsIGVkZ2UpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBpbmplY3RDaGFuY2VOb2RlKGVkZ2Upe1xyXG4gICAgICAgIHZhciBuZXdOb2RlID0gbmV3IG1vZGVsLkNoYW5jZU5vZGUodGhpcy5sYXlvdXQuZ2V0SW5qZWN0ZWROb2RlTG9jYXRpb24oZWRnZSkpO1xyXG4gICAgICAgIHRoaXMuaW5qZWN0Tm9kZShuZXdOb2RlLCBlZGdlKTtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVOb2RlKG5vZGUpIHtcclxuICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKCk7XHJcbiAgICAgICAgdGhpcy5kYXRhLnJlbW92ZU5vZGUobm9kZSk7XHJcblxyXG5cclxuICAgICAgICBpZighdGhpcy5sYXlvdXQuaXNNYW51YWxMYXlvdXQoKSl7XHJcbiAgICAgICAgICAgIHRoaXMubGF5b3V0LnVwZGF0ZSgpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLnJlZHJhdygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVTZWxlY3RlZE5vZGVzKCkge1xyXG4gICAgICAgIHZhciBzZWxlY3RlZE5vZGVzID0gdGhpcy5nZXRTZWxlY3RlZE5vZGVzKCk7XHJcbiAgICAgICAgaWYoIXNlbGVjdGVkTm9kZXMubGVuZ3RoKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKCk7XHJcbiAgICAgICAgdGhpcy5kYXRhLnJlbW92ZU5vZGVzKHNlbGVjdGVkTm9kZXMpO1xyXG4gICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcclxuICAgICAgICB0aGlzLnJlZHJhdygpO1xyXG4gICAgICAgIHRoaXMubGF5b3V0LnVwZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZVNlbGVjdGVkVGV4dHMoKXtcclxuICAgICAgICB2YXIgc2VsZWN0ZWRUZXh0cyA9IHRoaXMuZ2V0U2VsZWN0ZWRUZXh0cygpO1xyXG5cclxuICAgICAgICBpZighc2VsZWN0ZWRUZXh0cy5sZW5ndGgpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoKTtcclxuICAgICAgICB0aGlzLmRhdGEucmVtb3ZlVGV4dHMoc2VsZWN0ZWRUZXh0cyk7XHJcbiAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xyXG4gICAgICAgIHRoaXMucmVkcmF3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29weU5vZGUoZCwgbm90Q2xlYXJQcmV2U2VsZWN0aW9uKSB7XHJcbiAgICAgICAgdmFyIGNsb25lID0gdGhpcy5kYXRhLmNsb25lU3VidHJlZShkKTtcclxuICAgICAgICBpZihub3RDbGVhclByZXZTZWxlY3Rpb24pe1xyXG4gICAgICAgICAgICBpZighdGhpcy5jb3BpZWROb2Rlcyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvcGllZE5vZGVzPVtdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY29waWVkTm9kZXMucHVzaChjbG9uZSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuY29waWVkTm9kZXMgPSBbY2xvbmVdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgY3V0Tm9kZShkKSB7XHJcbiAgICAgICAgdGhpcy5jb3B5Tm9kZShkKTtcclxuICAgICAgICB0aGlzLnJlbW92ZU5vZGUoZCk7XHJcbiAgICB9XHJcblxyXG4gICAgY3V0U2VsZWN0ZWROb2Rlcygpe1xyXG4gICAgICAgIHZhciBzZWxlY3RlZE5vZGVzID0gdGhpcy5nZXRTZWxlY3RlZE5vZGVzKCk7XHJcbiAgICAgICAgdmFyIHNlbGVjdGVkUm9vdHMgPSB0aGlzLmRhdGEuZmluZFN1YnRyZWVSb290cyhzZWxlY3RlZE5vZGVzKTtcclxuICAgICAgICB0aGlzLmNvcHlOb2RlcyhzZWxlY3RlZFJvb3RzKTtcclxuICAgICAgICB0aGlzLnJlbW92ZVNlbGVjdGVkTm9kZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBjb3B5U2VsZWN0ZWROb2RlcygpIHtcclxuICAgICAgICB2YXIgc2VsZjtcclxuICAgICAgICB2YXIgc2VsZWN0ZWROb2RlcyA9IHRoaXMuZ2V0U2VsZWN0ZWROb2RlcygpO1xyXG5cclxuICAgICAgICB2YXIgc2VsZWN0ZWRSb290cyA9IHRoaXMuZGF0YS5maW5kU3VidHJlZVJvb3RzKHNlbGVjdGVkTm9kZXMpO1xyXG4gICAgICAgIHRoaXMuY29weU5vZGVzKHNlbGVjdGVkUm9vdHMpO1xyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgY29weU5vZGVzKG5vZGVzKXtcclxuICAgICAgICB0aGlzLmNvcGllZE5vZGVzID0gbm9kZXMubWFwKGQ9PnRoaXMuZGF0YS5jbG9uZVN1YnRyZWUoZCkpO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgcGFzdGVUb05vZGUobm9kZSkge1xyXG4gICAgICAgIGlmKCF0aGlzLmNvcGllZE5vZGVzIHx8ICF0aGlzLmNvcGllZE5vZGVzLmxlbmd0aCl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSgpO1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICBzZWxmLmNsZWFyU2VsZWN0aW9uKCk7XHJcbiAgICAgICAgdmFyIG5vZGVzVG9BdHRhY2ggPSB0aGlzLmNvcGllZE5vZGVzO1xyXG4gICAgICAgIHNlbGYuY29weU5vZGVzKHRoaXMuY29waWVkTm9kZXMpO1xyXG4gICAgICAgIG5vZGVzVG9BdHRhY2guZm9yRWFjaCh0b0F0dGFjaD0+e1xyXG4gICAgICAgICAgICB2YXIgYXR0YWNoZWQgPSB0aGlzLmRhdGEuYXR0YWNoU3VidHJlZSh0b0F0dGFjaCwgbm9kZSkuY2hpbGROb2RlO1xyXG4gICAgICAgICAgICBpZihhdHRhY2hlZC5mb2xkZWQpe1xyXG4gICAgICAgICAgICAgICAgc2VsZi5mb2xkU3VidHJlZShhdHRhY2hlZCwgYXR0YWNoZWQuZm9sZGVkLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGxvY2F0aW9uID0gc2VsZi5sYXlvdXQuZ2V0TmV3Q2hpbGRMb2NhdGlvbihub2RlKTtcclxuICAgICAgICAgICAgYXR0YWNoZWQubW92ZVRvKGxvY2F0aW9uLngsIGxvY2F0aW9uLnksIHRydWUpO1xyXG4gICAgICAgICAgICBzZWxmLmxheW91dC5tb3ZlTm9kZVRvRW1wdHlQbGFjZShhdHRhY2hlZCwgZmFsc2UpO1xyXG4gICAgICAgICAgICBzZWxmLmxheW91dC5maXROb2Rlc0luUGxvdHRpbmdSZWdpb24odGhpcy5kYXRhLmdldEFsbERlc2NlbmRhbnROb2RlcyhhdHRhY2hlZCkpO1xyXG5cclxuICAgICAgICAgICAgc2VsZi5zZWxlY3RTdWJUcmVlKGF0dGFjaGVkLCBmYWxzZSwgbm9kZXNUb0F0dGFjaC5sZW5ndGg+MSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmKG5vZGUuZm9sZGVkKXtcclxuICAgICAgICAgICAgc2VsZi5mb2xkU3VidHJlZShub2RlLCBub2RlLmZvbGRlZCwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBzZWxmLnJlZHJhdygpO1xyXG4gICAgICAgICAgICBzZWxmLmxheW91dC51cGRhdGUoKTtcclxuICAgICAgICB9LDEwKVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwYXN0ZVRvTmV3TG9jYXRpb24ocG9pbnQpIHtcclxuICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKCk7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHNlbGYuY2xlYXJTZWxlY3Rpb24oKTtcclxuICAgICAgICB2YXIgbm9kZXNUb0F0dGFjaCA9IHRoaXMuY29waWVkTm9kZXM7XHJcbiAgICAgICAgc2VsZi5jb3B5Tm9kZXModGhpcy5jb3BpZWROb2Rlcyk7XHJcbiAgICAgICAgbm9kZXNUb0F0dGFjaC5mb3JFYWNoKHRvQXR0YWNoPT4ge1xyXG4gICAgICAgICAgICB2YXIgYXR0YWNoZWQgPSB0aGlzLmRhdGEuYXR0YWNoU3VidHJlZSh0b0F0dGFjaCk7XHJcbiAgICAgICAgICAgIGlmKGF0dGFjaGVkLmZvbGRlZCl7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmZvbGRTdWJ0cmVlKGF0dGFjaGVkLCBhdHRhY2hlZC5mb2xkZWQsIGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhdHRhY2hlZC5tb3ZlVG8ocG9pbnQueCwgcG9pbnQueSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHNlbGYubGF5b3V0Lm1vdmVOb2RlVG9FbXB0eVBsYWNlKGF0dGFjaGVkLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHNlbGYubGF5b3V0LmZpdE5vZGVzSW5QbG90dGluZ1JlZ2lvbih0aGlzLmRhdGEuZ2V0QWxsRGVzY2VuZGFudE5vZGVzKGF0dGFjaGVkKSk7XHJcblxyXG4gICAgICAgICAgICBzZWxmLnNlbGVjdFN1YlRyZWUoYXR0YWNoZWQsIGZhbHNlLCBub2Rlc1RvQXR0YWNoLmxlbmd0aD4xKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBzZWxmLnJlZHJhdygpO1xyXG4gICAgICAgICAgICBzZWxmLmxheW91dC51cGRhdGUoKTtcclxuICAgICAgICB9LDEwKVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBjb252ZXJ0Tm9kZShub2RlLCB0eXBlVG9Db252ZXJ0VG8pe1xyXG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoKTtcclxuICAgICAgICB0aGlzLmRhdGEuY29udmVydE5vZGUobm9kZSwgdHlwZVRvQ29udmVydFRvKTtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHNlbGYucmVkcmF3KHRydWUpO1xyXG4gICAgICAgIH0sMTApXHJcbiAgICB9XHJcblxyXG4gICAgcGVyZm9ybU9wZXJhdGlvbihvYmplY3QsIG9wZXJhdGlvbil7XHJcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSgpO1xyXG4gICAgICAgIHRoaXMuY29uZmlnLnBlcmZvcm1PcGVyYXRpb24ob2JqZWN0LCBvcGVyYXRpb24pLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnJlZHJhdygpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5sYXlvdXQudXBkYXRlKCk7XHJcbiAgICAgICAgICAgIH0sMTApXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZm9sZFN1YnRyZWUobm9kZSwgZm9sZCA9IHRydWUsIHJlZHJhdz10cnVlKXtcclxuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgICAgICBub2RlLmZvbGRlZCA9IGZvbGQ7XHJcblxyXG4gICAgICAgIHRoaXMuZGF0YS5nZXRBbGxEZXNjZW5kYW50Tm9kZXMobm9kZSkuZm9yRWFjaChuPT57XHJcbiAgICAgICAgICAgIG4uJGhpZGRlbiA9IGZvbGQ7XHJcbiAgICAgICAgICAgIG4uZm9sZGVkID0gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5kYXRhLmdldEFsbERlc2NlbmRhbnRFZGdlcyhub2RlKS5mb3JFYWNoKGU9PmUuJGhpZGRlbiA9IGZvbGQpO1xyXG5cclxuICAgICAgICBpZighcmVkcmF3KXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHNlbGYucmVkcmF3KCk7XHJcbiAgICAgICAgICAgIHNlbGYubGF5b3V0LnVwZGF0ZSgpO1xyXG4gICAgICAgIH0sMTApXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlVmlzaWJpbGl0eShub2RlID0gbnVsbCl7XHJcbiAgICAgICAgaWYoIW5vZGUpe1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEuZ2V0Um9vdHMoKS5mb3JFYWNoKG49PnRoaXMudXBkYXRlVmlzaWJpbGl0eShuKSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKG5vZGUuZm9sZGVkKXtcclxuICAgICAgICAgICAgdGhpcy5mb2xkU3VidHJlZShub2RlLCB0cnVlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG5vZGUuY2hpbGRFZGdlcy5mb3JFYWNoKGUgPT4gdGhpcy51cGRhdGVWaXNpYmlsaXR5KGUuY2hpbGROb2RlKSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG1vdmVOb2RlVG8oeCx5KXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlTm9kZVBvc2l0aW9uKG5vZGUpIHtcclxuICAgICAgICB0aGlzLmdldE5vZGVEM1NlbGVjdGlvbihub2RlKS5yYWlzZSgpLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJytub2RlLmxvY2F0aW9uLngrJyAnK25vZGUubG9jYXRpb24ueSsnKScpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVRleHRQb3NpdGlvbih0ZXh0KSB7XHJcbiAgICAgICAgdGhpcy5nZXRUZXh0RDNTZWxlY3Rpb24odGV4dCkucmFpc2UoKS5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcrdGV4dC5sb2NhdGlvbi54KycgJyt0ZXh0LmxvY2F0aW9uLnkrJyknKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXROb2RlRDNTZWxlY3Rpb24obm9kZSl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Tm9kZUQzU2VsZWN0aW9uQnlJZChub2RlLmlkKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXROb2RlRDNTZWxlY3Rpb25CeUlkKGlkKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5tYWluR3JvdXAuc2VsZWN0KCcjbm9kZS0nK2lkKTtcclxuICAgIH1cclxuICAgIGdldFRleHREM1NlbGVjdGlvbih0ZXh0KXtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRUZXh0RDNTZWxlY3Rpb25CeUlkKHRleHQuaWQpO1xyXG4gICAgfVxyXG4gICAgZ2V0VGV4dEQzU2VsZWN0aW9uQnlJZChpZCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWFpbkdyb3VwLnNlbGVjdCgnI3RleHQtJytpZCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U2VsZWN0ZWROb2Rlcyh2aXNpYmxlT25seSA9IGZhbHNlKSB7XHJcbiAgICAgICAgbGV0IHNlbGVjdGVkVmlzaWJsZSA9IHRoaXMubWFpbkdyb3VwLnNlbGVjdEFsbChcIi5ub2RlLnNlbGVjdGVkXCIpLmRhdGEoKTtcclxuICAgICAgICBpZih2aXNpYmxlT25seSl7XHJcbiAgICAgICAgICAgIHJldHVybiBzZWxlY3RlZFZpc2libGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYWxsU2VsZWN0ZWQgID0gW107XHJcbiAgICAgICAgYWxsU2VsZWN0ZWQucHVzaCguLi5zZWxlY3RlZFZpc2libGUpO1xyXG5cclxuICAgICAgICBzZWxlY3RlZFZpc2libGUuZm9yRWFjaChuPT57XHJcbiAgICAgICAgICAgIGlmKG4uZm9sZGVkKXtcclxuICAgICAgICAgICAgICAgIGxldCBkZXNjZW5kYW50cyA9IHRoaXMuZGF0YS5nZXRBbGxEZXNjZW5kYW50Tm9kZXMobik7XHJcbiAgICAgICAgICAgICAgICBpZihkZXNjZW5kYW50cyl7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxsU2VsZWN0ZWQucHVzaCguLi5kZXNjZW5kYW50cyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGFsbFNlbGVjdGVkO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFNlbGVjdGVkVGV4dHMoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5tYWluR3JvdXAuc2VsZWN0QWxsKFwiLmZsb2F0aW5nLXRleHQuc2VsZWN0ZWRcIikuZGF0YSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsZWFyU2VsZWN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5tYWluR3JvdXAuc2VsZWN0QWxsKFwiLmVkZ2Uuc2VsZWN0ZWRcIikuc2VsZWN0KCdwYXRoJykuYXR0cihcIm1hcmtlci1lbmRcIiwgZCA9PiBcInVybCgjYXJyb3dcIisodGhpcy5pc09wdGltYWwoZCk/Jy1vcHRpbWFsJzonJykrXCIpXCIpXHJcbiAgICAgICAgdGhpcy5tYWluR3JvdXAuc2VsZWN0QWxsKFwiLnNlbGVjdGVkXCIpLmNsYXNzZWQoJ3NlbGVjdGVkJywgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuY29uZmlnLm9uU2VsZWN0aW9uQ2xlYXJlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbGVjdEVkZ2UoZWRnZSwgY2xlYXJTZWxlY3Rpb25CZWZvcmVTZWxlY3Qpe1xyXG4gICAgICAgIGlmKGNsZWFyU2VsZWN0aW9uQmVmb3JlU2VsZWN0KXtcclxuICAgICAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvbmZpZy5vbkVkZ2VTZWxlY3RlZChlZGdlKTtcclxuICAgICAgICB0aGlzLm1haW5Hcm91cC5zZWxlY3QoJyNlZGdlLScrZWRnZS5pZClcclxuICAgICAgICAgICAgLmNsYXNzZWQoJ3NlbGVjdGVkJywgdHJ1ZSlcclxuICAgICAgICAgICAgLnNlbGVjdCgncGF0aCcpXHJcbiAgICAgICAgICAgIC5hdHRyKFwibWFya2VyLWVuZFwiLCBkID0+IFwidXJsKCNhcnJvdy1zZWxlY3RlZClcIilcclxuICAgIH1cclxuXHJcbiAgICBpc05vZGVTZWxlY3RlZChub2RlKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXROb2RlRDNTZWxlY3Rpb24obm9kZSkuY2xhc3NlZCgnc2VsZWN0ZWQnKTtcclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3ROb2RlKG5vZGUsIGNsZWFyU2VsZWN0aW9uQmVmb3JlU2VsZWN0LCBza2lwQ2FsbGJhY2spe1xyXG4gICAgICAgIGlmKGNsZWFyU2VsZWN0aW9uQmVmb3JlU2VsZWN0KXtcclxuICAgICAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoIXNraXBDYWxsYmFjayl7XHJcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLm9uTm9kZVNlbGVjdGVkKG5vZGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5nZXROb2RlRDNTZWxlY3Rpb25CeUlkKG5vZGUuaWQpLmNsYXNzZWQoJ3NlbGVjdGVkJywgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0VGV4dCh0ZXh0LCBjbGVhclNlbGVjdGlvbkJlZm9yZVNlbGVjdCwgc2tpcENhbGxiYWNrKXtcclxuICAgICAgICBpZihjbGVhclNlbGVjdGlvbkJlZm9yZVNlbGVjdCl7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKCFza2lwQ2FsbGJhY2spe1xyXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5vblRleHRTZWxlY3RlZCh0ZXh0KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5nZXRUZXh0RDNTZWxlY3Rpb25CeUlkKHRleHQuaWQpLmNsYXNzZWQoJ3NlbGVjdGVkJywgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0U3ViVHJlZShub2RlLCBjbGVhclNlbGVjdGlvbkJlZm9yZVNlbGVjdCxza2lwQ2FsbGJhY2spIHtcclxuICAgICAgICBpZihjbGVhclNlbGVjdGlvbkJlZm9yZVNlbGVjdCl7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZWxlY3ROb2RlKG5vZGUsIGZhbHNlLCBza2lwQ2FsbGJhY2spO1xyXG4gICAgICAgIG5vZGUuY2hpbGRFZGdlcy5mb3JFYWNoKGU9PnRoaXMuc2VsZWN0U3ViVHJlZShlLmNoaWxkTm9kZSwgZmFsc2UsIHRydWUpKTtcclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3RBbGxOb2RlcygpIHtcclxuICAgICAgICB0aGlzLm1haW5Hcm91cC5zZWxlY3RBbGwoXCIubm9kZVwiKS5jbGFzc2VkKCdzZWxlY3RlZCcsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGF1dG9MYXlvdXQodHlwZSwgd2l0aG91dFN0YXRlU2F2aW5nKXtcclxuICAgICAgICB0aGlzLmxheW91dC5hdXRvTGF5b3V0KHR5cGUsIHdpdGhvdXRTdGF0ZVNhdmluZyk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlRGlhZ3JhbVRpdGxlKHRpdGxlVmFsdWUpe1xyXG4gICAgICAgIGlmKCF0aXRsZVZhbHVlKXtcclxuICAgICAgICAgICAgdGl0bGVWYWx1ZSA9ICcnO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmRpYWdyYW1UaXRsZSA9IHRpdGxlVmFsdWU7XHJcbiAgICAgICAgdGhpcy5yZWRyYXdEaWFncmFtVGl0bGUoKTtcclxuICAgICAgICB0aGlzLnJlZHJhd0RpYWdyYW1EZXNjcmlwdGlvbigpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlTWFyZ2luKHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZHJhd0RpYWdyYW1UaXRsZSgpe1xyXG4gICAgICAgIHZhciBzdmdXaWR0aCA9IHRoaXMuc3ZnLmF0dHIoJ3dpZHRoJyk7XHJcbiAgICAgICAgdmFyIHN2Z0hlaWdodCA9IHRoaXMuc3ZnLmF0dHIoJ2hlaWdodCcpO1xyXG4gICAgICAgIHRoaXMudGl0bGVDb250YWluZXIgPSB0aGlzLnN2Zy5zZWxlY3RPckFwcGVuZCgnZy5zZC10aXRsZS1jb250YWluZXInKTtcclxuXHJcbiAgICAgICAgdmFyIHRpdGxlID0gdGhpcy50aXRsZUNvbnRhaW5lci5zZWxlY3RPckFwcGVuZCgndGV4dC5zZC10aXRsZScpO1xyXG4gICAgICAgIHRpdGxlLnRleHQodGhpcy5kaWFncmFtVGl0bGUpO1xyXG4gICAgICAgIExheW91dC5zZXRIYW5naW5nUG9zaXRpb24odGl0bGUpO1xyXG5cclxuICAgICAgICB2YXIgbWFyZ2luVG9wID0gcGFyc2VJbnQodGhpcy5jb25maWcudGl0bGUubWFyZ2luLnRvcCk7XHJcbiAgICAgICAgdGhpcy50aXRsZUNvbnRhaW5lci5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcrKHN2Z1dpZHRoLzIpKycsJysoIG1hcmdpblRvcCkrJyknKTtcclxuICAgIH1cclxuICAgIHJlZHJhd0RpYWdyYW1EZXNjcmlwdGlvbigpe1xyXG4gICAgICAgIHZhciBzdmdXaWR0aCA9IHRoaXMuc3ZnLmF0dHIoJ3dpZHRoJyk7XHJcbiAgICAgICAgdmFyIHN2Z0hlaWdodCA9IHRoaXMuc3ZnLmF0dHIoJ2hlaWdodCcpO1xyXG4gICAgICAgIHRoaXMudGl0bGVDb250YWluZXIgPSB0aGlzLnN2Zy5zZWxlY3RPckFwcGVuZCgnZy5zZC10aXRsZS1jb250YWluZXInKTtcclxuXHJcbiAgICAgICAgdmFyIGRlc2MgPSB0aGlzLnRpdGxlQ29udGFpbmVyLnNlbGVjdE9yQXBwZW5kKCd0ZXh0LnNkLWRlc2NyaXB0aW9uJyk7XHJcblxyXG4gICAgICAgIGlmKCF0aGlzLmNvbmZpZy5kZXNjcmlwdGlvbi5zaG93KXtcclxuICAgICAgICAgICAgZGVzYy5yZW1vdmUoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGxpbmVzID0gdGhpcy5kaWFncmFtRGVzY3JpcHRpb24gPyB0aGlzLmRpYWdyYW1EZXNjcmlwdGlvbi5zcGxpdCgnXFxuJykgOiBbXTtcclxuICAgICAgICB2YXIgdHNwYW5zID0gZGVzYy5zZWxlY3RBbGwoJ3RzcGFuJykuZGF0YShsaW5lcyk7XHJcbiAgICAgICAgdHNwYW5zLmVudGVyKCkuYXBwZW5kKCd0c3BhbicpXHJcbiAgICAgICAgICAgIC5tZXJnZSh0c3BhbnMpXHJcbiAgICAgICAgICAgIC5odG1sKGw9PkFwcFV0aWxzLnJlcGxhY2VVcmxzKEFwcFV0aWxzLmVzY2FwZUh0bWwobCkpKVxyXG4gICAgICAgICAgICAuYXR0cignZHknLCAoZCxpKT0+aT4wID8gJzEuMWVtJzogdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAuYXR0cigneCcsICcwJyk7XHJcblxyXG4gICAgICAgIHRzcGFucy5leGl0KCkucmVtb3ZlKCk7XHJcbiAgICAgICAgTGF5b3V0LnNldEhhbmdpbmdQb3NpdGlvbihkZXNjKTtcclxuXHJcbiAgICAgICAgdmFyIHRpdGxlID0gdGhpcy50aXRsZUNvbnRhaW5lci5zZWxlY3RPckFwcGVuZCgndGV4dC5zZC10aXRsZScpO1xyXG5cclxuICAgICAgICB2YXIgbWFyZ2luVG9wID0gMDtcclxuICAgICAgICBpZih0aGlzLmRpYWdyYW1UaXRsZSl7XHJcbiAgICAgICAgICAgIG1hcmdpblRvcCArPSB0aXRsZS5ub2RlKCkuZ2V0QkJveCgpLmhlaWdodDtcclxuICAgICAgICAgICAgbWFyZ2luVG9wKz0gTWF0aC5tYXgocGFyc2VJbnQodGhpcy5jb25maWcuZGVzY3JpcHRpb24ubWFyZ2luLnRvcCksIDApO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGRlc2MuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgwLCcrKCBtYXJnaW5Ub3ApKycpJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlRGlhZ3JhbURlc2NyaXB0aW9uKGRlc2NyaXB0aW9uVmFsdWUpe1xyXG4gICAgICAgIGlmKCFkZXNjcmlwdGlvblZhbHVlKXtcclxuICAgICAgICAgICAgZGVzY3JpcHRpb25WYWx1ZSA9ICcnO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmRpYWdyYW1EZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uVmFsdWU7XHJcbiAgICAgICAgdGhpcy5yZWRyYXdEaWFncmFtVGl0bGUoKTtcclxuICAgICAgICB0aGlzLnJlZHJhd0RpYWdyYW1EZXNjcmlwdGlvbigpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlTWFyZ2luKHRydWUpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBnZXRUaXRsZUdyb3VwSGVpZ2h0KHdpdGhNYXJnaW5zKXtcclxuICAgICAgICBpZighdGhpcy50aXRsZUNvbnRhaW5lcil7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgaCA9IHRoaXMudGl0bGVDb250YWluZXIubm9kZSgpLmdldEJCb3goKS5oZWlnaHQ7XHJcbiAgICAgICAgaWYod2l0aE1hcmdpbnMpe1xyXG4gICAgICAgICAgICBoKz0gcGFyc2VJbnQodGhpcy5jb25maWcudGl0bGUubWFyZ2luLmJvdHRvbSk7XHJcbiAgICAgICAgICAgIGgrPSBwYXJzZUludCh0aGlzLmNvbmZpZy50aXRsZS5tYXJnaW4udG9wKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGg7XHJcbiAgICB9XHJcblxyXG59XHJcbiIsImV4cG9ydCAqIGZyb20gJy4vc3JjL2luZGV4J1xyXG4iXX0=
