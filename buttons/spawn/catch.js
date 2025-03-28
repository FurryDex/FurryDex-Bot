const { ModalBuilder, TextInputStyle, ActionRowBuilder, TextInputBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
	name: 'catch',
	run: async (client, interaction) => {
		const locales = client.locales.buttons.catch;
		let userData = await client
			.knex('users')
			.first('*')
			.where({ id: interaction.user.id })
			.catch((err) => {
				console.error(err);
			});

		if (!userData) {
			client
				.knex('users')
				.insert({ id: interaction.user.id })
				.catch((err) => console.error(err));
			userData = await client
				.knex('users')
				.first('*')
				.where({ id: interaction.user.id })
				.catch((err) => {
					console.error(err);
				});
		}

		if (userData.ToS != 1) {
			let embed = new EmbedBuilder()
				.setTitle('Wait, wait, wait !')
				.setDescription(`Sorry, but you need to accept the ToS for continue !\n\nLegal Documents (ToS & Privacy policy): https://FurryDex.github.io/legal/ \nBy clicking on "Accept", you accept the ToS`)
				.setColor('Green');

			const buttonRow = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId(`accept-tos`).setLabel('Accept').setStyle(ButtonStyle.Primary));

			interaction.reply({ embeds: [embed], components: [buttonRow], flags: MessageFlags.Ephemeral });

			return;
		}

		const modal = new ModalBuilder()
			.setTitle(locales.modal.title[interaction.locale] ?? locales.modal.title.default)
			.setCustomId('catch')
			.setComponents(
				new ActionRowBuilder().addComponents(
					new TextInputBuilder()
						.setCustomId('guess')
						.setLabel(locales.modal.question[interaction.locale] ?? locales.modal.question.default)
						.setPlaceholder(locales.modal.placeholder[interaction.locale] ?? locales.modal.placeholder.default)
						.setRequired(true)
						.setStyle(TextInputStyle.Short)
				)
			);
		await interaction.showModal(modal);
	},
};
