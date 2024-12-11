const { ModalBuilder, TextInputStyle, ActionRowBuilder, TextInputBuilder } = require('discord.js');
const locales = require('../../locales/buttons/catch.json');
const fs = require('fs');

const dbFilePath = './DB/guild_config.json';

module.exports = {
	name: 'accept-tos',
	run: async (client, interaction) => {
		client
			.knex('users')
			.update({ ToS: 1 })
			.where({ id: interaction.user.id })
			.catch((err) => {
				console.error(err);
			})
			.then(() => {
				interaction.reply({ content: 'Thank you. Enjoy the bot !', ephemeral: true });
			});
	},
};
