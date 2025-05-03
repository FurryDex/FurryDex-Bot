import { ClientApplication, ClientUser } from 'discord.js';
import { FDClient } from '../../bot';
import Logger from '../../utils/Logger';

let activity = 'count my card ...';

module.exports = {
	name: 'ready',
	once: true,
	async execute(client: FDClient) {
		Logger.client(client, 'Je suis prêt !');

		(client.user as ClientUser).setPresence({
			activities: [{ name: activity }],
		});

		client.guilds.cache.forEach((guild) => {
			client
				.knex('guilds')
				.update({ last_card: null })
				.where({ id: guild.id })
				.catch((err: any) => {});
		});

		(client.application as ClientApplication).commands.set(client.commands.map((cmd) => cmd)).catch((err) => {
			if (err) {
				Logger.warn(client, 'Le nombre de commandes envoyé est superieur au SpeedLimit de Discord', err);
			}
		});

		Logger.succes(client, 'Bot démaré avec succès !');

		require('../../utils/functions/leaderboard').leaderboard_start(client);
		require('../../utils/functions/anticheat').anticheat_start(client);
	},
};
