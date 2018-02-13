
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
}