const express = require('express');
const dotenv = require('dotenv');
//const fetch = import("node-fetch");
dotenv.config({ path: '../.env' });
const cors = require('cors');
const path = require('path');

const app = express();
const port = require('../config.json').api;

const corsOptions = {
	origin: '*', //(https://your-client-app.com)
	optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Allow express to parse JSON bodie
app.use(express.json());

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

app.listen(port, () => {
	console.log(`Server listening at http://192.168.1.10:${port}`);
});
