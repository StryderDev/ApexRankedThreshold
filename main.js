const Twit = require("twit");
const config = require("./config.json");

const T = new Twit({
	consumer_key: config.API_KEY,
	consumer_secret: config.API_SECRET,
	access_token: config.ACCESS_TOKEN,
	access_token_secret: config.ACCESS_TOKEN_SECRET,
});

const tweet = () => {
	const text = `Approximate RP/AP needed for Apex Predator:\n\nBattle Royale: 10,000 RP\nArenas: 8,000 AP\n\nhttps://ranked.apexstats.dev/\n#ApexLegends #ApexLegendsRanked`;

	const onFinish = (err, reply) => {
		if (err) {
			console.log("Error: ", err.message);
		} else {
			console.log("Success: ", reply);
		}
	};

	T.post("statuses/update", { status: text }, onFinish);
};

tweet();
