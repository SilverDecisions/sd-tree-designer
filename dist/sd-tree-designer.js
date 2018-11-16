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

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};

    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};

          if (desc.get || desc.set) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
    }

    newObj.default = obj;
    return newObj;
  }
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

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};

    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};

          if (desc.get || desc.set) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
    }

    newObj.default = obj;
    return newObj;
  }
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

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};

    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};

          if (desc.get || desc.set) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
    }

    newObj.default = obj;
    return newObj;
  }
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

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};

    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};

          if (desc.get || desc.set) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
    }

    newObj.default = obj;
    return newObj;
  }
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

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};

    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};

          if (desc.get || desc.set) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
    }

    newObj.default = obj;
    return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
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
    return _d.default;
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
    default: obj
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
    default: obj
  };
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};

    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};

          if (desc.get || desc.set) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
    }

    newObj.default = obj;
    return newObj;
  }
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

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};

    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};

          if (desc.get || desc.set) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
    }

    newObj.default = obj;
    return newObj;
  }
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

      self.ignoredDrag = false; // self.treeDesigner.layout.disableAutoLayout();

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

      if (self.dragEventCount == 2) {
        self.data.saveState();
      }

      self.dragEventCount++;

      if (self.selectedNodes.length > 5 && self.dragEventCount % 2 != 1) {
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

},{}],19:[function(require,module,exports){
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

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};

    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};

          if (desc.get || desc.set) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
    }

    newObj.default = obj;
    return newObj;
  }
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

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};

    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};

          if (desc.get || desc.set) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
    }

    newObj.default = obj;
    return newObj;
  }
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

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};

    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};

          if (desc.get || desc.set) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
    }

    newObj.default = obj;
    return newObj;
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLXV0aWxzLmpzIiwic3JjL2NvbnRleHQtbWVudS9jb250ZXh0LW1lbnUuanMiLCJzcmMvY29udGV4dC1tZW51L2VkZ2UtY29udGV4dC1tZW51LmpzIiwic3JjL2NvbnRleHQtbWVudS9tYWluLWNvbnRleHQtbWVudS5qcyIsInNyYy9jb250ZXh0LW1lbnUvbm9kZS1jb250ZXh0LW1lbnUuanMiLCJzcmMvY29udGV4dC1tZW51L3RleHQtY29udGV4dC1tZW51LmpzIiwic3JjL2QzLWV4dGVuc2lvbnMuanMiLCJzcmMvZDMuanMiLCJzcmMvaTE4bi9kZS5qc29uIiwic3JjL2kxOG4vZW4uanNvbiIsInNyYy9pMThuL2ZyLmpzb24iLCJzcmMvaTE4bi9pMThuLmpzIiwic3JjL2kxOG4vaXQuanNvbiIsInNyYy9pMThuL3BsLmpzb24iLCJzcmMvaW5kZXguanMiLCJzcmMvbGF5b3V0LmpzIiwic3JjL25vZGUtZHJhZy1oYW5kbGVyLmpzIiwic3JjL3N5bWJvbHMvY2lyY2xlLmpzIiwic3JjL3N5bWJvbHMvdHJpYW5nbGUuanMiLCJzcmMvdGVtcGxhdGVzLmpzIiwic3JjL3RlbXBsYXRlcy9ncm93bF9tZXNzYWdlLmh0bWwiLCJzcmMvdGV4dC1kcmFnLWhhbmRsZXIuanMiLCJzcmMvdG9vbHRpcC5qcyIsInNyYy90cmVlLWRlc2lnbmVyLmpzIiwiaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FDQUEsSUFBQSxFQUFBLEdBQUEsdUJBQUEsQ0FBQSxPQUFBLENBQUEsTUFBQSxDQUFBLENBQUE7O0FBQ0EsSUFBQSxVQUFBLEdBQUEsT0FBQSxDQUFBLGFBQUEsQ0FBQTs7QUFDQSxJQUFBLEtBQUEsR0FBQSxPQUFBLENBQUEsYUFBQSxDQUFBOztBQUNBLElBQUEsUUFBQSxHQUFBLE9BQUEsQ0FBQSxVQUFBLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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LFNBQUE7QUFDSDs7Ozs7Ozs7Ozs7Ozs7O0FDekVMLElBQUEsV0FBQSxHQUFBLE9BQUEsQ0FBQSxhQUFBLENBQUE7O0FBQUEsTUFBQSxDQUFBLElBQUEsQ0FBQSxXQUFBLEVBQUEsT0FBQSxDQUFBLFVBQUEsR0FBQSxFQUFBO0FBQUEsTUFBQSxHQUFBLEtBQUEsU0FBQSxJQUFBLEdBQUEsS0FBQSxZQUFBLEVBQUE7QUFBQSxFQUFBLE1BQUEsQ0FBQSxjQUFBLENBQUEsT0FBQSxFQUFBLEdBQUEsRUFBQTtBQUFBLElBQUEsVUFBQSxFQUFBLElBQUE7QUFBQSxJQUFBLEdBQUEsRUFBQSxTQUFBLEdBQUEsR0FBQTtBQUFBLGFBQUEsV0FBQSxDQUFBLEdBQUEsQ0FBQTtBQUFBO0FBQUEsR0FBQTtBQUFBLENBQUE7O0FBQ0EsSUFBQSxRQUFBLEdBQUEsT0FBQSxDQUFBLFVBQUEsQ0FBQTs7QUFBQSxNQUFBLENBQUEsSUFBQSxDQUFBLFFBQUEsRUFBQSxPQUFBLENBQUEsVUFBQSxHQUFBLEVBQUE7QUFBQSxNQUFBLEdBQUEsS0FBQSxTQUFBLElBQUEsR0FBQSxLQUFBLFlBQUEsRUFBQTtBQUFBLEVBQUEsTUFBQSxDQUFBLGNBQUEsQ0FBQSxPQUFBLEVBQUEsR0FBQSxFQUFBO0FBQUEsSUFBQSxVQUFBLEVBQUEsSUFBQTtBQUFBLElBQUEsR0FBQSxFQUFBLFNBQUEsR0FBQSxHQUFBO0FBQUEsYUFBQSxRQUFBLENBQUEsR0FBQSxDQUFBO0FBQUE7QUFBQSxHQUFBO0FBQUEsQ0FBQTs7QUFDQSxJQUFBLFlBQUEsR0FBQSxPQUFBLENBQUEsY0FBQSxDQUFBOztBQUFBLE1BQUEsQ0FBQSxJQUFBLENBQUEsWUFBQSxFQUFBLE9BQUEsQ0FBQSxVQUFBLEdBQUEsRUFBQTtBQUFBLE1BQUEsR0FBQSxLQUFBLFNBQUEsSUFBQSxHQUFBLEtBQUEsWUFBQSxFQUFBO0FBQUEsRUFBQSxNQUFBLENBQUEsY0FBQSxDQUFBLE9BQUEsRUFBQSxHQUFBLEVBQUE7QUFBQSxJQUFBLFVBQUEsRUFBQSxJQUFBO0FBQUEsSUFBQSxHQUFBLEVBQUEsU0FBQSxHQUFBLEdBQUE7QUFBQSxhQUFBLFlBQUEsQ0FBQSxHQUFBLENBQUE7QUFBQTtBQUFBLEdBQUE7QUFBQSxDQUFBOztBQUNBLElBQUEsUUFBQSxHQUFBLE9BQUEsQ0FBQSxVQUFBLENBQUE7O0FBQUEsTUFBQSxDQUFBLElBQUEsQ0FBQSxRQUFBLEVBQUEsT0FBQSxDQUFBLFVBQUEsR0FBQSxFQUFBO0FBQUEsTUFBQSxHQUFBLEtBQUEsU0FBQSxJQUFBLEdBQUEsS0FBQSxZQUFBLEVBQUE7QUFBQSxFQUFBLE1BQUEsQ0FBQSxjQUFBLENBQUEsT0FBQSxFQUFBLEdBQUEsRUFBQTtBQUFBLElBQUEsVUFBQSxFQUFBLElBQUE7QUFBQSxJQUFBLEdBQUEsRUFBQSxTQUFBLEdBQUEsR0FBQTtBQUFBLGFBQUEsUUFBQSxDQUFBLEdBQUEsQ0FBQTtBQUFBO0FBQUEsR0FBQTtBQUFBLENBQUE7O0FBQ0EsSUFBQSxPQUFBLEdBQUEsT0FBQSxDQUFBLFNBQUEsQ0FBQTs7QUFBQSxNQUFBLENBQUEsSUFBQSxDQUFBLE9BQUEsRUFBQSxPQUFBLENBQUEsVUFBQSxHQUFBLEVBQUE7QUFBQSxNQUFBLEdBQUEsS0FBQSxTQUFBLElBQUEsR0FBQSxLQUFBLFlBQUEsRUFBQTtBQUFBLEVBQUEsTUFBQSxDQUFBLGNBQUEsQ0FBQSxPQUFBLEVBQUEsR0FBQSxFQUFBO0FBQUEsSUFBQSxVQUFBLEVBQUEsSUFBQTtBQUFBLElBQUEsR0FBQSxFQUFBLFNBQUEsR0FBQSxHQUFBO0FBQUEsYUFBQSxPQUFBLENBQUEsR0FBQSxDQUFBO0FBQUE7QUFBQSxHQUFBO0FBQUEsQ0FBQTs7QUFDQSxJQUFBLFFBQUEsR0FBQSxPQUFBLENBQUEsVUFBQSxDQUFBOztBQUFBLE1BQUEsQ0FBQSxJQUFBLENBQUEsUUFBQSxFQUFBLE9BQUEsQ0FBQSxVQUFBLEdBQUEsRUFBQTtBQUFBLE1BQUEsR0FBQSxLQUFBLFNBQUEsSUFBQSxHQUFBLEtBQUEsWUFBQSxFQUFBO0FBQUEsRUFBQSxNQUFBLENBQUEsY0FBQSxDQUFBLE9BQUEsRUFBQSxHQUFBLEVBQUE7QUFBQSxJQUFBLFVBQUEsRUFBQSxJQUFBO0FBQUEsSUFBQSxHQUFBLEVBQUEsU0FBQSxHQUFBLEdBQUE7QUFBQSxhQUFBLFFBQUEsQ0FBQSxHQUFBLENBQUE7QUFBQTtBQUFBLEdBQUE7QUFBQSxDQUFBOztBQUNBLElBQUEsUUFBQSxHQUFBLE9BQUEsQ0FBQSxVQUFBLENBQUE7O0FBQUEsTUFBQSxDQUFBLElBQUEsQ0FBQSxRQUFBLEVBQUEsT0FBQSxDQUFBLFVBQUEsR0FBQSxFQUFBO0FBQUEsTUFBQSxHQUFBLEtBQUEsU0FBQSxJQUFBLEdBQUEsS0FBQSxZQUFBLEVBQUE7QUFBQSxFQUFBLE1BQUEsQ0FBQSxjQUFBLENBQUEsT0FBQSxFQUFBLEdBQUEsRUFBQTtBQUFBLElBQUEsVUFBQSxFQUFBLElBQUE7QUFBQSxJQUFBLEdBQUEsRUFBQSxTQUFBLEdBQUEsR0FBQTtBQUFBLGFBQUEsUUFBQSxDQUFBLEdBQUEsQ0FBQTtBQUFBO0FBQUEsR0FBQTtBQUFBLENBQUE7O0FBQ0EsSUFBQSxZQUFBLEdBQUEsT0FBQSxDQUFBLGNBQUEsQ0FBQTs7QUFBQSxNQUFBLENBQUEsSUFBQSxDQUFBLFlBQUEsRUFBQSxPQUFBLENBQUEsVUFBQSxHQUFBLEVBQUE7QUFBQSxNQUFBLEdBQUEsS0FBQSxTQUFBLElBQUEsR0FBQSxLQUFBLFlBQUEsRUFBQTtBQUFBLEVBQUEsTUFBQSxDQUFBLGNBQUEsQ0FBQSxPQUFBLEVBQUEsR0FBQSxFQUFBO0FBQUEsSUFBQSxVQUFBLEVBQUEsSUFBQTtBQUFBLElBQUEsR0FBQSxFQUFBLFNBQUEsR0FBQSxHQUFBO0FBQUEsYUFBQSxZQUFBLENBQUEsR0FBQSxDQUFBO0FBQUE7QUFBQSxHQUFBO0FBQUEsQ0FBQTs7QUFDQSxJQUFBLGFBQUEsR0FBQSxPQUFBLENBQUEsZ0JBQUEsQ0FBQTs7QUFBQSxNQUFBLENBQUEsSUFBQSxDQUFBLGFBQUEsRUFBQSxPQUFBLENBQUEsVUFBQSxHQUFBLEVBQUE7QUFBQSxNQUFBLEdBQUEsS0FBQSxTQUFBLElBQUEsR0FBQSxLQUFBLFlBQUEsRUFBQTtBQUFBLEVBQUEsTUFBQSxDQUFBLGNBQUEsQ0FBQSxPQUFBLEVBQUEsR0FBQSxFQUFBO0FBQUEsSUFBQSxVQUFBLEVBQUEsSUFBQTtBQUFBLElBQUEsR0FBQSxFQUFBLFNBQUEsR0FBQSxHQUFBO0FBQUEsYUFBQSxhQUFBLENBQUEsR0FBQSxDQUFBO0FBQUE7QUFBQSxHQUFBO0FBQUEsQ0FBQTs7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUNsRUEsSUFBQSxRQUFBLEdBQUEsc0JBQUEsQ0FBQSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQUE7O0FBQ0EsSUFBQSxFQUFBLEdBQUEsdUJBQUEsQ0FBQSxPQUFBLENBQUEsV0FBQSxDQUFBLENBQUE7O0FBQ0EsSUFBQSxFQUFBLEdBQUEsdUJBQUEsQ0FBQSxPQUFBLENBQUEsV0FBQSxDQUFBLENBQUE7O0FBQ0EsSUFBQSxFQUFBLEdBQUEsdUJBQUEsQ0FBQSxPQUFBLENBQUEsV0FBQSxDQUFBLENBQUE7O0FBQ0EsSUFBQSxFQUFBLEdBQUEsdUJBQUEsQ0FBQSxPQUFBLENBQUEsV0FBQSxDQUFBLENBQUE7O0FBQ0EsSUFBQSxFQUFBLEdBQUEsdUJBQUEsQ0FBQSxPQUFBLENBQUEsV0FBQSxDQUFBLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFYSxJOzs7Ozs7Ozs7eUJBS0csRyxFQUFJO0FBQ1osTUFBQSxJQUFJLENBQUosUUFBQSxHQUFBLEdBQUE7QUFDQSxVQUFJLFNBQVMsR0FBRztBQUNaLFFBQUEsRUFBRSxFQUFFO0FBQ0EsVUFBQSxXQUFXLEVBQUU7QUFEYixTQURRO0FBSVosUUFBQSxFQUFFLEVBQUU7QUFDQSxVQUFBLFdBQVcsRUFBRTtBQURiLFNBSlE7QUFPWixRQUFBLEVBQUUsRUFBRTtBQUNBLFVBQUEsV0FBVyxFQUFFO0FBRGIsU0FQUTtBQVVaLFFBQUEsRUFBRSxFQUFFO0FBQ0EsVUFBQSxXQUFXLEVBQUU7QUFEYixTQVZRO0FBYVosUUFBQSxFQUFFLEVBQUU7QUFDQSxVQUFBLFdBQVcsRUFBRTtBQURiO0FBYlEsT0FBaEI7QUFpQkEsTUFBQSxJQUFJLENBQUosU0FBQSxHQUFpQixRQUFBLENBQUEsT0FBQSxDQUFBLGNBQUEsQ0FBdUI7QUFDcEMsUUFBQSxHQUFHLEVBRGlDLEdBQUE7QUFFcEMsUUFBQSxXQUFXLEVBRnlCLElBQUE7QUFHcEMsUUFBQSxTQUFTLEVBQUU7QUFIeUIsT0FBdkIsRUFJZCxVQUFBLEdBQUEsRUFBQSxDQUFBLEVBQVksQ0FKZixDQUFpQixDQUFqQjtBQU1IOzs7c0JBRVEsRyxFQUFLLEcsRUFBSTtBQUNkLGFBQU8sSUFBSSxDQUFKLFNBQUEsQ0FBQSxDQUFBLENBQUEsR0FBQSxFQUFQLEdBQU8sQ0FBUDtBQUNIOzs7Ozs7Ozs7QUN6Q0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwRUEsSUFBQSxhQUFBLEdBQUEsT0FBQSxDQUFBLGlCQUFBLENBQUE7O0FBT0EsTUFBQSxDQUFBLElBQUEsQ0FBQSxhQUFBLEVBQUEsT0FBQSxDQUFBLFVBQUEsR0FBQSxFQUFBO0FBQUEsTUFBQSxHQUFBLEtBQUEsU0FBQSxJQUFBLEdBQUEsS0FBQSxZQUFBLEVBQUE7QUFBQSxNQUFBLE1BQUEsQ0FBQSxTQUFBLENBQUEsY0FBQSxDQUFBLElBQUEsQ0FBQSxZQUFBLEVBQUEsR0FBQSxDQUFBLEVBQUE7QUFBQSxFQUFBLE1BQUEsQ0FBQSxjQUFBLENBQUEsT0FBQSxFQUFBLEdBQUEsRUFBQTtBQUFBLElBQUEsVUFBQSxFQUFBLElBQUE7QUFBQSxJQUFBLEdBQUEsRUFBQSxTQUFBLEdBQUEsR0FBQTtBQUFBLGFBQUEsYUFBQSxDQUFBLEdBQUEsQ0FBQTtBQUFBO0FBQUEsR0FBQTtBQUFBLENBQUE7O0FBSkEsSUFBQSxhQUFBLEdBQUEsT0FBQSxDQUFBLGlCQUFBLENBQUE7O0FBQUEsTUFBQSxDQUFBLElBQUEsQ0FBQSxhQUFBLEVBQUEsT0FBQSxDQUFBLFVBQUEsR0FBQSxFQUFBO0FBQUEsTUFBQSxHQUFBLEtBQUEsU0FBQSxJQUFBLEdBQUEsS0FBQSxZQUFBLEVBQUE7QUFBQSxNQUFBLE1BQUEsQ0FBQSxTQUFBLENBQUEsY0FBQSxDQUFBLElBQUEsQ0FBQSxZQUFBLEVBQUEsR0FBQSxDQUFBLEVBQUE7QUFBQSxFQUFBLE1BQUEsQ0FBQSxjQUFBLENBQUEsT0FBQSxFQUFBLEdBQUEsRUFBQTtBQUFBLElBQUEsVUFBQSxFQUFBLElBQUE7QUFBQSxJQUFBLEdBQUEsRUFBQSxTQUFBLEdBQUEsR0FBQTtBQUFBLGFBQUEsYUFBQSxDQUFBLEdBQUEsQ0FBQTtBQUFBO0FBQUEsR0FBQTtBQUFBLENBQUE7O0FBQ0EsSUFBQSxTQUFBLEdBQUEsT0FBQSxDQUFBLGFBQUEsQ0FBQTs7QUFBQSxNQUFBLENBQUEsSUFBQSxDQUFBLFNBQUEsRUFBQSxPQUFBLENBQUEsVUFBQSxHQUFBLEVBQUE7QUFBQSxNQUFBLEdBQUEsS0FBQSxTQUFBLElBQUEsR0FBQSxLQUFBLFlBQUEsRUFBQTtBQUFBLE1BQUEsTUFBQSxDQUFBLFNBQUEsQ0FBQSxjQUFBLENBQUEsSUFBQSxDQUFBLFlBQUEsRUFBQSxHQUFBLENBQUEsRUFBQTtBQUFBLEVBQUEsTUFBQSxDQUFBLGNBQUEsQ0FBQSxPQUFBLEVBQUEsR0FBQSxFQUFBO0FBQUEsSUFBQSxVQUFBLEVBQUEsSUFBQTtBQUFBLElBQUEsR0FBQSxFQUFBLFNBQUEsR0FBQSxHQUFBO0FBQUEsYUFBQSxTQUFBLENBQUEsR0FBQSxDQUFBO0FBQUE7QUFBQSxHQUFBO0FBQUEsQ0FBQTs7QUFDQSxJQUFBLFVBQUEsR0FBQSxPQUFBLENBQUEsYUFBQSxDQUFBOztBQUFBLE1BQUEsQ0FBQSxJQUFBLENBQUEsVUFBQSxFQUFBLE9BQUEsQ0FBQSxVQUFBLEdBQUEsRUFBQTtBQUFBLE1BQUEsR0FBQSxLQUFBLFNBQUEsSUFBQSxHQUFBLEtBQUEsWUFBQSxFQUFBO0FBQUEsTUFBQSxNQUFBLENBQUEsU0FBQSxDQUFBLGNBQUEsQ0FBQSxJQUFBLENBQUEsWUFBQSxFQUFBLEdBQUEsQ0FBQSxFQUFBO0FBQUEsRUFBQSxNQUFBLENBQUEsY0FBQSxDQUFBLE9BQUEsRUFBQSxHQUFBLEVBQUE7QUFBQSxJQUFBLFVBQUEsRUFBQSxJQUFBO0FBQUEsSUFBQSxHQUFBLEVBQUEsU0FBQSxHQUFBLEdBQUE7QUFBQSxhQUFBLFVBQUEsQ0FBQSxHQUFBLENBQUE7QUFBQTtBQUFBLEdBQUE7QUFBQSxDQUFBOztBQUNBLElBQUEsUUFBQSxHQUFBLE9BQUEsQ0FBQSxXQUFBLENBQUE7O0FBQUEsTUFBQSxDQUFBLElBQUEsQ0FBQSxRQUFBLEVBQUEsT0FBQSxDQUFBLFVBQUEsR0FBQSxFQUFBO0FBQUEsTUFBQSxHQUFBLEtBQUEsU0FBQSxJQUFBLEdBQUEsS0FBQSxZQUFBLEVBQUE7QUFBQSxNQUFBLE1BQUEsQ0FBQSxTQUFBLENBQUEsY0FBQSxDQUFBLElBQUEsQ0FBQSxZQUFBLEVBQUEsR0FBQSxDQUFBLEVBQUE7QUFBQSxFQUFBLE1BQUEsQ0FBQSxjQUFBLENBQUEsT0FBQSxFQUFBLEdBQUEsRUFBQTtBQUFBLElBQUEsVUFBQSxFQUFBLElBQUE7QUFBQSxJQUFBLEdBQUEsRUFBQSxTQUFBLEdBQUEsR0FBQTtBQUFBLGFBQUEsUUFBQSxDQUFBLEdBQUEsQ0FBQTtBQUFBO0FBQUEsR0FBQTtBQUFBLENBQUE7O0FBRUEsSUFBQSxFQUFBLEdBQUEsc0JBQUEsQ0FBQSxPQUFBLENBQUEsTUFBQSxDQUFBLENBQUE7Ozs7Ozs7O0FBUEEsYUFBQSxDQUFBLFlBQUEsQ0FBQSxNQUFBOzs7Ozs7Ozs7O0FDREEsSUFBQSxRQUFBLEdBQUEsT0FBQSxDQUFBLFVBQUEsQ0FBQTs7QUFDQSxJQUFBLFFBQUEsR0FBQSxPQUFBLENBQUEsVUFBQSxDQUFBOztBQUNBLElBQUEsRUFBQSxHQUFBLHVCQUFBLENBQUEsT0FBQSxDQUFBLE1BQUEsQ0FBQSxDQUFBOztBQUNBLElBQUEsT0FBQSxHQUFBLHNCQUFBLENBQUEsT0FBQSxDQUFBLGtCQUFBLENBQUEsQ0FBQTs7QUFDQSxJQUFBLFNBQUEsR0FBQSxzQkFBQSxDQUFBLE9BQUEsQ0FBQSxvQkFBQSxDQUFBLENBQUE7O0FBQ0EsSUFBQSxTQUFBLEdBQUEsT0FBQSxDQUFBLGFBQUEsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7OztJQUNhLE07OztBQTJCVCxXQUFBLE1BQUEsQ0FBQSxZQUFBLEVBQUEsSUFBQSxF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QUFDNUIsVUFBRyxDQUFDLEtBQUosY0FBQSxFQUF3QjtBQUNwQixlQUFBLENBQUE7QUFDSDs7QUFDRCxVQUFJLENBQUMsR0FBRyxLQUFBLGNBQUEsQ0FBQSxJQUFBLEdBQUEsT0FBQSxHQUFSLE1BQUE7O0FBQ0EsVUFBQSxXQUFBLEVBQWU7QUFDWCxRQUFBLENBQUMsSUFBRyxRQUFRLENBQUMsS0FBQSxNQUFBLENBQUEsS0FBQSxDQUFBLE1BQUEsQ0FBYixNQUFZLENBQVo7QUFDQSxRQUFBLENBQUMsSUFBRyxRQUFRLENBQUMsS0FBQSxNQUFBLENBQUEsS0FBQSxDQUFBLE1BQUEsQ0FBYixHQUFZLENBQVo7QUFDSDs7QUFDRCxhQUFBLENBQUE7QUFDSDs7Ozs7Ozs7Ozs7Ozs7O0FDajdDTCxJQUFBLE1BQUEsR0FBQSxPQUFBLENBQUEsYUFBQSxDQUFBOztBQUFBLE1BQUEsQ0FBQSxJQUFBLENBQUEsTUFBQSxFQUFBLE9BQUEsQ0FBQSxVQUFBLEdBQUEsRUFBQTtBQUFBLE1BQUEsR0FBQSxLQUFBLFNBQUEsSUFBQSxHQUFBLEtBQUEsWUFBQSxFQUFBO0FBQUEsRUFBQSxNQUFBLENBQUEsY0FBQSxDQUFBLE9BQUEsRUFBQSxHQUFBLEVBQUE7QUFBQSxJQUFBLFVBQUEsRUFBQSxJQUFBO0FBQUEsSUFBQSxHQUFBLEVBQUEsU0FBQSxHQUFBLEdBQUE7QUFBQSxhQUFBLE1BQUEsQ0FBQSxHQUFBLENBQUE7QUFBQTtBQUFBLEdBQUE7QUFBQSxDQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0ICogYXMgZDMgZnJvbSBcIi4vZDNcIjtcbmltcG9ydCB7VGVtcGxhdGVzfSBmcm9tIFwiLi90ZW1wbGF0ZXNcIjtcbmltcG9ydCB7aTE4bn0gZnJvbSBcIi4vaTE4bi9pMThuXCI7XG5pbXBvcnQge1V0aWxzfSBmcm9tIFwic2QtdXRpbHNcIjtcblxuZXhwb3J0IGNsYXNzIEFwcFV0aWxzIHtcblxuICAgIHN0YXRpYyBzYW5pdGl6ZUhlaWdodCA9IGZ1bmN0aW9uIChoZWlnaHQsIGNvbnRhaW5lcikge1xuICAgICAgICByZXR1cm4gKGhlaWdodCB8fCBwYXJzZUludChjb250YWluZXIuc3R5bGUoJ2hlaWdodCcpLCAxMCkgfHwgNDAwKTtcbiAgICB9O1xuXG4gICAgc3RhdGljIHNhbml0aXplV2lkdGggPSBmdW5jdGlvbiAod2lkdGgsIGNvbnRhaW5lcikge1xuICAgICAgICByZXR1cm4gKHdpZHRoIHx8IHBhcnNlSW50KGNvbnRhaW5lci5zdHlsZSgnd2lkdGgnKSwgMTApIHx8IDk2MCk7XG4gICAgfTtcblxuICAgIHN0YXRpYyBhdmFpbGFibGVIZWlnaHQgPSBmdW5jdGlvbiAoaGVpZ2h0LCBjb250YWluZXIsIG1hcmdpbikge1xuICAgICAgICByZXR1cm4gTWF0aC5tYXgoMCwgQXBwVXRpbHMuc2FuaXRpemVIZWlnaHQoaGVpZ2h0LCBjb250YWluZXIpIC0gbWFyZ2luLnRvcCAtIG1hcmdpbi5ib3R0b20pO1xuICAgIH07XG5cbiAgICBzdGF0aWMgYXZhaWxhYmxlV2lkdGggPSBmdW5jdGlvbiAod2lkdGgsIGNvbnRhaW5lciwgbWFyZ2luKSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1heCgwLCBBcHBVdGlscy5zYW5pdGl6ZVdpZHRoKHdpZHRoLCBjb250YWluZXIpIC0gbWFyZ2luLmxlZnQgLSBtYXJnaW4ucmlnaHQpO1xuICAgIH07XG5cbiAgICAvL3BsYWNlcyB0ZXh0U3RyaW5nIGluIHRleHRPYmosIGFkZHMgYW4gZWxsaXBzaXMgaWYgdGV4dCBjYW4ndCBmaXQgaW4gd2lkdGhcbiAgICBzdGF0aWMgcGxhY2VUZXh0V2l0aEVsbGlwc2lzKHRleHREM09iaiwgdGV4dFN0cmluZywgd2lkdGgpIHtcbiAgICAgICAgdmFyIHRleHRPYmogPSB0ZXh0RDNPYmoubm9kZSgpO1xuICAgICAgICB0ZXh0T2JqLnRleHRDb250ZW50ID0gdGV4dFN0cmluZztcblxuICAgICAgICB2YXIgbWFyZ2luID0gMDtcbiAgICAgICAgdmFyIGVsbGlwc2lzTGVuZ3RoID0gOTtcbiAgICAgICAgLy9lbGxpcHNpcyBpcyBuZWVkZWRcbiAgICAgICAgaWYgKHRleHRPYmouZ2V0Q29tcHV0ZWRUZXh0TGVuZ3RoKCkgPiB3aWR0aCArIG1hcmdpbikge1xuICAgICAgICAgICAgZm9yICh2YXIgeCA9IHRleHRTdHJpbmcubGVuZ3RoIC0gMzsgeCA+IDA7IHggLT0gMSkge1xuICAgICAgICAgICAgICAgIGlmICh0ZXh0T2JqLmdldFN1YlN0cmluZ0xlbmd0aCgwLCB4KSArIGVsbGlwc2lzTGVuZ3RoIDw9IHdpZHRoICsgbWFyZ2luKSB7XG4gICAgICAgICAgICAgICAgICAgIHRleHRPYmoudGV4dENvbnRlbnQgPSB0ZXh0U3RyaW5nLnN1YnN0cmluZygwLCB4KSArIFwiLi4uXCI7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRleHRPYmoudGV4dENvbnRlbnQgPSBcIi4uLlwiOyAvL2Nhbid0IHBsYWNlIGF0IGFsbFxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHN0YXRpYyBwbGFjZVRleHRXaXRoRWxsaXBzaXNBbmRUb29sdGlwKHRleHREM09iaiwgdGV4dFN0cmluZywgd2lkdGgsIHRvb2x0aXApIHtcbiAgICAgICAgdmFyIGVsbGlwc2lzUGxhY2VkID0gQXBwVXRpbHMucGxhY2VUZXh0V2l0aEVsbGlwc2lzKHRleHREM09iaiwgdGV4dFN0cmluZywgd2lkdGgpO1xuICAgICAgICBpZiAoZWxsaXBzaXNQbGFjZWQgJiYgdG9vbHRpcCkge1xuICAgICAgICAgICAgdGV4dEQzT2JqLm9uKFwibW91c2VvdmVyXCIsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgdG9vbHRpcC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgICAgICAgICAgLmR1cmF0aW9uKDIwMClcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCAuOSk7XG4gICAgICAgICAgICAgICAgdG9vbHRpcC5odG1sKHRleHRTdHJpbmcpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcImxlZnRcIiwgKGQzLmV2ZW50LnBhZ2VYICsgNSkgKyBcInB4XCIpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcInRvcFwiLCAoZDMuZXZlbnQucGFnZVkgLSAyOCkgKyBcInB4XCIpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRleHREM09iai5vbihcIm1vdXNlb3V0XCIsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgdG9vbHRpcC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgICAgICAgICAgLmR1cmF0aW9uKDUwMClcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCAwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0Rm9udFNpemUoZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZShcImZvbnQtc2l6ZVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0VHJhbnNsYXRpb24odHJhbnNmb3JtKSB7XG4gICAgICAgIC8vIENyZWF0ZSBhIGR1bW15IGcgZm9yIGNhbGN1bGF0aW9uIHB1cnBvc2VzIG9ubHkuIFRoaXMgd2lsbCBuZXZlclxuICAgICAgICAvLyBiZSBhcHBlbmRlZCB0byB0aGUgRE9NIGFuZCB3aWxsIGJlIGRpc2NhcmRlZCBvbmNlIHRoaXMgZnVuY3Rpb25cbiAgICAgICAgLy8gcmV0dXJucy5cbiAgICAgICAgdmFyIGcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcImdcIik7XG5cbiAgICAgICAgLy8gU2V0IHRoZSB0cmFuc2Zvcm0gYXR0cmlidXRlIHRvIHRoZSBwcm92aWRlZCBzdHJpbmcgdmFsdWUuXG4gICAgICAgIGcuc2V0QXR0cmlidXRlTlMobnVsbCwgXCJ0cmFuc2Zvcm1cIiwgdHJhbnNmb3JtKTtcblxuICAgICAgICAvLyBjb25zb2xpZGF0ZSB0aGUgU1ZHVHJhbnNmb3JtTGlzdCBjb250YWluaW5nIGFsbCB0cmFuc2Zvcm1hdGlvbnNcbiAgICAgICAgLy8gdG8gYSBzaW5nbGUgU1ZHVHJhbnNmb3JtIG9mIHR5cGUgU1ZHX1RSQU5TRk9STV9NQVRSSVggYW5kIGdldFxuICAgICAgICAvLyBpdHMgU1ZHTWF0cml4LlxuICAgICAgICB2YXIgbWF0cml4ID0gZy50cmFuc2Zvcm0uYmFzZVZhbC5jb25zb2xpZGF0ZSgpLm1hdHJpeDtcblxuICAgICAgICAvLyBBcyBwZXIgZGVmaW5pdGlvbiB2YWx1ZXMgZSBhbmQgZiBhcmUgdGhlIG9uZXMgZm9yIHRoZSB0cmFuc2xhdGlvbi5cbiAgICAgICAgcmV0dXJuIFttYXRyaXguZSwgbWF0cml4LmZdO1xuICAgIH1cblxuXG4gICAgc3RhdGljIGNsb3Nlc3RQb2ludChwYXRoTm9kZSwgcG9pbnQpIHtcbiAgICAgICAgdmFyIHBhdGhMZW5ndGggPSBwYXRoTm9kZS5nZXRUb3RhbExlbmd0aCgpLFxuICAgICAgICAgICAgcHJlY2lzaW9uID0gOCxcbiAgICAgICAgICAgIGJlc3QsXG4gICAgICAgICAgICBiZXN0TGVuZ3RoLFxuICAgICAgICAgICAgYmVzdERpc3RhbmNlID0gSW5maW5pdHk7XG5cbiAgICAgICAgLy8gbGluZWFyIHNjYW4gZm9yIGNvYXJzZSBhcHByb3hpbWF0aW9uXG4gICAgICAgIGZvciAodmFyIHNjYW4sIHNjYW5MZW5ndGggPSAwLCBzY2FuRGlzdGFuY2U7IHNjYW5MZW5ndGggPD0gcGF0aExlbmd0aDsgc2Nhbkxlbmd0aCArPSBwcmVjaXNpb24pIHtcbiAgICAgICAgICAgIGlmICgoc2NhbkRpc3RhbmNlID0gZGlzdGFuY2UyKHNjYW4gPSBwYXRoTm9kZS5nZXRQb2ludEF0TGVuZ3RoKHNjYW5MZW5ndGgpKSkgPCBiZXN0RGlzdGFuY2UpIHtcbiAgICAgICAgICAgICAgICBiZXN0ID0gc2NhbiwgYmVzdExlbmd0aCA9IHNjYW5MZW5ndGgsIGJlc3REaXN0YW5jZSA9IHNjYW5EaXN0YW5jZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGJpbmFyeSBzZWFyY2ggZm9yIHByZWNpc2UgZXN0aW1hdGVcbiAgICAgICAgcHJlY2lzaW9uIC89IDI7XG4gICAgICAgIHdoaWxlIChwcmVjaXNpb24gPiAwLjUpIHtcbiAgICAgICAgICAgIHZhciBiZWZvcmUsXG4gICAgICAgICAgICAgICAgYWZ0ZXIsXG4gICAgICAgICAgICAgICAgYmVmb3JlTGVuZ3RoLFxuICAgICAgICAgICAgICAgIGFmdGVyTGVuZ3RoLFxuICAgICAgICAgICAgICAgIGJlZm9yZURpc3RhbmNlLFxuICAgICAgICAgICAgICAgIGFmdGVyRGlzdGFuY2U7XG4gICAgICAgICAgICBpZiAoKGJlZm9yZUxlbmd0aCA9IGJlc3RMZW5ndGggLSBwcmVjaXNpb24pID49IDAgJiYgKGJlZm9yZURpc3RhbmNlID0gZGlzdGFuY2UyKGJlZm9yZSA9IHBhdGhOb2RlLmdldFBvaW50QXRMZW5ndGgoYmVmb3JlTGVuZ3RoKSkpIDwgYmVzdERpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgYmVzdCA9IGJlZm9yZSwgYmVzdExlbmd0aCA9IGJlZm9yZUxlbmd0aCwgYmVzdERpc3RhbmNlID0gYmVmb3JlRGlzdGFuY2U7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKChhZnRlckxlbmd0aCA9IGJlc3RMZW5ndGggKyBwcmVjaXNpb24pIDw9IHBhdGhMZW5ndGggJiYgKGFmdGVyRGlzdGFuY2UgPSBkaXN0YW5jZTIoYWZ0ZXIgPSBwYXRoTm9kZS5nZXRQb2ludEF0TGVuZ3RoKGFmdGVyTGVuZ3RoKSkpIDwgYmVzdERpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgYmVzdCA9IGFmdGVyLCBiZXN0TGVuZ3RoID0gYWZ0ZXJMZW5ndGgsIGJlc3REaXN0YW5jZSA9IGFmdGVyRGlzdGFuY2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHByZWNpc2lvbiAvPSAyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgYmVzdCA9IFtiZXN0LngsIGJlc3QueV07XG4gICAgICAgIGJlc3QuZGlzdGFuY2UgPSBNYXRoLnNxcnQoYmVzdERpc3RhbmNlKTtcbiAgICAgICAgcmV0dXJuIGJlc3Q7XG5cbiAgICAgICAgZnVuY3Rpb24gZGlzdGFuY2UyKHApIHtcbiAgICAgICAgICAgIHZhciBkeCA9IHAueCAtIHBvaW50WzBdLFxuICAgICAgICAgICAgICAgIGR5ID0gcC55IC0gcG9pbnRbMV07XG4gICAgICAgICAgICByZXR1cm4gZHggKiBkeCArIGR5ICogZHk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgZ3Jvd2wobWVzc2FnZSwgdHlwZT0naW5mbycsIHBvc2l0aW9uPSdyaWdodCcsIHRpbWUgPSAyMDAwKXtcbiAgICAgICAgdmFyIGh0bWwgPSBUZW1wbGF0ZXMuZ2V0KCdncm93bCcsIHttZXNzYWdlOm1lc3NhZ2UsIHR5cGU6dHlwZX0pXG5cbiAgICAgICAgdmFyIGcgPSBkMy5zZWxlY3QoJ2JvZHknKS5zZWxlY3RPckFwcGVuZCgnZGl2LnNkLWdyb3dsLWxpc3QuJytwb3NpdGlvbikuYXBwZW5kKCdkaXYnKS5odG1sKGh0bWwpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBnLnJlbW92ZSgpO1xuICAgICAgICB9LCB0aW1lKVxuICAgIH1cblxuXG4gICAgc3RhdGljIGNyZWF0ZUVsZW1lbnQodGFnLCBhdHRyaWJzLCBwYXJlbnQpIHtcbiAgICAgICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xuXG4gICAgICAgIGlmIChhdHRyaWJzKSB7XG4gICAgICAgICAgICBBcHBVdGlscy5kZWVwRXh0ZW5kKGVsLCBhdHRyaWJzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGFyZW50KSB7XG4gICAgICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoZWwpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbDtcbiAgICB9O1xuXG4gICAgc3RhdGljIHJlbW92ZUVsZW1lbnQoZWxlbWVudCkge1xuICAgICAgICBlbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XG4gICAgfVxuXG4gICAgc3RhdGljIHJlcGxhY2VVcmxzKHRleHQpe1xuICAgICAgICBpZighdGV4dCl7XG4gICAgICAgICAgICByZXR1cm4gdGV4dDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdXJsUmVnZXhwID0gLygoZnRwfGh0dHB8aHR0cHMpOlxcL1xcLyhcXHcrOnswLDF9XFx3KkApPyhcXFMrKSg6WzAtOV0rKT8oXFwvfFxcLyhbXFx3IyE6Lj8rPSYlQCFcXC1cXC9dKSk/KS9cblxuICAgICAgICByZXR1cm4gdGV4dC5yZXBsYWNlKHVybFJlZ2V4cCwgJzxhIGhyZWY9XCIkMVwiIHRhcmdldD1cIl9ibGFua1wiPiQxPC9hPicpO1xuICAgIH1cblxuICAgIHN0YXRpYyBlc2NhcGVIdG1sKGh0bWwpXG4gICAge1xuICAgICAgICB2YXIgdGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGh0bWwpO1xuICAgICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZCh0ZXh0KTtcbiAgICAgICAgcmV0dXJuIGRpdi5pbm5lckhUTUw7XG4gICAgfVxuXG4gICAgc3RhdGljIGRpc3BhdGNoSHRtbEV2ZW50KGVsZW1lbnQsIG5hbWUpe1xuICAgICAgICBpZiAoXCJjcmVhdGVFdmVudFwiIGluIGRvY3VtZW50KSB7XG4gICAgICAgICAgICB2YXIgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJIVE1MRXZlbnRzXCIpO1xuICAgICAgICAgICAgZXZ0LmluaXRFdmVudChuYW1lLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICAgICAgICBlbGVtZW50LmRpc3BhdGNoRXZlbnQoZXZ0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBlbGVtZW50LmZpcmVFdmVudChcIm9uXCIrbmFtZSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGRpc3BhdGNoRXZlbnQobmFtZSwgZGF0YSl7XG4gICAgICAgIHZhciBldmVudDtcbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgZXZlbnQgPSBuZXcgIEN1c3RvbUV2ZW50KG5hbWUseyAnZGV0YWlsJzogZGF0YSB9KTtcbiAgICAgICAgfWNhdGNoIChlKXsgLy9JRVxuICAgICAgICAgICAgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcbiAgICAgICAgICAgIGV2ZW50LmluaXRDdXN0b21FdmVudChuYW1lLCBmYWxzZSwgZmFsc2UsIGRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXRWYWxpZGF0aW9uTWVzc2FnZShlcnJvcil7XG4gICAgICAgIGlmKFV0aWxzLmlzU3RyaW5nKGVycm9yKSl7XG4gICAgICAgICAgICBlcnJvciA9IHtuYW1lOiBlcnJvcn07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGtleSA9ICd2YWxpZGF0aW9uLicgKyBlcnJvci5uYW1lO1xuICAgICAgICByZXR1cm4gaTE4bi50KGtleSwgZXJyb3IuZGF0YSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGhpZGUoc2VsZWN0aW9uKXtcbiAgICAgICAgc2VsZWN0aW9uLmNsYXNzZWQoJ3NkLWhpZGRlbicsIHRydWUpO1xuICAgIH1cblxuICAgIHN0YXRpYyBzaG93KHNlbGVjdGlvbiwgc2hvdz10cnVlKXtcbiAgICAgICAgc2VsZWN0aW9uLmNsYXNzZWQoJ3NkLWhpZGRlbicsICFzaG93KTtcbiAgICB9XG5cblxuXG4gICAgc3RhdGljIGlzSGlkZGVuKGVsLCBleGFjdCA9IHRydWUpIHtcbiAgICAgICAgaWYoIWVsKXtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmKGV4YWN0KXtcbiAgICAgICAgICAgIHZhciBzdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsKTtcbiAgICAgICAgICAgIHJldHVybiAoc3R5bGUuZGlzcGxheSA9PT0gJ25vbmUnKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoZWwub2Zmc2V0UGFyZW50ID09PSBudWxsKVxuICAgIH1cblxuICAgIHN0YXRpYyBnZXRKU09OKHVybCwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB4aHIub3BlbignZ2V0JywgdXJsLCB0cnVlKTtcbiAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcbiAgICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzdGF0dXMgPSB4aHIuc3RhdHVzO1xuICAgICAgICAgICAgaWYgKHN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayh4aHIucmVzcG9uc2UsIG51bGwpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCBzdGF0dXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB4aHIuc2VuZCgpO1xuICAgIH1cbn1cbiIsImltcG9ydCAqIGFzIGQzIGZyb20gJy4uL2QzJ1xuXG4vKmJhc2VkIG9uOlxuICogZ2l0aHViLmNvbS9wYXRvcmprL2QzLWNvbnRleHQtbWVudSAqL1xuXG5leHBvcnQgY2xhc3MgQ29udGV4dE1lbnUge1xuICAgIG9wZW5DYWxsYmFjaztcbiAgICBjbG9zZUNhbGxiYWNrO1xuXG4gICAgY29uc3RydWN0b3IobWVudSwgb3B0cykge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBvcHRzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBzZWxmLm9wZW5DYWxsYmFjayA9IG9wdHM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgICAgICAgICAgIHNlbGYub3BlbkNhbGxiYWNrID0gb3B0cy5vbk9wZW47XG4gICAgICAgICAgICBzZWxmLmNsb3NlQ2FsbGJhY2sgPSBvcHRzLm9uQ2xvc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjcmVhdGUgdGhlIGRpdiBlbGVtZW50IHRoYXQgd2lsbCBob2xkIHRoZSBjb250ZXh0IG1lbnVcbiAgICAgICAgZDMuc2VsZWN0QWxsKCcuZDMtY29udGV4dC1tZW51JykuZGF0YShbMV0pXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdkMy1jb250ZXh0LW1lbnUnKTtcblxuICAgICAgICAvLyBjbG9zZSBtZW51XG4gICAgICAgIGQzLnNlbGVjdCgnYm9keScpLm9uKCdjbGljay5kMy1jb250ZXh0LW1lbnUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBkMy5zZWxlY3QoJy5kMy1jb250ZXh0LW1lbnUnKS5zdHlsZSgnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICBpZiAoc2VsZi5jbG9zZUNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5jbG9zZUNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHRoaXMgZ2V0cyBleGVjdXRlZCB3aGVuIGEgY29udGV4dG1lbnUgZXZlbnQgb2NjdXJzXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZGF0YSwgaW5kZXgpIHtcbiAgICAgICAgICAgIHZhciBlbG0gPSB0aGlzO1xuXG4gICAgICAgICAgICBkMy5zZWxlY3RBbGwoJy5kMy1jb250ZXh0LW1lbnUnKS5odG1sKCcnKTtcbiAgICAgICAgICAgIHZhciBsaXN0ID0gZDMuc2VsZWN0QWxsKCcuZDMtY29udGV4dC1tZW51JylcbiAgICAgICAgICAgICAgICAub24oJ2NvbnRleHRtZW51JywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KCcuZDMtY29udGV4dC1tZW51Jykuc3R5bGUoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgICAgICAgICBkMy5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBkMy5ldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJ3VsJyk7XG4gICAgICAgICAgICBsaXN0LnNlbGVjdEFsbCgnbGknKS5kYXRhKHR5cGVvZiBtZW51ID09PSAnZnVuY3Rpb24nID8gbWVudShkYXRhKSA6IG1lbnUpLmVudGVyKClcbiAgICAgICAgICAgICAgICAuYXBwZW5kKCdsaScpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJldCA9ICcnO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZC5kaXZpZGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXQgKz0gJyBpcy1kaXZpZGVyJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoZC5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0ICs9ICcgaXMtZGlzYWJsZWQnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICghZC5hY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldCArPSAnIGlzLWhlYWRlcic7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5odG1sKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkLmRpdmlkZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnPGhyPic7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFkLnRpdGxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdObyB0aXRsZSBhdHRyaWJ1dGUgc2V0LiBDaGVjayB0aGUgc3BlbGxpbmcgb2YgeW91ciBvcHRpb25zLicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAodHlwZW9mIGQudGl0bGUgPT09ICdzdHJpbmcnKSA/IGQudGl0bGUgOiBkLnRpdGxlKGRhdGEpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkLmRpc2FibGVkKSByZXR1cm47IC8vIGRvIG5vdGhpbmcgaWYgZGlzYWJsZWRcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFkLmFjdGlvbikgcmV0dXJuOyAvLyBoZWFkZXJzIGhhdmUgbm8gXCJhY3Rpb25cIlxuICAgICAgICAgICAgICAgICAgICBkLmFjdGlvbihlbG0sIGRhdGEsIGluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KCcuZDMtY29udGV4dC1tZW51Jykuc3R5bGUoJ2Rpc3BsYXknLCAnbm9uZScpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLmNsb3NlQ2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY2xvc2VDYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIHRoZSBvcGVuQ2FsbGJhY2sgYWxsb3dzIGFuIGFjdGlvbiB0byBmaXJlIGJlZm9yZSB0aGUgbWVudSBpcyBkaXNwbGF5ZWRcbiAgICAgICAgICAgIC8vIGFuIGV4YW1wbGUgdXNhZ2Ugd291bGQgYmUgY2xvc2luZyBhIHRvb2x0aXBcbiAgICAgICAgICAgIGlmIChzZWxmLm9wZW5DYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLm9wZW5DYWxsYmFjayhkYXRhLCBpbmRleCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGRpc3BsYXkgY29udGV4dCBtZW51XG4gICAgICAgICAgICBkMy5zZWxlY3QoJy5kMy1jb250ZXh0LW1lbnUnKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnbGVmdCcsIChkMy5ldmVudC5wYWdlWCAtIDIpICsgJ3B4JylcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3RvcCcsIChkMy5ldmVudC5wYWdlWSAtIDIpICsgJ3B4JylcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2Rpc3BsYXknLCAnYmxvY2snKTtcblxuICAgICAgICAgICAgZDMuZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGQzLmV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBzdGF0aWMgaGlkZSgpIHtcbiAgICAgICAgZDMuc2VsZWN0KCcuZDMtY29udGV4dC1tZW51Jykuc3R5bGUoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHtDb250ZXh0TWVudX0gZnJvbSAnLi9jb250ZXh0LW1lbnUnXG5pbXBvcnQge2kxOG59IGZyb20gXCIuLi9pMThuL2kxOG5cIjtcblxuZXhwb3J0IGNsYXNzIEVkZ2VDb250ZXh0TWVudSBleHRlbmRzIENvbnRleHRNZW51IHtcbiAgICB0cmVlRGVzaWduZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcih0cmVlRGVzaWduZXIpIHtcbiAgICAgICAgdmFyIG1lbnUgPSBmdW5jdGlvbiAoZCkge1xuXG4gICAgICAgICAgICB2YXIgbWVudSA9IFtdO1xuXG4gICAgICAgICAgICBtZW51LnB1c2goe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51LmVkZ2UuaW5qZWN0RGVjaXNpb25Ob2RlJyksXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5pbmplY3REZWNpc2lvbk5vZGUoZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG1lbnUucHVzaCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUuZWRnZS5pbmplY3RDaGFuY2VOb2RlJyksXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5pbmplY3RDaGFuY2VOb2RlKGQpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgcmV0dXJuIG1lbnU7XG4gICAgICAgIH07XG5cbiAgICAgICAgc3VwZXIobWVudSk7XG4gICAgICAgIHRoaXMudHJlZURlc2lnbmVyID0gdHJlZURlc2lnbmVyO1xuICAgIH1cbn1cbiIsImltcG9ydCB7Q29udGV4dE1lbnV9IGZyb20gJy4vY29udGV4dC1tZW51J1xuaW1wb3J0IHtkb21haW4gYXMgbW9kZWx9IGZyb20gJ3NkLW1vZGVsJ1xuaW1wb3J0ICogYXMgZDMgZnJvbSAnLi4vZDMnXG5pbXBvcnQge2kxOG59IGZyb20gXCIuLi9pMThuL2kxOG5cIjtcblxuZXhwb3J0IGNsYXNzIE1haW5Db250ZXh0TWVudSBleHRlbmRzIENvbnRleHRNZW51IHtcbiAgICB0cmVlRGVzaWduZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcih0cmVlRGVzaWduZXIpIHtcbiAgICAgICAgdmFyIG1vdXNlUG9zaXRpb24gPSBudWxsO1xuICAgICAgICB2YXIgbWVudSA9IGZ1bmN0aW9uIChkKSB7XG5cbiAgICAgICAgICAgIHZhciBtZW51ID0gW107XG4gICAgICAgICAgICBtZW51LnB1c2goe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm1haW4uYWRkRGVjaXNpb25Ob2RlJyksXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdOb2RlID0gbmV3IG1vZGVsLkRlY2lzaW9uTm9kZShtb3VzZVBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLmFkZE5vZGUobmV3Tm9kZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG1lbnUucHVzaCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubWFpbi5hZGRDaGFuY2VOb2RlJyksXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdOb2RlID0gbmV3IG1vZGVsLkNoYW5jZU5vZGUobW91c2VQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5hZGROb2RlKG5ld05vZGUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBtZW51LnB1c2goe2RpdmlkZXI6IHRydWV9KTtcbiAgICAgICAgICAgIG1lbnUucHVzaCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubWFpbi5hZGRUZXh0JyksXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdUZXh0ID0gbmV3IG1vZGVsLlRleHQobW91c2VQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5hZGRUZXh0KG5ld1RleHQpO1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbWVudS5wdXNoKHtkaXZpZGVyOiB0cnVlfSk7XG4gICAgICAgICAgICBtZW51LnB1c2goe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm1haW4ucGFzdGUnKSxcbiAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLnBhc3RlVG9OZXdMb2NhdGlvbihtb3VzZVBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhdHJlZURlc2lnbmVyLmNvcGllZE5vZGVzIHx8ICF0cmVlRGVzaWduZXIuY29waWVkTm9kZXMubGVuZ3RoXG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbWVudS5wdXNoKHtkaXZpZGVyOiB0cnVlfSk7XG5cbiAgICAgICAgICAgIG1lbnUucHVzaCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubWFpbi5zZWxlY3RBbGxOb2RlcycpLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuc2VsZWN0QWxsTm9kZXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBtZW51O1xuICAgICAgICB9O1xuXG4gICAgICAgIHN1cGVyKG1lbnUsIHtvbk9wZW46ICgpID0+IHtcbiAgICAgICAgICAgIHRyZWVEZXNpZ25lci5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICAgICAgbW91c2VQb3NpdGlvbiA9IG5ldyBtb2RlbC5Qb2ludChkMy5tb3VzZSh0cmVlRGVzaWduZXIuc3ZnLm5vZGUoKSkpLm1vdmUodHJlZURlc2lnbmVyLmdldE1haW5Hcm91cFRyYW5zbGF0aW9uKHRydWUpKTtcblxuICAgICAgICB9fSk7XG4gICAgICAgIHRoaXMudHJlZURlc2lnbmVyID0gdHJlZURlc2lnbmVyO1xuICAgIH1cbn1cbiIsImltcG9ydCB7Q29udGV4dE1lbnV9IGZyb20gJy4vY29udGV4dC1tZW51J1xuaW1wb3J0IHtkb21haW4gYXMgbW9kZWx9IGZyb20gJ3NkLW1vZGVsJ1xuaW1wb3J0IHtpMThufSBmcm9tIFwiLi4vaTE4bi9pMThuXCI7XG5cbmV4cG9ydCBjbGFzcyBOb2RlQ29udGV4dE1lbnUgZXh0ZW5kcyBDb250ZXh0TWVudSB7XG4gICAgdHJlZURlc2lnbmVyO1xuXG4gICAgY29uc3RydWN0b3IodHJlZURlc2lnbmVyLCBvcGVyYXRpb25zRm9yT2JqZWN0KSB7XG4gICAgICAgIHZhciBtZW51ID0gZnVuY3Rpb24gKGQpIHtcblxuICAgICAgICAgICAgdmFyIGNvcHlNZW51SXRlbSA9IHtcbiAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5ub2RlLmNvcHknKSxcbiAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLnNlbGVjdE5vZGUoZCwgIXRyZWVEZXNpZ25lci5pc05vZGVTZWxlY3RlZChkKSk7XG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5jb3B5U2VsZWN0ZWROb2RlcygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB2YXIgY3V0TWVudUl0ZW0gPSB7XG4gICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubm9kZS5jdXQnKSxcbiAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLnNlbGVjdE5vZGUoZCwgIXRyZWVEZXNpZ25lci5pc05vZGVTZWxlY3RlZChkKSk7XG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5jdXRTZWxlY3RlZE5vZGVzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZhciBwYXN0ZU1lbnVJdGVtID0ge1xuICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm5vZGUucGFzdGUnKSxcbiAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLnBhc3RlVG9Ob2RlKGQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGQuZm9sZGVkIHx8ICF0cmVlRGVzaWduZXIuY29waWVkTm9kZXMgfHwgIXRyZWVEZXNpZ25lci5jb3BpZWROb2Rlcy5sZW5ndGhcblxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZhciBkZWxldGVNZW51SXRlbSA9IHtcbiAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5ub2RlLmRlbGV0ZScpLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5zZWxlY3ROb2RlKGQsICF0cmVlRGVzaWduZXIuaXNOb2RlU2VsZWN0ZWQoZCkpO1xuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIucmVtb3ZlU2VsZWN0ZWROb2RlcygpO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIG1lbnUgPSBbXTtcbiAgICAgICAgICAgIGlmIChkLnR5cGUgPT0gbW9kZWwuVGVybWluYWxOb2RlLiRUWVBFKSB7XG4gICAgICAgICAgICAgICAgbWVudSA9IFtjb3B5TWVudUl0ZW0sIGN1dE1lbnVJdGVtLCBkZWxldGVNZW51SXRlbV07XG4gICAgICAgICAgICAgICAgTm9kZUNvbnRleHRNZW51LmFkZE5vZGVDb252ZXJzaW9uT3B0aW9ucyhkLCBtZW51LCB0cmVlRGVzaWduZXIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBtZW51O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZighZC5mb2xkZWQpe1xuICAgICAgICAgICAgICAgIG1lbnUucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm5vZGUuYWRkRGVjaXNpb25Ob2RlJyksXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLmFkZERlY2lzaW9uTm9kZShkKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbWVudS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubm9kZS5hZGRDaGFuY2VOb2RlJyksXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLmFkZENoYW5jZU5vZGUoZClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIG1lbnUucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm5vZGUuYWRkVGVybWluYWxOb2RlJyksXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLmFkZFRlcm1pbmFsTm9kZShkKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbWVudS5wdXNoKHtkaXZpZGVyOiB0cnVlfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG1lbnUucHVzaChjb3B5TWVudUl0ZW0pO1xuICAgICAgICAgICAgbWVudS5wdXNoKGN1dE1lbnVJdGVtKTtcbiAgICAgICAgICAgIG1lbnUucHVzaChwYXN0ZU1lbnVJdGVtKTtcbiAgICAgICAgICAgIG1lbnUucHVzaChkZWxldGVNZW51SXRlbSk7XG5cbiAgICAgICAgICAgIE5vZGVDb250ZXh0TWVudS5hZGROb2RlQ29udmVyc2lvbk9wdGlvbnMoZCwgbWVudSwgdHJlZURlc2lnbmVyKTtcbiAgICAgICAgICAgIG1lbnUucHVzaCh7ZGl2aWRlcjogdHJ1ZX0pO1xuICAgICAgICAgICAgbWVudS5wdXNoKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5ub2RlLnNlbGVjdFN1YnRyZWUnKSxcbiAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLnNlbGVjdFN1YlRyZWUoZCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmKCFkLmZvbGRlZCl7XG4gICAgICAgICAgICAgICAgbWVudS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubm9kZS5mb2xkJyksXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLmZvbGRTdWJ0cmVlKGQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBtZW51LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5ub2RlLnVuZm9sZCcpLFxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5mb2xkU3VidHJlZShkLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYob3BlcmF0aW9uc0Zvck9iamVjdCl7XG4gICAgICAgICAgICAgICAgdmFyIG9wZXJhdGlvbnMgPSBvcGVyYXRpb25zRm9yT2JqZWN0KGQpO1xuICAgICAgICAgICAgICAgIGlmKG9wZXJhdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIG1lbnUucHVzaCh7ZGl2aWRlcjogdHJ1ZX0pO1xuICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25zLmZvckVhY2gob3A9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbnUucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubm9kZS4nK29wLm5hbWUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIucGVyZm9ybU9wZXJhdGlvbihkLCBvcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogIW9wLmNhblBlcmZvcm0oZClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG1lbnU7XG4gICAgICAgIH07XG5cbiAgICAgICAgc3VwZXIobWVudSk7XG4gICAgICAgIHRoaXMudHJlZURlc2lnbmVyID0gdHJlZURlc2lnbmVyO1xuICAgIH1cblxuICAgIHN0YXRpYyBhZGROb2RlQ29udmVyc2lvbk9wdGlvbnMoZCwgbWVudSwgdHJlZURlc2lnbmVyKXtcbiAgICAgICAgdmFyIGNvbnZlcnNpb25PcHRpb25zID0gTm9kZUNvbnRleHRNZW51LmdldE5vZGVDb252ZXJzaW9uT3B0aW9ucyhkLCB0cmVlRGVzaWduZXIpO1xuICAgICAgICBpZihjb252ZXJzaW9uT3B0aW9ucy5sZW5ndGgpe1xuICAgICAgICAgICAgbWVudS5wdXNoKHtkaXZpZGVyOiB0cnVlfSk7XG4gICAgICAgICAgICBjb252ZXJzaW9uT3B0aW9ucy5mb3JFYWNoKG89Pm1lbnUucHVzaChvKSk7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBnZXROb2RlQ29udmVyc2lvbk9wdGlvbnMoZCwgdHJlZURlc2lnbmVyKXtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSBbXTtcblxuICAgICAgICBpZihkLmZvbGRlZCl7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYWxsQWxsb3dlZFR5cGVzID0gW21vZGVsLkRlY2lzaW9uTm9kZS4kVFlQRSwgbW9kZWwuQ2hhbmNlTm9kZS4kVFlQRSwgbW9kZWwuVGVybWluYWxOb2RlLiRUWVBFXTtcblxuICAgICAgICBpZighZC5jaGlsZEVkZ2VzLmxlbmd0aCAmJiBkLiRwYXJlbnQpe1xuICAgICAgICAgICAgYWxsQWxsb3dlZFR5cGVzLmZpbHRlcih0PT50IT09ZC50eXBlKS5mb3JFYWNoKHR5cGU9PntcbiAgICAgICAgICAgICAgICBvcHRpb25zLnB1c2goTm9kZUNvbnRleHRNZW51LmdldE5vZGVDb252ZXJzaW9uT3B0aW9uKHR5cGUsIHRyZWVEZXNpZ25lcikpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGlmKGQgaW5zdGFuY2VvZiBtb2RlbC5EZWNpc2lvbk5vZGUpe1xuICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaChOb2RlQ29udGV4dE1lbnUuZ2V0Tm9kZUNvbnZlcnNpb25PcHRpb24obW9kZWwuQ2hhbmNlTm9kZS4kVFlQRSwgdHJlZURlc2lnbmVyKSlcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaChOb2RlQ29udGV4dE1lbnUuZ2V0Tm9kZUNvbnZlcnNpb25PcHRpb24obW9kZWwuRGVjaXNpb25Ob2RlLiRUWVBFLCB0cmVlRGVzaWduZXIpKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvcHRpb25zO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXROb2RlQ29udmVyc2lvbk9wdGlvbih0eXBlVG9Db252ZXJ0VG8sIHRyZWVEZXNpZ25lcil7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5ub2RlLmNvbnZlcnQuJyt0eXBlVG9Db252ZXJ0VG8pLFxuICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLmNvbnZlcnROb2RlKGQsIHR5cGVUb0NvbnZlcnRUbyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHtDb250ZXh0TWVudX0gZnJvbSAnLi9jb250ZXh0LW1lbnUnXG5pbXBvcnQge2kxOG59IGZyb20gXCIuLi9pMThuL2kxOG5cIjtcblxuZXhwb3J0IGNsYXNzIFRleHRDb250ZXh0TWVudSBleHRlbmRzIENvbnRleHRNZW51IHtcbiAgICB0cmVlRGVzaWduZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcih0cmVlRGVzaWduZXIpIHtcbiAgICAgICAgdmFyIG1lbnUgPSBmdW5jdGlvbiAoZCkge1xuXG5cbiAgICAgICAgICAgIHZhciBkZWxldGVNZW51SXRlbSA9IHtcbiAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS50ZXh0LmRlbGV0ZScpLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5zZWxlY3RUZXh0KGQsIHRydWUsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIucmVtb3ZlU2VsZWN0ZWRUZXh0cygpXG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIG1lbnUgPSBbXTtcbiAgICAgICAgICAgIG1lbnUucHVzaChkZWxldGVNZW51SXRlbSk7XG4gICAgICAgICAgICByZXR1cm4gbWVudTtcbiAgICAgICAgfTtcblxuICAgICAgICBzdXBlcihtZW51KTtcbiAgICAgICAgdGhpcy50cmVlRGVzaWduZXIgPSB0cmVlRGVzaWduZXI7XG4gICAgfVxufVxuIiwiaW1wb3J0ICogYXMgZDMgZnJvbSAnLi9kMydcblxuZXhwb3J0IGNsYXNzIEQzRXh0ZW5zaW9ucyB7XG5cbiAgICBzdGF0aWMgZXh0ZW5kKCkge1xuXG4gICAgICAgIGQzLnNlbGVjdGlvbi5wcm90b3R5cGUuZW50ZXIucHJvdG90eXBlLmluc2VydFNlbGVjdG9yID1cbiAgICAgICAgICAgIGQzLnNlbGVjdGlvbi5wcm90b3R5cGUuaW5zZXJ0U2VsZWN0b3IgPSBmdW5jdGlvbiAoc2VsZWN0b3IsIGJlZm9yZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBEM0V4dGVuc2lvbnMuaW5zZXJ0U2VsZWN0b3IodGhpcywgc2VsZWN0b3IsIGJlZm9yZSk7XG4gICAgICAgICAgICB9O1xuXG5cbiAgICAgICAgZDMuc2VsZWN0aW9uLnByb3RvdHlwZS5lbnRlci5wcm90b3R5cGUuYXBwZW5kU2VsZWN0b3IgPVxuICAgICAgICAgICAgZDMuc2VsZWN0aW9uLnByb3RvdHlwZS5hcHBlbmRTZWxlY3RvciA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBEM0V4dGVuc2lvbnMuYXBwZW5kU2VsZWN0b3IodGhpcywgc2VsZWN0b3IpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICBkMy5zZWxlY3Rpb24ucHJvdG90eXBlLmVudGVyLnByb3RvdHlwZS5zZWxlY3RPckFwcGVuZCA9XG4gICAgICAgICAgICBkMy5zZWxlY3Rpb24ucHJvdG90eXBlLnNlbGVjdE9yQXBwZW5kID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEQzRXh0ZW5zaW9ucy5zZWxlY3RPckFwcGVuZCh0aGlzLCBzZWxlY3Rvcik7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIGQzLnNlbGVjdGlvbi5wcm90b3R5cGUuZW50ZXIucHJvdG90eXBlLnNlbGVjdE9ySW5zZXJ0ID1cbiAgICAgICAgICAgIGQzLnNlbGVjdGlvbi5wcm90b3R5cGUuc2VsZWN0T3JJbnNlcnQgPSBmdW5jdGlvbiAoc2VsZWN0b3IsIGJlZm9yZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBEM0V4dGVuc2lvbnMuc2VsZWN0T3JJbnNlcnQodGhpcywgc2VsZWN0b3IsIGJlZm9yZSk7XG4gICAgICAgICAgICB9O1xuXG5cbiAgICB9XG5cbiAgICBzdGF0aWMgaW5zZXJ0T3JBcHBlbmRTZWxlY3RvcihwYXJlbnQsIHNlbGVjdG9yLCBvcGVyYXRpb24sIGJlZm9yZSkge1xuXG4gICAgICAgIHZhciBzZWxlY3RvclBhcnRzID0gc2VsZWN0b3Iuc3BsaXQoLyhbXFwuXFwjXSkvKTtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBwYXJlbnRbb3BlcmF0aW9uXShzZWxlY3RvclBhcnRzLnNoaWZ0KCksIGJlZm9yZSk7Ly9cIjpmaXJzdC1jaGlsZFwiXG5cbiAgICAgICAgd2hpbGUgKHNlbGVjdG9yUGFydHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgdmFyIHNlbGVjdG9yTW9kaWZpZXIgPSBzZWxlY3RvclBhcnRzLnNoaWZ0KCk7XG4gICAgICAgICAgICB2YXIgc2VsZWN0b3JJdGVtID0gc2VsZWN0b3JQYXJ0cy5zaGlmdCgpO1xuICAgICAgICAgICAgaWYgKHNlbGVjdG9yTW9kaWZpZXIgPT09IFwiLlwiKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQuY2xhc3NlZChzZWxlY3Rvckl0ZW0sIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzZWxlY3Rvck1vZGlmaWVyID09PSBcIiNcIikge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBlbGVtZW50LmF0dHIoJ2lkJywgc2VsZWN0b3JJdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9XG5cbiAgICBzdGF0aWMgaW5zZXJ0U2VsZWN0b3IocGFyZW50LCBzZWxlY3RvciwgYmVmb3JlKSB7XG4gICAgICAgIHJldHVybiBEM0V4dGVuc2lvbnMuaW5zZXJ0T3JBcHBlbmRTZWxlY3RvcihwYXJlbnQsIHNlbGVjdG9yLCBcImluc2VydFwiLCBiZWZvcmUpO1xuICAgIH1cblxuICAgIHN0YXRpYyBhcHBlbmRTZWxlY3RvcihwYXJlbnQsIHNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiBEM0V4dGVuc2lvbnMuaW5zZXJ0T3JBcHBlbmRTZWxlY3RvcihwYXJlbnQsIHNlbGVjdG9yLCBcImFwcGVuZFwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2VsZWN0T3JBcHBlbmQocGFyZW50LCBzZWxlY3RvciwgZWxlbWVudCkge1xuICAgICAgICB2YXIgc2VsZWN0aW9uID0gcGFyZW50LnNlbGVjdChzZWxlY3Rvcik7XG4gICAgICAgIGlmIChzZWxlY3Rpb24uZW1wdHkoKSkge1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyZW50LmFwcGVuZChlbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBEM0V4dGVuc2lvbnMuYXBwZW5kU2VsZWN0b3IocGFyZW50LCBzZWxlY3Rvcik7XG5cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2VsZWN0aW9uO1xuICAgIH07XG5cbiAgICBzdGF0aWMgc2VsZWN0T3JJbnNlcnQocGFyZW50LCBzZWxlY3RvciwgYmVmb3JlKSB7XG4gICAgICAgIHZhciBzZWxlY3Rpb24gPSBwYXJlbnQuc2VsZWN0KHNlbGVjdG9yKTtcbiAgICAgICAgaWYgKHNlbGVjdGlvbi5lbXB0eSgpKSB7XG4gICAgICAgICAgICByZXR1cm4gRDNFeHRlbnNpb25zLmluc2VydFNlbGVjdG9yKHBhcmVudCwgc2VsZWN0b3IsIGJlZm9yZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNlbGVjdGlvbjtcbiAgICB9O1xufVxuIiwiZXhwb3J0ICogZnJvbSAnZDMtZGlzcGF0Y2gnO1xuZXhwb3J0ICogZnJvbSAnZDMtc2NhbGUnO1xuZXhwb3J0ICogZnJvbSAnZDMtc2VsZWN0aW9uJztcbmV4cG9ydCAqIGZyb20gJ2QzLXNoYXBlJ1xuZXhwb3J0ICogZnJvbSAnZDMtZHJhZyc7XG5leHBvcnQgKiBmcm9tICdkMy1icnVzaCdcbmV4cG9ydCAqIGZyb20gJ2QzLWFycmF5J1xuZXhwb3J0ICogZnJvbSAnZDMtaGllcmFyY2h5J1xuZXhwb3J0ICogZnJvbSAnZDMtdGltZS1mb3JtYXQnXG4iLCJtb2R1bGUuZXhwb3J0cz17XG4gICAgXCJjb250ZXh0TWVudVwiOntcbiAgICAgICAgXCJtYWluXCI6e1xuICAgICAgICAgICAgXCJhZGREZWNpc2lvbk5vZGVcIjogXCJFbnRzY2hlaWR1bmdza25vdGVuIGhpbnp1ZsO8Z2VuXCIsXG4gICAgICAgICAgICBcImFkZENoYW5jZU5vZGVcIjogXCJadWZhbGwgS25vdGVuIGhpbnp1ZsO8Z2VuXCIsXG4gICAgICAgICAgICBcImFkZFRleHRcIjogXCJUZXh0IGhpbnp1ZsO8Z2VuIFwiLFxuICAgICAgICAgICAgXCJwYXN0ZVwiOiBcIkVpbmbDvGdlblwiLFxuICAgICAgICAgICAgXCJzZWxlY3RBbGxOb2Rlc1wiOiBcIkFsbGUgS25vdGVuIGF1c3fDpGhsZW5cIlxuICAgICAgICB9LFxuICAgICAgICBcIm5vZGVcIjp7XG4gICAgICAgICAgICBcImNvcHlcIjogXCJLb3BpZXJlblwiLFxuICAgICAgICAgICAgXCJjdXRcIjogXCJBdXNzY2huZWlkZW5cIixcbiAgICAgICAgICAgIFwicGFzdGVcIjogXCJFaW5mw7xnZW5cIixcbiAgICAgICAgICAgIFwiZGVsZXRlXCI6IFwiTMO2c2NoZW5cIixcbiAgICAgICAgICAgIFwiYWRkRGVjaXNpb25Ob2RlXCI6IFwiRW50c2NoZWlkdW5nc2tub3RlbiBoaW56dWbDvGdlblwiLFxuICAgICAgICAgICAgXCJhZGRDaGFuY2VOb2RlXCI6IFwiWnVmYWxsIEtub3RlbiBoaW56dWbDvGdlblwiLFxuICAgICAgICAgICAgXCJhZGRUZXJtaW5hbE5vZGVcIjogXCJFbmRrbm90dGVuIGhpbnp1ZsO8Z2VuXCIsXG4gICAgICAgICAgICBcImNvbnZlcnRcIjp7XG4gICAgICAgICAgICAgICAgXCJkZWNpc2lvblwiOiBcIkFscyBFbnRzY2hlaWR1bmdza25vdGVuXCIsXG4gICAgICAgICAgICAgICAgXCJjaGFuY2VcIjogXCJBbHMgWnVmYWxsIEtub3RlblwiLFxuICAgICAgICAgICAgICAgIFwidGVybWluYWxcIjogXCJBbHMgRW5ka25vdGVuXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInNlbGVjdFN1YnRyZWVcIjogXCJUZWlsYmF1bSB3w6RobGVuXCIsXG4gICAgICAgICAgICBcImZvbGRcIjogXCJUZWlsYmF1bSBmYWx0ZW5cIixcbiAgICAgICAgICAgIFwidW5mb2xkXCI6IFwiVGVpbGJhdW0gZW50ZmFsdGVuXCIsXG5cdFx0XHRcbiAgICAgICAgICAgIFwiZmxpcFN1YnRyZWVcIjogXCJUZWlsYmF1bSB1bWRyZWhlblwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiZWRnZVwiOntcbiAgICAgICAgICAgIFwiaW5qZWN0RGVjaXNpb25Ob2RlXCI6IFwiRW50c2NoZWlkdW5nc2tub3RlbiBJbmppemllcmVuXCIsXG4gICAgICAgICAgICBcImluamVjdENoYW5jZU5vZGVcIjogXCJadWZhbGwgS25vdGVuIEluaml6aWVyZW5cIlxuICAgICAgICB9LFxuICAgICAgICBcInRleHRcIjp7XG4gICAgICAgICAgICBcImRlbGV0ZVwiOiBcIkzDtnNjaGVuXCJcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXCJ2YWxpZGF0aW9uXCI6e1xuICAgICAgICBcImluY29tcGxldGVQYXRoXCI6IFwiUGZhZCwgZGVyIG5pY2h0IG1pdCBkZW0gRW5ka25vdGVuIGVuZGV0XCIsXG4gICAgICAgIFwicHJvYmFiaWxpdHlEb05vdFN1bVVwVG8xXCI6IFwiRGllIFN1bW1lIGRlciBXYWhyc2NoZWlubGljaGtlaXRlbiBpc3QgbmljaHQgZ2xlaWNoIDFcIixcbiAgICAgICAgXCJpbnZhbGlkUHJvYmFiaWxpdHlcIjogXCJVbmfDvGx0aWdlIFdhaHJzY2hlaW5saWNoa2VpdCBpbSBad2VpZyAje3tudW1iZXJ9fVwiLFxuICAgICAgICBcImludmFsaWRQYXlvZmZcIjogXCJVbmfDvGx0aWdlIEF1c3phaGx1bmcgaW4gWndlaWcgI3t7bnVtYmVyfX1cIlxuICAgIH0sXG4gICAgXCJncm93bFwiOntcbiAgICAgICAgXCJicnVzaERpc2FibGVkXCI6IFwiQXVzd2FobGLDvHJzdGUgZGVha3RpdmllcnRcIixcbiAgICAgICAgXCJicnVzaEVuYWJsZWRcIjogXCJBdXN3YWhsYsO8cnN0ZSBha3RpdmllcnRcIlxuICAgIH0sXG4gICAgXCJ0b29sdGlwXCI6e1xuICAgICAgICBcIm5vZGVcIjp7XG4gICAgICAgICAgICBcInBheW9mZlwiOiB7XG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiQXVzemFobHVuZyB7e251bWJlcn19XCIsXG4gICAgICAgICAgICAgICAgXCJuYW1lZFwiOiBcInt7bmFtZX19XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImFnZ3JlZ2F0ZWRQYXlvZmZcIjoge1xuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIkFnZ3JlZ2llcnRlIEF1c3phaGx1bmcge3tudW1iZXJ9fVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJBZ2dyZWdpZXJ0ZSB7e25hbWV9fVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJwcm9iYWJpbGl0eVRvRW50ZXJcIjogXCJXYWhyc2NoZWlubGljaGtlaXRcIlxuICAgICAgICB9LFxuICAgICAgICBcImVkZ2VcIjp7XG4gICAgICAgICAgICBcInBheW9mZlwiOiB7XG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiQXVzemFobHVuZyB7e251bWJlcn19OiB7e3ZhbHVlfX1cIixcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwie3tuYW1lfX06IHt7dmFsdWV9fVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJwcm9iYWJpbGl0eVwiOiBcIldhaHJzY2hlaW5saWNoa2VpdDoge3t2YWx1ZX19XCJcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgICBcImNvbnRleHRNZW51XCI6e1xuICAgICAgICBcIm1haW5cIjp7XG4gICAgICAgICAgICBcImFkZERlY2lzaW9uTm9kZVwiOiBcIkFkZCBEZWNpc2lvbiBOb2RlXCIsXG4gICAgICAgICAgICBcImFkZENoYW5jZU5vZGVcIjogXCJBZGQgQ2hhbmNlIE5vZGVcIixcbiAgICAgICAgICAgIFwiYWRkVGV4dFwiOiBcIkFkZCBUZXh0XCIsXG4gICAgICAgICAgICBcInBhc3RlXCI6IFwiUGFzdGVcIixcbiAgICAgICAgICAgIFwic2VsZWN0QWxsTm9kZXNcIjogXCJTZWxlY3QgYWxsIG5vZGVzXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJub2RlXCI6e1xuICAgICAgICAgICAgXCJjb3B5XCI6IFwiQ29weVwiLFxuICAgICAgICAgICAgXCJjdXRcIjogXCJDdXRcIixcbiAgICAgICAgICAgIFwicGFzdGVcIjogXCJQYXN0ZVwiLFxuICAgICAgICAgICAgXCJkZWxldGVcIjogXCJEZWxldGVcIixcbiAgICAgICAgICAgIFwiYWRkRGVjaXNpb25Ob2RlXCI6IFwiQWRkIERlY2lzaW9uIE5vZGVcIixcbiAgICAgICAgICAgIFwiYWRkQ2hhbmNlTm9kZVwiOiBcIkFkZCBDaGFuY2UgTm9kZVwiLFxuICAgICAgICAgICAgXCJhZGRUZXJtaW5hbE5vZGVcIjogXCJBZGQgVGVybWluYWwgTm9kZVwiLFxuICAgICAgICAgICAgXCJjb252ZXJ0XCI6e1xuICAgICAgICAgICAgICAgIFwiZGVjaXNpb25cIjogXCJBcyBEZWNpc2lvbiBOb2RlXCIsXG4gICAgICAgICAgICAgICAgXCJjaGFuY2VcIjogXCJBcyBDaGFuY2UgTm9kZVwiLFxuICAgICAgICAgICAgICAgIFwidGVybWluYWxcIjogXCJBcyBUZXJtaW5hbCBOb2RlXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInNlbGVjdFN1YnRyZWVcIjogXCJTZWxlY3Qgc3VidHJlZVwiLFxuICAgICAgICAgICAgXCJmb2xkXCI6IFwiRm9sZCBzdWJ0cmVlXCIsXG4gICAgICAgICAgICBcInVuZm9sZFwiOiBcIlVuZm9sZCBzdWJ0cmVlXCIsXG4gICAgICAgICAgICBcImZsaXBTdWJ0cmVlXCI6IFwiRmxpcCBzdWJ0cmVlXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJlZGdlXCI6e1xuICAgICAgICAgICAgXCJpbmplY3REZWNpc2lvbk5vZGVcIjogXCJJbmplY3QgRGVjaXNpb24gTm9kZVwiLFxuICAgICAgICAgICAgXCJpbmplY3RDaGFuY2VOb2RlXCI6IFwiSW5qZWN0IENoYW5jZSBOb2RlXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJ0ZXh0XCI6e1xuICAgICAgICAgICAgXCJkZWxldGVcIjogXCJEZWxldGVcIlxuICAgICAgICB9XG4gICAgfSxcbiAgICBcInZhbGlkYXRpb25cIjp7XG4gICAgICAgIFwiaW5jb21wbGV0ZVBhdGhcIjogXCJQYXRoIG5vdCBlbmRpbmcgd2l0aCB0ZXJtaW5hbCBub2RlXCIsXG4gICAgICAgIFwicHJvYmFiaWxpdHlEb05vdFN1bVVwVG8xXCI6IFwiUHJvYmFiaWxpdGllcyBkbyBub3Qgc3VtIHVwIHRvIDFcIixcbiAgICAgICAgXCJpbnZhbGlkUHJvYmFiaWxpdHlcIjogXCJJbnZhbGlkIHByb2JhYmlsaXR5IGluIGVkZ2UgI3t7bnVtYmVyfX1cIixcbiAgICAgICAgXCJpbnZhbGlkUGF5b2ZmXCI6IFwiSW52YWxpZCBwYXlvZmYgaW4gZWRnZSAje3tudW1iZXJ9fVwiXG4gICAgfSxcbiAgICBcImdyb3dsXCI6e1xuICAgICAgICBcImJydXNoRGlzYWJsZWRcIjogXCJTZWxlY3Rpb24gYnJ1c2ggZGlzYWJsZWRcIixcbiAgICAgICAgXCJicnVzaEVuYWJsZWRcIjogXCJTZWxlY3Rpb24gYnJ1c2ggZW5hYmxlZFwiXG4gICAgfSxcbiAgICBcInRvb2x0aXBcIjp7XG4gICAgICAgIFwibm9kZVwiOntcbiAgICAgICAgICAgIFwicGF5b2ZmXCI6IHtcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJQYXlvZmYge3tudW1iZXJ9fVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJ7e25hbWV9fVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJhZ2dyZWdhdGVkUGF5b2ZmXCI6IHtcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJBZ2dyZWdhdGVkIFBheW9mZiB7e251bWJlcn19XCIsXG4gICAgICAgICAgICAgICAgXCJuYW1lZFwiOiBcIkFnZ3JlZ2F0ZWQge3tuYW1lfX1cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwicHJvYmFiaWxpdHlUb0VudGVyXCI6IFwiUHJvYmFiaWxpdHkgdG8gZW50ZXJcIlxuICAgICAgICB9LFxuICAgICAgICBcImVkZ2VcIjp7XG4gICAgICAgICAgICBcInBheW9mZlwiOiB7XG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiUGF5b2ZmIHt7bnVtYmVyfX06IHt7dmFsdWV9fVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJ7e25hbWV9fToge3t2YWx1ZX19XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInByb2JhYmlsaXR5XCI6IFwiUHJvYmFiaWxpdHk6IHt7dmFsdWV9fVwiXG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cz17XG4gICAgXCJjb250ZXh0TWVudVwiOntcbiAgICAgICAgXCJtYWluXCI6e1xuICAgICAgICAgICAgXCJhZGREZWNpc2lvbk5vZGVcIjogXCJBam91dGVyIG5vdWQgZGUgZMOpY2lzaW9uXCIsXG4gICAgICAgICAgICBcImFkZENoYW5jZU5vZGVcIjogXCJBam91dGVyIG5vdWQgYWzDqWF0b2lyZVwiLFxuICAgICAgICAgICAgXCJhZGRUZXh0XCI6IFwiQWpvdXRlciBkdSB0ZXh0ZVwiLFxuICAgICAgICAgICAgXCJwYXN0ZVwiOiBcIkNvbGxlclwiLFxuICAgICAgICAgICAgXCJzZWxlY3RBbGxOb2Rlc1wiOiBcIlPDqWxlY3Rpb25uZXIgdG91cyBsZXMgbm91ZHNcIlxuICAgICAgICB9LFxuICAgICAgICBcIm5vZGVcIjp7XG4gICAgICAgICAgICBcImNvcHlcIjogXCJDb3BpZVwiLFxuICAgICAgICAgICAgXCJjdXRcIjogXCJDb3VwZXJcIixcbiAgICAgICAgICAgIFwicGFzdGVcIjogXCJDb2xsZXJcIixcbiAgICAgICAgICAgIFwiZGVsZXRlXCI6IFwiRWZmYWNlclwiLFxuICAgICAgICAgICAgXCJhZGREZWNpc2lvbk5vZGVcIjogXCJBam91dGVyIG5vdWQgZGUgZMOpY2lzaW9uXCIsXG4gICAgICAgICAgICBcImFkZENoYW5jZU5vZGVcIjogXCJBam91dGVyIG5vdWQgYWzDqWF0b2lyZVwiLFxuICAgICAgICAgICAgXCJhZGRUZXJtaW5hbE5vZGVcIjogXCJBam91dGVyIHVuIG5vZXVkIHRlcm1pbmFsXCIsXG4gICAgICAgICAgICBcImNvbnZlcnRcIjp7XG4gICAgICAgICAgICAgICAgXCJkZWNpc2lvblwiOiBcIkNvbW1lIG5vdWQgZGUgZMOpY2lzaW9uXCIsXG4gICAgICAgICAgICAgICAgXCJjaGFuY2VcIjogXCJDb21tZSBub3VkIGFsw6lhdG9pcmVcIixcbiAgICAgICAgICAgICAgICBcInRlcm1pbmFsXCI6IFwiQ29tbWUgdW4gbm9ldWQgdGVybWluYWxcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwic2VsZWN0U3VidHJlZVwiOiBcIlPDqWxlY3Rpb25uZXIgdW5lIHNvdXMtYXJib3Jlc2NlbmNlXCIsXG4gICAgICAgICAgICBcImZvbGRcIjogXCJQbGllciBzb3VzLWFyYnJlXCIsXG4gICAgICAgICAgICBcInVuZm9sZFwiOiBcIkTDqXBsaWVyIGFyYnJlIHNvdXMtYXJicmVcIixcbiAgICAgICAgICAgIFwiZmxpcFN1YnRyZWVcIjogXCJCYXNjdWxlciBzb3VzLWFyYnJlXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJlZGdlXCI6e1xuICAgICAgICAgICAgXCJpbmplY3REZWNpc2lvbk5vZGVcIjogXCJJbmplY3RlciB1biBub2V1ZCBkZSBkw6ljaXNpb25cIixcbiAgICAgICAgICAgIFwiaW5qZWN0Q2hhbmNlTm9kZVwiOiBcIkluamVjdGVyIHVuIG5vZXVkIGRlIGNoYW5jZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwidGV4dFwiOntcbiAgICAgICAgICAgIFwiZGVsZXRlXCI6IFwiRWZmYWNlclwiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwidmFsaWRhdGlvblwiOntcbiAgICAgICAgXCJpbmNvbXBsZXRlUGF0aFwiOiBcIlBhcmNvdXJzIG5vbiB0ZXJtaW7DqSBwYXIgbm9ldWQgdGVybWluYWxcIixcbiAgICAgICAgXCJwcm9iYWJpbGl0eURvTm90U3VtVXBUbzFcIjogXCJMYSBzb21tZSBkZXMgcHJvYmFiaWxpdMOpcyBuJ2VzdCBwYXMgMSBvdSBwbHVzXCIsXG4gICAgICAgIFwiaW52YWxpZFByb2JhYmlsaXR5XCI6IFwiUHJvYmFiaWxpdMOpIGludmFsaWRlIC0gbGUgYm9yZCAje3tudW1iZXJ9fVwiLFxuICAgICAgICBcImludmFsaWRQYXlvZmZcIjogXCJBdmFudGFnZSBpbnZhbGlkZSAtIGxlIGJvcmQgI3t7bnVtYmVyfX1cIlxuICAgIH0sXG4gICAgXCJncm93bFwiOntcbiAgICAgICAgXCJicnVzaERpc2FibGVkXCI6IFwiQnJvc3NlIGRlIHPDqWxlY3Rpb24gZMOpc2FjdGl2w6llXCIsXG4gICAgICAgIFwiYnJ1c2hFbmFibGVkXCI6IFwiQnJvc3NlIGRlIHPDqWxlY3Rpb24gYWN0aXbDqWVcIlxuICAgIH0sXG4gICAgXCJ0b29sdGlwXCI6e1xuICAgICAgICBcIm5vZGVcIjp7XG4gICAgICAgICAgICBcInBheW9mZlwiOiB7XG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiQXZhbnRhZ2Uge3tudW1iZXJ9fVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJ7e25hbWV9fVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJhZ2dyZWdhdGVkUGF5b2ZmXCI6IHtcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJBdmFudGFnZSBhZ3LDqWfDqSB7e251bWJlcn19XCIsXG4gICAgICAgICAgICAgICAgXCJuYW1lZFwiOiBcIkFncsOpZ8OpICB7e25hbWV9fVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJwcm9iYWJpbGl0eVRvRW50ZXJcIjogXCJQcm9iYWJpbGl0w6kgZCdlbnRyw6llXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJlZGdlXCI6e1xuICAgICAgICAgICAgXCJwYXlvZmZcIjoge1xuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIkF2YW50YWdlIHt7bnVtYmVyfX06IHt7dmFsdWV9fVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJ7e25hbWV9fToge3t2YWx1ZX19XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInByb2JhYmlsaXR5XCI6IFwiUHJvYmFiaWxpdMOpOiB7e3ZhbHVlfX1cIlxuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IGkxOG5leHQgZnJvbSAnaTE4bmV4dCc7XG5pbXBvcnQgKiBhcyBlbiBmcm9tICcuL2VuLmpzb24nXG5pbXBvcnQgKiBhcyBwbCBmcm9tICcuL3BsLmpzb24nXG5pbXBvcnQgKiBhcyBpdCBmcm9tICcuL2l0Lmpzb24nXG5pbXBvcnQgKiBhcyBkZSBmcm9tICcuL2RlLmpzb24nXG5pbXBvcnQgKiBhcyBmciBmcm9tICcuL2ZyLmpzb24nXG5cbmV4cG9ydCBjbGFzcyBpMThue1xuXG4gICAgc3RhdGljICRpbnN0YW5jZTtcbiAgICBzdGF0aWMgbGFuZ3VhZ2U7XG5cbiAgICBzdGF0aWMgaW5pdChsbmcpe1xuICAgICAgICBpMThuLmxhbmd1YWdlID0gbG5nO1xuICAgICAgICBsZXQgcmVzb3VyY2VzID0ge1xuICAgICAgICAgICAgZW46IHtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGlvbjogZW5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwbDoge1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0aW9uOiBwbFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGl0OiB7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRpb246IGl0XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGU6IHtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGlvbjogZGVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmcjoge1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0aW9uOiBmclxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBpMThuLiRpbnN0YW5jZSA9IGkxOG5leHQuY3JlYXRlSW5zdGFuY2Uoe1xuICAgICAgICAgICAgbG5nOiBsbmcsXG4gICAgICAgICAgICBmYWxsYmFja0xuZzogJ2VuJyxcbiAgICAgICAgICAgIHJlc291cmNlczogcmVzb3VyY2VzXG4gICAgICAgIH0sIChlcnIsIHQpID0+IHtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIHQoa2V5LCBvcHQpe1xuICAgICAgICByZXR1cm4gaTE4bi4kaW5zdGFuY2UudChrZXksIG9wdClcbiAgICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cz17XG4gICAgXCJjb250ZXh0TWVudVwiOntcbiAgICAgICAgXCJtYWluXCI6e1xuICAgICAgICAgICAgXCJhZGREZWNpc2lvbk5vZGVcIjogXCJBZ2dpdW5naSB1biBub2RvIGRpIGRlY2lzaW9uZVwiLFxuICAgICAgICAgICAgXCJhZGRDaGFuY2VOb2RlXCI6IFwiQWdnaXVuZ2kgdW4gbm9kbyBvcHBvcnR1bml0w6BcIixcbiAgICAgICAgICAgIFwiYWRkVGV4dFwiOiBcIkFnZ2l1bmdpIHRlc3RvXCIsXG4gICAgICAgICAgICBcInBhc3RlXCI6IFwiSW5jb2xsYVwiLFxuICAgICAgICAgICAgXCJzZWxlY3RBbGxOb2Rlc1wiOiBcIlNlbGV6aW9uYSB0dXR0aSBpIG5vZGlcIlxuICAgICAgICB9LFxuICAgICAgICBcIm5vZGVcIjp7XG4gICAgICAgICAgICBcImNvcHlcIjogXCJDb3BpYVwiLFxuICAgICAgICAgICAgXCJjdXRcIjogXCJUYWdsaWFcIixcbiAgICAgICAgICAgIFwicGFzdGVcIjogXCJJbmNvbGxhXCIsXG4gICAgICAgICAgICBcImRlbGV0ZVwiOiBcIkNhbmNlbGxhXCIsXG4gICAgICAgICAgICBcImFkZERlY2lzaW9uTm9kZVwiOiBcIkFnZ2l1bmdpIHVuIG5vZG8gZGkgZGVjaXNpb25lXCIsXG4gICAgICAgICAgICBcImFkZENoYW5jZU5vZGVcIjogXCJBZ2dpdW5naSB1biBub2RvIG9wcG9ydHVuaXTDoFwiLFxuICAgICAgICAgICAgXCJhZGRUZXJtaW5hbE5vZGVcIjogXCJBZ2dpdW5naSB1biBub2RvIHRlcm1pbmFsZVwiLFxuICAgICAgICAgICAgXCJjb252ZXJ0XCI6e1xuICAgICAgICAgICAgICAgIFwiZGVjaXNpb25cIjogXCJDb21lIERlY2lzaW9uIE5vZGVcIixcbiAgICAgICAgICAgICAgICBcImNoYW5jZVwiOiBcIkNvbWUgQ2hhbmNlIE5vZGVcIixcbiAgICAgICAgICAgICAgICBcInRlcm1pbmFsXCI6IFwiQ29tZSBUZXJtaW5hbCBOb2RlXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInNlbGVjdFN1YnRyZWVcIjogXCJTZWxlemlvbmEgU290dG8tYWxiZXJvXCIsXG4gICAgICAgICAgICBcImZvbGRcIjogXCJQaWVnYSBzb3R0by1hbGJlcm9cIixcbiAgICAgICAgICAgIFwidW5mb2xkXCI6IFwiRGlzcGllZ2Fyc2kgc290dG8tYWxiZXJvXCIsXHRcdFx0XG4gICAgICAgICAgICBcImZsaXBTdWJ0cmVlXCI6IFwiUmliYWx0YSBzb3R0by1hbGJlcm9cIlxuICAgICAgICB9LFxuICAgICAgICBcImVkZ2VcIjp7XG4gICAgICAgICAgICBcImluamVjdERlY2lzaW9uTm9kZVwiOiBcIkluaWV0dGEgbm9kbyBkaSBkZWNpc2lvbmVcIixcbiAgICAgICAgICAgIFwiaW5qZWN0Q2hhbmNlTm9kZVwiOiBcIkluaWV0dGEgbm9kbyBvcHBvcnR1bml0w6BcIlxuICAgICAgICB9LFxuICAgICAgICBcInRleHRcIjp7XG4gICAgICAgICAgICBcImRlbGV0ZVwiOiBcIkNhbmNlbGxhXCJcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXCJ2YWxpZGF0aW9uXCI6e1xuICAgICAgICBcImluY29tcGxldGVQYXRoXCI6IFwiUGVyY29yc28gc2VuemEgbm9kbyB0ZXJtaW5hbGVcIixcbiAgICAgICAgXCJwcm9iYWJpbGl0eURvTm90U3VtVXBUbzFcIjogXCJMYSBzb21tYSBkZWxsZSBwcm9iYWJpbGl0w6Agw6ggZGl2ZXJzYSBkYSAxXCIsXG4gICAgICAgIFwiaW52YWxpZFByb2JhYmlsaXR5XCI6IFwiUHJvYmFiaWxpdMOgIG5vbiB2YWxpZGEgLSBib3JkbyAje3tudW1iZXJ9fVwiLFxuICAgICAgICBcImludmFsaWRQYXlvZmZcIjogXCJTYWxkbyBub24gdmFsaWRvIC0gYm9yZG8gI3t7bnVtYmVyfX1cIlxuICAgIH0sXG4gICAgXCJncm93bFwiOntcbiAgICAgICAgXCJicnVzaERpc2FibGVkXCI6IFwiU2VsZXppb25lIHBlbm5lbGxvIGRpc2FiaWxpdGF0YVwiLFxuICAgICAgICBcImJydXNoRW5hYmxlZFwiOiBcIlNlbGV6aW9uZSBwZW5uZWxsbyBhYmlsaXRhdGFcIlxuICAgIH0sXG4gICAgXCJ0b29sdGlwXCI6e1xuICAgICAgICBcIm5vZGVcIjp7XG4gICAgICAgICAgICBcInBheW9mZlwiOiB7XG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiU2FsZG8ge3tudW1iZXJ9fVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJ7e25hbWV9fVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJhZ2dyZWdhdGVkUGF5b2ZmXCI6IHtcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJTYWxkbyBhZ2dyZWdhdG8ge3tudW1iZXJ9fVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJBZ2dyZWdhdG8ge3tuYW1lfX1cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwicHJvYmFiaWxpdHlUb0VudGVyXCI6IFwiUHJvYmFiaWxpdMOgIGRhIGluc2VyaXJlXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJlZGdlXCI6e1xuICAgICAgICAgICAgXCJwYXlvZmZcIjoge1xuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIlNhbGRvIHt7bnVtYmVyfX06IHt7dmFsdWV9fVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJ7e25hbWV9fToge3t2YWx1ZX19XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInByb2JhYmlsaXR5XCI6IFwiUHJvYmFiaWxpdMOgOiB7e3ZhbHVlfX1cIlxuICAgICAgICB9XG4gICAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHM9e1xuXG4gICAgXCJjb250ZXh0TWVudVwiOntcbiAgICAgICAgXCJtYWluXCI6e1xuICAgICAgICAgICAgXCJhZGREZWNpc2lvbk5vZGVcIjogXCJEb2RhaiBXxJl6ZcWCIERlY3l6eWpueVwiLFxuICAgICAgICAgICAgXCJhZGRDaGFuY2VOb2RlXCI6IFwiRG9kYWogV8SZemXFgiBMb3Nvd3lcIixcbiAgICAgICAgICAgIFwiYWRkVGV4dFwiOiBcIkRvZGFqIFRla3N0XCIsXG4gICAgICAgICAgICBcInBhc3RlXCI6IFwiV2tsZWpcIixcbiAgICAgICAgICAgIFwic2VsZWN0QWxsTm9kZXNcIjogXCJaYXpuYWN6IHdzenlzdGtpZSB3xJl6xYJ5XCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJub2RlXCI6e1xuICAgICAgICAgICAgXCJjb3B5XCI6IFwiS29waXVqXCIsXG4gICAgICAgICAgICBcImN1dFwiOiBcIld5dG5palwiLFxuICAgICAgICAgICAgXCJwYXN0ZVwiOiBcIldrbGVqXCIsXG4gICAgICAgICAgICBcImRlbGV0ZVwiOiBcIlVzdcWEXCIsXG4gICAgICAgICAgICBcImFkZERlY2lzaW9uTm9kZVwiOiBcIkRvZGFqIFfEmXplxYIgRGVjeXp5am55XCIsXG4gICAgICAgICAgICBcImFkZENoYW5jZU5vZGVcIjogXCJEb2RhaiBXxJl6ZcWCIExvc293eVwiLFxuICAgICAgICAgICAgXCJhZGRUZXJtaW5hbE5vZGVcIjogXCJEb2RhaiBXxJl6ZcWCIEtvxYRjb3d5XCIsXG4gICAgICAgICAgICBcImNvbnZlcnRcIjp7XG4gICAgICAgICAgICAgICAgXCJkZWNpc2lvblwiOiBcIkpha28gV8SZemXFgiBEZWN5enlqbnlcIixcbiAgICAgICAgICAgICAgICBcImNoYW5jZVwiOiBcIkpha28gV8SZemXFgiBMb3Nvd3lcIixcbiAgICAgICAgICAgICAgICBcInRlcm1pbmFsXCI6IFwiSmFrbyBXxJl6ZcWCIEtvxYRjb3d5XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInNlbGVjdFN1YnRyZWVcIjogXCJaYXpuYWN6IHBvZGRyemV3b1wiLFxuICAgICAgICAgICAgXCJmb2xkXCI6IFwiWndpxYQgcG9kZHJ6ZXdvXCIsXG4gICAgICAgICAgICBcInVuZm9sZFwiOiBcIlJvendpxYQgcG9kZHJ6ZXdvXCIsXG4gICAgICAgICAgICBcImZsaXBTdWJ0cmVlXCI6IFwiUHJ6ZXdyw7PEhyBwb2Rkcnpld29cIlxuICAgICAgICB9LFxuICAgICAgICBcImVkZ2VcIjp7XG4gICAgICAgICAgICBcImluamVjdERlY2lzaW9uTm9kZVwiOiBcIldzdHJ6eWtuaWogV8SZemXFgiBEZWN5enlqbnlcIixcbiAgICAgICAgICAgIFwiaW5qZWN0Q2hhbmNlTm9kZVwiOiBcIldzdHJ6eWtuaWogV8SZemXFgiBMb3Nvd3lcIlxuICAgICAgICB9LFxuICAgICAgICBcInRleHRcIjp7XG4gICAgICAgICAgICBcImRlbGV0ZVwiOiBcIlVzdcWEXCJcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBcInZhbGlkYXRpb25cIjp7XG4gICAgICAgIFwiaW5jb21wbGV0ZVBhdGhcIjogXCJPc3RhdG5pbSB3xJl6xYJlbSB3IMWbY2llxbxjZSBwb3dpbmllbiBiecSHIFfEmXplxYIgS2/FhGNvd3lcIixcbiAgICAgICAgXCJwcm9iYWJpbGl0eURvTm90U3VtVXBUbzFcIjogXCJQcmF3ZG9wb2RvYmllxYRzdHdhIG5pZSBzdW11asSFIHNpZSBkbyAxXCIsXG4gICAgICAgIFwiaW52YWxpZFByb2JhYmlsaXR5XCI6IFwiTmllcG9wcmF3bmUgcHJhd2RvcG9kb2JpZcWEc3R3byBuYSBrcmF3xJlkemkgI3t7bnVtYmVyfX1cIixcbiAgICAgICAgXCJpbnZhbGlkUGF5b2ZmXCI6IFwiTmllcG9wcmF3bmEgd3lwxYJhdGEgbmEga3Jhd8SZZHppICN7e251bWJlcn19XCJcbiAgICB9LFxuICAgIFwiZ3Jvd2xcIjp7XG4gICAgICAgIFwiYnJ1c2hEaXNhYmxlZFwiOiBcIlphem5hY3phbmllIHd5xYLEhWN6b25lXCIsXG4gICAgICAgIFwiYnJ1c2hFbmFibGVkXCI6IFwiWmF6bmFjemFuaWUgd8WCxIVjem9uZVwiXG4gICAgfSxcbiAgICBcInRvb2x0aXBcIjp7XG4gICAgICAgIFwibm9kZVwiOntcbiAgICAgICAgICAgIFwicGF5b2ZmXCI6IHtcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJXeXDFgmF0YSB7e251bWJlcn19XCIsXG4gICAgICAgICAgICAgICAgXCJuYW1lZFwiOiBcInt7bmFtZX19XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImFnZ3JlZ2F0ZWRQYXlvZmZcIjoge1xuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIlphZ3JlZ293YW5hIHd5cMWCYXRhIHt7bnVtYmVyfX1cIixcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwiWmFncmVnb3dhbmEge3tuYW1lfX1cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwicHJvYmFiaWxpdHlUb0VudGVyXCI6IFwiUHJhd2RvcG9kb2JpZcWEc3R3byB3ZWrFm2NpYVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiZWRnZVwiOntcbiAgICAgICAgICAgIFwicGF5b2ZmXCI6IHtcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJXeXDFgmF0YSB7e251bWJlcn19OiB7e3ZhbHVlfX1cIixcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwie3tuYW1lfX06IHt7dmFsdWV9fVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJwcm9iYWJpbGl0eVwiOiBcIlByYXdkb3BvZG9iaWXFhHN0d286IHt7dmFsdWV9fVwiXG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQge0QzRXh0ZW5zaW9uc30gZnJvbSAnLi9kMy1leHRlbnNpb25zJ1xuRDNFeHRlbnNpb25zLmV4dGVuZCgpO1xuXG5leHBvcnQgKiBmcm9tICcuL3RyZWUtZGVzaWduZXInXG5leHBvcnQgKiBmcm9tICcuL2FwcC11dGlscydcbmV4cG9ydCAqIGZyb20gJy4vdGVtcGxhdGVzJ1xuZXhwb3J0ICogZnJvbSAnLi90b29sdGlwJ1xuZXhwb3J0ICogZnJvbSAnLi9kMy1leHRlbnNpb25zJ1xuZXhwb3J0IHtkZWZhdWx0IGFzIGQzfSBmcm9tICcuL2QzJ1xuXG5cbiIsImltcG9ydCB7VXRpbHN9IGZyb20gJ3NkLXV0aWxzJ1xuaW1wb3J0IHtkb21haW4gYXMgbW9kZWx9IGZyb20gJ3NkLW1vZGVsJ1xuaW1wb3J0ICogYXMgZDMgZnJvbSAnLi9kMydcbmltcG9ydCBjaXJjbGVTeW1ib2wgZnJvbSAnLi9zeW1ib2xzL2NpcmNsZSdcbmltcG9ydCB0cmlhbmdsZVN5bWJvbCBmcm9tICcuL3N5bWJvbHMvdHJpYW5nbGUnXG5pbXBvcnQge0FwcFV0aWxzfSBmcm9tIFwiLi9hcHAtdXRpbHNcIjtcblxuLypUcmVlIGxheW91dCBtYW5hZ2VyKi9cbmV4cG9ydCBjbGFzcyBMYXlvdXR7XG5cbiAgICB0cmVlRGVzaWduZXI7XG4gICAgZGF0YTtcbiAgICBjb25maWc7XG5cbiAgICBub2RlVHlwZVRvU3ltYm9sID0ge1xuICAgICAgICAnZGVjaXNpb24nOiBkMy5zeW1ib2xTcXVhcmUsXG4gICAgICAgICdjaGFuY2UnOiBjaXJjbGVTeW1ib2wsXG4gICAgICAgIFwidGVybWluYWxcIjogdHJpYW5nbGVTeW1ib2xcbiAgICB9O1xuXG4gICAgc3RhdGljIE1BTlVBTF9MQVlPVVRfTkFNRSA9ICdtYW51YWwnO1xuXG5cbiAgICBvbkF1dG9MYXlvdXRDaGFuZ2VkPVtdO1xuXG4gICAgbm9kZVR5cGVPcmRlciA9IHtcbiAgICAgICAgJ2RlY2lzaW9uJyA6IDAsXG4gICAgICAgICdjaGFuY2UnOiAwLFxuICAgICAgICAndGVybWluYWwnOiAxXG4gICAgfTtcblxuICAgIHRyZWVNYXJnaW4gPSA1MDtcbiAgICB0YXJnZXRTeW1ib2xTaXplPXt9O1xuICAgIG5vZGVTZXBhcmF0aW9uID0gKGEsIGIpID0+IGEucGFyZW50ID09PSBiLnBhcmVudCA/IDEgOiAxLjJcblxuICAgIGNvbnN0cnVjdG9yKHRyZWVEZXNpZ25lciwgZGF0YSwgY29uZmlnKXtcbiAgICAgICAgdGhpcy50cmVlRGVzaWduZXIgPSB0cmVlRGVzaWduZXI7XG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuXG4gICAgfVxuXG4gICAgdXBkYXRlKG5vZGUpe1xuICAgICAgICBpZihub2RlICYmIG5vZGUuJHBhcmVudCl7XG4gICAgICAgICAgICBub2RlLiRwYXJlbnQuY2hpbGRFZGdlcy5zb3J0KChhLGIpPT5hLmNoaWxkTm9kZS5sb2NhdGlvbi55IC0gYi5jaGlsZE5vZGUubG9jYXRpb24ueSlcbiAgICAgICAgfVxuICAgICAgICBpZighdGhpcy5pc01hbnVhbExheW91dCgpKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmF1dG9MYXlvdXQodGhpcy5jb25maWcudHlwZSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYobm9kZSl7XG4gICAgICAgICAgICB0aGlzLm1vdmVOb2RlVG9FbXB0eVBsYWNlKG5vZGUpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMudHJlZURlc2lnbmVyLnJlZHJhdyh0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzTWFudWFsTGF5b3V0KCl7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy50eXBlID09PSBMYXlvdXQuTUFOVUFMX0xBWU9VVF9OQU1FO1xuICAgIH1cblxuICAgIGdldE5ld0NoaWxkTG9jYXRpb24ocGFyZW50KXtcbiAgICAgICAgaWYoIXBhcmVudCl7XG4gICAgICAgICAgICByZXR1cm4gbmV3IG1vZGVsLlBvaW50KHRoaXMuZ2V0Tm9kZU1pblgoKSwgdGhpcy5nZXROb2RlTWluWSgpKVxuICAgICAgICB9XG4gICAgICAgIHZhciB4ID0gcGFyZW50LmxvY2F0aW9uLnggKyB0aGlzLmNvbmZpZy5ncmlkV2lkdGg7XG4gICAgICAgIHZhciB5ID0gcGFyZW50LmxvY2F0aW9uLnk7XG4gICAgICAgIGlmKHBhcmVudC5jaGlsZEVkZ2VzLmxlbmd0aCl7XG4gICAgICAgICAgICB5ID0gcGFyZW50LmNoaWxkRWRnZXNbcGFyZW50LmNoaWxkRWRnZXMubGVuZ3RoLTFdLmNoaWxkTm9kZS5sb2NhdGlvbi55KzE7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IG1vZGVsLlBvaW50KHgsIHkpXG4gICAgfVxuXG4gICAgZ2V0SW5qZWN0ZWROb2RlTG9jYXRpb24oZWRnZSl7XG5cbiAgICAgICAgdmFyIHAgPSBlZGdlLiRsaW5lUG9pbnRzWzJdO1xuXG4gICAgICAgIHJldHVybiBuZXcgbW9kZWwuUG9pbnQocFswXSwgcFsxXSlcbiAgICB9XG5cbiAgICBtb3ZlTm9kZVRvRW1wdHlQbGFjZShub2RlLCByZWRyYXdJZkNoYW5nZWQ9dHJ1ZSl7XG4gICAgICAgIHZhciBwb3NpdGlvbk1hcCA9IHt9O1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIG5vZGUubG9jYXRpb24ueCA9IE1hdGgubWF4KHRoaXMuZ2V0Tm9kZU1pblgobm9kZSksIG5vZGUubG9jYXRpb24ueCk7XG4gICAgICAgIG5vZGUubG9jYXRpb24ueSA9IE1hdGgubWF4KHRoaXMuZ2V0Tm9kZU1pblkobm9kZSksIG5vZGUubG9jYXRpb24ueSk7XG5cblxuICAgICAgICB0aGlzLm5vZGVzU29ydGVkQnlYID0gdGhpcy5kYXRhLm5vZGVzLnNsaWNlKCk7XG4gICAgICAgIHRoaXMubm9kZXNTb3J0ZWRCeVguc29ydCgoYSxiKT0+YS5sb2NhdGlvbi54IC0gYi5sb2NhdGlvbi54KTtcblxuICAgICAgICBmdW5jdGlvbiBmaW5kQ29sbGlkaW5nTm9kZShub2RlLCBsb2NhdGlvbil7XG4gICAgICAgICAgICByZXR1cm4gVXRpbHMuZmluZChzZWxmLm5vZGVzU29ydGVkQnlYLCBuPT57XG4gICAgICAgICAgICAgICAgaWYobm9kZSA9PSBuKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBtYXJnaW4gPSBzZWxmLmNvbmZpZy5ub2RlU2l6ZS8zO1xuICAgICAgICAgICAgICAgIHZhciB4ID0gbi5sb2NhdGlvbi54O1xuICAgICAgICAgICAgICAgIHZhciB5ID0gbi5sb2NhdGlvbi55O1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIChsb2NhdGlvbi54IC0gbWFyZ2luIDw9IHggJiYgbG9jYXRpb24ueCArIG1hcmdpbiA+PSB4XG4gICAgICAgICAgICAgICAgICAgICYmIGxvY2F0aW9uLnkgLSBtYXJnaW4gPD0geSAmJiBsb2NhdGlvbi55ICsgbWFyZ2luID49IHkpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzdGVwWCA9IHRoaXMuY29uZmlnLm5vZGVTaXplLzI7XG4gICAgICAgIHZhciBzdGVwWSA9IHRoaXMuY29uZmlnLm5vZGVTaXplKzEwO1xuICAgICAgICB2YXIgc3RlcFhzYW1lUGFyZW50ID0gMDtcbiAgICAgICAgdmFyIHN0ZXBZc2FtZVBhcmVudCA9IDc1O1xuICAgICAgICB2YXIgY2hhbmdlZCA9IGZhbHNlO1xuICAgICAgICB2YXIgY29saWRpbmdOb2RlO1xuICAgICAgICB2YXIgbmV3TG9jYXRpb24gPSBuZXcgbW9kZWwuUG9pbnQobm9kZS5sb2NhdGlvbik7XG4gICAgICAgIHdoaWxlKGNvbGlkaW5nTm9kZSA9IGZpbmRDb2xsaWRpbmdOb2RlKG5vZGUsIG5ld0xvY2F0aW9uKSl7XG4gICAgICAgICAgICBjaGFuZ2VkPXRydWU7XG4gICAgICAgICAgICB2YXIgc2FtZVBhcmVudCA9IG5vZGUuJHBhcmVudCAmJiBjb2xpZGluZ05vZGUuJHBhcmVudCAmJiBub2RlLiRwYXJlbnQ9PT1jb2xpZGluZ05vZGUuJHBhcmVudDtcbiAgICAgICAgICAgIGlmKHNhbWVQYXJlbnQpe1xuICAgICAgICAgICAgICAgIG5ld0xvY2F0aW9uLm1vdmUoc3RlcFhzYW1lUGFyZW50LCBzdGVwWXNhbWVQYXJlbnQpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgbmV3TG9jYXRpb24ubW92ZShzdGVwWCwgc3RlcFkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmKGNoYW5nZWQpe1xuICAgICAgICAgICAgbm9kZS5tb3ZlVG8obmV3TG9jYXRpb24ueCxuZXdMb2NhdGlvbi55LCB0cnVlKTtcbiAgICAgICAgICAgIGlmKHJlZHJhd0lmQ2hhbmdlZCl7XG4gICAgICAgICAgICAgICAgdGhpcy50cmVlRGVzaWduZXIucmVkcmF3KHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGlzYWJsZUF1dG9MYXlvdXQoKXtcbiAgICAgICAgdGhpcy5jb25maWcudHlwZSA9IExheW91dC5NQU5VQUxfTEFZT1VUX05BTUU7XG4gICAgICAgIHRoaXMuX2ZpcmVPbkF1dG9MYXlvdXRDaGFuZ2VkQ2FsbGJhY2tzKCk7XG4gICAgfVxuXG5cbiAgICBub2RlU3ltYm9sU2l6ZSA9IHt9O1xuICAgIGRyYXdOb2RlU3ltYm9sKHBhdGgsIHRyYW5zaXRpb24pe1xuXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIG5vZGVTaXplID0gdGhpcy5jb25maWcubm9kZVNpemU7XG4gICAgICAgIHRoaXMubm9kZVN5bWJvbCA9IGQzLnN5bWJvbCgpLnR5cGUoZD0+IHNlbGYubm9kZVR5cGVUb1N5bWJvbFtkLnR5cGVdKVxuICAgICAgICAgICAgLnNpemUoZD0+c2VsZi5ub2RlU3ltYm9sU2l6ZVtkLiRpZF0gPyBVdGlscy5nZXQoc2VsZi50YXJnZXRTeW1ib2xTaXplLCBkLnR5cGUrXCJbJ1wiK3NlbGYuY29uZmlnLm5vZGVTaXplK1wiJ11cIiwgNjQpIDogNjQpO1xuXG4gICAgICAgIHBhdGhcbiAgICAgICAgICAgIC5lYWNoKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgdmFyIHBhdGggPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgICAgICAgICAgdmFyIHByZXYgPSBwYXRoLmF0dHIoXCJkXCIpO1xuICAgICAgICAgICAgICAgIGlmKCFwcmV2KXtcbiAgICAgICAgICAgICAgICAgICAgcGF0aC5hdHRyKFwiZFwiLCBzZWxmLm5vZGVTeW1ib2wpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgc2l6ZSA9IFV0aWxzLmdldChzZWxmLnRhcmdldFN5bWJvbFNpemUsIGQudHlwZStcIlsnXCIrc2VsZi5jb25maWcubm9kZVNpemUrXCInXVwiKTtcbiAgICAgICAgICAgICAgICBpZighc2l6ZSl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBib3ggPSBwYXRoLm5vZGUoKS5nZXRCQm94KCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IE1hdGgubWluKG5vZGVTaXplIC8gYm94LndpZHRoLCBub2RlU2l6ZSAvIGJveC5oZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICBzaXplID0gZXJyb3IgKiBlcnJvciAqIChzZWxmLm5vZGVTeW1ib2xTaXplW2QuJGlkXXx8NjQpO1xuICAgICAgICAgICAgICAgICAgICBVdGlscy5zZXQoc2VsZi50YXJnZXRTeW1ib2xTaXplLCBkLnR5cGUrXCJbJ1wiK3NlbGYuY29uZmlnLm5vZGVTaXplK1wiJ11cIiwgc2l6ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKHRyYW5zaXRpb24pe1xuICAgICAgICAgICAgICAgICAgICBwYXRoID0gIHBhdGgudHJhbnNpdGlvbigpO1xuXG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubm9kZVN5bWJvbFNpemVbZC4kaWRdID0gc2l6ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcGF0aC5hdHRyKFwiZFwiLCBzZWxmLm5vZGVTeW1ib2wpO1xuICAgICAgICAgICAgICAgIGlmKHRyYW5zaXRpb24pe1xuICAgICAgICAgICAgICAgICAgICBzZWxmLm5vZGVTeW1ib2xTaXplW2QuJGlkXSA9IHNpemU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbm9kZUxhYmVsUG9zaXRpb24oc2VsZWN0aW9uKSB7XG4gICAgICAgIHJldHVybiBzZWxlY3Rpb25cbiAgICAgICAgICAgIC5hdHRyKCd4JywgMClcbiAgICAgICAgICAgIC5hdHRyKCd5JywgLXRoaXMuY29uZmlnLm5vZGVTaXplIC8gMiAtIDcpXG4gICAgfVxuXG4gICAgbm9kZVBheW9mZlBvc2l0aW9uKHNlbGVjdGlvbikge1xuICAgICAgICByZXR1cm4gTGF5b3V0LnNldEhhbmdpbmdQb3NpdGlvbihzZWxlY3Rpb24pXG4gICAgICAgICAgICAuYXR0cigneCcsIDApXG4gICAgICAgICAgICAuYXR0cigneScsIHRoaXMuY29uZmlnLm5vZGVTaXplIC8gMiArIDcpXG4gICAgICAgICAgICAuYXR0cigndGV4dC1hbmNob3InLCAnbWlkZGxlJylcbiAgICB9XG5cbiAgICBub2RlQWdncmVnYXRlZFBheW9mZlBvc2l0aW9uKHNlbGVjdGlvbikge1xuICAgICAgICB2YXIgeCA9IHRoaXMuY29uZmlnLm5vZGVTaXplIC8gMiArIDc7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgc2VsZWN0aW9uXG4gICAgICAgICAgICAuYXR0cigneCcsIHgpXG4gICAgICAgICAgICAuYXR0cigneScsIGZ1bmN0aW9uKGQpe1xuICAgICAgICAgICAgICAgIGxldCBmb250U2l6ZSA9IHBhcnNlSW50KEFwcFV0aWxzLmdldEZvbnRTaXplKHRoaXMpKTtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbXMgPSBkLmRpc3BsYXlWYWx1ZSgnYWdncmVnYXRlZFBheW9mZicpO1xuICAgICAgICAgICAgICAgIGxldCBudW1iZXIgPSBVdGlscy5pc0FycmF5KGl0ZW1zKSA/IGl0ZW1zLmZpbHRlcihpdD0+aXQgIT09IHVuZGVmaW5lZCkubGVuZ3RoIDogMTtcbiAgICAgICAgICAgICAgICBpZihudW1iZXI+MSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAtdGhpcy5nZXRCQm94KCkuaGVpZ2h0LzIgKyBmb250U2l6ZS8yO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gLU1hdGgubWF4KDIsIDEuOCogc2VsZi5jb25maWcubm9kZVNpemUvZm9udFNpemUpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgc2VsZWN0aW9uLnNlbGVjdEFsbCgndHNwYW4nKS5hdHRyKCd4JywgeCk7XG4gICAgICAgIHJldHVybiBzZWxlY3Rpb247XG4gICAgICAgICAgICAvLyAuYXR0cigndGV4dC1hbmNob3InLCAnbWlkZGxlJylcbiAgICAgICAgICAgIC8vIC5hdHRyKCdkb21pbmFudC1iYXNlbGluZScsICdoYW5naW5nJylcbiAgICB9XG5cbiAgICBub2RlUHJvYmFiaWxpdHlUb0VudGVyUG9zaXRpb24oc2VsZWN0aW9uKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICByZXR1cm4gTGF5b3V0LnNldEhhbmdpbmdQb3NpdGlvbihzZWxlY3Rpb24pXG4gICAgICAgICAgICAuYXR0cigneCcsIHRoaXMuY29uZmlnLm5vZGVTaXplIC8gMiArIDcpXG4gICAgICAgICAgICAuYXR0cigneScsIGZ1bmN0aW9uKGQpe1xuICAgICAgICAgICAgICAgIGxldCBmb250U2l6ZSA9IHBhcnNlSW50KEFwcFV0aWxzLmdldEZvbnRTaXplKHRoaXMpKTtcbiAgICAgICAgICAgICAgICBsZXQgYWdncmVnYXRlZFBheW9mZnMgPSBkLmRpc3BsYXlWYWx1ZSgnYWdncmVnYXRlZFBheW9mZicpO1xuICAgICAgICAgICAgICAgIGxldCBhZ2dyZWdhdGVkUGF5b2Zmc051bWJlciA9IFV0aWxzLmlzQXJyYXkoYWdncmVnYXRlZFBheW9mZnMpID8gYWdncmVnYXRlZFBheW9mZnMuZmlsdGVyKGl0PT5pdCAhPT0gdW5kZWZpbmVkKS5sZW5ndGggOiAxO1xuICAgICAgICAgICAgICAgIGlmKGFnZ3JlZ2F0ZWRQYXlvZmZzTnVtYmVyPjEpe1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmb250U2l6ZSowLjZcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5tYXgoMiwgMS44KiBzZWxmLmNvbmZpZy5ub2RlU2l6ZS9mb250U2l6ZSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLy8gLmF0dHIoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXG4gICAgICAgICAgICAvLyAuYXR0cignZG9taW5hbnQtYmFzZWxpbmUnLCAnY2VudHJhbCcpXG4gICAgfVxuXG4gICAgbm9kZUluZGljYXRvclBvc2l0aW9uKHNlbGVjdGlvbikge1xuICAgICAgICByZXR1cm4gc2VsZWN0aW9uXG4gICAgICAgICAgICAuYXR0cigneCcsIHRoaXMuY29uZmlnLm5vZGVTaXplIC8gMiArIDgpXG4gICAgICAgICAgICAuYXR0cigneScsIC0gdGhpcy5jb25maWcubm9kZVNpemUvMilcbiAgICAgICAgICAgIC5hdHRyKCdkb21pbmFudC1iYXNlbGluZScsICdjZW50cmFsJylcbiAgICAgICAgICAgIC5hdHRyKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKVxuICAgIH1cblxuICAgIG5vZGVVbmZvbGRCdXR0b25Qb3NpdGlvbihzZWxlY3Rpb24pIHtcblxuICAgICAgICByZXR1cm4gc2VsZWN0aW9uXG4gICAgICAgICAgICAuYXR0cigneCcsIHRoaXMuY29uZmlnLm5vZGVTaXplIC8gMiArIDUpXG4gICAgICAgICAgICAuYXR0cigneScsIDApXG4gICAgICAgICAgICAuYXR0cignZG9taW5hbnQtYmFzZWxpbmUnLCAnY2VudHJhbCcpXG4gICAgfVxuXG4gICAgZWRnZUxpbmVEKGVkZ2Upe1xuICAgICAgICB2YXIgbGluZSA9IGQzLmxpbmUoKVxuICAgICAgICAgICAgLngoZD0+IGRbMF0pXG4gICAgICAgICAgICAueShkPT4gZFsxXSk7XG4gICAgICAgIC8vIC5jdXJ2ZShkMy5jdXJ2ZUNhdG11bGxSb20uYWxwaGEoMC41KSk7XG5cblxuICAgICAgICB2YXIgcGFyZW50Tm9kZSA9IGVkZ2UucGFyZW50Tm9kZTtcbiAgICAgICAgdmFyIGNoaWxkTm9kZSA9IGVkZ2UuY2hpbGROb2RlO1xuXG4gICAgICAgIHZhciBkWCA9IGNoaWxkTm9kZS5sb2NhdGlvbi54IC0gcGFyZW50Tm9kZS5sb2NhdGlvbi54O1xuICAgICAgICB2YXIgZFkgPSBjaGlsZE5vZGUubG9jYXRpb24ueSAtIHBhcmVudE5vZGUubG9jYXRpb24ueTtcblxuICAgICAgICB2YXIgc2lnbiA9IGRYPj0wID8gMSA6IC0xO1xuXG4gICAgICAgIHZhciBzbGFudFN0YXJ0WE9mZnNldCA9IE1hdGgubWluKGRYLzIsIHRoaXMuY29uZmlnLm5vZGVTaXplLzIrMTApO1xuICAgICAgICB2YXIgc2xhbnRXaWR0aCA9IE1hdGgubWluKHRoaXMuY29uZmlnLmVkZ2VTbGFudFdpZHRoTWF4LCBNYXRoLm1heChkWC8yIC0gc2xhbnRTdGFydFhPZmZzZXQsIDApKTtcblxuICAgICAgICB2YXIgcG9pbnQxID0gW3BhcmVudE5vZGUubG9jYXRpb24ueCArdGhpcy5jb25maWcubm9kZVNpemUvMiArIDEsIHBhcmVudE5vZGUubG9jYXRpb24ueV07XG4gICAgICAgIHZhciBwb2ludDIgPSBbTWF0aC5tYXgocGFyZW50Tm9kZS5sb2NhdGlvbi54K3NsYW50U3RhcnRYT2Zmc2V0LCBwb2ludDFbMF0pLCBwYXJlbnROb2RlLmxvY2F0aW9uLnldO1xuICAgICAgICB2YXIgcG9pbnQzID0gW3BhcmVudE5vZGUubG9jYXRpb24ueCtzbGFudFN0YXJ0WE9mZnNldCtzbGFudFdpZHRoLCBjaGlsZE5vZGUubG9jYXRpb24ueV07XG4gICAgICAgIHZhciBwb2ludDQgPSBbY2hpbGROb2RlLmxvY2F0aW9uLnggLSAoc2lnbiooTWF0aC5tYXgoMCwgTWF0aC5taW4odGhpcy5jb25maWcubm9kZVNpemUvMis4LCBkWC8yKSkpKSwgY2hpbGROb2RlLmxvY2F0aW9uLnldO1xuICAgICAgICAvLyB2YXIgcG9pbnQyID0gW3BhcmVudE5vZGUubG9jYXRpb24ueCtkWC8yLXNsYW50V2lkdGgvMiwgcGFyZW50Tm9kZS5sb2NhdGlvbi55XTtcbiAgICAgICAgLy8gdmFyIHBvaW50MyA9IFtjaGlsZE5vZGUubG9jYXRpb24ueC0oZFgvMi1zbGFudFdpZHRoLzIpLCBjaGlsZE5vZGUubG9jYXRpb24ueV07XG5cbiAgICAgICAgZWRnZS4kbGluZVBvaW50cyA9IFtwb2ludDEsIHBvaW50MiwgcG9pbnQzLCBwb2ludDRdO1xuICAgICAgICByZXR1cm4gbGluZShlZGdlLiRsaW5lUG9pbnRzKTtcbiAgICB9XG5cbiAgICBlZGdlUGF5b2ZmUG9zaXRpb24oc2VsZWN0aW9uKSB7XG4gICAgICAgIExheW91dC5zZXRIYW5naW5nUG9zaXRpb24oc2VsZWN0aW9uKVxuICAgICAgICAgICAgLmF0dHIoJ3gnLCBkPT5kLiRsaW5lUG9pbnRzWzJdWzBdICsgMilcbiAgICAgICAgICAgIC5hdHRyKCd5JywgZD0+ZC4kbGluZVBvaW50c1syXVsxXSArIDcpO1xuXG4gICAgICAgIHNlbGVjdGlvbi5zZWxlY3RBbGwoJ3RzcGFuJykuYXR0cigneCcsIGZ1bmN0aW9uKGQpe1xuICAgICAgICAgICAgcmV0dXJuIGQzLnNlbGVjdCh0aGlzLnBhcmVudE5vZGUpLmRhdHVtKCkuJGxpbmVQb2ludHNbMl1bMF0gKyAyXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc2VsZWN0aW9uO1xuXG4gICAgfVxuXG4gICAgZWRnZUxhYmVsUG9zaXRpb24oc2VsZWN0aW9uKSB7XG4gICAgICAgIHJldHVybiBzZWxlY3Rpb25cbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBkPT4ndHJhbnNsYXRlKCcrKGQuJGxpbmVQb2ludHNbMl1bMF0gKyAyKSsnLCcrKGQuJGxpbmVQb2ludHNbMl1bMV0gLSA3KSsnKScpXG4gICAgICAgICAgICAvLyAuYXR0cigneCcsIGQ9PmQuJGxpbmVQb2ludHNbMl1bMF0gKyAyKVxuICAgICAgICAgICAgLy8gLmF0dHIoJ3knLCBkPT5kLiRsaW5lUG9pbnRzWzJdWzFdIC0gNylcblxuICAgIH1cblxuICAgIGVkZ2VQcm9iYWJpbGl0eVBvc2l0aW9uKHNlbGVjdGlvbikge1xuICAgICAgICByZXR1cm4gTGF5b3V0LnNldEhhbmdpbmdQb3NpdGlvbihzZWxlY3Rpb24pXG4gICAgICAgICAgICAuYXR0cigneCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxlbiA9IHRoaXMuZ2V0Q29tcHV0ZWRUZXh0TGVuZ3RoKCk7XG4gICAgICAgICAgICAgICAgdmFyIG1pbiA9IGQuJGxpbmVQb2ludHNbMl1bMF0gKyAyICsgdGhpcy5wcmV2aW91c1NpYmxpbmcuY2hpbGROb2Rlc1swXS5nZXRDb21wdXRlZFRleHRMZW5ndGgoKSArIDcgKyBsZW47XG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGgubWF4KG1pbiwgZC4kbGluZVBvaW50c1szXVswXSAtIDgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hdHRyKCd5JywgZD0+ZC4kbGluZVBvaW50c1syXVsxXSArIDcpXG4gICAgfVxuXG4gICAgZ2V0TWluTWFyZ2luQmV0d2Vlbk5vZGVzKCl7XG4gICAgICByZXR1cm4gdGhpcy5jb25maWcubm9kZVNpemUgKyAzMDtcbiAgICB9XG5cbiAgICBnZXRUZXh0TWluWChkKXtcbiAgICAgICAgbGV0IG1pblggPSAwO1xuICAgICAgICBpZihkKXtcbiAgICAgICAgICAgIGxldCBiYiA9IHRoaXMudHJlZURlc2lnbmVyLmdldFRleHREM1NlbGVjdGlvbihkKS5zZWxlY3QoJ3RleHQnKS5ub2RlKCkuZ2V0QkJveCgpO1xuICAgICAgICAgICAgaWYgKGJiLnggPCAwKSB7XG4gICAgICAgICAgICAgICAgbWluWCAtPSBiYi54O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtaW5YO1xuICAgIH1cblxuICAgIGdldFRleHRNaW5ZKGQpe1xuICAgICAgICBsZXQgbWluWSA9IDA7XG4gICAgICAgIGlmKGQpe1xuICAgICAgICAgICAgbGV0IGJiID0gdGhpcy50cmVlRGVzaWduZXIuZ2V0VGV4dEQzU2VsZWN0aW9uKGQpLnNlbGVjdCgndGV4dCcpLm5vZGUoKS5nZXRCQm94KCk7XG4gICAgICAgICAgICBpZiAoYmIueSA8IDApIHtcbiAgICAgICAgICAgICAgICBtaW5ZIC09IGJiLnk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1pblk7XG4gICAgfVxuXG4gICAgZ2V0VGV4dE1heFgoZCl7XG4gICAgICAgIHJldHVybiBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUjtcbiAgICB9XG5cblxuICAgIGdldE5vZGVNaW5YKGQpe1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIGlmKGQgJiYgZC4kcGFyZW50KXsvLyAmJiAhc2VsZi5pc05vZGVTZWxlY3RlZChkLiRwYXJlbnQpXG4gICAgICAgICAgICByZXR1cm4gZC4kcGFyZW50LmxvY2F0aW9uLnggKyBzZWxmLmdldE1pbk1hcmdpbkJldHdlZW5Ob2RlcygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzZWxmLmNvbmZpZy5ub2RlU2l6ZS8yO1xuICAgIH1cblxuICAgIGdldE5vZGVNaW5ZKGQpe1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcubm9kZVNpemUvMjtcbiAgICB9XG5cbiAgICBnZXROb2RlTWF4WChkKXtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIGlmKGQgJiYgZC5jaGlsZEVkZ2VzLmxlbmd0aCl7XG4gICAgICAgICAgICByZXR1cm4gZDMubWluKGQuY2hpbGRFZGdlcywgZT0+IWUuY2hpbGROb2RlLiRoaWRkZW4gPyBlLmNoaWxkTm9kZS5sb2NhdGlvbi54IDogOTk5OTk5OSktc2VsZi5nZXRNaW5NYXJnaW5CZXR3ZWVuTm9kZXMoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVI7XG4gICAgfVxuXG4gICAgc2V0R3JpZFdpZHRoKHdpZHRoLCB3aXRob3V0U3RhdGVTYXZpbmcpe1xuICAgICAgICB2YXIgc2VsZj10aGlzO1xuICAgICAgICBpZih0aGlzLmNvbmZpZy5ncmlkV2lkdGg9PT13aWR0aCl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYoIXdpdGhvdXRTdGF0ZVNhdmluZyl7XG4gICAgICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKHtcbiAgICAgICAgICAgICAgICBkYXRhOntcbiAgICAgICAgICAgICAgICAgICAgZ3JpZFdpZHRoOiBzZWxmLmNvbmZpZy5ncmlkV2lkdGhcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uVW5kbzogKGRhdGEpPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldEdyaWRXaWR0aChkYXRhLmdyaWRXaWR0aCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvblJlZG86IChkYXRhKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRHcmlkV2lkdGgod2lkdGgsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb25maWcuZ3JpZFdpZHRoPXdpZHRoO1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cblxuICAgIHNldEdyaWRIZWlnaHQoZ3JpZEhlaWdodCwgd2l0aG91dFN0YXRlU2F2aW5nKXtcbiAgICAgICAgdmFyIHNlbGY9dGhpcztcbiAgICAgICAgaWYodGhpcy5jb25maWcuZ3JpZEhlaWdodD09PWdyaWRIZWlnaHQpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmKCF3aXRob3V0U3RhdGVTYXZpbmcpe1xuICAgICAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSh7XG4gICAgICAgICAgICAgICAgZGF0YTp7XG4gICAgICAgICAgICAgICAgICAgIGdyaWRIZWlnaHQ6IHNlbGYuY29uZmlnLmdyaWRIZWlnaHRcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uVW5kbzogKGRhdGEpPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldEdyaWRIZWlnaHQoZGF0YS5ncmlkSGVpZ2h0LCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uUmVkbzogKGRhdGEpPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldEdyaWRIZWlnaHQoZ3JpZEhlaWdodCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbmZpZy5ncmlkSGVpZ2h0PWdyaWRIZWlnaHQ7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuXG4gICAgc2V0Tm9kZVNpemUobm9kZVNpemUsIHdpdGhvdXRTdGF0ZVNhdmluZyl7XG4gICAgICAgIHZhciBzZWxmPXRoaXM7XG4gICAgICAgIGlmKHRoaXMuY29uZmlnLm5vZGVTaXplPT09bm9kZVNpemUpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmKCF3aXRob3V0U3RhdGVTYXZpbmcpe1xuICAgICAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSh7XG4gICAgICAgICAgICAgICAgZGF0YTp7XG4gICAgICAgICAgICAgICAgICAgIG5vZGVTaXplOiBzZWxmLmNvbmZpZy5ub2RlU2l6ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25VbmRvOiAoZGF0YSk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0Tm9kZVNpemUoZGF0YS5ub2RlU2l6ZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvblJlZG86IChkYXRhKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXROb2RlU2l6ZShub2RlU2l6ZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbmZpZy5ub2RlU2l6ZT1ub2RlU2l6ZTtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgaWYodGhpcy5pc01hbnVhbExheW91dCgpKXtcbiAgICAgICAgICAgIHRoaXMuZml0Tm9kZXNJblBsb3R0aW5nUmVnaW9uKHNlbGYuZGF0YS5nZXRSb290cygpKTtcbiAgICAgICAgICAgIHRoaXMudHJlZURlc2lnbmVyLnJlZHJhdyh0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldEVkZ2VTbGFudFdpZHRoTWF4KHdpZHRoLCB3aXRob3V0U3RhdGVTYXZpbmcpe1xuICAgICAgICB2YXIgc2VsZj10aGlzO1xuICAgICAgICBpZih0aGlzLmNvbmZpZy5lZGdlU2xhbnRXaWR0aE1heD09PXdpZHRoKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZighd2l0aG91dFN0YXRlU2F2aW5nKXtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoe1xuICAgICAgICAgICAgICAgIGRhdGE6e1xuICAgICAgICAgICAgICAgICAgICBlZGdlU2xhbnRXaWR0aE1heDogc2VsZi5jb25maWcuZWRnZVNsYW50V2lkdGhNYXhcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uVW5kbzogKGRhdGEpPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldEVkZ2VTbGFudFdpZHRoTWF4KGRhdGEuZWRnZVNsYW50V2lkdGhNYXgsIHRydWUpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25SZWRvOiAoZGF0YSk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0RWRnZVNsYW50V2lkdGhNYXgod2lkdGgsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb25maWcuZWRnZVNsYW50V2lkdGhNYXg9d2lkdGg7XG4gICAgICAgIHRoaXMudHJlZURlc2lnbmVyLnJlZHJhdyh0cnVlKTtcbiAgICB9XG5cbiAgICBhdXRvTGF5b3V0KHR5cGUsIHdpdGhvdXRTdGF0ZVNhdmluZyl7XG4gICAgICAgIHZhciBzZWxmPXRoaXM7XG5cblxuXG4gICAgICAgIGlmKCF3aXRob3V0U3RhdGVTYXZpbmcpe1xuICAgICAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSh7XG4gICAgICAgICAgICAgICAgZGF0YTp7XG4gICAgICAgICAgICAgICAgICAgIG5ld0xheW91dDogdHlwZSxcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudExheW91dDogc2VsZi5jb25maWcudHlwZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25VbmRvOiAoZGF0YSk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY29uZmlnLnR5cGUgPSBkYXRhLmN1cnJlbnRMYXlvdXQ7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuX2ZpcmVPbkF1dG9MYXlvdXRDaGFuZ2VkQ2FsbGJhY2tzKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvblJlZG86IChkYXRhKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5hdXRvTGF5b3V0KGRhdGEubmV3TGF5b3V0LCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbmZpZy50eXBlID0gdHlwZTtcbiAgICAgICAgaWYoIXRoaXMuZGF0YS5ub2Rlcy5sZW5ndGgpe1xuICAgICAgICAgICAgdGhpcy5fZmlyZU9uQXV0b0xheW91dENoYW5nZWRDYWxsYmFja3MoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBwcmV2VHJlZU1heFkgPSBzZWxmLmdldE5vZGVNaW5ZKCk7XG4gICAgICAgIHRoaXMuZGF0YS5nZXRSb290cygpLmZvckVhY2gocj0+e1xuICAgICAgICAgICAgdmFyIHJvb3QgPSBkMy5oaWVyYXJjaHkociwgZD0+e1xuICAgICAgICAgICAgICAgIHJldHVybiBkLmNoaWxkRWRnZXMuZmlsdGVyKGU9PiFlLiRoaWRkZW4pLm1hcChlPT5lLmNoaWxkTm9kZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gcm9vdC5zb3J0KChhLGIpPT5zZWxmLm5vZGVUeXBlT3JkZXJbYS5kYXRhLnR5cGVdLXNlbGYubm9kZVR5cGVPcmRlcltiLmRhdGEudHlwZV0pO1xuICAgICAgICAgICAgcm9vdC5zb3J0KChhLGIpPT5hLmRhdGEubG9jYXRpb24ueSAtIGIuZGF0YS5sb2NhdGlvbi55KTtcblxuXG4gICAgICAgICAgICB2YXIgbGF5b3V0O1xuICAgICAgICAgICAgaWYodHlwZT09PSdjbHVzdGVyJyl7XG4gICAgICAgICAgICAgICAgbGF5b3V0ID0gZDMuY2x1c3RlcigpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgbGF5b3V0ID0gZDMudHJlZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGF5b3V0Lm5vZGVTaXplKFtzZWxmLmNvbmZpZy5ncmlkSGVpZ2h0LCBzZWxmLmNvbmZpZy5ncmlkV2lkdGhdKTtcbiAgICAgICAgICAgIGxheW91dC5zZXBhcmF0aW9uKHNlbGYubm9kZVNlcGFyYXRpb24pO1xuXG4gICAgICAgICAgICBsYXlvdXQocm9vdCk7XG4gICAgICAgICAgICB2YXIgbWluWSA9IDk5OTk5OTk5OTtcbiAgICAgICAgICAgIHJvb3QuZWFjaChkPT57XG4gICAgICAgICAgICAgICAgbWluWSA9IE1hdGgubWluKG1pblksIGQueCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdmFyIGR5ID0gcm9vdC54IC0gbWluWSArIHByZXZUcmVlTWF4WTtcbiAgICAgICAgICAgIHZhciBkeCA9IHNlbGYuZ2V0Tm9kZU1pblgoKTtcbiAgICAgICAgICAgIHZhciBtYXhZPTA7XG4gICAgICAgICAgICByb290LmVhY2goZD0+e1xuICAgICAgICAgICAgICAgIGQuZGF0YS5sb2NhdGlvbi54ID0gZC55ICsgZHg7XG4gICAgICAgICAgICAgICAgZC5kYXRhLmxvY2F0aW9uLnkgPSBkLnggKyBkeTtcblxuICAgICAgICAgICAgICAgIG1heFkgPSBNYXRoLm1heChtYXhZLCBkLmRhdGEubG9jYXRpb24ueSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcHJldlRyZWVNYXhZID0gbWF4WSArIHNlbGYuY29uZmlnLm5vZGVTaXplK3NlbGYudHJlZU1hcmdpbjtcbiAgICAgICAgfSk7XG5cblxuICAgICAgICAvLyB0aGlzLnRyYW5zaXRpb24gPSB0cnVlO1xuICAgICAgICB0aGlzLnRyZWVEZXNpZ25lci5yZWRyYXcodHJ1ZSk7XG4gICAgICAgIC8vIHRoaXMudHJhbnNpdGlvbiA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuX2ZpcmVPbkF1dG9MYXlvdXRDaGFuZ2VkQ2FsbGJhY2tzKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGZpdE5vZGVzSW5QbG90dGluZ1JlZ2lvbihub2Rlcyl7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIHRvcFkgPSBkMy5taW4obm9kZXMsIG49Pm4ubG9jYXRpb24ueSk7XG4gICAgICAgIHZhciBtaW5ZID0gc2VsZi5nZXROb2RlTWluWSgpO1xuICAgICAgICB2YXIgZHkgPSB0b3BZIC0gbWluWTtcblxuICAgICAgICB2YXIgbWluWCA9IGQzLm1pbihub2Rlcywgbj0+bi5sb2NhdGlvbi54KTtcbiAgICAgICAgdmFyIGR4ID0gbWluWCAtIHNlbGYuZ2V0Tm9kZU1pblgoKTtcblxuICAgICAgICBpZihkeTwwIHx8ICBkeDwwKXtcbiAgICAgICAgICAgIG5vZGVzLmZvckVhY2gobj0+bi5tb3ZlKC1keCwgLWR5KSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtb3ZlTm9kZXMobm9kZXMsIGR4LCBkeSwgcGl2b3Qpe1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBsaW1pdCA9IHNlbGYuY29uZmlnLmxpbWl0Tm9kZVBvc2l0aW9uaW5nO1xuICAgICAgICBpZihsaW1pdCl7XG4gICAgICAgICAgICBpZihkeDwwKXtcbiAgICAgICAgICAgICAgICBub2Rlcy5zb3J0KChhLGIpPT5hLmxvY2F0aW9uLngtYi5sb2NhdGlvbi54KTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIG5vZGVzLnNvcnQoKGEsYik9PmIubG9jYXRpb24ueC1hLmxvY2F0aW9uLngpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgICAgICB2YXIgbWluWSA9IGQzLm1pbihub2RlcywgZD0+ZC5sb2NhdGlvbi55KTtcbiAgICAgICAgaWYobWluWSArIGR5IDwgc2VsZi5nZXROb2RlTWluWSgpKXtcbiAgICAgICAgICAgIGR5ID0gc2VsZi5nZXROb2RlTWluWSgpIC0gbWluWTtcbiAgICAgICAgfVxuXG4gICAgICAgIG5vZGVzLmZvckVhY2goZD0+e1xuICAgICAgICAgICAgaWYobGltaXQpe1xuICAgICAgICAgICAgICAgIExheW91dC5iYWNrdXBOb2RlTG9jYXRpb24oZCk7XG4gICAgICAgICAgICAgICAgdmFyIG1pblggPSBzZWxmLmdldE5vZGVNaW5YKGQpO1xuICAgICAgICAgICAgICAgIHZhciBtYXhYID0gc2VsZi5nZXROb2RlTWF4WChkKTtcblxuICAgICAgICAgICAgICAgIGQubG9jYXRpb24ueCA9IE1hdGgubWluKE1hdGgubWF4KGQubG9jYXRpb24ueCtkeCwgbWluWCksIG1heFgpO1xuICAgICAgICAgICAgICAgIGQubG9jYXRpb24ueSArPSBkeTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGQubG9jYXRpb24ueCArPWR4O1xuICAgICAgICAgICAgICAgIGQubG9jYXRpb24ueSArPSBkeTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcblxuXG4gICAgICAgIHZhciByZXZlcnRYID0gcGl2b3QgJiYgc2VsZi5jb25maWcubGltaXROb2RlUG9zaXRpb25pbmcgJiYgKHBpdm90LmxvY2F0aW9uLnggPT09IHBpdm90LiRsb2NhdGlvbi54KTtcblxuICAgICAgICBub2Rlcy5mb3JFYWNoKGQ9PntcbiAgICAgICAgICAgIGlmKHJldmVydFgpe1xuICAgICAgICAgICAgICAgIGQubG9jYXRpb24ueCA9IGQuJGxvY2F0aW9uLng7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLnRyZWVEZXNpZ25lci51cGRhdGVOb2RlUG9zaXRpb24oZCk7XG4gICAgICAgIH0pO1xuXG5cbiAgICB9XG5cbiAgICBtb3ZlVGV4dHModGV4dHMsIGR4LCBkeSl7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgbGV0IGxpbWl0ID0gc2VsZi5jb25maWcubGltaXRUZXh0UG9zaXRpb25pbmc7XG4gICAgICAgIGlmKGxpbWl0KXtcbiAgICAgICAgICAgIGlmKGR4PDApe1xuICAgICAgICAgICAgICAgIHRleHRzLnNvcnQoKGEsYik9PmEubG9jYXRpb24ueC1iLmxvY2F0aW9uLngpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGV4dHMuc29ydCgoYSxiKT0+Yi5sb2NhdGlvbi54LWEubG9jYXRpb24ueCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG5cbiAgICAgICAgdGV4dHMuZm9yRWFjaChkPT57XG5cblxuXG5cbiAgICAgICAgICAgIGlmKGxpbWl0KXtcbiAgICAgICAgICAgICAgICBsZXQgbWluWCA9IHNlbGYuZ2V0VGV4dE1pblgoZCk7XG4gICAgICAgICAgICAgICAgbGV0IG1heFggPSBzZWxmLmdldFRleHRNYXhYKGQpO1xuICAgICAgICAgICAgICAgIGxldCBtaW5ZID0gc2VsZi5nZXRUZXh0TWluWShkKTtcblxuXG4gICAgICAgICAgICAgICAgZC5sb2NhdGlvbi54ID0gTWF0aC5taW4oTWF0aC5tYXgoZC5sb2NhdGlvbi54K2R4LCBtaW5YKSwgbWF4WCk7XG4gICAgICAgICAgICAgICAgZC5sb2NhdGlvbi55ID0gTWF0aC5tYXgoZC5sb2NhdGlvbi55K2R5LCBtaW5ZKTtcblxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgZC5sb2NhdGlvbi5tb3ZlKGR4LCBkeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLnRyZWVEZXNpZ25lci51cGRhdGVUZXh0UG9zaXRpb24oZCk7XG5cbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBzdGF0aWMgYmFja3VwTm9kZUxvY2F0aW9uKG5vZGUpIHtcbiAgICAgICAgbm9kZS4kbG9jYXRpb24gPSBuZXcgbW9kZWwuUG9pbnQobm9kZS5sb2NhdGlvbik7XG4gICAgfVxuXG4gICAgX2ZpcmVPbkF1dG9MYXlvdXRDaGFuZ2VkQ2FsbGJhY2tzKCl7XG4gICAgICAgIHRoaXMub25BdXRvTGF5b3V0Q2hhbmdlZC5mb3JFYWNoKGM9PmModGhpcy5jb25maWcudHlwZSkpO1xuICAgIH1cblxuICAgIHN0YXRpYyBzZXRIYW5naW5nUG9zaXRpb24oc2VsZWN0aW9uKXtcbiAgICAgICAgLy8gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgLy8gICAgIHNlbGVjdGlvbi5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgIC8vICAgICAgICAgdmFyIGggPSAgdGhpcy5nZXRCQm94KCkuaGVpZ2h0O1xuICAgICAgICAvLyAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5hdHRyKCdkeScsIGgpO1xuICAgICAgICAvLyAgICAgfSk7XG4gICAgICAgIC8vIH0sMCk7XG5cbiAgICAgICAgaWYoQXBwVXRpbHMuaXNIaWRkZW4oc2VsZWN0aW9uLm5vZGUoKSkpeyAvLyBzZXR0aW5nIGhhbmdpbmcgcG9zaXRpb24gb2YgaGlkZGVuIGVsZW1lbnRzIGZhaWxzIG9uIGZpcmVmb3hcbiAgICAgICAgICAgIHJldHVybiBzZWxlY3Rpb247XG4gICAgICAgIH1cblxuXG4gICAgICAgIHNlbGVjdGlvbi5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgaCA9ICB0aGlzLmdldEJCb3goKS5oZWlnaHQ7XG4gICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuYXR0cignZHknLCAnMC43NWVtJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzZWxlY3Rpb247XG4gICAgfVxuXG59XG5cblxuIiwiaW1wb3J0IHtBcHBVdGlsc30gZnJvbSAnLi9hcHAtdXRpbHMnXG5pbXBvcnQgKiBhcyBkMyBmcm9tICcuL2QzJ1xuaW1wb3J0IHtDb250ZXh0TWVudX0gZnJvbSAnLi9jb250ZXh0LW1lbnUvY29udGV4dC1tZW51J1xuXG5leHBvcnQgY2xhc3MgTm9kZURyYWdIYW5kbGVye1xuXG4gICAgdHJlZURlc2lnbmVyO1xuICAgIGRhdGE7XG4gICAgY29uZmlnO1xuXG4gICAgZHJhZztcblxuXG4gICAgY29uc3RydWN0b3IodHJlZURlc2lnbmVyLCBkYXRhKXtcbiAgICAgICAgdGhpcy50cmVlRGVzaWduZXIgPSB0cmVlRGVzaWduZXI7XG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG5cbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLmRyYWcgPSBkMy5kcmFnKClcbiAgICAgICAgICAgIC5zdWJqZWN0KGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgICAgICBpZihkPT1udWxsKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4OiBldmVudC54LFxuICAgICAgICAgICAgICAgICAgICAgICAgeTogZXZlbnQueVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgdCA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB4OiB0LmF0dHIoXCJ4XCIpICsgQXBwVXRpbHMuZ2V0VHJhbnNsYXRpb24odC5hdHRyKFwidHJhbnNmb3JtXCIpKVswXSxcbiAgICAgICAgICAgICAgICAgICAgeTogdC5hdHRyKFwieVwiKSArIEFwcFV0aWxzLmdldFRyYW5zbGF0aW9uKHQuYXR0cihcInRyYW5zZm9ybVwiKSlbMV1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbihcInN0YXJ0XCIsIGZ1bmN0aW9uKGQpe1xuICAgICAgICAgICAgICAgIHNlbGYuZHJhZ1N0YXJ0ZWQuY2FsbCh0aGlzLGQsIHNlbGYpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKFwiZHJhZ1wiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHNlbGYub25EcmFnLmNhbGwodGhpcywgZCwgc2VsZik7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKFwiZW5kXCIsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5kcmFnRW5kZWQuY2FsbCh0aGlzLCBkLCBzZWxmKTtcbiAgICAgICAgICAgIH0pXG4gICAgfVxuXG5cbiAgICBkcmFnU3RhcnRlZChkLHNlbGYpIHtcbiAgICAgICAgaWYoc2VsZi5pZ25vcmVEcmFnKXtcbiAgICAgICAgICAgIHNlbGYuaWdub3JlRHJhZz1mYWxzZTtcbiAgICAgICAgICAgIHNlbGYuaWdub3JlZERyYWc9dHJ1ZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzZWxmLmlnbm9yZWREcmFnPWZhbHNlO1xuXG4gICAgICAgIC8vIHNlbGYudHJlZURlc2lnbmVyLmxheW91dC5kaXNhYmxlQXV0b0xheW91dCgpO1xuICAgICAgICBDb250ZXh0TWVudS5oaWRlKCk7XG4gICAgICAgIHZhciBub2RlID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICBpZighbm9kZS5jbGFzc2VkKFwic2VsZWN0ZWRcIikpe1xuICAgICAgICAgICAgc2VsZi50cmVlRGVzaWduZXIuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNlbGYudHJlZURlc2lnbmVyLnNlbGVjdE5vZGUoZCk7XG4gICAgICAgIG5vZGUuY2xhc3NlZChcInNlbGVjdGVkIGRyYWdnaW5nXCIsIHRydWUpO1xuICAgICAgICBzZWxmLnNlbGVjdGVkTm9kZXMgPSBzZWxmLnRyZWVEZXNpZ25lci5nZXRTZWxlY3RlZE5vZGVzKHRydWUpO1xuICAgICAgICBzZWxmLnByZXZEcmFnRXZlbnQgPSBkMy5ldmVudDtcbiAgICAgICAgc2VsZi5kcmFnRXZlbnRDb3VudCA9IDA7XG4gICAgfVxuXG4gICAgb25EcmFnKGRyYWdnZWROb2RlLCBzZWxmKXtcbiAgICAgICAgaWYoc2VsZi5pZ25vcmVkRHJhZyl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZihzZWxmLmRyYWdFdmVudENvdW50PT0yKXtcbiAgICAgICAgICAgIHNlbGYuZGF0YS5zYXZlU3RhdGUoKTtcbiAgICAgICAgfVxuICAgICAgICBzZWxmLmRyYWdFdmVudENvdW50Kys7XG4gICAgICAgIGlmKHNlbGYuc2VsZWN0ZWROb2Rlcy5sZW5ndGg+NSAmJiBzZWxmLmRyYWdFdmVudENvdW50JTIhPTEpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGR4ID0gZDMuZXZlbnQueCAtIHNlbGYucHJldkRyYWdFdmVudC54O1xuICAgICAgICB2YXIgZHkgPSBkMy5ldmVudC55LSBzZWxmLnByZXZEcmFnRXZlbnQueTtcbiAgICAgICAgc2VsZi50cmVlRGVzaWduZXIubGF5b3V0Lm1vdmVOb2RlcyhzZWxmLnNlbGVjdGVkTm9kZXMsIGR4LCBkeSwgZHJhZ2dlZE5vZGUpO1xuXG5cbiAgICAgICAgc2VsZi5wcmV2RHJhZ0V2ZW50ID0gZDMuZXZlbnQ7XG4gICAgICAgIHNlbGYudHJlZURlc2lnbmVyLnJlZHJhd0VkZ2VzKCk7XG4gICAgICAgIHNlbGYudHJlZURlc2lnbmVyLnVwZGF0ZVBsb3R0aW5nUmVnaW9uU2l6ZSgpO1xuICAgIH1cblxuICAgIGRyYWdFbmRlZChkcmFnZ2VkTm9kZSwgc2VsZil7XG4gICAgICAgIHZhciBub2RlID0gZDMuc2VsZWN0KHRoaXMpLmNsYXNzZWQoXCJkcmFnZ2luZ1wiLCBmYWxzZSk7XG4gICAgICAgIGlmKHNlbGYuaWdub3JlZERyYWcpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHNlbGYudHJlZURlc2lnbmVyLmxheW91dC51cGRhdGUoZHJhZ2dlZE5vZGUpXG4gICAgfVxuXG4gICAgY2FuY2VsRHJhZygpe1xuICAgICAgICB0aGlzLmlnbm9yZURyYWcgPSB0cnVlO1xuICAgIH1cblxufVxuXG5cbiIsInZhciBlcHNpbG9uID0gMWUtMTI7XG52YXIgcGkgPSBNYXRoLlBJO1xudmFyIGhhbGZQaSA9IHBpIC8gMjtcbnZhciB0YXUgPSAyICogcGk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICAvKmRyYXc6IGZ1bmN0aW9uKGNvbnRleHQsIHNpemUpIHtcbiAgICAgICAgdmFyIHIgPSBNYXRoLnNxcnQoc2l6ZSAvIHBpKTtcbiAgICAgICAgY29udGV4dC5tb3ZlVG8ociwgMCk7XG4gICAgICAgIGNvbnRleHQuYXJjKDAsIDAsIHIsIDAsIHRhdSk7XG4gICAgfSovXG4gICAgZHJhdzogZnVuY3Rpb24oY29udGV4dCwgc2l6ZSkge1xuXG4gICAgICAgIHZhciByID0gTWF0aC5zcXJ0KHNpemUgLyBwaSk7XG4gICAgICAgIHZhciBkaXN0ID0wLjU1MjI4NDc0OTgzMSAqIHI7XG5cbiAgICAgICAgY29udGV4dC5tb3ZlVG8oLXIsIDApXG4gICAgICAgIC8vIGNvbnRleHQubGluZVRvKDIqciwgMipyKVxuICAgICAgICAvLyBjb250ZXh0LmJlemllckN1cnZlVG8oLXIsIC1kaXN0LCAtZGlzdCwgLXIsIDAsLXIpO1xuICAgICAgICBjb250ZXh0LmJlemllckN1cnZlVG8oLXIsIC1kaXN0LCAtZGlzdCwgLXIsIDAsLXIpO1xuXG4gICAgICAgIGNvbnRleHQuYmV6aWVyQ3VydmVUbyhkaXN0LCAtciwgciwgLWRpc3QsIHIsMCk7XG5cbiAgICAgICAgY29udGV4dC5iZXppZXJDdXJ2ZVRvKHIsIGRpc3QsIGRpc3QsIHIsIDAsIHIpO1xuXG4gICAgICAgIGNvbnRleHQuYmV6aWVyQ3VydmVUbygtZGlzdCwgciwgLXIsIGRpc3QsIC1yLCAwKTtcbiAgICB9XG59O1xuIiwidmFyIHNxcnQzID0gTWF0aC5zcXJ0KDMpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgZHJhdzogZnVuY3Rpb24oY29udGV4dCwgc2l6ZSkge1xuICAgICAgICB2YXIgciA9IE1hdGguc3FydChzaXplIC8gTWF0aC5QSSk7XG4gICAgICAgIGNvbnRleHQubW92ZVRvKC1yLCAwKTtcbiAgICAgICAgY29udGV4dC5saW5lVG8oMC45KnIsIC1yKTtcbiAgICAgICAgY29udGV4dC5saW5lVG8oMC45KnIsIHIpO1xuICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgIH1cbn07XG4iLCJpbXBvcnQge1V0aWxzfSBmcm9tIFwic2QtdXRpbHNcIjtcbmltcG9ydCB7aTE4bn0gZnJvbSAnLi9pMThuL2kxOG4nXG5cbmV4cG9ydCBjbGFzcyBUZW1wbGF0ZXN7XG5cbiAgICBzdGF0aWMgZ3Jvd2wgPSByZXF1aXJlKCcuL3RlbXBsYXRlcy9ncm93bF9tZXNzYWdlLmh0bWwnKTtcblxuICAgIHN0YXRpYyBnZXQodGVtcGxhdGVOYW1lLCB2YXJpYWJsZXMpe1xuICAgICAgICB2YXIgY29tcGlsZWQgPSBVdGlscy50ZW1wbGF0ZShUZW1wbGF0ZXNbdGVtcGxhdGVOYW1lXSx7ICdpbXBvcnRzJzogeyAnaTE4bic6IGkxOG4sICdUZW1wbGF0ZXMnOiBUZW1wbGF0ZXMsICdpbmNsdWRlJzogZnVuY3Rpb24obiwgdikge3JldHVybiBUZW1wbGF0ZXMuZ2V0KG4sIHYpfSB9IH0pO1xuICAgICAgICBpZih2YXJpYWJsZXMpe1xuICAgICAgICAgICAgdmFyaWFibGVzLnZhcmlhYmxlcyA9IHZhcmlhYmxlcztcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB2YXJpYWJsZXMgPSB7dmFyaWFibGVzOnt9fVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb21waWxlZCh2YXJpYWJsZXMpXG5cbiAgICB9XG5cbiAgICBzdGF0aWMgc3R5bGVSdWxlKHNlbGVjdG9yLCBwcm9wcyl7XG4gICAgICAgIHZhciBzID0gc2VsZWN0b3IrICd7JztcbiAgICAgICAgcHJvcHMuZm9yRWFjaChwPT4gcys9VGVtcGxhdGVzLnN0eWxlUHJvcChwWzBdLCBwWzFdKSk7XG4gICAgICAgIHMrPSd9ICc7XG4gICAgICAgIHJldHVybiBzO1xuICAgIH1cbiAgICBzdGF0aWMgc3R5bGVQcm9wKHN0eWxlTmFtZSwgdmFyaWFibGVOYW1lKXtcbiAgICAgICAgcmV0dXJuICBzdHlsZU5hbWUrJzogPCU9ICcrdmFyaWFibGVOYW1lKycgJT47ICdcbiAgICB9XG5cbiAgICBzdGF0aWMgdHJlZURlc2lnbmVyU2VsZWN0b3IgPSAnc3ZnLnNkLXRyZWUtZGVzaWduZXInO1xuICAgIHN0YXRpYyBub2RlU2VsZWN0b3IodHlwZSwgY2xhenope1xuICAgICAgICB2YXIgcyA9IFRlbXBsYXRlcy50cmVlRGVzaWduZXJTZWxlY3RvcisnIC5ub2RlJztcbiAgICAgICAgaWYodHlwZSl7XG4gICAgICAgICAgICBzKz0nLicrdHlwZSsnLW5vZGUnO1xuICAgICAgICB9XG4gICAgICAgIGlmKGNsYXp6KXtcbiAgICAgICAgICAgIHMrPScuJytjbGF6ejtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcztcbiAgICB9XG4gICAgc3RhdGljIGVkZ2VTZWxlY3RvcihjbGF6eil7XG4gICAgICAgIHZhciBzID0gVGVtcGxhdGVzLnRyZWVEZXNpZ25lclNlbGVjdG9yKycgLmVkZ2UnO1xuICAgICAgICBpZihjbGF6eil7XG4gICAgICAgICAgICBzKz0nLicrY2xheno7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHM7XG4gICAgfVxuXG4gICAgc3RhdGljIHRyZWVEZXNpZ25lclN0eWxlcyA9XG5cbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMudHJlZURlc2lnbmVyU2VsZWN0b3IsW1xuICAgICAgICAgICAgWydmb250LXNpemUnLCAnZm9udFNpemUnXSxcbiAgICAgICAgICAgIFsnZm9udC1mYW1pbHknLCAnZm9udEZhbWlseSddLFxuICAgICAgICAgICAgWydmb250LXdlaWdodCcsICdmb250V2VpZ2h0J10sXG4gICAgICAgICAgICBbJ2ZvbnQtc3R5bGUnLCAnZm9udFN0eWxlJ11cbiAgICAgICAgXSkrXG4gICAgICAgIC8vICAgbm9kZVxuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5ub2RlU2VsZWN0b3IoKSsnIHBhdGgnLFtcbiAgICAgICAgICAgIFsnZmlsbCcsICdub2RlLmZpbGwnXSxcbiAgICAgICAgICAgIFsnc3Ryb2tlLXdpZHRoJywgJ25vZGUuc3Ryb2tlV2lkdGgnXVxuICAgICAgICBdKStcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCdkZWNpc2lvbicsICdvcHRpbWFsJykrJyBwYXRoLCAnK1RlbXBsYXRlcy5ub2RlU2VsZWN0b3IoJ2NoYW5jZScsICdvcHRpbWFsJykrJyBwYXRoLCcgK1RlbXBsYXRlcy5ub2RlU2VsZWN0b3IoJ3Rlcm1pbmFsJywgJ29wdGltYWwnKSsnIHBhdGgnLFtcbiAgICAgICAgICAgIFsnc3Ryb2tlJywgJ25vZGUub3B0aW1hbC5zdHJva2UnXSxcbiAgICAgICAgICAgIFsnc3Ryb2tlLXdpZHRoJywgJ25vZGUub3B0aW1hbC5zdHJva2VXaWR0aCddXG4gICAgICAgIF0pK1xuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5ub2RlU2VsZWN0b3IoKSsnIC5sYWJlbCcsW1xuICAgICAgICAgICAgWydmb250LXNpemUnLCAnbm9kZS5sYWJlbC5mb250U2l6ZSddLFxuICAgICAgICAgICAgWydmaWxsJywgJ25vZGUubGFiZWwuY29sb3InXVxuICAgICAgICBdKStcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCkrJyAucGF5b2ZmJyxbXG4gICAgICAgICAgICBbJ2ZvbnQtc2l6ZScsICdub2RlLnBheW9mZi5mb250U2l6ZSddLFxuICAgICAgICAgICAgWydmaWxsJywgJ25vZGUucGF5b2ZmLmNvbG9yJ10sXG4gICAgICAgIF0pK1xuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5ub2RlU2VsZWN0b3IoKSsnIC5wYXlvZmYubmVnYXRpdmUnLFtcbiAgICAgICAgICAgIFsnZmlsbCcsICdub2RlLnBheW9mZi5uZWdhdGl2ZUNvbG9yJ10sXG4gICAgICAgIF0pK1xuXG4gICAgICAgIC8vICAgIGRlY2lzaW9uIG5vZGVcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCdkZWNpc2lvbicpKycgcGF0aCcsW1xuICAgICAgICAgICAgWydmaWxsJywgJ25vZGUuZGVjaXNpb24uZmlsbCddLFxuICAgICAgICAgICAgWydzdHJva2UnLCAnbm9kZS5kZWNpc2lvbi5zdHJva2UnXVxuICAgICAgICBdKStcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCdkZWNpc2lvbicsICdzZWxlY3RlZCcpKycgcGF0aCcsW1xuICAgICAgICAgICAgWydmaWxsJywgJ25vZGUuZGVjaXNpb24uc2VsZWN0ZWQuZmlsbCddXG4gICAgICAgIF0pK1xuXG4gICAgICAgIC8vICAgIGNoYW5jZSBub2RlXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLm5vZGVTZWxlY3RvcignY2hhbmNlJykrJyBwYXRoJyxbXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnbm9kZS5jaGFuY2UuZmlsbCddLFxuICAgICAgICAgICAgWydzdHJva2UnLCAnbm9kZS5jaGFuY2Uuc3Ryb2tlJ11cbiAgICAgICAgXSkrXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLm5vZGVTZWxlY3RvcignY2hhbmNlJywgJ3NlbGVjdGVkJykrJyBwYXRoJyxbXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnbm9kZS5jaGFuY2Uuc2VsZWN0ZWQuZmlsbCddXG4gICAgICAgIF0pK1xuXG4gICAgICAgIC8vICAgIHRlcm1pbmFsIG5vZGVcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCd0ZXJtaW5hbCcpKycgcGF0aCcsW1xuICAgICAgICAgICAgWydmaWxsJywgJ25vZGUudGVybWluYWwuZmlsbCddLFxuICAgICAgICAgICAgWydzdHJva2UnLCAnbm9kZS50ZXJtaW5hbC5zdHJva2UnXVxuICAgICAgICBdKStcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCd0ZXJtaW5hbCcsICdzZWxlY3RlZCcpKycgcGF0aCcsW1xuICAgICAgICAgICAgWydmaWxsJywgJ25vZGUudGVybWluYWwuc2VsZWN0ZWQuZmlsbCddXG4gICAgICAgIF0pK1xuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5ub2RlU2VsZWN0b3IoJ3Rlcm1pbmFsJykrJyAuYWdncmVnYXRlZC1wYXlvZmYnLFtcbiAgICAgICAgICAgIFsnZm9udC1zaXplJywgJ25vZGUudGVybWluYWwucGF5b2ZmLmZvbnRTaXplJ10sXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnbm9kZS50ZXJtaW5hbC5wYXlvZmYuY29sb3InXSxcbiAgICAgICAgXSkrXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLm5vZGVTZWxlY3RvcigndGVybWluYWwnKSsnIC5hZ2dyZWdhdGVkLXBheW9mZi5uZWdhdGl2ZScsW1xuICAgICAgICAgICAgWydmaWxsJywgJ25vZGUudGVybWluYWwucGF5b2ZmLm5lZ2F0aXZlQ29sb3InXSxcbiAgICAgICAgXSkrXG5cblxuICAgICAgICAvL3Byb2JhYmlsaXR5XG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLnRyZWVEZXNpZ25lclNlbGVjdG9yKycgLm5vZGUgLnByb2JhYmlsaXR5LXRvLWVudGVyLCAnK1RlbXBsYXRlcy50cmVlRGVzaWduZXJTZWxlY3RvcisnIC5lZGdlIC5wcm9iYWJpbGl0eScsW1xuICAgICAgICAgICAgWydmb250LXNpemUnLCAncHJvYmFiaWxpdHkuZm9udFNpemUnXSxcbiAgICAgICAgICAgIFsnZmlsbCcsICdwcm9iYWJpbGl0eS5jb2xvciddXG4gICAgICAgIF0pK1xuXG4gICAgICAgIC8vZWRnZVxuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5lZGdlU2VsZWN0b3IoKSsnIHBhdGgnLFtcbiAgICAgICAgICAgIFsnc3Ryb2tlJywgJ2VkZ2Uuc3Ryb2tlJ10sXG4gICAgICAgICAgICBbJ3N0cm9rZS13aWR0aCcsICdlZGdlLnN0cm9rZVdpZHRoJ11cbiAgICAgICAgXSkrXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLnRyZWVEZXNpZ25lclNlbGVjdG9yKycgbWFya2VyI2Fycm93IHBhdGgnLFtcbiAgICAgICAgICAgIFsnZmlsbCcsICdlZGdlLnN0cm9rZSddLFxuICAgICAgICBdKStcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMuZWRnZVNlbGVjdG9yKCdvcHRpbWFsJykrJyBwYXRoJyxbXG4gICAgICAgICAgICBbJ3N0cm9rZScsICdlZGdlLm9wdGltYWwuc3Ryb2tlJ10sXG4gICAgICAgICAgICBbJ3N0cm9rZS13aWR0aCcsICdlZGdlLm9wdGltYWwuc3Ryb2tlV2lkdGgnXVxuICAgICAgICBdKStcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMudHJlZURlc2lnbmVyU2VsZWN0b3IrJyBtYXJrZXIjYXJyb3ctb3B0aW1hbCBwYXRoJyxbXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnZWRnZS5vcHRpbWFsLnN0cm9rZSddLFxuICAgICAgICBdKStcblxuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5lZGdlU2VsZWN0b3IoJ3NlbGVjdGVkJykrJyBwYXRoJyxbXG4gICAgICAgICAgICBbJ3N0cm9rZScsICdlZGdlLnNlbGVjdGVkLnN0cm9rZSddLFxuICAgICAgICAgICAgWydzdHJva2Utd2lkdGgnLCAnZWRnZS5zZWxlY3RlZC5zdHJva2VXaWR0aCddXG4gICAgICAgIF0pK1xuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy50cmVlRGVzaWduZXJTZWxlY3RvcisnIG1hcmtlciNhcnJvdy1zZWxlY3RlZCBwYXRoJyxbXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnZWRnZS5zZWxlY3RlZC5zdHJva2UnXSxcbiAgICAgICAgXSkrXG5cbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMuZWRnZVNlbGVjdG9yKCkrJyAubGFiZWwnLFtcbiAgICAgICAgICAgIFsnZm9udC1zaXplJywgJ2VkZ2UubGFiZWwuZm9udFNpemUnXSxcbiAgICAgICAgICAgIFsnZmlsbCcsICdlZGdlLmxhYmVsLmNvbG9yJ11cbiAgICAgICAgXSkrXG5cbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMuZWRnZVNlbGVjdG9yKCkrJyAucGF5b2ZmJyxbXG4gICAgICAgICAgICBbJ2ZvbnQtc2l6ZScsICdlZGdlLnBheW9mZi5mb250U2l6ZSddLFxuICAgICAgICAgICAgWydmaWxsJywgJ2VkZ2UucGF5b2ZmLmNvbG9yJ10sXG4gICAgICAgIF0pK1xuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5lZGdlU2VsZWN0b3IoKSsnIC5wYXlvZmYubmVnYXRpdmUnLFtcbiAgICAgICAgICAgIFsnZmlsbCcsICdlZGdlLnBheW9mZi5uZWdhdGl2ZUNvbG9yJ10sXG4gICAgICAgIF0pK1xuXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLnRyZWVEZXNpZ25lclNlbGVjdG9yKycgLnNkLXRpdGxlLWNvbnRhaW5lciB0ZXh0LnNkLXRpdGxlJyxbXG4gICAgICAgICAgICBbJ2ZvbnQtc2l6ZScsICd0aXRsZS5mb250U2l6ZSddLFxuICAgICAgICAgICAgWydmb250LXdlaWdodCcsICd0aXRsZS5mb250V2VpZ2h0J10sXG4gICAgICAgICAgICBbJ2ZvbnQtc3R5bGUnLCAndGl0bGUuZm9udFN0eWxlJ10sXG4gICAgICAgICAgICBbJ2ZpbGwnLCAndGl0bGUuY29sb3InXVxuICAgICAgICBdKSArXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLnRyZWVEZXNpZ25lclNlbGVjdG9yKycgLnNkLXRpdGxlLWNvbnRhaW5lciB0ZXh0LnNkLWRlc2NyaXB0aW9uJyxbXG4gICAgICAgICAgICBbJ2ZvbnQtc2l6ZScsICdkZXNjcmlwdGlvbi5mb250U2l6ZSddLFxuICAgICAgICAgICAgWydmb250LXdlaWdodCcsICdkZXNjcmlwdGlvbi5mb250V2VpZ2h0J10sXG4gICAgICAgICAgICBbJ2ZvbnQtc3R5bGUnLCAnZGVzY3JpcHRpb24uZm9udFN0eWxlJ10sXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnZGVzY3JpcHRpb24uY29sb3InXVxuICAgICAgICBdKVxufVxuXG5cblxuXG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwibW9kdWxlLmV4cG9ydHMgPSBcXFwiPGRpdiBjbGFzcz1cXFxcXFxcInNkLWdyb3dsLW1lc3NhZ2UgPCU9dHlwZSU+XFxcXFxcXCI+XFxcXG4gICAgPGRpdiBjbGFzcz1cXFxcXFxcInNkLWdyb3dsLW1lc3NhZ2UtdGV4dFxcXFxcXFwiPlxcXFxuICAgICAgICA8JT0gbWVzc2FnZSAlPlxcXFxuICAgIDwvZGl2PlxcXFxuPC9kaXY+XFxcXG5cXFwiO1xcblwiO1xuIiwiaW1wb3J0IHtBcHBVdGlsc30gZnJvbSAnLi9hcHAtdXRpbHMnXG5pbXBvcnQgKiBhcyBkMyBmcm9tICcuL2QzJ1xuaW1wb3J0IHtDb250ZXh0TWVudX0gZnJvbSAnLi9jb250ZXh0LW1lbnUvY29udGV4dC1tZW51J1xuXG5leHBvcnQgY2xhc3MgVGV4dERyYWdIYW5kbGVye1xuXG4gICAgdHJlZURlc2lnbmVyO1xuICAgIGRhdGE7XG4gICAgY29uZmlnO1xuXG4gICAgZHJhZztcblxuXG4gICAgY29uc3RydWN0b3IodHJlZURlc2lnbmVyLCBkYXRhKXtcbiAgICAgICAgdGhpcy50cmVlRGVzaWduZXIgPSB0cmVlRGVzaWduZXI7XG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG5cbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLmRyYWcgPSBkMy5kcmFnKClcbiAgICAgICAgICAgIC5zdWJqZWN0KGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgICAgICBpZihkPT1udWxsKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4OiBldmVudC54LFxuICAgICAgICAgICAgICAgICAgICAgICAgeTogZXZlbnQueVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgdCA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB4OiB0LmF0dHIoXCJ4XCIpICsgQXBwVXRpbHMuZ2V0VHJhbnNsYXRpb24odC5hdHRyKFwidHJhbnNmb3JtXCIpKVswXSxcbiAgICAgICAgICAgICAgICAgICAgeTogdC5hdHRyKFwieVwiKSArIEFwcFV0aWxzLmdldFRyYW5zbGF0aW9uKHQuYXR0cihcInRyYW5zZm9ybVwiKSlbMV1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbihcInN0YXJ0XCIsIGZ1bmN0aW9uKGQpe1xuICAgICAgICAgICAgICAgIHNlbGYuZHJhZ1N0YXJ0ZWQuY2FsbCh0aGlzLGQsIHNlbGYpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKFwiZHJhZ1wiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHNlbGYub25EcmFnLmNhbGwodGhpcywgZCwgc2VsZik7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKFwiZW5kXCIsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5kcmFnRW5kZWQuY2FsbCh0aGlzLCBkLCBzZWxmKTtcbiAgICAgICAgICAgIH0pXG4gICAgfVxuXG5cbiAgICBkcmFnU3RhcnRlZChkLHNlbGYpIHtcbiAgICAgICAgLy8gc2VsZi50cmVlRGVzaWduZXIubGF5b3V0LmRpc2FibGVBdXRvTGF5b3V0KCk7XG4gICAgICAgIENvbnRleHRNZW51LmhpZGUoKTtcbiAgICAgICAgdmFyIHRleHQgPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgIGlmKCF0ZXh0LmNsYXNzZWQoXCJzZWxlY3RlZFwiKSl7XG4gICAgICAgICAgICBzZWxmLnRyZWVEZXNpZ25lci5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2VsZi50cmVlRGVzaWduZXIuc2VsZWN0VGV4dChkKTtcbiAgICAgICAgdGV4dC5jbGFzc2VkKFwic2VsZWN0ZWQgZHJhZ2dpbmdcIiwgdHJ1ZSk7XG4gICAgICAgIHNlbGYuc2VsZWN0ZWROb2RlcyA9IHNlbGYudHJlZURlc2lnbmVyLmdldFNlbGVjdGVkTm9kZXMoKTtcbiAgICAgICAgc2VsZi5wcmV2RHJhZ0V2ZW50ID0gZDMuZXZlbnQ7XG4gICAgICAgIHNlbGYuZHJhZ0V2ZW50Q291bnQgPSAwO1xuICAgIH1cblxuICAgIG9uRHJhZyhkcmFnZ2VkVGV4dCwgc2VsZil7XG4gICAgICAgIGlmKHNlbGYuZHJhZ0V2ZW50Q291bnQ9PTIpe1xuICAgICAgICAgICAgc2VsZi5kYXRhLnNhdmVTdGF0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHNlbGYuZHJhZ0V2ZW50Q291bnQrKztcblxuICAgICAgICB2YXIgZHggPSBkMy5ldmVudC54IC0gc2VsZi5wcmV2RHJhZ0V2ZW50Lng7XG4gICAgICAgIHZhciBkeSA9IGQzLmV2ZW50LnktIHNlbGYucHJldkRyYWdFdmVudC55O1xuXG4gICAgICAgIHNlbGYudHJlZURlc2lnbmVyLmxheW91dC5tb3ZlVGV4dHMoW2RyYWdnZWRUZXh0XSwgZHgsIGR5KTtcblxuICAgICAgICBzZWxmLnByZXZEcmFnRXZlbnQgPSBkMy5ldmVudDtcbiAgICAgICAgc2VsZi50cmVlRGVzaWduZXIudXBkYXRlUGxvdHRpbmdSZWdpb25TaXplKCk7XG4gICAgfVxuXG4gICAgZHJhZ0VuZGVkKGRyYWdnZWROb2RlLCBzZWxmKXtcbiAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5jbGFzc2VkKFwiZHJhZ2dpbmdcIiwgZmFsc2UpO1xuICAgIH1cblxufVxuXG5cbiIsImltcG9ydCAqIGFzIGQzIGZyb20gJy4vZDMnXG5pbXBvcnQge1V0aWxzfSBmcm9tICdzZC11dGlscydcblxuZXhwb3J0IGNsYXNzIFRvb2x0aXAge1xuICAgIHN0YXRpYyBnZXRDb250YWluZXIoKXtcbiAgICAgICAgcmV0dXJuIGQzLnNlbGVjdChcImJvZHlcIikuc2VsZWN0T3JBcHBlbmQoJ2Rpdi5zZC10b29sdGlwJyk7XG4gICAgfVxuXG4gICAgc3RhdGljIHNob3coaHRtbCwgeE9mZnNldCA9IDUsIHlPZmZzZXQgPSAyOCwgZXZlbnQsIGR1cmF0aW9uPW51bGwpIHtcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IFRvb2x0aXAuZ2V0Q29udGFpbmVyKClcbiAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgMCk7XG4gICAgICAgIGNvbnRhaW5lci50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kdXJhdGlvbigyMDApXG4gICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIC45OCk7XG4gICAgICAgIGNvbnRhaW5lci5odG1sKGh0bWwpO1xuICAgICAgICBUb29sdGlwLnVwZGF0ZVBvc2l0aW9uKHhPZmZzZXQsIHlPZmZzZXQsIGV2ZW50KTtcbiAgICAgICAgaWYoZHVyYXRpb24pe1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIFRvb2x0aXAuaGlkZSgpO1xuICAgICAgICAgICAgfSwgZHVyYXRpb24pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgdXBkYXRlUG9zaXRpb24oeE9mZnNldCA9IDUsIHlPZmZzZXQgPSAyOCwgZXZlbnQpIHtcbiAgICAgICAgZXZlbnQgPSBldmVudCB8fCBkMy5ldmVudDtcbiAgICAgICAgVG9vbHRpcC5nZXRDb250YWluZXIoKVxuICAgICAgICAgICAgLnN0eWxlKFwibGVmdFwiLCAoZXZlbnQucGFnZVggKyB4T2Zmc2V0KSArIFwicHhcIilcbiAgICAgICAgICAgIC5zdHlsZShcInRvcFwiLCAoZXZlbnQucGFnZVkgLSB5T2Zmc2V0KSArIFwicHhcIik7XG4gICAgfVxuXG4gICAgc3RhdGljIGhpZGUoZHVyYXRpb24gPSA1MDApIHtcbiAgICAgICAgdmFyIHQgPSBUb29sdGlwLmdldENvbnRhaW5lcigpO1xuICAgICAgICBpZihkdXJhdGlvbil7XG4gICAgICAgICAgICB0ID0gdC50cmFuc2l0aW9uKCkuZHVyYXRpb24oZHVyYXRpb24pXG4gICAgICAgIH1cbiAgICAgICAgdC5zdHlsZShcIm9wYWNpdHlcIiwgMCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGF0dGFjaCh0YXJnZXQsIGh0bWxPckZuLCB4T2Zmc2V0LCB5T2Zmc2V0KSB7XG4gICAgICAgIHRhcmdldC5vbignbW91c2VvdmVyJywgZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgIHZhciBodG1sID0gbnVsbDtcbiAgICAgICAgICAgIGlmIChVdGlscy5pc0Z1bmN0aW9uKGh0bWxPckZuKSkge1xuICAgICAgICAgICAgICAgIGh0bWwgPSBodG1sT3JGbihkLCBpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaHRtbCA9IGh0bWxPckZuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaHRtbCAhPT0gbnVsbCAmJiBodG1sICE9PSB1bmRlZmluZWQgJiYgaHRtbCAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICBUb29sdGlwLnNob3coaHRtbCwgeE9mZnNldCwgeU9mZnNldCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBUb29sdGlwLmhpZGUoMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSkub24oJ21vdXNlbW92ZScsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICBUb29sdGlwLnVwZGF0ZVBvc2l0aW9uKHhPZmZzZXQsIHlPZmZzZXQpO1xuICAgICAgICB9KS5vbihcIm1vdXNlb3V0XCIsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICBUb29sdGlwLmhpZGUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0ICogYXMgZDMgZnJvbSBcIi4vZDNcIjtcbmltcG9ydCB7VXRpbHN9IGZyb20gXCJzZC11dGlsc1wiO1xuaW1wb3J0IHtBcHBVdGlsc30gZnJvbSBcIi4vYXBwLXV0aWxzXCI7XG5pbXBvcnQge2RvbWFpbiBhcyBtb2RlbH0gZnJvbSBcInNkLW1vZGVsXCI7XG5pbXBvcnQge0NvbnRleHRNZW51fSBmcm9tIFwiLi9jb250ZXh0LW1lbnUvY29udGV4dC1tZW51XCI7XG5pbXBvcnQge01haW5Db250ZXh0TWVudX0gZnJvbSBcIi4vY29udGV4dC1tZW51L21haW4tY29udGV4dC1tZW51XCI7XG5pbXBvcnQge05vZGVDb250ZXh0TWVudX0gZnJvbSBcIi4vY29udGV4dC1tZW51L25vZGUtY29udGV4dC1tZW51XCI7XG5pbXBvcnQge0xheW91dH0gZnJvbSBcIi4vbGF5b3V0XCI7XG5pbXBvcnQge05vZGVEcmFnSGFuZGxlcn0gZnJvbSBcIi4vbm9kZS1kcmFnLWhhbmRsZXJcIjtcbmltcG9ydCB7VG9vbHRpcH0gZnJvbSBcIi4vdG9vbHRpcFwiO1xuaW1wb3J0IHtUZW1wbGF0ZXN9IGZyb20gXCIuL3RlbXBsYXRlc1wiO1xuaW1wb3J0IHtUZXh0RHJhZ0hhbmRsZXJ9IGZyb20gXCIuL3RleHQtZHJhZy1oYW5kbGVyXCI7XG5pbXBvcnQge1RleHRDb250ZXh0TWVudX0gZnJvbSBcIi4vY29udGV4dC1tZW51L3RleHQtY29udGV4dC1tZW51XCI7XG5pbXBvcnQge0VkZ2VDb250ZXh0TWVudX0gZnJvbSBcIi4vY29udGV4dC1tZW51L2VkZ2UtY29udGV4dC1tZW51XCI7XG5pbXBvcnQgKiBhcyBIYW1tZXIgZnJvbSBcImhhbW1lcmpzXCI7XG5pbXBvcnQge2kxOG59IGZyb20gXCIuL2kxOG4vaTE4blwiO1xuXG5cbmV4cG9ydCBjbGFzcyBUcmVlRGVzaWduZXJDb25maWcge1xuICAgIHdpZHRoID0gdW5kZWZpbmVkO1xuICAgIGhlaWdodCA9IHVuZGVmaW5lZDtcbiAgICBtYXJnaW4gPSB7XG4gICAgICAgIGxlZnQ6IDI1LFxuICAgICAgICByaWdodDogMjUsXG4gICAgICAgIHRvcDogMjUsXG4gICAgICAgIGJvdHRvbTogMjVcbiAgICB9O1xuICAgIHNjYWxlID0gMTtcbiAgICBsbmcgPSAnZW4nO1xuICAgIGxheW91dD0ge1xuICAgICAgICB0eXBlOiAndHJlZScsXG4gICAgICAgIG5vZGVTaXplOiA0MCxcbiAgICAgICAgbGltaXROb2RlUG9zaXRpb25pbmc6IHRydWUsXG4gICAgICAgIGxpbWl0VGV4dFBvc2l0aW9uaW5nOiB0cnVlLFxuICAgICAgICBncmlkSGVpZ2h0OiA3NSxcbiAgICAgICAgZ3JpZFdpZHRoOiAxNTAsXG4gICAgICAgIGVkZ2VTbGFudFdpZHRoTWF4OiAyMFxuICAgIH07XG4gICAgZm9udEZhbWlseSA9ICdzYW5zLXNlcmlmJztcbiAgICBmb250U2l6ZSA9ICcxMnB4JztcbiAgICBmb250V2VpZ2h0ID0gJ25vcm1hbCc7XG4gICAgZm9udFN0eWxlID0gJ25vcm1hbCc7XG4gICAgbm9kZSA9IHtcbiAgICAgICAgc3Ryb2tlV2lkdGg6ICcxcHgnLFxuICAgICAgICBvcHRpbWFsOiB7XG4gICAgICAgICAgICBzdHJva2U6ICcjMDA2ZjAwJyxcbiAgICAgICAgICAgIHN0cm9rZVdpZHRoOiAnMS41cHgnLFxuICAgICAgICB9LFxuICAgICAgICBsYWJlbDoge1xuICAgICAgICAgICAgZm9udFNpemU6ICcxZW0nLFxuICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgfSxcbiAgICAgICAgcGF5b2ZmOiB7XG4gICAgICAgICAgICBmb250U2l6ZTogJzFlbScsXG4gICAgICAgICAgICBjb2xvcjogJ2JsYWNrJyxcbiAgICAgICAgICAgIG5lZ2F0aXZlQ29sb3I6ICcjYjYwMDAwJ1xuICAgICAgICB9LFxuICAgICAgICBkZWNpc2lvbjoge1xuICAgICAgICAgICAgZmlsbDogJyNmZjc3NzcnLFxuICAgICAgICAgICAgc3Ryb2tlOiAnIzY2MDAwMCcsXG5cbiAgICAgICAgICAgIHNlbGVjdGVkOiB7XG4gICAgICAgICAgICAgICAgZmlsbDogJyNhYTMzMzMnLFxuICAgICAgICAgICAgICAgIC8vIHN0cm9rZTogJyM2NjY2MDAnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGNoYW5jZToge1xuICAgICAgICAgICAgZmlsbDogJyNmZmZmNDQnLFxuICAgICAgICAgICAgc3Ryb2tlOiAnIzY2NjYwMCcsXG5cbiAgICAgICAgICAgIHNlbGVjdGVkOiB7XG4gICAgICAgICAgICAgICAgZmlsbDogJyNhYWFhMDAnLFxuICAgICAgICAgICAgICAgIC8vIHN0cm9rZTogJyM2NjY2MDAnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHRlcm1pbmFsOntcbiAgICAgICAgICAgIGZpbGw6ICcjNDRmZjQ0JyxcbiAgICAgICAgICAgIHN0cm9rZTogJ2JsYWNrJyxcbiAgICAgICAgICAgIHNlbGVjdGVkOiB7XG4gICAgICAgICAgICAgICAgZmlsbDogJyMwMGFhMDAnLFxuICAgICAgICAgICAgICAgIC8vIHN0cm9rZTogJ2JsYWNrJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBheW9mZjoge1xuICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMWVtJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJyxcbiAgICAgICAgICAgICAgICBuZWdhdGl2ZUNvbG9yOiAnI2I2MDAwMCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICB9O1xuICAgIGVkZ2U9e1xuICAgICAgICBzdHJva2U6ICcjNDI0MjQyJyxcbiAgICAgICAgc3Ryb2tlV2lkdGg6ICcxLjUnLFxuICAgICAgICBvcHRpbWFsOntcbiAgICAgICAgICAgIHN0cm9rZTogJyMwMDZmMDAnLFxuICAgICAgICAgICAgc3Ryb2tlV2lkdGg6ICcyLjQnLFxuICAgICAgICB9LFxuICAgICAgICBzZWxlY3RlZDp7XG4gICAgICAgICAgICBzdHJva2U6ICcjMDQ1YWQxJyxcbiAgICAgICAgICAgIHN0cm9rZVdpZHRoOiAnMy41JyxcbiAgICAgICAgfSxcbiAgICAgICAgbGFiZWw6IHtcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMWVtJyxcbiAgICAgICAgICAgIGNvbG9yOiAnYmFjaydcbiAgICAgICAgfSxcbiAgICAgICAgcGF5b2ZmOntcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMWVtJyxcbiAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snLFxuICAgICAgICAgICAgbmVnYXRpdmVDb2xvcjogJyNiNjAwMDAnXG4gICAgICAgIH1cblxuICAgIH07XG4gICAgcHJvYmFiaWxpdHkgPSB7XG4gICAgICAgIGZvbnRTaXplOiAnMWVtJyxcbiAgICAgICAgY29sb3I6ICcjMDAwMGQ3J1xuICAgIH07XG4gICAgdGl0bGUgPSB7XG4gICAgICAgIGZvbnRTaXplOiAnMTZweCcsXG4gICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcbiAgICAgICAgZm9udFN0eWxlOiAnbm9ybWFsJyxcbiAgICAgICAgY29sb3I6ICcjMDAwMDAwJyxcbiAgICAgICAgbWFyZ2luOntcbiAgICAgICAgICAgIHRvcDogMTUsXG4gICAgICAgICAgICBib3R0b206IDEwXG4gICAgICAgIH1cbiAgICB9O1xuICAgIGRlc2NyaXB0aW9uID0ge1xuICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICBmb250U2l6ZTogJzEycHgnLFxuICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXG4gICAgICAgIGZvbnRTdHlsZTogJ25vcm1hbCcsXG4gICAgICAgIGNvbG9yOiAnIzAwMDAwMCcsXG4gICAgICAgIG1hcmdpbjp7XG4gICAgICAgICAgICB0b3A6IDUsXG4gICAgICAgICAgICBib3R0b206IDEwXG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcmVhZE9ubHk9IGZhbHNlO1xuICAgIGRpc2FibGVBbmltYXRpb25zPWZhbHNlO1xuICAgIGZvcmNlRnVsbEVkZ2VSZWRyYXc9ZmFsc2U7XG4gICAgaGlkZUxhYmVscz1mYWxzZTtcbiAgICBoaWRlUGF5b2Zmcz1mYWxzZTtcbiAgICBoaWRlUHJvYmFiaWxpdGllcz1mYWxzZTtcbiAgICByYXc9ZmFsc2U7XG5cblxuICAgIHBheW9mZk51bWJlckZvcm1hdHRlciA9ICh2LCBpKT0+IHY7XG4gICAgcHJvYmFiaWxpdHlOdW1iZXJGb3JtYXR0ZXIgID0gKHYpPT4gdjtcblxuICAgIG9uTm9kZVNlbGVjdGVkID0gKG5vZGUpID0+IHt9O1xuICAgIG9uRWRnZVNlbGVjdGVkID0gKGVkZ2UpID0+IHt9O1xuICAgIG9uVGV4dFNlbGVjdGVkID0gKHRleHQpID0+IHt9O1xuICAgIG9uU2VsZWN0aW9uQ2xlYXJlZCA9ICgpID0+IHt9O1xuXG4gICAgb3BlcmF0aW9uc0Zvck9iamVjdCA9IChvKSA9PiBbXTtcblxuICAgIHBheW9mZk5hbWVzID0gW251bGwsIG51bGxdO1xuICAgIG1heFBheW9mZnNUb0Rpc3BsYXkgPSAxO1xuXG4gICAgY29uc3RydWN0b3IoY3VzdG9tKSB7XG4gICAgICAgIGlmIChjdXN0b20pIHtcbiAgICAgICAgICAgIFV0aWxzLmRlZXBFeHRlbmQodGhpcywgY3VzdG9tKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgVHJlZURlc2lnbmVyIHtcblxuICAgIGNvbmZpZztcbiAgICBjb250YWluZXI7XG4gICAgZGF0YTsgLy9kYXRhIG1vZGVsIG1hbmFnZXJcbiAgICBzdmc7XG5cbiAgICBjb25zdHJ1Y3Rvcihjb250YWluZXIsIGRhdGFNb2RlbCwgY29uZmlnKXtcbiAgICAgICAgdGhpcy5zZXRDb25maWcoY29uZmlnKTtcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YU1vZGVsO1xuICAgICAgICB0aGlzLmluaXRDb250YWluZXIoY29udGFpbmVyKTtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuXG4gICAgc2V0Q29uZmlnKGNvbmZpZykge1xuICAgICAgICB0aGlzLmNvbmZpZyA9IG5ldyBUcmVlRGVzaWduZXJDb25maWcoY29uZmlnKTtcbiAgICAgICAgaWYodGhpcy5sYXlvdXQpe1xuICAgICAgICAgICAgdGhpcy5sYXlvdXQuY29uZmlnPXRoaXMuY29uZmlnLmxheW91dDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0ZUN1c3RvbVN0eWxlcygpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBpbml0KCl7XG5cbiAgICAgICAgdGhpcy5pbml0U3ZnKCk7XG4gICAgICAgIHRoaXMuaW5pdExheW91dCgpO1xuICAgICAgICB0aGlzLmluaXRJMThuKCk7XG4gICAgICAgIHRoaXMuaW5pdEJydXNoKCk7XG4gICAgICAgIHRoaXMuaW5pdEVkZ2VNYXJrZXJzKCk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVDdXN0b21TdHlsZXMoKTtcbiAgICAgICAgaWYoIXRoaXMuY29uZmlnLnJlYWRPbmx5KXtcbiAgICAgICAgICAgIHRoaXMuaW5pdE1haW5Db250ZXh0TWVudSgpO1xuICAgICAgICAgICAgdGhpcy5pbml0Tm9kZUNvbnRleHRNZW51KCk7XG4gICAgICAgICAgICB0aGlzLmluaXRFZGdlQ29udGV4dE1lbnUoKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdE5vZGVEcmFnSGFuZGxlcigpO1xuICAgICAgICAgICAgdGhpcy5pbml0VGV4dERyYWdIYW5kbGVyKCk7XG4gICAgICAgICAgICB0aGlzLmluaXRUZXh0Q29udGV4dE1lbnUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlZHJhdygpO1xuICAgIH1cblxuICAgIGluaXRJMThuKCkge1xuICAgICAgICBpMThuLmluaXQodGhpcy5jb25maWcubG5nKTtcbiAgICB9XG5cblxuICAgIHVwZGF0ZUN1c3RvbVN0eWxlcygpe1xuICAgICAgICBkMy5zZWxlY3QoJ2hlYWQnKS5zZWxlY3RPckFwcGVuZCgnc3R5bGUjc2QtdHJlZS1kZXNpZ25lci1zdHlsZScpLmh0bWwoVGVtcGxhdGVzLmdldCgndHJlZURlc2lnbmVyU3R5bGVzJywgdGhpcy5jb25maWcpKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgaW5pdExheW91dCgpe1xuICAgICAgICB0aGlzLmxheW91dCA9IG5ldyBMYXlvdXQodGhpcywgdGhpcy5kYXRhLCB0aGlzLmNvbmZpZy5sYXlvdXQpO1xuICAgIH1cblxuICAgIGluaXROb2RlRHJhZ0hhbmRsZXIoKXtcbiAgICAgICAgdGhpcy5ub2RlRHJhZ0hhbmRsZXIgPSBuZXcgTm9kZURyYWdIYW5kbGVyKHRoaXMsIHRoaXMuZGF0YSk7XG4gICAgfVxuXG4gICAgaW5pdFRleHREcmFnSGFuZGxlcigpe1xuICAgICAgICB0aGlzLnRleHREcmFnSGFuZGxlciA9IG5ldyBUZXh0RHJhZ0hhbmRsZXIodGhpcywgdGhpcy5kYXRhKTtcbiAgICB9XG5cbiAgICByZWRyYXcod2l0aFRyYW5zaXRpb25zPWZhbHNlKXtcblxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHdpdGhUcmFuc2l0aW9ucyA9ICFzZWxmLmNvbmZpZy5kaXNhYmxlQW5pbWF0aW9ucyAmJiB3aXRoVHJhbnNpdGlvbnM7XG4gICAgICAgIHRoaXMucmVkcmF3RGlhZ3JhbVRpdGxlKCk7XG4gICAgICAgIHRoaXMucmVkcmF3RGlhZ3JhbURlc2NyaXB0aW9uKCk7XG4gICAgICAgIHRoaXMudXBkYXRlU2NhbGUod2l0aFRyYW5zaXRpb25zKTtcbiAgICAgICAgdGhpcy51cGRhdGVNYXJnaW4od2l0aFRyYW5zaXRpb25zKTtcbiAgICAgICAgaWYod2l0aFRyYW5zaXRpb25zKXtcbiAgICAgICAgICAgIHNlbGYudHJhbnNpdGlvblByZXYgPSBzZWxmLnRyYW5zaXRpb247XG4gICAgICAgICAgICBzZWxmLnRyYW5zaXRpb24gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVkcmF3Tm9kZXMoKTtcbiAgICAgICAgdGhpcy5yZWRyYXdFZGdlcygpO1xuICAgICAgICB0aGlzLnJlZHJhd0Zsb2F0aW5nVGV4dHMoKTtcbiAgICAgICAgdGhpcy51cGRhdGVWYWxpZGF0aW9uTWVzc2FnZXMoKTtcbiAgICAgICAgaWYod2l0aFRyYW5zaXRpb25zKXtcbiAgICAgICAgICAgIHNlbGYudHJhbnNpdGlvbiA9ICBzZWxmLnRyYW5zaXRpb25QcmV2O1xuICAgICAgICB9XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHNlbGYudXBkYXRlUGxvdHRpbmdSZWdpb25TaXplKCk7XG4gICAgICAgIH0sMTApO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGNvbXB1dGVBdmFpbGFibGVTcGFjZSgpe1xuICAgICAgICB0aGlzLmF2YWlsYWJsZUhlaWdodCA9IEFwcFV0aWxzLnNhbml0aXplSGVpZ2h0KHRoaXMuY29uZmlnLmhlaWdodCwgdGhpcy5jb250YWluZXIsIHRoaXMuY29uZmlnLm1hcmdpbik7XG4gICAgICAgIHRoaXMuYXZhaWxhYmxlV2lkdGggPSBBcHBVdGlscy5zYW5pdGl6ZVdpZHRoKHRoaXMuY29uZmlnLndpZHRoLCB0aGlzLmNvbnRhaW5lciwgdGhpcy5jb25maWcubWFyZ2luKTtcbiAgICB9XG5cbiAgICBpbml0U3ZnKCkge1xuICAgICAgICB2YXIgYyA9IHRoaXM7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5jb21wdXRlQXZhaWxhYmxlU3BhY2UoKTtcbiAgICAgICAgdGhpcy5zdmcgPSB0aGlzLmNvbnRhaW5lci5zZWxlY3RPckFwcGVuZCgnc3ZnLnNkLXRyZWUtZGVzaWduZXInKTtcbiAgICAgICAgdGhpcy5zdmcuYXR0cignd2lkdGgnLCB0aGlzLmF2YWlsYWJsZVdpZHRoKS5hdHRyKCdoZWlnaHQnLCB0aGlzLmF2YWlsYWJsZUhlaWdodCk7XG5cbiAgICAgICAgdGhpcy53cmFwcGVyR3JvdXAgPSB0aGlzLnN2Zy5zZWxlY3RPckFwcGVuZCgnZy5zZC13cmFwcGVyLWdyb3VwJyk7XG4gICAgICAgIHRoaXMubWFpbkdyb3VwID0gdGhpcy53cmFwcGVyR3JvdXAuc2VsZWN0T3JBcHBlbmQoJ2cubWFpbi1ncm91cCcpO1xuICAgICAgICB0aGlzLnVwZGF0ZVNjYWxlKCk7XG4gICAgICAgIHRoaXMudXBkYXRlTWFyZ2luKCk7XG5cblxuICAgICAgICBpZiAoIXRoaXMuY29uZmlnLndpZHRoKSB7XG4gICAgICAgICAgICBkMy5zZWxlY3Qod2luZG93KVxuICAgICAgICAgICAgICAgIC5vbihcInJlc2l6ZS50cmVlLWRlc2lnbmVyXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi51cGRhdGVQbG90dGluZ1JlZ2lvblNpemUoKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5yZWRyYXdEaWFncmFtVGl0bGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBtYyA9IG5ldyBIYW1tZXIuTWFuYWdlcih0aGlzLnN2Zy5ub2RlKCksIHt0b3VjaEFjdGlvbiA6ICdhdXRvJ30pO1xuICAgICAgICBtYy5hZGQobmV3IEhhbW1lci5QcmVzcyh7XG4gICAgICAgICAgICBwb2ludGVyVHlwZTogJ3RvdWNoJ1xuICAgICAgICB9KSk7XG5cbiAgICAgICAgbWMuYWRkKG5ldyBIYW1tZXIuUGluY2goe1xuICAgICAgICAgICAgcG9pbnRlclR5cGU6ICd0b3VjaCdcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIHZhciBjYW5jZWw7XG4gICAgICAgIG1jLm9uKCdwaW5jaHN0YXJ0JywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHNlbGYuZGlzYWJsZUJydXNoKCk7XG4gICAgICAgIH0pXG4gICAgICAgIG1jLm9uKCdwaW5jaCcsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBjYW5jZWwgPSBVdGlscy53YWl0Rm9yRmluYWxFdmVudCgoKT0+c2VsZi5lbmFibGVCcnVzaCgpLCAncGluY2hlbmQnLCA1MDAwKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHVwZGF0ZU1hcmdpbih3aXRoVHJhbnNpdGlvbnMpe1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBtYXJnaW4gPSB0aGlzLmNvbmZpZy5tYXJnaW47XG4gICAgICAgIHZhciBncm91cCA9IHRoaXMubWFpbkdyb3VwO1xuICAgICAgICBpZih3aXRoVHJhbnNpdGlvbnMpe1xuICAgICAgICAgICAgZ3JvdXAgPSBncm91cC50cmFuc2l0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRvcE1hcmdpbiA9IG1hcmdpbi50b3A7XG4gICAgICAgIGlmKHRoaXMuZGlhZ3JhbVRpdGxlfHx0aGlzLmRpYWdyYW1EZXNjcmlwdGlvbil7XG4gICAgICAgICAgICB0aGlzLnRvcE1hcmdpbiA9IHBhcnNlSW50KHRoaXMuZGlhZ3JhbVRpdGxlID8gdGhpcy5jb25maWcudGl0bGUubWFyZ2luLnRvcCA6IDApICsgdGhpcy5nZXRUaXRsZUdyb3VwSGVpZ2h0KClcbiAgICAgICAgICAgICAgICArICBNYXRoLm1heCh0aGlzLnRvcE1hcmdpbiwgcGFyc2VJbnQodGhpcy5jb25maWcudGl0bGUubWFyZ2luLmJvdHRvbSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ3JvdXAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZShcIiArIG1hcmdpbi5sZWZ0ICsgXCIsXCIgKyB0aGlzLnRvcE1hcmdpbiArIFwiKVwiKS5vbihcImVuZFwiLCAoKT0+IHNlbGYudXBkYXRlUGxvdHRpbmdSZWdpb25TaXplKCkpO1xuICAgIH1cblxuICAgIHNldE1hcmdpbihtYXJnaW4sIHdpdGhvdXRTdGF0ZVNhdmluZyl7XG4gICAgICAgIHZhciBzZWxmPXRoaXM7XG4gICAgICAgIGlmKCF3aXRob3V0U3RhdGVTYXZpbmcpe1xuICAgICAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSh7XG4gICAgICAgICAgICAgICAgZGF0YTp7XG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbjogVXRpbHMuY2xvbmUoc2VsZi5jb25maWcubWFyZ2luKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25VbmRvOiAoZGF0YSk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0TWFyZ2luKGRhdGEubWFyZ2luLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uUmVkbzogKGRhdGEpPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldE1hcmdpbihtYXJnaW4sIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIFV0aWxzLmRlZXBFeHRlbmQodGhpcy5jb25maWcubWFyZ2luLCBtYXJnaW4pO1xuICAgICAgICB0aGlzLnJlZHJhd0RpYWdyYW1UaXRsZSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZU1hcmdpbih0cnVlKTtcbiAgICB9XG5cblxuICAgIHVwZGF0ZVNjYWxlKHdpdGhUcmFuc2l0aW9ucyl7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIHNjYWxlID0gdGhpcy5jb25maWcuc2NhbGU7XG4gICAgICAgIHZhciBncm91cCA9IHRoaXMud3JhcHBlckdyb3VwO1xuICAgICAgICBpZih3aXRoVHJhbnNpdGlvbnMpe1xuICAgICAgICAgICAgZ3JvdXAgPSBncm91cC50cmFuc2l0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICBncm91cC5hdHRyKFwidHJhbnNmb3JtXCIsIFwic2NhbGUoXCIgKyBzY2FsZSArIFwiKVwiKS5vbihcImVuZFwiLCAoKT0+IHNlbGYudXBkYXRlUGxvdHRpbmdSZWdpb25TaXplKCkpO1xuICAgIH1cblxuICAgIHNldFNjYWxlKHNjYWxlLCB3aXRob3V0U3RhdGVTYXZpbmcpe1xuICAgICAgICB2YXIgc2VsZj10aGlzO1xuICAgICAgICBpZighd2l0aG91dFN0YXRlU2F2aW5nKXtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoe1xuICAgICAgICAgICAgICAgIGRhdGE6e1xuICAgICAgICAgICAgICAgICAgICBzY2FsZTogVXRpbHMuY2xvbmUoc2VsZi5jb25maWcuc2NhbGUpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvblVuZG86IChkYXRhKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRTY2FsZShkYXRhLnNjYWxlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uUmVkbzogKGRhdGEpPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldFNjYWxlKHNjYWxlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbmZpZy5zY2FsZSA9IHNjYWxlO1xuICAgICAgICB0aGlzLnVwZGF0ZVNjYWxlKHRydWUpO1xuICAgIH1cblxuICAgIGluaXRDb250YWluZXIoY29udGFpbmVySWRPckVsZW0pIHtcbiAgICAgICAgaWYgKFV0aWxzLmlzU3RyaW5nKGNvbnRhaW5lcklkT3JFbGVtKSkge1xuICAgICAgICAgICAgdmFyIHNlbGVjdG9yID0gY29udGFpbmVySWRPckVsZW0udHJpbSgpO1xuXG4gICAgICAgICAgICBpZiAoIVV0aWxzLnN0YXJ0c1dpdGgoc2VsZWN0b3IsICcjJykgJiYgIVV0aWxzLnN0YXJ0c1dpdGgoc2VsZWN0b3IsICcuJykpIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvciA9ICcjJyArIHNlbGVjdG9yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIgPSBkMy5zZWxlY3Qoc2VsZWN0b3IpO1xuICAgICAgICB9IGVsc2UgaWYoY29udGFpbmVySWRPckVsZW0uX3BhcmVudHMpe1xuICAgICAgICAgICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXJJZE9yRWxlbVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyID0gZDMuc2VsZWN0KGNvbnRhaW5lcklkT3JFbGVtKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZVBsb3R0aW5nUmVnaW9uU2l6ZSgpIHtcbiAgICAgICAgdmFyIGNoYW5nZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jb21wdXRlQXZhaWxhYmxlU3BhY2UoKTtcbiAgICAgICAgdmFyIG1hcmdpbiA9IHRoaXMuY29uZmlnLm1hcmdpbjtcbiAgICAgICAgdmFyIHN2Z1dpZHRoID0gdGhpcy5zdmcuYXR0cignd2lkdGgnKTtcbiAgICAgICAgdmFyIHN2Z0hlaWdodCA9IHRoaXMuc3ZnLmF0dHIoJ2hlaWdodCcpO1xuICAgICAgICB2YXIgbWFpbkdyb3VwQm94ID0gdGhpcy5tYWluR3JvdXAubm9kZSgpLmdldEJCb3goKTtcbiAgICAgICAgbGV0IGJveFdpZHRoID0gbWFpbkdyb3VwQm94LndpZHRoO1xuICAgICAgICB2YXIgbmV3U3ZnV2lkdGggPSBib3hXaWR0aCttYWluR3JvdXBCb3gueCttYXJnaW4ubGVmdCttYXJnaW4ucmlnaHQ7XG4gICAgICAgIG5ld1N2Z1dpZHRoICAqPSB0aGlzLmNvbmZpZy5zY2FsZTtcbiAgICAgICAgdGhpcy5jb250YWluZXIuY2xhc3NlZCgnd2l0aC1vdmVyZmxvdy14JywgbmV3U3ZnV2lkdGg+PXRoaXMuYXZhaWxhYmxlV2lkdGgpO1xuICAgICAgICBuZXdTdmdXaWR0aCA9IE1hdGgubWF4KG5ld1N2Z1dpZHRoLCB0aGlzLmF2YWlsYWJsZVdpZHRoKTtcbiAgICAgICAgaWYoc3ZnV2lkdGghPW5ld1N2Z1dpZHRoKXtcbiAgICAgICAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zdmcuYXR0cignd2lkdGgnLCBuZXdTdmdXaWR0aCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGJveEhlaWdodCA9IG1haW5Hcm91cEJveC5oZWlnaHQ7XG4gICAgICAgIHZhciBuZXdTdmdIZWlnaHQgPSBib3hIZWlnaHQrbWFpbkdyb3VwQm94LnkrdGhpcy50b3BNYXJnaW4rbWFyZ2luLmJvdHRvbTtcbiAgICAgICAgbmV3U3ZnSGVpZ2h0ICo9IHRoaXMuY29uZmlnLnNjYWxlO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5jbGFzc2VkKCd3aXRoLW92ZXJmbG93LXknLCBuZXdTdmdIZWlnaHQ+PXRoaXMuYXZhaWxhYmxlSGVpZ2h0KTtcbiAgICAgICAgbmV3U3ZnSGVpZ2h0ID0gTWF0aC5tYXgobmV3U3ZnSGVpZ2h0LCB0aGlzLmF2YWlsYWJsZUhlaWdodCk7XG4gICAgICAgIGlmKHN2Z0hlaWdodCE9bmV3U3ZnSGVpZ2h0KXtcbiAgICAgICAgICAgIGNoYW5nZWQ9dHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc3ZnLmF0dHIoJ2hlaWdodCcsIG5ld1N2Z0hlaWdodCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoY2hhbmdlZCl7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUJydXNoRXh0ZW50KClcbiAgICAgICAgfVxuXG5cbiAgICB9XG5cbiAgICByZWRyYXdOb2RlcygpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG5cbiAgICAgICAgdmFyIG5vZGVzQ29udGFpbmVyID0gdGhpcy5tYWluR3JvdXAuc2VsZWN0T3JBcHBlbmQoJ2cubm9kZXMnKTtcbiAgICAgICAgdmFyIG5vZGVzID0gbm9kZXNDb250YWluZXIuc2VsZWN0QWxsKCcubm9kZScpLmRhdGEodGhpcy5kYXRhLm5vZGVzLmZpbHRlcihkPT4hZC4kaGlkZGVuKSwgKGQsaSk9PiBkLiRpZCk7XG4gICAgICAgIG5vZGVzLmV4aXQoKS5yZW1vdmUoKTtcbiAgICAgICAgdmFyIG5vZGVzRW50ZXIgPSBub2Rlcy5lbnRlcigpLmFwcGVuZCgnZycpXG4gICAgICAgICAgICAuYXR0cignaWQnLCBkPT4nbm9kZS0nK2QuJGlkKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgZD0+ZC50eXBlKyctbm9kZSBub2RlJylcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBkPT4ndHJhbnNsYXRlKCcgKyBkLmxvY2F0aW9uLnggKyAnICAnICsgZC5sb2NhdGlvbi55ICsgJyknKTtcbiAgICAgICAgbm9kZXNFbnRlci5hcHBlbmQoJ3BhdGgnKTtcblxuICAgICAgICB2YXIgbGFiZWxFbnRlciA9IG5vZGVzRW50ZXIuYXBwZW5kKCd0ZXh0JykuYXR0cignY2xhc3MnLCAnbGFiZWwnKTtcbiAgICAgICAgdmFyIHBheW9mZkVudGVyID0gbm9kZXNFbnRlci5hcHBlbmQoJ3RleHQnKS5hdHRyKCdjbGFzcycsICdwYXlvZmYgY29tcHV0ZWQnKTtcbiAgICAgICAgdmFyIGluZGljYXRvckVudGVyID0gbm9kZXNFbnRlci5hcHBlbmQoJ3RleHQnKS5hdHRyKCdjbGFzcycsICdlcnJvci1pbmRpY2F0b3InKS50ZXh0KCchIScpO1xuICAgICAgICB2YXIgYWdncmVnYXRlZFBheW9mZkVudGVyID0gbm9kZXNFbnRlci5hcHBlbmQoJ3RleHQnKS5hdHRyKCdjbGFzcycsICdhZ2dyZWdhdGVkLXBheW9mZicpO1xuICAgICAgICB2YXIgcHJvYmFiaWxpdHlUb0VudGVyRW50ZXIgPSBub2Rlc0VudGVyLmFwcGVuZCgndGV4dCcpLmF0dHIoJ2NsYXNzJywgJ3Byb2JhYmlsaXR5LXRvLWVudGVyJyk7XG5cbiAgICAgICAgdmFyIG5vZGVzTWVyZ2UgPSBub2Rlc0VudGVyLm1lcmdlKG5vZGVzKTtcbiAgICAgICAgbm9kZXNNZXJnZS5jbGFzc2VkKCdvcHRpbWFsJywgKGQpPT5zZWxmLmlzT3B0aW1hbChkKSk7XG5cbiAgICAgICAgdmFyIG5vZGVzTWVyZ2VUID0gbm9kZXNNZXJnZTtcbiAgICAgICAgaWYodGhpcy50cmFuc2l0aW9uKXtcbiAgICAgICAgICAgIG5vZGVzTWVyZ2VUID0gbm9kZXNNZXJnZS50cmFuc2l0aW9uKCk7XG4gICAgICAgICAgICBub2Rlc01lcmdlVC5vbignZW5kJywgKCk9PiBzZWxmLnVwZGF0ZVBsb3R0aW5nUmVnaW9uU2l6ZSgpKVxuICAgICAgICB9XG4gICAgICAgIG5vZGVzTWVyZ2VUXG4gICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgZD0+J3RyYW5zbGF0ZSgnICsgZC5sb2NhdGlvbi54ICsgJyAgJyArIGQubG9jYXRpb24ueSArICcpJylcblxuICAgICAgICB2YXIgcGF0aCA9IG5vZGVzTWVyZ2Uuc2VsZWN0KCdwYXRoJyk7XG4gICAgICAgIHRoaXMubGF5b3V0LmRyYXdOb2RlU3ltYm9sKHBhdGgsdGhpcy50cmFuc2l0aW9uKTtcblxuICAgICAgICAvKnBhdGhcbiAgICAgICAgICAgIC5zdHlsZSgnZmlsbCcsIGQ9PiB7XG4gICAgICAgICAgICAgICAgLy8gaWYoc2VsZi5pc05vZGVTZWxlY3RlZChkKSl7XG4gICAgICAgICAgICAgICAgLy8gICAgIHJldHVybiBzZWxmLmNvbmZpZy5ub2RlW2QudHlwZV0uc2VsZWN0ZWQuZmlsbFxuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5jb25maWcubm9kZVtkLnR5cGVdLmZpbGxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3R5bGUoJ3N0cm9rZScsIGQ9PiBzZWxmLmNvbmZpZy5ub2RlW2QudHlwZV0uc3Ryb2tlKVxuICAgICAgICAgICAgLnN0eWxlKCdzdHJva2Utd2lkdGgnLCBkPT4ge1xuICAgICAgICAgICAgICAgIGlmKHNlbGYuY29uZmlnLm5vZGVbZC50eXBlXS5zdHJva2VXaWR0aCE9PXVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLmNvbmZpZy5ub2RlW2QudHlwZV0uc3Ryb2tlV2lkdGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLmNvbmZpZy5ub2RlLnN0cm9rZVdpZHRoO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICovXG4gICAgICAgIHRoaXMubGF5b3V0Lm5vZGVMYWJlbFBvc2l0aW9uKGxhYmVsRW50ZXIpO1xuICAgICAgICB2YXIgbGFiZWxNZXJnZSA9IG5vZGVzTWVyZ2Uuc2VsZWN0KCd0ZXh0LmxhYmVsJyk7XG4gICAgICAgIGxhYmVsTWVyZ2UuY2xhc3NlZCgnc2QtaGlkZGVuJywgdGhpcy5jb25maWcuaGlkZUxhYmVscyk7XG4gICAgICAgIHZhciBsYWJlbE1lcmdlVCA9IG5vZGVzTWVyZ2VULnNlbGVjdCgndGV4dC5sYWJlbCcpO1xuICAgICAgICBsYWJlbE1lcmdlVC5lYWNoKHRoaXMudXBkYXRlVGV4dExpbmVzKTtcbiAgICAgICAgdGhpcy5sYXlvdXQubm9kZUxhYmVsUG9zaXRpb24obGFiZWxNZXJnZVQpXG4gICAgICAgICAgICAuYXR0cigndGV4dC1hbmNob3InLCAnbWlkZGxlJylcblxuICAgICAgICB2YXIgcGF5b2ZmID0gbm9kZXNNZXJnZS5zZWxlY3QoJ3RleHQucGF5b2ZmJyk7XG5cbiAgICAgICAgdmFyIHBheW9mZlRzcGFucyA9IHBheW9mZi5zZWxlY3RBbGwoJ3RzcGFuJykuZGF0YShkPT57XG4gICAgICAgICAgICBsZXQgaXRlbSA9IGQuZGlzcGxheVZhbHVlKCdjaGlsZHJlblBheW9mZicpO1xuICAgICAgICAgICAgcmV0dXJuIFV0aWxzLmlzQXJyYXkoaXRlbSkgPyBpdGVtLmZpbHRlcihpPT5pICE9PSB1bmRlZmluZWQpIDogW2l0ZW1dXG4gICAgICAgIH0pO1xuICAgICAgICBwYXlvZmZUc3BhbnMuZXhpdCgpLnJlbW92ZSgpO1xuXG4gICAgICAgIHZhciBwYXlvZmZUc3BhbnNNID0gcGF5b2ZmVHNwYW5zLmVudGVyKCkuYXBwZW5kKCd0c3BhbicpLm1lcmdlKHBheW9mZlRzcGFucyk7XG4gICAgICAgIHBheW9mZlRzcGFuc01cbiAgICAgICAgICAgIC8vIC5hdHRyKCdkb21pbmFudC1iYXNlbGluZScsICdoYW5naW5nJylcbiAgICAgICAgICAgIC5hdHRyKCdkeScsIChkLGkpPT5pPjAgPyAnMS4xZW0nOiB1bmRlZmluZWQpXG4gICAgICAgICAgICAuYXR0cigneCcsICcwJylcbiAgICAgICAgICAgIC5jbGFzc2VkKCduZWdhdGl2ZScsIGQ9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQhPT1udWxsICYmIGQ8MDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2xhc3NlZCgnc2QtaGlkZGVuJywgdGhpcy5jb25maWcuaGlkZVBheW9mZnMgfHwgdGhpcy5jb25maWcucmF3KVxuICAgICAgICAgICAgLnRleHQoKGQsIGkpPT4ge1xuICAgICAgICAgICAgICAgIHZhciB2YWwgPSBkXG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsIT09bnVsbCA/IChpc05hTih2YWwpID8gdmFsIDogc2VsZi5jb25maWcucGF5b2ZmTnVtYmVyRm9ybWF0dGVyKHZhbCwgaSkpOiAnJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuYXR0YWNoUGF5b2ZmVG9vbHRpcChwYXlvZmZUc3BhbnNNKTtcblxuXG4gICAgICAgIHZhciBwYXlvZmZUID0gcGF5b2ZmO1xuICAgICAgICBpZih0aGlzLnRyYW5zaXRpb24pe1xuICAgICAgICAgICAgcGF5b2ZmVCA9IHBheW9mZi50cmFuc2l0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxheW91dC5ub2RlUGF5b2ZmUG9zaXRpb24ocGF5b2ZmRW50ZXIpO1xuICAgICAgICB0aGlzLmxheW91dC5ub2RlUGF5b2ZmUG9zaXRpb24ocGF5b2ZmVCk7XG5cbiAgICAgICAgdmFyIGFnZ3JlZ2F0ZWRQYXlvZmYgPSBub2Rlc01lcmdlLnNlbGVjdCgndGV4dC5hZ2dyZWdhdGVkLXBheW9mZicpO1xuICAgICAgICB2YXIgYWdncmVnYXRlZFBheW9mZlRzcGFucyA9IGFnZ3JlZ2F0ZWRQYXlvZmYuc2VsZWN0QWxsKCd0c3BhbicpLmRhdGEoZD0+e1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSBkLmRpc3BsYXlWYWx1ZSgnYWdncmVnYXRlZFBheW9mZicpO1xuICAgICAgICAgICAgcmV0dXJuIFV0aWxzLmlzQXJyYXkoaXRlbSkgPyBpdGVtLmZpbHRlcihpPT5pICE9PSB1bmRlZmluZWQpIDogW2l0ZW1dXG4gICAgICAgIH0pO1xuICAgICAgICBhZ2dyZWdhdGVkUGF5b2ZmVHNwYW5zLmV4aXQoKS5yZW1vdmUoKTtcbiAgICAgICAgdmFyIGFnZ3JlZ2F0ZWRQYXlvZmZUc3BhbnNNID0gYWdncmVnYXRlZFBheW9mZlRzcGFucy5lbnRlcigpLmFwcGVuZCgndHNwYW4nKS5tZXJnZShhZ2dyZWdhdGVkUGF5b2ZmVHNwYW5zKVxuICAgICAgICAgICAgLmF0dHIoJ2R5JywgKGQsaSk9Pmk+MCA/ICcwLjk1ZW0nOiB1bmRlZmluZWQpXG4gICAgICAgICAgICAuY2xhc3NlZCgnbmVnYXRpdmUnLCBkPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBkIT09bnVsbCAmJiBkPDA7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNsYXNzZWQoJ3NkLWhpZGRlbicsIHRoaXMuY29uZmlnLmhpZGVQYXlvZmZzIHx8IHRoaXMuY29uZmlnLnJhdylcbiAgICAgICAgICAgIC50ZXh0KCh2YWwsIGkpPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWwhPT1udWxsID8gKGlzTmFOKHZhbCkgPyB2YWwgOiBzZWxmLmNvbmZpZy5wYXlvZmZOdW1iZXJGb3JtYXR0ZXIodmFsLCBpKSk6ICcnXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmF0dGFjaFBheW9mZlRvb2x0aXAoYWdncmVnYXRlZFBheW9mZlRzcGFuc00sICdhZ2dyZWdhdGVkUGF5b2ZmJyk7XG5cbiAgICAgICAgdmFyIGFnZ3JlZ2F0ZWRQYXlvZmZUID0gYWdncmVnYXRlZFBheW9mZjtcbiAgICAgICAgaWYodGhpcy50cmFuc2l0aW9uKXtcbiAgICAgICAgICAgIGFnZ3JlZ2F0ZWRQYXlvZmZUID0gYWdncmVnYXRlZFBheW9mZi50cmFuc2l0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxheW91dC5ub2RlQWdncmVnYXRlZFBheW9mZlBvc2l0aW9uKGFnZ3JlZ2F0ZWRQYXlvZmZFbnRlcik7XG4gICAgICAgIHRoaXMubGF5b3V0Lm5vZGVBZ2dyZWdhdGVkUGF5b2ZmUG9zaXRpb24oYWdncmVnYXRlZFBheW9mZlQpO1xuXG4gICAgICAgIHZhciBwcm9iYWJpbGl0eVRvRW50ZXIgPSBub2Rlc01lcmdlLnNlbGVjdCgndGV4dC5wcm9iYWJpbGl0eS10by1lbnRlcicpXG4gICAgICAgICAgICAudGV4dChkPT57XG4gICAgICAgICAgICAgICAgdmFyIHZhbCA9IGQuZGlzcGxheVZhbHVlKCdwcm9iYWJpbGl0eVRvRW50ZXInKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsIT09bnVsbCA/IChpc05hTih2YWwpID8gdmFsIDogc2VsZi5jb25maWcucHJvYmFiaWxpdHlOdW1iZXJGb3JtYXR0ZXIodmFsKSk6ICcnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNsYXNzZWQoJ3NkLWhpZGRlbicsIHRoaXMuY29uZmlnLmhpZGVQcm9iYWJpbGl0aWVzIHx8IHRoaXMuY29uZmlnLnJhdyk7XG4gICAgICAgIFRvb2x0aXAuYXR0YWNoKHByb2JhYmlsaXR5VG9FbnRlciwgaTE4bi50KCd0b29sdGlwLm5vZGUucHJvYmFiaWxpdHlUb0VudGVyJykpO1xuXG5cbiAgICAgICAgdmFyIHByb2JhYmlsaXR5VG9FbnRlclQgPSBwcm9iYWJpbGl0eVRvRW50ZXI7XG4gICAgICAgIGlmKHRoaXMudHJhbnNpdGlvbil7XG4gICAgICAgICAgICBwcm9iYWJpbGl0eVRvRW50ZXJUID0gcHJvYmFiaWxpdHlUb0VudGVyLnRyYW5zaXRpb24oKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxheW91dC5ub2RlUHJvYmFiaWxpdHlUb0VudGVyUG9zaXRpb24ocHJvYmFiaWxpdHlUb0VudGVyRW50ZXIpO1xuICAgICAgICB0aGlzLmxheW91dC5ub2RlUHJvYmFiaWxpdHlUb0VudGVyUG9zaXRpb24ocHJvYmFiaWxpdHlUb0VudGVyVCk7XG5cblxuICAgICAgICB2YXIgaW5kaWNhdG9yID0gbm9kZXNNZXJnZS5zZWxlY3QoJ3RleHQuZXJyb3ItaW5kaWNhdG9yJyk7XG4gICAgICAgIGluZGljYXRvci5jbGFzc2VkKCdzZC1oaWRkZW4nLCB0aGlzLmNvbmZpZy5yYXcpXG4gICAgICAgIHRoaXMubGF5b3V0Lm5vZGVJbmRpY2F0b3JQb3NpdGlvbihpbmRpY2F0b3JFbnRlcik7XG4gICAgICAgIHRoaXMubGF5b3V0Lm5vZGVJbmRpY2F0b3JQb3NpdGlvbihpbmRpY2F0b3IpO1xuXG4gICAgICAgIGlmKHRoaXMubm9kZURyYWdIYW5kbGVyKXtcbiAgICAgICAgICAgIG5vZGVzTWVyZ2UuY2FsbCh0aGlzLm5vZGVEcmFnSGFuZGxlci5kcmFnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG5vZGVzTWVyZ2Uub24oJ2NvbnRleHRtZW51JywgdGhpcy5ub2RlQ29udGV4dE1lbnUpO1xuICAgICAgICBub2Rlc01lcmdlLm9uKCdkYmxjbGljaycsIHRoaXMubm9kZUNvbnRleHRNZW51KVxuICAgICAgICBub2Rlc01lcmdlLmVhY2goZnVuY3Rpb24oZCwgaSl7XG4gICAgICAgICAgICB2YXIgbm9kZUVsZW0gPSB0aGlzO1xuICAgICAgICAgICAgdmFyIG1jID0gbmV3IEhhbW1lci5NYW5hZ2VyKG5vZGVFbGVtKTtcbiAgICAgICAgICAgIG1jLmFkZChuZXcgSGFtbWVyLlByZXNzKHtcbiAgICAgICAgICAgICAgICBwb2ludGVyVHlwZTogJ3RvdWNoJ1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgbWMub24oJ3ByZXNzJywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICAgICAgaWYoZS5wb2ludGVyVHlwZT09J3RvdWNoJyl7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubm9kZURyYWdIYW5kbGVyLmNhbmNlbERyYWcoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuXG5cbiAgICAgICAgICAgIGlmKGQuZm9sZGVkKXtcbiAgICAgICAgICAgICAgICBsZXQgYnV0dG9uID0gZDMuc2VsZWN0KG5vZGVFbGVtKS5zZWxlY3RPckFwcGVuZCgndGV4dC5zZC11bmZvbGQtYnV0dG9uJylcbiAgICAgICAgICAgICAgICAgICAgLnRleHQoXCJbK11cIilcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdjbGljayBkYmNsaWNrIG1vdXNlZG93bicsICgpPT5zZWxmLmZvbGRTdWJ0cmVlKGQsIGZhbHNlKSk7IC8vZmlyZWZveCBkZXRlY3RzIG9ubHkgbW91c2Vkb3duIGV2ZW50IC0gcmVsYXRlZCB0byBkcmFnIGhhbmRsZXJcblxuICAgICAgICAgICAgICAgIHNlbGYubGF5b3V0Lm5vZGVVbmZvbGRCdXR0b25Qb3NpdGlvbihidXR0b24pO1xuICAgICAgICAgICAgICAgIFRvb2x0aXAuYXR0YWNoKGJ1dHRvbiwgaTE4bi50KCdjb250ZXh0TWVudS5ub2RlLnVuZm9sZCcpKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGQzLnNlbGVjdChub2RlRWxlbSkuc2VsZWN0KCcuc2QtdW5mb2xkLWJ1dHRvbicpLnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgYXR0YWNoUGF5b2ZmVG9vbHRpcChzZWxlY3Rpb24sIHBheW9mZkZpbGVkTmFtZSA9ICdwYXlvZmYnLCBvYmplY3Q9J25vZGUnKXtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBUb29sdGlwLmF0dGFjaChzZWxlY3Rpb24sIChkLCBpKT0+e1xuICAgICAgICAgICAgaWYoc2VsZi5jb25maWcucGF5b2ZmTmFtZXMubGVuZ3RoPmkgJiYgc2VsZi5jb25maWcucGF5b2ZmTmFtZXNbaV0gIT09IG51bGwpe1xuICAgICAgICAgICAgICAgIHJldHVybiBpMThuLnQoJ3Rvb2x0aXAuJytvYmplY3QrJy4nK3BheW9mZkZpbGVkTmFtZSsnLm5hbWVkJyx7dmFsdWU6IGQucGF5b2ZmLCBudW1iZXI6IGkrMSwgbmFtZTogc2VsZi5jb25maWcucGF5b2ZmTmFtZXNbaV19KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGkxOG4udCgndG9vbHRpcC4nK29iamVjdCsnLicrcGF5b2ZmRmlsZWROYW1lKycuZGVmYXVsdCcse3ZhbHVlOiBkLnBheW9mZiwgbnVtYmVyOiBzZWxmLmNvbmZpZy5tYXhQYXlvZmZzVG9EaXNwbGF5IDwgMiA/ICcnIDogaSsxfSlcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdXBkYXRlVGV4dExpbmVzKGQpeyAvL2hlbHBlciBtZXRob2QgZm9yIHNwbGl0dGluZyB0ZXh0IHRvIHRzcGFuc1xuICAgICAgICB2YXIgbGluZXMgPSBkLm5hbWUgPyBkLm5hbWUuc3BsaXQoJ1xcbicpIDogW107XG4gICAgICAgIGxpbmVzLnJldmVyc2UoKTtcbiAgICAgICAgdmFyIHRzcGFucyA9IGQzLnNlbGVjdCh0aGlzKS5zZWxlY3RBbGwoJ3RzcGFuJykuZGF0YShsaW5lcyk7XG4gICAgICAgIHRzcGFucy5lbnRlcigpLmFwcGVuZCgndHNwYW4nKVxuICAgICAgICAgICAgLm1lcmdlKHRzcGFucylcbiAgICAgICAgICAgIC50ZXh0KGw9PmwpXG4gICAgICAgICAgICAuYXR0cignZHknLCAoZCxpKT0+aT4wID8gJy0xLjFlbSc6IHVuZGVmaW5lZClcbiAgICAgICAgICAgIC5hdHRyKCd4JywgJzAnKTtcblxuICAgICAgICB0c3BhbnMuZXhpdCgpLnJlbW92ZSgpO1xuICAgIH1cblxuICAgIGlzT3B0aW1hbChkKXtcbiAgICAgICAgcmV0dXJuIGQuZGlzcGxheVZhbHVlKCdvcHRpbWFsJyk7XG4gICAgfVxuXG4gICAgcmVkcmF3RWRnZXMoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIGVkZ2VzQ29udGFpbmVyID0gdGhpcy5tYWluR3JvdXAuc2VsZWN0T3JBcHBlbmQoJ2cuZWRnZXMnKTtcbiAgICAgICAgaWYoc2VsZi5jb25maWcuZm9yY2VGdWxsRWRnZVJlZHJhdyl7XG4gICAgICAgICAgICBlZGdlc0NvbnRhaW5lci5zZWxlY3RBbGwoXCIqXCIpLnJlbW92ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGVkZ2VzID0gZWRnZXNDb250YWluZXIuc2VsZWN0QWxsKCcuZWRnZScpLmRhdGEodGhpcy5kYXRhLmVkZ2VzLmZpbHRlcihlPT4hZS4kaGlkZGVuKSwgKGQsaSk9PiBkLiRpZCk7XG4gICAgICAgIGVkZ2VzLmV4aXQoKS5yZW1vdmUoKTtcbiAgICAgICAgdmFyIGVkZ2VzRW50ZXIgPSBlZGdlcy5lbnRlcigpLmFwcGVuZCgnZycpXG4gICAgICAgICAgICAuYXR0cignaWQnLCBkPT4nZWRnZS0nK2QuJGlkKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2VkZ2UnKTtcblxuXG4gICAgICAgIGVkZ2VzRW50ZXIuYXBwZW5kKCdwYXRoJyk7XG4gICAgICAgIHZhciBsYWJlbEVudGVyID0gZWRnZXNFbnRlci5hcHBlbmRTZWxlY3RvcignZy5sYWJlbC1ncm91cCcpO1xuICAgICAgICBsYWJlbEVudGVyLmFwcGVuZCgndGV4dCcpLmF0dHIoJ2NsYXNzJywgJ2xhYmVsJyk7XG4gICAgICAgIHZhciBwYXlvZmZFbnRlciA9IGVkZ2VzRW50ZXIuYXBwZW5kKCd0ZXh0JykuYXR0cignY2xhc3MnLCAncGF5b2ZmJyk7XG4gICAgICAgIHZhciBwcm9iYWJpbGl0eUVudGVyID0gZWRnZXNFbnRlci5hcHBlbmQoJ3RleHQnKS5hdHRyKCdjbGFzcycsICdwcm9iYWJpbGl0eScpO1xuXG5cbiAgICAgICAgdmFyIGVkZ2VzTWVyZ2UgPSBlZGdlc0VudGVyLm1lcmdlKGVkZ2VzKTtcblxuXG4gICAgICAgIHZhciBvcHRpbWFsQ2xhc3NOYW1lID0gJ29wdGltYWwnO1xuICAgICAgICBlZGdlc01lcmdlLmNsYXNzZWQob3B0aW1hbENsYXNzTmFtZSwgKGQpPT5zZWxmLmlzT3B0aW1hbChkKSk7XG5cbiAgICAgICAgdmFyIGVkZ2VzTWVyZ2VUID0gZWRnZXNNZXJnZTtcbiAgICAgICAgaWYodGhpcy50cmFuc2l0aW9uKXtcbiAgICAgICAgICAgIGVkZ2VzTWVyZ2VUID0gZWRnZXNNZXJnZS50cmFuc2l0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICBlZGdlc01lcmdlVC5zZWxlY3QoJ3BhdGgnKVxuICAgICAgICAgICAgLmF0dHIoJ2QnLCBkPT4gdGhpcy5sYXlvdXQuZWRnZUxpbmVEKGQpKVxuICAgICAgICAgICAgLy8gLmF0dHIoXCJzdHJva2VcIiwgXCJibGFja1wiKVxuICAgICAgICAgICAgLy8gLmF0dHIoXCJzdHJva2Utd2lkdGhcIiwgMilcbiAgICAgICAgICAgIC5hdHRyKFwiZmlsbFwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgIC5hdHRyKFwibWFya2VyLWVuZFwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN1ZmZpeCA9IGQzLnNlbGVjdCh0aGlzLnBhcmVudE5vZGUpLmNsYXNzZWQoJ3NlbGVjdGVkJykgPyAnLXNlbGVjdGVkJyA6IChzZWxmLmlzT3B0aW1hbChkKT8nLW9wdGltYWwnOicnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJ1cmwoI2Fycm93XCIrIHN1ZmZpeCtcIilcIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyAuYXR0cihcInNoYXBlLXJlbmRlcmluZ1wiLCBcIm9wdGltaXplUXVhbGl0eVwiKVxuXG5cbiAgICAgICAgZWRnZXNNZXJnZS5vbignY2xpY2snLCBkPT57XG4gICAgICAgICAgICBzZWxmLnNlbGVjdEVkZ2UoZCwgdHJ1ZSlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5sYXlvdXQuZWRnZUxhYmVsUG9zaXRpb24obGFiZWxFbnRlcik7XG4gICAgICAgIGVkZ2VzTWVyZ2VULnNlbGVjdCgndGV4dC5sYWJlbCcpLmVhY2godGhpcy51cGRhdGVUZXh0TGluZXMpO1xuICAgICAgICB2YXIgbGFiZWxNZXJnZSA9IGVkZ2VzTWVyZ2Uuc2VsZWN0KCdnLmxhYmVsLWdyb3VwJyk7XG4gICAgICAgIGxhYmVsTWVyZ2UuY2xhc3NlZCgnc2QtaGlkZGVuJywgdGhpcy5jb25maWcuaGlkZUxhYmVscyk7XG4gICAgICAgIHZhciBsYWJlbE1lcmdlVCA9IGVkZ2VzTWVyZ2VULnNlbGVjdCgnZy5sYWJlbC1ncm91cCcpO1xuICAgICAgICB0aGlzLmxheW91dC5lZGdlTGFiZWxQb3NpdGlvbihsYWJlbE1lcmdlVCk7XG4gICAgICAgICAgICAvLyAudGV4dChkPT5kLm5hbWUpO1xuXG4gICAgICAgIHZhciBwYXlvZmYgPSBlZGdlc01lcmdlLnNlbGVjdCgndGV4dC5wYXlvZmYnKTtcblxuICAgICAgICB2YXIgcGF5b2ZmVHNwYW5zID0gcGF5b2ZmLnNlbGVjdEFsbCgndHNwYW4nKS5kYXRhKGQgPT4ge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSBkLmRpc3BsYXlWYWx1ZSgncGF5b2ZmJyk7XG4gICAgICAgICAgICByZXR1cm4gVXRpbHMuaXNBcnJheShpdGVtKSA/IGl0ZW0uc2xpY2UoMCwgTWF0aC5taW4oaXRlbS5sZW5ndGgsIHNlbGYuY29uZmlnLm1heFBheW9mZnNUb0Rpc3BsYXkpKS5tYXAoXz0+ZCkgOiBbZF07XG4gICAgICAgIH0pO1xuICAgICAgICBwYXlvZmZUc3BhbnMuZXhpdCgpLnJlbW92ZSgpO1xuXG4gICAgICAgIHZhciBwYXlvZmZUc3BhbnNNID0gcGF5b2ZmVHNwYW5zLmVudGVyKCkuYXBwZW5kKCd0c3BhbicpLm1lcmdlKHBheW9mZlRzcGFucyk7XG4gICAgICAgIHBheW9mZlRzcGFuc01cbiAgICAgICAgLy8gLmF0dHIoJ2RvbWluYW50LWJhc2VsaW5lJywgJ2hhbmdpbmcnKVxuICAgICAgICAgICAgLmF0dHIoJ2R5JywgKGQsaSk9Pmk+MCA/ICcxLjFlbSc6IHVuZGVmaW5lZClcbiAgICAgICAgICAgIC8vIC5hdHRyKCd4JywgJzAnKVxuXG4gICAgICAgICAgICAvLyAuYXR0cignZG9taW5hbnQtYmFzZWxpbmUnLCAnaGFuZ2luZycpXG4gICAgICAgICAgICAuY2xhc3NlZCgnbmVnYXRpdmUnLCAoZCwgaSk9PiB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbCA9IGQuZGlzcGxheVBheW9mZih1bmRlZmluZWQsIGkpO1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWwhPT1udWxsICYmIHZhbDwwO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jbGFzc2VkKCdzZC1oaWRkZW4nLCB0aGlzLmNvbmZpZy5oaWRlUGF5b2ZmcylcbiAgICAgICAgICAgIC8vIC50ZXh0KGQ9PiBpc05hTihkLnBheW9mZikgPyBkLnBheW9mZiA6IHNlbGYuY29uZmlnLnBheW9mZk51bWJlckZvcm1hdHRlcihkLnBheW9mZikpXG4gICAgICAgICAgICAudGV4dCgoZCwgaSk9PntcbiAgICAgICAgICAgICAgICBpZih0aGlzLmNvbmZpZy5yYXcpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC5wYXlvZmZbaV07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBkLmRpc3BsYXlWYWx1ZSgncGF5b2ZmJyk7XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW1zID0gVXRpbHMuaXNBcnJheShpdGVtKSA/IGl0ZW0gOiBbaXRlbV07XG5cbiAgICAgICAgICAgICAgICBsZXQgdmFsID0gaXRlbXNbaV07XG4gICAgICAgICAgICAgICAgaWYgKHZhbCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzTmFOKHZhbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLmNvbmZpZy5wYXlvZmZOdW1iZXJGb3JtYXR0ZXIodmFsLCBpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoVXRpbHMuaXNTdHJpbmcodmFsKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChkLnBheW9mZltpXSAhPT0gbnVsbCAmJiAhaXNOYU4oZC5wYXlvZmZbaV0pKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5jb25maWcucGF5b2ZmTnVtYmVyRm9ybWF0dGVyKGQucGF5b2ZmW2ldLCBpKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBkLnBheW9mZltpXTtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgVG9vbHRpcC5hdHRhY2gocGF5b2ZmVHNwYW5zTSwgKGQsIGkpPT57XG4gICAgICAgICAgICBpZihzZWxmLmNvbmZpZy5wYXlvZmZOYW1lcy5sZW5ndGg+aSAmJiBzZWxmLmNvbmZpZy5wYXlvZmZOYW1lc1tpXSAhPT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGkxOG4udCgndG9vbHRpcC5lZGdlLnBheW9mZi5uYW1lZCcse3ZhbHVlOiBkLnBheW9mZltpXSwgbnVtYmVyOiBpKzEsIG5hbWU6IHNlbGYuY29uZmlnLnBheW9mZk5hbWVzW2ldfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpMThuLnQoJ3Rvb2x0aXAuZWRnZS5wYXlvZmYuZGVmYXVsdCcse3ZhbHVlOiBkLnBheW9mZltpXSwgbnVtYmVyOiBzZWxmLmNvbmZpZy5tYXhQYXlvZmZzVG9EaXNwbGF5IDwgMiA/ICcnIDogaSsxfSlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIHBheW9mZlRleHRUID0gcGF5b2ZmO1xuICAgICAgICBpZih0aGlzLnRyYW5zaXRpb24pe1xuICAgICAgICAgICAgcGF5b2ZmVGV4dFQgPSBwYXlvZmYudHJhbnNpdGlvbigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubGF5b3V0LmVkZ2VQYXlvZmZQb3NpdGlvbihwYXlvZmZFbnRlcik7XG4gICAgICAgIHRoaXMubGF5b3V0LmVkZ2VQYXlvZmZQb3NpdGlvbihwYXlvZmZUZXh0VCk7XG5cbiAgICAgICAgVG9vbHRpcC5hdHRhY2goZWRnZXNNZXJnZS5zZWxlY3QoJ3RleHQucHJvYmFiaWxpdHknKSwgZD0+aTE4bi50KCd0b29sdGlwLmVkZ2UucHJvYmFiaWxpdHknLHt2YWx1ZTogZC5wcm9iYWJpbGl0eT09PSB1bmRlZmluZWQgPyBkLmRpc3BsYXlQcm9iYWJpbGl0eSgpIDogZC5wcm9iYWJpbGl0eX0pKTtcblxuICAgICAgICBlZGdlc01lcmdlLnNlbGVjdCgndGV4dC5wcm9iYWJpbGl0eScpXG4gICAgICAgICAgICAuY2xhc3NlZCgnc2QtaGlkZGVuJywgdGhpcy5jb25maWcuaGlkZVByb2JhYmlsaXRpZXMpO1xuICAgICAgICB2YXIgcHJvYmFiaWxpdHlNZXJnZSA9IGVkZ2VzTWVyZ2Uuc2VsZWN0KCd0ZXh0LnByb2JhYmlsaXR5Jyk7XG4gICAgICAgIHByb2JhYmlsaXR5TWVyZ2VcbiAgICAgICAgICAgIC5hdHRyKCd0ZXh0LWFuY2hvcicsICdlbmQnKVxuICAgICAgICAgICAgLnRleHQoZD0+e1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuY29uZmlnLnJhdyl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkLnByb2JhYmlsaXR5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgdmFsID0gZC5kaXNwbGF5UHJvYmFiaWxpdHkoKTtcblxuICAgICAgICAgICAgICAgIGlmKHZhbCE9PW51bGwpe1xuICAgICAgICAgICAgICAgICAgICBpZighaXNOYU4odmFsKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5jb25maWcucHJvYmFiaWxpdHlOdW1iZXJGb3JtYXR0ZXIodmFsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZihVdGlscy5pc1N0cmluZyh2YWwpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZihkLnByb2JhYmlsaXR5IT09bnVsbCAmJiAhaXNOYU4oZC5wcm9iYWJpbGl0eSkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLmNvbmZpZy5wcm9iYWJpbGl0eU51bWJlckZvcm1hdHRlcihkLnByb2JhYmlsaXR5KTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBkLnByb2JhYmlsaXR5O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIHZhciBwcm9iYWJpbGl0eU1lcmdlVCA9IHByb2JhYmlsaXR5TWVyZ2U7XG4gICAgICAgIGlmKHRoaXMudHJhbnNpdGlvbil7XG4gICAgICAgICAgICBwcm9iYWJpbGl0eU1lcmdlVCA9IHByb2JhYmlsaXR5TWVyZ2UudHJhbnNpdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sYXlvdXQuZWRnZVByb2JhYmlsaXR5UG9zaXRpb24ocHJvYmFiaWxpdHlFbnRlcik7XG4gICAgICAgIHRoaXMubGF5b3V0LmVkZ2VQcm9iYWJpbGl0eVBvc2l0aW9uKHByb2JhYmlsaXR5TWVyZ2VUKTtcblxuXG4gICAgICAgIGVkZ2VzQ29udGFpbmVyLnNlbGVjdEFsbCgnLmVkZ2UuJytvcHRpbWFsQ2xhc3NOYW1lKS5yYWlzZSgpO1xuXG4gICAgICAgIGVkZ2VzTWVyZ2Uub24oJ2NvbnRleHRtZW51JywgdGhpcy5lZGdlQ29udGV4dE1lbnUpO1xuICAgICAgICBlZGdlc01lcmdlLm9uKCdkYmxjbGljaycsIHRoaXMuZWRnZUNvbnRleHRNZW51KTtcbiAgICAgICAgZWRnZXNNZXJnZS5lYWNoKGZ1bmN0aW9uKGQsIGkpe1xuICAgICAgICAgICAgdmFyIGVsZW0gPSB0aGlzO1xuICAgICAgICAgICAgdmFyIG1jID0gbmV3IEhhbW1lci5NYW5hZ2VyKGVsZW0pO1xuICAgICAgICAgICAgbWMuYWRkKG5ldyBIYW1tZXIuUHJlc3Moe1xuICAgICAgICAgICAgICAgIHBvaW50ZXJUeXBlOiBIYW1tZXIuUE9JTlRFUl9UT1VDSFxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIHJlZHJhd0Zsb2F0aW5nVGV4dHMoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuXG4gICAgICAgIHZhciB0ZXh0c0NvbnRhaW5lciA9IHRoaXMubWFpbkdyb3VwLnNlbGVjdE9yQXBwZW5kKCdnLmZsb2F0aW5nLXRleHRzJyk7XG4gICAgICAgIHZhciB0ZXh0cyA9IHRleHRzQ29udGFpbmVyLnNlbGVjdEFsbCgnLmZsb2F0aW5nLXRleHQnKS5kYXRhKHRoaXMuZGF0YS50ZXh0cywgKGQsaSk9PiBkLiRpZCk7XG4gICAgICAgIHRleHRzLmV4aXQoKS5yZW1vdmUoKTtcbiAgICAgICAgdmFyIHRleHRzRW50ZXIgPSB0ZXh0cy5lbnRlcigpLmFwcGVuZFNlbGVjdG9yKCdnLmZsb2F0aW5nLXRleHQnKVxuICAgICAgICAgICAgLmF0dHIoJ2lkJywgZD0+J3RleHQtJytkLiRpZCk7XG5cblxuICAgICAgICB2YXIgcmVjdFdpZHRoID0gNDA7XG4gICAgICAgIHZhciByZWN0SGVpZ2h0ID0gMjA7XG5cbiAgICAgICAgdGV4dHNFbnRlci5hcHBlbmQoJ3JlY3QnKS5hdHRyKCd4JywgLTUpLmF0dHIoJ3knLCAtMTYpLmF0dHIoJ2ZpbGwtb3BhY2l0eScsIDApO1xuICAgICAgICB0ZXh0c0VudGVyLmFwcGVuZCgndGV4dCcpO1xuXG4gICAgICAgIHZhciB0ZXh0c01lcmdlID0gdGV4dHNFbnRlci5tZXJnZSh0ZXh0cyk7XG4gICAgICAgIHZhciB0ZXh0c01lcmdlVCA9IHRleHRzTWVyZ2U7XG4gICAgICAgIGlmKHRoaXMudHJhbnNpdGlvbil7XG4gICAgICAgICAgICB0ZXh0c01lcmdlVCA9IHRleHRzTWVyZ2UudHJhbnNpdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGV4dHNNZXJnZVQuYXR0cigndHJhbnNmb3JtJywgZD0+J3RyYW5zbGF0ZSgnICsgZC5sb2NhdGlvbi54ICsgJyAgJyArIGQubG9jYXRpb24ueSArICcpJyk7XG5cbiAgICAgICAgdmFyIHRzcGFucyA9IHRleHRzTWVyZ2Uuc2VsZWN0KCd0ZXh0Jykuc2VsZWN0QWxsKCd0c3BhbicpLmRhdGEoZD0+ZC52YWx1ZSA/IGQudmFsdWUuc3BsaXQoJ1xcbicpIDogW10pO1xuXG4gICAgICAgIHRzcGFucy5lbnRlcigpLmFwcGVuZCgndHNwYW4nKVxuICAgICAgICAgICAgLm1lcmdlKHRzcGFucylcbiAgICAgICAgICAgIC5odG1sKGw9PkFwcFV0aWxzLnJlcGxhY2VVcmxzKEFwcFV0aWxzLmVzY2FwZUh0bWwobCkpKVxuICAgICAgICAgICAgLmF0dHIoJ2R5JywgKGQsaSk9Pmk+MCA/ICcxLjFlbSc6IHVuZGVmaW5lZClcbiAgICAgICAgICAgIC5hdHRyKCd4JywgJzAnKTtcblxuICAgICAgICB0c3BhbnMuZXhpdCgpLnJlbW92ZSgpO1xuICAgICAgICB0ZXh0c01lcmdlLmNsYXNzZWQoJ3NkLWVtcHR5JywgZD0+IWQudmFsdWUgfHwgIWQudmFsdWUudHJpbSgpKTtcbiAgICAgICAgdGV4dHNNZXJnZS5zZWxlY3QoJ3JlY3QnKS5hdHRyKCd3aWR0aCcsIHJlY3RXaWR0aCkuYXR0cignaGVpZ2h0JywgcmVjdEhlaWdodCk7XG5cbiAgICAgICAgdGV4dHNNZXJnZS5lYWNoKGZ1bmN0aW9uKGQpe1xuICAgICAgICAgICAgaWYoIWQudmFsdWUpe1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBiYiA9IGQzLnNlbGVjdCh0aGlzKS5zZWxlY3QoJ3RleHQnKS5ub2RlKCkuZ2V0QkJveCgpO1xuICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuc2VsZWN0KCdyZWN0JylcbiAgICAgICAgICAgICAgIC5hdHRyKCd5JywgYmIueS01KVxuICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgTWF0aC5tYXgoYmIud2lkdGgrMTAsIHJlY3RXaWR0aCkpXG4gICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgTWF0aC5tYXgoYmIuaGVpZ2h0KzEwLCByZWN0SGVpZ2h0KSlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYodGhpcy50ZXh0RHJhZ0hhbmRsZXIpe1xuICAgICAgICAgICAgdGV4dHNNZXJnZS5jYWxsKHRoaXMudGV4dERyYWdIYW5kbGVyLmRyYWcpO1xuICAgICAgICB9XG4gICAgICAgIHRleHRzTWVyZ2Uub24oJ2NvbnRleHRtZW51JywgdGhpcy50ZXh0Q29udGV4dE1lbnUpO1xuICAgICAgICB0ZXh0c01lcmdlLm9uKCdkYmxjbGljaycsIHRoaXMudGV4dENvbnRleHRNZW51KTtcbiAgICAgICAgdGV4dHNNZXJnZS5lYWNoKGZ1bmN0aW9uKGQsIGkpe1xuICAgICAgICAgICAgdmFyIGVsZW0gPSB0aGlzO1xuICAgICAgICAgICAgdmFyIG1jID0gbmV3IEhhbW1lci5NYW5hZ2VyKGVsZW0pO1xuICAgICAgICAgICAgbWMuYWRkKG5ldyBIYW1tZXIuUHJlc3Moe1xuICAgICAgICAgICAgICAgIHBvaW50ZXJUeXBlOiAndG91Y2gnXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0pXG5cbiAgICB9XG5cbiAgICB1cGRhdGVWYWxpZGF0aW9uTWVzc2FnZXMoKSB7XG4gICAgICAgIHZhciBub2RlcyA9IHRoaXMubWFpbkdyb3VwLnNlbGVjdEFsbCgnLm5vZGUnKTtcbiAgICAgICAgbm9kZXMuY2xhc3NlZCgnZXJyb3InLCBmYWxzZSk7XG5cbiAgICAgICAgdGhpcy5kYXRhLnZhbGlkYXRpb25SZXN1bHRzLmZvckVhY2godmFsaWRhdGlvblJlc3VsdD0+e1xuICAgICAgICAgICAgaWYodmFsaWRhdGlvblJlc3VsdC5pc1ZhbGlkKCkpe1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModmFsaWRhdGlvblJlc3VsdC5vYmplY3RJZFRvRXJyb3IpLmZvckVhY2goaWQ9PntcbiAgICAgICAgICAgICAgICB2YXIgZXJyb3JzID0gdmFsaWRhdGlvblJlc3VsdC5vYmplY3RJZFRvRXJyb3JbaWRdO1xuICAgICAgICAgICAgICAgIHZhciBub2RlU2VsZWN0aW9uID0gdGhpcy5nZXROb2RlRDNTZWxlY3Rpb25CeUlkKGlkKTtcbiAgICAgICAgICAgICAgICBub2RlU2VsZWN0aW9uLmNsYXNzZWQoJ2Vycm9yJywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgdmFyIHRvb2x0aXBIdG1sID0gJyc7XG4gICAgICAgICAgICAgICAgZXJyb3JzLmZvckVhY2goZT0+e1xuICAgICAgICAgICAgICAgICAgICBpZih0b29sdGlwSHRtbCl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwSHRtbCs9Jzxici8+J1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXBIdG1sKz1BcHBVdGlscy5nZXRWYWxpZGF0aW9uTWVzc2FnZShlKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIFRvb2x0aXAuYXR0YWNoKG5vZGVTZWxlY3Rpb24uc2VsZWN0KCcuZXJyb3ItaW5kaWNhdG9yJyksIHRvb2x0aXBIdG1sKTtcblxuXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIGluaXRFZGdlTWFya2VycygpIHtcbiAgICAgICAgdmFyIGRlZnMgPSB0aGlzLnN2Zy5hcHBlbmQoXCJzdmc6ZGVmc1wiKTtcblxuICAgICAgICB0aGlzLmluaXRBcnJvd01hcmtlcihcImFycm93XCIpO1xuICAgICAgICB0aGlzLmluaXRBcnJvd01hcmtlcihcImFycm93LW9wdGltYWxcIik7XG4gICAgICAgIHRoaXMuaW5pdEFycm93TWFya2VyKFwiYXJyb3ctc2VsZWN0ZWRcIik7XG4gICAgfVxuXG4gICAgaW5pdEFycm93TWFya2VyKGlkKSB7XG5cbiAgICAgICAgdmFyIGRlZnMgPSB0aGlzLnN2Zy5zZWxlY3QoXCJkZWZzXCIpO1xuICAgICAgICBkZWZzLmFwcGVuZChcIm1hcmtlclwiKVxuICAgICAgICAgICAgLmF0dHIoXCJpZFwiLGlkKVxuICAgICAgICAgICAgLmF0dHIoXCJ2aWV3Qm94XCIsXCIwIC01IDEwIDEwXCIpXG4gICAgICAgICAgICAuYXR0cihcInJlZlhcIiw1KVxuICAgICAgICAgICAgLmF0dHIoXCJyZWZZXCIsMClcbiAgICAgICAgICAgIC5hdHRyKFwibWFya2VyV2lkdGhcIiw0KVxuICAgICAgICAgICAgLmF0dHIoXCJtYXJrZXJIZWlnaHRcIiw0KVxuICAgICAgICAgICAgLmF0dHIoXCJvcmllbnRcIixcImF1dG9cIilcbiAgICAgICAgICAgIC5hcHBlbmQoXCJwYXRoXCIpXG4gICAgICAgICAgICAuYXR0cihcImRcIiwgXCJNMCwtNUwxMCwwTDAsNVwiKVxuICAgICAgICAgICAgLmF0dHIoXCJjbGFzc1wiLFwiYXJyb3dIZWFkXCIpO1xuICAgIH1cblxuICAgIHVwZGF0ZUJydXNoRXh0ZW50KCkge1xuICAgICAgICB2YXIgc2VsZiA9dGhpcztcbiAgICAgICAgdGhpcy5icnVzaC5leHRlbnQoW1swLCAwXSwgW3NlbGYuc3ZnLmF0dHIoJ3dpZHRoJyksIHNlbGYuc3ZnLmF0dHIoJ2hlaWdodCcpXV0pO1xuICAgICAgICB0aGlzLmJydXNoQ29udGFpbmVyLmNhbGwodGhpcy5icnVzaCk7XG4gICAgfVxuICAgIGluaXRCcnVzaCgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHZhciBicnVzaENvbnRhaW5lciA9IHNlbGYuYnJ1c2hDb250YWluZXIgPSB0aGlzLmJydXNoQ29udGFpbmVyPSB0aGlzLndyYXBwZXJHcm91cC5zZWxlY3RPckluc2VydChcImcuYnJ1c2hcIiwgXCI6Zmlyc3QtY2hpbGRcIilcbiAgICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJicnVzaFwiKTtcblxuICAgICAgICB2YXIgYnJ1c2ggPSB0aGlzLmJydXNoID0gZDMuYnJ1c2goKVxuICAgICAgICAgICAgLm9uKFwic3RhcnRcIiwgYnJ1c2hzdGFydClcbiAgICAgICAgICAgIC5vbihcImJydXNoXCIsIGJydXNobW92ZSlcbiAgICAgICAgICAgIC5vbihcImVuZFwiLCBicnVzaGVuZCk7XG5cblxuXG4gICAgICAgIHRoaXMudXBkYXRlQnJ1c2hFeHRlbnQoKTtcblxuICAgICAgICBicnVzaENvbnRhaW5lci5zZWxlY3QoJy5vdmVybGF5Jykub24oXCJtb3VzZW1vdmUuZWRnZVNlbGVjdGlvblwiLCBtb3VzZW1vdmVkKTtcbiAgICAgICAgZnVuY3Rpb24gbW91c2Vtb3ZlZCgpIHtcbiAgICAgICAgICAgIHZhciBtID0gZDMubW91c2UodGhpcyk7XG4gICAgICAgICAgICB2YXIgbWd0ID0gc2VsZi5nZXRNYWluR3JvdXBUcmFuc2xhdGlvbigpO1xuICAgICAgICAgICAgdmFyIG1hcmdpbiA9IDEwO1xuXG4gICAgICAgICAgICB2YXIgY2xvc2VzdCA9IFtudWxsLCA5OTk5OTk5OTldO1xuICAgICAgICAgICAgdmFyIGNsb3NlRWRnZXMgPSBbXTtcbiAgICAgICAgICAgIHNlbGYubWFpbkdyb3VwLnNlbGVjdEFsbCgnLmVkZ2UnKS5lYWNoKGZ1bmN0aW9uKGQpe1xuICAgICAgICAgICAgICAgIHZhciBzZWxlY3Rpb24gPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uLmNsYXNzZWQoJ3NkLWhvdmVyJywgZmFsc2UpO1xuICAgICAgICAgICAgICAgIHZhciBwYXRoTm9kZSA9IHNlbGVjdGlvbi5zZWxlY3QoJ3BhdGgnKS5ub2RlKCk7XG4gICAgICAgICAgICAgICAgdmFyIGIgPSBwYXRoTm9kZS5nZXRCQm94KCk7XG4gICAgICAgICAgICAgICAgaWYoYi54K21ndFswXSA8PW1bMF0gJiYgYi54K2Iud2lkdGgrbWd0WzBdID49IG1bMF0gJiZcbiAgICAgICAgICAgICAgICAgICBiLnkrbWd0WzFdLW1hcmdpbiA8PW1bMV0gJiYgYi55K2IuaGVpZ2h0K21ndFsxXSttYXJnaW4gPj0gbVsxXSl7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGNwID0gQXBwVXRpbHMuY2xvc2VzdFBvaW50KHBhdGhOb2RlLCBbbVswXS1tZ3RbMF0sIG1bMV0tbWd0WzFdXSk7XG4gICAgICAgICAgICAgICAgICAgIGlmKGNwLmRpc3RhbmNlIDwgbWFyZ2luICYmIGNwLmRpc3RhbmNlPGNsb3Nlc3RbMV0pe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VzdCA9IFtzZWxlY3Rpb24sIGNwLmRpc3RhbmNlXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHNlbGYuaG92ZXJlZEVkZ2UgPSBudWxsO1xuICAgICAgICAgICAgaWYoY2xvc2VzdFswXSl7XG4gICAgICAgICAgICAgICAgY2xvc2VzdFswXS5jbGFzc2VkKCdzZC1ob3ZlcicsIHRydWUpO1xuICAgICAgICAgICAgICAgIHNlbGYuaG92ZXJlZEVkZ2UgPSBjbG9zZXN0WzBdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBicnVzaHN0YXJ0KCkge1xuICAgICAgICAgICAgaWYgKCFkMy5ldmVudC5zZWxlY3Rpb24pIHJldHVybjtcbiAgICAgICAgICAgIGlmKHNlbGYuaG92ZXJlZEVkZ2Upe1xuICAgICAgICAgICAgICAgIHNlbGYuc2VsZWN0RWRnZShzZWxmLmhvdmVyZWRFZGdlLmRhdHVtKCksIHRydWUpXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBzZWxmLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBDb250ZXh0TWVudS5oaWRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBIaWdobGlnaHQgdGhlIHNlbGVjdGVkIG5vZGVzLlxuICAgICAgICBmdW5jdGlvbiBicnVzaG1vdmUoKSB7XG4gICAgICAgICAgICB2YXIgcyA9IGQzLmV2ZW50LnNlbGVjdGlvbjtcbiAgICAgICAgICAgIGlmKCFzKXJldHVybjtcblxuICAgICAgICAgICAgc2VsZi5tYWluR3JvdXAuc2VsZWN0QWxsKFwiLm5vZGVcIikuY2xhc3NlZCgnc2VsZWN0ZWQnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHZhciBtYWluR3JvdXBUcmFuc2xhdGlvbiA9IHNlbGYuZ2V0TWFpbkdyb3VwVHJhbnNsYXRpb24oKTtcbiAgICAgICAgICAgICAgICB2YXIgeCA9IGQubG9jYXRpb24ueCttYWluR3JvdXBUcmFuc2xhdGlvblswXTtcbiAgICAgICAgICAgICAgICB2YXIgeSA9IGQubG9jYXRpb24ueSttYWluR3JvdXBUcmFuc2xhdGlvblsxXTtcbiAgICAgICAgICAgICAgICB2YXIgbm9kZVNpemUgPSBzZWxmLmNvbmZpZy5sYXlvdXQubm9kZVNpemU7XG4gICAgICAgICAgICAgICAgdmFyIG9mZnNldCA9IG5vZGVTaXplKjAuMjU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNbMF1bMF0gPD0geCtvZmZzZXQgJiYgeC1vZmZzZXQgPD0gc1sxXVswXVxuICAgICAgICAgICAgICAgICAgICAmJiBzWzBdWzFdIDw9IHkrb2Zmc2V0ICYmIHktb2Zmc2V0IDw9IHNbMV1bMV07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBJZiB0aGUgYnJ1c2ggaXMgZW1wdHksIHNlbGVjdCBhbGwgY2lyY2xlcy5cbiAgICAgICAgZnVuY3Rpb24gYnJ1c2hlbmQoKSB7XG4gICAgICAgICAgICBpZiAoIWQzLmV2ZW50LnNlbGVjdGlvbikgcmV0dXJuO1xuICAgICAgICAgICAgYnJ1c2gubW92ZShicnVzaENvbnRhaW5lciwgbnVsbCk7XG5cbiAgICAgICAgICAgIHZhciBzZWxlY3RlZE5vZGVzID0gc2VsZi5nZXRTZWxlY3RlZE5vZGVzKCk7XG4gICAgICAgICAgICBpZihzZWxlY3RlZE5vZGVzICYmIHNlbGVjdGVkTm9kZXMubGVuZ3RoID09PSAxKXtcbiAgICAgICAgICAgICAgICBzZWxmLnNlbGVjdE5vZGUoc2VsZWN0ZWROb2Rlc1swXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBpZiAoIWQzLmV2ZW50LnNlbGVjdGlvbikgc2VsZi5tYWluR3JvdXAuc2VsZWN0QWxsKFwiLnNlbGVjdGVkXCIpLmNsYXNzZWQoJ3NlbGVjdGVkJywgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGlzYWJsZUJydXNoKCl7XG4gICAgICAgIGlmKCF0aGlzLmJydXNoRGlzYWJsZWQpe1xuICAgICAgICAgICAgQXBwVXRpbHMuZ3Jvd2woaTE4bi50KCdncm93bC5icnVzaERpc2FibGVkJyksICdpbmZvJywgJ2xlZnQnKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuYnJ1c2hEaXNhYmxlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuYnJ1c2hDb250YWluZXIucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgZW5hYmxlQnJ1c2goKXtcbiAgICAgICAgaWYodGhpcy5icnVzaERpc2FibGVkKXtcbiAgICAgICAgICAgIEFwcFV0aWxzLmdyb3dsKGkxOG4udCgnZ3Jvd2wuYnJ1c2hFbmFibGVkJyksICdpbmZvJywgJ2xlZnQnKVxuICAgICAgICAgICAgdGhpcy5pbml0QnJ1c2goKTtcbiAgICAgICAgICAgIHRoaXMuYnJ1c2hEaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICB9XG5cblxuICAgIH1cblxuICAgIGdldE1haW5Hcm91cFRyYW5zbGF0aW9uKGludmVydCkge1xuICAgICAgICB2YXIgdHJhbnNsYXRpb24gPSBBcHBVdGlscy5nZXRUcmFuc2xhdGlvbih0aGlzLm1haW5Hcm91cC5hdHRyKFwidHJhbnNmb3JtXCIpKTtcbiAgICAgICAgaWYoaW52ZXJ0KXtcbiAgICAgICAgICAgIHRyYW5zbGF0aW9uWzBdID0gLXRyYW5zbGF0aW9uWzBdO1xuICAgICAgICAgICAgdHJhbnNsYXRpb25bMV0gPSAtdHJhbnNsYXRpb25bMV1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJhbnNsYXRpb247XG4gICAgfVxuXG4gICAgaW5pdE5vZGVDb250ZXh0TWVudSgpIHtcbiAgICAgICAgdGhpcy5ub2RlQ29udGV4dE1lbnUgPSBuZXcgTm9kZUNvbnRleHRNZW51KHRoaXMsIHRoaXMuY29uZmlnLm9wZXJhdGlvbnNGb3JPYmplY3QpO1xuICAgIH1cblxuICAgIGluaXRFZGdlQ29udGV4dE1lbnUoKSB7XG4gICAgICAgIHRoaXMuZWRnZUNvbnRleHRNZW51ID0gbmV3IEVkZ2VDb250ZXh0TWVudSh0aGlzKTtcbiAgICB9XG5cbiAgICBpbml0VGV4dENvbnRleHRNZW51KCkge1xuICAgICAgICB0aGlzLnRleHRDb250ZXh0TWVudSA9IG5ldyBUZXh0Q29udGV4dE1lbnUodGhpcyk7XG4gICAgfVxuXG5cblxuICAgIGluaXRNYWluQ29udGV4dE1lbnUoKSB7XG4gICAgICAgIHRoaXMubWFpbkNvbnRleHRNZW51ID0gbmV3IE1haW5Db250ZXh0TWVudSh0aGlzKTtcbiAgICAgICAgdGhpcy5zdmcub24oJ2NvbnRleHRtZW51Jyx0aGlzLm1haW5Db250ZXh0TWVudSk7XG4gICAgICAgIHRoaXMuc3ZnLm9uKCdkYmxjbGljaycsdGhpcy5tYWluQ29udGV4dE1lbnUpO1xuICAgIH1cblxuICAgIGFkZFRleHQodGV4dCl7XG4gICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoKTtcbiAgICAgICAgdGhpcy5kYXRhLmFkZFRleHQodGV4dCk7XG4gICAgICAgIHRoaXMucmVkcmF3KCk7XG4gICAgICAgIHRoaXMuc2VsZWN0VGV4dCh0ZXh0KTtcbiAgICB9XG5cbiAgICBhZGROb2RlKG5vZGUsIHBhcmVudCwgcmVkcmF3PWZhbHNlKXtcbiAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSgpO1xuICAgICAgICB0aGlzLmRhdGEuYWRkTm9kZShub2RlLCBwYXJlbnQpO1xuICAgICAgICB0aGlzLnJlZHJhdyh0cnVlKTtcbiAgICAgICAgdGhpcy5sYXlvdXQudXBkYXRlKG5vZGUpO1xuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG5cbiAgICBhZGREZWNpc2lvbk5vZGUocGFyZW50KXtcbiAgICAgICAgdmFyIG5ld05vZGUgPSBuZXcgbW9kZWwuRGVjaXNpb25Ob2RlKHRoaXMubGF5b3V0LmdldE5ld0NoaWxkTG9jYXRpb24ocGFyZW50KSk7XG4gICAgICAgIHRoaXMuYWRkTm9kZShuZXdOb2RlLCBwYXJlbnQpXG4gICAgfVxuICAgIGFkZENoYW5jZU5vZGUocGFyZW50KXtcbiAgICAgICAgdmFyIG5ld05vZGUgPSBuZXcgbW9kZWwuQ2hhbmNlTm9kZSh0aGlzLmxheW91dC5nZXROZXdDaGlsZExvY2F0aW9uKHBhcmVudCkpO1xuICAgICAgICB0aGlzLmFkZE5vZGUobmV3Tm9kZSwgcGFyZW50KVxuICAgIH1cbiAgICBhZGRUZXJtaW5hbE5vZGUocGFyZW50KXtcbiAgICAgICAgdmFyIG5ld05vZGUgPSBuZXcgbW9kZWwuVGVybWluYWxOb2RlKHRoaXMubGF5b3V0LmdldE5ld0NoaWxkTG9jYXRpb24ocGFyZW50KSk7XG4gICAgICAgIHRoaXMuYWRkTm9kZShuZXdOb2RlLCBwYXJlbnQpXG4gICAgfVxuXG4gICAgaW5qZWN0Tm9kZShub2RlLCBlZGdlKXtcbiAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSgpO1xuICAgICAgICB0aGlzLmRhdGEuaW5qZWN0Tm9kZShub2RlLCBlZGdlKTtcbiAgICAgICAgdGhpcy5yZWRyYXcoKTtcbiAgICAgICAgdGhpcy5sYXlvdXQudXBkYXRlKG5vZGUpO1xuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG5cbiAgICBpbmplY3REZWNpc2lvbk5vZGUoZWRnZSl7XG4gICAgICAgIHZhciBuZXdOb2RlID0gbmV3IG1vZGVsLkRlY2lzaW9uTm9kZSh0aGlzLmxheW91dC5nZXRJbmplY3RlZE5vZGVMb2NhdGlvbihlZGdlKSk7XG4gICAgICAgIHRoaXMuaW5qZWN0Tm9kZShuZXdOb2RlLCBlZGdlKTtcblxuICAgIH1cblxuICAgIGluamVjdENoYW5jZU5vZGUoZWRnZSl7XG4gICAgICAgIHZhciBuZXdOb2RlID0gbmV3IG1vZGVsLkNoYW5jZU5vZGUodGhpcy5sYXlvdXQuZ2V0SW5qZWN0ZWROb2RlTG9jYXRpb24oZWRnZSkpO1xuICAgICAgICB0aGlzLmluamVjdE5vZGUobmV3Tm9kZSwgZWRnZSk7XG4gICAgfVxuXG4gICAgcmVtb3ZlTm9kZShub2RlKSB7XG4gICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoKTtcbiAgICAgICAgdGhpcy5kYXRhLnJlbW92ZU5vZGUobm9kZSk7XG5cblxuICAgICAgICBpZighdGhpcy5sYXlvdXQuaXNNYW51YWxMYXlvdXQoKSl7XG4gICAgICAgICAgICB0aGlzLmxheW91dC51cGRhdGUoKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLnJlZHJhdygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVtb3ZlU2VsZWN0ZWROb2RlcygpIHtcbiAgICAgICAgdmFyIHNlbGVjdGVkTm9kZXMgPSB0aGlzLmdldFNlbGVjdGVkTm9kZXMoKTtcbiAgICAgICAgaWYoIXNlbGVjdGVkTm9kZXMubGVuZ3RoKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKCk7XG4gICAgICAgIHRoaXMuZGF0YS5yZW1vdmVOb2RlcyhzZWxlY3RlZE5vZGVzKTtcbiAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICB0aGlzLnJlZHJhdygpO1xuICAgICAgICB0aGlzLmxheW91dC51cGRhdGUoKTtcbiAgICB9XG5cbiAgICByZW1vdmVTZWxlY3RlZFRleHRzKCl7XG4gICAgICAgIHZhciBzZWxlY3RlZFRleHRzID0gdGhpcy5nZXRTZWxlY3RlZFRleHRzKCk7XG5cbiAgICAgICAgaWYoIXNlbGVjdGVkVGV4dHMubGVuZ3RoKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKCk7XG4gICAgICAgIHRoaXMuZGF0YS5yZW1vdmVUZXh0cyhzZWxlY3RlZFRleHRzKTtcbiAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICB0aGlzLnJlZHJhdygpO1xuICAgIH1cblxuICAgIGNvcHlOb2RlKGQsIG5vdENsZWFyUHJldlNlbGVjdGlvbikge1xuICAgICAgICB2YXIgY2xvbmUgPSB0aGlzLmRhdGEuY2xvbmVTdWJ0cmVlKGQpO1xuICAgICAgICBpZihub3RDbGVhclByZXZTZWxlY3Rpb24pe1xuICAgICAgICAgICAgaWYoIXRoaXMuY29waWVkTm9kZXMpe1xuICAgICAgICAgICAgICAgIHRoaXMuY29waWVkTm9kZXM9W107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNvcGllZE5vZGVzLnB1c2goY2xvbmUpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMuY29waWVkTm9kZXMgPSBbY2xvbmVdO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBjdXROb2RlKGQpIHtcbiAgICAgICAgdGhpcy5jb3B5Tm9kZShkKTtcbiAgICAgICAgdGhpcy5yZW1vdmVOb2RlKGQpO1xuICAgIH1cblxuICAgIGN1dFNlbGVjdGVkTm9kZXMoKXtcbiAgICAgICAgdmFyIHNlbGVjdGVkTm9kZXMgPSB0aGlzLmdldFNlbGVjdGVkTm9kZXMoKTtcbiAgICAgICAgdmFyIHNlbGVjdGVkUm9vdHMgPSB0aGlzLmRhdGEuZmluZFN1YnRyZWVSb290cyhzZWxlY3RlZE5vZGVzKTtcbiAgICAgICAgdGhpcy5jb3B5Tm9kZXMoc2VsZWN0ZWRSb290cyk7XG4gICAgICAgIHRoaXMucmVtb3ZlU2VsZWN0ZWROb2RlcygpO1xuICAgIH1cblxuICAgIGNvcHlTZWxlY3RlZE5vZGVzKCkge1xuICAgICAgICB2YXIgc2VsZjtcbiAgICAgICAgdmFyIHNlbGVjdGVkTm9kZXMgPSB0aGlzLmdldFNlbGVjdGVkTm9kZXMoKTtcblxuICAgICAgICB2YXIgc2VsZWN0ZWRSb290cyA9IHRoaXMuZGF0YS5maW5kU3VidHJlZVJvb3RzKHNlbGVjdGVkTm9kZXMpO1xuICAgICAgICB0aGlzLmNvcHlOb2RlcyhzZWxlY3RlZFJvb3RzKTtcblxuXG4gICAgfVxuXG4gICAgY29weU5vZGVzKG5vZGVzKXtcbiAgICAgICAgdGhpcy5jb3BpZWROb2RlcyA9IG5vZGVzLm1hcChkPT50aGlzLmRhdGEuY2xvbmVTdWJ0cmVlKGQpKTtcbiAgICB9XG5cblxuXG4gICAgcGFzdGVUb05vZGUobm9kZSkge1xuICAgICAgICBpZighdGhpcy5jb3BpZWROb2RlcyB8fCAhdGhpcy5jb3BpZWROb2Rlcy5sZW5ndGgpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoKTtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBzZWxmLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgIHZhciBub2Rlc1RvQXR0YWNoID0gdGhpcy5jb3BpZWROb2RlcztcbiAgICAgICAgc2VsZi5jb3B5Tm9kZXModGhpcy5jb3BpZWROb2Rlcyk7XG4gICAgICAgIG5vZGVzVG9BdHRhY2guZm9yRWFjaCh0b0F0dGFjaD0+e1xuICAgICAgICAgICAgdmFyIGF0dGFjaGVkID0gdGhpcy5kYXRhLmF0dGFjaFN1YnRyZWUodG9BdHRhY2gsIG5vZGUpLmNoaWxkTm9kZTtcbiAgICAgICAgICAgIGlmKGF0dGFjaGVkLmZvbGRlZCl7XG4gICAgICAgICAgICAgICAgc2VsZi5mb2xkU3VidHJlZShhdHRhY2hlZCwgYXR0YWNoZWQuZm9sZGVkLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbG9jYXRpb24gPSBzZWxmLmxheW91dC5nZXROZXdDaGlsZExvY2F0aW9uKG5vZGUpO1xuICAgICAgICAgICAgYXR0YWNoZWQubW92ZVRvKGxvY2F0aW9uLngsIGxvY2F0aW9uLnksIHRydWUpO1xuICAgICAgICAgICAgc2VsZi5sYXlvdXQubW92ZU5vZGVUb0VtcHR5UGxhY2UoYXR0YWNoZWQsIGZhbHNlKTtcbiAgICAgICAgICAgIHNlbGYubGF5b3V0LmZpdE5vZGVzSW5QbG90dGluZ1JlZ2lvbih0aGlzLmRhdGEuZ2V0QWxsRGVzY2VuZGFudE5vZGVzKGF0dGFjaGVkKSk7XG5cbiAgICAgICAgICAgIHNlbGYuc2VsZWN0U3ViVHJlZShhdHRhY2hlZCwgZmFsc2UsIG5vZGVzVG9BdHRhY2gubGVuZ3RoPjEpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZihub2RlLmZvbGRlZCl7XG4gICAgICAgICAgICBzZWxmLmZvbGRTdWJ0cmVlKG5vZGUsIG5vZGUuZm9sZGVkLCBmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBzZWxmLnJlZHJhdygpO1xuICAgICAgICAgICAgc2VsZi5sYXlvdXQudXBkYXRlKCk7XG4gICAgICAgIH0sMTApXG5cbiAgICB9XG5cbiAgICBwYXN0ZVRvTmV3TG9jYXRpb24ocG9pbnQpIHtcbiAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSgpO1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHNlbGYuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgdmFyIG5vZGVzVG9BdHRhY2ggPSB0aGlzLmNvcGllZE5vZGVzO1xuICAgICAgICBzZWxmLmNvcHlOb2Rlcyh0aGlzLmNvcGllZE5vZGVzKTtcbiAgICAgICAgbm9kZXNUb0F0dGFjaC5mb3JFYWNoKHRvQXR0YWNoPT4ge1xuICAgICAgICAgICAgdmFyIGF0dGFjaGVkID0gdGhpcy5kYXRhLmF0dGFjaFN1YnRyZWUodG9BdHRhY2gpO1xuICAgICAgICAgICAgaWYoYXR0YWNoZWQuZm9sZGVkKXtcbiAgICAgICAgICAgICAgICBzZWxmLmZvbGRTdWJ0cmVlKGF0dGFjaGVkLCBhdHRhY2hlZC5mb2xkZWQsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGF0dGFjaGVkLm1vdmVUbyhwb2ludC54LCBwb2ludC55LCB0cnVlKTtcbiAgICAgICAgICAgIHNlbGYubGF5b3V0Lm1vdmVOb2RlVG9FbXB0eVBsYWNlKGF0dGFjaGVkLCBmYWxzZSk7XG4gICAgICAgICAgICBzZWxmLmxheW91dC5maXROb2Rlc0luUGxvdHRpbmdSZWdpb24odGhpcy5kYXRhLmdldEFsbERlc2NlbmRhbnROb2RlcyhhdHRhY2hlZCkpO1xuXG4gICAgICAgICAgICBzZWxmLnNlbGVjdFN1YlRyZWUoYXR0YWNoZWQsIGZhbHNlLCBub2Rlc1RvQXR0YWNoLmxlbmd0aD4xKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgc2VsZi5yZWRyYXcoKTtcbiAgICAgICAgICAgIHNlbGYubGF5b3V0LnVwZGF0ZSgpO1xuICAgICAgICB9LDEwKVxuXG4gICAgfVxuXG4gICAgY29udmVydE5vZGUobm9kZSwgdHlwZVRvQ29udmVydFRvKXtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKCk7XG4gICAgICAgIHRoaXMuZGF0YS5jb252ZXJ0Tm9kZShub2RlLCB0eXBlVG9Db252ZXJ0VG8pO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBzZWxmLnJlZHJhdyh0cnVlKTtcbiAgICAgICAgfSwxMClcbiAgICB9XG5cbiAgICBwZXJmb3JtT3BlcmF0aW9uKG9iamVjdCwgb3BlcmF0aW9uKXtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKCk7XG4gICAgICAgIG9wZXJhdGlvbi5wZXJmb3JtKG9iamVjdCk7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHNlbGYucmVkcmF3KCk7XG4gICAgICAgICAgICBzZWxmLmxheW91dC51cGRhdGUoKTtcbiAgICAgICAgfSwxMClcbiAgICB9XG5cbiAgICBmb2xkU3VidHJlZShub2RlLCBmb2xkID0gdHJ1ZSwgcmVkcmF3PXRydWUpe1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIG5vZGUuZm9sZGVkID0gZm9sZDtcblxuICAgICAgICB0aGlzLmRhdGEuZ2V0QWxsRGVzY2VuZGFudE5vZGVzKG5vZGUpLmZvckVhY2gobj0+e1xuICAgICAgICAgICAgbi4kaGlkZGVuID0gZm9sZDtcbiAgICAgICAgICAgIG4uZm9sZGVkID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmRhdGEuZ2V0QWxsRGVzY2VuZGFudEVkZ2VzKG5vZGUpLmZvckVhY2goZT0+ZS4kaGlkZGVuID0gZm9sZCk7XG5cbiAgICAgICAgaWYoIXJlZHJhdyl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgc2VsZi5yZWRyYXcoKTtcbiAgICAgICAgICAgIHNlbGYubGF5b3V0LnVwZGF0ZSgpO1xuICAgICAgICB9LDEwKVxuICAgIH1cblxuICAgIHVwZGF0ZVZpc2liaWxpdHkobm9kZSA9IG51bGwpe1xuICAgICAgICBpZighbm9kZSl7XG4gICAgICAgICAgICB0aGlzLmRhdGEuZ2V0Um9vdHMoKS5mb3JFYWNoKG49PnRoaXMudXBkYXRlVmlzaWJpbGl0eShuKSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZihub2RlLmZvbGRlZCl7XG4gICAgICAgICAgICB0aGlzLmZvbGRTdWJ0cmVlKG5vZGUsIHRydWUsIGZhbHNlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIG5vZGUuY2hpbGRFZGdlcy5mb3JFYWNoKGUgPT4gdGhpcy51cGRhdGVWaXNpYmlsaXR5KGUuY2hpbGROb2RlKSk7XG5cbiAgICB9XG5cbiAgICBtb3ZlTm9kZVRvKHgseSl7XG5cbiAgICB9XG5cbiAgICB1cGRhdGVOb2RlUG9zaXRpb24obm9kZSkge1xuICAgICAgICB0aGlzLmdldE5vZGVEM1NlbGVjdGlvbihub2RlKS5yYWlzZSgpLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJytub2RlLmxvY2F0aW9uLngrJyAnK25vZGUubG9jYXRpb24ueSsnKScpO1xuICAgIH1cblxuICAgIHVwZGF0ZVRleHRQb3NpdGlvbih0ZXh0KSB7XG4gICAgICAgIHRoaXMuZ2V0VGV4dEQzU2VsZWN0aW9uKHRleHQpLnJhaXNlKCkuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnK3RleHQubG9jYXRpb24ueCsnICcrdGV4dC5sb2NhdGlvbi55KycpJyk7XG4gICAgfVxuXG4gICAgZ2V0Tm9kZUQzU2VsZWN0aW9uKG5vZGUpe1xuICAgICAgICByZXR1cm4gdGhpcy5nZXROb2RlRDNTZWxlY3Rpb25CeUlkKG5vZGUuJGlkKTtcbiAgICB9XG5cbiAgICBnZXROb2RlRDNTZWxlY3Rpb25CeUlkKGlkKXtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFpbkdyb3VwLnNlbGVjdCgnI25vZGUtJytpZCk7XG4gICAgfVxuICAgIGdldFRleHREM1NlbGVjdGlvbih0ZXh0KXtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VGV4dEQzU2VsZWN0aW9uQnlJZCh0ZXh0LiRpZCk7XG4gICAgfVxuICAgIGdldFRleHREM1NlbGVjdGlvbkJ5SWQoaWQpe1xuICAgICAgICByZXR1cm4gdGhpcy5tYWluR3JvdXAuc2VsZWN0KCcjdGV4dC0nK2lkKTtcbiAgICB9XG5cbiAgICBnZXRTZWxlY3RlZE5vZGVzKHZpc2libGVPbmx5ID0gZmFsc2UpIHtcbiAgICAgICAgbGV0IHNlbGVjdGVkVmlzaWJsZSA9IHRoaXMubWFpbkdyb3VwLnNlbGVjdEFsbChcIi5ub2RlLnNlbGVjdGVkXCIpLmRhdGEoKTtcbiAgICAgICAgaWYodmlzaWJsZU9ubHkpe1xuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdGVkVmlzaWJsZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBhbGxTZWxlY3RlZCAgPSBbXTtcbiAgICAgICAgYWxsU2VsZWN0ZWQucHVzaCguLi5zZWxlY3RlZFZpc2libGUpO1xuXG4gICAgICAgIHNlbGVjdGVkVmlzaWJsZS5mb3JFYWNoKG49PntcbiAgICAgICAgICAgIGlmKG4uZm9sZGVkKXtcbiAgICAgICAgICAgICAgICBsZXQgZGVzY2VuZGFudHMgPSB0aGlzLmRhdGEuZ2V0QWxsRGVzY2VuZGFudE5vZGVzKG4pO1xuICAgICAgICAgICAgICAgIGlmKGRlc2NlbmRhbnRzKXtcbiAgICAgICAgICAgICAgICAgICAgYWxsU2VsZWN0ZWQucHVzaCguLi5kZXNjZW5kYW50cyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gYWxsU2VsZWN0ZWQ7XG4gICAgfVxuXG4gICAgZ2V0U2VsZWN0ZWRUZXh0cygpe1xuICAgICAgICByZXR1cm4gdGhpcy5tYWluR3JvdXAuc2VsZWN0QWxsKFwiLmZsb2F0aW5nLXRleHQuc2VsZWN0ZWRcIikuZGF0YSgpO1xuICAgIH1cblxuICAgIGNsZWFyU2VsZWN0aW9uKCl7XG4gICAgICAgIHRoaXMubWFpbkdyb3VwLnNlbGVjdEFsbChcIi5lZGdlLnNlbGVjdGVkXCIpLnNlbGVjdCgncGF0aCcpLmF0dHIoXCJtYXJrZXItZW5kXCIsIGQgPT4gXCJ1cmwoI2Fycm93XCIrKHRoaXMuaXNPcHRpbWFsKGQpPyctb3B0aW1hbCc6JycpK1wiKVwiKVxuICAgICAgICB0aGlzLm1haW5Hcm91cC5zZWxlY3RBbGwoXCIuc2VsZWN0ZWRcIikuY2xhc3NlZCgnc2VsZWN0ZWQnLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuY29uZmlnLm9uU2VsZWN0aW9uQ2xlYXJlZCgpO1xuICAgIH1cblxuICAgIHNlbGVjdEVkZ2UoZWRnZSwgY2xlYXJTZWxlY3Rpb25CZWZvcmVTZWxlY3Qpe1xuICAgICAgICBpZihjbGVhclNlbGVjdGlvbkJlZm9yZVNlbGVjdCl7XG4gICAgICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb25maWcub25FZGdlU2VsZWN0ZWQoZWRnZSk7XG4gICAgICAgIHRoaXMubWFpbkdyb3VwLnNlbGVjdCgnI2VkZ2UtJytlZGdlLiRpZClcbiAgICAgICAgICAgIC5jbGFzc2VkKCdzZWxlY3RlZCcsIHRydWUpXG4gICAgICAgICAgICAuc2VsZWN0KCdwYXRoJylcbiAgICAgICAgICAgIC5hdHRyKFwibWFya2VyLWVuZFwiLCBkID0+IFwidXJsKCNhcnJvdy1zZWxlY3RlZClcIilcbiAgICB9XG5cbiAgICBpc05vZGVTZWxlY3RlZChub2RlKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Tm9kZUQzU2VsZWN0aW9uKG5vZGUpLmNsYXNzZWQoJ3NlbGVjdGVkJyk7XG4gICAgfVxuXG4gICAgc2VsZWN0Tm9kZShub2RlLCBjbGVhclNlbGVjdGlvbkJlZm9yZVNlbGVjdCwgc2tpcENhbGxiYWNrKXtcbiAgICAgICAgaWYoY2xlYXJTZWxlY3Rpb25CZWZvcmVTZWxlY3Qpe1xuICAgICAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIXNraXBDYWxsYmFjayl7XG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5vbk5vZGVTZWxlY3RlZChub2RlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZ2V0Tm9kZUQzU2VsZWN0aW9uQnlJZChub2RlLiRpZCkuY2xhc3NlZCgnc2VsZWN0ZWQnLCB0cnVlKTtcbiAgICB9XG5cbiAgICBzZWxlY3RUZXh0KHRleHQsIGNsZWFyU2VsZWN0aW9uQmVmb3JlU2VsZWN0LCBza2lwQ2FsbGJhY2spe1xuICAgICAgICBpZihjbGVhclNlbGVjdGlvbkJlZm9yZVNlbGVjdCl7XG4gICAgICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZighc2tpcENhbGxiYWNrKXtcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLm9uVGV4dFNlbGVjdGVkKHRleHQpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmdldFRleHREM1NlbGVjdGlvbkJ5SWQodGV4dC4kaWQpLmNsYXNzZWQoJ3NlbGVjdGVkJywgdHJ1ZSk7XG4gICAgfVxuXG4gICAgc2VsZWN0U3ViVHJlZShub2RlLCBjbGVhclNlbGVjdGlvbkJlZm9yZVNlbGVjdCxza2lwQ2FsbGJhY2spIHtcbiAgICAgICAgaWYoY2xlYXJTZWxlY3Rpb25CZWZvcmVTZWxlY3Qpe1xuICAgICAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2VsZWN0Tm9kZShub2RlLCBmYWxzZSwgc2tpcENhbGxiYWNrKTtcbiAgICAgICAgbm9kZS5jaGlsZEVkZ2VzLmZvckVhY2goZT0+dGhpcy5zZWxlY3RTdWJUcmVlKGUuY2hpbGROb2RlLCBmYWxzZSwgdHJ1ZSkpO1xuICAgIH1cblxuICAgIHNlbGVjdEFsbE5vZGVzKCkge1xuICAgICAgICB0aGlzLm1haW5Hcm91cC5zZWxlY3RBbGwoXCIubm9kZVwiKS5jbGFzc2VkKCdzZWxlY3RlZCcsIHRydWUpO1xuICAgIH1cblxuICAgIGF1dG9MYXlvdXQodHlwZSwgd2l0aG91dFN0YXRlU2F2aW5nKXtcbiAgICAgICAgdGhpcy5sYXlvdXQuYXV0b0xheW91dCh0eXBlLCB3aXRob3V0U3RhdGVTYXZpbmcpO1xuICAgIH1cblxuICAgIHVwZGF0ZURpYWdyYW1UaXRsZSh0aXRsZVZhbHVlKXtcbiAgICAgICAgaWYoIXRpdGxlVmFsdWUpe1xuICAgICAgICAgICAgdGl0bGVWYWx1ZSA9ICcnO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGlhZ3JhbVRpdGxlID0gdGl0bGVWYWx1ZTtcbiAgICAgICAgdGhpcy5yZWRyYXdEaWFncmFtVGl0bGUoKTtcbiAgICAgICAgdGhpcy5yZWRyYXdEaWFncmFtRGVzY3JpcHRpb24oKTtcbiAgICAgICAgdGhpcy51cGRhdGVNYXJnaW4odHJ1ZSk7XG4gICAgfVxuXG4gICAgcmVkcmF3RGlhZ3JhbVRpdGxlKCl7XG4gICAgICAgIHZhciBzdmdXaWR0aCA9IHRoaXMuc3ZnLmF0dHIoJ3dpZHRoJyk7XG4gICAgICAgIHZhciBzdmdIZWlnaHQgPSB0aGlzLnN2Zy5hdHRyKCdoZWlnaHQnKTtcbiAgICAgICAgdGhpcy50aXRsZUNvbnRhaW5lciA9IHRoaXMuc3ZnLnNlbGVjdE9yQXBwZW5kKCdnLnNkLXRpdGxlLWNvbnRhaW5lcicpO1xuXG4gICAgICAgIHZhciB0aXRsZSA9IHRoaXMudGl0bGVDb250YWluZXIuc2VsZWN0T3JBcHBlbmQoJ3RleHQuc2QtdGl0bGUnKTtcbiAgICAgICAgdGl0bGUudGV4dCh0aGlzLmRpYWdyYW1UaXRsZSk7XG4gICAgICAgIExheW91dC5zZXRIYW5naW5nUG9zaXRpb24odGl0bGUpO1xuXG4gICAgICAgIHZhciBtYXJnaW5Ub3AgPSBwYXJzZUludCh0aGlzLmNvbmZpZy50aXRsZS5tYXJnaW4udG9wKTtcbiAgICAgICAgdGhpcy50aXRsZUNvbnRhaW5lci5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcrKHN2Z1dpZHRoLzIpKycsJysoIG1hcmdpblRvcCkrJyknKTtcbiAgICB9XG4gICAgcmVkcmF3RGlhZ3JhbURlc2NyaXB0aW9uKCl7XG4gICAgICAgIHZhciBzdmdXaWR0aCA9IHRoaXMuc3ZnLmF0dHIoJ3dpZHRoJyk7XG4gICAgICAgIHZhciBzdmdIZWlnaHQgPSB0aGlzLnN2Zy5hdHRyKCdoZWlnaHQnKTtcbiAgICAgICAgdGhpcy50aXRsZUNvbnRhaW5lciA9IHRoaXMuc3ZnLnNlbGVjdE9yQXBwZW5kKCdnLnNkLXRpdGxlLWNvbnRhaW5lcicpO1xuXG4gICAgICAgIHZhciBkZXNjID0gdGhpcy50aXRsZUNvbnRhaW5lci5zZWxlY3RPckFwcGVuZCgndGV4dC5zZC1kZXNjcmlwdGlvbicpO1xuXG4gICAgICAgIGlmKCF0aGlzLmNvbmZpZy5kZXNjcmlwdGlvbi5zaG93KXtcbiAgICAgICAgICAgIGRlc2MucmVtb3ZlKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbGluZXMgPSB0aGlzLmRpYWdyYW1EZXNjcmlwdGlvbiA/IHRoaXMuZGlhZ3JhbURlc2NyaXB0aW9uLnNwbGl0KCdcXG4nKSA6IFtdO1xuICAgICAgICB2YXIgdHNwYW5zID0gZGVzYy5zZWxlY3RBbGwoJ3RzcGFuJykuZGF0YShsaW5lcyk7XG4gICAgICAgIHRzcGFucy5lbnRlcigpLmFwcGVuZCgndHNwYW4nKVxuICAgICAgICAgICAgLm1lcmdlKHRzcGFucylcbiAgICAgICAgICAgIC5odG1sKGw9PkFwcFV0aWxzLnJlcGxhY2VVcmxzKEFwcFV0aWxzLmVzY2FwZUh0bWwobCkpKVxuICAgICAgICAgICAgLmF0dHIoJ2R5JywgKGQsaSk9Pmk+MCA/ICcxLjFlbSc6IHVuZGVmaW5lZClcbiAgICAgICAgICAgIC5hdHRyKCd4JywgJzAnKTtcblxuICAgICAgICB0c3BhbnMuZXhpdCgpLnJlbW92ZSgpO1xuICAgICAgICBMYXlvdXQuc2V0SGFuZ2luZ1Bvc2l0aW9uKGRlc2MpO1xuXG4gICAgICAgIHZhciB0aXRsZSA9IHRoaXMudGl0bGVDb250YWluZXIuc2VsZWN0T3JBcHBlbmQoJ3RleHQuc2QtdGl0bGUnKTtcblxuICAgICAgICB2YXIgbWFyZ2luVG9wID0gMDtcbiAgICAgICAgaWYodGhpcy5kaWFncmFtVGl0bGUpe1xuICAgICAgICAgICAgbWFyZ2luVG9wICs9IHRpdGxlLm5vZGUoKS5nZXRCQm94KCkuaGVpZ2h0O1xuICAgICAgICAgICAgbWFyZ2luVG9wKz0gTWF0aC5tYXgocGFyc2VJbnQodGhpcy5jb25maWcuZGVzY3JpcHRpb24ubWFyZ2luLnRvcCksIDApO1xuICAgICAgICB9XG5cblxuICAgICAgICBkZXNjLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoMCwnKyggbWFyZ2luVG9wKSsnKScpO1xuICAgIH1cblxuICAgIHVwZGF0ZURpYWdyYW1EZXNjcmlwdGlvbihkZXNjcmlwdGlvblZhbHVlKXtcbiAgICAgICAgaWYoIWRlc2NyaXB0aW9uVmFsdWUpe1xuICAgICAgICAgICAgZGVzY3JpcHRpb25WYWx1ZSA9ICcnO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGlhZ3JhbURlc2NyaXB0aW9uID0gZGVzY3JpcHRpb25WYWx1ZTtcbiAgICAgICAgdGhpcy5yZWRyYXdEaWFncmFtVGl0bGUoKTtcbiAgICAgICAgdGhpcy5yZWRyYXdEaWFncmFtRGVzY3JpcHRpb24oKTtcbiAgICAgICAgdGhpcy51cGRhdGVNYXJnaW4odHJ1ZSk7XG4gICAgfVxuXG5cbiAgICBnZXRUaXRsZUdyb3VwSGVpZ2h0KHdpdGhNYXJnaW5zKXtcbiAgICAgICAgaWYoIXRoaXMudGl0bGVDb250YWluZXIpe1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGggPSB0aGlzLnRpdGxlQ29udGFpbmVyLm5vZGUoKS5nZXRCQm94KCkuaGVpZ2h0O1xuICAgICAgICBpZih3aXRoTWFyZ2lucyl7XG4gICAgICAgICAgICBoKz0gcGFyc2VJbnQodGhpcy5jb25maWcudGl0bGUubWFyZ2luLmJvdHRvbSk7XG4gICAgICAgICAgICBoKz0gcGFyc2VJbnQodGhpcy5jb25maWcudGl0bGUubWFyZ2luLnRvcCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGg7XG4gICAgfVxuXG59XG4iLCJleHBvcnQgKiBmcm9tICcuL3NyYy9pbmRleCdcbiJdfQ==
