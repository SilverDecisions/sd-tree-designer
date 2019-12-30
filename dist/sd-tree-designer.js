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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLXV0aWxzLmpzIiwic3JjL2NvbnRleHQtbWVudS9jb250ZXh0LW1lbnUuanMiLCJzcmMvY29udGV4dC1tZW51L2VkZ2UtY29udGV4dC1tZW51LmpzIiwic3JjL2NvbnRleHQtbWVudS9tYWluLWNvbnRleHQtbWVudS5qcyIsInNyYy9jb250ZXh0LW1lbnUvbm9kZS1jb250ZXh0LW1lbnUuanMiLCJzcmMvY29udGV4dC1tZW51L3RleHQtY29udGV4dC1tZW51LmpzIiwic3JjL2QzLWV4dGVuc2lvbnMuanMiLCJzcmMvZDMuanMiLCJzcmMvaTE4bi9kZS5qc29uIiwic3JjL2kxOG4vZW4uanNvbiIsInNyYy9pMThuL2ZyLmpzb24iLCJzcmMvaTE4bi9pMThuLmpzIiwic3JjL2kxOG4vaXQuanNvbiIsInNyYy9pMThuL3BsLmpzb24iLCJzcmMvaW5kZXguanMiLCJzcmMvbGF5b3V0LmpzIiwic3JjL25vZGUtZHJhZy1oYW5kbGVyLmpzIiwic3JjL3N5bWJvbHMvY2lyY2xlLmpzIiwic3JjL3N5bWJvbHMvdHJpYW5nbGUuanMiLCJzcmMvdGVtcGxhdGVzLmpzIiwic3JjL3RlbXBsYXRlcy9ncm93bF9tZXNzYWdlLmh0bWwiLCJzcmMvdGV4dC1kcmFnLWhhbmRsZXIuanMiLCJzcmMvdG9vbHRpcC5qcyIsInNyYy90cmVlLWRlc2lnbmVyLmpzIiwiaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FDQUEsSUFBQSxFQUFBLEdBQUEsdUJBQUEsQ0FBQSxPQUFBLENBQUEsTUFBQSxDQUFBLENBQUE7O0FBQ0EsSUFBQSxVQUFBLEdBQUEsT0FBQSxDQUFBLGFBQUEsQ0FBQTs7QUFDQSxJQUFBLEtBQUEsR0FBQSxPQUFBLENBQUEsYUFBQSxDQUFBOztBQUNBLElBQUEsUUFBQSxHQUFBLE9BQUEsQ0FBQSxVQUFBLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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QSxFQUFBO0FBQUEsRUFBQSxNQUFBLENBQUEsY0FBQSxDQUFBLE9BQUEsRUFBQSxHQUFBLEVBQUE7QUFBQSxJQUFBLFVBQUEsRUFBQSxJQUFBO0FBQUEsSUFBQSxHQUFBLEVBQUEsU0FBQSxHQUFBLEdBQUE7QUFBQSxhQUFBLFlBQUEsQ0FBQSxHQUFBLENBQUE7QUFBQTtBQUFBLEdBQUE7QUFBQSxDQUFBOztBQUNBLElBQUEsUUFBQSxHQUFBLE9BQUEsQ0FBQSxVQUFBLENBQUE7O0FBQUEsTUFBQSxDQUFBLElBQUEsQ0FBQSxRQUFBLEVBQUEsT0FBQSxDQUFBLFVBQUEsR0FBQSxFQUFBO0FBQUEsTUFBQSxHQUFBLEtBQUEsU0FBQSxJQUFBLEdBQUEsS0FBQSxZQUFBLEVBQUE7QUFBQSxFQUFBLE1BQUEsQ0FBQSxjQUFBLENBQUEsT0FBQSxFQUFBLEdBQUEsRUFBQTtBQUFBLElBQUEsVUFBQSxFQUFBLElBQUE7QUFBQSxJQUFBLEdBQUEsRUFBQSxTQUFBLEdBQUEsR0FBQTtBQUFBLGFBQUEsUUFBQSxDQUFBLEdBQUEsQ0FBQTtBQUFBO0FBQUEsR0FBQTtBQUFBLENBQUE7O0FBQ0EsSUFBQSxPQUFBLEdBQUEsT0FBQSxDQUFBLFNBQUEsQ0FBQTs7QUFBQSxNQUFBLENBQUEsSUFBQSxDQUFBLE9BQUEsRUFBQSxPQUFBLENBQUEsVUFBQSxHQUFBLEVBQUE7QUFBQSxNQUFBLEdBQUEsS0FBQSxTQUFBLElBQUEsR0FBQSxLQUFBLFlBQUEsRUFBQTtBQUFBLEVBQUEsTUFBQSxDQUFBLGNBQUEsQ0FBQSxPQUFBLEVBQUEsR0FBQSxFQUFBO0FBQUEsSUFBQSxVQUFBLEVBQUEsSUFBQTtBQUFBLElBQUEsR0FBQSxFQUFBLFNBQUEsR0FBQSxHQUFBO0FBQUEsYUFBQSxPQUFBLENBQUEsR0FBQSxDQUFBO0FBQUE7QUFBQSxHQUFBO0FBQUEsQ0FBQTs7QUFDQSxJQUFBLFFBQUEsR0FBQSxPQUFBLENBQUEsVUFBQSxDQUFBOztBQUFBLE1BQUEsQ0FBQSxJQUFBLENBQUEsUUFBQSxFQUFBLE9BQUEsQ0FBQSxVQUFBLEdBQUEsRUFBQTtBQUFBLE1BQUEsR0FBQSxLQUFBLFNBQUEsSUFBQSxHQUFBLEtBQUEsWUFBQSxFQUFBO0FBQUEsRUFBQSxNQUFBLENBQUEsY0FBQSxDQUFBLE9BQUEsRUFBQSxHQUFBLEVBQUE7QUFBQSxJQUFBLFVBQUEsRUFBQSxJQUFBO0FBQUEsSUFBQSxHQUFBLEVBQUEsU0FBQSxHQUFBLEdBQUE7QUFBQSxhQUFBLFFBQUEsQ0FBQSxHQUFBLENBQUE7QUFBQTtBQUFBLEdBQUE7QUFBQSxDQUFBOztBQUNBLElBQUEsUUFBQSxHQUFBLE9BQUEsQ0FBQSxVQUFBLENBQUE7O0FBQUEsTUFBQSxDQUFBLElBQUEsQ0FBQSxRQUFBLEVBQUEsT0FBQSxDQUFBLFVBQUEsR0FBQSxFQUFBO0FBQUEsTUFBQSxHQUFBLEtBQUEsU0FBQSxJQUFBLEdBQUEsS0FBQSxZQUFBLEVBQUE7QUFBQSxFQUFBLE1BQUEsQ0FBQSxjQUFBLENBQUEsT0FBQSxFQUFBLEdBQUEsRUFBQTtBQUFBLElBQUEsVUFBQSxFQUFBLElBQUE7QUFBQSxJQUFBLEdBQUEsRUFBQSxTQUFBLEdBQUEsR0FBQTtBQUFBLGFBQUEsUUFBQSxDQUFBLEdBQUEsQ0FBQTtBQUFBO0FBQUEsR0FBQTtBQUFBLENBQUE7O0FBQ0EsSUFBQSxZQUFBLEdBQUEsT0FBQSxDQUFBLGNBQUEsQ0FBQTs7QUFBQSxNQUFBLENBQUEsSUFBQSxDQUFBLFlBQUEsRUFBQSxPQUFBLENBQUEsVUFBQSxHQUFBLEVBQUE7QUFBQSxNQUFBLEdBQUEsS0FBQSxTQUFBLElBQUEsR0FBQSxLQUFBLFlBQUEsRUFBQTtBQUFBLEVBQUEsTUFBQSxDQUFBLGNBQUEsQ0FBQSxPQUFBLEVBQUEsR0FBQSxFQUFBO0FBQUEsSUFBQSxVQUFBLEVBQUEsSUFBQTtBQUFBLElBQUEsR0FBQSxFQUFBLFNBQUEsR0FBQSxHQUFBO0FBQUEsYUFBQSxZQUFBLENBQUEsR0FBQSxDQUFBO0FBQUE7QUFBQSxHQUFBO0FBQUEsQ0FBQTs7QUFDQSxJQUFBLGFBQUEsR0FBQSxPQUFBLENBQUEsZ0JBQUEsQ0FBQTs7QUFBQSxNQUFBLENBQUEsSUFBQSxDQUFBLGFBQUEsRUFBQSxPQUFBLENBQUEsVUFBQSxHQUFBLEVBQUE7QUFBQSxNQUFBLEdBQUEsS0FBQSxTQUFBLElBQUEsR0FBQSxLQUFBLFlBQUEsRUFBQTtBQUFBLEVBQUEsTUFBQSxDQUFBLGNBQUEsQ0FBQSxPQUFBLEVBQUEsR0FBQSxFQUFBO0FBQUEsSUFBQSxVQUFBLEVBQUEsSUFBQTtBQUFBLElBQUEsR0FBQSxFQUFBLFNBQUEsR0FBQSxHQUFBO0FBQUEsYUFBQSxhQUFBLENBQUEsR0FBQSxDQUFBO0FBQUE7QUFBQSxHQUFBO0FBQUEsQ0FBQTs7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ2xFQSxJQUFBLFFBQUEsR0FBQSxzQkFBQSxDQUFBLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBQTs7QUFDQSxJQUFBLEVBQUEsR0FBQSx1QkFBQSxDQUFBLE9BQUEsQ0FBQSxXQUFBLENBQUEsQ0FBQTs7QUFDQSxJQUFBLEVBQUEsR0FBQSx1QkFBQSxDQUFBLE9BQUEsQ0FBQSxXQUFBLENBQUEsQ0FBQTs7QUFDQSxJQUFBLEVBQUEsR0FBQSx1QkFBQSxDQUFBLE9BQUEsQ0FBQSxXQUFBLENBQUEsQ0FBQTs7QUFDQSxJQUFBLEVBQUEsR0FBQSx1QkFBQSxDQUFBLE9BQUEsQ0FBQSxXQUFBLENBQUEsQ0FBQTs7QUFDQSxJQUFBLEVBQUEsR0FBQSx1QkFBQSxDQUFBLE9BQUEsQ0FBQSxXQUFBLENBQUEsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVhLEk7Ozs7Ozs7Ozt5QkFLRyxHLEVBQUk7QUFDWixNQUFBLElBQUksQ0FBSixRQUFBLEdBQUEsR0FBQTtBQUNBLFVBQUksU0FBUyxHQUFHO0FBQ1osUUFBQSxFQUFFLEVBQUU7QUFDQSxVQUFBLFdBQVcsRUFBRTtBQURiLFNBRFE7QUFJWixRQUFBLEVBQUUsRUFBRTtBQUNBLFVBQUEsV0FBVyxFQUFFO0FBRGIsU0FKUTtBQU9aLFFBQUEsRUFBRSxFQUFFO0FBQ0EsVUFBQSxXQUFXLEVBQUU7QUFEYixTQVBRO0FBVVosUUFBQSxFQUFFLEVBQUU7QUFDQSxVQUFBLFdBQVcsRUFBRTtBQURiLFNBVlE7QUFhWixRQUFBLEVBQUUsRUFBRTtBQUNBLFVBQUEsV0FBVyxFQUFFO0FBRGI7QUFiUSxPQUFoQjtBQWlCQSxNQUFBLElBQUksQ0FBSixTQUFBLEdBQWlCLFFBQUEsQ0FBQSxTQUFBLENBQUEsQ0FBQSxjQUFBLENBQXVCO0FBQ3BDLFFBQUEsR0FBRyxFQURpQyxHQUFBO0FBRXBDLFFBQUEsV0FBVyxFQUZ5QixJQUFBO0FBR3BDLFFBQUEsU0FBUyxFQUFFO0FBSHlCLE9BQXZCLEVBSWQsVUFBQSxHQUFBLEVBQUEsQ0FBQSxFQUFZLENBSmYsQ0FBaUIsQ0FBakI7QUFNSDs7O3NCQUVRLEcsRUFBSyxHLEVBQUk7QUFDZCxhQUFPLElBQUksQ0FBSixTQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUEsRUFBUCxHQUFPLENBQVA7QUFDSDs7Ozs7Ozs7O0FDekNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyRUEsSUFBQSxhQUFBLEdBQUEsT0FBQSxDQUFBLGlCQUFBLENBQUE7O0FBT0EsTUFBQSxDQUFBLElBQUEsQ0FBQSxhQUFBLEVBQUEsT0FBQSxDQUFBLFVBQUEsR0FBQSxFQUFBO0FBQUEsTUFBQSxHQUFBLEtBQUEsU0FBQSxJQUFBLEdBQUEsS0FBQSxZQUFBLEVBQUE7QUFBQSxNQUFBLE1BQUEsQ0FBQSxTQUFBLENBQUEsY0FBQSxDQUFBLElBQUEsQ0FBQSxZQUFBLEVBQUEsR0FBQSxDQUFBLEVBQUE7QUFBQSxFQUFBLE1BQUEsQ0FBQSxjQUFBLENBQUEsT0FBQSxFQUFBLEdBQUEsRUFBQTtBQUFBLElBQUEsVUFBQSxFQUFBLElBQUE7QUFBQSxJQUFBLEdBQUEsRUFBQSxTQUFBLEdBQUEsR0FBQTtBQUFBLGFBQUEsYUFBQSxDQUFBLEdBQUEsQ0FBQTtBQUFBO0FBQUEsR0FBQTtBQUFBLENBQUE7O0FBSkEsSUFBQSxhQUFBLEdBQUEsT0FBQSxDQUFBLGlCQUFBLENBQUE7O0FBQUEsTUFBQSxDQUFBLElBQUEsQ0FBQSxhQUFBLEVBQUEsT0FBQSxDQUFBLFVBQUEsR0FBQSxFQUFBO0FBQUEsTUFBQSxHQUFBLEtBQUEsU0FBQSxJQUFBLEdBQUEsS0FBQSxZQUFBLEVBQUE7QUFBQSxNQUFBLE1BQUEsQ0FBQSxTQUFBLENBQUEsY0FBQSxDQUFBLElBQUEsQ0FBQSxZQUFBLEVBQUEsR0FBQSxDQUFBLEVBQUE7QUFBQSxFQUFBLE1BQUEsQ0FBQSxjQUFBLENBQUEsT0FBQSxFQUFBLEdBQUEsRUFBQTtBQUFBLElBQUEsVUFBQSxFQUFBLElBQUE7QUFBQSxJQUFBLEdBQUEsRUFBQSxTQUFBLEdBQUEsR0FBQTtBQUFBLGFBQUEsYUFBQSxDQUFBLEdBQUEsQ0FBQTtBQUFBO0FBQUEsR0FBQTtBQUFBLENBQUE7O0FBQ0EsSUFBQSxTQUFBLEdBQUEsT0FBQSxDQUFBLGFBQUEsQ0FBQTs7QUFBQSxNQUFBLENBQUEsSUFBQSxDQUFBLFNBQUEsRUFBQSxPQUFBLENBQUEsVUFBQSxHQUFBLEVBQUE7QUFBQSxNQUFBLEdBQUEsS0FBQSxTQUFBLElBQUEsR0FBQSxLQUFBLFlBQUEsRUFBQTtBQUFBLE1BQUEsTUFBQSxDQUFBLFNBQUEsQ0FBQSxjQUFBLENBQUEsSUFBQSxDQUFBLFlBQUEsRUFBQSxHQUFBLENBQUEsRUFBQTtBQUFBLEVBQUEsTUFBQSxDQUFBLGNBQUEsQ0FBQSxPQUFBLEVBQUEsR0FBQSxFQUFBO0FBQUEsSUFBQSxVQUFBLEVBQUEsSUFBQTtBQUFBLElBQUEsR0FBQSxFQUFBLFNBQUEsR0FBQSxHQUFBO0FBQUEsYUFBQSxTQUFBLENBQUEsR0FBQSxDQUFBO0FBQUE7QUFBQSxHQUFBO0FBQUEsQ0FBQTs7QUFDQSxJQUFBLFVBQUEsR0FBQSxPQUFBLENBQUEsYUFBQSxDQUFBOztBQUFBLE1BQUEsQ0FBQSxJQUFBLENBQUEsVUFBQSxFQUFBLE9BQUEsQ0FBQSxVQUFBLEdBQUEsRUFBQTtBQUFBLE1BQUEsR0FBQSxLQUFBLFNBQUEsSUFBQSxHQUFBLEtBQUEsWUFBQSxFQUFBO0FBQUEsTUFBQSxNQUFBLENBQUEsU0FBQSxDQUFBLGNBQUEsQ0FBQSxJQUFBLENBQUEsWUFBQSxFQUFBLEdBQUEsQ0FBQSxFQUFBO0FBQUEsRUFBQSxNQUFBLENBQUEsY0FBQSxDQUFBLE9BQUEsRUFBQSxHQUFBLEVBQUE7QUFBQSxJQUFBLFVBQUEsRUFBQSxJQUFBO0FBQUEsSUFBQSxHQUFBLEVBQUEsU0FBQSxHQUFBLEdBQUE7QUFBQSxhQUFBLFVBQUEsQ0FBQSxHQUFBLENBQUE7QUFBQTtBQUFBLEdBQUE7QUFBQSxDQUFBOztBQUNBLElBQUEsUUFBQSxHQUFBLE9BQUEsQ0FBQSxXQUFBLENBQUE7O0FBQUEsTUFBQSxDQUFBLElBQUEsQ0FBQSxRQUFBLEVBQUEsT0FBQSxDQUFBLFVBQUEsR0FBQSxFQUFBO0FBQUEsTUFBQSxHQUFBLEtBQUEsU0FBQSxJQUFBLEdBQUEsS0FBQSxZQUFBLEVBQUE7QUFBQSxNQUFBLE1BQUEsQ0FBQSxTQUFBLENBQUEsY0FBQSxDQUFBLElBQUEsQ0FBQSxZQUFBLEVBQUEsR0FBQSxDQUFBLEVBQUE7QUFBQSxFQUFBLE1BQUEsQ0FBQSxjQUFBLENBQUEsT0FBQSxFQUFBLEdBQUEsRUFBQTtBQUFBLElBQUEsVUFBQSxFQUFBLElBQUE7QUFBQSxJQUFBLEdBQUEsRUFBQSxTQUFBLEdBQUEsR0FBQTtBQUFBLGFBQUEsUUFBQSxDQUFBLEdBQUEsQ0FBQTtBQUFBO0FBQUEsR0FBQTtBQUFBLENBQUE7O0FBRUEsSUFBQSxFQUFBLEdBQUEsc0JBQUEsQ0FBQSxPQUFBLENBQUEsTUFBQSxDQUFBLENBQUE7Ozs7Ozs7O0FBUEEsYUFBQSxDQUFBLFlBQUEsQ0FBQSxNQUFBOzs7Ozs7Ozs7O0FDREEsSUFBQSxRQUFBLEdBQUEsT0FBQSxDQUFBLFVBQUEsQ0FBQTs7QUFDQSxJQUFBLFFBQUEsR0FBQSxPQUFBLENBQUEsVUFBQSxDQUFBOztBQUNBLElBQUEsRUFBQSxHQUFBLHVCQUFBLENBQUEsT0FBQSxDQUFBLE1BQUEsQ0FBQSxDQUFBOztBQUNBLElBQUEsT0FBQSxHQUFBLHNCQUFBLENBQUEsT0FBQSxDQUFBLGtCQUFBLENBQUEsQ0FBQTs7QUFDQSxJQUFBLFNBQUEsR0FBQSxzQkFBQSxDQUFBLE9BQUEsQ0FBQSxvQkFBQSxDQUFBLENBQUE7O0FBQ0EsSUFBQSxT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Ozs7Ozs7O0FDbjdDTCxJQUFBLE1BQUEsR0FBQSxPQUFBLENBQUEsYUFBQSxDQUFBOztBQUFBLE1BQUEsQ0FBQSxJQUFBLENBQUEsTUFBQSxFQUFBLE9BQUEsQ0FBQSxVQUFBLEdBQUEsRUFBQTtBQUFBLE1BQUEsR0FBQSxLQUFBLFNBQUEsSUFBQSxHQUFBLEtBQUEsWUFBQSxFQUFBO0FBQUEsRUFBQSxNQUFBLENBQUEsY0FBQSxDQUFBLE9BQUEsRUFBQSxHQUFBLEVBQUE7QUFBQSxJQUFBLFVBQUEsRUFBQSxJQUFBO0FBQUEsSUFBQSxHQUFBLEVBQUEsU0FBQSxHQUFBLEdBQUE7QUFBQSxhQUFBLE1BQUEsQ0FBQSxHQUFBLENBQUE7QUFBQTtBQUFBLEdBQUE7QUFBQSxDQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0ICogYXMgZDMgZnJvbSBcIi4vZDNcIjtcbmltcG9ydCB7VGVtcGxhdGVzfSBmcm9tIFwiLi90ZW1wbGF0ZXNcIjtcbmltcG9ydCB7aTE4bn0gZnJvbSBcIi4vaTE4bi9pMThuXCI7XG5pbXBvcnQge1V0aWxzfSBmcm9tIFwic2QtdXRpbHNcIjtcblxuZXhwb3J0IGNsYXNzIEFwcFV0aWxzIHtcblxuICAgIHN0YXRpYyBzYW5pdGl6ZUhlaWdodCA9IGZ1bmN0aW9uIChoZWlnaHQsIGNvbnRhaW5lcikge1xuICAgICAgICByZXR1cm4gKGhlaWdodCB8fCBwYXJzZUludChjb250YWluZXIuc3R5bGUoJ2hlaWdodCcpLCAxMCkgfHwgNDAwKTtcbiAgICB9O1xuXG4gICAgc3RhdGljIHNhbml0aXplV2lkdGggPSBmdW5jdGlvbiAod2lkdGgsIGNvbnRhaW5lcikge1xuICAgICAgICByZXR1cm4gKHdpZHRoIHx8IHBhcnNlSW50KGNvbnRhaW5lci5zdHlsZSgnd2lkdGgnKSwgMTApIHx8IDk2MCk7XG4gICAgfTtcblxuICAgIHN0YXRpYyBhdmFpbGFibGVIZWlnaHQgPSBmdW5jdGlvbiAoaGVpZ2h0LCBjb250YWluZXIsIG1hcmdpbikge1xuICAgICAgICByZXR1cm4gTWF0aC5tYXgoMCwgQXBwVXRpbHMuc2FuaXRpemVIZWlnaHQoaGVpZ2h0LCBjb250YWluZXIpIC0gbWFyZ2luLnRvcCAtIG1hcmdpbi5ib3R0b20pO1xuICAgIH07XG5cbiAgICBzdGF0aWMgYXZhaWxhYmxlV2lkdGggPSBmdW5jdGlvbiAod2lkdGgsIGNvbnRhaW5lciwgbWFyZ2luKSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1heCgwLCBBcHBVdGlscy5zYW5pdGl6ZVdpZHRoKHdpZHRoLCBjb250YWluZXIpIC0gbWFyZ2luLmxlZnQgLSBtYXJnaW4ucmlnaHQpO1xuICAgIH07XG5cbiAgICAvL3BsYWNlcyB0ZXh0U3RyaW5nIGluIHRleHRPYmosIGFkZHMgYW4gZWxsaXBzaXMgaWYgdGV4dCBjYW4ndCBmaXQgaW4gd2lkdGhcbiAgICBzdGF0aWMgcGxhY2VUZXh0V2l0aEVsbGlwc2lzKHRleHREM09iaiwgdGV4dFN0cmluZywgd2lkdGgpIHtcbiAgICAgICAgdmFyIHRleHRPYmogPSB0ZXh0RDNPYmoubm9kZSgpO1xuICAgICAgICB0ZXh0T2JqLnRleHRDb250ZW50ID0gdGV4dFN0cmluZztcblxuICAgICAgICB2YXIgbWFyZ2luID0gMDtcbiAgICAgICAgdmFyIGVsbGlwc2lzTGVuZ3RoID0gOTtcbiAgICAgICAgLy9lbGxpcHNpcyBpcyBuZWVkZWRcbiAgICAgICAgaWYgKHRleHRPYmouZ2V0Q29tcHV0ZWRUZXh0TGVuZ3RoKCkgPiB3aWR0aCArIG1hcmdpbikge1xuICAgICAgICAgICAgZm9yICh2YXIgeCA9IHRleHRTdHJpbmcubGVuZ3RoIC0gMzsgeCA+IDA7IHggLT0gMSkge1xuICAgICAgICAgICAgICAgIGlmICh0ZXh0T2JqLmdldFN1YlN0cmluZ0xlbmd0aCgwLCB4KSArIGVsbGlwc2lzTGVuZ3RoIDw9IHdpZHRoICsgbWFyZ2luKSB7XG4gICAgICAgICAgICAgICAgICAgIHRleHRPYmoudGV4dENvbnRlbnQgPSB0ZXh0U3RyaW5nLnN1YnN0cmluZygwLCB4KSArIFwiLi4uXCI7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRleHRPYmoudGV4dENvbnRlbnQgPSBcIi4uLlwiOyAvL2Nhbid0IHBsYWNlIGF0IGFsbFxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHN0YXRpYyBwbGFjZVRleHRXaXRoRWxsaXBzaXNBbmRUb29sdGlwKHRleHREM09iaiwgdGV4dFN0cmluZywgd2lkdGgsIHRvb2x0aXApIHtcbiAgICAgICAgdmFyIGVsbGlwc2lzUGxhY2VkID0gQXBwVXRpbHMucGxhY2VUZXh0V2l0aEVsbGlwc2lzKHRleHREM09iaiwgdGV4dFN0cmluZywgd2lkdGgpO1xuICAgICAgICBpZiAoZWxsaXBzaXNQbGFjZWQgJiYgdG9vbHRpcCkge1xuICAgICAgICAgICAgdGV4dEQzT2JqLm9uKFwibW91c2VvdmVyXCIsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgdG9vbHRpcC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgICAgICAgICAgLmR1cmF0aW9uKDIwMClcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCAuOSk7XG4gICAgICAgICAgICAgICAgdG9vbHRpcC5odG1sKHRleHRTdHJpbmcpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcImxlZnRcIiwgKGQzLmV2ZW50LnBhZ2VYICsgNSkgKyBcInB4XCIpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcInRvcFwiLCAoZDMuZXZlbnQucGFnZVkgLSAyOCkgKyBcInB4XCIpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRleHREM09iai5vbihcIm1vdXNlb3V0XCIsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgdG9vbHRpcC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgICAgICAgICAgLmR1cmF0aW9uKDUwMClcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCAwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0Rm9udFNpemUoZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZShcImZvbnQtc2l6ZVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0VHJhbnNsYXRpb24odHJhbnNmb3JtKSB7XG4gICAgICAgIC8vIENyZWF0ZSBhIGR1bW15IGcgZm9yIGNhbGN1bGF0aW9uIHB1cnBvc2VzIG9ubHkuIFRoaXMgd2lsbCBuZXZlclxuICAgICAgICAvLyBiZSBhcHBlbmRlZCB0byB0aGUgRE9NIGFuZCB3aWxsIGJlIGRpc2NhcmRlZCBvbmNlIHRoaXMgZnVuY3Rpb25cbiAgICAgICAgLy8gcmV0dXJucy5cbiAgICAgICAgdmFyIGcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcImdcIik7XG5cbiAgICAgICAgLy8gU2V0IHRoZSB0cmFuc2Zvcm0gYXR0cmlidXRlIHRvIHRoZSBwcm92aWRlZCBzdHJpbmcgdmFsdWUuXG4gICAgICAgIGcuc2V0QXR0cmlidXRlTlMobnVsbCwgXCJ0cmFuc2Zvcm1cIiwgdHJhbnNmb3JtKTtcblxuICAgICAgICAvLyBjb25zb2xpZGF0ZSB0aGUgU1ZHVHJhbnNmb3JtTGlzdCBjb250YWluaW5nIGFsbCB0cmFuc2Zvcm1hdGlvbnNcbiAgICAgICAgLy8gdG8gYSBzaW5nbGUgU1ZHVHJhbnNmb3JtIG9mIHR5cGUgU1ZHX1RSQU5TRk9STV9NQVRSSVggYW5kIGdldFxuICAgICAgICAvLyBpdHMgU1ZHTWF0cml4LlxuICAgICAgICB2YXIgbWF0cml4ID0gZy50cmFuc2Zvcm0uYmFzZVZhbC5jb25zb2xpZGF0ZSgpLm1hdHJpeDtcblxuICAgICAgICAvLyBBcyBwZXIgZGVmaW5pdGlvbiB2YWx1ZXMgZSBhbmQgZiBhcmUgdGhlIG9uZXMgZm9yIHRoZSB0cmFuc2xhdGlvbi5cbiAgICAgICAgcmV0dXJuIFttYXRyaXguZSwgbWF0cml4LmZdO1xuICAgIH1cblxuXG4gICAgc3RhdGljIGNsb3Nlc3RQb2ludChwYXRoTm9kZSwgcG9pbnQpIHtcbiAgICAgICAgdmFyIHBhdGhMZW5ndGggPSBwYXRoTm9kZS5nZXRUb3RhbExlbmd0aCgpLFxuICAgICAgICAgICAgcHJlY2lzaW9uID0gOCxcbiAgICAgICAgICAgIGJlc3QsXG4gICAgICAgICAgICBiZXN0TGVuZ3RoLFxuICAgICAgICAgICAgYmVzdERpc3RhbmNlID0gSW5maW5pdHk7XG5cbiAgICAgICAgLy8gbGluZWFyIHNjYW4gZm9yIGNvYXJzZSBhcHByb3hpbWF0aW9uXG4gICAgICAgIGZvciAodmFyIHNjYW4sIHNjYW5MZW5ndGggPSAwLCBzY2FuRGlzdGFuY2U7IHNjYW5MZW5ndGggPD0gcGF0aExlbmd0aDsgc2Nhbkxlbmd0aCArPSBwcmVjaXNpb24pIHtcbiAgICAgICAgICAgIGlmICgoc2NhbkRpc3RhbmNlID0gZGlzdGFuY2UyKHNjYW4gPSBwYXRoTm9kZS5nZXRQb2ludEF0TGVuZ3RoKHNjYW5MZW5ndGgpKSkgPCBiZXN0RGlzdGFuY2UpIHtcbiAgICAgICAgICAgICAgICBiZXN0ID0gc2NhbiwgYmVzdExlbmd0aCA9IHNjYW5MZW5ndGgsIGJlc3REaXN0YW5jZSA9IHNjYW5EaXN0YW5jZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGJpbmFyeSBzZWFyY2ggZm9yIHByZWNpc2UgZXN0aW1hdGVcbiAgICAgICAgcHJlY2lzaW9uIC89IDI7XG4gICAgICAgIHdoaWxlIChwcmVjaXNpb24gPiAwLjUpIHtcbiAgICAgICAgICAgIHZhciBiZWZvcmUsXG4gICAgICAgICAgICAgICAgYWZ0ZXIsXG4gICAgICAgICAgICAgICAgYmVmb3JlTGVuZ3RoLFxuICAgICAgICAgICAgICAgIGFmdGVyTGVuZ3RoLFxuICAgICAgICAgICAgICAgIGJlZm9yZURpc3RhbmNlLFxuICAgICAgICAgICAgICAgIGFmdGVyRGlzdGFuY2U7XG4gICAgICAgICAgICBpZiAoKGJlZm9yZUxlbmd0aCA9IGJlc3RMZW5ndGggLSBwcmVjaXNpb24pID49IDAgJiYgKGJlZm9yZURpc3RhbmNlID0gZGlzdGFuY2UyKGJlZm9yZSA9IHBhdGhOb2RlLmdldFBvaW50QXRMZW5ndGgoYmVmb3JlTGVuZ3RoKSkpIDwgYmVzdERpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgYmVzdCA9IGJlZm9yZSwgYmVzdExlbmd0aCA9IGJlZm9yZUxlbmd0aCwgYmVzdERpc3RhbmNlID0gYmVmb3JlRGlzdGFuY2U7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKChhZnRlckxlbmd0aCA9IGJlc3RMZW5ndGggKyBwcmVjaXNpb24pIDw9IHBhdGhMZW5ndGggJiYgKGFmdGVyRGlzdGFuY2UgPSBkaXN0YW5jZTIoYWZ0ZXIgPSBwYXRoTm9kZS5nZXRQb2ludEF0TGVuZ3RoKGFmdGVyTGVuZ3RoKSkpIDwgYmVzdERpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgYmVzdCA9IGFmdGVyLCBiZXN0TGVuZ3RoID0gYWZ0ZXJMZW5ndGgsIGJlc3REaXN0YW5jZSA9IGFmdGVyRGlzdGFuY2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHByZWNpc2lvbiAvPSAyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgYmVzdCA9IFtiZXN0LngsIGJlc3QueV07XG4gICAgICAgIGJlc3QuZGlzdGFuY2UgPSBNYXRoLnNxcnQoYmVzdERpc3RhbmNlKTtcbiAgICAgICAgcmV0dXJuIGJlc3Q7XG5cbiAgICAgICAgZnVuY3Rpb24gZGlzdGFuY2UyKHApIHtcbiAgICAgICAgICAgIHZhciBkeCA9IHAueCAtIHBvaW50WzBdLFxuICAgICAgICAgICAgICAgIGR5ID0gcC55IC0gcG9pbnRbMV07XG4gICAgICAgICAgICByZXR1cm4gZHggKiBkeCArIGR5ICogZHk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgZ3Jvd2wobWVzc2FnZSwgdHlwZT0naW5mbycsIHBvc2l0aW9uPSdyaWdodCcsIHRpbWUgPSAyMDAwKXtcbiAgICAgICAgdmFyIGh0bWwgPSBUZW1wbGF0ZXMuZ2V0KCdncm93bCcsIHttZXNzYWdlOm1lc3NhZ2UsIHR5cGU6dHlwZX0pXG5cbiAgICAgICAgdmFyIGcgPSBkMy5zZWxlY3QoJ2JvZHknKS5zZWxlY3RPckFwcGVuZCgnZGl2LnNkLWdyb3dsLWxpc3QuJytwb3NpdGlvbikuYXBwZW5kKCdkaXYnKS5odG1sKGh0bWwpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBnLnJlbW92ZSgpO1xuICAgICAgICB9LCB0aW1lKVxuICAgIH1cblxuXG4gICAgc3RhdGljIGNyZWF0ZUVsZW1lbnQodGFnLCBhdHRyaWJzLCBwYXJlbnQpIHtcbiAgICAgICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xuXG4gICAgICAgIGlmIChhdHRyaWJzKSB7XG4gICAgICAgICAgICBBcHBVdGlscy5kZWVwRXh0ZW5kKGVsLCBhdHRyaWJzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGFyZW50KSB7XG4gICAgICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoZWwpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbDtcbiAgICB9O1xuXG4gICAgc3RhdGljIHJlbW92ZUVsZW1lbnQoZWxlbWVudCkge1xuICAgICAgICBlbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XG4gICAgfVxuXG4gICAgc3RhdGljIHJlcGxhY2VVcmxzKHRleHQpe1xuICAgICAgICBpZighdGV4dCl7XG4gICAgICAgICAgICByZXR1cm4gdGV4dDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdXJsUmVnZXhwID0gLygoZnRwfGh0dHB8aHR0cHMpOlxcL1xcLyhcXHcrOnswLDF9XFx3KkApPyhcXFMrKSg6WzAtOV0rKT8oXFwvfFxcLyhbXFx3IyE6Lj8rPSYlQCFcXC1cXC9dKSk/KS9cblxuICAgICAgICByZXR1cm4gdGV4dC5yZXBsYWNlKHVybFJlZ2V4cCwgJzxhIGhyZWY9XCIkMVwiIHRhcmdldD1cIl9ibGFua1wiPiQxPC9hPicpO1xuICAgIH1cblxuICAgIHN0YXRpYyBlc2NhcGVIdG1sKGh0bWwpXG4gICAge1xuICAgICAgICB2YXIgdGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGh0bWwpO1xuICAgICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZCh0ZXh0KTtcbiAgICAgICAgcmV0dXJuIGRpdi5pbm5lckhUTUw7XG4gICAgfVxuXG4gICAgc3RhdGljIGRpc3BhdGNoSHRtbEV2ZW50KGVsZW1lbnQsIG5hbWUpe1xuICAgICAgICBpZiAoXCJjcmVhdGVFdmVudFwiIGluIGRvY3VtZW50KSB7XG4gICAgICAgICAgICB2YXIgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJIVE1MRXZlbnRzXCIpO1xuICAgICAgICAgICAgZXZ0LmluaXRFdmVudChuYW1lLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICAgICAgICBlbGVtZW50LmRpc3BhdGNoRXZlbnQoZXZ0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBlbGVtZW50LmZpcmVFdmVudChcIm9uXCIrbmFtZSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGRpc3BhdGNoRXZlbnQobmFtZSwgZGF0YSl7XG4gICAgICAgIHZhciBldmVudDtcbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgZXZlbnQgPSBuZXcgIEN1c3RvbUV2ZW50KG5hbWUseyAnZGV0YWlsJzogZGF0YSB9KTtcbiAgICAgICAgfWNhdGNoIChlKXsgLy9JRVxuICAgICAgICAgICAgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcbiAgICAgICAgICAgIGV2ZW50LmluaXRDdXN0b21FdmVudChuYW1lLCBmYWxzZSwgZmFsc2UsIGRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXRWYWxpZGF0aW9uTWVzc2FnZShlcnJvcil7XG4gICAgICAgIGlmKFV0aWxzLmlzU3RyaW5nKGVycm9yKSl7XG4gICAgICAgICAgICBlcnJvciA9IHtuYW1lOiBlcnJvcn07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGtleSA9ICd2YWxpZGF0aW9uLicgKyBlcnJvci5uYW1lO1xuICAgICAgICByZXR1cm4gaTE4bi50KGtleSwgZXJyb3IuZGF0YSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGhpZGUoc2VsZWN0aW9uKXtcbiAgICAgICAgc2VsZWN0aW9uLmNsYXNzZWQoJ3NkLWhpZGRlbicsIHRydWUpO1xuICAgIH1cblxuICAgIHN0YXRpYyBzaG93KHNlbGVjdGlvbiwgc2hvdz10cnVlKXtcbiAgICAgICAgc2VsZWN0aW9uLmNsYXNzZWQoJ3NkLWhpZGRlbicsICFzaG93KTtcbiAgICB9XG5cblxuXG4gICAgc3RhdGljIGlzSGlkZGVuKGVsLCBleGFjdCA9IHRydWUpIHtcbiAgICAgICAgaWYoIWVsKXtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmKGV4YWN0KXtcbiAgICAgICAgICAgIHZhciBzdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsKTtcbiAgICAgICAgICAgIHJldHVybiAoc3R5bGUuZGlzcGxheSA9PT0gJ25vbmUnKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoZWwub2Zmc2V0UGFyZW50ID09PSBudWxsKVxuICAgIH1cblxuICAgIHN0YXRpYyBnZXRKU09OKHVybCwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB4aHIub3BlbignZ2V0JywgdXJsLCB0cnVlKTtcbiAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcbiAgICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzdGF0dXMgPSB4aHIuc3RhdHVzO1xuICAgICAgICAgICAgaWYgKHN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayh4aHIucmVzcG9uc2UsIG51bGwpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCBzdGF0dXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB4aHIuc2VuZCgpO1xuICAgIH1cbn1cbiIsImltcG9ydCAqIGFzIGQzIGZyb20gJy4uL2QzJ1xuXG4vKmJhc2VkIG9uOlxuICogZ2l0aHViLmNvbS9wYXRvcmprL2QzLWNvbnRleHQtbWVudSAqL1xuXG5leHBvcnQgY2xhc3MgQ29udGV4dE1lbnUge1xuICAgIG9wZW5DYWxsYmFjaztcbiAgICBjbG9zZUNhbGxiYWNrO1xuXG4gICAgY29uc3RydWN0b3IobWVudSwgb3B0cykge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBvcHRzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBzZWxmLm9wZW5DYWxsYmFjayA9IG9wdHM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgICAgICAgICAgIHNlbGYub3BlbkNhbGxiYWNrID0gb3B0cy5vbk9wZW47XG4gICAgICAgICAgICBzZWxmLmNsb3NlQ2FsbGJhY2sgPSBvcHRzLm9uQ2xvc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjcmVhdGUgdGhlIGRpdiBlbGVtZW50IHRoYXQgd2lsbCBob2xkIHRoZSBjb250ZXh0IG1lbnVcbiAgICAgICAgZDMuc2VsZWN0QWxsKCcuZDMtY29udGV4dC1tZW51JykuZGF0YShbMV0pXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdkMy1jb250ZXh0LW1lbnUnKTtcblxuICAgICAgICAvLyBjbG9zZSBtZW51XG4gICAgICAgIGQzLnNlbGVjdCgnYm9keScpLm9uKCdjbGljay5kMy1jb250ZXh0LW1lbnUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBkMy5zZWxlY3QoJy5kMy1jb250ZXh0LW1lbnUnKS5zdHlsZSgnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICBpZiAoc2VsZi5jbG9zZUNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5jbG9zZUNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHRoaXMgZ2V0cyBleGVjdXRlZCB3aGVuIGEgY29udGV4dG1lbnUgZXZlbnQgb2NjdXJzXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZGF0YSwgaW5kZXgpIHtcbiAgICAgICAgICAgIHZhciBlbG0gPSB0aGlzO1xuXG4gICAgICAgICAgICBkMy5zZWxlY3RBbGwoJy5kMy1jb250ZXh0LW1lbnUnKS5odG1sKCcnKTtcbiAgICAgICAgICAgIHZhciBsaXN0ID0gZDMuc2VsZWN0QWxsKCcuZDMtY29udGV4dC1tZW51JylcbiAgICAgICAgICAgICAgICAub24oJ2NvbnRleHRtZW51JywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KCcuZDMtY29udGV4dC1tZW51Jykuc3R5bGUoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgICAgICAgICBkMy5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBkMy5ldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJ3VsJyk7XG4gICAgICAgICAgICBsaXN0LnNlbGVjdEFsbCgnbGknKS5kYXRhKHR5cGVvZiBtZW51ID09PSAnZnVuY3Rpb24nID8gbWVudShkYXRhKSA6IG1lbnUpLmVudGVyKClcbiAgICAgICAgICAgICAgICAuYXBwZW5kKCdsaScpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJldCA9ICcnO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZC5kaXZpZGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXQgKz0gJyBpcy1kaXZpZGVyJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoZC5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0ICs9ICcgaXMtZGlzYWJsZWQnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICghZC5hY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldCArPSAnIGlzLWhlYWRlcic7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5odG1sKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkLmRpdmlkZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnPGhyPic7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFkLnRpdGxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdObyB0aXRsZSBhdHRyaWJ1dGUgc2V0LiBDaGVjayB0aGUgc3BlbGxpbmcgb2YgeW91ciBvcHRpb25zLicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAodHlwZW9mIGQudGl0bGUgPT09ICdzdHJpbmcnKSA/IGQudGl0bGUgOiBkLnRpdGxlKGRhdGEpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkLmRpc2FibGVkKSByZXR1cm47IC8vIGRvIG5vdGhpbmcgaWYgZGlzYWJsZWRcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFkLmFjdGlvbikgcmV0dXJuOyAvLyBoZWFkZXJzIGhhdmUgbm8gXCJhY3Rpb25cIlxuICAgICAgICAgICAgICAgICAgICBkLmFjdGlvbihlbG0sIGRhdGEsIGluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KCcuZDMtY29udGV4dC1tZW51Jykuc3R5bGUoJ2Rpc3BsYXknLCAnbm9uZScpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLmNsb3NlQ2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY2xvc2VDYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIHRoZSBvcGVuQ2FsbGJhY2sgYWxsb3dzIGFuIGFjdGlvbiB0byBmaXJlIGJlZm9yZSB0aGUgbWVudSBpcyBkaXNwbGF5ZWRcbiAgICAgICAgICAgIC8vIGFuIGV4YW1wbGUgdXNhZ2Ugd291bGQgYmUgY2xvc2luZyBhIHRvb2x0aXBcbiAgICAgICAgICAgIGlmIChzZWxmLm9wZW5DYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLm9wZW5DYWxsYmFjayhkYXRhLCBpbmRleCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGRpc3BsYXkgY29udGV4dCBtZW51XG4gICAgICAgICAgICBkMy5zZWxlY3QoJy5kMy1jb250ZXh0LW1lbnUnKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnbGVmdCcsIChkMy5ldmVudC5wYWdlWCAtIDIpICsgJ3B4JylcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3RvcCcsIChkMy5ldmVudC5wYWdlWSAtIDIpICsgJ3B4JylcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2Rpc3BsYXknLCAnYmxvY2snKTtcblxuICAgICAgICAgICAgZDMuZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGQzLmV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBzdGF0aWMgaGlkZSgpIHtcbiAgICAgICAgZDMuc2VsZWN0KCcuZDMtY29udGV4dC1tZW51Jykuc3R5bGUoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHtDb250ZXh0TWVudX0gZnJvbSAnLi9jb250ZXh0LW1lbnUnXG5pbXBvcnQge2kxOG59IGZyb20gXCIuLi9pMThuL2kxOG5cIjtcblxuZXhwb3J0IGNsYXNzIEVkZ2VDb250ZXh0TWVudSBleHRlbmRzIENvbnRleHRNZW51IHtcbiAgICB0cmVlRGVzaWduZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcih0cmVlRGVzaWduZXIpIHtcbiAgICAgICAgdmFyIG1lbnUgPSBmdW5jdGlvbiAoZCkge1xuXG4gICAgICAgICAgICB2YXIgbWVudSA9IFtdO1xuXG4gICAgICAgICAgICBtZW51LnB1c2goe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51LmVkZ2UuaW5qZWN0RGVjaXNpb25Ob2RlJyksXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5pbmplY3REZWNpc2lvbk5vZGUoZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG1lbnUucHVzaCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUuZWRnZS5pbmplY3RDaGFuY2VOb2RlJyksXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5pbmplY3RDaGFuY2VOb2RlKGQpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgcmV0dXJuIG1lbnU7XG4gICAgICAgIH07XG5cbiAgICAgICAgc3VwZXIobWVudSk7XG4gICAgICAgIHRoaXMudHJlZURlc2lnbmVyID0gdHJlZURlc2lnbmVyO1xuICAgIH1cbn1cbiIsImltcG9ydCB7Q29udGV4dE1lbnV9IGZyb20gJy4vY29udGV4dC1tZW51J1xuaW1wb3J0IHtkb21haW4gYXMgbW9kZWx9IGZyb20gJ3NkLW1vZGVsJ1xuaW1wb3J0ICogYXMgZDMgZnJvbSAnLi4vZDMnXG5pbXBvcnQge2kxOG59IGZyb20gXCIuLi9pMThuL2kxOG5cIjtcblxuZXhwb3J0IGNsYXNzIE1haW5Db250ZXh0TWVudSBleHRlbmRzIENvbnRleHRNZW51IHtcbiAgICB0cmVlRGVzaWduZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcih0cmVlRGVzaWduZXIpIHtcbiAgICAgICAgdmFyIG1vdXNlUG9zaXRpb24gPSBudWxsO1xuICAgICAgICB2YXIgbWVudSA9IGZ1bmN0aW9uIChkKSB7XG5cbiAgICAgICAgICAgIHZhciBtZW51ID0gW107XG4gICAgICAgICAgICBtZW51LnB1c2goe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm1haW4uYWRkRGVjaXNpb25Ob2RlJyksXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdOb2RlID0gbmV3IG1vZGVsLkRlY2lzaW9uTm9kZShtb3VzZVBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLmFkZE5vZGUobmV3Tm9kZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG1lbnUucHVzaCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubWFpbi5hZGRDaGFuY2VOb2RlJyksXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdOb2RlID0gbmV3IG1vZGVsLkNoYW5jZU5vZGUobW91c2VQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5hZGROb2RlKG5ld05vZGUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBtZW51LnB1c2goe2RpdmlkZXI6IHRydWV9KTtcbiAgICAgICAgICAgIG1lbnUucHVzaCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubWFpbi5hZGRUZXh0JyksXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdUZXh0ID0gbmV3IG1vZGVsLlRleHQobW91c2VQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5hZGRUZXh0KG5ld1RleHQpO1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbWVudS5wdXNoKHtkaXZpZGVyOiB0cnVlfSk7XG4gICAgICAgICAgICBtZW51LnB1c2goe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm1haW4ucGFzdGUnKSxcbiAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLnBhc3RlVG9OZXdMb2NhdGlvbihtb3VzZVBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhdHJlZURlc2lnbmVyLmNvcGllZE5vZGVzIHx8ICF0cmVlRGVzaWduZXIuY29waWVkTm9kZXMubGVuZ3RoXG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbWVudS5wdXNoKHtkaXZpZGVyOiB0cnVlfSk7XG5cbiAgICAgICAgICAgIG1lbnUucHVzaCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubWFpbi5zZWxlY3RBbGxOb2RlcycpLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuc2VsZWN0QWxsTm9kZXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBtZW51O1xuICAgICAgICB9O1xuXG4gICAgICAgIHN1cGVyKG1lbnUsIHtvbk9wZW46ICgpID0+IHtcbiAgICAgICAgICAgIHRyZWVEZXNpZ25lci5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICAgICAgbW91c2VQb3NpdGlvbiA9IG5ldyBtb2RlbC5Qb2ludChkMy5tb3VzZSh0cmVlRGVzaWduZXIuc3ZnLm5vZGUoKSkpLm1vdmUodHJlZURlc2lnbmVyLmdldE1haW5Hcm91cFRyYW5zbGF0aW9uKHRydWUpKTtcblxuICAgICAgICB9fSk7XG4gICAgICAgIHRoaXMudHJlZURlc2lnbmVyID0gdHJlZURlc2lnbmVyO1xuICAgIH1cbn1cbiIsImltcG9ydCB7Q29udGV4dE1lbnV9IGZyb20gJy4vY29udGV4dC1tZW51J1xuaW1wb3J0IHtkb21haW4gYXMgbW9kZWx9IGZyb20gJ3NkLW1vZGVsJ1xuaW1wb3J0IHtpMThufSBmcm9tIFwiLi4vaTE4bi9pMThuXCI7XG5cbmV4cG9ydCBjbGFzcyBOb2RlQ29udGV4dE1lbnUgZXh0ZW5kcyBDb250ZXh0TWVudSB7XG4gICAgdHJlZURlc2lnbmVyO1xuXG4gICAgY29uc3RydWN0b3IodHJlZURlc2lnbmVyLCBvcGVyYXRpb25zRm9yT2JqZWN0KSB7XG4gICAgICAgIHZhciBtZW51ID0gZnVuY3Rpb24gKGQpIHtcblxuICAgICAgICAgICAgdmFyIGNvcHlNZW51SXRlbSA9IHtcbiAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5ub2RlLmNvcHknKSxcbiAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLnNlbGVjdE5vZGUoZCwgIXRyZWVEZXNpZ25lci5pc05vZGVTZWxlY3RlZChkKSk7XG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5jb3B5U2VsZWN0ZWROb2RlcygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB2YXIgY3V0TWVudUl0ZW0gPSB7XG4gICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubm9kZS5jdXQnKSxcbiAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLnNlbGVjdE5vZGUoZCwgIXRyZWVEZXNpZ25lci5pc05vZGVTZWxlY3RlZChkKSk7XG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5jdXRTZWxlY3RlZE5vZGVzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZhciBwYXN0ZU1lbnVJdGVtID0ge1xuICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm5vZGUucGFzdGUnKSxcbiAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLnBhc3RlVG9Ob2RlKGQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGQuZm9sZGVkIHx8ICF0cmVlRGVzaWduZXIuY29waWVkTm9kZXMgfHwgIXRyZWVEZXNpZ25lci5jb3BpZWROb2Rlcy5sZW5ndGhcblxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZhciBkZWxldGVNZW51SXRlbSA9IHtcbiAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5ub2RlLmRlbGV0ZScpLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5zZWxlY3ROb2RlKGQsICF0cmVlRGVzaWduZXIuaXNOb2RlU2VsZWN0ZWQoZCkpO1xuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIucmVtb3ZlU2VsZWN0ZWROb2RlcygpO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIG1lbnUgPSBbXTtcbiAgICAgICAgICAgIGlmIChkLnR5cGUgPT0gbW9kZWwuVGVybWluYWxOb2RlLiRUWVBFKSB7XG4gICAgICAgICAgICAgICAgbWVudSA9IFtjb3B5TWVudUl0ZW0sIGN1dE1lbnVJdGVtLCBkZWxldGVNZW51SXRlbV07XG4gICAgICAgICAgICAgICAgTm9kZUNvbnRleHRNZW51LmFkZE5vZGVDb252ZXJzaW9uT3B0aW9ucyhkLCBtZW51LCB0cmVlRGVzaWduZXIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBtZW51O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZighZC5mb2xkZWQpe1xuICAgICAgICAgICAgICAgIG1lbnUucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm5vZGUuYWRkRGVjaXNpb25Ob2RlJyksXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLmFkZERlY2lzaW9uTm9kZShkKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbWVudS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubm9kZS5hZGRDaGFuY2VOb2RlJyksXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLmFkZENoYW5jZU5vZGUoZClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIG1lbnUucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm5vZGUuYWRkVGVybWluYWxOb2RlJyksXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLmFkZFRlcm1pbmFsTm9kZShkKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbWVudS5wdXNoKHtkaXZpZGVyOiB0cnVlfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG1lbnUucHVzaChjb3B5TWVudUl0ZW0pO1xuICAgICAgICAgICAgbWVudS5wdXNoKGN1dE1lbnVJdGVtKTtcbiAgICAgICAgICAgIG1lbnUucHVzaChwYXN0ZU1lbnVJdGVtKTtcbiAgICAgICAgICAgIG1lbnUucHVzaChkZWxldGVNZW51SXRlbSk7XG5cbiAgICAgICAgICAgIE5vZGVDb250ZXh0TWVudS5hZGROb2RlQ29udmVyc2lvbk9wdGlvbnMoZCwgbWVudSwgdHJlZURlc2lnbmVyKTtcbiAgICAgICAgICAgIG1lbnUucHVzaCh7ZGl2aWRlcjogdHJ1ZX0pO1xuICAgICAgICAgICAgbWVudS5wdXNoKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5ub2RlLnNlbGVjdFN1YnRyZWUnKSxcbiAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLnNlbGVjdFN1YlRyZWUoZCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmKCFkLmZvbGRlZCl7XG4gICAgICAgICAgICAgICAgbWVudS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubm9kZS5mb2xkJyksXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLmZvbGRTdWJ0cmVlKGQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBtZW51LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5ub2RlLnVuZm9sZCcpLFxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5mb2xkU3VidHJlZShkLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYob3BlcmF0aW9uc0Zvck9iamVjdCl7XG4gICAgICAgICAgICAgICAgdmFyIG9wZXJhdGlvbnMgPSBvcGVyYXRpb25zRm9yT2JqZWN0KGQpO1xuICAgICAgICAgICAgICAgIGlmKG9wZXJhdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIG1lbnUucHVzaCh7ZGl2aWRlcjogdHJ1ZX0pO1xuICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25zLmZvckVhY2gob3A9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbnUucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubm9kZS4nK29wLm5hbWUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIucGVyZm9ybU9wZXJhdGlvbihkLCBvcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogIW9wLmNhblBlcmZvcm0oZClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG1lbnU7XG4gICAgICAgIH07XG5cbiAgICAgICAgc3VwZXIobWVudSk7XG4gICAgICAgIHRoaXMudHJlZURlc2lnbmVyID0gdHJlZURlc2lnbmVyO1xuICAgIH1cblxuICAgIHN0YXRpYyBhZGROb2RlQ29udmVyc2lvbk9wdGlvbnMoZCwgbWVudSwgdHJlZURlc2lnbmVyKXtcbiAgICAgICAgdmFyIGNvbnZlcnNpb25PcHRpb25zID0gTm9kZUNvbnRleHRNZW51LmdldE5vZGVDb252ZXJzaW9uT3B0aW9ucyhkLCB0cmVlRGVzaWduZXIpO1xuICAgICAgICBpZihjb252ZXJzaW9uT3B0aW9ucy5sZW5ndGgpe1xuICAgICAgICAgICAgbWVudS5wdXNoKHtkaXZpZGVyOiB0cnVlfSk7XG4gICAgICAgICAgICBjb252ZXJzaW9uT3B0aW9ucy5mb3JFYWNoKG89Pm1lbnUucHVzaChvKSk7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBnZXROb2RlQ29udmVyc2lvbk9wdGlvbnMoZCwgdHJlZURlc2lnbmVyKXtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSBbXTtcblxuICAgICAgICBpZihkLmZvbGRlZCl7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYWxsQWxsb3dlZFR5cGVzID0gW21vZGVsLkRlY2lzaW9uTm9kZS4kVFlQRSwgbW9kZWwuQ2hhbmNlTm9kZS4kVFlQRSwgbW9kZWwuVGVybWluYWxOb2RlLiRUWVBFXTtcblxuICAgICAgICBpZighZC5jaGlsZEVkZ2VzLmxlbmd0aCAmJiBkLiRwYXJlbnQpe1xuICAgICAgICAgICAgYWxsQWxsb3dlZFR5cGVzLmZpbHRlcih0PT50IT09ZC50eXBlKS5mb3JFYWNoKHR5cGU9PntcbiAgICAgICAgICAgICAgICBvcHRpb25zLnB1c2goTm9kZUNvbnRleHRNZW51LmdldE5vZGVDb252ZXJzaW9uT3B0aW9uKHR5cGUsIHRyZWVEZXNpZ25lcikpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGlmKGQgaW5zdGFuY2VvZiBtb2RlbC5EZWNpc2lvbk5vZGUpe1xuICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaChOb2RlQ29udGV4dE1lbnUuZ2V0Tm9kZUNvbnZlcnNpb25PcHRpb24obW9kZWwuQ2hhbmNlTm9kZS4kVFlQRSwgdHJlZURlc2lnbmVyKSlcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaChOb2RlQ29udGV4dE1lbnUuZ2V0Tm9kZUNvbnZlcnNpb25PcHRpb24obW9kZWwuRGVjaXNpb25Ob2RlLiRUWVBFLCB0cmVlRGVzaWduZXIpKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvcHRpb25zO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXROb2RlQ29udmVyc2lvbk9wdGlvbih0eXBlVG9Db252ZXJ0VG8sIHRyZWVEZXNpZ25lcil7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5ub2RlLmNvbnZlcnQuJyt0eXBlVG9Db252ZXJ0VG8pLFxuICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLmNvbnZlcnROb2RlKGQsIHR5cGVUb0NvbnZlcnRUbyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHtDb250ZXh0TWVudX0gZnJvbSAnLi9jb250ZXh0LW1lbnUnXG5pbXBvcnQge2kxOG59IGZyb20gXCIuLi9pMThuL2kxOG5cIjtcblxuZXhwb3J0IGNsYXNzIFRleHRDb250ZXh0TWVudSBleHRlbmRzIENvbnRleHRNZW51IHtcbiAgICB0cmVlRGVzaWduZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcih0cmVlRGVzaWduZXIpIHtcbiAgICAgICAgdmFyIG1lbnUgPSBmdW5jdGlvbiAoZCkge1xuXG5cbiAgICAgICAgICAgIHZhciBkZWxldGVNZW51SXRlbSA9IHtcbiAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS50ZXh0LmRlbGV0ZScpLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5zZWxlY3RUZXh0KGQsIHRydWUsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIucmVtb3ZlU2VsZWN0ZWRUZXh0cygpXG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIG1lbnUgPSBbXTtcbiAgICAgICAgICAgIG1lbnUucHVzaChkZWxldGVNZW51SXRlbSk7XG4gICAgICAgICAgICByZXR1cm4gbWVudTtcbiAgICAgICAgfTtcblxuICAgICAgICBzdXBlcihtZW51KTtcbiAgICAgICAgdGhpcy50cmVlRGVzaWduZXIgPSB0cmVlRGVzaWduZXI7XG4gICAgfVxufVxuIiwiaW1wb3J0ICogYXMgZDMgZnJvbSAnLi9kMydcblxuZXhwb3J0IGNsYXNzIEQzRXh0ZW5zaW9ucyB7XG5cbiAgICBzdGF0aWMgZXh0ZW5kKCkge1xuXG4gICAgICAgIGQzLnNlbGVjdGlvbi5wcm90b3R5cGUuZW50ZXIucHJvdG90eXBlLmluc2VydFNlbGVjdG9yID1cbiAgICAgICAgICAgIGQzLnNlbGVjdGlvbi5wcm90b3R5cGUuaW5zZXJ0U2VsZWN0b3IgPSBmdW5jdGlvbiAoc2VsZWN0b3IsIGJlZm9yZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBEM0V4dGVuc2lvbnMuaW5zZXJ0U2VsZWN0b3IodGhpcywgc2VsZWN0b3IsIGJlZm9yZSk7XG4gICAgICAgICAgICB9O1xuXG5cbiAgICAgICAgZDMuc2VsZWN0aW9uLnByb3RvdHlwZS5lbnRlci5wcm90b3R5cGUuYXBwZW5kU2VsZWN0b3IgPVxuICAgICAgICAgICAgZDMuc2VsZWN0aW9uLnByb3RvdHlwZS5hcHBlbmRTZWxlY3RvciA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBEM0V4dGVuc2lvbnMuYXBwZW5kU2VsZWN0b3IodGhpcywgc2VsZWN0b3IpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICBkMy5zZWxlY3Rpb24ucHJvdG90eXBlLmVudGVyLnByb3RvdHlwZS5zZWxlY3RPckFwcGVuZCA9XG4gICAgICAgICAgICBkMy5zZWxlY3Rpb24ucHJvdG90eXBlLnNlbGVjdE9yQXBwZW5kID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEQzRXh0ZW5zaW9ucy5zZWxlY3RPckFwcGVuZCh0aGlzLCBzZWxlY3Rvcik7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIGQzLnNlbGVjdGlvbi5wcm90b3R5cGUuZW50ZXIucHJvdG90eXBlLnNlbGVjdE9ySW5zZXJ0ID1cbiAgICAgICAgICAgIGQzLnNlbGVjdGlvbi5wcm90b3R5cGUuc2VsZWN0T3JJbnNlcnQgPSBmdW5jdGlvbiAoc2VsZWN0b3IsIGJlZm9yZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBEM0V4dGVuc2lvbnMuc2VsZWN0T3JJbnNlcnQodGhpcywgc2VsZWN0b3IsIGJlZm9yZSk7XG4gICAgICAgICAgICB9O1xuXG5cbiAgICB9XG5cbiAgICBzdGF0aWMgaW5zZXJ0T3JBcHBlbmRTZWxlY3RvcihwYXJlbnQsIHNlbGVjdG9yLCBvcGVyYXRpb24sIGJlZm9yZSkge1xuXG4gICAgICAgIHZhciBzZWxlY3RvclBhcnRzID0gc2VsZWN0b3Iuc3BsaXQoLyhbXFwuXFwjXSkvKTtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBwYXJlbnRbb3BlcmF0aW9uXShzZWxlY3RvclBhcnRzLnNoaWZ0KCksIGJlZm9yZSk7Ly9cIjpmaXJzdC1jaGlsZFwiXG5cbiAgICAgICAgd2hpbGUgKHNlbGVjdG9yUGFydHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgdmFyIHNlbGVjdG9yTW9kaWZpZXIgPSBzZWxlY3RvclBhcnRzLnNoaWZ0KCk7XG4gICAgICAgICAgICB2YXIgc2VsZWN0b3JJdGVtID0gc2VsZWN0b3JQYXJ0cy5zaGlmdCgpO1xuICAgICAgICAgICAgaWYgKHNlbGVjdG9yTW9kaWZpZXIgPT09IFwiLlwiKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQuY2xhc3NlZChzZWxlY3Rvckl0ZW0sIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzZWxlY3Rvck1vZGlmaWVyID09PSBcIiNcIikge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBlbGVtZW50LmF0dHIoJ2lkJywgc2VsZWN0b3JJdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9XG5cbiAgICBzdGF0aWMgaW5zZXJ0U2VsZWN0b3IocGFyZW50LCBzZWxlY3RvciwgYmVmb3JlKSB7XG4gICAgICAgIHJldHVybiBEM0V4dGVuc2lvbnMuaW5zZXJ0T3JBcHBlbmRTZWxlY3RvcihwYXJlbnQsIHNlbGVjdG9yLCBcImluc2VydFwiLCBiZWZvcmUpO1xuICAgIH1cblxuICAgIHN0YXRpYyBhcHBlbmRTZWxlY3RvcihwYXJlbnQsIHNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiBEM0V4dGVuc2lvbnMuaW5zZXJ0T3JBcHBlbmRTZWxlY3RvcihwYXJlbnQsIHNlbGVjdG9yLCBcImFwcGVuZFwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2VsZWN0T3JBcHBlbmQocGFyZW50LCBzZWxlY3RvciwgZWxlbWVudCkge1xuICAgICAgICB2YXIgc2VsZWN0aW9uID0gcGFyZW50LnNlbGVjdChzZWxlY3Rvcik7XG4gICAgICAgIGlmIChzZWxlY3Rpb24uZW1wdHkoKSkge1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyZW50LmFwcGVuZChlbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBEM0V4dGVuc2lvbnMuYXBwZW5kU2VsZWN0b3IocGFyZW50LCBzZWxlY3Rvcik7XG5cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2VsZWN0aW9uO1xuICAgIH07XG5cbiAgICBzdGF0aWMgc2VsZWN0T3JJbnNlcnQocGFyZW50LCBzZWxlY3RvciwgYmVmb3JlKSB7XG4gICAgICAgIHZhciBzZWxlY3Rpb24gPSBwYXJlbnQuc2VsZWN0KHNlbGVjdG9yKTtcbiAgICAgICAgaWYgKHNlbGVjdGlvbi5lbXB0eSgpKSB7XG4gICAgICAgICAgICByZXR1cm4gRDNFeHRlbnNpb25zLmluc2VydFNlbGVjdG9yKHBhcmVudCwgc2VsZWN0b3IsIGJlZm9yZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNlbGVjdGlvbjtcbiAgICB9O1xufVxuIiwiZXhwb3J0ICogZnJvbSAnZDMtZGlzcGF0Y2gnO1xuZXhwb3J0ICogZnJvbSAnZDMtc2NhbGUnO1xuZXhwb3J0ICogZnJvbSAnZDMtc2VsZWN0aW9uJztcbmV4cG9ydCAqIGZyb20gJ2QzLXNoYXBlJ1xuZXhwb3J0ICogZnJvbSAnZDMtZHJhZyc7XG5leHBvcnQgKiBmcm9tICdkMy1icnVzaCdcbmV4cG9ydCAqIGZyb20gJ2QzLWFycmF5J1xuZXhwb3J0ICogZnJvbSAnZDMtaGllcmFyY2h5J1xuZXhwb3J0ICogZnJvbSAnZDMtdGltZS1mb3JtYXQnXG4iLCJtb2R1bGUuZXhwb3J0cz17XG4gICAgXCJjb250ZXh0TWVudVwiOntcbiAgICAgICAgXCJtYWluXCI6e1xuICAgICAgICAgICAgXCJhZGREZWNpc2lvbk5vZGVcIjogXCJFbnRzY2hlaWR1bmdza25vdGVuIGhpbnp1ZsO8Z2VuXCIsXG4gICAgICAgICAgICBcImFkZENoYW5jZU5vZGVcIjogXCJadWZhbGwgS25vdGVuIGhpbnp1ZsO8Z2VuXCIsXG4gICAgICAgICAgICBcImFkZFRleHRcIjogXCJUZXh0IGhpbnp1ZsO8Z2VuIFwiLFxuICAgICAgICAgICAgXCJwYXN0ZVwiOiBcIkVpbmbDvGdlblwiLFxuICAgICAgICAgICAgXCJzZWxlY3RBbGxOb2Rlc1wiOiBcIkFsbGUgS25vdGVuIGF1c3fDpGhsZW5cIlxuICAgICAgICB9LFxuICAgICAgICBcIm5vZGVcIjp7XG4gICAgICAgICAgICBcImNvcHlcIjogXCJLb3BpZXJlblwiLFxuICAgICAgICAgICAgXCJjdXRcIjogXCJBdXNzY2huZWlkZW5cIixcbiAgICAgICAgICAgIFwicGFzdGVcIjogXCJFaW5mw7xnZW5cIixcbiAgICAgICAgICAgIFwiZGVsZXRlXCI6IFwiTMO2c2NoZW5cIixcbiAgICAgICAgICAgIFwiYWRkRGVjaXNpb25Ob2RlXCI6IFwiRW50c2NoZWlkdW5nc2tub3RlbiBoaW56dWbDvGdlblwiLFxuICAgICAgICAgICAgXCJhZGRDaGFuY2VOb2RlXCI6IFwiWnVmYWxsIEtub3RlbiBoaW56dWbDvGdlblwiLFxuICAgICAgICAgICAgXCJhZGRUZXJtaW5hbE5vZGVcIjogXCJFbmRrbm90dGVuIGhpbnp1ZsO8Z2VuXCIsXG4gICAgICAgICAgICBcImNvbnZlcnRcIjp7XG4gICAgICAgICAgICAgICAgXCJkZWNpc2lvblwiOiBcIkFscyBFbnRzY2hlaWR1bmdza25vdGVuXCIsXG4gICAgICAgICAgICAgICAgXCJjaGFuY2VcIjogXCJBbHMgWnVmYWxsIEtub3RlblwiLFxuICAgICAgICAgICAgICAgIFwidGVybWluYWxcIjogXCJBbHMgRW5ka25vdGVuXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInNlbGVjdFN1YnRyZWVcIjogXCJUZWlsYmF1bSB3w6RobGVuXCIsXG4gICAgICAgICAgICBcImZvbGRcIjogXCJUZWlsYmF1bSBmYWx0ZW5cIixcbiAgICAgICAgICAgIFwidW5mb2xkXCI6IFwiVGVpbGJhdW0gZW50ZmFsdGVuXCIsXG5cdFx0XHRcbiAgICAgICAgICAgIFwiZmxpcFN1YnRyZWVcIjogXCJUZWlsYmF1bSB1bWRyZWhlblwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiZWRnZVwiOntcbiAgICAgICAgICAgIFwiaW5qZWN0RGVjaXNpb25Ob2RlXCI6IFwiRW50c2NoZWlkdW5nc2tub3RlbiBJbmppemllcmVuXCIsXG4gICAgICAgICAgICBcImluamVjdENoYW5jZU5vZGVcIjogXCJadWZhbGwgS25vdGVuIEluaml6aWVyZW5cIlxuICAgICAgICB9LFxuICAgICAgICBcInRleHRcIjp7XG4gICAgICAgICAgICBcImRlbGV0ZVwiOiBcIkzDtnNjaGVuXCJcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXCJ2YWxpZGF0aW9uXCI6e1xuICAgICAgICBcImluY29tcGxldGVQYXRoXCI6IFwiUGZhZCwgZGVyIG5pY2h0IG1pdCBkZW0gRW5ka25vdGVuIGVuZGV0XCIsXG4gICAgICAgIFwicHJvYmFiaWxpdHlEb05vdFN1bVVwVG8xXCI6IFwiRGllIFN1bW1lIGRlciBXYWhyc2NoZWlubGljaGtlaXRlbiBpc3QgbmljaHQgZ2xlaWNoIDFcIixcbiAgICAgICAgXCJpbnZhbGlkUHJvYmFiaWxpdHlcIjogXCJVbmfDvGx0aWdlIFdhaHJzY2hlaW5saWNoa2VpdCBpbSBad2VpZyAje3tudW1iZXJ9fVwiLFxuICAgICAgICBcImludmFsaWRQYXlvZmZcIjogXCJVbmfDvGx0aWdlIEF1c3phaGx1bmcgaW4gWndlaWcgI3t7bnVtYmVyfX1cIlxuICAgIH0sXG4gICAgXCJncm93bFwiOntcbiAgICAgICAgXCJicnVzaERpc2FibGVkXCI6IFwiQXVzd2FobGLDvHJzdGUgZGVha3RpdmllcnRcIixcbiAgICAgICAgXCJicnVzaEVuYWJsZWRcIjogXCJBdXN3YWhsYsO8cnN0ZSBha3RpdmllcnRcIlxuICAgIH0sXG4gICAgXCJ0b29sdGlwXCI6e1xuICAgICAgICBcIm5vZGVcIjp7XG4gICAgICAgICAgICBcInBheW9mZlwiOiB7XG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiQXVzemFobHVuZyB7e251bWJlcn19XCIsXG4gICAgICAgICAgICAgICAgXCJuYW1lZFwiOiBcInt7bmFtZX19XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImFnZ3JlZ2F0ZWRQYXlvZmZcIjoge1xuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIkFnZ3JlZ2llcnRlIEF1c3phaGx1bmcge3tudW1iZXJ9fVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJBZ2dyZWdpZXJ0ZSB7e25hbWV9fVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJwcm9iYWJpbGl0eVRvRW50ZXJcIjogXCJXYWhyc2NoZWlubGljaGtlaXRcIlxuICAgICAgICB9LFxuICAgICAgICBcImVkZ2VcIjp7XG4gICAgICAgICAgICBcInBheW9mZlwiOiB7XG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiQXVzemFobHVuZyB7e251bWJlcn19OiB7e3ZhbHVlfX1cIixcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwie3tuYW1lfX06IHt7dmFsdWV9fVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJwcm9iYWJpbGl0eVwiOiBcIldhaHJzY2hlaW5saWNoa2VpdDoge3t2YWx1ZX19XCJcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgICBcImNvbnRleHRNZW51XCI6e1xuICAgICAgICBcIm1haW5cIjp7XG4gICAgICAgICAgICBcImFkZERlY2lzaW9uTm9kZVwiOiBcIkFkZCBEZWNpc2lvbiBOb2RlXCIsXG4gICAgICAgICAgICBcImFkZENoYW5jZU5vZGVcIjogXCJBZGQgQ2hhbmNlIE5vZGVcIixcbiAgICAgICAgICAgIFwiYWRkVGV4dFwiOiBcIkFkZCBUZXh0XCIsXG4gICAgICAgICAgICBcInBhc3RlXCI6IFwiUGFzdGVcIixcbiAgICAgICAgICAgIFwic2VsZWN0QWxsTm9kZXNcIjogXCJTZWxlY3QgYWxsIG5vZGVzXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJub2RlXCI6e1xuICAgICAgICAgICAgXCJjb3B5XCI6IFwiQ29weVwiLFxuICAgICAgICAgICAgXCJjdXRcIjogXCJDdXRcIixcbiAgICAgICAgICAgIFwicGFzdGVcIjogXCJQYXN0ZVwiLFxuICAgICAgICAgICAgXCJkZWxldGVcIjogXCJEZWxldGVcIixcbiAgICAgICAgICAgIFwiYWRkRGVjaXNpb25Ob2RlXCI6IFwiQWRkIERlY2lzaW9uIE5vZGVcIixcbiAgICAgICAgICAgIFwiYWRkQ2hhbmNlTm9kZVwiOiBcIkFkZCBDaGFuY2UgTm9kZVwiLFxuICAgICAgICAgICAgXCJhZGRUZXJtaW5hbE5vZGVcIjogXCJBZGQgVGVybWluYWwgTm9kZVwiLFxuICAgICAgICAgICAgXCJjb252ZXJ0XCI6e1xuICAgICAgICAgICAgICAgIFwiZGVjaXNpb25cIjogXCJBcyBEZWNpc2lvbiBOb2RlXCIsXG4gICAgICAgICAgICAgICAgXCJjaGFuY2VcIjogXCJBcyBDaGFuY2UgTm9kZVwiLFxuICAgICAgICAgICAgICAgIFwidGVybWluYWxcIjogXCJBcyBUZXJtaW5hbCBOb2RlXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInNlbGVjdFN1YnRyZWVcIjogXCJTZWxlY3Qgc3VidHJlZVwiLFxuICAgICAgICAgICAgXCJmb2xkXCI6IFwiRm9sZCBzdWJ0cmVlXCIsXG4gICAgICAgICAgICBcInVuZm9sZFwiOiBcIlVuZm9sZCBzdWJ0cmVlXCIsXG4gICAgICAgICAgICBcImZsaXBTdWJ0cmVlXCI6IFwiRmxpcCBzdWJ0cmVlXCIsXG4gICAgICAgICAgICBcInBheW9mZnNUcmFuc2Zvcm1hdGlvblwiOiBcIlRyYW5zZm9ybSBwYXlvZmZzXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJlZGdlXCI6e1xuICAgICAgICAgICAgXCJpbmplY3REZWNpc2lvbk5vZGVcIjogXCJJbmplY3QgRGVjaXNpb24gTm9kZVwiLFxuICAgICAgICAgICAgXCJpbmplY3RDaGFuY2VOb2RlXCI6IFwiSW5qZWN0IENoYW5jZSBOb2RlXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJ0ZXh0XCI6e1xuICAgICAgICAgICAgXCJkZWxldGVcIjogXCJEZWxldGVcIlxuICAgICAgICB9XG4gICAgfSxcbiAgICBcInZhbGlkYXRpb25cIjp7XG4gICAgICAgIFwiaW5jb21wbGV0ZVBhdGhcIjogXCJQYXRoIG5vdCBlbmRpbmcgd2l0aCB0ZXJtaW5hbCBub2RlXCIsXG4gICAgICAgIFwicHJvYmFiaWxpdHlEb05vdFN1bVVwVG8xXCI6IFwiUHJvYmFiaWxpdGllcyBkbyBub3Qgc3VtIHVwIHRvIDFcIixcbiAgICAgICAgXCJpbnZhbGlkUHJvYmFiaWxpdHlcIjogXCJJbnZhbGlkIHByb2JhYmlsaXR5IGluIGVkZ2UgI3t7bnVtYmVyfX1cIixcbiAgICAgICAgXCJpbnZhbGlkUGF5b2ZmXCI6IFwiSW52YWxpZCBwYXlvZmYgaW4gZWRnZSAje3tudW1iZXJ9fVwiXG4gICAgfSxcbiAgICBcImdyb3dsXCI6e1xuICAgICAgICBcImJydXNoRGlzYWJsZWRcIjogXCJTZWxlY3Rpb24gYnJ1c2ggZGlzYWJsZWRcIixcbiAgICAgICAgXCJicnVzaEVuYWJsZWRcIjogXCJTZWxlY3Rpb24gYnJ1c2ggZW5hYmxlZFwiXG4gICAgfSxcbiAgICBcInRvb2x0aXBcIjp7XG4gICAgICAgIFwibm9kZVwiOntcbiAgICAgICAgICAgIFwicGF5b2ZmXCI6IHtcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJQYXlvZmYge3tudW1iZXJ9fVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJ7e25hbWV9fVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJhZ2dyZWdhdGVkUGF5b2ZmXCI6IHtcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJBZ2dyZWdhdGVkIFBheW9mZiB7e251bWJlcn19XCIsXG4gICAgICAgICAgICAgICAgXCJuYW1lZFwiOiBcIkFnZ3JlZ2F0ZWQge3tuYW1lfX1cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwicHJvYmFiaWxpdHlUb0VudGVyXCI6IFwiUHJvYmFiaWxpdHkgdG8gZW50ZXJcIlxuICAgICAgICB9LFxuICAgICAgICBcImVkZ2VcIjp7XG4gICAgICAgICAgICBcInBheW9mZlwiOiB7XG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiUGF5b2ZmIHt7bnVtYmVyfX06IHt7dmFsdWV9fVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJ7e25hbWV9fToge3t2YWx1ZX19XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInByb2JhYmlsaXR5XCI6IFwiUHJvYmFiaWxpdHk6IHt7dmFsdWV9fVwiXG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cz17XG4gICAgXCJjb250ZXh0TWVudVwiOntcbiAgICAgICAgXCJtYWluXCI6e1xuICAgICAgICAgICAgXCJhZGREZWNpc2lvbk5vZGVcIjogXCJBam91dGVyIG5vdWQgZGUgZMOpY2lzaW9uXCIsXG4gICAgICAgICAgICBcImFkZENoYW5jZU5vZGVcIjogXCJBam91dGVyIG5vdWQgYWzDqWF0b2lyZVwiLFxuICAgICAgICAgICAgXCJhZGRUZXh0XCI6IFwiQWpvdXRlciBkdSB0ZXh0ZVwiLFxuICAgICAgICAgICAgXCJwYXN0ZVwiOiBcIkNvbGxlclwiLFxuICAgICAgICAgICAgXCJzZWxlY3RBbGxOb2Rlc1wiOiBcIlPDqWxlY3Rpb25uZXIgdG91cyBsZXMgbm91ZHNcIlxuICAgICAgICB9LFxuICAgICAgICBcIm5vZGVcIjp7XG4gICAgICAgICAgICBcImNvcHlcIjogXCJDb3BpZVwiLFxuICAgICAgICAgICAgXCJjdXRcIjogXCJDb3VwZXJcIixcbiAgICAgICAgICAgIFwicGFzdGVcIjogXCJDb2xsZXJcIixcbiAgICAgICAgICAgIFwiZGVsZXRlXCI6IFwiRWZmYWNlclwiLFxuICAgICAgICAgICAgXCJhZGREZWNpc2lvbk5vZGVcIjogXCJBam91dGVyIG5vdWQgZGUgZMOpY2lzaW9uXCIsXG4gICAgICAgICAgICBcImFkZENoYW5jZU5vZGVcIjogXCJBam91dGVyIG5vdWQgYWzDqWF0b2lyZVwiLFxuICAgICAgICAgICAgXCJhZGRUZXJtaW5hbE5vZGVcIjogXCJBam91dGVyIHVuIG5vZXVkIHRlcm1pbmFsXCIsXG4gICAgICAgICAgICBcImNvbnZlcnRcIjp7XG4gICAgICAgICAgICAgICAgXCJkZWNpc2lvblwiOiBcIkNvbW1lIG5vdWQgZGUgZMOpY2lzaW9uXCIsXG4gICAgICAgICAgICAgICAgXCJjaGFuY2VcIjogXCJDb21tZSBub3VkIGFsw6lhdG9pcmVcIixcbiAgICAgICAgICAgICAgICBcInRlcm1pbmFsXCI6IFwiQ29tbWUgdW4gbm9ldWQgdGVybWluYWxcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwic2VsZWN0U3VidHJlZVwiOiBcIlPDqWxlY3Rpb25uZXIgdW5lIHNvdXMtYXJib3Jlc2NlbmNlXCIsXG4gICAgICAgICAgICBcImZvbGRcIjogXCJQbGllciBzb3VzLWFyYnJlXCIsXG4gICAgICAgICAgICBcInVuZm9sZFwiOiBcIkTDqXBsaWVyIGFyYnJlIHNvdXMtYXJicmVcIixcbiAgICAgICAgICAgIFwiZmxpcFN1YnRyZWVcIjogXCJCYXNjdWxlciBzb3VzLWFyYnJlXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJlZGdlXCI6e1xuICAgICAgICAgICAgXCJpbmplY3REZWNpc2lvbk5vZGVcIjogXCJJbmplY3RlciB1biBub2V1ZCBkZSBkw6ljaXNpb25cIixcbiAgICAgICAgICAgIFwiaW5qZWN0Q2hhbmNlTm9kZVwiOiBcIkluamVjdGVyIHVuIG5vZXVkIGRlIGNoYW5jZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwidGV4dFwiOntcbiAgICAgICAgICAgIFwiZGVsZXRlXCI6IFwiRWZmYWNlclwiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwidmFsaWRhdGlvblwiOntcbiAgICAgICAgXCJpbmNvbXBsZXRlUGF0aFwiOiBcIlBhcmNvdXJzIG5vbiB0ZXJtaW7DqSBwYXIgbm9ldWQgdGVybWluYWxcIixcbiAgICAgICAgXCJwcm9iYWJpbGl0eURvTm90U3VtVXBUbzFcIjogXCJMYSBzb21tZSBkZXMgcHJvYmFiaWxpdMOpcyBuJ2VzdCBwYXMgMSBvdSBwbHVzXCIsXG4gICAgICAgIFwiaW52YWxpZFByb2JhYmlsaXR5XCI6IFwiUHJvYmFiaWxpdMOpIGludmFsaWRlIC0gbGUgYm9yZCAje3tudW1iZXJ9fVwiLFxuICAgICAgICBcImludmFsaWRQYXlvZmZcIjogXCJBdmFudGFnZSBpbnZhbGlkZSAtIGxlIGJvcmQgI3t7bnVtYmVyfX1cIlxuICAgIH0sXG4gICAgXCJncm93bFwiOntcbiAgICAgICAgXCJicnVzaERpc2FibGVkXCI6IFwiQnJvc3NlIGRlIHPDqWxlY3Rpb24gZMOpc2FjdGl2w6llXCIsXG4gICAgICAgIFwiYnJ1c2hFbmFibGVkXCI6IFwiQnJvc3NlIGRlIHPDqWxlY3Rpb24gYWN0aXbDqWVcIlxuICAgIH0sXG4gICAgXCJ0b29sdGlwXCI6e1xuICAgICAgICBcIm5vZGVcIjp7XG4gICAgICAgICAgICBcInBheW9mZlwiOiB7XG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiQXZhbnRhZ2Uge3tudW1iZXJ9fVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJ7e25hbWV9fVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJhZ2dyZWdhdGVkUGF5b2ZmXCI6IHtcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJBdmFudGFnZSBhZ3LDqWfDqSB7e251bWJlcn19XCIsXG4gICAgICAgICAgICAgICAgXCJuYW1lZFwiOiBcIkFncsOpZ8OpICB7e25hbWV9fVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJwcm9iYWJpbGl0eVRvRW50ZXJcIjogXCJQcm9iYWJpbGl0w6kgZCdlbnRyw6llXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJlZGdlXCI6e1xuICAgICAgICAgICAgXCJwYXlvZmZcIjoge1xuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIkF2YW50YWdlIHt7bnVtYmVyfX06IHt7dmFsdWV9fVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJ7e25hbWV9fToge3t2YWx1ZX19XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInByb2JhYmlsaXR5XCI6IFwiUHJvYmFiaWxpdMOpOiB7e3ZhbHVlfX1cIlxuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IGkxOG5leHQgZnJvbSAnaTE4bmV4dCc7XG5pbXBvcnQgKiBhcyBlbiBmcm9tICcuL2VuLmpzb24nXG5pbXBvcnQgKiBhcyBwbCBmcm9tICcuL3BsLmpzb24nXG5pbXBvcnQgKiBhcyBpdCBmcm9tICcuL2l0Lmpzb24nXG5pbXBvcnQgKiBhcyBkZSBmcm9tICcuL2RlLmpzb24nXG5pbXBvcnQgKiBhcyBmciBmcm9tICcuL2ZyLmpzb24nXG5cbmV4cG9ydCBjbGFzcyBpMThue1xuXG4gICAgc3RhdGljICRpbnN0YW5jZTtcbiAgICBzdGF0aWMgbGFuZ3VhZ2U7XG5cbiAgICBzdGF0aWMgaW5pdChsbmcpe1xuICAgICAgICBpMThuLmxhbmd1YWdlID0gbG5nO1xuICAgICAgICBsZXQgcmVzb3VyY2VzID0ge1xuICAgICAgICAgICAgZW46IHtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGlvbjogZW5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwbDoge1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0aW9uOiBwbFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGl0OiB7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRpb246IGl0XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGU6IHtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGlvbjogZGVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmcjoge1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0aW9uOiBmclxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBpMThuLiRpbnN0YW5jZSA9IGkxOG5leHQuY3JlYXRlSW5zdGFuY2Uoe1xuICAgICAgICAgICAgbG5nOiBsbmcsXG4gICAgICAgICAgICBmYWxsYmFja0xuZzogJ2VuJyxcbiAgICAgICAgICAgIHJlc291cmNlczogcmVzb3VyY2VzXG4gICAgICAgIH0sIChlcnIsIHQpID0+IHtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIHQoa2V5LCBvcHQpe1xuICAgICAgICByZXR1cm4gaTE4bi4kaW5zdGFuY2UudChrZXksIG9wdClcbiAgICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cz17XG4gICAgXCJjb250ZXh0TWVudVwiOntcbiAgICAgICAgXCJtYWluXCI6e1xuICAgICAgICAgICAgXCJhZGREZWNpc2lvbk5vZGVcIjogXCJBZ2dpdW5naSB1biBub2RvIGRpIGRlY2lzaW9uZVwiLFxuICAgICAgICAgICAgXCJhZGRDaGFuY2VOb2RlXCI6IFwiQWdnaXVuZ2kgdW4gbm9kbyBvcHBvcnR1bml0w6BcIixcbiAgICAgICAgICAgIFwiYWRkVGV4dFwiOiBcIkFnZ2l1bmdpIHRlc3RvXCIsXG4gICAgICAgICAgICBcInBhc3RlXCI6IFwiSW5jb2xsYVwiLFxuICAgICAgICAgICAgXCJzZWxlY3RBbGxOb2Rlc1wiOiBcIlNlbGV6aW9uYSB0dXR0aSBpIG5vZGlcIlxuICAgICAgICB9LFxuICAgICAgICBcIm5vZGVcIjp7XG4gICAgICAgICAgICBcImNvcHlcIjogXCJDb3BpYVwiLFxuICAgICAgICAgICAgXCJjdXRcIjogXCJUYWdsaWFcIixcbiAgICAgICAgICAgIFwicGFzdGVcIjogXCJJbmNvbGxhXCIsXG4gICAgICAgICAgICBcImRlbGV0ZVwiOiBcIkNhbmNlbGxhXCIsXG4gICAgICAgICAgICBcImFkZERlY2lzaW9uTm9kZVwiOiBcIkFnZ2l1bmdpIHVuIG5vZG8gZGkgZGVjaXNpb25lXCIsXG4gICAgICAgICAgICBcImFkZENoYW5jZU5vZGVcIjogXCJBZ2dpdW5naSB1biBub2RvIG9wcG9ydHVuaXTDoFwiLFxuICAgICAgICAgICAgXCJhZGRUZXJtaW5hbE5vZGVcIjogXCJBZ2dpdW5naSB1biBub2RvIHRlcm1pbmFsZVwiLFxuICAgICAgICAgICAgXCJjb252ZXJ0XCI6e1xuICAgICAgICAgICAgICAgIFwiZGVjaXNpb25cIjogXCJDb21lIERlY2lzaW9uIE5vZGVcIixcbiAgICAgICAgICAgICAgICBcImNoYW5jZVwiOiBcIkNvbWUgQ2hhbmNlIE5vZGVcIixcbiAgICAgICAgICAgICAgICBcInRlcm1pbmFsXCI6IFwiQ29tZSBUZXJtaW5hbCBOb2RlXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInNlbGVjdFN1YnRyZWVcIjogXCJTZWxlemlvbmEgU290dG8tYWxiZXJvXCIsXG4gICAgICAgICAgICBcImZvbGRcIjogXCJQaWVnYSBzb3R0by1hbGJlcm9cIixcbiAgICAgICAgICAgIFwidW5mb2xkXCI6IFwiRGlzcGllZ2Fyc2kgc290dG8tYWxiZXJvXCIsXHRcdFx0XG4gICAgICAgICAgICBcImZsaXBTdWJ0cmVlXCI6IFwiUmliYWx0YSBzb3R0by1hbGJlcm9cIlxuICAgICAgICB9LFxuICAgICAgICBcImVkZ2VcIjp7XG4gICAgICAgICAgICBcImluamVjdERlY2lzaW9uTm9kZVwiOiBcIkluaWV0dGEgbm9kbyBkaSBkZWNpc2lvbmVcIixcbiAgICAgICAgICAgIFwiaW5qZWN0Q2hhbmNlTm9kZVwiOiBcIkluaWV0dGEgbm9kbyBvcHBvcnR1bml0w6BcIlxuICAgICAgICB9LFxuICAgICAgICBcInRleHRcIjp7XG4gICAgICAgICAgICBcImRlbGV0ZVwiOiBcIkNhbmNlbGxhXCJcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXCJ2YWxpZGF0aW9uXCI6e1xuICAgICAgICBcImluY29tcGxldGVQYXRoXCI6IFwiUGVyY29yc28gc2VuemEgbm9kbyB0ZXJtaW5hbGVcIixcbiAgICAgICAgXCJwcm9iYWJpbGl0eURvTm90U3VtVXBUbzFcIjogXCJMYSBzb21tYSBkZWxsZSBwcm9iYWJpbGl0w6Agw6ggZGl2ZXJzYSBkYSAxXCIsXG4gICAgICAgIFwiaW52YWxpZFByb2JhYmlsaXR5XCI6IFwiUHJvYmFiaWxpdMOgIG5vbiB2YWxpZGEgLSBib3JkbyAje3tudW1iZXJ9fVwiLFxuICAgICAgICBcImludmFsaWRQYXlvZmZcIjogXCJTYWxkbyBub24gdmFsaWRvIC0gYm9yZG8gI3t7bnVtYmVyfX1cIlxuICAgIH0sXG4gICAgXCJncm93bFwiOntcbiAgICAgICAgXCJicnVzaERpc2FibGVkXCI6IFwiU2VsZXppb25lIHBlbm5lbGxvIGRpc2FiaWxpdGF0YVwiLFxuICAgICAgICBcImJydXNoRW5hYmxlZFwiOiBcIlNlbGV6aW9uZSBwZW5uZWxsbyBhYmlsaXRhdGFcIlxuICAgIH0sXG4gICAgXCJ0b29sdGlwXCI6e1xuICAgICAgICBcIm5vZGVcIjp7XG4gICAgICAgICAgICBcInBheW9mZlwiOiB7XG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiU2FsZG8ge3tudW1iZXJ9fVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJ7e25hbWV9fVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJhZ2dyZWdhdGVkUGF5b2ZmXCI6IHtcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJTYWxkbyBhZ2dyZWdhdG8ge3tudW1iZXJ9fVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJBZ2dyZWdhdG8ge3tuYW1lfX1cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwicHJvYmFiaWxpdHlUb0VudGVyXCI6IFwiUHJvYmFiaWxpdMOgIGRhIGluc2VyaXJlXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJlZGdlXCI6e1xuICAgICAgICAgICAgXCJwYXlvZmZcIjoge1xuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIlNhbGRvIHt7bnVtYmVyfX06IHt7dmFsdWV9fVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJ7e25hbWV9fToge3t2YWx1ZX19XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInByb2JhYmlsaXR5XCI6IFwiUHJvYmFiaWxpdMOgOiB7e3ZhbHVlfX1cIlxuICAgICAgICB9XG4gICAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHM9e1xuXG4gICAgXCJjb250ZXh0TWVudVwiOntcbiAgICAgICAgXCJtYWluXCI6e1xuICAgICAgICAgICAgXCJhZGREZWNpc2lvbk5vZGVcIjogXCJEb2RhaiBXxJl6ZcWCIERlY3l6eWpueVwiLFxuICAgICAgICAgICAgXCJhZGRDaGFuY2VOb2RlXCI6IFwiRG9kYWogV8SZemXFgiBMb3Nvd3lcIixcbiAgICAgICAgICAgIFwiYWRkVGV4dFwiOiBcIkRvZGFqIFRla3N0XCIsXG4gICAgICAgICAgICBcInBhc3RlXCI6IFwiV2tsZWpcIixcbiAgICAgICAgICAgIFwic2VsZWN0QWxsTm9kZXNcIjogXCJaYXpuYWN6IHdzenlzdGtpZSB3xJl6xYJ5XCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJub2RlXCI6e1xuICAgICAgICAgICAgXCJjb3B5XCI6IFwiS29waXVqXCIsXG4gICAgICAgICAgICBcImN1dFwiOiBcIld5dG5palwiLFxuICAgICAgICAgICAgXCJwYXN0ZVwiOiBcIldrbGVqXCIsXG4gICAgICAgICAgICBcImRlbGV0ZVwiOiBcIlVzdcWEXCIsXG4gICAgICAgICAgICBcImFkZERlY2lzaW9uTm9kZVwiOiBcIkRvZGFqIFfEmXplxYIgRGVjeXp5am55XCIsXG4gICAgICAgICAgICBcImFkZENoYW5jZU5vZGVcIjogXCJEb2RhaiBXxJl6ZcWCIExvc293eVwiLFxuICAgICAgICAgICAgXCJhZGRUZXJtaW5hbE5vZGVcIjogXCJEb2RhaiBXxJl6ZcWCIEtvxYRjb3d5XCIsXG4gICAgICAgICAgICBcImNvbnZlcnRcIjp7XG4gICAgICAgICAgICAgICAgXCJkZWNpc2lvblwiOiBcIkpha28gV8SZemXFgiBEZWN5enlqbnlcIixcbiAgICAgICAgICAgICAgICBcImNoYW5jZVwiOiBcIkpha28gV8SZemXFgiBMb3Nvd3lcIixcbiAgICAgICAgICAgICAgICBcInRlcm1pbmFsXCI6IFwiSmFrbyBXxJl6ZcWCIEtvxYRjb3d5XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInNlbGVjdFN1YnRyZWVcIjogXCJaYXpuYWN6IHBvZGRyemV3b1wiLFxuICAgICAgICAgICAgXCJmb2xkXCI6IFwiWndpxYQgcG9kZHJ6ZXdvXCIsXG4gICAgICAgICAgICBcInVuZm9sZFwiOiBcIlJvendpxYQgcG9kZHJ6ZXdvXCIsXG4gICAgICAgICAgICBcImZsaXBTdWJ0cmVlXCI6IFwiUHJ6ZXdyw7PEhyBwb2Rkcnpld29cIixcbiAgICAgICAgICAgIFwicGF5b2Zmc1RyYW5zZm9ybWF0aW9uXCI6IFwiUHJ6ZWtzenRhxYLEhyB3eXDFgmF0eVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiZWRnZVwiOntcbiAgICAgICAgICAgIFwiaW5qZWN0RGVjaXNpb25Ob2RlXCI6IFwiV3N0cnp5a25paiBXxJl6ZcWCIERlY3l6eWpueVwiLFxuICAgICAgICAgICAgXCJpbmplY3RDaGFuY2VOb2RlXCI6IFwiV3N0cnp5a25paiBXxJl6ZcWCIExvc293eVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwidGV4dFwiOntcbiAgICAgICAgICAgIFwiZGVsZXRlXCI6IFwiVXN1xYRcIlxuICAgICAgICB9XG4gICAgfSxcblxuICAgIFwidmFsaWRhdGlvblwiOntcbiAgICAgICAgXCJpbmNvbXBsZXRlUGF0aFwiOiBcIk9zdGF0bmltIHfEmXrFgmVtIHcgxZtjaWXFvGNlIHBvd2luaWVuIGJ5xIcgV8SZemXFgiBLb8WEY293eVwiLFxuICAgICAgICBcInByb2JhYmlsaXR5RG9Ob3RTdW1VcFRvMVwiOiBcIlByYXdkb3BvZG9iaWXFhHN0d2EgbmllIHN1bXVqxIUgc2llIGRvIDFcIixcbiAgICAgICAgXCJpbnZhbGlkUHJvYmFiaWxpdHlcIjogXCJOaWVwb3ByYXduZSBwcmF3ZG9wb2RvYmllxYRzdHdvIG5hIGtyYXfEmWR6aSAje3tudW1iZXJ9fVwiLFxuICAgICAgICBcImludmFsaWRQYXlvZmZcIjogXCJOaWVwb3ByYXduYSB3eXDFgmF0YSBuYSBrcmF3xJlkemkgI3t7bnVtYmVyfX1cIlxuICAgIH0sXG4gICAgXCJncm93bFwiOntcbiAgICAgICAgXCJicnVzaERpc2FibGVkXCI6IFwiWmF6bmFjemFuaWUgd3nFgsSFY3pvbmVcIixcbiAgICAgICAgXCJicnVzaEVuYWJsZWRcIjogXCJaYXpuYWN6YW5pZSB3xYLEhWN6b25lXCJcbiAgICB9LFxuICAgIFwidG9vbHRpcFwiOntcbiAgICAgICAgXCJub2RlXCI6e1xuICAgICAgICAgICAgXCJwYXlvZmZcIjoge1xuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIld5cMWCYXRhIHt7bnVtYmVyfX1cIixcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwie3tuYW1lfX1cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiYWdncmVnYXRlZFBheW9mZlwiOiB7XG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiWmFncmVnb3dhbmEgd3lwxYJhdGEge3tudW1iZXJ9fVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJaYWdyZWdvd2FuYSB7e25hbWV9fVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJwcm9iYWJpbGl0eVRvRW50ZXJcIjogXCJQcmF3ZG9wb2RvYmllxYRzdHdvIHdlasWbY2lhXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJlZGdlXCI6e1xuICAgICAgICAgICAgXCJwYXlvZmZcIjoge1xuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIld5cMWCYXRhIHt7bnVtYmVyfX06IHt7dmFsdWV9fVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJ7e25hbWV9fToge3t2YWx1ZX19XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInByb2JhYmlsaXR5XCI6IFwiUHJhd2RvcG9kb2JpZcWEc3R3bzoge3t2YWx1ZX19XCJcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7RDNFeHRlbnNpb25zfSBmcm9tICcuL2QzLWV4dGVuc2lvbnMnXG5EM0V4dGVuc2lvbnMuZXh0ZW5kKCk7XG5cbmV4cG9ydCAqIGZyb20gJy4vdHJlZS1kZXNpZ25lcidcbmV4cG9ydCAqIGZyb20gJy4vYXBwLXV0aWxzJ1xuZXhwb3J0ICogZnJvbSAnLi90ZW1wbGF0ZXMnXG5leHBvcnQgKiBmcm9tICcuL3Rvb2x0aXAnXG5leHBvcnQgKiBmcm9tICcuL2QzLWV4dGVuc2lvbnMnXG5leHBvcnQge2RlZmF1bHQgYXMgZDN9IGZyb20gJy4vZDMnXG5cblxuIiwiaW1wb3J0IHtVdGlsc30gZnJvbSAnc2QtdXRpbHMnXG5pbXBvcnQge2RvbWFpbiBhcyBtb2RlbH0gZnJvbSAnc2QtbW9kZWwnXG5pbXBvcnQgKiBhcyBkMyBmcm9tICcuL2QzJ1xuaW1wb3J0IGNpcmNsZVN5bWJvbCBmcm9tICcuL3N5bWJvbHMvY2lyY2xlJ1xuaW1wb3J0IHRyaWFuZ2xlU3ltYm9sIGZyb20gJy4vc3ltYm9scy90cmlhbmdsZSdcbmltcG9ydCB7QXBwVXRpbHN9IGZyb20gXCIuL2FwcC11dGlsc1wiO1xuXG4vKlRyZWUgbGF5b3V0IG1hbmFnZXIqL1xuZXhwb3J0IGNsYXNzIExheW91dHtcblxuICAgIHRyZWVEZXNpZ25lcjtcbiAgICBkYXRhO1xuICAgIGNvbmZpZztcblxuICAgIG5vZGVUeXBlVG9TeW1ib2wgPSB7XG4gICAgICAgICdkZWNpc2lvbic6IGQzLnN5bWJvbFNxdWFyZSxcbiAgICAgICAgJ2NoYW5jZSc6IGNpcmNsZVN5bWJvbCxcbiAgICAgICAgXCJ0ZXJtaW5hbFwiOiB0cmlhbmdsZVN5bWJvbFxuICAgIH07XG5cbiAgICBzdGF0aWMgTUFOVUFMX0xBWU9VVF9OQU1FID0gJ21hbnVhbCc7XG5cblxuICAgIG9uQXV0b0xheW91dENoYW5nZWQ9W107XG5cbiAgICBub2RlVHlwZU9yZGVyID0ge1xuICAgICAgICAnZGVjaXNpb24nIDogMCxcbiAgICAgICAgJ2NoYW5jZSc6IDAsXG4gICAgICAgICd0ZXJtaW5hbCc6IDFcbiAgICB9O1xuXG4gICAgdHJlZU1hcmdpbiA9IDUwO1xuICAgIHRhcmdldFN5bWJvbFNpemU9e307XG4gICAgbm9kZVNlcGFyYXRpb24gPSAoYSwgYikgPT4gYS5wYXJlbnQgPT09IGIucGFyZW50ID8gMSA6IDEuMlxuXG4gICAgY29uc3RydWN0b3IodHJlZURlc2lnbmVyLCBkYXRhLCBjb25maWcpe1xuICAgICAgICB0aGlzLnRyZWVEZXNpZ25lciA9IHRyZWVEZXNpZ25lcjtcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XG5cbiAgICB9XG5cbiAgICB1cGRhdGUobm9kZSl7XG4gICAgICAgIGlmKG5vZGUgJiYgbm9kZS4kcGFyZW50KXtcbiAgICAgICAgICAgIG5vZGUuJHBhcmVudC5jaGlsZEVkZ2VzLnNvcnQoKGEsYik9PmEuY2hpbGROb2RlLmxvY2F0aW9uLnkgLSBiLmNoaWxkTm9kZS5sb2NhdGlvbi55KVxuICAgICAgICB9XG4gICAgICAgIGlmKCF0aGlzLmlzTWFudWFsTGF5b3V0KCkpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXV0b0xheW91dCh0aGlzLmNvbmZpZy50eXBlLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZihub2RlKXtcbiAgICAgICAgICAgIHRoaXMubW92ZU5vZGVUb0VtcHR5UGxhY2Uobm9kZSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy50cmVlRGVzaWduZXIucmVkcmF3KHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNNYW51YWxMYXlvdXQoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLnR5cGUgPT09IExheW91dC5NQU5VQUxfTEFZT1VUX05BTUU7XG4gICAgfVxuXG4gICAgZ2V0TmV3Q2hpbGRMb2NhdGlvbihwYXJlbnQpe1xuICAgICAgICBpZighcGFyZW50KXtcbiAgICAgICAgICAgIHJldHVybiBuZXcgbW9kZWwuUG9pbnQodGhpcy5nZXROb2RlTWluWCgpLCB0aGlzLmdldE5vZGVNaW5ZKCkpXG4gICAgICAgIH1cbiAgICAgICAgdmFyIHggPSBwYXJlbnQubG9jYXRpb24ueCArIHRoaXMuY29uZmlnLmdyaWRXaWR0aDtcbiAgICAgICAgdmFyIHkgPSBwYXJlbnQubG9jYXRpb24ueTtcbiAgICAgICAgaWYocGFyZW50LmNoaWxkRWRnZXMubGVuZ3RoKXtcbiAgICAgICAgICAgIHkgPSBwYXJlbnQuY2hpbGRFZGdlc1twYXJlbnQuY2hpbGRFZGdlcy5sZW5ndGgtMV0uY2hpbGROb2RlLmxvY2F0aW9uLnkrMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgbW9kZWwuUG9pbnQoeCwgeSlcbiAgICB9XG5cbiAgICBnZXRJbmplY3RlZE5vZGVMb2NhdGlvbihlZGdlKXtcblxuICAgICAgICB2YXIgcCA9IGVkZ2UuJGxpbmVQb2ludHNbMl07XG5cbiAgICAgICAgcmV0dXJuIG5ldyBtb2RlbC5Qb2ludChwWzBdLCBwWzFdKVxuICAgIH1cblxuICAgIG1vdmVOb2RlVG9FbXB0eVBsYWNlKG5vZGUsIHJlZHJhd0lmQ2hhbmdlZD10cnVlKXtcbiAgICAgICAgdmFyIHBvc2l0aW9uTWFwID0ge307XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgbm9kZS5sb2NhdGlvbi54ID0gTWF0aC5tYXgodGhpcy5nZXROb2RlTWluWChub2RlKSwgbm9kZS5sb2NhdGlvbi54KTtcbiAgICAgICAgbm9kZS5sb2NhdGlvbi55ID0gTWF0aC5tYXgodGhpcy5nZXROb2RlTWluWShub2RlKSwgbm9kZS5sb2NhdGlvbi55KTtcblxuXG4gICAgICAgIHRoaXMubm9kZXNTb3J0ZWRCeVggPSB0aGlzLmRhdGEubm9kZXMuc2xpY2UoKTtcbiAgICAgICAgdGhpcy5ub2Rlc1NvcnRlZEJ5WC5zb3J0KChhLGIpPT5hLmxvY2F0aW9uLnggLSBiLmxvY2F0aW9uLngpO1xuXG4gICAgICAgIGZ1bmN0aW9uIGZpbmRDb2xsaWRpbmdOb2RlKG5vZGUsIGxvY2F0aW9uKXtcbiAgICAgICAgICAgIHJldHVybiBVdGlscy5maW5kKHNlbGYubm9kZXNTb3J0ZWRCeVgsIG49PntcbiAgICAgICAgICAgICAgICBpZihub2RlID09IG4pe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIG1hcmdpbiA9IHNlbGYuY29uZmlnLm5vZGVTaXplLzM7XG4gICAgICAgICAgICAgICAgdmFyIHggPSBuLmxvY2F0aW9uLng7XG4gICAgICAgICAgICAgICAgdmFyIHkgPSBuLmxvY2F0aW9uLnk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKGxvY2F0aW9uLnggLSBtYXJnaW4gPD0geCAmJiBsb2NhdGlvbi54ICsgbWFyZ2luID49IHhcbiAgICAgICAgICAgICAgICAgICAgJiYgbG9jYXRpb24ueSAtIG1hcmdpbiA8PSB5ICYmIGxvY2F0aW9uLnkgKyBtYXJnaW4gPj0geSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHN0ZXBYID0gdGhpcy5jb25maWcubm9kZVNpemUvMjtcbiAgICAgICAgdmFyIHN0ZXBZID0gdGhpcy5jb25maWcubm9kZVNpemUrMTA7XG4gICAgICAgIHZhciBzdGVwWHNhbWVQYXJlbnQgPSAwO1xuICAgICAgICB2YXIgc3RlcFlzYW1lUGFyZW50ID0gNzU7XG4gICAgICAgIHZhciBjaGFuZ2VkID0gZmFsc2U7XG4gICAgICAgIHZhciBjb2xpZGluZ05vZGU7XG4gICAgICAgIHZhciBuZXdMb2NhdGlvbiA9IG5ldyBtb2RlbC5Qb2ludChub2RlLmxvY2F0aW9uKTtcbiAgICAgICAgd2hpbGUoY29saWRpbmdOb2RlID0gZmluZENvbGxpZGluZ05vZGUobm9kZSwgbmV3TG9jYXRpb24pKXtcbiAgICAgICAgICAgIGNoYW5nZWQ9dHJ1ZTtcbiAgICAgICAgICAgIHZhciBzYW1lUGFyZW50ID0gbm9kZS4kcGFyZW50ICYmIGNvbGlkaW5nTm9kZS4kcGFyZW50ICYmIG5vZGUuJHBhcmVudD09PWNvbGlkaW5nTm9kZS4kcGFyZW50O1xuICAgICAgICAgICAgaWYoc2FtZVBhcmVudCl7XG4gICAgICAgICAgICAgICAgbmV3TG9jYXRpb24ubW92ZShzdGVwWHNhbWVQYXJlbnQsIHN0ZXBZc2FtZVBhcmVudCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBuZXdMb2NhdGlvbi5tb3ZlKHN0ZXBYLCBzdGVwWSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYoY2hhbmdlZCl7XG4gICAgICAgICAgICBub2RlLm1vdmVUbyhuZXdMb2NhdGlvbi54LG5ld0xvY2F0aW9uLnksIHRydWUpO1xuICAgICAgICAgICAgaWYocmVkcmF3SWZDaGFuZ2VkKXtcbiAgICAgICAgICAgICAgICB0aGlzLnRyZWVEZXNpZ25lci5yZWRyYXcodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkaXNhYmxlQXV0b0xheW91dCgpe1xuICAgICAgICB0aGlzLmNvbmZpZy50eXBlID0gTGF5b3V0Lk1BTlVBTF9MQVlPVVRfTkFNRTtcbiAgICAgICAgdGhpcy5fZmlyZU9uQXV0b0xheW91dENoYW5nZWRDYWxsYmFja3MoKTtcbiAgICB9XG5cblxuICAgIG5vZGVTeW1ib2xTaXplID0ge307XG4gICAgZHJhd05vZGVTeW1ib2wocGF0aCwgdHJhbnNpdGlvbil7XG5cbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgbm9kZVNpemUgPSB0aGlzLmNvbmZpZy5ub2RlU2l6ZTtcbiAgICAgICAgdGhpcy5ub2RlU3ltYm9sID0gZDMuc3ltYm9sKCkudHlwZShkPT4gc2VsZi5ub2RlVHlwZVRvU3ltYm9sW2QudHlwZV0pXG4gICAgICAgICAgICAuc2l6ZShkPT5zZWxmLm5vZGVTeW1ib2xTaXplW2QuaWRdID8gVXRpbHMuZ2V0KHNlbGYudGFyZ2V0U3ltYm9sU2l6ZSwgZC50eXBlK1wiWydcIitzZWxmLmNvbmZpZy5ub2RlU2l6ZStcIiddXCIsIDY0KSA6IDY0KTtcblxuICAgICAgICBwYXRoXG4gICAgICAgICAgICAuZWFjaChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHZhciBwYXRoID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICAgICAgICAgIHZhciBwcmV2ID0gcGF0aC5hdHRyKFwiZFwiKTtcbiAgICAgICAgICAgICAgICBpZighcHJldil7XG4gICAgICAgICAgICAgICAgICAgIHBhdGguYXR0cihcImRcIiwgc2VsZi5ub2RlU3ltYm9sKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHNpemUgPSBVdGlscy5nZXQoc2VsZi50YXJnZXRTeW1ib2xTaXplLCBkLnR5cGUrXCJbJ1wiK3NlbGYuY29uZmlnLm5vZGVTaXplK1wiJ11cIik7XG4gICAgICAgICAgICAgICAgaWYoIXNpemUpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgYm94ID0gcGF0aC5ub2RlKCkuZ2V0QkJveCgpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSBNYXRoLm1pbihub2RlU2l6ZSAvIGJveC53aWR0aCwgbm9kZVNpemUgLyBib3guaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgc2l6ZSA9IGVycm9yICogZXJyb3IgKiAoc2VsZi5ub2RlU3ltYm9sU2l6ZVtkLmlkXXx8NjQpO1xuICAgICAgICAgICAgICAgICAgICBVdGlscy5zZXQoc2VsZi50YXJnZXRTeW1ib2xTaXplLCBkLnR5cGUrXCJbJ1wiK3NlbGYuY29uZmlnLm5vZGVTaXplK1wiJ11cIiwgc2l6ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKHRyYW5zaXRpb24pe1xuICAgICAgICAgICAgICAgICAgICBwYXRoID0gIHBhdGgudHJhbnNpdGlvbigpO1xuXG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubm9kZVN5bWJvbFNpemVbZC5pZF0gPSBzaXplO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwYXRoLmF0dHIoXCJkXCIsIHNlbGYubm9kZVN5bWJvbCk7XG4gICAgICAgICAgICAgICAgaWYodHJhbnNpdGlvbil7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubm9kZVN5bWJvbFNpemVbZC5pZF0gPSBzaXplO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5vZGVMYWJlbFBvc2l0aW9uKHNlbGVjdGlvbikge1xuICAgICAgICByZXR1cm4gc2VsZWN0aW9uXG4gICAgICAgICAgICAuYXR0cigneCcsIDApXG4gICAgICAgICAgICAuYXR0cigneScsIC10aGlzLmNvbmZpZy5ub2RlU2l6ZSAvIDIgLSA3KVxuICAgIH1cblxuICAgIG5vZGVQYXlvZmZQb3NpdGlvbihzZWxlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIExheW91dC5zZXRIYW5naW5nUG9zaXRpb24oc2VsZWN0aW9uKVxuICAgICAgICAgICAgLmF0dHIoJ3gnLCAwKVxuICAgICAgICAgICAgLmF0dHIoJ3knLCB0aGlzLmNvbmZpZy5ub2RlU2l6ZSAvIDIgKyA3KVxuICAgICAgICAgICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXG4gICAgfVxuXG4gICAgbm9kZUFnZ3JlZ2F0ZWRQYXlvZmZQb3NpdGlvbihzZWxlY3Rpb24pIHtcbiAgICAgICAgdmFyIHggPSB0aGlzLmNvbmZpZy5ub2RlU2l6ZSAvIDIgKyA3O1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHNlbGVjdGlvblxuICAgICAgICAgICAgLmF0dHIoJ3gnLCB4KVxuICAgICAgICAgICAgLmF0dHIoJ3knLCBmdW5jdGlvbihkKXtcbiAgICAgICAgICAgICAgICBsZXQgZm9udFNpemUgPSBwYXJzZUludChBcHBVdGlscy5nZXRGb250U2l6ZSh0aGlzKSk7XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW1zID0gZC5kaXNwbGF5VmFsdWUoJ2FnZ3JlZ2F0ZWRQYXlvZmYnKTtcbiAgICAgICAgICAgICAgICBsZXQgbnVtYmVyID0gVXRpbHMuaXNBcnJheShpdGVtcykgPyBpdGVtcy5maWx0ZXIoaXQ9Pml0ICE9PSB1bmRlZmluZWQpLmxlbmd0aCA6IDE7XG4gICAgICAgICAgICAgICAgaWYobnVtYmVyPjEpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gLXRoaXMuZ2V0QkJveCgpLmhlaWdodC8yICsgZm9udFNpemUvMjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIC1NYXRoLm1heCgyLCAxLjgqIHNlbGYuY29uZmlnLm5vZGVTaXplL2ZvbnRTaXplKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHNlbGVjdGlvbi5zZWxlY3RBbGwoJ3RzcGFuJykuYXR0cigneCcsIHgpO1xuICAgICAgICByZXR1cm4gc2VsZWN0aW9uO1xuICAgICAgICAgICAgLy8gLmF0dHIoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXG4gICAgICAgICAgICAvLyAuYXR0cignZG9taW5hbnQtYmFzZWxpbmUnLCAnaGFuZ2luZycpXG4gICAgfVxuXG4gICAgbm9kZVByb2JhYmlsaXR5VG9FbnRlclBvc2l0aW9uKHNlbGVjdGlvbikge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIExheW91dC5zZXRIYW5naW5nUG9zaXRpb24oc2VsZWN0aW9uKVxuICAgICAgICAgICAgLmF0dHIoJ3gnLCB0aGlzLmNvbmZpZy5ub2RlU2l6ZSAvIDIgKyA3KVxuICAgICAgICAgICAgLmF0dHIoJ3knLCBmdW5jdGlvbihkKXtcbiAgICAgICAgICAgICAgICBsZXQgZm9udFNpemUgPSBwYXJzZUludChBcHBVdGlscy5nZXRGb250U2l6ZSh0aGlzKSk7XG4gICAgICAgICAgICAgICAgbGV0IGFnZ3JlZ2F0ZWRQYXlvZmZzID0gZC5kaXNwbGF5VmFsdWUoJ2FnZ3JlZ2F0ZWRQYXlvZmYnKTtcbiAgICAgICAgICAgICAgICBsZXQgYWdncmVnYXRlZFBheW9mZnNOdW1iZXIgPSBVdGlscy5pc0FycmF5KGFnZ3JlZ2F0ZWRQYXlvZmZzKSA/IGFnZ3JlZ2F0ZWRQYXlvZmZzLmZpbHRlcihpdD0+aXQgIT09IHVuZGVmaW5lZCkubGVuZ3RoIDogMTtcbiAgICAgICAgICAgICAgICBpZihhZ2dyZWdhdGVkUGF5b2Zmc051bWJlcj4xKXtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZm9udFNpemUqMC42XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGgubWF4KDIsIDEuOCogc2VsZi5jb25maWcubm9kZVNpemUvZm9udFNpemUpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC8vIC5hdHRyKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKVxuICAgICAgICAgICAgLy8gLmF0dHIoJ2RvbWluYW50LWJhc2VsaW5lJywgJ2NlbnRyYWwnKVxuICAgIH1cblxuICAgIG5vZGVJbmRpY2F0b3JQb3NpdGlvbihzZWxlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIHNlbGVjdGlvblxuICAgICAgICAgICAgLmF0dHIoJ3gnLCB0aGlzLmNvbmZpZy5ub2RlU2l6ZSAvIDIgKyA4KVxuICAgICAgICAgICAgLmF0dHIoJ3knLCAtIHRoaXMuY29uZmlnLm5vZGVTaXplLzIpXG4gICAgICAgICAgICAuYXR0cignZG9taW5hbnQtYmFzZWxpbmUnLCAnY2VudHJhbCcpXG4gICAgICAgICAgICAuYXR0cigndGV4dC1hbmNob3InLCAnbWlkZGxlJylcbiAgICB9XG5cbiAgICBub2RlVW5mb2xkQnV0dG9uUG9zaXRpb24oc2VsZWN0aW9uKSB7XG5cbiAgICAgICAgcmV0dXJuIHNlbGVjdGlvblxuICAgICAgICAgICAgLmF0dHIoJ3gnLCB0aGlzLmNvbmZpZy5ub2RlU2l6ZSAvIDIgKyA1KVxuICAgICAgICAgICAgLmF0dHIoJ3knLCAwKVxuICAgICAgICAgICAgLmF0dHIoJ2RvbWluYW50LWJhc2VsaW5lJywgJ2NlbnRyYWwnKVxuICAgIH1cblxuICAgIGVkZ2VMaW5lRChlZGdlKXtcbiAgICAgICAgdmFyIGxpbmUgPSBkMy5saW5lKClcbiAgICAgICAgICAgIC54KGQ9PiBkWzBdKVxuICAgICAgICAgICAgLnkoZD0+IGRbMV0pO1xuICAgICAgICAvLyAuY3VydmUoZDMuY3VydmVDYXRtdWxsUm9tLmFscGhhKDAuNSkpO1xuXG5cbiAgICAgICAgdmFyIHBhcmVudE5vZGUgPSBlZGdlLnBhcmVudE5vZGU7XG4gICAgICAgIHZhciBjaGlsZE5vZGUgPSBlZGdlLmNoaWxkTm9kZTtcblxuICAgICAgICB2YXIgZFggPSBjaGlsZE5vZGUubG9jYXRpb24ueCAtIHBhcmVudE5vZGUubG9jYXRpb24ueDtcbiAgICAgICAgdmFyIGRZID0gY2hpbGROb2RlLmxvY2F0aW9uLnkgLSBwYXJlbnROb2RlLmxvY2F0aW9uLnk7XG5cbiAgICAgICAgdmFyIHNpZ24gPSBkWD49MCA/IDEgOiAtMTtcblxuICAgICAgICB2YXIgc2xhbnRTdGFydFhPZmZzZXQgPSBNYXRoLm1pbihkWC8yLCB0aGlzLmNvbmZpZy5ub2RlU2l6ZS8yKzEwKTtcbiAgICAgICAgdmFyIHNsYW50V2lkdGggPSBNYXRoLm1pbih0aGlzLmNvbmZpZy5lZGdlU2xhbnRXaWR0aE1heCwgTWF0aC5tYXgoZFgvMiAtIHNsYW50U3RhcnRYT2Zmc2V0LCAwKSk7XG5cbiAgICAgICAgdmFyIHBvaW50MSA9IFtwYXJlbnROb2RlLmxvY2F0aW9uLnggK3RoaXMuY29uZmlnLm5vZGVTaXplLzIgKyAxLCBwYXJlbnROb2RlLmxvY2F0aW9uLnldO1xuICAgICAgICB2YXIgcG9pbnQyID0gW01hdGgubWF4KHBhcmVudE5vZGUubG9jYXRpb24ueCtzbGFudFN0YXJ0WE9mZnNldCwgcG9pbnQxWzBdKSwgcGFyZW50Tm9kZS5sb2NhdGlvbi55XTtcbiAgICAgICAgdmFyIHBvaW50MyA9IFtwYXJlbnROb2RlLmxvY2F0aW9uLngrc2xhbnRTdGFydFhPZmZzZXQrc2xhbnRXaWR0aCwgY2hpbGROb2RlLmxvY2F0aW9uLnldO1xuICAgICAgICB2YXIgcG9pbnQ0ID0gW2NoaWxkTm9kZS5sb2NhdGlvbi54IC0gKHNpZ24qKE1hdGgubWF4KDAsIE1hdGgubWluKHRoaXMuY29uZmlnLm5vZGVTaXplLzIrOCwgZFgvMikpKSksIGNoaWxkTm9kZS5sb2NhdGlvbi55XTtcbiAgICAgICAgLy8gdmFyIHBvaW50MiA9IFtwYXJlbnROb2RlLmxvY2F0aW9uLngrZFgvMi1zbGFudFdpZHRoLzIsIHBhcmVudE5vZGUubG9jYXRpb24ueV07XG4gICAgICAgIC8vIHZhciBwb2ludDMgPSBbY2hpbGROb2RlLmxvY2F0aW9uLngtKGRYLzItc2xhbnRXaWR0aC8yKSwgY2hpbGROb2RlLmxvY2F0aW9uLnldO1xuXG4gICAgICAgIGVkZ2UuJGxpbmVQb2ludHMgPSBbcG9pbnQxLCBwb2ludDIsIHBvaW50MywgcG9pbnQ0XTtcbiAgICAgICAgcmV0dXJuIGxpbmUoZWRnZS4kbGluZVBvaW50cyk7XG4gICAgfVxuXG4gICAgZWRnZVBheW9mZlBvc2l0aW9uKHNlbGVjdGlvbikge1xuICAgICAgICBMYXlvdXQuc2V0SGFuZ2luZ1Bvc2l0aW9uKHNlbGVjdGlvbilcbiAgICAgICAgICAgIC5hdHRyKCd4JywgZD0+ZC4kbGluZVBvaW50c1syXVswXSArIDIpXG4gICAgICAgICAgICAuYXR0cigneScsIGQ9PmQuJGxpbmVQb2ludHNbMl1bMV0gKyA3KTtcblxuICAgICAgICBzZWxlY3Rpb24uc2VsZWN0QWxsKCd0c3BhbicpLmF0dHIoJ3gnLCBmdW5jdGlvbihkKXtcbiAgICAgICAgICAgIHJldHVybiBkMy5zZWxlY3QodGhpcy5wYXJlbnROb2RlKS5kYXR1bSgpLiRsaW5lUG9pbnRzWzJdWzBdICsgMlxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHNlbGVjdGlvbjtcblxuICAgIH1cblxuICAgIGVkZ2VMYWJlbFBvc2l0aW9uKHNlbGVjdGlvbikge1xuICAgICAgICByZXR1cm4gc2VsZWN0aW9uXG4gICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgZD0+J3RyYW5zbGF0ZSgnKyhkLiRsaW5lUG9pbnRzWzJdWzBdICsgMikrJywnKyhkLiRsaW5lUG9pbnRzWzJdWzFdIC0gNykrJyknKVxuICAgICAgICAgICAgLy8gLmF0dHIoJ3gnLCBkPT5kLiRsaW5lUG9pbnRzWzJdWzBdICsgMilcbiAgICAgICAgICAgIC8vIC5hdHRyKCd5JywgZD0+ZC4kbGluZVBvaW50c1syXVsxXSAtIDcpXG5cbiAgICB9XG5cbiAgICBlZGdlUHJvYmFiaWxpdHlQb3NpdGlvbihzZWxlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIExheW91dC5zZXRIYW5naW5nUG9zaXRpb24oc2VsZWN0aW9uKVxuICAgICAgICAgICAgLmF0dHIoJ3gnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHZhciBsZW4gPSB0aGlzLmdldENvbXB1dGVkVGV4dExlbmd0aCgpO1xuICAgICAgICAgICAgICAgIHZhciBtaW4gPSBkLiRsaW5lUG9pbnRzWzJdWzBdICsgMiArIHRoaXMucHJldmlvdXNTaWJsaW5nLmNoaWxkTm9kZXNbMF0uZ2V0Q29tcHV0ZWRUZXh0TGVuZ3RoKCkgKyA3ICsgbGVuO1xuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLm1heChtaW4sIGQuJGxpbmVQb2ludHNbM11bMF0gLSA4KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXR0cigneScsIGQ9PmQuJGxpbmVQb2ludHNbMl1bMV0gKyA3KVxuICAgIH1cblxuICAgIGdldE1pbk1hcmdpbkJldHdlZW5Ob2Rlcygpe1xuICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLm5vZGVTaXplICsgMzA7XG4gICAgfVxuXG4gICAgZ2V0VGV4dE1pblgoZCl7XG4gICAgICAgIGxldCBtaW5YID0gMDtcbiAgICAgICAgaWYoZCl7XG4gICAgICAgICAgICBsZXQgYmIgPSB0aGlzLnRyZWVEZXNpZ25lci5nZXRUZXh0RDNTZWxlY3Rpb24oZCkuc2VsZWN0KCd0ZXh0Jykubm9kZSgpLmdldEJCb3goKTtcbiAgICAgICAgICAgIGlmIChiYi54IDwgMCkge1xuICAgICAgICAgICAgICAgIG1pblggLT0gYmIueDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWluWDtcbiAgICB9XG5cbiAgICBnZXRUZXh0TWluWShkKXtcbiAgICAgICAgbGV0IG1pblkgPSAwO1xuICAgICAgICBpZihkKXtcbiAgICAgICAgICAgIGxldCBiYiA9IHRoaXMudHJlZURlc2lnbmVyLmdldFRleHREM1NlbGVjdGlvbihkKS5zZWxlY3QoJ3RleHQnKS5ub2RlKCkuZ2V0QkJveCgpO1xuICAgICAgICAgICAgaWYgKGJiLnkgPCAwKSB7XG4gICAgICAgICAgICAgICAgbWluWSAtPSBiYi55O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtaW5ZO1xuICAgIH1cblxuICAgIGdldFRleHRNYXhYKGQpe1xuICAgICAgICByZXR1cm4gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVI7XG4gICAgfVxuXG5cbiAgICBnZXROb2RlTWluWChkKXtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBpZihkICYmIGQuJHBhcmVudCl7Ly8gJiYgIXNlbGYuaXNOb2RlU2VsZWN0ZWQoZC4kcGFyZW50KVxuICAgICAgICAgICAgcmV0dXJuIGQuJHBhcmVudC5sb2NhdGlvbi54ICsgc2VsZi5nZXRNaW5NYXJnaW5CZXR3ZWVuTm9kZXMoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2VsZi5jb25maWcubm9kZVNpemUvMjtcbiAgICB9XG5cbiAgICBnZXROb2RlTWluWShkKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLm5vZGVTaXplLzI7XG4gICAgfVxuXG4gICAgZ2V0Tm9kZU1heFgoZCl7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICBpZihkICYmIGQuY2hpbGRFZGdlcy5sZW5ndGgpe1xuICAgICAgICAgICAgcmV0dXJuIGQzLm1pbihkLmNoaWxkRWRnZXMsIGU9PiFlLmNoaWxkTm9kZS4kaGlkZGVuID8gZS5jaGlsZE5vZGUubG9jYXRpb24ueCA6IDk5OTk5OTkpLXNlbGYuZ2V0TWluTWFyZ2luQmV0d2Vlbk5vZGVzKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIE51bWJlci5NQVhfU0FGRV9JTlRFR0VSO1xuICAgIH1cblxuICAgIHNldEdyaWRXaWR0aCh3aWR0aCwgd2l0aG91dFN0YXRlU2F2aW5nKXtcbiAgICAgICAgdmFyIHNlbGY9dGhpcztcbiAgICAgICAgaWYodGhpcy5jb25maWcuZ3JpZFdpZHRoPT09d2lkdGgpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmKCF3aXRob3V0U3RhdGVTYXZpbmcpe1xuICAgICAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSh7XG4gICAgICAgICAgICAgICAgZGF0YTp7XG4gICAgICAgICAgICAgICAgICAgIGdyaWRXaWR0aDogc2VsZi5jb25maWcuZ3JpZFdpZHRoXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvblVuZG86IChkYXRhKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRHcmlkV2lkdGgoZGF0YS5ncmlkV2lkdGgsIHRydWUpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25SZWRvOiAoZGF0YSk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0R3JpZFdpZHRoKHdpZHRoLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29uZmlnLmdyaWRXaWR0aD13aWR0aDtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG5cbiAgICBzZXRHcmlkSGVpZ2h0KGdyaWRIZWlnaHQsIHdpdGhvdXRTdGF0ZVNhdmluZyl7XG4gICAgICAgIHZhciBzZWxmPXRoaXM7XG4gICAgICAgIGlmKHRoaXMuY29uZmlnLmdyaWRIZWlnaHQ9PT1ncmlkSGVpZ2h0KXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZighd2l0aG91dFN0YXRlU2F2aW5nKXtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoe1xuICAgICAgICAgICAgICAgIGRhdGE6e1xuICAgICAgICAgICAgICAgICAgICBncmlkSGVpZ2h0OiBzZWxmLmNvbmZpZy5ncmlkSGVpZ2h0XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvblVuZG86IChkYXRhKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRHcmlkSGVpZ2h0KGRhdGEuZ3JpZEhlaWdodCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvblJlZG86IChkYXRhKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRHcmlkSGVpZ2h0KGdyaWRIZWlnaHQsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb25maWcuZ3JpZEhlaWdodD1ncmlkSGVpZ2h0O1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cblxuICAgIHNldE5vZGVTaXplKG5vZGVTaXplLCB3aXRob3V0U3RhdGVTYXZpbmcpe1xuICAgICAgICB2YXIgc2VsZj10aGlzO1xuICAgICAgICBpZih0aGlzLmNvbmZpZy5ub2RlU2l6ZT09PW5vZGVTaXplKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZighd2l0aG91dFN0YXRlU2F2aW5nKXtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoe1xuICAgICAgICAgICAgICAgIGRhdGE6e1xuICAgICAgICAgICAgICAgICAgICBub2RlU2l6ZTogc2VsZi5jb25maWcubm9kZVNpemVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uVW5kbzogKGRhdGEpPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldE5vZGVTaXplKGRhdGEubm9kZVNpemUsIHRydWUpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25SZWRvOiAoZGF0YSk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0Tm9kZVNpemUobm9kZVNpemUsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb25maWcubm9kZVNpemU9bm9kZVNpemU7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgIGlmKHRoaXMuaXNNYW51YWxMYXlvdXQoKSl7XG4gICAgICAgICAgICB0aGlzLmZpdE5vZGVzSW5QbG90dGluZ1JlZ2lvbihzZWxmLmRhdGEuZ2V0Um9vdHMoKSk7XG4gICAgICAgICAgICB0aGlzLnRyZWVEZXNpZ25lci5yZWRyYXcodHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRFZGdlU2xhbnRXaWR0aE1heCh3aWR0aCwgd2l0aG91dFN0YXRlU2F2aW5nKXtcbiAgICAgICAgdmFyIHNlbGY9dGhpcztcbiAgICAgICAgaWYodGhpcy5jb25maWcuZWRnZVNsYW50V2lkdGhNYXg9PT13aWR0aCl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYoIXdpdGhvdXRTdGF0ZVNhdmluZyl7XG4gICAgICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKHtcbiAgICAgICAgICAgICAgICBkYXRhOntcbiAgICAgICAgICAgICAgICAgICAgZWRnZVNsYW50V2lkdGhNYXg6IHNlbGYuY29uZmlnLmVkZ2VTbGFudFdpZHRoTWF4XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvblVuZG86IChkYXRhKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRFZGdlU2xhbnRXaWR0aE1heChkYXRhLmVkZ2VTbGFudFdpZHRoTWF4LCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uUmVkbzogKGRhdGEpPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldEVkZ2VTbGFudFdpZHRoTWF4KHdpZHRoLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29uZmlnLmVkZ2VTbGFudFdpZHRoTWF4PXdpZHRoO1xuICAgICAgICB0aGlzLnRyZWVEZXNpZ25lci5yZWRyYXcodHJ1ZSk7XG4gICAgfVxuXG4gICAgYXV0b0xheW91dCh0eXBlLCB3aXRob3V0U3RhdGVTYXZpbmcpe1xuICAgICAgICB2YXIgc2VsZj10aGlzO1xuXG5cblxuICAgICAgICBpZighd2l0aG91dFN0YXRlU2F2aW5nKXtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoe1xuICAgICAgICAgICAgICAgIGRhdGE6e1xuICAgICAgICAgICAgICAgICAgICBuZXdMYXlvdXQ6IHR5cGUsXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRMYXlvdXQ6IHNlbGYuY29uZmlnLnR5cGVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uVW5kbzogKGRhdGEpPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmNvbmZpZy50eXBlID0gZGF0YS5jdXJyZW50TGF5b3V0O1xuICAgICAgICAgICAgICAgICAgICBzZWxmLl9maXJlT25BdXRvTGF5b3V0Q2hhbmdlZENhbGxiYWNrcygpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25SZWRvOiAoZGF0YSk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuYXV0b0xheW91dChkYXRhLm5ld0xheW91dCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb25maWcudHlwZSA9IHR5cGU7XG4gICAgICAgIGlmKCF0aGlzLmRhdGEubm9kZXMubGVuZ3RoKXtcbiAgICAgICAgICAgIHRoaXMuX2ZpcmVPbkF1dG9MYXlvdXRDaGFuZ2VkQ2FsbGJhY2tzKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcHJldlRyZWVNYXhZID0gc2VsZi5nZXROb2RlTWluWSgpO1xuICAgICAgICB0aGlzLmRhdGEuZ2V0Um9vdHMoKS5mb3JFYWNoKHI9PntcbiAgICAgICAgICAgIHZhciByb290ID0gZDMuaGllcmFyY2h5KHIsIGQ9PntcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5jaGlsZEVkZ2VzLmZpbHRlcihlPT4hZS4kaGlkZGVuKS5tYXAoZT0+ZS5jaGlsZE5vZGUpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIHJvb3Quc29ydCgoYSxiKT0+c2VsZi5ub2RlVHlwZU9yZGVyW2EuZGF0YS50eXBlXS1zZWxmLm5vZGVUeXBlT3JkZXJbYi5kYXRhLnR5cGVdKTtcbiAgICAgICAgICAgIHJvb3Quc29ydCgoYSxiKT0+YS5kYXRhLmxvY2F0aW9uLnkgLSBiLmRhdGEubG9jYXRpb24ueSk7XG5cblxuICAgICAgICAgICAgdmFyIGxheW91dDtcbiAgICAgICAgICAgIGlmKHR5cGU9PT0nY2x1c3Rlcicpe1xuICAgICAgICAgICAgICAgIGxheW91dCA9IGQzLmNsdXN0ZXIoKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGxheW91dCA9IGQzLnRyZWUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxheW91dC5ub2RlU2l6ZShbc2VsZi5jb25maWcuZ3JpZEhlaWdodCwgc2VsZi5jb25maWcuZ3JpZFdpZHRoXSk7XG4gICAgICAgICAgICBsYXlvdXQuc2VwYXJhdGlvbihzZWxmLm5vZGVTZXBhcmF0aW9uKTtcblxuICAgICAgICAgICAgbGF5b3V0KHJvb3QpO1xuICAgICAgICAgICAgdmFyIG1pblkgPSA5OTk5OTk5OTk7XG4gICAgICAgICAgICByb290LmVhY2goZD0+e1xuICAgICAgICAgICAgICAgIG1pblkgPSBNYXRoLm1pbihtaW5ZLCBkLngpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHZhciBkeSA9IHJvb3QueCAtIG1pblkgKyBwcmV2VHJlZU1heFk7XG4gICAgICAgICAgICB2YXIgZHggPSBzZWxmLmdldE5vZGVNaW5YKCk7XG4gICAgICAgICAgICB2YXIgbWF4WT0wO1xuICAgICAgICAgICAgcm9vdC5lYWNoKGQ9PntcbiAgICAgICAgICAgICAgICBkLmRhdGEubG9jYXRpb24ueCA9IGQueSArIGR4O1xuICAgICAgICAgICAgICAgIGQuZGF0YS5sb2NhdGlvbi55ID0gZC54ICsgZHk7XG5cbiAgICAgICAgICAgICAgICBtYXhZID0gTWF0aC5tYXgobWF4WSwgZC5kYXRhLmxvY2F0aW9uLnkpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHByZXZUcmVlTWF4WSA9IG1heFkgKyBzZWxmLmNvbmZpZy5ub2RlU2l6ZStzZWxmLnRyZWVNYXJnaW47XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgLy8gdGhpcy50cmFuc2l0aW9uID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50cmVlRGVzaWduZXIucmVkcmF3KHRydWUpO1xuICAgICAgICAvLyB0aGlzLnRyYW5zaXRpb24gPSBmYWxzZTtcblxuICAgICAgICB0aGlzLl9maXJlT25BdXRvTGF5b3V0Q2hhbmdlZENhbGxiYWNrcygpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBmaXROb2Rlc0luUGxvdHRpbmdSZWdpb24obm9kZXMpe1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciB0b3BZID0gZDMubWluKG5vZGVzLCBuPT5uLmxvY2F0aW9uLnkpO1xuICAgICAgICB2YXIgbWluWSA9IHNlbGYuZ2V0Tm9kZU1pblkoKTtcbiAgICAgICAgdmFyIGR5ID0gdG9wWSAtIG1pblk7XG5cbiAgICAgICAgdmFyIG1pblggPSBkMy5taW4obm9kZXMsIG49Pm4ubG9jYXRpb24ueCk7XG4gICAgICAgIHZhciBkeCA9IG1pblggLSBzZWxmLmdldE5vZGVNaW5YKCk7XG5cbiAgICAgICAgaWYoZHk8MCB8fCAgZHg8MCl7XG4gICAgICAgICAgICBub2Rlcy5mb3JFYWNoKG49Pm4ubW92ZSgtZHgsIC1keSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW92ZU5vZGVzKG5vZGVzLCBkeCwgZHksIHBpdm90KXtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgbGltaXQgPSBzZWxmLmNvbmZpZy5saW1pdE5vZGVQb3NpdGlvbmluZztcbiAgICAgICAgaWYobGltaXQpe1xuICAgICAgICAgICAgaWYoZHg8MCl7XG4gICAgICAgICAgICAgICAgbm9kZXMuc29ydCgoYSxiKT0+YS5sb2NhdGlvbi54LWIubG9jYXRpb24ueCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBub2Rlcy5zb3J0KChhLGIpPT5iLmxvY2F0aW9uLngtYS5sb2NhdGlvbi54KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cbiAgICAgICAgdmFyIG1pblkgPSBkMy5taW4obm9kZXMsIGQ9PmQubG9jYXRpb24ueSk7XG4gICAgICAgIGlmKG1pblkgKyBkeSA8IHNlbGYuZ2V0Tm9kZU1pblkoKSl7XG4gICAgICAgICAgICBkeSA9IHNlbGYuZ2V0Tm9kZU1pblkoKSAtIG1pblk7XG4gICAgICAgIH1cblxuICAgICAgICBub2Rlcy5mb3JFYWNoKGQ9PntcbiAgICAgICAgICAgIGlmKGxpbWl0KXtcbiAgICAgICAgICAgICAgICBMYXlvdXQuYmFja3VwTm9kZUxvY2F0aW9uKGQpO1xuICAgICAgICAgICAgICAgIHZhciBtaW5YID0gc2VsZi5nZXROb2RlTWluWChkKTtcbiAgICAgICAgICAgICAgICB2YXIgbWF4WCA9IHNlbGYuZ2V0Tm9kZU1heFgoZCk7XG5cbiAgICAgICAgICAgICAgICBkLmxvY2F0aW9uLnggPSBNYXRoLm1pbihNYXRoLm1heChkLmxvY2F0aW9uLngrZHgsIG1pblgpLCBtYXhYKTtcbiAgICAgICAgICAgICAgICBkLmxvY2F0aW9uLnkgKz0gZHk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBkLmxvY2F0aW9uLnggKz1keDtcbiAgICAgICAgICAgICAgICBkLmxvY2F0aW9uLnkgKz0gZHk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG5cblxuICAgICAgICB2YXIgcmV2ZXJ0WCA9IHBpdm90ICYmIHNlbGYuY29uZmlnLmxpbWl0Tm9kZVBvc2l0aW9uaW5nICYmIChwaXZvdC5sb2NhdGlvbi54ID09PSBwaXZvdC4kbG9jYXRpb24ueCk7XG5cbiAgICAgICAgbm9kZXMuZm9yRWFjaChkPT57XG4gICAgICAgICAgICBpZihyZXZlcnRYKXtcbiAgICAgICAgICAgICAgICBkLmxvY2F0aW9uLnggPSBkLiRsb2NhdGlvbi54O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi50cmVlRGVzaWduZXIudXBkYXRlTm9kZVBvc2l0aW9uKGQpO1xuICAgICAgICB9KTtcblxuXG4gICAgfVxuXG4gICAgbW92ZVRleHRzKHRleHRzLCBkeCwgZHkpe1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIGxldCBsaW1pdCA9IHNlbGYuY29uZmlnLmxpbWl0VGV4dFBvc2l0aW9uaW5nO1xuICAgICAgICBpZihsaW1pdCl7XG4gICAgICAgICAgICBpZihkeDwwKXtcbiAgICAgICAgICAgICAgICB0ZXh0cy5zb3J0KChhLGIpPT5hLmxvY2F0aW9uLngtYi5sb2NhdGlvbi54KTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRleHRzLnNvcnQoKGEsYik9PmIubG9jYXRpb24ueC1hLmxvY2F0aW9uLngpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuXG4gICAgICAgIHRleHRzLmZvckVhY2goZD0+e1xuXG5cblxuXG4gICAgICAgICAgICBpZihsaW1pdCl7XG4gICAgICAgICAgICAgICAgbGV0IG1pblggPSBzZWxmLmdldFRleHRNaW5YKGQpO1xuICAgICAgICAgICAgICAgIGxldCBtYXhYID0gc2VsZi5nZXRUZXh0TWF4WChkKTtcbiAgICAgICAgICAgICAgICBsZXQgbWluWSA9IHNlbGYuZ2V0VGV4dE1pblkoZCk7XG5cblxuICAgICAgICAgICAgICAgIGQubG9jYXRpb24ueCA9IE1hdGgubWluKE1hdGgubWF4KGQubG9jYXRpb24ueCtkeCwgbWluWCksIG1heFgpO1xuICAgICAgICAgICAgICAgIGQubG9jYXRpb24ueSA9IE1hdGgubWF4KGQubG9jYXRpb24ueStkeSwgbWluWSk7XG5cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGQubG9jYXRpb24ubW92ZShkeCwgZHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi50cmVlRGVzaWduZXIudXBkYXRlVGV4dFBvc2l0aW9uKGQpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgc3RhdGljIGJhY2t1cE5vZGVMb2NhdGlvbihub2RlKSB7XG4gICAgICAgIG5vZGUuJGxvY2F0aW9uID0gbmV3IG1vZGVsLlBvaW50KG5vZGUubG9jYXRpb24pO1xuICAgIH1cblxuICAgIF9maXJlT25BdXRvTGF5b3V0Q2hhbmdlZENhbGxiYWNrcygpe1xuICAgICAgICB0aGlzLm9uQXV0b0xheW91dENoYW5nZWQuZm9yRWFjaChjPT5jKHRoaXMuY29uZmlnLnR5cGUpKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2V0SGFuZ2luZ1Bvc2l0aW9uKHNlbGVjdGlvbil7XG4gICAgICAgIC8vIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgIC8vICAgICBzZWxlY3Rpb24uZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAvLyAgICAgICAgIHZhciBoID0gIHRoaXMuZ2V0QkJveCgpLmhlaWdodDtcbiAgICAgICAgLy8gICAgICAgICBkMy5zZWxlY3QodGhpcykuYXR0cignZHknLCBoKTtcbiAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAvLyB9LDApO1xuXG4gICAgICAgIGlmKEFwcFV0aWxzLmlzSGlkZGVuKHNlbGVjdGlvbi5ub2RlKCkpKXsgLy8gc2V0dGluZyBoYW5naW5nIHBvc2l0aW9uIG9mIGhpZGRlbiBlbGVtZW50cyBmYWlscyBvbiBmaXJlZm94XG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0aW9uO1xuICAgICAgICB9XG5cblxuICAgICAgICBzZWxlY3Rpb24uZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIGggPSAgdGhpcy5nZXRCQm94KCkuaGVpZ2h0O1xuICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLmF0dHIoJ2R5JywgJzAuNzVlbScpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc2VsZWN0aW9uO1xuICAgIH1cblxufVxuXG5cbiIsImltcG9ydCB7QXBwVXRpbHN9IGZyb20gJy4vYXBwLXV0aWxzJ1xuaW1wb3J0ICogYXMgZDMgZnJvbSAnLi9kMydcbmltcG9ydCB7Q29udGV4dE1lbnV9IGZyb20gJy4vY29udGV4dC1tZW51L2NvbnRleHQtbWVudSdcblxuZXhwb3J0IGNsYXNzIE5vZGVEcmFnSGFuZGxlcntcblxuICAgIHRyZWVEZXNpZ25lcjtcbiAgICBkYXRhO1xuICAgIGNvbmZpZztcblxuICAgIGRyYWc7XG4gICAgc3RhdGVTbmFwc2hvdCA9IG51bGw7XG5cblxuICAgIGNvbnN0cnVjdG9yKHRyZWVEZXNpZ25lciwgZGF0YSl7XG4gICAgICAgIHRoaXMudHJlZURlc2lnbmVyID0gdHJlZURlc2lnbmVyO1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5kcmFnID0gZDMuZHJhZygpXG4gICAgICAgICAgICAuc3ViamVjdChmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgICAgaWYoZD09bnVsbCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAge1xuICAgICAgICAgICAgICAgICAgICAgICAgeDogZXZlbnQueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IGV2ZW50LnlcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHQgPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgeDogdC5hdHRyKFwieFwiKSArIEFwcFV0aWxzLmdldFRyYW5zbGF0aW9uKHQuYXR0cihcInRyYW5zZm9ybVwiKSlbMF0sXG4gICAgICAgICAgICAgICAgICAgIHk6IHQuYXR0cihcInlcIikgKyBBcHBVdGlscy5nZXRUcmFuc2xhdGlvbih0LmF0dHIoXCJ0cmFuc2Zvcm1cIikpWzFdXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oXCJzdGFydFwiLCBmdW5jdGlvbihkKXtcbiAgICAgICAgICAgICAgICBzZWxmLmRyYWdTdGFydGVkLmNhbGwodGhpcyxkLCBzZWxmKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbihcImRyYWdcIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICBzZWxmLm9uRHJhZy5jYWxsKHRoaXMsIGQsIHNlbGYpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbihcImVuZFwiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHNlbGYuZHJhZ0VuZGVkLmNhbGwodGhpcywgZCwgc2VsZik7XG4gICAgICAgICAgICB9KVxuICAgIH1cblxuXG4gICAgZHJhZ1N0YXJ0ZWQoZCxzZWxmKSB7XG4gICAgICAgIGlmKHNlbGYuaWdub3JlRHJhZyl7XG4gICAgICAgICAgICBzZWxmLmlnbm9yZURyYWc9ZmFsc2U7XG4gICAgICAgICAgICBzZWxmLmlnbm9yZWREcmFnPXRydWU7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5pZ25vcmVkRHJhZz1mYWxzZTtcbiAgICAgICAgc2VsZi5zdGF0ZVNuYXBzaG90ID0gc2VsZi5kYXRhLmNyZWF0ZVN0YXRlU25hcHNob3QoKTtcblxuICAgICAgICAvLyBzZWxmLnRyZWVEZXNpZ25lci5sYXlvdXQuZGlzYWJsZUF1dG9MYXlvdXQoKTtcbiAgICAgICAgQ29udGV4dE1lbnUuaGlkZSgpO1xuICAgICAgICB2YXIgbm9kZSA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgaWYoIW5vZGUuY2xhc3NlZChcInNlbGVjdGVkXCIpKXtcbiAgICAgICAgICAgIHNlbGYudHJlZURlc2lnbmVyLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICBzZWxmLnRyZWVEZXNpZ25lci5zZWxlY3ROb2RlKGQpO1xuICAgICAgICBub2RlLmNsYXNzZWQoXCJzZWxlY3RlZCBkcmFnZ2luZ1wiLCB0cnVlKTtcbiAgICAgICAgc2VsZi5zZWxlY3RlZE5vZGVzID0gc2VsZi50cmVlRGVzaWduZXIuZ2V0U2VsZWN0ZWROb2Rlcyh0cnVlKTtcbiAgICAgICAgc2VsZi5wcmV2RHJhZ0V2ZW50ID0gZDMuZXZlbnQ7XG4gICAgICAgIHNlbGYuZHJhZ0V2ZW50Q291bnQgPSAwO1xuICAgIH1cblxuICAgIG9uRHJhZyhkcmFnZ2VkTm9kZSwgc2VsZil7XG4gICAgICAgIGlmKHNlbGYuaWdub3JlZERyYWcpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoc2VsZi5kcmFnRXZlbnRDb3VudD09PTIgJiYgc2VsZi5zdGF0ZVNuYXBzaG90KXtcbiAgICAgICAgICAgIHNlbGYuZGF0YS5zYXZlU3RhdGVGcm9tU25hcHNob3Qoc2VsZi5zdGF0ZVNuYXBzaG90KTsgLy8gVE9ETyBzYXZlIG9ubHkgaWYgc29tZXRoaW5nIGhhcyByZWFsbHkgY2hhbmdlZFxuICAgICAgICAgICAgc2VsZi5zdGF0ZVNuYXBzaG90ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBzZWxmLmRyYWdFdmVudENvdW50Kys7XG4gICAgICAgIGlmKHNlbGYuc2VsZWN0ZWROb2Rlcy5sZW5ndGg+NSAmJiBzZWxmLmRyYWdFdmVudENvdW50JTIhPT0xKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBkeCA9IGQzLmV2ZW50LnggLSBzZWxmLnByZXZEcmFnRXZlbnQueDtcbiAgICAgICAgdmFyIGR5ID0gZDMuZXZlbnQueS0gc2VsZi5wcmV2RHJhZ0V2ZW50Lnk7XG4gICAgICAgIHNlbGYudHJlZURlc2lnbmVyLmxheW91dC5tb3ZlTm9kZXMoc2VsZi5zZWxlY3RlZE5vZGVzLCBkeCwgZHksIGRyYWdnZWROb2RlKTtcblxuXG4gICAgICAgIHNlbGYucHJldkRyYWdFdmVudCA9IGQzLmV2ZW50O1xuICAgICAgICBzZWxmLnRyZWVEZXNpZ25lci5yZWRyYXdFZGdlcygpO1xuICAgICAgICBzZWxmLnRyZWVEZXNpZ25lci51cGRhdGVQbG90dGluZ1JlZ2lvblNpemUoKTtcbiAgICB9XG5cbiAgICBkcmFnRW5kZWQoZHJhZ2dlZE5vZGUsIHNlbGYpe1xuICAgICAgICB2YXIgbm9kZSA9IGQzLnNlbGVjdCh0aGlzKS5jbGFzc2VkKFwiZHJhZ2dpbmdcIiwgZmFsc2UpO1xuICAgICAgICBpZihzZWxmLmlnbm9yZWREcmFnKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzZWxmLnRyZWVEZXNpZ25lci5sYXlvdXQudXBkYXRlKGRyYWdnZWROb2RlKVxuICAgIH1cblxuICAgIGNhbmNlbERyYWcoKXtcbiAgICAgICAgdGhpcy5pZ25vcmVEcmFnID0gdHJ1ZTtcbiAgICB9XG5cbn1cblxuXG4iLCJ2YXIgZXBzaWxvbiA9IDFlLTEyO1xudmFyIHBpID0gTWF0aC5QSTtcbnZhciBoYWxmUGkgPSBwaSAvIDI7XG52YXIgdGF1ID0gMiAqIHBpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgLypkcmF3OiBmdW5jdGlvbihjb250ZXh0LCBzaXplKSB7XG4gICAgICAgIHZhciByID0gTWF0aC5zcXJ0KHNpemUgLyBwaSk7XG4gICAgICAgIGNvbnRleHQubW92ZVRvKHIsIDApO1xuICAgICAgICBjb250ZXh0LmFyYygwLCAwLCByLCAwLCB0YXUpO1xuICAgIH0qL1xuICAgIGRyYXc6IGZ1bmN0aW9uKGNvbnRleHQsIHNpemUpIHtcblxuICAgICAgICB2YXIgciA9IE1hdGguc3FydChzaXplIC8gcGkpO1xuICAgICAgICB2YXIgZGlzdCA9MC41NTIyODQ3NDk4MzEgKiByO1xuXG4gICAgICAgIGNvbnRleHQubW92ZVRvKC1yLCAwKVxuICAgICAgICAvLyBjb250ZXh0LmxpbmVUbygyKnIsIDIqcilcbiAgICAgICAgLy8gY29udGV4dC5iZXppZXJDdXJ2ZVRvKC1yLCAtZGlzdCwgLWRpc3QsIC1yLCAwLC1yKTtcbiAgICAgICAgY29udGV4dC5iZXppZXJDdXJ2ZVRvKC1yLCAtZGlzdCwgLWRpc3QsIC1yLCAwLC1yKTtcblxuICAgICAgICBjb250ZXh0LmJlemllckN1cnZlVG8oZGlzdCwgLXIsIHIsIC1kaXN0LCByLDApO1xuXG4gICAgICAgIGNvbnRleHQuYmV6aWVyQ3VydmVUbyhyLCBkaXN0LCBkaXN0LCByLCAwLCByKTtcblxuICAgICAgICBjb250ZXh0LmJlemllckN1cnZlVG8oLWRpc3QsIHIsIC1yLCBkaXN0LCAtciwgMCk7XG4gICAgfVxufTtcbiIsInZhciBzcXJ0MyA9IE1hdGguc3FydCgzKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGRyYXc6IGZ1bmN0aW9uKGNvbnRleHQsIHNpemUpIHtcbiAgICAgICAgdmFyIHIgPSBNYXRoLnNxcnQoc2l6ZSAvIE1hdGguUEkpO1xuICAgICAgICBjb250ZXh0Lm1vdmVUbygtciwgMCk7XG4gICAgICAgIGNvbnRleHQubGluZVRvKDAuOSpyLCAtcik7XG4gICAgICAgIGNvbnRleHQubGluZVRvKDAuOSpyLCByKTtcbiAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICB9XG59O1xuIiwiaW1wb3J0IHtVdGlsc30gZnJvbSBcInNkLXV0aWxzXCI7XG5pbXBvcnQge2kxOG59IGZyb20gJy4vaTE4bi9pMThuJ1xuXG5leHBvcnQgY2xhc3MgVGVtcGxhdGVze1xuXG4gICAgc3RhdGljIGdyb3dsID0gcmVxdWlyZSgnLi90ZW1wbGF0ZXMvZ3Jvd2xfbWVzc2FnZS5odG1sJyk7XG5cbiAgICBzdGF0aWMgZ2V0KHRlbXBsYXRlTmFtZSwgdmFyaWFibGVzKXtcbiAgICAgICAgdmFyIGNvbXBpbGVkID0gVXRpbHMudGVtcGxhdGUoVGVtcGxhdGVzW3RlbXBsYXRlTmFtZV0seyAnaW1wb3J0cyc6IHsgJ2kxOG4nOiBpMThuLCAnVGVtcGxhdGVzJzogVGVtcGxhdGVzLCAnaW5jbHVkZSc6IGZ1bmN0aW9uKG4sIHYpIHtyZXR1cm4gVGVtcGxhdGVzLmdldChuLCB2KX0gfSB9KTtcbiAgICAgICAgaWYodmFyaWFibGVzKXtcbiAgICAgICAgICAgIHZhcmlhYmxlcy52YXJpYWJsZXMgPSB2YXJpYWJsZXM7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdmFyaWFibGVzID0ge3ZhcmlhYmxlczp7fX1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29tcGlsZWQodmFyaWFibGVzKVxuXG4gICAgfVxuXG4gICAgc3RhdGljIHN0eWxlUnVsZShzZWxlY3RvciwgcHJvcHMpe1xuICAgICAgICB2YXIgcyA9IHNlbGVjdG9yKyAneyc7XG4gICAgICAgIHByb3BzLmZvckVhY2gocD0+IHMrPVRlbXBsYXRlcy5zdHlsZVByb3AocFswXSwgcFsxXSkpO1xuICAgICAgICBzKz0nfSAnO1xuICAgICAgICByZXR1cm4gcztcbiAgICB9XG4gICAgc3RhdGljIHN0eWxlUHJvcChzdHlsZU5hbWUsIHZhcmlhYmxlTmFtZSl7XG4gICAgICAgIHJldHVybiAgc3R5bGVOYW1lKyc6IDwlPSAnK3ZhcmlhYmxlTmFtZSsnICU+OyAnXG4gICAgfVxuXG4gICAgc3RhdGljIHRyZWVEZXNpZ25lclNlbGVjdG9yID0gJ3N2Zy5zZC10cmVlLWRlc2lnbmVyJztcbiAgICBzdGF0aWMgbm9kZVNlbGVjdG9yKHR5cGUsIGNsYXp6KXtcbiAgICAgICAgdmFyIHMgPSBUZW1wbGF0ZXMudHJlZURlc2lnbmVyU2VsZWN0b3IrJyAubm9kZSc7XG4gICAgICAgIGlmKHR5cGUpe1xuICAgICAgICAgICAgcys9Jy4nK3R5cGUrJy1ub2RlJztcbiAgICAgICAgfVxuICAgICAgICBpZihjbGF6eil7XG4gICAgICAgICAgICBzKz0nLicrY2xheno7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHM7XG4gICAgfVxuICAgIHN0YXRpYyBlZGdlU2VsZWN0b3IoY2xhenope1xuICAgICAgICB2YXIgcyA9IFRlbXBsYXRlcy50cmVlRGVzaWduZXJTZWxlY3RvcisnIC5lZGdlJztcbiAgICAgICAgaWYoY2xhenope1xuICAgICAgICAgICAgcys9Jy4nK2NsYXp6O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzO1xuICAgIH1cblxuICAgIHN0YXRpYyB0cmVlRGVzaWduZXJTdHlsZXMgPVxuXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLnRyZWVEZXNpZ25lclNlbGVjdG9yLFtcbiAgICAgICAgICAgIFsnZm9udC1zaXplJywgJ2ZvbnRTaXplJ10sXG4gICAgICAgICAgICBbJ2ZvbnQtZmFtaWx5JywgJ2ZvbnRGYW1pbHknXSxcbiAgICAgICAgICAgIFsnZm9udC13ZWlnaHQnLCAnZm9udFdlaWdodCddLFxuICAgICAgICAgICAgWydmb250LXN0eWxlJywgJ2ZvbnRTdHlsZSddXG4gICAgICAgIF0pK1xuICAgICAgICAvLyAgIG5vZGVcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCkrJyBwYXRoJyxbXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnbm9kZS5maWxsJ10sXG4gICAgICAgICAgICBbJ3N0cm9rZS13aWR0aCcsICdub2RlLnN0cm9rZVdpZHRoJ11cbiAgICAgICAgXSkrXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLm5vZGVTZWxlY3RvcignZGVjaXNpb24nLCAnb3B0aW1hbCcpKycgcGF0aCwgJytUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCdjaGFuY2UnLCAnb3B0aW1hbCcpKycgcGF0aCwnICtUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCd0ZXJtaW5hbCcsICdvcHRpbWFsJykrJyBwYXRoJyxbXG4gICAgICAgICAgICBbJ3N0cm9rZScsICdub2RlLm9wdGltYWwuc3Ryb2tlJ10sXG4gICAgICAgICAgICBbJ3N0cm9rZS13aWR0aCcsICdub2RlLm9wdGltYWwuc3Ryb2tlV2lkdGgnXVxuICAgICAgICBdKStcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCkrJyAubGFiZWwnLFtcbiAgICAgICAgICAgIFsnZm9udC1zaXplJywgJ25vZGUubGFiZWwuZm9udFNpemUnXSxcbiAgICAgICAgICAgIFsnZmlsbCcsICdub2RlLmxhYmVsLmNvbG9yJ11cbiAgICAgICAgXSkrXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLm5vZGVTZWxlY3RvcigpKycgLnBheW9mZicsW1xuICAgICAgICAgICAgWydmb250LXNpemUnLCAnbm9kZS5wYXlvZmYuZm9udFNpemUnXSxcbiAgICAgICAgICAgIFsnZmlsbCcsICdub2RlLnBheW9mZi5jb2xvciddLFxuICAgICAgICBdKStcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCkrJyAucGF5b2ZmLm5lZ2F0aXZlJyxbXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnbm9kZS5wYXlvZmYubmVnYXRpdmVDb2xvciddLFxuICAgICAgICBdKStcblxuICAgICAgICAvLyAgICBkZWNpc2lvbiBub2RlXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLm5vZGVTZWxlY3RvcignZGVjaXNpb24nKSsnIHBhdGgnLFtcbiAgICAgICAgICAgIFsnZmlsbCcsICdub2RlLmRlY2lzaW9uLmZpbGwnXSxcbiAgICAgICAgICAgIFsnc3Ryb2tlJywgJ25vZGUuZGVjaXNpb24uc3Ryb2tlJ11cbiAgICAgICAgXSkrXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLm5vZGVTZWxlY3RvcignZGVjaXNpb24nLCAnc2VsZWN0ZWQnKSsnIHBhdGgnLFtcbiAgICAgICAgICAgIFsnZmlsbCcsICdub2RlLmRlY2lzaW9uLnNlbGVjdGVkLmZpbGwnXVxuICAgICAgICBdKStcblxuICAgICAgICAvLyAgICBjaGFuY2Ugbm9kZVxuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5ub2RlU2VsZWN0b3IoJ2NoYW5jZScpKycgcGF0aCcsW1xuICAgICAgICAgICAgWydmaWxsJywgJ25vZGUuY2hhbmNlLmZpbGwnXSxcbiAgICAgICAgICAgIFsnc3Ryb2tlJywgJ25vZGUuY2hhbmNlLnN0cm9rZSddXG4gICAgICAgIF0pK1xuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5ub2RlU2VsZWN0b3IoJ2NoYW5jZScsICdzZWxlY3RlZCcpKycgcGF0aCcsW1xuICAgICAgICAgICAgWydmaWxsJywgJ25vZGUuY2hhbmNlLnNlbGVjdGVkLmZpbGwnXVxuICAgICAgICBdKStcblxuICAgICAgICAvLyAgICB0ZXJtaW5hbCBub2RlXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLm5vZGVTZWxlY3RvcigndGVybWluYWwnKSsnIHBhdGgnLFtcbiAgICAgICAgICAgIFsnZmlsbCcsICdub2RlLnRlcm1pbmFsLmZpbGwnXSxcbiAgICAgICAgICAgIFsnc3Ryb2tlJywgJ25vZGUudGVybWluYWwuc3Ryb2tlJ11cbiAgICAgICAgXSkrXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLm5vZGVTZWxlY3RvcigndGVybWluYWwnLCAnc2VsZWN0ZWQnKSsnIHBhdGgnLFtcbiAgICAgICAgICAgIFsnZmlsbCcsICdub2RlLnRlcm1pbmFsLnNlbGVjdGVkLmZpbGwnXVxuICAgICAgICBdKStcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCd0ZXJtaW5hbCcpKycgLmFnZ3JlZ2F0ZWQtcGF5b2ZmJyxbXG4gICAgICAgICAgICBbJ2ZvbnQtc2l6ZScsICdub2RlLnRlcm1pbmFsLnBheW9mZi5mb250U2l6ZSddLFxuICAgICAgICAgICAgWydmaWxsJywgJ25vZGUudGVybWluYWwucGF5b2ZmLmNvbG9yJ10sXG4gICAgICAgIF0pK1xuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5ub2RlU2VsZWN0b3IoJ3Rlcm1pbmFsJykrJyAuYWdncmVnYXRlZC1wYXlvZmYubmVnYXRpdmUnLFtcbiAgICAgICAgICAgIFsnZmlsbCcsICdub2RlLnRlcm1pbmFsLnBheW9mZi5uZWdhdGl2ZUNvbG9yJ10sXG4gICAgICAgIF0pK1xuXG5cbiAgICAgICAgLy9wcm9iYWJpbGl0eVxuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy50cmVlRGVzaWduZXJTZWxlY3RvcisnIC5ub2RlIC5wcm9iYWJpbGl0eS10by1lbnRlciwgJytUZW1wbGF0ZXMudHJlZURlc2lnbmVyU2VsZWN0b3IrJyAuZWRnZSAucHJvYmFiaWxpdHknLFtcbiAgICAgICAgICAgIFsnZm9udC1zaXplJywgJ3Byb2JhYmlsaXR5LmZvbnRTaXplJ10sXG4gICAgICAgICAgICBbJ2ZpbGwnLCAncHJvYmFiaWxpdHkuY29sb3InXVxuICAgICAgICBdKStcblxuICAgICAgICAvL2VkZ2VcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMuZWRnZVNlbGVjdG9yKCkrJyBwYXRoJyxbXG4gICAgICAgICAgICBbJ3N0cm9rZScsICdlZGdlLnN0cm9rZSddLFxuICAgICAgICAgICAgWydzdHJva2Utd2lkdGgnLCAnZWRnZS5zdHJva2VXaWR0aCddXG4gICAgICAgIF0pK1xuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy50cmVlRGVzaWduZXJTZWxlY3RvcisnIG1hcmtlciNhcnJvdyBwYXRoJyxbXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnZWRnZS5zdHJva2UnXSxcbiAgICAgICAgXSkrXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLmVkZ2VTZWxlY3Rvcignb3B0aW1hbCcpKycgcGF0aCcsW1xuICAgICAgICAgICAgWydzdHJva2UnLCAnZWRnZS5vcHRpbWFsLnN0cm9rZSddLFxuICAgICAgICAgICAgWydzdHJva2Utd2lkdGgnLCAnZWRnZS5vcHRpbWFsLnN0cm9rZVdpZHRoJ11cbiAgICAgICAgXSkrXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLnRyZWVEZXNpZ25lclNlbGVjdG9yKycgbWFya2VyI2Fycm93LW9wdGltYWwgcGF0aCcsW1xuICAgICAgICAgICAgWydmaWxsJywgJ2VkZ2Uub3B0aW1hbC5zdHJva2UnXSxcbiAgICAgICAgXSkrXG5cbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMuZWRnZVNlbGVjdG9yKCdzZWxlY3RlZCcpKycgcGF0aCcsW1xuICAgICAgICAgICAgWydzdHJva2UnLCAnZWRnZS5zZWxlY3RlZC5zdHJva2UnXSxcbiAgICAgICAgICAgIFsnc3Ryb2tlLXdpZHRoJywgJ2VkZ2Uuc2VsZWN0ZWQuc3Ryb2tlV2lkdGgnXVxuICAgICAgICBdKStcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMudHJlZURlc2lnbmVyU2VsZWN0b3IrJyBtYXJrZXIjYXJyb3ctc2VsZWN0ZWQgcGF0aCcsW1xuICAgICAgICAgICAgWydmaWxsJywgJ2VkZ2Uuc2VsZWN0ZWQuc3Ryb2tlJ10sXG4gICAgICAgIF0pK1xuXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLmVkZ2VTZWxlY3RvcigpKycgLmxhYmVsJyxbXG4gICAgICAgICAgICBbJ2ZvbnQtc2l6ZScsICdlZGdlLmxhYmVsLmZvbnRTaXplJ10sXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnZWRnZS5sYWJlbC5jb2xvciddXG4gICAgICAgIF0pK1xuXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLmVkZ2VTZWxlY3RvcigpKycgLnBheW9mZicsW1xuICAgICAgICAgICAgWydmb250LXNpemUnLCAnZWRnZS5wYXlvZmYuZm9udFNpemUnXSxcbiAgICAgICAgICAgIFsnZmlsbCcsICdlZGdlLnBheW9mZi5jb2xvciddLFxuICAgICAgICBdKStcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMuZWRnZVNlbGVjdG9yKCkrJyAucGF5b2ZmLm5lZ2F0aXZlJyxbXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnZWRnZS5wYXlvZmYubmVnYXRpdmVDb2xvciddLFxuICAgICAgICBdKStcblxuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy50cmVlRGVzaWduZXJTZWxlY3RvcisnIC5zZC10aXRsZS1jb250YWluZXIgdGV4dC5zZC10aXRsZScsW1xuICAgICAgICAgICAgWydmb250LXNpemUnLCAndGl0bGUuZm9udFNpemUnXSxcbiAgICAgICAgICAgIFsnZm9udC13ZWlnaHQnLCAndGl0bGUuZm9udFdlaWdodCddLFxuICAgICAgICAgICAgWydmb250LXN0eWxlJywgJ3RpdGxlLmZvbnRTdHlsZSddLFxuICAgICAgICAgICAgWydmaWxsJywgJ3RpdGxlLmNvbG9yJ11cbiAgICAgICAgXSkgK1xuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy50cmVlRGVzaWduZXJTZWxlY3RvcisnIC5zZC10aXRsZS1jb250YWluZXIgdGV4dC5zZC1kZXNjcmlwdGlvbicsW1xuICAgICAgICAgICAgWydmb250LXNpemUnLCAnZGVzY3JpcHRpb24uZm9udFNpemUnXSxcbiAgICAgICAgICAgIFsnZm9udC13ZWlnaHQnLCAnZGVzY3JpcHRpb24uZm9udFdlaWdodCddLFxuICAgICAgICAgICAgWydmb250LXN0eWxlJywgJ2Rlc2NyaXB0aW9uLmZvbnRTdHlsZSddLFxuICAgICAgICAgICAgWydmaWxsJywgJ2Rlc2NyaXB0aW9uLmNvbG9yJ11cbiAgICAgICAgXSlcbn1cblxuXG5cblxuIiwibW9kdWxlLmV4cG9ydHMgPSBcIm1vZHVsZS5leHBvcnRzID0gXFxcIjxkaXYgY2xhc3M9XFxcXFxcXCJzZC1ncm93bC1tZXNzYWdlIDwlPXR5cGUlPlxcXFxcXFwiPlxcXFxuICAgIDxkaXYgY2xhc3M9XFxcXFxcXCJzZC1ncm93bC1tZXNzYWdlLXRleHRcXFxcXFxcIj5cXFxcbiAgICAgICAgPCU9IG1lc3NhZ2UgJT5cXFxcbiAgICA8L2Rpdj5cXFxcbjwvZGl2PlxcXFxuXFxcIjtcXG5cIjtcbiIsImltcG9ydCB7QXBwVXRpbHN9IGZyb20gJy4vYXBwLXV0aWxzJ1xuaW1wb3J0ICogYXMgZDMgZnJvbSAnLi9kMydcbmltcG9ydCB7Q29udGV4dE1lbnV9IGZyb20gJy4vY29udGV4dC1tZW51L2NvbnRleHQtbWVudSdcblxuZXhwb3J0IGNsYXNzIFRleHREcmFnSGFuZGxlcntcblxuICAgIHRyZWVEZXNpZ25lcjtcbiAgICBkYXRhO1xuICAgIGNvbmZpZztcblxuICAgIGRyYWc7XG5cblxuICAgIGNvbnN0cnVjdG9yKHRyZWVEZXNpZ25lciwgZGF0YSl7XG4gICAgICAgIHRoaXMudHJlZURlc2lnbmVyID0gdHJlZURlc2lnbmVyO1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5kcmFnID0gZDMuZHJhZygpXG4gICAgICAgICAgICAuc3ViamVjdChmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgICAgaWYoZD09bnVsbCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAge1xuICAgICAgICAgICAgICAgICAgICAgICAgeDogZXZlbnQueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IGV2ZW50LnlcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHQgPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgeDogdC5hdHRyKFwieFwiKSArIEFwcFV0aWxzLmdldFRyYW5zbGF0aW9uKHQuYXR0cihcInRyYW5zZm9ybVwiKSlbMF0sXG4gICAgICAgICAgICAgICAgICAgIHk6IHQuYXR0cihcInlcIikgKyBBcHBVdGlscy5nZXRUcmFuc2xhdGlvbih0LmF0dHIoXCJ0cmFuc2Zvcm1cIikpWzFdXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oXCJzdGFydFwiLCBmdW5jdGlvbihkKXtcbiAgICAgICAgICAgICAgICBzZWxmLmRyYWdTdGFydGVkLmNhbGwodGhpcyxkLCBzZWxmKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbihcImRyYWdcIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICBzZWxmLm9uRHJhZy5jYWxsKHRoaXMsIGQsIHNlbGYpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbihcImVuZFwiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHNlbGYuZHJhZ0VuZGVkLmNhbGwodGhpcywgZCwgc2VsZik7XG4gICAgICAgICAgICB9KVxuICAgIH1cblxuXG4gICAgZHJhZ1N0YXJ0ZWQoZCxzZWxmKSB7XG4gICAgICAgIC8vIHNlbGYudHJlZURlc2lnbmVyLmxheW91dC5kaXNhYmxlQXV0b0xheW91dCgpO1xuICAgICAgICBDb250ZXh0TWVudS5oaWRlKCk7XG4gICAgICAgIHZhciB0ZXh0ID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICBpZighdGV4dC5jbGFzc2VkKFwic2VsZWN0ZWRcIikpe1xuICAgICAgICAgICAgc2VsZi50cmVlRGVzaWduZXIuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNlbGYudHJlZURlc2lnbmVyLnNlbGVjdFRleHQoZCk7XG4gICAgICAgIHRleHQuY2xhc3NlZChcInNlbGVjdGVkIGRyYWdnaW5nXCIsIHRydWUpO1xuICAgICAgICBzZWxmLnNlbGVjdGVkTm9kZXMgPSBzZWxmLnRyZWVEZXNpZ25lci5nZXRTZWxlY3RlZE5vZGVzKCk7XG4gICAgICAgIHNlbGYucHJldkRyYWdFdmVudCA9IGQzLmV2ZW50O1xuICAgICAgICBzZWxmLmRyYWdFdmVudENvdW50ID0gMDtcbiAgICB9XG5cbiAgICBvbkRyYWcoZHJhZ2dlZFRleHQsIHNlbGYpe1xuICAgICAgICBpZihzZWxmLmRyYWdFdmVudENvdW50PT0yKXtcbiAgICAgICAgICAgIHNlbGYuZGF0YS5zYXZlU3RhdGUoKTtcbiAgICAgICAgfVxuICAgICAgICBzZWxmLmRyYWdFdmVudENvdW50Kys7XG5cbiAgICAgICAgdmFyIGR4ID0gZDMuZXZlbnQueCAtIHNlbGYucHJldkRyYWdFdmVudC54O1xuICAgICAgICB2YXIgZHkgPSBkMy5ldmVudC55LSBzZWxmLnByZXZEcmFnRXZlbnQueTtcblxuICAgICAgICBzZWxmLnRyZWVEZXNpZ25lci5sYXlvdXQubW92ZVRleHRzKFtkcmFnZ2VkVGV4dF0sIGR4LCBkeSk7XG5cbiAgICAgICAgc2VsZi5wcmV2RHJhZ0V2ZW50ID0gZDMuZXZlbnQ7XG4gICAgICAgIHNlbGYudHJlZURlc2lnbmVyLnVwZGF0ZVBsb3R0aW5nUmVnaW9uU2l6ZSgpO1xuICAgIH1cblxuICAgIGRyYWdFbmRlZChkcmFnZ2VkTm9kZSwgc2VsZil7XG4gICAgICAgICBkMy5zZWxlY3QodGhpcykuY2xhc3NlZChcImRyYWdnaW5nXCIsIGZhbHNlKTtcbiAgICB9XG5cbn1cblxuXG4iLCJpbXBvcnQgKiBhcyBkMyBmcm9tICcuL2QzJ1xuaW1wb3J0IHtVdGlsc30gZnJvbSAnc2QtdXRpbHMnXG5cbmV4cG9ydCBjbGFzcyBUb29sdGlwIHtcbiAgICBzdGF0aWMgZ2V0Q29udGFpbmVyKCl7XG4gICAgICAgIHJldHVybiBkMy5zZWxlY3QoXCJib2R5XCIpLnNlbGVjdE9yQXBwZW5kKCdkaXYuc2QtdG9vbHRpcCcpO1xuICAgIH1cblxuICAgIHN0YXRpYyBzaG93KGh0bWwsIHhPZmZzZXQgPSA1LCB5T2Zmc2V0ID0gMjgsIGV2ZW50LCBkdXJhdGlvbj1udWxsKSB7XG4gICAgICAgIHZhciBjb250YWluZXIgPSBUb29sdGlwLmdldENvbnRhaW5lcigpXG4gICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIDApO1xuICAgICAgICBjb250YWluZXIudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24oMjAwKVxuICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCAuOTgpO1xuICAgICAgICBjb250YWluZXIuaHRtbChodG1sKTtcbiAgICAgICAgVG9vbHRpcC51cGRhdGVQb3NpdGlvbih4T2Zmc2V0LCB5T2Zmc2V0LCBldmVudCk7XG4gICAgICAgIGlmKGR1cmF0aW9uKXtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBUb29sdGlwLmhpZGUoKTtcbiAgICAgICAgICAgIH0sIGR1cmF0aW9uKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIHVwZGF0ZVBvc2l0aW9uKHhPZmZzZXQgPSA1LCB5T2Zmc2V0ID0gMjgsIGV2ZW50KSB7XG4gICAgICAgIGV2ZW50ID0gZXZlbnQgfHwgZDMuZXZlbnQ7XG4gICAgICAgIFRvb2x0aXAuZ2V0Q29udGFpbmVyKClcbiAgICAgICAgICAgIC5zdHlsZShcImxlZnRcIiwgKGV2ZW50LnBhZ2VYICsgeE9mZnNldCkgKyBcInB4XCIpXG4gICAgICAgICAgICAuc3R5bGUoXCJ0b3BcIiwgKGV2ZW50LnBhZ2VZIC0geU9mZnNldCkgKyBcInB4XCIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBoaWRlKGR1cmF0aW9uID0gNTAwKSB7XG4gICAgICAgIHZhciB0ID0gVG9vbHRpcC5nZXRDb250YWluZXIoKTtcbiAgICAgICAgaWYoZHVyYXRpb24pe1xuICAgICAgICAgICAgdCA9IHQudHJhbnNpdGlvbigpLmR1cmF0aW9uKGR1cmF0aW9uKVxuICAgICAgICB9XG4gICAgICAgIHQuc3R5bGUoXCJvcGFjaXR5XCIsIDApO1xuICAgIH1cblxuICAgIHN0YXRpYyBhdHRhY2godGFyZ2V0LCBodG1sT3JGbiwgeE9mZnNldCwgeU9mZnNldCkge1xuICAgICAgICB0YXJnZXQub24oJ21vdXNlb3ZlcicsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICB2YXIgaHRtbCA9IG51bGw7XG4gICAgICAgICAgICBpZiAoVXRpbHMuaXNGdW5jdGlvbihodG1sT3JGbikpIHtcbiAgICAgICAgICAgICAgICBodG1sID0gaHRtbE9yRm4oZCwgaSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGh0bWwgPSBodG1sT3JGbjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGh0bWwgIT09IG51bGwgJiYgaHRtbCAhPT0gdW5kZWZpbmVkICYmIGh0bWwgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgVG9vbHRpcC5zaG93KGh0bWwsIHhPZmZzZXQsIHlPZmZzZXQpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgVG9vbHRpcC5oaWRlKDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pLm9uKCdtb3VzZW1vdmUnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgVG9vbHRpcC51cGRhdGVQb3NpdGlvbih4T2Zmc2V0LCB5T2Zmc2V0KTtcbiAgICAgICAgfSkub24oXCJtb3VzZW91dFwiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgVG9vbHRpcC5oaWRlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCAqIGFzIGQzIGZyb20gXCIuL2QzXCI7XG5pbXBvcnQge1V0aWxzfSBmcm9tIFwic2QtdXRpbHNcIjtcbmltcG9ydCB7QXBwVXRpbHN9IGZyb20gXCIuL2FwcC11dGlsc1wiO1xuaW1wb3J0IHtkb21haW4gYXMgbW9kZWx9IGZyb20gXCJzZC1tb2RlbFwiO1xuaW1wb3J0IHtDb250ZXh0TWVudX0gZnJvbSBcIi4vY29udGV4dC1tZW51L2NvbnRleHQtbWVudVwiO1xuaW1wb3J0IHtNYWluQ29udGV4dE1lbnV9IGZyb20gXCIuL2NvbnRleHQtbWVudS9tYWluLWNvbnRleHQtbWVudVwiO1xuaW1wb3J0IHtOb2RlQ29udGV4dE1lbnV9IGZyb20gXCIuL2NvbnRleHQtbWVudS9ub2RlLWNvbnRleHQtbWVudVwiO1xuaW1wb3J0IHtMYXlvdXR9IGZyb20gXCIuL2xheW91dFwiO1xuaW1wb3J0IHtOb2RlRHJhZ0hhbmRsZXJ9IGZyb20gXCIuL25vZGUtZHJhZy1oYW5kbGVyXCI7XG5pbXBvcnQge1Rvb2x0aXB9IGZyb20gXCIuL3Rvb2x0aXBcIjtcbmltcG9ydCB7VGVtcGxhdGVzfSBmcm9tIFwiLi90ZW1wbGF0ZXNcIjtcbmltcG9ydCB7VGV4dERyYWdIYW5kbGVyfSBmcm9tIFwiLi90ZXh0LWRyYWctaGFuZGxlclwiO1xuaW1wb3J0IHtUZXh0Q29udGV4dE1lbnV9IGZyb20gXCIuL2NvbnRleHQtbWVudS90ZXh0LWNvbnRleHQtbWVudVwiO1xuaW1wb3J0IHtFZGdlQ29udGV4dE1lbnV9IGZyb20gXCIuL2NvbnRleHQtbWVudS9lZGdlLWNvbnRleHQtbWVudVwiO1xuaW1wb3J0ICogYXMgSGFtbWVyIGZyb20gXCJoYW1tZXJqc1wiO1xuaW1wb3J0IHtpMThufSBmcm9tIFwiLi9pMThuL2kxOG5cIjtcblxuXG5leHBvcnQgY2xhc3MgVHJlZURlc2lnbmVyQ29uZmlnIHtcbiAgICB3aWR0aCA9IHVuZGVmaW5lZDtcbiAgICBoZWlnaHQgPSB1bmRlZmluZWQ7XG4gICAgbWFyZ2luID0ge1xuICAgICAgICBsZWZ0OiAyNSxcbiAgICAgICAgcmlnaHQ6IDI1LFxuICAgICAgICB0b3A6IDI1LFxuICAgICAgICBib3R0b206IDI1XG4gICAgfTtcbiAgICBzY2FsZSA9IDE7XG4gICAgbG5nID0gJ2VuJztcbiAgICBsYXlvdXQ9IHtcbiAgICAgICAgdHlwZTogJ3RyZWUnLFxuICAgICAgICBub2RlU2l6ZTogNDAsXG4gICAgICAgIGxpbWl0Tm9kZVBvc2l0aW9uaW5nOiB0cnVlLFxuICAgICAgICBsaW1pdFRleHRQb3NpdGlvbmluZzogdHJ1ZSxcbiAgICAgICAgZ3JpZEhlaWdodDogNzUsXG4gICAgICAgIGdyaWRXaWR0aDogMTUwLFxuICAgICAgICBlZGdlU2xhbnRXaWR0aE1heDogMjBcbiAgICB9O1xuICAgIGZvbnRGYW1pbHkgPSAnc2Fucy1zZXJpZic7XG4gICAgZm9udFNpemUgPSAnMTJweCc7XG4gICAgZm9udFdlaWdodCA9ICdub3JtYWwnO1xuICAgIGZvbnRTdHlsZSA9ICdub3JtYWwnO1xuICAgIG5vZGUgPSB7XG4gICAgICAgIHN0cm9rZVdpZHRoOiAnMXB4JyxcbiAgICAgICAgb3B0aW1hbDoge1xuICAgICAgICAgICAgc3Ryb2tlOiAnIzAwNmYwMCcsXG4gICAgICAgICAgICBzdHJva2VXaWR0aDogJzEuNXB4JyxcbiAgICAgICAgfSxcbiAgICAgICAgbGFiZWw6IHtcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMWVtJyxcbiAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgIH0sXG4gICAgICAgIHBheW9mZjoge1xuICAgICAgICAgICAgZm9udFNpemU6ICcxZW0nLFxuICAgICAgICAgICAgY29sb3I6ICdibGFjaycsXG4gICAgICAgICAgICBuZWdhdGl2ZUNvbG9yOiAnI2I2MDAwMCdcbiAgICAgICAgfSxcbiAgICAgICAgZGVjaXNpb246IHtcbiAgICAgICAgICAgIGZpbGw6ICcjZmY3Nzc3JyxcbiAgICAgICAgICAgIHN0cm9rZTogJyM2NjAwMDAnLFxuXG4gICAgICAgICAgICBzZWxlY3RlZDoge1xuICAgICAgICAgICAgICAgIGZpbGw6ICcjYWEzMzMzJyxcbiAgICAgICAgICAgICAgICAvLyBzdHJva2U6ICcjNjY2NjAwJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjaGFuY2U6IHtcbiAgICAgICAgICAgIGZpbGw6ICcjZmZmZjQ0JyxcbiAgICAgICAgICAgIHN0cm9rZTogJyM2NjY2MDAnLFxuXG4gICAgICAgICAgICBzZWxlY3RlZDoge1xuICAgICAgICAgICAgICAgIGZpbGw6ICcjYWFhYTAwJyxcbiAgICAgICAgICAgICAgICAvLyBzdHJva2U6ICcjNjY2NjAwJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB0ZXJtaW5hbDp7XG4gICAgICAgICAgICBmaWxsOiAnIzQ0ZmY0NCcsXG4gICAgICAgICAgICBzdHJva2U6ICdibGFjaycsXG4gICAgICAgICAgICBzZWxlY3RlZDoge1xuICAgICAgICAgICAgICAgIGZpbGw6ICcjMDBhYTAwJyxcbiAgICAgICAgICAgICAgICAvLyBzdHJva2U6ICdibGFjaydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwYXlvZmY6IHtcbiAgICAgICAgICAgICAgICBmb250U2l6ZTogJzFlbScsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaycsXG4gICAgICAgICAgICAgICAgbmVnYXRpdmVDb2xvcjogJyNiNjAwMDAnXG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgfTtcbiAgICBlZGdlPXtcbiAgICAgICAgc3Ryb2tlOiAnIzQyNDI0MicsXG4gICAgICAgIHN0cm9rZVdpZHRoOiAnMS41JyxcbiAgICAgICAgb3B0aW1hbDp7XG4gICAgICAgICAgICBzdHJva2U6ICcjMDA2ZjAwJyxcbiAgICAgICAgICAgIHN0cm9rZVdpZHRoOiAnMi40JyxcbiAgICAgICAgfSxcbiAgICAgICAgc2VsZWN0ZWQ6e1xuICAgICAgICAgICAgc3Ryb2tlOiAnIzA0NWFkMScsXG4gICAgICAgICAgICBzdHJva2VXaWR0aDogJzMuNScsXG4gICAgICAgIH0sXG4gICAgICAgIGxhYmVsOiB7XG4gICAgICAgICAgICBmb250U2l6ZTogJzFlbScsXG4gICAgICAgICAgICBjb2xvcjogJ2JhY2snXG4gICAgICAgIH0sXG4gICAgICAgIHBheW9mZjp7XG4gICAgICAgICAgICBmb250U2l6ZTogJzFlbScsXG4gICAgICAgICAgICBjb2xvcjogJ2JsYWNrJyxcbiAgICAgICAgICAgIG5lZ2F0aXZlQ29sb3I6ICcjYjYwMDAwJ1xuICAgICAgICB9XG5cbiAgICB9O1xuICAgIHByb2JhYmlsaXR5ID0ge1xuICAgICAgICBmb250U2l6ZTogJzFlbScsXG4gICAgICAgIGNvbG9yOiAnIzAwMDBkNydcbiAgICB9O1xuICAgIHRpdGxlID0ge1xuICAgICAgICBmb250U2l6ZTogJzE2cHgnLFxuICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXG4gICAgICAgIGZvbnRTdHlsZTogJ25vcm1hbCcsXG4gICAgICAgIGNvbG9yOiAnIzAwMDAwMCcsXG4gICAgICAgIG1hcmdpbjp7XG4gICAgICAgICAgICB0b3A6IDE1LFxuICAgICAgICAgICAgYm90dG9tOiAxMFxuICAgICAgICB9XG4gICAgfTtcbiAgICBkZXNjcmlwdGlvbiA9IHtcbiAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgZm9udFNpemU6ICcxMnB4JyxcbiAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxuICAgICAgICBmb250U3R5bGU6ICdub3JtYWwnLFxuICAgICAgICBjb2xvcjogJyMwMDAwMDAnLFxuICAgICAgICBtYXJnaW46e1xuICAgICAgICAgICAgdG9wOiA1LFxuICAgICAgICAgICAgYm90dG9tOiAxMFxuICAgICAgICB9XG4gICAgfTtcblxuICAgIHJlYWRPbmx5PSBmYWxzZTtcbiAgICBkaXNhYmxlQW5pbWF0aW9ucz1mYWxzZTtcbiAgICBmb3JjZUZ1bGxFZGdlUmVkcmF3PWZhbHNlO1xuICAgIGhpZGVMYWJlbHM9ZmFsc2U7XG4gICAgaGlkZVBheW9mZnM9ZmFsc2U7XG4gICAgaGlkZVByb2JhYmlsaXRpZXM9ZmFsc2U7XG4gICAgcmF3PWZhbHNlO1xuXG5cbiAgICBwYXlvZmZOdW1iZXJGb3JtYXR0ZXIgPSAodiwgaSk9PiB2O1xuICAgIHByb2JhYmlsaXR5TnVtYmVyRm9ybWF0dGVyICA9ICh2KT0+IHY7XG5cbiAgICBvbk5vZGVTZWxlY3RlZCA9IChub2RlKSA9PiB7fTtcbiAgICBvbkVkZ2VTZWxlY3RlZCA9IChlZGdlKSA9PiB7fTtcbiAgICBvblRleHRTZWxlY3RlZCA9ICh0ZXh0KSA9PiB7fTtcbiAgICBvblNlbGVjdGlvbkNsZWFyZWQgPSAoKSA9PiB7fTtcblxuICAgIG9wZXJhdGlvbnNGb3JPYmplY3QgPSAobykgPT4gW107XG4gICAgcGVyZm9ybU9wZXJhdGlvbiA9IChvYmplY3QsIG9wZXJhdGlvbikgPT4gUHJvbWlzZS5yZXNvbHZlKCk7XG5cbiAgICBwYXlvZmZOYW1lcyA9IFtudWxsLCBudWxsXTtcbiAgICBtYXhQYXlvZmZzVG9EaXNwbGF5ID0gMTtcblxuICAgIGNvbnN0cnVjdG9yKGN1c3RvbSkge1xuICAgICAgICBpZiAoY3VzdG9tKSB7XG4gICAgICAgICAgICBVdGlscy5kZWVwRXh0ZW5kKHRoaXMsIGN1c3RvbSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIFRyZWVEZXNpZ25lciB7XG5cbiAgICBjb25maWc7XG4gICAgY29udGFpbmVyO1xuICAgIGRhdGE7IC8vZGF0YSBtb2RlbCBtYW5hZ2VyXG4gICAgc3ZnO1xuXG4gICAgY29uc3RydWN0b3IoY29udGFpbmVyLCBkYXRhTW9kZWwsIGNvbmZpZyl7XG4gICAgICAgIHRoaXMuc2V0Q29uZmlnKGNvbmZpZyk7XG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGFNb2RlbDtcbiAgICAgICAgdGhpcy5pbml0Q29udGFpbmVyKGNvbnRhaW5lcik7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cblxuICAgIHNldENvbmZpZyhjb25maWcpIHtcbiAgICAgICAgdGhpcy5jb25maWcgPSBuZXcgVHJlZURlc2lnbmVyQ29uZmlnKGNvbmZpZyk7XG4gICAgICAgIGlmKHRoaXMubGF5b3V0KXtcbiAgICAgICAgICAgIHRoaXMubGF5b3V0LmNvbmZpZz10aGlzLmNvbmZpZy5sYXlvdXQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGRhdGVDdXN0b21TdHlsZXMoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgaW5pdCgpe1xuXG4gICAgICAgIHRoaXMuaW5pdFN2ZygpO1xuICAgICAgICB0aGlzLmluaXRMYXlvdXQoKTtcbiAgICAgICAgdGhpcy5pbml0STE4bigpO1xuICAgICAgICB0aGlzLmluaXRCcnVzaCgpO1xuICAgICAgICB0aGlzLmluaXRFZGdlTWFya2VycygpO1xuXG4gICAgICAgIHRoaXMudXBkYXRlQ3VzdG9tU3R5bGVzKCk7XG4gICAgICAgIGlmKCF0aGlzLmNvbmZpZy5yZWFkT25seSl7XG4gICAgICAgICAgICB0aGlzLmluaXRNYWluQ29udGV4dE1lbnUoKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdE5vZGVDb250ZXh0TWVudSgpO1xuICAgICAgICAgICAgdGhpcy5pbml0RWRnZUNvbnRleHRNZW51KCk7XG4gICAgICAgICAgICB0aGlzLmluaXROb2RlRHJhZ0hhbmRsZXIoKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdFRleHREcmFnSGFuZGxlcigpO1xuICAgICAgICAgICAgdGhpcy5pbml0VGV4dENvbnRleHRNZW51KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZWRyYXcoKTtcbiAgICB9XG5cbiAgICBpbml0STE4bigpIHtcbiAgICAgICAgaTE4bi5pbml0KHRoaXMuY29uZmlnLmxuZyk7XG4gICAgfVxuXG5cbiAgICB1cGRhdGVDdXN0b21TdHlsZXMoKXtcbiAgICAgICAgZDMuc2VsZWN0KCdoZWFkJykuc2VsZWN0T3JBcHBlbmQoJ3N0eWxlI3NkLXRyZWUtZGVzaWduZXItc3R5bGUnKS5odG1sKFRlbXBsYXRlcy5nZXQoJ3RyZWVEZXNpZ25lclN0eWxlcycsIHRoaXMuY29uZmlnKSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGluaXRMYXlvdXQoKXtcbiAgICAgICAgdGhpcy5sYXlvdXQgPSBuZXcgTGF5b3V0KHRoaXMsIHRoaXMuZGF0YSwgdGhpcy5jb25maWcubGF5b3V0KTtcbiAgICB9XG5cbiAgICBpbml0Tm9kZURyYWdIYW5kbGVyKCl7XG4gICAgICAgIHRoaXMubm9kZURyYWdIYW5kbGVyID0gbmV3IE5vZGVEcmFnSGFuZGxlcih0aGlzLCB0aGlzLmRhdGEpO1xuICAgIH1cblxuICAgIGluaXRUZXh0RHJhZ0hhbmRsZXIoKXtcbiAgICAgICAgdGhpcy50ZXh0RHJhZ0hhbmRsZXIgPSBuZXcgVGV4dERyYWdIYW5kbGVyKHRoaXMsIHRoaXMuZGF0YSk7XG4gICAgfVxuXG4gICAgcmVkcmF3KHdpdGhUcmFuc2l0aW9ucz1mYWxzZSl7XG5cbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB3aXRoVHJhbnNpdGlvbnMgPSAhc2VsZi5jb25maWcuZGlzYWJsZUFuaW1hdGlvbnMgJiYgd2l0aFRyYW5zaXRpb25zO1xuICAgICAgICB0aGlzLnJlZHJhd0RpYWdyYW1UaXRsZSgpO1xuICAgICAgICB0aGlzLnJlZHJhd0RpYWdyYW1EZXNjcmlwdGlvbigpO1xuICAgICAgICB0aGlzLnVwZGF0ZVNjYWxlKHdpdGhUcmFuc2l0aW9ucyk7XG4gICAgICAgIHRoaXMudXBkYXRlTWFyZ2luKHdpdGhUcmFuc2l0aW9ucyk7XG4gICAgICAgIGlmKHdpdGhUcmFuc2l0aW9ucyl7XG4gICAgICAgICAgICBzZWxmLnRyYW5zaXRpb25QcmV2ID0gc2VsZi50cmFuc2l0aW9uO1xuICAgICAgICAgICAgc2VsZi50cmFuc2l0aW9uID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlZHJhd05vZGVzKCk7XG4gICAgICAgIHRoaXMucmVkcmF3RWRnZXMoKTtcbiAgICAgICAgdGhpcy5yZWRyYXdGbG9hdGluZ1RleHRzKCk7XG4gICAgICAgIHRoaXMudXBkYXRlVmFsaWRhdGlvbk1lc3NhZ2VzKCk7XG4gICAgICAgIGlmKHdpdGhUcmFuc2l0aW9ucyl7XG4gICAgICAgICAgICBzZWxmLnRyYW5zaXRpb24gPSAgc2VsZi50cmFuc2l0aW9uUHJldjtcbiAgICAgICAgfVxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBzZWxmLnVwZGF0ZVBsb3R0aW5nUmVnaW9uU2l6ZSgpO1xuICAgICAgICB9LDEwKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBjb21wdXRlQXZhaWxhYmxlU3BhY2UoKXtcbiAgICAgICAgdGhpcy5hdmFpbGFibGVIZWlnaHQgPSBBcHBVdGlscy5zYW5pdGl6ZUhlaWdodCh0aGlzLmNvbmZpZy5oZWlnaHQsIHRoaXMuY29udGFpbmVyLCB0aGlzLmNvbmZpZy5tYXJnaW4pO1xuICAgICAgICB0aGlzLmF2YWlsYWJsZVdpZHRoID0gQXBwVXRpbHMuc2FuaXRpemVXaWR0aCh0aGlzLmNvbmZpZy53aWR0aCwgdGhpcy5jb250YWluZXIsIHRoaXMuY29uZmlnLm1hcmdpbik7XG4gICAgfVxuXG4gICAgaW5pdFN2ZygpIHtcbiAgICAgICAgdmFyIGMgPSB0aGlzO1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuY29tcHV0ZUF2YWlsYWJsZVNwYWNlKCk7XG4gICAgICAgIHRoaXMuc3ZnID0gdGhpcy5jb250YWluZXIuc2VsZWN0T3JBcHBlbmQoJ3N2Zy5zZC10cmVlLWRlc2lnbmVyJyk7XG4gICAgICAgIHRoaXMuc3ZnLmF0dHIoJ3dpZHRoJywgdGhpcy5hdmFpbGFibGVXaWR0aCkuYXR0cignaGVpZ2h0JywgdGhpcy5hdmFpbGFibGVIZWlnaHQpO1xuXG4gICAgICAgIHRoaXMud3JhcHBlckdyb3VwID0gdGhpcy5zdmcuc2VsZWN0T3JBcHBlbmQoJ2cuc2Qtd3JhcHBlci1ncm91cCcpO1xuICAgICAgICB0aGlzLm1haW5Hcm91cCA9IHRoaXMud3JhcHBlckdyb3VwLnNlbGVjdE9yQXBwZW5kKCdnLm1haW4tZ3JvdXAnKTtcbiAgICAgICAgdGhpcy51cGRhdGVTY2FsZSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZU1hcmdpbigpO1xuXG5cbiAgICAgICAgaWYgKCF0aGlzLmNvbmZpZy53aWR0aCkge1xuICAgICAgICAgICAgZDMuc2VsZWN0KHdpbmRvdylcbiAgICAgICAgICAgICAgICAub24oXCJyZXNpemUudHJlZS1kZXNpZ25lclwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYudXBkYXRlUGxvdHRpbmdSZWdpb25TaXplKCk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYucmVkcmF3RGlhZ3JhbVRpdGxlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbWMgPSBuZXcgSGFtbWVyLk1hbmFnZXIodGhpcy5zdmcubm9kZSgpLCB7dG91Y2hBY3Rpb24gOiAnYXV0byd9KTtcbiAgICAgICAgbWMuYWRkKG5ldyBIYW1tZXIuUHJlc3Moe1xuICAgICAgICAgICAgcG9pbnRlclR5cGU6ICd0b3VjaCdcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIG1jLmFkZChuZXcgSGFtbWVyLlBpbmNoKHtcbiAgICAgICAgICAgIHBvaW50ZXJUeXBlOiAndG91Y2gnXG4gICAgICAgIH0pKTtcblxuICAgICAgICB2YXIgY2FuY2VsO1xuICAgICAgICBtYy5vbigncGluY2hzdGFydCcsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBzZWxmLmRpc2FibGVCcnVzaCgpO1xuICAgICAgICB9KVxuICAgICAgICBtYy5vbigncGluY2gnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgY2FuY2VsID0gVXRpbHMud2FpdEZvckZpbmFsRXZlbnQoKCk9PnNlbGYuZW5hYmxlQnJ1c2goKSwgJ3BpbmNoZW5kJywgNTAwMClcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICB1cGRhdGVNYXJnaW4od2l0aFRyYW5zaXRpb25zKXtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgbWFyZ2luID0gdGhpcy5jb25maWcubWFyZ2luO1xuICAgICAgICB2YXIgZ3JvdXAgPSB0aGlzLm1haW5Hcm91cDtcbiAgICAgICAgaWYod2l0aFRyYW5zaXRpb25zKXtcbiAgICAgICAgICAgIGdyb3VwID0gZ3JvdXAudHJhbnNpdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50b3BNYXJnaW4gPSBtYXJnaW4udG9wO1xuICAgICAgICBpZih0aGlzLmRpYWdyYW1UaXRsZXx8dGhpcy5kaWFncmFtRGVzY3JpcHRpb24pe1xuICAgICAgICAgICAgdGhpcy50b3BNYXJnaW4gPSBwYXJzZUludCh0aGlzLmRpYWdyYW1UaXRsZSA/IHRoaXMuY29uZmlnLnRpdGxlLm1hcmdpbi50b3AgOiAwKSArIHRoaXMuZ2V0VGl0bGVHcm91cEhlaWdodCgpXG4gICAgICAgICAgICAgICAgKyAgTWF0aC5tYXgodGhpcy50b3BNYXJnaW4sIHBhcnNlSW50KHRoaXMuY29uZmlnLnRpdGxlLm1hcmdpbi5ib3R0b20pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdyb3VwLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoXCIgKyBtYXJnaW4ubGVmdCArIFwiLFwiICsgdGhpcy50b3BNYXJnaW4gKyBcIilcIikub24oXCJlbmRcIiwgKCk9PiBzZWxmLnVwZGF0ZVBsb3R0aW5nUmVnaW9uU2l6ZSgpKTtcbiAgICB9XG5cbiAgICBzZXRNYXJnaW4obWFyZ2luLCB3aXRob3V0U3RhdGVTYXZpbmcpe1xuICAgICAgICB2YXIgc2VsZj10aGlzO1xuICAgICAgICBpZighd2l0aG91dFN0YXRlU2F2aW5nKXtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoe1xuICAgICAgICAgICAgICAgIGRhdGE6e1xuICAgICAgICAgICAgICAgICAgICBtYXJnaW46IFV0aWxzLmNsb25lKHNlbGYuY29uZmlnLm1hcmdpbilcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uVW5kbzogKGRhdGEpPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldE1hcmdpbihkYXRhLm1hcmdpbiwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvblJlZG86IChkYXRhKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRNYXJnaW4obWFyZ2luLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBVdGlscy5kZWVwRXh0ZW5kKHRoaXMuY29uZmlnLm1hcmdpbiwgbWFyZ2luKTtcbiAgICAgICAgdGhpcy5yZWRyYXdEaWFncmFtVGl0bGUoKTtcbiAgICAgICAgdGhpcy51cGRhdGVNYXJnaW4odHJ1ZSk7XG4gICAgfVxuXG5cbiAgICB1cGRhdGVTY2FsZSh3aXRoVHJhbnNpdGlvbnMpe1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBzY2FsZSA9IHRoaXMuY29uZmlnLnNjYWxlO1xuICAgICAgICB2YXIgZ3JvdXAgPSB0aGlzLndyYXBwZXJHcm91cDtcbiAgICAgICAgaWYod2l0aFRyYW5zaXRpb25zKXtcbiAgICAgICAgICAgIGdyb3VwID0gZ3JvdXAudHJhbnNpdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ3JvdXAuYXR0cihcInRyYW5zZm9ybVwiLCBcInNjYWxlKFwiICsgc2NhbGUgKyBcIilcIikub24oXCJlbmRcIiwgKCk9PiBzZWxmLnVwZGF0ZVBsb3R0aW5nUmVnaW9uU2l6ZSgpKTtcbiAgICB9XG5cbiAgICBzZXRTY2FsZShzY2FsZSwgd2l0aG91dFN0YXRlU2F2aW5nKXtcbiAgICAgICAgdmFyIHNlbGY9dGhpcztcbiAgICAgICAgaWYoIXdpdGhvdXRTdGF0ZVNhdmluZyl7XG4gICAgICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKHtcbiAgICAgICAgICAgICAgICBkYXRhOntcbiAgICAgICAgICAgICAgICAgICAgc2NhbGU6IFV0aWxzLmNsb25lKHNlbGYuY29uZmlnLnNjYWxlKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25VbmRvOiAoZGF0YSk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0U2NhbGUoZGF0YS5zY2FsZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvblJlZG86IChkYXRhKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRTY2FsZShzY2FsZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb25maWcuc2NhbGUgPSBzY2FsZTtcbiAgICAgICAgdGhpcy51cGRhdGVTY2FsZSh0cnVlKTtcbiAgICB9XG5cbiAgICBpbml0Q29udGFpbmVyKGNvbnRhaW5lcklkT3JFbGVtKSB7XG4gICAgICAgIGlmIChVdGlscy5pc1N0cmluZyhjb250YWluZXJJZE9yRWxlbSkpIHtcbiAgICAgICAgICAgIHZhciBzZWxlY3RvciA9IGNvbnRhaW5lcklkT3JFbGVtLnRyaW0oKTtcblxuICAgICAgICAgICAgaWYgKCFVdGlscy5zdGFydHNXaXRoKHNlbGVjdG9yLCAnIycpICYmICFVdGlscy5zdGFydHNXaXRoKHNlbGVjdG9yLCAnLicpKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3IgPSAnIycgKyBzZWxlY3RvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyID0gZDMuc2VsZWN0KHNlbGVjdG9yKTtcbiAgICAgICAgfSBlbHNlIGlmKGNvbnRhaW5lcklkT3JFbGVtLl9wYXJlbnRzKXtcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVySWRPckVsZW1cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGQzLnNlbGVjdChjb250YWluZXJJZE9yRWxlbSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVQbG90dGluZ1JlZ2lvblNpemUoKSB7XG4gICAgICAgIHZhciBjaGFuZ2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY29tcHV0ZUF2YWlsYWJsZVNwYWNlKCk7XG4gICAgICAgIHZhciBtYXJnaW4gPSB0aGlzLmNvbmZpZy5tYXJnaW47XG4gICAgICAgIHZhciBzdmdXaWR0aCA9IHRoaXMuc3ZnLmF0dHIoJ3dpZHRoJyk7XG4gICAgICAgIHZhciBzdmdIZWlnaHQgPSB0aGlzLnN2Zy5hdHRyKCdoZWlnaHQnKTtcbiAgICAgICAgdmFyIG1haW5Hcm91cEJveCA9IHRoaXMubWFpbkdyb3VwLm5vZGUoKS5nZXRCQm94KCk7XG4gICAgICAgIGxldCBib3hXaWR0aCA9IG1haW5Hcm91cEJveC53aWR0aDtcbiAgICAgICAgdmFyIG5ld1N2Z1dpZHRoID0gYm94V2lkdGgrbWFpbkdyb3VwQm94LngrbWFyZ2luLmxlZnQrbWFyZ2luLnJpZ2h0O1xuICAgICAgICBuZXdTdmdXaWR0aCAgKj0gdGhpcy5jb25maWcuc2NhbGU7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmNsYXNzZWQoJ3dpdGgtb3ZlcmZsb3cteCcsIG5ld1N2Z1dpZHRoPj10aGlzLmF2YWlsYWJsZVdpZHRoKTtcbiAgICAgICAgbmV3U3ZnV2lkdGggPSBNYXRoLm1heChuZXdTdmdXaWR0aCwgdGhpcy5hdmFpbGFibGVXaWR0aCk7XG4gICAgICAgIGlmKHN2Z1dpZHRoIT1uZXdTdmdXaWR0aCl7XG4gICAgICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc3ZnLmF0dHIoJ3dpZHRoJywgbmV3U3ZnV2lkdGgpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBib3hIZWlnaHQgPSBtYWluR3JvdXBCb3guaGVpZ2h0O1xuICAgICAgICB2YXIgbmV3U3ZnSGVpZ2h0ID0gYm94SGVpZ2h0K21haW5Hcm91cEJveC55K3RoaXMudG9wTWFyZ2luK21hcmdpbi5ib3R0b207XG4gICAgICAgIG5ld1N2Z0hlaWdodCAqPSB0aGlzLmNvbmZpZy5zY2FsZTtcbiAgICAgICAgdGhpcy5jb250YWluZXIuY2xhc3NlZCgnd2l0aC1vdmVyZmxvdy15JywgbmV3U3ZnSGVpZ2h0Pj10aGlzLmF2YWlsYWJsZUhlaWdodCk7XG4gICAgICAgIG5ld1N2Z0hlaWdodCA9IE1hdGgubWF4KG5ld1N2Z0hlaWdodCwgdGhpcy5hdmFpbGFibGVIZWlnaHQpO1xuICAgICAgICBpZihzdmdIZWlnaHQhPW5ld1N2Z0hlaWdodCl7XG4gICAgICAgICAgICBjaGFuZ2VkPXRydWU7XG4gICAgICAgICAgICB0aGlzLnN2Zy5hdHRyKCdoZWlnaHQnLCBuZXdTdmdIZWlnaHQpO1xuICAgICAgICB9XG4gICAgICAgIGlmKGNoYW5nZWQpe1xuICAgICAgICAgICAgdGhpcy51cGRhdGVCcnVzaEV4dGVudCgpXG4gICAgICAgIH1cblxuXG4gICAgfVxuXG4gICAgcmVkcmF3Tm9kZXMoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuXG4gICAgICAgIHZhciBub2Rlc0NvbnRhaW5lciA9IHRoaXMubWFpbkdyb3VwLnNlbGVjdE9yQXBwZW5kKCdnLm5vZGVzJyk7XG4gICAgICAgIHZhciBub2RlcyA9IG5vZGVzQ29udGFpbmVyLnNlbGVjdEFsbCgnLm5vZGUnKS5kYXRhKHRoaXMuZGF0YS5ub2Rlcy5maWx0ZXIoZD0+IWQuJGhpZGRlbiksIChkLGkpPT4gZC5pZCk7XG4gICAgICAgIG5vZGVzLmV4aXQoKS5yZW1vdmUoKTtcbiAgICAgICAgdmFyIG5vZGVzRW50ZXIgPSBub2Rlcy5lbnRlcigpLmFwcGVuZCgnZycpXG4gICAgICAgICAgICAuYXR0cignaWQnLCBkPT4nbm9kZS0nK2QuaWQpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCBkPT5kLnR5cGUrJy1ub2RlIG5vZGUnKVxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGQ9Pid0cmFuc2xhdGUoJyArIGQubG9jYXRpb24ueCArICcgICcgKyBkLmxvY2F0aW9uLnkgKyAnKScpO1xuICAgICAgICBub2Rlc0VudGVyLmFwcGVuZCgncGF0aCcpO1xuXG4gICAgICAgIHZhciBsYWJlbEVudGVyID0gbm9kZXNFbnRlci5hcHBlbmQoJ3RleHQnKS5hdHRyKCdjbGFzcycsICdsYWJlbCcpO1xuICAgICAgICB2YXIgcGF5b2ZmRW50ZXIgPSBub2Rlc0VudGVyLmFwcGVuZCgndGV4dCcpLmF0dHIoJ2NsYXNzJywgJ3BheW9mZiBjb21wdXRlZCcpO1xuICAgICAgICB2YXIgaW5kaWNhdG9yRW50ZXIgPSBub2Rlc0VudGVyLmFwcGVuZCgndGV4dCcpLmF0dHIoJ2NsYXNzJywgJ2Vycm9yLWluZGljYXRvcicpLnRleHQoJyEhJyk7XG4gICAgICAgIHZhciBhZ2dyZWdhdGVkUGF5b2ZmRW50ZXIgPSBub2Rlc0VudGVyLmFwcGVuZCgndGV4dCcpLmF0dHIoJ2NsYXNzJywgJ2FnZ3JlZ2F0ZWQtcGF5b2ZmJyk7XG4gICAgICAgIHZhciBwcm9iYWJpbGl0eVRvRW50ZXJFbnRlciA9IG5vZGVzRW50ZXIuYXBwZW5kKCd0ZXh0JykuYXR0cignY2xhc3MnLCAncHJvYmFiaWxpdHktdG8tZW50ZXInKTtcblxuICAgICAgICB2YXIgbm9kZXNNZXJnZSA9IG5vZGVzRW50ZXIubWVyZ2Uobm9kZXMpO1xuICAgICAgICBub2Rlc01lcmdlLmNsYXNzZWQoJ29wdGltYWwnLCAoZCk9PnNlbGYuaXNPcHRpbWFsKGQpKTtcblxuICAgICAgICB2YXIgbm9kZXNNZXJnZVQgPSBub2Rlc01lcmdlO1xuICAgICAgICBpZih0aGlzLnRyYW5zaXRpb24pe1xuICAgICAgICAgICAgbm9kZXNNZXJnZVQgPSBub2Rlc01lcmdlLnRyYW5zaXRpb24oKTtcbiAgICAgICAgICAgIG5vZGVzTWVyZ2VULm9uKCdlbmQnLCAoKT0+IHNlbGYudXBkYXRlUGxvdHRpbmdSZWdpb25TaXplKCkpXG4gICAgICAgIH1cbiAgICAgICAgbm9kZXNNZXJnZVRcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBkPT4ndHJhbnNsYXRlKCcgKyBkLmxvY2F0aW9uLnggKyAnICAnICsgZC5sb2NhdGlvbi55ICsgJyknKVxuXG4gICAgICAgIHZhciBwYXRoID0gbm9kZXNNZXJnZS5zZWxlY3QoJ3BhdGgnKTtcbiAgICAgICAgdGhpcy5sYXlvdXQuZHJhd05vZGVTeW1ib2wocGF0aCx0aGlzLnRyYW5zaXRpb24pO1xuXG4gICAgICAgIC8qcGF0aFxuICAgICAgICAgICAgLnN0eWxlKCdmaWxsJywgZD0+IHtcbiAgICAgICAgICAgICAgICAvLyBpZihzZWxmLmlzTm9kZVNlbGVjdGVkKGQpKXtcbiAgICAgICAgICAgICAgICAvLyAgICAgcmV0dXJuIHNlbGYuY29uZmlnLm5vZGVbZC50eXBlXS5zZWxlY3RlZC5maWxsXG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLmNvbmZpZy5ub2RlW2QudHlwZV0uZmlsbFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlJywgZD0+IHNlbGYuY29uZmlnLm5vZGVbZC50eXBlXS5zdHJva2UpXG4gICAgICAgICAgICAuc3R5bGUoJ3N0cm9rZS13aWR0aCcsIGQ9PiB7XG4gICAgICAgICAgICAgICAgaWYoc2VsZi5jb25maWcubm9kZVtkLnR5cGVdLnN0cm9rZVdpZHRoIT09dW5kZWZpbmVkKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYuY29uZmlnLm5vZGVbZC50eXBlXS5zdHJva2VXaWR0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYuY29uZmlnLm5vZGUuc3Ryb2tlV2lkdGg7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgKi9cbiAgICAgICAgdGhpcy5sYXlvdXQubm9kZUxhYmVsUG9zaXRpb24obGFiZWxFbnRlcik7XG4gICAgICAgIHZhciBsYWJlbE1lcmdlID0gbm9kZXNNZXJnZS5zZWxlY3QoJ3RleHQubGFiZWwnKTtcbiAgICAgICAgbGFiZWxNZXJnZS5jbGFzc2VkKCdzZC1oaWRkZW4nLCB0aGlzLmNvbmZpZy5oaWRlTGFiZWxzKTtcbiAgICAgICAgdmFyIGxhYmVsTWVyZ2VUID0gbm9kZXNNZXJnZVQuc2VsZWN0KCd0ZXh0LmxhYmVsJyk7XG4gICAgICAgIGxhYmVsTWVyZ2VULmVhY2godGhpcy51cGRhdGVUZXh0TGluZXMpO1xuICAgICAgICB0aGlzLmxheW91dC5ub2RlTGFiZWxQb3NpdGlvbihsYWJlbE1lcmdlVClcbiAgICAgICAgICAgIC5hdHRyKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKVxuXG4gICAgICAgIHZhciBwYXlvZmYgPSBub2Rlc01lcmdlLnNlbGVjdCgndGV4dC5wYXlvZmYnKTtcblxuICAgICAgICB2YXIgcGF5b2ZmVHNwYW5zID0gcGF5b2ZmLnNlbGVjdEFsbCgndHNwYW4nKS5kYXRhKGQ9PntcbiAgICAgICAgICAgIGxldCBpdGVtID0gZC5kaXNwbGF5VmFsdWUoJ2NoaWxkcmVuUGF5b2ZmJyk7XG4gICAgICAgICAgICByZXR1cm4gVXRpbHMuaXNBcnJheShpdGVtKSA/IGl0ZW0uZmlsdGVyKGk9PmkgIT09IHVuZGVmaW5lZCkgOiBbaXRlbV1cbiAgICAgICAgfSk7XG4gICAgICAgIHBheW9mZlRzcGFucy5leGl0KCkucmVtb3ZlKCk7XG5cbiAgICAgICAgdmFyIHBheW9mZlRzcGFuc00gPSBwYXlvZmZUc3BhbnMuZW50ZXIoKS5hcHBlbmQoJ3RzcGFuJykubWVyZ2UocGF5b2ZmVHNwYW5zKTtcbiAgICAgICAgcGF5b2ZmVHNwYW5zTVxuICAgICAgICAgICAgLy8gLmF0dHIoJ2RvbWluYW50LWJhc2VsaW5lJywgJ2hhbmdpbmcnKVxuICAgICAgICAgICAgLmF0dHIoJ2R5JywgKGQsaSk9Pmk+MCA/ICcxLjFlbSc6IHVuZGVmaW5lZClcbiAgICAgICAgICAgIC5hdHRyKCd4JywgJzAnKVxuICAgICAgICAgICAgLmNsYXNzZWQoJ25lZ2F0aXZlJywgZD0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZCE9PW51bGwgJiYgZDwwO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jbGFzc2VkKCdzZC1oaWRkZW4nLCB0aGlzLmNvbmZpZy5oaWRlUGF5b2ZmcyB8fCB0aGlzLmNvbmZpZy5yYXcpXG4gICAgICAgICAgICAudGV4dCgoZCwgaSk9PiB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbCA9IGRcblxuICAgICAgICAgICAgICAgIHJldHVybiB2YWwhPT1udWxsID8gKGlzTmFOKHZhbCkgPyB2YWwgOiBzZWxmLmNvbmZpZy5wYXlvZmZOdW1iZXJGb3JtYXR0ZXIodmFsLCBpKSk6ICcnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5hdHRhY2hQYXlvZmZUb29sdGlwKHBheW9mZlRzcGFuc00pO1xuXG5cbiAgICAgICAgdmFyIHBheW9mZlQgPSBwYXlvZmY7XG4gICAgICAgIGlmKHRoaXMudHJhbnNpdGlvbil7XG4gICAgICAgICAgICBwYXlvZmZUID0gcGF5b2ZmLnRyYW5zaXRpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubGF5b3V0Lm5vZGVQYXlvZmZQb3NpdGlvbihwYXlvZmZFbnRlcik7XG4gICAgICAgIHRoaXMubGF5b3V0Lm5vZGVQYXlvZmZQb3NpdGlvbihwYXlvZmZUKTtcblxuICAgICAgICB2YXIgYWdncmVnYXRlZFBheW9mZiA9IG5vZGVzTWVyZ2Uuc2VsZWN0KCd0ZXh0LmFnZ3JlZ2F0ZWQtcGF5b2ZmJyk7XG4gICAgICAgIHZhciBhZ2dyZWdhdGVkUGF5b2ZmVHNwYW5zID0gYWdncmVnYXRlZFBheW9mZi5zZWxlY3RBbGwoJ3RzcGFuJykuZGF0YShkPT57XG4gICAgICAgICAgICBsZXQgaXRlbSA9IGQuZGlzcGxheVZhbHVlKCdhZ2dyZWdhdGVkUGF5b2ZmJyk7XG4gICAgICAgICAgICByZXR1cm4gVXRpbHMuaXNBcnJheShpdGVtKSA/IGl0ZW0uZmlsdGVyKGk9PmkgIT09IHVuZGVmaW5lZCkgOiBbaXRlbV1cbiAgICAgICAgfSk7XG4gICAgICAgIGFnZ3JlZ2F0ZWRQYXlvZmZUc3BhbnMuZXhpdCgpLnJlbW92ZSgpO1xuICAgICAgICB2YXIgYWdncmVnYXRlZFBheW9mZlRzcGFuc00gPSBhZ2dyZWdhdGVkUGF5b2ZmVHNwYW5zLmVudGVyKCkuYXBwZW5kKCd0c3BhbicpLm1lcmdlKGFnZ3JlZ2F0ZWRQYXlvZmZUc3BhbnMpXG4gICAgICAgICAgICAuYXR0cignZHknLCAoZCxpKT0+aT4wID8gJzAuOTVlbSc6IHVuZGVmaW5lZClcbiAgICAgICAgICAgIC5jbGFzc2VkKCduZWdhdGl2ZScsIGQ9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQhPT1udWxsICYmIGQ8MDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2xhc3NlZCgnc2QtaGlkZGVuJywgdGhpcy5jb25maWcuaGlkZVBheW9mZnMgfHwgdGhpcy5jb25maWcucmF3KVxuICAgICAgICAgICAgLnRleHQoKHZhbCwgaSk9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbCE9PW51bGwgPyAoaXNOYU4odmFsKSA/IHZhbCA6IHNlbGYuY29uZmlnLnBheW9mZk51bWJlckZvcm1hdHRlcih2YWwsIGkpKTogJydcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYXR0YWNoUGF5b2ZmVG9vbHRpcChhZ2dyZWdhdGVkUGF5b2ZmVHNwYW5zTSwgJ2FnZ3JlZ2F0ZWRQYXlvZmYnKTtcblxuICAgICAgICB2YXIgYWdncmVnYXRlZFBheW9mZlQgPSBhZ2dyZWdhdGVkUGF5b2ZmO1xuICAgICAgICBpZih0aGlzLnRyYW5zaXRpb24pe1xuICAgICAgICAgICAgYWdncmVnYXRlZFBheW9mZlQgPSBhZ2dyZWdhdGVkUGF5b2ZmLnRyYW5zaXRpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubGF5b3V0Lm5vZGVBZ2dyZWdhdGVkUGF5b2ZmUG9zaXRpb24oYWdncmVnYXRlZFBheW9mZkVudGVyKTtcbiAgICAgICAgdGhpcy5sYXlvdXQubm9kZUFnZ3JlZ2F0ZWRQYXlvZmZQb3NpdGlvbihhZ2dyZWdhdGVkUGF5b2ZmVCk7XG5cbiAgICAgICAgdmFyIHByb2JhYmlsaXR5VG9FbnRlciA9IG5vZGVzTWVyZ2Uuc2VsZWN0KCd0ZXh0LnByb2JhYmlsaXR5LXRvLWVudGVyJylcbiAgICAgICAgICAgIC50ZXh0KGQ9PntcbiAgICAgICAgICAgICAgICB2YXIgdmFsID0gZC5kaXNwbGF5VmFsdWUoJ3Byb2JhYmlsaXR5VG9FbnRlcicpO1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWwhPT1udWxsID8gKGlzTmFOKHZhbCkgPyB2YWwgOiBzZWxmLmNvbmZpZy5wcm9iYWJpbGl0eU51bWJlckZvcm1hdHRlcih2YWwpKTogJydcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2xhc3NlZCgnc2QtaGlkZGVuJywgdGhpcy5jb25maWcuaGlkZVByb2JhYmlsaXRpZXMgfHwgdGhpcy5jb25maWcucmF3KTtcbiAgICAgICAgVG9vbHRpcC5hdHRhY2gocHJvYmFiaWxpdHlUb0VudGVyLCBpMThuLnQoJ3Rvb2x0aXAubm9kZS5wcm9iYWJpbGl0eVRvRW50ZXInKSk7XG5cblxuICAgICAgICB2YXIgcHJvYmFiaWxpdHlUb0VudGVyVCA9IHByb2JhYmlsaXR5VG9FbnRlcjtcbiAgICAgICAgaWYodGhpcy50cmFuc2l0aW9uKXtcbiAgICAgICAgICAgIHByb2JhYmlsaXR5VG9FbnRlclQgPSBwcm9iYWJpbGl0eVRvRW50ZXIudHJhbnNpdGlvbigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubGF5b3V0Lm5vZGVQcm9iYWJpbGl0eVRvRW50ZXJQb3NpdGlvbihwcm9iYWJpbGl0eVRvRW50ZXJFbnRlcik7XG4gICAgICAgIHRoaXMubGF5b3V0Lm5vZGVQcm9iYWJpbGl0eVRvRW50ZXJQb3NpdGlvbihwcm9iYWJpbGl0eVRvRW50ZXJUKTtcblxuXG4gICAgICAgIHZhciBpbmRpY2F0b3IgPSBub2Rlc01lcmdlLnNlbGVjdCgndGV4dC5lcnJvci1pbmRpY2F0b3InKTtcbiAgICAgICAgaW5kaWNhdG9yLmNsYXNzZWQoJ3NkLWhpZGRlbicsIHRoaXMuY29uZmlnLnJhdylcbiAgICAgICAgdGhpcy5sYXlvdXQubm9kZUluZGljYXRvclBvc2l0aW9uKGluZGljYXRvckVudGVyKTtcbiAgICAgICAgdGhpcy5sYXlvdXQubm9kZUluZGljYXRvclBvc2l0aW9uKGluZGljYXRvcik7XG5cbiAgICAgICAgaWYodGhpcy5ub2RlRHJhZ0hhbmRsZXIpe1xuICAgICAgICAgICAgbm9kZXNNZXJnZS5jYWxsKHRoaXMubm9kZURyYWdIYW5kbGVyLmRyYWcpO1xuICAgICAgICB9XG5cbiAgICAgICAgbm9kZXNNZXJnZS5vbignY29udGV4dG1lbnUnLCB0aGlzLm5vZGVDb250ZXh0TWVudSk7XG4gICAgICAgIG5vZGVzTWVyZ2Uub24oJ2RibGNsaWNrJywgdGhpcy5ub2RlQ29udGV4dE1lbnUpXG4gICAgICAgIG5vZGVzTWVyZ2UuZWFjaChmdW5jdGlvbihkLCBpKXtcbiAgICAgICAgICAgIHZhciBub2RlRWxlbSA9IHRoaXM7XG4gICAgICAgICAgICB2YXIgbWMgPSBuZXcgSGFtbWVyLk1hbmFnZXIobm9kZUVsZW0pO1xuICAgICAgICAgICAgbWMuYWRkKG5ldyBIYW1tZXIuUHJlc3Moe1xuICAgICAgICAgICAgICAgIHBvaW50ZXJUeXBlOiAndG91Y2gnXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICBtYy5vbigncHJlc3MnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgICAgICBpZihlLnBvaW50ZXJUeXBlPT0ndG91Y2gnKXtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5ub2RlRHJhZ0hhbmRsZXIuY2FuY2VsRHJhZygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG5cblxuICAgICAgICAgICAgaWYoZC5mb2xkZWQpe1xuICAgICAgICAgICAgICAgIGxldCBidXR0b24gPSBkMy5zZWxlY3Qobm9kZUVsZW0pLnNlbGVjdE9yQXBwZW5kKCd0ZXh0LnNkLXVuZm9sZC1idXR0b24nKVxuICAgICAgICAgICAgICAgICAgICAudGV4dChcIlsrXVwiKVxuICAgICAgICAgICAgICAgICAgICAub24oJ2NsaWNrIGRiY2xpY2sgbW91c2Vkb3duJywgKCk9PnNlbGYuZm9sZFN1YnRyZWUoZCwgZmFsc2UpKTsgLy9maXJlZm94IGRldGVjdHMgb25seSBtb3VzZWRvd24gZXZlbnQgLSByZWxhdGVkIHRvIGRyYWcgaGFuZGxlclxuXG4gICAgICAgICAgICAgICAgc2VsZi5sYXlvdXQubm9kZVVuZm9sZEJ1dHRvblBvc2l0aW9uKGJ1dHRvbik7XG4gICAgICAgICAgICAgICAgVG9vbHRpcC5hdHRhY2goYnV0dG9uLCBpMThuLnQoJ2NvbnRleHRNZW51Lm5vZGUudW5mb2xkJykpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgZDMuc2VsZWN0KG5vZGVFbGVtKS5zZWxlY3QoJy5zZC11bmZvbGQtYnV0dG9uJykucmVtb3ZlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBhdHRhY2hQYXlvZmZUb29sdGlwKHNlbGVjdGlvbiwgcGF5b2ZmRmlsZWROYW1lID0gJ3BheW9mZicsIG9iamVjdD0nbm9kZScpe1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIFRvb2x0aXAuYXR0YWNoKHNlbGVjdGlvbiwgKGQsIGkpPT57XG4gICAgICAgICAgICBpZihzZWxmLmNvbmZpZy5wYXlvZmZOYW1lcy5sZW5ndGg+aSAmJiBzZWxmLmNvbmZpZy5wYXlvZmZOYW1lc1tpXSAhPT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGkxOG4udCgndG9vbHRpcC4nK29iamVjdCsnLicrcGF5b2ZmRmlsZWROYW1lKycubmFtZWQnLHt2YWx1ZTogZC5wYXlvZmYsIG51bWJlcjogaSsxLCBuYW1lOiBzZWxmLmNvbmZpZy5wYXlvZmZOYW1lc1tpXX0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaTE4bi50KCd0b29sdGlwLicrb2JqZWN0KycuJytwYXlvZmZGaWxlZE5hbWUrJy5kZWZhdWx0Jyx7dmFsdWU6IGQucGF5b2ZmLCBudW1iZXI6IHNlbGYuY29uZmlnLm1heFBheW9mZnNUb0Rpc3BsYXkgPCAyID8gJycgOiBpKzF9KVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB1cGRhdGVUZXh0TGluZXMoZCl7IC8vaGVscGVyIG1ldGhvZCBmb3Igc3BsaXR0aW5nIHRleHQgdG8gdHNwYW5zXG4gICAgICAgIHZhciBsaW5lcyA9IGQubmFtZSA/IGQubmFtZS5zcGxpdCgnXFxuJykgOiBbXTtcbiAgICAgICAgbGluZXMucmV2ZXJzZSgpO1xuICAgICAgICB2YXIgdHNwYW5zID0gZDMuc2VsZWN0KHRoaXMpLnNlbGVjdEFsbCgndHNwYW4nKS5kYXRhKGxpbmVzKTtcbiAgICAgICAgdHNwYW5zLmVudGVyKCkuYXBwZW5kKCd0c3BhbicpXG4gICAgICAgICAgICAubWVyZ2UodHNwYW5zKVxuICAgICAgICAgICAgLnRleHQobD0+bClcbiAgICAgICAgICAgIC5hdHRyKCdkeScsIChkLGkpPT5pPjAgPyAnLTEuMWVtJzogdW5kZWZpbmVkKVxuICAgICAgICAgICAgLmF0dHIoJ3gnLCAnMCcpO1xuXG4gICAgICAgIHRzcGFucy5leGl0KCkucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgaXNPcHRpbWFsKGQpe1xuICAgICAgICByZXR1cm4gZC5kaXNwbGF5VmFsdWUoJ29wdGltYWwnKTtcbiAgICB9XG5cbiAgICByZWRyYXdFZGdlcygpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgZWRnZXNDb250YWluZXIgPSB0aGlzLm1haW5Hcm91cC5zZWxlY3RPckFwcGVuZCgnZy5lZGdlcycpO1xuICAgICAgICBpZihzZWxmLmNvbmZpZy5mb3JjZUZ1bGxFZGdlUmVkcmF3KXtcbiAgICAgICAgICAgIGVkZ2VzQ29udGFpbmVyLnNlbGVjdEFsbChcIipcIikucmVtb3ZlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZWRnZXMgPSBlZGdlc0NvbnRhaW5lci5zZWxlY3RBbGwoJy5lZGdlJykuZGF0YSh0aGlzLmRhdGEuZWRnZXMuZmlsdGVyKGU9PiFlLiRoaWRkZW4pLCAoZCxpKT0+IGQuaWQpO1xuICAgICAgICBlZGdlcy5leGl0KCkucmVtb3ZlKCk7XG4gICAgICAgIHZhciBlZGdlc0VudGVyID0gZWRnZXMuZW50ZXIoKS5hcHBlbmQoJ2cnKVxuICAgICAgICAgICAgLmF0dHIoJ2lkJywgZD0+J2VkZ2UtJytkLmlkKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2VkZ2UnKTtcblxuXG4gICAgICAgIGVkZ2VzRW50ZXIuYXBwZW5kKCdwYXRoJyk7XG4gICAgICAgIHZhciBsYWJlbEVudGVyID0gZWRnZXNFbnRlci5hcHBlbmRTZWxlY3RvcignZy5sYWJlbC1ncm91cCcpO1xuICAgICAgICBsYWJlbEVudGVyLmFwcGVuZCgndGV4dCcpLmF0dHIoJ2NsYXNzJywgJ2xhYmVsJyk7XG4gICAgICAgIHZhciBwYXlvZmZFbnRlciA9IGVkZ2VzRW50ZXIuYXBwZW5kKCd0ZXh0JykuYXR0cignY2xhc3MnLCAncGF5b2ZmJyk7XG4gICAgICAgIHZhciBwcm9iYWJpbGl0eUVudGVyID0gZWRnZXNFbnRlci5hcHBlbmQoJ3RleHQnKS5hdHRyKCdjbGFzcycsICdwcm9iYWJpbGl0eScpO1xuXG5cbiAgICAgICAgdmFyIGVkZ2VzTWVyZ2UgPSBlZGdlc0VudGVyLm1lcmdlKGVkZ2VzKTtcblxuXG4gICAgICAgIHZhciBvcHRpbWFsQ2xhc3NOYW1lID0gJ29wdGltYWwnO1xuICAgICAgICBlZGdlc01lcmdlLmNsYXNzZWQob3B0aW1hbENsYXNzTmFtZSwgKGQpPT5zZWxmLmlzT3B0aW1hbChkKSk7XG5cbiAgICAgICAgdmFyIGVkZ2VzTWVyZ2VUID0gZWRnZXNNZXJnZTtcbiAgICAgICAgaWYodGhpcy50cmFuc2l0aW9uKXtcbiAgICAgICAgICAgIGVkZ2VzTWVyZ2VUID0gZWRnZXNNZXJnZS50cmFuc2l0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICBlZGdlc01lcmdlVC5zZWxlY3QoJ3BhdGgnKVxuICAgICAgICAgICAgLmF0dHIoJ2QnLCBkPT4gdGhpcy5sYXlvdXQuZWRnZUxpbmVEKGQpKVxuICAgICAgICAgICAgLy8gLmF0dHIoXCJzdHJva2VcIiwgXCJibGFja1wiKVxuICAgICAgICAgICAgLy8gLmF0dHIoXCJzdHJva2Utd2lkdGhcIiwgMilcbiAgICAgICAgICAgIC5hdHRyKFwiZmlsbFwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgIC5hdHRyKFwibWFya2VyLWVuZFwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN1ZmZpeCA9IGQzLnNlbGVjdCh0aGlzLnBhcmVudE5vZGUpLmNsYXNzZWQoJ3NlbGVjdGVkJykgPyAnLXNlbGVjdGVkJyA6IChzZWxmLmlzT3B0aW1hbChkKT8nLW9wdGltYWwnOicnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJ1cmwoI2Fycm93XCIrIHN1ZmZpeCtcIilcIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyAuYXR0cihcInNoYXBlLXJlbmRlcmluZ1wiLCBcIm9wdGltaXplUXVhbGl0eVwiKVxuXG5cbiAgICAgICAgZWRnZXNNZXJnZS5vbignY2xpY2snLCBkPT57XG4gICAgICAgICAgICBzZWxmLnNlbGVjdEVkZ2UoZCwgdHJ1ZSlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5sYXlvdXQuZWRnZUxhYmVsUG9zaXRpb24obGFiZWxFbnRlcik7XG4gICAgICAgIGVkZ2VzTWVyZ2VULnNlbGVjdCgndGV4dC5sYWJlbCcpLmVhY2godGhpcy51cGRhdGVUZXh0TGluZXMpO1xuICAgICAgICB2YXIgbGFiZWxNZXJnZSA9IGVkZ2VzTWVyZ2Uuc2VsZWN0KCdnLmxhYmVsLWdyb3VwJyk7XG4gICAgICAgIGxhYmVsTWVyZ2UuY2xhc3NlZCgnc2QtaGlkZGVuJywgdGhpcy5jb25maWcuaGlkZUxhYmVscyk7XG4gICAgICAgIHZhciBsYWJlbE1lcmdlVCA9IGVkZ2VzTWVyZ2VULnNlbGVjdCgnZy5sYWJlbC1ncm91cCcpO1xuICAgICAgICB0aGlzLmxheW91dC5lZGdlTGFiZWxQb3NpdGlvbihsYWJlbE1lcmdlVCk7XG4gICAgICAgICAgICAvLyAudGV4dChkPT5kLm5hbWUpO1xuXG4gICAgICAgIHZhciBwYXlvZmYgPSBlZGdlc01lcmdlLnNlbGVjdCgndGV4dC5wYXlvZmYnKTtcblxuICAgICAgICB2YXIgcGF5b2ZmVHNwYW5zID0gcGF5b2ZmLnNlbGVjdEFsbCgndHNwYW4nKS5kYXRhKGQgPT4ge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSBkLmRpc3BsYXlWYWx1ZSgncGF5b2ZmJyk7XG4gICAgICAgICAgICByZXR1cm4gVXRpbHMuaXNBcnJheShpdGVtKSA/IGl0ZW0uc2xpY2UoMCwgTWF0aC5taW4oaXRlbS5sZW5ndGgsIHNlbGYuY29uZmlnLm1heFBheW9mZnNUb0Rpc3BsYXkpKS5tYXAoXz0+ZCkgOiBbZF07XG4gICAgICAgIH0pO1xuICAgICAgICBwYXlvZmZUc3BhbnMuZXhpdCgpLnJlbW92ZSgpO1xuXG4gICAgICAgIHZhciBwYXlvZmZUc3BhbnNNID0gcGF5b2ZmVHNwYW5zLmVudGVyKCkuYXBwZW5kKCd0c3BhbicpLm1lcmdlKHBheW9mZlRzcGFucyk7XG4gICAgICAgIHBheW9mZlRzcGFuc01cbiAgICAgICAgLy8gLmF0dHIoJ2RvbWluYW50LWJhc2VsaW5lJywgJ2hhbmdpbmcnKVxuICAgICAgICAgICAgLmF0dHIoJ2R5JywgKGQsaSk9Pmk+MCA/ICcxLjFlbSc6IHVuZGVmaW5lZClcbiAgICAgICAgICAgIC8vIC5hdHRyKCd4JywgJzAnKVxuXG4gICAgICAgICAgICAvLyAuYXR0cignZG9taW5hbnQtYmFzZWxpbmUnLCAnaGFuZ2luZycpXG4gICAgICAgICAgICAuY2xhc3NlZCgnbmVnYXRpdmUnLCAoZCwgaSk9PiB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbCA9IGQuZGlzcGxheVBheW9mZih1bmRlZmluZWQsIGkpO1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWwhPT1udWxsICYmIHZhbDwwO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jbGFzc2VkKCdzZC1oaWRkZW4nLCB0aGlzLmNvbmZpZy5oaWRlUGF5b2ZmcylcbiAgICAgICAgICAgIC8vIC50ZXh0KGQ9PiBpc05hTihkLnBheW9mZikgPyBkLnBheW9mZiA6IHNlbGYuY29uZmlnLnBheW9mZk51bWJlckZvcm1hdHRlcihkLnBheW9mZikpXG4gICAgICAgICAgICAudGV4dCgoZCwgaSk9PntcbiAgICAgICAgICAgICAgICBpZih0aGlzLmNvbmZpZy5yYXcpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC5wYXlvZmZbaV07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBkLmRpc3BsYXlWYWx1ZSgncGF5b2ZmJyk7XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW1zID0gVXRpbHMuaXNBcnJheShpdGVtKSA/IGl0ZW0gOiBbaXRlbV07XG5cbiAgICAgICAgICAgICAgICBsZXQgdmFsID0gaXRlbXNbaV07XG4gICAgICAgICAgICAgICAgaWYgKHZhbCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzTmFOKHZhbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLmNvbmZpZy5wYXlvZmZOdW1iZXJGb3JtYXR0ZXIodmFsLCBpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoVXRpbHMuaXNTdHJpbmcodmFsKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChkLnBheW9mZltpXSAhPT0gbnVsbCAmJiAhaXNOYU4oZC5wYXlvZmZbaV0pKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5jb25maWcucGF5b2ZmTnVtYmVyRm9ybWF0dGVyKGQucGF5b2ZmW2ldLCBpKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBkLnBheW9mZltpXTtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgVG9vbHRpcC5hdHRhY2gocGF5b2ZmVHNwYW5zTSwgKGQsIGkpPT57XG4gICAgICAgICAgICBpZihzZWxmLmNvbmZpZy5wYXlvZmZOYW1lcy5sZW5ndGg+aSAmJiBzZWxmLmNvbmZpZy5wYXlvZmZOYW1lc1tpXSAhPT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGkxOG4udCgndG9vbHRpcC5lZGdlLnBheW9mZi5uYW1lZCcse3ZhbHVlOiBkLnBheW9mZltpXSwgbnVtYmVyOiBpKzEsIG5hbWU6IHNlbGYuY29uZmlnLnBheW9mZk5hbWVzW2ldfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpMThuLnQoJ3Rvb2x0aXAuZWRnZS5wYXlvZmYuZGVmYXVsdCcse3ZhbHVlOiBkLnBheW9mZltpXSwgbnVtYmVyOiBzZWxmLmNvbmZpZy5tYXhQYXlvZmZzVG9EaXNwbGF5IDwgMiA/ICcnIDogaSsxfSlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIHBheW9mZlRleHRUID0gcGF5b2ZmO1xuICAgICAgICBpZih0aGlzLnRyYW5zaXRpb24pe1xuICAgICAgICAgICAgcGF5b2ZmVGV4dFQgPSBwYXlvZmYudHJhbnNpdGlvbigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubGF5b3V0LmVkZ2VQYXlvZmZQb3NpdGlvbihwYXlvZmZFbnRlcik7XG4gICAgICAgIHRoaXMubGF5b3V0LmVkZ2VQYXlvZmZQb3NpdGlvbihwYXlvZmZUZXh0VCk7XG5cbiAgICAgICAgVG9vbHRpcC5hdHRhY2goZWRnZXNNZXJnZS5zZWxlY3QoJ3RleHQucHJvYmFiaWxpdHknKSwgZD0+aTE4bi50KCd0b29sdGlwLmVkZ2UucHJvYmFiaWxpdHknLHt2YWx1ZTogZC5wcm9iYWJpbGl0eT09PSB1bmRlZmluZWQgPyBkLmRpc3BsYXlQcm9iYWJpbGl0eSgpIDogZC5wcm9iYWJpbGl0eX0pKTtcblxuICAgICAgICBlZGdlc01lcmdlLnNlbGVjdCgndGV4dC5wcm9iYWJpbGl0eScpXG4gICAgICAgICAgICAuY2xhc3NlZCgnc2QtaGlkZGVuJywgdGhpcy5jb25maWcuaGlkZVByb2JhYmlsaXRpZXMpO1xuICAgICAgICB2YXIgcHJvYmFiaWxpdHlNZXJnZSA9IGVkZ2VzTWVyZ2Uuc2VsZWN0KCd0ZXh0LnByb2JhYmlsaXR5Jyk7XG4gICAgICAgIHByb2JhYmlsaXR5TWVyZ2VcbiAgICAgICAgICAgIC5hdHRyKCd0ZXh0LWFuY2hvcicsICdlbmQnKVxuICAgICAgICAgICAgLnRleHQoZD0+e1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuY29uZmlnLnJhdyl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkLnByb2JhYmlsaXR5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgdmFsID0gZC5kaXNwbGF5UHJvYmFiaWxpdHkoKTtcblxuICAgICAgICAgICAgICAgIGlmKHZhbCE9PW51bGwpe1xuICAgICAgICAgICAgICAgICAgICBpZighaXNOYU4odmFsKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5jb25maWcucHJvYmFiaWxpdHlOdW1iZXJGb3JtYXR0ZXIodmFsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZihVdGlscy5pc1N0cmluZyh2YWwpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZihkLnByb2JhYmlsaXR5IT09bnVsbCAmJiAhaXNOYU4oZC5wcm9iYWJpbGl0eSkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLmNvbmZpZy5wcm9iYWJpbGl0eU51bWJlckZvcm1hdHRlcihkLnByb2JhYmlsaXR5KTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBkLnByb2JhYmlsaXR5O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIHZhciBwcm9iYWJpbGl0eU1lcmdlVCA9IHByb2JhYmlsaXR5TWVyZ2U7XG4gICAgICAgIGlmKHRoaXMudHJhbnNpdGlvbil7XG4gICAgICAgICAgICBwcm9iYWJpbGl0eU1lcmdlVCA9IHByb2JhYmlsaXR5TWVyZ2UudHJhbnNpdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sYXlvdXQuZWRnZVByb2JhYmlsaXR5UG9zaXRpb24ocHJvYmFiaWxpdHlFbnRlcik7XG4gICAgICAgIHRoaXMubGF5b3V0LmVkZ2VQcm9iYWJpbGl0eVBvc2l0aW9uKHByb2JhYmlsaXR5TWVyZ2VUKTtcblxuXG4gICAgICAgIGVkZ2VzQ29udGFpbmVyLnNlbGVjdEFsbCgnLmVkZ2UuJytvcHRpbWFsQ2xhc3NOYW1lKS5yYWlzZSgpO1xuXG4gICAgICAgIGVkZ2VzTWVyZ2Uub24oJ2NvbnRleHRtZW51JywgdGhpcy5lZGdlQ29udGV4dE1lbnUpO1xuICAgICAgICBlZGdlc01lcmdlLm9uKCdkYmxjbGljaycsIHRoaXMuZWRnZUNvbnRleHRNZW51KTtcbiAgICAgICAgZWRnZXNNZXJnZS5lYWNoKGZ1bmN0aW9uKGQsIGkpe1xuICAgICAgICAgICAgdmFyIGVsZW0gPSB0aGlzO1xuICAgICAgICAgICAgdmFyIG1jID0gbmV3IEhhbW1lci5NYW5hZ2VyKGVsZW0pO1xuICAgICAgICAgICAgbWMuYWRkKG5ldyBIYW1tZXIuUHJlc3Moe1xuICAgICAgICAgICAgICAgIHBvaW50ZXJUeXBlOiBIYW1tZXIuUE9JTlRFUl9UT1VDSFxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIHJlZHJhd0Zsb2F0aW5nVGV4dHMoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuXG4gICAgICAgIHZhciB0ZXh0c0NvbnRhaW5lciA9IHRoaXMubWFpbkdyb3VwLnNlbGVjdE9yQXBwZW5kKCdnLmZsb2F0aW5nLXRleHRzJyk7XG4gICAgICAgIHZhciB0ZXh0cyA9IHRleHRzQ29udGFpbmVyLnNlbGVjdEFsbCgnLmZsb2F0aW5nLXRleHQnKS5kYXRhKHRoaXMuZGF0YS50ZXh0cywgKGQsaSk9PiBkLmlkKTtcbiAgICAgICAgdGV4dHMuZXhpdCgpLnJlbW92ZSgpO1xuICAgICAgICB2YXIgdGV4dHNFbnRlciA9IHRleHRzLmVudGVyKCkuYXBwZW5kU2VsZWN0b3IoJ2cuZmxvYXRpbmctdGV4dCcpXG4gICAgICAgICAgICAuYXR0cignaWQnLCBkPT4ndGV4dC0nK2QuaWQpO1xuXG5cbiAgICAgICAgdmFyIHJlY3RXaWR0aCA9IDQwO1xuICAgICAgICB2YXIgcmVjdEhlaWdodCA9IDIwO1xuXG4gICAgICAgIHRleHRzRW50ZXIuYXBwZW5kKCdyZWN0JykuYXR0cigneCcsIC01KS5hdHRyKCd5JywgLTE2KS5hdHRyKCdmaWxsLW9wYWNpdHknLCAwKTtcbiAgICAgICAgdGV4dHNFbnRlci5hcHBlbmQoJ3RleHQnKTtcblxuICAgICAgICB2YXIgdGV4dHNNZXJnZSA9IHRleHRzRW50ZXIubWVyZ2UodGV4dHMpO1xuICAgICAgICB2YXIgdGV4dHNNZXJnZVQgPSB0ZXh0c01lcmdlO1xuICAgICAgICBpZih0aGlzLnRyYW5zaXRpb24pe1xuICAgICAgICAgICAgdGV4dHNNZXJnZVQgPSB0ZXh0c01lcmdlLnRyYW5zaXRpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRleHRzTWVyZ2VULmF0dHIoJ3RyYW5zZm9ybScsIGQ9Pid0cmFuc2xhdGUoJyArIGQubG9jYXRpb24ueCArICcgICcgKyBkLmxvY2F0aW9uLnkgKyAnKScpO1xuXG4gICAgICAgIHZhciB0c3BhbnMgPSB0ZXh0c01lcmdlLnNlbGVjdCgndGV4dCcpLnNlbGVjdEFsbCgndHNwYW4nKS5kYXRhKGQ9PmQudmFsdWUgPyBkLnZhbHVlLnNwbGl0KCdcXG4nKSA6IFtdKTtcblxuICAgICAgICB0c3BhbnMuZW50ZXIoKS5hcHBlbmQoJ3RzcGFuJylcbiAgICAgICAgICAgIC5tZXJnZSh0c3BhbnMpXG4gICAgICAgICAgICAuaHRtbChsPT5BcHBVdGlscy5yZXBsYWNlVXJscyhBcHBVdGlscy5lc2NhcGVIdG1sKGwpKSlcbiAgICAgICAgICAgIC5hdHRyKCdkeScsIChkLGkpPT5pPjAgPyAnMS4xZW0nOiB1bmRlZmluZWQpXG4gICAgICAgICAgICAuYXR0cigneCcsICcwJyk7XG5cbiAgICAgICAgdHNwYW5zLmV4aXQoKS5yZW1vdmUoKTtcbiAgICAgICAgdGV4dHNNZXJnZS5jbGFzc2VkKCdzZC1lbXB0eScsIGQ9PiFkLnZhbHVlIHx8ICFkLnZhbHVlLnRyaW0oKSk7XG4gICAgICAgIHRleHRzTWVyZ2Uuc2VsZWN0KCdyZWN0JykuYXR0cignd2lkdGgnLCByZWN0V2lkdGgpLmF0dHIoJ2hlaWdodCcsIHJlY3RIZWlnaHQpO1xuXG4gICAgICAgIHRleHRzTWVyZ2UuZWFjaChmdW5jdGlvbihkKXtcbiAgICAgICAgICAgIGlmKCFkLnZhbHVlKXtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgYmIgPSBkMy5zZWxlY3QodGhpcykuc2VsZWN0KCd0ZXh0Jykubm9kZSgpLmdldEJCb3goKTtcbiAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLnNlbGVjdCgncmVjdCcpXG4gICAgICAgICAgICAgICAuYXR0cigneScsIGJiLnktNSlcbiAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIE1hdGgubWF4KGJiLndpZHRoKzEwLCByZWN0V2lkdGgpKVxuICAgICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIE1hdGgubWF4KGJiLmhlaWdodCsxMCwgcmVjdEhlaWdodCkpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmKHRoaXMudGV4dERyYWdIYW5kbGVyKXtcbiAgICAgICAgICAgIHRleHRzTWVyZ2UuY2FsbCh0aGlzLnRleHREcmFnSGFuZGxlci5kcmFnKTtcbiAgICAgICAgfVxuICAgICAgICB0ZXh0c01lcmdlLm9uKCdjb250ZXh0bWVudScsIHRoaXMudGV4dENvbnRleHRNZW51KTtcbiAgICAgICAgdGV4dHNNZXJnZS5vbignZGJsY2xpY2snLCB0aGlzLnRleHRDb250ZXh0TWVudSk7XG4gICAgICAgIHRleHRzTWVyZ2UuZWFjaChmdW5jdGlvbihkLCBpKXtcbiAgICAgICAgICAgIHZhciBlbGVtID0gdGhpcztcbiAgICAgICAgICAgIHZhciBtYyA9IG5ldyBIYW1tZXIuTWFuYWdlcihlbGVtKTtcbiAgICAgICAgICAgIG1jLmFkZChuZXcgSGFtbWVyLlByZXNzKHtcbiAgICAgICAgICAgICAgICBwb2ludGVyVHlwZTogJ3RvdWNoJ1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9KVxuXG4gICAgfVxuXG4gICAgdXBkYXRlVmFsaWRhdGlvbk1lc3NhZ2VzKCkge1xuICAgICAgICB2YXIgbm9kZXMgPSB0aGlzLm1haW5Hcm91cC5zZWxlY3RBbGwoJy5ub2RlJyk7XG4gICAgICAgIG5vZGVzLmNsYXNzZWQoJ2Vycm9yJywgZmFsc2UpO1xuXG4gICAgICAgIHRoaXMuZGF0YS52YWxpZGF0aW9uUmVzdWx0cy5mb3JFYWNoKHZhbGlkYXRpb25SZXN1bHQ9PntcbiAgICAgICAgICAgIGlmKHZhbGlkYXRpb25SZXN1bHQuaXNWYWxpZCgpKXtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHZhbGlkYXRpb25SZXN1bHQub2JqZWN0SWRUb0Vycm9yKS5mb3JFYWNoKGlkPT57XG4gICAgICAgICAgICAgICAgdmFyIGVycm9ycyA9IHZhbGlkYXRpb25SZXN1bHQub2JqZWN0SWRUb0Vycm9yW2lkXTtcbiAgICAgICAgICAgICAgICB2YXIgbm9kZVNlbGVjdGlvbiA9IHRoaXMuZ2V0Tm9kZUQzU2VsZWN0aW9uQnlJZChpZCk7XG4gICAgICAgICAgICAgICAgbm9kZVNlbGVjdGlvbi5jbGFzc2VkKCdlcnJvcicsIHRydWUpO1xuICAgICAgICAgICAgICAgIHZhciB0b29sdGlwSHRtbCA9ICcnO1xuICAgICAgICAgICAgICAgIGVycm9ycy5mb3JFYWNoKGU9PntcbiAgICAgICAgICAgICAgICAgICAgaWYodG9vbHRpcEh0bWwpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcEh0bWwrPSc8YnIvPidcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwSHRtbCs9QXBwVXRpbHMuZ2V0VmFsaWRhdGlvbk1lc3NhZ2UoZSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBUb29sdGlwLmF0dGFjaChub2RlU2VsZWN0aW9uLnNlbGVjdCgnLmVycm9yLWluZGljYXRvcicpLCB0b29sdGlwSHRtbCk7XG5cblxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICBpbml0RWRnZU1hcmtlcnMoKSB7XG4gICAgICAgIHZhciBkZWZzID0gdGhpcy5zdmcuYXBwZW5kKFwic3ZnOmRlZnNcIik7XG5cbiAgICAgICAgdGhpcy5pbml0QXJyb3dNYXJrZXIoXCJhcnJvd1wiKTtcbiAgICAgICAgdGhpcy5pbml0QXJyb3dNYXJrZXIoXCJhcnJvdy1vcHRpbWFsXCIpO1xuICAgICAgICB0aGlzLmluaXRBcnJvd01hcmtlcihcImFycm93LXNlbGVjdGVkXCIpO1xuICAgIH1cblxuICAgIGluaXRBcnJvd01hcmtlcihpZCkge1xuXG4gICAgICAgIHZhciBkZWZzID0gdGhpcy5zdmcuc2VsZWN0KFwiZGVmc1wiKTtcbiAgICAgICAgZGVmcy5hcHBlbmQoXCJtYXJrZXJcIilcbiAgICAgICAgICAgIC5hdHRyKFwiaWRcIixpZClcbiAgICAgICAgICAgIC5hdHRyKFwidmlld0JveFwiLFwiMCAtNSAxMCAxMFwiKVxuICAgICAgICAgICAgLmF0dHIoXCJyZWZYXCIsNSlcbiAgICAgICAgICAgIC5hdHRyKFwicmVmWVwiLDApXG4gICAgICAgICAgICAuYXR0cihcIm1hcmtlcldpZHRoXCIsNClcbiAgICAgICAgICAgIC5hdHRyKFwibWFya2VySGVpZ2h0XCIsNClcbiAgICAgICAgICAgIC5hdHRyKFwib3JpZW50XCIsXCJhdXRvXCIpXG4gICAgICAgICAgICAuYXBwZW5kKFwicGF0aFwiKVxuICAgICAgICAgICAgLmF0dHIoXCJkXCIsIFwiTTAsLTVMMTAsMEwwLDVcIilcbiAgICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIixcImFycm93SGVhZFwiKTtcbiAgICB9XG5cbiAgICB1cGRhdGVCcnVzaEV4dGVudCgpIHtcbiAgICAgICAgdmFyIHNlbGYgPXRoaXM7XG4gICAgICAgIHRoaXMuYnJ1c2guZXh0ZW50KFtbMCwgMF0sIFtzZWxmLnN2Zy5hdHRyKCd3aWR0aCcpLCBzZWxmLnN2Zy5hdHRyKCdoZWlnaHQnKV1dKTtcbiAgICAgICAgdGhpcy5icnVzaENvbnRhaW5lci5jYWxsKHRoaXMuYnJ1c2gpO1xuICAgIH1cbiAgICBpbml0QnJ1c2goKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICB2YXIgYnJ1c2hDb250YWluZXIgPSBzZWxmLmJydXNoQ29udGFpbmVyID0gdGhpcy5icnVzaENvbnRhaW5lcj0gdGhpcy53cmFwcGVyR3JvdXAuc2VsZWN0T3JJbnNlcnQoXCJnLmJydXNoXCIsIFwiOmZpcnN0LWNoaWxkXCIpXG4gICAgICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwiYnJ1c2hcIik7XG5cbiAgICAgICAgdmFyIGJydXNoID0gdGhpcy5icnVzaCA9IGQzLmJydXNoKClcbiAgICAgICAgICAgIC5vbihcInN0YXJ0XCIsIGJydXNoc3RhcnQpXG4gICAgICAgICAgICAub24oXCJicnVzaFwiLCBicnVzaG1vdmUpXG4gICAgICAgICAgICAub24oXCJlbmRcIiwgYnJ1c2hlbmQpO1xuXG5cblxuICAgICAgICB0aGlzLnVwZGF0ZUJydXNoRXh0ZW50KCk7XG5cbiAgICAgICAgYnJ1c2hDb250YWluZXIuc2VsZWN0KCcub3ZlcmxheScpLm9uKFwibW91c2Vtb3ZlLmVkZ2VTZWxlY3Rpb25cIiwgbW91c2Vtb3ZlZCk7XG4gICAgICAgIGZ1bmN0aW9uIG1vdXNlbW92ZWQoKSB7XG4gICAgICAgICAgICB2YXIgbSA9IGQzLm1vdXNlKHRoaXMpO1xuICAgICAgICAgICAgdmFyIG1ndCA9IHNlbGYuZ2V0TWFpbkdyb3VwVHJhbnNsYXRpb24oKTtcbiAgICAgICAgICAgIHZhciBtYXJnaW4gPSAxMDtcblxuICAgICAgICAgICAgdmFyIGNsb3Nlc3QgPSBbbnVsbCwgOTk5OTk5OTk5XTtcbiAgICAgICAgICAgIHZhciBjbG9zZUVkZ2VzID0gW107XG4gICAgICAgICAgICBzZWxmLm1haW5Hcm91cC5zZWxlY3RBbGwoJy5lZGdlJykuZWFjaChmdW5jdGlvbihkKXtcbiAgICAgICAgICAgICAgICB2YXIgc2VsZWN0aW9uID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICAgICAgICAgIHNlbGVjdGlvbi5jbGFzc2VkKCdzZC1ob3ZlcicsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB2YXIgcGF0aE5vZGUgPSBzZWxlY3Rpb24uc2VsZWN0KCdwYXRoJykubm9kZSgpO1xuICAgICAgICAgICAgICAgIHZhciBiID0gcGF0aE5vZGUuZ2V0QkJveCgpO1xuICAgICAgICAgICAgICAgIGlmKGIueCttZ3RbMF0gPD1tWzBdICYmIGIueCtiLndpZHRoK21ndFswXSA+PSBtWzBdICYmXG4gICAgICAgICAgICAgICAgICAgYi55K21ndFsxXS1tYXJnaW4gPD1tWzFdICYmIGIueStiLmhlaWdodCttZ3RbMV0rbWFyZ2luID49IG1bMV0pe1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBjcCA9IEFwcFV0aWxzLmNsb3Nlc3RQb2ludChwYXRoTm9kZSwgW21bMF0tbWd0WzBdLCBtWzFdLW1ndFsxXV0pO1xuICAgICAgICAgICAgICAgICAgICBpZihjcC5kaXN0YW5jZSA8IG1hcmdpbiAmJiBjcC5kaXN0YW5jZTxjbG9zZXN0WzFdKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlc3QgPSBbc2VsZWN0aW9uLCBjcC5kaXN0YW5jZV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBzZWxmLmhvdmVyZWRFZGdlID0gbnVsbDtcbiAgICAgICAgICAgIGlmKGNsb3Nlc3RbMF0pe1xuICAgICAgICAgICAgICAgIGNsb3Nlc3RbMF0uY2xhc3NlZCgnc2QtaG92ZXInLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBzZWxmLmhvdmVyZWRFZGdlID0gY2xvc2VzdFswXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gYnJ1c2hzdGFydCgpIHtcbiAgICAgICAgICAgIGlmICghZDMuZXZlbnQuc2VsZWN0aW9uKSByZXR1cm47XG4gICAgICAgICAgICBpZihzZWxmLmhvdmVyZWRFZGdlKXtcbiAgICAgICAgICAgICAgICBzZWxmLnNlbGVjdEVkZ2Uoc2VsZi5ob3ZlcmVkRWRnZS5kYXR1bSgpLCB0cnVlKVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgc2VsZi5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgQ29udGV4dE1lbnUuaGlkZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSGlnaGxpZ2h0IHRoZSBzZWxlY3RlZCBub2Rlcy5cbiAgICAgICAgZnVuY3Rpb24gYnJ1c2htb3ZlKCkge1xuICAgICAgICAgICAgdmFyIHMgPSBkMy5ldmVudC5zZWxlY3Rpb247XG4gICAgICAgICAgICBpZighcylyZXR1cm47XG5cbiAgICAgICAgICAgIHNlbGYubWFpbkdyb3VwLnNlbGVjdEFsbChcIi5ub2RlXCIpLmNsYXNzZWQoJ3NlbGVjdGVkJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICB2YXIgbWFpbkdyb3VwVHJhbnNsYXRpb24gPSBzZWxmLmdldE1haW5Hcm91cFRyYW5zbGF0aW9uKCk7XG4gICAgICAgICAgICAgICAgdmFyIHggPSBkLmxvY2F0aW9uLngrbWFpbkdyb3VwVHJhbnNsYXRpb25bMF07XG4gICAgICAgICAgICAgICAgdmFyIHkgPSBkLmxvY2F0aW9uLnkrbWFpbkdyb3VwVHJhbnNsYXRpb25bMV07XG4gICAgICAgICAgICAgICAgdmFyIG5vZGVTaXplID0gc2VsZi5jb25maWcubGF5b3V0Lm5vZGVTaXplO1xuICAgICAgICAgICAgICAgIHZhciBvZmZzZXQgPSBub2RlU2l6ZSowLjI1O1xuICAgICAgICAgICAgICAgIHJldHVybiBzWzBdWzBdIDw9IHgrb2Zmc2V0ICYmIHgtb2Zmc2V0IDw9IHNbMV1bMF1cbiAgICAgICAgICAgICAgICAgICAgJiYgc1swXVsxXSA8PSB5K29mZnNldCAmJiB5LW9mZnNldCA8PSBzWzFdWzFdO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgdGhlIGJydXNoIGlzIGVtcHR5LCBzZWxlY3QgYWxsIGNpcmNsZXMuXG4gICAgICAgIGZ1bmN0aW9uIGJydXNoZW5kKCkge1xuICAgICAgICAgICAgaWYgKCFkMy5ldmVudC5zZWxlY3Rpb24pIHJldHVybjtcbiAgICAgICAgICAgIGJydXNoLm1vdmUoYnJ1c2hDb250YWluZXIsIG51bGwpO1xuXG4gICAgICAgICAgICB2YXIgc2VsZWN0ZWROb2RlcyA9IHNlbGYuZ2V0U2VsZWN0ZWROb2RlcygpO1xuICAgICAgICAgICAgaWYoc2VsZWN0ZWROb2RlcyAmJiBzZWxlY3RlZE5vZGVzLmxlbmd0aCA9PT0gMSl7XG4gICAgICAgICAgICAgICAgc2VsZi5zZWxlY3ROb2RlKHNlbGVjdGVkTm9kZXNbMF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gaWYgKCFkMy5ldmVudC5zZWxlY3Rpb24pIHNlbGYubWFpbkdyb3VwLnNlbGVjdEFsbChcIi5zZWxlY3RlZFwiKS5jbGFzc2VkKCdzZWxlY3RlZCcsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRpc2FibGVCcnVzaCgpe1xuICAgICAgICBpZighdGhpcy5icnVzaERpc2FibGVkKXtcbiAgICAgICAgICAgIEFwcFV0aWxzLmdyb3dsKGkxOG4udCgnZ3Jvd2wuYnJ1c2hEaXNhYmxlZCcpLCAnaW5mbycsICdsZWZ0JylcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmJydXNoRGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmJydXNoQ29udGFpbmVyLnJlbW92ZSgpO1xuICAgIH1cblxuICAgIGVuYWJsZUJydXNoKCl7XG4gICAgICAgIGlmKHRoaXMuYnJ1c2hEaXNhYmxlZCl7XG4gICAgICAgICAgICBBcHBVdGlscy5ncm93bChpMThuLnQoJ2dyb3dsLmJydXNoRW5hYmxlZCcpLCAnaW5mbycsICdsZWZ0JylcbiAgICAgICAgICAgIHRoaXMuaW5pdEJydXNoKCk7XG4gICAgICAgICAgICB0aGlzLmJydXNoRGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuXG5cbiAgICB9XG5cbiAgICBnZXRNYWluR3JvdXBUcmFuc2xhdGlvbihpbnZlcnQpIHtcbiAgICAgICAgdmFyIHRyYW5zbGF0aW9uID0gQXBwVXRpbHMuZ2V0VHJhbnNsYXRpb24odGhpcy5tYWluR3JvdXAuYXR0cihcInRyYW5zZm9ybVwiKSk7XG4gICAgICAgIGlmKGludmVydCl7XG4gICAgICAgICAgICB0cmFuc2xhdGlvblswXSA9IC10cmFuc2xhdGlvblswXTtcbiAgICAgICAgICAgIHRyYW5zbGF0aW9uWzFdID0gLXRyYW5zbGF0aW9uWzFdXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRyYW5zbGF0aW9uO1xuICAgIH1cblxuICAgIGluaXROb2RlQ29udGV4dE1lbnUoKSB7XG4gICAgICAgIHRoaXMubm9kZUNvbnRleHRNZW51ID0gbmV3IE5vZGVDb250ZXh0TWVudSh0aGlzLCB0aGlzLmNvbmZpZy5vcGVyYXRpb25zRm9yT2JqZWN0KTtcbiAgICB9XG5cbiAgICBpbml0RWRnZUNvbnRleHRNZW51KCkge1xuICAgICAgICB0aGlzLmVkZ2VDb250ZXh0TWVudSA9IG5ldyBFZGdlQ29udGV4dE1lbnUodGhpcyk7XG4gICAgfVxuXG4gICAgaW5pdFRleHRDb250ZXh0TWVudSgpIHtcbiAgICAgICAgdGhpcy50ZXh0Q29udGV4dE1lbnUgPSBuZXcgVGV4dENvbnRleHRNZW51KHRoaXMpO1xuICAgIH1cblxuXG5cbiAgICBpbml0TWFpbkNvbnRleHRNZW51KCkge1xuICAgICAgICB0aGlzLm1haW5Db250ZXh0TWVudSA9IG5ldyBNYWluQ29udGV4dE1lbnUodGhpcyk7XG4gICAgICAgIHRoaXMuc3ZnLm9uKCdjb250ZXh0bWVudScsdGhpcy5tYWluQ29udGV4dE1lbnUpO1xuICAgICAgICB0aGlzLnN2Zy5vbignZGJsY2xpY2snLHRoaXMubWFpbkNvbnRleHRNZW51KTtcbiAgICB9XG5cbiAgICBhZGRUZXh0KHRleHQpe1xuICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKCk7XG4gICAgICAgIHRoaXMuZGF0YS5hZGRUZXh0KHRleHQpO1xuICAgICAgICB0aGlzLnJlZHJhdygpO1xuICAgICAgICB0aGlzLnNlbGVjdFRleHQodGV4dCk7XG4gICAgfVxuXG4gICAgYWRkTm9kZShub2RlLCBwYXJlbnQsIHJlZHJhdz1mYWxzZSl7XG4gICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoKTtcbiAgICAgICAgdGhpcy5kYXRhLmFkZE5vZGUobm9kZSwgcGFyZW50KTtcbiAgICAgICAgdGhpcy5yZWRyYXcodHJ1ZSk7XG4gICAgICAgIHRoaXMubGF5b3V0LnVwZGF0ZShub2RlKTtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuXG4gICAgYWRkRGVjaXNpb25Ob2RlKHBhcmVudCl7XG4gICAgICAgIHZhciBuZXdOb2RlID0gbmV3IG1vZGVsLkRlY2lzaW9uTm9kZSh0aGlzLmxheW91dC5nZXROZXdDaGlsZExvY2F0aW9uKHBhcmVudCkpO1xuICAgICAgICB0aGlzLmFkZE5vZGUobmV3Tm9kZSwgcGFyZW50KVxuICAgIH1cbiAgICBhZGRDaGFuY2VOb2RlKHBhcmVudCl7XG4gICAgICAgIHZhciBuZXdOb2RlID0gbmV3IG1vZGVsLkNoYW5jZU5vZGUodGhpcy5sYXlvdXQuZ2V0TmV3Q2hpbGRMb2NhdGlvbihwYXJlbnQpKTtcbiAgICAgICAgdGhpcy5hZGROb2RlKG5ld05vZGUsIHBhcmVudClcbiAgICB9XG4gICAgYWRkVGVybWluYWxOb2RlKHBhcmVudCl7XG4gICAgICAgIHZhciBuZXdOb2RlID0gbmV3IG1vZGVsLlRlcm1pbmFsTm9kZSh0aGlzLmxheW91dC5nZXROZXdDaGlsZExvY2F0aW9uKHBhcmVudCkpO1xuICAgICAgICB0aGlzLmFkZE5vZGUobmV3Tm9kZSwgcGFyZW50KVxuICAgIH1cblxuICAgIGluamVjdE5vZGUobm9kZSwgZWRnZSl7XG4gICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoKTtcbiAgICAgICAgdGhpcy5kYXRhLmluamVjdE5vZGUobm9kZSwgZWRnZSk7XG4gICAgICAgIHRoaXMucmVkcmF3KCk7XG4gICAgICAgIHRoaXMubGF5b3V0LnVwZGF0ZShub2RlKTtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuXG4gICAgaW5qZWN0RGVjaXNpb25Ob2RlKGVkZ2Upe1xuICAgICAgICB2YXIgbmV3Tm9kZSA9IG5ldyBtb2RlbC5EZWNpc2lvbk5vZGUodGhpcy5sYXlvdXQuZ2V0SW5qZWN0ZWROb2RlTG9jYXRpb24oZWRnZSkpO1xuICAgICAgICB0aGlzLmluamVjdE5vZGUobmV3Tm9kZSwgZWRnZSk7XG5cbiAgICB9XG5cbiAgICBpbmplY3RDaGFuY2VOb2RlKGVkZ2Upe1xuICAgICAgICB2YXIgbmV3Tm9kZSA9IG5ldyBtb2RlbC5DaGFuY2VOb2RlKHRoaXMubGF5b3V0LmdldEluamVjdGVkTm9kZUxvY2F0aW9uKGVkZ2UpKTtcbiAgICAgICAgdGhpcy5pbmplY3ROb2RlKG5ld05vZGUsIGVkZ2UpO1xuICAgIH1cblxuICAgIHJlbW92ZU5vZGUobm9kZSkge1xuICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKCk7XG4gICAgICAgIHRoaXMuZGF0YS5yZW1vdmVOb2RlKG5vZGUpO1xuXG5cbiAgICAgICAgaWYoIXRoaXMubGF5b3V0LmlzTWFudWFsTGF5b3V0KCkpe1xuICAgICAgICAgICAgdGhpcy5sYXlvdXQudXBkYXRlKCk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5yZWRyYXcoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbW92ZVNlbGVjdGVkTm9kZXMoKSB7XG4gICAgICAgIHZhciBzZWxlY3RlZE5vZGVzID0gdGhpcy5nZXRTZWxlY3RlZE5vZGVzKCk7XG4gICAgICAgIGlmKCFzZWxlY3RlZE5vZGVzLmxlbmd0aCl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSgpO1xuICAgICAgICB0aGlzLmRhdGEucmVtb3ZlTm9kZXMoc2VsZWN0ZWROb2Rlcyk7XG4gICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgdGhpcy5yZWRyYXcoKTtcbiAgICAgICAgdGhpcy5sYXlvdXQudXBkYXRlKCk7XG4gICAgfVxuXG4gICAgcmVtb3ZlU2VsZWN0ZWRUZXh0cygpe1xuICAgICAgICB2YXIgc2VsZWN0ZWRUZXh0cyA9IHRoaXMuZ2V0U2VsZWN0ZWRUZXh0cygpO1xuXG4gICAgICAgIGlmKCFzZWxlY3RlZFRleHRzLmxlbmd0aCl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSgpO1xuICAgICAgICB0aGlzLmRhdGEucmVtb3ZlVGV4dHMoc2VsZWN0ZWRUZXh0cyk7XG4gICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgdGhpcy5yZWRyYXcoKTtcbiAgICB9XG5cbiAgICBjb3B5Tm9kZShkLCBub3RDbGVhclByZXZTZWxlY3Rpb24pIHtcbiAgICAgICAgdmFyIGNsb25lID0gdGhpcy5kYXRhLmNsb25lU3VidHJlZShkKTtcbiAgICAgICAgaWYobm90Q2xlYXJQcmV2U2VsZWN0aW9uKXtcbiAgICAgICAgICAgIGlmKCF0aGlzLmNvcGllZE5vZGVzKXtcbiAgICAgICAgICAgICAgICB0aGlzLmNvcGllZE5vZGVzPVtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jb3BpZWROb2Rlcy5wdXNoKGNsb25lKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLmNvcGllZE5vZGVzID0gW2Nsb25lXTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgY3V0Tm9kZShkKSB7XG4gICAgICAgIHRoaXMuY29weU5vZGUoZCk7XG4gICAgICAgIHRoaXMucmVtb3ZlTm9kZShkKTtcbiAgICB9XG5cbiAgICBjdXRTZWxlY3RlZE5vZGVzKCl7XG4gICAgICAgIHZhciBzZWxlY3RlZE5vZGVzID0gdGhpcy5nZXRTZWxlY3RlZE5vZGVzKCk7XG4gICAgICAgIHZhciBzZWxlY3RlZFJvb3RzID0gdGhpcy5kYXRhLmZpbmRTdWJ0cmVlUm9vdHMoc2VsZWN0ZWROb2Rlcyk7XG4gICAgICAgIHRoaXMuY29weU5vZGVzKHNlbGVjdGVkUm9vdHMpO1xuICAgICAgICB0aGlzLnJlbW92ZVNlbGVjdGVkTm9kZXMoKTtcbiAgICB9XG5cbiAgICBjb3B5U2VsZWN0ZWROb2RlcygpIHtcbiAgICAgICAgdmFyIHNlbGY7XG4gICAgICAgIHZhciBzZWxlY3RlZE5vZGVzID0gdGhpcy5nZXRTZWxlY3RlZE5vZGVzKCk7XG5cbiAgICAgICAgdmFyIHNlbGVjdGVkUm9vdHMgPSB0aGlzLmRhdGEuZmluZFN1YnRyZWVSb290cyhzZWxlY3RlZE5vZGVzKTtcbiAgICAgICAgdGhpcy5jb3B5Tm9kZXMoc2VsZWN0ZWRSb290cyk7XG5cblxuICAgIH1cblxuICAgIGNvcHlOb2Rlcyhub2Rlcyl7XG4gICAgICAgIHRoaXMuY29waWVkTm9kZXMgPSBub2Rlcy5tYXAoZD0+dGhpcy5kYXRhLmNsb25lU3VidHJlZShkKSk7XG4gICAgfVxuXG5cblxuICAgIHBhc3RlVG9Ob2RlKG5vZGUpIHtcbiAgICAgICAgaWYoIXRoaXMuY29waWVkTm9kZXMgfHwgIXRoaXMuY29waWVkTm9kZXMubGVuZ3RoKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKCk7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgc2VsZi5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICB2YXIgbm9kZXNUb0F0dGFjaCA9IHRoaXMuY29waWVkTm9kZXM7XG4gICAgICAgIHNlbGYuY29weU5vZGVzKHRoaXMuY29waWVkTm9kZXMpO1xuICAgICAgICBub2Rlc1RvQXR0YWNoLmZvckVhY2godG9BdHRhY2g9PntcbiAgICAgICAgICAgIHZhciBhdHRhY2hlZCA9IHRoaXMuZGF0YS5hdHRhY2hTdWJ0cmVlKHRvQXR0YWNoLCBub2RlKS5jaGlsZE5vZGU7XG4gICAgICAgICAgICBpZihhdHRhY2hlZC5mb2xkZWQpe1xuICAgICAgICAgICAgICAgIHNlbGYuZm9sZFN1YnRyZWUoYXR0YWNoZWQsIGF0dGFjaGVkLmZvbGRlZCwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGxvY2F0aW9uID0gc2VsZi5sYXlvdXQuZ2V0TmV3Q2hpbGRMb2NhdGlvbihub2RlKTtcbiAgICAgICAgICAgIGF0dGFjaGVkLm1vdmVUbyhsb2NhdGlvbi54LCBsb2NhdGlvbi55LCB0cnVlKTtcbiAgICAgICAgICAgIHNlbGYubGF5b3V0Lm1vdmVOb2RlVG9FbXB0eVBsYWNlKGF0dGFjaGVkLCBmYWxzZSk7XG4gICAgICAgICAgICBzZWxmLmxheW91dC5maXROb2Rlc0luUGxvdHRpbmdSZWdpb24odGhpcy5kYXRhLmdldEFsbERlc2NlbmRhbnROb2RlcyhhdHRhY2hlZCkpO1xuXG4gICAgICAgICAgICBzZWxmLnNlbGVjdFN1YlRyZWUoYXR0YWNoZWQsIGZhbHNlLCBub2Rlc1RvQXR0YWNoLmxlbmd0aD4xKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYobm9kZS5mb2xkZWQpe1xuICAgICAgICAgICAgc2VsZi5mb2xkU3VidHJlZShub2RlLCBub2RlLmZvbGRlZCwgZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgc2VsZi5yZWRyYXcoKTtcbiAgICAgICAgICAgIHNlbGYubGF5b3V0LnVwZGF0ZSgpO1xuICAgICAgICB9LDEwKVxuXG4gICAgfVxuXG4gICAgcGFzdGVUb05ld0xvY2F0aW9uKHBvaW50KSB7XG4gICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoKTtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBzZWxmLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgIHZhciBub2Rlc1RvQXR0YWNoID0gdGhpcy5jb3BpZWROb2RlcztcbiAgICAgICAgc2VsZi5jb3B5Tm9kZXModGhpcy5jb3BpZWROb2Rlcyk7XG4gICAgICAgIG5vZGVzVG9BdHRhY2guZm9yRWFjaCh0b0F0dGFjaD0+IHtcbiAgICAgICAgICAgIHZhciBhdHRhY2hlZCA9IHRoaXMuZGF0YS5hdHRhY2hTdWJ0cmVlKHRvQXR0YWNoKTtcbiAgICAgICAgICAgIGlmKGF0dGFjaGVkLmZvbGRlZCl7XG4gICAgICAgICAgICAgICAgc2VsZi5mb2xkU3VidHJlZShhdHRhY2hlZCwgYXR0YWNoZWQuZm9sZGVkLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhdHRhY2hlZC5tb3ZlVG8ocG9pbnQueCwgcG9pbnQueSwgdHJ1ZSk7XG4gICAgICAgICAgICBzZWxmLmxheW91dC5tb3ZlTm9kZVRvRW1wdHlQbGFjZShhdHRhY2hlZCwgZmFsc2UpO1xuICAgICAgICAgICAgc2VsZi5sYXlvdXQuZml0Tm9kZXNJblBsb3R0aW5nUmVnaW9uKHRoaXMuZGF0YS5nZXRBbGxEZXNjZW5kYW50Tm9kZXMoYXR0YWNoZWQpKTtcblxuICAgICAgICAgICAgc2VsZi5zZWxlY3RTdWJUcmVlKGF0dGFjaGVkLCBmYWxzZSwgbm9kZXNUb0F0dGFjaC5sZW5ndGg+MSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHNlbGYucmVkcmF3KCk7XG4gICAgICAgICAgICBzZWxmLmxheW91dC51cGRhdGUoKTtcbiAgICAgICAgfSwxMClcblxuICAgIH1cblxuICAgIGNvbnZlcnROb2RlKG5vZGUsIHR5cGVUb0NvbnZlcnRUbyl7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKCk7XG4gICAgICAgIHRoaXMuZGF0YS5jb252ZXJ0Tm9kZShub2RlLCB0eXBlVG9Db252ZXJ0VG8pO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBzZWxmLnJlZHJhdyh0cnVlKTtcbiAgICAgICAgfSwxMClcbiAgICB9XG5cbiAgICBwZXJmb3JtT3BlcmF0aW9uKG9iamVjdCwgb3BlcmF0aW9uKXtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoKTtcbiAgICAgICAgdGhpcy5jb25maWcucGVyZm9ybU9wZXJhdGlvbihvYmplY3QsIG9wZXJhdGlvbikudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgc2VsZi5yZWRyYXcoKTtcbiAgICAgICAgICAgICAgICBzZWxmLmxheW91dC51cGRhdGUoKTtcbiAgICAgICAgICAgIH0sMTApXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZvbGRTdWJ0cmVlKG5vZGUsIGZvbGQgPSB0cnVlLCByZWRyYXc9dHJ1ZSl7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICBub2RlLmZvbGRlZCA9IGZvbGQ7XG5cbiAgICAgICAgdGhpcy5kYXRhLmdldEFsbERlc2NlbmRhbnROb2Rlcyhub2RlKS5mb3JFYWNoKG49PntcbiAgICAgICAgICAgIG4uJGhpZGRlbiA9IGZvbGQ7XG4gICAgICAgICAgICBuLmZvbGRlZCA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5kYXRhLmdldEFsbERlc2NlbmRhbnRFZGdlcyhub2RlKS5mb3JFYWNoKGU9PmUuJGhpZGRlbiA9IGZvbGQpO1xuXG4gICAgICAgIGlmKCFyZWRyYXcpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHNlbGYucmVkcmF3KCk7XG4gICAgICAgICAgICBzZWxmLmxheW91dC51cGRhdGUoKTtcbiAgICAgICAgfSwxMClcbiAgICB9XG5cbiAgICB1cGRhdGVWaXNpYmlsaXR5KG5vZGUgPSBudWxsKXtcbiAgICAgICAgaWYoIW5vZGUpe1xuICAgICAgICAgICAgdGhpcy5kYXRhLmdldFJvb3RzKCkuZm9yRWFjaChuPT50aGlzLnVwZGF0ZVZpc2liaWxpdHkobikpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYobm9kZS5mb2xkZWQpe1xuICAgICAgICAgICAgdGhpcy5mb2xkU3VidHJlZShub2RlLCB0cnVlLCBmYWxzZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBub2RlLmNoaWxkRWRnZXMuZm9yRWFjaChlID0+IHRoaXMudXBkYXRlVmlzaWJpbGl0eShlLmNoaWxkTm9kZSkpO1xuXG4gICAgfVxuXG4gICAgbW92ZU5vZGVUbyh4LHkpe1xuXG4gICAgfVxuXG4gICAgdXBkYXRlTm9kZVBvc2l0aW9uKG5vZGUpIHtcbiAgICAgICAgdGhpcy5nZXROb2RlRDNTZWxlY3Rpb24obm9kZSkucmFpc2UoKS5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcrbm9kZS5sb2NhdGlvbi54KycgJytub2RlLmxvY2F0aW9uLnkrJyknKTtcbiAgICB9XG5cbiAgICB1cGRhdGVUZXh0UG9zaXRpb24odGV4dCkge1xuICAgICAgICB0aGlzLmdldFRleHREM1NlbGVjdGlvbih0ZXh0KS5yYWlzZSgpLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyt0ZXh0LmxvY2F0aW9uLngrJyAnK3RleHQubG9jYXRpb24ueSsnKScpO1xuICAgIH1cblxuICAgIGdldE5vZGVEM1NlbGVjdGlvbihub2RlKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Tm9kZUQzU2VsZWN0aW9uQnlJZChub2RlLmlkKTtcbiAgICB9XG5cbiAgICBnZXROb2RlRDNTZWxlY3Rpb25CeUlkKGlkKXtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFpbkdyb3VwLnNlbGVjdCgnI25vZGUtJytpZCk7XG4gICAgfVxuICAgIGdldFRleHREM1NlbGVjdGlvbih0ZXh0KXtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VGV4dEQzU2VsZWN0aW9uQnlJZCh0ZXh0LmlkKTtcbiAgICB9XG4gICAgZ2V0VGV4dEQzU2VsZWN0aW9uQnlJZChpZCl7XG4gICAgICAgIHJldHVybiB0aGlzLm1haW5Hcm91cC5zZWxlY3QoJyN0ZXh0LScraWQpO1xuICAgIH1cblxuICAgIGdldFNlbGVjdGVkTm9kZXModmlzaWJsZU9ubHkgPSBmYWxzZSkge1xuICAgICAgICBsZXQgc2VsZWN0ZWRWaXNpYmxlID0gdGhpcy5tYWluR3JvdXAuc2VsZWN0QWxsKFwiLm5vZGUuc2VsZWN0ZWRcIikuZGF0YSgpO1xuICAgICAgICBpZih2aXNpYmxlT25seSl7XG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0ZWRWaXNpYmxlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGFsbFNlbGVjdGVkICA9IFtdO1xuICAgICAgICBhbGxTZWxlY3RlZC5wdXNoKC4uLnNlbGVjdGVkVmlzaWJsZSk7XG5cbiAgICAgICAgc2VsZWN0ZWRWaXNpYmxlLmZvckVhY2gobj0+e1xuICAgICAgICAgICAgaWYobi5mb2xkZWQpe1xuICAgICAgICAgICAgICAgIGxldCBkZXNjZW5kYW50cyA9IHRoaXMuZGF0YS5nZXRBbGxEZXNjZW5kYW50Tm9kZXMobik7XG4gICAgICAgICAgICAgICAgaWYoZGVzY2VuZGFudHMpe1xuICAgICAgICAgICAgICAgICAgICBhbGxTZWxlY3RlZC5wdXNoKC4uLmRlc2NlbmRhbnRzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBhbGxTZWxlY3RlZDtcbiAgICB9XG5cbiAgICBnZXRTZWxlY3RlZFRleHRzKCl7XG4gICAgICAgIHJldHVybiB0aGlzLm1haW5Hcm91cC5zZWxlY3RBbGwoXCIuZmxvYXRpbmctdGV4dC5zZWxlY3RlZFwiKS5kYXRhKCk7XG4gICAgfVxuXG4gICAgY2xlYXJTZWxlY3Rpb24oKXtcbiAgICAgICAgdGhpcy5tYWluR3JvdXAuc2VsZWN0QWxsKFwiLmVkZ2Uuc2VsZWN0ZWRcIikuc2VsZWN0KCdwYXRoJykuYXR0cihcIm1hcmtlci1lbmRcIiwgZCA9PiBcInVybCgjYXJyb3dcIisodGhpcy5pc09wdGltYWwoZCk/Jy1vcHRpbWFsJzonJykrXCIpXCIpXG4gICAgICAgIHRoaXMubWFpbkdyb3VwLnNlbGVjdEFsbChcIi5zZWxlY3RlZFwiKS5jbGFzc2VkKCdzZWxlY3RlZCcsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5jb25maWcub25TZWxlY3Rpb25DbGVhcmVkKCk7XG4gICAgfVxuXG4gICAgc2VsZWN0RWRnZShlZGdlLCBjbGVhclNlbGVjdGlvbkJlZm9yZVNlbGVjdCl7XG4gICAgICAgIGlmKGNsZWFyU2VsZWN0aW9uQmVmb3JlU2VsZWN0KXtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbmZpZy5vbkVkZ2VTZWxlY3RlZChlZGdlKTtcbiAgICAgICAgdGhpcy5tYWluR3JvdXAuc2VsZWN0KCcjZWRnZS0nK2VkZ2UuaWQpXG4gICAgICAgICAgICAuY2xhc3NlZCgnc2VsZWN0ZWQnLCB0cnVlKVxuICAgICAgICAgICAgLnNlbGVjdCgncGF0aCcpXG4gICAgICAgICAgICAuYXR0cihcIm1hcmtlci1lbmRcIiwgZCA9PiBcInVybCgjYXJyb3ctc2VsZWN0ZWQpXCIpXG4gICAgfVxuXG4gICAgaXNOb2RlU2VsZWN0ZWQobm9kZSl7XG4gICAgICAgIHJldHVybiB0aGlzLmdldE5vZGVEM1NlbGVjdGlvbihub2RlKS5jbGFzc2VkKCdzZWxlY3RlZCcpO1xuICAgIH1cblxuICAgIHNlbGVjdE5vZGUobm9kZSwgY2xlYXJTZWxlY3Rpb25CZWZvcmVTZWxlY3QsIHNraXBDYWxsYmFjayl7XG4gICAgICAgIGlmKGNsZWFyU2VsZWN0aW9uQmVmb3JlU2VsZWN0KXtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCFza2lwQ2FsbGJhY2spe1xuICAgICAgICAgICAgdGhpcy5jb25maWcub25Ob2RlU2VsZWN0ZWQobm9kZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmdldE5vZGVEM1NlbGVjdGlvbkJ5SWQobm9kZS5pZCkuY2xhc3NlZCgnc2VsZWN0ZWQnLCB0cnVlKTtcbiAgICB9XG5cbiAgICBzZWxlY3RUZXh0KHRleHQsIGNsZWFyU2VsZWN0aW9uQmVmb3JlU2VsZWN0LCBza2lwQ2FsbGJhY2spe1xuICAgICAgICBpZihjbGVhclNlbGVjdGlvbkJlZm9yZVNlbGVjdCl7XG4gICAgICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZighc2tpcENhbGxiYWNrKXtcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLm9uVGV4dFNlbGVjdGVkKHRleHQpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmdldFRleHREM1NlbGVjdGlvbkJ5SWQodGV4dC5pZCkuY2xhc3NlZCgnc2VsZWN0ZWQnLCB0cnVlKTtcbiAgICB9XG5cbiAgICBzZWxlY3RTdWJUcmVlKG5vZGUsIGNsZWFyU2VsZWN0aW9uQmVmb3JlU2VsZWN0LHNraXBDYWxsYmFjaykge1xuICAgICAgICBpZihjbGVhclNlbGVjdGlvbkJlZm9yZVNlbGVjdCl7XG4gICAgICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZWxlY3ROb2RlKG5vZGUsIGZhbHNlLCBza2lwQ2FsbGJhY2spO1xuICAgICAgICBub2RlLmNoaWxkRWRnZXMuZm9yRWFjaChlPT50aGlzLnNlbGVjdFN1YlRyZWUoZS5jaGlsZE5vZGUsIGZhbHNlLCB0cnVlKSk7XG4gICAgfVxuXG4gICAgc2VsZWN0QWxsTm9kZXMoKSB7XG4gICAgICAgIHRoaXMubWFpbkdyb3VwLnNlbGVjdEFsbChcIi5ub2RlXCIpLmNsYXNzZWQoJ3NlbGVjdGVkJywgdHJ1ZSk7XG4gICAgfVxuXG4gICAgYXV0b0xheW91dCh0eXBlLCB3aXRob3V0U3RhdGVTYXZpbmcpe1xuICAgICAgICB0aGlzLmxheW91dC5hdXRvTGF5b3V0KHR5cGUsIHdpdGhvdXRTdGF0ZVNhdmluZyk7XG4gICAgfVxuXG4gICAgdXBkYXRlRGlhZ3JhbVRpdGxlKHRpdGxlVmFsdWUpe1xuICAgICAgICBpZighdGl0bGVWYWx1ZSl7XG4gICAgICAgICAgICB0aXRsZVZhbHVlID0gJyc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kaWFncmFtVGl0bGUgPSB0aXRsZVZhbHVlO1xuICAgICAgICB0aGlzLnJlZHJhd0RpYWdyYW1UaXRsZSgpO1xuICAgICAgICB0aGlzLnJlZHJhd0RpYWdyYW1EZXNjcmlwdGlvbigpO1xuICAgICAgICB0aGlzLnVwZGF0ZU1hcmdpbih0cnVlKTtcbiAgICB9XG5cbiAgICByZWRyYXdEaWFncmFtVGl0bGUoKXtcbiAgICAgICAgdmFyIHN2Z1dpZHRoID0gdGhpcy5zdmcuYXR0cignd2lkdGgnKTtcbiAgICAgICAgdmFyIHN2Z0hlaWdodCA9IHRoaXMuc3ZnLmF0dHIoJ2hlaWdodCcpO1xuICAgICAgICB0aGlzLnRpdGxlQ29udGFpbmVyID0gdGhpcy5zdmcuc2VsZWN0T3JBcHBlbmQoJ2cuc2QtdGl0bGUtY29udGFpbmVyJyk7XG5cbiAgICAgICAgdmFyIHRpdGxlID0gdGhpcy50aXRsZUNvbnRhaW5lci5zZWxlY3RPckFwcGVuZCgndGV4dC5zZC10aXRsZScpO1xuICAgICAgICB0aXRsZS50ZXh0KHRoaXMuZGlhZ3JhbVRpdGxlKTtcbiAgICAgICAgTGF5b3V0LnNldEhhbmdpbmdQb3NpdGlvbih0aXRsZSk7XG5cbiAgICAgICAgdmFyIG1hcmdpblRvcCA9IHBhcnNlSW50KHRoaXMuY29uZmlnLnRpdGxlLm1hcmdpbi50b3ApO1xuICAgICAgICB0aGlzLnRpdGxlQ29udGFpbmVyLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJysoc3ZnV2lkdGgvMikrJywnKyggbWFyZ2luVG9wKSsnKScpO1xuICAgIH1cbiAgICByZWRyYXdEaWFncmFtRGVzY3JpcHRpb24oKXtcbiAgICAgICAgdmFyIHN2Z1dpZHRoID0gdGhpcy5zdmcuYXR0cignd2lkdGgnKTtcbiAgICAgICAgdmFyIHN2Z0hlaWdodCA9IHRoaXMuc3ZnLmF0dHIoJ2hlaWdodCcpO1xuICAgICAgICB0aGlzLnRpdGxlQ29udGFpbmVyID0gdGhpcy5zdmcuc2VsZWN0T3JBcHBlbmQoJ2cuc2QtdGl0bGUtY29udGFpbmVyJyk7XG5cbiAgICAgICAgdmFyIGRlc2MgPSB0aGlzLnRpdGxlQ29udGFpbmVyLnNlbGVjdE9yQXBwZW5kKCd0ZXh0LnNkLWRlc2NyaXB0aW9uJyk7XG5cbiAgICAgICAgaWYoIXRoaXMuY29uZmlnLmRlc2NyaXB0aW9uLnNob3cpe1xuICAgICAgICAgICAgZGVzYy5yZW1vdmUoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBsaW5lcyA9IHRoaXMuZGlhZ3JhbURlc2NyaXB0aW9uID8gdGhpcy5kaWFncmFtRGVzY3JpcHRpb24uc3BsaXQoJ1xcbicpIDogW107XG4gICAgICAgIHZhciB0c3BhbnMgPSBkZXNjLnNlbGVjdEFsbCgndHNwYW4nKS5kYXRhKGxpbmVzKTtcbiAgICAgICAgdHNwYW5zLmVudGVyKCkuYXBwZW5kKCd0c3BhbicpXG4gICAgICAgICAgICAubWVyZ2UodHNwYW5zKVxuICAgICAgICAgICAgLmh0bWwobD0+QXBwVXRpbHMucmVwbGFjZVVybHMoQXBwVXRpbHMuZXNjYXBlSHRtbChsKSkpXG4gICAgICAgICAgICAuYXR0cignZHknLCAoZCxpKT0+aT4wID8gJzEuMWVtJzogdW5kZWZpbmVkKVxuICAgICAgICAgICAgLmF0dHIoJ3gnLCAnMCcpO1xuXG4gICAgICAgIHRzcGFucy5leGl0KCkucmVtb3ZlKCk7XG4gICAgICAgIExheW91dC5zZXRIYW5naW5nUG9zaXRpb24oZGVzYyk7XG5cbiAgICAgICAgdmFyIHRpdGxlID0gdGhpcy50aXRsZUNvbnRhaW5lci5zZWxlY3RPckFwcGVuZCgndGV4dC5zZC10aXRsZScpO1xuXG4gICAgICAgIHZhciBtYXJnaW5Ub3AgPSAwO1xuICAgICAgICBpZih0aGlzLmRpYWdyYW1UaXRsZSl7XG4gICAgICAgICAgICBtYXJnaW5Ub3AgKz0gdGl0bGUubm9kZSgpLmdldEJCb3goKS5oZWlnaHQ7XG4gICAgICAgICAgICBtYXJnaW5Ub3ArPSBNYXRoLm1heChwYXJzZUludCh0aGlzLmNvbmZpZy5kZXNjcmlwdGlvbi5tYXJnaW4udG9wKSwgMCk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGRlc2MuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgwLCcrKCBtYXJnaW5Ub3ApKycpJyk7XG4gICAgfVxuXG4gICAgdXBkYXRlRGlhZ3JhbURlc2NyaXB0aW9uKGRlc2NyaXB0aW9uVmFsdWUpe1xuICAgICAgICBpZighZGVzY3JpcHRpb25WYWx1ZSl7XG4gICAgICAgICAgICBkZXNjcmlwdGlvblZhbHVlID0gJyc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kaWFncmFtRGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvblZhbHVlO1xuICAgICAgICB0aGlzLnJlZHJhd0RpYWdyYW1UaXRsZSgpO1xuICAgICAgICB0aGlzLnJlZHJhd0RpYWdyYW1EZXNjcmlwdGlvbigpO1xuICAgICAgICB0aGlzLnVwZGF0ZU1hcmdpbih0cnVlKTtcbiAgICB9XG5cblxuICAgIGdldFRpdGxlR3JvdXBIZWlnaHQod2l0aE1hcmdpbnMpe1xuICAgICAgICBpZighdGhpcy50aXRsZUNvbnRhaW5lcil7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaCA9IHRoaXMudGl0bGVDb250YWluZXIubm9kZSgpLmdldEJCb3goKS5oZWlnaHQ7XG4gICAgICAgIGlmKHdpdGhNYXJnaW5zKXtcbiAgICAgICAgICAgIGgrPSBwYXJzZUludCh0aGlzLmNvbmZpZy50aXRsZS5tYXJnaW4uYm90dG9tKTtcbiAgICAgICAgICAgIGgrPSBwYXJzZUludCh0aGlzLmNvbmZpZy50aXRsZS5tYXJnaW4udG9wKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaDtcbiAgICB9XG5cbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vc3JjL2luZGV4J1xuIl19
