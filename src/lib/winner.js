import Square from "./square";
import Game from "./game";
import MathUtil from "./mathutil";

export default class Winner {
    
    /**
     * @param {{x1:Number,y1:Number,x2:Number,y2:Number}[]} winLines 
     */
    constructor(winLines) {
        this.winLines = winLines;
        this.animation = 0;
    }

    /**
     * @param {Game} game 
     */
    draw(game) {
        game.canvasContext.strokeStyle = "rgba(34,139,34,0.5)";
        game.canvasContext.fillStyle = "rgba(34,139,34,0.5)";
        
        for (let line of this.winLines) {
            const t = MathUtil.easeInOutQuad(0, 1, MathUtil.clamp01(this.animation));
            this.drawLine(game, line, t);
        }

        if (this.animation < 1)
            this.animation += game.deltaTime;
    }

    /**
     * @param {Game} game 
     * @param {{x1:Number,y1:Number,x2:Number,y2:Number}} line
     */
    drawLine(game, line, t) {
        const {x:x1, y:y1} = game.transformSquareToGlobal(line.x1, line.y1, true);
        const {x:rx2, y:ry2} = game.transformSquareToGlobal(line.x2, line.y2, true);

        const c = game.canvasContext;
        const x2 = MathUtil.lerp(x1, rx2, t);
        const y2 = MathUtil.lerp(y1, ry2, t);

        c.lineWidth = 5;
        c.beginPath();
        c.moveTo(x1, y1);
        c.lineTo(x2, y2);
        c.stroke();
        
        if (t >= 0) {
            c.beginPath();
            c.arc(x1,y1, 6, 0, Math.PI * 2);
            c.fill();
        }
        
        if (t >= 1) {
            c.beginPath();
            c.arc(x2,y2, 6, 0, Math.PI * 2);
            c.fill();
        }
    }

	/**
	 * @param {Square[][]} grid Playing field
	 * @param {Square} from Starting square
	 * @param {Number} dx Direction x-axis
	 * @param {Number} dy Direction y-axis
	 * @returns {{dist:Number,x:Number,y:Number}} The furthest point with all same marks up until
	 */
	static checkSquareStreak(grid, from, dx, dy) {
		let lastDist = 0;
		let lastTo = null;

		for (let dist = 1; dist <= 4; dist++) {
			const x = from.x + dx * dist;
			const y = from.y + dy * dist;
			const to = grid[x] && grid[x][y];

			if (!to) break;
			if (to.player !== from.player) break;
            
			lastDist = dist;
			lastTo = to;
		}

		return {
			dist: lastTo ? lastDist : 0,
			x: (lastTo || from).x,
			y: (lastTo || from).y
		};
	}

	/**
	 * @param {Square[][]} grid Playing field
	 * @param {Square} from Originated Square
	 * @param {Number} dx Direction x-axis
	 * @param {Number} dy Direction y-axis
	 * @param {Number} winStreak The number of same mark in a row to count as win
	 * @returns {{x1:Number,y1:Number,x2:Number,y2:Number}}
	 */
	static getWinLine(grid, from, dx, dy, winStreak) {
		const a = Winner.checkSquareStreak(grid, from, -dx, -dy);
        const b = Winner.checkSquareStreak(grid, from, dx, dy);

		if (a.dist + b.dist + 1 >= winStreak)
			return {
				x1: a.x,
				y1: a.y,
				x2: b.x,
				y2: b.y
			};
	}

	/**
	 * @param {Square[][]} grid Playing field
	 * @param {Square} from Originated Square
	 * @param {Number} winStreak The number of same mark in a row to count as win
	 * @returns {{x1:Number,y1:Number,x2:Number,y2:Number}[]}
	 */
	static getWinLines(grid, from, winStreak) {
		return [
            Winner.getWinLine(grid, from, 1, 0, winStreak),
		    Winner.getWinLine(grid, from, 0, 1, winStreak),
		    Winner.getWinLine(grid, from, 1, 1, winStreak),
            Winner.getWinLine(grid, from, 1, -1, winStreak),
        ].filter(o => o);
	}
}
