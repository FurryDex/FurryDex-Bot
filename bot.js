const { Client, Collection, Partials, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const process = require('node:process');
const yaml = require('js-yaml');
const client = new Client({
	intents: [
		//GatewayIntentBits.NON_PRIVILEGED,
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
	partials: [Partials.User, Partials.Channel, Partials.GuildMember, Partials.Message],
});
const Logger = require('./utils/Logger');
const winston = require('winston');
var logger = new winston.Logger({ transports: [new winston.transports.File({ filename: `./logs/${new Date().toISOString().replace(/:/g, '-').replace(/\..+/, '').split('T')[0]}.log` })] });
client.logger = logger;

try {
	client.config = yaml.load(fs.readFileSync('./config/config.yaml', 'utf8'));
} catch (e) {
	return console.error('Config file does not exist !', e);
}
const debug = client.config.dev.debug;

if (!client.config.bot.shard && client.config.bot.api.enable) require('./api/server');

const { isXMinutesPassed } = require('./utils/functions/spawn');
const { cp } = require('node:fs');

['commands', 'buttons', 'selects', 'modals'].forEach((x) => (client[x] = new Collection()));
['EventUtil', 'ButtonUtil', 'ModalUtil', 'SelectMenuUtil'].forEach((handler) => {
	require(`./utils/handlers/${handler}`)(client);
});

client.locales = {};

async function locales() {
	try {
		client.locales = JSON.parse(fs.readFileSync('./locales.json'));
	} catch (err) {
		console.error(err);
	}
}

locales().then(() => {
	require(`./utils/handlers/CommandUtil.js`)(client);
});

if (!debug) {
	process.on('exit', (code) => {
		Logger.error(client, `Bot stopped with code: ${code}`);
	});
	process.on('uncaughtException', (err, origin) => {
		Logger.error(client, `${'uncaughtException'.toUpperCase()}: ${err}\nOrigin: ${String(origin)}`);
	});
	process.on('unhandledRejection', (reason, promise) => {
		console.log('Unhandled Rejection at:', promise, 'reason:', reason);
		Logger.error(client, `${'unhandledRejection'.toUpperCase()}: at`, promise, 'reason:', reason);
	});
	process.on('warning', (...args) => Logger.warn(...args));
	client.rest.on('rateLimited', (rateLimited) => {
		Logger.warn(client, `${'rateLimited'.toUpperCase()}: ${rateLimited}`);
	});
	client.rest.on('invalidRequestWarning', (invalidRequestWarningData) => {
		Logger.warn(client, `${'invalidRequestWarning'.toUpperCase()}: ${invalidRequestWarningData}`);
	});
	client.on('warn', (info) => {
		Logger.warn(client, `${'warn'.toUpperCase()}: ${info}`);
	});
	client.on('error', (info) => {
		Logger.error(client, `${'error'.toUpperCase()}: ${info}`);
	});
	client.on('shardDisconnect', (event, id) => {
		Logger.shard(client, `${'shardDisconnect'.toUpperCase()} - ID: ${id}: ${event}`);
	});
	client.on('shardError', (event, id) => {
		Logger.error(client, `${'shardError'.toUpperCase()} - ID: ${id}: ${event}`);
	});
	client.on('shardReady', (event, id) => {
		Logger.shard(client, `${'shardReady'.toUpperCase()} - ID: ${id}: ${event}`);
	});
	client.on('shardReconnecting', (id) => {
		Logger.shard(client, `${'shardReconnecting'.toUpperCase()} - ID: ${id}`);
	});
	client.on('shardResume', (id, event) => {
		Logger.shard(client, `${'shardResume'.toUpperCase()} - ID: ${id}: ${event}`);
	});
}

client.knex = require('knex')(client.config.database);

client.login(client.config.bot.token);

// --------- COG & SPAWN ----------

client.on('messageCreate', (message) => {
	if (message.author.id == client.user.id) return;
	client.logger.log('info', `/ Message received... Processing card spawning process...`);
	if (message.channel.isDMBased()) return client.logger.log('info', `\ DM channel detected. Ignoring message.`);
	if (client.config.bot.disable.bot) if (message.guild.members.cache.hasAny(...client.config.bot.disable.bot)) return client.logger.log('info', `\ Blacklisted bot in the guild. Ignoring message.`);
	if (message.author.bot) return client.logger.log('info', `\ Message from a bot detected. Ignoring message.`);
	client.logger.log('info', `| Message passed firsts checks. Proceeding to check if card spawning is allowed...`);

	isXMinutesPassed(message, client).then((result) => {
		require('./utils/functions/anticheat.js').anticheat_message(client, message, message.author.id, result ? 1 : 0);
	});
});

let callAmount = 0;
process.on('SIGINT', function () {
	if (callAmount < 1) {
		Logger.succes(client, '✅ - Desactivation du bot ...', 'Veuillez patientez');
		client.destroy();
		setTimeout(() => process.exit(0), 1000);
	}

	callAmount++;
});
