const { Client, Collection, Partials, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const dotenv = require('dotenv');
const process = require('node:process');
const yaml = require('js-yaml');
dotenv.config();
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildBans,
		GatewayIntentBits.GuildEmojisAndStickers,
		GatewayIntentBits.GuildIntegrations,
		GatewayIntentBits.GuildWebhooks,
		GatewayIntentBits.GuildInvites,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildMessageTyping,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.DirectMessageReactions,
		GatewayIntentBits.DirectMessageTyping,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildScheduledEvents,
		GatewayIntentBits.AutoModerationConfiguration,
		GatewayIntentBits.AutoModerationExecution,
		GatewayIntentBits.DirectMessagePolls,
		GatewayIntentBits.GuildMessagePolls,
		GatewayIntentBits.GuildModeration,
		GatewayIntentBits.GuildVoiceStates,
	],
	partials: [Partials.User, Partials.Channel, Partials.GuildMember, Partials.Message, Partials.Reaction, Partials.GuildScheduledEvent, Partials.ThreadMember],
});
const Logger = require('./utils/Logger');

try {
	client.config = yaml.load(fs.readFileSync('./config/config.yaml', 'utf8'));
} catch (e) {
	return console.error('Config file does not exist !', e);
}
const debug = client.config.dev.debug;

if (!client.config.bot.shard && client.config.bot.api.enable) require('./api/server');

const { isXMinutesPassed } = require('./utils/functions/spawn');

['commands', 'buttons', 'selects', 'modals'].forEach((x) => (client[x] = new Collection()));
['EventUtil', 'ButtonUtil', 'ModalUtil', 'SelectMenuUtil'].forEach((handler) => {
	require(`./utils/handlers/${handler}`)(client);
});

client.locales = {};

async function locales() {
	if (client.config.third_party.crowdin.Crowdin_to_Discord_API) {
		const response = await fetch(client.config.third_party.crowdin.Crowdin_to_Discord_API);
		if (await response) {
			client.locales = await response.json();
			await fs.writeFileSync('./locales.json', JSON.stringify(client.locales));
		} else no_locales();
		return;
	} else no_locales();
}

async function no_locales() {
	logger.error(client, 'Locales', err);
	client.locales = await fs.readFileSync('./locales.json');
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
		Logger.error(client, `${'unhandledRejection'.toUpperCase()}: ${reason}\n at`, promise);
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

client.data = client.knex;

client.login(client.config.bot.token);

// --------- COG & SPAWN ----------

client.on('messageCreate', (message) => {
	if (config.disable.bot.includes(message.guild.members.cache.get(client.user.id)?.id ?? '.')) return;
	if (message.author.bot) return;

	isXMinutesPassed(message, client);
});

let callAmount = 0;
process.on('SIGINT', function () {
	if (callAmount < 1) {
		Logger.succes(client, '✅ - Desactivation du bot ...', 'Veuillez patientez');
		setTimeout(() => process.exit(0), 1000);
	}

	callAmount++;
});

module.exports = { client };
