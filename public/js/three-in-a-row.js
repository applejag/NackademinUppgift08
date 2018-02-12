
class Grid {
	/**
	 * @param {Number} size 
	 * @param {CanvasRenderingContext2D} context 
	 */
	constructor(size, context) {
		this.size = size;
		this.grid = new Array(size).fill().map(o => new Array(size).fill(0));
		this.turn = 'X';
		this.context = context;
	}
}

