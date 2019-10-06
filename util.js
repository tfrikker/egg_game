// generates random int between min (inclusive) and max (exclusive)
exports.randIntRange = (min, max) => {
	return Math.floor(Math.random() * (max - min)) + min;
}

// multiplies two gaussians {mean: #, sigma: #}
exports.multBell = (bell_a, bell_b) => {
	return {
		mean: (bell_a.mean * bell_b.sigma * bell_b.sigma + bell_b.mean * bell_a.sigma * bell_a.sigma) /
				(bell_a.sigma * bell_a.sigma + bell_b.sigma * bell_b.sigma),
		sigma: (bell_a.sigma * bell_b.sigma) /
				Math.sqrt(bell_a.sigma * bell_a.sigma + bell_b.sigma * bell_b.sigma)
	}
}

// generates random variable from gaussian
exports.randBell = (bell) => {
  let u = Math.random() * 0.682;
  return ((u % 1e-8 > 5e-9 ? 1 : -1) * (Math.sqrt(-Math.log(Math.max(1e-9, u)))-0.618))*1.618 * bell.sigma + bell.mean;
}

// returns gaussian probability density at x. normalized to integrate to 1 by default
exports.sampleBell = (bell, x, normalized = true) => {
	var coeff = 1;
	if (normalized) {
		coeff = 1 / (bell.sigma * Math.sqrt(2 * Math.PI));
	}
	let x_std = (x - bell.mean) / bell.sigma; // x transformed to standard gaussian
	return coeff * Math.exp(-.5 * x_std * x_std);
}

// normalize a list of numbers
exports.norm = (list) => {
	var sum = 0;
	var norm_list = [];
	for (i = 0; i < list.length; i++) {
		sum += elem[i];
		norm_list[i] = elem[i];
	}
	for (elem in norm_list) {
		norm_list[i] /= sum;
	}
}
// returns weighted discrete random variable
exports.randIntWeighted = (weights) => {
	var weights = norm(weights)
	var uniform = Math.random();
	for (i = 0; i < weights.length; i++) {
		if (uniform < weights[i]) {
			return i;
		} else {
			uniform -= weights[i];
		}
	}

	return 0; //unreachable
}

exports.getRandomSubarray = (arr, size) => {
	console.log("server getRandomSubarray: (arr, size) = ");
	console.log(arr);
	console.log(size);
    var shuffled = arr.slice(0), i = arr.length, temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }

    return shuffled.slice(0, size);
}
