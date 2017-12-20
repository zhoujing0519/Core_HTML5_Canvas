/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
// 绘制网格
function grid(ctx) {
	var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'lightgray';
	var stepX = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
	var stepY = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 10;

	var width = ctx.canvas.width;
	var height = ctx.canvas.height;

	ctx.save();
	ctx.strokeStyle = color;
	ctx.lineWidth = .5;

	// 绘制行
	for (var i = stepY + .5; i < height; i += stepY) {
		ctx.beginPath();
		ctx.moveTo(0, i);
		ctx.lineTo(width, i);
		ctx.stroke();
	}

	// 绘制列
	for (var i = stepX + .5; i < width; i += stepX) {
		ctx.beginPath();
		ctx.moveTo(i, 0);
		ctx.lineTo(i, height);
		ctx.stroke();
	}

	ctx.restore();
}

exports.default = grid;

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _dom = __webpack_require__(4);

var _grid = __webpack_require__(0);

var _grid2 = _interopRequireDefault(_grid);

var _windowToObj = __webpack_require__(5);

var _windowToObj2 = _interopRequireDefault(_windowToObj);

var _imageData = __webpack_require__(6);

var _imageData2 = _interopRequireDefault(_imageData);

var _polygon = __webpack_require__(7);

var _polygon2 = _interopRequireDefault(_polygon);

var _guidewires = __webpack_require__(9);

var _guidewires2 = _interopRequireDefault(_guidewires);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Variable
var cvs = (0, _dom.$)('#cvs'),
    ctx = cvs.getContext('2d'),
    eraseAllButton = (0, _dom.$)('#eraseAllButton'),
    strokeStyleSelect = (0, _dom.$)('#strokeStyleSelect'),
    startAngleSelect = (0, _dom.$)('#startAngleSelect'),
    fillStyleSelect = (0, _dom.$)('#fillStyleSelect'),
    fillCheckbox = (0, _dom.$)('#fillCheckbox'),
    editCheckbox = (0, _dom.$)('#editCheckbox'),
    sidesSelect = (0, _dom.$)('#sidesSelect');

var imageData = new _imageData2.default(),
    mousedown = {},
    rubberbandRect = {},
    dragging = false,
    draggingOffsetX = void 0,
    draggingOffsetY = void 0,
    sides = 8,
    startAngle = 0,
    guidewires = true,
    editing = false,
    polygons = [];

// Functions
// 绘制多边形
function drawPolygon(polygon) {
	ctx.beginPath();
	polygon.createPath(ctx);
	polygon.stroke(ctx);

	if (fillCheckbox.checked) polygon.fill(ctx);
}

// 绘制所有多边形
function drawPolygons() {
	polygons.forEach(function (polygon) {
		drawPolygon(polygon);
	});
}

// 更新橡皮筋矩形
function updateRubberbandRectangle(loc) {
	var offsetX = loc.x - mousedown.x,
	    offsetY = loc.y - mousedown.y;

	rubberbandRect.width = Math.abs(offsetX);
	rubberbandRect.height = Math.abs(offsetY);
	rubberbandRect.left = offsetX > 0 ? mousedown.x : loc.x;
	rubberbandRect.top = offsetY > 0 ? mousedown.y : loc.y;
}

// 绘制通过橡皮筋拉出来的多边形
function drawRubberbandShape(loc, sides, startAngle) {
	var polygon = new _polygon2.default({
		centerX: mousedown.x,
		centerY: mousedown.y,
		radius: rubberbandRect.width,
		sides: parseInt(sidesSelect.value),
		startAngle: Math.PI / 180 * parseInt(startAngleSelect.value),
		strokeStyle: ctx.strokeStyle,
		fillStyle: ctx.fillStyle,
		filled: fillCheckbox.checked
	});

	drawPolygon(polygon);
	if (!dragging) polygons.push(polygon);
}

// 更新橡皮筋
function updateRubberband(loc, sides, startAngle) {
	updateRubberbandRectangle(loc);
	drawRubberbandShape(loc, sides, startAngle);
}

// 拖动：开始
function startDragging(loc) {
	imageData.saveDrawingSurface(ctx);
	mousedown.x = loc.x;
	mousedown.y = loc.y;
}

// 编辑：开始
function startEditing() {
	cvs.style.cursor = 'pointer';
	editing = true;
}

// 编辑：结束
function stopEditing() {
	cvs.style.cursor = 'crosshair';
	editing = false;
}

// Event handler
// 鼠标：按下
cvs.onmousedown = function (e) {
	var loc = (0, _windowToObj2.default)(cvs, e.clientX, e.clientY);

	e.preventDefault();
	if (editing) {
		polygons.forEach(function (polygon) {
			polygon.createPath(ctx);

			if (ctx.isPointInPath(loc.x, loc.y)) {
				startDragging(loc);
				dragging = polygon;
				draggingOffsetX = loc.x - polygon.x;
				draggingOffsetY = loc.y - polygon.y;
				return false;
			}
		});
	} else {
		startDragging(loc);
		dragging = true;
	}
};

// 鼠标：移动
cvs.onmousemove = function (e) {
	var loc = (0, _windowToObj2.default)(cvs, e.clientX, e.clientY);

	e.preventDefault();
	if (editing && dragging) {
		dragging.x = loc.x - draggingOffsetX;
		dragging.y = loc.y - draggingOffsetY;
		ctx.clearRect(0, 0, cvs.width, cvs.height);
		(0, _grid2.default)(ctx);
		drawPolygons();
	} else {
		if (dragging) {
			imageData.restoreDrawingSurface(ctx);
			updateRubberband(loc, sides, startAngle);

			if (guidewires) (0, _guidewires2.default)(ctx, mousedown.x, mousedown.y);
		}
	}
};

// 鼠标：松开
cvs.onmouseup = function (e) {
	var loc = (0, _windowToObj2.default)(cvs, e.clientX, e.clientY);

	dragging = false;
	if (!editing) {
		imageData.restoreDrawingSurface(ctx);
		updateRubberband(loc, sides, startAngle);
	}
};

// 清空画布
eraseAllButton.onclick = function () {
	ctx.clearRect(0, 0, cvs.width, cvs.height);
	polygons.length = 0;
	(0, _grid2.default)(ctx);
	imageData.saveDrawingSurface(ctx);
};

// 选择描边颜色
strokeStyleSelect.onchange = function () {
	ctx.strokeStyle = this.value;
};

// 选择填充颜色
fillStyleSelect.onchange = function () {
	ctx.fillStyle = this.value;
};

// 切换编辑状态
editCheckbox.onchange = function () {
	this.checked ? startEditing() : stopEditing();
};

// Initialization
cvs.width = 600;
cvs.height = 600;

(0, _grid2.default)(ctx);

ctx.strokeStyle = strokeStyleSelect.value;
ctx.fillStyle = fillStyleSelect.value;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.$ = $;
function $(selector) {
	return document.querySelector(selector);
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
function windowToObj(obj, x, y) {
	var boundingBox = obj.getBoundingClientRect();

	return {
		x: x - boundingBox.left * (obj.width / boundingBox.width),
		y: y - boundingBox.top * (obj.height / boundingBox.height)
	};
}

exports.default = windowToObj;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ImageData = function () {
	function ImageData() {
		_classCallCheck(this, ImageData);

		this.drawingSurfaceImageData = null;
	}

	_createClass(ImageData, [{
		key: "saveDrawingSurface",
		value: function saveDrawingSurface(ctx) {
			this.drawingSurfaceImageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
		}
	}, {
		key: "restoreDrawingSurface",
		value: function restoreDrawingSurface(ctx) {
			ctx.putImageData(this.drawingSurfaceImageData, 0, 0);
		}
	}]);

	return ImageData;
}();

exports.default = ImageData;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _point = __webpack_require__(8);

var _point2 = _interopRequireDefault(_point);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Polygon = function () {
	function Polygon(_ref) {
		var centerX = _ref.centerX,
		    centerY = _ref.centerY,
		    radius = _ref.radius,
		    sides = _ref.sides,
		    _ref$startAngle = _ref.startAngle,
		    startAngle = _ref$startAngle === undefined ? 0 : _ref$startAngle,
		    strokeStyle = _ref.strokeStyle,
		    fillStyle = _ref.fillStyle,
		    filled = _ref.filled;

		_classCallCheck(this, Polygon);

		this.x = centerX;
		this.y = centerY;
		this.radius = radius;
		this.sides = sides;
		this.startAngle = startAngle;
		this.strokeStyle = strokeStyle;
		this.fillStyle = fillStyle;
		this.filled = filled;
	}

	// 获取多边形上的顶点


	_createClass(Polygon, [{
		key: 'getPoints',
		value: function getPoints() {
			var points = [],
			    angle = this.startAngle;

			for (var i = 0, size = this.sides; i < size; ++i) {
				points.push(new _point2.default({
					x: this.x + this.radius * Math.sin(angle),
					y: this.y - this.radius * Math.cos(angle)
				}));
				angle += 2 * Math.PI / this.sides;
			}

			return points;
		}

		// 创建路径

	}, {
		key: 'createPath',
		value: function createPath(ctx) {
			var points = this.getPoints(),
			    len = points.length;
			var i = 0;

			ctx.beginPath();
			ctx.moveTo(points[i].x, points[i].y);
			for (; i < len; ++i) {
				ctx.lineTo(points[i].x, points[i].y);
			}
			ctx.closePath();
		}

		// 描边

	}, {
		key: 'stroke',
		value: function stroke(ctx) {
			ctx.save();
			this.createPath(ctx);
			ctx.strokeStyle = this.strokeStyle;
			ctx.stroke();
			ctx.restore();
		}

		// 填充

	}, {
		key: 'fill',
		value: function fill(ctx) {
			ctx.save();
			this.createPath(ctx);
			ctx.fillStyle = this.fillStyle;
			ctx.fill();
			ctx.restore();
		}

		// 移动多边形

	}, {
		key: 'move',
		value: function move(x, y) {
			this.x = x;
			this.y = y;
		}
	}]);

	return Polygon;
}();

exports.default = Polygon;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Point = function Point(_ref) {
	var x = _ref.x,
	    y = _ref.y;

	_classCallCheck(this, Point);

	this.x = x;
	this.y = y;
};

exports.default = Point;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var DEFAULT = {
	strokeStyle: 'rgba(0, 0, 230, .4)',
	lineWidth: .5
};

// 绘制引导线
function guidewires(ctx, x, y) {
	var strokeStyle = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : DEFAULT.strokeStyle;
	var lineWidth = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : DEFAULT.lineWidth;

	drawGuidewires(ctx, x, y, strokeStyle, lineWidth);
}

// 绘制水平线
function drawHorizontalLine(ctx, y) {
	ctx.beginPath();
	ctx.moveTo(0, y + .5);
	ctx.lineTo(ctx.canvas.width, y + .5);
	ctx.stroke();
}
// 绘制垂直线
function drawVerticalLine(ctx, x) {
	ctx.beginPath();
	ctx.moveTo(x + .5, 0);
	ctx.lineTo(x + .5, ctx.canvas.height);
	ctx.stroke();
}
// 绘制引导线
function drawGuidewires(ctx, x, y, strokeStyle, lineWidth) {
	ctx.save();

	ctx.strokeStyle = strokeStyle;
	ctx.lineWidth = lineWidth;
	drawHorizontalLine(ctx, y);
	drawVerticalLine(ctx, x);

	ctx.restore();
}

exports.default = guidewires;

/***/ })
/******/ ]);