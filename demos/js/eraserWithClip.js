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
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
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
/* 1 */
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
/* 2 */
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
/* 3 */
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
/* 4 */
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

/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _dom = __webpack_require__(2);

var _imageData = __webpack_require__(3);

var _imageData2 = _interopRequireDefault(_imageData);

var _grid = __webpack_require__(0);

var _grid2 = _interopRequireDefault(_grid);

var _guidewires = __webpack_require__(4);

var _guidewires2 = _interopRequireDefault(_guidewires);

var _windowToObj = __webpack_require__(1);

var _windowToObj2 = _interopRequireDefault(_windowToObj);

var _rubberband = __webpack_require__(13);

var _rubberband2 = _interopRequireDefault(_rubberband);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Constants => 常量
var cvs = (0, _dom.$)('#cvs'),
    ctx = cvs.getContext('2d'),
    strokeStyleSelect = (0, _dom.$)('#strokeStyleSelect'),
    fillStyleSelect = (0, _dom.$)('#fillStyleSelect'),
    eraserShapeSelect = (0, _dom.$)('#eraserShapeSelect'),
    eraserWidthSelect = (0, _dom.$)('#eraserWidthSelect'),
    drawRadio = (0, _dom.$)('#drawRadio'),
    eraseRadio = (0, _dom.$)('#eraseRadio'),
    ERASER_LINE_WIDTH = 1,
    ERASER_STROKE_STYLE = 'rgb(0, 0, 255)',
    ERASER_SHADOW_STYLE = 'blue',
    ERASER_SHADOW_COLOR = 'rgb(0, 0, 0)',
    ERASER_SHADOW_OFFSET = -5,
    ERASER_SHADOW_BLUR = 20,
    GRID_HORIZONTAL_SPACING = 10,
    GRID_VERTICAL_SPACING = 10,
    GRID_LINE_COLOR = 'lightblue',
    drawingSurfaceImageData = new _imageData2.default(),
    mousedown = {},
    rubberband = new _rubberband2.default({
	drawRubberbandShape: function drawRubberbandShape(ctx, loc, mousedown) {
		var angle = Math.atan(this.rubberbandRect.height / this.rubberbandRect.width);
		var radius = this.rubberbandRect.height / Math.sin(angle);

		if (mousedown.y === loc.y) radius = Math.abs(loc.x - mousedown.x);
		ctx.beginPath();
		ctx.arc(mousedown.x, mousedown.y, radius, 0, Math.PI * 2, false);
		ctx.stroke();
		ctx.fill();
	}
});

// Letters => 变量
var lastX = void 0,
    lastY = void 0,
    dragging = false,
    guidewires = true;

// Functions => 函数
// Eraser => 橡皮擦
// 为橡皮擦设置绘图路径
function setDrawPathForEraser(loc) {
	var eraserWidth = parseFloat(eraserWidthSelect.value);
	var eraserShape = {
		circle: function circle() {
			ctx.arc(loc.x, loc.y, eraserWidth / 2, 0, Math.PI * 2, false);
		},
		square: function square() {
			ctx.rect(loc.x - eraserWidth / 2, loc.y - eraserWidth / 2, eraserWidth, eraserWidth);
		}
	};

	ctx.beginPath();
	eraserShape[eraserShapeSelect.value]();
	ctx.clip();
}

// 位橡皮擦设置擦除路径
function setErasePathForEraser() {
	var eraserWidth = parseFloat(eraserWidthSelect.value);
	var eraserShape = {
		circle: function circle() {
			ctx.arc(lastX, lastY, eraserWidth / 2 + ERASER_LINE_WIDTH, 0, Math.PI * 2, false);
		},
		square: function square() {
			ctx.rect(lastX - eraserWidth / 2 - ERASER_LINE_WIDTH, lastY - eraserWidth / 2 - ERASER_LINE_WIDTH, eraserWidth + ERASER_LINE_WIDTH * 2, eraserWidth + ERASER_LINE_WIDTH * 2);
		}
	};

	ctx.beginPath();
	eraserShape[eraserShapeSelect.value]();
	ctx.clip();
}

// 设置橡皮擦属性
function setEraserAttributes() {
	ctx.lineWidth = ERASER_LINE_WIDTH;
	ctx.shadowColor = ERASER_SHADOW_COLOR;
	ctx.shadowOffsetX = ERASER_SHADOW_OFFSET;
	ctx.shadowOffsetY = ERASER_SHADOW_OFFSET;
	ctx.shadowBlur = ERASER_SHADOW_BLUR;
	ctx.strokeStyle = ERASER_STROKE_STYLE;
}

// 擦除后的操作
function eraseLast() {
	ctx.save();

	setErasePathForEraser();
	(0, _grid2.default)(ctx, GRID_LINE_COLOR, GRID_HORIZONTAL_SPACING, GRID_VERTICAL_SPACING);

	ctx.restore();
}

// 绘制橡皮擦
function drawEraser(loc) {
	ctx.save();

	setEraserAttributes();
	setDrawPathForEraser(loc);
	ctx.stroke();

	ctx.restore();
}

// 获取canvas中相对位置
function getPosition(e) {
	return (0, _windowToObj2.default)(cvs, e.clientX, e.clientY);
}

// Event handler => 事件句柄
// Canvas事件句柄
// 鼠标：按下
cvs.onmousedown = function (e) {
	var loc = getPosition(e);

	e.preventDefault();
	if (drawRadio.checked) drawingSurfaceImageData.saveDrawingSurface(ctx);

	mousedown.x = loc.x;
	mousedown.y = loc.y;

	lastX = loc.x;
	lastY = loc.y;

	dragging = true;
};

// 鼠标：移动
cvs.onmousemove = function (e) {
	var loc = void 0;

	if (dragging) {
		e.preventDefault();

		loc = getPosition(e);
		if (drawRadio.checked) {
			drawingSurfaceImageData.restoreDrawingSurface(ctx);
			rubberband.updateRubberband(ctx, loc, mousedown);
			if (guidewires) (0, _guidewires2.default)(ctx, loc.x, loc.y);
		} else {
			eraseLast();
			drawEraser(loc);
		}

		lastX = loc.x;
		lastY = loc.y;
	}
};

// 鼠标：松开
cvs.onmouseup = function (e) {
	var loc = getPosition(e);

	if (drawRadio.checked) {
		drawingSurfaceImageData.restoreDrawingSurface(ctx);
		rubberband.updateRubberband(ctx, loc, mousedown);
	}
	if (eraseRadio.checked) eraseLast();

	dragging = false;
};

// 控制器事件
// 描边颜色切换
strokeStyleSelect.onchange = function (e) {
	ctx.strokeStyle = this.value;
};

// 填充颜色切换
fillStyleSelect.onchange = function (e) {
	ctx.fillStyle = this.value;
};

// Initializations => 初始化

ctx.strokeStyle = strokeStyleSelect.value;
ctx.fillStyle = fillStyleSelect.value;

(0, _grid2.default)(ctx, GRID_LINE_COLOR, GRID_HORIZONTAL_SPACING, GRID_VERTICAL_SPACING);

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Rubberband = function () {
	function Rubberband(_ref) {
		var drawRubberbandShape = _ref.drawRubberbandShape;

		_classCallCheck(this, Rubberband);

		this.rubberbandRect = {};
		this.drawRubberbandShape = drawRubberbandShape;
	}

	_createClass(Rubberband, [{
		key: "updateRubberbandRectangle",
		value: function updateRubberbandRectangle(loc, mousedown) {
			this.rubberbandRect.width = Math.abs(loc.x - mousedown.x);
			this.rubberbandRect.height = Math.abs(loc.y - mousedown.y);
			this.rubberbandRect.left = Math.min(loc.x, mousedown.x);
			this.rubberbandRect.top = Math.min(loc.y, mousedown.y);
		}
	}, {
		key: "updateRubberband",
		value: function updateRubberband(ctx, loc, mousedown) {
			this.updateRubberbandRectangle(loc, mousedown);
			this.drawRubberbandShape(ctx, loc, mousedown);
		}
	}]);

	return Rubberband;
}();

exports.default = Rubberband;

/***/ })
/******/ ]);