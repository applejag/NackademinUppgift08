
export default class Square {
	/**
	 * @param {Number} x 
	 * @param {Number} y 
	 */
	constructor(x, y) {
		this.player = ' ';
		this.x = x;
		this.y = y;
		this.animation = 0;
	}

	/**
	 * @param {Grid} grid
	 */
	draw(grid, rect) {
		const boxSize = grid.height / grid.size;
		const left0 = (grid.width - grid.size * boxSize) * 0.5;
		const left = left0 + boxSize * this.x;
		const top = boxSize * this.y;
		const c = grid.canvasContext;

		c.strokeStyle = 'gray';
		c.beginPath();
		c.moveTo(left + boxSize, top);
		c.lineTo(left + boxSize, top + boxSize);
		c.lineTo(left, top + boxSize);
		c.stroke();
	}
}