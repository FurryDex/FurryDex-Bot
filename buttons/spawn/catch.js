const { ModalBuilder, TextInputStyle, ActionRowBuilder, TextInputBuilder } = require('discord.js');
const locales = require('../../locales/buttons/catch.json');
const fs = require('fs');

const dbFilePath = './DB/guild_config.json';

module.exports = {
	name: 'catch',
	run: async (client, interaction) => {
		let userData = await client
			.knex('user_cards')
			.first('*')
			.where({ user_id: interaction.user.id })
			.catch((err) => {
				console.error(err);
			});

		if (userData.ToS != 1) {
			let embed = new EmbedBuilder()
				.setTitle('Wait, wait, wait !')
				.setDescription(`Sorry, but you need to accept the ToS for continue !\n\nLegal Documents (ToS & Privacy policy): https://flyzar73.github.io/legal/ \nBy clicking on "Accept", you accept the ToS`);

			const buttonRow = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId(`accept-tos`).setLabel('Accept').setStyle(ButtonStyle.Primary));

			message.editReply({ embeds: [embed], components: [buttonRow], ephemeral: true });

			return;
		}

		const modal = new ModalBuilder()
			.setTitle(locales.models.title[interaction.locale] ?? locales.models.title.default)
			.setCustomId('catch')
			.setComponents(
				new ActionRowBuilder().addComponents(
					new TextInputBuilder()
						.setCustomId('guess')
						.setLabel(locales.models.question[interaction.locale] ?? locales.models.question.default)
						.setPlaceholder(locales.models.placeholder[interaction.locale] ?? locales.models.placeholder.default)
						.setRequired(true)
						.setStyle(TextInputStyle.Short)
				)
			);
		await interaction.showModal(modal);
	},
};
