
import Rect from "./rect";
import Game from "./game";
import MathUtil from "./mathutil";

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
	 * @param {Number} x
	 * @param {Number} y
	 */
	static calcBoxRect(game, x, y) {
		return new Rect(
			game.gridRect.x + game.boxWidth * x,
			game.gridRect.y + game.boxHeight * y,
			game.boxWidth,
			game.boxHeight
		);
	}

	/**
	 * @param {Game} game
	 */
	calcBoxRect(game) {
		return Square.calcBoxRect(game, this.x, this.y);
	}

	/**
	 * @param {Game} game
	 */
	draw(game) {
		const rect = this.calcBoxRect(game);
		const c = game.canvasContext;

		if (this.player === ' ' && this.hover) {
			c.strokeStyle = "lightgray";
			this.drawPlayer(game, game.turn, 1);
		}
		else if (this.player !== ' ') {
			if (this.animation < 1)
				this.animation += game.deltaTime;
			
			c.strokeStyle = this.player === 'X' ? 'firebrick' : 'forestgreen';
			this.drawPlayer(game);
		}

		// Draw outline for square
		c.lineWidth = 1;
		c.strokeStyle = 'gray';
		c.beginPath();
		c.moveTo(rect.xMax, rect.y);
		c.lineTo(rect.xMax, rect.yMax);
		c.lineTo(rect.x, rect.yMax);
		c.stroke();
	}

	/**
	 * @param {Game} game
	 * @param {'X'|'O'|' '} player 
	 * @param {Number} t
	 */
	drawPlayer(game, player = this.player, t = this.animation) {
		if (player === 'X')
			Square.drawPlayerX(game, this.x, this.y, t);
		else if (player === 'O')
			Square.drawPlayerO(game, this.x, this.y, t);
	}

	/**
	 * @param {Game} game 
	 * @param {Number} x 
	 * @param {Number} y 
	 * @param {Number} t
	 */
	static drawPlayerX(game, x, y, t) {
		const c = game.canvasContext;
		const rect = Square.calcBoxRect(game, x, y).expand(-12);
		const t1 = t * 2;
		const t2 = t1 - 1;

		c.lineWidth = 3;

		c.beginPath();
		c.moveTo(rect.x,rect.y);
		c.lineTo(MathUtil.lerp(rect.x, rect.xMax,t1), MathUtil.lerp(rect.y, rect.yMax,t1));
		c.stroke();

		c.beginPath();
		c.moveTo(rect.x,rect.yMax);
		c.lineTo(MathUtil.lerp(rect.x, rect.xMax,t2), MathUtil.lerp(rect.yMax, rect.y,t2));
		c.stroke();
	}

	/**
	 * @param {Game} game 
	 * @param {Number} x 
	 * @param {Number} y 
	 * @param {Number} t
	 */
	static drawPlayerO(game, x, y, t) {
		const c = game.canvasContext;
		const rect = Square.calcBoxRect(game, x, y).expand(-12);

		c.lineWidth = 3;
		c.beginPath();
		c.arc(rect.xCenter, rect.yCenter, rect.width * 0.5, 0, Math.PI * 2 * t);
		c.stroke();
	}
}