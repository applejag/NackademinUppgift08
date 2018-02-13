import React, {Component} from "react";
import Square from "./square";

export default class Grid extends Component {

	constructor(props) {
		super(props);

		this.grid = Grid.generateGrid(this.size);
		this.turn = 'X';

		setInterval(this.draw.bind(this), 1000 / 30);
	}

	/** @returns {HTMLCanvasElement} */
	get canvas() {
		return document.getElementById('canvas');
	}

	/** @returns {CanvasRenderingContext2D} */
	get canvasContext() {
		return this.canvas.getContext('2d');
	}

	/** @returns {Number} */
	get size() {
		return this.props.size || 10;
	}

	/** @returns {Number} */
	get width() {
		return this.props.width || 640;
	}

	/** @returns {Number} */
	get height() {
		return this.props.height || 480;
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
		const c = this.canvasContext;
		c.fillStyle = 'white';
		c.fillRect(0, 0, this.canvas.width, this.canvas.height);
		this.drawGrid();
	}

	drawGrid() {
		for (let x = 0; x < this.size; x++) {
			for (let y = 0; y < this.size; y++) {
				this.grid[x][y].draw(this);
			}
		}
	}

	render() {
		return <canvas width={this.width} height={this.height} id='canvas'>Get chrome!</canvas>
	}
}
