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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
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
}

exports.default = grid;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _grid = __webpack_require__(0);

var _grid2 = _interopRequireDefault(_grid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Variables
var cvs = document.getElementById('cvs'),
    ctx = cvs.getContext('2d'),


// 质心
CENTROID_RADIUS = 10,
    CENTROID_STROKE_STYLE = 'rgba(0, 0, 0, .5)',
    CENTROID_FILL_STYLE = 'rgba(80, 190, 240, .6)',


// 表盘
RING_INNER_RADIUS = 35,
    RING_OUTER_RADIUS = 55,


// 注释
ANNOTATIONS_FILL_STYLE = 'rgba(0, 0, 230, .9)',
    ANNOTATIONS_TEXT_SIZE = 12,


// 刻度
TICK_WIDTH = 10,
    TICK_LONG_STROKE_STYLE = 'rgba(100, 140, 230, .9)',
    TICK_SHORT_STROKE_STYLE = 'rgba(100, 140, 230, .7)',


// 指针
TRACKING_DIAL_STROKING_STYLE = 'rgba(100, 140, 230, .5)',


// 导线
GUIDEWIRE_STROKE_STYLE = 'goldenrod',
    GUIDEWIRE_FILL_STYLE = 'rgba(250, 250, 0, .6)',
    ONE_TURN = Math.PI * 2,


// 圆
circle = {};

// Functions
// 绘制仪表盘
function drawDial() {
	var loc = {
		x: circle.x,
		y: circle.y
	};

	drawCentroid();
	drawCentroidGuidewire(loc);
	drawRing();
	drawTickInnerCircle();
	drawTicks();
	drawAnnotations();
}

// 绘制质心
function drawCentroid() {
	ctx.beginPath();
	ctx.save();
	ctx.strokeStyle = CENTROID_STROKE_STYLE;
	ctx.fillStyle = CENTROID_FILL_STYLE;
	ctx.arc(circle.x, circle.y, CENTROID_RADIUS, 0, ONE_TURN, false);
	ctx.stroke();
	ctx.fill();
	ctx.restore();
}

// 绘制导线和指针
function drawCentroidGuidewire(loc) {
	var angle = -Math.PI / 4,
	    radius,
	    endpt,
	    symbol;

	radius = circle.radius + RING_OUTER_RADIUS;
	symbol = loc.x >= circle.x ? 1 : -1;
	endpt = {
		x: circle.x + symbol * radius * Math.cos(angle),
		y: circle.y + symbol * radius * Math.sin(angle)
	};

	ctx.save();

	ctx.strokeStyle = GUIDEWIRE_STROKE_STYLE;
	ctx.fillStyle = GUIDEWIRE_FILL_STYLE;

	ctx.beginPath();
	ctx.moveTo(circle.x, circle.y);
	ctx.lineTo(endpt.x, endpt.y);
	ctx.stroke();

	ctx.beginPath();
	ctx.strokeStyle = TICK_LONG_STROKE_STYLE;
	ctx.arc(endpt.x, endpt.y, 5, 0, ONE_TURN, false);
	ctx.fill();
	ctx.stroke();

	ctx.restore();
}

// 绘制表盘
function drawRing() {
	drawRingOuterCircle();
	drawRingInnerCircle();
}

// 绘制外环
function drawRingOuterCircle() {
	ctx.shadowColor = 'rgba(0, 0, 0, .7)';
	ctx.shadowOffsetX = 3;
	ctx.shadowOffsetY = 3;
	ctx.shadowBlur = 6;
	ctx.strokeStyle = TRACKING_DIAL_STROKING_STYLE;
	ctx.beginPath();
	ctx.arc(circle.x, circle.y, circle.radius + RING_OUTER_RADIUS, 0, ONE_TURN, true);
	ctx.stroke();
}

// 绘制内环
function drawRingInnerCircle() {
	ctx.strokeStyle = 'rgba(0, 0, 0, .1)';
	ctx.arc(circle.x, circle.y, circle.radius + RING_INNER_RADIUS, 0, ONE_TURN, false);
	ctx.fillStyle = 'rgba(100, 140, 230, .1)';
	ctx.fill();
	ctx.stroke();
}

// 绘制刻度环
function drawTickInnerCircle() {
	ctx.save();

	ctx.beginPath();
	ctx.strokeStyle = 'rgba(0, 0, 0, .1)';
	ctx.arc(circle.x, circle.y, circle.radius + RING_INNER_RADIUS - TICK_WIDTH, 0, ONE_TURN, false);
	ctx.stroke();

	ctx.restore();
}

// 绘制刻度
function drawTick(angle, radius, cnt) {
	var tickWidth = cnt % 4 === 0 ? TICK_WIDTH : TICK_WIDTH / 2;

	ctx.beginPath();
	ctx.moveTo(circle.x + Math.cos(angle) * (radius - tickWidth), circle.y + Math.sin(angle) * (radius - tickWidth));
	ctx.lineTo(circle.x + Math.cos(angle) * radius, circle.y + Math.sin(angle) * radius);
	ctx.strokeStyle = TICK_SHORT_STROKE_STYLE;
	ctx.stroke();
}

// 绘制所有刻度
function drawTicks() {
	var radius = circle.radius + RING_INNER_RADIUS,
	    ANGLE_MAX = ONE_TURN,
	    ANGLE_DELTA = Math.PI / 64,
	    tickWidth;

	ctx.save();

	for (var angle = 0, cnt = 0; angle < ANGLE_MAX; angle += ANGLE_DELTA, cnt++) {
		// drawTick(angle, radius, cnt++);
		drawTick(angle, radius, cnt);
	}

	ctx.restore();
}

// 绘制注释
function drawAnnotations() {
	var radius = circle.radius + RING_INNER_RADIUS;

	ctx.save();

	ctx.fillStyle = ANNOTATIONS_FILL_STYLE;
	ctx.font = ANNOTATIONS_TEXT_SIZE + 'px Helvetica';

	for (var angle = 0; angle < ONE_TURN; angle += Math.PI / 8) {
		ctx.beginPath();
		ctx.fillText((angle * 180 / Math.PI).toFixed(0), circle.x + Math.cos(angle) * (radius - TICK_WIDTH * 2), circle.y - Math.sin(angle) * (radius - TICK_WIDTH * 2));
	}

	ctx.restore();
}

// Initialization
cvs.width = 600;
cvs.height = 600;

circle = {
	x: cvs.width / 2,
	y: cvs.height / 2,
	radius: 150
};

(0, _grid2.default)(ctx, 'lightgray', 10, 10);
ctx.shadowColor = 'rgba(0, 0, 0, .4)';
ctx.shadowOffsetX = 2;
ctx.shadowOffsetY = 2;
ctx.shadowBlur = 4;

ctx.textAlign = 'center';
ctx.textBaseline = 'middle';

drawDial();

/***/ })
/******/ ]);