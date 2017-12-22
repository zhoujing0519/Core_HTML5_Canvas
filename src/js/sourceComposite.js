import windowToObj from '../common/windowToObj.js'

// Constant => 常量
	const cvs = document.getElementById('cvs');
	const ctx = cvs.getContext('2d');
	const selectElement = document.getElementById('compositingSelect');

// Functions => 函数
	// 绘制文字
	function drawText(){
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
	function getPosition(e){
		return windowToObj(cvs, e.clientX, e.clientY);
	}

// Event handlers => 事件句柄
	cvs.onmousemove = function(e){
		const loc = getPosition(e);

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