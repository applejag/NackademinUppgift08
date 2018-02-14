import React, { Component } from "react";
import Square from "./square";
import Rect from "./rect";
import Winner from "./winner";

export default class Game extends Component {

	constructor(props) {
		super(props);

		this.grid = Game.generateGrid(this.columns, this.rows);
		this.turn = 'X';
		this.mouseX = 0;
		this.mouseY = 0;
		this.mouseClick = false;
		this.deltaTime = 0;
		this.lastUpdate = Date.now();
		/** @type {Winner} */
		this.winner = null;

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

	/** @returns {Number} */
	get rows() { return this.props.rows || 10; }

	/** @returns {Number} */
	get boxWidth() { return this.height * 0.9 / this.columns; }
	/** @returns {Number} */
	get boxHeight() { return this.height * 0.9 / this.rows; }

	/** @returns {Number} */
	get gridWidth() { return this.columns * this.boxWidth; }
	/** @returns {Number} */
	get gridHeight() { return this.rows * this.boxHeight; }

	/** @returns {Number} */
	get width() { return this.props.width || 640; }

	/** @returns {Number} */
	get height() { return this.props.height || 480; }
	
	/** @returns {Number} */
	get winStreak() { return this.props.winStreak || 5;}

	/** @returns {Boolean} */
	get gameOver() { return !!this.winner; }

	/**
	 * @param {Number} columns
	 * @param {Number} rows
	 * @returns {Square[][]}
	 */
	static generateGrid(columns, rows) {
		const grid = [];

		for (let x = 0; x < columns; x++) {
			grid.push([]);
			for (let y = 0; y < rows; y++) {
				grid[x].push(new Square(x, y));
			}
		}

		return grid;
	}

	/**
	 * @param {MouseEvent} event 
	 */
	eventMousePosition(event) {
		({x:this.mouseX,y:this.mouseY} = this.getMousePosition(event));
	}

	/**
	 * @param {MouseEvent} event 
	 */
	eventMouseClick(event) {
		this.mouseClick = true;
	}

	eventRestartClick(event) {
		this.grid = Game.generateGrid(this.columns, this.rows);
		this.winner = null;
		this.turn = 'X';
	}

	/**
	 * @param {MouseEvent} event 
	 * @returns {{x:Number,y:Number}}
	 */
	getMousePosition(event) {
		var rect = this.canvas.getBoundingClientRect();
		return {
			x: event.clientX - rect.left,
			y: event.clientY - rect.top,
		};
	}
	
	/**
	 * @param {Square} square 
	 */
	squareClicked(square) {
		if (square.player !== ' ') return;

		square.player = this.turn;
		square.animation = 0;
		this.turn = this.turn === 'X' ? 'O' : 'X';

		// Check for win
		const gameWins = Winner.getWinLines(this.grid, square, this.winStreak);

		if (gameWins.length > 0) {
			this.winner = new Winner(gameWins);
			console.log(`${square.player} is the winner!`);
		}
		else if (this.countEmptySquares() === 0) {
			this.winner = new Winner([]);
			console.log("No winner! Game ends in a draw");
		}
	}

	countEmptySquares() {
		return this.grid.reduce((total1,row) => total1 +
			row.reduce((total2,square) => total2 + (square.player === ' ' ? 1 : 0), 0)
		, 0);
	}

	/**
	 * @param {Number} x X index of square
	 * @param {Number} y Y index of square
	 * @param {Boolean} centered Position relative to `true`:center, `false`:top-left. Default: `false`
	 * @returns {{x:Number,y:Number}} Position of the square in canvas space.
	 */
	transformSquareToGlobal(x, y, centered = false) {
		return {
			x: this.gridRect.x + this.boxWidth * (centered ? x + 0.5 : x),
			y: this.gridRect.y + this.boxHeight * (centered ? y + 0.5 : y),
		}
	}

	update() {
		const gx = (this.width - this.gridWidth) * 0.5;
		const gy = (this.height - this.gridHeight) * 0.5;
		this.gridRect = new Rect(gx, gy, this.gridWidth, this.gridHeight);

		let now = Date.now();
		this.deltaTime = (now - this.lastUpdate) * 0.001;
		
		this.draw();
		
		this.mouseClick = false;
		this.lastUpdate = now;
	}

	draw() {
		const c = this.canvasContext;
		c.fillStyle = 'white';
		c.fillRect(0, 0, this.canvas.width, this.canvas.height);

		this.drawSquares();

		if (this.winner)
			this.winner.draw(this);

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
			for (let y = 0; y < this.rows; y++) {
				const square = this.grid[x][y];

				if (!this.gameOver && hoverX === x && hoverY === y) {
					square.hover = true;
					if (this.mouseClick)
						this.squareClicked(square);
				} else
					square.hover = false;

				square.draw(this);
			}
		}
	}

	render() {
		return (
			<div>
				<canvas width={this.width} height={this.height} id='canvas' onClick={this.eventMouseClick.bind(this)}>
					Get chrome!
				</canvas>
				<button className="btn btn-primary centered" type="button" onClick={this.eventRestartClick.bind(this)}>Restart</button>
			</div>
		);
	}
}
