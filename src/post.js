const chalk = require('chalk');
const axios = require('axios');
const dotenv = require('dotenv');
const { AtpAgent } = require('@atproto/api');

dotenv.config();

async function postToBluesky() {
	const postURL = 'https://bsky.social';
	const rpURL = 'https://api.jumpmaster.xyz/misc/predThreshold';

	const agent = new AtpAgent({ service: postURL });

	console.log(chalk.yellow('Logging in...'));

	await agent.login({
		identifier: process.env.USERNAME,
		password: process.env.PASSWORD,
	});

	axios
		.get(rpURL)
		.then(async resp => {
			const data = resp.data;
			const time = Math.floor(Date.now() / 1000);

			const PC = data.PC;
			const XB = data.Xbox;
			const PS = data.Playstation;
			const SW = data.Switch;

			const postText = `-RP Threshold for Apex Predator-\n\nPC: ${PC.value.toLocaleString()} RP [${PC.count.toLocaleString()} Players]\nXbox: ${XB.value.toLocaleString()} RP [${XB.count.toLocaleString()} Players]\nPlayStation: ${PS.value.toLocaleString()} RP [${PS.count.toLocaleString()} Players]\nNintendo Switch: ${SW.value.toLocaleString()} RP [${SW.count.toLocaleString()} Players]\n(${time})`;

			console.log(postText);

			await agent.post({ text: postText });
		})
		.catch(error => {
			console.error(chalk.red('Error fetching data: '), error);
		});
}

postToBluesky()
	.then(() => {
		console.log(chalk.green('Login Successful'));
	})
	.catch(error => {
		console.error(chalk.red('Login Error: '), error);
	});
