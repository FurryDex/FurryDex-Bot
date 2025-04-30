const yaml = require('js-yaml');
const fs = require('fs');
let config = yaml.load(fs.readFileSync('./config/config.yaml', 'utf8'));

import { Client, GatewayIntentBits, Partials, ActivityType, Collection } from 'discord.js';

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
}) as Client & {
	config: any;
	commands: Collection<any, any>;
	buttons: Collection<any, any>;
	selects: Collection<any, any>;
	modals: Collection<any, any>;
	locales: any;
	knex: any;
};

client.login(config.bot.token);
let knex = require('knex')(config.database);

client.on('ready', () => {
	console.log('Bot is ready');

	client.user.setPresence({ activities: [{ name: 'MAINTENANCE :/', type: ActivityType.Custom }], status: 'dnd' });

	TEST();
});

async function TEST() {
	let guild = client.guilds.cache.get('1235970684556021890');

	let userId = '643835326485233716';
	console.log(
		await knex('user_cards')
			.select('*')
			.where({ user_id: userId })
			.distinct('card_id')
			.catch((err) => {
				console.error(err);
			})
	);
}
