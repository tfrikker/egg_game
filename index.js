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

// Probability Tools:

// multiply two gaussians {mean: #, sigma: #}. Returns gaussian
function multBell(bell_a, bell_b) {
	return {
		mean: (bell_a.mean*bell_b.sigma*bell_b.sigma + bell_b.mean*bell_a.sigma*bell_a.sigma) /
					(bell_a.sigma*bell_a.sigma + bell_b.sigma*bell_b.sigma),
		sigma: (bell_a.sigma*bell_b.sigma) /
					 Math.sqrt(bell_a.sigma*bell_a.sigma + bell_b.sigma*bell_b.sigma)
	}
}
// generate random variable from gaussian
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
// generate random int between min (inclusive) and max (exclusive)
function randIntRange(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
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
// weighted discrete random variable
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

function generateRandomBuyer() {
	var randomBuyerIndex = randIntRange(0, buyers.length);
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
	});
}

app.get('/newTrade', function(request, response) {
	var inventory = request.body.inventory;
	var buyer = generateRandomBuyer();
	var trade = generateTrade(buyer, inventory);
	response.send({
		"buyer": buyer,
		"trade": trade
	});
});

app.listen(process.env.PORT || 5000);

var items = [
	{
		id: "egg",
		name: "Egg",
		tags: ["food"],
		image: "/images/items/egg.png",
		text: "A beginning."
	},
	{
		id: "moldyOrange",
		name: "moldyOrange",
		tags: ["food"],
		image: "/images/items/moldy_orange.png",
		text: "Green and squishy. Yuck."
	},
	{
		id: "goldfishCrackers",
		name: "Goldfish (crackers)",
		tags: ["food"],
		image: "/images/items/goldfish_crackers.png",
		text: "Soggier than you can imagine."
	},
	{
		id: "sodaCan",
		name: "Soda Can",
		tags: ["drink"],
		image: "/images/items/soda_can.png",
		text: "Something liquid is inside, but it's unclear exactly what."
	},
	{
		id: "juiceBox",
		name: "Juice Box",
		tags: ["drink"],
		image: "/images/items/juice_box.png",
		text: "Grape flavored. No wonder it's down here."
	},
	{
		id: "shiv",
		name: "Shiv",
		tags: ["cutting"],
		image: "/images/items/shiv.png",
		text: "Be careful - it's sharp."
	},
	{
		id: "fishHook",
		name: "Fish Hook",
		tags: ["cutting"],
		image: "/images/items/fish_hook.png",
		text: "Once caught a fish at least *this* big."
	},
	{
		id: "magicMushroom",
		name: "Magic Mushroom",
		tags: ["light"],
		image: "/images/items/magic_mushroom.png",
		text: "Bioluminescent and proud."
	},
	{
		id: "floodlight",
		name: "Floodlight",
		tags: ["light"],
		image: "/images/items/floodlight.png",
		text: "Just needs a bulb."
	},
	{
		id: "spyDossier",
		name: "Top Secret Spy Dossier",
		tags: ["mystery"],
		image: "/images/items/spy_dossier.png",
		text: "It's got the dirt and is also covered in it. Score!"
	},
	{
		id: "mysteriousBriefcase",
		name: "Mysterious Briefcase",
		tags: ["mystery"],
		image: "/images/items/mysterious_briefcase.png",
		text: "Probably full of worms. *Mysterious* worms."
	},
	{
		id: "bagODrugs",
		name: "Bag O' Drugs",
		tags: ["mystery"],
		image: "/images/items/drugs_bag.png",
		text: "You never know what you're gonna get!"
	},
	{
		id: "deadGoldfish",
		name: "Dead Goldfish",
		tags: ["carrion"],
		image: "/images/items/dead_goldfish.png",
		text: "Named Rufus, in happier times."
	},
	{
		id: "dessicatedLizard",
		name: "Dessicated Lizard",
		tags: ["carrion"],
		image: "/images/items/dead_lizard.png",
		text: "Could make some good jerky if you put your mind to it."
	},
	{
		id: "wombatPoop",
		name: "Wombat Poop",
		tags: ["flair"],
		image: "/images/items/wombat_poop.png",
		text: "Nuggets of inspiration."
	},
	{
		id: "extravagantHat",
		name: "Extravagant Hat",
		tags: ["flair"],
		image: "/images/items/extravagantHat.png",
		text: "A fez that, when rotated, reminds you of something."
	}
]


var buyers = [
	{
		id: "marty",
		name: "Marty the Cockroach",
		image: "/images/buyers/marty.tif",
		typePrefs: {
			"mystery": 20,
			"food": 5
		},
		keyItemsToTrade: {
			//TODO: handle
			"shiv": 20
		},
		itemPrefs: {},
		dealSize: 20,
		saviness: 1
	},
	{
		id: "winifred",
		name: "Winifred the Bat",
		image: "/images/buyers/winifred.tif",
		typePrefs: {
			"food": 20,
			"light": 5
		},
		keyItemsToTrade: {
			"magicMushroom": 20,
			"sodaCan": 20,
			"bagODrugs": 20
		},
		itemPrefs: {},
		dealSize: 20,
		saviness: 1
	},
	{
		id: "moe",
		name: "Moe the Moth",
		image: "/images/buyers/moe.tif",
		typePrefs: {
			"lamp": 30,
			"food": 5,
			"flair": 5
		},
		keyItemsToTrade: {
			"moldyOrange": 20,
			"extravagantHat": 20
		},
		itemPrefs: {},
		dealSize: 20,
		saviness: 1
	},
	{
		id: "goldie",
		name: "Goldie the Goldfish",
		image: "/images/buyers/goldie.tif",
		typePrefs: {
			"flair": 20,
			"cutting": 5
		},
		keyItemsToTrade: {
			"juiceBox": 20,
			"fishHook": 20,
			"goldfishCrackers": 30
		},
		itemPrefs: {},
		dealSize: 20,
		saviness: 1
	},
	{
		id: "whiskers",
		name: "Mr. Whiskers the Rat",
		image: "/images/buyers/whiskers.tif",
		typePrefs: {
			"drink": 20,
			"carrion": 5
		},
		keyItemsToTrade: {
			"deadGoldfish": 20,
			"wombatPoop": 20
		},
		itemPrefs: {},
		dealSize: 20,
		saviness: 1
	},
	{
		id: "ratKing",
		name: "The Rat King",
		image: "/images/buyers/rat_king.tif",
		typePrefs: {
			"cutting": 20,
			"mystery": 5
		},
		keyItemsToTrade: {
			"mysteriousBriefcase": 20,
			"dessicatedLizard": 20
		},
		itemPrefs: {},
		dealSize: 20,
		saviness: 1
	},
	{
		id: "bourdeaux",
		name: "Bordeaux the Alligator",
		image: "/images/buyers/bordeaux.tif",
		typePrefs: {
			"carrion": 20,
			"light": 5
		},
		keyItemsToTrade: {
			"spyDossier": 20,
			"floodlight": 20
		},
		itemPrefs: {},
		dealSize: 20,
		saviness: 1
	}
];
