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

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
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
    //places textString in textObj, adds an ellipsis if text can't fit in width
    value: function placeTextWithEllipsis(textD3Obj, textString, width) {
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

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
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

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EdgeContextMenu = void 0;

var _contextMenu = require("./context-menu");

var _i18n = require("../i18n/i18n");

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
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
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

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MainContextMenu = void 0;

var _contextMenu = require("./context-menu");

var _sdModel = require("sd-model");

var d3 = _interopRequireWildcard(require("../d3"));

var _i18n = require("../i18n/i18n");

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
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
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
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

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NodeContextMenu = void 0;

var _contextMenu = require("./context-menu");

var _sdModel = require("sd-model");

var _i18n = require("../i18n/i18n");

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
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
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

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextContextMenu = void 0;

var _contextMenu = require("./context-menu");

var _i18n = require("../i18n/i18n");

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
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
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

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
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

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
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

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
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

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
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
module.exports = "module.exports = \"<div class=\\\"sd-growl-message <%=type%>\\\">\\n    <div class=\\\"sd-growl-message-text\\\">\\n        <%= message %>\\n    </div>\\n</div>\\n\";\n";

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

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
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

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
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

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
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
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
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
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _index[key];
    }
  });
});

},{"./src/index":15}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLXV0aWxzLmpzIiwic3JjL2NvbnRleHQtbWVudS9jb250ZXh0LW1lbnUuanMiLCJzcmMvY29udGV4dC1tZW51L2VkZ2UtY29udGV4dC1tZW51LmpzIiwic3JjL2NvbnRleHQtbWVudS9tYWluLWNvbnRleHQtbWVudS5qcyIsInNyYy9jb250ZXh0LW1lbnUvbm9kZS1jb250ZXh0LW1lbnUuanMiLCJzcmMvY29udGV4dC1tZW51L3RleHQtY29udGV4dC1tZW51LmpzIiwic3JjL2QzLWV4dGVuc2lvbnMuanMiLCJzcmMvZDMuanMiLCJzcmMvaTE4bi9kZS5qc29uIiwic3JjL2kxOG4vZW4uanNvbiIsInNyYy9pMThuL2ZyLmpzb24iLCJzcmMvaTE4bi9pMThuLmpzIiwic3JjL2kxOG4vaXQuanNvbiIsInNyYy9pMThuL3BsLmpzb24iLCJzcmMvaW5kZXguanMiLCJzcmMvbGF5b3V0LmpzIiwic3JjL25vZGUtZHJhZy1oYW5kbGVyLmpzIiwic3JjL3N5bWJvbHMvY2lyY2xlLmpzIiwic3JjL3N5bWJvbHMvdHJpYW5nbGUuanMiLCJzcmMvdGVtcGxhdGVzLmpzIiwic3JjL3RlbXBsYXRlcy9ncm93bF9tZXNzYWdlLmh0bWwiLCJzcmMvdGV4dC1kcmFnLWhhbmRsZXIuanMiLCJzcmMvdG9vbHRpcC5qcyIsInNyYy90cmVlLWRlc2lnbmVyLmpzIiwiaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBLElBQUEsRUFBQSxHQUFBLHVCQUFBLENBQUEsT0FBQSxDQUFBLE1BQUEsQ0FBQSxDQUFBOztBQUNBLElBQUEsVUFBQSxHQUFBLE9BQUEsQ0FBQSxhQUFBLENBQUE7O0FBQ0EsSUFBQSxLQUFBLEdBQUEsT0FBQSxDQUFBLGFBQUEsQ0FBQTs7QUFDQSxJQUFBLFFBQUEsR0FBQSxPQUFBLENBQUEsVUFBQSxDQUFBOzs7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SUFBQSxHQUFBLEtBQUEsWUFBQSxFQUFBO0FBQUEsRUFBQSxNQUFBLENBQUEsY0FBQSxDQUFBLE9BQUEsRUFBQSxHQUFBLEVBQUE7QUFBQSxJQUFBLFVBQUEsRUFBQSxJQUFBO0FBQUEsSUFBQSxHQUFBLEVBQUEsU0FBQSxHQUFBLEdBQUE7QUFBQSxhQUFBLFlBQUEsQ0FBQSxHQUFBLENBQUE7QUFBQTtBQUFBLEdBQUE7QUFBQSxDQUFBOztBQUNBLElBQUEsUUFBQSxHQUFBLE9BQUEsQ0FBQSxVQUFBLENBQUE7O0FBQUEsTUFBQSxDQUFBLElBQUEsQ0FBQSxRQUFBLEVBQUEsT0FBQSxDQUFBLFVBQUEsR0FBQSxFQUFBO0FBQUEsTUFBQSxHQUFBLEtBQUEsU0FBQSxJQUFBLEdBQUEsS0FBQSxZQUFBLEVBQUE7QUFBQSxFQUFBLE1BQUEsQ0FBQSxjQUFBLENBQUEsT0FBQSxFQUFBLEdBQUEsRUFBQTtBQUFBLElBQUEsVUFBQSxFQUFBLElBQUE7QUFBQSxJQUFBLEdBQUEsRUFBQSxTQUFBLEdBQUEsR0FBQTtBQUFBLGFBQUEsUUFBQSxDQUFBLEdBQUEsQ0FBQTtBQUFBO0FBQUEsR0FBQTtBQUFBLENBQUE7O0FBQ0EsSUFBQSxPQUFBLEdBQUEsT0FBQSxDQUFBLFNBQUEsQ0FBQTs7QUFBQSxNQUFBLENBQUEsSUFBQSxDQUFBLE9BQUEsRUFBQSxPQUFBLENBQUEsVUFBQSxHQUFBLEVBQUE7QUFBQSxNQUFBLEdBQUEsS0FBQSxTQUFBLElBQUEsR0FBQSxLQUFBLFlBQUEsRUFBQTtBQUFBLEVBQUEsTUFBQSxDQUFBLGNBQUEsQ0FBQSxPQUFBLEVBQUEsR0FBQSxFQUFBO0FBQUEsSUFBQSxVQUFBLEVBQUEsSUFBQTtBQUFBLElBQUEsR0FBQSxFQUFBLFNBQUEsR0FBQSxHQUFBO0FBQUEsYUFBQSxPQUFBLENBQUEsR0FBQSxDQUFBO0FBQUE7QUFBQSxHQUFBO0FBQUEsQ0FBQTs7QUFDQSxJQUFBLFFBQUEsR0FBQSxPQUFBLENBQUEsVUFBQSxDQUFBOztBQUFBLE1BQUEsQ0FBQSxJQUFBLENBQUEsUUFBQSxFQUFBLE9BQUEsQ0FBQSxVQUFBLEdBQUEsRUFBQTtBQUFBLE1BQUEsR0FBQSxLQUFBLFNBQUEsSUFBQSxHQUFBLEtBQUEsWUFBQSxFQUFBO0FBQUEsRUFBQSxNQUFBLENBQUEsY0FBQSxDQUFBLE9BQUEsRUFBQSxHQUFBLEVBQUE7QUFBQSxJQUFBLFVBQUEsRUFBQSxJQUFBO0FBQUEsSUFBQSxHQUFBLEVBQUEsU0FBQSxHQUFBLEdBQUE7QUFBQSxhQUFBLFFBQUEsQ0FBQSxHQUFBLENBQUE7QUFBQTtBQUFBLEdBQUE7QUFBQSxDQUFBOztBQUNBLElBQUEsUUFBQSxHQUFBLE9BQUEsQ0FBQSxVQUFBLENBQUE7O0FBQUEsTUFBQSxDQUFBLElBQUEsQ0FBQSxRQUFBLEVBQUEsT0FBQSxDQUFBLFVBQUEsR0FBQSxFQUFBO0FBQUEsTUFBQSxHQUFBLEtBQUEsU0FBQSxJQUFBLEdBQUEsS0FBQSxZQUFBLEVBQUE7QUFBQSxFQUFBLE1BQUEsQ0FBQSxjQUFBLENBQUEsT0FBQSxFQUFBLEdBQUEsRUFBQTtBQUFBLElBQUEsVUFBQSxFQUFBLElBQUE7QUFBQSxJQUFBLEdBQUEsRUFBQSxTQUFBLEdBQUEsR0FBQTtBQUFBLGFBQUEsUUFBQSxDQUFBLEdBQUEsQ0FBQTtBQUFBO0FBQUEsR0FBQTtBQUFBLENBQUE7O0FBQ0EsSUFBQSxZQUFBLEdBQUEsT0FBQSxDQUFBLGNBQUEsQ0FBQTs7QUFBQSxNQUFBLENBQUEsSUFBQSxDQUFBLFlBQUEsRUFBQSxPQUFBLENBQUEsVUFBQSxHQUFBLEVBQUE7QUFBQSxNQUFBLEdBQUEsS0FBQSxTQUFBLElBQUEsR0FBQSxLQUFBLFlBQUEsRUFBQTtBQUFBLEVBQUEsTUFBQSxDQUFBLGNBQUEsQ0FBQSxPQUFBLEVBQUEsR0FBQSxFQUFBO0FBQUEsSUFBQSxVQUFBLEVBQUEsSUFBQTtBQUFBLElBQUEsR0FBQSxFQUFBLFNBQUEsR0FBQSxHQUFBO0FBQUEsYUFBQSxZQUFBLENBQUEsR0FBQSxDQUFBO0FBQUE7QUFBQSxHQUFBO0FBQUEsQ0FBQTs7QUFDQSxJQUFBLGFBQUEsR0FBQSxPQUFBLENBQUEsZ0JBQUEsQ0FBQTs7QUFBQSxNQUFBLENBQUEsSUFBQSxDQUFBLGFBQUEsRUFBQSxPQUFBLENBQUEsVUFBQSxHQUFBLEVBQUE7QUFBQSxNQUFBLEdBQUEsS0FBQSxTQUFBLElBQUEsR0FBQSxLQUFBLFlBQUEsRUFBQTtBQUFBLEVBQUEsTUFBQSxDQUFBLGNBQUEsQ0FBQSxPQUFBLEVBQUEsR0FBQSxFQUFBO0FBQUEsSUFBQSxVQUFBLEVBQUEsSUFBQTtBQUFBLElBQUEsR0FBQSxFQUFBLFNBQUEsR0FBQSxHQUFBO0FBQUEsYUFBQSxhQUFBLENBQUEsR0FBQSxDQUFBO0FBQUE7QUFBQSxHQUFBO0FBQUEsQ0FBQTs7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkVBLElBQUEsUUFBQSxHQUFBLHNCQUFBLENBQUEsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFBOztBQUNBLElBQUEsRUFBQSxHQUFBLHVCQUFBLENBQUEsT0FBQSxDQUFBLFdBQUEsQ0FBQSxDQUFBOztBQUNBLElBQUEsRUFBQSxHQUFBLHVCQUFBLENBQUEsT0FBQSxDQUFBLFdBQUEsQ0FBQSxDQUFBOztBQUNBLElBQUEsRUFBQSxHQUFBLHVCQUFBLENBQUEsT0FBQSxDQUFBLFdBQUEsQ0FBQSxDQUFBOztBQUNBLElBQUEsRUFBQSxHQUFBLHVCQUFBLENBQUEsT0FBQSxDQUFBLFdBQUEsQ0FBQSxDQUFBOztBQUNBLElBQUEsRUFBQSxHQUFBLHVCQUFBLENBQUEsT0FBQSxDQUFBLFdBQUEsQ0FBQSxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRWEsSTs7Ozs7Ozt5QkFLRyxHLEVBQUk7QUFDWixNQUFBLElBQUksQ0FBSixRQUFBLEdBQUEsR0FBQTtBQUNBLFVBQUksU0FBUyxHQUFHO0FBQ1osUUFBQSxFQUFFLEVBQUU7QUFDQSxVQUFBLFdBQVcsRUFBRTtBQURiLFNBRFE7QUFJWixRQUFBLEVBQUUsRUFBRTtBQUNBLFVBQUEsV0FBVyxFQUFFO0FBRGIsU0FKUTtBQU9aLFFBQUEsRUFBRSxFQUFFO0FBQ0EsVUFBQSxXQUFXLEVBQUU7QUFEYixTQVBRO0FBVVosUUFBQSxFQUFFLEVBQUU7QUFDQSxVQUFBLFdBQVcsRUFBRTtBQURiLFNBVlE7QUFhWixRQUFBLEVBQUUsRUFBRTtBQUNBLFVBQUEsV0FBVyxFQUFFO0FBRGI7QUFiUSxPQUFoQjtBQWlCQSxNQUFBLElBQUksQ0FBSixTQUFBLEdBQWlCLFFBQUEsQ0FBQSxTQUFBLENBQUEsQ0FBQSxjQUFBLENBQXVCO0FBQ3BDLFFBQUEsR0FBRyxFQURpQyxHQUFBO0FBRXBDLFFBQUEsV0FBVyxFQUZ5QixJQUFBO0FBR3BDLFFBQUEsU0FBUyxFQUFFO0FBSHlCLE9BQXZCLEVBSWQsVUFBQSxHQUFBLEVBQUEsQ0FBQSxFQUFZLENBSmYsQ0FBaUIsQ0FBakI7QUFNSDs7O3NCQUVRLEcsRUFBSyxHLEVBQUk7QUFDZCxhQUFPLElBQUksQ0FBSixTQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUEsRUFBUCxHQUFPLENBQVA7QUFDSDs7Ozs7Ozs7O0FDekNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3JFQSxJQUFBLGFBQUEsR0FBQSxPQUFBLENBQUEsaUJBQUEsQ0FBQTs7QUFPQSxNQUFBLENBQUEsSUFBQSxDQUFBLGFBQUEsRUFBQSxPQUFBLENBQUEsVUFBQSxHQUFBLEVBQUE7QUFBQSxNQUFBLEdBQUEsS0FBQSxTQUFBLElBQUEsR0FBQSxLQUFBLFlBQUEsRUFBQTtBQUFBLE1BQUEsTUFBQSxDQUFBLFNBQUEsQ0FBQSxjQUFBLENBQUEsSUFBQSxDQUFBLFlBQUEsRUFBQSxHQUFBLENBQUEsRUFBQTtBQUFBLEVBQUEsTUFBQSxDQUFBLGNBQUEsQ0FBQSxPQUFBLEVBQUEsR0FBQSxFQUFBO0FBQUEsSUFBQSxVQUFBLEVBQUEsSUFBQTtBQUFBLElBQUEsR0FBQSxFQUFBLFNBQUEsR0FBQSxHQUFBO0FBQUEsYUFBQSxhQUFBLENBQUEsR0FBQSxDQUFBO0FBQUE7QUFBQSxHQUFBO0FBQUEsQ0FBQTs7QUFKQSxJQUFBLGFBQUEsR0FBQSxPQUFBLENBQUEsaUJBQUEsQ0FBQTs7QUFBQSxNQUFBLENBQUEsSUFBQSxDQUFBLGFBQUEsRUFBQSxPQUFBLENBQUEsVUFBQSxHQUFBLEVBQUE7QUFBQSxNQUFBLEdBQUEsS0FBQSxTQUFBLElBQUEsR0FBQSxLQUFBLFlBQUEsRUFBQTtBQUFBLE1BQUEsTUFBQSxDQUFBLFNBQUEsQ0FBQSxjQUFBLENBQUEsSUFBQSxDQUFBLFlBQUEsRUFBQSxHQUFBLENBQUEsRUFBQTtBQUFBLEVBQUEsTUFBQSxDQUFBLGNBQUEsQ0FBQSxPQUFBLEVBQUEsR0FBQSxFQUFBO0FBQUEsSUFBQSxVQUFBLEVBQUEsSUFBQTtBQUFBLElBQUEsR0FBQSxFQUFBLFNBQUEsR0FBQSxHQUFBO0FBQUEsYUFBQSxhQUFBLENBQUEsR0FBQSxDQUFBO0FBQUE7QUFBQSxHQUFBO0FBQUEsQ0FBQTs7QUFDQSxJQUFBLFNBQUEsR0FBQSxPQUFBLENBQUEsYUFBQSxDQUFBOztBQUFBLE1BQUEsQ0FBQSxJQUFBLENBQUEsU0FBQSxFQUFBLE9BQUEsQ0FBQSxVQUFBLEdBQUEsRUFBQTtBQUFBLE1BQUEsR0FBQSxLQUFBLFNBQUEsSUFBQSxHQUFBLEtBQUEsWUFBQSxFQUFBO0FBQUEsTUFBQSxNQUFBLENBQUEsU0FBQSxDQUFBLGNBQUEsQ0FBQSxJQUFBLENBQUEsWUFBQSxFQUFBLEdBQUEsQ0FBQSxFQUFBO0FBQUEsRUFBQSxNQUFBLENBQUEsY0FBQSxDQUFBLE9BQUEsRUFBQSxHQUFBLEVBQUE7QUFBQSxJQUFBLFVBQUEsRUFBQSxJQUFBO0FBQUEsSUFBQSxHQUFBLEVBQUEsU0FBQSxHQUFBLEdBQUE7QUFBQSxhQUFBLFNBQUEsQ0FBQSxHQUFBLENBQUE7QUFBQTtBQUFBLEdBQUE7QUFBQSxDQUFBOztBQUNBLElBQUEsVUFBQSxHQUFBLE9BQUEsQ0FBQSxhQUFBLENBQUE7O0FBQUEsTUFBQSxDQUFBLElBQUEsQ0FBQSxVQUFBLEVBQUEsT0FBQSxDQUFBLFVBQUEsR0FBQSxFQUFBO0FBQUEsTUFBQSxHQUFBLEtBQUEsU0FBQSxJQUFBLEdBQUEsS0FBQSxZQUFBLEVBQUE7QUFBQSxNQUFBLE1BQUEsQ0FBQSxTQUFBLENBQUEsY0FBQSxDQUFBLElBQUEsQ0FBQSxZQUFBLEVBQUEsR0FBQSxDQUFBLEVBQUE7QUFBQSxFQUFBLE1BQUEsQ0FBQSxjQUFBLENBQUEsT0FBQSxFQUFBLEdBQUEsRUFBQTtBQUFBLElBQUEsVUFBQSxFQUFBLElBQUE7QUFBQSxJQUFBLEdBQUEsRUFBQSxTQUFBLEdBQUEsR0FBQTtBQUFBLGFBQUEsVUFBQSxDQUFBLEdBQUEsQ0FBQTtBQUFBO0FBQUEsR0FBQTtBQUFBLENBQUE7O0FBQ0EsSUFBQSxRQUFBLEdBQUEsT0FBQSxDQUFBLFdBQUEsQ0FBQTs7QUFBQSxNQUFBLENBQUEsSUFBQSxDQUFBLFFBQUEsRUFBQSxPQUFBLENBQUEsVUFBQSxHQUFBLEVBQUE7QUFBQSxNQUFBLEdBQUEsS0FBQSxTQUFBLElBQUEsR0FBQSxLQUFBLFlBQUEsRUFBQTtBQUFBLE1BQUEsTUFBQSxDQUFBLFNBQUEsQ0FBQSxjQUFBLENBQUEsSUFBQSxDQUFBLFlBQUEsRUFBQSxHQUFBLENBQUEsRUFBQTtBQUFBLEVBQUEsTUFBQSxDQUFBLGNBQUEsQ0FBQSxPQUFBLEVBQUEsR0FBQSxFQUFBO0FBQUEsSUFBQSxVQUFBLEVBQUEsSUFBQTtBQUFBLElBQUEsR0FBQSxFQUFBLFNBQUEsR0FBQSxHQUFBO0FBQUEsYUFBQSxRQUFBLENBQUEsR0FBQSxDQUFBO0FBQUE7QUFBQSxHQUFBO0FBQUEsQ0FBQTs7QUFFQSxJQUFBLEVBQUEsR0FBQSxzQkFBQSxDQUFBLE9BQUEsQ0FBQSxNQUFBLENBQUEsQ0FBQTs7Ozs7Ozs7QUFQQSxhQUFBLENBQUEsWUFBQSxDQUFBLE1BQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDREEsSUFBQSxRQUFBLEdBQUEsT0FBQSxDQUFBLFVBQUEsQ0FBQTs7QUFDQSxJQUFBLFFBQUEsR0FBQSxPQUFBLENBQUEsVUFBQSxDQUFBOztBQUNBLElBQUEsRUFBQSxHQUFBLHVCQUFBLENBQUEsT0FBQSxDQUFBLE1BQUEsQ0FBQSxDQUFBOztBQUNBLElBQUEsT0FBQSxHQUFBLHNCQUFBLENBQUEsT0FBQSxDQUFBLGtCQUFBLENBQUEsQ0FBQTs7QUFD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QUEsQ0FBQSxLQUFBLENBQUEsTUFBQSxDQUFiLE1BQVksQ0FBWjtBQUNBLFFBQUEsQ0FBQyxJQUFHLFFBQVEsQ0FBQyxLQUFBLE1BQUEsQ0FBQSxLQUFBLENBQUEsTUFBQSxDQUFiLEdBQVksQ0FBWjtBQUNIOztBQUNELGFBQUEsQ0FBQTtBQUNIOzs7Ozs7Ozs7Ozs7Ozs7QUNuN0NMLElBQUEsTUFBQSxHQUFBLE9BQUEsQ0FBQSxhQUFBLENBQUE7O0FBQUEsTUFBQSxDQUFBLElBQUEsQ0FBQSxNQUFBLEVBQUEsT0FBQSxDQUFBLFVBQUEsR0FBQSxFQUFBO0FBQUEsTUFBQSxHQUFBLEtBQUEsU0FBQSxJQUFBLEdBQUEsS0FBQSxZQUFBLEVBQUE7QUFBQSxFQUFBLE1BQUEsQ0FBQSxjQUFBLENBQUEsT0FBQSxFQUFBLEdBQUEsRUFBQTtBQUFBLElBQUEsVUFBQSxFQUFBLElBQUE7QUFBQSxJQUFBLEdBQUEsRUFBQSxTQUFBLEdBQUEsR0FBQTtBQUFBLGFBQUEsTUFBQSxDQUFBLEdBQUEsQ0FBQTtBQUFBO0FBQUEsR0FBQTtBQUFBLENBQUEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgKiBhcyBkMyBmcm9tIFwiLi9kM1wiO1xuaW1wb3J0IHtUZW1wbGF0ZXN9IGZyb20gXCIuL3RlbXBsYXRlc1wiO1xuaW1wb3J0IHtpMThufSBmcm9tIFwiLi9pMThuL2kxOG5cIjtcbmltcG9ydCB7VXRpbHN9IGZyb20gXCJzZC11dGlsc1wiO1xuXG5leHBvcnQgY2xhc3MgQXBwVXRpbHMge1xuXG4gICAgc3RhdGljIHNhbml0aXplSGVpZ2h0ID0gZnVuY3Rpb24gKGhlaWdodCwgY29udGFpbmVyKSB7XG4gICAgICAgIHJldHVybiAoaGVpZ2h0IHx8IHBhcnNlSW50KGNvbnRhaW5lci5zdHlsZSgnaGVpZ2h0JyksIDEwKSB8fCA0MDApO1xuICAgIH07XG5cbiAgICBzdGF0aWMgc2FuaXRpemVXaWR0aCA9IGZ1bmN0aW9uICh3aWR0aCwgY29udGFpbmVyKSB7XG4gICAgICAgIHJldHVybiAod2lkdGggfHwgcGFyc2VJbnQoY29udGFpbmVyLnN0eWxlKCd3aWR0aCcpLCAxMCkgfHwgOTYwKTtcbiAgICB9O1xuXG4gICAgc3RhdGljIGF2YWlsYWJsZUhlaWdodCA9IGZ1bmN0aW9uIChoZWlnaHQsIGNvbnRhaW5lciwgbWFyZ2luKSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1heCgwLCBBcHBVdGlscy5zYW5pdGl6ZUhlaWdodChoZWlnaHQsIGNvbnRhaW5lcikgLSBtYXJnaW4udG9wIC0gbWFyZ2luLmJvdHRvbSk7XG4gICAgfTtcblxuICAgIHN0YXRpYyBhdmFpbGFibGVXaWR0aCA9IGZ1bmN0aW9uICh3aWR0aCwgY29udGFpbmVyLCBtYXJnaW4pIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KDAsIEFwcFV0aWxzLnNhbml0aXplV2lkdGgod2lkdGgsIGNvbnRhaW5lcikgLSBtYXJnaW4ubGVmdCAtIG1hcmdpbi5yaWdodCk7XG4gICAgfTtcblxuICAgIC8vcGxhY2VzIHRleHRTdHJpbmcgaW4gdGV4dE9iaiwgYWRkcyBhbiBlbGxpcHNpcyBpZiB0ZXh0IGNhbid0IGZpdCBpbiB3aWR0aFxuICAgIHN0YXRpYyBwbGFjZVRleHRXaXRoRWxsaXBzaXModGV4dEQzT2JqLCB0ZXh0U3RyaW5nLCB3aWR0aCkge1xuICAgICAgICB2YXIgdGV4dE9iaiA9IHRleHREM09iai5ub2RlKCk7XG4gICAgICAgIHRleHRPYmoudGV4dENvbnRlbnQgPSB0ZXh0U3RyaW5nO1xuXG4gICAgICAgIHZhciBtYXJnaW4gPSAwO1xuICAgICAgICB2YXIgZWxsaXBzaXNMZW5ndGggPSA5O1xuICAgICAgICAvL2VsbGlwc2lzIGlzIG5lZWRlZFxuICAgICAgICBpZiAodGV4dE9iai5nZXRDb21wdXRlZFRleHRMZW5ndGgoKSA+IHdpZHRoICsgbWFyZ2luKSB7XG4gICAgICAgICAgICBmb3IgKHZhciB4ID0gdGV4dFN0cmluZy5sZW5ndGggLSAzOyB4ID4gMDsgeCAtPSAxKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRleHRPYmouZ2V0U3ViU3RyaW5nTGVuZ3RoKDAsIHgpICsgZWxsaXBzaXNMZW5ndGggPD0gd2lkdGggKyBtYXJnaW4pIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dE9iai50ZXh0Q29udGVudCA9IHRleHRTdHJpbmcuc3Vic3RyaW5nKDAsIHgpICsgXCIuLi5cIjtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGV4dE9iai50ZXh0Q29udGVudCA9IFwiLi4uXCI7IC8vY2FuJ3QgcGxhY2UgYXQgYWxsXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgc3RhdGljIHBsYWNlVGV4dFdpdGhFbGxpcHNpc0FuZFRvb2x0aXAodGV4dEQzT2JqLCB0ZXh0U3RyaW5nLCB3aWR0aCwgdG9vbHRpcCkge1xuICAgICAgICB2YXIgZWxsaXBzaXNQbGFjZWQgPSBBcHBVdGlscy5wbGFjZVRleHRXaXRoRWxsaXBzaXModGV4dEQzT2JqLCB0ZXh0U3RyaW5nLCB3aWR0aCk7XG4gICAgICAgIGlmIChlbGxpcHNpc1BsYWNlZCAmJiB0b29sdGlwKSB7XG4gICAgICAgICAgICB0ZXh0RDNPYmoub24oXCJtb3VzZW92ZXJcIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICB0b29sdGlwLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgICAgICAgICAuZHVyYXRpb24oMjAwKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIC45KTtcbiAgICAgICAgICAgICAgICB0b29sdGlwLmh0bWwodGV4dFN0cmluZylcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwibGVmdFwiLCAoZDMuZXZlbnQucGFnZVggKyA1KSArIFwicHhcIilcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwidG9wXCIsIChkMy5ldmVudC5wYWdlWSAtIDI4KSArIFwicHhcIik7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGV4dEQzT2JqLm9uKFwibW91c2VvdXRcIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICB0b29sdGlwLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgICAgICAgICAuZHVyYXRpb24oNTAwKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHN0YXRpYyBnZXRGb250U2l6ZShlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50LCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKFwiZm9udC1zaXplXCIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXRUcmFuc2xhdGlvbih0cmFuc2Zvcm0pIHtcbiAgICAgICAgLy8gQ3JlYXRlIGEgZHVtbXkgZyBmb3IgY2FsY3VsYXRpb24gcHVycG9zZXMgb25seS4gVGhpcyB3aWxsIG5ldmVyXG4gICAgICAgIC8vIGJlIGFwcGVuZGVkIHRvIHRoZSBET00gYW5kIHdpbGwgYmUgZGlzY2FyZGVkIG9uY2UgdGhpcyBmdW5jdGlvblxuICAgICAgICAvLyByZXR1cm5zLlxuICAgICAgICB2YXIgZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwiZ1wiKTtcblxuICAgICAgICAvLyBTZXQgdGhlIHRyYW5zZm9ybSBhdHRyaWJ1dGUgdG8gdGhlIHByb3ZpZGVkIHN0cmluZyB2YWx1ZS5cbiAgICAgICAgZy5zZXRBdHRyaWJ1dGVOUyhudWxsLCBcInRyYW5zZm9ybVwiLCB0cmFuc2Zvcm0pO1xuXG4gICAgICAgIC8vIGNvbnNvbGlkYXRlIHRoZSBTVkdUcmFuc2Zvcm1MaXN0IGNvbnRhaW5pbmcgYWxsIHRyYW5zZm9ybWF0aW9uc1xuICAgICAgICAvLyB0byBhIHNpbmdsZSBTVkdUcmFuc2Zvcm0gb2YgdHlwZSBTVkdfVFJBTlNGT1JNX01BVFJJWCBhbmQgZ2V0XG4gICAgICAgIC8vIGl0cyBTVkdNYXRyaXguXG4gICAgICAgIHZhciBtYXRyaXggPSBnLnRyYW5zZm9ybS5iYXNlVmFsLmNvbnNvbGlkYXRlKCkubWF0cml4O1xuXG4gICAgICAgIC8vIEFzIHBlciBkZWZpbml0aW9uIHZhbHVlcyBlIGFuZCBmIGFyZSB0aGUgb25lcyBmb3IgdGhlIHRyYW5zbGF0aW9uLlxuICAgICAgICByZXR1cm4gW21hdHJpeC5lLCBtYXRyaXguZl07XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgY2xvc2VzdFBvaW50KHBhdGhOb2RlLCBwb2ludCkge1xuICAgICAgICB2YXIgcGF0aExlbmd0aCA9IHBhdGhOb2RlLmdldFRvdGFsTGVuZ3RoKCksXG4gICAgICAgICAgICBwcmVjaXNpb24gPSA4LFxuICAgICAgICAgICAgYmVzdCxcbiAgICAgICAgICAgIGJlc3RMZW5ndGgsXG4gICAgICAgICAgICBiZXN0RGlzdGFuY2UgPSBJbmZpbml0eTtcblxuICAgICAgICAvLyBsaW5lYXIgc2NhbiBmb3IgY29hcnNlIGFwcHJveGltYXRpb25cbiAgICAgICAgZm9yICh2YXIgc2Nhbiwgc2Nhbkxlbmd0aCA9IDAsIHNjYW5EaXN0YW5jZTsgc2Nhbkxlbmd0aCA8PSBwYXRoTGVuZ3RoOyBzY2FuTGVuZ3RoICs9IHByZWNpc2lvbikge1xuICAgICAgICAgICAgaWYgKChzY2FuRGlzdGFuY2UgPSBkaXN0YW5jZTIoc2NhbiA9IHBhdGhOb2RlLmdldFBvaW50QXRMZW5ndGgoc2Nhbkxlbmd0aCkpKSA8IGJlc3REaXN0YW5jZSkge1xuICAgICAgICAgICAgICAgIGJlc3QgPSBzY2FuLCBiZXN0TGVuZ3RoID0gc2Nhbkxlbmd0aCwgYmVzdERpc3RhbmNlID0gc2NhbkRpc3RhbmNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gYmluYXJ5IHNlYXJjaCBmb3IgcHJlY2lzZSBlc3RpbWF0ZVxuICAgICAgICBwcmVjaXNpb24gLz0gMjtcbiAgICAgICAgd2hpbGUgKHByZWNpc2lvbiA+IDAuNSkge1xuICAgICAgICAgICAgdmFyIGJlZm9yZSxcbiAgICAgICAgICAgICAgICBhZnRlcixcbiAgICAgICAgICAgICAgICBiZWZvcmVMZW5ndGgsXG4gICAgICAgICAgICAgICAgYWZ0ZXJMZW5ndGgsXG4gICAgICAgICAgICAgICAgYmVmb3JlRGlzdGFuY2UsXG4gICAgICAgICAgICAgICAgYWZ0ZXJEaXN0YW5jZTtcbiAgICAgICAgICAgIGlmICgoYmVmb3JlTGVuZ3RoID0gYmVzdExlbmd0aCAtIHByZWNpc2lvbikgPj0gMCAmJiAoYmVmb3JlRGlzdGFuY2UgPSBkaXN0YW5jZTIoYmVmb3JlID0gcGF0aE5vZGUuZ2V0UG9pbnRBdExlbmd0aChiZWZvcmVMZW5ndGgpKSkgPCBiZXN0RGlzdGFuY2UpIHtcbiAgICAgICAgICAgICAgICBiZXN0ID0gYmVmb3JlLCBiZXN0TGVuZ3RoID0gYmVmb3JlTGVuZ3RoLCBiZXN0RGlzdGFuY2UgPSBiZWZvcmVEaXN0YW5jZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKGFmdGVyTGVuZ3RoID0gYmVzdExlbmd0aCArIHByZWNpc2lvbikgPD0gcGF0aExlbmd0aCAmJiAoYWZ0ZXJEaXN0YW5jZSA9IGRpc3RhbmNlMihhZnRlciA9IHBhdGhOb2RlLmdldFBvaW50QXRMZW5ndGgoYWZ0ZXJMZW5ndGgpKSkgPCBiZXN0RGlzdGFuY2UpIHtcbiAgICAgICAgICAgICAgICBiZXN0ID0gYWZ0ZXIsIGJlc3RMZW5ndGggPSBhZnRlckxlbmd0aCwgYmVzdERpc3RhbmNlID0gYWZ0ZXJEaXN0YW5jZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcHJlY2lzaW9uIC89IDI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBiZXN0ID0gW2Jlc3QueCwgYmVzdC55XTtcbiAgICAgICAgYmVzdC5kaXN0YW5jZSA9IE1hdGguc3FydChiZXN0RGlzdGFuY2UpO1xuICAgICAgICByZXR1cm4gYmVzdDtcblxuICAgICAgICBmdW5jdGlvbiBkaXN0YW5jZTIocCkge1xuICAgICAgICAgICAgdmFyIGR4ID0gcC54IC0gcG9pbnRbMF0sXG4gICAgICAgICAgICAgICAgZHkgPSBwLnkgLSBwb2ludFsxXTtcbiAgICAgICAgICAgIHJldHVybiBkeCAqIGR4ICsgZHkgKiBkeTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBncm93bChtZXNzYWdlLCB0eXBlPSdpbmZvJywgcG9zaXRpb249J3JpZ2h0JywgdGltZSA9IDIwMDApe1xuICAgICAgICB2YXIgaHRtbCA9IFRlbXBsYXRlcy5nZXQoJ2dyb3dsJywge21lc3NhZ2U6bWVzc2FnZSwgdHlwZTp0eXBlfSlcblxuICAgICAgICB2YXIgZyA9IGQzLnNlbGVjdCgnYm9keScpLnNlbGVjdE9yQXBwZW5kKCdkaXYuc2QtZ3Jvd2wtbGlzdC4nK3Bvc2l0aW9uKS5hcHBlbmQoJ2RpdicpLmh0bWwoaHRtbCk7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGcucmVtb3ZlKCk7XG4gICAgICAgIH0sIHRpbWUpXG4gICAgfVxuXG5cbiAgICBzdGF0aWMgY3JlYXRlRWxlbWVudCh0YWcsIGF0dHJpYnMsIHBhcmVudCkge1xuICAgICAgICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XG5cbiAgICAgICAgaWYgKGF0dHJpYnMpIHtcbiAgICAgICAgICAgIEFwcFV0aWxzLmRlZXBFeHRlbmQoZWwsIGF0dHJpYnMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChlbCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsO1xuICAgIH07XG5cbiAgICBzdGF0aWMgcmVtb3ZlRWxlbWVudChlbGVtZW50KSB7XG4gICAgICAgIGVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbGVtZW50KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgcmVwbGFjZVVybHModGV4dCl7XG4gICAgICAgIGlmKCF0ZXh0KXtcbiAgICAgICAgICAgIHJldHVybiB0ZXh0O1xuICAgICAgICB9XG4gICAgICAgIHZhciB1cmxSZWdleHAgPSAvKChmdHB8aHR0cHxodHRwcyk6XFwvXFwvKFxcdys6ezAsMX1cXHcqQCk/KFxcUyspKDpbMC05XSspPyhcXC98XFwvKFtcXHcjITouPys9JiVAIVxcLVxcL10pKT8pL1xuXG4gICAgICAgIHJldHVybiB0ZXh0LnJlcGxhY2UodXJsUmVnZXhwLCAnPGEgaHJlZj1cIiQxXCIgdGFyZ2V0PVwiX2JsYW5rXCI+JDE8L2E+Jyk7XG4gICAgfVxuXG4gICAgc3RhdGljIGVzY2FwZUh0bWwoaHRtbClcbiAgICB7XG4gICAgICAgIHZhciB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoaHRtbCk7XG4gICAgICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZGl2LmFwcGVuZENoaWxkKHRleHQpO1xuICAgICAgICByZXR1cm4gZGl2LmlubmVySFRNTDtcbiAgICB9XG5cbiAgICBzdGF0aWMgZGlzcGF0Y2hIdG1sRXZlbnQoZWxlbWVudCwgbmFtZSl7XG4gICAgICAgIGlmIChcImNyZWF0ZUV2ZW50XCIgaW4gZG9jdW1lbnQpIHtcbiAgICAgICAgICAgIHZhciBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudChcIkhUTUxFdmVudHNcIik7XG4gICAgICAgICAgICBldnQuaW5pdEV2ZW50KG5hbWUsIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICAgIGVsZW1lbnQuZGlzcGF0Y2hFdmVudChldnQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGVsZW1lbnQuZmlyZUV2ZW50KFwib25cIituYW1lKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZGlzcGF0Y2hFdmVudChuYW1lLCBkYXRhKXtcbiAgICAgICAgdmFyIGV2ZW50O1xuICAgICAgICB0cnl7XG4gICAgICAgICAgICBldmVudCA9IG5ldyAgQ3VzdG9tRXZlbnQobmFtZSx7ICdkZXRhaWwnOiBkYXRhIH0pO1xuICAgICAgICB9Y2F0Y2ggKGUpeyAvL0lFXG4gICAgICAgICAgICBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuICAgICAgICAgICAgZXZlbnQuaW5pdEN1c3RvbUV2ZW50KG5hbWUsIGZhbHNlLCBmYWxzZSwgZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldFZhbGlkYXRpb25NZXNzYWdlKGVycm9yKXtcbiAgICAgICAgaWYoVXRpbHMuaXNTdHJpbmcoZXJyb3IpKXtcbiAgICAgICAgICAgIGVycm9yID0ge25hbWU6IGVycm9yfTtcbiAgICAgICAgfVxuICAgICAgICB2YXIga2V5ID0gJ3ZhbGlkYXRpb24uJyArIGVycm9yLm5hbWU7XG4gICAgICAgIHJldHVybiBpMThuLnQoa2V5LCBlcnJvci5kYXRhKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaGlkZShzZWxlY3Rpb24pe1xuICAgICAgICBzZWxlY3Rpb24uY2xhc3NlZCgnc2QtaGlkZGVuJywgdHJ1ZSk7XG4gICAgfVxuXG4gICAgc3RhdGljIHNob3coc2VsZWN0aW9uLCBzaG93PXRydWUpe1xuICAgICAgICBzZWxlY3Rpb24uY2xhc3NlZCgnc2QtaGlkZGVuJywgIXNob3cpO1xuICAgIH1cblxuXG5cbiAgICBzdGF0aWMgaXNIaWRkZW4oZWwsIGV4YWN0ID0gdHJ1ZSkge1xuICAgICAgICBpZighZWwpe1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYoZXhhY3Qpe1xuICAgICAgICAgICAgdmFyIHN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwpO1xuICAgICAgICAgICAgcmV0dXJuIChzdHlsZS5kaXNwbGF5ID09PSAnbm9uZScpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChlbC5vZmZzZXRQYXJlbnQgPT09IG51bGwpXG4gICAgfVxuXG4gICAgc3RhdGljIGdldEpTT04odXJsLCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHhoci5vcGVuKCdnZXQnLCB1cmwsIHRydWUpO1xuICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuICAgICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHN0YXR1cyA9IHhoci5zdGF0dXM7XG4gICAgICAgICAgICBpZiAoc3RhdHVzID09IDIwMCkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHhoci5yZXNwb25zZSwgbnVsbCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIHN0YXR1cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHhoci5zZW5kKCk7XG4gICAgfVxufVxuIiwiaW1wb3J0ICogYXMgZDMgZnJvbSAnLi4vZDMnXG5cbi8qYmFzZWQgb246XG4gKiBnaXRodWIuY29tL3BhdG9yamsvZDMtY29udGV4dC1tZW51ICovXG5cbmV4cG9ydCBjbGFzcyBDb250ZXh0TWVudSB7XG4gICAgb3BlbkNhbGxiYWNrO1xuICAgIGNsb3NlQ2FsbGJhY2s7XG5cbiAgICBjb25zdHJ1Y3RvcihtZW51LCBvcHRzKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICBpZiAodHlwZW9mIG9wdHMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHNlbGYub3BlbkNhbGxiYWNrID0gb3B0cztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9wdHMgPSBvcHRzIHx8IHt9O1xuICAgICAgICAgICAgc2VsZi5vcGVuQ2FsbGJhY2sgPSBvcHRzLm9uT3BlbjtcbiAgICAgICAgICAgIHNlbGYuY2xvc2VDYWxsYmFjayA9IG9wdHMub25DbG9zZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgZGl2IGVsZW1lbnQgdGhhdCB3aWxsIGhvbGQgdGhlIGNvbnRleHQgbWVudVxuICAgICAgICBkMy5zZWxlY3RBbGwoJy5kMy1jb250ZXh0LW1lbnUnKS5kYXRhKFsxXSlcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2QzLWNvbnRleHQtbWVudScpO1xuXG4gICAgICAgIC8vIGNsb3NlIG1lbnVcbiAgICAgICAgZDMuc2VsZWN0KCdib2R5Jykub24oJ2NsaWNrLmQzLWNvbnRleHQtbWVudScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGQzLnNlbGVjdCgnLmQzLWNvbnRleHQtbWVudScpLnN0eWxlKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgIGlmIChzZWxmLmNsb3NlQ2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBzZWxmLmNsb3NlQ2FsbGJhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gdGhpcyBnZXRzIGV4ZWN1dGVkIHdoZW4gYSBjb250ZXh0bWVudSBldmVudCBvY2N1cnNcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChkYXRhLCBpbmRleCkge1xuICAgICAgICAgICAgdmFyIGVsbSA9IHRoaXM7XG5cbiAgICAgICAgICAgIGQzLnNlbGVjdEFsbCgnLmQzLWNvbnRleHQtbWVudScpLmh0bWwoJycpO1xuICAgICAgICAgICAgdmFyIGxpc3QgPSBkMy5zZWxlY3RBbGwoJy5kMy1jb250ZXh0LW1lbnUnKVxuICAgICAgICAgICAgICAgIC5vbignY29udGV4dG1lbnUnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3QoJy5kMy1jb250ZXh0LW1lbnUnKS5zdHlsZSgnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICAgICAgICAgIGQzLmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGQzLmV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgndWwnKTtcbiAgICAgICAgICAgIGxpc3Quc2VsZWN0QWxsKCdsaScpLmRhdGEodHlwZW9mIG1lbnUgPT09ICdmdW5jdGlvbicgPyBtZW51KGRhdGEpIDogbWVudSkuZW50ZXIoKVxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJ2xpJylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmV0ID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkLmRpdmlkZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldCArPSAnIGlzLWRpdmlkZXInO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChkLmRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXQgKz0gJyBpcy1kaXNhYmxlZCc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFkLmFjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0ICs9ICcgaXMtaGVhZGVyJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmh0bWwoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGQuZGl2aWRlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8aHI+JztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIWQudGl0bGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ05vIHRpdGxlIGF0dHJpYnV0ZSBzZXQuIENoZWNrIHRoZSBzcGVsbGluZyBvZiB5b3VyIG9wdGlvbnMuJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICh0eXBlb2YgZC50aXRsZSA9PT0gJ3N0cmluZycpID8gZC50aXRsZSA6IGQudGl0bGUoZGF0YSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGQuZGlzYWJsZWQpIHJldHVybjsgLy8gZG8gbm90aGluZyBpZiBkaXNhYmxlZFxuICAgICAgICAgICAgICAgICAgICBpZiAoIWQuYWN0aW9uKSByZXR1cm47IC8vIGhlYWRlcnMgaGF2ZSBubyBcImFjdGlvblwiXG4gICAgICAgICAgICAgICAgICAgIGQuYWN0aW9uKGVsbSwgZGF0YSwgaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3QoJy5kMy1jb250ZXh0LW1lbnUnKS5zdHlsZSgnZGlzcGxheScsICdub25lJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYuY2xvc2VDYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jbG9zZUNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gdGhlIG9wZW5DYWxsYmFjayBhbGxvd3MgYW4gYWN0aW9uIHRvIGZpcmUgYmVmb3JlIHRoZSBtZW51IGlzIGRpc3BsYXllZFxuICAgICAgICAgICAgLy8gYW4gZXhhbXBsZSB1c2FnZSB3b3VsZCBiZSBjbG9zaW5nIGEgdG9vbHRpcFxuICAgICAgICAgICAgaWYgKHNlbGYub3BlbkNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYub3BlbkNhbGxiYWNrKGRhdGEsIGluZGV4KSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gZGlzcGxheSBjb250ZXh0IG1lbnVcbiAgICAgICAgICAgIGQzLnNlbGVjdCgnLmQzLWNvbnRleHQtbWVudScpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdsZWZ0JywgKGQzLmV2ZW50LnBhZ2VYIC0gMikgKyAncHgnKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgndG9wJywgKGQzLmV2ZW50LnBhZ2VZIC0gMikgKyAncHgnKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnZGlzcGxheScsICdibG9jaycpO1xuXG4gICAgICAgICAgICBkMy5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZDMuZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHN0YXRpYyBoaWRlKCkge1xuICAgICAgICBkMy5zZWxlY3QoJy5kMy1jb250ZXh0LW1lbnUnKS5zdHlsZSgnZGlzcGxheScsICdub25lJyk7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQge0NvbnRleHRNZW51fSBmcm9tICcuL2NvbnRleHQtbWVudSdcbmltcG9ydCB7aTE4bn0gZnJvbSBcIi4uL2kxOG4vaTE4blwiO1xuXG5leHBvcnQgY2xhc3MgRWRnZUNvbnRleHRNZW51IGV4dGVuZHMgQ29udGV4dE1lbnUge1xuICAgIHRyZWVEZXNpZ25lcjtcblxuICAgIGNvbnN0cnVjdG9yKHRyZWVEZXNpZ25lcikge1xuICAgICAgICB2YXIgbWVudSA9IGZ1bmN0aW9uIChkKSB7XG5cbiAgICAgICAgICAgIHZhciBtZW51ID0gW107XG5cbiAgICAgICAgICAgIG1lbnUucHVzaCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUuZWRnZS5pbmplY3REZWNpc2lvbk5vZGUnKSxcbiAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLmluamVjdERlY2lzaW9uTm9kZShkKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbWVudS5wdXNoKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5lZGdlLmluamVjdENoYW5jZU5vZGUnKSxcbiAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLmluamVjdENoYW5jZU5vZGUoZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICByZXR1cm4gbWVudTtcbiAgICAgICAgfTtcblxuICAgICAgICBzdXBlcihtZW51KTtcbiAgICAgICAgdGhpcy50cmVlRGVzaWduZXIgPSB0cmVlRGVzaWduZXI7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtDb250ZXh0TWVudX0gZnJvbSAnLi9jb250ZXh0LW1lbnUnXG5pbXBvcnQge2RvbWFpbiBhcyBtb2RlbH0gZnJvbSAnc2QtbW9kZWwnXG5pbXBvcnQgKiBhcyBkMyBmcm9tICcuLi9kMydcbmltcG9ydCB7aTE4bn0gZnJvbSBcIi4uL2kxOG4vaTE4blwiO1xuXG5leHBvcnQgY2xhc3MgTWFpbkNvbnRleHRNZW51IGV4dGVuZHMgQ29udGV4dE1lbnUge1xuICAgIHRyZWVEZXNpZ25lcjtcblxuICAgIGNvbnN0cnVjdG9yKHRyZWVEZXNpZ25lcikge1xuICAgICAgICB2YXIgbW91c2VQb3NpdGlvbiA9IG51bGw7XG4gICAgICAgIHZhciBtZW51ID0gZnVuY3Rpb24gKGQpIHtcblxuICAgICAgICAgICAgdmFyIG1lbnUgPSBbXTtcbiAgICAgICAgICAgIG1lbnUucHVzaCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubWFpbi5hZGREZWNpc2lvbk5vZGUnKSxcbiAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld05vZGUgPSBuZXcgbW9kZWwuRGVjaXNpb25Ob2RlKG1vdXNlUG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuYWRkTm9kZShuZXdOb2RlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbWVudS5wdXNoKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5tYWluLmFkZENoYW5jZU5vZGUnKSxcbiAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld05vZGUgPSBuZXcgbW9kZWwuQ2hhbmNlTm9kZShtb3VzZVBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLmFkZE5vZGUobmV3Tm9kZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG1lbnUucHVzaCh7ZGl2aWRlcjogdHJ1ZX0pO1xuICAgICAgICAgICAgbWVudS5wdXNoKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5tYWluLmFkZFRleHQnKSxcbiAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld1RleHQgPSBuZXcgbW9kZWwuVGV4dChtb3VzZVBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLmFkZFRleHQobmV3VGV4dCk7XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBtZW51LnB1c2goe2RpdmlkZXI6IHRydWV9KTtcbiAgICAgICAgICAgIG1lbnUucHVzaCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubWFpbi5wYXN0ZScpLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIucGFzdGVUb05ld0xvY2F0aW9uKG1vdXNlUG9zaXRpb24pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICF0cmVlRGVzaWduZXIuY29waWVkTm9kZXMgfHwgIXRyZWVEZXNpZ25lci5jb3BpZWROb2Rlcy5sZW5ndGhcblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBtZW51LnB1c2goe2RpdmlkZXI6IHRydWV9KTtcblxuICAgICAgICAgICAgbWVudS5wdXNoKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5tYWluLnNlbGVjdEFsbE5vZGVzJyksXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5zZWxlY3RBbGxOb2RlcygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIG1lbnU7XG4gICAgICAgIH07XG5cbiAgICAgICAgc3VwZXIobWVudSwge29uT3BlbjogKCkgPT4ge1xuICAgICAgICAgICAgdHJlZURlc2lnbmVyLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgICAgICBtb3VzZVBvc2l0aW9uID0gbmV3IG1vZGVsLlBvaW50KGQzLm1vdXNlKHRyZWVEZXNpZ25lci5zdmcubm9kZSgpKSkubW92ZSh0cmVlRGVzaWduZXIuZ2V0TWFpbkdyb3VwVHJhbnNsYXRpb24odHJ1ZSkpO1xuXG4gICAgICAgIH19KTtcbiAgICAgICAgdGhpcy50cmVlRGVzaWduZXIgPSB0cmVlRGVzaWduZXI7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtDb250ZXh0TWVudX0gZnJvbSAnLi9jb250ZXh0LW1lbnUnXG5pbXBvcnQge2RvbWFpbiBhcyBtb2RlbH0gZnJvbSAnc2QtbW9kZWwnXG5pbXBvcnQge2kxOG59IGZyb20gXCIuLi9pMThuL2kxOG5cIjtcblxuZXhwb3J0IGNsYXNzIE5vZGVDb250ZXh0TWVudSBleHRlbmRzIENvbnRleHRNZW51IHtcbiAgICB0cmVlRGVzaWduZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcih0cmVlRGVzaWduZXIsIG9wZXJhdGlvbnNGb3JPYmplY3QpIHtcbiAgICAgICAgdmFyIG1lbnUgPSBmdW5jdGlvbiAoZCkge1xuXG4gICAgICAgICAgICB2YXIgY29weU1lbnVJdGVtID0ge1xuICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm5vZGUuY29weScpLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuc2VsZWN0Tm9kZShkLCAhdHJlZURlc2lnbmVyLmlzTm9kZVNlbGVjdGVkKGQpKTtcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLmNvcHlTZWxlY3RlZE5vZGVzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZhciBjdXRNZW51SXRlbSA9IHtcbiAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5ub2RlLmN1dCcpLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuc2VsZWN0Tm9kZShkLCAhdHJlZURlc2lnbmVyLmlzTm9kZVNlbGVjdGVkKGQpKTtcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLmN1dFNlbGVjdGVkTm9kZXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIHBhc3RlTWVudUl0ZW0gPSB7XG4gICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubm9kZS5wYXN0ZScpLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIucGFzdGVUb05vZGUoZCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogZC5mb2xkZWQgfHwgIXRyZWVEZXNpZ25lci5jb3BpZWROb2RlcyB8fCAhdHJlZURlc2lnbmVyLmNvcGllZE5vZGVzLmxlbmd0aFxuXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIGRlbGV0ZU1lbnVJdGVtID0ge1xuICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm5vZGUuZGVsZXRlJyksXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLnNlbGVjdE5vZGUoZCwgIXRyZWVEZXNpZ25lci5pc05vZGVTZWxlY3RlZChkKSk7XG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5yZW1vdmVTZWxlY3RlZE5vZGVzKCk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB2YXIgbWVudSA9IFtdO1xuICAgICAgICAgICAgaWYgKGQudHlwZSA9PSBtb2RlbC5UZXJtaW5hbE5vZGUuJFRZUEUpIHtcbiAgICAgICAgICAgICAgICBtZW51ID0gW2NvcHlNZW51SXRlbSwgY3V0TWVudUl0ZW0sIGRlbGV0ZU1lbnVJdGVtXTtcbiAgICAgICAgICAgICAgICBOb2RlQ29udGV4dE1lbnUuYWRkTm9kZUNvbnZlcnNpb25PcHRpb25zKGQsIG1lbnUsIHRyZWVEZXNpZ25lcik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1lbnU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKCFkLmZvbGRlZCl7XG4gICAgICAgICAgICAgICAgbWVudS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubm9kZS5hZGREZWNpc2lvbk5vZGUnKSxcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuYWRkRGVjaXNpb25Ob2RlKGQpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBtZW51LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5ub2RlLmFkZENoYW5jZU5vZGUnKSxcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuYWRkQ2hhbmNlTm9kZShkKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbWVudS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubm9kZS5hZGRUZXJtaW5hbE5vZGUnKSxcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuYWRkVGVybWluYWxOb2RlKGQpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBtZW51LnB1c2goe2RpdmlkZXI6IHRydWV9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbWVudS5wdXNoKGNvcHlNZW51SXRlbSk7XG4gICAgICAgICAgICBtZW51LnB1c2goY3V0TWVudUl0ZW0pO1xuICAgICAgICAgICAgbWVudS5wdXNoKHBhc3RlTWVudUl0ZW0pO1xuICAgICAgICAgICAgbWVudS5wdXNoKGRlbGV0ZU1lbnVJdGVtKTtcblxuICAgICAgICAgICAgTm9kZUNvbnRleHRNZW51LmFkZE5vZGVDb252ZXJzaW9uT3B0aW9ucyhkLCBtZW51LCB0cmVlRGVzaWduZXIpO1xuICAgICAgICAgICAgbWVudS5wdXNoKHtkaXZpZGVyOiB0cnVlfSk7XG4gICAgICAgICAgICBtZW51LnB1c2goe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm5vZGUuc2VsZWN0U3VidHJlZScpLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuc2VsZWN0U3ViVHJlZShkLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYoIWQuZm9sZGVkKXtcbiAgICAgICAgICAgICAgICBtZW51LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5ub2RlLmZvbGQnKSxcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuZm9sZFN1YnRyZWUoZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIG1lbnUucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm5vZGUudW5mb2xkJyksXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLmZvbGRTdWJ0cmVlKGQsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihvcGVyYXRpb25zRm9yT2JqZWN0KXtcbiAgICAgICAgICAgICAgICB2YXIgb3BlcmF0aW9ucyA9IG9wZXJhdGlvbnNGb3JPYmplY3QoZCk7XG4gICAgICAgICAgICAgICAgaWYob3BlcmF0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgbWVudS5wdXNoKHtkaXZpZGVyOiB0cnVlfSk7XG4gICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvbnMuZm9yRWFjaChvcD0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVudS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5ub2RlLicrb3AubmFtZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5wZXJmb3JtT3BlcmF0aW9uKGQsIG9wKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhb3AuY2FuUGVyZm9ybShkKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gbWVudTtcbiAgICAgICAgfTtcblxuICAgICAgICBzdXBlcihtZW51KTtcbiAgICAgICAgdGhpcy50cmVlRGVzaWduZXIgPSB0cmVlRGVzaWduZXI7XG4gICAgfVxuXG4gICAgc3RhdGljIGFkZE5vZGVDb252ZXJzaW9uT3B0aW9ucyhkLCBtZW51LCB0cmVlRGVzaWduZXIpe1xuICAgICAgICB2YXIgY29udmVyc2lvbk9wdGlvbnMgPSBOb2RlQ29udGV4dE1lbnUuZ2V0Tm9kZUNvbnZlcnNpb25PcHRpb25zKGQsIHRyZWVEZXNpZ25lcik7XG4gICAgICAgIGlmKGNvbnZlcnNpb25PcHRpb25zLmxlbmd0aCl7XG4gICAgICAgICAgICBtZW51LnB1c2goe2RpdmlkZXI6IHRydWV9KTtcbiAgICAgICAgICAgIGNvbnZlcnNpb25PcHRpb25zLmZvckVhY2gobz0+bWVudS5wdXNoKG8pKTtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGdldE5vZGVDb252ZXJzaW9uT3B0aW9ucyhkLCB0cmVlRGVzaWduZXIpe1xuICAgICAgICB2YXIgb3B0aW9ucyA9IFtdO1xuXG4gICAgICAgIGlmKGQuZm9sZGVkKXtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBhbGxBbGxvd2VkVHlwZXMgPSBbbW9kZWwuRGVjaXNpb25Ob2RlLiRUWVBFLCBtb2RlbC5DaGFuY2VOb2RlLiRUWVBFLCBtb2RlbC5UZXJtaW5hbE5vZGUuJFRZUEVdO1xuXG4gICAgICAgIGlmKCFkLmNoaWxkRWRnZXMubGVuZ3RoICYmIGQuJHBhcmVudCl7XG4gICAgICAgICAgICBhbGxBbGxvd2VkVHlwZXMuZmlsdGVyKHQ9PnQhPT1kLnR5cGUpLmZvckVhY2godHlwZT0+e1xuICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaChOb2RlQ29udGV4dE1lbnUuZ2V0Tm9kZUNvbnZlcnNpb25PcHRpb24odHlwZSwgdHJlZURlc2lnbmVyKSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgaWYoZCBpbnN0YW5jZW9mIG1vZGVsLkRlY2lzaW9uTm9kZSl7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5wdXNoKE5vZGVDb250ZXh0TWVudS5nZXROb2RlQ29udmVyc2lvbk9wdGlvbihtb2RlbC5DaGFuY2VOb2RlLiRUWVBFLCB0cmVlRGVzaWduZXIpKVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5wdXNoKE5vZGVDb250ZXh0TWVudS5nZXROb2RlQ29udmVyc2lvbk9wdGlvbihtb2RlbC5EZWNpc2lvbk5vZGUuJFRZUEUsIHRyZWVEZXNpZ25lcikpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9wdGlvbnM7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldE5vZGVDb252ZXJzaW9uT3B0aW9uKHR5cGVUb0NvbnZlcnRUbywgdHJlZURlc2lnbmVyKXtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm5vZGUuY29udmVydC4nK3R5cGVUb0NvbnZlcnRUbyksXG4gICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuY29udmVydE5vZGUoZCwgdHlwZVRvQ29udmVydFRvKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQge0NvbnRleHRNZW51fSBmcm9tICcuL2NvbnRleHQtbWVudSdcbmltcG9ydCB7aTE4bn0gZnJvbSBcIi4uL2kxOG4vaTE4blwiO1xuXG5leHBvcnQgY2xhc3MgVGV4dENvbnRleHRNZW51IGV4dGVuZHMgQ29udGV4dE1lbnUge1xuICAgIHRyZWVEZXNpZ25lcjtcblxuICAgIGNvbnN0cnVjdG9yKHRyZWVEZXNpZ25lcikge1xuICAgICAgICB2YXIgbWVudSA9IGZ1bmN0aW9uIChkKSB7XG5cblxuICAgICAgICAgICAgdmFyIGRlbGV0ZU1lbnVJdGVtID0ge1xuICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51LnRleHQuZGVsZXRlJyksXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLnNlbGVjdFRleHQoZCwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5yZW1vdmVTZWxlY3RlZFRleHRzKClcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB2YXIgbWVudSA9IFtdO1xuICAgICAgICAgICAgbWVudS5wdXNoKGRlbGV0ZU1lbnVJdGVtKTtcbiAgICAgICAgICAgIHJldHVybiBtZW51O1xuICAgICAgICB9O1xuXG4gICAgICAgIHN1cGVyKG1lbnUpO1xuICAgICAgICB0aGlzLnRyZWVEZXNpZ25lciA9IHRyZWVEZXNpZ25lcjtcbiAgICB9XG59XG4iLCJpbXBvcnQgKiBhcyBkMyBmcm9tICcuL2QzJ1xuXG5leHBvcnQgY2xhc3MgRDNFeHRlbnNpb25zIHtcblxuICAgIHN0YXRpYyBleHRlbmQoKSB7XG5cbiAgICAgICAgZDMuc2VsZWN0aW9uLnByb3RvdHlwZS5lbnRlci5wcm90b3R5cGUuaW5zZXJ0U2VsZWN0b3IgPVxuICAgICAgICAgICAgZDMuc2VsZWN0aW9uLnByb3RvdHlwZS5pbnNlcnRTZWxlY3RvciA9IGZ1bmN0aW9uIChzZWxlY3RvciwgYmVmb3JlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEQzRXh0ZW5zaW9ucy5pbnNlcnRTZWxlY3Rvcih0aGlzLCBzZWxlY3RvciwgYmVmb3JlKTtcbiAgICAgICAgICAgIH07XG5cblxuICAgICAgICBkMy5zZWxlY3Rpb24ucHJvdG90eXBlLmVudGVyLnByb3RvdHlwZS5hcHBlbmRTZWxlY3RvciA9XG4gICAgICAgICAgICBkMy5zZWxlY3Rpb24ucHJvdG90eXBlLmFwcGVuZFNlbGVjdG9yID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEQzRXh0ZW5zaW9ucy5hcHBlbmRTZWxlY3Rvcih0aGlzLCBzZWxlY3Rvcik7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIGQzLnNlbGVjdGlvbi5wcm90b3R5cGUuZW50ZXIucHJvdG90eXBlLnNlbGVjdE9yQXBwZW5kID1cbiAgICAgICAgICAgIGQzLnNlbGVjdGlvbi5wcm90b3R5cGUuc2VsZWN0T3JBcHBlbmQgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gRDNFeHRlbnNpb25zLnNlbGVjdE9yQXBwZW5kKHRoaXMsIHNlbGVjdG9yKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgZDMuc2VsZWN0aW9uLnByb3RvdHlwZS5lbnRlci5wcm90b3R5cGUuc2VsZWN0T3JJbnNlcnQgPVxuICAgICAgICAgICAgZDMuc2VsZWN0aW9uLnByb3RvdHlwZS5zZWxlY3RPckluc2VydCA9IGZ1bmN0aW9uIChzZWxlY3RvciwgYmVmb3JlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEQzRXh0ZW5zaW9ucy5zZWxlY3RPckluc2VydCh0aGlzLCBzZWxlY3RvciwgYmVmb3JlKTtcbiAgICAgICAgICAgIH07XG5cblxuICAgIH1cblxuICAgIHN0YXRpYyBpbnNlcnRPckFwcGVuZFNlbGVjdG9yKHBhcmVudCwgc2VsZWN0b3IsIG9wZXJhdGlvbiwgYmVmb3JlKSB7XG5cbiAgICAgICAgdmFyIHNlbGVjdG9yUGFydHMgPSBzZWxlY3Rvci5zcGxpdCgvKFtcXC5cXCNdKS8pO1xuICAgICAgICB2YXIgZWxlbWVudCA9IHBhcmVudFtvcGVyYXRpb25dKHNlbGVjdG9yUGFydHMuc2hpZnQoKSwgYmVmb3JlKTsvL1wiOmZpcnN0LWNoaWxkXCJcblxuICAgICAgICB3aGlsZSAoc2VsZWN0b3JQYXJ0cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICB2YXIgc2VsZWN0b3JNb2RpZmllciA9IHNlbGVjdG9yUGFydHMuc2hpZnQoKTtcbiAgICAgICAgICAgIHZhciBzZWxlY3Rvckl0ZW0gPSBzZWxlY3RvclBhcnRzLnNoaWZ0KCk7XG4gICAgICAgICAgICBpZiAoc2VsZWN0b3JNb2RpZmllciA9PT0gXCIuXCIpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5jbGFzc2VkKHNlbGVjdG9ySXRlbSwgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNlbGVjdG9yTW9kaWZpZXIgPT09IFwiI1wiKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQuYXR0cignaWQnLCBzZWxlY3Rvckl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH1cblxuICAgIHN0YXRpYyBpbnNlcnRTZWxlY3RvcihwYXJlbnQsIHNlbGVjdG9yLCBiZWZvcmUpIHtcbiAgICAgICAgcmV0dXJuIEQzRXh0ZW5zaW9ucy5pbnNlcnRPckFwcGVuZFNlbGVjdG9yKHBhcmVudCwgc2VsZWN0b3IsIFwiaW5zZXJ0XCIsIGJlZm9yZSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGFwcGVuZFNlbGVjdG9yKHBhcmVudCwgc2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIEQzRXh0ZW5zaW9ucy5pbnNlcnRPckFwcGVuZFNlbGVjdG9yKHBhcmVudCwgc2VsZWN0b3IsIFwiYXBwZW5kXCIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBzZWxlY3RPckFwcGVuZChwYXJlbnQsIHNlbGVjdG9yLCBlbGVtZW50KSB7XG4gICAgICAgIHZhciBzZWxlY3Rpb24gPSBwYXJlbnQuc2VsZWN0KHNlbGVjdG9yKTtcbiAgICAgICAgaWYgKHNlbGVjdGlvbi5lbXB0eSgpKSB7XG4gICAgICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXJlbnQuYXBwZW5kKGVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIEQzRXh0ZW5zaW9ucy5hcHBlbmRTZWxlY3RvcihwYXJlbnQsIHNlbGVjdG9yKTtcblxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzZWxlY3Rpb247XG4gICAgfTtcblxuICAgIHN0YXRpYyBzZWxlY3RPckluc2VydChwYXJlbnQsIHNlbGVjdG9yLCBiZWZvcmUpIHtcbiAgICAgICAgdmFyIHNlbGVjdGlvbiA9IHBhcmVudC5zZWxlY3Qoc2VsZWN0b3IpO1xuICAgICAgICBpZiAoc2VsZWN0aW9uLmVtcHR5KCkpIHtcbiAgICAgICAgICAgIHJldHVybiBEM0V4dGVuc2lvbnMuaW5zZXJ0U2VsZWN0b3IocGFyZW50LCBzZWxlY3RvciwgYmVmb3JlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2VsZWN0aW9uO1xuICAgIH07XG59XG4iLCJleHBvcnQgKiBmcm9tICdkMy1kaXNwYXRjaCc7XG5leHBvcnQgKiBmcm9tICdkMy1zY2FsZSc7XG5leHBvcnQgKiBmcm9tICdkMy1zZWxlY3Rpb24nO1xuZXhwb3J0ICogZnJvbSAnZDMtc2hhcGUnXG5leHBvcnQgKiBmcm9tICdkMy1kcmFnJztcbmV4cG9ydCAqIGZyb20gJ2QzLWJydXNoJ1xuZXhwb3J0ICogZnJvbSAnZDMtYXJyYXknXG5leHBvcnQgKiBmcm9tICdkMy1oaWVyYXJjaHknXG5leHBvcnQgKiBmcm9tICdkMy10aW1lLWZvcm1hdCdcbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgICBcImNvbnRleHRNZW51XCI6e1xuICAgICAgICBcIm1haW5cIjp7XG4gICAgICAgICAgICBcImFkZERlY2lzaW9uTm9kZVwiOiBcIkVudHNjaGVpZHVuZ3Nrbm90ZW4gaGluenVmw7xnZW5cIixcbiAgICAgICAgICAgIFwiYWRkQ2hhbmNlTm9kZVwiOiBcIlp1ZmFsbCBLbm90ZW4gaGluenVmw7xnZW5cIixcbiAgICAgICAgICAgIFwiYWRkVGV4dFwiOiBcIlRleHQgaGluenVmw7xnZW4gXCIsXG4gICAgICAgICAgICBcInBhc3RlXCI6IFwiRWluZsO8Z2VuXCIsXG4gICAgICAgICAgICBcInNlbGVjdEFsbE5vZGVzXCI6IFwiQWxsZSBLbm90ZW4gYXVzd8OkaGxlblwiXG4gICAgICAgIH0sXG4gICAgICAgIFwibm9kZVwiOntcbiAgICAgICAgICAgIFwiY29weVwiOiBcIktvcGllcmVuXCIsXG4gICAgICAgICAgICBcImN1dFwiOiBcIkF1c3NjaG5laWRlblwiLFxuICAgICAgICAgICAgXCJwYXN0ZVwiOiBcIkVpbmbDvGdlblwiLFxuICAgICAgICAgICAgXCJkZWxldGVcIjogXCJMw7ZzY2hlblwiLFxuICAgICAgICAgICAgXCJhZGREZWNpc2lvbk5vZGVcIjogXCJFbnRzY2hlaWR1bmdza25vdGVuIGhpbnp1ZsO8Z2VuXCIsXG4gICAgICAgICAgICBcImFkZENoYW5jZU5vZGVcIjogXCJadWZhbGwgS25vdGVuIGhpbnp1ZsO8Z2VuXCIsXG4gICAgICAgICAgICBcImFkZFRlcm1pbmFsTm9kZVwiOiBcIkVuZGtub3R0ZW4gaGluenVmw7xnZW5cIixcbiAgICAgICAgICAgIFwiY29udmVydFwiOntcbiAgICAgICAgICAgICAgICBcImRlY2lzaW9uXCI6IFwiQWxzIEVudHNjaGVpZHVuZ3Nrbm90ZW5cIixcbiAgICAgICAgICAgICAgICBcImNoYW5jZVwiOiBcIkFscyBadWZhbGwgS25vdGVuXCIsXG4gICAgICAgICAgICAgICAgXCJ0ZXJtaW5hbFwiOiBcIkFscyBFbmRrbm90ZW5cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwic2VsZWN0U3VidHJlZVwiOiBcIlRlaWxiYXVtIHfDpGhsZW5cIixcbiAgICAgICAgICAgIFwiZm9sZFwiOiBcIlRlaWxiYXVtIGZhbHRlblwiLFxuICAgICAgICAgICAgXCJ1bmZvbGRcIjogXCJUZWlsYmF1bSBlbnRmYWx0ZW5cIixcblxuICAgICAgICAgICAgXCJmbGlwU3VidHJlZVwiOiBcIlRlaWxiYXVtIHVtZHJlaGVuXCIsXG4gICAgICAgICAgICBcInBheW9mZnNUcmFuc2Zvcm1hdGlvblwiOiBcIkF1c3phaGx1bmdlbiB0cmFuc2Zvcm1pZXJlblwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiZWRnZVwiOntcbiAgICAgICAgICAgIFwiaW5qZWN0RGVjaXNpb25Ob2RlXCI6IFwiRW50c2NoZWlkdW5nc2tub3RlbiBJbmppemllcmVuXCIsXG4gICAgICAgICAgICBcImluamVjdENoYW5jZU5vZGVcIjogXCJadWZhbGwgS25vdGVuIEluaml6aWVyZW5cIlxuICAgICAgICB9LFxuICAgICAgICBcInRleHRcIjp7XG4gICAgICAgICAgICBcImRlbGV0ZVwiOiBcIkzDtnNjaGVuXCJcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXCJ2YWxpZGF0aW9uXCI6e1xuICAgICAgICBcImluY29tcGxldGVQYXRoXCI6IFwiUGZhZCwgZGVyIG5pY2h0IG1pdCBkZW0gRW5ka25vdGVuIGVuZGV0XCIsXG4gICAgICAgIFwicHJvYmFiaWxpdHlEb05vdFN1bVVwVG8xXCI6IFwiRGllIFN1bW1lIGRlciBXYWhyc2NoZWlubGljaGtlaXRlbiBpc3QgbmljaHQgZ2xlaWNoIDFcIixcbiAgICAgICAgXCJpbnZhbGlkUHJvYmFiaWxpdHlcIjogXCJVbmfDvGx0aWdlIFdhaHJzY2hlaW5saWNoa2VpdCBpbSBad2VpZyAje3tudW1iZXJ9fVwiLFxuICAgICAgICBcImludmFsaWRQYXlvZmZcIjogXCJVbmfDvGx0aWdlIEF1c3phaGx1bmcgaW4gWndlaWcgI3t7bnVtYmVyfX1cIlxuICAgIH0sXG4gICAgXCJncm93bFwiOntcbiAgICAgICAgXCJicnVzaERpc2FibGVkXCI6IFwiQXVzd2FobGLDvHJzdGUgZGVha3RpdmllcnRcIixcbiAgICAgICAgXCJicnVzaEVuYWJsZWRcIjogXCJBdXN3YWhsYsO8cnN0ZSBha3RpdmllcnRcIlxuICAgIH0sXG4gICAgXCJ0b29sdGlwXCI6e1xuICAgICAgICBcIm5vZGVcIjp7XG4gICAgICAgICAgICBcInBheW9mZlwiOiB7XG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiQXVzemFobHVuZyB7e251bWJlcn19XCIsXG4gICAgICAgICAgICAgICAgXCJuYW1lZFwiOiBcInt7bmFtZX19XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImFnZ3JlZ2F0ZWRQYXlvZmZcIjoge1xuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIkFnZ3JlZ2llcnRlIEF1c3phaGx1bmcge3tudW1iZXJ9fVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJBZ2dyZWdpZXJ0ZSB7e25hbWV9fVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJwcm9iYWJpbGl0eVRvRW50ZXJcIjogXCJXYWhyc2NoZWlubGljaGtlaXRcIlxuICAgICAgICB9LFxuICAgICAgICBcImVkZ2VcIjp7XG4gICAgICAgICAgICBcInBheW9mZlwiOiB7XG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiQXVzemFobHVuZyB7e251bWJlcn19OiB7e3ZhbHVlfX1cIixcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwie3tuYW1lfX06IHt7dmFsdWV9fVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJwcm9iYWJpbGl0eVwiOiBcIldhaHJzY2hlaW5saWNoa2VpdDoge3t2YWx1ZX19XCJcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgICBcImNvbnRleHRNZW51XCI6e1xuICAgICAgICBcIm1haW5cIjp7XG4gICAgICAgICAgICBcImFkZERlY2lzaW9uTm9kZVwiOiBcIkFkZCBEZWNpc2lvbiBOb2RlXCIsXG4gICAgICAgICAgICBcImFkZENoYW5jZU5vZGVcIjogXCJBZGQgQ2hhbmNlIE5vZGVcIixcbiAgICAgICAgICAgIFwiYWRkVGV4dFwiOiBcIkFkZCBUZXh0XCIsXG4gICAgICAgICAgICBcInBhc3RlXCI6IFwiUGFzdGVcIixcbiAgICAgICAgICAgIFwic2VsZWN0QWxsTm9kZXNcIjogXCJTZWxlY3QgYWxsIG5vZGVzXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJub2RlXCI6e1xuICAgICAgICAgICAgXCJjb3B5XCI6IFwiQ29weVwiLFxuICAgICAgICAgICAgXCJjdXRcIjogXCJDdXRcIixcbiAgICAgICAgICAgIFwicGFzdGVcIjogXCJQYXN0ZVwiLFxuICAgICAgICAgICAgXCJkZWxldGVcIjogXCJEZWxldGVcIixcbiAgICAgICAgICAgIFwiYWRkRGVjaXNpb25Ob2RlXCI6IFwiQWRkIERlY2lzaW9uIE5vZGVcIixcbiAgICAgICAgICAgIFwiYWRkQ2hhbmNlTm9kZVwiOiBcIkFkZCBDaGFuY2UgTm9kZVwiLFxuICAgICAgICAgICAgXCJhZGRUZXJtaW5hbE5vZGVcIjogXCJBZGQgVGVybWluYWwgTm9kZVwiLFxuICAgICAgICAgICAgXCJjb252ZXJ0XCI6e1xuICAgICAgICAgICAgICAgIFwiZGVjaXNpb25cIjogXCJBcyBEZWNpc2lvbiBOb2RlXCIsXG4gICAgICAgICAgICAgICAgXCJjaGFuY2VcIjogXCJBcyBDaGFuY2UgTm9kZVwiLFxuICAgICAgICAgICAgICAgIFwidGVybWluYWxcIjogXCJBcyBUZXJtaW5hbCBOb2RlXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInNlbGVjdFN1YnRyZWVcIjogXCJTZWxlY3Qgc3VidHJlZVwiLFxuICAgICAgICAgICAgXCJmb2xkXCI6IFwiRm9sZCBzdWJ0cmVlXCIsXG4gICAgICAgICAgICBcInVuZm9sZFwiOiBcIlVuZm9sZCBzdWJ0cmVlXCIsXG4gICAgICAgICAgICBcImZsaXBTdWJ0cmVlXCI6IFwiRmxpcCBzdWJ0cmVlXCIsXG4gICAgICAgICAgICBcInBheW9mZnNUcmFuc2Zvcm1hdGlvblwiOiBcIlRyYW5zZm9ybSBwYXlvZmZzXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJlZGdlXCI6e1xuICAgICAgICAgICAgXCJpbmplY3REZWNpc2lvbk5vZGVcIjogXCJJbmplY3QgRGVjaXNpb24gTm9kZVwiLFxuICAgICAgICAgICAgXCJpbmplY3RDaGFuY2VOb2RlXCI6IFwiSW5qZWN0IENoYW5jZSBOb2RlXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJ0ZXh0XCI6e1xuICAgICAgICAgICAgXCJkZWxldGVcIjogXCJEZWxldGVcIlxuICAgICAgICB9XG4gICAgfSxcbiAgICBcInZhbGlkYXRpb25cIjp7XG4gICAgICAgIFwiaW5jb21wbGV0ZVBhdGhcIjogXCJQYXRoIG5vdCBlbmRpbmcgd2l0aCB0ZXJtaW5hbCBub2RlXCIsXG4gICAgICAgIFwicHJvYmFiaWxpdHlEb05vdFN1bVVwVG8xXCI6IFwiUHJvYmFiaWxpdGllcyBkbyBub3Qgc3VtIHVwIHRvIDFcIixcbiAgICAgICAgXCJpbnZhbGlkUHJvYmFiaWxpdHlcIjogXCJJbnZhbGlkIHByb2JhYmlsaXR5IGluIGVkZ2UgI3t7bnVtYmVyfX1cIixcbiAgICAgICAgXCJpbnZhbGlkUGF5b2ZmXCI6IFwiSW52YWxpZCBwYXlvZmYgaW4gZWRnZSAje3tudW1iZXJ9fVwiXG4gICAgfSxcbiAgICBcImdyb3dsXCI6e1xuICAgICAgICBcImJydXNoRGlzYWJsZWRcIjogXCJTZWxlY3Rpb24gYnJ1c2ggZGlzYWJsZWRcIixcbiAgICAgICAgXCJicnVzaEVuYWJsZWRcIjogXCJTZWxlY3Rpb24gYnJ1c2ggZW5hYmxlZFwiXG4gICAgfSxcbiAgICBcInRvb2x0aXBcIjp7XG4gICAgICAgIFwibm9kZVwiOntcbiAgICAgICAgICAgIFwicGF5b2ZmXCI6IHtcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJQYXlvZmYge3tudW1iZXJ9fVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJ7e25hbWV9fVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJhZ2dyZWdhdGVkUGF5b2ZmXCI6IHtcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJBZ2dyZWdhdGVkIFBheW9mZiB7e251bWJlcn19XCIsXG4gICAgICAgICAgICAgICAgXCJuYW1lZFwiOiBcIkFnZ3JlZ2F0ZWQge3tuYW1lfX1cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwicHJvYmFiaWxpdHlUb0VudGVyXCI6IFwiUHJvYmFiaWxpdHkgdG8gZW50ZXJcIlxuICAgICAgICB9LFxuICAgICAgICBcImVkZ2VcIjp7XG4gICAgICAgICAgICBcInBheW9mZlwiOiB7XG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiUGF5b2ZmIHt7bnVtYmVyfX06IHt7dmFsdWV9fVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJ7e25hbWV9fToge3t2YWx1ZX19XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInByb2JhYmlsaXR5XCI6IFwiUHJvYmFiaWxpdHk6IHt7dmFsdWV9fVwiXG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cz17XG4gICAgXCJjb250ZXh0TWVudVwiOntcbiAgICAgICAgXCJtYWluXCI6e1xuICAgICAgICAgICAgXCJhZGREZWNpc2lvbk5vZGVcIjogXCJBam91dGVyIG5vdWQgZGUgZMOpY2lzaW9uXCIsXG4gICAgICAgICAgICBcImFkZENoYW5jZU5vZGVcIjogXCJBam91dGVyIG5vdWQgYWzDqWF0b2lyZVwiLFxuICAgICAgICAgICAgXCJhZGRUZXh0XCI6IFwiQWpvdXRlciBkdSB0ZXh0ZVwiLFxuICAgICAgICAgICAgXCJwYXN0ZVwiOiBcIkNvbGxlclwiLFxuICAgICAgICAgICAgXCJzZWxlY3RBbGxOb2Rlc1wiOiBcIlPDqWxlY3Rpb25uZXIgdG91cyBsZXMgbm91ZHNcIlxuICAgICAgICB9LFxuICAgICAgICBcIm5vZGVcIjp7XG4gICAgICAgICAgICBcImNvcHlcIjogXCJDb3BpZVwiLFxuICAgICAgICAgICAgXCJjdXRcIjogXCJDb3VwZXJcIixcbiAgICAgICAgICAgIFwicGFzdGVcIjogXCJDb2xsZXJcIixcbiAgICAgICAgICAgIFwiZGVsZXRlXCI6IFwiRWZmYWNlclwiLFxuICAgICAgICAgICAgXCJhZGREZWNpc2lvbk5vZGVcIjogXCJBam91dGVyIG5vdWQgZGUgZMOpY2lzaW9uXCIsXG4gICAgICAgICAgICBcImFkZENoYW5jZU5vZGVcIjogXCJBam91dGVyIG5vdWQgYWzDqWF0b2lyZVwiLFxuICAgICAgICAgICAgXCJhZGRUZXJtaW5hbE5vZGVcIjogXCJBam91dGVyIHVuIG5vZXVkIHRlcm1pbmFsXCIsXG4gICAgICAgICAgICBcImNvbnZlcnRcIjp7XG4gICAgICAgICAgICAgICAgXCJkZWNpc2lvblwiOiBcIkNvbW1lIG5vdWQgZGUgZMOpY2lzaW9uXCIsXG4gICAgICAgICAgICAgICAgXCJjaGFuY2VcIjogXCJDb21tZSBub3VkIGFsw6lhdG9pcmVcIixcbiAgICAgICAgICAgICAgICBcInRlcm1pbmFsXCI6IFwiQ29tbWUgdW4gbm9ldWQgdGVybWluYWxcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwic2VsZWN0U3VidHJlZVwiOiBcIlPDqWxlY3Rpb25uZXIgdW5lIHNvdXMtYXJib3Jlc2NlbmNlXCIsXG4gICAgICAgICAgICBcImZvbGRcIjogXCJQbGllciBzb3VzLWFyYnJlXCIsXG4gICAgICAgICAgICBcInVuZm9sZFwiOiBcIkTDqXBsaWVyIGFyYnJlIHNvdXMtYXJicmVcIixcbiAgICAgICAgICAgIFwiZmxpcFN1YnRyZWVcIjogXCJCYXNjdWxlciBzb3VzLWFyYnJlXCIsXG4gICAgICAgICAgICBcInBheW9mZnNUcmFuc2Zvcm1hdGlvblwiOiBcIlRyYW5zZm9ybWV6IGxlcyBnYWluc1wiXG4gICAgICAgIH0sXG4gICAgICAgIFwiZWRnZVwiOntcbiAgICAgICAgICAgIFwiaW5qZWN0RGVjaXNpb25Ob2RlXCI6IFwiSW5qZWN0ZXIgdW4gbm9ldWQgZGUgZMOpY2lzaW9uXCIsXG4gICAgICAgICAgICBcImluamVjdENoYW5jZU5vZGVcIjogXCJJbmplY3RlciB1biBub2V1ZCBkZSBjaGFuY2VcIlxuICAgICAgICB9LFxuICAgICAgICBcInRleHRcIjp7XG4gICAgICAgICAgICBcImRlbGV0ZVwiOiBcIkVmZmFjZXJcIlxuICAgICAgICB9XG4gICAgfSxcbiAgICBcInZhbGlkYXRpb25cIjp7XG4gICAgICAgIFwiaW5jb21wbGV0ZVBhdGhcIjogXCJQYXJjb3VycyBub24gdGVybWluw6kgcGFyIG5vZXVkIHRlcm1pbmFsXCIsXG4gICAgICAgIFwicHJvYmFiaWxpdHlEb05vdFN1bVVwVG8xXCI6IFwiTGEgc29tbWUgZGVzIHByb2JhYmlsaXTDqXMgbidlc3QgcGFzIDEgb3UgcGx1c1wiLFxuICAgICAgICBcImludmFsaWRQcm9iYWJpbGl0eVwiOiBcIlByb2JhYmlsaXTDqSBpbnZhbGlkZSAtIGxlIGJvcmQgI3t7bnVtYmVyfX1cIixcbiAgICAgICAgXCJpbnZhbGlkUGF5b2ZmXCI6IFwiQXZhbnRhZ2UgaW52YWxpZGUgLSBsZSBib3JkICN7e251bWJlcn19XCJcbiAgICB9LFxuICAgIFwiZ3Jvd2xcIjp7XG4gICAgICAgIFwiYnJ1c2hEaXNhYmxlZFwiOiBcIkJyb3NzZSBkZSBzw6lsZWN0aW9uIGTDqXNhY3RpdsOpZVwiLFxuICAgICAgICBcImJydXNoRW5hYmxlZFwiOiBcIkJyb3NzZSBkZSBzw6lsZWN0aW9uIGFjdGl2w6llXCJcbiAgICB9LFxuICAgIFwidG9vbHRpcFwiOntcbiAgICAgICAgXCJub2RlXCI6e1xuICAgICAgICAgICAgXCJwYXlvZmZcIjoge1xuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIkF2YW50YWdlIHt7bnVtYmVyfX1cIixcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwie3tuYW1lfX1cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiYWdncmVnYXRlZFBheW9mZlwiOiB7XG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiQXZhbnRhZ2UgYWdyw6lnw6kge3tudW1iZXJ9fVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJBZ3LDqWfDqSAge3tuYW1lfX1cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwicHJvYmFiaWxpdHlUb0VudGVyXCI6IFwiUHJvYmFiaWxpdMOpIGQnZW50csOpZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiZWRnZVwiOntcbiAgICAgICAgICAgIFwicGF5b2ZmXCI6IHtcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJBdmFudGFnZSB7e251bWJlcn19OiB7e3ZhbHVlfX1cIixcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwie3tuYW1lfX06IHt7dmFsdWV9fVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJwcm9iYWJpbGl0eVwiOiBcIlByb2JhYmlsaXTDqToge3t2YWx1ZX19XCJcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBpMThuZXh0IGZyb20gJ2kxOG5leHQnO1xuaW1wb3J0ICogYXMgZW4gZnJvbSAnLi9lbi5qc29uJ1xuaW1wb3J0ICogYXMgcGwgZnJvbSAnLi9wbC5qc29uJ1xuaW1wb3J0ICogYXMgaXQgZnJvbSAnLi9pdC5qc29uJ1xuaW1wb3J0ICogYXMgZGUgZnJvbSAnLi9kZS5qc29uJ1xuaW1wb3J0ICogYXMgZnIgZnJvbSAnLi9mci5qc29uJ1xuXG5leHBvcnQgY2xhc3MgaTE4bntcblxuICAgIHN0YXRpYyAkaW5zdGFuY2U7XG4gICAgc3RhdGljIGxhbmd1YWdlO1xuXG4gICAgc3RhdGljIGluaXQobG5nKXtcbiAgICAgICAgaTE4bi5sYW5ndWFnZSA9IGxuZztcbiAgICAgICAgbGV0IHJlc291cmNlcyA9IHtcbiAgICAgICAgICAgIGVuOiB7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRpb246IGVuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGw6IHtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGlvbjogcGxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpdDoge1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0aW9uOiBpdFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlOiB7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRpb246IGRlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnI6IHtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGlvbjogZnJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgaTE4bi4kaW5zdGFuY2UgPSBpMThuZXh0LmNyZWF0ZUluc3RhbmNlKHtcbiAgICAgICAgICAgIGxuZzogbG5nLFxuICAgICAgICAgICAgZmFsbGJhY2tMbmc6ICdlbicsXG4gICAgICAgICAgICByZXNvdXJjZXM6IHJlc291cmNlc1xuICAgICAgICB9LCAoZXJyLCB0KSA9PiB7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXRpYyB0KGtleSwgb3B0KXtcbiAgICAgICAgcmV0dXJuIGkxOG4uJGluc3RhbmNlLnQoa2V5LCBvcHQpXG4gICAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHM9e1xuICAgIFwiY29udGV4dE1lbnVcIjp7XG4gICAgICAgIFwibWFpblwiOntcbiAgICAgICAgICAgIFwiYWRkRGVjaXNpb25Ob2RlXCI6IFwiQWdnaXVuZ2kgdW4gbm9kbyBkaSBkZWNpc2lvbmVcIixcbiAgICAgICAgICAgIFwiYWRkQ2hhbmNlTm9kZVwiOiBcIkFnZ2l1bmdpIHVuIG5vZG8gb3Bwb3J0dW5pdMOgXCIsXG4gICAgICAgICAgICBcImFkZFRleHRcIjogXCJBZ2dpdW5naSB0ZXN0b1wiLFxuICAgICAgICAgICAgXCJwYXN0ZVwiOiBcIkluY29sbGFcIixcbiAgICAgICAgICAgIFwic2VsZWN0QWxsTm9kZXNcIjogXCJTZWxlemlvbmEgdHV0dGkgaSBub2RpXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJub2RlXCI6e1xuICAgICAgICAgICAgXCJjb3B5XCI6IFwiQ29waWFcIixcbiAgICAgICAgICAgIFwiY3V0XCI6IFwiVGFnbGlhXCIsXG4gICAgICAgICAgICBcInBhc3RlXCI6IFwiSW5jb2xsYVwiLFxuICAgICAgICAgICAgXCJkZWxldGVcIjogXCJDYW5jZWxsYVwiLFxuICAgICAgICAgICAgXCJhZGREZWNpc2lvbk5vZGVcIjogXCJBZ2dpdW5naSB1biBub2RvIGRpIGRlY2lzaW9uZVwiLFxuICAgICAgICAgICAgXCJhZGRDaGFuY2VOb2RlXCI6IFwiQWdnaXVuZ2kgdW4gbm9kbyBvcHBvcnR1bml0w6BcIixcbiAgICAgICAgICAgIFwiYWRkVGVybWluYWxOb2RlXCI6IFwiQWdnaXVuZ2kgdW4gbm9kbyB0ZXJtaW5hbGVcIixcbiAgICAgICAgICAgIFwiY29udmVydFwiOntcbiAgICAgICAgICAgICAgICBcImRlY2lzaW9uXCI6IFwiQ29tZSBEZWNpc2lvbiBOb2RlXCIsXG4gICAgICAgICAgICAgICAgXCJjaGFuY2VcIjogXCJDb21lIENoYW5jZSBOb2RlXCIsXG4gICAgICAgICAgICAgICAgXCJ0ZXJtaW5hbFwiOiBcIkNvbWUgVGVybWluYWwgTm9kZVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJzZWxlY3RTdWJ0cmVlXCI6IFwiU2VsZXppb25hIFNvdHRvLWFsYmVyb1wiLFxuICAgICAgICAgICAgXCJmb2xkXCI6IFwiUGllZ2Egc290dG8tYWxiZXJvXCIsXG4gICAgICAgICAgICBcInVuZm9sZFwiOiBcIkRpc3BpZWdhcnNpIHNvdHRvLWFsYmVyb1wiLFxuICAgICAgICAgICAgXCJmbGlwU3VidHJlZVwiOiBcIlJpYmFsdGEgc290dG8tYWxiZXJvXCIsXG4gICAgICAgICAgICBcInBheW9mZnNUcmFuc2Zvcm1hdGlvblwiOiBcIlRyYXNmb3JtYSBpIHByb2ZpdHRpXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJlZGdlXCI6e1xuICAgICAgICAgICAgXCJpbmplY3REZWNpc2lvbk5vZGVcIjogXCJJbmlldHRhIG5vZG8gZGkgZGVjaXNpb25lXCIsXG4gICAgICAgICAgICBcImluamVjdENoYW5jZU5vZGVcIjogXCJJbmlldHRhIG5vZG8gb3Bwb3J0dW5pdMOgXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJ0ZXh0XCI6e1xuICAgICAgICAgICAgXCJkZWxldGVcIjogXCJDYW5jZWxsYVwiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwidmFsaWRhdGlvblwiOntcbiAgICAgICAgXCJpbmNvbXBsZXRlUGF0aFwiOiBcIlBlcmNvcnNvIHNlbnphIG5vZG8gdGVybWluYWxlXCIsXG4gICAgICAgIFwicHJvYmFiaWxpdHlEb05vdFN1bVVwVG8xXCI6IFwiTGEgc29tbWEgZGVsbGUgcHJvYmFiaWxpdMOgIMOoIGRpdmVyc2EgZGEgMVwiLFxuICAgICAgICBcImludmFsaWRQcm9iYWJpbGl0eVwiOiBcIlByb2JhYmlsaXTDoCBub24gdmFsaWRhIC0gYm9yZG8gI3t7bnVtYmVyfX1cIixcbiAgICAgICAgXCJpbnZhbGlkUGF5b2ZmXCI6IFwiU2FsZG8gbm9uIHZhbGlkbyAtIGJvcmRvICN7e251bWJlcn19XCJcbiAgICB9LFxuICAgIFwiZ3Jvd2xcIjp7XG4gICAgICAgIFwiYnJ1c2hEaXNhYmxlZFwiOiBcIlNlbGV6aW9uZSBwZW5uZWxsbyBkaXNhYmlsaXRhdGFcIixcbiAgICAgICAgXCJicnVzaEVuYWJsZWRcIjogXCJTZWxlemlvbmUgcGVubmVsbG8gYWJpbGl0YXRhXCJcbiAgICB9LFxuICAgIFwidG9vbHRpcFwiOntcbiAgICAgICAgXCJub2RlXCI6e1xuICAgICAgICAgICAgXCJwYXlvZmZcIjoge1xuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIlNhbGRvIHt7bnVtYmVyfX1cIixcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwie3tuYW1lfX1cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiYWdncmVnYXRlZFBheW9mZlwiOiB7XG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiU2FsZG8gYWdncmVnYXRvIHt7bnVtYmVyfX1cIixcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwiQWdncmVnYXRvIHt7bmFtZX19XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInByb2JhYmlsaXR5VG9FbnRlclwiOiBcIlByb2JhYmlsaXTDoCBkYSBpbnNlcmlyZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiZWRnZVwiOntcbiAgICAgICAgICAgIFwicGF5b2ZmXCI6IHtcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJTYWxkbyB7e251bWJlcn19OiB7e3ZhbHVlfX1cIixcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwie3tuYW1lfX06IHt7dmFsdWV9fVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJwcm9iYWJpbGl0eVwiOiBcIlByb2JhYmlsaXTDoDoge3t2YWx1ZX19XCJcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzPXtcblxuICAgIFwiY29udGV4dE1lbnVcIjp7XG4gICAgICAgIFwibWFpblwiOntcbiAgICAgICAgICAgIFwiYWRkRGVjaXNpb25Ob2RlXCI6IFwiRG9kYWogV8SZemXFgiBEZWN5enlqbnlcIixcbiAgICAgICAgICAgIFwiYWRkQ2hhbmNlTm9kZVwiOiBcIkRvZGFqIFfEmXplxYIgTG9zb3d5XCIsXG4gICAgICAgICAgICBcImFkZFRleHRcIjogXCJEb2RhaiBUZWtzdFwiLFxuICAgICAgICAgICAgXCJwYXN0ZVwiOiBcIldrbGVqXCIsXG4gICAgICAgICAgICBcInNlbGVjdEFsbE5vZGVzXCI6IFwiWmF6bmFjeiB3c3p5c3RraWUgd8SZesWCeVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwibm9kZVwiOntcbiAgICAgICAgICAgIFwiY29weVwiOiBcIktvcGl1alwiLFxuICAgICAgICAgICAgXCJjdXRcIjogXCJXeXRuaWpcIixcbiAgICAgICAgICAgIFwicGFzdGVcIjogXCJXa2xlalwiLFxuICAgICAgICAgICAgXCJkZWxldGVcIjogXCJVc3XFhFwiLFxuICAgICAgICAgICAgXCJhZGREZWNpc2lvbk5vZGVcIjogXCJEb2RhaiBXxJl6ZcWCIERlY3l6eWpueVwiLFxuICAgICAgICAgICAgXCJhZGRDaGFuY2VOb2RlXCI6IFwiRG9kYWogV8SZemXFgiBMb3Nvd3lcIixcbiAgICAgICAgICAgIFwiYWRkVGVybWluYWxOb2RlXCI6IFwiRG9kYWogV8SZemXFgiBLb8WEY293eVwiLFxuICAgICAgICAgICAgXCJjb252ZXJ0XCI6e1xuICAgICAgICAgICAgICAgIFwiZGVjaXNpb25cIjogXCJKYWtvIFfEmXplxYIgRGVjeXp5am55XCIsXG4gICAgICAgICAgICAgICAgXCJjaGFuY2VcIjogXCJKYWtvIFfEmXplxYIgTG9zb3d5XCIsXG4gICAgICAgICAgICAgICAgXCJ0ZXJtaW5hbFwiOiBcIkpha28gV8SZemXFgiBLb8WEY293eVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJzZWxlY3RTdWJ0cmVlXCI6IFwiWmF6bmFjeiBwb2Rkcnpld29cIixcbiAgICAgICAgICAgIFwiZm9sZFwiOiBcIlp3acWEIHBvZGRyemV3b1wiLFxuICAgICAgICAgICAgXCJ1bmZvbGRcIjogXCJSb3p3acWEIHBvZGRyemV3b1wiLFxuICAgICAgICAgICAgXCJmbGlwU3VidHJlZVwiOiBcIlByemV3csOzxIcgcG9kZHJ6ZXdvXCIsXG4gICAgICAgICAgICBcInBheW9mZnNUcmFuc2Zvcm1hdGlvblwiOiBcIlByemVrc3p0YcWCxIcgd3lwxYJhdHlcIlxuICAgICAgICB9LFxuICAgICAgICBcImVkZ2VcIjp7XG4gICAgICAgICAgICBcImluamVjdERlY2lzaW9uTm9kZVwiOiBcIldzdHJ6eWtuaWogV8SZemXFgiBEZWN5enlqbnlcIixcbiAgICAgICAgICAgIFwiaW5qZWN0Q2hhbmNlTm9kZVwiOiBcIldzdHJ6eWtuaWogV8SZemXFgiBMb3Nvd3lcIlxuICAgICAgICB9LFxuICAgICAgICBcInRleHRcIjp7XG4gICAgICAgICAgICBcImRlbGV0ZVwiOiBcIlVzdcWEXCJcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBcInZhbGlkYXRpb25cIjp7XG4gICAgICAgIFwiaW5jb21wbGV0ZVBhdGhcIjogXCJPc3RhdG5pbSB3xJl6xYJlbSB3IMWbY2llxbxjZSBwb3dpbmllbiBiecSHIFfEmXplxYIgS2/FhGNvd3lcIixcbiAgICAgICAgXCJwcm9iYWJpbGl0eURvTm90U3VtVXBUbzFcIjogXCJQcmF3ZG9wb2RvYmllxYRzdHdhIG5pZSBzdW11asSFIHNpZSBkbyAxXCIsXG4gICAgICAgIFwiaW52YWxpZFByb2JhYmlsaXR5XCI6IFwiTmllcG9wcmF3bmUgcHJhd2RvcG9kb2JpZcWEc3R3byBuYSBrcmF3xJlkemkgI3t7bnVtYmVyfX1cIixcbiAgICAgICAgXCJpbnZhbGlkUGF5b2ZmXCI6IFwiTmllcG9wcmF3bmEgd3lwxYJhdGEgbmEga3Jhd8SZZHppICN7e251bWJlcn19XCJcbiAgICB9LFxuICAgIFwiZ3Jvd2xcIjp7XG4gICAgICAgIFwiYnJ1c2hEaXNhYmxlZFwiOiBcIlphem5hY3phbmllIHd5xYLEhWN6b25lXCIsXG4gICAgICAgIFwiYnJ1c2hFbmFibGVkXCI6IFwiWmF6bmFjemFuaWUgd8WCxIVjem9uZVwiXG4gICAgfSxcbiAgICBcInRvb2x0aXBcIjp7XG4gICAgICAgIFwibm9kZVwiOntcbiAgICAgICAgICAgIFwicGF5b2ZmXCI6IHtcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJXeXDFgmF0YSB7e251bWJlcn19XCIsXG4gICAgICAgICAgICAgICAgXCJuYW1lZFwiOiBcInt7bmFtZX19XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImFnZ3JlZ2F0ZWRQYXlvZmZcIjoge1xuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIlphZ3JlZ293YW5hIHd5cMWCYXRhIHt7bnVtYmVyfX1cIixcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwiWmFncmVnb3dhbmEge3tuYW1lfX1cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwicHJvYmFiaWxpdHlUb0VudGVyXCI6IFwiUHJhd2RvcG9kb2JpZcWEc3R3byB3ZWrFm2NpYVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiZWRnZVwiOntcbiAgICAgICAgICAgIFwicGF5b2ZmXCI6IHtcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJXeXDFgmF0YSB7e251bWJlcn19OiB7e3ZhbHVlfX1cIixcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwie3tuYW1lfX06IHt7dmFsdWV9fVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJwcm9iYWJpbGl0eVwiOiBcIlByYXdkb3BvZG9iaWXFhHN0d286IHt7dmFsdWV9fVwiXG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQge0QzRXh0ZW5zaW9uc30gZnJvbSAnLi9kMy1leHRlbnNpb25zJ1xuRDNFeHRlbnNpb25zLmV4dGVuZCgpO1xuXG5leHBvcnQgKiBmcm9tICcuL3RyZWUtZGVzaWduZXInXG5leHBvcnQgKiBmcm9tICcuL2FwcC11dGlscydcbmV4cG9ydCAqIGZyb20gJy4vdGVtcGxhdGVzJ1xuZXhwb3J0ICogZnJvbSAnLi90b29sdGlwJ1xuZXhwb3J0ICogZnJvbSAnLi9kMy1leHRlbnNpb25zJ1xuZXhwb3J0IHtkZWZhdWx0IGFzIGQzfSBmcm9tICcuL2QzJ1xuXG5cbiIsImltcG9ydCB7VXRpbHN9IGZyb20gJ3NkLXV0aWxzJ1xuaW1wb3J0IHtkb21haW4gYXMgbW9kZWx9IGZyb20gJ3NkLW1vZGVsJ1xuaW1wb3J0ICogYXMgZDMgZnJvbSAnLi9kMydcbmltcG9ydCBjaXJjbGVTeW1ib2wgZnJvbSAnLi9zeW1ib2xzL2NpcmNsZSdcbmltcG9ydCB0cmlhbmdsZVN5bWJvbCBmcm9tICcuL3N5bWJvbHMvdHJpYW5nbGUnXG5pbXBvcnQge0FwcFV0aWxzfSBmcm9tIFwiLi9hcHAtdXRpbHNcIjtcblxuLypUcmVlIGxheW91dCBtYW5hZ2VyKi9cbmV4cG9ydCBjbGFzcyBMYXlvdXR7XG5cbiAgICB0cmVlRGVzaWduZXI7XG4gICAgZGF0YTtcbiAgICBjb25maWc7XG5cbiAgICBub2RlVHlwZVRvU3ltYm9sID0ge1xuICAgICAgICAnZGVjaXNpb24nOiBkMy5zeW1ib2xTcXVhcmUsXG4gICAgICAgICdjaGFuY2UnOiBjaXJjbGVTeW1ib2wsXG4gICAgICAgIFwidGVybWluYWxcIjogdHJpYW5nbGVTeW1ib2xcbiAgICB9O1xuXG4gICAgc3RhdGljIE1BTlVBTF9MQVlPVVRfTkFNRSA9ICdtYW51YWwnO1xuXG5cbiAgICBvbkF1dG9MYXlvdXRDaGFuZ2VkPVtdO1xuXG4gICAgbm9kZVR5cGVPcmRlciA9IHtcbiAgICAgICAgJ2RlY2lzaW9uJyA6IDAsXG4gICAgICAgICdjaGFuY2UnOiAwLFxuICAgICAgICAndGVybWluYWwnOiAxXG4gICAgfTtcblxuICAgIHRyZWVNYXJnaW4gPSA1MDtcbiAgICB0YXJnZXRTeW1ib2xTaXplPXt9O1xuICAgIG5vZGVTZXBhcmF0aW9uID0gKGEsIGIpID0+IGEucGFyZW50ID09PSBiLnBhcmVudCA/IDEgOiAxLjJcblxuICAgIGNvbnN0cnVjdG9yKHRyZWVEZXNpZ25lciwgZGF0YSwgY29uZmlnKXtcbiAgICAgICAgdGhpcy50cmVlRGVzaWduZXIgPSB0cmVlRGVzaWduZXI7XG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuXG4gICAgfVxuXG4gICAgdXBkYXRlKG5vZGUpe1xuICAgICAgICBpZihub2RlICYmIG5vZGUuJHBhcmVudCl7XG4gICAgICAgICAgICBub2RlLiRwYXJlbnQuY2hpbGRFZGdlcy5zb3J0KChhLGIpPT5hLmNoaWxkTm9kZS5sb2NhdGlvbi55IC0gYi5jaGlsZE5vZGUubG9jYXRpb24ueSlcbiAgICAgICAgfVxuICAgICAgICBpZighdGhpcy5pc01hbnVhbExheW91dCgpKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmF1dG9MYXlvdXQodGhpcy5jb25maWcudHlwZSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYobm9kZSl7XG4gICAgICAgICAgICB0aGlzLm1vdmVOb2RlVG9FbXB0eVBsYWNlKG5vZGUpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMudHJlZURlc2lnbmVyLnJlZHJhdyh0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzTWFudWFsTGF5b3V0KCl7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy50eXBlID09PSBMYXlvdXQuTUFOVUFMX0xBWU9VVF9OQU1FO1xuICAgIH1cblxuICAgIGdldE5ld0NoaWxkTG9jYXRpb24ocGFyZW50KXtcbiAgICAgICAgaWYoIXBhcmVudCl7XG4gICAgICAgICAgICByZXR1cm4gbmV3IG1vZGVsLlBvaW50KHRoaXMuZ2V0Tm9kZU1pblgoKSwgdGhpcy5nZXROb2RlTWluWSgpKVxuICAgICAgICB9XG4gICAgICAgIHZhciB4ID0gcGFyZW50LmxvY2F0aW9uLnggKyB0aGlzLmNvbmZpZy5ncmlkV2lkdGg7XG4gICAgICAgIHZhciB5ID0gcGFyZW50LmxvY2F0aW9uLnk7XG4gICAgICAgIGlmKHBhcmVudC5jaGlsZEVkZ2VzLmxlbmd0aCl7XG4gICAgICAgICAgICB5ID0gcGFyZW50LmNoaWxkRWRnZXNbcGFyZW50LmNoaWxkRWRnZXMubGVuZ3RoLTFdLmNoaWxkTm9kZS5sb2NhdGlvbi55KzE7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IG1vZGVsLlBvaW50KHgsIHkpXG4gICAgfVxuXG4gICAgZ2V0SW5qZWN0ZWROb2RlTG9jYXRpb24oZWRnZSl7XG5cbiAgICAgICAgdmFyIHAgPSBlZGdlLiRsaW5lUG9pbnRzWzJdO1xuXG4gICAgICAgIHJldHVybiBuZXcgbW9kZWwuUG9pbnQocFswXSwgcFsxXSlcbiAgICB9XG5cbiAgICBtb3ZlTm9kZVRvRW1wdHlQbGFjZShub2RlLCByZWRyYXdJZkNoYW5nZWQ9dHJ1ZSl7XG4gICAgICAgIHZhciBwb3NpdGlvbk1hcCA9IHt9O1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIG5vZGUubG9jYXRpb24ueCA9IE1hdGgubWF4KHRoaXMuZ2V0Tm9kZU1pblgobm9kZSksIG5vZGUubG9jYXRpb24ueCk7XG4gICAgICAgIG5vZGUubG9jYXRpb24ueSA9IE1hdGgubWF4KHRoaXMuZ2V0Tm9kZU1pblkobm9kZSksIG5vZGUubG9jYXRpb24ueSk7XG5cblxuICAgICAgICB0aGlzLm5vZGVzU29ydGVkQnlYID0gdGhpcy5kYXRhLm5vZGVzLnNsaWNlKCk7XG4gICAgICAgIHRoaXMubm9kZXNTb3J0ZWRCeVguc29ydCgoYSxiKT0+YS5sb2NhdGlvbi54IC0gYi5sb2NhdGlvbi54KTtcblxuICAgICAgICBmdW5jdGlvbiBmaW5kQ29sbGlkaW5nTm9kZShub2RlLCBsb2NhdGlvbil7XG4gICAgICAgICAgICByZXR1cm4gVXRpbHMuZmluZChzZWxmLm5vZGVzU29ydGVkQnlYLCBuPT57XG4gICAgICAgICAgICAgICAgaWYobm9kZSA9PSBuKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBtYXJnaW4gPSBzZWxmLmNvbmZpZy5ub2RlU2l6ZS8zO1xuICAgICAgICAgICAgICAgIHZhciB4ID0gbi5sb2NhdGlvbi54O1xuICAgICAgICAgICAgICAgIHZhciB5ID0gbi5sb2NhdGlvbi55O1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIChsb2NhdGlvbi54IC0gbWFyZ2luIDw9IHggJiYgbG9jYXRpb24ueCArIG1hcmdpbiA+PSB4XG4gICAgICAgICAgICAgICAgICAgICYmIGxvY2F0aW9uLnkgLSBtYXJnaW4gPD0geSAmJiBsb2NhdGlvbi55ICsgbWFyZ2luID49IHkpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzdGVwWCA9IHRoaXMuY29uZmlnLm5vZGVTaXplLzI7XG4gICAgICAgIHZhciBzdGVwWSA9IHRoaXMuY29uZmlnLm5vZGVTaXplKzEwO1xuICAgICAgICB2YXIgc3RlcFhzYW1lUGFyZW50ID0gMDtcbiAgICAgICAgdmFyIHN0ZXBZc2FtZVBhcmVudCA9IDc1O1xuICAgICAgICB2YXIgY2hhbmdlZCA9IGZhbHNlO1xuICAgICAgICB2YXIgY29saWRpbmdOb2RlO1xuICAgICAgICB2YXIgbmV3TG9jYXRpb24gPSBuZXcgbW9kZWwuUG9pbnQobm9kZS5sb2NhdGlvbik7XG4gICAgICAgIHdoaWxlKGNvbGlkaW5nTm9kZSA9IGZpbmRDb2xsaWRpbmdOb2RlKG5vZGUsIG5ld0xvY2F0aW9uKSl7XG4gICAgICAgICAgICBjaGFuZ2VkPXRydWU7XG4gICAgICAgICAgICB2YXIgc2FtZVBhcmVudCA9IG5vZGUuJHBhcmVudCAmJiBjb2xpZGluZ05vZGUuJHBhcmVudCAmJiBub2RlLiRwYXJlbnQ9PT1jb2xpZGluZ05vZGUuJHBhcmVudDtcbiAgICAgICAgICAgIGlmKHNhbWVQYXJlbnQpe1xuICAgICAgICAgICAgICAgIG5ld0xvY2F0aW9uLm1vdmUoc3RlcFhzYW1lUGFyZW50LCBzdGVwWXNhbWVQYXJlbnQpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgbmV3TG9jYXRpb24ubW92ZShzdGVwWCwgc3RlcFkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmKGNoYW5nZWQpe1xuICAgICAgICAgICAgbm9kZS5tb3ZlVG8obmV3TG9jYXRpb24ueCxuZXdMb2NhdGlvbi55LCB0cnVlKTtcbiAgICAgICAgICAgIGlmKHJlZHJhd0lmQ2hhbmdlZCl7XG4gICAgICAgICAgICAgICAgdGhpcy50cmVlRGVzaWduZXIucmVkcmF3KHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGlzYWJsZUF1dG9MYXlvdXQoKXtcbiAgICAgICAgdGhpcy5jb25maWcudHlwZSA9IExheW91dC5NQU5VQUxfTEFZT1VUX05BTUU7XG4gICAgICAgIHRoaXMuX2ZpcmVPbkF1dG9MYXlvdXRDaGFuZ2VkQ2FsbGJhY2tzKCk7XG4gICAgfVxuXG5cbiAgICBub2RlU3ltYm9sU2l6ZSA9IHt9O1xuICAgIGRyYXdOb2RlU3ltYm9sKHBhdGgsIHRyYW5zaXRpb24pe1xuXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIG5vZGVTaXplID0gdGhpcy5jb25maWcubm9kZVNpemU7XG4gICAgICAgIHRoaXMubm9kZVN5bWJvbCA9IGQzLnN5bWJvbCgpLnR5cGUoZD0+IHNlbGYubm9kZVR5cGVUb1N5bWJvbFtkLnR5cGVdKVxuICAgICAgICAgICAgLnNpemUoZD0+c2VsZi5ub2RlU3ltYm9sU2l6ZVtkLmlkXSA/IFV0aWxzLmdldChzZWxmLnRhcmdldFN5bWJvbFNpemUsIGQudHlwZStcIlsnXCIrc2VsZi5jb25maWcubm9kZVNpemUrXCInXVwiLCA2NCkgOiA2NCk7XG5cbiAgICAgICAgcGF0aFxuICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICB2YXIgcGF0aCA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgICAgICAgICB2YXIgcHJldiA9IHBhdGguYXR0cihcImRcIik7XG4gICAgICAgICAgICAgICAgaWYoIXByZXYpe1xuICAgICAgICAgICAgICAgICAgICBwYXRoLmF0dHIoXCJkXCIsIHNlbGYubm9kZVN5bWJvbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBzaXplID0gVXRpbHMuZ2V0KHNlbGYudGFyZ2V0U3ltYm9sU2l6ZSwgZC50eXBlK1wiWydcIitzZWxmLmNvbmZpZy5ub2RlU2l6ZStcIiddXCIpO1xuICAgICAgICAgICAgICAgIGlmKCFzaXplKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJveCA9IHBhdGgubm9kZSgpLmdldEJCb3goKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9yID0gTWF0aC5taW4obm9kZVNpemUgLyBib3gud2lkdGgsIG5vZGVTaXplIC8gYm94LmhlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgIHNpemUgPSBlcnJvciAqIGVycm9yICogKHNlbGYubm9kZVN5bWJvbFNpemVbZC5pZF18fDY0KTtcbiAgICAgICAgICAgICAgICAgICAgVXRpbHMuc2V0KHNlbGYudGFyZ2V0U3ltYm9sU2l6ZSwgZC50eXBlK1wiWydcIitzZWxmLmNvbmZpZy5ub2RlU2l6ZStcIiddXCIsIHNpemUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZih0cmFuc2l0aW9uKXtcbiAgICAgICAgICAgICAgICAgICAgcGF0aCA9ICBwYXRoLnRyYW5zaXRpb24oKTtcblxuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBzZWxmLm5vZGVTeW1ib2xTaXplW2QuaWRdID0gc2l6ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcGF0aC5hdHRyKFwiZFwiLCBzZWxmLm5vZGVTeW1ib2wpO1xuICAgICAgICAgICAgICAgIGlmKHRyYW5zaXRpb24pe1xuICAgICAgICAgICAgICAgICAgICBzZWxmLm5vZGVTeW1ib2xTaXplW2QuaWRdID0gc2l6ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBub2RlTGFiZWxQb3NpdGlvbihzZWxlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIHNlbGVjdGlvblxuICAgICAgICAgICAgLmF0dHIoJ3gnLCAwKVxuICAgICAgICAgICAgLmF0dHIoJ3knLCAtdGhpcy5jb25maWcubm9kZVNpemUgLyAyIC0gNylcbiAgICB9XG5cbiAgICBub2RlUGF5b2ZmUG9zaXRpb24oc2VsZWN0aW9uKSB7XG4gICAgICAgIHJldHVybiBMYXlvdXQuc2V0SGFuZ2luZ1Bvc2l0aW9uKHNlbGVjdGlvbilcbiAgICAgICAgICAgIC5hdHRyKCd4JywgMClcbiAgICAgICAgICAgIC5hdHRyKCd5JywgdGhpcy5jb25maWcubm9kZVNpemUgLyAyICsgNylcbiAgICAgICAgICAgIC5hdHRyKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKVxuICAgIH1cblxuICAgIG5vZGVBZ2dyZWdhdGVkUGF5b2ZmUG9zaXRpb24oc2VsZWN0aW9uKSB7XG4gICAgICAgIHZhciB4ID0gdGhpcy5jb25maWcubm9kZVNpemUgLyAyICsgNztcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBzZWxlY3Rpb25cbiAgICAgICAgICAgIC5hdHRyKCd4JywgeClcbiAgICAgICAgICAgIC5hdHRyKCd5JywgZnVuY3Rpb24oZCl7XG4gICAgICAgICAgICAgICAgbGV0IGZvbnRTaXplID0gcGFyc2VJbnQoQXBwVXRpbHMuZ2V0Rm9udFNpemUodGhpcykpO1xuICAgICAgICAgICAgICAgIGxldCBpdGVtcyA9IGQuZGlzcGxheVZhbHVlKCdhZ2dyZWdhdGVkUGF5b2ZmJyk7XG4gICAgICAgICAgICAgICAgbGV0IG51bWJlciA9IFV0aWxzLmlzQXJyYXkoaXRlbXMpID8gaXRlbXMuZmlsdGVyKGl0PT5pdCAhPT0gdW5kZWZpbmVkKS5sZW5ndGggOiAxO1xuICAgICAgICAgICAgICAgIGlmKG51bWJlcj4xKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC10aGlzLmdldEJCb3goKS5oZWlnaHQvMiArIGZvbnRTaXplLzI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAtTWF0aC5tYXgoMiwgMS44KiBzZWxmLmNvbmZpZy5ub2RlU2l6ZS9mb250U2l6ZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBzZWxlY3Rpb24uc2VsZWN0QWxsKCd0c3BhbicpLmF0dHIoJ3gnLCB4KTtcbiAgICAgICAgcmV0dXJuIHNlbGVjdGlvbjtcbiAgICAgICAgICAgIC8vIC5hdHRyKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKVxuICAgICAgICAgICAgLy8gLmF0dHIoJ2RvbWluYW50LWJhc2VsaW5lJywgJ2hhbmdpbmcnKVxuICAgIH1cblxuICAgIG5vZGVQcm9iYWJpbGl0eVRvRW50ZXJQb3NpdGlvbihzZWxlY3Rpb24pIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiBMYXlvdXQuc2V0SGFuZ2luZ1Bvc2l0aW9uKHNlbGVjdGlvbilcbiAgICAgICAgICAgIC5hdHRyKCd4JywgdGhpcy5jb25maWcubm9kZVNpemUgLyAyICsgNylcbiAgICAgICAgICAgIC5hdHRyKCd5JywgZnVuY3Rpb24oZCl7XG4gICAgICAgICAgICAgICAgbGV0IGZvbnRTaXplID0gcGFyc2VJbnQoQXBwVXRpbHMuZ2V0Rm9udFNpemUodGhpcykpO1xuICAgICAgICAgICAgICAgIGxldCBhZ2dyZWdhdGVkUGF5b2ZmcyA9IGQuZGlzcGxheVZhbHVlKCdhZ2dyZWdhdGVkUGF5b2ZmJyk7XG4gICAgICAgICAgICAgICAgbGV0IGFnZ3JlZ2F0ZWRQYXlvZmZzTnVtYmVyID0gVXRpbHMuaXNBcnJheShhZ2dyZWdhdGVkUGF5b2ZmcykgPyBhZ2dyZWdhdGVkUGF5b2Zmcy5maWx0ZXIoaXQ9Pml0ICE9PSB1bmRlZmluZWQpLmxlbmd0aCA6IDE7XG4gICAgICAgICAgICAgICAgaWYoYWdncmVnYXRlZFBheW9mZnNOdW1iZXI+MSl7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZvbnRTaXplKjAuNlxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLm1heCgyLCAxLjgqIHNlbGYuY29uZmlnLm5vZGVTaXplL2ZvbnRTaXplKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAvLyAuYXR0cigndGV4dC1hbmNob3InLCAnbWlkZGxlJylcbiAgICAgICAgICAgIC8vIC5hdHRyKCdkb21pbmFudC1iYXNlbGluZScsICdjZW50cmFsJylcbiAgICB9XG5cbiAgICBub2RlSW5kaWNhdG9yUG9zaXRpb24oc2VsZWN0aW9uKSB7XG4gICAgICAgIHJldHVybiBzZWxlY3Rpb25cbiAgICAgICAgICAgIC5hdHRyKCd4JywgdGhpcy5jb25maWcubm9kZVNpemUgLyAyICsgOClcbiAgICAgICAgICAgIC5hdHRyKCd5JywgLSB0aGlzLmNvbmZpZy5ub2RlU2l6ZS8yKVxuICAgICAgICAgICAgLmF0dHIoJ2RvbWluYW50LWJhc2VsaW5lJywgJ2NlbnRyYWwnKVxuICAgICAgICAgICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXG4gICAgfVxuXG4gICAgbm9kZVVuZm9sZEJ1dHRvblBvc2l0aW9uKHNlbGVjdGlvbikge1xuXG4gICAgICAgIHJldHVybiBzZWxlY3Rpb25cbiAgICAgICAgICAgIC5hdHRyKCd4JywgdGhpcy5jb25maWcubm9kZVNpemUgLyAyICsgNSlcbiAgICAgICAgICAgIC5hdHRyKCd5JywgMClcbiAgICAgICAgICAgIC5hdHRyKCdkb21pbmFudC1iYXNlbGluZScsICdjZW50cmFsJylcbiAgICB9XG5cbiAgICBlZGdlTGluZUQoZWRnZSl7XG4gICAgICAgIHZhciBsaW5lID0gZDMubGluZSgpXG4gICAgICAgICAgICAueChkPT4gZFswXSlcbiAgICAgICAgICAgIC55KGQ9PiBkWzFdKTtcbiAgICAgICAgLy8gLmN1cnZlKGQzLmN1cnZlQ2F0bXVsbFJvbS5hbHBoYSgwLjUpKTtcblxuXG4gICAgICAgIHZhciBwYXJlbnROb2RlID0gZWRnZS5wYXJlbnROb2RlO1xuICAgICAgICB2YXIgY2hpbGROb2RlID0gZWRnZS5jaGlsZE5vZGU7XG5cbiAgICAgICAgdmFyIGRYID0gY2hpbGROb2RlLmxvY2F0aW9uLnggLSBwYXJlbnROb2RlLmxvY2F0aW9uLng7XG4gICAgICAgIHZhciBkWSA9IGNoaWxkTm9kZS5sb2NhdGlvbi55IC0gcGFyZW50Tm9kZS5sb2NhdGlvbi55O1xuXG4gICAgICAgIHZhciBzaWduID0gZFg+PTAgPyAxIDogLTE7XG5cbiAgICAgICAgdmFyIHNsYW50U3RhcnRYT2Zmc2V0ID0gTWF0aC5taW4oZFgvMiwgdGhpcy5jb25maWcubm9kZVNpemUvMisxMCk7XG4gICAgICAgIHZhciBzbGFudFdpZHRoID0gTWF0aC5taW4odGhpcy5jb25maWcuZWRnZVNsYW50V2lkdGhNYXgsIE1hdGgubWF4KGRYLzIgLSBzbGFudFN0YXJ0WE9mZnNldCwgMCkpO1xuXG4gICAgICAgIHZhciBwb2ludDEgPSBbcGFyZW50Tm9kZS5sb2NhdGlvbi54ICt0aGlzLmNvbmZpZy5ub2RlU2l6ZS8yICsgMSwgcGFyZW50Tm9kZS5sb2NhdGlvbi55XTtcbiAgICAgICAgdmFyIHBvaW50MiA9IFtNYXRoLm1heChwYXJlbnROb2RlLmxvY2F0aW9uLngrc2xhbnRTdGFydFhPZmZzZXQsIHBvaW50MVswXSksIHBhcmVudE5vZGUubG9jYXRpb24ueV07XG4gICAgICAgIHZhciBwb2ludDMgPSBbcGFyZW50Tm9kZS5sb2NhdGlvbi54K3NsYW50U3RhcnRYT2Zmc2V0K3NsYW50V2lkdGgsIGNoaWxkTm9kZS5sb2NhdGlvbi55XTtcbiAgICAgICAgdmFyIHBvaW50NCA9IFtjaGlsZE5vZGUubG9jYXRpb24ueCAtIChzaWduKihNYXRoLm1heCgwLCBNYXRoLm1pbih0aGlzLmNvbmZpZy5ub2RlU2l6ZS8yKzgsIGRYLzIpKSkpLCBjaGlsZE5vZGUubG9jYXRpb24ueV07XG4gICAgICAgIC8vIHZhciBwb2ludDIgPSBbcGFyZW50Tm9kZS5sb2NhdGlvbi54K2RYLzItc2xhbnRXaWR0aC8yLCBwYXJlbnROb2RlLmxvY2F0aW9uLnldO1xuICAgICAgICAvLyB2YXIgcG9pbnQzID0gW2NoaWxkTm9kZS5sb2NhdGlvbi54LShkWC8yLXNsYW50V2lkdGgvMiksIGNoaWxkTm9kZS5sb2NhdGlvbi55XTtcblxuICAgICAgICBlZGdlLiRsaW5lUG9pbnRzID0gW3BvaW50MSwgcG9pbnQyLCBwb2ludDMsIHBvaW50NF07XG4gICAgICAgIHJldHVybiBsaW5lKGVkZ2UuJGxpbmVQb2ludHMpO1xuICAgIH1cblxuICAgIGVkZ2VQYXlvZmZQb3NpdGlvbihzZWxlY3Rpb24pIHtcbiAgICAgICAgTGF5b3V0LnNldEhhbmdpbmdQb3NpdGlvbihzZWxlY3Rpb24pXG4gICAgICAgICAgICAuYXR0cigneCcsIGQ9PmQuJGxpbmVQb2ludHNbMl1bMF0gKyAyKVxuICAgICAgICAgICAgLmF0dHIoJ3knLCBkPT5kLiRsaW5lUG9pbnRzWzJdWzFdICsgNyk7XG5cbiAgICAgICAgc2VsZWN0aW9uLnNlbGVjdEFsbCgndHNwYW4nKS5hdHRyKCd4JywgZnVuY3Rpb24oZCl7XG4gICAgICAgICAgICByZXR1cm4gZDMuc2VsZWN0KHRoaXMucGFyZW50Tm9kZSkuZGF0dW0oKS4kbGluZVBvaW50c1syXVswXSArIDJcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzZWxlY3Rpb247XG5cbiAgICB9XG5cbiAgICBlZGdlTGFiZWxQb3NpdGlvbihzZWxlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIHNlbGVjdGlvblxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGQ9Pid0cmFuc2xhdGUoJysoZC4kbGluZVBvaW50c1syXVswXSArIDIpKycsJysoZC4kbGluZVBvaW50c1syXVsxXSAtIDcpKycpJylcbiAgICAgICAgICAgIC8vIC5hdHRyKCd4JywgZD0+ZC4kbGluZVBvaW50c1syXVswXSArIDIpXG4gICAgICAgICAgICAvLyAuYXR0cigneScsIGQ9PmQuJGxpbmVQb2ludHNbMl1bMV0gLSA3KVxuXG4gICAgfVxuXG4gICAgZWRnZVByb2JhYmlsaXR5UG9zaXRpb24oc2VsZWN0aW9uKSB7XG4gICAgICAgIHJldHVybiBMYXlvdXQuc2V0SGFuZ2luZ1Bvc2l0aW9uKHNlbGVjdGlvbilcbiAgICAgICAgICAgIC5hdHRyKCd4JywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICB2YXIgbGVuID0gdGhpcy5nZXRDb21wdXRlZFRleHRMZW5ndGgoKTtcbiAgICAgICAgICAgICAgICB2YXIgbWluID0gZC4kbGluZVBvaW50c1syXVswXSArIDIgKyB0aGlzLnByZXZpb3VzU2libGluZy5jaGlsZE5vZGVzWzBdLmdldENvbXB1dGVkVGV4dExlbmd0aCgpICsgNyArIGxlbjtcbiAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5tYXgobWluLCBkLiRsaW5lUG9pbnRzWzNdWzBdIC0gOCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmF0dHIoJ3knLCBkPT5kLiRsaW5lUG9pbnRzWzJdWzFdICsgNylcbiAgICB9XG5cbiAgICBnZXRNaW5NYXJnaW5CZXR3ZWVuTm9kZXMoKXtcbiAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5ub2RlU2l6ZSArIDMwO1xuICAgIH1cblxuICAgIGdldFRleHRNaW5YKGQpe1xuICAgICAgICBsZXQgbWluWCA9IDA7XG4gICAgICAgIGlmKGQpe1xuICAgICAgICAgICAgbGV0IGJiID0gdGhpcy50cmVlRGVzaWduZXIuZ2V0VGV4dEQzU2VsZWN0aW9uKGQpLnNlbGVjdCgndGV4dCcpLm5vZGUoKS5nZXRCQm94KCk7XG4gICAgICAgICAgICBpZiAoYmIueCA8IDApIHtcbiAgICAgICAgICAgICAgICBtaW5YIC09IGJiLng7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1pblg7XG4gICAgfVxuXG4gICAgZ2V0VGV4dE1pblkoZCl7XG4gICAgICAgIGxldCBtaW5ZID0gMDtcbiAgICAgICAgaWYoZCl7XG4gICAgICAgICAgICBsZXQgYmIgPSB0aGlzLnRyZWVEZXNpZ25lci5nZXRUZXh0RDNTZWxlY3Rpb24oZCkuc2VsZWN0KCd0ZXh0Jykubm9kZSgpLmdldEJCb3goKTtcbiAgICAgICAgICAgIGlmIChiYi55IDwgMCkge1xuICAgICAgICAgICAgICAgIG1pblkgLT0gYmIueTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWluWTtcbiAgICB9XG5cbiAgICBnZXRUZXh0TWF4WChkKXtcbiAgICAgICAgcmV0dXJuIE51bWJlci5NQVhfU0FGRV9JTlRFR0VSO1xuICAgIH1cblxuXG4gICAgZ2V0Tm9kZU1pblgoZCl7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgaWYoZCAmJiBkLiRwYXJlbnQpey8vICYmICFzZWxmLmlzTm9kZVNlbGVjdGVkKGQuJHBhcmVudClcbiAgICAgICAgICAgIHJldHVybiBkLiRwYXJlbnQubG9jYXRpb24ueCArIHNlbGYuZ2V0TWluTWFyZ2luQmV0d2Vlbk5vZGVzKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNlbGYuY29uZmlnLm5vZGVTaXplLzI7XG4gICAgfVxuXG4gICAgZ2V0Tm9kZU1pblkoZCl7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5ub2RlU2l6ZS8yO1xuICAgIH1cblxuICAgIGdldE5vZGVNYXhYKGQpe1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgaWYoZCAmJiBkLmNoaWxkRWRnZXMubGVuZ3RoKXtcbiAgICAgICAgICAgIHJldHVybiBkMy5taW4oZC5jaGlsZEVkZ2VzLCBlPT4hZS5jaGlsZE5vZGUuJGhpZGRlbiA/IGUuY2hpbGROb2RlLmxvY2F0aW9uLnggOiA5OTk5OTk5KS1zZWxmLmdldE1pbk1hcmdpbkJldHdlZW5Ob2RlcygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUjtcbiAgICB9XG5cbiAgICBzZXRHcmlkV2lkdGgod2lkdGgsIHdpdGhvdXRTdGF0ZVNhdmluZyl7XG4gICAgICAgIHZhciBzZWxmPXRoaXM7XG4gICAgICAgIGlmKHRoaXMuY29uZmlnLmdyaWRXaWR0aD09PXdpZHRoKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZighd2l0aG91dFN0YXRlU2F2aW5nKXtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoe1xuICAgICAgICAgICAgICAgIGRhdGE6e1xuICAgICAgICAgICAgICAgICAgICBncmlkV2lkdGg6IHNlbGYuY29uZmlnLmdyaWRXaWR0aFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25VbmRvOiAoZGF0YSk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0R3JpZFdpZHRoKGRhdGEuZ3JpZFdpZHRoLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uUmVkbzogKGRhdGEpPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldEdyaWRXaWR0aCh3aWR0aCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbmZpZy5ncmlkV2lkdGg9d2lkdGg7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuXG4gICAgc2V0R3JpZEhlaWdodChncmlkSGVpZ2h0LCB3aXRob3V0U3RhdGVTYXZpbmcpe1xuICAgICAgICB2YXIgc2VsZj10aGlzO1xuICAgICAgICBpZih0aGlzLmNvbmZpZy5ncmlkSGVpZ2h0PT09Z3JpZEhlaWdodCl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYoIXdpdGhvdXRTdGF0ZVNhdmluZyl7XG4gICAgICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKHtcbiAgICAgICAgICAgICAgICBkYXRhOntcbiAgICAgICAgICAgICAgICAgICAgZ3JpZEhlaWdodDogc2VsZi5jb25maWcuZ3JpZEhlaWdodFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25VbmRvOiAoZGF0YSk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0R3JpZEhlaWdodChkYXRhLmdyaWRIZWlnaHQsIHRydWUpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25SZWRvOiAoZGF0YSk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0R3JpZEhlaWdodChncmlkSGVpZ2h0LCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29uZmlnLmdyaWRIZWlnaHQ9Z3JpZEhlaWdodDtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG5cbiAgICBzZXROb2RlU2l6ZShub2RlU2l6ZSwgd2l0aG91dFN0YXRlU2F2aW5nKXtcbiAgICAgICAgdmFyIHNlbGY9dGhpcztcbiAgICAgICAgaWYodGhpcy5jb25maWcubm9kZVNpemU9PT1ub2RlU2l6ZSl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYoIXdpdGhvdXRTdGF0ZVNhdmluZyl7XG4gICAgICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKHtcbiAgICAgICAgICAgICAgICBkYXRhOntcbiAgICAgICAgICAgICAgICAgICAgbm9kZVNpemU6IHNlbGYuY29uZmlnLm5vZGVTaXplXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvblVuZG86IChkYXRhKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXROb2RlU2l6ZShkYXRhLm5vZGVTaXplLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uUmVkbzogKGRhdGEpPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldE5vZGVTaXplKG5vZGVTaXplLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29uZmlnLm5vZGVTaXplPW5vZGVTaXplO1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICBpZih0aGlzLmlzTWFudWFsTGF5b3V0KCkpe1xuICAgICAgICAgICAgdGhpcy5maXROb2Rlc0luUGxvdHRpbmdSZWdpb24oc2VsZi5kYXRhLmdldFJvb3RzKCkpO1xuICAgICAgICAgICAgdGhpcy50cmVlRGVzaWduZXIucmVkcmF3KHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0RWRnZVNsYW50V2lkdGhNYXgod2lkdGgsIHdpdGhvdXRTdGF0ZVNhdmluZyl7XG4gICAgICAgIHZhciBzZWxmPXRoaXM7XG4gICAgICAgIGlmKHRoaXMuY29uZmlnLmVkZ2VTbGFudFdpZHRoTWF4PT09d2lkdGgpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmKCF3aXRob3V0U3RhdGVTYXZpbmcpe1xuICAgICAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSh7XG4gICAgICAgICAgICAgICAgZGF0YTp7XG4gICAgICAgICAgICAgICAgICAgIGVkZ2VTbGFudFdpZHRoTWF4OiBzZWxmLmNvbmZpZy5lZGdlU2xhbnRXaWR0aE1heFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25VbmRvOiAoZGF0YSk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0RWRnZVNsYW50V2lkdGhNYXgoZGF0YS5lZGdlU2xhbnRXaWR0aE1heCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvblJlZG86IChkYXRhKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRFZGdlU2xhbnRXaWR0aE1heCh3aWR0aCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbmZpZy5lZGdlU2xhbnRXaWR0aE1heD13aWR0aDtcbiAgICAgICAgdGhpcy50cmVlRGVzaWduZXIucmVkcmF3KHRydWUpO1xuICAgIH1cblxuICAgIGF1dG9MYXlvdXQodHlwZSwgd2l0aG91dFN0YXRlU2F2aW5nKXtcbiAgICAgICAgdmFyIHNlbGY9dGhpcztcblxuXG5cbiAgICAgICAgaWYoIXdpdGhvdXRTdGF0ZVNhdmluZyl7XG4gICAgICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKHtcbiAgICAgICAgICAgICAgICBkYXRhOntcbiAgICAgICAgICAgICAgICAgICAgbmV3TGF5b3V0OiB0eXBlLFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50TGF5b3V0OiBzZWxmLmNvbmZpZy50eXBlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvblVuZG86IChkYXRhKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jb25maWcudHlwZSA9IGRhdGEuY3VycmVudExheW91dDtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5fZmlyZU9uQXV0b0xheW91dENoYW5nZWRDYWxsYmFja3MoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uUmVkbzogKGRhdGEpPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmF1dG9MYXlvdXQoZGF0YS5uZXdMYXlvdXQsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29uZmlnLnR5cGUgPSB0eXBlO1xuICAgICAgICBpZighdGhpcy5kYXRhLm5vZGVzLmxlbmd0aCl7XG4gICAgICAgICAgICB0aGlzLl9maXJlT25BdXRvTGF5b3V0Q2hhbmdlZENhbGxiYWNrcygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHByZXZUcmVlTWF4WSA9IHNlbGYuZ2V0Tm9kZU1pblkoKTtcbiAgICAgICAgdGhpcy5kYXRhLmdldFJvb3RzKCkuZm9yRWFjaChyPT57XG4gICAgICAgICAgICB2YXIgcm9vdCA9IGQzLmhpZXJhcmNoeShyLCBkPT57XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuY2hpbGRFZGdlcy5maWx0ZXIoZT0+IWUuJGhpZGRlbikubWFwKGU9PmUuY2hpbGROb2RlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyByb290LnNvcnQoKGEsYik9PnNlbGYubm9kZVR5cGVPcmRlclthLmRhdGEudHlwZV0tc2VsZi5ub2RlVHlwZU9yZGVyW2IuZGF0YS50eXBlXSk7XG4gICAgICAgICAgICByb290LnNvcnQoKGEsYik9PmEuZGF0YS5sb2NhdGlvbi55IC0gYi5kYXRhLmxvY2F0aW9uLnkpO1xuXG5cbiAgICAgICAgICAgIHZhciBsYXlvdXQ7XG4gICAgICAgICAgICBpZih0eXBlPT09J2NsdXN0ZXInKXtcbiAgICAgICAgICAgICAgICBsYXlvdXQgPSBkMy5jbHVzdGVyKCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBsYXlvdXQgPSBkMy50cmVlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsYXlvdXQubm9kZVNpemUoW3NlbGYuY29uZmlnLmdyaWRIZWlnaHQsIHNlbGYuY29uZmlnLmdyaWRXaWR0aF0pO1xuICAgICAgICAgICAgbGF5b3V0LnNlcGFyYXRpb24oc2VsZi5ub2RlU2VwYXJhdGlvbik7XG5cbiAgICAgICAgICAgIGxheW91dChyb290KTtcbiAgICAgICAgICAgIHZhciBtaW5ZID0gOTk5OTk5OTk5O1xuICAgICAgICAgICAgcm9vdC5lYWNoKGQ9PntcbiAgICAgICAgICAgICAgICBtaW5ZID0gTWF0aC5taW4obWluWSwgZC54KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB2YXIgZHkgPSByb290LnggLSBtaW5ZICsgcHJldlRyZWVNYXhZO1xuICAgICAgICAgICAgdmFyIGR4ID0gc2VsZi5nZXROb2RlTWluWCgpO1xuICAgICAgICAgICAgdmFyIG1heFk9MDtcbiAgICAgICAgICAgIHJvb3QuZWFjaChkPT57XG4gICAgICAgICAgICAgICAgZC5kYXRhLmxvY2F0aW9uLnggPSBkLnkgKyBkeDtcbiAgICAgICAgICAgICAgICBkLmRhdGEubG9jYXRpb24ueSA9IGQueCArIGR5O1xuXG4gICAgICAgICAgICAgICAgbWF4WSA9IE1hdGgubWF4KG1heFksIGQuZGF0YS5sb2NhdGlvbi55KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBwcmV2VHJlZU1heFkgPSBtYXhZICsgc2VsZi5jb25maWcubm9kZVNpemUrc2VsZi50cmVlTWFyZ2luO1xuICAgICAgICB9KTtcblxuXG4gICAgICAgIC8vIHRoaXMudHJhbnNpdGlvbiA9IHRydWU7XG4gICAgICAgIHRoaXMudHJlZURlc2lnbmVyLnJlZHJhdyh0cnVlKTtcbiAgICAgICAgLy8gdGhpcy50cmFuc2l0aW9uID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5fZmlyZU9uQXV0b0xheW91dENoYW5nZWRDYWxsYmFja3MoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZml0Tm9kZXNJblBsb3R0aW5nUmVnaW9uKG5vZGVzKXtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgdG9wWSA9IGQzLm1pbihub2Rlcywgbj0+bi5sb2NhdGlvbi55KTtcbiAgICAgICAgdmFyIG1pblkgPSBzZWxmLmdldE5vZGVNaW5ZKCk7XG4gICAgICAgIHZhciBkeSA9IHRvcFkgLSBtaW5ZO1xuXG4gICAgICAgIHZhciBtaW5YID0gZDMubWluKG5vZGVzLCBuPT5uLmxvY2F0aW9uLngpO1xuICAgICAgICB2YXIgZHggPSBtaW5YIC0gc2VsZi5nZXROb2RlTWluWCgpO1xuXG4gICAgICAgIGlmKGR5PDAgfHwgIGR4PDApe1xuICAgICAgICAgICAgbm9kZXMuZm9yRWFjaChuPT5uLm1vdmUoLWR4LCAtZHkpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1vdmVOb2Rlcyhub2RlcywgZHgsIGR5LCBwaXZvdCl7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIGxpbWl0ID0gc2VsZi5jb25maWcubGltaXROb2RlUG9zaXRpb25pbmc7XG4gICAgICAgIGlmKGxpbWl0KXtcbiAgICAgICAgICAgIGlmKGR4PDApe1xuICAgICAgICAgICAgICAgIG5vZGVzLnNvcnQoKGEsYik9PmEubG9jYXRpb24ueC1iLmxvY2F0aW9uLngpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgbm9kZXMuc29ydCgoYSxiKT0+Yi5sb2NhdGlvbi54LWEubG9jYXRpb24ueCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIHZhciBtaW5ZID0gZDMubWluKG5vZGVzLCBkPT5kLmxvY2F0aW9uLnkpO1xuICAgICAgICBpZihtaW5ZICsgZHkgPCBzZWxmLmdldE5vZGVNaW5ZKCkpe1xuICAgICAgICAgICAgZHkgPSBzZWxmLmdldE5vZGVNaW5ZKCkgLSBtaW5ZO1xuICAgICAgICB9XG5cbiAgICAgICAgbm9kZXMuZm9yRWFjaChkPT57XG4gICAgICAgICAgICBpZihsaW1pdCl7XG4gICAgICAgICAgICAgICAgTGF5b3V0LmJhY2t1cE5vZGVMb2NhdGlvbihkKTtcbiAgICAgICAgICAgICAgICB2YXIgbWluWCA9IHNlbGYuZ2V0Tm9kZU1pblgoZCk7XG4gICAgICAgICAgICAgICAgdmFyIG1heFggPSBzZWxmLmdldE5vZGVNYXhYKGQpO1xuXG4gICAgICAgICAgICAgICAgZC5sb2NhdGlvbi54ID0gTWF0aC5taW4oTWF0aC5tYXgoZC5sb2NhdGlvbi54K2R4LCBtaW5YKSwgbWF4WCk7XG4gICAgICAgICAgICAgICAgZC5sb2NhdGlvbi55ICs9IGR5O1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgZC5sb2NhdGlvbi54ICs9ZHg7XG4gICAgICAgICAgICAgICAgZC5sb2NhdGlvbi55ICs9IGR5O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgdmFyIHJldmVydFggPSBwaXZvdCAmJiBzZWxmLmNvbmZpZy5saW1pdE5vZGVQb3NpdGlvbmluZyAmJiAocGl2b3QubG9jYXRpb24ueCA9PT0gcGl2b3QuJGxvY2F0aW9uLngpO1xuXG4gICAgICAgIG5vZGVzLmZvckVhY2goZD0+e1xuICAgICAgICAgICAgaWYocmV2ZXJ0WCl7XG4gICAgICAgICAgICAgICAgZC5sb2NhdGlvbi54ID0gZC4kbG9jYXRpb24ueDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYudHJlZURlc2lnbmVyLnVwZGF0ZU5vZGVQb3NpdGlvbihkKTtcbiAgICAgICAgfSk7XG5cblxuICAgIH1cblxuICAgIG1vdmVUZXh0cyh0ZXh0cywgZHgsIGR5KXtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBsZXQgbGltaXQgPSBzZWxmLmNvbmZpZy5saW1pdFRleHRQb3NpdGlvbmluZztcbiAgICAgICAgaWYobGltaXQpe1xuICAgICAgICAgICAgaWYoZHg8MCl7XG4gICAgICAgICAgICAgICAgdGV4dHMuc29ydCgoYSxiKT0+YS5sb2NhdGlvbi54LWIubG9jYXRpb24ueCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0ZXh0cy5zb3J0KChhLGIpPT5iLmxvY2F0aW9uLngtYS5sb2NhdGlvbi54KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cblxuICAgICAgICB0ZXh0cy5mb3JFYWNoKGQ9PntcblxuXG5cblxuICAgICAgICAgICAgaWYobGltaXQpe1xuICAgICAgICAgICAgICAgIGxldCBtaW5YID0gc2VsZi5nZXRUZXh0TWluWChkKTtcbiAgICAgICAgICAgICAgICBsZXQgbWF4WCA9IHNlbGYuZ2V0VGV4dE1heFgoZCk7XG4gICAgICAgICAgICAgICAgbGV0IG1pblkgPSBzZWxmLmdldFRleHRNaW5ZKGQpO1xuXG5cbiAgICAgICAgICAgICAgICBkLmxvY2F0aW9uLnggPSBNYXRoLm1pbihNYXRoLm1heChkLmxvY2F0aW9uLngrZHgsIG1pblgpLCBtYXhYKTtcbiAgICAgICAgICAgICAgICBkLmxvY2F0aW9uLnkgPSBNYXRoLm1heChkLmxvY2F0aW9uLnkrZHksIG1pblkpO1xuXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBkLmxvY2F0aW9uLm1vdmUoZHgsIGR5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYudHJlZURlc2lnbmVyLnVwZGF0ZVRleHRQb3NpdGlvbihkKTtcblxuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIHN0YXRpYyBiYWNrdXBOb2RlTG9jYXRpb24obm9kZSkge1xuICAgICAgICBub2RlLiRsb2NhdGlvbiA9IG5ldyBtb2RlbC5Qb2ludChub2RlLmxvY2F0aW9uKTtcbiAgICB9XG5cbiAgICBfZmlyZU9uQXV0b0xheW91dENoYW5nZWRDYWxsYmFja3MoKXtcbiAgICAgICAgdGhpcy5vbkF1dG9MYXlvdXRDaGFuZ2VkLmZvckVhY2goYz0+Yyh0aGlzLmNvbmZpZy50eXBlKSk7XG4gICAgfVxuXG4gICAgc3RhdGljIHNldEhhbmdpbmdQb3NpdGlvbihzZWxlY3Rpb24pe1xuICAgICAgICAvLyB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAvLyAgICAgc2VsZWN0aW9uLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgLy8gICAgICAgICB2YXIgaCA9ICB0aGlzLmdldEJCb3goKS5oZWlnaHQ7XG4gICAgICAgIC8vICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLmF0dHIoJ2R5JywgaCk7XG4gICAgICAgIC8vICAgICB9KTtcbiAgICAgICAgLy8gfSwwKTtcblxuICAgICAgICBpZihBcHBVdGlscy5pc0hpZGRlbihzZWxlY3Rpb24ubm9kZSgpKSl7IC8vIHNldHRpbmcgaGFuZ2luZyBwb3NpdGlvbiBvZiBoaWRkZW4gZWxlbWVudHMgZmFpbHMgb24gZmlyZWZveFxuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdGlvbjtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgc2VsZWN0aW9uLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciBoID0gIHRoaXMuZ2V0QkJveCgpLmhlaWdodDtcbiAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5hdHRyKCdkeScsICcwLjc1ZW0nKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGVjdGlvbjtcbiAgICB9XG5cbn1cblxuXG4iLCJpbXBvcnQge0FwcFV0aWxzfSBmcm9tICcuL2FwcC11dGlscydcbmltcG9ydCAqIGFzIGQzIGZyb20gJy4vZDMnXG5pbXBvcnQge0NvbnRleHRNZW51fSBmcm9tICcuL2NvbnRleHQtbWVudS9jb250ZXh0LW1lbnUnXG5cbmV4cG9ydCBjbGFzcyBOb2RlRHJhZ0hhbmRsZXJ7XG5cbiAgICB0cmVlRGVzaWduZXI7XG4gICAgZGF0YTtcbiAgICBjb25maWc7XG5cbiAgICBkcmFnO1xuICAgIHN0YXRlU25hcHNob3QgPSBudWxsO1xuXG5cbiAgICBjb25zdHJ1Y3Rvcih0cmVlRGVzaWduZXIsIGRhdGEpe1xuICAgICAgICB0aGlzLnRyZWVEZXNpZ25lciA9IHRyZWVEZXNpZ25lcjtcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcblxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuZHJhZyA9IGQzLmRyYWcoKVxuICAgICAgICAgICAgLnN1YmplY3QoZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICAgIGlmKGQ9PW51bGwpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IGV2ZW50LngsXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiBldmVudC55XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciB0ID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IHQuYXR0cihcInhcIikgKyBBcHBVdGlscy5nZXRUcmFuc2xhdGlvbih0LmF0dHIoXCJ0cmFuc2Zvcm1cIikpWzBdLFxuICAgICAgICAgICAgICAgICAgICB5OiB0LmF0dHIoXCJ5XCIpICsgQXBwVXRpbHMuZ2V0VHJhbnNsYXRpb24odC5hdHRyKFwidHJhbnNmb3JtXCIpKVsxXVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKFwic3RhcnRcIiwgZnVuY3Rpb24oZCl7XG4gICAgICAgICAgICAgICAgc2VsZi5kcmFnU3RhcnRlZC5jYWxsKHRoaXMsZCwgc2VsZilcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oXCJkcmFnXCIsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5vbkRyYWcuY2FsbCh0aGlzLCBkLCBzZWxmKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oXCJlbmRcIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmRyYWdFbmRlZC5jYWxsKHRoaXMsIGQsIHNlbGYpO1xuICAgICAgICAgICAgfSlcbiAgICB9XG5cblxuICAgIGRyYWdTdGFydGVkKGQsc2VsZikge1xuICAgICAgICBpZihzZWxmLmlnbm9yZURyYWcpe1xuICAgICAgICAgICAgc2VsZi5pZ25vcmVEcmFnPWZhbHNlO1xuICAgICAgICAgICAgc2VsZi5pZ25vcmVkRHJhZz10cnVlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHNlbGYuaWdub3JlZERyYWc9ZmFsc2U7XG4gICAgICAgIHNlbGYuc3RhdGVTbmFwc2hvdCA9IHNlbGYuZGF0YS5jcmVhdGVTdGF0ZVNuYXBzaG90KCk7XG5cbiAgICAgICAgLy8gc2VsZi50cmVlRGVzaWduZXIubGF5b3V0LmRpc2FibGVBdXRvTGF5b3V0KCk7XG4gICAgICAgIENvbnRleHRNZW51LmhpZGUoKTtcbiAgICAgICAgdmFyIG5vZGUgPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgIGlmKCFub2RlLmNsYXNzZWQoXCJzZWxlY3RlZFwiKSl7XG4gICAgICAgICAgICBzZWxmLnRyZWVEZXNpZ25lci5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2VsZi50cmVlRGVzaWduZXIuc2VsZWN0Tm9kZShkKTtcbiAgICAgICAgbm9kZS5jbGFzc2VkKFwic2VsZWN0ZWQgZHJhZ2dpbmdcIiwgdHJ1ZSk7XG4gICAgICAgIHNlbGYuc2VsZWN0ZWROb2RlcyA9IHNlbGYudHJlZURlc2lnbmVyLmdldFNlbGVjdGVkTm9kZXModHJ1ZSk7XG4gICAgICAgIHNlbGYucHJldkRyYWdFdmVudCA9IGQzLmV2ZW50O1xuICAgICAgICBzZWxmLmRyYWdFdmVudENvdW50ID0gMDtcbiAgICB9XG5cbiAgICBvbkRyYWcoZHJhZ2dlZE5vZGUsIHNlbGYpe1xuICAgICAgICBpZihzZWxmLmlnbm9yZWREcmFnKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHNlbGYuZHJhZ0V2ZW50Q291bnQ9PT0yICYmIHNlbGYuc3RhdGVTbmFwc2hvdCl7XG4gICAgICAgICAgICBzZWxmLmRhdGEuc2F2ZVN0YXRlRnJvbVNuYXBzaG90KHNlbGYuc3RhdGVTbmFwc2hvdCk7IC8vIFRPRE8gc2F2ZSBvbmx5IGlmIHNvbWV0aGluZyBoYXMgcmVhbGx5IGNoYW5nZWRcbiAgICAgICAgICAgIHNlbGYuc3RhdGVTbmFwc2hvdCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5kcmFnRXZlbnRDb3VudCsrO1xuICAgICAgICBpZihzZWxmLnNlbGVjdGVkTm9kZXMubGVuZ3RoPjUgJiYgc2VsZi5kcmFnRXZlbnRDb3VudCUyIT09MSl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZHggPSBkMy5ldmVudC54IC0gc2VsZi5wcmV2RHJhZ0V2ZW50Lng7XG4gICAgICAgIHZhciBkeSA9IGQzLmV2ZW50LnktIHNlbGYucHJldkRyYWdFdmVudC55O1xuICAgICAgICBzZWxmLnRyZWVEZXNpZ25lci5sYXlvdXQubW92ZU5vZGVzKHNlbGYuc2VsZWN0ZWROb2RlcywgZHgsIGR5LCBkcmFnZ2VkTm9kZSk7XG5cblxuICAgICAgICBzZWxmLnByZXZEcmFnRXZlbnQgPSBkMy5ldmVudDtcbiAgICAgICAgc2VsZi50cmVlRGVzaWduZXIucmVkcmF3RWRnZXMoKTtcbiAgICAgICAgc2VsZi50cmVlRGVzaWduZXIudXBkYXRlUGxvdHRpbmdSZWdpb25TaXplKCk7XG4gICAgfVxuXG4gICAgZHJhZ0VuZGVkKGRyYWdnZWROb2RlLCBzZWxmKXtcbiAgICAgICAgdmFyIG5vZGUgPSBkMy5zZWxlY3QodGhpcykuY2xhc3NlZChcImRyYWdnaW5nXCIsIGZhbHNlKTtcbiAgICAgICAgaWYoc2VsZi5pZ25vcmVkRHJhZyl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi50cmVlRGVzaWduZXIubGF5b3V0LnVwZGF0ZShkcmFnZ2VkTm9kZSlcbiAgICB9XG5cbiAgICBjYW5jZWxEcmFnKCl7XG4gICAgICAgIHRoaXMuaWdub3JlRHJhZyA9IHRydWU7XG4gICAgfVxuXG59XG5cblxuIiwidmFyIGVwc2lsb24gPSAxZS0xMjtcbnZhciBwaSA9IE1hdGguUEk7XG52YXIgaGFsZlBpID0gcGkgLyAyO1xudmFyIHRhdSA9IDIgKiBwaTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIC8qZHJhdzogZnVuY3Rpb24oY29udGV4dCwgc2l6ZSkge1xuICAgICAgICB2YXIgciA9IE1hdGguc3FydChzaXplIC8gcGkpO1xuICAgICAgICBjb250ZXh0Lm1vdmVUbyhyLCAwKTtcbiAgICAgICAgY29udGV4dC5hcmMoMCwgMCwgciwgMCwgdGF1KTtcbiAgICB9Ki9cbiAgICBkcmF3OiBmdW5jdGlvbihjb250ZXh0LCBzaXplKSB7XG5cbiAgICAgICAgdmFyIHIgPSBNYXRoLnNxcnQoc2l6ZSAvIHBpKTtcbiAgICAgICAgdmFyIGRpc3QgPTAuNTUyMjg0NzQ5ODMxICogcjtcblxuICAgICAgICBjb250ZXh0Lm1vdmVUbygtciwgMClcbiAgICAgICAgLy8gY29udGV4dC5saW5lVG8oMipyLCAyKnIpXG4gICAgICAgIC8vIGNvbnRleHQuYmV6aWVyQ3VydmVUbygtciwgLWRpc3QsIC1kaXN0LCAtciwgMCwtcik7XG4gICAgICAgIGNvbnRleHQuYmV6aWVyQ3VydmVUbygtciwgLWRpc3QsIC1kaXN0LCAtciwgMCwtcik7XG5cbiAgICAgICAgY29udGV4dC5iZXppZXJDdXJ2ZVRvKGRpc3QsIC1yLCByLCAtZGlzdCwgciwwKTtcblxuICAgICAgICBjb250ZXh0LmJlemllckN1cnZlVG8ociwgZGlzdCwgZGlzdCwgciwgMCwgcik7XG5cbiAgICAgICAgY29udGV4dC5iZXppZXJDdXJ2ZVRvKC1kaXN0LCByLCAtciwgZGlzdCwgLXIsIDApO1xuICAgIH1cbn07XG4iLCJ2YXIgc3FydDMgPSBNYXRoLnNxcnQoMyk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBkcmF3OiBmdW5jdGlvbihjb250ZXh0LCBzaXplKSB7XG4gICAgICAgIHZhciByID0gTWF0aC5zcXJ0KHNpemUgLyBNYXRoLlBJKTtcbiAgICAgICAgY29udGV4dC5tb3ZlVG8oLXIsIDApO1xuICAgICAgICBjb250ZXh0LmxpbmVUbygwLjkqciwgLXIpO1xuICAgICAgICBjb250ZXh0LmxpbmVUbygwLjkqciwgcik7XG4gICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgfVxufTtcbiIsImltcG9ydCB7VXRpbHN9IGZyb20gXCJzZC11dGlsc1wiO1xuaW1wb3J0IHtpMThufSBmcm9tICcuL2kxOG4vaTE4bidcblxuZXhwb3J0IGNsYXNzIFRlbXBsYXRlc3tcblxuICAgIHN0YXRpYyBncm93bCA9IHJlcXVpcmUoJy4vdGVtcGxhdGVzL2dyb3dsX21lc3NhZ2UuaHRtbCcpO1xuXG4gICAgc3RhdGljIGdldCh0ZW1wbGF0ZU5hbWUsIHZhcmlhYmxlcyl7XG4gICAgICAgIHZhciBjb21waWxlZCA9IFV0aWxzLnRlbXBsYXRlKFRlbXBsYXRlc1t0ZW1wbGF0ZU5hbWVdLHsgJ2ltcG9ydHMnOiB7ICdpMThuJzogaTE4biwgJ1RlbXBsYXRlcyc6IFRlbXBsYXRlcywgJ2luY2x1ZGUnOiBmdW5jdGlvbihuLCB2KSB7cmV0dXJuIFRlbXBsYXRlcy5nZXQobiwgdil9IH0gfSk7XG4gICAgICAgIGlmKHZhcmlhYmxlcyl7XG4gICAgICAgICAgICB2YXJpYWJsZXMudmFyaWFibGVzID0gdmFyaWFibGVzO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHZhcmlhYmxlcyA9IHt2YXJpYWJsZXM6e319XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbXBpbGVkKHZhcmlhYmxlcylcblxuICAgIH1cblxuICAgIHN0YXRpYyBzdHlsZVJ1bGUoc2VsZWN0b3IsIHByb3BzKXtcbiAgICAgICAgdmFyIHMgPSBzZWxlY3RvcisgJ3snO1xuICAgICAgICBwcm9wcy5mb3JFYWNoKHA9PiBzKz1UZW1wbGF0ZXMuc3R5bGVQcm9wKHBbMF0sIHBbMV0pKTtcbiAgICAgICAgcys9J30gJztcbiAgICAgICAgcmV0dXJuIHM7XG4gICAgfVxuICAgIHN0YXRpYyBzdHlsZVByb3Aoc3R5bGVOYW1lLCB2YXJpYWJsZU5hbWUpe1xuICAgICAgICByZXR1cm4gIHN0eWxlTmFtZSsnOiA8JT0gJyt2YXJpYWJsZU5hbWUrJyAlPjsgJ1xuICAgIH1cblxuICAgIHN0YXRpYyB0cmVlRGVzaWduZXJTZWxlY3RvciA9ICdzdmcuc2QtdHJlZS1kZXNpZ25lcic7XG4gICAgc3RhdGljIG5vZGVTZWxlY3Rvcih0eXBlLCBjbGF6eil7XG4gICAgICAgIHZhciBzID0gVGVtcGxhdGVzLnRyZWVEZXNpZ25lclNlbGVjdG9yKycgLm5vZGUnO1xuICAgICAgICBpZih0eXBlKXtcbiAgICAgICAgICAgIHMrPScuJyt0eXBlKyctbm9kZSc7XG4gICAgICAgIH1cbiAgICAgICAgaWYoY2xhenope1xuICAgICAgICAgICAgcys9Jy4nK2NsYXp6O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzO1xuICAgIH1cbiAgICBzdGF0aWMgZWRnZVNlbGVjdG9yKGNsYXp6KXtcbiAgICAgICAgdmFyIHMgPSBUZW1wbGF0ZXMudHJlZURlc2lnbmVyU2VsZWN0b3IrJyAuZWRnZSc7XG4gICAgICAgIGlmKGNsYXp6KXtcbiAgICAgICAgICAgIHMrPScuJytjbGF6ejtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcztcbiAgICB9XG5cbiAgICBzdGF0aWMgdHJlZURlc2lnbmVyU3R5bGVzID1cblxuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy50cmVlRGVzaWduZXJTZWxlY3RvcixbXG4gICAgICAgICAgICBbJ2ZvbnQtc2l6ZScsICdmb250U2l6ZSddLFxuICAgICAgICAgICAgWydmb250LWZhbWlseScsICdmb250RmFtaWx5J10sXG4gICAgICAgICAgICBbJ2ZvbnQtd2VpZ2h0JywgJ2ZvbnRXZWlnaHQnXSxcbiAgICAgICAgICAgIFsnZm9udC1zdHlsZScsICdmb250U3R5bGUnXVxuICAgICAgICBdKStcbiAgICAgICAgLy8gICBub2RlXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLm5vZGVTZWxlY3RvcigpKycgcGF0aCcsW1xuICAgICAgICAgICAgWydmaWxsJywgJ25vZGUuZmlsbCddLFxuICAgICAgICAgICAgWydzdHJva2Utd2lkdGgnLCAnbm9kZS5zdHJva2VXaWR0aCddXG4gICAgICAgIF0pK1xuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5ub2RlU2VsZWN0b3IoJ2RlY2lzaW9uJywgJ29wdGltYWwnKSsnIHBhdGgsICcrVGVtcGxhdGVzLm5vZGVTZWxlY3RvcignY2hhbmNlJywgJ29wdGltYWwnKSsnIHBhdGgsJyArVGVtcGxhdGVzLm5vZGVTZWxlY3RvcigndGVybWluYWwnLCAnb3B0aW1hbCcpKycgcGF0aCcsW1xuICAgICAgICAgICAgWydzdHJva2UnLCAnbm9kZS5vcHRpbWFsLnN0cm9rZSddLFxuICAgICAgICAgICAgWydzdHJva2Utd2lkdGgnLCAnbm9kZS5vcHRpbWFsLnN0cm9rZVdpZHRoJ11cbiAgICAgICAgXSkrXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLm5vZGVTZWxlY3RvcigpKycgLmxhYmVsJyxbXG4gICAgICAgICAgICBbJ2ZvbnQtc2l6ZScsICdub2RlLmxhYmVsLmZvbnRTaXplJ10sXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnbm9kZS5sYWJlbC5jb2xvciddXG4gICAgICAgIF0pK1xuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5ub2RlU2VsZWN0b3IoKSsnIC5wYXlvZmYnLFtcbiAgICAgICAgICAgIFsnZm9udC1zaXplJywgJ25vZGUucGF5b2ZmLmZvbnRTaXplJ10sXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnbm9kZS5wYXlvZmYuY29sb3InXSxcbiAgICAgICAgXSkrXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLm5vZGVTZWxlY3RvcigpKycgLnBheW9mZi5uZWdhdGl2ZScsW1xuICAgICAgICAgICAgWydmaWxsJywgJ25vZGUucGF5b2ZmLm5lZ2F0aXZlQ29sb3InXSxcbiAgICAgICAgXSkrXG5cbiAgICAgICAgLy8gICAgZGVjaXNpb24gbm9kZVxuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5ub2RlU2VsZWN0b3IoJ2RlY2lzaW9uJykrJyBwYXRoJyxbXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnbm9kZS5kZWNpc2lvbi5maWxsJ10sXG4gICAgICAgICAgICBbJ3N0cm9rZScsICdub2RlLmRlY2lzaW9uLnN0cm9rZSddXG4gICAgICAgIF0pK1xuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5ub2RlU2VsZWN0b3IoJ2RlY2lzaW9uJywgJ3NlbGVjdGVkJykrJyBwYXRoJyxbXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnbm9kZS5kZWNpc2lvbi5zZWxlY3RlZC5maWxsJ11cbiAgICAgICAgXSkrXG5cbiAgICAgICAgLy8gICAgY2hhbmNlIG5vZGVcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCdjaGFuY2UnKSsnIHBhdGgnLFtcbiAgICAgICAgICAgIFsnZmlsbCcsICdub2RlLmNoYW5jZS5maWxsJ10sXG4gICAgICAgICAgICBbJ3N0cm9rZScsICdub2RlLmNoYW5jZS5zdHJva2UnXVxuICAgICAgICBdKStcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCdjaGFuY2UnLCAnc2VsZWN0ZWQnKSsnIHBhdGgnLFtcbiAgICAgICAgICAgIFsnZmlsbCcsICdub2RlLmNoYW5jZS5zZWxlY3RlZC5maWxsJ11cbiAgICAgICAgXSkrXG5cbiAgICAgICAgLy8gICAgdGVybWluYWwgbm9kZVxuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5ub2RlU2VsZWN0b3IoJ3Rlcm1pbmFsJykrJyBwYXRoJyxbXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnbm9kZS50ZXJtaW5hbC5maWxsJ10sXG4gICAgICAgICAgICBbJ3N0cm9rZScsICdub2RlLnRlcm1pbmFsLnN0cm9rZSddXG4gICAgICAgIF0pK1xuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5ub2RlU2VsZWN0b3IoJ3Rlcm1pbmFsJywgJ3NlbGVjdGVkJykrJyBwYXRoJyxbXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnbm9kZS50ZXJtaW5hbC5zZWxlY3RlZC5maWxsJ11cbiAgICAgICAgXSkrXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLm5vZGVTZWxlY3RvcigndGVybWluYWwnKSsnIC5hZ2dyZWdhdGVkLXBheW9mZicsW1xuICAgICAgICAgICAgWydmb250LXNpemUnLCAnbm9kZS50ZXJtaW5hbC5wYXlvZmYuZm9udFNpemUnXSxcbiAgICAgICAgICAgIFsnZmlsbCcsICdub2RlLnRlcm1pbmFsLnBheW9mZi5jb2xvciddLFxuICAgICAgICBdKStcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCd0ZXJtaW5hbCcpKycgLmFnZ3JlZ2F0ZWQtcGF5b2ZmLm5lZ2F0aXZlJyxbXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnbm9kZS50ZXJtaW5hbC5wYXlvZmYubmVnYXRpdmVDb2xvciddLFxuICAgICAgICBdKStcblxuXG4gICAgICAgIC8vcHJvYmFiaWxpdHlcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMudHJlZURlc2lnbmVyU2VsZWN0b3IrJyAubm9kZSAucHJvYmFiaWxpdHktdG8tZW50ZXIsICcrVGVtcGxhdGVzLnRyZWVEZXNpZ25lclNlbGVjdG9yKycgLmVkZ2UgLnByb2JhYmlsaXR5JyxbXG4gICAgICAgICAgICBbJ2ZvbnQtc2l6ZScsICdwcm9iYWJpbGl0eS5mb250U2l6ZSddLFxuICAgICAgICAgICAgWydmaWxsJywgJ3Byb2JhYmlsaXR5LmNvbG9yJ11cbiAgICAgICAgXSkrXG5cbiAgICAgICAgLy9lZGdlXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLmVkZ2VTZWxlY3RvcigpKycgcGF0aCcsW1xuICAgICAgICAgICAgWydzdHJva2UnLCAnZWRnZS5zdHJva2UnXSxcbiAgICAgICAgICAgIFsnc3Ryb2tlLXdpZHRoJywgJ2VkZ2Uuc3Ryb2tlV2lkdGgnXVxuICAgICAgICBdKStcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMudHJlZURlc2lnbmVyU2VsZWN0b3IrJyBtYXJrZXIjYXJyb3cgcGF0aCcsW1xuICAgICAgICAgICAgWydmaWxsJywgJ2VkZ2Uuc3Ryb2tlJ10sXG4gICAgICAgIF0pK1xuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5lZGdlU2VsZWN0b3IoJ29wdGltYWwnKSsnIHBhdGgnLFtcbiAgICAgICAgICAgIFsnc3Ryb2tlJywgJ2VkZ2Uub3B0aW1hbC5zdHJva2UnXSxcbiAgICAgICAgICAgIFsnc3Ryb2tlLXdpZHRoJywgJ2VkZ2Uub3B0aW1hbC5zdHJva2VXaWR0aCddXG4gICAgICAgIF0pK1xuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy50cmVlRGVzaWduZXJTZWxlY3RvcisnIG1hcmtlciNhcnJvdy1vcHRpbWFsIHBhdGgnLFtcbiAgICAgICAgICAgIFsnZmlsbCcsICdlZGdlLm9wdGltYWwuc3Ryb2tlJ10sXG4gICAgICAgIF0pK1xuXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLmVkZ2VTZWxlY3Rvcignc2VsZWN0ZWQnKSsnIHBhdGgnLFtcbiAgICAgICAgICAgIFsnc3Ryb2tlJywgJ2VkZ2Uuc2VsZWN0ZWQuc3Ryb2tlJ10sXG4gICAgICAgICAgICBbJ3N0cm9rZS13aWR0aCcsICdlZGdlLnNlbGVjdGVkLnN0cm9rZVdpZHRoJ11cbiAgICAgICAgXSkrXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLnRyZWVEZXNpZ25lclNlbGVjdG9yKycgbWFya2VyI2Fycm93LXNlbGVjdGVkIHBhdGgnLFtcbiAgICAgICAgICAgIFsnZmlsbCcsICdlZGdlLnNlbGVjdGVkLnN0cm9rZSddLFxuICAgICAgICBdKStcblxuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5lZGdlU2VsZWN0b3IoKSsnIC5sYWJlbCcsW1xuICAgICAgICAgICAgWydmb250LXNpemUnLCAnZWRnZS5sYWJlbC5mb250U2l6ZSddLFxuICAgICAgICAgICAgWydmaWxsJywgJ2VkZ2UubGFiZWwuY29sb3InXVxuICAgICAgICBdKStcblxuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5lZGdlU2VsZWN0b3IoKSsnIC5wYXlvZmYnLFtcbiAgICAgICAgICAgIFsnZm9udC1zaXplJywgJ2VkZ2UucGF5b2ZmLmZvbnRTaXplJ10sXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnZWRnZS5wYXlvZmYuY29sb3InXSxcbiAgICAgICAgXSkrXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLmVkZ2VTZWxlY3RvcigpKycgLnBheW9mZi5uZWdhdGl2ZScsW1xuICAgICAgICAgICAgWydmaWxsJywgJ2VkZ2UucGF5b2ZmLm5lZ2F0aXZlQ29sb3InXSxcbiAgICAgICAgXSkrXG5cbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMudHJlZURlc2lnbmVyU2VsZWN0b3IrJyAuc2QtdGl0bGUtY29udGFpbmVyIHRleHQuc2QtdGl0bGUnLFtcbiAgICAgICAgICAgIFsnZm9udC1zaXplJywgJ3RpdGxlLmZvbnRTaXplJ10sXG4gICAgICAgICAgICBbJ2ZvbnQtd2VpZ2h0JywgJ3RpdGxlLmZvbnRXZWlnaHQnXSxcbiAgICAgICAgICAgIFsnZm9udC1zdHlsZScsICd0aXRsZS5mb250U3R5bGUnXSxcbiAgICAgICAgICAgIFsnZmlsbCcsICd0aXRsZS5jb2xvciddXG4gICAgICAgIF0pICtcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMudHJlZURlc2lnbmVyU2VsZWN0b3IrJyAuc2QtdGl0bGUtY29udGFpbmVyIHRleHQuc2QtZGVzY3JpcHRpb24nLFtcbiAgICAgICAgICAgIFsnZm9udC1zaXplJywgJ2Rlc2NyaXB0aW9uLmZvbnRTaXplJ10sXG4gICAgICAgICAgICBbJ2ZvbnQtd2VpZ2h0JywgJ2Rlc2NyaXB0aW9uLmZvbnRXZWlnaHQnXSxcbiAgICAgICAgICAgIFsnZm9udC1zdHlsZScsICdkZXNjcmlwdGlvbi5mb250U3R5bGUnXSxcbiAgICAgICAgICAgIFsnZmlsbCcsICdkZXNjcmlwdGlvbi5jb2xvciddXG4gICAgICAgIF0pXG59XG5cblxuXG5cbiIsIm1vZHVsZS5leHBvcnRzID0gXCJtb2R1bGUuZXhwb3J0cyA9IFxcXCI8ZGl2IGNsYXNzPVxcXFxcXFwic2QtZ3Jvd2wtbWVzc2FnZSA8JT10eXBlJT5cXFxcXFxcIj5cXFxcbiAgICA8ZGl2IGNsYXNzPVxcXFxcXFwic2QtZ3Jvd2wtbWVzc2FnZS10ZXh0XFxcXFxcXCI+XFxcXG4gICAgICAgIDwlPSBtZXNzYWdlICU+XFxcXG4gICAgPC9kaXY+XFxcXG48L2Rpdj5cXFxcblxcXCI7XFxuXCI7XG4iLCJpbXBvcnQge0FwcFV0aWxzfSBmcm9tICcuL2FwcC11dGlscydcbmltcG9ydCAqIGFzIGQzIGZyb20gJy4vZDMnXG5pbXBvcnQge0NvbnRleHRNZW51fSBmcm9tICcuL2NvbnRleHQtbWVudS9jb250ZXh0LW1lbnUnXG5cbmV4cG9ydCBjbGFzcyBUZXh0RHJhZ0hhbmRsZXJ7XG5cbiAgICB0cmVlRGVzaWduZXI7XG4gICAgZGF0YTtcbiAgICBjb25maWc7XG5cbiAgICBkcmFnO1xuXG5cbiAgICBjb25zdHJ1Y3Rvcih0cmVlRGVzaWduZXIsIGRhdGEpe1xuICAgICAgICB0aGlzLnRyZWVEZXNpZ25lciA9IHRyZWVEZXNpZ25lcjtcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcblxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuZHJhZyA9IGQzLmRyYWcoKVxuICAgICAgICAgICAgLnN1YmplY3QoZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICAgIGlmKGQ9PW51bGwpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IGV2ZW50LngsXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiBldmVudC55XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciB0ID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IHQuYXR0cihcInhcIikgKyBBcHBVdGlscy5nZXRUcmFuc2xhdGlvbih0LmF0dHIoXCJ0cmFuc2Zvcm1cIikpWzBdLFxuICAgICAgICAgICAgICAgICAgICB5OiB0LmF0dHIoXCJ5XCIpICsgQXBwVXRpbHMuZ2V0VHJhbnNsYXRpb24odC5hdHRyKFwidHJhbnNmb3JtXCIpKVsxXVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKFwic3RhcnRcIiwgZnVuY3Rpb24oZCl7XG4gICAgICAgICAgICAgICAgc2VsZi5kcmFnU3RhcnRlZC5jYWxsKHRoaXMsZCwgc2VsZilcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oXCJkcmFnXCIsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5vbkRyYWcuY2FsbCh0aGlzLCBkLCBzZWxmKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oXCJlbmRcIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmRyYWdFbmRlZC5jYWxsKHRoaXMsIGQsIHNlbGYpO1xuICAgICAgICAgICAgfSlcbiAgICB9XG5cblxuICAgIGRyYWdTdGFydGVkKGQsc2VsZikge1xuICAgICAgICAvLyBzZWxmLnRyZWVEZXNpZ25lci5sYXlvdXQuZGlzYWJsZUF1dG9MYXlvdXQoKTtcbiAgICAgICAgQ29udGV4dE1lbnUuaGlkZSgpO1xuICAgICAgICB2YXIgdGV4dCA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgaWYoIXRleHQuY2xhc3NlZChcInNlbGVjdGVkXCIpKXtcbiAgICAgICAgICAgIHNlbGYudHJlZURlc2lnbmVyLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICBzZWxmLnRyZWVEZXNpZ25lci5zZWxlY3RUZXh0KGQpO1xuICAgICAgICB0ZXh0LmNsYXNzZWQoXCJzZWxlY3RlZCBkcmFnZ2luZ1wiLCB0cnVlKTtcbiAgICAgICAgc2VsZi5zZWxlY3RlZE5vZGVzID0gc2VsZi50cmVlRGVzaWduZXIuZ2V0U2VsZWN0ZWROb2RlcygpO1xuICAgICAgICBzZWxmLnByZXZEcmFnRXZlbnQgPSBkMy5ldmVudDtcbiAgICAgICAgc2VsZi5kcmFnRXZlbnRDb3VudCA9IDA7XG4gICAgfVxuXG4gICAgb25EcmFnKGRyYWdnZWRUZXh0LCBzZWxmKXtcbiAgICAgICAgaWYoc2VsZi5kcmFnRXZlbnRDb3VudD09Mil7XG4gICAgICAgICAgICBzZWxmLmRhdGEuc2F2ZVN0YXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5kcmFnRXZlbnRDb3VudCsrO1xuXG4gICAgICAgIHZhciBkeCA9IGQzLmV2ZW50LnggLSBzZWxmLnByZXZEcmFnRXZlbnQueDtcbiAgICAgICAgdmFyIGR5ID0gZDMuZXZlbnQueS0gc2VsZi5wcmV2RHJhZ0V2ZW50Lnk7XG5cbiAgICAgICAgc2VsZi50cmVlRGVzaWduZXIubGF5b3V0Lm1vdmVUZXh0cyhbZHJhZ2dlZFRleHRdLCBkeCwgZHkpO1xuXG4gICAgICAgIHNlbGYucHJldkRyYWdFdmVudCA9IGQzLmV2ZW50O1xuICAgICAgICBzZWxmLnRyZWVEZXNpZ25lci51cGRhdGVQbG90dGluZ1JlZ2lvblNpemUoKTtcbiAgICB9XG5cbiAgICBkcmFnRW5kZWQoZHJhZ2dlZE5vZGUsIHNlbGYpe1xuICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLmNsYXNzZWQoXCJkcmFnZ2luZ1wiLCBmYWxzZSk7XG4gICAgfVxuXG59XG5cblxuIiwiaW1wb3J0ICogYXMgZDMgZnJvbSAnLi9kMydcbmltcG9ydCB7VXRpbHN9IGZyb20gJ3NkLXV0aWxzJ1xuXG5leHBvcnQgY2xhc3MgVG9vbHRpcCB7XG4gICAgc3RhdGljIGdldENvbnRhaW5lcigpe1xuICAgICAgICByZXR1cm4gZDMuc2VsZWN0KFwiYm9keVwiKS5zZWxlY3RPckFwcGVuZCgnZGl2LnNkLXRvb2x0aXAnKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2hvdyhodG1sLCB4T2Zmc2V0ID0gNSwgeU9mZnNldCA9IDI4LCBldmVudCwgZHVyYXRpb249bnVsbCkge1xuICAgICAgICB2YXIgY29udGFpbmVyID0gVG9vbHRpcC5nZXRDb250YWluZXIoKVxuICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCAwKTtcbiAgICAgICAgY29udGFpbmVyLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDIwMClcbiAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgLjk4KTtcbiAgICAgICAgY29udGFpbmVyLmh0bWwoaHRtbCk7XG4gICAgICAgIFRvb2x0aXAudXBkYXRlUG9zaXRpb24oeE9mZnNldCwgeU9mZnNldCwgZXZlbnQpO1xuICAgICAgICBpZihkdXJhdGlvbil7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgVG9vbHRpcC5oaWRlKCk7XG4gICAgICAgICAgICB9LCBkdXJhdGlvbilcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyB1cGRhdGVQb3NpdGlvbih4T2Zmc2V0ID0gNSwgeU9mZnNldCA9IDI4LCBldmVudCkge1xuICAgICAgICBldmVudCA9IGV2ZW50IHx8IGQzLmV2ZW50O1xuICAgICAgICBUb29sdGlwLmdldENvbnRhaW5lcigpXG4gICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIChldmVudC5wYWdlWCArIHhPZmZzZXQpICsgXCJweFwiKVxuICAgICAgICAgICAgLnN0eWxlKFwidG9wXCIsIChldmVudC5wYWdlWSAtIHlPZmZzZXQpICsgXCJweFwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaGlkZShkdXJhdGlvbiA9IDUwMCkge1xuICAgICAgICB2YXIgdCA9IFRvb2x0aXAuZ2V0Q29udGFpbmVyKCk7XG4gICAgICAgIGlmKGR1cmF0aW9uKXtcbiAgICAgICAgICAgIHQgPSB0LnRyYW5zaXRpb24oKS5kdXJhdGlvbihkdXJhdGlvbilcbiAgICAgICAgfVxuICAgICAgICB0LnN0eWxlKFwib3BhY2l0eVwiLCAwKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgYXR0YWNoKHRhcmdldCwgaHRtbE9yRm4sIHhPZmZzZXQsIHlPZmZzZXQpIHtcbiAgICAgICAgdGFyZ2V0Lm9uKCdtb3VzZW92ZXInLCBmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgdmFyIGh0bWwgPSBudWxsO1xuICAgICAgICAgICAgaWYgKFV0aWxzLmlzRnVuY3Rpb24oaHRtbE9yRm4pKSB7XG4gICAgICAgICAgICAgICAgaHRtbCA9IGh0bWxPckZuKGQsIGkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBodG1sID0gaHRtbE9yRm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChodG1sICE9PSBudWxsICYmIGh0bWwgIT09IHVuZGVmaW5lZCAmJiBodG1sICE9PSAnJykge1xuICAgICAgICAgICAgICAgIFRvb2x0aXAuc2hvdyhodG1sLCB4T2Zmc2V0LCB5T2Zmc2V0KTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIFRvb2x0aXAuaGlkZSgwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KS5vbignbW91c2Vtb3ZlJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgIFRvb2x0aXAudXBkYXRlUG9zaXRpb24oeE9mZnNldCwgeU9mZnNldCk7XG4gICAgICAgIH0pLm9uKFwibW91c2VvdXRcIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgIFRvb2x0aXAuaGlkZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgKiBhcyBkMyBmcm9tIFwiLi9kM1wiO1xuaW1wb3J0IHtVdGlsc30gZnJvbSBcInNkLXV0aWxzXCI7XG5pbXBvcnQge0FwcFV0aWxzfSBmcm9tIFwiLi9hcHAtdXRpbHNcIjtcbmltcG9ydCB7ZG9tYWluIGFzIG1vZGVsfSBmcm9tIFwic2QtbW9kZWxcIjtcbmltcG9ydCB7Q29udGV4dE1lbnV9IGZyb20gXCIuL2NvbnRleHQtbWVudS9jb250ZXh0LW1lbnVcIjtcbmltcG9ydCB7TWFpbkNvbnRleHRNZW51fSBmcm9tIFwiLi9jb250ZXh0LW1lbnUvbWFpbi1jb250ZXh0LW1lbnVcIjtcbmltcG9ydCB7Tm9kZUNvbnRleHRNZW51fSBmcm9tIFwiLi9jb250ZXh0LW1lbnUvbm9kZS1jb250ZXh0LW1lbnVcIjtcbmltcG9ydCB7TGF5b3V0fSBmcm9tIFwiLi9sYXlvdXRcIjtcbmltcG9ydCB7Tm9kZURyYWdIYW5kbGVyfSBmcm9tIFwiLi9ub2RlLWRyYWctaGFuZGxlclwiO1xuaW1wb3J0IHtUb29sdGlwfSBmcm9tIFwiLi90b29sdGlwXCI7XG5pbXBvcnQge1RlbXBsYXRlc30gZnJvbSBcIi4vdGVtcGxhdGVzXCI7XG5pbXBvcnQge1RleHREcmFnSGFuZGxlcn0gZnJvbSBcIi4vdGV4dC1kcmFnLWhhbmRsZXJcIjtcbmltcG9ydCB7VGV4dENvbnRleHRNZW51fSBmcm9tIFwiLi9jb250ZXh0LW1lbnUvdGV4dC1jb250ZXh0LW1lbnVcIjtcbmltcG9ydCB7RWRnZUNvbnRleHRNZW51fSBmcm9tIFwiLi9jb250ZXh0LW1lbnUvZWRnZS1jb250ZXh0LW1lbnVcIjtcbmltcG9ydCAqIGFzIEhhbW1lciBmcm9tIFwiaGFtbWVyanNcIjtcbmltcG9ydCB7aTE4bn0gZnJvbSBcIi4vaTE4bi9pMThuXCI7XG5cblxuZXhwb3J0IGNsYXNzIFRyZWVEZXNpZ25lckNvbmZpZyB7XG4gICAgd2lkdGggPSB1bmRlZmluZWQ7XG4gICAgaGVpZ2h0ID0gdW5kZWZpbmVkO1xuICAgIG1hcmdpbiA9IHtcbiAgICAgICAgbGVmdDogMjUsXG4gICAgICAgIHJpZ2h0OiAyNSxcbiAgICAgICAgdG9wOiAyNSxcbiAgICAgICAgYm90dG9tOiAyNVxuICAgIH07XG4gICAgc2NhbGUgPSAxO1xuICAgIGxuZyA9ICdlbic7XG4gICAgbGF5b3V0PSB7XG4gICAgICAgIHR5cGU6ICd0cmVlJyxcbiAgICAgICAgbm9kZVNpemU6IDQwLFxuICAgICAgICBsaW1pdE5vZGVQb3NpdGlvbmluZzogdHJ1ZSxcbiAgICAgICAgbGltaXRUZXh0UG9zaXRpb25pbmc6IHRydWUsXG4gICAgICAgIGdyaWRIZWlnaHQ6IDc1LFxuICAgICAgICBncmlkV2lkdGg6IDE1MCxcbiAgICAgICAgZWRnZVNsYW50V2lkdGhNYXg6IDIwXG4gICAgfTtcbiAgICBmb250RmFtaWx5ID0gJ3NhbnMtc2VyaWYnO1xuICAgIGZvbnRTaXplID0gJzEycHgnO1xuICAgIGZvbnRXZWlnaHQgPSAnbm9ybWFsJztcbiAgICBmb250U3R5bGUgPSAnbm9ybWFsJztcbiAgICBub2RlID0ge1xuICAgICAgICBzdHJva2VXaWR0aDogJzFweCcsXG4gICAgICAgIG9wdGltYWw6IHtcbiAgICAgICAgICAgIHN0cm9rZTogJyMwMDZmMDAnLFxuICAgICAgICAgICAgc3Ryb2tlV2lkdGg6ICcxLjVweCcsXG4gICAgICAgIH0sXG4gICAgICAgIGxhYmVsOiB7XG4gICAgICAgICAgICBmb250U2l6ZTogJzFlbScsXG4gICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICB9LFxuICAgICAgICBwYXlvZmY6IHtcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMWVtJyxcbiAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snLFxuICAgICAgICAgICAgbmVnYXRpdmVDb2xvcjogJyNiNjAwMDAnXG4gICAgICAgIH0sXG4gICAgICAgIGRlY2lzaW9uOiB7XG4gICAgICAgICAgICBmaWxsOiAnI2ZmNzc3NycsXG4gICAgICAgICAgICBzdHJva2U6ICcjNjYwMDAwJyxcblxuICAgICAgICAgICAgc2VsZWN0ZWQ6IHtcbiAgICAgICAgICAgICAgICBmaWxsOiAnI2FhMzMzMycsXG4gICAgICAgICAgICAgICAgLy8gc3Ryb2tlOiAnIzY2NjYwMCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY2hhbmNlOiB7XG4gICAgICAgICAgICBmaWxsOiAnI2ZmZmY0NCcsXG4gICAgICAgICAgICBzdHJva2U6ICcjNjY2NjAwJyxcblxuICAgICAgICAgICAgc2VsZWN0ZWQ6IHtcbiAgICAgICAgICAgICAgICBmaWxsOiAnI2FhYWEwMCcsXG4gICAgICAgICAgICAgICAgLy8gc3Ryb2tlOiAnIzY2NjYwMCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdGVybWluYWw6e1xuICAgICAgICAgICAgZmlsbDogJyM0NGZmNDQnLFxuICAgICAgICAgICAgc3Ryb2tlOiAnYmxhY2snLFxuICAgICAgICAgICAgc2VsZWN0ZWQ6IHtcbiAgICAgICAgICAgICAgICBmaWxsOiAnIzAwYWEwMCcsXG4gICAgICAgICAgICAgICAgLy8gc3Ryb2tlOiAnYmxhY2snXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGF5b2ZmOiB7XG4gICAgICAgICAgICAgICAgZm9udFNpemU6ICcxZW0nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snLFxuICAgICAgICAgICAgICAgIG5lZ2F0aXZlQ29sb3I6ICcjYjYwMDAwJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgIH07XG4gICAgZWRnZT17XG4gICAgICAgIHN0cm9rZTogJyM0MjQyNDInLFxuICAgICAgICBzdHJva2VXaWR0aDogJzEuNScsXG4gICAgICAgIG9wdGltYWw6e1xuICAgICAgICAgICAgc3Ryb2tlOiAnIzAwNmYwMCcsXG4gICAgICAgICAgICBzdHJva2VXaWR0aDogJzIuNCcsXG4gICAgICAgIH0sXG4gICAgICAgIHNlbGVjdGVkOntcbiAgICAgICAgICAgIHN0cm9rZTogJyMwNDVhZDEnLFxuICAgICAgICAgICAgc3Ryb2tlV2lkdGg6ICczLjUnLFxuICAgICAgICB9LFxuICAgICAgICBsYWJlbDoge1xuICAgICAgICAgICAgZm9udFNpemU6ICcxZW0nLFxuICAgICAgICAgICAgY29sb3I6ICdiYWNrJ1xuICAgICAgICB9LFxuICAgICAgICBwYXlvZmY6e1xuICAgICAgICAgICAgZm9udFNpemU6ICcxZW0nLFxuICAgICAgICAgICAgY29sb3I6ICdibGFjaycsXG4gICAgICAgICAgICBuZWdhdGl2ZUNvbG9yOiAnI2I2MDAwMCdcbiAgICAgICAgfVxuXG4gICAgfTtcbiAgICBwcm9iYWJpbGl0eSA9IHtcbiAgICAgICAgZm9udFNpemU6ICcxZW0nLFxuICAgICAgICBjb2xvcjogJyMwMDAwZDcnXG4gICAgfTtcbiAgICB0aXRsZSA9IHtcbiAgICAgICAgZm9udFNpemU6ICcxNnB4JyxcbiAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxuICAgICAgICBmb250U3R5bGU6ICdub3JtYWwnLFxuICAgICAgICBjb2xvcjogJyMwMDAwMDAnLFxuICAgICAgICBtYXJnaW46e1xuICAgICAgICAgICAgdG9wOiAxNSxcbiAgICAgICAgICAgIGJvdHRvbTogMTBcbiAgICAgICAgfVxuICAgIH07XG4gICAgZGVzY3JpcHRpb24gPSB7XG4gICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgIGZvbnRTaXplOiAnMTJweCcsXG4gICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcbiAgICAgICAgZm9udFN0eWxlOiAnbm9ybWFsJyxcbiAgICAgICAgY29sb3I6ICcjMDAwMDAwJyxcbiAgICAgICAgbWFyZ2luOntcbiAgICAgICAgICAgIHRvcDogNSxcbiAgICAgICAgICAgIGJvdHRvbTogMTBcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICByZWFkT25seT0gZmFsc2U7XG4gICAgZGlzYWJsZUFuaW1hdGlvbnM9ZmFsc2U7XG4gICAgZm9yY2VGdWxsRWRnZVJlZHJhdz1mYWxzZTtcbiAgICBoaWRlTGFiZWxzPWZhbHNlO1xuICAgIGhpZGVQYXlvZmZzPWZhbHNlO1xuICAgIGhpZGVQcm9iYWJpbGl0aWVzPWZhbHNlO1xuICAgIHJhdz1mYWxzZTtcblxuXG4gICAgcGF5b2ZmTnVtYmVyRm9ybWF0dGVyID0gKHYsIGkpPT4gdjtcbiAgICBwcm9iYWJpbGl0eU51bWJlckZvcm1hdHRlciAgPSAodik9PiB2O1xuXG4gICAgb25Ob2RlU2VsZWN0ZWQgPSAobm9kZSkgPT4ge307XG4gICAgb25FZGdlU2VsZWN0ZWQgPSAoZWRnZSkgPT4ge307XG4gICAgb25UZXh0U2VsZWN0ZWQgPSAodGV4dCkgPT4ge307XG4gICAgb25TZWxlY3Rpb25DbGVhcmVkID0gKCkgPT4ge307XG5cbiAgICBvcGVyYXRpb25zRm9yT2JqZWN0ID0gKG8pID0+IFtdO1xuICAgIHBlcmZvcm1PcGVyYXRpb24gPSAob2JqZWN0LCBvcGVyYXRpb24pID0+IFByb21pc2UucmVzb2x2ZSgpO1xuXG4gICAgcGF5b2ZmTmFtZXMgPSBbbnVsbCwgbnVsbF07XG4gICAgbWF4UGF5b2Zmc1RvRGlzcGxheSA9IDE7XG5cbiAgICBjb25zdHJ1Y3RvcihjdXN0b20pIHtcbiAgICAgICAgaWYgKGN1c3RvbSkge1xuICAgICAgICAgICAgVXRpbHMuZGVlcEV4dGVuZCh0aGlzLCBjdXN0b20pO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBUcmVlRGVzaWduZXIge1xuXG4gICAgY29uZmlnO1xuICAgIGNvbnRhaW5lcjtcbiAgICBkYXRhOyAvL2RhdGEgbW9kZWwgbWFuYWdlclxuICAgIHN2ZztcblxuICAgIGNvbnN0cnVjdG9yKGNvbnRhaW5lciwgZGF0YU1vZGVsLCBjb25maWcpe1xuICAgICAgICB0aGlzLnNldENvbmZpZyhjb25maWcpO1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhTW9kZWw7XG4gICAgICAgIHRoaXMuaW5pdENvbnRhaW5lcihjb250YWluZXIpO1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG5cbiAgICBzZXRDb25maWcoY29uZmlnKSB7XG4gICAgICAgIHRoaXMuY29uZmlnID0gbmV3IFRyZWVEZXNpZ25lckNvbmZpZyhjb25maWcpO1xuICAgICAgICBpZih0aGlzLmxheW91dCl7XG4gICAgICAgICAgICB0aGlzLmxheW91dC5jb25maWc9dGhpcy5jb25maWcubGF5b3V0O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBkYXRlQ3VzdG9tU3R5bGVzKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGluaXQoKXtcblxuICAgICAgICB0aGlzLmluaXRTdmcoKTtcbiAgICAgICAgdGhpcy5pbml0TGF5b3V0KCk7XG4gICAgICAgIHRoaXMuaW5pdEkxOG4oKTtcbiAgICAgICAgdGhpcy5pbml0QnJ1c2goKTtcbiAgICAgICAgdGhpcy5pbml0RWRnZU1hcmtlcnMoKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZUN1c3RvbVN0eWxlcygpO1xuICAgICAgICBpZighdGhpcy5jb25maWcucmVhZE9ubHkpe1xuICAgICAgICAgICAgdGhpcy5pbml0TWFpbkNvbnRleHRNZW51KCk7XG4gICAgICAgICAgICB0aGlzLmluaXROb2RlQ29udGV4dE1lbnUoKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdEVkZ2VDb250ZXh0TWVudSgpO1xuICAgICAgICAgICAgdGhpcy5pbml0Tm9kZURyYWdIYW5kbGVyKCk7XG4gICAgICAgICAgICB0aGlzLmluaXRUZXh0RHJhZ0hhbmRsZXIoKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdFRleHRDb250ZXh0TWVudSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVkcmF3KCk7XG4gICAgfVxuXG4gICAgaW5pdEkxOG4oKSB7XG4gICAgICAgIGkxOG4uaW5pdCh0aGlzLmNvbmZpZy5sbmcpO1xuICAgIH1cblxuXG4gICAgdXBkYXRlQ3VzdG9tU3R5bGVzKCl7XG4gICAgICAgIGQzLnNlbGVjdCgnaGVhZCcpLnNlbGVjdE9yQXBwZW5kKCdzdHlsZSNzZC10cmVlLWRlc2lnbmVyLXN0eWxlJykuaHRtbChUZW1wbGF0ZXMuZ2V0KCd0cmVlRGVzaWduZXJTdHlsZXMnLCB0aGlzLmNvbmZpZykpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBpbml0TGF5b3V0KCl7XG4gICAgICAgIHRoaXMubGF5b3V0ID0gbmV3IExheW91dCh0aGlzLCB0aGlzLmRhdGEsIHRoaXMuY29uZmlnLmxheW91dCk7XG4gICAgfVxuXG4gICAgaW5pdE5vZGVEcmFnSGFuZGxlcigpe1xuICAgICAgICB0aGlzLm5vZGVEcmFnSGFuZGxlciA9IG5ldyBOb2RlRHJhZ0hhbmRsZXIodGhpcywgdGhpcy5kYXRhKTtcbiAgICB9XG5cbiAgICBpbml0VGV4dERyYWdIYW5kbGVyKCl7XG4gICAgICAgIHRoaXMudGV4dERyYWdIYW5kbGVyID0gbmV3IFRleHREcmFnSGFuZGxlcih0aGlzLCB0aGlzLmRhdGEpO1xuICAgIH1cblxuICAgIHJlZHJhdyh3aXRoVHJhbnNpdGlvbnM9ZmFsc2Upe1xuXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgd2l0aFRyYW5zaXRpb25zID0gIXNlbGYuY29uZmlnLmRpc2FibGVBbmltYXRpb25zICYmIHdpdGhUcmFuc2l0aW9ucztcbiAgICAgICAgdGhpcy5yZWRyYXdEaWFncmFtVGl0bGUoKTtcbiAgICAgICAgdGhpcy5yZWRyYXdEaWFncmFtRGVzY3JpcHRpb24oKTtcbiAgICAgICAgdGhpcy51cGRhdGVTY2FsZSh3aXRoVHJhbnNpdGlvbnMpO1xuICAgICAgICB0aGlzLnVwZGF0ZU1hcmdpbih3aXRoVHJhbnNpdGlvbnMpO1xuICAgICAgICBpZih3aXRoVHJhbnNpdGlvbnMpe1xuICAgICAgICAgICAgc2VsZi50cmFuc2l0aW9uUHJldiA9IHNlbGYudHJhbnNpdGlvbjtcbiAgICAgICAgICAgIHNlbGYudHJhbnNpdGlvbiA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZWRyYXdOb2RlcygpO1xuICAgICAgICB0aGlzLnJlZHJhd0VkZ2VzKCk7XG4gICAgICAgIHRoaXMucmVkcmF3RmxvYXRpbmdUZXh0cygpO1xuICAgICAgICB0aGlzLnVwZGF0ZVZhbGlkYXRpb25NZXNzYWdlcygpO1xuICAgICAgICBpZih3aXRoVHJhbnNpdGlvbnMpe1xuICAgICAgICAgICAgc2VsZi50cmFuc2l0aW9uID0gIHNlbGYudHJhbnNpdGlvblByZXY7XG4gICAgICAgIH1cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgc2VsZi51cGRhdGVQbG90dGluZ1JlZ2lvblNpemUoKTtcbiAgICAgICAgfSwxMCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgY29tcHV0ZUF2YWlsYWJsZVNwYWNlKCl7XG4gICAgICAgIHRoaXMuYXZhaWxhYmxlSGVpZ2h0ID0gQXBwVXRpbHMuc2FuaXRpemVIZWlnaHQodGhpcy5jb25maWcuaGVpZ2h0LCB0aGlzLmNvbnRhaW5lciwgdGhpcy5jb25maWcubWFyZ2luKTtcbiAgICAgICAgdGhpcy5hdmFpbGFibGVXaWR0aCA9IEFwcFV0aWxzLnNhbml0aXplV2lkdGgodGhpcy5jb25maWcud2lkdGgsIHRoaXMuY29udGFpbmVyLCB0aGlzLmNvbmZpZy5tYXJnaW4pO1xuICAgIH1cblxuICAgIGluaXRTdmcoKSB7XG4gICAgICAgIHZhciBjID0gdGhpcztcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLmNvbXB1dGVBdmFpbGFibGVTcGFjZSgpO1xuICAgICAgICB0aGlzLnN2ZyA9IHRoaXMuY29udGFpbmVyLnNlbGVjdE9yQXBwZW5kKCdzdmcuc2QtdHJlZS1kZXNpZ25lcicpO1xuICAgICAgICB0aGlzLnN2Zy5hdHRyKCd3aWR0aCcsIHRoaXMuYXZhaWxhYmxlV2lkdGgpLmF0dHIoJ2hlaWdodCcsIHRoaXMuYXZhaWxhYmxlSGVpZ2h0KTtcblxuICAgICAgICB0aGlzLndyYXBwZXJHcm91cCA9IHRoaXMuc3ZnLnNlbGVjdE9yQXBwZW5kKCdnLnNkLXdyYXBwZXItZ3JvdXAnKTtcbiAgICAgICAgdGhpcy5tYWluR3JvdXAgPSB0aGlzLndyYXBwZXJHcm91cC5zZWxlY3RPckFwcGVuZCgnZy5tYWluLWdyb3VwJyk7XG4gICAgICAgIHRoaXMudXBkYXRlU2NhbGUoKTtcbiAgICAgICAgdGhpcy51cGRhdGVNYXJnaW4oKTtcblxuXG4gICAgICAgIGlmICghdGhpcy5jb25maWcud2lkdGgpIHtcbiAgICAgICAgICAgIGQzLnNlbGVjdCh3aW5kb3cpXG4gICAgICAgICAgICAgICAgLm9uKFwicmVzaXplLnRyZWUtZGVzaWduZXJcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnVwZGF0ZVBsb3R0aW5nUmVnaW9uU2l6ZSgpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnJlZHJhd0RpYWdyYW1UaXRsZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG1jID0gbmV3IEhhbW1lci5NYW5hZ2VyKHRoaXMuc3ZnLm5vZGUoKSwge3RvdWNoQWN0aW9uIDogJ2F1dG8nfSk7XG4gICAgICAgIG1jLmFkZChuZXcgSGFtbWVyLlByZXNzKHtcbiAgICAgICAgICAgIHBvaW50ZXJUeXBlOiAndG91Y2gnXG4gICAgICAgIH0pKTtcblxuICAgICAgICBtYy5hZGQobmV3IEhhbW1lci5QaW5jaCh7XG4gICAgICAgICAgICBwb2ludGVyVHlwZTogJ3RvdWNoJ1xuICAgICAgICB9KSk7XG5cbiAgICAgICAgdmFyIGNhbmNlbDtcbiAgICAgICAgbWMub24oJ3BpbmNoc3RhcnQnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgc2VsZi5kaXNhYmxlQnJ1c2goKTtcbiAgICAgICAgfSlcbiAgICAgICAgbWMub24oJ3BpbmNoJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGNhbmNlbCA9IFV0aWxzLndhaXRGb3JGaW5hbEV2ZW50KCgpPT5zZWxmLmVuYWJsZUJydXNoKCksICdwaW5jaGVuZCcsIDUwMDApXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgdXBkYXRlTWFyZ2luKHdpdGhUcmFuc2l0aW9ucyl7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIG1hcmdpbiA9IHRoaXMuY29uZmlnLm1hcmdpbjtcbiAgICAgICAgdmFyIGdyb3VwID0gdGhpcy5tYWluR3JvdXA7XG4gICAgICAgIGlmKHdpdGhUcmFuc2l0aW9ucyl7XG4gICAgICAgICAgICBncm91cCA9IGdyb3VwLnRyYW5zaXRpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudG9wTWFyZ2luID0gbWFyZ2luLnRvcDtcbiAgICAgICAgaWYodGhpcy5kaWFncmFtVGl0bGV8fHRoaXMuZGlhZ3JhbURlc2NyaXB0aW9uKXtcbiAgICAgICAgICAgIHRoaXMudG9wTWFyZ2luID0gcGFyc2VJbnQodGhpcy5kaWFncmFtVGl0bGUgPyB0aGlzLmNvbmZpZy50aXRsZS5tYXJnaW4udG9wIDogMCkgKyB0aGlzLmdldFRpdGxlR3JvdXBIZWlnaHQoKVxuICAgICAgICAgICAgICAgICsgIE1hdGgubWF4KHRoaXMudG9wTWFyZ2luLCBwYXJzZUludCh0aGlzLmNvbmZpZy50aXRsZS5tYXJnaW4uYm90dG9tKSk7XG4gICAgICAgIH1cblxuICAgICAgICBncm91cC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKFwiICsgbWFyZ2luLmxlZnQgKyBcIixcIiArIHRoaXMudG9wTWFyZ2luICsgXCIpXCIpLm9uKFwiZW5kXCIsICgpPT4gc2VsZi51cGRhdGVQbG90dGluZ1JlZ2lvblNpemUoKSk7XG4gICAgfVxuXG4gICAgc2V0TWFyZ2luKG1hcmdpbiwgd2l0aG91dFN0YXRlU2F2aW5nKXtcbiAgICAgICAgdmFyIHNlbGY9dGhpcztcbiAgICAgICAgaWYoIXdpdGhvdXRTdGF0ZVNhdmluZyl7XG4gICAgICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKHtcbiAgICAgICAgICAgICAgICBkYXRhOntcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luOiBVdGlscy5jbG9uZShzZWxmLmNvbmZpZy5tYXJnaW4pXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvblVuZG86IChkYXRhKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRNYXJnaW4oZGF0YS5tYXJnaW4sIHRydWUpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25SZWRvOiAoZGF0YSk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0TWFyZ2luKG1hcmdpbiwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgVXRpbHMuZGVlcEV4dGVuZCh0aGlzLmNvbmZpZy5tYXJnaW4sIG1hcmdpbik7XG4gICAgICAgIHRoaXMucmVkcmF3RGlhZ3JhbVRpdGxlKCk7XG4gICAgICAgIHRoaXMudXBkYXRlTWFyZ2luKHRydWUpO1xuICAgIH1cblxuXG4gICAgdXBkYXRlU2NhbGUod2l0aFRyYW5zaXRpb25zKXtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgc2NhbGUgPSB0aGlzLmNvbmZpZy5zY2FsZTtcbiAgICAgICAgdmFyIGdyb3VwID0gdGhpcy53cmFwcGVyR3JvdXA7XG4gICAgICAgIGlmKHdpdGhUcmFuc2l0aW9ucyl7XG4gICAgICAgICAgICBncm91cCA9IGdyb3VwLnRyYW5zaXRpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdyb3VwLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJzY2FsZShcIiArIHNjYWxlICsgXCIpXCIpLm9uKFwiZW5kXCIsICgpPT4gc2VsZi51cGRhdGVQbG90dGluZ1JlZ2lvblNpemUoKSk7XG4gICAgfVxuXG4gICAgc2V0U2NhbGUoc2NhbGUsIHdpdGhvdXRTdGF0ZVNhdmluZyl7XG4gICAgICAgIHZhciBzZWxmPXRoaXM7XG4gICAgICAgIGlmKCF3aXRob3V0U3RhdGVTYXZpbmcpe1xuICAgICAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSh7XG4gICAgICAgICAgICAgICAgZGF0YTp7XG4gICAgICAgICAgICAgICAgICAgIHNjYWxlOiBVdGlscy5jbG9uZShzZWxmLmNvbmZpZy5zY2FsZSlcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uVW5kbzogKGRhdGEpPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldFNjYWxlKGRhdGEuc2NhbGUsIHRydWUpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25SZWRvOiAoZGF0YSk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0U2NhbGUoc2NhbGUsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29uZmlnLnNjYWxlID0gc2NhbGU7XG4gICAgICAgIHRoaXMudXBkYXRlU2NhbGUodHJ1ZSk7XG4gICAgfVxuXG4gICAgaW5pdENvbnRhaW5lcihjb250YWluZXJJZE9yRWxlbSkge1xuICAgICAgICBpZiAoVXRpbHMuaXNTdHJpbmcoY29udGFpbmVySWRPckVsZW0pKSB7XG4gICAgICAgICAgICB2YXIgc2VsZWN0b3IgPSBjb250YWluZXJJZE9yRWxlbS50cmltKCk7XG5cbiAgICAgICAgICAgIGlmICghVXRpbHMuc3RhcnRzV2l0aChzZWxlY3RvciwgJyMnKSAmJiAhVXRpbHMuc3RhcnRzV2l0aChzZWxlY3RvciwgJy4nKSkge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yID0gJyMnICsgc2VsZWN0b3I7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGQzLnNlbGVjdChzZWxlY3Rvcik7XG4gICAgICAgIH0gZWxzZSBpZihjb250YWluZXJJZE9yRWxlbS5fcGFyZW50cyl7XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcklkT3JFbGVtXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5jb250YWluZXIgPSBkMy5zZWxlY3QoY29udGFpbmVySWRPckVsZW0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlUGxvdHRpbmdSZWdpb25TaXplKCkge1xuICAgICAgICB2YXIgY2hhbmdlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNvbXB1dGVBdmFpbGFibGVTcGFjZSgpO1xuICAgICAgICB2YXIgbWFyZ2luID0gdGhpcy5jb25maWcubWFyZ2luO1xuICAgICAgICB2YXIgc3ZnV2lkdGggPSB0aGlzLnN2Zy5hdHRyKCd3aWR0aCcpO1xuICAgICAgICB2YXIgc3ZnSGVpZ2h0ID0gdGhpcy5zdmcuYXR0cignaGVpZ2h0Jyk7XG4gICAgICAgIHZhciBtYWluR3JvdXBCb3ggPSB0aGlzLm1haW5Hcm91cC5ub2RlKCkuZ2V0QkJveCgpO1xuICAgICAgICBsZXQgYm94V2lkdGggPSBtYWluR3JvdXBCb3gud2lkdGg7XG4gICAgICAgIHZhciBuZXdTdmdXaWR0aCA9IGJveFdpZHRoK21haW5Hcm91cEJveC54K21hcmdpbi5sZWZ0K21hcmdpbi5yaWdodDtcbiAgICAgICAgbmV3U3ZnV2lkdGggICo9IHRoaXMuY29uZmlnLnNjYWxlO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5jbGFzc2VkKCd3aXRoLW92ZXJmbG93LXgnLCBuZXdTdmdXaWR0aD49dGhpcy5hdmFpbGFibGVXaWR0aCk7XG4gICAgICAgIG5ld1N2Z1dpZHRoID0gTWF0aC5tYXgobmV3U3ZnV2lkdGgsIHRoaXMuYXZhaWxhYmxlV2lkdGgpO1xuICAgICAgICBpZihzdmdXaWR0aCE9bmV3U3ZnV2lkdGgpe1xuICAgICAgICAgICAgY2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnN2Zy5hdHRyKCd3aWR0aCcsIG5ld1N2Z1dpZHRoKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgYm94SGVpZ2h0ID0gbWFpbkdyb3VwQm94LmhlaWdodDtcbiAgICAgICAgdmFyIG5ld1N2Z0hlaWdodCA9IGJveEhlaWdodCttYWluR3JvdXBCb3gueSt0aGlzLnRvcE1hcmdpbittYXJnaW4uYm90dG9tO1xuICAgICAgICBuZXdTdmdIZWlnaHQgKj0gdGhpcy5jb25maWcuc2NhbGU7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmNsYXNzZWQoJ3dpdGgtb3ZlcmZsb3cteScsIG5ld1N2Z0hlaWdodD49dGhpcy5hdmFpbGFibGVIZWlnaHQpO1xuICAgICAgICBuZXdTdmdIZWlnaHQgPSBNYXRoLm1heChuZXdTdmdIZWlnaHQsIHRoaXMuYXZhaWxhYmxlSGVpZ2h0KTtcbiAgICAgICAgaWYoc3ZnSGVpZ2h0IT1uZXdTdmdIZWlnaHQpe1xuICAgICAgICAgICAgY2hhbmdlZD10cnVlO1xuICAgICAgICAgICAgdGhpcy5zdmcuYXR0cignaGVpZ2h0JywgbmV3U3ZnSGVpZ2h0KTtcbiAgICAgICAgfVxuICAgICAgICBpZihjaGFuZ2VkKXtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQnJ1c2hFeHRlbnQoKVxuICAgICAgICB9XG5cblxuICAgIH1cblxuICAgIHJlZHJhd05vZGVzKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cblxuICAgICAgICB2YXIgbm9kZXNDb250YWluZXIgPSB0aGlzLm1haW5Hcm91cC5zZWxlY3RPckFwcGVuZCgnZy5ub2RlcycpO1xuICAgICAgICB2YXIgbm9kZXMgPSBub2Rlc0NvbnRhaW5lci5zZWxlY3RBbGwoJy5ub2RlJykuZGF0YSh0aGlzLmRhdGEubm9kZXMuZmlsdGVyKGQ9PiFkLiRoaWRkZW4pLCAoZCxpKT0+IGQuaWQpO1xuICAgICAgICBub2Rlcy5leGl0KCkucmVtb3ZlKCk7XG4gICAgICAgIHZhciBub2Rlc0VudGVyID0gbm9kZXMuZW50ZXIoKS5hcHBlbmQoJ2cnKVxuICAgICAgICAgICAgLmF0dHIoJ2lkJywgZD0+J25vZGUtJytkLmlkKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgZD0+ZC50eXBlKyctbm9kZSBub2RlJylcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBkPT4ndHJhbnNsYXRlKCcgKyBkLmxvY2F0aW9uLnggKyAnICAnICsgZC5sb2NhdGlvbi55ICsgJyknKTtcbiAgICAgICAgbm9kZXNFbnRlci5hcHBlbmQoJ3BhdGgnKTtcblxuICAgICAgICB2YXIgbGFiZWxFbnRlciA9IG5vZGVzRW50ZXIuYXBwZW5kKCd0ZXh0JykuYXR0cignY2xhc3MnLCAnbGFiZWwnKTtcbiAgICAgICAgdmFyIHBheW9mZkVudGVyID0gbm9kZXNFbnRlci5hcHBlbmQoJ3RleHQnKS5hdHRyKCdjbGFzcycsICdwYXlvZmYgY29tcHV0ZWQnKTtcbiAgICAgICAgdmFyIGluZGljYXRvckVudGVyID0gbm9kZXNFbnRlci5hcHBlbmQoJ3RleHQnKS5hdHRyKCdjbGFzcycsICdlcnJvci1pbmRpY2F0b3InKS50ZXh0KCchIScpO1xuICAgICAgICB2YXIgYWdncmVnYXRlZFBheW9mZkVudGVyID0gbm9kZXNFbnRlci5hcHBlbmQoJ3RleHQnKS5hdHRyKCdjbGFzcycsICdhZ2dyZWdhdGVkLXBheW9mZicpO1xuICAgICAgICB2YXIgcHJvYmFiaWxpdHlUb0VudGVyRW50ZXIgPSBub2Rlc0VudGVyLmFwcGVuZCgndGV4dCcpLmF0dHIoJ2NsYXNzJywgJ3Byb2JhYmlsaXR5LXRvLWVudGVyJyk7XG5cbiAgICAgICAgdmFyIG5vZGVzTWVyZ2UgPSBub2Rlc0VudGVyLm1lcmdlKG5vZGVzKTtcbiAgICAgICAgbm9kZXNNZXJnZS5jbGFzc2VkKCdvcHRpbWFsJywgKGQpPT5zZWxmLmlzT3B0aW1hbChkKSk7XG5cbiAgICAgICAgdmFyIG5vZGVzTWVyZ2VUID0gbm9kZXNNZXJnZTtcbiAgICAgICAgaWYodGhpcy50cmFuc2l0aW9uKXtcbiAgICAgICAgICAgIG5vZGVzTWVyZ2VUID0gbm9kZXNNZXJnZS50cmFuc2l0aW9uKCk7XG4gICAgICAgICAgICBub2Rlc01lcmdlVC5vbignZW5kJywgKCk9PiBzZWxmLnVwZGF0ZVBsb3R0aW5nUmVnaW9uU2l6ZSgpKVxuICAgICAgICB9XG4gICAgICAgIG5vZGVzTWVyZ2VUXG4gICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgZD0+J3RyYW5zbGF0ZSgnICsgZC5sb2NhdGlvbi54ICsgJyAgJyArIGQubG9jYXRpb24ueSArICcpJylcblxuICAgICAgICB2YXIgcGF0aCA9IG5vZGVzTWVyZ2Uuc2VsZWN0KCdwYXRoJyk7XG4gICAgICAgIHRoaXMubGF5b3V0LmRyYXdOb2RlU3ltYm9sKHBhdGgsdGhpcy50cmFuc2l0aW9uKTtcblxuICAgICAgICAvKnBhdGhcbiAgICAgICAgICAgIC5zdHlsZSgnZmlsbCcsIGQ9PiB7XG4gICAgICAgICAgICAgICAgLy8gaWYoc2VsZi5pc05vZGVTZWxlY3RlZChkKSl7XG4gICAgICAgICAgICAgICAgLy8gICAgIHJldHVybiBzZWxmLmNvbmZpZy5ub2RlW2QudHlwZV0uc2VsZWN0ZWQuZmlsbFxuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5jb25maWcubm9kZVtkLnR5cGVdLmZpbGxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3R5bGUoJ3N0cm9rZScsIGQ9PiBzZWxmLmNvbmZpZy5ub2RlW2QudHlwZV0uc3Ryb2tlKVxuICAgICAgICAgICAgLnN0eWxlKCdzdHJva2Utd2lkdGgnLCBkPT4ge1xuICAgICAgICAgICAgICAgIGlmKHNlbGYuY29uZmlnLm5vZGVbZC50eXBlXS5zdHJva2VXaWR0aCE9PXVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLmNvbmZpZy5ub2RlW2QudHlwZV0uc3Ryb2tlV2lkdGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLmNvbmZpZy5ub2RlLnN0cm9rZVdpZHRoO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICovXG4gICAgICAgIHRoaXMubGF5b3V0Lm5vZGVMYWJlbFBvc2l0aW9uKGxhYmVsRW50ZXIpO1xuICAgICAgICB2YXIgbGFiZWxNZXJnZSA9IG5vZGVzTWVyZ2Uuc2VsZWN0KCd0ZXh0LmxhYmVsJyk7XG4gICAgICAgIGxhYmVsTWVyZ2UuY2xhc3NlZCgnc2QtaGlkZGVuJywgdGhpcy5jb25maWcuaGlkZUxhYmVscyk7XG4gICAgICAgIHZhciBsYWJlbE1lcmdlVCA9IG5vZGVzTWVyZ2VULnNlbGVjdCgndGV4dC5sYWJlbCcpO1xuICAgICAgICBsYWJlbE1lcmdlVC5lYWNoKHRoaXMudXBkYXRlVGV4dExpbmVzKTtcbiAgICAgICAgdGhpcy5sYXlvdXQubm9kZUxhYmVsUG9zaXRpb24obGFiZWxNZXJnZVQpXG4gICAgICAgICAgICAuYXR0cigndGV4dC1hbmNob3InLCAnbWlkZGxlJylcblxuICAgICAgICB2YXIgcGF5b2ZmID0gbm9kZXNNZXJnZS5zZWxlY3QoJ3RleHQucGF5b2ZmJyk7XG5cbiAgICAgICAgdmFyIHBheW9mZlRzcGFucyA9IHBheW9mZi5zZWxlY3RBbGwoJ3RzcGFuJykuZGF0YShkPT57XG4gICAgICAgICAgICBsZXQgaXRlbSA9IGQuZGlzcGxheVZhbHVlKCdjaGlsZHJlblBheW9mZicpO1xuICAgICAgICAgICAgcmV0dXJuIFV0aWxzLmlzQXJyYXkoaXRlbSkgPyBpdGVtLmZpbHRlcihpPT5pICE9PSB1bmRlZmluZWQpIDogW2l0ZW1dXG4gICAgICAgIH0pO1xuICAgICAgICBwYXlvZmZUc3BhbnMuZXhpdCgpLnJlbW92ZSgpO1xuXG4gICAgICAgIHZhciBwYXlvZmZUc3BhbnNNID0gcGF5b2ZmVHNwYW5zLmVudGVyKCkuYXBwZW5kKCd0c3BhbicpLm1lcmdlKHBheW9mZlRzcGFucyk7XG4gICAgICAgIHBheW9mZlRzcGFuc01cbiAgICAgICAgICAgIC8vIC5hdHRyKCdkb21pbmFudC1iYXNlbGluZScsICdoYW5naW5nJylcbiAgICAgICAgICAgIC5hdHRyKCdkeScsIChkLGkpPT5pPjAgPyAnMS4xZW0nOiB1bmRlZmluZWQpXG4gICAgICAgICAgICAuYXR0cigneCcsICcwJylcbiAgICAgICAgICAgIC5jbGFzc2VkKCduZWdhdGl2ZScsIGQ9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQhPT1udWxsICYmIGQ8MDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2xhc3NlZCgnc2QtaGlkZGVuJywgdGhpcy5jb25maWcuaGlkZVBheW9mZnMgfHwgdGhpcy5jb25maWcucmF3KVxuICAgICAgICAgICAgLnRleHQoKGQsIGkpPT4ge1xuICAgICAgICAgICAgICAgIHZhciB2YWwgPSBkXG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsIT09bnVsbCA/IChpc05hTih2YWwpID8gdmFsIDogc2VsZi5jb25maWcucGF5b2ZmTnVtYmVyRm9ybWF0dGVyKHZhbCwgaSkpOiAnJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuYXR0YWNoUGF5b2ZmVG9vbHRpcChwYXlvZmZUc3BhbnNNKTtcblxuXG4gICAgICAgIHZhciBwYXlvZmZUID0gcGF5b2ZmO1xuICAgICAgICBpZih0aGlzLnRyYW5zaXRpb24pe1xuICAgICAgICAgICAgcGF5b2ZmVCA9IHBheW9mZi50cmFuc2l0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxheW91dC5ub2RlUGF5b2ZmUG9zaXRpb24ocGF5b2ZmRW50ZXIpO1xuICAgICAgICB0aGlzLmxheW91dC5ub2RlUGF5b2ZmUG9zaXRpb24ocGF5b2ZmVCk7XG5cbiAgICAgICAgdmFyIGFnZ3JlZ2F0ZWRQYXlvZmYgPSBub2Rlc01lcmdlLnNlbGVjdCgndGV4dC5hZ2dyZWdhdGVkLXBheW9mZicpO1xuICAgICAgICB2YXIgYWdncmVnYXRlZFBheW9mZlRzcGFucyA9IGFnZ3JlZ2F0ZWRQYXlvZmYuc2VsZWN0QWxsKCd0c3BhbicpLmRhdGEoZD0+e1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSBkLmRpc3BsYXlWYWx1ZSgnYWdncmVnYXRlZFBheW9mZicpO1xuICAgICAgICAgICAgcmV0dXJuIFV0aWxzLmlzQXJyYXkoaXRlbSkgPyBpdGVtLmZpbHRlcihpPT5pICE9PSB1bmRlZmluZWQpIDogW2l0ZW1dXG4gICAgICAgIH0pO1xuICAgICAgICBhZ2dyZWdhdGVkUGF5b2ZmVHNwYW5zLmV4aXQoKS5yZW1vdmUoKTtcbiAgICAgICAgdmFyIGFnZ3JlZ2F0ZWRQYXlvZmZUc3BhbnNNID0gYWdncmVnYXRlZFBheW9mZlRzcGFucy5lbnRlcigpLmFwcGVuZCgndHNwYW4nKS5tZXJnZShhZ2dyZWdhdGVkUGF5b2ZmVHNwYW5zKVxuICAgICAgICAgICAgLmF0dHIoJ2R5JywgKGQsaSk9Pmk+MCA/ICcwLjk1ZW0nOiB1bmRlZmluZWQpXG4gICAgICAgICAgICAuY2xhc3NlZCgnbmVnYXRpdmUnLCBkPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBkIT09bnVsbCAmJiBkPDA7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNsYXNzZWQoJ3NkLWhpZGRlbicsIHRoaXMuY29uZmlnLmhpZGVQYXlvZmZzIHx8IHRoaXMuY29uZmlnLnJhdylcbiAgICAgICAgICAgIC50ZXh0KCh2YWwsIGkpPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWwhPT1udWxsID8gKGlzTmFOKHZhbCkgPyB2YWwgOiBzZWxmLmNvbmZpZy5wYXlvZmZOdW1iZXJGb3JtYXR0ZXIodmFsLCBpKSk6ICcnXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmF0dGFjaFBheW9mZlRvb2x0aXAoYWdncmVnYXRlZFBheW9mZlRzcGFuc00sICdhZ2dyZWdhdGVkUGF5b2ZmJyk7XG5cbiAgICAgICAgdmFyIGFnZ3JlZ2F0ZWRQYXlvZmZUID0gYWdncmVnYXRlZFBheW9mZjtcbiAgICAgICAgaWYodGhpcy50cmFuc2l0aW9uKXtcbiAgICAgICAgICAgIGFnZ3JlZ2F0ZWRQYXlvZmZUID0gYWdncmVnYXRlZFBheW9mZi50cmFuc2l0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxheW91dC5ub2RlQWdncmVnYXRlZFBheW9mZlBvc2l0aW9uKGFnZ3JlZ2F0ZWRQYXlvZmZFbnRlcik7XG4gICAgICAgIHRoaXMubGF5b3V0Lm5vZGVBZ2dyZWdhdGVkUGF5b2ZmUG9zaXRpb24oYWdncmVnYXRlZFBheW9mZlQpO1xuXG4gICAgICAgIHZhciBwcm9iYWJpbGl0eVRvRW50ZXIgPSBub2Rlc01lcmdlLnNlbGVjdCgndGV4dC5wcm9iYWJpbGl0eS10by1lbnRlcicpXG4gICAgICAgICAgICAudGV4dChkPT57XG4gICAgICAgICAgICAgICAgdmFyIHZhbCA9IGQuZGlzcGxheVZhbHVlKCdwcm9iYWJpbGl0eVRvRW50ZXInKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsIT09bnVsbCA/IChpc05hTih2YWwpID8gdmFsIDogc2VsZi5jb25maWcucHJvYmFiaWxpdHlOdW1iZXJGb3JtYXR0ZXIodmFsKSk6ICcnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNsYXNzZWQoJ3NkLWhpZGRlbicsIHRoaXMuY29uZmlnLmhpZGVQcm9iYWJpbGl0aWVzIHx8IHRoaXMuY29uZmlnLnJhdyk7XG4gICAgICAgIFRvb2x0aXAuYXR0YWNoKHByb2JhYmlsaXR5VG9FbnRlciwgaTE4bi50KCd0b29sdGlwLm5vZGUucHJvYmFiaWxpdHlUb0VudGVyJykpO1xuXG5cbiAgICAgICAgdmFyIHByb2JhYmlsaXR5VG9FbnRlclQgPSBwcm9iYWJpbGl0eVRvRW50ZXI7XG4gICAgICAgIGlmKHRoaXMudHJhbnNpdGlvbil7XG4gICAgICAgICAgICBwcm9iYWJpbGl0eVRvRW50ZXJUID0gcHJvYmFiaWxpdHlUb0VudGVyLnRyYW5zaXRpb24oKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxheW91dC5ub2RlUHJvYmFiaWxpdHlUb0VudGVyUG9zaXRpb24ocHJvYmFiaWxpdHlUb0VudGVyRW50ZXIpO1xuICAgICAgICB0aGlzLmxheW91dC5ub2RlUHJvYmFiaWxpdHlUb0VudGVyUG9zaXRpb24ocHJvYmFiaWxpdHlUb0VudGVyVCk7XG5cblxuICAgICAgICB2YXIgaW5kaWNhdG9yID0gbm9kZXNNZXJnZS5zZWxlY3QoJ3RleHQuZXJyb3ItaW5kaWNhdG9yJyk7XG4gICAgICAgIGluZGljYXRvci5jbGFzc2VkKCdzZC1oaWRkZW4nLCB0aGlzLmNvbmZpZy5yYXcpXG4gICAgICAgIHRoaXMubGF5b3V0Lm5vZGVJbmRpY2F0b3JQb3NpdGlvbihpbmRpY2F0b3JFbnRlcik7XG4gICAgICAgIHRoaXMubGF5b3V0Lm5vZGVJbmRpY2F0b3JQb3NpdGlvbihpbmRpY2F0b3IpO1xuXG4gICAgICAgIGlmKHRoaXMubm9kZURyYWdIYW5kbGVyKXtcbiAgICAgICAgICAgIG5vZGVzTWVyZ2UuY2FsbCh0aGlzLm5vZGVEcmFnSGFuZGxlci5kcmFnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG5vZGVzTWVyZ2Uub24oJ2NvbnRleHRtZW51JywgdGhpcy5ub2RlQ29udGV4dE1lbnUpO1xuICAgICAgICBub2Rlc01lcmdlLm9uKCdkYmxjbGljaycsIHRoaXMubm9kZUNvbnRleHRNZW51KVxuICAgICAgICBub2Rlc01lcmdlLmVhY2goZnVuY3Rpb24oZCwgaSl7XG4gICAgICAgICAgICB2YXIgbm9kZUVsZW0gPSB0aGlzO1xuICAgICAgICAgICAgdmFyIG1jID0gbmV3IEhhbW1lci5NYW5hZ2VyKG5vZGVFbGVtKTtcbiAgICAgICAgICAgIG1jLmFkZChuZXcgSGFtbWVyLlByZXNzKHtcbiAgICAgICAgICAgICAgICBwb2ludGVyVHlwZTogJ3RvdWNoJ1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgbWMub24oJ3ByZXNzJywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICAgICAgaWYoZS5wb2ludGVyVHlwZT09J3RvdWNoJyl7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubm9kZURyYWdIYW5kbGVyLmNhbmNlbERyYWcoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuXG5cbiAgICAgICAgICAgIGlmKGQuZm9sZGVkKXtcbiAgICAgICAgICAgICAgICBsZXQgYnV0dG9uID0gZDMuc2VsZWN0KG5vZGVFbGVtKS5zZWxlY3RPckFwcGVuZCgndGV4dC5zZC11bmZvbGQtYnV0dG9uJylcbiAgICAgICAgICAgICAgICAgICAgLnRleHQoXCJbK11cIilcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdjbGljayBkYmNsaWNrIG1vdXNlZG93bicsICgpPT5zZWxmLmZvbGRTdWJ0cmVlKGQsIGZhbHNlKSk7IC8vZmlyZWZveCBkZXRlY3RzIG9ubHkgbW91c2Vkb3duIGV2ZW50IC0gcmVsYXRlZCB0byBkcmFnIGhhbmRsZXJcblxuICAgICAgICAgICAgICAgIHNlbGYubGF5b3V0Lm5vZGVVbmZvbGRCdXR0b25Qb3NpdGlvbihidXR0b24pO1xuICAgICAgICAgICAgICAgIFRvb2x0aXAuYXR0YWNoKGJ1dHRvbiwgaTE4bi50KCdjb250ZXh0TWVudS5ub2RlLnVuZm9sZCcpKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGQzLnNlbGVjdChub2RlRWxlbSkuc2VsZWN0KCcuc2QtdW5mb2xkLWJ1dHRvbicpLnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgYXR0YWNoUGF5b2ZmVG9vbHRpcChzZWxlY3Rpb24sIHBheW9mZkZpbGVkTmFtZSA9ICdwYXlvZmYnLCBvYmplY3Q9J25vZGUnKXtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBUb29sdGlwLmF0dGFjaChzZWxlY3Rpb24sIChkLCBpKT0+e1xuICAgICAgICAgICAgaWYoc2VsZi5jb25maWcucGF5b2ZmTmFtZXMubGVuZ3RoPmkgJiYgc2VsZi5jb25maWcucGF5b2ZmTmFtZXNbaV0gIT09IG51bGwpe1xuICAgICAgICAgICAgICAgIHJldHVybiBpMThuLnQoJ3Rvb2x0aXAuJytvYmplY3QrJy4nK3BheW9mZkZpbGVkTmFtZSsnLm5hbWVkJyx7dmFsdWU6IGQucGF5b2ZmLCBudW1iZXI6IGkrMSwgbmFtZTogc2VsZi5jb25maWcucGF5b2ZmTmFtZXNbaV19KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGkxOG4udCgndG9vbHRpcC4nK29iamVjdCsnLicrcGF5b2ZmRmlsZWROYW1lKycuZGVmYXVsdCcse3ZhbHVlOiBkLnBheW9mZiwgbnVtYmVyOiBzZWxmLmNvbmZpZy5tYXhQYXlvZmZzVG9EaXNwbGF5IDwgMiA/ICcnIDogaSsxfSlcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdXBkYXRlVGV4dExpbmVzKGQpeyAvL2hlbHBlciBtZXRob2QgZm9yIHNwbGl0dGluZyB0ZXh0IHRvIHRzcGFuc1xuICAgICAgICB2YXIgbGluZXMgPSBkLm5hbWUgPyBkLm5hbWUuc3BsaXQoJ1xcbicpIDogW107XG4gICAgICAgIGxpbmVzLnJldmVyc2UoKTtcbiAgICAgICAgdmFyIHRzcGFucyA9IGQzLnNlbGVjdCh0aGlzKS5zZWxlY3RBbGwoJ3RzcGFuJykuZGF0YShsaW5lcyk7XG4gICAgICAgIHRzcGFucy5lbnRlcigpLmFwcGVuZCgndHNwYW4nKVxuICAgICAgICAgICAgLm1lcmdlKHRzcGFucylcbiAgICAgICAgICAgIC50ZXh0KGw9PmwpXG4gICAgICAgICAgICAuYXR0cignZHknLCAoZCxpKT0+aT4wID8gJy0xLjFlbSc6IHVuZGVmaW5lZClcbiAgICAgICAgICAgIC5hdHRyKCd4JywgJzAnKTtcblxuICAgICAgICB0c3BhbnMuZXhpdCgpLnJlbW92ZSgpO1xuICAgIH1cblxuICAgIGlzT3B0aW1hbChkKXtcbiAgICAgICAgcmV0dXJuIGQuZGlzcGxheVZhbHVlKCdvcHRpbWFsJyk7XG4gICAgfVxuXG4gICAgcmVkcmF3RWRnZXMoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIGVkZ2VzQ29udGFpbmVyID0gdGhpcy5tYWluR3JvdXAuc2VsZWN0T3JBcHBlbmQoJ2cuZWRnZXMnKTtcbiAgICAgICAgaWYoc2VsZi5jb25maWcuZm9yY2VGdWxsRWRnZVJlZHJhdyl7XG4gICAgICAgICAgICBlZGdlc0NvbnRhaW5lci5zZWxlY3RBbGwoXCIqXCIpLnJlbW92ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGVkZ2VzID0gZWRnZXNDb250YWluZXIuc2VsZWN0QWxsKCcuZWRnZScpLmRhdGEodGhpcy5kYXRhLmVkZ2VzLmZpbHRlcihlPT4hZS4kaGlkZGVuKSwgKGQsaSk9PiBkLmlkKTtcbiAgICAgICAgZWRnZXMuZXhpdCgpLnJlbW92ZSgpO1xuICAgICAgICB2YXIgZWRnZXNFbnRlciA9IGVkZ2VzLmVudGVyKCkuYXBwZW5kKCdnJylcbiAgICAgICAgICAgIC5hdHRyKCdpZCcsIGQ9PidlZGdlLScrZC5pZClcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdlZGdlJyk7XG5cblxuICAgICAgICBlZGdlc0VudGVyLmFwcGVuZCgncGF0aCcpO1xuICAgICAgICB2YXIgbGFiZWxFbnRlciA9IGVkZ2VzRW50ZXIuYXBwZW5kU2VsZWN0b3IoJ2cubGFiZWwtZ3JvdXAnKTtcbiAgICAgICAgbGFiZWxFbnRlci5hcHBlbmQoJ3RleHQnKS5hdHRyKCdjbGFzcycsICdsYWJlbCcpO1xuICAgICAgICB2YXIgcGF5b2ZmRW50ZXIgPSBlZGdlc0VudGVyLmFwcGVuZCgndGV4dCcpLmF0dHIoJ2NsYXNzJywgJ3BheW9mZicpO1xuICAgICAgICB2YXIgcHJvYmFiaWxpdHlFbnRlciA9IGVkZ2VzRW50ZXIuYXBwZW5kKCd0ZXh0JykuYXR0cignY2xhc3MnLCAncHJvYmFiaWxpdHknKTtcblxuXG4gICAgICAgIHZhciBlZGdlc01lcmdlID0gZWRnZXNFbnRlci5tZXJnZShlZGdlcyk7XG5cblxuICAgICAgICB2YXIgb3B0aW1hbENsYXNzTmFtZSA9ICdvcHRpbWFsJztcbiAgICAgICAgZWRnZXNNZXJnZS5jbGFzc2VkKG9wdGltYWxDbGFzc05hbWUsIChkKT0+c2VsZi5pc09wdGltYWwoZCkpO1xuXG4gICAgICAgIHZhciBlZGdlc01lcmdlVCA9IGVkZ2VzTWVyZ2U7XG4gICAgICAgIGlmKHRoaXMudHJhbnNpdGlvbil7XG4gICAgICAgICAgICBlZGdlc01lcmdlVCA9IGVkZ2VzTWVyZ2UudHJhbnNpdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgZWRnZXNNZXJnZVQuc2VsZWN0KCdwYXRoJylcbiAgICAgICAgICAgIC5hdHRyKCdkJywgZD0+IHRoaXMubGF5b3V0LmVkZ2VMaW5lRChkKSlcbiAgICAgICAgICAgIC8vIC5hdHRyKFwic3Ryb2tlXCIsIFwiYmxhY2tcIilcbiAgICAgICAgICAgIC8vIC5hdHRyKFwic3Ryb2tlLXdpZHRoXCIsIDIpXG4gICAgICAgICAgICAuYXR0cihcImZpbGxcIiwgXCJub25lXCIpXG4gICAgICAgICAgICAuYXR0cihcIm1hcmtlci1lbmRcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICAgIHZhciBzdWZmaXggPSBkMy5zZWxlY3QodGhpcy5wYXJlbnROb2RlKS5jbGFzc2VkKCdzZWxlY3RlZCcpID8gJy1zZWxlY3RlZCcgOiAoc2VsZi5pc09wdGltYWwoZCk/Jy1vcHRpbWFsJzonJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwidXJsKCNhcnJvd1wiKyBzdWZmaXgrXCIpXCJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gLmF0dHIoXCJzaGFwZS1yZW5kZXJpbmdcIiwgXCJvcHRpbWl6ZVF1YWxpdHlcIilcblxuXG4gICAgICAgIGVkZ2VzTWVyZ2Uub24oJ2NsaWNrJywgZD0+e1xuICAgICAgICAgICAgc2VsZi5zZWxlY3RFZGdlKGQsIHRydWUpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubGF5b3V0LmVkZ2VMYWJlbFBvc2l0aW9uKGxhYmVsRW50ZXIpO1xuICAgICAgICBlZGdlc01lcmdlVC5zZWxlY3QoJ3RleHQubGFiZWwnKS5lYWNoKHRoaXMudXBkYXRlVGV4dExpbmVzKTtcbiAgICAgICAgdmFyIGxhYmVsTWVyZ2UgPSBlZGdlc01lcmdlLnNlbGVjdCgnZy5sYWJlbC1ncm91cCcpO1xuICAgICAgICBsYWJlbE1lcmdlLmNsYXNzZWQoJ3NkLWhpZGRlbicsIHRoaXMuY29uZmlnLmhpZGVMYWJlbHMpO1xuICAgICAgICB2YXIgbGFiZWxNZXJnZVQgPSBlZGdlc01lcmdlVC5zZWxlY3QoJ2cubGFiZWwtZ3JvdXAnKTtcbiAgICAgICAgdGhpcy5sYXlvdXQuZWRnZUxhYmVsUG9zaXRpb24obGFiZWxNZXJnZVQpO1xuICAgICAgICAgICAgLy8gLnRleHQoZD0+ZC5uYW1lKTtcblxuICAgICAgICB2YXIgcGF5b2ZmID0gZWRnZXNNZXJnZS5zZWxlY3QoJ3RleHQucGF5b2ZmJyk7XG5cbiAgICAgICAgdmFyIHBheW9mZlRzcGFucyA9IHBheW9mZi5zZWxlY3RBbGwoJ3RzcGFuJykuZGF0YShkID0+IHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gZC5kaXNwbGF5VmFsdWUoJ3BheW9mZicpO1xuICAgICAgICAgICAgcmV0dXJuIFV0aWxzLmlzQXJyYXkoaXRlbSkgPyBpdGVtLnNsaWNlKDAsIE1hdGgubWluKGl0ZW0ubGVuZ3RoLCBzZWxmLmNvbmZpZy5tYXhQYXlvZmZzVG9EaXNwbGF5KSkubWFwKF89PmQpIDogW2RdO1xuICAgICAgICB9KTtcbiAgICAgICAgcGF5b2ZmVHNwYW5zLmV4aXQoKS5yZW1vdmUoKTtcblxuICAgICAgICB2YXIgcGF5b2ZmVHNwYW5zTSA9IHBheW9mZlRzcGFucy5lbnRlcigpLmFwcGVuZCgndHNwYW4nKS5tZXJnZShwYXlvZmZUc3BhbnMpO1xuICAgICAgICBwYXlvZmZUc3BhbnNNXG4gICAgICAgIC8vIC5hdHRyKCdkb21pbmFudC1iYXNlbGluZScsICdoYW5naW5nJylcbiAgICAgICAgICAgIC5hdHRyKCdkeScsIChkLGkpPT5pPjAgPyAnMS4xZW0nOiB1bmRlZmluZWQpXG4gICAgICAgICAgICAvLyAuYXR0cigneCcsICcwJylcblxuICAgICAgICAgICAgLy8gLmF0dHIoJ2RvbWluYW50LWJhc2VsaW5lJywgJ2hhbmdpbmcnKVxuICAgICAgICAgICAgLmNsYXNzZWQoJ25lZ2F0aXZlJywgKGQsIGkpPT4ge1xuICAgICAgICAgICAgICAgIHZhciB2YWwgPSBkLmRpc3BsYXlQYXlvZmYodW5kZWZpbmVkLCBpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsIT09bnVsbCAmJiB2YWw8MDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2xhc3NlZCgnc2QtaGlkZGVuJywgdGhpcy5jb25maWcuaGlkZVBheW9mZnMpXG4gICAgICAgICAgICAvLyAudGV4dChkPT4gaXNOYU4oZC5wYXlvZmYpID8gZC5wYXlvZmYgOiBzZWxmLmNvbmZpZy5wYXlvZmZOdW1iZXJGb3JtYXR0ZXIoZC5wYXlvZmYpKVxuICAgICAgICAgICAgLnRleHQoKGQsIGkpPT57XG4gICAgICAgICAgICAgICAgaWYodGhpcy5jb25maWcucmF3KXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQucGF5b2ZmW2ldO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gZC5kaXNwbGF5VmFsdWUoJ3BheW9mZicpO1xuICAgICAgICAgICAgICAgIGxldCBpdGVtcyA9IFV0aWxzLmlzQXJyYXkoaXRlbSkgPyBpdGVtIDogW2l0ZW1dO1xuXG4gICAgICAgICAgICAgICAgbGV0IHZhbCA9IGl0ZW1zW2ldO1xuICAgICAgICAgICAgICAgIGlmICh2YWwgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc05hTih2YWwpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5jb25maWcucGF5b2ZmTnVtYmVyRm9ybWF0dGVyKHZhbCwgaSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKFV0aWxzLmlzU3RyaW5nKHZhbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoZC5wYXlvZmZbaV0gIT09IG51bGwgJiYgIWlzTmFOKGQucGF5b2ZmW2ldKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYuY29uZmlnLnBheW9mZk51bWJlckZvcm1hdHRlcihkLnBheW9mZltpXSwgaSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZC5wYXlvZmZbaV07XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIFRvb2x0aXAuYXR0YWNoKHBheW9mZlRzcGFuc00sIChkLCBpKT0+e1xuICAgICAgICAgICAgaWYoc2VsZi5jb25maWcucGF5b2ZmTmFtZXMubGVuZ3RoPmkgJiYgc2VsZi5jb25maWcucGF5b2ZmTmFtZXNbaV0gIT09IG51bGwpe1xuICAgICAgICAgICAgICAgIHJldHVybiBpMThuLnQoJ3Rvb2x0aXAuZWRnZS5wYXlvZmYubmFtZWQnLHt2YWx1ZTogZC5wYXlvZmZbaV0sIG51bWJlcjogaSsxLCBuYW1lOiBzZWxmLmNvbmZpZy5wYXlvZmZOYW1lc1tpXX0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaTE4bi50KCd0b29sdGlwLmVkZ2UucGF5b2ZmLmRlZmF1bHQnLHt2YWx1ZTogZC5wYXlvZmZbaV0sIG51bWJlcjogc2VsZi5jb25maWcubWF4UGF5b2Zmc1RvRGlzcGxheSA8IDIgPyAnJyA6IGkrMX0pXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBwYXlvZmZUZXh0VCA9IHBheW9mZjtcbiAgICAgICAgaWYodGhpcy50cmFuc2l0aW9uKXtcbiAgICAgICAgICAgIHBheW9mZlRleHRUID0gcGF5b2ZmLnRyYW5zaXRpb24oKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxheW91dC5lZGdlUGF5b2ZmUG9zaXRpb24ocGF5b2ZmRW50ZXIpO1xuICAgICAgICB0aGlzLmxheW91dC5lZGdlUGF5b2ZmUG9zaXRpb24ocGF5b2ZmVGV4dFQpO1xuXG4gICAgICAgIFRvb2x0aXAuYXR0YWNoKGVkZ2VzTWVyZ2Uuc2VsZWN0KCd0ZXh0LnByb2JhYmlsaXR5JyksIGQ9PmkxOG4udCgndG9vbHRpcC5lZGdlLnByb2JhYmlsaXR5Jyx7dmFsdWU6IGQucHJvYmFiaWxpdHk9PT0gdW5kZWZpbmVkID8gZC5kaXNwbGF5UHJvYmFiaWxpdHkoKSA6IGQucHJvYmFiaWxpdHl9KSk7XG5cbiAgICAgICAgZWRnZXNNZXJnZS5zZWxlY3QoJ3RleHQucHJvYmFiaWxpdHknKVxuICAgICAgICAgICAgLmNsYXNzZWQoJ3NkLWhpZGRlbicsIHRoaXMuY29uZmlnLmhpZGVQcm9iYWJpbGl0aWVzKTtcbiAgICAgICAgdmFyIHByb2JhYmlsaXR5TWVyZ2UgPSBlZGdlc01lcmdlLnNlbGVjdCgndGV4dC5wcm9iYWJpbGl0eScpO1xuICAgICAgICBwcm9iYWJpbGl0eU1lcmdlXG4gICAgICAgICAgICAuYXR0cigndGV4dC1hbmNob3InLCAnZW5kJylcbiAgICAgICAgICAgIC50ZXh0KGQ9PntcbiAgICAgICAgICAgICAgICBpZih0aGlzLmNvbmZpZy5yYXcpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC5wcm9iYWJpbGl0eTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHZhbCA9IGQuZGlzcGxheVByb2JhYmlsaXR5KCk7XG5cbiAgICAgICAgICAgICAgICBpZih2YWwhPT1udWxsKXtcbiAgICAgICAgICAgICAgICAgICAgaWYoIWlzTmFOKHZhbCkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYuY29uZmlnLnByb2JhYmlsaXR5TnVtYmVyRm9ybWF0dGVyKHZhbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYoVXRpbHMuaXNTdHJpbmcodmFsKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoZC5wcm9iYWJpbGl0eSE9PW51bGwgJiYgIWlzTmFOKGQucHJvYmFiaWxpdHkpKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5jb25maWcucHJvYmFiaWxpdHlOdW1iZXJGb3JtYXR0ZXIoZC5wcm9iYWJpbGl0eSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZC5wcm9iYWJpbGl0eTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB2YXIgcHJvYmFiaWxpdHlNZXJnZVQgPSBwcm9iYWJpbGl0eU1lcmdlO1xuICAgICAgICBpZih0aGlzLnRyYW5zaXRpb24pe1xuICAgICAgICAgICAgcHJvYmFiaWxpdHlNZXJnZVQgPSBwcm9iYWJpbGl0eU1lcmdlLnRyYW5zaXRpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubGF5b3V0LmVkZ2VQcm9iYWJpbGl0eVBvc2l0aW9uKHByb2JhYmlsaXR5RW50ZXIpO1xuICAgICAgICB0aGlzLmxheW91dC5lZGdlUHJvYmFiaWxpdHlQb3NpdGlvbihwcm9iYWJpbGl0eU1lcmdlVCk7XG5cblxuICAgICAgICBlZGdlc0NvbnRhaW5lci5zZWxlY3RBbGwoJy5lZGdlLicrb3B0aW1hbENsYXNzTmFtZSkucmFpc2UoKTtcblxuICAgICAgICBlZGdlc01lcmdlLm9uKCdjb250ZXh0bWVudScsIHRoaXMuZWRnZUNvbnRleHRNZW51KTtcbiAgICAgICAgZWRnZXNNZXJnZS5vbignZGJsY2xpY2snLCB0aGlzLmVkZ2VDb250ZXh0TWVudSk7XG4gICAgICAgIGVkZ2VzTWVyZ2UuZWFjaChmdW5jdGlvbihkLCBpKXtcbiAgICAgICAgICAgIHZhciBlbGVtID0gdGhpcztcbiAgICAgICAgICAgIHZhciBtYyA9IG5ldyBIYW1tZXIuTWFuYWdlcihlbGVtKTtcbiAgICAgICAgICAgIG1jLmFkZChuZXcgSGFtbWVyLlByZXNzKHtcbiAgICAgICAgICAgICAgICBwb2ludGVyVHlwZTogSGFtbWVyLlBPSU5URVJfVE9VQ0hcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICByZWRyYXdGbG9hdGluZ1RleHRzKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cblxuICAgICAgICB2YXIgdGV4dHNDb250YWluZXIgPSB0aGlzLm1haW5Hcm91cC5zZWxlY3RPckFwcGVuZCgnZy5mbG9hdGluZy10ZXh0cycpO1xuICAgICAgICB2YXIgdGV4dHMgPSB0ZXh0c0NvbnRhaW5lci5zZWxlY3RBbGwoJy5mbG9hdGluZy10ZXh0JykuZGF0YSh0aGlzLmRhdGEudGV4dHMsIChkLGkpPT4gZC5pZCk7XG4gICAgICAgIHRleHRzLmV4aXQoKS5yZW1vdmUoKTtcbiAgICAgICAgdmFyIHRleHRzRW50ZXIgPSB0ZXh0cy5lbnRlcigpLmFwcGVuZFNlbGVjdG9yKCdnLmZsb2F0aW5nLXRleHQnKVxuICAgICAgICAgICAgLmF0dHIoJ2lkJywgZD0+J3RleHQtJytkLmlkKTtcblxuXG4gICAgICAgIHZhciByZWN0V2lkdGggPSA0MDtcbiAgICAgICAgdmFyIHJlY3RIZWlnaHQgPSAyMDtcblxuICAgICAgICB0ZXh0c0VudGVyLmFwcGVuZCgncmVjdCcpLmF0dHIoJ3gnLCAtNSkuYXR0cigneScsIC0xNikuYXR0cignZmlsbC1vcGFjaXR5JywgMCk7XG4gICAgICAgIHRleHRzRW50ZXIuYXBwZW5kKCd0ZXh0Jyk7XG5cbiAgICAgICAgdmFyIHRleHRzTWVyZ2UgPSB0ZXh0c0VudGVyLm1lcmdlKHRleHRzKTtcbiAgICAgICAgdmFyIHRleHRzTWVyZ2VUID0gdGV4dHNNZXJnZTtcbiAgICAgICAgaWYodGhpcy50cmFuc2l0aW9uKXtcbiAgICAgICAgICAgIHRleHRzTWVyZ2VUID0gdGV4dHNNZXJnZS50cmFuc2l0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0ZXh0c01lcmdlVC5hdHRyKCd0cmFuc2Zvcm0nLCBkPT4ndHJhbnNsYXRlKCcgKyBkLmxvY2F0aW9uLnggKyAnICAnICsgZC5sb2NhdGlvbi55ICsgJyknKTtcblxuICAgICAgICB2YXIgdHNwYW5zID0gdGV4dHNNZXJnZS5zZWxlY3QoJ3RleHQnKS5zZWxlY3RBbGwoJ3RzcGFuJykuZGF0YShkPT5kLnZhbHVlID8gZC52YWx1ZS5zcGxpdCgnXFxuJykgOiBbXSk7XG5cbiAgICAgICAgdHNwYW5zLmVudGVyKCkuYXBwZW5kKCd0c3BhbicpXG4gICAgICAgICAgICAubWVyZ2UodHNwYW5zKVxuICAgICAgICAgICAgLmh0bWwobD0+QXBwVXRpbHMucmVwbGFjZVVybHMoQXBwVXRpbHMuZXNjYXBlSHRtbChsKSkpXG4gICAgICAgICAgICAuYXR0cignZHknLCAoZCxpKT0+aT4wID8gJzEuMWVtJzogdW5kZWZpbmVkKVxuICAgICAgICAgICAgLmF0dHIoJ3gnLCAnMCcpO1xuXG4gICAgICAgIHRzcGFucy5leGl0KCkucmVtb3ZlKCk7XG4gICAgICAgIHRleHRzTWVyZ2UuY2xhc3NlZCgnc2QtZW1wdHknLCBkPT4hZC52YWx1ZSB8fCAhZC52YWx1ZS50cmltKCkpO1xuICAgICAgICB0ZXh0c01lcmdlLnNlbGVjdCgncmVjdCcpLmF0dHIoJ3dpZHRoJywgcmVjdFdpZHRoKS5hdHRyKCdoZWlnaHQnLCByZWN0SGVpZ2h0KTtcblxuICAgICAgICB0ZXh0c01lcmdlLmVhY2goZnVuY3Rpb24oZCl7XG4gICAgICAgICAgICBpZighZC52YWx1ZSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGJiID0gZDMuc2VsZWN0KHRoaXMpLnNlbGVjdCgndGV4dCcpLm5vZGUoKS5nZXRCQm94KCk7XG4gICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5zZWxlY3QoJ3JlY3QnKVxuICAgICAgICAgICAgICAgLmF0dHIoJ3knLCBiYi55LTUpXG4gICAgICAgICAgICAgICAuYXR0cignd2lkdGgnLCBNYXRoLm1heChiYi53aWR0aCsxMCwgcmVjdFdpZHRoKSlcbiAgICAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCBNYXRoLm1heChiYi5oZWlnaHQrMTAsIHJlY3RIZWlnaHQpKVxuICAgICAgICB9KTtcblxuICAgICAgICBpZih0aGlzLnRleHREcmFnSGFuZGxlcil7XG4gICAgICAgICAgICB0ZXh0c01lcmdlLmNhbGwodGhpcy50ZXh0RHJhZ0hhbmRsZXIuZHJhZyk7XG4gICAgICAgIH1cbiAgICAgICAgdGV4dHNNZXJnZS5vbignY29udGV4dG1lbnUnLCB0aGlzLnRleHRDb250ZXh0TWVudSk7XG4gICAgICAgIHRleHRzTWVyZ2Uub24oJ2RibGNsaWNrJywgdGhpcy50ZXh0Q29udGV4dE1lbnUpO1xuICAgICAgICB0ZXh0c01lcmdlLmVhY2goZnVuY3Rpb24oZCwgaSl7XG4gICAgICAgICAgICB2YXIgZWxlbSA9IHRoaXM7XG4gICAgICAgICAgICB2YXIgbWMgPSBuZXcgSGFtbWVyLk1hbmFnZXIoZWxlbSk7XG4gICAgICAgICAgICBtYy5hZGQobmV3IEhhbW1lci5QcmVzcyh7XG4gICAgICAgICAgICAgICAgcG9pbnRlclR5cGU6ICd0b3VjaCdcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSlcblxuICAgIH1cblxuICAgIHVwZGF0ZVZhbGlkYXRpb25NZXNzYWdlcygpIHtcbiAgICAgICAgdmFyIG5vZGVzID0gdGhpcy5tYWluR3JvdXAuc2VsZWN0QWxsKCcubm9kZScpO1xuICAgICAgICBub2Rlcy5jbGFzc2VkKCdlcnJvcicsIGZhbHNlKTtcblxuICAgICAgICB0aGlzLmRhdGEudmFsaWRhdGlvblJlc3VsdHMuZm9yRWFjaCh2YWxpZGF0aW9uUmVzdWx0PT57XG4gICAgICAgICAgICBpZih2YWxpZGF0aW9uUmVzdWx0LmlzVmFsaWQoKSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh2YWxpZGF0aW9uUmVzdWx0Lm9iamVjdElkVG9FcnJvcikuZm9yRWFjaChpZD0+e1xuICAgICAgICAgICAgICAgIHZhciBlcnJvcnMgPSB2YWxpZGF0aW9uUmVzdWx0Lm9iamVjdElkVG9FcnJvcltpZF07XG4gICAgICAgICAgICAgICAgdmFyIG5vZGVTZWxlY3Rpb24gPSB0aGlzLmdldE5vZGVEM1NlbGVjdGlvbkJ5SWQoaWQpO1xuICAgICAgICAgICAgICAgIG5vZGVTZWxlY3Rpb24uY2xhc3NlZCgnZXJyb3InLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB2YXIgdG9vbHRpcEh0bWwgPSAnJztcbiAgICAgICAgICAgICAgICBlcnJvcnMuZm9yRWFjaChlPT57XG4gICAgICAgICAgICAgICAgICAgIGlmKHRvb2x0aXBIdG1sKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXBIdG1sKz0nPGJyLz4nXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcEh0bWwrPUFwcFV0aWxzLmdldFZhbGlkYXRpb25NZXNzYWdlKGUpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgVG9vbHRpcC5hdHRhY2gobm9kZVNlbGVjdGlvbi5zZWxlY3QoJy5lcnJvci1pbmRpY2F0b3InKSwgdG9vbHRpcEh0bWwpO1xuXG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgaW5pdEVkZ2VNYXJrZXJzKCkge1xuICAgICAgICB2YXIgZGVmcyA9IHRoaXMuc3ZnLmFwcGVuZChcInN2ZzpkZWZzXCIpO1xuXG4gICAgICAgIHRoaXMuaW5pdEFycm93TWFya2VyKFwiYXJyb3dcIik7XG4gICAgICAgIHRoaXMuaW5pdEFycm93TWFya2VyKFwiYXJyb3ctb3B0aW1hbFwiKTtcbiAgICAgICAgdGhpcy5pbml0QXJyb3dNYXJrZXIoXCJhcnJvdy1zZWxlY3RlZFwiKTtcbiAgICB9XG5cbiAgICBpbml0QXJyb3dNYXJrZXIoaWQpIHtcblxuICAgICAgICB2YXIgZGVmcyA9IHRoaXMuc3ZnLnNlbGVjdChcImRlZnNcIik7XG4gICAgICAgIGRlZnMuYXBwZW5kKFwibWFya2VyXCIpXG4gICAgICAgICAgICAuYXR0cihcImlkXCIsaWQpXG4gICAgICAgICAgICAuYXR0cihcInZpZXdCb3hcIixcIjAgLTUgMTAgMTBcIilcbiAgICAgICAgICAgIC5hdHRyKFwicmVmWFwiLDUpXG4gICAgICAgICAgICAuYXR0cihcInJlZllcIiwwKVxuICAgICAgICAgICAgLmF0dHIoXCJtYXJrZXJXaWR0aFwiLDQpXG4gICAgICAgICAgICAuYXR0cihcIm1hcmtlckhlaWdodFwiLDQpXG4gICAgICAgICAgICAuYXR0cihcIm9yaWVudFwiLFwiYXV0b1wiKVxuICAgICAgICAgICAgLmFwcGVuZChcInBhdGhcIilcbiAgICAgICAgICAgIC5hdHRyKFwiZFwiLCBcIk0wLC01TDEwLDBMMCw1XCIpXG4gICAgICAgICAgICAuYXR0cihcImNsYXNzXCIsXCJhcnJvd0hlYWRcIik7XG4gICAgfVxuXG4gICAgdXBkYXRlQnJ1c2hFeHRlbnQoKSB7XG4gICAgICAgIHZhciBzZWxmID10aGlzO1xuICAgICAgICB0aGlzLmJydXNoLmV4dGVudChbWzAsIDBdLCBbc2VsZi5zdmcuYXR0cignd2lkdGgnKSwgc2VsZi5zdmcuYXR0cignaGVpZ2h0JyldXSk7XG4gICAgICAgIHRoaXMuYnJ1c2hDb250YWluZXIuY2FsbCh0aGlzLmJydXNoKTtcbiAgICB9XG4gICAgaW5pdEJydXNoKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgdmFyIGJydXNoQ29udGFpbmVyID0gc2VsZi5icnVzaENvbnRhaW5lciA9IHRoaXMuYnJ1c2hDb250YWluZXI9IHRoaXMud3JhcHBlckdyb3VwLnNlbGVjdE9ySW5zZXJ0KFwiZy5icnVzaFwiLCBcIjpmaXJzdC1jaGlsZFwiKVxuICAgICAgICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcImJydXNoXCIpO1xuXG4gICAgICAgIHZhciBicnVzaCA9IHRoaXMuYnJ1c2ggPSBkMy5icnVzaCgpXG4gICAgICAgICAgICAub24oXCJzdGFydFwiLCBicnVzaHN0YXJ0KVxuICAgICAgICAgICAgLm9uKFwiYnJ1c2hcIiwgYnJ1c2htb3ZlKVxuICAgICAgICAgICAgLm9uKFwiZW5kXCIsIGJydXNoZW5kKTtcblxuXG5cbiAgICAgICAgdGhpcy51cGRhdGVCcnVzaEV4dGVudCgpO1xuXG4gICAgICAgIGJydXNoQ29udGFpbmVyLnNlbGVjdCgnLm92ZXJsYXknKS5vbihcIm1vdXNlbW92ZS5lZGdlU2VsZWN0aW9uXCIsIG1vdXNlbW92ZWQpO1xuICAgICAgICBmdW5jdGlvbiBtb3VzZW1vdmVkKCkge1xuICAgICAgICAgICAgdmFyIG0gPSBkMy5tb3VzZSh0aGlzKTtcbiAgICAgICAgICAgIHZhciBtZ3QgPSBzZWxmLmdldE1haW5Hcm91cFRyYW5zbGF0aW9uKCk7XG4gICAgICAgICAgICB2YXIgbWFyZ2luID0gMTA7XG5cbiAgICAgICAgICAgIHZhciBjbG9zZXN0ID0gW251bGwsIDk5OTk5OTk5OV07XG4gICAgICAgICAgICB2YXIgY2xvc2VFZGdlcyA9IFtdO1xuICAgICAgICAgICAgc2VsZi5tYWluR3JvdXAuc2VsZWN0QWxsKCcuZWRnZScpLmVhY2goZnVuY3Rpb24oZCl7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGVjdGlvbiA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb24uY2xhc3NlZCgnc2QtaG92ZXInLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgdmFyIHBhdGhOb2RlID0gc2VsZWN0aW9uLnNlbGVjdCgncGF0aCcpLm5vZGUoKTtcbiAgICAgICAgICAgICAgICB2YXIgYiA9IHBhdGhOb2RlLmdldEJCb3goKTtcbiAgICAgICAgICAgICAgICBpZihiLngrbWd0WzBdIDw9bVswXSAmJiBiLngrYi53aWR0aCttZ3RbMF0gPj0gbVswXSAmJlxuICAgICAgICAgICAgICAgICAgIGIueSttZ3RbMV0tbWFyZ2luIDw9bVsxXSAmJiBiLnkrYi5oZWlnaHQrbWd0WzFdK21hcmdpbiA+PSBtWzFdKXtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgY3AgPSBBcHBVdGlscy5jbG9zZXN0UG9pbnQocGF0aE5vZGUsIFttWzBdLW1ndFswXSwgbVsxXS1tZ3RbMV1dKTtcbiAgICAgICAgICAgICAgICAgICAgaWYoY3AuZGlzdGFuY2UgPCBtYXJnaW4gJiYgY3AuZGlzdGFuY2U8Y2xvc2VzdFsxXSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0ID0gW3NlbGVjdGlvbiwgY3AuZGlzdGFuY2VdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgc2VsZi5ob3ZlcmVkRWRnZSA9IG51bGw7XG4gICAgICAgICAgICBpZihjbG9zZXN0WzBdKXtcbiAgICAgICAgICAgICAgICBjbG9zZXN0WzBdLmNsYXNzZWQoJ3NkLWhvdmVyJywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgc2VsZi5ob3ZlcmVkRWRnZSA9IGNsb3Nlc3RbMF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGJydXNoc3RhcnQoKSB7XG4gICAgICAgICAgICBpZiAoIWQzLmV2ZW50LnNlbGVjdGlvbikgcmV0dXJuO1xuICAgICAgICAgICAgaWYoc2VsZi5ob3ZlcmVkRWRnZSl7XG4gICAgICAgICAgICAgICAgc2VsZi5zZWxlY3RFZGdlKHNlbGYuaG92ZXJlZEVkZ2UuZGF0dW0oKSwgdHJ1ZSlcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHNlbGYuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIENvbnRleHRNZW51LmhpZGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEhpZ2hsaWdodCB0aGUgc2VsZWN0ZWQgbm9kZXMuXG4gICAgICAgIGZ1bmN0aW9uIGJydXNobW92ZSgpIHtcbiAgICAgICAgICAgIHZhciBzID0gZDMuZXZlbnQuc2VsZWN0aW9uO1xuICAgICAgICAgICAgaWYoIXMpcmV0dXJuO1xuXG4gICAgICAgICAgICBzZWxmLm1haW5Hcm91cC5zZWxlY3RBbGwoXCIubm9kZVwiKS5jbGFzc2VkKCdzZWxlY3RlZCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1haW5Hcm91cFRyYW5zbGF0aW9uID0gc2VsZi5nZXRNYWluR3JvdXBUcmFuc2xhdGlvbigpO1xuICAgICAgICAgICAgICAgIHZhciB4ID0gZC5sb2NhdGlvbi54K21haW5Hcm91cFRyYW5zbGF0aW9uWzBdO1xuICAgICAgICAgICAgICAgIHZhciB5ID0gZC5sb2NhdGlvbi55K21haW5Hcm91cFRyYW5zbGF0aW9uWzFdO1xuICAgICAgICAgICAgICAgIHZhciBub2RlU2l6ZSA9IHNlbGYuY29uZmlnLmxheW91dC5ub2RlU2l6ZTtcbiAgICAgICAgICAgICAgICB2YXIgb2Zmc2V0ID0gbm9kZVNpemUqMC4yNTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc1swXVswXSA8PSB4K29mZnNldCAmJiB4LW9mZnNldCA8PSBzWzFdWzBdXG4gICAgICAgICAgICAgICAgICAgICYmIHNbMF1bMV0gPD0geStvZmZzZXQgJiYgeS1vZmZzZXQgPD0gc1sxXVsxXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIElmIHRoZSBicnVzaCBpcyBlbXB0eSwgc2VsZWN0IGFsbCBjaXJjbGVzLlxuICAgICAgICBmdW5jdGlvbiBicnVzaGVuZCgpIHtcbiAgICAgICAgICAgIGlmICghZDMuZXZlbnQuc2VsZWN0aW9uKSByZXR1cm47XG4gICAgICAgICAgICBicnVzaC5tb3ZlKGJydXNoQ29udGFpbmVyLCBudWxsKTtcblxuICAgICAgICAgICAgdmFyIHNlbGVjdGVkTm9kZXMgPSBzZWxmLmdldFNlbGVjdGVkTm9kZXMoKTtcbiAgICAgICAgICAgIGlmKHNlbGVjdGVkTm9kZXMgJiYgc2VsZWN0ZWROb2Rlcy5sZW5ndGggPT09IDEpe1xuICAgICAgICAgICAgICAgIHNlbGYuc2VsZWN0Tm9kZShzZWxlY3RlZE5vZGVzWzBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGlmICghZDMuZXZlbnQuc2VsZWN0aW9uKSBzZWxmLm1haW5Hcm91cC5zZWxlY3RBbGwoXCIuc2VsZWN0ZWRcIikuY2xhc3NlZCgnc2VsZWN0ZWQnLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkaXNhYmxlQnJ1c2goKXtcbiAgICAgICAgaWYoIXRoaXMuYnJ1c2hEaXNhYmxlZCl7XG4gICAgICAgICAgICBBcHBVdGlscy5ncm93bChpMThuLnQoJ2dyb3dsLmJydXNoRGlzYWJsZWQnKSwgJ2luZm8nLCAnbGVmdCcpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5icnVzaERpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5icnVzaENvbnRhaW5lci5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICBlbmFibGVCcnVzaCgpe1xuICAgICAgICBpZih0aGlzLmJydXNoRGlzYWJsZWQpe1xuICAgICAgICAgICAgQXBwVXRpbHMuZ3Jvd2woaTE4bi50KCdncm93bC5icnVzaEVuYWJsZWQnKSwgJ2luZm8nLCAnbGVmdCcpXG4gICAgICAgICAgICB0aGlzLmluaXRCcnVzaCgpO1xuICAgICAgICAgICAgdGhpcy5icnVzaERpc2FibGVkID0gZmFsc2U7XG4gICAgICAgIH1cblxuXG4gICAgfVxuXG4gICAgZ2V0TWFpbkdyb3VwVHJhbnNsYXRpb24oaW52ZXJ0KSB7XG4gICAgICAgIHZhciB0cmFuc2xhdGlvbiA9IEFwcFV0aWxzLmdldFRyYW5zbGF0aW9uKHRoaXMubWFpbkdyb3VwLmF0dHIoXCJ0cmFuc2Zvcm1cIikpO1xuICAgICAgICBpZihpbnZlcnQpe1xuICAgICAgICAgICAgdHJhbnNsYXRpb25bMF0gPSAtdHJhbnNsYXRpb25bMF07XG4gICAgICAgICAgICB0cmFuc2xhdGlvblsxXSA9IC10cmFuc2xhdGlvblsxXVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cmFuc2xhdGlvbjtcbiAgICB9XG5cbiAgICBpbml0Tm9kZUNvbnRleHRNZW51KCkge1xuICAgICAgICB0aGlzLm5vZGVDb250ZXh0TWVudSA9IG5ldyBOb2RlQ29udGV4dE1lbnUodGhpcywgdGhpcy5jb25maWcub3BlcmF0aW9uc0Zvck9iamVjdCk7XG4gICAgfVxuXG4gICAgaW5pdEVkZ2VDb250ZXh0TWVudSgpIHtcbiAgICAgICAgdGhpcy5lZGdlQ29udGV4dE1lbnUgPSBuZXcgRWRnZUNvbnRleHRNZW51KHRoaXMpO1xuICAgIH1cblxuICAgIGluaXRUZXh0Q29udGV4dE1lbnUoKSB7XG4gICAgICAgIHRoaXMudGV4dENvbnRleHRNZW51ID0gbmV3IFRleHRDb250ZXh0TWVudSh0aGlzKTtcbiAgICB9XG5cblxuXG4gICAgaW5pdE1haW5Db250ZXh0TWVudSgpIHtcbiAgICAgICAgdGhpcy5tYWluQ29udGV4dE1lbnUgPSBuZXcgTWFpbkNvbnRleHRNZW51KHRoaXMpO1xuICAgICAgICB0aGlzLnN2Zy5vbignY29udGV4dG1lbnUnLHRoaXMubWFpbkNvbnRleHRNZW51KTtcbiAgICAgICAgdGhpcy5zdmcub24oJ2RibGNsaWNrJyx0aGlzLm1haW5Db250ZXh0TWVudSk7XG4gICAgfVxuXG4gICAgYWRkVGV4dCh0ZXh0KXtcbiAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSgpO1xuICAgICAgICB0aGlzLmRhdGEuYWRkVGV4dCh0ZXh0KTtcbiAgICAgICAgdGhpcy5yZWRyYXcoKTtcbiAgICAgICAgdGhpcy5zZWxlY3RUZXh0KHRleHQpO1xuICAgIH1cblxuICAgIGFkZE5vZGUobm9kZSwgcGFyZW50LCByZWRyYXc9ZmFsc2Upe1xuICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKCk7XG4gICAgICAgIHRoaXMuZGF0YS5hZGROb2RlKG5vZGUsIHBhcmVudCk7XG4gICAgICAgIHRoaXMucmVkcmF3KHRydWUpO1xuICAgICAgICB0aGlzLmxheW91dC51cGRhdGUobm9kZSk7XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIH1cblxuICAgIGFkZERlY2lzaW9uTm9kZShwYXJlbnQpe1xuICAgICAgICB2YXIgbmV3Tm9kZSA9IG5ldyBtb2RlbC5EZWNpc2lvbk5vZGUodGhpcy5sYXlvdXQuZ2V0TmV3Q2hpbGRMb2NhdGlvbihwYXJlbnQpKTtcbiAgICAgICAgdGhpcy5hZGROb2RlKG5ld05vZGUsIHBhcmVudClcbiAgICB9XG4gICAgYWRkQ2hhbmNlTm9kZShwYXJlbnQpe1xuICAgICAgICB2YXIgbmV3Tm9kZSA9IG5ldyBtb2RlbC5DaGFuY2VOb2RlKHRoaXMubGF5b3V0LmdldE5ld0NoaWxkTG9jYXRpb24ocGFyZW50KSk7XG4gICAgICAgIHRoaXMuYWRkTm9kZShuZXdOb2RlLCBwYXJlbnQpXG4gICAgfVxuICAgIGFkZFRlcm1pbmFsTm9kZShwYXJlbnQpe1xuICAgICAgICB2YXIgbmV3Tm9kZSA9IG5ldyBtb2RlbC5UZXJtaW5hbE5vZGUodGhpcy5sYXlvdXQuZ2V0TmV3Q2hpbGRMb2NhdGlvbihwYXJlbnQpKTtcbiAgICAgICAgdGhpcy5hZGROb2RlKG5ld05vZGUsIHBhcmVudClcbiAgICB9XG5cbiAgICBpbmplY3ROb2RlKG5vZGUsIGVkZ2Upe1xuICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKCk7XG4gICAgICAgIHRoaXMuZGF0YS5pbmplY3ROb2RlKG5vZGUsIGVkZ2UpO1xuICAgICAgICB0aGlzLnJlZHJhdygpO1xuICAgICAgICB0aGlzLmxheW91dC51cGRhdGUobm9kZSk7XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIH1cblxuICAgIGluamVjdERlY2lzaW9uTm9kZShlZGdlKXtcbiAgICAgICAgdmFyIG5ld05vZGUgPSBuZXcgbW9kZWwuRGVjaXNpb25Ob2RlKHRoaXMubGF5b3V0LmdldEluamVjdGVkTm9kZUxvY2F0aW9uKGVkZ2UpKTtcbiAgICAgICAgdGhpcy5pbmplY3ROb2RlKG5ld05vZGUsIGVkZ2UpO1xuXG4gICAgfVxuXG4gICAgaW5qZWN0Q2hhbmNlTm9kZShlZGdlKXtcbiAgICAgICAgdmFyIG5ld05vZGUgPSBuZXcgbW9kZWwuQ2hhbmNlTm9kZSh0aGlzLmxheW91dC5nZXRJbmplY3RlZE5vZGVMb2NhdGlvbihlZGdlKSk7XG4gICAgICAgIHRoaXMuaW5qZWN0Tm9kZShuZXdOb2RlLCBlZGdlKTtcbiAgICB9XG5cbiAgICByZW1vdmVOb2RlKG5vZGUpIHtcbiAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSgpO1xuICAgICAgICB0aGlzLmRhdGEucmVtb3ZlTm9kZShub2RlKTtcblxuXG4gICAgICAgIGlmKCF0aGlzLmxheW91dC5pc01hbnVhbExheW91dCgpKXtcbiAgICAgICAgICAgIHRoaXMubGF5b3V0LnVwZGF0ZSgpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMucmVkcmF3KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW1vdmVTZWxlY3RlZE5vZGVzKCkge1xuICAgICAgICB2YXIgc2VsZWN0ZWROb2RlcyA9IHRoaXMuZ2V0U2VsZWN0ZWROb2RlcygpO1xuICAgICAgICBpZighc2VsZWN0ZWROb2Rlcy5sZW5ndGgpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoKTtcbiAgICAgICAgdGhpcy5kYXRhLnJlbW92ZU5vZGVzKHNlbGVjdGVkTm9kZXMpO1xuICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgIHRoaXMucmVkcmF3KCk7XG4gICAgICAgIHRoaXMubGF5b3V0LnVwZGF0ZSgpO1xuICAgIH1cblxuICAgIHJlbW92ZVNlbGVjdGVkVGV4dHMoKXtcbiAgICAgICAgdmFyIHNlbGVjdGVkVGV4dHMgPSB0aGlzLmdldFNlbGVjdGVkVGV4dHMoKTtcblxuICAgICAgICBpZighc2VsZWN0ZWRUZXh0cy5sZW5ndGgpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoKTtcbiAgICAgICAgdGhpcy5kYXRhLnJlbW92ZVRleHRzKHNlbGVjdGVkVGV4dHMpO1xuICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgIHRoaXMucmVkcmF3KCk7XG4gICAgfVxuXG4gICAgY29weU5vZGUoZCwgbm90Q2xlYXJQcmV2U2VsZWN0aW9uKSB7XG4gICAgICAgIHZhciBjbG9uZSA9IHRoaXMuZGF0YS5jbG9uZVN1YnRyZWUoZCk7XG4gICAgICAgIGlmKG5vdENsZWFyUHJldlNlbGVjdGlvbil7XG4gICAgICAgICAgICBpZighdGhpcy5jb3BpZWROb2Rlcyl7XG4gICAgICAgICAgICAgICAgdGhpcy5jb3BpZWROb2Rlcz1bXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY29waWVkTm9kZXMucHVzaChjbG9uZSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5jb3BpZWROb2RlcyA9IFtjbG9uZV07XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGN1dE5vZGUoZCkge1xuICAgICAgICB0aGlzLmNvcHlOb2RlKGQpO1xuICAgICAgICB0aGlzLnJlbW92ZU5vZGUoZCk7XG4gICAgfVxuXG4gICAgY3V0U2VsZWN0ZWROb2Rlcygpe1xuICAgICAgICB2YXIgc2VsZWN0ZWROb2RlcyA9IHRoaXMuZ2V0U2VsZWN0ZWROb2RlcygpO1xuICAgICAgICB2YXIgc2VsZWN0ZWRSb290cyA9IHRoaXMuZGF0YS5maW5kU3VidHJlZVJvb3RzKHNlbGVjdGVkTm9kZXMpO1xuICAgICAgICB0aGlzLmNvcHlOb2RlcyhzZWxlY3RlZFJvb3RzKTtcbiAgICAgICAgdGhpcy5yZW1vdmVTZWxlY3RlZE5vZGVzKCk7XG4gICAgfVxuXG4gICAgY29weVNlbGVjdGVkTm9kZXMoKSB7XG4gICAgICAgIHZhciBzZWxmO1xuICAgICAgICB2YXIgc2VsZWN0ZWROb2RlcyA9IHRoaXMuZ2V0U2VsZWN0ZWROb2RlcygpO1xuXG4gICAgICAgIHZhciBzZWxlY3RlZFJvb3RzID0gdGhpcy5kYXRhLmZpbmRTdWJ0cmVlUm9vdHMoc2VsZWN0ZWROb2Rlcyk7XG4gICAgICAgIHRoaXMuY29weU5vZGVzKHNlbGVjdGVkUm9vdHMpO1xuXG5cbiAgICB9XG5cbiAgICBjb3B5Tm9kZXMobm9kZXMpe1xuICAgICAgICB0aGlzLmNvcGllZE5vZGVzID0gbm9kZXMubWFwKGQ9PnRoaXMuZGF0YS5jbG9uZVN1YnRyZWUoZCkpO1xuICAgIH1cblxuXG5cbiAgICBwYXN0ZVRvTm9kZShub2RlKSB7XG4gICAgICAgIGlmKCF0aGlzLmNvcGllZE5vZGVzIHx8ICF0aGlzLmNvcGllZE5vZGVzLmxlbmd0aCl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSgpO1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHNlbGYuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgdmFyIG5vZGVzVG9BdHRhY2ggPSB0aGlzLmNvcGllZE5vZGVzO1xuICAgICAgICBzZWxmLmNvcHlOb2Rlcyh0aGlzLmNvcGllZE5vZGVzKTtcbiAgICAgICAgbm9kZXNUb0F0dGFjaC5mb3JFYWNoKHRvQXR0YWNoPT57XG4gICAgICAgICAgICB2YXIgYXR0YWNoZWQgPSB0aGlzLmRhdGEuYXR0YWNoU3VidHJlZSh0b0F0dGFjaCwgbm9kZSkuY2hpbGROb2RlO1xuICAgICAgICAgICAgaWYoYXR0YWNoZWQuZm9sZGVkKXtcbiAgICAgICAgICAgICAgICBzZWxmLmZvbGRTdWJ0cmVlKGF0dGFjaGVkLCBhdHRhY2hlZC5mb2xkZWQsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBsb2NhdGlvbiA9IHNlbGYubGF5b3V0LmdldE5ld0NoaWxkTG9jYXRpb24obm9kZSk7XG4gICAgICAgICAgICBhdHRhY2hlZC5tb3ZlVG8obG9jYXRpb24ueCwgbG9jYXRpb24ueSwgdHJ1ZSk7XG4gICAgICAgICAgICBzZWxmLmxheW91dC5tb3ZlTm9kZVRvRW1wdHlQbGFjZShhdHRhY2hlZCwgZmFsc2UpO1xuICAgICAgICAgICAgc2VsZi5sYXlvdXQuZml0Tm9kZXNJblBsb3R0aW5nUmVnaW9uKHRoaXMuZGF0YS5nZXRBbGxEZXNjZW5kYW50Tm9kZXMoYXR0YWNoZWQpKTtcblxuICAgICAgICAgICAgc2VsZi5zZWxlY3RTdWJUcmVlKGF0dGFjaGVkLCBmYWxzZSwgbm9kZXNUb0F0dGFjaC5sZW5ndGg+MSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmKG5vZGUuZm9sZGVkKXtcbiAgICAgICAgICAgIHNlbGYuZm9sZFN1YnRyZWUobm9kZSwgbm9kZS5mb2xkZWQsIGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHNlbGYucmVkcmF3KCk7XG4gICAgICAgICAgICBzZWxmLmxheW91dC51cGRhdGUoKTtcbiAgICAgICAgfSwxMClcblxuICAgIH1cblxuICAgIHBhc3RlVG9OZXdMb2NhdGlvbihwb2ludCkge1xuICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKCk7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgc2VsZi5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICB2YXIgbm9kZXNUb0F0dGFjaCA9IHRoaXMuY29waWVkTm9kZXM7XG4gICAgICAgIHNlbGYuY29weU5vZGVzKHRoaXMuY29waWVkTm9kZXMpO1xuICAgICAgICBub2Rlc1RvQXR0YWNoLmZvckVhY2godG9BdHRhY2g9PiB7XG4gICAgICAgICAgICB2YXIgYXR0YWNoZWQgPSB0aGlzLmRhdGEuYXR0YWNoU3VidHJlZSh0b0F0dGFjaCk7XG4gICAgICAgICAgICBpZihhdHRhY2hlZC5mb2xkZWQpe1xuICAgICAgICAgICAgICAgIHNlbGYuZm9sZFN1YnRyZWUoYXR0YWNoZWQsIGF0dGFjaGVkLmZvbGRlZCwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXR0YWNoZWQubW92ZVRvKHBvaW50LngsIHBvaW50LnksIHRydWUpO1xuICAgICAgICAgICAgc2VsZi5sYXlvdXQubW92ZU5vZGVUb0VtcHR5UGxhY2UoYXR0YWNoZWQsIGZhbHNlKTtcbiAgICAgICAgICAgIHNlbGYubGF5b3V0LmZpdE5vZGVzSW5QbG90dGluZ1JlZ2lvbih0aGlzLmRhdGEuZ2V0QWxsRGVzY2VuZGFudE5vZGVzKGF0dGFjaGVkKSk7XG5cbiAgICAgICAgICAgIHNlbGYuc2VsZWN0U3ViVHJlZShhdHRhY2hlZCwgZmFsc2UsIG5vZGVzVG9BdHRhY2gubGVuZ3RoPjEpO1xuICAgICAgICB9KTtcblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBzZWxmLnJlZHJhdygpO1xuICAgICAgICAgICAgc2VsZi5sYXlvdXQudXBkYXRlKCk7XG4gICAgICAgIH0sMTApXG5cbiAgICB9XG5cbiAgICBjb252ZXJ0Tm9kZShub2RlLCB0eXBlVG9Db252ZXJ0VG8pe1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSgpO1xuICAgICAgICB0aGlzLmRhdGEuY29udmVydE5vZGUobm9kZSwgdHlwZVRvQ29udmVydFRvKTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgc2VsZi5yZWRyYXcodHJ1ZSk7XG4gICAgICAgIH0sMTApXG4gICAgfVxuXG4gICAgcGVyZm9ybU9wZXJhdGlvbihvYmplY3QsIG9wZXJhdGlvbil7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKCk7XG4gICAgICAgIHRoaXMuY29uZmlnLnBlcmZvcm1PcGVyYXRpb24ob2JqZWN0LCBvcGVyYXRpb24pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHNlbGYucmVkcmF3KCk7XG4gICAgICAgICAgICAgICAgc2VsZi5sYXlvdXQudXBkYXRlKCk7XG4gICAgICAgICAgICB9LDEwKVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmb2xkU3VidHJlZShub2RlLCBmb2xkID0gdHJ1ZSwgcmVkcmF3PXRydWUpe1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgbm9kZS5mb2xkZWQgPSBmb2xkO1xuXG4gICAgICAgIHRoaXMuZGF0YS5nZXRBbGxEZXNjZW5kYW50Tm9kZXMobm9kZSkuZm9yRWFjaChuPT57XG4gICAgICAgICAgICBuLiRoaWRkZW4gPSBmb2xkO1xuICAgICAgICAgICAgbi5mb2xkZWQgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZGF0YS5nZXRBbGxEZXNjZW5kYW50RWRnZXMobm9kZSkuZm9yRWFjaChlPT5lLiRoaWRkZW4gPSBmb2xkKTtcblxuICAgICAgICBpZighcmVkcmF3KXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBzZWxmLnJlZHJhdygpO1xuICAgICAgICAgICAgc2VsZi5sYXlvdXQudXBkYXRlKCk7XG4gICAgICAgIH0sMTApXG4gICAgfVxuXG4gICAgdXBkYXRlVmlzaWJpbGl0eShub2RlID0gbnVsbCl7XG4gICAgICAgIGlmKCFub2RlKXtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5nZXRSb290cygpLmZvckVhY2gobj0+dGhpcy51cGRhdGVWaXNpYmlsaXR5KG4pKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKG5vZGUuZm9sZGVkKXtcbiAgICAgICAgICAgIHRoaXMuZm9sZFN1YnRyZWUobm9kZSwgdHJ1ZSwgZmFsc2UpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbm9kZS5jaGlsZEVkZ2VzLmZvckVhY2goZSA9PiB0aGlzLnVwZGF0ZVZpc2liaWxpdHkoZS5jaGlsZE5vZGUpKTtcblxuICAgIH1cblxuICAgIG1vdmVOb2RlVG8oeCx5KXtcblxuICAgIH1cblxuICAgIHVwZGF0ZU5vZGVQb3NpdGlvbihub2RlKSB7XG4gICAgICAgIHRoaXMuZ2V0Tm9kZUQzU2VsZWN0aW9uKG5vZGUpLnJhaXNlKCkuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnK25vZGUubG9jYXRpb24ueCsnICcrbm9kZS5sb2NhdGlvbi55KycpJyk7XG4gICAgfVxuXG4gICAgdXBkYXRlVGV4dFBvc2l0aW9uKHRleHQpIHtcbiAgICAgICAgdGhpcy5nZXRUZXh0RDNTZWxlY3Rpb24odGV4dCkucmFpc2UoKS5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcrdGV4dC5sb2NhdGlvbi54KycgJyt0ZXh0LmxvY2F0aW9uLnkrJyknKTtcbiAgICB9XG5cbiAgICBnZXROb2RlRDNTZWxlY3Rpb24obm9kZSl7XG4gICAgICAgIHJldHVybiB0aGlzLmdldE5vZGVEM1NlbGVjdGlvbkJ5SWQobm9kZS5pZCk7XG4gICAgfVxuXG4gICAgZ2V0Tm9kZUQzU2VsZWN0aW9uQnlJZChpZCl7XG4gICAgICAgIHJldHVybiB0aGlzLm1haW5Hcm91cC5zZWxlY3QoJyNub2RlLScraWQpO1xuICAgIH1cbiAgICBnZXRUZXh0RDNTZWxlY3Rpb24odGV4dCl7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFRleHREM1NlbGVjdGlvbkJ5SWQodGV4dC5pZCk7XG4gICAgfVxuICAgIGdldFRleHREM1NlbGVjdGlvbkJ5SWQoaWQpe1xuICAgICAgICByZXR1cm4gdGhpcy5tYWluR3JvdXAuc2VsZWN0KCcjdGV4dC0nK2lkKTtcbiAgICB9XG5cbiAgICBnZXRTZWxlY3RlZE5vZGVzKHZpc2libGVPbmx5ID0gZmFsc2UpIHtcbiAgICAgICAgbGV0IHNlbGVjdGVkVmlzaWJsZSA9IHRoaXMubWFpbkdyb3VwLnNlbGVjdEFsbChcIi5ub2RlLnNlbGVjdGVkXCIpLmRhdGEoKTtcbiAgICAgICAgaWYodmlzaWJsZU9ubHkpe1xuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdGVkVmlzaWJsZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBhbGxTZWxlY3RlZCAgPSBbXTtcbiAgICAgICAgYWxsU2VsZWN0ZWQucHVzaCguLi5zZWxlY3RlZFZpc2libGUpO1xuXG4gICAgICAgIHNlbGVjdGVkVmlzaWJsZS5mb3JFYWNoKG49PntcbiAgICAgICAgICAgIGlmKG4uZm9sZGVkKXtcbiAgICAgICAgICAgICAgICBsZXQgZGVzY2VuZGFudHMgPSB0aGlzLmRhdGEuZ2V0QWxsRGVzY2VuZGFudE5vZGVzKG4pO1xuICAgICAgICAgICAgICAgIGlmKGRlc2NlbmRhbnRzKXtcbiAgICAgICAgICAgICAgICAgICAgYWxsU2VsZWN0ZWQucHVzaCguLi5kZXNjZW5kYW50cyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gYWxsU2VsZWN0ZWQ7XG4gICAgfVxuXG4gICAgZ2V0U2VsZWN0ZWRUZXh0cygpe1xuICAgICAgICByZXR1cm4gdGhpcy5tYWluR3JvdXAuc2VsZWN0QWxsKFwiLmZsb2F0aW5nLXRleHQuc2VsZWN0ZWRcIikuZGF0YSgpO1xuICAgIH1cblxuICAgIGNsZWFyU2VsZWN0aW9uKCl7XG4gICAgICAgIHRoaXMubWFpbkdyb3VwLnNlbGVjdEFsbChcIi5lZGdlLnNlbGVjdGVkXCIpLnNlbGVjdCgncGF0aCcpLmF0dHIoXCJtYXJrZXItZW5kXCIsIGQgPT4gXCJ1cmwoI2Fycm93XCIrKHRoaXMuaXNPcHRpbWFsKGQpPyctb3B0aW1hbCc6JycpK1wiKVwiKVxuICAgICAgICB0aGlzLm1haW5Hcm91cC5zZWxlY3RBbGwoXCIuc2VsZWN0ZWRcIikuY2xhc3NlZCgnc2VsZWN0ZWQnLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuY29uZmlnLm9uU2VsZWN0aW9uQ2xlYXJlZCgpO1xuICAgIH1cblxuICAgIHNlbGVjdEVkZ2UoZWRnZSwgY2xlYXJTZWxlY3Rpb25CZWZvcmVTZWxlY3Qpe1xuICAgICAgICBpZihjbGVhclNlbGVjdGlvbkJlZm9yZVNlbGVjdCl7XG4gICAgICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb25maWcub25FZGdlU2VsZWN0ZWQoZWRnZSk7XG4gICAgICAgIHRoaXMubWFpbkdyb3VwLnNlbGVjdCgnI2VkZ2UtJytlZGdlLmlkKVxuICAgICAgICAgICAgLmNsYXNzZWQoJ3NlbGVjdGVkJywgdHJ1ZSlcbiAgICAgICAgICAgIC5zZWxlY3QoJ3BhdGgnKVxuICAgICAgICAgICAgLmF0dHIoXCJtYXJrZXItZW5kXCIsIGQgPT4gXCJ1cmwoI2Fycm93LXNlbGVjdGVkKVwiKVxuICAgIH1cblxuICAgIGlzTm9kZVNlbGVjdGVkKG5vZGUpe1xuICAgICAgICByZXR1cm4gdGhpcy5nZXROb2RlRDNTZWxlY3Rpb24obm9kZSkuY2xhc3NlZCgnc2VsZWN0ZWQnKTtcbiAgICB9XG5cbiAgICBzZWxlY3ROb2RlKG5vZGUsIGNsZWFyU2VsZWN0aW9uQmVmb3JlU2VsZWN0LCBza2lwQ2FsbGJhY2spe1xuICAgICAgICBpZihjbGVhclNlbGVjdGlvbkJlZm9yZVNlbGVjdCl7XG4gICAgICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZighc2tpcENhbGxiYWNrKXtcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLm9uTm9kZVNlbGVjdGVkKG5vZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5nZXROb2RlRDNTZWxlY3Rpb25CeUlkKG5vZGUuaWQpLmNsYXNzZWQoJ3NlbGVjdGVkJywgdHJ1ZSk7XG4gICAgfVxuXG4gICAgc2VsZWN0VGV4dCh0ZXh0LCBjbGVhclNlbGVjdGlvbkJlZm9yZVNlbGVjdCwgc2tpcENhbGxiYWNrKXtcbiAgICAgICAgaWYoY2xlYXJTZWxlY3Rpb25CZWZvcmVTZWxlY3Qpe1xuICAgICAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIXNraXBDYWxsYmFjayl7XG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5vblRleHRTZWxlY3RlZCh0ZXh0KVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5nZXRUZXh0RDNTZWxlY3Rpb25CeUlkKHRleHQuaWQpLmNsYXNzZWQoJ3NlbGVjdGVkJywgdHJ1ZSk7XG4gICAgfVxuXG4gICAgc2VsZWN0U3ViVHJlZShub2RlLCBjbGVhclNlbGVjdGlvbkJlZm9yZVNlbGVjdCxza2lwQ2FsbGJhY2spIHtcbiAgICAgICAgaWYoY2xlYXJTZWxlY3Rpb25CZWZvcmVTZWxlY3Qpe1xuICAgICAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2VsZWN0Tm9kZShub2RlLCBmYWxzZSwgc2tpcENhbGxiYWNrKTtcbiAgICAgICAgbm9kZS5jaGlsZEVkZ2VzLmZvckVhY2goZT0+dGhpcy5zZWxlY3RTdWJUcmVlKGUuY2hpbGROb2RlLCBmYWxzZSwgdHJ1ZSkpO1xuICAgIH1cblxuICAgIHNlbGVjdEFsbE5vZGVzKCkge1xuICAgICAgICB0aGlzLm1haW5Hcm91cC5zZWxlY3RBbGwoXCIubm9kZVwiKS5jbGFzc2VkKCdzZWxlY3RlZCcsIHRydWUpO1xuICAgIH1cblxuICAgIGF1dG9MYXlvdXQodHlwZSwgd2l0aG91dFN0YXRlU2F2aW5nKXtcbiAgICAgICAgdGhpcy5sYXlvdXQuYXV0b0xheW91dCh0eXBlLCB3aXRob3V0U3RhdGVTYXZpbmcpO1xuICAgIH1cblxuICAgIHVwZGF0ZURpYWdyYW1UaXRsZSh0aXRsZVZhbHVlKXtcbiAgICAgICAgaWYoIXRpdGxlVmFsdWUpe1xuICAgICAgICAgICAgdGl0bGVWYWx1ZSA9ICcnO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGlhZ3JhbVRpdGxlID0gdGl0bGVWYWx1ZTtcbiAgICAgICAgdGhpcy5yZWRyYXdEaWFncmFtVGl0bGUoKTtcbiAgICAgICAgdGhpcy5yZWRyYXdEaWFncmFtRGVzY3JpcHRpb24oKTtcbiAgICAgICAgdGhpcy51cGRhdGVNYXJnaW4odHJ1ZSk7XG4gICAgfVxuXG4gICAgcmVkcmF3RGlhZ3JhbVRpdGxlKCl7XG4gICAgICAgIHZhciBzdmdXaWR0aCA9IHRoaXMuc3ZnLmF0dHIoJ3dpZHRoJyk7XG4gICAgICAgIHZhciBzdmdIZWlnaHQgPSB0aGlzLnN2Zy5hdHRyKCdoZWlnaHQnKTtcbiAgICAgICAgdGhpcy50aXRsZUNvbnRhaW5lciA9IHRoaXMuc3ZnLnNlbGVjdE9yQXBwZW5kKCdnLnNkLXRpdGxlLWNvbnRhaW5lcicpO1xuXG4gICAgICAgIHZhciB0aXRsZSA9IHRoaXMudGl0bGVDb250YWluZXIuc2VsZWN0T3JBcHBlbmQoJ3RleHQuc2QtdGl0bGUnKTtcbiAgICAgICAgdGl0bGUudGV4dCh0aGlzLmRpYWdyYW1UaXRsZSk7XG4gICAgICAgIExheW91dC5zZXRIYW5naW5nUG9zaXRpb24odGl0bGUpO1xuXG4gICAgICAgIHZhciBtYXJnaW5Ub3AgPSBwYXJzZUludCh0aGlzLmNvbmZpZy50aXRsZS5tYXJnaW4udG9wKTtcbiAgICAgICAgdGhpcy50aXRsZUNvbnRhaW5lci5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcrKHN2Z1dpZHRoLzIpKycsJysoIG1hcmdpblRvcCkrJyknKTtcbiAgICB9XG4gICAgcmVkcmF3RGlhZ3JhbURlc2NyaXB0aW9uKCl7XG4gICAgICAgIHZhciBzdmdXaWR0aCA9IHRoaXMuc3ZnLmF0dHIoJ3dpZHRoJyk7XG4gICAgICAgIHZhciBzdmdIZWlnaHQgPSB0aGlzLnN2Zy5hdHRyKCdoZWlnaHQnKTtcbiAgICAgICAgdGhpcy50aXRsZUNvbnRhaW5lciA9IHRoaXMuc3ZnLnNlbGVjdE9yQXBwZW5kKCdnLnNkLXRpdGxlLWNvbnRhaW5lcicpO1xuXG4gICAgICAgIHZhciBkZXNjID0gdGhpcy50aXRsZUNvbnRhaW5lci5zZWxlY3RPckFwcGVuZCgndGV4dC5zZC1kZXNjcmlwdGlvbicpO1xuXG4gICAgICAgIGlmKCF0aGlzLmNvbmZpZy5kZXNjcmlwdGlvbi5zaG93KXtcbiAgICAgICAgICAgIGRlc2MucmVtb3ZlKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbGluZXMgPSB0aGlzLmRpYWdyYW1EZXNjcmlwdGlvbiA/IHRoaXMuZGlhZ3JhbURlc2NyaXB0aW9uLnNwbGl0KCdcXG4nKSA6IFtdO1xuICAgICAgICB2YXIgdHNwYW5zID0gZGVzYy5zZWxlY3RBbGwoJ3RzcGFuJykuZGF0YShsaW5lcyk7XG4gICAgICAgIHRzcGFucy5lbnRlcigpLmFwcGVuZCgndHNwYW4nKVxuICAgICAgICAgICAgLm1lcmdlKHRzcGFucylcbiAgICAgICAgICAgIC5odG1sKGw9PkFwcFV0aWxzLnJlcGxhY2VVcmxzKEFwcFV0aWxzLmVzY2FwZUh0bWwobCkpKVxuICAgICAgICAgICAgLmF0dHIoJ2R5JywgKGQsaSk9Pmk+MCA/ICcxLjFlbSc6IHVuZGVmaW5lZClcbiAgICAgICAgICAgIC5hdHRyKCd4JywgJzAnKTtcblxuICAgICAgICB0c3BhbnMuZXhpdCgpLnJlbW92ZSgpO1xuICAgICAgICBMYXlvdXQuc2V0SGFuZ2luZ1Bvc2l0aW9uKGRlc2MpO1xuXG4gICAgICAgIHZhciB0aXRsZSA9IHRoaXMudGl0bGVDb250YWluZXIuc2VsZWN0T3JBcHBlbmQoJ3RleHQuc2QtdGl0bGUnKTtcblxuICAgICAgICB2YXIgbWFyZ2luVG9wID0gMDtcbiAgICAgICAgaWYodGhpcy5kaWFncmFtVGl0bGUpe1xuICAgICAgICAgICAgbWFyZ2luVG9wICs9IHRpdGxlLm5vZGUoKS5nZXRCQm94KCkuaGVpZ2h0O1xuICAgICAgICAgICAgbWFyZ2luVG9wKz0gTWF0aC5tYXgocGFyc2VJbnQodGhpcy5jb25maWcuZGVzY3JpcHRpb24ubWFyZ2luLnRvcCksIDApO1xuICAgICAgICB9XG5cblxuICAgICAgICBkZXNjLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoMCwnKyggbWFyZ2luVG9wKSsnKScpO1xuICAgIH1cblxuICAgIHVwZGF0ZURpYWdyYW1EZXNjcmlwdGlvbihkZXNjcmlwdGlvblZhbHVlKXtcbiAgICAgICAgaWYoIWRlc2NyaXB0aW9uVmFsdWUpe1xuICAgICAgICAgICAgZGVzY3JpcHRpb25WYWx1ZSA9ICcnO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGlhZ3JhbURlc2NyaXB0aW9uID0gZGVzY3JpcHRpb25WYWx1ZTtcbiAgICAgICAgdGhpcy5yZWRyYXdEaWFncmFtVGl0bGUoKTtcbiAgICAgICAgdGhpcy5yZWRyYXdEaWFncmFtRGVzY3JpcHRpb24oKTtcbiAgICAgICAgdGhpcy51cGRhdGVNYXJnaW4odHJ1ZSk7XG4gICAgfVxuXG5cbiAgICBnZXRUaXRsZUdyb3VwSGVpZ2h0KHdpdGhNYXJnaW5zKXtcbiAgICAgICAgaWYoIXRoaXMudGl0bGVDb250YWluZXIpe1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGggPSB0aGlzLnRpdGxlQ29udGFpbmVyLm5vZGUoKS5nZXRCQm94KCkuaGVpZ2h0O1xuICAgICAgICBpZih3aXRoTWFyZ2lucyl7XG4gICAgICAgICAgICBoKz0gcGFyc2VJbnQodGhpcy5jb25maWcudGl0bGUubWFyZ2luLmJvdHRvbSk7XG4gICAgICAgICAgICBoKz0gcGFyc2VJbnQodGhpcy5jb25maWcudGl0bGUubWFyZ2luLnRvcCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGg7XG4gICAgfVxuXG59XG4iLCJleHBvcnQgKiBmcm9tICcuL3NyYy9pbmRleCdcbiJdfQ==
