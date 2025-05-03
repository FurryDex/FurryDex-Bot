import { Client, Collection, Partials, GatewayIntentBits } from 'discord.js';
const fs = require('node:fs');
const process = require('node:process');
const yaml = require('js-yaml');

export interface FDClient extends Client {
	config: any;
	commands: Collection<any, any>;
	buttons: Collection<any, any>;
	selects: Collection<any, any>;
	modals: Collection<any, any>;
	string: Collection<any, any>;
	locales: any;
	knex: any;
}

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
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
}) as FDClient;
import Logger from './utils/Logger';

try {
	client.config = yaml.load(fs.readFileSync('./config/config.yaml', 'utf8'));
} catch (e) {
	console.error('Config file does not exist !', e);
}
const debug = client.config.dev.debug;

if (!client.config.bot.shard && client.config.bot.api.enable) require('./api/server');

const { isXMinutesPassed } = require('./utils/functions/spawn');

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
		} else {
			no_locales('No locales API');
		}
	} catch (err: string | any) {
		no_locales(err);
	}
}

async function no_locales(err: Error | string) {
	Logger.warn(null, `Error for Locales modules: ${err}`);
	if (err == 'No locales API') client.locales = require('./src/locales.js');
	else
		try {
			client.locales = JSON.parse(fs.readFileSync('./locales.json'));
		} catch (err) {
			console.error(err);
		}
}

locales().then(() => {
	require(`./utils/handlers/CommandUtil.ts`)(client);
});

if (!debug) {
	process.on('exit', (code: any) => {
		Logger.error(client, `Bot stopped with code: ${code}`);
	});
	process.on('uncaughtException', (err: any, origin: any) => {
		Logger.error(client, `${'uncaughtException'.toUpperCase()}: ${err}\nOrigin: ${String(origin)}`);
	});
	process.on('unhandledRejection', (reason: any, promise: any) => {
		console.log('Unhandled Rejection at:', promise, 'reason:', reason);
		Logger.error(client, `${'unhandledRejection'.toUpperCase()}: at`, promise, 'reason:', reason);
	});
	process.on('warning', (...args: any[]) => Logger.warn(null, ...args));
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
	if (message.channel.isDMBased()) return;
	if (client.config.bot.disable.bot) if (message.guild?.members.cache.hasAny(...client.config.bot.disable.bot)) return;
	if (message.author.bot) return;

	isXMinutesPassed(message, client).then((result: boolean | any) => {
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
