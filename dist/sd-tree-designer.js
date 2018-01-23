require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AppUtils = undefined;

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _d = require("./d3");

var d3 = _interopRequireWildcard(_d);

var _templates = require("./templates");

var _i18n = require("./i18n/i18n");

var _sdUtils = require("sd-utils");

function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};if (obj != null) {
            for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
            }
        }newObj.default = obj;return newObj;
    }
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var AppUtils = function () {
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
            var ellipsisLength = 9;
            //ellipsis is needed
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
            var g = document.createElementNS("http://www.w3.org/2000/svg", "g");

            // Set the transform attribute to the provided string value.
            g.setAttributeNS(null, "transform", transform);

            // consolidate the SVGTransformList containing all transformations
            // to a single SVGTransform of type SVG_TRANSFORM_MATRIX and get
            // its SVGMatrix.
            var matrix = g.transform.baseVal.consolidate().matrix;

            // As per definition values e and f are the ones for the translation.
            return [matrix.e, matrix.f];
        }
    }, {
        key: "closestPoint",
        value: function closestPoint(pathNode, point) {
            var pathLength = pathNode.getTotalLength(),
                precision = 8,
                best,
                bestLength,
                bestDistance = Infinity;

            // linear scan for coarse approximation
            for (var scan, scanLength = 0, scanDistance; scanLength <= pathLength; scanLength += precision) {
                if ((scanDistance = distance2(scan = pathNode.getPointAtLength(scanLength))) < bestDistance) {
                    best = scan, bestLength = scanLength, bestDistance = scanDistance;
                }
            }

            // binary search for precise estimate
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

            var html = _templates.Templates.get('growl', { message: message, type: type });

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
                event = new CustomEvent(name, { 'detail': data });
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
                error = { name: error };
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
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ContextMenu = undefined;

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _d = require('../d3');

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};if (obj != null) {
            for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
            }
        }newObj.default = obj;return newObj;
    }
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

/*based on:
 * github.com/patorjk/d3-context-menu */

var ContextMenu = exports.ContextMenu = function () {
    function ContextMenu(menu, opts) {
        _classCallCheck(this, ContextMenu);

        var self = this;

        if (typeof opts === 'function') {
            self.openCallback = opts;
        } else {
            opts = opts || {};
            self.openCallback = opts.onOpen;
            self.closeCallback = opts.onClose;
        }

        // create the div element that will hold the context menu
        d3.selectAll('.d3-context-menu').data([1]).enter().append('div').attr('class', 'd3-context-menu');

        // close menu
        d3.select('body').on('click.d3-context-menu', function () {
            d3.select('.d3-context-menu').style('display', 'none');
            if (self.closeCallback) {
                self.closeCallback();
            }
        });

        // this gets executed when a contextmenu event occurs
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
            });

            // the openCallback allows an action to fire before the menu is displayed
            // an example usage would be closing a tooltip
            if (self.openCallback) {
                if (self.openCallback(data, index) === false) {
                    return;
                }
            }

            // display context menu
            d3.select('.d3-context-menu').style('left', d3.event.pageX - 2 + 'px').style('top', d3.event.pageY - 2 + 'px').style('display', 'block');

            d3.event.preventDefault();
            d3.event.stopPropagation();
        };
    }

    _createClass(ContextMenu, null, [{
        key: 'hide',
        value: function hide() {
            d3.select('.d3-context-menu').style('display', 'none');
        }
    }]);

    return ContextMenu;
}();

},{"../d3":8}],3:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EdgeContextMenu = undefined;

var _contextMenu = require('./context-menu');

var _i18n = require('../i18n/i18n');

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var EdgeContextMenu = exports.EdgeContextMenu = function (_ContextMenu) {
    _inherits(EdgeContextMenu, _ContextMenu);

    function EdgeContextMenu(treeDesigner) {
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

        var _this = _possibleConstructorReturn(this, (EdgeContextMenu.__proto__ || Object.getPrototypeOf(EdgeContextMenu)).call(this, menu));

        _this.treeDesigner = treeDesigner;
        return _this;
    }

    return EdgeContextMenu;
}(_contextMenu.ContextMenu);

},{"../i18n/i18n":12,"./context-menu":2}],4:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MainContextMenu = undefined;

var _contextMenu = require('./context-menu');

var _sdModel = require('sd-model');

var _d = require('../d3');

var d3 = _interopRequireWildcard(_d);

var _i18n = require('../i18n/i18n');

function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};if (obj != null) {
            for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
            }
        }newObj.default = obj;return newObj;
    }
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var MainContextMenu = exports.MainContextMenu = function (_ContextMenu) {
    _inherits(MainContextMenu, _ContextMenu);

    function MainContextMenu(treeDesigner) {
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
            menu.push({ divider: true });
            menu.push({
                title: _i18n.i18n.t('contextMenu.main.addText'),
                action: function action(elm, d, i) {
                    var newText = new _sdModel.domain.Text(mousePosition);
                    treeDesigner.addText(newText);
                }

            });
            menu.push({ divider: true });
            menu.push({
                title: _i18n.i18n.t('contextMenu.main.paste'),
                action: function action(elm, d, i) {
                    treeDesigner.pasteToNewLocation(mousePosition);
                },
                disabled: !treeDesigner.copiedNodes || !treeDesigner.copiedNodes.length

            });
            menu.push({ divider: true });

            menu.push({
                title: _i18n.i18n.t('contextMenu.main.selectAllNodes'),
                action: function action(elm, d, i) {
                    treeDesigner.selectAllNodes();
                }
            });
            return menu;
        };

        var _this = _possibleConstructorReturn(this, (MainContextMenu.__proto__ || Object.getPrototypeOf(MainContextMenu)).call(this, menu, { onOpen: function onOpen() {
                treeDesigner.clearSelection();
                mousePosition = new _sdModel.domain.Point(d3.mouse(treeDesigner.svg.node())).move(treeDesigner.getMainGroupTranslation(true));
            } }));

        _this.treeDesigner = treeDesigner;
        return _this;
    }

    return MainContextMenu;
}(_contextMenu.ContextMenu);

},{"../d3":8,"../i18n/i18n":12,"./context-menu":2,"sd-model":"sd-model"}],5:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NodeContextMenu = undefined;

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _contextMenu = require('./context-menu');

var _sdModel = require('sd-model');

var _i18n = require('../i18n/i18n');

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var NodeContextMenu = exports.NodeContextMenu = function (_ContextMenu) {
    _inherits(NodeContextMenu, _ContextMenu);

    function NodeContextMenu(treeDesigner, operationsForObject) {
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
                menu.push({ divider: true });
            }

            menu.push(copyMenuItem);
            menu.push(cutMenuItem);
            menu.push(pasteMenuItem);
            menu.push(deleteMenuItem);

            NodeContextMenu.addNodeConversionOptions(d, menu, treeDesigner);
            menu.push({ divider: true });
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
                    menu.push({ divider: true });
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

        var _this = _possibleConstructorReturn(this, (NodeContextMenu.__proto__ || Object.getPrototypeOf(NodeContextMenu)).call(this, menu));

        _this.treeDesigner = treeDesigner;
        return _this;
    }

    _createClass(NodeContextMenu, null, [{
        key: 'addNodeConversionOptions',
        value: function addNodeConversionOptions(d, menu, treeDesigner) {
            var conversionOptions = NodeContextMenu.getNodeConversionOptions(d, treeDesigner);
            if (conversionOptions.length) {
                menu.push({ divider: true });
                conversionOptions.forEach(function (o) {
                    return menu.push(o);
                });
            }
        }
    }, {
        key: 'getNodeConversionOptions',
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
        key: 'getNodeConversionOption',
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

},{"../i18n/i18n":12,"./context-menu":2,"sd-model":"sd-model"}],6:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TextContextMenu = undefined;

var _contextMenu = require('./context-menu');

var _i18n = require('../i18n/i18n');

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var TextContextMenu = exports.TextContextMenu = function (_ContextMenu) {
    _inherits(TextContextMenu, _ContextMenu);

    function TextContextMenu(treeDesigner) {
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

        var _this = _possibleConstructorReturn(this, (TextContextMenu.__proto__ || Object.getPrototypeOf(TextContextMenu)).call(this, menu));

        _this.treeDesigner = treeDesigner;
        return _this;
    }

    return TextContextMenu;
}(_contextMenu.ContextMenu);

},{"../i18n/i18n":12,"./context-menu":2}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.D3Extensions = undefined;

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _d = require("./d3");

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};if (obj != null) {
            for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
            }
        }newObj.default = obj;return newObj;
    }
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var D3Extensions = exports.D3Extensions = function () {
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

},{"./d3":8}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _d3Dispatch = require('d3-dispatch');

Object.keys(_d3Dispatch).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _d3Dispatch[key];
    }
  });
});

var _d3Scale = require('d3-scale');

Object.keys(_d3Scale).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _d3Scale[key];
    }
  });
});

var _d3Selection = require('d3-selection');

Object.keys(_d3Selection).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _d3Selection[key];
    }
  });
});

var _d3Shape = require('d3-shape');

Object.keys(_d3Shape).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _d3Shape[key];
    }
  });
});

var _d3Drag = require('d3-drag');

Object.keys(_d3Drag).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _d3Drag[key];
    }
  });
});

var _d3Brush = require('d3-brush');

Object.keys(_d3Brush).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _d3Brush[key];
    }
  });
});

var _d3Array = require('d3-array');

Object.keys(_d3Array).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _d3Array[key];
    }
  });
});

var _d3Hierarchy = require('d3-hierarchy');

Object.keys(_d3Hierarchy).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _d3Hierarchy[key];
    }
  });
});

var _d3TimeFormat = require('d3-time-format');

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
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.i18n = undefined;

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _i18next = require('i18next');

var _i18next2 = _interopRequireDefault(_i18next);

var _en = require('./en.json');

var en = _interopRequireWildcard(_en);

var _pl = require('./pl.json');

var pl = _interopRequireWildcard(_pl);

var _it = require('./it.json');

var it = _interopRequireWildcard(_it);

var _de = require('./de.json');

var de = _interopRequireWildcard(_de);

var _fr = require('./fr.json');

var fr = _interopRequireWildcard(_fr);

function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};if (obj != null) {
            for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
            }
        }newObj.default = obj;return newObj;
    }
}

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var i18n = exports.i18n = function () {
    function i18n() {
        _classCallCheck(this, i18n);
    }

    _createClass(i18n, null, [{
        key: 'init',
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
            i18n.$instance = _i18next2.default.createInstance({
                lng: lng,
                fallbackLng: 'en',
                resources: resources
            }, function (err, t) {});
        }
    }, {
        key: 't',
        value: function t(key, opt) {
            return i18n.$instance.t(key, opt);
        }
    }]);

    return i18n;
}();

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
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.d3 = undefined;

var _treeDesigner = require('./tree-designer');

Object.keys(_treeDesigner).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _treeDesigner[key];
    }
  });
});

var _appUtils = require('./app-utils');

Object.keys(_appUtils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _appUtils[key];
    }
  });
});

var _templates = require('./templates');

Object.keys(_templates).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _templates[key];
    }
  });
});

var _tooltip = require('./tooltip');

Object.keys(_tooltip).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _tooltip[key];
    }
  });
});

var _d3Extensions = require('./d3-extensions');

Object.keys(_d3Extensions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _d3Extensions[key];
    }
  });
});

var _d = require('./d3');

Object.defineProperty(exports, 'd3', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_d).default;
  }
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

_d3Extensions.D3Extensions.extend();

},{"./app-utils":1,"./d3":8,"./d3-extensions":7,"./templates":20,"./tooltip":23,"./tree-designer":24}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Layout = undefined;

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _sdUtils = require('sd-utils');

var _sdModel = require('sd-model');

var _d = require('./d3');

var d3 = _interopRequireWildcard(_d);

var _circle = require('./symbols/circle');

var _circle2 = _interopRequireDefault(_circle);

var _triangle = require('./symbols/triangle');

var _triangle2 = _interopRequireDefault(_triangle);

var _appUtils = require('./app-utils');

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};if (obj != null) {
            for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
            }
        }newObj.default = obj;return newObj;
    }
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

/*Tree layout manager*/
var Layout = exports.Layout = function () {
    function Layout(treeDesigner, data, config) {
        _classCallCheck(this, Layout);

        this.nodeTypeToSymbol = {
            'decision': d3.symbolSquare,
            'chance': _circle2.default,
            "terminal": _triangle2.default
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
        key: 'update',
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
        key: 'isManualLayout',
        value: function isManualLayout() {
            return this.config.type === Layout.MANUAL_LAYOUT_NAME;
        }
    }, {
        key: 'getNewChildLocation',
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
        key: 'getInjectedNodeLocation',
        value: function getInjectedNodeLocation(edge) {

            var p = edge.$linePoints[2];

            return new _sdModel.domain.Point(p[0], p[1]);
        }
    }, {
        key: 'moveNodeToEmptyPlace',
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
        key: 'disableAutoLayout',
        value: function disableAutoLayout() {
            this.config.type = Layout.MANUAL_LAYOUT_NAME;
            this._fireOnAutoLayoutChangedCallbacks();
        }
    }, {
        key: 'drawNodeSymbol',
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
        key: 'nodeLabelPosition',
        value: function nodeLabelPosition(selection) {
            return selection.attr('x', 0).attr('y', -this.config.nodeSize / 2 - 7);
        }
    }, {
        key: 'nodePayoffPosition',
        value: function nodePayoffPosition(selection) {
            return Layout.setHangingPosition(selection).attr('x', 0).attr('y', this.config.nodeSize / 2 + 7).attr('text-anchor', 'middle');
        }
    }, {
        key: 'nodeAggregatedPayoffPosition',
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
            return selection;
            // .attr('text-anchor', 'middle')
            // .attr('dominant-baseline', 'hanging')
        }
    }, {
        key: 'nodeProbabilityToEnterPosition',
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
            });
            // .attr('text-anchor', 'middle')
            // .attr('dominant-baseline', 'central')
        }
    }, {
        key: 'nodeIndicatorPosition',
        value: function nodeIndicatorPosition(selection) {
            return selection.attr('x', this.config.nodeSize / 2 + 8).attr('y', -this.config.nodeSize / 2).attr('dominant-baseline', 'central').attr('text-anchor', 'middle');
        }
    }, {
        key: 'nodeUnfoldButtonPosition',
        value: function nodeUnfoldButtonPosition(selection) {

            return selection.attr('x', this.config.nodeSize / 2 + 5).attr('y', 0).attr('dominant-baseline', 'central');
        }
    }, {
        key: 'edgeLineD',
        value: function edgeLineD(edge) {
            var line = d3.line().x(function (d) {
                return d[0];
            }).y(function (d) {
                return d[1];
            });
            // .curve(d3.curveCatmullRom.alpha(0.5));


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
            var point4 = [childNode.location.x - sign * Math.max(0, Math.min(this.config.nodeSize / 2 + 8, dX / 2)), childNode.location.y];
            // var point2 = [parentNode.location.x+dX/2-slantWidth/2, parentNode.location.y];
            // var point3 = [childNode.location.x-(dX/2-slantWidth/2), childNode.location.y];

            edge.$linePoints = [point1, point2, point3, point4];
            return line(edge.$linePoints);
        }
    }, {
        key: 'edgePayoffPosition',
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
        key: 'edgeLabelPosition',
        value: function edgeLabelPosition(selection) {
            return selection.attr('transform', function (d) {
                return 'translate(' + (d.$linePoints[2][0] + 2) + ',' + (d.$linePoints[2][1] - 7) + ')';
            });
            // .attr('x', d=>d.$linePoints[2][0] + 2)
            // .attr('y', d=>d.$linePoints[2][1] - 7)
        }
    }, {
        key: 'edgeProbabilityPosition',
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
        key: 'getMinMarginBetweenNodes',
        value: function getMinMarginBetweenNodes() {
            return this.config.nodeSize + 30;
        }
    }, {
        key: 'getNodeMinX',
        value: function getNodeMinX(d) {
            var self = this;
            if (d && d.$parent) {
                // && !self.isNodeSelected(d.$parent)
                return d.$parent.location.x + self.getMinMarginBetweenNodes();
            }
            return self.config.nodeSize / 2;
        }
    }, {
        key: 'getNodeMinY',
        value: function getNodeMinY(d) {
            return this.config.nodeSize / 2;
        }
    }, {
        key: 'getNodeMaxX',
        value: function getNodeMaxX(d) {
            var self = this;

            if (d && d.childEdges.length) {
                return d3.min(d.childEdges, function (e) {
                    return !e.childNode.$hidden ? e.childNode.location.x : 9999999;
                }) - self.getMinMarginBetweenNodes();
            }
            return 9999999;
        }
    }, {
        key: 'setGridWidth',
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
        key: 'setGridHeight',
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
        key: 'setNodeSize',
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
        key: 'setEdgeSlantWidthMax',
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
        key: 'autoLayout',
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
                });

                // root.sort((a,b)=>self.nodeTypeOrder[a.data.type]-self.nodeTypeOrder[b.data.type]);
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
            });

            // this.transition = true;
            this.treeDesigner.redraw(true);
            // this.transition = false;

            this._fireOnAutoLayoutChangedCallbacks();
            return this;
        }
    }, {
        key: 'fitNodesInPlottingRegion',
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
        key: 'moveNodes',
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
        key: '_fireOnAutoLayoutChangedCallbacks',
        value: function _fireOnAutoLayoutChangedCallbacks() {
            var _this = this;

            this.onAutoLayoutChanged.forEach(function (c) {
                return c(_this.config.type);
            });
        }
    }], [{
        key: 'backupNodeLocation',
        value: function backupNodeLocation(node) {
            node.$location = new _sdModel.domain.Point(node.location);
        }
    }, {
        key: 'setHangingPosition',
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

Layout.MANUAL_LAYOUT_NAME = 'manual';

},{"./app-utils":1,"./d3":8,"./symbols/circle":18,"./symbols/triangle":19,"sd-model":"sd-model","sd-utils":"sd-utils"}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NodeDragHandler = undefined;

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _appUtils = require('./app-utils');

var _d = require('./d3');

var d3 = _interopRequireWildcard(_d);

var _contextMenu = require('./context-menu/context-menu');

function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};if (obj != null) {
            for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
            }
        }newObj.default = obj;return newObj;
    }
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var NodeDragHandler = exports.NodeDragHandler = function () {
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
        key: 'dragStarted',
        value: function dragStarted(d, self) {
            if (self.ignoreDrag) {
                self.ignoreDrag = false;
                self.ignoredDrag = true;
                return;
            }
            self.ignoredDrag = false;

            // self.treeDesigner.layout.disableAutoLayout();
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
        key: 'onDrag',
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
        key: 'dragEnded',
        value: function dragEnded(draggedNode, self) {
            var node = d3.select(this).classed("dragging", false);
            if (self.ignoredDrag) {
                return;
            }
            self.treeDesigner.layout.update(draggedNode);
        }
    }, {
        key: 'cancelDrag',
        value: function cancelDrag() {
            this.ignoreDrag = true;
        }
    }]);

    return NodeDragHandler;
}();

},{"./app-utils":1,"./context-menu/context-menu":2,"./d3":8}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var epsilon = 1e-12;
var pi = Math.PI;
var halfPi = pi / 2;
var tau = 2 * pi;

exports.default = {
    /*draw: function(context, size) {
        var r = Math.sqrt(size / pi);
        context.moveTo(r, 0);
        context.arc(0, 0, r, 0, tau);
    }*/
    draw: function draw(context, size) {

        var r = Math.sqrt(size / pi);
        var dist = 0.552284749831 * r;

        context.moveTo(-r, 0);
        // context.lineTo(2*r, 2*r)
        // context.bezierCurveTo(-r, -dist, -dist, -r, 0,-r);
        context.bezierCurveTo(-r, -dist, -dist, -r, 0, -r);

        context.bezierCurveTo(dist, -r, r, -dist, r, 0);

        context.bezierCurveTo(r, dist, dist, r, 0, r);

        context.bezierCurveTo(-dist, r, -r, dist, -r, 0);
    }
};

},{}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var sqrt3 = Math.sqrt(3);

exports.default = {
    draw: function draw(context, size) {
        var r = Math.sqrt(size / Math.PI);
        context.moveTo(-r, 0);
        context.lineTo(0.9 * r, -r);
        context.lineTo(0.9 * r, r);
        context.closePath();
    }
};

},{}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Templates = undefined;

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _sdUtils = require('sd-utils');

var _i18n = require('./i18n/i18n');

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var Templates = exports.Templates = function () {
    function Templates() {
        _classCallCheck(this, Templates);
    }

    _createClass(Templates, null, [{
        key: 'get',
        value: function get(templateName, variables) {
            var compiled = _sdUtils.Utils.template(Templates[templateName], { 'imports': { 'i18n': _i18n.i18n, 'Templates': Templates, 'include': function include(n, v) {
                        return Templates.get(n, v);
                    } } });
            if (variables) {
                variables.variables = variables;
            } else {
                variables = { variables: {} };
            }
            return compiled(variables);
        }
    }, {
        key: 'styleRule',
        value: function styleRule(selector, props) {
            var s = selector + '{';
            props.forEach(function (p) {
                return s += Templates.styleProp(p[0], p[1]);
            });
            s += '} ';
            return s;
        }
    }, {
        key: 'styleProp',
        value: function styleProp(styleName, variableName) {
            return styleName + ': <%= ' + variableName + ' %>; ';
        }
    }, {
        key: 'nodeSelector',
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
        key: 'edgeSelector',
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

Templates.growl = require('./templates/growl_message.html');
Templates.treeDesignerSelector = 'svg.sd-tree-designer';
Templates.treeDesignerStyles = Templates.styleRule(Templates.treeDesignerSelector, [['font-size', 'fontSize'], ['font-family', 'fontFamily'], ['font-weight', 'fontWeight'], ['font-style', 'fontStyle']]) +
//   node
Templates.styleRule(Templates.nodeSelector() + ' path', [['fill', 'node.fill'], ['stroke-width', 'node.strokeWidth']]) + Templates.styleRule(Templates.nodeSelector('decision', 'optimal') + ' path, ' + Templates.nodeSelector('chance', 'optimal') + ' path,' + Templates.nodeSelector('terminal', 'optimal') + ' path', [['stroke', 'node.optimal.stroke'], ['stroke-width', 'node.optimal.strokeWidth']]) + Templates.styleRule(Templates.nodeSelector() + ' .label', [['font-size', 'node.label.fontSize'], ['fill', 'node.label.color']]) + Templates.styleRule(Templates.nodeSelector() + ' .payoff', [['font-size', 'node.payoff.fontSize'], ['fill', 'node.payoff.color']]) + Templates.styleRule(Templates.nodeSelector() + ' .payoff.negative', [['fill', 'node.payoff.negativeColor']]) +

//    decision node
Templates.styleRule(Templates.nodeSelector('decision') + ' path', [['fill', 'node.decision.fill'], ['stroke', 'node.decision.stroke']]) + Templates.styleRule(Templates.nodeSelector('decision', 'selected') + ' path', [['fill', 'node.decision.selected.fill']]) +

//    chance node
Templates.styleRule(Templates.nodeSelector('chance') + ' path', [['fill', 'node.chance.fill'], ['stroke', 'node.chance.stroke']]) + Templates.styleRule(Templates.nodeSelector('chance', 'selected') + ' path', [['fill', 'node.chance.selected.fill']]) +

//    terminal node
Templates.styleRule(Templates.nodeSelector('terminal') + ' path', [['fill', 'node.terminal.fill'], ['stroke', 'node.terminal.stroke']]) + Templates.styleRule(Templates.nodeSelector('terminal', 'selected') + ' path', [['fill', 'node.terminal.selected.fill']]) + Templates.styleRule(Templates.nodeSelector('terminal') + ' .aggregated-payoff', [['font-size', 'node.terminal.payoff.fontSize'], ['fill', 'node.terminal.payoff.color']]) + Templates.styleRule(Templates.nodeSelector('terminal') + ' .aggregated-payoff.negative', [['fill', 'node.terminal.payoff.negativeColor']]) +

//probability
Templates.styleRule(Templates.treeDesignerSelector + ' .node .probability-to-enter, ' + Templates.treeDesignerSelector + ' .edge .probability', [['font-size', 'probability.fontSize'], ['fill', 'probability.color']]) +

//edge
Templates.styleRule(Templates.edgeSelector() + ' path', [['stroke', 'edge.stroke'], ['stroke-width', 'edge.strokeWidth']]) + Templates.styleRule(Templates.treeDesignerSelector + ' marker#arrow path', [['fill', 'edge.stroke']]) + Templates.styleRule(Templates.edgeSelector('optimal') + ' path', [['stroke', 'edge.optimal.stroke'], ['stroke-width', 'edge.optimal.strokeWidth']]) + Templates.styleRule(Templates.treeDesignerSelector + ' marker#arrow-optimal path', [['fill', 'edge.optimal.stroke']]) + Templates.styleRule(Templates.edgeSelector('selected') + ' path', [['stroke', 'edge.selected.stroke'], ['stroke-width', 'edge.selected.strokeWidth']]) + Templates.styleRule(Templates.treeDesignerSelector + ' marker#arrow-selected path', [['fill', 'edge.selected.stroke']]) + Templates.styleRule(Templates.edgeSelector() + ' .label', [['font-size', 'edge.label.fontSize'], ['fill', 'edge.label.color']]) + Templates.styleRule(Templates.edgeSelector() + ' .payoff', [['font-size', 'edge.payoff.fontSize'], ['fill', 'edge.payoff.color']]) + Templates.styleRule(Templates.edgeSelector() + ' .payoff.negative', [['fill', 'edge.payoff.negativeColor']]) + Templates.styleRule(Templates.treeDesignerSelector + ' .sd-title-container text.sd-title', [['font-size', 'title.fontSize'], ['font-weight', 'title.fontWeight'], ['font-style', 'title.fontStyle'], ['fill', 'title.color']]) + Templates.styleRule(Templates.treeDesignerSelector + ' .sd-title-container text.sd-description', [['font-size', 'description.fontSize'], ['font-weight', 'description.fontWeight'], ['font-style', 'description.fontStyle'], ['fill', 'description.color']]);

},{"./i18n/i18n":12,"./templates/growl_message.html":21,"sd-utils":"sd-utils"}],21:[function(require,module,exports){
module.exports = "module.exports = \"<div class=\\\"sd-growl-message <%=type%>\\\">\\n    <div class=\\\"sd-growl-message-text\\\">\\n        <%= message %>\\n    </div>\\n</div>\\n\";\n";

},{}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TextDragHandler = undefined;

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _appUtils = require('./app-utils');

var _d = require('./d3');

var d3 = _interopRequireWildcard(_d);

var _contextMenu = require('./context-menu/context-menu');

function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};if (obj != null) {
            for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
            }
        }newObj.default = obj;return newObj;
    }
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var TextDragHandler = exports.TextDragHandler = function () {
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
        key: 'dragStarted',
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
        key: 'onDrag',
        value: function onDrag(draggedText, self) {
            if (self.dragEventCount == 2) {
                self.data.saveState();
            }
            self.dragEventCount++;

            var dx = d3.event.x - self.prevDragEvent.x;
            var dy = d3.event.y - self.prevDragEvent.y;

            draggedText.location.move(dx, dy);
            self.treeDesigner.updateTextPosition(draggedText);

            self.prevDragEvent = d3.event;
            self.treeDesigner.updatePlottingRegionSize();
        }
    }, {
        key: 'dragEnded',
        value: function dragEnded(draggedNode, self) {
            d3.select(this).classed("dragging", false);
        }
    }]);

    return TextDragHandler;
}();

},{"./app-utils":1,"./context-menu/context-menu":2,"./d3":8}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Tooltip = undefined;

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _d = require('./d3');

var d3 = _interopRequireWildcard(_d);

var _sdUtils = require('sd-utils');

function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};if (obj != null) {
            for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
            }
        }newObj.default = obj;return newObj;
    }
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var Tooltip = exports.Tooltip = function () {
    function Tooltip() {
        _classCallCheck(this, Tooltip);
    }

    _createClass(Tooltip, null, [{
        key: 'getContainer',
        value: function getContainer() {
            return d3.select("body").selectOrAppend('div.sd-tooltip');
        }
    }, {
        key: 'show',
        value: function show(html) {
            var xOffset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
            var yOffset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 28;
            var event = arguments[3];
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
        key: 'updatePosition',
        value: function updatePosition() {
            var xOffset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;
            var yOffset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 28;
            var event = arguments[2];

            event = event || d3.event;
            Tooltip.getContainer().style("left", event.pageX + xOffset + "px").style("top", event.pageY - yOffset + "px");
        }
    }, {
        key: 'hide',
        value: function hide() {
            var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 500;

            var t = Tooltip.getContainer();
            if (duration) {
                t = t.transition().duration(duration);
            }
            t.style("opacity", 0);
        }
    }, {
        key: 'attach',
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

},{"./d3":8,"sd-utils":"sd-utils"}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TreeDesigner = exports.TreeDesignerConfig = undefined;

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _d = require("./d3");

var d3 = _interopRequireWildcard(_d);

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

var _hammerjs = require("hammerjs");

var Hammer = _interopRequireWildcard(_hammerjs);

var _i18n = require("./i18n/i18n");

function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};if (obj != null) {
            for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
            }
        }newObj.default = obj;return newObj;
    }
}

function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
            arr2[i] = arr[i];
        }return arr2;
    } else {
        return Array.from(arr);
    }
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var TreeDesignerConfig = exports.TreeDesignerConfig = function TreeDesignerConfig(custom) {
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
                fill: '#aa3333'
                // stroke: '#666600'
            }
        },
        chance: {
            fill: '#ffff44',
            stroke: '#666600',

            selected: {
                fill: '#aaaa00'
                // stroke: '#666600'
            }
        },
        terminal: {
            fill: '#44ff44',
            stroke: 'black',
            selected: {
                fill: '#00aa00'
                // stroke: 'black'
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

var TreeDesigner = exports.TreeDesigner = function () {
    function TreeDesigner(container, dataModel, config) {
        _classCallCheck(this, TreeDesigner);

        this.setConfig(config);
        this.data = dataModel;
        this.initContainer(container);
        this.init();
    } //data model manager


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

            var mc = new Hammer.Manager(this.svg.node(), { touchAction: 'auto' });
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
            var newSvgWidth = mainGroupBox.width + mainGroupBox.x + margin.left + margin.right;
            this.container.classed('with-overflow-x', newSvgWidth >= this.availableWidth);
            newSvgWidth = Math.max(newSvgWidth, this.availableWidth);
            if (svgWidth != newSvgWidth) {
                changed = true;
                this.svg.attr('width', newSvgWidth);
            }
            var newSvgHeight = mainGroupBox.height + mainGroupBox.y + this.topMargin + margin.bottom;

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
            payoffTspansM
            // .attr('dominant-baseline', 'hanging')
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
                    return _i18n.i18n.t('tooltip.' + object + '.' + payoffFiledName + '.named', { value: d.payoff, number: i + 1, name: self.config.payoffNames[i] });
                }
                return _i18n.i18n.t('tooltip.' + object + '.' + payoffFiledName + '.default', { value: d.payoff, number: self.config.maxPayoffsToDisplay < 2 ? '' : i + 1 });
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
            })
            // .attr("stroke", "black")
            // .attr("stroke-width", 2)
            .attr("fill", "none").attr("marker-end", function (d) {
                var suffix = d3.select(this.parentNode).classed('selected') ? '-selected' : self.isOptimal(d) ? '-optimal' : '';
                return "url(#arrow" + suffix + ")";
            });
            // .attr("shape-rendering", "optimizeQuality")


            edgesMerge.on('click', function (d) {
                self.selectEdge(d, true);
            });

            this.layout.edgeLabelPosition(labelEnter);
            edgesMergeT.select('text.label').each(this.updateTextLines);
            var labelMerge = edgesMerge.select('g.label-group');
            labelMerge.classed('sd-hidden', this.config.hideLabels);
            var labelMergeT = edgesMergeT.select('g.label-group');
            this.layout.edgeLabelPosition(labelMergeT);
            // .text(d=>d.name);

            var payoff = edgesMerge.select('text.payoff');

            var payoffTspans = payoff.selectAll('tspan').data(function (d) {
                var item = d.displayValue('payoff');
                return _sdUtils.Utils.isArray(item) ? item.slice(0, Math.min(item.length, self.config.maxPayoffsToDisplay)).map(function (_) {
                    return d;
                }) : [d];
            });
            payoffTspans.exit().remove();

            var payoffTspansM = payoffTspans.enter().append('tspan').merge(payoffTspans);
            payoffTspansM
            // .attr('dominant-baseline', 'hanging')
            .attr('dy', function (d, i) {
                return i > 0 ? '1.1em' : undefined;
            })
            // .attr('x', '0')

            // .attr('dominant-baseline', 'hanging')
            .classed('negative', function (d, i) {
                var val = d.displayPayoff(undefined, i);
                return val !== null && val < 0;
            }).classed('sd-hidden', this.config.hidePayoffs)
            // .text(d=> isNaN(d.payoff) ? d.payoff : self.config.payoffNumberFormatter(d.payoff))
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
                    return _i18n.i18n.t('tooltip.edge.payoff.named', { value: d.payoff[i], number: i + 1, name: self.config.payoffNames[i] });
                }
                return _i18n.i18n.t('tooltip.edge.payoff.default', { value: d.payoff[i], number: self.config.maxPayoffsToDisplay < 2 ? '' : i + 1 });
            });

            var payoffTextT = payoff;
            if (this.transition) {
                payoffTextT = payoff.transition();
            }
            this.layout.edgePayoffPosition(payoffEnter);
            this.layout.edgePayoffPosition(payoffTextT);

            _tooltip.Tooltip.attach(edgesMerge.select('text.probability'), function (d) {
                return _i18n.i18n.t('tooltip.edge.probability', { value: d.probability === undefined ? d.displayProbability() : d.probability });
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
            }

            // Highlight the selected nodes.
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
            }
            // If the brush is empty, select all circles.
            function brushend() {
                if (!d3.event.selection) return;
                brush.move(brushContainer, null);

                var selectedNodes = self.getSelectedNodes();
                if (selectedNodes && selectedNodes.length === 1) {
                    self.selectNode(selectedNodes[0]);
                }
                // if (!d3.event.selection) self.mainGroup.selectAll(".selected").classed('selected', false);
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

},{"./app-utils":1,"./context-menu/context-menu":2,"./context-menu/edge-context-menu":3,"./context-menu/main-context-menu":4,"./context-menu/node-context-menu":5,"./context-menu/text-context-menu":6,"./d3":8,"./i18n/i18n":12,"./layout":16,"./node-drag-handler":17,"./templates":20,"./text-drag-handler":22,"./tooltip":23,"hammerjs":"hammerjs","sd-model":"sd-model","sd-utils":"sd-utils"}],"sd-tree-designer":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('./src/index');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLXV0aWxzLmpzIiwic3JjL2NvbnRleHQtbWVudS9jb250ZXh0LW1lbnUuanMiLCJzcmMvY29udGV4dC1tZW51L2VkZ2UtY29udGV4dC1tZW51LmpzIiwic3JjL2NvbnRleHQtbWVudS9tYWluLWNvbnRleHQtbWVudS5qcyIsInNyYy9jb250ZXh0LW1lbnUvbm9kZS1jb250ZXh0LW1lbnUuanMiLCJzcmMvY29udGV4dC1tZW51L3RleHQtY29udGV4dC1tZW51LmpzIiwic3JjL2QzLWV4dGVuc2lvbnMuanMiLCJzcmMvZDMuanMiLCJzcmMvaTE4bi9kZS5qc29uIiwic3JjL2kxOG4vZW4uanNvbiIsInNyYy9pMThuL2ZyLmpzb24iLCJzcmMvaTE4bi9pMThuLmpzIiwic3JjL2kxOG4vaXQuanNvbiIsInNyYy9pMThuL3BsLmpzb24iLCJzcmMvaW5kZXguanMiLCJzcmMvbGF5b3V0LmpzIiwic3JjL25vZGUtZHJhZy1oYW5kbGVyLmpzIiwic3JjL3N5bWJvbHMvY2lyY2xlLmpzIiwic3JjL3N5bWJvbHMvdHJpYW5nbGUuanMiLCJzcmMvdGVtcGxhdGVzLmpzIiwic3JjL3RlbXBsYXRlcy9ncm93bF9tZXNzYWdlLmh0bWwiLCJzcmMvdGV4dC1kcmFnLWhhbmRsZXIuanMiLCJzcmMvdG9vbHRpcC5qcyIsInNyYy90cmVlLWRlc2lnbmVyLmpzIiwiaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBOztJLEFBQVk7O0FBQ1o7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0ksQUFFYTs7Ozs7O2FBa0JUOzs7OEMsQUFDNkIsVyxBQUFXLFksQUFBWSxPQUFPLEFBQ3ZEO2dCQUFJLFVBQVUsVUFBZCxBQUFjLEFBQVUsQUFDeEI7b0JBQUEsQUFBUSxjQUFSLEFBQXNCLEFBRXRCOztnQkFBSSxTQUFKLEFBQWEsQUFDYjtn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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEVBOzs7O0FBQ0E7O0ksQUFBWTs7QUFDWjs7SSxBQUFZOztBQUNaOztJLEFBQVk7O0FBQ1o7O0ksQUFBWTs7QUFDWjs7SSxBQUFZOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SSxBQUVDLGUs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QUcsQ0FBQyxLQUFKLEFBQVMsZ0JBQWUsQUFDcEI7dUJBQUEsQUFBTyxBQUNWO0FBQ0Q7Z0JBQUksSUFBSSxLQUFBLEFBQUssZUFBTCxBQUFvQixPQUFwQixBQUEyQixVQUFuQyxBQUE2QyxBQUM3QztnQkFBQSxBQUFHLGFBQVksQUFDWDtxQkFBSSxTQUFTLEtBQUEsQUFBSyxPQUFMLEFBQVksTUFBWixBQUFrQixPQUEvQixBQUFJLEFBQWtDLEFBQ3RDO3FCQUFJLFNBQVMsS0FBQSxBQUFLLE9BQUwsQUFBWSxNQUFaLEFBQWtCLE9BQS9CLEFBQUksQUFBa0MsQUFDekM7QUFDRDttQkFBQSxBQUFPLEFBQ1Y7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3NkNMLDJDQUFBO2lEQUFBOztnQkFBQTt3QkFBQTtvQkFBQTtBQUFBO0FBQUEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0ICogYXMgZDMgZnJvbSBcIi4vZDNcIjtcbmltcG9ydCB7VGVtcGxhdGVzfSBmcm9tIFwiLi90ZW1wbGF0ZXNcIjtcbmltcG9ydCB7aTE4bn0gZnJvbSBcIi4vaTE4bi9pMThuXCI7XG5pbXBvcnQge1V0aWxzfSBmcm9tIFwic2QtdXRpbHNcIjtcblxuZXhwb3J0IGNsYXNzIEFwcFV0aWxzIHtcblxuICAgIHN0YXRpYyBzYW5pdGl6ZUhlaWdodCA9IGZ1bmN0aW9uIChoZWlnaHQsIGNvbnRhaW5lcikge1xuICAgICAgICByZXR1cm4gKGhlaWdodCB8fCBwYXJzZUludChjb250YWluZXIuc3R5bGUoJ2hlaWdodCcpLCAxMCkgfHwgNDAwKTtcbiAgICB9O1xuXG4gICAgc3RhdGljIHNhbml0aXplV2lkdGggPSBmdW5jdGlvbiAod2lkdGgsIGNvbnRhaW5lcikge1xuICAgICAgICByZXR1cm4gKHdpZHRoIHx8IHBhcnNlSW50KGNvbnRhaW5lci5zdHlsZSgnd2lkdGgnKSwgMTApIHx8IDk2MCk7XG4gICAgfTtcblxuICAgIHN0YXRpYyBhdmFpbGFibGVIZWlnaHQgPSBmdW5jdGlvbiAoaGVpZ2h0LCBjb250YWluZXIsIG1hcmdpbikge1xuICAgICAgICByZXR1cm4gTWF0aC5tYXgoMCwgQXBwVXRpbHMuc2FuaXRpemVIZWlnaHQoaGVpZ2h0LCBjb250YWluZXIpIC0gbWFyZ2luLnRvcCAtIG1hcmdpbi5ib3R0b20pO1xuICAgIH07XG5cbiAgICBzdGF0aWMgYXZhaWxhYmxlV2lkdGggPSBmdW5jdGlvbiAod2lkdGgsIGNvbnRhaW5lciwgbWFyZ2luKSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1heCgwLCBBcHBVdGlscy5zYW5pdGl6ZVdpZHRoKHdpZHRoLCBjb250YWluZXIpIC0gbWFyZ2luLmxlZnQgLSBtYXJnaW4ucmlnaHQpO1xuICAgIH07XG5cbiAgICAvL3BsYWNlcyB0ZXh0U3RyaW5nIGluIHRleHRPYmosIGFkZHMgYW4gZWxsaXBzaXMgaWYgdGV4dCBjYW4ndCBmaXQgaW4gd2lkdGhcbiAgICBzdGF0aWMgcGxhY2VUZXh0V2l0aEVsbGlwc2lzKHRleHREM09iaiwgdGV4dFN0cmluZywgd2lkdGgpIHtcbiAgICAgICAgdmFyIHRleHRPYmogPSB0ZXh0RDNPYmoubm9kZSgpO1xuICAgICAgICB0ZXh0T2JqLnRleHRDb250ZW50ID0gdGV4dFN0cmluZztcblxuICAgICAgICB2YXIgbWFyZ2luID0gMDtcbiAgICAgICAgdmFyIGVsbGlwc2lzTGVuZ3RoID0gOTtcbiAgICAgICAgLy9lbGxpcHNpcyBpcyBuZWVkZWRcbiAgICAgICAgaWYgKHRleHRPYmouZ2V0Q29tcHV0ZWRUZXh0TGVuZ3RoKCkgPiB3aWR0aCArIG1hcmdpbikge1xuICAgICAgICAgICAgZm9yICh2YXIgeCA9IHRleHRTdHJpbmcubGVuZ3RoIC0gMzsgeCA+IDA7IHggLT0gMSkge1xuICAgICAgICAgICAgICAgIGlmICh0ZXh0T2JqLmdldFN1YlN0cmluZ0xlbmd0aCgwLCB4KSArIGVsbGlwc2lzTGVuZ3RoIDw9IHdpZHRoICsgbWFyZ2luKSB7XG4gICAgICAgICAgICAgICAgICAgIHRleHRPYmoudGV4dENvbnRlbnQgPSB0ZXh0U3RyaW5nLnN1YnN0cmluZygwLCB4KSArIFwiLi4uXCI7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRleHRPYmoudGV4dENvbnRlbnQgPSBcIi4uLlwiOyAvL2Nhbid0IHBsYWNlIGF0IGFsbFxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHN0YXRpYyBwbGFjZVRleHRXaXRoRWxsaXBzaXNBbmRUb29sdGlwKHRleHREM09iaiwgdGV4dFN0cmluZywgd2lkdGgsIHRvb2x0aXApIHtcbiAgICAgICAgdmFyIGVsbGlwc2lzUGxhY2VkID0gQXBwVXRpbHMucGxhY2VUZXh0V2l0aEVsbGlwc2lzKHRleHREM09iaiwgdGV4dFN0cmluZywgd2lkdGgpO1xuICAgICAgICBpZiAoZWxsaXBzaXNQbGFjZWQgJiYgdG9vbHRpcCkge1xuICAgICAgICAgICAgdGV4dEQzT2JqLm9uKFwibW91c2VvdmVyXCIsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgdG9vbHRpcC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgICAgICAgICAgLmR1cmF0aW9uKDIwMClcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCAuOSk7XG4gICAgICAgICAgICAgICAgdG9vbHRpcC5odG1sKHRleHRTdHJpbmcpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcImxlZnRcIiwgKGQzLmV2ZW50LnBhZ2VYICsgNSkgKyBcInB4XCIpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcInRvcFwiLCAoZDMuZXZlbnQucGFnZVkgLSAyOCkgKyBcInB4XCIpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRleHREM09iai5vbihcIm1vdXNlb3V0XCIsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgdG9vbHRpcC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgICAgICAgICAgLmR1cmF0aW9uKDUwMClcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCAwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0Rm9udFNpemUoZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZShcImZvbnQtc2l6ZVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0VHJhbnNsYXRpb24odHJhbnNmb3JtKSB7XG4gICAgICAgIC8vIENyZWF0ZSBhIGR1bW15IGcgZm9yIGNhbGN1bGF0aW9uIHB1cnBvc2VzIG9ubHkuIFRoaXMgd2lsbCBuZXZlclxuICAgICAgICAvLyBiZSBhcHBlbmRlZCB0byB0aGUgRE9NIGFuZCB3aWxsIGJlIGRpc2NhcmRlZCBvbmNlIHRoaXMgZnVuY3Rpb25cbiAgICAgICAgLy8gcmV0dXJucy5cbiAgICAgICAgdmFyIGcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcImdcIik7XG5cbiAgICAgICAgLy8gU2V0IHRoZSB0cmFuc2Zvcm0gYXR0cmlidXRlIHRvIHRoZSBwcm92aWRlZCBzdHJpbmcgdmFsdWUuXG4gICAgICAgIGcuc2V0QXR0cmlidXRlTlMobnVsbCwgXCJ0cmFuc2Zvcm1cIiwgdHJhbnNmb3JtKTtcblxuICAgICAgICAvLyBjb25zb2xpZGF0ZSB0aGUgU1ZHVHJhbnNmb3JtTGlzdCBjb250YWluaW5nIGFsbCB0cmFuc2Zvcm1hdGlvbnNcbiAgICAgICAgLy8gdG8gYSBzaW5nbGUgU1ZHVHJhbnNmb3JtIG9mIHR5cGUgU1ZHX1RSQU5TRk9STV9NQVRSSVggYW5kIGdldFxuICAgICAgICAvLyBpdHMgU1ZHTWF0cml4LlxuICAgICAgICB2YXIgbWF0cml4ID0gZy50cmFuc2Zvcm0uYmFzZVZhbC5jb25zb2xpZGF0ZSgpLm1hdHJpeDtcblxuICAgICAgICAvLyBBcyBwZXIgZGVmaW5pdGlvbiB2YWx1ZXMgZSBhbmQgZiBhcmUgdGhlIG9uZXMgZm9yIHRoZSB0cmFuc2xhdGlvbi5cbiAgICAgICAgcmV0dXJuIFttYXRyaXguZSwgbWF0cml4LmZdO1xuICAgIH1cblxuXG4gICAgc3RhdGljIGNsb3Nlc3RQb2ludChwYXRoTm9kZSwgcG9pbnQpIHtcbiAgICAgICAgdmFyIHBhdGhMZW5ndGggPSBwYXRoTm9kZS5nZXRUb3RhbExlbmd0aCgpLFxuICAgICAgICAgICAgcHJlY2lzaW9uID0gOCxcbiAgICAgICAgICAgIGJlc3QsXG4gICAgICAgICAgICBiZXN0TGVuZ3RoLFxuICAgICAgICAgICAgYmVzdERpc3RhbmNlID0gSW5maW5pdHk7XG5cbiAgICAgICAgLy8gbGluZWFyIHNjYW4gZm9yIGNvYXJzZSBhcHByb3hpbWF0aW9uXG4gICAgICAgIGZvciAodmFyIHNjYW4sIHNjYW5MZW5ndGggPSAwLCBzY2FuRGlzdGFuY2U7IHNjYW5MZW5ndGggPD0gcGF0aExlbmd0aDsgc2Nhbkxlbmd0aCArPSBwcmVjaXNpb24pIHtcbiAgICAgICAgICAgIGlmICgoc2NhbkRpc3RhbmNlID0gZGlzdGFuY2UyKHNjYW4gPSBwYXRoTm9kZS5nZXRQb2ludEF0TGVuZ3RoKHNjYW5MZW5ndGgpKSkgPCBiZXN0RGlzdGFuY2UpIHtcbiAgICAgICAgICAgICAgICBiZXN0ID0gc2NhbiwgYmVzdExlbmd0aCA9IHNjYW5MZW5ndGgsIGJlc3REaXN0YW5jZSA9IHNjYW5EaXN0YW5jZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGJpbmFyeSBzZWFyY2ggZm9yIHByZWNpc2UgZXN0aW1hdGVcbiAgICAgICAgcHJlY2lzaW9uIC89IDI7XG4gICAgICAgIHdoaWxlIChwcmVjaXNpb24gPiAwLjUpIHtcbiAgICAgICAgICAgIHZhciBiZWZvcmUsXG4gICAgICAgICAgICAgICAgYWZ0ZXIsXG4gICAgICAgICAgICAgICAgYmVmb3JlTGVuZ3RoLFxuICAgICAgICAgICAgICAgIGFmdGVyTGVuZ3RoLFxuICAgICAgICAgICAgICAgIGJlZm9yZURpc3RhbmNlLFxuICAgICAgICAgICAgICAgIGFmdGVyRGlzdGFuY2U7XG4gICAgICAgICAgICBpZiAoKGJlZm9yZUxlbmd0aCA9IGJlc3RMZW5ndGggLSBwcmVjaXNpb24pID49IDAgJiYgKGJlZm9yZURpc3RhbmNlID0gZGlzdGFuY2UyKGJlZm9yZSA9IHBhdGhOb2RlLmdldFBvaW50QXRMZW5ndGgoYmVmb3JlTGVuZ3RoKSkpIDwgYmVzdERpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgYmVzdCA9IGJlZm9yZSwgYmVzdExlbmd0aCA9IGJlZm9yZUxlbmd0aCwgYmVzdERpc3RhbmNlID0gYmVmb3JlRGlzdGFuY2U7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKChhZnRlckxlbmd0aCA9IGJlc3RMZW5ndGggKyBwcmVjaXNpb24pIDw9IHBhdGhMZW5ndGggJiYgKGFmdGVyRGlzdGFuY2UgPSBkaXN0YW5jZTIoYWZ0ZXIgPSBwYXRoTm9kZS5nZXRQb2ludEF0TGVuZ3RoKGFmdGVyTGVuZ3RoKSkpIDwgYmVzdERpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgYmVzdCA9IGFmdGVyLCBiZXN0TGVuZ3RoID0gYWZ0ZXJMZW5ndGgsIGJlc3REaXN0YW5jZSA9IGFmdGVyRGlzdGFuY2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHByZWNpc2lvbiAvPSAyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgYmVzdCA9IFtiZXN0LngsIGJlc3QueV07XG4gICAgICAgIGJlc3QuZGlzdGFuY2UgPSBNYXRoLnNxcnQoYmVzdERpc3RhbmNlKTtcbiAgICAgICAgcmV0dXJuIGJlc3Q7XG5cbiAgICAgICAgZnVuY3Rpb24gZGlzdGFuY2UyKHApIHtcbiAgICAgICAgICAgIHZhciBkeCA9IHAueCAtIHBvaW50WzBdLFxuICAgICAgICAgICAgICAgIGR5ID0gcC55IC0gcG9pbnRbMV07XG4gICAgICAgICAgICByZXR1cm4gZHggKiBkeCArIGR5ICogZHk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgZ3Jvd2wobWVzc2FnZSwgdHlwZT0naW5mbycsIHBvc2l0aW9uPSdyaWdodCcsIHRpbWUgPSAyMDAwKXtcbiAgICAgICAgdmFyIGh0bWwgPSBUZW1wbGF0ZXMuZ2V0KCdncm93bCcsIHttZXNzYWdlOm1lc3NhZ2UsIHR5cGU6dHlwZX0pXG5cbiAgICAgICAgdmFyIGcgPSBkMy5zZWxlY3QoJ2JvZHknKS5zZWxlY3RPckFwcGVuZCgnZGl2LnNkLWdyb3dsLWxpc3QuJytwb3NpdGlvbikuYXBwZW5kKCdkaXYnKS5odG1sKGh0bWwpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBnLnJlbW92ZSgpO1xuICAgICAgICB9LCB0aW1lKVxuICAgIH1cblxuXG4gICAgc3RhdGljIGNyZWF0ZUVsZW1lbnQodGFnLCBhdHRyaWJzLCBwYXJlbnQpIHtcbiAgICAgICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xuXG4gICAgICAgIGlmIChhdHRyaWJzKSB7XG4gICAgICAgICAgICBBcHBVdGlscy5kZWVwRXh0ZW5kKGVsLCBhdHRyaWJzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGFyZW50KSB7XG4gICAgICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoZWwpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbDtcbiAgICB9O1xuXG4gICAgc3RhdGljIHJlbW92ZUVsZW1lbnQoZWxlbWVudCkge1xuICAgICAgICBlbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XG4gICAgfVxuXG4gICAgc3RhdGljIHJlcGxhY2VVcmxzKHRleHQpe1xuICAgICAgICBpZighdGV4dCl7XG4gICAgICAgICAgICByZXR1cm4gdGV4dDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdXJsUmVnZXhwID0gLygoZnRwfGh0dHB8aHR0cHMpOlxcL1xcLyhcXHcrOnswLDF9XFx3KkApPyhcXFMrKSg6WzAtOV0rKT8oXFwvfFxcLyhbXFx3IyE6Lj8rPSYlQCFcXC1cXC9dKSk/KS9cblxuICAgICAgICByZXR1cm4gdGV4dC5yZXBsYWNlKHVybFJlZ2V4cCwgJzxhIGhyZWY9XCIkMVwiIHRhcmdldD1cIl9ibGFua1wiPiQxPC9hPicpO1xuICAgIH1cblxuICAgIHN0YXRpYyBlc2NhcGVIdG1sKGh0bWwpXG4gICAge1xuICAgICAgICB2YXIgdGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGh0bWwpO1xuICAgICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZCh0ZXh0KTtcbiAgICAgICAgcmV0dXJuIGRpdi5pbm5lckhUTUw7XG4gICAgfVxuXG4gICAgc3RhdGljIGRpc3BhdGNoSHRtbEV2ZW50KGVsZW1lbnQsIG5hbWUpe1xuICAgICAgICBpZiAoXCJjcmVhdGVFdmVudFwiIGluIGRvY3VtZW50KSB7XG4gICAgICAgICAgICB2YXIgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJIVE1MRXZlbnRzXCIpO1xuICAgICAgICAgICAgZXZ0LmluaXRFdmVudChuYW1lLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICAgICAgICBlbGVtZW50LmRpc3BhdGNoRXZlbnQoZXZ0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBlbGVtZW50LmZpcmVFdmVudChcIm9uXCIrbmFtZSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGRpc3BhdGNoRXZlbnQobmFtZSwgZGF0YSl7XG4gICAgICAgIHZhciBldmVudDtcbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgZXZlbnQgPSBuZXcgIEN1c3RvbUV2ZW50KG5hbWUseyAnZGV0YWlsJzogZGF0YSB9KTtcbiAgICAgICAgfWNhdGNoIChlKXsgLy9JRVxuICAgICAgICAgICAgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcbiAgICAgICAgICAgIGV2ZW50LmluaXRDdXN0b21FdmVudChuYW1lLCBmYWxzZSwgZmFsc2UsIGRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXRWYWxpZGF0aW9uTWVzc2FnZShlcnJvcil7XG4gICAgICAgIGlmKFV0aWxzLmlzU3RyaW5nKGVycm9yKSl7XG4gICAgICAgICAgICBlcnJvciA9IHtuYW1lOiBlcnJvcn07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGtleSA9ICd2YWxpZGF0aW9uLicgKyBlcnJvci5uYW1lO1xuICAgICAgICByZXR1cm4gaTE4bi50KGtleSwgZXJyb3IuZGF0YSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGhpZGUoc2VsZWN0aW9uKXtcbiAgICAgICAgc2VsZWN0aW9uLmNsYXNzZWQoJ3NkLWhpZGRlbicsIHRydWUpO1xuICAgIH1cblxuICAgIHN0YXRpYyBzaG93KHNlbGVjdGlvbiwgc2hvdz10cnVlKXtcbiAgICAgICAgc2VsZWN0aW9uLmNsYXNzZWQoJ3NkLWhpZGRlbicsICFzaG93KTtcbiAgICB9XG5cblxuXG4gICAgc3RhdGljIGlzSGlkZGVuKGVsLCBleGFjdCA9IHRydWUpIHtcbiAgICAgICAgaWYoIWVsKXtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmKGV4YWN0KXtcbiAgICAgICAgICAgIHZhciBzdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsKTtcbiAgICAgICAgICAgIHJldHVybiAoc3R5bGUuZGlzcGxheSA9PT0gJ25vbmUnKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoZWwub2Zmc2V0UGFyZW50ID09PSBudWxsKVxuICAgIH1cblxuICAgIHN0YXRpYyBnZXRKU09OKHVybCwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB4aHIub3BlbignZ2V0JywgdXJsLCB0cnVlKTtcbiAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcbiAgICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzdGF0dXMgPSB4aHIuc3RhdHVzO1xuICAgICAgICAgICAgaWYgKHN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayh4aHIucmVzcG9uc2UsIG51bGwpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCBzdGF0dXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB4aHIuc2VuZCgpO1xuICAgIH1cbn1cbiIsImltcG9ydCAqIGFzIGQzIGZyb20gJy4uL2QzJ1xuXG4vKmJhc2VkIG9uOlxuICogZ2l0aHViLmNvbS9wYXRvcmprL2QzLWNvbnRleHQtbWVudSAqL1xuXG5leHBvcnQgY2xhc3MgQ29udGV4dE1lbnUge1xuICAgIG9wZW5DYWxsYmFjaztcbiAgICBjbG9zZUNhbGxiYWNrO1xuXG4gICAgY29uc3RydWN0b3IobWVudSwgb3B0cykge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBvcHRzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBzZWxmLm9wZW5DYWxsYmFjayA9IG9wdHM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgICAgICAgICAgIHNlbGYub3BlbkNhbGxiYWNrID0gb3B0cy5vbk9wZW47XG4gICAgICAgICAgICBzZWxmLmNsb3NlQ2FsbGJhY2sgPSBvcHRzLm9uQ2xvc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjcmVhdGUgdGhlIGRpdiBlbGVtZW50IHRoYXQgd2lsbCBob2xkIHRoZSBjb250ZXh0IG1lbnVcbiAgICAgICAgZDMuc2VsZWN0QWxsKCcuZDMtY29udGV4dC1tZW51JykuZGF0YShbMV0pXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdkMy1jb250ZXh0LW1lbnUnKTtcblxuICAgICAgICAvLyBjbG9zZSBtZW51XG4gICAgICAgIGQzLnNlbGVjdCgnYm9keScpLm9uKCdjbGljay5kMy1jb250ZXh0LW1lbnUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBkMy5zZWxlY3QoJy5kMy1jb250ZXh0LW1lbnUnKS5zdHlsZSgnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICBpZiAoc2VsZi5jbG9zZUNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5jbG9zZUNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHRoaXMgZ2V0cyBleGVjdXRlZCB3aGVuIGEgY29udGV4dG1lbnUgZXZlbnQgb2NjdXJzXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZGF0YSwgaW5kZXgpIHtcbiAgICAgICAgICAgIHZhciBlbG0gPSB0aGlzO1xuXG4gICAgICAgICAgICBkMy5zZWxlY3RBbGwoJy5kMy1jb250ZXh0LW1lbnUnKS5odG1sKCcnKTtcbiAgICAgICAgICAgIHZhciBsaXN0ID0gZDMuc2VsZWN0QWxsKCcuZDMtY29udGV4dC1tZW51JylcbiAgICAgICAgICAgICAgICAub24oJ2NvbnRleHRtZW51JywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KCcuZDMtY29udGV4dC1tZW51Jykuc3R5bGUoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgICAgICAgICBkMy5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBkMy5ldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJ3VsJyk7XG4gICAgICAgICAgICBsaXN0LnNlbGVjdEFsbCgnbGknKS5kYXRhKHR5cGVvZiBtZW51ID09PSAnZnVuY3Rpb24nID8gbWVudShkYXRhKSA6IG1lbnUpLmVudGVyKClcbiAgICAgICAgICAgICAgICAuYXBwZW5kKCdsaScpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJldCA9ICcnO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZC5kaXZpZGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXQgKz0gJyBpcy1kaXZpZGVyJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoZC5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0ICs9ICcgaXMtZGlzYWJsZWQnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICghZC5hY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldCArPSAnIGlzLWhlYWRlcic7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5odG1sKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkLmRpdmlkZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnPGhyPic7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFkLnRpdGxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdObyB0aXRsZSBhdHRyaWJ1dGUgc2V0LiBDaGVjayB0aGUgc3BlbGxpbmcgb2YgeW91ciBvcHRpb25zLicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAodHlwZW9mIGQudGl0bGUgPT09ICdzdHJpbmcnKSA/IGQudGl0bGUgOiBkLnRpdGxlKGRhdGEpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkLmRpc2FibGVkKSByZXR1cm47IC8vIGRvIG5vdGhpbmcgaWYgZGlzYWJsZWRcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFkLmFjdGlvbikgcmV0dXJuOyAvLyBoZWFkZXJzIGhhdmUgbm8gXCJhY3Rpb25cIlxuICAgICAgICAgICAgICAgICAgICBkLmFjdGlvbihlbG0sIGRhdGEsIGluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KCcuZDMtY29udGV4dC1tZW51Jykuc3R5bGUoJ2Rpc3BsYXknLCAnbm9uZScpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLmNsb3NlQ2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY2xvc2VDYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIHRoZSBvcGVuQ2FsbGJhY2sgYWxsb3dzIGFuIGFjdGlvbiB0byBmaXJlIGJlZm9yZSB0aGUgbWVudSBpcyBkaXNwbGF5ZWRcbiAgICAgICAgICAgIC8vIGFuIGV4YW1wbGUgdXNhZ2Ugd291bGQgYmUgY2xvc2luZyBhIHRvb2x0aXBcbiAgICAgICAgICAgIGlmIChzZWxmLm9wZW5DYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLm9wZW5DYWxsYmFjayhkYXRhLCBpbmRleCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGRpc3BsYXkgY29udGV4dCBtZW51XG4gICAgICAgICAgICBkMy5zZWxlY3QoJy5kMy1jb250ZXh0LW1lbnUnKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnbGVmdCcsIChkMy5ldmVudC5wYWdlWCAtIDIpICsgJ3B4JylcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3RvcCcsIChkMy5ldmVudC5wYWdlWSAtIDIpICsgJ3B4JylcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2Rpc3BsYXknLCAnYmxvY2snKTtcblxuICAgICAgICAgICAgZDMuZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGQzLmV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBzdGF0aWMgaGlkZSgpIHtcbiAgICAgICAgZDMuc2VsZWN0KCcuZDMtY29udGV4dC1tZW51Jykuc3R5bGUoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHtDb250ZXh0TWVudX0gZnJvbSAnLi9jb250ZXh0LW1lbnUnXG5pbXBvcnQge2kxOG59IGZyb20gXCIuLi9pMThuL2kxOG5cIjtcblxuZXhwb3J0IGNsYXNzIEVkZ2VDb250ZXh0TWVudSBleHRlbmRzIENvbnRleHRNZW51IHtcbiAgICB0cmVlRGVzaWduZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcih0cmVlRGVzaWduZXIpIHtcbiAgICAgICAgdmFyIG1lbnUgPSBmdW5jdGlvbiAoZCkge1xuXG4gICAgICAgICAgICB2YXIgbWVudSA9IFtdO1xuXG4gICAgICAgICAgICBtZW51LnB1c2goe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51LmVkZ2UuaW5qZWN0RGVjaXNpb25Ob2RlJyksXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5pbmplY3REZWNpc2lvbk5vZGUoZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG1lbnUucHVzaCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUuZWRnZS5pbmplY3RDaGFuY2VOb2RlJyksXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5pbmplY3RDaGFuY2VOb2RlKGQpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgcmV0dXJuIG1lbnU7XG4gICAgICAgIH07XG5cbiAgICAgICAgc3VwZXIobWVudSk7XG4gICAgICAgIHRoaXMudHJlZURlc2lnbmVyID0gdHJlZURlc2lnbmVyO1xuICAgIH1cbn1cbiIsImltcG9ydCB7Q29udGV4dE1lbnV9IGZyb20gJy4vY29udGV4dC1tZW51J1xuaW1wb3J0IHtkb21haW4gYXMgbW9kZWx9IGZyb20gJ3NkLW1vZGVsJ1xuaW1wb3J0ICogYXMgZDMgZnJvbSAnLi4vZDMnXG5pbXBvcnQge2kxOG59IGZyb20gXCIuLi9pMThuL2kxOG5cIjtcblxuZXhwb3J0IGNsYXNzIE1haW5Db250ZXh0TWVudSBleHRlbmRzIENvbnRleHRNZW51IHtcbiAgICB0cmVlRGVzaWduZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcih0cmVlRGVzaWduZXIpIHtcbiAgICAgICAgdmFyIG1vdXNlUG9zaXRpb24gPSBudWxsO1xuICAgICAgICB2YXIgbWVudSA9IGZ1bmN0aW9uIChkKSB7XG5cbiAgICAgICAgICAgIHZhciBtZW51ID0gW107XG4gICAgICAgICAgICBtZW51LnB1c2goe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm1haW4uYWRkRGVjaXNpb25Ob2RlJyksXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdOb2RlID0gbmV3IG1vZGVsLkRlY2lzaW9uTm9kZShtb3VzZVBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLmFkZE5vZGUobmV3Tm9kZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG1lbnUucHVzaCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubWFpbi5hZGRDaGFuY2VOb2RlJyksXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdOb2RlID0gbmV3IG1vZGVsLkNoYW5jZU5vZGUobW91c2VQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5hZGROb2RlKG5ld05vZGUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBtZW51LnB1c2goe2RpdmlkZXI6IHRydWV9KTtcbiAgICAgICAgICAgIG1lbnUucHVzaCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubWFpbi5hZGRUZXh0JyksXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdUZXh0ID0gbmV3IG1vZGVsLlRleHQobW91c2VQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5hZGRUZXh0KG5ld1RleHQpO1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbWVudS5wdXNoKHtkaXZpZGVyOiB0cnVlfSk7XG4gICAgICAgICAgICBtZW51LnB1c2goe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm1haW4ucGFzdGUnKSxcbiAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLnBhc3RlVG9OZXdMb2NhdGlvbihtb3VzZVBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhdHJlZURlc2lnbmVyLmNvcGllZE5vZGVzIHx8ICF0cmVlRGVzaWduZXIuY29waWVkTm9kZXMubGVuZ3RoXG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbWVudS5wdXNoKHtkaXZpZGVyOiB0cnVlfSk7XG5cbiAgICAgICAgICAgIG1lbnUucHVzaCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubWFpbi5zZWxlY3RBbGxOb2RlcycpLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuc2VsZWN0QWxsTm9kZXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBtZW51O1xuICAgICAgICB9O1xuXG4gICAgICAgIHN1cGVyKG1lbnUsIHtvbk9wZW46ICgpID0+IHtcbiAgICAgICAgICAgIHRyZWVEZXNpZ25lci5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICAgICAgbW91c2VQb3NpdGlvbiA9IG5ldyBtb2RlbC5Qb2ludChkMy5tb3VzZSh0cmVlRGVzaWduZXIuc3ZnLm5vZGUoKSkpLm1vdmUodHJlZURlc2lnbmVyLmdldE1haW5Hcm91cFRyYW5zbGF0aW9uKHRydWUpKTtcblxuICAgICAgICB9fSk7XG4gICAgICAgIHRoaXMudHJlZURlc2lnbmVyID0gdHJlZURlc2lnbmVyO1xuICAgIH1cbn1cbiIsImltcG9ydCB7Q29udGV4dE1lbnV9IGZyb20gJy4vY29udGV4dC1tZW51J1xuaW1wb3J0IHtkb21haW4gYXMgbW9kZWx9IGZyb20gJ3NkLW1vZGVsJ1xuaW1wb3J0IHtpMThufSBmcm9tIFwiLi4vaTE4bi9pMThuXCI7XG5cbmV4cG9ydCBjbGFzcyBOb2RlQ29udGV4dE1lbnUgZXh0ZW5kcyBDb250ZXh0TWVudSB7XG4gICAgdHJlZURlc2lnbmVyO1xuXG4gICAgY29uc3RydWN0b3IodHJlZURlc2lnbmVyLCBvcGVyYXRpb25zRm9yT2JqZWN0KSB7XG4gICAgICAgIHZhciBtZW51ID0gZnVuY3Rpb24gKGQpIHtcblxuICAgICAgICAgICAgdmFyIGNvcHlNZW51SXRlbSA9IHtcbiAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5ub2RlLmNvcHknKSxcbiAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLnNlbGVjdE5vZGUoZCwgIXRyZWVEZXNpZ25lci5pc05vZGVTZWxlY3RlZChkKSk7XG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5jb3B5U2VsZWN0ZWROb2RlcygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB2YXIgY3V0TWVudUl0ZW0gPSB7XG4gICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubm9kZS5jdXQnKSxcbiAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLnNlbGVjdE5vZGUoZCwgIXRyZWVEZXNpZ25lci5pc05vZGVTZWxlY3RlZChkKSk7XG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5jdXRTZWxlY3RlZE5vZGVzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZhciBwYXN0ZU1lbnVJdGVtID0ge1xuICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm5vZGUucGFzdGUnKSxcbiAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLnBhc3RlVG9Ob2RlKGQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGQuZm9sZGVkIHx8ICF0cmVlRGVzaWduZXIuY29waWVkTm9kZXMgfHwgIXRyZWVEZXNpZ25lci5jb3BpZWROb2Rlcy5sZW5ndGhcblxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZhciBkZWxldGVNZW51SXRlbSA9IHtcbiAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5ub2RlLmRlbGV0ZScpLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5zZWxlY3ROb2RlKGQsICF0cmVlRGVzaWduZXIuaXNOb2RlU2VsZWN0ZWQoZCkpO1xuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIucmVtb3ZlU2VsZWN0ZWROb2RlcygpO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIG1lbnUgPSBbXTtcbiAgICAgICAgICAgIGlmIChkLnR5cGUgPT0gbW9kZWwuVGVybWluYWxOb2RlLiRUWVBFKSB7XG4gICAgICAgICAgICAgICAgbWVudSA9IFtjb3B5TWVudUl0ZW0sIGN1dE1lbnVJdGVtLCBkZWxldGVNZW51SXRlbV07XG4gICAgICAgICAgICAgICAgTm9kZUNvbnRleHRNZW51LmFkZE5vZGVDb252ZXJzaW9uT3B0aW9ucyhkLCBtZW51LCB0cmVlRGVzaWduZXIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBtZW51O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZighZC5mb2xkZWQpe1xuICAgICAgICAgICAgICAgIG1lbnUucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm5vZGUuYWRkRGVjaXNpb25Ob2RlJyksXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLmFkZERlY2lzaW9uTm9kZShkKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbWVudS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubm9kZS5hZGRDaGFuY2VOb2RlJyksXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLmFkZENoYW5jZU5vZGUoZClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIG1lbnUucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm5vZGUuYWRkVGVybWluYWxOb2RlJyksXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLmFkZFRlcm1pbmFsTm9kZShkKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbWVudS5wdXNoKHtkaXZpZGVyOiB0cnVlfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG1lbnUucHVzaChjb3B5TWVudUl0ZW0pO1xuICAgICAgICAgICAgbWVudS5wdXNoKGN1dE1lbnVJdGVtKTtcbiAgICAgICAgICAgIG1lbnUucHVzaChwYXN0ZU1lbnVJdGVtKTtcbiAgICAgICAgICAgIG1lbnUucHVzaChkZWxldGVNZW51SXRlbSk7XG5cbiAgICAgICAgICAgIE5vZGVDb250ZXh0TWVudS5hZGROb2RlQ29udmVyc2lvbk9wdGlvbnMoZCwgbWVudSwgdHJlZURlc2lnbmVyKTtcbiAgICAgICAgICAgIG1lbnUucHVzaCh7ZGl2aWRlcjogdHJ1ZX0pO1xuICAgICAgICAgICAgbWVudS5wdXNoKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5ub2RlLnNlbGVjdFN1YnRyZWUnKSxcbiAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLnNlbGVjdFN1YlRyZWUoZCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmKCFkLmZvbGRlZCl7XG4gICAgICAgICAgICAgICAgbWVudS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubm9kZS5mb2xkJyksXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLmZvbGRTdWJ0cmVlKGQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBtZW51LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5ub2RlLnVuZm9sZCcpLFxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5mb2xkU3VidHJlZShkLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYob3BlcmF0aW9uc0Zvck9iamVjdCl7XG4gICAgICAgICAgICAgICAgdmFyIG9wZXJhdGlvbnMgPSBvcGVyYXRpb25zRm9yT2JqZWN0KGQpO1xuICAgICAgICAgICAgICAgIGlmKG9wZXJhdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIG1lbnUucHVzaCh7ZGl2aWRlcjogdHJ1ZX0pO1xuICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25zLmZvckVhY2gob3A9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbnUucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubm9kZS4nK29wLm5hbWUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIucGVyZm9ybU9wZXJhdGlvbihkLCBvcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogIW9wLmNhblBlcmZvcm0oZClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG1lbnU7XG4gICAgICAgIH07XG5cbiAgICAgICAgc3VwZXIobWVudSk7XG4gICAgICAgIHRoaXMudHJlZURlc2lnbmVyID0gdHJlZURlc2lnbmVyO1xuICAgIH1cblxuICAgIHN0YXRpYyBhZGROb2RlQ29udmVyc2lvbk9wdGlvbnMoZCwgbWVudSwgdHJlZURlc2lnbmVyKXtcbiAgICAgICAgdmFyIGNvbnZlcnNpb25PcHRpb25zID0gTm9kZUNvbnRleHRNZW51LmdldE5vZGVDb252ZXJzaW9uT3B0aW9ucyhkLCB0cmVlRGVzaWduZXIpO1xuICAgICAgICBpZihjb252ZXJzaW9uT3B0aW9ucy5sZW5ndGgpe1xuICAgICAgICAgICAgbWVudS5wdXNoKHtkaXZpZGVyOiB0cnVlfSk7XG4gICAgICAgICAgICBjb252ZXJzaW9uT3B0aW9ucy5mb3JFYWNoKG89Pm1lbnUucHVzaChvKSk7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBnZXROb2RlQ29udmVyc2lvbk9wdGlvbnMoZCwgdHJlZURlc2lnbmVyKXtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSBbXTtcblxuICAgICAgICBpZihkLmZvbGRlZCl7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYWxsQWxsb3dlZFR5cGVzID0gW21vZGVsLkRlY2lzaW9uTm9kZS4kVFlQRSwgbW9kZWwuQ2hhbmNlTm9kZS4kVFlQRSwgbW9kZWwuVGVybWluYWxOb2RlLiRUWVBFXTtcblxuICAgICAgICBpZighZC5jaGlsZEVkZ2VzLmxlbmd0aCAmJiBkLiRwYXJlbnQpe1xuICAgICAgICAgICAgYWxsQWxsb3dlZFR5cGVzLmZpbHRlcih0PT50IT09ZC50eXBlKS5mb3JFYWNoKHR5cGU9PntcbiAgICAgICAgICAgICAgICBvcHRpb25zLnB1c2goTm9kZUNvbnRleHRNZW51LmdldE5vZGVDb252ZXJzaW9uT3B0aW9uKHR5cGUsIHRyZWVEZXNpZ25lcikpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGlmKGQgaW5zdGFuY2VvZiBtb2RlbC5EZWNpc2lvbk5vZGUpe1xuICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaChOb2RlQ29udGV4dE1lbnUuZ2V0Tm9kZUNvbnZlcnNpb25PcHRpb24obW9kZWwuQ2hhbmNlTm9kZS4kVFlQRSwgdHJlZURlc2lnbmVyKSlcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaChOb2RlQ29udGV4dE1lbnUuZ2V0Tm9kZUNvbnZlcnNpb25PcHRpb24obW9kZWwuRGVjaXNpb25Ob2RlLiRUWVBFLCB0cmVlRGVzaWduZXIpKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvcHRpb25zO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXROb2RlQ29udmVyc2lvbk9wdGlvbih0eXBlVG9Db252ZXJ0VG8sIHRyZWVEZXNpZ25lcil7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5ub2RlLmNvbnZlcnQuJyt0eXBlVG9Db252ZXJ0VG8pLFxuICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLmNvbnZlcnROb2RlKGQsIHR5cGVUb0NvbnZlcnRUbyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHtDb250ZXh0TWVudX0gZnJvbSAnLi9jb250ZXh0LW1lbnUnXG5pbXBvcnQge2kxOG59IGZyb20gXCIuLi9pMThuL2kxOG5cIjtcblxuZXhwb3J0IGNsYXNzIFRleHRDb250ZXh0TWVudSBleHRlbmRzIENvbnRleHRNZW51IHtcbiAgICB0cmVlRGVzaWduZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcih0cmVlRGVzaWduZXIpIHtcbiAgICAgICAgdmFyIG1lbnUgPSBmdW5jdGlvbiAoZCkge1xuXG5cbiAgICAgICAgICAgIHZhciBkZWxldGVNZW51SXRlbSA9IHtcbiAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS50ZXh0LmRlbGV0ZScpLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5zZWxlY3RUZXh0KGQsIHRydWUsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIucmVtb3ZlU2VsZWN0ZWRUZXh0cygpXG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIG1lbnUgPSBbXTtcbiAgICAgICAgICAgIG1lbnUucHVzaChkZWxldGVNZW51SXRlbSk7XG4gICAgICAgICAgICByZXR1cm4gbWVudTtcbiAgICAgICAgfTtcblxuICAgICAgICBzdXBlcihtZW51KTtcbiAgICAgICAgdGhpcy50cmVlRGVzaWduZXIgPSB0cmVlRGVzaWduZXI7XG4gICAgfVxufVxuIiwiaW1wb3J0ICogYXMgZDMgZnJvbSAnLi9kMydcblxuZXhwb3J0IGNsYXNzIEQzRXh0ZW5zaW9ucyB7XG5cbiAgICBzdGF0aWMgZXh0ZW5kKCkge1xuXG4gICAgICAgIGQzLnNlbGVjdGlvbi5wcm90b3R5cGUuZW50ZXIucHJvdG90eXBlLmluc2VydFNlbGVjdG9yID1cbiAgICAgICAgICAgIGQzLnNlbGVjdGlvbi5wcm90b3R5cGUuaW5zZXJ0U2VsZWN0b3IgPSBmdW5jdGlvbiAoc2VsZWN0b3IsIGJlZm9yZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBEM0V4dGVuc2lvbnMuaW5zZXJ0U2VsZWN0b3IodGhpcywgc2VsZWN0b3IsIGJlZm9yZSk7XG4gICAgICAgICAgICB9O1xuXG5cbiAgICAgICAgZDMuc2VsZWN0aW9uLnByb3RvdHlwZS5lbnRlci5wcm90b3R5cGUuYXBwZW5kU2VsZWN0b3IgPVxuICAgICAgICAgICAgZDMuc2VsZWN0aW9uLnByb3RvdHlwZS5hcHBlbmRTZWxlY3RvciA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBEM0V4dGVuc2lvbnMuYXBwZW5kU2VsZWN0b3IodGhpcywgc2VsZWN0b3IpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICBkMy5zZWxlY3Rpb24ucHJvdG90eXBlLmVudGVyLnByb3RvdHlwZS5zZWxlY3RPckFwcGVuZCA9XG4gICAgICAgICAgICBkMy5zZWxlY3Rpb24ucHJvdG90eXBlLnNlbGVjdE9yQXBwZW5kID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEQzRXh0ZW5zaW9ucy5zZWxlY3RPckFwcGVuZCh0aGlzLCBzZWxlY3Rvcik7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIGQzLnNlbGVjdGlvbi5wcm90b3R5cGUuZW50ZXIucHJvdG90eXBlLnNlbGVjdE9ySW5zZXJ0ID1cbiAgICAgICAgICAgIGQzLnNlbGVjdGlvbi5wcm90b3R5cGUuc2VsZWN0T3JJbnNlcnQgPSBmdW5jdGlvbiAoc2VsZWN0b3IsIGJlZm9yZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBEM0V4dGVuc2lvbnMuc2VsZWN0T3JJbnNlcnQodGhpcywgc2VsZWN0b3IsIGJlZm9yZSk7XG4gICAgICAgICAgICB9O1xuXG5cbiAgICB9XG5cbiAgICBzdGF0aWMgaW5zZXJ0T3JBcHBlbmRTZWxlY3RvcihwYXJlbnQsIHNlbGVjdG9yLCBvcGVyYXRpb24sIGJlZm9yZSkge1xuXG4gICAgICAgIHZhciBzZWxlY3RvclBhcnRzID0gc2VsZWN0b3Iuc3BsaXQoLyhbXFwuXFwjXSkvKTtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBwYXJlbnRbb3BlcmF0aW9uXShzZWxlY3RvclBhcnRzLnNoaWZ0KCksIGJlZm9yZSk7Ly9cIjpmaXJzdC1jaGlsZFwiXG5cbiAgICAgICAgd2hpbGUgKHNlbGVjdG9yUGFydHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgdmFyIHNlbGVjdG9yTW9kaWZpZXIgPSBzZWxlY3RvclBhcnRzLnNoaWZ0KCk7XG4gICAgICAgICAgICB2YXIgc2VsZWN0b3JJdGVtID0gc2VsZWN0b3JQYXJ0cy5zaGlmdCgpO1xuICAgICAgICAgICAgaWYgKHNlbGVjdG9yTW9kaWZpZXIgPT09IFwiLlwiKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQuY2xhc3NlZChzZWxlY3Rvckl0ZW0sIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzZWxlY3Rvck1vZGlmaWVyID09PSBcIiNcIikge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBlbGVtZW50LmF0dHIoJ2lkJywgc2VsZWN0b3JJdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9XG5cbiAgICBzdGF0aWMgaW5zZXJ0U2VsZWN0b3IocGFyZW50LCBzZWxlY3RvciwgYmVmb3JlKSB7XG4gICAgICAgIHJldHVybiBEM0V4dGVuc2lvbnMuaW5zZXJ0T3JBcHBlbmRTZWxlY3RvcihwYXJlbnQsIHNlbGVjdG9yLCBcImluc2VydFwiLCBiZWZvcmUpO1xuICAgIH1cblxuICAgIHN0YXRpYyBhcHBlbmRTZWxlY3RvcihwYXJlbnQsIHNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiBEM0V4dGVuc2lvbnMuaW5zZXJ0T3JBcHBlbmRTZWxlY3RvcihwYXJlbnQsIHNlbGVjdG9yLCBcImFwcGVuZFwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2VsZWN0T3JBcHBlbmQocGFyZW50LCBzZWxlY3RvciwgZWxlbWVudCkge1xuICAgICAgICB2YXIgc2VsZWN0aW9uID0gcGFyZW50LnNlbGVjdChzZWxlY3Rvcik7XG4gICAgICAgIGlmIChzZWxlY3Rpb24uZW1wdHkoKSkge1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyZW50LmFwcGVuZChlbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBEM0V4dGVuc2lvbnMuYXBwZW5kU2VsZWN0b3IocGFyZW50LCBzZWxlY3Rvcik7XG5cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2VsZWN0aW9uO1xuICAgIH07XG5cbiAgICBzdGF0aWMgc2VsZWN0T3JJbnNlcnQocGFyZW50LCBzZWxlY3RvciwgYmVmb3JlKSB7XG4gICAgICAgIHZhciBzZWxlY3Rpb24gPSBwYXJlbnQuc2VsZWN0KHNlbGVjdG9yKTtcbiAgICAgICAgaWYgKHNlbGVjdGlvbi5lbXB0eSgpKSB7XG4gICAgICAgICAgICByZXR1cm4gRDNFeHRlbnNpb25zLmluc2VydFNlbGVjdG9yKHBhcmVudCwgc2VsZWN0b3IsIGJlZm9yZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNlbGVjdGlvbjtcbiAgICB9O1xufVxuIiwiZXhwb3J0ICogZnJvbSAnZDMtZGlzcGF0Y2gnO1xuZXhwb3J0ICogZnJvbSAnZDMtc2NhbGUnO1xuZXhwb3J0ICogZnJvbSAnZDMtc2VsZWN0aW9uJztcbmV4cG9ydCAqIGZyb20gJ2QzLXNoYXBlJ1xuZXhwb3J0ICogZnJvbSAnZDMtZHJhZyc7XG5leHBvcnQgKiBmcm9tICdkMy1icnVzaCdcbmV4cG9ydCAqIGZyb20gJ2QzLWFycmF5J1xuZXhwb3J0ICogZnJvbSAnZDMtaGllcmFyY2h5J1xuZXhwb3J0ICogZnJvbSAnZDMtdGltZS1mb3JtYXQnXG4iLCJtb2R1bGUuZXhwb3J0cz17XG4gICAgXCJjb250ZXh0TWVudVwiOntcbiAgICAgICAgXCJtYWluXCI6e1xuICAgICAgICAgICAgXCJhZGREZWNpc2lvbk5vZGVcIjogXCJFbnRzY2hlaWR1bmdza25vdGVuIGhpbnp1ZsO8Z2VuXCIsXG4gICAgICAgICAgICBcImFkZENoYW5jZU5vZGVcIjogXCJadWZhbGwgS25vdGVuIGhpbnp1ZsO8Z2VuXCIsXG4gICAgICAgICAgICBcImFkZFRleHRcIjogXCJUZXh0IGhpbnp1ZsO8Z2VuIFwiLFxuICAgICAgICAgICAgXCJwYXN0ZVwiOiBcIkVpbmbDvGdlblwiLFxuICAgICAgICAgICAgXCJzZWxlY3RBbGxOb2Rlc1wiOiBcIkFsbGUgS25vdGVuIGF1c3fDpGhsZW5cIlxuICAgICAgICB9LFxuICAgICAgICBcIm5vZGVcIjp7XG4gICAgICAgICAgICBcImNvcHlcIjogXCJLb3BpZXJlblwiLFxuICAgICAgICAgICAgXCJjdXRcIjogXCJBdXNzY2huZWlkZW5cIixcbiAgICAgICAgICAgIFwicGFzdGVcIjogXCJFaW5mw7xnZW5cIixcbiAgICAgICAgICAgIFwiZGVsZXRlXCI6IFwiTMO2c2NoZW5cIixcbiAgICAgICAgICAgIFwiYWRkRGVjaXNpb25Ob2RlXCI6IFwiRW50c2NoZWlkdW5nc2tub3RlbiBoaW56dWbDvGdlblwiLFxuICAgICAgICAgICAgXCJhZGRDaGFuY2VOb2RlXCI6IFwiWnVmYWxsIEtub3RlbiBoaW56dWbDvGdlblwiLFxuICAgICAgICAgICAgXCJhZGRUZXJtaW5hbE5vZGVcIjogXCJFbmRrbm90dGVuIGhpbnp1ZsO8Z2VuXCIsXG4gICAgICAgICAgICBcImNvbnZlcnRcIjp7XG4gICAgICAgICAgICAgICAgXCJkZWNpc2lvblwiOiBcIkFscyBFbnRzY2hlaWR1bmdza25vdGVuXCIsXG4gICAgICAgICAgICAgICAgXCJjaGFuY2VcIjogXCJBbHMgWnVmYWxsIEtub3RlblwiLFxuICAgICAgICAgICAgICAgIFwidGVybWluYWxcIjogXCJBbHMgRW5ka25vdGVuXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInNlbGVjdFN1YnRyZWVcIjogXCJUZWlsYmF1bSB3w6RobGVuXCIsXG4gICAgICAgICAgICBcImZvbGRcIjogXCJUZWlsYmF1bSBmYWx0ZW5cIixcbiAgICAgICAgICAgIFwidW5mb2xkXCI6IFwiVGVpbGJhdW0gZW50ZmFsdGVuXCIsXG5cdFx0XHRcbiAgICAgICAgICAgIFwiZmxpcFN1YnRyZWVcIjogXCJUZWlsYmF1bSB1bWRyZWhlblwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiZWRnZVwiOntcbiAgICAgICAgICAgIFwiaW5qZWN0RGVjaXNpb25Ob2RlXCI6IFwiRW50c2NoZWlkdW5nc2tub3RlbiBJbmppemllcmVuXCIsXG4gICAgICAgICAgICBcImluamVjdENoYW5jZU5vZGVcIjogXCJadWZhbGwgS25vdGVuIEluaml6aWVyZW5cIlxuICAgICAgICB9LFxuICAgICAgICBcInRleHRcIjp7XG4gICAgICAgICAgICBcImRlbGV0ZVwiOiBcIkzDtnNjaGVuXCJcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXCJ2YWxpZGF0aW9uXCI6e1xuICAgICAgICBcImluY29tcGxldGVQYXRoXCI6IFwiUGZhZCwgZGVyIG5pY2h0IG1pdCBkZW0gRW5ka25vdGVuIGVuZGV0XCIsXG4gICAgICAgIFwicHJvYmFiaWxpdHlEb05vdFN1bVVwVG8xXCI6IFwiRGllIFN1bW1lIGRlciBXYWhyc2NoZWlubGljaGtlaXRlbiBpc3QgbmljaHQgZ2xlaWNoIDFcIixcbiAgICAgICAgXCJpbnZhbGlkUHJvYmFiaWxpdHlcIjogXCJVbmfDvGx0aWdlIFdhaHJzY2hlaW5saWNoa2VpdCBpbSBad2VpZyAje3tudW1iZXJ9fVwiLFxuICAgICAgICBcImludmFsaWRQYXlvZmZcIjogXCJVbmfDvGx0aWdlIEF1c3phaGx1bmcgaW4gWndlaWcgI3t7bnVtYmVyfX1cIlxuICAgIH0sXG4gICAgXCJncm93bFwiOntcbiAgICAgICAgXCJicnVzaERpc2FibGVkXCI6IFwiQXVzd2FobGLDvHJzdGUgZGVha3RpdmllcnRcIixcbiAgICAgICAgXCJicnVzaEVuYWJsZWRcIjogXCJBdXN3YWhsYsO8cnN0ZSBha3RpdmllcnRcIlxuICAgIH0sXG4gICAgXCJ0b29sdGlwXCI6e1xuICAgICAgICBcIm5vZGVcIjp7XG4gICAgICAgICAgICBcInBheW9mZlwiOiB7XG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiQXVzemFobHVuZyB7e251bWJlcn19XCIsXG4gICAgICAgICAgICAgICAgXCJuYW1lZFwiOiBcInt7bmFtZX19XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImFnZ3JlZ2F0ZWRQYXlvZmZcIjoge1xuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIkFnZ3JlZ2llcnRlIEF1c3phaGx1bmcge3tudW1iZXJ9fVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJBZ2dyZWdpZXJ0ZSB7e25hbWV9fVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJwcm9iYWJpbGl0eVRvRW50ZXJcIjogXCJXYWhyc2NoZWlubGljaGtlaXRcIlxuICAgICAgICB9LFxuICAgICAgICBcImVkZ2VcIjp7XG4gICAgICAgICAgICBcInBheW9mZlwiOiB7XG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiQXVzemFobHVuZyB7e251bWJlcn19OiB7e3ZhbHVlfX1cIixcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwie3tuYW1lfX06IHt7dmFsdWV9fVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJwcm9iYWJpbGl0eVwiOiBcIldhaHJzY2hlaW5saWNoa2VpdDoge3t2YWx1ZX19XCJcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgICBcImNvbnRleHRNZW51XCI6e1xuICAgICAgICBcIm1haW5cIjp7XG4gICAgICAgICAgICBcImFkZERlY2lzaW9uTm9kZVwiOiBcIkFkZCBEZWNpc2lvbiBOb2RlXCIsXG4gICAgICAgICAgICBcImFkZENoYW5jZU5vZGVcIjogXCJBZGQgQ2hhbmNlIE5vZGVcIixcbiAgICAgICAgICAgIFwiYWRkVGV4dFwiOiBcIkFkZCBUZXh0XCIsXG4gICAgICAgICAgICBcInBhc3RlXCI6IFwiUGFzdGVcIixcbiAgICAgICAgICAgIFwic2VsZWN0QWxsTm9kZXNcIjogXCJTZWxlY3QgYWxsIG5vZGVzXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJub2RlXCI6e1xuICAgICAgICAgICAgXCJjb3B5XCI6IFwiQ29weVwiLFxuICAgICAgICAgICAgXCJjdXRcIjogXCJDdXRcIixcbiAgICAgICAgICAgIFwicGFzdGVcIjogXCJQYXN0ZVwiLFxuICAgICAgICAgICAgXCJkZWxldGVcIjogXCJEZWxldGVcIixcbiAgICAgICAgICAgIFwiYWRkRGVjaXNpb25Ob2RlXCI6IFwiQWRkIERlY2lzaW9uIE5vZGVcIixcbiAgICAgICAgICAgIFwiYWRkQ2hhbmNlTm9kZVwiOiBcIkFkZCBDaGFuY2UgTm9kZVwiLFxuICAgICAgICAgICAgXCJhZGRUZXJtaW5hbE5vZGVcIjogXCJBZGQgVGVybWluYWwgTm9kZVwiLFxuICAgICAgICAgICAgXCJjb252ZXJ0XCI6e1xuICAgICAgICAgICAgICAgIFwiZGVjaXNpb25cIjogXCJBcyBEZWNpc2lvbiBOb2RlXCIsXG4gICAgICAgICAgICAgICAgXCJjaGFuY2VcIjogXCJBcyBDaGFuY2UgTm9kZVwiLFxuICAgICAgICAgICAgICAgIFwidGVybWluYWxcIjogXCJBcyBUZXJtaW5hbCBOb2RlXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInNlbGVjdFN1YnRyZWVcIjogXCJTZWxlY3Qgc3VidHJlZVwiLFxuICAgICAgICAgICAgXCJmb2xkXCI6IFwiRm9sZCBzdWJ0cmVlXCIsXG4gICAgICAgICAgICBcInVuZm9sZFwiOiBcIlVuZm9sZCBzdWJ0cmVlXCIsXG4gICAgICAgICAgICBcImZsaXBTdWJ0cmVlXCI6IFwiRmxpcCBzdWJ0cmVlXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJlZGdlXCI6e1xuICAgICAgICAgICAgXCJpbmplY3REZWNpc2lvbk5vZGVcIjogXCJJbmplY3QgRGVjaXNpb24gTm9kZVwiLFxuICAgICAgICAgICAgXCJpbmplY3RDaGFuY2VOb2RlXCI6IFwiSW5qZWN0IENoYW5jZSBOb2RlXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJ0ZXh0XCI6e1xuICAgICAgICAgICAgXCJkZWxldGVcIjogXCJEZWxldGVcIlxuICAgICAgICB9XG4gICAgfSxcbiAgICBcInZhbGlkYXRpb25cIjp7XG4gICAgICAgIFwiaW5jb21wbGV0ZVBhdGhcIjogXCJQYXRoIG5vdCBlbmRpbmcgd2l0aCB0ZXJtaW5hbCBub2RlXCIsXG4gICAgICAgIFwicHJvYmFiaWxpdHlEb05vdFN1bVVwVG8xXCI6IFwiUHJvYmFiaWxpdGllcyBkbyBub3Qgc3VtIHVwIHRvIDFcIixcbiAgICAgICAgXCJpbnZhbGlkUHJvYmFiaWxpdHlcIjogXCJJbnZhbGlkIHByb2JhYmlsaXR5IGluIGVkZ2UgI3t7bnVtYmVyfX1cIixcbiAgICAgICAgXCJpbnZhbGlkUGF5b2ZmXCI6IFwiSW52YWxpZCBwYXlvZmYgaW4gZWRnZSAje3tudW1iZXJ9fVwiXG4gICAgfSxcbiAgICBcImdyb3dsXCI6e1xuICAgICAgICBcImJydXNoRGlzYWJsZWRcIjogXCJTZWxlY3Rpb24gYnJ1c2ggZGlzYWJsZWRcIixcbiAgICAgICAgXCJicnVzaEVuYWJsZWRcIjogXCJTZWxlY3Rpb24gYnJ1c2ggZW5hYmxlZFwiXG4gICAgfSxcbiAgICBcInRvb2x0aXBcIjp7XG4gICAgICAgIFwibm9kZVwiOntcbiAgICAgICAgICAgIFwicGF5b2ZmXCI6IHtcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJQYXlvZmYge3tudW1iZXJ9fVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJ7e25hbWV9fVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJhZ2dyZWdhdGVkUGF5b2ZmXCI6IHtcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJBZ2dyZWdhdGVkIFBheW9mZiB7e251bWJlcn19XCIsXG4gICAgICAgICAgICAgICAgXCJuYW1lZFwiOiBcIkFnZ3JlZ2F0ZWQge3tuYW1lfX1cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwicHJvYmFiaWxpdHlUb0VudGVyXCI6IFwiUHJvYmFiaWxpdHkgdG8gZW50ZXJcIlxuICAgICAgICB9LFxuICAgICAgICBcImVkZ2VcIjp7XG4gICAgICAgICAgICBcInBheW9mZlwiOiB7XG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiUGF5b2ZmIHt7bnVtYmVyfX06IHt7dmFsdWV9fVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJ7e25hbWV9fToge3t2YWx1ZX19XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInByb2JhYmlsaXR5XCI6IFwiUHJvYmFiaWxpdHk6IHt7dmFsdWV9fVwiXG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cz17XG4gICAgXCJjb250ZXh0TWVudVwiOntcbiAgICAgICAgXCJtYWluXCI6e1xuICAgICAgICAgICAgXCJhZGREZWNpc2lvbk5vZGVcIjogXCJBam91dGVyIG5vdWQgZGUgZMOpY2lzaW9uXCIsXG4gICAgICAgICAgICBcImFkZENoYW5jZU5vZGVcIjogXCJBam91dGVyIG5vdWQgYWzDqWF0b2lyZVwiLFxuICAgICAgICAgICAgXCJhZGRUZXh0XCI6IFwiQWpvdXRlciBkdSB0ZXh0ZVwiLFxuICAgICAgICAgICAgXCJwYXN0ZVwiOiBcIkNvbGxlclwiLFxuICAgICAgICAgICAgXCJzZWxlY3RBbGxOb2Rlc1wiOiBcIlPDqWxlY3Rpb25uZXIgdG91cyBsZXMgbm91ZHNcIlxuICAgICAgICB9LFxuICAgICAgICBcIm5vZGVcIjp7XG4gICAgICAgICAgICBcImNvcHlcIjogXCJDb3BpZVwiLFxuICAgICAgICAgICAgXCJjdXRcIjogXCJDb3VwZXJcIixcbiAgICAgICAgICAgIFwicGFzdGVcIjogXCJDb2xsZXJcIixcbiAgICAgICAgICAgIFwiZGVsZXRlXCI6IFwiRWZmYWNlclwiLFxuICAgICAgICAgICAgXCJhZGREZWNpc2lvbk5vZGVcIjogXCJBam91dGVyIG5vdWQgZGUgZMOpY2lzaW9uXCIsXG4gICAgICAgICAgICBcImFkZENoYW5jZU5vZGVcIjogXCJBam91dGVyIG5vdWQgYWzDqWF0b2lyZVwiLFxuICAgICAgICAgICAgXCJhZGRUZXJtaW5hbE5vZGVcIjogXCJBam91dGVyIHVuIG5vZXVkIHRlcm1pbmFsXCIsXG4gICAgICAgICAgICBcImNvbnZlcnRcIjp7XG4gICAgICAgICAgICAgICAgXCJkZWNpc2lvblwiOiBcIkNvbW1lIG5vdWQgZGUgZMOpY2lzaW9uXCIsXG4gICAgICAgICAgICAgICAgXCJjaGFuY2VcIjogXCJDb21tZSBub3VkIGFsw6lhdG9pcmVcIixcbiAgICAgICAgICAgICAgICBcInRlcm1pbmFsXCI6IFwiQ29tbWUgdW4gbm9ldWQgdGVybWluYWxcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwic2VsZWN0U3VidHJlZVwiOiBcIlPDqWxlY3Rpb25uZXIgdW5lIHNvdXMtYXJib3Jlc2NlbmNlXCIsXG4gICAgICAgICAgICBcImZvbGRcIjogXCJQbGllciBzb3VzLWFyYnJlXCIsXG4gICAgICAgICAgICBcInVuZm9sZFwiOiBcIkTDqXBsaWVyIGFyYnJlIHNvdXMtYXJicmVcIixcbiAgICAgICAgICAgIFwiZmxpcFN1YnRyZWVcIjogXCJCYXNjdWxlciBzb3VzLWFyYnJlXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJlZGdlXCI6e1xuICAgICAgICAgICAgXCJpbmplY3REZWNpc2lvbk5vZGVcIjogXCJJbmplY3RlciB1biBub2V1ZCBkZSBkw6ljaXNpb25cIixcbiAgICAgICAgICAgIFwiaW5qZWN0Q2hhbmNlTm9kZVwiOiBcIkluamVjdGVyIHVuIG5vZXVkIGRlIGNoYW5jZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwidGV4dFwiOntcbiAgICAgICAgICAgIFwiZGVsZXRlXCI6IFwiRWZmYWNlclwiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwidmFsaWRhdGlvblwiOntcbiAgICAgICAgXCJpbmNvbXBsZXRlUGF0aFwiOiBcIlBhcmNvdXJzIG5vbiB0ZXJtaW7DqSBwYXIgbm9ldWQgdGVybWluYWxcIixcbiAgICAgICAgXCJwcm9iYWJpbGl0eURvTm90U3VtVXBUbzFcIjogXCJMYSBzb21tZSBkZXMgcHJvYmFiaWxpdMOpcyBuJ2VzdCBwYXMgMSBvdSBwbHVzXCIsXG4gICAgICAgIFwiaW52YWxpZFByb2JhYmlsaXR5XCI6IFwiUHJvYmFiaWxpdMOpIGludmFsaWRlIC0gbGUgYm9yZCAje3tudW1iZXJ9fVwiLFxuICAgICAgICBcImludmFsaWRQYXlvZmZcIjogXCJBdmFudGFnZSBpbnZhbGlkZSAtIGxlIGJvcmQgI3t7bnVtYmVyfX1cIlxuICAgIH0sXG4gICAgXCJncm93bFwiOntcbiAgICAgICAgXCJicnVzaERpc2FibGVkXCI6IFwiQnJvc3NlIGRlIHPDqWxlY3Rpb24gZMOpc2FjdGl2w6llXCIsXG4gICAgICAgIFwiYnJ1c2hFbmFibGVkXCI6IFwiQnJvc3NlIGRlIHPDqWxlY3Rpb24gYWN0aXbDqWVcIlxuICAgIH0sXG4gICAgXCJ0b29sdGlwXCI6e1xuICAgICAgICBcIm5vZGVcIjp7XG4gICAgICAgICAgICBcInBheW9mZlwiOiB7XG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiQXZhbnRhZ2Uge3tudW1iZXJ9fVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJ7e25hbWV9fVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJhZ2dyZWdhdGVkUGF5b2ZmXCI6IHtcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJBdmFudGFnZSBhZ3LDqWfDqSB7e251bWJlcn19XCIsXG4gICAgICAgICAgICAgICAgXCJuYW1lZFwiOiBcIkFncsOpZ8OpICB7e25hbWV9fVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJwcm9iYWJpbGl0eVRvRW50ZXJcIjogXCJQcm9iYWJpbGl0w6kgZCdlbnRyw6llXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJlZGdlXCI6e1xuICAgICAgICAgICAgXCJwYXlvZmZcIjoge1xuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIkF2YW50YWdlIHt7bnVtYmVyfX06IHt7dmFsdWV9fVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJ7e25hbWV9fToge3t2YWx1ZX19XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInByb2JhYmlsaXR5XCI6IFwiUHJvYmFiaWxpdMOpOiB7e3ZhbHVlfX1cIlxuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IGkxOG5leHQgZnJvbSAnaTE4bmV4dCc7XG5pbXBvcnQgKiBhcyBlbiBmcm9tICcuL2VuLmpzb24nXG5pbXBvcnQgKiBhcyBwbCBmcm9tICcuL3BsLmpzb24nXG5pbXBvcnQgKiBhcyBpdCBmcm9tICcuL2l0Lmpzb24nXG5pbXBvcnQgKiBhcyBkZSBmcm9tICcuL2RlLmpzb24nXG5pbXBvcnQgKiBhcyBmciBmcm9tICcuL2ZyLmpzb24nXG5cbmV4cG9ydCBjbGFzcyBpMThue1xuXG4gICAgc3RhdGljICRpbnN0YW5jZTtcbiAgICBzdGF0aWMgbGFuZ3VhZ2U7XG5cbiAgICBzdGF0aWMgaW5pdChsbmcpe1xuICAgICAgICBpMThuLmxhbmd1YWdlID0gbG5nO1xuICAgICAgICBsZXQgcmVzb3VyY2VzID0ge1xuICAgICAgICAgICAgZW46IHtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGlvbjogZW5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwbDoge1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0aW9uOiBwbFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGl0OiB7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRpb246IGl0XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGU6IHtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGlvbjogZGVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmcjoge1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0aW9uOiBmclxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBpMThuLiRpbnN0YW5jZSA9IGkxOG5leHQuY3JlYXRlSW5zdGFuY2Uoe1xuICAgICAgICAgICAgbG5nOiBsbmcsXG4gICAgICAgICAgICBmYWxsYmFja0xuZzogJ2VuJyxcbiAgICAgICAgICAgIHJlc291cmNlczogcmVzb3VyY2VzXG4gICAgICAgIH0sIChlcnIsIHQpID0+IHtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIHQoa2V5LCBvcHQpe1xuICAgICAgICByZXR1cm4gaTE4bi4kaW5zdGFuY2UudChrZXksIG9wdClcbiAgICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cz17XG4gICAgXCJjb250ZXh0TWVudVwiOntcbiAgICAgICAgXCJtYWluXCI6e1xuICAgICAgICAgICAgXCJhZGREZWNpc2lvbk5vZGVcIjogXCJBZ2dpdW5naSB1biBub2RvIGRpIGRlY2lzaW9uZVwiLFxuICAgICAgICAgICAgXCJhZGRDaGFuY2VOb2RlXCI6IFwiQWdnaXVuZ2kgdW4gbm9kbyBvcHBvcnR1bml0w6BcIixcbiAgICAgICAgICAgIFwiYWRkVGV4dFwiOiBcIkFnZ2l1bmdpIHRlc3RvXCIsXG4gICAgICAgICAgICBcInBhc3RlXCI6IFwiSW5jb2xsYVwiLFxuICAgICAgICAgICAgXCJzZWxlY3RBbGxOb2Rlc1wiOiBcIlNlbGV6aW9uYSB0dXR0aSBpIG5vZGlcIlxuICAgICAgICB9LFxuICAgICAgICBcIm5vZGVcIjp7XG4gICAgICAgICAgICBcImNvcHlcIjogXCJDb3BpYVwiLFxuICAgICAgICAgICAgXCJjdXRcIjogXCJUYWdsaWFcIixcbiAgICAgICAgICAgIFwicGFzdGVcIjogXCJJbmNvbGxhXCIsXG4gICAgICAgICAgICBcImRlbGV0ZVwiOiBcIkNhbmNlbGxhXCIsXG4gICAgICAgICAgICBcImFkZERlY2lzaW9uTm9kZVwiOiBcIkFnZ2l1bmdpIHVuIG5vZG8gZGkgZGVjaXNpb25lXCIsXG4gICAgICAgICAgICBcImFkZENoYW5jZU5vZGVcIjogXCJBZ2dpdW5naSB1biBub2RvIG9wcG9ydHVuaXTDoFwiLFxuICAgICAgICAgICAgXCJhZGRUZXJtaW5hbE5vZGVcIjogXCJBZ2dpdW5naSB1biBub2RvIHRlcm1pbmFsZVwiLFxuICAgICAgICAgICAgXCJjb252ZXJ0XCI6e1xuICAgICAgICAgICAgICAgIFwiZGVjaXNpb25cIjogXCJDb21lIERlY2lzaW9uIE5vZGVcIixcbiAgICAgICAgICAgICAgICBcImNoYW5jZVwiOiBcIkNvbWUgQ2hhbmNlIE5vZGVcIixcbiAgICAgICAgICAgICAgICBcInRlcm1pbmFsXCI6IFwiQ29tZSBUZXJtaW5hbCBOb2RlXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInNlbGVjdFN1YnRyZWVcIjogXCJTZWxlemlvbmEgU290dG8tYWxiZXJvXCIsXG4gICAgICAgICAgICBcImZvbGRcIjogXCJQaWVnYSBzb3R0by1hbGJlcm9cIixcbiAgICAgICAgICAgIFwidW5mb2xkXCI6IFwiRGlzcGllZ2Fyc2kgc290dG8tYWxiZXJvXCIsXHRcdFx0XG4gICAgICAgICAgICBcImZsaXBTdWJ0cmVlXCI6IFwiUmliYWx0YSBzb3R0by1hbGJlcm9cIlxuICAgICAgICB9LFxuICAgICAgICBcImVkZ2VcIjp7XG4gICAgICAgICAgICBcImluamVjdERlY2lzaW9uTm9kZVwiOiBcIkluaWV0dGEgbm9kbyBkaSBkZWNpc2lvbmVcIixcbiAgICAgICAgICAgIFwiaW5qZWN0Q2hhbmNlTm9kZVwiOiBcIkluaWV0dGEgbm9kbyBvcHBvcnR1bml0w6BcIlxuICAgICAgICB9LFxuICAgICAgICBcInRleHRcIjp7XG4gICAgICAgICAgICBcImRlbGV0ZVwiOiBcIkNhbmNlbGxhXCJcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXCJ2YWxpZGF0aW9uXCI6e1xuICAgICAgICBcImluY29tcGxldGVQYXRoXCI6IFwiUGVyY29yc28gc2VuemEgbm9kbyB0ZXJtaW5hbGVcIixcbiAgICAgICAgXCJwcm9iYWJpbGl0eURvTm90U3VtVXBUbzFcIjogXCJMYSBzb21tYSBkZWxsZSBwcm9iYWJpbGl0w6Agw6ggZGl2ZXJzYSBkYSAxXCIsXG4gICAgICAgIFwiaW52YWxpZFByb2JhYmlsaXR5XCI6IFwiUHJvYmFiaWxpdMOgIG5vbiB2YWxpZGEgLSBib3JkbyAje3tudW1iZXJ9fVwiLFxuICAgICAgICBcImludmFsaWRQYXlvZmZcIjogXCJTYWxkbyBub24gdmFsaWRvIC0gYm9yZG8gI3t7bnVtYmVyfX1cIlxuICAgIH0sXG4gICAgXCJncm93bFwiOntcbiAgICAgICAgXCJicnVzaERpc2FibGVkXCI6IFwiU2VsZXppb25lIHBlbm5lbGxvIGRpc2FiaWxpdGF0YVwiLFxuICAgICAgICBcImJydXNoRW5hYmxlZFwiOiBcIlNlbGV6aW9uZSBwZW5uZWxsbyBhYmlsaXRhdGFcIlxuICAgIH0sXG4gICAgXCJ0b29sdGlwXCI6e1xuICAgICAgICBcIm5vZGVcIjp7XG4gICAgICAgICAgICBcInBheW9mZlwiOiB7XG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiU2FsZG8ge3tudW1iZXJ9fVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJ7e25hbWV9fVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJhZ2dyZWdhdGVkUGF5b2ZmXCI6IHtcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJTYWxkbyBhZ2dyZWdhdG8ge3tudW1iZXJ9fVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJBZ2dyZWdhdG8ge3tuYW1lfX1cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwicHJvYmFiaWxpdHlUb0VudGVyXCI6IFwiUHJvYmFiaWxpdMOgIGRhIGluc2VyaXJlXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJlZGdlXCI6e1xuICAgICAgICAgICAgXCJwYXlvZmZcIjoge1xuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIlNhbGRvIHt7bnVtYmVyfX06IHt7dmFsdWV9fVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJ7e25hbWV9fToge3t2YWx1ZX19XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInByb2JhYmlsaXR5XCI6IFwiUHJvYmFiaWxpdMOgOiB7e3ZhbHVlfX1cIlxuICAgICAgICB9XG4gICAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHM9e1xuXG4gICAgXCJjb250ZXh0TWVudVwiOntcbiAgICAgICAgXCJtYWluXCI6e1xuICAgICAgICAgICAgXCJhZGREZWNpc2lvbk5vZGVcIjogXCJEb2RhaiBXxJl6ZcWCIERlY3l6eWpueVwiLFxuICAgICAgICAgICAgXCJhZGRDaGFuY2VOb2RlXCI6IFwiRG9kYWogV8SZemXFgiBMb3Nvd3lcIixcbiAgICAgICAgICAgIFwiYWRkVGV4dFwiOiBcIkRvZGFqIFRla3N0XCIsXG4gICAgICAgICAgICBcInBhc3RlXCI6IFwiV2tsZWpcIixcbiAgICAgICAgICAgIFwic2VsZWN0QWxsTm9kZXNcIjogXCJaYXpuYWN6IHdzenlzdGtpZSB3xJl6xYJ5XCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJub2RlXCI6e1xuICAgICAgICAgICAgXCJjb3B5XCI6IFwiS29waXVqXCIsXG4gICAgICAgICAgICBcImN1dFwiOiBcIld5dG5palwiLFxuICAgICAgICAgICAgXCJwYXN0ZVwiOiBcIldrbGVqXCIsXG4gICAgICAgICAgICBcImRlbGV0ZVwiOiBcIlVzdcWEXCIsXG4gICAgICAgICAgICBcImFkZERlY2lzaW9uTm9kZVwiOiBcIkRvZGFqIFfEmXplxYIgRGVjeXp5am55XCIsXG4gICAgICAgICAgICBcImFkZENoYW5jZU5vZGVcIjogXCJEb2RhaiBXxJl6ZcWCIExvc293eVwiLFxuICAgICAgICAgICAgXCJhZGRUZXJtaW5hbE5vZGVcIjogXCJEb2RhaiBXxJl6ZcWCIEtvxYRjb3d5XCIsXG4gICAgICAgICAgICBcImNvbnZlcnRcIjp7XG4gICAgICAgICAgICAgICAgXCJkZWNpc2lvblwiOiBcIkpha28gV8SZemXFgiBEZWN5enlqbnlcIixcbiAgICAgICAgICAgICAgICBcImNoYW5jZVwiOiBcIkpha28gV8SZemXFgiBMb3Nvd3lcIixcbiAgICAgICAgICAgICAgICBcInRlcm1pbmFsXCI6IFwiSmFrbyBXxJl6ZcWCIEtvxYRjb3d5XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInNlbGVjdFN1YnRyZWVcIjogXCJaYXpuYWN6IHBvZGRyemV3b1wiLFxuICAgICAgICAgICAgXCJmb2xkXCI6IFwiWndpxYQgcG9kZHJ6ZXdvXCIsXG4gICAgICAgICAgICBcInVuZm9sZFwiOiBcIlJvendpxYQgcG9kZHJ6ZXdvXCIsXG4gICAgICAgICAgICBcImZsaXBTdWJ0cmVlXCI6IFwiUHJ6ZXdyw7PEhyBwb2Rkcnpld29cIlxuICAgICAgICB9LFxuICAgICAgICBcImVkZ2VcIjp7XG4gICAgICAgICAgICBcImluamVjdERlY2lzaW9uTm9kZVwiOiBcIldzdHJ6eWtuaWogV8SZemXFgiBEZWN5enlqbnlcIixcbiAgICAgICAgICAgIFwiaW5qZWN0Q2hhbmNlTm9kZVwiOiBcIldzdHJ6eWtuaWogV8SZemXFgiBMb3Nvd3lcIlxuICAgICAgICB9LFxuICAgICAgICBcInRleHRcIjp7XG4gICAgICAgICAgICBcImRlbGV0ZVwiOiBcIlVzdcWEXCJcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBcInZhbGlkYXRpb25cIjp7XG4gICAgICAgIFwiaW5jb21wbGV0ZVBhdGhcIjogXCJPc3RhdG5pbSB3xJl6xYJlbSB3IMWbY2llxbxjZSBwb3dpbmllbiBiecSHIFfEmXplxYIgS2/FhGNvd3lcIixcbiAgICAgICAgXCJwcm9iYWJpbGl0eURvTm90U3VtVXBUbzFcIjogXCJQcmF3ZG9wb2RvYmllxYRzdHdhIG5pZSBzdW11asSFIHNpZSBkbyAxXCIsXG4gICAgICAgIFwiaW52YWxpZFByb2JhYmlsaXR5XCI6IFwiTmllcG9wcmF3bmUgcHJhd2RvcG9kb2JpZcWEc3R3byBuYSBrcmF3xJlkemkgI3t7bnVtYmVyfX1cIixcbiAgICAgICAgXCJpbnZhbGlkUGF5b2ZmXCI6IFwiTmllcG9wcmF3bmEgd3lwxYJhdGEgbmEga3Jhd8SZZHppICN7e251bWJlcn19XCJcbiAgICB9LFxuICAgIFwiZ3Jvd2xcIjp7XG4gICAgICAgIFwiYnJ1c2hEaXNhYmxlZFwiOiBcIlphem5hY3phbmllIHd5xYLEhWN6b25lXCIsXG4gICAgICAgIFwiYnJ1c2hFbmFibGVkXCI6IFwiWmF6bmFjemFuaWUgd8WCxIVjem9uZVwiXG4gICAgfSxcbiAgICBcInRvb2x0aXBcIjp7XG4gICAgICAgIFwibm9kZVwiOntcbiAgICAgICAgICAgIFwicGF5b2ZmXCI6IHtcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJXeXDFgmF0YSB7e251bWJlcn19XCIsXG4gICAgICAgICAgICAgICAgXCJuYW1lZFwiOiBcInt7bmFtZX19XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImFnZ3JlZ2F0ZWRQYXlvZmZcIjoge1xuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIlphZ3JlZ293YW5hIHd5cMWCYXRhIHt7bnVtYmVyfX1cIixcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwiWmFncmVnb3dhbmEge3tuYW1lfX1cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwicHJvYmFiaWxpdHlUb0VudGVyXCI6IFwiUHJhd2RvcG9kb2JpZcWEc3R3byB3ZWrFm2NpYVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiZWRnZVwiOntcbiAgICAgICAgICAgIFwicGF5b2ZmXCI6IHtcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJXeXDFgmF0YSB7e251bWJlcn19OiB7e3ZhbHVlfX1cIixcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwie3tuYW1lfX06IHt7dmFsdWV9fVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJwcm9iYWJpbGl0eVwiOiBcIlByYXdkb3BvZG9iaWXFhHN0d286IHt7dmFsdWV9fVwiXG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQge0QzRXh0ZW5zaW9uc30gZnJvbSAnLi9kMy1leHRlbnNpb25zJ1xuRDNFeHRlbnNpb25zLmV4dGVuZCgpO1xuXG5leHBvcnQgKiBmcm9tICcuL3RyZWUtZGVzaWduZXInXG5leHBvcnQgKiBmcm9tICcuL2FwcC11dGlscydcbmV4cG9ydCAqIGZyb20gJy4vdGVtcGxhdGVzJ1xuZXhwb3J0ICogZnJvbSAnLi90b29sdGlwJ1xuZXhwb3J0ICogZnJvbSAnLi9kMy1leHRlbnNpb25zJ1xuZXhwb3J0IHtkZWZhdWx0IGFzIGQzfSBmcm9tICcuL2QzJ1xuXG5cbiIsImltcG9ydCB7VXRpbHN9IGZyb20gJ3NkLXV0aWxzJ1xuaW1wb3J0IHtkb21haW4gYXMgbW9kZWx9IGZyb20gJ3NkLW1vZGVsJ1xuaW1wb3J0ICogYXMgZDMgZnJvbSAnLi9kMydcbmltcG9ydCBjaXJjbGVTeW1ib2wgZnJvbSAnLi9zeW1ib2xzL2NpcmNsZSdcbmltcG9ydCB0cmlhbmdsZVN5bWJvbCBmcm9tICcuL3N5bWJvbHMvdHJpYW5nbGUnXG5pbXBvcnQge0FwcFV0aWxzfSBmcm9tIFwiLi9hcHAtdXRpbHNcIjtcblxuLypUcmVlIGxheW91dCBtYW5hZ2VyKi9cbmV4cG9ydCBjbGFzcyBMYXlvdXR7XG5cbiAgICB0cmVlRGVzaWduZXI7XG4gICAgZGF0YTtcbiAgICBjb25maWc7XG5cbiAgICBub2RlVHlwZVRvU3ltYm9sID0ge1xuICAgICAgICAnZGVjaXNpb24nOiBkMy5zeW1ib2xTcXVhcmUsXG4gICAgICAgICdjaGFuY2UnOiBjaXJjbGVTeW1ib2wsXG4gICAgICAgIFwidGVybWluYWxcIjogdHJpYW5nbGVTeW1ib2xcbiAgICB9O1xuXG4gICAgc3RhdGljIE1BTlVBTF9MQVlPVVRfTkFNRSA9ICdtYW51YWwnO1xuXG5cbiAgICBvbkF1dG9MYXlvdXRDaGFuZ2VkPVtdO1xuXG4gICAgbm9kZVR5cGVPcmRlciA9IHtcbiAgICAgICAgJ2RlY2lzaW9uJyA6IDAsXG4gICAgICAgICdjaGFuY2UnOiAwLFxuICAgICAgICAndGVybWluYWwnOiAxXG4gICAgfTtcblxuICAgIHRyZWVNYXJnaW4gPSA1MDtcbiAgICB0YXJnZXRTeW1ib2xTaXplPXt9O1xuICAgIG5vZGVTZXBhcmF0aW9uID0gKGEsIGIpID0+IGEucGFyZW50ID09PSBiLnBhcmVudCA/IDEgOiAxLjJcblxuICAgIGNvbnN0cnVjdG9yKHRyZWVEZXNpZ25lciwgZGF0YSwgY29uZmlnKXtcbiAgICAgICAgdGhpcy50cmVlRGVzaWduZXIgPSB0cmVlRGVzaWduZXI7XG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuXG4gICAgfVxuXG4gICAgdXBkYXRlKG5vZGUpe1xuICAgICAgICBpZihub2RlICYmIG5vZGUuJHBhcmVudCl7XG4gICAgICAgICAgICBub2RlLiRwYXJlbnQuY2hpbGRFZGdlcy5zb3J0KChhLGIpPT5hLmNoaWxkTm9kZS5sb2NhdGlvbi55IC0gYi5jaGlsZE5vZGUubG9jYXRpb24ueSlcbiAgICAgICAgfVxuICAgICAgICBpZighdGhpcy5pc01hbnVhbExheW91dCgpKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmF1dG9MYXlvdXQodGhpcy5jb25maWcudHlwZSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYobm9kZSl7XG4gICAgICAgICAgICB0aGlzLm1vdmVOb2RlVG9FbXB0eVBsYWNlKG5vZGUpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMudHJlZURlc2lnbmVyLnJlZHJhdyh0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzTWFudWFsTGF5b3V0KCl7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy50eXBlID09PSBMYXlvdXQuTUFOVUFMX0xBWU9VVF9OQU1FO1xuICAgIH1cblxuICAgIGdldE5ld0NoaWxkTG9jYXRpb24ocGFyZW50KXtcbiAgICAgICAgaWYoIXBhcmVudCl7XG4gICAgICAgICAgICByZXR1cm4gbmV3IG1vZGVsLlBvaW50KHRoaXMuZ2V0Tm9kZU1pblgoKSwgdGhpcy5nZXROb2RlTWluWSgpKVxuICAgICAgICB9XG4gICAgICAgIHZhciB4ID0gcGFyZW50LmxvY2F0aW9uLnggKyB0aGlzLmNvbmZpZy5ncmlkV2lkdGg7XG4gICAgICAgIHZhciB5ID0gcGFyZW50LmxvY2F0aW9uLnk7XG4gICAgICAgIGlmKHBhcmVudC5jaGlsZEVkZ2VzLmxlbmd0aCl7XG4gICAgICAgICAgICB5ID0gcGFyZW50LmNoaWxkRWRnZXNbcGFyZW50LmNoaWxkRWRnZXMubGVuZ3RoLTFdLmNoaWxkTm9kZS5sb2NhdGlvbi55KzE7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IG1vZGVsLlBvaW50KHgsIHkpXG4gICAgfVxuXG4gICAgZ2V0SW5qZWN0ZWROb2RlTG9jYXRpb24oZWRnZSl7XG5cbiAgICAgICAgdmFyIHAgPSBlZGdlLiRsaW5lUG9pbnRzWzJdO1xuXG4gICAgICAgIHJldHVybiBuZXcgbW9kZWwuUG9pbnQocFswXSwgcFsxXSlcbiAgICB9XG5cbiAgICBtb3ZlTm9kZVRvRW1wdHlQbGFjZShub2RlLCByZWRyYXdJZkNoYW5nZWQ9dHJ1ZSl7XG4gICAgICAgIHZhciBwb3NpdGlvbk1hcCA9IHt9O1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIG5vZGUubG9jYXRpb24ueCA9IE1hdGgubWF4KHRoaXMuZ2V0Tm9kZU1pblgobm9kZSksIG5vZGUubG9jYXRpb24ueCk7XG4gICAgICAgIG5vZGUubG9jYXRpb24ueSA9IE1hdGgubWF4KHRoaXMuZ2V0Tm9kZU1pblkobm9kZSksIG5vZGUubG9jYXRpb24ueSk7XG5cblxuICAgICAgICB0aGlzLm5vZGVzU29ydGVkQnlYID0gdGhpcy5kYXRhLm5vZGVzLnNsaWNlKCk7XG4gICAgICAgIHRoaXMubm9kZXNTb3J0ZWRCeVguc29ydCgoYSxiKT0+YS5sb2NhdGlvbi54IC0gYi5sb2NhdGlvbi54KTtcblxuICAgICAgICBmdW5jdGlvbiBmaW5kQ29sbGlkaW5nTm9kZShub2RlLCBsb2NhdGlvbil7XG4gICAgICAgICAgICByZXR1cm4gVXRpbHMuZmluZChzZWxmLm5vZGVzU29ydGVkQnlYLCBuPT57XG4gICAgICAgICAgICAgICAgaWYobm9kZSA9PSBuKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBtYXJnaW4gPSBzZWxmLmNvbmZpZy5ub2RlU2l6ZS8zO1xuICAgICAgICAgICAgICAgIHZhciB4ID0gbi5sb2NhdGlvbi54O1xuICAgICAgICAgICAgICAgIHZhciB5ID0gbi5sb2NhdGlvbi55O1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIChsb2NhdGlvbi54IC0gbWFyZ2luIDw9IHggJiYgbG9jYXRpb24ueCArIG1hcmdpbiA+PSB4XG4gICAgICAgICAgICAgICAgICAgICYmIGxvY2F0aW9uLnkgLSBtYXJnaW4gPD0geSAmJiBsb2NhdGlvbi55ICsgbWFyZ2luID49IHkpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzdGVwWCA9IHRoaXMuY29uZmlnLm5vZGVTaXplLzI7XG4gICAgICAgIHZhciBzdGVwWSA9IHRoaXMuY29uZmlnLm5vZGVTaXplKzEwO1xuICAgICAgICB2YXIgc3RlcFhzYW1lUGFyZW50ID0gMDtcbiAgICAgICAgdmFyIHN0ZXBZc2FtZVBhcmVudCA9IDc1O1xuICAgICAgICB2YXIgY2hhbmdlZCA9IGZhbHNlO1xuICAgICAgICB2YXIgY29saWRpbmdOb2RlO1xuICAgICAgICB2YXIgbmV3TG9jYXRpb24gPSBuZXcgbW9kZWwuUG9pbnQobm9kZS5sb2NhdGlvbik7XG4gICAgICAgIHdoaWxlKGNvbGlkaW5nTm9kZSA9IGZpbmRDb2xsaWRpbmdOb2RlKG5vZGUsIG5ld0xvY2F0aW9uKSl7XG4gICAgICAgICAgICBjaGFuZ2VkPXRydWU7XG4gICAgICAgICAgICB2YXIgc2FtZVBhcmVudCA9IG5vZGUuJHBhcmVudCAmJiBjb2xpZGluZ05vZGUuJHBhcmVudCAmJiBub2RlLiRwYXJlbnQ9PT1jb2xpZGluZ05vZGUuJHBhcmVudDtcbiAgICAgICAgICAgIGlmKHNhbWVQYXJlbnQpe1xuICAgICAgICAgICAgICAgIG5ld0xvY2F0aW9uLm1vdmUoc3RlcFhzYW1lUGFyZW50LCBzdGVwWXNhbWVQYXJlbnQpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgbmV3TG9jYXRpb24ubW92ZShzdGVwWCwgc3RlcFkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmKGNoYW5nZWQpe1xuICAgICAgICAgICAgbm9kZS5tb3ZlVG8obmV3TG9jYXRpb24ueCxuZXdMb2NhdGlvbi55LCB0cnVlKTtcbiAgICAgICAgICAgIGlmKHJlZHJhd0lmQ2hhbmdlZCl7XG4gICAgICAgICAgICAgICAgdGhpcy50cmVlRGVzaWduZXIucmVkcmF3KHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGlzYWJsZUF1dG9MYXlvdXQoKXtcbiAgICAgICAgdGhpcy5jb25maWcudHlwZSA9IExheW91dC5NQU5VQUxfTEFZT1VUX05BTUU7XG4gICAgICAgIHRoaXMuX2ZpcmVPbkF1dG9MYXlvdXRDaGFuZ2VkQ2FsbGJhY2tzKCk7XG4gICAgfVxuXG5cbiAgICBub2RlU3ltYm9sU2l6ZSA9IHt9O1xuICAgIGRyYXdOb2RlU3ltYm9sKHBhdGgsIHRyYW5zaXRpb24pe1xuXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIG5vZGVTaXplID0gdGhpcy5jb25maWcubm9kZVNpemU7XG4gICAgICAgIHRoaXMubm9kZVN5bWJvbCA9IGQzLnN5bWJvbCgpLnR5cGUoZD0+IHNlbGYubm9kZVR5cGVUb1N5bWJvbFtkLnR5cGVdKVxuICAgICAgICAgICAgLnNpemUoZD0+c2VsZi5ub2RlU3ltYm9sU2l6ZVtkLiRpZF0gPyBVdGlscy5nZXQoc2VsZi50YXJnZXRTeW1ib2xTaXplLCBkLnR5cGUrXCJbJ1wiK3NlbGYuY29uZmlnLm5vZGVTaXplK1wiJ11cIiwgNjQpIDogNjQpO1xuXG4gICAgICAgIHBhdGhcbiAgICAgICAgICAgIC5lYWNoKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgdmFyIHBhdGggPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgICAgICAgICAgdmFyIHByZXYgPSBwYXRoLmF0dHIoXCJkXCIpO1xuICAgICAgICAgICAgICAgIGlmKCFwcmV2KXtcbiAgICAgICAgICAgICAgICAgICAgcGF0aC5hdHRyKFwiZFwiLCBzZWxmLm5vZGVTeW1ib2wpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgc2l6ZSA9IFV0aWxzLmdldChzZWxmLnRhcmdldFN5bWJvbFNpemUsIGQudHlwZStcIlsnXCIrc2VsZi5jb25maWcubm9kZVNpemUrXCInXVwiKTtcbiAgICAgICAgICAgICAgICBpZighc2l6ZSl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBib3ggPSBwYXRoLm5vZGUoKS5nZXRCQm94KCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IE1hdGgubWluKG5vZGVTaXplIC8gYm94LndpZHRoLCBub2RlU2l6ZSAvIGJveC5oZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICBzaXplID0gZXJyb3IgKiBlcnJvciAqIChzZWxmLm5vZGVTeW1ib2xTaXplW2QuJGlkXXx8NjQpO1xuICAgICAgICAgICAgICAgICAgICBVdGlscy5zZXQoc2VsZi50YXJnZXRTeW1ib2xTaXplLCBkLnR5cGUrXCJbJ1wiK3NlbGYuY29uZmlnLm5vZGVTaXplK1wiJ11cIiwgc2l6ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKHRyYW5zaXRpb24pe1xuICAgICAgICAgICAgICAgICAgICBwYXRoID0gIHBhdGgudHJhbnNpdGlvbigpO1xuXG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubm9kZVN5bWJvbFNpemVbZC4kaWRdID0gc2l6ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcGF0aC5hdHRyKFwiZFwiLCBzZWxmLm5vZGVTeW1ib2wpO1xuICAgICAgICAgICAgICAgIGlmKHRyYW5zaXRpb24pe1xuICAgICAgICAgICAgICAgICAgICBzZWxmLm5vZGVTeW1ib2xTaXplW2QuJGlkXSA9IHNpemU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbm9kZUxhYmVsUG9zaXRpb24oc2VsZWN0aW9uKSB7XG4gICAgICAgIHJldHVybiBzZWxlY3Rpb25cbiAgICAgICAgICAgIC5hdHRyKCd4JywgMClcbiAgICAgICAgICAgIC5hdHRyKCd5JywgLXRoaXMuY29uZmlnLm5vZGVTaXplIC8gMiAtIDcpXG4gICAgfVxuXG4gICAgbm9kZVBheW9mZlBvc2l0aW9uKHNlbGVjdGlvbikge1xuICAgICAgICByZXR1cm4gTGF5b3V0LnNldEhhbmdpbmdQb3NpdGlvbihzZWxlY3Rpb24pXG4gICAgICAgICAgICAuYXR0cigneCcsIDApXG4gICAgICAgICAgICAuYXR0cigneScsIHRoaXMuY29uZmlnLm5vZGVTaXplIC8gMiArIDcpXG4gICAgICAgICAgICAuYXR0cigndGV4dC1hbmNob3InLCAnbWlkZGxlJylcbiAgICB9XG5cbiAgICBub2RlQWdncmVnYXRlZFBheW9mZlBvc2l0aW9uKHNlbGVjdGlvbikge1xuICAgICAgICB2YXIgeCA9IHRoaXMuY29uZmlnLm5vZGVTaXplIC8gMiArIDc7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgc2VsZWN0aW9uXG4gICAgICAgICAgICAuYXR0cigneCcsIHgpXG4gICAgICAgICAgICAuYXR0cigneScsIGZ1bmN0aW9uKGQpe1xuICAgICAgICAgICAgICAgIGxldCBmb250U2l6ZSA9IHBhcnNlSW50KEFwcFV0aWxzLmdldEZvbnRTaXplKHRoaXMpKTtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbXMgPSBkLmRpc3BsYXlWYWx1ZSgnYWdncmVnYXRlZFBheW9mZicpO1xuICAgICAgICAgICAgICAgIGxldCBudW1iZXIgPSBVdGlscy5pc0FycmF5KGl0ZW1zKSA/IGl0ZW1zLmZpbHRlcihpdD0+aXQgIT09IHVuZGVmaW5lZCkubGVuZ3RoIDogMTtcbiAgICAgICAgICAgICAgICBpZihudW1iZXI+MSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAtdGhpcy5nZXRCQm94KCkuaGVpZ2h0LzIgKyBmb250U2l6ZS8yO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gLU1hdGgubWF4KDIsIDEuOCogc2VsZi5jb25maWcubm9kZVNpemUvZm9udFNpemUpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgc2VsZWN0aW9uLnNlbGVjdEFsbCgndHNwYW4nKS5hdHRyKCd4JywgeCk7XG4gICAgICAgIHJldHVybiBzZWxlY3Rpb247XG4gICAgICAgICAgICAvLyAuYXR0cigndGV4dC1hbmNob3InLCAnbWlkZGxlJylcbiAgICAgICAgICAgIC8vIC5hdHRyKCdkb21pbmFudC1iYXNlbGluZScsICdoYW5naW5nJylcbiAgICB9XG5cbiAgICBub2RlUHJvYmFiaWxpdHlUb0VudGVyUG9zaXRpb24oc2VsZWN0aW9uKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICByZXR1cm4gTGF5b3V0LnNldEhhbmdpbmdQb3NpdGlvbihzZWxlY3Rpb24pXG4gICAgICAgICAgICAuYXR0cigneCcsIHRoaXMuY29uZmlnLm5vZGVTaXplIC8gMiArIDcpXG4gICAgICAgICAgICAuYXR0cigneScsIGZ1bmN0aW9uKGQpe1xuICAgICAgICAgICAgICAgIGxldCBmb250U2l6ZSA9IHBhcnNlSW50KEFwcFV0aWxzLmdldEZvbnRTaXplKHRoaXMpKTtcbiAgICAgICAgICAgICAgICBsZXQgYWdncmVnYXRlZFBheW9mZnMgPSBkLmRpc3BsYXlWYWx1ZSgnYWdncmVnYXRlZFBheW9mZicpO1xuICAgICAgICAgICAgICAgIGxldCBhZ2dyZWdhdGVkUGF5b2Zmc051bWJlciA9IFV0aWxzLmlzQXJyYXkoYWdncmVnYXRlZFBheW9mZnMpID8gYWdncmVnYXRlZFBheW9mZnMuZmlsdGVyKGl0PT5pdCAhPT0gdW5kZWZpbmVkKS5sZW5ndGggOiAxO1xuICAgICAgICAgICAgICAgIGlmKGFnZ3JlZ2F0ZWRQYXlvZmZzTnVtYmVyPjEpe1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmb250U2l6ZSowLjZcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5tYXgoMiwgMS44KiBzZWxmLmNvbmZpZy5ub2RlU2l6ZS9mb250U2l6ZSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLy8gLmF0dHIoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXG4gICAgICAgICAgICAvLyAuYXR0cignZG9taW5hbnQtYmFzZWxpbmUnLCAnY2VudHJhbCcpXG4gICAgfVxuXG4gICAgbm9kZUluZGljYXRvclBvc2l0aW9uKHNlbGVjdGlvbikge1xuICAgICAgICByZXR1cm4gc2VsZWN0aW9uXG4gICAgICAgICAgICAuYXR0cigneCcsIHRoaXMuY29uZmlnLm5vZGVTaXplIC8gMiArIDgpXG4gICAgICAgICAgICAuYXR0cigneScsIC0gdGhpcy5jb25maWcubm9kZVNpemUvMilcbiAgICAgICAgICAgIC5hdHRyKCdkb21pbmFudC1iYXNlbGluZScsICdjZW50cmFsJylcbiAgICAgICAgICAgIC5hdHRyKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKVxuICAgIH1cblxuICAgIG5vZGVVbmZvbGRCdXR0b25Qb3NpdGlvbihzZWxlY3Rpb24pIHtcblxuICAgICAgICByZXR1cm4gc2VsZWN0aW9uXG4gICAgICAgICAgICAuYXR0cigneCcsIHRoaXMuY29uZmlnLm5vZGVTaXplIC8gMiArIDUpXG4gICAgICAgICAgICAuYXR0cigneScsIDApXG4gICAgICAgICAgICAuYXR0cignZG9taW5hbnQtYmFzZWxpbmUnLCAnY2VudHJhbCcpXG4gICAgfVxuXG4gICAgZWRnZUxpbmVEKGVkZ2Upe1xuICAgICAgICB2YXIgbGluZSA9IGQzLmxpbmUoKVxuICAgICAgICAgICAgLngoZD0+IGRbMF0pXG4gICAgICAgICAgICAueShkPT4gZFsxXSk7XG4gICAgICAgIC8vIC5jdXJ2ZShkMy5jdXJ2ZUNhdG11bGxSb20uYWxwaGEoMC41KSk7XG5cblxuICAgICAgICB2YXIgcGFyZW50Tm9kZSA9IGVkZ2UucGFyZW50Tm9kZTtcbiAgICAgICAgdmFyIGNoaWxkTm9kZSA9IGVkZ2UuY2hpbGROb2RlO1xuXG4gICAgICAgIHZhciBkWCA9IGNoaWxkTm9kZS5sb2NhdGlvbi54IC0gcGFyZW50Tm9kZS5sb2NhdGlvbi54O1xuICAgICAgICB2YXIgZFkgPSBjaGlsZE5vZGUubG9jYXRpb24ueSAtIHBhcmVudE5vZGUubG9jYXRpb24ueTtcblxuICAgICAgICB2YXIgc2lnbiA9IGRYPj0wID8gMSA6IC0xO1xuXG4gICAgICAgIHZhciBzbGFudFN0YXJ0WE9mZnNldCA9IE1hdGgubWluKGRYLzIsIHRoaXMuY29uZmlnLm5vZGVTaXplLzIrMTApO1xuICAgICAgICB2YXIgc2xhbnRXaWR0aCA9IE1hdGgubWluKHRoaXMuY29uZmlnLmVkZ2VTbGFudFdpZHRoTWF4LCBNYXRoLm1heChkWC8yIC0gc2xhbnRTdGFydFhPZmZzZXQsIDApKTtcblxuICAgICAgICB2YXIgcG9pbnQxID0gW3BhcmVudE5vZGUubG9jYXRpb24ueCArdGhpcy5jb25maWcubm9kZVNpemUvMiArIDEsIHBhcmVudE5vZGUubG9jYXRpb24ueV07XG4gICAgICAgIHZhciBwb2ludDIgPSBbTWF0aC5tYXgocGFyZW50Tm9kZS5sb2NhdGlvbi54K3NsYW50U3RhcnRYT2Zmc2V0LCBwb2ludDFbMF0pLCBwYXJlbnROb2RlLmxvY2F0aW9uLnldO1xuICAgICAgICB2YXIgcG9pbnQzID0gW3BhcmVudE5vZGUubG9jYXRpb24ueCtzbGFudFN0YXJ0WE9mZnNldCtzbGFudFdpZHRoLCBjaGlsZE5vZGUubG9jYXRpb24ueV07XG4gICAgICAgIHZhciBwb2ludDQgPSBbY2hpbGROb2RlLmxvY2F0aW9uLnggLSAoc2lnbiooTWF0aC5tYXgoMCwgTWF0aC5taW4odGhpcy5jb25maWcubm9kZVNpemUvMis4LCBkWC8yKSkpKSwgY2hpbGROb2RlLmxvY2F0aW9uLnldO1xuICAgICAgICAvLyB2YXIgcG9pbnQyID0gW3BhcmVudE5vZGUubG9jYXRpb24ueCtkWC8yLXNsYW50V2lkdGgvMiwgcGFyZW50Tm9kZS5sb2NhdGlvbi55XTtcbiAgICAgICAgLy8gdmFyIHBvaW50MyA9IFtjaGlsZE5vZGUubG9jYXRpb24ueC0oZFgvMi1zbGFudFdpZHRoLzIpLCBjaGlsZE5vZGUubG9jYXRpb24ueV07XG5cbiAgICAgICAgZWRnZS4kbGluZVBvaW50cyA9IFtwb2ludDEsIHBvaW50MiwgcG9pbnQzLCBwb2ludDRdO1xuICAgICAgICByZXR1cm4gbGluZShlZGdlLiRsaW5lUG9pbnRzKTtcbiAgICB9XG5cbiAgICBlZGdlUGF5b2ZmUG9zaXRpb24oc2VsZWN0aW9uKSB7XG4gICAgICAgIExheW91dC5zZXRIYW5naW5nUG9zaXRpb24oc2VsZWN0aW9uKVxuICAgICAgICAgICAgLmF0dHIoJ3gnLCBkPT5kLiRsaW5lUG9pbnRzWzJdWzBdICsgMilcbiAgICAgICAgICAgIC5hdHRyKCd5JywgZD0+ZC4kbGluZVBvaW50c1syXVsxXSArIDcpO1xuXG4gICAgICAgIHNlbGVjdGlvbi5zZWxlY3RBbGwoJ3RzcGFuJykuYXR0cigneCcsIGZ1bmN0aW9uKGQpe1xuICAgICAgICAgICAgcmV0dXJuIGQzLnNlbGVjdCh0aGlzLnBhcmVudE5vZGUpLmRhdHVtKCkuJGxpbmVQb2ludHNbMl1bMF0gKyAyXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc2VsZWN0aW9uO1xuXG4gICAgfVxuXG4gICAgZWRnZUxhYmVsUG9zaXRpb24oc2VsZWN0aW9uKSB7XG4gICAgICAgIHJldHVybiBzZWxlY3Rpb25cbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBkPT4ndHJhbnNsYXRlKCcrKGQuJGxpbmVQb2ludHNbMl1bMF0gKyAyKSsnLCcrKGQuJGxpbmVQb2ludHNbMl1bMV0gLSA3KSsnKScpXG4gICAgICAgICAgICAvLyAuYXR0cigneCcsIGQ9PmQuJGxpbmVQb2ludHNbMl1bMF0gKyAyKVxuICAgICAgICAgICAgLy8gLmF0dHIoJ3knLCBkPT5kLiRsaW5lUG9pbnRzWzJdWzFdIC0gNylcblxuICAgIH1cblxuICAgIGVkZ2VQcm9iYWJpbGl0eVBvc2l0aW9uKHNlbGVjdGlvbikge1xuICAgICAgICByZXR1cm4gTGF5b3V0LnNldEhhbmdpbmdQb3NpdGlvbihzZWxlY3Rpb24pXG4gICAgICAgICAgICAuYXR0cigneCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxlbiA9IHRoaXMuZ2V0Q29tcHV0ZWRUZXh0TGVuZ3RoKCk7XG4gICAgICAgICAgICAgICAgdmFyIG1pbiA9IGQuJGxpbmVQb2ludHNbMl1bMF0gKyAyICsgdGhpcy5wcmV2aW91c1NpYmxpbmcuY2hpbGROb2Rlc1swXS5nZXRDb21wdXRlZFRleHRMZW5ndGgoKSArIDcgKyBsZW47XG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGgubWF4KG1pbiwgZC4kbGluZVBvaW50c1szXVswXSAtIDgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hdHRyKCd5JywgZD0+ZC4kbGluZVBvaW50c1syXVsxXSArIDcpXG4gICAgfVxuXG4gICAgZ2V0TWluTWFyZ2luQmV0d2Vlbk5vZGVzKCl7XG4gICAgICByZXR1cm4gdGhpcy5jb25maWcubm9kZVNpemUgKyAzMDtcbiAgICB9XG5cblxuICAgIGdldE5vZGVNaW5YKGQpe1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIGlmKGQgJiYgZC4kcGFyZW50KXsvLyAmJiAhc2VsZi5pc05vZGVTZWxlY3RlZChkLiRwYXJlbnQpXG4gICAgICAgICAgICByZXR1cm4gZC4kcGFyZW50LmxvY2F0aW9uLnggKyBzZWxmLmdldE1pbk1hcmdpbkJldHdlZW5Ob2RlcygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzZWxmLmNvbmZpZy5ub2RlU2l6ZS8yO1xuICAgIH1cblxuICAgIGdldE5vZGVNaW5ZKGQpe1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcubm9kZVNpemUvMjtcbiAgICB9XG5cbiAgICBnZXROb2RlTWF4WChkKXtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIGlmKGQgJiYgZC5jaGlsZEVkZ2VzLmxlbmd0aCl7XG4gICAgICAgICAgICByZXR1cm4gZDMubWluKGQuY2hpbGRFZGdlcywgZT0+IWUuY2hpbGROb2RlLiRoaWRkZW4gPyBlLmNoaWxkTm9kZS5sb2NhdGlvbi54IDogOTk5OTk5OSktc2VsZi5nZXRNaW5NYXJnaW5CZXR3ZWVuTm9kZXMoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gOTk5OTk5OTtcbiAgICB9XG5cbiAgICBzZXRHcmlkV2lkdGgod2lkdGgsIHdpdGhvdXRTdGF0ZVNhdmluZyl7XG4gICAgICAgIHZhciBzZWxmPXRoaXM7XG4gICAgICAgIGlmKHRoaXMuY29uZmlnLmdyaWRXaWR0aD09PXdpZHRoKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZighd2l0aG91dFN0YXRlU2F2aW5nKXtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoe1xuICAgICAgICAgICAgICAgIGRhdGE6e1xuICAgICAgICAgICAgICAgICAgICBncmlkV2lkdGg6IHNlbGYuY29uZmlnLmdyaWRXaWR0aFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25VbmRvOiAoZGF0YSk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0R3JpZFdpZHRoKGRhdGEuZ3JpZFdpZHRoLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uUmVkbzogKGRhdGEpPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldEdyaWRXaWR0aCh3aWR0aCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbmZpZy5ncmlkV2lkdGg9d2lkdGg7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuXG4gICAgc2V0R3JpZEhlaWdodChncmlkSGVpZ2h0LCB3aXRob3V0U3RhdGVTYXZpbmcpe1xuICAgICAgICB2YXIgc2VsZj10aGlzO1xuICAgICAgICBpZih0aGlzLmNvbmZpZy5ncmlkSGVpZ2h0PT09Z3JpZEhlaWdodCl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYoIXdpdGhvdXRTdGF0ZVNhdmluZyl7XG4gICAgICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKHtcbiAgICAgICAgICAgICAgICBkYXRhOntcbiAgICAgICAgICAgICAgICAgICAgZ3JpZEhlaWdodDogc2VsZi5jb25maWcuZ3JpZEhlaWdodFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25VbmRvOiAoZGF0YSk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0R3JpZEhlaWdodChkYXRhLmdyaWRIZWlnaHQsIHRydWUpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25SZWRvOiAoZGF0YSk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0R3JpZEhlaWdodChncmlkSGVpZ2h0LCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29uZmlnLmdyaWRIZWlnaHQ9Z3JpZEhlaWdodDtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG5cbiAgICBzZXROb2RlU2l6ZShub2RlU2l6ZSwgd2l0aG91dFN0YXRlU2F2aW5nKXtcbiAgICAgICAgdmFyIHNlbGY9dGhpcztcbiAgICAgICAgaWYodGhpcy5jb25maWcubm9kZVNpemU9PT1ub2RlU2l6ZSl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYoIXdpdGhvdXRTdGF0ZVNhdmluZyl7XG4gICAgICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKHtcbiAgICAgICAgICAgICAgICBkYXRhOntcbiAgICAgICAgICAgICAgICAgICAgbm9kZVNpemU6IHNlbGYuY29uZmlnLm5vZGVTaXplXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvblVuZG86IChkYXRhKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXROb2RlU2l6ZShkYXRhLm5vZGVTaXplLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uUmVkbzogKGRhdGEpPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldE5vZGVTaXplKG5vZGVTaXplLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29uZmlnLm5vZGVTaXplPW5vZGVTaXplO1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICBpZih0aGlzLmlzTWFudWFsTGF5b3V0KCkpe1xuICAgICAgICAgICAgdGhpcy5maXROb2Rlc0luUGxvdHRpbmdSZWdpb24oc2VsZi5kYXRhLmdldFJvb3RzKCkpO1xuICAgICAgICAgICAgdGhpcy50cmVlRGVzaWduZXIucmVkcmF3KHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0RWRnZVNsYW50V2lkdGhNYXgod2lkdGgsIHdpdGhvdXRTdGF0ZVNhdmluZyl7XG4gICAgICAgIHZhciBzZWxmPXRoaXM7XG4gICAgICAgIGlmKHRoaXMuY29uZmlnLmVkZ2VTbGFudFdpZHRoTWF4PT09d2lkdGgpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmKCF3aXRob3V0U3RhdGVTYXZpbmcpe1xuICAgICAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSh7XG4gICAgICAgICAgICAgICAgZGF0YTp7XG4gICAgICAgICAgICAgICAgICAgIGVkZ2VTbGFudFdpZHRoTWF4OiBzZWxmLmNvbmZpZy5lZGdlU2xhbnRXaWR0aE1heFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25VbmRvOiAoZGF0YSk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0RWRnZVNsYW50V2lkdGhNYXgoZGF0YS5lZGdlU2xhbnRXaWR0aE1heCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvblJlZG86IChkYXRhKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRFZGdlU2xhbnRXaWR0aE1heCh3aWR0aCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbmZpZy5lZGdlU2xhbnRXaWR0aE1heD13aWR0aDtcbiAgICAgICAgdGhpcy50cmVlRGVzaWduZXIucmVkcmF3KHRydWUpO1xuICAgIH1cblxuICAgIGF1dG9MYXlvdXQodHlwZSwgd2l0aG91dFN0YXRlU2F2aW5nKXtcbiAgICAgICAgdmFyIHNlbGY9dGhpcztcblxuXG5cbiAgICAgICAgaWYoIXdpdGhvdXRTdGF0ZVNhdmluZyl7XG4gICAgICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKHtcbiAgICAgICAgICAgICAgICBkYXRhOntcbiAgICAgICAgICAgICAgICAgICAgbmV3TGF5b3V0OiB0eXBlLFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50TGF5b3V0OiBzZWxmLmNvbmZpZy50eXBlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvblVuZG86IChkYXRhKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jb25maWcudHlwZSA9IGRhdGEuY3VycmVudExheW91dDtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5fZmlyZU9uQXV0b0xheW91dENoYW5nZWRDYWxsYmFja3MoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uUmVkbzogKGRhdGEpPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmF1dG9MYXlvdXQoZGF0YS5uZXdMYXlvdXQsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29uZmlnLnR5cGUgPSB0eXBlO1xuICAgICAgICBpZighdGhpcy5kYXRhLm5vZGVzLmxlbmd0aCl7XG4gICAgICAgICAgICB0aGlzLl9maXJlT25BdXRvTGF5b3V0Q2hhbmdlZENhbGxiYWNrcygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHByZXZUcmVlTWF4WSA9IHNlbGYuZ2V0Tm9kZU1pblkoKTtcbiAgICAgICAgdGhpcy5kYXRhLmdldFJvb3RzKCkuZm9yRWFjaChyPT57XG4gICAgICAgICAgICB2YXIgcm9vdCA9IGQzLmhpZXJhcmNoeShyLCBkPT57XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuY2hpbGRFZGdlcy5maWx0ZXIoZT0+IWUuJGhpZGRlbikubWFwKGU9PmUuY2hpbGROb2RlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyByb290LnNvcnQoKGEsYik9PnNlbGYubm9kZVR5cGVPcmRlclthLmRhdGEudHlwZV0tc2VsZi5ub2RlVHlwZU9yZGVyW2IuZGF0YS50eXBlXSk7XG4gICAgICAgICAgICByb290LnNvcnQoKGEsYik9PmEuZGF0YS5sb2NhdGlvbi55IC0gYi5kYXRhLmxvY2F0aW9uLnkpO1xuXG5cbiAgICAgICAgICAgIHZhciBsYXlvdXQ7XG4gICAgICAgICAgICBpZih0eXBlPT09J2NsdXN0ZXInKXtcbiAgICAgICAgICAgICAgICBsYXlvdXQgPSBkMy5jbHVzdGVyKCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBsYXlvdXQgPSBkMy50cmVlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsYXlvdXQubm9kZVNpemUoW3NlbGYuY29uZmlnLmdyaWRIZWlnaHQsIHNlbGYuY29uZmlnLmdyaWRXaWR0aF0pO1xuICAgICAgICAgICAgbGF5b3V0LnNlcGFyYXRpb24oc2VsZi5ub2RlU2VwYXJhdGlvbik7XG5cbiAgICAgICAgICAgIGxheW91dChyb290KTtcbiAgICAgICAgICAgIHZhciBtaW5ZID0gOTk5OTk5OTk5O1xuICAgICAgICAgICAgcm9vdC5lYWNoKGQ9PntcbiAgICAgICAgICAgICAgICBtaW5ZID0gTWF0aC5taW4obWluWSwgZC54KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB2YXIgZHkgPSByb290LnggLSBtaW5ZICsgcHJldlRyZWVNYXhZO1xuICAgICAgICAgICAgdmFyIGR4ID0gc2VsZi5nZXROb2RlTWluWCgpO1xuICAgICAgICAgICAgdmFyIG1heFk9MDtcbiAgICAgICAgICAgIHJvb3QuZWFjaChkPT57XG4gICAgICAgICAgICAgICAgZC5kYXRhLmxvY2F0aW9uLnggPSBkLnkgKyBkeDtcbiAgICAgICAgICAgICAgICBkLmRhdGEubG9jYXRpb24ueSA9IGQueCArIGR5O1xuXG4gICAgICAgICAgICAgICAgbWF4WSA9IE1hdGgubWF4KG1heFksIGQuZGF0YS5sb2NhdGlvbi55KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBwcmV2VHJlZU1heFkgPSBtYXhZICsgc2VsZi5jb25maWcubm9kZVNpemUrc2VsZi50cmVlTWFyZ2luO1xuICAgICAgICB9KTtcblxuXG4gICAgICAgIC8vIHRoaXMudHJhbnNpdGlvbiA9IHRydWU7XG4gICAgICAgIHRoaXMudHJlZURlc2lnbmVyLnJlZHJhdyh0cnVlKTtcbiAgICAgICAgLy8gdGhpcy50cmFuc2l0aW9uID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5fZmlyZU9uQXV0b0xheW91dENoYW5nZWRDYWxsYmFja3MoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZml0Tm9kZXNJblBsb3R0aW5nUmVnaW9uKG5vZGVzKXtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgdG9wWSA9IGQzLm1pbihub2Rlcywgbj0+bi5sb2NhdGlvbi55KTtcbiAgICAgICAgdmFyIG1pblkgPSBzZWxmLmdldE5vZGVNaW5ZKCk7XG4gICAgICAgIHZhciBkeSA9IHRvcFkgLSBtaW5ZO1xuXG4gICAgICAgIHZhciBtaW5YID0gZDMubWluKG5vZGVzLCBuPT5uLmxvY2F0aW9uLngpO1xuICAgICAgICB2YXIgZHggPSBtaW5YIC0gc2VsZi5nZXROb2RlTWluWCgpO1xuXG4gICAgICAgIGlmKGR5PDAgfHwgIGR4PDApe1xuICAgICAgICAgICAgbm9kZXMuZm9yRWFjaChuPT5uLm1vdmUoLWR4LCAtZHkpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1vdmVOb2Rlcyhub2RlcywgZHgsIGR5LCBwaXZvdCl7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIGxpbWl0ID0gc2VsZi5jb25maWcubGltaXROb2RlUG9zaXRpb25pbmc7XG4gICAgICAgIGlmKGxpbWl0KXtcbiAgICAgICAgICAgIGlmKGR4PDApe1xuICAgICAgICAgICAgICAgIG5vZGVzLnNvcnQoKGEsYik9PmEubG9jYXRpb24ueC1iLmxvY2F0aW9uLngpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgbm9kZXMuc29ydCgoYSxiKT0+Yi5sb2NhdGlvbi54LWEubG9jYXRpb24ueCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIHZhciBtaW5ZID0gZDMubWluKG5vZGVzLCBkPT5kLmxvY2F0aW9uLnkpO1xuICAgICAgICBpZihtaW5ZICsgZHkgPCBzZWxmLmdldE5vZGVNaW5ZKCkpe1xuICAgICAgICAgICAgZHkgPSBzZWxmLmdldE5vZGVNaW5ZKCkgLSBtaW5ZO1xuICAgICAgICB9XG5cbiAgICAgICAgbm9kZXMuZm9yRWFjaChkPT57XG4gICAgICAgICAgICBpZihsaW1pdCl7XG4gICAgICAgICAgICAgICAgTGF5b3V0LmJhY2t1cE5vZGVMb2NhdGlvbihkKTtcbiAgICAgICAgICAgICAgICB2YXIgbWluWCA9IHNlbGYuZ2V0Tm9kZU1pblgoZCk7XG4gICAgICAgICAgICAgICAgdmFyIG1heFggPSBzZWxmLmdldE5vZGVNYXhYKGQpO1xuXG4gICAgICAgICAgICAgICAgZC5sb2NhdGlvbi54ID0gTWF0aC5taW4oTWF0aC5tYXgoZC5sb2NhdGlvbi54K2R4LCBtaW5YKSwgbWF4WCk7XG4gICAgICAgICAgICAgICAgZC5sb2NhdGlvbi55ICs9IGR5O1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgZC5sb2NhdGlvbi54ICs9ZHg7XG4gICAgICAgICAgICAgICAgZC5sb2NhdGlvbi55ICs9IGR5O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgdmFyIHJldmVydFggPSBwaXZvdCAmJiBzZWxmLmNvbmZpZy5saW1pdE5vZGVQb3NpdGlvbmluZyAmJiAocGl2b3QubG9jYXRpb24ueCA9PT0gcGl2b3QuJGxvY2F0aW9uLngpO1xuXG4gICAgICAgIG5vZGVzLmZvckVhY2goZD0+e1xuICAgICAgICAgICAgaWYocmV2ZXJ0WCl7XG4gICAgICAgICAgICAgICAgZC5sb2NhdGlvbi54ID0gZC4kbG9jYXRpb24ueDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYudHJlZURlc2lnbmVyLnVwZGF0ZU5vZGVQb3NpdGlvbihkKTtcbiAgICAgICAgfSk7XG5cblxuICAgIH1cblxuICAgIHN0YXRpYyBiYWNrdXBOb2RlTG9jYXRpb24obm9kZSkge1xuICAgICAgICBub2RlLiRsb2NhdGlvbiA9IG5ldyBtb2RlbC5Qb2ludChub2RlLmxvY2F0aW9uKTtcbiAgICB9XG5cbiAgICBfZmlyZU9uQXV0b0xheW91dENoYW5nZWRDYWxsYmFja3MoKXtcbiAgICAgICAgdGhpcy5vbkF1dG9MYXlvdXRDaGFuZ2VkLmZvckVhY2goYz0+Yyh0aGlzLmNvbmZpZy50eXBlKSk7XG4gICAgfVxuXG4gICAgc3RhdGljIHNldEhhbmdpbmdQb3NpdGlvbihzZWxlY3Rpb24pe1xuICAgICAgICAvLyB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAvLyAgICAgc2VsZWN0aW9uLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgLy8gICAgICAgICB2YXIgaCA9ICB0aGlzLmdldEJCb3goKS5oZWlnaHQ7XG4gICAgICAgIC8vICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLmF0dHIoJ2R5JywgaCk7XG4gICAgICAgIC8vICAgICB9KTtcbiAgICAgICAgLy8gfSwwKTtcblxuICAgICAgICBpZihBcHBVdGlscy5pc0hpZGRlbihzZWxlY3Rpb24ubm9kZSgpKSl7IC8vIHNldHRpbmcgaGFuZ2luZyBwb3NpdGlvbiBvZiBoaWRkZW4gZWxlbWVudHMgZmFpbHMgb24gZmlyZWZveFxuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdGlvbjtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgc2VsZWN0aW9uLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciBoID0gIHRoaXMuZ2V0QkJveCgpLmhlaWdodDtcbiAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5hdHRyKCdkeScsICcwLjc1ZW0nKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGVjdGlvbjtcbiAgICB9XG5cbn1cblxuXG4iLCJpbXBvcnQge0FwcFV0aWxzfSBmcm9tICcuL2FwcC11dGlscydcbmltcG9ydCAqIGFzIGQzIGZyb20gJy4vZDMnXG5pbXBvcnQge0NvbnRleHRNZW51fSBmcm9tICcuL2NvbnRleHQtbWVudS9jb250ZXh0LW1lbnUnXG5cbmV4cG9ydCBjbGFzcyBOb2RlRHJhZ0hhbmRsZXJ7XG5cbiAgICB0cmVlRGVzaWduZXI7XG4gICAgZGF0YTtcbiAgICBjb25maWc7XG5cbiAgICBkcmFnO1xuXG5cbiAgICBjb25zdHJ1Y3Rvcih0cmVlRGVzaWduZXIsIGRhdGEpe1xuICAgICAgICB0aGlzLnRyZWVEZXNpZ25lciA9IHRyZWVEZXNpZ25lcjtcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcblxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuZHJhZyA9IGQzLmRyYWcoKVxuICAgICAgICAgICAgLnN1YmplY3QoZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICAgIGlmKGQ9PW51bGwpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IGV2ZW50LngsXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiBldmVudC55XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciB0ID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IHQuYXR0cihcInhcIikgKyBBcHBVdGlscy5nZXRUcmFuc2xhdGlvbih0LmF0dHIoXCJ0cmFuc2Zvcm1cIikpWzBdLFxuICAgICAgICAgICAgICAgICAgICB5OiB0LmF0dHIoXCJ5XCIpICsgQXBwVXRpbHMuZ2V0VHJhbnNsYXRpb24odC5hdHRyKFwidHJhbnNmb3JtXCIpKVsxXVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKFwic3RhcnRcIiwgZnVuY3Rpb24oZCl7XG4gICAgICAgICAgICAgICAgc2VsZi5kcmFnU3RhcnRlZC5jYWxsKHRoaXMsZCwgc2VsZilcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oXCJkcmFnXCIsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5vbkRyYWcuY2FsbCh0aGlzLCBkLCBzZWxmKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oXCJlbmRcIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmRyYWdFbmRlZC5jYWxsKHRoaXMsIGQsIHNlbGYpO1xuICAgICAgICAgICAgfSlcbiAgICB9XG5cblxuICAgIGRyYWdTdGFydGVkKGQsc2VsZikge1xuICAgICAgICBpZihzZWxmLmlnbm9yZURyYWcpe1xuICAgICAgICAgICAgc2VsZi5pZ25vcmVEcmFnPWZhbHNlO1xuICAgICAgICAgICAgc2VsZi5pZ25vcmVkRHJhZz10cnVlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHNlbGYuaWdub3JlZERyYWc9ZmFsc2U7XG5cbiAgICAgICAgLy8gc2VsZi50cmVlRGVzaWduZXIubGF5b3V0LmRpc2FibGVBdXRvTGF5b3V0KCk7XG4gICAgICAgIENvbnRleHRNZW51LmhpZGUoKTtcbiAgICAgICAgdmFyIG5vZGUgPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgIGlmKCFub2RlLmNsYXNzZWQoXCJzZWxlY3RlZFwiKSl7XG4gICAgICAgICAgICBzZWxmLnRyZWVEZXNpZ25lci5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2VsZi50cmVlRGVzaWduZXIuc2VsZWN0Tm9kZShkKTtcbiAgICAgICAgbm9kZS5jbGFzc2VkKFwic2VsZWN0ZWQgZHJhZ2dpbmdcIiwgdHJ1ZSk7XG4gICAgICAgIHNlbGYuc2VsZWN0ZWROb2RlcyA9IHNlbGYudHJlZURlc2lnbmVyLmdldFNlbGVjdGVkTm9kZXModHJ1ZSk7XG4gICAgICAgIHNlbGYucHJldkRyYWdFdmVudCA9IGQzLmV2ZW50O1xuICAgICAgICBzZWxmLmRyYWdFdmVudENvdW50ID0gMDtcbiAgICB9XG5cbiAgICBvbkRyYWcoZHJhZ2dlZE5vZGUsIHNlbGYpe1xuICAgICAgICBpZihzZWxmLmlnbm9yZWREcmFnKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHNlbGYuZHJhZ0V2ZW50Q291bnQ9PTIpe1xuICAgICAgICAgICAgc2VsZi5kYXRhLnNhdmVTdGF0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHNlbGYuZHJhZ0V2ZW50Q291bnQrKztcbiAgICAgICAgaWYoc2VsZi5zZWxlY3RlZE5vZGVzLmxlbmd0aD41ICYmIHNlbGYuZHJhZ0V2ZW50Q291bnQlMiE9MSl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZHggPSBkMy5ldmVudC54IC0gc2VsZi5wcmV2RHJhZ0V2ZW50Lng7XG4gICAgICAgIHZhciBkeSA9IGQzLmV2ZW50LnktIHNlbGYucHJldkRyYWdFdmVudC55O1xuICAgICAgICBzZWxmLnRyZWVEZXNpZ25lci5sYXlvdXQubW92ZU5vZGVzKHNlbGYuc2VsZWN0ZWROb2RlcywgZHgsIGR5LCBkcmFnZ2VkTm9kZSk7XG5cblxuICAgICAgICBzZWxmLnByZXZEcmFnRXZlbnQgPSBkMy5ldmVudDtcbiAgICAgICAgc2VsZi50cmVlRGVzaWduZXIucmVkcmF3RWRnZXMoKTtcbiAgICAgICAgc2VsZi50cmVlRGVzaWduZXIudXBkYXRlUGxvdHRpbmdSZWdpb25TaXplKCk7XG4gICAgfVxuXG4gICAgZHJhZ0VuZGVkKGRyYWdnZWROb2RlLCBzZWxmKXtcbiAgICAgICAgdmFyIG5vZGUgPSBkMy5zZWxlY3QodGhpcykuY2xhc3NlZChcImRyYWdnaW5nXCIsIGZhbHNlKTtcbiAgICAgICAgaWYoc2VsZi5pZ25vcmVkRHJhZyl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi50cmVlRGVzaWduZXIubGF5b3V0LnVwZGF0ZShkcmFnZ2VkTm9kZSlcbiAgICB9XG5cbiAgICBjYW5jZWxEcmFnKCl7XG4gICAgICAgIHRoaXMuaWdub3JlRHJhZyA9IHRydWU7XG4gICAgfVxuXG59XG5cblxuIiwidmFyIGVwc2lsb24gPSAxZS0xMjtcbnZhciBwaSA9IE1hdGguUEk7XG52YXIgaGFsZlBpID0gcGkgLyAyO1xudmFyIHRhdSA9IDIgKiBwaTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIC8qZHJhdzogZnVuY3Rpb24oY29udGV4dCwgc2l6ZSkge1xuICAgICAgICB2YXIgciA9IE1hdGguc3FydChzaXplIC8gcGkpO1xuICAgICAgICBjb250ZXh0Lm1vdmVUbyhyLCAwKTtcbiAgICAgICAgY29udGV4dC5hcmMoMCwgMCwgciwgMCwgdGF1KTtcbiAgICB9Ki9cbiAgICBkcmF3OiBmdW5jdGlvbihjb250ZXh0LCBzaXplKSB7XG5cbiAgICAgICAgdmFyIHIgPSBNYXRoLnNxcnQoc2l6ZSAvIHBpKTtcbiAgICAgICAgdmFyIGRpc3QgPTAuNTUyMjg0NzQ5ODMxICogcjtcblxuICAgICAgICBjb250ZXh0Lm1vdmVUbygtciwgMClcbiAgICAgICAgLy8gY29udGV4dC5saW5lVG8oMipyLCAyKnIpXG4gICAgICAgIC8vIGNvbnRleHQuYmV6aWVyQ3VydmVUbygtciwgLWRpc3QsIC1kaXN0LCAtciwgMCwtcik7XG4gICAgICAgIGNvbnRleHQuYmV6aWVyQ3VydmVUbygtciwgLWRpc3QsIC1kaXN0LCAtciwgMCwtcik7XG5cbiAgICAgICAgY29udGV4dC5iZXppZXJDdXJ2ZVRvKGRpc3QsIC1yLCByLCAtZGlzdCwgciwwKTtcblxuICAgICAgICBjb250ZXh0LmJlemllckN1cnZlVG8ociwgZGlzdCwgZGlzdCwgciwgMCwgcik7XG5cbiAgICAgICAgY29udGV4dC5iZXppZXJDdXJ2ZVRvKC1kaXN0LCByLCAtciwgZGlzdCwgLXIsIDApO1xuICAgIH1cbn07XG4iLCJ2YXIgc3FydDMgPSBNYXRoLnNxcnQoMyk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBkcmF3OiBmdW5jdGlvbihjb250ZXh0LCBzaXplKSB7XG4gICAgICAgIHZhciByID0gTWF0aC5zcXJ0KHNpemUgLyBNYXRoLlBJKTtcbiAgICAgICAgY29udGV4dC5tb3ZlVG8oLXIsIDApO1xuICAgICAgICBjb250ZXh0LmxpbmVUbygwLjkqciwgLXIpO1xuICAgICAgICBjb250ZXh0LmxpbmVUbygwLjkqciwgcik7XG4gICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgfVxufTtcbiIsImltcG9ydCB7VXRpbHN9IGZyb20gXCJzZC11dGlsc1wiO1xuaW1wb3J0IHtpMThufSBmcm9tICcuL2kxOG4vaTE4bidcblxuZXhwb3J0IGNsYXNzIFRlbXBsYXRlc3tcblxuICAgIHN0YXRpYyBncm93bCA9IHJlcXVpcmUoJy4vdGVtcGxhdGVzL2dyb3dsX21lc3NhZ2UuaHRtbCcpO1xuXG4gICAgc3RhdGljIGdldCh0ZW1wbGF0ZU5hbWUsIHZhcmlhYmxlcyl7XG4gICAgICAgIHZhciBjb21waWxlZCA9IFV0aWxzLnRlbXBsYXRlKFRlbXBsYXRlc1t0ZW1wbGF0ZU5hbWVdLHsgJ2ltcG9ydHMnOiB7ICdpMThuJzogaTE4biwgJ1RlbXBsYXRlcyc6IFRlbXBsYXRlcywgJ2luY2x1ZGUnOiBmdW5jdGlvbihuLCB2KSB7cmV0dXJuIFRlbXBsYXRlcy5nZXQobiwgdil9IH0gfSk7XG4gICAgICAgIGlmKHZhcmlhYmxlcyl7XG4gICAgICAgICAgICB2YXJpYWJsZXMudmFyaWFibGVzID0gdmFyaWFibGVzO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHZhcmlhYmxlcyA9IHt2YXJpYWJsZXM6e319XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbXBpbGVkKHZhcmlhYmxlcylcblxuICAgIH1cblxuICAgIHN0YXRpYyBzdHlsZVJ1bGUoc2VsZWN0b3IsIHByb3BzKXtcbiAgICAgICAgdmFyIHMgPSBzZWxlY3RvcisgJ3snO1xuICAgICAgICBwcm9wcy5mb3JFYWNoKHA9PiBzKz1UZW1wbGF0ZXMuc3R5bGVQcm9wKHBbMF0sIHBbMV0pKTtcbiAgICAgICAgcys9J30gJztcbiAgICAgICAgcmV0dXJuIHM7XG4gICAgfVxuICAgIHN0YXRpYyBzdHlsZVByb3Aoc3R5bGVOYW1lLCB2YXJpYWJsZU5hbWUpe1xuICAgICAgICByZXR1cm4gIHN0eWxlTmFtZSsnOiA8JT0gJyt2YXJpYWJsZU5hbWUrJyAlPjsgJ1xuICAgIH1cblxuICAgIHN0YXRpYyB0cmVlRGVzaWduZXJTZWxlY3RvciA9ICdzdmcuc2QtdHJlZS1kZXNpZ25lcic7XG4gICAgc3RhdGljIG5vZGVTZWxlY3Rvcih0eXBlLCBjbGF6eil7XG4gICAgICAgIHZhciBzID0gVGVtcGxhdGVzLnRyZWVEZXNpZ25lclNlbGVjdG9yKycgLm5vZGUnO1xuICAgICAgICBpZih0eXBlKXtcbiAgICAgICAgICAgIHMrPScuJyt0eXBlKyctbm9kZSc7XG4gICAgICAgIH1cbiAgICAgICAgaWYoY2xhenope1xuICAgICAgICAgICAgcys9Jy4nK2NsYXp6O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzO1xuICAgIH1cbiAgICBzdGF0aWMgZWRnZVNlbGVjdG9yKGNsYXp6KXtcbiAgICAgICAgdmFyIHMgPSBUZW1wbGF0ZXMudHJlZURlc2lnbmVyU2VsZWN0b3IrJyAuZWRnZSc7XG4gICAgICAgIGlmKGNsYXp6KXtcbiAgICAgICAgICAgIHMrPScuJytjbGF6ejtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcztcbiAgICB9XG5cbiAgICBzdGF0aWMgdHJlZURlc2lnbmVyU3R5bGVzID1cblxuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy50cmVlRGVzaWduZXJTZWxlY3RvcixbXG4gICAgICAgICAgICBbJ2ZvbnQtc2l6ZScsICdmb250U2l6ZSddLFxuICAgICAgICAgICAgWydmb250LWZhbWlseScsICdmb250RmFtaWx5J10sXG4gICAgICAgICAgICBbJ2ZvbnQtd2VpZ2h0JywgJ2ZvbnRXZWlnaHQnXSxcbiAgICAgICAgICAgIFsnZm9udC1zdHlsZScsICdmb250U3R5bGUnXVxuICAgICAgICBdKStcbiAgICAgICAgLy8gICBub2RlXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLm5vZGVTZWxlY3RvcigpKycgcGF0aCcsW1xuICAgICAgICAgICAgWydmaWxsJywgJ25vZGUuZmlsbCddLFxuICAgICAgICAgICAgWydzdHJva2Utd2lkdGgnLCAnbm9kZS5zdHJva2VXaWR0aCddXG4gICAgICAgIF0pK1xuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5ub2RlU2VsZWN0b3IoJ2RlY2lzaW9uJywgJ29wdGltYWwnKSsnIHBhdGgsICcrVGVtcGxhdGVzLm5vZGVTZWxlY3RvcignY2hhbmNlJywgJ29wdGltYWwnKSsnIHBhdGgsJyArVGVtcGxhdGVzLm5vZGVTZWxlY3RvcigndGVybWluYWwnLCAnb3B0aW1hbCcpKycgcGF0aCcsW1xuICAgICAgICAgICAgWydzdHJva2UnLCAnbm9kZS5vcHRpbWFsLnN0cm9rZSddLFxuICAgICAgICAgICAgWydzdHJva2Utd2lkdGgnLCAnbm9kZS5vcHRpbWFsLnN0cm9rZVdpZHRoJ11cbiAgICAgICAgXSkrXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLm5vZGVTZWxlY3RvcigpKycgLmxhYmVsJyxbXG4gICAgICAgICAgICBbJ2ZvbnQtc2l6ZScsICdub2RlLmxhYmVsLmZvbnRTaXplJ10sXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnbm9kZS5sYWJlbC5jb2xvciddXG4gICAgICAgIF0pK1xuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5ub2RlU2VsZWN0b3IoKSsnIC5wYXlvZmYnLFtcbiAgICAgICAgICAgIFsnZm9udC1zaXplJywgJ25vZGUucGF5b2ZmLmZvbnRTaXplJ10sXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnbm9kZS5wYXlvZmYuY29sb3InXSxcbiAgICAgICAgXSkrXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLm5vZGVTZWxlY3RvcigpKycgLnBheW9mZi5uZWdhdGl2ZScsW1xuICAgICAgICAgICAgWydmaWxsJywgJ25vZGUucGF5b2ZmLm5lZ2F0aXZlQ29sb3InXSxcbiAgICAgICAgXSkrXG5cbiAgICAgICAgLy8gICAgZGVjaXNpb24gbm9kZVxuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5ub2RlU2VsZWN0b3IoJ2RlY2lzaW9uJykrJyBwYXRoJyxbXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnbm9kZS5kZWNpc2lvbi5maWxsJ10sXG4gICAgICAgICAgICBbJ3N0cm9rZScsICdub2RlLmRlY2lzaW9uLnN0cm9rZSddXG4gICAgICAgIF0pK1xuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5ub2RlU2VsZWN0b3IoJ2RlY2lzaW9uJywgJ3NlbGVjdGVkJykrJyBwYXRoJyxbXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnbm9kZS5kZWNpc2lvbi5zZWxlY3RlZC5maWxsJ11cbiAgICAgICAgXSkrXG5cbiAgICAgICAgLy8gICAgY2hhbmNlIG5vZGVcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCdjaGFuY2UnKSsnIHBhdGgnLFtcbiAgICAgICAgICAgIFsnZmlsbCcsICdub2RlLmNoYW5jZS5maWxsJ10sXG4gICAgICAgICAgICBbJ3N0cm9rZScsICdub2RlLmNoYW5jZS5zdHJva2UnXVxuICAgICAgICBdKStcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCdjaGFuY2UnLCAnc2VsZWN0ZWQnKSsnIHBhdGgnLFtcbiAgICAgICAgICAgIFsnZmlsbCcsICdub2RlLmNoYW5jZS5zZWxlY3RlZC5maWxsJ11cbiAgICAgICAgXSkrXG5cbiAgICAgICAgLy8gICAgdGVybWluYWwgbm9kZVxuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5ub2RlU2VsZWN0b3IoJ3Rlcm1pbmFsJykrJyBwYXRoJyxbXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnbm9kZS50ZXJtaW5hbC5maWxsJ10sXG4gICAgICAgICAgICBbJ3N0cm9rZScsICdub2RlLnRlcm1pbmFsLnN0cm9rZSddXG4gICAgICAgIF0pK1xuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5ub2RlU2VsZWN0b3IoJ3Rlcm1pbmFsJywgJ3NlbGVjdGVkJykrJyBwYXRoJyxbXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnbm9kZS50ZXJtaW5hbC5zZWxlY3RlZC5maWxsJ11cbiAgICAgICAgXSkrXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLm5vZGVTZWxlY3RvcigndGVybWluYWwnKSsnIC5hZ2dyZWdhdGVkLXBheW9mZicsW1xuICAgICAgICAgICAgWydmb250LXNpemUnLCAnbm9kZS50ZXJtaW5hbC5wYXlvZmYuZm9udFNpemUnXSxcbiAgICAgICAgICAgIFsnZmlsbCcsICdub2RlLnRlcm1pbmFsLnBheW9mZi5jb2xvciddLFxuICAgICAgICBdKStcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCd0ZXJtaW5hbCcpKycgLmFnZ3JlZ2F0ZWQtcGF5b2ZmLm5lZ2F0aXZlJyxbXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnbm9kZS50ZXJtaW5hbC5wYXlvZmYubmVnYXRpdmVDb2xvciddLFxuICAgICAgICBdKStcblxuXG4gICAgICAgIC8vcHJvYmFiaWxpdHlcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMudHJlZURlc2lnbmVyU2VsZWN0b3IrJyAubm9kZSAucHJvYmFiaWxpdHktdG8tZW50ZXIsICcrVGVtcGxhdGVzLnRyZWVEZXNpZ25lclNlbGVjdG9yKycgLmVkZ2UgLnByb2JhYmlsaXR5JyxbXG4gICAgICAgICAgICBbJ2ZvbnQtc2l6ZScsICdwcm9iYWJpbGl0eS5mb250U2l6ZSddLFxuICAgICAgICAgICAgWydmaWxsJywgJ3Byb2JhYmlsaXR5LmNvbG9yJ11cbiAgICAgICAgXSkrXG5cbiAgICAgICAgLy9lZGdlXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLmVkZ2VTZWxlY3RvcigpKycgcGF0aCcsW1xuICAgICAgICAgICAgWydzdHJva2UnLCAnZWRnZS5zdHJva2UnXSxcbiAgICAgICAgICAgIFsnc3Ryb2tlLXdpZHRoJywgJ2VkZ2Uuc3Ryb2tlV2lkdGgnXVxuICAgICAgICBdKStcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMudHJlZURlc2lnbmVyU2VsZWN0b3IrJyBtYXJrZXIjYXJyb3cgcGF0aCcsW1xuICAgICAgICAgICAgWydmaWxsJywgJ2VkZ2Uuc3Ryb2tlJ10sXG4gICAgICAgIF0pK1xuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5lZGdlU2VsZWN0b3IoJ29wdGltYWwnKSsnIHBhdGgnLFtcbiAgICAgICAgICAgIFsnc3Ryb2tlJywgJ2VkZ2Uub3B0aW1hbC5zdHJva2UnXSxcbiAgICAgICAgICAgIFsnc3Ryb2tlLXdpZHRoJywgJ2VkZ2Uub3B0aW1hbC5zdHJva2VXaWR0aCddXG4gICAgICAgIF0pK1xuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy50cmVlRGVzaWduZXJTZWxlY3RvcisnIG1hcmtlciNhcnJvdy1vcHRpbWFsIHBhdGgnLFtcbiAgICAgICAgICAgIFsnZmlsbCcsICdlZGdlLm9wdGltYWwuc3Ryb2tlJ10sXG4gICAgICAgIF0pK1xuXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLmVkZ2VTZWxlY3Rvcignc2VsZWN0ZWQnKSsnIHBhdGgnLFtcbiAgICAgICAgICAgIFsnc3Ryb2tlJywgJ2VkZ2Uuc2VsZWN0ZWQuc3Ryb2tlJ10sXG4gICAgICAgICAgICBbJ3N0cm9rZS13aWR0aCcsICdlZGdlLnNlbGVjdGVkLnN0cm9rZVdpZHRoJ11cbiAgICAgICAgXSkrXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLnRyZWVEZXNpZ25lclNlbGVjdG9yKycgbWFya2VyI2Fycm93LXNlbGVjdGVkIHBhdGgnLFtcbiAgICAgICAgICAgIFsnZmlsbCcsICdlZGdlLnNlbGVjdGVkLnN0cm9rZSddLFxuICAgICAgICBdKStcblxuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5lZGdlU2VsZWN0b3IoKSsnIC5sYWJlbCcsW1xuICAgICAgICAgICAgWydmb250LXNpemUnLCAnZWRnZS5sYWJlbC5mb250U2l6ZSddLFxuICAgICAgICAgICAgWydmaWxsJywgJ2VkZ2UubGFiZWwuY29sb3InXVxuICAgICAgICBdKStcblxuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5lZGdlU2VsZWN0b3IoKSsnIC5wYXlvZmYnLFtcbiAgICAgICAgICAgIFsnZm9udC1zaXplJywgJ2VkZ2UucGF5b2ZmLmZvbnRTaXplJ10sXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnZWRnZS5wYXlvZmYuY29sb3InXSxcbiAgICAgICAgXSkrXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLmVkZ2VTZWxlY3RvcigpKycgLnBheW9mZi5uZWdhdGl2ZScsW1xuICAgICAgICAgICAgWydmaWxsJywgJ2VkZ2UucGF5b2ZmLm5lZ2F0aXZlQ29sb3InXSxcbiAgICAgICAgXSkrXG5cbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMudHJlZURlc2lnbmVyU2VsZWN0b3IrJyAuc2QtdGl0bGUtY29udGFpbmVyIHRleHQuc2QtdGl0bGUnLFtcbiAgICAgICAgICAgIFsnZm9udC1zaXplJywgJ3RpdGxlLmZvbnRTaXplJ10sXG4gICAgICAgICAgICBbJ2ZvbnQtd2VpZ2h0JywgJ3RpdGxlLmZvbnRXZWlnaHQnXSxcbiAgICAgICAgICAgIFsnZm9udC1zdHlsZScsICd0aXRsZS5mb250U3R5bGUnXSxcbiAgICAgICAgICAgIFsnZmlsbCcsICd0aXRsZS5jb2xvciddXG4gICAgICAgIF0pICtcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMudHJlZURlc2lnbmVyU2VsZWN0b3IrJyAuc2QtdGl0bGUtY29udGFpbmVyIHRleHQuc2QtZGVzY3JpcHRpb24nLFtcbiAgICAgICAgICAgIFsnZm9udC1zaXplJywgJ2Rlc2NyaXB0aW9uLmZvbnRTaXplJ10sXG4gICAgICAgICAgICBbJ2ZvbnQtd2VpZ2h0JywgJ2Rlc2NyaXB0aW9uLmZvbnRXZWlnaHQnXSxcbiAgICAgICAgICAgIFsnZm9udC1zdHlsZScsICdkZXNjcmlwdGlvbi5mb250U3R5bGUnXSxcbiAgICAgICAgICAgIFsnZmlsbCcsICdkZXNjcmlwdGlvbi5jb2xvciddXG4gICAgICAgIF0pXG59XG5cblxuXG5cbiIsIm1vZHVsZS5leHBvcnRzID0gXCJtb2R1bGUuZXhwb3J0cyA9IFxcXCI8ZGl2IGNsYXNzPVxcXFxcXFwic2QtZ3Jvd2wtbWVzc2FnZSA8JT10eXBlJT5cXFxcXFxcIj5cXFxcbiAgICA8ZGl2IGNsYXNzPVxcXFxcXFwic2QtZ3Jvd2wtbWVzc2FnZS10ZXh0XFxcXFxcXCI+XFxcXG4gICAgICAgIDwlPSBtZXNzYWdlICU+XFxcXG4gICAgPC9kaXY+XFxcXG48L2Rpdj5cXFxcblxcXCI7XFxuXCI7XG4iLCJpbXBvcnQge0FwcFV0aWxzfSBmcm9tICcuL2FwcC11dGlscydcbmltcG9ydCAqIGFzIGQzIGZyb20gJy4vZDMnXG5pbXBvcnQge0NvbnRleHRNZW51fSBmcm9tICcuL2NvbnRleHQtbWVudS9jb250ZXh0LW1lbnUnXG5cbmV4cG9ydCBjbGFzcyBUZXh0RHJhZ0hhbmRsZXJ7XG5cbiAgICB0cmVlRGVzaWduZXI7XG4gICAgZGF0YTtcbiAgICBjb25maWc7XG5cbiAgICBkcmFnO1xuXG5cbiAgICBjb25zdHJ1Y3Rvcih0cmVlRGVzaWduZXIsIGRhdGEpe1xuICAgICAgICB0aGlzLnRyZWVEZXNpZ25lciA9IHRyZWVEZXNpZ25lcjtcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcblxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuZHJhZyA9IGQzLmRyYWcoKVxuICAgICAgICAgICAgLnN1YmplY3QoZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICAgIGlmKGQ9PW51bGwpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IGV2ZW50LngsXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiBldmVudC55XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciB0ID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IHQuYXR0cihcInhcIikgKyBBcHBVdGlscy5nZXRUcmFuc2xhdGlvbih0LmF0dHIoXCJ0cmFuc2Zvcm1cIikpWzBdLFxuICAgICAgICAgICAgICAgICAgICB5OiB0LmF0dHIoXCJ5XCIpICsgQXBwVXRpbHMuZ2V0VHJhbnNsYXRpb24odC5hdHRyKFwidHJhbnNmb3JtXCIpKVsxXVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKFwic3RhcnRcIiwgZnVuY3Rpb24oZCl7XG4gICAgICAgICAgICAgICAgc2VsZi5kcmFnU3RhcnRlZC5jYWxsKHRoaXMsZCwgc2VsZilcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oXCJkcmFnXCIsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5vbkRyYWcuY2FsbCh0aGlzLCBkLCBzZWxmKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oXCJlbmRcIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmRyYWdFbmRlZC5jYWxsKHRoaXMsIGQsIHNlbGYpO1xuICAgICAgICAgICAgfSlcbiAgICB9XG5cblxuICAgIGRyYWdTdGFydGVkKGQsc2VsZikge1xuICAgICAgICAvLyBzZWxmLnRyZWVEZXNpZ25lci5sYXlvdXQuZGlzYWJsZUF1dG9MYXlvdXQoKTtcbiAgICAgICAgQ29udGV4dE1lbnUuaGlkZSgpO1xuICAgICAgICB2YXIgdGV4dCA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgaWYoIXRleHQuY2xhc3NlZChcInNlbGVjdGVkXCIpKXtcbiAgICAgICAgICAgIHNlbGYudHJlZURlc2lnbmVyLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICBzZWxmLnRyZWVEZXNpZ25lci5zZWxlY3RUZXh0KGQpO1xuICAgICAgICB0ZXh0LmNsYXNzZWQoXCJzZWxlY3RlZCBkcmFnZ2luZ1wiLCB0cnVlKTtcbiAgICAgICAgc2VsZi5zZWxlY3RlZE5vZGVzID0gc2VsZi50cmVlRGVzaWduZXIuZ2V0U2VsZWN0ZWROb2RlcygpO1xuICAgICAgICBzZWxmLnByZXZEcmFnRXZlbnQgPSBkMy5ldmVudDtcbiAgICAgICAgc2VsZi5kcmFnRXZlbnRDb3VudCA9IDA7XG4gICAgfVxuXG4gICAgb25EcmFnKGRyYWdnZWRUZXh0LCBzZWxmKXtcbiAgICAgICAgaWYoc2VsZi5kcmFnRXZlbnRDb3VudD09Mil7XG4gICAgICAgICAgICBzZWxmLmRhdGEuc2F2ZVN0YXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5kcmFnRXZlbnRDb3VudCsrO1xuXG4gICAgICAgIHZhciBkeCA9IGQzLmV2ZW50LnggLSBzZWxmLnByZXZEcmFnRXZlbnQueDtcbiAgICAgICAgdmFyIGR5ID0gZDMuZXZlbnQueS0gc2VsZi5wcmV2RHJhZ0V2ZW50Lnk7XG5cbiAgICAgICAgZHJhZ2dlZFRleHQubG9jYXRpb24ubW92ZShkeCwgZHkpO1xuICAgICAgICBzZWxmLnRyZWVEZXNpZ25lci51cGRhdGVUZXh0UG9zaXRpb24oZHJhZ2dlZFRleHQpO1xuXG4gICAgICAgIHNlbGYucHJldkRyYWdFdmVudCA9IGQzLmV2ZW50O1xuICAgICAgICBzZWxmLnRyZWVEZXNpZ25lci51cGRhdGVQbG90dGluZ1JlZ2lvblNpemUoKTtcbiAgICB9XG5cbiAgICBkcmFnRW5kZWQoZHJhZ2dlZE5vZGUsIHNlbGYpe1xuICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLmNsYXNzZWQoXCJkcmFnZ2luZ1wiLCBmYWxzZSk7XG4gICAgfVxuXG59XG5cblxuIiwiaW1wb3J0ICogYXMgZDMgZnJvbSAnLi9kMydcbmltcG9ydCB7VXRpbHN9IGZyb20gJ3NkLXV0aWxzJ1xuXG5leHBvcnQgY2xhc3MgVG9vbHRpcCB7XG4gICAgc3RhdGljIGdldENvbnRhaW5lcigpe1xuICAgICAgICByZXR1cm4gZDMuc2VsZWN0KFwiYm9keVwiKS5zZWxlY3RPckFwcGVuZCgnZGl2LnNkLXRvb2x0aXAnKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2hvdyhodG1sLCB4T2Zmc2V0ID0gNSwgeU9mZnNldCA9IDI4LCBldmVudCwgZHVyYXRpb249bnVsbCkge1xuICAgICAgICB2YXIgY29udGFpbmVyID0gVG9vbHRpcC5nZXRDb250YWluZXIoKVxuICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCAwKTtcbiAgICAgICAgY29udGFpbmVyLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDIwMClcbiAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgLjk4KTtcbiAgICAgICAgY29udGFpbmVyLmh0bWwoaHRtbCk7XG4gICAgICAgIFRvb2x0aXAudXBkYXRlUG9zaXRpb24oeE9mZnNldCwgeU9mZnNldCwgZXZlbnQpO1xuICAgICAgICBpZihkdXJhdGlvbil7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgVG9vbHRpcC5oaWRlKCk7XG4gICAgICAgICAgICB9LCBkdXJhdGlvbilcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyB1cGRhdGVQb3NpdGlvbih4T2Zmc2V0ID0gNSwgeU9mZnNldCA9IDI4LCBldmVudCkge1xuICAgICAgICBldmVudCA9IGV2ZW50IHx8IGQzLmV2ZW50O1xuICAgICAgICBUb29sdGlwLmdldENvbnRhaW5lcigpXG4gICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIChldmVudC5wYWdlWCArIHhPZmZzZXQpICsgXCJweFwiKVxuICAgICAgICAgICAgLnN0eWxlKFwidG9wXCIsIChldmVudC5wYWdlWSAtIHlPZmZzZXQpICsgXCJweFwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaGlkZShkdXJhdGlvbiA9IDUwMCkge1xuICAgICAgICB2YXIgdCA9IFRvb2x0aXAuZ2V0Q29udGFpbmVyKCk7XG4gICAgICAgIGlmKGR1cmF0aW9uKXtcbiAgICAgICAgICAgIHQgPSB0LnRyYW5zaXRpb24oKS5kdXJhdGlvbihkdXJhdGlvbilcbiAgICAgICAgfVxuICAgICAgICB0LnN0eWxlKFwib3BhY2l0eVwiLCAwKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgYXR0YWNoKHRhcmdldCwgaHRtbE9yRm4sIHhPZmZzZXQsIHlPZmZzZXQpIHtcbiAgICAgICAgdGFyZ2V0Lm9uKCdtb3VzZW92ZXInLCBmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgdmFyIGh0bWwgPSBudWxsO1xuICAgICAgICAgICAgaWYgKFV0aWxzLmlzRnVuY3Rpb24oaHRtbE9yRm4pKSB7XG4gICAgICAgICAgICAgICAgaHRtbCA9IGh0bWxPckZuKGQsIGkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBodG1sID0gaHRtbE9yRm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChodG1sICE9PSBudWxsICYmIGh0bWwgIT09IHVuZGVmaW5lZCAmJiBodG1sICE9PSAnJykge1xuICAgICAgICAgICAgICAgIFRvb2x0aXAuc2hvdyhodG1sLCB4T2Zmc2V0LCB5T2Zmc2V0KTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIFRvb2x0aXAuaGlkZSgwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KS5vbignbW91c2Vtb3ZlJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgIFRvb2x0aXAudXBkYXRlUG9zaXRpb24oeE9mZnNldCwgeU9mZnNldCk7XG4gICAgICAgIH0pLm9uKFwibW91c2VvdXRcIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgIFRvb2x0aXAuaGlkZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgKiBhcyBkMyBmcm9tIFwiLi9kM1wiO1xuaW1wb3J0IHtVdGlsc30gZnJvbSBcInNkLXV0aWxzXCI7XG5pbXBvcnQge0FwcFV0aWxzfSBmcm9tIFwiLi9hcHAtdXRpbHNcIjtcbmltcG9ydCB7ZG9tYWluIGFzIG1vZGVsfSBmcm9tIFwic2QtbW9kZWxcIjtcbmltcG9ydCB7Q29udGV4dE1lbnV9IGZyb20gXCIuL2NvbnRleHQtbWVudS9jb250ZXh0LW1lbnVcIjtcbmltcG9ydCB7TWFpbkNvbnRleHRNZW51fSBmcm9tIFwiLi9jb250ZXh0LW1lbnUvbWFpbi1jb250ZXh0LW1lbnVcIjtcbmltcG9ydCB7Tm9kZUNvbnRleHRNZW51fSBmcm9tIFwiLi9jb250ZXh0LW1lbnUvbm9kZS1jb250ZXh0LW1lbnVcIjtcbmltcG9ydCB7TGF5b3V0fSBmcm9tIFwiLi9sYXlvdXRcIjtcbmltcG9ydCB7Tm9kZURyYWdIYW5kbGVyfSBmcm9tIFwiLi9ub2RlLWRyYWctaGFuZGxlclwiO1xuaW1wb3J0IHtUb29sdGlwfSBmcm9tIFwiLi90b29sdGlwXCI7XG5pbXBvcnQge1RlbXBsYXRlc30gZnJvbSBcIi4vdGVtcGxhdGVzXCI7XG5pbXBvcnQge1RleHREcmFnSGFuZGxlcn0gZnJvbSBcIi4vdGV4dC1kcmFnLWhhbmRsZXJcIjtcbmltcG9ydCB7VGV4dENvbnRleHRNZW51fSBmcm9tIFwiLi9jb250ZXh0LW1lbnUvdGV4dC1jb250ZXh0LW1lbnVcIjtcbmltcG9ydCB7RWRnZUNvbnRleHRNZW51fSBmcm9tIFwiLi9jb250ZXh0LW1lbnUvZWRnZS1jb250ZXh0LW1lbnVcIjtcbmltcG9ydCAqIGFzIEhhbW1lciBmcm9tIFwiaGFtbWVyanNcIjtcbmltcG9ydCB7aTE4bn0gZnJvbSBcIi4vaTE4bi9pMThuXCI7XG5cblxuZXhwb3J0IGNsYXNzIFRyZWVEZXNpZ25lckNvbmZpZyB7XG4gICAgd2lkdGggPSB1bmRlZmluZWQ7XG4gICAgaGVpZ2h0ID0gdW5kZWZpbmVkO1xuICAgIG1hcmdpbiA9IHtcbiAgICAgICAgbGVmdDogMjUsXG4gICAgICAgIHJpZ2h0OiAyNSxcbiAgICAgICAgdG9wOiAyNSxcbiAgICAgICAgYm90dG9tOiAyNVxuICAgIH07XG4gICAgc2NhbGUgPSAxO1xuICAgIGxuZyA9ICdlbic7XG4gICAgbGF5b3V0PSB7XG4gICAgICAgIHR5cGU6ICd0cmVlJyxcbiAgICAgICAgbm9kZVNpemU6IDQwLFxuICAgICAgICBsaW1pdE5vZGVQb3NpdGlvbmluZzogdHJ1ZSxcbiAgICAgICAgZ3JpZEhlaWdodDogNzUsXG4gICAgICAgIGdyaWRXaWR0aDogMTUwLFxuICAgICAgICBlZGdlU2xhbnRXaWR0aE1heDogMjBcbiAgICB9O1xuICAgIGZvbnRGYW1pbHkgPSAnc2Fucy1zZXJpZic7XG4gICAgZm9udFNpemUgPSAnMTJweCc7XG4gICAgZm9udFdlaWdodCA9ICdub3JtYWwnO1xuICAgIGZvbnRTdHlsZSA9ICdub3JtYWwnO1xuICAgIG5vZGUgPSB7XG4gICAgICAgIHN0cm9rZVdpZHRoOiAnMXB4JyxcbiAgICAgICAgb3B0aW1hbDoge1xuICAgICAgICAgICAgc3Ryb2tlOiAnIzAwNmYwMCcsXG4gICAgICAgICAgICBzdHJva2VXaWR0aDogJzEuNXB4JyxcbiAgICAgICAgfSxcbiAgICAgICAgbGFiZWw6IHtcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMWVtJyxcbiAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgIH0sXG4gICAgICAgIHBheW9mZjoge1xuICAgICAgICAgICAgZm9udFNpemU6ICcxZW0nLFxuICAgICAgICAgICAgY29sb3I6ICdibGFjaycsXG4gICAgICAgICAgICBuZWdhdGl2ZUNvbG9yOiAnI2I2MDAwMCdcbiAgICAgICAgfSxcbiAgICAgICAgZGVjaXNpb246IHtcbiAgICAgICAgICAgIGZpbGw6ICcjZmY3Nzc3JyxcbiAgICAgICAgICAgIHN0cm9rZTogJyM2NjAwMDAnLFxuXG4gICAgICAgICAgICBzZWxlY3RlZDoge1xuICAgICAgICAgICAgICAgIGZpbGw6ICcjYWEzMzMzJyxcbiAgICAgICAgICAgICAgICAvLyBzdHJva2U6ICcjNjY2NjAwJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjaGFuY2U6IHtcbiAgICAgICAgICAgIGZpbGw6ICcjZmZmZjQ0JyxcbiAgICAgICAgICAgIHN0cm9rZTogJyM2NjY2MDAnLFxuXG4gICAgICAgICAgICBzZWxlY3RlZDoge1xuICAgICAgICAgICAgICAgIGZpbGw6ICcjYWFhYTAwJyxcbiAgICAgICAgICAgICAgICAvLyBzdHJva2U6ICcjNjY2NjAwJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB0ZXJtaW5hbDp7XG4gICAgICAgICAgICBmaWxsOiAnIzQ0ZmY0NCcsXG4gICAgICAgICAgICBzdHJva2U6ICdibGFjaycsXG4gICAgICAgICAgICBzZWxlY3RlZDoge1xuICAgICAgICAgICAgICAgIGZpbGw6ICcjMDBhYTAwJyxcbiAgICAgICAgICAgICAgICAvLyBzdHJva2U6ICdibGFjaydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwYXlvZmY6IHtcbiAgICAgICAgICAgICAgICBmb250U2l6ZTogJzFlbScsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaycsXG4gICAgICAgICAgICAgICAgbmVnYXRpdmVDb2xvcjogJyNiNjAwMDAnXG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgfTtcbiAgICBlZGdlPXtcbiAgICAgICAgc3Ryb2tlOiAnIzQyNDI0MicsXG4gICAgICAgIHN0cm9rZVdpZHRoOiAnMS41JyxcbiAgICAgICAgb3B0aW1hbDp7XG4gICAgICAgICAgICBzdHJva2U6ICcjMDA2ZjAwJyxcbiAgICAgICAgICAgIHN0cm9rZVdpZHRoOiAnMi40JyxcbiAgICAgICAgfSxcbiAgICAgICAgc2VsZWN0ZWQ6e1xuICAgICAgICAgICAgc3Ryb2tlOiAnIzA0NWFkMScsXG4gICAgICAgICAgICBzdHJva2VXaWR0aDogJzMuNScsXG4gICAgICAgIH0sXG4gICAgICAgIGxhYmVsOiB7XG4gICAgICAgICAgICBmb250U2l6ZTogJzFlbScsXG4gICAgICAgICAgICBjb2xvcjogJ2JhY2snXG4gICAgICAgIH0sXG4gICAgICAgIHBheW9mZjp7XG4gICAgICAgICAgICBmb250U2l6ZTogJzFlbScsXG4gICAgICAgICAgICBjb2xvcjogJ2JsYWNrJyxcbiAgICAgICAgICAgIG5lZ2F0aXZlQ29sb3I6ICcjYjYwMDAwJ1xuICAgICAgICB9XG5cbiAgICB9O1xuICAgIHByb2JhYmlsaXR5ID0ge1xuICAgICAgICBmb250U2l6ZTogJzFlbScsXG4gICAgICAgIGNvbG9yOiAnIzAwMDBkNydcbiAgICB9O1xuICAgIHRpdGxlID0ge1xuICAgICAgICBmb250U2l6ZTogJzE2cHgnLFxuICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXG4gICAgICAgIGZvbnRTdHlsZTogJ25vcm1hbCcsXG4gICAgICAgIGNvbG9yOiAnIzAwMDAwMCcsXG4gICAgICAgIG1hcmdpbjp7XG4gICAgICAgICAgICB0b3A6IDE1LFxuICAgICAgICAgICAgYm90dG9tOiAxMFxuICAgICAgICB9XG4gICAgfTtcbiAgICBkZXNjcmlwdGlvbiA9IHtcbiAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgZm9udFNpemU6ICcxMnB4JyxcbiAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxuICAgICAgICBmb250U3R5bGU6ICdub3JtYWwnLFxuICAgICAgICBjb2xvcjogJyMwMDAwMDAnLFxuICAgICAgICBtYXJnaW46e1xuICAgICAgICAgICAgdG9wOiA1LFxuICAgICAgICAgICAgYm90dG9tOiAxMFxuICAgICAgICB9XG4gICAgfTtcblxuICAgIHJlYWRPbmx5PSBmYWxzZTtcbiAgICBkaXNhYmxlQW5pbWF0aW9ucz1mYWxzZTtcbiAgICBmb3JjZUZ1bGxFZGdlUmVkcmF3PWZhbHNlO1xuICAgIGhpZGVMYWJlbHM9ZmFsc2U7XG4gICAgaGlkZVBheW9mZnM9ZmFsc2U7XG4gICAgaGlkZVByb2JhYmlsaXRpZXM9ZmFsc2U7XG4gICAgcmF3PWZhbHNlO1xuXG5cbiAgICBwYXlvZmZOdW1iZXJGb3JtYXR0ZXIgPSAodiwgaSk9PiB2O1xuICAgIHByb2JhYmlsaXR5TnVtYmVyRm9ybWF0dGVyICA9ICh2KT0+IHY7XG5cbiAgICBvbk5vZGVTZWxlY3RlZCA9IChub2RlKSA9PiB7fTtcbiAgICBvbkVkZ2VTZWxlY3RlZCA9IChlZGdlKSA9PiB7fTtcbiAgICBvblRleHRTZWxlY3RlZCA9ICh0ZXh0KSA9PiB7fTtcbiAgICBvblNlbGVjdGlvbkNsZWFyZWQgPSAoKSA9PiB7fTtcblxuICAgIG9wZXJhdGlvbnNGb3JPYmplY3QgPSAobykgPT4gW107XG5cbiAgICBwYXlvZmZOYW1lcyA9IFtudWxsLCBudWxsXTtcbiAgICBtYXhQYXlvZmZzVG9EaXNwbGF5ID0gMTtcblxuICAgIGNvbnN0cnVjdG9yKGN1c3RvbSkge1xuICAgICAgICBpZiAoY3VzdG9tKSB7XG4gICAgICAgICAgICBVdGlscy5kZWVwRXh0ZW5kKHRoaXMsIGN1c3RvbSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIFRyZWVEZXNpZ25lciB7XG5cbiAgICBjb25maWc7XG4gICAgY29udGFpbmVyO1xuICAgIGRhdGE7IC8vZGF0YSBtb2RlbCBtYW5hZ2VyXG4gICAgc3ZnO1xuXG4gICAgY29uc3RydWN0b3IoY29udGFpbmVyLCBkYXRhTW9kZWwsIGNvbmZpZyl7XG4gICAgICAgIHRoaXMuc2V0Q29uZmlnKGNvbmZpZyk7XG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGFNb2RlbDtcbiAgICAgICAgdGhpcy5pbml0Q29udGFpbmVyKGNvbnRhaW5lcik7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cblxuICAgIHNldENvbmZpZyhjb25maWcpIHtcbiAgICAgICAgdGhpcy5jb25maWcgPSBuZXcgVHJlZURlc2lnbmVyQ29uZmlnKGNvbmZpZyk7XG4gICAgICAgIGlmKHRoaXMubGF5b3V0KXtcbiAgICAgICAgICAgIHRoaXMubGF5b3V0LmNvbmZpZz10aGlzLmNvbmZpZy5sYXlvdXQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGRhdGVDdXN0b21TdHlsZXMoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgaW5pdCgpe1xuXG4gICAgICAgIHRoaXMuaW5pdFN2ZygpO1xuICAgICAgICB0aGlzLmluaXRMYXlvdXQoKTtcbiAgICAgICAgdGhpcy5pbml0STE4bigpO1xuICAgICAgICB0aGlzLmluaXRCcnVzaCgpO1xuICAgICAgICB0aGlzLmluaXRFZGdlTWFya2VycygpO1xuXG4gICAgICAgIHRoaXMudXBkYXRlQ3VzdG9tU3R5bGVzKCk7XG4gICAgICAgIGlmKCF0aGlzLmNvbmZpZy5yZWFkT25seSl7XG4gICAgICAgICAgICB0aGlzLmluaXRNYWluQ29udGV4dE1lbnUoKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdE5vZGVDb250ZXh0TWVudSgpO1xuICAgICAgICAgICAgdGhpcy5pbml0RWRnZUNvbnRleHRNZW51KCk7XG4gICAgICAgICAgICB0aGlzLmluaXROb2RlRHJhZ0hhbmRsZXIoKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdFRleHREcmFnSGFuZGxlcigpO1xuICAgICAgICAgICAgdGhpcy5pbml0VGV4dENvbnRleHRNZW51KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZWRyYXcoKTtcbiAgICB9XG5cbiAgICBpbml0STE4bigpIHtcbiAgICAgICAgaTE4bi5pbml0KHRoaXMuY29uZmlnLmxuZyk7XG4gICAgfVxuXG5cbiAgICB1cGRhdGVDdXN0b21TdHlsZXMoKXtcbiAgICAgICAgZDMuc2VsZWN0KCdoZWFkJykuc2VsZWN0T3JBcHBlbmQoJ3N0eWxlI3NkLXRyZWUtZGVzaWduZXItc3R5bGUnKS5odG1sKFRlbXBsYXRlcy5nZXQoJ3RyZWVEZXNpZ25lclN0eWxlcycsIHRoaXMuY29uZmlnKSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGluaXRMYXlvdXQoKXtcbiAgICAgICAgdGhpcy5sYXlvdXQgPSBuZXcgTGF5b3V0KHRoaXMsIHRoaXMuZGF0YSwgdGhpcy5jb25maWcubGF5b3V0KTtcbiAgICB9XG5cbiAgICBpbml0Tm9kZURyYWdIYW5kbGVyKCl7XG4gICAgICAgIHRoaXMubm9kZURyYWdIYW5kbGVyID0gbmV3IE5vZGVEcmFnSGFuZGxlcih0aGlzLCB0aGlzLmRhdGEpO1xuICAgIH1cblxuICAgIGluaXRUZXh0RHJhZ0hhbmRsZXIoKXtcbiAgICAgICAgdGhpcy50ZXh0RHJhZ0hhbmRsZXIgPSBuZXcgVGV4dERyYWdIYW5kbGVyKHRoaXMsIHRoaXMuZGF0YSk7XG4gICAgfVxuXG4gICAgcmVkcmF3KHdpdGhUcmFuc2l0aW9ucz1mYWxzZSl7XG5cbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB3aXRoVHJhbnNpdGlvbnMgPSAhc2VsZi5jb25maWcuZGlzYWJsZUFuaW1hdGlvbnMgJiYgd2l0aFRyYW5zaXRpb25zO1xuICAgICAgICB0aGlzLnJlZHJhd0RpYWdyYW1UaXRsZSgpO1xuICAgICAgICB0aGlzLnJlZHJhd0RpYWdyYW1EZXNjcmlwdGlvbigpO1xuICAgICAgICB0aGlzLnVwZGF0ZVNjYWxlKHdpdGhUcmFuc2l0aW9ucyk7XG4gICAgICAgIHRoaXMudXBkYXRlTWFyZ2luKHdpdGhUcmFuc2l0aW9ucyk7XG4gICAgICAgIGlmKHdpdGhUcmFuc2l0aW9ucyl7XG4gICAgICAgICAgICBzZWxmLnRyYW5zaXRpb25QcmV2ID0gc2VsZi50cmFuc2l0aW9uO1xuICAgICAgICAgICAgc2VsZi50cmFuc2l0aW9uID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlZHJhd05vZGVzKCk7XG4gICAgICAgIHRoaXMucmVkcmF3RWRnZXMoKTtcbiAgICAgICAgdGhpcy5yZWRyYXdGbG9hdGluZ1RleHRzKCk7XG4gICAgICAgIHRoaXMudXBkYXRlVmFsaWRhdGlvbk1lc3NhZ2VzKCk7XG4gICAgICAgIGlmKHdpdGhUcmFuc2l0aW9ucyl7XG4gICAgICAgICAgICBzZWxmLnRyYW5zaXRpb24gPSAgc2VsZi50cmFuc2l0aW9uUHJldjtcbiAgICAgICAgfVxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBzZWxmLnVwZGF0ZVBsb3R0aW5nUmVnaW9uU2l6ZSgpO1xuICAgICAgICB9LDEwKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBjb21wdXRlQXZhaWxhYmxlU3BhY2UoKXtcbiAgICAgICAgdGhpcy5hdmFpbGFibGVIZWlnaHQgPSBBcHBVdGlscy5zYW5pdGl6ZUhlaWdodCh0aGlzLmNvbmZpZy5oZWlnaHQsIHRoaXMuY29udGFpbmVyLCB0aGlzLmNvbmZpZy5tYXJnaW4pO1xuICAgICAgICB0aGlzLmF2YWlsYWJsZVdpZHRoID0gQXBwVXRpbHMuc2FuaXRpemVXaWR0aCh0aGlzLmNvbmZpZy53aWR0aCwgdGhpcy5jb250YWluZXIsIHRoaXMuY29uZmlnLm1hcmdpbik7XG4gICAgfVxuXG4gICAgaW5pdFN2ZygpIHtcbiAgICAgICAgdmFyIGMgPSB0aGlzO1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuY29tcHV0ZUF2YWlsYWJsZVNwYWNlKCk7XG4gICAgICAgIHRoaXMuc3ZnID0gdGhpcy5jb250YWluZXIuc2VsZWN0T3JBcHBlbmQoJ3N2Zy5zZC10cmVlLWRlc2lnbmVyJyk7XG4gICAgICAgIHRoaXMuc3ZnLmF0dHIoJ3dpZHRoJywgdGhpcy5hdmFpbGFibGVXaWR0aCkuYXR0cignaGVpZ2h0JywgdGhpcy5hdmFpbGFibGVIZWlnaHQpO1xuXG4gICAgICAgIHRoaXMud3JhcHBlckdyb3VwID0gdGhpcy5zdmcuc2VsZWN0T3JBcHBlbmQoJ2cuc2Qtd3JhcHBlci1ncm91cCcpO1xuICAgICAgICB0aGlzLm1haW5Hcm91cCA9IHRoaXMud3JhcHBlckdyb3VwLnNlbGVjdE9yQXBwZW5kKCdnLm1haW4tZ3JvdXAnKTtcbiAgICAgICAgdGhpcy51cGRhdGVTY2FsZSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZU1hcmdpbigpO1xuXG5cbiAgICAgICAgaWYgKCF0aGlzLmNvbmZpZy53aWR0aCkge1xuICAgICAgICAgICAgZDMuc2VsZWN0KHdpbmRvdylcbiAgICAgICAgICAgICAgICAub24oXCJyZXNpemUudHJlZS1kZXNpZ25lclwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYudXBkYXRlUGxvdHRpbmdSZWdpb25TaXplKCk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYucmVkcmF3RGlhZ3JhbVRpdGxlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbWMgPSBuZXcgSGFtbWVyLk1hbmFnZXIodGhpcy5zdmcubm9kZSgpLCB7dG91Y2hBY3Rpb24gOiAnYXV0byd9KTtcbiAgICAgICAgbWMuYWRkKG5ldyBIYW1tZXIuUHJlc3Moe1xuICAgICAgICAgICAgcG9pbnRlclR5cGU6ICd0b3VjaCdcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIG1jLmFkZChuZXcgSGFtbWVyLlBpbmNoKHtcbiAgICAgICAgICAgIHBvaW50ZXJUeXBlOiAndG91Y2gnXG4gICAgICAgIH0pKTtcblxuICAgICAgICB2YXIgY2FuY2VsO1xuICAgICAgICBtYy5vbigncGluY2hzdGFydCcsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBzZWxmLmRpc2FibGVCcnVzaCgpO1xuICAgICAgICB9KVxuICAgICAgICBtYy5vbigncGluY2gnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgY2FuY2VsID0gVXRpbHMud2FpdEZvckZpbmFsRXZlbnQoKCk9PnNlbGYuZW5hYmxlQnJ1c2goKSwgJ3BpbmNoZW5kJywgNTAwMClcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICB1cGRhdGVNYXJnaW4od2l0aFRyYW5zaXRpb25zKXtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgbWFyZ2luID0gdGhpcy5jb25maWcubWFyZ2luO1xuICAgICAgICB2YXIgZ3JvdXAgPSB0aGlzLm1haW5Hcm91cDtcbiAgICAgICAgaWYod2l0aFRyYW5zaXRpb25zKXtcbiAgICAgICAgICAgIGdyb3VwID0gZ3JvdXAudHJhbnNpdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50b3BNYXJnaW4gPSBtYXJnaW4udG9wO1xuICAgICAgICBpZih0aGlzLmRpYWdyYW1UaXRsZXx8dGhpcy5kaWFncmFtRGVzY3JpcHRpb24pe1xuICAgICAgICAgICAgdGhpcy50b3BNYXJnaW4gPSBwYXJzZUludCh0aGlzLmRpYWdyYW1UaXRsZSA/IHRoaXMuY29uZmlnLnRpdGxlLm1hcmdpbi50b3AgOiAwKSArIHRoaXMuZ2V0VGl0bGVHcm91cEhlaWdodCgpXG4gICAgICAgICAgICAgICAgKyAgTWF0aC5tYXgodGhpcy50b3BNYXJnaW4sIHBhcnNlSW50KHRoaXMuY29uZmlnLnRpdGxlLm1hcmdpbi5ib3R0b20pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdyb3VwLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoXCIgKyBtYXJnaW4ubGVmdCArIFwiLFwiICsgdGhpcy50b3BNYXJnaW4gKyBcIilcIikub24oXCJlbmRcIiwgKCk9PiBzZWxmLnVwZGF0ZVBsb3R0aW5nUmVnaW9uU2l6ZSgpKTtcbiAgICB9XG5cbiAgICBzZXRNYXJnaW4obWFyZ2luLCB3aXRob3V0U3RhdGVTYXZpbmcpe1xuICAgICAgICB2YXIgc2VsZj10aGlzO1xuICAgICAgICBpZighd2l0aG91dFN0YXRlU2F2aW5nKXtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoe1xuICAgICAgICAgICAgICAgIGRhdGE6e1xuICAgICAgICAgICAgICAgICAgICBtYXJnaW46IFV0aWxzLmNsb25lKHNlbGYuY29uZmlnLm1hcmdpbilcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uVW5kbzogKGRhdGEpPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldE1hcmdpbihkYXRhLm1hcmdpbiwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvblJlZG86IChkYXRhKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRNYXJnaW4obWFyZ2luLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBVdGlscy5kZWVwRXh0ZW5kKHRoaXMuY29uZmlnLm1hcmdpbiwgbWFyZ2luKTtcbiAgICAgICAgdGhpcy5yZWRyYXdEaWFncmFtVGl0bGUoKTtcbiAgICAgICAgdGhpcy51cGRhdGVNYXJnaW4odHJ1ZSk7XG4gICAgfVxuXG5cbiAgICB1cGRhdGVTY2FsZSh3aXRoVHJhbnNpdGlvbnMpe1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBzY2FsZSA9IHRoaXMuY29uZmlnLnNjYWxlO1xuICAgICAgICB2YXIgZ3JvdXAgPSB0aGlzLndyYXBwZXJHcm91cDtcbiAgICAgICAgaWYod2l0aFRyYW5zaXRpb25zKXtcbiAgICAgICAgICAgIGdyb3VwID0gZ3JvdXAudHJhbnNpdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ3JvdXAuYXR0cihcInRyYW5zZm9ybVwiLCBcInNjYWxlKFwiICsgc2NhbGUgKyBcIilcIikub24oXCJlbmRcIiwgKCk9PiBzZWxmLnVwZGF0ZVBsb3R0aW5nUmVnaW9uU2l6ZSgpKTtcbiAgICB9XG5cbiAgICBzZXRTY2FsZShzY2FsZSwgd2l0aG91dFN0YXRlU2F2aW5nKXtcbiAgICAgICAgdmFyIHNlbGY9dGhpcztcbiAgICAgICAgaWYoIXdpdGhvdXRTdGF0ZVNhdmluZyl7XG4gICAgICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKHtcbiAgICAgICAgICAgICAgICBkYXRhOntcbiAgICAgICAgICAgICAgICAgICAgc2NhbGU6IFV0aWxzLmNsb25lKHNlbGYuY29uZmlnLnNjYWxlKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25VbmRvOiAoZGF0YSk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0U2NhbGUoZGF0YS5zY2FsZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvblJlZG86IChkYXRhKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRTY2FsZShzY2FsZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb25maWcuc2NhbGUgPSBzY2FsZTtcbiAgICAgICAgdGhpcy51cGRhdGVTY2FsZSh0cnVlKTtcbiAgICB9XG5cbiAgICBpbml0Q29udGFpbmVyKGNvbnRhaW5lcklkT3JFbGVtKSB7XG4gICAgICAgIGlmIChVdGlscy5pc1N0cmluZyhjb250YWluZXJJZE9yRWxlbSkpIHtcbiAgICAgICAgICAgIHZhciBzZWxlY3RvciA9IGNvbnRhaW5lcklkT3JFbGVtLnRyaW0oKTtcblxuICAgICAgICAgICAgaWYgKCFVdGlscy5zdGFydHNXaXRoKHNlbGVjdG9yLCAnIycpICYmICFVdGlscy5zdGFydHNXaXRoKHNlbGVjdG9yLCAnLicpKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3IgPSAnIycgKyBzZWxlY3RvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyID0gZDMuc2VsZWN0KHNlbGVjdG9yKTtcbiAgICAgICAgfSBlbHNlIGlmKGNvbnRhaW5lcklkT3JFbGVtLl9wYXJlbnRzKXtcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVySWRPckVsZW1cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGQzLnNlbGVjdChjb250YWluZXJJZE9yRWxlbSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVQbG90dGluZ1JlZ2lvblNpemUoKSB7XG4gICAgICAgIHZhciBjaGFuZ2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY29tcHV0ZUF2YWlsYWJsZVNwYWNlKCk7XG4gICAgICAgIHZhciBtYXJnaW4gPSB0aGlzLmNvbmZpZy5tYXJnaW47XG4gICAgICAgIHZhciBzdmdXaWR0aCA9IHRoaXMuc3ZnLmF0dHIoJ3dpZHRoJyk7XG4gICAgICAgIHZhciBzdmdIZWlnaHQgPSB0aGlzLnN2Zy5hdHRyKCdoZWlnaHQnKTtcbiAgICAgICAgdmFyIG1haW5Hcm91cEJveCA9IHRoaXMubWFpbkdyb3VwLm5vZGUoKS5nZXRCQm94KCk7XG4gICAgICAgIHZhciBuZXdTdmdXaWR0aCA9IG1haW5Hcm91cEJveC53aWR0aCttYWluR3JvdXBCb3gueCttYXJnaW4ubGVmdCttYXJnaW4ucmlnaHQ7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmNsYXNzZWQoJ3dpdGgtb3ZlcmZsb3cteCcsIG5ld1N2Z1dpZHRoPj10aGlzLmF2YWlsYWJsZVdpZHRoKTtcbiAgICAgICAgbmV3U3ZnV2lkdGggPSBNYXRoLm1heChuZXdTdmdXaWR0aCwgdGhpcy5hdmFpbGFibGVXaWR0aCk7XG4gICAgICAgIGlmKHN2Z1dpZHRoIT1uZXdTdmdXaWR0aCl7XG4gICAgICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc3ZnLmF0dHIoJ3dpZHRoJywgbmV3U3ZnV2lkdGgpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBuZXdTdmdIZWlnaHQgPSBtYWluR3JvdXBCb3guaGVpZ2h0K21haW5Hcm91cEJveC55K3RoaXMudG9wTWFyZ2luK21hcmdpbi5ib3R0b207XG5cbiAgICAgICAgdGhpcy5jb250YWluZXIuY2xhc3NlZCgnd2l0aC1vdmVyZmxvdy15JywgbmV3U3ZnSGVpZ2h0Pj10aGlzLmF2YWlsYWJsZUhlaWdodCk7XG4gICAgICAgIG5ld1N2Z0hlaWdodCA9IE1hdGgubWF4KG5ld1N2Z0hlaWdodCwgdGhpcy5hdmFpbGFibGVIZWlnaHQpO1xuICAgICAgICBpZihzdmdIZWlnaHQhPW5ld1N2Z0hlaWdodCl7XG4gICAgICAgICAgICBjaGFuZ2VkPXRydWU7XG4gICAgICAgICAgICB0aGlzLnN2Zy5hdHRyKCdoZWlnaHQnLCBuZXdTdmdIZWlnaHQpO1xuICAgICAgICB9XG4gICAgICAgIGlmKGNoYW5nZWQpe1xuICAgICAgICAgICAgdGhpcy51cGRhdGVCcnVzaEV4dGVudCgpXG4gICAgICAgIH1cblxuXG4gICAgfVxuXG4gICAgcmVkcmF3Tm9kZXMoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuXG4gICAgICAgIHZhciBub2Rlc0NvbnRhaW5lciA9IHRoaXMubWFpbkdyb3VwLnNlbGVjdE9yQXBwZW5kKCdnLm5vZGVzJyk7XG4gICAgICAgIHZhciBub2RlcyA9IG5vZGVzQ29udGFpbmVyLnNlbGVjdEFsbCgnLm5vZGUnKS5kYXRhKHRoaXMuZGF0YS5ub2Rlcy5maWx0ZXIoZD0+IWQuJGhpZGRlbiksIChkLGkpPT4gZC4kaWQpO1xuICAgICAgICBub2Rlcy5leGl0KCkucmVtb3ZlKCk7XG4gICAgICAgIHZhciBub2Rlc0VudGVyID0gbm9kZXMuZW50ZXIoKS5hcHBlbmQoJ2cnKVxuICAgICAgICAgICAgLmF0dHIoJ2lkJywgZD0+J25vZGUtJytkLiRpZClcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGQ9PmQudHlwZSsnLW5vZGUgbm9kZScpXG4gICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgZD0+J3RyYW5zbGF0ZSgnICsgZC5sb2NhdGlvbi54ICsgJyAgJyArIGQubG9jYXRpb24ueSArICcpJyk7XG4gICAgICAgIG5vZGVzRW50ZXIuYXBwZW5kKCdwYXRoJyk7XG5cbiAgICAgICAgdmFyIGxhYmVsRW50ZXIgPSBub2Rlc0VudGVyLmFwcGVuZCgndGV4dCcpLmF0dHIoJ2NsYXNzJywgJ2xhYmVsJyk7XG4gICAgICAgIHZhciBwYXlvZmZFbnRlciA9IG5vZGVzRW50ZXIuYXBwZW5kKCd0ZXh0JykuYXR0cignY2xhc3MnLCAncGF5b2ZmIGNvbXB1dGVkJyk7XG4gICAgICAgIHZhciBpbmRpY2F0b3JFbnRlciA9IG5vZGVzRW50ZXIuYXBwZW5kKCd0ZXh0JykuYXR0cignY2xhc3MnLCAnZXJyb3ItaW5kaWNhdG9yJykudGV4dCgnISEnKTtcbiAgICAgICAgdmFyIGFnZ3JlZ2F0ZWRQYXlvZmZFbnRlciA9IG5vZGVzRW50ZXIuYXBwZW5kKCd0ZXh0JykuYXR0cignY2xhc3MnLCAnYWdncmVnYXRlZC1wYXlvZmYnKTtcbiAgICAgICAgdmFyIHByb2JhYmlsaXR5VG9FbnRlckVudGVyID0gbm9kZXNFbnRlci5hcHBlbmQoJ3RleHQnKS5hdHRyKCdjbGFzcycsICdwcm9iYWJpbGl0eS10by1lbnRlcicpO1xuXG4gICAgICAgIHZhciBub2Rlc01lcmdlID0gbm9kZXNFbnRlci5tZXJnZShub2Rlcyk7XG4gICAgICAgIG5vZGVzTWVyZ2UuY2xhc3NlZCgnb3B0aW1hbCcsIChkKT0+c2VsZi5pc09wdGltYWwoZCkpO1xuXG4gICAgICAgIHZhciBub2Rlc01lcmdlVCA9IG5vZGVzTWVyZ2U7XG4gICAgICAgIGlmKHRoaXMudHJhbnNpdGlvbil7XG4gICAgICAgICAgICBub2Rlc01lcmdlVCA9IG5vZGVzTWVyZ2UudHJhbnNpdGlvbigpO1xuICAgICAgICAgICAgbm9kZXNNZXJnZVQub24oJ2VuZCcsICgpPT4gc2VsZi51cGRhdGVQbG90dGluZ1JlZ2lvblNpemUoKSlcbiAgICAgICAgfVxuICAgICAgICBub2Rlc01lcmdlVFxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGQ9Pid0cmFuc2xhdGUoJyArIGQubG9jYXRpb24ueCArICcgICcgKyBkLmxvY2F0aW9uLnkgKyAnKScpXG5cbiAgICAgICAgdmFyIHBhdGggPSBub2Rlc01lcmdlLnNlbGVjdCgncGF0aCcpO1xuICAgICAgICB0aGlzLmxheW91dC5kcmF3Tm9kZVN5bWJvbChwYXRoLHRoaXMudHJhbnNpdGlvbik7XG5cbiAgICAgICAgLypwYXRoXG4gICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCBkPT4ge1xuICAgICAgICAgICAgICAgIC8vIGlmKHNlbGYuaXNOb2RlU2VsZWN0ZWQoZCkpe1xuICAgICAgICAgICAgICAgIC8vICAgICByZXR1cm4gc2VsZi5jb25maWcubm9kZVtkLnR5cGVdLnNlbGVjdGVkLmZpbGxcbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYuY29uZmlnLm5vZGVbZC50eXBlXS5maWxsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0eWxlKCdzdHJva2UnLCBkPT4gc2VsZi5jb25maWcubm9kZVtkLnR5cGVdLnN0cm9rZSlcbiAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlLXdpZHRoJywgZD0+IHtcbiAgICAgICAgICAgICAgICBpZihzZWxmLmNvbmZpZy5ub2RlW2QudHlwZV0uc3Ryb2tlV2lkdGghPT11bmRlZmluZWQpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5jb25maWcubm9kZVtkLnR5cGVdLnN0cm9rZVdpZHRoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5jb25maWcubm9kZS5zdHJva2VXaWR0aDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAqL1xuICAgICAgICB0aGlzLmxheW91dC5ub2RlTGFiZWxQb3NpdGlvbihsYWJlbEVudGVyKTtcbiAgICAgICAgdmFyIGxhYmVsTWVyZ2UgPSBub2Rlc01lcmdlLnNlbGVjdCgndGV4dC5sYWJlbCcpO1xuICAgICAgICBsYWJlbE1lcmdlLmNsYXNzZWQoJ3NkLWhpZGRlbicsIHRoaXMuY29uZmlnLmhpZGVMYWJlbHMpO1xuICAgICAgICB2YXIgbGFiZWxNZXJnZVQgPSBub2Rlc01lcmdlVC5zZWxlY3QoJ3RleHQubGFiZWwnKTtcbiAgICAgICAgbGFiZWxNZXJnZVQuZWFjaCh0aGlzLnVwZGF0ZVRleHRMaW5lcyk7XG4gICAgICAgIHRoaXMubGF5b3V0Lm5vZGVMYWJlbFBvc2l0aW9uKGxhYmVsTWVyZ2VUKVxuICAgICAgICAgICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXG5cbiAgICAgICAgdmFyIHBheW9mZiA9IG5vZGVzTWVyZ2Uuc2VsZWN0KCd0ZXh0LnBheW9mZicpO1xuXG4gICAgICAgIHZhciBwYXlvZmZUc3BhbnMgPSBwYXlvZmYuc2VsZWN0QWxsKCd0c3BhbicpLmRhdGEoZD0+e1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSBkLmRpc3BsYXlWYWx1ZSgnY2hpbGRyZW5QYXlvZmYnKTtcbiAgICAgICAgICAgIHJldHVybiBVdGlscy5pc0FycmF5KGl0ZW0pID8gaXRlbS5maWx0ZXIoaT0+aSAhPT0gdW5kZWZpbmVkKSA6IFtpdGVtXVxuICAgICAgICB9KTtcbiAgICAgICAgcGF5b2ZmVHNwYW5zLmV4aXQoKS5yZW1vdmUoKTtcblxuICAgICAgICB2YXIgcGF5b2ZmVHNwYW5zTSA9IHBheW9mZlRzcGFucy5lbnRlcigpLmFwcGVuZCgndHNwYW4nKS5tZXJnZShwYXlvZmZUc3BhbnMpO1xuICAgICAgICBwYXlvZmZUc3BhbnNNXG4gICAgICAgICAgICAvLyAuYXR0cignZG9taW5hbnQtYmFzZWxpbmUnLCAnaGFuZ2luZycpXG4gICAgICAgICAgICAuYXR0cignZHknLCAoZCxpKT0+aT4wID8gJzEuMWVtJzogdW5kZWZpbmVkKVxuICAgICAgICAgICAgLmF0dHIoJ3gnLCAnMCcpXG4gICAgICAgICAgICAuY2xhc3NlZCgnbmVnYXRpdmUnLCBkPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBkIT09bnVsbCAmJiBkPDA7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNsYXNzZWQoJ3NkLWhpZGRlbicsIHRoaXMuY29uZmlnLmhpZGVQYXlvZmZzIHx8IHRoaXMuY29uZmlnLnJhdylcbiAgICAgICAgICAgIC50ZXh0KChkLCBpKT0+IHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsID0gZFxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbCE9PW51bGwgPyAoaXNOYU4odmFsKSA/IHZhbCA6IHNlbGYuY29uZmlnLnBheW9mZk51bWJlckZvcm1hdHRlcih2YWwsIGkpKTogJydcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB0aGlzLmF0dGFjaFBheW9mZlRvb2x0aXAocGF5b2ZmVHNwYW5zTSk7XG5cblxuICAgICAgICB2YXIgcGF5b2ZmVCA9IHBheW9mZjtcbiAgICAgICAgaWYodGhpcy50cmFuc2l0aW9uKXtcbiAgICAgICAgICAgIHBheW9mZlQgPSBwYXlvZmYudHJhbnNpdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sYXlvdXQubm9kZVBheW9mZlBvc2l0aW9uKHBheW9mZkVudGVyKTtcbiAgICAgICAgdGhpcy5sYXlvdXQubm9kZVBheW9mZlBvc2l0aW9uKHBheW9mZlQpO1xuXG4gICAgICAgIHZhciBhZ2dyZWdhdGVkUGF5b2ZmID0gbm9kZXNNZXJnZS5zZWxlY3QoJ3RleHQuYWdncmVnYXRlZC1wYXlvZmYnKTtcbiAgICAgICAgdmFyIGFnZ3JlZ2F0ZWRQYXlvZmZUc3BhbnMgPSBhZ2dyZWdhdGVkUGF5b2ZmLnNlbGVjdEFsbCgndHNwYW4nKS5kYXRhKGQ9PntcbiAgICAgICAgICAgIGxldCBpdGVtID0gZC5kaXNwbGF5VmFsdWUoJ2FnZ3JlZ2F0ZWRQYXlvZmYnKTtcbiAgICAgICAgICAgIHJldHVybiBVdGlscy5pc0FycmF5KGl0ZW0pID8gaXRlbS5maWx0ZXIoaT0+aSAhPT0gdW5kZWZpbmVkKSA6IFtpdGVtXVxuICAgICAgICB9KTtcbiAgICAgICAgYWdncmVnYXRlZFBheW9mZlRzcGFucy5leGl0KCkucmVtb3ZlKCk7XG4gICAgICAgIHZhciBhZ2dyZWdhdGVkUGF5b2ZmVHNwYW5zTSA9IGFnZ3JlZ2F0ZWRQYXlvZmZUc3BhbnMuZW50ZXIoKS5hcHBlbmQoJ3RzcGFuJykubWVyZ2UoYWdncmVnYXRlZFBheW9mZlRzcGFucylcbiAgICAgICAgICAgIC5hdHRyKCdkeScsIChkLGkpPT5pPjAgPyAnMC45NWVtJzogdW5kZWZpbmVkKVxuICAgICAgICAgICAgLmNsYXNzZWQoJ25lZ2F0aXZlJywgZD0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZCE9PW51bGwgJiYgZDwwO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jbGFzc2VkKCdzZC1oaWRkZW4nLCB0aGlzLmNvbmZpZy5oaWRlUGF5b2ZmcyB8fCB0aGlzLmNvbmZpZy5yYXcpXG4gICAgICAgICAgICAudGV4dCgodmFsLCBpKT0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsIT09bnVsbCA/IChpc05hTih2YWwpID8gdmFsIDogc2VsZi5jb25maWcucGF5b2ZmTnVtYmVyRm9ybWF0dGVyKHZhbCwgaSkpOiAnJ1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5hdHRhY2hQYXlvZmZUb29sdGlwKGFnZ3JlZ2F0ZWRQYXlvZmZUc3BhbnNNLCAnYWdncmVnYXRlZFBheW9mZicpO1xuXG4gICAgICAgIHZhciBhZ2dyZWdhdGVkUGF5b2ZmVCA9IGFnZ3JlZ2F0ZWRQYXlvZmY7XG4gICAgICAgIGlmKHRoaXMudHJhbnNpdGlvbil7XG4gICAgICAgICAgICBhZ2dyZWdhdGVkUGF5b2ZmVCA9IGFnZ3JlZ2F0ZWRQYXlvZmYudHJhbnNpdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sYXlvdXQubm9kZUFnZ3JlZ2F0ZWRQYXlvZmZQb3NpdGlvbihhZ2dyZWdhdGVkUGF5b2ZmRW50ZXIpO1xuICAgICAgICB0aGlzLmxheW91dC5ub2RlQWdncmVnYXRlZFBheW9mZlBvc2l0aW9uKGFnZ3JlZ2F0ZWRQYXlvZmZUKTtcblxuICAgICAgICB2YXIgcHJvYmFiaWxpdHlUb0VudGVyID0gbm9kZXNNZXJnZS5zZWxlY3QoJ3RleHQucHJvYmFiaWxpdHktdG8tZW50ZXInKVxuICAgICAgICAgICAgLnRleHQoZD0+e1xuICAgICAgICAgICAgICAgIHZhciB2YWwgPSBkLmRpc3BsYXlWYWx1ZSgncHJvYmFiaWxpdHlUb0VudGVyJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbCE9PW51bGwgPyAoaXNOYU4odmFsKSA/IHZhbCA6IHNlbGYuY29uZmlnLnByb2JhYmlsaXR5TnVtYmVyRm9ybWF0dGVyKHZhbCkpOiAnJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jbGFzc2VkKCdzZC1oaWRkZW4nLCB0aGlzLmNvbmZpZy5oaWRlUHJvYmFiaWxpdGllcyB8fCB0aGlzLmNvbmZpZy5yYXcpO1xuICAgICAgICBUb29sdGlwLmF0dGFjaChwcm9iYWJpbGl0eVRvRW50ZXIsIGkxOG4udCgndG9vbHRpcC5ub2RlLnByb2JhYmlsaXR5VG9FbnRlcicpKTtcblxuXG4gICAgICAgIHZhciBwcm9iYWJpbGl0eVRvRW50ZXJUID0gcHJvYmFiaWxpdHlUb0VudGVyO1xuICAgICAgICBpZih0aGlzLnRyYW5zaXRpb24pe1xuICAgICAgICAgICAgcHJvYmFiaWxpdHlUb0VudGVyVCA9IHByb2JhYmlsaXR5VG9FbnRlci50cmFuc2l0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sYXlvdXQubm9kZVByb2JhYmlsaXR5VG9FbnRlclBvc2l0aW9uKHByb2JhYmlsaXR5VG9FbnRlckVudGVyKTtcbiAgICAgICAgdGhpcy5sYXlvdXQubm9kZVByb2JhYmlsaXR5VG9FbnRlclBvc2l0aW9uKHByb2JhYmlsaXR5VG9FbnRlclQpO1xuXG5cbiAgICAgICAgdmFyIGluZGljYXRvciA9IG5vZGVzTWVyZ2Uuc2VsZWN0KCd0ZXh0LmVycm9yLWluZGljYXRvcicpO1xuICAgICAgICBpbmRpY2F0b3IuY2xhc3NlZCgnc2QtaGlkZGVuJywgdGhpcy5jb25maWcucmF3KVxuICAgICAgICB0aGlzLmxheW91dC5ub2RlSW5kaWNhdG9yUG9zaXRpb24oaW5kaWNhdG9yRW50ZXIpO1xuICAgICAgICB0aGlzLmxheW91dC5ub2RlSW5kaWNhdG9yUG9zaXRpb24oaW5kaWNhdG9yKTtcblxuICAgICAgICBpZih0aGlzLm5vZGVEcmFnSGFuZGxlcil7XG4gICAgICAgICAgICBub2Rlc01lcmdlLmNhbGwodGhpcy5ub2RlRHJhZ0hhbmRsZXIuZHJhZyk7XG4gICAgICAgIH1cblxuICAgICAgICBub2Rlc01lcmdlLm9uKCdjb250ZXh0bWVudScsIHRoaXMubm9kZUNvbnRleHRNZW51KTtcbiAgICAgICAgbm9kZXNNZXJnZS5vbignZGJsY2xpY2snLCB0aGlzLm5vZGVDb250ZXh0TWVudSlcbiAgICAgICAgbm9kZXNNZXJnZS5lYWNoKGZ1bmN0aW9uKGQsIGkpe1xuICAgICAgICAgICAgdmFyIG5vZGVFbGVtID0gdGhpcztcbiAgICAgICAgICAgIHZhciBtYyA9IG5ldyBIYW1tZXIuTWFuYWdlcihub2RlRWxlbSk7XG4gICAgICAgICAgICBtYy5hZGQobmV3IEhhbW1lci5QcmVzcyh7XG4gICAgICAgICAgICAgICAgcG9pbnRlclR5cGU6ICd0b3VjaCdcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIG1jLm9uKCdwcmVzcycsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgICAgIGlmKGUucG9pbnRlclR5cGU9PSd0b3VjaCcpe1xuICAgICAgICAgICAgICAgICAgICBzZWxmLm5vZGVEcmFnSGFuZGxlci5jYW5jZWxEcmFnKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcblxuXG4gICAgICAgICAgICBpZihkLmZvbGRlZCl7XG4gICAgICAgICAgICAgICAgbGV0IGJ1dHRvbiA9IGQzLnNlbGVjdChub2RlRWxlbSkuc2VsZWN0T3JBcHBlbmQoJ3RleHQuc2QtdW5mb2xkLWJ1dHRvbicpXG4gICAgICAgICAgICAgICAgICAgIC50ZXh0KFwiWytdXCIpXG4gICAgICAgICAgICAgICAgICAgIC5vbignY2xpY2sgZGJjbGljayBtb3VzZWRvd24nLCAoKT0+c2VsZi5mb2xkU3VidHJlZShkLCBmYWxzZSkpOyAvL2ZpcmVmb3ggZGV0ZWN0cyBvbmx5IG1vdXNlZG93biBldmVudCAtIHJlbGF0ZWQgdG8gZHJhZyBoYW5kbGVyXG5cbiAgICAgICAgICAgICAgICBzZWxmLmxheW91dC5ub2RlVW5mb2xkQnV0dG9uUG9zaXRpb24oYnV0dG9uKTtcbiAgICAgICAgICAgICAgICBUb29sdGlwLmF0dGFjaChidXR0b24sIGkxOG4udCgnY29udGV4dE1lbnUubm9kZS51bmZvbGQnKSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBkMy5zZWxlY3Qobm9kZUVsZW0pLnNlbGVjdCgnLnNkLXVuZm9sZC1idXR0b24nKS5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGF0dGFjaFBheW9mZlRvb2x0aXAoc2VsZWN0aW9uLCBwYXlvZmZGaWxlZE5hbWUgPSAncGF5b2ZmJywgb2JqZWN0PSdub2RlJyl7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgVG9vbHRpcC5hdHRhY2goc2VsZWN0aW9uLCAoZCwgaSk9PntcbiAgICAgICAgICAgIGlmKHNlbGYuY29uZmlnLnBheW9mZk5hbWVzLmxlbmd0aD5pICYmIHNlbGYuY29uZmlnLnBheW9mZk5hbWVzW2ldICE9PSBudWxsKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTE4bi50KCd0b29sdGlwLicrb2JqZWN0KycuJytwYXlvZmZGaWxlZE5hbWUrJy5uYW1lZCcse3ZhbHVlOiBkLnBheW9mZiwgbnVtYmVyOiBpKzEsIG5hbWU6IHNlbGYuY29uZmlnLnBheW9mZk5hbWVzW2ldfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpMThuLnQoJ3Rvb2x0aXAuJytvYmplY3QrJy4nK3BheW9mZkZpbGVkTmFtZSsnLmRlZmF1bHQnLHt2YWx1ZTogZC5wYXlvZmYsIG51bWJlcjogc2VsZi5jb25maWcubWF4UGF5b2Zmc1RvRGlzcGxheSA8IDIgPyAnJyA6IGkrMX0pXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHVwZGF0ZVRleHRMaW5lcyhkKXsgLy9oZWxwZXIgbWV0aG9kIGZvciBzcGxpdHRpbmcgdGV4dCB0byB0c3BhbnNcbiAgICAgICAgdmFyIGxpbmVzID0gZC5uYW1lID8gZC5uYW1lLnNwbGl0KCdcXG4nKSA6IFtdO1xuICAgICAgICBsaW5lcy5yZXZlcnNlKCk7XG4gICAgICAgIHZhciB0c3BhbnMgPSBkMy5zZWxlY3QodGhpcykuc2VsZWN0QWxsKCd0c3BhbicpLmRhdGEobGluZXMpO1xuICAgICAgICB0c3BhbnMuZW50ZXIoKS5hcHBlbmQoJ3RzcGFuJylcbiAgICAgICAgICAgIC5tZXJnZSh0c3BhbnMpXG4gICAgICAgICAgICAudGV4dChsPT5sKVxuICAgICAgICAgICAgLmF0dHIoJ2R5JywgKGQsaSk9Pmk+MCA/ICctMS4xZW0nOiB1bmRlZmluZWQpXG4gICAgICAgICAgICAuYXR0cigneCcsICcwJyk7XG5cbiAgICAgICAgdHNwYW5zLmV4aXQoKS5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICBpc09wdGltYWwoZCl7XG4gICAgICAgIHJldHVybiBkLmRpc3BsYXlWYWx1ZSgnb3B0aW1hbCcpO1xuICAgIH1cblxuICAgIHJlZHJhd0VkZ2VzKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBlZGdlc0NvbnRhaW5lciA9IHRoaXMubWFpbkdyb3VwLnNlbGVjdE9yQXBwZW5kKCdnLmVkZ2VzJyk7XG4gICAgICAgIGlmKHNlbGYuY29uZmlnLmZvcmNlRnVsbEVkZ2VSZWRyYXcpe1xuICAgICAgICAgICAgZWRnZXNDb250YWluZXIuc2VsZWN0QWxsKFwiKlwiKS5yZW1vdmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBlZGdlcyA9IGVkZ2VzQ29udGFpbmVyLnNlbGVjdEFsbCgnLmVkZ2UnKS5kYXRhKHRoaXMuZGF0YS5lZGdlcy5maWx0ZXIoZT0+IWUuJGhpZGRlbiksIChkLGkpPT4gZC4kaWQpO1xuICAgICAgICBlZGdlcy5leGl0KCkucmVtb3ZlKCk7XG4gICAgICAgIHZhciBlZGdlc0VudGVyID0gZWRnZXMuZW50ZXIoKS5hcHBlbmQoJ2cnKVxuICAgICAgICAgICAgLmF0dHIoJ2lkJywgZD0+J2VkZ2UtJytkLiRpZClcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdlZGdlJyk7XG5cblxuICAgICAgICBlZGdlc0VudGVyLmFwcGVuZCgncGF0aCcpO1xuICAgICAgICB2YXIgbGFiZWxFbnRlciA9IGVkZ2VzRW50ZXIuYXBwZW5kU2VsZWN0b3IoJ2cubGFiZWwtZ3JvdXAnKTtcbiAgICAgICAgbGFiZWxFbnRlci5hcHBlbmQoJ3RleHQnKS5hdHRyKCdjbGFzcycsICdsYWJlbCcpO1xuICAgICAgICB2YXIgcGF5b2ZmRW50ZXIgPSBlZGdlc0VudGVyLmFwcGVuZCgndGV4dCcpLmF0dHIoJ2NsYXNzJywgJ3BheW9mZicpO1xuICAgICAgICB2YXIgcHJvYmFiaWxpdHlFbnRlciA9IGVkZ2VzRW50ZXIuYXBwZW5kKCd0ZXh0JykuYXR0cignY2xhc3MnLCAncHJvYmFiaWxpdHknKTtcblxuXG4gICAgICAgIHZhciBlZGdlc01lcmdlID0gZWRnZXNFbnRlci5tZXJnZShlZGdlcyk7XG5cblxuICAgICAgICB2YXIgb3B0aW1hbENsYXNzTmFtZSA9ICdvcHRpbWFsJztcbiAgICAgICAgZWRnZXNNZXJnZS5jbGFzc2VkKG9wdGltYWxDbGFzc05hbWUsIChkKT0+c2VsZi5pc09wdGltYWwoZCkpO1xuXG4gICAgICAgIHZhciBlZGdlc01lcmdlVCA9IGVkZ2VzTWVyZ2U7XG4gICAgICAgIGlmKHRoaXMudHJhbnNpdGlvbil7XG4gICAgICAgICAgICBlZGdlc01lcmdlVCA9IGVkZ2VzTWVyZ2UudHJhbnNpdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgZWRnZXNNZXJnZVQuc2VsZWN0KCdwYXRoJylcbiAgICAgICAgICAgIC5hdHRyKCdkJywgZD0+IHRoaXMubGF5b3V0LmVkZ2VMaW5lRChkKSlcbiAgICAgICAgICAgIC8vIC5hdHRyKFwic3Ryb2tlXCIsIFwiYmxhY2tcIilcbiAgICAgICAgICAgIC8vIC5hdHRyKFwic3Ryb2tlLXdpZHRoXCIsIDIpXG4gICAgICAgICAgICAuYXR0cihcImZpbGxcIiwgXCJub25lXCIpXG4gICAgICAgICAgICAuYXR0cihcIm1hcmtlci1lbmRcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICAgIHZhciBzdWZmaXggPSBkMy5zZWxlY3QodGhpcy5wYXJlbnROb2RlKS5jbGFzc2VkKCdzZWxlY3RlZCcpID8gJy1zZWxlY3RlZCcgOiAoc2VsZi5pc09wdGltYWwoZCk/Jy1vcHRpbWFsJzonJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwidXJsKCNhcnJvd1wiKyBzdWZmaXgrXCIpXCJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gLmF0dHIoXCJzaGFwZS1yZW5kZXJpbmdcIiwgXCJvcHRpbWl6ZVF1YWxpdHlcIilcblxuXG4gICAgICAgIGVkZ2VzTWVyZ2Uub24oJ2NsaWNrJywgZD0+e1xuICAgICAgICAgICAgc2VsZi5zZWxlY3RFZGdlKGQsIHRydWUpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubGF5b3V0LmVkZ2VMYWJlbFBvc2l0aW9uKGxhYmVsRW50ZXIpO1xuICAgICAgICBlZGdlc01lcmdlVC5zZWxlY3QoJ3RleHQubGFiZWwnKS5lYWNoKHRoaXMudXBkYXRlVGV4dExpbmVzKTtcbiAgICAgICAgdmFyIGxhYmVsTWVyZ2UgPSBlZGdlc01lcmdlLnNlbGVjdCgnZy5sYWJlbC1ncm91cCcpO1xuICAgICAgICBsYWJlbE1lcmdlLmNsYXNzZWQoJ3NkLWhpZGRlbicsIHRoaXMuY29uZmlnLmhpZGVMYWJlbHMpO1xuICAgICAgICB2YXIgbGFiZWxNZXJnZVQgPSBlZGdlc01lcmdlVC5zZWxlY3QoJ2cubGFiZWwtZ3JvdXAnKTtcbiAgICAgICAgdGhpcy5sYXlvdXQuZWRnZUxhYmVsUG9zaXRpb24obGFiZWxNZXJnZVQpO1xuICAgICAgICAgICAgLy8gLnRleHQoZD0+ZC5uYW1lKTtcblxuICAgICAgICB2YXIgcGF5b2ZmID0gZWRnZXNNZXJnZS5zZWxlY3QoJ3RleHQucGF5b2ZmJyk7XG5cbiAgICAgICAgdmFyIHBheW9mZlRzcGFucyA9IHBheW9mZi5zZWxlY3RBbGwoJ3RzcGFuJykuZGF0YShkID0+IHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gZC5kaXNwbGF5VmFsdWUoJ3BheW9mZicpO1xuICAgICAgICAgICAgcmV0dXJuIFV0aWxzLmlzQXJyYXkoaXRlbSkgPyBpdGVtLnNsaWNlKDAsIE1hdGgubWluKGl0ZW0ubGVuZ3RoLCBzZWxmLmNvbmZpZy5tYXhQYXlvZmZzVG9EaXNwbGF5KSkubWFwKF89PmQpIDogW2RdO1xuICAgICAgICB9KTtcbiAgICAgICAgcGF5b2ZmVHNwYW5zLmV4aXQoKS5yZW1vdmUoKTtcblxuICAgICAgICB2YXIgcGF5b2ZmVHNwYW5zTSA9IHBheW9mZlRzcGFucy5lbnRlcigpLmFwcGVuZCgndHNwYW4nKS5tZXJnZShwYXlvZmZUc3BhbnMpO1xuICAgICAgICBwYXlvZmZUc3BhbnNNXG4gICAgICAgIC8vIC5hdHRyKCdkb21pbmFudC1iYXNlbGluZScsICdoYW5naW5nJylcbiAgICAgICAgICAgIC5hdHRyKCdkeScsIChkLGkpPT5pPjAgPyAnMS4xZW0nOiB1bmRlZmluZWQpXG4gICAgICAgICAgICAvLyAuYXR0cigneCcsICcwJylcblxuICAgICAgICAgICAgLy8gLmF0dHIoJ2RvbWluYW50LWJhc2VsaW5lJywgJ2hhbmdpbmcnKVxuICAgICAgICAgICAgLmNsYXNzZWQoJ25lZ2F0aXZlJywgKGQsIGkpPT4ge1xuICAgICAgICAgICAgICAgIHZhciB2YWwgPSBkLmRpc3BsYXlQYXlvZmYodW5kZWZpbmVkLCBpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsIT09bnVsbCAmJiB2YWw8MDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2xhc3NlZCgnc2QtaGlkZGVuJywgdGhpcy5jb25maWcuaGlkZVBheW9mZnMpXG4gICAgICAgICAgICAvLyAudGV4dChkPT4gaXNOYU4oZC5wYXlvZmYpID8gZC5wYXlvZmYgOiBzZWxmLmNvbmZpZy5wYXlvZmZOdW1iZXJGb3JtYXR0ZXIoZC5wYXlvZmYpKVxuICAgICAgICAgICAgLnRleHQoKGQsIGkpPT57XG4gICAgICAgICAgICAgICAgaWYodGhpcy5jb25maWcucmF3KXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQucGF5b2ZmW2ldO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gZC5kaXNwbGF5VmFsdWUoJ3BheW9mZicpO1xuICAgICAgICAgICAgICAgIGxldCBpdGVtcyA9IFV0aWxzLmlzQXJyYXkoaXRlbSkgPyBpdGVtIDogW2l0ZW1dO1xuXG4gICAgICAgICAgICAgICAgbGV0IHZhbCA9IGl0ZW1zW2ldO1xuICAgICAgICAgICAgICAgIGlmICh2YWwgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc05hTih2YWwpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5jb25maWcucGF5b2ZmTnVtYmVyRm9ybWF0dGVyKHZhbCwgaSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKFV0aWxzLmlzU3RyaW5nKHZhbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoZC5wYXlvZmZbaV0gIT09IG51bGwgJiYgIWlzTmFOKGQucGF5b2ZmW2ldKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYuY29uZmlnLnBheW9mZk51bWJlckZvcm1hdHRlcihkLnBheW9mZltpXSwgaSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZC5wYXlvZmZbaV07XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIFRvb2x0aXAuYXR0YWNoKHBheW9mZlRzcGFuc00sIChkLCBpKT0+e1xuICAgICAgICAgICAgaWYoc2VsZi5jb25maWcucGF5b2ZmTmFtZXMubGVuZ3RoPmkgJiYgc2VsZi5jb25maWcucGF5b2ZmTmFtZXNbaV0gIT09IG51bGwpe1xuICAgICAgICAgICAgICAgIHJldHVybiBpMThuLnQoJ3Rvb2x0aXAuZWRnZS5wYXlvZmYubmFtZWQnLHt2YWx1ZTogZC5wYXlvZmZbaV0sIG51bWJlcjogaSsxLCBuYW1lOiBzZWxmLmNvbmZpZy5wYXlvZmZOYW1lc1tpXX0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaTE4bi50KCd0b29sdGlwLmVkZ2UucGF5b2ZmLmRlZmF1bHQnLHt2YWx1ZTogZC5wYXlvZmZbaV0sIG51bWJlcjogc2VsZi5jb25maWcubWF4UGF5b2Zmc1RvRGlzcGxheSA8IDIgPyAnJyA6IGkrMX0pXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBwYXlvZmZUZXh0VCA9IHBheW9mZjtcbiAgICAgICAgaWYodGhpcy50cmFuc2l0aW9uKXtcbiAgICAgICAgICAgIHBheW9mZlRleHRUID0gcGF5b2ZmLnRyYW5zaXRpb24oKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxheW91dC5lZGdlUGF5b2ZmUG9zaXRpb24ocGF5b2ZmRW50ZXIpO1xuICAgICAgICB0aGlzLmxheW91dC5lZGdlUGF5b2ZmUG9zaXRpb24ocGF5b2ZmVGV4dFQpO1xuXG4gICAgICAgIFRvb2x0aXAuYXR0YWNoKGVkZ2VzTWVyZ2Uuc2VsZWN0KCd0ZXh0LnByb2JhYmlsaXR5JyksIGQ9PmkxOG4udCgndG9vbHRpcC5lZGdlLnByb2JhYmlsaXR5Jyx7dmFsdWU6IGQucHJvYmFiaWxpdHk9PT0gdW5kZWZpbmVkID8gZC5kaXNwbGF5UHJvYmFiaWxpdHkoKSA6IGQucHJvYmFiaWxpdHl9KSk7XG5cbiAgICAgICAgZWRnZXNNZXJnZS5zZWxlY3QoJ3RleHQucHJvYmFiaWxpdHknKVxuICAgICAgICAgICAgLmNsYXNzZWQoJ3NkLWhpZGRlbicsIHRoaXMuY29uZmlnLmhpZGVQcm9iYWJpbGl0aWVzKTtcbiAgICAgICAgdmFyIHByb2JhYmlsaXR5TWVyZ2UgPSBlZGdlc01lcmdlLnNlbGVjdCgndGV4dC5wcm9iYWJpbGl0eScpO1xuICAgICAgICBwcm9iYWJpbGl0eU1lcmdlXG4gICAgICAgICAgICAuYXR0cigndGV4dC1hbmNob3InLCAnZW5kJylcbiAgICAgICAgICAgIC50ZXh0KGQ9PntcbiAgICAgICAgICAgICAgICBpZih0aGlzLmNvbmZpZy5yYXcpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC5wcm9iYWJpbGl0eTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHZhbCA9IGQuZGlzcGxheVByb2JhYmlsaXR5KCk7XG5cbiAgICAgICAgICAgICAgICBpZih2YWwhPT1udWxsKXtcbiAgICAgICAgICAgICAgICAgICAgaWYoIWlzTmFOKHZhbCkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYuY29uZmlnLnByb2JhYmlsaXR5TnVtYmVyRm9ybWF0dGVyKHZhbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYoVXRpbHMuaXNTdHJpbmcodmFsKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoZC5wcm9iYWJpbGl0eSE9PW51bGwgJiYgIWlzTmFOKGQucHJvYmFiaWxpdHkpKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5jb25maWcucHJvYmFiaWxpdHlOdW1iZXJGb3JtYXR0ZXIoZC5wcm9iYWJpbGl0eSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZC5wcm9iYWJpbGl0eTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB2YXIgcHJvYmFiaWxpdHlNZXJnZVQgPSBwcm9iYWJpbGl0eU1lcmdlO1xuICAgICAgICBpZih0aGlzLnRyYW5zaXRpb24pe1xuICAgICAgICAgICAgcHJvYmFiaWxpdHlNZXJnZVQgPSBwcm9iYWJpbGl0eU1lcmdlLnRyYW5zaXRpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubGF5b3V0LmVkZ2VQcm9iYWJpbGl0eVBvc2l0aW9uKHByb2JhYmlsaXR5RW50ZXIpO1xuICAgICAgICB0aGlzLmxheW91dC5lZGdlUHJvYmFiaWxpdHlQb3NpdGlvbihwcm9iYWJpbGl0eU1lcmdlVCk7XG5cblxuICAgICAgICBlZGdlc0NvbnRhaW5lci5zZWxlY3RBbGwoJy5lZGdlLicrb3B0aW1hbENsYXNzTmFtZSkucmFpc2UoKTtcblxuICAgICAgICBlZGdlc01lcmdlLm9uKCdjb250ZXh0bWVudScsIHRoaXMuZWRnZUNvbnRleHRNZW51KTtcbiAgICAgICAgZWRnZXNNZXJnZS5vbignZGJsY2xpY2snLCB0aGlzLmVkZ2VDb250ZXh0TWVudSk7XG4gICAgICAgIGVkZ2VzTWVyZ2UuZWFjaChmdW5jdGlvbihkLCBpKXtcbiAgICAgICAgICAgIHZhciBlbGVtID0gdGhpcztcbiAgICAgICAgICAgIHZhciBtYyA9IG5ldyBIYW1tZXIuTWFuYWdlcihlbGVtKTtcbiAgICAgICAgICAgIG1jLmFkZChuZXcgSGFtbWVyLlByZXNzKHtcbiAgICAgICAgICAgICAgICBwb2ludGVyVHlwZTogSGFtbWVyLlBPSU5URVJfVE9VQ0hcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICByZWRyYXdGbG9hdGluZ1RleHRzKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cblxuICAgICAgICB2YXIgdGV4dHNDb250YWluZXIgPSB0aGlzLm1haW5Hcm91cC5zZWxlY3RPckFwcGVuZCgnZy5mbG9hdGluZy10ZXh0cycpO1xuICAgICAgICB2YXIgdGV4dHMgPSB0ZXh0c0NvbnRhaW5lci5zZWxlY3RBbGwoJy5mbG9hdGluZy10ZXh0JykuZGF0YSh0aGlzLmRhdGEudGV4dHMsIChkLGkpPT4gZC4kaWQpO1xuICAgICAgICB0ZXh0cy5leGl0KCkucmVtb3ZlKCk7XG4gICAgICAgIHZhciB0ZXh0c0VudGVyID0gdGV4dHMuZW50ZXIoKS5hcHBlbmRTZWxlY3RvcignZy5mbG9hdGluZy10ZXh0JylcbiAgICAgICAgICAgIC5hdHRyKCdpZCcsIGQ9Pid0ZXh0LScrZC4kaWQpO1xuXG5cbiAgICAgICAgdmFyIHJlY3RXaWR0aCA9IDQwO1xuICAgICAgICB2YXIgcmVjdEhlaWdodCA9IDIwO1xuXG4gICAgICAgIHRleHRzRW50ZXIuYXBwZW5kKCdyZWN0JykuYXR0cigneCcsIC01KS5hdHRyKCd5JywgLTE2KS5hdHRyKCdmaWxsLW9wYWNpdHknLCAwKTtcbiAgICAgICAgdGV4dHNFbnRlci5hcHBlbmQoJ3RleHQnKTtcblxuICAgICAgICB2YXIgdGV4dHNNZXJnZSA9IHRleHRzRW50ZXIubWVyZ2UodGV4dHMpO1xuICAgICAgICB2YXIgdGV4dHNNZXJnZVQgPSB0ZXh0c01lcmdlO1xuICAgICAgICBpZih0aGlzLnRyYW5zaXRpb24pe1xuICAgICAgICAgICAgdGV4dHNNZXJnZVQgPSB0ZXh0c01lcmdlLnRyYW5zaXRpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRleHRzTWVyZ2VULmF0dHIoJ3RyYW5zZm9ybScsIGQ9Pid0cmFuc2xhdGUoJyArIGQubG9jYXRpb24ueCArICcgICcgKyBkLmxvY2F0aW9uLnkgKyAnKScpO1xuXG4gICAgICAgIHZhciB0c3BhbnMgPSB0ZXh0c01lcmdlLnNlbGVjdCgndGV4dCcpLnNlbGVjdEFsbCgndHNwYW4nKS5kYXRhKGQ9PmQudmFsdWUgPyBkLnZhbHVlLnNwbGl0KCdcXG4nKSA6IFtdKTtcblxuICAgICAgICB0c3BhbnMuZW50ZXIoKS5hcHBlbmQoJ3RzcGFuJylcbiAgICAgICAgICAgIC5tZXJnZSh0c3BhbnMpXG4gICAgICAgICAgICAuaHRtbChsPT5BcHBVdGlscy5yZXBsYWNlVXJscyhBcHBVdGlscy5lc2NhcGVIdG1sKGwpKSlcbiAgICAgICAgICAgIC5hdHRyKCdkeScsIChkLGkpPT5pPjAgPyAnMS4xZW0nOiB1bmRlZmluZWQpXG4gICAgICAgICAgICAuYXR0cigneCcsICcwJyk7XG5cbiAgICAgICAgdHNwYW5zLmV4aXQoKS5yZW1vdmUoKTtcbiAgICAgICAgdGV4dHNNZXJnZS5jbGFzc2VkKCdzZC1lbXB0eScsIGQ9PiFkLnZhbHVlIHx8ICFkLnZhbHVlLnRyaW0oKSk7XG4gICAgICAgIHRleHRzTWVyZ2Uuc2VsZWN0KCdyZWN0JykuYXR0cignd2lkdGgnLCByZWN0V2lkdGgpLmF0dHIoJ2hlaWdodCcsIHJlY3RIZWlnaHQpO1xuXG4gICAgICAgIHRleHRzTWVyZ2UuZWFjaChmdW5jdGlvbihkKXtcbiAgICAgICAgICAgIGlmKCFkLnZhbHVlKXtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgYmIgPSBkMy5zZWxlY3QodGhpcykuc2VsZWN0KCd0ZXh0Jykubm9kZSgpLmdldEJCb3goKTtcbiAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLnNlbGVjdCgncmVjdCcpXG4gICAgICAgICAgICAgICAuYXR0cigneScsIGJiLnktNSlcbiAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIE1hdGgubWF4KGJiLndpZHRoKzEwLCByZWN0V2lkdGgpKVxuICAgICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIE1hdGgubWF4KGJiLmhlaWdodCsxMCwgcmVjdEhlaWdodCkpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmKHRoaXMudGV4dERyYWdIYW5kbGVyKXtcbiAgICAgICAgICAgIHRleHRzTWVyZ2UuY2FsbCh0aGlzLnRleHREcmFnSGFuZGxlci5kcmFnKTtcbiAgICAgICAgfVxuICAgICAgICB0ZXh0c01lcmdlLm9uKCdjb250ZXh0bWVudScsIHRoaXMudGV4dENvbnRleHRNZW51KTtcbiAgICAgICAgdGV4dHNNZXJnZS5vbignZGJsY2xpY2snLCB0aGlzLnRleHRDb250ZXh0TWVudSk7XG4gICAgICAgIHRleHRzTWVyZ2UuZWFjaChmdW5jdGlvbihkLCBpKXtcbiAgICAgICAgICAgIHZhciBlbGVtID0gdGhpcztcbiAgICAgICAgICAgIHZhciBtYyA9IG5ldyBIYW1tZXIuTWFuYWdlcihlbGVtKTtcbiAgICAgICAgICAgIG1jLmFkZChuZXcgSGFtbWVyLlByZXNzKHtcbiAgICAgICAgICAgICAgICBwb2ludGVyVHlwZTogJ3RvdWNoJ1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9KVxuXG4gICAgfVxuXG4gICAgdXBkYXRlVmFsaWRhdGlvbk1lc3NhZ2VzKCkge1xuICAgICAgICB2YXIgbm9kZXMgPSB0aGlzLm1haW5Hcm91cC5zZWxlY3RBbGwoJy5ub2RlJyk7XG4gICAgICAgIG5vZGVzLmNsYXNzZWQoJ2Vycm9yJywgZmFsc2UpO1xuXG4gICAgICAgIHRoaXMuZGF0YS52YWxpZGF0aW9uUmVzdWx0cy5mb3JFYWNoKHZhbGlkYXRpb25SZXN1bHQ9PntcbiAgICAgICAgICAgIGlmKHZhbGlkYXRpb25SZXN1bHQuaXNWYWxpZCgpKXtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHZhbGlkYXRpb25SZXN1bHQub2JqZWN0SWRUb0Vycm9yKS5mb3JFYWNoKGlkPT57XG4gICAgICAgICAgICAgICAgdmFyIGVycm9ycyA9IHZhbGlkYXRpb25SZXN1bHQub2JqZWN0SWRUb0Vycm9yW2lkXTtcbiAgICAgICAgICAgICAgICB2YXIgbm9kZVNlbGVjdGlvbiA9IHRoaXMuZ2V0Tm9kZUQzU2VsZWN0aW9uQnlJZChpZCk7XG4gICAgICAgICAgICAgICAgbm9kZVNlbGVjdGlvbi5jbGFzc2VkKCdlcnJvcicsIHRydWUpO1xuICAgICAgICAgICAgICAgIHZhciB0b29sdGlwSHRtbCA9ICcnO1xuICAgICAgICAgICAgICAgIGVycm9ycy5mb3JFYWNoKGU9PntcbiAgICAgICAgICAgICAgICAgICAgaWYodG9vbHRpcEh0bWwpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcEh0bWwrPSc8YnIvPidcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwSHRtbCs9QXBwVXRpbHMuZ2V0VmFsaWRhdGlvbk1lc3NhZ2UoZSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBUb29sdGlwLmF0dGFjaChub2RlU2VsZWN0aW9uLnNlbGVjdCgnLmVycm9yLWluZGljYXRvcicpLCB0b29sdGlwSHRtbCk7XG5cblxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICBpbml0RWRnZU1hcmtlcnMoKSB7XG4gICAgICAgIHZhciBkZWZzID0gdGhpcy5zdmcuYXBwZW5kKFwic3ZnOmRlZnNcIik7XG5cbiAgICAgICAgdGhpcy5pbml0QXJyb3dNYXJrZXIoXCJhcnJvd1wiKTtcbiAgICAgICAgdGhpcy5pbml0QXJyb3dNYXJrZXIoXCJhcnJvdy1vcHRpbWFsXCIpO1xuICAgICAgICB0aGlzLmluaXRBcnJvd01hcmtlcihcImFycm93LXNlbGVjdGVkXCIpO1xuICAgIH1cblxuICAgIGluaXRBcnJvd01hcmtlcihpZCkge1xuXG4gICAgICAgIHZhciBkZWZzID0gdGhpcy5zdmcuc2VsZWN0KFwiZGVmc1wiKTtcbiAgICAgICAgZGVmcy5hcHBlbmQoXCJtYXJrZXJcIilcbiAgICAgICAgICAgIC5hdHRyKFwiaWRcIixpZClcbiAgICAgICAgICAgIC5hdHRyKFwidmlld0JveFwiLFwiMCAtNSAxMCAxMFwiKVxuICAgICAgICAgICAgLmF0dHIoXCJyZWZYXCIsNSlcbiAgICAgICAgICAgIC5hdHRyKFwicmVmWVwiLDApXG4gICAgICAgICAgICAuYXR0cihcIm1hcmtlcldpZHRoXCIsNClcbiAgICAgICAgICAgIC5hdHRyKFwibWFya2VySGVpZ2h0XCIsNClcbiAgICAgICAgICAgIC5hdHRyKFwib3JpZW50XCIsXCJhdXRvXCIpXG4gICAgICAgICAgICAuYXBwZW5kKFwicGF0aFwiKVxuICAgICAgICAgICAgLmF0dHIoXCJkXCIsIFwiTTAsLTVMMTAsMEwwLDVcIilcbiAgICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIixcImFycm93SGVhZFwiKTtcbiAgICB9XG5cbiAgICB1cGRhdGVCcnVzaEV4dGVudCgpIHtcbiAgICAgICAgdmFyIHNlbGYgPXRoaXM7XG4gICAgICAgIHRoaXMuYnJ1c2guZXh0ZW50KFtbMCwgMF0sIFtzZWxmLnN2Zy5hdHRyKCd3aWR0aCcpLCBzZWxmLnN2Zy5hdHRyKCdoZWlnaHQnKV1dKTtcbiAgICAgICAgdGhpcy5icnVzaENvbnRhaW5lci5jYWxsKHRoaXMuYnJ1c2gpO1xuICAgIH1cbiAgICBpbml0QnJ1c2goKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICB2YXIgYnJ1c2hDb250YWluZXIgPSBzZWxmLmJydXNoQ29udGFpbmVyID0gdGhpcy5icnVzaENvbnRhaW5lcj0gdGhpcy53cmFwcGVyR3JvdXAuc2VsZWN0T3JJbnNlcnQoXCJnLmJydXNoXCIsIFwiOmZpcnN0LWNoaWxkXCIpXG4gICAgICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwiYnJ1c2hcIik7XG5cbiAgICAgICAgdmFyIGJydXNoID0gdGhpcy5icnVzaCA9IGQzLmJydXNoKClcbiAgICAgICAgICAgIC5vbihcInN0YXJ0XCIsIGJydXNoc3RhcnQpXG4gICAgICAgICAgICAub24oXCJicnVzaFwiLCBicnVzaG1vdmUpXG4gICAgICAgICAgICAub24oXCJlbmRcIiwgYnJ1c2hlbmQpO1xuXG5cblxuICAgICAgICB0aGlzLnVwZGF0ZUJydXNoRXh0ZW50KCk7XG5cbiAgICAgICAgYnJ1c2hDb250YWluZXIuc2VsZWN0KCcub3ZlcmxheScpLm9uKFwibW91c2Vtb3ZlLmVkZ2VTZWxlY3Rpb25cIiwgbW91c2Vtb3ZlZCk7XG4gICAgICAgIGZ1bmN0aW9uIG1vdXNlbW92ZWQoKSB7XG4gICAgICAgICAgICB2YXIgbSA9IGQzLm1vdXNlKHRoaXMpO1xuICAgICAgICAgICAgdmFyIG1ndCA9IHNlbGYuZ2V0TWFpbkdyb3VwVHJhbnNsYXRpb24oKTtcbiAgICAgICAgICAgIHZhciBtYXJnaW4gPSAxMDtcblxuICAgICAgICAgICAgdmFyIGNsb3Nlc3QgPSBbbnVsbCwgOTk5OTk5OTk5XTtcbiAgICAgICAgICAgIHZhciBjbG9zZUVkZ2VzID0gW107XG4gICAgICAgICAgICBzZWxmLm1haW5Hcm91cC5zZWxlY3RBbGwoJy5lZGdlJykuZWFjaChmdW5jdGlvbihkKXtcbiAgICAgICAgICAgICAgICB2YXIgc2VsZWN0aW9uID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICAgICAgICAgIHNlbGVjdGlvbi5jbGFzc2VkKCdzZC1ob3ZlcicsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB2YXIgcGF0aE5vZGUgPSBzZWxlY3Rpb24uc2VsZWN0KCdwYXRoJykubm9kZSgpO1xuICAgICAgICAgICAgICAgIHZhciBiID0gcGF0aE5vZGUuZ2V0QkJveCgpO1xuICAgICAgICAgICAgICAgIGlmKGIueCttZ3RbMF0gPD1tWzBdICYmIGIueCtiLndpZHRoK21ndFswXSA+PSBtWzBdICYmXG4gICAgICAgICAgICAgICAgICAgYi55K21ndFsxXS1tYXJnaW4gPD1tWzFdICYmIGIueStiLmhlaWdodCttZ3RbMV0rbWFyZ2luID49IG1bMV0pe1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBjcCA9IEFwcFV0aWxzLmNsb3Nlc3RQb2ludChwYXRoTm9kZSwgW21bMF0tbWd0WzBdLCBtWzFdLW1ndFsxXV0pO1xuICAgICAgICAgICAgICAgICAgICBpZihjcC5kaXN0YW5jZSA8IG1hcmdpbiAmJiBjcC5kaXN0YW5jZTxjbG9zZXN0WzFdKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlc3QgPSBbc2VsZWN0aW9uLCBjcC5kaXN0YW5jZV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBzZWxmLmhvdmVyZWRFZGdlID0gbnVsbDtcbiAgICAgICAgICAgIGlmKGNsb3Nlc3RbMF0pe1xuICAgICAgICAgICAgICAgIGNsb3Nlc3RbMF0uY2xhc3NlZCgnc2QtaG92ZXInLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBzZWxmLmhvdmVyZWRFZGdlID0gY2xvc2VzdFswXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gYnJ1c2hzdGFydCgpIHtcbiAgICAgICAgICAgIGlmICghZDMuZXZlbnQuc2VsZWN0aW9uKSByZXR1cm47XG4gICAgICAgICAgICBpZihzZWxmLmhvdmVyZWRFZGdlKXtcbiAgICAgICAgICAgICAgICBzZWxmLnNlbGVjdEVkZ2Uoc2VsZi5ob3ZlcmVkRWRnZS5kYXR1bSgpLCB0cnVlKVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgc2VsZi5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgQ29udGV4dE1lbnUuaGlkZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSGlnaGxpZ2h0IHRoZSBzZWxlY3RlZCBub2Rlcy5cbiAgICAgICAgZnVuY3Rpb24gYnJ1c2htb3ZlKCkge1xuICAgICAgICAgICAgdmFyIHMgPSBkMy5ldmVudC5zZWxlY3Rpb247XG4gICAgICAgICAgICBpZighcylyZXR1cm47XG5cbiAgICAgICAgICAgIHNlbGYubWFpbkdyb3VwLnNlbGVjdEFsbChcIi5ub2RlXCIpLmNsYXNzZWQoJ3NlbGVjdGVkJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICB2YXIgbWFpbkdyb3VwVHJhbnNsYXRpb24gPSBzZWxmLmdldE1haW5Hcm91cFRyYW5zbGF0aW9uKCk7XG4gICAgICAgICAgICAgICAgdmFyIHggPSBkLmxvY2F0aW9uLngrbWFpbkdyb3VwVHJhbnNsYXRpb25bMF07XG4gICAgICAgICAgICAgICAgdmFyIHkgPSBkLmxvY2F0aW9uLnkrbWFpbkdyb3VwVHJhbnNsYXRpb25bMV07XG4gICAgICAgICAgICAgICAgdmFyIG5vZGVTaXplID0gc2VsZi5jb25maWcubGF5b3V0Lm5vZGVTaXplO1xuICAgICAgICAgICAgICAgIHZhciBvZmZzZXQgPSBub2RlU2l6ZSowLjI1O1xuICAgICAgICAgICAgICAgIHJldHVybiBzWzBdWzBdIDw9IHgrb2Zmc2V0ICYmIHgtb2Zmc2V0IDw9IHNbMV1bMF1cbiAgICAgICAgICAgICAgICAgICAgJiYgc1swXVsxXSA8PSB5K29mZnNldCAmJiB5LW9mZnNldCA8PSBzWzFdWzFdO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgdGhlIGJydXNoIGlzIGVtcHR5LCBzZWxlY3QgYWxsIGNpcmNsZXMuXG4gICAgICAgIGZ1bmN0aW9uIGJydXNoZW5kKCkge1xuICAgICAgICAgICAgaWYgKCFkMy5ldmVudC5zZWxlY3Rpb24pIHJldHVybjtcbiAgICAgICAgICAgIGJydXNoLm1vdmUoYnJ1c2hDb250YWluZXIsIG51bGwpO1xuXG4gICAgICAgICAgICB2YXIgc2VsZWN0ZWROb2RlcyA9IHNlbGYuZ2V0U2VsZWN0ZWROb2RlcygpO1xuICAgICAgICAgICAgaWYoc2VsZWN0ZWROb2RlcyAmJiBzZWxlY3RlZE5vZGVzLmxlbmd0aCA9PT0gMSl7XG4gICAgICAgICAgICAgICAgc2VsZi5zZWxlY3ROb2RlKHNlbGVjdGVkTm9kZXNbMF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gaWYgKCFkMy5ldmVudC5zZWxlY3Rpb24pIHNlbGYubWFpbkdyb3VwLnNlbGVjdEFsbChcIi5zZWxlY3RlZFwiKS5jbGFzc2VkKCdzZWxlY3RlZCcsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRpc2FibGVCcnVzaCgpe1xuICAgICAgICBpZighdGhpcy5icnVzaERpc2FibGVkKXtcbiAgICAgICAgICAgIEFwcFV0aWxzLmdyb3dsKGkxOG4udCgnZ3Jvd2wuYnJ1c2hEaXNhYmxlZCcpLCAnaW5mbycsICdsZWZ0JylcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmJydXNoRGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmJydXNoQ29udGFpbmVyLnJlbW92ZSgpO1xuICAgIH1cblxuICAgIGVuYWJsZUJydXNoKCl7XG4gICAgICAgIGlmKHRoaXMuYnJ1c2hEaXNhYmxlZCl7XG4gICAgICAgICAgICBBcHBVdGlscy5ncm93bChpMThuLnQoJ2dyb3dsLmJydXNoRW5hYmxlZCcpLCAnaW5mbycsICdsZWZ0JylcbiAgICAgICAgICAgIHRoaXMuaW5pdEJydXNoKCk7XG4gICAgICAgICAgICB0aGlzLmJydXNoRGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuXG5cbiAgICB9XG5cbiAgICBnZXRNYWluR3JvdXBUcmFuc2xhdGlvbihpbnZlcnQpIHtcbiAgICAgICAgdmFyIHRyYW5zbGF0aW9uID0gQXBwVXRpbHMuZ2V0VHJhbnNsYXRpb24odGhpcy5tYWluR3JvdXAuYXR0cihcInRyYW5zZm9ybVwiKSk7XG4gICAgICAgIGlmKGludmVydCl7XG4gICAgICAgICAgICB0cmFuc2xhdGlvblswXSA9IC10cmFuc2xhdGlvblswXTtcbiAgICAgICAgICAgIHRyYW5zbGF0aW9uWzFdID0gLXRyYW5zbGF0aW9uWzFdXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRyYW5zbGF0aW9uO1xuICAgIH1cblxuICAgIGluaXROb2RlQ29udGV4dE1lbnUoKSB7XG4gICAgICAgIHRoaXMubm9kZUNvbnRleHRNZW51ID0gbmV3IE5vZGVDb250ZXh0TWVudSh0aGlzLCB0aGlzLmNvbmZpZy5vcGVyYXRpb25zRm9yT2JqZWN0KTtcbiAgICB9XG5cbiAgICBpbml0RWRnZUNvbnRleHRNZW51KCkge1xuICAgICAgICB0aGlzLmVkZ2VDb250ZXh0TWVudSA9IG5ldyBFZGdlQ29udGV4dE1lbnUodGhpcyk7XG4gICAgfVxuXG4gICAgaW5pdFRleHRDb250ZXh0TWVudSgpIHtcbiAgICAgICAgdGhpcy50ZXh0Q29udGV4dE1lbnUgPSBuZXcgVGV4dENvbnRleHRNZW51KHRoaXMpO1xuICAgIH1cblxuXG5cbiAgICBpbml0TWFpbkNvbnRleHRNZW51KCkge1xuICAgICAgICB0aGlzLm1haW5Db250ZXh0TWVudSA9IG5ldyBNYWluQ29udGV4dE1lbnUodGhpcyk7XG4gICAgICAgIHRoaXMuc3ZnLm9uKCdjb250ZXh0bWVudScsdGhpcy5tYWluQ29udGV4dE1lbnUpO1xuICAgICAgICB0aGlzLnN2Zy5vbignZGJsY2xpY2snLHRoaXMubWFpbkNvbnRleHRNZW51KTtcbiAgICB9XG5cbiAgICBhZGRUZXh0KHRleHQpe1xuICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKCk7XG4gICAgICAgIHRoaXMuZGF0YS5hZGRUZXh0KHRleHQpO1xuICAgICAgICB0aGlzLnJlZHJhdygpO1xuICAgICAgICB0aGlzLnNlbGVjdFRleHQodGV4dCk7XG4gICAgfVxuXG4gICAgYWRkTm9kZShub2RlLCBwYXJlbnQsIHJlZHJhdz1mYWxzZSl7XG4gICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoKTtcbiAgICAgICAgdGhpcy5kYXRhLmFkZE5vZGUobm9kZSwgcGFyZW50KTtcbiAgICAgICAgdGhpcy5yZWRyYXcodHJ1ZSk7XG4gICAgICAgIHRoaXMubGF5b3V0LnVwZGF0ZShub2RlKTtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuXG4gICAgYWRkRGVjaXNpb25Ob2RlKHBhcmVudCl7XG4gICAgICAgIHZhciBuZXdOb2RlID0gbmV3IG1vZGVsLkRlY2lzaW9uTm9kZSh0aGlzLmxheW91dC5nZXROZXdDaGlsZExvY2F0aW9uKHBhcmVudCkpO1xuICAgICAgICB0aGlzLmFkZE5vZGUobmV3Tm9kZSwgcGFyZW50KVxuICAgIH1cbiAgICBhZGRDaGFuY2VOb2RlKHBhcmVudCl7XG4gICAgICAgIHZhciBuZXdOb2RlID0gbmV3IG1vZGVsLkNoYW5jZU5vZGUodGhpcy5sYXlvdXQuZ2V0TmV3Q2hpbGRMb2NhdGlvbihwYXJlbnQpKTtcbiAgICAgICAgdGhpcy5hZGROb2RlKG5ld05vZGUsIHBhcmVudClcbiAgICB9XG4gICAgYWRkVGVybWluYWxOb2RlKHBhcmVudCl7XG4gICAgICAgIHZhciBuZXdOb2RlID0gbmV3IG1vZGVsLlRlcm1pbmFsTm9kZSh0aGlzLmxheW91dC5nZXROZXdDaGlsZExvY2F0aW9uKHBhcmVudCkpO1xuICAgICAgICB0aGlzLmFkZE5vZGUobmV3Tm9kZSwgcGFyZW50KVxuICAgIH1cblxuICAgIGluamVjdE5vZGUobm9kZSwgZWRnZSl7XG4gICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoKTtcbiAgICAgICAgdGhpcy5kYXRhLmluamVjdE5vZGUobm9kZSwgZWRnZSk7XG4gICAgICAgIHRoaXMucmVkcmF3KCk7XG4gICAgICAgIHRoaXMubGF5b3V0LnVwZGF0ZShub2RlKTtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuXG4gICAgaW5qZWN0RGVjaXNpb25Ob2RlKGVkZ2Upe1xuICAgICAgICB2YXIgbmV3Tm9kZSA9IG5ldyBtb2RlbC5EZWNpc2lvbk5vZGUodGhpcy5sYXlvdXQuZ2V0SW5qZWN0ZWROb2RlTG9jYXRpb24oZWRnZSkpO1xuICAgICAgICB0aGlzLmluamVjdE5vZGUobmV3Tm9kZSwgZWRnZSk7XG5cbiAgICB9XG5cbiAgICBpbmplY3RDaGFuY2VOb2RlKGVkZ2Upe1xuICAgICAgICB2YXIgbmV3Tm9kZSA9IG5ldyBtb2RlbC5DaGFuY2VOb2RlKHRoaXMubGF5b3V0LmdldEluamVjdGVkTm9kZUxvY2F0aW9uKGVkZ2UpKTtcbiAgICAgICAgdGhpcy5pbmplY3ROb2RlKG5ld05vZGUsIGVkZ2UpO1xuICAgIH1cblxuICAgIHJlbW92ZU5vZGUobm9kZSkge1xuICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKCk7XG4gICAgICAgIHRoaXMuZGF0YS5yZW1vdmVOb2RlKG5vZGUpO1xuXG5cbiAgICAgICAgaWYoIXRoaXMubGF5b3V0LmlzTWFudWFsTGF5b3V0KCkpe1xuICAgICAgICAgICAgdGhpcy5sYXlvdXQudXBkYXRlKCk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5yZWRyYXcoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbW92ZVNlbGVjdGVkTm9kZXMoKSB7XG4gICAgICAgIHZhciBzZWxlY3RlZE5vZGVzID0gdGhpcy5nZXRTZWxlY3RlZE5vZGVzKCk7XG4gICAgICAgIGlmKCFzZWxlY3RlZE5vZGVzLmxlbmd0aCl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSgpO1xuICAgICAgICB0aGlzLmRhdGEucmVtb3ZlTm9kZXMoc2VsZWN0ZWROb2Rlcyk7XG4gICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgdGhpcy5yZWRyYXcoKTtcbiAgICAgICAgdGhpcy5sYXlvdXQudXBkYXRlKCk7XG4gICAgfVxuXG4gICAgcmVtb3ZlU2VsZWN0ZWRUZXh0cygpe1xuICAgICAgICB2YXIgc2VsZWN0ZWRUZXh0cyA9IHRoaXMuZ2V0U2VsZWN0ZWRUZXh0cygpO1xuXG4gICAgICAgIGlmKCFzZWxlY3RlZFRleHRzLmxlbmd0aCl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSgpO1xuICAgICAgICB0aGlzLmRhdGEucmVtb3ZlVGV4dHMoc2VsZWN0ZWRUZXh0cyk7XG4gICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgdGhpcy5yZWRyYXcoKTtcbiAgICB9XG5cbiAgICBjb3B5Tm9kZShkLCBub3RDbGVhclByZXZTZWxlY3Rpb24pIHtcbiAgICAgICAgdmFyIGNsb25lID0gdGhpcy5kYXRhLmNsb25lU3VidHJlZShkKTtcbiAgICAgICAgaWYobm90Q2xlYXJQcmV2U2VsZWN0aW9uKXtcbiAgICAgICAgICAgIGlmKCF0aGlzLmNvcGllZE5vZGVzKXtcbiAgICAgICAgICAgICAgICB0aGlzLmNvcGllZE5vZGVzPVtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jb3BpZWROb2Rlcy5wdXNoKGNsb25lKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLmNvcGllZE5vZGVzID0gW2Nsb25lXTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgY3V0Tm9kZShkKSB7XG4gICAgICAgIHRoaXMuY29weU5vZGUoZCk7XG4gICAgICAgIHRoaXMucmVtb3ZlTm9kZShkKTtcbiAgICB9XG5cbiAgICBjdXRTZWxlY3RlZE5vZGVzKCl7XG4gICAgICAgIHZhciBzZWxlY3RlZE5vZGVzID0gdGhpcy5nZXRTZWxlY3RlZE5vZGVzKCk7XG4gICAgICAgIHZhciBzZWxlY3RlZFJvb3RzID0gdGhpcy5kYXRhLmZpbmRTdWJ0cmVlUm9vdHMoc2VsZWN0ZWROb2Rlcyk7XG4gICAgICAgIHRoaXMuY29weU5vZGVzKHNlbGVjdGVkUm9vdHMpO1xuICAgICAgICB0aGlzLnJlbW92ZVNlbGVjdGVkTm9kZXMoKTtcbiAgICB9XG5cbiAgICBjb3B5U2VsZWN0ZWROb2RlcygpIHtcbiAgICAgICAgdmFyIHNlbGY7XG4gICAgICAgIHZhciBzZWxlY3RlZE5vZGVzID0gdGhpcy5nZXRTZWxlY3RlZE5vZGVzKCk7XG5cbiAgICAgICAgdmFyIHNlbGVjdGVkUm9vdHMgPSB0aGlzLmRhdGEuZmluZFN1YnRyZWVSb290cyhzZWxlY3RlZE5vZGVzKTtcbiAgICAgICAgdGhpcy5jb3B5Tm9kZXMoc2VsZWN0ZWRSb290cyk7XG5cblxuICAgIH1cblxuICAgIGNvcHlOb2Rlcyhub2Rlcyl7XG4gICAgICAgIHRoaXMuY29waWVkTm9kZXMgPSBub2Rlcy5tYXAoZD0+dGhpcy5kYXRhLmNsb25lU3VidHJlZShkKSk7XG4gICAgfVxuXG5cblxuICAgIHBhc3RlVG9Ob2RlKG5vZGUpIHtcbiAgICAgICAgaWYoIXRoaXMuY29waWVkTm9kZXMgfHwgIXRoaXMuY29waWVkTm9kZXMubGVuZ3RoKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKCk7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgc2VsZi5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICB2YXIgbm9kZXNUb0F0dGFjaCA9IHRoaXMuY29waWVkTm9kZXM7XG4gICAgICAgIHNlbGYuY29weU5vZGVzKHRoaXMuY29waWVkTm9kZXMpO1xuICAgICAgICBub2Rlc1RvQXR0YWNoLmZvckVhY2godG9BdHRhY2g9PntcbiAgICAgICAgICAgIHZhciBhdHRhY2hlZCA9IHRoaXMuZGF0YS5hdHRhY2hTdWJ0cmVlKHRvQXR0YWNoLCBub2RlKS5jaGlsZE5vZGU7XG4gICAgICAgICAgICBpZihhdHRhY2hlZC5mb2xkZWQpe1xuICAgICAgICAgICAgICAgIHNlbGYuZm9sZFN1YnRyZWUoYXR0YWNoZWQsIGF0dGFjaGVkLmZvbGRlZCwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGxvY2F0aW9uID0gc2VsZi5sYXlvdXQuZ2V0TmV3Q2hpbGRMb2NhdGlvbihub2RlKTtcbiAgICAgICAgICAgIGF0dGFjaGVkLm1vdmVUbyhsb2NhdGlvbi54LCBsb2NhdGlvbi55LCB0cnVlKTtcbiAgICAgICAgICAgIHNlbGYubGF5b3V0Lm1vdmVOb2RlVG9FbXB0eVBsYWNlKGF0dGFjaGVkLCBmYWxzZSk7XG4gICAgICAgICAgICBzZWxmLmxheW91dC5maXROb2Rlc0luUGxvdHRpbmdSZWdpb24odGhpcy5kYXRhLmdldEFsbERlc2NlbmRhbnROb2RlcyhhdHRhY2hlZCkpO1xuXG4gICAgICAgICAgICBzZWxmLnNlbGVjdFN1YlRyZWUoYXR0YWNoZWQsIGZhbHNlLCBub2Rlc1RvQXR0YWNoLmxlbmd0aD4xKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYobm9kZS5mb2xkZWQpe1xuICAgICAgICAgICAgc2VsZi5mb2xkU3VidHJlZShub2RlLCBub2RlLmZvbGRlZCwgZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgc2VsZi5yZWRyYXcoKTtcbiAgICAgICAgICAgIHNlbGYubGF5b3V0LnVwZGF0ZSgpO1xuICAgICAgICB9LDEwKVxuXG4gICAgfVxuXG4gICAgcGFzdGVUb05ld0xvY2F0aW9uKHBvaW50KSB7XG4gICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoKTtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBzZWxmLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgIHZhciBub2Rlc1RvQXR0YWNoID0gdGhpcy5jb3BpZWROb2RlcztcbiAgICAgICAgc2VsZi5jb3B5Tm9kZXModGhpcy5jb3BpZWROb2Rlcyk7XG4gICAgICAgIG5vZGVzVG9BdHRhY2guZm9yRWFjaCh0b0F0dGFjaD0+IHtcbiAgICAgICAgICAgIHZhciBhdHRhY2hlZCA9IHRoaXMuZGF0YS5hdHRhY2hTdWJ0cmVlKHRvQXR0YWNoKTtcbiAgICAgICAgICAgIGlmKGF0dGFjaGVkLmZvbGRlZCl7XG4gICAgICAgICAgICAgICAgc2VsZi5mb2xkU3VidHJlZShhdHRhY2hlZCwgYXR0YWNoZWQuZm9sZGVkLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhdHRhY2hlZC5tb3ZlVG8ocG9pbnQueCwgcG9pbnQueSwgdHJ1ZSk7XG4gICAgICAgICAgICBzZWxmLmxheW91dC5tb3ZlTm9kZVRvRW1wdHlQbGFjZShhdHRhY2hlZCwgZmFsc2UpO1xuICAgICAgICAgICAgc2VsZi5sYXlvdXQuZml0Tm9kZXNJblBsb3R0aW5nUmVnaW9uKHRoaXMuZGF0YS5nZXRBbGxEZXNjZW5kYW50Tm9kZXMoYXR0YWNoZWQpKTtcblxuICAgICAgICAgICAgc2VsZi5zZWxlY3RTdWJUcmVlKGF0dGFjaGVkLCBmYWxzZSwgbm9kZXNUb0F0dGFjaC5sZW5ndGg+MSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHNlbGYucmVkcmF3KCk7XG4gICAgICAgICAgICBzZWxmLmxheW91dC51cGRhdGUoKTtcbiAgICAgICAgfSwxMClcblxuICAgIH1cblxuICAgIGNvbnZlcnROb2RlKG5vZGUsIHR5cGVUb0NvbnZlcnRUbyl7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSgpO1xuICAgICAgICB0aGlzLmRhdGEuY29udmVydE5vZGUobm9kZSwgdHlwZVRvQ29udmVydFRvKTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgc2VsZi5yZWRyYXcodHJ1ZSk7XG4gICAgICAgIH0sMTApXG4gICAgfVxuXG4gICAgcGVyZm9ybU9wZXJhdGlvbihvYmplY3QsIG9wZXJhdGlvbil7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSgpO1xuICAgICAgICBvcGVyYXRpb24ucGVyZm9ybShvYmplY3QpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBzZWxmLnJlZHJhdygpO1xuICAgICAgICAgICAgc2VsZi5sYXlvdXQudXBkYXRlKCk7XG4gICAgICAgIH0sMTApXG4gICAgfVxuXG4gICAgZm9sZFN1YnRyZWUobm9kZSwgZm9sZCA9IHRydWUsIHJlZHJhdz10cnVlKXtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBub2RlLmZvbGRlZCA9IGZvbGQ7XG5cbiAgICAgICAgdGhpcy5kYXRhLmdldEFsbERlc2NlbmRhbnROb2Rlcyhub2RlKS5mb3JFYWNoKG49PntcbiAgICAgICAgICAgIG4uJGhpZGRlbiA9IGZvbGQ7XG4gICAgICAgICAgICBuLmZvbGRlZCA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5kYXRhLmdldEFsbERlc2NlbmRhbnRFZGdlcyhub2RlKS5mb3JFYWNoKGU9PmUuJGhpZGRlbiA9IGZvbGQpO1xuXG4gICAgICAgIGlmKCFyZWRyYXcpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHNlbGYucmVkcmF3KCk7XG4gICAgICAgICAgICBzZWxmLmxheW91dC51cGRhdGUoKTtcbiAgICAgICAgfSwxMClcbiAgICB9XG5cbiAgICB1cGRhdGVWaXNpYmlsaXR5KG5vZGUgPSBudWxsKXtcbiAgICAgICAgaWYoIW5vZGUpe1xuICAgICAgICAgICAgdGhpcy5kYXRhLmdldFJvb3RzKCkuZm9yRWFjaChuPT50aGlzLnVwZGF0ZVZpc2liaWxpdHkobikpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYobm9kZS5mb2xkZWQpe1xuICAgICAgICAgICAgdGhpcy5mb2xkU3VidHJlZShub2RlLCB0cnVlLCBmYWxzZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBub2RlLmNoaWxkRWRnZXMuZm9yRWFjaChlID0+IHRoaXMudXBkYXRlVmlzaWJpbGl0eShlLmNoaWxkTm9kZSkpO1xuXG4gICAgfVxuXG4gICAgbW92ZU5vZGVUbyh4LHkpe1xuXG4gICAgfVxuXG4gICAgdXBkYXRlTm9kZVBvc2l0aW9uKG5vZGUpIHtcbiAgICAgICAgdGhpcy5nZXROb2RlRDNTZWxlY3Rpb24obm9kZSkucmFpc2UoKS5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcrbm9kZS5sb2NhdGlvbi54KycgJytub2RlLmxvY2F0aW9uLnkrJyknKTtcbiAgICB9XG5cbiAgICB1cGRhdGVUZXh0UG9zaXRpb24odGV4dCkge1xuICAgICAgICB0aGlzLmdldFRleHREM1NlbGVjdGlvbih0ZXh0KS5yYWlzZSgpLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyt0ZXh0LmxvY2F0aW9uLngrJyAnK3RleHQubG9jYXRpb24ueSsnKScpO1xuICAgIH1cblxuICAgIGdldE5vZGVEM1NlbGVjdGlvbihub2RlKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Tm9kZUQzU2VsZWN0aW9uQnlJZChub2RlLiRpZCk7XG4gICAgfVxuXG4gICAgZ2V0Tm9kZUQzU2VsZWN0aW9uQnlJZChpZCl7XG4gICAgICAgIHJldHVybiB0aGlzLm1haW5Hcm91cC5zZWxlY3QoJyNub2RlLScraWQpO1xuICAgIH1cbiAgICBnZXRUZXh0RDNTZWxlY3Rpb24odGV4dCl7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFRleHREM1NlbGVjdGlvbkJ5SWQodGV4dC4kaWQpO1xuICAgIH1cbiAgICBnZXRUZXh0RDNTZWxlY3Rpb25CeUlkKGlkKXtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFpbkdyb3VwLnNlbGVjdCgnI3RleHQtJytpZCk7XG4gICAgfVxuXG4gICAgZ2V0U2VsZWN0ZWROb2Rlcyh2aXNpYmxlT25seSA9IGZhbHNlKSB7XG4gICAgICAgIGxldCBzZWxlY3RlZFZpc2libGUgPSB0aGlzLm1haW5Hcm91cC5zZWxlY3RBbGwoXCIubm9kZS5zZWxlY3RlZFwiKS5kYXRhKCk7XG4gICAgICAgIGlmKHZpc2libGVPbmx5KXtcbiAgICAgICAgICAgIHJldHVybiBzZWxlY3RlZFZpc2libGU7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYWxsU2VsZWN0ZWQgID0gW107XG4gICAgICAgIGFsbFNlbGVjdGVkLnB1c2goLi4uc2VsZWN0ZWRWaXNpYmxlKTtcblxuICAgICAgICBzZWxlY3RlZFZpc2libGUuZm9yRWFjaChuPT57XG4gICAgICAgICAgICBpZihuLmZvbGRlZCl7XG4gICAgICAgICAgICAgICAgbGV0IGRlc2NlbmRhbnRzID0gdGhpcy5kYXRhLmdldEFsbERlc2NlbmRhbnROb2RlcyhuKTtcbiAgICAgICAgICAgICAgICBpZihkZXNjZW5kYW50cyl7XG4gICAgICAgICAgICAgICAgICAgIGFsbFNlbGVjdGVkLnB1c2goLi4uZGVzY2VuZGFudHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGFsbFNlbGVjdGVkO1xuICAgIH1cblxuICAgIGdldFNlbGVjdGVkVGV4dHMoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFpbkdyb3VwLnNlbGVjdEFsbChcIi5mbG9hdGluZy10ZXh0LnNlbGVjdGVkXCIpLmRhdGEoKTtcbiAgICB9XG5cbiAgICBjbGVhclNlbGVjdGlvbigpe1xuICAgICAgICB0aGlzLm1haW5Hcm91cC5zZWxlY3RBbGwoXCIuZWRnZS5zZWxlY3RlZFwiKS5zZWxlY3QoJ3BhdGgnKS5hdHRyKFwibWFya2VyLWVuZFwiLCBkID0+IFwidXJsKCNhcnJvd1wiKyh0aGlzLmlzT3B0aW1hbChkKT8nLW9wdGltYWwnOicnKStcIilcIilcbiAgICAgICAgdGhpcy5tYWluR3JvdXAuc2VsZWN0QWxsKFwiLnNlbGVjdGVkXCIpLmNsYXNzZWQoJ3NlbGVjdGVkJywgZmFsc2UpO1xuICAgICAgICB0aGlzLmNvbmZpZy5vblNlbGVjdGlvbkNsZWFyZWQoKTtcbiAgICB9XG5cbiAgICBzZWxlY3RFZGdlKGVkZ2UsIGNsZWFyU2VsZWN0aW9uQmVmb3JlU2VsZWN0KXtcbiAgICAgICAgaWYoY2xlYXJTZWxlY3Rpb25CZWZvcmVTZWxlY3Qpe1xuICAgICAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29uZmlnLm9uRWRnZVNlbGVjdGVkKGVkZ2UpO1xuICAgICAgICB0aGlzLm1haW5Hcm91cC5zZWxlY3QoJyNlZGdlLScrZWRnZS4kaWQpXG4gICAgICAgICAgICAuY2xhc3NlZCgnc2VsZWN0ZWQnLCB0cnVlKVxuICAgICAgICAgICAgLnNlbGVjdCgncGF0aCcpXG4gICAgICAgICAgICAuYXR0cihcIm1hcmtlci1lbmRcIiwgZCA9PiBcInVybCgjYXJyb3ctc2VsZWN0ZWQpXCIpXG4gICAgfVxuXG4gICAgaXNOb2RlU2VsZWN0ZWQobm9kZSl7XG4gICAgICAgIHJldHVybiB0aGlzLmdldE5vZGVEM1NlbGVjdGlvbihub2RlKS5jbGFzc2VkKCdzZWxlY3RlZCcpO1xuICAgIH1cblxuICAgIHNlbGVjdE5vZGUobm9kZSwgY2xlYXJTZWxlY3Rpb25CZWZvcmVTZWxlY3QsIHNraXBDYWxsYmFjayl7XG4gICAgICAgIGlmKGNsZWFyU2VsZWN0aW9uQmVmb3JlU2VsZWN0KXtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCFza2lwQ2FsbGJhY2spe1xuICAgICAgICAgICAgdGhpcy5jb25maWcub25Ob2RlU2VsZWN0ZWQobm9kZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmdldE5vZGVEM1NlbGVjdGlvbkJ5SWQobm9kZS4kaWQpLmNsYXNzZWQoJ3NlbGVjdGVkJywgdHJ1ZSk7XG4gICAgfVxuXG4gICAgc2VsZWN0VGV4dCh0ZXh0LCBjbGVhclNlbGVjdGlvbkJlZm9yZVNlbGVjdCwgc2tpcENhbGxiYWNrKXtcbiAgICAgICAgaWYoY2xlYXJTZWxlY3Rpb25CZWZvcmVTZWxlY3Qpe1xuICAgICAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIXNraXBDYWxsYmFjayl7XG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5vblRleHRTZWxlY3RlZCh0ZXh0KVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5nZXRUZXh0RDNTZWxlY3Rpb25CeUlkKHRleHQuJGlkKS5jbGFzc2VkKCdzZWxlY3RlZCcsIHRydWUpO1xuICAgIH1cblxuICAgIHNlbGVjdFN1YlRyZWUobm9kZSwgY2xlYXJTZWxlY3Rpb25CZWZvcmVTZWxlY3Qsc2tpcENhbGxiYWNrKSB7XG4gICAgICAgIGlmKGNsZWFyU2VsZWN0aW9uQmVmb3JlU2VsZWN0KXtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNlbGVjdE5vZGUobm9kZSwgZmFsc2UsIHNraXBDYWxsYmFjayk7XG4gICAgICAgIG5vZGUuY2hpbGRFZGdlcy5mb3JFYWNoKGU9PnRoaXMuc2VsZWN0U3ViVHJlZShlLmNoaWxkTm9kZSwgZmFsc2UsIHRydWUpKTtcbiAgICB9XG5cbiAgICBzZWxlY3RBbGxOb2RlcygpIHtcbiAgICAgICAgdGhpcy5tYWluR3JvdXAuc2VsZWN0QWxsKFwiLm5vZGVcIikuY2xhc3NlZCgnc2VsZWN0ZWQnLCB0cnVlKTtcbiAgICB9XG5cbiAgICBhdXRvTGF5b3V0KHR5cGUsIHdpdGhvdXRTdGF0ZVNhdmluZyl7XG4gICAgICAgIHRoaXMubGF5b3V0LmF1dG9MYXlvdXQodHlwZSwgd2l0aG91dFN0YXRlU2F2aW5nKTtcbiAgICB9XG5cbiAgICB1cGRhdGVEaWFncmFtVGl0bGUodGl0bGVWYWx1ZSl7XG4gICAgICAgIGlmKCF0aXRsZVZhbHVlKXtcbiAgICAgICAgICAgIHRpdGxlVmFsdWUgPSAnJztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRpYWdyYW1UaXRsZSA9IHRpdGxlVmFsdWU7XG4gICAgICAgIHRoaXMucmVkcmF3RGlhZ3JhbVRpdGxlKCk7XG4gICAgICAgIHRoaXMucmVkcmF3RGlhZ3JhbURlc2NyaXB0aW9uKCk7XG4gICAgICAgIHRoaXMudXBkYXRlTWFyZ2luKHRydWUpO1xuICAgIH1cblxuICAgIHJlZHJhd0RpYWdyYW1UaXRsZSgpe1xuICAgICAgICB2YXIgc3ZnV2lkdGggPSB0aGlzLnN2Zy5hdHRyKCd3aWR0aCcpO1xuICAgICAgICB2YXIgc3ZnSGVpZ2h0ID0gdGhpcy5zdmcuYXR0cignaGVpZ2h0Jyk7XG4gICAgICAgIHRoaXMudGl0bGVDb250YWluZXIgPSB0aGlzLnN2Zy5zZWxlY3RPckFwcGVuZCgnZy5zZC10aXRsZS1jb250YWluZXInKTtcblxuICAgICAgICB2YXIgdGl0bGUgPSB0aGlzLnRpdGxlQ29udGFpbmVyLnNlbGVjdE9yQXBwZW5kKCd0ZXh0LnNkLXRpdGxlJyk7XG4gICAgICAgIHRpdGxlLnRleHQodGhpcy5kaWFncmFtVGl0bGUpO1xuICAgICAgICBMYXlvdXQuc2V0SGFuZ2luZ1Bvc2l0aW9uKHRpdGxlKTtcblxuICAgICAgICB2YXIgbWFyZ2luVG9wID0gcGFyc2VJbnQodGhpcy5jb25maWcudGl0bGUubWFyZ2luLnRvcCk7XG4gICAgICAgIHRoaXMudGl0bGVDb250YWluZXIuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnKyhzdmdXaWR0aC8yKSsnLCcrKCBtYXJnaW5Ub3ApKycpJyk7XG4gICAgfVxuICAgIHJlZHJhd0RpYWdyYW1EZXNjcmlwdGlvbigpe1xuICAgICAgICB2YXIgc3ZnV2lkdGggPSB0aGlzLnN2Zy5hdHRyKCd3aWR0aCcpO1xuICAgICAgICB2YXIgc3ZnSGVpZ2h0ID0gdGhpcy5zdmcuYXR0cignaGVpZ2h0Jyk7XG4gICAgICAgIHRoaXMudGl0bGVDb250YWluZXIgPSB0aGlzLnN2Zy5zZWxlY3RPckFwcGVuZCgnZy5zZC10aXRsZS1jb250YWluZXInKTtcblxuICAgICAgICB2YXIgZGVzYyA9IHRoaXMudGl0bGVDb250YWluZXIuc2VsZWN0T3JBcHBlbmQoJ3RleHQuc2QtZGVzY3JpcHRpb24nKTtcblxuICAgICAgICBpZighdGhpcy5jb25maWcuZGVzY3JpcHRpb24uc2hvdyl7XG4gICAgICAgICAgICBkZXNjLnJlbW92ZSgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGxpbmVzID0gdGhpcy5kaWFncmFtRGVzY3JpcHRpb24gPyB0aGlzLmRpYWdyYW1EZXNjcmlwdGlvbi5zcGxpdCgnXFxuJykgOiBbXTtcbiAgICAgICAgdmFyIHRzcGFucyA9IGRlc2Muc2VsZWN0QWxsKCd0c3BhbicpLmRhdGEobGluZXMpO1xuICAgICAgICB0c3BhbnMuZW50ZXIoKS5hcHBlbmQoJ3RzcGFuJylcbiAgICAgICAgICAgIC5tZXJnZSh0c3BhbnMpXG4gICAgICAgICAgICAuaHRtbChsPT5BcHBVdGlscy5yZXBsYWNlVXJscyhBcHBVdGlscy5lc2NhcGVIdG1sKGwpKSlcbiAgICAgICAgICAgIC5hdHRyKCdkeScsIChkLGkpPT5pPjAgPyAnMS4xZW0nOiB1bmRlZmluZWQpXG4gICAgICAgICAgICAuYXR0cigneCcsICcwJyk7XG5cbiAgICAgICAgdHNwYW5zLmV4aXQoKS5yZW1vdmUoKTtcbiAgICAgICAgTGF5b3V0LnNldEhhbmdpbmdQb3NpdGlvbihkZXNjKTtcblxuICAgICAgICB2YXIgdGl0bGUgPSB0aGlzLnRpdGxlQ29udGFpbmVyLnNlbGVjdE9yQXBwZW5kKCd0ZXh0LnNkLXRpdGxlJyk7XG5cbiAgICAgICAgdmFyIG1hcmdpblRvcCA9IDA7XG4gICAgICAgIGlmKHRoaXMuZGlhZ3JhbVRpdGxlKXtcbiAgICAgICAgICAgIG1hcmdpblRvcCArPSB0aXRsZS5ub2RlKCkuZ2V0QkJveCgpLmhlaWdodDtcbiAgICAgICAgICAgIG1hcmdpblRvcCs9IE1hdGgubWF4KHBhcnNlSW50KHRoaXMuY29uZmlnLmRlc2NyaXB0aW9uLm1hcmdpbi50b3ApLCAwKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgZGVzYy5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKDAsJysoIG1hcmdpblRvcCkrJyknKTtcbiAgICB9XG5cbiAgICB1cGRhdGVEaWFncmFtRGVzY3JpcHRpb24oZGVzY3JpcHRpb25WYWx1ZSl7XG4gICAgICAgIGlmKCFkZXNjcmlwdGlvblZhbHVlKXtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uVmFsdWUgPSAnJztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRpYWdyYW1EZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uVmFsdWU7XG4gICAgICAgIHRoaXMucmVkcmF3RGlhZ3JhbVRpdGxlKCk7XG4gICAgICAgIHRoaXMucmVkcmF3RGlhZ3JhbURlc2NyaXB0aW9uKCk7XG4gICAgICAgIHRoaXMudXBkYXRlTWFyZ2luKHRydWUpO1xuICAgIH1cblxuXG4gICAgZ2V0VGl0bGVHcm91cEhlaWdodCh3aXRoTWFyZ2lucyl7XG4gICAgICAgIGlmKCF0aGlzLnRpdGxlQ29udGFpbmVyKXtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIHZhciBoID0gdGhpcy50aXRsZUNvbnRhaW5lci5ub2RlKCkuZ2V0QkJveCgpLmhlaWdodDtcbiAgICAgICAgaWYod2l0aE1hcmdpbnMpe1xuICAgICAgICAgICAgaCs9IHBhcnNlSW50KHRoaXMuY29uZmlnLnRpdGxlLm1hcmdpbi5ib3R0b20pO1xuICAgICAgICAgICAgaCs9IHBhcnNlSW50KHRoaXMuY29uZmlnLnRpdGxlLm1hcmdpbi50b3ApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBoO1xuICAgIH1cblxufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9zcmMvaW5kZXgnXG4iXX0=
