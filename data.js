const Util = require('./util.js');

function getItem(id) {
	for (var i = 0; i < items.length; i++) {
		var element = items[i];
		if (element.id == id) {
			console.log("server getItem: found item " + id);
			return element;
		}
	}
	console.log("server getItem: item not found: " + id);
}

exports.getBuyer = (id) => {
	for (var i = 0; i < buyers.length; i++) {
		var element = buyers[i];
		if (element.id == id) {
			console.log("server getBuyer: found buyer " + id);
			return element;
		}
	}
	console.log("server getBuyer: buyer not found: " + id);
}

exports.generateRandomBuyer = () => {
	var randomBuyerIndex = Util.randIntRange(0, buyers.length);
	return buyers[randomBuyerIndex];
}

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
		image: "/images/items/extravagant_hat.png",
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
		inventory: items.concat([getItem("shiv")]), //TODO handle egg and key
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
		inventory: items.concat([getItem("magicMushroom"), getItem("sodaCan"), getItem("bagODrugs")]),
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
		inventory: items.concat([getItem("moldyOrange"), getItem("extravagantHat")]),
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
		inventory: items.concat([getItem("juiceBox"), getItem("fishHook"), getItem("goldfishCrackers"), getItem("goldfishCrackers")]),
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
		inventory: items.concat([getItem("deadGoldfish"), getItem("wombatPoop")]),
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
		inventory: items.concat([getItem("mysteriousBriefcase"), getItem("dessicatedLizard")]),
		itemPrefs: {},
		dealSize: 20,
		saviness: 1
	},
	{
		id: "bordeaux",
		name: "Bordeaux the Alligator",
		image: "/images/buyers/bordeaux.tif",
		typePrefs: {
			"carrion": 20,
			"light": 5
		},
		inventory: items.concat([getItem("spyDossier"), getItem("floodlight")]),
		itemPrefs: {},
		dealSize: 20,
		saviness: 1
	}
];

exports.items = items;
exports.buyers = buyers;
exports.getItem = getItem;
