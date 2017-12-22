export default {
	on(ctx, color, offsetX, offsetY, blur){
		ctx.shadowColor = color;
		ctx.shadowOffsetX = offsetX;
		ctx.shadowOffsetY = offsetY;
		ctx.shadowBlur = blur;
	},
	off(ctx){
		ctx.shadowColor = undefined;
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 0;
		ctx.shadowBlur = 0;
	}
}