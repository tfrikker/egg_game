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
	deal.forEach(function (item) {
		var found = false;
		item.tags.forEach(function (type) {
			if (type in buyer.typePrefs && !found) {
				totalValue += buyer.typePrefs[type];
				found = true;
			}
		});
		if (!found) {
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
		var deal = Util.getRandomSubarray(inventory, 3);
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
	while (true) {
		if (sumValue(buyer, stuffToSell) >= dealValue || stuffToSell.length > 3) {
			break;
		}
		//don't allow duplicates
		var item = buyer.inventory[Util.randIntRange(0, buyer.inventory.length)];
		var fine = false;
		while (!fine) {
			fine = false;
			for (var i = 0; i < deal.length; i++) {
				if (deal[i].id == item.id) {
					item = buyer.inventory[Util.randIntRange(0, buyer.inventory.length)];
				} else {
					fine = true;
					break;
				}
			}
		}
 		stuffToSell.push(item);
	}

	return {
		"itemsSelling": stuffToSell,
		"itemsBuying": deal
	}
}

app.post('/newTrade', function(request, response) {
	var inventory = JSON.parse(request.body.inventory);
	if (inventory.length == 0) {
		var buyer = JSON.parse(JSON.stringify(Data.getBuyer("marty")));
		buyer.text = "\"Aw, you poor kid – y'ain't got nothin? Here, have an egg. You'll need it in this economy.\"";
		response.send({
			"buyer": buyer,
			"trade": {
				"itemsSelling": [Data.getItem("egg")],
				"itemsBuying": []
			}
		});
	} else if (inventory.length < 8) {
		var buyer = Data.generateRandomBuyer();
		var trade = generateTrade(buyer, inventory);
		response.send({
			"buyer": buyer,
			"trade": trade
		});
	} else { //TODO
		var buyer = JSON.parse(JSON.stringify(Data.getBuyer("marty")));
		buyer.text = "Well I'll be - you really traded up! I'll get ya outta here for all your stuff.";
		response.send({
			"buyer": buyer,
			"trade": {
				"itemsSelling": [],
				"itemsBuying": []
			}
		});
	}
});

app.listen(process.env.PORT || 5000);
