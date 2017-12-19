const DEFAULT = {
	strokeStyle: 'rgba(0, 0, 230, .4)',
	lineWidth: .5,
};

// 绘制引导线
function guidewires(ctx, x, y, strokeStyle = DEFAULT.strokeStyle, lineWidth = DEFAULT.lineWidth){
	drawGuidewires(ctx, x, y, strokeStyle, lineWidth);
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
function drawGuidewires(ctx, x, y, strokeStyle, lineWidth){
	ctx.save();

	ctx.strokeStyle = strokeStyle;
	ctx.lineWidth = lineWidth;
	drawHorizontalLine(ctx, y);
	drawVerticalLine(ctx, x);

	ctx.restore();
}

export default guidewires
