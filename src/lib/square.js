
import Rect from "./rect";
// import Game from "./three-in-a-row";

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

		c.lineWidth = 1;
		c.strokeStyle = 'gray';
		c.beginPath();
		c.moveTo(rect.xMax, rect.y);
		c.lineTo(rect.xMax, rect.yMax);
		c.lineTo(rect.x, rect.yMax);
		c.stroke();
	}
}