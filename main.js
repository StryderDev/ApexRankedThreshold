const axios = require("axios");
const dotenv = require("dotenv");
const { AtpAgent } = require("@atproto/api");

dotenv.config();

async function tweetScore() {
	const agent = new AtpAgent({ service: "https://bsky.social" });
	await agent.login({
		identifier: process.env.IDENTIFIER,
		password: process.env.APP_PASSWORD,
	});

	axios
		.get(`https://api.jumpmaster.xyz/misc/predThreshold`)
		.then(async function (response) {
			const data = response.data;

			const tweetText = `-RP Threshold for Apex Predator-\n\nPC: ${data.PC.value.toLocaleString()} RP [${data.PC.count.toLocaleString()} Players]\nPlayStation: ${data.Playstation.value.toLocaleString()} RP [${data.Playstation.count.toLocaleString()} Players]\nXbox: ${data.Xbox.value.toLocaleString()} RP [${data.Xbox.count.toLocaleString()} Players]\nSwitch: ${data.Switch.value.toLocaleString()} RP [${data.Switch.count.toLocaleString()} Players]\n\n#ApexLegends #ApexLegendsRanked\n(${
				data.timestamp
			})`;

			await agent.post({ text: tweetText });

			console.log(tweetText);

			// console.log("Posted tweet.");
		})
		.catch(function (error) {
			console.log(error);
		});
}

tweetScore();
