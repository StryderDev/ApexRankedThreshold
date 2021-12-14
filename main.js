const Twit = require("twit");
const config = require("./config.json");
const moment = require("moment");
const axios = require("axios");
const chalk = require("chalk");

const T = new Twit({
	consumer_key: config.API_KEY,
	consumer_secret: config.API_SECRET,
	access_token: config.ACCESS_TOKEN,
	access_token_secret: config.ACCESS_TOKEN_SECRET,
});

async function tweetScore() {
	(function loop() {
		var now = new Date();

		if (now.getMinutes() === 00) {
			// Make a request for a user with a given ID
			axios
				.get("https://api.apexstats.dev/minPred")
				.then(function (response) {
					const data = response.data;

					const tweetText = `-Approximate RP/AP needed for Apex Predator-\n\nPlatform: BR / Arenas\nPC: ${data.PC.min_BR_RP.toLocaleString()} RP / ${data.PC.min_AR_AP.toLocaleString()} AP\nPlayStation: ${data.PS4.min_BR_RP.toLocaleString()} RP / ${data.PS4.min_AR_AP.toLocaleString()} AP\nXbox: ${data.X1.min_BR_RP.toLocaleString()} RP / ${data.X1.min_AR_AP.toLocaleString()} AP\n\nhttps://ranked.apexstats.dev/\n#ApexLegends #ApexLegendsRanked`;

					const tweet = () => {
						const onFinish = (err, reply) => {
							if (err) {
								console.log(chalk`{red Error: ${err.message}}`);
							} else {
								console.log(
									chalk`{green [${moment().format(
										"h:mm:ss A"
									)}] Posted Tweet}`
								);
							}
						};

						T.post(
							"statuses/update",
							{ status: tweetText },
							onFinish
						);
					};

					tweet();

					// console.log(tweetText);
				})
				.catch(function (error) {
					console.log(error);
				});
		}

		now = new Date(); // Time passed
		var delay = 60000 - (now % 60000); // Exact ms time interval
		setTimeout(loop, delay);
		console.log(
			chalk`{yellow [${moment().format("h:mm:ss A")}] Checking...}`
		);
	})();
}

tweetScore();

//const tweet = () => {
//	const text = `Approximate RP/AP needed for Apex Predator:\n\nPlatform: BR / Arenas\nPC: 10,000 BR / 8,000 AP\nPlayStation: 10,000 BR / 8,000 AP\nXbox: 10,000 BR / 8,000 AP\n\nhttps://ranked.apexstats.dev/\n#ApexLegends #ApexLegendsRanked`;

//	const onFinish = (err, reply) => {
//		if (err) {
//			console.log("Error: ", err.message);
//		} else {
//			console.log("Success: ", reply);
//		}
//	};

//	T.post("statuses/update", { status: text }, onFinish);
//};

// tweet();
