import Point from './point.js'

class Polygon {
	constructor({centerX, centerY, radius, sides, startAngle = 0, strokeStyle, fillStyle, filled}){
		this.x = centerX;
		this.y = centerY;
		this.radius = radius;
		this.sides = sides;
		this.startAngle = startAngle;
		this.strokeStyle = strokeStyle;
		this.fillStyle = fillStyle;
		this.filled = filled;
	}

	// 获取多边形上的顶点
	getPoints(){
		let points = [],
			angle = this.startAngle;

		for(let i = 0, size = this.sides; i < size; ++i){
			points.push(new Point({
				x: this.x + this.radius * Math.sin(angle),
				y: this.y - this.radius * Math.cos(angle)
			}));
		}

		return points;
	}

	// 创建路径
	createPath(ctx){
		const points = this.getPoints(),
			  len = points.length;
		let i = 0;

		ctx.beginPath();
		ctx.moveTo(points[i].x, points[i].y);
		for( ; i < len; ++i){
			ctx.lineTo(points[i].x, points[i].y);
		}
		ctx.closePath();
	}

	// 描边
	stroke(ctx){
		ctx.save();
		this.createPath(ctx);
		ctx.strokeStyle = this.strokeStyle;
		ctx.stroke();
		ctx.restore();
	}

	// 填充
	fill(ctx){
		ctx.save();
		this.createPath(ctx);
		ctx.fillStyle = this.fillStyle;
		ctx.fill();
		ctx.restore();
	}

	// 移动多边形
	move(x, y){
		this.x = x;
		this.y = y;
	}
}