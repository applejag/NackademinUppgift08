
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

}