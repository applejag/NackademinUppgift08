
Math.clamp = function (value, min, max) {
	return Math.min(Math.max(value, min), max);
}

Math.clamp01 = function (value) {
	return Math.min(Math.max(value, 0), 1);
}

Math.lerp = function (a, b, t) {
	return Math.clamp01((1 - t) * a + t * b);
}

Math.lerpUnclamped = function (a, b, t) {
	return (1 - t) * a + t * b;
}

export default Math;