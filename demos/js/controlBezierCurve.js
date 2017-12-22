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
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _dom = __webpack_require__(2);

var _imageData = __webpack_require__(3);

var _imageData2 = _interopRequireDefault(_imageData);

var _grid = __webpack_require__(0);

var _grid2 = _interopRequireDefault(_grid);

var _windowToObj = __webpack_require__(1);

var _windowToObj2 = _interopRequireDefault(_windowToObj);

var _guidewires = __webpack_require__(4);

var _guidewires2 = _interopRequireDefault(_guidewires);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Constant => 常量
var canvas = (0, _dom.$)('#canvas'),
    context = canvas.getContext('2d'),
    eraseAllButton = (0, _dom.$)('#eraseAllButton'),
    strokeColorSelect = (0, _dom.$)('#strokeColorSelect'),
    guidewireCheckbox = (0, _dom.$)('#guidewireCheckbox'),
    instructions = (0, _dom.$)('#instructions'),
    instructionsOkayButton = (0, _dom.$)('#instructionsOkayButton'),
    instructionsNoMoreButton = (0, _dom.$)('#instructionsNoMoreButton'),


// 角度
ANGLE_HALF = Math.PI,
    ANGLE_MAX = ANGLE_HALF * 2,


// 刻度
HORIZONTAL_TICK_SPACING = 10,
    VERTICAL_TICK_SPACING = 10,
    TICK_SIZE = 10,
    AXIS_MARGIN = 40,
    AXIS_ORIGIN = { x: AXIS_MARGIN, y: canvas.height - AXIS_MARGIN },
    AXIS_TOP = AXIS_MARGIN,
    AXIS_RIGHT = canvas.width - AXIS_MARGIN,
    AXIS_WIDTH = AXIS_RIGHT - AXIS_ORIGIN.x,
    AXIS_HEIGHT = AXIS_ORIGIN.y - AXIS_TOP,
    NUM_HORIZONTAL_TICKS = AXIS_WIDTH / HORIZONTAL_TICK_SPACING,
    NUM_VERTICAL_TICKS = AXIS_HEIGHT / VERTICAL_TICK_SPACING,


// 网格
GRID_STROKE_STYLE = 'lightblue',
    GRID_SPACING = 10,


// 控制点
POINT_RADIUS = 5,
    CONTROL_POINT_STROKE_STYLE = 'blue',
    CONTROL_POINT_FILL_STYLE = 'rgba(255, 255, 0, .5)',


// 锚点
END_POINT_STROKE_STYLE = 'navy',
    END_POINT_FILL_STYLE = 'rgba(0, 255, 0, .5)',


// 导线
GUIDEWIRE_STROKE_STYLE = 'rgba(0, 0, 230, .4)';

// letter => 变量
var showInstructions = true,
    drawingImageData = new _imageData2.default(),
    mousedown = {},
    rubberbandRect = {},
    dragging = false,
    draggingPoint = false,
    endPoints = [{}, {}],
    controlPoints = [{}, {}],
    editing = false,
    guidewires = guidewireCheckbox.checked;

// Functions => 函数
// 获取鼠标相对canvas的坐标
function getLocation(e) {
	return (0, _windowToObj2.default)(canvas, e.clientX, e.clientY);
}

// Rubberband => 橡皮筋
// 更新橡皮筋框的属性
function updateRubberbandRectangle(loc) {
	rubberbandRect.width = Math.abs(loc.x - mousedown.x);
	rubberbandRect.height = Math.abs(loc.y - mousedown.y);
	rubberbandRect.left = Math.min(loc.x, mousedown.x);
	rubberbandRect.top = Math.min(loc.y, mousedown.y);
}

// 绘制贝塞尔曲线
function drawBezierCurve() {
	context.beginPath();
	context.moveTo(endPoints[0].x, endPoints[0].y);
	context.bezierCurveTo(controlPoints[0].x, controlPoints[0].y, controlPoints[1].x, controlPoints[1].y, endPoints[1].x, endPoints[1].y);
	context.stroke();
}

// 更新锚点与控制点
function updateEndAndControlPoints() {
	endPoints[0].x = rubberbandRect.left;
	endPoints[0].y = rubberbandRect.top;
	endPoints[1].x = rubberbandRect.left + rubberbandRect.width;
	endPoints[1].y = rubberbandRect.top + rubberbandRect.height;

	controlPoints[0].x = rubberbandRect.left;
	controlPoints[0].y = rubberbandRect.top + rubberbandRect.height;
	controlPoints[1].x = rubberbandRect.left + rubberbandRect.width;
	controlPoints[1].y = rubberbandRect.top;
}

// 绘制形状
function drawRubberbandShape() {
	updateEndAndControlPoints();
	drawBezierCurve();
}

// 更新橡皮筋并绘制形状
function updateRubberband(loc) {
	updateRubberbandRectangle(loc);
	drawRubberbandShape();
}

// Points => 控制点与锚点
// 绘制点
function drawPoint(point) {
	context.beginPath();
	context.arc(point.x, point.y, POINT_RADIUS, 0, ANGLE_MAX, false);
	context.stroke();
	context.fill();
}

// 绘制各种类型的点
function drawPoints(_ref) {
	var points = _ref.points,
	    strokeStyle = _ref.strokeStyle,
	    fillStyle = _ref.fillStyle;

	context.save();

	context.strokeStyle = strokeStyle;
	context.fillStyle = fillStyle;
	points.forEach(function (point) {
		drawPoint(point);
	});

	context.restore();
}

// 绘制控制点与锚点
function drawControlAndEndPoints() {
	drawPoints({
		points: controlPoints,
		strokeStyle: CONTROL_POINT_STROKE_STYLE,
		fillStyle: CONTROL_POINT_FILL_STYLE
	});
	drawPoints({
		points: endPoints,
		strokeStyle: END_POINT_STROKE_STYLE,
		fillStyle: END_POINT_FILL_STYLE
	});
}

// 判断鼠标是否在点上
function cursorInPoint(loc, points) {
	var ret = void 0;

	points.forEach(function (point) {
		context.beginPath();
		context.arc(point.x, point.y, POINT_RADIUS, 0, ANGLE_MAX, false);

		if (context.isPointInPath(loc.x, loc.y)) {
			ret = point;
			return false;
		}
	});

	return ret;
}

// 更新拖动点的位置
function updateDraggingPoint(loc) {
	draggingPoint.x = loc.x;
	draggingPoint.y = loc.y;
}

// Event Handlers => 事件绑定
// Canvas => 画布
// 鼠标：按下
canvas.onmousedown = function (e) {
	var loc = getLocation(e);

	e.preventDefault();
	if (!editing) {
		// 非编辑状态
		drawingImageData.saveDrawingSurface(context);
		mousedown.x = loc.x;
		mousedown.y = loc.y;
		updateRubberbandRectangle(loc);
		dragging = true;
	} else {
		// 编辑状态，获取对应的操作点
		draggingPoint = cursorInPoint(loc, controlPoints) || cursorInPoint(loc, endPoints);
	}
};

// 鼠标：移动
canvas.onmousemove = function (e) {
	var loc = getLocation(e);

	if (dragging || draggingPoint) {
		e.preventDefault();
		drawingImageData.restoreDrawingSurface(context);
		if (guidewires) (0, _guidewires2.default)(context, loc.x, loc.y);
	}

	if (dragging) {
		updateRubberband(loc);
		drawControlAndEndPoints();
	} else if (draggingPoint) {
		updateDraggingPoint(loc);
		drawControlAndEndPoints();
		drawBezierCurve();
	}
};

// 鼠标：松开
canvas.onmouseup = function (e) {
	var loc = getLocation(e);

	drawingImageData.restoreDrawingSurface(context);
	if (!editing) {
		// 默认：非编辑状态
		updateRubberband(loc);
		drawControlAndEndPoints();
		dragging = false;
		editing = true; // 使其可以编辑
		if (showInstructions) instructions.style.display = 'inline';
	} else {
		// 编辑状态
		draggingPoint ? drawControlAndEndPoints() : editing = false;
		drawBezierCurve();
		draggingPoint = undefined;
	}
};

// Controls => 控制器
// 清空所有，还原所有状态
eraseAllButton.onclick = function () {
	context.clearRect(0, 0, canvas.width, canvas.height);
	(0, _grid2.default)(context, GRID_STROKE_STYLE, GRID_SPACING, GRID_SPACING);
	drawingImageData.saveDrawingSurface(context);

	editing = false;
	dragging = false;
	draggingPoint = undefined;
};

// 选择描边颜色
strokeColorSelect.onchange = function () {
	context.strokeStyle = this.value;
};

// 是否显示辅助线
guidewireCheckbox.onchange = function () {
	guidewires = this.checked;
};

// Instructions => 操作指南
// 确定
instructionsOkayButton.onclick = function () {
	instructions.style.display = 'none';
};

// 忽略
instructionsNoMoreButton.onclick = function () {
	instructions.style.display = 'none';
	showInstructions = false;
};

// Initializations => 初始化
context.strokeStyle = strokeColorSelect.value;
(0, _grid2.default)(context, GRID_STROKE_STYLE, GRID_SPACING, GRID_SPACING);

/***/ })
/******/ ]);