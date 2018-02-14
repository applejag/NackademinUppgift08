
export default class Rect {
	constructor(x,y,width,height) {
		this.x = x | 0;
		this.y = y | 0;
		this.width = width | 0;
		this.height = height | 0;
	}

	get xMax() {
		return this.x + this.width;
	}

	get yMax() {
		return this.y + this.height;
	}

	get xCenter() {
		return this.x + this.width * 0.5;
	}

	get yCenter() {
		return this.y + this.height * 0.5;
	}

	/**
	 * @param {Number} x 
	 * @param {Number} y 
	 * @returns {Boolean}
	 */
	inside(x, y) {
		return x >= this.x && x <= this.xMax
			&& y >= this.y && y <= this.yMax;
	}
}