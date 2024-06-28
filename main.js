const axios = require("axios");
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
	axios
		.get(`https://api.jumpmaster.xyz/misc/predThreshold`)
		.then(async function (response) {
			const data = response.data;

			const tweetText = `-RP Threshold for Apex Predator-\n\nPC: ${data.PC.value.toLocaleString()} RP [${data.PC.count.toLocaleString()} Players]\nPlayStation: ${data.Playstation.value.toLocaleString()} RP [${data.Playstation.count.toLocaleString()} Players]\nXbox: ${data.Xbox.value.toLocaleString()} RP [${data.Xbox.count.toLocaleString()} Players]\nSwitch: ${data.Switch.value.toLocaleString()} RP [${data.Switch.count.toLocaleString()} Players]\n\n#ApexLegends #ApexLegendsRanked\n(${
				data.timestamp
			})`;

			try {
				await twitterClient.v2.tweet(tweetText);
			} catch (e) {
				console.log(e);
			}

			console.log(tweetText);

			// console.log("Posted tweet.");
		})
		.catch(function (error) {
			console.log(error);
		});
}

tweetScore();
