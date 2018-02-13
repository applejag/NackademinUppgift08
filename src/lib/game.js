import React, { Component } from "react";
import Square from "./square";
import Rect from "./rect";

export default class Game extends Component {

	constructor(props) {
		super(props);

		this.grid = Game.generateGrid(this.columns);
		this.turn = 'X';
		this.mouseX = 0;
		this.mouseY = 0;

		setInterval(this.update.bind(this), 1000 / 30);
		window.addEventListener('mousemove', this.eventMousePosition.bind(this), false);
	}

	/** @returns {HTMLCanvasElement} */
	get canvas() {
		if (this.__canvas) return this.__canvas;
		return this.__canvas = document.getElementById('canvas');
	}

	/** @returns {CanvasRenderingContext2D} */
	get canvasContext() {
		if (this.__canvasContext) return this.__canvasContext;
		return this.__canvasContext = this.canvas.getContext('2d');
	}

	/** @returns {Number} */
	get columns() { return this.props.columns || 10; }
	set columns(value) { this.props.columns = value; }

	/** @returns {Number} */
	get boxWidth() { return this.height * 0.9 / this.columns; }
	/** @returns {Number} */
	get boxHeight() { return this.height * 0.9 / this.columns; }

	/** @returns {Number} */
	get gridWidth() { return this.columns * this.boxWidth; }
	/** @returns {Number} */
	get gridHeight() { return this.columns * this.boxHeight; }

	/** @returns {Number} */
	get width() { return this.props.width || 640; }
	set width(value) { this.props.width = value; }

	/** @returns {Number} */
	get height() { return this.props.height || 480; }
	set height(value) { this.props.height = value; }

	/**
	 * @param {Number} size 
	 * @returns {Square[][]}
	 */
	static generateGrid(size) {
		const grid = [];

		for (let x = 0; x < size; x++) {
			grid.push([]);
			for (let y = 0; y < size; y++) {
				grid[x].push(new Square(x, y));
			}
		}

		return grid;
	}

	/**
	 * @param {MouseEvent} event 
	 */
	eventMousePosition(event) {
		var rect = this.canvas.getBoundingClientRect();
		this.mouseX = event.clientX - rect.left;
		this.mouseY = event.clientY - rect.top;
	}

	update() {
		const gx = (this.width - this.gridWidth) * 0.5;
		const gy = (this.height - this.gridHeight) * 0.5;
		this.gridRect = new Rect(gx, gy, this.gridWidth, this.gridHeight);

		this.draw();
	}

	draw() {
		const c = this.canvasContext;
		c.fillStyle = 'white';
		c.fillRect(0, 0, this.canvas.width, this.canvas.height);

		this.drawSquares();

		const rect = this.gridRect;
		c.strokeStyle = 'black';
		c.lineWidth = 2;
		c.beginPath();
		c.moveTo(rect.x, rect.y);
		c.lineTo(rect.xMax, rect.y);
		c.lineTo(rect.xMax, rect.yMax);
		c.lineTo(rect.x, rect.yMax);
		c.closePath();
		c.stroke();
	}

	drawSquares() {
		const hoverX = Math.floor((this.mouseX - this.gridRect.x) / this.boxWidth);
		const hoverY = Math.floor((this.mouseY - this.gridRect.y) / this.boxHeight);

		for (let x = 0; x < this.columns; x++) {
			for (let y = 0; y < this.columns; y++) {
				this.grid[x][y].hover = hoverX === x && hoverY === y;
				this.grid[x][y].draw(this);
			}
		}
	}

	render() {
		return <canvas width={this.width} height={this.height} id='canvas'>Get chrome!</canvas>
	}
}
