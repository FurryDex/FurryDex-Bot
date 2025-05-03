import { CommandInteraction, PermissionFlagsBits } from 'discord.js';
import { FDClient } from '../../bot';

module.exports = {
	name: 'generate-id',
	description: 'Generate an ID for card',
	category: 'admin',
	permissions: PermissionFlagsBits.Administrator,
	ownerOnly: true,
	runSlash: (client: FDClient, interaction: CommandInteraction) => {
		const uid = function () {
			return Date.now().toString(36) + Math.random().toString(36).substr(2);
		};

		interaction.reply(`${uid()}\n${new Date().toISOString()}`);
	},
};
