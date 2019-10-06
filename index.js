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

function sumValue(buyer, deal) {
	var totalValue = 0;
	console.log("server sumValue: deal: " + deal);
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
		var deal = Util.getRandomSubarray(inventory, Util.randIntRange(1, inventory.length));
		console.log("server generateTrade: deal:");
		console.log(deal);
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
	for (var i = 0; i < dealValue; i += 10) {
 		stuffToSell.push(buyer.inventory[Util.randIntRange(0,buyer.inventory.length)]);
	}

	return {
		"itemsSelling": stuffToSell,
		"itemsBuying": deal
	}
}

app.post('/newTrade', function(request, response) {
	console.log("server newTrade called");
	var inventory = JSON.parse(request.body.inventory);
	console.log("server newTrade: inventory: " + inventory);
	console.log("server newTrade: inventory size: " + inventory.length);
	if (inventory.length == 0) {
		console.log("server newTrade: empty inventory case");
		console.log(Data.getItem("egg"));
		console.log(Data.getBuyer("marty"));
		response.send({
			"buyer": Data.getBuyer("marty"),
			"trade": {
				"itemsSelling": [Data.getItem("egg")],
				"itemsBuying": []
			}
		});
	} else {
		console.log("server newTrade: normal inventory case");
		var buyer = Data.generateRandomBuyer();
		var trade = generateTrade(buyer, inventory);
		response.send({
			"buyer": buyer,
			"trade": trade
		});
	}
});

app.listen(process.env.PORT || 5000);
