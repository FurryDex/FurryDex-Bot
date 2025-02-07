const Logger = require('../../utils/Logger');
const { REST, Routes } = require('discord.js');
const fs = require('fs');

let activity = 'count my card ...';

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		Logger.client(client, 'Je suis prêt !');

		client.user.setPresence({
			activities: [{ name: activity }],
		});

		client
			.knex('guilds')
			.update({ last_card: null })
			.catch((err) => console.error(err));

		client.application.commands.set(client.commands.map((cmd) => cmd)).catch((err) => {
			if (err) {
				Logger.warn(client, 'Le nombre de commandes envoyé est superieur au SpeedLimit de Discord', err);
			}
		});

		Logger.succes(client, 'Bot démaré avec succès !');

		require('../../utils/functions/leaderboard').leaderboard_start(client);
		require('../../utils/functions/update').upgrade_data(client);
		require('../../utils/functions/update').update_data(client);
	},
};
