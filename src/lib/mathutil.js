
export default class MathUtil {

	static clamp(value, min, max) {
		return Math.min(Math.max(value, min), max);
	}

	static clamp01(value) {
		return Math.min(Math.max(value, 0), 1);
	}

	static lerp(a, b, t) {
		t = MathUtil.clamp01(t);
		return (1 - t) * a + t * b;
	}

	static lerpUnclamped(a, b, t) {
		return (1 - t) * a + t * b;
	}

	// EASING EQUATION http://gizma.com/easing/

	static easeInQuad(a, b, t) {
		return (b - a) * t * t + a;
	}

	static easeOutQuad(a, b, t) {
		return (a - b) * t * (t - 2) + a;
	}

	static easeInOutQuad(a, b, t) {
		t *= 2;
		if (t < 1) return (b - a) * 0.5 * t * t + a;
		t--;
		return (a - b) * 0.5 * (t * (t - 2) - 1) + a;
	}

}