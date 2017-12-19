function windowToObj(obj, x, y){
	var boundingBox = obj.getBoundingClientRect();

	return {
		x: x - boundingBox.left * (obj.width / boundingBox.width),
		y: y - boundingBox.top * (obj.height / boundingBox.height)
	};
}

export default windowToObj