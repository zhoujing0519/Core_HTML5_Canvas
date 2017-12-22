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
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
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

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _windowToObj = __webpack_require__(1);

var _windowToObj2 = _interopRequireDefault(_windowToObj);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Constant => 常量
var cvs = document.getElementById('cvs');
var ctx = cvs.getContext('2d');
var selectElement = document.getElementById('compositingSelect');

// Functions => 函数
// 绘制文字
function drawText() {
	ctx.save();

	ctx.shadowColor = 'rgba(100, 100, 150, .8)';
	ctx.shadowOffsetX = 5;
	ctx.shadowOffsetY = 5;
	ctx.shadowBlur = 10;
	ctx.fillStyle = 'cornflowerblue';
	ctx.strokeStyle = 'yellow';

	ctx.fillText('HTML5', 20, 250);
	ctx.strokeText('HTML5', 20, 250);

	ctx.restore();
}

// 获取鼠标相对于canvas的坐标
function getPosition(e) {
	return (0, _windowToObj2.default)(cvs, e.clientX, e.clientY);
}

// Event handlers => 事件句柄
cvs.onmousemove = function (e) {
	var loc = getPosition(e);

	ctx.clearRect(0, 0, cvs.width, cvs.height);
	drawText();

	ctx.save();

	ctx.globalCompositeOperation = selectElement.value;
	ctx.beginPath();
	ctx.arc(loc.x, loc.y, 100, 0, Math.PI * 2, false);
	ctx.fillStyle = 'orange';
	ctx.stroke();
	ctx.fill();

	ctx.restore();
};

// Initializations => 初始化
ctx.lineWidth = .5;
ctx.font = '128pt Comic-sans';
drawText();

/***/ })

/******/ });