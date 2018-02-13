
class Grid {
	/**
	 * @param {Number} size 
	 * @param {HTMLCanvasElement} canvas
	 */
	constructor(size, canvas) {
		this.size = size;
		this.grid = Grid.generateGrid(size);
		this.turn = 'X';
		this.canvas = canvas;
		this.context = canvas.getContext('2d');

		setInterval(this.draw.bind(this), 1000 / 30);
	}

	get width() {
		return this.canvas.width;
	}
	get height() {
		return this.canvas.height;
	}

	/**
	 * @param {Number} size 
	 * @returns {Square[][]}
	 */
	static generateGrid(size) {
		const grid = [];
		
		for (let x = 0; x < size; x++) {
			grid.push([]);
			for (let y = 0; y < size; y++) {
				grid[x].push(new Square(x,y));
			}
		}

		return grid;
	}

	draw() {
		this.context.fillStyle = 'white';
		this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
		this.drawGrid();
	}

	drawGrid() {
		for (let x = 0; x < this.size; x++) {
			for (let y = 0; y < this.size; y++) {
				this.grid[x][y].draw(this);
			}
		}
	}
}

class Square {

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

		grid.context.strokeStyle = 'gray';
		grid.context.beginPath();
		grid.context.moveTo(left + boxSize, top);
		grid.context.lineTo(left + boxSize, top + boxSize);
		grid.context.lineTo(left, top + boxSize);
		grid.context.stroke();
	}
}