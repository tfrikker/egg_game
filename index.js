var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const Data = require('./data.js');
const Util = require('./util.js');

//http://stackoverflow.com/questions/11001817/allow-cors-rest-request-to-a-express-node-js-application-on-heroku
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,POST');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
	next();
});
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(request, response) {
	response.sendFile(__dirname + '/public/index.html');
});

// Probability Tools:

// multiplies two gaussians {mean: #, sigma: #}
function multBell(bell_a, bell_b) {
	return {
		mean: (bell_a.mean*bell_b.sigma*bell_b.sigma + bell_b.mean*bell_a.sigma*bell_a.sigma) /
					(bell_a.sigma*bell_a.sigma + bell_b.sigma*bell_b.sigma),
		sigma: (bell_a.sigma*bell_b.sigma) /
					 Math.sqrt(bell_a.sigma*bell_a.sigma + bell_b.sigma*bell_b.sigma)
	}
}
// generates random variable from gaussian
function randBell(bell) {
  let u = Math.random()*0.682;
  return ((u % 1e-8 > 5e-9 ? 1 : -1) * (Math.sqrt(-Math.log(Math.max(1e-9, u)))-0.618))*1.618 * bell.sigma + bell.mean;
}
// returns gaussian probability density at x. normalized to integrate to 1 by default
function sampleBell(bell,x,normalized=true){
	var coeff = 1;
	if(normalized){
		coeff = 1/(bell.sigma*Math.sqrt(2*Math.PI));
	}
	let x_std = (x-bell.mean)/bell.sigma; // x transformed to standard gaussian
	return coeff*Math.exp(-.5*x_std*x_std);
}

// normalize a list of numbers
function norm(list) {
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
function randIntWeighted(weights) {
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

function getRandomSubarray(arr, size) {
    var shuffled = arr.slice(0), i = arr.length, temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
}

function sumValue(buyer, deal) {
	var totalValue = 0;
	deal.forEach(function (item) {
		if (item.type in buyer.typePrefs) {
			totalValue += buyer.typePrefs[item.type];
		} else {
			totalValue += 10;
		}
	});

	return totalValue;
}

function generateTrade(buyer, inventory) {
	//var dealSize = {
	//	mean: buyer.dealSize,
	//	sigma: 20
	//}
	//var profit = { //TODO currently not used - refine later?
	//	mean: 0,
	//	sigma: 1 / buyer.saviness
	//}

	var dealValue;
	var deal;
	var dealSizeFudge = 0;
	for (var i = 0;; i++) {
		//get a random subset of inventory items from user
		var deal = getRandomSubarray(inventory, Util.randIntRange(1, inventory.length));
		//calculate its value to this buyer
		dealValue = sumValue(buyer, deal);
		//if in the buyer's ideal fudge range, great!
		if (dealValue > buyer.dealSize - dealSizeFudge && dealValue < buyer.dealSize + dealSizeFudge) {
			break;
		}
		//if not, expand what the buyer is willing to accept if we keep failing to find a match
		if (i % 5 == 0) {
			dealSizeFudge++;
		}
	}

	//TODO: built up based on value of deal and keyItemsToTrade
	var stuffToSell = [];
	for (var i = 0; i<dealValue; i+=10) {
 		stuffToSell.push(buyer.inventory[Util.randIntRange(0,buyer.inventory.length)]);
	}

	return {
		"itemsSelling": stuffToSell,
		"itemsBuying": deal
	}
}

app.get('/newTrade', function(request, response) {
	var inventory = request.body.inventory;
	var inventory = Data.items; //TODO: only for testing
	var buyer = Data.generateRandomBuyer();
	var trade = generateTrade(buyer, inventory);
	response.send({
		"buyer": buyer,
		"trade": trade
	});
});

app.listen(process.env.PORT || 5000);
