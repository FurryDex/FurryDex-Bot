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

		client
			.knex('guilds')
			.update({ last_card: null })
			.catch((...err) => console.error(err));

		Logger.succes(client, 'Bot démaré avec succès !');
	},
};
