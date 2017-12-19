import grid from '../common/grid.js'

const cvs = document.getElementById('cvs'),
	ctx = cvs.getContext('2d'),
	endPoints = [
		{ x: 130, y: 70 },
		{ x: 430, y: 270 }
	],
	controlPoints = [
		{ x: 130, y: 250 },
		{ x: 450, y: 70 }
	];

// Functions
	// 绘制贝塞尔曲线
	function drawBezierCurve(){
		ctx.strokeStyle = 'blue';

		ctx.beginPath();
		ctx.moveTo(endPoints[0].x, endPoints[0].y);
		ctx.bezierCurveTo(
			controlPoints[0].x, controlPoints[0].y,
			controlPoints[1].x, controlPoints[1].y,
			endPoints[1].x, endPoints[1].y
		);
		ctx.stroke();
	}

	// 绘制锚点
	function drawEndPoints(){
		ctx.strokeStyle = 'blue';
		ctx.fillStyle = 'red';

		endPoints.forEach(drawPoint);
	}

	// 绘制控制点
	function drawControlPoints(){
		ctx.strokeStyle = 'yellow';
		ctx.fillStyle = 'blue';

		controlPoints.forEach(drawPoint);
	}

	// 绘制点
	function drawPoint(point){
		ctx.beginPath();
		ctx.arc(point.x, point.y, 5, 0, Math.PI * 2, false);
		ctx.stroke;
		ctx.fill();
	}

// Initialization
	cvs.width = 600;
	cvs.height = 600;

	grid(ctx);

	drawBezierCurve();
	drawControlPoints();
	drawEndPoints();