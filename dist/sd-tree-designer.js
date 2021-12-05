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

},{"./d3":23,"./i18n/i18n":27,"./templates":36,"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/interopRequireDefault":8,"@babel/runtime/helpers/typeof":14,"sd-utils":"sd-utils"}],17:[function(require,module,exports){
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

var pt_br = _interopRequireWildcard(require("./pt-br.json"));

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
        },
        'pt-BR': {
          translation: pt_br
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

},{"./de.json":24,"./en.json":25,"./fr.json":26,"./it.json":28,"./pl.json":29,"./pt-br.json":30,"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/interopRequireDefault":8,"@babel/runtime/helpers/typeof":14,"i18next":"i18next"}],28:[function(require,module,exports){
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
module.exports={
    "contextMenu":{
        "main":{
            "addDecisionNode": "Adicionar nó de decisão",
            "addChanceNode": "Adicionar Nó de probabilidade",
            "addText": "Adicionar Texto",
            "paste": "Colar",
            "selectAllNodes": "Selecionar todos os nós"
        },
        "node":{
            "copy": "Copiar",
            "cut": "Cortar",
            "paste": "Colar",
            "delete": "Excluir",
            "addDecisionNode": "Adicionar nó de decisão",
            "addChanceNode": "Adicionar Nó de chance",
            "addTerminalNode": "Adicionar Nó Terminal",
            "convert":{
                "decision": "Como nó de decisão",
                "chance": "Como Nó de Chance",
                "terminal": "Como Nó Terminal"
            },
            "selectSubtree": "Selecionar subárvore",
            "fold": "Dobrar subárvore",
            "unfold": "Desdobrar subárvore",
            "flipSubtree": "Inverter subárvore",
            "payoffsTransformation": "Transformar pesos"
        },
        "edge":{
            "injectDecisionNode": "Injetar Nó de Decisão",
            "injectChanceNode": "Injetar Nó de Chance"
        },
        "text":{
            "delete": "Excluir"
        }
    },
    "validation":{
        "incompletePath": "O caminho não termina com o nó terminal",
        "probabilityDoNotSumUpTo1": "Probabilidades não somam até 1",
        "invalidProbability": "Probabilidade inválida na borda # {{number}}",
        "invalidPayoff": "Pagamento inválido na borda # {{number}}"
    },
    "growl":{
        "brushDisabled": "Pincel de seleção desativado",
        "brushEnabled": "Pincel de seleção habilitado"
    },
    "tooltip":{
        "node":{
            "payoff": {
                "default": "Pagar {{number}}",
                "named": "{{name}}"
            },
            "aggregatedPayoff": {
                "default": "Pagar agregado {{number}}",
                "named": "Agregado {{name}}"
            },
            "probabilityToEnter": "Probabilidade de entrar"
        },
        "edge":{
            "payoff": {
                "default": "Pagar {{number}}: {{value}}",
                "named": "{{name}}: {{value}}"
            },
            "probability": "Probabilidade: {{value}}"
        }
    }
}

},{}],31:[function(require,module,exports){
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

},{"./app-utils":16,"./d3":23,"./d3-extensions":22,"./templates":36,"./tooltip":39,"./tree-designer":40,"@babel/runtime/helpers/interopRequireDefault":8}],32:[function(require,module,exports){
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

},{"./app-utils":16,"./d3":23,"./symbols/circle":34,"./symbols/triangle":35,"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/interopRequireDefault":8,"@babel/runtime/helpers/typeof":14,"sd-model":"sd-model","sd-utils":"sd-utils"}],33:[function(require,module,exports){
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

},{"./app-utils":16,"./context-menu/context-menu":17,"./d3":23,"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/interopRequireDefault":8,"@babel/runtime/helpers/typeof":14}],34:[function(require,module,exports){
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

},{}],35:[function(require,module,exports){
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

},{}],36:[function(require,module,exports){
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

},{"./i18n/i18n":27,"./templates/growl_message.html":37,"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/interopRequireDefault":8,"sd-utils":"sd-utils"}],37:[function(require,module,exports){
module.exports = "module.exports = \"<div class=\\\"sd-growl-message <%=type%>\\\">\\r\\n    <div class=\\\"sd-growl-message-text\\\">\\r\\n        <%= message %>\\r\\n    </div>\\r\\n</div>\\r\\n\";\n";

},{}],38:[function(require,module,exports){
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

},{"./app-utils":16,"./context-menu/context-menu":17,"./d3":23,"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/interopRequireDefault":8,"@babel/runtime/helpers/typeof":14}],39:[function(require,module,exports){
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

},{"./d3":23,"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/interopRequireDefault":8,"@babel/runtime/helpers/typeof":14,"sd-utils":"sd-utils"}],40:[function(require,module,exports){
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
  this.preserveFoldingOfNestedSubtrees = true;

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
      var value = d.displayValue("name") || d.name;
      var lines = value ? value.split('\n') : [];
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
        var value = d.$displayValue || d.value;
        return value ? value.split('\n') : [];
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
      var preserveNestedFolding = self.config.preserveFoldingOfNestedSubtrees;
      this.data.getAllDescendantNodes(node).forEach(function (n) {
        n.$hidden = fold || n.$parent && (n.$parent.folded || n.$parent.$hidden);

        if (!preserveNestedFolding) {
          n.folded = false;
        }
      });
      this.data.getAllDescendantEdges(node).forEach(function (e) {
        return e.$hidden = e.parentNode.folded || e.parentNode.$hidden;
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

},{"./app-utils":16,"./context-menu/context-menu":17,"./context-menu/edge-context-menu":18,"./context-menu/main-context-menu":19,"./context-menu/node-context-menu":20,"./context-menu/text-context-menu":21,"./d3":23,"./i18n/i18n":27,"./layout":32,"./node-drag-handler":33,"./templates":36,"./text-drag-handler":38,"./tooltip":39,"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/interopRequireDefault":8,"@babel/runtime/helpers/toConsumableArray":13,"@babel/runtime/helpers/typeof":14,"hammerjs":"hammerjs","sd-model":"sd-model","sd-utils":"sd-utils"}],"sd-tree-designer":[function(require,module,exports){
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

},{"./src/index":31}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hcnJheUxpa2VUb0FycmF5LmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXJyYXlXaXRob3V0SG9sZXMuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVjay5qcyIsIm5vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzLmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZ2V0UHJvdG90eXBlT2YuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbmhlcml0cy5qcyIsIm5vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdC5qcyIsIm5vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2l0ZXJhYmxlVG9BcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL25vbkl0ZXJhYmxlU3ByZWFkLmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvcG9zc2libGVDb25zdHJ1Y3RvclJldHVybi5qcyIsIm5vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3NldFByb3RvdHlwZU9mLmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvdG9Db25zdW1hYmxlQXJyYXkuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy90eXBlb2YuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheS5qcyIsInNyYy9hcHAtdXRpbHMuanMiLCJzcmMvY29udGV4dC1tZW51L2NvbnRleHQtbWVudS5qcyIsInNyYy9jb250ZXh0LW1lbnUvZWRnZS1jb250ZXh0LW1lbnUuanMiLCJzcmMvY29udGV4dC1tZW51L21haW4tY29udGV4dC1tZW51LmpzIiwic3JjL2NvbnRleHQtbWVudS9ub2RlLWNvbnRleHQtbWVudS5qcyIsInNyYy9jb250ZXh0LW1lbnUvdGV4dC1jb250ZXh0LW1lbnUuanMiLCJzcmMvZDMtZXh0ZW5zaW9ucy5qcyIsInNyYy9kMy5qcyIsInNyYy9pMThuL2RlLmpzb24iLCJzcmMvaTE4bi9lbi5qc29uIiwic3JjL2kxOG4vZnIuanNvbiIsInNyYy9pMThuL2kxOG4uanMiLCJzcmMvaTE4bi9pdC5qc29uIiwic3JjL2kxOG4vcGwuanNvbiIsInNyYy9pMThuL3B0LWJyLmpzb24iLCJzcmMvaW5kZXguanMiLCJzcmMvbGF5b3V0LmpzIiwic3JjL25vZGUtZHJhZy1oYW5kbGVyLmpzIiwic3JjL3N5bWJvbHMvY2lyY2xlLmpzIiwic3JjL3N5bWJvbHMvdHJpYW5nbGUuanMiLCJzcmMvdGVtcGxhdGVzLmpzIiwic3JjL3RlbXBsYXRlcy9ncm93bF9tZXNzYWdlLmh0bWwiLCJzcmMvdGV4dC1kcmFnLWhhbmRsZXIuanMiLCJzcmMvdG9vbHRpcC5qcyIsInNyYy90cmVlLWRlc2lnbmVyLmpzIiwiaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLFNBQVMsaUJBQVQsQ0FBMkIsR0FBM0IsRUFBZ0MsR0FBaEMsRUFBcUM7QUFDbkMsTUFBSSxHQUFHLElBQUksSUFBUCxJQUFlLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBN0IsRUFBcUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFWOztBQUVyQyxPQUFLLElBQUksQ0FBQyxHQUFHLENBQVIsRUFBVyxJQUFJLEdBQUcsSUFBSSxLQUFKLENBQVUsR0FBVixDQUF2QixF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QUEsR0FBQSxFQUFBO0FBQUEsTUFBQSxHQUFBLEtBQUEsU0FBQSxJQUFBLEdBQUEsS0FBQSxZQUFBLEVBQUE7QUFBQSxNQUFBLEdBQUEsSUFBQSxPQUFBLElBQUEsT0FBQSxDQUFBLEdBQUEsQ0FBQSxLQUFBLFdBQUEsQ0FBQSxHQUFBLENBQUEsRUFBQTtBQUFBLEVBQUEsTUFBQSxDQUFBLGNBQUEsQ0FBQSxPQUFBLEVBQUEsR0FBQSxFQUFBO0FBQUEsSUFBQSxVQUFBLEVBQUEsSUFBQTtBQUFBLElBQUEsR0FBQSxFQUFBLFNBQUEsR0FBQSxHQUFBO0FBQUEsYUFBQSxXQUFBLENBQUEsR0FBQSxDQUFBO0FBQUE7QUFBQSxHQUFBO0FBQUEsQ0FBQTs7QUFDQSxJQUFBLFFBQUEsR0FBQSxPQUFBLENBQUEsVUFBQSxDQUFBOztBQUFBLE1BQUEsQ0FBQSxJQUFBLENBQUEsUUFBQSxFQUFBLE9BQUEsQ0FBQSxVQUFBLEdBQUEsRUFBQTtBQUFBLE1BQUEsR0FBQSxLQUFBLFNBQUEsSUFBQSxHQUFBLEtBQUEsWUFBQSxFQUFBO0FBQUEsTUFBQSxHQUFBLElBQUEsT0FBQSxJQUFBLE9BQUEsQ0FBQSxHQUFBLENBQUEsS0FBQSxRQUFBLENBQUEsR0FBQSxDQUFBLEVBQUE7QUFBQSxFQUFBLE1BQUEsQ0FBQSxjQUFBLENBQUEsT0FBQSxFQUFBLEdBQUEsRUFBQTtBQUFBLElBQUEsVUFBQSxFQUFBLElBQUE7QUFBQSxJQUFBLEdBQUEsRUFBQSxTQUFBLEdBQUEsR0FBQTtBQUFBLGFBQUEsUUFBQSxDQUFBLEdBQUEsQ0FBQTtBQUFBO0FBQUEsR0FBQTtBQUFBLENBQUE7O0FBQ0EsSUFBQSxZQUFBLEdBQUEsT0FBQSxDQUFBLGNBQUEsQ0FBQTs7QUFBQSxNQUFBLENBQUEsSUFBQSxDQUFBLFlBQUEsRUFBQSxPQUFBLENBQUEsVUFBQSxHQUFBLEVBQUE7QUFBQSxNQUFBLEdBQUEsS0FBQSxTQUFBLElBQUEsR0FBQSxLQUFBLFlBQUEsRUFBQTtBQUFBLE1BQUEsR0FBQSxJQUFBLE9BQUEsSUFBQSxPQUFBLENBQUEsR0FBQSxDQUFBLEtBQUEsWUFBQSxDQUFBLEdBQUEsQ0FBQSxFQUFBO0FBQUEsRUFBQSxNQUFBLENBQUEsY0FBQSxDQUFBLE9BQUEsRUFBQSxHQUFBLEVBQUE7QUFBQSxJQUFBLFVBQUEsRUFBQSxJQUFBO0FBQUEsSUFBQSxHQUFBLEVBQUEsU0FBQSxHQUFBLEdBQUE7QUFBQSxhQUFBLFlBQUEsQ0FBQSxHQUFBLENBQUE7QUFBQTtBQUFBLEdBQUE7QUFBQSxDQUFBOztBQUNBLElBQUEsUUFBQSxHQUFBLE9BQUEsQ0FBQSxVQUFBLENBQUE7O0FBQUEsTUFBQSxDQUFBLElBQUEsQ0FBQSxRQUFBLEVBQUEsT0FBQSxDQUFBLFVBQUEsR0FBQSxFQUFBO0FBQUEsTUFBQSxHQUFBLEtBQUEsU0FBQSxJQUFBLEdBQUEsS0FBQSxZQUFBLEVBQUE7QUFBQSxNQUFBLEdBQUEsSUFBQSxPQUFBLElBQUEsT0FBQSxDQUFBLEdBQUEsQ0FBQSxLQUFBLFFBQUEsQ0FBQSxHQUFBLENBQUEsRUFBQTtBQUFBLEVBQUEsTUFBQSxDQUFBLGNBQUEsQ0FBQSxPQUFBLEVBQUEsR0FBQSxFQUFBO0FBQUEsSUFBQSxVQUFBLEVBQUEsSUFBQTtBQUFBLElBQUEsR0FBQSxFQUFBLFNBQUEsR0FBQSxHQUFBO0FBQUEsYUFBQSxRQUFBLENBQUEsR0FBQSxDQUFBO0FBQUE7QUFBQSxHQUFBO0FBQUEsQ0FBQTs7QUFDQSxJQUFBLE9BQUEsR0FBQSxPQUFBLENBQUEsU0FBQSxDQUFBOztBQUFBLE1BQUEsQ0FBQSxJQUFBLENBQUEsT0FBQSxFQUFBLE9BQUEsQ0FBQSxVQUFBLEdBQUEsRUFBQTtBQUFBLE1BQUEsR0FBQSxLQUFBLFNBQUEsSUFBQSxHQUFBLEtBQUEsWUFBQSxFQUFBO0FBQUEsTUFBQSxHQUFBLElBQUEsT0FBQSxJQUFBLE9BQUEsQ0FBQSxHQUFBLENBQUEsS0FBQSxPQUFBLENBQUEsR0FBQSxDQUFBLEVBQUE7QUFBQSxFQUFBLE1BQUEsQ0FBQSxjQUFBLENBQUEsT0FBQSxFQUFBLEdBQUEsRUFBQTtBQUFBLElBQUEsVUFBQSxFQUFBLElBQUE7QUFBQSxJQUFBLEdBQUEsRUFBQSxTQUFBLEdBQUEsR0FBQTtBQUFBLGFBQUEsT0FBQSxDQUFBLEdBQUEsQ0FBQTtBQUFBO0FBQUEsR0FBQTtBQUFBLENBQUE7O0FBQ0EsSUFBQSxRQUFBLEdBQUEsT0FBQSxDQUFBLFVBQUEsQ0FBQTs7QUFBQSxNQUFBLENBQUEsSUFBQSxDQUFBLFFBQUEsRUFBQSxPQUFBLENBQUEsVUFBQSxHQUFBLEVBQUE7QUFBQSxNQUFBLEdBQUEsS0FBQSxTQUFBLElBQUEsR0FBQSxLQUFBLFlBQUEsRUFBQTtBQUFBLE1BQUEsR0FBQSxJQUFBLE9BQUEsSUFBQSxPQUFBLENBQUEsR0FBQSxDQUFBLEtBQUEsUUFBQSxDQUFBLEdBQUEsQ0FBQSxFQUFBO0FBQUEsRUFBQSxNQUFBLENBQUEsY0FBQSxDQUFBLE9BQUEsRUFBQSxHQUFBLEVBQUE7QUFBQSxJQUFBLFVBQUEsRUFBQSxJQUFBO0FBQUEsSUFBQSxHQUFBLEVBQUEsU0FBQSxHQUFBLEdBQUE7QUFBQSxhQUFBLFFBQUEsQ0FBQSxHQUFBLENBQUE7QUFBQTtBQUFBLEdBQUE7QUFBQSxDQUFBOztBQUNBLElBQUEsUUFBQSxHQUFBLE9BQUEsQ0FBQSxVQUFBLENBQUE7O0FBQUEsTUFBQSxDQUFBLElBQUEsQ0FBQSxRQUFBLEVBQUEsT0FBQSxDQUFBLFVBQUEsR0FBQSxFQUFBO0FBQUEsTUFBQSxHQUFBLEtBQUEsU0FBQSxJQUFBLEdBQUEsS0FBQSxZQUFBLEVBQUE7QUFBQSxNQUFBLEdBQUEsSUFBQSxPQUFBLElBQUEsT0FBQSxDQUFBLEdBQUEsQ0FBQSxLQUFBLFFBQUEsQ0FBQSxHQUFBLENBQUEsRUFBQTtBQUFBLEVBQUEsTUFBQSxDQUFBLGNBQUEsQ0FBQSxPQUFBLEVBQUEsR0FBQSxFQUFBO0FBQUEsSUFBQSxVQUFBLEVBQUEsSUFBQTtBQUFBLElBQUEsR0FBQSxFQUFBLFNBQUEsR0FBQSxHQUFBO0FBQUEsYUFBQSxRQUFBLENBQUEsR0FBQSxDQUFBO0FBQUE7QUFBQSxHQUFBO0FBQUEsQ0FBQTs7QUFDQSxJQUFBLFlBQUEsR0FBQSxPQUFBLENBQUEsY0FBQSxDQUFBOztBQUFBLE1BQUEsQ0FBQSxJQUFBLENBQUEsWUFBQSxFQUFBLE9BQUEsQ0FBQSxVQUFBLEdBQUEsRUFBQTtBQUFBLE1BQUEsR0FBQSxLQUFBLFNBQUEsSUFBQSxHQUFBLEtBQUEsWUFBQSxFQUFBO0FBQUEsTUFBQSxHQUFBLElBQUEsT0FBQSxJQUFBLE9BQUEsQ0FBQSxHQUFBLENBQUEsS0FBQSxZQUFBLENBQUEsR0FBQSxDQUFBLEVBQUE7QUFBQSxFQUFBLE1BQUEsQ0FBQSxjQUFBLENBQUEsT0FBQSxFQUFBLEdBQUEsRUFBQTtBQUFBLElBQUEsVUFBQSxFQUFBLElBQUE7QUFBQSxJQUFBLEdBQUEsRUFBQSxTQUFBLEdBQUEsR0FBQTtBQUFBLGFBQUEsWUFBQSxDQUFBLEdBQUEsQ0FBQTtBQUFBO0FBQUEsR0FBQTtBQUFBLENBQUE7O0FBQ0EsSUFBQSxhQUFBLEdBQUEsT0FBQSxDQUFBLGdCQUFBLENBQUE7O0FBQUEsTUFBQSxDQUFBLElBQUEsQ0FBQSxhQUFBLEVBQUEsT0FBQSxDQUFBLFVBQUEsR0FBQSxFQUFBO0FBQUEsTUFBQSxHQUFBLEtBQUEsU0FBQSxJQUFBLEdBQUEsS0FBQSxZQUFBLEVBQUE7QUFBQSxNQUFBLEdBQUEsSUFBQSxPQUFBLElBQUEsT0FBQSxDQUFBLEdBQUEsQ0FBQSxLQUFBLGFBQUEsQ0FBQSxHQUFBLENBQUEsRUFBQTtBQUFBLEVBQUEsTUFBQSxDQUFBLGNBQUEsQ0FBQSxPQUFBLEVBQUEsR0FBQSxFQUFBO0FBQUEsSUFBQSxVQUFBLEVBQUEsSUFBQTtBQUFBLElBQUEsR0FBQSxFQUFBLFNBQUEsR0FBQSxHQUFBO0FBQUEsYUFBQSxhQUFBLENBQUEsR0FBQSxDQUFBO0FBQUE7QUFBQSxHQUFBO0FBQUEsQ0FBQTs7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuRUEsSUFBQSxhQUFBLEdBQUEsT0FBQSxDQUFBLGlCQUFBLENBQUE7O0FBT0EsTUFBQSxDQUFBLElBQUEsQ0FBQSxhQUFBLEVBQUEsT0FBQSxDQUFBLFVBQUEsR0FBQSxFQUFBO0FBQUEsTUFBQSxHQUFBLEtBQUEsU0FBQSxJQUFBLEdBQUEsS0FBQSxZQUFBLEVBQUE7QUFBQSxNQUFBLE1BQUEsQ0FBQSxTQUFBLENBQUEsY0FBQSxDQUFBLElBQUEsQ0FBQSxZQUFBLEVBQUEsR0FBQSxDQUFBLEVBQUE7QUFBQSxNQUFBLEdBQUEsSUFBQSxPQUFBLElBQUEsT0FBQSxDQUFBLEdBQUEsQ0FBQSxLQUFBLGFBQUEsQ0FBQSxHQUFBLENBQUEsRUFBQTtBQUFBLEVBQUEsTUFBQSxDQUFBLGNBQUEsQ0FBQSxPQUFBLEVBQUEsR0FBQSxFQUFBO0FBQUEsSUFBQSxVQUFBLEVBQUEsSUFBQTtBQUFBLElBQUEsR0FBQSxFQUFBLFNBQUEsR0FBQSxHQUFBO0FBQUEsYUFBQSxhQUFBLENBQUEsR0FBQSxDQUFBO0FBQUE7QUFBQSxHQUFBO0FBQUEsQ0FBQTs7QUFKQSxJQUFBLGFBQUEsR0FBQSxPQUFBLENBQUEsaUJBQUEsQ0FBQTs7QUFBQSxNQUFBLENBQUEsSUFBQSxDQUFBLGFBQUEsRUFBQSxPQUFBLENBQUEsVUFBQSxHQUFBLEVBQUE7QUFBQSxNQUFBLEdBQUEsS0FBQSxTQUFBLElBQUEsR0FBQSxLQUFBLFlBQUEsRUFBQTtBQUFBLE1BQUEsTUFBQSxDQUFBLFNBQUEsQ0FBQSxjQUFBLENBQUEsSUFBQSxDQUFBLFlBQUEsRUFBQSxHQUFBLENBQUEsRUFBQTtBQUFBLE1BQUEsR0FBQSxJQUFBLE9BQUEsSUFBQSxPQUFBLENBQUEsR0FBQSxDQUFBLEtBQUEsYUFBQSxDQUFBLEdBQUEsQ0FBQSxFQUFBO0FBQUEsRUFBQSxNQUFBLENBQUEsY0FBQSxDQUFBLE9BQUEsRUFBQSxHQUFBLEVBQUE7QUFBQSxJQUFBLFVBQUEsRUFBQSxJQUFBO0FBQUEsSUFBQSxHQUFBLEVBQUEsU0FBQSxHQUFBLEdBQUE7QUFBQSxhQUFBLGFBQUEsQ0FBQSxHQUFBLENBQUE7QUFBQTtBQUFBLEdBQUE7QUFBQSxDQUFBOztBQUNBLElBQUEsU0FBQSxHQUFBLE9BQUEsQ0FBQSxhQUFBLENBQUE7O0FBQUEsTUFBQSxDQUFBLElBQUEsQ0FBQSxTQUFBLEVBQUEsT0FBQSxDQUFBLFVBQUEsR0FBQSxFQUFBO0FBQUEsTUFBQSxHQUFBLEtBQUEsU0FBQSxJQUFBLEdBQUEsS0FBQSxZQUFBLEVBQUE7QUFBQSxNQUFBLE1BQUEsQ0FBQSxTQUFBLENBQUEsY0FBQSxDQUFBLElBQUEsQ0FBQSxZQUFBLEVBQUEsR0FBQSxDQUFBLEVBQUE7QUFBQSxNQUFBLEdBQUEsSUFBQSxPQUFBLElBQUEsT0FBQSxDQUFBLEdBQUEsQ0FBQSxLQUFBLFNBQUEsQ0FBQSxHQUFBLENBQUEsRUFBQTtBQUFBLEVBQUEsTUFBQSxDQUFBLGNBQUEsQ0FBQSxPQUFBLEVBQUEsR0FBQSxFQUFBO0FBQUEsSUFBQSxVQUFBLEVBQUEsSUFBQTtBQUFBLElBQUEsR0FBQSxFQUFBLFNBQUEsR0FBQSxHQUFBO0FBQUEsYUFBQSxTQUFBLENBQUEsR0FBQSxDQUFBO0FBQUE7QUFBQSxHQUFBO0FBQUEsQ0FBQTs7QUFDQSxJQUFBLFVBQUEsR0FBQSxPQUFBLENBQUEsYUFBQSxDQUFBOztBQUFBLE1BQUEsQ0FBQSxJQUFBLENBQUEsVUFBQSxFQUFBLE9BQUEsQ0FBQSxVQUFBLEdBQUEsRUFBQTtBQUFBLE1BQUEsR0FBQSxLQUFBLFNBQUEsSUFBQSxHQUFBLEtBQUEsWUFBQSxFQUFBO0FBQUEsTUFBQSxNQUFBLENBQUEsU0FBQSxDQUFBLGNBQUEsQ0FBQSxJQUFBLENBQUEsWUFBQSxFQUFBLEdBQUEsQ0FBQSxFQUFBO0FBQUEsTUFBQSxHQUFBLElBQUEsT0FBQSxJQUFBLE9BQUEsQ0FBQSxHQUFBLENBQUEsS0FBQSxVQUFBLENBQUEsR0FBQSxDQUFBLEVBQUE7QUFBQSxFQUFBLE1BQUEsQ0FBQSxjQUFBLENBQUEsT0FBQSxFQUFBLEdBQUEsRUFBQTtBQUFBLElBQUEsVUFBQSxFQUFBLElBQUE7QUFBQSxJQUFBLEdBQUEsRUFBQSxTQUFBLEdBQUEsR0FBQTtBQUFBLGFBQUEsVUFBQSxDQUFBLEdBQUEsQ0FBQTtBQUFBO0FBQUEsR0FBQTtBQUFBLENBQUE7O0FBQ0EsSUFBQSxRQUFBLEdBQUEsT0FBQSxDQUFBLFdBQUEsQ0FBQTs7QUFBQSxNQUFBLENBQUEsSUFBQSxDQUFBLFFBQUEsRUFBQSxPQUFBLENBQUEsVUFBQSxHQUFBLEVBQUE7QUFBQSxNQUFBLEdBQUEsS0FBQSxTQUFBLElBQUEsR0FBQSxLQUFBLFlBQUEsRUFBQTtBQUFBLE1BQUEsTUFBQSxDQUFBLFNBQUEsQ0FBQSxjQUFBLENBQUEsSUFBQSxDQUFBLFlBQUEsRUFBQSxHQUFBLENBQUEsRUFBQTtBQUFBLE1BQUEsR0FBQSxJQUFBLE9BQUEsSUFBQSxPQUFBLENBQUEsR0FBQSxDQUFBLEtBQUEsUUFBQSxDQUFBLEdBQUEsQ0FBQSxFQUFBO0FBQUEsRUFBQSxNQUFBLENBQUEsY0FBQSxDQUFBLE9BQUEsRUFBQSxHQUFBLEVBQUE7QUFB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LEdBQUEsRUFBQTtBQUFBLElBQUEsVUFBQSxFQUFBLElBQUE7QUFBQSxJQUFBLEdBQUEsRUFBQSxTQUFBLEdBQUEsR0FBQTtBQUFBLGFBQUEsTUFBQSxDQUFBLEdBQUEsQ0FBQTtBQUFBO0FBQUEsR0FBQTtBQUFBLENBQUEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJmdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikge1xuICBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDtcblxuICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHtcbiAgICBhcnIyW2ldID0gYXJyW2ldO1xuICB9XG5cbiAgcmV0dXJuIGFycjI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2FycmF5TGlrZVRvQXJyYXk7XG5tb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0cywgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7IiwidmFyIGFycmF5TGlrZVRvQXJyYXkgPSByZXF1aXJlKFwiLi9hcnJheUxpa2VUb0FycmF5LmpzXCIpO1xuXG5mdW5jdGlvbiBfYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnJheUxpa2VUb0FycmF5KGFycik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2FycmF5V2l0aG91dEhvbGVzO1xubW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHMsIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlOyIsImZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikge1xuICBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIHNlbGY7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2Fzc2VydFRoaXNJbml0aWFsaXplZDtcbm1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzLCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTsiLCJmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9jbGFzc0NhbGxDaGVjaztcbm1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzLCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTsiLCJmdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICByZXR1cm4gQ29uc3RydWN0b3I7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2NyZWF0ZUNsYXNzO1xubW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHMsIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlOyIsImZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gX2dldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LmdldFByb3RvdHlwZU9mIDogZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHtcbiAgICByZXR1cm4gby5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKG8pO1xuICB9O1xuICBtb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0cywgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG4gIHJldHVybiBfZ2V0UHJvdG90eXBlT2Yobyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2dldFByb3RvdHlwZU9mO1xubW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHMsIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlOyIsInZhciBzZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoXCIuL3NldFByb3RvdHlwZU9mLmpzXCIpO1xuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcbiAgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvblwiKTtcbiAgfVxuXG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwge1xuICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICB2YWx1ZTogc3ViQ2xhc3MsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG4gIGlmIChzdXBlckNsYXNzKSBzZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2luaGVyaXRzO1xubW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHMsIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlOyIsImZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gIHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7XG4gICAgXCJkZWZhdWx0XCI6IG9ialxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0cywgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7IiwiZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheShpdGVyKSB7XG4gIGlmICh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIGl0ZXJbU3ltYm9sLml0ZXJhdG9yXSAhPSBudWxsIHx8IGl0ZXJbXCJAQGl0ZXJhdG9yXCJdICE9IG51bGwpIHJldHVybiBBcnJheS5mcm9tKGl0ZXIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pdGVyYWJsZVRvQXJyYXk7XG5tb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0cywgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7IiwiZnVuY3Rpb24gX25vbkl0ZXJhYmxlU3ByZWFkKCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIHNwcmVhZCBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfbm9uSXRlcmFibGVTcHJlYWQ7XG5tb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0cywgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7IiwidmFyIF90eXBlb2YgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy90eXBlb2ZcIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgYXNzZXJ0VGhpc0luaXRpYWxpemVkID0gcmVxdWlyZShcIi4vYXNzZXJ0VGhpc0luaXRpYWxpemVkLmpzXCIpO1xuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7XG4gIGlmIChjYWxsICYmIChfdHlwZW9mKGNhbGwpID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpKSB7XG4gICAgcmV0dXJuIGNhbGw7XG4gIH0gZWxzZSBpZiAoY2FsbCAhPT0gdm9pZCAwKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkRlcml2ZWQgY29uc3RydWN0b3JzIG1heSBvbmx5IHJldHVybiBvYmplY3Qgb3IgdW5kZWZpbmVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIGFzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjtcbm1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzLCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTsiLCJmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkge1xuICBtb2R1bGUuZXhwb3J0cyA9IF9zZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkge1xuICAgIG8uX19wcm90b19fID0gcDtcbiAgICByZXR1cm4gbztcbiAgfTtcblxuICBtb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0cywgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG4gIHJldHVybiBfc2V0UHJvdG90eXBlT2YobywgcCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3NldFByb3RvdHlwZU9mO1xubW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHMsIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlOyIsInZhciBhcnJheVdpdGhvdXRIb2xlcyA9IHJlcXVpcmUoXCIuL2FycmF5V2l0aG91dEhvbGVzLmpzXCIpO1xuXG52YXIgaXRlcmFibGVUb0FycmF5ID0gcmVxdWlyZShcIi4vaXRlcmFibGVUb0FycmF5LmpzXCIpO1xuXG52YXIgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkgPSByZXF1aXJlKFwiLi91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheS5qc1wiKTtcblxudmFyIG5vbkl0ZXJhYmxlU3ByZWFkID0gcmVxdWlyZShcIi4vbm9uSXRlcmFibGVTcHJlYWQuanNcIik7XG5cbmZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHtcbiAgcmV0dXJuIGFycmF5V2l0aG91dEhvbGVzKGFycikgfHwgaXRlcmFibGVUb0FycmF5KGFycikgfHwgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCBub25JdGVyYWJsZVNwcmVhZCgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF90b0NvbnN1bWFibGVBcnJheTtcbm1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzLCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTsiLCJmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7XG5cbiAgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgICAgIHJldHVybiB0eXBlb2Ygb2JqO1xuICAgIH07XG5cbiAgICBtb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0cywgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG4gIH0gZWxzZSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgICAgIHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqO1xuICAgIH07XG5cbiAgICBtb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0cywgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG4gIH1cblxuICByZXR1cm4gX3R5cGVvZihvYmopO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF90eXBlb2Y7XG5tb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0cywgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7IiwidmFyIGFycmF5TGlrZVRvQXJyYXkgPSByZXF1aXJlKFwiLi9hcnJheUxpa2VUb0FycmF5LmpzXCIpO1xuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7XG4gIGlmICghbykgcmV0dXJuO1xuICBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBhcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7XG4gIHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTtcbiAgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTtcbiAgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7XG4gIGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheTtcbm1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzLCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTsiLCJpbXBvcnQgKiBhcyBkMyBmcm9tIFwiLi9kM1wiO1xyXG5pbXBvcnQge1RlbXBsYXRlc30gZnJvbSBcIi4vdGVtcGxhdGVzXCI7XHJcbmltcG9ydCB7aTE4bn0gZnJvbSBcIi4vaTE4bi9pMThuXCI7XHJcbmltcG9ydCB7VXRpbHN9IGZyb20gXCJzZC11dGlsc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFwcFV0aWxzIHtcclxuXHJcbiAgICBzdGF0aWMgc2FuaXRpemVIZWlnaHQgPSBmdW5jdGlvbiAoaGVpZ2h0LCBjb250YWluZXIpIHtcclxuICAgICAgICByZXR1cm4gKGhlaWdodCB8fCBwYXJzZUludChjb250YWluZXIuc3R5bGUoJ2hlaWdodCcpLCAxMCkgfHwgNDAwKTtcclxuICAgIH07XHJcblxyXG4gICAgc3RhdGljIHNhbml0aXplV2lkdGggPSBmdW5jdGlvbiAod2lkdGgsIGNvbnRhaW5lcikge1xyXG4gICAgICAgIHJldHVybiAod2lkdGggfHwgcGFyc2VJbnQoY29udGFpbmVyLnN0eWxlKCd3aWR0aCcpLCAxMCkgfHwgOTYwKTtcclxuICAgIH07XHJcblxyXG4gICAgc3RhdGljIGF2YWlsYWJsZUhlaWdodCA9IGZ1bmN0aW9uIChoZWlnaHQsIGNvbnRhaW5lciwgbWFyZ2luKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KDAsIEFwcFV0aWxzLnNhbml0aXplSGVpZ2h0KGhlaWdodCwgY29udGFpbmVyKSAtIG1hcmdpbi50b3AgLSBtYXJnaW4uYm90dG9tKTtcclxuICAgIH07XHJcblxyXG4gICAgc3RhdGljIGF2YWlsYWJsZVdpZHRoID0gZnVuY3Rpb24gKHdpZHRoLCBjb250YWluZXIsIG1hcmdpbikge1xyXG4gICAgICAgIHJldHVybiBNYXRoLm1heCgwLCBBcHBVdGlscy5zYW5pdGl6ZVdpZHRoKHdpZHRoLCBjb250YWluZXIpIC0gbWFyZ2luLmxlZnQgLSBtYXJnaW4ucmlnaHQpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvL3BsYWNlcyB0ZXh0U3RyaW5nIGluIHRleHRPYmosIGFkZHMgYW4gZWxsaXBzaXMgaWYgdGV4dCBjYW4ndCBmaXQgaW4gd2lkdGhcclxuICAgIHN0YXRpYyBwbGFjZVRleHRXaXRoRWxsaXBzaXModGV4dEQzT2JqLCB0ZXh0U3RyaW5nLCB3aWR0aCkge1xyXG4gICAgICAgIHZhciB0ZXh0T2JqID0gdGV4dEQzT2JqLm5vZGUoKTtcclxuICAgICAgICB0ZXh0T2JqLnRleHRDb250ZW50ID0gdGV4dFN0cmluZztcclxuXHJcbiAgICAgICAgdmFyIG1hcmdpbiA9IDA7XHJcbiAgICAgICAgdmFyIGVsbGlwc2lzTGVuZ3RoID0gOTtcclxuICAgICAgICAvL2VsbGlwc2lzIGlzIG5lZWRlZFxyXG4gICAgICAgIGlmICh0ZXh0T2JqLmdldENvbXB1dGVkVGV4dExlbmd0aCgpID4gd2lkdGggKyBtYXJnaW4pIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgeCA9IHRleHRTdHJpbmcubGVuZ3RoIC0gMzsgeCA+IDA7IHggLT0gMSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRleHRPYmouZ2V0U3ViU3RyaW5nTGVuZ3RoKDAsIHgpICsgZWxsaXBzaXNMZW5ndGggPD0gd2lkdGggKyBtYXJnaW4pIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0T2JqLnRleHRDb250ZW50ID0gdGV4dFN0cmluZy5zdWJzdHJpbmcoMCwgeCkgKyBcIi4uLlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRleHRPYmoudGV4dENvbnRlbnQgPSBcIi4uLlwiOyAvL2Nhbid0IHBsYWNlIGF0IGFsbFxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBwbGFjZVRleHRXaXRoRWxsaXBzaXNBbmRUb29sdGlwKHRleHREM09iaiwgdGV4dFN0cmluZywgd2lkdGgsIHRvb2x0aXApIHtcclxuICAgICAgICB2YXIgZWxsaXBzaXNQbGFjZWQgPSBBcHBVdGlscy5wbGFjZVRleHRXaXRoRWxsaXBzaXModGV4dEQzT2JqLCB0ZXh0U3RyaW5nLCB3aWR0aCk7XHJcbiAgICAgICAgaWYgKGVsbGlwc2lzUGxhY2VkICYmIHRvb2x0aXApIHtcclxuICAgICAgICAgICAgdGV4dEQzT2JqLm9uKFwibW91c2VvdmVyXCIsIGZ1bmN0aW9uIChldmVudCwgZCkge1xyXG4gICAgICAgICAgICAgICAgdG9vbHRpcC50cmFuc2l0aW9uKClcclxuICAgICAgICAgICAgICAgICAgICAuZHVyYXRpb24oMjAwKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgLjkpO1xyXG4gICAgICAgICAgICAgICAgdG9vbHRpcC5odG1sKHRleHRTdHJpbmcpXHJcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwibGVmdFwiLCAoZXZlbnQucGFnZVggKyA1KSArIFwicHhcIilcclxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0b3BcIiwgKGV2ZW50LnBhZ2VZIC0gMjgpICsgXCJweFwiKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0ZXh0RDNPYmoub24oXCJtb3VzZW91dFwiLCBmdW5jdGlvbiAoZXZlbnQsIGQpIHtcclxuICAgICAgICAgICAgICAgIHRvb2x0aXAudHJhbnNpdGlvbigpXHJcbiAgICAgICAgICAgICAgICAgICAgLmR1cmF0aW9uKDUwMClcclxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIDApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXRGb250U2l6ZShlbGVtZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQsIG51bGwpLmdldFByb3BlcnR5VmFsdWUoXCJmb250LXNpemVcIik7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldFRyYW5zbGF0aW9uKHRyYW5zZm9ybSkge1xyXG4gICAgICAgIC8vIENyZWF0ZSBhIGR1bW15IGcgZm9yIGNhbGN1bGF0aW9uIHB1cnBvc2VzIG9ubHkuIFRoaXMgd2lsbCBuZXZlclxyXG4gICAgICAgIC8vIGJlIGFwcGVuZGVkIHRvIHRoZSBET00gYW5kIHdpbGwgYmUgZGlzY2FyZGVkIG9uY2UgdGhpcyBmdW5jdGlvblxyXG4gICAgICAgIC8vIHJldHVybnMuXHJcbiAgICAgICAgdmFyIGcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcImdcIik7XHJcblxyXG4gICAgICAgIC8vIFNldCB0aGUgdHJhbnNmb3JtIGF0dHJpYnV0ZSB0byB0aGUgcHJvdmlkZWQgc3RyaW5nIHZhbHVlLlxyXG4gICAgICAgIGcuc2V0QXR0cmlidXRlTlMobnVsbCwgXCJ0cmFuc2Zvcm1cIiwgdHJhbnNmb3JtKTtcclxuXHJcbiAgICAgICAgLy8gY29uc29saWRhdGUgdGhlIFNWR1RyYW5zZm9ybUxpc3QgY29udGFpbmluZyBhbGwgdHJhbnNmb3JtYXRpb25zXHJcbiAgICAgICAgLy8gdG8gYSBzaW5nbGUgU1ZHVHJhbnNmb3JtIG9mIHR5cGUgU1ZHX1RSQU5TRk9STV9NQVRSSVggYW5kIGdldFxyXG4gICAgICAgIC8vIGl0cyBTVkdNYXRyaXguXHJcbiAgICAgICAgdmFyIG1hdHJpeCA9IGcudHJhbnNmb3JtLmJhc2VWYWwuY29uc29saWRhdGUoKS5tYXRyaXg7XHJcblxyXG4gICAgICAgIC8vIEFzIHBlciBkZWZpbml0aW9uIHZhbHVlcyBlIGFuZCBmIGFyZSB0aGUgb25lcyBmb3IgdGhlIHRyYW5zbGF0aW9uLlxyXG4gICAgICAgIHJldHVybiBbbWF0cml4LmUsIG1hdHJpeC5mXTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgc3RhdGljIGNsb3Nlc3RQb2ludChwYXRoTm9kZSwgcG9pbnQpIHtcclxuICAgICAgICB2YXIgcGF0aExlbmd0aCA9IHBhdGhOb2RlLmdldFRvdGFsTGVuZ3RoKCksXHJcbiAgICAgICAgICAgIHByZWNpc2lvbiA9IDgsXHJcbiAgICAgICAgICAgIGJlc3QsXHJcbiAgICAgICAgICAgIGJlc3RMZW5ndGgsXHJcbiAgICAgICAgICAgIGJlc3REaXN0YW5jZSA9IEluZmluaXR5O1xyXG5cclxuICAgICAgICAvLyBsaW5lYXIgc2NhbiBmb3IgY29hcnNlIGFwcHJveGltYXRpb25cclxuICAgICAgICBmb3IgKHZhciBzY2FuLCBzY2FuTGVuZ3RoID0gMCwgc2NhbkRpc3RhbmNlOyBzY2FuTGVuZ3RoIDw9IHBhdGhMZW5ndGg7IHNjYW5MZW5ndGggKz0gcHJlY2lzaW9uKSB7XHJcbiAgICAgICAgICAgIGlmICgoc2NhbkRpc3RhbmNlID0gZGlzdGFuY2UyKHNjYW4gPSBwYXRoTm9kZS5nZXRQb2ludEF0TGVuZ3RoKHNjYW5MZW5ndGgpKSkgPCBiZXN0RGlzdGFuY2UpIHtcclxuICAgICAgICAgICAgICAgIGJlc3QgPSBzY2FuLCBiZXN0TGVuZ3RoID0gc2Nhbkxlbmd0aCwgYmVzdERpc3RhbmNlID0gc2NhbkRpc3RhbmNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBiaW5hcnkgc2VhcmNoIGZvciBwcmVjaXNlIGVzdGltYXRlXHJcbiAgICAgICAgcHJlY2lzaW9uIC89IDI7XHJcbiAgICAgICAgd2hpbGUgKHByZWNpc2lvbiA+IDAuNSkge1xyXG4gICAgICAgICAgICB2YXIgYmVmb3JlLFxyXG4gICAgICAgICAgICAgICAgYWZ0ZXIsXHJcbiAgICAgICAgICAgICAgICBiZWZvcmVMZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBhZnRlckxlbmd0aCxcclxuICAgICAgICAgICAgICAgIGJlZm9yZURpc3RhbmNlLFxyXG4gICAgICAgICAgICAgICAgYWZ0ZXJEaXN0YW5jZTtcclxuICAgICAgICAgICAgaWYgKChiZWZvcmVMZW5ndGggPSBiZXN0TGVuZ3RoIC0gcHJlY2lzaW9uKSA+PSAwICYmIChiZWZvcmVEaXN0YW5jZSA9IGRpc3RhbmNlMihiZWZvcmUgPSBwYXRoTm9kZS5nZXRQb2ludEF0TGVuZ3RoKGJlZm9yZUxlbmd0aCkpKSA8IGJlc3REaXN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgYmVzdCA9IGJlZm9yZSwgYmVzdExlbmd0aCA9IGJlZm9yZUxlbmd0aCwgYmVzdERpc3RhbmNlID0gYmVmb3JlRGlzdGFuY2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKGFmdGVyTGVuZ3RoID0gYmVzdExlbmd0aCArIHByZWNpc2lvbikgPD0gcGF0aExlbmd0aCAmJiAoYWZ0ZXJEaXN0YW5jZSA9IGRpc3RhbmNlMihhZnRlciA9IHBhdGhOb2RlLmdldFBvaW50QXRMZW5ndGgoYWZ0ZXJMZW5ndGgpKSkgPCBiZXN0RGlzdGFuY2UpIHtcclxuICAgICAgICAgICAgICAgIGJlc3QgPSBhZnRlciwgYmVzdExlbmd0aCA9IGFmdGVyTGVuZ3RoLCBiZXN0RGlzdGFuY2UgPSBhZnRlckRpc3RhbmNlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcHJlY2lzaW9uIC89IDI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGJlc3QgPSBbYmVzdC54LCBiZXN0LnldO1xyXG4gICAgICAgIGJlc3QuZGlzdGFuY2UgPSBNYXRoLnNxcnQoYmVzdERpc3RhbmNlKTtcclxuICAgICAgICByZXR1cm4gYmVzdDtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZGlzdGFuY2UyKHApIHtcclxuICAgICAgICAgICAgdmFyIGR4ID0gcC54IC0gcG9pbnRbMF0sXHJcbiAgICAgICAgICAgICAgICBkeSA9IHAueSAtIHBvaW50WzFdO1xyXG4gICAgICAgICAgICByZXR1cm4gZHggKiBkeCArIGR5ICogZHk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBncm93bChtZXNzYWdlLCB0eXBlPSdpbmZvJywgcG9zaXRpb249J3JpZ2h0JywgdGltZSA9IDIwMDApe1xyXG4gICAgICAgIHZhciBodG1sID0gVGVtcGxhdGVzLmdldCgnZ3Jvd2wnLCB7bWVzc2FnZTptZXNzYWdlLCB0eXBlOnR5cGV9KVxyXG5cclxuICAgICAgICB2YXIgZyA9IGQzLnNlbGVjdCgnYm9keScpLnNlbGVjdE9yQXBwZW5kKCdkaXYuc2QtZ3Jvd2wtbGlzdC4nK3Bvc2l0aW9uKS5hcHBlbmQoJ2RpdicpLmh0bWwoaHRtbCk7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBnLnJlbW92ZSgpO1xyXG4gICAgICAgIH0sIHRpbWUpXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHN0YXRpYyBjcmVhdGVFbGVtZW50KHRhZywgYXR0cmlicywgcGFyZW50KSB7XHJcbiAgICAgICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xyXG5cclxuICAgICAgICBpZiAoYXR0cmlicykge1xyXG4gICAgICAgICAgICBBcHBVdGlscy5kZWVwRXh0ZW5kKGVsLCBhdHRyaWJzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHBhcmVudCkge1xyXG4gICAgICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoZWwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZWw7XHJcbiAgICB9O1xyXG5cclxuICAgIHN0YXRpYyByZW1vdmVFbGVtZW50KGVsZW1lbnQpIHtcclxuICAgICAgICBlbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHJlcGxhY2VVcmxzKHRleHQpe1xyXG4gICAgICAgIGlmKCF0ZXh0KXtcclxuICAgICAgICAgICAgcmV0dXJuIHRleHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciB1cmxSZWdleHAgPSAvKChmdHB8aHR0cHxodHRwcyk6XFwvXFwvKFxcdys6ezAsMX1cXHcqQCk/KFxcUyspKDpbMC05XSspPyhcXC98XFwvKFtcXHcjITouPys9JiVAIVxcLVxcL10pKT8pL1xyXG5cclxuICAgICAgICByZXR1cm4gdGV4dC5yZXBsYWNlKHVybFJlZ2V4cCwgJzxhIGhyZWY9XCIkMVwiIHRhcmdldD1cIl9ibGFua1wiPiQxPC9hPicpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBlc2NhcGVIdG1sKGh0bWwpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShodG1sKTtcclxuICAgICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgZGl2LmFwcGVuZENoaWxkKHRleHQpO1xyXG4gICAgICAgIHJldHVybiBkaXYuaW5uZXJIVE1MO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBkaXNwYXRjaEh0bWxFdmVudChlbGVtZW50LCBuYW1lKXtcclxuICAgICAgICBpZiAoXCJjcmVhdGVFdmVudFwiIGluIGRvY3VtZW50KSB7XHJcbiAgICAgICAgICAgIHZhciBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudChcIkhUTUxFdmVudHNcIik7XHJcbiAgICAgICAgICAgIGV2dC5pbml0RXZlbnQobmFtZSwgZmFsc2UsIHRydWUpO1xyXG4gICAgICAgICAgICBlbGVtZW50LmRpc3BhdGNoRXZlbnQoZXZ0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBlbGVtZW50LmZpcmVFdmVudChcIm9uXCIrbmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGRpc3BhdGNoRXZlbnQobmFtZSwgZGF0YSl7XHJcbiAgICAgICAgdmFyIGV2ZW50O1xyXG4gICAgICAgIHRyeXtcclxuICAgICAgICAgICAgZXZlbnQgPSBuZXcgIEN1c3RvbUV2ZW50KG5hbWUseyAnZGV0YWlsJzogZGF0YSB9KTtcclxuICAgICAgICB9Y2F0Y2ggKGUpeyAvL0lFXHJcbiAgICAgICAgICAgIGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XHJcbiAgICAgICAgICAgIGV2ZW50LmluaXRDdXN0b21FdmVudChuYW1lLCBmYWxzZSwgZmFsc2UsIGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0VmFsaWRhdGlvbk1lc3NhZ2UoZXJyb3Ipe1xyXG4gICAgICAgIGlmKFV0aWxzLmlzU3RyaW5nKGVycm9yKSl7XHJcbiAgICAgICAgICAgIGVycm9yID0ge25hbWU6IGVycm9yfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGtleSA9ICd2YWxpZGF0aW9uLicgKyBlcnJvci5uYW1lO1xyXG4gICAgICAgIHJldHVybiBpMThuLnQoa2V5LCBlcnJvci5kYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgaGlkZShzZWxlY3Rpb24pe1xyXG4gICAgICAgIHNlbGVjdGlvbi5jbGFzc2VkKCdzZC1oaWRkZW4nLCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgc2hvdyhzZWxlY3Rpb24sIHNob3c9dHJ1ZSl7XHJcbiAgICAgICAgc2VsZWN0aW9uLmNsYXNzZWQoJ3NkLWhpZGRlbicsICFzaG93KTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIHN0YXRpYyBpc0hpZGRlbihlbCwgZXhhY3QgPSB0cnVlKSB7XHJcbiAgICAgICAgaWYoIWVsKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGV4YWN0KXtcclxuICAgICAgICAgICAgdmFyIHN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwpO1xyXG4gICAgICAgICAgICByZXR1cm4gKHN0eWxlLmRpc3BsYXkgPT09ICdub25lJylcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChlbC5vZmZzZXRQYXJlbnQgPT09IG51bGwpXHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldEpTT04odXJsLCBjYWxsYmFjaykge1xyXG4gICAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICB4aHIub3BlbignZ2V0JywgdXJsLCB0cnVlKTtcclxuICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xyXG4gICAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBzdGF0dXMgPSB4aHIuc3RhdHVzO1xyXG4gICAgICAgICAgICBpZiAoc3RhdHVzID09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soeGhyLnJlc3BvbnNlLCBudWxsKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIHN0YXR1cyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHhoci5zZW5kKCk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgZDMgZnJvbSAnLi4vZDMnXHJcblxyXG4vKmJhc2VkIG9uOlxyXG4gKiBnaXRodWIuY29tL3BhdG9yamsvZDMtY29udGV4dC1tZW51ICovXHJcblxyXG5leHBvcnQgY2xhc3MgQ29udGV4dE1lbnUge1xyXG4gICAgb3BlbkNhbGxiYWNrO1xyXG4gICAgY2xvc2VDYWxsYmFjaztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihtZW51LCBvcHRzKSB7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIG9wdHMgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgc2VsZi5vcGVuQ2FsbGJhY2sgPSBvcHRzO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG9wdHMgPSBvcHRzIHx8IHt9O1xyXG4gICAgICAgICAgICBzZWxmLm9wZW5DYWxsYmFjayA9IG9wdHMub25PcGVuO1xyXG4gICAgICAgICAgICBzZWxmLmNsb3NlQ2FsbGJhY2sgPSBvcHRzLm9uQ2xvc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBjcmVhdGUgdGhlIGRpdiBlbGVtZW50IHRoYXQgd2lsbCBob2xkIHRoZSBjb250ZXh0IG1lbnVcclxuICAgICAgICBkMy5zZWxlY3RBbGwoJy5kMy1jb250ZXh0LW1lbnUnKS5kYXRhKFsxXSlcclxuICAgICAgICAgICAgLmVudGVyKClcclxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcclxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2QzLWNvbnRleHQtbWVudScpO1xyXG5cclxuICAgICAgICAvLyBjbG9zZSBtZW51XHJcbiAgICAgICAgZDMuc2VsZWN0KCdib2R5Jykub24oJ2NsaWNrLmQzLWNvbnRleHQtbWVudScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZDMuc2VsZWN0KCcuZDMtY29udGV4dC1tZW51Jykuc3R5bGUoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgICAgICBpZiAoc2VsZi5jbG9zZUNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmNsb3NlQ2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyB0aGlzIGdldHMgZXhlY3V0ZWQgd2hlbiBhIGNvbnRleHRtZW51IGV2ZW50IG9jY3Vyc1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZXZlbnQsIGRhdGEpIHtcclxuICAgICAgICAgICAgdmFyIGVsbSA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBkMy5zZWxlY3RBbGwoJy5kMy1jb250ZXh0LW1lbnUnKS5odG1sKCcnKTtcclxuICAgICAgICAgICAgdmFyIGxpc3QgPSBkMy5zZWxlY3RBbGwoJy5kMy1jb250ZXh0LW1lbnUnKVxyXG4gICAgICAgICAgICAgICAgLm9uKCdjb250ZXh0bWVudScsIGZ1bmN0aW9uIChldmVudCwgZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGQzLnNlbGVjdCgnLmQzLWNvbnRleHQtbWVudScpLnN0eWxlKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJ3VsJyk7XHJcbiAgICAgICAgICAgIGxpc3Quc2VsZWN0QWxsKCdsaScpLmRhdGEodHlwZW9mIG1lbnUgPT09ICdmdW5jdGlvbicgPyBtZW51KGRhdGEpIDogbWVudSkuZW50ZXIoKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgnbGknKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgZnVuY3Rpb24gKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmV0ID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGQuZGl2aWRlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXQgKz0gJyBpcy1kaXZpZGVyJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGQuZGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0ICs9ICcgaXMtZGlzYWJsZWQnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWQuYWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldCArPSAnIGlzLWhlYWRlcic7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXQ7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmh0bWwoZnVuY3Rpb24gKGQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZC5kaXZpZGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnPGhyPic7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZC50aXRsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdObyB0aXRsZSBhdHRyaWJ1dGUgc2V0LiBDaGVjayB0aGUgc3BlbGxpbmcgb2YgeW91ciBvcHRpb25zLicpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHR5cGVvZiBkLnRpdGxlID09PSAnc3RyaW5nJykgPyBkLnRpdGxlIDogZC50aXRsZShkYXRhKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50LCBkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGQuZGlzYWJsZWQpIHJldHVybjsgLy8gZG8gbm90aGluZyBpZiBkaXNhYmxlZFxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZC5hY3Rpb24pIHJldHVybjsgLy8gaGVhZGVycyBoYXZlIG5vIFwiYWN0aW9uXCJcclxuICAgICAgICAgICAgICAgICAgICBkLmFjdGlvbihlbG0sIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGQzLnNlbGVjdCgnLmQzLWNvbnRleHQtbWVudScpLnN0eWxlKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYuY2xvc2VDYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNsb3NlQ2FsbGJhY2soKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIHRoZSBvcGVuQ2FsbGJhY2sgYWxsb3dzIGFuIGFjdGlvbiB0byBmaXJlIGJlZm9yZSB0aGUgbWVudSBpcyBkaXNwbGF5ZWRcclxuICAgICAgICAgICAgLy8gYW4gZXhhbXBsZSB1c2FnZSB3b3VsZCBiZSBjbG9zaW5nIGEgdG9vbHRpcFxyXG4gICAgICAgICAgICBpZiAoc2VsZi5vcGVuQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIGlmIChzZWxmLm9wZW5DYWxsYmFjayhldmVudCwgZGF0YSkgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBkaXNwbGF5IGNvbnRleHQgbWVudVxyXG4gICAgICAgICAgICBkMy5zZWxlY3QoJy5kMy1jb250ZXh0LW1lbnUnKVxyXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdsZWZ0JywgKGV2ZW50LnBhZ2VYIC0gMikgKyAncHgnKVxyXG4gICAgICAgICAgICAgICAgLnN0eWxlKCd0b3AnLCAoZXZlbnQucGFnZVkgLSAyKSArICdweCcpXHJcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuXHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG5cclxuICAgIHN0YXRpYyBoaWRlKCkge1xyXG4gICAgICAgIGQzLnNlbGVjdCgnLmQzLWNvbnRleHQtbWVudScpLnN0eWxlKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHtDb250ZXh0TWVudX0gZnJvbSAnLi9jb250ZXh0LW1lbnUnXHJcbmltcG9ydCB7aTE4bn0gZnJvbSBcIi4uL2kxOG4vaTE4blwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEVkZ2VDb250ZXh0TWVudSBleHRlbmRzIENvbnRleHRNZW51IHtcclxuICAgIHRyZWVEZXNpZ25lcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih0cmVlRGVzaWduZXIpIHtcclxuICAgICAgICB2YXIgbWVudSA9IGZ1bmN0aW9uIChkKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgbWVudSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgbWVudS5wdXNoKHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51LmVkZ2UuaW5qZWN0RGVjaXNpb25Ob2RlJyksXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuaW5qZWN0RGVjaXNpb25Ob2RlKGQpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBtZW51LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUuZWRnZS5pbmplY3RDaGFuY2VOb2RlJyksXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuaW5qZWN0Q2hhbmNlTm9kZShkKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbWVudTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBzdXBlcihtZW51KTtcclxuICAgICAgICB0aGlzLnRyZWVEZXNpZ25lciA9IHRyZWVEZXNpZ25lcjtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQge0NvbnRleHRNZW51fSBmcm9tICcuL2NvbnRleHQtbWVudSdcclxuaW1wb3J0IHtkb21haW4gYXMgbW9kZWx9IGZyb20gJ3NkLW1vZGVsJ1xyXG5pbXBvcnQgKiBhcyBkMyBmcm9tICcuLi9kMydcclxuaW1wb3J0IHtpMThufSBmcm9tIFwiLi4vaTE4bi9pMThuXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTWFpbkNvbnRleHRNZW51IGV4dGVuZHMgQ29udGV4dE1lbnUge1xyXG4gICAgdHJlZURlc2lnbmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHRyZWVEZXNpZ25lcikge1xyXG4gICAgICAgIHZhciBtb3VzZVBvc2l0aW9uID0gbnVsbDtcclxuICAgICAgICB2YXIgbWVudSA9IGZ1bmN0aW9uIChkKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgbWVudSA9IFtdO1xyXG4gICAgICAgICAgICBtZW51LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubWFpbi5hZGREZWNpc2lvbk5vZGUnKSxcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdOb2RlID0gbmV3IG1vZGVsLkRlY2lzaW9uTm9kZShtb3VzZVBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuYWRkTm9kZShuZXdOb2RlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbWVudS5wdXNoKHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm1haW4uYWRkQ2hhbmNlTm9kZScpLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld05vZGUgPSBuZXcgbW9kZWwuQ2hhbmNlTm9kZShtb3VzZVBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuYWRkTm9kZShuZXdOb2RlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbWVudS5wdXNoKHtkaXZpZGVyOiB0cnVlfSk7XHJcbiAgICAgICAgICAgIG1lbnUucHVzaCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5tYWluLmFkZFRleHQnKSxcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdUZXh0ID0gbmV3IG1vZGVsLlRleHQobW91c2VQb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLmFkZFRleHQobmV3VGV4dCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG1lbnUucHVzaCh7ZGl2aWRlcjogdHJ1ZX0pO1xyXG4gICAgICAgICAgICBtZW51LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubWFpbi5wYXN0ZScpLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLnBhc3RlVG9OZXdMb2NhdGlvbihtb3VzZVBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogIXRyZWVEZXNpZ25lci5jb3BpZWROb2RlcyB8fCAhdHJlZURlc2lnbmVyLmNvcGllZE5vZGVzLmxlbmd0aFxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG1lbnUucHVzaCh7ZGl2aWRlcjogdHJ1ZX0pO1xyXG5cclxuICAgICAgICAgICAgbWVudS5wdXNoKHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm1haW4uc2VsZWN0QWxsTm9kZXMnKSxcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5zZWxlY3RBbGxOb2RlcygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIG1lbnU7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgc3VwZXIobWVudSwge29uT3BlbjogKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHRyZWVEZXNpZ25lci5jbGVhclNlbGVjdGlvbigpO1xyXG4gICAgICAgICAgICBtb3VzZVBvc2l0aW9uID0gbmV3IG1vZGVsLlBvaW50KGQzLnBvaW50ZXIoZXZlbnQsIHRyZWVEZXNpZ25lci5zdmcubm9kZSgpKSkubW92ZSh0cmVlRGVzaWduZXIuZ2V0TWFpbkdyb3VwVHJhbnNsYXRpb24odHJ1ZSkpO1xyXG5cclxuICAgICAgICB9fSk7XHJcbiAgICAgICAgdGhpcy50cmVlRGVzaWduZXIgPSB0cmVlRGVzaWduZXI7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHtDb250ZXh0TWVudX0gZnJvbSAnLi9jb250ZXh0LW1lbnUnXHJcbmltcG9ydCB7ZG9tYWluIGFzIG1vZGVsfSBmcm9tICdzZC1tb2RlbCdcclxuaW1wb3J0IHtpMThufSBmcm9tIFwiLi4vaTE4bi9pMThuXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTm9kZUNvbnRleHRNZW51IGV4dGVuZHMgQ29udGV4dE1lbnUge1xyXG4gICAgdHJlZURlc2lnbmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHRyZWVEZXNpZ25lciwgb3BlcmF0aW9uc0Zvck9iamVjdCkge1xyXG4gICAgICAgIHZhciBtZW51ID0gZnVuY3Rpb24gKGQpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBjb3B5TWVudUl0ZW0gPSB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5ub2RlLmNvcHknKSxcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5zZWxlY3ROb2RlKGQsICF0cmVlRGVzaWduZXIuaXNOb2RlU2VsZWN0ZWQoZCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5jb3B5U2VsZWN0ZWROb2RlcygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB2YXIgY3V0TWVudUl0ZW0gPSB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5ub2RlLmN1dCcpLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLnNlbGVjdE5vZGUoZCwgIXRyZWVEZXNpZ25lci5pc05vZGVTZWxlY3RlZChkKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLmN1dFNlbGVjdGVkTm9kZXMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdmFyIHBhc3RlTWVudUl0ZW0gPSB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5ub2RlLnBhc3RlJyksXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIucGFzdGVUb05vZGUoZCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGQuZm9sZGVkIHx8ICF0cmVlRGVzaWduZXIuY29waWVkTm9kZXMgfHwgIXRyZWVEZXNpZ25lci5jb3BpZWROb2Rlcy5sZW5ndGhcclxuXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHZhciBkZWxldGVNZW51SXRlbSA9IHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm5vZGUuZGVsZXRlJyksXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLnNlbGVjdE5vZGUoZCwgIXRyZWVEZXNpZ25lci5pc05vZGVTZWxlY3RlZChkKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLnJlbW92ZVNlbGVjdGVkTm9kZXMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgbWVudSA9IFtdO1xyXG4gICAgICAgICAgICBpZiAoZC50eXBlID09IG1vZGVsLlRlcm1pbmFsTm9kZS4kVFlQRSkge1xyXG4gICAgICAgICAgICAgICAgbWVudSA9IFtjb3B5TWVudUl0ZW0sIGN1dE1lbnVJdGVtLCBkZWxldGVNZW51SXRlbV07XHJcbiAgICAgICAgICAgICAgICBOb2RlQ29udGV4dE1lbnUuYWRkTm9kZUNvbnZlcnNpb25PcHRpb25zKGQsIG1lbnUsIHRyZWVEZXNpZ25lcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbWVudTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoIWQuZm9sZGVkKXtcclxuICAgICAgICAgICAgICAgIG1lbnUucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubm9kZS5hZGREZWNpc2lvbk5vZGUnKSxcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLmFkZERlY2lzaW9uTm9kZShkKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgbWVudS5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5ub2RlLmFkZENoYW5jZU5vZGUnKSxcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLmFkZENoYW5jZU5vZGUoZClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIG1lbnUucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubm9kZS5hZGRUZXJtaW5hbE5vZGUnKSxcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLmFkZFRlcm1pbmFsTm9kZShkKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgbWVudS5wdXNoKHtkaXZpZGVyOiB0cnVlfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG1lbnUucHVzaChjb3B5TWVudUl0ZW0pO1xyXG4gICAgICAgICAgICBtZW51LnB1c2goY3V0TWVudUl0ZW0pO1xyXG4gICAgICAgICAgICBtZW51LnB1c2gocGFzdGVNZW51SXRlbSk7XHJcbiAgICAgICAgICAgIG1lbnUucHVzaChkZWxldGVNZW51SXRlbSk7XHJcblxyXG4gICAgICAgICAgICBOb2RlQ29udGV4dE1lbnUuYWRkTm9kZUNvbnZlcnNpb25PcHRpb25zKGQsIG1lbnUsIHRyZWVEZXNpZ25lcik7XHJcbiAgICAgICAgICAgIG1lbnUucHVzaCh7ZGl2aWRlcjogdHJ1ZX0pO1xyXG4gICAgICAgICAgICBtZW51LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubm9kZS5zZWxlY3RTdWJ0cmVlJyksXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuc2VsZWN0U3ViVHJlZShkLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZighZC5mb2xkZWQpe1xyXG4gICAgICAgICAgICAgICAgbWVudS5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5ub2RlLmZvbGQnKSxcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLmZvbGRTdWJ0cmVlKGQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIG1lbnUucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubm9kZS51bmZvbGQnKSxcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLmZvbGRTdWJ0cmVlKGQsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYob3BlcmF0aW9uc0Zvck9iamVjdCl7XHJcbiAgICAgICAgICAgICAgICB2YXIgb3BlcmF0aW9ucyA9IG9wZXJhdGlvbnNGb3JPYmplY3QoZCk7XHJcbiAgICAgICAgICAgICAgICBpZihvcGVyYXRpb25zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1lbnUucHVzaCh7ZGl2aWRlcjogdHJ1ZX0pO1xyXG4gICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvbnMuZm9yRWFjaChvcD0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZW51LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubm9kZS4nK29wLm5hbWUpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLnBlcmZvcm1PcGVyYXRpb24oZCwgb3ApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhb3AuY2FuUGVyZm9ybShkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbWVudTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBzdXBlcihtZW51KTtcclxuICAgICAgICB0aGlzLnRyZWVEZXNpZ25lciA9IHRyZWVEZXNpZ25lcjtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgYWRkTm9kZUNvbnZlcnNpb25PcHRpb25zKGQsIG1lbnUsIHRyZWVEZXNpZ25lcil7XHJcbiAgICAgICAgdmFyIGNvbnZlcnNpb25PcHRpb25zID0gTm9kZUNvbnRleHRNZW51LmdldE5vZGVDb252ZXJzaW9uT3B0aW9ucyhkLCB0cmVlRGVzaWduZXIpO1xyXG4gICAgICAgIGlmKGNvbnZlcnNpb25PcHRpb25zLmxlbmd0aCl7XHJcbiAgICAgICAgICAgIG1lbnUucHVzaCh7ZGl2aWRlcjogdHJ1ZX0pO1xyXG4gICAgICAgICAgICBjb252ZXJzaW9uT3B0aW9ucy5mb3JFYWNoKG89Pm1lbnUucHVzaChvKSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0Tm9kZUNvbnZlcnNpb25PcHRpb25zKGQsIHRyZWVEZXNpZ25lcil7XHJcbiAgICAgICAgdmFyIG9wdGlvbnMgPSBbXTtcclxuXHJcbiAgICAgICAgaWYoZC5mb2xkZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgYWxsQWxsb3dlZFR5cGVzID0gW21vZGVsLkRlY2lzaW9uTm9kZS4kVFlQRSwgbW9kZWwuQ2hhbmNlTm9kZS4kVFlQRSwgbW9kZWwuVGVybWluYWxOb2RlLiRUWVBFXTtcclxuXHJcbiAgICAgICAgaWYoIWQuY2hpbGRFZGdlcy5sZW5ndGggJiYgZC4kcGFyZW50KXtcclxuICAgICAgICAgICAgYWxsQWxsb3dlZFR5cGVzLmZpbHRlcih0PT50IT09ZC50eXBlKS5mb3JFYWNoKHR5cGU9PntcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaChOb2RlQ29udGV4dE1lbnUuZ2V0Tm9kZUNvbnZlcnNpb25PcHRpb24odHlwZSwgdHJlZURlc2lnbmVyKSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgaWYoZCBpbnN0YW5jZW9mIG1vZGVsLkRlY2lzaW9uTm9kZSl7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLnB1c2goTm9kZUNvbnRleHRNZW51LmdldE5vZGVDb252ZXJzaW9uT3B0aW9uKG1vZGVsLkNoYW5jZU5vZGUuJFRZUEUsIHRyZWVEZXNpZ25lcikpXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5wdXNoKE5vZGVDb250ZXh0TWVudS5nZXROb2RlQ29udmVyc2lvbk9wdGlvbihtb2RlbC5EZWNpc2lvbk5vZGUuJFRZUEUsIHRyZWVEZXNpZ25lcikpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9wdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldE5vZGVDb252ZXJzaW9uT3B0aW9uKHR5cGVUb0NvbnZlcnRUbywgdHJlZURlc2lnbmVyKXtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5ub2RlLmNvbnZlcnQuJyt0eXBlVG9Db252ZXJ0VG8pLFxyXG4gICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQpIHtcclxuICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5jb252ZXJ0Tm9kZShkLCB0eXBlVG9Db252ZXJ0VG8pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQge0NvbnRleHRNZW51fSBmcm9tICcuL2NvbnRleHQtbWVudSdcclxuaW1wb3J0IHtpMThufSBmcm9tIFwiLi4vaTE4bi9pMThuXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVGV4dENvbnRleHRNZW51IGV4dGVuZHMgQ29udGV4dE1lbnUge1xyXG4gICAgdHJlZURlc2lnbmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHRyZWVEZXNpZ25lcikge1xyXG4gICAgICAgIHZhciBtZW51ID0gZnVuY3Rpb24gKGQpIHtcclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgZGVsZXRlTWVudUl0ZW0gPSB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS50ZXh0LmRlbGV0ZScpLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5zZWxlY3RUZXh0KGQsIHRydWUsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5yZW1vdmVTZWxlY3RlZFRleHRzKClcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHZhciBtZW51ID0gW107XHJcbiAgICAgICAgICAgIG1lbnUucHVzaChkZWxldGVNZW51SXRlbSk7XHJcbiAgICAgICAgICAgIHJldHVybiBtZW51O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHN1cGVyKG1lbnUpO1xyXG4gICAgICAgIHRoaXMudHJlZURlc2lnbmVyID0gdHJlZURlc2lnbmVyO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCAqIGFzIGQzIGZyb20gJy4vZDMnXHJcblxyXG5leHBvcnQgY2xhc3MgRDNFeHRlbnNpb25zIHtcclxuXHJcbiAgICBzdGF0aWMgZXh0ZW5kKCkge1xyXG5cclxuICAgICAgICBkMy5zZWxlY3Rpb24ucHJvdG90eXBlLmVudGVyLnByb3RvdHlwZS5pbnNlcnRTZWxlY3RvciA9XHJcbiAgICAgICAgICAgIGQzLnNlbGVjdGlvbi5wcm90b3R5cGUuaW5zZXJ0U2VsZWN0b3IgPSBmdW5jdGlvbiAoc2VsZWN0b3IsIGJlZm9yZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEQzRXh0ZW5zaW9ucy5pbnNlcnRTZWxlY3Rvcih0aGlzLCBzZWxlY3RvciwgYmVmb3JlKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcblxyXG4gICAgICAgIGQzLnNlbGVjdGlvbi5wcm90b3R5cGUuZW50ZXIucHJvdG90eXBlLmFwcGVuZFNlbGVjdG9yID1cclxuICAgICAgICAgICAgZDMuc2VsZWN0aW9uLnByb3RvdHlwZS5hcHBlbmRTZWxlY3RvciA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEQzRXh0ZW5zaW9ucy5hcHBlbmRTZWxlY3Rvcih0aGlzLCBzZWxlY3Rvcik7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIGQzLnNlbGVjdGlvbi5wcm90b3R5cGUuZW50ZXIucHJvdG90eXBlLnNlbGVjdE9yQXBwZW5kID1cclxuICAgICAgICAgICAgZDMuc2VsZWN0aW9uLnByb3RvdHlwZS5zZWxlY3RPckFwcGVuZCA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEQzRXh0ZW5zaW9ucy5zZWxlY3RPckFwcGVuZCh0aGlzLCBzZWxlY3Rvcik7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIGQzLnNlbGVjdGlvbi5wcm90b3R5cGUuZW50ZXIucHJvdG90eXBlLnNlbGVjdE9ySW5zZXJ0ID1cclxuICAgICAgICAgICAgZDMuc2VsZWN0aW9uLnByb3RvdHlwZS5zZWxlY3RPckluc2VydCA9IGZ1bmN0aW9uIChzZWxlY3RvciwgYmVmb3JlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gRDNFeHRlbnNpb25zLnNlbGVjdE9ySW5zZXJ0KHRoaXMsIHNlbGVjdG9yLCBiZWZvcmUpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGluc2VydE9yQXBwZW5kU2VsZWN0b3IocGFyZW50LCBzZWxlY3Rvciwgb3BlcmF0aW9uLCBiZWZvcmUpIHtcclxuXHJcbiAgICAgICAgdmFyIHNlbGVjdG9yUGFydHMgPSBzZWxlY3Rvci5zcGxpdCgvKFtcXC5cXCNdKS8pO1xyXG4gICAgICAgIHZhciBlbGVtZW50ID0gcGFyZW50W29wZXJhdGlvbl0oc2VsZWN0b3JQYXJ0cy5zaGlmdCgpLCBiZWZvcmUpOy8vXCI6Zmlyc3QtY2hpbGRcIlxyXG5cclxuICAgICAgICB3aGlsZSAoc2VsZWN0b3JQYXJ0cy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgIHZhciBzZWxlY3Rvck1vZGlmaWVyID0gc2VsZWN0b3JQYXJ0cy5zaGlmdCgpO1xyXG4gICAgICAgICAgICB2YXIgc2VsZWN0b3JJdGVtID0gc2VsZWN0b3JQYXJ0cy5zaGlmdCgpO1xyXG4gICAgICAgICAgICBpZiAoc2VsZWN0b3JNb2RpZmllciA9PT0gXCIuXCIpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBlbGVtZW50LmNsYXNzZWQoc2VsZWN0b3JJdGVtLCB0cnVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzZWxlY3Rvck1vZGlmaWVyID09PSBcIiNcIikge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQuYXR0cignaWQnLCBzZWxlY3Rvckl0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBpbnNlcnRTZWxlY3RvcihwYXJlbnQsIHNlbGVjdG9yLCBiZWZvcmUpIHtcclxuICAgICAgICByZXR1cm4gRDNFeHRlbnNpb25zLmluc2VydE9yQXBwZW5kU2VsZWN0b3IocGFyZW50LCBzZWxlY3RvciwgXCJpbnNlcnRcIiwgYmVmb3JlKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgYXBwZW5kU2VsZWN0b3IocGFyZW50LCBzZWxlY3Rvcikge1xyXG4gICAgICAgIHJldHVybiBEM0V4dGVuc2lvbnMuaW5zZXJ0T3JBcHBlbmRTZWxlY3RvcihwYXJlbnQsIHNlbGVjdG9yLCBcImFwcGVuZFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgc2VsZWN0T3JBcHBlbmQocGFyZW50LCBzZWxlY3RvciwgZWxlbWVudCkge1xyXG4gICAgICAgIHZhciBzZWxlY3Rpb24gPSBwYXJlbnQuc2VsZWN0KHNlbGVjdG9yKTtcclxuICAgICAgICBpZiAoc2VsZWN0aW9uLmVtcHR5KCkpIHtcclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwYXJlbnQuYXBwZW5kKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBEM0V4dGVuc2lvbnMuYXBwZW5kU2VsZWN0b3IocGFyZW50LCBzZWxlY3Rvcik7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2VsZWN0aW9uO1xyXG4gICAgfTtcclxuXHJcbiAgICBzdGF0aWMgc2VsZWN0T3JJbnNlcnQocGFyZW50LCBzZWxlY3RvciwgYmVmb3JlKSB7XHJcbiAgICAgICAgdmFyIHNlbGVjdGlvbiA9IHBhcmVudC5zZWxlY3Qoc2VsZWN0b3IpO1xyXG4gICAgICAgIGlmIChzZWxlY3Rpb24uZW1wdHkoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gRDNFeHRlbnNpb25zLmluc2VydFNlbGVjdG9yKHBhcmVudCwgc2VsZWN0b3IsIGJlZm9yZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZWxlY3Rpb247XHJcbiAgICB9O1xyXG59XHJcbiIsImV4cG9ydCAqIGZyb20gJ2QzLWRpc3BhdGNoJztcclxuZXhwb3J0ICogZnJvbSAnZDMtc2NhbGUnO1xyXG5leHBvcnQgKiBmcm9tICdkMy1zZWxlY3Rpb24nO1xyXG5leHBvcnQgKiBmcm9tICdkMy1zaGFwZSdcclxuZXhwb3J0ICogZnJvbSAnZDMtZHJhZyc7XHJcbmV4cG9ydCAqIGZyb20gJ2QzLWJydXNoJ1xyXG5leHBvcnQgKiBmcm9tICdkMy1hcnJheSdcclxuZXhwb3J0ICogZnJvbSAnZDMtaGllcmFyY2h5J1xyXG5leHBvcnQgKiBmcm9tICdkMy10aW1lLWZvcm1hdCdcclxuIiwibW9kdWxlLmV4cG9ydHM9e1xyXG4gICAgXCJjb250ZXh0TWVudVwiOntcclxuICAgICAgICBcIm1haW5cIjp7XHJcbiAgICAgICAgICAgIFwiYWRkRGVjaXNpb25Ob2RlXCI6IFwiRW50c2NoZWlkdW5nc2tub3RlbiBoaW56dWbDvGdlblwiLFxyXG4gICAgICAgICAgICBcImFkZENoYW5jZU5vZGVcIjogXCJadWZhbGwgS25vdGVuIGhpbnp1ZsO8Z2VuXCIsXHJcbiAgICAgICAgICAgIFwiYWRkVGV4dFwiOiBcIlRleHQgaGluenVmw7xnZW4gXCIsXHJcbiAgICAgICAgICAgIFwicGFzdGVcIjogXCJFaW5mw7xnZW5cIixcclxuICAgICAgICAgICAgXCJzZWxlY3RBbGxOb2Rlc1wiOiBcIkFsbGUgS25vdGVuIGF1c3fDpGhsZW5cIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJub2RlXCI6e1xyXG4gICAgICAgICAgICBcImNvcHlcIjogXCJLb3BpZXJlblwiLFxyXG4gICAgICAgICAgICBcImN1dFwiOiBcIkF1c3NjaG5laWRlblwiLFxyXG4gICAgICAgICAgICBcInBhc3RlXCI6IFwiRWluZsO8Z2VuXCIsXHJcbiAgICAgICAgICAgIFwiZGVsZXRlXCI6IFwiTMO2c2NoZW5cIixcclxuICAgICAgICAgICAgXCJhZGREZWNpc2lvbk5vZGVcIjogXCJFbnRzY2hlaWR1bmdza25vdGVuIGhpbnp1ZsO8Z2VuXCIsXHJcbiAgICAgICAgICAgIFwiYWRkQ2hhbmNlTm9kZVwiOiBcIlp1ZmFsbCBLbm90ZW4gaGluenVmw7xnZW5cIixcclxuICAgICAgICAgICAgXCJhZGRUZXJtaW5hbE5vZGVcIjogXCJFbmRrbm90dGVuIGhpbnp1ZsO8Z2VuXCIsXHJcbiAgICAgICAgICAgIFwiY29udmVydFwiOntcclxuICAgICAgICAgICAgICAgIFwiZGVjaXNpb25cIjogXCJBbHMgRW50c2NoZWlkdW5nc2tub3RlblwiLFxyXG4gICAgICAgICAgICAgICAgXCJjaGFuY2VcIjogXCJBbHMgWnVmYWxsIEtub3RlblwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0ZXJtaW5hbFwiOiBcIkFscyBFbmRrbm90ZW5cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInNlbGVjdFN1YnRyZWVcIjogXCJUZWlsYmF1bSB3w6RobGVuXCIsXHJcbiAgICAgICAgICAgIFwiZm9sZFwiOiBcIlRlaWxiYXVtIGZhbHRlblwiLFxyXG4gICAgICAgICAgICBcInVuZm9sZFwiOiBcIlRlaWxiYXVtIGVudGZhbHRlblwiLFxyXG5cclxuICAgICAgICAgICAgXCJmbGlwU3VidHJlZVwiOiBcIlRlaWxiYXVtIHVtZHJlaGVuXCIsXHJcbiAgICAgICAgICAgIFwicGF5b2Zmc1RyYW5zZm9ybWF0aW9uXCI6IFwiQXVzemFobHVuZ2VuIHRyYW5zZm9ybWllcmVuXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiZWRnZVwiOntcclxuICAgICAgICAgICAgXCJpbmplY3REZWNpc2lvbk5vZGVcIjogXCJFbnRzY2hlaWR1bmdza25vdGVuIEluaml6aWVyZW5cIixcclxuICAgICAgICAgICAgXCJpbmplY3RDaGFuY2VOb2RlXCI6IFwiWnVmYWxsIEtub3RlbiBJbmppemllcmVuXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwidGV4dFwiOntcclxuICAgICAgICAgICAgXCJkZWxldGVcIjogXCJMw7ZzY2hlblwiXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwidmFsaWRhdGlvblwiOntcclxuICAgICAgICBcImluY29tcGxldGVQYXRoXCI6IFwiUGZhZCwgZGVyIG5pY2h0IG1pdCBkZW0gRW5ka25vdGVuIGVuZGV0XCIsXHJcbiAgICAgICAgXCJwcm9iYWJpbGl0eURvTm90U3VtVXBUbzFcIjogXCJEaWUgU3VtbWUgZGVyIFdhaHJzY2hlaW5saWNoa2VpdGVuIGlzdCBuaWNodCBnbGVpY2ggMVwiLFxyXG4gICAgICAgIFwiaW52YWxpZFByb2JhYmlsaXR5XCI6IFwiVW5nw7xsdGlnZSBXYWhyc2NoZWlubGljaGtlaXQgaW0gWndlaWcgI3t7bnVtYmVyfX1cIixcclxuICAgICAgICBcImludmFsaWRQYXlvZmZcIjogXCJVbmfDvGx0aWdlIEF1c3phaGx1bmcgaW4gWndlaWcgI3t7bnVtYmVyfX1cIlxyXG4gICAgfSxcclxuICAgIFwiZ3Jvd2xcIjp7XHJcbiAgICAgICAgXCJicnVzaERpc2FibGVkXCI6IFwiQXVzd2FobGLDvHJzdGUgZGVha3RpdmllcnRcIixcclxuICAgICAgICBcImJydXNoRW5hYmxlZFwiOiBcIkF1c3dhaGxiw7xyc3RlIGFrdGl2aWVydFwiXHJcbiAgICB9LFxyXG4gICAgXCJ0b29sdGlwXCI6e1xyXG4gICAgICAgIFwibm9kZVwiOntcclxuICAgICAgICAgICAgXCJwYXlvZmZcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiQXVzemFobHVuZyB7e251bWJlcn19XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwie3tuYW1lfX1cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImFnZ3JlZ2F0ZWRQYXlvZmZcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiQWdncmVnaWVydGUgQXVzemFobHVuZyB7e251bWJlcn19XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwiQWdncmVnaWVydGUge3tuYW1lfX1cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInByb2JhYmlsaXR5VG9FbnRlclwiOiBcIldhaHJzY2hlaW5saWNoa2VpdFwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImVkZ2VcIjp7XHJcbiAgICAgICAgICAgIFwicGF5b2ZmXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIkF1c3phaGx1bmcge3tudW1iZXJ9fToge3t2YWx1ZX19XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwie3tuYW1lfX06IHt7dmFsdWV9fVwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicHJvYmFiaWxpdHlcIjogXCJXYWhyc2NoZWlubGljaGtlaXQ6IHt7dmFsdWV9fVwiXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsIm1vZHVsZS5leHBvcnRzPXtcclxuICAgIFwiY29udGV4dE1lbnVcIjp7XHJcbiAgICAgICAgXCJtYWluXCI6e1xyXG4gICAgICAgICAgICBcImFkZERlY2lzaW9uTm9kZVwiOiBcIkFkZCBEZWNpc2lvbiBOb2RlXCIsXHJcbiAgICAgICAgICAgIFwiYWRkQ2hhbmNlTm9kZVwiOiBcIkFkZCBDaGFuY2UgTm9kZVwiLFxyXG4gICAgICAgICAgICBcImFkZFRleHRcIjogXCJBZGQgVGV4dFwiLFxyXG4gICAgICAgICAgICBcInBhc3RlXCI6IFwiUGFzdGVcIixcclxuICAgICAgICAgICAgXCJzZWxlY3RBbGxOb2Rlc1wiOiBcIlNlbGVjdCBhbGwgbm9kZXNcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJub2RlXCI6e1xyXG4gICAgICAgICAgICBcImNvcHlcIjogXCJDb3B5XCIsXHJcbiAgICAgICAgICAgIFwiY3V0XCI6IFwiQ3V0XCIsXHJcbiAgICAgICAgICAgIFwicGFzdGVcIjogXCJQYXN0ZVwiLFxyXG4gICAgICAgICAgICBcImRlbGV0ZVwiOiBcIkRlbGV0ZVwiLFxyXG4gICAgICAgICAgICBcImFkZERlY2lzaW9uTm9kZVwiOiBcIkFkZCBEZWNpc2lvbiBOb2RlXCIsXHJcbiAgICAgICAgICAgIFwiYWRkQ2hhbmNlTm9kZVwiOiBcIkFkZCBDaGFuY2UgTm9kZVwiLFxyXG4gICAgICAgICAgICBcImFkZFRlcm1pbmFsTm9kZVwiOiBcIkFkZCBUZXJtaW5hbCBOb2RlXCIsXHJcbiAgICAgICAgICAgIFwiY29udmVydFwiOntcclxuICAgICAgICAgICAgICAgIFwiZGVjaXNpb25cIjogXCJBcyBEZWNpc2lvbiBOb2RlXCIsXHJcbiAgICAgICAgICAgICAgICBcImNoYW5jZVwiOiBcIkFzIENoYW5jZSBOb2RlXCIsXHJcbiAgICAgICAgICAgICAgICBcInRlcm1pbmFsXCI6IFwiQXMgVGVybWluYWwgTm9kZVwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwic2VsZWN0U3VidHJlZVwiOiBcIlNlbGVjdCBzdWJ0cmVlXCIsXHJcbiAgICAgICAgICAgIFwiZm9sZFwiOiBcIkZvbGQgc3VidHJlZVwiLFxyXG4gICAgICAgICAgICBcInVuZm9sZFwiOiBcIlVuZm9sZCBzdWJ0cmVlXCIsXHJcbiAgICAgICAgICAgIFwiZmxpcFN1YnRyZWVcIjogXCJGbGlwIHN1YnRyZWVcIixcclxuICAgICAgICAgICAgXCJwYXlvZmZzVHJhbnNmb3JtYXRpb25cIjogXCJUcmFuc2Zvcm0gcGF5b2Zmc1wiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImVkZ2VcIjp7XHJcbiAgICAgICAgICAgIFwiaW5qZWN0RGVjaXNpb25Ob2RlXCI6IFwiSW5qZWN0IERlY2lzaW9uIE5vZGVcIixcclxuICAgICAgICAgICAgXCJpbmplY3RDaGFuY2VOb2RlXCI6IFwiSW5qZWN0IENoYW5jZSBOb2RlXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwidGV4dFwiOntcclxuICAgICAgICAgICAgXCJkZWxldGVcIjogXCJEZWxldGVcIlxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcInZhbGlkYXRpb25cIjp7XHJcbiAgICAgICAgXCJpbmNvbXBsZXRlUGF0aFwiOiBcIlBhdGggbm90IGVuZGluZyB3aXRoIHRlcm1pbmFsIG5vZGVcIixcclxuICAgICAgICBcInByb2JhYmlsaXR5RG9Ob3RTdW1VcFRvMVwiOiBcIlByb2JhYmlsaXRpZXMgZG8gbm90IHN1bSB1cCB0byAxXCIsXHJcbiAgICAgICAgXCJpbnZhbGlkUHJvYmFiaWxpdHlcIjogXCJJbnZhbGlkIHByb2JhYmlsaXR5IGluIGVkZ2UgI3t7bnVtYmVyfX1cIixcclxuICAgICAgICBcImludmFsaWRQYXlvZmZcIjogXCJJbnZhbGlkIHBheW9mZiBpbiBlZGdlICN7e251bWJlcn19XCJcclxuICAgIH0sXHJcbiAgICBcImdyb3dsXCI6e1xyXG4gICAgICAgIFwiYnJ1c2hEaXNhYmxlZFwiOiBcIlNlbGVjdGlvbiBicnVzaCBkaXNhYmxlZFwiLFxyXG4gICAgICAgIFwiYnJ1c2hFbmFibGVkXCI6IFwiU2VsZWN0aW9uIGJydXNoIGVuYWJsZWRcIlxyXG4gICAgfSxcclxuICAgIFwidG9vbHRpcFwiOntcclxuICAgICAgICBcIm5vZGVcIjp7XHJcbiAgICAgICAgICAgIFwicGF5b2ZmXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIlBheW9mZiB7e251bWJlcn19XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwie3tuYW1lfX1cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImFnZ3JlZ2F0ZWRQYXlvZmZcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiQWdncmVnYXRlZCBQYXlvZmYge3tudW1iZXJ9fVwiLFxyXG4gICAgICAgICAgICAgICAgXCJuYW1lZFwiOiBcIkFnZ3JlZ2F0ZWQge3tuYW1lfX1cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInByb2JhYmlsaXR5VG9FbnRlclwiOiBcIlByb2JhYmlsaXR5IHRvIGVudGVyXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiZWRnZVwiOntcclxuICAgICAgICAgICAgXCJwYXlvZmZcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiUGF5b2ZmIHt7bnVtYmVyfX06IHt7dmFsdWV9fVwiLFxyXG4gICAgICAgICAgICAgICAgXCJuYW1lZFwiOiBcInt7bmFtZX19OiB7e3ZhbHVlfX1cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInByb2JhYmlsaXR5XCI6IFwiUHJvYmFiaWxpdHk6IHt7dmFsdWV9fVwiXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsIm1vZHVsZS5leHBvcnRzPXtcclxuICAgIFwiY29udGV4dE1lbnVcIjp7XHJcbiAgICAgICAgXCJtYWluXCI6e1xyXG4gICAgICAgICAgICBcImFkZERlY2lzaW9uTm9kZVwiOiBcIkFqb3V0ZXIgbm91ZCBkZSBkw6ljaXNpb25cIixcclxuICAgICAgICAgICAgXCJhZGRDaGFuY2VOb2RlXCI6IFwiQWpvdXRlciBub3VkIGFsw6lhdG9pcmVcIixcclxuICAgICAgICAgICAgXCJhZGRUZXh0XCI6IFwiQWpvdXRlciBkdSB0ZXh0ZVwiLFxyXG4gICAgICAgICAgICBcInBhc3RlXCI6IFwiQ29sbGVyXCIsXHJcbiAgICAgICAgICAgIFwic2VsZWN0QWxsTm9kZXNcIjogXCJTw6lsZWN0aW9ubmVyIHRvdXMgbGVzIG5vdWRzXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwibm9kZVwiOntcclxuICAgICAgICAgICAgXCJjb3B5XCI6IFwiQ29waWVcIixcclxuICAgICAgICAgICAgXCJjdXRcIjogXCJDb3VwZXJcIixcclxuICAgICAgICAgICAgXCJwYXN0ZVwiOiBcIkNvbGxlclwiLFxyXG4gICAgICAgICAgICBcImRlbGV0ZVwiOiBcIkVmZmFjZXJcIixcclxuICAgICAgICAgICAgXCJhZGREZWNpc2lvbk5vZGVcIjogXCJBam91dGVyIG5vdWQgZGUgZMOpY2lzaW9uXCIsXHJcbiAgICAgICAgICAgIFwiYWRkQ2hhbmNlTm9kZVwiOiBcIkFqb3V0ZXIgbm91ZCBhbMOpYXRvaXJlXCIsXHJcbiAgICAgICAgICAgIFwiYWRkVGVybWluYWxOb2RlXCI6IFwiQWpvdXRlciB1biBub2V1ZCB0ZXJtaW5hbFwiLFxyXG4gICAgICAgICAgICBcImNvbnZlcnRcIjp7XHJcbiAgICAgICAgICAgICAgICBcImRlY2lzaW9uXCI6IFwiQ29tbWUgbm91ZCBkZSBkw6ljaXNpb25cIixcclxuICAgICAgICAgICAgICAgIFwiY2hhbmNlXCI6IFwiQ29tbWUgbm91ZCBhbMOpYXRvaXJlXCIsXHJcbiAgICAgICAgICAgICAgICBcInRlcm1pbmFsXCI6IFwiQ29tbWUgdW4gbm9ldWQgdGVybWluYWxcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInNlbGVjdFN1YnRyZWVcIjogXCJTw6lsZWN0aW9ubmVyIHVuZSBzb3VzLWFyYm9yZXNjZW5jZVwiLFxyXG4gICAgICAgICAgICBcImZvbGRcIjogXCJQbGllciBzb3VzLWFyYnJlXCIsXHJcbiAgICAgICAgICAgIFwidW5mb2xkXCI6IFwiRMOpcGxpZXIgYXJicmUgc291cy1hcmJyZVwiLFxyXG4gICAgICAgICAgICBcImZsaXBTdWJ0cmVlXCI6IFwiQmFzY3VsZXIgc291cy1hcmJyZVwiLFxyXG4gICAgICAgICAgICBcInBheW9mZnNUcmFuc2Zvcm1hdGlvblwiOiBcIlRyYW5zZm9ybWV6IGxlcyBnYWluc1wiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImVkZ2VcIjp7XHJcbiAgICAgICAgICAgIFwiaW5qZWN0RGVjaXNpb25Ob2RlXCI6IFwiSW5qZWN0ZXIgdW4gbm9ldWQgZGUgZMOpY2lzaW9uXCIsXHJcbiAgICAgICAgICAgIFwiaW5qZWN0Q2hhbmNlTm9kZVwiOiBcIkluamVjdGVyIHVuIG5vZXVkIGRlIGNoYW5jZVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInRleHRcIjp7XHJcbiAgICAgICAgICAgIFwiZGVsZXRlXCI6IFwiRWZmYWNlclwiXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwidmFsaWRhdGlvblwiOntcclxuICAgICAgICBcImluY29tcGxldGVQYXRoXCI6IFwiUGFyY291cnMgbm9uIHRlcm1pbsOpIHBhciBub2V1ZCB0ZXJtaW5hbFwiLFxyXG4gICAgICAgIFwicHJvYmFiaWxpdHlEb05vdFN1bVVwVG8xXCI6IFwiTGEgc29tbWUgZGVzIHByb2JhYmlsaXTDqXMgbidlc3QgcGFzIDEgb3UgcGx1c1wiLFxyXG4gICAgICAgIFwiaW52YWxpZFByb2JhYmlsaXR5XCI6IFwiUHJvYmFiaWxpdMOpIGludmFsaWRlIC0gbGUgYm9yZCAje3tudW1iZXJ9fVwiLFxyXG4gICAgICAgIFwiaW52YWxpZFBheW9mZlwiOiBcIkF2YW50YWdlIGludmFsaWRlIC0gbGUgYm9yZCAje3tudW1iZXJ9fVwiXHJcbiAgICB9LFxyXG4gICAgXCJncm93bFwiOntcclxuICAgICAgICBcImJydXNoRGlzYWJsZWRcIjogXCJCcm9zc2UgZGUgc8OpbGVjdGlvbiBkw6lzYWN0aXbDqWVcIixcclxuICAgICAgICBcImJydXNoRW5hYmxlZFwiOiBcIkJyb3NzZSBkZSBzw6lsZWN0aW9uIGFjdGl2w6llXCJcclxuICAgIH0sXHJcbiAgICBcInRvb2x0aXBcIjp7XHJcbiAgICAgICAgXCJub2RlXCI6e1xyXG4gICAgICAgICAgICBcInBheW9mZlwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJBdmFudGFnZSB7e251bWJlcn19XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwie3tuYW1lfX1cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImFnZ3JlZ2F0ZWRQYXlvZmZcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiQXZhbnRhZ2UgYWdyw6lnw6kge3tudW1iZXJ9fVwiLFxyXG4gICAgICAgICAgICAgICAgXCJuYW1lZFwiOiBcIkFncsOpZ8OpICB7e25hbWV9fVwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicHJvYmFiaWxpdHlUb0VudGVyXCI6IFwiUHJvYmFiaWxpdMOpIGQnZW50csOpZVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImVkZ2VcIjp7XHJcbiAgICAgICAgICAgIFwicGF5b2ZmXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIkF2YW50YWdlIHt7bnVtYmVyfX06IHt7dmFsdWV9fVwiLFxyXG4gICAgICAgICAgICAgICAgXCJuYW1lZFwiOiBcInt7bmFtZX19OiB7e3ZhbHVlfX1cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInByb2JhYmlsaXR5XCI6IFwiUHJvYmFiaWxpdMOpOiB7e3ZhbHVlfX1cIlxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgaTE4bmV4dCBmcm9tICdpMThuZXh0JztcclxuaW1wb3J0ICogYXMgZW4gZnJvbSAnLi9lbi5qc29uJ1xyXG5pbXBvcnQgKiBhcyBwbCBmcm9tICcuL3BsLmpzb24nXHJcbmltcG9ydCAqIGFzIGl0IGZyb20gJy4vaXQuanNvbidcclxuaW1wb3J0ICogYXMgZGUgZnJvbSAnLi9kZS5qc29uJ1xyXG5pbXBvcnQgKiBhcyBmciBmcm9tICcuL2ZyLmpzb24nXHJcbmltcG9ydCAqIGFzIHB0X2JyIGZyb20gJy4vcHQtYnIuanNvbidcclxuXHJcbmV4cG9ydCBjbGFzcyBpMThue1xyXG5cclxuICAgIHN0YXRpYyAkaW5zdGFuY2U7XHJcbiAgICBzdGF0aWMgbGFuZ3VhZ2U7XHJcblxyXG4gICAgc3RhdGljIGluaXQobG5nKXtcclxuICAgICAgICBpMThuLmxhbmd1YWdlID0gbG5nO1xyXG4gICAgICAgIGxldCByZXNvdXJjZXMgPSB7XHJcbiAgICAgICAgICAgIGVuOiB7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGlvbjogZW5cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcGw6IHtcclxuICAgICAgICAgICAgICAgIHRyYW5zbGF0aW9uOiBwbFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBpdDoge1xyXG4gICAgICAgICAgICAgICAgdHJhbnNsYXRpb246IGl0XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRlOiB7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGlvbjogZGVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZnI6IHtcclxuICAgICAgICAgICAgICAgIHRyYW5zbGF0aW9uOiBmclxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAncHQtQlInOiB7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGlvbjogcHRfYnJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgaTE4bi4kaW5zdGFuY2UgPSBpMThuZXh0LmNyZWF0ZUluc3RhbmNlKHtcclxuICAgICAgICAgICAgbG5nOiBsbmcsXHJcbiAgICAgICAgICAgIGZhbGxiYWNrTG5nOiAnZW4nLFxyXG4gICAgICAgICAgICByZXNvdXJjZXM6IHJlc291cmNlc1xyXG4gICAgICAgIH0sIChlcnIsIHQpID0+IHtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgdChrZXksIG9wdCl7XHJcbiAgICAgICAgcmV0dXJuIGkxOG4uJGluc3RhbmNlLnQoa2V5LCBvcHQpXHJcbiAgICB9XHJcbn1cclxuIiwibW9kdWxlLmV4cG9ydHM9e1xyXG4gICAgXCJjb250ZXh0TWVudVwiOntcclxuICAgICAgICBcIm1haW5cIjp7XHJcbiAgICAgICAgICAgIFwiYWRkRGVjaXNpb25Ob2RlXCI6IFwiQWdnaXVuZ2kgdW4gbm9kbyBkaSBkZWNpc2lvbmVcIixcclxuICAgICAgICAgICAgXCJhZGRDaGFuY2VOb2RlXCI6IFwiQWdnaXVuZ2kgdW4gbm9kbyBvcHBvcnR1bml0w6BcIixcclxuICAgICAgICAgICAgXCJhZGRUZXh0XCI6IFwiQWdnaXVuZ2kgdGVzdG9cIixcclxuICAgICAgICAgICAgXCJwYXN0ZVwiOiBcIkluY29sbGFcIixcclxuICAgICAgICAgICAgXCJzZWxlY3RBbGxOb2Rlc1wiOiBcIlNlbGV6aW9uYSB0dXR0aSBpIG5vZGlcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJub2RlXCI6e1xyXG4gICAgICAgICAgICBcImNvcHlcIjogXCJDb3BpYVwiLFxyXG4gICAgICAgICAgICBcImN1dFwiOiBcIlRhZ2xpYVwiLFxyXG4gICAgICAgICAgICBcInBhc3RlXCI6IFwiSW5jb2xsYVwiLFxyXG4gICAgICAgICAgICBcImRlbGV0ZVwiOiBcIkNhbmNlbGxhXCIsXHJcbiAgICAgICAgICAgIFwiYWRkRGVjaXNpb25Ob2RlXCI6IFwiQWdnaXVuZ2kgdW4gbm9kbyBkaSBkZWNpc2lvbmVcIixcclxuICAgICAgICAgICAgXCJhZGRDaGFuY2VOb2RlXCI6IFwiQWdnaXVuZ2kgdW4gbm9kbyBvcHBvcnR1bml0w6BcIixcclxuICAgICAgICAgICAgXCJhZGRUZXJtaW5hbE5vZGVcIjogXCJBZ2dpdW5naSB1biBub2RvIHRlcm1pbmFsZVwiLFxyXG4gICAgICAgICAgICBcImNvbnZlcnRcIjp7XHJcbiAgICAgICAgICAgICAgICBcImRlY2lzaW9uXCI6IFwiQ29tZSBEZWNpc2lvbiBOb2RlXCIsXHJcbiAgICAgICAgICAgICAgICBcImNoYW5jZVwiOiBcIkNvbWUgQ2hhbmNlIE5vZGVcIixcclxuICAgICAgICAgICAgICAgIFwidGVybWluYWxcIjogXCJDb21lIFRlcm1pbmFsIE5vZGVcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInNlbGVjdFN1YnRyZWVcIjogXCJTZWxlemlvbmEgU290dG8tYWxiZXJvXCIsXHJcbiAgICAgICAgICAgIFwiZm9sZFwiOiBcIlBpZWdhIHNvdHRvLWFsYmVyb1wiLFxyXG4gICAgICAgICAgICBcInVuZm9sZFwiOiBcIkRpc3BpZWdhcnNpIHNvdHRvLWFsYmVyb1wiLFxyXG4gICAgICAgICAgICBcImZsaXBTdWJ0cmVlXCI6IFwiUmliYWx0YSBzb3R0by1hbGJlcm9cIixcclxuICAgICAgICAgICAgXCJwYXlvZmZzVHJhbnNmb3JtYXRpb25cIjogXCJUcmFzZm9ybWEgaSBwcm9maXR0aVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImVkZ2VcIjp7XHJcbiAgICAgICAgICAgIFwiaW5qZWN0RGVjaXNpb25Ob2RlXCI6IFwiSW5pZXR0YSBub2RvIGRpIGRlY2lzaW9uZVwiLFxyXG4gICAgICAgICAgICBcImluamVjdENoYW5jZU5vZGVcIjogXCJJbmlldHRhIG5vZG8gb3Bwb3J0dW5pdMOgXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwidGV4dFwiOntcclxuICAgICAgICAgICAgXCJkZWxldGVcIjogXCJDYW5jZWxsYVwiXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwidmFsaWRhdGlvblwiOntcclxuICAgICAgICBcImluY29tcGxldGVQYXRoXCI6IFwiUGVyY29yc28gc2VuemEgbm9kbyB0ZXJtaW5hbGVcIixcclxuICAgICAgICBcInByb2JhYmlsaXR5RG9Ob3RTdW1VcFRvMVwiOiBcIkxhIHNvbW1hIGRlbGxlIHByb2JhYmlsaXTDoCDDqCBkaXZlcnNhIGRhIDFcIixcclxuICAgICAgICBcImludmFsaWRQcm9iYWJpbGl0eVwiOiBcIlByb2JhYmlsaXTDoCBub24gdmFsaWRhIC0gYm9yZG8gI3t7bnVtYmVyfX1cIixcclxuICAgICAgICBcImludmFsaWRQYXlvZmZcIjogXCJTYWxkbyBub24gdmFsaWRvIC0gYm9yZG8gI3t7bnVtYmVyfX1cIlxyXG4gICAgfSxcclxuICAgIFwiZ3Jvd2xcIjp7XHJcbiAgICAgICAgXCJicnVzaERpc2FibGVkXCI6IFwiU2VsZXppb25lIHBlbm5lbGxvIGRpc2FiaWxpdGF0YVwiLFxyXG4gICAgICAgIFwiYnJ1c2hFbmFibGVkXCI6IFwiU2VsZXppb25lIHBlbm5lbGxvIGFiaWxpdGF0YVwiXHJcbiAgICB9LFxyXG4gICAgXCJ0b29sdGlwXCI6e1xyXG4gICAgICAgIFwibm9kZVwiOntcclxuICAgICAgICAgICAgXCJwYXlvZmZcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiU2FsZG8ge3tudW1iZXJ9fVwiLFxyXG4gICAgICAgICAgICAgICAgXCJuYW1lZFwiOiBcInt7bmFtZX19XCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJhZ2dyZWdhdGVkUGF5b2ZmXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIlNhbGRvIGFnZ3JlZ2F0byB7e251bWJlcn19XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwiQWdncmVnYXRvIHt7bmFtZX19XCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwcm9iYWJpbGl0eVRvRW50ZXJcIjogXCJQcm9iYWJpbGl0w6AgZGEgaW5zZXJpcmVcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJlZGdlXCI6e1xyXG4gICAgICAgICAgICBcInBheW9mZlwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJTYWxkbyB7e251bWJlcn19OiB7e3ZhbHVlfX1cIixcclxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJ7e25hbWV9fToge3t2YWx1ZX19XCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwcm9iYWJpbGl0eVwiOiBcIlByb2JhYmlsaXTDoDoge3t2YWx1ZX19XCJcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwibW9kdWxlLmV4cG9ydHM9e1xyXG5cclxuICAgIFwiY29udGV4dE1lbnVcIjp7XHJcbiAgICAgICAgXCJtYWluXCI6e1xyXG4gICAgICAgICAgICBcImFkZERlY2lzaW9uTm9kZVwiOiBcIkRvZGFqIFfEmXplxYIgRGVjeXp5am55XCIsXHJcbiAgICAgICAgICAgIFwiYWRkQ2hhbmNlTm9kZVwiOiBcIkRvZGFqIFfEmXplxYIgTG9zb3d5XCIsXHJcbiAgICAgICAgICAgIFwiYWRkVGV4dFwiOiBcIkRvZGFqIFRla3N0XCIsXHJcbiAgICAgICAgICAgIFwicGFzdGVcIjogXCJXa2xlalwiLFxyXG4gICAgICAgICAgICBcInNlbGVjdEFsbE5vZGVzXCI6IFwiWmF6bmFjeiB3c3p5c3RraWUgd8SZesWCeVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIm5vZGVcIjp7XHJcbiAgICAgICAgICAgIFwiY29weVwiOiBcIktvcGl1alwiLFxyXG4gICAgICAgICAgICBcImN1dFwiOiBcIld5dG5palwiLFxyXG4gICAgICAgICAgICBcInBhc3RlXCI6IFwiV2tsZWpcIixcclxuICAgICAgICAgICAgXCJkZWxldGVcIjogXCJVc3XFhFwiLFxyXG4gICAgICAgICAgICBcImFkZERlY2lzaW9uTm9kZVwiOiBcIkRvZGFqIFfEmXplxYIgRGVjeXp5am55XCIsXHJcbiAgICAgICAgICAgIFwiYWRkQ2hhbmNlTm9kZVwiOiBcIkRvZGFqIFfEmXplxYIgTG9zb3d5XCIsXHJcbiAgICAgICAgICAgIFwiYWRkVGVybWluYWxOb2RlXCI6IFwiRG9kYWogV8SZemXFgiBLb8WEY293eVwiLFxyXG4gICAgICAgICAgICBcImNvbnZlcnRcIjp7XHJcbiAgICAgICAgICAgICAgICBcImRlY2lzaW9uXCI6IFwiSmFrbyBXxJl6ZcWCIERlY3l6eWpueVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjaGFuY2VcIjogXCJKYWtvIFfEmXplxYIgTG9zb3d5XCIsXHJcbiAgICAgICAgICAgICAgICBcInRlcm1pbmFsXCI6IFwiSmFrbyBXxJl6ZcWCIEtvxYRjb3d5XCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJzZWxlY3RTdWJ0cmVlXCI6IFwiWmF6bmFjeiBwb2Rkcnpld29cIixcclxuICAgICAgICAgICAgXCJmb2xkXCI6IFwiWndpxYQgcG9kZHJ6ZXdvXCIsXHJcbiAgICAgICAgICAgIFwidW5mb2xkXCI6IFwiUm96d2nFhCBwb2Rkcnpld29cIixcclxuICAgICAgICAgICAgXCJmbGlwU3VidHJlZVwiOiBcIlByemV3csOzxIcgcG9kZHJ6ZXdvXCIsXHJcbiAgICAgICAgICAgIFwicGF5b2Zmc1RyYW5zZm9ybWF0aW9uXCI6IFwiUHJ6ZWtzenRhxYLEhyB3eXDFgmF0eVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImVkZ2VcIjp7XHJcbiAgICAgICAgICAgIFwiaW5qZWN0RGVjaXNpb25Ob2RlXCI6IFwiV3N0cnp5a25paiBXxJl6ZcWCIERlY3l6eWpueVwiLFxyXG4gICAgICAgICAgICBcImluamVjdENoYW5jZU5vZGVcIjogXCJXc3RyenlrbmlqIFfEmXplxYIgTG9zb3d5XCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwidGV4dFwiOntcclxuICAgICAgICAgICAgXCJkZWxldGVcIjogXCJVc3XFhFwiXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBcInZhbGlkYXRpb25cIjp7XHJcbiAgICAgICAgXCJpbmNvbXBsZXRlUGF0aFwiOiBcIk9zdGF0bmltIHfEmXrFgmVtIHcgxZtjaWXFvGNlIHBvd2luaWVuIGJ5xIcgV8SZemXFgiBLb8WEY293eVwiLFxyXG4gICAgICAgIFwicHJvYmFiaWxpdHlEb05vdFN1bVVwVG8xXCI6IFwiUHJhd2RvcG9kb2JpZcWEc3R3YSBuaWUgc3VtdWrEhSBzaWUgZG8gMVwiLFxyXG4gICAgICAgIFwiaW52YWxpZFByb2JhYmlsaXR5XCI6IFwiTmllcG9wcmF3bmUgcHJhd2RvcG9kb2JpZcWEc3R3byBuYSBrcmF3xJlkemkgI3t7bnVtYmVyfX1cIixcclxuICAgICAgICBcImludmFsaWRQYXlvZmZcIjogXCJOaWVwb3ByYXduYSB3eXDFgmF0YSBuYSBrcmF3xJlkemkgI3t7bnVtYmVyfX1cIlxyXG4gICAgfSxcclxuICAgIFwiZ3Jvd2xcIjp7XHJcbiAgICAgICAgXCJicnVzaERpc2FibGVkXCI6IFwiWmF6bmFjemFuaWUgd3nFgsSFY3pvbmVcIixcclxuICAgICAgICBcImJydXNoRW5hYmxlZFwiOiBcIlphem5hY3phbmllIHfFgsSFY3pvbmVcIlxyXG4gICAgfSxcclxuICAgIFwidG9vbHRpcFwiOntcclxuICAgICAgICBcIm5vZGVcIjp7XHJcbiAgICAgICAgICAgIFwicGF5b2ZmXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIld5cMWCYXRhIHt7bnVtYmVyfX1cIixcclxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJ7e25hbWV9fVwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiYWdncmVnYXRlZFBheW9mZlwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJaYWdyZWdvd2FuYSB3eXDFgmF0YSB7e251bWJlcn19XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwiWmFncmVnb3dhbmEge3tuYW1lfX1cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInByb2JhYmlsaXR5VG9FbnRlclwiOiBcIlByYXdkb3BvZG9iaWXFhHN0d28gd2VqxZtjaWFcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJlZGdlXCI6e1xyXG4gICAgICAgICAgICBcInBheW9mZlwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJXeXDFgmF0YSB7e251bWJlcn19OiB7e3ZhbHVlfX1cIixcclxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJ7e25hbWV9fToge3t2YWx1ZX19XCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwcm9iYWJpbGl0eVwiOiBcIlByYXdkb3BvZG9iaWXFhHN0d286IHt7dmFsdWV9fVwiXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsIm1vZHVsZS5leHBvcnRzPXtcclxuICAgIFwiY29udGV4dE1lbnVcIjp7XHJcbiAgICAgICAgXCJtYWluXCI6e1xyXG4gICAgICAgICAgICBcImFkZERlY2lzaW9uTm9kZVwiOiBcIkFkaWNpb25hciBuw7MgZGUgZGVjaXPDo29cIixcclxuICAgICAgICAgICAgXCJhZGRDaGFuY2VOb2RlXCI6IFwiQWRpY2lvbmFyIE7DsyBkZSBwcm9iYWJpbGlkYWRlXCIsXHJcbiAgICAgICAgICAgIFwiYWRkVGV4dFwiOiBcIkFkaWNpb25hciBUZXh0b1wiLFxyXG4gICAgICAgICAgICBcInBhc3RlXCI6IFwiQ29sYXJcIixcclxuICAgICAgICAgICAgXCJzZWxlY3RBbGxOb2Rlc1wiOiBcIlNlbGVjaW9uYXIgdG9kb3Mgb3MgbsOzc1wiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIm5vZGVcIjp7XHJcbiAgICAgICAgICAgIFwiY29weVwiOiBcIkNvcGlhclwiLFxyXG4gICAgICAgICAgICBcImN1dFwiOiBcIkNvcnRhclwiLFxyXG4gICAgICAgICAgICBcInBhc3RlXCI6IFwiQ29sYXJcIixcclxuICAgICAgICAgICAgXCJkZWxldGVcIjogXCJFeGNsdWlyXCIsXHJcbiAgICAgICAgICAgIFwiYWRkRGVjaXNpb25Ob2RlXCI6IFwiQWRpY2lvbmFyIG7DsyBkZSBkZWNpc8Ojb1wiLFxyXG4gICAgICAgICAgICBcImFkZENoYW5jZU5vZGVcIjogXCJBZGljaW9uYXIgTsOzIGRlIGNoYW5jZVwiLFxyXG4gICAgICAgICAgICBcImFkZFRlcm1pbmFsTm9kZVwiOiBcIkFkaWNpb25hciBOw7MgVGVybWluYWxcIixcclxuICAgICAgICAgICAgXCJjb252ZXJ0XCI6e1xyXG4gICAgICAgICAgICAgICAgXCJkZWNpc2lvblwiOiBcIkNvbW8gbsOzIGRlIGRlY2lzw6NvXCIsXHJcbiAgICAgICAgICAgICAgICBcImNoYW5jZVwiOiBcIkNvbW8gTsOzIGRlIENoYW5jZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0ZXJtaW5hbFwiOiBcIkNvbW8gTsOzIFRlcm1pbmFsXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJzZWxlY3RTdWJ0cmVlXCI6IFwiU2VsZWNpb25hciBzdWLDoXJ2b3JlXCIsXHJcbiAgICAgICAgICAgIFwiZm9sZFwiOiBcIkRvYnJhciBzdWLDoXJ2b3JlXCIsXHJcbiAgICAgICAgICAgIFwidW5mb2xkXCI6IFwiRGVzZG9icmFyIHN1YsOhcnZvcmVcIixcclxuICAgICAgICAgICAgXCJmbGlwU3VidHJlZVwiOiBcIkludmVydGVyIHN1YsOhcnZvcmVcIixcclxuICAgICAgICAgICAgXCJwYXlvZmZzVHJhbnNmb3JtYXRpb25cIjogXCJUcmFuc2Zvcm1hciBwZXNvc1wiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImVkZ2VcIjp7XHJcbiAgICAgICAgICAgIFwiaW5qZWN0RGVjaXNpb25Ob2RlXCI6IFwiSW5qZXRhciBOw7MgZGUgRGVjaXPDo29cIixcclxuICAgICAgICAgICAgXCJpbmplY3RDaGFuY2VOb2RlXCI6IFwiSW5qZXRhciBOw7MgZGUgQ2hhbmNlXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwidGV4dFwiOntcclxuICAgICAgICAgICAgXCJkZWxldGVcIjogXCJFeGNsdWlyXCJcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJ2YWxpZGF0aW9uXCI6e1xyXG4gICAgICAgIFwiaW5jb21wbGV0ZVBhdGhcIjogXCJPIGNhbWluaG8gbsOjbyB0ZXJtaW5hIGNvbSBvIG7DsyB0ZXJtaW5hbFwiLFxyXG4gICAgICAgIFwicHJvYmFiaWxpdHlEb05vdFN1bVVwVG8xXCI6IFwiUHJvYmFiaWxpZGFkZXMgbsOjbyBzb21hbSBhdMOpIDFcIixcclxuICAgICAgICBcImludmFsaWRQcm9iYWJpbGl0eVwiOiBcIlByb2JhYmlsaWRhZGUgaW52w6FsaWRhIG5hIGJvcmRhICMge3tudW1iZXJ9fVwiLFxyXG4gICAgICAgIFwiaW52YWxpZFBheW9mZlwiOiBcIlBhZ2FtZW50byBpbnbDoWxpZG8gbmEgYm9yZGEgIyB7e251bWJlcn19XCJcclxuICAgIH0sXHJcbiAgICBcImdyb3dsXCI6e1xyXG4gICAgICAgIFwiYnJ1c2hEaXNhYmxlZFwiOiBcIlBpbmNlbCBkZSBzZWxlw6fDo28gZGVzYXRpdmFkb1wiLFxyXG4gICAgICAgIFwiYnJ1c2hFbmFibGVkXCI6IFwiUGluY2VsIGRlIHNlbGXDp8OjbyBoYWJpbGl0YWRvXCJcclxuICAgIH0sXHJcbiAgICBcInRvb2x0aXBcIjp7XHJcbiAgICAgICAgXCJub2RlXCI6e1xyXG4gICAgICAgICAgICBcInBheW9mZlwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJQYWdhciB7e251bWJlcn19XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwie3tuYW1lfX1cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImFnZ3JlZ2F0ZWRQYXlvZmZcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiUGFnYXIgYWdyZWdhZG8ge3tudW1iZXJ9fVwiLFxyXG4gICAgICAgICAgICAgICAgXCJuYW1lZFwiOiBcIkFncmVnYWRvIHt7bmFtZX19XCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwcm9iYWJpbGl0eVRvRW50ZXJcIjogXCJQcm9iYWJpbGlkYWRlIGRlIGVudHJhclwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImVkZ2VcIjp7XHJcbiAgICAgICAgICAgIFwicGF5b2ZmXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIlBhZ2FyIHt7bnVtYmVyfX06IHt7dmFsdWV9fVwiLFxyXG4gICAgICAgICAgICAgICAgXCJuYW1lZFwiOiBcInt7bmFtZX19OiB7e3ZhbHVlfX1cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInByb2JhYmlsaXR5XCI6IFwiUHJvYmFiaWxpZGFkZToge3t2YWx1ZX19XCJcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHtEM0V4dGVuc2lvbnN9IGZyb20gJy4vZDMtZXh0ZW5zaW9ucydcclxuRDNFeHRlbnNpb25zLmV4dGVuZCgpO1xyXG5cclxuZXhwb3J0ICogZnJvbSAnLi90cmVlLWRlc2lnbmVyJ1xyXG5leHBvcnQgKiBmcm9tICcuL2FwcC11dGlscydcclxuZXhwb3J0ICogZnJvbSAnLi90ZW1wbGF0ZXMnXHJcbmV4cG9ydCAqIGZyb20gJy4vdG9vbHRpcCdcclxuZXhwb3J0ICogZnJvbSAnLi9kMy1leHRlbnNpb25zJ1xyXG5leHBvcnQge2RlZmF1bHQgYXMgZDN9IGZyb20gJy4vZDMnXHJcblxyXG5cclxuIiwiaW1wb3J0IHtVdGlsc30gZnJvbSAnc2QtdXRpbHMnXHJcbmltcG9ydCB7ZG9tYWluIGFzIG1vZGVsfSBmcm9tICdzZC1tb2RlbCdcclxuaW1wb3J0ICogYXMgZDMgZnJvbSAnLi9kMydcclxuaW1wb3J0IGNpcmNsZVN5bWJvbCBmcm9tICcuL3N5bWJvbHMvY2lyY2xlJ1xyXG5pbXBvcnQgdHJpYW5nbGVTeW1ib2wgZnJvbSAnLi9zeW1ib2xzL3RyaWFuZ2xlJ1xyXG5pbXBvcnQge0FwcFV0aWxzfSBmcm9tIFwiLi9hcHAtdXRpbHNcIjtcclxuXHJcbi8qVHJlZSBsYXlvdXQgbWFuYWdlciovXHJcbmV4cG9ydCBjbGFzcyBMYXlvdXR7XHJcblxyXG4gICAgdHJlZURlc2lnbmVyO1xyXG4gICAgZGF0YTtcclxuICAgIGNvbmZpZztcclxuXHJcbiAgICBub2RlVHlwZVRvU3ltYm9sID0ge1xyXG4gICAgICAgICdkZWNpc2lvbic6IGQzLnN5bWJvbFNxdWFyZSxcclxuICAgICAgICAnY2hhbmNlJzogY2lyY2xlU3ltYm9sLFxyXG4gICAgICAgIFwidGVybWluYWxcIjogdHJpYW5nbGVTeW1ib2xcclxuICAgIH07XHJcblxyXG4gICAgc3RhdGljIE1BTlVBTF9MQVlPVVRfTkFNRSA9ICdtYW51YWwnO1xyXG5cclxuXHJcbiAgICBvbkF1dG9MYXlvdXRDaGFuZ2VkPVtdO1xyXG5cclxuICAgIG5vZGVUeXBlT3JkZXIgPSB7XHJcbiAgICAgICAgJ2RlY2lzaW9uJyA6IDAsXHJcbiAgICAgICAgJ2NoYW5jZSc6IDAsXHJcbiAgICAgICAgJ3Rlcm1pbmFsJzogMVxyXG4gICAgfTtcclxuXHJcbiAgICB0cmVlTWFyZ2luID0gNTA7XHJcbiAgICB0YXJnZXRTeW1ib2xTaXplPXt9O1xyXG4gICAgbm9kZVNlcGFyYXRpb24gPSAoYSwgYikgPT4gYS5wYXJlbnQgPT09IGIucGFyZW50ID8gMSA6IDEuMlxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHRyZWVEZXNpZ25lciwgZGF0YSwgY29uZmlnKXtcclxuICAgICAgICB0aGlzLnRyZWVEZXNpZ25lciA9IHRyZWVEZXNpZ25lcjtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUobm9kZSl7XHJcbiAgICAgICAgaWYobm9kZSAmJiBub2RlLiRwYXJlbnQpe1xyXG4gICAgICAgICAgICBub2RlLiRwYXJlbnQuY2hpbGRFZGdlcy5zb3J0KChhLGIpPT5hLmNoaWxkTm9kZS5sb2NhdGlvbi55IC0gYi5jaGlsZE5vZGUubG9jYXRpb24ueSlcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIXRoaXMuaXNNYW51YWxMYXlvdXQoKSl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmF1dG9MYXlvdXQodGhpcy5jb25maWcudHlwZSwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKG5vZGUpe1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVOb2RlVG9FbXB0eVBsYWNlKG5vZGUpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLnRyZWVEZXNpZ25lci5yZWRyYXcodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlzTWFudWFsTGF5b3V0KCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLnR5cGUgPT09IExheW91dC5NQU5VQUxfTEFZT1VUX05BTUU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TmV3Q2hpbGRMb2NhdGlvbihwYXJlbnQpe1xyXG4gICAgICAgIGlmKCFwYXJlbnQpe1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IG1vZGVsLlBvaW50KHRoaXMuZ2V0Tm9kZU1pblgoKSwgdGhpcy5nZXROb2RlTWluWSgpKVxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgeCA9IHBhcmVudC5sb2NhdGlvbi54ICsgdGhpcy5jb25maWcuZ3JpZFdpZHRoO1xyXG4gICAgICAgIHZhciB5ID0gcGFyZW50LmxvY2F0aW9uLnk7XHJcbiAgICAgICAgaWYocGFyZW50LmNoaWxkRWRnZXMubGVuZ3RoKXtcclxuICAgICAgICAgICAgeSA9IHBhcmVudC5jaGlsZEVkZ2VzW3BhcmVudC5jaGlsZEVkZ2VzLmxlbmd0aC0xXS5jaGlsZE5vZGUubG9jYXRpb24ueSsxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBtb2RlbC5Qb2ludCh4LCB5KVxyXG4gICAgfVxyXG5cclxuICAgIGdldEluamVjdGVkTm9kZUxvY2F0aW9uKGVkZ2Upe1xyXG5cclxuICAgICAgICB2YXIgcCA9IGVkZ2UuJGxpbmVQb2ludHNbMl07XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgbW9kZWwuUG9pbnQocFswXSwgcFsxXSlcclxuICAgIH1cclxuXHJcbiAgICBtb3ZlTm9kZVRvRW1wdHlQbGFjZShub2RlLCByZWRyYXdJZkNoYW5nZWQ9dHJ1ZSl7XHJcbiAgICAgICAgdmFyIHBvc2l0aW9uTWFwID0ge307XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIG5vZGUubG9jYXRpb24ueCA9IE1hdGgubWF4KHRoaXMuZ2V0Tm9kZU1pblgobm9kZSksIG5vZGUubG9jYXRpb24ueCk7XHJcbiAgICAgICAgbm9kZS5sb2NhdGlvbi55ID0gTWF0aC5tYXgodGhpcy5nZXROb2RlTWluWShub2RlKSwgbm9kZS5sb2NhdGlvbi55KTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMubm9kZXNTb3J0ZWRCeVggPSB0aGlzLmRhdGEubm9kZXMuc2xpY2UoKTtcclxuICAgICAgICB0aGlzLm5vZGVzU29ydGVkQnlYLnNvcnQoKGEsYik9PmEubG9jYXRpb24ueCAtIGIubG9jYXRpb24ueCk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGZpbmRDb2xsaWRpbmdOb2RlKG5vZGUsIGxvY2F0aW9uKXtcclxuICAgICAgICAgICAgcmV0dXJuIFV0aWxzLmZpbmQoc2VsZi5ub2Rlc1NvcnRlZEJ5WCwgbj0+e1xyXG4gICAgICAgICAgICAgICAgaWYobm9kZSA9PSBuKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIG1hcmdpbiA9IHNlbGYuY29uZmlnLm5vZGVTaXplLzM7XHJcbiAgICAgICAgICAgICAgICB2YXIgeCA9IG4ubG9jYXRpb24ueDtcclxuICAgICAgICAgICAgICAgIHZhciB5ID0gbi5sb2NhdGlvbi55O1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAobG9jYXRpb24ueCAtIG1hcmdpbiA8PSB4ICYmIGxvY2F0aW9uLnggKyBtYXJnaW4gPj0geFxyXG4gICAgICAgICAgICAgICAgICAgICYmIGxvY2F0aW9uLnkgLSBtYXJnaW4gPD0geSAmJiBsb2NhdGlvbi55ICsgbWFyZ2luID49IHkpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHN0ZXBYID0gdGhpcy5jb25maWcubm9kZVNpemUvMjtcclxuICAgICAgICB2YXIgc3RlcFkgPSB0aGlzLmNvbmZpZy5ub2RlU2l6ZSsxMDtcclxuICAgICAgICB2YXIgc3RlcFhzYW1lUGFyZW50ID0gMDtcclxuICAgICAgICB2YXIgc3RlcFlzYW1lUGFyZW50ID0gNzU7XHJcbiAgICAgICAgdmFyIGNoYW5nZWQgPSBmYWxzZTtcclxuICAgICAgICB2YXIgY29saWRpbmdOb2RlO1xyXG4gICAgICAgIHZhciBuZXdMb2NhdGlvbiA9IG5ldyBtb2RlbC5Qb2ludChub2RlLmxvY2F0aW9uKTtcclxuICAgICAgICB3aGlsZShjb2xpZGluZ05vZGUgPSBmaW5kQ29sbGlkaW5nTm9kZShub2RlLCBuZXdMb2NhdGlvbikpe1xyXG4gICAgICAgICAgICBjaGFuZ2VkPXRydWU7XHJcbiAgICAgICAgICAgIHZhciBzYW1lUGFyZW50ID0gbm9kZS4kcGFyZW50ICYmIGNvbGlkaW5nTm9kZS4kcGFyZW50ICYmIG5vZGUuJHBhcmVudD09PWNvbGlkaW5nTm9kZS4kcGFyZW50O1xyXG4gICAgICAgICAgICBpZihzYW1lUGFyZW50KXtcclxuICAgICAgICAgICAgICAgIG5ld0xvY2F0aW9uLm1vdmUoc3RlcFhzYW1lUGFyZW50LCBzdGVwWXNhbWVQYXJlbnQpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIG5ld0xvY2F0aW9uLm1vdmUoc3RlcFgsIHN0ZXBZKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihjaGFuZ2VkKXtcclxuICAgICAgICAgICAgbm9kZS5tb3ZlVG8obmV3TG9jYXRpb24ueCxuZXdMb2NhdGlvbi55LCB0cnVlKTtcclxuICAgICAgICAgICAgaWYocmVkcmF3SWZDaGFuZ2VkKXtcclxuICAgICAgICAgICAgICAgIHRoaXMudHJlZURlc2lnbmVyLnJlZHJhdyh0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkaXNhYmxlQXV0b0xheW91dCgpe1xyXG4gICAgICAgIHRoaXMuY29uZmlnLnR5cGUgPSBMYXlvdXQuTUFOVUFMX0xBWU9VVF9OQU1FO1xyXG4gICAgICAgIHRoaXMuX2ZpcmVPbkF1dG9MYXlvdXRDaGFuZ2VkQ2FsbGJhY2tzKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIG5vZGVTeW1ib2xTaXplID0ge307XHJcbiAgICBkcmF3Tm9kZVN5bWJvbChwYXRoLCB0cmFuc2l0aW9uKXtcclxuXHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHZhciBub2RlU2l6ZSA9IHRoaXMuY29uZmlnLm5vZGVTaXplO1xyXG4gICAgICAgIHRoaXMubm9kZVN5bWJvbCA9IGQzLnN5bWJvbCgpLnR5cGUoZD0+IHNlbGYubm9kZVR5cGVUb1N5bWJvbFtkLnR5cGVdKVxyXG4gICAgICAgICAgICAuc2l6ZShkPT5zZWxmLm5vZGVTeW1ib2xTaXplW2QuaWRdID8gVXRpbHMuZ2V0KHNlbGYudGFyZ2V0U3ltYm9sU2l6ZSwgZC50eXBlK1wiWydcIitzZWxmLmNvbmZpZy5ub2RlU2l6ZStcIiddXCIsIDY0KSA6IDY0KTtcclxuXHJcbiAgICAgICAgcGF0aFxyXG4gICAgICAgICAgICAuZWFjaChmdW5jdGlvbiAoZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBhdGggPSBkMy5zZWxlY3QodGhpcyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgcHJldiA9IHBhdGguYXR0cihcImRcIik7XHJcbiAgICAgICAgICAgICAgICBpZighcHJldil7XHJcbiAgICAgICAgICAgICAgICAgICAgcGF0aC5hdHRyKFwiZFwiLCBzZWxmLm5vZGVTeW1ib2wpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIHNpemUgPSBVdGlscy5nZXQoc2VsZi50YXJnZXRTeW1ib2xTaXplLCBkLnR5cGUrXCJbJ1wiK3NlbGYuY29uZmlnLm5vZGVTaXplK1wiJ11cIik7XHJcbiAgICAgICAgICAgICAgICBpZighc2l6ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJveCA9IHBhdGgubm9kZSgpLmdldEJCb3goKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSBNYXRoLm1pbihub2RlU2l6ZSAvIGJveC53aWR0aCwgbm9kZVNpemUgLyBib3guaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgICAgICBzaXplID0gZXJyb3IgKiBlcnJvciAqIChzZWxmLm5vZGVTeW1ib2xTaXplW2QuaWRdfHw2NCk7XHJcbiAgICAgICAgICAgICAgICAgICAgVXRpbHMuc2V0KHNlbGYudGFyZ2V0U3ltYm9sU2l6ZSwgZC50eXBlK1wiWydcIitzZWxmLmNvbmZpZy5ub2RlU2l6ZStcIiddXCIsIHNpemUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYodHJhbnNpdGlvbil7XHJcbiAgICAgICAgICAgICAgICAgICAgcGF0aCA9ICBwYXRoLnRyYW5zaXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLm5vZGVTeW1ib2xTaXplW2QuaWRdID0gc2l6ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHBhdGguYXR0cihcImRcIiwgc2VsZi5ub2RlU3ltYm9sKTtcclxuICAgICAgICAgICAgICAgIGlmKHRyYW5zaXRpb24pe1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYubm9kZVN5bWJvbFNpemVbZC5pZF0gPSBzaXplO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBub2RlTGFiZWxQb3NpdGlvbihzZWxlY3Rpb24pIHtcclxuICAgICAgICByZXR1cm4gc2VsZWN0aW9uXHJcbiAgICAgICAgICAgIC5hdHRyKCd4JywgMClcclxuICAgICAgICAgICAgLmF0dHIoJ3knLCAtdGhpcy5jb25maWcubm9kZVNpemUgLyAyIC0gNylcclxuICAgIH1cclxuXHJcbiAgICBub2RlUGF5b2ZmUG9zaXRpb24oc2VsZWN0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuIExheW91dC5zZXRIYW5naW5nUG9zaXRpb24oc2VsZWN0aW9uKVxyXG4gICAgICAgICAgICAuYXR0cigneCcsIDApXHJcbiAgICAgICAgICAgIC5hdHRyKCd5JywgdGhpcy5jb25maWcubm9kZVNpemUgLyAyICsgNylcclxuICAgICAgICAgICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXHJcbiAgICB9XHJcblxyXG4gICAgbm9kZUFnZ3JlZ2F0ZWRQYXlvZmZQb3NpdGlvbihzZWxlY3Rpb24pIHtcclxuICAgICAgICB2YXIgeCA9IHRoaXMuY29uZmlnLm5vZGVTaXplIC8gMiArIDc7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHNlbGVjdGlvblxyXG4gICAgICAgICAgICAuYXR0cigneCcsIHgpXHJcbiAgICAgICAgICAgIC5hdHRyKCd5JywgZnVuY3Rpb24oZCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgZm9udFNpemUgPSBwYXJzZUludChBcHBVdGlscy5nZXRGb250U2l6ZSh0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbXMgPSBkLmRpc3BsYXlWYWx1ZSgnYWdncmVnYXRlZFBheW9mZicpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG51bWJlciA9IFV0aWxzLmlzQXJyYXkoaXRlbXMpID8gaXRlbXMuZmlsdGVyKGl0PT5pdCAhPT0gdW5kZWZpbmVkKS5sZW5ndGggOiAxO1xyXG4gICAgICAgICAgICAgICAgaWYobnVtYmVyPjEpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAtdGhpcy5nZXRCQm94KCkuaGVpZ2h0LzIgKyBmb250U2l6ZS8yO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIC1NYXRoLm1heCgyLCAxLjgqIHNlbGYuY29uZmlnLm5vZGVTaXplL2ZvbnRTaXplKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHNlbGVjdGlvbi5zZWxlY3RBbGwoJ3RzcGFuJykuYXR0cigneCcsIHgpO1xyXG4gICAgICAgIHJldHVybiBzZWxlY3Rpb247XHJcbiAgICAgICAgICAgIC8vIC5hdHRyKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKVxyXG4gICAgICAgICAgICAvLyAuYXR0cignZG9taW5hbnQtYmFzZWxpbmUnLCAnaGFuZ2luZycpXHJcbiAgICB9XHJcblxyXG4gICAgbm9kZVByb2JhYmlsaXR5VG9FbnRlclBvc2l0aW9uKHNlbGVjdGlvbikge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgcmV0dXJuIExheW91dC5zZXRIYW5naW5nUG9zaXRpb24oc2VsZWN0aW9uKVxyXG4gICAgICAgICAgICAuYXR0cigneCcsIHRoaXMuY29uZmlnLm5vZGVTaXplIC8gMiArIDcpXHJcbiAgICAgICAgICAgIC5hdHRyKCd5JywgZnVuY3Rpb24oZCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgZm9udFNpemUgPSBwYXJzZUludChBcHBVdGlscy5nZXRGb250U2l6ZSh0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgYWdncmVnYXRlZFBheW9mZnMgPSBkLmRpc3BsYXlWYWx1ZSgnYWdncmVnYXRlZFBheW9mZicpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGFnZ3JlZ2F0ZWRQYXlvZmZzTnVtYmVyID0gVXRpbHMuaXNBcnJheShhZ2dyZWdhdGVkUGF5b2ZmcykgPyBhZ2dyZWdhdGVkUGF5b2Zmcy5maWx0ZXIoaXQ9Pml0ICE9PSB1bmRlZmluZWQpLmxlbmd0aCA6IDE7XHJcbiAgICAgICAgICAgICAgICBpZihhZ2dyZWdhdGVkUGF5b2Zmc051bWJlcj4xKXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZvbnRTaXplKjAuNlxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLm1heCgyLCAxLjgqIHNlbGYuY29uZmlnLm5vZGVTaXplL2ZvbnRTaXplKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLy8gLmF0dHIoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXHJcbiAgICAgICAgICAgIC8vIC5hdHRyKCdkb21pbmFudC1iYXNlbGluZScsICdjZW50cmFsJylcclxuICAgIH1cclxuXHJcbiAgICBub2RlSW5kaWNhdG9yUG9zaXRpb24oc2VsZWN0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuIHNlbGVjdGlvblxyXG4gICAgICAgICAgICAuYXR0cigneCcsIHRoaXMuY29uZmlnLm5vZGVTaXplIC8gMiArIDgpXHJcbiAgICAgICAgICAgIC5hdHRyKCd5JywgLSB0aGlzLmNvbmZpZy5ub2RlU2l6ZS8yKVxyXG4gICAgICAgICAgICAuYXR0cignZG9taW5hbnQtYmFzZWxpbmUnLCAnY2VudHJhbCcpXHJcbiAgICAgICAgICAgIC5hdHRyKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKVxyXG4gICAgfVxyXG5cclxuICAgIG5vZGVVbmZvbGRCdXR0b25Qb3NpdGlvbihzZWxlY3Rpb24pIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIHNlbGVjdGlvblxyXG4gICAgICAgICAgICAuYXR0cigneCcsIHRoaXMuY29uZmlnLm5vZGVTaXplIC8gMiArIDUpXHJcbiAgICAgICAgICAgIC5hdHRyKCd5JywgMClcclxuICAgICAgICAgICAgLmF0dHIoJ2RvbWluYW50LWJhc2VsaW5lJywgJ2NlbnRyYWwnKVxyXG4gICAgfVxyXG5cclxuICAgIGVkZ2VMaW5lRChlZGdlKXtcclxuICAgICAgICB2YXIgbGluZSA9IGQzLmxpbmUoKVxyXG4gICAgICAgICAgICAueChkPT4gZFswXSlcclxuICAgICAgICAgICAgLnkoZD0+IGRbMV0pO1xyXG4gICAgICAgIC8vIC5jdXJ2ZShkMy5jdXJ2ZUNhdG11bGxSb20uYWxwaGEoMC41KSk7XHJcblxyXG5cclxuICAgICAgICB2YXIgcGFyZW50Tm9kZSA9IGVkZ2UucGFyZW50Tm9kZTtcclxuICAgICAgICB2YXIgY2hpbGROb2RlID0gZWRnZS5jaGlsZE5vZGU7XHJcblxyXG4gICAgICAgIHZhciBkWCA9IGNoaWxkTm9kZS5sb2NhdGlvbi54IC0gcGFyZW50Tm9kZS5sb2NhdGlvbi54O1xyXG4gICAgICAgIHZhciBkWSA9IGNoaWxkTm9kZS5sb2NhdGlvbi55IC0gcGFyZW50Tm9kZS5sb2NhdGlvbi55O1xyXG5cclxuICAgICAgICB2YXIgc2lnbiA9IGRYPj0wID8gMSA6IC0xO1xyXG5cclxuICAgICAgICB2YXIgc2xhbnRTdGFydFhPZmZzZXQgPSBNYXRoLm1pbihkWC8yLCB0aGlzLmNvbmZpZy5ub2RlU2l6ZS8yKzEwKTtcclxuICAgICAgICB2YXIgc2xhbnRXaWR0aCA9IE1hdGgubWluKHRoaXMuY29uZmlnLmVkZ2VTbGFudFdpZHRoTWF4LCBNYXRoLm1heChkWC8yIC0gc2xhbnRTdGFydFhPZmZzZXQsIDApKTtcclxuXHJcbiAgICAgICAgdmFyIHBvaW50MSA9IFtwYXJlbnROb2RlLmxvY2F0aW9uLnggK3RoaXMuY29uZmlnLm5vZGVTaXplLzIgKyAxLCBwYXJlbnROb2RlLmxvY2F0aW9uLnldO1xyXG4gICAgICAgIHZhciBwb2ludDIgPSBbTWF0aC5tYXgocGFyZW50Tm9kZS5sb2NhdGlvbi54K3NsYW50U3RhcnRYT2Zmc2V0LCBwb2ludDFbMF0pLCBwYXJlbnROb2RlLmxvY2F0aW9uLnldO1xyXG4gICAgICAgIHZhciBwb2ludDMgPSBbcGFyZW50Tm9kZS5sb2NhdGlvbi54K3NsYW50U3RhcnRYT2Zmc2V0K3NsYW50V2lkdGgsIGNoaWxkTm9kZS5sb2NhdGlvbi55XTtcclxuICAgICAgICB2YXIgcG9pbnQ0ID0gW2NoaWxkTm9kZS5sb2NhdGlvbi54IC0gKHNpZ24qKE1hdGgubWF4KDAsIE1hdGgubWluKHRoaXMuY29uZmlnLm5vZGVTaXplLzIrOCwgZFgvMikpKSksIGNoaWxkTm9kZS5sb2NhdGlvbi55XTtcclxuICAgICAgICAvLyB2YXIgcG9pbnQyID0gW3BhcmVudE5vZGUubG9jYXRpb24ueCtkWC8yLXNsYW50V2lkdGgvMiwgcGFyZW50Tm9kZS5sb2NhdGlvbi55XTtcclxuICAgICAgICAvLyB2YXIgcG9pbnQzID0gW2NoaWxkTm9kZS5sb2NhdGlvbi54LShkWC8yLXNsYW50V2lkdGgvMiksIGNoaWxkTm9kZS5sb2NhdGlvbi55XTtcclxuXHJcbiAgICAgICAgZWRnZS4kbGluZVBvaW50cyA9IFtwb2ludDEsIHBvaW50MiwgcG9pbnQzLCBwb2ludDRdO1xyXG4gICAgICAgIHJldHVybiBsaW5lKGVkZ2UuJGxpbmVQb2ludHMpO1xyXG4gICAgfVxyXG5cclxuICAgIGVkZ2VQYXlvZmZQb3NpdGlvbihzZWxlY3Rpb24pIHtcclxuICAgICAgICBMYXlvdXQuc2V0SGFuZ2luZ1Bvc2l0aW9uKHNlbGVjdGlvbilcclxuICAgICAgICAgICAgLmF0dHIoJ3gnLCBkPT5kLiRsaW5lUG9pbnRzWzJdWzBdICsgMilcclxuICAgICAgICAgICAgLmF0dHIoJ3knLCBkPT5kLiRsaW5lUG9pbnRzWzJdWzFdICsgNyk7XHJcblxyXG4gICAgICAgIHNlbGVjdGlvbi5zZWxlY3RBbGwoJ3RzcGFuJykuYXR0cigneCcsIGZ1bmN0aW9uKGQpe1xyXG4gICAgICAgICAgICByZXR1cm4gZDMuc2VsZWN0KHRoaXMucGFyZW50Tm9kZSkuZGF0dW0oKS4kbGluZVBvaW50c1syXVswXSArIDJcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gc2VsZWN0aW9uO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBlZGdlTGFiZWxQb3NpdGlvbihzZWxlY3Rpb24pIHtcclxuICAgICAgICByZXR1cm4gc2VsZWN0aW9uXHJcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBkPT4ndHJhbnNsYXRlKCcrKGQuJGxpbmVQb2ludHNbMl1bMF0gKyAyKSsnLCcrKGQuJGxpbmVQb2ludHNbMl1bMV0gLSA3KSsnKScpXHJcbiAgICAgICAgICAgIC8vIC5hdHRyKCd4JywgZD0+ZC4kbGluZVBvaW50c1syXVswXSArIDIpXHJcbiAgICAgICAgICAgIC8vIC5hdHRyKCd5JywgZD0+ZC4kbGluZVBvaW50c1syXVsxXSAtIDcpXHJcblxyXG4gICAgfVxyXG5cclxuICAgIGVkZ2VQcm9iYWJpbGl0eVBvc2l0aW9uKHNlbGVjdGlvbikge1xyXG4gICAgICAgIHJldHVybiBMYXlvdXQuc2V0SGFuZ2luZ1Bvc2l0aW9uKHNlbGVjdGlvbilcclxuICAgICAgICAgICAgLmF0dHIoJ3gnLCBmdW5jdGlvbiAoZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGxlbiA9IHRoaXMuZ2V0Q29tcHV0ZWRUZXh0TGVuZ3RoKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWluID0gZC4kbGluZVBvaW50c1syXVswXSArIDIgKyB0aGlzLnByZXZpb3VzU2libGluZy5jaGlsZE5vZGVzWzBdLmdldENvbXB1dGVkVGV4dExlbmd0aCgpICsgNyArIGxlbjtcclxuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLm1heChtaW4sIGQuJGxpbmVQb2ludHNbM11bMF0gLSA4KTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmF0dHIoJ3knLCBkPT5kLiRsaW5lUG9pbnRzWzJdWzFdICsgNylcclxuICAgIH1cclxuXHJcbiAgICBnZXRNaW5NYXJnaW5CZXR3ZWVuTm9kZXMoKXtcclxuICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLm5vZGVTaXplICsgMzA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VGV4dE1pblgoZCl7XHJcbiAgICAgICAgbGV0IG1pblggPSAwO1xyXG4gICAgICAgIGlmKGQpe1xyXG4gICAgICAgICAgICBsZXQgYmIgPSB0aGlzLnRyZWVEZXNpZ25lci5nZXRUZXh0RDNTZWxlY3Rpb24oZCkuc2VsZWN0KCd0ZXh0Jykubm9kZSgpLmdldEJCb3goKTtcclxuICAgICAgICAgICAgaWYgKGJiLnggPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBtaW5YIC09IGJiLng7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1pblg7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VGV4dE1pblkoZCl7XHJcbiAgICAgICAgbGV0IG1pblkgPSAwO1xyXG4gICAgICAgIGlmKGQpe1xyXG4gICAgICAgICAgICBsZXQgYmIgPSB0aGlzLnRyZWVEZXNpZ25lci5nZXRUZXh0RDNTZWxlY3Rpb24oZCkuc2VsZWN0KCd0ZXh0Jykubm9kZSgpLmdldEJCb3goKTtcclxuICAgICAgICAgICAgaWYgKGJiLnkgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBtaW5ZIC09IGJiLnk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1pblk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VGV4dE1heFgoZCl7XHJcbiAgICAgICAgcmV0dXJuIE51bWJlci5NQVhfU0FGRV9JTlRFR0VSO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBnZXROb2RlTWluWChkKXtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgaWYoZCAmJiBkLiRwYXJlbnQpey8vICYmICFzZWxmLmlzTm9kZVNlbGVjdGVkKGQuJHBhcmVudClcclxuICAgICAgICAgICAgcmV0dXJuIGQuJHBhcmVudC5sb2NhdGlvbi54ICsgc2VsZi5nZXRNaW5NYXJnaW5CZXR3ZWVuTm9kZXMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNlbGYuY29uZmlnLm5vZGVTaXplLzI7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Tm9kZU1pblkoZCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLm5vZGVTaXplLzI7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Tm9kZU1heFgoZCl7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICBpZihkICYmIGQuY2hpbGRFZGdlcy5sZW5ndGgpe1xyXG4gICAgICAgICAgICByZXR1cm4gZDMubWluKGQuY2hpbGRFZGdlcywgZT0+IWUuY2hpbGROb2RlLiRoaWRkZW4gPyBlLmNoaWxkTm9kZS5sb2NhdGlvbi54IDogOTk5OTk5OSktc2VsZi5nZXRNaW5NYXJnaW5CZXR3ZWVuTm9kZXMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIE51bWJlci5NQVhfU0FGRV9JTlRFR0VSO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEdyaWRXaWR0aCh3aWR0aCwgd2l0aG91dFN0YXRlU2F2aW5nKXtcclxuICAgICAgICB2YXIgc2VsZj10aGlzO1xyXG4gICAgICAgIGlmKHRoaXMuY29uZmlnLmdyaWRXaWR0aD09PXdpZHRoKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZighd2l0aG91dFN0YXRlU2F2aW5nKXtcclxuICAgICAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBkYXRhOntcclxuICAgICAgICAgICAgICAgICAgICBncmlkV2lkdGg6IHNlbGYuY29uZmlnLmdyaWRXaWR0aFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG9uVW5kbzogKGRhdGEpPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0R3JpZFdpZHRoKGRhdGEuZ3JpZFdpZHRoLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBvblJlZG86IChkYXRhKT0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldEdyaWRXaWR0aCh3aWR0aCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jb25maWcuZ3JpZFdpZHRoPXdpZHRoO1xyXG4gICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0R3JpZEhlaWdodChncmlkSGVpZ2h0LCB3aXRob3V0U3RhdGVTYXZpbmcpe1xyXG4gICAgICAgIHZhciBzZWxmPXRoaXM7XHJcbiAgICAgICAgaWYodGhpcy5jb25maWcuZ3JpZEhlaWdodD09PWdyaWRIZWlnaHQpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCF3aXRob3V0U3RhdGVTYXZpbmcpe1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKHtcclxuICAgICAgICAgICAgICAgIGRhdGE6e1xyXG4gICAgICAgICAgICAgICAgICAgIGdyaWRIZWlnaHQ6IHNlbGYuY29uZmlnLmdyaWRIZWlnaHRcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBvblVuZG86IChkYXRhKT0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldEdyaWRIZWlnaHQoZGF0YS5ncmlkSGVpZ2h0LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBvblJlZG86IChkYXRhKT0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldEdyaWRIZWlnaHQoZ3JpZEhlaWdodCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jb25maWcuZ3JpZEhlaWdodD1ncmlkSGVpZ2h0O1xyXG4gICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Tm9kZVNpemUobm9kZVNpemUsIHdpdGhvdXRTdGF0ZVNhdmluZyl7XHJcbiAgICAgICAgdmFyIHNlbGY9dGhpcztcclxuICAgICAgICBpZih0aGlzLmNvbmZpZy5ub2RlU2l6ZT09PW5vZGVTaXplKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZighd2l0aG91dFN0YXRlU2F2aW5nKXtcclxuICAgICAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBkYXRhOntcclxuICAgICAgICAgICAgICAgICAgICBub2RlU2l6ZTogc2VsZi5jb25maWcubm9kZVNpemVcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBvblVuZG86IChkYXRhKT0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldE5vZGVTaXplKGRhdGEubm9kZVNpemUsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG9uUmVkbzogKGRhdGEpPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0Tm9kZVNpemUobm9kZVNpemUsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY29uZmlnLm5vZGVTaXplPW5vZGVTaXplO1xyXG4gICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICAgICAgaWYodGhpcy5pc01hbnVhbExheW91dCgpKXtcclxuICAgICAgICAgICAgdGhpcy5maXROb2Rlc0luUGxvdHRpbmdSZWdpb24oc2VsZi5kYXRhLmdldFJvb3RzKCkpO1xyXG4gICAgICAgICAgICB0aGlzLnRyZWVEZXNpZ25lci5yZWRyYXcodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldEVkZ2VTbGFudFdpZHRoTWF4KHdpZHRoLCB3aXRob3V0U3RhdGVTYXZpbmcpe1xyXG4gICAgICAgIHZhciBzZWxmPXRoaXM7XHJcbiAgICAgICAgaWYodGhpcy5jb25maWcuZWRnZVNsYW50V2lkdGhNYXg9PT13aWR0aCl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIXdpdGhvdXRTdGF0ZVNhdmluZyl7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgZGF0YTp7XHJcbiAgICAgICAgICAgICAgICAgICAgZWRnZVNsYW50V2lkdGhNYXg6IHNlbGYuY29uZmlnLmVkZ2VTbGFudFdpZHRoTWF4XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgb25VbmRvOiAoZGF0YSk9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRFZGdlU2xhbnRXaWR0aE1heChkYXRhLmVkZ2VTbGFudFdpZHRoTWF4LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBvblJlZG86IChkYXRhKT0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldEVkZ2VTbGFudFdpZHRoTWF4KHdpZHRoLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNvbmZpZy5lZGdlU2xhbnRXaWR0aE1heD13aWR0aDtcclxuICAgICAgICB0aGlzLnRyZWVEZXNpZ25lci5yZWRyYXcodHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgYXV0b0xheW91dCh0eXBlLCB3aXRob3V0U3RhdGVTYXZpbmcpe1xyXG4gICAgICAgIHZhciBzZWxmPXRoaXM7XHJcblxyXG5cclxuXHJcbiAgICAgICAgaWYoIXdpdGhvdXRTdGF0ZVNhdmluZyl7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgZGF0YTp7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3TGF5b3V0OiB0eXBlLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRMYXlvdXQ6IHNlbGYuY29uZmlnLnR5cGVcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBvblVuZG86IChkYXRhKT0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmNvbmZpZy50eXBlID0gZGF0YS5jdXJyZW50TGF5b3V0O1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuX2ZpcmVPbkF1dG9MYXlvdXRDaGFuZ2VkQ2FsbGJhY2tzKCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgb25SZWRvOiAoZGF0YSk9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5hdXRvTGF5b3V0KGRhdGEubmV3TGF5b3V0LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY29uZmlnLnR5cGUgPSB0eXBlO1xyXG4gICAgICAgIGlmKCF0aGlzLmRhdGEubm9kZXMubGVuZ3RoKXtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZU9uQXV0b0xheW91dENoYW5nZWRDYWxsYmFja3MoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHByZXZUcmVlTWF4WSA9IHNlbGYuZ2V0Tm9kZU1pblkoKTtcclxuICAgICAgICB0aGlzLmRhdGEuZ2V0Um9vdHMoKS5mb3JFYWNoKHI9PntcclxuICAgICAgICAgICAgdmFyIHJvb3QgPSBkMy5oaWVyYXJjaHkociwgZD0+e1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuY2hpbGRFZGdlcy5maWx0ZXIoZT0+IWUuJGhpZGRlbikubWFwKGU9PmUuY2hpbGROb2RlKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyByb290LnNvcnQoKGEsYik9PnNlbGYubm9kZVR5cGVPcmRlclthLmRhdGEudHlwZV0tc2VsZi5ub2RlVHlwZU9yZGVyW2IuZGF0YS50eXBlXSk7XHJcbiAgICAgICAgICAgIHJvb3Quc29ydCgoYSxiKT0+YS5kYXRhLmxvY2F0aW9uLnkgLSBiLmRhdGEubG9jYXRpb24ueSk7XHJcblxyXG5cclxuICAgICAgICAgICAgdmFyIGxheW91dDtcclxuICAgICAgICAgICAgaWYodHlwZT09PSdjbHVzdGVyJyl7XHJcbiAgICAgICAgICAgICAgICBsYXlvdXQgPSBkMy5jbHVzdGVyKCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgbGF5b3V0ID0gZDMudHJlZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxheW91dC5ub2RlU2l6ZShbc2VsZi5jb25maWcuZ3JpZEhlaWdodCwgc2VsZi5jb25maWcuZ3JpZFdpZHRoXSk7XHJcbiAgICAgICAgICAgIGxheW91dC5zZXBhcmF0aW9uKHNlbGYubm9kZVNlcGFyYXRpb24pO1xyXG5cclxuICAgICAgICAgICAgbGF5b3V0KHJvb3QpO1xyXG4gICAgICAgICAgICB2YXIgbWluWSA9IDk5OTk5OTk5OTtcclxuICAgICAgICAgICAgcm9vdC5lYWNoKGQ9PntcclxuICAgICAgICAgICAgICAgIG1pblkgPSBNYXRoLm1pbihtaW5ZLCBkLngpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHZhciBkeSA9IHJvb3QueCAtIG1pblkgKyBwcmV2VHJlZU1heFk7XHJcbiAgICAgICAgICAgIHZhciBkeCA9IHNlbGYuZ2V0Tm9kZU1pblgoKTtcclxuICAgICAgICAgICAgdmFyIG1heFk9MDtcclxuICAgICAgICAgICAgcm9vdC5lYWNoKGQ9PntcclxuICAgICAgICAgICAgICAgIGQuZGF0YS5sb2NhdGlvbi54ID0gZC55ICsgZHg7XHJcbiAgICAgICAgICAgICAgICBkLmRhdGEubG9jYXRpb24ueSA9IGQueCArIGR5O1xyXG5cclxuICAgICAgICAgICAgICAgIG1heFkgPSBNYXRoLm1heChtYXhZLCBkLmRhdGEubG9jYXRpb24ueSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcHJldlRyZWVNYXhZID0gbWF4WSArIHNlbGYuY29uZmlnLm5vZGVTaXplK3NlbGYudHJlZU1hcmdpbjtcclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIC8vIHRoaXMudHJhbnNpdGlvbiA9IHRydWU7XHJcbiAgICAgICAgdGhpcy50cmVlRGVzaWduZXIucmVkcmF3KHRydWUpO1xyXG4gICAgICAgIC8vIHRoaXMudHJhbnNpdGlvbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLl9maXJlT25BdXRvTGF5b3V0Q2hhbmdlZENhbGxiYWNrcygpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGZpdE5vZGVzSW5QbG90dGluZ1JlZ2lvbihub2Rlcyl7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHZhciB0b3BZID0gZDMubWluKG5vZGVzLCBuPT5uLmxvY2F0aW9uLnkpO1xyXG4gICAgICAgIHZhciBtaW5ZID0gc2VsZi5nZXROb2RlTWluWSgpO1xyXG4gICAgICAgIHZhciBkeSA9IHRvcFkgLSBtaW5ZO1xyXG5cclxuICAgICAgICB2YXIgbWluWCA9IGQzLm1pbihub2Rlcywgbj0+bi5sb2NhdGlvbi54KTtcclxuICAgICAgICB2YXIgZHggPSBtaW5YIC0gc2VsZi5nZXROb2RlTWluWCgpO1xyXG5cclxuICAgICAgICBpZihkeTwwIHx8ICBkeDwwKXtcclxuICAgICAgICAgICAgbm9kZXMuZm9yRWFjaChuPT5uLm1vdmUoLWR4LCAtZHkpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZU5vZGVzKG5vZGVzLCBkeCwgZHksIHBpdm90KXtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGxpbWl0ID0gc2VsZi5jb25maWcubGltaXROb2RlUG9zaXRpb25pbmc7XHJcbiAgICAgICAgaWYobGltaXQpe1xyXG4gICAgICAgICAgICBpZihkeDwwKXtcclxuICAgICAgICAgICAgICAgIG5vZGVzLnNvcnQoKGEsYik9PmEubG9jYXRpb24ueC1iLmxvY2F0aW9uLngpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIG5vZGVzLnNvcnQoKGEsYik9PmIubG9jYXRpb24ueC1hLmxvY2F0aW9uLngpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgdmFyIG1pblkgPSBkMy5taW4obm9kZXMsIGQ9PmQubG9jYXRpb24ueSk7XHJcbiAgICAgICAgaWYobWluWSArIGR5IDwgc2VsZi5nZXROb2RlTWluWSgpKXtcclxuICAgICAgICAgICAgZHkgPSBzZWxmLmdldE5vZGVNaW5ZKCkgLSBtaW5ZO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbm9kZXMuZm9yRWFjaChkPT57XHJcbiAgICAgICAgICAgIGlmKGxpbWl0KXtcclxuICAgICAgICAgICAgICAgIExheW91dC5iYWNrdXBOb2RlTG9jYXRpb24oZCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWluWCA9IHNlbGYuZ2V0Tm9kZU1pblgoZCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWF4WCA9IHNlbGYuZ2V0Tm9kZU1heFgoZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgZC5sb2NhdGlvbi54ID0gTWF0aC5taW4oTWF0aC5tYXgoZC5sb2NhdGlvbi54K2R4LCBtaW5YKSwgbWF4WCk7XHJcbiAgICAgICAgICAgICAgICBkLmxvY2F0aW9uLnkgKz0gZHk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgZC5sb2NhdGlvbi54ICs9ZHg7XHJcbiAgICAgICAgICAgICAgICBkLmxvY2F0aW9uLnkgKz0gZHk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICB2YXIgcmV2ZXJ0WCA9IHBpdm90ICYmIHNlbGYuY29uZmlnLmxpbWl0Tm9kZVBvc2l0aW9uaW5nICYmIChwaXZvdC5sb2NhdGlvbi54ID09PSBwaXZvdC4kbG9jYXRpb24ueCk7XHJcblxyXG4gICAgICAgIG5vZGVzLmZvckVhY2goZD0+e1xyXG4gICAgICAgICAgICBpZihyZXZlcnRYKXtcclxuICAgICAgICAgICAgICAgIGQubG9jYXRpb24ueCA9IGQuJGxvY2F0aW9uLng7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2VsZi50cmVlRGVzaWduZXIudXBkYXRlTm9kZVBvc2l0aW9uKGQpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgbW92ZVRleHRzKHRleHRzLCBkeCwgZHkpe1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgbGltaXQgPSBzZWxmLmNvbmZpZy5saW1pdFRleHRQb3NpdGlvbmluZztcclxuICAgICAgICBpZihsaW1pdCl7XHJcbiAgICAgICAgICAgIGlmKGR4PDApe1xyXG4gICAgICAgICAgICAgICAgdGV4dHMuc29ydCgoYSxiKT0+YS5sb2NhdGlvbi54LWIubG9jYXRpb24ueCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGV4dHMuc29ydCgoYSxiKT0+Yi5sb2NhdGlvbi54LWEubG9jYXRpb24ueCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgdGV4dHMuZm9yRWFjaChkPT57XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBpZihsaW1pdCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgbWluWCA9IHNlbGYuZ2V0VGV4dE1pblgoZCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbWF4WCA9IHNlbGYuZ2V0VGV4dE1heFgoZCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbWluWSA9IHNlbGYuZ2V0VGV4dE1pblkoZCk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGQubG9jYXRpb24ueCA9IE1hdGgubWluKE1hdGgubWF4KGQubG9jYXRpb24ueCtkeCwgbWluWCksIG1heFgpO1xyXG4gICAgICAgICAgICAgICAgZC5sb2NhdGlvbi55ID0gTWF0aC5tYXgoZC5sb2NhdGlvbi55K2R5LCBtaW5ZKTtcclxuXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgZC5sb2NhdGlvbi5tb3ZlKGR4LCBkeSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2VsZi50cmVlRGVzaWduZXIudXBkYXRlVGV4dFBvc2l0aW9uKGQpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGJhY2t1cE5vZGVMb2NhdGlvbihub2RlKSB7XHJcbiAgICAgICAgbm9kZS4kbG9jYXRpb24gPSBuZXcgbW9kZWwuUG9pbnQobm9kZS5sb2NhdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgX2ZpcmVPbkF1dG9MYXlvdXRDaGFuZ2VkQ2FsbGJhY2tzKCl7XHJcbiAgICAgICAgdGhpcy5vbkF1dG9MYXlvdXRDaGFuZ2VkLmZvckVhY2goYz0+Yyh0aGlzLmNvbmZpZy50eXBlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHNldEhhbmdpbmdQb3NpdGlvbihzZWxlY3Rpb24pe1xyXG4gICAgICAgIC8vIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy8gICAgIHNlbGVjdGlvbi5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy8gICAgICAgICB2YXIgaCA9ICB0aGlzLmdldEJCb3goKS5oZWlnaHQ7XHJcbiAgICAgICAgLy8gICAgICAgICBkMy5zZWxlY3QodGhpcykuYXR0cignZHknLCBoKTtcclxuICAgICAgICAvLyAgICAgfSk7XHJcbiAgICAgICAgLy8gfSwwKTtcclxuXHJcbiAgICAgICAgaWYoQXBwVXRpbHMuaXNIaWRkZW4oc2VsZWN0aW9uLm5vZGUoKSkpeyAvLyBzZXR0aW5nIGhhbmdpbmcgcG9zaXRpb24gb2YgaGlkZGVuIGVsZW1lbnRzIGZhaWxzIG9uIGZpcmVmb3hcclxuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdGlvbjtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBzZWxlY3Rpb24uZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB2YXIgaCA9ICB0aGlzLmdldEJCb3goKS5oZWlnaHQ7XHJcbiAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5hdHRyKCdkeScsICcwLjc1ZW0nKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHNlbGVjdGlvbjtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcblxyXG4iLCJpbXBvcnQge0FwcFV0aWxzfSBmcm9tICcuL2FwcC11dGlscydcclxuaW1wb3J0ICogYXMgZDMgZnJvbSAnLi9kMydcclxuaW1wb3J0IHtDb250ZXh0TWVudX0gZnJvbSAnLi9jb250ZXh0LW1lbnUvY29udGV4dC1tZW51J1xyXG5cclxuZXhwb3J0IGNsYXNzIE5vZGVEcmFnSGFuZGxlcntcclxuXHJcbiAgICB0cmVlRGVzaWduZXI7XHJcbiAgICBkYXRhO1xyXG4gICAgY29uZmlnO1xyXG5cclxuICAgIGRyYWc7XHJcbiAgICBzdGF0ZVNuYXBzaG90ID0gbnVsbDtcclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IodHJlZURlc2lnbmVyLCBkYXRhKXtcclxuICAgICAgICB0aGlzLnRyZWVEZXNpZ25lciA9IHRyZWVEZXNpZ25lcjtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG5cclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5kcmFnID0gZDMuZHJhZygpXHJcbiAgICAgICAgICAgIC5zdWJqZWN0KGZ1bmN0aW9uKGV2ZW50LCBkKSB7XHJcbiAgICAgICAgICAgICAgICBpZihkPT1udWxsKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeDogZXZlbnQueCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeTogZXZlbnQueVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgdCA9IGQzLnNlbGVjdCh0aGlzKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgeDogdC5hdHRyKFwieFwiKSArIEFwcFV0aWxzLmdldFRyYW5zbGF0aW9uKHQuYXR0cihcInRyYW5zZm9ybVwiKSlbMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgeTogdC5hdHRyKFwieVwiKSArIEFwcFV0aWxzLmdldFRyYW5zbGF0aW9uKHQuYXR0cihcInRyYW5zZm9ybVwiKSlbMV1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5vbihcInN0YXJ0XCIsIGZ1bmN0aW9uKGV2ZW50LCBkKXtcclxuICAgICAgICAgICAgICAgIHNlbGYuZHJhZ1N0YXJ0ZWQuY2FsbCh0aGlzLCBldmVudCwgZCwgc2VsZilcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLm9uKFwiZHJhZ1wiLCBmdW5jdGlvbiAoZXZlbnQsIGQpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYub25EcmFnLmNhbGwodGhpcywgZXZlbnQsIGQsIHNlbGYpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAub24oXCJlbmRcIiwgZnVuY3Rpb24gKGV2ZW50LCBkKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmRyYWdFbmRlZC5jYWxsKHRoaXMsIGV2ZW50LCBkLCBzZWxmKTtcclxuICAgICAgICAgICAgfSlcclxuICAgIH1cclxuXHJcblxyXG4gICAgZHJhZ1N0YXJ0ZWQoZXZlbnQsIGQsIHNlbGYpIHtcclxuICAgICAgICBpZihzZWxmLmlnbm9yZURyYWcpe1xyXG4gICAgICAgICAgICBzZWxmLmlnbm9yZURyYWc9ZmFsc2U7XHJcbiAgICAgICAgICAgIHNlbGYuaWdub3JlZERyYWc9dHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZWxmLmlnbm9yZWREcmFnPWZhbHNlO1xyXG4gICAgICAgIHNlbGYuc3RhdGVTbmFwc2hvdCA9IHNlbGYuZGF0YS5jcmVhdGVTdGF0ZVNuYXBzaG90KCk7XHJcblxyXG4gICAgICAgIC8vIHNlbGYudHJlZURlc2lnbmVyLmxheW91dC5kaXNhYmxlQXV0b0xheW91dCgpO1xyXG4gICAgICAgIENvbnRleHRNZW51LmhpZGUoKTtcclxuICAgICAgICB2YXIgbm9kZSA9IGQzLnNlbGVjdCh0aGlzKTtcclxuICAgICAgICBpZighbm9kZS5jbGFzc2VkKFwic2VsZWN0ZWRcIikpe1xyXG4gICAgICAgICAgICBzZWxmLnRyZWVEZXNpZ25lci5jbGVhclNlbGVjdGlvbigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZi50cmVlRGVzaWduZXIuc2VsZWN0Tm9kZShkKTtcclxuICAgICAgICBub2RlLmNsYXNzZWQoXCJzZWxlY3RlZCBkcmFnZ2luZ1wiLCB0cnVlKTtcclxuICAgICAgICBzZWxmLnNlbGVjdGVkTm9kZXMgPSBzZWxmLnRyZWVEZXNpZ25lci5nZXRTZWxlY3RlZE5vZGVzKHRydWUpO1xyXG4gICAgICAgIHNlbGYucHJldkRyYWdFdmVudCA9IGV2ZW50O1xyXG4gICAgICAgIHNlbGYuZHJhZ0V2ZW50Q291bnQgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRHJhZyhldmVudCwgZHJhZ2dlZE5vZGUsIHNlbGYpe1xyXG4gICAgICAgIGlmKHNlbGYuaWdub3JlZERyYWcpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihzZWxmLmRyYWdFdmVudENvdW50PT09MiAmJiBzZWxmLnN0YXRlU25hcHNob3Qpe1xyXG4gICAgICAgICAgICBzZWxmLmRhdGEuc2F2ZVN0YXRlRnJvbVNuYXBzaG90KHNlbGYuc3RhdGVTbmFwc2hvdCk7IC8vIFRPRE8gc2F2ZSBvbmx5IGlmIHNvbWV0aGluZyBoYXMgcmVhbGx5IGNoYW5nZWRcclxuICAgICAgICAgICAgc2VsZi5zdGF0ZVNuYXBzaG90ID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2VsZi5kcmFnRXZlbnRDb3VudCsrO1xyXG4gICAgICAgIGlmKHNlbGYuc2VsZWN0ZWROb2Rlcy5sZW5ndGg+NSAmJiBzZWxmLmRyYWdFdmVudENvdW50JTIhPT0xKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGR4ID0gZXZlbnQueCAtIHNlbGYucHJldkRyYWdFdmVudC54O1xyXG4gICAgICAgIHZhciBkeSA9IGV2ZW50LnktIHNlbGYucHJldkRyYWdFdmVudC55O1xyXG4gICAgICAgIHNlbGYudHJlZURlc2lnbmVyLmxheW91dC5tb3ZlTm9kZXMoc2VsZi5zZWxlY3RlZE5vZGVzLCBkeCwgZHksIGRyYWdnZWROb2RlKTtcclxuXHJcblxyXG4gICAgICAgIHNlbGYucHJldkRyYWdFdmVudCA9IGV2ZW50O1xyXG4gICAgICAgIHNlbGYudHJlZURlc2lnbmVyLnJlZHJhd0VkZ2VzKCk7XHJcbiAgICAgICAgc2VsZi50cmVlRGVzaWduZXIudXBkYXRlUGxvdHRpbmdSZWdpb25TaXplKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhZ0VuZGVkKGV2ZW50LCBkcmFnZ2VkTm9kZSwgc2VsZil7XHJcbiAgICAgICAgdmFyIG5vZGUgPSBkMy5zZWxlY3QodGhpcykuY2xhc3NlZChcImRyYWdnaW5nXCIsIGZhbHNlKTtcclxuICAgICAgICBpZihzZWxmLmlnbm9yZWREcmFnKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZWxmLnRyZWVEZXNpZ25lci5sYXlvdXQudXBkYXRlKGRyYWdnZWROb2RlKVxyXG4gICAgfVxyXG5cclxuICAgIGNhbmNlbERyYWcoKXtcclxuICAgICAgICB0aGlzLmlnbm9yZURyYWcgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcbiIsInZhciBlcHNpbG9uID0gMWUtMTI7XHJcbnZhciBwaSA9IE1hdGguUEk7XHJcbnZhciBoYWxmUGkgPSBwaSAvIDI7XHJcbnZhciB0YXUgPSAyICogcGk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICAvKmRyYXc6IGZ1bmN0aW9uKGNvbnRleHQsIHNpemUpIHtcclxuICAgICAgICB2YXIgciA9IE1hdGguc3FydChzaXplIC8gcGkpO1xyXG4gICAgICAgIGNvbnRleHQubW92ZVRvKHIsIDApO1xyXG4gICAgICAgIGNvbnRleHQuYXJjKDAsIDAsIHIsIDAsIHRhdSk7XHJcbiAgICB9Ki9cclxuICAgIGRyYXc6IGZ1bmN0aW9uKGNvbnRleHQsIHNpemUpIHtcclxuXHJcbiAgICAgICAgdmFyIHIgPSBNYXRoLnNxcnQoc2l6ZSAvIHBpKTtcclxuICAgICAgICB2YXIgZGlzdCA9MC41NTIyODQ3NDk4MzEgKiByO1xyXG5cclxuICAgICAgICBjb250ZXh0Lm1vdmVUbygtciwgMClcclxuICAgICAgICAvLyBjb250ZXh0LmxpbmVUbygyKnIsIDIqcilcclxuICAgICAgICAvLyBjb250ZXh0LmJlemllckN1cnZlVG8oLXIsIC1kaXN0LCAtZGlzdCwgLXIsIDAsLXIpO1xyXG4gICAgICAgIGNvbnRleHQuYmV6aWVyQ3VydmVUbygtciwgLWRpc3QsIC1kaXN0LCAtciwgMCwtcik7XHJcblxyXG4gICAgICAgIGNvbnRleHQuYmV6aWVyQ3VydmVUbyhkaXN0LCAtciwgciwgLWRpc3QsIHIsMCk7XHJcblxyXG4gICAgICAgIGNvbnRleHQuYmV6aWVyQ3VydmVUbyhyLCBkaXN0LCBkaXN0LCByLCAwLCByKTtcclxuXHJcbiAgICAgICAgY29udGV4dC5iZXppZXJDdXJ2ZVRvKC1kaXN0LCByLCAtciwgZGlzdCwgLXIsIDApO1xyXG4gICAgfVxyXG59O1xyXG4iLCJ2YXIgc3FydDMgPSBNYXRoLnNxcnQoMyk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBkcmF3OiBmdW5jdGlvbihjb250ZXh0LCBzaXplKSB7XHJcbiAgICAgICAgdmFyIHIgPSBNYXRoLnNxcnQoc2l6ZSAvIE1hdGguUEkpO1xyXG4gICAgICAgIGNvbnRleHQubW92ZVRvKC1yLCAwKTtcclxuICAgICAgICBjb250ZXh0LmxpbmVUbygwLjkqciwgLXIpO1xyXG4gICAgICAgIGNvbnRleHQubGluZVRvKDAuOSpyLCByKTtcclxuICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xyXG4gICAgfVxyXG59O1xyXG4iLCJpbXBvcnQge1V0aWxzfSBmcm9tIFwic2QtdXRpbHNcIjtcclxuaW1wb3J0IHtpMThufSBmcm9tICcuL2kxOG4vaTE4bidcclxuXHJcbmV4cG9ydCBjbGFzcyBUZW1wbGF0ZXN7XHJcblxyXG4gICAgc3RhdGljIGdyb3dsID0gcmVxdWlyZSgnLi90ZW1wbGF0ZXMvZ3Jvd2xfbWVzc2FnZS5odG1sJyk7XHJcblxyXG4gICAgc3RhdGljIGdldCh0ZW1wbGF0ZU5hbWUsIHZhcmlhYmxlcyl7XHJcbiAgICAgICAgdmFyIGNvbXBpbGVkID0gVXRpbHMudGVtcGxhdGUoVGVtcGxhdGVzW3RlbXBsYXRlTmFtZV0seyAnaW1wb3J0cyc6IHsgJ2kxOG4nOiBpMThuLCAnVGVtcGxhdGVzJzogVGVtcGxhdGVzLCAnaW5jbHVkZSc6IGZ1bmN0aW9uKG4sIHYpIHtyZXR1cm4gVGVtcGxhdGVzLmdldChuLCB2KX0gfSB9KTtcclxuICAgICAgICBpZih2YXJpYWJsZXMpe1xyXG4gICAgICAgICAgICB2YXJpYWJsZXMudmFyaWFibGVzID0gdmFyaWFibGVzO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB2YXJpYWJsZXMgPSB7dmFyaWFibGVzOnt9fVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY29tcGlsZWQodmFyaWFibGVzKVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgc3R5bGVSdWxlKHNlbGVjdG9yLCBwcm9wcyl7XHJcbiAgICAgICAgdmFyIHMgPSBzZWxlY3RvcisgJ3snO1xyXG4gICAgICAgIHByb3BzLmZvckVhY2gocD0+IHMrPVRlbXBsYXRlcy5zdHlsZVByb3AocFswXSwgcFsxXSkpO1xyXG4gICAgICAgIHMrPSd9ICc7XHJcbiAgICAgICAgcmV0dXJuIHM7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgc3R5bGVQcm9wKHN0eWxlTmFtZSwgdmFyaWFibGVOYW1lKXtcclxuICAgICAgICByZXR1cm4gIHN0eWxlTmFtZSsnOiA8JT0gJyt2YXJpYWJsZU5hbWUrJyAlPjsgJ1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyB0cmVlRGVzaWduZXJTZWxlY3RvciA9ICdzdmcuc2QtdHJlZS1kZXNpZ25lcic7XHJcbiAgICBzdGF0aWMgbm9kZVNlbGVjdG9yKHR5cGUsIGNsYXp6KXtcclxuICAgICAgICB2YXIgcyA9IFRlbXBsYXRlcy50cmVlRGVzaWduZXJTZWxlY3RvcisnIC5ub2RlJztcclxuICAgICAgICBpZih0eXBlKXtcclxuICAgICAgICAgICAgcys9Jy4nK3R5cGUrJy1ub2RlJztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoY2xhenope1xyXG4gICAgICAgICAgICBzKz0nLicrY2xheno7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGVkZ2VTZWxlY3RvcihjbGF6eil7XHJcbiAgICAgICAgdmFyIHMgPSBUZW1wbGF0ZXMudHJlZURlc2lnbmVyU2VsZWN0b3IrJyAuZWRnZSc7XHJcbiAgICAgICAgaWYoY2xhenope1xyXG4gICAgICAgICAgICBzKz0nLicrY2xheno7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyB0cmVlRGVzaWduZXJTdHlsZXMgPVxyXG5cclxuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy50cmVlRGVzaWduZXJTZWxlY3RvcixbXHJcbiAgICAgICAgICAgIFsnZm9udC1zaXplJywgJ2ZvbnRTaXplJ10sXHJcbiAgICAgICAgICAgIFsnZm9udC1mYW1pbHknLCAnZm9udEZhbWlseSddLFxyXG4gICAgICAgICAgICBbJ2ZvbnQtd2VpZ2h0JywgJ2ZvbnRXZWlnaHQnXSxcclxuICAgICAgICAgICAgWydmb250LXN0eWxlJywgJ2ZvbnRTdHlsZSddXHJcbiAgICAgICAgXSkrXHJcbiAgICAgICAgLy8gICBub2RlXHJcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCkrJyBwYXRoJyxbXHJcbiAgICAgICAgICAgIFsnZmlsbCcsICdub2RlLmZpbGwnXSxcclxuICAgICAgICAgICAgWydzdHJva2Utd2lkdGgnLCAnbm9kZS5zdHJva2VXaWR0aCddXHJcbiAgICAgICAgXSkrXHJcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCdkZWNpc2lvbicsICdvcHRpbWFsJykrJyBwYXRoLCAnK1RlbXBsYXRlcy5ub2RlU2VsZWN0b3IoJ2NoYW5jZScsICdvcHRpbWFsJykrJyBwYXRoLCcgK1RlbXBsYXRlcy5ub2RlU2VsZWN0b3IoJ3Rlcm1pbmFsJywgJ29wdGltYWwnKSsnIHBhdGgnLFtcclxuICAgICAgICAgICAgWydzdHJva2UnLCAnbm9kZS5vcHRpbWFsLnN0cm9rZSddLFxyXG4gICAgICAgICAgICBbJ3N0cm9rZS13aWR0aCcsICdub2RlLm9wdGltYWwuc3Ryb2tlV2lkdGgnXVxyXG4gICAgICAgIF0pK1xyXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLm5vZGVTZWxlY3RvcigpKycgLmxhYmVsJyxbXHJcbiAgICAgICAgICAgIFsnZm9udC1zaXplJywgJ25vZGUubGFiZWwuZm9udFNpemUnXSxcclxuICAgICAgICAgICAgWydmaWxsJywgJ25vZGUubGFiZWwuY29sb3InXVxyXG4gICAgICAgIF0pK1xyXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLm5vZGVTZWxlY3RvcigpKycgLnBheW9mZicsW1xyXG4gICAgICAgICAgICBbJ2ZvbnQtc2l6ZScsICdub2RlLnBheW9mZi5mb250U2l6ZSddLFxyXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnbm9kZS5wYXlvZmYuY29sb3InXSxcclxuICAgICAgICBdKStcclxuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5ub2RlU2VsZWN0b3IoKSsnIC5wYXlvZmYubmVnYXRpdmUnLFtcclxuICAgICAgICAgICAgWydmaWxsJywgJ25vZGUucGF5b2ZmLm5lZ2F0aXZlQ29sb3InXSxcclxuICAgICAgICBdKStcclxuXHJcbiAgICAgICAgLy8gICAgZGVjaXNpb24gbm9kZVxyXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLm5vZGVTZWxlY3RvcignZGVjaXNpb24nKSsnIHBhdGgnLFtcclxuICAgICAgICAgICAgWydmaWxsJywgJ25vZGUuZGVjaXNpb24uZmlsbCddLFxyXG4gICAgICAgICAgICBbJ3N0cm9rZScsICdub2RlLmRlY2lzaW9uLnN0cm9rZSddXHJcbiAgICAgICAgXSkrXHJcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCdkZWNpc2lvbicsICdzZWxlY3RlZCcpKycgcGF0aCcsW1xyXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnbm9kZS5kZWNpc2lvbi5zZWxlY3RlZC5maWxsJ11cclxuICAgICAgICBdKStcclxuXHJcbiAgICAgICAgLy8gICAgY2hhbmNlIG5vZGVcclxuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5ub2RlU2VsZWN0b3IoJ2NoYW5jZScpKycgcGF0aCcsW1xyXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnbm9kZS5jaGFuY2UuZmlsbCddLFxyXG4gICAgICAgICAgICBbJ3N0cm9rZScsICdub2RlLmNoYW5jZS5zdHJva2UnXVxyXG4gICAgICAgIF0pK1xyXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLm5vZGVTZWxlY3RvcignY2hhbmNlJywgJ3NlbGVjdGVkJykrJyBwYXRoJyxbXHJcbiAgICAgICAgICAgIFsnZmlsbCcsICdub2RlLmNoYW5jZS5zZWxlY3RlZC5maWxsJ11cclxuICAgICAgICBdKStcclxuXHJcbiAgICAgICAgLy8gICAgdGVybWluYWwgbm9kZVxyXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLm5vZGVTZWxlY3RvcigndGVybWluYWwnKSsnIHBhdGgnLFtcclxuICAgICAgICAgICAgWydmaWxsJywgJ25vZGUudGVybWluYWwuZmlsbCddLFxyXG4gICAgICAgICAgICBbJ3N0cm9rZScsICdub2RlLnRlcm1pbmFsLnN0cm9rZSddXHJcbiAgICAgICAgXSkrXHJcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCd0ZXJtaW5hbCcsICdzZWxlY3RlZCcpKycgcGF0aCcsW1xyXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnbm9kZS50ZXJtaW5hbC5zZWxlY3RlZC5maWxsJ11cclxuICAgICAgICBdKStcclxuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5ub2RlU2VsZWN0b3IoJ3Rlcm1pbmFsJykrJyAuYWdncmVnYXRlZC1wYXlvZmYnLFtcclxuICAgICAgICAgICAgWydmb250LXNpemUnLCAnbm9kZS50ZXJtaW5hbC5wYXlvZmYuZm9udFNpemUnXSxcclxuICAgICAgICAgICAgWydmaWxsJywgJ25vZGUudGVybWluYWwucGF5b2ZmLmNvbG9yJ10sXHJcbiAgICAgICAgXSkrXHJcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCd0ZXJtaW5hbCcpKycgLmFnZ3JlZ2F0ZWQtcGF5b2ZmLm5lZ2F0aXZlJyxbXHJcbiAgICAgICAgICAgIFsnZmlsbCcsICdub2RlLnRlcm1pbmFsLnBheW9mZi5uZWdhdGl2ZUNvbG9yJ10sXHJcbiAgICAgICAgXSkrXHJcblxyXG5cclxuICAgICAgICAvL3Byb2JhYmlsaXR5XHJcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMudHJlZURlc2lnbmVyU2VsZWN0b3IrJyAubm9kZSAucHJvYmFiaWxpdHktdG8tZW50ZXIsICcrVGVtcGxhdGVzLnRyZWVEZXNpZ25lclNlbGVjdG9yKycgLmVkZ2UgLnByb2JhYmlsaXR5JyxbXHJcbiAgICAgICAgICAgIFsnZm9udC1zaXplJywgJ3Byb2JhYmlsaXR5LmZvbnRTaXplJ10sXHJcbiAgICAgICAgICAgIFsnZmlsbCcsICdwcm9iYWJpbGl0eS5jb2xvciddXHJcbiAgICAgICAgXSkrXHJcblxyXG4gICAgICAgIC8vZWRnZVxyXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLmVkZ2VTZWxlY3RvcigpKycgcGF0aCcsW1xyXG4gICAgICAgICAgICBbJ3N0cm9rZScsICdlZGdlLnN0cm9rZSddLFxyXG4gICAgICAgICAgICBbJ3N0cm9rZS13aWR0aCcsICdlZGdlLnN0cm9rZVdpZHRoJ11cclxuICAgICAgICBdKStcclxuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy50cmVlRGVzaWduZXJTZWxlY3RvcisnIG1hcmtlciNhcnJvdyBwYXRoJyxbXHJcbiAgICAgICAgICAgIFsnZmlsbCcsICdlZGdlLnN0cm9rZSddLFxyXG4gICAgICAgIF0pK1xyXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLmVkZ2VTZWxlY3Rvcignb3B0aW1hbCcpKycgcGF0aCcsW1xyXG4gICAgICAgICAgICBbJ3N0cm9rZScsICdlZGdlLm9wdGltYWwuc3Ryb2tlJ10sXHJcbiAgICAgICAgICAgIFsnc3Ryb2tlLXdpZHRoJywgJ2VkZ2Uub3B0aW1hbC5zdHJva2VXaWR0aCddXHJcbiAgICAgICAgXSkrXHJcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMudHJlZURlc2lnbmVyU2VsZWN0b3IrJyBtYXJrZXIjYXJyb3ctb3B0aW1hbCBwYXRoJyxbXHJcbiAgICAgICAgICAgIFsnZmlsbCcsICdlZGdlLm9wdGltYWwuc3Ryb2tlJ10sXHJcbiAgICAgICAgXSkrXHJcblxyXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLmVkZ2VTZWxlY3Rvcignc2VsZWN0ZWQnKSsnIHBhdGgnLFtcclxuICAgICAgICAgICAgWydzdHJva2UnLCAnZWRnZS5zZWxlY3RlZC5zdHJva2UnXSxcclxuICAgICAgICAgICAgWydzdHJva2Utd2lkdGgnLCAnZWRnZS5zZWxlY3RlZC5zdHJva2VXaWR0aCddXHJcbiAgICAgICAgXSkrXHJcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMudHJlZURlc2lnbmVyU2VsZWN0b3IrJyBtYXJrZXIjYXJyb3ctc2VsZWN0ZWQgcGF0aCcsW1xyXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnZWRnZS5zZWxlY3RlZC5zdHJva2UnXSxcclxuICAgICAgICBdKStcclxuXHJcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMuZWRnZVNlbGVjdG9yKCkrJyAubGFiZWwnLFtcclxuICAgICAgICAgICAgWydmb250LXNpemUnLCAnZWRnZS5sYWJlbC5mb250U2l6ZSddLFxyXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnZWRnZS5sYWJlbC5jb2xvciddXHJcbiAgICAgICAgXSkrXHJcblxyXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLmVkZ2VTZWxlY3RvcigpKycgLnBheW9mZicsW1xyXG4gICAgICAgICAgICBbJ2ZvbnQtc2l6ZScsICdlZGdlLnBheW9mZi5mb250U2l6ZSddLFxyXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnZWRnZS5wYXlvZmYuY29sb3InXSxcclxuICAgICAgICBdKStcclxuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5lZGdlU2VsZWN0b3IoKSsnIC5wYXlvZmYubmVnYXRpdmUnLFtcclxuICAgICAgICAgICAgWydmaWxsJywgJ2VkZ2UucGF5b2ZmLm5lZ2F0aXZlQ29sb3InXSxcclxuICAgICAgICBdKStcclxuXHJcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMudHJlZURlc2lnbmVyU2VsZWN0b3IrJyAuc2QtdGl0bGUtY29udGFpbmVyIHRleHQuc2QtdGl0bGUnLFtcclxuICAgICAgICAgICAgWydmb250LXNpemUnLCAndGl0bGUuZm9udFNpemUnXSxcclxuICAgICAgICAgICAgWydmb250LXdlaWdodCcsICd0aXRsZS5mb250V2VpZ2h0J10sXHJcbiAgICAgICAgICAgIFsnZm9udC1zdHlsZScsICd0aXRsZS5mb250U3R5bGUnXSxcclxuICAgICAgICAgICAgWydmaWxsJywgJ3RpdGxlLmNvbG9yJ11cclxuICAgICAgICBdKSArXHJcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMudHJlZURlc2lnbmVyU2VsZWN0b3IrJyAuc2QtdGl0bGUtY29udGFpbmVyIHRleHQuc2QtZGVzY3JpcHRpb24nLFtcclxuICAgICAgICAgICAgWydmb250LXNpemUnLCAnZGVzY3JpcHRpb24uZm9udFNpemUnXSxcclxuICAgICAgICAgICAgWydmb250LXdlaWdodCcsICdkZXNjcmlwdGlvbi5mb250V2VpZ2h0J10sXHJcbiAgICAgICAgICAgIFsnZm9udC1zdHlsZScsICdkZXNjcmlwdGlvbi5mb250U3R5bGUnXSxcclxuICAgICAgICAgICAgWydmaWxsJywgJ2Rlc2NyaXB0aW9uLmNvbG9yJ11cclxuICAgICAgICBdKVxyXG59XHJcblxyXG5cclxuXHJcblxyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwibW9kdWxlLmV4cG9ydHMgPSBcXFwiPGRpdiBjbGFzcz1cXFxcXFxcInNkLWdyb3dsLW1lc3NhZ2UgPCU9dHlwZSU+XFxcXFxcXCI+XFxcXHJcXFxcbiAgICA8ZGl2IGNsYXNzPVxcXFxcXFwic2QtZ3Jvd2wtbWVzc2FnZS10ZXh0XFxcXFxcXCI+XFxcXHJcXFxcbiAgICAgICAgPCU9IG1lc3NhZ2UgJT5cXFxcclxcXFxuICAgIDwvZGl2PlxcXFxyXFxcXG48L2Rpdj5cXFxcclxcXFxuXFxcIjtcXG5cIjtcbiIsImltcG9ydCB7QXBwVXRpbHN9IGZyb20gJy4vYXBwLXV0aWxzJ1xyXG5pbXBvcnQgKiBhcyBkMyBmcm9tICcuL2QzJ1xyXG5pbXBvcnQge0NvbnRleHRNZW51fSBmcm9tICcuL2NvbnRleHQtbWVudS9jb250ZXh0LW1lbnUnXHJcblxyXG5leHBvcnQgY2xhc3MgVGV4dERyYWdIYW5kbGVye1xyXG5cclxuICAgIHRyZWVEZXNpZ25lcjtcclxuICAgIGRhdGE7XHJcbiAgICBjb25maWc7XHJcblxyXG4gICAgZHJhZztcclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IodHJlZURlc2lnbmVyLCBkYXRhKXtcclxuICAgICAgICB0aGlzLnRyZWVEZXNpZ25lciA9IHRyZWVEZXNpZ25lcjtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG5cclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5kcmFnID0gZDMuZHJhZygpXHJcbiAgICAgICAgICAgIC5zdWJqZWN0KGZ1bmN0aW9uKGV2ZW50LCBkKSB7XHJcbiAgICAgICAgICAgICAgICBpZihkPT1udWxsKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeDogZXZlbnQueCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeTogZXZlbnQueVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgdCA9IGQzLnNlbGVjdCh0aGlzKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgeDogdC5hdHRyKFwieFwiKSArIEFwcFV0aWxzLmdldFRyYW5zbGF0aW9uKHQuYXR0cihcInRyYW5zZm9ybVwiKSlbMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgeTogdC5hdHRyKFwieVwiKSArIEFwcFV0aWxzLmdldFRyYW5zbGF0aW9uKHQuYXR0cihcInRyYW5zZm9ybVwiKSlbMV1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5vbihcInN0YXJ0XCIsIGZ1bmN0aW9uKGV2ZW50LCBkKXtcclxuICAgICAgICAgICAgICAgIHNlbGYuZHJhZ1N0YXJ0ZWQuY2FsbCh0aGlzLCBldmVudCwgZCwgc2VsZilcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLm9uKFwiZHJhZ1wiLCBmdW5jdGlvbiAoZXZlbnQsIGQpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYub25EcmFnLmNhbGwodGhpcywgZXZlbnQsIGQsIHNlbGYpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAub24oXCJlbmRcIiwgZnVuY3Rpb24gKGV2ZW50LCBkKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmRyYWdFbmRlZC5jYWxsKHRoaXMsIGV2ZW50LCBkLCBzZWxmKTtcclxuICAgICAgICAgICAgfSlcclxuICAgIH1cclxuXHJcblxyXG4gICAgZHJhZ1N0YXJ0ZWQoZXZlbnQsIGQsc2VsZikge1xyXG4gICAgICAgIC8vIHNlbGYudHJlZURlc2lnbmVyLmxheW91dC5kaXNhYmxlQXV0b0xheW91dCgpO1xyXG4gICAgICAgIENvbnRleHRNZW51LmhpZGUoKTtcclxuICAgICAgICB2YXIgdGV4dCA9IGQzLnNlbGVjdCh0aGlzKTtcclxuICAgICAgICBpZighdGV4dC5jbGFzc2VkKFwic2VsZWN0ZWRcIikpe1xyXG4gICAgICAgICAgICBzZWxmLnRyZWVEZXNpZ25lci5jbGVhclNlbGVjdGlvbigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZi50cmVlRGVzaWduZXIuc2VsZWN0VGV4dChkKTtcclxuICAgICAgICB0ZXh0LmNsYXNzZWQoXCJzZWxlY3RlZCBkcmFnZ2luZ1wiLCB0cnVlKTtcclxuICAgICAgICBzZWxmLnNlbGVjdGVkTm9kZXMgPSBzZWxmLnRyZWVEZXNpZ25lci5nZXRTZWxlY3RlZE5vZGVzKCk7XHJcbiAgICAgICAgc2VsZi5wcmV2RHJhZ0V2ZW50ID0gZXZlbnQ7XHJcbiAgICAgICAgc2VsZi5kcmFnRXZlbnRDb3VudCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgb25EcmFnKGV2ZW50LCBkcmFnZ2VkVGV4dCwgc2VsZil7XHJcbiAgICAgICAgaWYoc2VsZi5kcmFnRXZlbnRDb3VudD09Mil7XHJcbiAgICAgICAgICAgIHNlbGYuZGF0YS5zYXZlU3RhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2VsZi5kcmFnRXZlbnRDb3VudCsrO1xyXG5cclxuICAgICAgICB2YXIgZHggPSBldmVudC54IC0gc2VsZi5wcmV2RHJhZ0V2ZW50Lng7XHJcbiAgICAgICAgdmFyIGR5ID0gZXZlbnQueS0gc2VsZi5wcmV2RHJhZ0V2ZW50Lnk7XHJcblxyXG4gICAgICAgIHNlbGYudHJlZURlc2lnbmVyLmxheW91dC5tb3ZlVGV4dHMoW2RyYWdnZWRUZXh0XSwgZHgsIGR5KTtcclxuXHJcbiAgICAgICAgc2VsZi5wcmV2RHJhZ0V2ZW50ID0gZXZlbnQ7XHJcbiAgICAgICAgc2VsZi50cmVlRGVzaWduZXIudXBkYXRlUGxvdHRpbmdSZWdpb25TaXplKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhZ0VuZGVkKGV2ZW50LCBkcmFnZ2VkTm9kZSwgc2VsZil7XHJcbiAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5jbGFzc2VkKFwiZHJhZ2dpbmdcIiwgZmFsc2UpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcbiIsImltcG9ydCAqIGFzIGQzIGZyb20gJy4vZDMnXHJcbmltcG9ydCB7VXRpbHN9IGZyb20gJ3NkLXV0aWxzJ1xyXG5cclxuZXhwb3J0IGNsYXNzIFRvb2x0aXAge1xyXG4gICAgc3RhdGljIGdldENvbnRhaW5lcigpe1xyXG4gICAgICAgIHJldHVybiBkMy5zZWxlY3QoXCJib2R5XCIpLnNlbGVjdE9yQXBwZW5kKCdkaXYuc2QtdG9vbHRpcCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBzaG93KGh0bWwsIHhPZmZzZXQgPSA1LCB5T2Zmc2V0ID0gMjgsIGV2ZW50LCBkdXJhdGlvbj1udWxsKSB7XHJcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IFRvb2x0aXAuZ2V0Q29udGFpbmVyKClcclxuICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCAwKTtcclxuICAgICAgICBjb250YWluZXIudHJhbnNpdGlvbigpXHJcbiAgICAgICAgICAgIC5kdXJhdGlvbigyMDApXHJcbiAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgLjk4KTtcclxuICAgICAgICBjb250YWluZXIuaHRtbChodG1sKTtcclxuICAgICAgICBUb29sdGlwLnVwZGF0ZVBvc2l0aW9uKHhPZmZzZXQsIHlPZmZzZXQsIGV2ZW50KTtcclxuICAgICAgICBpZihkdXJhdGlvbil7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIFRvb2x0aXAuaGlkZSgpO1xyXG4gICAgICAgICAgICB9LCBkdXJhdGlvbilcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHVwZGF0ZVBvc2l0aW9uKHhPZmZzZXQgPSA1LCB5T2Zmc2V0ID0gMjgsIGV2ZW50KSB7XHJcbiAgICAgICAgVG9vbHRpcC5nZXRDb250YWluZXIoKVxyXG4gICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIChldmVudC5wYWdlWCArIHhPZmZzZXQpICsgXCJweFwiKVxyXG4gICAgICAgICAgICAuc3R5bGUoXCJ0b3BcIiwgKGV2ZW50LnBhZ2VZIC0geU9mZnNldCkgKyBcInB4XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBoaWRlKGR1cmF0aW9uID0gNTAwKSB7XHJcbiAgICAgICAgdmFyIHQgPSBUb29sdGlwLmdldENvbnRhaW5lcigpO1xyXG4gICAgICAgIGlmKGR1cmF0aW9uKXtcclxuICAgICAgICAgICAgdCA9IHQudHJhbnNpdGlvbigpLmR1cmF0aW9uKGR1cmF0aW9uKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0LnN0eWxlKFwib3BhY2l0eVwiLCAwKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgYXR0YWNoKHRhcmdldCwgaHRtbE9yRm4sIHhPZmZzZXQsIHlPZmZzZXQpIHtcclxuICAgICAgICB0YXJnZXQub24oJ21vdXNlb3ZlcicsIGZ1bmN0aW9uIChldmVudCwgZCkge1xyXG4gICAgICAgICAgICBjb25zdCBpID0gdGFyZ2V0Lm5vZGVzKCkuaW5kZXhPZih0aGlzKTtcclxuICAgICAgICAgICAgdmFyIGh0bWwgPSBudWxsO1xyXG4gICAgICAgICAgICBpZiAoVXRpbHMuaXNGdW5jdGlvbihodG1sT3JGbikpIHtcclxuICAgICAgICAgICAgICAgIGh0bWwgPSBodG1sT3JGbihkLCBpKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGh0bWwgPSBodG1sT3JGbjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGh0bWwgIT09IG51bGwgJiYgaHRtbCAhPT0gdW5kZWZpbmVkICYmIGh0bWwgIT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICBUb29sdGlwLnNob3coaHRtbCwgeE9mZnNldCwgeU9mZnNldCwgZXZlbnQpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIFRvb2x0aXAuaGlkZSgwKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KS5vbignbW91c2Vtb3ZlJywgZnVuY3Rpb24gKGV2ZW50LCBkKSB7XHJcbiAgICAgICAgICAgIFRvb2x0aXAudXBkYXRlUG9zaXRpb24oeE9mZnNldCwgeU9mZnNldCwgZXZlbnQpO1xyXG4gICAgICAgIH0pLm9uKFwibW91c2VvdXRcIiwgZnVuY3Rpb24gKGV2ZW50LCBkKSB7XHJcbiAgICAgICAgICAgIFRvb2x0aXAuaGlkZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCAqIGFzIGQzIGZyb20gXCIuL2QzXCI7XHJcbmltcG9ydCB7VXRpbHN9IGZyb20gXCJzZC11dGlsc1wiO1xyXG5pbXBvcnQge0FwcFV0aWxzfSBmcm9tIFwiLi9hcHAtdXRpbHNcIjtcclxuaW1wb3J0IHtkb21haW4gYXMgbW9kZWx9IGZyb20gXCJzZC1tb2RlbFwiO1xyXG5pbXBvcnQge0NvbnRleHRNZW51fSBmcm9tIFwiLi9jb250ZXh0LW1lbnUvY29udGV4dC1tZW51XCI7XHJcbmltcG9ydCB7TWFpbkNvbnRleHRNZW51fSBmcm9tIFwiLi9jb250ZXh0LW1lbnUvbWFpbi1jb250ZXh0LW1lbnVcIjtcclxuaW1wb3J0IHtOb2RlQ29udGV4dE1lbnV9IGZyb20gXCIuL2NvbnRleHQtbWVudS9ub2RlLWNvbnRleHQtbWVudVwiO1xyXG5pbXBvcnQge0xheW91dH0gZnJvbSBcIi4vbGF5b3V0XCI7XHJcbmltcG9ydCB7Tm9kZURyYWdIYW5kbGVyfSBmcm9tIFwiLi9ub2RlLWRyYWctaGFuZGxlclwiO1xyXG5pbXBvcnQge1Rvb2x0aXB9IGZyb20gXCIuL3Rvb2x0aXBcIjtcclxuaW1wb3J0IHtUZW1wbGF0ZXN9IGZyb20gXCIuL3RlbXBsYXRlc1wiO1xyXG5pbXBvcnQge1RleHREcmFnSGFuZGxlcn0gZnJvbSBcIi4vdGV4dC1kcmFnLWhhbmRsZXJcIjtcclxuaW1wb3J0IHtUZXh0Q29udGV4dE1lbnV9IGZyb20gXCIuL2NvbnRleHQtbWVudS90ZXh0LWNvbnRleHQtbWVudVwiO1xyXG5pbXBvcnQge0VkZ2VDb250ZXh0TWVudX0gZnJvbSBcIi4vY29udGV4dC1tZW51L2VkZ2UtY29udGV4dC1tZW51XCI7XHJcbmltcG9ydCAqIGFzIEhhbW1lciBmcm9tIFwiaGFtbWVyanNcIjtcclxuaW1wb3J0IHtpMThufSBmcm9tIFwiLi9pMThuL2kxOG5cIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgVHJlZURlc2lnbmVyQ29uZmlnIHtcclxuICAgIHdpZHRoID0gdW5kZWZpbmVkO1xyXG4gICAgaGVpZ2h0ID0gdW5kZWZpbmVkO1xyXG4gICAgbWFyZ2luID0ge1xyXG4gICAgICAgIGxlZnQ6IDI1LFxyXG4gICAgICAgIHJpZ2h0OiAyNSxcclxuICAgICAgICB0b3A6IDI1LFxyXG4gICAgICAgIGJvdHRvbTogMjVcclxuICAgIH07XHJcbiAgICBzY2FsZSA9IDE7XHJcbiAgICBsbmcgPSAnZW4nO1xyXG4gICAgbGF5b3V0PSB7XHJcbiAgICAgICAgdHlwZTogJ3RyZWUnLFxyXG4gICAgICAgIG5vZGVTaXplOiA0MCxcclxuICAgICAgICBsaW1pdE5vZGVQb3NpdGlvbmluZzogdHJ1ZSxcclxuICAgICAgICBsaW1pdFRleHRQb3NpdGlvbmluZzogdHJ1ZSxcclxuICAgICAgICBncmlkSGVpZ2h0OiA3NSxcclxuICAgICAgICBncmlkV2lkdGg6IDE1MCxcclxuICAgICAgICBlZGdlU2xhbnRXaWR0aE1heDogMjBcclxuICAgIH07XHJcbiAgICBmb250RmFtaWx5ID0gJ3NhbnMtc2VyaWYnO1xyXG4gICAgZm9udFNpemUgPSAnMTJweCc7XHJcbiAgICBmb250V2VpZ2h0ID0gJ25vcm1hbCc7XHJcbiAgICBmb250U3R5bGUgPSAnbm9ybWFsJztcclxuICAgIG5vZGUgPSB7XHJcbiAgICAgICAgc3Ryb2tlV2lkdGg6ICcxcHgnLFxyXG4gICAgICAgIG9wdGltYWw6IHtcclxuICAgICAgICAgICAgc3Ryb2tlOiAnIzAwNmYwMCcsXHJcbiAgICAgICAgICAgIHN0cm9rZVdpZHRoOiAnMS41cHgnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGFiZWw6IHtcclxuICAgICAgICAgICAgZm9udFNpemU6ICcxZW0nLFxyXG4gICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGF5b2ZmOiB7XHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMWVtJyxcclxuICAgICAgICAgICAgY29sb3I6ICdibGFjaycsXHJcbiAgICAgICAgICAgIG5lZ2F0aXZlQ29sb3I6ICcjYjYwMDAwJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGVjaXNpb246IHtcclxuICAgICAgICAgICAgZmlsbDogJyNmZjc3NzcnLFxyXG4gICAgICAgICAgICBzdHJva2U6ICcjNjYwMDAwJyxcclxuXHJcbiAgICAgICAgICAgIHNlbGVjdGVkOiB7XHJcbiAgICAgICAgICAgICAgICBmaWxsOiAnI2FhMzMzMycsXHJcbiAgICAgICAgICAgICAgICAvLyBzdHJva2U6ICcjNjY2NjAwJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjaGFuY2U6IHtcclxuICAgICAgICAgICAgZmlsbDogJyNmZmZmNDQnLFxyXG4gICAgICAgICAgICBzdHJva2U6ICcjNjY2NjAwJyxcclxuXHJcbiAgICAgICAgICAgIHNlbGVjdGVkOiB7XHJcbiAgICAgICAgICAgICAgICBmaWxsOiAnI2FhYWEwMCcsXHJcbiAgICAgICAgICAgICAgICAvLyBzdHJva2U6ICcjNjY2NjAwJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB0ZXJtaW5hbDp7XHJcbiAgICAgICAgICAgIGZpbGw6ICcjNDRmZjQ0JyxcclxuICAgICAgICAgICAgc3Ryb2tlOiAnYmxhY2snLFxyXG4gICAgICAgICAgICBzZWxlY3RlZDoge1xyXG4gICAgICAgICAgICAgICAgZmlsbDogJyMwMGFhMDAnLFxyXG4gICAgICAgICAgICAgICAgLy8gc3Ryb2tlOiAnYmxhY2snXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHBheW9mZjoge1xyXG4gICAgICAgICAgICAgICAgZm9udFNpemU6ICcxZW0nLFxyXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaycsXHJcbiAgICAgICAgICAgICAgICBuZWdhdGl2ZUNvbG9yOiAnI2I2MDAwMCdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgZWRnZT17XHJcbiAgICAgICAgc3Ryb2tlOiAnIzQyNDI0MicsXHJcbiAgICAgICAgc3Ryb2tlV2lkdGg6ICcxLjUnLFxyXG4gICAgICAgIG9wdGltYWw6e1xyXG4gICAgICAgICAgICBzdHJva2U6ICcjMDA2ZjAwJyxcclxuICAgICAgICAgICAgc3Ryb2tlV2lkdGg6ICcyLjQnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2VsZWN0ZWQ6e1xyXG4gICAgICAgICAgICBzdHJva2U6ICcjMDQ1YWQxJyxcclxuICAgICAgICAgICAgc3Ryb2tlV2lkdGg6ICczLjUnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGFiZWw6IHtcclxuICAgICAgICAgICAgZm9udFNpemU6ICcxZW0nLFxyXG4gICAgICAgICAgICBjb2xvcjogJ2JhY2snXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwYXlvZmY6e1xyXG4gICAgICAgICAgICBmb250U2l6ZTogJzFlbScsXHJcbiAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snLFxyXG4gICAgICAgICAgICBuZWdhdGl2ZUNvbG9yOiAnI2I2MDAwMCdcclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuICAgIHByb2JhYmlsaXR5ID0ge1xyXG4gICAgICAgIGZvbnRTaXplOiAnMWVtJyxcclxuICAgICAgICBjb2xvcjogJyMwMDAwZDcnXHJcbiAgICB9O1xyXG4gICAgdGl0bGUgPSB7XHJcbiAgICAgICAgZm9udFNpemU6ICcxNnB4JyxcclxuICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXHJcbiAgICAgICAgZm9udFN0eWxlOiAnbm9ybWFsJyxcclxuICAgICAgICBjb2xvcjogJyMwMDAwMDAnLFxyXG4gICAgICAgIG1hcmdpbjp7XHJcbiAgICAgICAgICAgIHRvcDogMTUsXHJcbiAgICAgICAgICAgIGJvdHRvbTogMTBcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgZGVzY3JpcHRpb24gPSB7XHJcbiAgICAgICAgc2hvdzogdHJ1ZSxcclxuICAgICAgICBmb250U2l6ZTogJzEycHgnLFxyXG4gICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcclxuICAgICAgICBmb250U3R5bGU6ICdub3JtYWwnLFxyXG4gICAgICAgIGNvbG9yOiAnIzAwMDAwMCcsXHJcbiAgICAgICAgbWFyZ2luOntcclxuICAgICAgICAgICAgdG9wOiA1LFxyXG4gICAgICAgICAgICBib3R0b206IDEwXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICByZWFkT25seT0gZmFsc2U7XHJcbiAgICBkaXNhYmxlQW5pbWF0aW9ucz1mYWxzZTtcclxuICAgIGZvcmNlRnVsbEVkZ2VSZWRyYXc9ZmFsc2U7XHJcbiAgICBoaWRlTGFiZWxzPWZhbHNlO1xyXG4gICAgaGlkZVBheW9mZnM9ZmFsc2U7XHJcbiAgICBoaWRlUHJvYmFiaWxpdGllcz1mYWxzZTtcclxuICAgIHJhdz1mYWxzZTtcclxuICAgIHByZXNlcnZlRm9sZGluZ09mTmVzdGVkU3VidHJlZXMgPSB0cnVlO1xyXG5cclxuXHJcbiAgICBwYXlvZmZOdW1iZXJGb3JtYXR0ZXIgPSAodiwgaSk9PiB2O1xyXG4gICAgcHJvYmFiaWxpdHlOdW1iZXJGb3JtYXR0ZXIgID0gKHYpPT4gdjtcclxuXHJcbiAgICBvbk5vZGVTZWxlY3RlZCA9IChub2RlKSA9PiB7fTtcclxuICAgIG9uRWRnZVNlbGVjdGVkID0gKGVkZ2UpID0+IHt9O1xyXG4gICAgb25UZXh0U2VsZWN0ZWQgPSAodGV4dCkgPT4ge307XHJcbiAgICBvblNlbGVjdGlvbkNsZWFyZWQgPSAoKSA9PiB7fTtcclxuXHJcbiAgICBvcGVyYXRpb25zRm9yT2JqZWN0ID0gKG8pID0+IFtdO1xyXG4gICAgcGVyZm9ybU9wZXJhdGlvbiA9IChvYmplY3QsIG9wZXJhdGlvbikgPT4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcblxyXG4gICAgcGF5b2ZmTmFtZXMgPSBbbnVsbCwgbnVsbF07XHJcbiAgICBtYXhQYXlvZmZzVG9EaXNwbGF5ID0gMTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihjdXN0b20pIHtcclxuICAgICAgICBpZiAoY3VzdG9tKSB7XHJcbiAgICAgICAgICAgIFV0aWxzLmRlZXBFeHRlbmQodGhpcywgY3VzdG9tKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgVHJlZURlc2lnbmVyIHtcclxuXHJcbiAgICBjb25maWc7XHJcbiAgICBjb250YWluZXI7XHJcbiAgICBkYXRhOyAvL2RhdGEgbW9kZWwgbWFuYWdlclxyXG4gICAgc3ZnO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbnRhaW5lciwgZGF0YU1vZGVsLCBjb25maWcpe1xyXG4gICAgICAgIHRoaXMuc2V0Q29uZmlnKGNvbmZpZyk7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YU1vZGVsO1xyXG4gICAgICAgIHRoaXMuaW5pdENvbnRhaW5lcihjb250YWluZXIpO1xyXG4gICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldENvbmZpZyhjb25maWcpIHtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IG5ldyBUcmVlRGVzaWduZXJDb25maWcoY29uZmlnKTtcclxuICAgICAgICBpZih0aGlzLmxheW91dCl7XHJcbiAgICAgICAgICAgIHRoaXMubGF5b3V0LmNvbmZpZz10aGlzLmNvbmZpZy5sYXlvdXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudXBkYXRlQ3VzdG9tU3R5bGVzKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdCgpe1xyXG5cclxuICAgICAgICB0aGlzLmluaXRTdmcoKTtcclxuICAgICAgICB0aGlzLmluaXRMYXlvdXQoKTtcclxuICAgICAgICB0aGlzLmluaXRJMThuKCk7XHJcbiAgICAgICAgdGhpcy5pbml0QnJ1c2goKTtcclxuICAgICAgICB0aGlzLmluaXRFZGdlTWFya2VycygpO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZUN1c3RvbVN0eWxlcygpO1xyXG4gICAgICAgIGlmKCF0aGlzLmNvbmZpZy5yZWFkT25seSl7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdE1haW5Db250ZXh0TWVudSgpO1xyXG4gICAgICAgICAgICB0aGlzLmluaXROb2RlQ29udGV4dE1lbnUoKTtcclxuICAgICAgICAgICAgdGhpcy5pbml0RWRnZUNvbnRleHRNZW51KCk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdE5vZGVEcmFnSGFuZGxlcigpO1xyXG4gICAgICAgICAgICB0aGlzLmluaXRUZXh0RHJhZ0hhbmRsZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5pbml0VGV4dENvbnRleHRNZW51KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVkcmF3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdEkxOG4oKSB7XHJcbiAgICAgICAgaTE4bi5pbml0KHRoaXMuY29uZmlnLmxuZyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHVwZGF0ZUN1c3RvbVN0eWxlcygpe1xyXG4gICAgICAgIGQzLnNlbGVjdCgnaGVhZCcpLnNlbGVjdE9yQXBwZW5kKCdzdHlsZSNzZC10cmVlLWRlc2lnbmVyLXN0eWxlJykuaHRtbChUZW1wbGF0ZXMuZ2V0KCd0cmVlRGVzaWduZXJTdHlsZXMnLCB0aGlzLmNvbmZpZykpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRMYXlvdXQoKXtcclxuICAgICAgICB0aGlzLmxheW91dCA9IG5ldyBMYXlvdXQodGhpcywgdGhpcy5kYXRhLCB0aGlzLmNvbmZpZy5sYXlvdXQpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXROb2RlRHJhZ0hhbmRsZXIoKXtcclxuICAgICAgICB0aGlzLm5vZGVEcmFnSGFuZGxlciA9IG5ldyBOb2RlRHJhZ0hhbmRsZXIodGhpcywgdGhpcy5kYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0VGV4dERyYWdIYW5kbGVyKCl7XHJcbiAgICAgICAgdGhpcy50ZXh0RHJhZ0hhbmRsZXIgPSBuZXcgVGV4dERyYWdIYW5kbGVyKHRoaXMsIHRoaXMuZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVkcmF3KHdpdGhUcmFuc2l0aW9ucz1mYWxzZSl7XHJcblxyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICB3aXRoVHJhbnNpdGlvbnMgPSAhc2VsZi5jb25maWcuZGlzYWJsZUFuaW1hdGlvbnMgJiYgd2l0aFRyYW5zaXRpb25zO1xyXG4gICAgICAgIHRoaXMucmVkcmF3RGlhZ3JhbVRpdGxlKCk7XHJcbiAgICAgICAgdGhpcy5yZWRyYXdEaWFncmFtRGVzY3JpcHRpb24oKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNjYWxlKHdpdGhUcmFuc2l0aW9ucyk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVNYXJnaW4od2l0aFRyYW5zaXRpb25zKTtcclxuICAgICAgICBpZih3aXRoVHJhbnNpdGlvbnMpe1xyXG4gICAgICAgICAgICBzZWxmLnRyYW5zaXRpb25QcmV2ID0gc2VsZi50cmFuc2l0aW9uO1xyXG4gICAgICAgICAgICBzZWxmLnRyYW5zaXRpb24gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlZHJhd05vZGVzKCk7XHJcbiAgICAgICAgdGhpcy5yZWRyYXdFZGdlcygpO1xyXG4gICAgICAgIHRoaXMucmVkcmF3RmxvYXRpbmdUZXh0cygpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlVmFsaWRhdGlvbk1lc3NhZ2VzKCk7XHJcbiAgICAgICAgaWYod2l0aFRyYW5zaXRpb25zKXtcclxuICAgICAgICAgICAgc2VsZi50cmFuc2l0aW9uID0gIHNlbGYudHJhbnNpdGlvblByZXY7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgc2VsZi51cGRhdGVQbG90dGluZ1JlZ2lvblNpemUoKTtcclxuICAgICAgICB9LDEwKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcHV0ZUF2YWlsYWJsZVNwYWNlKCl7XHJcbiAgICAgICAgdGhpcy5hdmFpbGFibGVIZWlnaHQgPSBBcHBVdGlscy5zYW5pdGl6ZUhlaWdodCh0aGlzLmNvbmZpZy5oZWlnaHQsIHRoaXMuY29udGFpbmVyLCB0aGlzLmNvbmZpZy5tYXJnaW4pO1xyXG4gICAgICAgIHRoaXMuYXZhaWxhYmxlV2lkdGggPSBBcHBVdGlscy5zYW5pdGl6ZVdpZHRoKHRoaXMuY29uZmlnLndpZHRoLCB0aGlzLmNvbnRhaW5lciwgdGhpcy5jb25maWcubWFyZ2luKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0U3ZnKCkge1xyXG4gICAgICAgIHZhciBjID0gdGhpcztcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5jb21wdXRlQXZhaWxhYmxlU3BhY2UoKTtcclxuICAgICAgICB0aGlzLnN2ZyA9IHRoaXMuY29udGFpbmVyLnNlbGVjdE9yQXBwZW5kKCdzdmcuc2QtdHJlZS1kZXNpZ25lcicpO1xyXG4gICAgICAgIHRoaXMuc3ZnLmF0dHIoJ3dpZHRoJywgdGhpcy5hdmFpbGFibGVXaWR0aCkuYXR0cignaGVpZ2h0JywgdGhpcy5hdmFpbGFibGVIZWlnaHQpO1xyXG5cclxuICAgICAgICB0aGlzLndyYXBwZXJHcm91cCA9IHRoaXMuc3ZnLnNlbGVjdE9yQXBwZW5kKCdnLnNkLXdyYXBwZXItZ3JvdXAnKTtcclxuICAgICAgICB0aGlzLm1haW5Hcm91cCA9IHRoaXMud3JhcHBlckdyb3VwLnNlbGVjdE9yQXBwZW5kKCdnLm1haW4tZ3JvdXAnKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNjYWxlKCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVNYXJnaW4oKTtcclxuXHJcblxyXG4gICAgICAgIGlmICghdGhpcy5jb25maWcud2lkdGgpIHtcclxuICAgICAgICAgICAgZDMuc2VsZWN0KHdpbmRvdylcclxuICAgICAgICAgICAgICAgIC5vbihcInJlc2l6ZS50cmVlLWRlc2lnbmVyXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnVwZGF0ZVBsb3R0aW5nUmVnaW9uU2l6ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYucmVkcmF3RGlhZ3JhbVRpdGxlKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBtYyA9IG5ldyBIYW1tZXIuTWFuYWdlcih0aGlzLnN2Zy5ub2RlKCksIHt0b3VjaEFjdGlvbiA6ICdhdXRvJ30pO1xyXG4gICAgICAgIG1jLmFkZChuZXcgSGFtbWVyLlByZXNzKHtcclxuICAgICAgICAgICAgcG9pbnRlclR5cGU6ICd0b3VjaCdcclxuICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIG1jLmFkZChuZXcgSGFtbWVyLlBpbmNoKHtcclxuICAgICAgICAgICAgcG9pbnRlclR5cGU6ICd0b3VjaCdcclxuICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIHZhciBjYW5jZWw7XHJcbiAgICAgICAgbWMub24oJ3BpbmNoc3RhcnQnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBzZWxmLmRpc2FibGVCcnVzaCgpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgbWMub24oJ3BpbmNoJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgY2FuY2VsID0gVXRpbHMud2FpdEZvckZpbmFsRXZlbnQoKCk9PnNlbGYuZW5hYmxlQnJ1c2goKSwgJ3BpbmNoZW5kJywgNTAwMClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZU1hcmdpbih3aXRoVHJhbnNpdGlvbnMpe1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICB2YXIgbWFyZ2luID0gdGhpcy5jb25maWcubWFyZ2luO1xyXG4gICAgICAgIHZhciBncm91cCA9IHRoaXMubWFpbkdyb3VwO1xyXG4gICAgICAgIGlmKHdpdGhUcmFuc2l0aW9ucyl7XHJcbiAgICAgICAgICAgIGdyb3VwID0gZ3JvdXAudHJhbnNpdGlvbigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy50b3BNYXJnaW4gPSBtYXJnaW4udG9wO1xyXG4gICAgICAgIGlmKHRoaXMuZGlhZ3JhbVRpdGxlfHx0aGlzLmRpYWdyYW1EZXNjcmlwdGlvbil7XHJcbiAgICAgICAgICAgIHRoaXMudG9wTWFyZ2luID0gcGFyc2VJbnQodGhpcy5kaWFncmFtVGl0bGUgPyB0aGlzLmNvbmZpZy50aXRsZS5tYXJnaW4udG9wIDogMCkgKyB0aGlzLmdldFRpdGxlR3JvdXBIZWlnaHQoKVxyXG4gICAgICAgICAgICAgICAgKyAgTWF0aC5tYXgodGhpcy50b3BNYXJnaW4sIHBhcnNlSW50KHRoaXMuY29uZmlnLnRpdGxlLm1hcmdpbi5ib3R0b20pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdyb3VwLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoXCIgKyBtYXJnaW4ubGVmdCArIFwiLFwiICsgdGhpcy50b3BNYXJnaW4gKyBcIilcIikub24oXCJlbmRcIiwgKCk9PiBzZWxmLnVwZGF0ZVBsb3R0aW5nUmVnaW9uU2l6ZSgpKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRNYXJnaW4obWFyZ2luLCB3aXRob3V0U3RhdGVTYXZpbmcpe1xyXG4gICAgICAgIHZhciBzZWxmPXRoaXM7XHJcbiAgICAgICAgaWYoIXdpdGhvdXRTdGF0ZVNhdmluZyl7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgZGF0YTp7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luOiBVdGlscy5jbG9uZShzZWxmLmNvbmZpZy5tYXJnaW4pXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgb25VbmRvOiAoZGF0YSk9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRNYXJnaW4oZGF0YS5tYXJnaW4sIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG9uUmVkbzogKGRhdGEpPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0TWFyZ2luKG1hcmdpbiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBVdGlscy5kZWVwRXh0ZW5kKHRoaXMuY29uZmlnLm1hcmdpbiwgbWFyZ2luKTtcclxuICAgICAgICB0aGlzLnJlZHJhd0RpYWdyYW1UaXRsZSgpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlTWFyZ2luKHRydWUpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICB1cGRhdGVTY2FsZSh3aXRoVHJhbnNpdGlvbnMpe1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICB2YXIgc2NhbGUgPSB0aGlzLmNvbmZpZy5zY2FsZTtcclxuICAgICAgICB2YXIgZ3JvdXAgPSB0aGlzLndyYXBwZXJHcm91cDtcclxuICAgICAgICBpZih3aXRoVHJhbnNpdGlvbnMpe1xyXG4gICAgICAgICAgICBncm91cCA9IGdyb3VwLnRyYW5zaXRpb24oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdyb3VwLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJzY2FsZShcIiArIHNjYWxlICsgXCIpXCIpLm9uKFwiZW5kXCIsICgpPT4gc2VsZi51cGRhdGVQbG90dGluZ1JlZ2lvblNpemUoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U2NhbGUoc2NhbGUsIHdpdGhvdXRTdGF0ZVNhdmluZyl7XHJcbiAgICAgICAgdmFyIHNlbGY9dGhpcztcclxuICAgICAgICBpZighd2l0aG91dFN0YXRlU2F2aW5nKXtcclxuICAgICAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBkYXRhOntcclxuICAgICAgICAgICAgICAgICAgICBzY2FsZTogVXRpbHMuY2xvbmUoc2VsZi5jb25maWcuc2NhbGUpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgb25VbmRvOiAoZGF0YSk9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRTY2FsZShkYXRhLnNjYWxlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBvblJlZG86IChkYXRhKT0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldFNjYWxlKHNjYWxlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY29uZmlnLnNjYWxlID0gc2NhbGU7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTY2FsZSh0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0Q29udGFpbmVyKGNvbnRhaW5lcklkT3JFbGVtKSB7XHJcbiAgICAgICAgaWYgKFV0aWxzLmlzU3RyaW5nKGNvbnRhaW5lcklkT3JFbGVtKSkge1xyXG4gICAgICAgICAgICB2YXIgc2VsZWN0b3IgPSBjb250YWluZXJJZE9yRWxlbS50cmltKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIVV0aWxzLnN0YXJ0c1dpdGgoc2VsZWN0b3IsICcjJykgJiYgIVV0aWxzLnN0YXJ0c1dpdGgoc2VsZWN0b3IsICcuJykpIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdG9yID0gJyMnICsgc2VsZWN0b3I7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIgPSBkMy5zZWxlY3Qoc2VsZWN0b3IpO1xyXG4gICAgICAgIH0gZWxzZSBpZihjb250YWluZXJJZE9yRWxlbS5fcGFyZW50cyl7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVySWRPckVsZW1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIgPSBkMy5zZWxlY3QoY29udGFpbmVySWRPckVsZW0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVQbG90dGluZ1JlZ2lvblNpemUoKSB7XHJcbiAgICAgICAgdmFyIGNoYW5nZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNvbXB1dGVBdmFpbGFibGVTcGFjZSgpO1xyXG4gICAgICAgIHZhciBtYXJnaW4gPSB0aGlzLmNvbmZpZy5tYXJnaW47XHJcbiAgICAgICAgdmFyIHN2Z1dpZHRoID0gdGhpcy5zdmcuYXR0cignd2lkdGgnKTtcclxuICAgICAgICB2YXIgc3ZnSGVpZ2h0ID0gdGhpcy5zdmcuYXR0cignaGVpZ2h0Jyk7XHJcbiAgICAgICAgdmFyIG1haW5Hcm91cEJveCA9IHRoaXMubWFpbkdyb3VwLm5vZGUoKS5nZXRCQm94KCk7XHJcbiAgICAgICAgbGV0IGJveFdpZHRoID0gbWFpbkdyb3VwQm94LndpZHRoO1xyXG4gICAgICAgIHZhciBuZXdTdmdXaWR0aCA9IGJveFdpZHRoK21haW5Hcm91cEJveC54K21hcmdpbi5sZWZ0K21hcmdpbi5yaWdodDtcclxuICAgICAgICBuZXdTdmdXaWR0aCAgKj0gdGhpcy5jb25maWcuc2NhbGU7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIuY2xhc3NlZCgnd2l0aC1vdmVyZmxvdy14JywgbmV3U3ZnV2lkdGg+PXRoaXMuYXZhaWxhYmxlV2lkdGgpO1xyXG4gICAgICAgIG5ld1N2Z1dpZHRoID0gTWF0aC5tYXgobmV3U3ZnV2lkdGgsIHRoaXMuYXZhaWxhYmxlV2lkdGgpO1xyXG4gICAgICAgIGlmKHN2Z1dpZHRoIT1uZXdTdmdXaWR0aCl7XHJcbiAgICAgICAgICAgIGNoYW5nZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnN2Zy5hdHRyKCd3aWR0aCcsIG5ld1N2Z1dpZHRoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGJveEhlaWdodCA9IG1haW5Hcm91cEJveC5oZWlnaHQ7XHJcbiAgICAgICAgdmFyIG5ld1N2Z0hlaWdodCA9IGJveEhlaWdodCttYWluR3JvdXBCb3gueSt0aGlzLnRvcE1hcmdpbittYXJnaW4uYm90dG9tO1xyXG4gICAgICAgIG5ld1N2Z0hlaWdodCAqPSB0aGlzLmNvbmZpZy5zY2FsZTtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5jbGFzc2VkKCd3aXRoLW92ZXJmbG93LXknLCBuZXdTdmdIZWlnaHQ+PXRoaXMuYXZhaWxhYmxlSGVpZ2h0KTtcclxuICAgICAgICBuZXdTdmdIZWlnaHQgPSBNYXRoLm1heChuZXdTdmdIZWlnaHQsIHRoaXMuYXZhaWxhYmxlSGVpZ2h0KTtcclxuICAgICAgICBpZihzdmdIZWlnaHQhPW5ld1N2Z0hlaWdodCl7XHJcbiAgICAgICAgICAgIGNoYW5nZWQ9dHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5zdmcuYXR0cignaGVpZ2h0JywgbmV3U3ZnSGVpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoY2hhbmdlZCl7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQnJ1c2hFeHRlbnQoKVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJlZHJhd05vZGVzKCkge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcblxyXG4gICAgICAgIHZhciBub2Rlc0NvbnRhaW5lciA9IHRoaXMubWFpbkdyb3VwLnNlbGVjdE9yQXBwZW5kKCdnLm5vZGVzJyk7XHJcbiAgICAgICAgdmFyIG5vZGVzID0gbm9kZXNDb250YWluZXIuc2VsZWN0QWxsKCcubm9kZScpLmRhdGEodGhpcy5kYXRhLm5vZGVzLmZpbHRlcihkPT4hZC4kaGlkZGVuKSwgKGQsaSk9PiBkLmlkKTtcclxuICAgICAgICBub2Rlcy5leGl0KCkucmVtb3ZlKCk7XHJcbiAgICAgICAgdmFyIG5vZGVzRW50ZXIgPSBub2Rlcy5lbnRlcigpLmFwcGVuZCgnZycpXHJcbiAgICAgICAgICAgIC5hdHRyKCdpZCcsIGQ9Pidub2RlLScrZC5pZClcclxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgZD0+ZC50eXBlKyctbm9kZSBub2RlJylcclxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGQ9Pid0cmFuc2xhdGUoJyArIGQubG9jYXRpb24ueCArICcgICcgKyBkLmxvY2F0aW9uLnkgKyAnKScpO1xyXG4gICAgICAgIG5vZGVzRW50ZXIuYXBwZW5kKCdwYXRoJyk7XHJcblxyXG4gICAgICAgIHZhciBsYWJlbEVudGVyID0gbm9kZXNFbnRlci5hcHBlbmQoJ3RleHQnKS5hdHRyKCdjbGFzcycsICdsYWJlbCcpO1xyXG4gICAgICAgIHZhciBwYXlvZmZFbnRlciA9IG5vZGVzRW50ZXIuYXBwZW5kKCd0ZXh0JykuYXR0cignY2xhc3MnLCAncGF5b2ZmIGNvbXB1dGVkJyk7XHJcbiAgICAgICAgdmFyIGluZGljYXRvckVudGVyID0gbm9kZXNFbnRlci5hcHBlbmQoJ3RleHQnKS5hdHRyKCdjbGFzcycsICdlcnJvci1pbmRpY2F0b3InKS50ZXh0KCchIScpO1xyXG4gICAgICAgIHZhciBhZ2dyZWdhdGVkUGF5b2ZmRW50ZXIgPSBub2Rlc0VudGVyLmFwcGVuZCgndGV4dCcpLmF0dHIoJ2NsYXNzJywgJ2FnZ3JlZ2F0ZWQtcGF5b2ZmJyk7XHJcbiAgICAgICAgdmFyIHByb2JhYmlsaXR5VG9FbnRlckVudGVyID0gbm9kZXNFbnRlci5hcHBlbmQoJ3RleHQnKS5hdHRyKCdjbGFzcycsICdwcm9iYWJpbGl0eS10by1lbnRlcicpO1xyXG5cclxuICAgICAgICB2YXIgbm9kZXNNZXJnZSA9IG5vZGVzRW50ZXIubWVyZ2Uobm9kZXMpO1xyXG4gICAgICAgIG5vZGVzTWVyZ2UuY2xhc3NlZCgnb3B0aW1hbCcsIChkKT0+c2VsZi5pc09wdGltYWwoZCkpO1xyXG5cclxuICAgICAgICB2YXIgbm9kZXNNZXJnZVQgPSBub2Rlc01lcmdlO1xyXG4gICAgICAgIGlmKHRoaXMudHJhbnNpdGlvbil7XHJcbiAgICAgICAgICAgIG5vZGVzTWVyZ2VUID0gbm9kZXNNZXJnZS50cmFuc2l0aW9uKCk7XHJcbiAgICAgICAgICAgIG5vZGVzTWVyZ2VULm9uKCdlbmQnLCAoKT0+IHNlbGYudXBkYXRlUGxvdHRpbmdSZWdpb25TaXplKCkpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5vZGVzTWVyZ2VUXHJcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBkPT4ndHJhbnNsYXRlKCcgKyBkLmxvY2F0aW9uLnggKyAnICAnICsgZC5sb2NhdGlvbi55ICsgJyknKVxyXG5cclxuICAgICAgICB2YXIgcGF0aCA9IG5vZGVzTWVyZ2Uuc2VsZWN0KCdwYXRoJyk7XHJcbiAgICAgICAgdGhpcy5sYXlvdXQuZHJhd05vZGVTeW1ib2wocGF0aCx0aGlzLnRyYW5zaXRpb24pO1xyXG5cclxuICAgICAgICAvKnBhdGhcclxuICAgICAgICAgICAgLnN0eWxlKCdmaWxsJywgZD0+IHtcclxuICAgICAgICAgICAgICAgIC8vIGlmKHNlbGYuaXNOb2RlU2VsZWN0ZWQoZCkpe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIHJldHVybiBzZWxmLmNvbmZpZy5ub2RlW2QudHlwZV0uc2VsZWN0ZWQuZmlsbFxyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYuY29uZmlnLm5vZGVbZC50eXBlXS5maWxsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlJywgZD0+IHNlbGYuY29uZmlnLm5vZGVbZC50eXBlXS5zdHJva2UpXHJcbiAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlLXdpZHRoJywgZD0+IHtcclxuICAgICAgICAgICAgICAgIGlmKHNlbGYuY29uZmlnLm5vZGVbZC50eXBlXS5zdHJva2VXaWR0aCE9PXVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYuY29uZmlnLm5vZGVbZC50eXBlXS5zdHJva2VXaWR0aDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLmNvbmZpZy5ub2RlLnN0cm9rZVdpZHRoO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMubGF5b3V0Lm5vZGVMYWJlbFBvc2l0aW9uKGxhYmVsRW50ZXIpO1xyXG4gICAgICAgIHZhciBsYWJlbE1lcmdlID0gbm9kZXNNZXJnZS5zZWxlY3QoJ3RleHQubGFiZWwnKTtcclxuICAgICAgICBsYWJlbE1lcmdlLmNsYXNzZWQoJ3NkLWhpZGRlbicsIHRoaXMuY29uZmlnLmhpZGVMYWJlbHMpO1xyXG4gICAgICAgIHZhciBsYWJlbE1lcmdlVCA9IG5vZGVzTWVyZ2VULnNlbGVjdCgndGV4dC5sYWJlbCcpO1xyXG4gICAgICAgIGxhYmVsTWVyZ2VULmVhY2godGhpcy51cGRhdGVUZXh0TGluZXMpO1xyXG4gICAgICAgIHRoaXMubGF5b3V0Lm5vZGVMYWJlbFBvc2l0aW9uKGxhYmVsTWVyZ2VUKVxyXG4gICAgICAgICAgICAuYXR0cigndGV4dC1hbmNob3InLCAnbWlkZGxlJylcclxuXHJcbiAgICAgICAgdmFyIHBheW9mZiA9IG5vZGVzTWVyZ2Uuc2VsZWN0KCd0ZXh0LnBheW9mZicpO1xyXG5cclxuICAgICAgICB2YXIgcGF5b2ZmVHNwYW5zID0gcGF5b2ZmLnNlbGVjdEFsbCgndHNwYW4nKS5kYXRhKGQ9PntcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBkLmRpc3BsYXlWYWx1ZSgnY2hpbGRyZW5QYXlvZmYnKTtcclxuICAgICAgICAgICAgcmV0dXJuIFV0aWxzLmlzQXJyYXkoaXRlbSkgPyBpdGVtLmZpbHRlcihpPT5pICE9PSB1bmRlZmluZWQpIDogW2l0ZW1dXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcGF5b2ZmVHNwYW5zLmV4aXQoKS5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgdmFyIHBheW9mZlRzcGFuc00gPSBwYXlvZmZUc3BhbnMuZW50ZXIoKS5hcHBlbmQoJ3RzcGFuJykubWVyZ2UocGF5b2ZmVHNwYW5zKTtcclxuICAgICAgICBwYXlvZmZUc3BhbnNNXHJcbiAgICAgICAgICAgIC8vIC5hdHRyKCdkb21pbmFudC1iYXNlbGluZScsICdoYW5naW5nJylcclxuICAgICAgICAgICAgLmF0dHIoJ2R5JywgKGQsaSk9Pmk+MCA/ICcxLjFlbSc6IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgLmF0dHIoJ3gnLCAnMCcpXHJcbiAgICAgICAgICAgIC5jbGFzc2VkKCduZWdhdGl2ZScsIGQ9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZCE9PW51bGwgJiYgZDwwO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2xhc3NlZCgnc2QtaGlkZGVuJywgdGhpcy5jb25maWcuaGlkZVBheW9mZnMgfHwgdGhpcy5jb25maWcucmF3KVxyXG4gICAgICAgICAgICAudGV4dCgoZCwgaSk9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmFsID0gZFxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWwhPT1udWxsID8gKGlzTmFOKHZhbCkgPyB2YWwgOiBzZWxmLmNvbmZpZy5wYXlvZmZOdW1iZXJGb3JtYXR0ZXIodmFsLCBpKSk6ICcnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuYXR0YWNoUGF5b2ZmVG9vbHRpcChwYXlvZmZUc3BhbnNNKTtcclxuXHJcblxyXG4gICAgICAgIHZhciBwYXlvZmZUID0gcGF5b2ZmO1xyXG4gICAgICAgIGlmKHRoaXMudHJhbnNpdGlvbil7XHJcbiAgICAgICAgICAgIHBheW9mZlQgPSBwYXlvZmYudHJhbnNpdGlvbigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5sYXlvdXQubm9kZVBheW9mZlBvc2l0aW9uKHBheW9mZkVudGVyKTtcclxuICAgICAgICB0aGlzLmxheW91dC5ub2RlUGF5b2ZmUG9zaXRpb24ocGF5b2ZmVCk7XHJcblxyXG4gICAgICAgIHZhciBhZ2dyZWdhdGVkUGF5b2ZmID0gbm9kZXNNZXJnZS5zZWxlY3QoJ3RleHQuYWdncmVnYXRlZC1wYXlvZmYnKTtcclxuICAgICAgICB2YXIgYWdncmVnYXRlZFBheW9mZlRzcGFucyA9IGFnZ3JlZ2F0ZWRQYXlvZmYuc2VsZWN0QWxsKCd0c3BhbicpLmRhdGEoZD0+e1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IGQuZGlzcGxheVZhbHVlKCdhZ2dyZWdhdGVkUGF5b2ZmJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBVdGlscy5pc0FycmF5KGl0ZW0pID8gaXRlbS5maWx0ZXIoaT0+aSAhPT0gdW5kZWZpbmVkKSA6IFtpdGVtXVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGFnZ3JlZ2F0ZWRQYXlvZmZUc3BhbnMuZXhpdCgpLnJlbW92ZSgpO1xyXG4gICAgICAgIHZhciBhZ2dyZWdhdGVkUGF5b2ZmVHNwYW5zTSA9IGFnZ3JlZ2F0ZWRQYXlvZmZUc3BhbnMuZW50ZXIoKS5hcHBlbmQoJ3RzcGFuJykubWVyZ2UoYWdncmVnYXRlZFBheW9mZlRzcGFucylcclxuICAgICAgICAgICAgLmF0dHIoJ2R5JywgKGQsaSk9Pmk+MCA/ICcwLjk1ZW0nOiB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIC5jbGFzc2VkKCduZWdhdGl2ZScsIGQ9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZCE9PW51bGwgJiYgZDwwO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2xhc3NlZCgnc2QtaGlkZGVuJywgdGhpcy5jb25maWcuaGlkZVBheW9mZnMgfHwgdGhpcy5jb25maWcucmF3KVxyXG4gICAgICAgICAgICAudGV4dCgodmFsLCBpKT0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWwhPT1udWxsID8gKGlzTmFOKHZhbCkgPyB2YWwgOiBzZWxmLmNvbmZpZy5wYXlvZmZOdW1iZXJGb3JtYXR0ZXIodmFsLCBpKSk6ICcnXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmF0dGFjaFBheW9mZlRvb2x0aXAoYWdncmVnYXRlZFBheW9mZlRzcGFuc00sICdhZ2dyZWdhdGVkUGF5b2ZmJyk7XHJcblxyXG4gICAgICAgIHZhciBhZ2dyZWdhdGVkUGF5b2ZmVCA9IGFnZ3JlZ2F0ZWRQYXlvZmY7XHJcbiAgICAgICAgaWYodGhpcy50cmFuc2l0aW9uKXtcclxuICAgICAgICAgICAgYWdncmVnYXRlZFBheW9mZlQgPSBhZ2dyZWdhdGVkUGF5b2ZmLnRyYW5zaXRpb24oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubGF5b3V0Lm5vZGVBZ2dyZWdhdGVkUGF5b2ZmUG9zaXRpb24oYWdncmVnYXRlZFBheW9mZkVudGVyKTtcclxuICAgICAgICB0aGlzLmxheW91dC5ub2RlQWdncmVnYXRlZFBheW9mZlBvc2l0aW9uKGFnZ3JlZ2F0ZWRQYXlvZmZUKTtcclxuXHJcbiAgICAgICAgdmFyIHByb2JhYmlsaXR5VG9FbnRlciA9IG5vZGVzTWVyZ2Uuc2VsZWN0KCd0ZXh0LnByb2JhYmlsaXR5LXRvLWVudGVyJylcclxuICAgICAgICAgICAgLnRleHQoZD0+e1xyXG4gICAgICAgICAgICAgICAgdmFyIHZhbCA9IGQuZGlzcGxheVZhbHVlKCdwcm9iYWJpbGl0eVRvRW50ZXInKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWwhPT1udWxsID8gKGlzTmFOKHZhbCkgPyB2YWwgOiBzZWxmLmNvbmZpZy5wcm9iYWJpbGl0eU51bWJlckZvcm1hdHRlcih2YWwpKTogJydcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNsYXNzZWQoJ3NkLWhpZGRlbicsIHRoaXMuY29uZmlnLmhpZGVQcm9iYWJpbGl0aWVzIHx8IHRoaXMuY29uZmlnLnJhdyk7XHJcbiAgICAgICAgVG9vbHRpcC5hdHRhY2gocHJvYmFiaWxpdHlUb0VudGVyLCBpMThuLnQoJ3Rvb2x0aXAubm9kZS5wcm9iYWJpbGl0eVRvRW50ZXInKSk7XHJcblxyXG5cclxuICAgICAgICB2YXIgcHJvYmFiaWxpdHlUb0VudGVyVCA9IHByb2JhYmlsaXR5VG9FbnRlcjtcclxuICAgICAgICBpZih0aGlzLnRyYW5zaXRpb24pe1xyXG4gICAgICAgICAgICBwcm9iYWJpbGl0eVRvRW50ZXJUID0gcHJvYmFiaWxpdHlUb0VudGVyLnRyYW5zaXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sYXlvdXQubm9kZVByb2JhYmlsaXR5VG9FbnRlclBvc2l0aW9uKHByb2JhYmlsaXR5VG9FbnRlckVudGVyKTtcclxuICAgICAgICB0aGlzLmxheW91dC5ub2RlUHJvYmFiaWxpdHlUb0VudGVyUG9zaXRpb24ocHJvYmFiaWxpdHlUb0VudGVyVCk7XHJcblxyXG5cclxuICAgICAgICB2YXIgaW5kaWNhdG9yID0gbm9kZXNNZXJnZS5zZWxlY3QoJ3RleHQuZXJyb3ItaW5kaWNhdG9yJyk7XHJcbiAgICAgICAgaW5kaWNhdG9yLmNsYXNzZWQoJ3NkLWhpZGRlbicsIHRoaXMuY29uZmlnLnJhdylcclxuICAgICAgICB0aGlzLmxheW91dC5ub2RlSW5kaWNhdG9yUG9zaXRpb24oaW5kaWNhdG9yRW50ZXIpO1xyXG4gICAgICAgIHRoaXMubGF5b3V0Lm5vZGVJbmRpY2F0b3JQb3NpdGlvbihpbmRpY2F0b3IpO1xyXG5cclxuICAgICAgICBpZih0aGlzLm5vZGVEcmFnSGFuZGxlcil7XHJcbiAgICAgICAgICAgIG5vZGVzTWVyZ2UuY2FsbCh0aGlzLm5vZGVEcmFnSGFuZGxlci5kcmFnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG5vZGVzTWVyZ2Uub24oJ2NvbnRleHRtZW51JywgdGhpcy5ub2RlQ29udGV4dE1lbnUpO1xyXG4gICAgICAgIG5vZGVzTWVyZ2Uub24oJ2RibGNsaWNrJywgdGhpcy5ub2RlQ29udGV4dE1lbnUpXHJcbiAgICAgICAgbm9kZXNNZXJnZS5lYWNoKGZ1bmN0aW9uKGQsIGkpe1xyXG4gICAgICAgICAgICB2YXIgbm9kZUVsZW0gPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgbWMgPSBuZXcgSGFtbWVyLk1hbmFnZXIobm9kZUVsZW0pO1xyXG4gICAgICAgICAgICBtYy5hZGQobmV3IEhhbW1lci5QcmVzcyh7XHJcbiAgICAgICAgICAgICAgICBwb2ludGVyVHlwZTogJ3RvdWNoJ1xyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIG1jLm9uKCdwcmVzcycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICAgaWYoZS5wb2ludGVyVHlwZT09J3RvdWNoJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5ub2RlRHJhZ0hhbmRsZXIuY2FuY2VsRHJhZygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmKGQuZm9sZGVkKXtcclxuICAgICAgICAgICAgICAgIGxldCBidXR0b24gPSBkMy5zZWxlY3Qobm9kZUVsZW0pLnNlbGVjdE9yQXBwZW5kKCd0ZXh0LnNkLXVuZm9sZC1idXR0b24nKVxyXG4gICAgICAgICAgICAgICAgICAgIC50ZXh0KFwiWytdXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdjbGljayBkYmNsaWNrIG1vdXNlZG93bicsICgpPT5zZWxmLmZvbGRTdWJ0cmVlKGQsIGZhbHNlKSk7IC8vZmlyZWZveCBkZXRlY3RzIG9ubHkgbW91c2Vkb3duIGV2ZW50IC0gcmVsYXRlZCB0byBkcmFnIGhhbmRsZXJcclxuXHJcbiAgICAgICAgICAgICAgICBzZWxmLmxheW91dC5ub2RlVW5mb2xkQnV0dG9uUG9zaXRpb24oYnV0dG9uKTtcclxuICAgICAgICAgICAgICAgIFRvb2x0aXAuYXR0YWNoKGJ1dHRvbiwgaTE4bi50KCdjb250ZXh0TWVudS5ub2RlLnVuZm9sZCcpKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBkMy5zZWxlY3Qobm9kZUVsZW0pLnNlbGVjdCgnLnNkLXVuZm9sZC1idXR0b24nKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGF0dGFjaFBheW9mZlRvb2x0aXAoc2VsZWN0aW9uLCBwYXlvZmZGaWxlZE5hbWUgPSAncGF5b2ZmJywgb2JqZWN0PSdub2RlJyl7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIFRvb2x0aXAuYXR0YWNoKHNlbGVjdGlvbiwgKGQsIGkpPT57XHJcbiAgICAgICAgICAgIGlmKHNlbGYuY29uZmlnLnBheW9mZk5hbWVzLmxlbmd0aD5pICYmIHNlbGYuY29uZmlnLnBheW9mZk5hbWVzW2ldICE9PSBudWxsKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpMThuLnQoJ3Rvb2x0aXAuJytvYmplY3QrJy4nK3BheW9mZkZpbGVkTmFtZSsnLm5hbWVkJyx7dmFsdWU6IGQucGF5b2ZmLCBudW1iZXI6IGkrMSwgbmFtZTogc2VsZi5jb25maWcucGF5b2ZmTmFtZXNbaV19KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBpMThuLnQoJ3Rvb2x0aXAuJytvYmplY3QrJy4nK3BheW9mZkZpbGVkTmFtZSsnLmRlZmF1bHQnLHt2YWx1ZTogZC5wYXlvZmYsIG51bWJlcjogc2VsZi5jb25maWcubWF4UGF5b2Zmc1RvRGlzcGxheSA8IDIgPyAnJyA6IGkrMX0pXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlVGV4dExpbmVzKGQpeyAvL2hlbHBlciBtZXRob2QgZm9yIHNwbGl0dGluZyB0ZXh0IHRvIHRzcGFuc1xyXG4gICAgICAgIGxldCB2YWx1ZSA9IGQuZGlzcGxheVZhbHVlKFwibmFtZVwiKSB8fCBkLm5hbWU7XHJcbiAgICAgICAgdmFyIGxpbmVzID0gdmFsdWUgPyB2YWx1ZS5zcGxpdCgnXFxuJykgOiBbXTtcclxuICAgICAgICBsaW5lcy5yZXZlcnNlKCk7XHJcbiAgICAgICAgdmFyIHRzcGFucyA9IGQzLnNlbGVjdCh0aGlzKS5zZWxlY3RBbGwoJ3RzcGFuJykuZGF0YShsaW5lcyk7XHJcbiAgICAgICAgdHNwYW5zLmVudGVyKCkuYXBwZW5kKCd0c3BhbicpXHJcbiAgICAgICAgICAgIC5tZXJnZSh0c3BhbnMpXHJcbiAgICAgICAgICAgIC50ZXh0KGw9PmwpXHJcbiAgICAgICAgICAgIC5hdHRyKCdkeScsIChkLGkpPT5pPjAgPyAnLTEuMWVtJzogdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAuYXR0cigneCcsICcwJyk7XHJcblxyXG4gICAgICAgIHRzcGFucy5leGl0KCkucmVtb3ZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaXNPcHRpbWFsKGQpe1xyXG4gICAgICAgIHJldHVybiBkLmRpc3BsYXlWYWx1ZSgnb3B0aW1hbCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZHJhd0VkZ2VzKCkge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICB2YXIgZWRnZXNDb250YWluZXIgPSB0aGlzLm1haW5Hcm91cC5zZWxlY3RPckFwcGVuZCgnZy5lZGdlcycpO1xyXG4gICAgICAgIGlmKHNlbGYuY29uZmlnLmZvcmNlRnVsbEVkZ2VSZWRyYXcpe1xyXG4gICAgICAgICAgICBlZGdlc0NvbnRhaW5lci5zZWxlY3RBbGwoXCIqXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGVkZ2VzID0gZWRnZXNDb250YWluZXIuc2VsZWN0QWxsKCcuZWRnZScpLmRhdGEodGhpcy5kYXRhLmVkZ2VzLmZpbHRlcihlPT4hZS4kaGlkZGVuKSwgKGQsaSk9PiBkLmlkKTtcclxuICAgICAgICBlZGdlcy5leGl0KCkucmVtb3ZlKCk7XHJcbiAgICAgICAgdmFyIGVkZ2VzRW50ZXIgPSBlZGdlcy5lbnRlcigpLmFwcGVuZCgnZycpXHJcbiAgICAgICAgICAgIC5hdHRyKCdpZCcsIGQ9PidlZGdlLScrZC5pZClcclxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2VkZ2UnKTtcclxuXHJcblxyXG4gICAgICAgIGVkZ2VzRW50ZXIuYXBwZW5kKCdwYXRoJyk7XHJcbiAgICAgICAgdmFyIGxhYmVsRW50ZXIgPSBlZGdlc0VudGVyLmFwcGVuZFNlbGVjdG9yKCdnLmxhYmVsLWdyb3VwJyk7XHJcbiAgICAgICAgbGFiZWxFbnRlci5hcHBlbmQoJ3RleHQnKS5hdHRyKCdjbGFzcycsICdsYWJlbCcpO1xyXG4gICAgICAgIHZhciBwYXlvZmZFbnRlciA9IGVkZ2VzRW50ZXIuYXBwZW5kKCd0ZXh0JykuYXR0cignY2xhc3MnLCAncGF5b2ZmJyk7XHJcbiAgICAgICAgdmFyIHByb2JhYmlsaXR5RW50ZXIgPSBlZGdlc0VudGVyLmFwcGVuZCgndGV4dCcpLmF0dHIoJ2NsYXNzJywgJ3Byb2JhYmlsaXR5Jyk7XHJcblxyXG5cclxuICAgICAgICB2YXIgZWRnZXNNZXJnZSA9IGVkZ2VzRW50ZXIubWVyZ2UoZWRnZXMpO1xyXG5cclxuXHJcbiAgICAgICAgdmFyIG9wdGltYWxDbGFzc05hbWUgPSAnb3B0aW1hbCc7XHJcbiAgICAgICAgZWRnZXNNZXJnZS5jbGFzc2VkKG9wdGltYWxDbGFzc05hbWUsIChkKT0+c2VsZi5pc09wdGltYWwoZCkpO1xyXG5cclxuICAgICAgICB2YXIgZWRnZXNNZXJnZVQgPSBlZGdlc01lcmdlO1xyXG4gICAgICAgIGlmKHRoaXMudHJhbnNpdGlvbil7XHJcbiAgICAgICAgICAgIGVkZ2VzTWVyZ2VUID0gZWRnZXNNZXJnZS50cmFuc2l0aW9uKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBlZGdlc01lcmdlVC5zZWxlY3QoJ3BhdGgnKVxyXG4gICAgICAgICAgICAuYXR0cignZCcsIGQ9PiB0aGlzLmxheW91dC5lZGdlTGluZUQoZCkpXHJcbiAgICAgICAgICAgIC8vIC5hdHRyKFwic3Ryb2tlXCIsIFwiYmxhY2tcIilcclxuICAgICAgICAgICAgLy8gLmF0dHIoXCJzdHJva2Utd2lkdGhcIiwgMilcclxuICAgICAgICAgICAgLmF0dHIoXCJmaWxsXCIsIFwibm9uZVwiKVxyXG4gICAgICAgICAgICAuYXR0cihcIm1hcmtlci1lbmRcIiwgZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN1ZmZpeCA9IGQzLnNlbGVjdCh0aGlzLnBhcmVudE5vZGUpLmNsYXNzZWQoJ3NlbGVjdGVkJykgPyAnLXNlbGVjdGVkJyA6IChzZWxmLmlzT3B0aW1hbChkKT8nLW9wdGltYWwnOicnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBcInVybCgjYXJyb3dcIisgc3VmZml4K1wiKVwiXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyAuYXR0cihcInNoYXBlLXJlbmRlcmluZ1wiLCBcIm9wdGltaXplUXVhbGl0eVwiKVxyXG5cclxuXHJcbiAgICAgICAgZWRnZXNNZXJnZS5vbignY2xpY2snLCAoZXZlbnQsIGQpID0+IHtcclxuICAgICAgICAgICAgc2VsZi5zZWxlY3RFZGdlKGQsIHRydWUpXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMubGF5b3V0LmVkZ2VMYWJlbFBvc2l0aW9uKGxhYmVsRW50ZXIpO1xyXG4gICAgICAgIGVkZ2VzTWVyZ2VULnNlbGVjdCgndGV4dC5sYWJlbCcpLmVhY2godGhpcy51cGRhdGVUZXh0TGluZXMpO1xyXG4gICAgICAgIHZhciBsYWJlbE1lcmdlID0gZWRnZXNNZXJnZS5zZWxlY3QoJ2cubGFiZWwtZ3JvdXAnKTtcclxuICAgICAgICBsYWJlbE1lcmdlLmNsYXNzZWQoJ3NkLWhpZGRlbicsIHRoaXMuY29uZmlnLmhpZGVMYWJlbHMpO1xyXG4gICAgICAgIHZhciBsYWJlbE1lcmdlVCA9IGVkZ2VzTWVyZ2VULnNlbGVjdCgnZy5sYWJlbC1ncm91cCcpO1xyXG4gICAgICAgIHRoaXMubGF5b3V0LmVkZ2VMYWJlbFBvc2l0aW9uKGxhYmVsTWVyZ2VUKTtcclxuICAgICAgICAgICAgLy8gLnRleHQoZD0+ZC5uYW1lKTtcclxuXHJcbiAgICAgICAgdmFyIHBheW9mZiA9IGVkZ2VzTWVyZ2Uuc2VsZWN0KCd0ZXh0LnBheW9mZicpO1xyXG5cclxuICAgICAgICB2YXIgcGF5b2ZmVHNwYW5zID0gcGF5b2ZmLnNlbGVjdEFsbCgndHNwYW4nKS5kYXRhKGQgPT4ge1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IGQuZGlzcGxheVZhbHVlKCdwYXlvZmYnKTtcclxuICAgICAgICAgICAgcmV0dXJuIFV0aWxzLmlzQXJyYXkoaXRlbSkgPyBpdGVtLnNsaWNlKDAsIE1hdGgubWluKGl0ZW0ubGVuZ3RoLCBzZWxmLmNvbmZpZy5tYXhQYXlvZmZzVG9EaXNwbGF5KSkubWFwKF89PmQpIDogW2RdO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHBheW9mZlRzcGFucy5leGl0KCkucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgIHZhciBwYXlvZmZUc3BhbnNNID0gcGF5b2ZmVHNwYW5zLmVudGVyKCkuYXBwZW5kKCd0c3BhbicpLm1lcmdlKHBheW9mZlRzcGFucyk7XHJcbiAgICAgICAgcGF5b2ZmVHNwYW5zTVxyXG4gICAgICAgIC8vIC5hdHRyKCdkb21pbmFudC1iYXNlbGluZScsICdoYW5naW5nJylcclxuICAgICAgICAgICAgLmF0dHIoJ2R5JywgKGQsaSk9Pmk+MCA/ICcxLjFlbSc6IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgLy8gLmF0dHIoJ3gnLCAnMCcpXHJcblxyXG4gICAgICAgICAgICAvLyAuYXR0cignZG9taW5hbnQtYmFzZWxpbmUnLCAnaGFuZ2luZycpXHJcbiAgICAgICAgICAgIC5jbGFzc2VkKCduZWdhdGl2ZScsIChkLCBpKT0+IHtcclxuICAgICAgICAgICAgICAgIHZhciB2YWwgPSBkLmRpc3BsYXlQYXlvZmYodW5kZWZpbmVkLCBpKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWwhPT1udWxsICYmIHZhbDwwO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2xhc3NlZCgnc2QtaGlkZGVuJywgdGhpcy5jb25maWcuaGlkZVBheW9mZnMpXHJcbiAgICAgICAgICAgIC8vIC50ZXh0KGQ9PiBpc05hTihkLnBheW9mZikgPyBkLnBheW9mZiA6IHNlbGYuY29uZmlnLnBheW9mZk51bWJlckZvcm1hdHRlcihkLnBheW9mZikpXHJcbiAgICAgICAgICAgIC50ZXh0KChkLCBpKT0+e1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5jb25maWcucmF3KXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC5wYXlvZmZbaV07XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBkLmRpc3BsYXlWYWx1ZSgncGF5b2ZmJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbXMgPSBVdGlscy5pc0FycmF5KGl0ZW0pID8gaXRlbSA6IFtpdGVtXTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgdmFsID0gaXRlbXNbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc05hTih2YWwpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLmNvbmZpZy5wYXlvZmZOdW1iZXJGb3JtYXR0ZXIodmFsLCBpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFV0aWxzLmlzU3RyaW5nKHZhbCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGQucGF5b2ZmW2ldICE9PSBudWxsICYmICFpc05hTihkLnBheW9mZltpXSkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYuY29uZmlnLnBheW9mZk51bWJlckZvcm1hdHRlcihkLnBheW9mZltpXSwgaSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGQucGF5b2ZmW2ldO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIFRvb2x0aXAuYXR0YWNoKHBheW9mZlRzcGFuc00sIChkLCBpKT0+e1xyXG4gICAgICAgICAgICBpZihzZWxmLmNvbmZpZy5wYXlvZmZOYW1lcy5sZW5ndGg+aSAmJiBzZWxmLmNvbmZpZy5wYXlvZmZOYW1lc1tpXSAhPT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaTE4bi50KCd0b29sdGlwLmVkZ2UucGF5b2ZmLm5hbWVkJyx7dmFsdWU6IGQucGF5b2ZmW2ldLCBudW1iZXI6IGkrMSwgbmFtZTogc2VsZi5jb25maWcucGF5b2ZmTmFtZXNbaV19KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBpMThuLnQoJ3Rvb2x0aXAuZWRnZS5wYXlvZmYuZGVmYXVsdCcse3ZhbHVlOiBkLnBheW9mZltpXSwgbnVtYmVyOiBzZWxmLmNvbmZpZy5tYXhQYXlvZmZzVG9EaXNwbGF5IDwgMiA/ICcnIDogaSsxfSlcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdmFyIHBheW9mZlRleHRUID0gcGF5b2ZmO1xyXG4gICAgICAgIGlmKHRoaXMudHJhbnNpdGlvbil7XHJcbiAgICAgICAgICAgIHBheW9mZlRleHRUID0gcGF5b2ZmLnRyYW5zaXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sYXlvdXQuZWRnZVBheW9mZlBvc2l0aW9uKHBheW9mZkVudGVyKTtcclxuICAgICAgICB0aGlzLmxheW91dC5lZGdlUGF5b2ZmUG9zaXRpb24ocGF5b2ZmVGV4dFQpO1xyXG5cclxuICAgICAgICBUb29sdGlwLmF0dGFjaChlZGdlc01lcmdlLnNlbGVjdCgndGV4dC5wcm9iYWJpbGl0eScpLCBkPT5pMThuLnQoJ3Rvb2x0aXAuZWRnZS5wcm9iYWJpbGl0eScse3ZhbHVlOiBkLnByb2JhYmlsaXR5PT09IHVuZGVmaW5lZCA/IGQuZGlzcGxheVByb2JhYmlsaXR5KCkgOiBkLnByb2JhYmlsaXR5fSkpO1xyXG5cclxuICAgICAgICBlZGdlc01lcmdlLnNlbGVjdCgndGV4dC5wcm9iYWJpbGl0eScpXHJcbiAgICAgICAgICAgIC5jbGFzc2VkKCdzZC1oaWRkZW4nLCB0aGlzLmNvbmZpZy5oaWRlUHJvYmFiaWxpdGllcyk7XHJcbiAgICAgICAgdmFyIHByb2JhYmlsaXR5TWVyZ2UgPSBlZGdlc01lcmdlLnNlbGVjdCgndGV4dC5wcm9iYWJpbGl0eScpO1xyXG4gICAgICAgIHByb2JhYmlsaXR5TWVyZ2VcclxuICAgICAgICAgICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgJ2VuZCcpXHJcbiAgICAgICAgICAgIC50ZXh0KGQ9PntcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuY29uZmlnLnJhdyl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQucHJvYmFiaWxpdHk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgdmFsID0gZC5kaXNwbGF5UHJvYmFiaWxpdHkoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZih2YWwhPT1udWxsKXtcclxuICAgICAgICAgICAgICAgICAgICBpZighaXNOYU4odmFsKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLmNvbmZpZy5wcm9iYWJpbGl0eU51bWJlckZvcm1hdHRlcih2YWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZihVdGlscy5pc1N0cmluZyh2YWwpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoZC5wcm9iYWJpbGl0eSE9PW51bGwgJiYgIWlzTmFOKGQucHJvYmFiaWxpdHkpKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLmNvbmZpZy5wcm9iYWJpbGl0eU51bWJlckZvcm1hdHRlcihkLnByb2JhYmlsaXR5KTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5wcm9iYWJpbGl0eTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgdmFyIHByb2JhYmlsaXR5TWVyZ2VUID0gcHJvYmFiaWxpdHlNZXJnZTtcclxuICAgICAgICBpZih0aGlzLnRyYW5zaXRpb24pe1xyXG4gICAgICAgICAgICBwcm9iYWJpbGl0eU1lcmdlVCA9IHByb2JhYmlsaXR5TWVyZ2UudHJhbnNpdGlvbigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5sYXlvdXQuZWRnZVByb2JhYmlsaXR5UG9zaXRpb24ocHJvYmFiaWxpdHlFbnRlcik7XHJcbiAgICAgICAgdGhpcy5sYXlvdXQuZWRnZVByb2JhYmlsaXR5UG9zaXRpb24ocHJvYmFiaWxpdHlNZXJnZVQpO1xyXG5cclxuXHJcbiAgICAgICAgZWRnZXNDb250YWluZXIuc2VsZWN0QWxsKCcuZWRnZS4nK29wdGltYWxDbGFzc05hbWUpLnJhaXNlKCk7XHJcblxyXG4gICAgICAgIGVkZ2VzTWVyZ2Uub24oJ2NvbnRleHRtZW51JywgdGhpcy5lZGdlQ29udGV4dE1lbnUpO1xyXG4gICAgICAgIGVkZ2VzTWVyZ2Uub24oJ2RibGNsaWNrJywgdGhpcy5lZGdlQ29udGV4dE1lbnUpO1xyXG4gICAgICAgIGVkZ2VzTWVyZ2UuZWFjaChmdW5jdGlvbihkLCBpKXtcclxuICAgICAgICAgICAgdmFyIGVsZW0gPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgbWMgPSBuZXcgSGFtbWVyLk1hbmFnZXIoZWxlbSk7XHJcbiAgICAgICAgICAgIG1jLmFkZChuZXcgSGFtbWVyLlByZXNzKHtcclxuICAgICAgICAgICAgICAgIHBvaW50ZXJUeXBlOiBIYW1tZXIuUE9JTlRFUl9UT1VDSFxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICByZWRyYXdGbG9hdGluZ1RleHRzKCkge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcblxyXG4gICAgICAgIHZhciB0ZXh0c0NvbnRhaW5lciA9IHRoaXMubWFpbkdyb3VwLnNlbGVjdE9yQXBwZW5kKCdnLmZsb2F0aW5nLXRleHRzJyk7XHJcbiAgICAgICAgdmFyIHRleHRzID0gdGV4dHNDb250YWluZXIuc2VsZWN0QWxsKCcuZmxvYXRpbmctdGV4dCcpLmRhdGEodGhpcy5kYXRhLnRleHRzLCAoZCxpKT0+IGQuaWQpO1xyXG4gICAgICAgIHRleHRzLmV4aXQoKS5yZW1vdmUoKTtcclxuICAgICAgICB2YXIgdGV4dHNFbnRlciA9IHRleHRzLmVudGVyKCkuYXBwZW5kU2VsZWN0b3IoJ2cuZmxvYXRpbmctdGV4dCcpXHJcbiAgICAgICAgICAgIC5hdHRyKCdpZCcsIGQ9Pid0ZXh0LScrZC5pZCk7XHJcblxyXG5cclxuICAgICAgICB2YXIgcmVjdFdpZHRoID0gNDA7XHJcbiAgICAgICAgdmFyIHJlY3RIZWlnaHQgPSAyMDtcclxuXHJcbiAgICAgICAgdGV4dHNFbnRlci5hcHBlbmQoJ3JlY3QnKS5hdHRyKCd4JywgLTUpLmF0dHIoJ3knLCAtMTYpLmF0dHIoJ2ZpbGwtb3BhY2l0eScsIDApO1xyXG4gICAgICAgIHRleHRzRW50ZXIuYXBwZW5kKCd0ZXh0Jyk7XHJcblxyXG4gICAgICAgIHZhciB0ZXh0c01lcmdlID0gdGV4dHNFbnRlci5tZXJnZSh0ZXh0cyk7XHJcbiAgICAgICAgdmFyIHRleHRzTWVyZ2VUID0gdGV4dHNNZXJnZTtcclxuICAgICAgICBpZih0aGlzLnRyYW5zaXRpb24pe1xyXG4gICAgICAgICAgICB0ZXh0c01lcmdlVCA9IHRleHRzTWVyZ2UudHJhbnNpdGlvbigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGV4dHNNZXJnZVQuYXR0cigndHJhbnNmb3JtJywgZD0+J3RyYW5zbGF0ZSgnICsgZC5sb2NhdGlvbi54ICsgJyAgJyArIGQubG9jYXRpb24ueSArICcpJyk7XHJcblxyXG4gICAgICAgIHZhciB0c3BhbnMgPSB0ZXh0c01lcmdlLnNlbGVjdCgndGV4dCcpLnNlbGVjdEFsbCgndHNwYW4nKS5kYXRhKGQ9PntcclxuICAgICAgICAgICAgbGV0IHZhbHVlID0gZC4kZGlzcGxheVZhbHVlIHx8IGQudmFsdWU7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZSA/IHZhbHVlLnNwbGl0KCdcXG4nKSA6IFtdXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRzcGFucy5lbnRlcigpLmFwcGVuZCgndHNwYW4nKVxyXG4gICAgICAgICAgICAubWVyZ2UodHNwYW5zKVxyXG4gICAgICAgICAgICAuaHRtbChsPT5BcHBVdGlscy5yZXBsYWNlVXJscyhBcHBVdGlscy5lc2NhcGVIdG1sKGwpKSlcclxuICAgICAgICAgICAgLmF0dHIoJ2R5JywgKGQsaSk9Pmk+MCA/ICcxLjFlbSc6IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgLmF0dHIoJ3gnLCAnMCcpO1xyXG5cclxuICAgICAgICB0c3BhbnMuZXhpdCgpLnJlbW92ZSgpO1xyXG4gICAgICAgIHRleHRzTWVyZ2UuY2xhc3NlZCgnc2QtZW1wdHknLCBkPT4hZC52YWx1ZSB8fCAhZC52YWx1ZS50cmltKCkpO1xyXG4gICAgICAgIHRleHRzTWVyZ2Uuc2VsZWN0KCdyZWN0JykuYXR0cignd2lkdGgnLCByZWN0V2lkdGgpLmF0dHIoJ2hlaWdodCcsIHJlY3RIZWlnaHQpO1xyXG5cclxuICAgICAgICB0ZXh0c01lcmdlLmVhY2goZnVuY3Rpb24oZCl7XHJcbiAgICAgICAgICAgIGlmKCFkLnZhbHVlKXtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgYmIgPSBkMy5zZWxlY3QodGhpcykuc2VsZWN0KCd0ZXh0Jykubm9kZSgpLmdldEJCb3goKTtcclxuICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuc2VsZWN0KCdyZWN0JylcclxuICAgICAgICAgICAgICAgLmF0dHIoJ3knLCBiYi55LTUpXHJcbiAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIE1hdGgubWF4KGJiLndpZHRoKzEwLCByZWN0V2lkdGgpKVxyXG4gICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgTWF0aC5tYXgoYmIuaGVpZ2h0KzEwLCByZWN0SGVpZ2h0KSlcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYodGhpcy50ZXh0RHJhZ0hhbmRsZXIpe1xyXG4gICAgICAgICAgICB0ZXh0c01lcmdlLmNhbGwodGhpcy50ZXh0RHJhZ0hhbmRsZXIuZHJhZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRleHRzTWVyZ2Uub24oJ2NvbnRleHRtZW51JywgdGhpcy50ZXh0Q29udGV4dE1lbnUpO1xyXG4gICAgICAgIHRleHRzTWVyZ2Uub24oJ2RibGNsaWNrJywgdGhpcy50ZXh0Q29udGV4dE1lbnUpO1xyXG4gICAgICAgIHRleHRzTWVyZ2UuZWFjaChmdW5jdGlvbihkLCBpKXtcclxuICAgICAgICAgICAgdmFyIGVsZW0gPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgbWMgPSBuZXcgSGFtbWVyLk1hbmFnZXIoZWxlbSk7XHJcbiAgICAgICAgICAgIG1jLmFkZChuZXcgSGFtbWVyLlByZXNzKHtcclxuICAgICAgICAgICAgICAgIHBvaW50ZXJUeXBlOiAndG91Y2gnXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVWYWxpZGF0aW9uTWVzc2FnZXMoKSB7XHJcbiAgICAgICAgdmFyIG5vZGVzID0gdGhpcy5tYWluR3JvdXAuc2VsZWN0QWxsKCcubm9kZScpO1xyXG4gICAgICAgIG5vZGVzLmNsYXNzZWQoJ2Vycm9yJywgZmFsc2UpO1xyXG5cclxuICAgICAgICB0aGlzLmRhdGEudmFsaWRhdGlvblJlc3VsdHMuZm9yRWFjaCh2YWxpZGF0aW9uUmVzdWx0PT57XHJcbiAgICAgICAgICAgIGlmKHZhbGlkYXRpb25SZXN1bHQuaXNWYWxpZCgpKXtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModmFsaWRhdGlvblJlc3VsdC5vYmplY3RJZFRvRXJyb3IpLmZvckVhY2goaWQ9PntcclxuICAgICAgICAgICAgICAgIHZhciBlcnJvcnMgPSB2YWxpZGF0aW9uUmVzdWx0Lm9iamVjdElkVG9FcnJvcltpZF07XHJcbiAgICAgICAgICAgICAgICB2YXIgbm9kZVNlbGVjdGlvbiA9IHRoaXMuZ2V0Tm9kZUQzU2VsZWN0aW9uQnlJZChpZCk7XHJcbiAgICAgICAgICAgICAgICBub2RlU2VsZWN0aW9uLmNsYXNzZWQoJ2Vycm9yJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgdG9vbHRpcEh0bWwgPSAnJztcclxuICAgICAgICAgICAgICAgIGVycm9ycy5mb3JFYWNoKGU9PntcclxuICAgICAgICAgICAgICAgICAgICBpZih0b29sdGlwSHRtbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXBIdG1sKz0nPGJyLz4nXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXBIdG1sKz1BcHBVdGlscy5nZXRWYWxpZGF0aW9uTWVzc2FnZShlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIFRvb2x0aXAuYXR0YWNoKG5vZGVTZWxlY3Rpb24uc2VsZWN0KCcuZXJyb3ItaW5kaWNhdG9yJyksIHRvb2x0aXBIdG1sKTtcclxuXHJcblxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBpbml0RWRnZU1hcmtlcnMoKSB7XHJcbiAgICAgICAgdmFyIGRlZnMgPSB0aGlzLnN2Zy5hcHBlbmQoXCJzdmc6ZGVmc1wiKTtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0QXJyb3dNYXJrZXIoXCJhcnJvd1wiKTtcclxuICAgICAgICB0aGlzLmluaXRBcnJvd01hcmtlcihcImFycm93LW9wdGltYWxcIik7XHJcbiAgICAgICAgdGhpcy5pbml0QXJyb3dNYXJrZXIoXCJhcnJvdy1zZWxlY3RlZFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0QXJyb3dNYXJrZXIoaWQpIHtcclxuXHJcbiAgICAgICAgdmFyIGRlZnMgPSB0aGlzLnN2Zy5zZWxlY3QoXCJkZWZzXCIpO1xyXG4gICAgICAgIGRlZnMuYXBwZW5kKFwibWFya2VyXCIpXHJcbiAgICAgICAgICAgIC5hdHRyKFwiaWRcIixpZClcclxuICAgICAgICAgICAgLmF0dHIoXCJ2aWV3Qm94XCIsXCIwIC01IDEwIDEwXCIpXHJcbiAgICAgICAgICAgIC5hdHRyKFwicmVmWFwiLDUpXHJcbiAgICAgICAgICAgIC5hdHRyKFwicmVmWVwiLDApXHJcbiAgICAgICAgICAgIC5hdHRyKFwibWFya2VyV2lkdGhcIiw0KVxyXG4gICAgICAgICAgICAuYXR0cihcIm1hcmtlckhlaWdodFwiLDQpXHJcbiAgICAgICAgICAgIC5hdHRyKFwib3JpZW50XCIsXCJhdXRvXCIpXHJcbiAgICAgICAgICAgIC5hcHBlbmQoXCJwYXRoXCIpXHJcbiAgICAgICAgICAgIC5hdHRyKFwiZFwiLCBcIk0wLC01TDEwLDBMMCw1XCIpXHJcbiAgICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIixcImFycm93SGVhZFwiKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVCcnVzaEV4dGVudCgpIHtcclxuICAgICAgICB2YXIgc2VsZiA9dGhpcztcclxuICAgICAgICB0aGlzLmJydXNoLmV4dGVudChbWzAsIDBdLCBbc2VsZi5zdmcuYXR0cignd2lkdGgnKSwgc2VsZi5zdmcuYXR0cignaGVpZ2h0JyldXSk7XHJcbiAgICAgICAgdGhpcy5icnVzaENvbnRhaW5lci5jYWxsKHRoaXMuYnJ1c2gpO1xyXG4gICAgfVxyXG4gICAgaW5pdEJydXNoKCkge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgdmFyIGJydXNoQ29udGFpbmVyID0gc2VsZi5icnVzaENvbnRhaW5lciA9IHRoaXMuYnJ1c2hDb250YWluZXI9IHRoaXMud3JhcHBlckdyb3VwLnNlbGVjdE9ySW5zZXJ0KFwiZy5icnVzaFwiLCBcIjpmaXJzdC1jaGlsZFwiKVxyXG4gICAgICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwiYnJ1c2hcIik7XHJcblxyXG4gICAgICAgIHZhciBicnVzaCA9IHRoaXMuYnJ1c2ggPSBkMy5icnVzaCgpXHJcbiAgICAgICAgICAgIC5vbihcInN0YXJ0XCIsIGJydXNoc3RhcnQpXHJcbiAgICAgICAgICAgIC5vbihcImJydXNoXCIsIGJydXNobW92ZSlcclxuICAgICAgICAgICAgLm9uKFwiZW5kXCIsIGJydXNoZW5kKTtcclxuXHJcblxyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZUJydXNoRXh0ZW50KCk7XHJcblxyXG4gICAgICAgIGJydXNoQ29udGFpbmVyLnNlbGVjdCgnLm92ZXJsYXknKS5vbihcIm1vdXNlbW92ZS5lZGdlU2VsZWN0aW9uXCIsIG1vdXNlbW92ZWQpO1xyXG4gICAgICAgIGZ1bmN0aW9uIG1vdXNlbW92ZWQoZXZlbnQpIHtcclxuICAgICAgICAgICAgdmFyIG0gPSBkMy5wb2ludGVyKGV2ZW50KTtcclxuICAgICAgICAgICAgdmFyIG1ndCA9IHNlbGYuZ2V0TWFpbkdyb3VwVHJhbnNsYXRpb24oKTtcclxuICAgICAgICAgICAgdmFyIG1hcmdpbiA9IDEwO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNsb3Nlc3QgPSBbbnVsbCwgOTk5OTk5OTk5XTtcclxuICAgICAgICAgICAgdmFyIGNsb3NlRWRnZXMgPSBbXTtcclxuICAgICAgICAgICAgc2VsZi5tYWluR3JvdXAuc2VsZWN0QWxsKCcuZWRnZScpLmVhY2goZnVuY3Rpb24oZCl7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2VsZWN0aW9uID0gZDMuc2VsZWN0KHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uLmNsYXNzZWQoJ3NkLWhvdmVyJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHBhdGhOb2RlID0gc2VsZWN0aW9uLnNlbGVjdCgncGF0aCcpLm5vZGUoKTtcclxuICAgICAgICAgICAgICAgIHZhciBiID0gcGF0aE5vZGUuZ2V0QkJveCgpO1xyXG4gICAgICAgICAgICAgICAgaWYoYi54K21ndFswXSA8PW1bMF0gJiYgYi54K2Iud2lkdGgrbWd0WzBdID49IG1bMF0gJiZcclxuICAgICAgICAgICAgICAgICAgIGIueSttZ3RbMV0tbWFyZ2luIDw9bVsxXSAmJiBiLnkrYi5oZWlnaHQrbWd0WzFdK21hcmdpbiA+PSBtWzFdKXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNwID0gQXBwVXRpbHMuY2xvc2VzdFBvaW50KHBhdGhOb2RlLCBbbVswXS1tZ3RbMF0sIG1bMV0tbWd0WzFdXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY3AuZGlzdGFuY2UgPCBtYXJnaW4gJiYgY3AuZGlzdGFuY2U8Y2xvc2VzdFsxXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlc3QgPSBbc2VsZWN0aW9uLCBjcC5kaXN0YW5jZV07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBzZWxmLmhvdmVyZWRFZGdlID0gbnVsbDtcclxuICAgICAgICAgICAgaWYoY2xvc2VzdFswXSl7XHJcbiAgICAgICAgICAgICAgICBjbG9zZXN0WzBdLmNsYXNzZWQoJ3NkLWhvdmVyJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmhvdmVyZWRFZGdlID0gY2xvc2VzdFswXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGJydXNoc3RhcnQoZXZlbnQpIHtcclxuICAgICAgICAgICAgaWYgKCFldmVudC5zZWxlY3Rpb24pIHJldHVybjtcclxuICAgICAgICAgICAgaWYoc2VsZi5ob3ZlcmVkRWRnZSl7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNlbGVjdEVkZ2Uoc2VsZi5ob3ZlcmVkRWRnZS5kYXR1bSgpLCB0cnVlKVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHNlbGYuY2xlYXJTZWxlY3Rpb24oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBDb250ZXh0TWVudS5oaWRlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBIaWdobGlnaHQgdGhlIHNlbGVjdGVkIG5vZGVzLlxyXG4gICAgICAgIGZ1bmN0aW9uIGJydXNobW92ZShldmVudCkge1xyXG4gICAgICAgICAgICB2YXIgcyA9IGV2ZW50LnNlbGVjdGlvbjtcclxuICAgICAgICAgICAgaWYoIXMpcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgc2VsZi5tYWluR3JvdXAuc2VsZWN0QWxsKFwiLm5vZGVcIikuY2xhc3NlZCgnc2VsZWN0ZWQnLCBmdW5jdGlvbiAoZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1haW5Hcm91cFRyYW5zbGF0aW9uID0gc2VsZi5nZXRNYWluR3JvdXBUcmFuc2xhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHggPSBkLmxvY2F0aW9uLngrbWFpbkdyb3VwVHJhbnNsYXRpb25bMF07XHJcbiAgICAgICAgICAgICAgICB2YXIgeSA9IGQubG9jYXRpb24ueSttYWluR3JvdXBUcmFuc2xhdGlvblsxXTtcclxuICAgICAgICAgICAgICAgIHZhciBub2RlU2l6ZSA9IHNlbGYuY29uZmlnLmxheW91dC5ub2RlU2l6ZTtcclxuICAgICAgICAgICAgICAgIHZhciBvZmZzZXQgPSBub2RlU2l6ZSowLjI1O1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNbMF1bMF0gPD0geCtvZmZzZXQgJiYgeC1vZmZzZXQgPD0gc1sxXVswXVxyXG4gICAgICAgICAgICAgICAgICAgICYmIHNbMF1bMV0gPD0geStvZmZzZXQgJiYgeS1vZmZzZXQgPD0gc1sxXVsxXTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIElmIHRoZSBicnVzaCBpcyBlbXB0eSwgc2VsZWN0IGFsbCBjaXJjbGVzLlxyXG4gICAgICAgIGZ1bmN0aW9uIGJydXNoZW5kKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGlmICghZXZlbnQuc2VsZWN0aW9uKSByZXR1cm47XHJcbiAgICAgICAgICAgIGJydXNoLm1vdmUoYnJ1c2hDb250YWluZXIsIG51bGwpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHNlbGVjdGVkTm9kZXMgPSBzZWxmLmdldFNlbGVjdGVkTm9kZXMoKTtcclxuICAgICAgICAgICAgaWYoc2VsZWN0ZWROb2RlcyAmJiBzZWxlY3RlZE5vZGVzLmxlbmd0aCA9PT0gMSl7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNlbGVjdE5vZGUoc2VsZWN0ZWROb2Rlc1swXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gaWYgKCFkMy5ldmVudC5zZWxlY3Rpb24pIHNlbGYubWFpbkdyb3VwLnNlbGVjdEFsbChcIi5zZWxlY3RlZFwiKS5jbGFzc2VkKCdzZWxlY3RlZCcsIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGlzYWJsZUJydXNoKCl7XHJcbiAgICAgICAgaWYoIXRoaXMuYnJ1c2hEaXNhYmxlZCl7XHJcbiAgICAgICAgICAgIEFwcFV0aWxzLmdyb3dsKGkxOG4udCgnZ3Jvd2wuYnJ1c2hEaXNhYmxlZCcpLCAnaW5mbycsICdsZWZ0JylcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5icnVzaERpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmJydXNoQ29udGFpbmVyLnJlbW92ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGVuYWJsZUJydXNoKCl7XHJcbiAgICAgICAgaWYodGhpcy5icnVzaERpc2FibGVkKXtcclxuICAgICAgICAgICAgQXBwVXRpbHMuZ3Jvd2woaTE4bi50KCdncm93bC5icnVzaEVuYWJsZWQnKSwgJ2luZm8nLCAnbGVmdCcpXHJcbiAgICAgICAgICAgIHRoaXMuaW5pdEJydXNoKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYnJ1c2hEaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldE1haW5Hcm91cFRyYW5zbGF0aW9uKGludmVydCkge1xyXG4gICAgICAgIHZhciB0cmFuc2xhdGlvbiA9IEFwcFV0aWxzLmdldFRyYW5zbGF0aW9uKHRoaXMubWFpbkdyb3VwLmF0dHIoXCJ0cmFuc2Zvcm1cIikpO1xyXG4gICAgICAgIGlmKGludmVydCl7XHJcbiAgICAgICAgICAgIHRyYW5zbGF0aW9uWzBdID0gLXRyYW5zbGF0aW9uWzBdO1xyXG4gICAgICAgICAgICB0cmFuc2xhdGlvblsxXSA9IC10cmFuc2xhdGlvblsxXVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJhbnNsYXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdE5vZGVDb250ZXh0TWVudSgpIHtcclxuICAgICAgICB0aGlzLm5vZGVDb250ZXh0TWVudSA9IG5ldyBOb2RlQ29udGV4dE1lbnUodGhpcywgdGhpcy5jb25maWcub3BlcmF0aW9uc0Zvck9iamVjdCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdEVkZ2VDb250ZXh0TWVudSgpIHtcclxuICAgICAgICB0aGlzLmVkZ2VDb250ZXh0TWVudSA9IG5ldyBFZGdlQ29udGV4dE1lbnUodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdFRleHRDb250ZXh0TWVudSgpIHtcclxuICAgICAgICB0aGlzLnRleHRDb250ZXh0TWVudSA9IG5ldyBUZXh0Q29udGV4dE1lbnUodGhpcyk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBpbml0TWFpbkNvbnRleHRNZW51KCkge1xyXG4gICAgICAgIHRoaXMubWFpbkNvbnRleHRNZW51ID0gbmV3IE1haW5Db250ZXh0TWVudSh0aGlzKTtcclxuICAgICAgICB0aGlzLnN2Zy5vbignY29udGV4dG1lbnUnLHRoaXMubWFpbkNvbnRleHRNZW51KTtcclxuICAgICAgICB0aGlzLnN2Zy5vbignZGJsY2xpY2snLHRoaXMubWFpbkNvbnRleHRNZW51KTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRUZXh0KHRleHQpe1xyXG4gICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoKTtcclxuICAgICAgICB0aGlzLmRhdGEuYWRkVGV4dCh0ZXh0KTtcclxuICAgICAgICB0aGlzLnJlZHJhdygpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0VGV4dCh0ZXh0KTtcclxuICAgIH1cclxuXHJcbiAgICBhZGROb2RlKG5vZGUsIHBhcmVudCwgcmVkcmF3PWZhbHNlKXtcclxuICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKCk7XHJcbiAgICAgICAgdGhpcy5kYXRhLmFkZE5vZGUobm9kZSwgcGFyZW50KTtcclxuICAgICAgICB0aGlzLnJlZHJhdyh0cnVlKTtcclxuICAgICAgICB0aGlzLmxheW91dC51cGRhdGUobm9kZSk7XHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkRGVjaXNpb25Ob2RlKHBhcmVudCl7XHJcbiAgICAgICAgdmFyIG5ld05vZGUgPSBuZXcgbW9kZWwuRGVjaXNpb25Ob2RlKHRoaXMubGF5b3V0LmdldE5ld0NoaWxkTG9jYXRpb24ocGFyZW50KSk7XHJcbiAgICAgICAgdGhpcy5hZGROb2RlKG5ld05vZGUsIHBhcmVudClcclxuICAgIH1cclxuICAgIGFkZENoYW5jZU5vZGUocGFyZW50KXtcclxuICAgICAgICB2YXIgbmV3Tm9kZSA9IG5ldyBtb2RlbC5DaGFuY2VOb2RlKHRoaXMubGF5b3V0LmdldE5ld0NoaWxkTG9jYXRpb24ocGFyZW50KSk7XHJcbiAgICAgICAgdGhpcy5hZGROb2RlKG5ld05vZGUsIHBhcmVudClcclxuICAgIH1cclxuICAgIGFkZFRlcm1pbmFsTm9kZShwYXJlbnQpe1xyXG4gICAgICAgIHZhciBuZXdOb2RlID0gbmV3IG1vZGVsLlRlcm1pbmFsTm9kZSh0aGlzLmxheW91dC5nZXROZXdDaGlsZExvY2F0aW9uKHBhcmVudCkpO1xyXG4gICAgICAgIHRoaXMuYWRkTm9kZShuZXdOb2RlLCBwYXJlbnQpXHJcbiAgICB9XHJcblxyXG4gICAgaW5qZWN0Tm9kZShub2RlLCBlZGdlKXtcclxuICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKCk7XHJcbiAgICAgICAgdGhpcy5kYXRhLmluamVjdE5vZGUobm9kZSwgZWRnZSk7XHJcbiAgICAgICAgdGhpcy5yZWRyYXcoKTtcclxuICAgICAgICB0aGlzLmxheW91dC51cGRhdGUobm9kZSk7XHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgaW5qZWN0RGVjaXNpb25Ob2RlKGVkZ2Upe1xyXG4gICAgICAgIHZhciBuZXdOb2RlID0gbmV3IG1vZGVsLkRlY2lzaW9uTm9kZSh0aGlzLmxheW91dC5nZXRJbmplY3RlZE5vZGVMb2NhdGlvbihlZGdlKSk7XHJcbiAgICAgICAgdGhpcy5pbmplY3ROb2RlKG5ld05vZGUsIGVkZ2UpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBpbmplY3RDaGFuY2VOb2RlKGVkZ2Upe1xyXG4gICAgICAgIHZhciBuZXdOb2RlID0gbmV3IG1vZGVsLkNoYW5jZU5vZGUodGhpcy5sYXlvdXQuZ2V0SW5qZWN0ZWROb2RlTG9jYXRpb24oZWRnZSkpO1xyXG4gICAgICAgIHRoaXMuaW5qZWN0Tm9kZShuZXdOb2RlLCBlZGdlKTtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVOb2RlKG5vZGUpIHtcclxuICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKCk7XHJcbiAgICAgICAgdGhpcy5kYXRhLnJlbW92ZU5vZGUobm9kZSk7XHJcblxyXG5cclxuICAgICAgICBpZighdGhpcy5sYXlvdXQuaXNNYW51YWxMYXlvdXQoKSl7XHJcbiAgICAgICAgICAgIHRoaXMubGF5b3V0LnVwZGF0ZSgpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLnJlZHJhdygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVTZWxlY3RlZE5vZGVzKCkge1xyXG4gICAgICAgIHZhciBzZWxlY3RlZE5vZGVzID0gdGhpcy5nZXRTZWxlY3RlZE5vZGVzKCk7XHJcbiAgICAgICAgaWYoIXNlbGVjdGVkTm9kZXMubGVuZ3RoKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKCk7XHJcbiAgICAgICAgdGhpcy5kYXRhLnJlbW92ZU5vZGVzKHNlbGVjdGVkTm9kZXMpO1xyXG4gICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcclxuICAgICAgICB0aGlzLnJlZHJhdygpO1xyXG4gICAgICAgIHRoaXMubGF5b3V0LnVwZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZVNlbGVjdGVkVGV4dHMoKXtcclxuICAgICAgICB2YXIgc2VsZWN0ZWRUZXh0cyA9IHRoaXMuZ2V0U2VsZWN0ZWRUZXh0cygpO1xyXG5cclxuICAgICAgICBpZighc2VsZWN0ZWRUZXh0cy5sZW5ndGgpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoKTtcclxuICAgICAgICB0aGlzLmRhdGEucmVtb3ZlVGV4dHMoc2VsZWN0ZWRUZXh0cyk7XHJcbiAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xyXG4gICAgICAgIHRoaXMucmVkcmF3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29weU5vZGUoZCwgbm90Q2xlYXJQcmV2U2VsZWN0aW9uKSB7XHJcbiAgICAgICAgdmFyIGNsb25lID0gdGhpcy5kYXRhLmNsb25lU3VidHJlZShkKTtcclxuICAgICAgICBpZihub3RDbGVhclByZXZTZWxlY3Rpb24pe1xyXG4gICAgICAgICAgICBpZighdGhpcy5jb3BpZWROb2Rlcyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvcGllZE5vZGVzPVtdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY29waWVkTm9kZXMucHVzaChjbG9uZSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuY29waWVkTm9kZXMgPSBbY2xvbmVdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgY3V0Tm9kZShkKSB7XHJcbiAgICAgICAgdGhpcy5jb3B5Tm9kZShkKTtcclxuICAgICAgICB0aGlzLnJlbW92ZU5vZGUoZCk7XHJcbiAgICB9XHJcblxyXG4gICAgY3V0U2VsZWN0ZWROb2Rlcygpe1xyXG4gICAgICAgIHZhciBzZWxlY3RlZE5vZGVzID0gdGhpcy5nZXRTZWxlY3RlZE5vZGVzKCk7XHJcbiAgICAgICAgdmFyIHNlbGVjdGVkUm9vdHMgPSB0aGlzLmRhdGEuZmluZFN1YnRyZWVSb290cyhzZWxlY3RlZE5vZGVzKTtcclxuICAgICAgICB0aGlzLmNvcHlOb2RlcyhzZWxlY3RlZFJvb3RzKTtcclxuICAgICAgICB0aGlzLnJlbW92ZVNlbGVjdGVkTm9kZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBjb3B5U2VsZWN0ZWROb2RlcygpIHtcclxuICAgICAgICB2YXIgc2VsZjtcclxuICAgICAgICB2YXIgc2VsZWN0ZWROb2RlcyA9IHRoaXMuZ2V0U2VsZWN0ZWROb2RlcygpO1xyXG5cclxuICAgICAgICB2YXIgc2VsZWN0ZWRSb290cyA9IHRoaXMuZGF0YS5maW5kU3VidHJlZVJvb3RzKHNlbGVjdGVkTm9kZXMpO1xyXG4gICAgICAgIHRoaXMuY29weU5vZGVzKHNlbGVjdGVkUm9vdHMpO1xyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgY29weU5vZGVzKG5vZGVzKXtcclxuICAgICAgICB0aGlzLmNvcGllZE5vZGVzID0gbm9kZXMubWFwKGQ9PnRoaXMuZGF0YS5jbG9uZVN1YnRyZWUoZCkpO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgcGFzdGVUb05vZGUobm9kZSkge1xyXG4gICAgICAgIGlmKCF0aGlzLmNvcGllZE5vZGVzIHx8ICF0aGlzLmNvcGllZE5vZGVzLmxlbmd0aCl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSgpO1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICBzZWxmLmNsZWFyU2VsZWN0aW9uKCk7XHJcbiAgICAgICAgdmFyIG5vZGVzVG9BdHRhY2ggPSB0aGlzLmNvcGllZE5vZGVzO1xyXG4gICAgICAgIHNlbGYuY29weU5vZGVzKHRoaXMuY29waWVkTm9kZXMpO1xyXG4gICAgICAgIG5vZGVzVG9BdHRhY2guZm9yRWFjaCh0b0F0dGFjaD0+e1xyXG4gICAgICAgICAgICB2YXIgYXR0YWNoZWQgPSB0aGlzLmRhdGEuYXR0YWNoU3VidHJlZSh0b0F0dGFjaCwgbm9kZSkuY2hpbGROb2RlO1xyXG4gICAgICAgICAgICBpZihhdHRhY2hlZC5mb2xkZWQpe1xyXG4gICAgICAgICAgICAgICAgc2VsZi5mb2xkU3VidHJlZShhdHRhY2hlZCwgYXR0YWNoZWQuZm9sZGVkLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGxvY2F0aW9uID0gc2VsZi5sYXlvdXQuZ2V0TmV3Q2hpbGRMb2NhdGlvbihub2RlKTtcclxuICAgICAgICAgICAgYXR0YWNoZWQubW92ZVRvKGxvY2F0aW9uLngsIGxvY2F0aW9uLnksIHRydWUpO1xyXG4gICAgICAgICAgICBzZWxmLmxheW91dC5tb3ZlTm9kZVRvRW1wdHlQbGFjZShhdHRhY2hlZCwgZmFsc2UpO1xyXG4gICAgICAgICAgICBzZWxmLmxheW91dC5maXROb2Rlc0luUGxvdHRpbmdSZWdpb24odGhpcy5kYXRhLmdldEFsbERlc2NlbmRhbnROb2RlcyhhdHRhY2hlZCkpO1xyXG5cclxuICAgICAgICAgICAgc2VsZi5zZWxlY3RTdWJUcmVlKGF0dGFjaGVkLCBmYWxzZSwgbm9kZXNUb0F0dGFjaC5sZW5ndGg+MSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmKG5vZGUuZm9sZGVkKXtcclxuICAgICAgICAgICAgc2VsZi5mb2xkU3VidHJlZShub2RlLCBub2RlLmZvbGRlZCwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBzZWxmLnJlZHJhdygpO1xyXG4gICAgICAgICAgICBzZWxmLmxheW91dC51cGRhdGUoKTtcclxuICAgICAgICB9LDEwKVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwYXN0ZVRvTmV3TG9jYXRpb24ocG9pbnQpIHtcclxuICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKCk7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHNlbGYuY2xlYXJTZWxlY3Rpb24oKTtcclxuICAgICAgICB2YXIgbm9kZXNUb0F0dGFjaCA9IHRoaXMuY29waWVkTm9kZXM7XHJcbiAgICAgICAgc2VsZi5jb3B5Tm9kZXModGhpcy5jb3BpZWROb2Rlcyk7XHJcbiAgICAgICAgbm9kZXNUb0F0dGFjaC5mb3JFYWNoKHRvQXR0YWNoPT4ge1xyXG4gICAgICAgICAgICB2YXIgYXR0YWNoZWQgPSB0aGlzLmRhdGEuYXR0YWNoU3VidHJlZSh0b0F0dGFjaCk7XHJcbiAgICAgICAgICAgIGlmKGF0dGFjaGVkLmZvbGRlZCl7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmZvbGRTdWJ0cmVlKGF0dGFjaGVkLCBhdHRhY2hlZC5mb2xkZWQsIGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhdHRhY2hlZC5tb3ZlVG8ocG9pbnQueCwgcG9pbnQueSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHNlbGYubGF5b3V0Lm1vdmVOb2RlVG9FbXB0eVBsYWNlKGF0dGFjaGVkLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHNlbGYubGF5b3V0LmZpdE5vZGVzSW5QbG90dGluZ1JlZ2lvbih0aGlzLmRhdGEuZ2V0QWxsRGVzY2VuZGFudE5vZGVzKGF0dGFjaGVkKSk7XHJcblxyXG4gICAgICAgICAgICBzZWxmLnNlbGVjdFN1YlRyZWUoYXR0YWNoZWQsIGZhbHNlLCBub2Rlc1RvQXR0YWNoLmxlbmd0aD4xKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBzZWxmLnJlZHJhdygpO1xyXG4gICAgICAgICAgICBzZWxmLmxheW91dC51cGRhdGUoKTtcclxuICAgICAgICB9LDEwKVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBjb252ZXJ0Tm9kZShub2RlLCB0eXBlVG9Db252ZXJ0VG8pe1xyXG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoKTtcclxuICAgICAgICB0aGlzLmRhdGEuY29udmVydE5vZGUobm9kZSwgdHlwZVRvQ29udmVydFRvKTtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHNlbGYucmVkcmF3KHRydWUpO1xyXG4gICAgICAgIH0sMTApXHJcbiAgICB9XHJcblxyXG4gICAgcGVyZm9ybU9wZXJhdGlvbihvYmplY3QsIG9wZXJhdGlvbil7XHJcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSgpO1xyXG4gICAgICAgIHRoaXMuY29uZmlnLnBlcmZvcm1PcGVyYXRpb24ob2JqZWN0LCBvcGVyYXRpb24pLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnJlZHJhdygpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5sYXlvdXQudXBkYXRlKCk7XHJcbiAgICAgICAgICAgIH0sMTApXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZm9sZFN1YnRyZWUobm9kZSwgZm9sZCA9IHRydWUsIHJlZHJhdyA9IHRydWUpIHtcclxuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgICAgICBub2RlLmZvbGRlZCA9IGZvbGQ7XHJcbiAgICAgICAgY29uc3QgcHJlc2VydmVOZXN0ZWRGb2xkaW5nID0gc2VsZi5jb25maWcucHJlc2VydmVGb2xkaW5nT2ZOZXN0ZWRTdWJ0cmVlcztcclxuXHJcbiAgICAgICAgdGhpcy5kYXRhLmdldEFsbERlc2NlbmRhbnROb2Rlcyhub2RlKS5mb3JFYWNoKG4gPT4ge1xyXG4gICAgICAgICAgICBuLiRoaWRkZW4gPSBmb2xkIHx8IChuLiRwYXJlbnQgJiYgKG4uJHBhcmVudC5mb2xkZWQgfHwgbi4kcGFyZW50LiRoaWRkZW4pKTtcclxuICAgICAgICAgICAgaWYgKCFwcmVzZXJ2ZU5lc3RlZEZvbGRpbmcpIHtcclxuICAgICAgICAgICAgICAgIG4uZm9sZGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmRhdGEuZ2V0QWxsRGVzY2VuZGFudEVkZ2VzKG5vZGUpLmZvckVhY2goZSA9PiBlLiRoaWRkZW4gPSBlLnBhcmVudE5vZGUuZm9sZGVkIHx8IGUucGFyZW50Tm9kZS4kaGlkZGVuKTtcclxuXHJcbiAgICAgICAgaWYgKCFyZWRyYXcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc2VsZi5yZWRyYXcoKTtcclxuICAgICAgICAgICAgc2VsZi5sYXlvdXQudXBkYXRlKCk7XHJcbiAgICAgICAgfSwgMTApXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlVmlzaWJpbGl0eShub2RlID0gbnVsbCl7XHJcbiAgICAgICAgaWYoIW5vZGUpe1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEuZ2V0Um9vdHMoKS5mb3JFYWNoKG49PnRoaXMudXBkYXRlVmlzaWJpbGl0eShuKSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKG5vZGUuZm9sZGVkKXtcclxuICAgICAgICAgICAgdGhpcy5mb2xkU3VidHJlZShub2RlLCB0cnVlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG5vZGUuY2hpbGRFZGdlcy5mb3JFYWNoKGUgPT4gdGhpcy51cGRhdGVWaXNpYmlsaXR5KGUuY2hpbGROb2RlKSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG1vdmVOb2RlVG8oeCx5KXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlTm9kZVBvc2l0aW9uKG5vZGUpIHtcclxuICAgICAgICB0aGlzLmdldE5vZGVEM1NlbGVjdGlvbihub2RlKS5yYWlzZSgpLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJytub2RlLmxvY2F0aW9uLngrJyAnK25vZGUubG9jYXRpb24ueSsnKScpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVRleHRQb3NpdGlvbih0ZXh0KSB7XHJcbiAgICAgICAgdGhpcy5nZXRUZXh0RDNTZWxlY3Rpb24odGV4dCkucmFpc2UoKS5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcrdGV4dC5sb2NhdGlvbi54KycgJyt0ZXh0LmxvY2F0aW9uLnkrJyknKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXROb2RlRDNTZWxlY3Rpb24obm9kZSl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Tm9kZUQzU2VsZWN0aW9uQnlJZChub2RlLmlkKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXROb2RlRDNTZWxlY3Rpb25CeUlkKGlkKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5tYWluR3JvdXAuc2VsZWN0KCcjbm9kZS0nK2lkKTtcclxuICAgIH1cclxuICAgIGdldFRleHREM1NlbGVjdGlvbih0ZXh0KXtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRUZXh0RDNTZWxlY3Rpb25CeUlkKHRleHQuaWQpO1xyXG4gICAgfVxyXG4gICAgZ2V0VGV4dEQzU2VsZWN0aW9uQnlJZChpZCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWFpbkdyb3VwLnNlbGVjdCgnI3RleHQtJytpZCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U2VsZWN0ZWROb2Rlcyh2aXNpYmxlT25seSA9IGZhbHNlKSB7XHJcbiAgICAgICAgbGV0IHNlbGVjdGVkVmlzaWJsZSA9IHRoaXMubWFpbkdyb3VwLnNlbGVjdEFsbChcIi5ub2RlLnNlbGVjdGVkXCIpLmRhdGEoKTtcclxuICAgICAgICBpZih2aXNpYmxlT25seSl7XHJcbiAgICAgICAgICAgIHJldHVybiBzZWxlY3RlZFZpc2libGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYWxsU2VsZWN0ZWQgID0gW107XHJcbiAgICAgICAgYWxsU2VsZWN0ZWQucHVzaCguLi5zZWxlY3RlZFZpc2libGUpO1xyXG5cclxuICAgICAgICBzZWxlY3RlZFZpc2libGUuZm9yRWFjaChuPT57XHJcbiAgICAgICAgICAgIGlmKG4uZm9sZGVkKXtcclxuICAgICAgICAgICAgICAgIGxldCBkZXNjZW5kYW50cyA9IHRoaXMuZGF0YS5nZXRBbGxEZXNjZW5kYW50Tm9kZXMobik7XHJcbiAgICAgICAgICAgICAgICBpZihkZXNjZW5kYW50cyl7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxsU2VsZWN0ZWQucHVzaCguLi5kZXNjZW5kYW50cyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGFsbFNlbGVjdGVkO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFNlbGVjdGVkVGV4dHMoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5tYWluR3JvdXAuc2VsZWN0QWxsKFwiLmZsb2F0aW5nLXRleHQuc2VsZWN0ZWRcIikuZGF0YSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsZWFyU2VsZWN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5tYWluR3JvdXAuc2VsZWN0QWxsKFwiLmVkZ2Uuc2VsZWN0ZWRcIikuc2VsZWN0KCdwYXRoJykuYXR0cihcIm1hcmtlci1lbmRcIiwgZCA9PiBcInVybCgjYXJyb3dcIisodGhpcy5pc09wdGltYWwoZCk/Jy1vcHRpbWFsJzonJykrXCIpXCIpXHJcbiAgICAgICAgdGhpcy5tYWluR3JvdXAuc2VsZWN0QWxsKFwiLnNlbGVjdGVkXCIpLmNsYXNzZWQoJ3NlbGVjdGVkJywgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuY29uZmlnLm9uU2VsZWN0aW9uQ2xlYXJlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbGVjdEVkZ2UoZWRnZSwgY2xlYXJTZWxlY3Rpb25CZWZvcmVTZWxlY3Qpe1xyXG4gICAgICAgIGlmKGNsZWFyU2VsZWN0aW9uQmVmb3JlU2VsZWN0KXtcclxuICAgICAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvbmZpZy5vbkVkZ2VTZWxlY3RlZChlZGdlKTtcclxuICAgICAgICB0aGlzLm1haW5Hcm91cC5zZWxlY3QoJyNlZGdlLScrZWRnZS5pZClcclxuICAgICAgICAgICAgLmNsYXNzZWQoJ3NlbGVjdGVkJywgdHJ1ZSlcclxuICAgICAgICAgICAgLnNlbGVjdCgncGF0aCcpXHJcbiAgICAgICAgICAgIC5hdHRyKFwibWFya2VyLWVuZFwiLCBkID0+IFwidXJsKCNhcnJvdy1zZWxlY3RlZClcIilcclxuICAgIH1cclxuXHJcbiAgICBpc05vZGVTZWxlY3RlZChub2RlKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXROb2RlRDNTZWxlY3Rpb24obm9kZSkuY2xhc3NlZCgnc2VsZWN0ZWQnKTtcclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3ROb2RlKG5vZGUsIGNsZWFyU2VsZWN0aW9uQmVmb3JlU2VsZWN0LCBza2lwQ2FsbGJhY2spe1xyXG4gICAgICAgIGlmKGNsZWFyU2VsZWN0aW9uQmVmb3JlU2VsZWN0KXtcclxuICAgICAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoIXNraXBDYWxsYmFjayl7XHJcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLm9uTm9kZVNlbGVjdGVkKG5vZGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5nZXROb2RlRDNTZWxlY3Rpb25CeUlkKG5vZGUuaWQpLmNsYXNzZWQoJ3NlbGVjdGVkJywgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0VGV4dCh0ZXh0LCBjbGVhclNlbGVjdGlvbkJlZm9yZVNlbGVjdCwgc2tpcENhbGxiYWNrKXtcclxuICAgICAgICBpZihjbGVhclNlbGVjdGlvbkJlZm9yZVNlbGVjdCl7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKCFza2lwQ2FsbGJhY2spe1xyXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5vblRleHRTZWxlY3RlZCh0ZXh0KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5nZXRUZXh0RDNTZWxlY3Rpb25CeUlkKHRleHQuaWQpLmNsYXNzZWQoJ3NlbGVjdGVkJywgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0U3ViVHJlZShub2RlLCBjbGVhclNlbGVjdGlvbkJlZm9yZVNlbGVjdCxza2lwQ2FsbGJhY2spIHtcclxuICAgICAgICBpZihjbGVhclNlbGVjdGlvbkJlZm9yZVNlbGVjdCl7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZWxlY3ROb2RlKG5vZGUsIGZhbHNlLCBza2lwQ2FsbGJhY2spO1xyXG4gICAgICAgIG5vZGUuY2hpbGRFZGdlcy5mb3JFYWNoKGU9PnRoaXMuc2VsZWN0U3ViVHJlZShlLmNoaWxkTm9kZSwgZmFsc2UsIHRydWUpKTtcclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3RBbGxOb2RlcygpIHtcclxuICAgICAgICB0aGlzLm1haW5Hcm91cC5zZWxlY3RBbGwoXCIubm9kZVwiKS5jbGFzc2VkKCdzZWxlY3RlZCcsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGF1dG9MYXlvdXQodHlwZSwgd2l0aG91dFN0YXRlU2F2aW5nKXtcclxuICAgICAgICB0aGlzLmxheW91dC5hdXRvTGF5b3V0KHR5cGUsIHdpdGhvdXRTdGF0ZVNhdmluZyk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlRGlhZ3JhbVRpdGxlKHRpdGxlVmFsdWUpe1xyXG4gICAgICAgIGlmKCF0aXRsZVZhbHVlKXtcclxuICAgICAgICAgICAgdGl0bGVWYWx1ZSA9ICcnO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmRpYWdyYW1UaXRsZSA9IHRpdGxlVmFsdWU7XHJcbiAgICAgICAgdGhpcy5yZWRyYXdEaWFncmFtVGl0bGUoKTtcclxuICAgICAgICB0aGlzLnJlZHJhd0RpYWdyYW1EZXNjcmlwdGlvbigpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlTWFyZ2luKHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZHJhd0RpYWdyYW1UaXRsZSgpe1xyXG4gICAgICAgIHZhciBzdmdXaWR0aCA9IHRoaXMuc3ZnLmF0dHIoJ3dpZHRoJyk7XHJcbiAgICAgICAgdmFyIHN2Z0hlaWdodCA9IHRoaXMuc3ZnLmF0dHIoJ2hlaWdodCcpO1xyXG4gICAgICAgIHRoaXMudGl0bGVDb250YWluZXIgPSB0aGlzLnN2Zy5zZWxlY3RPckFwcGVuZCgnZy5zZC10aXRsZS1jb250YWluZXInKTtcclxuXHJcbiAgICAgICAgdmFyIHRpdGxlID0gdGhpcy50aXRsZUNvbnRhaW5lci5zZWxlY3RPckFwcGVuZCgndGV4dC5zZC10aXRsZScpO1xyXG4gICAgICAgIHRpdGxlLnRleHQodGhpcy5kaWFncmFtVGl0bGUpO1xyXG4gICAgICAgIExheW91dC5zZXRIYW5naW5nUG9zaXRpb24odGl0bGUpO1xyXG5cclxuICAgICAgICB2YXIgbWFyZ2luVG9wID0gcGFyc2VJbnQodGhpcy5jb25maWcudGl0bGUubWFyZ2luLnRvcCk7XHJcbiAgICAgICAgdGhpcy50aXRsZUNvbnRhaW5lci5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcrKHN2Z1dpZHRoLzIpKycsJysoIG1hcmdpblRvcCkrJyknKTtcclxuICAgIH1cclxuICAgIHJlZHJhd0RpYWdyYW1EZXNjcmlwdGlvbigpe1xyXG4gICAgICAgIHZhciBzdmdXaWR0aCA9IHRoaXMuc3ZnLmF0dHIoJ3dpZHRoJyk7XHJcbiAgICAgICAgdmFyIHN2Z0hlaWdodCA9IHRoaXMuc3ZnLmF0dHIoJ2hlaWdodCcpO1xyXG4gICAgICAgIHRoaXMudGl0bGVDb250YWluZXIgPSB0aGlzLnN2Zy5zZWxlY3RPckFwcGVuZCgnZy5zZC10aXRsZS1jb250YWluZXInKTtcclxuXHJcbiAgICAgICAgdmFyIGRlc2MgPSB0aGlzLnRpdGxlQ29udGFpbmVyLnNlbGVjdE9yQXBwZW5kKCd0ZXh0LnNkLWRlc2NyaXB0aW9uJyk7XHJcblxyXG4gICAgICAgIGlmKCF0aGlzLmNvbmZpZy5kZXNjcmlwdGlvbi5zaG93KXtcclxuICAgICAgICAgICAgZGVzYy5yZW1vdmUoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGxpbmVzID0gdGhpcy5kaWFncmFtRGVzY3JpcHRpb24gPyB0aGlzLmRpYWdyYW1EZXNjcmlwdGlvbi5zcGxpdCgnXFxuJykgOiBbXTtcclxuICAgICAgICB2YXIgdHNwYW5zID0gZGVzYy5zZWxlY3RBbGwoJ3RzcGFuJykuZGF0YShsaW5lcyk7XHJcbiAgICAgICAgdHNwYW5zLmVudGVyKCkuYXBwZW5kKCd0c3BhbicpXHJcbiAgICAgICAgICAgIC5tZXJnZSh0c3BhbnMpXHJcbiAgICAgICAgICAgIC5odG1sKGw9PkFwcFV0aWxzLnJlcGxhY2VVcmxzKEFwcFV0aWxzLmVzY2FwZUh0bWwobCkpKVxyXG4gICAgICAgICAgICAuYXR0cignZHknLCAoZCxpKT0+aT4wID8gJzEuMWVtJzogdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAuYXR0cigneCcsICcwJyk7XHJcblxyXG4gICAgICAgIHRzcGFucy5leGl0KCkucmVtb3ZlKCk7XHJcbiAgICAgICAgTGF5b3V0LnNldEhhbmdpbmdQb3NpdGlvbihkZXNjKTtcclxuXHJcbiAgICAgICAgdmFyIHRpdGxlID0gdGhpcy50aXRsZUNvbnRhaW5lci5zZWxlY3RPckFwcGVuZCgndGV4dC5zZC10aXRsZScpO1xyXG5cclxuICAgICAgICB2YXIgbWFyZ2luVG9wID0gMDtcclxuICAgICAgICBpZih0aGlzLmRpYWdyYW1UaXRsZSl7XHJcbiAgICAgICAgICAgIG1hcmdpblRvcCArPSB0aXRsZS5ub2RlKCkuZ2V0QkJveCgpLmhlaWdodDtcclxuICAgICAgICAgICAgbWFyZ2luVG9wKz0gTWF0aC5tYXgocGFyc2VJbnQodGhpcy5jb25maWcuZGVzY3JpcHRpb24ubWFyZ2luLnRvcCksIDApO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGRlc2MuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgwLCcrKCBtYXJnaW5Ub3ApKycpJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlRGlhZ3JhbURlc2NyaXB0aW9uKGRlc2NyaXB0aW9uVmFsdWUpe1xyXG4gICAgICAgIGlmKCFkZXNjcmlwdGlvblZhbHVlKXtcclxuICAgICAgICAgICAgZGVzY3JpcHRpb25WYWx1ZSA9ICcnO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmRpYWdyYW1EZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uVmFsdWU7XHJcbiAgICAgICAgdGhpcy5yZWRyYXdEaWFncmFtVGl0bGUoKTtcclxuICAgICAgICB0aGlzLnJlZHJhd0RpYWdyYW1EZXNjcmlwdGlvbigpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlTWFyZ2luKHRydWUpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBnZXRUaXRsZUdyb3VwSGVpZ2h0KHdpdGhNYXJnaW5zKXtcclxuICAgICAgICBpZighdGhpcy50aXRsZUNvbnRhaW5lcil7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgaCA9IHRoaXMudGl0bGVDb250YWluZXIubm9kZSgpLmdldEJCb3goKS5oZWlnaHQ7XHJcbiAgICAgICAgaWYod2l0aE1hcmdpbnMpe1xyXG4gICAgICAgICAgICBoKz0gcGFyc2VJbnQodGhpcy5jb25maWcudGl0bGUubWFyZ2luLmJvdHRvbSk7XHJcbiAgICAgICAgICAgIGgrPSBwYXJzZUludCh0aGlzLmNvbmZpZy50aXRsZS5tYXJnaW4udG9wKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGg7XHJcbiAgICB9XHJcblxyXG59XHJcbiIsImV4cG9ydCAqIGZyb20gJy4vc3JjL2luZGV4J1xyXG4iXX0=
