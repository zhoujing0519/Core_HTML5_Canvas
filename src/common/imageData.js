export default class ImageData {
	constructor(){
		this.drawingSurfaceImageData = null;
	}

	saveDrawingSurface(ctx){
		this.drawingSurfaceImageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
	}

	restoreDrawingSurface(ctx){
		ctx.putImageData(this.drawingSurfaceImageData, 0, 0);
	}
}