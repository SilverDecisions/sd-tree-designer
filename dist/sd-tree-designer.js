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
            var _this = this;

            var fontSize = 12;
            var x = this.config.nodeSize / 2 + 7;
            Layout.setHangingPosition(selection).attr('x', x).attr('y', function (d) {
                var items = d.displayValue('aggregatedPayoff');
                var number = _sdUtils.Utils.isArray(items) ? items.filter(function (it) {
                    return it !== undefined;
                }).length : 1;
                return -Math.max(number * fontSize + number > 1 ? 0 : 5, _this.config.nodeSize / 2) + (number > 1 ? 2 : 5);
            });

            selection.selectAll('tspan').attr('x', x);
            return selection;
            // .attr('text-anchor', 'middle')
            // .attr('dominant-baseline', 'hanging')
        }
    }, {
        key: 'nodeProbabilityToEnterPosition',
        value: function nodeProbabilityToEnterPosition(selection) {
            var fontSize = 12;
            return selection.attr('x', this.config.nodeSize / 2 + 7).attr('y', Math.max(fontSize + 5, this.config.nodeSize / 2) - 5);
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
            var fontSize = 12;
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
            var _this2 = this;

            this.onAutoLayoutChanged.forEach(function (c) {
                return c(_this2.config.type);
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

            this.mainGroup = this.svg.selectOrAppend('g.main-group');
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

            var brushContainer = self.brushContainer = this.brushContainer = this.svg.selectOrInsert("g.brush", ":first-child").attr("class", "brush");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLXV0aWxzLmpzIiwic3JjL2NvbnRleHQtbWVudS9jb250ZXh0LW1lbnUuanMiLCJzcmMvY29udGV4dC1tZW51L2VkZ2UtY29udGV4dC1tZW51LmpzIiwic3JjL2NvbnRleHQtbWVudS9tYWluLWNvbnRleHQtbWVudS5qcyIsInNyYy9jb250ZXh0LW1lbnUvbm9kZS1jb250ZXh0LW1lbnUuanMiLCJzcmMvY29udGV4dC1tZW51L3RleHQtY29udGV4dC1tZW51LmpzIiwic3JjL2QzLWV4dGVuc2lvbnMuanMiLCJzcmMvZDMuanMiLCJzcmMvaTE4bi9kZS5qc29uIiwic3JjL2kxOG4vZW4uanNvbiIsInNyYy9pMThuL2ZyLmpzb24iLCJzcmMvaTE4bi9pMThuLmpzIiwic3JjL2kxOG4vaXQuanNvbiIsInNyYy9pMThuL3BsLmpzb24iLCJzcmMvaW5kZXguanMiLCJzcmMvbGF5b3V0LmpzIiwic3JjL25vZGUtZHJhZy1oYW5kbGVyLmpzIiwic3JjL3N5bWJvbHMvY2lyY2xlLmpzIiwic3JjL3N5bWJvbHMvdHJpYW5nbGUuanMiLCJzcmMvdGVtcGxhdGVzLmpzIiwic3JjL3RlbXBsYXRlcy9ncm93bF9tZXNzYWdlLmh0bWwiLCJzcmMvdGV4dC1kcmFnLWhhbmRsZXIuanMiLCJzcmMvdG9vbHRpcC5qcyIsInNyYy90cmVlLWRlc2lnbmVyLmpzIiwiaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBOztJLEFBQVk7O0FBQ1o7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0ksQUFFYTs7Ozs7O2FBa0JUOzs7OEMsQUFDNkIsVyxBQUFXLFksQUFBWSxPQUFPLEFBQ3ZEO2dCQUFJLFVBQVUsVUFBZCxBQUFjLEFBQVUsQUFDeEI7b0JBQUEsQUFBUSxjQUFSLEFBQXNCLEFBRXRCOztnQkFBSSxTQUFKLEFBQWEsQUFDYjtn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OztnQkFBQTt3QkFBQTtzQkFBQTtBQUFBO0FBQUE7Ozs7O0FBQ0EsNENBQUE7aURBQUE7O2dCQUFBO3dCQUFBO3FCQUFBO0FBQUE7QUFBQTs7Ozs7QUFDQSw2Q0FBQTtpREFBQTs7Z0JBQUE7d0JBQUE7c0JBQUE7QUFBQTtBQUFBOzs7OztBQUNBLDZDQUFBO2lEQUFBOztnQkFBQTt3QkFBQTtzQkFBQTtBQUFBO0FBQUE7Ozs7O0FBQ0EsaURBQUE7aURBQUE7O2dCQUFBO3dCQUFBOzBCQUFBO0FBQUE7QUFBQTs7Ozs7QUFDQSxrREFBQTtpREFBQTs7Z0JBQUE7d0JBQUE7MkJBQUE7QUFBQTtBQUFBOzs7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUFFd0Isa0JBQWlCLEFBQ3RDO2dCQUFHLENBQUgsQUFBSSxrQkFBaUIsQUFDakI7bUNBQUEsQUFBbUIsQUFDdEI7QUFDRDtpQkFBQSxBQUFLLHFCQUFMLEFBQTBCLEFBQzFCO2lCQUFBLEFBQUssQUFDTDtpQkFBQSxBQUFLLEFBQ0w7aUJBQUEsQUFBSyxhQUFMLEFBQWtCLEFBQ3JCOzs7OzRDLEFBR21CLGFBQVksQUFDNUI7Z0JBQUcsQ0FBQyxLQUFKLEFBQVMsZ0JBQWUsQUFDcEI7dUJBQUEsQUFBTyxBQUNWO0FBQ0Q7Z0JBQUksSUFBSSxLQUFBLEFBQUssZUFBTCxBQUFvQixPQUFwQixBQUEyQixVQUFuQyxBQUE2QyxBQUM3QztnQkFBQSxBQUFHLGFBQVksQUFDWDtxQkFBSSxTQUFTLEtBQUEsQUFBSyxPQUFMLEFBQVksTUFBWixBQUFrQixPQUEvQixBQUFJLEFBQWtDLEFBQ3RDO3FCQUFJLFNBQVMsS0FBQSxBQUFLLE9BQUwsQUFBWSxNQUFaLEFBQWtCLE9BQS9CLEFBQUksQUFBa0MsQUFDekM7QUFDRDttQkFBQSxBQUFPLEFBQ1Y7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxNENMLDJDQUFBO2lEQUFBOztnQkFBQTt3QkFBQTtvQkFBQTtBQUFBO0FBQUEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0ICogYXMgZDMgZnJvbSBcIi4vZDNcIjtcbmltcG9ydCB7VGVtcGxhdGVzfSBmcm9tIFwiLi90ZW1wbGF0ZXNcIjtcbmltcG9ydCB7aTE4bn0gZnJvbSBcIi4vaTE4bi9pMThuXCI7XG5pbXBvcnQge1V0aWxzfSBmcm9tIFwic2QtdXRpbHNcIjtcblxuZXhwb3J0IGNsYXNzIEFwcFV0aWxzIHtcblxuICAgIHN0YXRpYyBzYW5pdGl6ZUhlaWdodCA9IGZ1bmN0aW9uIChoZWlnaHQsIGNvbnRhaW5lcikge1xuICAgICAgICByZXR1cm4gKGhlaWdodCB8fCBwYXJzZUludChjb250YWluZXIuc3R5bGUoJ2hlaWdodCcpLCAxMCkgfHwgNDAwKTtcbiAgICB9O1xuXG4gICAgc3RhdGljIHNhbml0aXplV2lkdGggPSBmdW5jdGlvbiAod2lkdGgsIGNvbnRhaW5lcikge1xuICAgICAgICByZXR1cm4gKHdpZHRoIHx8IHBhcnNlSW50KGNvbnRhaW5lci5zdHlsZSgnd2lkdGgnKSwgMTApIHx8IDk2MCk7XG4gICAgfTtcblxuICAgIHN0YXRpYyBhdmFpbGFibGVIZWlnaHQgPSBmdW5jdGlvbiAoaGVpZ2h0LCBjb250YWluZXIsIG1hcmdpbikge1xuICAgICAgICByZXR1cm4gTWF0aC5tYXgoMCwgQXBwVXRpbHMuc2FuaXRpemVIZWlnaHQoaGVpZ2h0LCBjb250YWluZXIpIC0gbWFyZ2luLnRvcCAtIG1hcmdpbi5ib3R0b20pO1xuICAgIH07XG5cbiAgICBzdGF0aWMgYXZhaWxhYmxlV2lkdGggPSBmdW5jdGlvbiAod2lkdGgsIGNvbnRhaW5lciwgbWFyZ2luKSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1heCgwLCBBcHBVdGlscy5zYW5pdGl6ZVdpZHRoKHdpZHRoLCBjb250YWluZXIpIC0gbWFyZ2luLmxlZnQgLSBtYXJnaW4ucmlnaHQpO1xuICAgIH07XG5cbiAgICAvL3BsYWNlcyB0ZXh0U3RyaW5nIGluIHRleHRPYmosIGFkZHMgYW4gZWxsaXBzaXMgaWYgdGV4dCBjYW4ndCBmaXQgaW4gd2lkdGhcbiAgICBzdGF0aWMgcGxhY2VUZXh0V2l0aEVsbGlwc2lzKHRleHREM09iaiwgdGV4dFN0cmluZywgd2lkdGgpIHtcbiAgICAgICAgdmFyIHRleHRPYmogPSB0ZXh0RDNPYmoubm9kZSgpO1xuICAgICAgICB0ZXh0T2JqLnRleHRDb250ZW50ID0gdGV4dFN0cmluZztcblxuICAgICAgICB2YXIgbWFyZ2luID0gMDtcbiAgICAgICAgdmFyIGVsbGlwc2lzTGVuZ3RoID0gOTtcbiAgICAgICAgLy9lbGxpcHNpcyBpcyBuZWVkZWRcbiAgICAgICAgaWYgKHRleHRPYmouZ2V0Q29tcHV0ZWRUZXh0TGVuZ3RoKCkgPiB3aWR0aCArIG1hcmdpbikge1xuICAgICAgICAgICAgZm9yICh2YXIgeCA9IHRleHRTdHJpbmcubGVuZ3RoIC0gMzsgeCA+IDA7IHggLT0gMSkge1xuICAgICAgICAgICAgICAgIGlmICh0ZXh0T2JqLmdldFN1YlN0cmluZ0xlbmd0aCgwLCB4KSArIGVsbGlwc2lzTGVuZ3RoIDw9IHdpZHRoICsgbWFyZ2luKSB7XG4gICAgICAgICAgICAgICAgICAgIHRleHRPYmoudGV4dENvbnRlbnQgPSB0ZXh0U3RyaW5nLnN1YnN0cmluZygwLCB4KSArIFwiLi4uXCI7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRleHRPYmoudGV4dENvbnRlbnQgPSBcIi4uLlwiOyAvL2Nhbid0IHBsYWNlIGF0IGFsbFxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHN0YXRpYyBwbGFjZVRleHRXaXRoRWxsaXBzaXNBbmRUb29sdGlwKHRleHREM09iaiwgdGV4dFN0cmluZywgd2lkdGgsIHRvb2x0aXApIHtcbiAgICAgICAgdmFyIGVsbGlwc2lzUGxhY2VkID0gQXBwVXRpbHMucGxhY2VUZXh0V2l0aEVsbGlwc2lzKHRleHREM09iaiwgdGV4dFN0cmluZywgd2lkdGgpO1xuICAgICAgICBpZiAoZWxsaXBzaXNQbGFjZWQgJiYgdG9vbHRpcCkge1xuICAgICAgICAgICAgdGV4dEQzT2JqLm9uKFwibW91c2VvdmVyXCIsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgdG9vbHRpcC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgICAgICAgICAgLmR1cmF0aW9uKDIwMClcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCAuOSk7XG4gICAgICAgICAgICAgICAgdG9vbHRpcC5odG1sKHRleHRTdHJpbmcpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcImxlZnRcIiwgKGQzLmV2ZW50LnBhZ2VYICsgNSkgKyBcInB4XCIpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcInRvcFwiLCAoZDMuZXZlbnQucGFnZVkgLSAyOCkgKyBcInB4XCIpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRleHREM09iai5vbihcIm1vdXNlb3V0XCIsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgdG9vbHRpcC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgICAgICAgICAgLmR1cmF0aW9uKDUwMClcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCAwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0Rm9udFNpemUoZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZShcImZvbnQtc2l6ZVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0VHJhbnNsYXRpb24odHJhbnNmb3JtKSB7XG4gICAgICAgIC8vIENyZWF0ZSBhIGR1bW15IGcgZm9yIGNhbGN1bGF0aW9uIHB1cnBvc2VzIG9ubHkuIFRoaXMgd2lsbCBuZXZlclxuICAgICAgICAvLyBiZSBhcHBlbmRlZCB0byB0aGUgRE9NIGFuZCB3aWxsIGJlIGRpc2NhcmRlZCBvbmNlIHRoaXMgZnVuY3Rpb25cbiAgICAgICAgLy8gcmV0dXJucy5cbiAgICAgICAgdmFyIGcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcImdcIik7XG5cbiAgICAgICAgLy8gU2V0IHRoZSB0cmFuc2Zvcm0gYXR0cmlidXRlIHRvIHRoZSBwcm92aWRlZCBzdHJpbmcgdmFsdWUuXG4gICAgICAgIGcuc2V0QXR0cmlidXRlTlMobnVsbCwgXCJ0cmFuc2Zvcm1cIiwgdHJhbnNmb3JtKTtcblxuICAgICAgICAvLyBjb25zb2xpZGF0ZSB0aGUgU1ZHVHJhbnNmb3JtTGlzdCBjb250YWluaW5nIGFsbCB0cmFuc2Zvcm1hdGlvbnNcbiAgICAgICAgLy8gdG8gYSBzaW5nbGUgU1ZHVHJhbnNmb3JtIG9mIHR5cGUgU1ZHX1RSQU5TRk9STV9NQVRSSVggYW5kIGdldFxuICAgICAgICAvLyBpdHMgU1ZHTWF0cml4LlxuICAgICAgICB2YXIgbWF0cml4ID0gZy50cmFuc2Zvcm0uYmFzZVZhbC5jb25zb2xpZGF0ZSgpLm1hdHJpeDtcblxuICAgICAgICAvLyBBcyBwZXIgZGVmaW5pdGlvbiB2YWx1ZXMgZSBhbmQgZiBhcmUgdGhlIG9uZXMgZm9yIHRoZSB0cmFuc2xhdGlvbi5cbiAgICAgICAgcmV0dXJuIFttYXRyaXguZSwgbWF0cml4LmZdO1xuICAgIH1cblxuXG4gICAgc3RhdGljIGNsb3Nlc3RQb2ludChwYXRoTm9kZSwgcG9pbnQpIHtcbiAgICAgICAgdmFyIHBhdGhMZW5ndGggPSBwYXRoTm9kZS5nZXRUb3RhbExlbmd0aCgpLFxuICAgICAgICAgICAgcHJlY2lzaW9uID0gOCxcbiAgICAgICAgICAgIGJlc3QsXG4gICAgICAgICAgICBiZXN0TGVuZ3RoLFxuICAgICAgICAgICAgYmVzdERpc3RhbmNlID0gSW5maW5pdHk7XG5cbiAgICAgICAgLy8gbGluZWFyIHNjYW4gZm9yIGNvYXJzZSBhcHByb3hpbWF0aW9uXG4gICAgICAgIGZvciAodmFyIHNjYW4sIHNjYW5MZW5ndGggPSAwLCBzY2FuRGlzdGFuY2U7IHNjYW5MZW5ndGggPD0gcGF0aExlbmd0aDsgc2Nhbkxlbmd0aCArPSBwcmVjaXNpb24pIHtcbiAgICAgICAgICAgIGlmICgoc2NhbkRpc3RhbmNlID0gZGlzdGFuY2UyKHNjYW4gPSBwYXRoTm9kZS5nZXRQb2ludEF0TGVuZ3RoKHNjYW5MZW5ndGgpKSkgPCBiZXN0RGlzdGFuY2UpIHtcbiAgICAgICAgICAgICAgICBiZXN0ID0gc2NhbiwgYmVzdExlbmd0aCA9IHNjYW5MZW5ndGgsIGJlc3REaXN0YW5jZSA9IHNjYW5EaXN0YW5jZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGJpbmFyeSBzZWFyY2ggZm9yIHByZWNpc2UgZXN0aW1hdGVcbiAgICAgICAgcHJlY2lzaW9uIC89IDI7XG4gICAgICAgIHdoaWxlIChwcmVjaXNpb24gPiAwLjUpIHtcbiAgICAgICAgICAgIHZhciBiZWZvcmUsXG4gICAgICAgICAgICAgICAgYWZ0ZXIsXG4gICAgICAgICAgICAgICAgYmVmb3JlTGVuZ3RoLFxuICAgICAgICAgICAgICAgIGFmdGVyTGVuZ3RoLFxuICAgICAgICAgICAgICAgIGJlZm9yZURpc3RhbmNlLFxuICAgICAgICAgICAgICAgIGFmdGVyRGlzdGFuY2U7XG4gICAgICAgICAgICBpZiAoKGJlZm9yZUxlbmd0aCA9IGJlc3RMZW5ndGggLSBwcmVjaXNpb24pID49IDAgJiYgKGJlZm9yZURpc3RhbmNlID0gZGlzdGFuY2UyKGJlZm9yZSA9IHBhdGhOb2RlLmdldFBvaW50QXRMZW5ndGgoYmVmb3JlTGVuZ3RoKSkpIDwgYmVzdERpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgYmVzdCA9IGJlZm9yZSwgYmVzdExlbmd0aCA9IGJlZm9yZUxlbmd0aCwgYmVzdERpc3RhbmNlID0gYmVmb3JlRGlzdGFuY2U7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKChhZnRlckxlbmd0aCA9IGJlc3RMZW5ndGggKyBwcmVjaXNpb24pIDw9IHBhdGhMZW5ndGggJiYgKGFmdGVyRGlzdGFuY2UgPSBkaXN0YW5jZTIoYWZ0ZXIgPSBwYXRoTm9kZS5nZXRQb2ludEF0TGVuZ3RoKGFmdGVyTGVuZ3RoKSkpIDwgYmVzdERpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgYmVzdCA9IGFmdGVyLCBiZXN0TGVuZ3RoID0gYWZ0ZXJMZW5ndGgsIGJlc3REaXN0YW5jZSA9IGFmdGVyRGlzdGFuY2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHByZWNpc2lvbiAvPSAyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgYmVzdCA9IFtiZXN0LngsIGJlc3QueV07XG4gICAgICAgIGJlc3QuZGlzdGFuY2UgPSBNYXRoLnNxcnQoYmVzdERpc3RhbmNlKTtcbiAgICAgICAgcmV0dXJuIGJlc3Q7XG5cbiAgICAgICAgZnVuY3Rpb24gZGlzdGFuY2UyKHApIHtcbiAgICAgICAgICAgIHZhciBkeCA9IHAueCAtIHBvaW50WzBdLFxuICAgICAgICAgICAgICAgIGR5ID0gcC55IC0gcG9pbnRbMV07XG4gICAgICAgICAgICByZXR1cm4gZHggKiBkeCArIGR5ICogZHk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgZ3Jvd2wobWVzc2FnZSwgdHlwZT0naW5mbycsIHBvc2l0aW9uPSdyaWdodCcsIHRpbWUgPSAyMDAwKXtcbiAgICAgICAgdmFyIGh0bWwgPSBUZW1wbGF0ZXMuZ2V0KCdncm93bCcsIHttZXNzYWdlOm1lc3NhZ2UsIHR5cGU6dHlwZX0pXG5cbiAgICAgICAgdmFyIGcgPSBkMy5zZWxlY3QoJ2JvZHknKS5zZWxlY3RPckFwcGVuZCgnZGl2LnNkLWdyb3dsLWxpc3QuJytwb3NpdGlvbikuYXBwZW5kKCdkaXYnKS5odG1sKGh0bWwpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBnLnJlbW92ZSgpO1xuICAgICAgICB9LCB0aW1lKVxuICAgIH1cblxuXG4gICAgc3RhdGljIGNyZWF0ZUVsZW1lbnQodGFnLCBhdHRyaWJzLCBwYXJlbnQpIHtcbiAgICAgICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xuXG4gICAgICAgIGlmIChhdHRyaWJzKSB7XG4gICAgICAgICAgICBBcHBVdGlscy5kZWVwRXh0ZW5kKGVsLCBhdHRyaWJzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGFyZW50KSB7XG4gICAgICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoZWwpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbDtcbiAgICB9O1xuXG4gICAgc3RhdGljIHJlbW92ZUVsZW1lbnQoZWxlbWVudCkge1xuICAgICAgICBlbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XG4gICAgfVxuXG4gICAgc3RhdGljIHJlcGxhY2VVcmxzKHRleHQpe1xuICAgICAgICBpZighdGV4dCl7XG4gICAgICAgICAgICByZXR1cm4gdGV4dDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdXJsUmVnZXhwID0gLygoZnRwfGh0dHB8aHR0cHMpOlxcL1xcLyhcXHcrOnswLDF9XFx3KkApPyhcXFMrKSg6WzAtOV0rKT8oXFwvfFxcLyhbXFx3IyE6Lj8rPSYlQCFcXC1cXC9dKSk/KS9cblxuICAgICAgICByZXR1cm4gdGV4dC5yZXBsYWNlKHVybFJlZ2V4cCwgJzxhIGhyZWY9XCIkMVwiIHRhcmdldD1cIl9ibGFua1wiPiQxPC9hPicpO1xuICAgIH1cblxuICAgIHN0YXRpYyBlc2NhcGVIdG1sKGh0bWwpXG4gICAge1xuICAgICAgICB2YXIgdGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGh0bWwpO1xuICAgICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZCh0ZXh0KTtcbiAgICAgICAgcmV0dXJuIGRpdi5pbm5lckhUTUw7XG4gICAgfVxuXG4gICAgc3RhdGljIGRpc3BhdGNoSHRtbEV2ZW50KGVsZW1lbnQsIG5hbWUpe1xuICAgICAgICBpZiAoXCJjcmVhdGVFdmVudFwiIGluIGRvY3VtZW50KSB7XG4gICAgICAgICAgICB2YXIgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJIVE1MRXZlbnRzXCIpO1xuICAgICAgICAgICAgZXZ0LmluaXRFdmVudChuYW1lLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICAgICAgICBlbGVtZW50LmRpc3BhdGNoRXZlbnQoZXZ0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBlbGVtZW50LmZpcmVFdmVudChcIm9uXCIrbmFtZSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGRpc3BhdGNoRXZlbnQobmFtZSwgZGF0YSl7XG4gICAgICAgIHZhciBldmVudDtcbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgZXZlbnQgPSBuZXcgIEN1c3RvbUV2ZW50KG5hbWUseyAnZGV0YWlsJzogZGF0YSB9KTtcbiAgICAgICAgfWNhdGNoIChlKXsgLy9JRVxuICAgICAgICAgICAgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcbiAgICAgICAgICAgIGV2ZW50LmluaXRDdXN0b21FdmVudChuYW1lLCBmYWxzZSwgZmFsc2UsIGRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXRWYWxpZGF0aW9uTWVzc2FnZShlcnJvcil7XG4gICAgICAgIGlmKFV0aWxzLmlzU3RyaW5nKGVycm9yKSl7XG4gICAgICAgICAgICBlcnJvciA9IHtuYW1lOiBlcnJvcn07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGtleSA9ICd2YWxpZGF0aW9uLicgKyBlcnJvci5uYW1lO1xuICAgICAgICByZXR1cm4gaTE4bi50KGtleSwgZXJyb3IuZGF0YSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGhpZGUoc2VsZWN0aW9uKXtcbiAgICAgICAgc2VsZWN0aW9uLmNsYXNzZWQoJ3NkLWhpZGRlbicsIHRydWUpO1xuICAgIH1cblxuICAgIHN0YXRpYyBzaG93KHNlbGVjdGlvbiwgc2hvdz10cnVlKXtcbiAgICAgICAgc2VsZWN0aW9uLmNsYXNzZWQoJ3NkLWhpZGRlbicsICFzaG93KTtcbiAgICB9XG5cblxuXG4gICAgc3RhdGljIGlzSGlkZGVuKGVsLCBleGFjdCA9IHRydWUpIHtcbiAgICAgICAgaWYoIWVsKXtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmKGV4YWN0KXtcbiAgICAgICAgICAgIHZhciBzdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsKTtcbiAgICAgICAgICAgIHJldHVybiAoc3R5bGUuZGlzcGxheSA9PT0gJ25vbmUnKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoZWwub2Zmc2V0UGFyZW50ID09PSBudWxsKVxuICAgIH1cbn1cbiIsImltcG9ydCAqIGFzIGQzIGZyb20gJy4uL2QzJ1xuXG4vKmJhc2VkIG9uOlxuICogZ2l0aHViLmNvbS9wYXRvcmprL2QzLWNvbnRleHQtbWVudSAqL1xuXG5leHBvcnQgY2xhc3MgQ29udGV4dE1lbnUge1xuICAgIG9wZW5DYWxsYmFjaztcbiAgICBjbG9zZUNhbGxiYWNrO1xuXG4gICAgY29uc3RydWN0b3IobWVudSwgb3B0cykge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBvcHRzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBzZWxmLm9wZW5DYWxsYmFjayA9IG9wdHM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgICAgICAgICAgIHNlbGYub3BlbkNhbGxiYWNrID0gb3B0cy5vbk9wZW47XG4gICAgICAgICAgICBzZWxmLmNsb3NlQ2FsbGJhY2sgPSBvcHRzLm9uQ2xvc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjcmVhdGUgdGhlIGRpdiBlbGVtZW50IHRoYXQgd2lsbCBob2xkIHRoZSBjb250ZXh0IG1lbnVcbiAgICAgICAgZDMuc2VsZWN0QWxsKCcuZDMtY29udGV4dC1tZW51JykuZGF0YShbMV0pXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdkMy1jb250ZXh0LW1lbnUnKTtcblxuICAgICAgICAvLyBjbG9zZSBtZW51XG4gICAgICAgIGQzLnNlbGVjdCgnYm9keScpLm9uKCdjbGljay5kMy1jb250ZXh0LW1lbnUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBkMy5zZWxlY3QoJy5kMy1jb250ZXh0LW1lbnUnKS5zdHlsZSgnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICBpZiAoc2VsZi5jbG9zZUNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5jbG9zZUNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHRoaXMgZ2V0cyBleGVjdXRlZCB3aGVuIGEgY29udGV4dG1lbnUgZXZlbnQgb2NjdXJzXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZGF0YSwgaW5kZXgpIHtcbiAgICAgICAgICAgIHZhciBlbG0gPSB0aGlzO1xuXG4gICAgICAgICAgICBkMy5zZWxlY3RBbGwoJy5kMy1jb250ZXh0LW1lbnUnKS5odG1sKCcnKTtcbiAgICAgICAgICAgIHZhciBsaXN0ID0gZDMuc2VsZWN0QWxsKCcuZDMtY29udGV4dC1tZW51JylcbiAgICAgICAgICAgICAgICAub24oJ2NvbnRleHRtZW51JywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KCcuZDMtY29udGV4dC1tZW51Jykuc3R5bGUoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgICAgICAgICBkMy5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBkMy5ldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJ3VsJyk7XG4gICAgICAgICAgICBsaXN0LnNlbGVjdEFsbCgnbGknKS5kYXRhKHR5cGVvZiBtZW51ID09PSAnZnVuY3Rpb24nID8gbWVudShkYXRhKSA6IG1lbnUpLmVudGVyKClcbiAgICAgICAgICAgICAgICAuYXBwZW5kKCdsaScpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJldCA9ICcnO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZC5kaXZpZGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXQgKz0gJyBpcy1kaXZpZGVyJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoZC5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0ICs9ICcgaXMtZGlzYWJsZWQnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICghZC5hY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldCArPSAnIGlzLWhlYWRlcic7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5odG1sKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkLmRpdmlkZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnPGhyPic7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFkLnRpdGxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdObyB0aXRsZSBhdHRyaWJ1dGUgc2V0LiBDaGVjayB0aGUgc3BlbGxpbmcgb2YgeW91ciBvcHRpb25zLicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAodHlwZW9mIGQudGl0bGUgPT09ICdzdHJpbmcnKSA/IGQudGl0bGUgOiBkLnRpdGxlKGRhdGEpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkLmRpc2FibGVkKSByZXR1cm47IC8vIGRvIG5vdGhpbmcgaWYgZGlzYWJsZWRcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFkLmFjdGlvbikgcmV0dXJuOyAvLyBoZWFkZXJzIGhhdmUgbm8gXCJhY3Rpb25cIlxuICAgICAgICAgICAgICAgICAgICBkLmFjdGlvbihlbG0sIGRhdGEsIGluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KCcuZDMtY29udGV4dC1tZW51Jykuc3R5bGUoJ2Rpc3BsYXknLCAnbm9uZScpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLmNsb3NlQ2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY2xvc2VDYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIHRoZSBvcGVuQ2FsbGJhY2sgYWxsb3dzIGFuIGFjdGlvbiB0byBmaXJlIGJlZm9yZSB0aGUgbWVudSBpcyBkaXNwbGF5ZWRcbiAgICAgICAgICAgIC8vIGFuIGV4YW1wbGUgdXNhZ2Ugd291bGQgYmUgY2xvc2luZyBhIHRvb2x0aXBcbiAgICAgICAgICAgIGlmIChzZWxmLm9wZW5DYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLm9wZW5DYWxsYmFjayhkYXRhLCBpbmRleCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGRpc3BsYXkgY29udGV4dCBtZW51XG4gICAgICAgICAgICBkMy5zZWxlY3QoJy5kMy1jb250ZXh0LW1lbnUnKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnbGVmdCcsIChkMy5ldmVudC5wYWdlWCAtIDIpICsgJ3B4JylcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3RvcCcsIChkMy5ldmVudC5wYWdlWSAtIDIpICsgJ3B4JylcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2Rpc3BsYXknLCAnYmxvY2snKTtcblxuICAgICAgICAgICAgZDMuZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGQzLmV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBzdGF0aWMgaGlkZSgpIHtcbiAgICAgICAgZDMuc2VsZWN0KCcuZDMtY29udGV4dC1tZW51Jykuc3R5bGUoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHtDb250ZXh0TWVudX0gZnJvbSAnLi9jb250ZXh0LW1lbnUnXG5pbXBvcnQge2kxOG59IGZyb20gXCIuLi9pMThuL2kxOG5cIjtcblxuZXhwb3J0IGNsYXNzIEVkZ2VDb250ZXh0TWVudSBleHRlbmRzIENvbnRleHRNZW51IHtcbiAgICB0cmVlRGVzaWduZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcih0cmVlRGVzaWduZXIpIHtcbiAgICAgICAgdmFyIG1lbnUgPSBmdW5jdGlvbiAoZCkge1xuXG4gICAgICAgICAgICB2YXIgbWVudSA9IFtdO1xuXG4gICAgICAgICAgICBtZW51LnB1c2goe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51LmVkZ2UuaW5qZWN0RGVjaXNpb25Ob2RlJyksXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5pbmplY3REZWNpc2lvbk5vZGUoZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG1lbnUucHVzaCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUuZWRnZS5pbmplY3RDaGFuY2VOb2RlJyksXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5pbmplY3RDaGFuY2VOb2RlKGQpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgcmV0dXJuIG1lbnU7XG4gICAgICAgIH07XG5cbiAgICAgICAgc3VwZXIobWVudSk7XG4gICAgICAgIHRoaXMudHJlZURlc2lnbmVyID0gdHJlZURlc2lnbmVyO1xuICAgIH1cbn1cbiIsImltcG9ydCB7Q29udGV4dE1lbnV9IGZyb20gJy4vY29udGV4dC1tZW51J1xuaW1wb3J0IHtkb21haW4gYXMgbW9kZWx9IGZyb20gJ3NkLW1vZGVsJ1xuaW1wb3J0ICogYXMgZDMgZnJvbSAnLi4vZDMnXG5pbXBvcnQge2kxOG59IGZyb20gXCIuLi9pMThuL2kxOG5cIjtcblxuZXhwb3J0IGNsYXNzIE1haW5Db250ZXh0TWVudSBleHRlbmRzIENvbnRleHRNZW51IHtcbiAgICB0cmVlRGVzaWduZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcih0cmVlRGVzaWduZXIpIHtcbiAgICAgICAgdmFyIG1vdXNlUG9zaXRpb24gPSBudWxsO1xuICAgICAgICB2YXIgbWVudSA9IGZ1bmN0aW9uIChkKSB7XG5cbiAgICAgICAgICAgIHZhciBtZW51ID0gW107XG4gICAgICAgICAgICBtZW51LnB1c2goe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm1haW4uYWRkRGVjaXNpb25Ob2RlJyksXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdOb2RlID0gbmV3IG1vZGVsLkRlY2lzaW9uTm9kZShtb3VzZVBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLmFkZE5vZGUobmV3Tm9kZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG1lbnUucHVzaCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubWFpbi5hZGRDaGFuY2VOb2RlJyksXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdOb2RlID0gbmV3IG1vZGVsLkNoYW5jZU5vZGUobW91c2VQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5hZGROb2RlKG5ld05vZGUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBtZW51LnB1c2goe2RpdmlkZXI6IHRydWV9KTtcbiAgICAgICAgICAgIG1lbnUucHVzaCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubWFpbi5hZGRUZXh0JyksXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdUZXh0ID0gbmV3IG1vZGVsLlRleHQobW91c2VQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5hZGRUZXh0KG5ld1RleHQpO1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbWVudS5wdXNoKHtkaXZpZGVyOiB0cnVlfSk7XG4gICAgICAgICAgICBtZW51LnB1c2goe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm1haW4ucGFzdGUnKSxcbiAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLnBhc3RlVG9OZXdMb2NhdGlvbihtb3VzZVBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhdHJlZURlc2lnbmVyLmNvcGllZE5vZGVzIHx8ICF0cmVlRGVzaWduZXIuY29waWVkTm9kZXMubGVuZ3RoXG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbWVudS5wdXNoKHtkaXZpZGVyOiB0cnVlfSk7XG5cbiAgICAgICAgICAgIG1lbnUucHVzaCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubWFpbi5zZWxlY3RBbGxOb2RlcycpLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuc2VsZWN0QWxsTm9kZXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBtZW51O1xuICAgICAgICB9O1xuXG4gICAgICAgIHN1cGVyKG1lbnUsIHtvbk9wZW46ICgpID0+IHtcbiAgICAgICAgICAgIHRyZWVEZXNpZ25lci5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICAgICAgbW91c2VQb3NpdGlvbiA9IG5ldyBtb2RlbC5Qb2ludChkMy5tb3VzZSh0cmVlRGVzaWduZXIuc3ZnLm5vZGUoKSkpLm1vdmUodHJlZURlc2lnbmVyLmdldE1haW5Hcm91cFRyYW5zbGF0aW9uKHRydWUpKTtcblxuICAgICAgICB9fSk7XG4gICAgICAgIHRoaXMudHJlZURlc2lnbmVyID0gdHJlZURlc2lnbmVyO1xuICAgIH1cbn1cbiIsImltcG9ydCB7Q29udGV4dE1lbnV9IGZyb20gJy4vY29udGV4dC1tZW51J1xuaW1wb3J0IHtkb21haW4gYXMgbW9kZWx9IGZyb20gJ3NkLW1vZGVsJ1xuaW1wb3J0IHtpMThufSBmcm9tIFwiLi4vaTE4bi9pMThuXCI7XG5cbmV4cG9ydCBjbGFzcyBOb2RlQ29udGV4dE1lbnUgZXh0ZW5kcyBDb250ZXh0TWVudSB7XG4gICAgdHJlZURlc2lnbmVyO1xuXG4gICAgY29uc3RydWN0b3IodHJlZURlc2lnbmVyLCBvcGVyYXRpb25zRm9yT2JqZWN0KSB7XG4gICAgICAgIHZhciBtZW51ID0gZnVuY3Rpb24gKGQpIHtcblxuICAgICAgICAgICAgdmFyIGNvcHlNZW51SXRlbSA9IHtcbiAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5ub2RlLmNvcHknKSxcbiAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLnNlbGVjdE5vZGUoZCwgIXRyZWVEZXNpZ25lci5pc05vZGVTZWxlY3RlZChkKSk7XG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5jb3B5U2VsZWN0ZWROb2RlcygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB2YXIgY3V0TWVudUl0ZW0gPSB7XG4gICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubm9kZS5jdXQnKSxcbiAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLnNlbGVjdE5vZGUoZCwgIXRyZWVEZXNpZ25lci5pc05vZGVTZWxlY3RlZChkKSk7XG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5jdXRTZWxlY3RlZE5vZGVzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZhciBwYXN0ZU1lbnVJdGVtID0ge1xuICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm5vZGUucGFzdGUnKSxcbiAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLnBhc3RlVG9Ob2RlKGQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGQuZm9sZGVkIHx8ICF0cmVlRGVzaWduZXIuY29waWVkTm9kZXMgfHwgIXRyZWVEZXNpZ25lci5jb3BpZWROb2Rlcy5sZW5ndGhcblxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZhciBkZWxldGVNZW51SXRlbSA9IHtcbiAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5ub2RlLmRlbGV0ZScpLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5zZWxlY3ROb2RlKGQsICF0cmVlRGVzaWduZXIuaXNOb2RlU2VsZWN0ZWQoZCkpO1xuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIucmVtb3ZlU2VsZWN0ZWROb2RlcygpO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIG1lbnUgPSBbXTtcbiAgICAgICAgICAgIGlmIChkLnR5cGUgPT0gbW9kZWwuVGVybWluYWxOb2RlLiRUWVBFKSB7XG4gICAgICAgICAgICAgICAgbWVudSA9IFtjb3B5TWVudUl0ZW0sIGN1dE1lbnVJdGVtLCBkZWxldGVNZW51SXRlbV07XG4gICAgICAgICAgICAgICAgTm9kZUNvbnRleHRNZW51LmFkZE5vZGVDb252ZXJzaW9uT3B0aW9ucyhkLCBtZW51LCB0cmVlRGVzaWduZXIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBtZW51O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZighZC5mb2xkZWQpe1xuICAgICAgICAgICAgICAgIG1lbnUucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm5vZGUuYWRkRGVjaXNpb25Ob2RlJyksXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLmFkZERlY2lzaW9uTm9kZShkKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbWVudS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubm9kZS5hZGRDaGFuY2VOb2RlJyksXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLmFkZENoYW5jZU5vZGUoZClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIG1lbnUucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm5vZGUuYWRkVGVybWluYWxOb2RlJyksXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLmFkZFRlcm1pbmFsTm9kZShkKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbWVudS5wdXNoKHtkaXZpZGVyOiB0cnVlfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG1lbnUucHVzaChjb3B5TWVudUl0ZW0pO1xuICAgICAgICAgICAgbWVudS5wdXNoKGN1dE1lbnVJdGVtKTtcbiAgICAgICAgICAgIG1lbnUucHVzaChwYXN0ZU1lbnVJdGVtKTtcbiAgICAgICAgICAgIG1lbnUucHVzaChkZWxldGVNZW51SXRlbSk7XG5cbiAgICAgICAgICAgIE5vZGVDb250ZXh0TWVudS5hZGROb2RlQ29udmVyc2lvbk9wdGlvbnMoZCwgbWVudSwgdHJlZURlc2lnbmVyKTtcbiAgICAgICAgICAgIG1lbnUucHVzaCh7ZGl2aWRlcjogdHJ1ZX0pO1xuICAgICAgICAgICAgbWVudS5wdXNoKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5ub2RlLnNlbGVjdFN1YnRyZWUnKSxcbiAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLnNlbGVjdFN1YlRyZWUoZCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmKCFkLmZvbGRlZCl7XG4gICAgICAgICAgICAgICAgbWVudS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubm9kZS5mb2xkJyksXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLmZvbGRTdWJ0cmVlKGQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBtZW51LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5ub2RlLnVuZm9sZCcpLFxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5mb2xkU3VidHJlZShkLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYob3BlcmF0aW9uc0Zvck9iamVjdCl7XG4gICAgICAgICAgICAgICAgdmFyIG9wZXJhdGlvbnMgPSBvcGVyYXRpb25zRm9yT2JqZWN0KGQpO1xuICAgICAgICAgICAgICAgIGlmKG9wZXJhdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIG1lbnUucHVzaCh7ZGl2aWRlcjogdHJ1ZX0pO1xuICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25zLmZvckVhY2gob3A9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbnUucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubm9kZS4nK29wLm5hbWUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIucGVyZm9ybU9wZXJhdGlvbihkLCBvcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogIW9wLmNhblBlcmZvcm0oZClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG1lbnU7XG4gICAgICAgIH07XG5cbiAgICAgICAgc3VwZXIobWVudSk7XG4gICAgICAgIHRoaXMudHJlZURlc2lnbmVyID0gdHJlZURlc2lnbmVyO1xuICAgIH1cblxuICAgIHN0YXRpYyBhZGROb2RlQ29udmVyc2lvbk9wdGlvbnMoZCwgbWVudSwgdHJlZURlc2lnbmVyKXtcbiAgICAgICAgdmFyIGNvbnZlcnNpb25PcHRpb25zID0gTm9kZUNvbnRleHRNZW51LmdldE5vZGVDb252ZXJzaW9uT3B0aW9ucyhkLCB0cmVlRGVzaWduZXIpO1xuICAgICAgICBpZihjb252ZXJzaW9uT3B0aW9ucy5sZW5ndGgpe1xuICAgICAgICAgICAgbWVudS5wdXNoKHtkaXZpZGVyOiB0cnVlfSk7XG4gICAgICAgICAgICBjb252ZXJzaW9uT3B0aW9ucy5mb3JFYWNoKG89Pm1lbnUucHVzaChvKSk7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBnZXROb2RlQ29udmVyc2lvbk9wdGlvbnMoZCwgdHJlZURlc2lnbmVyKXtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSBbXTtcbiAgICAgICAgdmFyIGFsbEFsbG93ZWRUeXBlcyA9IFttb2RlbC5EZWNpc2lvbk5vZGUuJFRZUEUsIG1vZGVsLkNoYW5jZU5vZGUuJFRZUEUsIG1vZGVsLlRlcm1pbmFsTm9kZS4kVFlQRV07XG5cbiAgICAgICAgaWYoIWQuY2hpbGRFZGdlcy5sZW5ndGggJiYgZC4kcGFyZW50KXtcbiAgICAgICAgICAgIGFsbEFsbG93ZWRUeXBlcy5maWx0ZXIodD0+dCE9PWQudHlwZSkuZm9yRWFjaCh0eXBlPT57XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5wdXNoKE5vZGVDb250ZXh0TWVudS5nZXROb2RlQ29udmVyc2lvbk9wdGlvbih0eXBlLCB0cmVlRGVzaWduZXIpKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBpZihkIGluc3RhbmNlb2YgbW9kZWwuRGVjaXNpb25Ob2RlKXtcbiAgICAgICAgICAgICAgICBvcHRpb25zLnB1c2goTm9kZUNvbnRleHRNZW51LmdldE5vZGVDb252ZXJzaW9uT3B0aW9uKG1vZGVsLkNoYW5jZU5vZGUuJFRZUEUsIHRyZWVEZXNpZ25lcikpXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBvcHRpb25zLnB1c2goTm9kZUNvbnRleHRNZW51LmdldE5vZGVDb252ZXJzaW9uT3B0aW9uKG1vZGVsLkRlY2lzaW9uTm9kZS4kVFlQRSwgdHJlZURlc2lnbmVyKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3B0aW9ucztcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0Tm9kZUNvbnZlcnNpb25PcHRpb24odHlwZVRvQ29udmVydFRvLCB0cmVlRGVzaWduZXIpe1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubm9kZS5jb252ZXJ0LicrdHlwZVRvQ29udmVydFRvKSxcbiAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5jb252ZXJ0Tm9kZShkLCB0eXBlVG9Db252ZXJ0VG8pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7Q29udGV4dE1lbnV9IGZyb20gJy4vY29udGV4dC1tZW51J1xuaW1wb3J0IHtpMThufSBmcm9tIFwiLi4vaTE4bi9pMThuXCI7XG5cbmV4cG9ydCBjbGFzcyBUZXh0Q29udGV4dE1lbnUgZXh0ZW5kcyBDb250ZXh0TWVudSB7XG4gICAgdHJlZURlc2lnbmVyO1xuXG4gICAgY29uc3RydWN0b3IodHJlZURlc2lnbmVyKSB7XG4gICAgICAgIHZhciBtZW51ID0gZnVuY3Rpb24gKGQpIHtcblxuXG4gICAgICAgICAgICB2YXIgZGVsZXRlTWVudUl0ZW0gPSB7XG4gICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUudGV4dC5kZWxldGUnKSxcbiAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcblxuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuc2VsZWN0VGV4dChkLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLnJlbW92ZVNlbGVjdGVkVGV4dHMoKVxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZhciBtZW51ID0gW107XG4gICAgICAgICAgICBtZW51LnB1c2goZGVsZXRlTWVudUl0ZW0pO1xuICAgICAgICAgICAgcmV0dXJuIG1lbnU7XG4gICAgICAgIH07XG5cbiAgICAgICAgc3VwZXIobWVudSk7XG4gICAgICAgIHRoaXMudHJlZURlc2lnbmVyID0gdHJlZURlc2lnbmVyO1xuICAgIH1cbn1cbiIsImltcG9ydCAqIGFzIGQzIGZyb20gJy4vZDMnXG5cbmV4cG9ydCBjbGFzcyBEM0V4dGVuc2lvbnMge1xuXG4gICAgc3RhdGljIGV4dGVuZCgpIHtcblxuICAgICAgICBkMy5zZWxlY3Rpb24ucHJvdG90eXBlLmVudGVyLnByb3RvdHlwZS5pbnNlcnRTZWxlY3RvciA9XG4gICAgICAgICAgICBkMy5zZWxlY3Rpb24ucHJvdG90eXBlLmluc2VydFNlbGVjdG9yID0gZnVuY3Rpb24gKHNlbGVjdG9yLCBiZWZvcmUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gRDNFeHRlbnNpb25zLmluc2VydFNlbGVjdG9yKHRoaXMsIHNlbGVjdG9yLCBiZWZvcmUpO1xuICAgICAgICAgICAgfTtcblxuXG4gICAgICAgIGQzLnNlbGVjdGlvbi5wcm90b3R5cGUuZW50ZXIucHJvdG90eXBlLmFwcGVuZFNlbGVjdG9yID1cbiAgICAgICAgICAgIGQzLnNlbGVjdGlvbi5wcm90b3R5cGUuYXBwZW5kU2VsZWN0b3IgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gRDNFeHRlbnNpb25zLmFwcGVuZFNlbGVjdG9yKHRoaXMsIHNlbGVjdG9yKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgZDMuc2VsZWN0aW9uLnByb3RvdHlwZS5lbnRlci5wcm90b3R5cGUuc2VsZWN0T3JBcHBlbmQgPVxuICAgICAgICAgICAgZDMuc2VsZWN0aW9uLnByb3RvdHlwZS5zZWxlY3RPckFwcGVuZCA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBEM0V4dGVuc2lvbnMuc2VsZWN0T3JBcHBlbmQodGhpcywgc2VsZWN0b3IpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICBkMy5zZWxlY3Rpb24ucHJvdG90eXBlLmVudGVyLnByb3RvdHlwZS5zZWxlY3RPckluc2VydCA9XG4gICAgICAgICAgICBkMy5zZWxlY3Rpb24ucHJvdG90eXBlLnNlbGVjdE9ySW5zZXJ0ID0gZnVuY3Rpb24gKHNlbGVjdG9yLCBiZWZvcmUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gRDNFeHRlbnNpb25zLnNlbGVjdE9ySW5zZXJ0KHRoaXMsIHNlbGVjdG9yLCBiZWZvcmUpO1xuICAgICAgICAgICAgfTtcblxuXG4gICAgfVxuXG4gICAgc3RhdGljIGluc2VydE9yQXBwZW5kU2VsZWN0b3IocGFyZW50LCBzZWxlY3Rvciwgb3BlcmF0aW9uLCBiZWZvcmUpIHtcblxuICAgICAgICB2YXIgc2VsZWN0b3JQYXJ0cyA9IHNlbGVjdG9yLnNwbGl0KC8oW1xcLlxcI10pLyk7XG4gICAgICAgIHZhciBlbGVtZW50ID0gcGFyZW50W29wZXJhdGlvbl0oc2VsZWN0b3JQYXJ0cy5zaGlmdCgpLCBiZWZvcmUpOy8vXCI6Zmlyc3QtY2hpbGRcIlxuXG4gICAgICAgIHdoaWxlIChzZWxlY3RvclBhcnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIHZhciBzZWxlY3Rvck1vZGlmaWVyID0gc2VsZWN0b3JQYXJ0cy5zaGlmdCgpO1xuICAgICAgICAgICAgdmFyIHNlbGVjdG9ySXRlbSA9IHNlbGVjdG9yUGFydHMuc2hpZnQoKTtcbiAgICAgICAgICAgIGlmIChzZWxlY3Rvck1vZGlmaWVyID09PSBcIi5cIikge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBlbGVtZW50LmNsYXNzZWQoc2VsZWN0b3JJdGVtLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2VsZWN0b3JNb2RpZmllciA9PT0gXCIjXCIpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5hdHRyKCdpZCcsIHNlbGVjdG9ySXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfVxuXG4gICAgc3RhdGljIGluc2VydFNlbGVjdG9yKHBhcmVudCwgc2VsZWN0b3IsIGJlZm9yZSkge1xuICAgICAgICByZXR1cm4gRDNFeHRlbnNpb25zLmluc2VydE9yQXBwZW5kU2VsZWN0b3IocGFyZW50LCBzZWxlY3RvciwgXCJpbnNlcnRcIiwgYmVmb3JlKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgYXBwZW5kU2VsZWN0b3IocGFyZW50LCBzZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gRDNFeHRlbnNpb25zLmluc2VydE9yQXBwZW5kU2VsZWN0b3IocGFyZW50LCBzZWxlY3RvciwgXCJhcHBlbmRcIik7XG4gICAgfVxuXG4gICAgc3RhdGljIHNlbGVjdE9yQXBwZW5kKHBhcmVudCwgc2VsZWN0b3IsIGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIHNlbGVjdGlvbiA9IHBhcmVudC5zZWxlY3Qoc2VsZWN0b3IpO1xuICAgICAgICBpZiAoc2VsZWN0aW9uLmVtcHR5KCkpIHtcbiAgICAgICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcmVudC5hcHBlbmQoZWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gRDNFeHRlbnNpb25zLmFwcGVuZFNlbGVjdG9yKHBhcmVudCwgc2VsZWN0b3IpO1xuXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNlbGVjdGlvbjtcbiAgICB9O1xuXG4gICAgc3RhdGljIHNlbGVjdE9ySW5zZXJ0KHBhcmVudCwgc2VsZWN0b3IsIGJlZm9yZSkge1xuICAgICAgICB2YXIgc2VsZWN0aW9uID0gcGFyZW50LnNlbGVjdChzZWxlY3Rvcik7XG4gICAgICAgIGlmIChzZWxlY3Rpb24uZW1wdHkoKSkge1xuICAgICAgICAgICAgcmV0dXJuIEQzRXh0ZW5zaW9ucy5pbnNlcnRTZWxlY3RvcihwYXJlbnQsIHNlbGVjdG9yLCBiZWZvcmUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzZWxlY3Rpb247XG4gICAgfTtcbn1cbiIsImV4cG9ydCAqIGZyb20gJ2QzLWRpc3BhdGNoJztcbmV4cG9ydCAqIGZyb20gJ2QzLXNjYWxlJztcbmV4cG9ydCAqIGZyb20gJ2QzLXNlbGVjdGlvbic7XG5leHBvcnQgKiBmcm9tICdkMy1zaGFwZSdcbmV4cG9ydCAqIGZyb20gJ2QzLWRyYWcnO1xuZXhwb3J0ICogZnJvbSAnZDMtYnJ1c2gnXG5leHBvcnQgKiBmcm9tICdkMy1hcnJheSdcbmV4cG9ydCAqIGZyb20gJ2QzLWhpZXJhcmNoeSdcbmV4cG9ydCAqIGZyb20gJ2QzLXRpbWUtZm9ybWF0J1xuIiwibW9kdWxlLmV4cG9ydHM9e1xuICAgIFwiY29udGV4dE1lbnVcIjp7XG4gICAgICAgIFwibWFpblwiOntcbiAgICAgICAgICAgIFwiYWRkRGVjaXNpb25Ob2RlXCI6IFwiRW50c2NoZWlkdW5nc2tub3RlbiBoaW56dWbDvGdlblwiLFxuICAgICAgICAgICAgXCJhZGRDaGFuY2VOb2RlXCI6IFwiWnVmYWxsIEtub3RlbiBoaW56dWbDvGdlblwiLFxuICAgICAgICAgICAgXCJhZGRUZXh0XCI6IFwiVGV4dCBoaW56dWbDvGdlbiBcIixcbiAgICAgICAgICAgIFwicGFzdGVcIjogXCJFaW5mw7xnZW5cIixcbiAgICAgICAgICAgIFwic2VsZWN0QWxsTm9kZXNcIjogXCJBbGxlIEtub3RlbiBhdXN3w6RobGVuXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJub2RlXCI6e1xuICAgICAgICAgICAgXCJjb3B5XCI6IFwiS29waWVyZW5cIixcbiAgICAgICAgICAgIFwiY3V0XCI6IFwiQXVzc2NobmVpZGVuXCIsXG4gICAgICAgICAgICBcInBhc3RlXCI6IFwiRWluZsO8Z2VuXCIsXG4gICAgICAgICAgICBcImRlbGV0ZVwiOiBcIkzDtnNjaGVuXCIsXG4gICAgICAgICAgICBcImFkZERlY2lzaW9uTm9kZVwiOiBcIkVudHNjaGVpZHVuZ3Nrbm90ZW4gaGluenVmw7xnZW5cIixcbiAgICAgICAgICAgIFwiYWRkQ2hhbmNlTm9kZVwiOiBcIlp1ZmFsbCBLbm90ZW4gaGluenVmw7xnZW5cIixcbiAgICAgICAgICAgIFwiYWRkVGVybWluYWxOb2RlXCI6IFwiRW5ka25vdHRlbiBoaW56dWbDvGdlblwiLFxuICAgICAgICAgICAgXCJjb252ZXJ0XCI6e1xuICAgICAgICAgICAgICAgIFwiZGVjaXNpb25cIjogXCJBbHMgRW50c2NoZWlkdW5nc2tub3RlblwiLFxuICAgICAgICAgICAgICAgIFwiY2hhbmNlXCI6IFwiQWxzIFp1ZmFsbCBLbm90ZW5cIixcbiAgICAgICAgICAgICAgICBcInRlcm1pbmFsXCI6IFwiQWxzIEVuZGtub3RlblwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJzZWxlY3RTdWJ0cmVlXCI6IFwiVGVpbGJhdW0gd8OkaGxlblwiLFxuICAgICAgICAgICAgXCJmbGlwU3VidHJlZVwiOiBcIlRlaWxiYXVtIHVtZHJlaGVuXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJlZGdlXCI6e1xuICAgICAgICAgICAgXCJpbmplY3REZWNpc2lvbk5vZGVcIjogXCJFbnRzY2hlaWR1bmdza25vdGVuIEluaml6aWVyZW5cIixcbiAgICAgICAgICAgIFwiaW5qZWN0Q2hhbmNlTm9kZVwiOiBcIlp1ZmFsbCBLbm90ZW4gSW5qaXppZXJlblwiXG4gICAgICAgIH0sXG4gICAgICAgIFwidGV4dFwiOntcbiAgICAgICAgICAgIFwiZGVsZXRlXCI6IFwiTMO2c2NoZW5cIlxuICAgICAgICB9XG4gICAgfSxcbiAgICBcInZhbGlkYXRpb25cIjp7XG4gICAgICAgIFwiaW5jb21wbGV0ZVBhdGhcIjogXCJQZmFkLCBkZXIgbmljaHQgbWl0IGRlbSBFbmRrbm90ZW4gZW5kZXRcIixcbiAgICAgICAgXCJwcm9iYWJpbGl0eURvTm90U3VtVXBUbzFcIjogXCJEaWUgU3VtbWUgZGVyIFdhaHJzY2hlaW5saWNoa2VpdGVuIGlzdCBuaWNodCBnbGVpY2ggMVwiLFxuICAgICAgICBcImludmFsaWRQcm9iYWJpbGl0eVwiOiBcIlVuZ8O8bHRpZ2UgV2FocnNjaGVpbmxpY2hrZWl0IGltIFp3ZWlnICN7e251bWJlcn19XCIsXG4gICAgICAgIFwiaW52YWxpZFBheW9mZlwiOiBcIlVuZ8O8bHRpZ2UgQXVzemFobHVuZyBpbiBad2VpZyAje3tudW1iZXJ9fVwiXG4gICAgfSxcbiAgICBcImdyb3dsXCI6e1xuICAgICAgICBcImJydXNoRGlzYWJsZWRcIjogXCJBdXN3YWhsYsO8cnN0ZSBkZWFrdGl2aWVydFwiLFxuICAgICAgICBcImJydXNoRW5hYmxlZFwiOiBcIkF1c3dhaGxiw7xyc3RlIGFrdGl2aWVydFwiXG4gICAgfSxcbiAgICBcInRvb2x0aXBcIjp7XG4gICAgICAgIFwibm9kZVwiOntcbiAgICAgICAgICAgIFwicGF5b2ZmXCI6IHtcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJBdXN6YWhsdW5nIHt7bnVtYmVyfX1cIixcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwie3tuYW1lfX1cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiYWdncmVnYXRlZFBheW9mZlwiOiB7XG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiQWdncmVnaWVydGUgQXVzemFobHVuZyB7e251bWJlcn19XCIsXG4gICAgICAgICAgICAgICAgXCJuYW1lZFwiOiBcIkFnZ3JlZ2llcnRlIHt7bmFtZX19XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInByb2JhYmlsaXR5VG9FbnRlclwiOiBcIldhaHJzY2hlaW5saWNoa2VpdFwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiZWRnZVwiOntcbiAgICAgICAgICAgIFwicGF5b2ZmXCI6IHtcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJBdXN6YWhsdW5nIHt7bnVtYmVyfX06IHt7dmFsdWV9fVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJ7e25hbWV9fToge3t2YWx1ZX19XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInByb2JhYmlsaXR5XCI6IFwiV2FocnNjaGVpbmxpY2hrZWl0OiB7e3ZhbHVlfX1cIlxuICAgICAgICB9XG4gICAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHM9e1xuICAgIFwiY29udGV4dE1lbnVcIjp7XG4gICAgICAgIFwibWFpblwiOntcbiAgICAgICAgICAgIFwiYWRkRGVjaXNpb25Ob2RlXCI6IFwiQWRkIERlY2lzaW9uIE5vZGVcIixcbiAgICAgICAgICAgIFwiYWRkQ2hhbmNlTm9kZVwiOiBcIkFkZCBDaGFuY2UgTm9kZVwiLFxuICAgICAgICAgICAgXCJhZGRUZXh0XCI6IFwiQWRkIFRleHRcIixcbiAgICAgICAgICAgIFwicGFzdGVcIjogXCJQYXN0ZVwiLFxuICAgICAgICAgICAgXCJzZWxlY3RBbGxOb2Rlc1wiOiBcIlNlbGVjdCBhbGwgbm9kZXNcIlxuICAgICAgICB9LFxuICAgICAgICBcIm5vZGVcIjp7XG4gICAgICAgICAgICBcImNvcHlcIjogXCJDb3B5XCIsXG4gICAgICAgICAgICBcImN1dFwiOiBcIkN1dFwiLFxuICAgICAgICAgICAgXCJwYXN0ZVwiOiBcIlBhc3RlXCIsXG4gICAgICAgICAgICBcImRlbGV0ZVwiOiBcIkRlbGV0ZVwiLFxuICAgICAgICAgICAgXCJhZGREZWNpc2lvbk5vZGVcIjogXCJBZGQgRGVjaXNpb24gTm9kZVwiLFxuICAgICAgICAgICAgXCJhZGRDaGFuY2VOb2RlXCI6IFwiQWRkIENoYW5jZSBOb2RlXCIsXG4gICAgICAgICAgICBcImFkZFRlcm1pbmFsTm9kZVwiOiBcIkFkZCBUZXJtaW5hbCBOb2RlXCIsXG4gICAgICAgICAgICBcImNvbnZlcnRcIjp7XG4gICAgICAgICAgICAgICAgXCJkZWNpc2lvblwiOiBcIkFzIERlY2lzaW9uIE5vZGVcIixcbiAgICAgICAgICAgICAgICBcImNoYW5jZVwiOiBcIkFzIENoYW5jZSBOb2RlXCIsXG4gICAgICAgICAgICAgICAgXCJ0ZXJtaW5hbFwiOiBcIkFzIFRlcm1pbmFsIE5vZGVcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwic2VsZWN0U3VidHJlZVwiOiBcIlNlbGVjdCBzdWJ0cmVlXCIsXG4gICAgICAgICAgICBcImZvbGRcIjogXCJGb2xkIHN1YnRyZWVcIixcbiAgICAgICAgICAgIFwidW5mb2xkXCI6IFwiVW5mb2xkIHN1YnRyZWVcIixcbiAgICAgICAgICAgIFwiZmxpcFN1YnRyZWVcIjogXCJGbGlwIHN1YnRyZWVcIlxuICAgICAgICB9LFxuICAgICAgICBcImVkZ2VcIjp7XG4gICAgICAgICAgICBcImluamVjdERlY2lzaW9uTm9kZVwiOiBcIkluamVjdCBEZWNpc2lvbiBOb2RlXCIsXG4gICAgICAgICAgICBcImluamVjdENoYW5jZU5vZGVcIjogXCJJbmplY3QgQ2hhbmNlIE5vZGVcIlxuICAgICAgICB9LFxuICAgICAgICBcInRleHRcIjp7XG4gICAgICAgICAgICBcImRlbGV0ZVwiOiBcIkRlbGV0ZVwiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwidmFsaWRhdGlvblwiOntcbiAgICAgICAgXCJpbmNvbXBsZXRlUGF0aFwiOiBcIlBhdGggbm90IGVuZGluZyB3aXRoIHRlcm1pbmFsIG5vZGVcIixcbiAgICAgICAgXCJwcm9iYWJpbGl0eURvTm90U3VtVXBUbzFcIjogXCJQcm9iYWJpbGl0aWVzIGRvIG5vdCBzdW0gdXAgdG8gMVwiLFxuICAgICAgICBcImludmFsaWRQcm9iYWJpbGl0eVwiOiBcIkludmFsaWQgcHJvYmFiaWxpdHkgaW4gZWRnZSAje3tudW1iZXJ9fVwiLFxuICAgICAgICBcImludmFsaWRQYXlvZmZcIjogXCJJbnZhbGlkIHBheW9mZiBpbiBlZGdlICN7e251bWJlcn19XCJcbiAgICB9LFxuICAgIFwiZ3Jvd2xcIjp7XG4gICAgICAgIFwiYnJ1c2hEaXNhYmxlZFwiOiBcIlNlbGVjdGlvbiBicnVzaCBkaXNhYmxlZFwiLFxuICAgICAgICBcImJydXNoRW5hYmxlZFwiOiBcIlNlbGVjdGlvbiBicnVzaCBlbmFibGVkXCJcbiAgICB9LFxuICAgIFwidG9vbHRpcFwiOntcbiAgICAgICAgXCJub2RlXCI6e1xuICAgICAgICAgICAgXCJwYXlvZmZcIjoge1xuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIlBheW9mZiB7e251bWJlcn19XCIsXG4gICAgICAgICAgICAgICAgXCJuYW1lZFwiOiBcInt7bmFtZX19XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImFnZ3JlZ2F0ZWRQYXlvZmZcIjoge1xuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIkFnZ3JlZ2F0ZWQgUGF5b2ZmIHt7bnVtYmVyfX1cIixcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwiQWdncmVnYXRlZCB7e25hbWV9fVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJwcm9iYWJpbGl0eVRvRW50ZXJcIjogXCJQcm9iYWJpbGl0eSB0byBlbnRlclwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiZWRnZVwiOntcbiAgICAgICAgICAgIFwicGF5b2ZmXCI6IHtcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJQYXlvZmYge3tudW1iZXJ9fToge3t2YWx1ZX19XCIsXG4gICAgICAgICAgICAgICAgXCJuYW1lZFwiOiBcInt7bmFtZX19OiB7e3ZhbHVlfX1cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwicHJvYmFiaWxpdHlcIjogXCJQcm9iYWJpbGl0eToge3t2YWx1ZX19XCJcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgICBcImNvbnRleHRNZW51XCI6e1xuICAgICAgICBcIm1haW5cIjp7XG4gICAgICAgICAgICBcImFkZERlY2lzaW9uTm9kZVwiOiBcIkFqb3V0ZXIgbm91ZCBkZSBkw6ljaXNpb25cIixcbiAgICAgICAgICAgIFwiYWRkQ2hhbmNlTm9kZVwiOiBcIkFqb3V0ZXIgbm91ZCBhbMOpYXRvaXJlXCIsXG4gICAgICAgICAgICBcImFkZFRleHRcIjogXCJBam91dGVyIGR1IHRleHRlXCIsXG4gICAgICAgICAgICBcInBhc3RlXCI6IFwiQ29sbGVyXCIsXG4gICAgICAgICAgICBcInNlbGVjdEFsbE5vZGVzXCI6IFwiU8OpbGVjdGlvbm5lciB0b3VzIGxlcyBub3Vkc1wiXG4gICAgICAgIH0sXG4gICAgICAgIFwibm9kZVwiOntcbiAgICAgICAgICAgIFwiY29weVwiOiBcIkNvcGllXCIsXG4gICAgICAgICAgICBcImN1dFwiOiBcIkNvdXBlclwiLFxuICAgICAgICAgICAgXCJwYXN0ZVwiOiBcIkNvbGxlclwiLFxuICAgICAgICAgICAgXCJkZWxldGVcIjogXCJFZmZhY2VyXCIsXG4gICAgICAgICAgICBcImFkZERlY2lzaW9uTm9kZVwiOiBcIkFqb3V0ZXIgbm91ZCBkZSBkw6ljaXNpb25cIixcbiAgICAgICAgICAgIFwiYWRkQ2hhbmNlTm9kZVwiOiBcIkFqb3V0ZXIgbm91ZCBhbMOpYXRvaXJlXCIsXG4gICAgICAgICAgICBcImFkZFRlcm1pbmFsTm9kZVwiOiBcIkFqb3V0ZXIgdW4gbm9ldWQgdGVybWluYWxcIixcbiAgICAgICAgICAgIFwiY29udmVydFwiOntcbiAgICAgICAgICAgICAgICBcImRlY2lzaW9uXCI6IFwiQ29tbWUgbm91ZCBkZSBkw6ljaXNpb25cIixcbiAgICAgICAgICAgICAgICBcImNoYW5jZVwiOiBcIkNvbW1lIG5vdWQgYWzDqWF0b2lyZVwiLFxuICAgICAgICAgICAgICAgIFwidGVybWluYWxcIjogXCJDb21tZSB1biBub2V1ZCB0ZXJtaW5hbFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJzZWxlY3RTdWJ0cmVlXCI6IFwiU8OpbGVjdGlvbm5lciB1bmUgc291cy1hcmJvcmVzY2VuY2VcIixcbiAgICAgICAgICAgIFwiZmxpcFN1YnRyZWVcIjogXCJCYXNjdWxlciBzb3VzLWFyYnJlXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJlZGdlXCI6e1xuICAgICAgICAgICAgXCJpbmplY3REZWNpc2lvbk5vZGVcIjogXCJJbmplY3RlciB1biBub2V1ZCBkZSBkw6ljaXNpb25cIixcbiAgICAgICAgICAgIFwiaW5qZWN0Q2hhbmNlTm9kZVwiOiBcIkluamVjdGVyIHVuIG5vZXVkIGRlIGNoYW5jZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwidGV4dFwiOntcbiAgICAgICAgICAgIFwiZGVsZXRlXCI6IFwiRWZmYWNlclwiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwidmFsaWRhdGlvblwiOntcbiAgICAgICAgXCJpbmNvbXBsZXRlUGF0aFwiOiBcIlBhcmNvdXJzIG5vbiB0ZXJtaW7DqSBwYXIgbm9ldWQgdGVybWluYWxcIixcbiAgICAgICAgXCJwcm9iYWJpbGl0eURvTm90U3VtVXBUbzFcIjogXCJMYSBzb21tZSBkZXMgcHJvYmFiaWxpdMOpcyBuJ2VzdCBwYXMgMSBvdSBwbHVzXCIsXG4gICAgICAgIFwiaW52YWxpZFByb2JhYmlsaXR5XCI6IFwiUHJvYmFiaWxpdMOpIGludmFsaWRlIC0gbGUgYm9yZCAje3tudW1iZXJ9fVwiLFxuICAgICAgICBcImludmFsaWRQYXlvZmZcIjogXCJBdmFudGFnZSBpbnZhbGlkZSAtIGxlIGJvcmQgI3t7bnVtYmVyfX1cIlxuICAgIH0sXG4gICAgXCJncm93bFwiOntcbiAgICAgICAgXCJicnVzaERpc2FibGVkXCI6IFwiQnJvc3NlIGRlIHPDqWxlY3Rpb24gZMOpc2FjdGl2w6llXCIsXG4gICAgICAgIFwiYnJ1c2hFbmFibGVkXCI6IFwiQnJvc3NlIGRlIHPDqWxlY3Rpb24gYWN0aXbDqWVcIlxuICAgIH0sXG4gICAgXCJ0b29sdGlwXCI6e1xuICAgICAgICBcIm5vZGVcIjp7XG4gICAgICAgICAgICBcInBheW9mZlwiOiB7XG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiQXZhbnRhZ2Uge3tudW1iZXJ9fVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJ7e25hbWV9fVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJhZ2dyZWdhdGVkUGF5b2ZmXCI6IHtcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJBdmFudGFnZSBhZ3LDqWfDqSB7e251bWJlcn19XCIsXG4gICAgICAgICAgICAgICAgXCJuYW1lZFwiOiBcIkFncsOpZ8OpICB7e25hbWV9fVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJwcm9iYWJpbGl0eVRvRW50ZXJcIjogXCJQcm9iYWJpbGl0w6kgZCdlbnRyw6llXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJlZGdlXCI6e1xuICAgICAgICAgICAgXCJwYXlvZmZcIjoge1xuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIkF2YW50YWdlIHt7bnVtYmVyfX06IHt7dmFsdWV9fVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJ7e25hbWV9fToge3t2YWx1ZX19XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInByb2JhYmlsaXR5XCI6IFwiUHJvYmFiaWxpdMOpOiB7e3ZhbHVlfX1cIlxuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IGkxOG5leHQgZnJvbSAnaTE4bmV4dCc7XG5pbXBvcnQgKiBhcyBlbiBmcm9tICcuL2VuLmpzb24nXG5pbXBvcnQgKiBhcyBwbCBmcm9tICcuL3BsLmpzb24nXG5pbXBvcnQgKiBhcyBpdCBmcm9tICcuL2l0Lmpzb24nXG5pbXBvcnQgKiBhcyBkZSBmcm9tICcuL2RlLmpzb24nXG5pbXBvcnQgKiBhcyBmciBmcm9tICcuL2ZyLmpzb24nXG5cbmV4cG9ydCBjbGFzcyBpMThue1xuXG4gICAgc3RhdGljICRpbnN0YW5jZTtcbiAgICBzdGF0aWMgbGFuZ3VhZ2U7XG5cbiAgICBzdGF0aWMgaW5pdChsbmcpe1xuICAgICAgICBpMThuLmxhbmd1YWdlID0gbG5nO1xuICAgICAgICBsZXQgcmVzb3VyY2VzID0ge1xuICAgICAgICAgICAgZW46IHtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGlvbjogZW5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwbDoge1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0aW9uOiBwbFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGl0OiB7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRpb246IGl0XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGU6IHtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGlvbjogZGVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmcjoge1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0aW9uOiBmclxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBpMThuLiRpbnN0YW5jZSA9IGkxOG5leHQuY3JlYXRlSW5zdGFuY2Uoe1xuICAgICAgICAgICAgbG5nOiBsbmcsXG4gICAgICAgICAgICBmYWxsYmFja0xuZzogJ2VuJyxcbiAgICAgICAgICAgIHJlc291cmNlczogcmVzb3VyY2VzXG4gICAgICAgIH0sIChlcnIsIHQpID0+IHtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIHQoa2V5LCBvcHQpe1xuICAgICAgICByZXR1cm4gaTE4bi4kaW5zdGFuY2UudChrZXksIG9wdClcbiAgICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cz17XG4gICAgXCJjb250ZXh0TWVudVwiOntcbiAgICAgICAgXCJtYWluXCI6e1xuICAgICAgICAgICAgXCJhZGREZWNpc2lvbk5vZGVcIjogXCJBZ2dpdW5naSB1biBub2RvIGRpIGRlY2lzaW9uZVwiLFxuICAgICAgICAgICAgXCJhZGRDaGFuY2VOb2RlXCI6IFwiQWdnaXVuZ2kgdW4gbm9kbyBvcHBvcnR1bml0w6BcIixcbiAgICAgICAgICAgIFwiYWRkVGV4dFwiOiBcIkFnZ2l1bmdpIHRlc3RvXCIsXG4gICAgICAgICAgICBcInBhc3RlXCI6IFwiSW5jb2xsYVwiLFxuICAgICAgICAgICAgXCJzZWxlY3RBbGxOb2Rlc1wiOiBcIlNlbGV6aW9uYSB0dXR0aSBpIG5vZGlcIlxuICAgICAgICB9LFxuICAgICAgICBcIm5vZGVcIjp7XG4gICAgICAgICAgICBcImNvcHlcIjogXCJDb3BpYVwiLFxuICAgICAgICAgICAgXCJjdXRcIjogXCJUYWdsaWFcIixcbiAgICAgICAgICAgIFwicGFzdGVcIjogXCJJbmNvbGxhXCIsXG4gICAgICAgICAgICBcImRlbGV0ZVwiOiBcIkNhbmNlbGxhXCIsXG4gICAgICAgICAgICBcImFkZERlY2lzaW9uTm9kZVwiOiBcIkFnZ2l1bmdpIHVuIG5vZG8gZGkgZGVjaXNpb25lXCIsXG4gICAgICAgICAgICBcImFkZENoYW5jZU5vZGVcIjogXCJBZ2dpdW5naSB1biBub2RvIG9wcG9ydHVuaXTDoFwiLFxuICAgICAgICAgICAgXCJhZGRUZXJtaW5hbE5vZGVcIjogXCJBZ2dpdW5naSB1biBub2RvIHRlcm1pbmFsZVwiLFxuICAgICAgICAgICAgXCJjb252ZXJ0XCI6e1xuICAgICAgICAgICAgICAgIFwiZGVjaXNpb25cIjogXCJDb21lIERlY2lzaW9uIE5vZGVcIixcbiAgICAgICAgICAgICAgICBcImNoYW5jZVwiOiBcIkNvbWUgQ2hhbmNlIE5vZGVcIixcbiAgICAgICAgICAgICAgICBcInRlcm1pbmFsXCI6IFwiQ29tZSBUZXJtaW5hbCBOb2RlXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInNlbGVjdFN1YnRyZWVcIjogXCJTZWxlemlvbmEgU290dG8tYWxiZXJvXCIsXG4gICAgICAgICAgICBcImZsaXBTdWJ0cmVlXCI6IFwiUmliYWx0YSBzb3R0by1hbGJlcm9cIlxuICAgICAgICB9LFxuICAgICAgICBcImVkZ2VcIjp7XG4gICAgICAgICAgICBcImluamVjdERlY2lzaW9uTm9kZVwiOiBcIkluaWV0dGEgbm9kbyBkaSBkZWNpc2lvbmVcIixcbiAgICAgICAgICAgIFwiaW5qZWN0Q2hhbmNlTm9kZVwiOiBcIkluaWV0dGEgbm9kbyBvcHBvcnR1bml0w6BcIlxuICAgICAgICB9LFxuICAgICAgICBcInRleHRcIjp7XG4gICAgICAgICAgICBcImRlbGV0ZVwiOiBcIkNhbmNlbGxhXCJcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXCJ2YWxpZGF0aW9uXCI6e1xuICAgICAgICBcImluY29tcGxldGVQYXRoXCI6IFwiUGVyY29yc28gc2VuemEgbm9kbyB0ZXJtaW5hbGVcIixcbiAgICAgICAgXCJwcm9iYWJpbGl0eURvTm90U3VtVXBUbzFcIjogXCJMYSBzb21tYSBkZWxsZSBwcm9iYWJpbGl0w6Agw6ggZGl2ZXJzYSBkYSAxXCIsXG4gICAgICAgIFwiaW52YWxpZFByb2JhYmlsaXR5XCI6IFwiUHJvYmFiaWxpdMOgIG5vbiB2YWxpZGEgLSBib3JkbyAje3tudW1iZXJ9fVwiLFxuICAgICAgICBcImludmFsaWRQYXlvZmZcIjogXCJTYWxkbyBub24gdmFsaWRvIC0gYm9yZG8gI3t7bnVtYmVyfX1cIlxuICAgIH0sXG4gICAgXCJncm93bFwiOntcbiAgICAgICAgXCJicnVzaERpc2FibGVkXCI6IFwiU2VsZXppb25lIHBlbm5lbGxvIGRpc2FiaWxpdGF0YVwiLFxuICAgICAgICBcImJydXNoRW5hYmxlZFwiOiBcIlNlbGV6aW9uZSBwZW5uZWxsbyBhYmlsaXRhdGFcIlxuICAgIH0sXG4gICAgXCJ0b29sdGlwXCI6e1xuICAgICAgICBcIm5vZGVcIjp7XG4gICAgICAgICAgICBcInBheW9mZlwiOiB7XG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiU2FsZG8ge3tudW1iZXJ9fVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJ7e25hbWV9fVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJhZ2dyZWdhdGVkUGF5b2ZmXCI6IHtcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJTYWxkbyBhZ2dyZWdhdG8ge3tudW1iZXJ9fVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJBZ2dyZWdhdG8ge3tuYW1lfX1cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwicHJvYmFiaWxpdHlUb0VudGVyXCI6IFwiUHJvYmFiaWxpdMOgIGRhIGluc2VyaXJlXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJlZGdlXCI6e1xuICAgICAgICAgICAgXCJwYXlvZmZcIjoge1xuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIlNhbGRvIHt7bnVtYmVyfX06IHt7dmFsdWV9fVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJ7e25hbWV9fToge3t2YWx1ZX19XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInByb2JhYmlsaXR5XCI6IFwiUHJvYmFiaWxpdMOgOiB7e3ZhbHVlfX1cIlxuICAgICAgICB9XG4gICAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHM9e1xuXG4gICAgXCJjb250ZXh0TWVudVwiOntcbiAgICAgICAgXCJtYWluXCI6e1xuICAgICAgICAgICAgXCJhZGREZWNpc2lvbk5vZGVcIjogXCJEb2RhaiBXxJl6ZcWCIERlY3l6eWpueVwiLFxuICAgICAgICAgICAgXCJhZGRDaGFuY2VOb2RlXCI6IFwiRG9kYWogV8SZemXFgiBMb3Nvd3lcIixcbiAgICAgICAgICAgIFwiYWRkVGV4dFwiOiBcIkRvZGFqIFRla3N0XCIsXG4gICAgICAgICAgICBcInBhc3RlXCI6IFwiV2tsZWpcIixcbiAgICAgICAgICAgIFwic2VsZWN0QWxsTm9kZXNcIjogXCJaYXpuYWN6IHdzenlzdGtpZSB3xJl6xYJ5XCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJub2RlXCI6e1xuICAgICAgICAgICAgXCJjb3B5XCI6IFwiS29waXVqXCIsXG4gICAgICAgICAgICBcImN1dFwiOiBcIld5dG5palwiLFxuICAgICAgICAgICAgXCJwYXN0ZVwiOiBcIldrbGVqXCIsXG4gICAgICAgICAgICBcImRlbGV0ZVwiOiBcIlVzdcWEXCIsXG4gICAgICAgICAgICBcImFkZERlY2lzaW9uTm9kZVwiOiBcIkRvZGFqIFfEmXplxYIgRGVjeXp5am55XCIsXG4gICAgICAgICAgICBcImFkZENoYW5jZU5vZGVcIjogXCJEb2RhaiBXxJl6ZcWCIExvc293eVwiLFxuICAgICAgICAgICAgXCJhZGRUZXJtaW5hbE5vZGVcIjogXCJEb2RhaiBXxJl6ZcWCIEtvxYRjb3d5XCIsXG4gICAgICAgICAgICBcImNvbnZlcnRcIjp7XG4gICAgICAgICAgICAgICAgXCJkZWNpc2lvblwiOiBcIkpha28gV8SZemXFgiBEZWN5enlqbnlcIixcbiAgICAgICAgICAgICAgICBcImNoYW5jZVwiOiBcIkpha28gV8SZemXFgiBMb3Nvd3lcIixcbiAgICAgICAgICAgICAgICBcInRlcm1pbmFsXCI6IFwiSmFrbyBXxJl6ZcWCIEtvxYRjb3d5XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInNlbGVjdFN1YnRyZWVcIjogXCJaYXpuYWN6IHBvZGRyemV3b1wiLFxuICAgICAgICAgICAgXCJmbGlwU3VidHJlZVwiOiBcIlByemV3csOzxIcgcG9kZHJ6ZXdvXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJlZGdlXCI6e1xuICAgICAgICAgICAgXCJpbmplY3REZWNpc2lvbk5vZGVcIjogXCJXc3RyenlrbmlqIFfEmXplxYIgRGVjeXp5am55XCIsXG4gICAgICAgICAgICBcImluamVjdENoYW5jZU5vZGVcIjogXCJXc3RyenlrbmlqIFfEmXplxYIgTG9zb3d5XCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJ0ZXh0XCI6e1xuICAgICAgICAgICAgXCJkZWxldGVcIjogXCJVc3XFhFwiXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJ2YWxpZGF0aW9uXCI6e1xuICAgICAgICBcImluY29tcGxldGVQYXRoXCI6IFwiT3N0YXRuaW0gd8SZesWCZW0gdyDFm2NpZcW8Y2UgcG93aW5pZW4gYnnEhyBXxJl6ZcWCIEtvxYRjb3d5XCIsXG4gICAgICAgIFwicHJvYmFiaWxpdHlEb05vdFN1bVVwVG8xXCI6IFwiUHJhd2RvcG9kb2JpZcWEc3R3YSBuaWUgc3VtdWrEhSBzaWUgZG8gMVwiLFxuICAgICAgICBcImludmFsaWRQcm9iYWJpbGl0eVwiOiBcIk5pZXBvcHJhd25lIHByYXdkb3BvZG9iaWXFhHN0d28gbmEga3Jhd8SZZHppICN7e251bWJlcn19XCIsXG4gICAgICAgIFwiaW52YWxpZFBheW9mZlwiOiBcIk5pZXBvcHJhd25hIHd5cMWCYXRhIG5hIGtyYXfEmWR6aSAje3tudW1iZXJ9fVwiXG4gICAgfSxcbiAgICBcImdyb3dsXCI6e1xuICAgICAgICBcImJydXNoRGlzYWJsZWRcIjogXCJaYXpuYWN6YW5pZSB3ecWCxIVjem9uZVwiLFxuICAgICAgICBcImJydXNoRW5hYmxlZFwiOiBcIlphem5hY3phbmllIHfFgsSFY3pvbmVcIlxuICAgIH0sXG4gICAgXCJ0b29sdGlwXCI6e1xuICAgICAgICBcIm5vZGVcIjp7XG4gICAgICAgICAgICBcInBheW9mZlwiOiB7XG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiV3lwxYJhdGEge3tudW1iZXJ9fVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJ7e25hbWV9fVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJhZ2dyZWdhdGVkUGF5b2ZmXCI6IHtcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJaYWdyZWdvd2FuYSB3eXDFgmF0YSB7e251bWJlcn19XCIsXG4gICAgICAgICAgICAgICAgXCJuYW1lZFwiOiBcIlphZ3JlZ293YW5hIHt7bmFtZX19XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInByb2JhYmlsaXR5VG9FbnRlclwiOiBcIlByYXdkb3BvZG9iaWXFhHN0d28gd2VqxZtjaWFcIlxuICAgICAgICB9LFxuICAgICAgICBcImVkZ2VcIjp7XG4gICAgICAgICAgICBcInBheW9mZlwiOiB7XG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiV3lwxYJhdGEge3tudW1iZXJ9fToge3t2YWx1ZX19XCIsXG4gICAgICAgICAgICAgICAgXCJuYW1lZFwiOiBcInt7bmFtZX19OiB7e3ZhbHVlfX1cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwicHJvYmFiaWxpdHlcIjogXCJQcmF3ZG9wb2RvYmllxYRzdHdvOiB7e3ZhbHVlfX1cIlxuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHtEM0V4dGVuc2lvbnN9IGZyb20gJy4vZDMtZXh0ZW5zaW9ucydcbkQzRXh0ZW5zaW9ucy5leHRlbmQoKTtcblxuZXhwb3J0ICogZnJvbSAnLi90cmVlLWRlc2lnbmVyJ1xuZXhwb3J0ICogZnJvbSAnLi9hcHAtdXRpbHMnXG5leHBvcnQgKiBmcm9tICcuL3RlbXBsYXRlcydcbmV4cG9ydCAqIGZyb20gJy4vdG9vbHRpcCdcbmV4cG9ydCAqIGZyb20gJy4vZDMtZXh0ZW5zaW9ucydcbmV4cG9ydCB7ZGVmYXVsdCBhcyBkM30gZnJvbSAnLi9kMydcblxuXG4iLCJpbXBvcnQge1V0aWxzfSBmcm9tICdzZC11dGlscydcbmltcG9ydCB7ZG9tYWluIGFzIG1vZGVsfSBmcm9tICdzZC1tb2RlbCdcbmltcG9ydCAqIGFzIGQzIGZyb20gJy4vZDMnXG5pbXBvcnQgY2lyY2xlU3ltYm9sIGZyb20gJy4vc3ltYm9scy9jaXJjbGUnXG5pbXBvcnQgdHJpYW5nbGVTeW1ib2wgZnJvbSAnLi9zeW1ib2xzL3RyaWFuZ2xlJ1xuaW1wb3J0IHtBcHBVdGlsc30gZnJvbSBcIi4vYXBwLXV0aWxzXCI7XG5cbi8qVHJlZSBsYXlvdXQgbWFuYWdlciovXG5leHBvcnQgY2xhc3MgTGF5b3V0e1xuXG4gICAgdHJlZURlc2lnbmVyO1xuICAgIGRhdGE7XG4gICAgY29uZmlnO1xuXG4gICAgbm9kZVR5cGVUb1N5bWJvbCA9IHtcbiAgICAgICAgJ2RlY2lzaW9uJzogZDMuc3ltYm9sU3F1YXJlLFxuICAgICAgICAnY2hhbmNlJzogY2lyY2xlU3ltYm9sLFxuICAgICAgICBcInRlcm1pbmFsXCI6IHRyaWFuZ2xlU3ltYm9sXG4gICAgfTtcblxuICAgIHN0YXRpYyBNQU5VQUxfTEFZT1VUX05BTUUgPSAnbWFudWFsJztcblxuXG4gICAgb25BdXRvTGF5b3V0Q2hhbmdlZD1bXTtcblxuICAgIG5vZGVUeXBlT3JkZXIgPSB7XG4gICAgICAgICdkZWNpc2lvbicgOiAwLFxuICAgICAgICAnY2hhbmNlJzogMCxcbiAgICAgICAgJ3Rlcm1pbmFsJzogMVxuICAgIH07XG5cbiAgICB0cmVlTWFyZ2luID0gNTA7XG4gICAgdGFyZ2V0U3ltYm9sU2l6ZT17fTtcbiAgICBub2RlU2VwYXJhdGlvbiA9IChhLCBiKSA9PiBhLnBhcmVudCA9PT0gYi5wYXJlbnQgPyAxIDogMS4yXG5cbiAgICBjb25zdHJ1Y3Rvcih0cmVlRGVzaWduZXIsIGRhdGEsIGNvbmZpZyl7XG4gICAgICAgIHRoaXMudHJlZURlc2lnbmVyID0gdHJlZURlc2lnbmVyO1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcblxuICAgIH1cblxuICAgIHVwZGF0ZShub2RlKXtcbiAgICAgICAgaWYobm9kZSAmJiBub2RlLiRwYXJlbnQpe1xuICAgICAgICAgICAgbm9kZS4kcGFyZW50LmNoaWxkRWRnZXMuc29ydCgoYSxiKT0+YS5jaGlsZE5vZGUubG9jYXRpb24ueSAtIGIuY2hpbGROb2RlLmxvY2F0aW9uLnkpXG4gICAgICAgIH1cbiAgICAgICAgaWYoIXRoaXMuaXNNYW51YWxMYXlvdXQoKSl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hdXRvTGF5b3V0KHRoaXMuY29uZmlnLnR5cGUsIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmKG5vZGUpe1xuICAgICAgICAgICAgdGhpcy5tb3ZlTm9kZVRvRW1wdHlQbGFjZShub2RlKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLnRyZWVEZXNpZ25lci5yZWRyYXcodHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc01hbnVhbExheW91dCgpe1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcudHlwZSA9PT0gTGF5b3V0Lk1BTlVBTF9MQVlPVVRfTkFNRTtcbiAgICB9XG5cbiAgICBnZXROZXdDaGlsZExvY2F0aW9uKHBhcmVudCl7XG4gICAgICAgIGlmKCFwYXJlbnQpe1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBtb2RlbC5Qb2ludCh0aGlzLmdldE5vZGVNaW5YKCksIHRoaXMuZ2V0Tm9kZU1pblkoKSlcbiAgICAgICAgfVxuICAgICAgICB2YXIgeCA9IHBhcmVudC5sb2NhdGlvbi54ICsgdGhpcy5jb25maWcuZ3JpZFdpZHRoO1xuICAgICAgICB2YXIgeSA9IHBhcmVudC5sb2NhdGlvbi55O1xuICAgICAgICBpZihwYXJlbnQuY2hpbGRFZGdlcy5sZW5ndGgpe1xuICAgICAgICAgICAgeSA9IHBhcmVudC5jaGlsZEVkZ2VzW3BhcmVudC5jaGlsZEVkZ2VzLmxlbmd0aC0xXS5jaGlsZE5vZGUubG9jYXRpb24ueSsxO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBtb2RlbC5Qb2ludCh4LCB5KVxuICAgIH1cblxuICAgIGdldEluamVjdGVkTm9kZUxvY2F0aW9uKGVkZ2Upe1xuXG4gICAgICAgIHZhciBwID0gZWRnZS4kbGluZVBvaW50c1syXTtcblxuICAgICAgICByZXR1cm4gbmV3IG1vZGVsLlBvaW50KHBbMF0sIHBbMV0pXG4gICAgfVxuXG4gICAgbW92ZU5vZGVUb0VtcHR5UGxhY2Uobm9kZSwgcmVkcmF3SWZDaGFuZ2VkPXRydWUpe1xuICAgICAgICB2YXIgcG9zaXRpb25NYXAgPSB7fTtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBub2RlLmxvY2F0aW9uLnggPSBNYXRoLm1heCh0aGlzLmdldE5vZGVNaW5YKG5vZGUpLCBub2RlLmxvY2F0aW9uLngpO1xuICAgICAgICBub2RlLmxvY2F0aW9uLnkgPSBNYXRoLm1heCh0aGlzLmdldE5vZGVNaW5ZKG5vZGUpLCBub2RlLmxvY2F0aW9uLnkpO1xuXG5cbiAgICAgICAgdGhpcy5ub2Rlc1NvcnRlZEJ5WCA9IHRoaXMuZGF0YS5ub2Rlcy5zbGljZSgpO1xuICAgICAgICB0aGlzLm5vZGVzU29ydGVkQnlYLnNvcnQoKGEsYik9PmEubG9jYXRpb24ueCAtIGIubG9jYXRpb24ueCk7XG5cbiAgICAgICAgZnVuY3Rpb24gZmluZENvbGxpZGluZ05vZGUobm9kZSwgbG9jYXRpb24pe1xuICAgICAgICAgICAgcmV0dXJuIFV0aWxzLmZpbmQoc2VsZi5ub2Rlc1NvcnRlZEJ5WCwgbj0+e1xuICAgICAgICAgICAgICAgIGlmKG5vZGUgPT0gbil7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgbWFyZ2luID0gc2VsZi5jb25maWcubm9kZVNpemUvMztcbiAgICAgICAgICAgICAgICB2YXIgeCA9IG4ubG9jYXRpb24ueDtcbiAgICAgICAgICAgICAgICB2YXIgeSA9IG4ubG9jYXRpb24ueTtcblxuICAgICAgICAgICAgICAgIHJldHVybiAobG9jYXRpb24ueCAtIG1hcmdpbiA8PSB4ICYmIGxvY2F0aW9uLnggKyBtYXJnaW4gPj0geFxuICAgICAgICAgICAgICAgICAgICAmJiBsb2NhdGlvbi55IC0gbWFyZ2luIDw9IHkgJiYgbG9jYXRpb24ueSArIG1hcmdpbiA+PSB5KVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc3RlcFggPSB0aGlzLmNvbmZpZy5ub2RlU2l6ZS8yO1xuICAgICAgICB2YXIgc3RlcFkgPSB0aGlzLmNvbmZpZy5ub2RlU2l6ZSsxMDtcbiAgICAgICAgdmFyIHN0ZXBYc2FtZVBhcmVudCA9IDA7XG4gICAgICAgIHZhciBzdGVwWXNhbWVQYXJlbnQgPSA3NTtcbiAgICAgICAgdmFyIGNoYW5nZWQgPSBmYWxzZTtcbiAgICAgICAgdmFyIGNvbGlkaW5nTm9kZTtcbiAgICAgICAgdmFyIG5ld0xvY2F0aW9uID0gbmV3IG1vZGVsLlBvaW50KG5vZGUubG9jYXRpb24pO1xuICAgICAgICB3aGlsZShjb2xpZGluZ05vZGUgPSBmaW5kQ29sbGlkaW5nTm9kZShub2RlLCBuZXdMb2NhdGlvbikpe1xuICAgICAgICAgICAgY2hhbmdlZD10cnVlO1xuICAgICAgICAgICAgdmFyIHNhbWVQYXJlbnQgPSBub2RlLiRwYXJlbnQgJiYgY29saWRpbmdOb2RlLiRwYXJlbnQgJiYgbm9kZS4kcGFyZW50PT09Y29saWRpbmdOb2RlLiRwYXJlbnQ7XG4gICAgICAgICAgICBpZihzYW1lUGFyZW50KXtcbiAgICAgICAgICAgICAgICBuZXdMb2NhdGlvbi5tb3ZlKHN0ZXBYc2FtZVBhcmVudCwgc3RlcFlzYW1lUGFyZW50KTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIG5ld0xvY2F0aW9uLm1vdmUoc3RlcFgsIHN0ZXBZKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZihjaGFuZ2VkKXtcbiAgICAgICAgICAgIG5vZGUubW92ZVRvKG5ld0xvY2F0aW9uLngsbmV3TG9jYXRpb24ueSwgdHJ1ZSk7XG4gICAgICAgICAgICBpZihyZWRyYXdJZkNoYW5nZWQpe1xuICAgICAgICAgICAgICAgIHRoaXMudHJlZURlc2lnbmVyLnJlZHJhdyh0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRpc2FibGVBdXRvTGF5b3V0KCl7XG4gICAgICAgIHRoaXMuY29uZmlnLnR5cGUgPSBMYXlvdXQuTUFOVUFMX0xBWU9VVF9OQU1FO1xuICAgICAgICB0aGlzLl9maXJlT25BdXRvTGF5b3V0Q2hhbmdlZENhbGxiYWNrcygpO1xuICAgIH1cblxuXG4gICAgbm9kZVN5bWJvbFNpemUgPSB7fTtcbiAgICBkcmF3Tm9kZVN5bWJvbChwYXRoLCB0cmFuc2l0aW9uKXtcblxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBub2RlU2l6ZSA9IHRoaXMuY29uZmlnLm5vZGVTaXplO1xuICAgICAgICB0aGlzLm5vZGVTeW1ib2wgPSBkMy5zeW1ib2woKS50eXBlKGQ9PiBzZWxmLm5vZGVUeXBlVG9TeW1ib2xbZC50eXBlXSlcbiAgICAgICAgICAgIC5zaXplKGQ9PnNlbGYubm9kZVN5bWJvbFNpemVbZC4kaWRdID8gVXRpbHMuZ2V0KHNlbGYudGFyZ2V0U3ltYm9sU2l6ZSwgZC50eXBlK1wiWydcIitzZWxmLmNvbmZpZy5ub2RlU2l6ZStcIiddXCIsIDY0KSA6IDY0KTtcblxuICAgICAgICBwYXRoXG4gICAgICAgICAgICAuZWFjaChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHZhciBwYXRoID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICAgICAgICAgIHZhciBwcmV2ID0gcGF0aC5hdHRyKFwiZFwiKTtcbiAgICAgICAgICAgICAgICBpZighcHJldil7XG4gICAgICAgICAgICAgICAgICAgIHBhdGguYXR0cihcImRcIiwgc2VsZi5ub2RlU3ltYm9sKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHNpemUgPSBVdGlscy5nZXQoc2VsZi50YXJnZXRTeW1ib2xTaXplLCBkLnR5cGUrXCJbJ1wiK3NlbGYuY29uZmlnLm5vZGVTaXplK1wiJ11cIik7XG4gICAgICAgICAgICAgICAgaWYoIXNpemUpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgYm94ID0gcGF0aC5ub2RlKCkuZ2V0QkJveCgpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSBNYXRoLm1pbihub2RlU2l6ZSAvIGJveC53aWR0aCwgbm9kZVNpemUgLyBib3guaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgc2l6ZSA9IGVycm9yICogZXJyb3IgKiAoc2VsZi5ub2RlU3ltYm9sU2l6ZVtkLiRpZF18fDY0KTtcbiAgICAgICAgICAgICAgICAgICAgVXRpbHMuc2V0KHNlbGYudGFyZ2V0U3ltYm9sU2l6ZSwgZC50eXBlK1wiWydcIitzZWxmLmNvbmZpZy5ub2RlU2l6ZStcIiddXCIsIHNpemUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZih0cmFuc2l0aW9uKXtcbiAgICAgICAgICAgICAgICAgICAgcGF0aCA9ICBwYXRoLnRyYW5zaXRpb24oKTtcblxuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBzZWxmLm5vZGVTeW1ib2xTaXplW2QuJGlkXSA9IHNpemU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBhdGguYXR0cihcImRcIiwgc2VsZi5ub2RlU3ltYm9sKTtcbiAgICAgICAgICAgICAgICBpZih0cmFuc2l0aW9uKXtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5ub2RlU3ltYm9sU2l6ZVtkLiRpZF0gPSBzaXplO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5vZGVMYWJlbFBvc2l0aW9uKHNlbGVjdGlvbikge1xuICAgICAgICByZXR1cm4gc2VsZWN0aW9uXG4gICAgICAgICAgICAuYXR0cigneCcsIDApXG4gICAgICAgICAgICAuYXR0cigneScsIC10aGlzLmNvbmZpZy5ub2RlU2l6ZSAvIDIgLSA3KVxuICAgIH1cblxuICAgIG5vZGVQYXlvZmZQb3NpdGlvbihzZWxlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIExheW91dC5zZXRIYW5naW5nUG9zaXRpb24oc2VsZWN0aW9uKVxuICAgICAgICAgICAgLmF0dHIoJ3gnLCAwKVxuICAgICAgICAgICAgLmF0dHIoJ3knLCB0aGlzLmNvbmZpZy5ub2RlU2l6ZSAvIDIgKyA3KVxuICAgICAgICAgICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXG4gICAgfVxuXG4gICAgbm9kZUFnZ3JlZ2F0ZWRQYXlvZmZQb3NpdGlvbihzZWxlY3Rpb24pIHtcbiAgICAgICAgdmFyIGZvbnRTaXplID0gMTI7XG4gICAgICAgIHZhciB4ID0gdGhpcy5jb25maWcubm9kZVNpemUgLyAyICsgNztcbiAgICAgICAgTGF5b3V0LnNldEhhbmdpbmdQb3NpdGlvbihzZWxlY3Rpb24pXG4gICAgICAgICAgICAuYXR0cigneCcsIHgpXG4gICAgICAgICAgICAuYXR0cigneScsIGQ9PntcbiAgICAgICAgICAgICAgICBsZXQgaXRlbXMgPSBkLmRpc3BsYXlWYWx1ZSgnYWdncmVnYXRlZFBheW9mZicpO1xuICAgICAgICAgICAgICAgIGxldCBudW1iZXIgPSBVdGlscy5pc0FycmF5KGl0ZW1zKSA/IGl0ZW1zLmZpbHRlcihpdD0+aXQgIT09IHVuZGVmaW5lZCkubGVuZ3RoIDogMTtcbiAgICAgICAgICAgICAgICByZXR1cm4gLU1hdGgubWF4KG51bWJlcipmb250U2l6ZSArIG51bWJlciA+IDEgPyAwIDogNSwgdGhpcy5jb25maWcubm9kZVNpemUgLyAyKSsgKG51bWJlciA+ICAxID8gMiA6IDUpXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBzZWxlY3Rpb24uc2VsZWN0QWxsKCd0c3BhbicpLmF0dHIoJ3gnLCB4KTtcbiAgICAgICAgcmV0dXJuIHNlbGVjdGlvbjtcbiAgICAgICAgICAgIC8vIC5hdHRyKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKVxuICAgICAgICAgICAgLy8gLmF0dHIoJ2RvbWluYW50LWJhc2VsaW5lJywgJ2hhbmdpbmcnKVxuICAgIH1cblxuICAgIG5vZGVQcm9iYWJpbGl0eVRvRW50ZXJQb3NpdGlvbihzZWxlY3Rpb24pIHtcbiAgICAgICAgdmFyIGZvbnRTaXplID0gMTI7XG4gICAgICAgIHJldHVybiBzZWxlY3Rpb25cbiAgICAgICAgICAgIC5hdHRyKCd4JywgdGhpcy5jb25maWcubm9kZVNpemUgLyAyICsgNylcbiAgICAgICAgICAgIC5hdHRyKCd5JywgTWF0aC5tYXgoZm9udFNpemUrIDUsIHRoaXMuY29uZmlnLm5vZGVTaXplIC8gMikgLTUpXG4gICAgICAgICAgICAvLyAuYXR0cigndGV4dC1hbmNob3InLCAnbWlkZGxlJylcbiAgICAgICAgICAgIC8vIC5hdHRyKCdkb21pbmFudC1iYXNlbGluZScsICdjZW50cmFsJylcbiAgICB9XG5cbiAgICBub2RlSW5kaWNhdG9yUG9zaXRpb24oc2VsZWN0aW9uKSB7XG4gICAgICAgIHJldHVybiBzZWxlY3Rpb25cbiAgICAgICAgICAgIC5hdHRyKCd4JywgdGhpcy5jb25maWcubm9kZVNpemUgLyAyICsgOClcbiAgICAgICAgICAgIC5hdHRyKCd5JywgLSB0aGlzLmNvbmZpZy5ub2RlU2l6ZS8yKVxuICAgICAgICAgICAgLmF0dHIoJ2RvbWluYW50LWJhc2VsaW5lJywgJ2NlbnRyYWwnKVxuICAgICAgICAgICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXG4gICAgfVxuXG4gICAgbm9kZVVuZm9sZEJ1dHRvblBvc2l0aW9uKHNlbGVjdGlvbikge1xuICAgICAgICB2YXIgZm9udFNpemUgPSAxMjtcbiAgICAgICAgcmV0dXJuIHNlbGVjdGlvblxuICAgICAgICAgICAgLmF0dHIoJ3gnLCB0aGlzLmNvbmZpZy5ub2RlU2l6ZSAvIDIgKyA1KVxuICAgICAgICAgICAgLmF0dHIoJ3knLCAwKVxuICAgICAgICAgICAgLmF0dHIoJ2RvbWluYW50LWJhc2VsaW5lJywgJ2NlbnRyYWwnKVxuICAgIH1cblxuICAgIGVkZ2VMaW5lRChlZGdlKXtcbiAgICAgICAgdmFyIGxpbmUgPSBkMy5saW5lKClcbiAgICAgICAgICAgIC54KGQ9PiBkWzBdKVxuICAgICAgICAgICAgLnkoZD0+IGRbMV0pO1xuICAgICAgICAvLyAuY3VydmUoZDMuY3VydmVDYXRtdWxsUm9tLmFscGhhKDAuNSkpO1xuXG5cbiAgICAgICAgdmFyIHBhcmVudE5vZGUgPSBlZGdlLnBhcmVudE5vZGU7XG4gICAgICAgIHZhciBjaGlsZE5vZGUgPSBlZGdlLmNoaWxkTm9kZTtcblxuICAgICAgICB2YXIgZFggPSBjaGlsZE5vZGUubG9jYXRpb24ueCAtIHBhcmVudE5vZGUubG9jYXRpb24ueDtcbiAgICAgICAgdmFyIGRZID0gY2hpbGROb2RlLmxvY2F0aW9uLnkgLSBwYXJlbnROb2RlLmxvY2F0aW9uLnk7XG5cbiAgICAgICAgdmFyIHNpZ24gPSBkWD49MCA/IDEgOiAtMTtcblxuICAgICAgICB2YXIgc2xhbnRTdGFydFhPZmZzZXQgPSBNYXRoLm1pbihkWC8yLCB0aGlzLmNvbmZpZy5ub2RlU2l6ZS8yKzEwKTtcbiAgICAgICAgdmFyIHNsYW50V2lkdGggPSBNYXRoLm1pbih0aGlzLmNvbmZpZy5lZGdlU2xhbnRXaWR0aE1heCwgTWF0aC5tYXgoZFgvMiAtIHNsYW50U3RhcnRYT2Zmc2V0LCAwKSk7XG5cbiAgICAgICAgdmFyIHBvaW50MSA9IFtwYXJlbnROb2RlLmxvY2F0aW9uLnggK3RoaXMuY29uZmlnLm5vZGVTaXplLzIgKyAxLCBwYXJlbnROb2RlLmxvY2F0aW9uLnldO1xuICAgICAgICB2YXIgcG9pbnQyID0gW01hdGgubWF4KHBhcmVudE5vZGUubG9jYXRpb24ueCtzbGFudFN0YXJ0WE9mZnNldCwgcG9pbnQxWzBdKSwgcGFyZW50Tm9kZS5sb2NhdGlvbi55XTtcbiAgICAgICAgdmFyIHBvaW50MyA9IFtwYXJlbnROb2RlLmxvY2F0aW9uLngrc2xhbnRTdGFydFhPZmZzZXQrc2xhbnRXaWR0aCwgY2hpbGROb2RlLmxvY2F0aW9uLnldO1xuICAgICAgICB2YXIgcG9pbnQ0ID0gW2NoaWxkTm9kZS5sb2NhdGlvbi54IC0gKHNpZ24qKE1hdGgubWF4KDAsIE1hdGgubWluKHRoaXMuY29uZmlnLm5vZGVTaXplLzIrOCwgZFgvMikpKSksIGNoaWxkTm9kZS5sb2NhdGlvbi55XTtcbiAgICAgICAgLy8gdmFyIHBvaW50MiA9IFtwYXJlbnROb2RlLmxvY2F0aW9uLngrZFgvMi1zbGFudFdpZHRoLzIsIHBhcmVudE5vZGUubG9jYXRpb24ueV07XG4gICAgICAgIC8vIHZhciBwb2ludDMgPSBbY2hpbGROb2RlLmxvY2F0aW9uLngtKGRYLzItc2xhbnRXaWR0aC8yKSwgY2hpbGROb2RlLmxvY2F0aW9uLnldO1xuXG4gICAgICAgIGVkZ2UuJGxpbmVQb2ludHMgPSBbcG9pbnQxLCBwb2ludDIsIHBvaW50MywgcG9pbnQ0XTtcbiAgICAgICAgcmV0dXJuIGxpbmUoZWRnZS4kbGluZVBvaW50cyk7XG4gICAgfVxuXG4gICAgZWRnZVBheW9mZlBvc2l0aW9uKHNlbGVjdGlvbikge1xuICAgICAgICBMYXlvdXQuc2V0SGFuZ2luZ1Bvc2l0aW9uKHNlbGVjdGlvbilcbiAgICAgICAgICAgIC5hdHRyKCd4JywgZD0+ZC4kbGluZVBvaW50c1syXVswXSArIDIpXG4gICAgICAgICAgICAuYXR0cigneScsIGQ9PmQuJGxpbmVQb2ludHNbMl1bMV0gKyA3KTtcblxuICAgICAgICBzZWxlY3Rpb24uc2VsZWN0QWxsKCd0c3BhbicpLmF0dHIoJ3gnLCBmdW5jdGlvbihkKXtcbiAgICAgICAgICAgIHJldHVybiBkMy5zZWxlY3QodGhpcy5wYXJlbnROb2RlKS5kYXR1bSgpLiRsaW5lUG9pbnRzWzJdWzBdICsgMlxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHNlbGVjdGlvbjtcblxuICAgIH1cblxuICAgIGVkZ2VMYWJlbFBvc2l0aW9uKHNlbGVjdGlvbikge1xuICAgICAgICByZXR1cm4gc2VsZWN0aW9uXG4gICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgZD0+J3RyYW5zbGF0ZSgnKyhkLiRsaW5lUG9pbnRzWzJdWzBdICsgMikrJywnKyhkLiRsaW5lUG9pbnRzWzJdWzFdIC0gNykrJyknKVxuICAgICAgICAgICAgLy8gLmF0dHIoJ3gnLCBkPT5kLiRsaW5lUG9pbnRzWzJdWzBdICsgMilcbiAgICAgICAgICAgIC8vIC5hdHRyKCd5JywgZD0+ZC4kbGluZVBvaW50c1syXVsxXSAtIDcpXG5cbiAgICB9XG5cbiAgICBlZGdlUHJvYmFiaWxpdHlQb3NpdGlvbihzZWxlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIExheW91dC5zZXRIYW5naW5nUG9zaXRpb24oc2VsZWN0aW9uKVxuICAgICAgICAgICAgLmF0dHIoJ3gnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHZhciBsZW4gPSB0aGlzLmdldENvbXB1dGVkVGV4dExlbmd0aCgpO1xuICAgICAgICAgICAgICAgIHZhciBtaW4gPSBkLiRsaW5lUG9pbnRzWzJdWzBdICsgMiArIHRoaXMucHJldmlvdXNTaWJsaW5nLmNoaWxkTm9kZXNbMF0uZ2V0Q29tcHV0ZWRUZXh0TGVuZ3RoKCkgKyA3ICsgbGVuO1xuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLm1heChtaW4sIGQuJGxpbmVQb2ludHNbM11bMF0gLSA4KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXR0cigneScsIGQ9PmQuJGxpbmVQb2ludHNbMl1bMV0gKyA3KVxuICAgIH1cblxuICAgIGdldE1pbk1hcmdpbkJldHdlZW5Ob2Rlcygpe1xuICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLm5vZGVTaXplICsgMzA7XG4gICAgfVxuXG5cbiAgICBnZXROb2RlTWluWChkKXtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBpZihkICYmIGQuJHBhcmVudCl7Ly8gJiYgIXNlbGYuaXNOb2RlU2VsZWN0ZWQoZC4kcGFyZW50KVxuICAgICAgICAgICAgcmV0dXJuIGQuJHBhcmVudC5sb2NhdGlvbi54ICsgc2VsZi5nZXRNaW5NYXJnaW5CZXR3ZWVuTm9kZXMoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2VsZi5jb25maWcubm9kZVNpemUvMjtcbiAgICB9XG5cbiAgICBnZXROb2RlTWluWShkKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLm5vZGVTaXplLzI7XG4gICAgfVxuXG4gICAgZ2V0Tm9kZU1heFgoZCl7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICBpZihkICYmIGQuY2hpbGRFZGdlcy5sZW5ndGgpe1xuICAgICAgICAgICAgcmV0dXJuIGQzLm1pbihkLmNoaWxkRWRnZXMsIGU9PiFlLmNoaWxkTm9kZS4kaGlkZGVuID8gZS5jaGlsZE5vZGUubG9jYXRpb24ueCA6IDk5OTk5OTkpLXNlbGYuZ2V0TWluTWFyZ2luQmV0d2Vlbk5vZGVzKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDk5OTk5OTk7XG4gICAgfVxuXG4gICAgc2V0R3JpZFdpZHRoKHdpZHRoLCB3aXRob3V0U3RhdGVTYXZpbmcpe1xuICAgICAgICB2YXIgc2VsZj10aGlzO1xuICAgICAgICBpZih0aGlzLmNvbmZpZy5ncmlkV2lkdGg9PT13aWR0aCl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYoIXdpdGhvdXRTdGF0ZVNhdmluZyl7XG4gICAgICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKHtcbiAgICAgICAgICAgICAgICBkYXRhOntcbiAgICAgICAgICAgICAgICAgICAgZ3JpZFdpZHRoOiBzZWxmLmNvbmZpZy5ncmlkV2lkdGhcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uVW5kbzogKGRhdGEpPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldEdyaWRXaWR0aChkYXRhLmdyaWRXaWR0aCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvblJlZG86IChkYXRhKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRHcmlkV2lkdGgod2lkdGgsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb25maWcuZ3JpZFdpZHRoPXdpZHRoO1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cblxuICAgIHNldEdyaWRIZWlnaHQoZ3JpZEhlaWdodCwgd2l0aG91dFN0YXRlU2F2aW5nKXtcbiAgICAgICAgdmFyIHNlbGY9dGhpcztcbiAgICAgICAgaWYodGhpcy5jb25maWcuZ3JpZEhlaWdodD09PWdyaWRIZWlnaHQpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmKCF3aXRob3V0U3RhdGVTYXZpbmcpe1xuICAgICAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSh7XG4gICAgICAgICAgICAgICAgZGF0YTp7XG4gICAgICAgICAgICAgICAgICAgIGdyaWRIZWlnaHQ6IHNlbGYuY29uZmlnLmdyaWRIZWlnaHRcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uVW5kbzogKGRhdGEpPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldEdyaWRIZWlnaHQoZGF0YS5ncmlkSGVpZ2h0LCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uUmVkbzogKGRhdGEpPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldEdyaWRIZWlnaHQoZ3JpZEhlaWdodCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbmZpZy5ncmlkSGVpZ2h0PWdyaWRIZWlnaHQ7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuXG4gICAgc2V0Tm9kZVNpemUobm9kZVNpemUsIHdpdGhvdXRTdGF0ZVNhdmluZyl7XG4gICAgICAgIHZhciBzZWxmPXRoaXM7XG4gICAgICAgIGlmKHRoaXMuY29uZmlnLm5vZGVTaXplPT09bm9kZVNpemUpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmKCF3aXRob3V0U3RhdGVTYXZpbmcpe1xuICAgICAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSh7XG4gICAgICAgICAgICAgICAgZGF0YTp7XG4gICAgICAgICAgICAgICAgICAgIG5vZGVTaXplOiBzZWxmLmNvbmZpZy5ub2RlU2l6ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25VbmRvOiAoZGF0YSk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0Tm9kZVNpemUoZGF0YS5ub2RlU2l6ZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvblJlZG86IChkYXRhKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXROb2RlU2l6ZShub2RlU2l6ZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbmZpZy5ub2RlU2l6ZT1ub2RlU2l6ZTtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgaWYodGhpcy5pc01hbnVhbExheW91dCgpKXtcbiAgICAgICAgICAgIHRoaXMuZml0Tm9kZXNJblBsb3R0aW5nUmVnaW9uKHNlbGYuZGF0YS5nZXRSb290cygpKTtcbiAgICAgICAgICAgIHRoaXMudHJlZURlc2lnbmVyLnJlZHJhdyh0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldEVkZ2VTbGFudFdpZHRoTWF4KHdpZHRoLCB3aXRob3V0U3RhdGVTYXZpbmcpe1xuICAgICAgICB2YXIgc2VsZj10aGlzO1xuICAgICAgICBpZih0aGlzLmNvbmZpZy5lZGdlU2xhbnRXaWR0aE1heD09PXdpZHRoKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZighd2l0aG91dFN0YXRlU2F2aW5nKXtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoe1xuICAgICAgICAgICAgICAgIGRhdGE6e1xuICAgICAgICAgICAgICAgICAgICBlZGdlU2xhbnRXaWR0aE1heDogc2VsZi5jb25maWcuZWRnZVNsYW50V2lkdGhNYXhcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uVW5kbzogKGRhdGEpPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldEVkZ2VTbGFudFdpZHRoTWF4KGRhdGEuZWRnZVNsYW50V2lkdGhNYXgsIHRydWUpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25SZWRvOiAoZGF0YSk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0RWRnZVNsYW50V2lkdGhNYXgod2lkdGgsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb25maWcuZWRnZVNsYW50V2lkdGhNYXg9d2lkdGg7XG4gICAgICAgIHRoaXMudHJlZURlc2lnbmVyLnJlZHJhdyh0cnVlKTtcbiAgICB9XG5cbiAgICBhdXRvTGF5b3V0KHR5cGUsIHdpdGhvdXRTdGF0ZVNhdmluZyl7XG4gICAgICAgIHZhciBzZWxmPXRoaXM7XG5cblxuXG4gICAgICAgIGlmKCF3aXRob3V0U3RhdGVTYXZpbmcpe1xuICAgICAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSh7XG4gICAgICAgICAgICAgICAgZGF0YTp7XG4gICAgICAgICAgICAgICAgICAgIG5ld0xheW91dDogdHlwZSxcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudExheW91dDogc2VsZi5jb25maWcudHlwZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25VbmRvOiAoZGF0YSk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY29uZmlnLnR5cGUgPSBkYXRhLmN1cnJlbnRMYXlvdXQ7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuX2ZpcmVPbkF1dG9MYXlvdXRDaGFuZ2VkQ2FsbGJhY2tzKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvblJlZG86IChkYXRhKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5hdXRvTGF5b3V0KGRhdGEubmV3TGF5b3V0LCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbmZpZy50eXBlID0gdHlwZTtcbiAgICAgICAgaWYoIXRoaXMuZGF0YS5ub2Rlcy5sZW5ndGgpe1xuICAgICAgICAgICAgdGhpcy5fZmlyZU9uQXV0b0xheW91dENoYW5nZWRDYWxsYmFja3MoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBwcmV2VHJlZU1heFkgPSBzZWxmLmdldE5vZGVNaW5ZKCk7XG4gICAgICAgIHRoaXMuZGF0YS5nZXRSb290cygpLmZvckVhY2gocj0+e1xuICAgICAgICAgICAgdmFyIHJvb3QgPSBkMy5oaWVyYXJjaHkociwgZD0+e1xuICAgICAgICAgICAgICAgIHJldHVybiBkLmNoaWxkRWRnZXMuZmlsdGVyKGU9PiFlLiRoaWRkZW4pLm1hcChlPT5lLmNoaWxkTm9kZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gcm9vdC5zb3J0KChhLGIpPT5zZWxmLm5vZGVUeXBlT3JkZXJbYS5kYXRhLnR5cGVdLXNlbGYubm9kZVR5cGVPcmRlcltiLmRhdGEudHlwZV0pO1xuICAgICAgICAgICAgcm9vdC5zb3J0KChhLGIpPT5hLmRhdGEubG9jYXRpb24ueSAtIGIuZGF0YS5sb2NhdGlvbi55KTtcblxuXG4gICAgICAgICAgICB2YXIgbGF5b3V0O1xuICAgICAgICAgICAgaWYodHlwZT09PSdjbHVzdGVyJyl7XG4gICAgICAgICAgICAgICAgbGF5b3V0ID0gZDMuY2x1c3RlcigpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgbGF5b3V0ID0gZDMudHJlZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGF5b3V0Lm5vZGVTaXplKFtzZWxmLmNvbmZpZy5ncmlkSGVpZ2h0LCBzZWxmLmNvbmZpZy5ncmlkV2lkdGhdKTtcbiAgICAgICAgICAgIGxheW91dC5zZXBhcmF0aW9uKHNlbGYubm9kZVNlcGFyYXRpb24pO1xuXG4gICAgICAgICAgICBsYXlvdXQocm9vdCk7XG4gICAgICAgICAgICB2YXIgbWluWSA9IDk5OTk5OTk5OTtcbiAgICAgICAgICAgIHJvb3QuZWFjaChkPT57XG4gICAgICAgICAgICAgICAgbWluWSA9IE1hdGgubWluKG1pblksIGQueCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdmFyIGR5ID0gcm9vdC54IC0gbWluWSArIHByZXZUcmVlTWF4WTtcbiAgICAgICAgICAgIHZhciBkeCA9IHNlbGYuZ2V0Tm9kZU1pblgoKTtcbiAgICAgICAgICAgIHZhciBtYXhZPTA7XG4gICAgICAgICAgICByb290LmVhY2goZD0+e1xuICAgICAgICAgICAgICAgIGQuZGF0YS5sb2NhdGlvbi54ID0gZC55ICsgZHg7XG4gICAgICAgICAgICAgICAgZC5kYXRhLmxvY2F0aW9uLnkgPSBkLnggKyBkeTtcblxuICAgICAgICAgICAgICAgIG1heFkgPSBNYXRoLm1heChtYXhZLCBkLmRhdGEubG9jYXRpb24ueSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcHJldlRyZWVNYXhZID0gbWF4WSArIHNlbGYuY29uZmlnLm5vZGVTaXplK3NlbGYudHJlZU1hcmdpbjtcbiAgICAgICAgfSk7XG5cblxuICAgICAgICAvLyB0aGlzLnRyYW5zaXRpb24gPSB0cnVlO1xuICAgICAgICB0aGlzLnRyZWVEZXNpZ25lci5yZWRyYXcodHJ1ZSk7XG4gICAgICAgIC8vIHRoaXMudHJhbnNpdGlvbiA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuX2ZpcmVPbkF1dG9MYXlvdXRDaGFuZ2VkQ2FsbGJhY2tzKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGZpdE5vZGVzSW5QbG90dGluZ1JlZ2lvbihub2Rlcyl7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIHRvcFkgPSBkMy5taW4obm9kZXMsIG49Pm4ubG9jYXRpb24ueSk7XG4gICAgICAgIHZhciBtaW5ZID0gc2VsZi5nZXROb2RlTWluWSgpO1xuICAgICAgICB2YXIgZHkgPSB0b3BZIC0gbWluWTtcblxuICAgICAgICB2YXIgbWluWCA9IGQzLm1pbihub2Rlcywgbj0+bi5sb2NhdGlvbi54KTtcbiAgICAgICAgdmFyIGR4ID0gbWluWCAtIHNlbGYuZ2V0Tm9kZU1pblgoKTtcblxuICAgICAgICBpZihkeTwwIHx8ICBkeDwwKXtcbiAgICAgICAgICAgIG5vZGVzLmZvckVhY2gobj0+bi5tb3ZlKC1keCwgLWR5KSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtb3ZlTm9kZXMobm9kZXMsIGR4LCBkeSwgcGl2b3Qpe1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBsaW1pdCA9IHNlbGYuY29uZmlnLmxpbWl0Tm9kZVBvc2l0aW9uaW5nO1xuICAgICAgICBpZihsaW1pdCl7XG4gICAgICAgICAgICBpZihkeDwwKXtcbiAgICAgICAgICAgICAgICBub2Rlcy5zb3J0KChhLGIpPT5hLmxvY2F0aW9uLngtYi5sb2NhdGlvbi54KTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIG5vZGVzLnNvcnQoKGEsYik9PmIubG9jYXRpb24ueC1hLmxvY2F0aW9uLngpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgICAgICB2YXIgbWluWSA9IGQzLm1pbihub2RlcywgZD0+ZC5sb2NhdGlvbi55KTtcbiAgICAgICAgaWYobWluWSArIGR5IDwgc2VsZi5nZXROb2RlTWluWSgpKXtcbiAgICAgICAgICAgIGR5ID0gc2VsZi5nZXROb2RlTWluWSgpIC0gbWluWTtcbiAgICAgICAgfVxuXG4gICAgICAgIG5vZGVzLmZvckVhY2goZD0+e1xuICAgICAgICAgICAgaWYobGltaXQpe1xuICAgICAgICAgICAgICAgIExheW91dC5iYWNrdXBOb2RlTG9jYXRpb24oZCk7XG4gICAgICAgICAgICAgICAgdmFyIG1pblggPSBzZWxmLmdldE5vZGVNaW5YKGQpO1xuICAgICAgICAgICAgICAgIHZhciBtYXhYID0gc2VsZi5nZXROb2RlTWF4WChkKTtcblxuICAgICAgICAgICAgICAgIGQubG9jYXRpb24ueCA9IE1hdGgubWluKE1hdGgubWF4KGQubG9jYXRpb24ueCtkeCwgbWluWCksIG1heFgpO1xuICAgICAgICAgICAgICAgIGQubG9jYXRpb24ueSArPSBkeTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGQubG9jYXRpb24ueCArPWR4O1xuICAgICAgICAgICAgICAgIGQubG9jYXRpb24ueSArPSBkeTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcblxuXG4gICAgICAgIHZhciByZXZlcnRYID0gcGl2b3QgJiYgc2VsZi5jb25maWcubGltaXROb2RlUG9zaXRpb25pbmcgJiYgKHBpdm90LmxvY2F0aW9uLnggPT09IHBpdm90LiRsb2NhdGlvbi54KTtcblxuICAgICAgICBub2Rlcy5mb3JFYWNoKGQ9PntcbiAgICAgICAgICAgIGlmKHJldmVydFgpe1xuICAgICAgICAgICAgICAgIGQubG9jYXRpb24ueCA9IGQuJGxvY2F0aW9uLng7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLnRyZWVEZXNpZ25lci51cGRhdGVOb2RlUG9zaXRpb24oZCk7XG4gICAgICAgIH0pO1xuXG5cbiAgICB9XG5cbiAgICBzdGF0aWMgYmFja3VwTm9kZUxvY2F0aW9uKG5vZGUpIHtcbiAgICAgICAgbm9kZS4kbG9jYXRpb24gPSBuZXcgbW9kZWwuUG9pbnQobm9kZS5sb2NhdGlvbik7XG4gICAgfVxuXG4gICAgX2ZpcmVPbkF1dG9MYXlvdXRDaGFuZ2VkQ2FsbGJhY2tzKCl7XG4gICAgICAgIHRoaXMub25BdXRvTGF5b3V0Q2hhbmdlZC5mb3JFYWNoKGM9PmModGhpcy5jb25maWcudHlwZSkpO1xuICAgIH1cblxuICAgIHN0YXRpYyBzZXRIYW5naW5nUG9zaXRpb24oc2VsZWN0aW9uKXtcbiAgICAgICAgLy8gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgLy8gICAgIHNlbGVjdGlvbi5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgIC8vICAgICAgICAgdmFyIGggPSAgdGhpcy5nZXRCQm94KCkuaGVpZ2h0O1xuICAgICAgICAvLyAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5hdHRyKCdkeScsIGgpO1xuICAgICAgICAvLyAgICAgfSk7XG4gICAgICAgIC8vIH0sMCk7XG5cbiAgICAgICAgaWYoQXBwVXRpbHMuaXNIaWRkZW4oc2VsZWN0aW9uLm5vZGUoKSkpeyAvLyBzZXR0aW5nIGhhbmdpbmcgcG9zaXRpb24gb2YgaGlkZGVuIGVsZW1lbnRzIGZhaWxzIG9uIGZpcmVmb3hcbiAgICAgICAgICAgIHJldHVybiBzZWxlY3Rpb247XG4gICAgICAgIH1cblxuXG4gICAgICAgIHNlbGVjdGlvbi5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgaCA9ICB0aGlzLmdldEJCb3goKS5oZWlnaHQ7XG4gICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuYXR0cignZHknLCAnMC43NWVtJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzZWxlY3Rpb247XG4gICAgfVxuXG59XG5cblxuIiwiaW1wb3J0IHtBcHBVdGlsc30gZnJvbSAnLi9hcHAtdXRpbHMnXG5pbXBvcnQgKiBhcyBkMyBmcm9tICcuL2QzJ1xuaW1wb3J0IHtDb250ZXh0TWVudX0gZnJvbSAnLi9jb250ZXh0LW1lbnUvY29udGV4dC1tZW51J1xuXG5leHBvcnQgY2xhc3MgTm9kZURyYWdIYW5kbGVye1xuXG4gICAgdHJlZURlc2lnbmVyO1xuICAgIGRhdGE7XG4gICAgY29uZmlnO1xuXG4gICAgZHJhZztcblxuXG4gICAgY29uc3RydWN0b3IodHJlZURlc2lnbmVyLCBkYXRhKXtcbiAgICAgICAgdGhpcy50cmVlRGVzaWduZXIgPSB0cmVlRGVzaWduZXI7XG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG5cbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLmRyYWcgPSBkMy5kcmFnKClcbiAgICAgICAgICAgIC5zdWJqZWN0KGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgICAgICBpZihkPT1udWxsKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4OiBldmVudC54LFxuICAgICAgICAgICAgICAgICAgICAgICAgeTogZXZlbnQueVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgdCA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB4OiB0LmF0dHIoXCJ4XCIpICsgQXBwVXRpbHMuZ2V0VHJhbnNsYXRpb24odC5hdHRyKFwidHJhbnNmb3JtXCIpKVswXSxcbiAgICAgICAgICAgICAgICAgICAgeTogdC5hdHRyKFwieVwiKSArIEFwcFV0aWxzLmdldFRyYW5zbGF0aW9uKHQuYXR0cihcInRyYW5zZm9ybVwiKSlbMV1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbihcInN0YXJ0XCIsIGZ1bmN0aW9uKGQpe1xuICAgICAgICAgICAgICAgIHNlbGYuZHJhZ1N0YXJ0ZWQuY2FsbCh0aGlzLGQsIHNlbGYpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKFwiZHJhZ1wiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHNlbGYub25EcmFnLmNhbGwodGhpcywgZCwgc2VsZik7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKFwiZW5kXCIsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5kcmFnRW5kZWQuY2FsbCh0aGlzLCBkLCBzZWxmKTtcbiAgICAgICAgICAgIH0pXG4gICAgfVxuXG5cbiAgICBkcmFnU3RhcnRlZChkLHNlbGYpIHtcbiAgICAgICAgaWYoc2VsZi5pZ25vcmVEcmFnKXtcbiAgICAgICAgICAgIHNlbGYuaWdub3JlRHJhZz1mYWxzZTtcbiAgICAgICAgICAgIHNlbGYuaWdub3JlZERyYWc9dHJ1ZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzZWxmLmlnbm9yZWREcmFnPWZhbHNlO1xuXG4gICAgICAgIC8vIHNlbGYudHJlZURlc2lnbmVyLmxheW91dC5kaXNhYmxlQXV0b0xheW91dCgpO1xuICAgICAgICBDb250ZXh0TWVudS5oaWRlKCk7XG4gICAgICAgIHZhciBub2RlID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICBpZighbm9kZS5jbGFzc2VkKFwic2VsZWN0ZWRcIikpe1xuICAgICAgICAgICAgc2VsZi50cmVlRGVzaWduZXIuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNlbGYudHJlZURlc2lnbmVyLnNlbGVjdE5vZGUoZCk7XG4gICAgICAgIG5vZGUuY2xhc3NlZChcInNlbGVjdGVkIGRyYWdnaW5nXCIsIHRydWUpO1xuICAgICAgICBzZWxmLnNlbGVjdGVkTm9kZXMgPSBzZWxmLnRyZWVEZXNpZ25lci5nZXRTZWxlY3RlZE5vZGVzKHRydWUpO1xuICAgICAgICBzZWxmLnByZXZEcmFnRXZlbnQgPSBkMy5ldmVudDtcbiAgICAgICAgc2VsZi5kcmFnRXZlbnRDb3VudCA9IDA7XG4gICAgfVxuXG4gICAgb25EcmFnKGRyYWdnZWROb2RlLCBzZWxmKXtcbiAgICAgICAgaWYoc2VsZi5pZ25vcmVkRHJhZyl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZihzZWxmLmRyYWdFdmVudENvdW50PT0yKXtcbiAgICAgICAgICAgIHNlbGYuZGF0YS5zYXZlU3RhdGUoKTtcbiAgICAgICAgfVxuICAgICAgICBzZWxmLmRyYWdFdmVudENvdW50Kys7XG4gICAgICAgIGlmKHNlbGYuc2VsZWN0ZWROb2Rlcy5sZW5ndGg+NSAmJiBzZWxmLmRyYWdFdmVudENvdW50JTIhPTEpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGR4ID0gZDMuZXZlbnQueCAtIHNlbGYucHJldkRyYWdFdmVudC54O1xuICAgICAgICB2YXIgZHkgPSBkMy5ldmVudC55LSBzZWxmLnByZXZEcmFnRXZlbnQueTtcbiAgICAgICAgc2VsZi50cmVlRGVzaWduZXIubGF5b3V0Lm1vdmVOb2RlcyhzZWxmLnNlbGVjdGVkTm9kZXMsIGR4LCBkeSwgZHJhZ2dlZE5vZGUpO1xuXG5cbiAgICAgICAgc2VsZi5wcmV2RHJhZ0V2ZW50ID0gZDMuZXZlbnQ7XG4gICAgICAgIHNlbGYudHJlZURlc2lnbmVyLnJlZHJhd0VkZ2VzKCk7XG4gICAgICAgIHNlbGYudHJlZURlc2lnbmVyLnVwZGF0ZVBsb3R0aW5nUmVnaW9uU2l6ZSgpO1xuICAgIH1cblxuICAgIGRyYWdFbmRlZChkcmFnZ2VkTm9kZSwgc2VsZil7XG4gICAgICAgIHZhciBub2RlID0gZDMuc2VsZWN0KHRoaXMpLmNsYXNzZWQoXCJkcmFnZ2luZ1wiLCBmYWxzZSk7XG4gICAgICAgIGlmKHNlbGYuaWdub3JlZERyYWcpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHNlbGYudHJlZURlc2lnbmVyLmxheW91dC51cGRhdGUoZHJhZ2dlZE5vZGUpXG4gICAgfVxuXG4gICAgY2FuY2VsRHJhZygpe1xuICAgICAgICB0aGlzLmlnbm9yZURyYWcgPSB0cnVlO1xuICAgIH1cblxufVxuXG5cbiIsInZhciBlcHNpbG9uID0gMWUtMTI7XG52YXIgcGkgPSBNYXRoLlBJO1xudmFyIGhhbGZQaSA9IHBpIC8gMjtcbnZhciB0YXUgPSAyICogcGk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICAvKmRyYXc6IGZ1bmN0aW9uKGNvbnRleHQsIHNpemUpIHtcbiAgICAgICAgdmFyIHIgPSBNYXRoLnNxcnQoc2l6ZSAvIHBpKTtcbiAgICAgICAgY29udGV4dC5tb3ZlVG8ociwgMCk7XG4gICAgICAgIGNvbnRleHQuYXJjKDAsIDAsIHIsIDAsIHRhdSk7XG4gICAgfSovXG4gICAgZHJhdzogZnVuY3Rpb24oY29udGV4dCwgc2l6ZSkge1xuXG4gICAgICAgIHZhciByID0gTWF0aC5zcXJ0KHNpemUgLyBwaSk7XG4gICAgICAgIHZhciBkaXN0ID0wLjU1MjI4NDc0OTgzMSAqIHI7XG5cbiAgICAgICAgY29udGV4dC5tb3ZlVG8oLXIsIDApXG4gICAgICAgIC8vIGNvbnRleHQubGluZVRvKDIqciwgMipyKVxuICAgICAgICAvLyBjb250ZXh0LmJlemllckN1cnZlVG8oLXIsIC1kaXN0LCAtZGlzdCwgLXIsIDAsLXIpO1xuICAgICAgICBjb250ZXh0LmJlemllckN1cnZlVG8oLXIsIC1kaXN0LCAtZGlzdCwgLXIsIDAsLXIpO1xuXG4gICAgICAgIGNvbnRleHQuYmV6aWVyQ3VydmVUbyhkaXN0LCAtciwgciwgLWRpc3QsIHIsMCk7XG5cbiAgICAgICAgY29udGV4dC5iZXppZXJDdXJ2ZVRvKHIsIGRpc3QsIGRpc3QsIHIsIDAsIHIpO1xuXG4gICAgICAgIGNvbnRleHQuYmV6aWVyQ3VydmVUbygtZGlzdCwgciwgLXIsIGRpc3QsIC1yLCAwKTtcbiAgICB9XG59O1xuIiwidmFyIHNxcnQzID0gTWF0aC5zcXJ0KDMpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgZHJhdzogZnVuY3Rpb24oY29udGV4dCwgc2l6ZSkge1xuICAgICAgICB2YXIgciA9IE1hdGguc3FydChzaXplIC8gTWF0aC5QSSk7XG4gICAgICAgIGNvbnRleHQubW92ZVRvKC1yLCAwKTtcbiAgICAgICAgY29udGV4dC5saW5lVG8oMC45KnIsIC1yKTtcbiAgICAgICAgY29udGV4dC5saW5lVG8oMC45KnIsIHIpO1xuICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgIH1cbn07XG4iLCJpbXBvcnQge1V0aWxzfSBmcm9tIFwic2QtdXRpbHNcIjtcbmltcG9ydCB7aTE4bn0gZnJvbSAnLi9pMThuL2kxOG4nXG5cbmV4cG9ydCBjbGFzcyBUZW1wbGF0ZXN7XG5cbiAgICBzdGF0aWMgZ3Jvd2wgPSByZXF1aXJlKCcuL3RlbXBsYXRlcy9ncm93bF9tZXNzYWdlLmh0bWwnKTtcblxuICAgIHN0YXRpYyBnZXQodGVtcGxhdGVOYW1lLCB2YXJpYWJsZXMpe1xuICAgICAgICB2YXIgY29tcGlsZWQgPSBVdGlscy50ZW1wbGF0ZShUZW1wbGF0ZXNbdGVtcGxhdGVOYW1lXSx7ICdpbXBvcnRzJzogeyAnaTE4bic6IGkxOG4sICdUZW1wbGF0ZXMnOiBUZW1wbGF0ZXMsICdpbmNsdWRlJzogZnVuY3Rpb24obiwgdikge3JldHVybiBUZW1wbGF0ZXMuZ2V0KG4sIHYpfSB9IH0pO1xuICAgICAgICBpZih2YXJpYWJsZXMpe1xuICAgICAgICAgICAgdmFyaWFibGVzLnZhcmlhYmxlcyA9IHZhcmlhYmxlcztcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB2YXJpYWJsZXMgPSB7dmFyaWFibGVzOnt9fVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb21waWxlZCh2YXJpYWJsZXMpXG5cbiAgICB9XG5cbiAgICBzdGF0aWMgc3R5bGVSdWxlKHNlbGVjdG9yLCBwcm9wcyl7XG4gICAgICAgIHZhciBzID0gc2VsZWN0b3IrICd7JztcbiAgICAgICAgcHJvcHMuZm9yRWFjaChwPT4gcys9VGVtcGxhdGVzLnN0eWxlUHJvcChwWzBdLCBwWzFdKSk7XG4gICAgICAgIHMrPSd9ICc7XG4gICAgICAgIHJldHVybiBzO1xuICAgIH1cbiAgICBzdGF0aWMgc3R5bGVQcm9wKHN0eWxlTmFtZSwgdmFyaWFibGVOYW1lKXtcbiAgICAgICAgcmV0dXJuICBzdHlsZU5hbWUrJzogPCU9ICcrdmFyaWFibGVOYW1lKycgJT47ICdcbiAgICB9XG5cbiAgICBzdGF0aWMgdHJlZURlc2lnbmVyU2VsZWN0b3IgPSAnc3ZnLnNkLXRyZWUtZGVzaWduZXInO1xuICAgIHN0YXRpYyBub2RlU2VsZWN0b3IodHlwZSwgY2xhenope1xuICAgICAgICB2YXIgcyA9IFRlbXBsYXRlcy50cmVlRGVzaWduZXJTZWxlY3RvcisnIC5ub2RlJztcbiAgICAgICAgaWYodHlwZSl7XG4gICAgICAgICAgICBzKz0nLicrdHlwZSsnLW5vZGUnO1xuICAgICAgICB9XG4gICAgICAgIGlmKGNsYXp6KXtcbiAgICAgICAgICAgIHMrPScuJytjbGF6ejtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcztcbiAgICB9XG4gICAgc3RhdGljIGVkZ2VTZWxlY3RvcihjbGF6eil7XG4gICAgICAgIHZhciBzID0gVGVtcGxhdGVzLnRyZWVEZXNpZ25lclNlbGVjdG9yKycgLmVkZ2UnO1xuICAgICAgICBpZihjbGF6eil7XG4gICAgICAgICAgICBzKz0nLicrY2xheno7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHM7XG4gICAgfVxuXG4gICAgc3RhdGljIHRyZWVEZXNpZ25lclN0eWxlcyA9XG5cbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMudHJlZURlc2lnbmVyU2VsZWN0b3IsW1xuICAgICAgICAgICAgWydmb250LXNpemUnLCAnZm9udFNpemUnXSxcbiAgICAgICAgICAgIFsnZm9udC1mYW1pbHknLCAnZm9udEZhbWlseSddLFxuICAgICAgICAgICAgWydmb250LXdlaWdodCcsICdmb250V2VpZ2h0J10sXG4gICAgICAgICAgICBbJ2ZvbnQtc3R5bGUnLCAnZm9udFN0eWxlJ11cbiAgICAgICAgXSkrXG4gICAgICAgIC8vICAgbm9kZVxuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5ub2RlU2VsZWN0b3IoKSsnIHBhdGgnLFtcbiAgICAgICAgICAgIFsnZmlsbCcsICdub2RlLmZpbGwnXSxcbiAgICAgICAgICAgIFsnc3Ryb2tlLXdpZHRoJywgJ25vZGUuc3Ryb2tlV2lkdGgnXVxuICAgICAgICBdKStcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCdkZWNpc2lvbicsICdvcHRpbWFsJykrJyBwYXRoLCAnK1RlbXBsYXRlcy5ub2RlU2VsZWN0b3IoJ2NoYW5jZScsICdvcHRpbWFsJykrJyBwYXRoLCcgK1RlbXBsYXRlcy5ub2RlU2VsZWN0b3IoJ3Rlcm1pbmFsJywgJ29wdGltYWwnKSsnIHBhdGgnLFtcbiAgICAgICAgICAgIFsnc3Ryb2tlJywgJ25vZGUub3B0aW1hbC5zdHJva2UnXSxcbiAgICAgICAgICAgIFsnc3Ryb2tlLXdpZHRoJywgJ25vZGUub3B0aW1hbC5zdHJva2VXaWR0aCddXG4gICAgICAgIF0pK1xuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5ub2RlU2VsZWN0b3IoKSsnIC5sYWJlbCcsW1xuICAgICAgICAgICAgWydmb250LXNpemUnLCAnbm9kZS5sYWJlbC5mb250U2l6ZSddLFxuICAgICAgICAgICAgWydmaWxsJywgJ25vZGUubGFiZWwuY29sb3InXVxuICAgICAgICBdKStcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCkrJyAucGF5b2ZmJyxbXG4gICAgICAgICAgICBbJ2ZvbnQtc2l6ZScsICdub2RlLnBheW9mZi5mb250U2l6ZSddLFxuICAgICAgICAgICAgWydmaWxsJywgJ25vZGUucGF5b2ZmLmNvbG9yJ10sXG4gICAgICAgIF0pK1xuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5ub2RlU2VsZWN0b3IoKSsnIC5wYXlvZmYubmVnYXRpdmUnLFtcbiAgICAgICAgICAgIFsnZmlsbCcsICdub2RlLnBheW9mZi5uZWdhdGl2ZUNvbG9yJ10sXG4gICAgICAgIF0pK1xuXG4gICAgICAgIC8vICAgIGRlY2lzaW9uIG5vZGVcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCdkZWNpc2lvbicpKycgcGF0aCcsW1xuICAgICAgICAgICAgWydmaWxsJywgJ25vZGUuZGVjaXNpb24uZmlsbCddLFxuICAgICAgICAgICAgWydzdHJva2UnLCAnbm9kZS5kZWNpc2lvbi5zdHJva2UnXVxuICAgICAgICBdKStcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCdkZWNpc2lvbicsICdzZWxlY3RlZCcpKycgcGF0aCcsW1xuICAgICAgICAgICAgWydmaWxsJywgJ25vZGUuZGVjaXNpb24uc2VsZWN0ZWQuZmlsbCddXG4gICAgICAgIF0pK1xuXG4gICAgICAgIC8vICAgIGNoYW5jZSBub2RlXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLm5vZGVTZWxlY3RvcignY2hhbmNlJykrJyBwYXRoJyxbXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnbm9kZS5jaGFuY2UuZmlsbCddLFxuICAgICAgICAgICAgWydzdHJva2UnLCAnbm9kZS5jaGFuY2Uuc3Ryb2tlJ11cbiAgICAgICAgXSkrXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLm5vZGVTZWxlY3RvcignY2hhbmNlJywgJ3NlbGVjdGVkJykrJyBwYXRoJyxbXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnbm9kZS5jaGFuY2Uuc2VsZWN0ZWQuZmlsbCddXG4gICAgICAgIF0pK1xuXG4gICAgICAgIC8vICAgIHRlcm1pbmFsIG5vZGVcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCd0ZXJtaW5hbCcpKycgcGF0aCcsW1xuICAgICAgICAgICAgWydmaWxsJywgJ25vZGUudGVybWluYWwuZmlsbCddLFxuICAgICAgICAgICAgWydzdHJva2UnLCAnbm9kZS50ZXJtaW5hbC5zdHJva2UnXVxuICAgICAgICBdKStcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCd0ZXJtaW5hbCcsICdzZWxlY3RlZCcpKycgcGF0aCcsW1xuICAgICAgICAgICAgWydmaWxsJywgJ25vZGUudGVybWluYWwuc2VsZWN0ZWQuZmlsbCddXG4gICAgICAgIF0pK1xuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5ub2RlU2VsZWN0b3IoJ3Rlcm1pbmFsJykrJyAuYWdncmVnYXRlZC1wYXlvZmYnLFtcbiAgICAgICAgICAgIFsnZm9udC1zaXplJywgJ25vZGUudGVybWluYWwucGF5b2ZmLmZvbnRTaXplJ10sXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnbm9kZS50ZXJtaW5hbC5wYXlvZmYuY29sb3InXSxcbiAgICAgICAgXSkrXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLm5vZGVTZWxlY3RvcigndGVybWluYWwnKSsnIC5hZ2dyZWdhdGVkLXBheW9mZi5uZWdhdGl2ZScsW1xuICAgICAgICAgICAgWydmaWxsJywgJ25vZGUudGVybWluYWwucGF5b2ZmLm5lZ2F0aXZlQ29sb3InXSxcbiAgICAgICAgXSkrXG5cblxuICAgICAgICAvL3Byb2JhYmlsaXR5XG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLnRyZWVEZXNpZ25lclNlbGVjdG9yKycgLm5vZGUgLnByb2JhYmlsaXR5LXRvLWVudGVyLCAnK1RlbXBsYXRlcy50cmVlRGVzaWduZXJTZWxlY3RvcisnIC5lZGdlIC5wcm9iYWJpbGl0eScsW1xuICAgICAgICAgICAgWydmb250LXNpemUnLCAncHJvYmFiaWxpdHkuZm9udFNpemUnXSxcbiAgICAgICAgICAgIFsnZmlsbCcsICdwcm9iYWJpbGl0eS5jb2xvciddXG4gICAgICAgIF0pK1xuXG4gICAgICAgIC8vZWRnZVxuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5lZGdlU2VsZWN0b3IoKSsnIHBhdGgnLFtcbiAgICAgICAgICAgIFsnc3Ryb2tlJywgJ2VkZ2Uuc3Ryb2tlJ10sXG4gICAgICAgICAgICBbJ3N0cm9rZS13aWR0aCcsICdlZGdlLnN0cm9rZVdpZHRoJ11cbiAgICAgICAgXSkrXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLnRyZWVEZXNpZ25lclNlbGVjdG9yKycgbWFya2VyI2Fycm93IHBhdGgnLFtcbiAgICAgICAgICAgIFsnZmlsbCcsICdlZGdlLnN0cm9rZSddLFxuICAgICAgICBdKStcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMuZWRnZVNlbGVjdG9yKCdvcHRpbWFsJykrJyBwYXRoJyxbXG4gICAgICAgICAgICBbJ3N0cm9rZScsICdlZGdlLm9wdGltYWwuc3Ryb2tlJ10sXG4gICAgICAgICAgICBbJ3N0cm9rZS13aWR0aCcsICdlZGdlLm9wdGltYWwuc3Ryb2tlV2lkdGgnXVxuICAgICAgICBdKStcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMudHJlZURlc2lnbmVyU2VsZWN0b3IrJyBtYXJrZXIjYXJyb3ctb3B0aW1hbCBwYXRoJyxbXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnZWRnZS5vcHRpbWFsLnN0cm9rZSddLFxuICAgICAgICBdKStcblxuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5lZGdlU2VsZWN0b3IoJ3NlbGVjdGVkJykrJyBwYXRoJyxbXG4gICAgICAgICAgICBbJ3N0cm9rZScsICdlZGdlLnNlbGVjdGVkLnN0cm9rZSddLFxuICAgICAgICAgICAgWydzdHJva2Utd2lkdGgnLCAnZWRnZS5zZWxlY3RlZC5zdHJva2VXaWR0aCddXG4gICAgICAgIF0pK1xuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy50cmVlRGVzaWduZXJTZWxlY3RvcisnIG1hcmtlciNhcnJvdy1zZWxlY3RlZCBwYXRoJyxbXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnZWRnZS5zZWxlY3RlZC5zdHJva2UnXSxcbiAgICAgICAgXSkrXG5cbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMuZWRnZVNlbGVjdG9yKCkrJyAubGFiZWwnLFtcbiAgICAgICAgICAgIFsnZm9udC1zaXplJywgJ2VkZ2UubGFiZWwuZm9udFNpemUnXSxcbiAgICAgICAgICAgIFsnZmlsbCcsICdlZGdlLmxhYmVsLmNvbG9yJ11cbiAgICAgICAgXSkrXG5cbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMuZWRnZVNlbGVjdG9yKCkrJyAucGF5b2ZmJyxbXG4gICAgICAgICAgICBbJ2ZvbnQtc2l6ZScsICdlZGdlLnBheW9mZi5mb250U2l6ZSddLFxuICAgICAgICAgICAgWydmaWxsJywgJ2VkZ2UucGF5b2ZmLmNvbG9yJ10sXG4gICAgICAgIF0pK1xuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5lZGdlU2VsZWN0b3IoKSsnIC5wYXlvZmYubmVnYXRpdmUnLFtcbiAgICAgICAgICAgIFsnZmlsbCcsICdlZGdlLnBheW9mZi5uZWdhdGl2ZUNvbG9yJ10sXG4gICAgICAgIF0pK1xuXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLnRyZWVEZXNpZ25lclNlbGVjdG9yKycgLnNkLXRpdGxlLWNvbnRhaW5lciB0ZXh0LnNkLXRpdGxlJyxbXG4gICAgICAgICAgICBbJ2ZvbnQtc2l6ZScsICd0aXRsZS5mb250U2l6ZSddLFxuICAgICAgICAgICAgWydmb250LXdlaWdodCcsICd0aXRsZS5mb250V2VpZ2h0J10sXG4gICAgICAgICAgICBbJ2ZvbnQtc3R5bGUnLCAndGl0bGUuZm9udFN0eWxlJ10sXG4gICAgICAgICAgICBbJ2ZpbGwnLCAndGl0bGUuY29sb3InXVxuICAgICAgICBdKSArXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLnRyZWVEZXNpZ25lclNlbGVjdG9yKycgLnNkLXRpdGxlLWNvbnRhaW5lciB0ZXh0LnNkLWRlc2NyaXB0aW9uJyxbXG4gICAgICAgICAgICBbJ2ZvbnQtc2l6ZScsICdkZXNjcmlwdGlvbi5mb250U2l6ZSddLFxuICAgICAgICAgICAgWydmb250LXdlaWdodCcsICdkZXNjcmlwdGlvbi5mb250V2VpZ2h0J10sXG4gICAgICAgICAgICBbJ2ZvbnQtc3R5bGUnLCAnZGVzY3JpcHRpb24uZm9udFN0eWxlJ10sXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnZGVzY3JpcHRpb24uY29sb3InXVxuICAgICAgICBdKVxufVxuXG5cblxuXG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwibW9kdWxlLmV4cG9ydHMgPSBcXFwiPGRpdiBjbGFzcz1cXFxcXFxcInNkLWdyb3dsLW1lc3NhZ2UgPCU9dHlwZSU+XFxcXFxcXCI+XFxcXG4gICAgPGRpdiBjbGFzcz1cXFxcXFxcInNkLWdyb3dsLW1lc3NhZ2UtdGV4dFxcXFxcXFwiPlxcXFxuICAgICAgICA8JT0gbWVzc2FnZSAlPlxcXFxuICAgIDwvZGl2PlxcXFxuPC9kaXY+XFxcXG5cXFwiO1xcblwiO1xuIiwiaW1wb3J0IHtBcHBVdGlsc30gZnJvbSAnLi9hcHAtdXRpbHMnXG5pbXBvcnQgKiBhcyBkMyBmcm9tICcuL2QzJ1xuaW1wb3J0IHtDb250ZXh0TWVudX0gZnJvbSAnLi9jb250ZXh0LW1lbnUvY29udGV4dC1tZW51J1xuXG5leHBvcnQgY2xhc3MgVGV4dERyYWdIYW5kbGVye1xuXG4gICAgdHJlZURlc2lnbmVyO1xuICAgIGRhdGE7XG4gICAgY29uZmlnO1xuXG4gICAgZHJhZztcblxuXG4gICAgY29uc3RydWN0b3IodHJlZURlc2lnbmVyLCBkYXRhKXtcbiAgICAgICAgdGhpcy50cmVlRGVzaWduZXIgPSB0cmVlRGVzaWduZXI7XG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG5cbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLmRyYWcgPSBkMy5kcmFnKClcbiAgICAgICAgICAgIC5zdWJqZWN0KGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgICAgICBpZihkPT1udWxsKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4OiBldmVudC54LFxuICAgICAgICAgICAgICAgICAgICAgICAgeTogZXZlbnQueVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgdCA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB4OiB0LmF0dHIoXCJ4XCIpICsgQXBwVXRpbHMuZ2V0VHJhbnNsYXRpb24odC5hdHRyKFwidHJhbnNmb3JtXCIpKVswXSxcbiAgICAgICAgICAgICAgICAgICAgeTogdC5hdHRyKFwieVwiKSArIEFwcFV0aWxzLmdldFRyYW5zbGF0aW9uKHQuYXR0cihcInRyYW5zZm9ybVwiKSlbMV1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbihcInN0YXJ0XCIsIGZ1bmN0aW9uKGQpe1xuICAgICAgICAgICAgICAgIHNlbGYuZHJhZ1N0YXJ0ZWQuY2FsbCh0aGlzLGQsIHNlbGYpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKFwiZHJhZ1wiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHNlbGYub25EcmFnLmNhbGwodGhpcywgZCwgc2VsZik7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKFwiZW5kXCIsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5kcmFnRW5kZWQuY2FsbCh0aGlzLCBkLCBzZWxmKTtcbiAgICAgICAgICAgIH0pXG4gICAgfVxuXG5cbiAgICBkcmFnU3RhcnRlZChkLHNlbGYpIHtcbiAgICAgICAgLy8gc2VsZi50cmVlRGVzaWduZXIubGF5b3V0LmRpc2FibGVBdXRvTGF5b3V0KCk7XG4gICAgICAgIENvbnRleHRNZW51LmhpZGUoKTtcbiAgICAgICAgdmFyIHRleHQgPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgIGlmKCF0ZXh0LmNsYXNzZWQoXCJzZWxlY3RlZFwiKSl7XG4gICAgICAgICAgICBzZWxmLnRyZWVEZXNpZ25lci5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2VsZi50cmVlRGVzaWduZXIuc2VsZWN0VGV4dChkKTtcbiAgICAgICAgdGV4dC5jbGFzc2VkKFwic2VsZWN0ZWQgZHJhZ2dpbmdcIiwgdHJ1ZSk7XG4gICAgICAgIHNlbGYuc2VsZWN0ZWROb2RlcyA9IHNlbGYudHJlZURlc2lnbmVyLmdldFNlbGVjdGVkTm9kZXMoKTtcbiAgICAgICAgc2VsZi5wcmV2RHJhZ0V2ZW50ID0gZDMuZXZlbnQ7XG4gICAgICAgIHNlbGYuZHJhZ0V2ZW50Q291bnQgPSAwO1xuICAgIH1cblxuICAgIG9uRHJhZyhkcmFnZ2VkVGV4dCwgc2VsZil7XG4gICAgICAgIGlmKHNlbGYuZHJhZ0V2ZW50Q291bnQ9PTIpe1xuICAgICAgICAgICAgc2VsZi5kYXRhLnNhdmVTdGF0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHNlbGYuZHJhZ0V2ZW50Q291bnQrKztcblxuICAgICAgICB2YXIgZHggPSBkMy5ldmVudC54IC0gc2VsZi5wcmV2RHJhZ0V2ZW50Lng7XG4gICAgICAgIHZhciBkeSA9IGQzLmV2ZW50LnktIHNlbGYucHJldkRyYWdFdmVudC55O1xuXG4gICAgICAgIGRyYWdnZWRUZXh0LmxvY2F0aW9uLm1vdmUoZHgsIGR5KTtcbiAgICAgICAgc2VsZi50cmVlRGVzaWduZXIudXBkYXRlVGV4dFBvc2l0aW9uKGRyYWdnZWRUZXh0KTtcblxuICAgICAgICBzZWxmLnByZXZEcmFnRXZlbnQgPSBkMy5ldmVudDtcbiAgICAgICAgc2VsZi50cmVlRGVzaWduZXIudXBkYXRlUGxvdHRpbmdSZWdpb25TaXplKCk7XG4gICAgfVxuXG4gICAgZHJhZ0VuZGVkKGRyYWdnZWROb2RlLCBzZWxmKXtcbiAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5jbGFzc2VkKFwiZHJhZ2dpbmdcIiwgZmFsc2UpO1xuICAgIH1cblxufVxuXG5cbiIsImltcG9ydCAqIGFzIGQzIGZyb20gJy4vZDMnXG5pbXBvcnQge1V0aWxzfSBmcm9tICdzZC11dGlscydcblxuZXhwb3J0IGNsYXNzIFRvb2x0aXAge1xuICAgIHN0YXRpYyBnZXRDb250YWluZXIoKXtcbiAgICAgICAgcmV0dXJuIGQzLnNlbGVjdChcImJvZHlcIikuc2VsZWN0T3JBcHBlbmQoJ2Rpdi5zZC10b29sdGlwJyk7XG4gICAgfVxuXG4gICAgc3RhdGljIHNob3coaHRtbCwgeE9mZnNldCA9IDUsIHlPZmZzZXQgPSAyOCwgZXZlbnQsIGR1cmF0aW9uPW51bGwpIHtcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IFRvb2x0aXAuZ2V0Q29udGFpbmVyKClcbiAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgMCk7XG4gICAgICAgIGNvbnRhaW5lci50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kdXJhdGlvbigyMDApXG4gICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIC45OCk7XG4gICAgICAgIGNvbnRhaW5lci5odG1sKGh0bWwpO1xuICAgICAgICBUb29sdGlwLnVwZGF0ZVBvc2l0aW9uKHhPZmZzZXQsIHlPZmZzZXQsIGV2ZW50KTtcbiAgICAgICAgaWYoZHVyYXRpb24pe1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIFRvb2x0aXAuaGlkZSgpO1xuICAgICAgICAgICAgfSwgZHVyYXRpb24pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgdXBkYXRlUG9zaXRpb24oeE9mZnNldCA9IDUsIHlPZmZzZXQgPSAyOCwgZXZlbnQpIHtcbiAgICAgICAgZXZlbnQgPSBldmVudCB8fCBkMy5ldmVudDtcbiAgICAgICAgVG9vbHRpcC5nZXRDb250YWluZXIoKVxuICAgICAgICAgICAgLnN0eWxlKFwibGVmdFwiLCAoZXZlbnQucGFnZVggKyB4T2Zmc2V0KSArIFwicHhcIilcbiAgICAgICAgICAgIC5zdHlsZShcInRvcFwiLCAoZXZlbnQucGFnZVkgLSB5T2Zmc2V0KSArIFwicHhcIik7XG4gICAgfVxuXG4gICAgc3RhdGljIGhpZGUoZHVyYXRpb24gPSA1MDApIHtcbiAgICAgICAgdmFyIHQgPSBUb29sdGlwLmdldENvbnRhaW5lcigpO1xuICAgICAgICBpZihkdXJhdGlvbil7XG4gICAgICAgICAgICB0ID0gdC50cmFuc2l0aW9uKCkuZHVyYXRpb24oZHVyYXRpb24pXG4gICAgICAgIH1cbiAgICAgICAgdC5zdHlsZShcIm9wYWNpdHlcIiwgMCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGF0dGFjaCh0YXJnZXQsIGh0bWxPckZuLCB4T2Zmc2V0LCB5T2Zmc2V0KSB7XG4gICAgICAgIHRhcmdldC5vbignbW91c2VvdmVyJywgZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgIHZhciBodG1sID0gbnVsbDtcbiAgICAgICAgICAgIGlmIChVdGlscy5pc0Z1bmN0aW9uKGh0bWxPckZuKSkge1xuICAgICAgICAgICAgICAgIGh0bWwgPSBodG1sT3JGbihkLCBpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaHRtbCA9IGh0bWxPckZuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaHRtbCAhPT0gbnVsbCAmJiBodG1sICE9PSB1bmRlZmluZWQgJiYgaHRtbCAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICBUb29sdGlwLnNob3coaHRtbCwgeE9mZnNldCwgeU9mZnNldCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBUb29sdGlwLmhpZGUoMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSkub24oJ21vdXNlbW92ZScsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICBUb29sdGlwLnVwZGF0ZVBvc2l0aW9uKHhPZmZzZXQsIHlPZmZzZXQpO1xuICAgICAgICB9KS5vbihcIm1vdXNlb3V0XCIsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICBUb29sdGlwLmhpZGUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0ICogYXMgZDMgZnJvbSBcIi4vZDNcIjtcbmltcG9ydCB7VXRpbHN9IGZyb20gXCJzZC11dGlsc1wiO1xuaW1wb3J0IHtBcHBVdGlsc30gZnJvbSBcIi4vYXBwLXV0aWxzXCI7XG5pbXBvcnQge2RvbWFpbiBhcyBtb2RlbH0gZnJvbSBcInNkLW1vZGVsXCI7XG5pbXBvcnQge0NvbnRleHRNZW51fSBmcm9tIFwiLi9jb250ZXh0LW1lbnUvY29udGV4dC1tZW51XCI7XG5pbXBvcnQge01haW5Db250ZXh0TWVudX0gZnJvbSBcIi4vY29udGV4dC1tZW51L21haW4tY29udGV4dC1tZW51XCI7XG5pbXBvcnQge05vZGVDb250ZXh0TWVudX0gZnJvbSBcIi4vY29udGV4dC1tZW51L25vZGUtY29udGV4dC1tZW51XCI7XG5pbXBvcnQge0xheW91dH0gZnJvbSBcIi4vbGF5b3V0XCI7XG5pbXBvcnQge05vZGVEcmFnSGFuZGxlcn0gZnJvbSBcIi4vbm9kZS1kcmFnLWhhbmRsZXJcIjtcbmltcG9ydCB7VG9vbHRpcH0gZnJvbSBcIi4vdG9vbHRpcFwiO1xuaW1wb3J0IHtUZW1wbGF0ZXN9IGZyb20gXCIuL3RlbXBsYXRlc1wiO1xuaW1wb3J0IHtUZXh0RHJhZ0hhbmRsZXJ9IGZyb20gXCIuL3RleHQtZHJhZy1oYW5kbGVyXCI7XG5pbXBvcnQge1RleHRDb250ZXh0TWVudX0gZnJvbSBcIi4vY29udGV4dC1tZW51L3RleHQtY29udGV4dC1tZW51XCI7XG5pbXBvcnQge0VkZ2VDb250ZXh0TWVudX0gZnJvbSBcIi4vY29udGV4dC1tZW51L2VkZ2UtY29udGV4dC1tZW51XCI7XG5pbXBvcnQgKiBhcyBIYW1tZXIgZnJvbSBcImhhbW1lcmpzXCI7XG5pbXBvcnQge2kxOG59IGZyb20gXCIuL2kxOG4vaTE4blwiO1xuXG5cbmV4cG9ydCBjbGFzcyBUcmVlRGVzaWduZXJDb25maWcge1xuICAgIHdpZHRoID0gdW5kZWZpbmVkO1xuICAgIGhlaWdodCA9IHVuZGVmaW5lZDtcbiAgICBtYXJnaW4gPSB7XG4gICAgICAgIGxlZnQ6IDI1LFxuICAgICAgICByaWdodDogMjUsXG4gICAgICAgIHRvcDogMjUsXG4gICAgICAgIGJvdHRvbTogMjVcbiAgICB9O1xuICAgIGxuZyA9ICdlbic7XG4gICAgbGF5b3V0PSB7XG4gICAgICAgIHR5cGU6ICd0cmVlJyxcbiAgICAgICAgbm9kZVNpemU6IDQwLFxuICAgICAgICBsaW1pdE5vZGVQb3NpdGlvbmluZzogdHJ1ZSxcbiAgICAgICAgZ3JpZEhlaWdodDogNzUsXG4gICAgICAgIGdyaWRXaWR0aDogMTUwLFxuICAgICAgICBlZGdlU2xhbnRXaWR0aE1heDogMjBcbiAgICB9O1xuICAgIGZvbnRGYW1pbHkgPSAnc2Fucy1zZXJpZic7XG4gICAgZm9udFNpemUgPSAnMTJweCc7XG4gICAgZm9udFdlaWdodCA9ICdub3JtYWwnO1xuICAgIGZvbnRTdHlsZSA9ICdub3JtYWwnO1xuICAgIG5vZGUgPSB7XG4gICAgICAgIHN0cm9rZVdpZHRoOiAnMXB4JyxcbiAgICAgICAgb3B0aW1hbDoge1xuICAgICAgICAgICAgc3Ryb2tlOiAnIzAwNmYwMCcsXG4gICAgICAgICAgICBzdHJva2VXaWR0aDogJzEuNXB4JyxcbiAgICAgICAgfSxcbiAgICAgICAgbGFiZWw6IHtcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMWVtJyxcbiAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgICAgIH0sXG4gICAgICAgIHBheW9mZjoge1xuICAgICAgICAgICAgZm9udFNpemU6ICcxZW0nLFxuICAgICAgICAgICAgY29sb3I6ICdibGFjaycsXG4gICAgICAgICAgICBuZWdhdGl2ZUNvbG9yOiAnI2I2MDAwMCdcbiAgICAgICAgfSxcbiAgICAgICAgZGVjaXNpb246IHtcbiAgICAgICAgICAgIGZpbGw6ICcjZmY3Nzc3JyxcbiAgICAgICAgICAgIHN0cm9rZTogJyM2NjAwMDAnLFxuXG4gICAgICAgICAgICBzZWxlY3RlZDoge1xuICAgICAgICAgICAgICAgIGZpbGw6ICcjYWEzMzMzJyxcbiAgICAgICAgICAgICAgICAvLyBzdHJva2U6ICcjNjY2NjAwJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjaGFuY2U6IHtcbiAgICAgICAgICAgIGZpbGw6ICcjZmZmZjQ0JyxcbiAgICAgICAgICAgIHN0cm9rZTogJyM2NjY2MDAnLFxuXG4gICAgICAgICAgICBzZWxlY3RlZDoge1xuICAgICAgICAgICAgICAgIGZpbGw6ICcjYWFhYTAwJyxcbiAgICAgICAgICAgICAgICAvLyBzdHJva2U6ICcjNjY2NjAwJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB0ZXJtaW5hbDp7XG4gICAgICAgICAgICBmaWxsOiAnIzQ0ZmY0NCcsXG4gICAgICAgICAgICBzdHJva2U6ICdibGFjaycsXG4gICAgICAgICAgICBzZWxlY3RlZDoge1xuICAgICAgICAgICAgICAgIGZpbGw6ICcjMDBhYTAwJyxcbiAgICAgICAgICAgICAgICAvLyBzdHJva2U6ICdibGFjaydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwYXlvZmY6IHtcbiAgICAgICAgICAgICAgICBmb250U2l6ZTogJzFlbScsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaycsXG4gICAgICAgICAgICAgICAgbmVnYXRpdmVDb2xvcjogJyNiNjAwMDAnXG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgfTtcbiAgICBlZGdlPXtcbiAgICAgICAgc3Ryb2tlOiAnIzQyNDI0MicsXG4gICAgICAgIHN0cm9rZVdpZHRoOiAnMS41JyxcbiAgICAgICAgb3B0aW1hbDp7XG4gICAgICAgICAgICBzdHJva2U6ICcjMDA2ZjAwJyxcbiAgICAgICAgICAgIHN0cm9rZVdpZHRoOiAnMi40JyxcbiAgICAgICAgfSxcbiAgICAgICAgc2VsZWN0ZWQ6e1xuICAgICAgICAgICAgc3Ryb2tlOiAnIzA0NWFkMScsXG4gICAgICAgICAgICBzdHJva2VXaWR0aDogJzMuNScsXG4gICAgICAgIH0sXG4gICAgICAgIGxhYmVsOiB7XG4gICAgICAgICAgICBmb250U2l6ZTogJzFlbScsXG4gICAgICAgICAgICBjb2xvcjogJ2JhY2snXG4gICAgICAgIH0sXG4gICAgICAgIHBheW9mZjp7XG4gICAgICAgICAgICBmb250U2l6ZTogJzFlbScsXG4gICAgICAgICAgICBjb2xvcjogJ2JsYWNrJyxcbiAgICAgICAgICAgIG5lZ2F0aXZlQ29sb3I6ICcjYjYwMDAwJ1xuICAgICAgICB9XG5cbiAgICB9O1xuICAgIHByb2JhYmlsaXR5ID0ge1xuICAgICAgICBmb250U2l6ZTogJzFlbScsXG4gICAgICAgIGNvbG9yOiAnIzAwMDBkNydcbiAgICB9O1xuICAgIHRpdGxlID0ge1xuICAgICAgICBmb250U2l6ZTogJzE2cHgnLFxuICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXG4gICAgICAgIGZvbnRTdHlsZTogJ25vcm1hbCcsXG4gICAgICAgIGNvbG9yOiAnIzAwMDAwMCcsXG4gICAgICAgIG1hcmdpbjp7XG4gICAgICAgICAgICB0b3A6IDE1LFxuICAgICAgICAgICAgYm90dG9tOiAxMFxuICAgICAgICB9XG4gICAgfTtcbiAgICBkZXNjcmlwdGlvbiA9IHtcbiAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgZm9udFNpemU6ICcxMnB4JyxcbiAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxuICAgICAgICBmb250U3R5bGU6ICdub3JtYWwnLFxuICAgICAgICBjb2xvcjogJyMwMDAwMDAnLFxuICAgICAgICBtYXJnaW46e1xuICAgICAgICAgICAgdG9wOiA1LFxuICAgICAgICAgICAgYm90dG9tOiAxMFxuICAgICAgICB9XG4gICAgfTtcblxuICAgIHJlYWRPbmx5PSBmYWxzZTtcbiAgICBkaXNhYmxlQW5pbWF0aW9ucz1mYWxzZTtcbiAgICBmb3JjZUZ1bGxFZGdlUmVkcmF3PWZhbHNlO1xuICAgIGhpZGVMYWJlbHM9ZmFsc2U7XG4gICAgaGlkZVBheW9mZnM9ZmFsc2U7XG4gICAgaGlkZVByb2JhYmlsaXRpZXM9ZmFsc2U7XG4gICAgcmF3PWZhbHNlO1xuXG5cbiAgICBwYXlvZmZOdW1iZXJGb3JtYXR0ZXIgPSAodiwgaSk9PiB2O1xuICAgIHByb2JhYmlsaXR5TnVtYmVyRm9ybWF0dGVyICA9ICh2KT0+IHY7XG5cbiAgICBvbk5vZGVTZWxlY3RlZCA9IChub2RlKSA9PiB7fTtcbiAgICBvbkVkZ2VTZWxlY3RlZCA9IChlZGdlKSA9PiB7fTtcbiAgICBvblRleHRTZWxlY3RlZCA9ICh0ZXh0KSA9PiB7fTtcbiAgICBvblNlbGVjdGlvbkNsZWFyZWQgPSAoKSA9PiB7fTtcblxuICAgIG9wZXJhdGlvbnNGb3JPYmplY3QgPSAobykgPT4gW107XG5cbiAgICBwYXlvZmZOYW1lcyA9IFtudWxsLCBudWxsXTtcbiAgICBtYXhQYXlvZmZzVG9EaXNwbGF5ID0gMTtcblxuICAgIGNvbnN0cnVjdG9yKGN1c3RvbSkge1xuICAgICAgICBpZiAoY3VzdG9tKSB7XG4gICAgICAgICAgICBVdGlscy5kZWVwRXh0ZW5kKHRoaXMsIGN1c3RvbSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIFRyZWVEZXNpZ25lciB7XG5cbiAgICBjb25maWc7XG4gICAgY29udGFpbmVyO1xuICAgIGRhdGE7IC8vZGF0YSBtb2RlbCBtYW5hZ2VyXG4gICAgc3ZnO1xuXG4gICAgY29uc3RydWN0b3IoY29udGFpbmVyLCBkYXRhTW9kZWwsIGNvbmZpZyl7XG4gICAgICAgIHRoaXMuc2V0Q29uZmlnKGNvbmZpZyk7XG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGFNb2RlbDtcbiAgICAgICAgdGhpcy5pbml0Q29udGFpbmVyKGNvbnRhaW5lcik7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cblxuICAgIHNldENvbmZpZyhjb25maWcpIHtcbiAgICAgICAgdGhpcy5jb25maWcgPSBuZXcgVHJlZURlc2lnbmVyQ29uZmlnKGNvbmZpZyk7XG4gICAgICAgIGlmKHRoaXMubGF5b3V0KXtcbiAgICAgICAgICAgIHRoaXMubGF5b3V0LmNvbmZpZz10aGlzLmNvbmZpZy5sYXlvdXQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGRhdGVDdXN0b21TdHlsZXMoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgaW5pdCgpe1xuXG4gICAgICAgIHRoaXMuaW5pdFN2ZygpO1xuICAgICAgICB0aGlzLmluaXRMYXlvdXQoKTtcbiAgICAgICAgdGhpcy5pbml0STE4bigpO1xuICAgICAgICB0aGlzLmluaXRCcnVzaCgpO1xuICAgICAgICB0aGlzLmluaXRFZGdlTWFya2VycygpO1xuXG4gICAgICAgIHRoaXMudXBkYXRlQ3VzdG9tU3R5bGVzKCk7XG4gICAgICAgIGlmKCF0aGlzLmNvbmZpZy5yZWFkT25seSl7XG4gICAgICAgICAgICB0aGlzLmluaXRNYWluQ29udGV4dE1lbnUoKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdE5vZGVDb250ZXh0TWVudSgpO1xuICAgICAgICAgICAgdGhpcy5pbml0RWRnZUNvbnRleHRNZW51KCk7XG4gICAgICAgICAgICB0aGlzLmluaXROb2RlRHJhZ0hhbmRsZXIoKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdFRleHREcmFnSGFuZGxlcigpO1xuICAgICAgICAgICAgdGhpcy5pbml0VGV4dENvbnRleHRNZW51KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZWRyYXcoKTtcbiAgICB9XG5cbiAgICBpbml0STE4bigpIHtcbiAgICAgICAgaTE4bi5pbml0KHRoaXMuY29uZmlnLmxuZyk7XG4gICAgfVxuXG5cbiAgICB1cGRhdGVDdXN0b21TdHlsZXMoKXtcbiAgICAgICAgZDMuc2VsZWN0KCdoZWFkJykuc2VsZWN0T3JBcHBlbmQoJ3N0eWxlI3NkLXRyZWUtZGVzaWduZXItc3R5bGUnKS5odG1sKFRlbXBsYXRlcy5nZXQoJ3RyZWVEZXNpZ25lclN0eWxlcycsIHRoaXMuY29uZmlnKSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGluaXRMYXlvdXQoKXtcbiAgICAgICAgdGhpcy5sYXlvdXQgPSBuZXcgTGF5b3V0KHRoaXMsIHRoaXMuZGF0YSwgdGhpcy5jb25maWcubGF5b3V0KTtcbiAgICB9XG5cbiAgICBpbml0Tm9kZURyYWdIYW5kbGVyKCl7XG4gICAgICAgIHRoaXMubm9kZURyYWdIYW5kbGVyID0gbmV3IE5vZGVEcmFnSGFuZGxlcih0aGlzLCB0aGlzLmRhdGEpO1xuICAgIH1cblxuICAgIGluaXRUZXh0RHJhZ0hhbmRsZXIoKXtcbiAgICAgICAgdGhpcy50ZXh0RHJhZ0hhbmRsZXIgPSBuZXcgVGV4dERyYWdIYW5kbGVyKHRoaXMsIHRoaXMuZGF0YSk7XG4gICAgfVxuXG4gICAgcmVkcmF3KHdpdGhUcmFuc2l0aW9ucz1mYWxzZSl7XG5cbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB3aXRoVHJhbnNpdGlvbnMgPSAhc2VsZi5jb25maWcuZGlzYWJsZUFuaW1hdGlvbnMgJiYgd2l0aFRyYW5zaXRpb25zO1xuICAgICAgICB0aGlzLnJlZHJhd0RpYWdyYW1UaXRsZSgpO1xuICAgICAgICB0aGlzLnJlZHJhd0RpYWdyYW1EZXNjcmlwdGlvbigpO1xuICAgICAgICB0aGlzLnVwZGF0ZU1hcmdpbih3aXRoVHJhbnNpdGlvbnMpO1xuICAgICAgICBpZih3aXRoVHJhbnNpdGlvbnMpe1xuICAgICAgICAgICAgc2VsZi50cmFuc2l0aW9uUHJldiA9IHNlbGYudHJhbnNpdGlvbjtcbiAgICAgICAgICAgIHNlbGYudHJhbnNpdGlvbiA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZWRyYXdOb2RlcygpO1xuICAgICAgICB0aGlzLnJlZHJhd0VkZ2VzKCk7XG4gICAgICAgIHRoaXMucmVkcmF3RmxvYXRpbmdUZXh0cygpO1xuICAgICAgICB0aGlzLnVwZGF0ZVZhbGlkYXRpb25NZXNzYWdlcygpO1xuICAgICAgICBpZih3aXRoVHJhbnNpdGlvbnMpe1xuICAgICAgICAgICAgc2VsZi50cmFuc2l0aW9uID0gIHNlbGYudHJhbnNpdGlvblByZXY7XG4gICAgICAgIH1cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgc2VsZi51cGRhdGVQbG90dGluZ1JlZ2lvblNpemUoKTtcbiAgICAgICAgfSwxMCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgY29tcHV0ZUF2YWlsYWJsZVNwYWNlKCl7XG4gICAgICAgIHRoaXMuYXZhaWxhYmxlSGVpZ2h0ID0gQXBwVXRpbHMuc2FuaXRpemVIZWlnaHQodGhpcy5jb25maWcuaGVpZ2h0LCB0aGlzLmNvbnRhaW5lciwgdGhpcy5jb25maWcubWFyZ2luKTtcbiAgICAgICAgdGhpcy5hdmFpbGFibGVXaWR0aCA9IEFwcFV0aWxzLnNhbml0aXplV2lkdGgodGhpcy5jb25maWcud2lkdGgsIHRoaXMuY29udGFpbmVyLCB0aGlzLmNvbmZpZy5tYXJnaW4pO1xuICAgIH1cblxuICAgIGluaXRTdmcoKSB7XG4gICAgICAgIHZhciBjID0gdGhpcztcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLmNvbXB1dGVBdmFpbGFibGVTcGFjZSgpO1xuICAgICAgICB0aGlzLnN2ZyA9IHRoaXMuY29udGFpbmVyLnNlbGVjdE9yQXBwZW5kKCdzdmcuc2QtdHJlZS1kZXNpZ25lcicpO1xuICAgICAgICB0aGlzLnN2Zy5hdHRyKCd3aWR0aCcsIHRoaXMuYXZhaWxhYmxlV2lkdGgpLmF0dHIoJ2hlaWdodCcsIHRoaXMuYXZhaWxhYmxlSGVpZ2h0KTtcblxuICAgICAgICB0aGlzLm1haW5Hcm91cCA9IHRoaXMuc3ZnLnNlbGVjdE9yQXBwZW5kKCdnLm1haW4tZ3JvdXAnKTtcbiAgICAgICAgdGhpcy51cGRhdGVNYXJnaW4oKTtcblxuXG4gICAgICAgIGlmICghdGhpcy5jb25maWcud2lkdGgpIHtcbiAgICAgICAgICAgIGQzLnNlbGVjdCh3aW5kb3cpXG4gICAgICAgICAgICAgICAgLm9uKFwicmVzaXplLnRyZWUtZGVzaWduZXJcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnVwZGF0ZVBsb3R0aW5nUmVnaW9uU2l6ZSgpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnJlZHJhd0RpYWdyYW1UaXRsZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG1jID0gbmV3IEhhbW1lci5NYW5hZ2VyKHRoaXMuc3ZnLm5vZGUoKSwge3RvdWNoQWN0aW9uIDogJ2F1dG8nfSk7XG4gICAgICAgIG1jLmFkZChuZXcgSGFtbWVyLlByZXNzKHtcbiAgICAgICAgICAgIHBvaW50ZXJUeXBlOiAndG91Y2gnXG4gICAgICAgIH0pKTtcblxuICAgICAgICBtYy5hZGQobmV3IEhhbW1lci5QaW5jaCh7XG4gICAgICAgICAgICBwb2ludGVyVHlwZTogJ3RvdWNoJ1xuICAgICAgICB9KSk7XG5cbiAgICAgICAgdmFyIGNhbmNlbDtcbiAgICAgICAgbWMub24oJ3BpbmNoc3RhcnQnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgc2VsZi5kaXNhYmxlQnJ1c2goKTtcbiAgICAgICAgfSlcbiAgICAgICAgbWMub24oJ3BpbmNoJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGNhbmNlbCA9IFV0aWxzLndhaXRGb3JGaW5hbEV2ZW50KCgpPT5zZWxmLmVuYWJsZUJydXNoKCksICdwaW5jaGVuZCcsIDUwMDApXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgdXBkYXRlTWFyZ2luKHdpdGhUcmFuc2l0aW9ucyl7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIG1hcmdpbiA9IHRoaXMuY29uZmlnLm1hcmdpbjtcbiAgICAgICAgdmFyIGdyb3VwID0gdGhpcy5tYWluR3JvdXA7XG4gICAgICAgIGlmKHdpdGhUcmFuc2l0aW9ucyl7XG4gICAgICAgICAgICBncm91cCA9IGdyb3VwLnRyYW5zaXRpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudG9wTWFyZ2luID0gbWFyZ2luLnRvcDtcbiAgICAgICAgaWYodGhpcy5kaWFncmFtVGl0bGV8fHRoaXMuZGlhZ3JhbURlc2NyaXB0aW9uKXtcbiAgICAgICAgICAgIHRoaXMudG9wTWFyZ2luID0gcGFyc2VJbnQodGhpcy5kaWFncmFtVGl0bGUgPyB0aGlzLmNvbmZpZy50aXRsZS5tYXJnaW4udG9wIDogMCkgKyB0aGlzLmdldFRpdGxlR3JvdXBIZWlnaHQoKVxuICAgICAgICAgICAgICAgICsgIE1hdGgubWF4KHRoaXMudG9wTWFyZ2luLCBwYXJzZUludCh0aGlzLmNvbmZpZy50aXRsZS5tYXJnaW4uYm90dG9tKSk7XG4gICAgICAgIH1cblxuICAgICAgICBncm91cC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKFwiICsgbWFyZ2luLmxlZnQgKyBcIixcIiArIHRoaXMudG9wTWFyZ2luICsgXCIpXCIpLm9uKFwiZW5kXCIsICgpPT4gc2VsZi51cGRhdGVQbG90dGluZ1JlZ2lvblNpemUoKSk7XG4gICAgfVxuXG4gICAgc2V0TWFyZ2luKG1hcmdpbiwgd2l0aG91dFN0YXRlU2F2aW5nKXtcbiAgICAgICAgdmFyIHNlbGY9dGhpcztcbiAgICAgICAgaWYoIXdpdGhvdXRTdGF0ZVNhdmluZyl7XG4gICAgICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKHtcbiAgICAgICAgICAgICAgICBkYXRhOntcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luOiBVdGlscy5jbG9uZShzZWxmLmNvbmZpZy5tYXJnaW4pXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvblVuZG86IChkYXRhKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRNYXJnaW4oZGF0YS5tYXJnaW4sIHRydWUpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25SZWRvOiAoZGF0YSk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0TWFyZ2luKG1hcmdpbiwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgVXRpbHMuZGVlcEV4dGVuZCh0aGlzLmNvbmZpZy5tYXJnaW4sIG1hcmdpbik7XG4gICAgICAgIHRoaXMucmVkcmF3RGlhZ3JhbVRpdGxlKCk7XG4gICAgICAgIHRoaXMudXBkYXRlTWFyZ2luKHRydWUpO1xuICAgIH1cblxuICAgIGluaXRDb250YWluZXIoY29udGFpbmVySWRPckVsZW0pIHtcbiAgICAgICAgaWYgKFV0aWxzLmlzU3RyaW5nKGNvbnRhaW5lcklkT3JFbGVtKSkge1xuICAgICAgICAgICAgdmFyIHNlbGVjdG9yID0gY29udGFpbmVySWRPckVsZW0udHJpbSgpO1xuXG4gICAgICAgICAgICBpZiAoIVV0aWxzLnN0YXJ0c1dpdGgoc2VsZWN0b3IsICcjJykgJiYgIVV0aWxzLnN0YXJ0c1dpdGgoc2VsZWN0b3IsICcuJykpIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvciA9ICcjJyArIHNlbGVjdG9yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIgPSBkMy5zZWxlY3Qoc2VsZWN0b3IpO1xuICAgICAgICB9IGVsc2UgaWYoY29udGFpbmVySWRPckVsZW0uX3BhcmVudHMpe1xuICAgICAgICAgICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXJJZE9yRWxlbVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyID0gZDMuc2VsZWN0KGNvbnRhaW5lcklkT3JFbGVtKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZVBsb3R0aW5nUmVnaW9uU2l6ZSgpIHtcbiAgICAgICAgdmFyIGNoYW5nZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jb21wdXRlQXZhaWxhYmxlU3BhY2UoKTtcbiAgICAgICAgdmFyIG1hcmdpbiA9IHRoaXMuY29uZmlnLm1hcmdpbjtcbiAgICAgICAgdmFyIHN2Z1dpZHRoID0gdGhpcy5zdmcuYXR0cignd2lkdGgnKTtcbiAgICAgICAgdmFyIHN2Z0hlaWdodCA9IHRoaXMuc3ZnLmF0dHIoJ2hlaWdodCcpO1xuICAgICAgICB2YXIgbWFpbkdyb3VwQm94ID0gdGhpcy5tYWluR3JvdXAubm9kZSgpLmdldEJCb3goKTtcbiAgICAgICAgdmFyIG5ld1N2Z1dpZHRoID0gbWFpbkdyb3VwQm94LndpZHRoK21haW5Hcm91cEJveC54K21hcmdpbi5sZWZ0K21hcmdpbi5yaWdodDtcbiAgICAgICAgdGhpcy5jb250YWluZXIuY2xhc3NlZCgnd2l0aC1vdmVyZmxvdy14JywgbmV3U3ZnV2lkdGg+PXRoaXMuYXZhaWxhYmxlV2lkdGgpO1xuICAgICAgICBuZXdTdmdXaWR0aCA9IE1hdGgubWF4KG5ld1N2Z1dpZHRoLCB0aGlzLmF2YWlsYWJsZVdpZHRoKTtcbiAgICAgICAgaWYoc3ZnV2lkdGghPW5ld1N2Z1dpZHRoKXtcbiAgICAgICAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zdmcuYXR0cignd2lkdGgnLCBuZXdTdmdXaWR0aCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG5ld1N2Z0hlaWdodCA9IG1haW5Hcm91cEJveC5oZWlnaHQrbWFpbkdyb3VwQm94LnkrdGhpcy50b3BNYXJnaW4rbWFyZ2luLmJvdHRvbTtcblxuICAgICAgICB0aGlzLmNvbnRhaW5lci5jbGFzc2VkKCd3aXRoLW92ZXJmbG93LXknLCBuZXdTdmdIZWlnaHQ+PXRoaXMuYXZhaWxhYmxlSGVpZ2h0KTtcbiAgICAgICAgbmV3U3ZnSGVpZ2h0ID0gTWF0aC5tYXgobmV3U3ZnSGVpZ2h0LCB0aGlzLmF2YWlsYWJsZUhlaWdodCk7XG4gICAgICAgIGlmKHN2Z0hlaWdodCE9bmV3U3ZnSGVpZ2h0KXtcbiAgICAgICAgICAgIGNoYW5nZWQ9dHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc3ZnLmF0dHIoJ2hlaWdodCcsIG5ld1N2Z0hlaWdodCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoY2hhbmdlZCl7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUJydXNoRXh0ZW50KClcbiAgICAgICAgfVxuXG5cbiAgICB9XG5cbiAgICByZWRyYXdOb2RlcygpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG5cbiAgICAgICAgdmFyIG5vZGVzQ29udGFpbmVyID0gdGhpcy5tYWluR3JvdXAuc2VsZWN0T3JBcHBlbmQoJ2cubm9kZXMnKTtcbiAgICAgICAgdmFyIG5vZGVzID0gbm9kZXNDb250YWluZXIuc2VsZWN0QWxsKCcubm9kZScpLmRhdGEodGhpcy5kYXRhLm5vZGVzLmZpbHRlcihkPT4hZC4kaGlkZGVuKSwgKGQsaSk9PiBkLiRpZCk7XG4gICAgICAgIG5vZGVzLmV4aXQoKS5yZW1vdmUoKTtcbiAgICAgICAgdmFyIG5vZGVzRW50ZXIgPSBub2Rlcy5lbnRlcigpLmFwcGVuZCgnZycpXG4gICAgICAgICAgICAuYXR0cignaWQnLCBkPT4nbm9kZS0nK2QuJGlkKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgZD0+ZC50eXBlKyctbm9kZSBub2RlJylcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBkPT4ndHJhbnNsYXRlKCcgKyBkLmxvY2F0aW9uLnggKyAnICAnICsgZC5sb2NhdGlvbi55ICsgJyknKTtcbiAgICAgICAgbm9kZXNFbnRlci5hcHBlbmQoJ3BhdGgnKTtcblxuICAgICAgICB2YXIgbGFiZWxFbnRlciA9IG5vZGVzRW50ZXIuYXBwZW5kKCd0ZXh0JykuYXR0cignY2xhc3MnLCAnbGFiZWwnKTtcbiAgICAgICAgdmFyIHBheW9mZkVudGVyID0gbm9kZXNFbnRlci5hcHBlbmQoJ3RleHQnKS5hdHRyKCdjbGFzcycsICdwYXlvZmYgY29tcHV0ZWQnKTtcbiAgICAgICAgdmFyIGluZGljYXRvckVudGVyID0gbm9kZXNFbnRlci5hcHBlbmQoJ3RleHQnKS5hdHRyKCdjbGFzcycsICdlcnJvci1pbmRpY2F0b3InKS50ZXh0KCchIScpO1xuICAgICAgICB2YXIgYWdncmVnYXRlZFBheW9mZkVudGVyID0gbm9kZXNFbnRlci5hcHBlbmQoJ3RleHQnKS5hdHRyKCdjbGFzcycsICdhZ2dyZWdhdGVkLXBheW9mZicpO1xuICAgICAgICB2YXIgcHJvYmFiaWxpdHlUb0VudGVyRW50ZXIgPSBub2Rlc0VudGVyLmFwcGVuZCgndGV4dCcpLmF0dHIoJ2NsYXNzJywgJ3Byb2JhYmlsaXR5LXRvLWVudGVyJyk7XG5cbiAgICAgICAgdmFyIG5vZGVzTWVyZ2UgPSBub2Rlc0VudGVyLm1lcmdlKG5vZGVzKTtcbiAgICAgICAgbm9kZXNNZXJnZS5jbGFzc2VkKCdvcHRpbWFsJywgKGQpPT5zZWxmLmlzT3B0aW1hbChkKSk7XG5cbiAgICAgICAgdmFyIG5vZGVzTWVyZ2VUID0gbm9kZXNNZXJnZTtcbiAgICAgICAgaWYodGhpcy50cmFuc2l0aW9uKXtcbiAgICAgICAgICAgIG5vZGVzTWVyZ2VUID0gbm9kZXNNZXJnZS50cmFuc2l0aW9uKCk7XG4gICAgICAgICAgICBub2Rlc01lcmdlVC5vbignZW5kJywgKCk9PiBzZWxmLnVwZGF0ZVBsb3R0aW5nUmVnaW9uU2l6ZSgpKVxuICAgICAgICB9XG4gICAgICAgIG5vZGVzTWVyZ2VUXG4gICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgZD0+J3RyYW5zbGF0ZSgnICsgZC5sb2NhdGlvbi54ICsgJyAgJyArIGQubG9jYXRpb24ueSArICcpJylcblxuICAgICAgICB2YXIgcGF0aCA9IG5vZGVzTWVyZ2Uuc2VsZWN0KCdwYXRoJyk7XG4gICAgICAgIHRoaXMubGF5b3V0LmRyYXdOb2RlU3ltYm9sKHBhdGgsdGhpcy50cmFuc2l0aW9uKTtcblxuICAgICAgICAvKnBhdGhcbiAgICAgICAgICAgIC5zdHlsZSgnZmlsbCcsIGQ9PiB7XG4gICAgICAgICAgICAgICAgLy8gaWYoc2VsZi5pc05vZGVTZWxlY3RlZChkKSl7XG4gICAgICAgICAgICAgICAgLy8gICAgIHJldHVybiBzZWxmLmNvbmZpZy5ub2RlW2QudHlwZV0uc2VsZWN0ZWQuZmlsbFxuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5jb25maWcubm9kZVtkLnR5cGVdLmZpbGxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3R5bGUoJ3N0cm9rZScsIGQ9PiBzZWxmLmNvbmZpZy5ub2RlW2QudHlwZV0uc3Ryb2tlKVxuICAgICAgICAgICAgLnN0eWxlKCdzdHJva2Utd2lkdGgnLCBkPT4ge1xuICAgICAgICAgICAgICAgIGlmKHNlbGYuY29uZmlnLm5vZGVbZC50eXBlXS5zdHJva2VXaWR0aCE9PXVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLmNvbmZpZy5ub2RlW2QudHlwZV0uc3Ryb2tlV2lkdGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLmNvbmZpZy5ub2RlLnN0cm9rZVdpZHRoO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICovXG4gICAgICAgIHRoaXMubGF5b3V0Lm5vZGVMYWJlbFBvc2l0aW9uKGxhYmVsRW50ZXIpO1xuICAgICAgICB2YXIgbGFiZWxNZXJnZSA9IG5vZGVzTWVyZ2Uuc2VsZWN0KCd0ZXh0LmxhYmVsJyk7XG4gICAgICAgIGxhYmVsTWVyZ2UuY2xhc3NlZCgnc2QtaGlkZGVuJywgdGhpcy5jb25maWcuaGlkZUxhYmVscyk7XG4gICAgICAgIHZhciBsYWJlbE1lcmdlVCA9IG5vZGVzTWVyZ2VULnNlbGVjdCgndGV4dC5sYWJlbCcpO1xuICAgICAgICBsYWJlbE1lcmdlVC5lYWNoKHRoaXMudXBkYXRlVGV4dExpbmVzKTtcbiAgICAgICAgdGhpcy5sYXlvdXQubm9kZUxhYmVsUG9zaXRpb24obGFiZWxNZXJnZVQpXG4gICAgICAgICAgICAuYXR0cigndGV4dC1hbmNob3InLCAnbWlkZGxlJylcblxuICAgICAgICB2YXIgcGF5b2ZmID0gbm9kZXNNZXJnZS5zZWxlY3QoJ3RleHQucGF5b2ZmJyk7XG5cbiAgICAgICAgdmFyIHBheW9mZlRzcGFucyA9IHBheW9mZi5zZWxlY3RBbGwoJ3RzcGFuJykuZGF0YShkPT57XG4gICAgICAgICAgICBsZXQgaXRlbSA9IGQuZGlzcGxheVZhbHVlKCdjaGlsZHJlblBheW9mZicpO1xuICAgICAgICAgICAgcmV0dXJuIFV0aWxzLmlzQXJyYXkoaXRlbSkgPyBpdGVtLmZpbHRlcihpPT5pICE9PSB1bmRlZmluZWQpIDogW2l0ZW1dXG4gICAgICAgIH0pO1xuICAgICAgICBwYXlvZmZUc3BhbnMuZXhpdCgpLnJlbW92ZSgpO1xuXG4gICAgICAgIHZhciBwYXlvZmZUc3BhbnNNID0gcGF5b2ZmVHNwYW5zLmVudGVyKCkuYXBwZW5kKCd0c3BhbicpLm1lcmdlKHBheW9mZlRzcGFucyk7XG4gICAgICAgIHBheW9mZlRzcGFuc01cbiAgICAgICAgICAgIC8vIC5hdHRyKCdkb21pbmFudC1iYXNlbGluZScsICdoYW5naW5nJylcbiAgICAgICAgICAgIC5hdHRyKCdkeScsIChkLGkpPT5pPjAgPyAnMS4xZW0nOiB1bmRlZmluZWQpXG4gICAgICAgICAgICAuYXR0cigneCcsICcwJylcbiAgICAgICAgICAgIC5jbGFzc2VkKCduZWdhdGl2ZScsIGQ9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQhPT1udWxsICYmIGQ8MDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2xhc3NlZCgnc2QtaGlkZGVuJywgdGhpcy5jb25maWcuaGlkZVBheW9mZnMgfHwgdGhpcy5jb25maWcucmF3KVxuICAgICAgICAgICAgLnRleHQoKGQsIGkpPT4ge1xuICAgICAgICAgICAgICAgIHZhciB2YWwgPSBkXG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsIT09bnVsbCA/IChpc05hTih2YWwpID8gdmFsIDogc2VsZi5jb25maWcucGF5b2ZmTnVtYmVyRm9ybWF0dGVyKHZhbCwgaSkpOiAnJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuYXR0YWNoUGF5b2ZmVG9vbHRpcChwYXlvZmZUc3BhbnNNKTtcblxuXG4gICAgICAgIHZhciBwYXlvZmZUID0gcGF5b2ZmO1xuICAgICAgICBpZih0aGlzLnRyYW5zaXRpb24pe1xuICAgICAgICAgICAgcGF5b2ZmVCA9IHBheW9mZi50cmFuc2l0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxheW91dC5ub2RlUGF5b2ZmUG9zaXRpb24ocGF5b2ZmRW50ZXIpO1xuICAgICAgICB0aGlzLmxheW91dC5ub2RlUGF5b2ZmUG9zaXRpb24ocGF5b2ZmVCk7XG5cbiAgICAgICAgdmFyIGFnZ3JlZ2F0ZWRQYXlvZmYgPSBub2Rlc01lcmdlLnNlbGVjdCgndGV4dC5hZ2dyZWdhdGVkLXBheW9mZicpO1xuICAgICAgICB2YXIgYWdncmVnYXRlZFBheW9mZlRzcGFucyA9IGFnZ3JlZ2F0ZWRQYXlvZmYuc2VsZWN0QWxsKCd0c3BhbicpLmRhdGEoZD0+e1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSBkLmRpc3BsYXlWYWx1ZSgnYWdncmVnYXRlZFBheW9mZicpO1xuICAgICAgICAgICAgcmV0dXJuIFV0aWxzLmlzQXJyYXkoaXRlbSkgPyBpdGVtLmZpbHRlcihpPT5pICE9PSB1bmRlZmluZWQpIDogW2l0ZW1dXG4gICAgICAgIH0pO1xuICAgICAgICBhZ2dyZWdhdGVkUGF5b2ZmVHNwYW5zLmV4aXQoKS5yZW1vdmUoKTtcbiAgICAgICAgdmFyIGFnZ3JlZ2F0ZWRQYXlvZmZUc3BhbnNNID0gYWdncmVnYXRlZFBheW9mZlRzcGFucy5lbnRlcigpLmFwcGVuZCgndHNwYW4nKS5tZXJnZShhZ2dyZWdhdGVkUGF5b2ZmVHNwYW5zKVxuICAgICAgICAgICAgLmF0dHIoJ2R5JywgKGQsaSk9Pmk+MCA/ICcwLjk1ZW0nOiB1bmRlZmluZWQpXG4gICAgICAgICAgICAuY2xhc3NlZCgnbmVnYXRpdmUnLCBkPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBkIT09bnVsbCAmJiBkPDA7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNsYXNzZWQoJ3NkLWhpZGRlbicsIHRoaXMuY29uZmlnLmhpZGVQYXlvZmZzIHx8IHRoaXMuY29uZmlnLnJhdylcbiAgICAgICAgICAgIC50ZXh0KCh2YWwsIGkpPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWwhPT1udWxsID8gKGlzTmFOKHZhbCkgPyB2YWwgOiBzZWxmLmNvbmZpZy5wYXlvZmZOdW1iZXJGb3JtYXR0ZXIodmFsLCBpKSk6ICcnXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmF0dGFjaFBheW9mZlRvb2x0aXAoYWdncmVnYXRlZFBheW9mZlRzcGFuc00sICdhZ2dyZWdhdGVkUGF5b2ZmJyk7XG5cbiAgICAgICAgdmFyIGFnZ3JlZ2F0ZWRQYXlvZmZUID0gYWdncmVnYXRlZFBheW9mZjtcbiAgICAgICAgaWYodGhpcy50cmFuc2l0aW9uKXtcbiAgICAgICAgICAgIGFnZ3JlZ2F0ZWRQYXlvZmZUID0gYWdncmVnYXRlZFBheW9mZi50cmFuc2l0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxheW91dC5ub2RlQWdncmVnYXRlZFBheW9mZlBvc2l0aW9uKGFnZ3JlZ2F0ZWRQYXlvZmZFbnRlcik7XG4gICAgICAgIHRoaXMubGF5b3V0Lm5vZGVBZ2dyZWdhdGVkUGF5b2ZmUG9zaXRpb24oYWdncmVnYXRlZFBheW9mZlQpO1xuXG4gICAgICAgIHZhciBwcm9iYWJpbGl0eVRvRW50ZXIgPSBub2Rlc01lcmdlLnNlbGVjdCgndGV4dC5wcm9iYWJpbGl0eS10by1lbnRlcicpXG4gICAgICAgICAgICAudGV4dChkPT57XG4gICAgICAgICAgICAgICAgdmFyIHZhbCA9IGQuZGlzcGxheVZhbHVlKCdwcm9iYWJpbGl0eVRvRW50ZXInKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsIT09bnVsbCA/IChpc05hTih2YWwpID8gdmFsIDogc2VsZi5jb25maWcucHJvYmFiaWxpdHlOdW1iZXJGb3JtYXR0ZXIodmFsKSk6ICcnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNsYXNzZWQoJ3NkLWhpZGRlbicsIHRoaXMuY29uZmlnLmhpZGVQcm9iYWJpbGl0aWVzIHx8IHRoaXMuY29uZmlnLnJhdyk7XG4gICAgICAgIFRvb2x0aXAuYXR0YWNoKHByb2JhYmlsaXR5VG9FbnRlciwgaTE4bi50KCd0b29sdGlwLm5vZGUucHJvYmFiaWxpdHlUb0VudGVyJykpO1xuXG5cbiAgICAgICAgdmFyIHByb2JhYmlsaXR5VG9FbnRlclQgPSBwcm9iYWJpbGl0eVRvRW50ZXI7XG4gICAgICAgIGlmKHRoaXMudHJhbnNpdGlvbil7XG4gICAgICAgICAgICBwcm9iYWJpbGl0eVRvRW50ZXJUID0gcHJvYmFiaWxpdHlUb0VudGVyLnRyYW5zaXRpb24oKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxheW91dC5ub2RlUHJvYmFiaWxpdHlUb0VudGVyUG9zaXRpb24ocHJvYmFiaWxpdHlUb0VudGVyRW50ZXIpO1xuICAgICAgICB0aGlzLmxheW91dC5ub2RlUHJvYmFiaWxpdHlUb0VudGVyUG9zaXRpb24ocHJvYmFiaWxpdHlUb0VudGVyVCk7XG5cblxuICAgICAgICB2YXIgaW5kaWNhdG9yID0gbm9kZXNNZXJnZS5zZWxlY3QoJ3RleHQuZXJyb3ItaW5kaWNhdG9yJyk7XG4gICAgICAgIGluZGljYXRvci5jbGFzc2VkKCdzZC1oaWRkZW4nLCB0aGlzLmNvbmZpZy5yYXcpXG4gICAgICAgIHRoaXMubGF5b3V0Lm5vZGVJbmRpY2F0b3JQb3NpdGlvbihpbmRpY2F0b3JFbnRlcik7XG4gICAgICAgIHRoaXMubGF5b3V0Lm5vZGVJbmRpY2F0b3JQb3NpdGlvbihpbmRpY2F0b3IpO1xuXG4gICAgICAgIGlmKHRoaXMubm9kZURyYWdIYW5kbGVyKXtcbiAgICAgICAgICAgIG5vZGVzTWVyZ2UuY2FsbCh0aGlzLm5vZGVEcmFnSGFuZGxlci5kcmFnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG5vZGVzTWVyZ2Uub24oJ2NvbnRleHRtZW51JywgdGhpcy5ub2RlQ29udGV4dE1lbnUpO1xuICAgICAgICBub2Rlc01lcmdlLm9uKCdkYmxjbGljaycsIHRoaXMubm9kZUNvbnRleHRNZW51KVxuICAgICAgICBub2Rlc01lcmdlLmVhY2goZnVuY3Rpb24oZCwgaSl7XG4gICAgICAgICAgICB2YXIgbm9kZUVsZW0gPSB0aGlzO1xuICAgICAgICAgICAgdmFyIG1jID0gbmV3IEhhbW1lci5NYW5hZ2VyKG5vZGVFbGVtKTtcbiAgICAgICAgICAgIG1jLmFkZChuZXcgSGFtbWVyLlByZXNzKHtcbiAgICAgICAgICAgICAgICBwb2ludGVyVHlwZTogJ3RvdWNoJ1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgbWMub24oJ3ByZXNzJywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICAgICAgaWYoZS5wb2ludGVyVHlwZT09J3RvdWNoJyl7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubm9kZURyYWdIYW5kbGVyLmNhbmNlbERyYWcoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuXG5cbiAgICAgICAgICAgIGlmKGQuZm9sZGVkKXtcbiAgICAgICAgICAgICAgICBsZXQgYnV0dG9uID0gZDMuc2VsZWN0KG5vZGVFbGVtKS5zZWxlY3RPckFwcGVuZCgndGV4dC5zZC11bmZvbGQtYnV0dG9uJylcbiAgICAgICAgICAgICAgICAgICAgLnRleHQoXCJbK11cIilcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdjbGljayBkYmNsaWNrIG1vdXNlZG93bicsICgpPT5zZWxmLmZvbGRTdWJ0cmVlKGQsIGZhbHNlKSk7IC8vZmlyZWZveCBkZXRlY3RzIG9ubHkgbW91c2Vkb3duIGV2ZW50IC0gcmVsYXRlZCB0byBkcmFnIGhhbmRsZXJcblxuICAgICAgICAgICAgICAgIHNlbGYubGF5b3V0Lm5vZGVVbmZvbGRCdXR0b25Qb3NpdGlvbihidXR0b24pO1xuICAgICAgICAgICAgICAgIFRvb2x0aXAuYXR0YWNoKGJ1dHRvbiwgaTE4bi50KCdjb250ZXh0TWVudS5ub2RlLnVuZm9sZCcpKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGQzLnNlbGVjdChub2RlRWxlbSkuc2VsZWN0KCcuc2QtdW5mb2xkLWJ1dHRvbicpLnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgYXR0YWNoUGF5b2ZmVG9vbHRpcChzZWxlY3Rpb24sIHBheW9mZkZpbGVkTmFtZSA9ICdwYXlvZmYnLCBvYmplY3Q9J25vZGUnKXtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBUb29sdGlwLmF0dGFjaChzZWxlY3Rpb24sIChkLCBpKT0+e1xuICAgICAgICAgICAgaWYoc2VsZi5jb25maWcucGF5b2ZmTmFtZXMubGVuZ3RoPmkgJiYgc2VsZi5jb25maWcucGF5b2ZmTmFtZXNbaV0gIT09IG51bGwpe1xuICAgICAgICAgICAgICAgIHJldHVybiBpMThuLnQoJ3Rvb2x0aXAuJytvYmplY3QrJy4nK3BheW9mZkZpbGVkTmFtZSsnLm5hbWVkJyx7dmFsdWU6IGQucGF5b2ZmLCBudW1iZXI6IGkrMSwgbmFtZTogc2VsZi5jb25maWcucGF5b2ZmTmFtZXNbaV19KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGkxOG4udCgndG9vbHRpcC4nK29iamVjdCsnLicrcGF5b2ZmRmlsZWROYW1lKycuZGVmYXVsdCcse3ZhbHVlOiBkLnBheW9mZiwgbnVtYmVyOiBzZWxmLmNvbmZpZy5tYXhQYXlvZmZzVG9EaXNwbGF5IDwgMiA/ICcnIDogaSsxfSlcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdXBkYXRlVGV4dExpbmVzKGQpeyAvL2hlbHBlciBtZXRob2QgZm9yIHNwbGl0dGluZyB0ZXh0IHRvIHRzcGFuc1xuICAgICAgICB2YXIgbGluZXMgPSBkLm5hbWUgPyBkLm5hbWUuc3BsaXQoJ1xcbicpIDogW107XG4gICAgICAgIGxpbmVzLnJldmVyc2UoKTtcbiAgICAgICAgdmFyIHRzcGFucyA9IGQzLnNlbGVjdCh0aGlzKS5zZWxlY3RBbGwoJ3RzcGFuJykuZGF0YShsaW5lcyk7XG4gICAgICAgIHRzcGFucy5lbnRlcigpLmFwcGVuZCgndHNwYW4nKVxuICAgICAgICAgICAgLm1lcmdlKHRzcGFucylcbiAgICAgICAgICAgIC50ZXh0KGw9PmwpXG4gICAgICAgICAgICAuYXR0cignZHknLCAoZCxpKT0+aT4wID8gJy0xLjFlbSc6IHVuZGVmaW5lZClcbiAgICAgICAgICAgIC5hdHRyKCd4JywgJzAnKTtcblxuICAgICAgICB0c3BhbnMuZXhpdCgpLnJlbW92ZSgpO1xuICAgIH1cblxuICAgIGlzT3B0aW1hbChkKXtcbiAgICAgICAgcmV0dXJuIGQuZGlzcGxheVZhbHVlKCdvcHRpbWFsJyk7XG4gICAgfVxuXG4gICAgcmVkcmF3RWRnZXMoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIGVkZ2VzQ29udGFpbmVyID0gdGhpcy5tYWluR3JvdXAuc2VsZWN0T3JBcHBlbmQoJ2cuZWRnZXMnKTtcbiAgICAgICAgaWYoc2VsZi5jb25maWcuZm9yY2VGdWxsRWRnZVJlZHJhdyl7XG4gICAgICAgICAgICBlZGdlc0NvbnRhaW5lci5zZWxlY3RBbGwoXCIqXCIpLnJlbW92ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGVkZ2VzID0gZWRnZXNDb250YWluZXIuc2VsZWN0QWxsKCcuZWRnZScpLmRhdGEodGhpcy5kYXRhLmVkZ2VzLmZpbHRlcihlPT4hZS4kaGlkZGVuKSwgKGQsaSk9PiBkLiRpZCk7XG4gICAgICAgIGVkZ2VzLmV4aXQoKS5yZW1vdmUoKTtcbiAgICAgICAgdmFyIGVkZ2VzRW50ZXIgPSBlZGdlcy5lbnRlcigpLmFwcGVuZCgnZycpXG4gICAgICAgICAgICAuYXR0cignaWQnLCBkPT4nZWRnZS0nK2QuJGlkKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2VkZ2UnKTtcblxuXG4gICAgICAgIGVkZ2VzRW50ZXIuYXBwZW5kKCdwYXRoJyk7XG4gICAgICAgIHZhciBsYWJlbEVudGVyID0gZWRnZXNFbnRlci5hcHBlbmRTZWxlY3RvcignZy5sYWJlbC1ncm91cCcpO1xuICAgICAgICBsYWJlbEVudGVyLmFwcGVuZCgndGV4dCcpLmF0dHIoJ2NsYXNzJywgJ2xhYmVsJyk7XG4gICAgICAgIHZhciBwYXlvZmZFbnRlciA9IGVkZ2VzRW50ZXIuYXBwZW5kKCd0ZXh0JykuYXR0cignY2xhc3MnLCAncGF5b2ZmJyk7XG4gICAgICAgIHZhciBwcm9iYWJpbGl0eUVudGVyID0gZWRnZXNFbnRlci5hcHBlbmQoJ3RleHQnKS5hdHRyKCdjbGFzcycsICdwcm9iYWJpbGl0eScpO1xuXG5cbiAgICAgICAgdmFyIGVkZ2VzTWVyZ2UgPSBlZGdlc0VudGVyLm1lcmdlKGVkZ2VzKTtcblxuXG4gICAgICAgIHZhciBvcHRpbWFsQ2xhc3NOYW1lID0gJ29wdGltYWwnO1xuICAgICAgICBlZGdlc01lcmdlLmNsYXNzZWQob3B0aW1hbENsYXNzTmFtZSwgKGQpPT5zZWxmLmlzT3B0aW1hbChkKSk7XG5cbiAgICAgICAgdmFyIGVkZ2VzTWVyZ2VUID0gZWRnZXNNZXJnZTtcbiAgICAgICAgaWYodGhpcy50cmFuc2l0aW9uKXtcbiAgICAgICAgICAgIGVkZ2VzTWVyZ2VUID0gZWRnZXNNZXJnZS50cmFuc2l0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICBlZGdlc01lcmdlVC5zZWxlY3QoJ3BhdGgnKVxuICAgICAgICAgICAgLmF0dHIoJ2QnLCBkPT4gdGhpcy5sYXlvdXQuZWRnZUxpbmVEKGQpKVxuICAgICAgICAgICAgLy8gLmF0dHIoXCJzdHJva2VcIiwgXCJibGFja1wiKVxuICAgICAgICAgICAgLy8gLmF0dHIoXCJzdHJva2Utd2lkdGhcIiwgMilcbiAgICAgICAgICAgIC5hdHRyKFwiZmlsbFwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgIC5hdHRyKFwibWFya2VyLWVuZFwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN1ZmZpeCA9IGQzLnNlbGVjdCh0aGlzLnBhcmVudE5vZGUpLmNsYXNzZWQoJ3NlbGVjdGVkJykgPyAnLXNlbGVjdGVkJyA6IChzZWxmLmlzT3B0aW1hbChkKT8nLW9wdGltYWwnOicnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJ1cmwoI2Fycm93XCIrIHN1ZmZpeCtcIilcIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyAuYXR0cihcInNoYXBlLXJlbmRlcmluZ1wiLCBcIm9wdGltaXplUXVhbGl0eVwiKVxuXG5cbiAgICAgICAgZWRnZXNNZXJnZS5vbignY2xpY2snLCBkPT57XG4gICAgICAgICAgICBzZWxmLnNlbGVjdEVkZ2UoZCwgdHJ1ZSlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5sYXlvdXQuZWRnZUxhYmVsUG9zaXRpb24obGFiZWxFbnRlcik7XG4gICAgICAgIGVkZ2VzTWVyZ2VULnNlbGVjdCgndGV4dC5sYWJlbCcpLmVhY2godGhpcy51cGRhdGVUZXh0TGluZXMpO1xuICAgICAgICB2YXIgbGFiZWxNZXJnZSA9IGVkZ2VzTWVyZ2Uuc2VsZWN0KCdnLmxhYmVsLWdyb3VwJyk7XG4gICAgICAgIGxhYmVsTWVyZ2UuY2xhc3NlZCgnc2QtaGlkZGVuJywgdGhpcy5jb25maWcuaGlkZUxhYmVscyk7XG4gICAgICAgIHZhciBsYWJlbE1lcmdlVCA9IGVkZ2VzTWVyZ2VULnNlbGVjdCgnZy5sYWJlbC1ncm91cCcpO1xuICAgICAgICB0aGlzLmxheW91dC5lZGdlTGFiZWxQb3NpdGlvbihsYWJlbE1lcmdlVCk7XG4gICAgICAgICAgICAvLyAudGV4dChkPT5kLm5hbWUpO1xuXG4gICAgICAgIHZhciBwYXlvZmYgPSBlZGdlc01lcmdlLnNlbGVjdCgndGV4dC5wYXlvZmYnKTtcblxuICAgICAgICB2YXIgcGF5b2ZmVHNwYW5zID0gcGF5b2ZmLnNlbGVjdEFsbCgndHNwYW4nKS5kYXRhKGQgPT4ge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSBkLmRpc3BsYXlWYWx1ZSgncGF5b2ZmJyk7XG4gICAgICAgICAgICByZXR1cm4gVXRpbHMuaXNBcnJheShpdGVtKSA/IGl0ZW0uc2xpY2UoMCwgTWF0aC5taW4oaXRlbS5sZW5ndGgsIHNlbGYuY29uZmlnLm1heFBheW9mZnNUb0Rpc3BsYXkpKS5tYXAoXz0+ZCkgOiBbZF07XG4gICAgICAgIH0pO1xuICAgICAgICBwYXlvZmZUc3BhbnMuZXhpdCgpLnJlbW92ZSgpO1xuXG4gICAgICAgIHZhciBwYXlvZmZUc3BhbnNNID0gcGF5b2ZmVHNwYW5zLmVudGVyKCkuYXBwZW5kKCd0c3BhbicpLm1lcmdlKHBheW9mZlRzcGFucyk7XG4gICAgICAgIHBheW9mZlRzcGFuc01cbiAgICAgICAgLy8gLmF0dHIoJ2RvbWluYW50LWJhc2VsaW5lJywgJ2hhbmdpbmcnKVxuICAgICAgICAgICAgLmF0dHIoJ2R5JywgKGQsaSk9Pmk+MCA/ICcxLjFlbSc6IHVuZGVmaW5lZClcbiAgICAgICAgICAgIC8vIC5hdHRyKCd4JywgJzAnKVxuXG4gICAgICAgICAgICAvLyAuYXR0cignZG9taW5hbnQtYmFzZWxpbmUnLCAnaGFuZ2luZycpXG4gICAgICAgICAgICAuY2xhc3NlZCgnbmVnYXRpdmUnLCAoZCwgaSk9PiB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbCA9IGQuZGlzcGxheVBheW9mZih1bmRlZmluZWQsIGkpO1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWwhPT1udWxsICYmIHZhbDwwO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jbGFzc2VkKCdzZC1oaWRkZW4nLCB0aGlzLmNvbmZpZy5oaWRlUGF5b2ZmcylcbiAgICAgICAgICAgIC8vIC50ZXh0KGQ9PiBpc05hTihkLnBheW9mZikgPyBkLnBheW9mZiA6IHNlbGYuY29uZmlnLnBheW9mZk51bWJlckZvcm1hdHRlcihkLnBheW9mZikpXG4gICAgICAgICAgICAudGV4dCgoZCwgaSk9PntcbiAgICAgICAgICAgICAgICBpZih0aGlzLmNvbmZpZy5yYXcpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC5wYXlvZmZbaV07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBkLmRpc3BsYXlWYWx1ZSgncGF5b2ZmJyk7XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW1zID0gVXRpbHMuaXNBcnJheShpdGVtKSA/IGl0ZW0gOiBbaXRlbV07XG5cbiAgICAgICAgICAgICAgICBsZXQgdmFsID0gaXRlbXNbaV07XG4gICAgICAgICAgICAgICAgaWYgKHZhbCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzTmFOKHZhbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLmNvbmZpZy5wYXlvZmZOdW1iZXJGb3JtYXR0ZXIodmFsLCBpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoVXRpbHMuaXNTdHJpbmcodmFsKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChkLnBheW9mZltpXSAhPT0gbnVsbCAmJiAhaXNOYU4oZC5wYXlvZmZbaV0pKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5jb25maWcucGF5b2ZmTnVtYmVyRm9ybWF0dGVyKGQucGF5b2ZmW2ldLCBpKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBkLnBheW9mZltpXTtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgVG9vbHRpcC5hdHRhY2gocGF5b2ZmVHNwYW5zTSwgKGQsIGkpPT57XG4gICAgICAgICAgICBpZihzZWxmLmNvbmZpZy5wYXlvZmZOYW1lcy5sZW5ndGg+aSAmJiBzZWxmLmNvbmZpZy5wYXlvZmZOYW1lc1tpXSAhPT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGkxOG4udCgndG9vbHRpcC5lZGdlLnBheW9mZi5uYW1lZCcse3ZhbHVlOiBkLnBheW9mZltpXSwgbnVtYmVyOiBpKzEsIG5hbWU6IHNlbGYuY29uZmlnLnBheW9mZk5hbWVzW2ldfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpMThuLnQoJ3Rvb2x0aXAuZWRnZS5wYXlvZmYuZGVmYXVsdCcse3ZhbHVlOiBkLnBheW9mZltpXSwgbnVtYmVyOiBzZWxmLmNvbmZpZy5tYXhQYXlvZmZzVG9EaXNwbGF5IDwgMiA/ICcnIDogaSsxfSlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIHBheW9mZlRleHRUID0gcGF5b2ZmO1xuICAgICAgICBpZih0aGlzLnRyYW5zaXRpb24pe1xuICAgICAgICAgICAgcGF5b2ZmVGV4dFQgPSBwYXlvZmYudHJhbnNpdGlvbigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubGF5b3V0LmVkZ2VQYXlvZmZQb3NpdGlvbihwYXlvZmZFbnRlcik7XG4gICAgICAgIHRoaXMubGF5b3V0LmVkZ2VQYXlvZmZQb3NpdGlvbihwYXlvZmZUZXh0VCk7XG5cbiAgICAgICAgVG9vbHRpcC5hdHRhY2goZWRnZXNNZXJnZS5zZWxlY3QoJ3RleHQucHJvYmFiaWxpdHknKSwgZD0+aTE4bi50KCd0b29sdGlwLmVkZ2UucHJvYmFiaWxpdHknLHt2YWx1ZTogZC5wcm9iYWJpbGl0eT09PSB1bmRlZmluZWQgPyBkLmRpc3BsYXlQcm9iYWJpbGl0eSgpIDogZC5wcm9iYWJpbGl0eX0pKTtcblxuICAgICAgICBlZGdlc01lcmdlLnNlbGVjdCgndGV4dC5wcm9iYWJpbGl0eScpXG4gICAgICAgICAgICAuY2xhc3NlZCgnc2QtaGlkZGVuJywgdGhpcy5jb25maWcuaGlkZVByb2JhYmlsaXRpZXMpO1xuICAgICAgICB2YXIgcHJvYmFiaWxpdHlNZXJnZSA9IGVkZ2VzTWVyZ2Uuc2VsZWN0KCd0ZXh0LnByb2JhYmlsaXR5Jyk7XG4gICAgICAgIHByb2JhYmlsaXR5TWVyZ2VcbiAgICAgICAgICAgIC5hdHRyKCd0ZXh0LWFuY2hvcicsICdlbmQnKVxuICAgICAgICAgICAgLnRleHQoZD0+e1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuY29uZmlnLnJhdyl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkLnByb2JhYmlsaXR5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgdmFsID0gZC5kaXNwbGF5UHJvYmFiaWxpdHkoKTtcblxuICAgICAgICAgICAgICAgIGlmKHZhbCE9PW51bGwpe1xuICAgICAgICAgICAgICAgICAgICBpZighaXNOYU4odmFsKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5jb25maWcucHJvYmFiaWxpdHlOdW1iZXJGb3JtYXR0ZXIodmFsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZihVdGlscy5pc1N0cmluZyh2YWwpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZihkLnByb2JhYmlsaXR5IT09bnVsbCAmJiAhaXNOYU4oZC5wcm9iYWJpbGl0eSkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLmNvbmZpZy5wcm9iYWJpbGl0eU51bWJlckZvcm1hdHRlcihkLnByb2JhYmlsaXR5KTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBkLnByb2JhYmlsaXR5O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIHZhciBwcm9iYWJpbGl0eU1lcmdlVCA9IHByb2JhYmlsaXR5TWVyZ2U7XG4gICAgICAgIGlmKHRoaXMudHJhbnNpdGlvbil7XG4gICAgICAgICAgICBwcm9iYWJpbGl0eU1lcmdlVCA9IHByb2JhYmlsaXR5TWVyZ2UudHJhbnNpdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sYXlvdXQuZWRnZVByb2JhYmlsaXR5UG9zaXRpb24ocHJvYmFiaWxpdHlFbnRlcik7XG4gICAgICAgIHRoaXMubGF5b3V0LmVkZ2VQcm9iYWJpbGl0eVBvc2l0aW9uKHByb2JhYmlsaXR5TWVyZ2VUKTtcblxuXG4gICAgICAgIGVkZ2VzQ29udGFpbmVyLnNlbGVjdEFsbCgnLmVkZ2UuJytvcHRpbWFsQ2xhc3NOYW1lKS5yYWlzZSgpO1xuXG4gICAgICAgIGVkZ2VzTWVyZ2Uub24oJ2NvbnRleHRtZW51JywgdGhpcy5lZGdlQ29udGV4dE1lbnUpO1xuICAgICAgICBlZGdlc01lcmdlLm9uKCdkYmxjbGljaycsIHRoaXMuZWRnZUNvbnRleHRNZW51KTtcbiAgICAgICAgZWRnZXNNZXJnZS5lYWNoKGZ1bmN0aW9uKGQsIGkpe1xuICAgICAgICAgICAgdmFyIGVsZW0gPSB0aGlzO1xuICAgICAgICAgICAgdmFyIG1jID0gbmV3IEhhbW1lci5NYW5hZ2VyKGVsZW0pO1xuICAgICAgICAgICAgbWMuYWRkKG5ldyBIYW1tZXIuUHJlc3Moe1xuICAgICAgICAgICAgICAgIHBvaW50ZXJUeXBlOiBIYW1tZXIuUE9JTlRFUl9UT1VDSFxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIHJlZHJhd0Zsb2F0aW5nVGV4dHMoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuXG4gICAgICAgIHZhciB0ZXh0c0NvbnRhaW5lciA9IHRoaXMubWFpbkdyb3VwLnNlbGVjdE9yQXBwZW5kKCdnLmZsb2F0aW5nLXRleHRzJyk7XG4gICAgICAgIHZhciB0ZXh0cyA9IHRleHRzQ29udGFpbmVyLnNlbGVjdEFsbCgnLmZsb2F0aW5nLXRleHQnKS5kYXRhKHRoaXMuZGF0YS50ZXh0cywgKGQsaSk9PiBkLiRpZCk7XG4gICAgICAgIHRleHRzLmV4aXQoKS5yZW1vdmUoKTtcbiAgICAgICAgdmFyIHRleHRzRW50ZXIgPSB0ZXh0cy5lbnRlcigpLmFwcGVuZFNlbGVjdG9yKCdnLmZsb2F0aW5nLXRleHQnKVxuICAgICAgICAgICAgLmF0dHIoJ2lkJywgZD0+J3RleHQtJytkLiRpZCk7XG5cblxuICAgICAgICB2YXIgcmVjdFdpZHRoID0gNDA7XG4gICAgICAgIHZhciByZWN0SGVpZ2h0ID0gMjA7XG5cbiAgICAgICAgdGV4dHNFbnRlci5hcHBlbmQoJ3JlY3QnKS5hdHRyKCd4JywgLTUpLmF0dHIoJ3knLCAtMTYpLmF0dHIoJ2ZpbGwtb3BhY2l0eScsIDApO1xuICAgICAgICB0ZXh0c0VudGVyLmFwcGVuZCgndGV4dCcpO1xuXG4gICAgICAgIHZhciB0ZXh0c01lcmdlID0gdGV4dHNFbnRlci5tZXJnZSh0ZXh0cyk7XG4gICAgICAgIHZhciB0ZXh0c01lcmdlVCA9IHRleHRzTWVyZ2U7XG4gICAgICAgIGlmKHRoaXMudHJhbnNpdGlvbil7XG4gICAgICAgICAgICB0ZXh0c01lcmdlVCA9IHRleHRzTWVyZ2UudHJhbnNpdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGV4dHNNZXJnZVQuYXR0cigndHJhbnNmb3JtJywgZD0+J3RyYW5zbGF0ZSgnICsgZC5sb2NhdGlvbi54ICsgJyAgJyArIGQubG9jYXRpb24ueSArICcpJyk7XG5cbiAgICAgICAgdmFyIHRzcGFucyA9IHRleHRzTWVyZ2Uuc2VsZWN0KCd0ZXh0Jykuc2VsZWN0QWxsKCd0c3BhbicpLmRhdGEoZD0+ZC52YWx1ZSA/IGQudmFsdWUuc3BsaXQoJ1xcbicpIDogW10pO1xuXG4gICAgICAgIHRzcGFucy5lbnRlcigpLmFwcGVuZCgndHNwYW4nKVxuICAgICAgICAgICAgLm1lcmdlKHRzcGFucylcbiAgICAgICAgICAgIC5odG1sKGw9PkFwcFV0aWxzLnJlcGxhY2VVcmxzKEFwcFV0aWxzLmVzY2FwZUh0bWwobCkpKVxuICAgICAgICAgICAgLmF0dHIoJ2R5JywgKGQsaSk9Pmk+MCA/ICcxLjFlbSc6IHVuZGVmaW5lZClcbiAgICAgICAgICAgIC5hdHRyKCd4JywgJzAnKTtcblxuICAgICAgICB0c3BhbnMuZXhpdCgpLnJlbW92ZSgpO1xuICAgICAgICB0ZXh0c01lcmdlLmNsYXNzZWQoJ3NkLWVtcHR5JywgZD0+IWQudmFsdWUgfHwgIWQudmFsdWUudHJpbSgpKTtcbiAgICAgICAgdGV4dHNNZXJnZS5zZWxlY3QoJ3JlY3QnKS5hdHRyKCd3aWR0aCcsIHJlY3RXaWR0aCkuYXR0cignaGVpZ2h0JywgcmVjdEhlaWdodCk7XG5cbiAgICAgICAgdGV4dHNNZXJnZS5lYWNoKGZ1bmN0aW9uKGQpe1xuICAgICAgICAgICAgaWYoIWQudmFsdWUpe1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBiYiA9IGQzLnNlbGVjdCh0aGlzKS5zZWxlY3QoJ3RleHQnKS5ub2RlKCkuZ2V0QkJveCgpO1xuICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuc2VsZWN0KCdyZWN0JylcbiAgICAgICAgICAgICAgIC5hdHRyKCd5JywgYmIueS01KVxuICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgTWF0aC5tYXgoYmIud2lkdGgrMTAsIHJlY3RXaWR0aCkpXG4gICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgTWF0aC5tYXgoYmIuaGVpZ2h0KzEwLCByZWN0SGVpZ2h0KSlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYodGhpcy50ZXh0RHJhZ0hhbmRsZXIpe1xuICAgICAgICAgICAgdGV4dHNNZXJnZS5jYWxsKHRoaXMudGV4dERyYWdIYW5kbGVyLmRyYWcpO1xuICAgICAgICB9XG4gICAgICAgIHRleHRzTWVyZ2Uub24oJ2NvbnRleHRtZW51JywgdGhpcy50ZXh0Q29udGV4dE1lbnUpO1xuICAgICAgICB0ZXh0c01lcmdlLm9uKCdkYmxjbGljaycsIHRoaXMudGV4dENvbnRleHRNZW51KTtcbiAgICAgICAgdGV4dHNNZXJnZS5lYWNoKGZ1bmN0aW9uKGQsIGkpe1xuICAgICAgICAgICAgdmFyIGVsZW0gPSB0aGlzO1xuICAgICAgICAgICAgdmFyIG1jID0gbmV3IEhhbW1lci5NYW5hZ2VyKGVsZW0pO1xuICAgICAgICAgICAgbWMuYWRkKG5ldyBIYW1tZXIuUHJlc3Moe1xuICAgICAgICAgICAgICAgIHBvaW50ZXJUeXBlOiAndG91Y2gnXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0pXG5cbiAgICB9XG5cbiAgICB1cGRhdGVWYWxpZGF0aW9uTWVzc2FnZXMoKSB7XG4gICAgICAgIHZhciBub2RlcyA9IHRoaXMubWFpbkdyb3VwLnNlbGVjdEFsbCgnLm5vZGUnKTtcbiAgICAgICAgbm9kZXMuY2xhc3NlZCgnZXJyb3InLCBmYWxzZSk7XG5cbiAgICAgICAgdGhpcy5kYXRhLnZhbGlkYXRpb25SZXN1bHRzLmZvckVhY2godmFsaWRhdGlvblJlc3VsdD0+e1xuICAgICAgICAgICAgaWYodmFsaWRhdGlvblJlc3VsdC5pc1ZhbGlkKCkpe1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModmFsaWRhdGlvblJlc3VsdC5vYmplY3RJZFRvRXJyb3IpLmZvckVhY2goaWQ9PntcbiAgICAgICAgICAgICAgICB2YXIgZXJyb3JzID0gdmFsaWRhdGlvblJlc3VsdC5vYmplY3RJZFRvRXJyb3JbaWRdO1xuICAgICAgICAgICAgICAgIHZhciBub2RlU2VsZWN0aW9uID0gdGhpcy5nZXROb2RlRDNTZWxlY3Rpb25CeUlkKGlkKTtcbiAgICAgICAgICAgICAgICBub2RlU2VsZWN0aW9uLmNsYXNzZWQoJ2Vycm9yJywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgdmFyIHRvb2x0aXBIdG1sID0gJyc7XG4gICAgICAgICAgICAgICAgZXJyb3JzLmZvckVhY2goZT0+e1xuICAgICAgICAgICAgICAgICAgICBpZih0b29sdGlwSHRtbCl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwSHRtbCs9Jzxici8+J1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXBIdG1sKz1BcHBVdGlscy5nZXRWYWxpZGF0aW9uTWVzc2FnZShlKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIFRvb2x0aXAuYXR0YWNoKG5vZGVTZWxlY3Rpb24uc2VsZWN0KCcuZXJyb3ItaW5kaWNhdG9yJyksIHRvb2x0aXBIdG1sKTtcblxuXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIGluaXRFZGdlTWFya2VycygpIHtcbiAgICAgICAgdmFyIGRlZnMgPSB0aGlzLnN2Zy5hcHBlbmQoXCJzdmc6ZGVmc1wiKTtcblxuICAgICAgICB0aGlzLmluaXRBcnJvd01hcmtlcihcImFycm93XCIpO1xuICAgICAgICB0aGlzLmluaXRBcnJvd01hcmtlcihcImFycm93LW9wdGltYWxcIik7XG4gICAgICAgIHRoaXMuaW5pdEFycm93TWFya2VyKFwiYXJyb3ctc2VsZWN0ZWRcIik7XG4gICAgfVxuXG4gICAgaW5pdEFycm93TWFya2VyKGlkKSB7XG5cbiAgICAgICAgdmFyIGRlZnMgPSB0aGlzLnN2Zy5zZWxlY3QoXCJkZWZzXCIpO1xuICAgICAgICBkZWZzLmFwcGVuZChcIm1hcmtlclwiKVxuICAgICAgICAgICAgLmF0dHIoXCJpZFwiLGlkKVxuICAgICAgICAgICAgLmF0dHIoXCJ2aWV3Qm94XCIsXCIwIC01IDEwIDEwXCIpXG4gICAgICAgICAgICAuYXR0cihcInJlZlhcIiw1KVxuICAgICAgICAgICAgLmF0dHIoXCJyZWZZXCIsMClcbiAgICAgICAgICAgIC5hdHRyKFwibWFya2VyV2lkdGhcIiw0KVxuICAgICAgICAgICAgLmF0dHIoXCJtYXJrZXJIZWlnaHRcIiw0KVxuICAgICAgICAgICAgLmF0dHIoXCJvcmllbnRcIixcImF1dG9cIilcbiAgICAgICAgICAgIC5hcHBlbmQoXCJwYXRoXCIpXG4gICAgICAgICAgICAuYXR0cihcImRcIiwgXCJNMCwtNUwxMCwwTDAsNVwiKVxuICAgICAgICAgICAgLmF0dHIoXCJjbGFzc1wiLFwiYXJyb3dIZWFkXCIpO1xuICAgIH1cblxuICAgIHVwZGF0ZUJydXNoRXh0ZW50KCkge1xuICAgICAgICB2YXIgc2VsZiA9dGhpcztcbiAgICAgICAgdGhpcy5icnVzaC5leHRlbnQoW1swLCAwXSwgW3NlbGYuc3ZnLmF0dHIoJ3dpZHRoJyksIHNlbGYuc3ZnLmF0dHIoJ2hlaWdodCcpXV0pO1xuICAgICAgICB0aGlzLmJydXNoQ29udGFpbmVyLmNhbGwodGhpcy5icnVzaCk7XG4gICAgfVxuICAgIGluaXRCcnVzaCgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHZhciBicnVzaENvbnRhaW5lciA9IHNlbGYuYnJ1c2hDb250YWluZXIgPSB0aGlzLmJydXNoQ29udGFpbmVyPSB0aGlzLnN2Zy5zZWxlY3RPckluc2VydChcImcuYnJ1c2hcIiwgXCI6Zmlyc3QtY2hpbGRcIilcbiAgICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJicnVzaFwiKTtcblxuICAgICAgICB2YXIgYnJ1c2ggPSB0aGlzLmJydXNoID0gZDMuYnJ1c2goKVxuICAgICAgICAgICAgLm9uKFwic3RhcnRcIiwgYnJ1c2hzdGFydClcbiAgICAgICAgICAgIC5vbihcImJydXNoXCIsIGJydXNobW92ZSlcbiAgICAgICAgICAgIC5vbihcImVuZFwiLCBicnVzaGVuZCk7XG5cblxuXG4gICAgICAgIHRoaXMudXBkYXRlQnJ1c2hFeHRlbnQoKTtcblxuICAgICAgICBicnVzaENvbnRhaW5lci5zZWxlY3QoJy5vdmVybGF5Jykub24oXCJtb3VzZW1vdmUuZWRnZVNlbGVjdGlvblwiLCBtb3VzZW1vdmVkKTtcbiAgICAgICAgZnVuY3Rpb24gbW91c2Vtb3ZlZCgpIHtcbiAgICAgICAgICAgIHZhciBtID0gZDMubW91c2UodGhpcyk7XG4gICAgICAgICAgICB2YXIgbWd0ID0gc2VsZi5nZXRNYWluR3JvdXBUcmFuc2xhdGlvbigpO1xuICAgICAgICAgICAgdmFyIG1hcmdpbiA9IDEwO1xuXG4gICAgICAgICAgICB2YXIgY2xvc2VzdCA9IFtudWxsLCA5OTk5OTk5OTldO1xuICAgICAgICAgICAgdmFyIGNsb3NlRWRnZXMgPSBbXTtcbiAgICAgICAgICAgIHNlbGYubWFpbkdyb3VwLnNlbGVjdEFsbCgnLmVkZ2UnKS5lYWNoKGZ1bmN0aW9uKGQpe1xuICAgICAgICAgICAgICAgIHZhciBzZWxlY3Rpb24gPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uLmNsYXNzZWQoJ3NkLWhvdmVyJywgZmFsc2UpO1xuICAgICAgICAgICAgICAgIHZhciBwYXRoTm9kZSA9IHNlbGVjdGlvbi5zZWxlY3QoJ3BhdGgnKS5ub2RlKCk7XG4gICAgICAgICAgICAgICAgdmFyIGIgPSBwYXRoTm9kZS5nZXRCQm94KCk7XG4gICAgICAgICAgICAgICAgaWYoYi54K21ndFswXSA8PW1bMF0gJiYgYi54K2Iud2lkdGgrbWd0WzBdID49IG1bMF0gJiZcbiAgICAgICAgICAgICAgICAgICBiLnkrbWd0WzFdLW1hcmdpbiA8PW1bMV0gJiYgYi55K2IuaGVpZ2h0K21ndFsxXSttYXJnaW4gPj0gbVsxXSl7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGNwID0gQXBwVXRpbHMuY2xvc2VzdFBvaW50KHBhdGhOb2RlLCBbbVswXS1tZ3RbMF0sIG1bMV0tbWd0WzFdXSk7XG4gICAgICAgICAgICAgICAgICAgIGlmKGNwLmRpc3RhbmNlIDwgbWFyZ2luICYmIGNwLmRpc3RhbmNlPGNsb3Nlc3RbMV0pe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VzdCA9IFtzZWxlY3Rpb24sIGNwLmRpc3RhbmNlXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHNlbGYuaG92ZXJlZEVkZ2UgPSBudWxsO1xuICAgICAgICAgICAgaWYoY2xvc2VzdFswXSl7XG4gICAgICAgICAgICAgICAgY2xvc2VzdFswXS5jbGFzc2VkKCdzZC1ob3ZlcicsIHRydWUpO1xuICAgICAgICAgICAgICAgIHNlbGYuaG92ZXJlZEVkZ2UgPSBjbG9zZXN0WzBdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBicnVzaHN0YXJ0KCkge1xuICAgICAgICAgICAgaWYgKCFkMy5ldmVudC5zZWxlY3Rpb24pIHJldHVybjtcbiAgICAgICAgICAgIGlmKHNlbGYuaG92ZXJlZEVkZ2Upe1xuICAgICAgICAgICAgICAgIHNlbGYuc2VsZWN0RWRnZShzZWxmLmhvdmVyZWRFZGdlLmRhdHVtKCksIHRydWUpXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBzZWxmLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBDb250ZXh0TWVudS5oaWRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBIaWdobGlnaHQgdGhlIHNlbGVjdGVkIG5vZGVzLlxuICAgICAgICBmdW5jdGlvbiBicnVzaG1vdmUoKSB7XG4gICAgICAgICAgICB2YXIgcyA9IGQzLmV2ZW50LnNlbGVjdGlvbjtcbiAgICAgICAgICAgIGlmKCFzKXJldHVybjtcblxuICAgICAgICAgICAgc2VsZi5tYWluR3JvdXAuc2VsZWN0QWxsKFwiLm5vZGVcIikuY2xhc3NlZCgnc2VsZWN0ZWQnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHZhciBtYWluR3JvdXBUcmFuc2xhdGlvbiA9IHNlbGYuZ2V0TWFpbkdyb3VwVHJhbnNsYXRpb24oKTtcbiAgICAgICAgICAgICAgICB2YXIgeCA9IGQubG9jYXRpb24ueCttYWluR3JvdXBUcmFuc2xhdGlvblswXTtcbiAgICAgICAgICAgICAgICB2YXIgeSA9IGQubG9jYXRpb24ueSttYWluR3JvdXBUcmFuc2xhdGlvblsxXTtcbiAgICAgICAgICAgICAgICB2YXIgbm9kZVNpemUgPSBzZWxmLmNvbmZpZy5sYXlvdXQubm9kZVNpemU7XG4gICAgICAgICAgICAgICAgdmFyIG9mZnNldCA9IG5vZGVTaXplKjAuMjU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNbMF1bMF0gPD0geCtvZmZzZXQgJiYgeC1vZmZzZXQgPD0gc1sxXVswXVxuICAgICAgICAgICAgICAgICAgICAmJiBzWzBdWzFdIDw9IHkrb2Zmc2V0ICYmIHktb2Zmc2V0IDw9IHNbMV1bMV07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBJZiB0aGUgYnJ1c2ggaXMgZW1wdHksIHNlbGVjdCBhbGwgY2lyY2xlcy5cbiAgICAgICAgZnVuY3Rpb24gYnJ1c2hlbmQoKSB7XG4gICAgICAgICAgICBpZiAoIWQzLmV2ZW50LnNlbGVjdGlvbikgcmV0dXJuO1xuICAgICAgICAgICAgYnJ1c2gubW92ZShicnVzaENvbnRhaW5lciwgbnVsbCk7XG5cbiAgICAgICAgICAgIHZhciBzZWxlY3RlZE5vZGVzID0gc2VsZi5nZXRTZWxlY3RlZE5vZGVzKCk7XG4gICAgICAgICAgICBpZihzZWxlY3RlZE5vZGVzICYmIHNlbGVjdGVkTm9kZXMubGVuZ3RoID09PSAxKXtcbiAgICAgICAgICAgICAgICBzZWxmLnNlbGVjdE5vZGUoc2VsZWN0ZWROb2Rlc1swXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBpZiAoIWQzLmV2ZW50LnNlbGVjdGlvbikgc2VsZi5tYWluR3JvdXAuc2VsZWN0QWxsKFwiLnNlbGVjdGVkXCIpLmNsYXNzZWQoJ3NlbGVjdGVkJywgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGlzYWJsZUJydXNoKCl7XG4gICAgICAgIGlmKCF0aGlzLmJydXNoRGlzYWJsZWQpe1xuICAgICAgICAgICAgQXBwVXRpbHMuZ3Jvd2woaTE4bi50KCdncm93bC5icnVzaERpc2FibGVkJyksICdpbmZvJywgJ2xlZnQnKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuYnJ1c2hEaXNhYmxlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuYnJ1c2hDb250YWluZXIucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgZW5hYmxlQnJ1c2goKXtcbiAgICAgICAgaWYodGhpcy5icnVzaERpc2FibGVkKXtcbiAgICAgICAgICAgIEFwcFV0aWxzLmdyb3dsKGkxOG4udCgnZ3Jvd2wuYnJ1c2hFbmFibGVkJyksICdpbmZvJywgJ2xlZnQnKVxuICAgICAgICAgICAgdGhpcy5pbml0QnJ1c2goKTtcbiAgICAgICAgICAgIHRoaXMuYnJ1c2hEaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICB9XG5cblxuICAgIH1cblxuICAgIGdldE1haW5Hcm91cFRyYW5zbGF0aW9uKGludmVydCkge1xuICAgICAgICB2YXIgdHJhbnNsYXRpb24gPSBBcHBVdGlscy5nZXRUcmFuc2xhdGlvbih0aGlzLm1haW5Hcm91cC5hdHRyKFwidHJhbnNmb3JtXCIpKTtcbiAgICAgICAgaWYoaW52ZXJ0KXtcbiAgICAgICAgICAgIHRyYW5zbGF0aW9uWzBdID0gLXRyYW5zbGF0aW9uWzBdO1xuICAgICAgICAgICAgdHJhbnNsYXRpb25bMV0gPSAtdHJhbnNsYXRpb25bMV1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJhbnNsYXRpb247XG4gICAgfVxuXG4gICAgaW5pdE5vZGVDb250ZXh0TWVudSgpIHtcbiAgICAgICAgdGhpcy5ub2RlQ29udGV4dE1lbnUgPSBuZXcgTm9kZUNvbnRleHRNZW51KHRoaXMsIHRoaXMuY29uZmlnLm9wZXJhdGlvbnNGb3JPYmplY3QpO1xuICAgIH1cblxuICAgIGluaXRFZGdlQ29udGV4dE1lbnUoKSB7XG4gICAgICAgIHRoaXMuZWRnZUNvbnRleHRNZW51ID0gbmV3IEVkZ2VDb250ZXh0TWVudSh0aGlzKTtcbiAgICB9XG5cbiAgICBpbml0VGV4dENvbnRleHRNZW51KCkge1xuICAgICAgICB0aGlzLnRleHRDb250ZXh0TWVudSA9IG5ldyBUZXh0Q29udGV4dE1lbnUodGhpcyk7XG4gICAgfVxuXG5cblxuICAgIGluaXRNYWluQ29udGV4dE1lbnUoKSB7XG4gICAgICAgIHRoaXMubWFpbkNvbnRleHRNZW51ID0gbmV3IE1haW5Db250ZXh0TWVudSh0aGlzKTtcbiAgICAgICAgdGhpcy5zdmcub24oJ2NvbnRleHRtZW51Jyx0aGlzLm1haW5Db250ZXh0TWVudSk7XG4gICAgICAgIHRoaXMuc3ZnLm9uKCdkYmxjbGljaycsdGhpcy5tYWluQ29udGV4dE1lbnUpO1xuICAgIH1cblxuICAgIGFkZFRleHQodGV4dCl7XG4gICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoKTtcbiAgICAgICAgdGhpcy5kYXRhLmFkZFRleHQodGV4dCk7XG4gICAgICAgIHRoaXMucmVkcmF3KCk7XG4gICAgICAgIHRoaXMuc2VsZWN0VGV4dCh0ZXh0KTtcbiAgICB9XG5cbiAgICBhZGROb2RlKG5vZGUsIHBhcmVudCwgcmVkcmF3PWZhbHNlKXtcbiAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSgpO1xuICAgICAgICB0aGlzLmRhdGEuYWRkTm9kZShub2RlLCBwYXJlbnQpO1xuICAgICAgICB0aGlzLnJlZHJhdyh0cnVlKTtcbiAgICAgICAgdGhpcy5sYXlvdXQudXBkYXRlKG5vZGUpO1xuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG5cbiAgICBhZGREZWNpc2lvbk5vZGUocGFyZW50KXtcbiAgICAgICAgdmFyIG5ld05vZGUgPSBuZXcgbW9kZWwuRGVjaXNpb25Ob2RlKHRoaXMubGF5b3V0LmdldE5ld0NoaWxkTG9jYXRpb24ocGFyZW50KSk7XG4gICAgICAgIHRoaXMuYWRkTm9kZShuZXdOb2RlLCBwYXJlbnQpXG4gICAgfVxuICAgIGFkZENoYW5jZU5vZGUocGFyZW50KXtcbiAgICAgICAgdmFyIG5ld05vZGUgPSBuZXcgbW9kZWwuQ2hhbmNlTm9kZSh0aGlzLmxheW91dC5nZXROZXdDaGlsZExvY2F0aW9uKHBhcmVudCkpO1xuICAgICAgICB0aGlzLmFkZE5vZGUobmV3Tm9kZSwgcGFyZW50KVxuICAgIH1cbiAgICBhZGRUZXJtaW5hbE5vZGUocGFyZW50KXtcbiAgICAgICAgdmFyIG5ld05vZGUgPSBuZXcgbW9kZWwuVGVybWluYWxOb2RlKHRoaXMubGF5b3V0LmdldE5ld0NoaWxkTG9jYXRpb24ocGFyZW50KSk7XG4gICAgICAgIHRoaXMuYWRkTm9kZShuZXdOb2RlLCBwYXJlbnQpXG4gICAgfVxuXG4gICAgaW5qZWN0Tm9kZShub2RlLCBlZGdlKXtcbiAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSgpO1xuICAgICAgICB0aGlzLmRhdGEuaW5qZWN0Tm9kZShub2RlLCBlZGdlKTtcbiAgICAgICAgdGhpcy5yZWRyYXcoKTtcbiAgICAgICAgdGhpcy5sYXlvdXQudXBkYXRlKG5vZGUpO1xuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG5cbiAgICBpbmplY3REZWNpc2lvbk5vZGUoZWRnZSl7XG4gICAgICAgIHZhciBuZXdOb2RlID0gbmV3IG1vZGVsLkRlY2lzaW9uTm9kZSh0aGlzLmxheW91dC5nZXRJbmplY3RlZE5vZGVMb2NhdGlvbihlZGdlKSk7XG4gICAgICAgIHRoaXMuaW5qZWN0Tm9kZShuZXdOb2RlLCBlZGdlKTtcblxuICAgIH1cblxuICAgIGluamVjdENoYW5jZU5vZGUoZWRnZSl7XG4gICAgICAgIHZhciBuZXdOb2RlID0gbmV3IG1vZGVsLkNoYW5jZU5vZGUodGhpcy5sYXlvdXQuZ2V0SW5qZWN0ZWROb2RlTG9jYXRpb24oZWRnZSkpO1xuICAgICAgICB0aGlzLmluamVjdE5vZGUobmV3Tm9kZSwgZWRnZSk7XG4gICAgfVxuXG4gICAgcmVtb3ZlTm9kZShub2RlKSB7XG4gICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoKTtcbiAgICAgICAgdGhpcy5kYXRhLnJlbW92ZU5vZGUobm9kZSk7XG5cblxuICAgICAgICBpZighdGhpcy5sYXlvdXQuaXNNYW51YWxMYXlvdXQoKSl7XG4gICAgICAgICAgICB0aGlzLmxheW91dC51cGRhdGUoKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLnJlZHJhdygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVtb3ZlU2VsZWN0ZWROb2RlcygpIHtcbiAgICAgICAgdmFyIHNlbGVjdGVkTm9kZXMgPSB0aGlzLmdldFNlbGVjdGVkTm9kZXMoKTtcbiAgICAgICAgaWYoIXNlbGVjdGVkTm9kZXMubGVuZ3RoKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKCk7XG4gICAgICAgIHRoaXMuZGF0YS5yZW1vdmVOb2RlcyhzZWxlY3RlZE5vZGVzKTtcbiAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICB0aGlzLnJlZHJhdygpO1xuICAgICAgICB0aGlzLmxheW91dC51cGRhdGUoKTtcbiAgICB9XG5cbiAgICByZW1vdmVTZWxlY3RlZFRleHRzKCl7XG4gICAgICAgIHZhciBzZWxlY3RlZFRleHRzID0gdGhpcy5nZXRTZWxlY3RlZFRleHRzKCk7XG5cbiAgICAgICAgaWYoIXNlbGVjdGVkVGV4dHMubGVuZ3RoKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKCk7XG4gICAgICAgIHRoaXMuZGF0YS5yZW1vdmVUZXh0cyhzZWxlY3RlZFRleHRzKTtcbiAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICB0aGlzLnJlZHJhdygpO1xuICAgIH1cblxuICAgIGNvcHlOb2RlKGQsIG5vdENsZWFyUHJldlNlbGVjdGlvbikge1xuICAgICAgICB2YXIgY2xvbmUgPSB0aGlzLmRhdGEuY2xvbmVTdWJ0cmVlKGQpO1xuICAgICAgICBpZihub3RDbGVhclByZXZTZWxlY3Rpb24pe1xuICAgICAgICAgICAgaWYoIXRoaXMuY29waWVkTm9kZXMpe1xuICAgICAgICAgICAgICAgIHRoaXMuY29waWVkTm9kZXM9W107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNvcGllZE5vZGVzLnB1c2goY2xvbmUpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMuY29waWVkTm9kZXMgPSBbY2xvbmVdO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBjdXROb2RlKGQpIHtcbiAgICAgICAgdGhpcy5jb3B5Tm9kZShkKTtcbiAgICAgICAgdGhpcy5yZW1vdmVOb2RlKGQpO1xuICAgIH1cblxuICAgIGN1dFNlbGVjdGVkTm9kZXMoKXtcbiAgICAgICAgdmFyIHNlbGVjdGVkTm9kZXMgPSB0aGlzLmdldFNlbGVjdGVkTm9kZXMoKTtcbiAgICAgICAgdmFyIHNlbGVjdGVkUm9vdHMgPSB0aGlzLmRhdGEuZmluZFN1YnRyZWVSb290cyhzZWxlY3RlZE5vZGVzKTtcbiAgICAgICAgdGhpcy5jb3B5Tm9kZXMoc2VsZWN0ZWRSb290cyk7XG4gICAgICAgIHRoaXMucmVtb3ZlU2VsZWN0ZWROb2RlcygpO1xuICAgIH1cblxuICAgIGNvcHlTZWxlY3RlZE5vZGVzKCkge1xuICAgICAgICB2YXIgc2VsZjtcbiAgICAgICAgdmFyIHNlbGVjdGVkTm9kZXMgPSB0aGlzLmdldFNlbGVjdGVkTm9kZXMoKTtcblxuICAgICAgICB2YXIgc2VsZWN0ZWRSb290cyA9IHRoaXMuZGF0YS5maW5kU3VidHJlZVJvb3RzKHNlbGVjdGVkTm9kZXMpO1xuICAgICAgICB0aGlzLmNvcHlOb2RlcyhzZWxlY3RlZFJvb3RzKTtcblxuXG4gICAgfVxuXG4gICAgY29weU5vZGVzKG5vZGVzKXtcbiAgICAgICAgdGhpcy5jb3BpZWROb2RlcyA9IG5vZGVzLm1hcChkPT50aGlzLmRhdGEuY2xvbmVTdWJ0cmVlKGQpKTtcbiAgICB9XG5cblxuXG4gICAgcGFzdGVUb05vZGUobm9kZSkge1xuICAgICAgICBpZighdGhpcy5jb3BpZWROb2RlcyB8fCAhdGhpcy5jb3BpZWROb2Rlcy5sZW5ndGgpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoKTtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBzZWxmLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgIHZhciBub2Rlc1RvQXR0YWNoID0gdGhpcy5jb3BpZWROb2RlcztcbiAgICAgICAgc2VsZi5jb3B5Tm9kZXModGhpcy5jb3BpZWROb2Rlcyk7XG4gICAgICAgIG5vZGVzVG9BdHRhY2guZm9yRWFjaCh0b0F0dGFjaD0+e1xuICAgICAgICAgICAgdmFyIGF0dGFjaGVkID0gdGhpcy5kYXRhLmF0dGFjaFN1YnRyZWUodG9BdHRhY2gsIG5vZGUpLmNoaWxkTm9kZTtcbiAgICAgICAgICAgIGlmKGF0dGFjaGVkLmZvbGRlZCl7XG4gICAgICAgICAgICAgICAgc2VsZi5mb2xkU3VidHJlZShhdHRhY2hlZCwgYXR0YWNoZWQuZm9sZGVkLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbG9jYXRpb24gPSBzZWxmLmxheW91dC5nZXROZXdDaGlsZExvY2F0aW9uKG5vZGUpO1xuICAgICAgICAgICAgYXR0YWNoZWQubW92ZVRvKGxvY2F0aW9uLngsIGxvY2F0aW9uLnksIHRydWUpO1xuICAgICAgICAgICAgc2VsZi5sYXlvdXQubW92ZU5vZGVUb0VtcHR5UGxhY2UoYXR0YWNoZWQsIGZhbHNlKTtcbiAgICAgICAgICAgIHNlbGYubGF5b3V0LmZpdE5vZGVzSW5QbG90dGluZ1JlZ2lvbih0aGlzLmRhdGEuZ2V0QWxsRGVzY2VuZGFudE5vZGVzKGF0dGFjaGVkKSk7XG5cbiAgICAgICAgICAgIHNlbGYuc2VsZWN0U3ViVHJlZShhdHRhY2hlZCwgZmFsc2UsIG5vZGVzVG9BdHRhY2gubGVuZ3RoPjEpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZihub2RlLmZvbGRlZCl7XG4gICAgICAgICAgICBzZWxmLmZvbGRTdWJ0cmVlKG5vZGUsIG5vZGUuZm9sZGVkLCBmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBzZWxmLnJlZHJhdygpO1xuICAgICAgICAgICAgc2VsZi5sYXlvdXQudXBkYXRlKCk7XG4gICAgICAgIH0sMTApXG5cbiAgICB9XG5cbiAgICBwYXN0ZVRvTmV3TG9jYXRpb24ocG9pbnQpIHtcbiAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSgpO1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHNlbGYuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgdmFyIG5vZGVzVG9BdHRhY2ggPSB0aGlzLmNvcGllZE5vZGVzO1xuICAgICAgICBzZWxmLmNvcHlOb2Rlcyh0aGlzLmNvcGllZE5vZGVzKTtcbiAgICAgICAgbm9kZXNUb0F0dGFjaC5mb3JFYWNoKHRvQXR0YWNoPT4ge1xuICAgICAgICAgICAgdmFyIGF0dGFjaGVkID0gdGhpcy5kYXRhLmF0dGFjaFN1YnRyZWUodG9BdHRhY2gpO1xuICAgICAgICAgICAgaWYoYXR0YWNoZWQuZm9sZGVkKXtcbiAgICAgICAgICAgICAgICBzZWxmLmZvbGRTdWJ0cmVlKGF0dGFjaGVkLCBhdHRhY2hlZC5mb2xkZWQsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGF0dGFjaGVkLm1vdmVUbyhwb2ludC54LCBwb2ludC55LCB0cnVlKTtcbiAgICAgICAgICAgIHNlbGYubGF5b3V0Lm1vdmVOb2RlVG9FbXB0eVBsYWNlKGF0dGFjaGVkLCBmYWxzZSk7XG4gICAgICAgICAgICBzZWxmLmxheW91dC5maXROb2Rlc0luUGxvdHRpbmdSZWdpb24odGhpcy5kYXRhLmdldEFsbERlc2NlbmRhbnROb2RlcyhhdHRhY2hlZCkpO1xuXG4gICAgICAgICAgICBzZWxmLnNlbGVjdFN1YlRyZWUoYXR0YWNoZWQsIGZhbHNlLCBub2Rlc1RvQXR0YWNoLmxlbmd0aD4xKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgc2VsZi5yZWRyYXcoKTtcbiAgICAgICAgICAgIHNlbGYubGF5b3V0LnVwZGF0ZSgpO1xuICAgICAgICB9LDEwKVxuXG4gICAgfVxuXG4gICAgY29udmVydE5vZGUobm9kZSwgdHlwZVRvQ29udmVydFRvKXtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKCk7XG4gICAgICAgIHRoaXMuZGF0YS5jb252ZXJ0Tm9kZShub2RlLCB0eXBlVG9Db252ZXJ0VG8pO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBzZWxmLnJlZHJhdyh0cnVlKTtcbiAgICAgICAgfSwxMClcbiAgICB9XG5cbiAgICBwZXJmb3JtT3BlcmF0aW9uKG9iamVjdCwgb3BlcmF0aW9uKXtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKCk7XG4gICAgICAgIG9wZXJhdGlvbi5wZXJmb3JtKG9iamVjdCk7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHNlbGYucmVkcmF3KCk7XG4gICAgICAgICAgICBzZWxmLmxheW91dC51cGRhdGUoKTtcbiAgICAgICAgfSwxMClcbiAgICB9XG5cbiAgICBmb2xkU3VidHJlZShub2RlLCBmb2xkID0gdHJ1ZSwgcmVkcmF3PXRydWUpe1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIG5vZGUuZm9sZGVkID0gZm9sZDtcblxuICAgICAgICB0aGlzLmRhdGEuZ2V0QWxsRGVzY2VuZGFudE5vZGVzKG5vZGUpLmZvckVhY2gobj0+e1xuICAgICAgICAgICAgbi4kaGlkZGVuID0gZm9sZDtcbiAgICAgICAgICAgIG4uZm9sZGVkID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmRhdGEuZ2V0QWxsRGVzY2VuZGFudEVkZ2VzKG5vZGUpLmZvckVhY2goZT0+ZS4kaGlkZGVuID0gZm9sZCk7XG5cbiAgICAgICAgaWYoIXJlZHJhdyl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgc2VsZi5yZWRyYXcoKTtcbiAgICAgICAgICAgIHNlbGYubGF5b3V0LnVwZGF0ZSgpO1xuICAgICAgICB9LDEwKVxuICAgIH1cblxuICAgIHVwZGF0ZVZpc2liaWxpdHkobm9kZSA9IG51bGwpe1xuICAgICAgICBpZighbm9kZSl7XG4gICAgICAgICAgICB0aGlzLmRhdGEuZ2V0Um9vdHMoKS5mb3JFYWNoKG49PnRoaXMudXBkYXRlVmlzaWJpbGl0eShuKSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZihub2RlLmZvbGRlZCl7XG4gICAgICAgICAgICB0aGlzLmZvbGRTdWJ0cmVlKG5vZGUsIHRydWUsIGZhbHNlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIG5vZGUuY2hpbGRFZGdlcy5mb3JFYWNoKGUgPT4gdGhpcy51cGRhdGVWaXNpYmlsaXR5KGUuY2hpbGROb2RlKSk7XG5cbiAgICB9XG5cbiAgICBtb3ZlTm9kZVRvKHgseSl7XG5cbiAgICB9XG5cbiAgICB1cGRhdGVOb2RlUG9zaXRpb24obm9kZSkge1xuICAgICAgICB0aGlzLmdldE5vZGVEM1NlbGVjdGlvbihub2RlKS5yYWlzZSgpLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJytub2RlLmxvY2F0aW9uLngrJyAnK25vZGUubG9jYXRpb24ueSsnKScpO1xuICAgIH1cblxuICAgIHVwZGF0ZVRleHRQb3NpdGlvbih0ZXh0KSB7XG4gICAgICAgIHRoaXMuZ2V0VGV4dEQzU2VsZWN0aW9uKHRleHQpLnJhaXNlKCkuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnK3RleHQubG9jYXRpb24ueCsnICcrdGV4dC5sb2NhdGlvbi55KycpJyk7XG4gICAgfVxuXG4gICAgZ2V0Tm9kZUQzU2VsZWN0aW9uKG5vZGUpe1xuICAgICAgICByZXR1cm4gdGhpcy5nZXROb2RlRDNTZWxlY3Rpb25CeUlkKG5vZGUuJGlkKTtcbiAgICB9XG5cbiAgICBnZXROb2RlRDNTZWxlY3Rpb25CeUlkKGlkKXtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFpbkdyb3VwLnNlbGVjdCgnI25vZGUtJytpZCk7XG4gICAgfVxuICAgIGdldFRleHREM1NlbGVjdGlvbih0ZXh0KXtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VGV4dEQzU2VsZWN0aW9uQnlJZCh0ZXh0LiRpZCk7XG4gICAgfVxuICAgIGdldFRleHREM1NlbGVjdGlvbkJ5SWQoaWQpe1xuICAgICAgICByZXR1cm4gdGhpcy5tYWluR3JvdXAuc2VsZWN0KCcjdGV4dC0nK2lkKTtcbiAgICB9XG5cbiAgICBnZXRTZWxlY3RlZE5vZGVzKHZpc2libGVPbmx5ID0gZmFsc2UpIHtcbiAgICAgICAgbGV0IHNlbGVjdGVkVmlzaWJsZSA9IHRoaXMubWFpbkdyb3VwLnNlbGVjdEFsbChcIi5ub2RlLnNlbGVjdGVkXCIpLmRhdGEoKTtcbiAgICAgICAgaWYodmlzaWJsZU9ubHkpe1xuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdGVkVmlzaWJsZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBhbGxTZWxlY3RlZCAgPSBbXTtcbiAgICAgICAgYWxsU2VsZWN0ZWQucHVzaCguLi5zZWxlY3RlZFZpc2libGUpO1xuXG4gICAgICAgIHNlbGVjdGVkVmlzaWJsZS5mb3JFYWNoKG49PntcbiAgICAgICAgICAgIGlmKG4uZm9sZGVkKXtcbiAgICAgICAgICAgICAgICBsZXQgZGVzY2VuZGFudHMgPSB0aGlzLmRhdGEuZ2V0QWxsRGVzY2VuZGFudE5vZGVzKG4pO1xuICAgICAgICAgICAgICAgIGlmKGRlc2NlbmRhbnRzKXtcbiAgICAgICAgICAgICAgICAgICAgYWxsU2VsZWN0ZWQucHVzaCguLi5kZXNjZW5kYW50cyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gYWxsU2VsZWN0ZWQ7XG4gICAgfVxuXG4gICAgZ2V0U2VsZWN0ZWRUZXh0cygpe1xuICAgICAgICByZXR1cm4gdGhpcy5tYWluR3JvdXAuc2VsZWN0QWxsKFwiLmZsb2F0aW5nLXRleHQuc2VsZWN0ZWRcIikuZGF0YSgpO1xuICAgIH1cblxuICAgIGNsZWFyU2VsZWN0aW9uKCl7XG4gICAgICAgIHRoaXMubWFpbkdyb3VwLnNlbGVjdEFsbChcIi5lZGdlLnNlbGVjdGVkXCIpLnNlbGVjdCgncGF0aCcpLmF0dHIoXCJtYXJrZXItZW5kXCIsIGQgPT4gXCJ1cmwoI2Fycm93XCIrKHRoaXMuaXNPcHRpbWFsKGQpPyctb3B0aW1hbCc6JycpK1wiKVwiKVxuICAgICAgICB0aGlzLm1haW5Hcm91cC5zZWxlY3RBbGwoXCIuc2VsZWN0ZWRcIikuY2xhc3NlZCgnc2VsZWN0ZWQnLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuY29uZmlnLm9uU2VsZWN0aW9uQ2xlYXJlZCgpO1xuICAgIH1cblxuICAgIHNlbGVjdEVkZ2UoZWRnZSwgY2xlYXJTZWxlY3Rpb25CZWZvcmVTZWxlY3Qpe1xuICAgICAgICBpZihjbGVhclNlbGVjdGlvbkJlZm9yZVNlbGVjdCl7XG4gICAgICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb25maWcub25FZGdlU2VsZWN0ZWQoZWRnZSk7XG4gICAgICAgIHRoaXMubWFpbkdyb3VwLnNlbGVjdCgnI2VkZ2UtJytlZGdlLiRpZClcbiAgICAgICAgICAgIC5jbGFzc2VkKCdzZWxlY3RlZCcsIHRydWUpXG4gICAgICAgICAgICAuc2VsZWN0KCdwYXRoJylcbiAgICAgICAgICAgIC5hdHRyKFwibWFya2VyLWVuZFwiLCBkID0+IFwidXJsKCNhcnJvdy1zZWxlY3RlZClcIilcbiAgICB9XG5cbiAgICBpc05vZGVTZWxlY3RlZChub2RlKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Tm9kZUQzU2VsZWN0aW9uKG5vZGUpLmNsYXNzZWQoJ3NlbGVjdGVkJyk7XG4gICAgfVxuXG4gICAgc2VsZWN0Tm9kZShub2RlLCBjbGVhclNlbGVjdGlvbkJlZm9yZVNlbGVjdCwgc2tpcENhbGxiYWNrKXtcbiAgICAgICAgaWYoY2xlYXJTZWxlY3Rpb25CZWZvcmVTZWxlY3Qpe1xuICAgICAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIXNraXBDYWxsYmFjayl7XG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5vbk5vZGVTZWxlY3RlZChub2RlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZ2V0Tm9kZUQzU2VsZWN0aW9uQnlJZChub2RlLiRpZCkuY2xhc3NlZCgnc2VsZWN0ZWQnLCB0cnVlKTtcbiAgICB9XG5cbiAgICBzZWxlY3RUZXh0KHRleHQsIGNsZWFyU2VsZWN0aW9uQmVmb3JlU2VsZWN0LCBza2lwQ2FsbGJhY2spe1xuICAgICAgICBpZihjbGVhclNlbGVjdGlvbkJlZm9yZVNlbGVjdCl7XG4gICAgICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZighc2tpcENhbGxiYWNrKXtcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLm9uVGV4dFNlbGVjdGVkKHRleHQpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmdldFRleHREM1NlbGVjdGlvbkJ5SWQodGV4dC4kaWQpLmNsYXNzZWQoJ3NlbGVjdGVkJywgdHJ1ZSk7XG4gICAgfVxuXG4gICAgc2VsZWN0U3ViVHJlZShub2RlLCBjbGVhclNlbGVjdGlvbkJlZm9yZVNlbGVjdCxza2lwQ2FsbGJhY2spIHtcbiAgICAgICAgaWYoY2xlYXJTZWxlY3Rpb25CZWZvcmVTZWxlY3Qpe1xuICAgICAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2VsZWN0Tm9kZShub2RlLCBmYWxzZSwgc2tpcENhbGxiYWNrKTtcbiAgICAgICAgbm9kZS5jaGlsZEVkZ2VzLmZvckVhY2goZT0+dGhpcy5zZWxlY3RTdWJUcmVlKGUuY2hpbGROb2RlLCBmYWxzZSwgdHJ1ZSkpO1xuICAgIH1cblxuICAgIHNlbGVjdEFsbE5vZGVzKCkge1xuICAgICAgICB0aGlzLm1haW5Hcm91cC5zZWxlY3RBbGwoXCIubm9kZVwiKS5jbGFzc2VkKCdzZWxlY3RlZCcsIHRydWUpO1xuICAgIH1cblxuICAgIGF1dG9MYXlvdXQodHlwZSwgd2l0aG91dFN0YXRlU2F2aW5nKXtcbiAgICAgICAgdGhpcy5sYXlvdXQuYXV0b0xheW91dCh0eXBlLCB3aXRob3V0U3RhdGVTYXZpbmcpO1xuICAgIH1cblxuICAgIHVwZGF0ZURpYWdyYW1UaXRsZSh0aXRsZVZhbHVlKXtcbiAgICAgICAgaWYoIXRpdGxlVmFsdWUpe1xuICAgICAgICAgICAgdGl0bGVWYWx1ZSA9ICcnO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGlhZ3JhbVRpdGxlID0gdGl0bGVWYWx1ZTtcbiAgICAgICAgdGhpcy5yZWRyYXdEaWFncmFtVGl0bGUoKTtcbiAgICAgICAgdGhpcy5yZWRyYXdEaWFncmFtRGVzY3JpcHRpb24oKTtcbiAgICAgICAgdGhpcy51cGRhdGVNYXJnaW4odHJ1ZSk7XG4gICAgfVxuXG4gICAgcmVkcmF3RGlhZ3JhbVRpdGxlKCl7XG4gICAgICAgIHZhciBzdmdXaWR0aCA9IHRoaXMuc3ZnLmF0dHIoJ3dpZHRoJyk7XG4gICAgICAgIHZhciBzdmdIZWlnaHQgPSB0aGlzLnN2Zy5hdHRyKCdoZWlnaHQnKTtcbiAgICAgICAgdGhpcy50aXRsZUNvbnRhaW5lciA9IHRoaXMuc3ZnLnNlbGVjdE9yQXBwZW5kKCdnLnNkLXRpdGxlLWNvbnRhaW5lcicpO1xuXG4gICAgICAgIHZhciB0aXRsZSA9IHRoaXMudGl0bGVDb250YWluZXIuc2VsZWN0T3JBcHBlbmQoJ3RleHQuc2QtdGl0bGUnKTtcbiAgICAgICAgdGl0bGUudGV4dCh0aGlzLmRpYWdyYW1UaXRsZSk7XG4gICAgICAgIExheW91dC5zZXRIYW5naW5nUG9zaXRpb24odGl0bGUpO1xuXG4gICAgICAgIHZhciBtYXJnaW5Ub3AgPSBwYXJzZUludCh0aGlzLmNvbmZpZy50aXRsZS5tYXJnaW4udG9wKTtcbiAgICAgICAgdGhpcy50aXRsZUNvbnRhaW5lci5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcrKHN2Z1dpZHRoLzIpKycsJysoIG1hcmdpblRvcCkrJyknKTtcbiAgICB9XG4gICAgcmVkcmF3RGlhZ3JhbURlc2NyaXB0aW9uKCl7XG4gICAgICAgIHZhciBzdmdXaWR0aCA9IHRoaXMuc3ZnLmF0dHIoJ3dpZHRoJyk7XG4gICAgICAgIHZhciBzdmdIZWlnaHQgPSB0aGlzLnN2Zy5hdHRyKCdoZWlnaHQnKTtcbiAgICAgICAgdGhpcy50aXRsZUNvbnRhaW5lciA9IHRoaXMuc3ZnLnNlbGVjdE9yQXBwZW5kKCdnLnNkLXRpdGxlLWNvbnRhaW5lcicpO1xuXG4gICAgICAgIHZhciBkZXNjID0gdGhpcy50aXRsZUNvbnRhaW5lci5zZWxlY3RPckFwcGVuZCgndGV4dC5zZC1kZXNjcmlwdGlvbicpO1xuXG4gICAgICAgIGlmKCF0aGlzLmNvbmZpZy5kZXNjcmlwdGlvbi5zaG93KXtcbiAgICAgICAgICAgIGRlc2MucmVtb3ZlKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbGluZXMgPSB0aGlzLmRpYWdyYW1EZXNjcmlwdGlvbiA/IHRoaXMuZGlhZ3JhbURlc2NyaXB0aW9uLnNwbGl0KCdcXG4nKSA6IFtdO1xuICAgICAgICB2YXIgdHNwYW5zID0gZGVzYy5zZWxlY3RBbGwoJ3RzcGFuJykuZGF0YShsaW5lcyk7XG4gICAgICAgIHRzcGFucy5lbnRlcigpLmFwcGVuZCgndHNwYW4nKVxuICAgICAgICAgICAgLm1lcmdlKHRzcGFucylcbiAgICAgICAgICAgIC5odG1sKGw9PkFwcFV0aWxzLnJlcGxhY2VVcmxzKEFwcFV0aWxzLmVzY2FwZUh0bWwobCkpKVxuICAgICAgICAgICAgLmF0dHIoJ2R5JywgKGQsaSk9Pmk+MCA/ICcxLjFlbSc6IHVuZGVmaW5lZClcbiAgICAgICAgICAgIC5hdHRyKCd4JywgJzAnKTtcblxuICAgICAgICB0c3BhbnMuZXhpdCgpLnJlbW92ZSgpO1xuICAgICAgICBMYXlvdXQuc2V0SGFuZ2luZ1Bvc2l0aW9uKGRlc2MpO1xuXG4gICAgICAgIHZhciB0aXRsZSA9IHRoaXMudGl0bGVDb250YWluZXIuc2VsZWN0T3JBcHBlbmQoJ3RleHQuc2QtdGl0bGUnKTtcblxuICAgICAgICB2YXIgbWFyZ2luVG9wID0gMDtcbiAgICAgICAgaWYodGhpcy5kaWFncmFtVGl0bGUpe1xuICAgICAgICAgICAgbWFyZ2luVG9wICs9IHRpdGxlLm5vZGUoKS5nZXRCQm94KCkuaGVpZ2h0O1xuICAgICAgICAgICAgbWFyZ2luVG9wKz0gTWF0aC5tYXgocGFyc2VJbnQodGhpcy5jb25maWcuZGVzY3JpcHRpb24ubWFyZ2luLnRvcCksIDApO1xuICAgICAgICB9XG5cblxuICAgICAgICBkZXNjLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoMCwnKyggbWFyZ2luVG9wKSsnKScpO1xuICAgIH1cblxuICAgIHVwZGF0ZURpYWdyYW1EZXNjcmlwdGlvbihkZXNjcmlwdGlvblZhbHVlKXtcbiAgICAgICAgaWYoIWRlc2NyaXB0aW9uVmFsdWUpe1xuICAgICAgICAgICAgZGVzY3JpcHRpb25WYWx1ZSA9ICcnO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGlhZ3JhbURlc2NyaXB0aW9uID0gZGVzY3JpcHRpb25WYWx1ZTtcbiAgICAgICAgdGhpcy5yZWRyYXdEaWFncmFtVGl0bGUoKTtcbiAgICAgICAgdGhpcy5yZWRyYXdEaWFncmFtRGVzY3JpcHRpb24oKTtcbiAgICAgICAgdGhpcy51cGRhdGVNYXJnaW4odHJ1ZSk7XG4gICAgfVxuXG5cbiAgICBnZXRUaXRsZUdyb3VwSGVpZ2h0KHdpdGhNYXJnaW5zKXtcbiAgICAgICAgaWYoIXRoaXMudGl0bGVDb250YWluZXIpe1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGggPSB0aGlzLnRpdGxlQ29udGFpbmVyLm5vZGUoKS5nZXRCQm94KCkuaGVpZ2h0O1xuICAgICAgICBpZih3aXRoTWFyZ2lucyl7XG4gICAgICAgICAgICBoKz0gcGFyc2VJbnQodGhpcy5jb25maWcudGl0bGUubWFyZ2luLmJvdHRvbSk7XG4gICAgICAgICAgICBoKz0gcGFyc2VJbnQodGhpcy5jb25maWcudGl0bGUubWFyZ2luLnRvcCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGg7XG4gICAgfVxuXG59XG4iLCJleHBvcnQgKiBmcm9tICcuL3NyYy9pbmRleCdcbiJdfQ==
