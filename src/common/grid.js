// 绘制网格
function grid(ctx, color = 'lightgray', stepX = 10, stepY = 10){
	const width = ctx.canvas.width;
	const height = ctx.canvas.height;

	ctx.save();
	ctx.strokeStyle = color;
	ctx.lineWidth = .5;

	// 绘制行
	for(var i = stepY + .5; i < height; i += stepY){
		ctx.beginPath();
		ctx.moveTo(0, i);
		ctx.lineTo(width, i);
		ctx.stroke();
	}

	// 绘制列
	for(var i = stepX + .5; i < width; i += stepX){
		ctx.beginPath();
		ctx.moveTo(i, 0);
		ctx.lineTo(i, height);
		ctx.stroke();
	}
	
	ctx.restore();
}

export default grid