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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLXV0aWxzLmpzIiwic3JjL2NvbnRleHQtbWVudS9jb250ZXh0LW1lbnUuanMiLCJzcmMvY29udGV4dC1tZW51L2VkZ2UtY29udGV4dC1tZW51LmpzIiwic3JjL2NvbnRleHQtbWVudS9tYWluLWNvbnRleHQtbWVudS5qcyIsInNyYy9jb250ZXh0LW1lbnUvbm9kZS1jb250ZXh0LW1lbnUuanMiLCJzcmMvY29udGV4dC1tZW51L3RleHQtY29udGV4dC1tZW51LmpzIiwic3JjL2QzLWV4dGVuc2lvbnMuanMiLCJzcmMvZDMuanMiLCJzcmMvaTE4bi9kZS5qc29uIiwic3JjL2kxOG4vZW4uanNvbiIsInNyYy9pMThuL2ZyLmpzb24iLCJzcmMvaTE4bi9pMThuLmpzIiwic3JjL2kxOG4vaXQuanNvbiIsInNyYy9pMThuL3BsLmpzb24iLCJzcmMvaW5kZXguanMiLCJzcmMvbGF5b3V0LmpzIiwic3JjL25vZGUtZHJhZy1oYW5kbGVyLmpzIiwic3JjL3N5bWJvbHMvY2lyY2xlLmpzIiwic3JjL3N5bWJvbHMvdHJpYW5nbGUuanMiLCJzcmMvdGVtcGxhdGVzLmpzIiwic3JjL3RlbXBsYXRlcy9ncm93bF9tZXNzYWdlLmh0bWwiLCJzcmMvdGV4dC1kcmFnLWhhbmRsZXIuanMiLCJzcmMvdG9vbHRpcC5qcyIsInNyYy90cmVlLWRlc2lnbmVyLmpzIiwiaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBOztJLEFBQVk7O0FBQ1o7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0ksQUFFYTs7Ozs7O2FBa0JUOzs7OEMsQUFDNkIsVyxBQUFXLFksQUFBWSxPQUFPLEFBQ3ZEO2dCQUFJLFVBQVUsVUFBZCxBQUFjLEFBQVUsQUFDeEI7b0JBQUEsQUFBUSxjQUFSLEFBQXNCLEFBRXRCOztnQkFBSSxTQUFKLEFBQWEsQUFDYjtn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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEVBOzs7O0FBQ0E7O0ksQUFBWTs7QUFDWjs7SSxBQUFZOztBQUNaOztJLEFBQVk7O0FBQ1o7O0ksQUFBWTs7QUFDWjs7SSxBQUFZOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SSxBQUVDLGUs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cUJBQUwsQUFBMEIsQUFDMUI7aUJBQUEsQUFBSyxBQUNMO2lCQUFBLEFBQUssQUFDTDtpQkFBQSxBQUFLLGFBQUwsQUFBa0IsQUFDckI7Ozs7NEMsQUFHbUIsYUFBWSxBQUM1QjtnQkFBRyxDQUFDLEtBQUosQUFBUyxnQkFBZSxBQUNwQjt1QkFBQSxBQUFPLEFBQ1Y7QUFDRDtnQkFBSSxJQUFJLEtBQUEsQUFBSyxlQUFMLEFBQW9CLE9BQXBCLEFBQTJCLFVBQW5DLEFBQTZDLEFBQzdDO2dCQUFBLEFBQUcsYUFBWSxBQUNYO3FCQUFJLFNBQVMsS0FBQSxBQUFLLE9BQUwsQUFBWSxNQUFaLEFBQWtCLE9BQS9CLEFBQUksQUFBa0MsQUFDdEM7cUJBQUksU0FBUyxLQUFBLEFBQUssT0FBTCxBQUFZLE1BQVosQUFBa0IsT0FBL0IsQUFBSSxBQUFrQyxBQUN6QztBQUNEO21CQUFBLEFBQU8sQUFDVjs7Ozs7Ozs7Ozs7Ozs7OztBQ2g3Q0wsMkNBQUE7aURBQUE7O2dCQUFBO3dCQUFBO29CQUFBO0FBQUE7QUFBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgKiBhcyBkMyBmcm9tIFwiLi9kM1wiO1xuaW1wb3J0IHtUZW1wbGF0ZXN9IGZyb20gXCIuL3RlbXBsYXRlc1wiO1xuaW1wb3J0IHtpMThufSBmcm9tIFwiLi9pMThuL2kxOG5cIjtcbmltcG9ydCB7VXRpbHN9IGZyb20gXCJzZC11dGlsc1wiO1xuXG5leHBvcnQgY2xhc3MgQXBwVXRpbHMge1xuXG4gICAgc3RhdGljIHNhbml0aXplSGVpZ2h0ID0gZnVuY3Rpb24gKGhlaWdodCwgY29udGFpbmVyKSB7XG4gICAgICAgIHJldHVybiAoaGVpZ2h0IHx8IHBhcnNlSW50KGNvbnRhaW5lci5zdHlsZSgnaGVpZ2h0JyksIDEwKSB8fCA0MDApO1xuICAgIH07XG5cbiAgICBzdGF0aWMgc2FuaXRpemVXaWR0aCA9IGZ1bmN0aW9uICh3aWR0aCwgY29udGFpbmVyKSB7XG4gICAgICAgIHJldHVybiAod2lkdGggfHwgcGFyc2VJbnQoY29udGFpbmVyLnN0eWxlKCd3aWR0aCcpLCAxMCkgfHwgOTYwKTtcbiAgICB9O1xuXG4gICAgc3RhdGljIGF2YWlsYWJsZUhlaWdodCA9IGZ1bmN0aW9uIChoZWlnaHQsIGNvbnRhaW5lciwgbWFyZ2luKSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1heCgwLCBBcHBVdGlscy5zYW5pdGl6ZUhlaWdodChoZWlnaHQsIGNvbnRhaW5lcikgLSBtYXJnaW4udG9wIC0gbWFyZ2luLmJvdHRvbSk7XG4gICAgfTtcblxuICAgIHN0YXRpYyBhdmFpbGFibGVXaWR0aCA9IGZ1bmN0aW9uICh3aWR0aCwgY29udGFpbmVyLCBtYXJnaW4pIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KDAsIEFwcFV0aWxzLnNhbml0aXplV2lkdGgod2lkdGgsIGNvbnRhaW5lcikgLSBtYXJnaW4ubGVmdCAtIG1hcmdpbi5yaWdodCk7XG4gICAgfTtcblxuICAgIC8vcGxhY2VzIHRleHRTdHJpbmcgaW4gdGV4dE9iaiwgYWRkcyBhbiBlbGxpcHNpcyBpZiB0ZXh0IGNhbid0IGZpdCBpbiB3aWR0aFxuICAgIHN0YXRpYyBwbGFjZVRleHRXaXRoRWxsaXBzaXModGV4dEQzT2JqLCB0ZXh0U3RyaW5nLCB3aWR0aCkge1xuICAgICAgICB2YXIgdGV4dE9iaiA9IHRleHREM09iai5ub2RlKCk7XG4gICAgICAgIHRleHRPYmoudGV4dENvbnRlbnQgPSB0ZXh0U3RyaW5nO1xuXG4gICAgICAgIHZhciBtYXJnaW4gPSAwO1xuICAgICAgICB2YXIgZWxsaXBzaXNMZW5ndGggPSA5O1xuICAgICAgICAvL2VsbGlwc2lzIGlzIG5lZWRlZFxuICAgICAgICBpZiAodGV4dE9iai5nZXRDb21wdXRlZFRleHRMZW5ndGgoKSA+IHdpZHRoICsgbWFyZ2luKSB7XG4gICAgICAgICAgICBmb3IgKHZhciB4ID0gdGV4dFN0cmluZy5sZW5ndGggLSAzOyB4ID4gMDsgeCAtPSAxKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRleHRPYmouZ2V0U3ViU3RyaW5nTGVuZ3RoKDAsIHgpICsgZWxsaXBzaXNMZW5ndGggPD0gd2lkdGggKyBtYXJnaW4pIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dE9iai50ZXh0Q29udGVudCA9IHRleHRTdHJpbmcuc3Vic3RyaW5nKDAsIHgpICsgXCIuLi5cIjtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGV4dE9iai50ZXh0Q29udGVudCA9IFwiLi4uXCI7IC8vY2FuJ3QgcGxhY2UgYXQgYWxsXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgc3RhdGljIHBsYWNlVGV4dFdpdGhFbGxpcHNpc0FuZFRvb2x0aXAodGV4dEQzT2JqLCB0ZXh0U3RyaW5nLCB3aWR0aCwgdG9vbHRpcCkge1xuICAgICAgICB2YXIgZWxsaXBzaXNQbGFjZWQgPSBBcHBVdGlscy5wbGFjZVRleHRXaXRoRWxsaXBzaXModGV4dEQzT2JqLCB0ZXh0U3RyaW5nLCB3aWR0aCk7XG4gICAgICAgIGlmIChlbGxpcHNpc1BsYWNlZCAmJiB0b29sdGlwKSB7XG4gICAgICAgICAgICB0ZXh0RDNPYmoub24oXCJtb3VzZW92ZXJcIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICB0b29sdGlwLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgICAgICAgICAuZHVyYXRpb24oMjAwKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIC45KTtcbiAgICAgICAgICAgICAgICB0b29sdGlwLmh0bWwodGV4dFN0cmluZylcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwibGVmdFwiLCAoZDMuZXZlbnQucGFnZVggKyA1KSArIFwicHhcIilcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwidG9wXCIsIChkMy5ldmVudC5wYWdlWSAtIDI4KSArIFwicHhcIik7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGV4dEQzT2JqLm9uKFwibW91c2VvdXRcIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICB0b29sdGlwLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgICAgICAgICAuZHVyYXRpb24oNTAwKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHN0YXRpYyBnZXRGb250U2l6ZShlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50LCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKFwiZm9udC1zaXplXCIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXRUcmFuc2xhdGlvbih0cmFuc2Zvcm0pIHtcbiAgICAgICAgLy8gQ3JlYXRlIGEgZHVtbXkgZyBmb3IgY2FsY3VsYXRpb24gcHVycG9zZXMgb25seS4gVGhpcyB3aWxsIG5ldmVyXG4gICAgICAgIC8vIGJlIGFwcGVuZGVkIHRvIHRoZSBET00gYW5kIHdpbGwgYmUgZGlzY2FyZGVkIG9uY2UgdGhpcyBmdW5jdGlvblxuICAgICAgICAvLyByZXR1cm5zLlxuICAgICAgICB2YXIgZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwiZ1wiKTtcblxuICAgICAgICAvLyBTZXQgdGhlIHRyYW5zZm9ybSBhdHRyaWJ1dGUgdG8gdGhlIHByb3ZpZGVkIHN0cmluZyB2YWx1ZS5cbiAgICAgICAgZy5zZXRBdHRyaWJ1dGVOUyhudWxsLCBcInRyYW5zZm9ybVwiLCB0cmFuc2Zvcm0pO1xuXG4gICAgICAgIC8vIGNvbnNvbGlkYXRlIHRoZSBTVkdUcmFuc2Zvcm1MaXN0IGNvbnRhaW5pbmcgYWxsIHRyYW5zZm9ybWF0aW9uc1xuICAgICAgICAvLyB0byBhIHNpbmdsZSBTVkdUcmFuc2Zvcm0gb2YgdHlwZSBTVkdfVFJBTlNGT1JNX01BVFJJWCBhbmQgZ2V0XG4gICAgICAgIC8vIGl0cyBTVkdNYXRyaXguXG4gICAgICAgIHZhciBtYXRyaXggPSBnLnRyYW5zZm9ybS5iYXNlVmFsLmNvbnNvbGlkYXRlKCkubWF0cml4O1xuXG4gICAgICAgIC8vIEFzIHBlciBkZWZpbml0aW9uIHZhbHVlcyBlIGFuZCBmIGFyZSB0aGUgb25lcyBmb3IgdGhlIHRyYW5zbGF0aW9uLlxuICAgICAgICByZXR1cm4gW21hdHJpeC5lLCBtYXRyaXguZl07XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgY2xvc2VzdFBvaW50KHBhdGhOb2RlLCBwb2ludCkge1xuICAgICAgICB2YXIgcGF0aExlbmd0aCA9IHBhdGhOb2RlLmdldFRvdGFsTGVuZ3RoKCksXG4gICAgICAgICAgICBwcmVjaXNpb24gPSA4LFxuICAgICAgICAgICAgYmVzdCxcbiAgICAgICAgICAgIGJlc3RMZW5ndGgsXG4gICAgICAgICAgICBiZXN0RGlzdGFuY2UgPSBJbmZpbml0eTtcblxuICAgICAgICAvLyBsaW5lYXIgc2NhbiBmb3IgY29hcnNlIGFwcHJveGltYXRpb25cbiAgICAgICAgZm9yICh2YXIgc2Nhbiwgc2Nhbkxlbmd0aCA9IDAsIHNjYW5EaXN0YW5jZTsgc2Nhbkxlbmd0aCA8PSBwYXRoTGVuZ3RoOyBzY2FuTGVuZ3RoICs9IHByZWNpc2lvbikge1xuICAgICAgICAgICAgaWYgKChzY2FuRGlzdGFuY2UgPSBkaXN0YW5jZTIoc2NhbiA9IHBhdGhOb2RlLmdldFBvaW50QXRMZW5ndGgoc2Nhbkxlbmd0aCkpKSA8IGJlc3REaXN0YW5jZSkge1xuICAgICAgICAgICAgICAgIGJlc3QgPSBzY2FuLCBiZXN0TGVuZ3RoID0gc2Nhbkxlbmd0aCwgYmVzdERpc3RhbmNlID0gc2NhbkRpc3RhbmNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gYmluYXJ5IHNlYXJjaCBmb3IgcHJlY2lzZSBlc3RpbWF0ZVxuICAgICAgICBwcmVjaXNpb24gLz0gMjtcbiAgICAgICAgd2hpbGUgKHByZWNpc2lvbiA+IDAuNSkge1xuICAgICAgICAgICAgdmFyIGJlZm9yZSxcbiAgICAgICAgICAgICAgICBhZnRlcixcbiAgICAgICAgICAgICAgICBiZWZvcmVMZW5ndGgsXG4gICAgICAgICAgICAgICAgYWZ0ZXJMZW5ndGgsXG4gICAgICAgICAgICAgICAgYmVmb3JlRGlzdGFuY2UsXG4gICAgICAgICAgICAgICAgYWZ0ZXJEaXN0YW5jZTtcbiAgICAgICAgICAgIGlmICgoYmVmb3JlTGVuZ3RoID0gYmVzdExlbmd0aCAtIHByZWNpc2lvbikgPj0gMCAmJiAoYmVmb3JlRGlzdGFuY2UgPSBkaXN0YW5jZTIoYmVmb3JlID0gcGF0aE5vZGUuZ2V0UG9pbnRBdExlbmd0aChiZWZvcmVMZW5ndGgpKSkgPCBiZXN0RGlzdGFuY2UpIHtcbiAgICAgICAgICAgICAgICBiZXN0ID0gYmVmb3JlLCBiZXN0TGVuZ3RoID0gYmVmb3JlTGVuZ3RoLCBiZXN0RGlzdGFuY2UgPSBiZWZvcmVEaXN0YW5jZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKGFmdGVyTGVuZ3RoID0gYmVzdExlbmd0aCArIHByZWNpc2lvbikgPD0gcGF0aExlbmd0aCAmJiAoYWZ0ZXJEaXN0YW5jZSA9IGRpc3RhbmNlMihhZnRlciA9IHBhdGhOb2RlLmdldFBvaW50QXRMZW5ndGgoYWZ0ZXJMZW5ndGgpKSkgPCBiZXN0RGlzdGFuY2UpIHtcbiAgICAgICAgICAgICAgICBiZXN0ID0gYWZ0ZXIsIGJlc3RMZW5ndGggPSBhZnRlckxlbmd0aCwgYmVzdERpc3RhbmNlID0gYWZ0ZXJEaXN0YW5jZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcHJlY2lzaW9uIC89IDI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBiZXN0ID0gW2Jlc3QueCwgYmVzdC55XTtcbiAgICAgICAgYmVzdC5kaXN0YW5jZSA9IE1hdGguc3FydChiZXN0RGlzdGFuY2UpO1xuICAgICAgICByZXR1cm4gYmVzdDtcblxuICAgICAgICBmdW5jdGlvbiBkaXN0YW5jZTIocCkge1xuICAgICAgICAgICAgdmFyIGR4ID0gcC54IC0gcG9pbnRbMF0sXG4gICAgICAgICAgICAgICAgZHkgPSBwLnkgLSBwb2ludFsxXTtcbiAgICAgICAgICAgIHJldHVybiBkeCAqIGR4ICsgZHkgKiBkeTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBncm93bChtZXNzYWdlLCB0eXBlPSdpbmZvJywgcG9zaXRpb249J3JpZ2h0JywgdGltZSA9IDIwMDApe1xuICAgICAgICB2YXIgaHRtbCA9IFRlbXBsYXRlcy5nZXQoJ2dyb3dsJywge21lc3NhZ2U6bWVzc2FnZSwgdHlwZTp0eXBlfSlcblxuICAgICAgICB2YXIgZyA9IGQzLnNlbGVjdCgnYm9keScpLnNlbGVjdE9yQXBwZW5kKCdkaXYuc2QtZ3Jvd2wtbGlzdC4nK3Bvc2l0aW9uKS5hcHBlbmQoJ2RpdicpLmh0bWwoaHRtbCk7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGcucmVtb3ZlKCk7XG4gICAgICAgIH0sIHRpbWUpXG4gICAgfVxuXG5cbiAgICBzdGF0aWMgY3JlYXRlRWxlbWVudCh0YWcsIGF0dHJpYnMsIHBhcmVudCkge1xuICAgICAgICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XG5cbiAgICAgICAgaWYgKGF0dHJpYnMpIHtcbiAgICAgICAgICAgIEFwcFV0aWxzLmRlZXBFeHRlbmQoZWwsIGF0dHJpYnMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChlbCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsO1xuICAgIH07XG5cbiAgICBzdGF0aWMgcmVtb3ZlRWxlbWVudChlbGVtZW50KSB7XG4gICAgICAgIGVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbGVtZW50KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgcmVwbGFjZVVybHModGV4dCl7XG4gICAgICAgIGlmKCF0ZXh0KXtcbiAgICAgICAgICAgIHJldHVybiB0ZXh0O1xuICAgICAgICB9XG4gICAgICAgIHZhciB1cmxSZWdleHAgPSAvKChmdHB8aHR0cHxodHRwcyk6XFwvXFwvKFxcdys6ezAsMX1cXHcqQCk/KFxcUyspKDpbMC05XSspPyhcXC98XFwvKFtcXHcjITouPys9JiVAIVxcLVxcL10pKT8pL1xuXG4gICAgICAgIHJldHVybiB0ZXh0LnJlcGxhY2UodXJsUmVnZXhwLCAnPGEgaHJlZj1cIiQxXCIgdGFyZ2V0PVwiX2JsYW5rXCI+JDE8L2E+Jyk7XG4gICAgfVxuXG4gICAgc3RhdGljIGVzY2FwZUh0bWwoaHRtbClcbiAgICB7XG4gICAgICAgIHZhciB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoaHRtbCk7XG4gICAgICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZGl2LmFwcGVuZENoaWxkKHRleHQpO1xuICAgICAgICByZXR1cm4gZGl2LmlubmVySFRNTDtcbiAgICB9XG5cbiAgICBzdGF0aWMgZGlzcGF0Y2hIdG1sRXZlbnQoZWxlbWVudCwgbmFtZSl7XG4gICAgICAgIGlmIChcImNyZWF0ZUV2ZW50XCIgaW4gZG9jdW1lbnQpIHtcbiAgICAgICAgICAgIHZhciBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudChcIkhUTUxFdmVudHNcIik7XG4gICAgICAgICAgICBldnQuaW5pdEV2ZW50KG5hbWUsIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICAgIGVsZW1lbnQuZGlzcGF0Y2hFdmVudChldnQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGVsZW1lbnQuZmlyZUV2ZW50KFwib25cIituYW1lKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZGlzcGF0Y2hFdmVudChuYW1lLCBkYXRhKXtcbiAgICAgICAgdmFyIGV2ZW50O1xuICAgICAgICB0cnl7XG4gICAgICAgICAgICBldmVudCA9IG5ldyAgQ3VzdG9tRXZlbnQobmFtZSx7ICdkZXRhaWwnOiBkYXRhIH0pO1xuICAgICAgICB9Y2F0Y2ggKGUpeyAvL0lFXG4gICAgICAgICAgICBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuICAgICAgICAgICAgZXZlbnQuaW5pdEN1c3RvbUV2ZW50KG5hbWUsIGZhbHNlLCBmYWxzZSwgZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldFZhbGlkYXRpb25NZXNzYWdlKGVycm9yKXtcbiAgICAgICAgaWYoVXRpbHMuaXNTdHJpbmcoZXJyb3IpKXtcbiAgICAgICAgICAgIGVycm9yID0ge25hbWU6IGVycm9yfTtcbiAgICAgICAgfVxuICAgICAgICB2YXIga2V5ID0gJ3ZhbGlkYXRpb24uJyArIGVycm9yLm5hbWU7XG4gICAgICAgIHJldHVybiBpMThuLnQoa2V5LCBlcnJvci5kYXRhKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaGlkZShzZWxlY3Rpb24pe1xuICAgICAgICBzZWxlY3Rpb24uY2xhc3NlZCgnc2QtaGlkZGVuJywgdHJ1ZSk7XG4gICAgfVxuXG4gICAgc3RhdGljIHNob3coc2VsZWN0aW9uLCBzaG93PXRydWUpe1xuICAgICAgICBzZWxlY3Rpb24uY2xhc3NlZCgnc2QtaGlkZGVuJywgIXNob3cpO1xuICAgIH1cblxuXG5cbiAgICBzdGF0aWMgaXNIaWRkZW4oZWwsIGV4YWN0ID0gdHJ1ZSkge1xuICAgICAgICBpZighZWwpe1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYoZXhhY3Qpe1xuICAgICAgICAgICAgdmFyIHN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwpO1xuICAgICAgICAgICAgcmV0dXJuIChzdHlsZS5kaXNwbGF5ID09PSAnbm9uZScpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChlbC5vZmZzZXRQYXJlbnQgPT09IG51bGwpXG4gICAgfVxuXG4gICAgc3RhdGljIGdldEpTT04odXJsLCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHhoci5vcGVuKCdnZXQnLCB1cmwsIHRydWUpO1xuICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuICAgICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHN0YXR1cyA9IHhoci5zdGF0dXM7XG4gICAgICAgICAgICBpZiAoc3RhdHVzID09IDIwMCkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHhoci5yZXNwb25zZSwgbnVsbCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIHN0YXR1cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHhoci5zZW5kKCk7XG4gICAgfVxufVxuIiwiaW1wb3J0ICogYXMgZDMgZnJvbSAnLi4vZDMnXG5cbi8qYmFzZWQgb246XG4gKiBnaXRodWIuY29tL3BhdG9yamsvZDMtY29udGV4dC1tZW51ICovXG5cbmV4cG9ydCBjbGFzcyBDb250ZXh0TWVudSB7XG4gICAgb3BlbkNhbGxiYWNrO1xuICAgIGNsb3NlQ2FsbGJhY2s7XG5cbiAgICBjb25zdHJ1Y3RvcihtZW51LCBvcHRzKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICBpZiAodHlwZW9mIG9wdHMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHNlbGYub3BlbkNhbGxiYWNrID0gb3B0cztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9wdHMgPSBvcHRzIHx8IHt9O1xuICAgICAgICAgICAgc2VsZi5vcGVuQ2FsbGJhY2sgPSBvcHRzLm9uT3BlbjtcbiAgICAgICAgICAgIHNlbGYuY2xvc2VDYWxsYmFjayA9IG9wdHMub25DbG9zZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgZGl2IGVsZW1lbnQgdGhhdCB3aWxsIGhvbGQgdGhlIGNvbnRleHQgbWVudVxuICAgICAgICBkMy5zZWxlY3RBbGwoJy5kMy1jb250ZXh0LW1lbnUnKS5kYXRhKFsxXSlcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2QzLWNvbnRleHQtbWVudScpO1xuXG4gICAgICAgIC8vIGNsb3NlIG1lbnVcbiAgICAgICAgZDMuc2VsZWN0KCdib2R5Jykub24oJ2NsaWNrLmQzLWNvbnRleHQtbWVudScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGQzLnNlbGVjdCgnLmQzLWNvbnRleHQtbWVudScpLnN0eWxlKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgIGlmIChzZWxmLmNsb3NlQ2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBzZWxmLmNsb3NlQ2FsbGJhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gdGhpcyBnZXRzIGV4ZWN1dGVkIHdoZW4gYSBjb250ZXh0bWVudSBldmVudCBvY2N1cnNcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChkYXRhLCBpbmRleCkge1xuICAgICAgICAgICAgdmFyIGVsbSA9IHRoaXM7XG5cbiAgICAgICAgICAgIGQzLnNlbGVjdEFsbCgnLmQzLWNvbnRleHQtbWVudScpLmh0bWwoJycpO1xuICAgICAgICAgICAgdmFyIGxpc3QgPSBkMy5zZWxlY3RBbGwoJy5kMy1jb250ZXh0LW1lbnUnKVxuICAgICAgICAgICAgICAgIC5vbignY29udGV4dG1lbnUnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3QoJy5kMy1jb250ZXh0LW1lbnUnKS5zdHlsZSgnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICAgICAgICAgIGQzLmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGQzLmV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgndWwnKTtcbiAgICAgICAgICAgIGxpc3Quc2VsZWN0QWxsKCdsaScpLmRhdGEodHlwZW9mIG1lbnUgPT09ICdmdW5jdGlvbicgPyBtZW51KGRhdGEpIDogbWVudSkuZW50ZXIoKVxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJ2xpJylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmV0ID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkLmRpdmlkZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldCArPSAnIGlzLWRpdmlkZXInO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChkLmRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXQgKz0gJyBpcy1kaXNhYmxlZCc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFkLmFjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0ICs9ICcgaXMtaGVhZGVyJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmh0bWwoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGQuZGl2aWRlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8aHI+JztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIWQudGl0bGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ05vIHRpdGxlIGF0dHJpYnV0ZSBzZXQuIENoZWNrIHRoZSBzcGVsbGluZyBvZiB5b3VyIG9wdGlvbnMuJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICh0eXBlb2YgZC50aXRsZSA9PT0gJ3N0cmluZycpID8gZC50aXRsZSA6IGQudGl0bGUoZGF0YSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGQuZGlzYWJsZWQpIHJldHVybjsgLy8gZG8gbm90aGluZyBpZiBkaXNhYmxlZFxuICAgICAgICAgICAgICAgICAgICBpZiAoIWQuYWN0aW9uKSByZXR1cm47IC8vIGhlYWRlcnMgaGF2ZSBubyBcImFjdGlvblwiXG4gICAgICAgICAgICAgICAgICAgIGQuYWN0aW9uKGVsbSwgZGF0YSwgaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3QoJy5kMy1jb250ZXh0LW1lbnUnKS5zdHlsZSgnZGlzcGxheScsICdub25lJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYuY2xvc2VDYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jbG9zZUNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gdGhlIG9wZW5DYWxsYmFjayBhbGxvd3MgYW4gYWN0aW9uIHRvIGZpcmUgYmVmb3JlIHRoZSBtZW51IGlzIGRpc3BsYXllZFxuICAgICAgICAgICAgLy8gYW4gZXhhbXBsZSB1c2FnZSB3b3VsZCBiZSBjbG9zaW5nIGEgdG9vbHRpcFxuICAgICAgICAgICAgaWYgKHNlbGYub3BlbkNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYub3BlbkNhbGxiYWNrKGRhdGEsIGluZGV4KSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gZGlzcGxheSBjb250ZXh0IG1lbnVcbiAgICAgICAgICAgIGQzLnNlbGVjdCgnLmQzLWNvbnRleHQtbWVudScpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdsZWZ0JywgKGQzLmV2ZW50LnBhZ2VYIC0gMikgKyAncHgnKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgndG9wJywgKGQzLmV2ZW50LnBhZ2VZIC0gMikgKyAncHgnKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnZGlzcGxheScsICdibG9jaycpO1xuXG4gICAgICAgICAgICBkMy5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZDMuZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHN0YXRpYyBoaWRlKCkge1xuICAgICAgICBkMy5zZWxlY3QoJy5kMy1jb250ZXh0LW1lbnUnKS5zdHlsZSgnZGlzcGxheScsICdub25lJyk7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQge0NvbnRleHRNZW51fSBmcm9tICcuL2NvbnRleHQtbWVudSdcbmltcG9ydCB7aTE4bn0gZnJvbSBcIi4uL2kxOG4vaTE4blwiO1xuXG5leHBvcnQgY2xhc3MgRWRnZUNvbnRleHRNZW51IGV4dGVuZHMgQ29udGV4dE1lbnUge1xuICAgIHRyZWVEZXNpZ25lcjtcblxuICAgIGNvbnN0cnVjdG9yKHRyZWVEZXNpZ25lcikge1xuICAgICAgICB2YXIgbWVudSA9IGZ1bmN0aW9uIChkKSB7XG5cbiAgICAgICAgICAgIHZhciBtZW51ID0gW107XG5cbiAgICAgICAgICAgIG1lbnUucHVzaCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUuZWRnZS5pbmplY3REZWNpc2lvbk5vZGUnKSxcbiAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLmluamVjdERlY2lzaW9uTm9kZShkKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbWVudS5wdXNoKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5lZGdlLmluamVjdENoYW5jZU5vZGUnKSxcbiAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLmluamVjdENoYW5jZU5vZGUoZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICByZXR1cm4gbWVudTtcbiAgICAgICAgfTtcblxuICAgICAgICBzdXBlcihtZW51KTtcbiAgICAgICAgdGhpcy50cmVlRGVzaWduZXIgPSB0cmVlRGVzaWduZXI7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtDb250ZXh0TWVudX0gZnJvbSAnLi9jb250ZXh0LW1lbnUnXG5pbXBvcnQge2RvbWFpbiBhcyBtb2RlbH0gZnJvbSAnc2QtbW9kZWwnXG5pbXBvcnQgKiBhcyBkMyBmcm9tICcuLi9kMydcbmltcG9ydCB7aTE4bn0gZnJvbSBcIi4uL2kxOG4vaTE4blwiO1xuXG5leHBvcnQgY2xhc3MgTWFpbkNvbnRleHRNZW51IGV4dGVuZHMgQ29udGV4dE1lbnUge1xuICAgIHRyZWVEZXNpZ25lcjtcblxuICAgIGNvbnN0cnVjdG9yKHRyZWVEZXNpZ25lcikge1xuICAgICAgICB2YXIgbW91c2VQb3NpdGlvbiA9IG51bGw7XG4gICAgICAgIHZhciBtZW51ID0gZnVuY3Rpb24gKGQpIHtcblxuICAgICAgICAgICAgdmFyIG1lbnUgPSBbXTtcbiAgICAgICAgICAgIG1lbnUucHVzaCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubWFpbi5hZGREZWNpc2lvbk5vZGUnKSxcbiAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld05vZGUgPSBuZXcgbW9kZWwuRGVjaXNpb25Ob2RlKG1vdXNlUG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuYWRkTm9kZShuZXdOb2RlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbWVudS5wdXNoKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5tYWluLmFkZENoYW5jZU5vZGUnKSxcbiAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld05vZGUgPSBuZXcgbW9kZWwuQ2hhbmNlTm9kZShtb3VzZVBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLmFkZE5vZGUobmV3Tm9kZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG1lbnUucHVzaCh7ZGl2aWRlcjogdHJ1ZX0pO1xuICAgICAgICAgICAgbWVudS5wdXNoKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5tYWluLmFkZFRleHQnKSxcbiAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld1RleHQgPSBuZXcgbW9kZWwuVGV4dChtb3VzZVBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLmFkZFRleHQobmV3VGV4dCk7XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBtZW51LnB1c2goe2RpdmlkZXI6IHRydWV9KTtcbiAgICAgICAgICAgIG1lbnUucHVzaCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubWFpbi5wYXN0ZScpLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIucGFzdGVUb05ld0xvY2F0aW9uKG1vdXNlUG9zaXRpb24pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICF0cmVlRGVzaWduZXIuY29waWVkTm9kZXMgfHwgIXRyZWVEZXNpZ25lci5jb3BpZWROb2Rlcy5sZW5ndGhcblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBtZW51LnB1c2goe2RpdmlkZXI6IHRydWV9KTtcblxuICAgICAgICAgICAgbWVudS5wdXNoKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5tYWluLnNlbGVjdEFsbE5vZGVzJyksXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5zZWxlY3RBbGxOb2RlcygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIG1lbnU7XG4gICAgICAgIH07XG5cbiAgICAgICAgc3VwZXIobWVudSwge29uT3BlbjogKCkgPT4ge1xuICAgICAgICAgICAgdHJlZURlc2lnbmVyLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgICAgICBtb3VzZVBvc2l0aW9uID0gbmV3IG1vZGVsLlBvaW50KGQzLm1vdXNlKHRyZWVEZXNpZ25lci5zdmcubm9kZSgpKSkubW92ZSh0cmVlRGVzaWduZXIuZ2V0TWFpbkdyb3VwVHJhbnNsYXRpb24odHJ1ZSkpO1xuXG4gICAgICAgIH19KTtcbiAgICAgICAgdGhpcy50cmVlRGVzaWduZXIgPSB0cmVlRGVzaWduZXI7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtDb250ZXh0TWVudX0gZnJvbSAnLi9jb250ZXh0LW1lbnUnXG5pbXBvcnQge2RvbWFpbiBhcyBtb2RlbH0gZnJvbSAnc2QtbW9kZWwnXG5pbXBvcnQge2kxOG59IGZyb20gXCIuLi9pMThuL2kxOG5cIjtcblxuZXhwb3J0IGNsYXNzIE5vZGVDb250ZXh0TWVudSBleHRlbmRzIENvbnRleHRNZW51IHtcbiAgICB0cmVlRGVzaWduZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcih0cmVlRGVzaWduZXIsIG9wZXJhdGlvbnNGb3JPYmplY3QpIHtcbiAgICAgICAgdmFyIG1lbnUgPSBmdW5jdGlvbiAoZCkge1xuXG4gICAgICAgICAgICB2YXIgY29weU1lbnVJdGVtID0ge1xuICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm5vZGUuY29weScpLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuc2VsZWN0Tm9kZShkLCAhdHJlZURlc2lnbmVyLmlzTm9kZVNlbGVjdGVkKGQpKTtcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLmNvcHlTZWxlY3RlZE5vZGVzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZhciBjdXRNZW51SXRlbSA9IHtcbiAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5ub2RlLmN1dCcpLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuc2VsZWN0Tm9kZShkLCAhdHJlZURlc2lnbmVyLmlzTm9kZVNlbGVjdGVkKGQpKTtcbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLmN1dFNlbGVjdGVkTm9kZXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIHBhc3RlTWVudUl0ZW0gPSB7XG4gICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubm9kZS5wYXN0ZScpLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIucGFzdGVUb05vZGUoZCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogZC5mb2xkZWQgfHwgIXRyZWVEZXNpZ25lci5jb3BpZWROb2RlcyB8fCAhdHJlZURlc2lnbmVyLmNvcGllZE5vZGVzLmxlbmd0aFxuXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIGRlbGV0ZU1lbnVJdGVtID0ge1xuICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm5vZGUuZGVsZXRlJyksXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLnNlbGVjdE5vZGUoZCwgIXRyZWVEZXNpZ25lci5pc05vZGVTZWxlY3RlZChkKSk7XG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5yZW1vdmVTZWxlY3RlZE5vZGVzKCk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB2YXIgbWVudSA9IFtdO1xuICAgICAgICAgICAgaWYgKGQudHlwZSA9PSBtb2RlbC5UZXJtaW5hbE5vZGUuJFRZUEUpIHtcbiAgICAgICAgICAgICAgICBtZW51ID0gW2NvcHlNZW51SXRlbSwgY3V0TWVudUl0ZW0sIGRlbGV0ZU1lbnVJdGVtXTtcbiAgICAgICAgICAgICAgICBOb2RlQ29udGV4dE1lbnUuYWRkTm9kZUNvbnZlcnNpb25PcHRpb25zKGQsIG1lbnUsIHRyZWVEZXNpZ25lcik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1lbnU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKCFkLmZvbGRlZCl7XG4gICAgICAgICAgICAgICAgbWVudS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubm9kZS5hZGREZWNpc2lvbk5vZGUnKSxcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuYWRkRGVjaXNpb25Ob2RlKGQpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBtZW51LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5ub2RlLmFkZENoYW5jZU5vZGUnKSxcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuYWRkQ2hhbmNlTm9kZShkKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbWVudS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGkxOG4udCgnY29udGV4dE1lbnUubm9kZS5hZGRUZXJtaW5hbE5vZGUnKSxcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuYWRkVGVybWluYWxOb2RlKGQpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBtZW51LnB1c2goe2RpdmlkZXI6IHRydWV9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbWVudS5wdXNoKGNvcHlNZW51SXRlbSk7XG4gICAgICAgICAgICBtZW51LnB1c2goY3V0TWVudUl0ZW0pO1xuICAgICAgICAgICAgbWVudS5wdXNoKHBhc3RlTWVudUl0ZW0pO1xuICAgICAgICAgICAgbWVudS5wdXNoKGRlbGV0ZU1lbnVJdGVtKTtcblxuICAgICAgICAgICAgTm9kZUNvbnRleHRNZW51LmFkZE5vZGVDb252ZXJzaW9uT3B0aW9ucyhkLCBtZW51LCB0cmVlRGVzaWduZXIpO1xuICAgICAgICAgICAgbWVudS5wdXNoKHtkaXZpZGVyOiB0cnVlfSk7XG4gICAgICAgICAgICBtZW51LnB1c2goe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm5vZGUuc2VsZWN0U3VidHJlZScpLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuc2VsZWN0U3ViVHJlZShkLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYoIWQuZm9sZGVkKXtcbiAgICAgICAgICAgICAgICBtZW51LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5ub2RlLmZvbGQnKSxcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuZm9sZFN1YnRyZWUoZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIG1lbnUucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm5vZGUudW5mb2xkJyksXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGVsbSwgZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLmZvbGRTdWJ0cmVlKGQsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihvcGVyYXRpb25zRm9yT2JqZWN0KXtcbiAgICAgICAgICAgICAgICB2YXIgb3BlcmF0aW9ucyA9IG9wZXJhdGlvbnNGb3JPYmplY3QoZCk7XG4gICAgICAgICAgICAgICAgaWYob3BlcmF0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgbWVudS5wdXNoKHtkaXZpZGVyOiB0cnVlfSk7XG4gICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvbnMuZm9yRWFjaChvcD0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVudS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi50KCdjb250ZXh0TWVudS5ub2RlLicrb3AubmFtZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5wZXJmb3JtT3BlcmF0aW9uKGQsIG9wKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhb3AuY2FuUGVyZm9ybShkKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gbWVudTtcbiAgICAgICAgfTtcblxuICAgICAgICBzdXBlcihtZW51KTtcbiAgICAgICAgdGhpcy50cmVlRGVzaWduZXIgPSB0cmVlRGVzaWduZXI7XG4gICAgfVxuXG4gICAgc3RhdGljIGFkZE5vZGVDb252ZXJzaW9uT3B0aW9ucyhkLCBtZW51LCB0cmVlRGVzaWduZXIpe1xuICAgICAgICB2YXIgY29udmVyc2lvbk9wdGlvbnMgPSBOb2RlQ29udGV4dE1lbnUuZ2V0Tm9kZUNvbnZlcnNpb25PcHRpb25zKGQsIHRyZWVEZXNpZ25lcik7XG4gICAgICAgIGlmKGNvbnZlcnNpb25PcHRpb25zLmxlbmd0aCl7XG4gICAgICAgICAgICBtZW51LnB1c2goe2RpdmlkZXI6IHRydWV9KTtcbiAgICAgICAgICAgIGNvbnZlcnNpb25PcHRpb25zLmZvckVhY2gobz0+bWVudS5wdXNoKG8pKTtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGdldE5vZGVDb252ZXJzaW9uT3B0aW9ucyhkLCB0cmVlRGVzaWduZXIpe1xuICAgICAgICB2YXIgb3B0aW9ucyA9IFtdO1xuXG4gICAgICAgIGlmKGQuZm9sZGVkKXtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBhbGxBbGxvd2VkVHlwZXMgPSBbbW9kZWwuRGVjaXNpb25Ob2RlLiRUWVBFLCBtb2RlbC5DaGFuY2VOb2RlLiRUWVBFLCBtb2RlbC5UZXJtaW5hbE5vZGUuJFRZUEVdO1xuXG4gICAgICAgIGlmKCFkLmNoaWxkRWRnZXMubGVuZ3RoICYmIGQuJHBhcmVudCl7XG4gICAgICAgICAgICBhbGxBbGxvd2VkVHlwZXMuZmlsdGVyKHQ9PnQhPT1kLnR5cGUpLmZvckVhY2godHlwZT0+e1xuICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaChOb2RlQ29udGV4dE1lbnUuZ2V0Tm9kZUNvbnZlcnNpb25PcHRpb24odHlwZSwgdHJlZURlc2lnbmVyKSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgaWYoZCBpbnN0YW5jZW9mIG1vZGVsLkRlY2lzaW9uTm9kZSl7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5wdXNoKE5vZGVDb250ZXh0TWVudS5nZXROb2RlQ29udmVyc2lvbk9wdGlvbihtb2RlbC5DaGFuY2VOb2RlLiRUWVBFLCB0cmVlRGVzaWduZXIpKVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5wdXNoKE5vZGVDb250ZXh0TWVudS5nZXROb2RlQ29udmVyc2lvbk9wdGlvbihtb2RlbC5EZWNpc2lvbk5vZGUuJFRZUEUsIHRyZWVEZXNpZ25lcikpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9wdGlvbnM7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldE5vZGVDb252ZXJzaW9uT3B0aW9uKHR5cGVUb0NvbnZlcnRUbywgdHJlZURlc2lnbmVyKXtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51Lm5vZGUuY29udmVydC4nK3R5cGVUb0NvbnZlcnRUbyksXG4gICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlbG0sIGQsIGkpIHtcbiAgICAgICAgICAgICAgICB0cmVlRGVzaWduZXIuY29udmVydE5vZGUoZCwgdHlwZVRvQ29udmVydFRvKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQge0NvbnRleHRNZW51fSBmcm9tICcuL2NvbnRleHQtbWVudSdcbmltcG9ydCB7aTE4bn0gZnJvbSBcIi4uL2kxOG4vaTE4blwiO1xuXG5leHBvcnQgY2xhc3MgVGV4dENvbnRleHRNZW51IGV4dGVuZHMgQ29udGV4dE1lbnUge1xuICAgIHRyZWVEZXNpZ25lcjtcblxuICAgIGNvbnN0cnVjdG9yKHRyZWVEZXNpZ25lcikge1xuICAgICAgICB2YXIgbWVudSA9IGZ1bmN0aW9uIChkKSB7XG5cblxuICAgICAgICAgICAgdmFyIGRlbGV0ZU1lbnVJdGVtID0ge1xuICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuLnQoJ2NvbnRleHRNZW51LnRleHQuZGVsZXRlJyksXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZWxtLCBkLCBpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdHJlZURlc2lnbmVyLnNlbGVjdFRleHQoZCwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRyZWVEZXNpZ25lci5yZW1vdmVTZWxlY3RlZFRleHRzKClcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB2YXIgbWVudSA9IFtdO1xuICAgICAgICAgICAgbWVudS5wdXNoKGRlbGV0ZU1lbnVJdGVtKTtcbiAgICAgICAgICAgIHJldHVybiBtZW51O1xuICAgICAgICB9O1xuXG4gICAgICAgIHN1cGVyKG1lbnUpO1xuICAgICAgICB0aGlzLnRyZWVEZXNpZ25lciA9IHRyZWVEZXNpZ25lcjtcbiAgICB9XG59XG4iLCJpbXBvcnQgKiBhcyBkMyBmcm9tICcuL2QzJ1xuXG5leHBvcnQgY2xhc3MgRDNFeHRlbnNpb25zIHtcblxuICAgIHN0YXRpYyBleHRlbmQoKSB7XG5cbiAgICAgICAgZDMuc2VsZWN0aW9uLnByb3RvdHlwZS5lbnRlci5wcm90b3R5cGUuaW5zZXJ0U2VsZWN0b3IgPVxuICAgICAgICAgICAgZDMuc2VsZWN0aW9uLnByb3RvdHlwZS5pbnNlcnRTZWxlY3RvciA9IGZ1bmN0aW9uIChzZWxlY3RvciwgYmVmb3JlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEQzRXh0ZW5zaW9ucy5pbnNlcnRTZWxlY3Rvcih0aGlzLCBzZWxlY3RvciwgYmVmb3JlKTtcbiAgICAgICAgICAgIH07XG5cblxuICAgICAgICBkMy5zZWxlY3Rpb24ucHJvdG90eXBlLmVudGVyLnByb3RvdHlwZS5hcHBlbmRTZWxlY3RvciA9XG4gICAgICAgICAgICBkMy5zZWxlY3Rpb24ucHJvdG90eXBlLmFwcGVuZFNlbGVjdG9yID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEQzRXh0ZW5zaW9ucy5hcHBlbmRTZWxlY3Rvcih0aGlzLCBzZWxlY3Rvcik7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIGQzLnNlbGVjdGlvbi5wcm90b3R5cGUuZW50ZXIucHJvdG90eXBlLnNlbGVjdE9yQXBwZW5kID1cbiAgICAgICAgICAgIGQzLnNlbGVjdGlvbi5wcm90b3R5cGUuc2VsZWN0T3JBcHBlbmQgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gRDNFeHRlbnNpb25zLnNlbGVjdE9yQXBwZW5kKHRoaXMsIHNlbGVjdG9yKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgZDMuc2VsZWN0aW9uLnByb3RvdHlwZS5lbnRlci5wcm90b3R5cGUuc2VsZWN0T3JJbnNlcnQgPVxuICAgICAgICAgICAgZDMuc2VsZWN0aW9uLnByb3RvdHlwZS5zZWxlY3RPckluc2VydCA9IGZ1bmN0aW9uIChzZWxlY3RvciwgYmVmb3JlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEQzRXh0ZW5zaW9ucy5zZWxlY3RPckluc2VydCh0aGlzLCBzZWxlY3RvciwgYmVmb3JlKTtcbiAgICAgICAgICAgIH07XG5cblxuICAgIH1cblxuICAgIHN0YXRpYyBpbnNlcnRPckFwcGVuZFNlbGVjdG9yKHBhcmVudCwgc2VsZWN0b3IsIG9wZXJhdGlvbiwgYmVmb3JlKSB7XG5cbiAgICAgICAgdmFyIHNlbGVjdG9yUGFydHMgPSBzZWxlY3Rvci5zcGxpdCgvKFtcXC5cXCNdKS8pO1xuICAgICAgICB2YXIgZWxlbWVudCA9IHBhcmVudFtvcGVyYXRpb25dKHNlbGVjdG9yUGFydHMuc2hpZnQoKSwgYmVmb3JlKTsvL1wiOmZpcnN0LWNoaWxkXCJcblxuICAgICAgICB3aGlsZSAoc2VsZWN0b3JQYXJ0cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICB2YXIgc2VsZWN0b3JNb2RpZmllciA9IHNlbGVjdG9yUGFydHMuc2hpZnQoKTtcbiAgICAgICAgICAgIHZhciBzZWxlY3Rvckl0ZW0gPSBzZWxlY3RvclBhcnRzLnNoaWZ0KCk7XG4gICAgICAgICAgICBpZiAoc2VsZWN0b3JNb2RpZmllciA9PT0gXCIuXCIpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5jbGFzc2VkKHNlbGVjdG9ySXRlbSwgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNlbGVjdG9yTW9kaWZpZXIgPT09IFwiI1wiKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQuYXR0cignaWQnLCBzZWxlY3Rvckl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH1cblxuICAgIHN0YXRpYyBpbnNlcnRTZWxlY3RvcihwYXJlbnQsIHNlbGVjdG9yLCBiZWZvcmUpIHtcbiAgICAgICAgcmV0dXJuIEQzRXh0ZW5zaW9ucy5pbnNlcnRPckFwcGVuZFNlbGVjdG9yKHBhcmVudCwgc2VsZWN0b3IsIFwiaW5zZXJ0XCIsIGJlZm9yZSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGFwcGVuZFNlbGVjdG9yKHBhcmVudCwgc2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIEQzRXh0ZW5zaW9ucy5pbnNlcnRPckFwcGVuZFNlbGVjdG9yKHBhcmVudCwgc2VsZWN0b3IsIFwiYXBwZW5kXCIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBzZWxlY3RPckFwcGVuZChwYXJlbnQsIHNlbGVjdG9yLCBlbGVtZW50KSB7XG4gICAgICAgIHZhciBzZWxlY3Rpb24gPSBwYXJlbnQuc2VsZWN0KHNlbGVjdG9yKTtcbiAgICAgICAgaWYgKHNlbGVjdGlvbi5lbXB0eSgpKSB7XG4gICAgICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXJlbnQuYXBwZW5kKGVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIEQzRXh0ZW5zaW9ucy5hcHBlbmRTZWxlY3RvcihwYXJlbnQsIHNlbGVjdG9yKTtcblxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzZWxlY3Rpb247XG4gICAgfTtcblxuICAgIHN0YXRpYyBzZWxlY3RPckluc2VydChwYXJlbnQsIHNlbGVjdG9yLCBiZWZvcmUpIHtcbiAgICAgICAgdmFyIHNlbGVjdGlvbiA9IHBhcmVudC5zZWxlY3Qoc2VsZWN0b3IpO1xuICAgICAgICBpZiAoc2VsZWN0aW9uLmVtcHR5KCkpIHtcbiAgICAgICAgICAgIHJldHVybiBEM0V4dGVuc2lvbnMuaW5zZXJ0U2VsZWN0b3IocGFyZW50LCBzZWxlY3RvciwgYmVmb3JlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2VsZWN0aW9uO1xuICAgIH07XG59XG4iLCJleHBvcnQgKiBmcm9tICdkMy1kaXNwYXRjaCc7XG5leHBvcnQgKiBmcm9tICdkMy1zY2FsZSc7XG5leHBvcnQgKiBmcm9tICdkMy1zZWxlY3Rpb24nO1xuZXhwb3J0ICogZnJvbSAnZDMtc2hhcGUnXG5leHBvcnQgKiBmcm9tICdkMy1kcmFnJztcbmV4cG9ydCAqIGZyb20gJ2QzLWJydXNoJ1xuZXhwb3J0ICogZnJvbSAnZDMtYXJyYXknXG5leHBvcnQgKiBmcm9tICdkMy1oaWVyYXJjaHknXG5leHBvcnQgKiBmcm9tICdkMy10aW1lLWZvcm1hdCdcbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgICBcImNvbnRleHRNZW51XCI6e1xuICAgICAgICBcIm1haW5cIjp7XG4gICAgICAgICAgICBcImFkZERlY2lzaW9uTm9kZVwiOiBcIkVudHNjaGVpZHVuZ3Nrbm90ZW4gaGluenVmw7xnZW5cIixcbiAgICAgICAgICAgIFwiYWRkQ2hhbmNlTm9kZVwiOiBcIlp1ZmFsbCBLbm90ZW4gaGluenVmw7xnZW5cIixcbiAgICAgICAgICAgIFwiYWRkVGV4dFwiOiBcIlRleHQgaGluenVmw7xnZW4gXCIsXG4gICAgICAgICAgICBcInBhc3RlXCI6IFwiRWluZsO8Z2VuXCIsXG4gICAgICAgICAgICBcInNlbGVjdEFsbE5vZGVzXCI6IFwiQWxsZSBLbm90ZW4gYXVzd8OkaGxlblwiXG4gICAgICAgIH0sXG4gICAgICAgIFwibm9kZVwiOntcbiAgICAgICAgICAgIFwiY29weVwiOiBcIktvcGllcmVuXCIsXG4gICAgICAgICAgICBcImN1dFwiOiBcIkF1c3NjaG5laWRlblwiLFxuICAgICAgICAgICAgXCJwYXN0ZVwiOiBcIkVpbmbDvGdlblwiLFxuICAgICAgICAgICAgXCJkZWxldGVcIjogXCJMw7ZzY2hlblwiLFxuICAgICAgICAgICAgXCJhZGREZWNpc2lvbk5vZGVcIjogXCJFbnRzY2hlaWR1bmdza25vdGVuIGhpbnp1ZsO8Z2VuXCIsXG4gICAgICAgICAgICBcImFkZENoYW5jZU5vZGVcIjogXCJadWZhbGwgS25vdGVuIGhpbnp1ZsO8Z2VuXCIsXG4gICAgICAgICAgICBcImFkZFRlcm1pbmFsTm9kZVwiOiBcIkVuZGtub3R0ZW4gaGluenVmw7xnZW5cIixcbiAgICAgICAgICAgIFwiY29udmVydFwiOntcbiAgICAgICAgICAgICAgICBcImRlY2lzaW9uXCI6IFwiQWxzIEVudHNjaGVpZHVuZ3Nrbm90ZW5cIixcbiAgICAgICAgICAgICAgICBcImNoYW5jZVwiOiBcIkFscyBadWZhbGwgS25vdGVuXCIsXG4gICAgICAgICAgICAgICAgXCJ0ZXJtaW5hbFwiOiBcIkFscyBFbmRrbm90ZW5cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwic2VsZWN0U3VidHJlZVwiOiBcIlRlaWxiYXVtIHfDpGhsZW5cIixcbiAgICAgICAgICAgIFwiZm9sZFwiOiBcIlRlaWxiYXVtIGZhbHRlblwiLFxuICAgICAgICAgICAgXCJ1bmZvbGRcIjogXCJUZWlsYmF1bSBlbnRmYWx0ZW5cIixcblx0XHRcdFxuICAgICAgICAgICAgXCJmbGlwU3VidHJlZVwiOiBcIlRlaWxiYXVtIHVtZHJlaGVuXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJlZGdlXCI6e1xuICAgICAgICAgICAgXCJpbmplY3REZWNpc2lvbk5vZGVcIjogXCJFbnRzY2hlaWR1bmdza25vdGVuIEluaml6aWVyZW5cIixcbiAgICAgICAgICAgIFwiaW5qZWN0Q2hhbmNlTm9kZVwiOiBcIlp1ZmFsbCBLbm90ZW4gSW5qaXppZXJlblwiXG4gICAgICAgIH0sXG4gICAgICAgIFwidGV4dFwiOntcbiAgICAgICAgICAgIFwiZGVsZXRlXCI6IFwiTMO2c2NoZW5cIlxuICAgICAgICB9XG4gICAgfSxcbiAgICBcInZhbGlkYXRpb25cIjp7XG4gICAgICAgIFwiaW5jb21wbGV0ZVBhdGhcIjogXCJQZmFkLCBkZXIgbmljaHQgbWl0IGRlbSBFbmRrbm90ZW4gZW5kZXRcIixcbiAgICAgICAgXCJwcm9iYWJpbGl0eURvTm90U3VtVXBUbzFcIjogXCJEaWUgU3VtbWUgZGVyIFdhaHJzY2hlaW5saWNoa2VpdGVuIGlzdCBuaWNodCBnbGVpY2ggMVwiLFxuICAgICAgICBcImludmFsaWRQcm9iYWJpbGl0eVwiOiBcIlVuZ8O8bHRpZ2UgV2FocnNjaGVpbmxpY2hrZWl0IGltIFp3ZWlnICN7e251bWJlcn19XCIsXG4gICAgICAgIFwiaW52YWxpZFBheW9mZlwiOiBcIlVuZ8O8bHRpZ2UgQXVzemFobHVuZyBpbiBad2VpZyAje3tudW1iZXJ9fVwiXG4gICAgfSxcbiAgICBcImdyb3dsXCI6e1xuICAgICAgICBcImJydXNoRGlzYWJsZWRcIjogXCJBdXN3YWhsYsO8cnN0ZSBkZWFrdGl2aWVydFwiLFxuICAgICAgICBcImJydXNoRW5hYmxlZFwiOiBcIkF1c3dhaGxiw7xyc3RlIGFrdGl2aWVydFwiXG4gICAgfSxcbiAgICBcInRvb2x0aXBcIjp7XG4gICAgICAgIFwibm9kZVwiOntcbiAgICAgICAgICAgIFwicGF5b2ZmXCI6IHtcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJBdXN6YWhsdW5nIHt7bnVtYmVyfX1cIixcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwie3tuYW1lfX1cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiYWdncmVnYXRlZFBheW9mZlwiOiB7XG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiQWdncmVnaWVydGUgQXVzemFobHVuZyB7e251bWJlcn19XCIsXG4gICAgICAgICAgICAgICAgXCJuYW1lZFwiOiBcIkFnZ3JlZ2llcnRlIHt7bmFtZX19XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInByb2JhYmlsaXR5VG9FbnRlclwiOiBcIldhaHJzY2hlaW5saWNoa2VpdFwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiZWRnZVwiOntcbiAgICAgICAgICAgIFwicGF5b2ZmXCI6IHtcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJBdXN6YWhsdW5nIHt7bnVtYmVyfX06IHt7dmFsdWV9fVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJ7e25hbWV9fToge3t2YWx1ZX19XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInByb2JhYmlsaXR5XCI6IFwiV2FocnNjaGVpbmxpY2hrZWl0OiB7e3ZhbHVlfX1cIlxuICAgICAgICB9XG4gICAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHM9e1xuICAgIFwiY29udGV4dE1lbnVcIjp7XG4gICAgICAgIFwibWFpblwiOntcbiAgICAgICAgICAgIFwiYWRkRGVjaXNpb25Ob2RlXCI6IFwiQWRkIERlY2lzaW9uIE5vZGVcIixcbiAgICAgICAgICAgIFwiYWRkQ2hhbmNlTm9kZVwiOiBcIkFkZCBDaGFuY2UgTm9kZVwiLFxuICAgICAgICAgICAgXCJhZGRUZXh0XCI6IFwiQWRkIFRleHRcIixcbiAgICAgICAgICAgIFwicGFzdGVcIjogXCJQYXN0ZVwiLFxuICAgICAgICAgICAgXCJzZWxlY3RBbGxOb2Rlc1wiOiBcIlNlbGVjdCBhbGwgbm9kZXNcIlxuICAgICAgICB9LFxuICAgICAgICBcIm5vZGVcIjp7XG4gICAgICAgICAgICBcImNvcHlcIjogXCJDb3B5XCIsXG4gICAgICAgICAgICBcImN1dFwiOiBcIkN1dFwiLFxuICAgICAgICAgICAgXCJwYXN0ZVwiOiBcIlBhc3RlXCIsXG4gICAgICAgICAgICBcImRlbGV0ZVwiOiBcIkRlbGV0ZVwiLFxuICAgICAgICAgICAgXCJhZGREZWNpc2lvbk5vZGVcIjogXCJBZGQgRGVjaXNpb24gTm9kZVwiLFxuICAgICAgICAgICAgXCJhZGRDaGFuY2VOb2RlXCI6IFwiQWRkIENoYW5jZSBOb2RlXCIsXG4gICAgICAgICAgICBcImFkZFRlcm1pbmFsTm9kZVwiOiBcIkFkZCBUZXJtaW5hbCBOb2RlXCIsXG4gICAgICAgICAgICBcImNvbnZlcnRcIjp7XG4gICAgICAgICAgICAgICAgXCJkZWNpc2lvblwiOiBcIkFzIERlY2lzaW9uIE5vZGVcIixcbiAgICAgICAgICAgICAgICBcImNoYW5jZVwiOiBcIkFzIENoYW5jZSBOb2RlXCIsXG4gICAgICAgICAgICAgICAgXCJ0ZXJtaW5hbFwiOiBcIkFzIFRlcm1pbmFsIE5vZGVcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwic2VsZWN0U3VidHJlZVwiOiBcIlNlbGVjdCBzdWJ0cmVlXCIsXG4gICAgICAgICAgICBcImZvbGRcIjogXCJGb2xkIHN1YnRyZWVcIixcbiAgICAgICAgICAgIFwidW5mb2xkXCI6IFwiVW5mb2xkIHN1YnRyZWVcIixcbiAgICAgICAgICAgIFwiZmxpcFN1YnRyZWVcIjogXCJGbGlwIHN1YnRyZWVcIlxuICAgICAgICB9LFxuICAgICAgICBcImVkZ2VcIjp7XG4gICAgICAgICAgICBcImluamVjdERlY2lzaW9uTm9kZVwiOiBcIkluamVjdCBEZWNpc2lvbiBOb2RlXCIsXG4gICAgICAgICAgICBcImluamVjdENoYW5jZU5vZGVcIjogXCJJbmplY3QgQ2hhbmNlIE5vZGVcIlxuICAgICAgICB9LFxuICAgICAgICBcInRleHRcIjp7XG4gICAgICAgICAgICBcImRlbGV0ZVwiOiBcIkRlbGV0ZVwiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwidmFsaWRhdGlvblwiOntcbiAgICAgICAgXCJpbmNvbXBsZXRlUGF0aFwiOiBcIlBhdGggbm90IGVuZGluZyB3aXRoIHRlcm1pbmFsIG5vZGVcIixcbiAgICAgICAgXCJwcm9iYWJpbGl0eURvTm90U3VtVXBUbzFcIjogXCJQcm9iYWJpbGl0aWVzIGRvIG5vdCBzdW0gdXAgdG8gMVwiLFxuICAgICAgICBcImludmFsaWRQcm9iYWJpbGl0eVwiOiBcIkludmFsaWQgcHJvYmFiaWxpdHkgaW4gZWRnZSAje3tudW1iZXJ9fVwiLFxuICAgICAgICBcImludmFsaWRQYXlvZmZcIjogXCJJbnZhbGlkIHBheW9mZiBpbiBlZGdlICN7e251bWJlcn19XCJcbiAgICB9LFxuICAgIFwiZ3Jvd2xcIjp7XG4gICAgICAgIFwiYnJ1c2hEaXNhYmxlZFwiOiBcIlNlbGVjdGlvbiBicnVzaCBkaXNhYmxlZFwiLFxuICAgICAgICBcImJydXNoRW5hYmxlZFwiOiBcIlNlbGVjdGlvbiBicnVzaCBlbmFibGVkXCJcbiAgICB9LFxuICAgIFwidG9vbHRpcFwiOntcbiAgICAgICAgXCJub2RlXCI6e1xuICAgICAgICAgICAgXCJwYXlvZmZcIjoge1xuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIlBheW9mZiB7e251bWJlcn19XCIsXG4gICAgICAgICAgICAgICAgXCJuYW1lZFwiOiBcInt7bmFtZX19XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImFnZ3JlZ2F0ZWRQYXlvZmZcIjoge1xuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIkFnZ3JlZ2F0ZWQgUGF5b2ZmIHt7bnVtYmVyfX1cIixcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwiQWdncmVnYXRlZCB7e25hbWV9fVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJwcm9iYWJpbGl0eVRvRW50ZXJcIjogXCJQcm9iYWJpbGl0eSB0byBlbnRlclwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiZWRnZVwiOntcbiAgICAgICAgICAgIFwicGF5b2ZmXCI6IHtcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJQYXlvZmYge3tudW1iZXJ9fToge3t2YWx1ZX19XCIsXG4gICAgICAgICAgICAgICAgXCJuYW1lZFwiOiBcInt7bmFtZX19OiB7e3ZhbHVlfX1cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwicHJvYmFiaWxpdHlcIjogXCJQcm9iYWJpbGl0eToge3t2YWx1ZX19XCJcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgICBcImNvbnRleHRNZW51XCI6e1xuICAgICAgICBcIm1haW5cIjp7XG4gICAgICAgICAgICBcImFkZERlY2lzaW9uTm9kZVwiOiBcIkFqb3V0ZXIgbm91ZCBkZSBkw6ljaXNpb25cIixcbiAgICAgICAgICAgIFwiYWRkQ2hhbmNlTm9kZVwiOiBcIkFqb3V0ZXIgbm91ZCBhbMOpYXRvaXJlXCIsXG4gICAgICAgICAgICBcImFkZFRleHRcIjogXCJBam91dGVyIGR1IHRleHRlXCIsXG4gICAgICAgICAgICBcInBhc3RlXCI6IFwiQ29sbGVyXCIsXG4gICAgICAgICAgICBcInNlbGVjdEFsbE5vZGVzXCI6IFwiU8OpbGVjdGlvbm5lciB0b3VzIGxlcyBub3Vkc1wiXG4gICAgICAgIH0sXG4gICAgICAgIFwibm9kZVwiOntcbiAgICAgICAgICAgIFwiY29weVwiOiBcIkNvcGllXCIsXG4gICAgICAgICAgICBcImN1dFwiOiBcIkNvdXBlclwiLFxuICAgICAgICAgICAgXCJwYXN0ZVwiOiBcIkNvbGxlclwiLFxuICAgICAgICAgICAgXCJkZWxldGVcIjogXCJFZmZhY2VyXCIsXG4gICAgICAgICAgICBcImFkZERlY2lzaW9uTm9kZVwiOiBcIkFqb3V0ZXIgbm91ZCBkZSBkw6ljaXNpb25cIixcbiAgICAgICAgICAgIFwiYWRkQ2hhbmNlTm9kZVwiOiBcIkFqb3V0ZXIgbm91ZCBhbMOpYXRvaXJlXCIsXG4gICAgICAgICAgICBcImFkZFRlcm1pbmFsTm9kZVwiOiBcIkFqb3V0ZXIgdW4gbm9ldWQgdGVybWluYWxcIixcbiAgICAgICAgICAgIFwiY29udmVydFwiOntcbiAgICAgICAgICAgICAgICBcImRlY2lzaW9uXCI6IFwiQ29tbWUgbm91ZCBkZSBkw6ljaXNpb25cIixcbiAgICAgICAgICAgICAgICBcImNoYW5jZVwiOiBcIkNvbW1lIG5vdWQgYWzDqWF0b2lyZVwiLFxuICAgICAgICAgICAgICAgIFwidGVybWluYWxcIjogXCJDb21tZSB1biBub2V1ZCB0ZXJtaW5hbFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJzZWxlY3RTdWJ0cmVlXCI6IFwiU8OpbGVjdGlvbm5lciB1bmUgc291cy1hcmJvcmVzY2VuY2VcIixcbiAgICAgICAgICAgIFwiZm9sZFwiOiBcIlBsaWVyIHNvdXMtYXJicmVcIixcbiAgICAgICAgICAgIFwidW5mb2xkXCI6IFwiRMOpcGxpZXIgYXJicmUgc291cy1hcmJyZVwiLFxuICAgICAgICAgICAgXCJmbGlwU3VidHJlZVwiOiBcIkJhc2N1bGVyIHNvdXMtYXJicmVcIlxuICAgICAgICB9LFxuICAgICAgICBcImVkZ2VcIjp7XG4gICAgICAgICAgICBcImluamVjdERlY2lzaW9uTm9kZVwiOiBcIkluamVjdGVyIHVuIG5vZXVkIGRlIGTDqWNpc2lvblwiLFxuICAgICAgICAgICAgXCJpbmplY3RDaGFuY2VOb2RlXCI6IFwiSW5qZWN0ZXIgdW4gbm9ldWQgZGUgY2hhbmNlXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJ0ZXh0XCI6e1xuICAgICAgICAgICAgXCJkZWxldGVcIjogXCJFZmZhY2VyXCJcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXCJ2YWxpZGF0aW9uXCI6e1xuICAgICAgICBcImluY29tcGxldGVQYXRoXCI6IFwiUGFyY291cnMgbm9uIHRlcm1pbsOpIHBhciBub2V1ZCB0ZXJtaW5hbFwiLFxuICAgICAgICBcInByb2JhYmlsaXR5RG9Ob3RTdW1VcFRvMVwiOiBcIkxhIHNvbW1lIGRlcyBwcm9iYWJpbGl0w6lzIG4nZXN0IHBhcyAxIG91IHBsdXNcIixcbiAgICAgICAgXCJpbnZhbGlkUHJvYmFiaWxpdHlcIjogXCJQcm9iYWJpbGl0w6kgaW52YWxpZGUgLSBsZSBib3JkICN7e251bWJlcn19XCIsXG4gICAgICAgIFwiaW52YWxpZFBheW9mZlwiOiBcIkF2YW50YWdlIGludmFsaWRlIC0gbGUgYm9yZCAje3tudW1iZXJ9fVwiXG4gICAgfSxcbiAgICBcImdyb3dsXCI6e1xuICAgICAgICBcImJydXNoRGlzYWJsZWRcIjogXCJCcm9zc2UgZGUgc8OpbGVjdGlvbiBkw6lzYWN0aXbDqWVcIixcbiAgICAgICAgXCJicnVzaEVuYWJsZWRcIjogXCJCcm9zc2UgZGUgc8OpbGVjdGlvbiBhY3RpdsOpZVwiXG4gICAgfSxcbiAgICBcInRvb2x0aXBcIjp7XG4gICAgICAgIFwibm9kZVwiOntcbiAgICAgICAgICAgIFwicGF5b2ZmXCI6IHtcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJBdmFudGFnZSB7e251bWJlcn19XCIsXG4gICAgICAgICAgICAgICAgXCJuYW1lZFwiOiBcInt7bmFtZX19XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImFnZ3JlZ2F0ZWRQYXlvZmZcIjoge1xuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIkF2YW50YWdlIGFncsOpZ8OpIHt7bnVtYmVyfX1cIixcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwiQWdyw6lnw6kgIHt7bmFtZX19XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInByb2JhYmlsaXR5VG9FbnRlclwiOiBcIlByb2JhYmlsaXTDqSBkJ2VudHLDqWVcIlxuICAgICAgICB9LFxuICAgICAgICBcImVkZ2VcIjp7XG4gICAgICAgICAgICBcInBheW9mZlwiOiB7XG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiQXZhbnRhZ2Uge3tudW1iZXJ9fToge3t2YWx1ZX19XCIsXG4gICAgICAgICAgICAgICAgXCJuYW1lZFwiOiBcInt7bmFtZX19OiB7e3ZhbHVlfX1cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwicHJvYmFiaWxpdHlcIjogXCJQcm9iYWJpbGl0w6k6IHt7dmFsdWV9fVwiXG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgaTE4bmV4dCBmcm9tICdpMThuZXh0JztcbmltcG9ydCAqIGFzIGVuIGZyb20gJy4vZW4uanNvbidcbmltcG9ydCAqIGFzIHBsIGZyb20gJy4vcGwuanNvbidcbmltcG9ydCAqIGFzIGl0IGZyb20gJy4vaXQuanNvbidcbmltcG9ydCAqIGFzIGRlIGZyb20gJy4vZGUuanNvbidcbmltcG9ydCAqIGFzIGZyIGZyb20gJy4vZnIuanNvbidcblxuZXhwb3J0IGNsYXNzIGkxOG57XG5cbiAgICBzdGF0aWMgJGluc3RhbmNlO1xuICAgIHN0YXRpYyBsYW5ndWFnZTtcblxuICAgIHN0YXRpYyBpbml0KGxuZyl7XG4gICAgICAgIGkxOG4ubGFuZ3VhZ2UgPSBsbmc7XG4gICAgICAgIGxldCByZXNvdXJjZXMgPSB7XG4gICAgICAgICAgICBlbjoge1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0aW9uOiBlblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBsOiB7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRpb246IHBsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXQ6IHtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGlvbjogaXRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZToge1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0aW9uOiBkZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZyOiB7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRpb246IGZyXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGkxOG4uJGluc3RhbmNlID0gaTE4bmV4dC5jcmVhdGVJbnN0YW5jZSh7XG4gICAgICAgICAgICBsbmc6IGxuZyxcbiAgICAgICAgICAgIGZhbGxiYWNrTG5nOiAnZW4nLFxuICAgICAgICAgICAgcmVzb3VyY2VzOiByZXNvdXJjZXNcbiAgICAgICAgfSwgKGVyciwgdCkgPT4ge1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgdChrZXksIG9wdCl7XG4gICAgICAgIHJldHVybiBpMThuLiRpbnN0YW5jZS50KGtleSwgb3B0KVxuICAgIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgICBcImNvbnRleHRNZW51XCI6e1xuICAgICAgICBcIm1haW5cIjp7XG4gICAgICAgICAgICBcImFkZERlY2lzaW9uTm9kZVwiOiBcIkFnZ2l1bmdpIHVuIG5vZG8gZGkgZGVjaXNpb25lXCIsXG4gICAgICAgICAgICBcImFkZENoYW5jZU5vZGVcIjogXCJBZ2dpdW5naSB1biBub2RvIG9wcG9ydHVuaXTDoFwiLFxuICAgICAgICAgICAgXCJhZGRUZXh0XCI6IFwiQWdnaXVuZ2kgdGVzdG9cIixcbiAgICAgICAgICAgIFwicGFzdGVcIjogXCJJbmNvbGxhXCIsXG4gICAgICAgICAgICBcInNlbGVjdEFsbE5vZGVzXCI6IFwiU2VsZXppb25hIHR1dHRpIGkgbm9kaVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwibm9kZVwiOntcbiAgICAgICAgICAgIFwiY29weVwiOiBcIkNvcGlhXCIsXG4gICAgICAgICAgICBcImN1dFwiOiBcIlRhZ2xpYVwiLFxuICAgICAgICAgICAgXCJwYXN0ZVwiOiBcIkluY29sbGFcIixcbiAgICAgICAgICAgIFwiZGVsZXRlXCI6IFwiQ2FuY2VsbGFcIixcbiAgICAgICAgICAgIFwiYWRkRGVjaXNpb25Ob2RlXCI6IFwiQWdnaXVuZ2kgdW4gbm9kbyBkaSBkZWNpc2lvbmVcIixcbiAgICAgICAgICAgIFwiYWRkQ2hhbmNlTm9kZVwiOiBcIkFnZ2l1bmdpIHVuIG5vZG8gb3Bwb3J0dW5pdMOgXCIsXG4gICAgICAgICAgICBcImFkZFRlcm1pbmFsTm9kZVwiOiBcIkFnZ2l1bmdpIHVuIG5vZG8gdGVybWluYWxlXCIsXG4gICAgICAgICAgICBcImNvbnZlcnRcIjp7XG4gICAgICAgICAgICAgICAgXCJkZWNpc2lvblwiOiBcIkNvbWUgRGVjaXNpb24gTm9kZVwiLFxuICAgICAgICAgICAgICAgIFwiY2hhbmNlXCI6IFwiQ29tZSBDaGFuY2UgTm9kZVwiLFxuICAgICAgICAgICAgICAgIFwidGVybWluYWxcIjogXCJDb21lIFRlcm1pbmFsIE5vZGVcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwic2VsZWN0U3VidHJlZVwiOiBcIlNlbGV6aW9uYSBTb3R0by1hbGJlcm9cIixcbiAgICAgICAgICAgIFwiZm9sZFwiOiBcIlBpZWdhIHNvdHRvLWFsYmVyb1wiLFxuICAgICAgICAgICAgXCJ1bmZvbGRcIjogXCJEaXNwaWVnYXJzaSBzb3R0by1hbGJlcm9cIixcdFx0XHRcbiAgICAgICAgICAgIFwiZmxpcFN1YnRyZWVcIjogXCJSaWJhbHRhIHNvdHRvLWFsYmVyb1wiXG4gICAgICAgIH0sXG4gICAgICAgIFwiZWRnZVwiOntcbiAgICAgICAgICAgIFwiaW5qZWN0RGVjaXNpb25Ob2RlXCI6IFwiSW5pZXR0YSBub2RvIGRpIGRlY2lzaW9uZVwiLFxuICAgICAgICAgICAgXCJpbmplY3RDaGFuY2VOb2RlXCI6IFwiSW5pZXR0YSBub2RvIG9wcG9ydHVuaXTDoFwiXG4gICAgICAgIH0sXG4gICAgICAgIFwidGV4dFwiOntcbiAgICAgICAgICAgIFwiZGVsZXRlXCI6IFwiQ2FuY2VsbGFcIlxuICAgICAgICB9XG4gICAgfSxcbiAgICBcInZhbGlkYXRpb25cIjp7XG4gICAgICAgIFwiaW5jb21wbGV0ZVBhdGhcIjogXCJQZXJjb3JzbyBzZW56YSBub2RvIHRlcm1pbmFsZVwiLFxuICAgICAgICBcInByb2JhYmlsaXR5RG9Ob3RTdW1VcFRvMVwiOiBcIkxhIHNvbW1hIGRlbGxlIHByb2JhYmlsaXTDoCDDqCBkaXZlcnNhIGRhIDFcIixcbiAgICAgICAgXCJpbnZhbGlkUHJvYmFiaWxpdHlcIjogXCJQcm9iYWJpbGl0w6Agbm9uIHZhbGlkYSAtIGJvcmRvICN7e251bWJlcn19XCIsXG4gICAgICAgIFwiaW52YWxpZFBheW9mZlwiOiBcIlNhbGRvIG5vbiB2YWxpZG8gLSBib3JkbyAje3tudW1iZXJ9fVwiXG4gICAgfSxcbiAgICBcImdyb3dsXCI6e1xuICAgICAgICBcImJydXNoRGlzYWJsZWRcIjogXCJTZWxlemlvbmUgcGVubmVsbG8gZGlzYWJpbGl0YXRhXCIsXG4gICAgICAgIFwiYnJ1c2hFbmFibGVkXCI6IFwiU2VsZXppb25lIHBlbm5lbGxvIGFiaWxpdGF0YVwiXG4gICAgfSxcbiAgICBcInRvb2x0aXBcIjp7XG4gICAgICAgIFwibm9kZVwiOntcbiAgICAgICAgICAgIFwicGF5b2ZmXCI6IHtcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJTYWxkbyB7e251bWJlcn19XCIsXG4gICAgICAgICAgICAgICAgXCJuYW1lZFwiOiBcInt7bmFtZX19XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImFnZ3JlZ2F0ZWRQYXlvZmZcIjoge1xuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIlNhbGRvIGFnZ3JlZ2F0byB7e251bWJlcn19XCIsXG4gICAgICAgICAgICAgICAgXCJuYW1lZFwiOiBcIkFnZ3JlZ2F0byB7e25hbWV9fVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJwcm9iYWJpbGl0eVRvRW50ZXJcIjogXCJQcm9iYWJpbGl0w6AgZGEgaW5zZXJpcmVcIlxuICAgICAgICB9LFxuICAgICAgICBcImVkZ2VcIjp7XG4gICAgICAgICAgICBcInBheW9mZlwiOiB7XG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiU2FsZG8ge3tudW1iZXJ9fToge3t2YWx1ZX19XCIsXG4gICAgICAgICAgICAgICAgXCJuYW1lZFwiOiBcInt7bmFtZX19OiB7e3ZhbHVlfX1cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwicHJvYmFiaWxpdHlcIjogXCJQcm9iYWJpbGl0w6A6IHt7dmFsdWV9fVwiXG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cz17XG5cbiAgICBcImNvbnRleHRNZW51XCI6e1xuICAgICAgICBcIm1haW5cIjp7XG4gICAgICAgICAgICBcImFkZERlY2lzaW9uTm9kZVwiOiBcIkRvZGFqIFfEmXplxYIgRGVjeXp5am55XCIsXG4gICAgICAgICAgICBcImFkZENoYW5jZU5vZGVcIjogXCJEb2RhaiBXxJl6ZcWCIExvc293eVwiLFxuICAgICAgICAgICAgXCJhZGRUZXh0XCI6IFwiRG9kYWogVGVrc3RcIixcbiAgICAgICAgICAgIFwicGFzdGVcIjogXCJXa2xlalwiLFxuICAgICAgICAgICAgXCJzZWxlY3RBbGxOb2Rlc1wiOiBcIlphem5hY3ogd3N6eXN0a2llIHfEmXrFgnlcIlxuICAgICAgICB9LFxuICAgICAgICBcIm5vZGVcIjp7XG4gICAgICAgICAgICBcImNvcHlcIjogXCJLb3BpdWpcIixcbiAgICAgICAgICAgIFwiY3V0XCI6IFwiV3l0bmlqXCIsXG4gICAgICAgICAgICBcInBhc3RlXCI6IFwiV2tsZWpcIixcbiAgICAgICAgICAgIFwiZGVsZXRlXCI6IFwiVXN1xYRcIixcbiAgICAgICAgICAgIFwiYWRkRGVjaXNpb25Ob2RlXCI6IFwiRG9kYWogV8SZemXFgiBEZWN5enlqbnlcIixcbiAgICAgICAgICAgIFwiYWRkQ2hhbmNlTm9kZVwiOiBcIkRvZGFqIFfEmXplxYIgTG9zb3d5XCIsXG4gICAgICAgICAgICBcImFkZFRlcm1pbmFsTm9kZVwiOiBcIkRvZGFqIFfEmXplxYIgS2/FhGNvd3lcIixcbiAgICAgICAgICAgIFwiY29udmVydFwiOntcbiAgICAgICAgICAgICAgICBcImRlY2lzaW9uXCI6IFwiSmFrbyBXxJl6ZcWCIERlY3l6eWpueVwiLFxuICAgICAgICAgICAgICAgIFwiY2hhbmNlXCI6IFwiSmFrbyBXxJl6ZcWCIExvc293eVwiLFxuICAgICAgICAgICAgICAgIFwidGVybWluYWxcIjogXCJKYWtvIFfEmXplxYIgS2/FhGNvd3lcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwic2VsZWN0U3VidHJlZVwiOiBcIlphem5hY3ogcG9kZHJ6ZXdvXCIsXG4gICAgICAgICAgICBcImZvbGRcIjogXCJad2nFhCBwb2Rkcnpld29cIixcbiAgICAgICAgICAgIFwidW5mb2xkXCI6IFwiUm96d2nFhCBwb2Rkcnpld29cIixcbiAgICAgICAgICAgIFwiZmxpcFN1YnRyZWVcIjogXCJQcnpld3LDs8SHIHBvZGRyemV3b1wiXG4gICAgICAgIH0sXG4gICAgICAgIFwiZWRnZVwiOntcbiAgICAgICAgICAgIFwiaW5qZWN0RGVjaXNpb25Ob2RlXCI6IFwiV3N0cnp5a25paiBXxJl6ZcWCIERlY3l6eWpueVwiLFxuICAgICAgICAgICAgXCJpbmplY3RDaGFuY2VOb2RlXCI6IFwiV3N0cnp5a25paiBXxJl6ZcWCIExvc293eVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwidGV4dFwiOntcbiAgICAgICAgICAgIFwiZGVsZXRlXCI6IFwiVXN1xYRcIlxuICAgICAgICB9XG4gICAgfSxcblxuICAgIFwidmFsaWRhdGlvblwiOntcbiAgICAgICAgXCJpbmNvbXBsZXRlUGF0aFwiOiBcIk9zdGF0bmltIHfEmXrFgmVtIHcgxZtjaWXFvGNlIHBvd2luaWVuIGJ5xIcgV8SZemXFgiBLb8WEY293eVwiLFxuICAgICAgICBcInByb2JhYmlsaXR5RG9Ob3RTdW1VcFRvMVwiOiBcIlByYXdkb3BvZG9iaWXFhHN0d2EgbmllIHN1bXVqxIUgc2llIGRvIDFcIixcbiAgICAgICAgXCJpbnZhbGlkUHJvYmFiaWxpdHlcIjogXCJOaWVwb3ByYXduZSBwcmF3ZG9wb2RvYmllxYRzdHdvIG5hIGtyYXfEmWR6aSAje3tudW1iZXJ9fVwiLFxuICAgICAgICBcImludmFsaWRQYXlvZmZcIjogXCJOaWVwb3ByYXduYSB3eXDFgmF0YSBuYSBrcmF3xJlkemkgI3t7bnVtYmVyfX1cIlxuICAgIH0sXG4gICAgXCJncm93bFwiOntcbiAgICAgICAgXCJicnVzaERpc2FibGVkXCI6IFwiWmF6bmFjemFuaWUgd3nFgsSFY3pvbmVcIixcbiAgICAgICAgXCJicnVzaEVuYWJsZWRcIjogXCJaYXpuYWN6YW5pZSB3xYLEhWN6b25lXCJcbiAgICB9LFxuICAgIFwidG9vbHRpcFwiOntcbiAgICAgICAgXCJub2RlXCI6e1xuICAgICAgICAgICAgXCJwYXlvZmZcIjoge1xuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIld5cMWCYXRhIHt7bnVtYmVyfX1cIixcbiAgICAgICAgICAgICAgICBcIm5hbWVkXCI6IFwie3tuYW1lfX1cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiYWdncmVnYXRlZFBheW9mZlwiOiB7XG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiWmFncmVnb3dhbmEgd3lwxYJhdGEge3tudW1iZXJ9fVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJaYWdyZWdvd2FuYSB7e25hbWV9fVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJwcm9iYWJpbGl0eVRvRW50ZXJcIjogXCJQcmF3ZG9wb2RvYmllxYRzdHdvIHdlasWbY2lhXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJlZGdlXCI6e1xuICAgICAgICAgICAgXCJwYXlvZmZcIjoge1xuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIld5cMWCYXRhIHt7bnVtYmVyfX06IHt7dmFsdWV9fVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZWRcIjogXCJ7e25hbWV9fToge3t2YWx1ZX19XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInByb2JhYmlsaXR5XCI6IFwiUHJhd2RvcG9kb2JpZcWEc3R3bzoge3t2YWx1ZX19XCJcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7RDNFeHRlbnNpb25zfSBmcm9tICcuL2QzLWV4dGVuc2lvbnMnXG5EM0V4dGVuc2lvbnMuZXh0ZW5kKCk7XG5cbmV4cG9ydCAqIGZyb20gJy4vdHJlZS1kZXNpZ25lcidcbmV4cG9ydCAqIGZyb20gJy4vYXBwLXV0aWxzJ1xuZXhwb3J0ICogZnJvbSAnLi90ZW1wbGF0ZXMnXG5leHBvcnQgKiBmcm9tICcuL3Rvb2x0aXAnXG5leHBvcnQgKiBmcm9tICcuL2QzLWV4dGVuc2lvbnMnXG5leHBvcnQge2RlZmF1bHQgYXMgZDN9IGZyb20gJy4vZDMnXG5cblxuIiwiaW1wb3J0IHtVdGlsc30gZnJvbSAnc2QtdXRpbHMnXG5pbXBvcnQge2RvbWFpbiBhcyBtb2RlbH0gZnJvbSAnc2QtbW9kZWwnXG5pbXBvcnQgKiBhcyBkMyBmcm9tICcuL2QzJ1xuaW1wb3J0IGNpcmNsZVN5bWJvbCBmcm9tICcuL3N5bWJvbHMvY2lyY2xlJ1xuaW1wb3J0IHRyaWFuZ2xlU3ltYm9sIGZyb20gJy4vc3ltYm9scy90cmlhbmdsZSdcbmltcG9ydCB7QXBwVXRpbHN9IGZyb20gXCIuL2FwcC11dGlsc1wiO1xuXG4vKlRyZWUgbGF5b3V0IG1hbmFnZXIqL1xuZXhwb3J0IGNsYXNzIExheW91dHtcblxuICAgIHRyZWVEZXNpZ25lcjtcbiAgICBkYXRhO1xuICAgIGNvbmZpZztcblxuICAgIG5vZGVUeXBlVG9TeW1ib2wgPSB7XG4gICAgICAgICdkZWNpc2lvbic6IGQzLnN5bWJvbFNxdWFyZSxcbiAgICAgICAgJ2NoYW5jZSc6IGNpcmNsZVN5bWJvbCxcbiAgICAgICAgXCJ0ZXJtaW5hbFwiOiB0cmlhbmdsZVN5bWJvbFxuICAgIH07XG5cbiAgICBzdGF0aWMgTUFOVUFMX0xBWU9VVF9OQU1FID0gJ21hbnVhbCc7XG5cblxuICAgIG9uQXV0b0xheW91dENoYW5nZWQ9W107XG5cbiAgICBub2RlVHlwZU9yZGVyID0ge1xuICAgICAgICAnZGVjaXNpb24nIDogMCxcbiAgICAgICAgJ2NoYW5jZSc6IDAsXG4gICAgICAgICd0ZXJtaW5hbCc6IDFcbiAgICB9O1xuXG4gICAgdHJlZU1hcmdpbiA9IDUwO1xuICAgIHRhcmdldFN5bWJvbFNpemU9e307XG4gICAgbm9kZVNlcGFyYXRpb24gPSAoYSwgYikgPT4gYS5wYXJlbnQgPT09IGIucGFyZW50ID8gMSA6IDEuMlxuXG4gICAgY29uc3RydWN0b3IodHJlZURlc2lnbmVyLCBkYXRhLCBjb25maWcpe1xuICAgICAgICB0aGlzLnRyZWVEZXNpZ25lciA9IHRyZWVEZXNpZ25lcjtcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XG5cbiAgICB9XG5cbiAgICB1cGRhdGUobm9kZSl7XG4gICAgICAgIGlmKG5vZGUgJiYgbm9kZS4kcGFyZW50KXtcbiAgICAgICAgICAgIG5vZGUuJHBhcmVudC5jaGlsZEVkZ2VzLnNvcnQoKGEsYik9PmEuY2hpbGROb2RlLmxvY2F0aW9uLnkgLSBiLmNoaWxkTm9kZS5sb2NhdGlvbi55KVxuICAgICAgICB9XG4gICAgICAgIGlmKCF0aGlzLmlzTWFudWFsTGF5b3V0KCkpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXV0b0xheW91dCh0aGlzLmNvbmZpZy50eXBlLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZihub2RlKXtcbiAgICAgICAgICAgIHRoaXMubW92ZU5vZGVUb0VtcHR5UGxhY2Uobm9kZSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy50cmVlRGVzaWduZXIucmVkcmF3KHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNNYW51YWxMYXlvdXQoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLnR5cGUgPT09IExheW91dC5NQU5VQUxfTEFZT1VUX05BTUU7XG4gICAgfVxuXG4gICAgZ2V0TmV3Q2hpbGRMb2NhdGlvbihwYXJlbnQpe1xuICAgICAgICBpZighcGFyZW50KXtcbiAgICAgICAgICAgIHJldHVybiBuZXcgbW9kZWwuUG9pbnQodGhpcy5nZXROb2RlTWluWCgpLCB0aGlzLmdldE5vZGVNaW5ZKCkpXG4gICAgICAgIH1cbiAgICAgICAgdmFyIHggPSBwYXJlbnQubG9jYXRpb24ueCArIHRoaXMuY29uZmlnLmdyaWRXaWR0aDtcbiAgICAgICAgdmFyIHkgPSBwYXJlbnQubG9jYXRpb24ueTtcbiAgICAgICAgaWYocGFyZW50LmNoaWxkRWRnZXMubGVuZ3RoKXtcbiAgICAgICAgICAgIHkgPSBwYXJlbnQuY2hpbGRFZGdlc1twYXJlbnQuY2hpbGRFZGdlcy5sZW5ndGgtMV0uY2hpbGROb2RlLmxvY2F0aW9uLnkrMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgbW9kZWwuUG9pbnQoeCwgeSlcbiAgICB9XG5cbiAgICBnZXRJbmplY3RlZE5vZGVMb2NhdGlvbihlZGdlKXtcblxuICAgICAgICB2YXIgcCA9IGVkZ2UuJGxpbmVQb2ludHNbMl07XG5cbiAgICAgICAgcmV0dXJuIG5ldyBtb2RlbC5Qb2ludChwWzBdLCBwWzFdKVxuICAgIH1cblxuICAgIG1vdmVOb2RlVG9FbXB0eVBsYWNlKG5vZGUsIHJlZHJhd0lmQ2hhbmdlZD10cnVlKXtcbiAgICAgICAgdmFyIHBvc2l0aW9uTWFwID0ge307XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgbm9kZS5sb2NhdGlvbi54ID0gTWF0aC5tYXgodGhpcy5nZXROb2RlTWluWChub2RlKSwgbm9kZS5sb2NhdGlvbi54KTtcbiAgICAgICAgbm9kZS5sb2NhdGlvbi55ID0gTWF0aC5tYXgodGhpcy5nZXROb2RlTWluWShub2RlKSwgbm9kZS5sb2NhdGlvbi55KTtcblxuXG4gICAgICAgIHRoaXMubm9kZXNTb3J0ZWRCeVggPSB0aGlzLmRhdGEubm9kZXMuc2xpY2UoKTtcbiAgICAgICAgdGhpcy5ub2Rlc1NvcnRlZEJ5WC5zb3J0KChhLGIpPT5hLmxvY2F0aW9uLnggLSBiLmxvY2F0aW9uLngpO1xuXG4gICAgICAgIGZ1bmN0aW9uIGZpbmRDb2xsaWRpbmdOb2RlKG5vZGUsIGxvY2F0aW9uKXtcbiAgICAgICAgICAgIHJldHVybiBVdGlscy5maW5kKHNlbGYubm9kZXNTb3J0ZWRCeVgsIG49PntcbiAgICAgICAgICAgICAgICBpZihub2RlID09IG4pe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIG1hcmdpbiA9IHNlbGYuY29uZmlnLm5vZGVTaXplLzM7XG4gICAgICAgICAgICAgICAgdmFyIHggPSBuLmxvY2F0aW9uLng7XG4gICAgICAgICAgICAgICAgdmFyIHkgPSBuLmxvY2F0aW9uLnk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKGxvY2F0aW9uLnggLSBtYXJnaW4gPD0geCAmJiBsb2NhdGlvbi54ICsgbWFyZ2luID49IHhcbiAgICAgICAgICAgICAgICAgICAgJiYgbG9jYXRpb24ueSAtIG1hcmdpbiA8PSB5ICYmIGxvY2F0aW9uLnkgKyBtYXJnaW4gPj0geSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHN0ZXBYID0gdGhpcy5jb25maWcubm9kZVNpemUvMjtcbiAgICAgICAgdmFyIHN0ZXBZID0gdGhpcy5jb25maWcubm9kZVNpemUrMTA7XG4gICAgICAgIHZhciBzdGVwWHNhbWVQYXJlbnQgPSAwO1xuICAgICAgICB2YXIgc3RlcFlzYW1lUGFyZW50ID0gNzU7XG4gICAgICAgIHZhciBjaGFuZ2VkID0gZmFsc2U7XG4gICAgICAgIHZhciBjb2xpZGluZ05vZGU7XG4gICAgICAgIHZhciBuZXdMb2NhdGlvbiA9IG5ldyBtb2RlbC5Qb2ludChub2RlLmxvY2F0aW9uKTtcbiAgICAgICAgd2hpbGUoY29saWRpbmdOb2RlID0gZmluZENvbGxpZGluZ05vZGUobm9kZSwgbmV3TG9jYXRpb24pKXtcbiAgICAgICAgICAgIGNoYW5nZWQ9dHJ1ZTtcbiAgICAgICAgICAgIHZhciBzYW1lUGFyZW50ID0gbm9kZS4kcGFyZW50ICYmIGNvbGlkaW5nTm9kZS4kcGFyZW50ICYmIG5vZGUuJHBhcmVudD09PWNvbGlkaW5nTm9kZS4kcGFyZW50O1xuICAgICAgICAgICAgaWYoc2FtZVBhcmVudCl7XG4gICAgICAgICAgICAgICAgbmV3TG9jYXRpb24ubW92ZShzdGVwWHNhbWVQYXJlbnQsIHN0ZXBZc2FtZVBhcmVudCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBuZXdMb2NhdGlvbi5tb3ZlKHN0ZXBYLCBzdGVwWSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYoY2hhbmdlZCl7XG4gICAgICAgICAgICBub2RlLm1vdmVUbyhuZXdMb2NhdGlvbi54LG5ld0xvY2F0aW9uLnksIHRydWUpO1xuICAgICAgICAgICAgaWYocmVkcmF3SWZDaGFuZ2VkKXtcbiAgICAgICAgICAgICAgICB0aGlzLnRyZWVEZXNpZ25lci5yZWRyYXcodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkaXNhYmxlQXV0b0xheW91dCgpe1xuICAgICAgICB0aGlzLmNvbmZpZy50eXBlID0gTGF5b3V0Lk1BTlVBTF9MQVlPVVRfTkFNRTtcbiAgICAgICAgdGhpcy5fZmlyZU9uQXV0b0xheW91dENoYW5nZWRDYWxsYmFja3MoKTtcbiAgICB9XG5cblxuICAgIG5vZGVTeW1ib2xTaXplID0ge307XG4gICAgZHJhd05vZGVTeW1ib2wocGF0aCwgdHJhbnNpdGlvbil7XG5cbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgbm9kZVNpemUgPSB0aGlzLmNvbmZpZy5ub2RlU2l6ZTtcbiAgICAgICAgdGhpcy5ub2RlU3ltYm9sID0gZDMuc3ltYm9sKCkudHlwZShkPT4gc2VsZi5ub2RlVHlwZVRvU3ltYm9sW2QudHlwZV0pXG4gICAgICAgICAgICAuc2l6ZShkPT5zZWxmLm5vZGVTeW1ib2xTaXplW2QuJGlkXSA/IFV0aWxzLmdldChzZWxmLnRhcmdldFN5bWJvbFNpemUsIGQudHlwZStcIlsnXCIrc2VsZi5jb25maWcubm9kZVNpemUrXCInXVwiLCA2NCkgOiA2NCk7XG5cbiAgICAgICAgcGF0aFxuICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICB2YXIgcGF0aCA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgICAgICAgICB2YXIgcHJldiA9IHBhdGguYXR0cihcImRcIik7XG4gICAgICAgICAgICAgICAgaWYoIXByZXYpe1xuICAgICAgICAgICAgICAgICAgICBwYXRoLmF0dHIoXCJkXCIsIHNlbGYubm9kZVN5bWJvbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBzaXplID0gVXRpbHMuZ2V0KHNlbGYudGFyZ2V0U3ltYm9sU2l6ZSwgZC50eXBlK1wiWydcIitzZWxmLmNvbmZpZy5ub2RlU2l6ZStcIiddXCIpO1xuICAgICAgICAgICAgICAgIGlmKCFzaXplKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJveCA9IHBhdGgubm9kZSgpLmdldEJCb3goKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9yID0gTWF0aC5taW4obm9kZVNpemUgLyBib3gud2lkdGgsIG5vZGVTaXplIC8gYm94LmhlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgIHNpemUgPSBlcnJvciAqIGVycm9yICogKHNlbGYubm9kZVN5bWJvbFNpemVbZC4kaWRdfHw2NCk7XG4gICAgICAgICAgICAgICAgICAgIFV0aWxzLnNldChzZWxmLnRhcmdldFN5bWJvbFNpemUsIGQudHlwZStcIlsnXCIrc2VsZi5jb25maWcubm9kZVNpemUrXCInXVwiLCBzaXplKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYodHJhbnNpdGlvbil7XG4gICAgICAgICAgICAgICAgICAgIHBhdGggPSAgcGF0aC50cmFuc2l0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5ub2RlU3ltYm9sU2l6ZVtkLiRpZF0gPSBzaXplO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwYXRoLmF0dHIoXCJkXCIsIHNlbGYubm9kZVN5bWJvbCk7XG4gICAgICAgICAgICAgICAgaWYodHJhbnNpdGlvbil7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubm9kZVN5bWJvbFNpemVbZC4kaWRdID0gc2l6ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBub2RlTGFiZWxQb3NpdGlvbihzZWxlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIHNlbGVjdGlvblxuICAgICAgICAgICAgLmF0dHIoJ3gnLCAwKVxuICAgICAgICAgICAgLmF0dHIoJ3knLCAtdGhpcy5jb25maWcubm9kZVNpemUgLyAyIC0gNylcbiAgICB9XG5cbiAgICBub2RlUGF5b2ZmUG9zaXRpb24oc2VsZWN0aW9uKSB7XG4gICAgICAgIHJldHVybiBMYXlvdXQuc2V0SGFuZ2luZ1Bvc2l0aW9uKHNlbGVjdGlvbilcbiAgICAgICAgICAgIC5hdHRyKCd4JywgMClcbiAgICAgICAgICAgIC5hdHRyKCd5JywgdGhpcy5jb25maWcubm9kZVNpemUgLyAyICsgNylcbiAgICAgICAgICAgIC5hdHRyKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKVxuICAgIH1cblxuICAgIG5vZGVBZ2dyZWdhdGVkUGF5b2ZmUG9zaXRpb24oc2VsZWN0aW9uKSB7XG4gICAgICAgIHZhciB4ID0gdGhpcy5jb25maWcubm9kZVNpemUgLyAyICsgNztcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBzZWxlY3Rpb25cbiAgICAgICAgICAgIC5hdHRyKCd4JywgeClcbiAgICAgICAgICAgIC5hdHRyKCd5JywgZnVuY3Rpb24oZCl7XG4gICAgICAgICAgICAgICAgbGV0IGZvbnRTaXplID0gcGFyc2VJbnQoQXBwVXRpbHMuZ2V0Rm9udFNpemUodGhpcykpO1xuICAgICAgICAgICAgICAgIGxldCBpdGVtcyA9IGQuZGlzcGxheVZhbHVlKCdhZ2dyZWdhdGVkUGF5b2ZmJyk7XG4gICAgICAgICAgICAgICAgbGV0IG51bWJlciA9IFV0aWxzLmlzQXJyYXkoaXRlbXMpID8gaXRlbXMuZmlsdGVyKGl0PT5pdCAhPT0gdW5kZWZpbmVkKS5sZW5ndGggOiAxO1xuICAgICAgICAgICAgICAgIGlmKG51bWJlcj4xKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC10aGlzLmdldEJCb3goKS5oZWlnaHQvMiArIGZvbnRTaXplLzI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAtTWF0aC5tYXgoMiwgMS44KiBzZWxmLmNvbmZpZy5ub2RlU2l6ZS9mb250U2l6ZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBzZWxlY3Rpb24uc2VsZWN0QWxsKCd0c3BhbicpLmF0dHIoJ3gnLCB4KTtcbiAgICAgICAgcmV0dXJuIHNlbGVjdGlvbjtcbiAgICAgICAgICAgIC8vIC5hdHRyKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKVxuICAgICAgICAgICAgLy8gLmF0dHIoJ2RvbWluYW50LWJhc2VsaW5lJywgJ2hhbmdpbmcnKVxuICAgIH1cblxuICAgIG5vZGVQcm9iYWJpbGl0eVRvRW50ZXJQb3NpdGlvbihzZWxlY3Rpb24pIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiBMYXlvdXQuc2V0SGFuZ2luZ1Bvc2l0aW9uKHNlbGVjdGlvbilcbiAgICAgICAgICAgIC5hdHRyKCd4JywgdGhpcy5jb25maWcubm9kZVNpemUgLyAyICsgNylcbiAgICAgICAgICAgIC5hdHRyKCd5JywgZnVuY3Rpb24oZCl7XG4gICAgICAgICAgICAgICAgbGV0IGZvbnRTaXplID0gcGFyc2VJbnQoQXBwVXRpbHMuZ2V0Rm9udFNpemUodGhpcykpO1xuICAgICAgICAgICAgICAgIGxldCBhZ2dyZWdhdGVkUGF5b2ZmcyA9IGQuZGlzcGxheVZhbHVlKCdhZ2dyZWdhdGVkUGF5b2ZmJyk7XG4gICAgICAgICAgICAgICAgbGV0IGFnZ3JlZ2F0ZWRQYXlvZmZzTnVtYmVyID0gVXRpbHMuaXNBcnJheShhZ2dyZWdhdGVkUGF5b2ZmcykgPyBhZ2dyZWdhdGVkUGF5b2Zmcy5maWx0ZXIoaXQ9Pml0ICE9PSB1bmRlZmluZWQpLmxlbmd0aCA6IDE7XG4gICAgICAgICAgICAgICAgaWYoYWdncmVnYXRlZFBheW9mZnNOdW1iZXI+MSl7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZvbnRTaXplKjAuNlxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLm1heCgyLCAxLjgqIHNlbGYuY29uZmlnLm5vZGVTaXplL2ZvbnRTaXplKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAvLyAuYXR0cigndGV4dC1hbmNob3InLCAnbWlkZGxlJylcbiAgICAgICAgICAgIC8vIC5hdHRyKCdkb21pbmFudC1iYXNlbGluZScsICdjZW50cmFsJylcbiAgICB9XG5cbiAgICBub2RlSW5kaWNhdG9yUG9zaXRpb24oc2VsZWN0aW9uKSB7XG4gICAgICAgIHJldHVybiBzZWxlY3Rpb25cbiAgICAgICAgICAgIC5hdHRyKCd4JywgdGhpcy5jb25maWcubm9kZVNpemUgLyAyICsgOClcbiAgICAgICAgICAgIC5hdHRyKCd5JywgLSB0aGlzLmNvbmZpZy5ub2RlU2l6ZS8yKVxuICAgICAgICAgICAgLmF0dHIoJ2RvbWluYW50LWJhc2VsaW5lJywgJ2NlbnRyYWwnKVxuICAgICAgICAgICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXG4gICAgfVxuXG4gICAgbm9kZVVuZm9sZEJ1dHRvblBvc2l0aW9uKHNlbGVjdGlvbikge1xuXG4gICAgICAgIHJldHVybiBzZWxlY3Rpb25cbiAgICAgICAgICAgIC5hdHRyKCd4JywgdGhpcy5jb25maWcubm9kZVNpemUgLyAyICsgNSlcbiAgICAgICAgICAgIC5hdHRyKCd5JywgMClcbiAgICAgICAgICAgIC5hdHRyKCdkb21pbmFudC1iYXNlbGluZScsICdjZW50cmFsJylcbiAgICB9XG5cbiAgICBlZGdlTGluZUQoZWRnZSl7XG4gICAgICAgIHZhciBsaW5lID0gZDMubGluZSgpXG4gICAgICAgICAgICAueChkPT4gZFswXSlcbiAgICAgICAgICAgIC55KGQ9PiBkWzFdKTtcbiAgICAgICAgLy8gLmN1cnZlKGQzLmN1cnZlQ2F0bXVsbFJvbS5hbHBoYSgwLjUpKTtcblxuXG4gICAgICAgIHZhciBwYXJlbnROb2RlID0gZWRnZS5wYXJlbnROb2RlO1xuICAgICAgICB2YXIgY2hpbGROb2RlID0gZWRnZS5jaGlsZE5vZGU7XG5cbiAgICAgICAgdmFyIGRYID0gY2hpbGROb2RlLmxvY2F0aW9uLnggLSBwYXJlbnROb2RlLmxvY2F0aW9uLng7XG4gICAgICAgIHZhciBkWSA9IGNoaWxkTm9kZS5sb2NhdGlvbi55IC0gcGFyZW50Tm9kZS5sb2NhdGlvbi55O1xuXG4gICAgICAgIHZhciBzaWduID0gZFg+PTAgPyAxIDogLTE7XG5cbiAgICAgICAgdmFyIHNsYW50U3RhcnRYT2Zmc2V0ID0gTWF0aC5taW4oZFgvMiwgdGhpcy5jb25maWcubm9kZVNpemUvMisxMCk7XG4gICAgICAgIHZhciBzbGFudFdpZHRoID0gTWF0aC5taW4odGhpcy5jb25maWcuZWRnZVNsYW50V2lkdGhNYXgsIE1hdGgubWF4KGRYLzIgLSBzbGFudFN0YXJ0WE9mZnNldCwgMCkpO1xuXG4gICAgICAgIHZhciBwb2ludDEgPSBbcGFyZW50Tm9kZS5sb2NhdGlvbi54ICt0aGlzLmNvbmZpZy5ub2RlU2l6ZS8yICsgMSwgcGFyZW50Tm9kZS5sb2NhdGlvbi55XTtcbiAgICAgICAgdmFyIHBvaW50MiA9IFtNYXRoLm1heChwYXJlbnROb2RlLmxvY2F0aW9uLngrc2xhbnRTdGFydFhPZmZzZXQsIHBvaW50MVswXSksIHBhcmVudE5vZGUubG9jYXRpb24ueV07XG4gICAgICAgIHZhciBwb2ludDMgPSBbcGFyZW50Tm9kZS5sb2NhdGlvbi54K3NsYW50U3RhcnRYT2Zmc2V0K3NsYW50V2lkdGgsIGNoaWxkTm9kZS5sb2NhdGlvbi55XTtcbiAgICAgICAgdmFyIHBvaW50NCA9IFtjaGlsZE5vZGUubG9jYXRpb24ueCAtIChzaWduKihNYXRoLm1heCgwLCBNYXRoLm1pbih0aGlzLmNvbmZpZy5ub2RlU2l6ZS8yKzgsIGRYLzIpKSkpLCBjaGlsZE5vZGUubG9jYXRpb24ueV07XG4gICAgICAgIC8vIHZhciBwb2ludDIgPSBbcGFyZW50Tm9kZS5sb2NhdGlvbi54K2RYLzItc2xhbnRXaWR0aC8yLCBwYXJlbnROb2RlLmxvY2F0aW9uLnldO1xuICAgICAgICAvLyB2YXIgcG9pbnQzID0gW2NoaWxkTm9kZS5sb2NhdGlvbi54LShkWC8yLXNsYW50V2lkdGgvMiksIGNoaWxkTm9kZS5sb2NhdGlvbi55XTtcblxuICAgICAgICBlZGdlLiRsaW5lUG9pbnRzID0gW3BvaW50MSwgcG9pbnQyLCBwb2ludDMsIHBvaW50NF07XG4gICAgICAgIHJldHVybiBsaW5lKGVkZ2UuJGxpbmVQb2ludHMpO1xuICAgIH1cblxuICAgIGVkZ2VQYXlvZmZQb3NpdGlvbihzZWxlY3Rpb24pIHtcbiAgICAgICAgTGF5b3V0LnNldEhhbmdpbmdQb3NpdGlvbihzZWxlY3Rpb24pXG4gICAgICAgICAgICAuYXR0cigneCcsIGQ9PmQuJGxpbmVQb2ludHNbMl1bMF0gKyAyKVxuICAgICAgICAgICAgLmF0dHIoJ3knLCBkPT5kLiRsaW5lUG9pbnRzWzJdWzFdICsgNyk7XG5cbiAgICAgICAgc2VsZWN0aW9uLnNlbGVjdEFsbCgndHNwYW4nKS5hdHRyKCd4JywgZnVuY3Rpb24oZCl7XG4gICAgICAgICAgICByZXR1cm4gZDMuc2VsZWN0KHRoaXMucGFyZW50Tm9kZSkuZGF0dW0oKS4kbGluZVBvaW50c1syXVswXSArIDJcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzZWxlY3Rpb247XG5cbiAgICB9XG5cbiAgICBlZGdlTGFiZWxQb3NpdGlvbihzZWxlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIHNlbGVjdGlvblxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGQ9Pid0cmFuc2xhdGUoJysoZC4kbGluZVBvaW50c1syXVswXSArIDIpKycsJysoZC4kbGluZVBvaW50c1syXVsxXSAtIDcpKycpJylcbiAgICAgICAgICAgIC8vIC5hdHRyKCd4JywgZD0+ZC4kbGluZVBvaW50c1syXVswXSArIDIpXG4gICAgICAgICAgICAvLyAuYXR0cigneScsIGQ9PmQuJGxpbmVQb2ludHNbMl1bMV0gLSA3KVxuXG4gICAgfVxuXG4gICAgZWRnZVByb2JhYmlsaXR5UG9zaXRpb24oc2VsZWN0aW9uKSB7XG4gICAgICAgIHJldHVybiBMYXlvdXQuc2V0SGFuZ2luZ1Bvc2l0aW9uKHNlbGVjdGlvbilcbiAgICAgICAgICAgIC5hdHRyKCd4JywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICB2YXIgbGVuID0gdGhpcy5nZXRDb21wdXRlZFRleHRMZW5ndGgoKTtcbiAgICAgICAgICAgICAgICB2YXIgbWluID0gZC4kbGluZVBvaW50c1syXVswXSArIDIgKyB0aGlzLnByZXZpb3VzU2libGluZy5jaGlsZE5vZGVzWzBdLmdldENvbXB1dGVkVGV4dExlbmd0aCgpICsgNyArIGxlbjtcbiAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5tYXgobWluLCBkLiRsaW5lUG9pbnRzWzNdWzBdIC0gOCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmF0dHIoJ3knLCBkPT5kLiRsaW5lUG9pbnRzWzJdWzFdICsgNylcbiAgICB9XG5cbiAgICBnZXRNaW5NYXJnaW5CZXR3ZWVuTm9kZXMoKXtcbiAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5ub2RlU2l6ZSArIDMwO1xuICAgIH1cblxuXG4gICAgZ2V0Tm9kZU1pblgoZCl7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgaWYoZCAmJiBkLiRwYXJlbnQpey8vICYmICFzZWxmLmlzTm9kZVNlbGVjdGVkKGQuJHBhcmVudClcbiAgICAgICAgICAgIHJldHVybiBkLiRwYXJlbnQubG9jYXRpb24ueCArIHNlbGYuZ2V0TWluTWFyZ2luQmV0d2Vlbk5vZGVzKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNlbGYuY29uZmlnLm5vZGVTaXplLzI7XG4gICAgfVxuXG4gICAgZ2V0Tm9kZU1pblkoZCl7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5ub2RlU2l6ZS8yO1xuICAgIH1cblxuICAgIGdldE5vZGVNYXhYKGQpe1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgaWYoZCAmJiBkLmNoaWxkRWRnZXMubGVuZ3RoKXtcbiAgICAgICAgICAgIHJldHVybiBkMy5taW4oZC5jaGlsZEVkZ2VzLCBlPT4hZS5jaGlsZE5vZGUuJGhpZGRlbiA/IGUuY2hpbGROb2RlLmxvY2F0aW9uLnggOiA5OTk5OTk5KS1zZWxmLmdldE1pbk1hcmdpbkJldHdlZW5Ob2RlcygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiA5OTk5OTk5O1xuICAgIH1cblxuICAgIHNldEdyaWRXaWR0aCh3aWR0aCwgd2l0aG91dFN0YXRlU2F2aW5nKXtcbiAgICAgICAgdmFyIHNlbGY9dGhpcztcbiAgICAgICAgaWYodGhpcy5jb25maWcuZ3JpZFdpZHRoPT09d2lkdGgpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmKCF3aXRob3V0U3RhdGVTYXZpbmcpe1xuICAgICAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSh7XG4gICAgICAgICAgICAgICAgZGF0YTp7XG4gICAgICAgICAgICAgICAgICAgIGdyaWRXaWR0aDogc2VsZi5jb25maWcuZ3JpZFdpZHRoXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvblVuZG86IChkYXRhKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRHcmlkV2lkdGgoZGF0YS5ncmlkV2lkdGgsIHRydWUpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25SZWRvOiAoZGF0YSk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0R3JpZFdpZHRoKHdpZHRoLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29uZmlnLmdyaWRXaWR0aD13aWR0aDtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG5cbiAgICBzZXRHcmlkSGVpZ2h0KGdyaWRIZWlnaHQsIHdpdGhvdXRTdGF0ZVNhdmluZyl7XG4gICAgICAgIHZhciBzZWxmPXRoaXM7XG4gICAgICAgIGlmKHRoaXMuY29uZmlnLmdyaWRIZWlnaHQ9PT1ncmlkSGVpZ2h0KXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZighd2l0aG91dFN0YXRlU2F2aW5nKXtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoe1xuICAgICAgICAgICAgICAgIGRhdGE6e1xuICAgICAgICAgICAgICAgICAgICBncmlkSGVpZ2h0OiBzZWxmLmNvbmZpZy5ncmlkSGVpZ2h0XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvblVuZG86IChkYXRhKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRHcmlkSGVpZ2h0KGRhdGEuZ3JpZEhlaWdodCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvblJlZG86IChkYXRhKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRHcmlkSGVpZ2h0KGdyaWRIZWlnaHQsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb25maWcuZ3JpZEhlaWdodD1ncmlkSGVpZ2h0O1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cblxuICAgIHNldE5vZGVTaXplKG5vZGVTaXplLCB3aXRob3V0U3RhdGVTYXZpbmcpe1xuICAgICAgICB2YXIgc2VsZj10aGlzO1xuICAgICAgICBpZih0aGlzLmNvbmZpZy5ub2RlU2l6ZT09PW5vZGVTaXplKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZighd2l0aG91dFN0YXRlU2F2aW5nKXtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoe1xuICAgICAgICAgICAgICAgIGRhdGE6e1xuICAgICAgICAgICAgICAgICAgICBub2RlU2l6ZTogc2VsZi5jb25maWcubm9kZVNpemVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uVW5kbzogKGRhdGEpPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldE5vZGVTaXplKGRhdGEubm9kZVNpemUsIHRydWUpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25SZWRvOiAoZGF0YSk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0Tm9kZVNpemUobm9kZVNpemUsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb25maWcubm9kZVNpemU9bm9kZVNpemU7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgIGlmKHRoaXMuaXNNYW51YWxMYXlvdXQoKSl7XG4gICAgICAgICAgICB0aGlzLmZpdE5vZGVzSW5QbG90dGluZ1JlZ2lvbihzZWxmLmRhdGEuZ2V0Um9vdHMoKSk7XG4gICAgICAgICAgICB0aGlzLnRyZWVEZXNpZ25lci5yZWRyYXcodHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRFZGdlU2xhbnRXaWR0aE1heCh3aWR0aCwgd2l0aG91dFN0YXRlU2F2aW5nKXtcbiAgICAgICAgdmFyIHNlbGY9dGhpcztcbiAgICAgICAgaWYodGhpcy5jb25maWcuZWRnZVNsYW50V2lkdGhNYXg9PT13aWR0aCl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYoIXdpdGhvdXRTdGF0ZVNhdmluZyl7XG4gICAgICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKHtcbiAgICAgICAgICAgICAgICBkYXRhOntcbiAgICAgICAgICAgICAgICAgICAgZWRnZVNsYW50V2lkdGhNYXg6IHNlbGYuY29uZmlnLmVkZ2VTbGFudFdpZHRoTWF4XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvblVuZG86IChkYXRhKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRFZGdlU2xhbnRXaWR0aE1heChkYXRhLmVkZ2VTbGFudFdpZHRoTWF4LCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uUmVkbzogKGRhdGEpPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldEVkZ2VTbGFudFdpZHRoTWF4KHdpZHRoLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29uZmlnLmVkZ2VTbGFudFdpZHRoTWF4PXdpZHRoO1xuICAgICAgICB0aGlzLnRyZWVEZXNpZ25lci5yZWRyYXcodHJ1ZSk7XG4gICAgfVxuXG4gICAgYXV0b0xheW91dCh0eXBlLCB3aXRob3V0U3RhdGVTYXZpbmcpe1xuICAgICAgICB2YXIgc2VsZj10aGlzO1xuXG5cblxuICAgICAgICBpZighd2l0aG91dFN0YXRlU2F2aW5nKXtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoe1xuICAgICAgICAgICAgICAgIGRhdGE6e1xuICAgICAgICAgICAgICAgICAgICBuZXdMYXlvdXQ6IHR5cGUsXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRMYXlvdXQ6IHNlbGYuY29uZmlnLnR5cGVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uVW5kbzogKGRhdGEpPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmNvbmZpZy50eXBlID0gZGF0YS5jdXJyZW50TGF5b3V0O1xuICAgICAgICAgICAgICAgICAgICBzZWxmLl9maXJlT25BdXRvTGF5b3V0Q2hhbmdlZENhbGxiYWNrcygpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25SZWRvOiAoZGF0YSk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuYXV0b0xheW91dChkYXRhLm5ld0xheW91dCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb25maWcudHlwZSA9IHR5cGU7XG4gICAgICAgIGlmKCF0aGlzLmRhdGEubm9kZXMubGVuZ3RoKXtcbiAgICAgICAgICAgIHRoaXMuX2ZpcmVPbkF1dG9MYXlvdXRDaGFuZ2VkQ2FsbGJhY2tzKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcHJldlRyZWVNYXhZID0gc2VsZi5nZXROb2RlTWluWSgpO1xuICAgICAgICB0aGlzLmRhdGEuZ2V0Um9vdHMoKS5mb3JFYWNoKHI9PntcbiAgICAgICAgICAgIHZhciByb290ID0gZDMuaGllcmFyY2h5KHIsIGQ9PntcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5jaGlsZEVkZ2VzLmZpbHRlcihlPT4hZS4kaGlkZGVuKS5tYXAoZT0+ZS5jaGlsZE5vZGUpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIHJvb3Quc29ydCgoYSxiKT0+c2VsZi5ub2RlVHlwZU9yZGVyW2EuZGF0YS50eXBlXS1zZWxmLm5vZGVUeXBlT3JkZXJbYi5kYXRhLnR5cGVdKTtcbiAgICAgICAgICAgIHJvb3Quc29ydCgoYSxiKT0+YS5kYXRhLmxvY2F0aW9uLnkgLSBiLmRhdGEubG9jYXRpb24ueSk7XG5cblxuICAgICAgICAgICAgdmFyIGxheW91dDtcbiAgICAgICAgICAgIGlmKHR5cGU9PT0nY2x1c3Rlcicpe1xuICAgICAgICAgICAgICAgIGxheW91dCA9IGQzLmNsdXN0ZXIoKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGxheW91dCA9IGQzLnRyZWUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxheW91dC5ub2RlU2l6ZShbc2VsZi5jb25maWcuZ3JpZEhlaWdodCwgc2VsZi5jb25maWcuZ3JpZFdpZHRoXSk7XG4gICAgICAgICAgICBsYXlvdXQuc2VwYXJhdGlvbihzZWxmLm5vZGVTZXBhcmF0aW9uKTtcblxuICAgICAgICAgICAgbGF5b3V0KHJvb3QpO1xuICAgICAgICAgICAgdmFyIG1pblkgPSA5OTk5OTk5OTk7XG4gICAgICAgICAgICByb290LmVhY2goZD0+e1xuICAgICAgICAgICAgICAgIG1pblkgPSBNYXRoLm1pbihtaW5ZLCBkLngpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHZhciBkeSA9IHJvb3QueCAtIG1pblkgKyBwcmV2VHJlZU1heFk7XG4gICAgICAgICAgICB2YXIgZHggPSBzZWxmLmdldE5vZGVNaW5YKCk7XG4gICAgICAgICAgICB2YXIgbWF4WT0wO1xuICAgICAgICAgICAgcm9vdC5lYWNoKGQ9PntcbiAgICAgICAgICAgICAgICBkLmRhdGEubG9jYXRpb24ueCA9IGQueSArIGR4O1xuICAgICAgICAgICAgICAgIGQuZGF0YS5sb2NhdGlvbi55ID0gZC54ICsgZHk7XG5cbiAgICAgICAgICAgICAgICBtYXhZID0gTWF0aC5tYXgobWF4WSwgZC5kYXRhLmxvY2F0aW9uLnkpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHByZXZUcmVlTWF4WSA9IG1heFkgKyBzZWxmLmNvbmZpZy5ub2RlU2l6ZStzZWxmLnRyZWVNYXJnaW47XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgLy8gdGhpcy50cmFuc2l0aW9uID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50cmVlRGVzaWduZXIucmVkcmF3KHRydWUpO1xuICAgICAgICAvLyB0aGlzLnRyYW5zaXRpb24gPSBmYWxzZTtcblxuICAgICAgICB0aGlzLl9maXJlT25BdXRvTGF5b3V0Q2hhbmdlZENhbGxiYWNrcygpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBmaXROb2Rlc0luUGxvdHRpbmdSZWdpb24obm9kZXMpe1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciB0b3BZID0gZDMubWluKG5vZGVzLCBuPT5uLmxvY2F0aW9uLnkpO1xuICAgICAgICB2YXIgbWluWSA9IHNlbGYuZ2V0Tm9kZU1pblkoKTtcbiAgICAgICAgdmFyIGR5ID0gdG9wWSAtIG1pblk7XG5cbiAgICAgICAgdmFyIG1pblggPSBkMy5taW4obm9kZXMsIG49Pm4ubG9jYXRpb24ueCk7XG4gICAgICAgIHZhciBkeCA9IG1pblggLSBzZWxmLmdldE5vZGVNaW5YKCk7XG5cbiAgICAgICAgaWYoZHk8MCB8fCAgZHg8MCl7XG4gICAgICAgICAgICBub2Rlcy5mb3JFYWNoKG49Pm4ubW92ZSgtZHgsIC1keSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW92ZU5vZGVzKG5vZGVzLCBkeCwgZHksIHBpdm90KXtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgbGltaXQgPSBzZWxmLmNvbmZpZy5saW1pdE5vZGVQb3NpdGlvbmluZztcbiAgICAgICAgaWYobGltaXQpe1xuICAgICAgICAgICAgaWYoZHg8MCl7XG4gICAgICAgICAgICAgICAgbm9kZXMuc29ydCgoYSxiKT0+YS5sb2NhdGlvbi54LWIubG9jYXRpb24ueCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBub2Rlcy5zb3J0KChhLGIpPT5iLmxvY2F0aW9uLngtYS5sb2NhdGlvbi54KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cbiAgICAgICAgdmFyIG1pblkgPSBkMy5taW4obm9kZXMsIGQ9PmQubG9jYXRpb24ueSk7XG4gICAgICAgIGlmKG1pblkgKyBkeSA8IHNlbGYuZ2V0Tm9kZU1pblkoKSl7XG4gICAgICAgICAgICBkeSA9IHNlbGYuZ2V0Tm9kZU1pblkoKSAtIG1pblk7XG4gICAgICAgIH1cblxuICAgICAgICBub2Rlcy5mb3JFYWNoKGQ9PntcbiAgICAgICAgICAgIGlmKGxpbWl0KXtcbiAgICAgICAgICAgICAgICBMYXlvdXQuYmFja3VwTm9kZUxvY2F0aW9uKGQpO1xuICAgICAgICAgICAgICAgIHZhciBtaW5YID0gc2VsZi5nZXROb2RlTWluWChkKTtcbiAgICAgICAgICAgICAgICB2YXIgbWF4WCA9IHNlbGYuZ2V0Tm9kZU1heFgoZCk7XG5cbiAgICAgICAgICAgICAgICBkLmxvY2F0aW9uLnggPSBNYXRoLm1pbihNYXRoLm1heChkLmxvY2F0aW9uLngrZHgsIG1pblgpLCBtYXhYKTtcbiAgICAgICAgICAgICAgICBkLmxvY2F0aW9uLnkgKz0gZHk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBkLmxvY2F0aW9uLnggKz1keDtcbiAgICAgICAgICAgICAgICBkLmxvY2F0aW9uLnkgKz0gZHk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG5cblxuICAgICAgICB2YXIgcmV2ZXJ0WCA9IHBpdm90ICYmIHNlbGYuY29uZmlnLmxpbWl0Tm9kZVBvc2l0aW9uaW5nICYmIChwaXZvdC5sb2NhdGlvbi54ID09PSBwaXZvdC4kbG9jYXRpb24ueCk7XG5cbiAgICAgICAgbm9kZXMuZm9yRWFjaChkPT57XG4gICAgICAgICAgICBpZihyZXZlcnRYKXtcbiAgICAgICAgICAgICAgICBkLmxvY2F0aW9uLnggPSBkLiRsb2NhdGlvbi54O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi50cmVlRGVzaWduZXIudXBkYXRlTm9kZVBvc2l0aW9uKGQpO1xuICAgICAgICB9KTtcblxuXG4gICAgfVxuXG4gICAgc3RhdGljIGJhY2t1cE5vZGVMb2NhdGlvbihub2RlKSB7XG4gICAgICAgIG5vZGUuJGxvY2F0aW9uID0gbmV3IG1vZGVsLlBvaW50KG5vZGUubG9jYXRpb24pO1xuICAgIH1cblxuICAgIF9maXJlT25BdXRvTGF5b3V0Q2hhbmdlZENhbGxiYWNrcygpe1xuICAgICAgICB0aGlzLm9uQXV0b0xheW91dENoYW5nZWQuZm9yRWFjaChjPT5jKHRoaXMuY29uZmlnLnR5cGUpKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2V0SGFuZ2luZ1Bvc2l0aW9uKHNlbGVjdGlvbil7XG4gICAgICAgIC8vIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgIC8vICAgICBzZWxlY3Rpb24uZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAvLyAgICAgICAgIHZhciBoID0gIHRoaXMuZ2V0QkJveCgpLmhlaWdodDtcbiAgICAgICAgLy8gICAgICAgICBkMy5zZWxlY3QodGhpcykuYXR0cignZHknLCBoKTtcbiAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAvLyB9LDApO1xuXG4gICAgICAgIGlmKEFwcFV0aWxzLmlzSGlkZGVuKHNlbGVjdGlvbi5ub2RlKCkpKXsgLy8gc2V0dGluZyBoYW5naW5nIHBvc2l0aW9uIG9mIGhpZGRlbiBlbGVtZW50cyBmYWlscyBvbiBmaXJlZm94XG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0aW9uO1xuICAgICAgICB9XG5cblxuICAgICAgICBzZWxlY3Rpb24uZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIGggPSAgdGhpcy5nZXRCQm94KCkuaGVpZ2h0O1xuICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLmF0dHIoJ2R5JywgJzAuNzVlbScpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc2VsZWN0aW9uO1xuICAgIH1cblxufVxuXG5cbiIsImltcG9ydCB7QXBwVXRpbHN9IGZyb20gJy4vYXBwLXV0aWxzJ1xuaW1wb3J0ICogYXMgZDMgZnJvbSAnLi9kMydcbmltcG9ydCB7Q29udGV4dE1lbnV9IGZyb20gJy4vY29udGV4dC1tZW51L2NvbnRleHQtbWVudSdcblxuZXhwb3J0IGNsYXNzIE5vZGVEcmFnSGFuZGxlcntcblxuICAgIHRyZWVEZXNpZ25lcjtcbiAgICBkYXRhO1xuICAgIGNvbmZpZztcblxuICAgIGRyYWc7XG5cblxuICAgIGNvbnN0cnVjdG9yKHRyZWVEZXNpZ25lciwgZGF0YSl7XG4gICAgICAgIHRoaXMudHJlZURlc2lnbmVyID0gdHJlZURlc2lnbmVyO1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5kcmFnID0gZDMuZHJhZygpXG4gICAgICAgICAgICAuc3ViamVjdChmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgICAgaWYoZD09bnVsbCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAge1xuICAgICAgICAgICAgICAgICAgICAgICAgeDogZXZlbnQueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IGV2ZW50LnlcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHQgPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgeDogdC5hdHRyKFwieFwiKSArIEFwcFV0aWxzLmdldFRyYW5zbGF0aW9uKHQuYXR0cihcInRyYW5zZm9ybVwiKSlbMF0sXG4gICAgICAgICAgICAgICAgICAgIHk6IHQuYXR0cihcInlcIikgKyBBcHBVdGlscy5nZXRUcmFuc2xhdGlvbih0LmF0dHIoXCJ0cmFuc2Zvcm1cIikpWzFdXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oXCJzdGFydFwiLCBmdW5jdGlvbihkKXtcbiAgICAgICAgICAgICAgICBzZWxmLmRyYWdTdGFydGVkLmNhbGwodGhpcyxkLCBzZWxmKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbihcImRyYWdcIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICBzZWxmLm9uRHJhZy5jYWxsKHRoaXMsIGQsIHNlbGYpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbihcImVuZFwiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHNlbGYuZHJhZ0VuZGVkLmNhbGwodGhpcywgZCwgc2VsZik7XG4gICAgICAgICAgICB9KVxuICAgIH1cblxuXG4gICAgZHJhZ1N0YXJ0ZWQoZCxzZWxmKSB7XG4gICAgICAgIGlmKHNlbGYuaWdub3JlRHJhZyl7XG4gICAgICAgICAgICBzZWxmLmlnbm9yZURyYWc9ZmFsc2U7XG4gICAgICAgICAgICBzZWxmLmlnbm9yZWREcmFnPXRydWU7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5pZ25vcmVkRHJhZz1mYWxzZTtcblxuICAgICAgICAvLyBzZWxmLnRyZWVEZXNpZ25lci5sYXlvdXQuZGlzYWJsZUF1dG9MYXlvdXQoKTtcbiAgICAgICAgQ29udGV4dE1lbnUuaGlkZSgpO1xuICAgICAgICB2YXIgbm9kZSA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgaWYoIW5vZGUuY2xhc3NlZChcInNlbGVjdGVkXCIpKXtcbiAgICAgICAgICAgIHNlbGYudHJlZURlc2lnbmVyLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICBzZWxmLnRyZWVEZXNpZ25lci5zZWxlY3ROb2RlKGQpO1xuICAgICAgICBub2RlLmNsYXNzZWQoXCJzZWxlY3RlZCBkcmFnZ2luZ1wiLCB0cnVlKTtcbiAgICAgICAgc2VsZi5zZWxlY3RlZE5vZGVzID0gc2VsZi50cmVlRGVzaWduZXIuZ2V0U2VsZWN0ZWROb2Rlcyh0cnVlKTtcbiAgICAgICAgc2VsZi5wcmV2RHJhZ0V2ZW50ID0gZDMuZXZlbnQ7XG4gICAgICAgIHNlbGYuZHJhZ0V2ZW50Q291bnQgPSAwO1xuICAgIH1cblxuICAgIG9uRHJhZyhkcmFnZ2VkTm9kZSwgc2VsZil7XG4gICAgICAgIGlmKHNlbGYuaWdub3JlZERyYWcpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoc2VsZi5kcmFnRXZlbnRDb3VudD09Mil7XG4gICAgICAgICAgICBzZWxmLmRhdGEuc2F2ZVN0YXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5kcmFnRXZlbnRDb3VudCsrO1xuICAgICAgICBpZihzZWxmLnNlbGVjdGVkTm9kZXMubGVuZ3RoPjUgJiYgc2VsZi5kcmFnRXZlbnRDb3VudCUyIT0xKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBkeCA9IGQzLmV2ZW50LnggLSBzZWxmLnByZXZEcmFnRXZlbnQueDtcbiAgICAgICAgdmFyIGR5ID0gZDMuZXZlbnQueS0gc2VsZi5wcmV2RHJhZ0V2ZW50Lnk7XG4gICAgICAgIHNlbGYudHJlZURlc2lnbmVyLmxheW91dC5tb3ZlTm9kZXMoc2VsZi5zZWxlY3RlZE5vZGVzLCBkeCwgZHksIGRyYWdnZWROb2RlKTtcblxuXG4gICAgICAgIHNlbGYucHJldkRyYWdFdmVudCA9IGQzLmV2ZW50O1xuICAgICAgICBzZWxmLnRyZWVEZXNpZ25lci5yZWRyYXdFZGdlcygpO1xuICAgICAgICBzZWxmLnRyZWVEZXNpZ25lci51cGRhdGVQbG90dGluZ1JlZ2lvblNpemUoKTtcbiAgICB9XG5cbiAgICBkcmFnRW5kZWQoZHJhZ2dlZE5vZGUsIHNlbGYpe1xuICAgICAgICB2YXIgbm9kZSA9IGQzLnNlbGVjdCh0aGlzKS5jbGFzc2VkKFwiZHJhZ2dpbmdcIiwgZmFsc2UpO1xuICAgICAgICBpZihzZWxmLmlnbm9yZWREcmFnKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzZWxmLnRyZWVEZXNpZ25lci5sYXlvdXQudXBkYXRlKGRyYWdnZWROb2RlKVxuICAgIH1cblxuICAgIGNhbmNlbERyYWcoKXtcbiAgICAgICAgdGhpcy5pZ25vcmVEcmFnID0gdHJ1ZTtcbiAgICB9XG5cbn1cblxuXG4iLCJ2YXIgZXBzaWxvbiA9IDFlLTEyO1xudmFyIHBpID0gTWF0aC5QSTtcbnZhciBoYWxmUGkgPSBwaSAvIDI7XG52YXIgdGF1ID0gMiAqIHBpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgLypkcmF3OiBmdW5jdGlvbihjb250ZXh0LCBzaXplKSB7XG4gICAgICAgIHZhciByID0gTWF0aC5zcXJ0KHNpemUgLyBwaSk7XG4gICAgICAgIGNvbnRleHQubW92ZVRvKHIsIDApO1xuICAgICAgICBjb250ZXh0LmFyYygwLCAwLCByLCAwLCB0YXUpO1xuICAgIH0qL1xuICAgIGRyYXc6IGZ1bmN0aW9uKGNvbnRleHQsIHNpemUpIHtcblxuICAgICAgICB2YXIgciA9IE1hdGguc3FydChzaXplIC8gcGkpO1xuICAgICAgICB2YXIgZGlzdCA9MC41NTIyODQ3NDk4MzEgKiByO1xuXG4gICAgICAgIGNvbnRleHQubW92ZVRvKC1yLCAwKVxuICAgICAgICAvLyBjb250ZXh0LmxpbmVUbygyKnIsIDIqcilcbiAgICAgICAgLy8gY29udGV4dC5iZXppZXJDdXJ2ZVRvKC1yLCAtZGlzdCwgLWRpc3QsIC1yLCAwLC1yKTtcbiAgICAgICAgY29udGV4dC5iZXppZXJDdXJ2ZVRvKC1yLCAtZGlzdCwgLWRpc3QsIC1yLCAwLC1yKTtcblxuICAgICAgICBjb250ZXh0LmJlemllckN1cnZlVG8oZGlzdCwgLXIsIHIsIC1kaXN0LCByLDApO1xuXG4gICAgICAgIGNvbnRleHQuYmV6aWVyQ3VydmVUbyhyLCBkaXN0LCBkaXN0LCByLCAwLCByKTtcblxuICAgICAgICBjb250ZXh0LmJlemllckN1cnZlVG8oLWRpc3QsIHIsIC1yLCBkaXN0LCAtciwgMCk7XG4gICAgfVxufTtcbiIsInZhciBzcXJ0MyA9IE1hdGguc3FydCgzKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGRyYXc6IGZ1bmN0aW9uKGNvbnRleHQsIHNpemUpIHtcbiAgICAgICAgdmFyIHIgPSBNYXRoLnNxcnQoc2l6ZSAvIE1hdGguUEkpO1xuICAgICAgICBjb250ZXh0Lm1vdmVUbygtciwgMCk7XG4gICAgICAgIGNvbnRleHQubGluZVRvKDAuOSpyLCAtcik7XG4gICAgICAgIGNvbnRleHQubGluZVRvKDAuOSpyLCByKTtcbiAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICB9XG59O1xuIiwiaW1wb3J0IHtVdGlsc30gZnJvbSBcInNkLXV0aWxzXCI7XG5pbXBvcnQge2kxOG59IGZyb20gJy4vaTE4bi9pMThuJ1xuXG5leHBvcnQgY2xhc3MgVGVtcGxhdGVze1xuXG4gICAgc3RhdGljIGdyb3dsID0gcmVxdWlyZSgnLi90ZW1wbGF0ZXMvZ3Jvd2xfbWVzc2FnZS5odG1sJyk7XG5cbiAgICBzdGF0aWMgZ2V0KHRlbXBsYXRlTmFtZSwgdmFyaWFibGVzKXtcbiAgICAgICAgdmFyIGNvbXBpbGVkID0gVXRpbHMudGVtcGxhdGUoVGVtcGxhdGVzW3RlbXBsYXRlTmFtZV0seyAnaW1wb3J0cyc6IHsgJ2kxOG4nOiBpMThuLCAnVGVtcGxhdGVzJzogVGVtcGxhdGVzLCAnaW5jbHVkZSc6IGZ1bmN0aW9uKG4sIHYpIHtyZXR1cm4gVGVtcGxhdGVzLmdldChuLCB2KX0gfSB9KTtcbiAgICAgICAgaWYodmFyaWFibGVzKXtcbiAgICAgICAgICAgIHZhcmlhYmxlcy52YXJpYWJsZXMgPSB2YXJpYWJsZXM7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdmFyaWFibGVzID0ge3ZhcmlhYmxlczp7fX1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29tcGlsZWQodmFyaWFibGVzKVxuXG4gICAgfVxuXG4gICAgc3RhdGljIHN0eWxlUnVsZShzZWxlY3RvciwgcHJvcHMpe1xuICAgICAgICB2YXIgcyA9IHNlbGVjdG9yKyAneyc7XG4gICAgICAgIHByb3BzLmZvckVhY2gocD0+IHMrPVRlbXBsYXRlcy5zdHlsZVByb3AocFswXSwgcFsxXSkpO1xuICAgICAgICBzKz0nfSAnO1xuICAgICAgICByZXR1cm4gcztcbiAgICB9XG4gICAgc3RhdGljIHN0eWxlUHJvcChzdHlsZU5hbWUsIHZhcmlhYmxlTmFtZSl7XG4gICAgICAgIHJldHVybiAgc3R5bGVOYW1lKyc6IDwlPSAnK3ZhcmlhYmxlTmFtZSsnICU+OyAnXG4gICAgfVxuXG4gICAgc3RhdGljIHRyZWVEZXNpZ25lclNlbGVjdG9yID0gJ3N2Zy5zZC10cmVlLWRlc2lnbmVyJztcbiAgICBzdGF0aWMgbm9kZVNlbGVjdG9yKHR5cGUsIGNsYXp6KXtcbiAgICAgICAgdmFyIHMgPSBUZW1wbGF0ZXMudHJlZURlc2lnbmVyU2VsZWN0b3IrJyAubm9kZSc7XG4gICAgICAgIGlmKHR5cGUpe1xuICAgICAgICAgICAgcys9Jy4nK3R5cGUrJy1ub2RlJztcbiAgICAgICAgfVxuICAgICAgICBpZihjbGF6eil7XG4gICAgICAgICAgICBzKz0nLicrY2xheno7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHM7XG4gICAgfVxuICAgIHN0YXRpYyBlZGdlU2VsZWN0b3IoY2xhenope1xuICAgICAgICB2YXIgcyA9IFRlbXBsYXRlcy50cmVlRGVzaWduZXJTZWxlY3RvcisnIC5lZGdlJztcbiAgICAgICAgaWYoY2xhenope1xuICAgICAgICAgICAgcys9Jy4nK2NsYXp6O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzO1xuICAgIH1cblxuICAgIHN0YXRpYyB0cmVlRGVzaWduZXJTdHlsZXMgPVxuXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLnRyZWVEZXNpZ25lclNlbGVjdG9yLFtcbiAgICAgICAgICAgIFsnZm9udC1zaXplJywgJ2ZvbnRTaXplJ10sXG4gICAgICAgICAgICBbJ2ZvbnQtZmFtaWx5JywgJ2ZvbnRGYW1pbHknXSxcbiAgICAgICAgICAgIFsnZm9udC13ZWlnaHQnLCAnZm9udFdlaWdodCddLFxuICAgICAgICAgICAgWydmb250LXN0eWxlJywgJ2ZvbnRTdHlsZSddXG4gICAgICAgIF0pK1xuICAgICAgICAvLyAgIG5vZGVcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCkrJyBwYXRoJyxbXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnbm9kZS5maWxsJ10sXG4gICAgICAgICAgICBbJ3N0cm9rZS13aWR0aCcsICdub2RlLnN0cm9rZVdpZHRoJ11cbiAgICAgICAgXSkrXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLm5vZGVTZWxlY3RvcignZGVjaXNpb24nLCAnb3B0aW1hbCcpKycgcGF0aCwgJytUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCdjaGFuY2UnLCAnb3B0aW1hbCcpKycgcGF0aCwnICtUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCd0ZXJtaW5hbCcsICdvcHRpbWFsJykrJyBwYXRoJyxbXG4gICAgICAgICAgICBbJ3N0cm9rZScsICdub2RlLm9wdGltYWwuc3Ryb2tlJ10sXG4gICAgICAgICAgICBbJ3N0cm9rZS13aWR0aCcsICdub2RlLm9wdGltYWwuc3Ryb2tlV2lkdGgnXVxuICAgICAgICBdKStcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCkrJyAubGFiZWwnLFtcbiAgICAgICAgICAgIFsnZm9udC1zaXplJywgJ25vZGUubGFiZWwuZm9udFNpemUnXSxcbiAgICAgICAgICAgIFsnZmlsbCcsICdub2RlLmxhYmVsLmNvbG9yJ11cbiAgICAgICAgXSkrXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLm5vZGVTZWxlY3RvcigpKycgLnBheW9mZicsW1xuICAgICAgICAgICAgWydmb250LXNpemUnLCAnbm9kZS5wYXlvZmYuZm9udFNpemUnXSxcbiAgICAgICAgICAgIFsnZmlsbCcsICdub2RlLnBheW9mZi5jb2xvciddLFxuICAgICAgICBdKStcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCkrJyAucGF5b2ZmLm5lZ2F0aXZlJyxbXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnbm9kZS5wYXlvZmYubmVnYXRpdmVDb2xvciddLFxuICAgICAgICBdKStcblxuICAgICAgICAvLyAgICBkZWNpc2lvbiBub2RlXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLm5vZGVTZWxlY3RvcignZGVjaXNpb24nKSsnIHBhdGgnLFtcbiAgICAgICAgICAgIFsnZmlsbCcsICdub2RlLmRlY2lzaW9uLmZpbGwnXSxcbiAgICAgICAgICAgIFsnc3Ryb2tlJywgJ25vZGUuZGVjaXNpb24uc3Ryb2tlJ11cbiAgICAgICAgXSkrXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLm5vZGVTZWxlY3RvcignZGVjaXNpb24nLCAnc2VsZWN0ZWQnKSsnIHBhdGgnLFtcbiAgICAgICAgICAgIFsnZmlsbCcsICdub2RlLmRlY2lzaW9uLnNlbGVjdGVkLmZpbGwnXVxuICAgICAgICBdKStcblxuICAgICAgICAvLyAgICBjaGFuY2Ugbm9kZVxuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5ub2RlU2VsZWN0b3IoJ2NoYW5jZScpKycgcGF0aCcsW1xuICAgICAgICAgICAgWydmaWxsJywgJ25vZGUuY2hhbmNlLmZpbGwnXSxcbiAgICAgICAgICAgIFsnc3Ryb2tlJywgJ25vZGUuY2hhbmNlLnN0cm9rZSddXG4gICAgICAgIF0pK1xuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5ub2RlU2VsZWN0b3IoJ2NoYW5jZScsICdzZWxlY3RlZCcpKycgcGF0aCcsW1xuICAgICAgICAgICAgWydmaWxsJywgJ25vZGUuY2hhbmNlLnNlbGVjdGVkLmZpbGwnXVxuICAgICAgICBdKStcblxuICAgICAgICAvLyAgICB0ZXJtaW5hbCBub2RlXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLm5vZGVTZWxlY3RvcigndGVybWluYWwnKSsnIHBhdGgnLFtcbiAgICAgICAgICAgIFsnZmlsbCcsICdub2RlLnRlcm1pbmFsLmZpbGwnXSxcbiAgICAgICAgICAgIFsnc3Ryb2tlJywgJ25vZGUudGVybWluYWwuc3Ryb2tlJ11cbiAgICAgICAgXSkrXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLm5vZGVTZWxlY3RvcigndGVybWluYWwnLCAnc2VsZWN0ZWQnKSsnIHBhdGgnLFtcbiAgICAgICAgICAgIFsnZmlsbCcsICdub2RlLnRlcm1pbmFsLnNlbGVjdGVkLmZpbGwnXVxuICAgICAgICBdKStcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMubm9kZVNlbGVjdG9yKCd0ZXJtaW5hbCcpKycgLmFnZ3JlZ2F0ZWQtcGF5b2ZmJyxbXG4gICAgICAgICAgICBbJ2ZvbnQtc2l6ZScsICdub2RlLnRlcm1pbmFsLnBheW9mZi5mb250U2l6ZSddLFxuICAgICAgICAgICAgWydmaWxsJywgJ25vZGUudGVybWluYWwucGF5b2ZmLmNvbG9yJ10sXG4gICAgICAgIF0pK1xuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy5ub2RlU2VsZWN0b3IoJ3Rlcm1pbmFsJykrJyAuYWdncmVnYXRlZC1wYXlvZmYubmVnYXRpdmUnLFtcbiAgICAgICAgICAgIFsnZmlsbCcsICdub2RlLnRlcm1pbmFsLnBheW9mZi5uZWdhdGl2ZUNvbG9yJ10sXG4gICAgICAgIF0pK1xuXG5cbiAgICAgICAgLy9wcm9iYWJpbGl0eVxuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy50cmVlRGVzaWduZXJTZWxlY3RvcisnIC5ub2RlIC5wcm9iYWJpbGl0eS10by1lbnRlciwgJytUZW1wbGF0ZXMudHJlZURlc2lnbmVyU2VsZWN0b3IrJyAuZWRnZSAucHJvYmFiaWxpdHknLFtcbiAgICAgICAgICAgIFsnZm9udC1zaXplJywgJ3Byb2JhYmlsaXR5LmZvbnRTaXplJ10sXG4gICAgICAgICAgICBbJ2ZpbGwnLCAncHJvYmFiaWxpdHkuY29sb3InXVxuICAgICAgICBdKStcblxuICAgICAgICAvL2VkZ2VcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMuZWRnZVNlbGVjdG9yKCkrJyBwYXRoJyxbXG4gICAgICAgICAgICBbJ3N0cm9rZScsICdlZGdlLnN0cm9rZSddLFxuICAgICAgICAgICAgWydzdHJva2Utd2lkdGgnLCAnZWRnZS5zdHJva2VXaWR0aCddXG4gICAgICAgIF0pK1xuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy50cmVlRGVzaWduZXJTZWxlY3RvcisnIG1hcmtlciNhcnJvdyBwYXRoJyxbXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnZWRnZS5zdHJva2UnXSxcbiAgICAgICAgXSkrXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLmVkZ2VTZWxlY3Rvcignb3B0aW1hbCcpKycgcGF0aCcsW1xuICAgICAgICAgICAgWydzdHJva2UnLCAnZWRnZS5vcHRpbWFsLnN0cm9rZSddLFxuICAgICAgICAgICAgWydzdHJva2Utd2lkdGgnLCAnZWRnZS5vcHRpbWFsLnN0cm9rZVdpZHRoJ11cbiAgICAgICAgXSkrXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLnRyZWVEZXNpZ25lclNlbGVjdG9yKycgbWFya2VyI2Fycm93LW9wdGltYWwgcGF0aCcsW1xuICAgICAgICAgICAgWydmaWxsJywgJ2VkZ2Uub3B0aW1hbC5zdHJva2UnXSxcbiAgICAgICAgXSkrXG5cbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMuZWRnZVNlbGVjdG9yKCdzZWxlY3RlZCcpKycgcGF0aCcsW1xuICAgICAgICAgICAgWydzdHJva2UnLCAnZWRnZS5zZWxlY3RlZC5zdHJva2UnXSxcbiAgICAgICAgICAgIFsnc3Ryb2tlLXdpZHRoJywgJ2VkZ2Uuc2VsZWN0ZWQuc3Ryb2tlV2lkdGgnXVxuICAgICAgICBdKStcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMudHJlZURlc2lnbmVyU2VsZWN0b3IrJyBtYXJrZXIjYXJyb3ctc2VsZWN0ZWQgcGF0aCcsW1xuICAgICAgICAgICAgWydmaWxsJywgJ2VkZ2Uuc2VsZWN0ZWQuc3Ryb2tlJ10sXG4gICAgICAgIF0pK1xuXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLmVkZ2VTZWxlY3RvcigpKycgLmxhYmVsJyxbXG4gICAgICAgICAgICBbJ2ZvbnQtc2l6ZScsICdlZGdlLmxhYmVsLmZvbnRTaXplJ10sXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnZWRnZS5sYWJlbC5jb2xvciddXG4gICAgICAgIF0pK1xuXG4gICAgICAgIFRlbXBsYXRlcy5zdHlsZVJ1bGUoVGVtcGxhdGVzLmVkZ2VTZWxlY3RvcigpKycgLnBheW9mZicsW1xuICAgICAgICAgICAgWydmb250LXNpemUnLCAnZWRnZS5wYXlvZmYuZm9udFNpemUnXSxcbiAgICAgICAgICAgIFsnZmlsbCcsICdlZGdlLnBheW9mZi5jb2xvciddLFxuICAgICAgICBdKStcbiAgICAgICAgVGVtcGxhdGVzLnN0eWxlUnVsZShUZW1wbGF0ZXMuZWRnZVNlbGVjdG9yKCkrJyAucGF5b2ZmLm5lZ2F0aXZlJyxbXG4gICAgICAgICAgICBbJ2ZpbGwnLCAnZWRnZS5wYXlvZmYubmVnYXRpdmVDb2xvciddLFxuICAgICAgICBdKStcblxuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy50cmVlRGVzaWduZXJTZWxlY3RvcisnIC5zZC10aXRsZS1jb250YWluZXIgdGV4dC5zZC10aXRsZScsW1xuICAgICAgICAgICAgWydmb250LXNpemUnLCAndGl0bGUuZm9udFNpemUnXSxcbiAgICAgICAgICAgIFsnZm9udC13ZWlnaHQnLCAndGl0bGUuZm9udFdlaWdodCddLFxuICAgICAgICAgICAgWydmb250LXN0eWxlJywgJ3RpdGxlLmZvbnRTdHlsZSddLFxuICAgICAgICAgICAgWydmaWxsJywgJ3RpdGxlLmNvbG9yJ11cbiAgICAgICAgXSkgK1xuICAgICAgICBUZW1wbGF0ZXMuc3R5bGVSdWxlKFRlbXBsYXRlcy50cmVlRGVzaWduZXJTZWxlY3RvcisnIC5zZC10aXRsZS1jb250YWluZXIgdGV4dC5zZC1kZXNjcmlwdGlvbicsW1xuICAgICAgICAgICAgWydmb250LXNpemUnLCAnZGVzY3JpcHRpb24uZm9udFNpemUnXSxcbiAgICAgICAgICAgIFsnZm9udC13ZWlnaHQnLCAnZGVzY3JpcHRpb24uZm9udFdlaWdodCddLFxuICAgICAgICAgICAgWydmb250LXN0eWxlJywgJ2Rlc2NyaXB0aW9uLmZvbnRTdHlsZSddLFxuICAgICAgICAgICAgWydmaWxsJywgJ2Rlc2NyaXB0aW9uLmNvbG9yJ11cbiAgICAgICAgXSlcbn1cblxuXG5cblxuIiwibW9kdWxlLmV4cG9ydHMgPSBcIm1vZHVsZS5leHBvcnRzID0gXFxcIjxkaXYgY2xhc3M9XFxcXFxcXCJzZC1ncm93bC1tZXNzYWdlIDwlPXR5cGUlPlxcXFxcXFwiPlxcXFxuICAgIDxkaXYgY2xhc3M9XFxcXFxcXCJzZC1ncm93bC1tZXNzYWdlLXRleHRcXFxcXFxcIj5cXFxcbiAgICAgICAgPCU9IG1lc3NhZ2UgJT5cXFxcbiAgICA8L2Rpdj5cXFxcbjwvZGl2PlxcXFxuXFxcIjtcXG5cIjtcbiIsImltcG9ydCB7QXBwVXRpbHN9IGZyb20gJy4vYXBwLXV0aWxzJ1xuaW1wb3J0ICogYXMgZDMgZnJvbSAnLi9kMydcbmltcG9ydCB7Q29udGV4dE1lbnV9IGZyb20gJy4vY29udGV4dC1tZW51L2NvbnRleHQtbWVudSdcblxuZXhwb3J0IGNsYXNzIFRleHREcmFnSGFuZGxlcntcblxuICAgIHRyZWVEZXNpZ25lcjtcbiAgICBkYXRhO1xuICAgIGNvbmZpZztcblxuICAgIGRyYWc7XG5cblxuICAgIGNvbnN0cnVjdG9yKHRyZWVEZXNpZ25lciwgZGF0YSl7XG4gICAgICAgIHRoaXMudHJlZURlc2lnbmVyID0gdHJlZURlc2lnbmVyO1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5kcmFnID0gZDMuZHJhZygpXG4gICAgICAgICAgICAuc3ViamVjdChmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgICAgaWYoZD09bnVsbCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAge1xuICAgICAgICAgICAgICAgICAgICAgICAgeDogZXZlbnQueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IGV2ZW50LnlcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHQgPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgeDogdC5hdHRyKFwieFwiKSArIEFwcFV0aWxzLmdldFRyYW5zbGF0aW9uKHQuYXR0cihcInRyYW5zZm9ybVwiKSlbMF0sXG4gICAgICAgICAgICAgICAgICAgIHk6IHQuYXR0cihcInlcIikgKyBBcHBVdGlscy5nZXRUcmFuc2xhdGlvbih0LmF0dHIoXCJ0cmFuc2Zvcm1cIikpWzFdXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oXCJzdGFydFwiLCBmdW5jdGlvbihkKXtcbiAgICAgICAgICAgICAgICBzZWxmLmRyYWdTdGFydGVkLmNhbGwodGhpcyxkLCBzZWxmKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbihcImRyYWdcIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICBzZWxmLm9uRHJhZy5jYWxsKHRoaXMsIGQsIHNlbGYpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbihcImVuZFwiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHNlbGYuZHJhZ0VuZGVkLmNhbGwodGhpcywgZCwgc2VsZik7XG4gICAgICAgICAgICB9KVxuICAgIH1cblxuXG4gICAgZHJhZ1N0YXJ0ZWQoZCxzZWxmKSB7XG4gICAgICAgIC8vIHNlbGYudHJlZURlc2lnbmVyLmxheW91dC5kaXNhYmxlQXV0b0xheW91dCgpO1xuICAgICAgICBDb250ZXh0TWVudS5oaWRlKCk7XG4gICAgICAgIHZhciB0ZXh0ID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICBpZighdGV4dC5jbGFzc2VkKFwic2VsZWN0ZWRcIikpe1xuICAgICAgICAgICAgc2VsZi50cmVlRGVzaWduZXIuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNlbGYudHJlZURlc2lnbmVyLnNlbGVjdFRleHQoZCk7XG4gICAgICAgIHRleHQuY2xhc3NlZChcInNlbGVjdGVkIGRyYWdnaW5nXCIsIHRydWUpO1xuICAgICAgICBzZWxmLnNlbGVjdGVkTm9kZXMgPSBzZWxmLnRyZWVEZXNpZ25lci5nZXRTZWxlY3RlZE5vZGVzKCk7XG4gICAgICAgIHNlbGYucHJldkRyYWdFdmVudCA9IGQzLmV2ZW50O1xuICAgICAgICBzZWxmLmRyYWdFdmVudENvdW50ID0gMDtcbiAgICB9XG5cbiAgICBvbkRyYWcoZHJhZ2dlZFRleHQsIHNlbGYpe1xuICAgICAgICBpZihzZWxmLmRyYWdFdmVudENvdW50PT0yKXtcbiAgICAgICAgICAgIHNlbGYuZGF0YS5zYXZlU3RhdGUoKTtcbiAgICAgICAgfVxuICAgICAgICBzZWxmLmRyYWdFdmVudENvdW50Kys7XG5cbiAgICAgICAgdmFyIGR4ID0gZDMuZXZlbnQueCAtIHNlbGYucHJldkRyYWdFdmVudC54O1xuICAgICAgICB2YXIgZHkgPSBkMy5ldmVudC55LSBzZWxmLnByZXZEcmFnRXZlbnQueTtcblxuICAgICAgICBkcmFnZ2VkVGV4dC5sb2NhdGlvbi5tb3ZlKGR4LCBkeSk7XG4gICAgICAgIHNlbGYudHJlZURlc2lnbmVyLnVwZGF0ZVRleHRQb3NpdGlvbihkcmFnZ2VkVGV4dCk7XG5cbiAgICAgICAgc2VsZi5wcmV2RHJhZ0V2ZW50ID0gZDMuZXZlbnQ7XG4gICAgICAgIHNlbGYudHJlZURlc2lnbmVyLnVwZGF0ZVBsb3R0aW5nUmVnaW9uU2l6ZSgpO1xuICAgIH1cblxuICAgIGRyYWdFbmRlZChkcmFnZ2VkTm9kZSwgc2VsZil7XG4gICAgICAgICBkMy5zZWxlY3QodGhpcykuY2xhc3NlZChcImRyYWdnaW5nXCIsIGZhbHNlKTtcbiAgICB9XG5cbn1cblxuXG4iLCJpbXBvcnQgKiBhcyBkMyBmcm9tICcuL2QzJ1xuaW1wb3J0IHtVdGlsc30gZnJvbSAnc2QtdXRpbHMnXG5cbmV4cG9ydCBjbGFzcyBUb29sdGlwIHtcbiAgICBzdGF0aWMgZ2V0Q29udGFpbmVyKCl7XG4gICAgICAgIHJldHVybiBkMy5zZWxlY3QoXCJib2R5XCIpLnNlbGVjdE9yQXBwZW5kKCdkaXYuc2QtdG9vbHRpcCcpO1xuICAgIH1cblxuICAgIHN0YXRpYyBzaG93KGh0bWwsIHhPZmZzZXQgPSA1LCB5T2Zmc2V0ID0gMjgsIGV2ZW50LCBkdXJhdGlvbj1udWxsKSB7XG4gICAgICAgIHZhciBjb250YWluZXIgPSBUb29sdGlwLmdldENvbnRhaW5lcigpXG4gICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIDApO1xuICAgICAgICBjb250YWluZXIudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24oMjAwKVxuICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCAuOTgpO1xuICAgICAgICBjb250YWluZXIuaHRtbChodG1sKTtcbiAgICAgICAgVG9vbHRpcC51cGRhdGVQb3NpdGlvbih4T2Zmc2V0LCB5T2Zmc2V0LCBldmVudCk7XG4gICAgICAgIGlmKGR1cmF0aW9uKXtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBUb29sdGlwLmhpZGUoKTtcbiAgICAgICAgICAgIH0sIGR1cmF0aW9uKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIHVwZGF0ZVBvc2l0aW9uKHhPZmZzZXQgPSA1LCB5T2Zmc2V0ID0gMjgsIGV2ZW50KSB7XG4gICAgICAgIGV2ZW50ID0gZXZlbnQgfHwgZDMuZXZlbnQ7XG4gICAgICAgIFRvb2x0aXAuZ2V0Q29udGFpbmVyKClcbiAgICAgICAgICAgIC5zdHlsZShcImxlZnRcIiwgKGV2ZW50LnBhZ2VYICsgeE9mZnNldCkgKyBcInB4XCIpXG4gICAgICAgICAgICAuc3R5bGUoXCJ0b3BcIiwgKGV2ZW50LnBhZ2VZIC0geU9mZnNldCkgKyBcInB4XCIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBoaWRlKGR1cmF0aW9uID0gNTAwKSB7XG4gICAgICAgIHZhciB0ID0gVG9vbHRpcC5nZXRDb250YWluZXIoKTtcbiAgICAgICAgaWYoZHVyYXRpb24pe1xuICAgICAgICAgICAgdCA9IHQudHJhbnNpdGlvbigpLmR1cmF0aW9uKGR1cmF0aW9uKVxuICAgICAgICB9XG4gICAgICAgIHQuc3R5bGUoXCJvcGFjaXR5XCIsIDApO1xuICAgIH1cblxuICAgIHN0YXRpYyBhdHRhY2godGFyZ2V0LCBodG1sT3JGbiwgeE9mZnNldCwgeU9mZnNldCkge1xuICAgICAgICB0YXJnZXQub24oJ21vdXNlb3ZlcicsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICB2YXIgaHRtbCA9IG51bGw7XG4gICAgICAgICAgICBpZiAoVXRpbHMuaXNGdW5jdGlvbihodG1sT3JGbikpIHtcbiAgICAgICAgICAgICAgICBodG1sID0gaHRtbE9yRm4oZCwgaSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGh0bWwgPSBodG1sT3JGbjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGh0bWwgIT09IG51bGwgJiYgaHRtbCAhPT0gdW5kZWZpbmVkICYmIGh0bWwgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgVG9vbHRpcC5zaG93KGh0bWwsIHhPZmZzZXQsIHlPZmZzZXQpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgVG9vbHRpcC5oaWRlKDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pLm9uKCdtb3VzZW1vdmUnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgVG9vbHRpcC51cGRhdGVQb3NpdGlvbih4T2Zmc2V0LCB5T2Zmc2V0KTtcbiAgICAgICAgfSkub24oXCJtb3VzZW91dFwiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgVG9vbHRpcC5oaWRlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCAqIGFzIGQzIGZyb20gXCIuL2QzXCI7XG5pbXBvcnQge1V0aWxzfSBmcm9tIFwic2QtdXRpbHNcIjtcbmltcG9ydCB7QXBwVXRpbHN9IGZyb20gXCIuL2FwcC11dGlsc1wiO1xuaW1wb3J0IHtkb21haW4gYXMgbW9kZWx9IGZyb20gXCJzZC1tb2RlbFwiO1xuaW1wb3J0IHtDb250ZXh0TWVudX0gZnJvbSBcIi4vY29udGV4dC1tZW51L2NvbnRleHQtbWVudVwiO1xuaW1wb3J0IHtNYWluQ29udGV4dE1lbnV9IGZyb20gXCIuL2NvbnRleHQtbWVudS9tYWluLWNvbnRleHQtbWVudVwiO1xuaW1wb3J0IHtOb2RlQ29udGV4dE1lbnV9IGZyb20gXCIuL2NvbnRleHQtbWVudS9ub2RlLWNvbnRleHQtbWVudVwiO1xuaW1wb3J0IHtMYXlvdXR9IGZyb20gXCIuL2xheW91dFwiO1xuaW1wb3J0IHtOb2RlRHJhZ0hhbmRsZXJ9IGZyb20gXCIuL25vZGUtZHJhZy1oYW5kbGVyXCI7XG5pbXBvcnQge1Rvb2x0aXB9IGZyb20gXCIuL3Rvb2x0aXBcIjtcbmltcG9ydCB7VGVtcGxhdGVzfSBmcm9tIFwiLi90ZW1wbGF0ZXNcIjtcbmltcG9ydCB7VGV4dERyYWdIYW5kbGVyfSBmcm9tIFwiLi90ZXh0LWRyYWctaGFuZGxlclwiO1xuaW1wb3J0IHtUZXh0Q29udGV4dE1lbnV9IGZyb20gXCIuL2NvbnRleHQtbWVudS90ZXh0LWNvbnRleHQtbWVudVwiO1xuaW1wb3J0IHtFZGdlQ29udGV4dE1lbnV9IGZyb20gXCIuL2NvbnRleHQtbWVudS9lZGdlLWNvbnRleHQtbWVudVwiO1xuaW1wb3J0ICogYXMgSGFtbWVyIGZyb20gXCJoYW1tZXJqc1wiO1xuaW1wb3J0IHtpMThufSBmcm9tIFwiLi9pMThuL2kxOG5cIjtcblxuXG5leHBvcnQgY2xhc3MgVHJlZURlc2lnbmVyQ29uZmlnIHtcbiAgICB3aWR0aCA9IHVuZGVmaW5lZDtcbiAgICBoZWlnaHQgPSB1bmRlZmluZWQ7XG4gICAgbWFyZ2luID0ge1xuICAgICAgICBsZWZ0OiAyNSxcbiAgICAgICAgcmlnaHQ6IDI1LFxuICAgICAgICB0b3A6IDI1LFxuICAgICAgICBib3R0b206IDI1XG4gICAgfTtcbiAgICBzY2FsZSA9IDE7XG4gICAgbG5nID0gJ2VuJztcbiAgICBsYXlvdXQ9IHtcbiAgICAgICAgdHlwZTogJ3RyZWUnLFxuICAgICAgICBub2RlU2l6ZTogNDAsXG4gICAgICAgIGxpbWl0Tm9kZVBvc2l0aW9uaW5nOiB0cnVlLFxuICAgICAgICBncmlkSGVpZ2h0OiA3NSxcbiAgICAgICAgZ3JpZFdpZHRoOiAxNTAsXG4gICAgICAgIGVkZ2VTbGFudFdpZHRoTWF4OiAyMFxuICAgIH07XG4gICAgZm9udEZhbWlseSA9ICdzYW5zLXNlcmlmJztcbiAgICBmb250U2l6ZSA9ICcxMnB4JztcbiAgICBmb250V2VpZ2h0ID0gJ25vcm1hbCc7XG4gICAgZm9udFN0eWxlID0gJ25vcm1hbCc7XG4gICAgbm9kZSA9IHtcbiAgICAgICAgc3Ryb2tlV2lkdGg6ICcxcHgnLFxuICAgICAgICBvcHRpbWFsOiB7XG4gICAgICAgICAgICBzdHJva2U6ICcjMDA2ZjAwJyxcbiAgICAgICAgICAgIHN0cm9rZVdpZHRoOiAnMS41cHgnLFxuICAgICAgICB9LFxuICAgICAgICBsYWJlbDoge1xuICAgICAgICAgICAgZm9udFNpemU6ICcxZW0nLFxuICAgICAgICAgICAgY29sb3I6ICdibGFjaydcbiAgICAgICAgfSxcbiAgICAgICAgcGF5b2ZmOiB7XG4gICAgICAgICAgICBmb250U2l6ZTogJzFlbScsXG4gICAgICAgICAgICBjb2xvcjogJ2JsYWNrJyxcbiAgICAgICAgICAgIG5lZ2F0aXZlQ29sb3I6ICcjYjYwMDAwJ1xuICAgICAgICB9LFxuICAgICAgICBkZWNpc2lvbjoge1xuICAgICAgICAgICAgZmlsbDogJyNmZjc3NzcnLFxuICAgICAgICAgICAgc3Ryb2tlOiAnIzY2MDAwMCcsXG5cbiAgICAgICAgICAgIHNlbGVjdGVkOiB7XG4gICAgICAgICAgICAgICAgZmlsbDogJyNhYTMzMzMnLFxuICAgICAgICAgICAgICAgIC8vIHN0cm9rZTogJyM2NjY2MDAnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGNoYW5jZToge1xuICAgICAgICAgICAgZmlsbDogJyNmZmZmNDQnLFxuICAgICAgICAgICAgc3Ryb2tlOiAnIzY2NjYwMCcsXG5cbiAgICAgICAgICAgIHNlbGVjdGVkOiB7XG4gICAgICAgICAgICAgICAgZmlsbDogJyNhYWFhMDAnLFxuICAgICAgICAgICAgICAgIC8vIHN0cm9rZTogJyM2NjY2MDAnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHRlcm1pbmFsOntcbiAgICAgICAgICAgIGZpbGw6ICcjNDRmZjQ0JyxcbiAgICAgICAgICAgIHN0cm9rZTogJ2JsYWNrJyxcbiAgICAgICAgICAgIHNlbGVjdGVkOiB7XG4gICAgICAgICAgICAgICAgZmlsbDogJyMwMGFhMDAnLFxuICAgICAgICAgICAgICAgIC8vIHN0cm9rZTogJ2JsYWNrJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBheW9mZjoge1xuICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMWVtJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJyxcbiAgICAgICAgICAgICAgICBuZWdhdGl2ZUNvbG9yOiAnI2I2MDAwMCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICB9O1xuICAgIGVkZ2U9e1xuICAgICAgICBzdHJva2U6ICcjNDI0MjQyJyxcbiAgICAgICAgc3Ryb2tlV2lkdGg6ICcxLjUnLFxuICAgICAgICBvcHRpbWFsOntcbiAgICAgICAgICAgIHN0cm9rZTogJyMwMDZmMDAnLFxuICAgICAgICAgICAgc3Ryb2tlV2lkdGg6ICcyLjQnLFxuICAgICAgICB9LFxuICAgICAgICBzZWxlY3RlZDp7XG4gICAgICAgICAgICBzdHJva2U6ICcjMDQ1YWQxJyxcbiAgICAgICAgICAgIHN0cm9rZVdpZHRoOiAnMy41JyxcbiAgICAgICAgfSxcbiAgICAgICAgbGFiZWw6IHtcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMWVtJyxcbiAgICAgICAgICAgIGNvbG9yOiAnYmFjaydcbiAgICAgICAgfSxcbiAgICAgICAgcGF5b2ZmOntcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMWVtJyxcbiAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snLFxuICAgICAgICAgICAgbmVnYXRpdmVDb2xvcjogJyNiNjAwMDAnXG4gICAgICAgIH1cblxuICAgIH07XG4gICAgcHJvYmFiaWxpdHkgPSB7XG4gICAgICAgIGZvbnRTaXplOiAnMWVtJyxcbiAgICAgICAgY29sb3I6ICcjMDAwMGQ3J1xuICAgIH07XG4gICAgdGl0bGUgPSB7XG4gICAgICAgIGZvbnRTaXplOiAnMTZweCcsXG4gICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcbiAgICAgICAgZm9udFN0eWxlOiAnbm9ybWFsJyxcbiAgICAgICAgY29sb3I6ICcjMDAwMDAwJyxcbiAgICAgICAgbWFyZ2luOntcbiAgICAgICAgICAgIHRvcDogMTUsXG4gICAgICAgICAgICBib3R0b206IDEwXG4gICAgICAgIH1cbiAgICB9O1xuICAgIGRlc2NyaXB0aW9uID0ge1xuICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICBmb250U2l6ZTogJzEycHgnLFxuICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXG4gICAgICAgIGZvbnRTdHlsZTogJ25vcm1hbCcsXG4gICAgICAgIGNvbG9yOiAnIzAwMDAwMCcsXG4gICAgICAgIG1hcmdpbjp7XG4gICAgICAgICAgICB0b3A6IDUsXG4gICAgICAgICAgICBib3R0b206IDEwXG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcmVhZE9ubHk9IGZhbHNlO1xuICAgIGRpc2FibGVBbmltYXRpb25zPWZhbHNlO1xuICAgIGZvcmNlRnVsbEVkZ2VSZWRyYXc9ZmFsc2U7XG4gICAgaGlkZUxhYmVscz1mYWxzZTtcbiAgICBoaWRlUGF5b2Zmcz1mYWxzZTtcbiAgICBoaWRlUHJvYmFiaWxpdGllcz1mYWxzZTtcbiAgICByYXc9ZmFsc2U7XG5cblxuICAgIHBheW9mZk51bWJlckZvcm1hdHRlciA9ICh2LCBpKT0+IHY7XG4gICAgcHJvYmFiaWxpdHlOdW1iZXJGb3JtYXR0ZXIgID0gKHYpPT4gdjtcblxuICAgIG9uTm9kZVNlbGVjdGVkID0gKG5vZGUpID0+IHt9O1xuICAgIG9uRWRnZVNlbGVjdGVkID0gKGVkZ2UpID0+IHt9O1xuICAgIG9uVGV4dFNlbGVjdGVkID0gKHRleHQpID0+IHt9O1xuICAgIG9uU2VsZWN0aW9uQ2xlYXJlZCA9ICgpID0+IHt9O1xuXG4gICAgb3BlcmF0aW9uc0Zvck9iamVjdCA9IChvKSA9PiBbXTtcblxuICAgIHBheW9mZk5hbWVzID0gW251bGwsIG51bGxdO1xuICAgIG1heFBheW9mZnNUb0Rpc3BsYXkgPSAxO1xuXG4gICAgY29uc3RydWN0b3IoY3VzdG9tKSB7XG4gICAgICAgIGlmIChjdXN0b20pIHtcbiAgICAgICAgICAgIFV0aWxzLmRlZXBFeHRlbmQodGhpcywgY3VzdG9tKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgVHJlZURlc2lnbmVyIHtcblxuICAgIGNvbmZpZztcbiAgICBjb250YWluZXI7XG4gICAgZGF0YTsgLy9kYXRhIG1vZGVsIG1hbmFnZXJcbiAgICBzdmc7XG5cbiAgICBjb25zdHJ1Y3Rvcihjb250YWluZXIsIGRhdGFNb2RlbCwgY29uZmlnKXtcbiAgICAgICAgdGhpcy5zZXRDb25maWcoY29uZmlnKTtcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YU1vZGVsO1xuICAgICAgICB0aGlzLmluaXRDb250YWluZXIoY29udGFpbmVyKTtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuXG4gICAgc2V0Q29uZmlnKGNvbmZpZykge1xuICAgICAgICB0aGlzLmNvbmZpZyA9IG5ldyBUcmVlRGVzaWduZXJDb25maWcoY29uZmlnKTtcbiAgICAgICAgaWYodGhpcy5sYXlvdXQpe1xuICAgICAgICAgICAgdGhpcy5sYXlvdXQuY29uZmlnPXRoaXMuY29uZmlnLmxheW91dDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0ZUN1c3RvbVN0eWxlcygpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBpbml0KCl7XG5cbiAgICAgICAgdGhpcy5pbml0U3ZnKCk7XG4gICAgICAgIHRoaXMuaW5pdExheW91dCgpO1xuICAgICAgICB0aGlzLmluaXRJMThuKCk7XG4gICAgICAgIHRoaXMuaW5pdEJydXNoKCk7XG4gICAgICAgIHRoaXMuaW5pdEVkZ2VNYXJrZXJzKCk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVDdXN0b21TdHlsZXMoKTtcbiAgICAgICAgaWYoIXRoaXMuY29uZmlnLnJlYWRPbmx5KXtcbiAgICAgICAgICAgIHRoaXMuaW5pdE1haW5Db250ZXh0TWVudSgpO1xuICAgICAgICAgICAgdGhpcy5pbml0Tm9kZUNvbnRleHRNZW51KCk7XG4gICAgICAgICAgICB0aGlzLmluaXRFZGdlQ29udGV4dE1lbnUoKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdE5vZGVEcmFnSGFuZGxlcigpO1xuICAgICAgICAgICAgdGhpcy5pbml0VGV4dERyYWdIYW5kbGVyKCk7XG4gICAgICAgICAgICB0aGlzLmluaXRUZXh0Q29udGV4dE1lbnUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlZHJhdygpO1xuICAgIH1cblxuICAgIGluaXRJMThuKCkge1xuICAgICAgICBpMThuLmluaXQodGhpcy5jb25maWcubG5nKTtcbiAgICB9XG5cblxuICAgIHVwZGF0ZUN1c3RvbVN0eWxlcygpe1xuICAgICAgICBkMy5zZWxlY3QoJ2hlYWQnKS5zZWxlY3RPckFwcGVuZCgnc3R5bGUjc2QtdHJlZS1kZXNpZ25lci1zdHlsZScpLmh0bWwoVGVtcGxhdGVzLmdldCgndHJlZURlc2lnbmVyU3R5bGVzJywgdGhpcy5jb25maWcpKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgaW5pdExheW91dCgpe1xuICAgICAgICB0aGlzLmxheW91dCA9IG5ldyBMYXlvdXQodGhpcywgdGhpcy5kYXRhLCB0aGlzLmNvbmZpZy5sYXlvdXQpO1xuICAgIH1cblxuICAgIGluaXROb2RlRHJhZ0hhbmRsZXIoKXtcbiAgICAgICAgdGhpcy5ub2RlRHJhZ0hhbmRsZXIgPSBuZXcgTm9kZURyYWdIYW5kbGVyKHRoaXMsIHRoaXMuZGF0YSk7XG4gICAgfVxuXG4gICAgaW5pdFRleHREcmFnSGFuZGxlcigpe1xuICAgICAgICB0aGlzLnRleHREcmFnSGFuZGxlciA9IG5ldyBUZXh0RHJhZ0hhbmRsZXIodGhpcywgdGhpcy5kYXRhKTtcbiAgICB9XG5cbiAgICByZWRyYXcod2l0aFRyYW5zaXRpb25zPWZhbHNlKXtcblxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHdpdGhUcmFuc2l0aW9ucyA9ICFzZWxmLmNvbmZpZy5kaXNhYmxlQW5pbWF0aW9ucyAmJiB3aXRoVHJhbnNpdGlvbnM7XG4gICAgICAgIHRoaXMucmVkcmF3RGlhZ3JhbVRpdGxlKCk7XG4gICAgICAgIHRoaXMucmVkcmF3RGlhZ3JhbURlc2NyaXB0aW9uKCk7XG4gICAgICAgIHRoaXMudXBkYXRlU2NhbGUod2l0aFRyYW5zaXRpb25zKTtcbiAgICAgICAgdGhpcy51cGRhdGVNYXJnaW4od2l0aFRyYW5zaXRpb25zKTtcbiAgICAgICAgaWYod2l0aFRyYW5zaXRpb25zKXtcbiAgICAgICAgICAgIHNlbGYudHJhbnNpdGlvblByZXYgPSBzZWxmLnRyYW5zaXRpb247XG4gICAgICAgICAgICBzZWxmLnRyYW5zaXRpb24gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVkcmF3Tm9kZXMoKTtcbiAgICAgICAgdGhpcy5yZWRyYXdFZGdlcygpO1xuICAgICAgICB0aGlzLnJlZHJhd0Zsb2F0aW5nVGV4dHMoKTtcbiAgICAgICAgdGhpcy51cGRhdGVWYWxpZGF0aW9uTWVzc2FnZXMoKTtcbiAgICAgICAgaWYod2l0aFRyYW5zaXRpb25zKXtcbiAgICAgICAgICAgIHNlbGYudHJhbnNpdGlvbiA9ICBzZWxmLnRyYW5zaXRpb25QcmV2O1xuICAgICAgICB9XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHNlbGYudXBkYXRlUGxvdHRpbmdSZWdpb25TaXplKCk7XG4gICAgICAgIH0sMTApO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGNvbXB1dGVBdmFpbGFibGVTcGFjZSgpe1xuICAgICAgICB0aGlzLmF2YWlsYWJsZUhlaWdodCA9IEFwcFV0aWxzLnNhbml0aXplSGVpZ2h0KHRoaXMuY29uZmlnLmhlaWdodCwgdGhpcy5jb250YWluZXIsIHRoaXMuY29uZmlnLm1hcmdpbik7XG4gICAgICAgIHRoaXMuYXZhaWxhYmxlV2lkdGggPSBBcHBVdGlscy5zYW5pdGl6ZVdpZHRoKHRoaXMuY29uZmlnLndpZHRoLCB0aGlzLmNvbnRhaW5lciwgdGhpcy5jb25maWcubWFyZ2luKTtcbiAgICB9XG5cbiAgICBpbml0U3ZnKCkge1xuICAgICAgICB2YXIgYyA9IHRoaXM7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5jb21wdXRlQXZhaWxhYmxlU3BhY2UoKTtcbiAgICAgICAgdGhpcy5zdmcgPSB0aGlzLmNvbnRhaW5lci5zZWxlY3RPckFwcGVuZCgnc3ZnLnNkLXRyZWUtZGVzaWduZXInKTtcbiAgICAgICAgdGhpcy5zdmcuYXR0cignd2lkdGgnLCB0aGlzLmF2YWlsYWJsZVdpZHRoKS5hdHRyKCdoZWlnaHQnLCB0aGlzLmF2YWlsYWJsZUhlaWdodCk7XG5cbiAgICAgICAgdGhpcy53cmFwcGVyR3JvdXAgPSB0aGlzLnN2Zy5zZWxlY3RPckFwcGVuZCgnZy5zZC13cmFwcGVyLWdyb3VwJyk7XG4gICAgICAgIHRoaXMubWFpbkdyb3VwID0gdGhpcy53cmFwcGVyR3JvdXAuc2VsZWN0T3JBcHBlbmQoJ2cubWFpbi1ncm91cCcpO1xuICAgICAgICB0aGlzLnVwZGF0ZVNjYWxlKCk7XG4gICAgICAgIHRoaXMudXBkYXRlTWFyZ2luKCk7XG5cblxuICAgICAgICBpZiAoIXRoaXMuY29uZmlnLndpZHRoKSB7XG4gICAgICAgICAgICBkMy5zZWxlY3Qod2luZG93KVxuICAgICAgICAgICAgICAgIC5vbihcInJlc2l6ZS50cmVlLWRlc2lnbmVyXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi51cGRhdGVQbG90dGluZ1JlZ2lvblNpemUoKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5yZWRyYXdEaWFncmFtVGl0bGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBtYyA9IG5ldyBIYW1tZXIuTWFuYWdlcih0aGlzLnN2Zy5ub2RlKCksIHt0b3VjaEFjdGlvbiA6ICdhdXRvJ30pO1xuICAgICAgICBtYy5hZGQobmV3IEhhbW1lci5QcmVzcyh7XG4gICAgICAgICAgICBwb2ludGVyVHlwZTogJ3RvdWNoJ1xuICAgICAgICB9KSk7XG5cbiAgICAgICAgbWMuYWRkKG5ldyBIYW1tZXIuUGluY2goe1xuICAgICAgICAgICAgcG9pbnRlclR5cGU6ICd0b3VjaCdcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIHZhciBjYW5jZWw7XG4gICAgICAgIG1jLm9uKCdwaW5jaHN0YXJ0JywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHNlbGYuZGlzYWJsZUJydXNoKCk7XG4gICAgICAgIH0pXG4gICAgICAgIG1jLm9uKCdwaW5jaCcsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBjYW5jZWwgPSBVdGlscy53YWl0Rm9yRmluYWxFdmVudCgoKT0+c2VsZi5lbmFibGVCcnVzaCgpLCAncGluY2hlbmQnLCA1MDAwKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHVwZGF0ZU1hcmdpbih3aXRoVHJhbnNpdGlvbnMpe1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBtYXJnaW4gPSB0aGlzLmNvbmZpZy5tYXJnaW47XG4gICAgICAgIHZhciBncm91cCA9IHRoaXMubWFpbkdyb3VwO1xuICAgICAgICBpZih3aXRoVHJhbnNpdGlvbnMpe1xuICAgICAgICAgICAgZ3JvdXAgPSBncm91cC50cmFuc2l0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRvcE1hcmdpbiA9IG1hcmdpbi50b3A7XG4gICAgICAgIGlmKHRoaXMuZGlhZ3JhbVRpdGxlfHx0aGlzLmRpYWdyYW1EZXNjcmlwdGlvbil7XG4gICAgICAgICAgICB0aGlzLnRvcE1hcmdpbiA9IHBhcnNlSW50KHRoaXMuZGlhZ3JhbVRpdGxlID8gdGhpcy5jb25maWcudGl0bGUubWFyZ2luLnRvcCA6IDApICsgdGhpcy5nZXRUaXRsZUdyb3VwSGVpZ2h0KClcbiAgICAgICAgICAgICAgICArICBNYXRoLm1heCh0aGlzLnRvcE1hcmdpbiwgcGFyc2VJbnQodGhpcy5jb25maWcudGl0bGUubWFyZ2luLmJvdHRvbSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ3JvdXAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZShcIiArIG1hcmdpbi5sZWZ0ICsgXCIsXCIgKyB0aGlzLnRvcE1hcmdpbiArIFwiKVwiKS5vbihcImVuZFwiLCAoKT0+IHNlbGYudXBkYXRlUGxvdHRpbmdSZWdpb25TaXplKCkpO1xuICAgIH1cblxuICAgIHNldE1hcmdpbihtYXJnaW4sIHdpdGhvdXRTdGF0ZVNhdmluZyl7XG4gICAgICAgIHZhciBzZWxmPXRoaXM7XG4gICAgICAgIGlmKCF3aXRob3V0U3RhdGVTYXZpbmcpe1xuICAgICAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSh7XG4gICAgICAgICAgICAgICAgZGF0YTp7XG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbjogVXRpbHMuY2xvbmUoc2VsZi5jb25maWcubWFyZ2luKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25VbmRvOiAoZGF0YSk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0TWFyZ2luKGRhdGEubWFyZ2luLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uUmVkbzogKGRhdGEpPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldE1hcmdpbihtYXJnaW4sIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIFV0aWxzLmRlZXBFeHRlbmQodGhpcy5jb25maWcubWFyZ2luLCBtYXJnaW4pO1xuICAgICAgICB0aGlzLnJlZHJhd0RpYWdyYW1UaXRsZSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZU1hcmdpbih0cnVlKTtcbiAgICB9XG5cblxuICAgIHVwZGF0ZVNjYWxlKHdpdGhUcmFuc2l0aW9ucyl7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIHNjYWxlID0gdGhpcy5jb25maWcuc2NhbGU7XG4gICAgICAgIHZhciBncm91cCA9IHRoaXMud3JhcHBlckdyb3VwO1xuICAgICAgICBpZih3aXRoVHJhbnNpdGlvbnMpe1xuICAgICAgICAgICAgZ3JvdXAgPSBncm91cC50cmFuc2l0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICBncm91cC5hdHRyKFwidHJhbnNmb3JtXCIsIFwic2NhbGUoXCIgKyBzY2FsZSArIFwiKVwiKS5vbihcImVuZFwiLCAoKT0+IHNlbGYudXBkYXRlUGxvdHRpbmdSZWdpb25TaXplKCkpO1xuICAgIH1cblxuICAgIHNldFNjYWxlKHNjYWxlLCB3aXRob3V0U3RhdGVTYXZpbmcpe1xuICAgICAgICB2YXIgc2VsZj10aGlzO1xuICAgICAgICBpZighd2l0aG91dFN0YXRlU2F2aW5nKXtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoe1xuICAgICAgICAgICAgICAgIGRhdGE6e1xuICAgICAgICAgICAgICAgICAgICBzY2FsZTogVXRpbHMuY2xvbmUoc2VsZi5jb25maWcuc2NhbGUpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvblVuZG86IChkYXRhKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRTY2FsZShkYXRhLnNjYWxlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uUmVkbzogKGRhdGEpPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldFNjYWxlKHNjYWxlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbmZpZy5zY2FsZSA9IHNjYWxlO1xuICAgICAgICB0aGlzLnVwZGF0ZVNjYWxlKHRydWUpO1xuICAgIH1cblxuICAgIGluaXRDb250YWluZXIoY29udGFpbmVySWRPckVsZW0pIHtcbiAgICAgICAgaWYgKFV0aWxzLmlzU3RyaW5nKGNvbnRhaW5lcklkT3JFbGVtKSkge1xuICAgICAgICAgICAgdmFyIHNlbGVjdG9yID0gY29udGFpbmVySWRPckVsZW0udHJpbSgpO1xuXG4gICAgICAgICAgICBpZiAoIVV0aWxzLnN0YXJ0c1dpdGgoc2VsZWN0b3IsICcjJykgJiYgIVV0aWxzLnN0YXJ0c1dpdGgoc2VsZWN0b3IsICcuJykpIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvciA9ICcjJyArIHNlbGVjdG9yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIgPSBkMy5zZWxlY3Qoc2VsZWN0b3IpO1xuICAgICAgICB9IGVsc2UgaWYoY29udGFpbmVySWRPckVsZW0uX3BhcmVudHMpe1xuICAgICAgICAgICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXJJZE9yRWxlbVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyID0gZDMuc2VsZWN0KGNvbnRhaW5lcklkT3JFbGVtKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZVBsb3R0aW5nUmVnaW9uU2l6ZSgpIHtcbiAgICAgICAgdmFyIGNoYW5nZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jb21wdXRlQXZhaWxhYmxlU3BhY2UoKTtcbiAgICAgICAgdmFyIG1hcmdpbiA9IHRoaXMuY29uZmlnLm1hcmdpbjtcbiAgICAgICAgdmFyIHN2Z1dpZHRoID0gdGhpcy5zdmcuYXR0cignd2lkdGgnKTtcbiAgICAgICAgdmFyIHN2Z0hlaWdodCA9IHRoaXMuc3ZnLmF0dHIoJ2hlaWdodCcpO1xuICAgICAgICB2YXIgbWFpbkdyb3VwQm94ID0gdGhpcy5tYWluR3JvdXAubm9kZSgpLmdldEJCb3goKTtcbiAgICAgICAgbGV0IGJveFdpZHRoID0gbWFpbkdyb3VwQm94LndpZHRoO1xuICAgICAgICB2YXIgbmV3U3ZnV2lkdGggPSBib3hXaWR0aCttYWluR3JvdXBCb3gueCttYXJnaW4ubGVmdCttYXJnaW4ucmlnaHQ7XG4gICAgICAgIG5ld1N2Z1dpZHRoICAqPSB0aGlzLmNvbmZpZy5zY2FsZTtcbiAgICAgICAgdGhpcy5jb250YWluZXIuY2xhc3NlZCgnd2l0aC1vdmVyZmxvdy14JywgbmV3U3ZnV2lkdGg+PXRoaXMuYXZhaWxhYmxlV2lkdGgpO1xuICAgICAgICBuZXdTdmdXaWR0aCA9IE1hdGgubWF4KG5ld1N2Z1dpZHRoLCB0aGlzLmF2YWlsYWJsZVdpZHRoKTtcbiAgICAgICAgaWYoc3ZnV2lkdGghPW5ld1N2Z1dpZHRoKXtcbiAgICAgICAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zdmcuYXR0cignd2lkdGgnLCBuZXdTdmdXaWR0aCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGJveEhlaWdodCA9IG1haW5Hcm91cEJveC5oZWlnaHQ7XG4gICAgICAgIHZhciBuZXdTdmdIZWlnaHQgPSBib3hIZWlnaHQrbWFpbkdyb3VwQm94LnkrdGhpcy50b3BNYXJnaW4rbWFyZ2luLmJvdHRvbTtcbiAgICAgICAgbmV3U3ZnSGVpZ2h0ICo9IHRoaXMuY29uZmlnLnNjYWxlO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5jbGFzc2VkKCd3aXRoLW92ZXJmbG93LXknLCBuZXdTdmdIZWlnaHQ+PXRoaXMuYXZhaWxhYmxlSGVpZ2h0KTtcbiAgICAgICAgbmV3U3ZnSGVpZ2h0ID0gTWF0aC5tYXgobmV3U3ZnSGVpZ2h0LCB0aGlzLmF2YWlsYWJsZUhlaWdodCk7XG4gICAgICAgIGlmKHN2Z0hlaWdodCE9bmV3U3ZnSGVpZ2h0KXtcbiAgICAgICAgICAgIGNoYW5nZWQ9dHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc3ZnLmF0dHIoJ2hlaWdodCcsIG5ld1N2Z0hlaWdodCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoY2hhbmdlZCl7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUJydXNoRXh0ZW50KClcbiAgICAgICAgfVxuXG5cbiAgICB9XG5cbiAgICByZWRyYXdOb2RlcygpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG5cbiAgICAgICAgdmFyIG5vZGVzQ29udGFpbmVyID0gdGhpcy5tYWluR3JvdXAuc2VsZWN0T3JBcHBlbmQoJ2cubm9kZXMnKTtcbiAgICAgICAgdmFyIG5vZGVzID0gbm9kZXNDb250YWluZXIuc2VsZWN0QWxsKCcubm9kZScpLmRhdGEodGhpcy5kYXRhLm5vZGVzLmZpbHRlcihkPT4hZC4kaGlkZGVuKSwgKGQsaSk9PiBkLiRpZCk7XG4gICAgICAgIG5vZGVzLmV4aXQoKS5yZW1vdmUoKTtcbiAgICAgICAgdmFyIG5vZGVzRW50ZXIgPSBub2Rlcy5lbnRlcigpLmFwcGVuZCgnZycpXG4gICAgICAgICAgICAuYXR0cignaWQnLCBkPT4nbm9kZS0nK2QuJGlkKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgZD0+ZC50eXBlKyctbm9kZSBub2RlJylcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBkPT4ndHJhbnNsYXRlKCcgKyBkLmxvY2F0aW9uLnggKyAnICAnICsgZC5sb2NhdGlvbi55ICsgJyknKTtcbiAgICAgICAgbm9kZXNFbnRlci5hcHBlbmQoJ3BhdGgnKTtcblxuICAgICAgICB2YXIgbGFiZWxFbnRlciA9IG5vZGVzRW50ZXIuYXBwZW5kKCd0ZXh0JykuYXR0cignY2xhc3MnLCAnbGFiZWwnKTtcbiAgICAgICAgdmFyIHBheW9mZkVudGVyID0gbm9kZXNFbnRlci5hcHBlbmQoJ3RleHQnKS5hdHRyKCdjbGFzcycsICdwYXlvZmYgY29tcHV0ZWQnKTtcbiAgICAgICAgdmFyIGluZGljYXRvckVudGVyID0gbm9kZXNFbnRlci5hcHBlbmQoJ3RleHQnKS5hdHRyKCdjbGFzcycsICdlcnJvci1pbmRpY2F0b3InKS50ZXh0KCchIScpO1xuICAgICAgICB2YXIgYWdncmVnYXRlZFBheW9mZkVudGVyID0gbm9kZXNFbnRlci5hcHBlbmQoJ3RleHQnKS5hdHRyKCdjbGFzcycsICdhZ2dyZWdhdGVkLXBheW9mZicpO1xuICAgICAgICB2YXIgcHJvYmFiaWxpdHlUb0VudGVyRW50ZXIgPSBub2Rlc0VudGVyLmFwcGVuZCgndGV4dCcpLmF0dHIoJ2NsYXNzJywgJ3Byb2JhYmlsaXR5LXRvLWVudGVyJyk7XG5cbiAgICAgICAgdmFyIG5vZGVzTWVyZ2UgPSBub2Rlc0VudGVyLm1lcmdlKG5vZGVzKTtcbiAgICAgICAgbm9kZXNNZXJnZS5jbGFzc2VkKCdvcHRpbWFsJywgKGQpPT5zZWxmLmlzT3B0aW1hbChkKSk7XG5cbiAgICAgICAgdmFyIG5vZGVzTWVyZ2VUID0gbm9kZXNNZXJnZTtcbiAgICAgICAgaWYodGhpcy50cmFuc2l0aW9uKXtcbiAgICAgICAgICAgIG5vZGVzTWVyZ2VUID0gbm9kZXNNZXJnZS50cmFuc2l0aW9uKCk7XG4gICAgICAgICAgICBub2Rlc01lcmdlVC5vbignZW5kJywgKCk9PiBzZWxmLnVwZGF0ZVBsb3R0aW5nUmVnaW9uU2l6ZSgpKVxuICAgICAgICB9XG4gICAgICAgIG5vZGVzTWVyZ2VUXG4gICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgZD0+J3RyYW5zbGF0ZSgnICsgZC5sb2NhdGlvbi54ICsgJyAgJyArIGQubG9jYXRpb24ueSArICcpJylcblxuICAgICAgICB2YXIgcGF0aCA9IG5vZGVzTWVyZ2Uuc2VsZWN0KCdwYXRoJyk7XG4gICAgICAgIHRoaXMubGF5b3V0LmRyYXdOb2RlU3ltYm9sKHBhdGgsdGhpcy50cmFuc2l0aW9uKTtcblxuICAgICAgICAvKnBhdGhcbiAgICAgICAgICAgIC5zdHlsZSgnZmlsbCcsIGQ9PiB7XG4gICAgICAgICAgICAgICAgLy8gaWYoc2VsZi5pc05vZGVTZWxlY3RlZChkKSl7XG4gICAgICAgICAgICAgICAgLy8gICAgIHJldHVybiBzZWxmLmNvbmZpZy5ub2RlW2QudHlwZV0uc2VsZWN0ZWQuZmlsbFxuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5jb25maWcubm9kZVtkLnR5cGVdLmZpbGxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3R5bGUoJ3N0cm9rZScsIGQ9PiBzZWxmLmNvbmZpZy5ub2RlW2QudHlwZV0uc3Ryb2tlKVxuICAgICAgICAgICAgLnN0eWxlKCdzdHJva2Utd2lkdGgnLCBkPT4ge1xuICAgICAgICAgICAgICAgIGlmKHNlbGYuY29uZmlnLm5vZGVbZC50eXBlXS5zdHJva2VXaWR0aCE9PXVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLmNvbmZpZy5ub2RlW2QudHlwZV0uc3Ryb2tlV2lkdGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLmNvbmZpZy5ub2RlLnN0cm9rZVdpZHRoO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICovXG4gICAgICAgIHRoaXMubGF5b3V0Lm5vZGVMYWJlbFBvc2l0aW9uKGxhYmVsRW50ZXIpO1xuICAgICAgICB2YXIgbGFiZWxNZXJnZSA9IG5vZGVzTWVyZ2Uuc2VsZWN0KCd0ZXh0LmxhYmVsJyk7XG4gICAgICAgIGxhYmVsTWVyZ2UuY2xhc3NlZCgnc2QtaGlkZGVuJywgdGhpcy5jb25maWcuaGlkZUxhYmVscyk7XG4gICAgICAgIHZhciBsYWJlbE1lcmdlVCA9IG5vZGVzTWVyZ2VULnNlbGVjdCgndGV4dC5sYWJlbCcpO1xuICAgICAgICBsYWJlbE1lcmdlVC5lYWNoKHRoaXMudXBkYXRlVGV4dExpbmVzKTtcbiAgICAgICAgdGhpcy5sYXlvdXQubm9kZUxhYmVsUG9zaXRpb24obGFiZWxNZXJnZVQpXG4gICAgICAgICAgICAuYXR0cigndGV4dC1hbmNob3InLCAnbWlkZGxlJylcblxuICAgICAgICB2YXIgcGF5b2ZmID0gbm9kZXNNZXJnZS5zZWxlY3QoJ3RleHQucGF5b2ZmJyk7XG5cbiAgICAgICAgdmFyIHBheW9mZlRzcGFucyA9IHBheW9mZi5zZWxlY3RBbGwoJ3RzcGFuJykuZGF0YShkPT57XG4gICAgICAgICAgICBsZXQgaXRlbSA9IGQuZGlzcGxheVZhbHVlKCdjaGlsZHJlblBheW9mZicpO1xuICAgICAgICAgICAgcmV0dXJuIFV0aWxzLmlzQXJyYXkoaXRlbSkgPyBpdGVtLmZpbHRlcihpPT5pICE9PSB1bmRlZmluZWQpIDogW2l0ZW1dXG4gICAgICAgIH0pO1xuICAgICAgICBwYXlvZmZUc3BhbnMuZXhpdCgpLnJlbW92ZSgpO1xuXG4gICAgICAgIHZhciBwYXlvZmZUc3BhbnNNID0gcGF5b2ZmVHNwYW5zLmVudGVyKCkuYXBwZW5kKCd0c3BhbicpLm1lcmdlKHBheW9mZlRzcGFucyk7XG4gICAgICAgIHBheW9mZlRzcGFuc01cbiAgICAgICAgICAgIC8vIC5hdHRyKCdkb21pbmFudC1iYXNlbGluZScsICdoYW5naW5nJylcbiAgICAgICAgICAgIC5hdHRyKCdkeScsIChkLGkpPT5pPjAgPyAnMS4xZW0nOiB1bmRlZmluZWQpXG4gICAgICAgICAgICAuYXR0cigneCcsICcwJylcbiAgICAgICAgICAgIC5jbGFzc2VkKCduZWdhdGl2ZScsIGQ9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQhPT1udWxsICYmIGQ8MDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2xhc3NlZCgnc2QtaGlkZGVuJywgdGhpcy5jb25maWcuaGlkZVBheW9mZnMgfHwgdGhpcy5jb25maWcucmF3KVxuICAgICAgICAgICAgLnRleHQoKGQsIGkpPT4ge1xuICAgICAgICAgICAgICAgIHZhciB2YWwgPSBkXG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsIT09bnVsbCA/IChpc05hTih2YWwpID8gdmFsIDogc2VsZi5jb25maWcucGF5b2ZmTnVtYmVyRm9ybWF0dGVyKHZhbCwgaSkpOiAnJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuYXR0YWNoUGF5b2ZmVG9vbHRpcChwYXlvZmZUc3BhbnNNKTtcblxuXG4gICAgICAgIHZhciBwYXlvZmZUID0gcGF5b2ZmO1xuICAgICAgICBpZih0aGlzLnRyYW5zaXRpb24pe1xuICAgICAgICAgICAgcGF5b2ZmVCA9IHBheW9mZi50cmFuc2l0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxheW91dC5ub2RlUGF5b2ZmUG9zaXRpb24ocGF5b2ZmRW50ZXIpO1xuICAgICAgICB0aGlzLmxheW91dC5ub2RlUGF5b2ZmUG9zaXRpb24ocGF5b2ZmVCk7XG5cbiAgICAgICAgdmFyIGFnZ3JlZ2F0ZWRQYXlvZmYgPSBub2Rlc01lcmdlLnNlbGVjdCgndGV4dC5hZ2dyZWdhdGVkLXBheW9mZicpO1xuICAgICAgICB2YXIgYWdncmVnYXRlZFBheW9mZlRzcGFucyA9IGFnZ3JlZ2F0ZWRQYXlvZmYuc2VsZWN0QWxsKCd0c3BhbicpLmRhdGEoZD0+e1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSBkLmRpc3BsYXlWYWx1ZSgnYWdncmVnYXRlZFBheW9mZicpO1xuICAgICAgICAgICAgcmV0dXJuIFV0aWxzLmlzQXJyYXkoaXRlbSkgPyBpdGVtLmZpbHRlcihpPT5pICE9PSB1bmRlZmluZWQpIDogW2l0ZW1dXG4gICAgICAgIH0pO1xuICAgICAgICBhZ2dyZWdhdGVkUGF5b2ZmVHNwYW5zLmV4aXQoKS5yZW1vdmUoKTtcbiAgICAgICAgdmFyIGFnZ3JlZ2F0ZWRQYXlvZmZUc3BhbnNNID0gYWdncmVnYXRlZFBheW9mZlRzcGFucy5lbnRlcigpLmFwcGVuZCgndHNwYW4nKS5tZXJnZShhZ2dyZWdhdGVkUGF5b2ZmVHNwYW5zKVxuICAgICAgICAgICAgLmF0dHIoJ2R5JywgKGQsaSk9Pmk+MCA/ICcwLjk1ZW0nOiB1bmRlZmluZWQpXG4gICAgICAgICAgICAuY2xhc3NlZCgnbmVnYXRpdmUnLCBkPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBkIT09bnVsbCAmJiBkPDA7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNsYXNzZWQoJ3NkLWhpZGRlbicsIHRoaXMuY29uZmlnLmhpZGVQYXlvZmZzIHx8IHRoaXMuY29uZmlnLnJhdylcbiAgICAgICAgICAgIC50ZXh0KCh2YWwsIGkpPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWwhPT1udWxsID8gKGlzTmFOKHZhbCkgPyB2YWwgOiBzZWxmLmNvbmZpZy5wYXlvZmZOdW1iZXJGb3JtYXR0ZXIodmFsLCBpKSk6ICcnXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmF0dGFjaFBheW9mZlRvb2x0aXAoYWdncmVnYXRlZFBheW9mZlRzcGFuc00sICdhZ2dyZWdhdGVkUGF5b2ZmJyk7XG5cbiAgICAgICAgdmFyIGFnZ3JlZ2F0ZWRQYXlvZmZUID0gYWdncmVnYXRlZFBheW9mZjtcbiAgICAgICAgaWYodGhpcy50cmFuc2l0aW9uKXtcbiAgICAgICAgICAgIGFnZ3JlZ2F0ZWRQYXlvZmZUID0gYWdncmVnYXRlZFBheW9mZi50cmFuc2l0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxheW91dC5ub2RlQWdncmVnYXRlZFBheW9mZlBvc2l0aW9uKGFnZ3JlZ2F0ZWRQYXlvZmZFbnRlcik7XG4gICAgICAgIHRoaXMubGF5b3V0Lm5vZGVBZ2dyZWdhdGVkUGF5b2ZmUG9zaXRpb24oYWdncmVnYXRlZFBheW9mZlQpO1xuXG4gICAgICAgIHZhciBwcm9iYWJpbGl0eVRvRW50ZXIgPSBub2Rlc01lcmdlLnNlbGVjdCgndGV4dC5wcm9iYWJpbGl0eS10by1lbnRlcicpXG4gICAgICAgICAgICAudGV4dChkPT57XG4gICAgICAgICAgICAgICAgdmFyIHZhbCA9IGQuZGlzcGxheVZhbHVlKCdwcm9iYWJpbGl0eVRvRW50ZXInKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsIT09bnVsbCA/IChpc05hTih2YWwpID8gdmFsIDogc2VsZi5jb25maWcucHJvYmFiaWxpdHlOdW1iZXJGb3JtYXR0ZXIodmFsKSk6ICcnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNsYXNzZWQoJ3NkLWhpZGRlbicsIHRoaXMuY29uZmlnLmhpZGVQcm9iYWJpbGl0aWVzIHx8IHRoaXMuY29uZmlnLnJhdyk7XG4gICAgICAgIFRvb2x0aXAuYXR0YWNoKHByb2JhYmlsaXR5VG9FbnRlciwgaTE4bi50KCd0b29sdGlwLm5vZGUucHJvYmFiaWxpdHlUb0VudGVyJykpO1xuXG5cbiAgICAgICAgdmFyIHByb2JhYmlsaXR5VG9FbnRlclQgPSBwcm9iYWJpbGl0eVRvRW50ZXI7XG4gICAgICAgIGlmKHRoaXMudHJhbnNpdGlvbil7XG4gICAgICAgICAgICBwcm9iYWJpbGl0eVRvRW50ZXJUID0gcHJvYmFiaWxpdHlUb0VudGVyLnRyYW5zaXRpb24oKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxheW91dC5ub2RlUHJvYmFiaWxpdHlUb0VudGVyUG9zaXRpb24ocHJvYmFiaWxpdHlUb0VudGVyRW50ZXIpO1xuICAgICAgICB0aGlzLmxheW91dC5ub2RlUHJvYmFiaWxpdHlUb0VudGVyUG9zaXRpb24ocHJvYmFiaWxpdHlUb0VudGVyVCk7XG5cblxuICAgICAgICB2YXIgaW5kaWNhdG9yID0gbm9kZXNNZXJnZS5zZWxlY3QoJ3RleHQuZXJyb3ItaW5kaWNhdG9yJyk7XG4gICAgICAgIGluZGljYXRvci5jbGFzc2VkKCdzZC1oaWRkZW4nLCB0aGlzLmNvbmZpZy5yYXcpXG4gICAgICAgIHRoaXMubGF5b3V0Lm5vZGVJbmRpY2F0b3JQb3NpdGlvbihpbmRpY2F0b3JFbnRlcik7XG4gICAgICAgIHRoaXMubGF5b3V0Lm5vZGVJbmRpY2F0b3JQb3NpdGlvbihpbmRpY2F0b3IpO1xuXG4gICAgICAgIGlmKHRoaXMubm9kZURyYWdIYW5kbGVyKXtcbiAgICAgICAgICAgIG5vZGVzTWVyZ2UuY2FsbCh0aGlzLm5vZGVEcmFnSGFuZGxlci5kcmFnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG5vZGVzTWVyZ2Uub24oJ2NvbnRleHRtZW51JywgdGhpcy5ub2RlQ29udGV4dE1lbnUpO1xuICAgICAgICBub2Rlc01lcmdlLm9uKCdkYmxjbGljaycsIHRoaXMubm9kZUNvbnRleHRNZW51KVxuICAgICAgICBub2Rlc01lcmdlLmVhY2goZnVuY3Rpb24oZCwgaSl7XG4gICAgICAgICAgICB2YXIgbm9kZUVsZW0gPSB0aGlzO1xuICAgICAgICAgICAgdmFyIG1jID0gbmV3IEhhbW1lci5NYW5hZ2VyKG5vZGVFbGVtKTtcbiAgICAgICAgICAgIG1jLmFkZChuZXcgSGFtbWVyLlByZXNzKHtcbiAgICAgICAgICAgICAgICBwb2ludGVyVHlwZTogJ3RvdWNoJ1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgbWMub24oJ3ByZXNzJywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICAgICAgaWYoZS5wb2ludGVyVHlwZT09J3RvdWNoJyl7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubm9kZURyYWdIYW5kbGVyLmNhbmNlbERyYWcoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuXG5cbiAgICAgICAgICAgIGlmKGQuZm9sZGVkKXtcbiAgICAgICAgICAgICAgICBsZXQgYnV0dG9uID0gZDMuc2VsZWN0KG5vZGVFbGVtKS5zZWxlY3RPckFwcGVuZCgndGV4dC5zZC11bmZvbGQtYnV0dG9uJylcbiAgICAgICAgICAgICAgICAgICAgLnRleHQoXCJbK11cIilcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdjbGljayBkYmNsaWNrIG1vdXNlZG93bicsICgpPT5zZWxmLmZvbGRTdWJ0cmVlKGQsIGZhbHNlKSk7IC8vZmlyZWZveCBkZXRlY3RzIG9ubHkgbW91c2Vkb3duIGV2ZW50IC0gcmVsYXRlZCB0byBkcmFnIGhhbmRsZXJcblxuICAgICAgICAgICAgICAgIHNlbGYubGF5b3V0Lm5vZGVVbmZvbGRCdXR0b25Qb3NpdGlvbihidXR0b24pO1xuICAgICAgICAgICAgICAgIFRvb2x0aXAuYXR0YWNoKGJ1dHRvbiwgaTE4bi50KCdjb250ZXh0TWVudS5ub2RlLnVuZm9sZCcpKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGQzLnNlbGVjdChub2RlRWxlbSkuc2VsZWN0KCcuc2QtdW5mb2xkLWJ1dHRvbicpLnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgYXR0YWNoUGF5b2ZmVG9vbHRpcChzZWxlY3Rpb24sIHBheW9mZkZpbGVkTmFtZSA9ICdwYXlvZmYnLCBvYmplY3Q9J25vZGUnKXtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBUb29sdGlwLmF0dGFjaChzZWxlY3Rpb24sIChkLCBpKT0+e1xuICAgICAgICAgICAgaWYoc2VsZi5jb25maWcucGF5b2ZmTmFtZXMubGVuZ3RoPmkgJiYgc2VsZi5jb25maWcucGF5b2ZmTmFtZXNbaV0gIT09IG51bGwpe1xuICAgICAgICAgICAgICAgIHJldHVybiBpMThuLnQoJ3Rvb2x0aXAuJytvYmplY3QrJy4nK3BheW9mZkZpbGVkTmFtZSsnLm5hbWVkJyx7dmFsdWU6IGQucGF5b2ZmLCBudW1iZXI6IGkrMSwgbmFtZTogc2VsZi5jb25maWcucGF5b2ZmTmFtZXNbaV19KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGkxOG4udCgndG9vbHRpcC4nK29iamVjdCsnLicrcGF5b2ZmRmlsZWROYW1lKycuZGVmYXVsdCcse3ZhbHVlOiBkLnBheW9mZiwgbnVtYmVyOiBzZWxmLmNvbmZpZy5tYXhQYXlvZmZzVG9EaXNwbGF5IDwgMiA/ICcnIDogaSsxfSlcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdXBkYXRlVGV4dExpbmVzKGQpeyAvL2hlbHBlciBtZXRob2QgZm9yIHNwbGl0dGluZyB0ZXh0IHRvIHRzcGFuc1xuICAgICAgICB2YXIgbGluZXMgPSBkLm5hbWUgPyBkLm5hbWUuc3BsaXQoJ1xcbicpIDogW107XG4gICAgICAgIGxpbmVzLnJldmVyc2UoKTtcbiAgICAgICAgdmFyIHRzcGFucyA9IGQzLnNlbGVjdCh0aGlzKS5zZWxlY3RBbGwoJ3RzcGFuJykuZGF0YShsaW5lcyk7XG4gICAgICAgIHRzcGFucy5lbnRlcigpLmFwcGVuZCgndHNwYW4nKVxuICAgICAgICAgICAgLm1lcmdlKHRzcGFucylcbiAgICAgICAgICAgIC50ZXh0KGw9PmwpXG4gICAgICAgICAgICAuYXR0cignZHknLCAoZCxpKT0+aT4wID8gJy0xLjFlbSc6IHVuZGVmaW5lZClcbiAgICAgICAgICAgIC5hdHRyKCd4JywgJzAnKTtcblxuICAgICAgICB0c3BhbnMuZXhpdCgpLnJlbW92ZSgpO1xuICAgIH1cblxuICAgIGlzT3B0aW1hbChkKXtcbiAgICAgICAgcmV0dXJuIGQuZGlzcGxheVZhbHVlKCdvcHRpbWFsJyk7XG4gICAgfVxuXG4gICAgcmVkcmF3RWRnZXMoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIGVkZ2VzQ29udGFpbmVyID0gdGhpcy5tYWluR3JvdXAuc2VsZWN0T3JBcHBlbmQoJ2cuZWRnZXMnKTtcbiAgICAgICAgaWYoc2VsZi5jb25maWcuZm9yY2VGdWxsRWRnZVJlZHJhdyl7XG4gICAgICAgICAgICBlZGdlc0NvbnRhaW5lci5zZWxlY3RBbGwoXCIqXCIpLnJlbW92ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGVkZ2VzID0gZWRnZXNDb250YWluZXIuc2VsZWN0QWxsKCcuZWRnZScpLmRhdGEodGhpcy5kYXRhLmVkZ2VzLmZpbHRlcihlPT4hZS4kaGlkZGVuKSwgKGQsaSk9PiBkLiRpZCk7XG4gICAgICAgIGVkZ2VzLmV4aXQoKS5yZW1vdmUoKTtcbiAgICAgICAgdmFyIGVkZ2VzRW50ZXIgPSBlZGdlcy5lbnRlcigpLmFwcGVuZCgnZycpXG4gICAgICAgICAgICAuYXR0cignaWQnLCBkPT4nZWRnZS0nK2QuJGlkKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2VkZ2UnKTtcblxuXG4gICAgICAgIGVkZ2VzRW50ZXIuYXBwZW5kKCdwYXRoJyk7XG4gICAgICAgIHZhciBsYWJlbEVudGVyID0gZWRnZXNFbnRlci5hcHBlbmRTZWxlY3RvcignZy5sYWJlbC1ncm91cCcpO1xuICAgICAgICBsYWJlbEVudGVyLmFwcGVuZCgndGV4dCcpLmF0dHIoJ2NsYXNzJywgJ2xhYmVsJyk7XG4gICAgICAgIHZhciBwYXlvZmZFbnRlciA9IGVkZ2VzRW50ZXIuYXBwZW5kKCd0ZXh0JykuYXR0cignY2xhc3MnLCAncGF5b2ZmJyk7XG4gICAgICAgIHZhciBwcm9iYWJpbGl0eUVudGVyID0gZWRnZXNFbnRlci5hcHBlbmQoJ3RleHQnKS5hdHRyKCdjbGFzcycsICdwcm9iYWJpbGl0eScpO1xuXG5cbiAgICAgICAgdmFyIGVkZ2VzTWVyZ2UgPSBlZGdlc0VudGVyLm1lcmdlKGVkZ2VzKTtcblxuXG4gICAgICAgIHZhciBvcHRpbWFsQ2xhc3NOYW1lID0gJ29wdGltYWwnO1xuICAgICAgICBlZGdlc01lcmdlLmNsYXNzZWQob3B0aW1hbENsYXNzTmFtZSwgKGQpPT5zZWxmLmlzT3B0aW1hbChkKSk7XG5cbiAgICAgICAgdmFyIGVkZ2VzTWVyZ2VUID0gZWRnZXNNZXJnZTtcbiAgICAgICAgaWYodGhpcy50cmFuc2l0aW9uKXtcbiAgICAgICAgICAgIGVkZ2VzTWVyZ2VUID0gZWRnZXNNZXJnZS50cmFuc2l0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICBlZGdlc01lcmdlVC5zZWxlY3QoJ3BhdGgnKVxuICAgICAgICAgICAgLmF0dHIoJ2QnLCBkPT4gdGhpcy5sYXlvdXQuZWRnZUxpbmVEKGQpKVxuICAgICAgICAgICAgLy8gLmF0dHIoXCJzdHJva2VcIiwgXCJibGFja1wiKVxuICAgICAgICAgICAgLy8gLmF0dHIoXCJzdHJva2Utd2lkdGhcIiwgMilcbiAgICAgICAgICAgIC5hdHRyKFwiZmlsbFwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgIC5hdHRyKFwibWFya2VyLWVuZFwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN1ZmZpeCA9IGQzLnNlbGVjdCh0aGlzLnBhcmVudE5vZGUpLmNsYXNzZWQoJ3NlbGVjdGVkJykgPyAnLXNlbGVjdGVkJyA6IChzZWxmLmlzT3B0aW1hbChkKT8nLW9wdGltYWwnOicnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJ1cmwoI2Fycm93XCIrIHN1ZmZpeCtcIilcIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyAuYXR0cihcInNoYXBlLXJlbmRlcmluZ1wiLCBcIm9wdGltaXplUXVhbGl0eVwiKVxuXG5cbiAgICAgICAgZWRnZXNNZXJnZS5vbignY2xpY2snLCBkPT57XG4gICAgICAgICAgICBzZWxmLnNlbGVjdEVkZ2UoZCwgdHJ1ZSlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5sYXlvdXQuZWRnZUxhYmVsUG9zaXRpb24obGFiZWxFbnRlcik7XG4gICAgICAgIGVkZ2VzTWVyZ2VULnNlbGVjdCgndGV4dC5sYWJlbCcpLmVhY2godGhpcy51cGRhdGVUZXh0TGluZXMpO1xuICAgICAgICB2YXIgbGFiZWxNZXJnZSA9IGVkZ2VzTWVyZ2Uuc2VsZWN0KCdnLmxhYmVsLWdyb3VwJyk7XG4gICAgICAgIGxhYmVsTWVyZ2UuY2xhc3NlZCgnc2QtaGlkZGVuJywgdGhpcy5jb25maWcuaGlkZUxhYmVscyk7XG4gICAgICAgIHZhciBsYWJlbE1lcmdlVCA9IGVkZ2VzTWVyZ2VULnNlbGVjdCgnZy5sYWJlbC1ncm91cCcpO1xuICAgICAgICB0aGlzLmxheW91dC5lZGdlTGFiZWxQb3NpdGlvbihsYWJlbE1lcmdlVCk7XG4gICAgICAgICAgICAvLyAudGV4dChkPT5kLm5hbWUpO1xuXG4gICAgICAgIHZhciBwYXlvZmYgPSBlZGdlc01lcmdlLnNlbGVjdCgndGV4dC5wYXlvZmYnKTtcblxuICAgICAgICB2YXIgcGF5b2ZmVHNwYW5zID0gcGF5b2ZmLnNlbGVjdEFsbCgndHNwYW4nKS5kYXRhKGQgPT4ge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSBkLmRpc3BsYXlWYWx1ZSgncGF5b2ZmJyk7XG4gICAgICAgICAgICByZXR1cm4gVXRpbHMuaXNBcnJheShpdGVtKSA/IGl0ZW0uc2xpY2UoMCwgTWF0aC5taW4oaXRlbS5sZW5ndGgsIHNlbGYuY29uZmlnLm1heFBheW9mZnNUb0Rpc3BsYXkpKS5tYXAoXz0+ZCkgOiBbZF07XG4gICAgICAgIH0pO1xuICAgICAgICBwYXlvZmZUc3BhbnMuZXhpdCgpLnJlbW92ZSgpO1xuXG4gICAgICAgIHZhciBwYXlvZmZUc3BhbnNNID0gcGF5b2ZmVHNwYW5zLmVudGVyKCkuYXBwZW5kKCd0c3BhbicpLm1lcmdlKHBheW9mZlRzcGFucyk7XG4gICAgICAgIHBheW9mZlRzcGFuc01cbiAgICAgICAgLy8gLmF0dHIoJ2RvbWluYW50LWJhc2VsaW5lJywgJ2hhbmdpbmcnKVxuICAgICAgICAgICAgLmF0dHIoJ2R5JywgKGQsaSk9Pmk+MCA/ICcxLjFlbSc6IHVuZGVmaW5lZClcbiAgICAgICAgICAgIC8vIC5hdHRyKCd4JywgJzAnKVxuXG4gICAgICAgICAgICAvLyAuYXR0cignZG9taW5hbnQtYmFzZWxpbmUnLCAnaGFuZ2luZycpXG4gICAgICAgICAgICAuY2xhc3NlZCgnbmVnYXRpdmUnLCAoZCwgaSk9PiB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbCA9IGQuZGlzcGxheVBheW9mZih1bmRlZmluZWQsIGkpO1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWwhPT1udWxsICYmIHZhbDwwO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jbGFzc2VkKCdzZC1oaWRkZW4nLCB0aGlzLmNvbmZpZy5oaWRlUGF5b2ZmcylcbiAgICAgICAgICAgIC8vIC50ZXh0KGQ9PiBpc05hTihkLnBheW9mZikgPyBkLnBheW9mZiA6IHNlbGYuY29uZmlnLnBheW9mZk51bWJlckZvcm1hdHRlcihkLnBheW9mZikpXG4gICAgICAgICAgICAudGV4dCgoZCwgaSk9PntcbiAgICAgICAgICAgICAgICBpZih0aGlzLmNvbmZpZy5yYXcpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC5wYXlvZmZbaV07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBkLmRpc3BsYXlWYWx1ZSgncGF5b2ZmJyk7XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW1zID0gVXRpbHMuaXNBcnJheShpdGVtKSA/IGl0ZW0gOiBbaXRlbV07XG5cbiAgICAgICAgICAgICAgICBsZXQgdmFsID0gaXRlbXNbaV07XG4gICAgICAgICAgICAgICAgaWYgKHZhbCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzTmFOKHZhbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLmNvbmZpZy5wYXlvZmZOdW1iZXJGb3JtYXR0ZXIodmFsLCBpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoVXRpbHMuaXNTdHJpbmcodmFsKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChkLnBheW9mZltpXSAhPT0gbnVsbCAmJiAhaXNOYU4oZC5wYXlvZmZbaV0pKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5jb25maWcucGF5b2ZmTnVtYmVyRm9ybWF0dGVyKGQucGF5b2ZmW2ldLCBpKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBkLnBheW9mZltpXTtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgVG9vbHRpcC5hdHRhY2gocGF5b2ZmVHNwYW5zTSwgKGQsIGkpPT57XG4gICAgICAgICAgICBpZihzZWxmLmNvbmZpZy5wYXlvZmZOYW1lcy5sZW5ndGg+aSAmJiBzZWxmLmNvbmZpZy5wYXlvZmZOYW1lc1tpXSAhPT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGkxOG4udCgndG9vbHRpcC5lZGdlLnBheW9mZi5uYW1lZCcse3ZhbHVlOiBkLnBheW9mZltpXSwgbnVtYmVyOiBpKzEsIG5hbWU6IHNlbGYuY29uZmlnLnBheW9mZk5hbWVzW2ldfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpMThuLnQoJ3Rvb2x0aXAuZWRnZS5wYXlvZmYuZGVmYXVsdCcse3ZhbHVlOiBkLnBheW9mZltpXSwgbnVtYmVyOiBzZWxmLmNvbmZpZy5tYXhQYXlvZmZzVG9EaXNwbGF5IDwgMiA/ICcnIDogaSsxfSlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIHBheW9mZlRleHRUID0gcGF5b2ZmO1xuICAgICAgICBpZih0aGlzLnRyYW5zaXRpb24pe1xuICAgICAgICAgICAgcGF5b2ZmVGV4dFQgPSBwYXlvZmYudHJhbnNpdGlvbigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubGF5b3V0LmVkZ2VQYXlvZmZQb3NpdGlvbihwYXlvZmZFbnRlcik7XG4gICAgICAgIHRoaXMubGF5b3V0LmVkZ2VQYXlvZmZQb3NpdGlvbihwYXlvZmZUZXh0VCk7XG5cbiAgICAgICAgVG9vbHRpcC5hdHRhY2goZWRnZXNNZXJnZS5zZWxlY3QoJ3RleHQucHJvYmFiaWxpdHknKSwgZD0+aTE4bi50KCd0b29sdGlwLmVkZ2UucHJvYmFiaWxpdHknLHt2YWx1ZTogZC5wcm9iYWJpbGl0eT09PSB1bmRlZmluZWQgPyBkLmRpc3BsYXlQcm9iYWJpbGl0eSgpIDogZC5wcm9iYWJpbGl0eX0pKTtcblxuICAgICAgICBlZGdlc01lcmdlLnNlbGVjdCgndGV4dC5wcm9iYWJpbGl0eScpXG4gICAgICAgICAgICAuY2xhc3NlZCgnc2QtaGlkZGVuJywgdGhpcy5jb25maWcuaGlkZVByb2JhYmlsaXRpZXMpO1xuICAgICAgICB2YXIgcHJvYmFiaWxpdHlNZXJnZSA9IGVkZ2VzTWVyZ2Uuc2VsZWN0KCd0ZXh0LnByb2JhYmlsaXR5Jyk7XG4gICAgICAgIHByb2JhYmlsaXR5TWVyZ2VcbiAgICAgICAgICAgIC5hdHRyKCd0ZXh0LWFuY2hvcicsICdlbmQnKVxuICAgICAgICAgICAgLnRleHQoZD0+e1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuY29uZmlnLnJhdyl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkLnByb2JhYmlsaXR5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgdmFsID0gZC5kaXNwbGF5UHJvYmFiaWxpdHkoKTtcblxuICAgICAgICAgICAgICAgIGlmKHZhbCE9PW51bGwpe1xuICAgICAgICAgICAgICAgICAgICBpZighaXNOYU4odmFsKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5jb25maWcucHJvYmFiaWxpdHlOdW1iZXJGb3JtYXR0ZXIodmFsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZihVdGlscy5pc1N0cmluZyh2YWwpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZihkLnByb2JhYmlsaXR5IT09bnVsbCAmJiAhaXNOYU4oZC5wcm9iYWJpbGl0eSkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLmNvbmZpZy5wcm9iYWJpbGl0eU51bWJlckZvcm1hdHRlcihkLnByb2JhYmlsaXR5KTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBkLnByb2JhYmlsaXR5O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIHZhciBwcm9iYWJpbGl0eU1lcmdlVCA9IHByb2JhYmlsaXR5TWVyZ2U7XG4gICAgICAgIGlmKHRoaXMudHJhbnNpdGlvbil7XG4gICAgICAgICAgICBwcm9iYWJpbGl0eU1lcmdlVCA9IHByb2JhYmlsaXR5TWVyZ2UudHJhbnNpdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sYXlvdXQuZWRnZVByb2JhYmlsaXR5UG9zaXRpb24ocHJvYmFiaWxpdHlFbnRlcik7XG4gICAgICAgIHRoaXMubGF5b3V0LmVkZ2VQcm9iYWJpbGl0eVBvc2l0aW9uKHByb2JhYmlsaXR5TWVyZ2VUKTtcblxuXG4gICAgICAgIGVkZ2VzQ29udGFpbmVyLnNlbGVjdEFsbCgnLmVkZ2UuJytvcHRpbWFsQ2xhc3NOYW1lKS5yYWlzZSgpO1xuXG4gICAgICAgIGVkZ2VzTWVyZ2Uub24oJ2NvbnRleHRtZW51JywgdGhpcy5lZGdlQ29udGV4dE1lbnUpO1xuICAgICAgICBlZGdlc01lcmdlLm9uKCdkYmxjbGljaycsIHRoaXMuZWRnZUNvbnRleHRNZW51KTtcbiAgICAgICAgZWRnZXNNZXJnZS5lYWNoKGZ1bmN0aW9uKGQsIGkpe1xuICAgICAgICAgICAgdmFyIGVsZW0gPSB0aGlzO1xuICAgICAgICAgICAgdmFyIG1jID0gbmV3IEhhbW1lci5NYW5hZ2VyKGVsZW0pO1xuICAgICAgICAgICAgbWMuYWRkKG5ldyBIYW1tZXIuUHJlc3Moe1xuICAgICAgICAgICAgICAgIHBvaW50ZXJUeXBlOiBIYW1tZXIuUE9JTlRFUl9UT1VDSFxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIHJlZHJhd0Zsb2F0aW5nVGV4dHMoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuXG4gICAgICAgIHZhciB0ZXh0c0NvbnRhaW5lciA9IHRoaXMubWFpbkdyb3VwLnNlbGVjdE9yQXBwZW5kKCdnLmZsb2F0aW5nLXRleHRzJyk7XG4gICAgICAgIHZhciB0ZXh0cyA9IHRleHRzQ29udGFpbmVyLnNlbGVjdEFsbCgnLmZsb2F0aW5nLXRleHQnKS5kYXRhKHRoaXMuZGF0YS50ZXh0cywgKGQsaSk9PiBkLiRpZCk7XG4gICAgICAgIHRleHRzLmV4aXQoKS5yZW1vdmUoKTtcbiAgICAgICAgdmFyIHRleHRzRW50ZXIgPSB0ZXh0cy5lbnRlcigpLmFwcGVuZFNlbGVjdG9yKCdnLmZsb2F0aW5nLXRleHQnKVxuICAgICAgICAgICAgLmF0dHIoJ2lkJywgZD0+J3RleHQtJytkLiRpZCk7XG5cblxuICAgICAgICB2YXIgcmVjdFdpZHRoID0gNDA7XG4gICAgICAgIHZhciByZWN0SGVpZ2h0ID0gMjA7XG5cbiAgICAgICAgdGV4dHNFbnRlci5hcHBlbmQoJ3JlY3QnKS5hdHRyKCd4JywgLTUpLmF0dHIoJ3knLCAtMTYpLmF0dHIoJ2ZpbGwtb3BhY2l0eScsIDApO1xuICAgICAgICB0ZXh0c0VudGVyLmFwcGVuZCgndGV4dCcpO1xuXG4gICAgICAgIHZhciB0ZXh0c01lcmdlID0gdGV4dHNFbnRlci5tZXJnZSh0ZXh0cyk7XG4gICAgICAgIHZhciB0ZXh0c01lcmdlVCA9IHRleHRzTWVyZ2U7XG4gICAgICAgIGlmKHRoaXMudHJhbnNpdGlvbil7XG4gICAgICAgICAgICB0ZXh0c01lcmdlVCA9IHRleHRzTWVyZ2UudHJhbnNpdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGV4dHNNZXJnZVQuYXR0cigndHJhbnNmb3JtJywgZD0+J3RyYW5zbGF0ZSgnICsgZC5sb2NhdGlvbi54ICsgJyAgJyArIGQubG9jYXRpb24ueSArICcpJyk7XG5cbiAgICAgICAgdmFyIHRzcGFucyA9IHRleHRzTWVyZ2Uuc2VsZWN0KCd0ZXh0Jykuc2VsZWN0QWxsKCd0c3BhbicpLmRhdGEoZD0+ZC52YWx1ZSA/IGQudmFsdWUuc3BsaXQoJ1xcbicpIDogW10pO1xuXG4gICAgICAgIHRzcGFucy5lbnRlcigpLmFwcGVuZCgndHNwYW4nKVxuICAgICAgICAgICAgLm1lcmdlKHRzcGFucylcbiAgICAgICAgICAgIC5odG1sKGw9PkFwcFV0aWxzLnJlcGxhY2VVcmxzKEFwcFV0aWxzLmVzY2FwZUh0bWwobCkpKVxuICAgICAgICAgICAgLmF0dHIoJ2R5JywgKGQsaSk9Pmk+MCA/ICcxLjFlbSc6IHVuZGVmaW5lZClcbiAgICAgICAgICAgIC5hdHRyKCd4JywgJzAnKTtcblxuICAgICAgICB0c3BhbnMuZXhpdCgpLnJlbW92ZSgpO1xuICAgICAgICB0ZXh0c01lcmdlLmNsYXNzZWQoJ3NkLWVtcHR5JywgZD0+IWQudmFsdWUgfHwgIWQudmFsdWUudHJpbSgpKTtcbiAgICAgICAgdGV4dHNNZXJnZS5zZWxlY3QoJ3JlY3QnKS5hdHRyKCd3aWR0aCcsIHJlY3RXaWR0aCkuYXR0cignaGVpZ2h0JywgcmVjdEhlaWdodCk7XG5cbiAgICAgICAgdGV4dHNNZXJnZS5lYWNoKGZ1bmN0aW9uKGQpe1xuICAgICAgICAgICAgaWYoIWQudmFsdWUpe1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBiYiA9IGQzLnNlbGVjdCh0aGlzKS5zZWxlY3QoJ3RleHQnKS5ub2RlKCkuZ2V0QkJveCgpO1xuICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuc2VsZWN0KCdyZWN0JylcbiAgICAgICAgICAgICAgIC5hdHRyKCd5JywgYmIueS01KVxuICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgTWF0aC5tYXgoYmIud2lkdGgrMTAsIHJlY3RXaWR0aCkpXG4gICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgTWF0aC5tYXgoYmIuaGVpZ2h0KzEwLCByZWN0SGVpZ2h0KSlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYodGhpcy50ZXh0RHJhZ0hhbmRsZXIpe1xuICAgICAgICAgICAgdGV4dHNNZXJnZS5jYWxsKHRoaXMudGV4dERyYWdIYW5kbGVyLmRyYWcpO1xuICAgICAgICB9XG4gICAgICAgIHRleHRzTWVyZ2Uub24oJ2NvbnRleHRtZW51JywgdGhpcy50ZXh0Q29udGV4dE1lbnUpO1xuICAgICAgICB0ZXh0c01lcmdlLm9uKCdkYmxjbGljaycsIHRoaXMudGV4dENvbnRleHRNZW51KTtcbiAgICAgICAgdGV4dHNNZXJnZS5lYWNoKGZ1bmN0aW9uKGQsIGkpe1xuICAgICAgICAgICAgdmFyIGVsZW0gPSB0aGlzO1xuICAgICAgICAgICAgdmFyIG1jID0gbmV3IEhhbW1lci5NYW5hZ2VyKGVsZW0pO1xuICAgICAgICAgICAgbWMuYWRkKG5ldyBIYW1tZXIuUHJlc3Moe1xuICAgICAgICAgICAgICAgIHBvaW50ZXJUeXBlOiAndG91Y2gnXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0pXG5cbiAgICB9XG5cbiAgICB1cGRhdGVWYWxpZGF0aW9uTWVzc2FnZXMoKSB7XG4gICAgICAgIHZhciBub2RlcyA9IHRoaXMubWFpbkdyb3VwLnNlbGVjdEFsbCgnLm5vZGUnKTtcbiAgICAgICAgbm9kZXMuY2xhc3NlZCgnZXJyb3InLCBmYWxzZSk7XG5cbiAgICAgICAgdGhpcy5kYXRhLnZhbGlkYXRpb25SZXN1bHRzLmZvckVhY2godmFsaWRhdGlvblJlc3VsdD0+e1xuICAgICAgICAgICAgaWYodmFsaWRhdGlvblJlc3VsdC5pc1ZhbGlkKCkpe1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModmFsaWRhdGlvblJlc3VsdC5vYmplY3RJZFRvRXJyb3IpLmZvckVhY2goaWQ9PntcbiAgICAgICAgICAgICAgICB2YXIgZXJyb3JzID0gdmFsaWRhdGlvblJlc3VsdC5vYmplY3RJZFRvRXJyb3JbaWRdO1xuICAgICAgICAgICAgICAgIHZhciBub2RlU2VsZWN0aW9uID0gdGhpcy5nZXROb2RlRDNTZWxlY3Rpb25CeUlkKGlkKTtcbiAgICAgICAgICAgICAgICBub2RlU2VsZWN0aW9uLmNsYXNzZWQoJ2Vycm9yJywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgdmFyIHRvb2x0aXBIdG1sID0gJyc7XG4gICAgICAgICAgICAgICAgZXJyb3JzLmZvckVhY2goZT0+e1xuICAgICAgICAgICAgICAgICAgICBpZih0b29sdGlwSHRtbCl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwSHRtbCs9Jzxici8+J1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXBIdG1sKz1BcHBVdGlscy5nZXRWYWxpZGF0aW9uTWVzc2FnZShlKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIFRvb2x0aXAuYXR0YWNoKG5vZGVTZWxlY3Rpb24uc2VsZWN0KCcuZXJyb3ItaW5kaWNhdG9yJyksIHRvb2x0aXBIdG1sKTtcblxuXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIGluaXRFZGdlTWFya2VycygpIHtcbiAgICAgICAgdmFyIGRlZnMgPSB0aGlzLnN2Zy5hcHBlbmQoXCJzdmc6ZGVmc1wiKTtcblxuICAgICAgICB0aGlzLmluaXRBcnJvd01hcmtlcihcImFycm93XCIpO1xuICAgICAgICB0aGlzLmluaXRBcnJvd01hcmtlcihcImFycm93LW9wdGltYWxcIik7XG4gICAgICAgIHRoaXMuaW5pdEFycm93TWFya2VyKFwiYXJyb3ctc2VsZWN0ZWRcIik7XG4gICAgfVxuXG4gICAgaW5pdEFycm93TWFya2VyKGlkKSB7XG5cbiAgICAgICAgdmFyIGRlZnMgPSB0aGlzLnN2Zy5zZWxlY3QoXCJkZWZzXCIpO1xuICAgICAgICBkZWZzLmFwcGVuZChcIm1hcmtlclwiKVxuICAgICAgICAgICAgLmF0dHIoXCJpZFwiLGlkKVxuICAgICAgICAgICAgLmF0dHIoXCJ2aWV3Qm94XCIsXCIwIC01IDEwIDEwXCIpXG4gICAgICAgICAgICAuYXR0cihcInJlZlhcIiw1KVxuICAgICAgICAgICAgLmF0dHIoXCJyZWZZXCIsMClcbiAgICAgICAgICAgIC5hdHRyKFwibWFya2VyV2lkdGhcIiw0KVxuICAgICAgICAgICAgLmF0dHIoXCJtYXJrZXJIZWlnaHRcIiw0KVxuICAgICAgICAgICAgLmF0dHIoXCJvcmllbnRcIixcImF1dG9cIilcbiAgICAgICAgICAgIC5hcHBlbmQoXCJwYXRoXCIpXG4gICAgICAgICAgICAuYXR0cihcImRcIiwgXCJNMCwtNUwxMCwwTDAsNVwiKVxuICAgICAgICAgICAgLmF0dHIoXCJjbGFzc1wiLFwiYXJyb3dIZWFkXCIpO1xuICAgIH1cblxuICAgIHVwZGF0ZUJydXNoRXh0ZW50KCkge1xuICAgICAgICB2YXIgc2VsZiA9dGhpcztcbiAgICAgICAgdGhpcy5icnVzaC5leHRlbnQoW1swLCAwXSwgW3NlbGYuc3ZnLmF0dHIoJ3dpZHRoJyksIHNlbGYuc3ZnLmF0dHIoJ2hlaWdodCcpXV0pO1xuICAgICAgICB0aGlzLmJydXNoQ29udGFpbmVyLmNhbGwodGhpcy5icnVzaCk7XG4gICAgfVxuICAgIGluaXRCcnVzaCgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHZhciBicnVzaENvbnRhaW5lciA9IHNlbGYuYnJ1c2hDb250YWluZXIgPSB0aGlzLmJydXNoQ29udGFpbmVyPSB0aGlzLndyYXBwZXJHcm91cC5zZWxlY3RPckluc2VydChcImcuYnJ1c2hcIiwgXCI6Zmlyc3QtY2hpbGRcIilcbiAgICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJicnVzaFwiKTtcblxuICAgICAgICB2YXIgYnJ1c2ggPSB0aGlzLmJydXNoID0gZDMuYnJ1c2goKVxuICAgICAgICAgICAgLm9uKFwic3RhcnRcIiwgYnJ1c2hzdGFydClcbiAgICAgICAgICAgIC5vbihcImJydXNoXCIsIGJydXNobW92ZSlcbiAgICAgICAgICAgIC5vbihcImVuZFwiLCBicnVzaGVuZCk7XG5cblxuXG4gICAgICAgIHRoaXMudXBkYXRlQnJ1c2hFeHRlbnQoKTtcblxuICAgICAgICBicnVzaENvbnRhaW5lci5zZWxlY3QoJy5vdmVybGF5Jykub24oXCJtb3VzZW1vdmUuZWRnZVNlbGVjdGlvblwiLCBtb3VzZW1vdmVkKTtcbiAgICAgICAgZnVuY3Rpb24gbW91c2Vtb3ZlZCgpIHtcbiAgICAgICAgICAgIHZhciBtID0gZDMubW91c2UodGhpcyk7XG4gICAgICAgICAgICB2YXIgbWd0ID0gc2VsZi5nZXRNYWluR3JvdXBUcmFuc2xhdGlvbigpO1xuICAgICAgICAgICAgdmFyIG1hcmdpbiA9IDEwO1xuXG4gICAgICAgICAgICB2YXIgY2xvc2VzdCA9IFtudWxsLCA5OTk5OTk5OTldO1xuICAgICAgICAgICAgdmFyIGNsb3NlRWRnZXMgPSBbXTtcbiAgICAgICAgICAgIHNlbGYubWFpbkdyb3VwLnNlbGVjdEFsbCgnLmVkZ2UnKS5lYWNoKGZ1bmN0aW9uKGQpe1xuICAgICAgICAgICAgICAgIHZhciBzZWxlY3Rpb24gPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uLmNsYXNzZWQoJ3NkLWhvdmVyJywgZmFsc2UpO1xuICAgICAgICAgICAgICAgIHZhciBwYXRoTm9kZSA9IHNlbGVjdGlvbi5zZWxlY3QoJ3BhdGgnKS5ub2RlKCk7XG4gICAgICAgICAgICAgICAgdmFyIGIgPSBwYXRoTm9kZS5nZXRCQm94KCk7XG4gICAgICAgICAgICAgICAgaWYoYi54K21ndFswXSA8PW1bMF0gJiYgYi54K2Iud2lkdGgrbWd0WzBdID49IG1bMF0gJiZcbiAgICAgICAgICAgICAgICAgICBiLnkrbWd0WzFdLW1hcmdpbiA8PW1bMV0gJiYgYi55K2IuaGVpZ2h0K21ndFsxXSttYXJnaW4gPj0gbVsxXSl7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGNwID0gQXBwVXRpbHMuY2xvc2VzdFBvaW50KHBhdGhOb2RlLCBbbVswXS1tZ3RbMF0sIG1bMV0tbWd0WzFdXSk7XG4gICAgICAgICAgICAgICAgICAgIGlmKGNwLmRpc3RhbmNlIDwgbWFyZ2luICYmIGNwLmRpc3RhbmNlPGNsb3Nlc3RbMV0pe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VzdCA9IFtzZWxlY3Rpb24sIGNwLmRpc3RhbmNlXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHNlbGYuaG92ZXJlZEVkZ2UgPSBudWxsO1xuICAgICAgICAgICAgaWYoY2xvc2VzdFswXSl7XG4gICAgICAgICAgICAgICAgY2xvc2VzdFswXS5jbGFzc2VkKCdzZC1ob3ZlcicsIHRydWUpO1xuICAgICAgICAgICAgICAgIHNlbGYuaG92ZXJlZEVkZ2UgPSBjbG9zZXN0WzBdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBicnVzaHN0YXJ0KCkge1xuICAgICAgICAgICAgaWYgKCFkMy5ldmVudC5zZWxlY3Rpb24pIHJldHVybjtcbiAgICAgICAgICAgIGlmKHNlbGYuaG92ZXJlZEVkZ2Upe1xuICAgICAgICAgICAgICAgIHNlbGYuc2VsZWN0RWRnZShzZWxmLmhvdmVyZWRFZGdlLmRhdHVtKCksIHRydWUpXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBzZWxmLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBDb250ZXh0TWVudS5oaWRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBIaWdobGlnaHQgdGhlIHNlbGVjdGVkIG5vZGVzLlxuICAgICAgICBmdW5jdGlvbiBicnVzaG1vdmUoKSB7XG4gICAgICAgICAgICB2YXIgcyA9IGQzLmV2ZW50LnNlbGVjdGlvbjtcbiAgICAgICAgICAgIGlmKCFzKXJldHVybjtcblxuICAgICAgICAgICAgc2VsZi5tYWluR3JvdXAuc2VsZWN0QWxsKFwiLm5vZGVcIikuY2xhc3NlZCgnc2VsZWN0ZWQnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHZhciBtYWluR3JvdXBUcmFuc2xhdGlvbiA9IHNlbGYuZ2V0TWFpbkdyb3VwVHJhbnNsYXRpb24oKTtcbiAgICAgICAgICAgICAgICB2YXIgeCA9IGQubG9jYXRpb24ueCttYWluR3JvdXBUcmFuc2xhdGlvblswXTtcbiAgICAgICAgICAgICAgICB2YXIgeSA9IGQubG9jYXRpb24ueSttYWluR3JvdXBUcmFuc2xhdGlvblsxXTtcbiAgICAgICAgICAgICAgICB2YXIgbm9kZVNpemUgPSBzZWxmLmNvbmZpZy5sYXlvdXQubm9kZVNpemU7XG4gICAgICAgICAgICAgICAgdmFyIG9mZnNldCA9IG5vZGVTaXplKjAuMjU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNbMF1bMF0gPD0geCtvZmZzZXQgJiYgeC1vZmZzZXQgPD0gc1sxXVswXVxuICAgICAgICAgICAgICAgICAgICAmJiBzWzBdWzFdIDw9IHkrb2Zmc2V0ICYmIHktb2Zmc2V0IDw9IHNbMV1bMV07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBJZiB0aGUgYnJ1c2ggaXMgZW1wdHksIHNlbGVjdCBhbGwgY2lyY2xlcy5cbiAgICAgICAgZnVuY3Rpb24gYnJ1c2hlbmQoKSB7XG4gICAgICAgICAgICBpZiAoIWQzLmV2ZW50LnNlbGVjdGlvbikgcmV0dXJuO1xuICAgICAgICAgICAgYnJ1c2gubW92ZShicnVzaENvbnRhaW5lciwgbnVsbCk7XG5cbiAgICAgICAgICAgIHZhciBzZWxlY3RlZE5vZGVzID0gc2VsZi5nZXRTZWxlY3RlZE5vZGVzKCk7XG4gICAgICAgICAgICBpZihzZWxlY3RlZE5vZGVzICYmIHNlbGVjdGVkTm9kZXMubGVuZ3RoID09PSAxKXtcbiAgICAgICAgICAgICAgICBzZWxmLnNlbGVjdE5vZGUoc2VsZWN0ZWROb2Rlc1swXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBpZiAoIWQzLmV2ZW50LnNlbGVjdGlvbikgc2VsZi5tYWluR3JvdXAuc2VsZWN0QWxsKFwiLnNlbGVjdGVkXCIpLmNsYXNzZWQoJ3NlbGVjdGVkJywgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGlzYWJsZUJydXNoKCl7XG4gICAgICAgIGlmKCF0aGlzLmJydXNoRGlzYWJsZWQpe1xuICAgICAgICAgICAgQXBwVXRpbHMuZ3Jvd2woaTE4bi50KCdncm93bC5icnVzaERpc2FibGVkJyksICdpbmZvJywgJ2xlZnQnKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuYnJ1c2hEaXNhYmxlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuYnJ1c2hDb250YWluZXIucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgZW5hYmxlQnJ1c2goKXtcbiAgICAgICAgaWYodGhpcy5icnVzaERpc2FibGVkKXtcbiAgICAgICAgICAgIEFwcFV0aWxzLmdyb3dsKGkxOG4udCgnZ3Jvd2wuYnJ1c2hFbmFibGVkJyksICdpbmZvJywgJ2xlZnQnKVxuICAgICAgICAgICAgdGhpcy5pbml0QnJ1c2goKTtcbiAgICAgICAgICAgIHRoaXMuYnJ1c2hEaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICB9XG5cblxuICAgIH1cblxuICAgIGdldE1haW5Hcm91cFRyYW5zbGF0aW9uKGludmVydCkge1xuICAgICAgICB2YXIgdHJhbnNsYXRpb24gPSBBcHBVdGlscy5nZXRUcmFuc2xhdGlvbih0aGlzLm1haW5Hcm91cC5hdHRyKFwidHJhbnNmb3JtXCIpKTtcbiAgICAgICAgaWYoaW52ZXJ0KXtcbiAgICAgICAgICAgIHRyYW5zbGF0aW9uWzBdID0gLXRyYW5zbGF0aW9uWzBdO1xuICAgICAgICAgICAgdHJhbnNsYXRpb25bMV0gPSAtdHJhbnNsYXRpb25bMV1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJhbnNsYXRpb247XG4gICAgfVxuXG4gICAgaW5pdE5vZGVDb250ZXh0TWVudSgpIHtcbiAgICAgICAgdGhpcy5ub2RlQ29udGV4dE1lbnUgPSBuZXcgTm9kZUNvbnRleHRNZW51KHRoaXMsIHRoaXMuY29uZmlnLm9wZXJhdGlvbnNGb3JPYmplY3QpO1xuICAgIH1cblxuICAgIGluaXRFZGdlQ29udGV4dE1lbnUoKSB7XG4gICAgICAgIHRoaXMuZWRnZUNvbnRleHRNZW51ID0gbmV3IEVkZ2VDb250ZXh0TWVudSh0aGlzKTtcbiAgICB9XG5cbiAgICBpbml0VGV4dENvbnRleHRNZW51KCkge1xuICAgICAgICB0aGlzLnRleHRDb250ZXh0TWVudSA9IG5ldyBUZXh0Q29udGV4dE1lbnUodGhpcyk7XG4gICAgfVxuXG5cblxuICAgIGluaXRNYWluQ29udGV4dE1lbnUoKSB7XG4gICAgICAgIHRoaXMubWFpbkNvbnRleHRNZW51ID0gbmV3IE1haW5Db250ZXh0TWVudSh0aGlzKTtcbiAgICAgICAgdGhpcy5zdmcub24oJ2NvbnRleHRtZW51Jyx0aGlzLm1haW5Db250ZXh0TWVudSk7XG4gICAgICAgIHRoaXMuc3ZnLm9uKCdkYmxjbGljaycsdGhpcy5tYWluQ29udGV4dE1lbnUpO1xuICAgIH1cblxuICAgIGFkZFRleHQodGV4dCl7XG4gICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoKTtcbiAgICAgICAgdGhpcy5kYXRhLmFkZFRleHQodGV4dCk7XG4gICAgICAgIHRoaXMucmVkcmF3KCk7XG4gICAgICAgIHRoaXMuc2VsZWN0VGV4dCh0ZXh0KTtcbiAgICB9XG5cbiAgICBhZGROb2RlKG5vZGUsIHBhcmVudCwgcmVkcmF3PWZhbHNlKXtcbiAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSgpO1xuICAgICAgICB0aGlzLmRhdGEuYWRkTm9kZShub2RlLCBwYXJlbnQpO1xuICAgICAgICB0aGlzLnJlZHJhdyh0cnVlKTtcbiAgICAgICAgdGhpcy5sYXlvdXQudXBkYXRlKG5vZGUpO1xuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG5cbiAgICBhZGREZWNpc2lvbk5vZGUocGFyZW50KXtcbiAgICAgICAgdmFyIG5ld05vZGUgPSBuZXcgbW9kZWwuRGVjaXNpb25Ob2RlKHRoaXMubGF5b3V0LmdldE5ld0NoaWxkTG9jYXRpb24ocGFyZW50KSk7XG4gICAgICAgIHRoaXMuYWRkTm9kZShuZXdOb2RlLCBwYXJlbnQpXG4gICAgfVxuICAgIGFkZENoYW5jZU5vZGUocGFyZW50KXtcbiAgICAgICAgdmFyIG5ld05vZGUgPSBuZXcgbW9kZWwuQ2hhbmNlTm9kZSh0aGlzLmxheW91dC5nZXROZXdDaGlsZExvY2F0aW9uKHBhcmVudCkpO1xuICAgICAgICB0aGlzLmFkZE5vZGUobmV3Tm9kZSwgcGFyZW50KVxuICAgIH1cbiAgICBhZGRUZXJtaW5hbE5vZGUocGFyZW50KXtcbiAgICAgICAgdmFyIG5ld05vZGUgPSBuZXcgbW9kZWwuVGVybWluYWxOb2RlKHRoaXMubGF5b3V0LmdldE5ld0NoaWxkTG9jYXRpb24ocGFyZW50KSk7XG4gICAgICAgIHRoaXMuYWRkTm9kZShuZXdOb2RlLCBwYXJlbnQpXG4gICAgfVxuXG4gICAgaW5qZWN0Tm9kZShub2RlLCBlZGdlKXtcbiAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSgpO1xuICAgICAgICB0aGlzLmRhdGEuaW5qZWN0Tm9kZShub2RlLCBlZGdlKTtcbiAgICAgICAgdGhpcy5yZWRyYXcoKTtcbiAgICAgICAgdGhpcy5sYXlvdXQudXBkYXRlKG5vZGUpO1xuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG5cbiAgICBpbmplY3REZWNpc2lvbk5vZGUoZWRnZSl7XG4gICAgICAgIHZhciBuZXdOb2RlID0gbmV3IG1vZGVsLkRlY2lzaW9uTm9kZSh0aGlzLmxheW91dC5nZXRJbmplY3RlZE5vZGVMb2NhdGlvbihlZGdlKSk7XG4gICAgICAgIHRoaXMuaW5qZWN0Tm9kZShuZXdOb2RlLCBlZGdlKTtcblxuICAgIH1cblxuICAgIGluamVjdENoYW5jZU5vZGUoZWRnZSl7XG4gICAgICAgIHZhciBuZXdOb2RlID0gbmV3IG1vZGVsLkNoYW5jZU5vZGUodGhpcy5sYXlvdXQuZ2V0SW5qZWN0ZWROb2RlTG9jYXRpb24oZWRnZSkpO1xuICAgICAgICB0aGlzLmluamVjdE5vZGUobmV3Tm9kZSwgZWRnZSk7XG4gICAgfVxuXG4gICAgcmVtb3ZlTm9kZShub2RlKSB7XG4gICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoKTtcbiAgICAgICAgdGhpcy5kYXRhLnJlbW92ZU5vZGUobm9kZSk7XG5cblxuICAgICAgICBpZighdGhpcy5sYXlvdXQuaXNNYW51YWxMYXlvdXQoKSl7XG4gICAgICAgICAgICB0aGlzLmxheW91dC51cGRhdGUoKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLnJlZHJhdygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVtb3ZlU2VsZWN0ZWROb2RlcygpIHtcbiAgICAgICAgdmFyIHNlbGVjdGVkTm9kZXMgPSB0aGlzLmdldFNlbGVjdGVkTm9kZXMoKTtcbiAgICAgICAgaWYoIXNlbGVjdGVkTm9kZXMubGVuZ3RoKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKCk7XG4gICAgICAgIHRoaXMuZGF0YS5yZW1vdmVOb2RlcyhzZWxlY3RlZE5vZGVzKTtcbiAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICB0aGlzLnJlZHJhdygpO1xuICAgICAgICB0aGlzLmxheW91dC51cGRhdGUoKTtcbiAgICB9XG5cbiAgICByZW1vdmVTZWxlY3RlZFRleHRzKCl7XG4gICAgICAgIHZhciBzZWxlY3RlZFRleHRzID0gdGhpcy5nZXRTZWxlY3RlZFRleHRzKCk7XG5cbiAgICAgICAgaWYoIXNlbGVjdGVkVGV4dHMubGVuZ3RoKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKCk7XG4gICAgICAgIHRoaXMuZGF0YS5yZW1vdmVUZXh0cyhzZWxlY3RlZFRleHRzKTtcbiAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICB0aGlzLnJlZHJhdygpO1xuICAgIH1cblxuICAgIGNvcHlOb2RlKGQsIG5vdENsZWFyUHJldlNlbGVjdGlvbikge1xuICAgICAgICB2YXIgY2xvbmUgPSB0aGlzLmRhdGEuY2xvbmVTdWJ0cmVlKGQpO1xuICAgICAgICBpZihub3RDbGVhclByZXZTZWxlY3Rpb24pe1xuICAgICAgICAgICAgaWYoIXRoaXMuY29waWVkTm9kZXMpe1xuICAgICAgICAgICAgICAgIHRoaXMuY29waWVkTm9kZXM9W107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNvcGllZE5vZGVzLnB1c2goY2xvbmUpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMuY29waWVkTm9kZXMgPSBbY2xvbmVdO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBjdXROb2RlKGQpIHtcbiAgICAgICAgdGhpcy5jb3B5Tm9kZShkKTtcbiAgICAgICAgdGhpcy5yZW1vdmVOb2RlKGQpO1xuICAgIH1cblxuICAgIGN1dFNlbGVjdGVkTm9kZXMoKXtcbiAgICAgICAgdmFyIHNlbGVjdGVkTm9kZXMgPSB0aGlzLmdldFNlbGVjdGVkTm9kZXMoKTtcbiAgICAgICAgdmFyIHNlbGVjdGVkUm9vdHMgPSB0aGlzLmRhdGEuZmluZFN1YnRyZWVSb290cyhzZWxlY3RlZE5vZGVzKTtcbiAgICAgICAgdGhpcy5jb3B5Tm9kZXMoc2VsZWN0ZWRSb290cyk7XG4gICAgICAgIHRoaXMucmVtb3ZlU2VsZWN0ZWROb2RlcygpO1xuICAgIH1cblxuICAgIGNvcHlTZWxlY3RlZE5vZGVzKCkge1xuICAgICAgICB2YXIgc2VsZjtcbiAgICAgICAgdmFyIHNlbGVjdGVkTm9kZXMgPSB0aGlzLmdldFNlbGVjdGVkTm9kZXMoKTtcblxuICAgICAgICB2YXIgc2VsZWN0ZWRSb290cyA9IHRoaXMuZGF0YS5maW5kU3VidHJlZVJvb3RzKHNlbGVjdGVkTm9kZXMpO1xuICAgICAgICB0aGlzLmNvcHlOb2RlcyhzZWxlY3RlZFJvb3RzKTtcblxuXG4gICAgfVxuXG4gICAgY29weU5vZGVzKG5vZGVzKXtcbiAgICAgICAgdGhpcy5jb3BpZWROb2RlcyA9IG5vZGVzLm1hcChkPT50aGlzLmRhdGEuY2xvbmVTdWJ0cmVlKGQpKTtcbiAgICB9XG5cblxuXG4gICAgcGFzdGVUb05vZGUobm9kZSkge1xuICAgICAgICBpZighdGhpcy5jb3BpZWROb2RlcyB8fCAhdGhpcy5jb3BpZWROb2Rlcy5sZW5ndGgpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGF0YS5zYXZlU3RhdGUoKTtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBzZWxmLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgIHZhciBub2Rlc1RvQXR0YWNoID0gdGhpcy5jb3BpZWROb2RlcztcbiAgICAgICAgc2VsZi5jb3B5Tm9kZXModGhpcy5jb3BpZWROb2Rlcyk7XG4gICAgICAgIG5vZGVzVG9BdHRhY2guZm9yRWFjaCh0b0F0dGFjaD0+e1xuICAgICAgICAgICAgdmFyIGF0dGFjaGVkID0gdGhpcy5kYXRhLmF0dGFjaFN1YnRyZWUodG9BdHRhY2gsIG5vZGUpLmNoaWxkTm9kZTtcbiAgICAgICAgICAgIGlmKGF0dGFjaGVkLmZvbGRlZCl7XG4gICAgICAgICAgICAgICAgc2VsZi5mb2xkU3VidHJlZShhdHRhY2hlZCwgYXR0YWNoZWQuZm9sZGVkLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbG9jYXRpb24gPSBzZWxmLmxheW91dC5nZXROZXdDaGlsZExvY2F0aW9uKG5vZGUpO1xuICAgICAgICAgICAgYXR0YWNoZWQubW92ZVRvKGxvY2F0aW9uLngsIGxvY2F0aW9uLnksIHRydWUpO1xuICAgICAgICAgICAgc2VsZi5sYXlvdXQubW92ZU5vZGVUb0VtcHR5UGxhY2UoYXR0YWNoZWQsIGZhbHNlKTtcbiAgICAgICAgICAgIHNlbGYubGF5b3V0LmZpdE5vZGVzSW5QbG90dGluZ1JlZ2lvbih0aGlzLmRhdGEuZ2V0QWxsRGVzY2VuZGFudE5vZGVzKGF0dGFjaGVkKSk7XG5cbiAgICAgICAgICAgIHNlbGYuc2VsZWN0U3ViVHJlZShhdHRhY2hlZCwgZmFsc2UsIG5vZGVzVG9BdHRhY2gubGVuZ3RoPjEpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZihub2RlLmZvbGRlZCl7XG4gICAgICAgICAgICBzZWxmLmZvbGRTdWJ0cmVlKG5vZGUsIG5vZGUuZm9sZGVkLCBmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBzZWxmLnJlZHJhdygpO1xuICAgICAgICAgICAgc2VsZi5sYXlvdXQudXBkYXRlKCk7XG4gICAgICAgIH0sMTApXG5cbiAgICB9XG5cbiAgICBwYXN0ZVRvTmV3TG9jYXRpb24ocG9pbnQpIHtcbiAgICAgICAgdGhpcy5kYXRhLnNhdmVTdGF0ZSgpO1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHNlbGYuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgdmFyIG5vZGVzVG9BdHRhY2ggPSB0aGlzLmNvcGllZE5vZGVzO1xuICAgICAgICBzZWxmLmNvcHlOb2Rlcyh0aGlzLmNvcGllZE5vZGVzKTtcbiAgICAgICAgbm9kZXNUb0F0dGFjaC5mb3JFYWNoKHRvQXR0YWNoPT4ge1xuICAgICAgICAgICAgdmFyIGF0dGFjaGVkID0gdGhpcy5kYXRhLmF0dGFjaFN1YnRyZWUodG9BdHRhY2gpO1xuICAgICAgICAgICAgaWYoYXR0YWNoZWQuZm9sZGVkKXtcbiAgICAgICAgICAgICAgICBzZWxmLmZvbGRTdWJ0cmVlKGF0dGFjaGVkLCBhdHRhY2hlZC5mb2xkZWQsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGF0dGFjaGVkLm1vdmVUbyhwb2ludC54LCBwb2ludC55LCB0cnVlKTtcbiAgICAgICAgICAgIHNlbGYubGF5b3V0Lm1vdmVOb2RlVG9FbXB0eVBsYWNlKGF0dGFjaGVkLCBmYWxzZSk7XG4gICAgICAgICAgICBzZWxmLmxheW91dC5maXROb2Rlc0luUGxvdHRpbmdSZWdpb24odGhpcy5kYXRhLmdldEFsbERlc2NlbmRhbnROb2RlcyhhdHRhY2hlZCkpO1xuXG4gICAgICAgICAgICBzZWxmLnNlbGVjdFN1YlRyZWUoYXR0YWNoZWQsIGZhbHNlLCBub2Rlc1RvQXR0YWNoLmxlbmd0aD4xKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgc2VsZi5yZWRyYXcoKTtcbiAgICAgICAgICAgIHNlbGYubGF5b3V0LnVwZGF0ZSgpO1xuICAgICAgICB9LDEwKVxuXG4gICAgfVxuXG4gICAgY29udmVydE5vZGUobm9kZSwgdHlwZVRvQ29udmVydFRvKXtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKCk7XG4gICAgICAgIHRoaXMuZGF0YS5jb252ZXJ0Tm9kZShub2RlLCB0eXBlVG9Db252ZXJ0VG8pO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBzZWxmLnJlZHJhdyh0cnVlKTtcbiAgICAgICAgfSwxMClcbiAgICB9XG5cbiAgICBwZXJmb3JtT3BlcmF0aW9uKG9iamVjdCwgb3BlcmF0aW9uKXtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLmRhdGEuc2F2ZVN0YXRlKCk7XG4gICAgICAgIG9wZXJhdGlvbi5wZXJmb3JtKG9iamVjdCk7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHNlbGYucmVkcmF3KCk7XG4gICAgICAgICAgICBzZWxmLmxheW91dC51cGRhdGUoKTtcbiAgICAgICAgfSwxMClcbiAgICB9XG5cbiAgICBmb2xkU3VidHJlZShub2RlLCBmb2xkID0gdHJ1ZSwgcmVkcmF3PXRydWUpe1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIG5vZGUuZm9sZGVkID0gZm9sZDtcblxuICAgICAgICB0aGlzLmRhdGEuZ2V0QWxsRGVzY2VuZGFudE5vZGVzKG5vZGUpLmZvckVhY2gobj0+e1xuICAgICAgICAgICAgbi4kaGlkZGVuID0gZm9sZDtcbiAgICAgICAgICAgIG4uZm9sZGVkID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmRhdGEuZ2V0QWxsRGVzY2VuZGFudEVkZ2VzKG5vZGUpLmZvckVhY2goZT0+ZS4kaGlkZGVuID0gZm9sZCk7XG5cbiAgICAgICAgaWYoIXJlZHJhdyl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgc2VsZi5yZWRyYXcoKTtcbiAgICAgICAgICAgIHNlbGYubGF5b3V0LnVwZGF0ZSgpO1xuICAgICAgICB9LDEwKVxuICAgIH1cblxuICAgIHVwZGF0ZVZpc2liaWxpdHkobm9kZSA9IG51bGwpe1xuICAgICAgICBpZighbm9kZSl7XG4gICAgICAgICAgICB0aGlzLmRhdGEuZ2V0Um9vdHMoKS5mb3JFYWNoKG49PnRoaXMudXBkYXRlVmlzaWJpbGl0eShuKSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZihub2RlLmZvbGRlZCl7XG4gICAgICAgICAgICB0aGlzLmZvbGRTdWJ0cmVlKG5vZGUsIHRydWUsIGZhbHNlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIG5vZGUuY2hpbGRFZGdlcy5mb3JFYWNoKGUgPT4gdGhpcy51cGRhdGVWaXNpYmlsaXR5KGUuY2hpbGROb2RlKSk7XG5cbiAgICB9XG5cbiAgICBtb3ZlTm9kZVRvKHgseSl7XG5cbiAgICB9XG5cbiAgICB1cGRhdGVOb2RlUG9zaXRpb24obm9kZSkge1xuICAgICAgICB0aGlzLmdldE5vZGVEM1NlbGVjdGlvbihub2RlKS5yYWlzZSgpLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJytub2RlLmxvY2F0aW9uLngrJyAnK25vZGUubG9jYXRpb24ueSsnKScpO1xuICAgIH1cblxuICAgIHVwZGF0ZVRleHRQb3NpdGlvbih0ZXh0KSB7XG4gICAgICAgIHRoaXMuZ2V0VGV4dEQzU2VsZWN0aW9uKHRleHQpLnJhaXNlKCkuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnK3RleHQubG9jYXRpb24ueCsnICcrdGV4dC5sb2NhdGlvbi55KycpJyk7XG4gICAgfVxuXG4gICAgZ2V0Tm9kZUQzU2VsZWN0aW9uKG5vZGUpe1xuICAgICAgICByZXR1cm4gdGhpcy5nZXROb2RlRDNTZWxlY3Rpb25CeUlkKG5vZGUuJGlkKTtcbiAgICB9XG5cbiAgICBnZXROb2RlRDNTZWxlY3Rpb25CeUlkKGlkKXtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFpbkdyb3VwLnNlbGVjdCgnI25vZGUtJytpZCk7XG4gICAgfVxuICAgIGdldFRleHREM1NlbGVjdGlvbih0ZXh0KXtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VGV4dEQzU2VsZWN0aW9uQnlJZCh0ZXh0LiRpZCk7XG4gICAgfVxuICAgIGdldFRleHREM1NlbGVjdGlvbkJ5SWQoaWQpe1xuICAgICAgICByZXR1cm4gdGhpcy5tYWluR3JvdXAuc2VsZWN0KCcjdGV4dC0nK2lkKTtcbiAgICB9XG5cbiAgICBnZXRTZWxlY3RlZE5vZGVzKHZpc2libGVPbmx5ID0gZmFsc2UpIHtcbiAgICAgICAgbGV0IHNlbGVjdGVkVmlzaWJsZSA9IHRoaXMubWFpbkdyb3VwLnNlbGVjdEFsbChcIi5ub2RlLnNlbGVjdGVkXCIpLmRhdGEoKTtcbiAgICAgICAgaWYodmlzaWJsZU9ubHkpe1xuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdGVkVmlzaWJsZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBhbGxTZWxlY3RlZCAgPSBbXTtcbiAgICAgICAgYWxsU2VsZWN0ZWQucHVzaCguLi5zZWxlY3RlZFZpc2libGUpO1xuXG4gICAgICAgIHNlbGVjdGVkVmlzaWJsZS5mb3JFYWNoKG49PntcbiAgICAgICAgICAgIGlmKG4uZm9sZGVkKXtcbiAgICAgICAgICAgICAgICBsZXQgZGVzY2VuZGFudHMgPSB0aGlzLmRhdGEuZ2V0QWxsRGVzY2VuZGFudE5vZGVzKG4pO1xuICAgICAgICAgICAgICAgIGlmKGRlc2NlbmRhbnRzKXtcbiAgICAgICAgICAgICAgICAgICAgYWxsU2VsZWN0ZWQucHVzaCguLi5kZXNjZW5kYW50cyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gYWxsU2VsZWN0ZWQ7XG4gICAgfVxuXG4gICAgZ2V0U2VsZWN0ZWRUZXh0cygpe1xuICAgICAgICByZXR1cm4gdGhpcy5tYWluR3JvdXAuc2VsZWN0QWxsKFwiLmZsb2F0aW5nLXRleHQuc2VsZWN0ZWRcIikuZGF0YSgpO1xuICAgIH1cblxuICAgIGNsZWFyU2VsZWN0aW9uKCl7XG4gICAgICAgIHRoaXMubWFpbkdyb3VwLnNlbGVjdEFsbChcIi5lZGdlLnNlbGVjdGVkXCIpLnNlbGVjdCgncGF0aCcpLmF0dHIoXCJtYXJrZXItZW5kXCIsIGQgPT4gXCJ1cmwoI2Fycm93XCIrKHRoaXMuaXNPcHRpbWFsKGQpPyctb3B0aW1hbCc6JycpK1wiKVwiKVxuICAgICAgICB0aGlzLm1haW5Hcm91cC5zZWxlY3RBbGwoXCIuc2VsZWN0ZWRcIikuY2xhc3NlZCgnc2VsZWN0ZWQnLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuY29uZmlnLm9uU2VsZWN0aW9uQ2xlYXJlZCgpO1xuICAgIH1cblxuICAgIHNlbGVjdEVkZ2UoZWRnZSwgY2xlYXJTZWxlY3Rpb25CZWZvcmVTZWxlY3Qpe1xuICAgICAgICBpZihjbGVhclNlbGVjdGlvbkJlZm9yZVNlbGVjdCl7XG4gICAgICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb25maWcub25FZGdlU2VsZWN0ZWQoZWRnZSk7XG4gICAgICAgIHRoaXMubWFpbkdyb3VwLnNlbGVjdCgnI2VkZ2UtJytlZGdlLiRpZClcbiAgICAgICAgICAgIC5jbGFzc2VkKCdzZWxlY3RlZCcsIHRydWUpXG4gICAgICAgICAgICAuc2VsZWN0KCdwYXRoJylcbiAgICAgICAgICAgIC5hdHRyKFwibWFya2VyLWVuZFwiLCBkID0+IFwidXJsKCNhcnJvdy1zZWxlY3RlZClcIilcbiAgICB9XG5cbiAgICBpc05vZGVTZWxlY3RlZChub2RlKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Tm9kZUQzU2VsZWN0aW9uKG5vZGUpLmNsYXNzZWQoJ3NlbGVjdGVkJyk7XG4gICAgfVxuXG4gICAgc2VsZWN0Tm9kZShub2RlLCBjbGVhclNlbGVjdGlvbkJlZm9yZVNlbGVjdCwgc2tpcENhbGxiYWNrKXtcbiAgICAgICAgaWYoY2xlYXJTZWxlY3Rpb25CZWZvcmVTZWxlY3Qpe1xuICAgICAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIXNraXBDYWxsYmFjayl7XG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5vbk5vZGVTZWxlY3RlZChub2RlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZ2V0Tm9kZUQzU2VsZWN0aW9uQnlJZChub2RlLiRpZCkuY2xhc3NlZCgnc2VsZWN0ZWQnLCB0cnVlKTtcbiAgICB9XG5cbiAgICBzZWxlY3RUZXh0KHRleHQsIGNsZWFyU2VsZWN0aW9uQmVmb3JlU2VsZWN0LCBza2lwQ2FsbGJhY2spe1xuICAgICAgICBpZihjbGVhclNlbGVjdGlvbkJlZm9yZVNlbGVjdCl7XG4gICAgICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZighc2tpcENhbGxiYWNrKXtcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLm9uVGV4dFNlbGVjdGVkKHRleHQpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmdldFRleHREM1NlbGVjdGlvbkJ5SWQodGV4dC4kaWQpLmNsYXNzZWQoJ3NlbGVjdGVkJywgdHJ1ZSk7XG4gICAgfVxuXG4gICAgc2VsZWN0U3ViVHJlZShub2RlLCBjbGVhclNlbGVjdGlvbkJlZm9yZVNlbGVjdCxza2lwQ2FsbGJhY2spIHtcbiAgICAgICAgaWYoY2xlYXJTZWxlY3Rpb25CZWZvcmVTZWxlY3Qpe1xuICAgICAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2VsZWN0Tm9kZShub2RlLCBmYWxzZSwgc2tpcENhbGxiYWNrKTtcbiAgICAgICAgbm9kZS5jaGlsZEVkZ2VzLmZvckVhY2goZT0+dGhpcy5zZWxlY3RTdWJUcmVlKGUuY2hpbGROb2RlLCBmYWxzZSwgdHJ1ZSkpO1xuICAgIH1cblxuICAgIHNlbGVjdEFsbE5vZGVzKCkge1xuICAgICAgICB0aGlzLm1haW5Hcm91cC5zZWxlY3RBbGwoXCIubm9kZVwiKS5jbGFzc2VkKCdzZWxlY3RlZCcsIHRydWUpO1xuICAgIH1cblxuICAgIGF1dG9MYXlvdXQodHlwZSwgd2l0aG91dFN0YXRlU2F2aW5nKXtcbiAgICAgICAgdGhpcy5sYXlvdXQuYXV0b0xheW91dCh0eXBlLCB3aXRob3V0U3RhdGVTYXZpbmcpO1xuICAgIH1cblxuICAgIHVwZGF0ZURpYWdyYW1UaXRsZSh0aXRsZVZhbHVlKXtcbiAgICAgICAgaWYoIXRpdGxlVmFsdWUpe1xuICAgICAgICAgICAgdGl0bGVWYWx1ZSA9ICcnO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGlhZ3JhbVRpdGxlID0gdGl0bGVWYWx1ZTtcbiAgICAgICAgdGhpcy5yZWRyYXdEaWFncmFtVGl0bGUoKTtcbiAgICAgICAgdGhpcy5yZWRyYXdEaWFncmFtRGVzY3JpcHRpb24oKTtcbiAgICAgICAgdGhpcy51cGRhdGVNYXJnaW4odHJ1ZSk7XG4gICAgfVxuXG4gICAgcmVkcmF3RGlhZ3JhbVRpdGxlKCl7XG4gICAgICAgIHZhciBzdmdXaWR0aCA9IHRoaXMuc3ZnLmF0dHIoJ3dpZHRoJyk7XG4gICAgICAgIHZhciBzdmdIZWlnaHQgPSB0aGlzLnN2Zy5hdHRyKCdoZWlnaHQnKTtcbiAgICAgICAgdGhpcy50aXRsZUNvbnRhaW5lciA9IHRoaXMuc3ZnLnNlbGVjdE9yQXBwZW5kKCdnLnNkLXRpdGxlLWNvbnRhaW5lcicpO1xuXG4gICAgICAgIHZhciB0aXRsZSA9IHRoaXMudGl0bGVDb250YWluZXIuc2VsZWN0T3JBcHBlbmQoJ3RleHQuc2QtdGl0bGUnKTtcbiAgICAgICAgdGl0bGUudGV4dCh0aGlzLmRpYWdyYW1UaXRsZSk7XG4gICAgICAgIExheW91dC5zZXRIYW5naW5nUG9zaXRpb24odGl0bGUpO1xuXG4gICAgICAgIHZhciBtYXJnaW5Ub3AgPSBwYXJzZUludCh0aGlzLmNvbmZpZy50aXRsZS5tYXJnaW4udG9wKTtcbiAgICAgICAgdGhpcy50aXRsZUNvbnRhaW5lci5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcrKHN2Z1dpZHRoLzIpKycsJysoIG1hcmdpblRvcCkrJyknKTtcbiAgICB9XG4gICAgcmVkcmF3RGlhZ3JhbURlc2NyaXB0aW9uKCl7XG4gICAgICAgIHZhciBzdmdXaWR0aCA9IHRoaXMuc3ZnLmF0dHIoJ3dpZHRoJyk7XG4gICAgICAgIHZhciBzdmdIZWlnaHQgPSB0aGlzLnN2Zy5hdHRyKCdoZWlnaHQnKTtcbiAgICAgICAgdGhpcy50aXRsZUNvbnRhaW5lciA9IHRoaXMuc3ZnLnNlbGVjdE9yQXBwZW5kKCdnLnNkLXRpdGxlLWNvbnRhaW5lcicpO1xuXG4gICAgICAgIHZhciBkZXNjID0gdGhpcy50aXRsZUNvbnRhaW5lci5zZWxlY3RPckFwcGVuZCgndGV4dC5zZC1kZXNjcmlwdGlvbicpO1xuXG4gICAgICAgIGlmKCF0aGlzLmNvbmZpZy5kZXNjcmlwdGlvbi5zaG93KXtcbiAgICAgICAgICAgIGRlc2MucmVtb3ZlKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbGluZXMgPSB0aGlzLmRpYWdyYW1EZXNjcmlwdGlvbiA/IHRoaXMuZGlhZ3JhbURlc2NyaXB0aW9uLnNwbGl0KCdcXG4nKSA6IFtdO1xuICAgICAgICB2YXIgdHNwYW5zID0gZGVzYy5zZWxlY3RBbGwoJ3RzcGFuJykuZGF0YShsaW5lcyk7XG4gICAgICAgIHRzcGFucy5lbnRlcigpLmFwcGVuZCgndHNwYW4nKVxuICAgICAgICAgICAgLm1lcmdlKHRzcGFucylcbiAgICAgICAgICAgIC5odG1sKGw9PkFwcFV0aWxzLnJlcGxhY2VVcmxzKEFwcFV0aWxzLmVzY2FwZUh0bWwobCkpKVxuICAgICAgICAgICAgLmF0dHIoJ2R5JywgKGQsaSk9Pmk+MCA/ICcxLjFlbSc6IHVuZGVmaW5lZClcbiAgICAgICAgICAgIC5hdHRyKCd4JywgJzAnKTtcblxuICAgICAgICB0c3BhbnMuZXhpdCgpLnJlbW92ZSgpO1xuICAgICAgICBMYXlvdXQuc2V0SGFuZ2luZ1Bvc2l0aW9uKGRlc2MpO1xuXG4gICAgICAgIHZhciB0aXRsZSA9IHRoaXMudGl0bGVDb250YWluZXIuc2VsZWN0T3JBcHBlbmQoJ3RleHQuc2QtdGl0bGUnKTtcblxuICAgICAgICB2YXIgbWFyZ2luVG9wID0gMDtcbiAgICAgICAgaWYodGhpcy5kaWFncmFtVGl0bGUpe1xuICAgICAgICAgICAgbWFyZ2luVG9wICs9IHRpdGxlLm5vZGUoKS5nZXRCQm94KCkuaGVpZ2h0O1xuICAgICAgICAgICAgbWFyZ2luVG9wKz0gTWF0aC5tYXgocGFyc2VJbnQodGhpcy5jb25maWcuZGVzY3JpcHRpb24ubWFyZ2luLnRvcCksIDApO1xuICAgICAgICB9XG5cblxuICAgICAgICBkZXNjLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoMCwnKyggbWFyZ2luVG9wKSsnKScpO1xuICAgIH1cblxuICAgIHVwZGF0ZURpYWdyYW1EZXNjcmlwdGlvbihkZXNjcmlwdGlvblZhbHVlKXtcbiAgICAgICAgaWYoIWRlc2NyaXB0aW9uVmFsdWUpe1xuICAgICAgICAgICAgZGVzY3JpcHRpb25WYWx1ZSA9ICcnO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGlhZ3JhbURlc2NyaXB0aW9uID0gZGVzY3JpcHRpb25WYWx1ZTtcbiAgICAgICAgdGhpcy5yZWRyYXdEaWFncmFtVGl0bGUoKTtcbiAgICAgICAgdGhpcy5yZWRyYXdEaWFncmFtRGVzY3JpcHRpb24oKTtcbiAgICAgICAgdGhpcy51cGRhdGVNYXJnaW4odHJ1ZSk7XG4gICAgfVxuXG5cbiAgICBnZXRUaXRsZUdyb3VwSGVpZ2h0KHdpdGhNYXJnaW5zKXtcbiAgICAgICAgaWYoIXRoaXMudGl0bGVDb250YWluZXIpe1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGggPSB0aGlzLnRpdGxlQ29udGFpbmVyLm5vZGUoKS5nZXRCQm94KCkuaGVpZ2h0O1xuICAgICAgICBpZih3aXRoTWFyZ2lucyl7XG4gICAgICAgICAgICBoKz0gcGFyc2VJbnQodGhpcy5jb25maWcudGl0bGUubWFyZ2luLmJvdHRvbSk7XG4gICAgICAgICAgICBoKz0gcGFyc2VJbnQodGhpcy5jb25maWcudGl0bGUubWFyZ2luLnRvcCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGg7XG4gICAgfVxuXG59XG4iLCJleHBvcnQgKiBmcm9tICcuL3NyYy9pbmRleCdcbiJdfQ==
