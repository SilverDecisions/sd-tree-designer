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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLXV0aWxzLmpzIiwic3JjL2NvbnRleHQtbWVudS9jb250ZXh0LW1lbnUuanMiLCJzcmMvY29udGV4dC1tZW51L2VkZ2UtY29udGV4dC1tZW51LmpzIiwic3JjL2NvbnRleHQtbWVudS9tYWluLWNvbnRleHQtbWVudS5qcyIsInNyYy9jb250ZXh0LW1lbnUvbm9kZS1jb250ZXh0LW1lbnUuanMiLCJzcmMvY29udGV4dC1tZW51L3RleHQtY29udGV4dC1tZW51LmpzIiwic3JjL2QzLWV4dGVuc2lvbnMuanMiLCJzcmMvZDMuanMiLCJzcmMvaTE4bi9kZS5qc29uIiwic3JjL2kxOG4vZW4uanNvbiIsInNyYy9pMThuL2ZyLmpzb24iLCJzcmMvaTE4bi9pMThuLmpzIiwic3JjL2kxOG4vaXQuanNvbiIsInNyYy9pMThuL3BsLmpzb24iLCJzcmMvaW5kZXguanMiLCJzcmMvbGF5b3V0LmpzIiwic3JjL25vZGUtZHJhZy1oYW5kbGVyLmpzIiwic3JjL3N5bWJvbHMvY2lyY2xlLmpzIiwic3JjL3N5bWJvbHMvdHJpYW5nbGUuanMiLCJzcmMvdGVtcGxhdGVzLmpzIiwic3JjL3RlbXBsYXRlcy9ncm93bF9tZXNzYWdlLmh0bWwiLCJzcmMvdGV4dC1kcmFnLWhhbmRsZXIuanMiLCJzcmMvdG9vbHRpcC5qcyIsInNyYy90cmVlLWRlc2lnbmVyLmpzIiwiaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBOztJLEFBQVk7O0FBQ1o7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0ksQUFFYTs7Ozs7O2FBa0JUOzs7OEMsQUFDNkIsVyxBQUFXLFksQUFBWSxPQUFPLEFBQ3ZEO2dCQUFJLFVBQVUsVUFBZCxBQUFjLEFBQVUsQUFDeEI7b0JBQUEsQUFBUSxjQUFSLEFBQXNCLEFBRXRCOztnQkFBSSxTQUFKLEFBQWEsQUFDYjtn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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRUE7Ozs7QUFDQTs7SSxBQUFZOztBQUNaOztJLEFBQVk7O0FBQ1o7O0ksQUFBWTs7QUFDWjs7SSxBQUFZOztBQUNaOztJLEFBQVk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJLEFBRUMsZSxBQUFBOzs7Ozs7OzZCLEFBS0csS0FBSSxBQUNaO2lCQUFBLEFBQUssV0FBTCxBQUFn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bUIsYUFBWSxBQUM1QjtnQkFBRyxDQUFDLEtBQUosQUFBUyxnQkFBZSxBQUNwQjt1QkFBQSxBQUFPLEFBQ1Y7QUFDRDtnQkFBSSxJQUFJLEtBQUEsQUFBSyxlQUFMLEFBQW9CLE9BQXBCLEFBQTJCLFVBQW5DLEFBQTZDLEFBQzdDO2dCQUFBLEFBQUcsYUFBWSxBQUNYO3FCQUFJLFNBQVMsS0FBQSxBQUFLLE9BQUwsQUFBWSxNQUFaLEFBQWtCLE9BQS9CLEFBQUksQUFBa0MsQUFDdEM7cUJBQUksU0FBUyxLQUFBLEFBQUssT0FBTCxBQUFZLE1BQVosQUFBa0IsT0FBL0IsQUFBSSxBQUFrQyxBQUN6QztBQUNEO21CQUFBLEFBQU8sQUFDVjs7Ozs7Ozs7Ozs7Ozs7OztBQzE0Q0wsMkNBQUE7aURBQUE7O2dCQUFBO3dCQUFBO29CQUFBO0FBQUE7QUFBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgKiBhcyBkMyBmcm9tIFwiLi9kM1wiO1xuaW1wb3J0IHtUZW1wbGF0ZXN9IGZyb20gXCIuL3RlbXBsYXRlc1wiO1xuaW1wb3J0IHtpMThufSBmcm9tIFwiLi9pMThuL2kxOG5cIjtcbmltcG9ydCB7VXRpbHN9IGZyb20gXCJzZC11dGlsc1wiO1xuXG5leHBvcnQgY2xhc3MgQXBwVXRpbHMge1xuXG4gICAgc3RhdGljIHNhbml0aXplSGVpZ2h0ID0gZnVuY3Rpb24gKGhlaWdodCwgY29udGFpbmVyKSB7XG4gICAgICAgIHJldHVybiAoaGVpZ2h0IHx8IHBhcnNlSW50KGNvbnRhaW5lci5zdHlsZSgnaGVpZ2h0JyksIDEwKSB8fCA0MDApO1xuICAgIH07XG5cbiAgICBzdGF0aWMgc2FuaXRpemVXaWR0aCA9IGZ1bmN0aW9uICh3aWR0aCwgY29udGFpbmVyKSB7XG4gICAgICAgIHJldHVybiAod2lkdGggfHwgcGFyc2VJbnQoY29udGFpbmVyLnN0eWxlKCd3aWR0aCcpLCAxMCkgfHwgOTYwKTtcbiAgICB9O1xuXG4gICAgc3RhdGljIGF2YWlsYWJsZUhlaWdodCA9IGZ1bmN0aW9uIChoZWlnaHQsIGNvbnRhaW5lciwgbWFyZ2luKSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1heCgwLCBBcHBVdGlscy5zYW5pdGl6ZUhlaWdodChoZWlnaHQsIGNvbnRhaW5lcikgLSBtYXJnaW4udG9wIC0gbWFyZ2luLmJvdHRvbSk7XG4gICAgfTtcblxuICAgIHN0YXRpYyBhdmFpbGFibGVXaWR0aCA9IGZ1bmN0aW9uICh3aWR0aCwgY29udGFpbmVyLCBtYXJnaW4pIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KDAsIEFwcFV0aWxzLnNhbml0aXplV2lkdGgod2lkdGgsIGNvbnRhaW5lcikgLSBtYXJnaW4ubGVmdCAtIG1hcmdpbi5yaWdodCk7XG4gICAgfTtcblxuICAgIC8vcGxhY2VzIHRleHRTdHJpbmcgaW4gdGV4dE9iaiwgYWRkcyBhbiBlbGxpcHNpcyBpZiB0ZXh0IGNhbid0IGZpdCBpbiB3aWR0aFxuICAgIHN0YXRpYyBwbGFjZVRleHRXaXRoRWxsaXBzaXModGV4dEQzT2JqLCB0ZXh0U3RyaW5nLCB3aWR0aCkge1xuICAgICAgICB2YXIgdGV4dE9iaiA9IHRleHREM09iai5ub2RlKCk7XG4gICAgICAgIHRleHRPYmoudGV4dENvbnRlbnQgPSB0ZXh0U3RyaW5nO1xuXG4gICAgICAgIHZhciBtYXJnaW4gPSAwO1xuICAgICAgICB2YXIgZWxsaXBzaXNMZW5ndGggPSA5O1xuICAgICAgICAvL2VsbGlwc2lzIGlzIG5lZWRlZFxuICAgICAgICBpZiAodGV4dE9iai5nZXRDb21wdXRlZFRleHRMZW5ndGgoKSA+IHdpZHRoICsgbWFyZ2luKSB7XG4gICAgICAgICAgICBmb3IgKHZhciB4ID0gdGV4dFN0cmluZy5sZW5ndGggLSAzOyB4ID4gMDsgeCAtPSAxKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRleHRPYmouZ2V0U3ViU3RyaW5nTGVuZ3RoKDAsIHgpICsgZWxsaXBzaXNMZW5ndGggPD0gd2lkdGggKyBtYXJnaW4pIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dE9iai50ZXh0Q29udGVudCA9IHRleHRTdHJpbmcuc3Vic3RyaW5nKDAsIHgpICsgXCIuLi5cIjtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGV4dE9iai50ZXh0Q29udGVudCA9IFwiLi4uXCI7IC8vY2FuJ3QgcGxhY2UgYXQgYWxsXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgc3RhdGljIHBsYWNlVGV4dFdpdGhFbGxpcHNpc0FuZFRvb2x0aXAodGV4dEQzT2JqLCB0ZXh0U3RyaW5nLCB3aWR0aCwgdG9vbHRpcCkge1xuICAgICAgICB2YXIgZWxsaXBzaXNQbGFjZWQgPSBBcHBVdGlscy5wbGFjZVRleHRXaXRoRWxsaXBzaXModGV4dEQzT2JqLCB0ZXh0U3RyaW5nLCB3aWR0aCk7XG4gICAgICAgIGlmIChlbGxpcHNpc1BsYWNlZCAmJiB0b29sdGlwKSB7XG4gICAgICAgICAgICB0ZXh0RDNPYmoub24oXCJtb3VzZW92ZXJcIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICB0b29sdGlwLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgICAgICAgICAuZHVyYXRpb24oMjAwKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIC45KTtcbiAgICAgICAgICAgICAgICB0b29sdGlwLmh0bWwodGV4dFN0cmluZylcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwibGVmdFwiLCAoZDMuZXZlbnQucGFnZVggKyA1KSArIFwicHhcIilcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwidG9wXCIsIChkMy5ldmVudC5wYWdlWSAtIDI4KSArIFwicHhcIik7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGV4dEQzT2JqLm9uKFwibW91c2VvdXRcIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICB0b29sdGlwLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgICAgICAgICAuZHVyYXRpb24oNTAwKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHN0YXRpYyBnZXRGb250U2l6ZShlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50LCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKFwiZm9udC1zaXplXCIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXRUcmFuc2xhdGlvbih0cmFuc2Zvcm0pIHtcbiAgICAgICAgLy8gQ3JlYXRlIGEgZHVtbXkgZyBmb3IgY2FsY3VsYXRpb24gcHVycG9zZXMgb25seS4gVGhpcyB3aWxsIG5ldmVyXG4gICAgICAgIC8vIGJlIGFwcGVuZGVkIHRvIHRoZSBET00gYW5kIHdpbGwgYmUgZGlzY2FyZGVkIG9uY2UgdGhpcyBmdW5jdGlvblxuICAgICAgICAvLyByZXR1cm5zLlxuICAgICAgICB2YXIgZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwiZ1wiKTtcblxuICAgICAgICAvLyBTZXQgdGhlIHRyYW5zZm9ybSBhdHRyaWJ1dGUgdG8gdGhlIHByb3ZpZGVkIHN0cmluZyB2YWx1ZS5cbiAgICAgICAgZy5zZXRBdHRyaWJ1dGVOUyhudWxsLCBcInRyYW5zZm9ybVwiLCB0cmFuc2Zvcm0pO1xuXG4gICAgICAgIC8vIGNvbnNvbGlkYXRlIHRoZSBTVkdUcmFuc2Zvcm1MaXN0IGNvbnRhaW5pbmcgYWxsIHRyYW5zZm9ybWF0aW9uc1xuICAgICAgICAvLyB0byBhIHNpbmdsZSBTVkdUcmFuc2Zvcm0gb2YgdHlwZSBTVkdfVFJBTlNGT1JNX01BVFJJWCBhbmQgZ2V0XG4gICAgICAgIC8vIGl0cyBTVkdNYXRyaXguXG4gICAgICAgIHZhciBtYXRyaXggPSBnLnRyYW5zZm9ybS5iYXNlVmFsLmNvbnNvbGlkYXRlKCkubWF0cml4O1xuXG4gICAgICAgIC8vIEFzIHBlciBkZWZpbml0aW9uIHZhbHVlcyBlIGFuZCBmIGFyZSB0aGUgb25lcyBmb3IgdGhlIHRyYW5zbGF0aW9uLlxuICAgICAgICByZXR1cm4gW21hdHJpeC5lLCBtYXRyaXguZl07XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgY2xvc2VzdFBvaW50KHBhdGhOb2RlLCBwb2ludCkge1xuICAgICAgICB2YXIgcGF0aExlbmd0aCA9IHBhdGhOb2RlLmdldFRvdGFsTGVuZ3RoKCksXG4gICAgICAgICAgICBwcmVjaXNpb24gPSA4LFxuICAgICAgICAgICAgYmVzdCxcbiAgICAgICAgICAgIGJlc3RMZW5ndGgsXG4gICAgICAgICAgICBiZXN0RGlzdGFuY2UgPSBJbmZpbml0eTtcblxuICAgICAgICAvLyBsaW5lYXIgc2NhbiBmb3IgY29hcnNlIGFwcHJveGltYXRpb25cbiAgICAgICAgZm9yICh2YXIgc2Nhbiwgc2Nhbkxlbmd0aCA9IDAsIHNjYW5EaXN0YW5jZTsgc2Nhbkxlbmd0aCA8PSBwYXRoTGVuZ3RoOyBzY2FuTGVuZ3RoICs9IHByZWNpc2lvbikge1xuICAgICAgICAgICAgaWYgKChzY2FuRGlzdGFuY2UgPSBkaXN0YW5jZTIoc2NhbiA9IHBhdGhOb2RlLmdldFBvaW50QXRMZW5ndGgoc2Nhbkxlbmd0aCkpKSA8IGJlc3REaXN0YW5jZSkge1xuICAgICAgICAgICAgICAgIGJlc3QgPSBzY2FuLCBiZXN0TGVuZ3RoID0gc2Nhbkxlbmd0aCwgYmVzdERpc3RhbmNlID0gc2NhbkRpc3RhbmNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gYmluYXJ5IHNlYXJjaCBmb3IgcHJlY2lzZSBlc3RpbWF0ZVxuICAgICAgICBwcmVjaXNpb24gLz0gMjtcbiAgICAgICAgd2hpbGUgKHByZWNpc2lvbiA+IDAuNSkge1xuICAgICAgICAgICAgdmFyIGJlZm9yZSxcbiAgICAgICAgICAgICAgICBhZnRlcixcbiAgICAgICAgICAgICAgICBiZWZvcmVMZW5ndGgsXG4gICAgICAgICAgICAgICAgYWZ0ZXJMZW5ndGgsXG4gICAgICAgICAgICAgICAgYmVmb3JlRGlzdGFuY2UsXG4gICAgICAgICAgICAgICAgYWZ0ZXJEaXN0YW5jZTtcbiAgICAgICAgICAgIGlmICgoYmVmb3JlTGVuZ3RoID0gYmVzdExlbmd0aCAtIHByZWNpc2lvbikgPj0gMCAmJiAoYmVmb3JlRGlzdGFuY2UgPSBkaXN0YW5jZTIoYmVmb3JlID0gcGF0aE5vZGUuZ2V0UG9pbnRBdExlbmd0aChiZWZvcmVMZW5ndGgpKSkgPCBiZXN0RGlzdGFuY2UpIHtcbiAgICAgICAgICAgICAgICBiZXN0ID0gYmVmb3JlLCBiZXN0TGVuZ3RoID0gYmVmb3JlTGVuZ3RoLCBiZXN0RGlzdGFuY2UgPSBiZWZvcmVEaXN0YW5jZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKGFmdGVyTGVuZ3RoID0gYmVzdExlbmd0aCArIHByZWNpc2lvbikgPD0gcGF0aExlbmd0aCAmJiAoYWZ0ZXJEaXN0YW5jZSA9IGRpc3RhbmNlMihhZnRlciA9IHBhdGhOb2RlLmdldFBvaW50QXRMZW5ndGgoYWZ0ZXJMZW5ndGgpKSkgPCBiZXN0RGlzdGFuY2UpIHtcbiAgICAgICAgICAgICAgICBiZXN0ID0gYWZ0ZXIsIGJlc3RMZW5ndGggPSBhZnRlckxlbmd0aCwgYmVzdERpc3RhbmNlID0gYWZ0ZXJEaXN0YW5jZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcHJlY2lzaW9uIC89IDI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBiZXN0ID0gW2Jlc3QueCwgYmVzdC55XTtcbiAgICAgICAgYmVzdC5kaXN0YW5jZSA9IE1hdGguc3FydChiZXN0RGlzdGFuY2UpO1xuICAgICAgICByZXR1cm4gYmVzdDtcblxuICAgICAgICBmdW5jdGlvbiBkaXN0YW5jZTIocCkge1xuICAgICAgICAgICAgdmFyIGR4ID0gcC54IC0gcG9pbnRbMF0sXG4gICAgICAgICAgICAgICAgZHkgPSBwLnkgLSBwb2ludFsxXTtcbiAgICAgICAgICAgIHJldHVybiBkeCAqIGR4ICsgZHkgKiBkeTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBncm93bChtZXNzYWdlLCB0eXBlPSdpbmZvJywgcG9zaXRpb249J3JpZ2h0JywgdGltZSA9IDIwMDApe1xuICAgICAgICB2YXIgaHRtbCA9IFRlbXBsYXRlcy5nZXQoJ2dyb3dsJywge21lc3NhZ2U6bWVzc2FnZSwgdHlwZTp0eXBlfSlcblxuICAgICAgICB2YXIgZyA9IGQzLnNlbGVjdCgnYm9keScpLnNlbGVjdE9yQXBwZW5kKCdkaXYuc2QtZ3Jvd2wtbGlzdC4nK3Bvc2l0aW9uKS5hcHBlbmQoJ2RpdicpLmh0bWwoaHRtbCk7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGcucmVtb3ZlKCk7XG4gICAgICAgIH0sIHRpbWUpXG4gICAgfVxuXG5cbiAgICBzdGF0aWMgY3JlYXRlRWxlbWVudCh0YWcsIGF0dHJpYnMsIHBhcmVudCkge1xuICAgICAgICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XG5cbiAgICAgICAgaWYgKGF0dHJpYnMpIHtcbiAgICAgICAgICAgIEFwcFV0aWxzLmRlZXBFeHRlbmQoZWwsIGF0dHJpYnMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChlbCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsO1xuICAgIH07XG5cbiAgICBzdGF0aWMgcmVtb3ZlRWxlbWVudChlbGVtZW50KSB7XG4gICAgICAgIGVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbGVtZW50KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgcmVwbGFjZVVybHModGV4dCl7XG4gICAgICAgIGlmKCF0ZXh0KXtcbiAgICAgICAgICAgIHJldHVybiB0ZXh0O1xuICAgICAgICB9XG4gICAgICAgIHZhciB1cmxSZWdleHAgPSAvKChmdHB8aHR0cHxodHRwcyk6XFwvXFwvKFxcdys6ezAsMX1cXHcqQCk/KFxcUyspKDpbMC05XSspPyhcXC98XFwvKFtcXHcjITouPys9JiVAIVxcLVxcL10pKT8pL1xuXG4gICAgICAgIHJldHVybiB0ZXh0LnJlcGxhY2UodXJsUmVnZXhwLCAnPGEgaHJlZj1cIiQxXCIgdGFyZ2V0PVwiX2JsYW5rXCI+JDE8L2E+Jyk7XG4gICAgfVxuXG4gICAgc3RhdGljIGVzY2FwZUh0bWwoaHRtbClcbiAgICB7XG4gICAgICAgIHZhciB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoaHRtbCk7XG4gICAgICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZGl2LmFwcGVuZENoaWxkKHRleHQpO1xuICAgICAgICByZXR1cm4gZGl2LmlubmVySFRNTDtcbiAgICB9XG5cbiAgICBzdGF0aWMgZGlzcGF0Y2hIdG1sRXZlbnQoZWxlbWVudCwgbmFtZSl7XG4gICAgICAgIGlmIChcImNyZWF0ZUV2ZW50XCIgaW4gZG9jdW1lbnQpIHtcbiAgICAgICAgICAgIHZhciBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudChcIkhUTUxFdmVudHNcIik7XG4gICAgICAgICAgICBldnQuaW5pdEV2ZW50KG5hbWUsIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICAgIGVsZW1lbnQuZGlzcGF0Y2hFdmVudChldnQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGVsZW1lbnQuZmlyZUV2ZW50KFwib25cIituYW1lKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZGlzcGF0Y2hFdmVudChuYW1lLCBkYXRhKXtcbiAgICAgICAgdmFyIGV2ZW50O1xuICAgICAgICB0cnl7XG4gICAgICAgICAgICBldmVudCA9IG5ldyAgQ3VzdG9tRXZlbnQobmFtZSx7ICdkZXRhaWwnOiBkYXRhIH0pO1xuICAgICAgICB9Y2F0Y2ggKGUpeyAvL0lFXG4gICAgICAgICAgICBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuICAgICAgICAgICAgZXZlbnQuaW5pdEN1c3RvbUV2ZW50KG5hbWUsIGZhbHNlLCBmYWxzZSwgZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldFZhbGlkYXRpb25NZXNzYWdlKGVycm9yKXtcbiAgICAgICAgaWYoVXRpbHMuaXNTdHJpbmcoZXJyb3IpKXtcbiAgICAgICAgICAgIGVycm9yID0ge25hbWU6IGVycm9yfTtcbiAgICAgICAgfVxuICAgICAgICB2YXIga2V5ID0gJ3ZhbGlkYXRpb24uJyArIGVycm9yLm5hbWU7XG4gICAgICAgIHJldHVybiBpMThuLnQoa2V5LCBlcnJvci5kYXRhKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaGlkZShzZWxlY3Rpb24pe1xuICAgICAgICBzZWxlY3Rpb24uY2xhc3NlZCgnc2QtaGlkZGVuJywgdHJ1ZSk7XG4gICAgfVxuXG4gICAgc3RhdGljIHNob3coc2VsZWN0aW9uLCBzaG93PXRydWUpe1xuICAgICAgICBzZWxlY3Rpb24uY2xhc3NlZCgnc2QtaGlkZGVuJywgIXNob3cpO1xuICAgIH1cblxuXG5cbiAgICBzdGF0aWMgaXNIaWRkZW4oZWwsIGV4YWN0ID0gdHJ1ZSkge1xuICAgICAgICBpZighZWwpe1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYoZXhhY3Qpe1xuICAgICAgICAgICAgdmFyIHN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwpO1xuICAgICAgICAgICAgcmV0dXJuIChzdHlsZS5kaXNwbGF5ID09PSAnbm9uZScpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChlbC5vZmZzZXRQYXJlbnQgPT09IG51bGwpXG4gICAgfVxuXG4gICAgc3RhdGljIGdldEpTT04odXJsLCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHhoci5vcGVuKCdnZXQnLCB1cmwsIHRydWUpO1xuICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuICAgICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHN0YXR1cyA9IHhoci5zdGF0dXM7XG4gICAgICAgICAgICBpZiAoc3RhdHVzID09IDIwMCkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHhoci5yZXNwb25zZSwgbnVsbCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIHN0YXR1cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHhoci5zZW5kKCk7XG4gICAgfVxufVxuIiwiaW1wb3J0ICogYXMgZDMgZnJvbSAnLi4vZDMnXG5cbi8qYmFzZWQgb246XG4gKiBnaXRodWIuY29tL3BhdG9yamsvZDMtY29udGV4dC1tZW51ICovXG5cbmV4cG9ydCBjbGFzcyBDb250ZXh0TWVudSB7XG4gICAgb3BlbkNhbGxiYWNrO1xuICAgIGNsb3NlQ2FsbGJhY2s7XG5cbiAgICBjb25zdHJ1Y3RvcihtZW51LCBvcHRzKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICBpZiAodHlwZW9mIG9wdHMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHNlbGYub3BlbkNhbGxiYWNrID0gb3B0cztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9wdHMgPSBvcHRzIHx8IHt9O1xuICAgICAgICAgICAgc2VsZi5vcGVuQ2FsbGJhY2sgPSBvcHRzLm9uT3BlbjtcbiAgICAgICAgICAgIHNlbGYuY2xvc2VDYWxsYmFjayA9IG9wdHMub25DbG9zZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgZGl2IGVsZW1lbnQgdGhhdCB3aWxsIGhvbGQgdGhlIGNvbnRleHQgbWVudVxuICAgICAgICBkMy5zZWxlY3RBbGwoJy5kMy1jb250ZXh0LW1lbnUnKS5kYXRhKFsxXSlcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2QzLWNvbnRleHQtbWVudScpO1xuXG4gICAgICAgIC8vIGNsb3NlIG1lbnVcbiAgICAgICAgZDMuc2VsZWN0KCdib2R5Jykub24oJ2NsaWNrLmQzLWNvbnRleHQtbWVudScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGQzLnNlbGVjdCgnLmQzLWNvbnRleHQtbWVudScpLnN0eWxlKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgIGlmIChzZWxmLmNsb3NlQ2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBzZWxmLmNsb3NlQ2FsbGJhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gdGhpcyBnZXRzIGV4ZWN1dGVkIHdoZW4gYSBjb250ZXh0bWVudSBldmVudCBvY2N1cnNcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChkYXRhLCBpbmRleCkge1xuICAgICAgICAgICAgdmFyIGVsbSA9IHRoaXM7XG5cbiAgICAgICAgICAgIGQzLnNlbGVjdEFsbCgnLmQzLWNvbnRleHQtbWVudScpLmh0bWwoJycpO1xuICAgICAgICAgICAgdmFyIGxpc3QgPSBkMy5zZWxlY3RBbGwoJy5kMy1jb250ZXh0LW1lbnUnKVxuICAgICAgICAgICAgICAgIC5vbignY29udGV4dG1lbnUnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3QoJy5kMy1jb250ZXh0LW1lbnUnKS5zdHlsZSgnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICAgICAgICAgIGQzLmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGQzLmV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgndWwnKTtcbiAgICAgICAgICAgIGxpc3Quc2VsZWN0QWxsKCdsaScpLmRhdGEodHlwZW9mIG1lbnUgPT09ICdmdW5jdGlvbicgPyBtZW51KGRhdGEpIDogbWVudSkuZW50ZXIoKVxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJ2xpJylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmV0ID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkLmRpdmlkZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldCArPSAnIGlzLWRpdmlkZXInO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChkLmRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXQgKz0gJyBpcy1kaXNhYmxlZCc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFkLmFjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0ICs9ICcgaXMtaGVhZGVyJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmh0bWwoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGQuZGl2aWRlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8aHI+JztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIWQudGl0bGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ05vIHRpdGxlIGF0dHJpYnV0ZSBzZXQuIENoZWNrIHRoZSBzcGVsbGluZyBvZiB5b3VyIG9wdGlvbnMuJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICh0eXBlb2YgZC50aXRsZSA9PT0gJ3N0cmluZycpID8gZC50aXRsZSA6IGQudGl0bGUoZGF0YSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGQuZGlzYWJsZWQpIHJldHVybjsgLy8gZG8gbm90aGluZyBpZiBkaXNhYmxlZFxuICAgICAgICAgICAgICAgICAgICBpZiAoIWQuYWN0aW9uKSByZXR1cm47IC8vIGhlYWRlcnMgaGF2ZSBubyBcImFjdGlvblwiXG4gICAgICAgICAgICAgICAgICAgIGQuYWN0aW9uKGVsbSwgZGF0YSwgaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3QoJy5kMy1jb250ZXh0LW1lbnUnKS5zdHlsZSgnZGlzcGxheScsICdub25lJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYuY2xvc2VDYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jbG9zZUNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gdGhlIG9wZW5DYWxsYmFjayBhbGxvd3MgYW4gYWN0aW9uIHRvIGZpcmUgYmVmb3JlIHRoZSBtZW51IGlzIGRpc3BsYXllZFxuICAgICAgICAgICAgLy8gYW4gZXhhbXBsZSB1c2FnZSB3b3VsZCBiZSBjbG9zaW5nIGEgdG9vbHRpcFxuICAgICAgICAgICAgaWYgKHNlbGYub3BlbkNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYub3BlbkNhbGxiYWNrKGRhdGEsIGluZGV4KSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gZGlzcGxheSBjb250ZXh0IG1lbnVcbiAgICAgICAgICAgIGQzLnNlbGVjdCgnLmQzLWNvbnRleHQtbWVudScpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdsZWZ0JywgKGQzLmV2ZW50LnBhZ2VYIC0gMikgKyAncHgnKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgndG9wJywgKGQzLmV2ZW50LnBhZ2VZIC0gMikgKyAncHgnKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnZGlzcGxheScsICdibG9jaycpO1xuXG4gICAgICAgICAgICBkMy5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZDMuZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHN0YXRpYyBoaWRlKCkge1xuICAgICAgICBkMy5zZWxlY3QoJy5kMy1jb250ZXh0LW1lbnUnKS5zdHlsZSgnZGlzcGxheScsICdub25lJyk7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQge0NvbnRleHRNZW51fSBmcm9tICcuL2NvbnRleHQtbWVudSdcbmltcG9ydCB7aTE4bn0gZnJvbSBcIi4uL2kxOG4vaTE4blwiO1xuXG5leHBvcnQgY2xhc3MgRWRnZUNvbnRleHRNZW51IGV4dGVuZHMgQ29udGV4dE1lbnUge1xuICAgIHRyZWVEZXNpZ25lcjtcblxuICAgIGNvbnN0cnVjdG9yKHRyZWVEZXNpZ25lcikge1xuICAgICAgICB2YXIgbWVudSA9IGZ1bmN0aW9uIChkKSB7XG5cbiAgICAgICAgICAgIHZhciBtZW51ID0gW107XG5cbiAgICAgICAgICAgIG1lbnUucHVzaCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUuZWRnZS5pbmplY3REZWNpc2lvbk5vZGUnKSxcbiAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLmluamVjdERlY2lzaW9uTm9kZShkKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbWVudS5wdXNoKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5lZGdlLmluamVjdENoYW5jZU5vZGUnKSxcbiAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLmluamVjdENoYW5jZU5vZGUoZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICByZXR1cm4gbWVudTtcbiAgICAgICAgfTtcblxuICAgICAgICBzdXBlcihtZW51KTtcbiAgICAgICAgdGhpcy50cmVlRGVzaWduZXIgPSB0cmVlRGVzaWduZXI7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtDb250ZXh0TWVudX0gZnJvbSAnLi9jb250ZXh0LW1lbnUnXG5pbXBvcnQge2RvbWFpbiBhcyBtb2RlbH0gZnJvbSAnc2QtbW9kZWwnXG5pbXBvcnQgKiBhcyBkMyBmcm9tICcuLi9kMydcbmltcG9ydCB7aTE4bn0gZnJvbSBcIi4uL2kxOG4vaTE4blwiO1xuXG5leHBvcnQgY2xhc3MgTWFpbkNvbnRleHRNZW51IGV4dGVuZHMgQ29udGV4dE1lbnUge1xuICAgIHRyZWVEZXNpZ25lcjtcblxuICAgIGNvbnN0cnVjdG9yKHRyZWVEZXNpZ25lcikge1xuICAgICAgICB2YXIgbW91c2VQb3NpdGlvbiA9IG51bGw7XG4gICAgICAgIHZhciBtZW51ID0gZnVuY3Rpb24gKGQpIHtcblxuICAgICAgICAgICAgdmFyIG1lbnUgPSBbXTtcbiAgICAgICAgICAgIG1lbnUucHVzaCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubWFpbi5hZGREZWNpc2lvbk5vZGUnKSxcbiAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld05vZGUgPSBuZXcgbW9kZWwuRGVjaXNpb25Ob2RlKG1vdXNlUG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuYWRkTm9kZShuZXdOb2RlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbWVudS5wdXNoKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5tYWluLmFkZENoYW5jZU5vZGUnKSxcbiAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld05vZGUgPSBuZXcgbW9kZWwuQ2hhbmNlTm9kZShtb3VzZVBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLmFkZE5vZGUobmV3Tm9kZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG1lbnUucHVzaCh7ZGl2aWRlcjogdHJ1ZX0pO1xuICAgICAgICAgICAgbWVudS5wdXNoKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5tYWluLmFkZFRleHQnKSxcbiAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld1RleHQgPSBuZXcgbW9kZWwuVGV4dChtb3VzZVBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLmFkZFRleHQobmV3VGV4dCk7XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBtZW51LnB1c2goe2RpdmlkZXI6IHRydWV9KTtcbiAgICAgICAgICAgIG1lbnUucHVzaCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubWFpbi5wYXN0ZScpLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIucGFzdGVUb05ld0xvY2F0aW9uKG1vdXNlUG9zaXRpb24pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICF0cmVlRGVzaWduZXIuY29waWVkTm9kZXMgfHwgIXRyZWVEZXNpZ25lci5jb3BpZWROb2Rlcy5sZW5ndGhcblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBtZW51LnB1c2goe2RpdmlkZXI6IHRydWV9KTtcblxuICAgICAgICAgICAgbWVudS5wdXNoKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5tYWluLnNlbGVjdEFsbE5vZGVzJyksXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5zZWxlY3RBbGxOb2RlcygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIG1lbnU7XG4gICAgICAgIH07XG5cbiAgICAgICAgc3VwZXIobWVudSwge29uT3BlbjogKCkgPT4ge1xuICAgICAgICAgICAgdHJlZURlc2lnbmVyLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgICAgICBtb3VzZVBvc2l0aW9uID0gbmV3IG1vZGVsLlBvaW50KGQzLm1vdXNlKHRyZWVEZXNpZ25lci5zdmcubm9kZSgpKSkubW92ZSh0cmVlRGVzaWduZXIuZ2V0TWFpbkdyb3VwVHJhbnNsYXRpb24odHJ1ZSkpO1xuXG4gICAgICAgIH19KTtcbiAgICAgICAgdGhpcy50cmVlRGVzaWduZXIgPSB0cmVlRGVzaWduZXI7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtDb250ZXh0TWVudX0gZnJvbSAnLi9jb250ZXh0LW1lbnUnXG5pbXBvcnQge2RvbWFpbiBhcyBtb2RlbH0gZnJvbSAnc2QtbW9kZWwnXG5pbXBvcnQge2kxOG59IGZyb20gXCIuLi9pMThuL2kxOG5cIjtcblxuZXhwb3J0IGNsYXNzIE5vZGVDb250ZXh0TWVudSBleHRlbmRzIENvbnRleHRNZW51IHtcbiAgICB0cmVlRGVzaWduZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcih0cmVlRGVzaWduZXIsIG9wZXJhdGlvbnNGb3JPYmplY3QpIHtcbiAgICAgICAgdmFyIG1lbnUgPSBmdW5jdGlvbiAoZCkge1xuXG4gICAgICAgICAgICB2YXIgY29weU1lbnVJdGVtID0ge1xuICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm5vZGUuY29weScpLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuc2VsZWN0Tm9kZShkLCAhdHJlZURlc2lnbmVyLmlzTm9kZVNlbGVjdGVkKGQpKTtcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLmNvcHlTZWxlY3RlZE5vZGVzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZhciBjdXRNZW51SXRlbSA9IHtcbiAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5ub2RlLmN1dCcpLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuc2VsZWN0Tm9kZShkLCAhdHJlZURlc2lnbmVyLmlzTm9kZVNlbGVjdGVkKGQpKTtcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLmN1dFNlbGVjdGVkTm9kZXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIHBhc3RlTWVudUl0ZW0gPSB7XG4gICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubm9kZS5wYXN0ZScpLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIucGFzdGVUb05vZGUoZCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogZC5mb2xkZWQgfHwgIXRyZWVEZXNpZ25lci5jb3BpZWROb2RlcyB8fCAhdHJlZURlc2lnbmVyLmNvcGllZE5vZGVzLmxlbmd0aFxuXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIGRlbGV0ZU1lbnVJdGVtID0ge1xuICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm5vZGUuZGVsZXRlJyksXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLnNlbGVjdE5vZGUoZCwgIXRyZWVEZXNpZ25lci5pc05vZGVTZWxlY3RlZChkKSk7XG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5yZW1vdmVTZWxlY3RlZE5vZGVzKCk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB2YXIgbWVudSA9IFtdO1xuICAgICAgICAgICAgaWYgKGQudHlwZSA9PSBtb2RlbC5UZXJtaW5hbE5vZGUuJFRZUEUpIHtcbiAgICAgICAgICAgICAgICBtZW51ID0gW2NvcHlNZW51SXRlbSwgY3V0TWVudUl0ZW0sIGRlbGV0ZU1lbnVJdGVtXTtcbiAgICAgICAgICAgICAgICBOb2RlQ29udGV4dE1lbnUuYWRkTm9kZUNvbnZlcnNpb25PcHRpb25zKGQsIG1lbnUsIHRyZWVEZXNpZ25lcik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1lbnU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKCFkLmZvbGRlZCl7XG4gICAgICAgICAgICAgICAgbWVudS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubm9kZS5hZGREZWNpc2lvbk5vZGUnKSxcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuYWRkRGVjaXNpb25Ob2RlKGQpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBtZW51LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5ub2RlLmFkZENoYW5jZU5vZGUnKSxcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuYWRkQ2hhbmNlTm9kZShkKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbWVudS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubm9kZS5hZGRUZXJtaW5hbE5vZGUnKSxcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuYWRkVGVybWluYWxOb2RlKGQpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBtZW51LnB1c2goe2RpdmlkZXI6IHRydWV9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbWVudS5wdXNoKGNvcHlNZW51SXRlbSk7XG4gICAgICAgICAgICBtZW51LnB1c2goY3V0TWVudUl0ZW0pO1xuICAgICAgICAgICAgbWVudS5wdXNoKHBhc3RlTWVudUl0ZW0pO1xuICAgICAgICAgICAgbWVudS5wdXNoKGRlbGV0ZU1lbnVJdGVtKTtcblxuICAgICAgICAgICAgTm9kZUNvbnRleHRNZW51LmFkZE5vZGVDb252ZXJzaW9uT3B0aW9ucyhkLCBtZW51LCB0cmVlRGVzaWduZXIpO1xuICAgICAgICAgICAgbWVudS5wdXNoKHtkaXZpZGVyOiB0cnVlfSk7XG4gICAgICAgICAgICBtZW51LnB1c2goe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm5vZGUuc2VsZWN0U3VidHJlZScpLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuc2VsZWN0U3ViVHJlZShkLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYoIWQuZm9sZGVkKXtcbiAgICAgICAgICAgICAgICBtZW51LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5ub2RlLmZvbGQnKSxcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuZm9sZFN1YnRyZWUoZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIG1lbnUucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm5vZGUudW5mb2xkJyksXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLmZvbGRTdWJ0cmVlKGQsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihvcGVyYXRpb25zRm9yT2JqZWN0KXtcbiAgICAgICAgICAgICAgICB2YXIgb3BlcmF0aW9ucyA9IG9wZXJhdGlvbnNGb3JPYmplY3QoZCk7XG4gICAgICAgICAgICAgICAgaWYob3BlcmF0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgbWVudS5wdXNoKHtkaXZpZGVyOiB0cnVlfSk7XG4gICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvbnMuZm9yRWFjaChvcD0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVudS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5ub2RlLicrb3AubmFtZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5wZXJmb3JtT3BlcmF0aW9uKGQsIG9wKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhb3AuY2FuUGVyZm9ybShkKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gbWVudTtcbiAgICAgICAgfTtcblxuICAgICAgICBzdXBlcihtZW51KTtcbiAgICAgICAgdGhpcy50cmVlRGVzaWduZXIgPSB0cmVlRGVzaWduZXI7XG4gICAgfVxuXG4gICAgc3RhdGljIGFkZE5vZGVDb252ZXJzaW9uT3B0aW9ucyhkLCBtZW51LCB0cmVlRGVzaWduZXIpe1xuICAgICAgICB2YXIgY29udmVyc2lvbk9wdGlvbnMgPSBOb2RlQ29udGV4dE1lbnUuZ2V0Tm9kZUNvbnZlcnNpb25PcHRpb25zKGQsIHRyZWVEZXNpZ25lcik7XG4gICAgICAgIGlmKGNvbnZlcnNpb25PcHRpb25zLmxlbmd0aCl7XG4gICAgICAgICAgICBtZW51LnB1c2goe2RpdmlkZXI6IHRydWV9KTtcbiAgICAgICAgICAgIGNvbnZlcnNpb25PcHRpb25zLmZvckVhY2gobz0+bWVudS5wdXNoKG8pKTtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGdldE5vZGVDb252ZXJzaW9uT3B0aW9ucyhkLCB0cmVlRGVzaWduZXIpe1xuICAgICAgICB2YXIgb3B0aW9ucyA9IFtdO1xuICAgICAgICB2YXIgYWxsQWxsb3dlZFR5cGVzID0gW21vZGVsLkRlY2lzaW9uTm9kZS4kVFlQRSwgbW9kZWwuQ2hhbmNlTm9kZS4kVFlQRSwgbW9kZWwuVGVybWluYWxOb2RlLiRUWVBFXTtcblxuICAgICAgICBpZighZC5jaGlsZEVkZ2VzLmxlbmd0aCAmJiBkLiRwYXJlbnQpe1xuICAgICAgICAgICAgYWxsQWxsb3dlZFR5cGVzLmZpbHRlcih0PT50IT09ZC50eXBlKS5mb3JFYWNoKHR5cGU9PntcbiAgICAgICAgICAgICAgICBvcHRpb25zLnB1c2goTm9kZUNvbnRleHRNZW51LmdldE5vZGVDb252ZXJzaW9uT3B0aW9uKHR5cGUsIHRyZWVEZXNpZ25lcikpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGlmKGQgaW5zdGFuY2VvZiBtb2RlbC5EZWNpc2lvbk5vZGUpe1xuICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaChOb2RlQ29udGV4dE1lbnUuZ2V0Tm9kZUNvbnZlcnNpb25PcHRpb24obW9kZWwuQ2hhbmNlTm9kZS4kVFlQRSwgdHJlZURlc2lnbmVyKSlcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaChOb2RlQ29udGV4dE1lbnUuZ2V0Tm9kZUNvbnZlcnNpb25PcHRpb24obW9kZWwuRGVjaXNpb25Ob2RlLiRUWVBFLCB0cmVlRGVzaWduZXIpKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvcHRpb25zO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXROb2RlQ29udmVyc2lvbk9wdGlvbih0eXBlVG9Db252ZXJ0VG8sIHRyZWVEZXNpZ25lcil7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5ub2RlLmNvbnZlcnQuJyt0eXBlVG9Db252ZXJ0VG8pLFxuICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLmNvbnZlcnROb2RlKGQsIHR5cGVUb0NvbnZlcnRUbyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHtDb250ZXh0TWVudX0gZnJvbSAnLi9jb250ZXh0LW1lbnUnXG5pbXBvcnQge2kxOG59IGZyb20gXCIuLi9pMThuL2kxOG5cIjtcblxuZXhwb3J0IGNsYXNzIFRleHRDb250ZXh0TWVudSBleHRlbmRzIENvbnRleHRNZW51IHtcbiAgICB0cmVlRGVzaWduZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcih0cmVlRGVzaWduZXIpIHtcbiAgICAgICAgdmFyIG1lbnUgPSBmdW5jdGlvbiAoZCkge1xuXG5cbiAgICAgICAgICAgIHZhciBkZWxldGVNZW51SXRlbSA9IHtcbiAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS50ZXh0LmRlbGV0ZScpLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5zZWxlY3RUZXh0KGQsIHRydWUsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIucmVtb3ZlU2VsZWN0ZWRUZXh0cygpXG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIG1lbnUgPSBbXTtcbiAgICAgICAgICAgIG1lbnUucHVzaChkZWxldGVNZW51SXRlbSk7XG4gICAgICAgICAgICByZXR1cm4gbWVudTtcbiAgICAgICAgfTtcblxuICAgICAgICBzdXBlcihtZW51KTtcbiAgICAgICAgdGhpcy50cmVlRGVzaWduZXIgPSB0cmVlRGVzaWduZXI7XG4gICAgfVxufVxuIiwiaW1wb3J0ICogYXMgZDMgZnJvbSAnLi9kMydcblxuZXhwb3J0IGNsYXNzIEQzRXh0ZW5zaW9ucyB7XG5cbiAgICBzdGF0aWMgZXh0ZW5kKCkge1xuXG4gICAgICAgIGQzLnNlbGVjdGlvbi5wcm90b3R5cGUuZW50ZXIucHJvdG90eXBlLmluc2VydFNlbGVjdG9yID1cbiAgICAgICAgICAgIGQzLnNlbGVjdGlvbi5wcm90b3R5cGUuaW5zZXJ0U2VsZWN0b3IgPSBmdW5jdGlvbiAoc2VsZWN0b3IsIGJlZm9yZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBEM0V4dGVuc2lvbnMuaW5zZXJ0U2VsZWN0b3IodGhpcywgc2VsZWN0b3IsIGJlZm9yZSk7XG4gICAgICAgICAgICB9O1xuXG5cbiAgICAgICAgZDMuc2VsZWN0aW9uLnByb3RvdHlwZS5lbnRlci5wcm90b3R5cGUuYXBwZW5kU2VsZWN0b3IgPVxuICAgICAgICAgICAgZDMuc2VsZWN0aW9uLnByb3RvdHlwZS5hcHBlbmRTZWxlY3RvciA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBEM0V4dGVuc2lvbnMuYXBwZW5kU2VsZWN0b3IodGhpcywgc2VsZWN0b3IpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICBkMy5zZWxlY3Rpb24ucHJvdG90eXBlLmVudGVyLnByb3RvdHlwZS5zZWxlY3RPckFwcGVuZCA9XG4gICAgICAgICAgICBkMy5zZWxlY3Rpb24ucHJvdG90eXBlLnNlbGVjdE9yQXBwZW5kID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEQzRXh0ZW5zaW9ucy5zZWxlY3RPckFwcGVuZCh0aGlzLCBzZWxlY3Rvcik7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIGQzLnNlbGVjdGlvbi5wcm90b3R5cGUuZW50ZXIucHJvdG90eXBlLnNlbGVjdE9ySW5zZXJ0ID1cbiAgICAgICAgICAgIGQzLnNlbGVjdGlvbi5wcm90b3R5cGUuc2VsZWN0T3JJbnNlcnQgPSBmdW5jdGlvbiAoc2VsZWN0b3IsIGJlZm9yZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBEM0V4dGVuc2lvbnMuc2VsZWN0T3JJbnNlcnQodGhpcywgc2VsZWN0b3IsIGJlZm9yZSk7XG4gICAgICAgICAgICB9O1xuXG5cbiAgICB9XG5cbiAgICBzdGF0aWMgaW5zZXJ0T3JBcHBlbmRTZWxlY3RvcihwYXJlbnQsIHNlbGVjdG9yLCBvcGVyYXRpb24sIGJlZm9yZSkge1xuXG4gICAgICAgIHZhciBzZWxlY3RvclBhcnRzID0gc2VsZWN0b3Iuc3BsaXQoLyhbXFwuXFwjXSkvKTtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBwYXJlbnRbb3BlcmF0aW9uXShzZWxlY3RvclBhcnRzLnNoaWZ0KCksIGJlZm9yZSk7Ly9cIjpmaXJzdC1jaGlsZFwiXG5cbiAgICAgICAgd2hpbGUgKHNlbGVjdG9yUGFydHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgdmFyIHNlbGVjdG9yTW9kaWZpZXIgPSBzZWxlY3RvclBhcnRzLnNoaWZ0KCk7XG4gICAgICAgICAgICB2YXIgc2VsZWN0b3JJdGVtID0gc2VsZWN0b3JQYXJ0cy5zaGlmdCgpO1xuICAgICAgICAgICAgaWYgKHNlbGVjdG9yTW9kaWZpZXIgPT09IFwiLlwiKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQuY2xhc3NlZChzZWxlY3Rvckl0ZW0sIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzZWxlY3Rvck1vZGlmaWVyID09PSBcIiNcIikge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBlbGVtZW50LmF0dHIoJ2lkJywgc2VsZWN0b3JJdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9XG5cbiAgICBzdGF0aWMgaW5zZXJ0U2VsZWN0b3IocGFyZW50LCBzZWxlY3RvciwgYmVmb3JlKSB7XG4gICAgICAgIHJldHVybiBEM0V4dGVuc2lvbnMuaW5zZXJ0T3JBcHBlbmRTZWxlY3RvcihwYXJlbnQsIHNlbGVjdG9yLCBcImluc2VydFwiLCBiZWZvcmUpO1xuICAgIH1cblxuICAgIHN0YXRpYyBhcHBlbmRTZWxlY3RvcihwYXJlbnQsIHNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiBEM0V4dGVuc2lvbnMuaW5zZXJ0T3JBcHBlbmRTZWxlY3RvcihwYXJlbnQsIHNlbGVjdG9yLCBcImFwcGVuZFwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2VsZWN0T3JBcHBlbmQocGFyZW50LCBzZWxlY3RvciwgZWxlbWVudCkge1xuICAgICAgICB2YXIgc2VsZWN0aW9uID0gcGFyZW50LnNlbGVjdChzZWxlY3Rvcik7XG4gICAgICAgIGlmIChzZWxlY3Rpb24uZW1wdHkoKSkge1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyZW50LmFwcGVuZChlbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBEM0V4dGVuc2lvbnMuYXBwZW5kU2VsZWN0b3IocGFyZW50LCBzZWxlY3Rvcik7XG5cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2VsZWN0aW9uO1xuICAgIH07XG5cbiAgICBzdGF0aWMgc2VsZWN0T3JJbnNlcnQocGFyZW50LCBzZWxlY3RvciwgYmVmb3JlKSB7XG4gICAgICAgIHZhciBzZWxlY3Rpb24gPSBwYXJlbnQuc2VsZWN0KHNlbGVjdG9yKTtcbiAgICAgICAgaWYgKHNlbGVjdGlvbi5lbXB0eSgpKSB7XG4gICAgICAgICAgICByZXR1cm4gRDNFeHRlbnNpb25zLmluc2VydFNlbGVjdG9yKHBhcmVudCwgc2VsZWN0b3IsIGJlZm9yZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNlbGVjdGlvbjtcbiAgICB9O1xufVxuIiwiZXhwb3J0ICogZnJvbSAnZDMtZGlzcGF0Y2gnO1xuZXhwb3J0ICogZnJvbSAnZDMtc2NhbGUnO1xuZXhwb3J0ICogZnJvbSAnZDMtc2VsZWN0aW9uJztcbmV4cG9ydCAqIGZyb20gJ2QzLXNoYXBlJ1xuZXhwb3J0ICogZnJvbSAnZDMtZHJhZyc7XG5leHBvcnQgKiBmcm9tICdkMy1icnVzaCdcbmV4cG9ydCAqIGZyb20gJ2QzLWFycmF5J1xuZXhwb3J0ICogZnJvbSAnZDMtaGllcmFyY2h5J1xuZXhwb3J0ICogZnJvbSAnZDMtdGltZS1mb3JtYXQnXG4iLCJtb2R1bGUuZXhwb3J0cz17XG4gICAgXCJjb250ZXh0TWVudVwiOntcbiAgICAgICAgXCJtYWluXCI6e1xuICAgICAgICAgICAgXCJhZGREZWNpc2lvbk5vZGVcIjogXCJFbnRzY2hlaWR1bmdza25vdGVuIGhpbnp1ZsO8Z2VuXCIsXG4gICAgICAgICAgICBcImFkZENoYW5jZU5vZGVcIjogXCJadWZhbGwgS25vdGVuIGhpbnp1ZsO8Z2VuXCIsXG4gICAgICAgICAgICBcImFkZFRleHRcIjogXCJUZXh0IGhpbnp1ZsO8Z2VuIFwiLFxuICAgICAgICAgICAgXCJwYXN0ZVwiOiBcIkVpbmbDvGdlblwiLFxuICAgICAgICAgICAgXCJzZWxlY3RBbGxOb2Rlc1wiOiBcIkFsbGUgS25vdGVuIGF1c3fDpGhsZW5cIlxuICAgICAgICB9LFxuICAgICAgICBcIm5vZGVcIjp7XG4gICAgICAgICAgICBcImNvcHlcIjogXCJLb3BpZXJlblwiLFxuICAgICAgICAgICAgXCJjdXRcIjogXCJBdXNzY2huZWlkZW5cIixcbiAgICAgICAgICAgIFwicGFzdGVcIjogXCJFaW5mw7xnZW5cIixcbiAgICAgICAgICAgIFwiZGVsZXRlXCI6IFwiTMO2c2NoZW5cIixcbiAgICAgICAgICAgIFwiYWRkRGVjaXNpb25Ob2RlXCI6IFwiRW50c2NoZWlkdW5nc2tub3RlbiBoaW56dWbDvGdlblwiLFxuICAgICAgICAgICAgXCJhZGRDaGFuY2VOb2RlXCI6IFwiWnVmYWxsIEtub3RlbiBoaW56dWbDvGdlblwiLFxuICAgICAgICAgICAgXCJhZGRUZXJtaW5hbE5vZGVcIjogXCJFbmRrbm90dGVuIGhpbnp1ZsO8Z2VuXCIsXG4gICAgICAgICAgICBcImNvbnZlcnRcIjp7XG4gICAgICAgICAgICAgICAgXCJkZWNpc2lvblwiOiBcIkFscyBFbnRzY2hlaWR1bmdza25vdGVuXCIsXG4gICAgICAgICAgICAgICAgXCJjaGFuY2VcIjogXCJBbHMgWnVmYWxsIEtub3RlblwiLFxuICAgICAgICAgICAgICAgIFwidGVybWluYWxcIjogXCJBbHMgRW5ka25vdGVuXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInNlbGVjdFN1YnRyZWVcIjogXCJUZWlsYmF1bSB3w6RobGVuXCIsXG4gICAgICAgICAgICBcImZvbGRcIjogXCJUZWlsYmF1bSBmYWx0ZW5cIixcbiAgICAgICAgICAgIFwidW5mb2xkXCI6IFwiVGVpbGJhdW0gZW50ZmFsdGVuXCIsXG5cdFx0XHRcbiAgICAgICAgICAgIFwiZmxpcFN1YnRyZWVcIjogXCJUZWlsYmF1bSB1bWRyZWhlblwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiZWRnZVwiOntcbiAgICAgICAgICAgIFwiaW5qZWN0RGVjaXNpb25Ob2RlXCI6IFwiRW50c2NoZWlkdW5nc2tub3RlbiBJbmppemllcmVuXCIsXG4gICAgICAgICAgICBcImluamVjdENoYW5jZU5vZGVcIjogXCJadWZhbGwgS25vdGVuIEluaml6aWVyZW5cIlxuICAgICAgICB9LFxuICAgICAgICBcInRleHRcIjp7XG4gICAgICAgICAgICBcImRlbGV0ZVwiOiBcIkzDtnNjaGVuXCJcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXCJ2YWxpZGF0aW9uXCI6e1xuICAgICAgICBcImluY29tcGxldGVQYXRoXCI6IFwiUGZhZCwgZGVyIG5pY2h0IG1pdCBkZW0gRW5ka25vdGVuIGVuZGV0XCIsXG4gICAgICAgIFwicHJvYmFiaWxpdHlEb05vdFN1bVVwVG8xXCI6IFwiRGllIFN1bW1lIGRlciBXYWhyc2NoZWlubGljaGtlaXRlbiBpc3QgbmljaHQgZ2xlaWNoIDFcIixcbiAgICAgICAgXCJpbnZhbGlkUHJvYmFiaWxpdHlcIjogXCJVbmfDvGx0aWdlIFdhaHJzY2hlaW5saWNoa2VpdCBpbSBad2VpZyAje3tudW1iZXJ9fVwiLFxuICAgICAgICBcImludmFsaWRQYXlvZmZcIjogXCJVbmfDvGx0aWdlIEF1c3phaGx1bmcgaW4gWndlaWcgI3t7bnVtYmVyfX1cIlxuICAgIH0sXG4gICAgXCJncm93bFwiOntcbiAgICAgICAgXCJicnVzaERpc2FibGVkXCI6IFwiQXVzd2FobGLDvHJzdGUgZGVha3RpdmllcnRcIixcbiAgICAgICAgXCJicnVzaEVuYWJsZWRcIjogXCJBdXN3YWhsYsO8cnN0ZSBha3RpdmllcnRcIlxuICAgIH0sXG4gICAgXCJ0b29sdGlwXCI6e1xuICAgICAgICBcIm5vZGVcIjp7XG4gICAgICAgICAgICBcInBheW9mZlwiOiB7XG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiQXVzemFobHVuZyB7e251bWJlcn19XCIsXG4gICAgICAgICAgICAgICAgXCJuYW1lZFwiOiBcInt7bmFtZX19XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImFnZ3JlZ2F0ZWRQYXlvZmZcIjoge1xuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIkFnZ3JlZ2llcnRlIEF1c3phaGx1bmcge3tudW1iZXJ9fVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJBZ2dyZWdpZXJ0ZSB7e25hbWV9fVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJwcm9iYWJpbGl0eVRvRW50ZXJcIjogXCJXYWhyc2NoZWlubGljaGtlaXRcIlxuICAgICAgICB9LFxuICAgICAgICBcImVkZ2VcIjp7XG4gICAgICAgICAgICBcInBheW9mZlwiOiB7XG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiQXVzemFobHVuZyB7e251bWJlcn19OiB7e3ZhbHVlfX1cIixcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwie3tuYW1lfX06IHt7dmFsdWV9fVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJwcm9iYWJpbGl0eVwiOiBcIldhaHJzY2hlaW5saWNoa2VpdDoge3t2YWx1ZX19XCJcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgICBcImNvbnRleHRNZW51XCI6e1xuICAgICAgICBcIm1haW5cIjp7XG4gICAgICAgICAgICBcImFkZERlY2lzaW9uTm9kZVwiOiBcIkFkZCBEZWNpc2lvbiBOb2RlXCIsXG4gICAgICAgICAgICBcImFkZENoYW5jZU5vZGVcIjogXCJBZGQgQ2hhbmNlIE5vZGVcIixcbiAgICAgICAgICAgIFwiYWRkVGV4dFwiOiBcIkFkZCBUZXh0XCIsXG4gICAgICAgICAgICBcInBhc3RlXCI6IFwiUGFzdGVcIixcbiAgICAgICAgICAgIFwic2VsZWN0QWxsTm9kZXNcIjogXCJTZWxlY3QgYWxsIG5vZGVzXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJub2RlXCI6e1xuICAgICAgICAgICAgXCJjb3B5XCI6IFwiQ29weVwiLFxuICAgICAgICAgICAgXCJjdXRcIjogXCJDdXRcIixcbiAgICAgICAgICAgIFwicGFzdGVcIjogXCJQYXN0ZVwiLFxuICAgICAgICAgICAgXCJkZWxldGVcIjogXCJEZWxldGVcIixcbiAgICAgICAgICAgIFwiYWRkRGVjaXNpb25Ob2RlXCI6IFwiQWRkIERlY2lzaW9uIE5vZGVcIixcbiAgICAgICAgICAgIFwiYWRkQ2hhbmNlTm9kZVwiOiBcIkFkZCBDaGFuY2UgTm9kZVwiLFxuICAgICAgICAgICAgXCJhZGRUZXJtaW5hbE5vZGVcIjogXCJBZGQgVGVybWluYWwgTm9kZVwiLFxuICAgICAgICAgICAgXCJjb252ZXJ0XCI6e1xuICAgICAgICAgICAgICAgIFwiZGVjaXNpb25cIjogXCJBcyBEZWNpc2lvbiBOb2RlXCIsXG4gICAgICAgICAgICAgICAgXCJjaGFuY2VcIjogXCJBcyBDaGFuY2UgTm9kZVwiLFxuICAgICAgICAgICAgICAgIFwidGVybWluYWxcIjogXCJBcyBUZXJtaW5hbCBOb2RlXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInNlbGVjdFN1YnRyZWVcIjogXCJTZWxlY3Qgc3VidHJlZVwiLFxuICAgICAgICAgICAgXCJmb2xkXCI6IFwiRm9sZCBzdWJ0cmVlXCIsXG4gICAgICAgICAgICBcInVuZm9sZFwiOiBcIlVuZm9sZCBzdWJ0cmVlXCIsXG4gICAgICAgICAgICBcImZsaXBTdWJ0cmVlXCI6IFwiRmxpcCBzdWJ0cmVlXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJlZGdlXCI6e1xuICAgICAgICAgICAgXCJpbmplY3REZWNpc2lvbk5vZGVcIjogXCJJbmplY3QgRGVjaXNpb24gTm9kZVwiLFxuICAgICAgICAgICAgXCJpbmplY3RDaGFuY2VOb2RlXCI6IFwiSW5qZWN0IENoYW5jZSBOb2RlXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJ0ZXh0XCI6e1xuICAgICAgICAgICAgXCJkZWxldGVcIjogXCJEZWxldGVcIlxuICAgICAgICB9XG4gICAgfSxcbiAgICBcInZhbGlkYXRpb25cIjp7XG4gICAgICAgIFwiaW5jb21wbGV0ZVBhdGhcIjogXCJQYXRoIG5vdCBlbmRpbmcgd2l0aCB0ZXJtaW5hbCBub2RlXCIsXG4gICAgICAgIFwicHJvYmFiaWxpdHlEb05vdFN1bVVwVG8xXCI6IFwiUHJvYmFiaWxpdGllcyBkbyBub3Qgc3VtIHVwIHRvIDFcIixcbiAgICAgICAgXCJpbnZhbGlkUHJvYmFiaWxpdHlcIjogXCJJbnZhbGlkIHByb2JhYmlsaXR5IGluIGVkZ2UgI3t7bnVtYmVyfX1cIixcbiAgICAgICAgXCJpbnZhbGlkUGF5b2ZmXCI6IFwiSW52YWxpZCBwYXlvZmYgaW4gZWRnZSAje3tudW1iZXJ9fVwiXG4gICAgfSxcbiAgICBcImdyb3dsXCI6e1xuICAgICAgICBcImJydXNoRGlzYWJsZWRcIjogXCJTZWxlY3Rpb24gYnJ1c2ggZGlzYWJsZWRcIixcbiAgICAgICAgXCJicnVzaEVuYWJsZWRcIjogXCJTZWxlY3Rpb24gYnJ1c2ggZW5hYmxlZFwiXG4gICAgfSxcbiAgICBcInRvb2x0aXBcIjp7XG4gICAgICAgIFwibm9kZVwiOntcbiAgICAgICAgICAgIFwicGF5b2ZmXCI6IHtcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJQYXlvZmYge3tudW1iZXJ9fVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJ7e25hbWV9fVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJhZ2dyZWdhdGVkUGF5b2ZmXCI6IHtcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJBZ2dyZWdhdGVkIFBheW9mZiB7e251bWJlcn19XCIsXG4gICAgICAgICAgICAgICAgXCJuYW1lZFwiOiBcIkFnZ3JlZ2F0ZWQge3tuYW1lfX1cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwicHJvYmFiaWxpdHlUb0VudGVyXCI6IFwiUHJvYmFiaWxpdHkgdG8gZW50ZXJcIlxuICAgICAgICB9LFxuICAgICAgICBcImVkZ2VcIjp7XG4gICAgICAgICAgICBcInBheW9mZlwiOiB7XG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiUGF5b2ZmIHt7bnVtYmVyfX06IHt7dmFsdWV9fVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJ7e25hbWV9fToge3t2YWx1ZX19XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInByb2JhYmlsaXR5XCI6IFwiUHJvYmFiaWxpdHk6IHt7dmFsdWV9fVwiXG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cz17XG4gICAgXCJjb250ZXh0TWVudVwiOntcbiAgICAgICAgXCJtYWluXCI6e1xuICAgICAgICAgICAgXCJhZGREZWNpc2lvbk5vZGVcIjogXCJBam91dGVyIG5vdWQgZGUgZMOpY2lzaW9uXCIsXG4gICAgICAgICAgICBcImFkZENoYW5jZU5vZGVcIjogXCJBam91dGVyIG5vdWQgYWzDqWF0b2lyZVwiLFxuICAgICAgICAgICAgXCJhZGRUZXh0XCI6IFwiQWpvdXRlciBkdSB0ZXh0ZVwiLFxuICAgICAgICAgICAgXCJwYXN0ZVwiOiBcIkNvbGxlclwiLFxuICAgICAgICAgICAgXCJzZWxlY3RBbGxOb2Rlc1wiOiBcIlPDqWxlY3Rpb25uZXIgdG91cyBsZXMgbm91ZHNcIlxuICAgICAgICB9LFxuICAgICAgICBcIm5vZGVcIjp7XG4gICAgICAgICAgICBcImNvcHlcIjogXCJDb3BpZVwiLFxuICAgICAgICAgICAgXCJjdXRcIjogXCJDb3VwZXJcIixcbiAgICAgICAgICAgIFwicGFzdGVcIjogXCJDb2xsZXJcIixcbiAgICAgICAgICAgIFwiZGVsZXRlXCI6IFwiRWZmYWNlclwiLFxuICAgICAgICAgICAgXCJhZGREZWNpc2lvbk5vZGVcIjogXCJBam91dGVyIG5vdWQgZGUgZMOpY2lzaW9uXCIsXG4gICAgICAgICAgICBcImFkZENoYW5jZU5vZGVcIjogXCJBam91dGVyIG5vdWQgYWzDqWF0b2lyZVwiLFxuICAgICAgICAgICAgXCJhZGRUZXJtaW5hbE5vZGVcIjogXCJBam91dGVyIHVuIG5vZXVkIHRlcm1pbmFsXCIsXG4gICAgICAgICAgICBcImNvbnZlcnRcIjp7XG4gICAgICAgICAgICAgICAgXCJkZWNpc2lvblwiOiBcIkNvbW1lIG5vdWQgZGUgZMOpY2lzaW9uXCIsXG4gICAgICAgICAgICAgICAgXCJjaGFuY2VcIjogXCJDb21tZSBub3VkIGFsw6lhdG9pcmVcIixcbiAgICAgICAgICAgICAgICBcInRlcm1pbmFsXCI6IFwiQ29tbWUgdW4gbm9ldWQgdGVybWluYWxcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwic2VsZWN0U3VidHJlZVwiOiBcIlPDqWxlY3Rpb25uZXIgdW5lIHNvdXMtYXJib3Jlc2NlbmNlXCIsXG4gICAgICAgICAgICBcImZvbGRcIjogXCJQbGllciBzb3VzLWFyYnJlXCIsXG4gICAgICAgICAgICBcInVuZm9sZFwiOiBcIkTDqXBsaWVyIGFyYnJlIHNvdXMtYXJicmVcIixcbiAgICAgICAgICAgIFwiZmxpcFN1YnRyZWVcIjogXCJCYXNjdWxlciBzb3VzLWFyYnJlXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJlZGdlXCI6e1xuICAgICAgICAgICAgXCJpbmplY3REZWNpc2lvbk5vZGVcIjogXCJJbmplY3RlciB1biBub2V1ZCBkZSBkw6ljaXNpb25cIixcbiAgICAgICAgICAgIFwiaW5qZWN0Q2hhbmNlTm9kZVwiOiBcIkluamVjdGVyIHVuIG5vZXVkIGRlIGNoYW5jZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwidGV4dFwiOntcbiAgICAgICAgICAgIFwiZGVsZXRlXCI6IFwiRWZmYWNlclwiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwidmFsaWRhdGlvblwiOntcbiAgICAgICAgXCJpbmNvbXBsZXRlUGF0aFwiOiBcIlBhcmNvdXJzIG5vbiB0ZXJtaW7DqSBwYXIgbm9ldWQgdGVybWluYWxcIixcbiAgICAgICAgXCJwcm9iYWJpbGl0eURvTm90U3VtVXBUbzFcIjogXCJMYSBzb21tZSBkZXMgcHJvYmFiaWxpdMOpcyBuJ2VzdCBwYXMgMSBvdSBwbHVzXCIsXG4gICAgICAgIFwiaW52YWxpZFByb2JhYmlsaXR5XCI6IFwiUHJvYmFiaWxpdMOpIGludmFsaWRlIC0gbGUgYm9yZCAje3tudW1iZXJ9fVwiLFxuICAgICAgICBcImludmFsaWRQYXlvZmZcIjogXCJBdmFudGFnZSBpbnZhbGlkZSAtIGxlIGJvcmQgI3t7bnVtYmVyfX1cIlxuICAgIH0sXG4gICAgXCJncm93bFwiOntcbiAgICAgICAgXCJicnVzaERpc2FibGVkXCI6IFwiQnJvc3NlIGRlIHPDqWxlY3Rpb24gZMOpc2FjdGl2w6llXCIsXG4gICAgICAgIFwiYnJ1c2hFbmFibGVkXCI6IFwiQnJvc3NlIGRlIHPDqWxlY3Rpb24gYWN0aXbDqWVcIlxuICAgIH0sXG4gICAgXCJ0b29sdGlwXCI6e1xuICAgICAgICBcIm5vZGVcIjp7XG4gICAgICAgICAgICBcInBheW9mZlwiOiB7XG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiQXZhbnRhZ2Uge3tudW1iZXJ9fVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJ7e25hbWV9fVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJhZ2dyZWdhdGVkUGF5b2ZmXCI6IHtcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJBdmFudGFnZSBhZ3LDqWfDqSB7e251bWJlcn19XCIsXG4gICAgICAgICAgICAgICAgXCJuYW1lZFwiOiBcIkFncsOpZ8OpICB7e25hbWV9fVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJwcm9iYWJpbGl0eVRvRW50ZXJcIjogXCJQcm9iYWJpbGl0w6kgZCdlbnRyw6llXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJlZGdlXCI6e1xuICAgICAgICAgICAgXCJwYXlvZmZcIjoge1xuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIkF2YW50YWdlIHt7bnVtYmVyfX06IHt7dmFsdWV9fVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJ7e25hbWV9fToge3t2YWx1ZX19XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInByb2JhYmlsaXR5XCI6IFwiUHJvYmFiaWxpdMOpOiB7e3ZhbHVlfX1cIlxuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IGkxOG5leHQgZnJvbSAnaTE4bmV4dCc7XG5pbXBvcnQgKiBhcyBlbiBmcm9tICcuL2VuLmpzb24nXG5pbXBvcnQgKiBhcyBwbCBmcm9tICcuL3BsLmpzb24nXG5pbXBvcnQgKiBhcyBpdCBmcm9tICcuL2l0Lmpzb24nXG5pbXBvcnQgKiBhcyBkZSBmcm9tICcuL2RlLmpzb24nXG5pbXBvcnQgKiBhcyBmciBmcm9tICcuL2ZyLmpzb24nXG5cbmV4cG9ydCBjbGFzcyBpMThue1xuXG4gICAgc3RhdGljICRpbnN0YW5jZTtcbiAgICBzdGF0aWMgbGFuZ3VhZ2U7XG5cbiAgICBzdGF0aWMgaW5pdChsbmcpe1xuICAgICAgICBpMThuLmxhbmd1YWdlID0gbG5nO1xuICAgICAgICBsZXQgcmVzb3VyY2VzID0ge1xuICAgICAgICAgICAgZW46IHtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGlvbjogZW5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwbDoge1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0aW9uOiBwbFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGl0OiB7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRpb246IGl0XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGU6IHtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGlvbjogZGVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmcjoge1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0aW9uOiBmclxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBpMThuLiRpbnN0YW5jZSA9IGkxOG5leHQuY3JlYXRlSW5zdGFuY2Uoe1xuICAgICAgICAgICAgbG5nOiBsbmcsXG4gICAgICAgICAgICBmYWxsYmFja0xuZzogJ2VuJyxcbiAgICAgICAgICAgIHJlc291cmNlczogcmVzb3VyY2VzXG4gICAgICAgIH0sIChlcnIsIHQpID0+IHtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIHQoa2V5LCBvcHQpe1xuICAgICAgICByZXR1cm4gaTE4bi4kaW5zdGFuY2UudChrZXksIG9wdClcbiAgICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cz17XG4gICAgXCJjb250ZXh0TWVudVwiOntcbiAgICAgICAgXCJtYWluXCI6e1xuICAgICAgICAgICAgXCJhZGREZWNpc2lvbk5vZGVcIjogXCJBZ2dpdW5naSB1biBub2RvIGRpIGRlY2lzaW9uZVwiLFxuICAgICAgICAgICAgXCJhZGRDaGFuY2VOb2RlXCI6IFwiQWdnaXVuZ2kgdW4gbm9kbyBvcHBvcnR1bml0w6BcIixcbiAgICAgICAgICAgIFwiYWRkVGV4dFwiOiBcIkFnZ2l1bmdpIHRlc3RvXCIsXG4gICAgICAgICAgICBcInBhc3RlXCI6IFwiSW5jb2xsYVwiLFxuICAgICAgICAgICAgXCJzZWxlY3RBbGxOb2Rlc1wiOiBcIlNlbGV6aW9uYSB0dXR0aSBpIG5vZGlcIlxuICAgICAgICB9LFxuICAgICAgICBcIm5vZGVcIjp7XG4gICAgICAgICAgICBcImNvcHlcIjogXCJDb3BpYVwiLFxuICAgICAgICAgICAgXCJjdXRcIjogXCJUYWdsaWFcIixcbiAgICAgICAgICAgIFwicGFzdGVcIjogXCJJbmNvbGxhXCIsXG4gICAgICAgICAgICBcImRlbGV0ZVwiOiBcIkNhbmNlbGxhXCIsXG4gICAgICAgICAgICBcImFkZERlY2lzaW9uTm9kZVwiOiBcIkFnZ2l1bmdpIHVuIG5vZG8gZGkgZGVjaXNpb25lXCIsXG4gICAgICAgICAgICBcImFkZENoYW5jZU5vZGVcIjogXCJBZ2dpdW5naSB1biBub2RvIG9wcG9ydHVuaXTDoFwiLFxuICAgICAgICAgICAgXCJhZGRUZXJtaW5hbE5vZGVcIjogXCJBZ2dpdW5naSB1biBub2RvIHRlcm1pbmFsZVwiLFxuICAgICAgICAgICAgXCJjb252ZXJ0XCI6e1xuICAgICAgICAgICAgICAgIFwiZGVjaXNpb25cIjogXCJDb21lIERlY2lzaW9uIE5vZGVcIixcbiAgICAgICAgICAgICAgICBcImNoYW5jZVwiOiBcIkNvbWUgQ2hhbmNlIE5vZGVcIixcbiAgICAgICAgICAgICAgICBcInRlcm1pbmFsXCI6IFwiQ29tZSBUZXJtaW5hbCBOb2RlXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInNlbGVjdFN1YnRyZWVcIjogXCJTZWxlemlvbmEgU290dG8tYWxiZXJvXCIsXG4gICAgICAgICAgICBcImZvbGRcIjogXCJQaWVnYSBzb3R0by1hbGJlcm9cIixcbiAgICAgICAgICAgIFwidW5mb2xkXCI6IFwiRGlzcGllZ2Fyc2kgc290dG8tYWxiZXJvXCIsXHRcdFx0XG4gICAgICAgICAgICBcImZsaXBTdWJ0cmVlXCI6IFwiUmliYWx0YSBzb3R0by1hbGJlcm9cIlxuICAgICAgICB9LFxuICAgICAgICBcImVkZ2VcIjp7XG4gICAgICAgICAgICBcImluamVjdERlY2lzaW9uTm9kZVwiOiBcIkluaWV0dGEgbm9kbyBkaSBkZWNpc2lvbmVcIixcbiAgICAgICAgICAgIFwiaW5qZWN0Q2hhbmNlTm9kZVwiOiBcIkluaWV0dGEgbm9kbyBvcHBvcnR1bml0w6BcIlxuICAgICAgICB9LFxuICAgICAgICBcInRleHRcIjp7XG4gICAgICAgICAgICBcImRlbGV0ZVwiOiBcIkNhbmNlbGxhXCJcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXCJ2YWxpZGF0aW9uXCI6e1xuICAgICAgICBcImluY29tcGxldGVQYXRoXCI6IFwiUGVyY29yc28gc2VuemEgbm9kbyB0ZXJtaW5hbGVcIixcbiAgICAgICAgXCJwcm9iYWJpbGl0eURvTm90U3VtVXBUbzFcIjogXCJMYSBzb21tYSBkZWxsZSBwcm9iYWJpbGl0w6Agw6ggZGl2ZXJzYSBkYSAxXCIsXG4gICAgICAgIFwiaW52YWxpZFByb2JhYmlsaXR5XCI6IFwiUHJvYmFiaWxpdMOgIG5vbiB2YWxpZGEgLSBib3JkbyAje3tudW1iZXJ9fVwiLFxuICAgICAgICBcImludmFsaWRQYXlvZmZcIjogXCJTYWxkbyBub24gdmFsaWRvIC0gYm9yZG8gI3t7bnVtYmVyfX1cIlxuICAgIH0sXG4gICAgXCJncm93bFwiOntcbiAgICAgICAgXCJicnVzaERpc2FibGVkXCI6IFwiU2VsZXppb25lIHBlbm5lbGxvIGRpc2FiaWxpdGF0YVwiLFxuICAgICAgICBcImJydXNoRW5hYmxlZFwiOiBcIlNlbGV6aW9uZSBwZW5uZWxsbyBhYmlsaXRhdGFcIlxuICAgIH0sXG4gICAgXCJ0b29sdGlwXCI6e1xuICAgICAgICBcIm5vZGVcIjp7XG4gICAgICAgICAgICBcInBheW9mZlwiOiB7XG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiU2FsZG8ge3tudW1iZXJ9fVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJ7e25hbWV9fVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJhZ2dyZWdhdGVkUGF5b2ZmXCI6IHtcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJTYWxkbyBhZ2dyZWdhdG8ge3tudW1iZXJ9fVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJBZ2dyZWdhdG8ge3tuYW1lfX1cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwicHJvYmFiaWxpdHlUb0VudGVyXCI6IFwiUHJvYmFiaWxpdMOgIGRhIGluc2VyaXJlXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJlZGdlXCI6e1xuICAgICAgICAgICAgXCJwYXlvZmZcIjoge1xuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIlNhbGRvIHt7bnVtYmVyfX06IHt7dmFsdWV9fVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJ7e25hbWV9fToge3t2YWx1ZX19XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInByb2JhYmlsaXR5XCI6IFwiUHJvYmFiaWxpdMOgOiB7e3ZhbHVlfX1cIlxuICAgICAgICB9XG4gICAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHM9e1xuXG4gICAgXCJjb250ZXh0TWVudVwiOntcbiAgICAgICAgXCJtYWluXCI6e1xuICAgICAgICAgICAgXCJhZGREZWNpc2lvbk5vZGVcIjogXCJEb2RhaiBXxJl6ZcWCIERlY3l6eWpueVwiLFxuICAgICAgICAgICAgXCJhZGRDaGFuY2VOb2RlXCI6IFwiRG9kYWogV8SZemXFgiBMb3Nvd3lcIixcbiAgICAgICAgICAgIFwiYWRkVGV4dFwiOiBcIkRvZGFqIFRla3N0XCIsXG4gICAgICAgICAgICBcInBhc3RlXCI6IFwiV2tsZWpcIixcbiAgICAgICAgICAgIFwic2VsZWN0QWxsTm9kZXNcIjogXCJaYXpuYWN6IHdzenlzdGtpZSB3xJl6xYJ5XCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJub2RlXCI6e1xuICAgICAgICAgICAgXCJjb3B5XCI6IFwiS29waXVqXCIsXG4gICAgICAgICAgICBcImN1dFwiOiBcIld5dG5palwiLFxuICAgICAgICAgICAgXCJwYXN0ZVwiOiBcIldrbGVqXCIsXG4gICAgICAgICAgICBcImRlbGV0ZVwiOiBcIlVzdcWEXCIsXG4gICAgICAgICAgICBcImFkZERlY2lzaW9uTm9kZVwiOiBcIkRvZGFqIFfEmXplxYIgRGVjeXp5am55XCIsXG4gICAgICAgICAgICBcImFkZENoYW5jZU5vZGVcIjogXCJEb2RhaiBXxJl6ZcWCIExvc293eVwiLFxuICAgICAgICAgICAgXCJhZGRUZXJtaW5hbE5vZGVcIjogXCJEb2RhaiBXxJl6ZcWCIEtvxYRjb3d5XCIsXG4gICAgICAgICAgICBcImNvbnZlcnRcIjp7XG4gICAgICAgICAgICAgICAgXCJkZWNpc2lvblwiOiBcIkpha28gV8SZemXFgiBEZWN5enlqbnlcIixcbiAgICAgICAgICAgICAgICBcImNoYW5jZVwiOiBcIkpha28gV8SZemXFgiBMb3Nvd3lcIixcbiAgICAgICAgICAgICAgICBcInRlcm1pbmFsXCI6IFwiSmFrbyBXxJl6ZcWCIEtvxYRjb3d5XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInNlbGVjdFN1YnRyZWVcIjogXCJaYXpuYWN6IHBvZGRyemV3b1wiLFxuICAgICAgICAgICAgXCJmb2xkXCI6IFwiWndpxYQgcG9kZHJ6ZXdvXCIsXG4gICAgICAgICAgICBcInVuZm9sZFwiOiBcIlJvendpxYQgcG9kZHJ6ZXdvXCIsXG4gICAgICAgICAgICBcImZsaXBTdWJ0cmVlXCI6IFwiUHJ6ZXdyw7PEhyBwb2Rkcnpld29cIlxuICAgICAgICB9LFxuICAgICAgICBcImVkZ2VcIjp7XG4gICAgICAgICAgICBcImluamVjdERlY2lzaW9uTm9kZVwiOiBcIldzdHJ6eWtuaWogV8SZemXFgiBEZWN5enlqbnlcIixcbiAgICAgICAgICAgIFwiaW5qZWN0Q2hhbmNlTm9kZVwiOiBcIldzdHJ6eWtuaWogV8SZemXFgiBMb3Nvd3lcIlxuICAgICAgICB9LFxuICAgICAgICBcInRleHRcIjp7XG4gICAgICAgICAgICBcImRlbGV0ZVwiOiBcIlVzdcWEXCJcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBcInZhbGlkYXRpb25cIjp7XG4gICAgICAgIFwiaW5jb21wbGV0ZVBhdGhcIjogXCJPc3RhdG5pbSB3xJl6xYJlbSB3IMWbY2llxbxjZSBwb3dpbmllbiBiecSHIFfEmXplxYIgS2/FhGNvd3lcIixcbiAgICAgICAgXCJwcm9iYWJpbGl0eURvTm90U3VtVXBUbzFcIjogXCJQcmF3ZG9wb2RvYmllxYRzdHdhIG5pZSBzdW11asSFIHNpZSBkbyAxXCIsXG4gICAgICAgIFwiaW52YWxpZFByb2JhYmlsaXR5XCI6IFwiTmllcG9wcmF3bmUgcHJhd2RvcG9kb2JpZcWEc3R3byBuYSBrcmF3xJlkemkgI3t7bnVtYmVyfX1cIixcbiAgICAgICAgXCJpbnZhbGlkUGF5b2ZmXCI6IFwiTmllcG9wcmF3bmEgd3lwxYJhdGEgbmEga3Jhd8SZZHppICN7e251bWJlcn19XCJcbiAgICB9LFxuICAgIFwiZ3Jvd2xcIjp7XG4gICAgICAgIFwiYnJ1c2hEaXNhYmxlZFwiOiBcIlphem5hY3phbmllIHd5xYLEhWN6b25lXCIsXG4gICAgICAgIFwiYnJ1c2hFbmFibGVkXCI6IFwiWmF6bmFjemFuaWUgd8WCxIVjem9uZVwiXG4gICAgfSxcbiAgICBcInRvb2x0aXBcIjp7XG4gICAgICAgIFwibm9kZVwiOntcbiAgICAgICAgICAgIFwicGF5b2ZmXCI6IHtcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJXeXDFgmF0YSB7e251bWJlcn19XCIsXG4gICAgICAgICAgICAgICAgXCJuYW1lZFwiOiBcInt7bmFtZX19XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImFnZ3JlZ2F0ZWRQYXlvZmZcIjoge1xuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIlphZ3JlZ293YW5hIHd5cMWCYXRhIHt7bnVtYmVyfX1cIixcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwiWmFncmVnb3dhbmEge3tuYW1lfX1cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwicHJvYmFiaWxpdHlUb0VudGVyXCI6IFwiUHJhd2RvcG9kb2JpZcWEc3R3byB3ZWrFm2NpYVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiZWRnZVwiOntcbiAgICAgICAgICAgIFwicGF5b2ZmXCI6IHtcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJXeXDFgmF0YSB7e251bWJlcn19OiB7e3ZhbHVlfX1cIixcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwie3tuYW1lfX06IHt7dmFsdWV9fVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJwcm9iYWJpbGl0eVwiOiBcIlByYXdkb3BvZG9iaWXFhHN0d286IHt7dmFsdWV9fVwiXG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQge0QzRXh0ZW5zaW9uc30gZnJvbSAnLi9kMy1leHRlbnNpb25zJ1xuRDNFeHRlbnNpb25zLmV4dGVuZCgpO1xuXG5leHBvcnQgKiBmcm9tICcuL3RyZWUtZGVzaWduZXInXG5leHBvcnQgKiBmcm9tICcuL2FwcC11dGlscydcbmV4cG9ydCAqIGZyb20gJy4vdGVtcGxhdGVzJ1xuZXhwb3J0ICogZnJvbSAnLi90b29sdGlwJ1xuZXhwb3J0ICogZnJvbSAnLi9kMy1leHRlbnNpb25zJ1xuZXhwb3J0IHtkZWZhdWx0IGFzIGQzfSBmcm9tICcuL2QzJ1xuXG5cbiIsImltcG9ydCB7VXRpbHN9IGZyb20gJ3NkLXV0aWxzJ1xuaW1wb3J0IHtkb21haW4gYXMgbW9kZWx9IGZyb20gJ3NkLW1vZGVsJ1xuaW1wb3J0ICogYXMgZDMgZnJvbSAnLi9kMydcbmltcG9ydCBjaXJjbGVTeW1ib2wgZnJvbSAnLi9zeW1ib2xzL2NpcmNsZSdcbmltcG9ydCB0cmlhbmdsZVN5bWJvbCBmcm9tICcuL3N5bWJvbHMvdHJpYW5nbGUnXG5pbXBvcnQge0FwcFV0aWxzfSBmcm9tIFwiLi9hcHAtdXRpbHNcIjtcblxuLypUcmVlIGxheW91dCBtYW5hZ2VyKi9cbmV4cG9ydCBjbGFzcyBMYXlvdXR7XG5cbiAgICB0cmVlRGVzaWduZXI7XG4gICAgZGF0YTtcbiAgICBjb25maWc7XG5cbiAgICBub2RlVHlwZVRvU3ltYm9sID0ge1xuICAgICAgICAnZGVjaXNpb24nOiBkMy5zeW1ib2xTcXVhcmUsXG4gICAgICAgICdjaGFuY2UnOiBjaXJjbGVTeW1ib2wsXG4gICAgICAgIFwidGVybWluYWxcIjogdHJpYW5nbGVTeW1ib2xcbiAgICB9O1xuXG4gICAgc3RhdGljIE1BTlVBTF9MQVlPVVRfTkFNRSA9ICdtYW51YWwnO1xuXG5cbiAgICBvbkF1dG9MYXlvdXRDaGFuZ2VkPVtdO1xuXG4gICAgbm9kZVR5cGVPcmRlciA9IHtcbiAgICAgICAgJ2RlY2lzaW9uJyA6IDAsXG4gICAgICAgICdjaGFuY2UnOiAwLFxuICAgICAgICAndGVybWluYWwnOiAxXG4gICAgfTtcblxuICAgIHRyZWVNYXJnaW4gPSA1MDtcbiAgICB0YXJnZXRTeW1ib2xTaXplPXt9O1xuICAgIG5vZGVTZXBhcmF0aW9uID0gKGEsIGIpID0+IGEucGFyZW50ID09PSBiLnBhcmVudCA/IDEgOiAxLjJcblxuICAgIGNvbnN0cnVjdG9yKHRyZWVEZXNpZ25lciwgZGF0YSwgY29uZmlnKXtcbiAgICAgICAgdGhpcy50cmVlRGVzaWduZXIgPSB0cmVlRGVzaWduZXI7XG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuXG4gICAgfVxuXG4gICAgdXBkYXRlKG5vZGUpe1xuICAgICAgICBpZihub2RlICYmIG5vZGUuJHBhcmVudCl7XG4gICAgICAgICAgICBub2RlLiRwYXJlbnQuY2hpbGRFZGdlcy5zb3J0KChhLGIpPT5hLmNoaWxkTm9kZS5sb2NhdGlvbi55IC0gYi5jaGlsZE5vZGUubG9jYXRpb24ueSlcbiAgICAgICAgfVxuICAgICAgICBpZighdGhpcy5pc01hbnVhbExheW91dCgpKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmF1dG9MYXlvdXQodGhpcy5jb25maWcudHlwZSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYobm9kZSl7XG4gICAgICAgICAgICB0aGlzLm1vdmVOb2RlVG9FbXB0eVBsYWNlKG5vZGUpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMudHJlZURlc2lnbmVyLnJlZHJhdyh0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzTWFudWFsTGF5b3V0KCl7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy50eXBlID09PSBMYXlvdXQuTUFOVUFMX0xBWU9VVF9OQU1FO1xuICAgIH1cblxuICAgIGdldE5ld0NoaWxkTG9jYXRpb24ocGFyZW50KXtcbiAgICAgICAgaWYoIXBhcmVudCl7XG4gICAgICAgICAgICByZXR1cm4gbmV3IG1vZGVsLlBvaW50KHRoaXMuZ2V0Tm9kZU1pblgoKSwgdGhpcy5nZXROb2RlTWluWSgpKVxuICAgICAgICB9XG4gICAgICAgIHZhciB4ID0gcGFyZW50LmxvY2F0aW9uLnggKyB0aGlzLmNvbmZpZy5ncmlkV2lkdGg7XG4gICAgICAgIHZhciB5ID0gcGFyZW50LmxvY2F0aW9uLnk7XG4gICAgICAgIGlmKHBhcmVudC5jaGlsZEVkZ2VzLmxlbmd0aCl7XG4gICAgICAgICAgICB5ID0gcGFyZW50LmNoaWxkRWRnZXNbcGFyZW50LmNoaWxkRWRnZXMubGVuZ3RoLTFdLmNoaWxkTm9kZS5sb2NhdGlvbi55KzE7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IG1vZGVsLlBvaW50KHgsIHkpXG4gICAgfVxuXG4gICAgZ2V0SW5qZWN0ZWROb2RlTG9jYXRpb24oZWRnZSl7XG5cbiAgICAgICAgdmFyIHAgPSBlZGdlLiRsaW5lUG9pbnRzWzJdO1xuXG4gICAgICAgIHJldHVybiBuZXcgbW9kZWwuUG9pbnQocFswXSwgcFsxXSlcbiAgICB9XG5cbiAgICBtb3ZlTm9kZVRvRW1wdHlQbGFjZShub2RlLCByZWRyYXdJZkNoYW5nZWQ9dHJ1ZSl7XG4gICAgICAgIHZhciBwb3NpdGlvbk1hcCA9IHt9O1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIG5vZGUubG9jYXRpb24ueCA9IE1hdGgubWF4KHRoaXMuZ2V0Tm9kZU1pblgobm9kZSksIG5vZGUubG9jYXRpb24ueCk7XG4gICAgICAgIG5vZGUubG9jYXRpb24ueSA9IE1hdGgubWF4KHRoaXMuZ2V0Tm9kZU1pblkobm9kZSksIG5vZGUubG9jYXRpb24ueSk7XG5cblxuICAgICAgICB0aGlzLm5vZGVzU29ydGVkQnlYID0gdGhpcy5kYXRhLm5vZGVzLnNsaWNlKCk7XG4gICAgICAgIHRoaXMubm9kZXNTb3J0ZWRCeVguc29ydCgoYSxiKT0+YS5sb2NhdGlvbi54IC0gYi5sb2NhdGlvbi54KTtcblxuICAgICAgICBmdW5jdGlvbiBmaW5kQ29sbGlkaW5nTm9kZShub2RlLCBsb2NhdGlvbil7XG4gICAgICAgICAgICByZXR1cm4gVXRpbHMuZmluZChzZWxmLm5vZGVzU29ydGVkQnlYLCBuPT57XG4gICAgICAgICAgICAgICAgaWYobm9kZSA9PSBuKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBtYXJnaW4gPSBzZWxmLmNvbmZpZy5ub2RlU2l6ZS8zO1xuICAgICAgICAgICAgICAgIHZhciB4ID0gbi5sb2NhdGlvbi54O1xuICAgICAgICAgICAgICAgIHZhciB5ID0gbi5sb2NhdGlvbi55O1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIChsb2NhdGlvbi54IC0gbWFyZ2luIDw9IHggJiYgbG9jYXRpb24ueCArIG1hcmdpbiA+PSB4XG4gICAgICAgICAgICAgICAgICAgICYmIGxvY2F0aW9uLnkgLSBtYXJnaW4gPD0geSAmJiBsb2NhdGlvbi55ICsgbWFyZ2luID49IHkpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzdGVwWCA9IHRoaXMuY29uZmlnLm5vZGVTaXplLzI7XG4gICAgICAgIHZhciBzdGVwWSA9IHRoaXMuY29uZmlnLm5vZGVTaXplKzEwO1xuICAgICAgICB2YXIgc3RlcFhzYW1lUGFyZW50ID0gMDtcbiAgICAgICAgdmFyIHN0ZXBZc2FtZVBhcmVudCA9IDc1O1xuICAgICAgICB2YXIgY2hhbmdlZCA9IGZhbHNlO1xuICAgICAgICB2YXIgY29saWRpbmdOb2RlO1xuICAgICAgICB2YXIgbmV3TG9jYXRpb24gPSBuZXcgbW9kZWwuUG9pbnQobm9kZS5sb2NhdGlvbik7XG4gICAgICAgIHdoaWxlKGNvbGlkaW5nTm9kZSA9IGZpbmRDb2xsaWRpbmdOb2RlKG5vZGUsIG5ld0xvY2F0aW9uKSl7XG4gICAgICAgICAgICBjaGFuZ2VkPXRydWU7XG4gICAgICAgICAgICB2YXIgc2FtZVBhcmVudCA9IG5vZGUuJHBhcmVudCAmJiBjb2xpZGluZ05vZGUuJHBhcmVudCAmJiBub2RlLiRwYXJlbnQ9PT1jb2xpZGluZ05vZGUuJHBhcmVudDtcbiAgICAgICAgICAgIGlmKHNhbWVQYXJlbnQpe1xuICAgICAgICAgICAgICAgIG5ld0xvY2F0aW9uLm1vdmUoc3RlcFhzYW1lUGFyZW50LCBzdGVwWXNhbWVQYXJlbnQpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgbmV3TG9jYXRpb24ubW92ZShzdGVwWCwgc3RlcFkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmKGNoYW5nZWQpe1xuICAgICAgICAgICAgbm9kZS5tb3ZlVG8obmV3TG9jYXRpb24ueCxuZXdMb2NhdGlvbi55LCB0cnVlKTtcbiAgICAgICAgICAgIGlmKHJlZHJhd0lmQ2hhbmdlZCl7XG4gICAgICAgICAgICAgICAgdGhpcy50cmVlRGVzaWduZXIucmVkcmF3KHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGlzYWJsZUF1dG9MYXlvdXQoKXtcbiAgICAgICAgdGhpcy5jb25maWcudHlwZSA9IExheW91dC5NQU5VQUxfTEFZT1VUX05BTUU7XG4gICAgICAgIHRoaXMuX2ZpcmVPbkF1dG9MYXlvdXRDaGFuZ2VkQ2FsbGJhY2tzKCk7XG4gICAgfVxuXG5cbiAgICBub2RlU3ltYm9sU2l6ZSA9IHt9O1xuICAgIGRyYXdOb2RlU3ltYm9sKHBhdGgsIHRyYW5zaXRpb24pe1xuXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIG5vZGVTaXplID0gdGhpcy5jb25maWcubm9kZVNpemU7XG4gICAgICAgIHRoaXMubm9kZVN5bWJvbCA9IGQzLnN5bWJvbCgpLnR5cGUoZD0+IHNlbGYubm9kZVR5cGVUb1N5bWJvbFtkLnR5cGVdKVxuICAgICAgICAgICAgLnNpemUoZD0+c2VsZi5ub2RlU3ltYm9sU2l6ZVtkLiRpZF0gPyBVdGlscy5nZXQoc2VsZi50YXJnZXRTeW1ib2xTaXplLCBkLnR5cGUrXCJbJ1wiK3NlbGYuY29uZmlnLm5vZGVTaXplK1wiJ11cIiwgNjQpIDogNjQpO1xuXG4gICAgICAgIHBhdGhcbiAgICAgICAgICAgIC5lYWNoKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgdmFyIHBhdGggPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgICAgICAgICAgdmFyIHByZXYgPSBwYXRoLmF0dHIoXCJkXCIpO1xuICAgICAgICAgICAgICAgIGlmKCFwcmV2KXtcbiAgICAgICAgICAgICAgICAgICAgcGF0aC5hdHRyKFwiZFwiLCBzZWxmLm5vZGVTeW1ib2wpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgc2l6ZSA9IFV0aWxzLmdldChzZWxmLnRhcmdldFN5bWJvbFNpemUsIGQudHlwZStcIlsnXCIrc2VsZi5jb25maWcubm9kZVNpemUrXCInXVwiKTtcbiAgICAgICAgICAgICAgICBpZighc2l6ZSl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBib3ggPSBwYXRoLm5vZGUoKS5nZXRCQm94KCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IE1hdGgubWluKG5vZGVTaXplIC8gYm94LndpZHRoLCBub2RlU2l6ZSAvIGJveC5oZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICBzaXplID0gZXJyb3IgKiBlcnJvciAqIChzZWxmLm5vZGVTeW1ib2xTaXplW2QuJGlkXXx8NjQpO1xuICAgICAgICAgICAgICAgICAgICBVdGlscy5zZXQoc2VsZi50YXJnZXRTeW1ib2xTaXplLCBkLnR5cGUrXCJbJ1wiK3NlbGYuY29uZmlnLm5vZGVTaXplK1wiJ11cIiwgc2l6ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKHRyYW5zaXRpb24pe1xuICAgICAgICAgICAgICAgICAgICBwYXRoID0gIHBhdGgudHJhbnNpdGlvbigpO1xuXG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubm9kZVN5bWJvbFNpemVbZC4kaWRdID0gc2l6ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcGF0aC5hdHRyKFwiZFwiLCBzZWxmLm5vZGVTeW1ib2wpO1xuICAgICAgICAgICAgICAgIGlmKHRyYW5zaXRpb24pe1xuICAgICAgICAgICAgICAgICAgICBzZWxmLm5vZGVTeW1ib2xTaXplW2QuJGlkXSA9IHNpemU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbm9kZUxhYmVsUG9zaXRpb24oc2VsZWN0aW9uKSB7XG4gICAgICAgIHJldHVybiBzZWxlY3Rpb25cbiAgICAgICAgICAgIC5hdHRyKCd4JywgMClcbiAgICAgICAgICAgIC5hdHRyKCd5JywgLXRoaXMuY29uZmlnLm5vZGVTaXplIC8gMiAtIDcpXG4gICAgfVxuXG4gICAgbm9kZVBheW9mZlBvc2l0aW9uKHNlbGVjdGlvbikge1xuICAgICAgICByZXR1cm4gTGF5b3V0LnNldEhhbmdpbmdQb3NpdGlvbihzZWxlY3Rpb24pXG4gICAgICAgICAgICAuYXR0cigneCcsIDApXG4gICAgICAgICAgICAuYXR0cigneScsIHRoaXMuY29uZmlnLm5vZGVTaXplIC8gMiArIDcpXG4gICAgICAgICAgICAuYXR0cigndGV4dC1hbmNob3InLCAnbWlkZGxlJylcbiAgICB9XG5cbiAgICBub2RlQWdncmVnYXRlZFBheW9mZlBvc2l0aW9uKHNlbGVjdGlvbikge1xuICAgICAgICB2YXIgeCA9IHRoaXMuY29uZmlnLm5vZGVTaXplIC8gMiArIDc7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgc2VsZWN0aW9uXG4gICAgICAgICAgICAuYXR0cigneCcsIHgpXG4gICAgICAgICAgICAuYXR0cigneScsIGZ1bmN0aW9uKGQpe1xuICAgICAgICAgICAgICAgIGxldCBmb250U2l6ZSA9IHBhcnNlSW50KEFwcFV0aWxzLmdldEZvbnRTaXplKHRoaXMpKTtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbXMgPSBkLmRpc3BsYXlWYWx1ZSgnYWdncmVnYXRlZFBheW9mZicpO1xuICAgICAgICAgICAgICAgIGxldCBudW1iZXIgPSBVdGlscy5pc0FycmF5KGl0ZW1zKSA/IGl0ZW1zLmZpbHRlcihpdD0+aXQgIT09IHVuZGVmaW5lZCkubGVuZ3RoIDogMTtcbiAgICAgICAgICAgICAgICBpZihudW1iZXI+MSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAtdGhpcy5nZXRCQm94KCkuaGVpZ2h0LzIgKyBmb250U2l6ZS8yO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gLU1hdGgubWF4KDIsIDEuOCogc2VsZi5jb25maWcubm9kZVNpemUvZm9udFNpemUpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgc2VsZWN0aW9uLnNlbGVjdEFsbCgndHNwYW4nKS5hdHRyKCd4JywgeCk7XG4gICAgICAgIHJldHVybiBzZWxlY3Rpb247XG4gICAgICAgICAgICAvLyAuYXR0cigndGV4dC1hbmNob3InLCAnbWlkZGxlJylcbiAgICAgICAgICAgIC8vIC5hdHRyKCdkb21pbmFudC1iYXNlbGluZScsICdoYW5naW5nJylcbiAgICB9XG5cbiAgICBub2RlUHJvYmFiaWxpdHlUb0VudGVyUG9zaXRpb24oc2VsZWN0aW9uKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICByZXR1cm4gTGF5b3V0LnNldEhhbmdpbmdQb3NpdGlvbihzZWxlY3Rpb24pXG4gICAgICAgICAgICAuYXR0cigneCcsIHRoaXMuY29uZmlnLm5vZGVTaXplIC8gMiArIDcpXG4gICAgICAgICAgICAuYXR0cigneScsIGZ1bmN0aW9uKGQpe1xuICAgICAgICAgICAgICAgIGxldCBmb250U2l6ZSA9IHBhcnNlSW50KEFwcFV0aWxzLmdldEZvbnRTaXplKHRoaXMpKTtcbiAgICAgICAgICAgICAgICBsZXQgYWdncmVnYXRlZFBheW9mZnMgPSBkLmRpc3BsYXlWYWx1ZSgnYWdncmVnYXRlZFBheW9mZicpO1xuICAgICAgICAgICAgICAgIGxldCBhZ2dyZWdhdGVkUGF5b2Zmc051bWJlciA9IFV0aWxzLmlzQXJyYXkoYWdncmVnYXRlZFBheW9mZnMpID8gYWdncmVnYXRlZFBheW9mZnMuZmlsdGVyKGl0PT5pdCAhPT0gdW5kZWZpbmVkKS5sZW5ndGggOiAxO1xuICAgICAgICAgICAgICAgIGlmKGFnZ3JlZ2F0ZWRQYXlvZmZzTnVtYmVyPjEpe1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmb250U2l6ZSowLjZcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5tYXgoMiwgMS44KiBzZWxmLmNvbmZpZy5ub2RlU2l6ZS9mb250U2l6ZSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLy8gLmF0dHIoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXG4gICAgICAgICAgICAvLyAuYXR0cignZG9taW5hbnQtYmFzZWxpbmUnLCAnY2VudHJhbCcpXG4gICAgfVxuXG4gICAgbm9kZUluZGljYXRvclBvc2l0aW9uKHNlbGVjdGlvbikge1xuICAgICAgICByZXR1cm4gc2VsZWN0aW9uXG4gICAgICAgICAgICAuYXR0cigneCcsIHRoaXMuY29uZmlnLm5vZGVTaXplIC8gMiArIDgpXG4gICAgICAgICAgICAuYXR0cigneScsIC0gdGhpcy5jb25maWcubm9kZVNpemUvMilcbiAgICAgICAgICAgIC5hdHRyKCdkb21pbmFudC1iYXNlbGluZScsICdjZW50cmFsJylcbiAgICAgICAgICAgIC5hdHRyKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKVxuICAgIH1cblxuICAgIG5vZGVVbmZvbGRCdXR0b25Qb3NpdGlvbihzZWxlY3Rpb24pIHtcblxuICAgICAgICByZXR1cm4gc2VsZWN0aW9uXG4gICAgICAgICAgICAuYXR0cigneCcsIHRoaXMuY29uZmlnLm5vZGVTaXplIC8gMiArIDUpXG4gICAgICAgICAgICAuYXR0cigneScsIDApXG4gICAgICAgICAgICAuYXR0cignZG9taW5hbnQtYmFzZWxpbmUnLCAnY2VudHJhbCcpXG4gICAgfVxuXG4gICAgZWRnZUxpbmVEKGVkZ2Upe1xuICAgICAgICB2YXIgbGluZSA9IGQzLmxpbmUoKVxuICAgICAgICAgICAgLngoZD0+IGRbMF0pXG4gICAgICAgICAgICAueShkPT4gZFsxXSk7XG4gICAgICAgIC8vIC5jdXJ2ZShkMy5jdXJ2ZUNhdG11bGxSb20uYWxwaGEoMC41KSk7XG5cblxuICAgICAgICB2YXIgcGFyZW50Tm9kZSA9IGVkZ2UucGFyZW50Tm9kZTtcbiAgICAgICAgdmFyIGNoaWxkTm9kZSA9IGVkZ2UuY2hpbGROb2RlO1xuXG4gICAgICAgIHZhciBkWCA9IGNoaWxkTm9kZS5sb2NhdGlvbi54IC0gcGFyZW50Tm9kZS5sb2NhdGlvbi54O1xuICAgICAgICB2YXIgZFkgPSBjaGlsZE5vZGUubG9jYXRpb24ueSAtIHBhcmVudE5vZGUubG9jYXRpb24ueTtcblxuICAgICAgICB2YXIgc2lnbiA9IGRYPj0wID8gMSA6IC0xO1xuXG4gICAgICAgIHZhciBzbGFudFN0YXJ0WE9mZnNldCA9IE1hdGgubWluKGRYLzIsIHRoaXMuY29uZmlnLm5vZGVTaXplLzIrMTApO1xuICAgICAgICB2YXIgc2xhbnRXaWR0aCA9IE1hdGgubWluKHRoaXMuY29uZmlnLmVkZ2VTbGFudFdpZHRoTWF4LCBNYXRoLm1heChkWC8yIC0gc2xhbnRTdGFydFhPZmZzZXQsIDApKTtcblxuICAgICAgICB2YXIgcG9pbnQxID0gW3BhcmVudE5vZGUubG9jYXRpb24ueCArdGhpcy5jb25maWcubm9kZVNpemUvMiArIDEsIHBhcmVudE5vZGUubG9jYXRpb24ueV07XG4gICAgICAgIHZhciBwb2ludDIgPSBbTWF0aC5tYXgocGFyZW50Tm9kZS5sb2NhdGlvbi54K3NsYW50U3RhcnRYT2Zmc2V0LCBwb2ludDFbMF0pLCBwYXJlbnROb2RlLmxvY2F0aW9uLnldO1xuICAgICAgICB2YXIgcG9pbnQzID0gW3BhcmVudE5vZGUubG9jYXRpb24ueCtzbGFudFN0YXJ0WE9mZnNldCtzbGFudFdpZHRoLCBjaGlsZE5vZGUubG9jYXRpb24ueV07XG4gICAgICAgIHZhciBwb2ludDQgPSBbY2hpbGROb2RlLmxvY2F0aW9uLnggLSAoc2lnbiooTWF0aC5tYXgoMCwgTWF0aC5taW4odGhpcy5jb25maWcubm9kZVNpemUvMis4LCBkWC8yKSkpKSwgY2hpbGROb2RlLmxvY2F0aW9uLnldO1xuICAgICAgICAvLyB2YXIgcG9pbnQyID0gW3BhcmVudE5vZGUubG9jYXRpb24ueCtkWC8yLXNsYW50V2lkdGgvMiwgcGFyZW50Tm9kZS5sb2NhdGlvbi55XTtcbiAgICAgICAgLy8gdmFyIHBvaW50MyA9IFtjaGlsZE5vZGUubG9jYXRpb24ueC0oZFgvMi1zbGFudFdpZHRoLzIpLCBjaGlsZE5vZGUubG9jYXRpb24ueV07XG5cbiAgICAgICAgZWRnZS4kbGluZVBvaW50cyA9IFtwb2ludDEsIHBvaW50MiwgcG9pbnQzLCBwb2ludDRdO1xuICAgICAgICByZXR1cm4gbGluZShlZGdlLiRsaW5lUG9pbnRzKTtcbiAgICB9XG5cbiAgICBlZGdlUGF5b2ZmUG9zaXRpb24oc2VsZWN0aW9uKSB7XG4gICAgICAgIExheW91dC5zZXRIYW5naW5nUG9zaXRpb24oc2VsZWN0aW9uKVxuICAgICAgICAgICAgLmF0dHIoJ3gnLCBkPT5kLiRsaW5lUG9pbnRzWzJdWzBdICsgMilcbiAgICAgICAgICAgIC5hdHRyKCd5JywgZD0+ZC4kbGluZVBvaW50c1syXVsxXSArIDcpO1xuXG4gICAgICAgIHNlbGVjdGlvbi5zZWxlY3RBbGwoJ3RzcGFuJykuYXR0cigneCcsIGZ1bmN0aW9uKGQpe1xuICAgICAgICAgICAgcmV0dXJuIGQzLnNlbGVjdCh0aGlzLnBhcmVudE5vZGUpLmRhdHVtKCkuJGxpbmVQb2ludHNbMl1bMF0gKyAyXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc2VsZWN0aW9uO1xuXG4gICAgfVxuXG4gICAgZWRnZUxhYmVsUG9zaXRpb24oc2VsZWN0aW9uKSB7XG4gICAgICAgIHJldHVybiBzZWxlY3Rpb25cbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBkPT4ndHJhbnNsYXRlKCcrKGQuJGxpbmVQb2ludHNbMl1bMF0gKyAyKSsnLCcrKGQuJGxpbmVQb2ludHNbMl1bMV0gLSA3KSsnKScpXG4gICAgICAgICAgICAvLyAuYXR0cigneCcsIGQ9PmQuJGxpbmVQb2ludHNbMl1bMF0gKyAyKVxuICAgICAgICAgICAgLy8gLmF0dHIoJ3knLCBkPT5kLiRsaW5lUG9pbnRzWzJdWzFdIC0gNylcblxuICAgIH1cblxuICAgIGVkZ2VQcm9iYWJpbGl0eVBvc2l0aW9uKHNlbGVjdGlvbikge1xuICAgICAgICByZXR1cm4gTGF5b3V0LnNldEhhbmdpbmdQb3NpdGlvbihzZWxlY3Rpb24pXG4gICAgICAgICAgICAuYXR0cigneCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxlbiA9IHRoaXMuZ2V0Q29tcHV0ZWRUZXh0TGVuZ3RoKCk7XG4gICAgICAgICAgICAgICAgdmFyIG1pbiA9IGQuJGxpbmVQb2ludHNbMl1bMF0gKyAyICsgdGhpcy5wcmV2aW91c1NpYmxpbmcuY2hpbGROb2Rlc1swXS5nZXRDb21wdXRlZFRleHRMZW5ndGgoKSArIDcgKyBsZW47XG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGgubWF4KG1pbiwgZC4kbGluZVBvaW50c1szXVswXSAtIDgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hdHRyKCd5JywgZD0+ZC4kbGluZVBvaW50c1syXVsxXSArIDcpXG4gICAgfVxuXG4gICAgZ2V0TWluTWFyZ2luQmV0d2Vlbk5vZGVzKCl7XG4gICAgICByZXR1cm4gdGhpcy5jb25maWcubm9kZVNpemUgKyAzMDtcbiAgICB9XG5cblxuICAgIGdldE5vZGVNaW5YKGQpe1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIGlmKGQgJiYgZC4kcGFyZW50KXsvLyAmJiAhc2VsZi5pc05vZGVTZWxlY3RlZChkLiRwYXJlbnQpXG4gICAgICAgICAgICByZXR1cm4gZC4kcGFyZW50LmxvY2F0aW9uLnggKyBzZWxmLmdldE1pbk1hcmdpbkJldHdlZW5Ob2RlcygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzZWxmLmNvbmZpZy5ub2RlU2l6ZS8yO1xuICAgIH1cblxuICAgIGdldE5vZGVNaW5ZKGQpe1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcubm9kZVNpemUvMjtcbiAgICB9XG5cbiAgICBnZXROb2RlTWF4WChkKXtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIGlmKGQgJiYgZC5jaGlsZEVkZ2VzLmxlbmd0aCl7XG4gICAgICAgICAgICByZXR1cm4gZDMubWluKGQuY2hpbGRFZGdlcywgZT0+IWUuY2hpbGROb2RlLiRoaWRkZW4gPyBlLmNoaWxkTm9kZS5sb2NhdGlvbi54IDogOTk5OTk5OSktc2VsZi5nZXRNaW5NYXJnaW5CZXR3ZWVuTm9kZXMoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gOTk5OTk5OTtcbiAgICB9XG5cbiAgICBzZXRHcmlkV2lkdGgod2lkdGgsIHdpdGhvdXRTdGF0ZVNhdmluZyl7XG4gICAgICAgIHZhciBzZWxmPXRoaXM7XG4gICAgICAgIGlmKHRoaXMuY29uZmlnLmdyaWRXaWR0aD09PXdpZHRoKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZighd2l0aG91dFN0YXRlU2F2aW5nKXtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoe1xuICAgICAgICAgICAgICAgIGRhdGE6e1xuICAgICAgICAgICAgICAgICAgICBncmlkV2lkdGg6IHNlbGYuY29uZmlnLmdyaWRXaWR0aFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25VbmRvOiAoZGF0YSk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0R3JpZFdpZHRoKGRhdGEuZ3JpZFdpZHRoLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uUmVkbzogKGRhdGEpPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldEdyaWRXaWR0aCh3aWR0aCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbmZpZy5ncmlkV2lkdGg9d2lkdGg7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuXG4gICAgc2V0R3JpZEhlaWdodChncmlkSGVpZ2h0LCB3aXRob3V0U3RhdGVTYXZpbmcpe1xuICAgICAgICB2YXIgc2VsZj10aGlzO1xuICAgICAgICBpZih0aGlzLmNvbmZpZy5ncmlkSGVpZ2h0PT09Z3JpZEhlaWdodCl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYoIXdpdGhvdXRTdGF0ZVNhdmluZyl7XG4gICAgICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKHtcbiAgICAgICAgICAgICAgICBkYXRhOntcbiAgICAgICAgICAgICAgICAgICAgZ3JpZEhlaWdodDogc2VsZi5jb25maWcuZ3JpZEhlaWdodFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25VbmRvOiAoZGF0YSk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0R3JpZEhlaWdodChkYXRhLmdyaWRIZWlnaHQsIHRydWUpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25SZWRvOiAoZGF0YSk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0R3JpZEhlaWdodChncmlkSGVpZ2h0LCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29uZmlnLmdyaWRIZWlnaHQ9Z3JpZEhlaWdodDtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG5cbiAgICBzZXROb2RlU2l6ZShub2RlU2l6ZSwgd2l0aG91dFN0YXRlU2F2aW5nKXtcbiAgICAgICAgdmFyIHNlbGY9dGhpcztcbiAgICAgICAgaWYodGhpcy5jb25maWcubm9kZVNpemU9PT1ub2RlU2l6ZSl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYoIXdpdGhvdXRTdGF0ZVNhdmluZyl7XG4gICAgICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKHtcbiAgICAgICAgICAgICAgICBkYXRhOntcbiAgICAgICAgICAgICAgICAgICAgbm9kZVNpemU6IHNlbGYuY29uZmlnLm5vZGVTaXplXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvblVuZG86IChkYXRhKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXROb2RlU2l6ZShkYXRhLm5vZGVTaXplLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uUmVkbzogKGRhdGEpPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldE5vZGVTaXplKG5vZGVTaXplLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29uZmlnLm5vZGVTaXplPW5vZGVTaXplO1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICBpZih0aGlzLmlzTWFudWFsTGF5b3V0KCkpe1xuICAgICAgICAgICAgdGhpcy5maXROb2Rlc0luUGxvdHRpbmdSZWdpb24oc2VsZi5kYXRhLmdldFJvb3RzKCkpO1xuICAgICAgICAgICAgdGhpcy50cmVlRGVzaWduZXIucmVkcmF3KHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0RWRnZVNsYW50V2lkdGhNYXgod2lkdGgsIHdpdGhvdXRTdGF0ZVNhdmluZyl7XG4gICAgICAgIHZhciBzZWxmPXRoaXM7XG4gICAgICAgIGlmKHRoaXMuY29uZmlnLmVkZ2VTbGFudFdpZHRoTWF4PT09d2lkdGgpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmKCF3aXRob3V0U3RhdGVTYXZpbmcpe1xuICAgICAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSh7XG4gICAgICAgICAgICAgICAgZGF0YTp7XG4gICAgICAgICAgICAgICAgICAgIGVkZ2VTbGFudFdpZHRoTWF4OiBzZWxmLmNvbmZpZy5lZGdlU2xhbnRXaWR0aE1heFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25VbmRvOiAoZGF0YSk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0RWRnZVNsYW50V2lkdGhNYXgoZGF0YS5lZGdlU2xhbnRXaWR0aE1heCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvblJlZG86IChkYXRhKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRFZGdlU2xhbnRXaWR0aE1heCh3aWR0aCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbmZpZy5lZGdlU2xhbnRXaWR0aE1heD13aWR0aDtcbiAgICAgICAgdGhpcy50cmVlRGVzaWduZXIucmVkcmF3KHRydWUpO1xuICAgIH1cblxuICAgIGF1dG9MYXlvdXQodHlwZSwgd2l0aG91dFN0YXRlU2F2aW5nKXtcbiAgICAgICAgdmFyIHNlbGY9dGhpcztcblxuXG5cbiAgICAgICAgaWYoIXdpdGhvdXRTdGF0ZVNhdmluZyl7XG4gICAgICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKHtcbiAgICAgICAgICAgICAgICBkYXRhOntcbiAgICAgICAgICAgICAgICAgICAgbmV3TGF5b3V0OiB0eXBlLFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50TGF5b3V0OiBzZWxmLmNvbmZpZy50eXBlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvblVuZG86IChkYXRhKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jb25maWcudHlwZSA9IGRhdGEuY3VycmVudExheW91dDtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5fZmlyZU9uQXV0b0xheW91dENoYW5nZWRDYWxsYmFja3MoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uUmVkbzogKGRhdGEpPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmF1dG9MYXlvdXQoZGF0YS5uZXdMYXlvdXQsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29uZmlnLnR5cGUgPSB0eXBlO1xuICAgICAgICBpZighdGhpcy5kYXRhLm5vZGVzLmxlbmd0aCl7XG4gICAgICAgICAgICB0aGlzLl9maXJlT25BdXRvTGF5b3V0Q2hhbmdlZENhbGxiYWNrcygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHByZXZUcmVlTWF4WSA9IHNlbGYuZ2V0Tm9kZU1pblkoKTtcbiAgICAgICAgdGhpcy5kYXRhLmdldFJvb3RzKCkuZm9yRWFjaChyPT57XG4gICAgICAgICAgICB2YXIgcm9vdCA9IGQzLmhpZXJhcmNoeShyLCBkPT57XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuY2hpbGRFZGdlcy5maWx0ZXIoZT0+IWUuJGhpZGRlbikubWFwKGU9PmUuY2hpbGROb2RlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyByb290LnNvcnQoKGEsYik9PnNlbGYubm9kZVR5cGVPcmRlclthLmRhdGEudHlwZV0tc2VsZi5ub2RlVHlwZU9yZGVyW2IuZGF0YS50eXBlXSk7XG4gICAgICAgICAgICByb290LnNvcnQoKGEsYik9PmEuZGF0YS5sb2NhdGlvbi55IC0gYi5kYXRhLmxvY2F0aW9uLnkpO1xuXG5cbiAgICAgICAgICAgIHZhciBsYXlvdXQ7XG4gICAgICAgICAgICBpZih0eXBlPT09J2NsdXN0ZXInKXtcbiAgICAgICAgICAgICAgICBsYXlvdXQgPSBkMy5jbHVzdGVyKCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBsYXlvdXQgPSBkMy50cmVlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsYXlvdXQubm9kZVNpemUoW3NlbGYuY29uZmlnLmdyaWRIZWlnaHQsIHNlbGYuY29uZmlnLmdyaWRXaWR0aF0pO1xuICAgICAgICAgICAgbGF5b3V0LnNlcGFyYXRpb24oc2VsZi5ub2RlU2VwYXJhdGlvbik7XG5cbiAgICAgICAgICAgIGxheW91dChyb290KTtcbiAgICAgICAgICAgIHZhciBtaW5ZID0gOTk5OTk5OTk5O1xuICAgICAgICAgICAgcm9vdC5lYWNoKGQ9PntcbiAgICAgICAgICAgICAgICBtaW5ZID0gTWF0aC5taW4obWluWSwgZC54KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB2YXIgZHkgPSByb290LnggLSBtaW5ZICsgcHJldlRyZWVNYXhZO1xuICAgICAgICAgICAgdmFyIGR4ID0gc2VsZi5nZXROb2RlTWluWCgpO1xuICAgICAgICAgICAgdmFyIG1heFk9MDtcbiAgICAgICAgICAgIHJvb3QuZWFjaChkPT57XG4gICAgICAgICAgICAgICAgZC5kYXRhLmxvY2F0aW9uLnggPSBkLnkgKyBkeDtcbiAgICAgICAgICAgICAgICBkLmRhdGEubG9jYXRpb24ueSA9IGQueCArIGR5O1xuXG4gICAgICAgICAgICAgICAgbWF4WSA9IE1hdGgubWF4KG1heFksIGQuZGF0YS5sb2NhdGlvbi55KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBwcmV2VHJlZU1heFkgPSBtYXhZICsgc2VsZi5jb25maWcubm9kZVNpemUrc2VsZi50cmVlTWFyZ2luO1xuICAgICAgICB9KTtcblxuXG4gICAgICAgIC8vIHRoaXMudHJhbnNpdGlvbiA9IHRydWU7XG4gICAgICAgIHRoaXMudHJlZURlc2lnbmVyLnJlZHJhdyh0cnVlKTtcbiAgICAgICAgLy8gdGhpcy50cmFuc2l0aW9uID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5fZmlyZU9uQXV0b0xheW91dENoYW5nZWRDYWxsYmFja3MoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZml0Tm9kZXNJblBsb3R0aW5nUmVnaW9uKG5vZGVzKXtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgdG9wWSA9IGQzLm1pbihub2Rlcywgbj0+bi5sb2NhdGlvbi55KTtcbiAgICAgICAgdmFyIG1pblkgPSBzZWxmLmdldE5vZGVNaW5ZKCk7XG4gICAgICAgIHZhciBkeSA9IHRvcFkgLSBtaW5ZO1xuXG4gICAgICAgIHZhciBtaW5YID0gZDMubWluKG5vZGVzLCBuPT5uLmxvY2F0aW9uLngpO1xuICAgICAgICB2YXIgZHggPSBtaW5YIC0gc2VsZi5nZXROb2RlTWluWCgpO1xuXG4gICAgICAgIGlmKGR5PDAgfHwgIGR4PDApe1xuICAgICAgICAgICAgbm9kZXMuZm9yRWFjaChuPT5uLm1vdmUoLWR4LCAtZHkpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1vdmVOb2Rlcyhub2RlcywgZHgsIGR5LCBwaXZvdCl7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIGxpbWl0ID0gc2VsZi5jb25maWcubGltaXROb2RlUG9zaXRpb25pbmc7XG4gICAgICAgIGlmKGxpbWl0KXtcbiAgICAgICAgICAgIGlmKGR4PDApe1xuICAgICAgICAgICAgICAgIG5vZGVzLnNvcnQoKGEsYik9PmEubG9jYXRpb24ueC1iLmxvY2F0aW9uLngpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgbm9kZXMuc29ydCgoYSxiKT0+Yi5sb2NhdGlvbi54LWEubG9jYXRpb24ueCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIHZhciBtaW5ZID0gZDMubWluKG5vZGVzLCBkPT5kLmxvY2F0aW9uLnkpO1xuICAgICAgICBpZihtaW5ZICsgZHkgPCBzZWxmLmdldE5vZGVNaW5ZKCkpe1xuICAgICAgICAgICAgZHkgPSBzZWxmLmdldE5vZGVNaW5ZKCkgLSBtaW5ZO1xuICAgICAgICB9XG5cbiAgICAgICAgbm9kZXMuZm9yRWFjaChkPT57XG4gICAgICAgICAgICBpZihsaW1pdCl7XG4gICAgICAgICAgICAgICAgTGF5b3V0LmJhY2t1cE5vZGVMb2NhdGlvbihkKTtcbiAgICAgICAgICAgICAgICB2YXIgbWluWCA9IHNlbGYuZ2V0Tm9kZU1pblgoZCk7XG4gICAgICAgICAgICAgICAgdmFyIG1heFggPSBzZWxmLmdldE5vZGVNYXhYKGQpO1xuXG4gICAgICAgICAgICAgICAgZC5sb2NhdGlvbi54ID0gTWF0aC5taW4oTWF0aC5tYXgoZC5sb2NhdGlvbi54K2R4LCBtaW5YKSwgbWF4WCk7XG4gICAgICAgICAgICAgICAgZC5sb2NhdGlvbi55ICs9IGR5O1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgZC5sb2NhdGlvbi54ICs9ZHg7XG4gICAgICAgICAgICAgICAgZC5sb2NhdGlvbi55ICs9IGR5O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgdmFyIHJldmVydFggPSBwaXZvdCAmJiBzZWxmLmNvbmZpZy5saW1pdE5vZGVQb3NpdGlvbmluZyAmJiAocGl2b3QubG9jYXRpb24ueCA9PT0gcGl2b3QuJGxvY2F0aW9uLngpO1xuXG4gICAgICAgIG5vZGVzLmZvckVhY2goZD0+e1xuICAgICAgICAgICAgaWYocmV2ZXJ0WCl7XG4gICAgICAgICAgICAgICAgZC5sb2NhdGlvbi54ID0gZC4kbG9jYXRpb24ueDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYudHJlZURlc2lnbmVyLnVwZGF0ZU5vZGVQb3NpdGlvbihkKTtcbiAgICAgICAgfSk7XG5cblxuICAgIH1cblxuICAgIHN0YXRpYyBiYWNrdXBOb2RlTG9jYXRpb24obm9kZSkge1xuICAgICAgICBub2RlLiRsb2NhdGlvbiA9IG5ldyBtb2RlbC5Qb2ludChub2RlLmxvY2F0aW9uKTtcbiAgICB9XG5cbiAgICBfZmlyZU9uQXV0b0xheW91dENoYW5nZWRDYWxsYmFja3MoKXtcbiAgICAgICAgdGhpcy5vbkF1dG9MYXlvdXRDaGFuZ2VkLmZvckVhY2goYz0+Yyh0aGlzLmNvbmZpZy50eXBlKSk7XG4gICAgfVxuXG4gICAgc3RhdGljIHNldEhhbmdpbmdQb3NpdGlvbihzZWxlY3Rpb24pe1xuICAgICAgICAvLyB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAvLyAgICAgc2VsZWN0aW9uLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgLy8gICAgICAgICB2YXIgaCA9ICB0aGlzLmdldEJCb3goKS5oZWlnaHQ7XG4gICAgICAgIC8vICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLmF0dHIoJ2R5JywgaCk7XG4gICAgICAgIC8vICAgICB9KTtcbiAgICAgICAgLy8gfSwwKTtcblxuICAgICAgICBpZihBcHBVdGlscy5pc0hpZGRlbihzZWxlY3Rpb24ubm9kZSgpKSl7IC8vIHNldHRpbmcgaGFuZ2luZyBwb3NpdGlvbiBvZiBoaWRkZW4gZWxlbWVudHMgZmFpbHMgb24gZmlyZWZveFxuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdGlvbjtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgc2VsZWN0aW9uLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciBoID0gIHRoaXMuZ2V0QkJveCgpLmhlaWdodDtcbiAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5hdHRyKCdkeScsICcwLjc1ZW0nKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGVjdGlvbjtcbiAgICB9XG5cbn1cblxuXG4iLCJpbXBvcnQge0FwcFV0aWxzfSBmcm9tICcuL2FwcC11dGlscydcbmltcG9ydCAqIGFzIGQzIGZyb20gJy4vZDMnXG5pbXBvcnQge0NvbnRleHRNZW51fSBmcm9tICcuL2NvbnRleHQtbWVudS9jb250ZXh0LW1lbnUnXG5cbmV4cG9ydCBjbGFzcyBOb2RlRHJhZ0hhbmRsZXJ7XG5cbiAgICB0cmVlRGVzaWduZXI7XG4gICAgZGF0YTtcbiAgICBjb25maWc7XG5cbiAgICBkcmFnO1xuXG5cbiAgICBjb25zdHJ1Y3Rvcih0cmVlRGVzaWduZXIsIGRhdGEpe1xuICAgICAgICB0aGlzLnRyZWVEZXNpZ25lciA9IHRyZWVEZXNpZ25lcjtcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcblxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuZHJhZyA9IGQzLmRyYWcoKVxuICAgICAgICAgICAgLnN1YmplY3QoZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICAgIGlmKGQ9PW51bGwpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IGV2ZW50LngsXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiBldmVudC55XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciB0ID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IHQuYXR0cihcInhcIikgKyBBcHBVdGlscy5nZXRUcmFuc2xhdGlvbih0LmF0dHIoXCJ0cmFuc2Zvcm1cIikpWzBdLFxuICAgICAgICAgICAgICAgICAgICB5OiB0LmF0dHIoXCJ5XCIpICsgQXBwVXRpbHMuZ2V0VHJhbnNsYXRpb24odC5hdHRyKFwidHJhbnNmb3JtXCIpKVsxXVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKFwic3RhcnRcIiwgZnVuY3Rpb24oZCl7XG4gICAgICAgICAgICAgICAgc2VsZi5kcmFnU3RhcnRlZC5jYWxsKHRoaXMsZCwgc2VsZilcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oXCJkcmFnXCIsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5vbkRyYWcuY2FsbCh0aGlzLCBkLCBzZWxmKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oXCJlbmRcIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmRyYWdFbmRlZC5jYWxsKHRoaXMsIGQsIHNlbGYpO1xuICAgICAgICAgICAgfSlcbiAgICB9XG5cblxuICAgIGRyYWdTdGFydGVkKGQsc2VsZikge1xuICAgICAgICBpZihzZWxmLmlnbm9yZURyYWcpe1xuICAgICAgICAgICAgc2VsZi5pZ25vcmVEcmFnPWZhbHNlO1xuICAgICAgICAgICAgc2VsZi5pZ25vcmVkRHJhZz10cnVlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHNlbGYuaWdub3JlZERyYWc9ZmFsc2U7XG5cbiAgICAgICAgLy8gc2VsZi50cmVlRGVzaWduZXIubGF5b3V0LmRpc2FibGVBdXRvTGF5b3V0KCk7XG4gICAgICAgIENvbnRleHRNZW51LmhpZGUoKTtcbiAgICAgICAgdmFyIG5vZGUgPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgIGlmKCFub2RlLmNsYXNzZWQoXCJzZWxlY3RlZFwiKSl7XG4gICAgICAgICAgICBzZWxmLnRyZWVEZXNpZ25lci5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2VsZi50cmVlRGVzaWduZXIuc2VsZWN0Tm9kZShkKTtcbiAgICAgICAgbm9kZS5jbGFzc2VkKFwic2VsZWN0ZWQgZHJhZ2dpbmdcIiwgdHJ1ZSk7XG4gICAgICAgIHNlbGYuc2VsZWN0ZWROb2RlcyA9IHNlbGYudHJlZURlc2lnbmVyLmdldFNlbGVjdGVkTm9kZXModHJ1ZSk7XG4gICAgICAgIHNlbGYucHJldkRyYWdFdmVudCA9IGQzLmV2ZW50O1xuICAgICAgICBzZWxmLmRyYWdFdmVudENvdW50ID0gMDtcbiAgICB9XG5cbiAgICBvbkRyYWcoZHJhZ2dlZE5vZGUsIHNlbGYpe1xuICAgICAgICBpZihzZWxmLmlnbm9yZWREcmFnKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHNlbGYuZHJhZ0V2ZW50Q291bnQ9PTIpe1xuICAgICAgICAgICAgc2VsZi5kYXRhLnNhdmVTdGF0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHNlbGYuZHJhZ0V2ZW50Q291bnQrKztcbiAgICAgICAgaWYoc2VsZi5zZWxlY3RlZE5vZGVzLmxlbmd0aD41ICYmIHNlbGYuZHJhZ0V2ZW50Q291bnQlMiE9MSl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZHggPSBkMy5ldmVudC54IC0gc2VsZi5wcmV2RHJhZ0V2ZW50Lng7XG4gICAgICAgIHZhciBkeSA9IGQzLmV2ZW50LnktIHNlbGYucHJldkRyYWdFdmVudC55O1xuICAgICAgICBzZWxmLnRyZWVEZXNpZ25lci5sYXlvdXQubW92ZU5vZGVzKHNlbGYuc2VsZWN0ZWROb2RlcywgZHgsIGR5LCBkcmFnZ2VkTm9kZSk7XG5cblxuICAgICAgICBzZWxmLnByZXZEcmFnRXZlbnQgPSBkMy5ldmVudDtcbiAgICAgICAgc2VsZi50cmVlRGVzaWduZXIucmVkcmF3RWRnZXMoKTtcbiAgICAgICAgc2VsZi50cmVlRGVzaWduZXIudXBkYXRlUGxvdHRpbmdSZWdpb25TaXplKCk7XG4gICAgfVxuXG4gICAgZHJhZ0VuZGVkKGRyYWdnZWROb2RlLCBzZWxmKXtcbiAgICAgICAgdmFyIG5vZGUgPSBkMy5zZWxlY3QodGhpcykuY2xhc3NlZChcImRyYWdnaW5nXCIsIGZhbHNlKTtcbiAgICAgICAgaWYoc2VsZi5pZ25vcmVkRHJhZyl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi50cmVlRGVzaWduZXIubGF5b3V0LnVwZGF0ZShkcmFnZ2VkTm9kZSlcbiAgICB9XG5cbiAgICBjYW5jZWxEcmFnKCl7XG4gICAgICAgIHRoaXMuaWdub3JlRHJhZyA9IHRydWU7XG4gICAgfVxuXG59XG5cblxuIiwidmFyIGVwc2lsb24gPSAxZS0xMjtcbnZhciBwaSA9IE1hdGguUEk7XG52YXIgaGFsZlBpID0gcGkgLyAyO1xudmFyIHRhdSA9IDIgKiBwaTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIC8qZHJhdzogZnVuY3Rpb24oY29udGV4dCwgc2l6ZSkge1xuICAgICAgICB2YXIgciA9IE1hdGguc3FydChzaXplIC8gcGkpO1xuICAgICAgICBjb250ZXh0Lm1vdmVUbyhyLCAwKTtcbiAgICAgICAgY29udGV4dC5hcmMoMCwgMCwgciwgMCwgdGF1KTtcbiAgICB9Ki9cbiAgICBkcmF3OiBmdW5jdGlvbihjb250ZXh0LCBzaXplKSB7XG5cbiAgICAgICAgdmFyIHIgPSBNYXRoLnNxcnQoc2l6ZSAvIHBpKTtcbiAgICAgICAgdmFyIGRpc3QgPTAuNTUyMjg0NzQ5ODMxICogcjtcblxuICAgICAgICBjb250ZXh0Lm1vdmVUbygtciwgMClcbiAgICAgICAgLy8gY29udGV4dC5saW5lVG8oMipyLCAyKnIpXG4gICAgICAgIC8vIGNvbnRleHQuYmV6aWVyQ3VydmVUbygtciwgLWRpc3QsIC1kaXN0LCAtciwgMCwtcik7XG4gICAgICAgIGNvbnRleHQuYmV6aWVyQ3VydmVUbygtciwgLWRpc3QsIC1kaXN0LCAtciwgMCwtcik7XG5cbiAgICAgICAgY29udGV4dC5iZXppZXJDdXJ2ZVRvKGRpc3QsIC1yLCByLCAtZGlzdCwgciwwKTtcblxuICAgICAgICBjb250ZXh0LmJlemllckN1cnZlVG8ociwgZGlzdCwgZGlzdCwgciwgMCwgcik7XG5cbiAgICAgICAgY29udGV4dC5iZXppZXJDdXJ2ZVRvKC1kaXN0LCByLCAtciwgZGlzdCwgLXIsIDApO1xuICAgIH1cbn07XG4iLCJ2YXIgc3FydDMgPSBNYXRoLnNxcnQoMyk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBkcmF3OiBmdW5jdGlvbihjb250ZXh0LCBzaXplKSB7XG4gICAgICAgIHZhciByID0gTWF0aC5zcXJ0KHNpemUgLyBNYXRoLlBJKTtcbiAgICAgICAgY29udGV4dC5tb3ZlVG8oLXIsIDApO1xuICAgICAgICBjb250ZXh0LmxpbmVUbygwLjkqciwgLXIpO1xuICAgICAgICBjb250ZXh0LmxpbmVUbygwLjkqciwgcik7XG4gICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgfVxufTtcbiIsImltcG9ydCB7VXRpbHN9IGZyb20gXCJzZC11dGlsc1wiO1xuaW1wb3J0IHtpMThufSBmcm9tICcuL2kxOG4vaTE4bidcblxuZXhwb3J0IGNsYXNzIFRlbXBsYXRlc3tcblxuICAgIHN0YXRpYyBncm93bCA9IHJlcXVpcmUoJy4vdGVtcGxhdGVzL2dyb3dsX21lc3NhZ2UuaHRtbCcpO1xuXG4gICAgc3RhdGljIGdldCh0ZW1wbGF0ZU5hbWUsIHZhcmlhYmxlcyl7XG4gICAgICAgIHZhciBjb21waWxlZCA9IFV0aWxzLnRlbXBsYXRlKFRlbXBsYXRlc1t0ZW1wbGF0ZU5hbWVdLHsgJ2ltcG9ydHMnOiB7ICdpMThuJzogaTE4biwgJ1RlbXBsYXRlcyc6IFRlbXBsYXRlcywgJ2luY2x1ZGUnOiBmdW5jdGlvbihuLCB2KSB7cmV0dXJuIFRlbXBsYXRlcy5nZXQobiwgdil9IH0gfSk7XG4gICAgICAgIGlmKHZhcmlhYmxlcyl7XG4gICAgICAgICAgICB2YXJpYWJsZXMudmFyaWFibGVzID0gdmFyaWFibGVzO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHZhcmlhYmxlcyA9IHt2YXJpYWJsZXM6e319XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbXBpbGVkKHZhcmlhYmxlcylcblxuICAgIH1cblxuICAgIHN0YXRpYyBzdHlsZVJ1bGUoc2VsZWN0b3IsIHByb3BzKXtcbiAgICAgICAgdmFyIHMgPSBzZWxlY3RvcisgJ3snO1xuICAgICAgICBwcm9wcy5mb3JFYWNoKHA9PiBzKz1UZW1wbGF0ZXMuc3R5bGVQcm9wKHBbMF0sIHBbMV0pKTtcbiAgICAgICAgcys9J30gJztcbiAgICAgICAgcmV0dXJuIHM7XG4gICAgfVxuICAgIHN0YXRpYyBzdHlsZVByb3Aoc3R5bGVOYW1lLCB2YXJpYWJsZU5hbWUpe1xuICAgICAgICByZXR1cm4gIHN0eWxlTmFtZSsnOiA8JT0gJyt2YXJpYWJsZU5hbWUrJyAlPjsgJ1xuICAgIH1cblxuICAgIHN0YXRpYyB0cmVlRGVzaWduZXJTZWxlY3RvciA9ICdzdmcuc2QtdHJlZS1kZXNpZ25lcic7XG4gICAgc3RhdGljIG5vZGVTZWxlY3Rvcih0eXBlLCBjbGF6eil7XG4gICAgICAgIHZhciBzID0gVGVtcGxhdGVzLnRyZWVEZXNpZ25lclNlbGVjdG9yKycgLm5vZGUnO1xuICAgICAgICBpZih0eXBlKXtcbiAgICAgICAgICAgIHMrPScuJyt0eXBlKyctbm9kZSc7XG4gICAgICAgIH1cbiAgICAgICAgaWYoY2xhenope1xuICAgICAgICAgICAgcys9Jy4nK2NsYXp6O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzO1xuICAgIH1cbiAgICBzdGF0aWMgZWRnZVNlbGVjdG9yKGNsYXp6KXtcbiAgICAgICAgdmFyIHMgPSBUZW1wbGF0ZXMudHJlZURlc2lnbmVyU2VsZWN0b3IrJyAuZWRnZSc7XG4gICAgICAgIGlmKGNsYXp6KXtcbiAgICAgICAgICAgIHMrPScuJytjbGF6ejtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcztcbiAgICB9XG5cbiAgICBzdGF0aWMgdHJlZURlc2lnbmVyU3R5bGVzID1cblxuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy50cmVlRGVzaWduZXJTZWxlY3RvcixbXG4gICAgICAgICAgICBbJ2ZvbnQtc2l6ZScsICdmb250U2l6ZSddLFxuICAgICAgICAgICAgWydmb250LWZhbWlseScsICdmb250RmFtaWx5J10sXG4gICAgICAgICAgICBbJ2ZvbnQtd2VpZ2h0JywgJ2ZvbnRXZWlnaHQnXSxcbiAgICAgICAgICAgIFsnZm9udC1zdHlsZScsICdmb250U3R5bGUnXVxuICAgICAgICBdKStcbiAgICAgICAgLy8gICBub2RlXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLm5vZGVTZWxlY3RvcigpKycgcGF0aCcsW1xuICAgICAgICAgICAgWydmaWxsJywgJ25vZGUuZmlsbCddLFxuICAgICAgICAgICAgWydzdHJva2Utd2lkdGgnLCAnbm9kZS5zdHJva2VXaWR0aCddXG4gICAgICAgIF0pK1xuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5ub2RlU2VsZWN0b3IoJ2RlY2lzaW9uJywgJ29wdGltYWwnKSsnIHBhdGgsICcrVGVtcGxhdGVzLm5vZGVTZWxlY3RvcignY2hhbmNlJywgJ29wdGltYWwnKSsnIHBhdGgsJyArVGVtcGxhdGVzLm5vZGVTZWxlY3RvcigndGVybWluYWwnLCAnb3B0aW1hbCcpKycgcGF0aCcsW1xuICAgICAgICAgICAgWydzdHJva2UnLCAnbm9kZS5vcHRpbWFsLnN0cm9rZSddLFxuICAgICAgICAgICAgWydzdHJva2Utd2lkdGgnLCAnbm9kZS5vcHRpbWFsLnN0cm9rZVdpZHRoJ11cbiAgICAgICAgXSkrXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLm5vZGVTZWxlY3RvcigpKycgLmxhYmVsJyxbXG4gICAgICAgICAgICBbJ2ZvbnQtc2l6ZScsICdub2RlLmxhYmVsLmZvbnRTaXplJ10sXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnbm9kZS5sYWJlbC5jb2xvciddXG4gICAgICAgIF0pK1xuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5ub2RlU2VsZWN0b3IoKSsnIC5wYXlvZmYnLFtcbiAgICAgICAgICAgIFsnZm9udC1zaXplJywgJ25vZGUucGF5b2ZmLmZvbnRTaXplJ10sXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnbm9kZS5wYXlvZmYuY29sb3InXSxcbiAgICAgICAgXSkrXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLm5vZGVTZWxlY3RvcigpKycgLnBheW9mZi5uZWdhdGl2ZScsW1xuICAgICAgICAgICAgWydmaWxsJywgJ25vZGUucGF5b2ZmLm5lZ2F0aXZlQ29sb3InXSxcbiAgICAgICAgXSkrXG5cbiAgICAgICAgLy8gICAgZGVjaXNpb24gbm9kZVxuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5ub2RlU2VsZWN0b3IoJ2RlY2lzaW9uJykrJyBwYXRoJyxbXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnbm9kZS5kZWNpc2lvbi5maWxsJ10sXG4gICAgICAgICAgICBbJ3N0cm9rZScsICdub2RlLmRlY2lzaW9uLnN0cm9rZSddXG4gICAgICAgIF0pK1xuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5ub2RlU2VsZWN0b3IoJ2RlY2lzaW9uJywgJ3NlbGVjdGVkJykrJyBwYXRoJyxbXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnbm9kZS5kZWNpc2lvbi5zZWxlY3RlZC5maWxsJ11cbiAgICAgICAgXSkrXG5cbiAgICAgICAgLy8gICAgY2hhbmNlIG5vZGVcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCdjaGFuY2UnKSsnIHBhdGgnLFtcbiAgICAgICAgICAgIFsnZmlsbCcsICdub2RlLmNoYW5jZS5maWxsJ10sXG4gICAgICAgICAgICBbJ3N0cm9rZScsICdub2RlLmNoYW5jZS5zdHJva2UnXVxuICAgICAgICBdKStcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCdjaGFuY2UnLCAnc2VsZWN0ZWQnKSsnIHBhdGgnLFtcbiAgICAgICAgICAgIFsnZmlsbCcsICdub2RlLmNoYW5jZS5zZWxlY3RlZC5maWxsJ11cbiAgICAgICAgXSkrXG5cbiAgICAgICAgLy8gICAgdGVybWluYWwgbm9kZVxuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5ub2RlU2VsZWN0b3IoJ3Rlcm1pbmFsJykrJyBwYXRoJyxbXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnbm9kZS50ZXJtaW5hbC5maWxsJ10sXG4gICAgICAgICAgICBbJ3N0cm9rZScsICdub2RlLnRlcm1pbmFsLnN0cm9rZSddXG4gICAgICAgIF0pK1xuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5ub2RlU2VsZWN0b3IoJ3Rlcm1pbmFsJywgJ3NlbGVjdGVkJykrJyBwYXRoJyxbXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnbm9kZS50ZXJtaW5hbC5zZWxlY3RlZC5maWxsJ11cbiAgICAgICAgXSkrXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLm5vZGVTZWxlY3RvcigndGVybWluYWwnKSsnIC5hZ2dyZWdhdGVkLXBheW9mZicsW1xuICAgICAgICAgICAgWydmb250LXNpemUnLCAnbm9kZS50ZXJtaW5hbC5wYXlvZmYuZm9udFNpemUnXSxcbiAgICAgICAgICAgIFsnZmlsbCcsICdub2RlLnRlcm1pbmFsLnBheW9mZi5jb2xvciddLFxuICAgICAgICBdKStcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCd0ZXJtaW5hbCcpKycgLmFnZ3JlZ2F0ZWQtcGF5b2ZmLm5lZ2F0aXZlJyxbXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnbm9kZS50ZXJtaW5hbC5wYXlvZmYubmVnYXRpdmVDb2xvciddLFxuICAgICAgICBdKStcblxuXG4gICAgICAgIC8vcHJvYmFiaWxpdHlcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMudHJlZURlc2lnbmVyU2VsZWN0b3IrJyAubm9kZSAucHJvYmFiaWxpdHktdG8tZW50ZXIsICcrVGVtcGxhdGVzLnRyZWVEZXNpZ25lclNlbGVjdG9yKycgLmVkZ2UgLnByb2JhYmlsaXR5JyxbXG4gICAgICAgICAgICBbJ2ZvbnQtc2l6ZScsICdwcm9iYWJpbGl0eS5mb250U2l6ZSddLFxuICAgICAgICAgICAgWydmaWxsJywgJ3Byb2JhYmlsaXR5LmNvbG9yJ11cbiAgICAgICAgXSkrXG5cbiAgICAgICAgLy9lZGdlXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLmVkZ2VTZWxlY3RvcigpKycgcGF0aCcsW1xuICAgICAgICAgICAgWydzdHJva2UnLCAnZWRnZS5zdHJva2UnXSxcbiAgICAgICAgICAgIFsnc3Ryb2tlLXdpZHRoJywgJ2VkZ2Uuc3Ryb2tlV2lkdGgnXVxuICAgICAgICBdKStcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMudHJlZURlc2lnbmVyU2VsZWN0b3IrJyBtYXJrZXIjYXJyb3cgcGF0aCcsW1xuICAgICAgICAgICAgWydmaWxsJywgJ2VkZ2Uuc3Ryb2tlJ10sXG4gICAgICAgIF0pK1xuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5lZGdlU2VsZWN0b3IoJ29wdGltYWwnKSsnIHBhdGgnLFtcbiAgICAgICAgICAgIFsnc3Ryb2tlJywgJ2VkZ2Uub3B0aW1hbC5zdHJva2UnXSxcbiAgICAgICAgICAgIFsnc3Ryb2tlLXdpZHRoJywgJ2VkZ2Uub3B0aW1hbC5zdHJva2VXaWR0aCddXG4gICAgICAgIF0pK1xuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy50cmVlRGVzaWduZXJTZWxlY3RvcisnIG1hcmtlciNhcnJvdy1vcHRpbWFsIHBhdGgnLFtcbiAgICAgICAgICAgIFsnZmlsbCcsICdlZGdlLm9wdGltYWwuc3Ryb2tlJ10sXG4gICAgICAgIF0pK1xuXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLmVkZ2VTZWxlY3Rvcignc2VsZWN0ZWQnKSsnIHBhdGgnLFtcbiAgICAgICAgICAgIFsnc3Ryb2tlJywgJ2VkZ2Uuc2VsZWN0ZWQuc3Ryb2tlJ10sXG4gICAgICAgICAgICBbJ3N0cm9rZS13aWR0aCcsICdlZGdlLnNlbGVjdGVkLnN0cm9rZVdpZHRoJ11cbiAgICAgICAgXSkrXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLnRyZWVEZXNpZ25lclNlbGVjdG9yKycgbWFya2VyI2Fycm93LXNlbGVjdGVkIHBhdGgnLFtcbiAgICAgICAgICAgIFsnZmlsbCcsICdlZGdlLnNlbGVjdGVkLnN0cm9rZSddLFxuICAgICAgICBdKStcblxuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5lZGdlU2VsZWN0b3IoKSsnIC5sYWJlbCcsW1xuICAgICAgICAgICAgWydmb250LXNpemUnLCAnZWRnZS5sYWJlbC5mb250U2l6ZSddLFxuICAgICAgICAgICAgWydmaWxsJywgJ2VkZ2UubGFiZWwuY29sb3InXVxuICAgICAgICBdKStcblxuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5lZGdlU2VsZWN0b3IoKSsnIC5wYXlvZmYnLFtcbiAgICAgICAgICAgIFsnZm9udC1zaXplJywgJ2VkZ2UucGF5b2ZmLmZvbnRTaXplJ10sXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnZWRnZS5wYXlvZmYuY29sb3InXSxcbiAgICAgICAgXSkrXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLmVkZ2VTZWxlY3RvcigpKycgLnBheW9mZi5uZWdhdGl2ZScsW1xuICAgICAgICAgICAgWydmaWxsJywgJ2VkZ2UucGF5b2ZmLm5lZ2F0aXZlQ29sb3InXSxcbiAgICAgICAgXSkrXG5cbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMudHJlZURlc2lnbmVyU2VsZWN0b3IrJyAuc2QtdGl0bGUtY29udGFpbmVyIHRleHQuc2QtdGl0bGUnLFtcbiAgICAgICAgICAgIFsnZm9udC1zaXplJywgJ3RpdGxlLmZvbnRTaXplJ10sXG4gICAgICAgICAgICBbJ2ZvbnQtd2VpZ2h0JywgJ3RpdGxlLmZvbnRXZWlnaHQnXSxcbiAgICAgICAgICAgIFsnZm9udC1zdHlsZScsICd0aXRsZS5mb250U3R5bGUnXSxcbiAgICAgICAgICAgIFsnZmlsbCcsICd0aXRsZS5jb2xvciddXG4gICAgICAgIF0pICtcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMudHJlZURlc2lnbmVyU2VsZWN0b3IrJyAuc2QtdGl0bGUtY29udGFpbmVyIHRleHQuc2QtZGVzY3JpcHRpb24nLFtcbiAgICAgICAgICAgIFsnZm9udC1zaXplJywgJ2Rlc2NyaXB0aW9uLmZvbnRTaXplJ10sXG4gICAgICAgICAgICBbJ2ZvbnQtd2VpZ2h0JywgJ2Rlc2NyaXB0aW9uLmZvbnRXZWlnaHQnXSxcbiAgICAgICAgICAgIFsnZm9udC1zdHlsZScsICdkZXNjcmlwdGlvbi5mb250U3R5bGUnXSxcbiAgICAgICAgICAgIFsnZmlsbCcsICdkZXNjcmlwdGlvbi5jb2xvciddXG4gICAgICAgIF0pXG59XG5cblxuXG5cbiIsIm1vZHVsZS5leHBvcnRzID0gXCJtb2R1bGUuZXhwb3J0cyA9IFxcXCI8ZGl2IGNsYXNzPVxcXFxcXFwic2QtZ3Jvd2wtbWVzc2FnZSA8JT10eXBlJT5cXFxcXFxcIj5cXFxcbiAgICA8ZGl2IGNsYXNzPVxcXFxcXFwic2QtZ3Jvd2wtbWVzc2FnZS10ZXh0XFxcXFxcXCI+XFxcXG4gICAgICAgIDwlPSBtZXNzYWdlICU+XFxcXG4gICAgPC9kaXY+XFxcXG48L2Rpdj5cXFxcblxcXCI7XFxuXCI7XG4iLCJpbXBvcnQge0FwcFV0aWxzfSBmcm9tICcuL2FwcC11dGlscydcbmltcG9ydCAqIGFzIGQzIGZyb20gJy4vZDMnXG5pbXBvcnQge0NvbnRleHRNZW51fSBmcm9tICcuL2NvbnRleHQtbWVudS9jb250ZXh0LW1lbnUnXG5cbmV4cG9ydCBjbGFzcyBUZXh0RHJhZ0hhbmRsZXJ7XG5cbiAgICB0cmVlRGVzaWduZXI7XG4gICAgZGF0YTtcbiAgICBjb25maWc7XG5cbiAgICBkcmFnO1xuXG5cbiAgICBjb25zdHJ1Y3Rvcih0cmVlRGVzaWduZXIsIGRhdGEpe1xuICAgICAgICB0aGlzLnRyZWVEZXNpZ25lciA9IHRyZWVEZXNpZ25lcjtcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcblxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuZHJhZyA9IGQzLmRyYWcoKVxuICAgICAgICAgICAgLnN1YmplY3QoZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICAgIGlmKGQ9PW51bGwpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IGV2ZW50LngsXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiBldmVudC55XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciB0ID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IHQuYXR0cihcInhcIikgKyBBcHBVdGlscy5nZXRUcmFuc2xhdGlvbih0LmF0dHIoXCJ0cmFuc2Zvcm1cIikpWzBdLFxuICAgICAgICAgICAgICAgICAgICB5OiB0LmF0dHIoXCJ5XCIpICsgQXBwVXRpbHMuZ2V0VHJhbnNsYXRpb24odC5hdHRyKFwidHJhbnNmb3JtXCIpKVsxXVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKFwic3RhcnRcIiwgZnVuY3Rpb24oZCl7XG4gICAgICAgICAgICAgICAgc2VsZi5kcmFnU3RhcnRlZC5jYWxsKHRoaXMsZCwgc2VsZilcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oXCJkcmFnXCIsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5vbkRyYWcuY2FsbCh0aGlzLCBkLCBzZWxmKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oXCJlbmRcIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmRyYWdFbmRlZC5jYWxsKHRoaXMsIGQsIHNlbGYpO1xuICAgICAgICAgICAgfSlcbiAgICB9XG5cblxuICAgIGRyYWdTdGFydGVkKGQsc2VsZikge1xuICAgICAgICAvLyBzZWxmLnRyZWVEZXNpZ25lci5sYXlvdXQuZGlzYWJsZUF1dG9MYXlvdXQoKTtcbiAgICAgICAgQ29udGV4dE1lbnUuaGlkZSgpO1xuICAgICAgICB2YXIgdGV4dCA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgaWYoIXRleHQuY2xhc3NlZChcInNlbGVjdGVkXCIpKXtcbiAgICAgICAgICAgIHNlbGYudHJlZURlc2lnbmVyLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICBzZWxmLnRyZWVEZXNpZ25lci5zZWxlY3RUZXh0KGQpO1xuICAgICAgICB0ZXh0LmNsYXNzZWQoXCJzZWxlY3RlZCBkcmFnZ2luZ1wiLCB0cnVlKTtcbiAgICAgICAgc2VsZi5zZWxlY3RlZE5vZGVzID0gc2VsZi50cmVlRGVzaWduZXIuZ2V0U2VsZWN0ZWROb2RlcygpO1xuICAgICAgICBzZWxmLnByZXZEcmFnRXZlbnQgPSBkMy5ldmVudDtcbiAgICAgICAgc2VsZi5kcmFnRXZlbnRDb3VudCA9IDA7XG4gICAgfVxuXG4gICAgb25EcmFnKGRyYWdnZWRUZXh0LCBzZWxmKXtcbiAgICAgICAgaWYoc2VsZi5kcmFnRXZlbnRDb3VudD09Mil7XG4gICAgICAgICAgICBzZWxmLmRhdGEuc2F2ZVN0YXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5kcmFnRXZlbnRDb3VudCsrO1xuXG4gICAgICAgIHZhciBkeCA9IGQzLmV2ZW50LnggLSBzZWxmLnByZXZEcmFnRXZlbnQueDtcbiAgICAgICAgdmFyIGR5ID0gZDMuZXZlbnQueS0gc2VsZi5wcmV2RHJhZ0V2ZW50Lnk7XG5cbiAgICAgICAgZHJhZ2dlZFRleHQubG9jYXRpb24ubW92ZShkeCwgZHkpO1xuICAgICAgICBzZWxmLnRyZWVEZXNpZ25lci51cGRhdGVUZXh0UG9zaXRpb24oZHJhZ2dlZFRleHQpO1xuXG4gICAgICAgIHNlbGYucHJldkRyYWdFdmVudCA9IGQzLmV2ZW50O1xuICAgICAgICBzZWxmLnRyZWVEZXNpZ25lci51cGRhdGVQbG90dGluZ1JlZ2lvblNpemUoKTtcbiAgICB9XG5cbiAgICBkcmFnRW5kZWQoZHJhZ2dlZE5vZGUsIHNlbGYpe1xuICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLmNsYXNzZWQoXCJkcmFnZ2luZ1wiLCBmYWxzZSk7XG4gICAgfVxuXG59XG5cblxuIiwiaW1wb3J0ICogYXMgZDMgZnJvbSAnLi9kMydcbmltcG9ydCB7VXRpbHN9IGZyb20gJ3NkLXV0aWxzJ1xuXG5leHBvcnQgY2xhc3MgVG9vbHRpcCB7XG4gICAgc3RhdGljIGdldENvbnRhaW5lcigpe1xuICAgICAgICByZXR1cm4gZDMuc2VsZWN0KFwiYm9keVwiKS5zZWxlY3RPckFwcGVuZCgnZGl2LnNkLXRvb2x0aXAnKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2hvdyhodG1sLCB4T2Zmc2V0ID0gNSwgeU9mZnNldCA9IDI4LCBldmVudCwgZHVyYXRpb249bnVsbCkge1xuICAgICAgICB2YXIgY29udGFpbmVyID0gVG9vbHRpcC5nZXRDb250YWluZXIoKVxuICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCAwKTtcbiAgICAgICAgY29udGFpbmVyLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDIwMClcbiAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgLjk4KTtcbiAgICAgICAgY29udGFpbmVyLmh0bWwoaHRtbCk7XG4gICAgICAgIFRvb2x0aXAudXBkYXRlUG9zaXRpb24oeE9mZnNldCwgeU9mZnNldCwgZXZlbnQpO1xuICAgICAgICBpZihkdXJhdGlvbil7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgVG9vbHRpcC5oaWRlKCk7XG4gICAgICAgICAgICB9LCBkdXJhdGlvbilcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyB1cGRhdGVQb3NpdGlvbih4T2Zmc2V0ID0gNSwgeU9mZnNldCA9IDI4LCBldmVudCkge1xuICAgICAgICBldmVudCA9IGV2ZW50IHx8IGQzLmV2ZW50O1xuICAgICAgICBUb29sdGlwLmdldENvbnRhaW5lcigpXG4gICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIChldmVudC5wYWdlWCArIHhPZmZzZXQpICsgXCJweFwiKVxuICAgICAgICAgICAgLnN0eWxlKFwidG9wXCIsIChldmVudC5wYWdlWSAtIHlPZmZzZXQpICsgXCJweFwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaGlkZShkdXJhdGlvbiA9IDUwMCkge1xuICAgICAgICB2YXIgdCA9IFRvb2x0aXAuZ2V0Q29udGFpbmVyKCk7XG4gICAgICAgIGlmKGR1cmF0aW9uKXtcbiAgICAgICAgICAgIHQgPSB0LnRyYW5zaXRpb24oKS5kdXJhdGlvbihkdXJhdGlvbilcbiAgICAgICAgfVxuICAgICAgICB0LnN0eWxlKFwib3BhY2l0eVwiLCAwKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgYXR0YWNoKHRhcmdldCwgaHRtbE9yRm4sIHhPZmZzZXQsIHlPZmZzZXQpIHtcbiAgICAgICAgdGFyZ2V0Lm9uKCdtb3VzZW92ZXInLCBmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgdmFyIGh0bWwgPSBudWxsO1xuICAgICAgICAgICAgaWYgKFV0aWxzLmlzRnVuY3Rpb24oaHRtbE9yRm4pKSB7XG4gICAgICAgICAgICAgICAgaHRtbCA9IGh0bWxPckZuKGQsIGkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBodG1sID0gaHRtbE9yRm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChodG1sICE9PSBudWxsICYmIGh0bWwgIT09IHVuZGVmaW5lZCAmJiBodG1sICE9PSAnJykge1xuICAgICAgICAgICAgICAgIFRvb2x0aXAuc2hvdyhodG1sLCB4T2Zmc2V0LCB5T2Zmc2V0KTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIFRvb2x0aXAuaGlkZSgwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KS5vbignbW91c2Vtb3ZlJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgIFRvb2x0aXAudXBkYXRlUG9zaXRpb24oeE9mZnNldCwgeU9mZnNldCk7XG4gICAgICAgIH0pLm9uKFwibW91c2VvdXRcIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgIFRvb2x0aXAuaGlkZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgKiBhcyBkMyBmcm9tIFwiLi9kM1wiO1xuaW1wb3J0IHtVdGlsc30gZnJvbSBcInNkLXV0aWxzXCI7XG5pbXBvcnQge0FwcFV0aWxzfSBmcm9tIFwiLi9hcHAtdXRpbHNcIjtcbmltcG9ydCB7ZG9tYWluIGFzIG1vZGVsfSBmcm9tIFwic2QtbW9kZWxcIjtcbmltcG9ydCB7Q29udGV4dE1lbnV9IGZyb20gXCIuL2NvbnRleHQtbWVudS9jb250ZXh0LW1lbnVcIjtcbmltcG9ydCB7TWFpbkNvbnRleHRNZW51fSBmcm9tIFwiLi9jb250ZXh0LW1lbnUvbWFpbi1jb250ZXh0LW1lbnVcIjtcbmltcG9ydCB7Tm9kZUNvbnRleHRNZW51fSBmcm9tIFwiLi9jb250ZXh0LW1lbnUvbm9kZS1jb250ZXh0LW1lbnVcIjtcbmltcG9ydCB7TGF5b3V0fSBmcm9tIFwiLi9sYXlvdXRcIjtcbmltcG9ydCB7Tm9kZURyYWdIYW5kbGVyfSBmcm9tIFwiLi9ub2RlLWRyYWctaGFuZGxlclwiO1xuaW1wb3J0IHtUb29sdGlwfSBmcm9tIFwiLi90b29sdGlwXCI7XG5pbXBvcnQge1RlbXBsYXRlc30gZnJvbSBcIi4vdGVtcGxhdGVzXCI7XG5pbXBvcnQge1RleHREcmFnSGFuZGxlcn0gZnJvbSBcIi4vdGV4dC1kcmFnLWhhbmRsZXJcIjtcbmltcG9ydCB7VGV4dENvbnRleHRNZW51fSBmcm9tIFwiLi9jb250ZXh0LW1lbnUvdGV4dC1jb250ZXh0LW1lbnVcIjtcbmltcG9ydCB7RWRnZUNvbnRleHRNZW51fSBmcm9tIFwiLi9jb250ZXh0LW1lbnUvZWRnZS1jb250ZXh0LW1lbnVcIjtcbmltcG9ydCAqIGFzIEhhbW1lciBmcm9tIFwiaGFtbWVyanNcIjtcbmltcG9ydCB7aTE4bn0gZnJvbSBcIi4vaTE4bi9pMThuXCI7XG5cblxuZXhwb3J0IGNsYXNzIFRyZWVEZXNpZ25lckNvbmZpZyB7XG4gICAgd2lkdGggPSB1bmRlZmluZWQ7XG4gICAgaGVpZ2h0ID0gdW5kZWZpbmVkO1xuICAgIG1hcmdpbiA9IHtcbiAgICAgICAgbGVmdDogMjUsXG4gICAgICAgIHJpZ2h0OiAyNSxcbiAgICAgICAgdG9wOiAyNSxcbiAgICAgICAgYm90dG9tOiAyNVxuICAgIH07XG4gICAgbG5nID0gJ2VuJztcbiAgICBsYXlvdXQ9IHtcbiAgICAgICAgdHlwZTogJ3RyZWUnLFxuICAgICAgICBub2RlU2l6ZTogNDAsXG4gICAgICAgIGxpbWl0Tm9kZVBvc2l0aW9uaW5nOiB0cnVlLFxuICAgICAgICBncmlkSGVpZ2h0OiA3NSxcbiAgICAgICAgZ3JpZFdpZHRoOiAxNTAsXG4gICAgICAgIGVkZ2VTbGFudFdpZHRoTWF4OiAyMFxuICAgIH07XG4gICAgZm9udEZhbWlseSA9ICdzYW5zLXNlcmlmJztcbiAgICBmb250U2l6ZSA9ICcxMnB4JztcbiAgICBmb250V2VpZ2h0ID0gJ25vcm1hbCc7XG4gICAgZm9udFN0eWxlID0gJ25vcm1hbCc7XG4gICAgbm9kZSA9IHtcbiAgICAgICAgc3Ryb2tlV2lkdGg6ICcxcHgnLFxuICAgICAgICBvcHRpbWFsOiB7XG4gICAgICAgICAgICBzdHJva2U6ICcjMDA2ZjAwJyxcbiAgICAgICAgICAgIHN0cm9rZVdpZHRoOiAnMS41cHgnLFxuICAgICAgICB9LFxuICAgICAgICBsYWJlbDoge1xuICAgICAgICAgICAgZm9udFNpemU6ICcxZW0nLFxuICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgfSxcbiAgICAgICAgcGF5b2ZmOiB7XG4gICAgICAgICAgICBmb250U2l6ZTogJzFlbScsXG4gICAgICAgICAgICBjb2xvcjogJ2JsYWNrJyxcbiAgICAgICAgICAgIG5lZ2F0aXZlQ29sb3I6ICcjYjYwMDAwJ1xuICAgICAgICB9LFxuICAgICAgICBkZWNpc2lvbjoge1xuICAgICAgICAgICAgZmlsbDogJyNmZjc3NzcnLFxuICAgICAgICAgICAgc3Ryb2tlOiAnIzY2MDAwMCcsXG5cbiAgICAgICAgICAgIHNlbGVjdGVkOiB7XG4gICAgICAgICAgICAgICAgZmlsbDogJyNhYTMzMzMnLFxuICAgICAgICAgICAgICAgIC8vIHN0cm9rZTogJyM2NjY2MDAnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGNoYW5jZToge1xuICAgICAgICAgICAgZmlsbDogJyNmZmZmNDQnLFxuICAgICAgICAgICAgc3Ryb2tlOiAnIzY2NjYwMCcsXG5cbiAgICAgICAgICAgIHNlbGVjdGVkOiB7XG4gICAgICAgICAgICAgICAgZmlsbDogJyNhYWFhMDAnLFxuICAgICAgICAgICAgICAgIC8vIHN0cm9rZTogJyM2NjY2MDAnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHRlcm1pbmFsOntcbiAgICAgICAgICAgIGZpbGw6ICcjNDRmZjQ0JyxcbiAgICAgICAgICAgIHN0cm9rZTogJ2JsYWNrJyxcbiAgICAgICAgICAgIHNlbGVjdGVkOiB7XG4gICAgICAgICAgICAgICAgZmlsbDogJyMwMGFhMDAnLFxuICAgICAgICAgICAgICAgIC8vIHN0cm9rZTogJ2JsYWNrJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBheW9mZjoge1xuICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMWVtJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJyxcbiAgICAgICAgICAgICAgICBuZWdhdGl2ZUNvbG9yOiAnI2I2MDAwMCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICB9O1xuICAgIGVkZ2U9e1xuICAgICAgICBzdHJva2U6ICcjNDI0MjQyJyxcbiAgICAgICAgc3Ryb2tlV2lkdGg6ICcxLjUnLFxuICAgICAgICBvcHRpbWFsOntcbiAgICAgICAgICAgIHN0cm9rZTogJyMwMDZmMDAnLFxuICAgICAgICAgICAgc3Ryb2tlV2lkdGg6ICcyLjQnLFxuICAgICAgICB9LFxuICAgICAgICBzZWxlY3RlZDp7XG4gICAgICAgICAgICBzdHJva2U6ICcjMDQ1YWQxJyxcbiAgICAgICAgICAgIHN0cm9rZVdpZHRoOiAnMy41JyxcbiAgICAgICAgfSxcbiAgICAgICAgbGFiZWw6IHtcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMWVtJyxcbiAgICAgICAgICAgIGNvbG9yOiAnYmFjaydcbiAgICAgICAgfSxcbiAgICAgICAgcGF5b2ZmOntcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMWVtJyxcbiAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snLFxuICAgICAgICAgICAgbmVnYXRpdmVDb2xvcjogJyNiNjAwMDAnXG4gICAgICAgIH1cblxuICAgIH07XG4gICAgcHJvYmFiaWxpdHkgPSB7XG4gICAgICAgIGZvbnRTaXplOiAnMWVtJyxcbiAgICAgICAgY29sb3I6ICcjMDAwMGQ3J1xuICAgIH07XG4gICAgdGl0bGUgPSB7XG4gICAgICAgIGZvbnRTaXplOiAnMTZweCcsXG4gICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcbiAgICAgICAgZm9udFN0eWxlOiAnbm9ybWFsJyxcbiAgICAgICAgY29sb3I6ICcjMDAwMDAwJyxcbiAgICAgICAgbWFyZ2luOntcbiAgICAgICAgICAgIHRvcDogMTUsXG4gICAgICAgICAgICBib3R0b206IDEwXG4gICAgICAgIH1cbiAgICB9O1xuICAgIGRlc2NyaXB0aW9uID0ge1xuICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICBmb250U2l6ZTogJzEycHgnLFxuICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXG4gICAgICAgIGZvbnRTdHlsZTogJ25vcm1hbCcsXG4gICAgICAgIGNvbG9yOiAnIzAwMDAwMCcsXG4gICAgICAgIG1hcmdpbjp7XG4gICAgICAgICAgICB0b3A6IDUsXG4gICAgICAgICAgICBib3R0b206IDEwXG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcmVhZE9ubHk9IGZhbHNlO1xuICAgIGRpc2FibGVBbmltYXRpb25zPWZhbHNlO1xuICAgIGZvcmNlRnVsbEVkZ2VSZWRyYXc9ZmFsc2U7XG4gICAgaGlkZUxhYmVscz1mYWxzZTtcbiAgICBoaWRlUGF5b2Zmcz1mYWxzZTtcbiAgICBoaWRlUHJvYmFiaWxpdGllcz1mYWxzZTtcbiAgICByYXc9ZmFsc2U7XG5cblxuICAgIHBheW9mZk51bWJlckZvcm1hdHRlciA9ICh2LCBpKT0+IHY7XG4gICAgcHJvYmFiaWxpdHlOdW1iZXJGb3JtYXR0ZXIgID0gKHYpPT4gdjtcblxuICAgIG9uTm9kZVNlbGVjdGVkID0gKG5vZGUpID0+IHt9O1xuICAgIG9uRWRnZVNlbGVjdGVkID0gKGVkZ2UpID0+IHt9O1xuICAgIG9uVGV4dFNlbGVjdGVkID0gKHRleHQpID0+IHt9O1xuICAgIG9uU2VsZWN0aW9uQ2xlYXJlZCA9ICgpID0+IHt9O1xuXG4gICAgb3BlcmF0aW9uc0Zvck9iamVjdCA9IChvKSA9PiBbXTtcblxuICAgIHBheW9mZk5hbWVzID0gW251bGwsIG51bGxdO1xuICAgIG1heFBheW9mZnNUb0Rpc3BsYXkgPSAxO1xuXG4gICAgY29uc3RydWN0b3IoY3VzdG9tKSB7XG4gICAgICAgIGlmIChjdXN0b20pIHtcbiAgICAgICAgICAgIFV0aWxzLmRlZXBFeHRlbmQodGhpcywgY3VzdG9tKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgVHJlZURlc2lnbmVyIHtcblxuICAgIGNvbmZpZztcbiAgICBjb250YWluZXI7XG4gICAgZGF0YTsgLy9kYXRhIG1vZGVsIG1hbmFnZXJcbiAgICBzdmc7XG5cbiAgICBjb25zdHJ1Y3Rvcihjb250YWluZXIsIGRhdGFNb2RlbCwgY29uZmlnKXtcbiAgICAgICAgdGhpcy5zZXRDb25maWcoY29uZmlnKTtcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YU1vZGVsO1xuICAgICAgICB0aGlzLmluaXRDb250YWluZXIoY29udGFpbmVyKTtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuXG4gICAgc2V0Q29uZmlnKGNvbmZpZykge1xuICAgICAgICB0aGlzLmNvbmZpZyA9IG5ldyBUcmVlRGVzaWduZXJDb25maWcoY29uZmlnKTtcbiAgICAgICAgaWYodGhpcy5sYXlvdXQpe1xuICAgICAgICAgICAgdGhpcy5sYXlvdXQuY29uZmlnPXRoaXMuY29uZmlnLmxheW91dDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0ZUN1c3RvbVN0eWxlcygpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBpbml0KCl7XG5cbiAgICAgICAgdGhpcy5pbml0U3ZnKCk7XG4gICAgICAgIHRoaXMuaW5pdExheW91dCgpO1xuICAgICAgICB0aGlzLmluaXRJMThuKCk7XG4gICAgICAgIHRoaXMuaW5pdEJydXNoKCk7XG4gICAgICAgIHRoaXMuaW5pdEVkZ2VNYXJrZXJzKCk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVDdXN0b21TdHlsZXMoKTtcbiAgICAgICAgaWYoIXRoaXMuY29uZmlnLnJlYWRPbmx5KXtcbiAgICAgICAgICAgIHRoaXMuaW5pdE1haW5Db250ZXh0TWVudSgpO1xuICAgICAgICAgICAgdGhpcy5pbml0Tm9kZUNvbnRleHRNZW51KCk7XG4gICAgICAgICAgICB0aGlzLmluaXRFZGdlQ29udGV4dE1lbnUoKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdE5vZGVEcmFnSGFuZGxlcigpO1xuICAgICAgICAgICAgdGhpcy5pbml0VGV4dERyYWdIYW5kbGVyKCk7XG4gICAgICAgICAgICB0aGlzLmluaXRUZXh0Q29udGV4dE1lbnUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlZHJhdygpO1xuICAgIH1cblxuICAgIGluaXRJMThuKCkge1xuICAgICAgICBpMThuLmluaXQodGhpcy5jb25maWcubG5nKTtcbiAgICB9XG5cblxuICAgIHVwZGF0ZUN1c3RvbVN0eWxlcygpe1xuICAgICAgICBkMy5zZWxlY3QoJ2hlYWQnKS5zZWxlY3RPckFwcGVuZCgnc3R5bGUjc2QtdHJlZS1kZXNpZ25lci1zdHlsZScpLmh0bWwoVGVtcGxhdGVzLmdldCgndHJlZURlc2lnbmVyU3R5bGVzJywgdGhpcy5jb25maWcpKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgaW5pdExheW91dCgpe1xuICAgICAgICB0aGlzLmxheW91dCA9IG5ldyBMYXlvdXQodGhpcywgdGhpcy5kYXRhLCB0aGlzLmNvbmZpZy5sYXlvdXQpO1xuICAgIH1cblxuICAgIGluaXROb2RlRHJhZ0hhbmRsZXIoKXtcbiAgICAgICAgdGhpcy5ub2RlRHJhZ0hhbmRsZXIgPSBuZXcgTm9kZURyYWdIYW5kbGVyKHRoaXMsIHRoaXMuZGF0YSk7XG4gICAgfVxuXG4gICAgaW5pdFRleHREcmFnSGFuZGxlcigpe1xuICAgICAgICB0aGlzLnRleHREcmFnSGFuZGxlciA9IG5ldyBUZXh0RHJhZ0hhbmRsZXIodGhpcywgdGhpcy5kYXRhKTtcbiAgICB9XG5cbiAgICByZWRyYXcod2l0aFRyYW5zaXRpb25zPWZhbHNlKXtcblxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHdpdGhUcmFuc2l0aW9ucyA9ICFzZWxmLmNvbmZpZy5kaXNhYmxlQW5pbWF0aW9ucyAmJiB3aXRoVHJhbnNpdGlvbnM7XG4gICAgICAgIHRoaXMucmVkcmF3RGlhZ3JhbVRpdGxlKCk7XG4gICAgICAgIHRoaXMucmVkcmF3RGlhZ3JhbURlc2NyaXB0aW9uKCk7XG4gICAgICAgIHRoaXMudXBkYXRlTWFyZ2luKHdpdGhUcmFuc2l0aW9ucyk7XG4gICAgICAgIGlmKHdpdGhUcmFuc2l0aW9ucyl7XG4gICAgICAgICAgICBzZWxmLnRyYW5zaXRpb25QcmV2ID0gc2VsZi50cmFuc2l0aW9uO1xuICAgICAgICAgICAgc2VsZi50cmFuc2l0aW9uID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlZHJhd05vZGVzKCk7XG4gICAgICAgIHRoaXMucmVkcmF3RWRnZXMoKTtcbiAgICAgICAgdGhpcy5yZWRyYXdGbG9hdGluZ1RleHRzKCk7XG4gICAgICAgIHRoaXMudXBkYXRlVmFsaWRhdGlvbk1lc3NhZ2VzKCk7XG4gICAgICAgIGlmKHdpdGhUcmFuc2l0aW9ucyl7XG4gICAgICAgICAgICBzZWxmLnRyYW5zaXRpb24gPSAgc2VsZi50cmFuc2l0aW9uUHJldjtcbiAgICAgICAgfVxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBzZWxmLnVwZGF0ZVBsb3R0aW5nUmVnaW9uU2l6ZSgpO1xuICAgICAgICB9LDEwKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBjb21wdXRlQXZhaWxhYmxlU3BhY2UoKXtcbiAgICAgICAgdGhpcy5hdmFpbGFibGVIZWlnaHQgPSBBcHBVdGlscy5zYW5pdGl6ZUhlaWdodCh0aGlzLmNvbmZpZy5oZWlnaHQsIHRoaXMuY29udGFpbmVyLCB0aGlzLmNvbmZpZy5tYXJnaW4pO1xuICAgICAgICB0aGlzLmF2YWlsYWJsZVdpZHRoID0gQXBwVXRpbHMuc2FuaXRpemVXaWR0aCh0aGlzLmNvbmZpZy53aWR0aCwgdGhpcy5jb250YWluZXIsIHRoaXMuY29uZmlnLm1hcmdpbik7XG4gICAgfVxuXG4gICAgaW5pdFN2ZygpIHtcbiAgICAgICAgdmFyIGMgPSB0aGlzO1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuY29tcHV0ZUF2YWlsYWJsZVNwYWNlKCk7XG4gICAgICAgIHRoaXMuc3ZnID0gdGhpcy5jb250YWluZXIuc2VsZWN0T3JBcHBlbmQoJ3N2Zy5zZC10cmVlLWRlc2lnbmVyJyk7XG4gICAgICAgIHRoaXMuc3ZnLmF0dHIoJ3dpZHRoJywgdGhpcy5hdmFpbGFibGVXaWR0aCkuYXR0cignaGVpZ2h0JywgdGhpcy5hdmFpbGFibGVIZWlnaHQpO1xuXG4gICAgICAgIHRoaXMubWFpbkdyb3VwID0gdGhpcy5zdmcuc2VsZWN0T3JBcHBlbmQoJ2cubWFpbi1ncm91cCcpO1xuICAgICAgICB0aGlzLnVwZGF0ZU1hcmdpbigpO1xuXG5cbiAgICAgICAgaWYgKCF0aGlzLmNvbmZpZy53aWR0aCkge1xuICAgICAgICAgICAgZDMuc2VsZWN0KHdpbmRvdylcbiAgICAgICAgICAgICAgICAub24oXCJyZXNpemUudHJlZS1kZXNpZ25lclwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYudXBkYXRlUGxvdHRpbmdSZWdpb25TaXplKCk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYucmVkcmF3RGlhZ3JhbVRpdGxlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbWMgPSBuZXcgSGFtbWVyLk1hbmFnZXIodGhpcy5zdmcubm9kZSgpLCB7dG91Y2hBY3Rpb24gOiAnYXV0byd9KTtcbiAgICAgICAgbWMuYWRkKG5ldyBIYW1tZXIuUHJlc3Moe1xuICAgICAgICAgICAgcG9pbnRlclR5cGU6ICd0b3VjaCdcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIG1jLmFkZChuZXcgSGFtbWVyLlBpbmNoKHtcbiAgICAgICAgICAgIHBvaW50ZXJUeXBlOiAndG91Y2gnXG4gICAgICAgIH0pKTtcblxuICAgICAgICB2YXIgY2FuY2VsO1xuICAgICAgICBtYy5vbigncGluY2hzdGFydCcsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBzZWxmLmRpc2FibGVCcnVzaCgpO1xuICAgICAgICB9KVxuICAgICAgICBtYy5vbigncGluY2gnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgY2FuY2VsID0gVXRpbHMud2FpdEZvckZpbmFsRXZlbnQoKCk9PnNlbGYuZW5hYmxlQnJ1c2goKSwgJ3BpbmNoZW5kJywgNTAwMClcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICB1cGRhdGVNYXJnaW4od2l0aFRyYW5zaXRpb25zKXtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgbWFyZ2luID0gdGhpcy5jb25maWcubWFyZ2luO1xuICAgICAgICB2YXIgZ3JvdXAgPSB0aGlzLm1haW5Hcm91cDtcbiAgICAgICAgaWYod2l0aFRyYW5zaXRpb25zKXtcbiAgICAgICAgICAgIGdyb3VwID0gZ3JvdXAudHJhbnNpdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50b3BNYXJnaW4gPSBtYXJnaW4udG9wO1xuICAgICAgICBpZih0aGlzLmRpYWdyYW1UaXRsZXx8dGhpcy5kaWFncmFtRGVzY3JpcHRpb24pe1xuICAgICAgICAgICAgdGhpcy50b3BNYXJnaW4gPSBwYXJzZUludCh0aGlzLmRpYWdyYW1UaXRsZSA/IHRoaXMuY29uZmlnLnRpdGxlLm1hcmdpbi50b3AgOiAwKSArIHRoaXMuZ2V0VGl0bGVHcm91cEhlaWdodCgpXG4gICAgICAgICAgICAgICAgKyAgTWF0aC5tYXgodGhpcy50b3BNYXJnaW4sIHBhcnNlSW50KHRoaXMuY29uZmlnLnRpdGxlLm1hcmdpbi5ib3R0b20pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdyb3VwLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoXCIgKyBtYXJnaW4ubGVmdCArIFwiLFwiICsgdGhpcy50b3BNYXJnaW4gKyBcIilcIikub24oXCJlbmRcIiwgKCk9PiBzZWxmLnVwZGF0ZVBsb3R0aW5nUmVnaW9uU2l6ZSgpKTtcbiAgICB9XG5cbiAgICBzZXRNYXJnaW4obWFyZ2luLCB3aXRob3V0U3RhdGVTYXZpbmcpe1xuICAgICAgICB2YXIgc2VsZj10aGlzO1xuICAgICAgICBpZighd2l0aG91dFN0YXRlU2F2aW5nKXtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoe1xuICAgICAgICAgICAgICAgIGRhdGE6e1xuICAgICAgICAgICAgICAgICAgICBtYXJnaW46IFV0aWxzLmNsb25lKHNlbGYuY29uZmlnLm1hcmdpbilcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uVW5kbzogKGRhdGEpPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldE1hcmdpbihkYXRhLm1hcmdpbiwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvblJlZG86IChkYXRhKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRNYXJnaW4obWFyZ2luLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBVdGlscy5kZWVwRXh0ZW5kKHRoaXMuY29uZmlnLm1hcmdpbiwgbWFyZ2luKTtcbiAgICAgICAgdGhpcy5yZWRyYXdEaWFncmFtVGl0bGUoKTtcbiAgICAgICAgdGhpcy51cGRhdGVNYXJnaW4odHJ1ZSk7XG4gICAgfVxuXG4gICAgaW5pdENvbnRhaW5lcihjb250YWluZXJJZE9yRWxlbSkge1xuICAgICAgICBpZiAoVXRpbHMuaXNTdHJpbmcoY29udGFpbmVySWRPckVsZW0pKSB7XG4gICAgICAgICAgICB2YXIgc2VsZWN0b3IgPSBjb250YWluZXJJZE9yRWxlbS50cmltKCk7XG5cbiAgICAgICAgICAgIGlmICghVXRpbHMuc3RhcnRzV2l0aChzZWxlY3RvciwgJyMnKSAmJiAhVXRpbHMuc3RhcnRzV2l0aChzZWxlY3RvciwgJy4nKSkge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yID0gJyMnICsgc2VsZWN0b3I7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGQzLnNlbGVjdChzZWxlY3Rvcik7XG4gICAgICAgIH0gZWxzZSBpZihjb250YWluZXJJZE9yRWxlbS5fcGFyZW50cyl7XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcklkT3JFbGVtXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5jb250YWluZXIgPSBkMy5zZWxlY3QoY29udGFpbmVySWRPckVsZW0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlUGxvdHRpbmdSZWdpb25TaXplKCkge1xuICAgICAgICB2YXIgY2hhbmdlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNvbXB1dGVBdmFpbGFibGVTcGFjZSgpO1xuICAgICAgICB2YXIgbWFyZ2luID0gdGhpcy5jb25maWcubWFyZ2luO1xuICAgICAgICB2YXIgc3ZnV2lkdGggPSB0aGlzLnN2Zy5hdHRyKCd3aWR0aCcpO1xuICAgICAgICB2YXIgc3ZnSGVpZ2h0ID0gdGhpcy5zdmcuYXR0cignaGVpZ2h0Jyk7XG4gICAgICAgIHZhciBtYWluR3JvdXBCb3ggPSB0aGlzLm1haW5Hcm91cC5ub2RlKCkuZ2V0QkJveCgpO1xuICAgICAgICB2YXIgbmV3U3ZnV2lkdGggPSBtYWluR3JvdXBCb3gud2lkdGgrbWFpbkdyb3VwQm94LngrbWFyZ2luLmxlZnQrbWFyZ2luLnJpZ2h0O1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5jbGFzc2VkKCd3aXRoLW92ZXJmbG93LXgnLCBuZXdTdmdXaWR0aD49dGhpcy5hdmFpbGFibGVXaWR0aCk7XG4gICAgICAgIG5ld1N2Z1dpZHRoID0gTWF0aC5tYXgobmV3U3ZnV2lkdGgsIHRoaXMuYXZhaWxhYmxlV2lkdGgpO1xuICAgICAgICBpZihzdmdXaWR0aCE9bmV3U3ZnV2lkdGgpe1xuICAgICAgICAgICAgY2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnN2Zy5hdHRyKCd3aWR0aCcsIG5ld1N2Z1dpZHRoKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbmV3U3ZnSGVpZ2h0ID0gbWFpbkdyb3VwQm94LmhlaWdodCttYWluR3JvdXBCb3gueSt0aGlzLnRvcE1hcmdpbittYXJnaW4uYm90dG9tO1xuXG4gICAgICAgIHRoaXMuY29udGFpbmVyLmNsYXNzZWQoJ3dpdGgtb3ZlcmZsb3cteScsIG5ld1N2Z0hlaWdodD49dGhpcy5hdmFpbGFibGVIZWlnaHQpO1xuICAgICAgICBuZXdTdmdIZWlnaHQgPSBNYXRoLm1heChuZXdTdmdIZWlnaHQsIHRoaXMuYXZhaWxhYmxlSGVpZ2h0KTtcbiAgICAgICAgaWYoc3ZnSGVpZ2h0IT1uZXdTdmdIZWlnaHQpe1xuICAgICAgICAgICAgY2hhbmdlZD10cnVlO1xuICAgICAgICAgICAgdGhpcy5zdmcuYXR0cignaGVpZ2h0JywgbmV3U3ZnSGVpZ2h0KTtcbiAgICAgICAgfVxuICAgICAgICBpZihjaGFuZ2VkKXtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQnJ1c2hFeHRlbnQoKVxuICAgICAgICB9XG5cblxuICAgIH1cblxuICAgIHJlZHJhd05vZGVzKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cblxuICAgICAgICB2YXIgbm9kZXNDb250YWluZXIgPSB0aGlzLm1haW5Hcm91cC5zZWxlY3RPckFwcGVuZCgnZy5ub2RlcycpO1xuICAgICAgICB2YXIgbm9kZXMgPSBub2Rlc0NvbnRhaW5lci5zZWxlY3RBbGwoJy5ub2RlJykuZGF0YSh0aGlzLmRhdGEubm9kZXMuZmlsdGVyKGQ9PiFkLiRoaWRkZW4pLCAoZCxpKT0+IGQuJGlkKTtcbiAgICAgICAgbm9kZXMuZXhpdCgpLnJlbW92ZSgpO1xuICAgICAgICB2YXIgbm9kZXNFbnRlciA9IG5vZGVzLmVudGVyKCkuYXBwZW5kKCdnJylcbiAgICAgICAgICAgIC5hdHRyKCdpZCcsIGQ9Pidub2RlLScrZC4kaWQpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCBkPT5kLnR5cGUrJy1ub2RlIG5vZGUnKVxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGQ9Pid0cmFuc2xhdGUoJyArIGQubG9jYXRpb24ueCArICcgICcgKyBkLmxvY2F0aW9uLnkgKyAnKScpO1xuICAgICAgICBub2Rlc0VudGVyLmFwcGVuZCgncGF0aCcpO1xuXG4gICAgICAgIHZhciBsYWJlbEVudGVyID0gbm9kZXNFbnRlci5hcHBlbmQoJ3RleHQnKS5hdHRyKCdjbGFzcycsICdsYWJlbCcpO1xuICAgICAgICB2YXIgcGF5b2ZmRW50ZXIgPSBub2Rlc0VudGVyLmFwcGVuZCgndGV4dCcpLmF0dHIoJ2NsYXNzJywgJ3BheW9mZiBjb21wdXRlZCcpO1xuICAgICAgICB2YXIgaW5kaWNhdG9yRW50ZXIgPSBub2Rlc0VudGVyLmFwcGVuZCgndGV4dCcpLmF0dHIoJ2NsYXNzJywgJ2Vycm9yLWluZGljYXRvcicpLnRleHQoJyEhJyk7XG4gICAgICAgIHZhciBhZ2dyZWdhdGVkUGF5b2ZmRW50ZXIgPSBub2Rlc0VudGVyLmFwcGVuZCgndGV4dCcpLmF0dHIoJ2NsYXNzJywgJ2FnZ3JlZ2F0ZWQtcGF5b2ZmJyk7XG4gICAgICAgIHZhciBwcm9iYWJpbGl0eVRvRW50ZXJFbnRlciA9IG5vZGVzRW50ZXIuYXBwZW5kKCd0ZXh0JykuYXR0cignY2xhc3MnLCAncHJvYmFiaWxpdHktdG8tZW50ZXInKTtcblxuICAgICAgICB2YXIgbm9kZXNNZXJnZSA9IG5vZGVzRW50ZXIubWVyZ2Uobm9kZXMpO1xuICAgICAgICBub2Rlc01lcmdlLmNsYXNzZWQoJ29wdGltYWwnLCAoZCk9PnNlbGYuaXNPcHRpbWFsKGQpKTtcblxuICAgICAgICB2YXIgbm9kZXNNZXJnZVQgPSBub2Rlc01lcmdlO1xuICAgICAgICBpZih0aGlzLnRyYW5zaXRpb24pe1xuICAgICAgICAgICAgbm9kZXNNZXJnZVQgPSBub2Rlc01lcmdlLnRyYW5zaXRpb24oKTtcbiAgICAgICAgICAgIG5vZGVzTWVyZ2VULm9uKCdlbmQnLCAoKT0+IHNlbGYudXBkYXRlUGxvdHRpbmdSZWdpb25TaXplKCkpXG4gICAgICAgIH1cbiAgICAgICAgbm9kZXNNZXJnZVRcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBkPT4ndHJhbnNsYXRlKCcgKyBkLmxvY2F0aW9uLnggKyAnICAnICsgZC5sb2NhdGlvbi55ICsgJyknKVxuXG4gICAgICAgIHZhciBwYXRoID0gbm9kZXNNZXJnZS5zZWxlY3QoJ3BhdGgnKTtcbiAgICAgICAgdGhpcy5sYXlvdXQuZHJhd05vZGVTeW1ib2wocGF0aCx0aGlzLnRyYW5zaXRpb24pO1xuXG4gICAgICAgIC8qcGF0aFxuICAgICAgICAgICAgLnN0eWxlKCdmaWxsJywgZD0+IHtcbiAgICAgICAgICAgICAgICAvLyBpZihzZWxmLmlzTm9kZVNlbGVjdGVkKGQpKXtcbiAgICAgICAgICAgICAgICAvLyAgICAgcmV0dXJuIHNlbGYuY29uZmlnLm5vZGVbZC50eXBlXS5zZWxlY3RlZC5maWxsXG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLmNvbmZpZy5ub2RlW2QudHlwZV0uZmlsbFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlJywgZD0+IHNlbGYuY29uZmlnLm5vZGVbZC50eXBlXS5zdHJva2UpXG4gICAgICAgICAgICAuc3R5bGUoJ3N0cm9rZS13aWR0aCcsIGQ9PiB7XG4gICAgICAgICAgICAgICAgaWYoc2VsZi5jb25maWcubm9kZVtkLnR5cGVdLnN0cm9rZVdpZHRoIT09dW5kZWZpbmVkKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYuY29uZmlnLm5vZGVbZC50eXBlXS5zdHJva2VXaWR0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYuY29uZmlnLm5vZGUuc3Ryb2tlV2lkdGg7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgKi9cbiAgICAgICAgdGhpcy5sYXlvdXQubm9kZUxhYmVsUG9zaXRpb24obGFiZWxFbnRlcik7XG4gICAgICAgIHZhciBsYWJlbE1lcmdlID0gbm9kZXNNZXJnZS5zZWxlY3QoJ3RleHQubGFiZWwnKTtcbiAgICAgICAgbGFiZWxNZXJnZS5jbGFzc2VkKCdzZC1oaWRkZW4nLCB0aGlzLmNvbmZpZy5oaWRlTGFiZWxzKTtcbiAgICAgICAgdmFyIGxhYmVsTWVyZ2VUID0gbm9kZXNNZXJnZVQuc2VsZWN0KCd0ZXh0LmxhYmVsJyk7XG4gICAgICAgIGxhYmVsTWVyZ2VULmVhY2godGhpcy51cGRhdGVUZXh0TGluZXMpO1xuICAgICAgICB0aGlzLmxheW91dC5ub2RlTGFiZWxQb3NpdGlvbihsYWJlbE1lcmdlVClcbiAgICAgICAgICAgIC5hdHRyKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKVxuXG4gICAgICAgIHZhciBwYXlvZmYgPSBub2Rlc01lcmdlLnNlbGVjdCgndGV4dC5wYXlvZmYnKTtcblxuICAgICAgICB2YXIgcGF5b2ZmVHNwYW5zID0gcGF5b2ZmLnNlbGVjdEFsbCgndHNwYW4nKS5kYXRhKGQ9PntcbiAgICAgICAgICAgIGxldCBpdGVtID0gZC5kaXNwbGF5VmFsdWUoJ2NoaWxkcmVuUGF5b2ZmJyk7XG4gICAgICAgICAgICByZXR1cm4gVXRpbHMuaXNBcnJheShpdGVtKSA/IGl0ZW0uZmlsdGVyKGk9PmkgIT09IHVuZGVmaW5lZCkgOiBbaXRlbV1cbiAgICAgICAgfSk7XG4gICAgICAgIHBheW9mZlRzcGFucy5leGl0KCkucmVtb3ZlKCk7XG5cbiAgICAgICAgdmFyIHBheW9mZlRzcGFuc00gPSBwYXlvZmZUc3BhbnMuZW50ZXIoKS5hcHBlbmQoJ3RzcGFuJykubWVyZ2UocGF5b2ZmVHNwYW5zKTtcbiAgICAgICAgcGF5b2ZmVHNwYW5zTVxuICAgICAgICAgICAgLy8gLmF0dHIoJ2RvbWluYW50LWJhc2VsaW5lJywgJ2hhbmdpbmcnKVxuICAgICAgICAgICAgLmF0dHIoJ2R5JywgKGQsaSk9Pmk+MCA/ICcxLjFlbSc6IHVuZGVmaW5lZClcbiAgICAgICAgICAgIC5hdHRyKCd4JywgJzAnKVxuICAgICAgICAgICAgLmNsYXNzZWQoJ25lZ2F0aXZlJywgZD0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZCE9PW51bGwgJiYgZDwwO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jbGFzc2VkKCdzZC1oaWRkZW4nLCB0aGlzLmNvbmZpZy5oaWRlUGF5b2ZmcyB8fCB0aGlzLmNvbmZpZy5yYXcpXG4gICAgICAgICAgICAudGV4dCgoZCwgaSk9PiB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbCA9IGRcblxuICAgICAgICAgICAgICAgIHJldHVybiB2YWwhPT1udWxsID8gKGlzTmFOKHZhbCkgPyB2YWwgOiBzZWxmLmNvbmZpZy5wYXlvZmZOdW1iZXJGb3JtYXR0ZXIodmFsLCBpKSk6ICcnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5hdHRhY2hQYXlvZmZUb29sdGlwKHBheW9mZlRzcGFuc00pO1xuXG5cbiAgICAgICAgdmFyIHBheW9mZlQgPSBwYXlvZmY7XG4gICAgICAgIGlmKHRoaXMudHJhbnNpdGlvbil7XG4gICAgICAgICAgICBwYXlvZmZUID0gcGF5b2ZmLnRyYW5zaXRpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubGF5b3V0Lm5vZGVQYXlvZmZQb3NpdGlvbihwYXlvZmZFbnRlcik7XG4gICAgICAgIHRoaXMubGF5b3V0Lm5vZGVQYXlvZmZQb3NpdGlvbihwYXlvZmZUKTtcblxuICAgICAgICB2YXIgYWdncmVnYXRlZFBheW9mZiA9IG5vZGVzTWVyZ2Uuc2VsZWN0KCd0ZXh0LmFnZ3JlZ2F0ZWQtcGF5b2ZmJyk7XG4gICAgICAgIHZhciBhZ2dyZWdhdGVkUGF5b2ZmVHNwYW5zID0gYWdncmVnYXRlZFBheW9mZi5zZWxlY3RBbGwoJ3RzcGFuJykuZGF0YShkPT57XG4gICAgICAgICAgICBsZXQgaXRlbSA9IGQuZGlzcGxheVZhbHVlKCdhZ2dyZWdhdGVkUGF5b2ZmJyk7XG4gICAgICAgICAgICByZXR1cm4gVXRpbHMuaXNBcnJheShpdGVtKSA/IGl0ZW0uZmlsdGVyKGk9PmkgIT09IHVuZGVmaW5lZCkgOiBbaXRlbV1cbiAgICAgICAgfSk7XG4gICAgICAgIGFnZ3JlZ2F0ZWRQYXlvZmZUc3BhbnMuZXhpdCgpLnJlbW92ZSgpO1xuICAgICAgICB2YXIgYWdncmVnYXRlZFBheW9mZlRzcGFuc00gPSBhZ2dyZWdhdGVkUGF5b2ZmVHNwYW5zLmVudGVyKCkuYXBwZW5kKCd0c3BhbicpLm1lcmdlKGFnZ3JlZ2F0ZWRQYXlvZmZUc3BhbnMpXG4gICAgICAgICAgICAuYXR0cignZHknLCAoZCxpKT0+aT4wID8gJzAuOTVlbSc6IHVuZGVmaW5lZClcbiAgICAgICAgICAgIC5jbGFzc2VkKCduZWdhdGl2ZScsIGQ9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQhPT1udWxsICYmIGQ8MDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2xhc3NlZCgnc2QtaGlkZGVuJywgdGhpcy5jb25maWcuaGlkZVBheW9mZnMgfHwgdGhpcy5jb25maWcucmF3KVxuICAgICAgICAgICAgLnRleHQoKHZhbCwgaSk9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbCE9PW51bGwgPyAoaXNOYU4odmFsKSA/IHZhbCA6IHNlbGYuY29uZmlnLnBheW9mZk51bWJlckZvcm1hdHRlcih2YWwsIGkpKTogJydcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYXR0YWNoUGF5b2ZmVG9vbHRpcChhZ2dyZWdhdGVkUGF5b2ZmVHNwYW5zTSwgJ2FnZ3JlZ2F0ZWRQYXlvZmYnKTtcblxuICAgICAgICB2YXIgYWdncmVnYXRlZFBheW9mZlQgPSBhZ2dyZWdhdGVkUGF5b2ZmO1xuICAgICAgICBpZih0aGlzLnRyYW5zaXRpb24pe1xuICAgICAgICAgICAgYWdncmVnYXRlZFBheW9mZlQgPSBhZ2dyZWdhdGVkUGF5b2ZmLnRyYW5zaXRpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubGF5b3V0Lm5vZGVBZ2dyZWdhdGVkUGF5b2ZmUG9zaXRpb24oYWdncmVnYXRlZFBheW9mZkVudGVyKTtcbiAgICAgICAgdGhpcy5sYXlvdXQubm9kZUFnZ3JlZ2F0ZWRQYXlvZmZQb3NpdGlvbihhZ2dyZWdhdGVkUGF5b2ZmVCk7XG5cbiAgICAgICAgdmFyIHByb2JhYmlsaXR5VG9FbnRlciA9IG5vZGVzTWVyZ2Uuc2VsZWN0KCd0ZXh0LnByb2JhYmlsaXR5LXRvLWVudGVyJylcbiAgICAgICAgICAgIC50ZXh0KGQ9PntcbiAgICAgICAgICAgICAgICB2YXIgdmFsID0gZC5kaXNwbGF5VmFsdWUoJ3Byb2JhYmlsaXR5VG9FbnRlcicpO1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWwhPT1udWxsID8gKGlzTmFOKHZhbCkgPyB2YWwgOiBzZWxmLmNvbmZpZy5wcm9iYWJpbGl0eU51bWJlckZvcm1hdHRlcih2YWwpKTogJydcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2xhc3NlZCgnc2QtaGlkZGVuJywgdGhpcy5jb25maWcuaGlkZVByb2JhYmlsaXRpZXMgfHwgdGhpcy5jb25maWcucmF3KTtcbiAgICAgICAgVG9vbHRpcC5hdHRhY2gocHJvYmFiaWxpdHlUb0VudGVyLCBpMThuLnQoJ3Rvb2x0aXAubm9kZS5wcm9iYWJpbGl0eVRvRW50ZXInKSk7XG5cblxuICAgICAgICB2YXIgcHJvYmFiaWxpdHlUb0VudGVyVCA9IHByb2JhYmlsaXR5VG9FbnRlcjtcbiAgICAgICAgaWYodGhpcy50cmFuc2l0aW9uKXtcbiAgICAgICAgICAgIHByb2JhYmlsaXR5VG9FbnRlclQgPSBwcm9iYWJpbGl0eVRvRW50ZXIudHJhbnNpdGlvbigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubGF5b3V0Lm5vZGVQcm9iYWJpbGl0eVRvRW50ZXJQb3NpdGlvbihwcm9iYWJpbGl0eVRvRW50ZXJFbnRlcik7XG4gICAgICAgIHRoaXMubGF5b3V0Lm5vZGVQcm9iYWJpbGl0eVRvRW50ZXJQb3NpdGlvbihwcm9iYWJpbGl0eVRvRW50ZXJUKTtcblxuXG4gICAgICAgIHZhciBpbmRpY2F0b3IgPSBub2Rlc01lcmdlLnNlbGVjdCgndGV4dC5lcnJvci1pbmRpY2F0b3InKTtcbiAgICAgICAgaW5kaWNhdG9yLmNsYXNzZWQoJ3NkLWhpZGRlbicsIHRoaXMuY29uZmlnLnJhdylcbiAgICAgICAgdGhpcy5sYXlvdXQubm9kZUluZGljYXRvclBvc2l0aW9uKGluZGljYXRvckVudGVyKTtcbiAgICAgICAgdGhpcy5sYXlvdXQubm9kZUluZGljYXRvclBvc2l0aW9uKGluZGljYXRvcik7XG5cbiAgICAgICAgaWYodGhpcy5ub2RlRHJhZ0hhbmRsZXIpe1xuICAgICAgICAgICAgbm9kZXNNZXJnZS5jYWxsKHRoaXMubm9kZURyYWdIYW5kbGVyLmRyYWcpO1xuICAgICAgICB9XG5cbiAgICAgICAgbm9kZXNNZXJnZS5vbignY29udGV4dG1lbnUnLCB0aGlzLm5vZGVDb250ZXh0TWVudSk7XG4gICAgICAgIG5vZGVzTWVyZ2Uub24oJ2RibGNsaWNrJywgdGhpcy5ub2RlQ29udGV4dE1lbnUpXG4gICAgICAgIG5vZGVzTWVyZ2UuZWFjaChmdW5jdGlvbihkLCBpKXtcbiAgICAgICAgICAgIHZhciBub2RlRWxlbSA9IHRoaXM7XG4gICAgICAgICAgICB2YXIgbWMgPSBuZXcgSGFtbWVyLk1hbmFnZXIobm9kZUVsZW0pO1xuICAgICAgICAgICAgbWMuYWRkKG5ldyBIYW1tZXIuUHJlc3Moe1xuICAgICAgICAgICAgICAgIHBvaW50ZXJUeXBlOiAndG91Y2gnXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICBtYy5vbigncHJlc3MnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgICAgICBpZihlLnBvaW50ZXJUeXBlPT0ndG91Y2gnKXtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5ub2RlRHJhZ0hhbmRsZXIuY2FuY2VsRHJhZygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG5cblxuICAgICAgICAgICAgaWYoZC5mb2xkZWQpe1xuICAgICAgICAgICAgICAgIGxldCBidXR0b24gPSBkMy5zZWxlY3Qobm9kZUVsZW0pLnNlbGVjdE9yQXBwZW5kKCd0ZXh0LnNkLXVuZm9sZC1idXR0b24nKVxuICAgICAgICAgICAgICAgICAgICAudGV4dChcIlsrXVwiKVxuICAgICAgICAgICAgICAgICAgICAub24oJ2NsaWNrIGRiY2xpY2sgbW91c2Vkb3duJywgKCk9PnNlbGYuZm9sZFN1YnRyZWUoZCwgZmFsc2UpKTsgLy9maXJlZm94IGRldGVjdHMgb25seSBtb3VzZWRvd24gZXZlbnQgLSByZWxhdGVkIHRvIGRyYWcgaGFuZGxlclxuXG4gICAgICAgICAgICAgICAgc2VsZi5sYXlvdXQubm9kZVVuZm9sZEJ1dHRvblBvc2l0aW9uKGJ1dHRvbik7XG4gICAgICAgICAgICAgICAgVG9vbHRpcC5hdHRhY2goYnV0dG9uLCBpMThuLnQoJ2NvbnRleHRNZW51Lm5vZGUudW5mb2xkJykpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgZDMuc2VsZWN0KG5vZGVFbGVtKS5zZWxlY3QoJy5zZC11bmZvbGQtYnV0dG9uJykucmVtb3ZlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBhdHRhY2hQYXlvZmZUb29sdGlwKHNlbGVjdGlvbiwgcGF5b2ZmRmlsZWROYW1lID0gJ3BheW9mZicsIG9iamVjdD0nbm9kZScpe1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIFRvb2x0aXAuYXR0YWNoKHNlbGVjdGlvbiwgKGQsIGkpPT57XG4gICAgICAgICAgICBpZihzZWxmLmNvbmZpZy5wYXlvZmZOYW1lcy5sZW5ndGg+aSAmJiBzZWxmLmNvbmZpZy5wYXlvZmZOYW1lc1tpXSAhPT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGkxOG4udCgndG9vbHRpcC4nK29iamVjdCsnLicrcGF5b2ZmRmlsZWROYW1lKycubmFtZWQnLHt2YWx1ZTogZC5wYXlvZmYsIG51bWJlcjogaSsxLCBuYW1lOiBzZWxmLmNvbmZpZy5wYXlvZmZOYW1lc1tpXX0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaTE4bi50KCd0b29sdGlwLicrb2JqZWN0KycuJytwYXlvZmZGaWxlZE5hbWUrJy5kZWZhdWx0Jyx7dmFsdWU6IGQucGF5b2ZmLCBudW1iZXI6IHNlbGYuY29uZmlnLm1heFBheW9mZnNUb0Rpc3BsYXkgPCAyID8gJycgOiBpKzF9KVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB1cGRhdGVUZXh0TGluZXMoZCl7IC8vaGVscGVyIG1ldGhvZCBmb3Igc3BsaXR0aW5nIHRleHQgdG8gdHNwYW5zXG4gICAgICAgIHZhciBsaW5lcyA9IGQubmFtZSA/IGQubmFtZS5zcGxpdCgnXFxuJykgOiBbXTtcbiAgICAgICAgbGluZXMucmV2ZXJzZSgpO1xuICAgICAgICB2YXIgdHNwYW5zID0gZDMuc2VsZWN0KHRoaXMpLnNlbGVjdEFsbCgndHNwYW4nKS5kYXRhKGxpbmVzKTtcbiAgICAgICAgdHNwYW5zLmVudGVyKCkuYXBwZW5kKCd0c3BhbicpXG4gICAgICAgICAgICAubWVyZ2UodHNwYW5zKVxuICAgICAgICAgICAgLnRleHQobD0+bClcbiAgICAgICAgICAgIC5hdHRyKCdkeScsIChkLGkpPT5pPjAgPyAnLTEuMWVtJzogdW5kZWZpbmVkKVxuICAgICAgICAgICAgLmF0dHIoJ3gnLCAnMCcpO1xuXG4gICAgICAgIHRzcGFucy5leGl0KCkucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgaXNPcHRpbWFsKGQpe1xuICAgICAgICByZXR1cm4gZC5kaXNwbGF5VmFsdWUoJ29wdGltYWwnKTtcbiAgICB9XG5cbiAgICByZWRyYXdFZGdlcygpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgZWRnZXNDb250YWluZXIgPSB0aGlzLm1haW5Hcm91cC5zZWxlY3RPckFwcGVuZCgnZy5lZGdlcycpO1xuICAgICAgICBpZihzZWxmLmNvbmZpZy5mb3JjZUZ1bGxFZGdlUmVkcmF3KXtcbiAgICAgICAgICAgIGVkZ2VzQ29udGFpbmVyLnNlbGVjdEFsbChcIipcIikucmVtb3ZlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZWRnZXMgPSBlZGdlc0NvbnRhaW5lci5zZWxlY3RBbGwoJy5lZGdlJykuZGF0YSh0aGlzLmRhdGEuZWRnZXMuZmlsdGVyKGU9PiFlLiRoaWRkZW4pLCAoZCxpKT0+IGQuJGlkKTtcbiAgICAgICAgZWRnZXMuZXhpdCgpLnJlbW92ZSgpO1xuICAgICAgICB2YXIgZWRnZXNFbnRlciA9IGVkZ2VzLmVudGVyKCkuYXBwZW5kKCdnJylcbiAgICAgICAgICAgIC5hdHRyKCdpZCcsIGQ9PidlZGdlLScrZC4kaWQpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZWRnZScpO1xuXG5cbiAgICAgICAgZWRnZXNFbnRlci5hcHBlbmQoJ3BhdGgnKTtcbiAgICAgICAgdmFyIGxhYmVsRW50ZXIgPSBlZGdlc0VudGVyLmFwcGVuZFNlbGVjdG9yKCdnLmxhYmVsLWdyb3VwJyk7XG4gICAgICAgIGxhYmVsRW50ZXIuYXBwZW5kKCd0ZXh0JykuYXR0cignY2xhc3MnLCAnbGFiZWwnKTtcbiAgICAgICAgdmFyIHBheW9mZkVudGVyID0gZWRnZXNFbnRlci5hcHBlbmQoJ3RleHQnKS5hdHRyKCdjbGFzcycsICdwYXlvZmYnKTtcbiAgICAgICAgdmFyIHByb2JhYmlsaXR5RW50ZXIgPSBlZGdlc0VudGVyLmFwcGVuZCgndGV4dCcpLmF0dHIoJ2NsYXNzJywgJ3Byb2JhYmlsaXR5Jyk7XG5cblxuICAgICAgICB2YXIgZWRnZXNNZXJnZSA9IGVkZ2VzRW50ZXIubWVyZ2UoZWRnZXMpO1xuXG5cbiAgICAgICAgdmFyIG9wdGltYWxDbGFzc05hbWUgPSAnb3B0aW1hbCc7XG4gICAgICAgIGVkZ2VzTWVyZ2UuY2xhc3NlZChvcHRpbWFsQ2xhc3NOYW1lLCAoZCk9PnNlbGYuaXNPcHRpbWFsKGQpKTtcblxuICAgICAgICB2YXIgZWRnZXNNZXJnZVQgPSBlZGdlc01lcmdlO1xuICAgICAgICBpZih0aGlzLnRyYW5zaXRpb24pe1xuICAgICAgICAgICAgZWRnZXNNZXJnZVQgPSBlZGdlc01lcmdlLnRyYW5zaXRpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVkZ2VzTWVyZ2VULnNlbGVjdCgncGF0aCcpXG4gICAgICAgICAgICAuYXR0cignZCcsIGQ9PiB0aGlzLmxheW91dC5lZGdlTGluZUQoZCkpXG4gICAgICAgICAgICAvLyAuYXR0cihcInN0cm9rZVwiLCBcImJsYWNrXCIpXG4gICAgICAgICAgICAvLyAuYXR0cihcInN0cm9rZS13aWR0aFwiLCAyKVxuICAgICAgICAgICAgLmF0dHIoXCJmaWxsXCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgLmF0dHIoXCJtYXJrZXItZW5kXCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgICAgICB2YXIgc3VmZml4ID0gZDMuc2VsZWN0KHRoaXMucGFyZW50Tm9kZSkuY2xhc3NlZCgnc2VsZWN0ZWQnKSA/ICctc2VsZWN0ZWQnIDogKHNlbGYuaXNPcHRpbWFsKGQpPyctb3B0aW1hbCc6JycpO1xuICAgICAgICAgICAgICAgIHJldHVybiBcInVybCgjYXJyb3dcIisgc3VmZml4K1wiKVwiXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIC5hdHRyKFwic2hhcGUtcmVuZGVyaW5nXCIsIFwib3B0aW1pemVRdWFsaXR5XCIpXG5cblxuICAgICAgICBlZGdlc01lcmdlLm9uKCdjbGljaycsIGQ9PntcbiAgICAgICAgICAgIHNlbGYuc2VsZWN0RWRnZShkLCB0cnVlKVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmxheW91dC5lZGdlTGFiZWxQb3NpdGlvbihsYWJlbEVudGVyKTtcbiAgICAgICAgZWRnZXNNZXJnZVQuc2VsZWN0KCd0ZXh0LmxhYmVsJykuZWFjaCh0aGlzLnVwZGF0ZVRleHRMaW5lcyk7XG4gICAgICAgIHZhciBsYWJlbE1lcmdlID0gZWRnZXNNZXJnZS5zZWxlY3QoJ2cubGFiZWwtZ3JvdXAnKTtcbiAgICAgICAgbGFiZWxNZXJnZS5jbGFzc2VkKCdzZC1oaWRkZW4nLCB0aGlzLmNvbmZpZy5oaWRlTGFiZWxzKTtcbiAgICAgICAgdmFyIGxhYmVsTWVyZ2VUID0gZWRnZXNNZXJnZVQuc2VsZWN0KCdnLmxhYmVsLWdyb3VwJyk7XG4gICAgICAgIHRoaXMubGF5b3V0LmVkZ2VMYWJlbFBvc2l0aW9uKGxhYmVsTWVyZ2VUKTtcbiAgICAgICAgICAgIC8vIC50ZXh0KGQ9PmQubmFtZSk7XG5cbiAgICAgICAgdmFyIHBheW9mZiA9IGVkZ2VzTWVyZ2Uuc2VsZWN0KCd0ZXh0LnBheW9mZicpO1xuXG4gICAgICAgIHZhciBwYXlvZmZUc3BhbnMgPSBwYXlvZmYuc2VsZWN0QWxsKCd0c3BhbicpLmRhdGEoZCA9PiB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IGQuZGlzcGxheVZhbHVlKCdwYXlvZmYnKTtcbiAgICAgICAgICAgIHJldHVybiBVdGlscy5pc0FycmF5KGl0ZW0pID8gaXRlbS5zbGljZSgwLCBNYXRoLm1pbihpdGVtLmxlbmd0aCwgc2VsZi5jb25maWcubWF4UGF5b2Zmc1RvRGlzcGxheSkpLm1hcChfPT5kKSA6IFtkXTtcbiAgICAgICAgfSk7XG4gICAgICAgIHBheW9mZlRzcGFucy5leGl0KCkucmVtb3ZlKCk7XG5cbiAgICAgICAgdmFyIHBheW9mZlRzcGFuc00gPSBwYXlvZmZUc3BhbnMuZW50ZXIoKS5hcHBlbmQoJ3RzcGFuJykubWVyZ2UocGF5b2ZmVHNwYW5zKTtcbiAgICAgICAgcGF5b2ZmVHNwYW5zTVxuICAgICAgICAvLyAuYXR0cignZG9taW5hbnQtYmFzZWxpbmUnLCAnaGFuZ2luZycpXG4gICAgICAgICAgICAuYXR0cignZHknLCAoZCxpKT0+aT4wID8gJzEuMWVtJzogdW5kZWZpbmVkKVxuICAgICAgICAgICAgLy8gLmF0dHIoJ3gnLCAnMCcpXG5cbiAgICAgICAgICAgIC8vIC5hdHRyKCdkb21pbmFudC1iYXNlbGluZScsICdoYW5naW5nJylcbiAgICAgICAgICAgIC5jbGFzc2VkKCduZWdhdGl2ZScsIChkLCBpKT0+IHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsID0gZC5kaXNwbGF5UGF5b2ZmKHVuZGVmaW5lZCwgaSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbCE9PW51bGwgJiYgdmFsPDA7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNsYXNzZWQoJ3NkLWhpZGRlbicsIHRoaXMuY29uZmlnLmhpZGVQYXlvZmZzKVxuICAgICAgICAgICAgLy8gLnRleHQoZD0+IGlzTmFOKGQucGF5b2ZmKSA/IGQucGF5b2ZmIDogc2VsZi5jb25maWcucGF5b2ZmTnVtYmVyRm9ybWF0dGVyKGQucGF5b2ZmKSlcbiAgICAgICAgICAgIC50ZXh0KChkLCBpKT0+e1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuY29uZmlnLnJhdyl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkLnBheW9mZltpXTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IGQuZGlzcGxheVZhbHVlKCdwYXlvZmYnKTtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbXMgPSBVdGlscy5pc0FycmF5KGl0ZW0pID8gaXRlbSA6IFtpdGVtXTtcblxuICAgICAgICAgICAgICAgIGxldCB2YWwgPSBpdGVtc1tpXTtcbiAgICAgICAgICAgICAgICBpZiAodmFsICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNOYU4odmFsKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYuY29uZmlnLnBheW9mZk51bWJlckZvcm1hdHRlcih2YWwsIGkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChVdGlscy5pc1N0cmluZyh2YWwpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGQucGF5b2ZmW2ldICE9PSBudWxsICYmICFpc05hTihkLnBheW9mZltpXSkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLmNvbmZpZy5wYXlvZmZOdW1iZXJGb3JtYXR0ZXIoZC5wYXlvZmZbaV0sIGkpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGQucGF5b2ZmW2ldO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBUb29sdGlwLmF0dGFjaChwYXlvZmZUc3BhbnNNLCAoZCwgaSk9PntcbiAgICAgICAgICAgIGlmKHNlbGYuY29uZmlnLnBheW9mZk5hbWVzLmxlbmd0aD5pICYmIHNlbGYuY29uZmlnLnBheW9mZk5hbWVzW2ldICE9PSBudWxsKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTE4bi50KCd0b29sdGlwLmVkZ2UucGF5b2ZmLm5hbWVkJyx7dmFsdWU6IGQucGF5b2ZmW2ldLCBudW1iZXI6IGkrMSwgbmFtZTogc2VsZi5jb25maWcucGF5b2ZmTmFtZXNbaV19KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGkxOG4udCgndG9vbHRpcC5lZGdlLnBheW9mZi5kZWZhdWx0Jyx7dmFsdWU6IGQucGF5b2ZmW2ldLCBudW1iZXI6IHNlbGYuY29uZmlnLm1heFBheW9mZnNUb0Rpc3BsYXkgPCAyID8gJycgOiBpKzF9KVxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgcGF5b2ZmVGV4dFQgPSBwYXlvZmY7XG4gICAgICAgIGlmKHRoaXMudHJhbnNpdGlvbil7XG4gICAgICAgICAgICBwYXlvZmZUZXh0VCA9IHBheW9mZi50cmFuc2l0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sYXlvdXQuZWRnZVBheW9mZlBvc2l0aW9uKHBheW9mZkVudGVyKTtcbiAgICAgICAgdGhpcy5sYXlvdXQuZWRnZVBheW9mZlBvc2l0aW9uKHBheW9mZlRleHRUKTtcblxuICAgICAgICBUb29sdGlwLmF0dGFjaChlZGdlc01lcmdlLnNlbGVjdCgndGV4dC5wcm9iYWJpbGl0eScpLCBkPT5pMThuLnQoJ3Rvb2x0aXAuZWRnZS5wcm9iYWJpbGl0eScse3ZhbHVlOiBkLnByb2JhYmlsaXR5PT09IHVuZGVmaW5lZCA/IGQuZGlzcGxheVByb2JhYmlsaXR5KCkgOiBkLnByb2JhYmlsaXR5fSkpO1xuXG4gICAgICAgIGVkZ2VzTWVyZ2Uuc2VsZWN0KCd0ZXh0LnByb2JhYmlsaXR5JylcbiAgICAgICAgICAgIC5jbGFzc2VkKCdzZC1oaWRkZW4nLCB0aGlzLmNvbmZpZy5oaWRlUHJvYmFiaWxpdGllcyk7XG4gICAgICAgIHZhciBwcm9iYWJpbGl0eU1lcmdlID0gZWRnZXNNZXJnZS5zZWxlY3QoJ3RleHQucHJvYmFiaWxpdHknKTtcbiAgICAgICAgcHJvYmFiaWxpdHlNZXJnZVxuICAgICAgICAgICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgJ2VuZCcpXG4gICAgICAgICAgICAudGV4dChkPT57XG4gICAgICAgICAgICAgICAgaWYodGhpcy5jb25maWcucmF3KXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQucHJvYmFiaWxpdHk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciB2YWwgPSBkLmRpc3BsYXlQcm9iYWJpbGl0eSgpO1xuXG4gICAgICAgICAgICAgICAgaWYodmFsIT09bnVsbCl7XG4gICAgICAgICAgICAgICAgICAgIGlmKCFpc05hTih2YWwpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLmNvbmZpZy5wcm9iYWJpbGl0eU51bWJlckZvcm1hdHRlcih2YWwpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmKFV0aWxzLmlzU3RyaW5nKHZhbCkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKGQucHJvYmFiaWxpdHkhPT1udWxsICYmICFpc05hTihkLnByb2JhYmlsaXR5KSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYuY29uZmlnLnByb2JhYmlsaXR5TnVtYmVyRm9ybWF0dGVyKGQucHJvYmFiaWxpdHkpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGQucHJvYmFiaWxpdHk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgdmFyIHByb2JhYmlsaXR5TWVyZ2VUID0gcHJvYmFiaWxpdHlNZXJnZTtcbiAgICAgICAgaWYodGhpcy50cmFuc2l0aW9uKXtcbiAgICAgICAgICAgIHByb2JhYmlsaXR5TWVyZ2VUID0gcHJvYmFiaWxpdHlNZXJnZS50cmFuc2l0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxheW91dC5lZGdlUHJvYmFiaWxpdHlQb3NpdGlvbihwcm9iYWJpbGl0eUVudGVyKTtcbiAgICAgICAgdGhpcy5sYXlvdXQuZWRnZVByb2JhYmlsaXR5UG9zaXRpb24ocHJvYmFiaWxpdHlNZXJnZVQpO1xuXG5cbiAgICAgICAgZWRnZXNDb250YWluZXIuc2VsZWN0QWxsKCcuZWRnZS4nK29wdGltYWxDbGFzc05hbWUpLnJhaXNlKCk7XG5cbiAgICAgICAgZWRnZXNNZXJnZS5vbignY29udGV4dG1lbnUnLCB0aGlzLmVkZ2VDb250ZXh0TWVudSk7XG4gICAgICAgIGVkZ2VzTWVyZ2Uub24oJ2RibGNsaWNrJywgdGhpcy5lZGdlQ29udGV4dE1lbnUpO1xuICAgICAgICBlZGdlc01lcmdlLmVhY2goZnVuY3Rpb24oZCwgaSl7XG4gICAgICAgICAgICB2YXIgZWxlbSA9IHRoaXM7XG4gICAgICAgICAgICB2YXIgbWMgPSBuZXcgSGFtbWVyLk1hbmFnZXIoZWxlbSk7XG4gICAgICAgICAgICBtYy5hZGQobmV3IEhhbW1lci5QcmVzcyh7XG4gICAgICAgICAgICAgICAgcG9pbnRlclR5cGU6IEhhbW1lci5QT0lOVEVSX1RPVUNIXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcmVkcmF3RmxvYXRpbmdUZXh0cygpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG5cbiAgICAgICAgdmFyIHRleHRzQ29udGFpbmVyID0gdGhpcy5tYWluR3JvdXAuc2VsZWN0T3JBcHBlbmQoJ2cuZmxvYXRpbmctdGV4dHMnKTtcbiAgICAgICAgdmFyIHRleHRzID0gdGV4dHNDb250YWluZXIuc2VsZWN0QWxsKCcuZmxvYXRpbmctdGV4dCcpLmRhdGEodGhpcy5kYXRhLnRleHRzLCAoZCxpKT0+IGQuJGlkKTtcbiAgICAgICAgdGV4dHMuZXhpdCgpLnJlbW92ZSgpO1xuICAgICAgICB2YXIgdGV4dHNFbnRlciA9IHRleHRzLmVudGVyKCkuYXBwZW5kU2VsZWN0b3IoJ2cuZmxvYXRpbmctdGV4dCcpXG4gICAgICAgICAgICAuYXR0cignaWQnLCBkPT4ndGV4dC0nK2QuJGlkKTtcblxuXG4gICAgICAgIHZhciByZWN0V2lkdGggPSA0MDtcbiAgICAgICAgdmFyIHJlY3RIZWlnaHQgPSAyMDtcblxuICAgICAgICB0ZXh0c0VudGVyLmFwcGVuZCgncmVjdCcpLmF0dHIoJ3gnLCAtNSkuYXR0cigneScsIC0xNikuYXR0cignZmlsbC1vcGFjaXR5JywgMCk7XG4gICAgICAgIHRleHRzRW50ZXIuYXBwZW5kKCd0ZXh0Jyk7XG5cbiAgICAgICAgdmFyIHRleHRzTWVyZ2UgPSB0ZXh0c0VudGVyLm1lcmdlKHRleHRzKTtcbiAgICAgICAgdmFyIHRleHRzTWVyZ2VUID0gdGV4dHNNZXJnZTtcbiAgICAgICAgaWYodGhpcy50cmFuc2l0aW9uKXtcbiAgICAgICAgICAgIHRleHRzTWVyZ2VUID0gdGV4dHNNZXJnZS50cmFuc2l0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0ZXh0c01lcmdlVC5hdHRyKCd0cmFuc2Zvcm0nLCBkPT4ndHJhbnNsYXRlKCcgKyBkLmxvY2F0aW9uLnggKyAnICAnICsgZC5sb2NhdGlvbi55ICsgJyknKTtcblxuICAgICAgICB2YXIgdHNwYW5zID0gdGV4dHNNZXJnZS5zZWxlY3QoJ3RleHQnKS5zZWxlY3RBbGwoJ3RzcGFuJykuZGF0YShkPT5kLnZhbHVlID8gZC52YWx1ZS5zcGxpdCgnXFxuJykgOiBbXSk7XG5cbiAgICAgICAgdHNwYW5zLmVudGVyKCkuYXBwZW5kKCd0c3BhbicpXG4gICAgICAgICAgICAubWVyZ2UodHNwYW5zKVxuICAgICAgICAgICAgLmh0bWwobD0+QXBwVXRpbHMucmVwbGFjZVVybHMoQXBwVXRpbHMuZXNjYXBlSHRtbChsKSkpXG4gICAgICAgICAgICAuYXR0cignZHknLCAoZCxpKT0+aT4wID8gJzEuMWVtJzogdW5kZWZpbmVkKVxuICAgICAgICAgICAgLmF0dHIoJ3gnLCAnMCcpO1xuXG4gICAgICAgIHRzcGFucy5leGl0KCkucmVtb3ZlKCk7XG4gICAgICAgIHRleHRzTWVyZ2UuY2xhc3NlZCgnc2QtZW1wdHknLCBkPT4hZC52YWx1ZSB8fCAhZC52YWx1ZS50cmltKCkpO1xuICAgICAgICB0ZXh0c01lcmdlLnNlbGVjdCgncmVjdCcpLmF0dHIoJ3dpZHRoJywgcmVjdFdpZHRoKS5hdHRyKCdoZWlnaHQnLCByZWN0SGVpZ2h0KTtcblxuICAgICAgICB0ZXh0c01lcmdlLmVhY2goZnVuY3Rpb24oZCl7XG4gICAgICAgICAgICBpZighZC52YWx1ZSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGJiID0gZDMuc2VsZWN0KHRoaXMpLnNlbGVjdCgndGV4dCcpLm5vZGUoKS5nZXRCQm94KCk7XG4gICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5zZWxlY3QoJ3JlY3QnKVxuICAgICAgICAgICAgICAgLmF0dHIoJ3knLCBiYi55LTUpXG4gICAgICAgICAgICAgICAuYXR0cignd2lkdGgnLCBNYXRoLm1heChiYi53aWR0aCsxMCwgcmVjdFdpZHRoKSlcbiAgICAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCBNYXRoLm1heChiYi5oZWlnaHQrMTAsIHJlY3RIZWlnaHQpKVxuICAgICAgICB9KTtcblxuICAgICAgICBpZih0aGlzLnRleHREcmFnSGFuZGxlcil7XG4gICAgICAgICAgICB0ZXh0c01lcmdlLmNhbGwodGhpcy50ZXh0RHJhZ0hhbmRsZXIuZHJhZyk7XG4gICAgICAgIH1cbiAgICAgICAgdGV4dHNNZXJnZS5vbignY29udGV4dG1lbnUnLCB0aGlzLnRleHRDb250ZXh0TWVudSk7XG4gICAgICAgIHRleHRzTWVyZ2Uub24oJ2RibGNsaWNrJywgdGhpcy50ZXh0Q29udGV4dE1lbnUpO1xuICAgICAgICB0ZXh0c01lcmdlLmVhY2goZnVuY3Rpb24oZCwgaSl7XG4gICAgICAgICAgICB2YXIgZWxlbSA9IHRoaXM7XG4gICAgICAgICAgICB2YXIgbWMgPSBuZXcgSGFtbWVyLk1hbmFnZXIoZWxlbSk7XG4gICAgICAgICAgICBtYy5hZGQobmV3IEhhbW1lci5QcmVzcyh7XG4gICAgICAgICAgICAgICAgcG9pbnRlclR5cGU6ICd0b3VjaCdcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSlcblxuICAgIH1cblxuICAgIHVwZGF0ZVZhbGlkYXRpb25NZXNzYWdlcygpIHtcbiAgICAgICAgdmFyIG5vZGVzID0gdGhpcy5tYWluR3JvdXAuc2VsZWN0QWxsKCcubm9kZScpO1xuICAgICAgICBub2Rlcy5jbGFzc2VkKCdlcnJvcicsIGZhbHNlKTtcblxuICAgICAgICB0aGlzLmRhdGEudmFsaWRhdGlvblJlc3VsdHMuZm9yRWFjaCh2YWxpZGF0aW9uUmVzdWx0PT57XG4gICAgICAgICAgICBpZih2YWxpZGF0aW9uUmVzdWx0LmlzVmFsaWQoKSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh2YWxpZGF0aW9uUmVzdWx0Lm9iamVjdElkVG9FcnJvcikuZm9yRWFjaChpZD0+e1xuICAgICAgICAgICAgICAgIHZhciBlcnJvcnMgPSB2YWxpZGF0aW9uUmVzdWx0Lm9iamVjdElkVG9FcnJvcltpZF07XG4gICAgICAgICAgICAgICAgdmFyIG5vZGVTZWxlY3Rpb24gPSB0aGlzLmdldE5vZGVEM1NlbGVjdGlvbkJ5SWQoaWQpO1xuICAgICAgICAgICAgICAgIG5vZGVTZWxlY3Rpb24uY2xhc3NlZCgnZXJyb3InLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB2YXIgdG9vbHRpcEh0bWwgPSAnJztcbiAgICAgICAgICAgICAgICBlcnJvcnMuZm9yRWFjaChlPT57XG4gICAgICAgICAgICAgICAgICAgIGlmKHRvb2x0aXBIdG1sKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXBIdG1sKz0nPGJyLz4nXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcEh0bWwrPUFwcFV0aWxzLmdldFZhbGlkYXRpb25NZXNzYWdlKGUpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgVG9vbHRpcC5hdHRhY2gobm9kZVNlbGVjdGlvbi5zZWxlY3QoJy5lcnJvci1pbmRpY2F0b3InKSwgdG9vbHRpcEh0bWwpO1xuXG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgaW5pdEVkZ2VNYXJrZXJzKCkge1xuICAgICAgICB2YXIgZGVmcyA9IHRoaXMuc3ZnLmFwcGVuZChcInN2ZzpkZWZzXCIpO1xuXG4gICAgICAgIHRoaXMuaW5pdEFycm93TWFya2VyKFwiYXJyb3dcIik7XG4gICAgICAgIHRoaXMuaW5pdEFycm93TWFya2VyKFwiYXJyb3ctb3B0aW1hbFwiKTtcbiAgICAgICAgdGhpcy5pbml0QXJyb3dNYXJrZXIoXCJhcnJvdy1zZWxlY3RlZFwiKTtcbiAgICB9XG5cbiAgICBpbml0QXJyb3dNYXJrZXIoaWQpIHtcblxuICAgICAgICB2YXIgZGVmcyA9IHRoaXMuc3ZnLnNlbGVjdChcImRlZnNcIik7XG4gICAgICAgIGRlZnMuYXBwZW5kKFwibWFya2VyXCIpXG4gICAgICAgICAgICAuYXR0cihcImlkXCIsaWQpXG4gICAgICAgICAgICAuYXR0cihcInZpZXdCb3hcIixcIjAgLTUgMTAgMTBcIilcbiAgICAgICAgICAgIC5hdHRyKFwicmVmWFwiLDUpXG4gICAgICAgICAgICAuYXR0cihcInJlZllcIiwwKVxuICAgICAgICAgICAgLmF0dHIoXCJtYXJrZXJXaWR0aFwiLDQpXG4gICAgICAgICAgICAuYXR0cihcIm1hcmtlckhlaWdodFwiLDQpXG4gICAgICAgICAgICAuYXR0cihcIm9yaWVudFwiLFwiYXV0b1wiKVxuICAgICAgICAgICAgLmFwcGVuZChcInBhdGhcIilcbiAgICAgICAgICAgIC5hdHRyKFwiZFwiLCBcIk0wLC01TDEwLDBMMCw1XCIpXG4gICAgICAgICAgICAuYXR0cihcImNsYXNzXCIsXCJhcnJvd0hlYWRcIik7XG4gICAgfVxuXG4gICAgdXBkYXRlQnJ1c2hFeHRlbnQoKSB7XG4gICAgICAgIHZhciBzZWxmID10aGlzO1xuICAgICAgICB0aGlzLmJydXNoLmV4dGVudChbWzAsIDBdLCBbc2VsZi5zdmcuYXR0cignd2lkdGgnKSwgc2VsZi5zdmcuYXR0cignaGVpZ2h0JyldXSk7XG4gICAgICAgIHRoaXMuYnJ1c2hDb250YWluZXIuY2FsbCh0aGlzLmJydXNoKTtcbiAgICB9XG4gICAgaW5pdEJydXNoKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgdmFyIGJydXNoQ29udGFpbmVyID0gc2VsZi5icnVzaENvbnRhaW5lciA9IHRoaXMuYnJ1c2hDb250YWluZXI9IHRoaXMuc3ZnLnNlbGVjdE9ySW5zZXJ0KFwiZy5icnVzaFwiLCBcIjpmaXJzdC1jaGlsZFwiKVxuICAgICAgICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcImJydXNoXCIpO1xuXG4gICAgICAgIHZhciBicnVzaCA9IHRoaXMuYnJ1c2ggPSBkMy5icnVzaCgpXG4gICAgICAgICAgICAub24oXCJzdGFydFwiLCBicnVzaHN0YXJ0KVxuICAgICAgICAgICAgLm9uKFwiYnJ1c2hcIiwgYnJ1c2htb3ZlKVxuICAgICAgICAgICAgLm9uKFwiZW5kXCIsIGJydXNoZW5kKTtcblxuXG5cbiAgICAgICAgdGhpcy51cGRhdGVCcnVzaEV4dGVudCgpO1xuXG4gICAgICAgIGJydXNoQ29udGFpbmVyLnNlbGVjdCgnLm92ZXJsYXknKS5vbihcIm1vdXNlbW92ZS5lZGdlU2VsZWN0aW9uXCIsIG1vdXNlbW92ZWQpO1xuICAgICAgICBmdW5jdGlvbiBtb3VzZW1vdmVkKCkge1xuICAgICAgICAgICAgdmFyIG0gPSBkMy5tb3VzZSh0aGlzKTtcbiAgICAgICAgICAgIHZhciBtZ3QgPSBzZWxmLmdldE1haW5Hcm91cFRyYW5zbGF0aW9uKCk7XG4gICAgICAgICAgICB2YXIgbWFyZ2luID0gMTA7XG5cbiAgICAgICAgICAgIHZhciBjbG9zZXN0ID0gW251bGwsIDk5OTk5OTk5OV07XG4gICAgICAgICAgICB2YXIgY2xvc2VFZGdlcyA9IFtdO1xuICAgICAgICAgICAgc2VsZi5tYWluR3JvdXAuc2VsZWN0QWxsKCcuZWRnZScpLmVhY2goZnVuY3Rpb24oZCl7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGVjdGlvbiA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb24uY2xhc3NlZCgnc2QtaG92ZXInLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgdmFyIHBhdGhOb2RlID0gc2VsZWN0aW9uLnNlbGVjdCgncGF0aCcpLm5vZGUoKTtcbiAgICAgICAgICAgICAgICB2YXIgYiA9IHBhdGhOb2RlLmdldEJCb3goKTtcbiAgICAgICAgICAgICAgICBpZihiLngrbWd0WzBdIDw9bVswXSAmJiBiLngrYi53aWR0aCttZ3RbMF0gPj0gbVswXSAmJlxuICAgICAgICAgICAgICAgICAgIGIueSttZ3RbMV0tbWFyZ2luIDw9bVsxXSAmJiBiLnkrYi5oZWlnaHQrbWd0WzFdK21hcmdpbiA+PSBtWzFdKXtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgY3AgPSBBcHBVdGlscy5jbG9zZXN0UG9pbnQocGF0aE5vZGUsIFttWzBdLW1ndFswXSwgbVsxXS1tZ3RbMV1dKTtcbiAgICAgICAgICAgICAgICAgICAgaWYoY3AuZGlzdGFuY2UgPCBtYXJnaW4gJiYgY3AuZGlzdGFuY2U8Y2xvc2VzdFsxXSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0ID0gW3NlbGVjdGlvbiwgY3AuZGlzdGFuY2VdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgc2VsZi5ob3ZlcmVkRWRnZSA9IG51bGw7XG4gICAgICAgICAgICBpZihjbG9zZXN0WzBdKXtcbiAgICAgICAgICAgICAgICBjbG9zZXN0WzBdLmNsYXNzZWQoJ3NkLWhvdmVyJywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgc2VsZi5ob3ZlcmVkRWRnZSA9IGNsb3Nlc3RbMF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGJydXNoc3RhcnQoKSB7XG4gICAgICAgICAgICBpZiAoIWQzLmV2ZW50LnNlbGVjdGlvbikgcmV0dXJuO1xuICAgICAgICAgICAgaWYoc2VsZi5ob3ZlcmVkRWRnZSl7XG4gICAgICAgICAgICAgICAgc2VsZi5zZWxlY3RFZGdlKHNlbGYuaG92ZXJlZEVkZ2UuZGF0dW0oKSwgdHJ1ZSlcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHNlbGYuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIENvbnRleHRNZW51LmhpZGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEhpZ2hsaWdodCB0aGUgc2VsZWN0ZWQgbm9kZXMuXG4gICAgICAgIGZ1bmN0aW9uIGJydXNobW92ZSgpIHtcbiAgICAgICAgICAgIHZhciBzID0gZDMuZXZlbnQuc2VsZWN0aW9uO1xuICAgICAgICAgICAgaWYoIXMpcmV0dXJuO1xuXG4gICAgICAgICAgICBzZWxmLm1haW5Hcm91cC5zZWxlY3RBbGwoXCIubm9kZVwiKS5jbGFzc2VkKCdzZWxlY3RlZCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1haW5Hcm91cFRyYW5zbGF0aW9uID0gc2VsZi5nZXRNYWluR3JvdXBUcmFuc2xhdGlvbigpO1xuICAgICAgICAgICAgICAgIHZhciB4ID0gZC5sb2NhdGlvbi54K21haW5Hcm91cFRyYW5zbGF0aW9uWzBdO1xuICAgICAgICAgICAgICAgIHZhciB5ID0gZC5sb2NhdGlvbi55K21haW5Hcm91cFRyYW5zbGF0aW9uWzFdO1xuICAgICAgICAgICAgICAgIHZhciBub2RlU2l6ZSA9IHNlbGYuY29uZmlnLmxheW91dC5ub2RlU2l6ZTtcbiAgICAgICAgICAgICAgICB2YXIgb2Zmc2V0ID0gbm9kZVNpemUqMC4yNTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc1swXVswXSA8PSB4K29mZnNldCAmJiB4LW9mZnNldCA8PSBzWzFdWzBdXG4gICAgICAgICAgICAgICAgICAgICYmIHNbMF1bMV0gPD0geStvZmZzZXQgJiYgeS1vZmZzZXQgPD0gc1sxXVsxXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIElmIHRoZSBicnVzaCBpcyBlbXB0eSwgc2VsZWN0IGFsbCBjaXJjbGVzLlxuICAgICAgICBmdW5jdGlvbiBicnVzaGVuZCgpIHtcbiAgICAgICAgICAgIGlmICghZDMuZXZlbnQuc2VsZWN0aW9uKSByZXR1cm47XG4gICAgICAgICAgICBicnVzaC5tb3ZlKGJydXNoQ29udGFpbmVyLCBudWxsKTtcblxuICAgICAgICAgICAgdmFyIHNlbGVjdGVkTm9kZXMgPSBzZWxmLmdldFNlbGVjdGVkTm9kZXMoKTtcbiAgICAgICAgICAgIGlmKHNlbGVjdGVkTm9kZXMgJiYgc2VsZWN0ZWROb2Rlcy5sZW5ndGggPT09IDEpe1xuICAgICAgICAgICAgICAgIHNlbGYuc2VsZWN0Tm9kZShzZWxlY3RlZE5vZGVzWzBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGlmICghZDMuZXZlbnQuc2VsZWN0aW9uKSBzZWxmLm1haW5Hcm91cC5zZWxlY3RBbGwoXCIuc2VsZWN0ZWRcIikuY2xhc3NlZCgnc2VsZWN0ZWQnLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkaXNhYmxlQnJ1c2goKXtcbiAgICAgICAgaWYoIXRoaXMuYnJ1c2hEaXNhYmxlZCl7XG4gICAgICAgICAgICBBcHBVdGlscy5ncm93bChpMThuLnQoJ2dyb3dsLmJydXNoRGlzYWJsZWQnKSwgJ2luZm8nLCAnbGVmdCcpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5icnVzaERpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5icnVzaENvbnRhaW5lci5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICBlbmFibGVCcnVzaCgpe1xuICAgICAgICBpZih0aGlzLmJydXNoRGlzYWJsZWQpe1xuICAgICAgICAgICAgQXBwVXRpbHMuZ3Jvd2woaTE4bi50KCdncm93bC5icnVzaEVuYWJsZWQnKSwgJ2luZm8nLCAnbGVmdCcpXG4gICAgICAgICAgICB0aGlzLmluaXRCcnVzaCgpO1xuICAgICAgICAgICAgdGhpcy5icnVzaERpc2FibGVkID0gZmFsc2U7XG4gICAgICAgIH1cblxuXG4gICAgfVxuXG4gICAgZ2V0TWFpbkdyb3VwVHJhbnNsYXRpb24oaW52ZXJ0KSB7XG4gICAgICAgIHZhciB0cmFuc2xhdGlvbiA9IEFwcFV0aWxzLmdldFRyYW5zbGF0aW9uKHRoaXMubWFpbkdyb3VwLmF0dHIoXCJ0cmFuc2Zvcm1cIikpO1xuICAgICAgICBpZihpbnZlcnQpe1xuICAgICAgICAgICAgdHJhbnNsYXRpb25bMF0gPSAtdHJhbnNsYXRpb25bMF07XG4gICAgICAgICAgICB0cmFuc2xhdGlvblsxXSA9IC10cmFuc2xhdGlvblsxXVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cmFuc2xhdGlvbjtcbiAgICB9XG5cbiAgICBpbml0Tm9kZUNvbnRleHRNZW51KCkge1xuICAgICAgICB0aGlzLm5vZGVDb250ZXh0TWVudSA9IG5ldyBOb2RlQ29udGV4dE1lbnUodGhpcywgdGhpcy5jb25maWcub3BlcmF0aW9uc0Zvck9iamVjdCk7XG4gICAgfVxuXG4gICAgaW5pdEVkZ2VDb250ZXh0TWVudSgpIHtcbiAgICAgICAgdGhpcy5lZGdlQ29udGV4dE1lbnUgPSBuZXcgRWRnZUNvbnRleHRNZW51KHRoaXMpO1xuICAgIH1cblxuICAgIGluaXRUZXh0Q29udGV4dE1lbnUoKSB7XG4gICAgICAgIHRoaXMudGV4dENvbnRleHRNZW51ID0gbmV3IFRleHRDb250ZXh0TWVudSh0aGlzKTtcbiAgICB9XG5cblxuXG4gICAgaW5pdE1haW5Db250ZXh0TWVudSgpIHtcbiAgICAgICAgdGhpcy5tYWluQ29udGV4dE1lbnUgPSBuZXcgTWFpbkNvbnRleHRNZW51KHRoaXMpO1xuICAgICAgICB0aGlzLnN2Zy5vbignY29udGV4dG1lbnUnLHRoaXMubWFpbkNvbnRleHRNZW51KTtcbiAgICAgICAgdGhpcy5zdmcub24oJ2RibGNsaWNrJyx0aGlzLm1haW5Db250ZXh0TWVudSk7XG4gICAgfVxuXG4gICAgYWRkVGV4dCh0ZXh0KXtcbiAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSgpO1xuICAgICAgICB0aGlzLmRhdGEuYWRkVGV4dCh0ZXh0KTtcbiAgICAgICAgdGhpcy5yZWRyYXcoKTtcbiAgICAgICAgdGhpcy5zZWxlY3RUZXh0KHRleHQpO1xuICAgIH1cblxuICAgIGFkZE5vZGUobm9kZSwgcGFyZW50LCByZWRyYXc9ZmFsc2Upe1xuICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKCk7XG4gICAgICAgIHRoaXMuZGF0YS5hZGROb2RlKG5vZGUsIHBhcmVudCk7XG4gICAgICAgIHRoaXMucmVkcmF3KHRydWUpO1xuICAgICAgICB0aGlzLmxheW91dC51cGRhdGUobm9kZSk7XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIH1cblxuICAgIGFkZERlY2lzaW9uTm9kZShwYXJlbnQpe1xuICAgICAgICB2YXIgbmV3Tm9kZSA9IG5ldyBtb2RlbC5EZWNpc2lvbk5vZGUodGhpcy5sYXlvdXQuZ2V0TmV3Q2hpbGRMb2NhdGlvbihwYXJlbnQpKTtcbiAgICAgICAgdGhpcy5hZGROb2RlKG5ld05vZGUsIHBhcmVudClcbiAgICB9XG4gICAgYWRkQ2hhbmNlTm9kZShwYXJlbnQpe1xuICAgICAgICB2YXIgbmV3Tm9kZSA9IG5ldyBtb2RlbC5DaGFuY2VOb2RlKHRoaXMubGF5b3V0LmdldE5ld0NoaWxkTG9jYXRpb24ocGFyZW50KSk7XG4gICAgICAgIHRoaXMuYWRkTm9kZShuZXdOb2RlLCBwYXJlbnQpXG4gICAgfVxuICAgIGFkZFRlcm1pbmFsTm9kZShwYXJlbnQpe1xuICAgICAgICB2YXIgbmV3Tm9kZSA9IG5ldyBtb2RlbC5UZXJtaW5hbE5vZGUodGhpcy5sYXlvdXQuZ2V0TmV3Q2hpbGRMb2NhdGlvbihwYXJlbnQpKTtcbiAgICAgICAgdGhpcy5hZGROb2RlKG5ld05vZGUsIHBhcmVudClcbiAgICB9XG5cbiAgICBpbmplY3ROb2RlKG5vZGUsIGVkZ2Upe1xuICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKCk7XG4gICAgICAgIHRoaXMuZGF0YS5pbmplY3ROb2RlKG5vZGUsIGVkZ2UpO1xuICAgICAgICB0aGlzLnJlZHJhdygpO1xuICAgICAgICB0aGlzLmxheW91dC51cGRhdGUobm9kZSk7XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIH1cblxuICAgIGluamVjdERlY2lzaW9uTm9kZShlZGdlKXtcbiAgICAgICAgdmFyIG5ld05vZGUgPSBuZXcgbW9kZWwuRGVjaXNpb25Ob2RlKHRoaXMubGF5b3V0LmdldEluamVjdGVkTm9kZUxvY2F0aW9uKGVkZ2UpKTtcbiAgICAgICAgdGhpcy5pbmplY3ROb2RlKG5ld05vZGUsIGVkZ2UpO1xuXG4gICAgfVxuXG4gICAgaW5qZWN0Q2hhbmNlTm9kZShlZGdlKXtcbiAgICAgICAgdmFyIG5ld05vZGUgPSBuZXcgbW9kZWwuQ2hhbmNlTm9kZSh0aGlzLmxheW91dC5nZXRJbmplY3RlZE5vZGVMb2NhdGlvbihlZGdlKSk7XG4gICAgICAgIHRoaXMuaW5qZWN0Tm9kZShuZXdOb2RlLCBlZGdlKTtcbiAgICB9XG5cbiAgICByZW1vdmVOb2RlKG5vZGUpIHtcbiAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSgpO1xuICAgICAgICB0aGlzLmRhdGEucmVtb3ZlTm9kZShub2RlKTtcblxuXG4gICAgICAgIGlmKCF0aGlzLmxheW91dC5pc01hbnVhbExheW91dCgpKXtcbiAgICAgICAgICAgIHRoaXMubGF5b3V0LnVwZGF0ZSgpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMucmVkcmF3KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW1vdmVTZWxlY3RlZE5vZGVzKCkge1xuICAgICAgICB2YXIgc2VsZWN0ZWROb2RlcyA9IHRoaXMuZ2V0U2VsZWN0ZWROb2RlcygpO1xuICAgICAgICBpZighc2VsZWN0ZWROb2Rlcy5sZW5ndGgpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoKTtcbiAgICAgICAgdGhpcy5kYXRhLnJlbW92ZU5vZGVzKHNlbGVjdGVkTm9kZXMpO1xuICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgIHRoaXMucmVkcmF3KCk7XG4gICAgICAgIHRoaXMubGF5b3V0LnVwZGF0ZSgpO1xuICAgIH1cblxuICAgIHJlbW92ZVNlbGVjdGVkVGV4dHMoKXtcbiAgICAgICAgdmFyIHNlbGVjdGVkVGV4dHMgPSB0aGlzLmdldFNlbGVjdGVkVGV4dHMoKTtcblxuICAgICAgICBpZighc2VsZWN0ZWRUZXh0cy5sZW5ndGgpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoKTtcbiAgICAgICAgdGhpcy5kYXRhLnJlbW92ZVRleHRzKHNlbGVjdGVkVGV4dHMpO1xuICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgIHRoaXMucmVkcmF3KCk7XG4gICAgfVxuXG4gICAgY29weU5vZGUoZCwgbm90Q2xlYXJQcmV2U2VsZWN0aW9uKSB7XG4gICAgICAgIHZhciBjbG9uZSA9IHRoaXMuZGF0YS5jbG9uZVN1YnRyZWUoZCk7XG4gICAgICAgIGlmKG5vdENsZWFyUHJldlNlbGVjdGlvbil7XG4gICAgICAgICAgICBpZighdGhpcy5jb3BpZWROb2Rlcyl7XG4gICAgICAgICAgICAgICAgdGhpcy5jb3BpZWROb2Rlcz1bXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY29waWVkTm9kZXMucHVzaChjbG9uZSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5jb3BpZWROb2RlcyA9IFtjbG9uZV07XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGN1dE5vZGUoZCkge1xuICAgICAgICB0aGlzLmNvcHlOb2RlKGQpO1xuICAgICAgICB0aGlzLnJlbW92ZU5vZGUoZCk7XG4gICAgfVxuXG4gICAgY3V0U2VsZWN0ZWROb2Rlcygpe1xuICAgICAgICB2YXIgc2VsZWN0ZWROb2RlcyA9IHRoaXMuZ2V0U2VsZWN0ZWROb2RlcygpO1xuICAgICAgICB2YXIgc2VsZWN0ZWRSb290cyA9IHRoaXMuZGF0YS5maW5kU3VidHJlZVJvb3RzKHNlbGVjdGVkTm9kZXMpO1xuICAgICAgICB0aGlzLmNvcHlOb2RlcyhzZWxlY3RlZFJvb3RzKTtcbiAgICAgICAgdGhpcy5yZW1vdmVTZWxlY3RlZE5vZGVzKCk7XG4gICAgfVxuXG4gICAgY29weVNlbGVjdGVkTm9kZXMoKSB7XG4gICAgICAgIHZhciBzZWxmO1xuICAgICAgICB2YXIgc2VsZWN0ZWROb2RlcyA9IHRoaXMuZ2V0U2VsZWN0ZWROb2RlcygpO1xuXG4gICAgICAgIHZhciBzZWxlY3RlZFJvb3RzID0gdGhpcy5kYXRhLmZpbmRTdWJ0cmVlUm9vdHMoc2VsZWN0ZWROb2Rlcyk7XG4gICAgICAgIHRoaXMuY29weU5vZGVzKHNlbGVjdGVkUm9vdHMpO1xuXG5cbiAgICB9XG5cbiAgICBjb3B5Tm9kZXMobm9kZXMpe1xuICAgICAgICB0aGlzLmNvcGllZE5vZGVzID0gbm9kZXMubWFwKGQ9PnRoaXMuZGF0YS5jbG9uZVN1YnRyZWUoZCkpO1xuICAgIH1cblxuXG5cbiAgICBwYXN0ZVRvTm9kZShub2RlKSB7XG4gICAgICAgIGlmKCF0aGlzLmNvcGllZE5vZGVzIHx8ICF0aGlzLmNvcGllZE5vZGVzLmxlbmd0aCl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSgpO1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHNlbGYuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgdmFyIG5vZGVzVG9BdHRhY2ggPSB0aGlzLmNvcGllZE5vZGVzO1xuICAgICAgICBzZWxmLmNvcHlOb2Rlcyh0aGlzLmNvcGllZE5vZGVzKTtcbiAgICAgICAgbm9kZXNUb0F0dGFjaC5mb3JFYWNoKHRvQXR0YWNoPT57XG4gICAgICAgICAgICB2YXIgYXR0YWNoZWQgPSB0aGlzLmRhdGEuYXR0YWNoU3VidHJlZSh0b0F0dGFjaCwgbm9kZSkuY2hpbGROb2RlO1xuICAgICAgICAgICAgaWYoYXR0YWNoZWQuZm9sZGVkKXtcbiAgICAgICAgICAgICAgICBzZWxmLmZvbGRTdWJ0cmVlKGF0dGFjaGVkLCBhdHRhY2hlZC5mb2xkZWQsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBsb2NhdGlvbiA9IHNlbGYubGF5b3V0LmdldE5ld0NoaWxkTG9jYXRpb24obm9kZSk7XG4gICAgICAgICAgICBhdHRhY2hlZC5tb3ZlVG8obG9jYXRpb24ueCwgbG9jYXRpb24ueSwgdHJ1ZSk7XG4gICAgICAgICAgICBzZWxmLmxheW91dC5tb3ZlTm9kZVRvRW1wdHlQbGFjZShhdHRhY2hlZCwgZmFsc2UpO1xuICAgICAgICAgICAgc2VsZi5sYXlvdXQuZml0Tm9kZXNJblBsb3R0aW5nUmVnaW9uKHRoaXMuZGF0YS5nZXRBbGxEZXNjZW5kYW50Tm9kZXMoYXR0YWNoZWQpKTtcblxuICAgICAgICAgICAgc2VsZi5zZWxlY3RTdWJUcmVlKGF0dGFjaGVkLCBmYWxzZSwgbm9kZXNUb0F0dGFjaC5sZW5ndGg+MSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmKG5vZGUuZm9sZGVkKXtcbiAgICAgICAgICAgIHNlbGYuZm9sZFN1YnRyZWUobm9kZSwgbm9kZS5mb2xkZWQsIGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHNlbGYucmVkcmF3KCk7XG4gICAgICAgICAgICBzZWxmLmxheW91dC51cGRhdGUoKTtcbiAgICAgICAgfSwxMClcblxuICAgIH1cblxuICAgIHBhc3RlVG9OZXdMb2NhdGlvbihwb2ludCkge1xuICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKCk7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgc2VsZi5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICB2YXIgbm9kZXNUb0F0dGFjaCA9IHRoaXMuY29waWVkTm9kZXM7XG4gICAgICAgIHNlbGYuY29weU5vZGVzKHRoaXMuY29waWVkTm9kZXMpO1xuICAgICAgICBub2Rlc1RvQXR0YWNoLmZvckVhY2godG9BdHRhY2g9PiB7XG4gICAgICAgICAgICB2YXIgYXR0YWNoZWQgPSB0aGlzLmRhdGEuYXR0YWNoU3VidHJlZSh0b0F0dGFjaCk7XG4gICAgICAgICAgICBpZihhdHRhY2hlZC5mb2xkZWQpe1xuICAgICAgICAgICAgICAgIHNlbGYuZm9sZFN1YnRyZWUoYXR0YWNoZWQsIGF0dGFjaGVkLmZvbGRlZCwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXR0YWNoZWQubW92ZVRvKHBvaW50LngsIHBvaW50LnksIHRydWUpO1xuICAgICAgICAgICAgc2VsZi5sYXlvdXQubW92ZU5vZGVUb0VtcHR5UGxhY2UoYXR0YWNoZWQsIGZhbHNlKTtcbiAgICAgICAgICAgIHNlbGYubGF5b3V0LmZpdE5vZGVzSW5QbG90dGluZ1JlZ2lvbih0aGlzLmRhdGEuZ2V0QWxsRGVzY2VuZGFudE5vZGVzKGF0dGFjaGVkKSk7XG5cbiAgICAgICAgICAgIHNlbGYuc2VsZWN0U3ViVHJlZShhdHRhY2hlZCwgZmFsc2UsIG5vZGVzVG9BdHRhY2gubGVuZ3RoPjEpO1xuICAgICAgICB9KTtcblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBzZWxmLnJlZHJhdygpO1xuICAgICAgICAgICAgc2VsZi5sYXlvdXQudXBkYXRlKCk7XG4gICAgICAgIH0sMTApXG5cbiAgICB9XG5cbiAgICBjb252ZXJ0Tm9kZShub2RlLCB0eXBlVG9Db252ZXJ0VG8pe1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoKTtcbiAgICAgICAgdGhpcy5kYXRhLmNvbnZlcnROb2RlKG5vZGUsIHR5cGVUb0NvbnZlcnRUbyk7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHNlbGYucmVkcmF3KHRydWUpO1xuICAgICAgICB9LDEwKVxuICAgIH1cblxuICAgIHBlcmZvcm1PcGVyYXRpb24ob2JqZWN0LCBvcGVyYXRpb24pe1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoKTtcbiAgICAgICAgb3BlcmF0aW9uLnBlcmZvcm0ob2JqZWN0KTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgc2VsZi5yZWRyYXcoKTtcbiAgICAgICAgICAgIHNlbGYubGF5b3V0LnVwZGF0ZSgpO1xuICAgICAgICB9LDEwKVxuICAgIH1cblxuICAgIGZvbGRTdWJ0cmVlKG5vZGUsIGZvbGQgPSB0cnVlLCByZWRyYXc9dHJ1ZSl7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgbm9kZS5mb2xkZWQgPSBmb2xkO1xuXG4gICAgICAgIHRoaXMuZGF0YS5nZXRBbGxEZXNjZW5kYW50Tm9kZXMobm9kZSkuZm9yRWFjaChuPT57XG4gICAgICAgICAgICBuLiRoaWRkZW4gPSBmb2xkO1xuICAgICAgICAgICAgbi5mb2xkZWQgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZGF0YS5nZXRBbGxEZXNjZW5kYW50RWRnZXMobm9kZSkuZm9yRWFjaChlPT5lLiRoaWRkZW4gPSBmb2xkKTtcblxuICAgICAgICBpZighcmVkcmF3KXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBzZWxmLnJlZHJhdygpO1xuICAgICAgICAgICAgc2VsZi5sYXlvdXQudXBkYXRlKCk7XG4gICAgICAgIH0sMTApXG4gICAgfVxuXG4gICAgdXBkYXRlVmlzaWJpbGl0eShub2RlID0gbnVsbCl7XG4gICAgICAgIGlmKCFub2RlKXtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5nZXRSb290cygpLmZvckVhY2gobj0+dGhpcy51cGRhdGVWaXNpYmlsaXR5KG4pKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKG5vZGUuZm9sZGVkKXtcbiAgICAgICAgICAgIHRoaXMuZm9sZFN1YnRyZWUobm9kZSwgdHJ1ZSwgZmFsc2UpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbm9kZS5jaGlsZEVkZ2VzLmZvckVhY2goZSA9PiB0aGlzLnVwZGF0ZVZpc2liaWxpdHkoZS5jaGlsZE5vZGUpKTtcblxuICAgIH1cblxuICAgIG1vdmVOb2RlVG8oeCx5KXtcblxuICAgIH1cblxuICAgIHVwZGF0ZU5vZGVQb3NpdGlvbihub2RlKSB7XG4gICAgICAgIHRoaXMuZ2V0Tm9kZUQzU2VsZWN0aW9uKG5vZGUpLnJhaXNlKCkuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnK25vZGUubG9jYXRpb24ueCsnICcrbm9kZS5sb2NhdGlvbi55KycpJyk7XG4gICAgfVxuXG4gICAgdXBkYXRlVGV4dFBvc2l0aW9uKHRleHQpIHtcbiAgICAgICAgdGhpcy5nZXRUZXh0RDNTZWxlY3Rpb24odGV4dCkucmFpc2UoKS5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcrdGV4dC5sb2NhdGlvbi54KycgJyt0ZXh0LmxvY2F0aW9uLnkrJyknKTtcbiAgICB9XG5cbiAgICBnZXROb2RlRDNTZWxlY3Rpb24obm9kZSl7XG4gICAgICAgIHJldHVybiB0aGlzLmdldE5vZGVEM1NlbGVjdGlvbkJ5SWQobm9kZS4kaWQpO1xuICAgIH1cblxuICAgIGdldE5vZGVEM1NlbGVjdGlvbkJ5SWQoaWQpe1xuICAgICAgICByZXR1cm4gdGhpcy5tYWluR3JvdXAuc2VsZWN0KCcjbm9kZS0nK2lkKTtcbiAgICB9XG4gICAgZ2V0VGV4dEQzU2VsZWN0aW9uKHRleHQpe1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRUZXh0RDNTZWxlY3Rpb25CeUlkKHRleHQuJGlkKTtcbiAgICB9XG4gICAgZ2V0VGV4dEQzU2VsZWN0aW9uQnlJZChpZCl7XG4gICAgICAgIHJldHVybiB0aGlzLm1haW5Hcm91cC5zZWxlY3QoJyN0ZXh0LScraWQpO1xuICAgIH1cblxuICAgIGdldFNlbGVjdGVkTm9kZXModmlzaWJsZU9ubHkgPSBmYWxzZSkge1xuICAgICAgICBsZXQgc2VsZWN0ZWRWaXNpYmxlID0gdGhpcy5tYWluR3JvdXAuc2VsZWN0QWxsKFwiLm5vZGUuc2VsZWN0ZWRcIikuZGF0YSgpO1xuICAgICAgICBpZih2aXNpYmxlT25seSl7XG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0ZWRWaXNpYmxlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGFsbFNlbGVjdGVkICA9IFtdO1xuICAgICAgICBhbGxTZWxlY3RlZC5wdXNoKC4uLnNlbGVjdGVkVmlzaWJsZSk7XG5cbiAgICAgICAgc2VsZWN0ZWRWaXNpYmxlLmZvckVhY2gobj0+e1xuICAgICAgICAgICAgaWYobi5mb2xkZWQpe1xuICAgICAgICAgICAgICAgIGxldCBkZXNjZW5kYW50cyA9IHRoaXMuZGF0YS5nZXRBbGxEZXNjZW5kYW50Tm9kZXMobik7XG4gICAgICAgICAgICAgICAgaWYoZGVzY2VuZGFudHMpe1xuICAgICAgICAgICAgICAgICAgICBhbGxTZWxlY3RlZC5wdXNoKC4uLmRlc2NlbmRhbnRzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBhbGxTZWxlY3RlZDtcbiAgICB9XG5cbiAgICBnZXRTZWxlY3RlZFRleHRzKCl7XG4gICAgICAgIHJldHVybiB0aGlzLm1haW5Hcm91cC5zZWxlY3RBbGwoXCIuZmxvYXRpbmctdGV4dC5zZWxlY3RlZFwiKS5kYXRhKCk7XG4gICAgfVxuXG4gICAgY2xlYXJTZWxlY3Rpb24oKXtcbiAgICAgICAgdGhpcy5tYWluR3JvdXAuc2VsZWN0QWxsKFwiLmVkZ2Uuc2VsZWN0ZWRcIikuc2VsZWN0KCdwYXRoJykuYXR0cihcIm1hcmtlci1lbmRcIiwgZCA9PiBcInVybCgjYXJyb3dcIisodGhpcy5pc09wdGltYWwoZCk/Jy1vcHRpbWFsJzonJykrXCIpXCIpXG4gICAgICAgIHRoaXMubWFpbkdyb3VwLnNlbGVjdEFsbChcIi5zZWxlY3RlZFwiKS5jbGFzc2VkKCdzZWxlY3RlZCcsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5jb25maWcub25TZWxlY3Rpb25DbGVhcmVkKCk7XG4gICAgfVxuXG4gICAgc2VsZWN0RWRnZShlZGdlLCBjbGVhclNlbGVjdGlvbkJlZm9yZVNlbGVjdCl7XG4gICAgICAgIGlmKGNsZWFyU2VsZWN0aW9uQmVmb3JlU2VsZWN0KXtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbmZpZy5vbkVkZ2VTZWxlY3RlZChlZGdlKTtcbiAgICAgICAgdGhpcy5tYWluR3JvdXAuc2VsZWN0KCcjZWRnZS0nK2VkZ2UuJGlkKVxuICAgICAgICAgICAgLmNsYXNzZWQoJ3NlbGVjdGVkJywgdHJ1ZSlcbiAgICAgICAgICAgIC5zZWxlY3QoJ3BhdGgnKVxuICAgICAgICAgICAgLmF0dHIoXCJtYXJrZXItZW5kXCIsIGQgPT4gXCJ1cmwoI2Fycm93LXNlbGVjdGVkKVwiKVxuICAgIH1cblxuICAgIGlzTm9kZVNlbGVjdGVkKG5vZGUpe1xuICAgICAgICByZXR1cm4gdGhpcy5nZXROb2RlRDNTZWxlY3Rpb24obm9kZSkuY2xhc3NlZCgnc2VsZWN0ZWQnKTtcbiAgICB9XG5cbiAgICBzZWxlY3ROb2RlKG5vZGUsIGNsZWFyU2VsZWN0aW9uQmVmb3JlU2VsZWN0LCBza2lwQ2FsbGJhY2spe1xuICAgICAgICBpZihjbGVhclNlbGVjdGlvbkJlZm9yZVNlbGVjdCl7XG4gICAgICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZighc2tpcENhbGxiYWNrKXtcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLm9uTm9kZVNlbGVjdGVkKG5vZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5nZXROb2RlRDNTZWxlY3Rpb25CeUlkKG5vZGUuJGlkKS5jbGFzc2VkKCdzZWxlY3RlZCcsIHRydWUpO1xuICAgIH1cblxuICAgIHNlbGVjdFRleHQodGV4dCwgY2xlYXJTZWxlY3Rpb25CZWZvcmVTZWxlY3QsIHNraXBDYWxsYmFjayl7XG4gICAgICAgIGlmKGNsZWFyU2VsZWN0aW9uQmVmb3JlU2VsZWN0KXtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCFza2lwQ2FsbGJhY2spe1xuICAgICAgICAgICAgdGhpcy5jb25maWcub25UZXh0U2VsZWN0ZWQodGV4dClcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZ2V0VGV4dEQzU2VsZWN0aW9uQnlJZCh0ZXh0LiRpZCkuY2xhc3NlZCgnc2VsZWN0ZWQnLCB0cnVlKTtcbiAgICB9XG5cbiAgICBzZWxlY3RTdWJUcmVlKG5vZGUsIGNsZWFyU2VsZWN0aW9uQmVmb3JlU2VsZWN0LHNraXBDYWxsYmFjaykge1xuICAgICAgICBpZihjbGVhclNlbGVjdGlvbkJlZm9yZVNlbGVjdCl7XG4gICAgICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZWxlY3ROb2RlKG5vZGUsIGZhbHNlLCBza2lwQ2FsbGJhY2spO1xuICAgICAgICBub2RlLmNoaWxkRWRnZXMuZm9yRWFjaChlPT50aGlzLnNlbGVjdFN1YlRyZWUoZS5jaGlsZE5vZGUsIGZhbHNlLCB0cnVlKSk7XG4gICAgfVxuXG4gICAgc2VsZWN0QWxsTm9kZXMoKSB7XG4gICAgICAgIHRoaXMubWFpbkdyb3VwLnNlbGVjdEFsbChcIi5ub2RlXCIpLmNsYXNzZWQoJ3NlbGVjdGVkJywgdHJ1ZSk7XG4gICAgfVxuXG4gICAgYXV0b0xheW91dCh0eXBlLCB3aXRob3V0U3RhdGVTYXZpbmcpe1xuICAgICAgICB0aGlzLmxheW91dC5hdXRvTGF5b3V0KHR5cGUsIHdpdGhvdXRTdGF0ZVNhdmluZyk7XG4gICAgfVxuXG4gICAgdXBkYXRlRGlhZ3JhbVRpdGxlKHRpdGxlVmFsdWUpe1xuICAgICAgICBpZighdGl0bGVWYWx1ZSl7XG4gICAgICAgICAgICB0aXRsZVZhbHVlID0gJyc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kaWFncmFtVGl0bGUgPSB0aXRsZVZhbHVlO1xuICAgICAgICB0aGlzLnJlZHJhd0RpYWdyYW1UaXRsZSgpO1xuICAgICAgICB0aGlzLnJlZHJhd0RpYWdyYW1EZXNjcmlwdGlvbigpO1xuICAgICAgICB0aGlzLnVwZGF0ZU1hcmdpbih0cnVlKTtcbiAgICB9XG5cbiAgICByZWRyYXdEaWFncmFtVGl0bGUoKXtcbiAgICAgICAgdmFyIHN2Z1dpZHRoID0gdGhpcy5zdmcuYXR0cignd2lkdGgnKTtcbiAgICAgICAgdmFyIHN2Z0hlaWdodCA9IHRoaXMuc3ZnLmF0dHIoJ2hlaWdodCcpO1xuICAgICAgICB0aGlzLnRpdGxlQ29udGFpbmVyID0gdGhpcy5zdmcuc2VsZWN0T3JBcHBlbmQoJ2cuc2QtdGl0bGUtY29udGFpbmVyJyk7XG5cbiAgICAgICAgdmFyIHRpdGxlID0gdGhpcy50aXRsZUNvbnRhaW5lci5zZWxlY3RPckFwcGVuZCgndGV4dC5zZC10aXRsZScpO1xuICAgICAgICB0aXRsZS50ZXh0KHRoaXMuZGlhZ3JhbVRpdGxlKTtcbiAgICAgICAgTGF5b3V0LnNldEhhbmdpbmdQb3NpdGlvbih0aXRsZSk7XG5cbiAgICAgICAgdmFyIG1hcmdpblRvcCA9IHBhcnNlSW50KHRoaXMuY29uZmlnLnRpdGxlLm1hcmdpbi50b3ApO1xuICAgICAgICB0aGlzLnRpdGxlQ29udGFpbmVyLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJysoc3ZnV2lkdGgvMikrJywnKyggbWFyZ2luVG9wKSsnKScpO1xuICAgIH1cbiAgICByZWRyYXdEaWFncmFtRGVzY3JpcHRpb24oKXtcbiAgICAgICAgdmFyIHN2Z1dpZHRoID0gdGhpcy5zdmcuYXR0cignd2lkdGgnKTtcbiAgICAgICAgdmFyIHN2Z0hlaWdodCA9IHRoaXMuc3ZnLmF0dHIoJ2hlaWdodCcpO1xuICAgICAgICB0aGlzLnRpdGxlQ29udGFpbmVyID0gdGhpcy5zdmcuc2VsZWN0T3JBcHBlbmQoJ2cuc2QtdGl0bGUtY29udGFpbmVyJyk7XG5cbiAgICAgICAgdmFyIGRlc2MgPSB0aGlzLnRpdGxlQ29udGFpbmVyLnNlbGVjdE9yQXBwZW5kKCd0ZXh0LnNkLWRlc2NyaXB0aW9uJyk7XG5cbiAgICAgICAgaWYoIXRoaXMuY29uZmlnLmRlc2NyaXB0aW9uLnNob3cpe1xuICAgICAgICAgICAgZGVzYy5yZW1vdmUoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBsaW5lcyA9IHRoaXMuZGlhZ3JhbURlc2NyaXB0aW9uID8gdGhpcy5kaWFncmFtRGVzY3JpcHRpb24uc3BsaXQoJ1xcbicpIDogW107XG4gICAgICAgIHZhciB0c3BhbnMgPSBkZXNjLnNlbGVjdEFsbCgndHNwYW4nKS5kYXRhKGxpbmVzKTtcbiAgICAgICAgdHNwYW5zLmVudGVyKCkuYXBwZW5kKCd0c3BhbicpXG4gICAgICAgICAgICAubWVyZ2UodHNwYW5zKVxuICAgICAgICAgICAgLmh0bWwobD0+QXBwVXRpbHMucmVwbGFjZVVybHMoQXBwVXRpbHMuZXNjYXBlSHRtbChsKSkpXG4gICAgICAgICAgICAuYXR0cignZHknLCAoZCxpKT0+aT4wID8gJzEuMWVtJzogdW5kZWZpbmVkKVxuICAgICAgICAgICAgLmF0dHIoJ3gnLCAnMCcpO1xuXG4gICAgICAgIHRzcGFucy5leGl0KCkucmVtb3ZlKCk7XG4gICAgICAgIExheW91dC5zZXRIYW5naW5nUG9zaXRpb24oZGVzYyk7XG5cbiAgICAgICAgdmFyIHRpdGxlID0gdGhpcy50aXRsZUNvbnRhaW5lci5zZWxlY3RPckFwcGVuZCgndGV4dC5zZC10aXRsZScpO1xuXG4gICAgICAgIHZhciBtYXJnaW5Ub3AgPSAwO1xuICAgICAgICBpZih0aGlzLmRpYWdyYW1UaXRsZSl7XG4gICAgICAgICAgICBtYXJnaW5Ub3AgKz0gdGl0bGUubm9kZSgpLmdldEJCb3goKS5oZWlnaHQ7XG4gICAgICAgICAgICBtYXJnaW5Ub3ArPSBNYXRoLm1heChwYXJzZUludCh0aGlzLmNvbmZpZy5kZXNjcmlwdGlvbi5tYXJnaW4udG9wKSwgMCk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGRlc2MuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgwLCcrKCBtYXJnaW5Ub3ApKycpJyk7XG4gICAgfVxuXG4gICAgdXBkYXRlRGlhZ3JhbURlc2NyaXB0aW9uKGRlc2NyaXB0aW9uVmFsdWUpe1xuICAgICAgICBpZighZGVzY3JpcHRpb25WYWx1ZSl7XG4gICAgICAgICAgICBkZXNjcmlwdGlvblZhbHVlID0gJyc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kaWFncmFtRGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvblZhbHVlO1xuICAgICAgICB0aGlzLnJlZHJhd0RpYWdyYW1UaXRsZSgpO1xuICAgICAgICB0aGlzLnJlZHJhd0RpYWdyYW1EZXNjcmlwdGlvbigpO1xuICAgICAgICB0aGlzLnVwZGF0ZU1hcmdpbih0cnVlKTtcbiAgICB9XG5cblxuICAgIGdldFRpdGxlR3JvdXBIZWlnaHQod2l0aE1hcmdpbnMpe1xuICAgICAgICBpZighdGhpcy50aXRsZUNvbnRhaW5lcil7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaCA9IHRoaXMudGl0bGVDb250YWluZXIubm9kZSgpLmdldEJCb3goKS5oZWlnaHQ7XG4gICAgICAgIGlmKHdpdGhNYXJnaW5zKXtcbiAgICAgICAgICAgIGgrPSBwYXJzZUludCh0aGlzLmNvbmZpZy50aXRsZS5tYXJnaW4uYm90dG9tKTtcbiAgICAgICAgICAgIGgrPSBwYXJzZUludCh0aGlzLmNvbmZpZy50aXRsZS5tYXJnaW4udG9wKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaDtcbiAgICB9XG5cbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vc3JjL2luZGV4J1xuIl19
