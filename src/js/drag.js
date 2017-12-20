import {$} from '../common/dom.js'
import drawGrid from '../common/grid.js'
import windowToObj from '../common/windowToObj.js'
import ImageData from '../common/imageData.js'
import Polygon from '../common/polygon.js'
import drawGuidewires from '../common/guidewires.js'

// Variable
const cvs = $('#cvs'),
	  ctx = cvs.getContext('2d'),

	  eraseAllButton = $('#eraseAllButton'),
	  strokeStyleSelect = $('#strokeStyleSelect'),
	  startAngleSelect = $('#startAngleSelect'),
	  fillStyleSelect = $('#fillStyleSelect'),
	  fillCheckbox = $('#fillCheckbox'),
	  editCheckbox = $('#editCheckbox'),
	  sidesSelect = $('#sidesSelect');

let imageData = new ImageData(),

	mousedown = {},
	rubberbandRect = {},

	dragging = false,
	draggingOffsetX,
	draggingOffsetY,

	sides = 8,
	startAngle = 0,

	guidewires = true,
	editing = false,
	polygons = [];

// Functions
	// 绘制多边形
	function drawPolygon(polygon){
		ctx.beginPath();
		polygon.createPath(ctx);
		polygon.stroke(ctx);

		if(fillCheckbox.checked) polygon.fill(ctx);
	}

	// 绘制所有多边形
	function drawPolygons(){
		polygons.forEach(polygon => {
			drawPolygon(polygon);
		});
	}

	// 更新橡皮筋矩形
	function updateRubberbandRectangle(loc){
		let offsetX = loc.x - mousedown.x,
			offsetY = loc.y - mousedown.y;

		rubberbandRect.width = Math.abs(offsetX);
		rubberbandRect.height = Math.abs(offsetY);
		rubberbandRect.left = offsetX > 0 ? mousedown.x : loc.x;
		rubberbandRect.top = offsetY > 0 ? mousedown.y : loc.y;
	}

	// 绘制通过橡皮筋拉出来的多边形
	function drawRubberbandShape(loc, sides, startAngle){
		const polygon = new Polygon({
			centerX: mousedown.x,
			centerY: mousedown.y,
			radius: rubberbandRect.width,
			sides: parseInt(sidesSelect.value),
			startAngle: (Math.PI / 180) * parseInt(startAngleSelect.value),
			strokeStyle: ctx.strokeStyle,
			fillStyle: ctx.fillStyle,
			filled: fillCheckbox.checked,
		});

		drawPolygon(polygon);
		if(!dragging) polygons.push(polygon);
	}

	// 更新橡皮筋
	function updateRubberband(loc, sides, startAngle){
		updateRubberbandRectangle(loc);
		drawRubberbandShape(loc, sides, startAngle);
	}

	// 拖动：开始
	function startDragging(loc){
		imageData.saveDrawingSurface(ctx);
		mousedown.x = loc.x;
		mousedown.y = loc.y;
	}

	// 编辑：开始
	function startEditing(){
		cvs.style.cursor = 'pointer';
		editing = true;
	}

	// 编辑：结束
	function stopEditing(){
		cvs.style.cursor = 'crosshair';
		editing = false;
	}

// Event handler
	// 鼠标：按下
	cvs.onmousedown = function(e){
		const loc = windowToObj(cvs, e.clientX, e.clientY);
		
		e.preventDefault();
		if(editing){
			polygons.forEach(polygon => {
				polygon.createPath(ctx);

				if(ctx.isPointInPath(loc.x, loc.y)){
					startDragging(loc);
					dragging = polygon;
					draggingOffsetX = loc.x - polygon.x;
					draggingOffsetY = loc.y - polygon.y;
					return false;
				}
			});
		}else{
			startDragging(loc);
			dragging = true;
		}
	};

	// 鼠标：移动
	cvs.onmousemove = function(e){
		let loc = windowToObj(cvs, e.clientX, e.clientY);

		e.preventDefault();
		if(editing && dragging){
			dragging.x = loc.x - draggingOffsetX;
			dragging.y = loc.y - draggingOffsetY;
			ctx.clearRect(0, 0, cvs.width, cvs.height);
			drawGrid(ctx);
			drawPolygons();
		}else{
			if(dragging){
				imageData.restoreDrawingSurface(ctx);
				updateRubberband(loc, sides, startAngle);

				if(guidewires) drawGuidewires(ctx, mousedown.x, mousedown.y);
			}
		}
	};

	// 鼠标：松开
	cvs.onmouseup = function(e){
		const loc = windowToObj(cvs, e.clientX, e.clientY);

		dragging = false;
		if(!editing){
			imageData.restoreDrawingSurface(ctx);
			updateRubberband(loc, sides, startAngle);
		}
	};

	// 清空画布
	eraseAllButton.onclick = function(){
		ctx.clearRect(0, 0, cvs.width, cvs.height);
		polygons.length = 0;
		drawGrid(ctx);
		imageData.saveDrawingSurface(ctx);
	};

	// 选择描边颜色
	strokeStyleSelect.onchange = function(){
		ctx.strokeStyle = this.value;
	};

	// 选择填充颜色
	fillStyleSelect.onchange = function(){
		ctx.fillStyle = this.value;
	};

	// 切换编辑状态
	editCheckbox.onchange = function(){
		this.checked ? startEditing() : stopEditing();
	};

// Initialization
	cvs.width = 600;
	cvs.height = 600;

	drawGrid(ctx);

	ctx.strokeStyle = strokeStyleSelect.value;
	ctx.fillStyle = fillStyleSelect.value;
