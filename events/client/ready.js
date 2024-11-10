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

		//const rest = new REST().setToken(token);
		//await rest.put(Routes.applicationCommands(clientId), { body: client.commands });

		client.application.commands.set(client.commands.map((cmd) => cmd));

		client.user.setPresence({
			activities: [{ name: activity }],
		});

		const dbFilePath = './DB/guild_config.json';
		let guildConfig = JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));

		guildConfig.forEach((server) => {
			server['last_Card'] = null;
		});

		fs.writeFileSync(dbFilePath, JSON.stringify(guildConfig, null, 2));

		Logger.succes(client, 'Bot démaré avec succès !');
	},
};
