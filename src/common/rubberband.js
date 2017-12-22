export default class Rubberband {
	constructor({drawRubberbandShape}){
		this.rubberbandRect = {};
		this.drawRubberbandShape = drawRubberbandShape;
	}

	updateRubberbandRectangle(loc, mousedown){
		this.rubberbandRect.width = Math.abs(loc.x - mousedown.x);
		this.rubberbandRect.height = Math.abs(loc.y - mousedown.y);
		this.rubberbandRect.left = Math.min(loc.x, mousedown.x);
		this.rubberbandRect.top = Math.min(loc.y, mousedown.y);
	}

	updateRubberband(ctx, loc, mousedown){
		this.updateRubberbandRectangle(loc, mousedown);
		this.drawRubberbandShape(ctx, loc, mousedown);
	}
}