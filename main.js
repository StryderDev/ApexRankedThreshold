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

		if (now.getMinutes() === 00 && now.getSeconds() < 30) {
			axios
				.get("https://api.jumpmaster.xyz/misc/predThreshold")
				.then(function (response) {
					const data = response.data;

					const tweetText = `-RP Threshold for Apex Predator-\n\nPC: ${data.PC.Battle_Royale.toLocaleString()} RP\nPlayStation: ${data.PS4.Battle_Royale.toLocaleString()} RP\nXbox: ${data.X1.Battle_Royale.toLocaleString()} RP\nSwitch: ${data.Switch.Battle_Royale.toLocaleString()} RP\n\n#ApexLegends #ApexLegendsRanked`;

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
