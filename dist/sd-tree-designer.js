require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

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

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};

  if (obj != null) {
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

var AppUtils =
/*#__PURE__*/
function () {
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

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};

  if (obj != null) {
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


var ContextMenu =
/*#__PURE__*/
function () {
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

function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EdgeContextMenu = void 0;

var _contextMenu = require("./context-menu");

var _i18n = require("../i18n/i18n");

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
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

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
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

var EdgeContextMenu =
/*#__PURE__*/
function (_ContextMenu) {
  _inherits(EdgeContextMenu, _ContextMenu);

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

    _this = _possibleConstructorReturn(this, _getPrototypeOf(EdgeContextMenu).call(this, menu));
    _this.treeDesigner = treeDesigner;
    return _this;
  }

  return EdgeContextMenu;
}(_contextMenu.ContextMenu);

exports.EdgeContextMenu = EdgeContextMenu;

},{"../i18n/i18n":12,"./context-menu":2}],4:[function(require,module,exports){
"use strict";

function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

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

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};

  if (obj != null) {
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
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
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

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
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

var MainContextMenu =
/*#__PURE__*/
function (_ContextMenu) {
  _inherits(MainContextMenu, _ContextMenu);

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

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MainContextMenu).call(this, menu, {
      onOpen: function onOpen() {
        treeDesigner.clearSelection();
        mousePosition = new _sdModel.domain.Point(d3.mouse(treeDesigner.svg.node())).move(treeDesigner.getMainGroupTranslation(true));
      }
    }));
    _this.treeDesigner = treeDesigner;
    return _this;
  }

  return MainContextMenu;
}(_contextMenu.ContextMenu);

exports.MainContextMenu = MainContextMenu;

},{"../d3":8,"../i18n/i18n":12,"./context-menu":2,"sd-model":"sd-model"}],5:[function(require,module,exports){
"use strict";

function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NodeContextMenu = void 0;

var _contextMenu = require("./context-menu");

var _sdModel = require("sd-model");

var _i18n = require("../i18n/i18n");

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
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

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
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

var NodeContextMenu =
/*#__PURE__*/
function (_ContextMenu) {
  _inherits(NodeContextMenu, _ContextMenu);

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

    _this = _possibleConstructorReturn(this, _getPrototypeOf(NodeContextMenu).call(this, menu));
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

function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextContextMenu = void 0;

var _contextMenu = require("./context-menu");

var _i18n = require("../i18n/i18n");

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
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

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
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

var TextContextMenu =
/*#__PURE__*/
function (_ContextMenu) {
  _inherits(TextContextMenu, _ContextMenu);

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

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TextContextMenu).call(this, menu));
    _this.treeDesigner = treeDesigner;
    return _this;
  }

  return TextContextMenu;
}(_contextMenu.ContextMenu);

exports.TextContextMenu = TextContextMenu;

},{"../i18n/i18n":12,"./context-menu":2}],7:[function(require,module,exports){
"use strict";

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

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};

  if (obj != null) {
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

var D3Extensions =
/*#__PURE__*/
function () {
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
			
            "flipSubtree": "Teilbaum umdrehen"
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
            "flipSubtree": "Flip subtree"
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
            "flipSubtree": "Basculer sous-arbre"
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

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};

  if (obj != null) {
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

var i18n =
/*#__PURE__*/
function () {
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
            "flipSubtree": "Ribalta sotto-albero"
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
            "flipSubtree": "Przewróć poddrzewo"
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

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};

  if (obj != null) {
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


var Layout =
/*#__PURE__*/
function () {
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
        return self.nodeSymbolSize[d.$id] ? _sdUtils.Utils.get(self.targetSymbolSize, d.type + "['" + self.config.nodeSize + "']", 64) : 64;
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
          size = error * error * (self.nodeSymbolSize[d.$id] || 64);

          _sdUtils.Utils.set(self.targetSymbolSize, d.type + "['" + self.config.nodeSize + "']", size);
        }

        if (transition) {
          path = path.transition();
        } else {
          self.nodeSymbolSize[d.$id] = size;
        }

        path.attr("d", self.nodeSymbol);

        if (transition) {
          self.nodeSymbolSize[d.$id] = size;
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

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};

  if (obj != null) {
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

var NodeDragHandler =
/*#__PURE__*/
function () {
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

var Templates =
/*#__PURE__*/
function () {
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

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};

  if (obj != null) {
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

var TextDragHandler =
/*#__PURE__*/
function () {
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

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};

  if (obj != null) {
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

var Tooltip =
/*#__PURE__*/
function () {
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

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};

  if (obj != null) {
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
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
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

  this.payoffNames = [null, null];
  this.maxPayoffsToDisplay = 1;

  if (custom) {
    _sdUtils.Utils.deepExtend(this, custom);
  }
};

exports.TreeDesignerConfig = TreeDesignerConfig;

var TreeDesigner =
/*#__PURE__*/
function () {
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
        return d.$id;
      });
      nodes.exit().remove();
      var nodesEnter = nodes.enter().append('g').attr('id', function (d) {
        return 'node-' + d.$id;
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
        return d.$id;
      });
      edges.exit().remove();
      var edgesEnter = edges.enter().append('g').attr('id', function (d) {
        return 'edge-' + d.$id;
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
        return d.$id;
      });
      texts.exit().remove();
      var textsEnter = texts.enter().appendSelector('g.floating-text').attr('id', function (d) {
        return 'text-' + d.$id;
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
      operation.perform(object);
      setTimeout(function () {
        self.redraw();
        self.layout.update();
      }, 10);
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
      return this.getNodeD3SelectionById(node.$id);
    }
  }, {
    key: "getNodeD3SelectionById",
    value: function getNodeD3SelectionById(id) {
      return this.mainGroup.select('#node-' + id);
    }
  }, {
    key: "getTextD3Selection",
    value: function getTextD3Selection(text) {
      return this.getTextD3SelectionById(text.$id);
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
      this.mainGroup.select('#edge-' + edge.$id).classed('selected', true).select('path').attr("marker-end", function (d) {
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

      this.getNodeD3SelectionById(node.$id).classed('selected', true);
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

      this.getTextD3SelectionById(text.$id).classed('selected', true);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLXV0aWxzLmpzIiwic3JjL2NvbnRleHQtbWVudS9jb250ZXh0LW1lbnUuanMiLCJzcmMvY29udGV4dC1tZW51L2VkZ2UtY29udGV4dC1tZW51LmpzIiwic3JjL2NvbnRleHQtbWVudS9tYWluLWNvbnRleHQtbWVudS5qcyIsInNyYy9jb250ZXh0LW1lbnUvbm9kZS1jb250ZXh0LW1lbnUuanMiLCJzcmMvY29udGV4dC1tZW51L3RleHQtY29udGV4dC1tZW51LmpzIiwic3JjL2QzLWV4dGVuc2lvbnMuanMiLCJzcmMvZDMuanMiLCJzcmMvaTE4bi9kZS5qc29uIiwic3JjL2kxOG4vZW4uanNvbiIsInNyYy9pMThuL2ZyLmpzb24iLCJzcmMvaTE4bi9pMThuLmpzIiwic3JjL2kxOG4vaXQuanNvbiIsInNyYy9pMThuL3BsLmpzb24iLCJzcmMvaW5kZXguanMiLCJzcmMvbGF5b3V0LmpzIiwic3JjL25vZGUtZHJhZy1oYW5kbGVyLmpzIiwic3JjL3N5bWJvbHMvY2lyY2xlLmpzIiwic3JjL3N5bWJvbHMvdHJpYW5nbGUuanMiLCJzcmMvdGVtcGxhdGVzLmpzIiwic3JjL3RlbXBsYXRlcy9ncm93bF9tZXNzYWdlLmh0bWwiLCJzcmMvdGV4dC1kcmFnLWhhbmRsZXIuanMiLCJzcmMvdG9vbHRpcC5qcyIsInNyYy90cmVlLWRlc2lnbmVyLmpzIiwiaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FDQUEsSUFBQSxFQUFBLEdBQUEsdUJBQUEsQ0FBQSxPQUFBLENBQUEsTUFBQSxDQUFBLENBQUE7O0FBQ0EsSUFBQSxVQUFBLEdBQUEsT0FBQSxDQUFBLGFBQUEsQ0FBQTs7QUFDQSxJQUFBLEtBQUEsR0FBQSxPQUFBLENBQUEsYUFBQSxDQUFBOztBQUNBLElBQUEsUUFBQSxHQUFBLE9BQUEsQ0FBQSxVQUFBLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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QSxFQUFBO0FBQUEsRUFBQSxNQUFBLENBQUEsY0FBQSxDQUFBLE9BQUEsRUFBQSxHQUFBLEVBQUE7QUFBQSxJQUFBLFVBQUEsRUFBQSxJQUFBO0FBQUEsSUFBQSxHQUFBLEVBQUEsU0FBQSxHQUFBLEdBQUE7QUFBQSxhQUFBLFlBQUEsQ0FBQSxHQUFBLENBQUE7QUFBQTtBQUFBLEdBQUE7QUFBQSxDQUFBOztBQUNBLElBQUEsUUFBQSxHQUFBLE9BQUEsQ0FBQSxVQUFBLENBQUE7O0FBQUEsTUFBQSxDQUFBLElBQUEsQ0FBQSxRQUFBLEVBQUEsT0FBQSxDQUFBLFVBQUEsR0FBQSxFQUFBO0FBQUEsTUFBQSxHQUFBLEtBQUEsU0FBQSxJQUFBLEdBQUEsS0FBQSxZQUFBLEVBQUE7QUFBQSxFQUFBLE1BQUEsQ0FBQSxjQUFBLENBQUEsT0FBQSxFQUFBLEdBQUEsRUFBQTtBQUFBLElBQUEsVUFBQSxFQUFBLElBQUE7QUFBQSxJQUFBLEdBQUEsRUFBQSxTQUFBLEdBQUEsR0FBQTtBQUFBLGFBQUEsUUFBQSxDQUFBLEdBQUEsQ0FBQTtBQUFBO0FBQUEsR0FBQTtBQUFBLENBQUE7O0FBQ0EsSUFBQSxPQUFBLEdBQUEsT0FBQSxDQUFBLFNBQUEsQ0FBQTs7QUFBQSxNQUFBLENBQUEsSUFBQSxDQUFBLE9BQUEsRUFBQSxPQUFBLENBQUEsVUFBQSxHQUFBLEVBQUE7QUFBQSxNQUFBLEdBQUEsS0FBQSxTQUFBLElBQUEsR0FBQSxLQUFBLFlBQUEsRUFBQTtBQUFBLEVBQUEsTUFBQSxDQUFBLGNBQUEsQ0FBQSxPQUFBLEVBQUEsR0FBQSxFQUFBO0FBQUEsSUFBQSxVQUFBLEVBQUEsSUFBQTtBQUFBLElBQUEsR0FBQSxFQUFBLFNBQUEsR0FBQSxHQUFBO0FBQUEsYUFBQSxPQUFBLENBQUEsR0FBQSxDQUFBO0FBQUE7QUFBQSxHQUFBO0FBQUEsQ0FBQTs7QUFDQSxJQUFBLFFBQUEsR0FBQSxPQUFBLENBQUEsVUFBQSxDQUFBOztBQUFBLE1BQUEsQ0FBQSxJQUFBLENBQUEsUUFBQSxFQUFBLE9BQUEsQ0FBQSxVQUFBLEdBQUEsRUFBQTtBQUFBLE1BQUEsR0FBQSxLQUFBLFNBQUEsSUFBQSxHQUFBLEtBQUEsWUFBQSxFQUFBO0FBQUEsRUFBQSxNQUFBLENBQUEsY0FBQSxDQUFBLE9BQUEsRUFBQSxHQUFBLEVBQUE7QUFBQSxJQUFBLFVBQUEsRUFBQSxJQUFBO0FBQUEsSUFBQSxHQUFBLEVBQUEsU0FBQSxHQUFBLEdBQUE7QUFBQSxhQUFBLFFBQUEsQ0FBQSxHQUFBLENBQUE7QUFBQTtBQUFBLEdBQUE7QUFBQSxDQUFBOztBQUNBLElBQUEsUUFBQSxHQUFBLE9BQUEsQ0FBQSxVQUFBLENBQUE7O0FBQUEsTUFBQSxDQUFBLElBQUEsQ0FBQSxRQUFBLEVBQUEsT0FBQSxDQUFBLFVBQUEsR0FBQSxFQUFBO0FBQUEsTUFBQSxHQUFBLEtBQUEsU0FBQSxJQUFBLEdBQUEsS0FBQSxZQUFBLEVBQUE7QUFBQSxFQUFBLE1BQUEsQ0FBQSxjQUFBLENBQUEsT0FBQSxFQUFBLEdBQUEsRUFBQTtBQUFBLElBQUEsVUFBQSxFQUFBLElBQUE7QUFBQSxJQUFBLEdBQUEsRUFBQSxTQUFBLEdBQUEsR0FBQTtBQUFBLGFBQUEsUUFBQSxDQUFBLEdBQUEsQ0FBQTtBQUFBO0FBQUEsR0FBQTtBQUFBLENBQUE7O0FBQ0EsSUFBQSxZQUFBLEdBQUEsT0FBQSxDQUFBLGNBQUEsQ0FBQTs7QUFBQSxNQUFBLENBQUEsSUFBQSxDQUFBLFlBQUEsRUFBQSxPQUFBLENBQUEsVUFBQSxHQUFBLEVBQUE7QUFBQSxNQUFBLEdBQUEsS0FBQSxTQUFBLElBQUEsR0FBQSxLQUFBLFlBQUEsRUFBQTtBQUFBLEVBQUEsTUFBQSxDQUFBLGNBQUEsQ0FBQSxPQUFBLEVBQUEsR0FBQSxFQUFBO0FBQUEsSUFBQSxVQUFBLEVBQUEsSUFBQTtBQUFBLElBQUEsR0FBQSxFQUFBLFNBQUEsR0FBQSxHQUFBO0FBQUEsYUFBQSxZQUFBLENBQUEsR0FBQSxDQUFBO0FBQUE7QUFBQSxHQUFBO0FBQUEsQ0FBQTs7QUFDQSxJQUFBLGFBQUEsR0FBQSxPQUFBLENBQUEsZ0JBQUEsQ0FBQTs7QUFBQSxNQUFBLENBQUEsSUFBQSxDQUFBLGFBQUEsRUFBQSxPQUFBLENBQUEsVUFBQSxHQUFBLEVBQUE7QUFBQSxNQUFBLEdBQUEsS0FBQSxTQUFBLElBQUEsR0FBQSxLQUFBLFlBQUEsRUFBQTtBQUFBLEVBQUEsTUFBQSxDQUFBLGNBQUEsQ0FBQSxPQUFBLEVBQUEsR0FBQSxFQUFBO0FBQUEsSUFBQSxVQUFBLEVBQUEsSUFBQTtBQUFBLElBQUEsR0FBQSxFQUFBLFNBQUEsR0FBQSxHQUFBO0FBQUEsYUFBQSxhQUFBLENBQUEsR0FBQSxDQUFBO0FBQUE7QUFBQSxHQUFBO0FBQUEsQ0FBQTs7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUNsRUEsSUFBQSxRQUFBLEdBQUEsc0JBQUEsQ0FBQSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQUE7O0FBQ0EsSUFBQSxFQUFBLEdBQUEsdUJBQUEsQ0FBQSxPQUFBLENBQUEsV0FBQSxDQUFBLENBQUE7O0FBQ0EsSUFBQSxFQUFBLEdBQUEsdUJBQUEsQ0FBQSxPQUFBLENBQUEsV0FBQSxDQUFBLENBQUE7O0FBQ0EsSUFBQSxFQUFBLEdBQUEsdUJBQUEsQ0FBQSxPQUFBLENBQUEsV0FBQSxDQUFBLENBQUE7O0FBQ0EsSUFBQSxFQUFBLEdBQUEsdUJBQUEsQ0FBQSxPQUFBLENBQUEsV0FBQSxDQUFBLENBQUE7O0FBQ0EsSUFBQSxFQUFBLEdBQUEsdUJBQUEsQ0FBQSxPQUFBLENBQUEsV0FBQSxDQUFBLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFYSxJOzs7Ozs7Ozs7eUJBS0csRyxFQUFJO0FBQ1osTUFBQSxJQUFJLENBQUosUUFBQSxHQUFBLEdBQUE7QUFDQSxVQUFJLFNBQVMsR0FBRztBQUNaLFFBQUEsRUFBRSxFQUFFO0FBQ0EsVUFBQSxXQUFXLEVBQUU7QUFEYixTQURRO0FBSVosUUFBQSxFQUFFLEVBQUU7QUFDQSxVQUFBLFdBQVcsRUFBRTtBQURiLFNBSlE7QUFPWixRQUFBLEVBQUUsRUFBRTtBQUNBLFVBQUEsV0FBVyxFQUFFO0FBRGIsU0FQUTtBQVVaLFFBQUEsRUFBRSxFQUFFO0FBQ0EsVUFBQSxXQUFXLEVBQUU7QUFEYixTQVZRO0FBYVosUUFBQSxFQUFFLEVBQUU7QUFDQSxVQUFBLFdBQVcsRUFBRTtBQURiO0FBYlEsT0FBaEI7QUFpQkEsTUFBQSxJQUFJLENBQUosU0FBQSxHQUFpQixRQUFBLENBQUEsU0FBQSxDQUFBLENBQUEsY0FBQSxDQUF1QjtBQUNwQyxRQUFBLEdBQUcsRUFEaUMsR0FBQTtBQUVwQyxRQUFBLFdBQVcsRUFGeUIsSUFBQTtBQUdwQyxRQUFBLFNBQVMsRUFBRTtBQUh5QixPQUF2QixFQUlkLFVBQUEsR0FBQSxFQUFBLENBQUEsRUFBWSxDQUpmLENBQWlCLENBQWpCO0FBTUg7OztzQkFFUSxHLEVBQUssRyxFQUFJO0FBQ2QsYUFBTyxJQUFJLENBQUosU0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFBLEVBQVAsR0FBTyxDQUFQO0FBQ0g7Ozs7Ozs7OztBQ3pDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3BFQSxJQUFBLGFBQUEsR0FBQSxPQUFBLENBQUEsaUJBQUEsQ0FBQTs7QUFPQSxNQUFBLENBQUEsSUFBQSxDQUFBLGFBQUEsRUFBQSxPQUFBLENBQUEsVUFBQSxHQUFBLEVBQUE7QUFBQSxNQUFBLEdBQUEsS0FBQSxTQUFBLElBQUEsR0FBQSxLQUFBLFlBQUEsRUFBQTtBQUFBLE1BQUEsTUFBQSxDQUFBLFNBQUEsQ0FBQSxjQUFBLENBQUEsSUFBQSxDQUFBLFlBQUEsRUFBQSxHQUFBLENBQUEsRUFBQTtBQUFBLEVBQUEsTUFBQSxDQUFBLGNBQUEsQ0FBQSxPQUFBLEVBQUEsR0FBQSxFQUFBO0FBQUEsSUFBQSxVQUFBLEVBQUEsSUFBQTtBQUFBLElBQUEsR0FBQSxFQUFBLFNBQUEsR0FBQSxHQUFBO0FBQUEsYUFBQSxhQUFBLENBQUEsR0FBQSxDQUFBO0FBQUE7QUFBQSxHQUFBO0FBQUEsQ0FBQTs7QUFKQSxJQUFBLGFBQUEsR0FBQSxPQUFBLENBQUEsaUJBQUEsQ0FBQTs7QUFBQSxNQUFBLENBQUEsSUFBQSxDQUFBLGFBQUEsRUFBQSxPQUFBLENBQUEsVUFBQSxHQUFBLEVBQUE7QUFBQSxNQUFBLEdBQUEsS0FBQSxTQUFBLElBQUEsR0FBQSxLQUFBLFlBQUEsRUFBQTtBQUFBLE1BQUEsTUFBQSxDQUFBLFNBQUEsQ0FBQSxjQUFBLENBQUEsSUFBQSxDQUFBLFlBQUEsRUFBQSxHQUFBLENBQUEsRUFBQTtBQUFBLEVBQUEsTUFBQSxDQUFBLGNBQUEsQ0FBQSxPQUFBLEVBQUEsR0FBQSxFQUFBO0FBQUEsSUFBQSxVQUFBLEVBQUEsSUFBQTtBQUFBLElBQUEsR0FBQSxFQUFBLFNBQUEsR0FBQSxHQUFBO0FBQUEsYUFBQSxhQUFBLENBQUEsR0FBQSxDQUFBO0FBQUE7QUFBQSxHQUFBO0FBQUEsQ0FBQTs7QUFDQSxJQUFBLFNBQUEsR0FBQSxPQUFBLENBQUEsYUFBQSxDQUFBOztBQUFBLE1BQUEsQ0FBQSxJQUFBLENBQUEsU0FBQSxFQUFBLE9BQUEsQ0FBQSxVQUFBLEdBQUEsRUFBQTtBQUFBLE1BQUEsR0FBQSxLQUFBLFNBQUEsSUFBQSxHQUFBLEtBQUEsWUFBQSxFQUFBO0FBQUEsTUFBQSxNQUFBLENBQUEsU0FBQSxDQUFBLGNBQUEsQ0FBQSxJQUFBLENBQUEsWUFBQSxFQUFBLEdBQUEsQ0FBQSxFQUFBO0FBQUEsRUFBQSxNQUFBLENBQUEsY0FBQSxDQUFBLE9BQUEsRUFBQSxHQUFBLEVBQUE7QUFBQSxJQUFBLFVBQUEsRUFBQSxJQUFBO0FBQUEsSUFBQSxHQUFBLEVBQUEsU0FBQSxHQUFBLEdBQUE7QUFBQSxhQUFBLFNBQUEsQ0FBQSxHQUFBLENBQUE7QUFBQTtBQUFBLEdBQUE7QUFBQSxDQUFBOztBQUNBLElBQUEsVUFBQSxHQUFBLE9BQUEsQ0FBQSxhQUFBLENBQUE7O0FBQUEsTUFBQSxDQUFBLElBQUEsQ0FBQSxVQUFBLEVBQUEsT0FBQSxDQUFBLFVBQUEsR0FBQSxFQUFBO0FBQUEsTUFBQSxHQUFBLEtBQUEsU0FBQSxJQUFBLEdBQUEsS0FBQSxZQUFBLEVBQUE7QUFBQSxNQUFBLE1BQUEsQ0FBQSxTQUFBLENBQUEsY0FBQSxDQUFBLElBQUEsQ0FBQSxZQUFBLEVBQUEsR0FBQSxDQUFBLEVBQUE7QUFBQSxFQUFBLE1BQUEsQ0FBQSxjQUFBLENBQUEsT0FBQSxFQUFBLEdBQUEsRUFBQTtBQUFBLElBQUEsVUFBQSxFQUFBLElBQUE7QUFBQSxJQUFBLEdBQUEsRUFBQSxTQUFBLEdBQUEsR0FBQTtBQUFBLGFBQUEsVUFBQSxDQUFBLEdBQUEsQ0FBQTtBQUFBO0FBQUEsR0FBQTtBQUFBLENBQUE7O0FBQ0EsSUFBQSxRQUFBLEdBQUEsT0FBQSxDQUFBLFdBQUEsQ0FBQTs7QUFBQSxNQUFBLENBQUEsSUFBQSxDQUFBLFFBQUEsRUFBQSxPQUFBLENBQUEsVUFBQSxHQUFBLEVBQUE7QUFBQSxNQUFBLEdBQUEsS0FBQSxTQUFBLElBQUEsR0FBQSxLQUFBLFlBQUEsRUFBQTtBQUFBLE1BQUEsTUFBQSxDQUFBLFNBQUEsQ0FBQSxjQUFBLENBQUEsSUFBQSxDQUFBLFlBQUEsRUFBQSxHQUFBLENBQUEsRUFBQTtBQUFBLEVBQUEsTUFBQSxDQUFBLGNBQUEsQ0FBQSxPQUFBLEVBQUEsR0FBQSxFQUFBO0FBQUEsSUFBQSxVQUFBLEVBQUEsSUFBQTtBQUFBLElBQUEsR0FBQSxFQUFBLFNBQUEsR0FBQSxHQUFBO0FBQUEsYUFBQSxRQUFBLENBQUEsR0FBQSxDQUFBO0FBQUE7QUFBQSxHQUFBO0FBQUEsQ0FBQTs7QUFFQSxJQUFBLEVBQUEsR0FBQSxzQkFBQSxDQUFBLE9BQUEsQ0FBQSxNQUFBLENBQUEsQ0FBQTs7Ozs7Ozs7QUFQQSxhQUFBLENBQUEsWUFBQSxDQUFBLE1BQUE7Ozs7Ozs7Ozs7QUNEQSxJQUFBLFFBQUEsR0FBQSxPQUFBLENBQUEsVUFBQSxDQUFBOztBQUNBLElBQUEsUUFBQSxHQUFBLE9BQUEsQ0FBQSxVQUFBLENBQUE7O0FBQ0EsSUFBQSxFQUFBLEdBQUEsdUJBQUEsQ0FBQSxPQUFBLENBQUEsTUFBQSxDQUFBLENBQUE7O0FBQ0EsSUFBQSxPQUFBLEdBQUEsc0JBQUEsQ0FBQSxPQUFBLENBQUEsa0JBQUEsQ0FBQSxDQUFBOztBQUNBLElBQUEsU0FBQSxHQUFBLHNCQUFBLENBQUEsT0FBQSxDQUFBLG9CQUFBLENBQUEsQ0FBQTs7QUFDQSxJQUFBLFNBQUEsR0FBQSxP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QUFBLFlBQUEsRUFBQTtBQUFBLEVBQUEsTUFBQSxDQUFBLGNBQUEsQ0FBQSxPQUFBLEVBQUEsR0FBQSxFQUFBO0FBQUEsSUFBQSxVQUFBLEVBQUEsSUFBQTtBQUFBLElBQUEsR0FBQSxFQUFBLFNBQUEsR0FBQSxHQUFBO0FBQUEsYUFBQSxNQUFBLENBQUEsR0FBQSxDQUFBO0FBQUE7QUFBQSxHQUFBO0FBQUEsQ0FBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCAqIGFzIGQzIGZyb20gXCIuL2QzXCI7XG5pbXBvcnQge1RlbXBsYXRlc30gZnJvbSBcIi4vdGVtcGxhdGVzXCI7XG5pbXBvcnQge2kxOG59IGZyb20gXCIuL2kxOG4vaTE4blwiO1xuaW1wb3J0IHtVdGlsc30gZnJvbSBcInNkLXV0aWxzXCI7XG5cbmV4cG9ydCBjbGFzcyBBcHBVdGlscyB7XG5cbiAgICBzdGF0aWMgc2FuaXRpemVIZWlnaHQgPSBmdW5jdGlvbiAoaGVpZ2h0LCBjb250YWluZXIpIHtcbiAgICAgICAgcmV0dXJuIChoZWlnaHQgfHwgcGFyc2VJbnQoY29udGFpbmVyLnN0eWxlKCdoZWlnaHQnKSwgMTApIHx8IDQwMCk7XG4gICAgfTtcblxuICAgIHN0YXRpYyBzYW5pdGl6ZVdpZHRoID0gZnVuY3Rpb24gKHdpZHRoLCBjb250YWluZXIpIHtcbiAgICAgICAgcmV0dXJuICh3aWR0aCB8fCBwYXJzZUludChjb250YWluZXIuc3R5bGUoJ3dpZHRoJyksIDEwKSB8fCA5NjApO1xuICAgIH07XG5cbiAgICBzdGF0aWMgYXZhaWxhYmxlSGVpZ2h0ID0gZnVuY3Rpb24gKGhlaWdodCwgY29udGFpbmVyLCBtYXJnaW4pIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KDAsIEFwcFV0aWxzLnNhbml0aXplSGVpZ2h0KGhlaWdodCwgY29udGFpbmVyKSAtIG1hcmdpbi50b3AgLSBtYXJnaW4uYm90dG9tKTtcbiAgICB9O1xuXG4gICAgc3RhdGljIGF2YWlsYWJsZVdpZHRoID0gZnVuY3Rpb24gKHdpZHRoLCBjb250YWluZXIsIG1hcmdpbikge1xuICAgICAgICByZXR1cm4gTWF0aC5tYXgoMCwgQXBwVXRpbHMuc2FuaXRpemVXaWR0aCh3aWR0aCwgY29udGFpbmVyKSAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0KTtcbiAgICB9O1xuXG4gICAgLy9wbGFjZXMgdGV4dFN0cmluZyBpbiB0ZXh0T2JqLCBhZGRzIGFuIGVsbGlwc2lzIGlmIHRleHQgY2FuJ3QgZml0IGluIHdpZHRoXG4gICAgc3RhdGljIHBsYWNlVGV4dFdpdGhFbGxpcHNpcyh0ZXh0RDNPYmosIHRleHRTdHJpbmcsIHdpZHRoKSB7XG4gICAgICAgIHZhciB0ZXh0T2JqID0gdGV4dEQzT2JqLm5vZGUoKTtcbiAgICAgICAgdGV4dE9iai50ZXh0Q29udGVudCA9IHRleHRTdHJpbmc7XG5cbiAgICAgICAgdmFyIG1hcmdpbiA9IDA7XG4gICAgICAgIHZhciBlbGxpcHNpc0xlbmd0aCA9IDk7XG4gICAgICAgIC8vZWxsaXBzaXMgaXMgbmVlZGVkXG4gICAgICAgIGlmICh0ZXh0T2JqLmdldENvbXB1dGVkVGV4dExlbmd0aCgpID4gd2lkdGggKyBtYXJnaW4pIHtcbiAgICAgICAgICAgIGZvciAodmFyIHggPSB0ZXh0U3RyaW5nLmxlbmd0aCAtIDM7IHggPiAwOyB4IC09IDEpIHtcbiAgICAgICAgICAgICAgICBpZiAodGV4dE9iai5nZXRTdWJTdHJpbmdMZW5ndGgoMCwgeCkgKyBlbGxpcHNpc0xlbmd0aCA8PSB3aWR0aCArIG1hcmdpbikge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0T2JqLnRleHRDb250ZW50ID0gdGV4dFN0cmluZy5zdWJzdHJpbmcoMCwgeCkgKyBcIi4uLlwiO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0ZXh0T2JqLnRleHRDb250ZW50ID0gXCIuLi5cIjsgLy9jYW4ndCBwbGFjZSBhdCBhbGxcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBzdGF0aWMgcGxhY2VUZXh0V2l0aEVsbGlwc2lzQW5kVG9vbHRpcCh0ZXh0RDNPYmosIHRleHRTdHJpbmcsIHdpZHRoLCB0b29sdGlwKSB7XG4gICAgICAgIHZhciBlbGxpcHNpc1BsYWNlZCA9IEFwcFV0aWxzLnBsYWNlVGV4dFdpdGhFbGxpcHNpcyh0ZXh0RDNPYmosIHRleHRTdHJpbmcsIHdpZHRoKTtcbiAgICAgICAgaWYgKGVsbGlwc2lzUGxhY2VkICYmIHRvb2x0aXApIHtcbiAgICAgICAgICAgIHRleHREM09iai5vbihcIm1vdXNlb3ZlclwiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHRvb2x0aXAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAgICAgICAgIC5kdXJhdGlvbigyMDApXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgLjkpO1xuICAgICAgICAgICAgICAgIHRvb2x0aXAuaHRtbCh0ZXh0U3RyaW5nKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIChkMy5ldmVudC5wYWdlWCArIDUpICsgXCJweFwiKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0b3BcIiwgKGQzLmV2ZW50LnBhZ2VZIC0gMjgpICsgXCJweFwiKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0ZXh0RDNPYmoub24oXCJtb3VzZW91dFwiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHRvb2x0aXAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAgICAgICAgIC5kdXJhdGlvbig1MDApXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgMCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgc3RhdGljIGdldEZvbnRTaXplKGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQsIG51bGwpLmdldFByb3BlcnR5VmFsdWUoXCJmb250LXNpemVcIik7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldFRyYW5zbGF0aW9uKHRyYW5zZm9ybSkge1xuICAgICAgICAvLyBDcmVhdGUgYSBkdW1teSBnIGZvciBjYWxjdWxhdGlvbiBwdXJwb3NlcyBvbmx5LiBUaGlzIHdpbGwgbmV2ZXJcbiAgICAgICAgLy8gYmUgYXBwZW5kZWQgdG8gdGhlIERPTSBhbmQgd2lsbCBiZSBkaXNjYXJkZWQgb25jZSB0aGlzIGZ1bmN0aW9uXG4gICAgICAgIC8vIHJldHVybnMuXG4gICAgICAgIHZhciBnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJnXCIpO1xuXG4gICAgICAgIC8vIFNldCB0aGUgdHJhbnNmb3JtIGF0dHJpYnV0ZSB0byB0aGUgcHJvdmlkZWQgc3RyaW5nIHZhbHVlLlxuICAgICAgICBnLnNldEF0dHJpYnV0ZU5TKG51bGwsIFwidHJhbnNmb3JtXCIsIHRyYW5zZm9ybSk7XG5cbiAgICAgICAgLy8gY29uc29saWRhdGUgdGhlIFNWR1RyYW5zZm9ybUxpc3QgY29udGFpbmluZyBhbGwgdHJhbnNmb3JtYXRpb25zXG4gICAgICAgIC8vIHRvIGEgc2luZ2xlIFNWR1RyYW5zZm9ybSBvZiB0eXBlIFNWR19UUkFOU0ZPUk1fTUFUUklYIGFuZCBnZXRcbiAgICAgICAgLy8gaXRzIFNWR01hdHJpeC5cbiAgICAgICAgdmFyIG1hdHJpeCA9IGcudHJhbnNmb3JtLmJhc2VWYWwuY29uc29saWRhdGUoKS5tYXRyaXg7XG5cbiAgICAgICAgLy8gQXMgcGVyIGRlZmluaXRpb24gdmFsdWVzIGUgYW5kIGYgYXJlIHRoZSBvbmVzIGZvciB0aGUgdHJhbnNsYXRpb24uXG4gICAgICAgIHJldHVybiBbbWF0cml4LmUsIG1hdHJpeC5mXTtcbiAgICB9XG5cblxuICAgIHN0YXRpYyBjbG9zZXN0UG9pbnQocGF0aE5vZGUsIHBvaW50KSB7XG4gICAgICAgIHZhciBwYXRoTGVuZ3RoID0gcGF0aE5vZGUuZ2V0VG90YWxMZW5ndGgoKSxcbiAgICAgICAgICAgIHByZWNpc2lvbiA9IDgsXG4gICAgICAgICAgICBiZXN0LFxuICAgICAgICAgICAgYmVzdExlbmd0aCxcbiAgICAgICAgICAgIGJlc3REaXN0YW5jZSA9IEluZmluaXR5O1xuXG4gICAgICAgIC8vIGxpbmVhciBzY2FuIGZvciBjb2Fyc2UgYXBwcm94aW1hdGlvblxuICAgICAgICBmb3IgKHZhciBzY2FuLCBzY2FuTGVuZ3RoID0gMCwgc2NhbkRpc3RhbmNlOyBzY2FuTGVuZ3RoIDw9IHBhdGhMZW5ndGg7IHNjYW5MZW5ndGggKz0gcHJlY2lzaW9uKSB7XG4gICAgICAgICAgICBpZiAoKHNjYW5EaXN0YW5jZSA9IGRpc3RhbmNlMihzY2FuID0gcGF0aE5vZGUuZ2V0UG9pbnRBdExlbmd0aChzY2FuTGVuZ3RoKSkpIDwgYmVzdERpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgYmVzdCA9IHNjYW4sIGJlc3RMZW5ndGggPSBzY2FuTGVuZ3RoLCBiZXN0RGlzdGFuY2UgPSBzY2FuRGlzdGFuY2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBiaW5hcnkgc2VhcmNoIGZvciBwcmVjaXNlIGVzdGltYXRlXG4gICAgICAgIHByZWNpc2lvbiAvPSAyO1xuICAgICAgICB3aGlsZSAocHJlY2lzaW9uID4gMC41KSB7XG4gICAgICAgICAgICB2YXIgYmVmb3JlLFxuICAgICAgICAgICAgICAgIGFmdGVyLFxuICAgICAgICAgICAgICAgIGJlZm9yZUxlbmd0aCxcbiAgICAgICAgICAgICAgICBhZnRlckxlbmd0aCxcbiAgICAgICAgICAgICAgICBiZWZvcmVEaXN0YW5jZSxcbiAgICAgICAgICAgICAgICBhZnRlckRpc3RhbmNlO1xuICAgICAgICAgICAgaWYgKChiZWZvcmVMZW5ndGggPSBiZXN0TGVuZ3RoIC0gcHJlY2lzaW9uKSA+PSAwICYmIChiZWZvcmVEaXN0YW5jZSA9IGRpc3RhbmNlMihiZWZvcmUgPSBwYXRoTm9kZS5nZXRQb2ludEF0TGVuZ3RoKGJlZm9yZUxlbmd0aCkpKSA8IGJlc3REaXN0YW5jZSkge1xuICAgICAgICAgICAgICAgIGJlc3QgPSBiZWZvcmUsIGJlc3RMZW5ndGggPSBiZWZvcmVMZW5ndGgsIGJlc3REaXN0YW5jZSA9IGJlZm9yZURpc3RhbmNlO1xuICAgICAgICAgICAgfSBlbHNlIGlmICgoYWZ0ZXJMZW5ndGggPSBiZXN0TGVuZ3RoICsgcHJlY2lzaW9uKSA8PSBwYXRoTGVuZ3RoICYmIChhZnRlckRpc3RhbmNlID0gZGlzdGFuY2UyKGFmdGVyID0gcGF0aE5vZGUuZ2V0UG9pbnRBdExlbmd0aChhZnRlckxlbmd0aCkpKSA8IGJlc3REaXN0YW5jZSkge1xuICAgICAgICAgICAgICAgIGJlc3QgPSBhZnRlciwgYmVzdExlbmd0aCA9IGFmdGVyTGVuZ3RoLCBiZXN0RGlzdGFuY2UgPSBhZnRlckRpc3RhbmNlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwcmVjaXNpb24gLz0gMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGJlc3QgPSBbYmVzdC54LCBiZXN0LnldO1xuICAgICAgICBiZXN0LmRpc3RhbmNlID0gTWF0aC5zcXJ0KGJlc3REaXN0YW5jZSk7XG4gICAgICAgIHJldHVybiBiZXN0O1xuXG4gICAgICAgIGZ1bmN0aW9uIGRpc3RhbmNlMihwKSB7XG4gICAgICAgICAgICB2YXIgZHggPSBwLnggLSBwb2ludFswXSxcbiAgICAgICAgICAgICAgICBkeSA9IHAueSAtIHBvaW50WzFdO1xuICAgICAgICAgICAgcmV0dXJuIGR4ICogZHggKyBkeSAqIGR5O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGdyb3dsKG1lc3NhZ2UsIHR5cGU9J2luZm8nLCBwb3NpdGlvbj0ncmlnaHQnLCB0aW1lID0gMjAwMCl7XG4gICAgICAgIHZhciBodG1sID0gVGVtcGxhdGVzLmdldCgnZ3Jvd2wnLCB7bWVzc2FnZTptZXNzYWdlLCB0eXBlOnR5cGV9KVxuXG4gICAgICAgIHZhciBnID0gZDMuc2VsZWN0KCdib2R5Jykuc2VsZWN0T3JBcHBlbmQoJ2Rpdi5zZC1ncm93bC1saXN0LicrcG9zaXRpb24pLmFwcGVuZCgnZGl2JykuaHRtbChodG1sKTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgZy5yZW1vdmUoKTtcbiAgICAgICAgfSwgdGltZSlcbiAgICB9XG5cblxuICAgIHN0YXRpYyBjcmVhdGVFbGVtZW50KHRhZywgYXR0cmlicywgcGFyZW50KSB7XG4gICAgICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcblxuICAgICAgICBpZiAoYXR0cmlicykge1xuICAgICAgICAgICAgQXBwVXRpbHMuZGVlcEV4dGVuZChlbCwgYXR0cmlicyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhcmVudCkge1xuICAgICAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKGVsKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWw7XG4gICAgfTtcblxuICAgIHN0YXRpYyByZW1vdmVFbGVtZW50KGVsZW1lbnQpIHtcbiAgICAgICAgZWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xuICAgIH1cblxuICAgIHN0YXRpYyByZXBsYWNlVXJscyh0ZXh0KXtcbiAgICAgICAgaWYoIXRleHQpe1xuICAgICAgICAgICAgcmV0dXJuIHRleHQ7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHVybFJlZ2V4cCA9IC8oKGZ0cHxodHRwfGh0dHBzKTpcXC9cXC8oXFx3Kzp7MCwxfVxcdypAKT8oXFxTKykoOlswLTldKyk/KFxcL3xcXC8oW1xcdyMhOi4/Kz0mJUAhXFwtXFwvXSkpPykvXG5cbiAgICAgICAgcmV0dXJuIHRleHQucmVwbGFjZSh1cmxSZWdleHAsICc8YSBocmVmPVwiJDFcIiB0YXJnZXQ9XCJfYmxhbmtcIj4kMTwvYT4nKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZXNjYXBlSHRtbChodG1sKVxuICAgIHtcbiAgICAgICAgdmFyIHRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShodG1sKTtcbiAgICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBkaXYuYXBwZW5kQ2hpbGQodGV4dCk7XG4gICAgICAgIHJldHVybiBkaXYuaW5uZXJIVE1MO1xuICAgIH1cblxuICAgIHN0YXRpYyBkaXNwYXRjaEh0bWxFdmVudChlbGVtZW50LCBuYW1lKXtcbiAgICAgICAgaWYgKFwiY3JlYXRlRXZlbnRcIiBpbiBkb2N1bWVudCkge1xuICAgICAgICAgICAgdmFyIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiSFRNTEV2ZW50c1wiKTtcbiAgICAgICAgICAgIGV2dC5pbml0RXZlbnQobmFtZSwgZmFsc2UsIHRydWUpO1xuICAgICAgICAgICAgZWxlbWVudC5kaXNwYXRjaEV2ZW50KGV2dCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgZWxlbWVudC5maXJlRXZlbnQoXCJvblwiK25hbWUpO1xuICAgIH1cblxuICAgIHN0YXRpYyBkaXNwYXRjaEV2ZW50KG5hbWUsIGRhdGEpe1xuICAgICAgICB2YXIgZXZlbnQ7XG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIGV2ZW50ID0gbmV3ICBDdXN0b21FdmVudChuYW1lLHsgJ2RldGFpbCc6IGRhdGEgfSk7XG4gICAgICAgIH1jYXRjaCAoZSl7IC8vSUVcbiAgICAgICAgICAgIGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG4gICAgICAgICAgICBldmVudC5pbml0Q3VzdG9tRXZlbnQobmFtZSwgZmFsc2UsIGZhbHNlLCBkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0VmFsaWRhdGlvbk1lc3NhZ2UoZXJyb3Ipe1xuICAgICAgICBpZihVdGlscy5pc1N0cmluZyhlcnJvcikpe1xuICAgICAgICAgICAgZXJyb3IgPSB7bmFtZTogZXJyb3J9O1xuICAgICAgICB9XG4gICAgICAgIHZhciBrZXkgPSAndmFsaWRhdGlvbi4nICsgZXJyb3IubmFtZTtcbiAgICAgICAgcmV0dXJuIGkxOG4udChrZXksIGVycm9yLmRhdGEpO1xuICAgIH1cblxuICAgIHN0YXRpYyBoaWRlKHNlbGVjdGlvbil7XG4gICAgICAgIHNlbGVjdGlvbi5jbGFzc2VkKCdzZC1oaWRkZW4nLCB0cnVlKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2hvdyhzZWxlY3Rpb24sIHNob3c9dHJ1ZSl7XG4gICAgICAgIHNlbGVjdGlvbi5jbGFzc2VkKCdzZC1oaWRkZW4nLCAhc2hvdyk7XG4gICAgfVxuXG5cblxuICAgIHN0YXRpYyBpc0hpZGRlbihlbCwgZXhhY3QgPSB0cnVlKSB7XG4gICAgICAgIGlmKCFlbCl7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZihleGFjdCl7XG4gICAgICAgICAgICB2YXIgc3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbCk7XG4gICAgICAgICAgICByZXR1cm4gKHN0eWxlLmRpc3BsYXkgPT09ICdub25lJylcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKGVsLm9mZnNldFBhcmVudCA9PT0gbnVsbClcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0SlNPTih1cmwsIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgeGhyLm9wZW4oJ2dldCcsIHVybCwgdHJ1ZSk7XG4gICAgICAgIHhoci5yZXNwb25zZVR5cGUgPSAnanNvbic7XG4gICAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgc3RhdHVzID0geGhyLnN0YXR1cztcbiAgICAgICAgICAgIGlmIChzdGF0dXMgPT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soeGhyLnJlc3BvbnNlLCBudWxsKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgc3RhdHVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgeGhyLnNlbmQoKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgKiBhcyBkMyBmcm9tICcuLi9kMydcblxuLypiYXNlZCBvbjpcbiAqIGdpdGh1Yi5jb20vcGF0b3Jqay9kMy1jb250ZXh0LW1lbnUgKi9cblxuZXhwb3J0IGNsYXNzIENvbnRleHRNZW51IHtcbiAgICBvcGVuQ2FsbGJhY2s7XG4gICAgY2xvc2VDYWxsYmFjaztcblxuICAgIGNvbnN0cnVjdG9yKG1lbnUsIG9wdHMpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0cyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgc2VsZi5vcGVuQ2FsbGJhY2sgPSBvcHRzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb3B0cyA9IG9wdHMgfHwge307XG4gICAgICAgICAgICBzZWxmLm9wZW5DYWxsYmFjayA9IG9wdHMub25PcGVuO1xuICAgICAgICAgICAgc2VsZi5jbG9zZUNhbGxiYWNrID0gb3B0cy5vbkNsb3NlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY3JlYXRlIHRoZSBkaXYgZWxlbWVudCB0aGF0IHdpbGwgaG9sZCB0aGUgY29udGV4dCBtZW51XG4gICAgICAgIGQzLnNlbGVjdEFsbCgnLmQzLWNvbnRleHQtbWVudScpLmRhdGEoWzFdKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZDMtY29udGV4dC1tZW51Jyk7XG5cbiAgICAgICAgLy8gY2xvc2UgbWVudVxuICAgICAgICBkMy5zZWxlY3QoJ2JvZHknKS5vbignY2xpY2suZDMtY29udGV4dC1tZW51JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZDMuc2VsZWN0KCcuZDMtY29udGV4dC1tZW51Jykuc3R5bGUoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgaWYgKHNlbGYuY2xvc2VDYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIHNlbGYuY2xvc2VDYWxsYmFjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyB0aGlzIGdldHMgZXhlY3V0ZWQgd2hlbiBhIGNvbnRleHRtZW51IGV2ZW50IG9jY3Vyc1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGRhdGEsIGluZGV4KSB7XG4gICAgICAgICAgICB2YXIgZWxtID0gdGhpcztcblxuICAgICAgICAgICAgZDMuc2VsZWN0QWxsKCcuZDMtY29udGV4dC1tZW51JykuaHRtbCgnJyk7XG4gICAgICAgICAgICB2YXIgbGlzdCA9IGQzLnNlbGVjdEFsbCgnLmQzLWNvbnRleHQtbWVudScpXG4gICAgICAgICAgICAgICAgLm9uKCdjb250ZXh0bWVudScsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIGQzLnNlbGVjdCgnLmQzLWNvbnRleHQtbWVudScpLnN0eWxlKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgICAgICAgICAgZDMuZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgZDMuZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuYXBwZW5kKCd1bCcpO1xuICAgICAgICAgICAgbGlzdC5zZWxlY3RBbGwoJ2xpJykuZGF0YSh0eXBlb2YgbWVudSA9PT0gJ2Z1bmN0aW9uJyA/IG1lbnUoZGF0YSkgOiBtZW51KS5lbnRlcigpXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgnbGknKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXQgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgaWYgKGQuZGl2aWRlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0ICs9ICcgaXMtZGl2aWRlcic7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGQuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldCArPSAnIGlzLWRpc2FibGVkJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIWQuYWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXQgKz0gJyBpcy1oZWFkZXInO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuaHRtbChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZC5kaXZpZGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzxocj4nO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICghZC50aXRsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignTm8gdGl0bGUgYXR0cmlidXRlIHNldC4gQ2hlY2sgdGhlIHNwZWxsaW5nIG9mIHlvdXIgb3B0aW9ucy4nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHR5cGVvZiBkLnRpdGxlID09PSAnc3RyaW5nJykgPyBkLnRpdGxlIDogZC50aXRsZShkYXRhKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZC5kaXNhYmxlZCkgcmV0dXJuOyAvLyBkbyBub3RoaW5nIGlmIGRpc2FibGVkXG4gICAgICAgICAgICAgICAgICAgIGlmICghZC5hY3Rpb24pIHJldHVybjsgLy8gaGVhZGVycyBoYXZlIG5vIFwiYWN0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgZC5hY3Rpb24oZWxtLCBkYXRhLCBpbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIGQzLnNlbGVjdCgnLmQzLWNvbnRleHQtbWVudScpLnN0eWxlKCdkaXNwbGF5JywgJ25vbmUnKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5jbG9zZUNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNsb3NlQ2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyB0aGUgb3BlbkNhbGxiYWNrIGFsbG93cyBhbiBhY3Rpb24gdG8gZmlyZSBiZWZvcmUgdGhlIG1lbnUgaXMgZGlzcGxheWVkXG4gICAgICAgICAgICAvLyBhbiBleGFtcGxlIHVzYWdlIHdvdWxkIGJlIGNsb3NpbmcgYSB0b29sdGlwXG4gICAgICAgICAgICBpZiAoc2VsZi5vcGVuQ2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5vcGVuQ2FsbGJhY2soZGF0YSwgaW5kZXgpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBkaXNwbGF5IGNvbnRleHQgbWVudVxuICAgICAgICAgICAgZDMuc2VsZWN0KCcuZDMtY29udGV4dC1tZW51JylcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2xlZnQnLCAoZDMuZXZlbnQucGFnZVggLSAyKSArICdweCcpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCd0b3AnLCAoZDMuZXZlbnQucGFnZVkgLSAyKSArICdweCcpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG5cbiAgICAgICAgICAgIGQzLmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBkMy5ldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgc3RhdGljIGhpZGUoKSB7XG4gICAgICAgIGQzLnNlbGVjdCgnLmQzLWNvbnRleHQtbWVudScpLnN0eWxlKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7Q29udGV4dE1lbnV9IGZyb20gJy4vY29udGV4dC1tZW51J1xuaW1wb3J0IHtpMThufSBmcm9tIFwiLi4vaTE4bi9pMThuXCI7XG5cbmV4cG9ydCBjbGFzcyBFZGdlQ29udGV4dE1lbnUgZXh0ZW5kcyBDb250ZXh0TWVudSB7XG4gICAgdHJlZURlc2lnbmVyO1xuXG4gICAgY29uc3RydWN0b3IodHJlZURlc2lnbmVyKSB7XG4gICAgICAgIHZhciBtZW51ID0gZnVuY3Rpb24gKGQpIHtcblxuICAgICAgICAgICAgdmFyIG1lbnUgPSBbXTtcblxuICAgICAgICAgICAgbWVudS5wdXNoKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5lZGdlLmluamVjdERlY2lzaW9uTm9kZScpLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuaW5qZWN0RGVjaXNpb25Ob2RlKGQpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBtZW51LnB1c2goe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51LmVkZ2UuaW5qZWN0Q2hhbmNlTm9kZScpLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuaW5qZWN0Q2hhbmNlTm9kZShkKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgIHJldHVybiBtZW51O1xuICAgICAgICB9O1xuXG4gICAgICAgIHN1cGVyKG1lbnUpO1xuICAgICAgICB0aGlzLnRyZWVEZXNpZ25lciA9IHRyZWVEZXNpZ25lcjtcbiAgICB9XG59XG4iLCJpbXBvcnQge0NvbnRleHRNZW51fSBmcm9tICcuL2NvbnRleHQtbWVudSdcbmltcG9ydCB7ZG9tYWluIGFzIG1vZGVsfSBmcm9tICdzZC1tb2RlbCdcbmltcG9ydCAqIGFzIGQzIGZyb20gJy4uL2QzJ1xuaW1wb3J0IHtpMThufSBmcm9tIFwiLi4vaTE4bi9pMThuXCI7XG5cbmV4cG9ydCBjbGFzcyBNYWluQ29udGV4dE1lbnUgZXh0ZW5kcyBDb250ZXh0TWVudSB7XG4gICAgdHJlZURlc2lnbmVyO1xuXG4gICAgY29uc3RydWN0b3IodHJlZURlc2lnbmVyKSB7XG4gICAgICAgIHZhciBtb3VzZVBvc2l0aW9uID0gbnVsbDtcbiAgICAgICAgdmFyIG1lbnUgPSBmdW5jdGlvbiAoZCkge1xuXG4gICAgICAgICAgICB2YXIgbWVudSA9IFtdO1xuICAgICAgICAgICAgbWVudS5wdXNoKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5tYWluLmFkZERlY2lzaW9uTm9kZScpLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3Tm9kZSA9IG5ldyBtb2RlbC5EZWNpc2lvbk5vZGUobW91c2VQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5hZGROb2RlKG5ld05vZGUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBtZW51LnB1c2goe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm1haW4uYWRkQ2hhbmNlTm9kZScpLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3Tm9kZSA9IG5ldyBtb2RlbC5DaGFuY2VOb2RlKG1vdXNlUG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuYWRkTm9kZShuZXdOb2RlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbWVudS5wdXNoKHtkaXZpZGVyOiB0cnVlfSk7XG4gICAgICAgICAgICBtZW51LnB1c2goe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm1haW4uYWRkVGV4dCcpLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3VGV4dCA9IG5ldyBtb2RlbC5UZXh0KG1vdXNlUG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuYWRkVGV4dChuZXdUZXh0KTtcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG1lbnUucHVzaCh7ZGl2aWRlcjogdHJ1ZX0pO1xuICAgICAgICAgICAgbWVudS5wdXNoKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5tYWluLnBhc3RlJyksXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5wYXN0ZVRvTmV3TG9jYXRpb24obW91c2VQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogIXRyZWVEZXNpZ25lci5jb3BpZWROb2RlcyB8fCAhdHJlZURlc2lnbmVyLmNvcGllZE5vZGVzLmxlbmd0aFxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG1lbnUucHVzaCh7ZGl2aWRlcjogdHJ1ZX0pO1xuXG4gICAgICAgICAgICBtZW51LnB1c2goe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm1haW4uc2VsZWN0QWxsTm9kZXMnKSxcbiAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLnNlbGVjdEFsbE5vZGVzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gbWVudTtcbiAgICAgICAgfTtcblxuICAgICAgICBzdXBlcihtZW51LCB7b25PcGVuOiAoKSA9PiB7XG4gICAgICAgICAgICB0cmVlRGVzaWduZXIuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgIG1vdXNlUG9zaXRpb24gPSBuZXcgbW9kZWwuUG9pbnQoZDMubW91c2UodHJlZURlc2lnbmVyLnN2Zy5ub2RlKCkpKS5tb3ZlKHRyZWVEZXNpZ25lci5nZXRNYWluR3JvdXBUcmFuc2xhdGlvbih0cnVlKSk7XG5cbiAgICAgICAgfX0pO1xuICAgICAgICB0aGlzLnRyZWVEZXNpZ25lciA9IHRyZWVEZXNpZ25lcjtcbiAgICB9XG59XG4iLCJpbXBvcnQge0NvbnRleHRNZW51fSBmcm9tICcuL2NvbnRleHQtbWVudSdcbmltcG9ydCB7ZG9tYWluIGFzIG1vZGVsfSBmcm9tICdzZC1tb2RlbCdcbmltcG9ydCB7aTE4bn0gZnJvbSBcIi4uL2kxOG4vaTE4blwiO1xuXG5leHBvcnQgY2xhc3MgTm9kZUNvbnRleHRNZW51IGV4dGVuZHMgQ29udGV4dE1lbnUge1xuICAgIHRyZWVEZXNpZ25lcjtcblxuICAgIGNvbnN0cnVjdG9yKHRyZWVEZXNpZ25lciwgb3BlcmF0aW9uc0Zvck9iamVjdCkge1xuICAgICAgICB2YXIgbWVudSA9IGZ1bmN0aW9uIChkKSB7XG5cbiAgICAgICAgICAgIHZhciBjb3B5TWVudUl0ZW0gPSB7XG4gICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubm9kZS5jb3B5JyksXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5zZWxlY3ROb2RlKGQsICF0cmVlRGVzaWduZXIuaXNOb2RlU2VsZWN0ZWQoZCkpO1xuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuY29weVNlbGVjdGVkTm9kZXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIGN1dE1lbnVJdGVtID0ge1xuICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm5vZGUuY3V0JyksXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5zZWxlY3ROb2RlKGQsICF0cmVlRGVzaWduZXIuaXNOb2RlU2VsZWN0ZWQoZCkpO1xuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuY3V0U2VsZWN0ZWROb2RlcygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB2YXIgcGFzdGVNZW51SXRlbSA9IHtcbiAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5ub2RlLnBhc3RlJyksXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5wYXN0ZVRvTm9kZShkKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiBkLmZvbGRlZCB8fCAhdHJlZURlc2lnbmVyLmNvcGllZE5vZGVzIHx8ICF0cmVlRGVzaWduZXIuY29waWVkTm9kZXMubGVuZ3RoXG5cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB2YXIgZGVsZXRlTWVudUl0ZW0gPSB7XG4gICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubm9kZS5kZWxldGUnKSxcbiAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcblxuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuc2VsZWN0Tm9kZShkLCAhdHJlZURlc2lnbmVyLmlzTm9kZVNlbGVjdGVkKGQpKTtcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLnJlbW92ZVNlbGVjdGVkTm9kZXMoKTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHZhciBtZW51ID0gW107XG4gICAgICAgICAgICBpZiAoZC50eXBlID09IG1vZGVsLlRlcm1pbmFsTm9kZS4kVFlQRSkge1xuICAgICAgICAgICAgICAgIG1lbnUgPSBbY29weU1lbnVJdGVtLCBjdXRNZW51SXRlbSwgZGVsZXRlTWVudUl0ZW1dO1xuICAgICAgICAgICAgICAgIE5vZGVDb250ZXh0TWVudS5hZGROb2RlQ29udmVyc2lvbk9wdGlvbnMoZCwgbWVudSwgdHJlZURlc2lnbmVyKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWVudTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoIWQuZm9sZGVkKXtcbiAgICAgICAgICAgICAgICBtZW51LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5ub2RlLmFkZERlY2lzaW9uTm9kZScpLFxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5hZGREZWNpc2lvbk5vZGUoZClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIG1lbnUucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm5vZGUuYWRkQ2hhbmNlTm9kZScpLFxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5hZGRDaGFuY2VOb2RlKGQpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBtZW51LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5ub2RlLmFkZFRlcm1pbmFsTm9kZScpLFxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5hZGRUZXJtaW5hbE5vZGUoZClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIG1lbnUucHVzaCh7ZGl2aWRlcjogdHJ1ZX0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBtZW51LnB1c2goY29weU1lbnVJdGVtKTtcbiAgICAgICAgICAgIG1lbnUucHVzaChjdXRNZW51SXRlbSk7XG4gICAgICAgICAgICBtZW51LnB1c2gocGFzdGVNZW51SXRlbSk7XG4gICAgICAgICAgICBtZW51LnB1c2goZGVsZXRlTWVudUl0ZW0pO1xuXG4gICAgICAgICAgICBOb2RlQ29udGV4dE1lbnUuYWRkTm9kZUNvbnZlcnNpb25PcHRpb25zKGQsIG1lbnUsIHRyZWVEZXNpZ25lcik7XG4gICAgICAgICAgICBtZW51LnB1c2goe2RpdmlkZXI6IHRydWV9KTtcbiAgICAgICAgICAgIG1lbnUucHVzaCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubm9kZS5zZWxlY3RTdWJ0cmVlJyksXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5zZWxlY3RTdWJUcmVlKGQsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZighZC5mb2xkZWQpe1xuICAgICAgICAgICAgICAgIG1lbnUucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm5vZGUuZm9sZCcpLFxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5mb2xkU3VidHJlZShkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgbWVudS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubm9kZS51bmZvbGQnKSxcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuZm9sZFN1YnRyZWUoZCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKG9wZXJhdGlvbnNGb3JPYmplY3Qpe1xuICAgICAgICAgICAgICAgIHZhciBvcGVyYXRpb25zID0gb3BlcmF0aW9uc0Zvck9iamVjdChkKTtcbiAgICAgICAgICAgICAgICBpZihvcGVyYXRpb25zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBtZW51LnB1c2goe2RpdmlkZXI6IHRydWV9KTtcbiAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9ucy5mb3JFYWNoKG9wPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBtZW51LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm5vZGUuJytvcC5uYW1lKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLnBlcmZvcm1PcGVyYXRpb24oZCwgb3ApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICFvcC5jYW5QZXJmb3JtKGQpXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBtZW51O1xuICAgICAgICB9O1xuXG4gICAgICAgIHN1cGVyKG1lbnUpO1xuICAgICAgICB0aGlzLnRyZWVEZXNpZ25lciA9IHRyZWVEZXNpZ25lcjtcbiAgICB9XG5cbiAgICBzdGF0aWMgYWRkTm9kZUNvbnZlcnNpb25PcHRpb25zKGQsIG1lbnUsIHRyZWVEZXNpZ25lcil7XG4gICAgICAgIHZhciBjb252ZXJzaW9uT3B0aW9ucyA9IE5vZGVDb250ZXh0TWVudS5nZXROb2RlQ29udmVyc2lvbk9wdGlvbnMoZCwgdHJlZURlc2lnbmVyKTtcbiAgICAgICAgaWYoY29udmVyc2lvbk9wdGlvbnMubGVuZ3RoKXtcbiAgICAgICAgICAgIG1lbnUucHVzaCh7ZGl2aWRlcjogdHJ1ZX0pO1xuICAgICAgICAgICAgY29udmVyc2lvbk9wdGlvbnMuZm9yRWFjaChvPT5tZW51LnB1c2gobykpO1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0Tm9kZUNvbnZlcnNpb25PcHRpb25zKGQsIHRyZWVEZXNpZ25lcil7XG4gICAgICAgIHZhciBvcHRpb25zID0gW107XG5cbiAgICAgICAgaWYoZC5mb2xkZWQpe1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGFsbEFsbG93ZWRUeXBlcyA9IFttb2RlbC5EZWNpc2lvbk5vZGUuJFRZUEUsIG1vZGVsLkNoYW5jZU5vZGUuJFRZUEUsIG1vZGVsLlRlcm1pbmFsTm9kZS4kVFlQRV07XG5cbiAgICAgICAgaWYoIWQuY2hpbGRFZGdlcy5sZW5ndGggJiYgZC4kcGFyZW50KXtcbiAgICAgICAgICAgIGFsbEFsbG93ZWRUeXBlcy5maWx0ZXIodD0+dCE9PWQudHlwZSkuZm9yRWFjaCh0eXBlPT57XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5wdXNoKE5vZGVDb250ZXh0TWVudS5nZXROb2RlQ29udmVyc2lvbk9wdGlvbih0eXBlLCB0cmVlRGVzaWduZXIpKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBpZihkIGluc3RhbmNlb2YgbW9kZWwuRGVjaXNpb25Ob2RlKXtcbiAgICAgICAgICAgICAgICBvcHRpb25zLnB1c2goTm9kZUNvbnRleHRNZW51LmdldE5vZGVDb252ZXJzaW9uT3B0aW9uKG1vZGVsLkNoYW5jZU5vZGUuJFRZUEUsIHRyZWVEZXNpZ25lcikpXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBvcHRpb25zLnB1c2goTm9kZUNvbnRleHRNZW51LmdldE5vZGVDb252ZXJzaW9uT3B0aW9uKG1vZGVsLkRlY2lzaW9uTm9kZS4kVFlQRSwgdHJlZURlc2lnbmVyKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3B0aW9ucztcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0Tm9kZUNvbnZlcnNpb25PcHRpb24odHlwZVRvQ29udmVydFRvLCB0cmVlRGVzaWduZXIpe1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubm9kZS5jb252ZXJ0LicrdHlwZVRvQ29udmVydFRvKSxcbiAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5jb252ZXJ0Tm9kZShkLCB0eXBlVG9Db252ZXJ0VG8pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7Q29udGV4dE1lbnV9IGZyb20gJy4vY29udGV4dC1tZW51J1xuaW1wb3J0IHtpMThufSBmcm9tIFwiLi4vaTE4bi9pMThuXCI7XG5cbmV4cG9ydCBjbGFzcyBUZXh0Q29udGV4dE1lbnUgZXh0ZW5kcyBDb250ZXh0TWVudSB7XG4gICAgdHJlZURlc2lnbmVyO1xuXG4gICAgY29uc3RydWN0b3IodHJlZURlc2lnbmVyKSB7XG4gICAgICAgIHZhciBtZW51ID0gZnVuY3Rpb24gKGQpIHtcblxuXG4gICAgICAgICAgICB2YXIgZGVsZXRlTWVudUl0ZW0gPSB7XG4gICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUudGV4dC5kZWxldGUnKSxcbiAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcblxuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuc2VsZWN0VGV4dChkLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLnJlbW92ZVNlbGVjdGVkVGV4dHMoKVxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZhciBtZW51ID0gW107XG4gICAgICAgICAgICBtZW51LnB1c2goZGVsZXRlTWVudUl0ZW0pO1xuICAgICAgICAgICAgcmV0dXJuIG1lbnU7XG4gICAgICAgIH07XG5cbiAgICAgICAgc3VwZXIobWVudSk7XG4gICAgICAgIHRoaXMudHJlZURlc2lnbmVyID0gdHJlZURlc2lnbmVyO1xuICAgIH1cbn1cbiIsImltcG9ydCAqIGFzIGQzIGZyb20gJy4vZDMnXG5cbmV4cG9ydCBjbGFzcyBEM0V4dGVuc2lvbnMge1xuXG4gICAgc3RhdGljIGV4dGVuZCgpIHtcblxuICAgICAgICBkMy5zZWxlY3Rpb24ucHJvdG90eXBlLmVudGVyLnByb3RvdHlwZS5pbnNlcnRTZWxlY3RvciA9XG4gICAgICAgICAgICBkMy5zZWxlY3Rpb24ucHJvdG90eXBlLmluc2VydFNlbGVjdG9yID0gZnVuY3Rpb24gKHNlbGVjdG9yLCBiZWZvcmUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gRDNFeHRlbnNpb25zLmluc2VydFNlbGVjdG9yKHRoaXMsIHNlbGVjdG9yLCBiZWZvcmUpO1xuICAgICAgICAgICAgfTtcblxuXG4gICAgICAgIGQzLnNlbGVjdGlvbi5wcm90b3R5cGUuZW50ZXIucHJvdG90eXBlLmFwcGVuZFNlbGVjdG9yID1cbiAgICAgICAgICAgIGQzLnNlbGVjdGlvbi5wcm90b3R5cGUuYXBwZW5kU2VsZWN0b3IgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gRDNFeHRlbnNpb25zLmFwcGVuZFNlbGVjdG9yKHRoaXMsIHNlbGVjdG9yKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgZDMuc2VsZWN0aW9uLnByb3RvdHlwZS5lbnRlci5wcm90b3R5cGUuc2VsZWN0T3JBcHBlbmQgPVxuICAgICAgICAgICAgZDMuc2VsZWN0aW9uLnByb3RvdHlwZS5zZWxlY3RPckFwcGVuZCA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBEM0V4dGVuc2lvbnMuc2VsZWN0T3JBcHBlbmQodGhpcywgc2VsZWN0b3IpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICBkMy5zZWxlY3Rpb24ucHJvdG90eXBlLmVudGVyLnByb3RvdHlwZS5zZWxlY3RPckluc2VydCA9XG4gICAgICAgICAgICBkMy5zZWxlY3Rpb24ucHJvdG90eXBlLnNlbGVjdE9ySW5zZXJ0ID0gZnVuY3Rpb24gKHNlbGVjdG9yLCBiZWZvcmUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gRDNFeHRlbnNpb25zLnNlbGVjdE9ySW5zZXJ0KHRoaXMsIHNlbGVjdG9yLCBiZWZvcmUpO1xuICAgICAgICAgICAgfTtcblxuXG4gICAgfVxuXG4gICAgc3RhdGljIGluc2VydE9yQXBwZW5kU2VsZWN0b3IocGFyZW50LCBzZWxlY3Rvciwgb3BlcmF0aW9uLCBiZWZvcmUpIHtcblxuICAgICAgICB2YXIgc2VsZWN0b3JQYXJ0cyA9IHNlbGVjdG9yLnNwbGl0KC8oW1xcLlxcI10pLyk7XG4gICAgICAgIHZhciBlbGVtZW50ID0gcGFyZW50W29wZXJhdGlvbl0oc2VsZWN0b3JQYXJ0cy5zaGlmdCgpLCBiZWZvcmUpOy8vXCI6Zmlyc3QtY2hpbGRcIlxuXG4gICAgICAgIHdoaWxlIChzZWxlY3RvclBhcnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIHZhciBzZWxlY3Rvck1vZGlmaWVyID0gc2VsZWN0b3JQYXJ0cy5zaGlmdCgpO1xuICAgICAgICAgICAgdmFyIHNlbGVjdG9ySXRlbSA9IHNlbGVjdG9yUGFydHMuc2hpZnQoKTtcbiAgICAgICAgICAgIGlmIChzZWxlY3Rvck1vZGlmaWVyID09PSBcIi5cIikge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBlbGVtZW50LmNsYXNzZWQoc2VsZWN0b3JJdGVtLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2VsZWN0b3JNb2RpZmllciA9PT0gXCIjXCIpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5hdHRyKCdpZCcsIHNlbGVjdG9ySXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfVxuXG4gICAgc3RhdGljIGluc2VydFNlbGVjdG9yKHBhcmVudCwgc2VsZWN0b3IsIGJlZm9yZSkge1xuICAgICAgICByZXR1cm4gRDNFeHRlbnNpb25zLmluc2VydE9yQXBwZW5kU2VsZWN0b3IocGFyZW50LCBzZWxlY3RvciwgXCJpbnNlcnRcIiwgYmVmb3JlKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgYXBwZW5kU2VsZWN0b3IocGFyZW50LCBzZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gRDNFeHRlbnNpb25zLmluc2VydE9yQXBwZW5kU2VsZWN0b3IocGFyZW50LCBzZWxlY3RvciwgXCJhcHBlbmRcIik7XG4gICAgfVxuXG4gICAgc3RhdGljIHNlbGVjdE9yQXBwZW5kKHBhcmVudCwgc2VsZWN0b3IsIGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIHNlbGVjdGlvbiA9IHBhcmVudC5zZWxlY3Qoc2VsZWN0b3IpO1xuICAgICAgICBpZiAoc2VsZWN0aW9uLmVtcHR5KCkpIHtcbiAgICAgICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcmVudC5hcHBlbmQoZWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gRDNFeHRlbnNpb25zLmFwcGVuZFNlbGVjdG9yKHBhcmVudCwgc2VsZWN0b3IpO1xuXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNlbGVjdGlvbjtcbiAgICB9O1xuXG4gICAgc3RhdGljIHNlbGVjdE9ySW5zZXJ0KHBhcmVudCwgc2VsZWN0b3IsIGJlZm9yZSkge1xuICAgICAgICB2YXIgc2VsZWN0aW9uID0gcGFyZW50LnNlbGVjdChzZWxlY3Rvcik7XG4gICAgICAgIGlmIChzZWxlY3Rpb24uZW1wdHkoKSkge1xuICAgICAgICAgICAgcmV0dXJuIEQzRXh0ZW5zaW9ucy5pbnNlcnRTZWxlY3RvcihwYXJlbnQsIHNlbGVjdG9yLCBiZWZvcmUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzZWxlY3Rpb247XG4gICAgfTtcbn1cbiIsImV4cG9ydCAqIGZyb20gJ2QzLWRpc3BhdGNoJztcbmV4cG9ydCAqIGZyb20gJ2QzLXNjYWxlJztcbmV4cG9ydCAqIGZyb20gJ2QzLXNlbGVjdGlvbic7XG5leHBvcnQgKiBmcm9tICdkMy1zaGFwZSdcbmV4cG9ydCAqIGZyb20gJ2QzLWRyYWcnO1xuZXhwb3J0ICogZnJvbSAnZDMtYnJ1c2gnXG5leHBvcnQgKiBmcm9tICdkMy1hcnJheSdcbmV4cG9ydCAqIGZyb20gJ2QzLWhpZXJhcmNoeSdcbmV4cG9ydCAqIGZyb20gJ2QzLXRpbWUtZm9ybWF0J1xuIiwibW9kdWxlLmV4cG9ydHM9e1xuICAgIFwiY29udGV4dE1lbnVcIjp7XG4gICAgICAgIFwibWFpblwiOntcbiAgICAgICAgICAgIFwiYWRkRGVjaXNpb25Ob2RlXCI6IFwiRW50c2NoZWlkdW5nc2tub3RlbiBoaW56dWbDvGdlblwiLFxuICAgICAgICAgICAgXCJhZGRDaGFuY2VOb2RlXCI6IFwiWnVmYWxsIEtub3RlbiBoaW56dWbDvGdlblwiLFxuICAgICAgICAgICAgXCJhZGRUZXh0XCI6IFwiVGV4dCBoaW56dWbDvGdlbiBcIixcbiAgICAgICAgICAgIFwicGFzdGVcIjogXCJFaW5mw7xnZW5cIixcbiAgICAgICAgICAgIFwic2VsZWN0QWxsTm9kZXNcIjogXCJBbGxlIEtub3RlbiBhdXN3w6RobGVuXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJub2RlXCI6e1xuICAgICAgICAgICAgXCJjb3B5XCI6IFwiS29waWVyZW5cIixcbiAgICAgICAgICAgIFwiY3V0XCI6IFwiQXVzc2NobmVpZGVuXCIsXG4gICAgICAgICAgICBcInBhc3RlXCI6IFwiRWluZsO8Z2VuXCIsXG4gICAgICAgICAgICBcImRlbGV0ZVwiOiBcIkzDtnNjaGVuXCIsXG4gICAgICAgICAgICBcImFkZERlY2lzaW9uTm9kZVwiOiBcIkVudHNjaGVpZHVuZ3Nrbm90ZW4gaGluenVmw7xnZW5cIixcbiAgICAgICAgICAgIFwiYWRkQ2hhbmNlTm9kZVwiOiBcIlp1ZmFsbCBLbm90ZW4gaGluenVmw7xnZW5cIixcbiAgICAgICAgICAgIFwiYWRkVGVybWluYWxOb2RlXCI6IFwiRW5ka25vdHRlbiBoaW56dWbDvGdlblwiLFxuICAgICAgICAgICAgXCJjb252ZXJ0XCI6e1xuICAgICAgICAgICAgICAgIFwiZGVjaXNpb25cIjogXCJBbHMgRW50c2NoZWlkdW5nc2tub3RlblwiLFxuICAgICAgICAgICAgICAgIFwiY2hhbmNlXCI6IFwiQWxzIFp1ZmFsbCBLbm90ZW5cIixcbiAgICAgICAgICAgICAgICBcInRlcm1pbmFsXCI6IFwiQWxzIEVuZGtub3RlblwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJzZWxlY3RTdWJ0cmVlXCI6IFwiVGVpbGJhdW0gd8OkaGxlblwiLFxuICAgICAgICAgICAgXCJmb2xkXCI6IFwiVGVpbGJhdW0gZmFsdGVuXCIsXG4gICAgICAgICAgICBcInVuZm9sZFwiOiBcIlRlaWxiYXVtIGVudGZhbHRlblwiLFxuXHRcdFx0XG4gICAgICAgICAgICBcImZsaXBTdWJ0cmVlXCI6IFwiVGVpbGJhdW0gdW1kcmVoZW5cIlxuICAgICAgICB9LFxuICAgICAgICBcImVkZ2VcIjp7XG4gICAgICAgICAgICBcImluamVjdERlY2lzaW9uTm9kZVwiOiBcIkVudHNjaGVpZHVuZ3Nrbm90ZW4gSW5qaXppZXJlblwiLFxuICAgICAgICAgICAgXCJpbmplY3RDaGFuY2VOb2RlXCI6IFwiWnVmYWxsIEtub3RlbiBJbmppemllcmVuXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJ0ZXh0XCI6e1xuICAgICAgICAgICAgXCJkZWxldGVcIjogXCJMw7ZzY2hlblwiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwidmFsaWRhdGlvblwiOntcbiAgICAgICAgXCJpbmNvbXBsZXRlUGF0aFwiOiBcIlBmYWQsIGRlciBuaWNodCBtaXQgZGVtIEVuZGtub3RlbiBlbmRldFwiLFxuICAgICAgICBcInByb2JhYmlsaXR5RG9Ob3RTdW1VcFRvMVwiOiBcIkRpZSBTdW1tZSBkZXIgV2FocnNjaGVpbmxpY2hrZWl0ZW4gaXN0IG5pY2h0IGdsZWljaCAxXCIsXG4gICAgICAgIFwiaW52YWxpZFByb2JhYmlsaXR5XCI6IFwiVW5nw7xsdGlnZSBXYWhyc2NoZWlubGljaGtlaXQgaW0gWndlaWcgI3t7bnVtYmVyfX1cIixcbiAgICAgICAgXCJpbnZhbGlkUGF5b2ZmXCI6IFwiVW5nw7xsdGlnZSBBdXN6YWhsdW5nIGluIFp3ZWlnICN7e251bWJlcn19XCJcbiAgICB9LFxuICAgIFwiZ3Jvd2xcIjp7XG4gICAgICAgIFwiYnJ1c2hEaXNhYmxlZFwiOiBcIkF1c3dhaGxiw7xyc3RlIGRlYWt0aXZpZXJ0XCIsXG4gICAgICAgIFwiYnJ1c2hFbmFibGVkXCI6IFwiQXVzd2FobGLDvHJzdGUgYWt0aXZpZXJ0XCJcbiAgICB9LFxuICAgIFwidG9vbHRpcFwiOntcbiAgICAgICAgXCJub2RlXCI6e1xuICAgICAgICAgICAgXCJwYXlvZmZcIjoge1xuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIkF1c3phaGx1bmcge3tudW1iZXJ9fVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJ7e25hbWV9fVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJhZ2dyZWdhdGVkUGF5b2ZmXCI6IHtcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJBZ2dyZWdpZXJ0ZSBBdXN6YWhsdW5nIHt7bnVtYmVyfX1cIixcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwiQWdncmVnaWVydGUge3tuYW1lfX1cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwicHJvYmFiaWxpdHlUb0VudGVyXCI6IFwiV2FocnNjaGVpbmxpY2hrZWl0XCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJlZGdlXCI6e1xuICAgICAgICAgICAgXCJwYXlvZmZcIjoge1xuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIkF1c3phaGx1bmcge3tudW1iZXJ9fToge3t2YWx1ZX19XCIsXG4gICAgICAgICAgICAgICAgXCJuYW1lZFwiOiBcInt7bmFtZX19OiB7e3ZhbHVlfX1cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwicHJvYmFiaWxpdHlcIjogXCJXYWhyc2NoZWlubGljaGtlaXQ6IHt7dmFsdWV9fVwiXG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cz17XG4gICAgXCJjb250ZXh0TWVudVwiOntcbiAgICAgICAgXCJtYWluXCI6e1xuICAgICAgICAgICAgXCJhZGREZWNpc2lvbk5vZGVcIjogXCJBZGQgRGVjaXNpb24gTm9kZVwiLFxuICAgICAgICAgICAgXCJhZGRDaGFuY2VOb2RlXCI6IFwiQWRkIENoYW5jZSBOb2RlXCIsXG4gICAgICAgICAgICBcImFkZFRleHRcIjogXCJBZGQgVGV4dFwiLFxuICAgICAgICAgICAgXCJwYXN0ZVwiOiBcIlBhc3RlXCIsXG4gICAgICAgICAgICBcInNlbGVjdEFsbE5vZGVzXCI6IFwiU2VsZWN0IGFsbCBub2Rlc1wiXG4gICAgICAgIH0sXG4gICAgICAgIFwibm9kZVwiOntcbiAgICAgICAgICAgIFwiY29weVwiOiBcIkNvcHlcIixcbiAgICAgICAgICAgIFwiY3V0XCI6IFwiQ3V0XCIsXG4gICAgICAgICAgICBcInBhc3RlXCI6IFwiUGFzdGVcIixcbiAgICAgICAgICAgIFwiZGVsZXRlXCI6IFwiRGVsZXRlXCIsXG4gICAgICAgICAgICBcImFkZERlY2lzaW9uTm9kZVwiOiBcIkFkZCBEZWNpc2lvbiBOb2RlXCIsXG4gICAgICAgICAgICBcImFkZENoYW5jZU5vZGVcIjogXCJBZGQgQ2hhbmNlIE5vZGVcIixcbiAgICAgICAgICAgIFwiYWRkVGVybWluYWxOb2RlXCI6IFwiQWRkIFRlcm1pbmFsIE5vZGVcIixcbiAgICAgICAgICAgIFwiY29udmVydFwiOntcbiAgICAgICAgICAgICAgICBcImRlY2lzaW9uXCI6IFwiQXMgRGVjaXNpb24gTm9kZVwiLFxuICAgICAgICAgICAgICAgIFwiY2hhbmNlXCI6IFwiQXMgQ2hhbmNlIE5vZGVcIixcbiAgICAgICAgICAgICAgICBcInRlcm1pbmFsXCI6IFwiQXMgVGVybWluYWwgTm9kZVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJzZWxlY3RTdWJ0cmVlXCI6IFwiU2VsZWN0IHN1YnRyZWVcIixcbiAgICAgICAgICAgIFwiZm9sZFwiOiBcIkZvbGQgc3VidHJlZVwiLFxuICAgICAgICAgICAgXCJ1bmZvbGRcIjogXCJVbmZvbGQgc3VidHJlZVwiLFxuICAgICAgICAgICAgXCJmbGlwU3VidHJlZVwiOiBcIkZsaXAgc3VidHJlZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiZWRnZVwiOntcbiAgICAgICAgICAgIFwiaW5qZWN0RGVjaXNpb25Ob2RlXCI6IFwiSW5qZWN0IERlY2lzaW9uIE5vZGVcIixcbiAgICAgICAgICAgIFwiaW5qZWN0Q2hhbmNlTm9kZVwiOiBcIkluamVjdCBDaGFuY2UgTm9kZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwidGV4dFwiOntcbiAgICAgICAgICAgIFwiZGVsZXRlXCI6IFwiRGVsZXRlXCJcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXCJ2YWxpZGF0aW9uXCI6e1xuICAgICAgICBcImluY29tcGxldGVQYXRoXCI6IFwiUGF0aCBub3QgZW5kaW5nIHdpdGggdGVybWluYWwgbm9kZVwiLFxuICAgICAgICBcInByb2JhYmlsaXR5RG9Ob3RTdW1VcFRvMVwiOiBcIlByb2JhYmlsaXRpZXMgZG8gbm90IHN1bSB1cCB0byAxXCIsXG4gICAgICAgIFwiaW52YWxpZFByb2JhYmlsaXR5XCI6IFwiSW52YWxpZCBwcm9iYWJpbGl0eSBpbiBlZGdlICN7e251bWJlcn19XCIsXG4gICAgICAgIFwiaW52YWxpZFBheW9mZlwiOiBcIkludmFsaWQgcGF5b2ZmIGluIGVkZ2UgI3t7bnVtYmVyfX1cIlxuICAgIH0sXG4gICAgXCJncm93bFwiOntcbiAgICAgICAgXCJicnVzaERpc2FibGVkXCI6IFwiU2VsZWN0aW9uIGJydXNoIGRpc2FibGVkXCIsXG4gICAgICAgIFwiYnJ1c2hFbmFibGVkXCI6IFwiU2VsZWN0aW9uIGJydXNoIGVuYWJsZWRcIlxuICAgIH0sXG4gICAgXCJ0b29sdGlwXCI6e1xuICAgICAgICBcIm5vZGVcIjp7XG4gICAgICAgICAgICBcInBheW9mZlwiOiB7XG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiUGF5b2ZmIHt7bnVtYmVyfX1cIixcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwie3tuYW1lfX1cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiYWdncmVnYXRlZFBheW9mZlwiOiB7XG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiQWdncmVnYXRlZCBQYXlvZmYge3tudW1iZXJ9fVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJBZ2dyZWdhdGVkIHt7bmFtZX19XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInByb2JhYmlsaXR5VG9FbnRlclwiOiBcIlByb2JhYmlsaXR5IHRvIGVudGVyXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJlZGdlXCI6e1xuICAgICAgICAgICAgXCJwYXlvZmZcIjoge1xuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIlBheW9mZiB7e251bWJlcn19OiB7e3ZhbHVlfX1cIixcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwie3tuYW1lfX06IHt7dmFsdWV9fVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJwcm9iYWJpbGl0eVwiOiBcIlByb2JhYmlsaXR5OiB7e3ZhbHVlfX1cIlxuICAgICAgICB9XG4gICAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHM9e1xuICAgIFwiY29udGV4dE1lbnVcIjp7XG4gICAgICAgIFwibWFpblwiOntcbiAgICAgICAgICAgIFwiYWRkRGVjaXNpb25Ob2RlXCI6IFwiQWpvdXRlciBub3VkIGRlIGTDqWNpc2lvblwiLFxuICAgICAgICAgICAgXCJhZGRDaGFuY2VOb2RlXCI6IFwiQWpvdXRlciBub3VkIGFsw6lhdG9pcmVcIixcbiAgICAgICAgICAgIFwiYWRkVGV4dFwiOiBcIkFqb3V0ZXIgZHUgdGV4dGVcIixcbiAgICAgICAgICAgIFwicGFzdGVcIjogXCJDb2xsZXJcIixcbiAgICAgICAgICAgIFwic2VsZWN0QWxsTm9kZXNcIjogXCJTw6lsZWN0aW9ubmVyIHRvdXMgbGVzIG5vdWRzXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJub2RlXCI6e1xuICAgICAgICAgICAgXCJjb3B5XCI6IFwiQ29waWVcIixcbiAgICAgICAgICAgIFwiY3V0XCI6IFwiQ291cGVyXCIsXG4gICAgICAgICAgICBcInBhc3RlXCI6IFwiQ29sbGVyXCIsXG4gICAgICAgICAgICBcImRlbGV0ZVwiOiBcIkVmZmFjZXJcIixcbiAgICAgICAgICAgIFwiYWRkRGVjaXNpb25Ob2RlXCI6IFwiQWpvdXRlciBub3VkIGRlIGTDqWNpc2lvblwiLFxuICAgICAgICAgICAgXCJhZGRDaGFuY2VOb2RlXCI6IFwiQWpvdXRlciBub3VkIGFsw6lhdG9pcmVcIixcbiAgICAgICAgICAgIFwiYWRkVGVybWluYWxOb2RlXCI6IFwiQWpvdXRlciB1biBub2V1ZCB0ZXJtaW5hbFwiLFxuICAgICAgICAgICAgXCJjb252ZXJ0XCI6e1xuICAgICAgICAgICAgICAgIFwiZGVjaXNpb25cIjogXCJDb21tZSBub3VkIGRlIGTDqWNpc2lvblwiLFxuICAgICAgICAgICAgICAgIFwiY2hhbmNlXCI6IFwiQ29tbWUgbm91ZCBhbMOpYXRvaXJlXCIsXG4gICAgICAgICAgICAgICAgXCJ0ZXJtaW5hbFwiOiBcIkNvbW1lIHVuIG5vZXVkIHRlcm1pbmFsXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInNlbGVjdFN1YnRyZWVcIjogXCJTw6lsZWN0aW9ubmVyIHVuZSBzb3VzLWFyYm9yZXNjZW5jZVwiLFxuICAgICAgICAgICAgXCJmb2xkXCI6IFwiUGxpZXIgc291cy1hcmJyZVwiLFxuICAgICAgICAgICAgXCJ1bmZvbGRcIjogXCJEw6lwbGllciBhcmJyZSBzb3VzLWFyYnJlXCIsXG4gICAgICAgICAgICBcImZsaXBTdWJ0cmVlXCI6IFwiQmFzY3VsZXIgc291cy1hcmJyZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiZWRnZVwiOntcbiAgICAgICAgICAgIFwiaW5qZWN0RGVjaXNpb25Ob2RlXCI6IFwiSW5qZWN0ZXIgdW4gbm9ldWQgZGUgZMOpY2lzaW9uXCIsXG4gICAgICAgICAgICBcImluamVjdENoYW5jZU5vZGVcIjogXCJJbmplY3RlciB1biBub2V1ZCBkZSBjaGFuY2VcIlxuICAgICAgICB9LFxuICAgICAgICBcInRleHRcIjp7XG4gICAgICAgICAgICBcImRlbGV0ZVwiOiBcIkVmZmFjZXJcIlxuICAgICAgICB9XG4gICAgfSxcbiAgICBcInZhbGlkYXRpb25cIjp7XG4gICAgICAgIFwiaW5jb21wbGV0ZVBhdGhcIjogXCJQYXJjb3VycyBub24gdGVybWluw6kgcGFyIG5vZXVkIHRlcm1pbmFsXCIsXG4gICAgICAgIFwicHJvYmFiaWxpdHlEb05vdFN1bVVwVG8xXCI6IFwiTGEgc29tbWUgZGVzIHByb2JhYmlsaXTDqXMgbidlc3QgcGFzIDEgb3UgcGx1c1wiLFxuICAgICAgICBcImludmFsaWRQcm9iYWJpbGl0eVwiOiBcIlByb2JhYmlsaXTDqSBpbnZhbGlkZSAtIGxlIGJvcmQgI3t7bnVtYmVyfX1cIixcbiAgICAgICAgXCJpbnZhbGlkUGF5b2ZmXCI6IFwiQXZhbnRhZ2UgaW52YWxpZGUgLSBsZSBib3JkICN7e251bWJlcn19XCJcbiAgICB9LFxuICAgIFwiZ3Jvd2xcIjp7XG4gICAgICAgIFwiYnJ1c2hEaXNhYmxlZFwiOiBcIkJyb3NzZSBkZSBzw6lsZWN0aW9uIGTDqXNhY3RpdsOpZVwiLFxuICAgICAgICBcImJydXNoRW5hYmxlZFwiOiBcIkJyb3NzZSBkZSBzw6lsZWN0aW9uIGFjdGl2w6llXCJcbiAgICB9LFxuICAgIFwidG9vbHRpcFwiOntcbiAgICAgICAgXCJub2RlXCI6e1xuICAgICAgICAgICAgXCJwYXlvZmZcIjoge1xuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIkF2YW50YWdlIHt7bnVtYmVyfX1cIixcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwie3tuYW1lfX1cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiYWdncmVnYXRlZFBheW9mZlwiOiB7XG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiQXZhbnRhZ2UgYWdyw6lnw6kge3tudW1iZXJ9fVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJBZ3LDqWfDqSAge3tuYW1lfX1cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwicHJvYmFiaWxpdHlUb0VudGVyXCI6IFwiUHJvYmFiaWxpdMOpIGQnZW50csOpZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiZWRnZVwiOntcbiAgICAgICAgICAgIFwicGF5b2ZmXCI6IHtcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJBdmFudGFnZSB7e251bWJlcn19OiB7e3ZhbHVlfX1cIixcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwie3tuYW1lfX06IHt7dmFsdWV9fVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJwcm9iYWJpbGl0eVwiOiBcIlByb2JhYmlsaXTDqToge3t2YWx1ZX19XCJcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBpMThuZXh0IGZyb20gJ2kxOG5leHQnO1xuaW1wb3J0ICogYXMgZW4gZnJvbSAnLi9lbi5qc29uJ1xuaW1wb3J0ICogYXMgcGwgZnJvbSAnLi9wbC5qc29uJ1xuaW1wb3J0ICogYXMgaXQgZnJvbSAnLi9pdC5qc29uJ1xuaW1wb3J0ICogYXMgZGUgZnJvbSAnLi9kZS5qc29uJ1xuaW1wb3J0ICogYXMgZnIgZnJvbSAnLi9mci5qc29uJ1xuXG5leHBvcnQgY2xhc3MgaTE4bntcblxuICAgIHN0YXRpYyAkaW5zdGFuY2U7XG4gICAgc3RhdGljIGxhbmd1YWdlO1xuXG4gICAgc3RhdGljIGluaXQobG5nKXtcbiAgICAgICAgaTE4bi5sYW5ndWFnZSA9IGxuZztcbiAgICAgICAgbGV0IHJlc291cmNlcyA9IHtcbiAgICAgICAgICAgIGVuOiB7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRpb246IGVuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGw6IHtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGlvbjogcGxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpdDoge1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0aW9uOiBpdFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlOiB7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRpb246IGRlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnI6IHtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGlvbjogZnJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgaTE4bi4kaW5zdGFuY2UgPSBpMThuZXh0LmNyZWF0ZUluc3RhbmNlKHtcbiAgICAgICAgICAgIGxuZzogbG5nLFxuICAgICAgICAgICAgZmFsbGJhY2tMbmc6ICdlbicsXG4gICAgICAgICAgICByZXNvdXJjZXM6IHJlc291cmNlc1xuICAgICAgICB9LCAoZXJyLCB0KSA9PiB7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXRpYyB0KGtleSwgb3B0KXtcbiAgICAgICAgcmV0dXJuIGkxOG4uJGluc3RhbmNlLnQoa2V5LCBvcHQpXG4gICAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHM9e1xuICAgIFwiY29udGV4dE1lbnVcIjp7XG4gICAgICAgIFwibWFpblwiOntcbiAgICAgICAgICAgIFwiYWRkRGVjaXNpb25Ob2RlXCI6IFwiQWdnaXVuZ2kgdW4gbm9kbyBkaSBkZWNpc2lvbmVcIixcbiAgICAgICAgICAgIFwiYWRkQ2hhbmNlTm9kZVwiOiBcIkFnZ2l1bmdpIHVuIG5vZG8gb3Bwb3J0dW5pdMOgXCIsXG4gICAgICAgICAgICBcImFkZFRleHRcIjogXCJBZ2dpdW5naSB0ZXN0b1wiLFxuICAgICAgICAgICAgXCJwYXN0ZVwiOiBcIkluY29sbGFcIixcbiAgICAgICAgICAgIFwic2VsZWN0QWxsTm9kZXNcIjogXCJTZWxlemlvbmEgdHV0dGkgaSBub2RpXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJub2RlXCI6e1xuICAgICAgICAgICAgXCJjb3B5XCI6IFwiQ29waWFcIixcbiAgICAgICAgICAgIFwiY3V0XCI6IFwiVGFnbGlhXCIsXG4gICAgICAgICAgICBcInBhc3RlXCI6IFwiSW5jb2xsYVwiLFxuICAgICAgICAgICAgXCJkZWxldGVcIjogXCJDYW5jZWxsYVwiLFxuICAgICAgICAgICAgXCJhZGREZWNpc2lvbk5vZGVcIjogXCJBZ2dpdW5naSB1biBub2RvIGRpIGRlY2lzaW9uZVwiLFxuICAgICAgICAgICAgXCJhZGRDaGFuY2VOb2RlXCI6IFwiQWdnaXVuZ2kgdW4gbm9kbyBvcHBvcnR1bml0w6BcIixcbiAgICAgICAgICAgIFwiYWRkVGVybWluYWxOb2RlXCI6IFwiQWdnaXVuZ2kgdW4gbm9kbyB0ZXJtaW5hbGVcIixcbiAgICAgICAgICAgIFwiY29udmVydFwiOntcbiAgICAgICAgICAgICAgICBcImRlY2lzaW9uXCI6IFwiQ29tZSBEZWNpc2lvbiBOb2RlXCIsXG4gICAgICAgICAgICAgICAgXCJjaGFuY2VcIjogXCJDb21lIENoYW5jZSBOb2RlXCIsXG4gICAgICAgICAgICAgICAgXCJ0ZXJtaW5hbFwiOiBcIkNvbWUgVGVybWluYWwgTm9kZVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJzZWxlY3RTdWJ0cmVlXCI6IFwiU2VsZXppb25hIFNvdHRvLWFsYmVyb1wiLFxuICAgICAgICAgICAgXCJmb2xkXCI6IFwiUGllZ2Egc290dG8tYWxiZXJvXCIsXG4gICAgICAgICAgICBcInVuZm9sZFwiOiBcIkRpc3BpZWdhcnNpIHNvdHRvLWFsYmVyb1wiLFx0XHRcdFxuICAgICAgICAgICAgXCJmbGlwU3VidHJlZVwiOiBcIlJpYmFsdGEgc290dG8tYWxiZXJvXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJlZGdlXCI6e1xuICAgICAgICAgICAgXCJpbmplY3REZWNpc2lvbk5vZGVcIjogXCJJbmlldHRhIG5vZG8gZGkgZGVjaXNpb25lXCIsXG4gICAgICAgICAgICBcImluamVjdENoYW5jZU5vZGVcIjogXCJJbmlldHRhIG5vZG8gb3Bwb3J0dW5pdMOgXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJ0ZXh0XCI6e1xuICAgICAgICAgICAgXCJkZWxldGVcIjogXCJDYW5jZWxsYVwiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwidmFsaWRhdGlvblwiOntcbiAgICAgICAgXCJpbmNvbXBsZXRlUGF0aFwiOiBcIlBlcmNvcnNvIHNlbnphIG5vZG8gdGVybWluYWxlXCIsXG4gICAgICAgIFwicHJvYmFiaWxpdHlEb05vdFN1bVVwVG8xXCI6IFwiTGEgc29tbWEgZGVsbGUgcHJvYmFiaWxpdMOgIMOoIGRpdmVyc2EgZGEgMVwiLFxuICAgICAgICBcImludmFsaWRQcm9iYWJpbGl0eVwiOiBcIlByb2JhYmlsaXTDoCBub24gdmFsaWRhIC0gYm9yZG8gI3t7bnVtYmVyfX1cIixcbiAgICAgICAgXCJpbnZhbGlkUGF5b2ZmXCI6IFwiU2FsZG8gbm9uIHZhbGlkbyAtIGJvcmRvICN7e251bWJlcn19XCJcbiAgICB9LFxuICAgIFwiZ3Jvd2xcIjp7XG4gICAgICAgIFwiYnJ1c2hEaXNhYmxlZFwiOiBcIlNlbGV6aW9uZSBwZW5uZWxsbyBkaXNhYmlsaXRhdGFcIixcbiAgICAgICAgXCJicnVzaEVuYWJsZWRcIjogXCJTZWxlemlvbmUgcGVubmVsbG8gYWJpbGl0YXRhXCJcbiAgICB9LFxuICAgIFwidG9vbHRpcFwiOntcbiAgICAgICAgXCJub2RlXCI6e1xuICAgICAgICAgICAgXCJwYXlvZmZcIjoge1xuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIlNhbGRvIHt7bnVtYmVyfX1cIixcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwie3tuYW1lfX1cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiYWdncmVnYXRlZFBheW9mZlwiOiB7XG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiU2FsZG8gYWdncmVnYXRvIHt7bnVtYmVyfX1cIixcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwiQWdncmVnYXRvIHt7bmFtZX19XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInByb2JhYmlsaXR5VG9FbnRlclwiOiBcIlByb2JhYmlsaXTDoCBkYSBpbnNlcmlyZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiZWRnZVwiOntcbiAgICAgICAgICAgIFwicGF5b2ZmXCI6IHtcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJTYWxkbyB7e251bWJlcn19OiB7e3ZhbHVlfX1cIixcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwie3tuYW1lfX06IHt7dmFsdWV9fVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJwcm9iYWJpbGl0eVwiOiBcIlByb2JhYmlsaXTDoDoge3t2YWx1ZX19XCJcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzPXtcblxuICAgIFwiY29udGV4dE1lbnVcIjp7XG4gICAgICAgIFwibWFpblwiOntcbiAgICAgICAgICAgIFwiYWRkRGVjaXNpb25Ob2RlXCI6IFwiRG9kYWogV8SZemXFgiBEZWN5enlqbnlcIixcbiAgICAgICAgICAgIFwiYWRkQ2hhbmNlTm9kZVwiOiBcIkRvZGFqIFfEmXplxYIgTG9zb3d5XCIsXG4gICAgICAgICAgICBcImFkZFRleHRcIjogXCJEb2RhaiBUZWtzdFwiLFxuICAgICAgICAgICAgXCJwYXN0ZVwiOiBcIldrbGVqXCIsXG4gICAgICAgICAgICBcInNlbGVjdEFsbE5vZGVzXCI6IFwiWmF6bmFjeiB3c3p5c3RraWUgd8SZesWCeVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwibm9kZVwiOntcbiAgICAgICAgICAgIFwiY29weVwiOiBcIktvcGl1alwiLFxuICAgICAgICAgICAgXCJjdXRcIjogXCJXeXRuaWpcIixcbiAgICAgICAgICAgIFwicGFzdGVcIjogXCJXa2xlalwiLFxuICAgICAgICAgICAgXCJkZWxldGVcIjogXCJVc3XFhFwiLFxuICAgICAgICAgICAgXCJhZGREZWNpc2lvbk5vZGVcIjogXCJEb2RhaiBXxJl6ZcWCIERlY3l6eWpueVwiLFxuICAgICAgICAgICAgXCJhZGRDaGFuY2VOb2RlXCI6IFwiRG9kYWogV8SZemXFgiBMb3Nvd3lcIixcbiAgICAgICAgICAgIFwiYWRkVGVybWluYWxOb2RlXCI6IFwiRG9kYWogV8SZemXFgiBLb8WEY293eVwiLFxuICAgICAgICAgICAgXCJjb252ZXJ0XCI6e1xuICAgICAgICAgICAgICAgIFwiZGVjaXNpb25cIjogXCJKYWtvIFfEmXplxYIgRGVjeXp5am55XCIsXG4gICAgICAgICAgICAgICAgXCJjaGFuY2VcIjogXCJKYWtvIFfEmXplxYIgTG9zb3d5XCIsXG4gICAgICAgICAgICAgICAgXCJ0ZXJtaW5hbFwiOiBcIkpha28gV8SZemXFgiBLb8WEY293eVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJzZWxlY3RTdWJ0cmVlXCI6IFwiWmF6bmFjeiBwb2Rkcnpld29cIixcbiAgICAgICAgICAgIFwiZm9sZFwiOiBcIlp3acWEIHBvZGRyemV3b1wiLFxuICAgICAgICAgICAgXCJ1bmZvbGRcIjogXCJSb3p3acWEIHBvZGRyemV3b1wiLFxuICAgICAgICAgICAgXCJmbGlwU3VidHJlZVwiOiBcIlByemV3csOzxIcgcG9kZHJ6ZXdvXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJlZGdlXCI6e1xuICAgICAgICAgICAgXCJpbmplY3REZWNpc2lvbk5vZGVcIjogXCJXc3RyenlrbmlqIFfEmXplxYIgRGVjeXp5am55XCIsXG4gICAgICAgICAgICBcImluamVjdENoYW5jZU5vZGVcIjogXCJXc3RyenlrbmlqIFfEmXplxYIgTG9zb3d5XCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJ0ZXh0XCI6e1xuICAgICAgICAgICAgXCJkZWxldGVcIjogXCJVc3XFhFwiXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJ2YWxpZGF0aW9uXCI6e1xuICAgICAgICBcImluY29tcGxldGVQYXRoXCI6IFwiT3N0YXRuaW0gd8SZesWCZW0gdyDFm2NpZcW8Y2UgcG93aW5pZW4gYnnEhyBXxJl6ZcWCIEtvxYRjb3d5XCIsXG4gICAgICAgIFwicHJvYmFiaWxpdHlEb05vdFN1bVVwVG8xXCI6IFwiUHJhd2RvcG9kb2JpZcWEc3R3YSBuaWUgc3VtdWrEhSBzaWUgZG8gMVwiLFxuICAgICAgICBcImludmFsaWRQcm9iYWJpbGl0eVwiOiBcIk5pZXBvcHJhd25lIHByYXdkb3BvZG9iaWXFhHN0d28gbmEga3Jhd8SZZHppICN7e251bWJlcn19XCIsXG4gICAgICAgIFwiaW52YWxpZFBheW9mZlwiOiBcIk5pZXBvcHJhd25hIHd5cMWCYXRhIG5hIGtyYXfEmWR6aSAje3tudW1iZXJ9fVwiXG4gICAgfSxcbiAgICBcImdyb3dsXCI6e1xuICAgICAgICBcImJydXNoRGlzYWJsZWRcIjogXCJaYXpuYWN6YW5pZSB3ecWCxIVjem9uZVwiLFxuICAgICAgICBcImJydXNoRW5hYmxlZFwiOiBcIlphem5hY3phbmllIHfFgsSFY3pvbmVcIlxuICAgIH0sXG4gICAgXCJ0b29sdGlwXCI6e1xuICAgICAgICBcIm5vZGVcIjp7XG4gICAgICAgICAgICBcInBheW9mZlwiOiB7XG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiV3lwxYJhdGEge3tudW1iZXJ9fVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJ7e25hbWV9fVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJhZ2dyZWdhdGVkUGF5b2ZmXCI6IHtcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJaYWdyZWdvd2FuYSB3eXDFgmF0YSB7e251bWJlcn19XCIsXG4gICAgICAgICAgICAgICAgXCJuYW1lZFwiOiBcIlphZ3JlZ293YW5hIHt7bmFtZX19XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInByb2JhYmlsaXR5VG9FbnRlclwiOiBcIlByYXdkb3BvZG9iaWXFhHN0d28gd2VqxZtjaWFcIlxuICAgICAgICB9LFxuICAgICAgICBcImVkZ2VcIjp7XG4gICAgICAgICAgICBcInBheW9mZlwiOiB7XG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiV3lwxYJhdGEge3tudW1iZXJ9fToge3t2YWx1ZX19XCIsXG4gICAgICAgICAgICAgICAgXCJuYW1lZFwiOiBcInt7bmFtZX19OiB7e3ZhbHVlfX1cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwicHJvYmFiaWxpdHlcIjogXCJQcmF3ZG9wb2RvYmllxYRzdHdvOiB7e3ZhbHVlfX1cIlxuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHtEM0V4dGVuc2lvbnN9IGZyb20gJy4vZDMtZXh0ZW5zaW9ucydcbkQzRXh0ZW5zaW9ucy5leHRlbmQoKTtcblxuZXhwb3J0ICogZnJvbSAnLi90cmVlLWRlc2lnbmVyJ1xuZXhwb3J0ICogZnJvbSAnLi9hcHAtdXRpbHMnXG5leHBvcnQgKiBmcm9tICcuL3RlbXBsYXRlcydcbmV4cG9ydCAqIGZyb20gJy4vdG9vbHRpcCdcbmV4cG9ydCAqIGZyb20gJy4vZDMtZXh0ZW5zaW9ucydcbmV4cG9ydCB7ZGVmYXVsdCBhcyBkM30gZnJvbSAnLi9kMydcblxuXG4iLCJpbXBvcnQge1V0aWxzfSBmcm9tICdzZC11dGlscydcbmltcG9ydCB7ZG9tYWluIGFzIG1vZGVsfSBmcm9tICdzZC1tb2RlbCdcbmltcG9ydCAqIGFzIGQzIGZyb20gJy4vZDMnXG5pbXBvcnQgY2lyY2xlU3ltYm9sIGZyb20gJy4vc3ltYm9scy9jaXJjbGUnXG5pbXBvcnQgdHJpYW5nbGVTeW1ib2wgZnJvbSAnLi9zeW1ib2xzL3RyaWFuZ2xlJ1xuaW1wb3J0IHtBcHBVdGlsc30gZnJvbSBcIi4vYXBwLXV0aWxzXCI7XG5cbi8qVHJlZSBsYXlvdXQgbWFuYWdlciovXG5leHBvcnQgY2xhc3MgTGF5b3V0e1xuXG4gICAgdHJlZURlc2lnbmVyO1xuICAgIGRhdGE7XG4gICAgY29uZmlnO1xuXG4gICAgbm9kZVR5cGVUb1N5bWJvbCA9IHtcbiAgICAgICAgJ2RlY2lzaW9uJzogZDMuc3ltYm9sU3F1YXJlLFxuICAgICAgICAnY2hhbmNlJzogY2lyY2xlU3ltYm9sLFxuICAgICAgICBcInRlcm1pbmFsXCI6IHRyaWFuZ2xlU3ltYm9sXG4gICAgfTtcblxuICAgIHN0YXRpYyBNQU5VQUxfTEFZT1VUX05BTUUgPSAnbWFudWFsJztcblxuXG4gICAgb25BdXRvTGF5b3V0Q2hhbmdlZD1bXTtcblxuICAgIG5vZGVUeXBlT3JkZXIgPSB7XG4gICAgICAgICdkZWNpc2lvbicgOiAwLFxuICAgICAgICAnY2hhbmNlJzogMCxcbiAgICAgICAgJ3Rlcm1pbmFsJzogMVxuICAgIH07XG5cbiAgICB0cmVlTWFyZ2luID0gNTA7XG4gICAgdGFyZ2V0U3ltYm9sU2l6ZT17fTtcbiAgICBub2RlU2VwYXJhdGlvbiA9IChhLCBiKSA9PiBhLnBhcmVudCA9PT0gYi5wYXJlbnQgPyAxIDogMS4yXG5cbiAgICBjb25zdHJ1Y3Rvcih0cmVlRGVzaWduZXIsIGRhdGEsIGNvbmZpZyl7XG4gICAgICAgIHRoaXMudHJlZURlc2lnbmVyID0gdHJlZURlc2lnbmVyO1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcblxuICAgIH1cblxuICAgIHVwZGF0ZShub2RlKXtcbiAgICAgICAgaWYobm9kZSAmJiBub2RlLiRwYXJlbnQpe1xuICAgICAgICAgICAgbm9kZS4kcGFyZW50LmNoaWxkRWRnZXMuc29ydCgoYSxiKT0+YS5jaGlsZE5vZGUubG9jYXRpb24ueSAtIGIuY2hpbGROb2RlLmxvY2F0aW9uLnkpXG4gICAgICAgIH1cbiAgICAgICAgaWYoIXRoaXMuaXNNYW51YWxMYXlvdXQoKSl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hdXRvTGF5b3V0KHRoaXMuY29uZmlnLnR5cGUsIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmKG5vZGUpe1xuICAgICAgICAgICAgdGhpcy5tb3ZlTm9kZVRvRW1wdHlQbGFjZShub2RlKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLnRyZWVEZXNpZ25lci5yZWRyYXcodHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc01hbnVhbExheW91dCgpe1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcudHlwZSA9PT0gTGF5b3V0Lk1BTlVBTF9MQVlPVVRfTkFNRTtcbiAgICB9XG5cbiAgICBnZXROZXdDaGlsZExvY2F0aW9uKHBhcmVudCl7XG4gICAgICAgIGlmKCFwYXJlbnQpe1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBtb2RlbC5Qb2ludCh0aGlzLmdldE5vZGVNaW5YKCksIHRoaXMuZ2V0Tm9kZU1pblkoKSlcbiAgICAgICAgfVxuICAgICAgICB2YXIgeCA9IHBhcmVudC5sb2NhdGlvbi54ICsgdGhpcy5jb25maWcuZ3JpZFdpZHRoO1xuICAgICAgICB2YXIgeSA9IHBhcmVudC5sb2NhdGlvbi55O1xuICAgICAgICBpZihwYXJlbnQuY2hpbGRFZGdlcy5sZW5ndGgpe1xuICAgICAgICAgICAgeSA9IHBhcmVudC5jaGlsZEVkZ2VzW3BhcmVudC5jaGlsZEVkZ2VzLmxlbmd0aC0xXS5jaGlsZE5vZGUubG9jYXRpb24ueSsxO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBtb2RlbC5Qb2ludCh4LCB5KVxuICAgIH1cblxuICAgIGdldEluamVjdGVkTm9kZUxvY2F0aW9uKGVkZ2Upe1xuXG4gICAgICAgIHZhciBwID0gZWRnZS4kbGluZVBvaW50c1syXTtcblxuICAgICAgICByZXR1cm4gbmV3IG1vZGVsLlBvaW50KHBbMF0sIHBbMV0pXG4gICAgfVxuXG4gICAgbW92ZU5vZGVUb0VtcHR5UGxhY2Uobm9kZSwgcmVkcmF3SWZDaGFuZ2VkPXRydWUpe1xuICAgICAgICB2YXIgcG9zaXRpb25NYXAgPSB7fTtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBub2RlLmxvY2F0aW9uLnggPSBNYXRoLm1heCh0aGlzLmdldE5vZGVNaW5YKG5vZGUpLCBub2RlLmxvY2F0aW9uLngpO1xuICAgICAgICBub2RlLmxvY2F0aW9uLnkgPSBNYXRoLm1heCh0aGlzLmdldE5vZGVNaW5ZKG5vZGUpLCBub2RlLmxvY2F0aW9uLnkpO1xuXG5cbiAgICAgICAgdGhpcy5ub2Rlc1NvcnRlZEJ5WCA9IHRoaXMuZGF0YS5ub2Rlcy5zbGljZSgpO1xuICAgICAgICB0aGlzLm5vZGVzU29ydGVkQnlYLnNvcnQoKGEsYik9PmEubG9jYXRpb24ueCAtIGIubG9jYXRpb24ueCk7XG5cbiAgICAgICAgZnVuY3Rpb24gZmluZENvbGxpZGluZ05vZGUobm9kZSwgbG9jYXRpb24pe1xuICAgICAgICAgICAgcmV0dXJuIFV0aWxzLmZpbmQoc2VsZi5ub2Rlc1NvcnRlZEJ5WCwgbj0+e1xuICAgICAgICAgICAgICAgIGlmKG5vZGUgPT0gbil7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgbWFyZ2luID0gc2VsZi5jb25maWcubm9kZVNpemUvMztcbiAgICAgICAgICAgICAgICB2YXIgeCA9IG4ubG9jYXRpb24ueDtcbiAgICAgICAgICAgICAgICB2YXIgeSA9IG4ubG9jYXRpb24ueTtcblxuICAgICAgICAgICAgICAgIHJldHVybiAobG9jYXRpb24ueCAtIG1hcmdpbiA8PSB4ICYmIGxvY2F0aW9uLnggKyBtYXJnaW4gPj0geFxuICAgICAgICAgICAgICAgICAgICAmJiBsb2NhdGlvbi55IC0gbWFyZ2luIDw9IHkgJiYgbG9jYXRpb24ueSArIG1hcmdpbiA+PSB5KVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc3RlcFggPSB0aGlzLmNvbmZpZy5ub2RlU2l6ZS8yO1xuICAgICAgICB2YXIgc3RlcFkgPSB0aGlzLmNvbmZpZy5ub2RlU2l6ZSsxMDtcbiAgICAgICAgdmFyIHN0ZXBYc2FtZVBhcmVudCA9IDA7XG4gICAgICAgIHZhciBzdGVwWXNhbWVQYXJlbnQgPSA3NTtcbiAgICAgICAgdmFyIGNoYW5nZWQgPSBmYWxzZTtcbiAgICAgICAgdmFyIGNvbGlkaW5nTm9kZTtcbiAgICAgICAgdmFyIG5ld0xvY2F0aW9uID0gbmV3IG1vZGVsLlBvaW50KG5vZGUubG9jYXRpb24pO1xuICAgICAgICB3aGlsZShjb2xpZGluZ05vZGUgPSBmaW5kQ29sbGlkaW5nTm9kZShub2RlLCBuZXdMb2NhdGlvbikpe1xuICAgICAgICAgICAgY2hhbmdlZD10cnVlO1xuICAgICAgICAgICAgdmFyIHNhbWVQYXJlbnQgPSBub2RlLiRwYXJlbnQgJiYgY29saWRpbmdOb2RlLiRwYXJlbnQgJiYgbm9kZS4kcGFyZW50PT09Y29saWRpbmdOb2RlLiRwYXJlbnQ7XG4gICAgICAgICAgICBpZihzYW1lUGFyZW50KXtcbiAgICAgICAgICAgICAgICBuZXdMb2NhdGlvbi5tb3ZlKHN0ZXBYc2FtZVBhcmVudCwgc3RlcFlzYW1lUGFyZW50KTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIG5ld0xvY2F0aW9uLm1vdmUoc3RlcFgsIHN0ZXBZKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZihjaGFuZ2VkKXtcbiAgICAgICAgICAgIG5vZGUubW92ZVRvKG5ld0xvY2F0aW9uLngsbmV3TG9jYXRpb24ueSwgdHJ1ZSk7XG4gICAgICAgICAgICBpZihyZWRyYXdJZkNoYW5nZWQpe1xuICAgICAgICAgICAgICAgIHRoaXMudHJlZURlc2lnbmVyLnJlZHJhdyh0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRpc2FibGVBdXRvTGF5b3V0KCl7XG4gICAgICAgIHRoaXMuY29uZmlnLnR5cGUgPSBMYXlvdXQuTUFOVUFMX0xBWU9VVF9OQU1FO1xuICAgICAgICB0aGlzLl9maXJlT25BdXRvTGF5b3V0Q2hhbmdlZENhbGxiYWNrcygpO1xuICAgIH1cblxuXG4gICAgbm9kZVN5bWJvbFNpemUgPSB7fTtcbiAgICBkcmF3Tm9kZVN5bWJvbChwYXRoLCB0cmFuc2l0aW9uKXtcblxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBub2RlU2l6ZSA9IHRoaXMuY29uZmlnLm5vZGVTaXplO1xuICAgICAgICB0aGlzLm5vZGVTeW1ib2wgPSBkMy5zeW1ib2woKS50eXBlKGQ9PiBzZWxmLm5vZGVUeXBlVG9TeW1ib2xbZC50eXBlXSlcbiAgICAgICAgICAgIC5zaXplKGQ9PnNlbGYubm9kZVN5bWJvbFNpemVbZC4kaWRdID8gVXRpbHMuZ2V0KHNlbGYudGFyZ2V0U3ltYm9sU2l6ZSwgZC50eXBlK1wiWydcIitzZWxmLmNvbmZpZy5ub2RlU2l6ZStcIiddXCIsIDY0KSA6IDY0KTtcblxuICAgICAgICBwYXRoXG4gICAgICAgICAgICAuZWFjaChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHZhciBwYXRoID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICAgICAgICAgIHZhciBwcmV2ID0gcGF0aC5hdHRyKFwiZFwiKTtcbiAgICAgICAgICAgICAgICBpZighcHJldil7XG4gICAgICAgICAgICAgICAgICAgIHBhdGguYXR0cihcImRcIiwgc2VsZi5ub2RlU3ltYm9sKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHNpemUgPSBVdGlscy5nZXQoc2VsZi50YXJnZXRTeW1ib2xTaXplLCBkLnR5cGUrXCJbJ1wiK3NlbGYuY29uZmlnLm5vZGVTaXplK1wiJ11cIik7XG4gICAgICAgICAgICAgICAgaWYoIXNpemUpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgYm94ID0gcGF0aC5ub2RlKCkuZ2V0QkJveCgpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSBNYXRoLm1pbihub2RlU2l6ZSAvIGJveC53aWR0aCwgbm9kZVNpemUgLyBib3guaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgc2l6ZSA9IGVycm9yICogZXJyb3IgKiAoc2VsZi5ub2RlU3ltYm9sU2l6ZVtkLiRpZF18fDY0KTtcbiAgICAgICAgICAgICAgICAgICAgVXRpbHMuc2V0KHNlbGYudGFyZ2V0U3ltYm9sU2l6ZSwgZC50eXBlK1wiWydcIitzZWxmLmNvbmZpZy5ub2RlU2l6ZStcIiddXCIsIHNpemUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZih0cmFuc2l0aW9uKXtcbiAgICAgICAgICAgICAgICAgICAgcGF0aCA9ICBwYXRoLnRyYW5zaXRpb24oKTtcblxuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBzZWxmLm5vZGVTeW1ib2xTaXplW2QuJGlkXSA9IHNpemU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBhdGguYXR0cihcImRcIiwgc2VsZi5ub2RlU3ltYm9sKTtcbiAgICAgICAgICAgICAgICBpZih0cmFuc2l0aW9uKXtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5ub2RlU3ltYm9sU2l6ZVtkLiRpZF0gPSBzaXplO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5vZGVMYWJlbFBvc2l0aW9uKHNlbGVjdGlvbikge1xuICAgICAgICByZXR1cm4gc2VsZWN0aW9uXG4gICAgICAgICAgICAuYXR0cigneCcsIDApXG4gICAgICAgICAgICAuYXR0cigneScsIC10aGlzLmNvbmZpZy5ub2RlU2l6ZSAvIDIgLSA3KVxuICAgIH1cblxuICAgIG5vZGVQYXlvZmZQb3NpdGlvbihzZWxlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIExheW91dC5zZXRIYW5naW5nUG9zaXRpb24oc2VsZWN0aW9uKVxuICAgICAgICAgICAgLmF0dHIoJ3gnLCAwKVxuICAgICAgICAgICAgLmF0dHIoJ3knLCB0aGlzLmNvbmZpZy5ub2RlU2l6ZSAvIDIgKyA3KVxuICAgICAgICAgICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXG4gICAgfVxuXG4gICAgbm9kZUFnZ3JlZ2F0ZWRQYXlvZmZQb3NpdGlvbihzZWxlY3Rpb24pIHtcbiAgICAgICAgdmFyIHggPSB0aGlzLmNvbmZpZy5ub2RlU2l6ZSAvIDIgKyA3O1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHNlbGVjdGlvblxuICAgICAgICAgICAgLmF0dHIoJ3gnLCB4KVxuICAgICAgICAgICAgLmF0dHIoJ3knLCBmdW5jdGlvbihkKXtcbiAgICAgICAgICAgICAgICBsZXQgZm9udFNpemUgPSBwYXJzZUludChBcHBVdGlscy5nZXRGb250U2l6ZSh0aGlzKSk7XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW1zID0gZC5kaXNwbGF5VmFsdWUoJ2FnZ3JlZ2F0ZWRQYXlvZmYnKTtcbiAgICAgICAgICAgICAgICBsZXQgbnVtYmVyID0gVXRpbHMuaXNBcnJheShpdGVtcykgPyBpdGVtcy5maWx0ZXIoaXQ9Pml0ICE9PSB1bmRlZmluZWQpLmxlbmd0aCA6IDE7XG4gICAgICAgICAgICAgICAgaWYobnVtYmVyPjEpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gLXRoaXMuZ2V0QkJveCgpLmhlaWdodC8yICsgZm9udFNpemUvMjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIC1NYXRoLm1heCgyLCAxLjgqIHNlbGYuY29uZmlnLm5vZGVTaXplL2ZvbnRTaXplKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHNlbGVjdGlvbi5zZWxlY3RBbGwoJ3RzcGFuJykuYXR0cigneCcsIHgpO1xuICAgICAgICByZXR1cm4gc2VsZWN0aW9uO1xuICAgICAgICAgICAgLy8gLmF0dHIoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXG4gICAgICAgICAgICAvLyAuYXR0cignZG9taW5hbnQtYmFzZWxpbmUnLCAnaGFuZ2luZycpXG4gICAgfVxuXG4gICAgbm9kZVByb2JhYmlsaXR5VG9FbnRlclBvc2l0aW9uKHNlbGVjdGlvbikge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIExheW91dC5zZXRIYW5naW5nUG9zaXRpb24oc2VsZWN0aW9uKVxuICAgICAgICAgICAgLmF0dHIoJ3gnLCB0aGlzLmNvbmZpZy5ub2RlU2l6ZSAvIDIgKyA3KVxuICAgICAgICAgICAgLmF0dHIoJ3knLCBmdW5jdGlvbihkKXtcbiAgICAgICAgICAgICAgICBsZXQgZm9udFNpemUgPSBwYXJzZUludChBcHBVdGlscy5nZXRGb250U2l6ZSh0aGlzKSk7XG4gICAgICAgICAgICAgICAgbGV0IGFnZ3JlZ2F0ZWRQYXlvZmZzID0gZC5kaXNwbGF5VmFsdWUoJ2FnZ3JlZ2F0ZWRQYXlvZmYnKTtcbiAgICAgICAgICAgICAgICBsZXQgYWdncmVnYXRlZFBheW9mZnNOdW1iZXIgPSBVdGlscy5pc0FycmF5KGFnZ3JlZ2F0ZWRQYXlvZmZzKSA/IGFnZ3JlZ2F0ZWRQYXlvZmZzLmZpbHRlcihpdD0+aXQgIT09IHVuZGVmaW5lZCkubGVuZ3RoIDogMTtcbiAgICAgICAgICAgICAgICBpZihhZ2dyZWdhdGVkUGF5b2Zmc051bWJlcj4xKXtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZm9udFNpemUqMC42XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGgubWF4KDIsIDEuOCogc2VsZi5jb25maWcubm9kZVNpemUvZm9udFNpemUpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC8vIC5hdHRyKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKVxuICAgICAgICAgICAgLy8gLmF0dHIoJ2RvbWluYW50LWJhc2VsaW5lJywgJ2NlbnRyYWwnKVxuICAgIH1cblxuICAgIG5vZGVJbmRpY2F0b3JQb3NpdGlvbihzZWxlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIHNlbGVjdGlvblxuICAgICAgICAgICAgLmF0dHIoJ3gnLCB0aGlzLmNvbmZpZy5ub2RlU2l6ZSAvIDIgKyA4KVxuICAgICAgICAgICAgLmF0dHIoJ3knLCAtIHRoaXMuY29uZmlnLm5vZGVTaXplLzIpXG4gICAgICAgICAgICAuYXR0cignZG9taW5hbnQtYmFzZWxpbmUnLCAnY2VudHJhbCcpXG4gICAgICAgICAgICAuYXR0cigndGV4dC1hbmNob3InLCAnbWlkZGxlJylcbiAgICB9XG5cbiAgICBub2RlVW5mb2xkQnV0dG9uUG9zaXRpb24oc2VsZWN0aW9uKSB7XG5cbiAgICAgICAgcmV0dXJuIHNlbGVjdGlvblxuICAgICAgICAgICAgLmF0dHIoJ3gnLCB0aGlzLmNvbmZpZy5ub2RlU2l6ZSAvIDIgKyA1KVxuICAgICAgICAgICAgLmF0dHIoJ3knLCAwKVxuICAgICAgICAgICAgLmF0dHIoJ2RvbWluYW50LWJhc2VsaW5lJywgJ2NlbnRyYWwnKVxuICAgIH1cblxuICAgIGVkZ2VMaW5lRChlZGdlKXtcbiAgICAgICAgdmFyIGxpbmUgPSBkMy5saW5lKClcbiAgICAgICAgICAgIC54KGQ9PiBkWzBdKVxuICAgICAgICAgICAgLnkoZD0+IGRbMV0pO1xuICAgICAgICAvLyAuY3VydmUoZDMuY3VydmVDYXRtdWxsUm9tLmFscGhhKDAuNSkpO1xuXG5cbiAgICAgICAgdmFyIHBhcmVudE5vZGUgPSBlZGdlLnBhcmVudE5vZGU7XG4gICAgICAgIHZhciBjaGlsZE5vZGUgPSBlZGdlLmNoaWxkTm9kZTtcblxuICAgICAgICB2YXIgZFggPSBjaGlsZE5vZGUubG9jYXRpb24ueCAtIHBhcmVudE5vZGUubG9jYXRpb24ueDtcbiAgICAgICAgdmFyIGRZID0gY2hpbGROb2RlLmxvY2F0aW9uLnkgLSBwYXJlbnROb2RlLmxvY2F0aW9uLnk7XG5cbiAgICAgICAgdmFyIHNpZ24gPSBkWD49MCA/IDEgOiAtMTtcblxuICAgICAgICB2YXIgc2xhbnRTdGFydFhPZmZzZXQgPSBNYXRoLm1pbihkWC8yLCB0aGlzLmNvbmZpZy5ub2RlU2l6ZS8yKzEwKTtcbiAgICAgICAgdmFyIHNsYW50V2lkdGggPSBNYXRoLm1pbih0aGlzLmNvbmZpZy5lZGdlU2xhbnRXaWR0aE1heCwgTWF0aC5tYXgoZFgvMiAtIHNsYW50U3RhcnRYT2Zmc2V0LCAwKSk7XG5cbiAgICAgICAgdmFyIHBvaW50MSA9IFtwYXJlbnROb2RlLmxvY2F0aW9uLnggK3RoaXMuY29uZmlnLm5vZGVTaXplLzIgKyAxLCBwYXJlbnROb2RlLmxvY2F0aW9uLnldO1xuICAgICAgICB2YXIgcG9pbnQyID0gW01hdGgubWF4KHBhcmVudE5vZGUubG9jYXRpb24ueCtzbGFudFN0YXJ0WE9mZnNldCwgcG9pbnQxWzBdKSwgcGFyZW50Tm9kZS5sb2NhdGlvbi55XTtcbiAgICAgICAgdmFyIHBvaW50MyA9IFtwYXJlbnROb2RlLmxvY2F0aW9uLngrc2xhbnRTdGFydFhPZmZzZXQrc2xhbnRXaWR0aCwgY2hpbGROb2RlLmxvY2F0aW9uLnldO1xuICAgICAgICB2YXIgcG9pbnQ0ID0gW2NoaWxkTm9kZS5sb2NhdGlvbi54IC0gKHNpZ24qKE1hdGgubWF4KDAsIE1hdGgubWluKHRoaXMuY29uZmlnLm5vZGVTaXplLzIrOCwgZFgvMikpKSksIGNoaWxkTm9kZS5sb2NhdGlvbi55XTtcbiAgICAgICAgLy8gdmFyIHBvaW50MiA9IFtwYXJlbnROb2RlLmxvY2F0aW9uLngrZFgvMi1zbGFudFdpZHRoLzIsIHBhcmVudE5vZGUubG9jYXRpb24ueV07XG4gICAgICAgIC8vIHZhciBwb2ludDMgPSBbY2hpbGROb2RlLmxvY2F0aW9uLngtKGRYLzItc2xhbnRXaWR0aC8yKSwgY2hpbGROb2RlLmxvY2F0aW9uLnldO1xuXG4gICAgICAgIGVkZ2UuJGxpbmVQb2ludHMgPSBbcG9pbnQxLCBwb2ludDIsIHBvaW50MywgcG9pbnQ0XTtcbiAgICAgICAgcmV0dXJuIGxpbmUoZWRnZS4kbGluZVBvaW50cyk7XG4gICAgfVxuXG4gICAgZWRnZVBheW9mZlBvc2l0aW9uKHNlbGVjdGlvbikge1xuICAgICAgICBMYXlvdXQuc2V0SGFuZ2luZ1Bvc2l0aW9uKHNlbGVjdGlvbilcbiAgICAgICAgICAgIC5hdHRyKCd4JywgZD0+ZC4kbGluZVBvaW50c1syXVswXSArIDIpXG4gICAgICAgICAgICAuYXR0cigneScsIGQ9PmQuJGxpbmVQb2ludHNbMl1bMV0gKyA3KTtcblxuICAgICAgICBzZWxlY3Rpb24uc2VsZWN0QWxsKCd0c3BhbicpLmF0dHIoJ3gnLCBmdW5jdGlvbihkKXtcbiAgICAgICAgICAgIHJldHVybiBkMy5zZWxlY3QodGhpcy5wYXJlbnROb2RlKS5kYXR1bSgpLiRsaW5lUG9pbnRzWzJdWzBdICsgMlxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHNlbGVjdGlvbjtcblxuICAgIH1cblxuICAgIGVkZ2VMYWJlbFBvc2l0aW9uKHNlbGVjdGlvbikge1xuICAgICAgICByZXR1cm4gc2VsZWN0aW9uXG4gICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgZD0+J3RyYW5zbGF0ZSgnKyhkLiRsaW5lUG9pbnRzWzJdWzBdICsgMikrJywnKyhkLiRsaW5lUG9pbnRzWzJdWzFdIC0gNykrJyknKVxuICAgICAgICAgICAgLy8gLmF0dHIoJ3gnLCBkPT5kLiRsaW5lUG9pbnRzWzJdWzBdICsgMilcbiAgICAgICAgICAgIC8vIC5hdHRyKCd5JywgZD0+ZC4kbGluZVBvaW50c1syXVsxXSAtIDcpXG5cbiAgICB9XG5cbiAgICBlZGdlUHJvYmFiaWxpdHlQb3NpdGlvbihzZWxlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIExheW91dC5zZXRIYW5naW5nUG9zaXRpb24oc2VsZWN0aW9uKVxuICAgICAgICAgICAgLmF0dHIoJ3gnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHZhciBsZW4gPSB0aGlzLmdldENvbXB1dGVkVGV4dExlbmd0aCgpO1xuICAgICAgICAgICAgICAgIHZhciBtaW4gPSBkLiRsaW5lUG9pbnRzWzJdWzBdICsgMiArIHRoaXMucHJldmlvdXNTaWJsaW5nLmNoaWxkTm9kZXNbMF0uZ2V0Q29tcHV0ZWRUZXh0TGVuZ3RoKCkgKyA3ICsgbGVuO1xuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLm1heChtaW4sIGQuJGxpbmVQb2ludHNbM11bMF0gLSA4KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXR0cigneScsIGQ9PmQuJGxpbmVQb2ludHNbMl1bMV0gKyA3KVxuICAgIH1cblxuICAgIGdldE1pbk1hcmdpbkJldHdlZW5Ob2Rlcygpe1xuICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLm5vZGVTaXplICsgMzA7XG4gICAgfVxuXG4gICAgZ2V0VGV4dE1pblgoZCl7XG4gICAgICAgIGxldCBtaW5YID0gMDtcbiAgICAgICAgaWYoZCl7XG4gICAgICAgICAgICBsZXQgYmIgPSB0aGlzLnRyZWVEZXNpZ25lci5nZXRUZXh0RDNTZWxlY3Rpb24oZCkuc2VsZWN0KCd0ZXh0Jykubm9kZSgpLmdldEJCb3goKTtcbiAgICAgICAgICAgIGlmIChiYi54IDwgMCkge1xuICAgICAgICAgICAgICAgIG1pblggLT0gYmIueDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWluWDtcbiAgICB9XG5cbiAgICBnZXRUZXh0TWluWShkKXtcbiAgICAgICAgbGV0IG1pblkgPSAwO1xuICAgICAgICBpZihkKXtcbiAgICAgICAgICAgIGxldCBiYiA9IHRoaXMudHJlZURlc2lnbmVyLmdldFRleHREM1NlbGVjdGlvbihkKS5zZWxlY3QoJ3RleHQnKS5ub2RlKCkuZ2V0QkJveCgpO1xuICAgICAgICAgICAgaWYgKGJiLnkgPCAwKSB7XG4gICAgICAgICAgICAgICAgbWluWSAtPSBiYi55O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtaW5ZO1xuICAgIH1cblxuICAgIGdldFRleHRNYXhYKGQpe1xuICAgICAgICByZXR1cm4gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVI7XG4gICAgfVxuXG5cbiAgICBnZXROb2RlTWluWChkKXtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBpZihkICYmIGQuJHBhcmVudCl7Ly8gJiYgIXNlbGYuaXNOb2RlU2VsZWN0ZWQoZC4kcGFyZW50KVxuICAgICAgICAgICAgcmV0dXJuIGQuJHBhcmVudC5sb2NhdGlvbi54ICsgc2VsZi5nZXRNaW5NYXJnaW5CZXR3ZWVuTm9kZXMoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2VsZi5jb25maWcubm9kZVNpemUvMjtcbiAgICB9XG5cbiAgICBnZXROb2RlTWluWShkKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLm5vZGVTaXplLzI7XG4gICAgfVxuXG4gICAgZ2V0Tm9kZU1heFgoZCl7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICBpZihkICYmIGQuY2hpbGRFZGdlcy5sZW5ndGgpe1xuICAgICAgICAgICAgcmV0dXJuIGQzLm1pbihkLmNoaWxkRWRnZXMsIGU9PiFlLmNoaWxkTm9kZS4kaGlkZGVuID8gZS5jaGlsZE5vZGUubG9jYXRpb24ueCA6IDk5OTk5OTkpLXNlbGYuZ2V0TWluTWFyZ2luQmV0d2Vlbk5vZGVzKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIE51bWJlci5NQVhfU0FGRV9JTlRFR0VSO1xuICAgIH1cblxuICAgIHNldEdyaWRXaWR0aCh3aWR0aCwgd2l0aG91dFN0YXRlU2F2aW5nKXtcbiAgICAgICAgdmFyIHNlbGY9dGhpcztcbiAgICAgICAgaWYodGhpcy5jb25maWcuZ3JpZFdpZHRoPT09d2lkdGgpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmKCF3aXRob3V0U3RhdGVTYXZpbmcpe1xuICAgICAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSh7XG4gICAgICAgICAgICAgICAgZGF0YTp7XG4gICAgICAgICAgICAgICAgICAgIGdyaWRXaWR0aDogc2VsZi5jb25maWcuZ3JpZFdpZHRoXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvblVuZG86IChkYXRhKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRHcmlkV2lkdGgoZGF0YS5ncmlkV2lkdGgsIHRydWUpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25SZWRvOiAoZGF0YSk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0R3JpZFdpZHRoKHdpZHRoLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29uZmlnLmdyaWRXaWR0aD13aWR0aDtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG5cbiAgICBzZXRHcmlkSGVpZ2h0KGdyaWRIZWlnaHQsIHdpdGhvdXRTdGF0ZVNhdmluZyl7XG4gICAgICAgIHZhciBzZWxmPXRoaXM7XG4gICAgICAgIGlmKHRoaXMuY29uZmlnLmdyaWRIZWlnaHQ9PT1ncmlkSGVpZ2h0KXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZighd2l0aG91dFN0YXRlU2F2aW5nKXtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoe1xuICAgICAgICAgICAgICAgIGRhdGE6e1xuICAgICAgICAgICAgICAgICAgICBncmlkSGVpZ2h0OiBzZWxmLmNvbmZpZy5ncmlkSGVpZ2h0XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvblVuZG86IChkYXRhKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRHcmlkSGVpZ2h0KGRhdGEuZ3JpZEhlaWdodCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvblJlZG86IChkYXRhKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRHcmlkSGVpZ2h0KGdyaWRIZWlnaHQsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb25maWcuZ3JpZEhlaWdodD1ncmlkSGVpZ2h0O1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cblxuICAgIHNldE5vZGVTaXplKG5vZGVTaXplLCB3aXRob3V0U3RhdGVTYXZpbmcpe1xuICAgICAgICB2YXIgc2VsZj10aGlzO1xuICAgICAgICBpZih0aGlzLmNvbmZpZy5ub2RlU2l6ZT09PW5vZGVTaXplKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZighd2l0aG91dFN0YXRlU2F2aW5nKXtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoe1xuICAgICAgICAgICAgICAgIGRhdGE6e1xuICAgICAgICAgICAgICAgICAgICBub2RlU2l6ZTogc2VsZi5jb25maWcubm9kZVNpemVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uVW5kbzogKGRhdGEpPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldE5vZGVTaXplKGRhdGEubm9kZVNpemUsIHRydWUpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25SZWRvOiAoZGF0YSk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0Tm9kZVNpemUobm9kZVNpemUsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb25maWcubm9kZVNpemU9bm9kZVNpemU7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgIGlmKHRoaXMuaXNNYW51YWxMYXlvdXQoKSl7XG4gICAgICAgICAgICB0aGlzLmZpdE5vZGVzSW5QbG90dGluZ1JlZ2lvbihzZWxmLmRhdGEuZ2V0Um9vdHMoKSk7XG4gICAgICAgICAgICB0aGlzLnRyZWVEZXNpZ25lci5yZWRyYXcodHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRFZGdlU2xhbnRXaWR0aE1heCh3aWR0aCwgd2l0aG91dFN0YXRlU2F2aW5nKXtcbiAgICAgICAgdmFyIHNlbGY9dGhpcztcbiAgICAgICAgaWYodGhpcy5jb25maWcuZWRnZVNsYW50V2lkdGhNYXg9PT13aWR0aCl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYoIXdpdGhvdXRTdGF0ZVNhdmluZyl7XG4gICAgICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKHtcbiAgICAgICAgICAgICAgICBkYXRhOntcbiAgICAgICAgICAgICAgICAgICAgZWRnZVNsYW50V2lkdGhNYXg6IHNlbGYuY29uZmlnLmVkZ2VTbGFudFdpZHRoTWF4XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvblVuZG86IChkYXRhKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRFZGdlU2xhbnRXaWR0aE1heChkYXRhLmVkZ2VTbGFudFdpZHRoTWF4LCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uUmVkbzogKGRhdGEpPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldEVkZ2VTbGFudFdpZHRoTWF4KHdpZHRoLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29uZmlnLmVkZ2VTbGFudFdpZHRoTWF4PXdpZHRoO1xuICAgICAgICB0aGlzLnRyZWVEZXNpZ25lci5yZWRyYXcodHJ1ZSk7XG4gICAgfVxuXG4gICAgYXV0b0xheW91dCh0eXBlLCB3aXRob3V0U3RhdGVTYXZpbmcpe1xuICAgICAgICB2YXIgc2VsZj10aGlzO1xuXG5cblxuICAgICAgICBpZighd2l0aG91dFN0YXRlU2F2aW5nKXtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoe1xuICAgICAgICAgICAgICAgIGRhdGE6e1xuICAgICAgICAgICAgICAgICAgICBuZXdMYXlvdXQ6IHR5cGUsXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRMYXlvdXQ6IHNlbGYuY29uZmlnLnR5cGVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uVW5kbzogKGRhdGEpPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmNvbmZpZy50eXBlID0gZGF0YS5jdXJyZW50TGF5b3V0O1xuICAgICAgICAgICAgICAgICAgICBzZWxmLl9maXJlT25BdXRvTGF5b3V0Q2hhbmdlZENhbGxiYWNrcygpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25SZWRvOiAoZGF0YSk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuYXV0b0xheW91dChkYXRhLm5ld0xheW91dCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb25maWcudHlwZSA9IHR5cGU7XG4gICAgICAgIGlmKCF0aGlzLmRhdGEubm9kZXMubGVuZ3RoKXtcbiAgICAgICAgICAgIHRoaXMuX2ZpcmVPbkF1dG9MYXlvdXRDaGFuZ2VkQ2FsbGJhY2tzKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcHJldlRyZWVNYXhZID0gc2VsZi5nZXROb2RlTWluWSgpO1xuICAgICAgICB0aGlzLmRhdGEuZ2V0Um9vdHMoKS5mb3JFYWNoKHI9PntcbiAgICAgICAgICAgIHZhciByb290ID0gZDMuaGllcmFyY2h5KHIsIGQ9PntcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5jaGlsZEVkZ2VzLmZpbHRlcihlPT4hZS4kaGlkZGVuKS5tYXAoZT0+ZS5jaGlsZE5vZGUpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIHJvb3Quc29ydCgoYSxiKT0+c2VsZi5ub2RlVHlwZU9yZGVyW2EuZGF0YS50eXBlXS1zZWxmLm5vZGVUeXBlT3JkZXJbYi5kYXRhLnR5cGVdKTtcbiAgICAgICAgICAgIHJvb3Quc29ydCgoYSxiKT0+YS5kYXRhLmxvY2F0aW9uLnkgLSBiLmRhdGEubG9jYXRpb24ueSk7XG5cblxuICAgICAgICAgICAgdmFyIGxheW91dDtcbiAgICAgICAgICAgIGlmKHR5cGU9PT0nY2x1c3Rlcicpe1xuICAgICAgICAgICAgICAgIGxheW91dCA9IGQzLmNsdXN0ZXIoKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGxheW91dCA9IGQzLnRyZWUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxheW91dC5ub2RlU2l6ZShbc2VsZi5jb25maWcuZ3JpZEhlaWdodCwgc2VsZi5jb25maWcuZ3JpZFdpZHRoXSk7XG4gICAgICAgICAgICBsYXlvdXQuc2VwYXJhdGlvbihzZWxmLm5vZGVTZXBhcmF0aW9uKTtcblxuICAgICAgICAgICAgbGF5b3V0KHJvb3QpO1xuICAgICAgICAgICAgdmFyIG1pblkgPSA5OTk5OTk5OTk7XG4gICAgICAgICAgICByb290LmVhY2goZD0+e1xuICAgICAgICAgICAgICAgIG1pblkgPSBNYXRoLm1pbihtaW5ZLCBkLngpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHZhciBkeSA9IHJvb3QueCAtIG1pblkgKyBwcmV2VHJlZU1heFk7XG4gICAgICAgICAgICB2YXIgZHggPSBzZWxmLmdldE5vZGVNaW5YKCk7XG4gICAgICAgICAgICB2YXIgbWF4WT0wO1xuICAgICAgICAgICAgcm9vdC5lYWNoKGQ9PntcbiAgICAgICAgICAgICAgICBkLmRhdGEubG9jYXRpb24ueCA9IGQueSArIGR4O1xuICAgICAgICAgICAgICAgIGQuZGF0YS5sb2NhdGlvbi55ID0gZC54ICsgZHk7XG5cbiAgICAgICAgICAgICAgICBtYXhZID0gTWF0aC5tYXgobWF4WSwgZC5kYXRhLmxvY2F0aW9uLnkpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHByZXZUcmVlTWF4WSA9IG1heFkgKyBzZWxmLmNvbmZpZy5ub2RlU2l6ZStzZWxmLnRyZWVNYXJnaW47XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgLy8gdGhpcy50cmFuc2l0aW9uID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50cmVlRGVzaWduZXIucmVkcmF3KHRydWUpO1xuICAgICAgICAvLyB0aGlzLnRyYW5zaXRpb24gPSBmYWxzZTtcblxuICAgICAgICB0aGlzLl9maXJlT25BdXRvTGF5b3V0Q2hhbmdlZENhbGxiYWNrcygpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBmaXROb2Rlc0luUGxvdHRpbmdSZWdpb24obm9kZXMpe1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciB0b3BZID0gZDMubWluKG5vZGVzLCBuPT5uLmxvY2F0aW9uLnkpO1xuICAgICAgICB2YXIgbWluWSA9IHNlbGYuZ2V0Tm9kZU1pblkoKTtcbiAgICAgICAgdmFyIGR5ID0gdG9wWSAtIG1pblk7XG5cbiAgICAgICAgdmFyIG1pblggPSBkMy5taW4obm9kZXMsIG49Pm4ubG9jYXRpb24ueCk7XG4gICAgICAgIHZhciBkeCA9IG1pblggLSBzZWxmLmdldE5vZGVNaW5YKCk7XG5cbiAgICAgICAgaWYoZHk8MCB8fCAgZHg8MCl7XG4gICAgICAgICAgICBub2Rlcy5mb3JFYWNoKG49Pm4ubW92ZSgtZHgsIC1keSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW92ZU5vZGVzKG5vZGVzLCBkeCwgZHksIHBpdm90KXtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgbGltaXQgPSBzZWxmLmNvbmZpZy5saW1pdE5vZGVQb3NpdGlvbmluZztcbiAgICAgICAgaWYobGltaXQpe1xuICAgICAgICAgICAgaWYoZHg8MCl7XG4gICAgICAgICAgICAgICAgbm9kZXMuc29ydCgoYSxiKT0+YS5sb2NhdGlvbi54LWIubG9jYXRpb24ueCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBub2Rlcy5zb3J0KChhLGIpPT5iLmxvY2F0aW9uLngtYS5sb2NhdGlvbi54KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cbiAgICAgICAgdmFyIG1pblkgPSBkMy5taW4obm9kZXMsIGQ9PmQubG9jYXRpb24ueSk7XG4gICAgICAgIGlmKG1pblkgKyBkeSA8IHNlbGYuZ2V0Tm9kZU1pblkoKSl7XG4gICAgICAgICAgICBkeSA9IHNlbGYuZ2V0Tm9kZU1pblkoKSAtIG1pblk7XG4gICAgICAgIH1cblxuICAgICAgICBub2Rlcy5mb3JFYWNoKGQ9PntcbiAgICAgICAgICAgIGlmKGxpbWl0KXtcbiAgICAgICAgICAgICAgICBMYXlvdXQuYmFja3VwTm9kZUxvY2F0aW9uKGQpO1xuICAgICAgICAgICAgICAgIHZhciBtaW5YID0gc2VsZi5nZXROb2RlTWluWChkKTtcbiAgICAgICAgICAgICAgICB2YXIgbWF4WCA9IHNlbGYuZ2V0Tm9kZU1heFgoZCk7XG5cbiAgICAgICAgICAgICAgICBkLmxvY2F0aW9uLnggPSBNYXRoLm1pbihNYXRoLm1heChkLmxvY2F0aW9uLngrZHgsIG1pblgpLCBtYXhYKTtcbiAgICAgICAgICAgICAgICBkLmxvY2F0aW9uLnkgKz0gZHk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBkLmxvY2F0aW9uLnggKz1keDtcbiAgICAgICAgICAgICAgICBkLmxvY2F0aW9uLnkgKz0gZHk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG5cblxuICAgICAgICB2YXIgcmV2ZXJ0WCA9IHBpdm90ICYmIHNlbGYuY29uZmlnLmxpbWl0Tm9kZVBvc2l0aW9uaW5nICYmIChwaXZvdC5sb2NhdGlvbi54ID09PSBwaXZvdC4kbG9jYXRpb24ueCk7XG5cbiAgICAgICAgbm9kZXMuZm9yRWFjaChkPT57XG4gICAgICAgICAgICBpZihyZXZlcnRYKXtcbiAgICAgICAgICAgICAgICBkLmxvY2F0aW9uLnggPSBkLiRsb2NhdGlvbi54O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi50cmVlRGVzaWduZXIudXBkYXRlTm9kZVBvc2l0aW9uKGQpO1xuICAgICAgICB9KTtcblxuXG4gICAgfVxuXG4gICAgbW92ZVRleHRzKHRleHRzLCBkeCwgZHkpe1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIGxldCBsaW1pdCA9IHNlbGYuY29uZmlnLmxpbWl0VGV4dFBvc2l0aW9uaW5nO1xuICAgICAgICBpZihsaW1pdCl7XG4gICAgICAgICAgICBpZihkeDwwKXtcbiAgICAgICAgICAgICAgICB0ZXh0cy5zb3J0KChhLGIpPT5hLmxvY2F0aW9uLngtYi5sb2NhdGlvbi54KTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRleHRzLnNvcnQoKGEsYik9PmIubG9jYXRpb24ueC1hLmxvY2F0aW9uLngpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuXG4gICAgICAgIHRleHRzLmZvckVhY2goZD0+e1xuXG5cblxuXG4gICAgICAgICAgICBpZihsaW1pdCl7XG4gICAgICAgICAgICAgICAgbGV0IG1pblggPSBzZWxmLmdldFRleHRNaW5YKGQpO1xuICAgICAgICAgICAgICAgIGxldCBtYXhYID0gc2VsZi5nZXRUZXh0TWF4WChkKTtcbiAgICAgICAgICAgICAgICBsZXQgbWluWSA9IHNlbGYuZ2V0VGV4dE1pblkoZCk7XG5cblxuICAgICAgICAgICAgICAgIGQubG9jYXRpb24ueCA9IE1hdGgubWluKE1hdGgubWF4KGQubG9jYXRpb24ueCtkeCwgbWluWCksIG1heFgpO1xuICAgICAgICAgICAgICAgIGQubG9jYXRpb24ueSA9IE1hdGgubWF4KGQubG9jYXRpb24ueStkeSwgbWluWSk7XG5cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGQubG9jYXRpb24ubW92ZShkeCwgZHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi50cmVlRGVzaWduZXIudXBkYXRlVGV4dFBvc2l0aW9uKGQpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgc3RhdGljIGJhY2t1cE5vZGVMb2NhdGlvbihub2RlKSB7XG4gICAgICAgIG5vZGUuJGxvY2F0aW9uID0gbmV3IG1vZGVsLlBvaW50KG5vZGUubG9jYXRpb24pO1xuICAgIH1cblxuICAgIF9maXJlT25BdXRvTGF5b3V0Q2hhbmdlZENhbGxiYWNrcygpe1xuICAgICAgICB0aGlzLm9uQXV0b0xheW91dENoYW5nZWQuZm9yRWFjaChjPT5jKHRoaXMuY29uZmlnLnR5cGUpKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2V0SGFuZ2luZ1Bvc2l0aW9uKHNlbGVjdGlvbil7XG4gICAgICAgIC8vIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgIC8vICAgICBzZWxlY3Rpb24uZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAvLyAgICAgICAgIHZhciBoID0gIHRoaXMuZ2V0QkJveCgpLmhlaWdodDtcbiAgICAgICAgLy8gICAgICAgICBkMy5zZWxlY3QodGhpcykuYXR0cignZHknLCBoKTtcbiAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAvLyB9LDApO1xuXG4gICAgICAgIGlmKEFwcFV0aWxzLmlzSGlkZGVuKHNlbGVjdGlvbi5ub2RlKCkpKXsgLy8gc2V0dGluZyBoYW5naW5nIHBvc2l0aW9uIG9mIGhpZGRlbiBlbGVtZW50cyBmYWlscyBvbiBmaXJlZm94XG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0aW9uO1xuICAgICAgICB9XG5cblxuICAgICAgICBzZWxlY3Rpb24uZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIGggPSAgdGhpcy5nZXRCQm94KCkuaGVpZ2h0O1xuICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLmF0dHIoJ2R5JywgJzAuNzVlbScpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc2VsZWN0aW9uO1xuICAgIH1cblxufVxuXG5cbiIsImltcG9ydCB7QXBwVXRpbHN9IGZyb20gJy4vYXBwLXV0aWxzJ1xuaW1wb3J0ICogYXMgZDMgZnJvbSAnLi9kMydcbmltcG9ydCB7Q29udGV4dE1lbnV9IGZyb20gJy4vY29udGV4dC1tZW51L2NvbnRleHQtbWVudSdcblxuZXhwb3J0IGNsYXNzIE5vZGVEcmFnSGFuZGxlcntcblxuICAgIHRyZWVEZXNpZ25lcjtcbiAgICBkYXRhO1xuICAgIGNvbmZpZztcblxuICAgIGRyYWc7XG4gICAgc3RhdGVTbmFwc2hvdCA9IG51bGw7XG5cblxuICAgIGNvbnN0cnVjdG9yKHRyZWVEZXNpZ25lciwgZGF0YSl7XG4gICAgICAgIHRoaXMudHJlZURlc2lnbmVyID0gdHJlZURlc2lnbmVyO1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5kcmFnID0gZDMuZHJhZygpXG4gICAgICAgICAgICAuc3ViamVjdChmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgICAgaWYoZD09bnVsbCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAge1xuICAgICAgICAgICAgICAgICAgICAgICAgeDogZXZlbnQueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IGV2ZW50LnlcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHQgPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgeDogdC5hdHRyKFwieFwiKSArIEFwcFV0aWxzLmdldFRyYW5zbGF0aW9uKHQuYXR0cihcInRyYW5zZm9ybVwiKSlbMF0sXG4gICAgICAgICAgICAgICAgICAgIHk6IHQuYXR0cihcInlcIikgKyBBcHBVdGlscy5nZXRUcmFuc2xhdGlvbih0LmF0dHIoXCJ0cmFuc2Zvcm1cIikpWzFdXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oXCJzdGFydFwiLCBmdW5jdGlvbihkKXtcbiAgICAgICAgICAgICAgICBzZWxmLmRyYWdTdGFydGVkLmNhbGwodGhpcyxkLCBzZWxmKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbihcImRyYWdcIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICBzZWxmLm9uRHJhZy5jYWxsKHRoaXMsIGQsIHNlbGYpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbihcImVuZFwiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHNlbGYuZHJhZ0VuZGVkLmNhbGwodGhpcywgZCwgc2VsZik7XG4gICAgICAgICAgICB9KVxuICAgIH1cblxuXG4gICAgZHJhZ1N0YXJ0ZWQoZCxzZWxmKSB7XG4gICAgICAgIGlmKHNlbGYuaWdub3JlRHJhZyl7XG4gICAgICAgICAgICBzZWxmLmlnbm9yZURyYWc9ZmFsc2U7XG4gICAgICAgICAgICBzZWxmLmlnbm9yZWREcmFnPXRydWU7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5pZ25vcmVkRHJhZz1mYWxzZTtcbiAgICAgICAgc2VsZi5zdGF0ZVNuYXBzaG90ID0gc2VsZi5kYXRhLmNyZWF0ZVN0YXRlU25hcHNob3QoKTtcblxuICAgICAgICAvLyBzZWxmLnRyZWVEZXNpZ25lci5sYXlvdXQuZGlzYWJsZUF1dG9MYXlvdXQoKTtcbiAgICAgICAgQ29udGV4dE1lbnUuaGlkZSgpO1xuICAgICAgICB2YXIgbm9kZSA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgaWYoIW5vZGUuY2xhc3NlZChcInNlbGVjdGVkXCIpKXtcbiAgICAgICAgICAgIHNlbGYudHJlZURlc2lnbmVyLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICBzZWxmLnRyZWVEZXNpZ25lci5zZWxlY3ROb2RlKGQpO1xuICAgICAgICBub2RlLmNsYXNzZWQoXCJzZWxlY3RlZCBkcmFnZ2luZ1wiLCB0cnVlKTtcbiAgICAgICAgc2VsZi5zZWxlY3RlZE5vZGVzID0gc2VsZi50cmVlRGVzaWduZXIuZ2V0U2VsZWN0ZWROb2Rlcyh0cnVlKTtcbiAgICAgICAgc2VsZi5wcmV2RHJhZ0V2ZW50ID0gZDMuZXZlbnQ7XG4gICAgICAgIHNlbGYuZHJhZ0V2ZW50Q291bnQgPSAwO1xuICAgIH1cblxuICAgIG9uRHJhZyhkcmFnZ2VkTm9kZSwgc2VsZil7XG4gICAgICAgIGlmKHNlbGYuaWdub3JlZERyYWcpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoc2VsZi5kcmFnRXZlbnRDb3VudD09PTIgJiYgc2VsZi5zdGF0ZVNuYXBzaG90KXtcbiAgICAgICAgICAgIHNlbGYuZGF0YS5zYXZlU3RhdGVGcm9tU25hcHNob3Qoc2VsZi5zdGF0ZVNuYXBzaG90KTsgLy8gVE9ETyBzYXZlIG9ubHkgaWYgc29tZXRoaW5nIGhhcyByZWFsbHkgY2hhbmdlZFxuICAgICAgICAgICAgc2VsZi5zdGF0ZVNuYXBzaG90ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBzZWxmLmRyYWdFdmVudENvdW50Kys7XG4gICAgICAgIGlmKHNlbGYuc2VsZWN0ZWROb2Rlcy5sZW5ndGg+NSAmJiBzZWxmLmRyYWdFdmVudENvdW50JTIhPT0xKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBkeCA9IGQzLmV2ZW50LnggLSBzZWxmLnByZXZEcmFnRXZlbnQueDtcbiAgICAgICAgdmFyIGR5ID0gZDMuZXZlbnQueS0gc2VsZi5wcmV2RHJhZ0V2ZW50Lnk7XG4gICAgICAgIHNlbGYudHJlZURlc2lnbmVyLmxheW91dC5tb3ZlTm9kZXMoc2VsZi5zZWxlY3RlZE5vZGVzLCBkeCwgZHksIGRyYWdnZWROb2RlKTtcblxuXG4gICAgICAgIHNlbGYucHJldkRyYWdFdmVudCA9IGQzLmV2ZW50O1xuICAgICAgICBzZWxmLnRyZWVEZXNpZ25lci5yZWRyYXdFZGdlcygpO1xuICAgICAgICBzZWxmLnRyZWVEZXNpZ25lci51cGRhdGVQbG90dGluZ1JlZ2lvblNpemUoKTtcbiAgICB9XG5cbiAgICBkcmFnRW5kZWQoZHJhZ2dlZE5vZGUsIHNlbGYpe1xuICAgICAgICB2YXIgbm9kZSA9IGQzLnNlbGVjdCh0aGlzKS5jbGFzc2VkKFwiZHJhZ2dpbmdcIiwgZmFsc2UpO1xuICAgICAgICBpZihzZWxmLmlnbm9yZWREcmFnKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzZWxmLnRyZWVEZXNpZ25lci5sYXlvdXQudXBkYXRlKGRyYWdnZWROb2RlKVxuICAgIH1cblxuICAgIGNhbmNlbERyYWcoKXtcbiAgICAgICAgdGhpcy5pZ25vcmVEcmFnID0gdHJ1ZTtcbiAgICB9XG5cbn1cblxuXG4iLCJ2YXIgZXBzaWxvbiA9IDFlLTEyO1xudmFyIHBpID0gTWF0aC5QSTtcbnZhciBoYWxmUGkgPSBwaSAvIDI7XG52YXIgdGF1ID0gMiAqIHBpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgLypkcmF3OiBmdW5jdGlvbihjb250ZXh0LCBzaXplKSB7XG4gICAgICAgIHZhciByID0gTWF0aC5zcXJ0KHNpemUgLyBwaSk7XG4gICAgICAgIGNvbnRleHQubW92ZVRvKHIsIDApO1xuICAgICAgICBjb250ZXh0LmFyYygwLCAwLCByLCAwLCB0YXUpO1xuICAgIH0qL1xuICAgIGRyYXc6IGZ1bmN0aW9uKGNvbnRleHQsIHNpemUpIHtcblxuICAgICAgICB2YXIgciA9IE1hdGguc3FydChzaXplIC8gcGkpO1xuICAgICAgICB2YXIgZGlzdCA9MC41NTIyODQ3NDk4MzEgKiByO1xuXG4gICAgICAgIGNvbnRleHQubW92ZVRvKC1yLCAwKVxuICAgICAgICAvLyBjb250ZXh0LmxpbmVUbygyKnIsIDIqcilcbiAgICAgICAgLy8gY29udGV4dC5iZXppZXJDdXJ2ZVRvKC1yLCAtZGlzdCwgLWRpc3QsIC1yLCAwLC1yKTtcbiAgICAgICAgY29udGV4dC5iZXppZXJDdXJ2ZVRvKC1yLCAtZGlzdCwgLWRpc3QsIC1yLCAwLC1yKTtcblxuICAgICAgICBjb250ZXh0LmJlemllckN1cnZlVG8oZGlzdCwgLXIsIHIsIC1kaXN0LCByLDApO1xuXG4gICAgICAgIGNvbnRleHQuYmV6aWVyQ3VydmVUbyhyLCBkaXN0LCBkaXN0LCByLCAwLCByKTtcblxuICAgICAgICBjb250ZXh0LmJlemllckN1cnZlVG8oLWRpc3QsIHIsIC1yLCBkaXN0LCAtciwgMCk7XG4gICAgfVxufTtcbiIsInZhciBzcXJ0MyA9IE1hdGguc3FydCgzKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGRyYXc6IGZ1bmN0aW9uKGNvbnRleHQsIHNpemUpIHtcbiAgICAgICAgdmFyIHIgPSBNYXRoLnNxcnQoc2l6ZSAvIE1hdGguUEkpO1xuICAgICAgICBjb250ZXh0Lm1vdmVUbygtciwgMCk7XG4gICAgICAgIGNvbnRleHQubGluZVRvKDAuOSpyLCAtcik7XG4gICAgICAgIGNvbnRleHQubGluZVRvKDAuOSpyLCByKTtcbiAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICB9XG59O1xuIiwiaW1wb3J0IHtVdGlsc30gZnJvbSBcInNkLXV0aWxzXCI7XG5pbXBvcnQge2kxOG59IGZyb20gJy4vaTE4bi9pMThuJ1xuXG5leHBvcnQgY2xhc3MgVGVtcGxhdGVze1xuXG4gICAgc3RhdGljIGdyb3dsID0gcmVxdWlyZSgnLi90ZW1wbGF0ZXMvZ3Jvd2xfbWVzc2FnZS5odG1sJyk7XG5cbiAgICBzdGF0aWMgZ2V0KHRlbXBsYXRlTmFtZSwgdmFyaWFibGVzKXtcbiAgICAgICAgdmFyIGNvbXBpbGVkID0gVXRpbHMudGVtcGxhdGUoVGVtcGxhdGVzW3RlbXBsYXRlTmFtZV0seyAnaW1wb3J0cyc6IHsgJ2kxOG4nOiBpMThuLCAnVGVtcGxhdGVzJzogVGVtcGxhdGVzLCAnaW5jbHVkZSc6IGZ1bmN0aW9uKG4sIHYpIHtyZXR1cm4gVGVtcGxhdGVzLmdldChuLCB2KX0gfSB9KTtcbiAgICAgICAgaWYodmFyaWFibGVzKXtcbiAgICAgICAgICAgIHZhcmlhYmxlcy52YXJpYWJsZXMgPSB2YXJpYWJsZXM7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdmFyaWFibGVzID0ge3ZhcmlhYmxlczp7fX1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29tcGlsZWQodmFyaWFibGVzKVxuXG4gICAgfVxuXG4gICAgc3RhdGljIHN0eWxlUnVsZShzZWxlY3RvciwgcHJvcHMpe1xuICAgICAgICB2YXIgcyA9IHNlbGVjdG9yKyAneyc7XG4gICAgICAgIHByb3BzLmZvckVhY2gocD0+IHMrPVRlbXBsYXRlcy5zdHlsZVByb3AocFswXSwgcFsxXSkpO1xuICAgICAgICBzKz0nfSAnO1xuICAgICAgICByZXR1cm4gcztcbiAgICB9XG4gICAgc3RhdGljIHN0eWxlUHJvcChzdHlsZU5hbWUsIHZhcmlhYmxlTmFtZSl7XG4gICAgICAgIHJldHVybiAgc3R5bGVOYW1lKyc6IDwlPSAnK3ZhcmlhYmxlTmFtZSsnICU+OyAnXG4gICAgfVxuXG4gICAgc3RhdGljIHRyZWVEZXNpZ25lclNlbGVjdG9yID0gJ3N2Zy5zZC10cmVlLWRlc2lnbmVyJztcbiAgICBzdGF0aWMgbm9kZVNlbGVjdG9yKHR5cGUsIGNsYXp6KXtcbiAgICAgICAgdmFyIHMgPSBUZW1wbGF0ZXMudHJlZURlc2lnbmVyU2VsZWN0b3IrJyAubm9kZSc7XG4gICAgICAgIGlmKHR5cGUpe1xuICAgICAgICAgICAgcys9Jy4nK3R5cGUrJy1ub2RlJztcbiAgICAgICAgfVxuICAgICAgICBpZihjbGF6eil7XG4gICAgICAgICAgICBzKz0nLicrY2xheno7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHM7XG4gICAgfVxuICAgIHN0YXRpYyBlZGdlU2VsZWN0b3IoY2xhenope1xuICAgICAgICB2YXIgcyA9IFRlbXBsYXRlcy50cmVlRGVzaWduZXJTZWxlY3RvcisnIC5lZGdlJztcbiAgICAgICAgaWYoY2xhenope1xuICAgICAgICAgICAgcys9Jy4nK2NsYXp6O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzO1xuICAgIH1cblxuICAgIHN0YXRpYyB0cmVlRGVzaWduZXJTdHlsZXMgPVxuXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLnRyZWVEZXNpZ25lclNlbGVjdG9yLFtcbiAgICAgICAgICAgIFsnZm9udC1zaXplJywgJ2ZvbnRTaXplJ10sXG4gICAgICAgICAgICBbJ2ZvbnQtZmFtaWx5JywgJ2ZvbnRGYW1pbHknXSxcbiAgICAgICAgICAgIFsnZm9udC13ZWlnaHQnLCAnZm9udFdlaWdodCddLFxuICAgICAgICAgICAgWydmb250LXN0eWxlJywgJ2ZvbnRTdHlsZSddXG4gICAgICAgIF0pK1xuICAgICAgICAvLyAgIG5vZGVcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCkrJyBwYXRoJyxbXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnbm9kZS5maWxsJ10sXG4gICAgICAgICAgICBbJ3N0cm9rZS13aWR0aCcsICdub2RlLnN0cm9rZVdpZHRoJ11cbiAgICAgICAgXSkrXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLm5vZGVTZWxlY3RvcignZGVjaXNpb24nLCAnb3B0aW1hbCcpKycgcGF0aCwgJytUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCdjaGFuY2UnLCAnb3B0aW1hbCcpKycgcGF0aCwnICtUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCd0ZXJtaW5hbCcsICdvcHRpbWFsJykrJyBwYXRoJyxbXG4gICAgICAgICAgICBbJ3N0cm9rZScsICdub2RlLm9wdGltYWwuc3Ryb2tlJ10sXG4gICAgICAgICAgICBbJ3N0cm9rZS13aWR0aCcsICdub2RlLm9wdGltYWwuc3Ryb2tlV2lkdGgnXVxuICAgICAgICBdKStcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCkrJyAubGFiZWwnLFtcbiAgICAgICAgICAgIFsnZm9udC1zaXplJywgJ25vZGUubGFiZWwuZm9udFNpemUnXSxcbiAgICAgICAgICAgIFsnZmlsbCcsICdub2RlLmxhYmVsLmNvbG9yJ11cbiAgICAgICAgXSkrXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLm5vZGVTZWxlY3RvcigpKycgLnBheW9mZicsW1xuICAgICAgICAgICAgWydmb250LXNpemUnLCAnbm9kZS5wYXlvZmYuZm9udFNpemUnXSxcbiAgICAgICAgICAgIFsnZmlsbCcsICdub2RlLnBheW9mZi5jb2xvciddLFxuICAgICAgICBdKStcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCkrJyAucGF5b2ZmLm5lZ2F0aXZlJyxbXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnbm9kZS5wYXlvZmYubmVnYXRpdmVDb2xvciddLFxuICAgICAgICBdKStcblxuICAgICAgICAvLyAgICBkZWNpc2lvbiBub2RlXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLm5vZGVTZWxlY3RvcignZGVjaXNpb24nKSsnIHBhdGgnLFtcbiAgICAgICAgICAgIFsnZmlsbCcsICdub2RlLmRlY2lzaW9uLmZpbGwnXSxcbiAgICAgICAgICAgIFsnc3Ryb2tlJywgJ25vZGUuZGVjaXNpb24uc3Ryb2tlJ11cbiAgICAgICAgXSkrXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLm5vZGVTZWxlY3RvcignZGVjaXNpb24nLCAnc2VsZWN0ZWQnKSsnIHBhdGgnLFtcbiAgICAgICAgICAgIFsnZmlsbCcsICdub2RlLmRlY2lzaW9uLnNlbGVjdGVkLmZpbGwnXVxuICAgICAgICBdKStcblxuICAgICAgICAvLyAgICBjaGFuY2Ugbm9kZVxuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5ub2RlU2VsZWN0b3IoJ2NoYW5jZScpKycgcGF0aCcsW1xuICAgICAgICAgICAgWydmaWxsJywgJ25vZGUuY2hhbmNlLmZpbGwnXSxcbiAgICAgICAgICAgIFsnc3Ryb2tlJywgJ25vZGUuY2hhbmNlLnN0cm9rZSddXG4gICAgICAgIF0pK1xuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5ub2RlU2VsZWN0b3IoJ2NoYW5jZScsICdzZWxlY3RlZCcpKycgcGF0aCcsW1xuICAgICAgICAgICAgWydmaWxsJywgJ25vZGUuY2hhbmNlLnNlbGVjdGVkLmZpbGwnXVxuICAgICAgICBdKStcblxuICAgICAgICAvLyAgICB0ZXJtaW5hbCBub2RlXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLm5vZGVTZWxlY3RvcigndGVybWluYWwnKSsnIHBhdGgnLFtcbiAgICAgICAgICAgIFsnZmlsbCcsICdub2RlLnRlcm1pbmFsLmZpbGwnXSxcbiAgICAgICAgICAgIFsnc3Ryb2tlJywgJ25vZGUudGVybWluYWwuc3Ryb2tlJ11cbiAgICAgICAgXSkrXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLm5vZGVTZWxlY3RvcigndGVybWluYWwnLCAnc2VsZWN0ZWQnKSsnIHBhdGgnLFtcbiAgICAgICAgICAgIFsnZmlsbCcsICdub2RlLnRlcm1pbmFsLnNlbGVjdGVkLmZpbGwnXVxuICAgICAgICBdKStcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCd0ZXJtaW5hbCcpKycgLmFnZ3JlZ2F0ZWQtcGF5b2ZmJyxbXG4gICAgICAgICAgICBbJ2ZvbnQtc2l6ZScsICdub2RlLnRlcm1pbmFsLnBheW9mZi5mb250U2l6ZSddLFxuICAgICAgICAgICAgWydmaWxsJywgJ25vZGUudGVybWluYWwucGF5b2ZmLmNvbG9yJ10sXG4gICAgICAgIF0pK1xuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5ub2RlU2VsZWN0b3IoJ3Rlcm1pbmFsJykrJyAuYWdncmVnYXRlZC1wYXlvZmYubmVnYXRpdmUnLFtcbiAgICAgICAgICAgIFsnZmlsbCcsICdub2RlLnRlcm1pbmFsLnBheW9mZi5uZWdhdGl2ZUNvbG9yJ10sXG4gICAgICAgIF0pK1xuXG5cbiAgICAgICAgLy9wcm9iYWJpbGl0eVxuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy50cmVlRGVzaWduZXJTZWxlY3RvcisnIC5ub2RlIC5wcm9iYWJpbGl0eS10by1lbnRlciwgJytUZW1wbGF0ZXMudHJlZURlc2lnbmVyU2VsZWN0b3IrJyAuZWRnZSAucHJvYmFiaWxpdHknLFtcbiAgICAgICAgICAgIFsnZm9udC1zaXplJywgJ3Byb2JhYmlsaXR5LmZvbnRTaXplJ10sXG4gICAgICAgICAgICBbJ2ZpbGwnLCAncHJvYmFiaWxpdHkuY29sb3InXVxuICAgICAgICBdKStcblxuICAgICAgICAvL2VkZ2VcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMuZWRnZVNlbGVjdG9yKCkrJyBwYXRoJyxbXG4gICAgICAgICAgICBbJ3N0cm9rZScsICdlZGdlLnN0cm9rZSddLFxuICAgICAgICAgICAgWydzdHJva2Utd2lkdGgnLCAnZWRnZS5zdHJva2VXaWR0aCddXG4gICAgICAgIF0pK1xuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy50cmVlRGVzaWduZXJTZWxlY3RvcisnIG1hcmtlciNhcnJvdyBwYXRoJyxbXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnZWRnZS5zdHJva2UnXSxcbiAgICAgICAgXSkrXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLmVkZ2VTZWxlY3Rvcignb3B0aW1hbCcpKycgcGF0aCcsW1xuICAgICAgICAgICAgWydzdHJva2UnLCAnZWRnZS5vcHRpbWFsLnN0cm9rZSddLFxuICAgICAgICAgICAgWydzdHJva2Utd2lkdGgnLCAnZWRnZS5vcHRpbWFsLnN0cm9rZVdpZHRoJ11cbiAgICAgICAgXSkrXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLnRyZWVEZXNpZ25lclNlbGVjdG9yKycgbWFya2VyI2Fycm93LW9wdGltYWwgcGF0aCcsW1xuICAgICAgICAgICAgWydmaWxsJywgJ2VkZ2Uub3B0aW1hbC5zdHJva2UnXSxcbiAgICAgICAgXSkrXG5cbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMuZWRnZVNlbGVjdG9yKCdzZWxlY3RlZCcpKycgcGF0aCcsW1xuICAgICAgICAgICAgWydzdHJva2UnLCAnZWRnZS5zZWxlY3RlZC5zdHJva2UnXSxcbiAgICAgICAgICAgIFsnc3Ryb2tlLXdpZHRoJywgJ2VkZ2Uuc2VsZWN0ZWQuc3Ryb2tlV2lkdGgnXVxuICAgICAgICBdKStcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMudHJlZURlc2lnbmVyU2VsZWN0b3IrJyBtYXJrZXIjYXJyb3ctc2VsZWN0ZWQgcGF0aCcsW1xuICAgICAgICAgICAgWydmaWxsJywgJ2VkZ2Uuc2VsZWN0ZWQuc3Ryb2tlJ10sXG4gICAgICAgIF0pK1xuXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLmVkZ2VTZWxlY3RvcigpKycgLmxhYmVsJyxbXG4gICAgICAgICAgICBbJ2ZvbnQtc2l6ZScsICdlZGdlLmxhYmVsLmZvbnRTaXplJ10sXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnZWRnZS5sYWJlbC5jb2xvciddXG4gICAgICAgIF0pK1xuXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLmVkZ2VTZWxlY3RvcigpKycgLnBheW9mZicsW1xuICAgICAgICAgICAgWydmb250LXNpemUnLCAnZWRnZS5wYXlvZmYuZm9udFNpemUnXSxcbiAgICAgICAgICAgIFsnZmlsbCcsICdlZGdlLnBheW9mZi5jb2xvciddLFxuICAgICAgICBdKStcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMuZWRnZVNlbGVjdG9yKCkrJyAucGF5b2ZmLm5lZ2F0aXZlJyxbXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnZWRnZS5wYXlvZmYubmVnYXRpdmVDb2xvciddLFxuICAgICAgICBdKStcblxuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy50cmVlRGVzaWduZXJTZWxlY3RvcisnIC5zZC10aXRsZS1jb250YWluZXIgdGV4dC5zZC10aXRsZScsW1xuICAgICAgICAgICAgWydmb250LXNpemUnLCAndGl0bGUuZm9udFNpemUnXSxcbiAgICAgICAgICAgIFsnZm9udC13ZWlnaHQnLCAndGl0bGUuZm9udFdlaWdodCddLFxuICAgICAgICAgICAgWydmb250LXN0eWxlJywgJ3RpdGxlLmZvbnRTdHlsZSddLFxuICAgICAgICAgICAgWydmaWxsJywgJ3RpdGxlLmNvbG9yJ11cbiAgICAgICAgXSkgK1xuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy50cmVlRGVzaWduZXJTZWxlY3RvcisnIC5zZC10aXRsZS1jb250YWluZXIgdGV4dC5zZC1kZXNjcmlwdGlvbicsW1xuICAgICAgICAgICAgWydmb250LXNpemUnLCAnZGVzY3JpcHRpb24uZm9udFNpemUnXSxcbiAgICAgICAgICAgIFsnZm9udC13ZWlnaHQnLCAnZGVzY3JpcHRpb24uZm9udFdlaWdodCddLFxuICAgICAgICAgICAgWydmb250LXN0eWxlJywgJ2Rlc2NyaXB0aW9uLmZvbnRTdHlsZSddLFxuICAgICAgICAgICAgWydmaWxsJywgJ2Rlc2NyaXB0aW9uLmNvbG9yJ11cbiAgICAgICAgXSlcbn1cblxuXG5cblxuIiwibW9kdWxlLmV4cG9ydHMgPSBcIm1vZHVsZS5leHBvcnRzID0gXFxcIjxkaXYgY2xhc3M9XFxcXFxcXCJzZC1ncm93bC1tZXNzYWdlIDwlPXR5cGUlPlxcXFxcXFwiPlxcXFxuICAgIDxkaXYgY2xhc3M9XFxcXFxcXCJzZC1ncm93bC1tZXNzYWdlLXRleHRcXFxcXFxcIj5cXFxcbiAgICAgICAgPCU9IG1lc3NhZ2UgJT5cXFxcbiAgICA8L2Rpdj5cXFxcbjwvZGl2PlxcXFxuXFxcIjtcXG5cIjtcbiIsImltcG9ydCB7QXBwVXRpbHN9IGZyb20gJy4vYXBwLXV0aWxzJ1xuaW1wb3J0ICogYXMgZDMgZnJvbSAnLi9kMydcbmltcG9ydCB7Q29udGV4dE1lbnV9IGZyb20gJy4vY29udGV4dC1tZW51L2NvbnRleHQtbWVudSdcblxuZXhwb3J0IGNsYXNzIFRleHREcmFnSGFuZGxlcntcblxuICAgIHRyZWVEZXNpZ25lcjtcbiAgICBkYXRhO1xuICAgIGNvbmZpZztcblxuICAgIGRyYWc7XG5cblxuICAgIGNvbnN0cnVjdG9yKHRyZWVEZXNpZ25lciwgZGF0YSl7XG4gICAgICAgIHRoaXMudHJlZURlc2lnbmVyID0gdHJlZURlc2lnbmVyO1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5kcmFnID0gZDMuZHJhZygpXG4gICAgICAgICAgICAuc3ViamVjdChmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgICAgaWYoZD09bnVsbCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAge1xuICAgICAgICAgICAgICAgICAgICAgICAgeDogZXZlbnQueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IGV2ZW50LnlcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHQgPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgeDogdC5hdHRyKFwieFwiKSArIEFwcFV0aWxzLmdldFRyYW5zbGF0aW9uKHQuYXR0cihcInRyYW5zZm9ybVwiKSlbMF0sXG4gICAgICAgICAgICAgICAgICAgIHk6IHQuYXR0cihcInlcIikgKyBBcHBVdGlscy5nZXRUcmFuc2xhdGlvbih0LmF0dHIoXCJ0cmFuc2Zvcm1cIikpWzFdXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oXCJzdGFydFwiLCBmdW5jdGlvbihkKXtcbiAgICAgICAgICAgICAgICBzZWxmLmRyYWdTdGFydGVkLmNhbGwodGhpcyxkLCBzZWxmKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbihcImRyYWdcIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICBzZWxmLm9uRHJhZy5jYWxsKHRoaXMsIGQsIHNlbGYpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbihcImVuZFwiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHNlbGYuZHJhZ0VuZGVkLmNhbGwodGhpcywgZCwgc2VsZik7XG4gICAgICAgICAgICB9KVxuICAgIH1cblxuXG4gICAgZHJhZ1N0YXJ0ZWQoZCxzZWxmKSB7XG4gICAgICAgIC8vIHNlbGYudHJlZURlc2lnbmVyLmxheW91dC5kaXNhYmxlQXV0b0xheW91dCgpO1xuICAgICAgICBDb250ZXh0TWVudS5oaWRlKCk7XG4gICAgICAgIHZhciB0ZXh0ID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICBpZighdGV4dC5jbGFzc2VkKFwic2VsZWN0ZWRcIikpe1xuICAgICAgICAgICAgc2VsZi50cmVlRGVzaWduZXIuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNlbGYudHJlZURlc2lnbmVyLnNlbGVjdFRleHQoZCk7XG4gICAgICAgIHRleHQuY2xhc3NlZChcInNlbGVjdGVkIGRyYWdnaW5nXCIsIHRydWUpO1xuICAgICAgICBzZWxmLnNlbGVjdGVkTm9kZXMgPSBzZWxmLnRyZWVEZXNpZ25lci5nZXRTZWxlY3RlZE5vZGVzKCk7XG4gICAgICAgIHNlbGYucHJldkRyYWdFdmVudCA9IGQzLmV2ZW50O1xuICAgICAgICBzZWxmLmRyYWdFdmVudENvdW50ID0gMDtcbiAgICB9XG5cbiAgICBvbkRyYWcoZHJhZ2dlZFRleHQsIHNlbGYpe1xuICAgICAgICBpZihzZWxmLmRyYWdFdmVudENvdW50PT0yKXtcbiAgICAgICAgICAgIHNlbGYuZGF0YS5zYXZlU3RhdGUoKTtcbiAgICAgICAgfVxuICAgICAgICBzZWxmLmRyYWdFdmVudENvdW50Kys7XG5cbiAgICAgICAgdmFyIGR4ID0gZDMuZXZlbnQueCAtIHNlbGYucHJldkRyYWdFdmVudC54O1xuICAgICAgICB2YXIgZHkgPSBkMy5ldmVudC55LSBzZWxmLnByZXZEcmFnRXZlbnQueTtcblxuICAgICAgICBzZWxmLnRyZWVEZXNpZ25lci5sYXlvdXQubW92ZVRleHRzKFtkcmFnZ2VkVGV4dF0sIGR4LCBkeSk7XG5cbiAgICAgICAgc2VsZi5wcmV2RHJhZ0V2ZW50ID0gZDMuZXZlbnQ7XG4gICAgICAgIHNlbGYudHJlZURlc2lnbmVyLnVwZGF0ZVBsb3R0aW5nUmVnaW9uU2l6ZSgpO1xuICAgIH1cblxuICAgIGRyYWdFbmRlZChkcmFnZ2VkTm9kZSwgc2VsZil7XG4gICAgICAgICBkMy5zZWxlY3QodGhpcykuY2xhc3NlZChcImRyYWdnaW5nXCIsIGZhbHNlKTtcbiAgICB9XG5cbn1cblxuXG4iLCJpbXBvcnQgKiBhcyBkMyBmcm9tICcuL2QzJ1xuaW1wb3J0IHtVdGlsc30gZnJvbSAnc2QtdXRpbHMnXG5cbmV4cG9ydCBjbGFzcyBUb29sdGlwIHtcbiAgICBzdGF0aWMgZ2V0Q29udGFpbmVyKCl7XG4gICAgICAgIHJldHVybiBkMy5zZWxlY3QoXCJib2R5XCIpLnNlbGVjdE9yQXBwZW5kKCdkaXYuc2QtdG9vbHRpcCcpO1xuICAgIH1cblxuICAgIHN0YXRpYyBzaG93KGh0bWwsIHhPZmZzZXQgPSA1LCB5T2Zmc2V0ID0gMjgsIGV2ZW50LCBkdXJhdGlvbj1udWxsKSB7XG4gICAgICAgIHZhciBjb250YWluZXIgPSBUb29sdGlwLmdldENvbnRhaW5lcigpXG4gICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIDApO1xuICAgICAgICBjb250YWluZXIudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24oMjAwKVxuICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCAuOTgpO1xuICAgICAgICBjb250YWluZXIuaHRtbChodG1sKTtcbiAgICAgICAgVG9vbHRpcC51cGRhdGVQb3NpdGlvbih4T2Zmc2V0LCB5T2Zmc2V0LCBldmVudCk7XG4gICAgICAgIGlmKGR1cmF0aW9uKXtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBUb29sdGlwLmhpZGUoKTtcbiAgICAgICAgICAgIH0sIGR1cmF0aW9uKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIHVwZGF0ZVBvc2l0aW9uKHhPZmZzZXQgPSA1LCB5T2Zmc2V0ID0gMjgsIGV2ZW50KSB7XG4gICAgICAgIGV2ZW50ID0gZXZlbnQgfHwgZDMuZXZlbnQ7XG4gICAgICAgIFRvb2x0aXAuZ2V0Q29udGFpbmVyKClcbiAgICAgICAgICAgIC5zdHlsZShcImxlZnRcIiwgKGV2ZW50LnBhZ2VYICsgeE9mZnNldCkgKyBcInB4XCIpXG4gICAgICAgICAgICAuc3R5bGUoXCJ0b3BcIiwgKGV2ZW50LnBhZ2VZIC0geU9mZnNldCkgKyBcInB4XCIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBoaWRlKGR1cmF0aW9uID0gNTAwKSB7XG4gICAgICAgIHZhciB0ID0gVG9vbHRpcC5nZXRDb250YWluZXIoKTtcbiAgICAgICAgaWYoZHVyYXRpb24pe1xuICAgICAgICAgICAgdCA9IHQudHJhbnNpdGlvbigpLmR1cmF0aW9uKGR1cmF0aW9uKVxuICAgICAgICB9XG4gICAgICAgIHQuc3R5bGUoXCJvcGFjaXR5XCIsIDApO1xuICAgIH1cblxuICAgIHN0YXRpYyBhdHRhY2godGFyZ2V0LCBodG1sT3JGbiwgeE9mZnNldCwgeU9mZnNldCkge1xuICAgICAgICB0YXJnZXQub24oJ21vdXNlb3ZlcicsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICB2YXIgaHRtbCA9IG51bGw7XG4gICAgICAgICAgICBpZiAoVXRpbHMuaXNGdW5jdGlvbihodG1sT3JGbikpIHtcbiAgICAgICAgICAgICAgICBodG1sID0gaHRtbE9yRm4oZCwgaSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGh0bWwgPSBodG1sT3JGbjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGh0bWwgIT09IG51bGwgJiYgaHRtbCAhPT0gdW5kZWZpbmVkICYmIGh0bWwgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgVG9vbHRpcC5zaG93KGh0bWwsIHhPZmZzZXQsIHlPZmZzZXQpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgVG9vbHRpcC5oaWRlKDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pLm9uKCdtb3VzZW1vdmUnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgVG9vbHRpcC51cGRhdGVQb3NpdGlvbih4T2Zmc2V0LCB5T2Zmc2V0KTtcbiAgICAgICAgfSkub24oXCJtb3VzZW91dFwiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgVG9vbHRpcC5oaWRlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCAqIGFzIGQzIGZyb20gXCIuL2QzXCI7XG5pbXBvcnQge1V0aWxzfSBmcm9tIFwic2QtdXRpbHNcIjtcbmltcG9ydCB7QXBwVXRpbHN9IGZyb20gXCIuL2FwcC11dGlsc1wiO1xuaW1wb3J0IHtkb21haW4gYXMgbW9kZWx9IGZyb20gXCJzZC1tb2RlbFwiO1xuaW1wb3J0IHtDb250ZXh0TWVudX0gZnJvbSBcIi4vY29udGV4dC1tZW51L2NvbnRleHQtbWVudVwiO1xuaW1wb3J0IHtNYWluQ29udGV4dE1lbnV9IGZyb20gXCIuL2NvbnRleHQtbWVudS9tYWluLWNvbnRleHQtbWVudVwiO1xuaW1wb3J0IHtOb2RlQ29udGV4dE1lbnV9IGZyb20gXCIuL2NvbnRleHQtbWVudS9ub2RlLWNvbnRleHQtbWVudVwiO1xuaW1wb3J0IHtMYXlvdXR9IGZyb20gXCIuL2xheW91dFwiO1xuaW1wb3J0IHtOb2RlRHJhZ0hhbmRsZXJ9IGZyb20gXCIuL25vZGUtZHJhZy1oYW5kbGVyXCI7XG5pbXBvcnQge1Rvb2x0aXB9IGZyb20gXCIuL3Rvb2x0aXBcIjtcbmltcG9ydCB7VGVtcGxhdGVzfSBmcm9tIFwiLi90ZW1wbGF0ZXNcIjtcbmltcG9ydCB7VGV4dERyYWdIYW5kbGVyfSBmcm9tIFwiLi90ZXh0LWRyYWctaGFuZGxlclwiO1xuaW1wb3J0IHtUZXh0Q29udGV4dE1lbnV9IGZyb20gXCIuL2NvbnRleHQtbWVudS90ZXh0LWNvbnRleHQtbWVudVwiO1xuaW1wb3J0IHtFZGdlQ29udGV4dE1lbnV9IGZyb20gXCIuL2NvbnRleHQtbWVudS9lZGdlLWNvbnRleHQtbWVudVwiO1xuaW1wb3J0ICogYXMgSGFtbWVyIGZyb20gXCJoYW1tZXJqc1wiO1xuaW1wb3J0IHtpMThufSBmcm9tIFwiLi9pMThuL2kxOG5cIjtcblxuXG5leHBvcnQgY2xhc3MgVHJlZURlc2lnbmVyQ29uZmlnIHtcbiAgICB3aWR0aCA9IHVuZGVmaW5lZDtcbiAgICBoZWlnaHQgPSB1bmRlZmluZWQ7XG4gICAgbWFyZ2luID0ge1xuICAgICAgICBsZWZ0OiAyNSxcbiAgICAgICAgcmlnaHQ6IDI1LFxuICAgICAgICB0b3A6IDI1LFxuICAgICAgICBib3R0b206IDI1XG4gICAgfTtcbiAgICBzY2FsZSA9IDE7XG4gICAgbG5nID0gJ2VuJztcbiAgICBsYXlvdXQ9IHtcbiAgICAgICAgdHlwZTogJ3RyZWUnLFxuICAgICAgICBub2RlU2l6ZTogNDAsXG4gICAgICAgIGxpbWl0Tm9kZVBvc2l0aW9uaW5nOiB0cnVlLFxuICAgICAgICBsaW1pdFRleHRQb3NpdGlvbmluZzogdHJ1ZSxcbiAgICAgICAgZ3JpZEhlaWdodDogNzUsXG4gICAgICAgIGdyaWRXaWR0aDogMTUwLFxuICAgICAgICBlZGdlU2xhbnRXaWR0aE1heDogMjBcbiAgICB9O1xuICAgIGZvbnRGYW1pbHkgPSAnc2Fucy1zZXJpZic7XG4gICAgZm9udFNpemUgPSAnMTJweCc7XG4gICAgZm9udFdlaWdodCA9ICdub3JtYWwnO1xuICAgIGZvbnRTdHlsZSA9ICdub3JtYWwnO1xuICAgIG5vZGUgPSB7XG4gICAgICAgIHN0cm9rZVdpZHRoOiAnMXB4JyxcbiAgICAgICAgb3B0aW1hbDoge1xuICAgICAgICAgICAgc3Ryb2tlOiAnIzAwNmYwMCcsXG4gICAgICAgICAgICBzdHJva2VXaWR0aDogJzEuNXB4JyxcbiAgICAgICAgfSxcbiAgICAgICAgbGFiZWw6IHtcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMWVtJyxcbiAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgIH0sXG4gICAgICAgIHBheW9mZjoge1xuICAgICAgICAgICAgZm9udFNpemU6ICcxZW0nLFxuICAgICAgICAgICAgY29sb3I6ICdibGFjaycsXG4gICAgICAgICAgICBuZWdhdGl2ZUNvbG9yOiAnI2I2MDAwMCdcbiAgICAgICAgfSxcbiAgICAgICAgZGVjaXNpb246IHtcbiAgICAgICAgICAgIGZpbGw6ICcjZmY3Nzc3JyxcbiAgICAgICAgICAgIHN0cm9rZTogJyM2NjAwMDAnLFxuXG4gICAgICAgICAgICBzZWxlY3RlZDoge1xuICAgICAgICAgICAgICAgIGZpbGw6ICcjYWEzMzMzJyxcbiAgICAgICAgICAgICAgICAvLyBzdHJva2U6ICcjNjY2NjAwJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjaGFuY2U6IHtcbiAgICAgICAgICAgIGZpbGw6ICcjZmZmZjQ0JyxcbiAgICAgICAgICAgIHN0cm9rZTogJyM2NjY2MDAnLFxuXG4gICAgICAgICAgICBzZWxlY3RlZDoge1xuICAgICAgICAgICAgICAgIGZpbGw6ICcjYWFhYTAwJyxcbiAgICAgICAgICAgICAgICAvLyBzdHJva2U6ICcjNjY2NjAwJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB0ZXJtaW5hbDp7XG4gICAgICAgICAgICBmaWxsOiAnIzQ0ZmY0NCcsXG4gICAgICAgICAgICBzdHJva2U6ICdibGFjaycsXG4gICAgICAgICAgICBzZWxlY3RlZDoge1xuICAgICAgICAgICAgICAgIGZpbGw6ICcjMDBhYTAwJyxcbiAgICAgICAgICAgICAgICAvLyBzdHJva2U6ICdibGFjaydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwYXlvZmY6IHtcbiAgICAgICAgICAgICAgICBmb250U2l6ZTogJzFlbScsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaycsXG4gICAgICAgICAgICAgICAgbmVnYXRpdmVDb2xvcjogJyNiNjAwMDAnXG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgfTtcbiAgICBlZGdlPXtcbiAgICAgICAgc3Ryb2tlOiAnIzQyNDI0MicsXG4gICAgICAgIHN0cm9rZVdpZHRoOiAnMS41JyxcbiAgICAgICAgb3B0aW1hbDp7XG4gICAgICAgICAgICBzdHJva2U6ICcjMDA2ZjAwJyxcbiAgICAgICAgICAgIHN0cm9rZVdpZHRoOiAnMi40JyxcbiAgICAgICAgfSxcbiAgICAgICAgc2VsZWN0ZWQ6e1xuICAgICAgICAgICAgc3Ryb2tlOiAnIzA0NWFkMScsXG4gICAgICAgICAgICBzdHJva2VXaWR0aDogJzMuNScsXG4gICAgICAgIH0sXG4gICAgICAgIGxhYmVsOiB7XG4gICAgICAgICAgICBmb250U2l6ZTogJzFlbScsXG4gICAgICAgICAgICBjb2xvcjogJ2JhY2snXG4gICAgICAgIH0sXG4gICAgICAgIHBheW9mZjp7XG4gICAgICAgICAgICBmb250U2l6ZTogJzFlbScsXG4gICAgICAgICAgICBjb2xvcjogJ2JsYWNrJyxcbiAgICAgICAgICAgIG5lZ2F0aXZlQ29sb3I6ICcjYjYwMDAwJ1xuICAgICAgICB9XG5cbiAgICB9O1xuICAgIHByb2JhYmlsaXR5ID0ge1xuICAgICAgICBmb250U2l6ZTogJzFlbScsXG4gICAgICAgIGNvbG9yOiAnIzAwMDBkNydcbiAgICB9O1xuICAgIHRpdGxlID0ge1xuICAgICAgICBmb250U2l6ZTogJzE2cHgnLFxuICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXG4gICAgICAgIGZvbnRTdHlsZTogJ25vcm1hbCcsXG4gICAgICAgIGNvbG9yOiAnIzAwMDAwMCcsXG4gICAgICAgIG1hcmdpbjp7XG4gICAgICAgICAgICB0b3A6IDE1LFxuICAgICAgICAgICAgYm90dG9tOiAxMFxuICAgICAgICB9XG4gICAgfTtcbiAgICBkZXNjcmlwdGlvbiA9IHtcbiAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgZm9udFNpemU6ICcxMnB4JyxcbiAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxuICAgICAgICBmb250U3R5bGU6ICdub3JtYWwnLFxuICAgICAgICBjb2xvcjogJyMwMDAwMDAnLFxuICAgICAgICBtYXJnaW46e1xuICAgICAgICAgICAgdG9wOiA1LFxuICAgICAgICAgICAgYm90dG9tOiAxMFxuICAgICAgICB9XG4gICAgfTtcblxuICAgIHJlYWRPbmx5PSBmYWxzZTtcbiAgICBkaXNhYmxlQW5pbWF0aW9ucz1mYWxzZTtcbiAgICBmb3JjZUZ1bGxFZGdlUmVkcmF3PWZhbHNlO1xuICAgIGhpZGVMYWJlbHM9ZmFsc2U7XG4gICAgaGlkZVBheW9mZnM9ZmFsc2U7XG4gICAgaGlkZVByb2JhYmlsaXRpZXM9ZmFsc2U7XG4gICAgcmF3PWZhbHNlO1xuXG5cbiAgICBwYXlvZmZOdW1iZXJGb3JtYXR0ZXIgPSAodiwgaSk9PiB2O1xuICAgIHByb2JhYmlsaXR5TnVtYmVyRm9ybWF0dGVyICA9ICh2KT0+IHY7XG5cbiAgICBvbk5vZGVTZWxlY3RlZCA9IChub2RlKSA9PiB7fTtcbiAgICBvbkVkZ2VTZWxlY3RlZCA9IChlZGdlKSA9PiB7fTtcbiAgICBvblRleHRTZWxlY3RlZCA9ICh0ZXh0KSA9PiB7fTtcbiAgICBvblNlbGVjdGlvbkNsZWFyZWQgPSAoKSA9PiB7fTtcblxuICAgIG9wZXJhdGlvbnNGb3JPYmplY3QgPSAobykgPT4gW107XG5cbiAgICBwYXlvZmZOYW1lcyA9IFtudWxsLCBudWxsXTtcbiAgICBtYXhQYXlvZmZzVG9EaXNwbGF5ID0gMTtcblxuICAgIGNvbnN0cnVjdG9yKGN1c3RvbSkge1xuICAgICAgICBpZiAoY3VzdG9tKSB7XG4gICAgICAgICAgICBVdGlscy5kZWVwRXh0ZW5kKHRoaXMsIGN1c3RvbSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIFRyZWVEZXNpZ25lciB7XG5cbiAgICBjb25maWc7XG4gICAgY29udGFpbmVyO1xuICAgIGRhdGE7IC8vZGF0YSBtb2RlbCBtYW5hZ2VyXG4gICAgc3ZnO1xuXG4gICAgY29uc3RydWN0b3IoY29udGFpbmVyLCBkYXRhTW9kZWwsIGNvbmZpZyl7XG4gICAgICAgIHRoaXMuc2V0Q29uZmlnKGNvbmZpZyk7XG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGFNb2RlbDtcbiAgICAgICAgdGhpcy5pbml0Q29udGFpbmVyKGNvbnRhaW5lcik7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cblxuICAgIHNldENvbmZpZyhjb25maWcpIHtcbiAgICAgICAgdGhpcy5jb25maWcgPSBuZXcgVHJlZURlc2lnbmVyQ29uZmlnKGNvbmZpZyk7XG4gICAgICAgIGlmKHRoaXMubGF5b3V0KXtcbiAgICAgICAgICAgIHRoaXMubGF5b3V0LmNvbmZpZz10aGlzLmNvbmZpZy5sYXlvdXQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGRhdGVDdXN0b21TdHlsZXMoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgaW5pdCgpe1xuXG4gICAgICAgIHRoaXMuaW5pdFN2ZygpO1xuICAgICAgICB0aGlzLmluaXRMYXlvdXQoKTtcbiAgICAgICAgdGhpcy5pbml0STE4bigpO1xuICAgICAgICB0aGlzLmluaXRCcnVzaCgpO1xuICAgICAgICB0aGlzLmluaXRFZGdlTWFya2VycygpO1xuXG4gICAgICAgIHRoaXMudXBkYXRlQ3VzdG9tU3R5bGVzKCk7XG4gICAgICAgIGlmKCF0aGlzLmNvbmZpZy5yZWFkT25seSl7XG4gICAgICAgICAgICB0aGlzLmluaXRNYWluQ29udGV4dE1lbnUoKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdE5vZGVDb250ZXh0TWVudSgpO1xuICAgICAgICAgICAgdGhpcy5pbml0RWRnZUNvbnRleHRNZW51KCk7XG4gICAgICAgICAgICB0aGlzLmluaXROb2RlRHJhZ0hhbmRsZXIoKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdFRleHREcmFnSGFuZGxlcigpO1xuICAgICAgICAgICAgdGhpcy5pbml0VGV4dENvbnRleHRNZW51KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZWRyYXcoKTtcbiAgICB9XG5cbiAgICBpbml0STE4bigpIHtcbiAgICAgICAgaTE4bi5pbml0KHRoaXMuY29uZmlnLmxuZyk7XG4gICAgfVxuXG5cbiAgICB1cGRhdGVDdXN0b21TdHlsZXMoKXtcbiAgICAgICAgZDMuc2VsZWN0KCdoZWFkJykuc2VsZWN0T3JBcHBlbmQoJ3N0eWxlI3NkLXRyZWUtZGVzaWduZXItc3R5bGUnKS5odG1sKFRlbXBsYXRlcy5nZXQoJ3RyZWVEZXNpZ25lclN0eWxlcycsIHRoaXMuY29uZmlnKSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGluaXRMYXlvdXQoKXtcbiAgICAgICAgdGhpcy5sYXlvdXQgPSBuZXcgTGF5b3V0KHRoaXMsIHRoaXMuZGF0YSwgdGhpcy5jb25maWcubGF5b3V0KTtcbiAgICB9XG5cbiAgICBpbml0Tm9kZURyYWdIYW5kbGVyKCl7XG4gICAgICAgIHRoaXMubm9kZURyYWdIYW5kbGVyID0gbmV3IE5vZGVEcmFnSGFuZGxlcih0aGlzLCB0aGlzLmRhdGEpO1xuICAgIH1cblxuICAgIGluaXRUZXh0RHJhZ0hhbmRsZXIoKXtcbiAgICAgICAgdGhpcy50ZXh0RHJhZ0hhbmRsZXIgPSBuZXcgVGV4dERyYWdIYW5kbGVyKHRoaXMsIHRoaXMuZGF0YSk7XG4gICAgfVxuXG4gICAgcmVkcmF3KHdpdGhUcmFuc2l0aW9ucz1mYWxzZSl7XG5cbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB3aXRoVHJhbnNpdGlvbnMgPSAhc2VsZi5jb25maWcuZGlzYWJsZUFuaW1hdGlvbnMgJiYgd2l0aFRyYW5zaXRpb25zO1xuICAgICAgICB0aGlzLnJlZHJhd0RpYWdyYW1UaXRsZSgpO1xuICAgICAgICB0aGlzLnJlZHJhd0RpYWdyYW1EZXNjcmlwdGlvbigpO1xuICAgICAgICB0aGlzLnVwZGF0ZVNjYWxlKHdpdGhUcmFuc2l0aW9ucyk7XG4gICAgICAgIHRoaXMudXBkYXRlTWFyZ2luKHdpdGhUcmFuc2l0aW9ucyk7XG4gICAgICAgIGlmKHdpdGhUcmFuc2l0aW9ucyl7XG4gICAgICAgICAgICBzZWxmLnRyYW5zaXRpb25QcmV2ID0gc2VsZi50cmFuc2l0aW9uO1xuICAgICAgICAgICAgc2VsZi50cmFuc2l0aW9uID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlZHJhd05vZGVzKCk7XG4gICAgICAgIHRoaXMucmVkcmF3RWRnZXMoKTtcbiAgICAgICAgdGhpcy5yZWRyYXdGbG9hdGluZ1RleHRzKCk7XG4gICAgICAgIHRoaXMudXBkYXRlVmFsaWRhdGlvbk1lc3NhZ2VzKCk7XG4gICAgICAgIGlmKHdpdGhUcmFuc2l0aW9ucyl7XG4gICAgICAgICAgICBzZWxmLnRyYW5zaXRpb24gPSAgc2VsZi50cmFuc2l0aW9uUHJldjtcbiAgICAgICAgfVxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBzZWxmLnVwZGF0ZVBsb3R0aW5nUmVnaW9uU2l6ZSgpO1xuICAgICAgICB9LDEwKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBjb21wdXRlQXZhaWxhYmxlU3BhY2UoKXtcbiAgICAgICAgdGhpcy5hdmFpbGFibGVIZWlnaHQgPSBBcHBVdGlscy5zYW5pdGl6ZUhlaWdodCh0aGlzLmNvbmZpZy5oZWlnaHQsIHRoaXMuY29udGFpbmVyLCB0aGlzLmNvbmZpZy5tYXJnaW4pO1xuICAgICAgICB0aGlzLmF2YWlsYWJsZVdpZHRoID0gQXBwVXRpbHMuc2FuaXRpemVXaWR0aCh0aGlzLmNvbmZpZy53aWR0aCwgdGhpcy5jb250YWluZXIsIHRoaXMuY29uZmlnLm1hcmdpbik7XG4gICAgfVxuXG4gICAgaW5pdFN2ZygpIHtcbiAgICAgICAgdmFyIGMgPSB0aGlzO1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuY29tcHV0ZUF2YWlsYWJsZVNwYWNlKCk7XG4gICAgICAgIHRoaXMuc3ZnID0gdGhpcy5jb250YWluZXIuc2VsZWN0T3JBcHBlbmQoJ3N2Zy5zZC10cmVlLWRlc2lnbmVyJyk7XG4gICAgICAgIHRoaXMuc3ZnLmF0dHIoJ3dpZHRoJywgdGhpcy5hdmFpbGFibGVXaWR0aCkuYXR0cignaGVpZ2h0JywgdGhpcy5hdmFpbGFibGVIZWlnaHQpO1xuXG4gICAgICAgIHRoaXMud3JhcHBlckdyb3VwID0gdGhpcy5zdmcuc2VsZWN0T3JBcHBlbmQoJ2cuc2Qtd3JhcHBlci1ncm91cCcpO1xuICAgICAgICB0aGlzLm1haW5Hcm91cCA9IHRoaXMud3JhcHBlckdyb3VwLnNlbGVjdE9yQXBwZW5kKCdnLm1haW4tZ3JvdXAnKTtcbiAgICAgICAgdGhpcy51cGRhdGVTY2FsZSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZU1hcmdpbigpO1xuXG5cbiAgICAgICAgaWYgKCF0aGlzLmNvbmZpZy53aWR0aCkge1xuICAgICAgICAgICAgZDMuc2VsZWN0KHdpbmRvdylcbiAgICAgICAgICAgICAgICAub24oXCJyZXNpemUudHJlZS1kZXNpZ25lclwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYudXBkYXRlUGxvdHRpbmdSZWdpb25TaXplKCk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYucmVkcmF3RGlhZ3JhbVRpdGxlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbWMgPSBuZXcgSGFtbWVyLk1hbmFnZXIodGhpcy5zdmcubm9kZSgpLCB7dG91Y2hBY3Rpb24gOiAnYXV0byd9KTtcbiAgICAgICAgbWMuYWRkKG5ldyBIYW1tZXIuUHJlc3Moe1xuICAgICAgICAgICAgcG9pbnRlclR5cGU6ICd0b3VjaCdcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIG1jLmFkZChuZXcgSGFtbWVyLlBpbmNoKHtcbiAgICAgICAgICAgIHBvaW50ZXJUeXBlOiAndG91Y2gnXG4gICAgICAgIH0pKTtcblxuICAgICAgICB2YXIgY2FuY2VsO1xuICAgICAgICBtYy5vbigncGluY2hzdGFydCcsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBzZWxmLmRpc2FibGVCcnVzaCgpO1xuICAgICAgICB9KVxuICAgICAgICBtYy5vbigncGluY2gnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgY2FuY2VsID0gVXRpbHMud2FpdEZvckZpbmFsRXZlbnQoKCk9PnNlbGYuZW5hYmxlQnJ1c2goKSwgJ3BpbmNoZW5kJywgNTAwMClcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICB1cGRhdGVNYXJnaW4od2l0aFRyYW5zaXRpb25zKXtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgbWFyZ2luID0gdGhpcy5jb25maWcubWFyZ2luO1xuICAgICAgICB2YXIgZ3JvdXAgPSB0aGlzLm1haW5Hcm91cDtcbiAgICAgICAgaWYod2l0aFRyYW5zaXRpb25zKXtcbiAgICAgICAgICAgIGdyb3VwID0gZ3JvdXAudHJhbnNpdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50b3BNYXJnaW4gPSBtYXJnaW4udG9wO1xuICAgICAgICBpZih0aGlzLmRpYWdyYW1UaXRsZXx8dGhpcy5kaWFncmFtRGVzY3JpcHRpb24pe1xuICAgICAgICAgICAgdGhpcy50b3BNYXJnaW4gPSBwYXJzZUludCh0aGlzLmRpYWdyYW1UaXRsZSA/IHRoaXMuY29uZmlnLnRpdGxlLm1hcmdpbi50b3AgOiAwKSArIHRoaXMuZ2V0VGl0bGVHcm91cEhlaWdodCgpXG4gICAgICAgICAgICAgICAgKyAgTWF0aC5tYXgodGhpcy50b3BNYXJnaW4sIHBhcnNlSW50KHRoaXMuY29uZmlnLnRpdGxlLm1hcmdpbi5ib3R0b20pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdyb3VwLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoXCIgKyBtYXJnaW4ubGVmdCArIFwiLFwiICsgdGhpcy50b3BNYXJnaW4gKyBcIilcIikub24oXCJlbmRcIiwgKCk9PiBzZWxmLnVwZGF0ZVBsb3R0aW5nUmVnaW9uU2l6ZSgpKTtcbiAgICB9XG5cbiAgICBzZXRNYXJnaW4obWFyZ2luLCB3aXRob3V0U3RhdGVTYXZpbmcpe1xuICAgICAgICB2YXIgc2VsZj10aGlzO1xuICAgICAgICBpZighd2l0aG91dFN0YXRlU2F2aW5nKXtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoe1xuICAgICAgICAgICAgICAgIGRhdGE6e1xuICAgICAgICAgICAgICAgICAgICBtYXJnaW46IFV0aWxzLmNsb25lKHNlbGYuY29uZmlnLm1hcmdpbilcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uVW5kbzogKGRhdGEpPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldE1hcmdpbihkYXRhLm1hcmdpbiwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvblJlZG86IChkYXRhKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRNYXJnaW4obWFyZ2luLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBVdGlscy5kZWVwRXh0ZW5kKHRoaXMuY29uZmlnLm1hcmdpbiwgbWFyZ2luKTtcbiAgICAgICAgdGhpcy5yZWRyYXdEaWFncmFtVGl0bGUoKTtcbiAgICAgICAgdGhpcy51cGRhdGVNYXJnaW4odHJ1ZSk7XG4gICAgfVxuXG5cbiAgICB1cGRhdGVTY2FsZSh3aXRoVHJhbnNpdGlvbnMpe1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBzY2FsZSA9IHRoaXMuY29uZmlnLnNjYWxlO1xuICAgICAgICB2YXIgZ3JvdXAgPSB0aGlzLndyYXBwZXJHcm91cDtcbiAgICAgICAgaWYod2l0aFRyYW5zaXRpb25zKXtcbiAgICAgICAgICAgIGdyb3VwID0gZ3JvdXAudHJhbnNpdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ3JvdXAuYXR0cihcInRyYW5zZm9ybVwiLCBcInNjYWxlKFwiICsgc2NhbGUgKyBcIilcIikub24oXCJlbmRcIiwgKCk9PiBzZWxmLnVwZGF0ZVBsb3R0aW5nUmVnaW9uU2l6ZSgpKTtcbiAgICB9XG5cbiAgICBzZXRTY2FsZShzY2FsZSwgd2l0aG91dFN0YXRlU2F2aW5nKXtcbiAgICAgICAgdmFyIHNlbGY9dGhpcztcbiAgICAgICAgaWYoIXdpdGhvdXRTdGF0ZVNhdmluZyl7XG4gICAgICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKHtcbiAgICAgICAgICAgICAgICBkYXRhOntcbiAgICAgICAgICAgICAgICAgICAgc2NhbGU6IFV0aWxzLmNsb25lKHNlbGYuY29uZmlnLnNjYWxlKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25VbmRvOiAoZGF0YSk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0U2NhbGUoZGF0YS5zY2FsZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvblJlZG86IChkYXRhKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRTY2FsZShzY2FsZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb25maWcuc2NhbGUgPSBzY2FsZTtcbiAgICAgICAgdGhpcy51cGRhdGVTY2FsZSh0cnVlKTtcbiAgICB9XG5cbiAgICBpbml0Q29udGFpbmVyKGNvbnRhaW5lcklkT3JFbGVtKSB7XG4gICAgICAgIGlmIChVdGlscy5pc1N0cmluZyhjb250YWluZXJJZE9yRWxlbSkpIHtcbiAgICAgICAgICAgIHZhciBzZWxlY3RvciA9IGNvbnRhaW5lcklkT3JFbGVtLnRyaW0oKTtcblxuICAgICAgICAgICAgaWYgKCFVdGlscy5zdGFydHNXaXRoKHNlbGVjdG9yLCAnIycpICYmICFVdGlscy5zdGFydHNXaXRoKHNlbGVjdG9yLCAnLicpKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3IgPSAnIycgKyBzZWxlY3RvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyID0gZDMuc2VsZWN0KHNlbGVjdG9yKTtcbiAgICAgICAgfSBlbHNlIGlmKGNvbnRhaW5lcklkT3JFbGVtLl9wYXJlbnRzKXtcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVySWRPckVsZW1cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGQzLnNlbGVjdChjb250YWluZXJJZE9yRWxlbSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVQbG90dGluZ1JlZ2lvblNpemUoKSB7XG4gICAgICAgIHZhciBjaGFuZ2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY29tcHV0ZUF2YWlsYWJsZVNwYWNlKCk7XG4gICAgICAgIHZhciBtYXJnaW4gPSB0aGlzLmNvbmZpZy5tYXJnaW47XG4gICAgICAgIHZhciBzdmdXaWR0aCA9IHRoaXMuc3ZnLmF0dHIoJ3dpZHRoJyk7XG4gICAgICAgIHZhciBzdmdIZWlnaHQgPSB0aGlzLnN2Zy5hdHRyKCdoZWlnaHQnKTtcbiAgICAgICAgdmFyIG1haW5Hcm91cEJveCA9IHRoaXMubWFpbkdyb3VwLm5vZGUoKS5nZXRCQm94KCk7XG4gICAgICAgIGxldCBib3hXaWR0aCA9IG1haW5Hcm91cEJveC53aWR0aDtcbiAgICAgICAgdmFyIG5ld1N2Z1dpZHRoID0gYm94V2lkdGgrbWFpbkdyb3VwQm94LngrbWFyZ2luLmxlZnQrbWFyZ2luLnJpZ2h0O1xuICAgICAgICBuZXdTdmdXaWR0aCAgKj0gdGhpcy5jb25maWcuc2NhbGU7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmNsYXNzZWQoJ3dpdGgtb3ZlcmZsb3cteCcsIG5ld1N2Z1dpZHRoPj10aGlzLmF2YWlsYWJsZVdpZHRoKTtcbiAgICAgICAgbmV3U3ZnV2lkdGggPSBNYXRoLm1heChuZXdTdmdXaWR0aCwgdGhpcy5hdmFpbGFibGVXaWR0aCk7XG4gICAgICAgIGlmKHN2Z1dpZHRoIT1uZXdTdmdXaWR0aCl7XG4gICAgICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc3ZnLmF0dHIoJ3dpZHRoJywgbmV3U3ZnV2lkdGgpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBib3hIZWlnaHQgPSBtYWluR3JvdXBCb3guaGVpZ2h0O1xuICAgICAgICB2YXIgbmV3U3ZnSGVpZ2h0ID0gYm94SGVpZ2h0K21haW5Hcm91cEJveC55K3RoaXMudG9wTWFyZ2luK21hcmdpbi5ib3R0b207XG4gICAgICAgIG5ld1N2Z0hlaWdodCAqPSB0aGlzLmNvbmZpZy5zY2FsZTtcbiAgICAgICAgdGhpcy5jb250YWluZXIuY2xhc3NlZCgnd2l0aC1vdmVyZmxvdy15JywgbmV3U3ZnSGVpZ2h0Pj10aGlzLmF2YWlsYWJsZUhlaWdodCk7XG4gICAgICAgIG5ld1N2Z0hlaWdodCA9IE1hdGgubWF4KG5ld1N2Z0hlaWdodCwgdGhpcy5hdmFpbGFibGVIZWlnaHQpO1xuICAgICAgICBpZihzdmdIZWlnaHQhPW5ld1N2Z0hlaWdodCl7XG4gICAgICAgICAgICBjaGFuZ2VkPXRydWU7XG4gICAgICAgICAgICB0aGlzLnN2Zy5hdHRyKCdoZWlnaHQnLCBuZXdTdmdIZWlnaHQpO1xuICAgICAgICB9XG4gICAgICAgIGlmKGNoYW5nZWQpe1xuICAgICAgICAgICAgdGhpcy51cGRhdGVCcnVzaEV4dGVudCgpXG4gICAgICAgIH1cblxuXG4gICAgfVxuXG4gICAgcmVkcmF3Tm9kZXMoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuXG4gICAgICAgIHZhciBub2Rlc0NvbnRhaW5lciA9IHRoaXMubWFpbkdyb3VwLnNlbGVjdE9yQXBwZW5kKCdnLm5vZGVzJyk7XG4gICAgICAgIHZhciBub2RlcyA9IG5vZGVzQ29udGFpbmVyLnNlbGVjdEFsbCgnLm5vZGUnKS5kYXRhKHRoaXMuZGF0YS5ub2Rlcy5maWx0ZXIoZD0+IWQuJGhpZGRlbiksIChkLGkpPT4gZC4kaWQpO1xuICAgICAgICBub2Rlcy5leGl0KCkucmVtb3ZlKCk7XG4gICAgICAgIHZhciBub2Rlc0VudGVyID0gbm9kZXMuZW50ZXIoKS5hcHBlbmQoJ2cnKVxuICAgICAgICAgICAgLmF0dHIoJ2lkJywgZD0+J25vZGUtJytkLiRpZClcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGQ9PmQudHlwZSsnLW5vZGUgbm9kZScpXG4gICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgZD0+J3RyYW5zbGF0ZSgnICsgZC5sb2NhdGlvbi54ICsgJyAgJyArIGQubG9jYXRpb24ueSArICcpJyk7XG4gICAgICAgIG5vZGVzRW50ZXIuYXBwZW5kKCdwYXRoJyk7XG5cbiAgICAgICAgdmFyIGxhYmVsRW50ZXIgPSBub2Rlc0VudGVyLmFwcGVuZCgndGV4dCcpLmF0dHIoJ2NsYXNzJywgJ2xhYmVsJyk7XG4gICAgICAgIHZhciBwYXlvZmZFbnRlciA9IG5vZGVzRW50ZXIuYXBwZW5kKCd0ZXh0JykuYXR0cignY2xhc3MnLCAncGF5b2ZmIGNvbXB1dGVkJyk7XG4gICAgICAgIHZhciBpbmRpY2F0b3JFbnRlciA9IG5vZGVzRW50ZXIuYXBwZW5kKCd0ZXh0JykuYXR0cignY2xhc3MnLCAnZXJyb3ItaW5kaWNhdG9yJykudGV4dCgnISEnKTtcbiAgICAgICAgdmFyIGFnZ3JlZ2F0ZWRQYXlvZmZFbnRlciA9IG5vZGVzRW50ZXIuYXBwZW5kKCd0ZXh0JykuYXR0cignY2xhc3MnLCAnYWdncmVnYXRlZC1wYXlvZmYnKTtcbiAgICAgICAgdmFyIHByb2JhYmlsaXR5VG9FbnRlckVudGVyID0gbm9kZXNFbnRlci5hcHBlbmQoJ3RleHQnKS5hdHRyKCdjbGFzcycsICdwcm9iYWJpbGl0eS10by1lbnRlcicpO1xuXG4gICAgICAgIHZhciBub2Rlc01lcmdlID0gbm9kZXNFbnRlci5tZXJnZShub2Rlcyk7XG4gICAgICAgIG5vZGVzTWVyZ2UuY2xhc3NlZCgnb3B0aW1hbCcsIChkKT0+c2VsZi5pc09wdGltYWwoZCkpO1xuXG4gICAgICAgIHZhciBub2Rlc01lcmdlVCA9IG5vZGVzTWVyZ2U7XG4gICAgICAgIGlmKHRoaXMudHJhbnNpdGlvbil7XG4gICAgICAgICAgICBub2Rlc01lcmdlVCA9IG5vZGVzTWVyZ2UudHJhbnNpdGlvbigpO1xuICAgICAgICAgICAgbm9kZXNNZXJnZVQub24oJ2VuZCcsICgpPT4gc2VsZi51cGRhdGVQbG90dGluZ1JlZ2lvblNpemUoKSlcbiAgICAgICAgfVxuICAgICAgICBub2Rlc01lcmdlVFxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGQ9Pid0cmFuc2xhdGUoJyArIGQubG9jYXRpb24ueCArICcgICcgKyBkLmxvY2F0aW9uLnkgKyAnKScpXG5cbiAgICAgICAgdmFyIHBhdGggPSBub2Rlc01lcmdlLnNlbGVjdCgncGF0aCcpO1xuICAgICAgICB0aGlzLmxheW91dC5kcmF3Tm9kZVN5bWJvbChwYXRoLHRoaXMudHJhbnNpdGlvbik7XG5cbiAgICAgICAgLypwYXRoXG4gICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCBkPT4ge1xuICAgICAgICAgICAgICAgIC8vIGlmKHNlbGYuaXNOb2RlU2VsZWN0ZWQoZCkpe1xuICAgICAgICAgICAgICAgIC8vICAgICByZXR1cm4gc2VsZi5jb25maWcubm9kZVtkLnR5cGVdLnNlbGVjdGVkLmZpbGxcbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYuY29uZmlnLm5vZGVbZC50eXBlXS5maWxsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0eWxlKCdzdHJva2UnLCBkPT4gc2VsZi5jb25maWcubm9kZVtkLnR5cGVdLnN0cm9rZSlcbiAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlLXdpZHRoJywgZD0+IHtcbiAgICAgICAgICAgICAgICBpZihzZWxmLmNvbmZpZy5ub2RlW2QudHlwZV0uc3Ryb2tlV2lkdGghPT11bmRlZmluZWQpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5jb25maWcubm9kZVtkLnR5cGVdLnN0cm9rZVdpZHRoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5jb25maWcubm9kZS5zdHJva2VXaWR0aDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAqL1xuICAgICAgICB0aGlzLmxheW91dC5ub2RlTGFiZWxQb3NpdGlvbihsYWJlbEVudGVyKTtcbiAgICAgICAgdmFyIGxhYmVsTWVyZ2UgPSBub2Rlc01lcmdlLnNlbGVjdCgndGV4dC5sYWJlbCcpO1xuICAgICAgICBsYWJlbE1lcmdlLmNsYXNzZWQoJ3NkLWhpZGRlbicsIHRoaXMuY29uZmlnLmhpZGVMYWJlbHMpO1xuICAgICAgICB2YXIgbGFiZWxNZXJnZVQgPSBub2Rlc01lcmdlVC5zZWxlY3QoJ3RleHQubGFiZWwnKTtcbiAgICAgICAgbGFiZWxNZXJnZVQuZWFjaCh0aGlzLnVwZGF0ZVRleHRMaW5lcyk7XG4gICAgICAgIHRoaXMubGF5b3V0Lm5vZGVMYWJlbFBvc2l0aW9uKGxhYmVsTWVyZ2VUKVxuICAgICAgICAgICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXG5cbiAgICAgICAgdmFyIHBheW9mZiA9IG5vZGVzTWVyZ2Uuc2VsZWN0KCd0ZXh0LnBheW9mZicpO1xuXG4gICAgICAgIHZhciBwYXlvZmZUc3BhbnMgPSBwYXlvZmYuc2VsZWN0QWxsKCd0c3BhbicpLmRhdGEoZD0+e1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSBkLmRpc3BsYXlWYWx1ZSgnY2hpbGRyZW5QYXlvZmYnKTtcbiAgICAgICAgICAgIHJldHVybiBVdGlscy5pc0FycmF5KGl0ZW0pID8gaXRlbS5maWx0ZXIoaT0+aSAhPT0gdW5kZWZpbmVkKSA6IFtpdGVtXVxuICAgICAgICB9KTtcbiAgICAgICAgcGF5b2ZmVHNwYW5zLmV4aXQoKS5yZW1vdmUoKTtcblxuICAgICAgICB2YXIgcGF5b2ZmVHNwYW5zTSA9IHBheW9mZlRzcGFucy5lbnRlcigpLmFwcGVuZCgndHNwYW4nKS5tZXJnZShwYXlvZmZUc3BhbnMpO1xuICAgICAgICBwYXlvZmZUc3BhbnNNXG4gICAgICAgICAgICAvLyAuYXR0cignZG9taW5hbnQtYmFzZWxpbmUnLCAnaGFuZ2luZycpXG4gICAgICAgICAgICAuYXR0cignZHknLCAoZCxpKT0+aT4wID8gJzEuMWVtJzogdW5kZWZpbmVkKVxuICAgICAgICAgICAgLmF0dHIoJ3gnLCAnMCcpXG4gICAgICAgICAgICAuY2xhc3NlZCgnbmVnYXRpdmUnLCBkPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBkIT09bnVsbCAmJiBkPDA7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNsYXNzZWQoJ3NkLWhpZGRlbicsIHRoaXMuY29uZmlnLmhpZGVQYXlvZmZzIHx8IHRoaXMuY29uZmlnLnJhdylcbiAgICAgICAgICAgIC50ZXh0KChkLCBpKT0+IHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsID0gZFxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbCE9PW51bGwgPyAoaXNOYU4odmFsKSA/IHZhbCA6IHNlbGYuY29uZmlnLnBheW9mZk51bWJlckZvcm1hdHRlcih2YWwsIGkpKTogJydcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB0aGlzLmF0dGFjaFBheW9mZlRvb2x0aXAocGF5b2ZmVHNwYW5zTSk7XG5cblxuICAgICAgICB2YXIgcGF5b2ZmVCA9IHBheW9mZjtcbiAgICAgICAgaWYodGhpcy50cmFuc2l0aW9uKXtcbiAgICAgICAgICAgIHBheW9mZlQgPSBwYXlvZmYudHJhbnNpdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sYXlvdXQubm9kZVBheW9mZlBvc2l0aW9uKHBheW9mZkVudGVyKTtcbiAgICAgICAgdGhpcy5sYXlvdXQubm9kZVBheW9mZlBvc2l0aW9uKHBheW9mZlQpO1xuXG4gICAgICAgIHZhciBhZ2dyZWdhdGVkUGF5b2ZmID0gbm9kZXNNZXJnZS5zZWxlY3QoJ3RleHQuYWdncmVnYXRlZC1wYXlvZmYnKTtcbiAgICAgICAgdmFyIGFnZ3JlZ2F0ZWRQYXlvZmZUc3BhbnMgPSBhZ2dyZWdhdGVkUGF5b2ZmLnNlbGVjdEFsbCgndHNwYW4nKS5kYXRhKGQ9PntcbiAgICAgICAgICAgIGxldCBpdGVtID0gZC5kaXNwbGF5VmFsdWUoJ2FnZ3JlZ2F0ZWRQYXlvZmYnKTtcbiAgICAgICAgICAgIHJldHVybiBVdGlscy5pc0FycmF5KGl0ZW0pID8gaXRlbS5maWx0ZXIoaT0+aSAhPT0gdW5kZWZpbmVkKSA6IFtpdGVtXVxuICAgICAgICB9KTtcbiAgICAgICAgYWdncmVnYXRlZFBheW9mZlRzcGFucy5leGl0KCkucmVtb3ZlKCk7XG4gICAgICAgIHZhciBhZ2dyZWdhdGVkUGF5b2ZmVHNwYW5zTSA9IGFnZ3JlZ2F0ZWRQYXlvZmZUc3BhbnMuZW50ZXIoKS5hcHBlbmQoJ3RzcGFuJykubWVyZ2UoYWdncmVnYXRlZFBheW9mZlRzcGFucylcbiAgICAgICAgICAgIC5hdHRyKCdkeScsIChkLGkpPT5pPjAgPyAnMC45NWVtJzogdW5kZWZpbmVkKVxuICAgICAgICAgICAgLmNsYXNzZWQoJ25lZ2F0aXZlJywgZD0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZCE9PW51bGwgJiYgZDwwO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jbGFzc2VkKCdzZC1oaWRkZW4nLCB0aGlzLmNvbmZpZy5oaWRlUGF5b2ZmcyB8fCB0aGlzLmNvbmZpZy5yYXcpXG4gICAgICAgICAgICAudGV4dCgodmFsLCBpKT0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsIT09bnVsbCA/IChpc05hTih2YWwpID8gdmFsIDogc2VsZi5jb25maWcucGF5b2ZmTnVtYmVyRm9ybWF0dGVyKHZhbCwgaSkpOiAnJ1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5hdHRhY2hQYXlvZmZUb29sdGlwKGFnZ3JlZ2F0ZWRQYXlvZmZUc3BhbnNNLCAnYWdncmVnYXRlZFBheW9mZicpO1xuXG4gICAgICAgIHZhciBhZ2dyZWdhdGVkUGF5b2ZmVCA9IGFnZ3JlZ2F0ZWRQYXlvZmY7XG4gICAgICAgIGlmKHRoaXMudHJhbnNpdGlvbil7XG4gICAgICAgICAgICBhZ2dyZWdhdGVkUGF5b2ZmVCA9IGFnZ3JlZ2F0ZWRQYXlvZmYudHJhbnNpdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sYXlvdXQubm9kZUFnZ3JlZ2F0ZWRQYXlvZmZQb3NpdGlvbihhZ2dyZWdhdGVkUGF5b2ZmRW50ZXIpO1xuICAgICAgICB0aGlzLmxheW91dC5ub2RlQWdncmVnYXRlZFBheW9mZlBvc2l0aW9uKGFnZ3JlZ2F0ZWRQYXlvZmZUKTtcblxuICAgICAgICB2YXIgcHJvYmFiaWxpdHlUb0VudGVyID0gbm9kZXNNZXJnZS5zZWxlY3QoJ3RleHQucHJvYmFiaWxpdHktdG8tZW50ZXInKVxuICAgICAgICAgICAgLnRleHQoZD0+e1xuICAgICAgICAgICAgICAgIHZhciB2YWwgPSBkLmRpc3BsYXlWYWx1ZSgncHJvYmFiaWxpdHlUb0VudGVyJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbCE9PW51bGwgPyAoaXNOYU4odmFsKSA/IHZhbCA6IHNlbGYuY29uZmlnLnByb2JhYmlsaXR5TnVtYmVyRm9ybWF0dGVyKHZhbCkpOiAnJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jbGFzc2VkKCdzZC1oaWRkZW4nLCB0aGlzLmNvbmZpZy5oaWRlUHJvYmFiaWxpdGllcyB8fCB0aGlzLmNvbmZpZy5yYXcpO1xuICAgICAgICBUb29sdGlwLmF0dGFjaChwcm9iYWJpbGl0eVRvRW50ZXIsIGkxOG4udCgndG9vbHRpcC5ub2RlLnByb2JhYmlsaXR5VG9FbnRlcicpKTtcblxuXG4gICAgICAgIHZhciBwcm9iYWJpbGl0eVRvRW50ZXJUID0gcHJvYmFiaWxpdHlUb0VudGVyO1xuICAgICAgICBpZih0aGlzLnRyYW5zaXRpb24pe1xuICAgICAgICAgICAgcHJvYmFiaWxpdHlUb0VudGVyVCA9IHByb2JhYmlsaXR5VG9FbnRlci50cmFuc2l0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sYXlvdXQubm9kZVByb2JhYmlsaXR5VG9FbnRlclBvc2l0aW9uKHByb2JhYmlsaXR5VG9FbnRlckVudGVyKTtcbiAgICAgICAgdGhpcy5sYXlvdXQubm9kZVByb2JhYmlsaXR5VG9FbnRlclBvc2l0aW9uKHByb2JhYmlsaXR5VG9FbnRlclQpO1xuXG5cbiAgICAgICAgdmFyIGluZGljYXRvciA9IG5vZGVzTWVyZ2Uuc2VsZWN0KCd0ZXh0LmVycm9yLWluZGljYXRvcicpO1xuICAgICAgICBpbmRpY2F0b3IuY2xhc3NlZCgnc2QtaGlkZGVuJywgdGhpcy5jb25maWcucmF3KVxuICAgICAgICB0aGlzLmxheW91dC5ub2RlSW5kaWNhdG9yUG9zaXRpb24oaW5kaWNhdG9yRW50ZXIpO1xuICAgICAgICB0aGlzLmxheW91dC5ub2RlSW5kaWNhdG9yUG9zaXRpb24oaW5kaWNhdG9yKTtcblxuICAgICAgICBpZih0aGlzLm5vZGVEcmFnSGFuZGxlcil7XG4gICAgICAgICAgICBub2Rlc01lcmdlLmNhbGwodGhpcy5ub2RlRHJhZ0hhbmRsZXIuZHJhZyk7XG4gICAgICAgIH1cblxuICAgICAgICBub2Rlc01lcmdlLm9uKCdjb250ZXh0bWVudScsIHRoaXMubm9kZUNvbnRleHRNZW51KTtcbiAgICAgICAgbm9kZXNNZXJnZS5vbignZGJsY2xpY2snLCB0aGlzLm5vZGVDb250ZXh0TWVudSlcbiAgICAgICAgbm9kZXNNZXJnZS5lYWNoKGZ1bmN0aW9uKGQsIGkpe1xuICAgICAgICAgICAgdmFyIG5vZGVFbGVtID0gdGhpcztcbiAgICAgICAgICAgIHZhciBtYyA9IG5ldyBIYW1tZXIuTWFuYWdlcihub2RlRWxlbSk7XG4gICAgICAgICAgICBtYy5hZGQobmV3IEhhbW1lci5QcmVzcyh7XG4gICAgICAgICAgICAgICAgcG9pbnRlclR5cGU6ICd0b3VjaCdcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIG1jLm9uKCdwcmVzcycsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgICAgIGlmKGUucG9pbnRlclR5cGU9PSd0b3VjaCcpe1xuICAgICAgICAgICAgICAgICAgICBzZWxmLm5vZGVEcmFnSGFuZGxlci5jYW5jZWxEcmFnKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcblxuXG4gICAgICAgICAgICBpZihkLmZvbGRlZCl7XG4gICAgICAgICAgICAgICAgbGV0IGJ1dHRvbiA9IGQzLnNlbGVjdChub2RlRWxlbSkuc2VsZWN0T3JBcHBlbmQoJ3RleHQuc2QtdW5mb2xkLWJ1dHRvbicpXG4gICAgICAgICAgICAgICAgICAgIC50ZXh0KFwiWytdXCIpXG4gICAgICAgICAgICAgICAgICAgIC5vbignY2xpY2sgZGJjbGljayBtb3VzZWRvd24nLCAoKT0+c2VsZi5mb2xkU3VidHJlZShkLCBmYWxzZSkpOyAvL2ZpcmVmb3ggZGV0ZWN0cyBvbmx5IG1vdXNlZG93biBldmVudCAtIHJlbGF0ZWQgdG8gZHJhZyBoYW5kbGVyXG5cbiAgICAgICAgICAgICAgICBzZWxmLmxheW91dC5ub2RlVW5mb2xkQnV0dG9uUG9zaXRpb24oYnV0dG9uKTtcbiAgICAgICAgICAgICAgICBUb29sdGlwLmF0dGFjaChidXR0b24sIGkxOG4udCgnY29udGV4dE1lbnUubm9kZS51bmZvbGQnKSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBkMy5zZWxlY3Qobm9kZUVsZW0pLnNlbGVjdCgnLnNkLXVuZm9sZC1idXR0b24nKS5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGF0dGFjaFBheW9mZlRvb2x0aXAoc2VsZWN0aW9uLCBwYXlvZmZGaWxlZE5hbWUgPSAncGF5b2ZmJywgb2JqZWN0PSdub2RlJyl7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgVG9vbHRpcC5hdHRhY2goc2VsZWN0aW9uLCAoZCwgaSk9PntcbiAgICAgICAgICAgIGlmKHNlbGYuY29uZmlnLnBheW9mZk5hbWVzLmxlbmd0aD5pICYmIHNlbGYuY29uZmlnLnBheW9mZk5hbWVzW2ldICE9PSBudWxsKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTE4bi50KCd0b29sdGlwLicrb2JqZWN0KycuJytwYXlvZmZGaWxlZE5hbWUrJy5uYW1lZCcse3ZhbHVlOiBkLnBheW9mZiwgbnVtYmVyOiBpKzEsIG5hbWU6IHNlbGYuY29uZmlnLnBheW9mZk5hbWVzW2ldfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpMThuLnQoJ3Rvb2x0aXAuJytvYmplY3QrJy4nK3BheW9mZkZpbGVkTmFtZSsnLmRlZmF1bHQnLHt2YWx1ZTogZC5wYXlvZmYsIG51bWJlcjogc2VsZi5jb25maWcubWF4UGF5b2Zmc1RvRGlzcGxheSA8IDIgPyAnJyA6IGkrMX0pXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHVwZGF0ZVRleHRMaW5lcyhkKXsgLy9oZWxwZXIgbWV0aG9kIGZvciBzcGxpdHRpbmcgdGV4dCB0byB0c3BhbnNcbiAgICAgICAgdmFyIGxpbmVzID0gZC5uYW1lID8gZC5uYW1lLnNwbGl0KCdcXG4nKSA6IFtdO1xuICAgICAgICBsaW5lcy5yZXZlcnNlKCk7XG4gICAgICAgIHZhciB0c3BhbnMgPSBkMy5zZWxlY3QodGhpcykuc2VsZWN0QWxsKCd0c3BhbicpLmRhdGEobGluZXMpO1xuICAgICAgICB0c3BhbnMuZW50ZXIoKS5hcHBlbmQoJ3RzcGFuJylcbiAgICAgICAgICAgIC5tZXJnZSh0c3BhbnMpXG4gICAgICAgICAgICAudGV4dChsPT5sKVxuICAgICAgICAgICAgLmF0dHIoJ2R5JywgKGQsaSk9Pmk+MCA/ICctMS4xZW0nOiB1bmRlZmluZWQpXG4gICAgICAgICAgICAuYXR0cigneCcsICcwJyk7XG5cbiAgICAgICAgdHNwYW5zLmV4aXQoKS5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICBpc09wdGltYWwoZCl7XG4gICAgICAgIHJldHVybiBkLmRpc3BsYXlWYWx1ZSgnb3B0aW1hbCcpO1xuICAgIH1cblxuICAgIHJlZHJhd0VkZ2VzKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBlZGdlc0NvbnRhaW5lciA9IHRoaXMubWFpbkdyb3VwLnNlbGVjdE9yQXBwZW5kKCdnLmVkZ2VzJyk7XG4gICAgICAgIGlmKHNlbGYuY29uZmlnLmZvcmNlRnVsbEVkZ2VSZWRyYXcpe1xuICAgICAgICAgICAgZWRnZXNDb250YWluZXIuc2VsZWN0QWxsKFwiKlwiKS5yZW1vdmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBlZGdlcyA9IGVkZ2VzQ29udGFpbmVyLnNlbGVjdEFsbCgnLmVkZ2UnKS5kYXRhKHRoaXMuZGF0YS5lZGdlcy5maWx0ZXIoZT0+IWUuJGhpZGRlbiksIChkLGkpPT4gZC4kaWQpO1xuICAgICAgICBlZGdlcy5leGl0KCkucmVtb3ZlKCk7XG4gICAgICAgIHZhciBlZGdlc0VudGVyID0gZWRnZXMuZW50ZXIoKS5hcHBlbmQoJ2cnKVxuICAgICAgICAgICAgLmF0dHIoJ2lkJywgZD0+J2VkZ2UtJytkLiRpZClcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdlZGdlJyk7XG5cblxuICAgICAgICBlZGdlc0VudGVyLmFwcGVuZCgncGF0aCcpO1xuICAgICAgICB2YXIgbGFiZWxFbnRlciA9IGVkZ2VzRW50ZXIuYXBwZW5kU2VsZWN0b3IoJ2cubGFiZWwtZ3JvdXAnKTtcbiAgICAgICAgbGFiZWxFbnRlci5hcHBlbmQoJ3RleHQnKS5hdHRyKCdjbGFzcycsICdsYWJlbCcpO1xuICAgICAgICB2YXIgcGF5b2ZmRW50ZXIgPSBlZGdlc0VudGVyLmFwcGVuZCgndGV4dCcpLmF0dHIoJ2NsYXNzJywgJ3BheW9mZicpO1xuICAgICAgICB2YXIgcHJvYmFiaWxpdHlFbnRlciA9IGVkZ2VzRW50ZXIuYXBwZW5kKCd0ZXh0JykuYXR0cignY2xhc3MnLCAncHJvYmFiaWxpdHknKTtcblxuXG4gICAgICAgIHZhciBlZGdlc01lcmdlID0gZWRnZXNFbnRlci5tZXJnZShlZGdlcyk7XG5cblxuICAgICAgICB2YXIgb3B0aW1hbENsYXNzTmFtZSA9ICdvcHRpbWFsJztcbiAgICAgICAgZWRnZXNNZXJnZS5jbGFzc2VkKG9wdGltYWxDbGFzc05hbWUsIChkKT0+c2VsZi5pc09wdGltYWwoZCkpO1xuXG4gICAgICAgIHZhciBlZGdlc01lcmdlVCA9IGVkZ2VzTWVyZ2U7XG4gICAgICAgIGlmKHRoaXMudHJhbnNpdGlvbil7XG4gICAgICAgICAgICBlZGdlc01lcmdlVCA9IGVkZ2VzTWVyZ2UudHJhbnNpdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgZWRnZXNNZXJnZVQuc2VsZWN0KCdwYXRoJylcbiAgICAgICAgICAgIC5hdHRyKCdkJywgZD0+IHRoaXMubGF5b3V0LmVkZ2VMaW5lRChkKSlcbiAgICAgICAgICAgIC8vIC5hdHRyKFwic3Ryb2tlXCIsIFwiYmxhY2tcIilcbiAgICAgICAgICAgIC8vIC5hdHRyKFwic3Ryb2tlLXdpZHRoXCIsIDIpXG4gICAgICAgICAgICAuYXR0cihcImZpbGxcIiwgXCJub25lXCIpXG4gICAgICAgICAgICAuYXR0cihcIm1hcmtlci1lbmRcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICAgIHZhciBzdWZmaXggPSBkMy5zZWxlY3QodGhpcy5wYXJlbnROb2RlKS5jbGFzc2VkKCdzZWxlY3RlZCcpID8gJy1zZWxlY3RlZCcgOiAoc2VsZi5pc09wdGltYWwoZCk/Jy1vcHRpbWFsJzonJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwidXJsKCNhcnJvd1wiKyBzdWZmaXgrXCIpXCJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gLmF0dHIoXCJzaGFwZS1yZW5kZXJpbmdcIiwgXCJvcHRpbWl6ZVF1YWxpdHlcIilcblxuXG4gICAgICAgIGVkZ2VzTWVyZ2Uub24oJ2NsaWNrJywgZD0+e1xuICAgICAgICAgICAgc2VsZi5zZWxlY3RFZGdlKGQsIHRydWUpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubGF5b3V0LmVkZ2VMYWJlbFBvc2l0aW9uKGxhYmVsRW50ZXIpO1xuICAgICAgICBlZGdlc01lcmdlVC5zZWxlY3QoJ3RleHQubGFiZWwnKS5lYWNoKHRoaXMudXBkYXRlVGV4dExpbmVzKTtcbiAgICAgICAgdmFyIGxhYmVsTWVyZ2UgPSBlZGdlc01lcmdlLnNlbGVjdCgnZy5sYWJlbC1ncm91cCcpO1xuICAgICAgICBsYWJlbE1lcmdlLmNsYXNzZWQoJ3NkLWhpZGRlbicsIHRoaXMuY29uZmlnLmhpZGVMYWJlbHMpO1xuICAgICAgICB2YXIgbGFiZWxNZXJnZVQgPSBlZGdlc01lcmdlVC5zZWxlY3QoJ2cubGFiZWwtZ3JvdXAnKTtcbiAgICAgICAgdGhpcy5sYXlvdXQuZWRnZUxhYmVsUG9zaXRpb24obGFiZWxNZXJnZVQpO1xuICAgICAgICAgICAgLy8gLnRleHQoZD0+ZC5uYW1lKTtcblxuICAgICAgICB2YXIgcGF5b2ZmID0gZWRnZXNNZXJnZS5zZWxlY3QoJ3RleHQucGF5b2ZmJyk7XG5cbiAgICAgICAgdmFyIHBheW9mZlRzcGFucyA9IHBheW9mZi5zZWxlY3RBbGwoJ3RzcGFuJykuZGF0YShkID0+IHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gZC5kaXNwbGF5VmFsdWUoJ3BheW9mZicpO1xuICAgICAgICAgICAgcmV0dXJuIFV0aWxzLmlzQXJyYXkoaXRlbSkgPyBpdGVtLnNsaWNlKDAsIE1hdGgubWluKGl0ZW0ubGVuZ3RoLCBzZWxmLmNvbmZpZy5tYXhQYXlvZmZzVG9EaXNwbGF5KSkubWFwKF89PmQpIDogW2RdO1xuICAgICAgICB9KTtcbiAgICAgICAgcGF5b2ZmVHNwYW5zLmV4aXQoKS5yZW1vdmUoKTtcblxuICAgICAgICB2YXIgcGF5b2ZmVHNwYW5zTSA9IHBheW9mZlRzcGFucy5lbnRlcigpLmFwcGVuZCgndHNwYW4nKS5tZXJnZShwYXlvZmZUc3BhbnMpO1xuICAgICAgICBwYXlvZmZUc3BhbnNNXG4gICAgICAgIC8vIC5hdHRyKCdkb21pbmFudC1iYXNlbGluZScsICdoYW5naW5nJylcbiAgICAgICAgICAgIC5hdHRyKCdkeScsIChkLGkpPT5pPjAgPyAnMS4xZW0nOiB1bmRlZmluZWQpXG4gICAgICAgICAgICAvLyAuYXR0cigneCcsICcwJylcblxuICAgICAgICAgICAgLy8gLmF0dHIoJ2RvbWluYW50LWJhc2VsaW5lJywgJ2hhbmdpbmcnKVxuICAgICAgICAgICAgLmNsYXNzZWQoJ25lZ2F0aXZlJywgKGQsIGkpPT4ge1xuICAgICAgICAgICAgICAgIHZhciB2YWwgPSBkLmRpc3BsYXlQYXlvZmYodW5kZWZpbmVkLCBpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsIT09bnVsbCAmJiB2YWw8MDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2xhc3NlZCgnc2QtaGlkZGVuJywgdGhpcy5jb25maWcuaGlkZVBheW9mZnMpXG4gICAgICAgICAgICAvLyAudGV4dChkPT4gaXNOYU4oZC5wYXlvZmYpID8gZC5wYXlvZmYgOiBzZWxmLmNvbmZpZy5wYXlvZmZOdW1iZXJGb3JtYXR0ZXIoZC5wYXlvZmYpKVxuICAgICAgICAgICAgLnRleHQoKGQsIGkpPT57XG4gICAgICAgICAgICAgICAgaWYodGhpcy5jb25maWcucmF3KXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQucGF5b2ZmW2ldO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gZC5kaXNwbGF5VmFsdWUoJ3BheW9mZicpO1xuICAgICAgICAgICAgICAgIGxldCBpdGVtcyA9IFV0aWxzLmlzQXJyYXkoaXRlbSkgPyBpdGVtIDogW2l0ZW1dO1xuXG4gICAgICAgICAgICAgICAgbGV0IHZhbCA9IGl0ZW1zW2ldO1xuICAgICAgICAgICAgICAgIGlmICh2YWwgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc05hTih2YWwpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5jb25maWcucGF5b2ZmTnVtYmVyRm9ybWF0dGVyKHZhbCwgaSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKFV0aWxzLmlzU3RyaW5nKHZhbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoZC5wYXlvZmZbaV0gIT09IG51bGwgJiYgIWlzTmFOKGQucGF5b2ZmW2ldKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYuY29uZmlnLnBheW9mZk51bWJlckZvcm1hdHRlcihkLnBheW9mZltpXSwgaSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZC5wYXlvZmZbaV07XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIFRvb2x0aXAuYXR0YWNoKHBheW9mZlRzcGFuc00sIChkLCBpKT0+e1xuICAgICAgICAgICAgaWYoc2VsZi5jb25maWcucGF5b2ZmTmFtZXMubGVuZ3RoPmkgJiYgc2VsZi5jb25maWcucGF5b2ZmTmFtZXNbaV0gIT09IG51bGwpe1xuICAgICAgICAgICAgICAgIHJldHVybiBpMThuLnQoJ3Rvb2x0aXAuZWRnZS5wYXlvZmYubmFtZWQnLHt2YWx1ZTogZC5wYXlvZmZbaV0sIG51bWJlcjogaSsxLCBuYW1lOiBzZWxmLmNvbmZpZy5wYXlvZmZOYW1lc1tpXX0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaTE4bi50KCd0b29sdGlwLmVkZ2UucGF5b2ZmLmRlZmF1bHQnLHt2YWx1ZTogZC5wYXlvZmZbaV0sIG51bWJlcjogc2VsZi5jb25maWcubWF4UGF5b2Zmc1RvRGlzcGxheSA8IDIgPyAnJyA6IGkrMX0pXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBwYXlvZmZUZXh0VCA9IHBheW9mZjtcbiAgICAgICAgaWYodGhpcy50cmFuc2l0aW9uKXtcbiAgICAgICAgICAgIHBheW9mZlRleHRUID0gcGF5b2ZmLnRyYW5zaXRpb24oKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxheW91dC5lZGdlUGF5b2ZmUG9zaXRpb24ocGF5b2ZmRW50ZXIpO1xuICAgICAgICB0aGlzLmxheW91dC5lZGdlUGF5b2ZmUG9zaXRpb24ocGF5b2ZmVGV4dFQpO1xuXG4gICAgICAgIFRvb2x0aXAuYXR0YWNoKGVkZ2VzTWVyZ2Uuc2VsZWN0KCd0ZXh0LnByb2JhYmlsaXR5JyksIGQ9PmkxOG4udCgndG9vbHRpcC5lZGdlLnByb2JhYmlsaXR5Jyx7dmFsdWU6IGQucHJvYmFiaWxpdHk9PT0gdW5kZWZpbmVkID8gZC5kaXNwbGF5UHJvYmFiaWxpdHkoKSA6IGQucHJvYmFiaWxpdHl9KSk7XG5cbiAgICAgICAgZWRnZXNNZXJnZS5zZWxlY3QoJ3RleHQucHJvYmFiaWxpdHknKVxuICAgICAgICAgICAgLmNsYXNzZWQoJ3NkLWhpZGRlbicsIHRoaXMuY29uZmlnLmhpZGVQcm9iYWJpbGl0aWVzKTtcbiAgICAgICAgdmFyIHByb2JhYmlsaXR5TWVyZ2UgPSBlZGdlc01lcmdlLnNlbGVjdCgndGV4dC5wcm9iYWJpbGl0eScpO1xuICAgICAgICBwcm9iYWJpbGl0eU1lcmdlXG4gICAgICAgICAgICAuYXR0cigndGV4dC1hbmNob3InLCAnZW5kJylcbiAgICAgICAgICAgIC50ZXh0KGQ9PntcbiAgICAgICAgICAgICAgICBpZih0aGlzLmNvbmZpZy5yYXcpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC5wcm9iYWJpbGl0eTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHZhbCA9IGQuZGlzcGxheVByb2JhYmlsaXR5KCk7XG5cbiAgICAgICAgICAgICAgICBpZih2YWwhPT1udWxsKXtcbiAgICAgICAgICAgICAgICAgICAgaWYoIWlzTmFOKHZhbCkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYuY29uZmlnLnByb2JhYmlsaXR5TnVtYmVyRm9ybWF0dGVyKHZhbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYoVXRpbHMuaXNTdHJpbmcodmFsKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoZC5wcm9iYWJpbGl0eSE9PW51bGwgJiYgIWlzTmFOKGQucHJvYmFiaWxpdHkpKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5jb25maWcucHJvYmFiaWxpdHlOdW1iZXJGb3JtYXR0ZXIoZC5wcm9iYWJpbGl0eSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZC5wcm9iYWJpbGl0eTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB2YXIgcHJvYmFiaWxpdHlNZXJnZVQgPSBwcm9iYWJpbGl0eU1lcmdlO1xuICAgICAgICBpZih0aGlzLnRyYW5zaXRpb24pe1xuICAgICAgICAgICAgcHJvYmFiaWxpdHlNZXJnZVQgPSBwcm9iYWJpbGl0eU1lcmdlLnRyYW5zaXRpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubGF5b3V0LmVkZ2VQcm9iYWJpbGl0eVBvc2l0aW9uKHByb2JhYmlsaXR5RW50ZXIpO1xuICAgICAgICB0aGlzLmxheW91dC5lZGdlUHJvYmFiaWxpdHlQb3NpdGlvbihwcm9iYWJpbGl0eU1lcmdlVCk7XG5cblxuICAgICAgICBlZGdlc0NvbnRhaW5lci5zZWxlY3RBbGwoJy5lZGdlLicrb3B0aW1hbENsYXNzTmFtZSkucmFpc2UoKTtcblxuICAgICAgICBlZGdlc01lcmdlLm9uKCdjb250ZXh0bWVudScsIHRoaXMuZWRnZUNvbnRleHRNZW51KTtcbiAgICAgICAgZWRnZXNNZXJnZS5vbignZGJsY2xpY2snLCB0aGlzLmVkZ2VDb250ZXh0TWVudSk7XG4gICAgICAgIGVkZ2VzTWVyZ2UuZWFjaChmdW5jdGlvbihkLCBpKXtcbiAgICAgICAgICAgIHZhciBlbGVtID0gdGhpcztcbiAgICAgICAgICAgIHZhciBtYyA9IG5ldyBIYW1tZXIuTWFuYWdlcihlbGVtKTtcbiAgICAgICAgICAgIG1jLmFkZChuZXcgSGFtbWVyLlByZXNzKHtcbiAgICAgICAgICAgICAgICBwb2ludGVyVHlwZTogSGFtbWVyLlBPSU5URVJfVE9VQ0hcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICByZWRyYXdGbG9hdGluZ1RleHRzKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cblxuICAgICAgICB2YXIgdGV4dHNDb250YWluZXIgPSB0aGlzLm1haW5Hcm91cC5zZWxlY3RPckFwcGVuZCgnZy5mbG9hdGluZy10ZXh0cycpO1xuICAgICAgICB2YXIgdGV4dHMgPSB0ZXh0c0NvbnRhaW5lci5zZWxlY3RBbGwoJy5mbG9hdGluZy10ZXh0JykuZGF0YSh0aGlzLmRhdGEudGV4dHMsIChkLGkpPT4gZC4kaWQpO1xuICAgICAgICB0ZXh0cy5leGl0KCkucmVtb3ZlKCk7XG4gICAgICAgIHZhciB0ZXh0c0VudGVyID0gdGV4dHMuZW50ZXIoKS5hcHBlbmRTZWxlY3RvcignZy5mbG9hdGluZy10ZXh0JylcbiAgICAgICAgICAgIC5hdHRyKCdpZCcsIGQ9Pid0ZXh0LScrZC4kaWQpO1xuXG5cbiAgICAgICAgdmFyIHJlY3RXaWR0aCA9IDQwO1xuICAgICAgICB2YXIgcmVjdEhlaWdodCA9IDIwO1xuXG4gICAgICAgIHRleHRzRW50ZXIuYXBwZW5kKCdyZWN0JykuYXR0cigneCcsIC01KS5hdHRyKCd5JywgLTE2KS5hdHRyKCdmaWxsLW9wYWNpdHknLCAwKTtcbiAgICAgICAgdGV4dHNFbnRlci5hcHBlbmQoJ3RleHQnKTtcblxuICAgICAgICB2YXIgdGV4dHNNZXJnZSA9IHRleHRzRW50ZXIubWVyZ2UodGV4dHMpO1xuICAgICAgICB2YXIgdGV4dHNNZXJnZVQgPSB0ZXh0c01lcmdlO1xuICAgICAgICBpZih0aGlzLnRyYW5zaXRpb24pe1xuICAgICAgICAgICAgdGV4dHNNZXJnZVQgPSB0ZXh0c01lcmdlLnRyYW5zaXRpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRleHRzTWVyZ2VULmF0dHIoJ3RyYW5zZm9ybScsIGQ9Pid0cmFuc2xhdGUoJyArIGQubG9jYXRpb24ueCArICcgICcgKyBkLmxvY2F0aW9uLnkgKyAnKScpO1xuXG4gICAgICAgIHZhciB0c3BhbnMgPSB0ZXh0c01lcmdlLnNlbGVjdCgndGV4dCcpLnNlbGVjdEFsbCgndHNwYW4nKS5kYXRhKGQ9PmQudmFsdWUgPyBkLnZhbHVlLnNwbGl0KCdcXG4nKSA6IFtdKTtcblxuICAgICAgICB0c3BhbnMuZW50ZXIoKS5hcHBlbmQoJ3RzcGFuJylcbiAgICAgICAgICAgIC5tZXJnZSh0c3BhbnMpXG4gICAgICAgICAgICAuaHRtbChsPT5BcHBVdGlscy5yZXBsYWNlVXJscyhBcHBVdGlscy5lc2NhcGVIdG1sKGwpKSlcbiAgICAgICAgICAgIC5hdHRyKCdkeScsIChkLGkpPT5pPjAgPyAnMS4xZW0nOiB1bmRlZmluZWQpXG4gICAgICAgICAgICAuYXR0cigneCcsICcwJyk7XG5cbiAgICAgICAgdHNwYW5zLmV4aXQoKS5yZW1vdmUoKTtcbiAgICAgICAgdGV4dHNNZXJnZS5jbGFzc2VkKCdzZC1lbXB0eScsIGQ9PiFkLnZhbHVlIHx8ICFkLnZhbHVlLnRyaW0oKSk7XG4gICAgICAgIHRleHRzTWVyZ2Uuc2VsZWN0KCdyZWN0JykuYXR0cignd2lkdGgnLCByZWN0V2lkdGgpLmF0dHIoJ2hlaWdodCcsIHJlY3RIZWlnaHQpO1xuXG4gICAgICAgIHRleHRzTWVyZ2UuZWFjaChmdW5jdGlvbihkKXtcbiAgICAgICAgICAgIGlmKCFkLnZhbHVlKXtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgYmIgPSBkMy5zZWxlY3QodGhpcykuc2VsZWN0KCd0ZXh0Jykubm9kZSgpLmdldEJCb3goKTtcbiAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLnNlbGVjdCgncmVjdCcpXG4gICAgICAgICAgICAgICAuYXR0cigneScsIGJiLnktNSlcbiAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIE1hdGgubWF4KGJiLndpZHRoKzEwLCByZWN0V2lkdGgpKVxuICAgICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIE1hdGgubWF4KGJiLmhlaWdodCsxMCwgcmVjdEhlaWdodCkpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmKHRoaXMudGV4dERyYWdIYW5kbGVyKXtcbiAgICAgICAgICAgIHRleHRzTWVyZ2UuY2FsbCh0aGlzLnRleHREcmFnSGFuZGxlci5kcmFnKTtcbiAgICAgICAgfVxuICAgICAgICB0ZXh0c01lcmdlLm9uKCdjb250ZXh0bWVudScsIHRoaXMudGV4dENvbnRleHRNZW51KTtcbiAgICAgICAgdGV4dHNNZXJnZS5vbignZGJsY2xpY2snLCB0aGlzLnRleHRDb250ZXh0TWVudSk7XG4gICAgICAgIHRleHRzTWVyZ2UuZWFjaChmdW5jdGlvbihkLCBpKXtcbiAgICAgICAgICAgIHZhciBlbGVtID0gdGhpcztcbiAgICAgICAgICAgIHZhciBtYyA9IG5ldyBIYW1tZXIuTWFuYWdlcihlbGVtKTtcbiAgICAgICAgICAgIG1jLmFkZChuZXcgSGFtbWVyLlByZXNzKHtcbiAgICAgICAgICAgICAgICBwb2ludGVyVHlwZTogJ3RvdWNoJ1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9KVxuXG4gICAgfVxuXG4gICAgdXBkYXRlVmFsaWRhdGlvbk1lc3NhZ2VzKCkge1xuICAgICAgICB2YXIgbm9kZXMgPSB0aGlzLm1haW5Hcm91cC5zZWxlY3RBbGwoJy5ub2RlJyk7XG4gICAgICAgIG5vZGVzLmNsYXNzZWQoJ2Vycm9yJywgZmFsc2UpO1xuXG4gICAgICAgIHRoaXMuZGF0YS52YWxpZGF0aW9uUmVzdWx0cy5mb3JFYWNoKHZhbGlkYXRpb25SZXN1bHQ9PntcbiAgICAgICAgICAgIGlmKHZhbGlkYXRpb25SZXN1bHQuaXNWYWxpZCgpKXtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHZhbGlkYXRpb25SZXN1bHQub2JqZWN0SWRUb0Vycm9yKS5mb3JFYWNoKGlkPT57XG4gICAgICAgICAgICAgICAgdmFyIGVycm9ycyA9IHZhbGlkYXRpb25SZXN1bHQub2JqZWN0SWRUb0Vycm9yW2lkXTtcbiAgICAgICAgICAgICAgICB2YXIgbm9kZVNlbGVjdGlvbiA9IHRoaXMuZ2V0Tm9kZUQzU2VsZWN0aW9uQnlJZChpZCk7XG4gICAgICAgICAgICAgICAgbm9kZVNlbGVjdGlvbi5jbGFzc2VkKCdlcnJvcicsIHRydWUpO1xuICAgICAgICAgICAgICAgIHZhciB0b29sdGlwSHRtbCA9ICcnO1xuICAgICAgICAgICAgICAgIGVycm9ycy5mb3JFYWNoKGU9PntcbiAgICAgICAgICAgICAgICAgICAgaWYodG9vbHRpcEh0bWwpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcEh0bWwrPSc8YnIvPidcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwSHRtbCs9QXBwVXRpbHMuZ2V0VmFsaWRhdGlvbk1lc3NhZ2UoZSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBUb29sdGlwLmF0dGFjaChub2RlU2VsZWN0aW9uLnNlbGVjdCgnLmVycm9yLWluZGljYXRvcicpLCB0b29sdGlwSHRtbCk7XG5cblxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICBpbml0RWRnZU1hcmtlcnMoKSB7XG4gICAgICAgIHZhciBkZWZzID0gdGhpcy5zdmcuYXBwZW5kKFwic3ZnOmRlZnNcIik7XG5cbiAgICAgICAgdGhpcy5pbml0QXJyb3dNYXJrZXIoXCJhcnJvd1wiKTtcbiAgICAgICAgdGhpcy5pbml0QXJyb3dNYXJrZXIoXCJhcnJvdy1vcHRpbWFsXCIpO1xuICAgICAgICB0aGlzLmluaXRBcnJvd01hcmtlcihcImFycm93LXNlbGVjdGVkXCIpO1xuICAgIH1cblxuICAgIGluaXRBcnJvd01hcmtlcihpZCkge1xuXG4gICAgICAgIHZhciBkZWZzID0gdGhpcy5zdmcuc2VsZWN0KFwiZGVmc1wiKTtcbiAgICAgICAgZGVmcy5hcHBlbmQoXCJtYXJrZXJcIilcbiAgICAgICAgICAgIC5hdHRyKFwiaWRcIixpZClcbiAgICAgICAgICAgIC5hdHRyKFwidmlld0JveFwiLFwiMCAtNSAxMCAxMFwiKVxuICAgICAgICAgICAgLmF0dHIoXCJyZWZYXCIsNSlcbiAgICAgICAgICAgIC5hdHRyKFwicmVmWVwiLDApXG4gICAgICAgICAgICAuYXR0cihcIm1hcmtlcldpZHRoXCIsNClcbiAgICAgICAgICAgIC5hdHRyKFwibWFya2VySGVpZ2h0XCIsNClcbiAgICAgICAgICAgIC5hdHRyKFwib3JpZW50XCIsXCJhdXRvXCIpXG4gICAgICAgICAgICAuYXBwZW5kKFwicGF0aFwiKVxuICAgICAgICAgICAgLmF0dHIoXCJkXCIsIFwiTTAsLTVMMTAsMEwwLDVcIilcbiAgICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIixcImFycm93SGVhZFwiKTtcbiAgICB9XG5cbiAgICB1cGRhdGVCcnVzaEV4dGVudCgpIHtcbiAgICAgICAgdmFyIHNlbGYgPXRoaXM7XG4gICAgICAgIHRoaXMuYnJ1c2guZXh0ZW50KFtbMCwgMF0sIFtzZWxmLnN2Zy5hdHRyKCd3aWR0aCcpLCBzZWxmLnN2Zy5hdHRyKCdoZWlnaHQnKV1dKTtcbiAgICAgICAgdGhpcy5icnVzaENvbnRhaW5lci5jYWxsKHRoaXMuYnJ1c2gpO1xuICAgIH1cbiAgICBpbml0QnJ1c2goKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICB2YXIgYnJ1c2hDb250YWluZXIgPSBzZWxmLmJydXNoQ29udGFpbmVyID0gdGhpcy5icnVzaENvbnRhaW5lcj0gdGhpcy53cmFwcGVyR3JvdXAuc2VsZWN0T3JJbnNlcnQoXCJnLmJydXNoXCIsIFwiOmZpcnN0LWNoaWxkXCIpXG4gICAgICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwiYnJ1c2hcIik7XG5cbiAgICAgICAgdmFyIGJydXNoID0gdGhpcy5icnVzaCA9IGQzLmJydXNoKClcbiAgICAgICAgICAgIC5vbihcInN0YXJ0XCIsIGJydXNoc3RhcnQpXG4gICAgICAgICAgICAub24oXCJicnVzaFwiLCBicnVzaG1vdmUpXG4gICAgICAgICAgICAub24oXCJlbmRcIiwgYnJ1c2hlbmQpO1xuXG5cblxuICAgICAgICB0aGlzLnVwZGF0ZUJydXNoRXh0ZW50KCk7XG5cbiAgICAgICAgYnJ1c2hDb250YWluZXIuc2VsZWN0KCcub3ZlcmxheScpLm9uKFwibW91c2Vtb3ZlLmVkZ2VTZWxlY3Rpb25cIiwgbW91c2Vtb3ZlZCk7XG4gICAgICAgIGZ1bmN0aW9uIG1vdXNlbW92ZWQoKSB7XG4gICAgICAgICAgICB2YXIgbSA9IGQzLm1vdXNlKHRoaXMpO1xuICAgICAgICAgICAgdmFyIG1ndCA9IHNlbGYuZ2V0TWFpbkdyb3VwVHJhbnNsYXRpb24oKTtcbiAgICAgICAgICAgIHZhciBtYXJnaW4gPSAxMDtcblxuICAgICAgICAgICAgdmFyIGNsb3Nlc3QgPSBbbnVsbCwgOTk5OTk5OTk5XTtcbiAgICAgICAgICAgIHZhciBjbG9zZUVkZ2VzID0gW107XG4gICAgICAgICAgICBzZWxmLm1haW5Hcm91cC5zZWxlY3RBbGwoJy5lZGdlJykuZWFjaChmdW5jdGlvbihkKXtcbiAgICAgICAgICAgICAgICB2YXIgc2VsZWN0aW9uID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICAgICAgICAgIHNlbGVjdGlvbi5jbGFzc2VkKCdzZC1ob3ZlcicsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB2YXIgcGF0aE5vZGUgPSBzZWxlY3Rpb24uc2VsZWN0KCdwYXRoJykubm9kZSgpO1xuICAgICAgICAgICAgICAgIHZhciBiID0gcGF0aE5vZGUuZ2V0QkJveCgpO1xuICAgICAgICAgICAgICAgIGlmKGIueCttZ3RbMF0gPD1tWzBdICYmIGIueCtiLndpZHRoK21ndFswXSA+PSBtWzBdICYmXG4gICAgICAgICAgICAgICAgICAgYi55K21ndFsxXS1tYXJnaW4gPD1tWzFdICYmIGIueStiLmhlaWdodCttZ3RbMV0rbWFyZ2luID49IG1bMV0pe1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBjcCA9IEFwcFV0aWxzLmNsb3Nlc3RQb2ludChwYXRoTm9kZSwgW21bMF0tbWd0WzBdLCBtWzFdLW1ndFsxXV0pO1xuICAgICAgICAgICAgICAgICAgICBpZihjcC5kaXN0YW5jZSA8IG1hcmdpbiAmJiBjcC5kaXN0YW5jZTxjbG9zZXN0WzFdKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlc3QgPSBbc2VsZWN0aW9uLCBjcC5kaXN0YW5jZV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBzZWxmLmhvdmVyZWRFZGdlID0gbnVsbDtcbiAgICAgICAgICAgIGlmKGNsb3Nlc3RbMF0pe1xuICAgICAgICAgICAgICAgIGNsb3Nlc3RbMF0uY2xhc3NlZCgnc2QtaG92ZXInLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBzZWxmLmhvdmVyZWRFZGdlID0gY2xvc2VzdFswXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gYnJ1c2hzdGFydCgpIHtcbiAgICAgICAgICAgIGlmICghZDMuZXZlbnQuc2VsZWN0aW9uKSByZXR1cm47XG4gICAgICAgICAgICBpZihzZWxmLmhvdmVyZWRFZGdlKXtcbiAgICAgICAgICAgICAgICBzZWxmLnNlbGVjdEVkZ2Uoc2VsZi5ob3ZlcmVkRWRnZS5kYXR1bSgpLCB0cnVlKVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgc2VsZi5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgQ29udGV4dE1lbnUuaGlkZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSGlnaGxpZ2h0IHRoZSBzZWxlY3RlZCBub2Rlcy5cbiAgICAgICAgZnVuY3Rpb24gYnJ1c2htb3ZlKCkge1xuICAgICAgICAgICAgdmFyIHMgPSBkMy5ldmVudC5zZWxlY3Rpb247XG4gICAgICAgICAgICBpZighcylyZXR1cm47XG5cbiAgICAgICAgICAgIHNlbGYubWFpbkdyb3VwLnNlbGVjdEFsbChcIi5ub2RlXCIpLmNsYXNzZWQoJ3NlbGVjdGVkJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICB2YXIgbWFpbkdyb3VwVHJhbnNsYXRpb24gPSBzZWxmLmdldE1haW5Hcm91cFRyYW5zbGF0aW9uKCk7XG4gICAgICAgICAgICAgICAgdmFyIHggPSBkLmxvY2F0aW9uLngrbWFpbkdyb3VwVHJhbnNsYXRpb25bMF07XG4gICAgICAgICAgICAgICAgdmFyIHkgPSBkLmxvY2F0aW9uLnkrbWFpbkdyb3VwVHJhbnNsYXRpb25bMV07XG4gICAgICAgICAgICAgICAgdmFyIG5vZGVTaXplID0gc2VsZi5jb25maWcubGF5b3V0Lm5vZGVTaXplO1xuICAgICAgICAgICAgICAgIHZhciBvZmZzZXQgPSBub2RlU2l6ZSowLjI1O1xuICAgICAgICAgICAgICAgIHJldHVybiBzWzBdWzBdIDw9IHgrb2Zmc2V0ICYmIHgtb2Zmc2V0IDw9IHNbMV1bMF1cbiAgICAgICAgICAgICAgICAgICAgJiYgc1swXVsxXSA8PSB5K29mZnNldCAmJiB5LW9mZnNldCA8PSBzWzFdWzFdO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgdGhlIGJydXNoIGlzIGVtcHR5LCBzZWxlY3QgYWxsIGNpcmNsZXMuXG4gICAgICAgIGZ1bmN0aW9uIGJydXNoZW5kKCkge1xuICAgICAgICAgICAgaWYgKCFkMy5ldmVudC5zZWxlY3Rpb24pIHJldHVybjtcbiAgICAgICAgICAgIGJydXNoLm1vdmUoYnJ1c2hDb250YWluZXIsIG51bGwpO1xuXG4gICAgICAgICAgICB2YXIgc2VsZWN0ZWROb2RlcyA9IHNlbGYuZ2V0U2VsZWN0ZWROb2RlcygpO1xuICAgICAgICAgICAgaWYoc2VsZWN0ZWROb2RlcyAmJiBzZWxlY3RlZE5vZGVzLmxlbmd0aCA9PT0gMSl7XG4gICAgICAgICAgICAgICAgc2VsZi5zZWxlY3ROb2RlKHNlbGVjdGVkTm9kZXNbMF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gaWYgKCFkMy5ldmVudC5zZWxlY3Rpb24pIHNlbGYubWFpbkdyb3VwLnNlbGVjdEFsbChcIi5zZWxlY3RlZFwiKS5jbGFzc2VkKCdzZWxlY3RlZCcsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRpc2FibGVCcnVzaCgpe1xuICAgICAgICBpZighdGhpcy5icnVzaERpc2FibGVkKXtcbiAgICAgICAgICAgIEFwcFV0aWxzLmdyb3dsKGkxOG4udCgnZ3Jvd2wuYnJ1c2hEaXNhYmxlZCcpLCAnaW5mbycsICdsZWZ0JylcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmJydXNoRGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmJydXNoQ29udGFpbmVyLnJlbW92ZSgpO1xuICAgIH1cblxuICAgIGVuYWJsZUJydXNoKCl7XG4gICAgICAgIGlmKHRoaXMuYnJ1c2hEaXNhYmxlZCl7XG4gICAgICAgICAgICBBcHBVdGlscy5ncm93bChpMThuLnQoJ2dyb3dsLmJydXNoRW5hYmxlZCcpLCAnaW5mbycsICdsZWZ0JylcbiAgICAgICAgICAgIHRoaXMuaW5pdEJydXNoKCk7XG4gICAgICAgICAgICB0aGlzLmJydXNoRGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuXG5cbiAgICB9XG5cbiAgICBnZXRNYWluR3JvdXBUcmFuc2xhdGlvbihpbnZlcnQpIHtcbiAgICAgICAgdmFyIHRyYW5zbGF0aW9uID0gQXBwVXRpbHMuZ2V0VHJhbnNsYXRpb24odGhpcy5tYWluR3JvdXAuYXR0cihcInRyYW5zZm9ybVwiKSk7XG4gICAgICAgIGlmKGludmVydCl7XG4gICAgICAgICAgICB0cmFuc2xhdGlvblswXSA9IC10cmFuc2xhdGlvblswXTtcbiAgICAgICAgICAgIHRyYW5zbGF0aW9uWzFdID0gLXRyYW5zbGF0aW9uWzFdXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRyYW5zbGF0aW9uO1xuICAgIH1cblxuICAgIGluaXROb2RlQ29udGV4dE1lbnUoKSB7XG4gICAgICAgIHRoaXMubm9kZUNvbnRleHRNZW51ID0gbmV3IE5vZGVDb250ZXh0TWVudSh0aGlzLCB0aGlzLmNvbmZpZy5vcGVyYXRpb25zRm9yT2JqZWN0KTtcbiAgICB9XG5cbiAgICBpbml0RWRnZUNvbnRleHRNZW51KCkge1xuICAgICAgICB0aGlzLmVkZ2VDb250ZXh0TWVudSA9IG5ldyBFZGdlQ29udGV4dE1lbnUodGhpcyk7XG4gICAgfVxuXG4gICAgaW5pdFRleHRDb250ZXh0TWVudSgpIHtcbiAgICAgICAgdGhpcy50ZXh0Q29udGV4dE1lbnUgPSBuZXcgVGV4dENvbnRleHRNZW51KHRoaXMpO1xuICAgIH1cblxuXG5cbiAgICBpbml0TWFpbkNvbnRleHRNZW51KCkge1xuICAgICAgICB0aGlzLm1haW5Db250ZXh0TWVudSA9IG5ldyBNYWluQ29udGV4dE1lbnUodGhpcyk7XG4gICAgICAgIHRoaXMuc3ZnLm9uKCdjb250ZXh0bWVudScsdGhpcy5tYWluQ29udGV4dE1lbnUpO1xuICAgICAgICB0aGlzLnN2Zy5vbignZGJsY2xpY2snLHRoaXMubWFpbkNvbnRleHRNZW51KTtcbiAgICB9XG5cbiAgICBhZGRUZXh0KHRleHQpe1xuICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKCk7XG4gICAgICAgIHRoaXMuZGF0YS5hZGRUZXh0KHRleHQpO1xuICAgICAgICB0aGlzLnJlZHJhdygpO1xuICAgICAgICB0aGlzLnNlbGVjdFRleHQodGV4dCk7XG4gICAgfVxuXG4gICAgYWRkTm9kZShub2RlLCBwYXJlbnQsIHJlZHJhdz1mYWxzZSl7XG4gICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoKTtcbiAgICAgICAgdGhpcy5kYXRhLmFkZE5vZGUobm9kZSwgcGFyZW50KTtcbiAgICAgICAgdGhpcy5yZWRyYXcodHJ1ZSk7XG4gICAgICAgIHRoaXMubGF5b3V0LnVwZGF0ZShub2RlKTtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuXG4gICAgYWRkRGVjaXNpb25Ob2RlKHBhcmVudCl7XG4gICAgICAgIHZhciBuZXdOb2RlID0gbmV3IG1vZGVsLkRlY2lzaW9uTm9kZSh0aGlzLmxheW91dC5nZXROZXdDaGlsZExvY2F0aW9uKHBhcmVudCkpO1xuICAgICAgICB0aGlzLmFkZE5vZGUobmV3Tm9kZSwgcGFyZW50KVxuICAgIH1cbiAgICBhZGRDaGFuY2VOb2RlKHBhcmVudCl7XG4gICAgICAgIHZhciBuZXdOb2RlID0gbmV3IG1vZGVsLkNoYW5jZU5vZGUodGhpcy5sYXlvdXQuZ2V0TmV3Q2hpbGRMb2NhdGlvbihwYXJlbnQpKTtcbiAgICAgICAgdGhpcy5hZGROb2RlKG5ld05vZGUsIHBhcmVudClcbiAgICB9XG4gICAgYWRkVGVybWluYWxOb2RlKHBhcmVudCl7XG4gICAgICAgIHZhciBuZXdOb2RlID0gbmV3IG1vZGVsLlRlcm1pbmFsTm9kZSh0aGlzLmxheW91dC5nZXROZXdDaGlsZExvY2F0aW9uKHBhcmVudCkpO1xuICAgICAgICB0aGlzLmFkZE5vZGUobmV3Tm9kZSwgcGFyZW50KVxuICAgIH1cblxuICAgIGluamVjdE5vZGUobm9kZSwgZWRnZSl7XG4gICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoKTtcbiAgICAgICAgdGhpcy5kYXRhLmluamVjdE5vZGUobm9kZSwgZWRnZSk7XG4gICAgICAgIHRoaXMucmVkcmF3KCk7XG4gICAgICAgIHRoaXMubGF5b3V0LnVwZGF0ZShub2RlKTtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuXG4gICAgaW5qZWN0RGVjaXNpb25Ob2RlKGVkZ2Upe1xuICAgICAgICB2YXIgbmV3Tm9kZSA9IG5ldyBtb2RlbC5EZWNpc2lvbk5vZGUodGhpcy5sYXlvdXQuZ2V0SW5qZWN0ZWROb2RlTG9jYXRpb24oZWRnZSkpO1xuICAgICAgICB0aGlzLmluamVjdE5vZGUobmV3Tm9kZSwgZWRnZSk7XG5cbiAgICB9XG5cbiAgICBpbmplY3RDaGFuY2VOb2RlKGVkZ2Upe1xuICAgICAgICB2YXIgbmV3Tm9kZSA9IG5ldyBtb2RlbC5DaGFuY2VOb2RlKHRoaXMubGF5b3V0LmdldEluamVjdGVkTm9kZUxvY2F0aW9uKGVkZ2UpKTtcbiAgICAgICAgdGhpcy5pbmplY3ROb2RlKG5ld05vZGUsIGVkZ2UpO1xuICAgIH1cblxuICAgIHJlbW92ZU5vZGUobm9kZSkge1xuICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKCk7XG4gICAgICAgIHRoaXMuZGF0YS5yZW1vdmVOb2RlKG5vZGUpO1xuXG5cbiAgICAgICAgaWYoIXRoaXMubGF5b3V0LmlzTWFudWFsTGF5b3V0KCkpe1xuICAgICAgICAgICAgdGhpcy5sYXlvdXQudXBkYXRlKCk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5yZWRyYXcoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbW92ZVNlbGVjdGVkTm9kZXMoKSB7XG4gICAgICAgIHZhciBzZWxlY3RlZE5vZGVzID0gdGhpcy5nZXRTZWxlY3RlZE5vZGVzKCk7XG4gICAgICAgIGlmKCFzZWxlY3RlZE5vZGVzLmxlbmd0aCl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSgpO1xuICAgICAgICB0aGlzLmRhdGEucmVtb3ZlTm9kZXMoc2VsZWN0ZWROb2Rlcyk7XG4gICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgdGhpcy5yZWRyYXcoKTtcbiAgICAgICAgdGhpcy5sYXlvdXQudXBkYXRlKCk7XG4gICAgfVxuXG4gICAgcmVtb3ZlU2VsZWN0ZWRUZXh0cygpe1xuICAgICAgICB2YXIgc2VsZWN0ZWRUZXh0cyA9IHRoaXMuZ2V0U2VsZWN0ZWRUZXh0cygpO1xuXG4gICAgICAgIGlmKCFzZWxlY3RlZFRleHRzLmxlbmd0aCl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSgpO1xuICAgICAgICB0aGlzLmRhdGEucmVtb3ZlVGV4dHMoc2VsZWN0ZWRUZXh0cyk7XG4gICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgdGhpcy5yZWRyYXcoKTtcbiAgICB9XG5cbiAgICBjb3B5Tm9kZShkLCBub3RDbGVhclByZXZTZWxlY3Rpb24pIHtcbiAgICAgICAgdmFyIGNsb25lID0gdGhpcy5kYXRhLmNsb25lU3VidHJlZShkKTtcbiAgICAgICAgaWYobm90Q2xlYXJQcmV2U2VsZWN0aW9uKXtcbiAgICAgICAgICAgIGlmKCF0aGlzLmNvcGllZE5vZGVzKXtcbiAgICAgICAgICAgICAgICB0aGlzLmNvcGllZE5vZGVzPVtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jb3BpZWROb2Rlcy5wdXNoKGNsb25lKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLmNvcGllZE5vZGVzID0gW2Nsb25lXTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgY3V0Tm9kZShkKSB7XG4gICAgICAgIHRoaXMuY29weU5vZGUoZCk7XG4gICAgICAgIHRoaXMucmVtb3ZlTm9kZShkKTtcbiAgICB9XG5cbiAgICBjdXRTZWxlY3RlZE5vZGVzKCl7XG4gICAgICAgIHZhciBzZWxlY3RlZE5vZGVzID0gdGhpcy5nZXRTZWxlY3RlZE5vZGVzKCk7XG4gICAgICAgIHZhciBzZWxlY3RlZFJvb3RzID0gdGhpcy5kYXRhLmZpbmRTdWJ0cmVlUm9vdHMoc2VsZWN0ZWROb2Rlcyk7XG4gICAgICAgIHRoaXMuY29weU5vZGVzKHNlbGVjdGVkUm9vdHMpO1xuICAgICAgICB0aGlzLnJlbW92ZVNlbGVjdGVkTm9kZXMoKTtcbiAgICB9XG5cbiAgICBjb3B5U2VsZWN0ZWROb2RlcygpIHtcbiAgICAgICAgdmFyIHNlbGY7XG4gICAgICAgIHZhciBzZWxlY3RlZE5vZGVzID0gdGhpcy5nZXRTZWxlY3RlZE5vZGVzKCk7XG5cbiAgICAgICAgdmFyIHNlbGVjdGVkUm9vdHMgPSB0aGlzLmRhdGEuZmluZFN1YnRyZWVSb290cyhzZWxlY3RlZE5vZGVzKTtcbiAgICAgICAgdGhpcy5jb3B5Tm9kZXMoc2VsZWN0ZWRSb290cyk7XG5cblxuICAgIH1cblxuICAgIGNvcHlOb2Rlcyhub2Rlcyl7XG4gICAgICAgIHRoaXMuY29waWVkTm9kZXMgPSBub2Rlcy5tYXAoZD0+dGhpcy5kYXRhLmNsb25lU3VidHJlZShkKSk7XG4gICAgfVxuXG5cblxuICAgIHBhc3RlVG9Ob2RlKG5vZGUpIHtcbiAgICAgICAgaWYoIXRoaXMuY29waWVkTm9kZXMgfHwgIXRoaXMuY29waWVkTm9kZXMubGVuZ3RoKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKCk7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgc2VsZi5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICB2YXIgbm9kZXNUb0F0dGFjaCA9IHRoaXMuY29waWVkTm9kZXM7XG4gICAgICAgIHNlbGYuY29weU5vZGVzKHRoaXMuY29waWVkTm9kZXMpO1xuICAgICAgICBub2Rlc1RvQXR0YWNoLmZvckVhY2godG9BdHRhY2g9PntcbiAgICAgICAgICAgIHZhciBhdHRhY2hlZCA9IHRoaXMuZGF0YS5hdHRhY2hTdWJ0cmVlKHRvQXR0YWNoLCBub2RlKS5jaGlsZE5vZGU7XG4gICAgICAgICAgICBpZihhdHRhY2hlZC5mb2xkZWQpe1xuICAgICAgICAgICAgICAgIHNlbGYuZm9sZFN1YnRyZWUoYXR0YWNoZWQsIGF0dGFjaGVkLmZvbGRlZCwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGxvY2F0aW9uID0gc2VsZi5sYXlvdXQuZ2V0TmV3Q2hpbGRMb2NhdGlvbihub2RlKTtcbiAgICAgICAgICAgIGF0dGFjaGVkLm1vdmVUbyhsb2NhdGlvbi54LCBsb2NhdGlvbi55LCB0cnVlKTtcbiAgICAgICAgICAgIHNlbGYubGF5b3V0Lm1vdmVOb2RlVG9FbXB0eVBsYWNlKGF0dGFjaGVkLCBmYWxzZSk7XG4gICAgICAgICAgICBzZWxmLmxheW91dC5maXROb2Rlc0luUGxvdHRpbmdSZWdpb24odGhpcy5kYXRhLmdldEFsbERlc2NlbmRhbnROb2RlcyhhdHRhY2hlZCkpO1xuXG4gICAgICAgICAgICBzZWxmLnNlbGVjdFN1YlRyZWUoYXR0YWNoZWQsIGZhbHNlLCBub2Rlc1RvQXR0YWNoLmxlbmd0aD4xKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYobm9kZS5mb2xkZWQpe1xuICAgICAgICAgICAgc2VsZi5mb2xkU3VidHJlZShub2RlLCBub2RlLmZvbGRlZCwgZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgc2VsZi5yZWRyYXcoKTtcbiAgICAgICAgICAgIHNlbGYubGF5b3V0LnVwZGF0ZSgpO1xuICAgICAgICB9LDEwKVxuXG4gICAgfVxuXG4gICAgcGFzdGVUb05ld0xvY2F0aW9uKHBvaW50KSB7XG4gICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoKTtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBzZWxmLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgIHZhciBub2Rlc1RvQXR0YWNoID0gdGhpcy5jb3BpZWROb2RlcztcbiAgICAgICAgc2VsZi5jb3B5Tm9kZXModGhpcy5jb3BpZWROb2Rlcyk7XG4gICAgICAgIG5vZGVzVG9BdHRhY2guZm9yRWFjaCh0b0F0dGFjaD0+IHtcbiAgICAgICAgICAgIHZhciBhdHRhY2hlZCA9IHRoaXMuZGF0YS5hdHRhY2hTdWJ0cmVlKHRvQXR0YWNoKTtcbiAgICAgICAgICAgIGlmKGF0dGFjaGVkLmZvbGRlZCl7XG4gICAgICAgICAgICAgICAgc2VsZi5mb2xkU3VidHJlZShhdHRhY2hlZCwgYXR0YWNoZWQuZm9sZGVkLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhdHRhY2hlZC5tb3ZlVG8ocG9pbnQueCwgcG9pbnQueSwgdHJ1ZSk7XG4gICAgICAgICAgICBzZWxmLmxheW91dC5tb3ZlTm9kZVRvRW1wdHlQbGFjZShhdHRhY2hlZCwgZmFsc2UpO1xuICAgICAgICAgICAgc2VsZi5sYXlvdXQuZml0Tm9kZXNJblBsb3R0aW5nUmVnaW9uKHRoaXMuZGF0YS5nZXRBbGxEZXNjZW5kYW50Tm9kZXMoYXR0YWNoZWQpKTtcblxuICAgICAgICAgICAgc2VsZi5zZWxlY3RTdWJUcmVlKGF0dGFjaGVkLCBmYWxzZSwgbm9kZXNUb0F0dGFjaC5sZW5ndGg+MSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHNlbGYucmVkcmF3KCk7XG4gICAgICAgICAgICBzZWxmLmxheW91dC51cGRhdGUoKTtcbiAgICAgICAgfSwxMClcblxuICAgIH1cblxuICAgIGNvbnZlcnROb2RlKG5vZGUsIHR5cGVUb0NvbnZlcnRUbyl7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSgpO1xuICAgICAgICB0aGlzLmRhdGEuY29udmVydE5vZGUobm9kZSwgdHlwZVRvQ29udmVydFRvKTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgc2VsZi5yZWRyYXcodHJ1ZSk7XG4gICAgICAgIH0sMTApXG4gICAgfVxuXG4gICAgcGVyZm9ybU9wZXJhdGlvbihvYmplY3QsIG9wZXJhdGlvbil7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSgpO1xuICAgICAgICBvcGVyYXRpb24ucGVyZm9ybShvYmplY3QpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBzZWxmLnJlZHJhdygpO1xuICAgICAgICAgICAgc2VsZi5sYXlvdXQudXBkYXRlKCk7XG4gICAgICAgIH0sMTApXG4gICAgfVxuXG4gICAgZm9sZFN1YnRyZWUobm9kZSwgZm9sZCA9IHRydWUsIHJlZHJhdz10cnVlKXtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBub2RlLmZvbGRlZCA9IGZvbGQ7XG5cbiAgICAgICAgdGhpcy5kYXRhLmdldEFsbERlc2NlbmRhbnROb2Rlcyhub2RlKS5mb3JFYWNoKG49PntcbiAgICAgICAgICAgIG4uJGhpZGRlbiA9IGZvbGQ7XG4gICAgICAgICAgICBuLmZvbGRlZCA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5kYXRhLmdldEFsbERlc2NlbmRhbnRFZGdlcyhub2RlKS5mb3JFYWNoKGU9PmUuJGhpZGRlbiA9IGZvbGQpO1xuXG4gICAgICAgIGlmKCFyZWRyYXcpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHNlbGYucmVkcmF3KCk7XG4gICAgICAgICAgICBzZWxmLmxheW91dC51cGRhdGUoKTtcbiAgICAgICAgfSwxMClcbiAgICB9XG5cbiAgICB1cGRhdGVWaXNpYmlsaXR5KG5vZGUgPSBudWxsKXtcbiAgICAgICAgaWYoIW5vZGUpe1xuICAgICAgICAgICAgdGhpcy5kYXRhLmdldFJvb3RzKCkuZm9yRWFjaChuPT50aGlzLnVwZGF0ZVZpc2liaWxpdHkobikpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYobm9kZS5mb2xkZWQpe1xuICAgICAgICAgICAgdGhpcy5mb2xkU3VidHJlZShub2RlLCB0cnVlLCBmYWxzZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBub2RlLmNoaWxkRWRnZXMuZm9yRWFjaChlID0+IHRoaXMudXBkYXRlVmlzaWJpbGl0eShlLmNoaWxkTm9kZSkpO1xuXG4gICAgfVxuXG4gICAgbW92ZU5vZGVUbyh4LHkpe1xuXG4gICAgfVxuXG4gICAgdXBkYXRlTm9kZVBvc2l0aW9uKG5vZGUpIHtcbiAgICAgICAgdGhpcy5nZXROb2RlRDNTZWxlY3Rpb24obm9kZSkucmFpc2UoKS5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcrbm9kZS5sb2NhdGlvbi54KycgJytub2RlLmxvY2F0aW9uLnkrJyknKTtcbiAgICB9XG5cbiAgICB1cGRhdGVUZXh0UG9zaXRpb24odGV4dCkge1xuICAgICAgICB0aGlzLmdldFRleHREM1NlbGVjdGlvbih0ZXh0KS5yYWlzZSgpLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyt0ZXh0LmxvY2F0aW9uLngrJyAnK3RleHQubG9jYXRpb24ueSsnKScpO1xuICAgIH1cblxuICAgIGdldE5vZGVEM1NlbGVjdGlvbihub2RlKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Tm9kZUQzU2VsZWN0aW9uQnlJZChub2RlLiRpZCk7XG4gICAgfVxuXG4gICAgZ2V0Tm9kZUQzU2VsZWN0aW9uQnlJZChpZCl7XG4gICAgICAgIHJldHVybiB0aGlzLm1haW5Hcm91cC5zZWxlY3QoJyNub2RlLScraWQpO1xuICAgIH1cbiAgICBnZXRUZXh0RDNTZWxlY3Rpb24odGV4dCl7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFRleHREM1NlbGVjdGlvbkJ5SWQodGV4dC4kaWQpO1xuICAgIH1cbiAgICBnZXRUZXh0RDNTZWxlY3Rpb25CeUlkKGlkKXtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFpbkdyb3VwLnNlbGVjdCgnI3RleHQtJytpZCk7XG4gICAgfVxuXG4gICAgZ2V0U2VsZWN0ZWROb2Rlcyh2aXNpYmxlT25seSA9IGZhbHNlKSB7XG4gICAgICAgIGxldCBzZWxlY3RlZFZpc2libGUgPSB0aGlzLm1haW5Hcm91cC5zZWxlY3RBbGwoXCIubm9kZS5zZWxlY3RlZFwiKS5kYXRhKCk7XG4gICAgICAgIGlmKHZpc2libGVPbmx5KXtcbiAgICAgICAgICAgIHJldHVybiBzZWxlY3RlZFZpc2libGU7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYWxsU2VsZWN0ZWQgID0gW107XG4gICAgICAgIGFsbFNlbGVjdGVkLnB1c2goLi4uc2VsZWN0ZWRWaXNpYmxlKTtcblxuICAgICAgICBzZWxlY3RlZFZpc2libGUuZm9yRWFjaChuPT57XG4gICAgICAgICAgICBpZihuLmZvbGRlZCl7XG4gICAgICAgICAgICAgICAgbGV0IGRlc2NlbmRhbnRzID0gdGhpcy5kYXRhLmdldEFsbERlc2NlbmRhbnROb2RlcyhuKTtcbiAgICAgICAgICAgICAgICBpZihkZXNjZW5kYW50cyl7XG4gICAgICAgICAgICAgICAgICAgIGFsbFNlbGVjdGVkLnB1c2goLi4uZGVzY2VuZGFudHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGFsbFNlbGVjdGVkO1xuICAgIH1cblxuICAgIGdldFNlbGVjdGVkVGV4dHMoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFpbkdyb3VwLnNlbGVjdEFsbChcIi5mbG9hdGluZy10ZXh0LnNlbGVjdGVkXCIpLmRhdGEoKTtcbiAgICB9XG5cbiAgICBjbGVhclNlbGVjdGlvbigpe1xuICAgICAgICB0aGlzLm1haW5Hcm91cC5zZWxlY3RBbGwoXCIuZWRnZS5zZWxlY3RlZFwiKS5zZWxlY3QoJ3BhdGgnKS5hdHRyKFwibWFya2VyLWVuZFwiLCBkID0+IFwidXJsKCNhcnJvd1wiKyh0aGlzLmlzT3B0aW1hbChkKT8nLW9wdGltYWwnOicnKStcIilcIilcbiAgICAgICAgdGhpcy5tYWluR3JvdXAuc2VsZWN0QWxsKFwiLnNlbGVjdGVkXCIpLmNsYXNzZWQoJ3NlbGVjdGVkJywgZmFsc2UpO1xuICAgICAgICB0aGlzLmNvbmZpZy5vblNlbGVjdGlvbkNsZWFyZWQoKTtcbiAgICB9XG5cbiAgICBzZWxlY3RFZGdlKGVkZ2UsIGNsZWFyU2VsZWN0aW9uQmVmb3JlU2VsZWN0KXtcbiAgICAgICAgaWYoY2xlYXJTZWxlY3Rpb25CZWZvcmVTZWxlY3Qpe1xuICAgICAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29uZmlnLm9uRWRnZVNlbGVjdGVkKGVkZ2UpO1xuICAgICAgICB0aGlzLm1haW5Hcm91cC5zZWxlY3QoJyNlZGdlLScrZWRnZS4kaWQpXG4gICAgICAgICAgICAuY2xhc3NlZCgnc2VsZWN0ZWQnLCB0cnVlKVxuICAgICAgICAgICAgLnNlbGVjdCgncGF0aCcpXG4gICAgICAgICAgICAuYXR0cihcIm1hcmtlci1lbmRcIiwgZCA9PiBcInVybCgjYXJyb3ctc2VsZWN0ZWQpXCIpXG4gICAgfVxuXG4gICAgaXNOb2RlU2VsZWN0ZWQobm9kZSl7XG4gICAgICAgIHJldHVybiB0aGlzLmdldE5vZGVEM1NlbGVjdGlvbihub2RlKS5jbGFzc2VkKCdzZWxlY3RlZCcpO1xuICAgIH1cblxuICAgIHNlbGVjdE5vZGUobm9kZSwgY2xlYXJTZWxlY3Rpb25CZWZvcmVTZWxlY3QsIHNraXBDYWxsYmFjayl7XG4gICAgICAgIGlmKGNsZWFyU2VsZWN0aW9uQmVmb3JlU2VsZWN0KXtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCFza2lwQ2FsbGJhY2spe1xuICAgICAgICAgICAgdGhpcy5jb25maWcub25Ob2RlU2VsZWN0ZWQobm9kZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmdldE5vZGVEM1NlbGVjdGlvbkJ5SWQobm9kZS4kaWQpLmNsYXNzZWQoJ3NlbGVjdGVkJywgdHJ1ZSk7XG4gICAgfVxuXG4gICAgc2VsZWN0VGV4dCh0ZXh0LCBjbGVhclNlbGVjdGlvbkJlZm9yZVNlbGVjdCwgc2tpcENhbGxiYWNrKXtcbiAgICAgICAgaWYoY2xlYXJTZWxlY3Rpb25CZWZvcmVTZWxlY3Qpe1xuICAgICAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIXNraXBDYWxsYmFjayl7XG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5vblRleHRTZWxlY3RlZCh0ZXh0KVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5nZXRUZXh0RDNTZWxlY3Rpb25CeUlkKHRleHQuJGlkKS5jbGFzc2VkKCdzZWxlY3RlZCcsIHRydWUpO1xuICAgIH1cblxuICAgIHNlbGVjdFN1YlRyZWUobm9kZSwgY2xlYXJTZWxlY3Rpb25CZWZvcmVTZWxlY3Qsc2tpcENhbGxiYWNrKSB7XG4gICAgICAgIGlmKGNsZWFyU2VsZWN0aW9uQmVmb3JlU2VsZWN0KXtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNlbGVjdE5vZGUobm9kZSwgZmFsc2UsIHNraXBDYWxsYmFjayk7XG4gICAgICAgIG5vZGUuY2hpbGRFZGdlcy5mb3JFYWNoKGU9PnRoaXMuc2VsZWN0U3ViVHJlZShlLmNoaWxkTm9kZSwgZmFsc2UsIHRydWUpKTtcbiAgICB9XG5cbiAgICBzZWxlY3RBbGxOb2RlcygpIHtcbiAgICAgICAgdGhpcy5tYWluR3JvdXAuc2VsZWN0QWxsKFwiLm5vZGVcIikuY2xhc3NlZCgnc2VsZWN0ZWQnLCB0cnVlKTtcbiAgICB9XG5cbiAgICBhdXRvTGF5b3V0KHR5cGUsIHdpdGhvdXRTdGF0ZVNhdmluZyl7XG4gICAgICAgIHRoaXMubGF5b3V0LmF1dG9MYXlvdXQodHlwZSwgd2l0aG91dFN0YXRlU2F2aW5nKTtcbiAgICB9XG5cbiAgICB1cGRhdGVEaWFncmFtVGl0bGUodGl0bGVWYWx1ZSl7XG4gICAgICAgIGlmKCF0aXRsZVZhbHVlKXtcbiAgICAgICAgICAgIHRpdGxlVmFsdWUgPSAnJztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRpYWdyYW1UaXRsZSA9IHRpdGxlVmFsdWU7XG4gICAgICAgIHRoaXMucmVkcmF3RGlhZ3JhbVRpdGxlKCk7XG4gICAgICAgIHRoaXMucmVkcmF3RGlhZ3JhbURlc2NyaXB0aW9uKCk7XG4gICAgICAgIHRoaXMudXBkYXRlTWFyZ2luKHRydWUpO1xuICAgIH1cblxuICAgIHJlZHJhd0RpYWdyYW1UaXRsZSgpe1xuICAgICAgICB2YXIgc3ZnV2lkdGggPSB0aGlzLnN2Zy5hdHRyKCd3aWR0aCcpO1xuICAgICAgICB2YXIgc3ZnSGVpZ2h0ID0gdGhpcy5zdmcuYXR0cignaGVpZ2h0Jyk7XG4gICAgICAgIHRoaXMudGl0bGVDb250YWluZXIgPSB0aGlzLnN2Zy5zZWxlY3RPckFwcGVuZCgnZy5zZC10aXRsZS1jb250YWluZXInKTtcblxuICAgICAgICB2YXIgdGl0bGUgPSB0aGlzLnRpdGxlQ29udGFpbmVyLnNlbGVjdE9yQXBwZW5kKCd0ZXh0LnNkLXRpdGxlJyk7XG4gICAgICAgIHRpdGxlLnRleHQodGhpcy5kaWFncmFtVGl0bGUpO1xuICAgICAgICBMYXlvdXQuc2V0SGFuZ2luZ1Bvc2l0aW9uKHRpdGxlKTtcblxuICAgICAgICB2YXIgbWFyZ2luVG9wID0gcGFyc2VJbnQodGhpcy5jb25maWcudGl0bGUubWFyZ2luLnRvcCk7XG4gICAgICAgIHRoaXMudGl0bGVDb250YWluZXIuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnKyhzdmdXaWR0aC8yKSsnLCcrKCBtYXJnaW5Ub3ApKycpJyk7XG4gICAgfVxuICAgIHJlZHJhd0RpYWdyYW1EZXNjcmlwdGlvbigpe1xuICAgICAgICB2YXIgc3ZnV2lkdGggPSB0aGlzLnN2Zy5hdHRyKCd3aWR0aCcpO1xuICAgICAgICB2YXIgc3ZnSGVpZ2h0ID0gdGhpcy5zdmcuYXR0cignaGVpZ2h0Jyk7XG4gICAgICAgIHRoaXMudGl0bGVDb250YWluZXIgPSB0aGlzLnN2Zy5zZWxlY3RPckFwcGVuZCgnZy5zZC10aXRsZS1jb250YWluZXInKTtcblxuICAgICAgICB2YXIgZGVzYyA9IHRoaXMudGl0bGVDb250YWluZXIuc2VsZWN0T3JBcHBlbmQoJ3RleHQuc2QtZGVzY3JpcHRpb24nKTtcblxuICAgICAgICBpZighdGhpcy5jb25maWcuZGVzY3JpcHRpb24uc2hvdyl7XG4gICAgICAgICAgICBkZXNjLnJlbW92ZSgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGxpbmVzID0gdGhpcy5kaWFncmFtRGVzY3JpcHRpb24gPyB0aGlzLmRpYWdyYW1EZXNjcmlwdGlvbi5zcGxpdCgnXFxuJykgOiBbXTtcbiAgICAgICAgdmFyIHRzcGFucyA9IGRlc2Muc2VsZWN0QWxsKCd0c3BhbicpLmRhdGEobGluZXMpO1xuICAgICAgICB0c3BhbnMuZW50ZXIoKS5hcHBlbmQoJ3RzcGFuJylcbiAgICAgICAgICAgIC5tZXJnZSh0c3BhbnMpXG4gICAgICAgICAgICAuaHRtbChsPT5BcHBVdGlscy5yZXBsYWNlVXJscyhBcHBVdGlscy5lc2NhcGVIdG1sKGwpKSlcbiAgICAgICAgICAgIC5hdHRyKCdkeScsIChkLGkpPT5pPjAgPyAnMS4xZW0nOiB1bmRlZmluZWQpXG4gICAgICAgICAgICAuYXR0cigneCcsICcwJyk7XG5cbiAgICAgICAgdHNwYW5zLmV4aXQoKS5yZW1vdmUoKTtcbiAgICAgICAgTGF5b3V0LnNldEhhbmdpbmdQb3NpdGlvbihkZXNjKTtcblxuICAgICAgICB2YXIgdGl0bGUgPSB0aGlzLnRpdGxlQ29udGFpbmVyLnNlbGVjdE9yQXBwZW5kKCd0ZXh0LnNkLXRpdGxlJyk7XG5cbiAgICAgICAgdmFyIG1hcmdpblRvcCA9IDA7XG4gICAgICAgIGlmKHRoaXMuZGlhZ3JhbVRpdGxlKXtcbiAgICAgICAgICAgIG1hcmdpblRvcCArPSB0aXRsZS5ub2RlKCkuZ2V0QkJveCgpLmhlaWdodDtcbiAgICAgICAgICAgIG1hcmdpblRvcCs9IE1hdGgubWF4KHBhcnNlSW50KHRoaXMuY29uZmlnLmRlc2NyaXB0aW9uLm1hcmdpbi50b3ApLCAwKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgZGVzYy5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKDAsJysoIG1hcmdpblRvcCkrJyknKTtcbiAgICB9XG5cbiAgICB1cGRhdGVEaWFncmFtRGVzY3JpcHRpb24oZGVzY3JpcHRpb25WYWx1ZSl7XG4gICAgICAgIGlmKCFkZXNjcmlwdGlvblZhbHVlKXtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uVmFsdWUgPSAnJztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRpYWdyYW1EZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uVmFsdWU7XG4gICAgICAgIHRoaXMucmVkcmF3RGlhZ3JhbVRpdGxlKCk7XG4gICAgICAgIHRoaXMucmVkcmF3RGlhZ3JhbURlc2NyaXB0aW9uKCk7XG4gICAgICAgIHRoaXMudXBkYXRlTWFyZ2luKHRydWUpO1xuICAgIH1cblxuXG4gICAgZ2V0VGl0bGVHcm91cEhlaWdodCh3aXRoTWFyZ2lucyl7XG4gICAgICAgIGlmKCF0aGlzLnRpdGxlQ29udGFpbmVyKXtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIHZhciBoID0gdGhpcy50aXRsZUNvbnRhaW5lci5ub2RlKCkuZ2V0QkJveCgpLmhlaWdodDtcbiAgICAgICAgaWYod2l0aE1hcmdpbnMpe1xuICAgICAgICAgICAgaCs9IHBhcnNlSW50KHRoaXMuY29uZmlnLnRpdGxlLm1hcmdpbi5ib3R0b20pO1xuICAgICAgICAgICAgaCs9IHBhcnNlSW50KHRoaXMuY29uZmlnLnRpdGxlLm1hcmdpbi50b3ApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBoO1xuICAgIH1cblxufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9zcmMvaW5kZXgnXG4iXX0=
