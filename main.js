const axios = require("axios");
const chalk = require("chalk");
const moment = require("moment");
const dotenv = require("dotenv");
const { TwitterApi } = require("twitter-api-v2");

dotenv.config();

const twitterClient = new TwitterApi({
	appKey: process.env.API_KEY,
	appSecret: process.env.API_SECRET,
	accessToken: process.env.ACCESS_TOKEN,
	accessSecret: process.env.ACCESS_TOKEN_SECRET,
});

async function tweetScore() {
	(function loop() {
		var now = new Date();

		if (now.getMinutes() === 00 && now.getSeconds() < 30) {
			// if (now.getMinutes()) {
			axios
				.get(
					`https://api.mozambiquehe.re/predator?auth=${process.env.ALS_TOKEN}`
				)
				.then(async function (response) {
					const data = response.data.RP;

					// const tweetText = `-RP Threshold for Apex Predator-\n\nPC: ${data.PC.Battle_Royale.toLocaleString()} RP\nPlayStation: ${data.PS4.Battle_Royale.toLocaleString()} RP\nXbox: ${data.X1.Battle_Royale.toLocaleString()} RP\nSwitch: ${data.Switch.Battle_Royale.toLocaleString()} RP\n\n#ApexLegends #ApexLegendsRanked`;

					const tweetText = `-LP Threshold for Apex Predator-\n\nPC: ${data.PC.val.toLocaleString()} LP\nPlayStation: ${data.PS4.val.toLocaleString()} LP\nXbox: ${data.X1.val.toLocaleString()} LP\nSwitch: ${data.SWITCH.val.toLocaleString()} LP\n\n#ApexLegends #ApexLegendsRanked`;

					// const tweet = () => {
					// 	const onFinish = (err, reply) => {
					// 		if (err) {
					// 			console.log(chalk`{red Error: ${err.message}}`);
					// 		} else {
					// 			console.log(
					// 				chalk`{green [${moment().format(
					// 					"h:mm:ss A"
					// 				)}] Posted Tweet}`
					// 			);
					// 		}
					// 	};

					// 	T.post(
					// 		"statuses/update",
					// 		{ status: tweetText },
					// 		onFinish
					// 	);
					// };

					// tweet();

					try {
						await twitterClient.v2.tweet(tweetText);
					} catch (e) {
						console.log(e.data.detail);
					}

					console.log("Posted tweet.");

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
