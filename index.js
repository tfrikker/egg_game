var express = require('express');
var bodyParser = require('body-parser');
var app = express();

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

// generate random int between min (inclusive) and max (exclusive)
function randIntRange(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomBuyer() {
	var randomBuyerIndex = randIntRange(0, buyers.length);
	console.log("index: " + randomBuyerIndex);
	return buyers[randomBuyerIndex];
}

function generateTrade(buyer, inventory) {
	//TODO implement
	return {
		"itemsSelling": [items["moldyOrange"], items["sodaCan"]],
		"itemsBuying": [items["egg"]]
	}
}

function getItem(id) {
	items.forEach(function(element) {
  		if (element.id == id) {
			return element;
		}
	);
}

app.get('/newTrade', function(request, response) {
	var inventory = request.body.inventory;
	var buyer = generateRandomBuyer();
	console.log("HEY");
	var trade = generateTrade(buyer, inventory);
	response.send({
		"buyer": buyer,
		"trade": trade
	});
});

app.listen(process.env.PORT || 5000);

var items = [
	{
		id: "moldyOrange",
		name: "Moldy Orange",
		tags: ["food", "plant", "spoiled"],
		image: "/moldy_orange.png",
		text: "Gross moldy fruit. Blech"
	},
	{
		id: "egg",
		name: "Egg",
		tags: ["food"],
		image: "/egg.png",
		text: "It's hardboiled"
	},
	{
		id: "sodaCan",
		name: "Soda Can",
		tags: ["food", "junk"],
		image: "/soda_can.png",
		text: "Something liquid is inside"
	}
]


var buyers = [
	{
		id: "plagueRat",
		name: "Plague Doctor Rat",
		image: "public/test_image.tif",
		typePrefs: {
			"food": 10,
			"junk": 2
		},
		itemPrefs: {
			"moldyDonut": 15
		},
		dealSize: 20,
		saviness: 1
	}
];
