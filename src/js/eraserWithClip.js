import {$} from '../common/dom.js'
import ImageData from '../common/imageData.js'
import drawGrid from '../common/grid.js'
import drawGuidewires from '../common/guidewires.js'
import windowToObj from '../common/windowToObj.js'
import Rubberband from '../common/rubberband.js'

// Constants => 常量
	const cvs = $('#cvs'),
		ctx = cvs.getContext('2d'),

		strokeStyleSelect = $('#strokeStyleSelect'),
		fillStyleSelect = $('#fillStyleSelect'),
		eraserShapeSelect = $('#eraserShapeSelect'),
		eraserWidthSelect = $('#eraserWidthSelect'),
		drawRadio = $('#drawRadio'),
		eraseRadio = $('#eraseRadio'),

		ERASER_LINE_WIDTH = 1,
		ERASER_STROKE_STYLE = 'rgb(0, 0, 255)',
		ERASER_SHADOW_STYLE = 'blue',
		ERASER_SHADOW_COLOR = 'rgb(0, 0, 0)',
		ERASER_SHADOW_OFFSET = -5,
		ERASER_SHADOW_BLUR = 20,

		GRID_HORIZONTAL_SPACING = 10,
		GRID_VERTICAL_SPACING = 10,
		GRID_LINE_COLOR = 'lightblue',

		drawingSurfaceImageData = new ImageData(),
		mousedown = {},
		rubberband = new Rubberband({
			drawRubberbandShape(ctx, loc, mousedown){
				const angle = Math.atan(this.rubberbandRect.height / this.rubberbandRect.width);
				let radius = this.rubberbandRect.height / Math.sin(angle);

				if(mousedown.y === loc.y) radius = Math.abs(loc.x - mousedown.x);
				ctx.beginPath();
				ctx.arc(mousedown.x, mousedown.y, radius, 0, Math.PI * 2, false);
				ctx.stroke();
				ctx.fill();
			}
		});

// Letters => 变量
	let lastX,
		lastY,
		dragging = false,
		guidewires = true;

// Functions => 函数
	// Eraser => 橡皮擦
		// 为橡皮擦设置绘图路径
		function setDrawPathForEraser(loc){
			const eraserWidth = parseFloat(eraserWidthSelect.value);
			const eraserShape = {
				circle(){
					ctx.arc(loc.x, loc.y, eraserWidth / 2, 0, Math.PI * 2, false);
				},
				square(){
					ctx.rect(loc.x - eraserWidth / 2, loc.y - eraserWidth / 2, eraserWidth, eraserWidth);
				}
			};

			ctx.beginPath();
			eraserShape[eraserShapeSelect.value]();
			ctx.clip();
		}

		// 位橡皮擦设置擦除路径
		function setErasePathForEraser(){
			const eraserWidth = parseFloat(eraserWidthSelect.value);
			const eraserShape = {
				circle(){
					ctx.arc(lastX, lastY, eraserWidth / 2 + ERASER_LINE_WIDTH, 0, Math.PI * 2, false);
				},
				square(){
					ctx.rect(
						lastX - eraserWidth / 2 - ERASER_LINE_WIDTH, 
						lastY - eraserWidth / 2 - ERASER_LINE_WIDTH, 
						eraserWidth + ERASER_LINE_WIDTH * 2, 
						eraserWidth + ERASER_LINE_WIDTH * 2
					);
				}
			};

			ctx.beginPath();
			eraserShape[eraserShapeSelect.value]();
			ctx.clip();
		}

		// 设置橡皮擦属性
		function setEraserAttributes(){
			ctx.lineWidth = ERASER_LINE_WIDTH;
			ctx.shadowColor = ERASER_SHADOW_COLOR;
			ctx.shadowOffsetX = ERASER_SHADOW_OFFSET;
			ctx.shadowOffsetY = ERASER_SHADOW_OFFSET;
			ctx.shadowBlur = ERASER_SHADOW_BLUR;
			ctx.strokeStyle = ERASER_STROKE_STYLE;
		}

		// 擦除后的操作
		function eraseLast(){
			ctx.save();

			setErasePathForEraser();
			drawGrid(ctx, GRID_LINE_COLOR, GRID_HORIZONTAL_SPACING, GRID_VERTICAL_SPACING);

			ctx.restore();
		}

		// 绘制橡皮擦
		function drawEraser(loc){
			ctx.save();

			setEraserAttributes();
			setDrawPathForEraser(loc);
			ctx.stroke();

			ctx.restore();
		}

	// 获取canvas中相对位置
		function getPosition(e){
			return windowToObj(cvs, e.clientX, e.clientY);
		}

// Event handler => 事件句柄
	// Canvas事件句柄
		// 鼠标：按下
		cvs.onmousedown = function(e){
			const loc = getPosition(e);

			e.preventDefault();
			if(drawRadio.checked) drawingSurfaceImageData.saveDrawingSurface(ctx);

			mousedown.x = loc.x;
			mousedown.y = loc.y;

			lastX = loc.x;
			lastY = loc.y;

			dragging = true;
		};

		// 鼠标：移动
		cvs.onmousemove = function(e){
			let loc;

			if(dragging){
				e.preventDefault();

				loc = getPosition(e);
				if(drawRadio.checked){
					drawingSurfaceImageData.restoreDrawingSurface(ctx);
					rubberband.updateRubberband(ctx, loc, mousedown);
					if(guidewires) drawGuidewires(ctx, loc.x, loc.y);
				}else{
					eraseLast();
					drawEraser(loc);
				}

				lastX = loc.x;
				lastY = loc.y;
			}
		};

		// 鼠标：松开
		cvs.onmouseup = function(e){
			const loc = getPosition(e);

			if(drawRadio.checked){
				drawingSurfaceImageData.restoreDrawingSurface(ctx);
				rubberband.updateRubberband(ctx, loc, mousedown);
			}
			if(eraseRadio.checked) eraseLast();

			dragging = false;
		};

	// 控制器事件
		// 描边颜色切换
		strokeStyleSelect.onchange = function(e){
			ctx.strokeStyle = this.value;
		};

		// 填充颜色切换
		fillStyleSelect.onchange = function(e){
			ctx.fillStyle = this.value;
		};

// Initializations => 初始化
	
	ctx.strokeStyle = strokeStyleSelect.value;
	ctx.fillStyle = fillStyleSelect.value;

	drawGrid(ctx, GRID_LINE_COLOR, GRID_HORIZONTAL_SPACING, GRID_VERTICAL_SPACING);