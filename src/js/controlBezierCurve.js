import {$} from '../common/dom.js'
import ImageData from '../common/imageData.js'
import drawGrid from '../common/grid.js'
import windowToObj from '../common/windowToObj.js'
import drawGuidewires from '../common/guidewires.js'

// Constant => 常量
	const canvas = $('#canvas'),
		context = canvas.getContext('2d'),

		eraseAllButton = $('#eraseAllButton'),
		strokeColorSelect = $('#strokeColorSelect'),
		guidewireCheckbox = $('#guidewireCheckbox'),
		instructions = $('#instructions'),
		instructionsOkayButton = $('#instructionsOkayButton'),
		instructionsNoMoreButton = $('#instructionsNoMoreButton'),

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
	let showInstructions = true,
		drawingImageData = new ImageData(),
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
	function getLocation(e){
		return windowToObj(canvas, e.clientX, e.clientY);
	}

	// Rubberband => 橡皮筋
		// 更新橡皮筋框的属性
		function updateRubberbandRectangle(loc){
			rubberbandRect.width = Math.abs(loc.x - mousedown.x);
			rubberbandRect.height = Math.abs(loc.y - mousedown.y);
			rubberbandRect.left = Math.min(loc.x, mousedown.x);
			rubberbandRect.top = Math.min(loc.y, mousedown.y);
		}

		// 绘制贝塞尔曲线
		function drawBezierCurve(){
			context.beginPath();
			context.moveTo(endPoints[0].x, endPoints[0].y);
			context.bezierCurveTo(
				controlPoints[0].x, controlPoints[0].y,
				controlPoints[1].x, controlPoints[1].y,
				endPoints[1].x, endPoints[1].y
			);
			context.stroke();
		}

		// 更新锚点与控制点
		function updateEndAndControlPoints(){
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
		function drawRubberbandShape(){
			updateEndAndControlPoints();
			drawBezierCurve();
		}

		// 更新橡皮筋并绘制形状
		function updateRubberband(loc){
			updateRubberbandRectangle(loc);
			drawRubberbandShape();
		}

	// Points => 控制点与锚点
		// 绘制点
		function drawPoint(point){
			context.beginPath();
			context.arc(
				point.x, point.y, POINT_RADIUS,
				0, ANGLE_MAX, false
			);
			context.stroke();
			context.fill();
		}

		// 绘制各种类型的点
		function drawPoints({points, strokeStyle, fillStyle}){
			context.save();

			context.strokeStyle = strokeStyle;
			context.fillStyle = fillStyle;
			points.forEach(point => {
				drawPoint(point);
			});

			context.restore();
		}

		// 绘制控制点与锚点
		function drawControlAndEndPoints(){
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
		function cursorInPoint(loc, points){
			let ret;

			points.forEach(point => {
				context.beginPath();
				context.arc(point.x, point.y, POINT_RADIUS, 0, ANGLE_MAX, false);

				if(context.isPointInPath(loc.x, loc.y)){
					ret = point;
					return false;
				}
			});

			return ret;
		}

		// 更新拖动点的位置
		function updateDraggingPoint(loc){
			draggingPoint.x = loc.x;
			draggingPoint.y = loc.y;
		}

// Event Handlers => 事件绑定
	// Canvas => 画布
		// 鼠标：按下
		canvas.onmousedown = function(e){
			const loc = getLocation(e);

			e.preventDefault();
			if(!editing){ // 非编辑状态
				drawingImageData.saveDrawingSurface(context);
				mousedown.x = loc.x;
				mousedown.y = loc.y;
				updateRubberbandRectangle(loc);
				dragging = true;
			}else{ // 编辑状态，获取对应的操作点
				draggingPoint = cursorInPoint(loc, controlPoints) || cursorInPoint(loc, endPoints);
			}
		};

		// 鼠标：移动
		canvas.onmousemove = function(e){
			const loc = getLocation(e);

			if(dragging || draggingPoint){
				e.preventDefault();
				drawingImageData.restoreDrawingSurface(context);
				if(guidewires) drawGuidewires(context, loc.x, loc.y);
			}

			if(dragging){
				updateRubberband(loc);
				drawControlAndEndPoints();
			}else if(draggingPoint){
				updateDraggingPoint(loc);
				drawControlAndEndPoints();
				drawBezierCurve();
			}
		};

		// 鼠标：松开
		canvas.onmouseup = function(e){
			const loc = getLocation(e);

			drawingImageData.restoreDrawingSurface(context);
			if(!editing){ // 默认：非编辑状态
				updateRubberband(loc);
				drawControlAndEndPoints();
				dragging = false;
				editing = true; // 使其可以编辑
				if(showInstructions) instructions.style.display = 'inline';
			}else{ // 编辑状态
				draggingPoint ? drawControlAndEndPoints() : editing = false;
				drawBezierCurve();
				draggingPoint = undefined;
			}
		};

	// Controls => 控制器
		// 清空所有，还原所有状态
		eraseAllButton.onclick = function(){
			context.clearRect(0, 0, canvas.width, canvas.height);
			drawGrid(context, GRID_STROKE_STYLE, GRID_SPACING, GRID_SPACING);
			drawingImageData.saveDrawingSurface(context);
			
			editing = false;
			dragging = false;
			draggingPoint = undefined;
		};

		// 选择描边颜色
		strokeColorSelect.onchange = function(){
			context.strokeStyle = this.value;
		};

		// 是否显示辅助线
		guidewireCheckbox.onchange = function(){
			guidewires = this.checked;
		};

	// Instructions => 操作指南
		// 确定
		instructionsOkayButton.onclick = function(){
			instructions.style.display = 'none';
		};

		// 忽略
		instructionsNoMoreButton.onclick = function(){
			instructions.style.display = 'none';
			showInstructions = false;
		};

// Initializations => 初始化
	context.strokeStyle = strokeColorSelect.value;
	drawGrid(context, GRID_STROKE_STYLE, GRID_SPACING, GRID_SPACING);