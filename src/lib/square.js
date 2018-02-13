
import Rect from "./rect";
import Game from "./game";
import "./mathext";
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
		this.hover = false;
	}

	/**
	 * @param {Game} game
	 */
	calcBoxRect(game) {
		return new Rect(
			game.gridRect.x + game.boxWidth * this.x,
			game.gridRect.y + game.boxHeight * this.y,
			game.boxWidth,
			game.boxHeight
		);
	}

	/**
	 * @param {Game} game
	 */
	draw(game) {
		const rect = this.calcBoxRect(game);
		const c = game.canvasContext;

		if (this.player === ' ' && this.hover) {

		}

		c.lineWidth = 1;
		c.strokeStyle = 'gray';
		c.beginPath();
		c.moveTo(rect.xMax, rect.y);
		c.lineTo(rect.xMax, rect.yMax);
		c.lineTo(rect.x, rect.yMax);
		c.stroke();
	}

	/**
	 * @param {'X'|'O'|' '} player 
	 * @param {Game} game
	 * @param {Number} x 
	 * @param {Number} y 
	 * @param {Number} t
	 */
	static drawPlayer(player, game, x, y, t) {
		if (player === 'X')
			Square.drawPlayerX(game, x, y, t);
		else if (player === 'O')
			Square.drawPlayerO(game, x, y, t);
	}

	/**
	 * @param {Game} game 
	 * @param {Number} x 
	 * @param {Number} y 
	 * @param {Number} t
	 */
	static drawPlayerX(game, x, y, t) {
		const c = game.canvasContext;
		game.boxWidth
		Math.lerp(x, game.boxWidth, t * 0.5);
	}

	/**
	 * @param {Game} game 
	 * @param {Number} x 
	 * @param {Number} y 
	 * @param {Number} t
	 */
	static drawPlayerO(game, x, y, t) {

	}
}