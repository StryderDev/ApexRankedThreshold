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
			axios
				.get("https://api.apexstats.dev/minPred")
				.then(function (response) {
					const data = response.data;

					const tweetText = `-RP/AP Threshold for Apex Predator-\n\nPlatform: BR / Arenas\nPC: ${data.PC.Battle_Royale.toLocaleString()} RP / ${data.PC.Arenas.toLocaleString()} AP\nPlayStation: ${data.PS4.Battle_Royale.toLocaleString()} RP / ${data.PS4.Arenas.toLocaleString()} AP\nXbox: ${data.X1.Battle_Royale.toLocaleString()} RP / ${data.X1.Arenas.toLocaleString()} AP\nSwitch: ${data.Switch.Battle_Royale.toLocaleString()} RP / ${data.Switch.Arenas.toLocaleString()} AP\n\n#ApexLegends\nLast Updated: ${Math.floor(
						new Date().getTime() / 1000
					)}`;

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
