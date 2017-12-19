// SelectorFn
	function $(selector){
		return document.querySelector(selector);
	}

// DOM
	var cvs = $('#cvs');
	var ctx = cvs.getContext('2d');
	var eraseAllButton = $('#eraseAllButton');
	var strokeStyleSelect = $('#strokeStyleSelect');
	var guidewireCheckbox = $('#guidewireCheckbox');
	var drawingSurfaceImageData;
	var mousedown = {};
	var rubberbandRect = {};
	var dragging = false;
	var guidewires = guidewireCheckbox.checked;

// Functions
	// 获取窗口坐标到对象的转换
	function windowToObj(obj, x, y){
		var boundingBox = obj.getBoundingClientRect();

		return {
			x: x - boundingBox.left * (obj.width / boundingBox.width),
			y: y - boundingBox.top * (obj.height / boundingBox.height)
		};
	}

	// 保存绘图表面
	function saveDrawingSurface(){
		drawingSurfaceImageData = ctx.getImageData(0, 0, cvs.width, cvs.height);
	}

	// 恢复绘图表面
	function restoreDrawingSurface(){
		ctx.putImageData(drawingSurfaceImageData, 0, 0);
	}

	// 更新橡皮筋外框
	function updateRubberbandRectangle(loc){
		var offsetX = loc.x - mousedown.x;
		var offsetY = loc.y - mousedown.y;

		rubberbandRect.width = Math.abs(offsetX);
		rubberbandRect.height = Math.abs(offsetY);
		rubberbandRect.left = offsetX > 0 ? mousedown.x : loc.x;
		rubberbandRect.top = offsetY > 0 ? mousedown.y : loc.y;
	}

	// 绘制通过橡皮筋绘制的形状
	function drawRubberbandShape(loc){
		ctx.beginPath();
		ctx.moveTo(mousedown.x, mousedown.y);
		ctx.lineTo(loc.x, loc.y);
		ctx.stroke();
	}

	// 更新橡皮筋
	function updateRubberband(loc){
		updateRubberbandRectangle(loc);
		drawRubberbandShape(loc);
	}

	// 绘制水平线
	function drawHorizontalLine(ctx, y){
		ctx.beginPath();
		ctx.moveTo(0, y + .5);
		ctx.lineTo(ctx.canvas.width, y + .5);
		ctx.stroke();
	}

	// 绘制垂直线
	function drawVerticalLine(ctx, x){
		ctx.beginPath();
		ctx.moveTo(x + .5, 0);
		ctx.lineTo(x + .5, ctx.canvas.height);
		ctx.stroke();
	}

	// 绘制引导线
	function drawGuidewires(ctx, x, y){
		ctx.save();

		ctx.strokeStyle = 'rgba(0, 0, 230, .4)';
		ctx.lineWidth = .5;
		drawHorizontalLine(ctx, y);
		drawVerticalLine(ctx, x);

		ctx.restore();
	}

	// Event
	cvs.onmousedown = function(e){
		var loc = windowToObj(cvs, e.clientX, e.clientY);

		e.preventDefault();
		saveDrawingSurface();
		mousedown.x = loc.x;
		mousedown.y = loc.y;
		dragging = true;
	};

	cvs.onmousemove = function(e){
		var loc;

		if(dragging){
			e.preventDefault();

			loc = windowToObj(cvs, e.clientX, e.clientY);
			restoreDrawingSurface();
			updateRubberband(loc);

			if(guidewires) drawGuidewires(ctx, loc.x, loc.y);
		}
	};

	cvs.onmouseup = function(e){
		loc = windowToObj(cvs, e.clientX, e.clientY);
		restoreDrawingSurface();
		updateRubberband(loc);
		dragging = false;
	};

	eraseAllButton.onclick = function(){
		ctx.clearRect(0, 0, cvs.width, cvs.height);
		saveDrawingSurface();
	};

	strokeStyleSelect.onchange = function(){
		ctx.strokeStyle = this.value;
	};

	guidewireCheckbox.onchange = function(){
		guidewires = this.checked;
	};

	// Initialization
	ctx.strokeStyle = strokeStyleSelect.value;