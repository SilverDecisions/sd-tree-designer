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
            return a.parent == b.parent ? 1 : 1.2;
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
            return this.config.type == Layout.MANUAL_LAYOUT_NAME;
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
                var sameParent = node.$parent && colidingNode.$parent && node.$parent == colidingNode.$parent;
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
            if (this.config.gridWidth == width) {
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
            if (this.config.gridHeight == gridHeight) {
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
            if (this.config.nodeSize == nodeSize) {
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
            if (this.config.edgeSlantWidthMax == width) {
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
                if (type == 'cluster') {
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

            var revertX = pivot && self.config.limitNodePositioning && pivot.location.x == pivot.$location.x;

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
                    var button = d3.select(nodeElem).selectOrAppend('text.sd-unfold-button').text("[+]").on('click dbclick', function () {
                        return self.foldSubtree(d, false);
                    });

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLXV0aWxzLmpzIiwic3JjL2NvbnRleHQtbWVudS9jb250ZXh0LW1lbnUuanMiLCJzcmMvY29udGV4dC1tZW51L2VkZ2UtY29udGV4dC1tZW51LmpzIiwic3JjL2NvbnRleHQtbWVudS9tYWluLWNvbnRleHQtbWVudS5qcyIsInNyYy9jb250ZXh0LW1lbnUvbm9kZS1jb250ZXh0LW1lbnUuanMiLCJzcmMvY29udGV4dC1tZW51L3RleHQtY29udGV4dC1tZW51LmpzIiwic3JjL2QzLWV4dGVuc2lvbnMuanMiLCJzcmMvZDMuanMiLCJzcmMvaTE4bi9kZS5qc29uIiwic3JjL2kxOG4vZW4uanNvbiIsInNyYy9pMThuL2ZyLmpzb24iLCJzcmMvaTE4bi9pMThuLmpzIiwic3JjL2kxOG4vaXQuanNvbiIsInNyYy9pMThuL3BsLmpzb24iLCJzcmMvaW5kZXguanMiLCJzcmMvbGF5b3V0LmpzIiwic3JjL25vZGUtZHJhZy1oYW5kbGVyLmpzIiwic3JjL3N5bWJvbHMvY2lyY2xlLmpzIiwic3JjL3N5bWJvbHMvdHJpYW5nbGUuanMiLCJzcmMvdGVtcGxhdGVzLmpzIiwic3JjL3RlbXBsYXRlcy9ncm93bF9tZXNzYWdlLmh0bWwiLCJzcmMvdGV4dC1kcmFnLWhhbmRsZXIuanMiLCJzcmMvdG9vbHRpcC5qcyIsInNyYy90cmVlLWRlc2lnbmVyLmpzIiwiaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBOztJLEFBQVk7O0FBQ1o7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0ksQUFFYTs7Ozs7O2FBa0JUOzs7OEMsQUFDNkIsVyxBQUFXLFksQUFBWSxPQUFPLEFBQ3ZEO2dCQUFJLFVBQVUsVUFBZCxBQUFjLEFBQVUsQUFDeEI7b0JBQUEsQUFBUSxjQUFSLEFBQXNCLEFBRXRCOztnQkFBSSxTQUFKLEFBQWEsQUFDYjtn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OztnQkFBQTt3QkFBQTtzQkFBQTtBQUFBO0FBQUE7Ozs7O0FBQ0EsNENBQUE7aURBQUE7O2dCQUFBO3dCQUFBO3FCQUFBO0FBQUE7QUFBQTs7Ozs7QUFDQSw2Q0FBQTtpREFBQTs7Z0JBQUE7d0JBQUE7c0JBQUE7QUFBQTtBQUFBOzs7OztBQUNBLDZDQUFBO2lEQUFBOztnQkFBQTt3QkFBQTtzQkFBQTtBQUFBO0FBQUE7Ozs7O0FBQ0EsaURBQUE7aURBQUE7O2dCQUFBO3dCQUFBOzBCQUFBO0FBQUE7QUFBQTs7Ozs7QUFDQSxrREFBQTtpREFBQTs7Z0JBQUE7d0JBQUE7MkJBQUE7QUFBQTtBQUFBOzs7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUN0QztnQkFBRyxDQUFILEFBQUksa0JBQWlCLEFBQ2pCO21DQUFBLEFBQW1CLEFBQ3RCO0FBQ0Q7aUJBQUEsQUFBSyxxQkFBTCxBQUEwQixBQUMxQjtpQkFBQSxBQUFLLEFBQ0w7aUJBQUEsQUFBSyxBQUNMO2lCQUFBLEFBQUssYUFBTCxBQUFrQixBQUNyQjs7Ozs0QyxBQUdtQixhQUFZLEFBQzVCO2dCQUFHLENBQUMsS0FBSixBQUFTLGdCQUFlLEFBQ3BCO3VCQUFBLEFBQU8sQUFDVjtBQUNEO2dCQUFJLElBQUksS0FBQSxBQUFLLGVBQUwsQUFBb0IsT0FBcEIsQUFBMkIsVUFBbkMsQUFBNkMsQUFDN0M7Z0JBQUEsQUFBRyxhQUFZLEFBQ1g7cUJBQUksU0FBUyxLQUFBLEFBQUssT0FBTCxBQUFZLE1BQVosQUFBa0IsT0FBL0IsQUFBSSxBQUFrQyxBQUN0QztxQkFBSSxTQUFTLEtBQUEsQUFBSyxPQUFMLEFBQVksTUFBWixBQUFrQixPQUEvQixBQUFJLEFBQWtDLEFBQ3pDO0FBQ0Q7bUJBQUEsQUFBTyxBQUNWOzs7Ozs7Ozs7Ozs7Ozs7O0FDMTRDTCwyQ0FBQTtpREFBQTs7Z0JBQUE7d0JBQUE7b0JBQUE7QUFBQTtBQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCAqIGFzIGQzIGZyb20gXCIuL2QzXCI7XG5pbXBvcnQge1RlbXBsYXRlc30gZnJvbSBcIi4vdGVtcGxhdGVzXCI7XG5pbXBvcnQge2kxOG59IGZyb20gXCIuL2kxOG4vaTE4blwiO1xuaW1wb3J0IHtVdGlsc30gZnJvbSBcInNkLXV0aWxzXCI7XG5cbmV4cG9ydCBjbGFzcyBBcHBVdGlscyB7XG5cbiAgICBzdGF0aWMgc2FuaXRpemVIZWlnaHQgPSBmdW5jdGlvbiAoaGVpZ2h0LCBjb250YWluZXIpIHtcbiAgICAgICAgcmV0dXJuIChoZWlnaHQgfHwgcGFyc2VJbnQoY29udGFpbmVyLnN0eWxlKCdoZWlnaHQnKSwgMTApIHx8IDQwMCk7XG4gICAgfTtcblxuICAgIHN0YXRpYyBzYW5pdGl6ZVdpZHRoID0gZnVuY3Rpb24gKHdpZHRoLCBjb250YWluZXIpIHtcbiAgICAgICAgcmV0dXJuICh3aWR0aCB8fCBwYXJzZUludChjb250YWluZXIuc3R5bGUoJ3dpZHRoJyksIDEwKSB8fCA5NjApO1xuICAgIH07XG5cbiAgICBzdGF0aWMgYXZhaWxhYmxlSGVpZ2h0ID0gZnVuY3Rpb24gKGhlaWdodCwgY29udGFpbmVyLCBtYXJnaW4pIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KDAsIEFwcFV0aWxzLnNhbml0aXplSGVpZ2h0KGhlaWdodCwgY29udGFpbmVyKSAtIG1hcmdpbi50b3AgLSBtYXJnaW4uYm90dG9tKTtcbiAgICB9O1xuXG4gICAgc3RhdGljIGF2YWlsYWJsZVdpZHRoID0gZnVuY3Rpb24gKHdpZHRoLCBjb250YWluZXIsIG1hcmdpbikge1xuICAgICAgICByZXR1cm4gTWF0aC5tYXgoMCwgQXBwVXRpbHMuc2FuaXRpemVXaWR0aCh3aWR0aCwgY29udGFpbmVyKSAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0KTtcbiAgICB9O1xuXG4gICAgLy9wbGFjZXMgdGV4dFN0cmluZyBpbiB0ZXh0T2JqLCBhZGRzIGFuIGVsbGlwc2lzIGlmIHRleHQgY2FuJ3QgZml0IGluIHdpZHRoXG4gICAgc3RhdGljIHBsYWNlVGV4dFdpdGhFbGxpcHNpcyh0ZXh0RDNPYmosIHRleHRTdHJpbmcsIHdpZHRoKSB7XG4gICAgICAgIHZhciB0ZXh0T2JqID0gdGV4dEQzT2JqLm5vZGUoKTtcbiAgICAgICAgdGV4dE9iai50ZXh0Q29udGVudCA9IHRleHRTdHJpbmc7XG5cbiAgICAgICAgdmFyIG1hcmdpbiA9IDA7XG4gICAgICAgIHZhciBlbGxpcHNpc0xlbmd0aCA9IDk7XG4gICAgICAgIC8vZWxsaXBzaXMgaXMgbmVlZGVkXG4gICAgICAgIGlmICh0ZXh0T2JqLmdldENvbXB1dGVkVGV4dExlbmd0aCgpID4gd2lkdGggKyBtYXJnaW4pIHtcbiAgICAgICAgICAgIGZvciAodmFyIHggPSB0ZXh0U3RyaW5nLmxlbmd0aCAtIDM7IHggPiAwOyB4IC09IDEpIHtcbiAgICAgICAgICAgICAgICBpZiAodGV4dE9iai5nZXRTdWJTdHJpbmdMZW5ndGgoMCwgeCkgKyBlbGxpcHNpc0xlbmd0aCA8PSB3aWR0aCArIG1hcmdpbikge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0T2JqLnRleHRDb250ZW50ID0gdGV4dFN0cmluZy5zdWJzdHJpbmcoMCwgeCkgKyBcIi4uLlwiO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0ZXh0T2JqLnRleHRDb250ZW50ID0gXCIuLi5cIjsgLy9jYW4ndCBwbGFjZSBhdCBhbGxcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBzdGF0aWMgcGxhY2VUZXh0V2l0aEVsbGlwc2lzQW5kVG9vbHRpcCh0ZXh0RDNPYmosIHRleHRTdHJpbmcsIHdpZHRoLCB0b29sdGlwKSB7XG4gICAgICAgIHZhciBlbGxpcHNpc1BsYWNlZCA9IEFwcFV0aWxzLnBsYWNlVGV4dFdpdGhFbGxpcHNpcyh0ZXh0RDNPYmosIHRleHRTdHJpbmcsIHdpZHRoKTtcbiAgICAgICAgaWYgKGVsbGlwc2lzUGxhY2VkICYmIHRvb2x0aXApIHtcbiAgICAgICAgICAgIHRleHREM09iai5vbihcIm1vdXNlb3ZlclwiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHRvb2x0aXAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAgICAgICAgIC5kdXJhdGlvbigyMDApXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgLjkpO1xuICAgICAgICAgICAgICAgIHRvb2x0aXAuaHRtbCh0ZXh0U3RyaW5nKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIChkMy5ldmVudC5wYWdlWCArIDUpICsgXCJweFwiKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0b3BcIiwgKGQzLmV2ZW50LnBhZ2VZIC0gMjgpICsgXCJweFwiKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0ZXh0RDNPYmoub24oXCJtb3VzZW91dFwiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHRvb2x0aXAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAgICAgICAgIC5kdXJhdGlvbig1MDApXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgMCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgc3RhdGljIGdldEZvbnRTaXplKGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQsIG51bGwpLmdldFByb3BlcnR5VmFsdWUoXCJmb250LXNpemVcIik7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldFRyYW5zbGF0aW9uKHRyYW5zZm9ybSkge1xuICAgICAgICAvLyBDcmVhdGUgYSBkdW1teSBnIGZvciBjYWxjdWxhdGlvbiBwdXJwb3NlcyBvbmx5LiBUaGlzIHdpbGwgbmV2ZXJcbiAgICAgICAgLy8gYmUgYXBwZW5kZWQgdG8gdGhlIERPTSBhbmQgd2lsbCBiZSBkaXNjYXJkZWQgb25jZSB0aGlzIGZ1bmN0aW9uXG4gICAgICAgIC8vIHJldHVybnMuXG4gICAgICAgIHZhciBnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJnXCIpO1xuXG4gICAgICAgIC8vIFNldCB0aGUgdHJhbnNmb3JtIGF0dHJpYnV0ZSB0byB0aGUgcHJvdmlkZWQgc3RyaW5nIHZhbHVlLlxuICAgICAgICBnLnNldEF0dHJpYnV0ZU5TKG51bGwsIFwidHJhbnNmb3JtXCIsIHRyYW5zZm9ybSk7XG5cbiAgICAgICAgLy8gY29uc29saWRhdGUgdGhlIFNWR1RyYW5zZm9ybUxpc3QgY29udGFpbmluZyBhbGwgdHJhbnNmb3JtYXRpb25zXG4gICAgICAgIC8vIHRvIGEgc2luZ2xlIFNWR1RyYW5zZm9ybSBvZiB0eXBlIFNWR19UUkFOU0ZPUk1fTUFUUklYIGFuZCBnZXRcbiAgICAgICAgLy8gaXRzIFNWR01hdHJpeC5cbiAgICAgICAgdmFyIG1hdHJpeCA9IGcudHJhbnNmb3JtLmJhc2VWYWwuY29uc29saWRhdGUoKS5tYXRyaXg7XG5cbiAgICAgICAgLy8gQXMgcGVyIGRlZmluaXRpb24gdmFsdWVzIGUgYW5kIGYgYXJlIHRoZSBvbmVzIGZvciB0aGUgdHJhbnNsYXRpb24uXG4gICAgICAgIHJldHVybiBbbWF0cml4LmUsIG1hdHJpeC5mXTtcbiAgICB9XG5cblxuICAgIHN0YXRpYyBjbG9zZXN0UG9pbnQocGF0aE5vZGUsIHBvaW50KSB7XG4gICAgICAgIHZhciBwYXRoTGVuZ3RoID0gcGF0aE5vZGUuZ2V0VG90YWxMZW5ndGgoKSxcbiAgICAgICAgICAgIHByZWNpc2lvbiA9IDgsXG4gICAgICAgICAgICBiZXN0LFxuICAgICAgICAgICAgYmVzdExlbmd0aCxcbiAgICAgICAgICAgIGJlc3REaXN0YW5jZSA9IEluZmluaXR5O1xuXG4gICAgICAgIC8vIGxpbmVhciBzY2FuIGZvciBjb2Fyc2UgYXBwcm94aW1hdGlvblxuICAgICAgICBmb3IgKHZhciBzY2FuLCBzY2FuTGVuZ3RoID0gMCwgc2NhbkRpc3RhbmNlOyBzY2FuTGVuZ3RoIDw9IHBhdGhMZW5ndGg7IHNjYW5MZW5ndGggKz0gcHJlY2lzaW9uKSB7XG4gICAgICAgICAgICBpZiAoKHNjYW5EaXN0YW5jZSA9IGRpc3RhbmNlMihzY2FuID0gcGF0aE5vZGUuZ2V0UG9pbnRBdExlbmd0aChzY2FuTGVuZ3RoKSkpIDwgYmVzdERpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgYmVzdCA9IHNjYW4sIGJlc3RMZW5ndGggPSBzY2FuTGVuZ3RoLCBiZXN0RGlzdGFuY2UgPSBzY2FuRGlzdGFuY2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBiaW5hcnkgc2VhcmNoIGZvciBwcmVjaXNlIGVzdGltYXRlXG4gICAgICAgIHByZWNpc2lvbiAvPSAyO1xuICAgICAgICB3aGlsZSAocHJlY2lzaW9uID4gMC41KSB7XG4gICAgICAgICAgICB2YXIgYmVmb3JlLFxuICAgICAgICAgICAgICAgIGFmdGVyLFxuICAgICAgICAgICAgICAgIGJlZm9yZUxlbmd0aCxcbiAgICAgICAgICAgICAgICBhZnRlckxlbmd0aCxcbiAgICAgICAgICAgICAgICBiZWZvcmVEaXN0YW5jZSxcbiAgICAgICAgICAgICAgICBhZnRlckRpc3RhbmNlO1xuICAgICAgICAgICAgaWYgKChiZWZvcmVMZW5ndGggPSBiZXN0TGVuZ3RoIC0gcHJlY2lzaW9uKSA+PSAwICYmIChiZWZvcmVEaXN0YW5jZSA9IGRpc3RhbmNlMihiZWZvcmUgPSBwYXRoTm9kZS5nZXRQb2ludEF0TGVuZ3RoKGJlZm9yZUxlbmd0aCkpKSA8IGJlc3REaXN0YW5jZSkge1xuICAgICAgICAgICAgICAgIGJlc3QgPSBiZWZvcmUsIGJlc3RMZW5ndGggPSBiZWZvcmVMZW5ndGgsIGJlc3REaXN0YW5jZSA9IGJlZm9yZURpc3RhbmNlO1xuICAgICAgICAgICAgfSBlbHNlIGlmICgoYWZ0ZXJMZW5ndGggPSBiZXN0TGVuZ3RoICsgcHJlY2lzaW9uKSA8PSBwYXRoTGVuZ3RoICYmIChhZnRlckRpc3RhbmNlID0gZGlzdGFuY2UyKGFmdGVyID0gcGF0aE5vZGUuZ2V0UG9pbnRBdExlbmd0aChhZnRlckxlbmd0aCkpKSA8IGJlc3REaXN0YW5jZSkge1xuICAgICAgICAgICAgICAgIGJlc3QgPSBhZnRlciwgYmVzdExlbmd0aCA9IGFmdGVyTGVuZ3RoLCBiZXN0RGlzdGFuY2UgPSBhZnRlckRpc3RhbmNlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwcmVjaXNpb24gLz0gMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGJlc3QgPSBbYmVzdC54LCBiZXN0LnldO1xuICAgICAgICBiZXN0LmRpc3RhbmNlID0gTWF0aC5zcXJ0KGJlc3REaXN0YW5jZSk7XG4gICAgICAgIHJldHVybiBiZXN0O1xuXG4gICAgICAgIGZ1bmN0aW9uIGRpc3RhbmNlMihwKSB7XG4gICAgICAgICAgICB2YXIgZHggPSBwLnggLSBwb2ludFswXSxcbiAgICAgICAgICAgICAgICBkeSA9IHAueSAtIHBvaW50WzFdO1xuICAgICAgICAgICAgcmV0dXJuIGR4ICogZHggKyBkeSAqIGR5O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGdyb3dsKG1lc3NhZ2UsIHR5cGU9J2luZm8nLCBwb3NpdGlvbj0ncmlnaHQnLCB0aW1lID0gMjAwMCl7XG4gICAgICAgIHZhciBodG1sID0gVGVtcGxhdGVzLmdldCgnZ3Jvd2wnLCB7bWVzc2FnZTptZXNzYWdlLCB0eXBlOnR5cGV9KVxuXG4gICAgICAgIHZhciBnID0gZDMuc2VsZWN0KCdib2R5Jykuc2VsZWN0T3JBcHBlbmQoJ2Rpdi5zZC1ncm93bC1saXN0LicrcG9zaXRpb24pLmFwcGVuZCgnZGl2JykuaHRtbChodG1sKTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgZy5yZW1vdmUoKTtcbiAgICAgICAgfSwgdGltZSlcbiAgICB9XG5cblxuICAgIHN0YXRpYyBjcmVhdGVFbGVtZW50KHRhZywgYXR0cmlicywgcGFyZW50KSB7XG4gICAgICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcblxuICAgICAgICBpZiAoYXR0cmlicykge1xuICAgICAgICAgICAgQXBwVXRpbHMuZGVlcEV4dGVuZChlbCwgYXR0cmlicyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhcmVudCkge1xuICAgICAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKGVsKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWw7XG4gICAgfTtcblxuICAgIHN0YXRpYyByZW1vdmVFbGVtZW50KGVsZW1lbnQpIHtcbiAgICAgICAgZWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xuICAgIH1cblxuICAgIHN0YXRpYyByZXBsYWNlVXJscyh0ZXh0KXtcbiAgICAgICAgaWYoIXRleHQpe1xuICAgICAgICAgICAgcmV0dXJuIHRleHQ7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHVybFJlZ2V4cCA9IC8oKGZ0cHxodHRwfGh0dHBzKTpcXC9cXC8oXFx3Kzp7MCwxfVxcdypAKT8oXFxTKykoOlswLTldKyk/KFxcL3xcXC8oW1xcdyMhOi4/Kz0mJUAhXFwtXFwvXSkpPykvXG5cbiAgICAgICAgcmV0dXJuIHRleHQucmVwbGFjZSh1cmxSZWdleHAsICc8YSBocmVmPVwiJDFcIiB0YXJnZXQ9XCJfYmxhbmtcIj4kMTwvYT4nKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZXNjYXBlSHRtbChodG1sKVxuICAgIHtcbiAgICAgICAgdmFyIHRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShodG1sKTtcbiAgICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBkaXYuYXBwZW5kQ2hpbGQodGV4dCk7XG4gICAgICAgIHJldHVybiBkaXYuaW5uZXJIVE1MO1xuICAgIH1cblxuICAgIHN0YXRpYyBkaXNwYXRjaEh0bWxFdmVudChlbGVtZW50LCBuYW1lKXtcbiAgICAgICAgaWYgKFwiY3JlYXRlRXZlbnRcIiBpbiBkb2N1bWVudCkge1xuICAgICAgICAgICAgdmFyIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiSFRNTEV2ZW50c1wiKTtcbiAgICAgICAgICAgIGV2dC5pbml0RXZlbnQobmFtZSwgZmFsc2UsIHRydWUpO1xuICAgICAgICAgICAgZWxlbWVudC5kaXNwYXRjaEV2ZW50KGV2dCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgZWxlbWVudC5maXJlRXZlbnQoXCJvblwiK25hbWUpO1xuICAgIH1cblxuICAgIHN0YXRpYyBkaXNwYXRjaEV2ZW50KG5hbWUsIGRhdGEpe1xuICAgICAgICB2YXIgZXZlbnQ7XG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIGV2ZW50ID0gbmV3ICBDdXN0b21FdmVudChuYW1lLHsgJ2RldGFpbCc6IGRhdGEgfSk7XG4gICAgICAgIH1jYXRjaCAoZSl7IC8vSUVcbiAgICAgICAgICAgIGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG4gICAgICAgICAgICBldmVudC5pbml0Q3VzdG9tRXZlbnQobmFtZSwgZmFsc2UsIGZhbHNlLCBkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0VmFsaWRhdGlvbk1lc3NhZ2UoZXJyb3Ipe1xuICAgICAgICBpZihVdGlscy5pc1N0cmluZyhlcnJvcikpe1xuICAgICAgICAgICAgZXJyb3IgPSB7bmFtZTogZXJyb3J9O1xuICAgICAgICB9XG4gICAgICAgIHZhciBrZXkgPSAndmFsaWRhdGlvbi4nICsgZXJyb3IubmFtZTtcbiAgICAgICAgcmV0dXJuIGkxOG4udChrZXksIGVycm9yLmRhdGEpO1xuICAgIH1cblxuICAgIHN0YXRpYyBoaWRlKHNlbGVjdGlvbil7XG4gICAgICAgIHNlbGVjdGlvbi5jbGFzc2VkKCdzZC1oaWRkZW4nLCB0cnVlKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2hvdyhzZWxlY3Rpb24sIHNob3c9dHJ1ZSl7XG4gICAgICAgIHNlbGVjdGlvbi5jbGFzc2VkKCdzZC1oaWRkZW4nLCAhc2hvdyk7XG4gICAgfVxuXG5cblxuICAgIHN0YXRpYyBpc0hpZGRlbihlbCwgZXhhY3QgPSB0cnVlKSB7XG4gICAgICAgIGlmKCFlbCl7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZihleGFjdCl7XG4gICAgICAgICAgICB2YXIgc3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbCk7XG4gICAgICAgICAgICByZXR1cm4gKHN0eWxlLmRpc3BsYXkgPT09ICdub25lJylcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKGVsLm9mZnNldFBhcmVudCA9PT0gbnVsbClcbiAgICB9XG59XG4iLCJpbXBvcnQgKiBhcyBkMyBmcm9tICcuLi9kMydcblxuLypiYXNlZCBvbjpcbiAqIGdpdGh1Yi5jb20vcGF0b3Jqay9kMy1jb250ZXh0LW1lbnUgKi9cblxuZXhwb3J0IGNsYXNzIENvbnRleHRNZW51IHtcbiAgICBvcGVuQ2FsbGJhY2s7XG4gICAgY2xvc2VDYWxsYmFjaztcblxuICAgIGNvbnN0cnVjdG9yKG1lbnUsIG9wdHMpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0cyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgc2VsZi5vcGVuQ2FsbGJhY2sgPSBvcHRzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb3B0cyA9IG9wdHMgfHwge307XG4gICAgICAgICAgICBzZWxmLm9wZW5DYWxsYmFjayA9IG9wdHMub25PcGVuO1xuICAgICAgICAgICAgc2VsZi5jbG9zZUNhbGxiYWNrID0gb3B0cy5vbkNsb3NlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY3JlYXRlIHRoZSBkaXYgZWxlbWVudCB0aGF0IHdpbGwgaG9sZCB0aGUgY29udGV4dCBtZW51XG4gICAgICAgIGQzLnNlbGVjdEFsbCgnLmQzLWNvbnRleHQtbWVudScpLmRhdGEoWzFdKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZDMtY29udGV4dC1tZW51Jyk7XG5cbiAgICAgICAgLy8gY2xvc2UgbWVudVxuICAgICAgICBkMy5zZWxlY3QoJ2JvZHknKS5vbignY2xpY2suZDMtY29udGV4dC1tZW51JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZDMuc2VsZWN0KCcuZDMtY29udGV4dC1tZW51Jykuc3R5bGUoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgaWYgKHNlbGYuY2xvc2VDYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIHNlbGYuY2xvc2VDYWxsYmFjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyB0aGlzIGdldHMgZXhlY3V0ZWQgd2hlbiBhIGNvbnRleHRtZW51IGV2ZW50IG9jY3Vyc1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGRhdGEsIGluZGV4KSB7XG4gICAgICAgICAgICB2YXIgZWxtID0gdGhpcztcblxuICAgICAgICAgICAgZDMuc2VsZWN0QWxsKCcuZDMtY29udGV4dC1tZW51JykuaHRtbCgnJyk7XG4gICAgICAgICAgICB2YXIgbGlzdCA9IGQzLnNlbGVjdEFsbCgnLmQzLWNvbnRleHQtbWVudScpXG4gICAgICAgICAgICAgICAgLm9uKCdjb250ZXh0bWVudScsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIGQzLnNlbGVjdCgnLmQzLWNvbnRleHQtbWVudScpLnN0eWxlKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgICAgICAgICAgZDMuZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgZDMuZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuYXBwZW5kKCd1bCcpO1xuICAgICAgICAgICAgbGlzdC5zZWxlY3RBbGwoJ2xpJykuZGF0YSh0eXBlb2YgbWVudSA9PT0gJ2Z1bmN0aW9uJyA/IG1lbnUoZGF0YSkgOiBtZW51KS5lbnRlcigpXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgnbGknKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXQgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgaWYgKGQuZGl2aWRlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0ICs9ICcgaXMtZGl2aWRlcic7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGQuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldCArPSAnIGlzLWRpc2FibGVkJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIWQuYWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXQgKz0gJyBpcy1oZWFkZXInO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuaHRtbChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZC5kaXZpZGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzxocj4nO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICghZC50aXRsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignTm8gdGl0bGUgYXR0cmlidXRlIHNldC4gQ2hlY2sgdGhlIHNwZWxsaW5nIG9mIHlvdXIgb3B0aW9ucy4nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHR5cGVvZiBkLnRpdGxlID09PSAnc3RyaW5nJykgPyBkLnRpdGxlIDogZC50aXRsZShkYXRhKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZC5kaXNhYmxlZCkgcmV0dXJuOyAvLyBkbyBub3RoaW5nIGlmIGRpc2FibGVkXG4gICAgICAgICAgICAgICAgICAgIGlmICghZC5hY3Rpb24pIHJldHVybjsgLy8gaGVhZGVycyBoYXZlIG5vIFwiYWN0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgZC5hY3Rpb24oZWxtLCBkYXRhLCBpbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIGQzLnNlbGVjdCgnLmQzLWNvbnRleHQtbWVudScpLnN0eWxlKCdkaXNwbGF5JywgJ25vbmUnKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5jbG9zZUNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNsb3NlQ2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyB0aGUgb3BlbkNhbGxiYWNrIGFsbG93cyBhbiBhY3Rpb24gdG8gZmlyZSBiZWZvcmUgdGhlIG1lbnUgaXMgZGlzcGxheWVkXG4gICAgICAgICAgICAvLyBhbiBleGFtcGxlIHVzYWdlIHdvdWxkIGJlIGNsb3NpbmcgYSB0b29sdGlwXG4gICAgICAgICAgICBpZiAoc2VsZi5vcGVuQ2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5vcGVuQ2FsbGJhY2soZGF0YSwgaW5kZXgpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBkaXNwbGF5IGNvbnRleHQgbWVudVxuICAgICAgICAgICAgZDMuc2VsZWN0KCcuZDMtY29udGV4dC1tZW51JylcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2xlZnQnLCAoZDMuZXZlbnQucGFnZVggLSAyKSArICdweCcpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCd0b3AnLCAoZDMuZXZlbnQucGFnZVkgLSAyKSArICdweCcpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG5cbiAgICAgICAgICAgIGQzLmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBkMy5ldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgc3RhdGljIGhpZGUoKSB7XG4gICAgICAgIGQzLnNlbGVjdCgnLmQzLWNvbnRleHQtbWVudScpLnN0eWxlKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7Q29udGV4dE1lbnV9IGZyb20gJy4vY29udGV4dC1tZW51J1xuaW1wb3J0IHtpMThufSBmcm9tIFwiLi4vaTE4bi9pMThuXCI7XG5cbmV4cG9ydCBjbGFzcyBFZGdlQ29udGV4dE1lbnUgZXh0ZW5kcyBDb250ZXh0TWVudSB7XG4gICAgdHJlZURlc2lnbmVyO1xuXG4gICAgY29uc3RydWN0b3IodHJlZURlc2lnbmVyKSB7XG4gICAgICAgIHZhciBtZW51ID0gZnVuY3Rpb24gKGQpIHtcblxuICAgICAgICAgICAgdmFyIG1lbnUgPSBbXTtcblxuICAgICAgICAgICAgbWVudS5wdXNoKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5lZGdlLmluamVjdERlY2lzaW9uTm9kZScpLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuaW5qZWN0RGVjaXNpb25Ob2RlKGQpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBtZW51LnB1c2goe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51LmVkZ2UuaW5qZWN0Q2hhbmNlTm9kZScpLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuaW5qZWN0Q2hhbmNlTm9kZShkKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgIHJldHVybiBtZW51O1xuICAgICAgICB9O1xuXG4gICAgICAgIHN1cGVyKG1lbnUpO1xuICAgICAgICB0aGlzLnRyZWVEZXNpZ25lciA9IHRyZWVEZXNpZ25lcjtcbiAgICB9XG59XG4iLCJpbXBvcnQge0NvbnRleHRNZW51fSBmcm9tICcuL2NvbnRleHQtbWVudSdcbmltcG9ydCB7ZG9tYWluIGFzIG1vZGVsfSBmcm9tICdzZC1tb2RlbCdcbmltcG9ydCAqIGFzIGQzIGZyb20gJy4uL2QzJ1xuaW1wb3J0IHtpMThufSBmcm9tIFwiLi4vaTE4bi9pMThuXCI7XG5cbmV4cG9ydCBjbGFzcyBNYWluQ29udGV4dE1lbnUgZXh0ZW5kcyBDb250ZXh0TWVudSB7XG4gICAgdHJlZURlc2lnbmVyO1xuXG4gICAgY29uc3RydWN0b3IodHJlZURlc2lnbmVyKSB7XG4gICAgICAgIHZhciBtb3VzZVBvc2l0aW9uID0gbnVsbDtcbiAgICAgICAgdmFyIG1lbnUgPSBmdW5jdGlvbiAoZCkge1xuXG4gICAgICAgICAgICB2YXIgbWVudSA9IFtdO1xuICAgICAgICAgICAgbWVudS5wdXNoKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5tYWluLmFkZERlY2lzaW9uTm9kZScpLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3Tm9kZSA9IG5ldyBtb2RlbC5EZWNpc2lvbk5vZGUobW91c2VQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5hZGROb2RlKG5ld05vZGUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBtZW51LnB1c2goe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm1haW4uYWRkQ2hhbmNlTm9kZScpLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3Tm9kZSA9IG5ldyBtb2RlbC5DaGFuY2VOb2RlKG1vdXNlUG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuYWRkTm9kZShuZXdOb2RlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbWVudS5wdXNoKHtkaXZpZGVyOiB0cnVlfSk7XG4gICAgICAgICAgICBtZW51LnB1c2goe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm1haW4uYWRkVGV4dCcpLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3VGV4dCA9IG5ldyBtb2RlbC5UZXh0KG1vdXNlUG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuYWRkVGV4dChuZXdUZXh0KTtcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG1lbnUucHVzaCh7ZGl2aWRlcjogdHJ1ZX0pO1xuICAgICAgICAgICAgbWVudS5wdXNoKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5tYWluLnBhc3RlJyksXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5wYXN0ZVRvTmV3TG9jYXRpb24obW91c2VQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogIXRyZWVEZXNpZ25lci5jb3BpZWROb2RlcyB8fCAhdHJlZURlc2lnbmVyLmNvcGllZE5vZGVzLmxlbmd0aFxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG1lbnUucHVzaCh7ZGl2aWRlcjogdHJ1ZX0pO1xuXG4gICAgICAgICAgICBtZW51LnB1c2goe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm1haW4uc2VsZWN0QWxsTm9kZXMnKSxcbiAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLnNlbGVjdEFsbE5vZGVzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gbWVudTtcbiAgICAgICAgfTtcblxuICAgICAgICBzdXBlcihtZW51LCB7b25PcGVuOiAoKSA9PiB7XG4gICAgICAgICAgICB0cmVlRGVzaWduZXIuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgIG1vdXNlUG9zaXRpb24gPSBuZXcgbW9kZWwuUG9pbnQoZDMubW91c2UodHJlZURlc2lnbmVyLnN2Zy5ub2RlKCkpKS5tb3ZlKHRyZWVEZXNpZ25lci5nZXRNYWluR3JvdXBUcmFuc2xhdGlvbih0cnVlKSk7XG5cbiAgICAgICAgfX0pO1xuICAgICAgICB0aGlzLnRyZWVEZXNpZ25lciA9IHRyZWVEZXNpZ25lcjtcbiAgICB9XG59XG4iLCJpbXBvcnQge0NvbnRleHRNZW51fSBmcm9tICcuL2NvbnRleHQtbWVudSdcbmltcG9ydCB7ZG9tYWluIGFzIG1vZGVsfSBmcm9tICdzZC1tb2RlbCdcbmltcG9ydCB7aTE4bn0gZnJvbSBcIi4uL2kxOG4vaTE4blwiO1xuXG5leHBvcnQgY2xhc3MgTm9kZUNvbnRleHRNZW51IGV4dGVuZHMgQ29udGV4dE1lbnUge1xuICAgIHRyZWVEZXNpZ25lcjtcblxuICAgIGNvbnN0cnVjdG9yKHRyZWVEZXNpZ25lciwgb3BlcmF0aW9uc0Zvck9iamVjdCkge1xuICAgICAgICB2YXIgbWVudSA9IGZ1bmN0aW9uIChkKSB7XG5cbiAgICAgICAgICAgIHZhciBjb3B5TWVudUl0ZW0gPSB7XG4gICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubm9kZS5jb3B5JyksXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5zZWxlY3ROb2RlKGQsICF0cmVlRGVzaWduZXIuaXNOb2RlU2VsZWN0ZWQoZCkpO1xuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuY29weVNlbGVjdGVkTm9kZXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIGN1dE1lbnVJdGVtID0ge1xuICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm5vZGUuY3V0JyksXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5zZWxlY3ROb2RlKGQsICF0cmVlRGVzaWduZXIuaXNOb2RlU2VsZWN0ZWQoZCkpO1xuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuY3V0U2VsZWN0ZWROb2RlcygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB2YXIgcGFzdGVNZW51SXRlbSA9IHtcbiAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5ub2RlLnBhc3RlJyksXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5wYXN0ZVRvTm9kZShkKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiBkLmZvbGRlZCB8fCAhdHJlZURlc2lnbmVyLmNvcGllZE5vZGVzIHx8ICF0cmVlRGVzaWduZXIuY29waWVkTm9kZXMubGVuZ3RoXG5cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB2YXIgZGVsZXRlTWVudUl0ZW0gPSB7XG4gICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubm9kZS5kZWxldGUnKSxcbiAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcblxuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuc2VsZWN0Tm9kZShkLCAhdHJlZURlc2lnbmVyLmlzTm9kZVNlbGVjdGVkKGQpKTtcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLnJlbW92ZVNlbGVjdGVkTm9kZXMoKTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHZhciBtZW51ID0gW107XG4gICAgICAgICAgICBpZiAoZC50eXBlID09IG1vZGVsLlRlcm1pbmFsTm9kZS4kVFlQRSkge1xuICAgICAgICAgICAgICAgIG1lbnUgPSBbY29weU1lbnVJdGVtLCBjdXRNZW51SXRlbSwgZGVsZXRlTWVudUl0ZW1dO1xuICAgICAgICAgICAgICAgIE5vZGVDb250ZXh0TWVudS5hZGROb2RlQ29udmVyc2lvbk9wdGlvbnMoZCwgbWVudSwgdHJlZURlc2lnbmVyKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWVudTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoIWQuZm9sZGVkKXtcbiAgICAgICAgICAgICAgICBtZW51LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5ub2RlLmFkZERlY2lzaW9uTm9kZScpLFxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5hZGREZWNpc2lvbk5vZGUoZClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIG1lbnUucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm5vZGUuYWRkQ2hhbmNlTm9kZScpLFxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5hZGRDaGFuY2VOb2RlKGQpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBtZW51LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5ub2RlLmFkZFRlcm1pbmFsTm9kZScpLFxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5hZGRUZXJtaW5hbE5vZGUoZClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIG1lbnUucHVzaCh7ZGl2aWRlcjogdHJ1ZX0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBtZW51LnB1c2goY29weU1lbnVJdGVtKTtcbiAgICAgICAgICAgIG1lbnUucHVzaChjdXRNZW51SXRlbSk7XG4gICAgICAgICAgICBtZW51LnB1c2gocGFzdGVNZW51SXRlbSk7XG4gICAgICAgICAgICBtZW51LnB1c2goZGVsZXRlTWVudUl0ZW0pO1xuXG4gICAgICAgICAgICBOb2RlQ29udGV4dE1lbnUuYWRkTm9kZUNvbnZlcnNpb25PcHRpb25zKGQsIG1lbnUsIHRyZWVEZXNpZ25lcik7XG4gICAgICAgICAgICBtZW51LnB1c2goe2RpdmlkZXI6IHRydWV9KTtcbiAgICAgICAgICAgIG1lbnUucHVzaCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubm9kZS5zZWxlY3RTdWJ0cmVlJyksXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5zZWxlY3RTdWJUcmVlKGQsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZighZC5mb2xkZWQpe1xuICAgICAgICAgICAgICAgIG1lbnUucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm5vZGUuZm9sZCcpLFxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5mb2xkU3VidHJlZShkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgbWVudS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubm9kZS51bmZvbGQnKSxcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuZm9sZFN1YnRyZWUoZCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKG9wZXJhdGlvbnNGb3JPYmplY3Qpe1xuICAgICAgICAgICAgICAgIHZhciBvcGVyYXRpb25zID0gb3BlcmF0aW9uc0Zvck9iamVjdChkKTtcbiAgICAgICAgICAgICAgICBpZihvcGVyYXRpb25zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBtZW51LnB1c2goe2RpdmlkZXI6IHRydWV9KTtcbiAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9ucy5mb3JFYWNoKG9wPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBtZW51LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm5vZGUuJytvcC5uYW1lKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLnBlcmZvcm1PcGVyYXRpb24oZCwgb3ApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICFvcC5jYW5QZXJmb3JtKGQpXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBtZW51O1xuICAgICAgICB9O1xuXG4gICAgICAgIHN1cGVyKG1lbnUpO1xuICAgICAgICB0aGlzLnRyZWVEZXNpZ25lciA9IHRyZWVEZXNpZ25lcjtcbiAgICB9XG5cbiAgICBzdGF0aWMgYWRkTm9kZUNvbnZlcnNpb25PcHRpb25zKGQsIG1lbnUsIHRyZWVEZXNpZ25lcil7XG4gICAgICAgIHZhciBjb252ZXJzaW9uT3B0aW9ucyA9IE5vZGVDb250ZXh0TWVudS5nZXROb2RlQ29udmVyc2lvbk9wdGlvbnMoZCwgdHJlZURlc2lnbmVyKTtcbiAgICAgICAgaWYoY29udmVyc2lvbk9wdGlvbnMubGVuZ3RoKXtcbiAgICAgICAgICAgIG1lbnUucHVzaCh7ZGl2aWRlcjogdHJ1ZX0pO1xuICAgICAgICAgICAgY29udmVyc2lvbk9wdGlvbnMuZm9yRWFjaChvPT5tZW51LnB1c2gobykpO1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0Tm9kZUNvbnZlcnNpb25PcHRpb25zKGQsIHRyZWVEZXNpZ25lcil7XG4gICAgICAgIHZhciBvcHRpb25zID0gW107XG4gICAgICAgIHZhciBhbGxBbGxvd2VkVHlwZXMgPSBbbW9kZWwuRGVjaXNpb25Ob2RlLiRUWVBFLCBtb2RlbC5DaGFuY2VOb2RlLiRUWVBFLCBtb2RlbC5UZXJtaW5hbE5vZGUuJFRZUEVdO1xuXG4gICAgICAgIGlmKCFkLmNoaWxkRWRnZXMubGVuZ3RoICYmIGQuJHBhcmVudCl7XG4gICAgICAgICAgICBhbGxBbGxvd2VkVHlwZXMuZmlsdGVyKHQ9PnQhPT1kLnR5cGUpLmZvckVhY2godHlwZT0+e1xuICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaChOb2RlQ29udGV4dE1lbnUuZ2V0Tm9kZUNvbnZlcnNpb25PcHRpb24odHlwZSwgdHJlZURlc2lnbmVyKSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgaWYoZCBpbnN0YW5jZW9mIG1vZGVsLkRlY2lzaW9uTm9kZSl7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5wdXNoKE5vZGVDb250ZXh0TWVudS5nZXROb2RlQ29udmVyc2lvbk9wdGlvbihtb2RlbC5DaGFuY2VOb2RlLiRUWVBFLCB0cmVlRGVzaWduZXIpKVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5wdXNoKE5vZGVDb250ZXh0TWVudS5nZXROb2RlQ29udmVyc2lvbk9wdGlvbihtb2RlbC5EZWNpc2lvbk5vZGUuJFRZUEUsIHRyZWVEZXNpZ25lcikpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9wdGlvbnM7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldE5vZGVDb252ZXJzaW9uT3B0aW9uKHR5cGVUb0NvbnZlcnRUbywgdHJlZURlc2lnbmVyKXtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm5vZGUuY29udmVydC4nK3R5cGVUb0NvbnZlcnRUbyksXG4gICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuY29udmVydE5vZGUoZCwgdHlwZVRvQ29udmVydFRvKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQge0NvbnRleHRNZW51fSBmcm9tICcuL2NvbnRleHQtbWVudSdcbmltcG9ydCB7aTE4bn0gZnJvbSBcIi4uL2kxOG4vaTE4blwiO1xuXG5leHBvcnQgY2xhc3MgVGV4dENvbnRleHRNZW51IGV4dGVuZHMgQ29udGV4dE1lbnUge1xuICAgIHRyZWVEZXNpZ25lcjtcblxuICAgIGNvbnN0cnVjdG9yKHRyZWVEZXNpZ25lcikge1xuICAgICAgICB2YXIgbWVudSA9IGZ1bmN0aW9uIChkKSB7XG5cblxuICAgICAgICAgICAgdmFyIGRlbGV0ZU1lbnVJdGVtID0ge1xuICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51LnRleHQuZGVsZXRlJyksXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLnNlbGVjdFRleHQoZCwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5yZW1vdmVTZWxlY3RlZFRleHRzKClcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB2YXIgbWVudSA9IFtdO1xuICAgICAgICAgICAgbWVudS5wdXNoKGRlbGV0ZU1lbnVJdGVtKTtcbiAgICAgICAgICAgIHJldHVybiBtZW51O1xuICAgICAgICB9O1xuXG4gICAgICAgIHN1cGVyKG1lbnUpO1xuICAgICAgICB0aGlzLnRyZWVEZXNpZ25lciA9IHRyZWVEZXNpZ25lcjtcbiAgICB9XG59XG4iLCJpbXBvcnQgKiBhcyBkMyBmcm9tICcuL2QzJ1xuXG5leHBvcnQgY2xhc3MgRDNFeHRlbnNpb25zIHtcblxuICAgIHN0YXRpYyBleHRlbmQoKSB7XG5cbiAgICAgICAgZDMuc2VsZWN0aW9uLnByb3RvdHlwZS5lbnRlci5wcm90b3R5cGUuaW5zZXJ0U2VsZWN0b3IgPVxuICAgICAgICAgICAgZDMuc2VsZWN0aW9uLnByb3RvdHlwZS5pbnNlcnRTZWxlY3RvciA9IGZ1bmN0aW9uIChzZWxlY3RvciwgYmVmb3JlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEQzRXh0ZW5zaW9ucy5pbnNlcnRTZWxlY3Rvcih0aGlzLCBzZWxlY3RvciwgYmVmb3JlKTtcbiAgICAgICAgICAgIH07XG5cblxuICAgICAgICBkMy5zZWxlY3Rpb24ucHJvdG90eXBlLmVudGVyLnByb3RvdHlwZS5hcHBlbmRTZWxlY3RvciA9XG4gICAgICAgICAgICBkMy5zZWxlY3Rpb24ucHJvdG90eXBlLmFwcGVuZFNlbGVjdG9yID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEQzRXh0ZW5zaW9ucy5hcHBlbmRTZWxlY3Rvcih0aGlzLCBzZWxlY3Rvcik7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIGQzLnNlbGVjdGlvbi5wcm90b3R5cGUuZW50ZXIucHJvdG90eXBlLnNlbGVjdE9yQXBwZW5kID1cbiAgICAgICAgICAgIGQzLnNlbGVjdGlvbi5wcm90b3R5cGUuc2VsZWN0T3JBcHBlbmQgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gRDNFeHRlbnNpb25zLnNlbGVjdE9yQXBwZW5kKHRoaXMsIHNlbGVjdG9yKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgZDMuc2VsZWN0aW9uLnByb3RvdHlwZS5lbnRlci5wcm90b3R5cGUuc2VsZWN0T3JJbnNlcnQgPVxuICAgICAgICAgICAgZDMuc2VsZWN0aW9uLnByb3RvdHlwZS5zZWxlY3RPckluc2VydCA9IGZ1bmN0aW9uIChzZWxlY3RvciwgYmVmb3JlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEQzRXh0ZW5zaW9ucy5zZWxlY3RPckluc2VydCh0aGlzLCBzZWxlY3RvciwgYmVmb3JlKTtcbiAgICAgICAgICAgIH07XG5cblxuICAgIH1cblxuICAgIHN0YXRpYyBpbnNlcnRPckFwcGVuZFNlbGVjdG9yKHBhcmVudCwgc2VsZWN0b3IsIG9wZXJhdGlvbiwgYmVmb3JlKSB7XG5cbiAgICAgICAgdmFyIHNlbGVjdG9yUGFydHMgPSBzZWxlY3Rvci5zcGxpdCgvKFtcXC5cXCNdKS8pO1xuICAgICAgICB2YXIgZWxlbWVudCA9IHBhcmVudFtvcGVyYXRpb25dKHNlbGVjdG9yUGFydHMuc2hpZnQoKSwgYmVmb3JlKTsvL1wiOmZpcnN0LWNoaWxkXCJcblxuICAgICAgICB3aGlsZSAoc2VsZWN0b3JQYXJ0cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICB2YXIgc2VsZWN0b3JNb2RpZmllciA9IHNlbGVjdG9yUGFydHMuc2hpZnQoKTtcbiAgICAgICAgICAgIHZhciBzZWxlY3Rvckl0ZW0gPSBzZWxlY3RvclBhcnRzLnNoaWZ0KCk7XG4gICAgICAgICAgICBpZiAoc2VsZWN0b3JNb2RpZmllciA9PT0gXCIuXCIpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5jbGFzc2VkKHNlbGVjdG9ySXRlbSwgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNlbGVjdG9yTW9kaWZpZXIgPT09IFwiI1wiKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQuYXR0cignaWQnLCBzZWxlY3Rvckl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH1cblxuICAgIHN0YXRpYyBpbnNlcnRTZWxlY3RvcihwYXJlbnQsIHNlbGVjdG9yLCBiZWZvcmUpIHtcbiAgICAgICAgcmV0dXJuIEQzRXh0ZW5zaW9ucy5pbnNlcnRPckFwcGVuZFNlbGVjdG9yKHBhcmVudCwgc2VsZWN0b3IsIFwiaW5zZXJ0XCIsIGJlZm9yZSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGFwcGVuZFNlbGVjdG9yKHBhcmVudCwgc2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIEQzRXh0ZW5zaW9ucy5pbnNlcnRPckFwcGVuZFNlbGVjdG9yKHBhcmVudCwgc2VsZWN0b3IsIFwiYXBwZW5kXCIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBzZWxlY3RPckFwcGVuZChwYXJlbnQsIHNlbGVjdG9yLCBlbGVtZW50KSB7XG4gICAgICAgIHZhciBzZWxlY3Rpb24gPSBwYXJlbnQuc2VsZWN0KHNlbGVjdG9yKTtcbiAgICAgICAgaWYgKHNlbGVjdGlvbi5lbXB0eSgpKSB7XG4gICAgICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXJlbnQuYXBwZW5kKGVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIEQzRXh0ZW5zaW9ucy5hcHBlbmRTZWxlY3RvcihwYXJlbnQsIHNlbGVjdG9yKTtcblxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzZWxlY3Rpb247XG4gICAgfTtcblxuICAgIHN0YXRpYyBzZWxlY3RPckluc2VydChwYXJlbnQsIHNlbGVjdG9yLCBiZWZvcmUpIHtcbiAgICAgICAgdmFyIHNlbGVjdGlvbiA9IHBhcmVudC5zZWxlY3Qoc2VsZWN0b3IpO1xuICAgICAgICBpZiAoc2VsZWN0aW9uLmVtcHR5KCkpIHtcbiAgICAgICAgICAgIHJldHVybiBEM0V4dGVuc2lvbnMuaW5zZXJ0U2VsZWN0b3IocGFyZW50LCBzZWxlY3RvciwgYmVmb3JlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2VsZWN0aW9uO1xuICAgIH07XG59XG4iLCJleHBvcnQgKiBmcm9tICdkMy1kaXNwYXRjaCc7XG5leHBvcnQgKiBmcm9tICdkMy1zY2FsZSc7XG5leHBvcnQgKiBmcm9tICdkMy1zZWxlY3Rpb24nO1xuZXhwb3J0ICogZnJvbSAnZDMtc2hhcGUnXG5leHBvcnQgKiBmcm9tICdkMy1kcmFnJztcbmV4cG9ydCAqIGZyb20gJ2QzLWJydXNoJ1xuZXhwb3J0ICogZnJvbSAnZDMtYXJyYXknXG5leHBvcnQgKiBmcm9tICdkMy1oaWVyYXJjaHknXG5leHBvcnQgKiBmcm9tICdkMy10aW1lLWZvcm1hdCdcbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgICBcImNvbnRleHRNZW51XCI6e1xuICAgICAgICBcIm1haW5cIjp7XG4gICAgICAgICAgICBcImFkZERlY2lzaW9uTm9kZVwiOiBcIkVudHNjaGVpZHVuZ3Nrbm90ZW4gaGluenVmw7xnZW5cIixcbiAgICAgICAgICAgIFwiYWRkQ2hhbmNlTm9kZVwiOiBcIlp1ZmFsbCBLbm90ZW4gaGluenVmw7xnZW5cIixcbiAgICAgICAgICAgIFwiYWRkVGV4dFwiOiBcIlRleHQgaGluenVmw7xnZW4gXCIsXG4gICAgICAgICAgICBcInBhc3RlXCI6IFwiRWluZsO8Z2VuXCIsXG4gICAgICAgICAgICBcInNlbGVjdEFsbE5vZGVzXCI6IFwiQWxsZSBLbm90ZW4gYXVzd8OkaGxlblwiXG4gICAgICAgIH0sXG4gICAgICAgIFwibm9kZVwiOntcbiAgICAgICAgICAgIFwiY29weVwiOiBcIktvcGllcmVuXCIsXG4gICAgICAgICAgICBcImN1dFwiOiBcIkF1c3NjaG5laWRlblwiLFxuICAgICAgICAgICAgXCJwYXN0ZVwiOiBcIkVpbmbDvGdlblwiLFxuICAgICAgICAgICAgXCJkZWxldGVcIjogXCJMw7ZzY2hlblwiLFxuICAgICAgICAgICAgXCJhZGREZWNpc2lvbk5vZGVcIjogXCJFbnRzY2hlaWR1bmdza25vdGVuIGhpbnp1ZsO8Z2VuXCIsXG4gICAgICAgICAgICBcImFkZENoYW5jZU5vZGVcIjogXCJadWZhbGwgS25vdGVuIGhpbnp1ZsO8Z2VuXCIsXG4gICAgICAgICAgICBcImFkZFRlcm1pbmFsTm9kZVwiOiBcIkVuZGtub3R0ZW4gaGluenVmw7xnZW5cIixcbiAgICAgICAgICAgIFwiY29udmVydFwiOntcbiAgICAgICAgICAgICAgICBcImRlY2lzaW9uXCI6IFwiQWxzIEVudHNjaGVpZHVuZ3Nrbm90ZW5cIixcbiAgICAgICAgICAgICAgICBcImNoYW5jZVwiOiBcIkFscyBadWZhbGwgS25vdGVuXCIsXG4gICAgICAgICAgICAgICAgXCJ0ZXJtaW5hbFwiOiBcIkFscyBFbmRrbm90ZW5cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwic2VsZWN0U3VidHJlZVwiOiBcIlRlaWxiYXVtIHfDpGhsZW5cIixcbiAgICAgICAgICAgIFwiZmxpcFN1YnRyZWVcIjogXCJUZWlsYmF1bSB1bWRyZWhlblwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiZWRnZVwiOntcbiAgICAgICAgICAgIFwiaW5qZWN0RGVjaXNpb25Ob2RlXCI6IFwiRW50c2NoZWlkdW5nc2tub3RlbiBJbmppemllcmVuXCIsXG4gICAgICAgICAgICBcImluamVjdENoYW5jZU5vZGVcIjogXCJadWZhbGwgS25vdGVuIEluaml6aWVyZW5cIlxuICAgICAgICB9LFxuICAgICAgICBcInRleHRcIjp7XG4gICAgICAgICAgICBcImRlbGV0ZVwiOiBcIkzDtnNjaGVuXCJcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXCJ2YWxpZGF0aW9uXCI6e1xuICAgICAgICBcImluY29tcGxldGVQYXRoXCI6IFwiUGZhZCwgZGVyIG5pY2h0IG1pdCBkZW0gRW5ka25vdGVuIGVuZGV0XCIsXG4gICAgICAgIFwicHJvYmFiaWxpdHlEb05vdFN1bVVwVG8xXCI6IFwiRGllIFN1bW1lIGRlciBXYWhyc2NoZWlubGljaGtlaXRlbiBpc3QgbmljaHQgZ2xlaWNoIDFcIixcbiAgICAgICAgXCJpbnZhbGlkUHJvYmFiaWxpdHlcIjogXCJVbmfDvGx0aWdlIFdhaHJzY2hlaW5saWNoa2VpdCBpbSBad2VpZyAje3tudW1iZXJ9fVwiLFxuICAgICAgICBcImludmFsaWRQYXlvZmZcIjogXCJVbmfDvGx0aWdlIEF1c3phaGx1bmcgaW4gWndlaWcgI3t7bnVtYmVyfX1cIlxuICAgIH0sXG4gICAgXCJncm93bFwiOntcbiAgICAgICAgXCJicnVzaERpc2FibGVkXCI6IFwiQXVzd2FobGLDvHJzdGUgZGVha3RpdmllcnRcIixcbiAgICAgICAgXCJicnVzaEVuYWJsZWRcIjogXCJBdXN3YWhsYsO8cnN0ZSBha3RpdmllcnRcIlxuICAgIH0sXG4gICAgXCJ0b29sdGlwXCI6e1xuICAgICAgICBcIm5vZGVcIjp7XG4gICAgICAgICAgICBcInBheW9mZlwiOiB7XG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiQXVzemFobHVuZyB7e251bWJlcn19XCIsXG4gICAgICAgICAgICAgICAgXCJuYW1lZFwiOiBcInt7bmFtZX19XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImFnZ3JlZ2F0ZWRQYXlvZmZcIjoge1xuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIkFnZ3JlZ2llcnRlIEF1c3phaGx1bmcge3tudW1iZXJ9fVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJBZ2dyZWdpZXJ0ZSB7e25hbWV9fVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJwcm9iYWJpbGl0eVRvRW50ZXJcIjogXCJXYWhyc2NoZWlubGljaGtlaXRcIlxuICAgICAgICB9LFxuICAgICAgICBcImVkZ2VcIjp7XG4gICAgICAgICAgICBcInBheW9mZlwiOiB7XG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiQXVzemFobHVuZyB7e251bWJlcn19OiB7e3ZhbHVlfX1cIixcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwie3tuYW1lfX06IHt7dmFsdWV9fVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJwcm9iYWJpbGl0eVwiOiBcIldhaHJzY2hlaW5saWNoa2VpdDoge3t2YWx1ZX19XCJcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgICBcImNvbnRleHRNZW51XCI6e1xuICAgICAgICBcIm1haW5cIjp7XG4gICAgICAgICAgICBcImFkZERlY2lzaW9uTm9kZVwiOiBcIkFkZCBEZWNpc2lvbiBOb2RlXCIsXG4gICAgICAgICAgICBcImFkZENoYW5jZU5vZGVcIjogXCJBZGQgQ2hhbmNlIE5vZGVcIixcbiAgICAgICAgICAgIFwiYWRkVGV4dFwiOiBcIkFkZCBUZXh0XCIsXG4gICAgICAgICAgICBcInBhc3RlXCI6IFwiUGFzdGVcIixcbiAgICAgICAgICAgIFwic2VsZWN0QWxsTm9kZXNcIjogXCJTZWxlY3QgYWxsIG5vZGVzXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJub2RlXCI6e1xuICAgICAgICAgICAgXCJjb3B5XCI6IFwiQ29weVwiLFxuICAgICAgICAgICAgXCJjdXRcIjogXCJDdXRcIixcbiAgICAgICAgICAgIFwicGFzdGVcIjogXCJQYXN0ZVwiLFxuICAgICAgICAgICAgXCJkZWxldGVcIjogXCJEZWxldGVcIixcbiAgICAgICAgICAgIFwiYWRkRGVjaXNpb25Ob2RlXCI6IFwiQWRkIERlY2lzaW9uIE5vZGVcIixcbiAgICAgICAgICAgIFwiYWRkQ2hhbmNlTm9kZVwiOiBcIkFkZCBDaGFuY2UgTm9kZVwiLFxuICAgICAgICAgICAgXCJhZGRUZXJtaW5hbE5vZGVcIjogXCJBZGQgVGVybWluYWwgTm9kZVwiLFxuICAgICAgICAgICAgXCJjb252ZXJ0XCI6e1xuICAgICAgICAgICAgICAgIFwiZGVjaXNpb25cIjogXCJBcyBEZWNpc2lvbiBOb2RlXCIsXG4gICAgICAgICAgICAgICAgXCJjaGFuY2VcIjogXCJBcyBDaGFuY2UgTm9kZVwiLFxuICAgICAgICAgICAgICAgIFwidGVybWluYWxcIjogXCJBcyBUZXJtaW5hbCBOb2RlXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInNlbGVjdFN1YnRyZWVcIjogXCJTZWxlY3Qgc3VidHJlZVwiLFxuICAgICAgICAgICAgXCJmb2xkXCI6IFwiRm9sZCBzdWJ0cmVlXCIsXG4gICAgICAgICAgICBcInVuZm9sZFwiOiBcIlVuZm9sZCBzdWJ0cmVlXCIsXG4gICAgICAgICAgICBcImZsaXBTdWJ0cmVlXCI6IFwiRmxpcCBzdWJ0cmVlXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJlZGdlXCI6e1xuICAgICAgICAgICAgXCJpbmplY3REZWNpc2lvbk5vZGVcIjogXCJJbmplY3QgRGVjaXNpb24gTm9kZVwiLFxuICAgICAgICAgICAgXCJpbmplY3RDaGFuY2VOb2RlXCI6IFwiSW5qZWN0IENoYW5jZSBOb2RlXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJ0ZXh0XCI6e1xuICAgICAgICAgICAgXCJkZWxldGVcIjogXCJEZWxldGVcIlxuICAgICAgICB9XG4gICAgfSxcbiAgICBcInZhbGlkYXRpb25cIjp7XG4gICAgICAgIFwiaW5jb21wbGV0ZVBhdGhcIjogXCJQYXRoIG5vdCBlbmRpbmcgd2l0aCB0ZXJtaW5hbCBub2RlXCIsXG4gICAgICAgIFwicHJvYmFiaWxpdHlEb05vdFN1bVVwVG8xXCI6IFwiUHJvYmFiaWxpdGllcyBkbyBub3Qgc3VtIHVwIHRvIDFcIixcbiAgICAgICAgXCJpbnZhbGlkUHJvYmFiaWxpdHlcIjogXCJJbnZhbGlkIHByb2JhYmlsaXR5IGluIGVkZ2UgI3t7bnVtYmVyfX1cIixcbiAgICAgICAgXCJpbnZhbGlkUGF5b2ZmXCI6IFwiSW52YWxpZCBwYXlvZmYgaW4gZWRnZSAje3tudW1iZXJ9fVwiXG4gICAgfSxcbiAgICBcImdyb3dsXCI6e1xuICAgICAgICBcImJydXNoRGlzYWJsZWRcIjogXCJTZWxlY3Rpb24gYnJ1c2ggZGlzYWJsZWRcIixcbiAgICAgICAgXCJicnVzaEVuYWJsZWRcIjogXCJTZWxlY3Rpb24gYnJ1c2ggZW5hYmxlZFwiXG4gICAgfSxcbiAgICBcInRvb2x0aXBcIjp7XG4gICAgICAgIFwibm9kZVwiOntcbiAgICAgICAgICAgIFwicGF5b2ZmXCI6IHtcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJQYXlvZmYge3tudW1iZXJ9fVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJ7e25hbWV9fVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJhZ2dyZWdhdGVkUGF5b2ZmXCI6IHtcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJBZ2dyZWdhdGVkIFBheW9mZiB7e251bWJlcn19XCIsXG4gICAgICAgICAgICAgICAgXCJuYW1lZFwiOiBcIkFnZ3JlZ2F0ZWQge3tuYW1lfX1cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwicHJvYmFiaWxpdHlUb0VudGVyXCI6IFwiUHJvYmFiaWxpdHkgdG8gZW50ZXJcIlxuICAgICAgICB9LFxuICAgICAgICBcImVkZ2VcIjp7XG4gICAgICAgICAgICBcInBheW9mZlwiOiB7XG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiUGF5b2ZmIHt7bnVtYmVyfX06IHt7dmFsdWV9fVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJ7e25hbWV9fToge3t2YWx1ZX19XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInByb2JhYmlsaXR5XCI6IFwiUHJvYmFiaWxpdHk6IHt7dmFsdWV9fVwiXG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cz17XG4gICAgXCJjb250ZXh0TWVudVwiOntcbiAgICAgICAgXCJtYWluXCI6e1xuICAgICAgICAgICAgXCJhZGREZWNpc2lvbk5vZGVcIjogXCJBam91dGVyIG5vdWQgZGUgZMOpY2lzaW9uXCIsXG4gICAgICAgICAgICBcImFkZENoYW5jZU5vZGVcIjogXCJBam91dGVyIG5vdWQgYWzDqWF0b2lyZVwiLFxuICAgICAgICAgICAgXCJhZGRUZXh0XCI6IFwiQWpvdXRlciBkdSB0ZXh0ZVwiLFxuICAgICAgICAgICAgXCJwYXN0ZVwiOiBcIkNvbGxlclwiLFxuICAgICAgICAgICAgXCJzZWxlY3RBbGxOb2Rlc1wiOiBcIlPDqWxlY3Rpb25uZXIgdG91cyBsZXMgbm91ZHNcIlxuICAgICAgICB9LFxuICAgICAgICBcIm5vZGVcIjp7XG4gICAgICAgICAgICBcImNvcHlcIjogXCJDb3BpZVwiLFxuICAgICAgICAgICAgXCJjdXRcIjogXCJDb3VwZXJcIixcbiAgICAgICAgICAgIFwicGFzdGVcIjogXCJDb2xsZXJcIixcbiAgICAgICAgICAgIFwiZGVsZXRlXCI6IFwiRWZmYWNlclwiLFxuICAgICAgICAgICAgXCJhZGREZWNpc2lvbk5vZGVcIjogXCJBam91dGVyIG5vdWQgZGUgZMOpY2lzaW9uXCIsXG4gICAgICAgICAgICBcImFkZENoYW5jZU5vZGVcIjogXCJBam91dGVyIG5vdWQgYWzDqWF0b2lyZVwiLFxuICAgICAgICAgICAgXCJhZGRUZXJtaW5hbE5vZGVcIjogXCJBam91dGVyIHVuIG5vZXVkIHRlcm1pbmFsXCIsXG4gICAgICAgICAgICBcImNvbnZlcnRcIjp7XG4gICAgICAgICAgICAgICAgXCJkZWNpc2lvblwiOiBcIkNvbW1lIG5vdWQgZGUgZMOpY2lzaW9uXCIsXG4gICAgICAgICAgICAgICAgXCJjaGFuY2VcIjogXCJDb21tZSBub3VkIGFsw6lhdG9pcmVcIixcbiAgICAgICAgICAgICAgICBcInRlcm1pbmFsXCI6IFwiQ29tbWUgdW4gbm9ldWQgdGVybWluYWxcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwic2VsZWN0U3VidHJlZVwiOiBcIlPDqWxlY3Rpb25uZXIgdW5lIHNvdXMtYXJib3Jlc2NlbmNlXCIsXG4gICAgICAgICAgICBcImZsaXBTdWJ0cmVlXCI6IFwiQmFzY3VsZXIgc291cy1hcmJyZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiZWRnZVwiOntcbiAgICAgICAgICAgIFwiaW5qZWN0RGVjaXNpb25Ob2RlXCI6IFwiSW5qZWN0ZXIgdW4gbm9ldWQgZGUgZMOpY2lzaW9uXCIsXG4gICAgICAgICAgICBcImluamVjdENoYW5jZU5vZGVcIjogXCJJbmplY3RlciB1biBub2V1ZCBkZSBjaGFuY2VcIlxuICAgICAgICB9LFxuICAgICAgICBcInRleHRcIjp7XG4gICAgICAgICAgICBcImRlbGV0ZVwiOiBcIkVmZmFjZXJcIlxuICAgICAgICB9XG4gICAgfSxcbiAgICBcInZhbGlkYXRpb25cIjp7XG4gICAgICAgIFwiaW5jb21wbGV0ZVBhdGhcIjogXCJQYXJjb3VycyBub24gdGVybWluw6kgcGFyIG5vZXVkIHRlcm1pbmFsXCIsXG4gICAgICAgIFwicHJvYmFiaWxpdHlEb05vdFN1bVVwVG8xXCI6IFwiTGEgc29tbWUgZGVzIHByb2JhYmlsaXTDqXMgbidlc3QgcGFzIDEgb3UgcGx1c1wiLFxuICAgICAgICBcImludmFsaWRQcm9iYWJpbGl0eVwiOiBcIlByb2JhYmlsaXTDqSBpbnZhbGlkZSAtIGxlIGJvcmQgI3t7bnVtYmVyfX1cIixcbiAgICAgICAgXCJpbnZhbGlkUGF5b2ZmXCI6IFwiQXZhbnRhZ2UgaW52YWxpZGUgLSBsZSBib3JkICN7e251bWJlcn19XCJcbiAgICB9LFxuICAgIFwiZ3Jvd2xcIjp7XG4gICAgICAgIFwiYnJ1c2hEaXNhYmxlZFwiOiBcIkJyb3NzZSBkZSBzw6lsZWN0aW9uIGTDqXNhY3RpdsOpZVwiLFxuICAgICAgICBcImJydXNoRW5hYmxlZFwiOiBcIkJyb3NzZSBkZSBzw6lsZWN0aW9uIGFjdGl2w6llXCJcbiAgICB9LFxuICAgIFwidG9vbHRpcFwiOntcbiAgICAgICAgXCJub2RlXCI6e1xuICAgICAgICAgICAgXCJwYXlvZmZcIjoge1xuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIkF2YW50YWdlIHt7bnVtYmVyfX1cIixcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwie3tuYW1lfX1cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiYWdncmVnYXRlZFBheW9mZlwiOiB7XG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiQXZhbnRhZ2UgYWdyw6lnw6kge3tudW1iZXJ9fVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJBZ3LDqWfDqSAge3tuYW1lfX1cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwicHJvYmFiaWxpdHlUb0VudGVyXCI6IFwiUHJvYmFiaWxpdMOpIGQnZW50csOpZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiZWRnZVwiOntcbiAgICAgICAgICAgIFwicGF5b2ZmXCI6IHtcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJBdmFudGFnZSB7e251bWJlcn19OiB7e3ZhbHVlfX1cIixcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwie3tuYW1lfX06IHt7dmFsdWV9fVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJwcm9iYWJpbGl0eVwiOiBcIlByb2JhYmlsaXTDqToge3t2YWx1ZX19XCJcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBpMThuZXh0IGZyb20gJ2kxOG5leHQnO1xuaW1wb3J0ICogYXMgZW4gZnJvbSAnLi9lbi5qc29uJ1xuaW1wb3J0ICogYXMgcGwgZnJvbSAnLi9wbC5qc29uJ1xuaW1wb3J0ICogYXMgaXQgZnJvbSAnLi9pdC5qc29uJ1xuaW1wb3J0ICogYXMgZGUgZnJvbSAnLi9kZS5qc29uJ1xuaW1wb3J0ICogYXMgZnIgZnJvbSAnLi9mci5qc29uJ1xuXG5leHBvcnQgY2xhc3MgaTE4bntcblxuICAgIHN0YXRpYyAkaW5zdGFuY2U7XG4gICAgc3RhdGljIGxhbmd1YWdlO1xuXG4gICAgc3RhdGljIGluaXQobG5nKXtcbiAgICAgICAgaTE4bi5sYW5ndWFnZSA9IGxuZztcbiAgICAgICAgbGV0IHJlc291cmNlcyA9IHtcbiAgICAgICAgICAgIGVuOiB7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRpb246IGVuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGw6IHtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGlvbjogcGxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpdDoge1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0aW9uOiBpdFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlOiB7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRpb246IGRlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnI6IHtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGlvbjogZnJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgaTE4bi4kaW5zdGFuY2UgPSBpMThuZXh0LmNyZWF0ZUluc3RhbmNlKHtcbiAgICAgICAgICAgIGxuZzogbG5nLFxuICAgICAgICAgICAgZmFsbGJhY2tMbmc6ICdlbicsXG4gICAgICAgICAgICByZXNvdXJjZXM6IHJlc291cmNlc1xuICAgICAgICB9LCAoZXJyLCB0KSA9PiB7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXRpYyB0KGtleSwgb3B0KXtcbiAgICAgICAgcmV0dXJuIGkxOG4uJGluc3RhbmNlLnQoa2V5LCBvcHQpXG4gICAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHM9e1xuICAgIFwiY29udGV4dE1lbnVcIjp7XG4gICAgICAgIFwibWFpblwiOntcbiAgICAgICAgICAgIFwiYWRkRGVjaXNpb25Ob2RlXCI6IFwiQWdnaXVuZ2kgdW4gbm9kbyBkaSBkZWNpc2lvbmVcIixcbiAgICAgICAgICAgIFwiYWRkQ2hhbmNlTm9kZVwiOiBcIkFnZ2l1bmdpIHVuIG5vZG8gb3Bwb3J0dW5pdMOgXCIsXG4gICAgICAgICAgICBcImFkZFRleHRcIjogXCJBZ2dpdW5naSB0ZXN0b1wiLFxuICAgICAgICAgICAgXCJwYXN0ZVwiOiBcIkluY29sbGFcIixcbiAgICAgICAgICAgIFwic2VsZWN0QWxsTm9kZXNcIjogXCJTZWxlemlvbmEgdHV0dGkgaSBub2RpXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJub2RlXCI6e1xuICAgICAgICAgICAgXCJjb3B5XCI6IFwiQ29waWFcIixcbiAgICAgICAgICAgIFwiY3V0XCI6IFwiVGFnbGlhXCIsXG4gICAgICAgICAgICBcInBhc3RlXCI6IFwiSW5jb2xsYVwiLFxuICAgICAgICAgICAgXCJkZWxldGVcIjogXCJDYW5jZWxsYVwiLFxuICAgICAgICAgICAgXCJhZGREZWNpc2lvbk5vZGVcIjogXCJBZ2dpdW5naSB1biBub2RvIGRpIGRlY2lzaW9uZVwiLFxuICAgICAgICAgICAgXCJhZGRDaGFuY2VOb2RlXCI6IFwiQWdnaXVuZ2kgdW4gbm9kbyBvcHBvcnR1bml0w6BcIixcbiAgICAgICAgICAgIFwiYWRkVGVybWluYWxOb2RlXCI6IFwiQWdnaXVuZ2kgdW4gbm9kbyB0ZXJtaW5hbGVcIixcbiAgICAgICAgICAgIFwiY29udmVydFwiOntcbiAgICAgICAgICAgICAgICBcImRlY2lzaW9uXCI6IFwiQ29tZSBEZWNpc2lvbiBOb2RlXCIsXG4gICAgICAgICAgICAgICAgXCJjaGFuY2VcIjogXCJDb21lIENoYW5jZSBOb2RlXCIsXG4gICAgICAgICAgICAgICAgXCJ0ZXJtaW5hbFwiOiBcIkNvbWUgVGVybWluYWwgTm9kZVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJzZWxlY3RTdWJ0cmVlXCI6IFwiU2VsZXppb25hIFNvdHRvLWFsYmVyb1wiLFxuICAgICAgICAgICAgXCJmbGlwU3VidHJlZVwiOiBcIlJpYmFsdGEgc290dG8tYWxiZXJvXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJlZGdlXCI6e1xuICAgICAgICAgICAgXCJpbmplY3REZWNpc2lvbk5vZGVcIjogXCJJbmlldHRhIG5vZG8gZGkgZGVjaXNpb25lXCIsXG4gICAgICAgICAgICBcImluamVjdENoYW5jZU5vZGVcIjogXCJJbmlldHRhIG5vZG8gb3Bwb3J0dW5pdMOgXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJ0ZXh0XCI6e1xuICAgICAgICAgICAgXCJkZWxldGVcIjogXCJDYW5jZWxsYVwiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwidmFsaWRhdGlvblwiOntcbiAgICAgICAgXCJpbmNvbXBsZXRlUGF0aFwiOiBcIlBlcmNvcnNvIHNlbnphIG5vZG8gdGVybWluYWxlXCIsXG4gICAgICAgIFwicHJvYmFiaWxpdHlEb05vdFN1bVVwVG8xXCI6IFwiTGEgc29tbWEgZGVsbGUgcHJvYmFiaWxpdMOgIMOoIGRpdmVyc2EgZGEgMVwiLFxuICAgICAgICBcImludmFsaWRQcm9iYWJpbGl0eVwiOiBcIlByb2JhYmlsaXTDoCBub24gdmFsaWRhIC0gYm9yZG8gI3t7bnVtYmVyfX1cIixcbiAgICAgICAgXCJpbnZhbGlkUGF5b2ZmXCI6IFwiU2FsZG8gbm9uIHZhbGlkbyAtIGJvcmRvICN7e251bWJlcn19XCJcbiAgICB9LFxuICAgIFwiZ3Jvd2xcIjp7XG4gICAgICAgIFwiYnJ1c2hEaXNhYmxlZFwiOiBcIlNlbGV6aW9uZSBwZW5uZWxsbyBkaXNhYmlsaXRhdGFcIixcbiAgICAgICAgXCJicnVzaEVuYWJsZWRcIjogXCJTZWxlemlvbmUgcGVubmVsbG8gYWJpbGl0YXRhXCJcbiAgICB9LFxuICAgIFwidG9vbHRpcFwiOntcbiAgICAgICAgXCJub2RlXCI6e1xuICAgICAgICAgICAgXCJwYXlvZmZcIjoge1xuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIlNhbGRvIHt7bnVtYmVyfX1cIixcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwie3tuYW1lfX1cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiYWdncmVnYXRlZFBheW9mZlwiOiB7XG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiU2FsZG8gYWdncmVnYXRvIHt7bnVtYmVyfX1cIixcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwiQWdncmVnYXRvIHt7bmFtZX19XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInByb2JhYmlsaXR5VG9FbnRlclwiOiBcIlByb2JhYmlsaXTDoCBkYSBpbnNlcmlyZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiZWRnZVwiOntcbiAgICAgICAgICAgIFwicGF5b2ZmXCI6IHtcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJTYWxkbyB7e251bWJlcn19OiB7e3ZhbHVlfX1cIixcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwie3tuYW1lfX06IHt7dmFsdWV9fVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJwcm9iYWJpbGl0eVwiOiBcIlByb2JhYmlsaXTDoDoge3t2YWx1ZX19XCJcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzPXtcblxuICAgIFwiY29udGV4dE1lbnVcIjp7XG4gICAgICAgIFwibWFpblwiOntcbiAgICAgICAgICAgIFwiYWRkRGVjaXNpb25Ob2RlXCI6IFwiRG9kYWogV8SZemXFgiBEZWN5enlqbnlcIixcbiAgICAgICAgICAgIFwiYWRkQ2hhbmNlTm9kZVwiOiBcIkRvZGFqIFfEmXplxYIgTG9zb3d5XCIsXG4gICAgICAgICAgICBcImFkZFRleHRcIjogXCJEb2RhaiBUZWtzdFwiLFxuICAgICAgICAgICAgXCJwYXN0ZVwiOiBcIldrbGVqXCIsXG4gICAgICAgICAgICBcInNlbGVjdEFsbE5vZGVzXCI6IFwiWmF6bmFjeiB3c3p5c3RraWUgd8SZesWCeVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwibm9kZVwiOntcbiAgICAgICAgICAgIFwiY29weVwiOiBcIktvcGl1alwiLFxuICAgICAgICAgICAgXCJjdXRcIjogXCJXeXRuaWpcIixcbiAgICAgICAgICAgIFwicGFzdGVcIjogXCJXa2xlalwiLFxuICAgICAgICAgICAgXCJkZWxldGVcIjogXCJVc3XFhFwiLFxuICAgICAgICAgICAgXCJhZGREZWNpc2lvbk5vZGVcIjogXCJEb2RhaiBXxJl6ZcWCIERlY3l6eWpueVwiLFxuICAgICAgICAgICAgXCJhZGRDaGFuY2VOb2RlXCI6IFwiRG9kYWogV8SZemXFgiBMb3Nvd3lcIixcbiAgICAgICAgICAgIFwiYWRkVGVybWluYWxOb2RlXCI6IFwiRG9kYWogV8SZemXFgiBLb8WEY293eVwiLFxuICAgICAgICAgICAgXCJjb252ZXJ0XCI6e1xuICAgICAgICAgICAgICAgIFwiZGVjaXNpb25cIjogXCJKYWtvIFfEmXplxYIgRGVjeXp5am55XCIsXG4gICAgICAgICAgICAgICAgXCJjaGFuY2VcIjogXCJKYWtvIFfEmXplxYIgTG9zb3d5XCIsXG4gICAgICAgICAgICAgICAgXCJ0ZXJtaW5hbFwiOiBcIkpha28gV8SZemXFgiBLb8WEY293eVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJzZWxlY3RTdWJ0cmVlXCI6IFwiWmF6bmFjeiBwb2Rkcnpld29cIixcbiAgICAgICAgICAgIFwiZmxpcFN1YnRyZWVcIjogXCJQcnpld3LDs8SHIHBvZGRyemV3b1wiXG4gICAgICAgIH0sXG4gICAgICAgIFwiZWRnZVwiOntcbiAgICAgICAgICAgIFwiaW5qZWN0RGVjaXNpb25Ob2RlXCI6IFwiV3N0cnp5a25paiBXxJl6ZcWCIERlY3l6eWpueVwiLFxuICAgICAgICAgICAgXCJpbmplY3RDaGFuY2VOb2RlXCI6IFwiV3N0cnp5a25paiBXxJl6ZcWCIExvc293eVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwidGV4dFwiOntcbiAgICAgICAgICAgIFwiZGVsZXRlXCI6IFwiVXN1xYRcIlxuICAgICAgICB9XG4gICAgfSxcblxuICAgIFwidmFsaWRhdGlvblwiOntcbiAgICAgICAgXCJpbmNvbXBsZXRlUGF0aFwiOiBcIk9zdGF0bmltIHfEmXrFgmVtIHcgxZtjaWXFvGNlIHBvd2luaWVuIGJ5xIcgV8SZemXFgiBLb8WEY293eVwiLFxuICAgICAgICBcInByb2JhYmlsaXR5RG9Ob3RTdW1VcFRvMVwiOiBcIlByYXdkb3BvZG9iaWXFhHN0d2EgbmllIHN1bXVqxIUgc2llIGRvIDFcIixcbiAgICAgICAgXCJpbnZhbGlkUHJvYmFiaWxpdHlcIjogXCJOaWVwb3ByYXduZSBwcmF3ZG9wb2RvYmllxYRzdHdvIG5hIGtyYXfEmWR6aSAje3tudW1iZXJ9fVwiLFxuICAgICAgICBcImludmFsaWRQYXlvZmZcIjogXCJOaWVwb3ByYXduYSB3eXDFgmF0YSBuYSBrcmF3xJlkemkgI3t7bnVtYmVyfX1cIlxuICAgIH0sXG4gICAgXCJncm93bFwiOntcbiAgICAgICAgXCJicnVzaERpc2FibGVkXCI6IFwiWmF6bmFjemFuaWUgd3nFgsSFY3pvbmVcIixcbiAgICAgICAgXCJicnVzaEVuYWJsZWRcIjogXCJaYXpuYWN6YW5pZSB3xYLEhWN6b25lXCJcbiAgICB9LFxuICAgIFwidG9vbHRpcFwiOntcbiAgICAgICAgXCJub2RlXCI6e1xuICAgICAgICAgICAgXCJwYXlvZmZcIjoge1xuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIld5cMWCYXRhIHt7bnVtYmVyfX1cIixcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwie3tuYW1lfX1cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiYWdncmVnYXRlZFBheW9mZlwiOiB7XG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiWmFncmVnb3dhbmEgd3lwxYJhdGEge3tudW1iZXJ9fVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJaYWdyZWdvd2FuYSB7e25hbWV9fVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJwcm9iYWJpbGl0eVRvRW50ZXJcIjogXCJQcmF3ZG9wb2RvYmllxYRzdHdvIHdlasWbY2lhXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJlZGdlXCI6e1xuICAgICAgICAgICAgXCJwYXlvZmZcIjoge1xuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIld5cMWCYXRhIHt7bnVtYmVyfX06IHt7dmFsdWV9fVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJ7e25hbWV9fToge3t2YWx1ZX19XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInByb2JhYmlsaXR5XCI6IFwiUHJhd2RvcG9kb2JpZcWEc3R3bzoge3t2YWx1ZX19XCJcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7RDNFeHRlbnNpb25zfSBmcm9tICcuL2QzLWV4dGVuc2lvbnMnXG5EM0V4dGVuc2lvbnMuZXh0ZW5kKCk7XG5cbmV4cG9ydCAqIGZyb20gJy4vdHJlZS1kZXNpZ25lcidcbmV4cG9ydCAqIGZyb20gJy4vYXBwLXV0aWxzJ1xuZXhwb3J0ICogZnJvbSAnLi90ZW1wbGF0ZXMnXG5leHBvcnQgKiBmcm9tICcuL3Rvb2x0aXAnXG5leHBvcnQgKiBmcm9tICcuL2QzLWV4dGVuc2lvbnMnXG5leHBvcnQge2RlZmF1bHQgYXMgZDN9IGZyb20gJy4vZDMnXG5cblxuIiwiaW1wb3J0IHtVdGlsc30gZnJvbSAnc2QtdXRpbHMnXG5pbXBvcnQge2RvbWFpbiBhcyBtb2RlbH0gZnJvbSAnc2QtbW9kZWwnXG5pbXBvcnQgKiBhcyBkMyBmcm9tICcuL2QzJ1xuaW1wb3J0IGNpcmNsZVN5bWJvbCBmcm9tICcuL3N5bWJvbHMvY2lyY2xlJ1xuaW1wb3J0IHRyaWFuZ2xlU3ltYm9sIGZyb20gJy4vc3ltYm9scy90cmlhbmdsZSdcbmltcG9ydCB7QXBwVXRpbHN9IGZyb20gXCIuL2FwcC11dGlsc1wiO1xuXG4vKlRyZWUgbGF5b3V0IG1hbmFnZXIqL1xuZXhwb3J0IGNsYXNzIExheW91dHtcblxuICAgIHRyZWVEZXNpZ25lcjtcbiAgICBkYXRhO1xuICAgIGNvbmZpZztcblxuICAgIG5vZGVUeXBlVG9TeW1ib2wgPSB7XG4gICAgICAgICdkZWNpc2lvbic6IGQzLnN5bWJvbFNxdWFyZSxcbiAgICAgICAgJ2NoYW5jZSc6IGNpcmNsZVN5bWJvbCxcbiAgICAgICAgXCJ0ZXJtaW5hbFwiOiB0cmlhbmdsZVN5bWJvbFxuICAgIH07XG5cbiAgICBzdGF0aWMgTUFOVUFMX0xBWU9VVF9OQU1FID0gJ21hbnVhbCc7XG5cblxuICAgIG9uQXV0b0xheW91dENoYW5nZWQ9W107XG5cbiAgICBub2RlVHlwZU9yZGVyID0ge1xuICAgICAgICAnZGVjaXNpb24nIDogMCxcbiAgICAgICAgJ2NoYW5jZSc6IDAsXG4gICAgICAgICd0ZXJtaW5hbCc6IDFcbiAgICB9O1xuXG4gICAgdHJlZU1hcmdpbiA9IDUwO1xuICAgIHRhcmdldFN5bWJvbFNpemU9e307XG4gICAgbm9kZVNlcGFyYXRpb24gPSAoYSwgYikgPT4gYS5wYXJlbnQgPT0gYi5wYXJlbnQgPyAxIDogMS4yXG5cbiAgICBjb25zdHJ1Y3Rvcih0cmVlRGVzaWduZXIsIGRhdGEsIGNvbmZpZyl7XG4gICAgICAgIHRoaXMudHJlZURlc2lnbmVyID0gdHJlZURlc2lnbmVyO1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcblxuICAgIH1cblxuICAgIHVwZGF0ZShub2RlKXtcbiAgICAgICAgaWYobm9kZSAmJiBub2RlLiRwYXJlbnQpe1xuICAgICAgICAgICAgbm9kZS4kcGFyZW50LmNoaWxkRWRnZXMuc29ydCgoYSxiKT0+YS5jaGlsZE5vZGUubG9jYXRpb24ueSAtIGIuY2hpbGROb2RlLmxvY2F0aW9uLnkpXG4gICAgICAgIH1cbiAgICAgICAgaWYoIXRoaXMuaXNNYW51YWxMYXlvdXQoKSl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hdXRvTGF5b3V0KHRoaXMuY29uZmlnLnR5cGUsIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmKG5vZGUpe1xuICAgICAgICAgICAgdGhpcy5tb3ZlTm9kZVRvRW1wdHlQbGFjZShub2RlKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLnRyZWVEZXNpZ25lci5yZWRyYXcodHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc01hbnVhbExheW91dCgpe1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcudHlwZSA9PSBMYXlvdXQuTUFOVUFMX0xBWU9VVF9OQU1FO1xuICAgIH1cblxuICAgIGdldE5ld0NoaWxkTG9jYXRpb24ocGFyZW50KXtcbiAgICAgICAgaWYoIXBhcmVudCl7XG4gICAgICAgICAgICByZXR1cm4gbmV3IG1vZGVsLlBvaW50KHRoaXMuZ2V0Tm9kZU1pblgoKSwgdGhpcy5nZXROb2RlTWluWSgpKVxuICAgICAgICB9XG4gICAgICAgIHZhciB4ID0gcGFyZW50LmxvY2F0aW9uLnggKyB0aGlzLmNvbmZpZy5ncmlkV2lkdGg7XG4gICAgICAgIHZhciB5ID0gcGFyZW50LmxvY2F0aW9uLnk7XG4gICAgICAgIGlmKHBhcmVudC5jaGlsZEVkZ2VzLmxlbmd0aCl7XG4gICAgICAgICAgICB5ID0gcGFyZW50LmNoaWxkRWRnZXNbcGFyZW50LmNoaWxkRWRnZXMubGVuZ3RoLTFdLmNoaWxkTm9kZS5sb2NhdGlvbi55KzE7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IG1vZGVsLlBvaW50KHgsIHkpXG4gICAgfVxuXG4gICAgZ2V0SW5qZWN0ZWROb2RlTG9jYXRpb24oZWRnZSl7XG5cbiAgICAgICAgdmFyIHAgPSBlZGdlLiRsaW5lUG9pbnRzWzJdO1xuXG4gICAgICAgIHJldHVybiBuZXcgbW9kZWwuUG9pbnQocFswXSwgcFsxXSlcbiAgICB9XG5cbiAgICBtb3ZlTm9kZVRvRW1wdHlQbGFjZShub2RlLCByZWRyYXdJZkNoYW5nZWQ9dHJ1ZSl7XG4gICAgICAgIHZhciBwb3NpdGlvbk1hcCA9IHt9O1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIG5vZGUubG9jYXRpb24ueCA9IE1hdGgubWF4KHRoaXMuZ2V0Tm9kZU1pblgobm9kZSksIG5vZGUubG9jYXRpb24ueCk7XG4gICAgICAgIG5vZGUubG9jYXRpb24ueSA9IE1hdGgubWF4KHRoaXMuZ2V0Tm9kZU1pblkobm9kZSksIG5vZGUubG9jYXRpb24ueSk7XG5cblxuICAgICAgICB0aGlzLm5vZGVzU29ydGVkQnlYID0gdGhpcy5kYXRhLm5vZGVzLnNsaWNlKCk7XG4gICAgICAgIHRoaXMubm9kZXNTb3J0ZWRCeVguc29ydCgoYSxiKT0+YS5sb2NhdGlvbi54IC0gYi5sb2NhdGlvbi54KTtcblxuICAgICAgICBmdW5jdGlvbiBmaW5kQ29sbGlkaW5nTm9kZShub2RlLCBsb2NhdGlvbil7XG4gICAgICAgICAgICByZXR1cm4gVXRpbHMuZmluZChzZWxmLm5vZGVzU29ydGVkQnlYLCBuPT57XG4gICAgICAgICAgICAgICAgaWYobm9kZSA9PSBuKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBtYXJnaW4gPSBzZWxmLmNvbmZpZy5ub2RlU2l6ZS8zO1xuICAgICAgICAgICAgICAgIHZhciB4ID0gbi5sb2NhdGlvbi54O1xuICAgICAgICAgICAgICAgIHZhciB5ID0gbi5sb2NhdGlvbi55O1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIChsb2NhdGlvbi54IC0gbWFyZ2luIDw9IHggJiYgbG9jYXRpb24ueCArIG1hcmdpbiA+PSB4XG4gICAgICAgICAgICAgICAgICAgICYmIGxvY2F0aW9uLnkgLSBtYXJnaW4gPD0geSAmJiBsb2NhdGlvbi55ICsgbWFyZ2luID49IHkpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzdGVwWCA9IHRoaXMuY29uZmlnLm5vZGVTaXplLzI7XG4gICAgICAgIHZhciBzdGVwWSA9IHRoaXMuY29uZmlnLm5vZGVTaXplKzEwO1xuICAgICAgICB2YXIgc3RlcFhzYW1lUGFyZW50ID0gMDtcbiAgICAgICAgdmFyIHN0ZXBZc2FtZVBhcmVudCA9IDc1O1xuICAgICAgICB2YXIgY2hhbmdlZCA9IGZhbHNlO1xuICAgICAgICB2YXIgY29saWRpbmdOb2RlO1xuICAgICAgICB2YXIgbmV3TG9jYXRpb24gPSBuZXcgbW9kZWwuUG9pbnQobm9kZS5sb2NhdGlvbik7XG4gICAgICAgIHdoaWxlKGNvbGlkaW5nTm9kZSA9IGZpbmRDb2xsaWRpbmdOb2RlKG5vZGUsIG5ld0xvY2F0aW9uKSl7XG4gICAgICAgICAgICBjaGFuZ2VkPXRydWU7XG4gICAgICAgICAgICB2YXIgc2FtZVBhcmVudCA9IG5vZGUuJHBhcmVudCAmJiBjb2xpZGluZ05vZGUuJHBhcmVudCAmJiBub2RlLiRwYXJlbnQ9PWNvbGlkaW5nTm9kZS4kcGFyZW50O1xuICAgICAgICAgICAgaWYoc2FtZVBhcmVudCl7XG4gICAgICAgICAgICAgICAgbmV3TG9jYXRpb24ubW92ZShzdGVwWHNhbWVQYXJlbnQsIHN0ZXBZc2FtZVBhcmVudCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBuZXdMb2NhdGlvbi5tb3ZlKHN0ZXBYLCBzdGVwWSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYoY2hhbmdlZCl7XG4gICAgICAgICAgICBub2RlLm1vdmVUbyhuZXdMb2NhdGlvbi54LG5ld0xvY2F0aW9uLnksIHRydWUpO1xuICAgICAgICAgICAgaWYocmVkcmF3SWZDaGFuZ2VkKXtcbiAgICAgICAgICAgICAgICB0aGlzLnRyZWVEZXNpZ25lci5yZWRyYXcodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkaXNhYmxlQXV0b0xheW91dCgpe1xuICAgICAgICB0aGlzLmNvbmZpZy50eXBlID0gTGF5b3V0Lk1BTlVBTF9MQVlPVVRfTkFNRTtcbiAgICAgICAgdGhpcy5fZmlyZU9uQXV0b0xheW91dENoYW5nZWRDYWxsYmFja3MoKTtcbiAgICB9XG5cblxuICAgIG5vZGVTeW1ib2xTaXplID0ge307XG4gICAgZHJhd05vZGVTeW1ib2wocGF0aCwgdHJhbnNpdGlvbil7XG5cbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgbm9kZVNpemUgPSB0aGlzLmNvbmZpZy5ub2RlU2l6ZTtcbiAgICAgICAgdGhpcy5ub2RlU3ltYm9sID0gZDMuc3ltYm9sKCkudHlwZShkPT4gc2VsZi5ub2RlVHlwZVRvU3ltYm9sW2QudHlwZV0pXG4gICAgICAgICAgICAuc2l6ZShkPT5zZWxmLm5vZGVTeW1ib2xTaXplW2QuJGlkXSA/IFV0aWxzLmdldChzZWxmLnRhcmdldFN5bWJvbFNpemUsIGQudHlwZStcIlsnXCIrc2VsZi5jb25maWcubm9kZVNpemUrXCInXVwiLCA2NCkgOiA2NCk7XG5cbiAgICAgICAgcGF0aFxuICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICB2YXIgcGF0aCA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgICAgICAgICB2YXIgcHJldiA9IHBhdGguYXR0cihcImRcIik7XG4gICAgICAgICAgICAgICAgaWYoIXByZXYpe1xuICAgICAgICAgICAgICAgICAgICBwYXRoLmF0dHIoXCJkXCIsIHNlbGYubm9kZVN5bWJvbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBzaXplID0gVXRpbHMuZ2V0KHNlbGYudGFyZ2V0U3ltYm9sU2l6ZSwgZC50eXBlK1wiWydcIitzZWxmLmNvbmZpZy5ub2RlU2l6ZStcIiddXCIpO1xuICAgICAgICAgICAgICAgIGlmKCFzaXplKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJveCA9IHBhdGgubm9kZSgpLmdldEJCb3goKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9yID0gTWF0aC5taW4obm9kZVNpemUgLyBib3gud2lkdGgsIG5vZGVTaXplIC8gYm94LmhlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgIHNpemUgPSBlcnJvciAqIGVycm9yICogKHNlbGYubm9kZVN5bWJvbFNpemVbZC4kaWRdfHw2NCk7XG4gICAgICAgICAgICAgICAgICAgIFV0aWxzLnNldChzZWxmLnRhcmdldFN5bWJvbFNpemUsIGQudHlwZStcIlsnXCIrc2VsZi5jb25maWcubm9kZVNpemUrXCInXVwiLCBzaXplKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYodHJhbnNpdGlvbil7XG4gICAgICAgICAgICAgICAgICAgIHBhdGggPSAgcGF0aC50cmFuc2l0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5ub2RlU3ltYm9sU2l6ZVtkLiRpZF0gPSBzaXplO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwYXRoLmF0dHIoXCJkXCIsIHNlbGYubm9kZVN5bWJvbCk7XG4gICAgICAgICAgICAgICAgaWYodHJhbnNpdGlvbil7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubm9kZVN5bWJvbFNpemVbZC4kaWRdID0gc2l6ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBub2RlTGFiZWxQb3NpdGlvbihzZWxlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIHNlbGVjdGlvblxuICAgICAgICAgICAgLmF0dHIoJ3gnLCAwKVxuICAgICAgICAgICAgLmF0dHIoJ3knLCAtdGhpcy5jb25maWcubm9kZVNpemUgLyAyIC0gNylcbiAgICB9XG5cbiAgICBub2RlUGF5b2ZmUG9zaXRpb24oc2VsZWN0aW9uKSB7XG4gICAgICAgIHJldHVybiBMYXlvdXQuc2V0SGFuZ2luZ1Bvc2l0aW9uKHNlbGVjdGlvbilcbiAgICAgICAgICAgIC5hdHRyKCd4JywgMClcbiAgICAgICAgICAgIC5hdHRyKCd5JywgdGhpcy5jb25maWcubm9kZVNpemUgLyAyICsgNylcbiAgICAgICAgICAgIC5hdHRyKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKVxuICAgIH1cblxuICAgIG5vZGVBZ2dyZWdhdGVkUGF5b2ZmUG9zaXRpb24oc2VsZWN0aW9uKSB7XG4gICAgICAgIHZhciBmb250U2l6ZSA9IDEyO1xuICAgICAgICB2YXIgeCA9IHRoaXMuY29uZmlnLm5vZGVTaXplIC8gMiArIDc7XG4gICAgICAgIExheW91dC5zZXRIYW5naW5nUG9zaXRpb24oc2VsZWN0aW9uKVxuICAgICAgICAgICAgLmF0dHIoJ3gnLCB4KVxuICAgICAgICAgICAgLmF0dHIoJ3knLCBkPT57XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW1zID0gZC5kaXNwbGF5VmFsdWUoJ2FnZ3JlZ2F0ZWRQYXlvZmYnKTtcbiAgICAgICAgICAgICAgICBsZXQgbnVtYmVyID0gVXRpbHMuaXNBcnJheShpdGVtcykgPyBpdGVtcy5maWx0ZXIoaXQ9Pml0ICE9PSB1bmRlZmluZWQpLmxlbmd0aCA6IDE7XG4gICAgICAgICAgICAgICAgcmV0dXJuIC1NYXRoLm1heChudW1iZXIqZm9udFNpemUgKyBudW1iZXIgPiAxID8gMCA6IDUsIHRoaXMuY29uZmlnLm5vZGVTaXplIC8gMikrIChudW1iZXIgPiAgMSA/IDIgOiA1KVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgc2VsZWN0aW9uLnNlbGVjdEFsbCgndHNwYW4nKS5hdHRyKCd4JywgeCk7XG4gICAgICAgIHJldHVybiBzZWxlY3Rpb247XG4gICAgICAgICAgICAvLyAuYXR0cigndGV4dC1hbmNob3InLCAnbWlkZGxlJylcbiAgICAgICAgICAgIC8vIC5hdHRyKCdkb21pbmFudC1iYXNlbGluZScsICdoYW5naW5nJylcbiAgICB9XG5cbiAgICBub2RlUHJvYmFiaWxpdHlUb0VudGVyUG9zaXRpb24oc2VsZWN0aW9uKSB7XG4gICAgICAgIHZhciBmb250U2l6ZSA9IDEyO1xuICAgICAgICByZXR1cm4gc2VsZWN0aW9uXG4gICAgICAgICAgICAuYXR0cigneCcsIHRoaXMuY29uZmlnLm5vZGVTaXplIC8gMiArIDcpXG4gICAgICAgICAgICAuYXR0cigneScsIE1hdGgubWF4KGZvbnRTaXplKyA1LCB0aGlzLmNvbmZpZy5ub2RlU2l6ZSAvIDIpIC01KVxuICAgICAgICAgICAgLy8gLmF0dHIoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXG4gICAgICAgICAgICAvLyAuYXR0cignZG9taW5hbnQtYmFzZWxpbmUnLCAnY2VudHJhbCcpXG4gICAgfVxuXG4gICAgbm9kZUluZGljYXRvclBvc2l0aW9uKHNlbGVjdGlvbikge1xuICAgICAgICByZXR1cm4gc2VsZWN0aW9uXG4gICAgICAgICAgICAuYXR0cigneCcsIHRoaXMuY29uZmlnLm5vZGVTaXplIC8gMiArIDgpXG4gICAgICAgICAgICAuYXR0cigneScsIC0gdGhpcy5jb25maWcubm9kZVNpemUvMilcbiAgICAgICAgICAgIC5hdHRyKCdkb21pbmFudC1iYXNlbGluZScsICdjZW50cmFsJylcbiAgICAgICAgICAgIC5hdHRyKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKVxuICAgIH1cblxuICAgIG5vZGVVbmZvbGRCdXR0b25Qb3NpdGlvbihzZWxlY3Rpb24pIHtcbiAgICAgICAgdmFyIGZvbnRTaXplID0gMTI7XG4gICAgICAgIHJldHVybiBzZWxlY3Rpb25cbiAgICAgICAgICAgIC5hdHRyKCd4JywgdGhpcy5jb25maWcubm9kZVNpemUgLyAyICsgNSlcbiAgICAgICAgICAgIC5hdHRyKCd5JywgMClcbiAgICAgICAgICAgIC5hdHRyKCdkb21pbmFudC1iYXNlbGluZScsICdjZW50cmFsJylcbiAgICB9XG5cbiAgICBlZGdlTGluZUQoZWRnZSl7XG4gICAgICAgIHZhciBsaW5lID0gZDMubGluZSgpXG4gICAgICAgICAgICAueChkPT4gZFswXSlcbiAgICAgICAgICAgIC55KGQ9PiBkWzFdKTtcbiAgICAgICAgLy8gLmN1cnZlKGQzLmN1cnZlQ2F0bXVsbFJvbS5hbHBoYSgwLjUpKTtcblxuXG4gICAgICAgIHZhciBwYXJlbnROb2RlID0gZWRnZS5wYXJlbnROb2RlO1xuICAgICAgICB2YXIgY2hpbGROb2RlID0gZWRnZS5jaGlsZE5vZGU7XG5cbiAgICAgICAgdmFyIGRYID0gY2hpbGROb2RlLmxvY2F0aW9uLnggLSBwYXJlbnROb2RlLmxvY2F0aW9uLng7XG4gICAgICAgIHZhciBkWSA9IGNoaWxkTm9kZS5sb2NhdGlvbi55IC0gcGFyZW50Tm9kZS5sb2NhdGlvbi55O1xuXG4gICAgICAgIHZhciBzaWduID0gZFg+PTAgPyAxIDogLTE7XG5cbiAgICAgICAgdmFyIHNsYW50U3RhcnRYT2Zmc2V0ID0gTWF0aC5taW4oZFgvMiwgdGhpcy5jb25maWcubm9kZVNpemUvMisxMCk7XG4gICAgICAgIHZhciBzbGFudFdpZHRoID0gTWF0aC5taW4odGhpcy5jb25maWcuZWRnZVNsYW50V2lkdGhNYXgsIE1hdGgubWF4KGRYLzIgLSBzbGFudFN0YXJ0WE9mZnNldCwgMCkpO1xuXG4gICAgICAgIHZhciBwb2ludDEgPSBbcGFyZW50Tm9kZS5sb2NhdGlvbi54ICt0aGlzLmNvbmZpZy5ub2RlU2l6ZS8yICsgMSwgcGFyZW50Tm9kZS5sb2NhdGlvbi55XTtcbiAgICAgICAgdmFyIHBvaW50MiA9IFtNYXRoLm1heChwYXJlbnROb2RlLmxvY2F0aW9uLngrc2xhbnRTdGFydFhPZmZzZXQsIHBvaW50MVswXSksIHBhcmVudE5vZGUubG9jYXRpb24ueV07XG4gICAgICAgIHZhciBwb2ludDMgPSBbcGFyZW50Tm9kZS5sb2NhdGlvbi54K3NsYW50U3RhcnRYT2Zmc2V0K3NsYW50V2lkdGgsIGNoaWxkTm9kZS5sb2NhdGlvbi55XTtcbiAgICAgICAgdmFyIHBvaW50NCA9IFtjaGlsZE5vZGUubG9jYXRpb24ueCAtIChzaWduKihNYXRoLm1heCgwLCBNYXRoLm1pbih0aGlzLmNvbmZpZy5ub2RlU2l6ZS8yKzgsIGRYLzIpKSkpLCBjaGlsZE5vZGUubG9jYXRpb24ueV07XG4gICAgICAgIC8vIHZhciBwb2ludDIgPSBbcGFyZW50Tm9kZS5sb2NhdGlvbi54K2RYLzItc2xhbnRXaWR0aC8yLCBwYXJlbnROb2RlLmxvY2F0aW9uLnldO1xuICAgICAgICAvLyB2YXIgcG9pbnQzID0gW2NoaWxkTm9kZS5sb2NhdGlvbi54LShkWC8yLXNsYW50V2lkdGgvMiksIGNoaWxkTm9kZS5sb2NhdGlvbi55XTtcblxuICAgICAgICBlZGdlLiRsaW5lUG9pbnRzID0gW3BvaW50MSwgcG9pbnQyLCBwb2ludDMsIHBvaW50NF07XG4gICAgICAgIHJldHVybiBsaW5lKGVkZ2UuJGxpbmVQb2ludHMpO1xuICAgIH1cblxuICAgIGVkZ2VQYXlvZmZQb3NpdGlvbihzZWxlY3Rpb24pIHtcbiAgICAgICAgTGF5b3V0LnNldEhhbmdpbmdQb3NpdGlvbihzZWxlY3Rpb24pXG4gICAgICAgICAgICAuYXR0cigneCcsIGQ9PmQuJGxpbmVQb2ludHNbMl1bMF0gKyAyKVxuICAgICAgICAgICAgLmF0dHIoJ3knLCBkPT5kLiRsaW5lUG9pbnRzWzJdWzFdICsgNyk7XG5cbiAgICAgICAgc2VsZWN0aW9uLnNlbGVjdEFsbCgndHNwYW4nKS5hdHRyKCd4JywgZnVuY3Rpb24oZCl7XG4gICAgICAgICAgICByZXR1cm4gZDMuc2VsZWN0KHRoaXMucGFyZW50Tm9kZSkuZGF0dW0oKS4kbGluZVBvaW50c1syXVswXSArIDJcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzZWxlY3Rpb247XG5cbiAgICB9XG5cbiAgICBlZGdlTGFiZWxQb3NpdGlvbihzZWxlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIHNlbGVjdGlvblxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGQ9Pid0cmFuc2xhdGUoJysoZC4kbGluZVBvaW50c1syXVswXSArIDIpKycsJysoZC4kbGluZVBvaW50c1syXVsxXSAtIDcpKycpJylcbiAgICAgICAgICAgIC8vIC5hdHRyKCd4JywgZD0+ZC4kbGluZVBvaW50c1syXVswXSArIDIpXG4gICAgICAgICAgICAvLyAuYXR0cigneScsIGQ9PmQuJGxpbmVQb2ludHNbMl1bMV0gLSA3KVxuXG4gICAgfVxuXG4gICAgZWRnZVByb2JhYmlsaXR5UG9zaXRpb24oc2VsZWN0aW9uKSB7XG4gICAgICAgIHJldHVybiBMYXlvdXQuc2V0SGFuZ2luZ1Bvc2l0aW9uKHNlbGVjdGlvbilcbiAgICAgICAgICAgIC5hdHRyKCd4JywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICB2YXIgbGVuID0gdGhpcy5nZXRDb21wdXRlZFRleHRMZW5ndGgoKTtcbiAgICAgICAgICAgICAgICB2YXIgbWluID0gZC4kbGluZVBvaW50c1syXVswXSArIDIgKyB0aGlzLnByZXZpb3VzU2libGluZy5jaGlsZE5vZGVzWzBdLmdldENvbXB1dGVkVGV4dExlbmd0aCgpICsgNyArIGxlbjtcbiAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5tYXgobWluLCBkLiRsaW5lUG9pbnRzWzNdWzBdIC0gOCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmF0dHIoJ3knLCBkPT5kLiRsaW5lUG9pbnRzWzJdWzFdICsgNylcbiAgICB9XG5cbiAgICBnZXRNaW5NYXJnaW5CZXR3ZWVuTm9kZXMoKXtcbiAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5ub2RlU2l6ZSArIDMwO1xuICAgIH1cblxuXG4gICAgZ2V0Tm9kZU1pblgoZCl7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgaWYoZCAmJiBkLiRwYXJlbnQpey8vICYmICFzZWxmLmlzTm9kZVNlbGVjdGVkKGQuJHBhcmVudClcbiAgICAgICAgICAgIHJldHVybiBkLiRwYXJlbnQubG9jYXRpb24ueCArIHNlbGYuZ2V0TWluTWFyZ2luQmV0d2Vlbk5vZGVzKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNlbGYuY29uZmlnLm5vZGVTaXplLzI7XG4gICAgfVxuXG4gICAgZ2V0Tm9kZU1pblkoZCl7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5ub2RlU2l6ZS8yO1xuICAgIH1cblxuICAgIGdldE5vZGVNYXhYKGQpe1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgaWYoZCAmJiBkLmNoaWxkRWRnZXMubGVuZ3RoKXtcbiAgICAgICAgICAgIHJldHVybiBkMy5taW4oZC5jaGlsZEVkZ2VzLCBlPT4hZS5jaGlsZE5vZGUuJGhpZGRlbiA/IGUuY2hpbGROb2RlLmxvY2F0aW9uLnggOiA5OTk5OTk5KS1zZWxmLmdldE1pbk1hcmdpbkJldHdlZW5Ob2RlcygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiA5OTk5OTk5O1xuICAgIH1cblxuICAgIHNldEdyaWRXaWR0aCh3aWR0aCwgd2l0aG91dFN0YXRlU2F2aW5nKXtcbiAgICAgICAgdmFyIHNlbGY9dGhpcztcbiAgICAgICAgaWYodGhpcy5jb25maWcuZ3JpZFdpZHRoPT13aWR0aCl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYoIXdpdGhvdXRTdGF0ZVNhdmluZyl7XG4gICAgICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKHtcbiAgICAgICAgICAgICAgICBkYXRhOntcbiAgICAgICAgICAgICAgICAgICAgZ3JpZFdpZHRoOiBzZWxmLmNvbmZpZy5ncmlkV2lkdGhcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uVW5kbzogKGRhdGEpPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldEdyaWRXaWR0aChkYXRhLmdyaWRXaWR0aCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvblJlZG86IChkYXRhKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRHcmlkV2lkdGgod2lkdGgsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb25maWcuZ3JpZFdpZHRoPXdpZHRoO1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cblxuICAgIHNldEdyaWRIZWlnaHQoZ3JpZEhlaWdodCwgd2l0aG91dFN0YXRlU2F2aW5nKXtcbiAgICAgICAgdmFyIHNlbGY9dGhpcztcbiAgICAgICAgaWYodGhpcy5jb25maWcuZ3JpZEhlaWdodD09Z3JpZEhlaWdodCl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYoIXdpdGhvdXRTdGF0ZVNhdmluZyl7XG4gICAgICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKHtcbiAgICAgICAgICAgICAgICBkYXRhOntcbiAgICAgICAgICAgICAgICAgICAgZ3JpZEhlaWdodDogc2VsZi5jb25maWcuZ3JpZEhlaWdodFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25VbmRvOiAoZGF0YSk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0R3JpZEhlaWdodChkYXRhLmdyaWRIZWlnaHQsIHRydWUpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25SZWRvOiAoZGF0YSk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0R3JpZEhlaWdodChncmlkSGVpZ2h0LCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29uZmlnLmdyaWRIZWlnaHQ9Z3JpZEhlaWdodDtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG5cbiAgICBzZXROb2RlU2l6ZShub2RlU2l6ZSwgd2l0aG91dFN0YXRlU2F2aW5nKXtcbiAgICAgICAgdmFyIHNlbGY9dGhpcztcbiAgICAgICAgaWYodGhpcy5jb25maWcubm9kZVNpemU9PW5vZGVTaXplKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZighd2l0aG91dFN0YXRlU2F2aW5nKXtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoe1xuICAgICAgICAgICAgICAgIGRhdGE6e1xuICAgICAgICAgICAgICAgICAgICBub2RlU2l6ZTogc2VsZi5jb25maWcubm9kZVNpemVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uVW5kbzogKGRhdGEpPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldE5vZGVTaXplKGRhdGEubm9kZVNpemUsIHRydWUpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25SZWRvOiAoZGF0YSk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0Tm9kZVNpemUobm9kZVNpemUsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb25maWcubm9kZVNpemU9bm9kZVNpemU7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgIGlmKHRoaXMuaXNNYW51YWxMYXlvdXQoKSl7XG4gICAgICAgICAgICB0aGlzLmZpdE5vZGVzSW5QbG90dGluZ1JlZ2lvbihzZWxmLmRhdGEuZ2V0Um9vdHMoKSk7XG4gICAgICAgICAgICB0aGlzLnRyZWVEZXNpZ25lci5yZWRyYXcodHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRFZGdlU2xhbnRXaWR0aE1heCh3aWR0aCwgd2l0aG91dFN0YXRlU2F2aW5nKXtcbiAgICAgICAgdmFyIHNlbGY9dGhpcztcbiAgICAgICAgaWYodGhpcy5jb25maWcuZWRnZVNsYW50V2lkdGhNYXg9PXdpZHRoKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZighd2l0aG91dFN0YXRlU2F2aW5nKXtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoe1xuICAgICAgICAgICAgICAgIGRhdGE6e1xuICAgICAgICAgICAgICAgICAgICBlZGdlU2xhbnRXaWR0aE1heDogc2VsZi5jb25maWcuZWRnZVNsYW50V2lkdGhNYXhcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uVW5kbzogKGRhdGEpPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldEVkZ2VTbGFudFdpZHRoTWF4KGRhdGEuZWRnZVNsYW50V2lkdGhNYXgsIHRydWUpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25SZWRvOiAoZGF0YSk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0RWRnZVNsYW50V2lkdGhNYXgod2lkdGgsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb25maWcuZWRnZVNsYW50V2lkdGhNYXg9d2lkdGg7XG4gICAgICAgIHRoaXMudHJlZURlc2lnbmVyLnJlZHJhdyh0cnVlKTtcbiAgICB9XG5cbiAgICBhdXRvTGF5b3V0KHR5cGUsIHdpdGhvdXRTdGF0ZVNhdmluZyl7XG4gICAgICAgIHZhciBzZWxmPXRoaXM7XG5cblxuXG4gICAgICAgIGlmKCF3aXRob3V0U3RhdGVTYXZpbmcpe1xuICAgICAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSh7XG4gICAgICAgICAgICAgICAgZGF0YTp7XG4gICAgICAgICAgICAgICAgICAgIG5ld0xheW91dDogdHlwZSxcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudExheW91dDogc2VsZi5jb25maWcudHlwZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25VbmRvOiAoZGF0YSk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY29uZmlnLnR5cGUgPSBkYXRhLmN1cnJlbnRMYXlvdXQ7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuX2ZpcmVPbkF1dG9MYXlvdXRDaGFuZ2VkQ2FsbGJhY2tzKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvblJlZG86IChkYXRhKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5hdXRvTGF5b3V0KGRhdGEubmV3TGF5b3V0LCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbmZpZy50eXBlID0gdHlwZTtcbiAgICAgICAgaWYoIXRoaXMuZGF0YS5ub2Rlcy5sZW5ndGgpe1xuICAgICAgICAgICAgdGhpcy5fZmlyZU9uQXV0b0xheW91dENoYW5nZWRDYWxsYmFja3MoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBwcmV2VHJlZU1heFkgPSBzZWxmLmdldE5vZGVNaW5ZKCk7XG4gICAgICAgIHRoaXMuZGF0YS5nZXRSb290cygpLmZvckVhY2gocj0+e1xuICAgICAgICAgICAgdmFyIHJvb3QgPSBkMy5oaWVyYXJjaHkociwgZD0+e1xuICAgICAgICAgICAgICAgIHJldHVybiBkLmNoaWxkRWRnZXMuZmlsdGVyKGU9PiFlLiRoaWRkZW4pLm1hcChlPT5lLmNoaWxkTm9kZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gcm9vdC5zb3J0KChhLGIpPT5zZWxmLm5vZGVUeXBlT3JkZXJbYS5kYXRhLnR5cGVdLXNlbGYubm9kZVR5cGVPcmRlcltiLmRhdGEudHlwZV0pO1xuICAgICAgICAgICAgcm9vdC5zb3J0KChhLGIpPT5hLmRhdGEubG9jYXRpb24ueSAtIGIuZGF0YS5sb2NhdGlvbi55KTtcblxuXG4gICAgICAgICAgICB2YXIgbGF5b3V0O1xuICAgICAgICAgICAgaWYodHlwZT09J2NsdXN0ZXInKXtcbiAgICAgICAgICAgICAgICBsYXlvdXQgPSBkMy5jbHVzdGVyKCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBsYXlvdXQgPSBkMy50cmVlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsYXlvdXQubm9kZVNpemUoW3NlbGYuY29uZmlnLmdyaWRIZWlnaHQsIHNlbGYuY29uZmlnLmdyaWRXaWR0aF0pO1xuICAgICAgICAgICAgbGF5b3V0LnNlcGFyYXRpb24oc2VsZi5ub2RlU2VwYXJhdGlvbik7XG5cbiAgICAgICAgICAgIGxheW91dChyb290KTtcbiAgICAgICAgICAgIHZhciBtaW5ZID0gOTk5OTk5OTk5O1xuICAgICAgICAgICAgcm9vdC5lYWNoKGQ9PntcbiAgICAgICAgICAgICAgICBtaW5ZID0gTWF0aC5taW4obWluWSwgZC54KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB2YXIgZHkgPSByb290LnggLSBtaW5ZICsgcHJldlRyZWVNYXhZO1xuICAgICAgICAgICAgdmFyIGR4ID0gc2VsZi5nZXROb2RlTWluWCgpO1xuICAgICAgICAgICAgdmFyIG1heFk9MDtcbiAgICAgICAgICAgIHJvb3QuZWFjaChkPT57XG4gICAgICAgICAgICAgICAgZC5kYXRhLmxvY2F0aW9uLnggPSBkLnkgKyBkeDtcbiAgICAgICAgICAgICAgICBkLmRhdGEubG9jYXRpb24ueSA9IGQueCArIGR5O1xuXG4gICAgICAgICAgICAgICAgbWF4WSA9IE1hdGgubWF4KG1heFksIGQuZGF0YS5sb2NhdGlvbi55KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBwcmV2VHJlZU1heFkgPSBtYXhZICsgc2VsZi5jb25maWcubm9kZVNpemUrc2VsZi50cmVlTWFyZ2luO1xuICAgICAgICB9KTtcblxuXG4gICAgICAgIC8vIHRoaXMudHJhbnNpdGlvbiA9IHRydWU7XG4gICAgICAgIHRoaXMudHJlZURlc2lnbmVyLnJlZHJhdyh0cnVlKTtcbiAgICAgICAgLy8gdGhpcy50cmFuc2l0aW9uID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5fZmlyZU9uQXV0b0xheW91dENoYW5nZWRDYWxsYmFja3MoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZml0Tm9kZXNJblBsb3R0aW5nUmVnaW9uKG5vZGVzKXtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgdG9wWSA9IGQzLm1pbihub2Rlcywgbj0+bi5sb2NhdGlvbi55KTtcbiAgICAgICAgdmFyIG1pblkgPSBzZWxmLmdldE5vZGVNaW5ZKCk7XG4gICAgICAgIHZhciBkeSA9IHRvcFkgLSBtaW5ZO1xuXG4gICAgICAgIHZhciBtaW5YID0gZDMubWluKG5vZGVzLCBuPT5uLmxvY2F0aW9uLngpO1xuICAgICAgICB2YXIgZHggPSBtaW5YIC0gc2VsZi5nZXROb2RlTWluWCgpO1xuXG4gICAgICAgIGlmKGR5PDAgfHwgIGR4PDApe1xuICAgICAgICAgICAgbm9kZXMuZm9yRWFjaChuPT5uLm1vdmUoLWR4LCAtZHkpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1vdmVOb2Rlcyhub2RlcywgZHgsIGR5LCBwaXZvdCl7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIGxpbWl0ID0gc2VsZi5jb25maWcubGltaXROb2RlUG9zaXRpb25pbmc7XG4gICAgICAgIGlmKGxpbWl0KXtcbiAgICAgICAgICAgIGlmKGR4PDApe1xuICAgICAgICAgICAgICAgIG5vZGVzLnNvcnQoKGEsYik9PmEubG9jYXRpb24ueC1iLmxvY2F0aW9uLngpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgbm9kZXMuc29ydCgoYSxiKT0+Yi5sb2NhdGlvbi54LWEubG9jYXRpb24ueCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIHZhciBtaW5ZID0gZDMubWluKG5vZGVzLCBkPT5kLmxvY2F0aW9uLnkpO1xuICAgICAgICBpZihtaW5ZICsgZHkgPCBzZWxmLmdldE5vZGVNaW5ZKCkpe1xuICAgICAgICAgICAgZHkgPSBzZWxmLmdldE5vZGVNaW5ZKCkgLSBtaW5ZO1xuICAgICAgICB9XG5cbiAgICAgICAgbm9kZXMuZm9yRWFjaChkPT57XG4gICAgICAgICAgICBpZihsaW1pdCl7XG4gICAgICAgICAgICAgICAgTGF5b3V0LmJhY2t1cE5vZGVMb2NhdGlvbihkKTtcbiAgICAgICAgICAgICAgICB2YXIgbWluWCA9IHNlbGYuZ2V0Tm9kZU1pblgoZCk7XG4gICAgICAgICAgICAgICAgdmFyIG1heFggPSBzZWxmLmdldE5vZGVNYXhYKGQpO1xuXG4gICAgICAgICAgICAgICAgZC5sb2NhdGlvbi54ID0gTWF0aC5taW4oTWF0aC5tYXgoZC5sb2NhdGlvbi54K2R4LCBtaW5YKSwgbWF4WCk7XG4gICAgICAgICAgICAgICAgZC5sb2NhdGlvbi55ICs9IGR5O1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgZC5sb2NhdGlvbi54ICs9ZHg7XG4gICAgICAgICAgICAgICAgZC5sb2NhdGlvbi55ICs9IGR5O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgdmFyIHJldmVydFggPSBwaXZvdCAmJiBzZWxmLmNvbmZpZy5saW1pdE5vZGVQb3NpdGlvbmluZyAmJiAocGl2b3QubG9jYXRpb24ueCA9PSBwaXZvdC4kbG9jYXRpb24ueCk7XG5cbiAgICAgICAgbm9kZXMuZm9yRWFjaChkPT57XG4gICAgICAgICAgICBpZihyZXZlcnRYKXtcbiAgICAgICAgICAgICAgICBkLmxvY2F0aW9uLnggPSBkLiRsb2NhdGlvbi54O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi50cmVlRGVzaWduZXIudXBkYXRlTm9kZVBvc2l0aW9uKGQpO1xuICAgICAgICB9KTtcblxuXG4gICAgfVxuXG4gICAgc3RhdGljIGJhY2t1cE5vZGVMb2NhdGlvbihub2RlKSB7XG4gICAgICAgIG5vZGUuJGxvY2F0aW9uID0gbmV3IG1vZGVsLlBvaW50KG5vZGUubG9jYXRpb24pO1xuICAgIH1cblxuICAgIF9maXJlT25BdXRvTGF5b3V0Q2hhbmdlZENhbGxiYWNrcygpe1xuICAgICAgICB0aGlzLm9uQXV0b0xheW91dENoYW5nZWQuZm9yRWFjaChjPT5jKHRoaXMuY29uZmlnLnR5cGUpKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2V0SGFuZ2luZ1Bvc2l0aW9uKHNlbGVjdGlvbil7XG4gICAgICAgIC8vIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgIC8vICAgICBzZWxlY3Rpb24uZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAvLyAgICAgICAgIHZhciBoID0gIHRoaXMuZ2V0QkJveCgpLmhlaWdodDtcbiAgICAgICAgLy8gICAgICAgICBkMy5zZWxlY3QodGhpcykuYXR0cignZHknLCBoKTtcbiAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAvLyB9LDApO1xuXG4gICAgICAgIGlmKEFwcFV0aWxzLmlzSGlkZGVuKHNlbGVjdGlvbi5ub2RlKCkpKXsgLy8gc2V0dGluZyBoYW5naW5nIHBvc2l0aW9uIG9mIGhpZGRlbiBlbGVtZW50cyBmYWlscyBvbiBmaXJlZm94XG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0aW9uO1xuICAgICAgICB9XG5cblxuICAgICAgICBzZWxlY3Rpb24uZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIGggPSAgdGhpcy5nZXRCQm94KCkuaGVpZ2h0O1xuICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLmF0dHIoJ2R5JywgJzAuNzVlbScpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc2VsZWN0aW9uO1xuICAgIH1cblxufVxuXG5cbiIsImltcG9ydCB7QXBwVXRpbHN9IGZyb20gJy4vYXBwLXV0aWxzJ1xuaW1wb3J0ICogYXMgZDMgZnJvbSAnLi9kMydcbmltcG9ydCB7Q29udGV4dE1lbnV9IGZyb20gJy4vY29udGV4dC1tZW51L2NvbnRleHQtbWVudSdcblxuZXhwb3J0IGNsYXNzIE5vZGVEcmFnSGFuZGxlcntcblxuICAgIHRyZWVEZXNpZ25lcjtcbiAgICBkYXRhO1xuICAgIGNvbmZpZztcblxuICAgIGRyYWc7XG5cblxuICAgIGNvbnN0cnVjdG9yKHRyZWVEZXNpZ25lciwgZGF0YSl7XG4gICAgICAgIHRoaXMudHJlZURlc2lnbmVyID0gdHJlZURlc2lnbmVyO1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5kcmFnID0gZDMuZHJhZygpXG4gICAgICAgICAgICAuc3ViamVjdChmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgICAgaWYoZD09bnVsbCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAge1xuICAgICAgICAgICAgICAgICAgICAgICAgeDogZXZlbnQueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IGV2ZW50LnlcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHQgPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgeDogdC5hdHRyKFwieFwiKSArIEFwcFV0aWxzLmdldFRyYW5zbGF0aW9uKHQuYXR0cihcInRyYW5zZm9ybVwiKSlbMF0sXG4gICAgICAgICAgICAgICAgICAgIHk6IHQuYXR0cihcInlcIikgKyBBcHBVdGlscy5nZXRUcmFuc2xhdGlvbih0LmF0dHIoXCJ0cmFuc2Zvcm1cIikpWzFdXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oXCJzdGFydFwiLCBmdW5jdGlvbihkKXtcbiAgICAgICAgICAgICAgICBzZWxmLmRyYWdTdGFydGVkLmNhbGwodGhpcyxkLCBzZWxmKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbihcImRyYWdcIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICBzZWxmLm9uRHJhZy5jYWxsKHRoaXMsIGQsIHNlbGYpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbihcImVuZFwiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHNlbGYuZHJhZ0VuZGVkLmNhbGwodGhpcywgZCwgc2VsZik7XG4gICAgICAgICAgICB9KVxuICAgIH1cblxuXG4gICAgZHJhZ1N0YXJ0ZWQoZCxzZWxmKSB7XG4gICAgICAgIGlmKHNlbGYuaWdub3JlRHJhZyl7XG4gICAgICAgICAgICBzZWxmLmlnbm9yZURyYWc9ZmFsc2U7XG4gICAgICAgICAgICBzZWxmLmlnbm9yZWREcmFnPXRydWU7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5pZ25vcmVkRHJhZz1mYWxzZTtcblxuICAgICAgICAvLyBzZWxmLnRyZWVEZXNpZ25lci5sYXlvdXQuZGlzYWJsZUF1dG9MYXlvdXQoKTtcbiAgICAgICAgQ29udGV4dE1lbnUuaGlkZSgpO1xuICAgICAgICB2YXIgbm9kZSA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgaWYoIW5vZGUuY2xhc3NlZChcInNlbGVjdGVkXCIpKXtcbiAgICAgICAgICAgIHNlbGYudHJlZURlc2lnbmVyLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICBzZWxmLnRyZWVEZXNpZ25lci5zZWxlY3ROb2RlKGQpO1xuICAgICAgICBub2RlLmNsYXNzZWQoXCJzZWxlY3RlZCBkcmFnZ2luZ1wiLCB0cnVlKTtcbiAgICAgICAgc2VsZi5zZWxlY3RlZE5vZGVzID0gc2VsZi50cmVlRGVzaWduZXIuZ2V0U2VsZWN0ZWROb2Rlcyh0cnVlKTtcbiAgICAgICAgc2VsZi5wcmV2RHJhZ0V2ZW50ID0gZDMuZXZlbnQ7XG4gICAgICAgIHNlbGYuZHJhZ0V2ZW50Q291bnQgPSAwO1xuICAgIH1cblxuICAgIG9uRHJhZyhkcmFnZ2VkTm9kZSwgc2VsZil7XG4gICAgICAgIGlmKHNlbGYuaWdub3JlZERyYWcpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoc2VsZi5kcmFnRXZlbnRDb3VudD09Mil7XG4gICAgICAgICAgICBzZWxmLmRhdGEuc2F2ZVN0YXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5kcmFnRXZlbnRDb3VudCsrO1xuICAgICAgICBpZihzZWxmLnNlbGVjdGVkTm9kZXMubGVuZ3RoPjUgJiYgc2VsZi5kcmFnRXZlbnRDb3VudCUyIT0xKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBkeCA9IGQzLmV2ZW50LnggLSBzZWxmLnByZXZEcmFnRXZlbnQueDtcbiAgICAgICAgdmFyIGR5ID0gZDMuZXZlbnQueS0gc2VsZi5wcmV2RHJhZ0V2ZW50Lnk7XG4gICAgICAgIHNlbGYudHJlZURlc2lnbmVyLmxheW91dC5tb3ZlTm9kZXMoc2VsZi5zZWxlY3RlZE5vZGVzLCBkeCwgZHksIGRyYWdnZWROb2RlKTtcblxuXG4gICAgICAgIHNlbGYucHJldkRyYWdFdmVudCA9IGQzLmV2ZW50O1xuICAgICAgICBzZWxmLnRyZWVEZXNpZ25lci5yZWRyYXdFZGdlcygpO1xuICAgICAgICBzZWxmLnRyZWVEZXNpZ25lci51cGRhdGVQbG90dGluZ1JlZ2lvblNpemUoKTtcbiAgICB9XG5cbiAgICBkcmFnRW5kZWQoZHJhZ2dlZE5vZGUsIHNlbGYpe1xuICAgICAgICB2YXIgbm9kZSA9IGQzLnNlbGVjdCh0aGlzKS5jbGFzc2VkKFwiZHJhZ2dpbmdcIiwgZmFsc2UpO1xuICAgICAgICBpZihzZWxmLmlnbm9yZWREcmFnKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzZWxmLnRyZWVEZXNpZ25lci5sYXlvdXQudXBkYXRlKGRyYWdnZWROb2RlKVxuICAgIH1cblxuICAgIGNhbmNlbERyYWcoKXtcbiAgICAgICAgdGhpcy5pZ25vcmVEcmFnID0gdHJ1ZTtcbiAgICB9XG5cbn1cblxuXG4iLCJ2YXIgZXBzaWxvbiA9IDFlLTEyO1xudmFyIHBpID0gTWF0aC5QSTtcbnZhciBoYWxmUGkgPSBwaSAvIDI7XG52YXIgdGF1ID0gMiAqIHBpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgLypkcmF3OiBmdW5jdGlvbihjb250ZXh0LCBzaXplKSB7XG4gICAgICAgIHZhciByID0gTWF0aC5zcXJ0KHNpemUgLyBwaSk7XG4gICAgICAgIGNvbnRleHQubW92ZVRvKHIsIDApO1xuICAgICAgICBjb250ZXh0LmFyYygwLCAwLCByLCAwLCB0YXUpO1xuICAgIH0qL1xuICAgIGRyYXc6IGZ1bmN0aW9uKGNvbnRleHQsIHNpemUpIHtcblxuICAgICAgICB2YXIgciA9IE1hdGguc3FydChzaXplIC8gcGkpO1xuICAgICAgICB2YXIgZGlzdCA9MC41NTIyODQ3NDk4MzEgKiByO1xuXG4gICAgICAgIGNvbnRleHQubW92ZVRvKC1yLCAwKVxuICAgICAgICAvLyBjb250ZXh0LmxpbmVUbygyKnIsIDIqcilcbiAgICAgICAgLy8gY29udGV4dC5iZXppZXJDdXJ2ZVRvKC1yLCAtZGlzdCwgLWRpc3QsIC1yLCAwLC1yKTtcbiAgICAgICAgY29udGV4dC5iZXppZXJDdXJ2ZVRvKC1yLCAtZGlzdCwgLWRpc3QsIC1yLCAwLC1yKTtcblxuICAgICAgICBjb250ZXh0LmJlemllckN1cnZlVG8oZGlzdCwgLXIsIHIsIC1kaXN0LCByLDApO1xuXG4gICAgICAgIGNvbnRleHQuYmV6aWVyQ3VydmVUbyhyLCBkaXN0LCBkaXN0LCByLCAwLCByKTtcblxuICAgICAgICBjb250ZXh0LmJlemllckN1cnZlVG8oLWRpc3QsIHIsIC1yLCBkaXN0LCAtciwgMCk7XG4gICAgfVxufTtcbiIsInZhciBzcXJ0MyA9IE1hdGguc3FydCgzKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGRyYXc6IGZ1bmN0aW9uKGNvbnRleHQsIHNpemUpIHtcbiAgICAgICAgdmFyIHIgPSBNYXRoLnNxcnQoc2l6ZSAvIE1hdGguUEkpO1xuICAgICAgICBjb250ZXh0Lm1vdmVUbygtciwgMCk7XG4gICAgICAgIGNvbnRleHQubGluZVRvKDAuOSpyLCAtcik7XG4gICAgICAgIGNvbnRleHQubGluZVRvKDAuOSpyLCByKTtcbiAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICB9XG59O1xuIiwiaW1wb3J0IHtVdGlsc30gZnJvbSBcInNkLXV0aWxzXCI7XG5pbXBvcnQge2kxOG59IGZyb20gJy4vaTE4bi9pMThuJ1xuXG5leHBvcnQgY2xhc3MgVGVtcGxhdGVze1xuXG4gICAgc3RhdGljIGdyb3dsID0gcmVxdWlyZSgnLi90ZW1wbGF0ZXMvZ3Jvd2xfbWVzc2FnZS5odG1sJyk7XG5cbiAgICBzdGF0aWMgZ2V0KHRlbXBsYXRlTmFtZSwgdmFyaWFibGVzKXtcbiAgICAgICAgdmFyIGNvbXBpbGVkID0gVXRpbHMudGVtcGxhdGUoVGVtcGxhdGVzW3RlbXBsYXRlTmFtZV0seyAnaW1wb3J0cyc6IHsgJ2kxOG4nOiBpMThuLCAnVGVtcGxhdGVzJzogVGVtcGxhdGVzLCAnaW5jbHVkZSc6IGZ1bmN0aW9uKG4sIHYpIHtyZXR1cm4gVGVtcGxhdGVzLmdldChuLCB2KX0gfSB9KTtcbiAgICAgICAgaWYodmFyaWFibGVzKXtcbiAgICAgICAgICAgIHZhcmlhYmxlcy52YXJpYWJsZXMgPSB2YXJpYWJsZXM7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdmFyaWFibGVzID0ge3ZhcmlhYmxlczp7fX1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29tcGlsZWQodmFyaWFibGVzKVxuXG4gICAgfVxuXG4gICAgc3RhdGljIHN0eWxlUnVsZShzZWxlY3RvciwgcHJvcHMpe1xuICAgICAgICB2YXIgcyA9IHNlbGVjdG9yKyAneyc7XG4gICAgICAgIHByb3BzLmZvckVhY2gocD0+IHMrPVRlbXBsYXRlcy5zdHlsZVByb3AocFswXSwgcFsxXSkpO1xuICAgICAgICBzKz0nfSAnO1xuICAgICAgICByZXR1cm4gcztcbiAgICB9XG4gICAgc3RhdGljIHN0eWxlUHJvcChzdHlsZU5hbWUsIHZhcmlhYmxlTmFtZSl7XG4gICAgICAgIHJldHVybiAgc3R5bGVOYW1lKyc6IDwlPSAnK3ZhcmlhYmxlTmFtZSsnICU+OyAnXG4gICAgfVxuXG4gICAgc3RhdGljIHRyZWVEZXNpZ25lclNlbGVjdG9yID0gJ3N2Zy5zZC10cmVlLWRlc2lnbmVyJztcbiAgICBzdGF0aWMgbm9kZVNlbGVjdG9yKHR5cGUsIGNsYXp6KXtcbiAgICAgICAgdmFyIHMgPSBUZW1wbGF0ZXMudHJlZURlc2lnbmVyU2VsZWN0b3IrJyAubm9kZSc7XG4gICAgICAgIGlmKHR5cGUpe1xuICAgICAgICAgICAgcys9Jy4nK3R5cGUrJy1ub2RlJztcbiAgICAgICAgfVxuICAgICAgICBpZihjbGF6eil7XG4gICAgICAgICAgICBzKz0nLicrY2xheno7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHM7XG4gICAgfVxuICAgIHN0YXRpYyBlZGdlU2VsZWN0b3IoY2xhenope1xuICAgICAgICB2YXIgcyA9IFRlbXBsYXRlcy50cmVlRGVzaWduZXJTZWxlY3RvcisnIC5lZGdlJztcbiAgICAgICAgaWYoY2xhenope1xuICAgICAgICAgICAgcys9Jy4nK2NsYXp6O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzO1xuICAgIH1cblxuICAgIHN0YXRpYyB0cmVlRGVzaWduZXJTdHlsZXMgPVxuXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLnRyZWVEZXNpZ25lclNlbGVjdG9yLFtcbiAgICAgICAgICAgIFsnZm9udC1zaXplJywgJ2ZvbnRTaXplJ10sXG4gICAgICAgICAgICBbJ2ZvbnQtZmFtaWx5JywgJ2ZvbnRGYW1pbHknXSxcbiAgICAgICAgICAgIFsnZm9udC13ZWlnaHQnLCAnZm9udFdlaWdodCddLFxuICAgICAgICAgICAgWydmb250LXN0eWxlJywgJ2ZvbnRTdHlsZSddXG4gICAgICAgIF0pK1xuICAgICAgICAvLyAgIG5vZGVcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCkrJyBwYXRoJyxbXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnbm9kZS5maWxsJ10sXG4gICAgICAgICAgICBbJ3N0cm9rZS13aWR0aCcsICdub2RlLnN0cm9rZVdpZHRoJ11cbiAgICAgICAgXSkrXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLm5vZGVTZWxlY3RvcignZGVjaXNpb24nLCAnb3B0aW1hbCcpKycgcGF0aCwgJytUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCdjaGFuY2UnLCAnb3B0aW1hbCcpKycgcGF0aCwnICtUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCd0ZXJtaW5hbCcsICdvcHRpbWFsJykrJyBwYXRoJyxbXG4gICAgICAgICAgICBbJ3N0cm9rZScsICdub2RlLm9wdGltYWwuc3Ryb2tlJ10sXG4gICAgICAgICAgICBbJ3N0cm9rZS13aWR0aCcsICdub2RlLm9wdGltYWwuc3Ryb2tlV2lkdGgnXVxuICAgICAgICBdKStcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCkrJyAubGFiZWwnLFtcbiAgICAgICAgICAgIFsnZm9udC1zaXplJywgJ25vZGUubGFiZWwuZm9udFNpemUnXSxcbiAgICAgICAgICAgIFsnZmlsbCcsICdub2RlLmxhYmVsLmNvbG9yJ11cbiAgICAgICAgXSkrXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLm5vZGVTZWxlY3RvcigpKycgLnBheW9mZicsW1xuICAgICAgICAgICAgWydmb250LXNpemUnLCAnbm9kZS5wYXlvZmYuZm9udFNpemUnXSxcbiAgICAgICAgICAgIFsnZmlsbCcsICdub2RlLnBheW9mZi5jb2xvciddLFxuICAgICAgICBdKStcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCkrJyAucGF5b2ZmLm5lZ2F0aXZlJyxbXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnbm9kZS5wYXlvZmYubmVnYXRpdmVDb2xvciddLFxuICAgICAgICBdKStcblxuICAgICAgICAvLyAgICBkZWNpc2lvbiBub2RlXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLm5vZGVTZWxlY3RvcignZGVjaXNpb24nKSsnIHBhdGgnLFtcbiAgICAgICAgICAgIFsnZmlsbCcsICdub2RlLmRlY2lzaW9uLmZpbGwnXSxcbiAgICAgICAgICAgIFsnc3Ryb2tlJywgJ25vZGUuZGVjaXNpb24uc3Ryb2tlJ11cbiAgICAgICAgXSkrXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLm5vZGVTZWxlY3RvcignZGVjaXNpb24nLCAnc2VsZWN0ZWQnKSsnIHBhdGgnLFtcbiAgICAgICAgICAgIFsnZmlsbCcsICdub2RlLmRlY2lzaW9uLnNlbGVjdGVkLmZpbGwnXVxuICAgICAgICBdKStcblxuICAgICAgICAvLyAgICBjaGFuY2Ugbm9kZVxuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5ub2RlU2VsZWN0b3IoJ2NoYW5jZScpKycgcGF0aCcsW1xuICAgICAgICAgICAgWydmaWxsJywgJ25vZGUuY2hhbmNlLmZpbGwnXSxcbiAgICAgICAgICAgIFsnc3Ryb2tlJywgJ25vZGUuY2hhbmNlLnN0cm9rZSddXG4gICAgICAgIF0pK1xuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5ub2RlU2VsZWN0b3IoJ2NoYW5jZScsICdzZWxlY3RlZCcpKycgcGF0aCcsW1xuICAgICAgICAgICAgWydmaWxsJywgJ25vZGUuY2hhbmNlLnNlbGVjdGVkLmZpbGwnXVxuICAgICAgICBdKStcblxuICAgICAgICAvLyAgICB0ZXJtaW5hbCBub2RlXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLm5vZGVTZWxlY3RvcigndGVybWluYWwnKSsnIHBhdGgnLFtcbiAgICAgICAgICAgIFsnZmlsbCcsICdub2RlLnRlcm1pbmFsLmZpbGwnXSxcbiAgICAgICAgICAgIFsnc3Ryb2tlJywgJ25vZGUudGVybWluYWwuc3Ryb2tlJ11cbiAgICAgICAgXSkrXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLm5vZGVTZWxlY3RvcigndGVybWluYWwnLCAnc2VsZWN0ZWQnKSsnIHBhdGgnLFtcbiAgICAgICAgICAgIFsnZmlsbCcsICdub2RlLnRlcm1pbmFsLnNlbGVjdGVkLmZpbGwnXVxuICAgICAgICBdKStcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCd0ZXJtaW5hbCcpKycgLmFnZ3JlZ2F0ZWQtcGF5b2ZmJyxbXG4gICAgICAgICAgICBbJ2ZvbnQtc2l6ZScsICdub2RlLnRlcm1pbmFsLnBheW9mZi5mb250U2l6ZSddLFxuICAgICAgICAgICAgWydmaWxsJywgJ25vZGUudGVybWluYWwucGF5b2ZmLmNvbG9yJ10sXG4gICAgICAgIF0pK1xuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5ub2RlU2VsZWN0b3IoJ3Rlcm1pbmFsJykrJyAuYWdncmVnYXRlZC1wYXlvZmYubmVnYXRpdmUnLFtcbiAgICAgICAgICAgIFsnZmlsbCcsICdub2RlLnRlcm1pbmFsLnBheW9mZi5uZWdhdGl2ZUNvbG9yJ10sXG4gICAgICAgIF0pK1xuXG5cbiAgICAgICAgLy9wcm9iYWJpbGl0eVxuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy50cmVlRGVzaWduZXJTZWxlY3RvcisnIC5ub2RlIC5wcm9iYWJpbGl0eS10by1lbnRlciwgJytUZW1wbGF0ZXMudHJlZURlc2lnbmVyU2VsZWN0b3IrJyAuZWRnZSAucHJvYmFiaWxpdHknLFtcbiAgICAgICAgICAgIFsnZm9udC1zaXplJywgJ3Byb2JhYmlsaXR5LmZvbnRTaXplJ10sXG4gICAgICAgICAgICBbJ2ZpbGwnLCAncHJvYmFiaWxpdHkuY29sb3InXVxuICAgICAgICBdKStcblxuICAgICAgICAvL2VkZ2VcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMuZWRnZVNlbGVjdG9yKCkrJyBwYXRoJyxbXG4gICAgICAgICAgICBbJ3N0cm9rZScsICdlZGdlLnN0cm9rZSddLFxuICAgICAgICAgICAgWydzdHJva2Utd2lkdGgnLCAnZWRnZS5zdHJva2VXaWR0aCddXG4gICAgICAgIF0pK1xuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy50cmVlRGVzaWduZXJTZWxlY3RvcisnIG1hcmtlciNhcnJvdyBwYXRoJyxbXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnZWRnZS5zdHJva2UnXSxcbiAgICAgICAgXSkrXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLmVkZ2VTZWxlY3Rvcignb3B0aW1hbCcpKycgcGF0aCcsW1xuICAgICAgICAgICAgWydzdHJva2UnLCAnZWRnZS5vcHRpbWFsLnN0cm9rZSddLFxuICAgICAgICAgICAgWydzdHJva2Utd2lkdGgnLCAnZWRnZS5vcHRpbWFsLnN0cm9rZVdpZHRoJ11cbiAgICAgICAgXSkrXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLnRyZWVEZXNpZ25lclNlbGVjdG9yKycgbWFya2VyI2Fycm93LW9wdGltYWwgcGF0aCcsW1xuICAgICAgICAgICAgWydmaWxsJywgJ2VkZ2Uub3B0aW1hbC5zdHJva2UnXSxcbiAgICAgICAgXSkrXG5cbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMuZWRnZVNlbGVjdG9yKCdzZWxlY3RlZCcpKycgcGF0aCcsW1xuICAgICAgICAgICAgWydzdHJva2UnLCAnZWRnZS5zZWxlY3RlZC5zdHJva2UnXSxcbiAgICAgICAgICAgIFsnc3Ryb2tlLXdpZHRoJywgJ2VkZ2Uuc2VsZWN0ZWQuc3Ryb2tlV2lkdGgnXVxuICAgICAgICBdKStcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMudHJlZURlc2lnbmVyU2VsZWN0b3IrJyBtYXJrZXIjYXJyb3ctc2VsZWN0ZWQgcGF0aCcsW1xuICAgICAgICAgICAgWydmaWxsJywgJ2VkZ2Uuc2VsZWN0ZWQuc3Ryb2tlJ10sXG4gICAgICAgIF0pK1xuXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLmVkZ2VTZWxlY3RvcigpKycgLmxhYmVsJyxbXG4gICAgICAgICAgICBbJ2ZvbnQtc2l6ZScsICdlZGdlLmxhYmVsLmZvbnRTaXplJ10sXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnZWRnZS5sYWJlbC5jb2xvciddXG4gICAgICAgIF0pK1xuXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLmVkZ2VTZWxlY3RvcigpKycgLnBheW9mZicsW1xuICAgICAgICAgICAgWydmb250LXNpemUnLCAnZWRnZS5wYXlvZmYuZm9udFNpemUnXSxcbiAgICAgICAgICAgIFsnZmlsbCcsICdlZGdlLnBheW9mZi5jb2xvciddLFxuICAgICAgICBdKStcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMuZWRnZVNlbGVjdG9yKCkrJyAucGF5b2ZmLm5lZ2F0aXZlJyxbXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnZWRnZS5wYXlvZmYubmVnYXRpdmVDb2xvciddLFxuICAgICAgICBdKStcblxuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy50cmVlRGVzaWduZXJTZWxlY3RvcisnIC5zZC10aXRsZS1jb250YWluZXIgdGV4dC5zZC10aXRsZScsW1xuICAgICAgICAgICAgWydmb250LXNpemUnLCAndGl0bGUuZm9udFNpemUnXSxcbiAgICAgICAgICAgIFsnZm9udC13ZWlnaHQnLCAndGl0bGUuZm9udFdlaWdodCddLFxuICAgICAgICAgICAgWydmb250LXN0eWxlJywgJ3RpdGxlLmZvbnRTdHlsZSddLFxuICAgICAgICAgICAgWydmaWxsJywgJ3RpdGxlLmNvbG9yJ11cbiAgICAgICAgXSkgK1xuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy50cmVlRGVzaWduZXJTZWxlY3RvcisnIC5zZC10aXRsZS1jb250YWluZXIgdGV4dC5zZC1kZXNjcmlwdGlvbicsW1xuICAgICAgICAgICAgWydmb250LXNpemUnLCAnZGVzY3JpcHRpb24uZm9udFNpemUnXSxcbiAgICAgICAgICAgIFsnZm9udC13ZWlnaHQnLCAnZGVzY3JpcHRpb24uZm9udFdlaWdodCddLFxuICAgICAgICAgICAgWydmb250LXN0eWxlJywgJ2Rlc2NyaXB0aW9uLmZvbnRTdHlsZSddLFxuICAgICAgICAgICAgWydmaWxsJywgJ2Rlc2NyaXB0aW9uLmNvbG9yJ11cbiAgICAgICAgXSlcbn1cblxuXG5cblxuIiwibW9kdWxlLmV4cG9ydHMgPSBcIm1vZHVsZS5leHBvcnRzID0gXFxcIjxkaXYgY2xhc3M9XFxcXFxcXCJzZC1ncm93bC1tZXNzYWdlIDwlPXR5cGUlPlxcXFxcXFwiPlxcXFxuICAgIDxkaXYgY2xhc3M9XFxcXFxcXCJzZC1ncm93bC1tZXNzYWdlLXRleHRcXFxcXFxcIj5cXFxcbiAgICAgICAgPCU9IG1lc3NhZ2UgJT5cXFxcbiAgICA8L2Rpdj5cXFxcbjwvZGl2PlxcXFxuXFxcIjtcXG5cIjtcbiIsImltcG9ydCB7QXBwVXRpbHN9IGZyb20gJy4vYXBwLXV0aWxzJ1xuaW1wb3J0ICogYXMgZDMgZnJvbSAnLi9kMydcbmltcG9ydCB7Q29udGV4dE1lbnV9IGZyb20gJy4vY29udGV4dC1tZW51L2NvbnRleHQtbWVudSdcblxuZXhwb3J0IGNsYXNzIFRleHREcmFnSGFuZGxlcntcblxuICAgIHRyZWVEZXNpZ25lcjtcbiAgICBkYXRhO1xuICAgIGNvbmZpZztcblxuICAgIGRyYWc7XG5cblxuICAgIGNvbnN0cnVjdG9yKHRyZWVEZXNpZ25lciwgZGF0YSl7XG4gICAgICAgIHRoaXMudHJlZURlc2lnbmVyID0gdHJlZURlc2lnbmVyO1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5kcmFnID0gZDMuZHJhZygpXG4gICAgICAgICAgICAuc3ViamVjdChmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgICAgaWYoZD09bnVsbCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAge1xuICAgICAgICAgICAgICAgICAgICAgICAgeDogZXZlbnQueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IGV2ZW50LnlcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHQgPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgeDogdC5hdHRyKFwieFwiKSArIEFwcFV0aWxzLmdldFRyYW5zbGF0aW9uKHQuYXR0cihcInRyYW5zZm9ybVwiKSlbMF0sXG4gICAgICAgICAgICAgICAgICAgIHk6IHQuYXR0cihcInlcIikgKyBBcHBVdGlscy5nZXRUcmFuc2xhdGlvbih0LmF0dHIoXCJ0cmFuc2Zvcm1cIikpWzFdXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oXCJzdGFydFwiLCBmdW5jdGlvbihkKXtcbiAgICAgICAgICAgICAgICBzZWxmLmRyYWdTdGFydGVkLmNhbGwodGhpcyxkLCBzZWxmKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbihcImRyYWdcIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICBzZWxmLm9uRHJhZy5jYWxsKHRoaXMsIGQsIHNlbGYpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbihcImVuZFwiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHNlbGYuZHJhZ0VuZGVkLmNhbGwodGhpcywgZCwgc2VsZik7XG4gICAgICAgICAgICB9KVxuICAgIH1cblxuXG4gICAgZHJhZ1N0YXJ0ZWQoZCxzZWxmKSB7XG4gICAgICAgIC8vIHNlbGYudHJlZURlc2lnbmVyLmxheW91dC5kaXNhYmxlQXV0b0xheW91dCgpO1xuICAgICAgICBDb250ZXh0TWVudS5oaWRlKCk7XG4gICAgICAgIHZhciB0ZXh0ID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICBpZighdGV4dC5jbGFzc2VkKFwic2VsZWN0ZWRcIikpe1xuICAgICAgICAgICAgc2VsZi50cmVlRGVzaWduZXIuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNlbGYudHJlZURlc2lnbmVyLnNlbGVjdFRleHQoZCk7XG4gICAgICAgIHRleHQuY2xhc3NlZChcInNlbGVjdGVkIGRyYWdnaW5nXCIsIHRydWUpO1xuICAgICAgICBzZWxmLnNlbGVjdGVkTm9kZXMgPSBzZWxmLnRyZWVEZXNpZ25lci5nZXRTZWxlY3RlZE5vZGVzKCk7XG4gICAgICAgIHNlbGYucHJldkRyYWdFdmVudCA9IGQzLmV2ZW50O1xuICAgICAgICBzZWxmLmRyYWdFdmVudENvdW50ID0gMDtcbiAgICB9XG5cbiAgICBvbkRyYWcoZHJhZ2dlZFRleHQsIHNlbGYpe1xuICAgICAgICBpZihzZWxmLmRyYWdFdmVudENvdW50PT0yKXtcbiAgICAgICAgICAgIHNlbGYuZGF0YS5zYXZlU3RhdGUoKTtcbiAgICAgICAgfVxuICAgICAgICBzZWxmLmRyYWdFdmVudENvdW50Kys7XG5cbiAgICAgICAgdmFyIGR4ID0gZDMuZXZlbnQueCAtIHNlbGYucHJldkRyYWdFdmVudC54O1xuICAgICAgICB2YXIgZHkgPSBkMy5ldmVudC55LSBzZWxmLnByZXZEcmFnRXZlbnQueTtcblxuICAgICAgICBkcmFnZ2VkVGV4dC5sb2NhdGlvbi5tb3ZlKGR4LCBkeSk7XG4gICAgICAgIHNlbGYudHJlZURlc2lnbmVyLnVwZGF0ZVRleHRQb3NpdGlvbihkcmFnZ2VkVGV4dCk7XG5cbiAgICAgICAgc2VsZi5wcmV2RHJhZ0V2ZW50ID0gZDMuZXZlbnQ7XG4gICAgICAgIHNlbGYudHJlZURlc2lnbmVyLnVwZGF0ZVBsb3R0aW5nUmVnaW9uU2l6ZSgpO1xuICAgIH1cblxuICAgIGRyYWdFbmRlZChkcmFnZ2VkTm9kZSwgc2VsZil7XG4gICAgICAgICBkMy5zZWxlY3QodGhpcykuY2xhc3NlZChcImRyYWdnaW5nXCIsIGZhbHNlKTtcbiAgICB9XG5cbn1cblxuXG4iLCJpbXBvcnQgKiBhcyBkMyBmcm9tICcuL2QzJ1xuaW1wb3J0IHtVdGlsc30gZnJvbSAnc2QtdXRpbHMnXG5cbmV4cG9ydCBjbGFzcyBUb29sdGlwIHtcbiAgICBzdGF0aWMgZ2V0Q29udGFpbmVyKCl7XG4gICAgICAgIHJldHVybiBkMy5zZWxlY3QoXCJib2R5XCIpLnNlbGVjdE9yQXBwZW5kKCdkaXYuc2QtdG9vbHRpcCcpO1xuICAgIH1cblxuICAgIHN0YXRpYyBzaG93KGh0bWwsIHhPZmZzZXQgPSA1LCB5T2Zmc2V0ID0gMjgsIGV2ZW50LCBkdXJhdGlvbj1udWxsKSB7XG4gICAgICAgIHZhciBjb250YWluZXIgPSBUb29sdGlwLmdldENvbnRhaW5lcigpXG4gICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIDApO1xuICAgICAgICBjb250YWluZXIudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24oMjAwKVxuICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCAuOTgpO1xuICAgICAgICBjb250YWluZXIuaHRtbChodG1sKTtcbiAgICAgICAgVG9vbHRpcC51cGRhdGVQb3NpdGlvbih4T2Zmc2V0LCB5T2Zmc2V0LCBldmVudCk7XG4gICAgICAgIGlmKGR1cmF0aW9uKXtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBUb29sdGlwLmhpZGUoKTtcbiAgICAgICAgICAgIH0sIGR1cmF0aW9uKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIHVwZGF0ZVBvc2l0aW9uKHhPZmZzZXQgPSA1LCB5T2Zmc2V0ID0gMjgsIGV2ZW50KSB7XG4gICAgICAgIGV2ZW50ID0gZXZlbnQgfHwgZDMuZXZlbnQ7XG4gICAgICAgIFRvb2x0aXAuZ2V0Q29udGFpbmVyKClcbiAgICAgICAgICAgIC5zdHlsZShcImxlZnRcIiwgKGV2ZW50LnBhZ2VYICsgeE9mZnNldCkgKyBcInB4XCIpXG4gICAgICAgICAgICAuc3R5bGUoXCJ0b3BcIiwgKGV2ZW50LnBhZ2VZIC0geU9mZnNldCkgKyBcInB4XCIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBoaWRlKGR1cmF0aW9uID0gNTAwKSB7XG4gICAgICAgIHZhciB0ID0gVG9vbHRpcC5nZXRDb250YWluZXIoKTtcbiAgICAgICAgaWYoZHVyYXRpb24pe1xuICAgICAgICAgICAgdCA9IHQudHJhbnNpdGlvbigpLmR1cmF0aW9uKGR1cmF0aW9uKVxuICAgICAgICB9XG4gICAgICAgIHQuc3R5bGUoXCJvcGFjaXR5XCIsIDApO1xuICAgIH1cblxuICAgIHN0YXRpYyBhdHRhY2godGFyZ2V0LCBodG1sT3JGbiwgeE9mZnNldCwgeU9mZnNldCkge1xuICAgICAgICB0YXJnZXQub24oJ21vdXNlb3ZlcicsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICB2YXIgaHRtbCA9IG51bGw7XG4gICAgICAgICAgICBpZiAoVXRpbHMuaXNGdW5jdGlvbihodG1sT3JGbikpIHtcbiAgICAgICAgICAgICAgICBodG1sID0gaHRtbE9yRm4oZCwgaSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGh0bWwgPSBodG1sT3JGbjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGh0bWwgIT09IG51bGwgJiYgaHRtbCAhPT0gdW5kZWZpbmVkICYmIGh0bWwgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgVG9vbHRpcC5zaG93KGh0bWwsIHhPZmZzZXQsIHlPZmZzZXQpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgVG9vbHRpcC5oaWRlKDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pLm9uKCdtb3VzZW1vdmUnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgVG9vbHRpcC51cGRhdGVQb3NpdGlvbih4T2Zmc2V0LCB5T2Zmc2V0KTtcbiAgICAgICAgfSkub24oXCJtb3VzZW91dFwiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgVG9vbHRpcC5oaWRlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCAqIGFzIGQzIGZyb20gXCIuL2QzXCI7XG5pbXBvcnQge1V0aWxzfSBmcm9tIFwic2QtdXRpbHNcIjtcbmltcG9ydCB7QXBwVXRpbHN9IGZyb20gXCIuL2FwcC11dGlsc1wiO1xuaW1wb3J0IHtkb21haW4gYXMgbW9kZWx9IGZyb20gXCJzZC1tb2RlbFwiO1xuaW1wb3J0IHtDb250ZXh0TWVudX0gZnJvbSBcIi4vY29udGV4dC1tZW51L2NvbnRleHQtbWVudVwiO1xuaW1wb3J0IHtNYWluQ29udGV4dE1lbnV9IGZyb20gXCIuL2NvbnRleHQtbWVudS9tYWluLWNvbnRleHQtbWVudVwiO1xuaW1wb3J0IHtOb2RlQ29udGV4dE1lbnV9IGZyb20gXCIuL2NvbnRleHQtbWVudS9ub2RlLWNvbnRleHQtbWVudVwiO1xuaW1wb3J0IHtMYXlvdXR9IGZyb20gXCIuL2xheW91dFwiO1xuaW1wb3J0IHtOb2RlRHJhZ0hhbmRsZXJ9IGZyb20gXCIuL25vZGUtZHJhZy1oYW5kbGVyXCI7XG5pbXBvcnQge1Rvb2x0aXB9IGZyb20gXCIuL3Rvb2x0aXBcIjtcbmltcG9ydCB7VGVtcGxhdGVzfSBmcm9tIFwiLi90ZW1wbGF0ZXNcIjtcbmltcG9ydCB7VGV4dERyYWdIYW5kbGVyfSBmcm9tIFwiLi90ZXh0LWRyYWctaGFuZGxlclwiO1xuaW1wb3J0IHtUZXh0Q29udGV4dE1lbnV9IGZyb20gXCIuL2NvbnRleHQtbWVudS90ZXh0LWNvbnRleHQtbWVudVwiO1xuaW1wb3J0IHtFZGdlQ29udGV4dE1lbnV9IGZyb20gXCIuL2NvbnRleHQtbWVudS9lZGdlLWNvbnRleHQtbWVudVwiO1xuaW1wb3J0ICogYXMgSGFtbWVyIGZyb20gXCJoYW1tZXJqc1wiO1xuaW1wb3J0IHtpMThufSBmcm9tIFwiLi9pMThuL2kxOG5cIjtcblxuXG5leHBvcnQgY2xhc3MgVHJlZURlc2lnbmVyQ29uZmlnIHtcbiAgICB3aWR0aCA9IHVuZGVmaW5lZDtcbiAgICBoZWlnaHQgPSB1bmRlZmluZWQ7XG4gICAgbWFyZ2luID0ge1xuICAgICAgICBsZWZ0OiAyNSxcbiAgICAgICAgcmlnaHQ6IDI1LFxuICAgICAgICB0b3A6IDI1LFxuICAgICAgICBib3R0b206IDI1XG4gICAgfTtcbiAgICBsbmcgPSAnZW4nO1xuICAgIGxheW91dD0ge1xuICAgICAgICB0eXBlOiAndHJlZScsXG4gICAgICAgIG5vZGVTaXplOiA0MCxcbiAgICAgICAgbGltaXROb2RlUG9zaXRpb25pbmc6IHRydWUsXG4gICAgICAgIGdyaWRIZWlnaHQ6IDc1LFxuICAgICAgICBncmlkV2lkdGg6IDE1MCxcbiAgICAgICAgZWRnZVNsYW50V2lkdGhNYXg6IDIwXG4gICAgfTtcbiAgICBmb250RmFtaWx5ID0gJ3NhbnMtc2VyaWYnO1xuICAgIGZvbnRTaXplID0gJzEycHgnO1xuICAgIGZvbnRXZWlnaHQgPSAnbm9ybWFsJztcbiAgICBmb250U3R5bGUgPSAnbm9ybWFsJztcbiAgICBub2RlID0ge1xuICAgICAgICBzdHJva2VXaWR0aDogJzFweCcsXG4gICAgICAgIG9wdGltYWw6IHtcbiAgICAgICAgICAgIHN0cm9rZTogJyMwMDZmMDAnLFxuICAgICAgICAgICAgc3Ryb2tlV2lkdGg6ICcxLjVweCcsXG4gICAgICAgIH0sXG4gICAgICAgIGxhYmVsOiB7XG4gICAgICAgICAgICBmb250U2l6ZTogJzFlbScsXG4gICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgICAgICB9LFxuICAgICAgICBwYXlvZmY6IHtcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMWVtJyxcbiAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snLFxuICAgICAgICAgICAgbmVnYXRpdmVDb2xvcjogJyNiNjAwMDAnXG4gICAgICAgIH0sXG4gICAgICAgIGRlY2lzaW9uOiB7XG4gICAgICAgICAgICBmaWxsOiAnI2ZmNzc3NycsXG4gICAgICAgICAgICBzdHJva2U6ICcjNjYwMDAwJyxcblxuICAgICAgICAgICAgc2VsZWN0ZWQ6IHtcbiAgICAgICAgICAgICAgICBmaWxsOiAnI2FhMzMzMycsXG4gICAgICAgICAgICAgICAgLy8gc3Ryb2tlOiAnIzY2NjYwMCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY2hhbmNlOiB7XG4gICAgICAgICAgICBmaWxsOiAnI2ZmZmY0NCcsXG4gICAgICAgICAgICBzdHJva2U6ICcjNjY2NjAwJyxcblxuICAgICAgICAgICAgc2VsZWN0ZWQ6IHtcbiAgICAgICAgICAgICAgICBmaWxsOiAnI2FhYWEwMCcsXG4gICAgICAgICAgICAgICAgLy8gc3Ryb2tlOiAnIzY2NjYwMCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdGVybWluYWw6e1xuICAgICAgICAgICAgZmlsbDogJyM0NGZmNDQnLFxuICAgICAgICAgICAgc3Ryb2tlOiAnYmxhY2snLFxuICAgICAgICAgICAgc2VsZWN0ZWQ6IHtcbiAgICAgICAgICAgICAgICBmaWxsOiAnIzAwYWEwMCcsXG4gICAgICAgICAgICAgICAgLy8gc3Ryb2tlOiAnYmxhY2snXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGF5b2ZmOiB7XG4gICAgICAgICAgICAgICAgZm9udFNpemU6ICcxZW0nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snLFxuICAgICAgICAgICAgICAgIG5lZ2F0aXZlQ29sb3I6ICcjYjYwMDAwJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgIH07XG4gICAgZWRnZT17XG4gICAgICAgIHN0cm9rZTogJyM0MjQyNDInLFxuICAgICAgICBzdHJva2VXaWR0aDogJzEuNScsXG4gICAgICAgIG9wdGltYWw6e1xuICAgICAgICAgICAgc3Ryb2tlOiAnIzAwNmYwMCcsXG4gICAgICAgICAgICBzdHJva2VXaWR0aDogJzIuNCcsXG4gICAgICAgIH0sXG4gICAgICAgIHNlbGVjdGVkOntcbiAgICAgICAgICAgIHN0cm9rZTogJyMwNDVhZDEnLFxuICAgICAgICAgICAgc3Ryb2tlV2lkdGg6ICczLjUnLFxuICAgICAgICB9LFxuICAgICAgICBsYWJlbDoge1xuICAgICAgICAgICAgZm9udFNpemU6ICcxZW0nLFxuICAgICAgICAgICAgY29sb3I6ICdiYWNrJ1xuICAgICAgICB9LFxuICAgICAgICBwYXlvZmY6e1xuICAgICAgICAgICAgZm9udFNpemU6ICcxZW0nLFxuICAgICAgICAgICAgY29sb3I6ICdibGFjaycsXG4gICAgICAgICAgICBuZWdhdGl2ZUNvbG9yOiAnI2I2MDAwMCdcbiAgICAgICAgfVxuXG4gICAgfTtcbiAgICBwcm9iYWJpbGl0eSA9IHtcbiAgICAgICAgZm9udFNpemU6ICcxZW0nLFxuICAgICAgICBjb2xvcjogJyMwMDAwZDcnXG4gICAgfTtcbiAgICB0aXRsZSA9IHtcbiAgICAgICAgZm9udFNpemU6ICcxNnB4JyxcbiAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxuICAgICAgICBmb250U3R5bGU6ICdub3JtYWwnLFxuICAgICAgICBjb2xvcjogJyMwMDAwMDAnLFxuICAgICAgICBtYXJnaW46e1xuICAgICAgICAgICAgdG9wOiAxNSxcbiAgICAgICAgICAgIGJvdHRvbTogMTBcbiAgICAgICAgfVxuICAgIH07XG4gICAgZGVzY3JpcHRpb24gPSB7XG4gICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgIGZvbnRTaXplOiAnMTJweCcsXG4gICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcbiAgICAgICAgZm9udFN0eWxlOiAnbm9ybWFsJyxcbiAgICAgICAgY29sb3I6ICcjMDAwMDAwJyxcbiAgICAgICAgbWFyZ2luOntcbiAgICAgICAgICAgIHRvcDogNSxcbiAgICAgICAgICAgIGJvdHRvbTogMTBcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICByZWFkT25seT0gZmFsc2U7XG4gICAgZGlzYWJsZUFuaW1hdGlvbnM9ZmFsc2U7XG4gICAgZm9yY2VGdWxsRWRnZVJlZHJhdz1mYWxzZTtcbiAgICBoaWRlTGFiZWxzPWZhbHNlO1xuICAgIGhpZGVQYXlvZmZzPWZhbHNlO1xuICAgIGhpZGVQcm9iYWJpbGl0aWVzPWZhbHNlO1xuICAgIHJhdz1mYWxzZTtcblxuXG4gICAgcGF5b2ZmTnVtYmVyRm9ybWF0dGVyID0gKHYsIGkpPT4gdjtcbiAgICBwcm9iYWJpbGl0eU51bWJlckZvcm1hdHRlciAgPSAodik9PiB2O1xuXG4gICAgb25Ob2RlU2VsZWN0ZWQgPSAobm9kZSkgPT4ge307XG4gICAgb25FZGdlU2VsZWN0ZWQgPSAoZWRnZSkgPT4ge307XG4gICAgb25UZXh0U2VsZWN0ZWQgPSAodGV4dCkgPT4ge307XG4gICAgb25TZWxlY3Rpb25DbGVhcmVkID0gKCkgPT4ge307XG5cbiAgICBvcGVyYXRpb25zRm9yT2JqZWN0ID0gKG8pID0+IFtdO1xuXG4gICAgcGF5b2ZmTmFtZXMgPSBbbnVsbCwgbnVsbF07XG4gICAgbWF4UGF5b2Zmc1RvRGlzcGxheSA9IDE7XG5cbiAgICBjb25zdHJ1Y3RvcihjdXN0b20pIHtcbiAgICAgICAgaWYgKGN1c3RvbSkge1xuICAgICAgICAgICAgVXRpbHMuZGVlcEV4dGVuZCh0aGlzLCBjdXN0b20pO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBUcmVlRGVzaWduZXIge1xuXG4gICAgY29uZmlnO1xuICAgIGNvbnRhaW5lcjtcbiAgICBkYXRhOyAvL2RhdGEgbW9kZWwgbWFuYWdlclxuICAgIHN2ZztcblxuICAgIGNvbnN0cnVjdG9yKGNvbnRhaW5lciwgZGF0YU1vZGVsLCBjb25maWcpe1xuICAgICAgICB0aGlzLnNldENvbmZpZyhjb25maWcpO1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhTW9kZWw7XG4gICAgICAgIHRoaXMuaW5pdENvbnRhaW5lcihjb250YWluZXIpO1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG5cbiAgICBzZXRDb25maWcoY29uZmlnKSB7XG4gICAgICAgIHRoaXMuY29uZmlnID0gbmV3IFRyZWVEZXNpZ25lckNvbmZpZyhjb25maWcpO1xuICAgICAgICBpZih0aGlzLmxheW91dCl7XG4gICAgICAgICAgICB0aGlzLmxheW91dC5jb25maWc9dGhpcy5jb25maWcubGF5b3V0O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBkYXRlQ3VzdG9tU3R5bGVzKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGluaXQoKXtcblxuICAgICAgICB0aGlzLmluaXRTdmcoKTtcbiAgICAgICAgdGhpcy5pbml0TGF5b3V0KCk7XG4gICAgICAgIHRoaXMuaW5pdEkxOG4oKTtcbiAgICAgICAgdGhpcy5pbml0QnJ1c2goKTtcbiAgICAgICAgdGhpcy5pbml0RWRnZU1hcmtlcnMoKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZUN1c3RvbVN0eWxlcygpO1xuICAgICAgICBpZighdGhpcy5jb25maWcucmVhZE9ubHkpe1xuICAgICAgICAgICAgdGhpcy5pbml0TWFpbkNvbnRleHRNZW51KCk7XG4gICAgICAgICAgICB0aGlzLmluaXROb2RlQ29udGV4dE1lbnUoKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdEVkZ2VDb250ZXh0TWVudSgpO1xuICAgICAgICAgICAgdGhpcy5pbml0Tm9kZURyYWdIYW5kbGVyKCk7XG4gICAgICAgICAgICB0aGlzLmluaXRUZXh0RHJhZ0hhbmRsZXIoKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdFRleHRDb250ZXh0TWVudSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVkcmF3KCk7XG4gICAgfVxuXG4gICAgaW5pdEkxOG4oKSB7XG4gICAgICAgIGkxOG4uaW5pdCh0aGlzLmNvbmZpZy5sbmcpO1xuICAgIH1cblxuXG4gICAgdXBkYXRlQ3VzdG9tU3R5bGVzKCl7XG4gICAgICAgIGQzLnNlbGVjdCgnaGVhZCcpLnNlbGVjdE9yQXBwZW5kKCdzdHlsZSNzZC10cmVlLWRlc2lnbmVyLXN0eWxlJykuaHRtbChUZW1wbGF0ZXMuZ2V0KCd0cmVlRGVzaWduZXJTdHlsZXMnLCB0aGlzLmNvbmZpZykpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBpbml0TGF5b3V0KCl7XG4gICAgICAgIHRoaXMubGF5b3V0ID0gbmV3IExheW91dCh0aGlzLCB0aGlzLmRhdGEsIHRoaXMuY29uZmlnLmxheW91dCk7XG4gICAgfVxuXG4gICAgaW5pdE5vZGVEcmFnSGFuZGxlcigpe1xuICAgICAgICB0aGlzLm5vZGVEcmFnSGFuZGxlciA9IG5ldyBOb2RlRHJhZ0hhbmRsZXIodGhpcywgdGhpcy5kYXRhKTtcbiAgICB9XG5cbiAgICBpbml0VGV4dERyYWdIYW5kbGVyKCl7XG4gICAgICAgIHRoaXMudGV4dERyYWdIYW5kbGVyID0gbmV3IFRleHREcmFnSGFuZGxlcih0aGlzLCB0aGlzLmRhdGEpO1xuICAgIH1cblxuICAgIHJlZHJhdyh3aXRoVHJhbnNpdGlvbnM9ZmFsc2Upe1xuXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgd2l0aFRyYW5zaXRpb25zID0gIXNlbGYuY29uZmlnLmRpc2FibGVBbmltYXRpb25zICYmIHdpdGhUcmFuc2l0aW9ucztcbiAgICAgICAgdGhpcy5yZWRyYXdEaWFncmFtVGl0bGUoKTtcbiAgICAgICAgdGhpcy5yZWRyYXdEaWFncmFtRGVzY3JpcHRpb24oKTtcbiAgICAgICAgdGhpcy51cGRhdGVNYXJnaW4od2l0aFRyYW5zaXRpb25zKTtcbiAgICAgICAgaWYod2l0aFRyYW5zaXRpb25zKXtcbiAgICAgICAgICAgIHNlbGYudHJhbnNpdGlvblByZXYgPSBzZWxmLnRyYW5zaXRpb247XG4gICAgICAgICAgICBzZWxmLnRyYW5zaXRpb24gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVkcmF3Tm9kZXMoKTtcbiAgICAgICAgdGhpcy5yZWRyYXdFZGdlcygpO1xuICAgICAgICB0aGlzLnJlZHJhd0Zsb2F0aW5nVGV4dHMoKTtcbiAgICAgICAgdGhpcy51cGRhdGVWYWxpZGF0aW9uTWVzc2FnZXMoKTtcbiAgICAgICAgaWYod2l0aFRyYW5zaXRpb25zKXtcbiAgICAgICAgICAgIHNlbGYudHJhbnNpdGlvbiA9ICBzZWxmLnRyYW5zaXRpb25QcmV2O1xuICAgICAgICB9XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHNlbGYudXBkYXRlUGxvdHRpbmdSZWdpb25TaXplKCk7XG4gICAgICAgIH0sMTApO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGNvbXB1dGVBdmFpbGFibGVTcGFjZSgpe1xuICAgICAgICB0aGlzLmF2YWlsYWJsZUhlaWdodCA9IEFwcFV0aWxzLnNhbml0aXplSGVpZ2h0KHRoaXMuY29uZmlnLmhlaWdodCwgdGhpcy5jb250YWluZXIsIHRoaXMuY29uZmlnLm1hcmdpbik7XG4gICAgICAgIHRoaXMuYXZhaWxhYmxlV2lkdGggPSBBcHBVdGlscy5zYW5pdGl6ZVdpZHRoKHRoaXMuY29uZmlnLndpZHRoLCB0aGlzLmNvbnRhaW5lciwgdGhpcy5jb25maWcubWFyZ2luKTtcbiAgICB9XG5cbiAgICBpbml0U3ZnKCkge1xuICAgICAgICB2YXIgYyA9IHRoaXM7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5jb21wdXRlQXZhaWxhYmxlU3BhY2UoKTtcbiAgICAgICAgdGhpcy5zdmcgPSB0aGlzLmNvbnRhaW5lci5zZWxlY3RPckFwcGVuZCgnc3ZnLnNkLXRyZWUtZGVzaWduZXInKTtcbiAgICAgICAgdGhpcy5zdmcuYXR0cignd2lkdGgnLCB0aGlzLmF2YWlsYWJsZVdpZHRoKS5hdHRyKCdoZWlnaHQnLCB0aGlzLmF2YWlsYWJsZUhlaWdodCk7XG5cbiAgICAgICAgdGhpcy5tYWluR3JvdXAgPSB0aGlzLnN2Zy5zZWxlY3RPckFwcGVuZCgnZy5tYWluLWdyb3VwJyk7XG4gICAgICAgIHRoaXMudXBkYXRlTWFyZ2luKCk7XG5cblxuICAgICAgICBpZiAoIXRoaXMuY29uZmlnLndpZHRoKSB7XG4gICAgICAgICAgICBkMy5zZWxlY3Qod2luZG93KVxuICAgICAgICAgICAgICAgIC5vbihcInJlc2l6ZS50cmVlLWRlc2lnbmVyXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi51cGRhdGVQbG90dGluZ1JlZ2lvblNpemUoKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5yZWRyYXdEaWFncmFtVGl0bGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBtYyA9IG5ldyBIYW1tZXIuTWFuYWdlcih0aGlzLnN2Zy5ub2RlKCksIHt0b3VjaEFjdGlvbiA6ICdhdXRvJ30pO1xuICAgICAgICBtYy5hZGQobmV3IEhhbW1lci5QcmVzcyh7XG4gICAgICAgICAgICBwb2ludGVyVHlwZTogJ3RvdWNoJ1xuICAgICAgICB9KSk7XG5cbiAgICAgICAgbWMuYWRkKG5ldyBIYW1tZXIuUGluY2goe1xuICAgICAgICAgICAgcG9pbnRlclR5cGU6ICd0b3VjaCdcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIHZhciBjYW5jZWw7XG4gICAgICAgIG1jLm9uKCdwaW5jaHN0YXJ0JywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHNlbGYuZGlzYWJsZUJydXNoKCk7XG4gICAgICAgIH0pXG4gICAgICAgIG1jLm9uKCdwaW5jaCcsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBjYW5jZWwgPSBVdGlscy53YWl0Rm9yRmluYWxFdmVudCgoKT0+c2VsZi5lbmFibGVCcnVzaCgpLCAncGluY2hlbmQnLCA1MDAwKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHVwZGF0ZU1hcmdpbih3aXRoVHJhbnNpdGlvbnMpe1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBtYXJnaW4gPSB0aGlzLmNvbmZpZy5tYXJnaW47XG4gICAgICAgIHZhciBncm91cCA9IHRoaXMubWFpbkdyb3VwO1xuICAgICAgICBpZih3aXRoVHJhbnNpdGlvbnMpe1xuICAgICAgICAgICAgZ3JvdXAgPSBncm91cC50cmFuc2l0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRvcE1hcmdpbiA9IG1hcmdpbi50b3A7XG4gICAgICAgIGlmKHRoaXMuZGlhZ3JhbVRpdGxlfHx0aGlzLmRpYWdyYW1EZXNjcmlwdGlvbil7XG4gICAgICAgICAgICB0aGlzLnRvcE1hcmdpbiA9IHBhcnNlSW50KHRoaXMuZGlhZ3JhbVRpdGxlID8gdGhpcy5jb25maWcudGl0bGUubWFyZ2luLnRvcCA6IDApICsgdGhpcy5nZXRUaXRsZUdyb3VwSGVpZ2h0KClcbiAgICAgICAgICAgICAgICArICBNYXRoLm1heCh0aGlzLnRvcE1hcmdpbiwgcGFyc2VJbnQodGhpcy5jb25maWcudGl0bGUubWFyZ2luLmJvdHRvbSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ3JvdXAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZShcIiArIG1hcmdpbi5sZWZ0ICsgXCIsXCIgKyB0aGlzLnRvcE1hcmdpbiArIFwiKVwiKS5vbihcImVuZFwiLCAoKT0+IHNlbGYudXBkYXRlUGxvdHRpbmdSZWdpb25TaXplKCkpO1xuICAgIH1cblxuICAgIHNldE1hcmdpbihtYXJnaW4sIHdpdGhvdXRTdGF0ZVNhdmluZyl7XG4gICAgICAgIHZhciBzZWxmPXRoaXM7XG4gICAgICAgIGlmKCF3aXRob3V0U3RhdGVTYXZpbmcpe1xuICAgICAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSh7XG4gICAgICAgICAgICAgICAgZGF0YTp7XG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbjogVXRpbHMuY2xvbmUoc2VsZi5jb25maWcubWFyZ2luKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25VbmRvOiAoZGF0YSk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0TWFyZ2luKGRhdGEubWFyZ2luLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uUmVkbzogKGRhdGEpPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldE1hcmdpbihtYXJnaW4sIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIFV0aWxzLmRlZXBFeHRlbmQodGhpcy5jb25maWcubWFyZ2luLCBtYXJnaW4pO1xuICAgICAgICB0aGlzLnJlZHJhd0RpYWdyYW1UaXRsZSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZU1hcmdpbih0cnVlKTtcbiAgICB9XG5cbiAgICBpbml0Q29udGFpbmVyKGNvbnRhaW5lcklkT3JFbGVtKSB7XG4gICAgICAgIGlmIChVdGlscy5pc1N0cmluZyhjb250YWluZXJJZE9yRWxlbSkpIHtcbiAgICAgICAgICAgIHZhciBzZWxlY3RvciA9IGNvbnRhaW5lcklkT3JFbGVtLnRyaW0oKTtcblxuICAgICAgICAgICAgaWYgKCFVdGlscy5zdGFydHNXaXRoKHNlbGVjdG9yLCAnIycpICYmICFVdGlscy5zdGFydHNXaXRoKHNlbGVjdG9yLCAnLicpKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3IgPSAnIycgKyBzZWxlY3RvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyID0gZDMuc2VsZWN0KHNlbGVjdG9yKTtcbiAgICAgICAgfSBlbHNlIGlmKGNvbnRhaW5lcklkT3JFbGVtLl9wYXJlbnRzKXtcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVySWRPckVsZW1cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGQzLnNlbGVjdChjb250YWluZXJJZE9yRWxlbSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVQbG90dGluZ1JlZ2lvblNpemUoKSB7XG4gICAgICAgIHZhciBjaGFuZ2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY29tcHV0ZUF2YWlsYWJsZVNwYWNlKCk7XG4gICAgICAgIHZhciBtYXJnaW4gPSB0aGlzLmNvbmZpZy5tYXJnaW47XG4gICAgICAgIHZhciBzdmdXaWR0aCA9IHRoaXMuc3ZnLmF0dHIoJ3dpZHRoJyk7XG4gICAgICAgIHZhciBzdmdIZWlnaHQgPSB0aGlzLnN2Zy5hdHRyKCdoZWlnaHQnKTtcbiAgICAgICAgdmFyIG1haW5Hcm91cEJveCA9IHRoaXMubWFpbkdyb3VwLm5vZGUoKS5nZXRCQm94KCk7XG4gICAgICAgIHZhciBuZXdTdmdXaWR0aCA9IG1haW5Hcm91cEJveC53aWR0aCttYWluR3JvdXBCb3gueCttYXJnaW4ubGVmdCttYXJnaW4ucmlnaHQ7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmNsYXNzZWQoJ3dpdGgtb3ZlcmZsb3cteCcsIG5ld1N2Z1dpZHRoPj10aGlzLmF2YWlsYWJsZVdpZHRoKTtcbiAgICAgICAgbmV3U3ZnV2lkdGggPSBNYXRoLm1heChuZXdTdmdXaWR0aCwgdGhpcy5hdmFpbGFibGVXaWR0aCk7XG4gICAgICAgIGlmKHN2Z1dpZHRoIT1uZXdTdmdXaWR0aCl7XG4gICAgICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc3ZnLmF0dHIoJ3dpZHRoJywgbmV3U3ZnV2lkdGgpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBuZXdTdmdIZWlnaHQgPSBtYWluR3JvdXBCb3guaGVpZ2h0K21haW5Hcm91cEJveC55K3RoaXMudG9wTWFyZ2luK21hcmdpbi5ib3R0b207XG5cbiAgICAgICAgdGhpcy5jb250YWluZXIuY2xhc3NlZCgnd2l0aC1vdmVyZmxvdy15JywgbmV3U3ZnSGVpZ2h0Pj10aGlzLmF2YWlsYWJsZUhlaWdodCk7XG4gICAgICAgIG5ld1N2Z0hlaWdodCA9IE1hdGgubWF4KG5ld1N2Z0hlaWdodCwgdGhpcy5hdmFpbGFibGVIZWlnaHQpO1xuICAgICAgICBpZihzdmdIZWlnaHQhPW5ld1N2Z0hlaWdodCl7XG4gICAgICAgICAgICBjaGFuZ2VkPXRydWU7XG4gICAgICAgICAgICB0aGlzLnN2Zy5hdHRyKCdoZWlnaHQnLCBuZXdTdmdIZWlnaHQpO1xuICAgICAgICB9XG4gICAgICAgIGlmKGNoYW5nZWQpe1xuICAgICAgICAgICAgdGhpcy51cGRhdGVCcnVzaEV4dGVudCgpXG4gICAgICAgIH1cblxuXG4gICAgfVxuXG4gICAgcmVkcmF3Tm9kZXMoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuXG4gICAgICAgIHZhciBub2Rlc0NvbnRhaW5lciA9IHRoaXMubWFpbkdyb3VwLnNlbGVjdE9yQXBwZW5kKCdnLm5vZGVzJyk7XG4gICAgICAgIHZhciBub2RlcyA9IG5vZGVzQ29udGFpbmVyLnNlbGVjdEFsbCgnLm5vZGUnKS5kYXRhKHRoaXMuZGF0YS5ub2Rlcy5maWx0ZXIoZD0+IWQuJGhpZGRlbiksIChkLGkpPT4gZC4kaWQpO1xuICAgICAgICBub2Rlcy5leGl0KCkucmVtb3ZlKCk7XG4gICAgICAgIHZhciBub2Rlc0VudGVyID0gbm9kZXMuZW50ZXIoKS5hcHBlbmQoJ2cnKVxuICAgICAgICAgICAgLmF0dHIoJ2lkJywgZD0+J25vZGUtJytkLiRpZClcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGQ9PmQudHlwZSsnLW5vZGUgbm9kZScpXG4gICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgZD0+J3RyYW5zbGF0ZSgnICsgZC5sb2NhdGlvbi54ICsgJyAgJyArIGQubG9jYXRpb24ueSArICcpJyk7XG4gICAgICAgIG5vZGVzRW50ZXIuYXBwZW5kKCdwYXRoJyk7XG5cbiAgICAgICAgdmFyIGxhYmVsRW50ZXIgPSBub2Rlc0VudGVyLmFwcGVuZCgndGV4dCcpLmF0dHIoJ2NsYXNzJywgJ2xhYmVsJyk7XG4gICAgICAgIHZhciBwYXlvZmZFbnRlciA9IG5vZGVzRW50ZXIuYXBwZW5kKCd0ZXh0JykuYXR0cignY2xhc3MnLCAncGF5b2ZmIGNvbXB1dGVkJyk7XG4gICAgICAgIHZhciBpbmRpY2F0b3JFbnRlciA9IG5vZGVzRW50ZXIuYXBwZW5kKCd0ZXh0JykuYXR0cignY2xhc3MnLCAnZXJyb3ItaW5kaWNhdG9yJykudGV4dCgnISEnKTtcbiAgICAgICAgdmFyIGFnZ3JlZ2F0ZWRQYXlvZmZFbnRlciA9IG5vZGVzRW50ZXIuYXBwZW5kKCd0ZXh0JykuYXR0cignY2xhc3MnLCAnYWdncmVnYXRlZC1wYXlvZmYnKTtcbiAgICAgICAgdmFyIHByb2JhYmlsaXR5VG9FbnRlckVudGVyID0gbm9kZXNFbnRlci5hcHBlbmQoJ3RleHQnKS5hdHRyKCdjbGFzcycsICdwcm9iYWJpbGl0eS10by1lbnRlcicpO1xuXG4gICAgICAgIHZhciBub2Rlc01lcmdlID0gbm9kZXNFbnRlci5tZXJnZShub2Rlcyk7XG4gICAgICAgIG5vZGVzTWVyZ2UuY2xhc3NlZCgnb3B0aW1hbCcsIChkKT0+c2VsZi5pc09wdGltYWwoZCkpO1xuXG4gICAgICAgIHZhciBub2Rlc01lcmdlVCA9IG5vZGVzTWVyZ2U7XG4gICAgICAgIGlmKHRoaXMudHJhbnNpdGlvbil7XG4gICAgICAgICAgICBub2Rlc01lcmdlVCA9IG5vZGVzTWVyZ2UudHJhbnNpdGlvbigpO1xuICAgICAgICAgICAgbm9kZXNNZXJnZVQub24oJ2VuZCcsICgpPT4gc2VsZi51cGRhdGVQbG90dGluZ1JlZ2lvblNpemUoKSlcbiAgICAgICAgfVxuICAgICAgICBub2Rlc01lcmdlVFxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGQ9Pid0cmFuc2xhdGUoJyArIGQubG9jYXRpb24ueCArICcgICcgKyBkLmxvY2F0aW9uLnkgKyAnKScpXG5cbiAgICAgICAgdmFyIHBhdGggPSBub2Rlc01lcmdlLnNlbGVjdCgncGF0aCcpO1xuICAgICAgICB0aGlzLmxheW91dC5kcmF3Tm9kZVN5bWJvbChwYXRoLHRoaXMudHJhbnNpdGlvbik7XG5cbiAgICAgICAgLypwYXRoXG4gICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCBkPT4ge1xuICAgICAgICAgICAgICAgIC8vIGlmKHNlbGYuaXNOb2RlU2VsZWN0ZWQoZCkpe1xuICAgICAgICAgICAgICAgIC8vICAgICByZXR1cm4gc2VsZi5jb25maWcubm9kZVtkLnR5cGVdLnNlbGVjdGVkLmZpbGxcbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYuY29uZmlnLm5vZGVbZC50eXBlXS5maWxsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0eWxlKCdzdHJva2UnLCBkPT4gc2VsZi5jb25maWcubm9kZVtkLnR5cGVdLnN0cm9rZSlcbiAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlLXdpZHRoJywgZD0+IHtcbiAgICAgICAgICAgICAgICBpZihzZWxmLmNvbmZpZy5ub2RlW2QudHlwZV0uc3Ryb2tlV2lkdGghPT11bmRlZmluZWQpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5jb25maWcubm9kZVtkLnR5cGVdLnN0cm9rZVdpZHRoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5jb25maWcubm9kZS5zdHJva2VXaWR0aDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAqL1xuICAgICAgICB0aGlzLmxheW91dC5ub2RlTGFiZWxQb3NpdGlvbihsYWJlbEVudGVyKTtcbiAgICAgICAgdmFyIGxhYmVsTWVyZ2UgPSBub2Rlc01lcmdlLnNlbGVjdCgndGV4dC5sYWJlbCcpO1xuICAgICAgICBsYWJlbE1lcmdlLmNsYXNzZWQoJ3NkLWhpZGRlbicsIHRoaXMuY29uZmlnLmhpZGVMYWJlbHMpO1xuICAgICAgICB2YXIgbGFiZWxNZXJnZVQgPSBub2Rlc01lcmdlVC5zZWxlY3QoJ3RleHQubGFiZWwnKTtcbiAgICAgICAgbGFiZWxNZXJnZVQuZWFjaCh0aGlzLnVwZGF0ZVRleHRMaW5lcyk7XG4gICAgICAgIHRoaXMubGF5b3V0Lm5vZGVMYWJlbFBvc2l0aW9uKGxhYmVsTWVyZ2VUKVxuICAgICAgICAgICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXG5cbiAgICAgICAgdmFyIHBheW9mZiA9IG5vZGVzTWVyZ2Uuc2VsZWN0KCd0ZXh0LnBheW9mZicpO1xuXG4gICAgICAgIHZhciBwYXlvZmZUc3BhbnMgPSBwYXlvZmYuc2VsZWN0QWxsKCd0c3BhbicpLmRhdGEoZD0+e1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSBkLmRpc3BsYXlWYWx1ZSgnY2hpbGRyZW5QYXlvZmYnKTtcbiAgICAgICAgICAgIHJldHVybiBVdGlscy5pc0FycmF5KGl0ZW0pID8gaXRlbS5maWx0ZXIoaT0+aSAhPT0gdW5kZWZpbmVkKSA6IFtpdGVtXVxuICAgICAgICB9KTtcbiAgICAgICAgcGF5b2ZmVHNwYW5zLmV4aXQoKS5yZW1vdmUoKTtcblxuICAgICAgICB2YXIgcGF5b2ZmVHNwYW5zTSA9IHBheW9mZlRzcGFucy5lbnRlcigpLmFwcGVuZCgndHNwYW4nKS5tZXJnZShwYXlvZmZUc3BhbnMpO1xuICAgICAgICBwYXlvZmZUc3BhbnNNXG4gICAgICAgICAgICAvLyAuYXR0cignZG9taW5hbnQtYmFzZWxpbmUnLCAnaGFuZ2luZycpXG4gICAgICAgICAgICAuYXR0cignZHknLCAoZCxpKT0+aT4wID8gJzEuMWVtJzogdW5kZWZpbmVkKVxuICAgICAgICAgICAgLmF0dHIoJ3gnLCAnMCcpXG4gICAgICAgICAgICAuY2xhc3NlZCgnbmVnYXRpdmUnLCBkPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBkIT09bnVsbCAmJiBkPDA7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNsYXNzZWQoJ3NkLWhpZGRlbicsIHRoaXMuY29uZmlnLmhpZGVQYXlvZmZzIHx8IHRoaXMuY29uZmlnLnJhdylcbiAgICAgICAgICAgIC50ZXh0KChkLCBpKT0+IHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsID0gZFxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbCE9PW51bGwgPyAoaXNOYU4odmFsKSA/IHZhbCA6IHNlbGYuY29uZmlnLnBheW9mZk51bWJlckZvcm1hdHRlcih2YWwsIGkpKTogJydcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB0aGlzLmF0dGFjaFBheW9mZlRvb2x0aXAocGF5b2ZmVHNwYW5zTSk7XG5cblxuICAgICAgICB2YXIgcGF5b2ZmVCA9IHBheW9mZjtcbiAgICAgICAgaWYodGhpcy50cmFuc2l0aW9uKXtcbiAgICAgICAgICAgIHBheW9mZlQgPSBwYXlvZmYudHJhbnNpdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sYXlvdXQubm9kZVBheW9mZlBvc2l0aW9uKHBheW9mZkVudGVyKTtcbiAgICAgICAgdGhpcy5sYXlvdXQubm9kZVBheW9mZlBvc2l0aW9uKHBheW9mZlQpO1xuXG4gICAgICAgIHZhciBhZ2dyZWdhdGVkUGF5b2ZmID0gbm9kZXNNZXJnZS5zZWxlY3QoJ3RleHQuYWdncmVnYXRlZC1wYXlvZmYnKTtcbiAgICAgICAgdmFyIGFnZ3JlZ2F0ZWRQYXlvZmZUc3BhbnMgPSBhZ2dyZWdhdGVkUGF5b2ZmLnNlbGVjdEFsbCgndHNwYW4nKS5kYXRhKGQ9PntcbiAgICAgICAgICAgIGxldCBpdGVtID0gZC5kaXNwbGF5VmFsdWUoJ2FnZ3JlZ2F0ZWRQYXlvZmYnKTtcbiAgICAgICAgICAgIHJldHVybiBVdGlscy5pc0FycmF5KGl0ZW0pID8gaXRlbS5maWx0ZXIoaT0+aSAhPT0gdW5kZWZpbmVkKSA6IFtpdGVtXVxuICAgICAgICB9KTtcbiAgICAgICAgYWdncmVnYXRlZFBheW9mZlRzcGFucy5leGl0KCkucmVtb3ZlKCk7XG4gICAgICAgIHZhciBhZ2dyZWdhdGVkUGF5b2ZmVHNwYW5zTSA9IGFnZ3JlZ2F0ZWRQYXlvZmZUc3BhbnMuZW50ZXIoKS5hcHBlbmQoJ3RzcGFuJykubWVyZ2UoYWdncmVnYXRlZFBheW9mZlRzcGFucylcbiAgICAgICAgICAgIC5hdHRyKCdkeScsIChkLGkpPT5pPjAgPyAnMC45NWVtJzogdW5kZWZpbmVkKVxuICAgICAgICAgICAgLmNsYXNzZWQoJ25lZ2F0aXZlJywgZD0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZCE9PW51bGwgJiYgZDwwO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jbGFzc2VkKCdzZC1oaWRkZW4nLCB0aGlzLmNvbmZpZy5oaWRlUGF5b2ZmcyB8fCB0aGlzLmNvbmZpZy5yYXcpXG4gICAgICAgICAgICAudGV4dCgodmFsLCBpKT0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsIT09bnVsbCA/IChpc05hTih2YWwpID8gdmFsIDogc2VsZi5jb25maWcucGF5b2ZmTnVtYmVyRm9ybWF0dGVyKHZhbCwgaSkpOiAnJ1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5hdHRhY2hQYXlvZmZUb29sdGlwKGFnZ3JlZ2F0ZWRQYXlvZmZUc3BhbnNNLCAnYWdncmVnYXRlZFBheW9mZicpO1xuXG4gICAgICAgIHZhciBhZ2dyZWdhdGVkUGF5b2ZmVCA9IGFnZ3JlZ2F0ZWRQYXlvZmY7XG4gICAgICAgIGlmKHRoaXMudHJhbnNpdGlvbil7XG4gICAgICAgICAgICBhZ2dyZWdhdGVkUGF5b2ZmVCA9IGFnZ3JlZ2F0ZWRQYXlvZmYudHJhbnNpdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sYXlvdXQubm9kZUFnZ3JlZ2F0ZWRQYXlvZmZQb3NpdGlvbihhZ2dyZWdhdGVkUGF5b2ZmRW50ZXIpO1xuICAgICAgICB0aGlzLmxheW91dC5ub2RlQWdncmVnYXRlZFBheW9mZlBvc2l0aW9uKGFnZ3JlZ2F0ZWRQYXlvZmZUKTtcblxuICAgICAgICB2YXIgcHJvYmFiaWxpdHlUb0VudGVyID0gbm9kZXNNZXJnZS5zZWxlY3QoJ3RleHQucHJvYmFiaWxpdHktdG8tZW50ZXInKVxuICAgICAgICAgICAgLnRleHQoZD0+e1xuICAgICAgICAgICAgICAgIHZhciB2YWwgPSBkLmRpc3BsYXlWYWx1ZSgncHJvYmFiaWxpdHlUb0VudGVyJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbCE9PW51bGwgPyAoaXNOYU4odmFsKSA/IHZhbCA6IHNlbGYuY29uZmlnLnByb2JhYmlsaXR5TnVtYmVyRm9ybWF0dGVyKHZhbCkpOiAnJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jbGFzc2VkKCdzZC1oaWRkZW4nLCB0aGlzLmNvbmZpZy5oaWRlUHJvYmFiaWxpdGllcyB8fCB0aGlzLmNvbmZpZy5yYXcpO1xuICAgICAgICBUb29sdGlwLmF0dGFjaChwcm9iYWJpbGl0eVRvRW50ZXIsIGkxOG4udCgndG9vbHRpcC5ub2RlLnByb2JhYmlsaXR5VG9FbnRlcicpKTtcblxuXG4gICAgICAgIHZhciBwcm9iYWJpbGl0eVRvRW50ZXJUID0gcHJvYmFiaWxpdHlUb0VudGVyO1xuICAgICAgICBpZih0aGlzLnRyYW5zaXRpb24pe1xuICAgICAgICAgICAgcHJvYmFiaWxpdHlUb0VudGVyVCA9IHByb2JhYmlsaXR5VG9FbnRlci50cmFuc2l0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sYXlvdXQubm9kZVByb2JhYmlsaXR5VG9FbnRlclBvc2l0aW9uKHByb2JhYmlsaXR5VG9FbnRlckVudGVyKTtcbiAgICAgICAgdGhpcy5sYXlvdXQubm9kZVByb2JhYmlsaXR5VG9FbnRlclBvc2l0aW9uKHByb2JhYmlsaXR5VG9FbnRlclQpO1xuXG5cbiAgICAgICAgdmFyIGluZGljYXRvciA9IG5vZGVzTWVyZ2Uuc2VsZWN0KCd0ZXh0LmVycm9yLWluZGljYXRvcicpO1xuICAgICAgICBpbmRpY2F0b3IuY2xhc3NlZCgnc2QtaGlkZGVuJywgdGhpcy5jb25maWcucmF3KVxuICAgICAgICB0aGlzLmxheW91dC5ub2RlSW5kaWNhdG9yUG9zaXRpb24oaW5kaWNhdG9yRW50ZXIpO1xuICAgICAgICB0aGlzLmxheW91dC5ub2RlSW5kaWNhdG9yUG9zaXRpb24oaW5kaWNhdG9yKTtcblxuICAgICAgICBpZih0aGlzLm5vZGVEcmFnSGFuZGxlcil7XG4gICAgICAgICAgICBub2Rlc01lcmdlLmNhbGwodGhpcy5ub2RlRHJhZ0hhbmRsZXIuZHJhZyk7XG4gICAgICAgIH1cblxuICAgICAgICBub2Rlc01lcmdlLm9uKCdjb250ZXh0bWVudScsIHRoaXMubm9kZUNvbnRleHRNZW51KTtcbiAgICAgICAgbm9kZXNNZXJnZS5vbignZGJsY2xpY2snLCB0aGlzLm5vZGVDb250ZXh0TWVudSlcbiAgICAgICAgbm9kZXNNZXJnZS5lYWNoKGZ1bmN0aW9uKGQsIGkpe1xuICAgICAgICAgICAgdmFyIG5vZGVFbGVtID0gdGhpcztcbiAgICAgICAgICAgIHZhciBtYyA9IG5ldyBIYW1tZXIuTWFuYWdlcihub2RlRWxlbSk7XG4gICAgICAgICAgICBtYy5hZGQobmV3IEhhbW1lci5QcmVzcyh7XG4gICAgICAgICAgICAgICAgcG9pbnRlclR5cGU6ICd0b3VjaCdcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIG1jLm9uKCdwcmVzcycsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgICAgIGlmKGUucG9pbnRlclR5cGU9PSd0b3VjaCcpe1xuICAgICAgICAgICAgICAgICAgICBzZWxmLm5vZGVEcmFnSGFuZGxlci5jYW5jZWxEcmFnKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcblxuXG4gICAgICAgICAgICBpZihkLmZvbGRlZCl7XG4gICAgICAgICAgICAgICAgbGV0IGJ1dHRvbiA9IGQzLnNlbGVjdChub2RlRWxlbSkuc2VsZWN0T3JBcHBlbmQoJ3RleHQuc2QtdW5mb2xkLWJ1dHRvbicpXG4gICAgICAgICAgICAgICAgICAgIC50ZXh0KFwiWytdXCIpXG4gICAgICAgICAgICAgICAgICAgIC5vbignY2xpY2sgZGJjbGljaycsICgpPT5zZWxmLmZvbGRTdWJ0cmVlKGQsIGZhbHNlKSk7XG5cbiAgICAgICAgICAgICAgICBzZWxmLmxheW91dC5ub2RlVW5mb2xkQnV0dG9uUG9zaXRpb24oYnV0dG9uKTtcbiAgICAgICAgICAgICAgICBUb29sdGlwLmF0dGFjaChidXR0b24sIGkxOG4udCgnY29udGV4dE1lbnUubm9kZS51bmZvbGQnKSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBkMy5zZWxlY3Qobm9kZUVsZW0pLnNlbGVjdCgnLnNkLXVuZm9sZC1idXR0b24nKS5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGF0dGFjaFBheW9mZlRvb2x0aXAoc2VsZWN0aW9uLCBwYXlvZmZGaWxlZE5hbWUgPSAncGF5b2ZmJywgb2JqZWN0PSdub2RlJyl7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgVG9vbHRpcC5hdHRhY2goc2VsZWN0aW9uLCAoZCwgaSk9PntcbiAgICAgICAgICAgIGlmKHNlbGYuY29uZmlnLnBheW9mZk5hbWVzLmxlbmd0aD5pICYmIHNlbGYuY29uZmlnLnBheW9mZk5hbWVzW2ldICE9PSBudWxsKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTE4bi50KCd0b29sdGlwLicrb2JqZWN0KycuJytwYXlvZmZGaWxlZE5hbWUrJy5uYW1lZCcse3ZhbHVlOiBkLnBheW9mZiwgbnVtYmVyOiBpKzEsIG5hbWU6IHNlbGYuY29uZmlnLnBheW9mZk5hbWVzW2ldfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpMThuLnQoJ3Rvb2x0aXAuJytvYmplY3QrJy4nK3BheW9mZkZpbGVkTmFtZSsnLmRlZmF1bHQnLHt2YWx1ZTogZC5wYXlvZmYsIG51bWJlcjogc2VsZi5jb25maWcubWF4UGF5b2Zmc1RvRGlzcGxheSA8IDIgPyAnJyA6IGkrMX0pXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHVwZGF0ZVRleHRMaW5lcyhkKXsgLy9oZWxwZXIgbWV0aG9kIGZvciBzcGxpdHRpbmcgdGV4dCB0byB0c3BhbnNcbiAgICAgICAgdmFyIGxpbmVzID0gZC5uYW1lID8gZC5uYW1lLnNwbGl0KCdcXG4nKSA6IFtdO1xuICAgICAgICBsaW5lcy5yZXZlcnNlKCk7XG4gICAgICAgIHZhciB0c3BhbnMgPSBkMy5zZWxlY3QodGhpcykuc2VsZWN0QWxsKCd0c3BhbicpLmRhdGEobGluZXMpO1xuICAgICAgICB0c3BhbnMuZW50ZXIoKS5hcHBlbmQoJ3RzcGFuJylcbiAgICAgICAgICAgIC5tZXJnZSh0c3BhbnMpXG4gICAgICAgICAgICAudGV4dChsPT5sKVxuICAgICAgICAgICAgLmF0dHIoJ2R5JywgKGQsaSk9Pmk+MCA/ICctMS4xZW0nOiB1bmRlZmluZWQpXG4gICAgICAgICAgICAuYXR0cigneCcsICcwJyk7XG5cbiAgICAgICAgdHNwYW5zLmV4aXQoKS5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICBpc09wdGltYWwoZCl7XG4gICAgICAgIHJldHVybiBkLmRpc3BsYXlWYWx1ZSgnb3B0aW1hbCcpO1xuICAgIH1cblxuICAgIHJlZHJhd0VkZ2VzKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBlZGdlc0NvbnRhaW5lciA9IHRoaXMubWFpbkdyb3VwLnNlbGVjdE9yQXBwZW5kKCdnLmVkZ2VzJyk7XG4gICAgICAgIGlmKHNlbGYuY29uZmlnLmZvcmNlRnVsbEVkZ2VSZWRyYXcpe1xuICAgICAgICAgICAgZWRnZXNDb250YWluZXIuc2VsZWN0QWxsKFwiKlwiKS5yZW1vdmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBlZGdlcyA9IGVkZ2VzQ29udGFpbmVyLnNlbGVjdEFsbCgnLmVkZ2UnKS5kYXRhKHRoaXMuZGF0YS5lZGdlcy5maWx0ZXIoZT0+IWUuJGhpZGRlbiksIChkLGkpPT4gZC4kaWQpO1xuICAgICAgICBlZGdlcy5leGl0KCkucmVtb3ZlKCk7XG4gICAgICAgIHZhciBlZGdlc0VudGVyID0gZWRnZXMuZW50ZXIoKS5hcHBlbmQoJ2cnKVxuICAgICAgICAgICAgLmF0dHIoJ2lkJywgZD0+J2VkZ2UtJytkLiRpZClcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdlZGdlJyk7XG5cblxuICAgICAgICBlZGdlc0VudGVyLmFwcGVuZCgncGF0aCcpO1xuICAgICAgICB2YXIgbGFiZWxFbnRlciA9IGVkZ2VzRW50ZXIuYXBwZW5kU2VsZWN0b3IoJ2cubGFiZWwtZ3JvdXAnKTtcbiAgICAgICAgbGFiZWxFbnRlci5hcHBlbmQoJ3RleHQnKS5hdHRyKCdjbGFzcycsICdsYWJlbCcpO1xuICAgICAgICB2YXIgcGF5b2ZmRW50ZXIgPSBlZGdlc0VudGVyLmFwcGVuZCgndGV4dCcpLmF0dHIoJ2NsYXNzJywgJ3BheW9mZicpO1xuICAgICAgICB2YXIgcHJvYmFiaWxpdHlFbnRlciA9IGVkZ2VzRW50ZXIuYXBwZW5kKCd0ZXh0JykuYXR0cignY2xhc3MnLCAncHJvYmFiaWxpdHknKTtcblxuXG4gICAgICAgIHZhciBlZGdlc01lcmdlID0gZWRnZXNFbnRlci5tZXJnZShlZGdlcyk7XG5cblxuICAgICAgICB2YXIgb3B0aW1hbENsYXNzTmFtZSA9ICdvcHRpbWFsJztcbiAgICAgICAgZWRnZXNNZXJnZS5jbGFzc2VkKG9wdGltYWxDbGFzc05hbWUsIChkKT0+c2VsZi5pc09wdGltYWwoZCkpO1xuXG4gICAgICAgIHZhciBlZGdlc01lcmdlVCA9IGVkZ2VzTWVyZ2U7XG4gICAgICAgIGlmKHRoaXMudHJhbnNpdGlvbil7XG4gICAgICAgICAgICBlZGdlc01lcmdlVCA9IGVkZ2VzTWVyZ2UudHJhbnNpdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgZWRnZXNNZXJnZVQuc2VsZWN0KCdwYXRoJylcbiAgICAgICAgICAgIC5hdHRyKCdkJywgZD0+IHRoaXMubGF5b3V0LmVkZ2VMaW5lRChkKSlcbiAgICAgICAgICAgIC8vIC5hdHRyKFwic3Ryb2tlXCIsIFwiYmxhY2tcIilcbiAgICAgICAgICAgIC8vIC5hdHRyKFwic3Ryb2tlLXdpZHRoXCIsIDIpXG4gICAgICAgICAgICAuYXR0cihcImZpbGxcIiwgXCJub25lXCIpXG4gICAgICAgICAgICAuYXR0cihcIm1hcmtlci1lbmRcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICAgIHZhciBzdWZmaXggPSBkMy5zZWxlY3QodGhpcy5wYXJlbnROb2RlKS5jbGFzc2VkKCdzZWxlY3RlZCcpID8gJy1zZWxlY3RlZCcgOiAoc2VsZi5pc09wdGltYWwoZCk/Jy1vcHRpbWFsJzonJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwidXJsKCNhcnJvd1wiKyBzdWZmaXgrXCIpXCJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gLmF0dHIoXCJzaGFwZS1yZW5kZXJpbmdcIiwgXCJvcHRpbWl6ZVF1YWxpdHlcIilcblxuXG4gICAgICAgIGVkZ2VzTWVyZ2Uub24oJ2NsaWNrJywgZD0+e1xuICAgICAgICAgICAgc2VsZi5zZWxlY3RFZGdlKGQsIHRydWUpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubGF5b3V0LmVkZ2VMYWJlbFBvc2l0aW9uKGxhYmVsRW50ZXIpO1xuICAgICAgICBlZGdlc01lcmdlVC5zZWxlY3QoJ3RleHQubGFiZWwnKS5lYWNoKHRoaXMudXBkYXRlVGV4dExpbmVzKTtcbiAgICAgICAgdmFyIGxhYmVsTWVyZ2UgPSBlZGdlc01lcmdlLnNlbGVjdCgnZy5sYWJlbC1ncm91cCcpO1xuICAgICAgICBsYWJlbE1lcmdlLmNsYXNzZWQoJ3NkLWhpZGRlbicsIHRoaXMuY29uZmlnLmhpZGVMYWJlbHMpO1xuICAgICAgICB2YXIgbGFiZWxNZXJnZVQgPSBlZGdlc01lcmdlVC5zZWxlY3QoJ2cubGFiZWwtZ3JvdXAnKTtcbiAgICAgICAgdGhpcy5sYXlvdXQuZWRnZUxhYmVsUG9zaXRpb24obGFiZWxNZXJnZVQpO1xuICAgICAgICAgICAgLy8gLnRleHQoZD0+ZC5uYW1lKTtcblxuICAgICAgICB2YXIgcGF5b2ZmID0gZWRnZXNNZXJnZS5zZWxlY3QoJ3RleHQucGF5b2ZmJyk7XG5cbiAgICAgICAgdmFyIHBheW9mZlRzcGFucyA9IHBheW9mZi5zZWxlY3RBbGwoJ3RzcGFuJykuZGF0YShkID0+IHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gZC5kaXNwbGF5VmFsdWUoJ3BheW9mZicpO1xuICAgICAgICAgICAgcmV0dXJuIFV0aWxzLmlzQXJyYXkoaXRlbSkgPyBpdGVtLnNsaWNlKDAsIE1hdGgubWluKGl0ZW0ubGVuZ3RoLCBzZWxmLmNvbmZpZy5tYXhQYXlvZmZzVG9EaXNwbGF5KSkubWFwKF89PmQpIDogW2RdO1xuICAgICAgICB9KTtcbiAgICAgICAgcGF5b2ZmVHNwYW5zLmV4aXQoKS5yZW1vdmUoKTtcblxuICAgICAgICB2YXIgcGF5b2ZmVHNwYW5zTSA9IHBheW9mZlRzcGFucy5lbnRlcigpLmFwcGVuZCgndHNwYW4nKS5tZXJnZShwYXlvZmZUc3BhbnMpO1xuICAgICAgICBwYXlvZmZUc3BhbnNNXG4gICAgICAgIC8vIC5hdHRyKCdkb21pbmFudC1iYXNlbGluZScsICdoYW5naW5nJylcbiAgICAgICAgICAgIC5hdHRyKCdkeScsIChkLGkpPT5pPjAgPyAnMS4xZW0nOiB1bmRlZmluZWQpXG4gICAgICAgICAgICAvLyAuYXR0cigneCcsICcwJylcblxuICAgICAgICAgICAgLy8gLmF0dHIoJ2RvbWluYW50LWJhc2VsaW5lJywgJ2hhbmdpbmcnKVxuICAgICAgICAgICAgLmNsYXNzZWQoJ25lZ2F0aXZlJywgKGQsIGkpPT4ge1xuICAgICAgICAgICAgICAgIHZhciB2YWwgPSBkLmRpc3BsYXlQYXlvZmYodW5kZWZpbmVkLCBpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsIT09bnVsbCAmJiB2YWw8MDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2xhc3NlZCgnc2QtaGlkZGVuJywgdGhpcy5jb25maWcuaGlkZVBheW9mZnMpXG4gICAgICAgICAgICAvLyAudGV4dChkPT4gaXNOYU4oZC5wYXlvZmYpID8gZC5wYXlvZmYgOiBzZWxmLmNvbmZpZy5wYXlvZmZOdW1iZXJGb3JtYXR0ZXIoZC5wYXlvZmYpKVxuICAgICAgICAgICAgLnRleHQoKGQsIGkpPT57XG4gICAgICAgICAgICAgICAgaWYodGhpcy5jb25maWcucmF3KXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQucGF5b2ZmW2ldO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gZC5kaXNwbGF5VmFsdWUoJ3BheW9mZicpO1xuICAgICAgICAgICAgICAgIGxldCBpdGVtcyA9IFV0aWxzLmlzQXJyYXkoaXRlbSkgPyBpdGVtIDogW2l0ZW1dO1xuXG4gICAgICAgICAgICAgICAgbGV0IHZhbCA9IGl0ZW1zW2ldO1xuICAgICAgICAgICAgICAgIGlmICh2YWwgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc05hTih2YWwpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5jb25maWcucGF5b2ZmTnVtYmVyRm9ybWF0dGVyKHZhbCwgaSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKFV0aWxzLmlzU3RyaW5nKHZhbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoZC5wYXlvZmZbaV0gIT09IG51bGwgJiYgIWlzTmFOKGQucGF5b2ZmW2ldKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYuY29uZmlnLnBheW9mZk51bWJlckZvcm1hdHRlcihkLnBheW9mZltpXSwgaSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZC5wYXlvZmZbaV07XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIFRvb2x0aXAuYXR0YWNoKHBheW9mZlRzcGFuc00sIChkLCBpKT0+e1xuICAgICAgICAgICAgaWYoc2VsZi5jb25maWcucGF5b2ZmTmFtZXMubGVuZ3RoPmkgJiYgc2VsZi5jb25maWcucGF5b2ZmTmFtZXNbaV0gIT09IG51bGwpe1xuICAgICAgICAgICAgICAgIHJldHVybiBpMThuLnQoJ3Rvb2x0aXAuZWRnZS5wYXlvZmYubmFtZWQnLHt2YWx1ZTogZC5wYXlvZmZbaV0sIG51bWJlcjogaSsxLCBuYW1lOiBzZWxmLmNvbmZpZy5wYXlvZmZOYW1lc1tpXX0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaTE4bi50KCd0b29sdGlwLmVkZ2UucGF5b2ZmLmRlZmF1bHQnLHt2YWx1ZTogZC5wYXlvZmZbaV0sIG51bWJlcjogc2VsZi5jb25maWcubWF4UGF5b2Zmc1RvRGlzcGxheSA8IDIgPyAnJyA6IGkrMX0pXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBwYXlvZmZUZXh0VCA9IHBheW9mZjtcbiAgICAgICAgaWYodGhpcy50cmFuc2l0aW9uKXtcbiAgICAgICAgICAgIHBheW9mZlRleHRUID0gcGF5b2ZmLnRyYW5zaXRpb24oKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxheW91dC5lZGdlUGF5b2ZmUG9zaXRpb24ocGF5b2ZmRW50ZXIpO1xuICAgICAgICB0aGlzLmxheW91dC5lZGdlUGF5b2ZmUG9zaXRpb24ocGF5b2ZmVGV4dFQpO1xuXG4gICAgICAgIFRvb2x0aXAuYXR0YWNoKGVkZ2VzTWVyZ2Uuc2VsZWN0KCd0ZXh0LnByb2JhYmlsaXR5JyksIGQ9PmkxOG4udCgndG9vbHRpcC5lZGdlLnByb2JhYmlsaXR5Jyx7dmFsdWU6IGQucHJvYmFiaWxpdHk9PT0gdW5kZWZpbmVkID8gZC5kaXNwbGF5UHJvYmFiaWxpdHkoKSA6IGQucHJvYmFiaWxpdHl9KSk7XG5cbiAgICAgICAgZWRnZXNNZXJnZS5zZWxlY3QoJ3RleHQucHJvYmFiaWxpdHknKVxuICAgICAgICAgICAgLmNsYXNzZWQoJ3NkLWhpZGRlbicsIHRoaXMuY29uZmlnLmhpZGVQcm9iYWJpbGl0aWVzKTtcbiAgICAgICAgdmFyIHByb2JhYmlsaXR5TWVyZ2UgPSBlZGdlc01lcmdlLnNlbGVjdCgndGV4dC5wcm9iYWJpbGl0eScpO1xuICAgICAgICBwcm9iYWJpbGl0eU1lcmdlXG4gICAgICAgICAgICAuYXR0cigndGV4dC1hbmNob3InLCAnZW5kJylcbiAgICAgICAgICAgIC50ZXh0KGQ9PntcbiAgICAgICAgICAgICAgICBpZih0aGlzLmNvbmZpZy5yYXcpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC5wcm9iYWJpbGl0eTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHZhbCA9IGQuZGlzcGxheVByb2JhYmlsaXR5KCk7XG5cbiAgICAgICAgICAgICAgICBpZih2YWwhPT1udWxsKXtcbiAgICAgICAgICAgICAgICAgICAgaWYoIWlzTmFOKHZhbCkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYuY29uZmlnLnByb2JhYmlsaXR5TnVtYmVyRm9ybWF0dGVyKHZhbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYoVXRpbHMuaXNTdHJpbmcodmFsKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoZC5wcm9iYWJpbGl0eSE9PW51bGwgJiYgIWlzTmFOKGQucHJvYmFiaWxpdHkpKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5jb25maWcucHJvYmFiaWxpdHlOdW1iZXJGb3JtYXR0ZXIoZC5wcm9iYWJpbGl0eSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZC5wcm9iYWJpbGl0eTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB2YXIgcHJvYmFiaWxpdHlNZXJnZVQgPSBwcm9iYWJpbGl0eU1lcmdlO1xuICAgICAgICBpZih0aGlzLnRyYW5zaXRpb24pe1xuICAgICAgICAgICAgcHJvYmFiaWxpdHlNZXJnZVQgPSBwcm9iYWJpbGl0eU1lcmdlLnRyYW5zaXRpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubGF5b3V0LmVkZ2VQcm9iYWJpbGl0eVBvc2l0aW9uKHByb2JhYmlsaXR5RW50ZXIpO1xuICAgICAgICB0aGlzLmxheW91dC5lZGdlUHJvYmFiaWxpdHlQb3NpdGlvbihwcm9iYWJpbGl0eU1lcmdlVCk7XG5cblxuICAgICAgICBlZGdlc0NvbnRhaW5lci5zZWxlY3RBbGwoJy5lZGdlLicrb3B0aW1hbENsYXNzTmFtZSkucmFpc2UoKTtcblxuICAgICAgICBlZGdlc01lcmdlLm9uKCdjb250ZXh0bWVudScsIHRoaXMuZWRnZUNvbnRleHRNZW51KTtcbiAgICAgICAgZWRnZXNNZXJnZS5vbignZGJsY2xpY2snLCB0aGlzLmVkZ2VDb250ZXh0TWVudSk7XG4gICAgICAgIGVkZ2VzTWVyZ2UuZWFjaChmdW5jdGlvbihkLCBpKXtcbiAgICAgICAgICAgIHZhciBlbGVtID0gdGhpcztcbiAgICAgICAgICAgIHZhciBtYyA9IG5ldyBIYW1tZXIuTWFuYWdlcihlbGVtKTtcbiAgICAgICAgICAgIG1jLmFkZChuZXcgSGFtbWVyLlByZXNzKHtcbiAgICAgICAgICAgICAgICBwb2ludGVyVHlwZTogSGFtbWVyLlBPSU5URVJfVE9VQ0hcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICByZWRyYXdGbG9hdGluZ1RleHRzKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cblxuICAgICAgICB2YXIgdGV4dHNDb250YWluZXIgPSB0aGlzLm1haW5Hcm91cC5zZWxlY3RPckFwcGVuZCgnZy5mbG9hdGluZy10ZXh0cycpO1xuICAgICAgICB2YXIgdGV4dHMgPSB0ZXh0c0NvbnRhaW5lci5zZWxlY3RBbGwoJy5mbG9hdGluZy10ZXh0JykuZGF0YSh0aGlzLmRhdGEudGV4dHMsIChkLGkpPT4gZC4kaWQpO1xuICAgICAgICB0ZXh0cy5leGl0KCkucmVtb3ZlKCk7XG4gICAgICAgIHZhciB0ZXh0c0VudGVyID0gdGV4dHMuZW50ZXIoKS5hcHBlbmRTZWxlY3RvcignZy5mbG9hdGluZy10ZXh0JylcbiAgICAgICAgICAgIC5hdHRyKCdpZCcsIGQ9Pid0ZXh0LScrZC4kaWQpO1xuXG5cbiAgICAgICAgdmFyIHJlY3RXaWR0aCA9IDQwO1xuICAgICAgICB2YXIgcmVjdEhlaWdodCA9IDIwO1xuXG4gICAgICAgIHRleHRzRW50ZXIuYXBwZW5kKCdyZWN0JykuYXR0cigneCcsIC01KS5hdHRyKCd5JywgLTE2KS5hdHRyKCdmaWxsLW9wYWNpdHknLCAwKTtcbiAgICAgICAgdGV4dHNFbnRlci5hcHBlbmQoJ3RleHQnKTtcblxuICAgICAgICB2YXIgdGV4dHNNZXJnZSA9IHRleHRzRW50ZXIubWVyZ2UodGV4dHMpO1xuICAgICAgICB2YXIgdGV4dHNNZXJnZVQgPSB0ZXh0c01lcmdlO1xuICAgICAgICBpZih0aGlzLnRyYW5zaXRpb24pe1xuICAgICAgICAgICAgdGV4dHNNZXJnZVQgPSB0ZXh0c01lcmdlLnRyYW5zaXRpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRleHRzTWVyZ2VULmF0dHIoJ3RyYW5zZm9ybScsIGQ9Pid0cmFuc2xhdGUoJyArIGQubG9jYXRpb24ueCArICcgICcgKyBkLmxvY2F0aW9uLnkgKyAnKScpO1xuXG4gICAgICAgIHZhciB0c3BhbnMgPSB0ZXh0c01lcmdlLnNlbGVjdCgndGV4dCcpLnNlbGVjdEFsbCgndHNwYW4nKS5kYXRhKGQ9PmQudmFsdWUgPyBkLnZhbHVlLnNwbGl0KCdcXG4nKSA6IFtdKTtcblxuICAgICAgICB0c3BhbnMuZW50ZXIoKS5hcHBlbmQoJ3RzcGFuJylcbiAgICAgICAgICAgIC5tZXJnZSh0c3BhbnMpXG4gICAgICAgICAgICAuaHRtbChsPT5BcHBVdGlscy5yZXBsYWNlVXJscyhBcHBVdGlscy5lc2NhcGVIdG1sKGwpKSlcbiAgICAgICAgICAgIC5hdHRyKCdkeScsIChkLGkpPT5pPjAgPyAnMS4xZW0nOiB1bmRlZmluZWQpXG4gICAgICAgICAgICAuYXR0cigneCcsICcwJyk7XG5cbiAgICAgICAgdHNwYW5zLmV4aXQoKS5yZW1vdmUoKTtcbiAgICAgICAgdGV4dHNNZXJnZS5jbGFzc2VkKCdzZC1lbXB0eScsIGQ9PiFkLnZhbHVlIHx8ICFkLnZhbHVlLnRyaW0oKSk7XG4gICAgICAgIHRleHRzTWVyZ2Uuc2VsZWN0KCdyZWN0JykuYXR0cignd2lkdGgnLCByZWN0V2lkdGgpLmF0dHIoJ2hlaWdodCcsIHJlY3RIZWlnaHQpO1xuXG4gICAgICAgIHRleHRzTWVyZ2UuZWFjaChmdW5jdGlvbihkKXtcbiAgICAgICAgICAgIGlmKCFkLnZhbHVlKXtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgYmIgPSBkMy5zZWxlY3QodGhpcykuc2VsZWN0KCd0ZXh0Jykubm9kZSgpLmdldEJCb3goKTtcbiAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLnNlbGVjdCgncmVjdCcpXG4gICAgICAgICAgICAgICAuYXR0cigneScsIGJiLnktNSlcbiAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIE1hdGgubWF4KGJiLndpZHRoKzEwLCByZWN0V2lkdGgpKVxuICAgICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIE1hdGgubWF4KGJiLmhlaWdodCsxMCwgcmVjdEhlaWdodCkpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmKHRoaXMudGV4dERyYWdIYW5kbGVyKXtcbiAgICAgICAgICAgIHRleHRzTWVyZ2UuY2FsbCh0aGlzLnRleHREcmFnSGFuZGxlci5kcmFnKTtcbiAgICAgICAgfVxuICAgICAgICB0ZXh0c01lcmdlLm9uKCdjb250ZXh0bWVudScsIHRoaXMudGV4dENvbnRleHRNZW51KTtcbiAgICAgICAgdGV4dHNNZXJnZS5vbignZGJsY2xpY2snLCB0aGlzLnRleHRDb250ZXh0TWVudSk7XG4gICAgICAgIHRleHRzTWVyZ2UuZWFjaChmdW5jdGlvbihkLCBpKXtcbiAgICAgICAgICAgIHZhciBlbGVtID0gdGhpcztcbiAgICAgICAgICAgIHZhciBtYyA9IG5ldyBIYW1tZXIuTWFuYWdlcihlbGVtKTtcbiAgICAgICAgICAgIG1jLmFkZChuZXcgSGFtbWVyLlByZXNzKHtcbiAgICAgICAgICAgICAgICBwb2ludGVyVHlwZTogJ3RvdWNoJ1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9KVxuXG4gICAgfVxuXG4gICAgdXBkYXRlVmFsaWRhdGlvbk1lc3NhZ2VzKCkge1xuICAgICAgICB2YXIgbm9kZXMgPSB0aGlzLm1haW5Hcm91cC5zZWxlY3RBbGwoJy5ub2RlJyk7XG4gICAgICAgIG5vZGVzLmNsYXNzZWQoJ2Vycm9yJywgZmFsc2UpO1xuXG4gICAgICAgIHRoaXMuZGF0YS52YWxpZGF0aW9uUmVzdWx0cy5mb3JFYWNoKHZhbGlkYXRpb25SZXN1bHQ9PntcbiAgICAgICAgICAgIGlmKHZhbGlkYXRpb25SZXN1bHQuaXNWYWxpZCgpKXtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHZhbGlkYXRpb25SZXN1bHQub2JqZWN0SWRUb0Vycm9yKS5mb3JFYWNoKGlkPT57XG4gICAgICAgICAgICAgICAgdmFyIGVycm9ycyA9IHZhbGlkYXRpb25SZXN1bHQub2JqZWN0SWRUb0Vycm9yW2lkXTtcbiAgICAgICAgICAgICAgICB2YXIgbm9kZVNlbGVjdGlvbiA9IHRoaXMuZ2V0Tm9kZUQzU2VsZWN0aW9uQnlJZChpZCk7XG4gICAgICAgICAgICAgICAgbm9kZVNlbGVjdGlvbi5jbGFzc2VkKCdlcnJvcicsIHRydWUpO1xuICAgICAgICAgICAgICAgIHZhciB0b29sdGlwSHRtbCA9ICcnO1xuICAgICAgICAgICAgICAgIGVycm9ycy5mb3JFYWNoKGU9PntcbiAgICAgICAgICAgICAgICAgICAgaWYodG9vbHRpcEh0bWwpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcEh0bWwrPSc8YnIvPidcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwSHRtbCs9QXBwVXRpbHMuZ2V0VmFsaWRhdGlvbk1lc3NhZ2UoZSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBUb29sdGlwLmF0dGFjaChub2RlU2VsZWN0aW9uLnNlbGVjdCgnLmVycm9yLWluZGljYXRvcicpLCB0b29sdGlwSHRtbCk7XG5cblxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICBpbml0RWRnZU1hcmtlcnMoKSB7XG4gICAgICAgIHZhciBkZWZzID0gdGhpcy5zdmcuYXBwZW5kKFwic3ZnOmRlZnNcIik7XG5cbiAgICAgICAgdGhpcy5pbml0QXJyb3dNYXJrZXIoXCJhcnJvd1wiKTtcbiAgICAgICAgdGhpcy5pbml0QXJyb3dNYXJrZXIoXCJhcnJvdy1vcHRpbWFsXCIpO1xuICAgICAgICB0aGlzLmluaXRBcnJvd01hcmtlcihcImFycm93LXNlbGVjdGVkXCIpO1xuICAgIH1cblxuICAgIGluaXRBcnJvd01hcmtlcihpZCkge1xuXG4gICAgICAgIHZhciBkZWZzID0gdGhpcy5zdmcuc2VsZWN0KFwiZGVmc1wiKTtcbiAgICAgICAgZGVmcy5hcHBlbmQoXCJtYXJrZXJcIilcbiAgICAgICAgICAgIC5hdHRyKFwiaWRcIixpZClcbiAgICAgICAgICAgIC5hdHRyKFwidmlld0JveFwiLFwiMCAtNSAxMCAxMFwiKVxuICAgICAgICAgICAgLmF0dHIoXCJyZWZYXCIsNSlcbiAgICAgICAgICAgIC5hdHRyKFwicmVmWVwiLDApXG4gICAgICAgICAgICAuYXR0cihcIm1hcmtlcldpZHRoXCIsNClcbiAgICAgICAgICAgIC5hdHRyKFwibWFya2VySGVpZ2h0XCIsNClcbiAgICAgICAgICAgIC5hdHRyKFwib3JpZW50XCIsXCJhdXRvXCIpXG4gICAgICAgICAgICAuYXBwZW5kKFwicGF0aFwiKVxuICAgICAgICAgICAgLmF0dHIoXCJkXCIsIFwiTTAsLTVMMTAsMEwwLDVcIilcbiAgICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIixcImFycm93SGVhZFwiKTtcbiAgICB9XG5cbiAgICB1cGRhdGVCcnVzaEV4dGVudCgpIHtcbiAgICAgICAgdmFyIHNlbGYgPXRoaXM7XG4gICAgICAgIHRoaXMuYnJ1c2guZXh0ZW50KFtbMCwgMF0sIFtzZWxmLnN2Zy5hdHRyKCd3aWR0aCcpLCBzZWxmLnN2Zy5hdHRyKCdoZWlnaHQnKV1dKTtcbiAgICAgICAgdGhpcy5icnVzaENvbnRhaW5lci5jYWxsKHRoaXMuYnJ1c2gpO1xuICAgIH1cbiAgICBpbml0QnJ1c2goKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICB2YXIgYnJ1c2hDb250YWluZXIgPSBzZWxmLmJydXNoQ29udGFpbmVyID0gdGhpcy5icnVzaENvbnRhaW5lcj0gdGhpcy5zdmcuc2VsZWN0T3JJbnNlcnQoXCJnLmJydXNoXCIsIFwiOmZpcnN0LWNoaWxkXCIpXG4gICAgICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwiYnJ1c2hcIik7XG5cbiAgICAgICAgdmFyIGJydXNoID0gdGhpcy5icnVzaCA9IGQzLmJydXNoKClcbiAgICAgICAgICAgIC5vbihcInN0YXJ0XCIsIGJydXNoc3RhcnQpXG4gICAgICAgICAgICAub24oXCJicnVzaFwiLCBicnVzaG1vdmUpXG4gICAgICAgICAgICAub24oXCJlbmRcIiwgYnJ1c2hlbmQpO1xuXG5cblxuICAgICAgICB0aGlzLnVwZGF0ZUJydXNoRXh0ZW50KCk7XG5cbiAgICAgICAgYnJ1c2hDb250YWluZXIuc2VsZWN0KCcub3ZlcmxheScpLm9uKFwibW91c2Vtb3ZlLmVkZ2VTZWxlY3Rpb25cIiwgbW91c2Vtb3ZlZCk7XG4gICAgICAgIGZ1bmN0aW9uIG1vdXNlbW92ZWQoKSB7XG4gICAgICAgICAgICB2YXIgbSA9IGQzLm1vdXNlKHRoaXMpO1xuICAgICAgICAgICAgdmFyIG1ndCA9IHNlbGYuZ2V0TWFpbkdyb3VwVHJhbnNsYXRpb24oKTtcbiAgICAgICAgICAgIHZhciBtYXJnaW4gPSAxMDtcblxuICAgICAgICAgICAgdmFyIGNsb3Nlc3QgPSBbbnVsbCwgOTk5OTk5OTk5XTtcbiAgICAgICAgICAgIHZhciBjbG9zZUVkZ2VzID0gW107XG4gICAgICAgICAgICBzZWxmLm1haW5Hcm91cC5zZWxlY3RBbGwoJy5lZGdlJykuZWFjaChmdW5jdGlvbihkKXtcbiAgICAgICAgICAgICAgICB2YXIgc2VsZWN0aW9uID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICAgICAgICAgIHNlbGVjdGlvbi5jbGFzc2VkKCdzZC1ob3ZlcicsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB2YXIgcGF0aE5vZGUgPSBzZWxlY3Rpb24uc2VsZWN0KCdwYXRoJykubm9kZSgpO1xuICAgICAgICAgICAgICAgIHZhciBiID0gcGF0aE5vZGUuZ2V0QkJveCgpO1xuICAgICAgICAgICAgICAgIGlmKGIueCttZ3RbMF0gPD1tWzBdICYmIGIueCtiLndpZHRoK21ndFswXSA+PSBtWzBdICYmXG4gICAgICAgICAgICAgICAgICAgYi55K21ndFsxXS1tYXJnaW4gPD1tWzFdICYmIGIueStiLmhlaWdodCttZ3RbMV0rbWFyZ2luID49IG1bMV0pe1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBjcCA9IEFwcFV0aWxzLmNsb3Nlc3RQb2ludChwYXRoTm9kZSwgW21bMF0tbWd0WzBdLCBtWzFdLW1ndFsxXV0pO1xuICAgICAgICAgICAgICAgICAgICBpZihjcC5kaXN0YW5jZSA8IG1hcmdpbiAmJiBjcC5kaXN0YW5jZTxjbG9zZXN0WzFdKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlc3QgPSBbc2VsZWN0aW9uLCBjcC5kaXN0YW5jZV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBzZWxmLmhvdmVyZWRFZGdlID0gbnVsbDtcbiAgICAgICAgICAgIGlmKGNsb3Nlc3RbMF0pe1xuICAgICAgICAgICAgICAgIGNsb3Nlc3RbMF0uY2xhc3NlZCgnc2QtaG92ZXInLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBzZWxmLmhvdmVyZWRFZGdlID0gY2xvc2VzdFswXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gYnJ1c2hzdGFydCgpIHtcbiAgICAgICAgICAgIGlmICghZDMuZXZlbnQuc2VsZWN0aW9uKSByZXR1cm47XG4gICAgICAgICAgICBpZihzZWxmLmhvdmVyZWRFZGdlKXtcbiAgICAgICAgICAgICAgICBzZWxmLnNlbGVjdEVkZ2Uoc2VsZi5ob3ZlcmVkRWRnZS5kYXR1bSgpLCB0cnVlKVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgc2VsZi5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgQ29udGV4dE1lbnUuaGlkZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSGlnaGxpZ2h0IHRoZSBzZWxlY3RlZCBub2Rlcy5cbiAgICAgICAgZnVuY3Rpb24gYnJ1c2htb3ZlKCkge1xuICAgICAgICAgICAgdmFyIHMgPSBkMy5ldmVudC5zZWxlY3Rpb247XG4gICAgICAgICAgICBpZighcylyZXR1cm47XG5cbiAgICAgICAgICAgIHNlbGYubWFpbkdyb3VwLnNlbGVjdEFsbChcIi5ub2RlXCIpLmNsYXNzZWQoJ3NlbGVjdGVkJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICB2YXIgbWFpbkdyb3VwVHJhbnNsYXRpb24gPSBzZWxmLmdldE1haW5Hcm91cFRyYW5zbGF0aW9uKCk7XG4gICAgICAgICAgICAgICAgdmFyIHggPSBkLmxvY2F0aW9uLngrbWFpbkdyb3VwVHJhbnNsYXRpb25bMF07XG4gICAgICAgICAgICAgICAgdmFyIHkgPSBkLmxvY2F0aW9uLnkrbWFpbkdyb3VwVHJhbnNsYXRpb25bMV07XG4gICAgICAgICAgICAgICAgdmFyIG5vZGVTaXplID0gc2VsZi5jb25maWcubGF5b3V0Lm5vZGVTaXplO1xuICAgICAgICAgICAgICAgIHZhciBvZmZzZXQgPSBub2RlU2l6ZSowLjI1O1xuICAgICAgICAgICAgICAgIHJldHVybiBzWzBdWzBdIDw9IHgrb2Zmc2V0ICYmIHgtb2Zmc2V0IDw9IHNbMV1bMF1cbiAgICAgICAgICAgICAgICAgICAgJiYgc1swXVsxXSA8PSB5K29mZnNldCAmJiB5LW9mZnNldCA8PSBzWzFdWzFdO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgdGhlIGJydXNoIGlzIGVtcHR5LCBzZWxlY3QgYWxsIGNpcmNsZXMuXG4gICAgICAgIGZ1bmN0aW9uIGJydXNoZW5kKCkge1xuICAgICAgICAgICAgaWYgKCFkMy5ldmVudC5zZWxlY3Rpb24pIHJldHVybjtcbiAgICAgICAgICAgIGJydXNoLm1vdmUoYnJ1c2hDb250YWluZXIsIG51bGwpO1xuXG4gICAgICAgICAgICB2YXIgc2VsZWN0ZWROb2RlcyA9IHNlbGYuZ2V0U2VsZWN0ZWROb2RlcygpO1xuICAgICAgICAgICAgaWYoc2VsZWN0ZWROb2RlcyAmJiBzZWxlY3RlZE5vZGVzLmxlbmd0aCA9PT0gMSl7XG4gICAgICAgICAgICAgICAgc2VsZi5zZWxlY3ROb2RlKHNlbGVjdGVkTm9kZXNbMF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gaWYgKCFkMy5ldmVudC5zZWxlY3Rpb24pIHNlbGYubWFpbkdyb3VwLnNlbGVjdEFsbChcIi5zZWxlY3RlZFwiKS5jbGFzc2VkKCdzZWxlY3RlZCcsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRpc2FibGVCcnVzaCgpe1xuICAgICAgICBpZighdGhpcy5icnVzaERpc2FibGVkKXtcbiAgICAgICAgICAgIEFwcFV0aWxzLmdyb3dsKGkxOG4udCgnZ3Jvd2wuYnJ1c2hEaXNhYmxlZCcpLCAnaW5mbycsICdsZWZ0JylcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmJydXNoRGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmJydXNoQ29udGFpbmVyLnJlbW92ZSgpO1xuICAgIH1cblxuICAgIGVuYWJsZUJydXNoKCl7XG4gICAgICAgIGlmKHRoaXMuYnJ1c2hEaXNhYmxlZCl7XG4gICAgICAgICAgICBBcHBVdGlscy5ncm93bChpMThuLnQoJ2dyb3dsLmJydXNoRW5hYmxlZCcpLCAnaW5mbycsICdsZWZ0JylcbiAgICAgICAgICAgIHRoaXMuaW5pdEJydXNoKCk7XG4gICAgICAgICAgICB0aGlzLmJydXNoRGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuXG5cbiAgICB9XG5cbiAgICBnZXRNYWluR3JvdXBUcmFuc2xhdGlvbihpbnZlcnQpIHtcbiAgICAgICAgdmFyIHRyYW5zbGF0aW9uID0gQXBwVXRpbHMuZ2V0VHJhbnNsYXRpb24odGhpcy5tYWluR3JvdXAuYXR0cihcInRyYW5zZm9ybVwiKSk7XG4gICAgICAgIGlmKGludmVydCl7XG4gICAgICAgICAgICB0cmFuc2xhdGlvblswXSA9IC10cmFuc2xhdGlvblswXTtcbiAgICAgICAgICAgIHRyYW5zbGF0aW9uWzFdID0gLXRyYW5zbGF0aW9uWzFdXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRyYW5zbGF0aW9uO1xuICAgIH1cblxuICAgIGluaXROb2RlQ29udGV4dE1lbnUoKSB7XG4gICAgICAgIHRoaXMubm9kZUNvbnRleHRNZW51ID0gbmV3IE5vZGVDb250ZXh0TWVudSh0aGlzLCB0aGlzLmNvbmZpZy5vcGVyYXRpb25zRm9yT2JqZWN0KTtcbiAgICB9XG5cbiAgICBpbml0RWRnZUNvbnRleHRNZW51KCkge1xuICAgICAgICB0aGlzLmVkZ2VDb250ZXh0TWVudSA9IG5ldyBFZGdlQ29udGV4dE1lbnUodGhpcyk7XG4gICAgfVxuXG4gICAgaW5pdFRleHRDb250ZXh0TWVudSgpIHtcbiAgICAgICAgdGhpcy50ZXh0Q29udGV4dE1lbnUgPSBuZXcgVGV4dENvbnRleHRNZW51KHRoaXMpO1xuICAgIH1cblxuXG5cbiAgICBpbml0TWFpbkNvbnRleHRNZW51KCkge1xuICAgICAgICB0aGlzLm1haW5Db250ZXh0TWVudSA9IG5ldyBNYWluQ29udGV4dE1lbnUodGhpcyk7XG4gICAgICAgIHRoaXMuc3ZnLm9uKCdjb250ZXh0bWVudScsdGhpcy5tYWluQ29udGV4dE1lbnUpO1xuICAgICAgICB0aGlzLnN2Zy5vbignZGJsY2xpY2snLHRoaXMubWFpbkNvbnRleHRNZW51KTtcbiAgICB9XG5cbiAgICBhZGRUZXh0KHRleHQpe1xuICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKCk7XG4gICAgICAgIHRoaXMuZGF0YS5hZGRUZXh0KHRleHQpO1xuICAgICAgICB0aGlzLnJlZHJhdygpO1xuICAgICAgICB0aGlzLnNlbGVjdFRleHQodGV4dCk7XG4gICAgfVxuXG4gICAgYWRkTm9kZShub2RlLCBwYXJlbnQsIHJlZHJhdz1mYWxzZSl7XG4gICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoKTtcbiAgICAgICAgdGhpcy5kYXRhLmFkZE5vZGUobm9kZSwgcGFyZW50KTtcbiAgICAgICAgdGhpcy5yZWRyYXcodHJ1ZSk7XG4gICAgICAgIHRoaXMubGF5b3V0LnVwZGF0ZShub2RlKTtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuXG4gICAgYWRkRGVjaXNpb25Ob2RlKHBhcmVudCl7XG4gICAgICAgIHZhciBuZXdOb2RlID0gbmV3IG1vZGVsLkRlY2lzaW9uTm9kZSh0aGlzLmxheW91dC5nZXROZXdDaGlsZExvY2F0aW9uKHBhcmVudCkpO1xuICAgICAgICB0aGlzLmFkZE5vZGUobmV3Tm9kZSwgcGFyZW50KVxuICAgIH1cbiAgICBhZGRDaGFuY2VOb2RlKHBhcmVudCl7XG4gICAgICAgIHZhciBuZXdOb2RlID0gbmV3IG1vZGVsLkNoYW5jZU5vZGUodGhpcy5sYXlvdXQuZ2V0TmV3Q2hpbGRMb2NhdGlvbihwYXJlbnQpKTtcbiAgICAgICAgdGhpcy5hZGROb2RlKG5ld05vZGUsIHBhcmVudClcbiAgICB9XG4gICAgYWRkVGVybWluYWxOb2RlKHBhcmVudCl7XG4gICAgICAgIHZhciBuZXdOb2RlID0gbmV3IG1vZGVsLlRlcm1pbmFsTm9kZSh0aGlzLmxheW91dC5nZXROZXdDaGlsZExvY2F0aW9uKHBhcmVudCkpO1xuICAgICAgICB0aGlzLmFkZE5vZGUobmV3Tm9kZSwgcGFyZW50KVxuICAgIH1cblxuICAgIGluamVjdE5vZGUobm9kZSwgZWRnZSl7XG4gICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoKTtcbiAgICAgICAgdGhpcy5kYXRhLmluamVjdE5vZGUobm9kZSwgZWRnZSk7XG4gICAgICAgIHRoaXMucmVkcmF3KCk7XG4gICAgICAgIHRoaXMubGF5b3V0LnVwZGF0ZShub2RlKTtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuXG4gICAgaW5qZWN0RGVjaXNpb25Ob2RlKGVkZ2Upe1xuICAgICAgICB2YXIgbmV3Tm9kZSA9IG5ldyBtb2RlbC5EZWNpc2lvbk5vZGUodGhpcy5sYXlvdXQuZ2V0SW5qZWN0ZWROb2RlTG9jYXRpb24oZWRnZSkpO1xuICAgICAgICB0aGlzLmluamVjdE5vZGUobmV3Tm9kZSwgZWRnZSk7XG5cbiAgICB9XG5cbiAgICBpbmplY3RDaGFuY2VOb2RlKGVkZ2Upe1xuICAgICAgICB2YXIgbmV3Tm9kZSA9IG5ldyBtb2RlbC5DaGFuY2VOb2RlKHRoaXMubGF5b3V0LmdldEluamVjdGVkTm9kZUxvY2F0aW9uKGVkZ2UpKTtcbiAgICAgICAgdGhpcy5pbmplY3ROb2RlKG5ld05vZGUsIGVkZ2UpO1xuICAgIH1cblxuICAgIHJlbW92ZU5vZGUobm9kZSkge1xuICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKCk7XG4gICAgICAgIHRoaXMuZGF0YS5yZW1vdmVOb2RlKG5vZGUpO1xuXG5cbiAgICAgICAgaWYoIXRoaXMubGF5b3V0LmlzTWFudWFsTGF5b3V0KCkpe1xuICAgICAgICAgICAgdGhpcy5sYXlvdXQudXBkYXRlKCk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5yZWRyYXcoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbW92ZVNlbGVjdGVkTm9kZXMoKSB7XG4gICAgICAgIHZhciBzZWxlY3RlZE5vZGVzID0gdGhpcy5nZXRTZWxlY3RlZE5vZGVzKCk7XG4gICAgICAgIGlmKCFzZWxlY3RlZE5vZGVzLmxlbmd0aCl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSgpO1xuICAgICAgICB0aGlzLmRhdGEucmVtb3ZlTm9kZXMoc2VsZWN0ZWROb2Rlcyk7XG4gICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgdGhpcy5yZWRyYXcoKTtcbiAgICAgICAgdGhpcy5sYXlvdXQudXBkYXRlKCk7XG4gICAgfVxuXG4gICAgcmVtb3ZlU2VsZWN0ZWRUZXh0cygpe1xuICAgICAgICB2YXIgc2VsZWN0ZWRUZXh0cyA9IHRoaXMuZ2V0U2VsZWN0ZWRUZXh0cygpO1xuXG4gICAgICAgIGlmKCFzZWxlY3RlZFRleHRzLmxlbmd0aCl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSgpO1xuICAgICAgICB0aGlzLmRhdGEucmVtb3ZlVGV4dHMoc2VsZWN0ZWRUZXh0cyk7XG4gICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgdGhpcy5yZWRyYXcoKTtcbiAgICB9XG5cbiAgICBjb3B5Tm9kZShkLCBub3RDbGVhclByZXZTZWxlY3Rpb24pIHtcbiAgICAgICAgdmFyIGNsb25lID0gdGhpcy5kYXRhLmNsb25lU3VidHJlZShkKTtcbiAgICAgICAgaWYobm90Q2xlYXJQcmV2U2VsZWN0aW9uKXtcbiAgICAgICAgICAgIGlmKCF0aGlzLmNvcGllZE5vZGVzKXtcbiAgICAgICAgICAgICAgICB0aGlzLmNvcGllZE5vZGVzPVtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jb3BpZWROb2Rlcy5wdXNoKGNsb25lKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLmNvcGllZE5vZGVzID0gW2Nsb25lXTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgY3V0Tm9kZShkKSB7XG4gICAgICAgIHRoaXMuY29weU5vZGUoZCk7XG4gICAgICAgIHRoaXMucmVtb3ZlTm9kZShkKTtcbiAgICB9XG5cbiAgICBjdXRTZWxlY3RlZE5vZGVzKCl7XG4gICAgICAgIHZhciBzZWxlY3RlZE5vZGVzID0gdGhpcy5nZXRTZWxlY3RlZE5vZGVzKCk7XG4gICAgICAgIHZhciBzZWxlY3RlZFJvb3RzID0gdGhpcy5kYXRhLmZpbmRTdWJ0cmVlUm9vdHMoc2VsZWN0ZWROb2Rlcyk7XG4gICAgICAgIHRoaXMuY29weU5vZGVzKHNlbGVjdGVkUm9vdHMpO1xuICAgICAgICB0aGlzLnJlbW92ZVNlbGVjdGVkTm9kZXMoKTtcbiAgICB9XG5cbiAgICBjb3B5U2VsZWN0ZWROb2RlcygpIHtcbiAgICAgICAgdmFyIHNlbGY7XG4gICAgICAgIHZhciBzZWxlY3RlZE5vZGVzID0gdGhpcy5nZXRTZWxlY3RlZE5vZGVzKCk7XG5cbiAgICAgICAgdmFyIHNlbGVjdGVkUm9vdHMgPSB0aGlzLmRhdGEuZmluZFN1YnRyZWVSb290cyhzZWxlY3RlZE5vZGVzKTtcbiAgICAgICAgdGhpcy5jb3B5Tm9kZXMoc2VsZWN0ZWRSb290cyk7XG5cblxuICAgIH1cblxuICAgIGNvcHlOb2Rlcyhub2Rlcyl7XG4gICAgICAgIHRoaXMuY29waWVkTm9kZXMgPSBub2Rlcy5tYXAoZD0+dGhpcy5kYXRhLmNsb25lU3VidHJlZShkKSk7XG4gICAgfVxuXG5cblxuICAgIHBhc3RlVG9Ob2RlKG5vZGUpIHtcbiAgICAgICAgaWYoIXRoaXMuY29waWVkTm9kZXMgfHwgIXRoaXMuY29waWVkTm9kZXMubGVuZ3RoKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKCk7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgc2VsZi5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICB2YXIgbm9kZXNUb0F0dGFjaCA9IHRoaXMuY29waWVkTm9kZXM7XG4gICAgICAgIHNlbGYuY29weU5vZGVzKHRoaXMuY29waWVkTm9kZXMpO1xuICAgICAgICBub2Rlc1RvQXR0YWNoLmZvckVhY2godG9BdHRhY2g9PntcbiAgICAgICAgICAgIHZhciBhdHRhY2hlZCA9IHRoaXMuZGF0YS5hdHRhY2hTdWJ0cmVlKHRvQXR0YWNoLCBub2RlKS5jaGlsZE5vZGU7XG4gICAgICAgICAgICBpZihhdHRhY2hlZC5mb2xkZWQpe1xuICAgICAgICAgICAgICAgIHNlbGYuZm9sZFN1YnRyZWUoYXR0YWNoZWQsIGF0dGFjaGVkLmZvbGRlZCwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGxvY2F0aW9uID0gc2VsZi5sYXlvdXQuZ2V0TmV3Q2hpbGRMb2NhdGlvbihub2RlKTtcbiAgICAgICAgICAgIGF0dGFjaGVkLm1vdmVUbyhsb2NhdGlvbi54LCBsb2NhdGlvbi55LCB0cnVlKTtcbiAgICAgICAgICAgIHNlbGYubGF5b3V0Lm1vdmVOb2RlVG9FbXB0eVBsYWNlKGF0dGFjaGVkLCBmYWxzZSk7XG4gICAgICAgICAgICBzZWxmLmxheW91dC5maXROb2Rlc0luUGxvdHRpbmdSZWdpb24odGhpcy5kYXRhLmdldEFsbERlc2NlbmRhbnROb2RlcyhhdHRhY2hlZCkpO1xuXG4gICAgICAgICAgICBzZWxmLnNlbGVjdFN1YlRyZWUoYXR0YWNoZWQsIGZhbHNlLCBub2Rlc1RvQXR0YWNoLmxlbmd0aD4xKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYobm9kZS5mb2xkZWQpe1xuICAgICAgICAgICAgc2VsZi5mb2xkU3VidHJlZShub2RlLCBub2RlLmZvbGRlZCwgZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgc2VsZi5yZWRyYXcoKTtcbiAgICAgICAgICAgIHNlbGYubGF5b3V0LnVwZGF0ZSgpO1xuICAgICAgICB9LDEwKVxuXG4gICAgfVxuXG4gICAgcGFzdGVUb05ld0xvY2F0aW9uKHBvaW50KSB7XG4gICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoKTtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBzZWxmLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgIHZhciBub2Rlc1RvQXR0YWNoID0gdGhpcy5jb3BpZWROb2RlcztcbiAgICAgICAgc2VsZi5jb3B5Tm9kZXModGhpcy5jb3BpZWROb2Rlcyk7XG4gICAgICAgIG5vZGVzVG9BdHRhY2guZm9yRWFjaCh0b0F0dGFjaD0+IHtcbiAgICAgICAgICAgIHZhciBhdHRhY2hlZCA9IHRoaXMuZGF0YS5hdHRhY2hTdWJ0cmVlKHRvQXR0YWNoKTtcbiAgICAgICAgICAgIGlmKGF0dGFjaGVkLmZvbGRlZCl7XG4gICAgICAgICAgICAgICAgc2VsZi5mb2xkU3VidHJlZShhdHRhY2hlZCwgYXR0YWNoZWQuZm9sZGVkLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhdHRhY2hlZC5tb3ZlVG8ocG9pbnQueCwgcG9pbnQueSwgdHJ1ZSk7XG4gICAgICAgICAgICBzZWxmLmxheW91dC5tb3ZlTm9kZVRvRW1wdHlQbGFjZShhdHRhY2hlZCwgZmFsc2UpO1xuICAgICAgICAgICAgc2VsZi5sYXlvdXQuZml0Tm9kZXNJblBsb3R0aW5nUmVnaW9uKHRoaXMuZGF0YS5nZXRBbGxEZXNjZW5kYW50Tm9kZXMoYXR0YWNoZWQpKTtcblxuICAgICAgICAgICAgc2VsZi5zZWxlY3RTdWJUcmVlKGF0dGFjaGVkLCBmYWxzZSwgbm9kZXNUb0F0dGFjaC5sZW5ndGg+MSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHNlbGYucmVkcmF3KCk7XG4gICAgICAgICAgICBzZWxmLmxheW91dC51cGRhdGUoKTtcbiAgICAgICAgfSwxMClcblxuICAgIH1cblxuICAgIGNvbnZlcnROb2RlKG5vZGUsIHR5cGVUb0NvbnZlcnRUbyl7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSgpO1xuICAgICAgICB0aGlzLmRhdGEuY29udmVydE5vZGUobm9kZSwgdHlwZVRvQ29udmVydFRvKTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgc2VsZi5yZWRyYXcodHJ1ZSk7XG4gICAgICAgIH0sMTApXG4gICAgfVxuXG4gICAgcGVyZm9ybU9wZXJhdGlvbihvYmplY3QsIG9wZXJhdGlvbil7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSgpO1xuICAgICAgICBvcGVyYXRpb24ucGVyZm9ybShvYmplY3QpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBzZWxmLnJlZHJhdygpO1xuICAgICAgICAgICAgc2VsZi5sYXlvdXQudXBkYXRlKCk7XG4gICAgICAgIH0sMTApXG4gICAgfVxuXG4gICAgZm9sZFN1YnRyZWUobm9kZSwgZm9sZCA9IHRydWUsIHJlZHJhdz10cnVlKXtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBub2RlLmZvbGRlZCA9IGZvbGQ7XG5cbiAgICAgICAgdGhpcy5kYXRhLmdldEFsbERlc2NlbmRhbnROb2Rlcyhub2RlKS5mb3JFYWNoKG49PntcbiAgICAgICAgICAgIG4uJGhpZGRlbiA9IGZvbGQ7XG4gICAgICAgICAgICBuLmZvbGRlZCA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5kYXRhLmdldEFsbERlc2NlbmRhbnRFZGdlcyhub2RlKS5mb3JFYWNoKGU9PmUuJGhpZGRlbiA9IGZvbGQpO1xuXG4gICAgICAgIGlmKCFyZWRyYXcpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHNlbGYucmVkcmF3KCk7XG4gICAgICAgICAgICBzZWxmLmxheW91dC51cGRhdGUoKTtcbiAgICAgICAgfSwxMClcbiAgICB9XG5cbiAgICB1cGRhdGVWaXNpYmlsaXR5KG5vZGUgPSBudWxsKXtcbiAgICAgICAgaWYoIW5vZGUpe1xuICAgICAgICAgICAgdGhpcy5kYXRhLmdldFJvb3RzKCkuZm9yRWFjaChuPT50aGlzLnVwZGF0ZVZpc2liaWxpdHkobikpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYobm9kZS5mb2xkZWQpe1xuICAgICAgICAgICAgdGhpcy5mb2xkU3VidHJlZShub2RlLCB0cnVlLCBmYWxzZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBub2RlLmNoaWxkRWRnZXMuZm9yRWFjaChlID0+IHRoaXMudXBkYXRlVmlzaWJpbGl0eShlLmNoaWxkTm9kZSkpO1xuXG4gICAgfVxuXG4gICAgbW92ZU5vZGVUbyh4LHkpe1xuXG4gICAgfVxuXG4gICAgdXBkYXRlTm9kZVBvc2l0aW9uKG5vZGUpIHtcbiAgICAgICAgdGhpcy5nZXROb2RlRDNTZWxlY3Rpb24obm9kZSkucmFpc2UoKS5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcrbm9kZS5sb2NhdGlvbi54KycgJytub2RlLmxvY2F0aW9uLnkrJyknKTtcbiAgICB9XG5cbiAgICB1cGRhdGVUZXh0UG9zaXRpb24odGV4dCkge1xuICAgICAgICB0aGlzLmdldFRleHREM1NlbGVjdGlvbih0ZXh0KS5yYWlzZSgpLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyt0ZXh0LmxvY2F0aW9uLngrJyAnK3RleHQubG9jYXRpb24ueSsnKScpO1xuICAgIH1cblxuICAgIGdldE5vZGVEM1NlbGVjdGlvbihub2RlKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Tm9kZUQzU2VsZWN0aW9uQnlJZChub2RlLiRpZCk7XG4gICAgfVxuXG4gICAgZ2V0Tm9kZUQzU2VsZWN0aW9uQnlJZChpZCl7XG4gICAgICAgIHJldHVybiB0aGlzLm1haW5Hcm91cC5zZWxlY3QoJyNub2RlLScraWQpO1xuICAgIH1cbiAgICBnZXRUZXh0RDNTZWxlY3Rpb24odGV4dCl7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFRleHREM1NlbGVjdGlvbkJ5SWQodGV4dC4kaWQpO1xuICAgIH1cbiAgICBnZXRUZXh0RDNTZWxlY3Rpb25CeUlkKGlkKXtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFpbkdyb3VwLnNlbGVjdCgnI3RleHQtJytpZCk7XG4gICAgfVxuXG4gICAgZ2V0U2VsZWN0ZWROb2Rlcyh2aXNpYmxlT25seSA9IGZhbHNlKSB7XG4gICAgICAgIGxldCBzZWxlY3RlZFZpc2libGUgPSB0aGlzLm1haW5Hcm91cC5zZWxlY3RBbGwoXCIubm9kZS5zZWxlY3RlZFwiKS5kYXRhKCk7XG4gICAgICAgIGlmKHZpc2libGVPbmx5KXtcbiAgICAgICAgICAgIHJldHVybiBzZWxlY3RlZFZpc2libGU7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYWxsU2VsZWN0ZWQgID0gW107XG4gICAgICAgIGFsbFNlbGVjdGVkLnB1c2goLi4uc2VsZWN0ZWRWaXNpYmxlKTtcblxuICAgICAgICBzZWxlY3RlZFZpc2libGUuZm9yRWFjaChuPT57XG4gICAgICAgICAgICBpZihuLmZvbGRlZCl7XG4gICAgICAgICAgICAgICAgbGV0IGRlc2NlbmRhbnRzID0gdGhpcy5kYXRhLmdldEFsbERlc2NlbmRhbnROb2RlcyhuKTtcbiAgICAgICAgICAgICAgICBpZihkZXNjZW5kYW50cyl7XG4gICAgICAgICAgICAgICAgICAgIGFsbFNlbGVjdGVkLnB1c2goLi4uZGVzY2VuZGFudHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGFsbFNlbGVjdGVkO1xuICAgIH1cblxuICAgIGdldFNlbGVjdGVkVGV4dHMoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFpbkdyb3VwLnNlbGVjdEFsbChcIi5mbG9hdGluZy10ZXh0LnNlbGVjdGVkXCIpLmRhdGEoKTtcbiAgICB9XG5cbiAgICBjbGVhclNlbGVjdGlvbigpe1xuICAgICAgICB0aGlzLm1haW5Hcm91cC5zZWxlY3RBbGwoXCIuZWRnZS5zZWxlY3RlZFwiKS5zZWxlY3QoJ3BhdGgnKS5hdHRyKFwibWFya2VyLWVuZFwiLCBkID0+IFwidXJsKCNhcnJvd1wiKyh0aGlzLmlzT3B0aW1hbChkKT8nLW9wdGltYWwnOicnKStcIilcIilcbiAgICAgICAgdGhpcy5tYWluR3JvdXAuc2VsZWN0QWxsKFwiLnNlbGVjdGVkXCIpLmNsYXNzZWQoJ3NlbGVjdGVkJywgZmFsc2UpO1xuICAgICAgICB0aGlzLmNvbmZpZy5vblNlbGVjdGlvbkNsZWFyZWQoKTtcbiAgICB9XG5cbiAgICBzZWxlY3RFZGdlKGVkZ2UsIGNsZWFyU2VsZWN0aW9uQmVmb3JlU2VsZWN0KXtcbiAgICAgICAgaWYoY2xlYXJTZWxlY3Rpb25CZWZvcmVTZWxlY3Qpe1xuICAgICAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29uZmlnLm9uRWRnZVNlbGVjdGVkKGVkZ2UpO1xuICAgICAgICB0aGlzLm1haW5Hcm91cC5zZWxlY3QoJyNlZGdlLScrZWRnZS4kaWQpXG4gICAgICAgICAgICAuY2xhc3NlZCgnc2VsZWN0ZWQnLCB0cnVlKVxuICAgICAgICAgICAgLnNlbGVjdCgncGF0aCcpXG4gICAgICAgICAgICAuYXR0cihcIm1hcmtlci1lbmRcIiwgZCA9PiBcInVybCgjYXJyb3ctc2VsZWN0ZWQpXCIpXG4gICAgfVxuXG4gICAgaXNOb2RlU2VsZWN0ZWQobm9kZSl7XG4gICAgICAgIHJldHVybiB0aGlzLmdldE5vZGVEM1NlbGVjdGlvbihub2RlKS5jbGFzc2VkKCdzZWxlY3RlZCcpO1xuICAgIH1cblxuICAgIHNlbGVjdE5vZGUobm9kZSwgY2xlYXJTZWxlY3Rpb25CZWZvcmVTZWxlY3QsIHNraXBDYWxsYmFjayl7XG4gICAgICAgIGlmKGNsZWFyU2VsZWN0aW9uQmVmb3JlU2VsZWN0KXtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCFza2lwQ2FsbGJhY2spe1xuICAgICAgICAgICAgdGhpcy5jb25maWcub25Ob2RlU2VsZWN0ZWQobm9kZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmdldE5vZGVEM1NlbGVjdGlvbkJ5SWQobm9kZS4kaWQpLmNsYXNzZWQoJ3NlbGVjdGVkJywgdHJ1ZSk7XG4gICAgfVxuXG4gICAgc2VsZWN0VGV4dCh0ZXh0LCBjbGVhclNlbGVjdGlvbkJlZm9yZVNlbGVjdCwgc2tpcENhbGxiYWNrKXtcbiAgICAgICAgaWYoY2xlYXJTZWxlY3Rpb25CZWZvcmVTZWxlY3Qpe1xuICAgICAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIXNraXBDYWxsYmFjayl7XG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5vblRleHRTZWxlY3RlZCh0ZXh0KVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5nZXRUZXh0RDNTZWxlY3Rpb25CeUlkKHRleHQuJGlkKS5jbGFzc2VkKCdzZWxlY3RlZCcsIHRydWUpO1xuICAgIH1cblxuICAgIHNlbGVjdFN1YlRyZWUobm9kZSwgY2xlYXJTZWxlY3Rpb25CZWZvcmVTZWxlY3Qsc2tpcENhbGxiYWNrKSB7XG4gICAgICAgIGlmKGNsZWFyU2VsZWN0aW9uQmVmb3JlU2VsZWN0KXtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNlbGVjdE5vZGUobm9kZSwgZmFsc2UsIHNraXBDYWxsYmFjayk7XG4gICAgICAgIG5vZGUuY2hpbGRFZGdlcy5mb3JFYWNoKGU9PnRoaXMuc2VsZWN0U3ViVHJlZShlLmNoaWxkTm9kZSwgZmFsc2UsIHRydWUpKTtcbiAgICB9XG5cbiAgICBzZWxlY3RBbGxOb2RlcygpIHtcbiAgICAgICAgdGhpcy5tYWluR3JvdXAuc2VsZWN0QWxsKFwiLm5vZGVcIikuY2xhc3NlZCgnc2VsZWN0ZWQnLCB0cnVlKTtcbiAgICB9XG5cbiAgICBhdXRvTGF5b3V0KHR5cGUsIHdpdGhvdXRTdGF0ZVNhdmluZyl7XG4gICAgICAgIHRoaXMubGF5b3V0LmF1dG9MYXlvdXQodHlwZSwgd2l0aG91dFN0YXRlU2F2aW5nKTtcbiAgICB9XG5cbiAgICB1cGRhdGVEaWFncmFtVGl0bGUodGl0bGVWYWx1ZSl7XG4gICAgICAgIGlmKCF0aXRsZVZhbHVlKXtcbiAgICAgICAgICAgIHRpdGxlVmFsdWUgPSAnJztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRpYWdyYW1UaXRsZSA9IHRpdGxlVmFsdWU7XG4gICAgICAgIHRoaXMucmVkcmF3RGlhZ3JhbVRpdGxlKCk7XG4gICAgICAgIHRoaXMucmVkcmF3RGlhZ3JhbURlc2NyaXB0aW9uKCk7XG4gICAgICAgIHRoaXMudXBkYXRlTWFyZ2luKHRydWUpO1xuICAgIH1cblxuICAgIHJlZHJhd0RpYWdyYW1UaXRsZSgpe1xuICAgICAgICB2YXIgc3ZnV2lkdGggPSB0aGlzLnN2Zy5hdHRyKCd3aWR0aCcpO1xuICAgICAgICB2YXIgc3ZnSGVpZ2h0ID0gdGhpcy5zdmcuYXR0cignaGVpZ2h0Jyk7XG4gICAgICAgIHRoaXMudGl0bGVDb250YWluZXIgPSB0aGlzLnN2Zy5zZWxlY3RPckFwcGVuZCgnZy5zZC10aXRsZS1jb250YWluZXInKTtcblxuICAgICAgICB2YXIgdGl0bGUgPSB0aGlzLnRpdGxlQ29udGFpbmVyLnNlbGVjdE9yQXBwZW5kKCd0ZXh0LnNkLXRpdGxlJyk7XG4gICAgICAgIHRpdGxlLnRleHQodGhpcy5kaWFncmFtVGl0bGUpO1xuICAgICAgICBMYXlvdXQuc2V0SGFuZ2luZ1Bvc2l0aW9uKHRpdGxlKTtcblxuICAgICAgICB2YXIgbWFyZ2luVG9wID0gcGFyc2VJbnQodGhpcy5jb25maWcudGl0bGUubWFyZ2luLnRvcCk7XG4gICAgICAgIHRoaXMudGl0bGVDb250YWluZXIuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnKyhzdmdXaWR0aC8yKSsnLCcrKCBtYXJnaW5Ub3ApKycpJyk7XG4gICAgfVxuICAgIHJlZHJhd0RpYWdyYW1EZXNjcmlwdGlvbigpe1xuICAgICAgICB2YXIgc3ZnV2lkdGggPSB0aGlzLnN2Zy5hdHRyKCd3aWR0aCcpO1xuICAgICAgICB2YXIgc3ZnSGVpZ2h0ID0gdGhpcy5zdmcuYXR0cignaGVpZ2h0Jyk7XG4gICAgICAgIHRoaXMudGl0bGVDb250YWluZXIgPSB0aGlzLnN2Zy5zZWxlY3RPckFwcGVuZCgnZy5zZC10aXRsZS1jb250YWluZXInKTtcblxuICAgICAgICB2YXIgZGVzYyA9IHRoaXMudGl0bGVDb250YWluZXIuc2VsZWN0T3JBcHBlbmQoJ3RleHQuc2QtZGVzY3JpcHRpb24nKTtcblxuICAgICAgICBpZighdGhpcy5jb25maWcuZGVzY3JpcHRpb24uc2hvdyl7XG4gICAgICAgICAgICBkZXNjLnJlbW92ZSgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGxpbmVzID0gdGhpcy5kaWFncmFtRGVzY3JpcHRpb24gPyB0aGlzLmRpYWdyYW1EZXNjcmlwdGlvbi5zcGxpdCgnXFxuJykgOiBbXTtcbiAgICAgICAgdmFyIHRzcGFucyA9IGRlc2Muc2VsZWN0QWxsKCd0c3BhbicpLmRhdGEobGluZXMpO1xuICAgICAgICB0c3BhbnMuZW50ZXIoKS5hcHBlbmQoJ3RzcGFuJylcbiAgICAgICAgICAgIC5tZXJnZSh0c3BhbnMpXG4gICAgICAgICAgICAuaHRtbChsPT5BcHBVdGlscy5yZXBsYWNlVXJscyhBcHBVdGlscy5lc2NhcGVIdG1sKGwpKSlcbiAgICAgICAgICAgIC5hdHRyKCdkeScsIChkLGkpPT5pPjAgPyAnMS4xZW0nOiB1bmRlZmluZWQpXG4gICAgICAgICAgICAuYXR0cigneCcsICcwJyk7XG5cbiAgICAgICAgdHNwYW5zLmV4aXQoKS5yZW1vdmUoKTtcbiAgICAgICAgTGF5b3V0LnNldEhhbmdpbmdQb3NpdGlvbihkZXNjKTtcblxuICAgICAgICB2YXIgdGl0bGUgPSB0aGlzLnRpdGxlQ29udGFpbmVyLnNlbGVjdE9yQXBwZW5kKCd0ZXh0LnNkLXRpdGxlJyk7XG5cbiAgICAgICAgdmFyIG1hcmdpblRvcCA9IDA7XG4gICAgICAgIGlmKHRoaXMuZGlhZ3JhbVRpdGxlKXtcbiAgICAgICAgICAgIG1hcmdpblRvcCArPSB0aXRsZS5ub2RlKCkuZ2V0QkJveCgpLmhlaWdodDtcbiAgICAgICAgICAgIG1hcmdpblRvcCs9IE1hdGgubWF4KHBhcnNlSW50KHRoaXMuY29uZmlnLmRlc2NyaXB0aW9uLm1hcmdpbi50b3ApLCAwKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgZGVzYy5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKDAsJysoIG1hcmdpblRvcCkrJyknKTtcbiAgICB9XG5cbiAgICB1cGRhdGVEaWFncmFtRGVzY3JpcHRpb24oZGVzY3JpcHRpb25WYWx1ZSl7XG4gICAgICAgIGlmKCFkZXNjcmlwdGlvblZhbHVlKXtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uVmFsdWUgPSAnJztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRpYWdyYW1EZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uVmFsdWU7XG4gICAgICAgIHRoaXMucmVkcmF3RGlhZ3JhbVRpdGxlKCk7XG4gICAgICAgIHRoaXMucmVkcmF3RGlhZ3JhbURlc2NyaXB0aW9uKCk7XG4gICAgICAgIHRoaXMudXBkYXRlTWFyZ2luKHRydWUpO1xuICAgIH1cblxuXG4gICAgZ2V0VGl0bGVHcm91cEhlaWdodCh3aXRoTWFyZ2lucyl7XG4gICAgICAgIGlmKCF0aGlzLnRpdGxlQ29udGFpbmVyKXtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIHZhciBoID0gdGhpcy50aXRsZUNvbnRhaW5lci5ub2RlKCkuZ2V0QkJveCgpLmhlaWdodDtcbiAgICAgICAgaWYod2l0aE1hcmdpbnMpe1xuICAgICAgICAgICAgaCs9IHBhcnNlSW50KHRoaXMuY29uZmlnLnRpdGxlLm1hcmdpbi5ib3R0b20pO1xuICAgICAgICAgICAgaCs9IHBhcnNlSW50KHRoaXMuY29uZmlnLnRpdGxlLm1hcmdpbi50b3ApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBoO1xuICAgIH1cblxufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9zcmMvaW5kZXgnXG4iXX0=
