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
        key: 'getTextMinX',
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
        key: 'getTextMinY',
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
        key: 'getTextMaxX',
        value: function getTextMaxX(d) {
            return Number.MAX_SAFE_INTEGER;
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
            return Number.MAX_SAFE_INTEGER;
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
        key: 'moveTexts',
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

            self.treeDesigner.layout.moveTexts([draggedText], dx, dy);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLXV0aWxzLmpzIiwic3JjL2NvbnRleHQtbWVudS9jb250ZXh0LW1lbnUuanMiLCJzcmMvY29udGV4dC1tZW51L2VkZ2UtY29udGV4dC1tZW51LmpzIiwic3JjL2NvbnRleHQtbWVudS9tYWluLWNvbnRleHQtbWVudS5qcyIsInNyYy9jb250ZXh0LW1lbnUvbm9kZS1jb250ZXh0LW1lbnUuanMiLCJzcmMvY29udGV4dC1tZW51L3RleHQtY29udGV4dC1tZW51LmpzIiwic3JjL2QzLWV4dGVuc2lvbnMuanMiLCJzcmMvZDMuanMiLCJzcmMvaTE4bi9kZS5qc29uIiwic3JjL2kxOG4vZW4uanNvbiIsInNyYy9pMThuL2ZyLmpzb24iLCJzcmMvaTE4bi9pMThuLmpzIiwic3JjL2kxOG4vaXQuanNvbiIsInNyYy9pMThuL3BsLmpzb24iLCJzcmMvaW5kZXguanMiLCJzcmMvbGF5b3V0LmpzIiwic3JjL25vZGUtZHJhZy1oYW5kbGVyLmpzIiwic3JjL3N5bWJvbHMvY2lyY2xlLmpzIiwic3JjL3N5bWJvbHMvdHJpYW5nbGUuanMiLCJzcmMvdGVtcGxhdGVzLmpzIiwic3JjL3RlbXBsYXRlcy9ncm93bF9tZXNzYWdlLmh0bWwiLCJzcmMvdGV4dC1kcmFnLWhhbmRsZXIuanMiLCJzcmMvdG9vbHRpcC5qcyIsInNyYy90cmVlLWRlc2lnbmVyLmpzIiwiaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBOztJLEFBQVk7O0FBQ1o7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0ksQUFFYTs7Ozs7O2FBa0JUOzs7OEMsQUFDNkIsVyxBQUFXLFksQUFBWSxPQUFPLEFBQ3ZEO2dCQUFJLFVBQVUsVUFBZCxBQUFjLEFBQVUsQUFDeEI7b0JBQUEsQUFBUSxjQUFSLEFBQXNCLEFBRXRCOztnQkFBSSxTQUFKLEFBQWEsQUFDYjtn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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEVBOzs7O0FBQ0E7O0ksQUFBWTs7QUFDWjs7SSxBQUFZOztBQUNaOztJLEFBQVk7O0FBQ1o7O0ksQUFBWTs7QUFDWjs7SSxBQUFZOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SSxBQUVDLGUs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QVksTUFBWixBQUFrQixPQUEvQixBQUFJLEFBQWtDLEFBQ3pDO0FBQ0Q7bUJBQUEsQUFBTyxBQUNWOzs7Ozs7Ozs7Ozs7Ozs7O0FDajdDTCwyQ0FBQTtpREFBQTs7Z0JBQUE7d0JBQUE7b0JBQUE7QUFBQTtBQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCAqIGFzIGQzIGZyb20gXCIuL2QzXCI7XG5pbXBvcnQge1RlbXBsYXRlc30gZnJvbSBcIi4vdGVtcGxhdGVzXCI7XG5pbXBvcnQge2kxOG59IGZyb20gXCIuL2kxOG4vaTE4blwiO1xuaW1wb3J0IHtVdGlsc30gZnJvbSBcInNkLXV0aWxzXCI7XG5cbmV4cG9ydCBjbGFzcyBBcHBVdGlscyB7XG5cbiAgICBzdGF0aWMgc2FuaXRpemVIZWlnaHQgPSBmdW5jdGlvbiAoaGVpZ2h0LCBjb250YWluZXIpIHtcbiAgICAgICAgcmV0dXJuIChoZWlnaHQgfHwgcGFyc2VJbnQoY29udGFpbmVyLnN0eWxlKCdoZWlnaHQnKSwgMTApIHx8IDQwMCk7XG4gICAgfTtcblxuICAgIHN0YXRpYyBzYW5pdGl6ZVdpZHRoID0gZnVuY3Rpb24gKHdpZHRoLCBjb250YWluZXIpIHtcbiAgICAgICAgcmV0dXJuICh3aWR0aCB8fCBwYXJzZUludChjb250YWluZXIuc3R5bGUoJ3dpZHRoJyksIDEwKSB8fCA5NjApO1xuICAgIH07XG5cbiAgICBzdGF0aWMgYXZhaWxhYmxlSGVpZ2h0ID0gZnVuY3Rpb24gKGhlaWdodCwgY29udGFpbmVyLCBtYXJnaW4pIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KDAsIEFwcFV0aWxzLnNhbml0aXplSGVpZ2h0KGhlaWdodCwgY29udGFpbmVyKSAtIG1hcmdpbi50b3AgLSBtYXJnaW4uYm90dG9tKTtcbiAgICB9O1xuXG4gICAgc3RhdGljIGF2YWlsYWJsZVdpZHRoID0gZnVuY3Rpb24gKHdpZHRoLCBjb250YWluZXIsIG1hcmdpbikge1xuICAgICAgICByZXR1cm4gTWF0aC5tYXgoMCwgQXBwVXRpbHMuc2FuaXRpemVXaWR0aCh3aWR0aCwgY29udGFpbmVyKSAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0KTtcbiAgICB9O1xuXG4gICAgLy9wbGFjZXMgdGV4dFN0cmluZyBpbiB0ZXh0T2JqLCBhZGRzIGFuIGVsbGlwc2lzIGlmIHRleHQgY2FuJ3QgZml0IGluIHdpZHRoXG4gICAgc3RhdGljIHBsYWNlVGV4dFdpdGhFbGxpcHNpcyh0ZXh0RDNPYmosIHRleHRTdHJpbmcsIHdpZHRoKSB7XG4gICAgICAgIHZhciB0ZXh0T2JqID0gdGV4dEQzT2JqLm5vZGUoKTtcbiAgICAgICAgdGV4dE9iai50ZXh0Q29udGVudCA9IHRleHRTdHJpbmc7XG5cbiAgICAgICAgdmFyIG1hcmdpbiA9IDA7XG4gICAgICAgIHZhciBlbGxpcHNpc0xlbmd0aCA9IDk7XG4gICAgICAgIC8vZWxsaXBzaXMgaXMgbmVlZGVkXG4gICAgICAgIGlmICh0ZXh0T2JqLmdldENvbXB1dGVkVGV4dExlbmd0aCgpID4gd2lkdGggKyBtYXJnaW4pIHtcbiAgICAgICAgICAgIGZvciAodmFyIHggPSB0ZXh0U3RyaW5nLmxlbmd0aCAtIDM7IHggPiAwOyB4IC09IDEpIHtcbiAgICAgICAgICAgICAgICBpZiAodGV4dE9iai5nZXRTdWJTdHJpbmdMZW5ndGgoMCwgeCkgKyBlbGxpcHNpc0xlbmd0aCA8PSB3aWR0aCArIG1hcmdpbikge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0T2JqLnRleHRDb250ZW50ID0gdGV4dFN0cmluZy5zdWJzdHJpbmcoMCwgeCkgKyBcIi4uLlwiO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0ZXh0T2JqLnRleHRDb250ZW50ID0gXCIuLi5cIjsgLy9jYW4ndCBwbGFjZSBhdCBhbGxcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBzdGF0aWMgcGxhY2VUZXh0V2l0aEVsbGlwc2lzQW5kVG9vbHRpcCh0ZXh0RDNPYmosIHRleHRTdHJpbmcsIHdpZHRoLCB0b29sdGlwKSB7XG4gICAgICAgIHZhciBlbGxpcHNpc1BsYWNlZCA9IEFwcFV0aWxzLnBsYWNlVGV4dFdpdGhFbGxpcHNpcyh0ZXh0RDNPYmosIHRleHRTdHJpbmcsIHdpZHRoKTtcbiAgICAgICAgaWYgKGVsbGlwc2lzUGxhY2VkICYmIHRvb2x0aXApIHtcbiAgICAgICAgICAgIHRleHREM09iai5vbihcIm1vdXNlb3ZlclwiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHRvb2x0aXAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAgICAgICAgIC5kdXJhdGlvbigyMDApXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgLjkpO1xuICAgICAgICAgICAgICAgIHRvb2x0aXAuaHRtbCh0ZXh0U3RyaW5nKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIChkMy5ldmVudC5wYWdlWCArIDUpICsgXCJweFwiKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0b3BcIiwgKGQzLmV2ZW50LnBhZ2VZIC0gMjgpICsgXCJweFwiKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0ZXh0RDNPYmoub24oXCJtb3VzZW91dFwiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHRvb2x0aXAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAgICAgICAgIC5kdXJhdGlvbig1MDApXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgMCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgc3RhdGljIGdldEZvbnRTaXplKGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQsIG51bGwpLmdldFByb3BlcnR5VmFsdWUoXCJmb250LXNpemVcIik7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldFRyYW5zbGF0aW9uKHRyYW5zZm9ybSkge1xuICAgICAgICAvLyBDcmVhdGUgYSBkdW1teSBnIGZvciBjYWxjdWxhdGlvbiBwdXJwb3NlcyBvbmx5LiBUaGlzIHdpbGwgbmV2ZXJcbiAgICAgICAgLy8gYmUgYXBwZW5kZWQgdG8gdGhlIERPTSBhbmQgd2lsbCBiZSBkaXNjYXJkZWQgb25jZSB0aGlzIGZ1bmN0aW9uXG4gICAgICAgIC8vIHJldHVybnMuXG4gICAgICAgIHZhciBnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJnXCIpO1xuXG4gICAgICAgIC8vIFNldCB0aGUgdHJhbnNmb3JtIGF0dHJpYnV0ZSB0byB0aGUgcHJvdmlkZWQgc3RyaW5nIHZhbHVlLlxuICAgICAgICBnLnNldEF0dHJpYnV0ZU5TKG51bGwsIFwidHJhbnNmb3JtXCIsIHRyYW5zZm9ybSk7XG5cbiAgICAgICAgLy8gY29uc29saWRhdGUgdGhlIFNWR1RyYW5zZm9ybUxpc3QgY29udGFpbmluZyBhbGwgdHJhbnNmb3JtYXRpb25zXG4gICAgICAgIC8vIHRvIGEgc2luZ2xlIFNWR1RyYW5zZm9ybSBvZiB0eXBlIFNWR19UUkFOU0ZPUk1fTUFUUklYIGFuZCBnZXRcbiAgICAgICAgLy8gaXRzIFNWR01hdHJpeC5cbiAgICAgICAgdmFyIG1hdHJpeCA9IGcudHJhbnNmb3JtLmJhc2VWYWwuY29uc29saWRhdGUoKS5tYXRyaXg7XG5cbiAgICAgICAgLy8gQXMgcGVyIGRlZmluaXRpb24gdmFsdWVzIGUgYW5kIGYgYXJlIHRoZSBvbmVzIGZvciB0aGUgdHJhbnNsYXRpb24uXG4gICAgICAgIHJldHVybiBbbWF0cml4LmUsIG1hdHJpeC5mXTtcbiAgICB9XG5cblxuICAgIHN0YXRpYyBjbG9zZXN0UG9pbnQocGF0aE5vZGUsIHBvaW50KSB7XG4gICAgICAgIHZhciBwYXRoTGVuZ3RoID0gcGF0aE5vZGUuZ2V0VG90YWxMZW5ndGgoKSxcbiAgICAgICAgICAgIHByZWNpc2lvbiA9IDgsXG4gICAgICAgICAgICBiZXN0LFxuICAgICAgICAgICAgYmVzdExlbmd0aCxcbiAgICAgICAgICAgIGJlc3REaXN0YW5jZSA9IEluZmluaXR5O1xuXG4gICAgICAgIC8vIGxpbmVhciBzY2FuIGZvciBjb2Fyc2UgYXBwcm94aW1hdGlvblxuICAgICAgICBmb3IgKHZhciBzY2FuLCBzY2FuTGVuZ3RoID0gMCwgc2NhbkRpc3RhbmNlOyBzY2FuTGVuZ3RoIDw9IHBhdGhMZW5ndGg7IHNjYW5MZW5ndGggKz0gcHJlY2lzaW9uKSB7XG4gICAgICAgICAgICBpZiAoKHNjYW5EaXN0YW5jZSA9IGRpc3RhbmNlMihzY2FuID0gcGF0aE5vZGUuZ2V0UG9pbnRBdExlbmd0aChzY2FuTGVuZ3RoKSkpIDwgYmVzdERpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgYmVzdCA9IHNjYW4sIGJlc3RMZW5ndGggPSBzY2FuTGVuZ3RoLCBiZXN0RGlzdGFuY2UgPSBzY2FuRGlzdGFuY2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBiaW5hcnkgc2VhcmNoIGZvciBwcmVjaXNlIGVzdGltYXRlXG4gICAgICAgIHByZWNpc2lvbiAvPSAyO1xuICAgICAgICB3aGlsZSAocHJlY2lzaW9uID4gMC41KSB7XG4gICAgICAgICAgICB2YXIgYmVmb3JlLFxuICAgICAgICAgICAgICAgIGFmdGVyLFxuICAgICAgICAgICAgICAgIGJlZm9yZUxlbmd0aCxcbiAgICAgICAgICAgICAgICBhZnRlckxlbmd0aCxcbiAgICAgICAgICAgICAgICBiZWZvcmVEaXN0YW5jZSxcbiAgICAgICAgICAgICAgICBhZnRlckRpc3RhbmNlO1xuICAgICAgICAgICAgaWYgKChiZWZvcmVMZW5ndGggPSBiZXN0TGVuZ3RoIC0gcHJlY2lzaW9uKSA+PSAwICYmIChiZWZvcmVEaXN0YW5jZSA9IGRpc3RhbmNlMihiZWZvcmUgPSBwYXRoTm9kZS5nZXRQb2ludEF0TGVuZ3RoKGJlZm9yZUxlbmd0aCkpKSA8IGJlc3REaXN0YW5jZSkge1xuICAgICAgICAgICAgICAgIGJlc3QgPSBiZWZvcmUsIGJlc3RMZW5ndGggPSBiZWZvcmVMZW5ndGgsIGJlc3REaXN0YW5jZSA9IGJlZm9yZURpc3RhbmNlO1xuICAgICAgICAgICAgfSBlbHNlIGlmICgoYWZ0ZXJMZW5ndGggPSBiZXN0TGVuZ3RoICsgcHJlY2lzaW9uKSA8PSBwYXRoTGVuZ3RoICYmIChhZnRlckRpc3RhbmNlID0gZGlzdGFuY2UyKGFmdGVyID0gcGF0aE5vZGUuZ2V0UG9pbnRBdExlbmd0aChhZnRlckxlbmd0aCkpKSA8IGJlc3REaXN0YW5jZSkge1xuICAgICAgICAgICAgICAgIGJlc3QgPSBhZnRlciwgYmVzdExlbmd0aCA9IGFmdGVyTGVuZ3RoLCBiZXN0RGlzdGFuY2UgPSBhZnRlckRpc3RhbmNlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwcmVjaXNpb24gLz0gMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGJlc3QgPSBbYmVzdC54LCBiZXN0LnldO1xuICAgICAgICBiZXN0LmRpc3RhbmNlID0gTWF0aC5zcXJ0KGJlc3REaXN0YW5jZSk7XG4gICAgICAgIHJldHVybiBiZXN0O1xuXG4gICAgICAgIGZ1bmN0aW9uIGRpc3RhbmNlMihwKSB7XG4gICAgICAgICAgICB2YXIgZHggPSBwLnggLSBwb2ludFswXSxcbiAgICAgICAgICAgICAgICBkeSA9IHAueSAtIHBvaW50WzFdO1xuICAgICAgICAgICAgcmV0dXJuIGR4ICogZHggKyBkeSAqIGR5O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGdyb3dsKG1lc3NhZ2UsIHR5cGU9J2luZm8nLCBwb3NpdGlvbj0ncmlnaHQnLCB0aW1lID0gMjAwMCl7XG4gICAgICAgIHZhciBodG1sID0gVGVtcGxhdGVzLmdldCgnZ3Jvd2wnLCB7bWVzc2FnZTptZXNzYWdlLCB0eXBlOnR5cGV9KVxuXG4gICAgICAgIHZhciBnID0gZDMuc2VsZWN0KCdib2R5Jykuc2VsZWN0T3JBcHBlbmQoJ2Rpdi5zZC1ncm93bC1saXN0LicrcG9zaXRpb24pLmFwcGVuZCgnZGl2JykuaHRtbChodG1sKTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgZy5yZW1vdmUoKTtcbiAgICAgICAgfSwgdGltZSlcbiAgICB9XG5cblxuICAgIHN0YXRpYyBjcmVhdGVFbGVtZW50KHRhZywgYXR0cmlicywgcGFyZW50KSB7XG4gICAgICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcblxuICAgICAgICBpZiAoYXR0cmlicykge1xuICAgICAgICAgICAgQXBwVXRpbHMuZGVlcEV4dGVuZChlbCwgYXR0cmlicyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhcmVudCkge1xuICAgICAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKGVsKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWw7XG4gICAgfTtcblxuICAgIHN0YXRpYyByZW1vdmVFbGVtZW50KGVsZW1lbnQpIHtcbiAgICAgICAgZWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xuICAgIH1cblxuICAgIHN0YXRpYyByZXBsYWNlVXJscyh0ZXh0KXtcbiAgICAgICAgaWYoIXRleHQpe1xuICAgICAgICAgICAgcmV0dXJuIHRleHQ7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHVybFJlZ2V4cCA9IC8oKGZ0cHxodHRwfGh0dHBzKTpcXC9cXC8oXFx3Kzp7MCwxfVxcdypAKT8oXFxTKykoOlswLTldKyk/KFxcL3xcXC8oW1xcdyMhOi4/Kz0mJUAhXFwtXFwvXSkpPykvXG5cbiAgICAgICAgcmV0dXJuIHRleHQucmVwbGFjZSh1cmxSZWdleHAsICc8YSBocmVmPVwiJDFcIiB0YXJnZXQ9XCJfYmxhbmtcIj4kMTwvYT4nKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZXNjYXBlSHRtbChodG1sKVxuICAgIHtcbiAgICAgICAgdmFyIHRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShodG1sKTtcbiAgICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBkaXYuYXBwZW5kQ2hpbGQodGV4dCk7XG4gICAgICAgIHJldHVybiBkaXYuaW5uZXJIVE1MO1xuICAgIH1cblxuICAgIHN0YXRpYyBkaXNwYXRjaEh0bWxFdmVudChlbGVtZW50LCBuYW1lKXtcbiAgICAgICAgaWYgKFwiY3JlYXRlRXZlbnRcIiBpbiBkb2N1bWVudCkge1xuICAgICAgICAgICAgdmFyIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiSFRNTEV2ZW50c1wiKTtcbiAgICAgICAgICAgIGV2dC5pbml0RXZlbnQobmFtZSwgZmFsc2UsIHRydWUpO1xuICAgICAgICAgICAgZWxlbWVudC5kaXNwYXRjaEV2ZW50KGV2dCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgZWxlbWVudC5maXJlRXZlbnQoXCJvblwiK25hbWUpO1xuICAgIH1cblxuICAgIHN0YXRpYyBkaXNwYXRjaEV2ZW50KG5hbWUsIGRhdGEpe1xuICAgICAgICB2YXIgZXZlbnQ7XG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIGV2ZW50ID0gbmV3ICBDdXN0b21FdmVudChuYW1lLHsgJ2RldGFpbCc6IGRhdGEgfSk7XG4gICAgICAgIH1jYXRjaCAoZSl7IC8vSUVcbiAgICAgICAgICAgIGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG4gICAgICAgICAgICBldmVudC5pbml0Q3VzdG9tRXZlbnQobmFtZSwgZmFsc2UsIGZhbHNlLCBkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0VmFsaWRhdGlvbk1lc3NhZ2UoZXJyb3Ipe1xuICAgICAgICBpZihVdGlscy5pc1N0cmluZyhlcnJvcikpe1xuICAgICAgICAgICAgZXJyb3IgPSB7bmFtZTogZXJyb3J9O1xuICAgICAgICB9XG4gICAgICAgIHZhciBrZXkgPSAndmFsaWRhdGlvbi4nICsgZXJyb3IubmFtZTtcbiAgICAgICAgcmV0dXJuIGkxOG4udChrZXksIGVycm9yLmRhdGEpO1xuICAgIH1cblxuICAgIHN0YXRpYyBoaWRlKHNlbGVjdGlvbil7XG4gICAgICAgIHNlbGVjdGlvbi5jbGFzc2VkKCdzZC1oaWRkZW4nLCB0cnVlKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2hvdyhzZWxlY3Rpb24sIHNob3c9dHJ1ZSl7XG4gICAgICAgIHNlbGVjdGlvbi5jbGFzc2VkKCdzZC1oaWRkZW4nLCAhc2hvdyk7XG4gICAgfVxuXG5cblxuICAgIHN0YXRpYyBpc0hpZGRlbihlbCwgZXhhY3QgPSB0cnVlKSB7XG4gICAgICAgIGlmKCFlbCl7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZihleGFjdCl7XG4gICAgICAgICAgICB2YXIgc3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbCk7XG4gICAgICAgICAgICByZXR1cm4gKHN0eWxlLmRpc3BsYXkgPT09ICdub25lJylcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKGVsLm9mZnNldFBhcmVudCA9PT0gbnVsbClcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0SlNPTih1cmwsIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgeGhyLm9wZW4oJ2dldCcsIHVybCwgdHJ1ZSk7XG4gICAgICAgIHhoci5yZXNwb25zZVR5cGUgPSAnanNvbic7XG4gICAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgc3RhdHVzID0geGhyLnN0YXR1cztcbiAgICAgICAgICAgIGlmIChzdGF0dXMgPT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soeGhyLnJlc3BvbnNlLCBudWxsKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgc3RhdHVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgeGhyLnNlbmQoKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgKiBhcyBkMyBmcm9tICcuLi9kMydcblxuLypiYXNlZCBvbjpcbiAqIGdpdGh1Yi5jb20vcGF0b3Jqay9kMy1jb250ZXh0LW1lbnUgKi9cblxuZXhwb3J0IGNsYXNzIENvbnRleHRNZW51IHtcbiAgICBvcGVuQ2FsbGJhY2s7XG4gICAgY2xvc2VDYWxsYmFjaztcblxuICAgIGNvbnN0cnVjdG9yKG1lbnUsIG9wdHMpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0cyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgc2VsZi5vcGVuQ2FsbGJhY2sgPSBvcHRzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb3B0cyA9IG9wdHMgfHwge307XG4gICAgICAgICAgICBzZWxmLm9wZW5DYWxsYmFjayA9IG9wdHMub25PcGVuO1xuICAgICAgICAgICAgc2VsZi5jbG9zZUNhbGxiYWNrID0gb3B0cy5vbkNsb3NlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY3JlYXRlIHRoZSBkaXYgZWxlbWVudCB0aGF0IHdpbGwgaG9sZCB0aGUgY29udGV4dCBtZW51XG4gICAgICAgIGQzLnNlbGVjdEFsbCgnLmQzLWNvbnRleHQtbWVudScpLmRhdGEoWzFdKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZDMtY29udGV4dC1tZW51Jyk7XG5cbiAgICAgICAgLy8gY2xvc2UgbWVudVxuICAgICAgICBkMy5zZWxlY3QoJ2JvZHknKS5vbignY2xpY2suZDMtY29udGV4dC1tZW51JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZDMuc2VsZWN0KCcuZDMtY29udGV4dC1tZW51Jykuc3R5bGUoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgaWYgKHNlbGYuY2xvc2VDYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIHNlbGYuY2xvc2VDYWxsYmFjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyB0aGlzIGdldHMgZXhlY3V0ZWQgd2hlbiBhIGNvbnRleHRtZW51IGV2ZW50IG9jY3Vyc1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGRhdGEsIGluZGV4KSB7XG4gICAgICAgICAgICB2YXIgZWxtID0gdGhpcztcblxuICAgICAgICAgICAgZDMuc2VsZWN0QWxsKCcuZDMtY29udGV4dC1tZW51JykuaHRtbCgnJyk7XG4gICAgICAgICAgICB2YXIgbGlzdCA9IGQzLnNlbGVjdEFsbCgnLmQzLWNvbnRleHQtbWVudScpXG4gICAgICAgICAgICAgICAgLm9uKCdjb250ZXh0bWVudScsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIGQzLnNlbGVjdCgnLmQzLWNvbnRleHQtbWVudScpLnN0eWxlKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgICAgICAgICAgZDMuZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgZDMuZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuYXBwZW5kKCd1bCcpO1xuICAgICAgICAgICAgbGlzdC5zZWxlY3RBbGwoJ2xpJykuZGF0YSh0eXBlb2YgbWVudSA9PT0gJ2Z1bmN0aW9uJyA/IG1lbnUoZGF0YSkgOiBtZW51KS5lbnRlcigpXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgnbGknKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXQgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgaWYgKGQuZGl2aWRlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0ICs9ICcgaXMtZGl2aWRlcic7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGQuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldCArPSAnIGlzLWRpc2FibGVkJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIWQuYWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXQgKz0gJyBpcy1oZWFkZXInO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuaHRtbChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZC5kaXZpZGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzxocj4nO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICghZC50aXRsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignTm8gdGl0bGUgYXR0cmlidXRlIHNldC4gQ2hlY2sgdGhlIHNwZWxsaW5nIG9mIHlvdXIgb3B0aW9ucy4nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHR5cGVvZiBkLnRpdGxlID09PSAnc3RyaW5nJykgPyBkLnRpdGxlIDogZC50aXRsZShkYXRhKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZC5kaXNhYmxlZCkgcmV0dXJuOyAvLyBkbyBub3RoaW5nIGlmIGRpc2FibGVkXG4gICAgICAgICAgICAgICAgICAgIGlmICghZC5hY3Rpb24pIHJldHVybjsgLy8gaGVhZGVycyBoYXZlIG5vIFwiYWN0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgZC5hY3Rpb24oZWxtLCBkYXRhLCBpbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIGQzLnNlbGVjdCgnLmQzLWNvbnRleHQtbWVudScpLnN0eWxlKCdkaXNwbGF5JywgJ25vbmUnKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5jbG9zZUNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNsb3NlQ2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyB0aGUgb3BlbkNhbGxiYWNrIGFsbG93cyBhbiBhY3Rpb24gdG8gZmlyZSBiZWZvcmUgdGhlIG1lbnUgaXMgZGlzcGxheWVkXG4gICAgICAgICAgICAvLyBhbiBleGFtcGxlIHVzYWdlIHdvdWxkIGJlIGNsb3NpbmcgYSB0b29sdGlwXG4gICAgICAgICAgICBpZiAoc2VsZi5vcGVuQ2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5vcGVuQ2FsbGJhY2soZGF0YSwgaW5kZXgpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBkaXNwbGF5IGNvbnRleHQgbWVudVxuICAgICAgICAgICAgZDMuc2VsZWN0KCcuZDMtY29udGV4dC1tZW51JylcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2xlZnQnLCAoZDMuZXZlbnQucGFnZVggLSAyKSArICdweCcpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCd0b3AnLCAoZDMuZXZlbnQucGFnZVkgLSAyKSArICdweCcpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG5cbiAgICAgICAgICAgIGQzLmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBkMy5ldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgc3RhdGljIGhpZGUoKSB7XG4gICAgICAgIGQzLnNlbGVjdCgnLmQzLWNvbnRleHQtbWVudScpLnN0eWxlKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7Q29udGV4dE1lbnV9IGZyb20gJy4vY29udGV4dC1tZW51J1xuaW1wb3J0IHtpMThufSBmcm9tIFwiLi4vaTE4bi9pMThuXCI7XG5cbmV4cG9ydCBjbGFzcyBFZGdlQ29udGV4dE1lbnUgZXh0ZW5kcyBDb250ZXh0TWVudSB7XG4gICAgdHJlZURlc2lnbmVyO1xuXG4gICAgY29uc3RydWN0b3IodHJlZURlc2lnbmVyKSB7XG4gICAgICAgIHZhciBtZW51ID0gZnVuY3Rpb24gKGQpIHtcblxuICAgICAgICAgICAgdmFyIG1lbnUgPSBbXTtcblxuICAgICAgICAgICAgbWVudS5wdXNoKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5lZGdlLmluamVjdERlY2lzaW9uTm9kZScpLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuaW5qZWN0RGVjaXNpb25Ob2RlKGQpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBtZW51LnB1c2goe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51LmVkZ2UuaW5qZWN0Q2hhbmNlTm9kZScpLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuaW5qZWN0Q2hhbmNlTm9kZShkKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgIHJldHVybiBtZW51O1xuICAgICAgICB9O1xuXG4gICAgICAgIHN1cGVyKG1lbnUpO1xuICAgICAgICB0aGlzLnRyZWVEZXNpZ25lciA9IHRyZWVEZXNpZ25lcjtcbiAgICB9XG59XG4iLCJpbXBvcnQge0NvbnRleHRNZW51fSBmcm9tICcuL2NvbnRleHQtbWVudSdcbmltcG9ydCB7ZG9tYWluIGFzIG1vZGVsfSBmcm9tICdzZC1tb2RlbCdcbmltcG9ydCAqIGFzIGQzIGZyb20gJy4uL2QzJ1xuaW1wb3J0IHtpMThufSBmcm9tIFwiLi4vaTE4bi9pMThuXCI7XG5cbmV4cG9ydCBjbGFzcyBNYWluQ29udGV4dE1lbnUgZXh0ZW5kcyBDb250ZXh0TWVudSB7XG4gICAgdHJlZURlc2lnbmVyO1xuXG4gICAgY29uc3RydWN0b3IodHJlZURlc2lnbmVyKSB7XG4gICAgICAgIHZhciBtb3VzZVBvc2l0aW9uID0gbnVsbDtcbiAgICAgICAgdmFyIG1lbnUgPSBmdW5jdGlvbiAoZCkge1xuXG4gICAgICAgICAgICB2YXIgbWVudSA9IFtdO1xuICAgICAgICAgICAgbWVudS5wdXNoKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5tYWluLmFkZERlY2lzaW9uTm9kZScpLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3Tm9kZSA9IG5ldyBtb2RlbC5EZWNpc2lvbk5vZGUobW91c2VQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5hZGROb2RlKG5ld05vZGUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBtZW51LnB1c2goe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm1haW4uYWRkQ2hhbmNlTm9kZScpLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3Tm9kZSA9IG5ldyBtb2RlbC5DaGFuY2VOb2RlKG1vdXNlUG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuYWRkTm9kZShuZXdOb2RlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbWVudS5wdXNoKHtkaXZpZGVyOiB0cnVlfSk7XG4gICAgICAgICAgICBtZW51LnB1c2goe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm1haW4uYWRkVGV4dCcpLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3VGV4dCA9IG5ldyBtb2RlbC5UZXh0KG1vdXNlUG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuYWRkVGV4dChuZXdUZXh0KTtcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG1lbnUucHVzaCh7ZGl2aWRlcjogdHJ1ZX0pO1xuICAgICAgICAgICAgbWVudS5wdXNoKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5tYWluLnBhc3RlJyksXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5wYXN0ZVRvTmV3TG9jYXRpb24obW91c2VQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogIXRyZWVEZXNpZ25lci5jb3BpZWROb2RlcyB8fCAhdHJlZURlc2lnbmVyLmNvcGllZE5vZGVzLmxlbmd0aFxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG1lbnUucHVzaCh7ZGl2aWRlcjogdHJ1ZX0pO1xuXG4gICAgICAgICAgICBtZW51LnB1c2goe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm1haW4uc2VsZWN0QWxsTm9kZXMnKSxcbiAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLnNlbGVjdEFsbE5vZGVzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gbWVudTtcbiAgICAgICAgfTtcblxuICAgICAgICBzdXBlcihtZW51LCB7b25PcGVuOiAoKSA9PiB7XG4gICAgICAgICAgICB0cmVlRGVzaWduZXIuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgIG1vdXNlUG9zaXRpb24gPSBuZXcgbW9kZWwuUG9pbnQoZDMubW91c2UodHJlZURlc2lnbmVyLnN2Zy5ub2RlKCkpKS5tb3ZlKHRyZWVEZXNpZ25lci5nZXRNYWluR3JvdXBUcmFuc2xhdGlvbih0cnVlKSk7XG5cbiAgICAgICAgfX0pO1xuICAgICAgICB0aGlzLnRyZWVEZXNpZ25lciA9IHRyZWVEZXNpZ25lcjtcbiAgICB9XG59XG4iLCJpbXBvcnQge0NvbnRleHRNZW51fSBmcm9tICcuL2NvbnRleHQtbWVudSdcbmltcG9ydCB7ZG9tYWluIGFzIG1vZGVsfSBmcm9tICdzZC1tb2RlbCdcbmltcG9ydCB7aTE4bn0gZnJvbSBcIi4uL2kxOG4vaTE4blwiO1xuXG5leHBvcnQgY2xhc3MgTm9kZUNvbnRleHRNZW51IGV4dGVuZHMgQ29udGV4dE1lbnUge1xuICAgIHRyZWVEZXNpZ25lcjtcblxuICAgIGNvbnN0cnVjdG9yKHRyZWVEZXNpZ25lciwgb3BlcmF0aW9uc0Zvck9iamVjdCkge1xuICAgICAgICB2YXIgbWVudSA9IGZ1bmN0aW9uIChkKSB7XG5cbiAgICAgICAgICAgIHZhciBjb3B5TWVudUl0ZW0gPSB7XG4gICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubm9kZS5jb3B5JyksXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5zZWxlY3ROb2RlKGQsICF0cmVlRGVzaWduZXIuaXNOb2RlU2VsZWN0ZWQoZCkpO1xuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuY29weVNlbGVjdGVkTm9kZXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIGN1dE1lbnVJdGVtID0ge1xuICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm5vZGUuY3V0JyksXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5zZWxlY3ROb2RlKGQsICF0cmVlRGVzaWduZXIuaXNOb2RlU2VsZWN0ZWQoZCkpO1xuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuY3V0U2VsZWN0ZWROb2RlcygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB2YXIgcGFzdGVNZW51SXRlbSA9IHtcbiAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5ub2RlLnBhc3RlJyksXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5wYXN0ZVRvTm9kZShkKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiBkLmZvbGRlZCB8fCAhdHJlZURlc2lnbmVyLmNvcGllZE5vZGVzIHx8ICF0cmVlRGVzaWduZXIuY29waWVkTm9kZXMubGVuZ3RoXG5cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB2YXIgZGVsZXRlTWVudUl0ZW0gPSB7XG4gICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubm9kZS5kZWxldGUnKSxcbiAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcblxuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuc2VsZWN0Tm9kZShkLCAhdHJlZURlc2lnbmVyLmlzTm9kZVNlbGVjdGVkKGQpKTtcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLnJlbW92ZVNlbGVjdGVkTm9kZXMoKTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHZhciBtZW51ID0gW107XG4gICAgICAgICAgICBpZiAoZC50eXBlID09IG1vZGVsLlRlcm1pbmFsTm9kZS4kVFlQRSkge1xuICAgICAgICAgICAgICAgIG1lbnUgPSBbY29weU1lbnVJdGVtLCBjdXRNZW51SXRlbSwgZGVsZXRlTWVudUl0ZW1dO1xuICAgICAgICAgICAgICAgIE5vZGVDb250ZXh0TWVudS5hZGROb2RlQ29udmVyc2lvbk9wdGlvbnMoZCwgbWVudSwgdHJlZURlc2lnbmVyKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWVudTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoIWQuZm9sZGVkKXtcbiAgICAgICAgICAgICAgICBtZW51LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5ub2RlLmFkZERlY2lzaW9uTm9kZScpLFxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5hZGREZWNpc2lvbk5vZGUoZClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIG1lbnUucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm5vZGUuYWRkQ2hhbmNlTm9kZScpLFxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5hZGRDaGFuY2VOb2RlKGQpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBtZW51LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5ub2RlLmFkZFRlcm1pbmFsTm9kZScpLFxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5hZGRUZXJtaW5hbE5vZGUoZClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIG1lbnUucHVzaCh7ZGl2aWRlcjogdHJ1ZX0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBtZW51LnB1c2goY29weU1lbnVJdGVtKTtcbiAgICAgICAgICAgIG1lbnUucHVzaChjdXRNZW51SXRlbSk7XG4gICAgICAgICAgICBtZW51LnB1c2gocGFzdGVNZW51SXRlbSk7XG4gICAgICAgICAgICBtZW51LnB1c2goZGVsZXRlTWVudUl0ZW0pO1xuXG4gICAgICAgICAgICBOb2RlQ29udGV4dE1lbnUuYWRkTm9kZUNvbnZlcnNpb25PcHRpb25zKGQsIG1lbnUsIHRyZWVEZXNpZ25lcik7XG4gICAgICAgICAgICBtZW51LnB1c2goe2RpdmlkZXI6IHRydWV9KTtcbiAgICAgICAgICAgIG1lbnUucHVzaCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubm9kZS5zZWxlY3RTdWJ0cmVlJyksXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5zZWxlY3RTdWJUcmVlKGQsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZighZC5mb2xkZWQpe1xuICAgICAgICAgICAgICAgIG1lbnUucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm5vZGUuZm9sZCcpLFxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5mb2xkU3VidHJlZShkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgbWVudS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubm9kZS51bmZvbGQnKSxcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuZm9sZFN1YnRyZWUoZCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKG9wZXJhdGlvbnNGb3JPYmplY3Qpe1xuICAgICAgICAgICAgICAgIHZhciBvcGVyYXRpb25zID0gb3BlcmF0aW9uc0Zvck9iamVjdChkKTtcbiAgICAgICAgICAgICAgICBpZihvcGVyYXRpb25zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBtZW51LnB1c2goe2RpdmlkZXI6IHRydWV9KTtcbiAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9ucy5mb3JFYWNoKG9wPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBtZW51LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm5vZGUuJytvcC5uYW1lKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLnBlcmZvcm1PcGVyYXRpb24oZCwgb3ApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICFvcC5jYW5QZXJmb3JtKGQpXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBtZW51O1xuICAgICAgICB9O1xuXG4gICAgICAgIHN1cGVyKG1lbnUpO1xuICAgICAgICB0aGlzLnRyZWVEZXNpZ25lciA9IHRyZWVEZXNpZ25lcjtcbiAgICB9XG5cbiAgICBzdGF0aWMgYWRkTm9kZUNvbnZlcnNpb25PcHRpb25zKGQsIG1lbnUsIHRyZWVEZXNpZ25lcil7XG4gICAgICAgIHZhciBjb252ZXJzaW9uT3B0aW9ucyA9IE5vZGVDb250ZXh0TWVudS5nZXROb2RlQ29udmVyc2lvbk9wdGlvbnMoZCwgdHJlZURlc2lnbmVyKTtcbiAgICAgICAgaWYoY29udmVyc2lvbk9wdGlvbnMubGVuZ3RoKXtcbiAgICAgICAgICAgIG1lbnUucHVzaCh7ZGl2aWRlcjogdHJ1ZX0pO1xuICAgICAgICAgICAgY29udmVyc2lvbk9wdGlvbnMuZm9yRWFjaChvPT5tZW51LnB1c2gobykpO1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0Tm9kZUNvbnZlcnNpb25PcHRpb25zKGQsIHRyZWVEZXNpZ25lcil7XG4gICAgICAgIHZhciBvcHRpb25zID0gW107XG5cbiAgICAgICAgaWYoZC5mb2xkZWQpe1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGFsbEFsbG93ZWRUeXBlcyA9IFttb2RlbC5EZWNpc2lvbk5vZGUuJFRZUEUsIG1vZGVsLkNoYW5jZU5vZGUuJFRZUEUsIG1vZGVsLlRlcm1pbmFsTm9kZS4kVFlQRV07XG5cbiAgICAgICAgaWYoIWQuY2hpbGRFZGdlcy5sZW5ndGggJiYgZC4kcGFyZW50KXtcbiAgICAgICAgICAgIGFsbEFsbG93ZWRUeXBlcy5maWx0ZXIodD0+dCE9PWQudHlwZSkuZm9yRWFjaCh0eXBlPT57XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5wdXNoKE5vZGVDb250ZXh0TWVudS5nZXROb2RlQ29udmVyc2lvbk9wdGlvbih0eXBlLCB0cmVlRGVzaWduZXIpKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBpZihkIGluc3RhbmNlb2YgbW9kZWwuRGVjaXNpb25Ob2RlKXtcbiAgICAgICAgICAgICAgICBvcHRpb25zLnB1c2goTm9kZUNvbnRleHRNZW51LmdldE5vZGVDb252ZXJzaW9uT3B0aW9uKG1vZGVsLkNoYW5jZU5vZGUuJFRZUEUsIHRyZWVEZXNpZ25lcikpXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBvcHRpb25zLnB1c2goTm9kZUNvbnRleHRNZW51LmdldE5vZGVDb252ZXJzaW9uT3B0aW9uKG1vZGVsLkRlY2lzaW9uTm9kZS4kVFlQRSwgdHJlZURlc2lnbmVyKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3B0aW9ucztcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0Tm9kZUNvbnZlcnNpb25PcHRpb24odHlwZVRvQ29udmVydFRvLCB0cmVlRGVzaWduZXIpe1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubm9kZS5jb252ZXJ0LicrdHlwZVRvQ29udmVydFRvKSxcbiAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5jb252ZXJ0Tm9kZShkLCB0eXBlVG9Db252ZXJ0VG8pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7Q29udGV4dE1lbnV9IGZyb20gJy4vY29udGV4dC1tZW51J1xuaW1wb3J0IHtpMThufSBmcm9tIFwiLi4vaTE4bi9pMThuXCI7XG5cbmV4cG9ydCBjbGFzcyBUZXh0Q29udGV4dE1lbnUgZXh0ZW5kcyBDb250ZXh0TWVudSB7XG4gICAgdHJlZURlc2lnbmVyO1xuXG4gICAgY29uc3RydWN0b3IodHJlZURlc2lnbmVyKSB7XG4gICAgICAgIHZhciBtZW51ID0gZnVuY3Rpb24gKGQpIHtcblxuXG4gICAgICAgICAgICB2YXIgZGVsZXRlTWVudUl0ZW0gPSB7XG4gICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUudGV4dC5kZWxldGUnKSxcbiAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcblxuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuc2VsZWN0VGV4dChkLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLnJlbW92ZVNlbGVjdGVkVGV4dHMoKVxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZhciBtZW51ID0gW107XG4gICAgICAgICAgICBtZW51LnB1c2goZGVsZXRlTWVudUl0ZW0pO1xuICAgICAgICAgICAgcmV0dXJuIG1lbnU7XG4gICAgICAgIH07XG5cbiAgICAgICAgc3VwZXIobWVudSk7XG4gICAgICAgIHRoaXMudHJlZURlc2lnbmVyID0gdHJlZURlc2lnbmVyO1xuICAgIH1cbn1cbiIsImltcG9ydCAqIGFzIGQzIGZyb20gJy4vZDMnXG5cbmV4cG9ydCBjbGFzcyBEM0V4dGVuc2lvbnMge1xuXG4gICAgc3RhdGljIGV4dGVuZCgpIHtcblxuICAgICAgICBkMy5zZWxlY3Rpb24ucHJvdG90eXBlLmVudGVyLnByb3RvdHlwZS5pbnNlcnRTZWxlY3RvciA9XG4gICAgICAgICAgICBkMy5zZWxlY3Rpb24ucHJvdG90eXBlLmluc2VydFNlbGVjdG9yID0gZnVuY3Rpb24gKHNlbGVjdG9yLCBiZWZvcmUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gRDNFeHRlbnNpb25zLmluc2VydFNlbGVjdG9yKHRoaXMsIHNlbGVjdG9yLCBiZWZvcmUpO1xuICAgICAgICAgICAgfTtcblxuXG4gICAgICAgIGQzLnNlbGVjdGlvbi5wcm90b3R5cGUuZW50ZXIucHJvdG90eXBlLmFwcGVuZFNlbGVjdG9yID1cbiAgICAgICAgICAgIGQzLnNlbGVjdGlvbi5wcm90b3R5cGUuYXBwZW5kU2VsZWN0b3IgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gRDNFeHRlbnNpb25zLmFwcGVuZFNlbGVjdG9yKHRoaXMsIHNlbGVjdG9yKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgZDMuc2VsZWN0aW9uLnByb3RvdHlwZS5lbnRlci5wcm90b3R5cGUuc2VsZWN0T3JBcHBlbmQgPVxuICAgICAgICAgICAgZDMuc2VsZWN0aW9uLnByb3RvdHlwZS5zZWxlY3RPckFwcGVuZCA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBEM0V4dGVuc2lvbnMuc2VsZWN0T3JBcHBlbmQodGhpcywgc2VsZWN0b3IpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICBkMy5zZWxlY3Rpb24ucHJvdG90eXBlLmVudGVyLnByb3RvdHlwZS5zZWxlY3RPckluc2VydCA9XG4gICAgICAgICAgICBkMy5zZWxlY3Rpb24ucHJvdG90eXBlLnNlbGVjdE9ySW5zZXJ0ID0gZnVuY3Rpb24gKHNlbGVjdG9yLCBiZWZvcmUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gRDNFeHRlbnNpb25zLnNlbGVjdE9ySW5zZXJ0KHRoaXMsIHNlbGVjdG9yLCBiZWZvcmUpO1xuICAgICAgICAgICAgfTtcblxuXG4gICAgfVxuXG4gICAgc3RhdGljIGluc2VydE9yQXBwZW5kU2VsZWN0b3IocGFyZW50LCBzZWxlY3Rvciwgb3BlcmF0aW9uLCBiZWZvcmUpIHtcblxuICAgICAgICB2YXIgc2VsZWN0b3JQYXJ0cyA9IHNlbGVjdG9yLnNwbGl0KC8oW1xcLlxcI10pLyk7XG4gICAgICAgIHZhciBlbGVtZW50ID0gcGFyZW50W29wZXJhdGlvbl0oc2VsZWN0b3JQYXJ0cy5zaGlmdCgpLCBiZWZvcmUpOy8vXCI6Zmlyc3QtY2hpbGRcIlxuXG4gICAgICAgIHdoaWxlIChzZWxlY3RvclBhcnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIHZhciBzZWxlY3Rvck1vZGlmaWVyID0gc2VsZWN0b3JQYXJ0cy5zaGlmdCgpO1xuICAgICAgICAgICAgdmFyIHNlbGVjdG9ySXRlbSA9IHNlbGVjdG9yUGFydHMuc2hpZnQoKTtcbiAgICAgICAgICAgIGlmIChzZWxlY3Rvck1vZGlmaWVyID09PSBcIi5cIikge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBlbGVtZW50LmNsYXNzZWQoc2VsZWN0b3JJdGVtLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2VsZWN0b3JNb2RpZmllciA9PT0gXCIjXCIpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5hdHRyKCdpZCcsIHNlbGVjdG9ySXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfVxuXG4gICAgc3RhdGljIGluc2VydFNlbGVjdG9yKHBhcmVudCwgc2VsZWN0b3IsIGJlZm9yZSkge1xuICAgICAgICByZXR1cm4gRDNFeHRlbnNpb25zLmluc2VydE9yQXBwZW5kU2VsZWN0b3IocGFyZW50LCBzZWxlY3RvciwgXCJpbnNlcnRcIiwgYmVmb3JlKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgYXBwZW5kU2VsZWN0b3IocGFyZW50LCBzZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gRDNFeHRlbnNpb25zLmluc2VydE9yQXBwZW5kU2VsZWN0b3IocGFyZW50LCBzZWxlY3RvciwgXCJhcHBlbmRcIik7XG4gICAgfVxuXG4gICAgc3RhdGljIHNlbGVjdE9yQXBwZW5kKHBhcmVudCwgc2VsZWN0b3IsIGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIHNlbGVjdGlvbiA9IHBhcmVudC5zZWxlY3Qoc2VsZWN0b3IpO1xuICAgICAgICBpZiAoc2VsZWN0aW9uLmVtcHR5KCkpIHtcbiAgICAgICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcmVudC5hcHBlbmQoZWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gRDNFeHRlbnNpb25zLmFwcGVuZFNlbGVjdG9yKHBhcmVudCwgc2VsZWN0b3IpO1xuXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNlbGVjdGlvbjtcbiAgICB9O1xuXG4gICAgc3RhdGljIHNlbGVjdE9ySW5zZXJ0KHBhcmVudCwgc2VsZWN0b3IsIGJlZm9yZSkge1xuICAgICAgICB2YXIgc2VsZWN0aW9uID0gcGFyZW50LnNlbGVjdChzZWxlY3Rvcik7XG4gICAgICAgIGlmIChzZWxlY3Rpb24uZW1wdHkoKSkge1xuICAgICAgICAgICAgcmV0dXJuIEQzRXh0ZW5zaW9ucy5pbnNlcnRTZWxlY3RvcihwYXJlbnQsIHNlbGVjdG9yLCBiZWZvcmUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzZWxlY3Rpb247XG4gICAgfTtcbn1cbiIsImV4cG9ydCAqIGZyb20gJ2QzLWRpc3BhdGNoJztcbmV4cG9ydCAqIGZyb20gJ2QzLXNjYWxlJztcbmV4cG9ydCAqIGZyb20gJ2QzLXNlbGVjdGlvbic7XG5leHBvcnQgKiBmcm9tICdkMy1zaGFwZSdcbmV4cG9ydCAqIGZyb20gJ2QzLWRyYWcnO1xuZXhwb3J0ICogZnJvbSAnZDMtYnJ1c2gnXG5leHBvcnQgKiBmcm9tICdkMy1hcnJheSdcbmV4cG9ydCAqIGZyb20gJ2QzLWhpZXJhcmNoeSdcbmV4cG9ydCAqIGZyb20gJ2QzLXRpbWUtZm9ybWF0J1xuIiwibW9kdWxlLmV4cG9ydHM9e1xuICAgIFwiY29udGV4dE1lbnVcIjp7XG4gICAgICAgIFwibWFpblwiOntcbiAgICAgICAgICAgIFwiYWRkRGVjaXNpb25Ob2RlXCI6IFwiRW50c2NoZWlkdW5nc2tub3RlbiBoaW56dWbDvGdlblwiLFxuICAgICAgICAgICAgXCJhZGRDaGFuY2VOb2RlXCI6IFwiWnVmYWxsIEtub3RlbiBoaW56dWbDvGdlblwiLFxuICAgICAgICAgICAgXCJhZGRUZXh0XCI6IFwiVGV4dCBoaW56dWbDvGdlbiBcIixcbiAgICAgICAgICAgIFwicGFzdGVcIjogXCJFaW5mw7xnZW5cIixcbiAgICAgICAgICAgIFwic2VsZWN0QWxsTm9kZXNcIjogXCJBbGxlIEtub3RlbiBhdXN3w6RobGVuXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJub2RlXCI6e1xuICAgICAgICAgICAgXCJjb3B5XCI6IFwiS29waWVyZW5cIixcbiAgICAgICAgICAgIFwiY3V0XCI6IFwiQXVzc2NobmVpZGVuXCIsXG4gICAgICAgICAgICBcInBhc3RlXCI6IFwiRWluZsO8Z2VuXCIsXG4gICAgICAgICAgICBcImRlbGV0ZVwiOiBcIkzDtnNjaGVuXCIsXG4gICAgICAgICAgICBcImFkZERlY2lzaW9uTm9kZVwiOiBcIkVudHNjaGVpZHVuZ3Nrbm90ZW4gaGluenVmw7xnZW5cIixcbiAgICAgICAgICAgIFwiYWRkQ2hhbmNlTm9kZVwiOiBcIlp1ZmFsbCBLbm90ZW4gaGluenVmw7xnZW5cIixcbiAgICAgICAgICAgIFwiYWRkVGVybWluYWxOb2RlXCI6IFwiRW5ka25vdHRlbiBoaW56dWbDvGdlblwiLFxuICAgICAgICAgICAgXCJjb252ZXJ0XCI6e1xuICAgICAgICAgICAgICAgIFwiZGVjaXNpb25cIjogXCJBbHMgRW50c2NoZWlkdW5nc2tub3RlblwiLFxuICAgICAgICAgICAgICAgIFwiY2hhbmNlXCI6IFwiQWxzIFp1ZmFsbCBLbm90ZW5cIixcbiAgICAgICAgICAgICAgICBcInRlcm1pbmFsXCI6IFwiQWxzIEVuZGtub3RlblwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJzZWxlY3RTdWJ0cmVlXCI6IFwiVGVpbGJhdW0gd8OkaGxlblwiLFxuICAgICAgICAgICAgXCJmb2xkXCI6IFwiVGVpbGJhdW0gZmFsdGVuXCIsXG4gICAgICAgICAgICBcInVuZm9sZFwiOiBcIlRlaWxiYXVtIGVudGZhbHRlblwiLFxuXHRcdFx0XG4gICAgICAgICAgICBcImZsaXBTdWJ0cmVlXCI6IFwiVGVpbGJhdW0gdW1kcmVoZW5cIlxuICAgICAgICB9LFxuICAgICAgICBcImVkZ2VcIjp7XG4gICAgICAgICAgICBcImluamVjdERlY2lzaW9uTm9kZVwiOiBcIkVudHNjaGVpZHVuZ3Nrbm90ZW4gSW5qaXppZXJlblwiLFxuICAgICAgICAgICAgXCJpbmplY3RDaGFuY2VOb2RlXCI6IFwiWnVmYWxsIEtub3RlbiBJbmppemllcmVuXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJ0ZXh0XCI6e1xuICAgICAgICAgICAgXCJkZWxldGVcIjogXCJMw7ZzY2hlblwiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwidmFsaWRhdGlvblwiOntcbiAgICAgICAgXCJpbmNvbXBsZXRlUGF0aFwiOiBcIlBmYWQsIGRlciBuaWNodCBtaXQgZGVtIEVuZGtub3RlbiBlbmRldFwiLFxuICAgICAgICBcInByb2JhYmlsaXR5RG9Ob3RTdW1VcFRvMVwiOiBcIkRpZSBTdW1tZSBkZXIgV2FocnNjaGVpbmxpY2hrZWl0ZW4gaXN0IG5pY2h0IGdsZWljaCAxXCIsXG4gICAgICAgIFwiaW52YWxpZFByb2JhYmlsaXR5XCI6IFwiVW5nw7xsdGlnZSBXYWhyc2NoZWlubGljaGtlaXQgaW0gWndlaWcgI3t7bnVtYmVyfX1cIixcbiAgICAgICAgXCJpbnZhbGlkUGF5b2ZmXCI6IFwiVW5nw7xsdGlnZSBBdXN6YWhsdW5nIGluIFp3ZWlnICN7e251bWJlcn19XCJcbiAgICB9LFxuICAgIFwiZ3Jvd2xcIjp7XG4gICAgICAgIFwiYnJ1c2hEaXNhYmxlZFwiOiBcIkF1c3dhaGxiw7xyc3RlIGRlYWt0aXZpZXJ0XCIsXG4gICAgICAgIFwiYnJ1c2hFbmFibGVkXCI6IFwiQXVzd2FobGLDvHJzdGUgYWt0aXZpZXJ0XCJcbiAgICB9LFxuICAgIFwidG9vbHRpcFwiOntcbiAgICAgICAgXCJub2RlXCI6e1xuICAgICAgICAgICAgXCJwYXlvZmZcIjoge1xuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIkF1c3phaGx1bmcge3tudW1iZXJ9fVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJ7e25hbWV9fVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJhZ2dyZWdhdGVkUGF5b2ZmXCI6IHtcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJBZ2dyZWdpZXJ0ZSBBdXN6YWhsdW5nIHt7bnVtYmVyfX1cIixcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwiQWdncmVnaWVydGUge3tuYW1lfX1cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwicHJvYmFiaWxpdHlUb0VudGVyXCI6IFwiV2FocnNjaGVpbmxpY2hrZWl0XCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJlZGdlXCI6e1xuICAgICAgICAgICAgXCJwYXlvZmZcIjoge1xuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIkF1c3phaGx1bmcge3tudW1iZXJ9fToge3t2YWx1ZX19XCIsXG4gICAgICAgICAgICAgICAgXCJuYW1lZFwiOiBcInt7bmFtZX19OiB7e3ZhbHVlfX1cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwicHJvYmFiaWxpdHlcIjogXCJXYWhyc2NoZWlubGljaGtlaXQ6IHt7dmFsdWV9fVwiXG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cz17XG4gICAgXCJjb250ZXh0TWVudVwiOntcbiAgICAgICAgXCJtYWluXCI6e1xuICAgICAgICAgICAgXCJhZGREZWNpc2lvbk5vZGVcIjogXCJBZGQgRGVjaXNpb24gTm9kZVwiLFxuICAgICAgICAgICAgXCJhZGRDaGFuY2VOb2RlXCI6IFwiQWRkIENoYW5jZSBOb2RlXCIsXG4gICAgICAgICAgICBcImFkZFRleHRcIjogXCJBZGQgVGV4dFwiLFxuICAgICAgICAgICAgXCJwYXN0ZVwiOiBcIlBhc3RlXCIsXG4gICAgICAgICAgICBcInNlbGVjdEFsbE5vZGVzXCI6IFwiU2VsZWN0IGFsbCBub2Rlc1wiXG4gICAgICAgIH0sXG4gICAgICAgIFwibm9kZVwiOntcbiAgICAgICAgICAgIFwiY29weVwiOiBcIkNvcHlcIixcbiAgICAgICAgICAgIFwiY3V0XCI6IFwiQ3V0XCIsXG4gICAgICAgICAgICBcInBhc3RlXCI6IFwiUGFzdGVcIixcbiAgICAgICAgICAgIFwiZGVsZXRlXCI6IFwiRGVsZXRlXCIsXG4gICAgICAgICAgICBcImFkZERlY2lzaW9uTm9kZVwiOiBcIkFkZCBEZWNpc2lvbiBOb2RlXCIsXG4gICAgICAgICAgICBcImFkZENoYW5jZU5vZGVcIjogXCJBZGQgQ2hhbmNlIE5vZGVcIixcbiAgICAgICAgICAgIFwiYWRkVGVybWluYWxOb2RlXCI6IFwiQWRkIFRlcm1pbmFsIE5vZGVcIixcbiAgICAgICAgICAgIFwiY29udmVydFwiOntcbiAgICAgICAgICAgICAgICBcImRlY2lzaW9uXCI6IFwiQXMgRGVjaXNpb24gTm9kZVwiLFxuICAgICAgICAgICAgICAgIFwiY2hhbmNlXCI6IFwiQXMgQ2hhbmNlIE5vZGVcIixcbiAgICAgICAgICAgICAgICBcInRlcm1pbmFsXCI6IFwiQXMgVGVybWluYWwgTm9kZVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJzZWxlY3RTdWJ0cmVlXCI6IFwiU2VsZWN0IHN1YnRyZWVcIixcbiAgICAgICAgICAgIFwiZm9sZFwiOiBcIkZvbGQgc3VidHJlZVwiLFxuICAgICAgICAgICAgXCJ1bmZvbGRcIjogXCJVbmZvbGQgc3VidHJlZVwiLFxuICAgICAgICAgICAgXCJmbGlwU3VidHJlZVwiOiBcIkZsaXAgc3VidHJlZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiZWRnZVwiOntcbiAgICAgICAgICAgIFwiaW5qZWN0RGVjaXNpb25Ob2RlXCI6IFwiSW5qZWN0IERlY2lzaW9uIE5vZGVcIixcbiAgICAgICAgICAgIFwiaW5qZWN0Q2hhbmNlTm9kZVwiOiBcIkluamVjdCBDaGFuY2UgTm9kZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwidGV4dFwiOntcbiAgICAgICAgICAgIFwiZGVsZXRlXCI6IFwiRGVsZXRlXCJcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXCJ2YWxpZGF0aW9uXCI6e1xuICAgICAgICBcImluY29tcGxldGVQYXRoXCI6IFwiUGF0aCBub3QgZW5kaW5nIHdpdGggdGVybWluYWwgbm9kZVwiLFxuICAgICAgICBcInByb2JhYmlsaXR5RG9Ob3RTdW1VcFRvMVwiOiBcIlByb2JhYmlsaXRpZXMgZG8gbm90IHN1bSB1cCB0byAxXCIsXG4gICAgICAgIFwiaW52YWxpZFByb2JhYmlsaXR5XCI6IFwiSW52YWxpZCBwcm9iYWJpbGl0eSBpbiBlZGdlICN7e251bWJlcn19XCIsXG4gICAgICAgIFwiaW52YWxpZFBheW9mZlwiOiBcIkludmFsaWQgcGF5b2ZmIGluIGVkZ2UgI3t7bnVtYmVyfX1cIlxuICAgIH0sXG4gICAgXCJncm93bFwiOntcbiAgICAgICAgXCJicnVzaERpc2FibGVkXCI6IFwiU2VsZWN0aW9uIGJydXNoIGRpc2FibGVkXCIsXG4gICAgICAgIFwiYnJ1c2hFbmFibGVkXCI6IFwiU2VsZWN0aW9uIGJydXNoIGVuYWJsZWRcIlxuICAgIH0sXG4gICAgXCJ0b29sdGlwXCI6e1xuICAgICAgICBcIm5vZGVcIjp7XG4gICAgICAgICAgICBcInBheW9mZlwiOiB7XG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiUGF5b2ZmIHt7bnVtYmVyfX1cIixcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwie3tuYW1lfX1cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiYWdncmVnYXRlZFBheW9mZlwiOiB7XG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiQWdncmVnYXRlZCBQYXlvZmYge3tudW1iZXJ9fVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJBZ2dyZWdhdGVkIHt7bmFtZX19XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInByb2JhYmlsaXR5VG9FbnRlclwiOiBcIlByb2JhYmlsaXR5IHRvIGVudGVyXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJlZGdlXCI6e1xuICAgICAgICAgICAgXCJwYXlvZmZcIjoge1xuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIlBheW9mZiB7e251bWJlcn19OiB7e3ZhbHVlfX1cIixcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwie3tuYW1lfX06IHt7dmFsdWV9fVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJwcm9iYWJpbGl0eVwiOiBcIlByb2JhYmlsaXR5OiB7e3ZhbHVlfX1cIlxuICAgICAgICB9XG4gICAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHM9e1xuICAgIFwiY29udGV4dE1lbnVcIjp7XG4gICAgICAgIFwibWFpblwiOntcbiAgICAgICAgICAgIFwiYWRkRGVjaXNpb25Ob2RlXCI6IFwiQWpvdXRlciBub3VkIGRlIGTDqWNpc2lvblwiLFxuICAgICAgICAgICAgXCJhZGRDaGFuY2VOb2RlXCI6IFwiQWpvdXRlciBub3VkIGFsw6lhdG9pcmVcIixcbiAgICAgICAgICAgIFwiYWRkVGV4dFwiOiBcIkFqb3V0ZXIgZHUgdGV4dGVcIixcbiAgICAgICAgICAgIFwicGFzdGVcIjogXCJDb2xsZXJcIixcbiAgICAgICAgICAgIFwic2VsZWN0QWxsTm9kZXNcIjogXCJTw6lsZWN0aW9ubmVyIHRvdXMgbGVzIG5vdWRzXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJub2RlXCI6e1xuICAgICAgICAgICAgXCJjb3B5XCI6IFwiQ29waWVcIixcbiAgICAgICAgICAgIFwiY3V0XCI6IFwiQ291cGVyXCIsXG4gICAgICAgICAgICBcInBhc3RlXCI6IFwiQ29sbGVyXCIsXG4gICAgICAgICAgICBcImRlbGV0ZVwiOiBcIkVmZmFjZXJcIixcbiAgICAgICAgICAgIFwiYWRkRGVjaXNpb25Ob2RlXCI6IFwiQWpvdXRlciBub3VkIGRlIGTDqWNpc2lvblwiLFxuICAgICAgICAgICAgXCJhZGRDaGFuY2VOb2RlXCI6IFwiQWpvdXRlciBub3VkIGFsw6lhdG9pcmVcIixcbiAgICAgICAgICAgIFwiYWRkVGVybWluYWxOb2RlXCI6IFwiQWpvdXRlciB1biBub2V1ZCB0ZXJtaW5hbFwiLFxuICAgICAgICAgICAgXCJjb252ZXJ0XCI6e1xuICAgICAgICAgICAgICAgIFwiZGVjaXNpb25cIjogXCJDb21tZSBub3VkIGRlIGTDqWNpc2lvblwiLFxuICAgICAgICAgICAgICAgIFwiY2hhbmNlXCI6IFwiQ29tbWUgbm91ZCBhbMOpYXRvaXJlXCIsXG4gICAgICAgICAgICAgICAgXCJ0ZXJtaW5hbFwiOiBcIkNvbW1lIHVuIG5vZXVkIHRlcm1pbmFsXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInNlbGVjdFN1YnRyZWVcIjogXCJTw6lsZWN0aW9ubmVyIHVuZSBzb3VzLWFyYm9yZXNjZW5jZVwiLFxuICAgICAgICAgICAgXCJmb2xkXCI6IFwiUGxpZXIgc291cy1hcmJyZVwiLFxuICAgICAgICAgICAgXCJ1bmZvbGRcIjogXCJEw6lwbGllciBhcmJyZSBzb3VzLWFyYnJlXCIsXG4gICAgICAgICAgICBcImZsaXBTdWJ0cmVlXCI6IFwiQmFzY3VsZXIgc291cy1hcmJyZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiZWRnZVwiOntcbiAgICAgICAgICAgIFwiaW5qZWN0RGVjaXNpb25Ob2RlXCI6IFwiSW5qZWN0ZXIgdW4gbm9ldWQgZGUgZMOpY2lzaW9uXCIsXG4gICAgICAgICAgICBcImluamVjdENoYW5jZU5vZGVcIjogXCJJbmplY3RlciB1biBub2V1ZCBkZSBjaGFuY2VcIlxuICAgICAgICB9LFxuICAgICAgICBcInRleHRcIjp7XG4gICAgICAgICAgICBcImRlbGV0ZVwiOiBcIkVmZmFjZXJcIlxuICAgICAgICB9XG4gICAgfSxcbiAgICBcInZhbGlkYXRpb25cIjp7XG4gICAgICAgIFwiaW5jb21wbGV0ZVBhdGhcIjogXCJQYXJjb3VycyBub24gdGVybWluw6kgcGFyIG5vZXVkIHRlcm1pbmFsXCIsXG4gICAgICAgIFwicHJvYmFiaWxpdHlEb05vdFN1bVVwVG8xXCI6IFwiTGEgc29tbWUgZGVzIHByb2JhYmlsaXTDqXMgbidlc3QgcGFzIDEgb3UgcGx1c1wiLFxuICAgICAgICBcImludmFsaWRQcm9iYWJpbGl0eVwiOiBcIlByb2JhYmlsaXTDqSBpbnZhbGlkZSAtIGxlIGJvcmQgI3t7bnVtYmVyfX1cIixcbiAgICAgICAgXCJpbnZhbGlkUGF5b2ZmXCI6IFwiQXZhbnRhZ2UgaW52YWxpZGUgLSBsZSBib3JkICN7e251bWJlcn19XCJcbiAgICB9LFxuICAgIFwiZ3Jvd2xcIjp7XG4gICAgICAgIFwiYnJ1c2hEaXNhYmxlZFwiOiBcIkJyb3NzZSBkZSBzw6lsZWN0aW9uIGTDqXNhY3RpdsOpZVwiLFxuICAgICAgICBcImJydXNoRW5hYmxlZFwiOiBcIkJyb3NzZSBkZSBzw6lsZWN0aW9uIGFjdGl2w6llXCJcbiAgICB9LFxuICAgIFwidG9vbHRpcFwiOntcbiAgICAgICAgXCJub2RlXCI6e1xuICAgICAgICAgICAgXCJwYXlvZmZcIjoge1xuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIkF2YW50YWdlIHt7bnVtYmVyfX1cIixcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwie3tuYW1lfX1cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiYWdncmVnYXRlZFBheW9mZlwiOiB7XG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiQXZhbnRhZ2UgYWdyw6lnw6kge3tudW1iZXJ9fVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJBZ3LDqWfDqSAge3tuYW1lfX1cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwicHJvYmFiaWxpdHlUb0VudGVyXCI6IFwiUHJvYmFiaWxpdMOpIGQnZW50csOpZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiZWRnZVwiOntcbiAgICAgICAgICAgIFwicGF5b2ZmXCI6IHtcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJBdmFudGFnZSB7e251bWJlcn19OiB7e3ZhbHVlfX1cIixcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwie3tuYW1lfX06IHt7dmFsdWV9fVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJwcm9iYWJpbGl0eVwiOiBcIlByb2JhYmlsaXTDqToge3t2YWx1ZX19XCJcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBpMThuZXh0IGZyb20gJ2kxOG5leHQnO1xuaW1wb3J0ICogYXMgZW4gZnJvbSAnLi9lbi5qc29uJ1xuaW1wb3J0ICogYXMgcGwgZnJvbSAnLi9wbC5qc29uJ1xuaW1wb3J0ICogYXMgaXQgZnJvbSAnLi9pdC5qc29uJ1xuaW1wb3J0ICogYXMgZGUgZnJvbSAnLi9kZS5qc29uJ1xuaW1wb3J0ICogYXMgZnIgZnJvbSAnLi9mci5qc29uJ1xuXG5leHBvcnQgY2xhc3MgaTE4bntcblxuICAgIHN0YXRpYyAkaW5zdGFuY2U7XG4gICAgc3RhdGljIGxhbmd1YWdlO1xuXG4gICAgc3RhdGljIGluaXQobG5nKXtcbiAgICAgICAgaTE4bi5sYW5ndWFnZSA9IGxuZztcbiAgICAgICAgbGV0IHJlc291cmNlcyA9IHtcbiAgICAgICAgICAgIGVuOiB7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRpb246IGVuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGw6IHtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGlvbjogcGxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpdDoge1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0aW9uOiBpdFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlOiB7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRpb246IGRlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnI6IHtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGlvbjogZnJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgaTE4bi4kaW5zdGFuY2UgPSBpMThuZXh0LmNyZWF0ZUluc3RhbmNlKHtcbiAgICAgICAgICAgIGxuZzogbG5nLFxuICAgICAgICAgICAgZmFsbGJhY2tMbmc6ICdlbicsXG4gICAgICAgICAgICByZXNvdXJjZXM6IHJlc291cmNlc1xuICAgICAgICB9LCAoZXJyLCB0KSA9PiB7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXRpYyB0KGtleSwgb3B0KXtcbiAgICAgICAgcmV0dXJuIGkxOG4uJGluc3RhbmNlLnQoa2V5LCBvcHQpXG4gICAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHM9e1xuICAgIFwiY29udGV4dE1lbnVcIjp7XG4gICAgICAgIFwibWFpblwiOntcbiAgICAgICAgICAgIFwiYWRkRGVjaXNpb25Ob2RlXCI6IFwiQWdnaXVuZ2kgdW4gbm9kbyBkaSBkZWNpc2lvbmVcIixcbiAgICAgICAgICAgIFwiYWRkQ2hhbmNlTm9kZVwiOiBcIkFnZ2l1bmdpIHVuIG5vZG8gb3Bwb3J0dW5pdMOgXCIsXG4gICAgICAgICAgICBcImFkZFRleHRcIjogXCJBZ2dpdW5naSB0ZXN0b1wiLFxuICAgICAgICAgICAgXCJwYXN0ZVwiOiBcIkluY29sbGFcIixcbiAgICAgICAgICAgIFwic2VsZWN0QWxsTm9kZXNcIjogXCJTZWxlemlvbmEgdHV0dGkgaSBub2RpXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJub2RlXCI6e1xuICAgICAgICAgICAgXCJjb3B5XCI6IFwiQ29waWFcIixcbiAgICAgICAgICAgIFwiY3V0XCI6IFwiVGFnbGlhXCIsXG4gICAgICAgICAgICBcInBhc3RlXCI6IFwiSW5jb2xsYVwiLFxuICAgICAgICAgICAgXCJkZWxldGVcIjogXCJDYW5jZWxsYVwiLFxuICAgICAgICAgICAgXCJhZGREZWNpc2lvbk5vZGVcIjogXCJBZ2dpdW5naSB1biBub2RvIGRpIGRlY2lzaW9uZVwiLFxuICAgICAgICAgICAgXCJhZGRDaGFuY2VOb2RlXCI6IFwiQWdnaXVuZ2kgdW4gbm9kbyBvcHBvcnR1bml0w6BcIixcbiAgICAgICAgICAgIFwiYWRkVGVybWluYWxOb2RlXCI6IFwiQWdnaXVuZ2kgdW4gbm9kbyB0ZXJtaW5hbGVcIixcbiAgICAgICAgICAgIFwiY29udmVydFwiOntcbiAgICAgICAgICAgICAgICBcImRlY2lzaW9uXCI6IFwiQ29tZSBEZWNpc2lvbiBOb2RlXCIsXG4gICAgICAgICAgICAgICAgXCJjaGFuY2VcIjogXCJDb21lIENoYW5jZSBOb2RlXCIsXG4gICAgICAgICAgICAgICAgXCJ0ZXJtaW5hbFwiOiBcIkNvbWUgVGVybWluYWwgTm9kZVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJzZWxlY3RTdWJ0cmVlXCI6IFwiU2VsZXppb25hIFNvdHRvLWFsYmVyb1wiLFxuICAgICAgICAgICAgXCJmb2xkXCI6IFwiUGllZ2Egc290dG8tYWxiZXJvXCIsXG4gICAgICAgICAgICBcInVuZm9sZFwiOiBcIkRpc3BpZWdhcnNpIHNvdHRvLWFsYmVyb1wiLFx0XHRcdFxuICAgICAgICAgICAgXCJmbGlwU3VidHJlZVwiOiBcIlJpYmFsdGEgc290dG8tYWxiZXJvXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJlZGdlXCI6e1xuICAgICAgICAgICAgXCJpbmplY3REZWNpc2lvbk5vZGVcIjogXCJJbmlldHRhIG5vZG8gZGkgZGVjaXNpb25lXCIsXG4gICAgICAgICAgICBcImluamVjdENoYW5jZU5vZGVcIjogXCJJbmlldHRhIG5vZG8gb3Bwb3J0dW5pdMOgXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJ0ZXh0XCI6e1xuICAgICAgICAgICAgXCJkZWxldGVcIjogXCJDYW5jZWxsYVwiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwidmFsaWRhdGlvblwiOntcbiAgICAgICAgXCJpbmNvbXBsZXRlUGF0aFwiOiBcIlBlcmNvcnNvIHNlbnphIG5vZG8gdGVybWluYWxlXCIsXG4gICAgICAgIFwicHJvYmFiaWxpdHlEb05vdFN1bVVwVG8xXCI6IFwiTGEgc29tbWEgZGVsbGUgcHJvYmFiaWxpdMOgIMOoIGRpdmVyc2EgZGEgMVwiLFxuICAgICAgICBcImludmFsaWRQcm9iYWJpbGl0eVwiOiBcIlByb2JhYmlsaXTDoCBub24gdmFsaWRhIC0gYm9yZG8gI3t7bnVtYmVyfX1cIixcbiAgICAgICAgXCJpbnZhbGlkUGF5b2ZmXCI6IFwiU2FsZG8gbm9uIHZhbGlkbyAtIGJvcmRvICN7e251bWJlcn19XCJcbiAgICB9LFxuICAgIFwiZ3Jvd2xcIjp7XG4gICAgICAgIFwiYnJ1c2hEaXNhYmxlZFwiOiBcIlNlbGV6aW9uZSBwZW5uZWxsbyBkaXNhYmlsaXRhdGFcIixcbiAgICAgICAgXCJicnVzaEVuYWJsZWRcIjogXCJTZWxlemlvbmUgcGVubmVsbG8gYWJpbGl0YXRhXCJcbiAgICB9LFxuICAgIFwidG9vbHRpcFwiOntcbiAgICAgICAgXCJub2RlXCI6e1xuICAgICAgICAgICAgXCJwYXlvZmZcIjoge1xuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIlNhbGRvIHt7bnVtYmVyfX1cIixcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwie3tuYW1lfX1cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiYWdncmVnYXRlZFBheW9mZlwiOiB7XG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiU2FsZG8gYWdncmVnYXRvIHt7bnVtYmVyfX1cIixcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwiQWdncmVnYXRvIHt7bmFtZX19XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInByb2JhYmlsaXR5VG9FbnRlclwiOiBcIlByb2JhYmlsaXTDoCBkYSBpbnNlcmlyZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiZWRnZVwiOntcbiAgICAgICAgICAgIFwicGF5b2ZmXCI6IHtcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJTYWxkbyB7e251bWJlcn19OiB7e3ZhbHVlfX1cIixcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwie3tuYW1lfX06IHt7dmFsdWV9fVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJwcm9iYWJpbGl0eVwiOiBcIlByb2JhYmlsaXTDoDoge3t2YWx1ZX19XCJcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzPXtcblxuICAgIFwiY29udGV4dE1lbnVcIjp7XG4gICAgICAgIFwibWFpblwiOntcbiAgICAgICAgICAgIFwiYWRkRGVjaXNpb25Ob2RlXCI6IFwiRG9kYWogV8SZemXFgiBEZWN5enlqbnlcIixcbiAgICAgICAgICAgIFwiYWRkQ2hhbmNlTm9kZVwiOiBcIkRvZGFqIFfEmXplxYIgTG9zb3d5XCIsXG4gICAgICAgICAgICBcImFkZFRleHRcIjogXCJEb2RhaiBUZWtzdFwiLFxuICAgICAgICAgICAgXCJwYXN0ZVwiOiBcIldrbGVqXCIsXG4gICAgICAgICAgICBcInNlbGVjdEFsbE5vZGVzXCI6IFwiWmF6bmFjeiB3c3p5c3RraWUgd8SZesWCeVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwibm9kZVwiOntcbiAgICAgICAgICAgIFwiY29weVwiOiBcIktvcGl1alwiLFxuICAgICAgICAgICAgXCJjdXRcIjogXCJXeXRuaWpcIixcbiAgICAgICAgICAgIFwicGFzdGVcIjogXCJXa2xlalwiLFxuICAgICAgICAgICAgXCJkZWxldGVcIjogXCJVc3XFhFwiLFxuICAgICAgICAgICAgXCJhZGREZWNpc2lvbk5vZGVcIjogXCJEb2RhaiBXxJl6ZcWCIERlY3l6eWpueVwiLFxuICAgICAgICAgICAgXCJhZGRDaGFuY2VOb2RlXCI6IFwiRG9kYWogV8SZemXFgiBMb3Nvd3lcIixcbiAgICAgICAgICAgIFwiYWRkVGVybWluYWxOb2RlXCI6IFwiRG9kYWogV8SZemXFgiBLb8WEY293eVwiLFxuICAgICAgICAgICAgXCJjb252ZXJ0XCI6e1xuICAgICAgICAgICAgICAgIFwiZGVjaXNpb25cIjogXCJKYWtvIFfEmXplxYIgRGVjeXp5am55XCIsXG4gICAgICAgICAgICAgICAgXCJjaGFuY2VcIjogXCJKYWtvIFfEmXplxYIgTG9zb3d5XCIsXG4gICAgICAgICAgICAgICAgXCJ0ZXJtaW5hbFwiOiBcIkpha28gV8SZemXFgiBLb8WEY293eVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJzZWxlY3RTdWJ0cmVlXCI6IFwiWmF6bmFjeiBwb2Rkcnpld29cIixcbiAgICAgICAgICAgIFwiZm9sZFwiOiBcIlp3acWEIHBvZGRyemV3b1wiLFxuICAgICAgICAgICAgXCJ1bmZvbGRcIjogXCJSb3p3acWEIHBvZGRyemV3b1wiLFxuICAgICAgICAgICAgXCJmbGlwU3VidHJlZVwiOiBcIlByemV3csOzxIcgcG9kZHJ6ZXdvXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJlZGdlXCI6e1xuICAgICAgICAgICAgXCJpbmplY3REZWNpc2lvbk5vZGVcIjogXCJXc3RyenlrbmlqIFfEmXplxYIgRGVjeXp5am55XCIsXG4gICAgICAgICAgICBcImluamVjdENoYW5jZU5vZGVcIjogXCJXc3RyenlrbmlqIFfEmXplxYIgTG9zb3d5XCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJ0ZXh0XCI6e1xuICAgICAgICAgICAgXCJkZWxldGVcIjogXCJVc3XFhFwiXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJ2YWxpZGF0aW9uXCI6e1xuICAgICAgICBcImluY29tcGxldGVQYXRoXCI6IFwiT3N0YXRuaW0gd8SZesWCZW0gdyDFm2NpZcW8Y2UgcG93aW5pZW4gYnnEhyBXxJl6ZcWCIEtvxYRjb3d5XCIsXG4gICAgICAgIFwicHJvYmFiaWxpdHlEb05vdFN1bVVwVG8xXCI6IFwiUHJhd2RvcG9kb2JpZcWEc3R3YSBuaWUgc3VtdWrEhSBzaWUgZG8gMVwiLFxuICAgICAgICBcImludmFsaWRQcm9iYWJpbGl0eVwiOiBcIk5pZXBvcHJhd25lIHByYXdkb3BvZG9iaWXFhHN0d28gbmEga3Jhd8SZZHppICN7e251bWJlcn19XCIsXG4gICAgICAgIFwiaW52YWxpZFBheW9mZlwiOiBcIk5pZXBvcHJhd25hIHd5cMWCYXRhIG5hIGtyYXfEmWR6aSAje3tudW1iZXJ9fVwiXG4gICAgfSxcbiAgICBcImdyb3dsXCI6e1xuICAgICAgICBcImJydXNoRGlzYWJsZWRcIjogXCJaYXpuYWN6YW5pZSB3ecWCxIVjem9uZVwiLFxuICAgICAgICBcImJydXNoRW5hYmxlZFwiOiBcIlphem5hY3phbmllIHfFgsSFY3pvbmVcIlxuICAgIH0sXG4gICAgXCJ0b29sdGlwXCI6e1xuICAgICAgICBcIm5vZGVcIjp7XG4gICAgICAgICAgICBcInBheW9mZlwiOiB7XG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiV3lwxYJhdGEge3tudW1iZXJ9fVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJ7e25hbWV9fVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJhZ2dyZWdhdGVkUGF5b2ZmXCI6IHtcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJaYWdyZWdvd2FuYSB3eXDFgmF0YSB7e251bWJlcn19XCIsXG4gICAgICAgICAgICAgICAgXCJuYW1lZFwiOiBcIlphZ3JlZ293YW5hIHt7bmFtZX19XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInByb2JhYmlsaXR5VG9FbnRlclwiOiBcIlByYXdkb3BvZG9iaWXFhHN0d28gd2VqxZtjaWFcIlxuICAgICAgICB9LFxuICAgICAgICBcImVkZ2VcIjp7XG4gICAgICAgICAgICBcInBheW9mZlwiOiB7XG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiV3lwxYJhdGEge3tudW1iZXJ9fToge3t2YWx1ZX19XCIsXG4gICAgICAgICAgICAgICAgXCJuYW1lZFwiOiBcInt7bmFtZX19OiB7e3ZhbHVlfX1cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwicHJvYmFiaWxpdHlcIjogXCJQcmF3ZG9wb2RvYmllxYRzdHdvOiB7e3ZhbHVlfX1cIlxuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHtEM0V4dGVuc2lvbnN9IGZyb20gJy4vZDMtZXh0ZW5zaW9ucydcbkQzRXh0ZW5zaW9ucy5leHRlbmQoKTtcblxuZXhwb3J0ICogZnJvbSAnLi90cmVlLWRlc2lnbmVyJ1xuZXhwb3J0ICogZnJvbSAnLi9hcHAtdXRpbHMnXG5leHBvcnQgKiBmcm9tICcuL3RlbXBsYXRlcydcbmV4cG9ydCAqIGZyb20gJy4vdG9vbHRpcCdcbmV4cG9ydCAqIGZyb20gJy4vZDMtZXh0ZW5zaW9ucydcbmV4cG9ydCB7ZGVmYXVsdCBhcyBkM30gZnJvbSAnLi9kMydcblxuXG4iLCJpbXBvcnQge1V0aWxzfSBmcm9tICdzZC11dGlscydcbmltcG9ydCB7ZG9tYWluIGFzIG1vZGVsfSBmcm9tICdzZC1tb2RlbCdcbmltcG9ydCAqIGFzIGQzIGZyb20gJy4vZDMnXG5pbXBvcnQgY2lyY2xlU3ltYm9sIGZyb20gJy4vc3ltYm9scy9jaXJjbGUnXG5pbXBvcnQgdHJpYW5nbGVTeW1ib2wgZnJvbSAnLi9zeW1ib2xzL3RyaWFuZ2xlJ1xuaW1wb3J0IHtBcHBVdGlsc30gZnJvbSBcIi4vYXBwLXV0aWxzXCI7XG5cbi8qVHJlZSBsYXlvdXQgbWFuYWdlciovXG5leHBvcnQgY2xhc3MgTGF5b3V0e1xuXG4gICAgdHJlZURlc2lnbmVyO1xuICAgIGRhdGE7XG4gICAgY29uZmlnO1xuXG4gICAgbm9kZVR5cGVUb1N5bWJvbCA9IHtcbiAgICAgICAgJ2RlY2lzaW9uJzogZDMuc3ltYm9sU3F1YXJlLFxuICAgICAgICAnY2hhbmNlJzogY2lyY2xlU3ltYm9sLFxuICAgICAgICBcInRlcm1pbmFsXCI6IHRyaWFuZ2xlU3ltYm9sXG4gICAgfTtcblxuICAgIHN0YXRpYyBNQU5VQUxfTEFZT1VUX05BTUUgPSAnbWFudWFsJztcblxuXG4gICAgb25BdXRvTGF5b3V0Q2hhbmdlZD1bXTtcblxuICAgIG5vZGVUeXBlT3JkZXIgPSB7XG4gICAgICAgICdkZWNpc2lvbicgOiAwLFxuICAgICAgICAnY2hhbmNlJzogMCxcbiAgICAgICAgJ3Rlcm1pbmFsJzogMVxuICAgIH07XG5cbiAgICB0cmVlTWFyZ2luID0gNTA7XG4gICAgdGFyZ2V0U3ltYm9sU2l6ZT17fTtcbiAgICBub2RlU2VwYXJhdGlvbiA9IChhLCBiKSA9PiBhLnBhcmVudCA9PT0gYi5wYXJlbnQgPyAxIDogMS4yXG5cbiAgICBjb25zdHJ1Y3Rvcih0cmVlRGVzaWduZXIsIGRhdGEsIGNvbmZpZyl7XG4gICAgICAgIHRoaXMudHJlZURlc2lnbmVyID0gdHJlZURlc2lnbmVyO1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcblxuICAgIH1cblxuICAgIHVwZGF0ZShub2RlKXtcbiAgICAgICAgaWYobm9kZSAmJiBub2RlLiRwYXJlbnQpe1xuICAgICAgICAgICAgbm9kZS4kcGFyZW50LmNoaWxkRWRnZXMuc29ydCgoYSxiKT0+YS5jaGlsZE5vZGUubG9jYXRpb24ueSAtIGIuY2hpbGROb2RlLmxvY2F0aW9uLnkpXG4gICAgICAgIH1cbiAgICAgICAgaWYoIXRoaXMuaXNNYW51YWxMYXlvdXQoKSl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hdXRvTGF5b3V0KHRoaXMuY29uZmlnLnR5cGUsIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmKG5vZGUpe1xuICAgICAgICAgICAgdGhpcy5tb3ZlTm9kZVRvRW1wdHlQbGFjZShub2RlKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLnRyZWVEZXNpZ25lci5yZWRyYXcodHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc01hbnVhbExheW91dCgpe1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcudHlwZSA9PT0gTGF5b3V0Lk1BTlVBTF9MQVlPVVRfTkFNRTtcbiAgICB9XG5cbiAgICBnZXROZXdDaGlsZExvY2F0aW9uKHBhcmVudCl7XG4gICAgICAgIGlmKCFwYXJlbnQpe1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBtb2RlbC5Qb2ludCh0aGlzLmdldE5vZGVNaW5YKCksIHRoaXMuZ2V0Tm9kZU1pblkoKSlcbiAgICAgICAgfVxuICAgICAgICB2YXIgeCA9IHBhcmVudC5sb2NhdGlvbi54ICsgdGhpcy5jb25maWcuZ3JpZFdpZHRoO1xuICAgICAgICB2YXIgeSA9IHBhcmVudC5sb2NhdGlvbi55O1xuICAgICAgICBpZihwYXJlbnQuY2hpbGRFZGdlcy5sZW5ndGgpe1xuICAgICAgICAgICAgeSA9IHBhcmVudC5jaGlsZEVkZ2VzW3BhcmVudC5jaGlsZEVkZ2VzLmxlbmd0aC0xXS5jaGlsZE5vZGUubG9jYXRpb24ueSsxO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBtb2RlbC5Qb2ludCh4LCB5KVxuICAgIH1cblxuICAgIGdldEluamVjdGVkTm9kZUxvY2F0aW9uKGVkZ2Upe1xuXG4gICAgICAgIHZhciBwID0gZWRnZS4kbGluZVBvaW50c1syXTtcblxuICAgICAgICByZXR1cm4gbmV3IG1vZGVsLlBvaW50KHBbMF0sIHBbMV0pXG4gICAgfVxuXG4gICAgbW92ZU5vZGVUb0VtcHR5UGxhY2Uobm9kZSwgcmVkcmF3SWZDaGFuZ2VkPXRydWUpe1xuICAgICAgICB2YXIgcG9zaXRpb25NYXAgPSB7fTtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBub2RlLmxvY2F0aW9uLnggPSBNYXRoLm1heCh0aGlzLmdldE5vZGVNaW5YKG5vZGUpLCBub2RlLmxvY2F0aW9uLngpO1xuICAgICAgICBub2RlLmxvY2F0aW9uLnkgPSBNYXRoLm1heCh0aGlzLmdldE5vZGVNaW5ZKG5vZGUpLCBub2RlLmxvY2F0aW9uLnkpO1xuXG5cbiAgICAgICAgdGhpcy5ub2Rlc1NvcnRlZEJ5WCA9IHRoaXMuZGF0YS5ub2Rlcy5zbGljZSgpO1xuICAgICAgICB0aGlzLm5vZGVzU29ydGVkQnlYLnNvcnQoKGEsYik9PmEubG9jYXRpb24ueCAtIGIubG9jYXRpb24ueCk7XG5cbiAgICAgICAgZnVuY3Rpb24gZmluZENvbGxpZGluZ05vZGUobm9kZSwgbG9jYXRpb24pe1xuICAgICAgICAgICAgcmV0dXJuIFV0aWxzLmZpbmQoc2VsZi5ub2Rlc1NvcnRlZEJ5WCwgbj0+e1xuICAgICAgICAgICAgICAgIGlmKG5vZGUgPT0gbil7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgbWFyZ2luID0gc2VsZi5jb25maWcubm9kZVNpemUvMztcbiAgICAgICAgICAgICAgICB2YXIgeCA9IG4ubG9jYXRpb24ueDtcbiAgICAgICAgICAgICAgICB2YXIgeSA9IG4ubG9jYXRpb24ueTtcblxuICAgICAgICAgICAgICAgIHJldHVybiAobG9jYXRpb24ueCAtIG1hcmdpbiA8PSB4ICYmIGxvY2F0aW9uLnggKyBtYXJnaW4gPj0geFxuICAgICAgICAgICAgICAgICAgICAmJiBsb2NhdGlvbi55IC0gbWFyZ2luIDw9IHkgJiYgbG9jYXRpb24ueSArIG1hcmdpbiA+PSB5KVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc3RlcFggPSB0aGlzLmNvbmZpZy5ub2RlU2l6ZS8yO1xuICAgICAgICB2YXIgc3RlcFkgPSB0aGlzLmNvbmZpZy5ub2RlU2l6ZSsxMDtcbiAgICAgICAgdmFyIHN0ZXBYc2FtZVBhcmVudCA9IDA7XG4gICAgICAgIHZhciBzdGVwWXNhbWVQYXJlbnQgPSA3NTtcbiAgICAgICAgdmFyIGNoYW5nZWQgPSBmYWxzZTtcbiAgICAgICAgdmFyIGNvbGlkaW5nTm9kZTtcbiAgICAgICAgdmFyIG5ld0xvY2F0aW9uID0gbmV3IG1vZGVsLlBvaW50KG5vZGUubG9jYXRpb24pO1xuICAgICAgICB3aGlsZShjb2xpZGluZ05vZGUgPSBmaW5kQ29sbGlkaW5nTm9kZShub2RlLCBuZXdMb2NhdGlvbikpe1xuICAgICAgICAgICAgY2hhbmdlZD10cnVlO1xuICAgICAgICAgICAgdmFyIHNhbWVQYXJlbnQgPSBub2RlLiRwYXJlbnQgJiYgY29saWRpbmdOb2RlLiRwYXJlbnQgJiYgbm9kZS4kcGFyZW50PT09Y29saWRpbmdOb2RlLiRwYXJlbnQ7XG4gICAgICAgICAgICBpZihzYW1lUGFyZW50KXtcbiAgICAgICAgICAgICAgICBuZXdMb2NhdGlvbi5tb3ZlKHN0ZXBYc2FtZVBhcmVudCwgc3RlcFlzYW1lUGFyZW50KTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIG5ld0xvY2F0aW9uLm1vdmUoc3RlcFgsIHN0ZXBZKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZihjaGFuZ2VkKXtcbiAgICAgICAgICAgIG5vZGUubW92ZVRvKG5ld0xvY2F0aW9uLngsbmV3TG9jYXRpb24ueSwgdHJ1ZSk7XG4gICAgICAgICAgICBpZihyZWRyYXdJZkNoYW5nZWQpe1xuICAgICAgICAgICAgICAgIHRoaXMudHJlZURlc2lnbmVyLnJlZHJhdyh0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRpc2FibGVBdXRvTGF5b3V0KCl7XG4gICAgICAgIHRoaXMuY29uZmlnLnR5cGUgPSBMYXlvdXQuTUFOVUFMX0xBWU9VVF9OQU1FO1xuICAgICAgICB0aGlzLl9maXJlT25BdXRvTGF5b3V0Q2hhbmdlZENhbGxiYWNrcygpO1xuICAgIH1cblxuXG4gICAgbm9kZVN5bWJvbFNpemUgPSB7fTtcbiAgICBkcmF3Tm9kZVN5bWJvbChwYXRoLCB0cmFuc2l0aW9uKXtcblxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBub2RlU2l6ZSA9IHRoaXMuY29uZmlnLm5vZGVTaXplO1xuICAgICAgICB0aGlzLm5vZGVTeW1ib2wgPSBkMy5zeW1ib2woKS50eXBlKGQ9PiBzZWxmLm5vZGVUeXBlVG9TeW1ib2xbZC50eXBlXSlcbiAgICAgICAgICAgIC5zaXplKGQ9PnNlbGYubm9kZVN5bWJvbFNpemVbZC4kaWRdID8gVXRpbHMuZ2V0KHNlbGYudGFyZ2V0U3ltYm9sU2l6ZSwgZC50eXBlK1wiWydcIitzZWxmLmNvbmZpZy5ub2RlU2l6ZStcIiddXCIsIDY0KSA6IDY0KTtcblxuICAgICAgICBwYXRoXG4gICAgICAgICAgICAuZWFjaChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHZhciBwYXRoID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICAgICAgICAgIHZhciBwcmV2ID0gcGF0aC5hdHRyKFwiZFwiKTtcbiAgICAgICAgICAgICAgICBpZighcHJldil7XG4gICAgICAgICAgICAgICAgICAgIHBhdGguYXR0cihcImRcIiwgc2VsZi5ub2RlU3ltYm9sKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHNpemUgPSBVdGlscy5nZXQoc2VsZi50YXJnZXRTeW1ib2xTaXplLCBkLnR5cGUrXCJbJ1wiK3NlbGYuY29uZmlnLm5vZGVTaXplK1wiJ11cIik7XG4gICAgICAgICAgICAgICAgaWYoIXNpemUpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgYm94ID0gcGF0aC5ub2RlKCkuZ2V0QkJveCgpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSBNYXRoLm1pbihub2RlU2l6ZSAvIGJveC53aWR0aCwgbm9kZVNpemUgLyBib3guaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgc2l6ZSA9IGVycm9yICogZXJyb3IgKiAoc2VsZi5ub2RlU3ltYm9sU2l6ZVtkLiRpZF18fDY0KTtcbiAgICAgICAgICAgICAgICAgICAgVXRpbHMuc2V0KHNlbGYudGFyZ2V0U3ltYm9sU2l6ZSwgZC50eXBlK1wiWydcIitzZWxmLmNvbmZpZy5ub2RlU2l6ZStcIiddXCIsIHNpemUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZih0cmFuc2l0aW9uKXtcbiAgICAgICAgICAgICAgICAgICAgcGF0aCA9ICBwYXRoLnRyYW5zaXRpb24oKTtcblxuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBzZWxmLm5vZGVTeW1ib2xTaXplW2QuJGlkXSA9IHNpemU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBhdGguYXR0cihcImRcIiwgc2VsZi5ub2RlU3ltYm9sKTtcbiAgICAgICAgICAgICAgICBpZih0cmFuc2l0aW9uKXtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5ub2RlU3ltYm9sU2l6ZVtkLiRpZF0gPSBzaXplO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5vZGVMYWJlbFBvc2l0aW9uKHNlbGVjdGlvbikge1xuICAgICAgICByZXR1cm4gc2VsZWN0aW9uXG4gICAgICAgICAgICAuYXR0cigneCcsIDApXG4gICAgICAgICAgICAuYXR0cigneScsIC10aGlzLmNvbmZpZy5ub2RlU2l6ZSAvIDIgLSA3KVxuICAgIH1cblxuICAgIG5vZGVQYXlvZmZQb3NpdGlvbihzZWxlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIExheW91dC5zZXRIYW5naW5nUG9zaXRpb24oc2VsZWN0aW9uKVxuICAgICAgICAgICAgLmF0dHIoJ3gnLCAwKVxuICAgICAgICAgICAgLmF0dHIoJ3knLCB0aGlzLmNvbmZpZy5ub2RlU2l6ZSAvIDIgKyA3KVxuICAgICAgICAgICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXG4gICAgfVxuXG4gICAgbm9kZUFnZ3JlZ2F0ZWRQYXlvZmZQb3NpdGlvbihzZWxlY3Rpb24pIHtcbiAgICAgICAgdmFyIHggPSB0aGlzLmNvbmZpZy5ub2RlU2l6ZSAvIDIgKyA3O1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHNlbGVjdGlvblxuICAgICAgICAgICAgLmF0dHIoJ3gnLCB4KVxuICAgICAgICAgICAgLmF0dHIoJ3knLCBmdW5jdGlvbihkKXtcbiAgICAgICAgICAgICAgICBsZXQgZm9udFNpemUgPSBwYXJzZUludChBcHBVdGlscy5nZXRGb250U2l6ZSh0aGlzKSk7XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW1zID0gZC5kaXNwbGF5VmFsdWUoJ2FnZ3JlZ2F0ZWRQYXlvZmYnKTtcbiAgICAgICAgICAgICAgICBsZXQgbnVtYmVyID0gVXRpbHMuaXNBcnJheShpdGVtcykgPyBpdGVtcy5maWx0ZXIoaXQ9Pml0ICE9PSB1bmRlZmluZWQpLmxlbmd0aCA6IDE7XG4gICAgICAgICAgICAgICAgaWYobnVtYmVyPjEpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gLXRoaXMuZ2V0QkJveCgpLmhlaWdodC8yICsgZm9udFNpemUvMjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIC1NYXRoLm1heCgyLCAxLjgqIHNlbGYuY29uZmlnLm5vZGVTaXplL2ZvbnRTaXplKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHNlbGVjdGlvbi5zZWxlY3RBbGwoJ3RzcGFuJykuYXR0cigneCcsIHgpO1xuICAgICAgICByZXR1cm4gc2VsZWN0aW9uO1xuICAgICAgICAgICAgLy8gLmF0dHIoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXG4gICAgICAgICAgICAvLyAuYXR0cignZG9taW5hbnQtYmFzZWxpbmUnLCAnaGFuZ2luZycpXG4gICAgfVxuXG4gICAgbm9kZVByb2JhYmlsaXR5VG9FbnRlclBvc2l0aW9uKHNlbGVjdGlvbikge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIExheW91dC5zZXRIYW5naW5nUG9zaXRpb24oc2VsZWN0aW9uKVxuICAgICAgICAgICAgLmF0dHIoJ3gnLCB0aGlzLmNvbmZpZy5ub2RlU2l6ZSAvIDIgKyA3KVxuICAgICAgICAgICAgLmF0dHIoJ3knLCBmdW5jdGlvbihkKXtcbiAgICAgICAgICAgICAgICBsZXQgZm9udFNpemUgPSBwYXJzZUludChBcHBVdGlscy5nZXRGb250U2l6ZSh0aGlzKSk7XG4gICAgICAgICAgICAgICAgbGV0IGFnZ3JlZ2F0ZWRQYXlvZmZzID0gZC5kaXNwbGF5VmFsdWUoJ2FnZ3JlZ2F0ZWRQYXlvZmYnKTtcbiAgICAgICAgICAgICAgICBsZXQgYWdncmVnYXRlZFBheW9mZnNOdW1iZXIgPSBVdGlscy5pc0FycmF5KGFnZ3JlZ2F0ZWRQYXlvZmZzKSA/IGFnZ3JlZ2F0ZWRQYXlvZmZzLmZpbHRlcihpdD0+aXQgIT09IHVuZGVmaW5lZCkubGVuZ3RoIDogMTtcbiAgICAgICAgICAgICAgICBpZihhZ2dyZWdhdGVkUGF5b2Zmc051bWJlcj4xKXtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZm9udFNpemUqMC42XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGgubWF4KDIsIDEuOCogc2VsZi5jb25maWcubm9kZVNpemUvZm9udFNpemUpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC8vIC5hdHRyKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKVxuICAgICAgICAgICAgLy8gLmF0dHIoJ2RvbWluYW50LWJhc2VsaW5lJywgJ2NlbnRyYWwnKVxuICAgIH1cblxuICAgIG5vZGVJbmRpY2F0b3JQb3NpdGlvbihzZWxlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIHNlbGVjdGlvblxuICAgICAgICAgICAgLmF0dHIoJ3gnLCB0aGlzLmNvbmZpZy5ub2RlU2l6ZSAvIDIgKyA4KVxuICAgICAgICAgICAgLmF0dHIoJ3knLCAtIHRoaXMuY29uZmlnLm5vZGVTaXplLzIpXG4gICAgICAgICAgICAuYXR0cignZG9taW5hbnQtYmFzZWxpbmUnLCAnY2VudHJhbCcpXG4gICAgICAgICAgICAuYXR0cigndGV4dC1hbmNob3InLCAnbWlkZGxlJylcbiAgICB9XG5cbiAgICBub2RlVW5mb2xkQnV0dG9uUG9zaXRpb24oc2VsZWN0aW9uKSB7XG5cbiAgICAgICAgcmV0dXJuIHNlbGVjdGlvblxuICAgICAgICAgICAgLmF0dHIoJ3gnLCB0aGlzLmNvbmZpZy5ub2RlU2l6ZSAvIDIgKyA1KVxuICAgICAgICAgICAgLmF0dHIoJ3knLCAwKVxuICAgICAgICAgICAgLmF0dHIoJ2RvbWluYW50LWJhc2VsaW5lJywgJ2NlbnRyYWwnKVxuICAgIH1cblxuICAgIGVkZ2VMaW5lRChlZGdlKXtcbiAgICAgICAgdmFyIGxpbmUgPSBkMy5saW5lKClcbiAgICAgICAgICAgIC54KGQ9PiBkWzBdKVxuICAgICAgICAgICAgLnkoZD0+IGRbMV0pO1xuICAgICAgICAvLyAuY3VydmUoZDMuY3VydmVDYXRtdWxsUm9tLmFscGhhKDAuNSkpO1xuXG5cbiAgICAgICAgdmFyIHBhcmVudE5vZGUgPSBlZGdlLnBhcmVudE5vZGU7XG4gICAgICAgIHZhciBjaGlsZE5vZGUgPSBlZGdlLmNoaWxkTm9kZTtcblxuICAgICAgICB2YXIgZFggPSBjaGlsZE5vZGUubG9jYXRpb24ueCAtIHBhcmVudE5vZGUubG9jYXRpb24ueDtcbiAgICAgICAgdmFyIGRZID0gY2hpbGROb2RlLmxvY2F0aW9uLnkgLSBwYXJlbnROb2RlLmxvY2F0aW9uLnk7XG5cbiAgICAgICAgdmFyIHNpZ24gPSBkWD49MCA/IDEgOiAtMTtcblxuICAgICAgICB2YXIgc2xhbnRTdGFydFhPZmZzZXQgPSBNYXRoLm1pbihkWC8yLCB0aGlzLmNvbmZpZy5ub2RlU2l6ZS8yKzEwKTtcbiAgICAgICAgdmFyIHNsYW50V2lkdGggPSBNYXRoLm1pbih0aGlzLmNvbmZpZy5lZGdlU2xhbnRXaWR0aE1heCwgTWF0aC5tYXgoZFgvMiAtIHNsYW50U3RhcnRYT2Zmc2V0LCAwKSk7XG5cbiAgICAgICAgdmFyIHBvaW50MSA9IFtwYXJlbnROb2RlLmxvY2F0aW9uLnggK3RoaXMuY29uZmlnLm5vZGVTaXplLzIgKyAxLCBwYXJlbnROb2RlLmxvY2F0aW9uLnldO1xuICAgICAgICB2YXIgcG9pbnQyID0gW01hdGgubWF4KHBhcmVudE5vZGUubG9jYXRpb24ueCtzbGFudFN0YXJ0WE9mZnNldCwgcG9pbnQxWzBdKSwgcGFyZW50Tm9kZS5sb2NhdGlvbi55XTtcbiAgICAgICAgdmFyIHBvaW50MyA9IFtwYXJlbnROb2RlLmxvY2F0aW9uLngrc2xhbnRTdGFydFhPZmZzZXQrc2xhbnRXaWR0aCwgY2hpbGROb2RlLmxvY2F0aW9uLnldO1xuICAgICAgICB2YXIgcG9pbnQ0ID0gW2NoaWxkTm9kZS5sb2NhdGlvbi54IC0gKHNpZ24qKE1hdGgubWF4KDAsIE1hdGgubWluKHRoaXMuY29uZmlnLm5vZGVTaXplLzIrOCwgZFgvMikpKSksIGNoaWxkTm9kZS5sb2NhdGlvbi55XTtcbiAgICAgICAgLy8gdmFyIHBvaW50MiA9IFtwYXJlbnROb2RlLmxvY2F0aW9uLngrZFgvMi1zbGFudFdpZHRoLzIsIHBhcmVudE5vZGUubG9jYXRpb24ueV07XG4gICAgICAgIC8vIHZhciBwb2ludDMgPSBbY2hpbGROb2RlLmxvY2F0aW9uLngtKGRYLzItc2xhbnRXaWR0aC8yKSwgY2hpbGROb2RlLmxvY2F0aW9uLnldO1xuXG4gICAgICAgIGVkZ2UuJGxpbmVQb2ludHMgPSBbcG9pbnQxLCBwb2ludDIsIHBvaW50MywgcG9pbnQ0XTtcbiAgICAgICAgcmV0dXJuIGxpbmUoZWRnZS4kbGluZVBvaW50cyk7XG4gICAgfVxuXG4gICAgZWRnZVBheW9mZlBvc2l0aW9uKHNlbGVjdGlvbikge1xuICAgICAgICBMYXlvdXQuc2V0SGFuZ2luZ1Bvc2l0aW9uKHNlbGVjdGlvbilcbiAgICAgICAgICAgIC5hdHRyKCd4JywgZD0+ZC4kbGluZVBvaW50c1syXVswXSArIDIpXG4gICAgICAgICAgICAuYXR0cigneScsIGQ9PmQuJGxpbmVQb2ludHNbMl1bMV0gKyA3KTtcblxuICAgICAgICBzZWxlY3Rpb24uc2VsZWN0QWxsKCd0c3BhbicpLmF0dHIoJ3gnLCBmdW5jdGlvbihkKXtcbiAgICAgICAgICAgIHJldHVybiBkMy5zZWxlY3QodGhpcy5wYXJlbnROb2RlKS5kYXR1bSgpLiRsaW5lUG9pbnRzWzJdWzBdICsgMlxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHNlbGVjdGlvbjtcblxuICAgIH1cblxuICAgIGVkZ2VMYWJlbFBvc2l0aW9uKHNlbGVjdGlvbikge1xuICAgICAgICByZXR1cm4gc2VsZWN0aW9uXG4gICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgZD0+J3RyYW5zbGF0ZSgnKyhkLiRsaW5lUG9pbnRzWzJdWzBdICsgMikrJywnKyhkLiRsaW5lUG9pbnRzWzJdWzFdIC0gNykrJyknKVxuICAgICAgICAgICAgLy8gLmF0dHIoJ3gnLCBkPT5kLiRsaW5lUG9pbnRzWzJdWzBdICsgMilcbiAgICAgICAgICAgIC8vIC5hdHRyKCd5JywgZD0+ZC4kbGluZVBvaW50c1syXVsxXSAtIDcpXG5cbiAgICB9XG5cbiAgICBlZGdlUHJvYmFiaWxpdHlQb3NpdGlvbihzZWxlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIExheW91dC5zZXRIYW5naW5nUG9zaXRpb24oc2VsZWN0aW9uKVxuICAgICAgICAgICAgLmF0dHIoJ3gnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHZhciBsZW4gPSB0aGlzLmdldENvbXB1dGVkVGV4dExlbmd0aCgpO1xuICAgICAgICAgICAgICAgIHZhciBtaW4gPSBkLiRsaW5lUG9pbnRzWzJdWzBdICsgMiArIHRoaXMucHJldmlvdXNTaWJsaW5nLmNoaWxkTm9kZXNbMF0uZ2V0Q29tcHV0ZWRUZXh0TGVuZ3RoKCkgKyA3ICsgbGVuO1xuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLm1heChtaW4sIGQuJGxpbmVQb2ludHNbM11bMF0gLSA4KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXR0cigneScsIGQ9PmQuJGxpbmVQb2ludHNbMl1bMV0gKyA3KVxuICAgIH1cblxuICAgIGdldE1pbk1hcmdpbkJldHdlZW5Ob2Rlcygpe1xuICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLm5vZGVTaXplICsgMzA7XG4gICAgfVxuXG4gICAgZ2V0VGV4dE1pblgoZCl7XG4gICAgICAgIGxldCBtaW5YID0gMDtcbiAgICAgICAgaWYoZCl7XG4gICAgICAgICAgICBsZXQgYmIgPSB0aGlzLnRyZWVEZXNpZ25lci5nZXRUZXh0RDNTZWxlY3Rpb24oZCkuc2VsZWN0KCd0ZXh0Jykubm9kZSgpLmdldEJCb3goKTtcbiAgICAgICAgICAgIGlmIChiYi54IDwgMCkge1xuICAgICAgICAgICAgICAgIG1pblggLT0gYmIueDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWluWDtcbiAgICB9XG5cbiAgICBnZXRUZXh0TWluWShkKXtcbiAgICAgICAgbGV0IG1pblkgPSAwO1xuICAgICAgICBpZihkKXtcbiAgICAgICAgICAgIGxldCBiYiA9IHRoaXMudHJlZURlc2lnbmVyLmdldFRleHREM1NlbGVjdGlvbihkKS5zZWxlY3QoJ3RleHQnKS5ub2RlKCkuZ2V0QkJveCgpO1xuICAgICAgICAgICAgaWYgKGJiLnkgPCAwKSB7XG4gICAgICAgICAgICAgICAgbWluWSAtPSBiYi55O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtaW5ZO1xuICAgIH1cblxuICAgIGdldFRleHRNYXhYKGQpe1xuICAgICAgICByZXR1cm4gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVI7XG4gICAgfVxuXG5cbiAgICBnZXROb2RlTWluWChkKXtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBpZihkICYmIGQuJHBhcmVudCl7Ly8gJiYgIXNlbGYuaXNOb2RlU2VsZWN0ZWQoZC4kcGFyZW50KVxuICAgICAgICAgICAgcmV0dXJuIGQuJHBhcmVudC5sb2NhdGlvbi54ICsgc2VsZi5nZXRNaW5NYXJnaW5CZXR3ZWVuTm9kZXMoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2VsZi5jb25maWcubm9kZVNpemUvMjtcbiAgICB9XG5cbiAgICBnZXROb2RlTWluWShkKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLm5vZGVTaXplLzI7XG4gICAgfVxuXG4gICAgZ2V0Tm9kZU1heFgoZCl7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICBpZihkICYmIGQuY2hpbGRFZGdlcy5sZW5ndGgpe1xuICAgICAgICAgICAgcmV0dXJuIGQzLm1pbihkLmNoaWxkRWRnZXMsIGU9PiFlLmNoaWxkTm9kZS4kaGlkZGVuID8gZS5jaGlsZE5vZGUubG9jYXRpb24ueCA6IDk5OTk5OTkpLXNlbGYuZ2V0TWluTWFyZ2luQmV0d2Vlbk5vZGVzKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIE51bWJlci5NQVhfU0FGRV9JTlRFR0VSO1xuICAgIH1cblxuICAgIHNldEdyaWRXaWR0aCh3aWR0aCwgd2l0aG91dFN0YXRlU2F2aW5nKXtcbiAgICAgICAgdmFyIHNlbGY9dGhpcztcbiAgICAgICAgaWYodGhpcy5jb25maWcuZ3JpZFdpZHRoPT09d2lkdGgpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmKCF3aXRob3V0U3RhdGVTYXZpbmcpe1xuICAgICAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSh7XG4gICAgICAgICAgICAgICAgZGF0YTp7XG4gICAgICAgICAgICAgICAgICAgIGdyaWRXaWR0aDogc2VsZi5jb25maWcuZ3JpZFdpZHRoXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvblVuZG86IChkYXRhKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRHcmlkV2lkdGgoZGF0YS5ncmlkV2lkdGgsIHRydWUpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25SZWRvOiAoZGF0YSk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0R3JpZFdpZHRoKHdpZHRoLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29uZmlnLmdyaWRXaWR0aD13aWR0aDtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG5cbiAgICBzZXRHcmlkSGVpZ2h0KGdyaWRIZWlnaHQsIHdpdGhvdXRTdGF0ZVNhdmluZyl7XG4gICAgICAgIHZhciBzZWxmPXRoaXM7XG4gICAgICAgIGlmKHRoaXMuY29uZmlnLmdyaWRIZWlnaHQ9PT1ncmlkSGVpZ2h0KXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZighd2l0aG91dFN0YXRlU2F2aW5nKXtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoe1xuICAgICAgICAgICAgICAgIGRhdGE6e1xuICAgICAgICAgICAgICAgICAgICBncmlkSGVpZ2h0OiBzZWxmLmNvbmZpZy5ncmlkSGVpZ2h0XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvblVuZG86IChkYXRhKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRHcmlkSGVpZ2h0KGRhdGEuZ3JpZEhlaWdodCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvblJlZG86IChkYXRhKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRHcmlkSGVpZ2h0KGdyaWRIZWlnaHQsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb25maWcuZ3JpZEhlaWdodD1ncmlkSGVpZ2h0O1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cblxuICAgIHNldE5vZGVTaXplKG5vZGVTaXplLCB3aXRob3V0U3RhdGVTYXZpbmcpe1xuICAgICAgICB2YXIgc2VsZj10aGlzO1xuICAgICAgICBpZih0aGlzLmNvbmZpZy5ub2RlU2l6ZT09PW5vZGVTaXplKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZighd2l0aG91dFN0YXRlU2F2aW5nKXtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoe1xuICAgICAgICAgICAgICAgIGRhdGE6e1xuICAgICAgICAgICAgICAgICAgICBub2RlU2l6ZTogc2VsZi5jb25maWcubm9kZVNpemVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uVW5kbzogKGRhdGEpPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldE5vZGVTaXplKGRhdGEubm9kZVNpemUsIHRydWUpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25SZWRvOiAoZGF0YSk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0Tm9kZVNpemUobm9kZVNpemUsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb25maWcubm9kZVNpemU9bm9kZVNpemU7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgIGlmKHRoaXMuaXNNYW51YWxMYXlvdXQoKSl7XG4gICAgICAgICAgICB0aGlzLmZpdE5vZGVzSW5QbG90dGluZ1JlZ2lvbihzZWxmLmRhdGEuZ2V0Um9vdHMoKSk7XG4gICAgICAgICAgICB0aGlzLnRyZWVEZXNpZ25lci5yZWRyYXcodHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRFZGdlU2xhbnRXaWR0aE1heCh3aWR0aCwgd2l0aG91dFN0YXRlU2F2aW5nKXtcbiAgICAgICAgdmFyIHNlbGY9dGhpcztcbiAgICAgICAgaWYodGhpcy5jb25maWcuZWRnZVNsYW50V2lkdGhNYXg9PT13aWR0aCl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYoIXdpdGhvdXRTdGF0ZVNhdmluZyl7XG4gICAgICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKHtcbiAgICAgICAgICAgICAgICBkYXRhOntcbiAgICAgICAgICAgICAgICAgICAgZWRnZVNsYW50V2lkdGhNYXg6IHNlbGYuY29uZmlnLmVkZ2VTbGFudFdpZHRoTWF4XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvblVuZG86IChkYXRhKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRFZGdlU2xhbnRXaWR0aE1heChkYXRhLmVkZ2VTbGFudFdpZHRoTWF4LCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uUmVkbzogKGRhdGEpPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldEVkZ2VTbGFudFdpZHRoTWF4KHdpZHRoLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29uZmlnLmVkZ2VTbGFudFdpZHRoTWF4PXdpZHRoO1xuICAgICAgICB0aGlzLnRyZWVEZXNpZ25lci5yZWRyYXcodHJ1ZSk7XG4gICAgfVxuXG4gICAgYXV0b0xheW91dCh0eXBlLCB3aXRob3V0U3RhdGVTYXZpbmcpe1xuICAgICAgICB2YXIgc2VsZj10aGlzO1xuXG5cblxuICAgICAgICBpZighd2l0aG91dFN0YXRlU2F2aW5nKXtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoe1xuICAgICAgICAgICAgICAgIGRhdGE6e1xuICAgICAgICAgICAgICAgICAgICBuZXdMYXlvdXQ6IHR5cGUsXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRMYXlvdXQ6IHNlbGYuY29uZmlnLnR5cGVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uVW5kbzogKGRhdGEpPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmNvbmZpZy50eXBlID0gZGF0YS5jdXJyZW50TGF5b3V0O1xuICAgICAgICAgICAgICAgICAgICBzZWxmLl9maXJlT25BdXRvTGF5b3V0Q2hhbmdlZENhbGxiYWNrcygpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25SZWRvOiAoZGF0YSk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuYXV0b0xheW91dChkYXRhLm5ld0xheW91dCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb25maWcudHlwZSA9IHR5cGU7XG4gICAgICAgIGlmKCF0aGlzLmRhdGEubm9kZXMubGVuZ3RoKXtcbiAgICAgICAgICAgIHRoaXMuX2ZpcmVPbkF1dG9MYXlvdXRDaGFuZ2VkQ2FsbGJhY2tzKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcHJldlRyZWVNYXhZID0gc2VsZi5nZXROb2RlTWluWSgpO1xuICAgICAgICB0aGlzLmRhdGEuZ2V0Um9vdHMoKS5mb3JFYWNoKHI9PntcbiAgICAgICAgICAgIHZhciByb290ID0gZDMuaGllcmFyY2h5KHIsIGQ9PntcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5jaGlsZEVkZ2VzLmZpbHRlcihlPT4hZS4kaGlkZGVuKS5tYXAoZT0+ZS5jaGlsZE5vZGUpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIHJvb3Quc29ydCgoYSxiKT0+c2VsZi5ub2RlVHlwZU9yZGVyW2EuZGF0YS50eXBlXS1zZWxmLm5vZGVUeXBlT3JkZXJbYi5kYXRhLnR5cGVdKTtcbiAgICAgICAgICAgIHJvb3Quc29ydCgoYSxiKT0+YS5kYXRhLmxvY2F0aW9uLnkgLSBiLmRhdGEubG9jYXRpb24ueSk7XG5cblxuICAgICAgICAgICAgdmFyIGxheW91dDtcbiAgICAgICAgICAgIGlmKHR5cGU9PT0nY2x1c3Rlcicpe1xuICAgICAgICAgICAgICAgIGxheW91dCA9IGQzLmNsdXN0ZXIoKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGxheW91dCA9IGQzLnRyZWUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxheW91dC5ub2RlU2l6ZShbc2VsZi5jb25maWcuZ3JpZEhlaWdodCwgc2VsZi5jb25maWcuZ3JpZFdpZHRoXSk7XG4gICAgICAgICAgICBsYXlvdXQuc2VwYXJhdGlvbihzZWxmLm5vZGVTZXBhcmF0aW9uKTtcblxuICAgICAgICAgICAgbGF5b3V0KHJvb3QpO1xuICAgICAgICAgICAgdmFyIG1pblkgPSA5OTk5OTk5OTk7XG4gICAgICAgICAgICByb290LmVhY2goZD0+e1xuICAgICAgICAgICAgICAgIG1pblkgPSBNYXRoLm1pbihtaW5ZLCBkLngpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHZhciBkeSA9IHJvb3QueCAtIG1pblkgKyBwcmV2VHJlZU1heFk7XG4gICAgICAgICAgICB2YXIgZHggPSBzZWxmLmdldE5vZGVNaW5YKCk7XG4gICAgICAgICAgICB2YXIgbWF4WT0wO1xuICAgICAgICAgICAgcm9vdC5lYWNoKGQ9PntcbiAgICAgICAgICAgICAgICBkLmRhdGEubG9jYXRpb24ueCA9IGQueSArIGR4O1xuICAgICAgICAgICAgICAgIGQuZGF0YS5sb2NhdGlvbi55ID0gZC54ICsgZHk7XG5cbiAgICAgICAgICAgICAgICBtYXhZID0gTWF0aC5tYXgobWF4WSwgZC5kYXRhLmxvY2F0aW9uLnkpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHByZXZUcmVlTWF4WSA9IG1heFkgKyBzZWxmLmNvbmZpZy5ub2RlU2l6ZStzZWxmLnRyZWVNYXJnaW47XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgLy8gdGhpcy50cmFuc2l0aW9uID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50cmVlRGVzaWduZXIucmVkcmF3KHRydWUpO1xuICAgICAgICAvLyB0aGlzLnRyYW5zaXRpb24gPSBmYWxzZTtcblxuICAgICAgICB0aGlzLl9maXJlT25BdXRvTGF5b3V0Q2hhbmdlZENhbGxiYWNrcygpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBmaXROb2Rlc0luUGxvdHRpbmdSZWdpb24obm9kZXMpe1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciB0b3BZID0gZDMubWluKG5vZGVzLCBuPT5uLmxvY2F0aW9uLnkpO1xuICAgICAgICB2YXIgbWluWSA9IHNlbGYuZ2V0Tm9kZU1pblkoKTtcbiAgICAgICAgdmFyIGR5ID0gdG9wWSAtIG1pblk7XG5cbiAgICAgICAgdmFyIG1pblggPSBkMy5taW4obm9kZXMsIG49Pm4ubG9jYXRpb24ueCk7XG4gICAgICAgIHZhciBkeCA9IG1pblggLSBzZWxmLmdldE5vZGVNaW5YKCk7XG5cbiAgICAgICAgaWYoZHk8MCB8fCAgZHg8MCl7XG4gICAgICAgICAgICBub2Rlcy5mb3JFYWNoKG49Pm4ubW92ZSgtZHgsIC1keSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW92ZU5vZGVzKG5vZGVzLCBkeCwgZHksIHBpdm90KXtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgbGltaXQgPSBzZWxmLmNvbmZpZy5saW1pdE5vZGVQb3NpdGlvbmluZztcbiAgICAgICAgaWYobGltaXQpe1xuICAgICAgICAgICAgaWYoZHg8MCl7XG4gICAgICAgICAgICAgICAgbm9kZXMuc29ydCgoYSxiKT0+YS5sb2NhdGlvbi54LWIubG9jYXRpb24ueCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBub2Rlcy5zb3J0KChhLGIpPT5iLmxvY2F0aW9uLngtYS5sb2NhdGlvbi54KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cbiAgICAgICAgdmFyIG1pblkgPSBkMy5taW4obm9kZXMsIGQ9PmQubG9jYXRpb24ueSk7XG4gICAgICAgIGlmKG1pblkgKyBkeSA8IHNlbGYuZ2V0Tm9kZU1pblkoKSl7XG4gICAgICAgICAgICBkeSA9IHNlbGYuZ2V0Tm9kZU1pblkoKSAtIG1pblk7XG4gICAgICAgIH1cblxuICAgICAgICBub2Rlcy5mb3JFYWNoKGQ9PntcbiAgICAgICAgICAgIGlmKGxpbWl0KXtcbiAgICAgICAgICAgICAgICBMYXlvdXQuYmFja3VwTm9kZUxvY2F0aW9uKGQpO1xuICAgICAgICAgICAgICAgIHZhciBtaW5YID0gc2VsZi5nZXROb2RlTWluWChkKTtcbiAgICAgICAgICAgICAgICB2YXIgbWF4WCA9IHNlbGYuZ2V0Tm9kZU1heFgoZCk7XG5cbiAgICAgICAgICAgICAgICBkLmxvY2F0aW9uLnggPSBNYXRoLm1pbihNYXRoLm1heChkLmxvY2F0aW9uLngrZHgsIG1pblgpLCBtYXhYKTtcbiAgICAgICAgICAgICAgICBkLmxvY2F0aW9uLnkgKz0gZHk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBkLmxvY2F0aW9uLnggKz1keDtcbiAgICAgICAgICAgICAgICBkLmxvY2F0aW9uLnkgKz0gZHk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG5cblxuICAgICAgICB2YXIgcmV2ZXJ0WCA9IHBpdm90ICYmIHNlbGYuY29uZmlnLmxpbWl0Tm9kZVBvc2l0aW9uaW5nICYmIChwaXZvdC5sb2NhdGlvbi54ID09PSBwaXZvdC4kbG9jYXRpb24ueCk7XG5cbiAgICAgICAgbm9kZXMuZm9yRWFjaChkPT57XG4gICAgICAgICAgICBpZihyZXZlcnRYKXtcbiAgICAgICAgICAgICAgICBkLmxvY2F0aW9uLnggPSBkLiRsb2NhdGlvbi54O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi50cmVlRGVzaWduZXIudXBkYXRlTm9kZVBvc2l0aW9uKGQpO1xuICAgICAgICB9KTtcblxuXG4gICAgfVxuXG4gICAgbW92ZVRleHRzKHRleHRzLCBkeCwgZHkpe1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIGxldCBsaW1pdCA9IHNlbGYuY29uZmlnLmxpbWl0VGV4dFBvc2l0aW9uaW5nO1xuICAgICAgICBpZihsaW1pdCl7XG4gICAgICAgICAgICBpZihkeDwwKXtcbiAgICAgICAgICAgICAgICB0ZXh0cy5zb3J0KChhLGIpPT5hLmxvY2F0aW9uLngtYi5sb2NhdGlvbi54KTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRleHRzLnNvcnQoKGEsYik9PmIubG9jYXRpb24ueC1hLmxvY2F0aW9uLngpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuXG4gICAgICAgIHRleHRzLmZvckVhY2goZD0+e1xuXG5cblxuXG4gICAgICAgICAgICBpZihsaW1pdCl7XG4gICAgICAgICAgICAgICAgbGV0IG1pblggPSBzZWxmLmdldFRleHRNaW5YKGQpO1xuICAgICAgICAgICAgICAgIGxldCBtYXhYID0gc2VsZi5nZXRUZXh0TWF4WChkKTtcbiAgICAgICAgICAgICAgICBsZXQgbWluWSA9IHNlbGYuZ2V0VGV4dE1pblkoZCk7XG5cblxuICAgICAgICAgICAgICAgIGQubG9jYXRpb24ueCA9IE1hdGgubWluKE1hdGgubWF4KGQubG9jYXRpb24ueCtkeCwgbWluWCksIG1heFgpO1xuICAgICAgICAgICAgICAgIGQubG9jYXRpb24ueSA9IE1hdGgubWF4KGQubG9jYXRpb24ueStkeSwgbWluWSk7XG5cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGQubG9jYXRpb24ubW92ZShkeCwgZHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi50cmVlRGVzaWduZXIudXBkYXRlVGV4dFBvc2l0aW9uKGQpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgc3RhdGljIGJhY2t1cE5vZGVMb2NhdGlvbihub2RlKSB7XG4gICAgICAgIG5vZGUuJGxvY2F0aW9uID0gbmV3IG1vZGVsLlBvaW50KG5vZGUubG9jYXRpb24pO1xuICAgIH1cblxuICAgIF9maXJlT25BdXRvTGF5b3V0Q2hhbmdlZENhbGxiYWNrcygpe1xuICAgICAgICB0aGlzLm9uQXV0b0xheW91dENoYW5nZWQuZm9yRWFjaChjPT5jKHRoaXMuY29uZmlnLnR5cGUpKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2V0SGFuZ2luZ1Bvc2l0aW9uKHNlbGVjdGlvbil7XG4gICAgICAgIC8vIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgIC8vICAgICBzZWxlY3Rpb24uZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAvLyAgICAgICAgIHZhciBoID0gIHRoaXMuZ2V0QkJveCgpLmhlaWdodDtcbiAgICAgICAgLy8gICAgICAgICBkMy5zZWxlY3QodGhpcykuYXR0cignZHknLCBoKTtcbiAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAvLyB9LDApO1xuXG4gICAgICAgIGlmKEFwcFV0aWxzLmlzSGlkZGVuKHNlbGVjdGlvbi5ub2RlKCkpKXsgLy8gc2V0dGluZyBoYW5naW5nIHBvc2l0aW9uIG9mIGhpZGRlbiBlbGVtZW50cyBmYWlscyBvbiBmaXJlZm94XG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0aW9uO1xuICAgICAgICB9XG5cblxuICAgICAgICBzZWxlY3Rpb24uZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIGggPSAgdGhpcy5nZXRCQm94KCkuaGVpZ2h0O1xuICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLmF0dHIoJ2R5JywgJzAuNzVlbScpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc2VsZWN0aW9uO1xuICAgIH1cblxufVxuXG5cbiIsImltcG9ydCB7QXBwVXRpbHN9IGZyb20gJy4vYXBwLXV0aWxzJ1xuaW1wb3J0ICogYXMgZDMgZnJvbSAnLi9kMydcbmltcG9ydCB7Q29udGV4dE1lbnV9IGZyb20gJy4vY29udGV4dC1tZW51L2NvbnRleHQtbWVudSdcblxuZXhwb3J0IGNsYXNzIE5vZGVEcmFnSGFuZGxlcntcblxuICAgIHRyZWVEZXNpZ25lcjtcbiAgICBkYXRhO1xuICAgIGNvbmZpZztcblxuICAgIGRyYWc7XG5cblxuICAgIGNvbnN0cnVjdG9yKHRyZWVEZXNpZ25lciwgZGF0YSl7XG4gICAgICAgIHRoaXMudHJlZURlc2lnbmVyID0gdHJlZURlc2lnbmVyO1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5kcmFnID0gZDMuZHJhZygpXG4gICAgICAgICAgICAuc3ViamVjdChmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgICAgaWYoZD09bnVsbCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAge1xuICAgICAgICAgICAgICAgICAgICAgICAgeDogZXZlbnQueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IGV2ZW50LnlcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHQgPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgeDogdC5hdHRyKFwieFwiKSArIEFwcFV0aWxzLmdldFRyYW5zbGF0aW9uKHQuYXR0cihcInRyYW5zZm9ybVwiKSlbMF0sXG4gICAgICAgICAgICAgICAgICAgIHk6IHQuYXR0cihcInlcIikgKyBBcHBVdGlscy5nZXRUcmFuc2xhdGlvbih0LmF0dHIoXCJ0cmFuc2Zvcm1cIikpWzFdXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oXCJzdGFydFwiLCBmdW5jdGlvbihkKXtcbiAgICAgICAgICAgICAgICBzZWxmLmRyYWdTdGFydGVkLmNhbGwodGhpcyxkLCBzZWxmKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbihcImRyYWdcIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICBzZWxmLm9uRHJhZy5jYWxsKHRoaXMsIGQsIHNlbGYpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbihcImVuZFwiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHNlbGYuZHJhZ0VuZGVkLmNhbGwodGhpcywgZCwgc2VsZik7XG4gICAgICAgICAgICB9KVxuICAgIH1cblxuXG4gICAgZHJhZ1N0YXJ0ZWQoZCxzZWxmKSB7XG4gICAgICAgIGlmKHNlbGYuaWdub3JlRHJhZyl7XG4gICAgICAgICAgICBzZWxmLmlnbm9yZURyYWc9ZmFsc2U7XG4gICAgICAgICAgICBzZWxmLmlnbm9yZWREcmFnPXRydWU7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5pZ25vcmVkRHJhZz1mYWxzZTtcblxuICAgICAgICAvLyBzZWxmLnRyZWVEZXNpZ25lci5sYXlvdXQuZGlzYWJsZUF1dG9MYXlvdXQoKTtcbiAgICAgICAgQ29udGV4dE1lbnUuaGlkZSgpO1xuICAgICAgICB2YXIgbm9kZSA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgaWYoIW5vZGUuY2xhc3NlZChcInNlbGVjdGVkXCIpKXtcbiAgICAgICAgICAgIHNlbGYudHJlZURlc2lnbmVyLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICBzZWxmLnRyZWVEZXNpZ25lci5zZWxlY3ROb2RlKGQpO1xuICAgICAgICBub2RlLmNsYXNzZWQoXCJzZWxlY3RlZCBkcmFnZ2luZ1wiLCB0cnVlKTtcbiAgICAgICAgc2VsZi5zZWxlY3RlZE5vZGVzID0gc2VsZi50cmVlRGVzaWduZXIuZ2V0U2VsZWN0ZWROb2Rlcyh0cnVlKTtcbiAgICAgICAgc2VsZi5wcmV2RHJhZ0V2ZW50ID0gZDMuZXZlbnQ7XG4gICAgICAgIHNlbGYuZHJhZ0V2ZW50Q291bnQgPSAwO1xuICAgIH1cblxuICAgIG9uRHJhZyhkcmFnZ2VkTm9kZSwgc2VsZil7XG4gICAgICAgIGlmKHNlbGYuaWdub3JlZERyYWcpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoc2VsZi5kcmFnRXZlbnRDb3VudD09Mil7XG4gICAgICAgICAgICBzZWxmLmRhdGEuc2F2ZVN0YXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5kcmFnRXZlbnRDb3VudCsrO1xuICAgICAgICBpZihzZWxmLnNlbGVjdGVkTm9kZXMubGVuZ3RoPjUgJiYgc2VsZi5kcmFnRXZlbnRDb3VudCUyIT0xKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBkeCA9IGQzLmV2ZW50LnggLSBzZWxmLnByZXZEcmFnRXZlbnQueDtcbiAgICAgICAgdmFyIGR5ID0gZDMuZXZlbnQueS0gc2VsZi5wcmV2RHJhZ0V2ZW50Lnk7XG4gICAgICAgIHNlbGYudHJlZURlc2lnbmVyLmxheW91dC5tb3ZlTm9kZXMoc2VsZi5zZWxlY3RlZE5vZGVzLCBkeCwgZHksIGRyYWdnZWROb2RlKTtcblxuXG4gICAgICAgIHNlbGYucHJldkRyYWdFdmVudCA9IGQzLmV2ZW50O1xuICAgICAgICBzZWxmLnRyZWVEZXNpZ25lci5yZWRyYXdFZGdlcygpO1xuICAgICAgICBzZWxmLnRyZWVEZXNpZ25lci51cGRhdGVQbG90dGluZ1JlZ2lvblNpemUoKTtcbiAgICB9XG5cbiAgICBkcmFnRW5kZWQoZHJhZ2dlZE5vZGUsIHNlbGYpe1xuICAgICAgICB2YXIgbm9kZSA9IGQzLnNlbGVjdCh0aGlzKS5jbGFzc2VkKFwiZHJhZ2dpbmdcIiwgZmFsc2UpO1xuICAgICAgICBpZihzZWxmLmlnbm9yZWREcmFnKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzZWxmLnRyZWVEZXNpZ25lci5sYXlvdXQudXBkYXRlKGRyYWdnZWROb2RlKVxuICAgIH1cblxuICAgIGNhbmNlbERyYWcoKXtcbiAgICAgICAgdGhpcy5pZ25vcmVEcmFnID0gdHJ1ZTtcbiAgICB9XG5cbn1cblxuXG4iLCJ2YXIgZXBzaWxvbiA9IDFlLTEyO1xudmFyIHBpID0gTWF0aC5QSTtcbnZhciBoYWxmUGkgPSBwaSAvIDI7XG52YXIgdGF1ID0gMiAqIHBpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgLypkcmF3OiBmdW5jdGlvbihjb250ZXh0LCBzaXplKSB7XG4gICAgICAgIHZhciByID0gTWF0aC5zcXJ0KHNpemUgLyBwaSk7XG4gICAgICAgIGNvbnRleHQubW92ZVRvKHIsIDApO1xuICAgICAgICBjb250ZXh0LmFyYygwLCAwLCByLCAwLCB0YXUpO1xuICAgIH0qL1xuICAgIGRyYXc6IGZ1bmN0aW9uKGNvbnRleHQsIHNpemUpIHtcblxuICAgICAgICB2YXIgciA9IE1hdGguc3FydChzaXplIC8gcGkpO1xuICAgICAgICB2YXIgZGlzdCA9MC41NTIyODQ3NDk4MzEgKiByO1xuXG4gICAgICAgIGNvbnRleHQubW92ZVRvKC1yLCAwKVxuICAgICAgICAvLyBjb250ZXh0LmxpbmVUbygyKnIsIDIqcilcbiAgICAgICAgLy8gY29udGV4dC5iZXppZXJDdXJ2ZVRvKC1yLCAtZGlzdCwgLWRpc3QsIC1yLCAwLC1yKTtcbiAgICAgICAgY29udGV4dC5iZXppZXJDdXJ2ZVRvKC1yLCAtZGlzdCwgLWRpc3QsIC1yLCAwLC1yKTtcblxuICAgICAgICBjb250ZXh0LmJlemllckN1cnZlVG8oZGlzdCwgLXIsIHIsIC1kaXN0LCByLDApO1xuXG4gICAgICAgIGNvbnRleHQuYmV6aWVyQ3VydmVUbyhyLCBkaXN0LCBkaXN0LCByLCAwLCByKTtcblxuICAgICAgICBjb250ZXh0LmJlemllckN1cnZlVG8oLWRpc3QsIHIsIC1yLCBkaXN0LCAtciwgMCk7XG4gICAgfVxufTtcbiIsInZhciBzcXJ0MyA9IE1hdGguc3FydCgzKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGRyYXc6IGZ1bmN0aW9uKGNvbnRleHQsIHNpemUpIHtcbiAgICAgICAgdmFyIHIgPSBNYXRoLnNxcnQoc2l6ZSAvIE1hdGguUEkpO1xuICAgICAgICBjb250ZXh0Lm1vdmVUbygtciwgMCk7XG4gICAgICAgIGNvbnRleHQubGluZVRvKDAuOSpyLCAtcik7XG4gICAgICAgIGNvbnRleHQubGluZVRvKDAuOSpyLCByKTtcbiAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICB9XG59O1xuIiwiaW1wb3J0IHtVdGlsc30gZnJvbSBcInNkLXV0aWxzXCI7XG5pbXBvcnQge2kxOG59IGZyb20gJy4vaTE4bi9pMThuJ1xuXG5leHBvcnQgY2xhc3MgVGVtcGxhdGVze1xuXG4gICAgc3RhdGljIGdyb3dsID0gcmVxdWlyZSgnLi90ZW1wbGF0ZXMvZ3Jvd2xfbWVzc2FnZS5odG1sJyk7XG5cbiAgICBzdGF0aWMgZ2V0KHRlbXBsYXRlTmFtZSwgdmFyaWFibGVzKXtcbiAgICAgICAgdmFyIGNvbXBpbGVkID0gVXRpbHMudGVtcGxhdGUoVGVtcGxhdGVzW3RlbXBsYXRlTmFtZV0seyAnaW1wb3J0cyc6IHsgJ2kxOG4nOiBpMThuLCAnVGVtcGxhdGVzJzogVGVtcGxhdGVzLCAnaW5jbHVkZSc6IGZ1bmN0aW9uKG4sIHYpIHtyZXR1cm4gVGVtcGxhdGVzLmdldChuLCB2KX0gfSB9KTtcbiAgICAgICAgaWYodmFyaWFibGVzKXtcbiAgICAgICAgICAgIHZhcmlhYmxlcy52YXJpYWJsZXMgPSB2YXJpYWJsZXM7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdmFyaWFibGVzID0ge3ZhcmlhYmxlczp7fX1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29tcGlsZWQodmFyaWFibGVzKVxuXG4gICAgfVxuXG4gICAgc3RhdGljIHN0eWxlUnVsZShzZWxlY3RvciwgcHJvcHMpe1xuICAgICAgICB2YXIgcyA9IHNlbGVjdG9yKyAneyc7XG4gICAgICAgIHByb3BzLmZvckVhY2gocD0+IHMrPVRlbXBsYXRlcy5zdHlsZVByb3AocFswXSwgcFsxXSkpO1xuICAgICAgICBzKz0nfSAnO1xuICAgICAgICByZXR1cm4gcztcbiAgICB9XG4gICAgc3RhdGljIHN0eWxlUHJvcChzdHlsZU5hbWUsIHZhcmlhYmxlTmFtZSl7XG4gICAgICAgIHJldHVybiAgc3R5bGVOYW1lKyc6IDwlPSAnK3ZhcmlhYmxlTmFtZSsnICU+OyAnXG4gICAgfVxuXG4gICAgc3RhdGljIHRyZWVEZXNpZ25lclNlbGVjdG9yID0gJ3N2Zy5zZC10cmVlLWRlc2lnbmVyJztcbiAgICBzdGF0aWMgbm9kZVNlbGVjdG9yKHR5cGUsIGNsYXp6KXtcbiAgICAgICAgdmFyIHMgPSBUZW1wbGF0ZXMudHJlZURlc2lnbmVyU2VsZWN0b3IrJyAubm9kZSc7XG4gICAgICAgIGlmKHR5cGUpe1xuICAgICAgICAgICAgcys9Jy4nK3R5cGUrJy1ub2RlJztcbiAgICAgICAgfVxuICAgICAgICBpZihjbGF6eil7XG4gICAgICAgICAgICBzKz0nLicrY2xheno7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHM7XG4gICAgfVxuICAgIHN0YXRpYyBlZGdlU2VsZWN0b3IoY2xhenope1xuICAgICAgICB2YXIgcyA9IFRlbXBsYXRlcy50cmVlRGVzaWduZXJTZWxlY3RvcisnIC5lZGdlJztcbiAgICAgICAgaWYoY2xhenope1xuICAgICAgICAgICAgcys9Jy4nK2NsYXp6O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzO1xuICAgIH1cblxuICAgIHN0YXRpYyB0cmVlRGVzaWduZXJTdHlsZXMgPVxuXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLnRyZWVEZXNpZ25lclNlbGVjdG9yLFtcbiAgICAgICAgICAgIFsnZm9udC1zaXplJywgJ2ZvbnRTaXplJ10sXG4gICAgICAgICAgICBbJ2ZvbnQtZmFtaWx5JywgJ2ZvbnRGYW1pbHknXSxcbiAgICAgICAgICAgIFsnZm9udC13ZWlnaHQnLCAnZm9udFdlaWdodCddLFxuICAgICAgICAgICAgWydmb250LXN0eWxlJywgJ2ZvbnRTdHlsZSddXG4gICAgICAgIF0pK1xuICAgICAgICAvLyAgIG5vZGVcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCkrJyBwYXRoJyxbXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnbm9kZS5maWxsJ10sXG4gICAgICAgICAgICBbJ3N0cm9rZS13aWR0aCcsICdub2RlLnN0cm9rZVdpZHRoJ11cbiAgICAgICAgXSkrXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLm5vZGVTZWxlY3RvcignZGVjaXNpb24nLCAnb3B0aW1hbCcpKycgcGF0aCwgJytUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCdjaGFuY2UnLCAnb3B0aW1hbCcpKycgcGF0aCwnICtUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCd0ZXJtaW5hbCcsICdvcHRpbWFsJykrJyBwYXRoJyxbXG4gICAgICAgICAgICBbJ3N0cm9rZScsICdub2RlLm9wdGltYWwuc3Ryb2tlJ10sXG4gICAgICAgICAgICBbJ3N0cm9rZS13aWR0aCcsICdub2RlLm9wdGltYWwuc3Ryb2tlV2lkdGgnXVxuICAgICAgICBdKStcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCkrJyAubGFiZWwnLFtcbiAgICAgICAgICAgIFsnZm9udC1zaXplJywgJ25vZGUubGFiZWwuZm9udFNpemUnXSxcbiAgICAgICAgICAgIFsnZmlsbCcsICdub2RlLmxhYmVsLmNvbG9yJ11cbiAgICAgICAgXSkrXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLm5vZGVTZWxlY3RvcigpKycgLnBheW9mZicsW1xuICAgICAgICAgICAgWydmb250LXNpemUnLCAnbm9kZS5wYXlvZmYuZm9udFNpemUnXSxcbiAgICAgICAgICAgIFsnZmlsbCcsICdub2RlLnBheW9mZi5jb2xvciddLFxuICAgICAgICBdKStcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCkrJyAucGF5b2ZmLm5lZ2F0aXZlJyxbXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnbm9kZS5wYXlvZmYubmVnYXRpdmVDb2xvciddLFxuICAgICAgICBdKStcblxuICAgICAgICAvLyAgICBkZWNpc2lvbiBub2RlXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLm5vZGVTZWxlY3RvcignZGVjaXNpb24nKSsnIHBhdGgnLFtcbiAgICAgICAgICAgIFsnZmlsbCcsICdub2RlLmRlY2lzaW9uLmZpbGwnXSxcbiAgICAgICAgICAgIFsnc3Ryb2tlJywgJ25vZGUuZGVjaXNpb24uc3Ryb2tlJ11cbiAgICAgICAgXSkrXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLm5vZGVTZWxlY3RvcignZGVjaXNpb24nLCAnc2VsZWN0ZWQnKSsnIHBhdGgnLFtcbiAgICAgICAgICAgIFsnZmlsbCcsICdub2RlLmRlY2lzaW9uLnNlbGVjdGVkLmZpbGwnXVxuICAgICAgICBdKStcblxuICAgICAgICAvLyAgICBjaGFuY2Ugbm9kZVxuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5ub2RlU2VsZWN0b3IoJ2NoYW5jZScpKycgcGF0aCcsW1xuICAgICAgICAgICAgWydmaWxsJywgJ25vZGUuY2hhbmNlLmZpbGwnXSxcbiAgICAgICAgICAgIFsnc3Ryb2tlJywgJ25vZGUuY2hhbmNlLnN0cm9rZSddXG4gICAgICAgIF0pK1xuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5ub2RlU2VsZWN0b3IoJ2NoYW5jZScsICdzZWxlY3RlZCcpKycgcGF0aCcsW1xuICAgICAgICAgICAgWydmaWxsJywgJ25vZGUuY2hhbmNlLnNlbGVjdGVkLmZpbGwnXVxuICAgICAgICBdKStcblxuICAgICAgICAvLyAgICB0ZXJtaW5hbCBub2RlXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLm5vZGVTZWxlY3RvcigndGVybWluYWwnKSsnIHBhdGgnLFtcbiAgICAgICAgICAgIFsnZmlsbCcsICdub2RlLnRlcm1pbmFsLmZpbGwnXSxcbiAgICAgICAgICAgIFsnc3Ryb2tlJywgJ25vZGUudGVybWluYWwuc3Ryb2tlJ11cbiAgICAgICAgXSkrXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLm5vZGVTZWxlY3RvcigndGVybWluYWwnLCAnc2VsZWN0ZWQnKSsnIHBhdGgnLFtcbiAgICAgICAgICAgIFsnZmlsbCcsICdub2RlLnRlcm1pbmFsLnNlbGVjdGVkLmZpbGwnXVxuICAgICAgICBdKStcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCd0ZXJtaW5hbCcpKycgLmFnZ3JlZ2F0ZWQtcGF5b2ZmJyxbXG4gICAgICAgICAgICBbJ2ZvbnQtc2l6ZScsICdub2RlLnRlcm1pbmFsLnBheW9mZi5mb250U2l6ZSddLFxuICAgICAgICAgICAgWydmaWxsJywgJ25vZGUudGVybWluYWwucGF5b2ZmLmNvbG9yJ10sXG4gICAgICAgIF0pK1xuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5ub2RlU2VsZWN0b3IoJ3Rlcm1pbmFsJykrJyAuYWdncmVnYXRlZC1wYXlvZmYubmVnYXRpdmUnLFtcbiAgICAgICAgICAgIFsnZmlsbCcsICdub2RlLnRlcm1pbmFsLnBheW9mZi5uZWdhdGl2ZUNvbG9yJ10sXG4gICAgICAgIF0pK1xuXG5cbiAgICAgICAgLy9wcm9iYWJpbGl0eVxuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy50cmVlRGVzaWduZXJTZWxlY3RvcisnIC5ub2RlIC5wcm9iYWJpbGl0eS10by1lbnRlciwgJytUZW1wbGF0ZXMudHJlZURlc2lnbmVyU2VsZWN0b3IrJyAuZWRnZSAucHJvYmFiaWxpdHknLFtcbiAgICAgICAgICAgIFsnZm9udC1zaXplJywgJ3Byb2JhYmlsaXR5LmZvbnRTaXplJ10sXG4gICAgICAgICAgICBbJ2ZpbGwnLCAncHJvYmFiaWxpdHkuY29sb3InXVxuICAgICAgICBdKStcblxuICAgICAgICAvL2VkZ2VcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMuZWRnZVNlbGVjdG9yKCkrJyBwYXRoJyxbXG4gICAgICAgICAgICBbJ3N0cm9rZScsICdlZGdlLnN0cm9rZSddLFxuICAgICAgICAgICAgWydzdHJva2Utd2lkdGgnLCAnZWRnZS5zdHJva2VXaWR0aCddXG4gICAgICAgIF0pK1xuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy50cmVlRGVzaWduZXJTZWxlY3RvcisnIG1hcmtlciNhcnJvdyBwYXRoJyxbXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnZWRnZS5zdHJva2UnXSxcbiAgICAgICAgXSkrXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLmVkZ2VTZWxlY3Rvcignb3B0aW1hbCcpKycgcGF0aCcsW1xuICAgICAgICAgICAgWydzdHJva2UnLCAnZWRnZS5vcHRpbWFsLnN0cm9rZSddLFxuICAgICAgICAgICAgWydzdHJva2Utd2lkdGgnLCAnZWRnZS5vcHRpbWFsLnN0cm9rZVdpZHRoJ11cbiAgICAgICAgXSkrXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLnRyZWVEZXNpZ25lclNlbGVjdG9yKycgbWFya2VyI2Fycm93LW9wdGltYWwgcGF0aCcsW1xuICAgICAgICAgICAgWydmaWxsJywgJ2VkZ2Uub3B0aW1hbC5zdHJva2UnXSxcbiAgICAgICAgXSkrXG5cbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMuZWRnZVNlbGVjdG9yKCdzZWxlY3RlZCcpKycgcGF0aCcsW1xuICAgICAgICAgICAgWydzdHJva2UnLCAnZWRnZS5zZWxlY3RlZC5zdHJva2UnXSxcbiAgICAgICAgICAgIFsnc3Ryb2tlLXdpZHRoJywgJ2VkZ2Uuc2VsZWN0ZWQuc3Ryb2tlV2lkdGgnXVxuICAgICAgICBdKStcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMudHJlZURlc2lnbmVyU2VsZWN0b3IrJyBtYXJrZXIjYXJyb3ctc2VsZWN0ZWQgcGF0aCcsW1xuICAgICAgICAgICAgWydmaWxsJywgJ2VkZ2Uuc2VsZWN0ZWQuc3Ryb2tlJ10sXG4gICAgICAgIF0pK1xuXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLmVkZ2VTZWxlY3RvcigpKycgLmxhYmVsJyxbXG4gICAgICAgICAgICBbJ2ZvbnQtc2l6ZScsICdlZGdlLmxhYmVsLmZvbnRTaXplJ10sXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnZWRnZS5sYWJlbC5jb2xvciddXG4gICAgICAgIF0pK1xuXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLmVkZ2VTZWxlY3RvcigpKycgLnBheW9mZicsW1xuICAgICAgICAgICAgWydmb250LXNpemUnLCAnZWRnZS5wYXlvZmYuZm9udFNpemUnXSxcbiAgICAgICAgICAgIFsnZmlsbCcsICdlZGdlLnBheW9mZi5jb2xvciddLFxuICAgICAgICBdKStcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMuZWRnZVNlbGVjdG9yKCkrJyAucGF5b2ZmLm5lZ2F0aXZlJyxbXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnZWRnZS5wYXlvZmYubmVnYXRpdmVDb2xvciddLFxuICAgICAgICBdKStcblxuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy50cmVlRGVzaWduZXJTZWxlY3RvcisnIC5zZC10aXRsZS1jb250YWluZXIgdGV4dC5zZC10aXRsZScsW1xuICAgICAgICAgICAgWydmb250LXNpemUnLCAndGl0bGUuZm9udFNpemUnXSxcbiAgICAgICAgICAgIFsnZm9udC13ZWlnaHQnLCAndGl0bGUuZm9udFdlaWdodCddLFxuICAgICAgICAgICAgWydmb250LXN0eWxlJywgJ3RpdGxlLmZvbnRTdHlsZSddLFxuICAgICAgICAgICAgWydmaWxsJywgJ3RpdGxlLmNvbG9yJ11cbiAgICAgICAgXSkgK1xuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy50cmVlRGVzaWduZXJTZWxlY3RvcisnIC5zZC10aXRsZS1jb250YWluZXIgdGV4dC5zZC1kZXNjcmlwdGlvbicsW1xuICAgICAgICAgICAgWydmb250LXNpemUnLCAnZGVzY3JpcHRpb24uZm9udFNpemUnXSxcbiAgICAgICAgICAgIFsnZm9udC13ZWlnaHQnLCAnZGVzY3JpcHRpb24uZm9udFdlaWdodCddLFxuICAgICAgICAgICAgWydmb250LXN0eWxlJywgJ2Rlc2NyaXB0aW9uLmZvbnRTdHlsZSddLFxuICAgICAgICAgICAgWydmaWxsJywgJ2Rlc2NyaXB0aW9uLmNvbG9yJ11cbiAgICAgICAgXSlcbn1cblxuXG5cblxuIiwibW9kdWxlLmV4cG9ydHMgPSBcIm1vZHVsZS5leHBvcnRzID0gXFxcIjxkaXYgY2xhc3M9XFxcXFxcXCJzZC1ncm93bC1tZXNzYWdlIDwlPXR5cGUlPlxcXFxcXFwiPlxcXFxuICAgIDxkaXYgY2xhc3M9XFxcXFxcXCJzZC1ncm93bC1tZXNzYWdlLXRleHRcXFxcXFxcIj5cXFxcbiAgICAgICAgPCU9IG1lc3NhZ2UgJT5cXFxcbiAgICA8L2Rpdj5cXFxcbjwvZGl2PlxcXFxuXFxcIjtcXG5cIjtcbiIsImltcG9ydCB7QXBwVXRpbHN9IGZyb20gJy4vYXBwLXV0aWxzJ1xuaW1wb3J0ICogYXMgZDMgZnJvbSAnLi9kMydcbmltcG9ydCB7Q29udGV4dE1lbnV9IGZyb20gJy4vY29udGV4dC1tZW51L2NvbnRleHQtbWVudSdcblxuZXhwb3J0IGNsYXNzIFRleHREcmFnSGFuZGxlcntcblxuICAgIHRyZWVEZXNpZ25lcjtcbiAgICBkYXRhO1xuICAgIGNvbmZpZztcblxuICAgIGRyYWc7XG5cblxuICAgIGNvbnN0cnVjdG9yKHRyZWVEZXNpZ25lciwgZGF0YSl7XG4gICAgICAgIHRoaXMudHJlZURlc2lnbmVyID0gdHJlZURlc2lnbmVyO1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5kcmFnID0gZDMuZHJhZygpXG4gICAgICAgICAgICAuc3ViamVjdChmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgICAgaWYoZD09bnVsbCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAge1xuICAgICAgICAgICAgICAgICAgICAgICAgeDogZXZlbnQueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IGV2ZW50LnlcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHQgPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgeDogdC5hdHRyKFwieFwiKSArIEFwcFV0aWxzLmdldFRyYW5zbGF0aW9uKHQuYXR0cihcInRyYW5zZm9ybVwiKSlbMF0sXG4gICAgICAgICAgICAgICAgICAgIHk6IHQuYXR0cihcInlcIikgKyBBcHBVdGlscy5nZXRUcmFuc2xhdGlvbih0LmF0dHIoXCJ0cmFuc2Zvcm1cIikpWzFdXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oXCJzdGFydFwiLCBmdW5jdGlvbihkKXtcbiAgICAgICAgICAgICAgICBzZWxmLmRyYWdTdGFydGVkLmNhbGwodGhpcyxkLCBzZWxmKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbihcImRyYWdcIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICBzZWxmLm9uRHJhZy5jYWxsKHRoaXMsIGQsIHNlbGYpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbihcImVuZFwiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHNlbGYuZHJhZ0VuZGVkLmNhbGwodGhpcywgZCwgc2VsZik7XG4gICAgICAgICAgICB9KVxuICAgIH1cblxuXG4gICAgZHJhZ1N0YXJ0ZWQoZCxzZWxmKSB7XG4gICAgICAgIC8vIHNlbGYudHJlZURlc2lnbmVyLmxheW91dC5kaXNhYmxlQXV0b0xheW91dCgpO1xuICAgICAgICBDb250ZXh0TWVudS5oaWRlKCk7XG4gICAgICAgIHZhciB0ZXh0ID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICBpZighdGV4dC5jbGFzc2VkKFwic2VsZWN0ZWRcIikpe1xuICAgICAgICAgICAgc2VsZi50cmVlRGVzaWduZXIuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNlbGYudHJlZURlc2lnbmVyLnNlbGVjdFRleHQoZCk7XG4gICAgICAgIHRleHQuY2xhc3NlZChcInNlbGVjdGVkIGRyYWdnaW5nXCIsIHRydWUpO1xuICAgICAgICBzZWxmLnNlbGVjdGVkTm9kZXMgPSBzZWxmLnRyZWVEZXNpZ25lci5nZXRTZWxlY3RlZE5vZGVzKCk7XG4gICAgICAgIHNlbGYucHJldkRyYWdFdmVudCA9IGQzLmV2ZW50O1xuICAgICAgICBzZWxmLmRyYWdFdmVudENvdW50ID0gMDtcbiAgICB9XG5cbiAgICBvbkRyYWcoZHJhZ2dlZFRleHQsIHNlbGYpe1xuICAgICAgICBpZihzZWxmLmRyYWdFdmVudENvdW50PT0yKXtcbiAgICAgICAgICAgIHNlbGYuZGF0YS5zYXZlU3RhdGUoKTtcbiAgICAgICAgfVxuICAgICAgICBzZWxmLmRyYWdFdmVudENvdW50Kys7XG5cbiAgICAgICAgdmFyIGR4ID0gZDMuZXZlbnQueCAtIHNlbGYucHJldkRyYWdFdmVudC54O1xuICAgICAgICB2YXIgZHkgPSBkMy5ldmVudC55LSBzZWxmLnByZXZEcmFnRXZlbnQueTtcblxuICAgICAgICBzZWxmLnRyZWVEZXNpZ25lci5sYXlvdXQubW92ZVRleHRzKFtkcmFnZ2VkVGV4dF0sIGR4LCBkeSk7XG5cbiAgICAgICAgc2VsZi5wcmV2RHJhZ0V2ZW50ID0gZDMuZXZlbnQ7XG4gICAgICAgIHNlbGYudHJlZURlc2lnbmVyLnVwZGF0ZVBsb3R0aW5nUmVnaW9uU2l6ZSgpO1xuICAgIH1cblxuICAgIGRyYWdFbmRlZChkcmFnZ2VkTm9kZSwgc2VsZil7XG4gICAgICAgICBkMy5zZWxlY3QodGhpcykuY2xhc3NlZChcImRyYWdnaW5nXCIsIGZhbHNlKTtcbiAgICB9XG5cbn1cblxuXG4iLCJpbXBvcnQgKiBhcyBkMyBmcm9tICcuL2QzJ1xuaW1wb3J0IHtVdGlsc30gZnJvbSAnc2QtdXRpbHMnXG5cbmV4cG9ydCBjbGFzcyBUb29sdGlwIHtcbiAgICBzdGF0aWMgZ2V0Q29udGFpbmVyKCl7XG4gICAgICAgIHJldHVybiBkMy5zZWxlY3QoXCJib2R5XCIpLnNlbGVjdE9yQXBwZW5kKCdkaXYuc2QtdG9vbHRpcCcpO1xuICAgIH1cblxuICAgIHN0YXRpYyBzaG93KGh0bWwsIHhPZmZzZXQgPSA1LCB5T2Zmc2V0ID0gMjgsIGV2ZW50LCBkdXJhdGlvbj1udWxsKSB7XG4gICAgICAgIHZhciBjb250YWluZXIgPSBUb29sdGlwLmdldENvbnRhaW5lcigpXG4gICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIDApO1xuICAgICAgICBjb250YWluZXIudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24oMjAwKVxuICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCAuOTgpO1xuICAgICAgICBjb250YWluZXIuaHRtbChodG1sKTtcbiAgICAgICAgVG9vbHRpcC51cGRhdGVQb3NpdGlvbih4T2Zmc2V0LCB5T2Zmc2V0LCBldmVudCk7XG4gICAgICAgIGlmKGR1cmF0aW9uKXtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBUb29sdGlwLmhpZGUoKTtcbiAgICAgICAgICAgIH0sIGR1cmF0aW9uKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIHVwZGF0ZVBvc2l0aW9uKHhPZmZzZXQgPSA1LCB5T2Zmc2V0ID0gMjgsIGV2ZW50KSB7XG4gICAgICAgIGV2ZW50ID0gZXZlbnQgfHwgZDMuZXZlbnQ7XG4gICAgICAgIFRvb2x0aXAuZ2V0Q29udGFpbmVyKClcbiAgICAgICAgICAgIC5zdHlsZShcImxlZnRcIiwgKGV2ZW50LnBhZ2VYICsgeE9mZnNldCkgKyBcInB4XCIpXG4gICAgICAgICAgICAuc3R5bGUoXCJ0b3BcIiwgKGV2ZW50LnBhZ2VZIC0geU9mZnNldCkgKyBcInB4XCIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBoaWRlKGR1cmF0aW9uID0gNTAwKSB7XG4gICAgICAgIHZhciB0ID0gVG9vbHRpcC5nZXRDb250YWluZXIoKTtcbiAgICAgICAgaWYoZHVyYXRpb24pe1xuICAgICAgICAgICAgdCA9IHQudHJhbnNpdGlvbigpLmR1cmF0aW9uKGR1cmF0aW9uKVxuICAgICAgICB9XG4gICAgICAgIHQuc3R5bGUoXCJvcGFjaXR5XCIsIDApO1xuICAgIH1cblxuICAgIHN0YXRpYyBhdHRhY2godGFyZ2V0LCBodG1sT3JGbiwgeE9mZnNldCwgeU9mZnNldCkge1xuICAgICAgICB0YXJnZXQub24oJ21vdXNlb3ZlcicsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICB2YXIgaHRtbCA9IG51bGw7XG4gICAgICAgICAgICBpZiAoVXRpbHMuaXNGdW5jdGlvbihodG1sT3JGbikpIHtcbiAgICAgICAgICAgICAgICBodG1sID0gaHRtbE9yRm4oZCwgaSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGh0bWwgPSBodG1sT3JGbjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGh0bWwgIT09IG51bGwgJiYgaHRtbCAhPT0gdW5kZWZpbmVkICYmIGh0bWwgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgVG9vbHRpcC5zaG93KGh0bWwsIHhPZmZzZXQsIHlPZmZzZXQpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgVG9vbHRpcC5oaWRlKDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pLm9uKCdtb3VzZW1vdmUnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgVG9vbHRpcC51cGRhdGVQb3NpdGlvbih4T2Zmc2V0LCB5T2Zmc2V0KTtcbiAgICAgICAgfSkub24oXCJtb3VzZW91dFwiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgVG9vbHRpcC5oaWRlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCAqIGFzIGQzIGZyb20gXCIuL2QzXCI7XG5pbXBvcnQge1V0aWxzfSBmcm9tIFwic2QtdXRpbHNcIjtcbmltcG9ydCB7QXBwVXRpbHN9IGZyb20gXCIuL2FwcC11dGlsc1wiO1xuaW1wb3J0IHtkb21haW4gYXMgbW9kZWx9IGZyb20gXCJzZC1tb2RlbFwiO1xuaW1wb3J0IHtDb250ZXh0TWVudX0gZnJvbSBcIi4vY29udGV4dC1tZW51L2NvbnRleHQtbWVudVwiO1xuaW1wb3J0IHtNYWluQ29udGV4dE1lbnV9IGZyb20gXCIuL2NvbnRleHQtbWVudS9tYWluLWNvbnRleHQtbWVudVwiO1xuaW1wb3J0IHtOb2RlQ29udGV4dE1lbnV9IGZyb20gXCIuL2NvbnRleHQtbWVudS9ub2RlLWNvbnRleHQtbWVudVwiO1xuaW1wb3J0IHtMYXlvdXR9IGZyb20gXCIuL2xheW91dFwiO1xuaW1wb3J0IHtOb2RlRHJhZ0hhbmRsZXJ9IGZyb20gXCIuL25vZGUtZHJhZy1oYW5kbGVyXCI7XG5pbXBvcnQge1Rvb2x0aXB9IGZyb20gXCIuL3Rvb2x0aXBcIjtcbmltcG9ydCB7VGVtcGxhdGVzfSBmcm9tIFwiLi90ZW1wbGF0ZXNcIjtcbmltcG9ydCB7VGV4dERyYWdIYW5kbGVyfSBmcm9tIFwiLi90ZXh0LWRyYWctaGFuZGxlclwiO1xuaW1wb3J0IHtUZXh0Q29udGV4dE1lbnV9IGZyb20gXCIuL2NvbnRleHQtbWVudS90ZXh0LWNvbnRleHQtbWVudVwiO1xuaW1wb3J0IHtFZGdlQ29udGV4dE1lbnV9IGZyb20gXCIuL2NvbnRleHQtbWVudS9lZGdlLWNvbnRleHQtbWVudVwiO1xuaW1wb3J0ICogYXMgSGFtbWVyIGZyb20gXCJoYW1tZXJqc1wiO1xuaW1wb3J0IHtpMThufSBmcm9tIFwiLi9pMThuL2kxOG5cIjtcblxuXG5leHBvcnQgY2xhc3MgVHJlZURlc2lnbmVyQ29uZmlnIHtcbiAgICB3aWR0aCA9IHVuZGVmaW5lZDtcbiAgICBoZWlnaHQgPSB1bmRlZmluZWQ7XG4gICAgbWFyZ2luID0ge1xuICAgICAgICBsZWZ0OiAyNSxcbiAgICAgICAgcmlnaHQ6IDI1LFxuICAgICAgICB0b3A6IDI1LFxuICAgICAgICBib3R0b206IDI1XG4gICAgfTtcbiAgICBzY2FsZSA9IDE7XG4gICAgbG5nID0gJ2VuJztcbiAgICBsYXlvdXQ9IHtcbiAgICAgICAgdHlwZTogJ3RyZWUnLFxuICAgICAgICBub2RlU2l6ZTogNDAsXG4gICAgICAgIGxpbWl0Tm9kZVBvc2l0aW9uaW5nOiB0cnVlLFxuICAgICAgICBsaW1pdFRleHRQb3NpdGlvbmluZzogdHJ1ZSxcbiAgICAgICAgZ3JpZEhlaWdodDogNzUsXG4gICAgICAgIGdyaWRXaWR0aDogMTUwLFxuICAgICAgICBlZGdlU2xhbnRXaWR0aE1heDogMjBcbiAgICB9O1xuICAgIGZvbnRGYW1pbHkgPSAnc2Fucy1zZXJpZic7XG4gICAgZm9udFNpemUgPSAnMTJweCc7XG4gICAgZm9udFdlaWdodCA9ICdub3JtYWwnO1xuICAgIGZvbnRTdHlsZSA9ICdub3JtYWwnO1xuICAgIG5vZGUgPSB7XG4gICAgICAgIHN0cm9rZVdpZHRoOiAnMXB4JyxcbiAgICAgICAgb3B0aW1hbDoge1xuICAgICAgICAgICAgc3Ryb2tlOiAnIzAwNmYwMCcsXG4gICAgICAgICAgICBzdHJva2VXaWR0aDogJzEuNXB4JyxcbiAgICAgICAgfSxcbiAgICAgICAgbGFiZWw6IHtcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMWVtJyxcbiAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgIH0sXG4gICAgICAgIHBheW9mZjoge1xuICAgICAgICAgICAgZm9udFNpemU6ICcxZW0nLFxuICAgICAgICAgICAgY29sb3I6ICdibGFjaycsXG4gICAgICAgICAgICBuZWdhdGl2ZUNvbG9yOiAnI2I2MDAwMCdcbiAgICAgICAgfSxcbiAgICAgICAgZGVjaXNpb246IHtcbiAgICAgICAgICAgIGZpbGw6ICcjZmY3Nzc3JyxcbiAgICAgICAgICAgIHN0cm9rZTogJyM2NjAwMDAnLFxuXG4gICAgICAgICAgICBzZWxlY3RlZDoge1xuICAgICAgICAgICAgICAgIGZpbGw6ICcjYWEzMzMzJyxcbiAgICAgICAgICAgICAgICAvLyBzdHJva2U6ICcjNjY2NjAwJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjaGFuY2U6IHtcbiAgICAgICAgICAgIGZpbGw6ICcjZmZmZjQ0JyxcbiAgICAgICAgICAgIHN0cm9rZTogJyM2NjY2MDAnLFxuXG4gICAgICAgICAgICBzZWxlY3RlZDoge1xuICAgICAgICAgICAgICAgIGZpbGw6ICcjYWFhYTAwJyxcbiAgICAgICAgICAgICAgICAvLyBzdHJva2U6ICcjNjY2NjAwJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB0ZXJtaW5hbDp7XG4gICAgICAgICAgICBmaWxsOiAnIzQ0ZmY0NCcsXG4gICAgICAgICAgICBzdHJva2U6ICdibGFjaycsXG4gICAgICAgICAgICBzZWxlY3RlZDoge1xuICAgICAgICAgICAgICAgIGZpbGw6ICcjMDBhYTAwJyxcbiAgICAgICAgICAgICAgICAvLyBzdHJva2U6ICdibGFjaydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwYXlvZmY6IHtcbiAgICAgICAgICAgICAgICBmb250U2l6ZTogJzFlbScsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaycsXG4gICAgICAgICAgICAgICAgbmVnYXRpdmVDb2xvcjogJyNiNjAwMDAnXG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgfTtcbiAgICBlZGdlPXtcbiAgICAgICAgc3Ryb2tlOiAnIzQyNDI0MicsXG4gICAgICAgIHN0cm9rZVdpZHRoOiAnMS41JyxcbiAgICAgICAgb3B0aW1hbDp7XG4gICAgICAgICAgICBzdHJva2U6ICcjMDA2ZjAwJyxcbiAgICAgICAgICAgIHN0cm9rZVdpZHRoOiAnMi40JyxcbiAgICAgICAgfSxcbiAgICAgICAgc2VsZWN0ZWQ6e1xuICAgICAgICAgICAgc3Ryb2tlOiAnIzA0NWFkMScsXG4gICAgICAgICAgICBzdHJva2VXaWR0aDogJzMuNScsXG4gICAgICAgIH0sXG4gICAgICAgIGxhYmVsOiB7XG4gICAgICAgICAgICBmb250U2l6ZTogJzFlbScsXG4gICAgICAgICAgICBjb2xvcjogJ2JhY2snXG4gICAgICAgIH0sXG4gICAgICAgIHBheW9mZjp7XG4gICAgICAgICAgICBmb250U2l6ZTogJzFlbScsXG4gICAgICAgICAgICBjb2xvcjogJ2JsYWNrJyxcbiAgICAgICAgICAgIG5lZ2F0aXZlQ29sb3I6ICcjYjYwMDAwJ1xuICAgICAgICB9XG5cbiAgICB9O1xuICAgIHByb2JhYmlsaXR5ID0ge1xuICAgICAgICBmb250U2l6ZTogJzFlbScsXG4gICAgICAgIGNvbG9yOiAnIzAwMDBkNydcbiAgICB9O1xuICAgIHRpdGxlID0ge1xuICAgICAgICBmb250U2l6ZTogJzE2cHgnLFxuICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXG4gICAgICAgIGZvbnRTdHlsZTogJ25vcm1hbCcsXG4gICAgICAgIGNvbG9yOiAnIzAwMDAwMCcsXG4gICAgICAgIG1hcmdpbjp7XG4gICAgICAgICAgICB0b3A6IDE1LFxuICAgICAgICAgICAgYm90dG9tOiAxMFxuICAgICAgICB9XG4gICAgfTtcbiAgICBkZXNjcmlwdGlvbiA9IHtcbiAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgZm9udFNpemU6ICcxMnB4JyxcbiAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxuICAgICAgICBmb250U3R5bGU6ICdub3JtYWwnLFxuICAgICAgICBjb2xvcjogJyMwMDAwMDAnLFxuICAgICAgICBtYXJnaW46e1xuICAgICAgICAgICAgdG9wOiA1LFxuICAgICAgICAgICAgYm90dG9tOiAxMFxuICAgICAgICB9XG4gICAgfTtcblxuICAgIHJlYWRPbmx5PSBmYWxzZTtcbiAgICBkaXNhYmxlQW5pbWF0aW9ucz1mYWxzZTtcbiAgICBmb3JjZUZ1bGxFZGdlUmVkcmF3PWZhbHNlO1xuICAgIGhpZGVMYWJlbHM9ZmFsc2U7XG4gICAgaGlkZVBheW9mZnM9ZmFsc2U7XG4gICAgaGlkZVByb2JhYmlsaXRpZXM9ZmFsc2U7XG4gICAgcmF3PWZhbHNlO1xuXG5cbiAgICBwYXlvZmZOdW1iZXJGb3JtYXR0ZXIgPSAodiwgaSk9PiB2O1xuICAgIHByb2JhYmlsaXR5TnVtYmVyRm9ybWF0dGVyICA9ICh2KT0+IHY7XG5cbiAgICBvbk5vZGVTZWxlY3RlZCA9IChub2RlKSA9PiB7fTtcbiAgICBvbkVkZ2VTZWxlY3RlZCA9IChlZGdlKSA9PiB7fTtcbiAgICBvblRleHRTZWxlY3RlZCA9ICh0ZXh0KSA9PiB7fTtcbiAgICBvblNlbGVjdGlvbkNsZWFyZWQgPSAoKSA9PiB7fTtcblxuICAgIG9wZXJhdGlvbnNGb3JPYmplY3QgPSAobykgPT4gW107XG5cbiAgICBwYXlvZmZOYW1lcyA9IFtudWxsLCBudWxsXTtcbiAgICBtYXhQYXlvZmZzVG9EaXNwbGF5ID0gMTtcblxuICAgIGNvbnN0cnVjdG9yKGN1c3RvbSkge1xuICAgICAgICBpZiAoY3VzdG9tKSB7XG4gICAgICAgICAgICBVdGlscy5kZWVwRXh0ZW5kKHRoaXMsIGN1c3RvbSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIFRyZWVEZXNpZ25lciB7XG5cbiAgICBjb25maWc7XG4gICAgY29udGFpbmVyO1xuICAgIGRhdGE7IC8vZGF0YSBtb2RlbCBtYW5hZ2VyXG4gICAgc3ZnO1xuXG4gICAgY29uc3RydWN0b3IoY29udGFpbmVyLCBkYXRhTW9kZWwsIGNvbmZpZyl7XG4gICAgICAgIHRoaXMuc2V0Q29uZmlnKGNvbmZpZyk7XG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGFNb2RlbDtcbiAgICAgICAgdGhpcy5pbml0Q29udGFpbmVyKGNvbnRhaW5lcik7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cblxuICAgIHNldENvbmZpZyhjb25maWcpIHtcbiAgICAgICAgdGhpcy5jb25maWcgPSBuZXcgVHJlZURlc2lnbmVyQ29uZmlnKGNvbmZpZyk7XG4gICAgICAgIGlmKHRoaXMubGF5b3V0KXtcbiAgICAgICAgICAgIHRoaXMubGF5b3V0LmNvbmZpZz10aGlzLmNvbmZpZy5sYXlvdXQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGRhdGVDdXN0b21TdHlsZXMoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgaW5pdCgpe1xuXG4gICAgICAgIHRoaXMuaW5pdFN2ZygpO1xuICAgICAgICB0aGlzLmluaXRMYXlvdXQoKTtcbiAgICAgICAgdGhpcy5pbml0STE4bigpO1xuICAgICAgICB0aGlzLmluaXRCcnVzaCgpO1xuICAgICAgICB0aGlzLmluaXRFZGdlTWFya2VycygpO1xuXG4gICAgICAgIHRoaXMudXBkYXRlQ3VzdG9tU3R5bGVzKCk7XG4gICAgICAgIGlmKCF0aGlzLmNvbmZpZy5yZWFkT25seSl7XG4gICAgICAgICAgICB0aGlzLmluaXRNYWluQ29udGV4dE1lbnUoKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdE5vZGVDb250ZXh0TWVudSgpO1xuICAgICAgICAgICAgdGhpcy5pbml0RWRnZUNvbnRleHRNZW51KCk7XG4gICAgICAgICAgICB0aGlzLmluaXROb2RlRHJhZ0hhbmRsZXIoKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdFRleHREcmFnSGFuZGxlcigpO1xuICAgICAgICAgICAgdGhpcy5pbml0VGV4dENvbnRleHRNZW51KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZWRyYXcoKTtcbiAgICB9XG5cbiAgICBpbml0STE4bigpIHtcbiAgICAgICAgaTE4bi5pbml0KHRoaXMuY29uZmlnLmxuZyk7XG4gICAgfVxuXG5cbiAgICB1cGRhdGVDdXN0b21TdHlsZXMoKXtcbiAgICAgICAgZDMuc2VsZWN0KCdoZWFkJykuc2VsZWN0T3JBcHBlbmQoJ3N0eWxlI3NkLXRyZWUtZGVzaWduZXItc3R5bGUnKS5odG1sKFRlbXBsYXRlcy5nZXQoJ3RyZWVEZXNpZ25lclN0eWxlcycsIHRoaXMuY29uZmlnKSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGluaXRMYXlvdXQoKXtcbiAgICAgICAgdGhpcy5sYXlvdXQgPSBuZXcgTGF5b3V0KHRoaXMsIHRoaXMuZGF0YSwgdGhpcy5jb25maWcubGF5b3V0KTtcbiAgICB9XG5cbiAgICBpbml0Tm9kZURyYWdIYW5kbGVyKCl7XG4gICAgICAgIHRoaXMubm9kZURyYWdIYW5kbGVyID0gbmV3IE5vZGVEcmFnSGFuZGxlcih0aGlzLCB0aGlzLmRhdGEpO1xuICAgIH1cblxuICAgIGluaXRUZXh0RHJhZ0hhbmRsZXIoKXtcbiAgICAgICAgdGhpcy50ZXh0RHJhZ0hhbmRsZXIgPSBuZXcgVGV4dERyYWdIYW5kbGVyKHRoaXMsIHRoaXMuZGF0YSk7XG4gICAgfVxuXG4gICAgcmVkcmF3KHdpdGhUcmFuc2l0aW9ucz1mYWxzZSl7XG5cbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB3aXRoVHJhbnNpdGlvbnMgPSAhc2VsZi5jb25maWcuZGlzYWJsZUFuaW1hdGlvbnMgJiYgd2l0aFRyYW5zaXRpb25zO1xuICAgICAgICB0aGlzLnJlZHJhd0RpYWdyYW1UaXRsZSgpO1xuICAgICAgICB0aGlzLnJlZHJhd0RpYWdyYW1EZXNjcmlwdGlvbigpO1xuICAgICAgICB0aGlzLnVwZGF0ZVNjYWxlKHdpdGhUcmFuc2l0aW9ucyk7XG4gICAgICAgIHRoaXMudXBkYXRlTWFyZ2luKHdpdGhUcmFuc2l0aW9ucyk7XG4gICAgICAgIGlmKHdpdGhUcmFuc2l0aW9ucyl7XG4gICAgICAgICAgICBzZWxmLnRyYW5zaXRpb25QcmV2ID0gc2VsZi50cmFuc2l0aW9uO1xuICAgICAgICAgICAgc2VsZi50cmFuc2l0aW9uID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlZHJhd05vZGVzKCk7XG4gICAgICAgIHRoaXMucmVkcmF3RWRnZXMoKTtcbiAgICAgICAgdGhpcy5yZWRyYXdGbG9hdGluZ1RleHRzKCk7XG4gICAgICAgIHRoaXMudXBkYXRlVmFsaWRhdGlvbk1lc3NhZ2VzKCk7XG4gICAgICAgIGlmKHdpdGhUcmFuc2l0aW9ucyl7XG4gICAgICAgICAgICBzZWxmLnRyYW5zaXRpb24gPSAgc2VsZi50cmFuc2l0aW9uUHJldjtcbiAgICAgICAgfVxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBzZWxmLnVwZGF0ZVBsb3R0aW5nUmVnaW9uU2l6ZSgpO1xuICAgICAgICB9LDEwKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBjb21wdXRlQXZhaWxhYmxlU3BhY2UoKXtcbiAgICAgICAgdGhpcy5hdmFpbGFibGVIZWlnaHQgPSBBcHBVdGlscy5zYW5pdGl6ZUhlaWdodCh0aGlzLmNvbmZpZy5oZWlnaHQsIHRoaXMuY29udGFpbmVyLCB0aGlzLmNvbmZpZy5tYXJnaW4pO1xuICAgICAgICB0aGlzLmF2YWlsYWJsZVdpZHRoID0gQXBwVXRpbHMuc2FuaXRpemVXaWR0aCh0aGlzLmNvbmZpZy53aWR0aCwgdGhpcy5jb250YWluZXIsIHRoaXMuY29uZmlnLm1hcmdpbik7XG4gICAgfVxuXG4gICAgaW5pdFN2ZygpIHtcbiAgICAgICAgdmFyIGMgPSB0aGlzO1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuY29tcHV0ZUF2YWlsYWJsZVNwYWNlKCk7XG4gICAgICAgIHRoaXMuc3ZnID0gdGhpcy5jb250YWluZXIuc2VsZWN0T3JBcHBlbmQoJ3N2Zy5zZC10cmVlLWRlc2lnbmVyJyk7XG4gICAgICAgIHRoaXMuc3ZnLmF0dHIoJ3dpZHRoJywgdGhpcy5hdmFpbGFibGVXaWR0aCkuYXR0cignaGVpZ2h0JywgdGhpcy5hdmFpbGFibGVIZWlnaHQpO1xuXG4gICAgICAgIHRoaXMud3JhcHBlckdyb3VwID0gdGhpcy5zdmcuc2VsZWN0T3JBcHBlbmQoJ2cuc2Qtd3JhcHBlci1ncm91cCcpO1xuICAgICAgICB0aGlzLm1haW5Hcm91cCA9IHRoaXMud3JhcHBlckdyb3VwLnNlbGVjdE9yQXBwZW5kKCdnLm1haW4tZ3JvdXAnKTtcbiAgICAgICAgdGhpcy51cGRhdGVTY2FsZSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZU1hcmdpbigpO1xuXG5cbiAgICAgICAgaWYgKCF0aGlzLmNvbmZpZy53aWR0aCkge1xuICAgICAgICAgICAgZDMuc2VsZWN0KHdpbmRvdylcbiAgICAgICAgICAgICAgICAub24oXCJyZXNpemUudHJlZS1kZXNpZ25lclwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYudXBkYXRlUGxvdHRpbmdSZWdpb25TaXplKCk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYucmVkcmF3RGlhZ3JhbVRpdGxlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbWMgPSBuZXcgSGFtbWVyLk1hbmFnZXIodGhpcy5zdmcubm9kZSgpLCB7dG91Y2hBY3Rpb24gOiAnYXV0byd9KTtcbiAgICAgICAgbWMuYWRkKG5ldyBIYW1tZXIuUHJlc3Moe1xuICAgICAgICAgICAgcG9pbnRlclR5cGU6ICd0b3VjaCdcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIG1jLmFkZChuZXcgSGFtbWVyLlBpbmNoKHtcbiAgICAgICAgICAgIHBvaW50ZXJUeXBlOiAndG91Y2gnXG4gICAgICAgIH0pKTtcblxuICAgICAgICB2YXIgY2FuY2VsO1xuICAgICAgICBtYy5vbigncGluY2hzdGFydCcsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBzZWxmLmRpc2FibGVCcnVzaCgpO1xuICAgICAgICB9KVxuICAgICAgICBtYy5vbigncGluY2gnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgY2FuY2VsID0gVXRpbHMud2FpdEZvckZpbmFsRXZlbnQoKCk9PnNlbGYuZW5hYmxlQnJ1c2goKSwgJ3BpbmNoZW5kJywgNTAwMClcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICB1cGRhdGVNYXJnaW4od2l0aFRyYW5zaXRpb25zKXtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgbWFyZ2luID0gdGhpcy5jb25maWcubWFyZ2luO1xuICAgICAgICB2YXIgZ3JvdXAgPSB0aGlzLm1haW5Hcm91cDtcbiAgICAgICAgaWYod2l0aFRyYW5zaXRpb25zKXtcbiAgICAgICAgICAgIGdyb3VwID0gZ3JvdXAudHJhbnNpdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50b3BNYXJnaW4gPSBtYXJnaW4udG9wO1xuICAgICAgICBpZih0aGlzLmRpYWdyYW1UaXRsZXx8dGhpcy5kaWFncmFtRGVzY3JpcHRpb24pe1xuICAgICAgICAgICAgdGhpcy50b3BNYXJnaW4gPSBwYXJzZUludCh0aGlzLmRpYWdyYW1UaXRsZSA/IHRoaXMuY29uZmlnLnRpdGxlLm1hcmdpbi50b3AgOiAwKSArIHRoaXMuZ2V0VGl0bGVHcm91cEhlaWdodCgpXG4gICAgICAgICAgICAgICAgKyAgTWF0aC5tYXgodGhpcy50b3BNYXJnaW4sIHBhcnNlSW50KHRoaXMuY29uZmlnLnRpdGxlLm1hcmdpbi5ib3R0b20pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdyb3VwLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoXCIgKyBtYXJnaW4ubGVmdCArIFwiLFwiICsgdGhpcy50b3BNYXJnaW4gKyBcIilcIikub24oXCJlbmRcIiwgKCk9PiBzZWxmLnVwZGF0ZVBsb3R0aW5nUmVnaW9uU2l6ZSgpKTtcbiAgICB9XG5cbiAgICBzZXRNYXJnaW4obWFyZ2luLCB3aXRob3V0U3RhdGVTYXZpbmcpe1xuICAgICAgICB2YXIgc2VsZj10aGlzO1xuICAgICAgICBpZighd2l0aG91dFN0YXRlU2F2aW5nKXtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoe1xuICAgICAgICAgICAgICAgIGRhdGE6e1xuICAgICAgICAgICAgICAgICAgICBtYXJnaW46IFV0aWxzLmNsb25lKHNlbGYuY29uZmlnLm1hcmdpbilcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uVW5kbzogKGRhdGEpPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldE1hcmdpbihkYXRhLm1hcmdpbiwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvblJlZG86IChkYXRhKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRNYXJnaW4obWFyZ2luLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBVdGlscy5kZWVwRXh0ZW5kKHRoaXMuY29uZmlnLm1hcmdpbiwgbWFyZ2luKTtcbiAgICAgICAgdGhpcy5yZWRyYXdEaWFncmFtVGl0bGUoKTtcbiAgICAgICAgdGhpcy51cGRhdGVNYXJnaW4odHJ1ZSk7XG4gICAgfVxuXG5cbiAgICB1cGRhdGVTY2FsZSh3aXRoVHJhbnNpdGlvbnMpe1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBzY2FsZSA9IHRoaXMuY29uZmlnLnNjYWxlO1xuICAgICAgICB2YXIgZ3JvdXAgPSB0aGlzLndyYXBwZXJHcm91cDtcbiAgICAgICAgaWYod2l0aFRyYW5zaXRpb25zKXtcbiAgICAgICAgICAgIGdyb3VwID0gZ3JvdXAudHJhbnNpdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ3JvdXAuYXR0cihcInRyYW5zZm9ybVwiLCBcInNjYWxlKFwiICsgc2NhbGUgKyBcIilcIikub24oXCJlbmRcIiwgKCk9PiBzZWxmLnVwZGF0ZVBsb3R0aW5nUmVnaW9uU2l6ZSgpKTtcbiAgICB9XG5cbiAgICBzZXRTY2FsZShzY2FsZSwgd2l0aG91dFN0YXRlU2F2aW5nKXtcbiAgICAgICAgdmFyIHNlbGY9dGhpcztcbiAgICAgICAgaWYoIXdpdGhvdXRTdGF0ZVNhdmluZyl7XG4gICAgICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKHtcbiAgICAgICAgICAgICAgICBkYXRhOntcbiAgICAgICAgICAgICAgICAgICAgc2NhbGU6IFV0aWxzLmNsb25lKHNlbGYuY29uZmlnLnNjYWxlKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25VbmRvOiAoZGF0YSk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0U2NhbGUoZGF0YS5zY2FsZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvblJlZG86IChkYXRhKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRTY2FsZShzY2FsZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb25maWcuc2NhbGUgPSBzY2FsZTtcbiAgICAgICAgdGhpcy51cGRhdGVTY2FsZSh0cnVlKTtcbiAgICB9XG5cbiAgICBpbml0Q29udGFpbmVyKGNvbnRhaW5lcklkT3JFbGVtKSB7XG4gICAgICAgIGlmIChVdGlscy5pc1N0cmluZyhjb250YWluZXJJZE9yRWxlbSkpIHtcbiAgICAgICAgICAgIHZhciBzZWxlY3RvciA9IGNvbnRhaW5lcklkT3JFbGVtLnRyaW0oKTtcblxuICAgICAgICAgICAgaWYgKCFVdGlscy5zdGFydHNXaXRoKHNlbGVjdG9yLCAnIycpICYmICFVdGlscy5zdGFydHNXaXRoKHNlbGVjdG9yLCAnLicpKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3IgPSAnIycgKyBzZWxlY3RvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyID0gZDMuc2VsZWN0KHNlbGVjdG9yKTtcbiAgICAgICAgfSBlbHNlIGlmKGNvbnRhaW5lcklkT3JFbGVtLl9wYXJlbnRzKXtcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVySWRPckVsZW1cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGQzLnNlbGVjdChjb250YWluZXJJZE9yRWxlbSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVQbG90dGluZ1JlZ2lvblNpemUoKSB7XG4gICAgICAgIHZhciBjaGFuZ2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY29tcHV0ZUF2YWlsYWJsZVNwYWNlKCk7XG4gICAgICAgIHZhciBtYXJnaW4gPSB0aGlzLmNvbmZpZy5tYXJnaW47XG4gICAgICAgIHZhciBzdmdXaWR0aCA9IHRoaXMuc3ZnLmF0dHIoJ3dpZHRoJyk7XG4gICAgICAgIHZhciBzdmdIZWlnaHQgPSB0aGlzLnN2Zy5hdHRyKCdoZWlnaHQnKTtcbiAgICAgICAgdmFyIG1haW5Hcm91cEJveCA9IHRoaXMubWFpbkdyb3VwLm5vZGUoKS5nZXRCQm94KCk7XG4gICAgICAgIGxldCBib3hXaWR0aCA9IG1haW5Hcm91cEJveC53aWR0aDtcbiAgICAgICAgdmFyIG5ld1N2Z1dpZHRoID0gYm94V2lkdGgrbWFpbkdyb3VwQm94LngrbWFyZ2luLmxlZnQrbWFyZ2luLnJpZ2h0O1xuICAgICAgICBuZXdTdmdXaWR0aCAgKj0gdGhpcy5jb25maWcuc2NhbGU7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmNsYXNzZWQoJ3dpdGgtb3ZlcmZsb3cteCcsIG5ld1N2Z1dpZHRoPj10aGlzLmF2YWlsYWJsZVdpZHRoKTtcbiAgICAgICAgbmV3U3ZnV2lkdGggPSBNYXRoLm1heChuZXdTdmdXaWR0aCwgdGhpcy5hdmFpbGFibGVXaWR0aCk7XG4gICAgICAgIGlmKHN2Z1dpZHRoIT1uZXdTdmdXaWR0aCl7XG4gICAgICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc3ZnLmF0dHIoJ3dpZHRoJywgbmV3U3ZnV2lkdGgpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBib3hIZWlnaHQgPSBtYWluR3JvdXBCb3guaGVpZ2h0O1xuICAgICAgICB2YXIgbmV3U3ZnSGVpZ2h0ID0gYm94SGVpZ2h0K21haW5Hcm91cEJveC55K3RoaXMudG9wTWFyZ2luK21hcmdpbi5ib3R0b207XG4gICAgICAgIG5ld1N2Z0hlaWdodCAqPSB0aGlzLmNvbmZpZy5zY2FsZTtcbiAgICAgICAgdGhpcy5jb250YWluZXIuY2xhc3NlZCgnd2l0aC1vdmVyZmxvdy15JywgbmV3U3ZnSGVpZ2h0Pj10aGlzLmF2YWlsYWJsZUhlaWdodCk7XG4gICAgICAgIG5ld1N2Z0hlaWdodCA9IE1hdGgubWF4KG5ld1N2Z0hlaWdodCwgdGhpcy5hdmFpbGFibGVIZWlnaHQpO1xuICAgICAgICBpZihzdmdIZWlnaHQhPW5ld1N2Z0hlaWdodCl7XG4gICAgICAgICAgICBjaGFuZ2VkPXRydWU7XG4gICAgICAgICAgICB0aGlzLnN2Zy5hdHRyKCdoZWlnaHQnLCBuZXdTdmdIZWlnaHQpO1xuICAgICAgICB9XG4gICAgICAgIGlmKGNoYW5nZWQpe1xuICAgICAgICAgICAgdGhpcy51cGRhdGVCcnVzaEV4dGVudCgpXG4gICAgICAgIH1cblxuXG4gICAgfVxuXG4gICAgcmVkcmF3Tm9kZXMoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuXG4gICAgICAgIHZhciBub2Rlc0NvbnRhaW5lciA9IHRoaXMubWFpbkdyb3VwLnNlbGVjdE9yQXBwZW5kKCdnLm5vZGVzJyk7XG4gICAgICAgIHZhciBub2RlcyA9IG5vZGVzQ29udGFpbmVyLnNlbGVjdEFsbCgnLm5vZGUnKS5kYXRhKHRoaXMuZGF0YS5ub2Rlcy5maWx0ZXIoZD0+IWQuJGhpZGRlbiksIChkLGkpPT4gZC4kaWQpO1xuICAgICAgICBub2Rlcy5leGl0KCkucmVtb3ZlKCk7XG4gICAgICAgIHZhciBub2Rlc0VudGVyID0gbm9kZXMuZW50ZXIoKS5hcHBlbmQoJ2cnKVxuICAgICAgICAgICAgLmF0dHIoJ2lkJywgZD0+J25vZGUtJytkLiRpZClcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGQ9PmQudHlwZSsnLW5vZGUgbm9kZScpXG4gICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgZD0+J3RyYW5zbGF0ZSgnICsgZC5sb2NhdGlvbi54ICsgJyAgJyArIGQubG9jYXRpb24ueSArICcpJyk7XG4gICAgICAgIG5vZGVzRW50ZXIuYXBwZW5kKCdwYXRoJyk7XG5cbiAgICAgICAgdmFyIGxhYmVsRW50ZXIgPSBub2Rlc0VudGVyLmFwcGVuZCgndGV4dCcpLmF0dHIoJ2NsYXNzJywgJ2xhYmVsJyk7XG4gICAgICAgIHZhciBwYXlvZmZFbnRlciA9IG5vZGVzRW50ZXIuYXBwZW5kKCd0ZXh0JykuYXR0cignY2xhc3MnLCAncGF5b2ZmIGNvbXB1dGVkJyk7XG4gICAgICAgIHZhciBpbmRpY2F0b3JFbnRlciA9IG5vZGVzRW50ZXIuYXBwZW5kKCd0ZXh0JykuYXR0cignY2xhc3MnLCAnZXJyb3ItaW5kaWNhdG9yJykudGV4dCgnISEnKTtcbiAgICAgICAgdmFyIGFnZ3JlZ2F0ZWRQYXlvZmZFbnRlciA9IG5vZGVzRW50ZXIuYXBwZW5kKCd0ZXh0JykuYXR0cignY2xhc3MnLCAnYWdncmVnYXRlZC1wYXlvZmYnKTtcbiAgICAgICAgdmFyIHByb2JhYmlsaXR5VG9FbnRlckVudGVyID0gbm9kZXNFbnRlci5hcHBlbmQoJ3RleHQnKS5hdHRyKCdjbGFzcycsICdwcm9iYWJpbGl0eS10by1lbnRlcicpO1xuXG4gICAgICAgIHZhciBub2Rlc01lcmdlID0gbm9kZXNFbnRlci5tZXJnZShub2Rlcyk7XG4gICAgICAgIG5vZGVzTWVyZ2UuY2xhc3NlZCgnb3B0aW1hbCcsIChkKT0+c2VsZi5pc09wdGltYWwoZCkpO1xuXG4gICAgICAgIHZhciBub2Rlc01lcmdlVCA9IG5vZGVzTWVyZ2U7XG4gICAgICAgIGlmKHRoaXMudHJhbnNpdGlvbil7XG4gICAgICAgICAgICBub2Rlc01lcmdlVCA9IG5vZGVzTWVyZ2UudHJhbnNpdGlvbigpO1xuICAgICAgICAgICAgbm9kZXNNZXJnZVQub24oJ2VuZCcsICgpPT4gc2VsZi51cGRhdGVQbG90dGluZ1JlZ2lvblNpemUoKSlcbiAgICAgICAgfVxuICAgICAgICBub2Rlc01lcmdlVFxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGQ9Pid0cmFuc2xhdGUoJyArIGQubG9jYXRpb24ueCArICcgICcgKyBkLmxvY2F0aW9uLnkgKyAnKScpXG5cbiAgICAgICAgdmFyIHBhdGggPSBub2Rlc01lcmdlLnNlbGVjdCgncGF0aCcpO1xuICAgICAgICB0aGlzLmxheW91dC5kcmF3Tm9kZVN5bWJvbChwYXRoLHRoaXMudHJhbnNpdGlvbik7XG5cbiAgICAgICAgLypwYXRoXG4gICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCBkPT4ge1xuICAgICAgICAgICAgICAgIC8vIGlmKHNlbGYuaXNOb2RlU2VsZWN0ZWQoZCkpe1xuICAgICAgICAgICAgICAgIC8vICAgICByZXR1cm4gc2VsZi5jb25maWcubm9kZVtkLnR5cGVdLnNlbGVjdGVkLmZpbGxcbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYuY29uZmlnLm5vZGVbZC50eXBlXS5maWxsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0eWxlKCdzdHJva2UnLCBkPT4gc2VsZi5jb25maWcubm9kZVtkLnR5cGVdLnN0cm9rZSlcbiAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlLXdpZHRoJywgZD0+IHtcbiAgICAgICAgICAgICAgICBpZihzZWxmLmNvbmZpZy5ub2RlW2QudHlwZV0uc3Ryb2tlV2lkdGghPT11bmRlZmluZWQpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5jb25maWcubm9kZVtkLnR5cGVdLnN0cm9rZVdpZHRoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5jb25maWcubm9kZS5zdHJva2VXaWR0aDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAqL1xuICAgICAgICB0aGlzLmxheW91dC5ub2RlTGFiZWxQb3NpdGlvbihsYWJlbEVudGVyKTtcbiAgICAgICAgdmFyIGxhYmVsTWVyZ2UgPSBub2Rlc01lcmdlLnNlbGVjdCgndGV4dC5sYWJlbCcpO1xuICAgICAgICBsYWJlbE1lcmdlLmNsYXNzZWQoJ3NkLWhpZGRlbicsIHRoaXMuY29uZmlnLmhpZGVMYWJlbHMpO1xuICAgICAgICB2YXIgbGFiZWxNZXJnZVQgPSBub2Rlc01lcmdlVC5zZWxlY3QoJ3RleHQubGFiZWwnKTtcbiAgICAgICAgbGFiZWxNZXJnZVQuZWFjaCh0aGlzLnVwZGF0ZVRleHRMaW5lcyk7XG4gICAgICAgIHRoaXMubGF5b3V0Lm5vZGVMYWJlbFBvc2l0aW9uKGxhYmVsTWVyZ2VUKVxuICAgICAgICAgICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXG5cbiAgICAgICAgdmFyIHBheW9mZiA9IG5vZGVzTWVyZ2Uuc2VsZWN0KCd0ZXh0LnBheW9mZicpO1xuXG4gICAgICAgIHZhciBwYXlvZmZUc3BhbnMgPSBwYXlvZmYuc2VsZWN0QWxsKCd0c3BhbicpLmRhdGEoZD0+e1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSBkLmRpc3BsYXlWYWx1ZSgnY2hpbGRyZW5QYXlvZmYnKTtcbiAgICAgICAgICAgIHJldHVybiBVdGlscy5pc0FycmF5KGl0ZW0pID8gaXRlbS5maWx0ZXIoaT0+aSAhPT0gdW5kZWZpbmVkKSA6IFtpdGVtXVxuICAgICAgICB9KTtcbiAgICAgICAgcGF5b2ZmVHNwYW5zLmV4aXQoKS5yZW1vdmUoKTtcblxuICAgICAgICB2YXIgcGF5b2ZmVHNwYW5zTSA9IHBheW9mZlRzcGFucy5lbnRlcigpLmFwcGVuZCgndHNwYW4nKS5tZXJnZShwYXlvZmZUc3BhbnMpO1xuICAgICAgICBwYXlvZmZUc3BhbnNNXG4gICAgICAgICAgICAvLyAuYXR0cignZG9taW5hbnQtYmFzZWxpbmUnLCAnaGFuZ2luZycpXG4gICAgICAgICAgICAuYXR0cignZHknLCAoZCxpKT0+aT4wID8gJzEuMWVtJzogdW5kZWZpbmVkKVxuICAgICAgICAgICAgLmF0dHIoJ3gnLCAnMCcpXG4gICAgICAgICAgICAuY2xhc3NlZCgnbmVnYXRpdmUnLCBkPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBkIT09bnVsbCAmJiBkPDA7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNsYXNzZWQoJ3NkLWhpZGRlbicsIHRoaXMuY29uZmlnLmhpZGVQYXlvZmZzIHx8IHRoaXMuY29uZmlnLnJhdylcbiAgICAgICAgICAgIC50ZXh0KChkLCBpKT0+IHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsID0gZFxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbCE9PW51bGwgPyAoaXNOYU4odmFsKSA/IHZhbCA6IHNlbGYuY29uZmlnLnBheW9mZk51bWJlckZvcm1hdHRlcih2YWwsIGkpKTogJydcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB0aGlzLmF0dGFjaFBheW9mZlRvb2x0aXAocGF5b2ZmVHNwYW5zTSk7XG5cblxuICAgICAgICB2YXIgcGF5b2ZmVCA9IHBheW9mZjtcbiAgICAgICAgaWYodGhpcy50cmFuc2l0aW9uKXtcbiAgICAgICAgICAgIHBheW9mZlQgPSBwYXlvZmYudHJhbnNpdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sYXlvdXQubm9kZVBheW9mZlBvc2l0aW9uKHBheW9mZkVudGVyKTtcbiAgICAgICAgdGhpcy5sYXlvdXQubm9kZVBheW9mZlBvc2l0aW9uKHBheW9mZlQpO1xuXG4gICAgICAgIHZhciBhZ2dyZWdhdGVkUGF5b2ZmID0gbm9kZXNNZXJnZS5zZWxlY3QoJ3RleHQuYWdncmVnYXRlZC1wYXlvZmYnKTtcbiAgICAgICAgdmFyIGFnZ3JlZ2F0ZWRQYXlvZmZUc3BhbnMgPSBhZ2dyZWdhdGVkUGF5b2ZmLnNlbGVjdEFsbCgndHNwYW4nKS5kYXRhKGQ9PntcbiAgICAgICAgICAgIGxldCBpdGVtID0gZC5kaXNwbGF5VmFsdWUoJ2FnZ3JlZ2F0ZWRQYXlvZmYnKTtcbiAgICAgICAgICAgIHJldHVybiBVdGlscy5pc0FycmF5KGl0ZW0pID8gaXRlbS5maWx0ZXIoaT0+aSAhPT0gdW5kZWZpbmVkKSA6IFtpdGVtXVxuICAgICAgICB9KTtcbiAgICAgICAgYWdncmVnYXRlZFBheW9mZlRzcGFucy5leGl0KCkucmVtb3ZlKCk7XG4gICAgICAgIHZhciBhZ2dyZWdhdGVkUGF5b2ZmVHNwYW5zTSA9IGFnZ3JlZ2F0ZWRQYXlvZmZUc3BhbnMuZW50ZXIoKS5hcHBlbmQoJ3RzcGFuJykubWVyZ2UoYWdncmVnYXRlZFBheW9mZlRzcGFucylcbiAgICAgICAgICAgIC5hdHRyKCdkeScsIChkLGkpPT5pPjAgPyAnMC45NWVtJzogdW5kZWZpbmVkKVxuICAgICAgICAgICAgLmNsYXNzZWQoJ25lZ2F0aXZlJywgZD0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZCE9PW51bGwgJiYgZDwwO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jbGFzc2VkKCdzZC1oaWRkZW4nLCB0aGlzLmNvbmZpZy5oaWRlUGF5b2ZmcyB8fCB0aGlzLmNvbmZpZy5yYXcpXG4gICAgICAgICAgICAudGV4dCgodmFsLCBpKT0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsIT09bnVsbCA/IChpc05hTih2YWwpID8gdmFsIDogc2VsZi5jb25maWcucGF5b2ZmTnVtYmVyRm9ybWF0dGVyKHZhbCwgaSkpOiAnJ1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5hdHRhY2hQYXlvZmZUb29sdGlwKGFnZ3JlZ2F0ZWRQYXlvZmZUc3BhbnNNLCAnYWdncmVnYXRlZFBheW9mZicpO1xuXG4gICAgICAgIHZhciBhZ2dyZWdhdGVkUGF5b2ZmVCA9IGFnZ3JlZ2F0ZWRQYXlvZmY7XG4gICAgICAgIGlmKHRoaXMudHJhbnNpdGlvbil7XG4gICAgICAgICAgICBhZ2dyZWdhdGVkUGF5b2ZmVCA9IGFnZ3JlZ2F0ZWRQYXlvZmYudHJhbnNpdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sYXlvdXQubm9kZUFnZ3JlZ2F0ZWRQYXlvZmZQb3NpdGlvbihhZ2dyZWdhdGVkUGF5b2ZmRW50ZXIpO1xuICAgICAgICB0aGlzLmxheW91dC5ub2RlQWdncmVnYXRlZFBheW9mZlBvc2l0aW9uKGFnZ3JlZ2F0ZWRQYXlvZmZUKTtcblxuICAgICAgICB2YXIgcHJvYmFiaWxpdHlUb0VudGVyID0gbm9kZXNNZXJnZS5zZWxlY3QoJ3RleHQucHJvYmFiaWxpdHktdG8tZW50ZXInKVxuICAgICAgICAgICAgLnRleHQoZD0+e1xuICAgICAgICAgICAgICAgIHZhciB2YWwgPSBkLmRpc3BsYXlWYWx1ZSgncHJvYmFiaWxpdHlUb0VudGVyJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbCE9PW51bGwgPyAoaXNOYU4odmFsKSA/IHZhbCA6IHNlbGYuY29uZmlnLnByb2JhYmlsaXR5TnVtYmVyRm9ybWF0dGVyKHZhbCkpOiAnJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jbGFzc2VkKCdzZC1oaWRkZW4nLCB0aGlzLmNvbmZpZy5oaWRlUHJvYmFiaWxpdGllcyB8fCB0aGlzLmNvbmZpZy5yYXcpO1xuICAgICAgICBUb29sdGlwLmF0dGFjaChwcm9iYWJpbGl0eVRvRW50ZXIsIGkxOG4udCgndG9vbHRpcC5ub2RlLnByb2JhYmlsaXR5VG9FbnRlcicpKTtcblxuXG4gICAgICAgIHZhciBwcm9iYWJpbGl0eVRvRW50ZXJUID0gcHJvYmFiaWxpdHlUb0VudGVyO1xuICAgICAgICBpZih0aGlzLnRyYW5zaXRpb24pe1xuICAgICAgICAgICAgcHJvYmFiaWxpdHlUb0VudGVyVCA9IHByb2JhYmlsaXR5VG9FbnRlci50cmFuc2l0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sYXlvdXQubm9kZVByb2JhYmlsaXR5VG9FbnRlclBvc2l0aW9uKHByb2JhYmlsaXR5VG9FbnRlckVudGVyKTtcbiAgICAgICAgdGhpcy5sYXlvdXQubm9kZVByb2JhYmlsaXR5VG9FbnRlclBvc2l0aW9uKHByb2JhYmlsaXR5VG9FbnRlclQpO1xuXG5cbiAgICAgICAgdmFyIGluZGljYXRvciA9IG5vZGVzTWVyZ2Uuc2VsZWN0KCd0ZXh0LmVycm9yLWluZGljYXRvcicpO1xuICAgICAgICBpbmRpY2F0b3IuY2xhc3NlZCgnc2QtaGlkZGVuJywgdGhpcy5jb25maWcucmF3KVxuICAgICAgICB0aGlzLmxheW91dC5ub2RlSW5kaWNhdG9yUG9zaXRpb24oaW5kaWNhdG9yRW50ZXIpO1xuICAgICAgICB0aGlzLmxheW91dC5ub2RlSW5kaWNhdG9yUG9zaXRpb24oaW5kaWNhdG9yKTtcblxuICAgICAgICBpZih0aGlzLm5vZGVEcmFnSGFuZGxlcil7XG4gICAgICAgICAgICBub2Rlc01lcmdlLmNhbGwodGhpcy5ub2RlRHJhZ0hhbmRsZXIuZHJhZyk7XG4gICAgICAgIH1cblxuICAgICAgICBub2Rlc01lcmdlLm9uKCdjb250ZXh0bWVudScsIHRoaXMubm9kZUNvbnRleHRNZW51KTtcbiAgICAgICAgbm9kZXNNZXJnZS5vbignZGJsY2xpY2snLCB0aGlzLm5vZGVDb250ZXh0TWVudSlcbiAgICAgICAgbm9kZXNNZXJnZS5lYWNoKGZ1bmN0aW9uKGQsIGkpe1xuICAgICAgICAgICAgdmFyIG5vZGVFbGVtID0gdGhpcztcbiAgICAgICAgICAgIHZhciBtYyA9IG5ldyBIYW1tZXIuTWFuYWdlcihub2RlRWxlbSk7XG4gICAgICAgICAgICBtYy5hZGQobmV3IEhhbW1lci5QcmVzcyh7XG4gICAgICAgICAgICAgICAgcG9pbnRlclR5cGU6ICd0b3VjaCdcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIG1jLm9uKCdwcmVzcycsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgICAgIGlmKGUucG9pbnRlclR5cGU9PSd0b3VjaCcpe1xuICAgICAgICAgICAgICAgICAgICBzZWxmLm5vZGVEcmFnSGFuZGxlci5jYW5jZWxEcmFnKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcblxuXG4gICAgICAgICAgICBpZihkLmZvbGRlZCl7XG4gICAgICAgICAgICAgICAgbGV0IGJ1dHRvbiA9IGQzLnNlbGVjdChub2RlRWxlbSkuc2VsZWN0T3JBcHBlbmQoJ3RleHQuc2QtdW5mb2xkLWJ1dHRvbicpXG4gICAgICAgICAgICAgICAgICAgIC50ZXh0KFwiWytdXCIpXG4gICAgICAgICAgICAgICAgICAgIC5vbignY2xpY2sgZGJjbGljayBtb3VzZWRvd24nLCAoKT0+c2VsZi5mb2xkU3VidHJlZShkLCBmYWxzZSkpOyAvL2ZpcmVmb3ggZGV0ZWN0cyBvbmx5IG1vdXNlZG93biBldmVudCAtIHJlbGF0ZWQgdG8gZHJhZyBoYW5kbGVyXG5cbiAgICAgICAgICAgICAgICBzZWxmLmxheW91dC5ub2RlVW5mb2xkQnV0dG9uUG9zaXRpb24oYnV0dG9uKTtcbiAgICAgICAgICAgICAgICBUb29sdGlwLmF0dGFjaChidXR0b24sIGkxOG4udCgnY29udGV4dE1lbnUubm9kZS51bmZvbGQnKSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBkMy5zZWxlY3Qobm9kZUVsZW0pLnNlbGVjdCgnLnNkLXVuZm9sZC1idXR0b24nKS5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGF0dGFjaFBheW9mZlRvb2x0aXAoc2VsZWN0aW9uLCBwYXlvZmZGaWxlZE5hbWUgPSAncGF5b2ZmJywgb2JqZWN0PSdub2RlJyl7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgVG9vbHRpcC5hdHRhY2goc2VsZWN0aW9uLCAoZCwgaSk9PntcbiAgICAgICAgICAgIGlmKHNlbGYuY29uZmlnLnBheW9mZk5hbWVzLmxlbmd0aD5pICYmIHNlbGYuY29uZmlnLnBheW9mZk5hbWVzW2ldICE9PSBudWxsKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTE4bi50KCd0b29sdGlwLicrb2JqZWN0KycuJytwYXlvZmZGaWxlZE5hbWUrJy5uYW1lZCcse3ZhbHVlOiBkLnBheW9mZiwgbnVtYmVyOiBpKzEsIG5hbWU6IHNlbGYuY29uZmlnLnBheW9mZk5hbWVzW2ldfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpMThuLnQoJ3Rvb2x0aXAuJytvYmplY3QrJy4nK3BheW9mZkZpbGVkTmFtZSsnLmRlZmF1bHQnLHt2YWx1ZTogZC5wYXlvZmYsIG51bWJlcjogc2VsZi5jb25maWcubWF4UGF5b2Zmc1RvRGlzcGxheSA8IDIgPyAnJyA6IGkrMX0pXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHVwZGF0ZVRleHRMaW5lcyhkKXsgLy9oZWxwZXIgbWV0aG9kIGZvciBzcGxpdHRpbmcgdGV4dCB0byB0c3BhbnNcbiAgICAgICAgdmFyIGxpbmVzID0gZC5uYW1lID8gZC5uYW1lLnNwbGl0KCdcXG4nKSA6IFtdO1xuICAgICAgICBsaW5lcy5yZXZlcnNlKCk7XG4gICAgICAgIHZhciB0c3BhbnMgPSBkMy5zZWxlY3QodGhpcykuc2VsZWN0QWxsKCd0c3BhbicpLmRhdGEobGluZXMpO1xuICAgICAgICB0c3BhbnMuZW50ZXIoKS5hcHBlbmQoJ3RzcGFuJylcbiAgICAgICAgICAgIC5tZXJnZSh0c3BhbnMpXG4gICAgICAgICAgICAudGV4dChsPT5sKVxuICAgICAgICAgICAgLmF0dHIoJ2R5JywgKGQsaSk9Pmk+MCA/ICctMS4xZW0nOiB1bmRlZmluZWQpXG4gICAgICAgICAgICAuYXR0cigneCcsICcwJyk7XG5cbiAgICAgICAgdHNwYW5zLmV4aXQoKS5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICBpc09wdGltYWwoZCl7XG4gICAgICAgIHJldHVybiBkLmRpc3BsYXlWYWx1ZSgnb3B0aW1hbCcpO1xuICAgIH1cblxuICAgIHJlZHJhd0VkZ2VzKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBlZGdlc0NvbnRhaW5lciA9IHRoaXMubWFpbkdyb3VwLnNlbGVjdE9yQXBwZW5kKCdnLmVkZ2VzJyk7XG4gICAgICAgIGlmKHNlbGYuY29uZmlnLmZvcmNlRnVsbEVkZ2VSZWRyYXcpe1xuICAgICAgICAgICAgZWRnZXNDb250YWluZXIuc2VsZWN0QWxsKFwiKlwiKS5yZW1vdmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBlZGdlcyA9IGVkZ2VzQ29udGFpbmVyLnNlbGVjdEFsbCgnLmVkZ2UnKS5kYXRhKHRoaXMuZGF0YS5lZGdlcy5maWx0ZXIoZT0+IWUuJGhpZGRlbiksIChkLGkpPT4gZC4kaWQpO1xuICAgICAgICBlZGdlcy5leGl0KCkucmVtb3ZlKCk7XG4gICAgICAgIHZhciBlZGdlc0VudGVyID0gZWRnZXMuZW50ZXIoKS5hcHBlbmQoJ2cnKVxuICAgICAgICAgICAgLmF0dHIoJ2lkJywgZD0+J2VkZ2UtJytkLiRpZClcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdlZGdlJyk7XG5cblxuICAgICAgICBlZGdlc0VudGVyLmFwcGVuZCgncGF0aCcpO1xuICAgICAgICB2YXIgbGFiZWxFbnRlciA9IGVkZ2VzRW50ZXIuYXBwZW5kU2VsZWN0b3IoJ2cubGFiZWwtZ3JvdXAnKTtcbiAgICAgICAgbGFiZWxFbnRlci5hcHBlbmQoJ3RleHQnKS5hdHRyKCdjbGFzcycsICdsYWJlbCcpO1xuICAgICAgICB2YXIgcGF5b2ZmRW50ZXIgPSBlZGdlc0VudGVyLmFwcGVuZCgndGV4dCcpLmF0dHIoJ2NsYXNzJywgJ3BheW9mZicpO1xuICAgICAgICB2YXIgcHJvYmFiaWxpdHlFbnRlciA9IGVkZ2VzRW50ZXIuYXBwZW5kKCd0ZXh0JykuYXR0cignY2xhc3MnLCAncHJvYmFiaWxpdHknKTtcblxuXG4gICAgICAgIHZhciBlZGdlc01lcmdlID0gZWRnZXNFbnRlci5tZXJnZShlZGdlcyk7XG5cblxuICAgICAgICB2YXIgb3B0aW1hbENsYXNzTmFtZSA9ICdvcHRpbWFsJztcbiAgICAgICAgZWRnZXNNZXJnZS5jbGFzc2VkKG9wdGltYWxDbGFzc05hbWUsIChkKT0+c2VsZi5pc09wdGltYWwoZCkpO1xuXG4gICAgICAgIHZhciBlZGdlc01lcmdlVCA9IGVkZ2VzTWVyZ2U7XG4gICAgICAgIGlmKHRoaXMudHJhbnNpdGlvbil7XG4gICAgICAgICAgICBlZGdlc01lcmdlVCA9IGVkZ2VzTWVyZ2UudHJhbnNpdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgZWRnZXNNZXJnZVQuc2VsZWN0KCdwYXRoJylcbiAgICAgICAgICAgIC5hdHRyKCdkJywgZD0+IHRoaXMubGF5b3V0LmVkZ2VMaW5lRChkKSlcbiAgICAgICAgICAgIC8vIC5hdHRyKFwic3Ryb2tlXCIsIFwiYmxhY2tcIilcbiAgICAgICAgICAgIC8vIC5hdHRyKFwic3Ryb2tlLXdpZHRoXCIsIDIpXG4gICAgICAgICAgICAuYXR0cihcImZpbGxcIiwgXCJub25lXCIpXG4gICAgICAgICAgICAuYXR0cihcIm1hcmtlci1lbmRcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICAgIHZhciBzdWZmaXggPSBkMy5zZWxlY3QodGhpcy5wYXJlbnROb2RlKS5jbGFzc2VkKCdzZWxlY3RlZCcpID8gJy1zZWxlY3RlZCcgOiAoc2VsZi5pc09wdGltYWwoZCk/Jy1vcHRpbWFsJzonJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwidXJsKCNhcnJvd1wiKyBzdWZmaXgrXCIpXCJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gLmF0dHIoXCJzaGFwZS1yZW5kZXJpbmdcIiwgXCJvcHRpbWl6ZVF1YWxpdHlcIilcblxuXG4gICAgICAgIGVkZ2VzTWVyZ2Uub24oJ2NsaWNrJywgZD0+e1xuICAgICAgICAgICAgc2VsZi5zZWxlY3RFZGdlKGQsIHRydWUpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubGF5b3V0LmVkZ2VMYWJlbFBvc2l0aW9uKGxhYmVsRW50ZXIpO1xuICAgICAgICBlZGdlc01lcmdlVC5zZWxlY3QoJ3RleHQubGFiZWwnKS5lYWNoKHRoaXMudXBkYXRlVGV4dExpbmVzKTtcbiAgICAgICAgdmFyIGxhYmVsTWVyZ2UgPSBlZGdlc01lcmdlLnNlbGVjdCgnZy5sYWJlbC1ncm91cCcpO1xuICAgICAgICBsYWJlbE1lcmdlLmNsYXNzZWQoJ3NkLWhpZGRlbicsIHRoaXMuY29uZmlnLmhpZGVMYWJlbHMpO1xuICAgICAgICB2YXIgbGFiZWxNZXJnZVQgPSBlZGdlc01lcmdlVC5zZWxlY3QoJ2cubGFiZWwtZ3JvdXAnKTtcbiAgICAgICAgdGhpcy5sYXlvdXQuZWRnZUxhYmVsUG9zaXRpb24obGFiZWxNZXJnZVQpO1xuICAgICAgICAgICAgLy8gLnRleHQoZD0+ZC5uYW1lKTtcblxuICAgICAgICB2YXIgcGF5b2ZmID0gZWRnZXNNZXJnZS5zZWxlY3QoJ3RleHQucGF5b2ZmJyk7XG5cbiAgICAgICAgdmFyIHBheW9mZlRzcGFucyA9IHBheW9mZi5zZWxlY3RBbGwoJ3RzcGFuJykuZGF0YShkID0+IHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gZC5kaXNwbGF5VmFsdWUoJ3BheW9mZicpO1xuICAgICAgICAgICAgcmV0dXJuIFV0aWxzLmlzQXJyYXkoaXRlbSkgPyBpdGVtLnNsaWNlKDAsIE1hdGgubWluKGl0ZW0ubGVuZ3RoLCBzZWxmLmNvbmZpZy5tYXhQYXlvZmZzVG9EaXNwbGF5KSkubWFwKF89PmQpIDogW2RdO1xuICAgICAgICB9KTtcbiAgICAgICAgcGF5b2ZmVHNwYW5zLmV4aXQoKS5yZW1vdmUoKTtcblxuICAgICAgICB2YXIgcGF5b2ZmVHNwYW5zTSA9IHBheW9mZlRzcGFucy5lbnRlcigpLmFwcGVuZCgndHNwYW4nKS5tZXJnZShwYXlvZmZUc3BhbnMpO1xuICAgICAgICBwYXlvZmZUc3BhbnNNXG4gICAgICAgIC8vIC5hdHRyKCdkb21pbmFudC1iYXNlbGluZScsICdoYW5naW5nJylcbiAgICAgICAgICAgIC5hdHRyKCdkeScsIChkLGkpPT5pPjAgPyAnMS4xZW0nOiB1bmRlZmluZWQpXG4gICAgICAgICAgICAvLyAuYXR0cigneCcsICcwJylcblxuICAgICAgICAgICAgLy8gLmF0dHIoJ2RvbWluYW50LWJhc2VsaW5lJywgJ2hhbmdpbmcnKVxuICAgICAgICAgICAgLmNsYXNzZWQoJ25lZ2F0aXZlJywgKGQsIGkpPT4ge1xuICAgICAgICAgICAgICAgIHZhciB2YWwgPSBkLmRpc3BsYXlQYXlvZmYodW5kZWZpbmVkLCBpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsIT09bnVsbCAmJiB2YWw8MDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2xhc3NlZCgnc2QtaGlkZGVuJywgdGhpcy5jb25maWcuaGlkZVBheW9mZnMpXG4gICAgICAgICAgICAvLyAudGV4dChkPT4gaXNOYU4oZC5wYXlvZmYpID8gZC5wYXlvZmYgOiBzZWxmLmNvbmZpZy5wYXlvZmZOdW1iZXJGb3JtYXR0ZXIoZC5wYXlvZmYpKVxuICAgICAgICAgICAgLnRleHQoKGQsIGkpPT57XG4gICAgICAgICAgICAgICAgaWYodGhpcy5jb25maWcucmF3KXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQucGF5b2ZmW2ldO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gZC5kaXNwbGF5VmFsdWUoJ3BheW9mZicpO1xuICAgICAgICAgICAgICAgIGxldCBpdGVtcyA9IFV0aWxzLmlzQXJyYXkoaXRlbSkgPyBpdGVtIDogW2l0ZW1dO1xuXG4gICAgICAgICAgICAgICAgbGV0IHZhbCA9IGl0ZW1zW2ldO1xuICAgICAgICAgICAgICAgIGlmICh2YWwgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc05hTih2YWwpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5jb25maWcucGF5b2ZmTnVtYmVyRm9ybWF0dGVyKHZhbCwgaSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKFV0aWxzLmlzU3RyaW5nKHZhbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoZC5wYXlvZmZbaV0gIT09IG51bGwgJiYgIWlzTmFOKGQucGF5b2ZmW2ldKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYuY29uZmlnLnBheW9mZk51bWJlckZvcm1hdHRlcihkLnBheW9mZltpXSwgaSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZC5wYXlvZmZbaV07XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIFRvb2x0aXAuYXR0YWNoKHBheW9mZlRzcGFuc00sIChkLCBpKT0+e1xuICAgICAgICAgICAgaWYoc2VsZi5jb25maWcucGF5b2ZmTmFtZXMubGVuZ3RoPmkgJiYgc2VsZi5jb25maWcucGF5b2ZmTmFtZXNbaV0gIT09IG51bGwpe1xuICAgICAgICAgICAgICAgIHJldHVybiBpMThuLnQoJ3Rvb2x0aXAuZWRnZS5wYXlvZmYubmFtZWQnLHt2YWx1ZTogZC5wYXlvZmZbaV0sIG51bWJlcjogaSsxLCBuYW1lOiBzZWxmLmNvbmZpZy5wYXlvZmZOYW1lc1tpXX0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaTE4bi50KCd0b29sdGlwLmVkZ2UucGF5b2ZmLmRlZmF1bHQnLHt2YWx1ZTogZC5wYXlvZmZbaV0sIG51bWJlcjogc2VsZi5jb25maWcubWF4UGF5b2Zmc1RvRGlzcGxheSA8IDIgPyAnJyA6IGkrMX0pXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBwYXlvZmZUZXh0VCA9IHBheW9mZjtcbiAgICAgICAgaWYodGhpcy50cmFuc2l0aW9uKXtcbiAgICAgICAgICAgIHBheW9mZlRleHRUID0gcGF5b2ZmLnRyYW5zaXRpb24oKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxheW91dC5lZGdlUGF5b2ZmUG9zaXRpb24ocGF5b2ZmRW50ZXIpO1xuICAgICAgICB0aGlzLmxheW91dC5lZGdlUGF5b2ZmUG9zaXRpb24ocGF5b2ZmVGV4dFQpO1xuXG4gICAgICAgIFRvb2x0aXAuYXR0YWNoKGVkZ2VzTWVyZ2Uuc2VsZWN0KCd0ZXh0LnByb2JhYmlsaXR5JyksIGQ9PmkxOG4udCgndG9vbHRpcC5lZGdlLnByb2JhYmlsaXR5Jyx7dmFsdWU6IGQucHJvYmFiaWxpdHk9PT0gdW5kZWZpbmVkID8gZC5kaXNwbGF5UHJvYmFiaWxpdHkoKSA6IGQucHJvYmFiaWxpdHl9KSk7XG5cbiAgICAgICAgZWRnZXNNZXJnZS5zZWxlY3QoJ3RleHQucHJvYmFiaWxpdHknKVxuICAgICAgICAgICAgLmNsYXNzZWQoJ3NkLWhpZGRlbicsIHRoaXMuY29uZmlnLmhpZGVQcm9iYWJpbGl0aWVzKTtcbiAgICAgICAgdmFyIHByb2JhYmlsaXR5TWVyZ2UgPSBlZGdlc01lcmdlLnNlbGVjdCgndGV4dC5wcm9iYWJpbGl0eScpO1xuICAgICAgICBwcm9iYWJpbGl0eU1lcmdlXG4gICAgICAgICAgICAuYXR0cigndGV4dC1hbmNob3InLCAnZW5kJylcbiAgICAgICAgICAgIC50ZXh0KGQ9PntcbiAgICAgICAgICAgICAgICBpZih0aGlzLmNvbmZpZy5yYXcpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC5wcm9iYWJpbGl0eTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHZhbCA9IGQuZGlzcGxheVByb2JhYmlsaXR5KCk7XG5cbiAgICAgICAgICAgICAgICBpZih2YWwhPT1udWxsKXtcbiAgICAgICAgICAgICAgICAgICAgaWYoIWlzTmFOKHZhbCkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYuY29uZmlnLnByb2JhYmlsaXR5TnVtYmVyRm9ybWF0dGVyKHZhbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYoVXRpbHMuaXNTdHJpbmcodmFsKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoZC5wcm9iYWJpbGl0eSE9PW51bGwgJiYgIWlzTmFOKGQucHJvYmFiaWxpdHkpKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5jb25maWcucHJvYmFiaWxpdHlOdW1iZXJGb3JtYXR0ZXIoZC5wcm9iYWJpbGl0eSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZC5wcm9iYWJpbGl0eTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB2YXIgcHJvYmFiaWxpdHlNZXJnZVQgPSBwcm9iYWJpbGl0eU1lcmdlO1xuICAgICAgICBpZih0aGlzLnRyYW5zaXRpb24pe1xuICAgICAgICAgICAgcHJvYmFiaWxpdHlNZXJnZVQgPSBwcm9iYWJpbGl0eU1lcmdlLnRyYW5zaXRpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubGF5b3V0LmVkZ2VQcm9iYWJpbGl0eVBvc2l0aW9uKHByb2JhYmlsaXR5RW50ZXIpO1xuICAgICAgICB0aGlzLmxheW91dC5lZGdlUHJvYmFiaWxpdHlQb3NpdGlvbihwcm9iYWJpbGl0eU1lcmdlVCk7XG5cblxuICAgICAgICBlZGdlc0NvbnRhaW5lci5zZWxlY3RBbGwoJy5lZGdlLicrb3B0aW1hbENsYXNzTmFtZSkucmFpc2UoKTtcblxuICAgICAgICBlZGdlc01lcmdlLm9uKCdjb250ZXh0bWVudScsIHRoaXMuZWRnZUNvbnRleHRNZW51KTtcbiAgICAgICAgZWRnZXNNZXJnZS5vbignZGJsY2xpY2snLCB0aGlzLmVkZ2VDb250ZXh0TWVudSk7XG4gICAgICAgIGVkZ2VzTWVyZ2UuZWFjaChmdW5jdGlvbihkLCBpKXtcbiAgICAgICAgICAgIHZhciBlbGVtID0gdGhpcztcbiAgICAgICAgICAgIHZhciBtYyA9IG5ldyBIYW1tZXIuTWFuYWdlcihlbGVtKTtcbiAgICAgICAgICAgIG1jLmFkZChuZXcgSGFtbWVyLlByZXNzKHtcbiAgICAgICAgICAgICAgICBwb2ludGVyVHlwZTogSGFtbWVyLlBPSU5URVJfVE9VQ0hcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICByZWRyYXdGbG9hdGluZ1RleHRzKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cblxuICAgICAgICB2YXIgdGV4dHNDb250YWluZXIgPSB0aGlzLm1haW5Hcm91cC5zZWxlY3RPckFwcGVuZCgnZy5mbG9hdGluZy10ZXh0cycpO1xuICAgICAgICB2YXIgdGV4dHMgPSB0ZXh0c0NvbnRhaW5lci5zZWxlY3RBbGwoJy5mbG9hdGluZy10ZXh0JykuZGF0YSh0aGlzLmRhdGEudGV4dHMsIChkLGkpPT4gZC4kaWQpO1xuICAgICAgICB0ZXh0cy5leGl0KCkucmVtb3ZlKCk7XG4gICAgICAgIHZhciB0ZXh0c0VudGVyID0gdGV4dHMuZW50ZXIoKS5hcHBlbmRTZWxlY3RvcignZy5mbG9hdGluZy10ZXh0JylcbiAgICAgICAgICAgIC5hdHRyKCdpZCcsIGQ9Pid0ZXh0LScrZC4kaWQpO1xuXG5cbiAgICAgICAgdmFyIHJlY3RXaWR0aCA9IDQwO1xuICAgICAgICB2YXIgcmVjdEhlaWdodCA9IDIwO1xuXG4gICAgICAgIHRleHRzRW50ZXIuYXBwZW5kKCdyZWN0JykuYXR0cigneCcsIC01KS5hdHRyKCd5JywgLTE2KS5hdHRyKCdmaWxsLW9wYWNpdHknLCAwKTtcbiAgICAgICAgdGV4dHNFbnRlci5hcHBlbmQoJ3RleHQnKTtcblxuICAgICAgICB2YXIgdGV4dHNNZXJnZSA9IHRleHRzRW50ZXIubWVyZ2UodGV4dHMpO1xuICAgICAgICB2YXIgdGV4dHNNZXJnZVQgPSB0ZXh0c01lcmdlO1xuICAgICAgICBpZih0aGlzLnRyYW5zaXRpb24pe1xuICAgICAgICAgICAgdGV4dHNNZXJnZVQgPSB0ZXh0c01lcmdlLnRyYW5zaXRpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRleHRzTWVyZ2VULmF0dHIoJ3RyYW5zZm9ybScsIGQ9Pid0cmFuc2xhdGUoJyArIGQubG9jYXRpb24ueCArICcgICcgKyBkLmxvY2F0aW9uLnkgKyAnKScpO1xuXG4gICAgICAgIHZhciB0c3BhbnMgPSB0ZXh0c01lcmdlLnNlbGVjdCgndGV4dCcpLnNlbGVjdEFsbCgndHNwYW4nKS5kYXRhKGQ9PmQudmFsdWUgPyBkLnZhbHVlLnNwbGl0KCdcXG4nKSA6IFtdKTtcblxuICAgICAgICB0c3BhbnMuZW50ZXIoKS5hcHBlbmQoJ3RzcGFuJylcbiAgICAgICAgICAgIC5tZXJnZSh0c3BhbnMpXG4gICAgICAgICAgICAuaHRtbChsPT5BcHBVdGlscy5yZXBsYWNlVXJscyhBcHBVdGlscy5lc2NhcGVIdG1sKGwpKSlcbiAgICAgICAgICAgIC5hdHRyKCdkeScsIChkLGkpPT5pPjAgPyAnMS4xZW0nOiB1bmRlZmluZWQpXG4gICAgICAgICAgICAuYXR0cigneCcsICcwJyk7XG5cbiAgICAgICAgdHNwYW5zLmV4aXQoKS5yZW1vdmUoKTtcbiAgICAgICAgdGV4dHNNZXJnZS5jbGFzc2VkKCdzZC1lbXB0eScsIGQ9PiFkLnZhbHVlIHx8ICFkLnZhbHVlLnRyaW0oKSk7XG4gICAgICAgIHRleHRzTWVyZ2Uuc2VsZWN0KCdyZWN0JykuYXR0cignd2lkdGgnLCByZWN0V2lkdGgpLmF0dHIoJ2hlaWdodCcsIHJlY3RIZWlnaHQpO1xuXG4gICAgICAgIHRleHRzTWVyZ2UuZWFjaChmdW5jdGlvbihkKXtcbiAgICAgICAgICAgIGlmKCFkLnZhbHVlKXtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgYmIgPSBkMy5zZWxlY3QodGhpcykuc2VsZWN0KCd0ZXh0Jykubm9kZSgpLmdldEJCb3goKTtcbiAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLnNlbGVjdCgncmVjdCcpXG4gICAgICAgICAgICAgICAuYXR0cigneScsIGJiLnktNSlcbiAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIE1hdGgubWF4KGJiLndpZHRoKzEwLCByZWN0V2lkdGgpKVxuICAgICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIE1hdGgubWF4KGJiLmhlaWdodCsxMCwgcmVjdEhlaWdodCkpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmKHRoaXMudGV4dERyYWdIYW5kbGVyKXtcbiAgICAgICAgICAgIHRleHRzTWVyZ2UuY2FsbCh0aGlzLnRleHREcmFnSGFuZGxlci5kcmFnKTtcbiAgICAgICAgfVxuICAgICAgICB0ZXh0c01lcmdlLm9uKCdjb250ZXh0bWVudScsIHRoaXMudGV4dENvbnRleHRNZW51KTtcbiAgICAgICAgdGV4dHNNZXJnZS5vbignZGJsY2xpY2snLCB0aGlzLnRleHRDb250ZXh0TWVudSk7XG4gICAgICAgIHRleHRzTWVyZ2UuZWFjaChmdW5jdGlvbihkLCBpKXtcbiAgICAgICAgICAgIHZhciBlbGVtID0gdGhpcztcbiAgICAgICAgICAgIHZhciBtYyA9IG5ldyBIYW1tZXIuTWFuYWdlcihlbGVtKTtcbiAgICAgICAgICAgIG1jLmFkZChuZXcgSGFtbWVyLlByZXNzKHtcbiAgICAgICAgICAgICAgICBwb2ludGVyVHlwZTogJ3RvdWNoJ1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9KVxuXG4gICAgfVxuXG4gICAgdXBkYXRlVmFsaWRhdGlvbk1lc3NhZ2VzKCkge1xuICAgICAgICB2YXIgbm9kZXMgPSB0aGlzLm1haW5Hcm91cC5zZWxlY3RBbGwoJy5ub2RlJyk7XG4gICAgICAgIG5vZGVzLmNsYXNzZWQoJ2Vycm9yJywgZmFsc2UpO1xuXG4gICAgICAgIHRoaXMuZGF0YS52YWxpZGF0aW9uUmVzdWx0cy5mb3JFYWNoKHZhbGlkYXRpb25SZXN1bHQ9PntcbiAgICAgICAgICAgIGlmKHZhbGlkYXRpb25SZXN1bHQuaXNWYWxpZCgpKXtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHZhbGlkYXRpb25SZXN1bHQub2JqZWN0SWRUb0Vycm9yKS5mb3JFYWNoKGlkPT57XG4gICAgICAgICAgICAgICAgdmFyIGVycm9ycyA9IHZhbGlkYXRpb25SZXN1bHQub2JqZWN0SWRUb0Vycm9yW2lkXTtcbiAgICAgICAgICAgICAgICB2YXIgbm9kZVNlbGVjdGlvbiA9IHRoaXMuZ2V0Tm9kZUQzU2VsZWN0aW9uQnlJZChpZCk7XG4gICAgICAgICAgICAgICAgbm9kZVNlbGVjdGlvbi5jbGFzc2VkKCdlcnJvcicsIHRydWUpO1xuICAgICAgICAgICAgICAgIHZhciB0b29sdGlwSHRtbCA9ICcnO1xuICAgICAgICAgICAgICAgIGVycm9ycy5mb3JFYWNoKGU9PntcbiAgICAgICAgICAgICAgICAgICAgaWYodG9vbHRpcEh0bWwpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcEh0bWwrPSc8YnIvPidcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwSHRtbCs9QXBwVXRpbHMuZ2V0VmFsaWRhdGlvbk1lc3NhZ2UoZSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBUb29sdGlwLmF0dGFjaChub2RlU2VsZWN0aW9uLnNlbGVjdCgnLmVycm9yLWluZGljYXRvcicpLCB0b29sdGlwSHRtbCk7XG5cblxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICBpbml0RWRnZU1hcmtlcnMoKSB7XG4gICAgICAgIHZhciBkZWZzID0gdGhpcy5zdmcuYXBwZW5kKFwic3ZnOmRlZnNcIik7XG5cbiAgICAgICAgdGhpcy5pbml0QXJyb3dNYXJrZXIoXCJhcnJvd1wiKTtcbiAgICAgICAgdGhpcy5pbml0QXJyb3dNYXJrZXIoXCJhcnJvdy1vcHRpbWFsXCIpO1xuICAgICAgICB0aGlzLmluaXRBcnJvd01hcmtlcihcImFycm93LXNlbGVjdGVkXCIpO1xuICAgIH1cblxuICAgIGluaXRBcnJvd01hcmtlcihpZCkge1xuXG4gICAgICAgIHZhciBkZWZzID0gdGhpcy5zdmcuc2VsZWN0KFwiZGVmc1wiKTtcbiAgICAgICAgZGVmcy5hcHBlbmQoXCJtYXJrZXJcIilcbiAgICAgICAgICAgIC5hdHRyKFwiaWRcIixpZClcbiAgICAgICAgICAgIC5hdHRyKFwidmlld0JveFwiLFwiMCAtNSAxMCAxMFwiKVxuICAgICAgICAgICAgLmF0dHIoXCJyZWZYXCIsNSlcbiAgICAgICAgICAgIC5hdHRyKFwicmVmWVwiLDApXG4gICAgICAgICAgICAuYXR0cihcIm1hcmtlcldpZHRoXCIsNClcbiAgICAgICAgICAgIC5hdHRyKFwibWFya2VySGVpZ2h0XCIsNClcbiAgICAgICAgICAgIC5hdHRyKFwib3JpZW50XCIsXCJhdXRvXCIpXG4gICAgICAgICAgICAuYXBwZW5kKFwicGF0aFwiKVxuICAgICAgICAgICAgLmF0dHIoXCJkXCIsIFwiTTAsLTVMMTAsMEwwLDVcIilcbiAgICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIixcImFycm93SGVhZFwiKTtcbiAgICB9XG5cbiAgICB1cGRhdGVCcnVzaEV4dGVudCgpIHtcbiAgICAgICAgdmFyIHNlbGYgPXRoaXM7XG4gICAgICAgIHRoaXMuYnJ1c2guZXh0ZW50KFtbMCwgMF0sIFtzZWxmLnN2Zy5hdHRyKCd3aWR0aCcpLCBzZWxmLnN2Zy5hdHRyKCdoZWlnaHQnKV1dKTtcbiAgICAgICAgdGhpcy5icnVzaENvbnRhaW5lci5jYWxsKHRoaXMuYnJ1c2gpO1xuICAgIH1cbiAgICBpbml0QnJ1c2goKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICB2YXIgYnJ1c2hDb250YWluZXIgPSBzZWxmLmJydXNoQ29udGFpbmVyID0gdGhpcy5icnVzaENvbnRhaW5lcj0gdGhpcy53cmFwcGVyR3JvdXAuc2VsZWN0T3JJbnNlcnQoXCJnLmJydXNoXCIsIFwiOmZpcnN0LWNoaWxkXCIpXG4gICAgICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwiYnJ1c2hcIik7XG5cbiAgICAgICAgdmFyIGJydXNoID0gdGhpcy5icnVzaCA9IGQzLmJydXNoKClcbiAgICAgICAgICAgIC5vbihcInN0YXJ0XCIsIGJydXNoc3RhcnQpXG4gICAgICAgICAgICAub24oXCJicnVzaFwiLCBicnVzaG1vdmUpXG4gICAgICAgICAgICAub24oXCJlbmRcIiwgYnJ1c2hlbmQpO1xuXG5cblxuICAgICAgICB0aGlzLnVwZGF0ZUJydXNoRXh0ZW50KCk7XG5cbiAgICAgICAgYnJ1c2hDb250YWluZXIuc2VsZWN0KCcub3ZlcmxheScpLm9uKFwibW91c2Vtb3ZlLmVkZ2VTZWxlY3Rpb25cIiwgbW91c2Vtb3ZlZCk7XG4gICAgICAgIGZ1bmN0aW9uIG1vdXNlbW92ZWQoKSB7XG4gICAgICAgICAgICB2YXIgbSA9IGQzLm1vdXNlKHRoaXMpO1xuICAgICAgICAgICAgdmFyIG1ndCA9IHNlbGYuZ2V0TWFpbkdyb3VwVHJhbnNsYXRpb24oKTtcbiAgICAgICAgICAgIHZhciBtYXJnaW4gPSAxMDtcblxuICAgICAgICAgICAgdmFyIGNsb3Nlc3QgPSBbbnVsbCwgOTk5OTk5OTk5XTtcbiAgICAgICAgICAgIHZhciBjbG9zZUVkZ2VzID0gW107XG4gICAgICAgICAgICBzZWxmLm1haW5Hcm91cC5zZWxlY3RBbGwoJy5lZGdlJykuZWFjaChmdW5jdGlvbihkKXtcbiAgICAgICAgICAgICAgICB2YXIgc2VsZWN0aW9uID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICAgICAgICAgIHNlbGVjdGlvbi5jbGFzc2VkKCdzZC1ob3ZlcicsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB2YXIgcGF0aE5vZGUgPSBzZWxlY3Rpb24uc2VsZWN0KCdwYXRoJykubm9kZSgpO1xuICAgICAgICAgICAgICAgIHZhciBiID0gcGF0aE5vZGUuZ2V0QkJveCgpO1xuICAgICAgICAgICAgICAgIGlmKGIueCttZ3RbMF0gPD1tWzBdICYmIGIueCtiLndpZHRoK21ndFswXSA+PSBtWzBdICYmXG4gICAgICAgICAgICAgICAgICAgYi55K21ndFsxXS1tYXJnaW4gPD1tWzFdICYmIGIueStiLmhlaWdodCttZ3RbMV0rbWFyZ2luID49IG1bMV0pe1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBjcCA9IEFwcFV0aWxzLmNsb3Nlc3RQb2ludChwYXRoTm9kZSwgW21bMF0tbWd0WzBdLCBtWzFdLW1ndFsxXV0pO1xuICAgICAgICAgICAgICAgICAgICBpZihjcC5kaXN0YW5jZSA8IG1hcmdpbiAmJiBjcC5kaXN0YW5jZTxjbG9zZXN0WzFdKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlc3QgPSBbc2VsZWN0aW9uLCBjcC5kaXN0YW5jZV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBzZWxmLmhvdmVyZWRFZGdlID0gbnVsbDtcbiAgICAgICAgICAgIGlmKGNsb3Nlc3RbMF0pe1xuICAgICAgICAgICAgICAgIGNsb3Nlc3RbMF0uY2xhc3NlZCgnc2QtaG92ZXInLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBzZWxmLmhvdmVyZWRFZGdlID0gY2xvc2VzdFswXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gYnJ1c2hzdGFydCgpIHtcbiAgICAgICAgICAgIGlmICghZDMuZXZlbnQuc2VsZWN0aW9uKSByZXR1cm47XG4gICAgICAgICAgICBpZihzZWxmLmhvdmVyZWRFZGdlKXtcbiAgICAgICAgICAgICAgICBzZWxmLnNlbGVjdEVkZ2Uoc2VsZi5ob3ZlcmVkRWRnZS5kYXR1bSgpLCB0cnVlKVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgc2VsZi5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgQ29udGV4dE1lbnUuaGlkZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSGlnaGxpZ2h0IHRoZSBzZWxlY3RlZCBub2Rlcy5cbiAgICAgICAgZnVuY3Rpb24gYnJ1c2htb3ZlKCkge1xuICAgICAgICAgICAgdmFyIHMgPSBkMy5ldmVudC5zZWxlY3Rpb247XG4gICAgICAgICAgICBpZighcylyZXR1cm47XG5cbiAgICAgICAgICAgIHNlbGYubWFpbkdyb3VwLnNlbGVjdEFsbChcIi5ub2RlXCIpLmNsYXNzZWQoJ3NlbGVjdGVkJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICB2YXIgbWFpbkdyb3VwVHJhbnNsYXRpb24gPSBzZWxmLmdldE1haW5Hcm91cFRyYW5zbGF0aW9uKCk7XG4gICAgICAgICAgICAgICAgdmFyIHggPSBkLmxvY2F0aW9uLngrbWFpbkdyb3VwVHJhbnNsYXRpb25bMF07XG4gICAgICAgICAgICAgICAgdmFyIHkgPSBkLmxvY2F0aW9uLnkrbWFpbkdyb3VwVHJhbnNsYXRpb25bMV07XG4gICAgICAgICAgICAgICAgdmFyIG5vZGVTaXplID0gc2VsZi5jb25maWcubGF5b3V0Lm5vZGVTaXplO1xuICAgICAgICAgICAgICAgIHZhciBvZmZzZXQgPSBub2RlU2l6ZSowLjI1O1xuICAgICAgICAgICAgICAgIHJldHVybiBzWzBdWzBdIDw9IHgrb2Zmc2V0ICYmIHgtb2Zmc2V0IDw9IHNbMV1bMF1cbiAgICAgICAgICAgICAgICAgICAgJiYgc1swXVsxXSA8PSB5K29mZnNldCAmJiB5LW9mZnNldCA8PSBzWzFdWzFdO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgdGhlIGJydXNoIGlzIGVtcHR5LCBzZWxlY3QgYWxsIGNpcmNsZXMuXG4gICAgICAgIGZ1bmN0aW9uIGJydXNoZW5kKCkge1xuICAgICAgICAgICAgaWYgKCFkMy5ldmVudC5zZWxlY3Rpb24pIHJldHVybjtcbiAgICAgICAgICAgIGJydXNoLm1vdmUoYnJ1c2hDb250YWluZXIsIG51bGwpO1xuXG4gICAgICAgICAgICB2YXIgc2VsZWN0ZWROb2RlcyA9IHNlbGYuZ2V0U2VsZWN0ZWROb2RlcygpO1xuICAgICAgICAgICAgaWYoc2VsZWN0ZWROb2RlcyAmJiBzZWxlY3RlZE5vZGVzLmxlbmd0aCA9PT0gMSl7XG4gICAgICAgICAgICAgICAgc2VsZi5zZWxlY3ROb2RlKHNlbGVjdGVkTm9kZXNbMF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gaWYgKCFkMy5ldmVudC5zZWxlY3Rpb24pIHNlbGYubWFpbkdyb3VwLnNlbGVjdEFsbChcIi5zZWxlY3RlZFwiKS5jbGFzc2VkKCdzZWxlY3RlZCcsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRpc2FibGVCcnVzaCgpe1xuICAgICAgICBpZighdGhpcy5icnVzaERpc2FibGVkKXtcbiAgICAgICAgICAgIEFwcFV0aWxzLmdyb3dsKGkxOG4udCgnZ3Jvd2wuYnJ1c2hEaXNhYmxlZCcpLCAnaW5mbycsICdsZWZ0JylcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmJydXNoRGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmJydXNoQ29udGFpbmVyLnJlbW92ZSgpO1xuICAgIH1cblxuICAgIGVuYWJsZUJydXNoKCl7XG4gICAgICAgIGlmKHRoaXMuYnJ1c2hEaXNhYmxlZCl7XG4gICAgICAgICAgICBBcHBVdGlscy5ncm93bChpMThuLnQoJ2dyb3dsLmJydXNoRW5hYmxlZCcpLCAnaW5mbycsICdsZWZ0JylcbiAgICAgICAgICAgIHRoaXMuaW5pdEJydXNoKCk7XG4gICAgICAgICAgICB0aGlzLmJydXNoRGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuXG5cbiAgICB9XG5cbiAgICBnZXRNYWluR3JvdXBUcmFuc2xhdGlvbihpbnZlcnQpIHtcbiAgICAgICAgdmFyIHRyYW5zbGF0aW9uID0gQXBwVXRpbHMuZ2V0VHJhbnNsYXRpb24odGhpcy5tYWluR3JvdXAuYXR0cihcInRyYW5zZm9ybVwiKSk7XG4gICAgICAgIGlmKGludmVydCl7XG4gICAgICAgICAgICB0cmFuc2xhdGlvblswXSA9IC10cmFuc2xhdGlvblswXTtcbiAgICAgICAgICAgIHRyYW5zbGF0aW9uWzFdID0gLXRyYW5zbGF0aW9uWzFdXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRyYW5zbGF0aW9uO1xuICAgIH1cblxuICAgIGluaXROb2RlQ29udGV4dE1lbnUoKSB7XG4gICAgICAgIHRoaXMubm9kZUNvbnRleHRNZW51ID0gbmV3IE5vZGVDb250ZXh0TWVudSh0aGlzLCB0aGlzLmNvbmZpZy5vcGVyYXRpb25zRm9yT2JqZWN0KTtcbiAgICB9XG5cbiAgICBpbml0RWRnZUNvbnRleHRNZW51KCkge1xuICAgICAgICB0aGlzLmVkZ2VDb250ZXh0TWVudSA9IG5ldyBFZGdlQ29udGV4dE1lbnUodGhpcyk7XG4gICAgfVxuXG4gICAgaW5pdFRleHRDb250ZXh0TWVudSgpIHtcbiAgICAgICAgdGhpcy50ZXh0Q29udGV4dE1lbnUgPSBuZXcgVGV4dENvbnRleHRNZW51KHRoaXMpO1xuICAgIH1cblxuXG5cbiAgICBpbml0TWFpbkNvbnRleHRNZW51KCkge1xuICAgICAgICB0aGlzLm1haW5Db250ZXh0TWVudSA9IG5ldyBNYWluQ29udGV4dE1lbnUodGhpcyk7XG4gICAgICAgIHRoaXMuc3ZnLm9uKCdjb250ZXh0bWVudScsdGhpcy5tYWluQ29udGV4dE1lbnUpO1xuICAgICAgICB0aGlzLnN2Zy5vbignZGJsY2xpY2snLHRoaXMubWFpbkNvbnRleHRNZW51KTtcbiAgICB9XG5cbiAgICBhZGRUZXh0KHRleHQpe1xuICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKCk7XG4gICAgICAgIHRoaXMuZGF0YS5hZGRUZXh0KHRleHQpO1xuICAgICAgICB0aGlzLnJlZHJhdygpO1xuICAgICAgICB0aGlzLnNlbGVjdFRleHQodGV4dCk7XG4gICAgfVxuXG4gICAgYWRkTm9kZShub2RlLCBwYXJlbnQsIHJlZHJhdz1mYWxzZSl7XG4gICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoKTtcbiAgICAgICAgdGhpcy5kYXRhLmFkZE5vZGUobm9kZSwgcGFyZW50KTtcbiAgICAgICAgdGhpcy5yZWRyYXcodHJ1ZSk7XG4gICAgICAgIHRoaXMubGF5b3V0LnVwZGF0ZShub2RlKTtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuXG4gICAgYWRkRGVjaXNpb25Ob2RlKHBhcmVudCl7XG4gICAgICAgIHZhciBuZXdOb2RlID0gbmV3IG1vZGVsLkRlY2lzaW9uTm9kZSh0aGlzLmxheW91dC5nZXROZXdDaGlsZExvY2F0aW9uKHBhcmVudCkpO1xuICAgICAgICB0aGlzLmFkZE5vZGUobmV3Tm9kZSwgcGFyZW50KVxuICAgIH1cbiAgICBhZGRDaGFuY2VOb2RlKHBhcmVudCl7XG4gICAgICAgIHZhciBuZXdOb2RlID0gbmV3IG1vZGVsLkNoYW5jZU5vZGUodGhpcy5sYXlvdXQuZ2V0TmV3Q2hpbGRMb2NhdGlvbihwYXJlbnQpKTtcbiAgICAgICAgdGhpcy5hZGROb2RlKG5ld05vZGUsIHBhcmVudClcbiAgICB9XG4gICAgYWRkVGVybWluYWxOb2RlKHBhcmVudCl7XG4gICAgICAgIHZhciBuZXdOb2RlID0gbmV3IG1vZGVsLlRlcm1pbmFsTm9kZSh0aGlzLmxheW91dC5nZXROZXdDaGlsZExvY2F0aW9uKHBhcmVudCkpO1xuICAgICAgICB0aGlzLmFkZE5vZGUobmV3Tm9kZSwgcGFyZW50KVxuICAgIH1cblxuICAgIGluamVjdE5vZGUobm9kZSwgZWRnZSl7XG4gICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoKTtcbiAgICAgICAgdGhpcy5kYXRhLmluamVjdE5vZGUobm9kZSwgZWRnZSk7XG4gICAgICAgIHRoaXMucmVkcmF3KCk7XG4gICAgICAgIHRoaXMubGF5b3V0LnVwZGF0ZShub2RlKTtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuXG4gICAgaW5qZWN0RGVjaXNpb25Ob2RlKGVkZ2Upe1xuICAgICAgICB2YXIgbmV3Tm9kZSA9IG5ldyBtb2RlbC5EZWNpc2lvbk5vZGUodGhpcy5sYXlvdXQuZ2V0SW5qZWN0ZWROb2RlTG9jYXRpb24oZWRnZSkpO1xuICAgICAgICB0aGlzLmluamVjdE5vZGUobmV3Tm9kZSwgZWRnZSk7XG5cbiAgICB9XG5cbiAgICBpbmplY3RDaGFuY2VOb2RlKGVkZ2Upe1xuICAgICAgICB2YXIgbmV3Tm9kZSA9IG5ldyBtb2RlbC5DaGFuY2VOb2RlKHRoaXMubGF5b3V0LmdldEluamVjdGVkTm9kZUxvY2F0aW9uKGVkZ2UpKTtcbiAgICAgICAgdGhpcy5pbmplY3ROb2RlKG5ld05vZGUsIGVkZ2UpO1xuICAgIH1cblxuICAgIHJlbW92ZU5vZGUobm9kZSkge1xuICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKCk7XG4gICAgICAgIHRoaXMuZGF0YS5yZW1vdmVOb2RlKG5vZGUpO1xuXG5cbiAgICAgICAgaWYoIXRoaXMubGF5b3V0LmlzTWFudWFsTGF5b3V0KCkpe1xuICAgICAgICAgICAgdGhpcy5sYXlvdXQudXBkYXRlKCk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5yZWRyYXcoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbW92ZVNlbGVjdGVkTm9kZXMoKSB7XG4gICAgICAgIHZhciBzZWxlY3RlZE5vZGVzID0gdGhpcy5nZXRTZWxlY3RlZE5vZGVzKCk7XG4gICAgICAgIGlmKCFzZWxlY3RlZE5vZGVzLmxlbmd0aCl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSgpO1xuICAgICAgICB0aGlzLmRhdGEucmVtb3ZlTm9kZXMoc2VsZWN0ZWROb2Rlcyk7XG4gICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgdGhpcy5yZWRyYXcoKTtcbiAgICAgICAgdGhpcy5sYXlvdXQudXBkYXRlKCk7XG4gICAgfVxuXG4gICAgcmVtb3ZlU2VsZWN0ZWRUZXh0cygpe1xuICAgICAgICB2YXIgc2VsZWN0ZWRUZXh0cyA9IHRoaXMuZ2V0U2VsZWN0ZWRUZXh0cygpO1xuXG4gICAgICAgIGlmKCFzZWxlY3RlZFRleHRzLmxlbmd0aCl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSgpO1xuICAgICAgICB0aGlzLmRhdGEucmVtb3ZlVGV4dHMoc2VsZWN0ZWRUZXh0cyk7XG4gICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgdGhpcy5yZWRyYXcoKTtcbiAgICB9XG5cbiAgICBjb3B5Tm9kZShkLCBub3RDbGVhclByZXZTZWxlY3Rpb24pIHtcbiAgICAgICAgdmFyIGNsb25lID0gdGhpcy5kYXRhLmNsb25lU3VidHJlZShkKTtcbiAgICAgICAgaWYobm90Q2xlYXJQcmV2U2VsZWN0aW9uKXtcbiAgICAgICAgICAgIGlmKCF0aGlzLmNvcGllZE5vZGVzKXtcbiAgICAgICAgICAgICAgICB0aGlzLmNvcGllZE5vZGVzPVtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jb3BpZWROb2Rlcy5wdXNoKGNsb25lKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLmNvcGllZE5vZGVzID0gW2Nsb25lXTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgY3V0Tm9kZShkKSB7XG4gICAgICAgIHRoaXMuY29weU5vZGUoZCk7XG4gICAgICAgIHRoaXMucmVtb3ZlTm9kZShkKTtcbiAgICB9XG5cbiAgICBjdXRTZWxlY3RlZE5vZGVzKCl7XG4gICAgICAgIHZhciBzZWxlY3RlZE5vZGVzID0gdGhpcy5nZXRTZWxlY3RlZE5vZGVzKCk7XG4gICAgICAgIHZhciBzZWxlY3RlZFJvb3RzID0gdGhpcy5kYXRhLmZpbmRTdWJ0cmVlUm9vdHMoc2VsZWN0ZWROb2Rlcyk7XG4gICAgICAgIHRoaXMuY29weU5vZGVzKHNlbGVjdGVkUm9vdHMpO1xuICAgICAgICB0aGlzLnJlbW92ZVNlbGVjdGVkTm9kZXMoKTtcbiAgICB9XG5cbiAgICBjb3B5U2VsZWN0ZWROb2RlcygpIHtcbiAgICAgICAgdmFyIHNlbGY7XG4gICAgICAgIHZhciBzZWxlY3RlZE5vZGVzID0gdGhpcy5nZXRTZWxlY3RlZE5vZGVzKCk7XG5cbiAgICAgICAgdmFyIHNlbGVjdGVkUm9vdHMgPSB0aGlzLmRhdGEuZmluZFN1YnRyZWVSb290cyhzZWxlY3RlZE5vZGVzKTtcbiAgICAgICAgdGhpcy5jb3B5Tm9kZXMoc2VsZWN0ZWRSb290cyk7XG5cblxuICAgIH1cblxuICAgIGNvcHlOb2Rlcyhub2Rlcyl7XG4gICAgICAgIHRoaXMuY29waWVkTm9kZXMgPSBub2Rlcy5tYXAoZD0+dGhpcy5kYXRhLmNsb25lU3VidHJlZShkKSk7XG4gICAgfVxuXG5cblxuICAgIHBhc3RlVG9Ob2RlKG5vZGUpIHtcbiAgICAgICAgaWYoIXRoaXMuY29waWVkTm9kZXMgfHwgIXRoaXMuY29waWVkTm9kZXMubGVuZ3RoKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKCk7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgc2VsZi5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICB2YXIgbm9kZXNUb0F0dGFjaCA9IHRoaXMuY29waWVkTm9kZXM7XG4gICAgICAgIHNlbGYuY29weU5vZGVzKHRoaXMuY29waWVkTm9kZXMpO1xuICAgICAgICBub2Rlc1RvQXR0YWNoLmZvckVhY2godG9BdHRhY2g9PntcbiAgICAgICAgICAgIHZhciBhdHRhY2hlZCA9IHRoaXMuZGF0YS5hdHRhY2hTdWJ0cmVlKHRvQXR0YWNoLCBub2RlKS5jaGlsZE5vZGU7XG4gICAgICAgICAgICBpZihhdHRhY2hlZC5mb2xkZWQpe1xuICAgICAgICAgICAgICAgIHNlbGYuZm9sZFN1YnRyZWUoYXR0YWNoZWQsIGF0dGFjaGVkLmZvbGRlZCwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGxvY2F0aW9uID0gc2VsZi5sYXlvdXQuZ2V0TmV3Q2hpbGRMb2NhdGlvbihub2RlKTtcbiAgICAgICAgICAgIGF0dGFjaGVkLm1vdmVUbyhsb2NhdGlvbi54LCBsb2NhdGlvbi55LCB0cnVlKTtcbiAgICAgICAgICAgIHNlbGYubGF5b3V0Lm1vdmVOb2RlVG9FbXB0eVBsYWNlKGF0dGFjaGVkLCBmYWxzZSk7XG4gICAgICAgICAgICBzZWxmLmxheW91dC5maXROb2Rlc0luUGxvdHRpbmdSZWdpb24odGhpcy5kYXRhLmdldEFsbERlc2NlbmRhbnROb2RlcyhhdHRhY2hlZCkpO1xuXG4gICAgICAgICAgICBzZWxmLnNlbGVjdFN1YlRyZWUoYXR0YWNoZWQsIGZhbHNlLCBub2Rlc1RvQXR0YWNoLmxlbmd0aD4xKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYobm9kZS5mb2xkZWQpe1xuICAgICAgICAgICAgc2VsZi5mb2xkU3VidHJlZShub2RlLCBub2RlLmZvbGRlZCwgZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgc2VsZi5yZWRyYXcoKTtcbiAgICAgICAgICAgIHNlbGYubGF5b3V0LnVwZGF0ZSgpO1xuICAgICAgICB9LDEwKVxuXG4gICAgfVxuXG4gICAgcGFzdGVUb05ld0xvY2F0aW9uKHBvaW50KSB7XG4gICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoKTtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBzZWxmLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgIHZhciBub2Rlc1RvQXR0YWNoID0gdGhpcy5jb3BpZWROb2RlcztcbiAgICAgICAgc2VsZi5jb3B5Tm9kZXModGhpcy5jb3BpZWROb2Rlcyk7XG4gICAgICAgIG5vZGVzVG9BdHRhY2guZm9yRWFjaCh0b0F0dGFjaD0+IHtcbiAgICAgICAgICAgIHZhciBhdHRhY2hlZCA9IHRoaXMuZGF0YS5hdHRhY2hTdWJ0cmVlKHRvQXR0YWNoKTtcbiAgICAgICAgICAgIGlmKGF0dGFjaGVkLmZvbGRlZCl7XG4gICAgICAgICAgICAgICAgc2VsZi5mb2xkU3VidHJlZShhdHRhY2hlZCwgYXR0YWNoZWQuZm9sZGVkLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhdHRhY2hlZC5tb3ZlVG8ocG9pbnQueCwgcG9pbnQueSwgdHJ1ZSk7XG4gICAgICAgICAgICBzZWxmLmxheW91dC5tb3ZlTm9kZVRvRW1wdHlQbGFjZShhdHRhY2hlZCwgZmFsc2UpO1xuICAgICAgICAgICAgc2VsZi5sYXlvdXQuZml0Tm9kZXNJblBsb3R0aW5nUmVnaW9uKHRoaXMuZGF0YS5nZXRBbGxEZXNjZW5kYW50Tm9kZXMoYXR0YWNoZWQpKTtcblxuICAgICAgICAgICAgc2VsZi5zZWxlY3RTdWJUcmVlKGF0dGFjaGVkLCBmYWxzZSwgbm9kZXNUb0F0dGFjaC5sZW5ndGg+MSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHNlbGYucmVkcmF3KCk7XG4gICAgICAgICAgICBzZWxmLmxheW91dC51cGRhdGUoKTtcbiAgICAgICAgfSwxMClcblxuICAgIH1cblxuICAgIGNvbnZlcnROb2RlKG5vZGUsIHR5cGVUb0NvbnZlcnRUbyl7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSgpO1xuICAgICAgICB0aGlzLmRhdGEuY29udmVydE5vZGUobm9kZSwgdHlwZVRvQ29udmVydFRvKTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgc2VsZi5yZWRyYXcodHJ1ZSk7XG4gICAgICAgIH0sMTApXG4gICAgfVxuXG4gICAgcGVyZm9ybU9wZXJhdGlvbihvYmplY3QsIG9wZXJhdGlvbil7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSgpO1xuICAgICAgICBvcGVyYXRpb24ucGVyZm9ybShvYmplY3QpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBzZWxmLnJlZHJhdygpO1xuICAgICAgICAgICAgc2VsZi5sYXlvdXQudXBkYXRlKCk7XG4gICAgICAgIH0sMTApXG4gICAgfVxuXG4gICAgZm9sZFN1YnRyZWUobm9kZSwgZm9sZCA9IHRydWUsIHJlZHJhdz10cnVlKXtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBub2RlLmZvbGRlZCA9IGZvbGQ7XG5cbiAgICAgICAgdGhpcy5kYXRhLmdldEFsbERlc2NlbmRhbnROb2Rlcyhub2RlKS5mb3JFYWNoKG49PntcbiAgICAgICAgICAgIG4uJGhpZGRlbiA9IGZvbGQ7XG4gICAgICAgICAgICBuLmZvbGRlZCA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5kYXRhLmdldEFsbERlc2NlbmRhbnRFZGdlcyhub2RlKS5mb3JFYWNoKGU9PmUuJGhpZGRlbiA9IGZvbGQpO1xuXG4gICAgICAgIGlmKCFyZWRyYXcpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHNlbGYucmVkcmF3KCk7XG4gICAgICAgICAgICBzZWxmLmxheW91dC51cGRhdGUoKTtcbiAgICAgICAgfSwxMClcbiAgICB9XG5cbiAgICB1cGRhdGVWaXNpYmlsaXR5KG5vZGUgPSBudWxsKXtcbiAgICAgICAgaWYoIW5vZGUpe1xuICAgICAgICAgICAgdGhpcy5kYXRhLmdldFJvb3RzKCkuZm9yRWFjaChuPT50aGlzLnVwZGF0ZVZpc2liaWxpdHkobikpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYobm9kZS5mb2xkZWQpe1xuICAgICAgICAgICAgdGhpcy5mb2xkU3VidHJlZShub2RlLCB0cnVlLCBmYWxzZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBub2RlLmNoaWxkRWRnZXMuZm9yRWFjaChlID0+IHRoaXMudXBkYXRlVmlzaWJpbGl0eShlLmNoaWxkTm9kZSkpO1xuXG4gICAgfVxuXG4gICAgbW92ZU5vZGVUbyh4LHkpe1xuXG4gICAgfVxuXG4gICAgdXBkYXRlTm9kZVBvc2l0aW9uKG5vZGUpIHtcbiAgICAgICAgdGhpcy5nZXROb2RlRDNTZWxlY3Rpb24obm9kZSkucmFpc2UoKS5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcrbm9kZS5sb2NhdGlvbi54KycgJytub2RlLmxvY2F0aW9uLnkrJyknKTtcbiAgICB9XG5cbiAgICB1cGRhdGVUZXh0UG9zaXRpb24odGV4dCkge1xuICAgICAgICB0aGlzLmdldFRleHREM1NlbGVjdGlvbih0ZXh0KS5yYWlzZSgpLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyt0ZXh0LmxvY2F0aW9uLngrJyAnK3RleHQubG9jYXRpb24ueSsnKScpO1xuICAgIH1cblxuICAgIGdldE5vZGVEM1NlbGVjdGlvbihub2RlKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Tm9kZUQzU2VsZWN0aW9uQnlJZChub2RlLiRpZCk7XG4gICAgfVxuXG4gICAgZ2V0Tm9kZUQzU2VsZWN0aW9uQnlJZChpZCl7XG4gICAgICAgIHJldHVybiB0aGlzLm1haW5Hcm91cC5zZWxlY3QoJyNub2RlLScraWQpO1xuICAgIH1cbiAgICBnZXRUZXh0RDNTZWxlY3Rpb24odGV4dCl7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFRleHREM1NlbGVjdGlvbkJ5SWQodGV4dC4kaWQpO1xuICAgIH1cbiAgICBnZXRUZXh0RDNTZWxlY3Rpb25CeUlkKGlkKXtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFpbkdyb3VwLnNlbGVjdCgnI3RleHQtJytpZCk7XG4gICAgfVxuXG4gICAgZ2V0U2VsZWN0ZWROb2Rlcyh2aXNpYmxlT25seSA9IGZhbHNlKSB7XG4gICAgICAgIGxldCBzZWxlY3RlZFZpc2libGUgPSB0aGlzLm1haW5Hcm91cC5zZWxlY3RBbGwoXCIubm9kZS5zZWxlY3RlZFwiKS5kYXRhKCk7XG4gICAgICAgIGlmKHZpc2libGVPbmx5KXtcbiAgICAgICAgICAgIHJldHVybiBzZWxlY3RlZFZpc2libGU7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYWxsU2VsZWN0ZWQgID0gW107XG4gICAgICAgIGFsbFNlbGVjdGVkLnB1c2goLi4uc2VsZWN0ZWRWaXNpYmxlKTtcblxuICAgICAgICBzZWxlY3RlZFZpc2libGUuZm9yRWFjaChuPT57XG4gICAgICAgICAgICBpZihuLmZvbGRlZCl7XG4gICAgICAgICAgICAgICAgbGV0IGRlc2NlbmRhbnRzID0gdGhpcy5kYXRhLmdldEFsbERlc2NlbmRhbnROb2RlcyhuKTtcbiAgICAgICAgICAgICAgICBpZihkZXNjZW5kYW50cyl7XG4gICAgICAgICAgICAgICAgICAgIGFsbFNlbGVjdGVkLnB1c2goLi4uZGVzY2VuZGFudHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGFsbFNlbGVjdGVkO1xuICAgIH1cblxuICAgIGdldFNlbGVjdGVkVGV4dHMoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFpbkdyb3VwLnNlbGVjdEFsbChcIi5mbG9hdGluZy10ZXh0LnNlbGVjdGVkXCIpLmRhdGEoKTtcbiAgICB9XG5cbiAgICBjbGVhclNlbGVjdGlvbigpe1xuICAgICAgICB0aGlzLm1haW5Hcm91cC5zZWxlY3RBbGwoXCIuZWRnZS5zZWxlY3RlZFwiKS5zZWxlY3QoJ3BhdGgnKS5hdHRyKFwibWFya2VyLWVuZFwiLCBkID0+IFwidXJsKCNhcnJvd1wiKyh0aGlzLmlzT3B0aW1hbChkKT8nLW9wdGltYWwnOicnKStcIilcIilcbiAgICAgICAgdGhpcy5tYWluR3JvdXAuc2VsZWN0QWxsKFwiLnNlbGVjdGVkXCIpLmNsYXNzZWQoJ3NlbGVjdGVkJywgZmFsc2UpO1xuICAgICAgICB0aGlzLmNvbmZpZy5vblNlbGVjdGlvbkNsZWFyZWQoKTtcbiAgICB9XG5cbiAgICBzZWxlY3RFZGdlKGVkZ2UsIGNsZWFyU2VsZWN0aW9uQmVmb3JlU2VsZWN0KXtcbiAgICAgICAgaWYoY2xlYXJTZWxlY3Rpb25CZWZvcmVTZWxlY3Qpe1xuICAgICAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29uZmlnLm9uRWRnZVNlbGVjdGVkKGVkZ2UpO1xuICAgICAgICB0aGlzLm1haW5Hcm91cC5zZWxlY3QoJyNlZGdlLScrZWRnZS4kaWQpXG4gICAgICAgICAgICAuY2xhc3NlZCgnc2VsZWN0ZWQnLCB0cnVlKVxuICAgICAgICAgICAgLnNlbGVjdCgncGF0aCcpXG4gICAgICAgICAgICAuYXR0cihcIm1hcmtlci1lbmRcIiwgZCA9PiBcInVybCgjYXJyb3ctc2VsZWN0ZWQpXCIpXG4gICAgfVxuXG4gICAgaXNOb2RlU2VsZWN0ZWQobm9kZSl7XG4gICAgICAgIHJldHVybiB0aGlzLmdldE5vZGVEM1NlbGVjdGlvbihub2RlKS5jbGFzc2VkKCdzZWxlY3RlZCcpO1xuICAgIH1cblxuICAgIHNlbGVjdE5vZGUobm9kZSwgY2xlYXJTZWxlY3Rpb25CZWZvcmVTZWxlY3QsIHNraXBDYWxsYmFjayl7XG4gICAgICAgIGlmKGNsZWFyU2VsZWN0aW9uQmVmb3JlU2VsZWN0KXtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCFza2lwQ2FsbGJhY2spe1xuICAgICAgICAgICAgdGhpcy5jb25maWcub25Ob2RlU2VsZWN0ZWQobm9kZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmdldE5vZGVEM1NlbGVjdGlvbkJ5SWQobm9kZS4kaWQpLmNsYXNzZWQoJ3NlbGVjdGVkJywgdHJ1ZSk7XG4gICAgfVxuXG4gICAgc2VsZWN0VGV4dCh0ZXh0LCBjbGVhclNlbGVjdGlvbkJlZm9yZVNlbGVjdCwgc2tpcENhbGxiYWNrKXtcbiAgICAgICAgaWYoY2xlYXJTZWxlY3Rpb25CZWZvcmVTZWxlY3Qpe1xuICAgICAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIXNraXBDYWxsYmFjayl7XG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5vblRleHRTZWxlY3RlZCh0ZXh0KVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5nZXRUZXh0RDNTZWxlY3Rpb25CeUlkKHRleHQuJGlkKS5jbGFzc2VkKCdzZWxlY3RlZCcsIHRydWUpO1xuICAgIH1cblxuICAgIHNlbGVjdFN1YlRyZWUobm9kZSwgY2xlYXJTZWxlY3Rpb25CZWZvcmVTZWxlY3Qsc2tpcENhbGxiYWNrKSB7XG4gICAgICAgIGlmKGNsZWFyU2VsZWN0aW9uQmVmb3JlU2VsZWN0KXtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNlbGVjdE5vZGUobm9kZSwgZmFsc2UsIHNraXBDYWxsYmFjayk7XG4gICAgICAgIG5vZGUuY2hpbGRFZGdlcy5mb3JFYWNoKGU9PnRoaXMuc2VsZWN0U3ViVHJlZShlLmNoaWxkTm9kZSwgZmFsc2UsIHRydWUpKTtcbiAgICB9XG5cbiAgICBzZWxlY3RBbGxOb2RlcygpIHtcbiAgICAgICAgdGhpcy5tYWluR3JvdXAuc2VsZWN0QWxsKFwiLm5vZGVcIikuY2xhc3NlZCgnc2VsZWN0ZWQnLCB0cnVlKTtcbiAgICB9XG5cbiAgICBhdXRvTGF5b3V0KHR5cGUsIHdpdGhvdXRTdGF0ZVNhdmluZyl7XG4gICAgICAgIHRoaXMubGF5b3V0LmF1dG9MYXlvdXQodHlwZSwgd2l0aG91dFN0YXRlU2F2aW5nKTtcbiAgICB9XG5cbiAgICB1cGRhdGVEaWFncmFtVGl0bGUodGl0bGVWYWx1ZSl7XG4gICAgICAgIGlmKCF0aXRsZVZhbHVlKXtcbiAgICAgICAgICAgIHRpdGxlVmFsdWUgPSAnJztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRpYWdyYW1UaXRsZSA9IHRpdGxlVmFsdWU7XG4gICAgICAgIHRoaXMucmVkcmF3RGlhZ3JhbVRpdGxlKCk7XG4gICAgICAgIHRoaXMucmVkcmF3RGlhZ3JhbURlc2NyaXB0aW9uKCk7XG4gICAgICAgIHRoaXMudXBkYXRlTWFyZ2luKHRydWUpO1xuICAgIH1cblxuICAgIHJlZHJhd0RpYWdyYW1UaXRsZSgpe1xuICAgICAgICB2YXIgc3ZnV2lkdGggPSB0aGlzLnN2Zy5hdHRyKCd3aWR0aCcpO1xuICAgICAgICB2YXIgc3ZnSGVpZ2h0ID0gdGhpcy5zdmcuYXR0cignaGVpZ2h0Jyk7XG4gICAgICAgIHRoaXMudGl0bGVDb250YWluZXIgPSB0aGlzLnN2Zy5zZWxlY3RPckFwcGVuZCgnZy5zZC10aXRsZS1jb250YWluZXInKTtcblxuICAgICAgICB2YXIgdGl0bGUgPSB0aGlzLnRpdGxlQ29udGFpbmVyLnNlbGVjdE9yQXBwZW5kKCd0ZXh0LnNkLXRpdGxlJyk7XG4gICAgICAgIHRpdGxlLnRleHQodGhpcy5kaWFncmFtVGl0bGUpO1xuICAgICAgICBMYXlvdXQuc2V0SGFuZ2luZ1Bvc2l0aW9uKHRpdGxlKTtcblxuICAgICAgICB2YXIgbWFyZ2luVG9wID0gcGFyc2VJbnQodGhpcy5jb25maWcudGl0bGUubWFyZ2luLnRvcCk7XG4gICAgICAgIHRoaXMudGl0bGVDb250YWluZXIuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnKyhzdmdXaWR0aC8yKSsnLCcrKCBtYXJnaW5Ub3ApKycpJyk7XG4gICAgfVxuICAgIHJlZHJhd0RpYWdyYW1EZXNjcmlwdGlvbigpe1xuICAgICAgICB2YXIgc3ZnV2lkdGggPSB0aGlzLnN2Zy5hdHRyKCd3aWR0aCcpO1xuICAgICAgICB2YXIgc3ZnSGVpZ2h0ID0gdGhpcy5zdmcuYXR0cignaGVpZ2h0Jyk7XG4gICAgICAgIHRoaXMudGl0bGVDb250YWluZXIgPSB0aGlzLnN2Zy5zZWxlY3RPckFwcGVuZCgnZy5zZC10aXRsZS1jb250YWluZXInKTtcblxuICAgICAgICB2YXIgZGVzYyA9IHRoaXMudGl0bGVDb250YWluZXIuc2VsZWN0T3JBcHBlbmQoJ3RleHQuc2QtZGVzY3JpcHRpb24nKTtcblxuICAgICAgICBpZighdGhpcy5jb25maWcuZGVzY3JpcHRpb24uc2hvdyl7XG4gICAgICAgICAgICBkZXNjLnJlbW92ZSgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGxpbmVzID0gdGhpcy5kaWFncmFtRGVzY3JpcHRpb24gPyB0aGlzLmRpYWdyYW1EZXNjcmlwdGlvbi5zcGxpdCgnXFxuJykgOiBbXTtcbiAgICAgICAgdmFyIHRzcGFucyA9IGRlc2Muc2VsZWN0QWxsKCd0c3BhbicpLmRhdGEobGluZXMpO1xuICAgICAgICB0c3BhbnMuZW50ZXIoKS5hcHBlbmQoJ3RzcGFuJylcbiAgICAgICAgICAgIC5tZXJnZSh0c3BhbnMpXG4gICAgICAgICAgICAuaHRtbChsPT5BcHBVdGlscy5yZXBsYWNlVXJscyhBcHBVdGlscy5lc2NhcGVIdG1sKGwpKSlcbiAgICAgICAgICAgIC5hdHRyKCdkeScsIChkLGkpPT5pPjAgPyAnMS4xZW0nOiB1bmRlZmluZWQpXG4gICAgICAgICAgICAuYXR0cigneCcsICcwJyk7XG5cbiAgICAgICAgdHNwYW5zLmV4aXQoKS5yZW1vdmUoKTtcbiAgICAgICAgTGF5b3V0LnNldEhhbmdpbmdQb3NpdGlvbihkZXNjKTtcblxuICAgICAgICB2YXIgdGl0bGUgPSB0aGlzLnRpdGxlQ29udGFpbmVyLnNlbGVjdE9yQXBwZW5kKCd0ZXh0LnNkLXRpdGxlJyk7XG5cbiAgICAgICAgdmFyIG1hcmdpblRvcCA9IDA7XG4gICAgICAgIGlmKHRoaXMuZGlhZ3JhbVRpdGxlKXtcbiAgICAgICAgICAgIG1hcmdpblRvcCArPSB0aXRsZS5ub2RlKCkuZ2V0QkJveCgpLmhlaWdodDtcbiAgICAgICAgICAgIG1hcmdpblRvcCs9IE1hdGgubWF4KHBhcnNlSW50KHRoaXMuY29uZmlnLmRlc2NyaXB0aW9uLm1hcmdpbi50b3ApLCAwKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgZGVzYy5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKDAsJysoIG1hcmdpblRvcCkrJyknKTtcbiAgICB9XG5cbiAgICB1cGRhdGVEaWFncmFtRGVzY3JpcHRpb24oZGVzY3JpcHRpb25WYWx1ZSl7XG4gICAgICAgIGlmKCFkZXNjcmlwdGlvblZhbHVlKXtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uVmFsdWUgPSAnJztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRpYWdyYW1EZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uVmFsdWU7XG4gICAgICAgIHRoaXMucmVkcmF3RGlhZ3JhbVRpdGxlKCk7XG4gICAgICAgIHRoaXMucmVkcmF3RGlhZ3JhbURlc2NyaXB0aW9uKCk7XG4gICAgICAgIHRoaXMudXBkYXRlTWFyZ2luKHRydWUpO1xuICAgIH1cblxuXG4gICAgZ2V0VGl0bGVHcm91cEhlaWdodCh3aXRoTWFyZ2lucyl7XG4gICAgICAgIGlmKCF0aGlzLnRpdGxlQ29udGFpbmVyKXtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIHZhciBoID0gdGhpcy50aXRsZUNvbnRhaW5lci5ub2RlKCkuZ2V0QkJveCgpLmhlaWdodDtcbiAgICAgICAgaWYod2l0aE1hcmdpbnMpe1xuICAgICAgICAgICAgaCs9IHBhcnNlSW50KHRoaXMuY29uZmlnLnRpdGxlLm1hcmdpbi5ib3R0b20pO1xuICAgICAgICAgICAgaCs9IHBhcnNlSW50KHRoaXMuY29uZmlnLnRpdGxlLm1hcmdpbi50b3ApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBoO1xuICAgIH1cblxufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9zcmMvaW5kZXgnXG4iXX0=
