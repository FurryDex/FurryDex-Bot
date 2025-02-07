const { Client, Collection, Partials, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const process = require('node:process');
const yaml = require('js-yaml');
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
	try {
		if (client.config.third_party.crowdin.Crowdin_to_Discord_API) {
			const response = await fetch(client.config.third_party.crowdin.Crowdin_to_Discord_API);
			if (response) {
				client.locales = await response.json();
				fs.writeFileSync('./locales.json', JSON.stringify(client.locales));
			}
		} else no_locales('No locales API');
	} catch (err) {
		no_locales(err);
	}
}

async function no_locales(err) {
	Logger.warn(client, `Error for Locales modules: ${err}`);
	client.locales = JSON.parse(fs.readFileSync('./locales.json').catch((err) => console.error(err)));
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

client.login(client.config.bot.token);

// --------- COG & SPAWN ----------

client.on('messageCreate', (message) => {
	if (client.config.bot.disable.bot) if (message.guild.members.cache.hasAny(client.config.bot.disable.bot) ?? false) return;
	if (message.author.bot) return;

	isXMinutesPassed(message, client);
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

module.exports = { client };
