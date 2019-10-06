// generates random int between min (inclusive) and max (exclusive)
exports.randIntRange = (min, max) => {
	return Math.floor(Math.random() * (max - min)) + min;
}
