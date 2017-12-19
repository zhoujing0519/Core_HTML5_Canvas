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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
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
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _grid = __webpack_require__(0);

var _grid2 = _interopRequireDefault(_grid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cvs = document.getElementById('cvs'),
    ctx = cvs.getContext('2d'),
    endPoints = [{ x: 130, y: 70 }, { x: 430, y: 270 }],
    controlPoints = [{ x: 130, y: 250 }, { x: 450, y: 70 }];

// Functions
// 绘制贝塞尔曲线
function drawBezierCurve() {
	ctx.strokeStyle = 'blue';

	ctx.beginPath();
	ctx.moveTo(endPoints[0].x, endPoints[0].y);
	ctx.bezierCurveTo(controlPoints[0].x, controlPoints[0].y, controlPoints[1].x, controlPoints[1].y, endPoints[1].x, endPoints[1].y);
	ctx.stroke();
}

// 绘制锚点
function drawEndPoints() {
	ctx.strokeStyle = 'blue';
	ctx.fillStyle = 'red';

	endPoints.forEach(drawPoint);
}

// 绘制控制点
function drawControlPoints() {
	ctx.strokeStyle = 'yellow';
	ctx.fillStyle = 'blue';

	controlPoints.forEach(drawPoint);
}

// 绘制点
function drawPoint(point) {
	ctx.beginPath();
	ctx.arc(point.x, point.y, 5, 0, Math.PI * 2, false);
	ctx.stroke;
	ctx.fill();
}

// Initialization
cvs.width = 600;
cvs.height = 600;

(0, _grid2.default)(ctx);

drawBezierCurve();
drawControlPoints();
drawEndPoints();

/***/ })
/******/ ]);