const { Client, Collection, Partials, Status, REST, Routes, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const dotenv = require('dotenv');
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
	],
	partials: [Partials.User, Partials.Channel, Partials.GuildMember, Partials.Message, Partials.Reaction, Partials.GuildScheduledEvent, Partials.ThreadMember],
});
const Logger = require('./utils/Logger');
const debug = true;

require('./api/server');

const { GiveawaysManager } = require('discord-giveaways');
const { isXMinutesPassed, win } = require('./utils/functions/spawn');
const mysql = require('mysql');
const config = require('./config');
const manager = new GiveawaysManager(client, {
	storage: './giveaways.json',
	default: {
		botsCanWin: false,
		embedColor: '#00BDFF',
		embedColorEnd: '#01004D',
		reaction: '🎉',
	},
});

client.giveawaysManager = manager;

['commands', 'buttons', 'selects', 'modals', 'blacklist_guild'].forEach((x) => (client[x] = new Collection()));
['CommandUtil', 'EventUtil', 'ButtonUtil', 'ModalUtil', 'SelectMenuUtil'].forEach((handler) => {
	require(`./utils/handlers/${handler}`)(client);
});
//

//require("./api/index.js");

if (!debug) {
	process.on('exit', (code) => {
		Logger.error(client, `Bot stopped with code: ${code}`);
	});
	process.on('uncaughtException', (err, origin) => {
		Logger.error(client, `${'uncaughtException'.toUpperCase()}: ${err}\nOrigin: ${origin}`);
	});
	process.on('unhandledRejection', (reason, promise) => {
		Logger.error(client, `${'unhandledRejection'.toUpperCase()}: ${reason}\n${promise}`);
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

client.knex = require('knex')(require('./config.json').connection);

client.data = client.knex;

client.login(require('./config.json').token);

// --------- COG & SPAWN ----------

client.on('messageCreate', (message) => {
	if (client.user.id == config.bot.Canary) {
		if (message.guilds.members.cache.get(config.bot.Stable)) return;
	}
	if (message.author.bot) return;
	isXMinutesPassed(message, client);
});

module.exports = { client };
