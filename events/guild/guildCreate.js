const { EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
	name: 'guildCreate',
	once: false,
	async execute(client, guild) {
		guild.commands.set(client.commands.map((cmd) => cmd));

		const guildConfig = JSON.parse(fs.readFileSync('./DB/guild_config.json', 'utf8'));

		let serverConfig = guildConfig.find((config) => config.guild_id === guild.id);

		if (!serverConfig) {
			guildConfig.push({
				guild_id: guild.id,
				spawn_channel: null,
				enabled: false,
				time: 0,
				First_Check: 0,
				locale: 'en-US',
				last_Card: null,
				premium: false,
			});

			fs.writeFileSync('./DB/guild_config.json', JSON.stringify(guildConfig, null, 2));
		}

		let embed = new EmbedBuilder()
			.setTitle('I am here !')
			.setDescription(`I am \`Furries Dex Bot\`, a bot for get card of world furries.\nTo enable me, please do that command: \n- \`/config channel <channel>\`\n- \`/config enable <enable; true or false>\`\n\nThank you for use me !`)
			.setColor('Aqua');

		let owner = await guild.fetchOwner();
		if (!owner) return;
		owner.send({ embeds: [embed] });
	},
};
