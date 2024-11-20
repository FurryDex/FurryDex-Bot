const config = require('../../config');
const Logger = require('../../utils/Logger');
const { REST, Routes } = require('discord.js');
const { clientId, token } = require('../../config.json');
const fs = require('fs');

let activity = 'count my card ...';

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		Logger.client(client, 'Je suis prêt !');

		client.application.commands.set(client.commands.map((cmd) => cmd));

		client.user.setPresence({
			activities: [{ name: activity }],
		});

		if (client.user.id == config.bot.Stable) {
			let guild = await client.guilds.cache.get('1235970684556021890');
			let channel = await guild.channels.cache.get('1236239805973663846');
			channel.setTopic(`Actual Version: ${require('../../package.json').version}`);
		}

		client
			.knex('guilds')
			.update({ last_card: null })
			.catch((...err) => console.error(err));

		Logger.succes(client, 'Bot démaré avec succès !');
	},
};
