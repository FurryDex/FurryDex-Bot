import { PermissionFlagsBits, MessageFlags, CommandInteraction } from 'discord.js';
import { FDClient } from '../../bot';

module.exports = {
	name: 'guild',
	description: 'send all guild',
	category: 'admin',
	permissions: PermissionFlagsBits.Administrator,
	ownerOnly: true,
	runSlash: (client: FDClient, interaction: CommandInteraction) => {
		interaction.reply({ content: `Guild: ${client.guilds.cache.map((guild, index) => `\n> [${index}] ${guild.name} (${guild.memberCount})`).join('')}`, flags: MessageFlags.Ephemeral });
	},
};
