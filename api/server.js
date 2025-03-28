const express = require('express');
const discord = require('./discord.js');
const storage = require('./storage.js');
const cors = require('cors');
const path = require('path');
const app = express();
const corsOptions = {
	origin: '*', //(https://your-client-app.com)
	optionsSuccessStatus: 200,
};
const yaml = require('js-yaml');
const fs = require('fs');
const cookieParser = require('cookie-parser');
let config;

config = yaml.load(fs.readFileSync('./config/config.yaml', 'utf8'));
knex = require('knex')(config.database);

app.use(cors(corsOptions));

// Allow express to parse JSON bodie
app.use(express.json());
app.use(cookieParser('afaab2d4-adbd-4f43-8e19-b0950d6da709'));

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/index.css', function (req, res) {
	res.sendFile(path.join(__dirname, '/index.css'));
});

app.get('/index.js', function (req, res) {
	res.sendFile(path.join(__dirname, '/index.js'));
});

app.get('/info.json', function (req, res) {
	res.send({ version: require('../package.json').version, status: '🟢 Online' });
});

app.get('/verify-user', async function (req, res) {
	const { url, state } = discord.getOAuthUrl();

	res.cookie('clientState', state, { maxAge: 1000 * 60 * 5, signed: true });

	res.redirect(url);
});

app.get('/OAuth-redirect', async (req, res) => {
	try {
		const code = req.query['code'];
		const discordState = req.query['state'];
		const { clientState } = req.signedCookies;
		if (clientState !== discordState) {
			return res.sendStatus(403);
		}

		const tokens = await discord.getOAuthTokens(code);
		const userData = await discord.getUserData(tokens);
		const userId = userData.user.id;
		await storage.storeDiscordTokens(userId, {
			access_token: tokens.access_token,
			refresh_token: tokens.refresh_token,
			expires_at: Date.now() + tokens.expires_in * 1000,
		});

		await updateMetadata(userId);

		res.send('You did it!  Now go back to Discord.');
	} catch (error) {
		console.error(error);
		return res.sendStatus(500);
	}
});

// ACTIVITY API
app.post('/api/token', async (req, res) => {
	const response = await fetch(`https://discord.com/api/oauth2/token`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: new URLSearchParams({
			client_id: '1281952753404350468',
			client_secret: 'UH0kNkDdIOZEalmDFJGPqsUvIPZgqCTt',
			grant_type: 'authorization_code',
			code: req.body.code,
		}),
	});

	const { access_token } = await response.json();
	res.send({ access_token });
});

app.listen(config.bot.api.port, () => {
	console.log(`Server listening at http://<public-ip>:${config.bot.api.port}`);
});

app.post('/update-metadata', async (req, res) => {
	try {
		const userId = req.body.userId;
		await updateMetadata(userId);

		res.sendStatus(204);
	} catch (e) {
		res.sendStatus(500);
	}
});

async function updateMetadata(userId) {
	// Fetch the Discord tokens from storage
	const tokens = await storage.getDiscordTokens(userId);
	let metadata = {};
	try {
		// Fetch the new metadata you want to use from an external source.
		// This data could be POST-ed to this endpoint, but every service
		// is going to be different.  To keep the example simple, we'll
		// just generate some random data.
		metadata = {
			pourcent:
				(
					await knex('users')
						.where({ user_id: userId })
						.first('*')
						.catch((err) => console.error(err))
				).pourcent ?? 0,
			bug_hunt_card: (await knex('user_cards')
				.where({ user_id: userId, card_id: 16 })
				.first('*')
				.catch((err) => console.error(err)))
				? 1
				: 0,
			glitch_card: (await knex('user_cards')
				.where({ user_id: userId, card_id: 19 })
				.first('*')
				.catch((err) => console.error(err)))
				? 1
				: 0,
		};
	} catch (e) {
		e.message = `Error fetching external data: ${e.message}`;
		console.error(e);
		// If fetching the profile data for the external service fails for any reason,
		// ensure metadata on the Discord side is nulled out. This prevents cases
		// where the user revokes an external app permissions, and is left with
		// stale linked role data.
	}

	// Push the data to Discord.
	await discord.pushMetadata(userId, tokens, metadata);
}
