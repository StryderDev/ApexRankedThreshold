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
		.get(
			`https://api.mozambiquehe.re/predator?auth=${process.env.ALS_TOKEN}`
		)
		.then(async function (response) {
			const data = response.data.RP;

			const tweetText = `-RP Threshold for Apex Predator-\n\nPC: ${data.PC.val.toLocaleString()} RP\nPlayStation: ${data.PS4.val.toLocaleString()} RP\nXbox: ${data.X1.val.toLocaleString()} RP\nSwitch: ${data.SWITCH.val.toLocaleString()} RP\n\n#ApexLegends #ApexLegendsRanked`;

			try {
				await twitterClient.v2.tweet(tweetText);
			} catch (e) {
				console.log(e);
			}

			console.log("Posted tweet.");

			// console.log(tweetText);
		})
		.catch(function (error) {
			console.log(error);
		});
}

tweetScore();
