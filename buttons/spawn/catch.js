const { ModalBuilder, TextInputStyle, ActionRowBuilder, TextInputBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const locales = require('../../locales/buttons/catch.json');

module.exports = {
	name: 'catch',
	run: async (client, interaction) => {
		let userData = await client
			.knex('users')
			.first('*')
			.where({ id: interaction.user.id })
			.catch((err) => {
				console.error(err);
			});

		if (userData.ToS != 1) {
			let embed = new EmbedBuilder()
				.setTitle('Wait, wait, wait !')
				.setDescription(`Sorry, but you need to accept the ToS for continue !\n\nLegal Documents (ToS & Privacy policy): https://flyzar73.github.io/legal/ \nBy clicking on "Accept", you accept the ToS`)
				.setColor('Green');

			const buttonRow = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId(`accept-tos`).setLabel('Accept').setStyle(ButtonStyle.Primary));

			interaction.reply({ embeds: [embed], components: [buttonRow], ephemeral: true });

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
