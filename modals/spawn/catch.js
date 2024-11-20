const locales = require('../../locales/modals/catch.json');
const fs = require('fs');
const { ActionRowBuilder, ButtonBuilder } = require('discord.js');
const dbFilePath = './DB/guild_config.json';
const cardFilePath = './DB/cards.json';
const cardlistFilePath = './DB/cardlist.json';
const uid = function () {
	return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
module.exports = {
	name: 'catch',
	async run(client, interaction) {
		const guess = interaction.fields.getTextInputValue('guess').toLowerCase();
		let serverConfig = await client
			.knex('guilds')
			.first('*')
			.where({ id: interaction.guild.id })
			.catch((...err) => console.error(err));
		if (serverConfig.last_Card == null) {
			let message = locales.already[serverConfig.locale] ?? locales.already.default;
			interaction.reply(message.replace('%@player%', `<@${interaction.user.id}>`));
			return;
		}

		let card = await client
			.knex('cards')
			.first('*')
			.where({ id: serverConfig.last_Card })
			.catch((...err) => console.error(err));

		if (card.possibleName.includes(guess)) {
			let live = Math.round(Math.floor(Math.random() * (25 - -25)) + -25);
			let attacks = Math.round(Math.floor(Math.random() * (25 - -25)) + -25);
			let uuid = uid();
			let user = await client
				.knex('users')
				.first('*')
				.where({ id: interaction.user.id })
				.catch((...err) => console.error(err));

			if (!user) {
				client
					.knex('users')
					.insert({ user_id: interaction.user.id })
					.catch((...err) => console.error(err));
			}
			client
				.knex('users')
				.insert({
					id: uuid,
					cardid: serverConfig.last_Card,
					guilds: interaction.guild.id,
					date: Date.now(),
					live: `${live < 0 ? live : `+${live}`}`,
					attacks: `${attacks < 0 ? attacks : `+${attacks}`}`,
				})
				.catch((...err) => console.error(err));
			let message = locales.congrat[serverConfig.locale] ?? locales.congrat.default;
			interaction.reply(message.replace('%cardName%', card.name).replace('%cardId%', uuid).replace('%@player%', `<@${interaction.user.id}>`));
			require('../../utils/functions/DiscordLogger').writePlayer(client, interaction.user.id, {
				tag: 'SUCCES',
				color: 'GREEN',
				description: 'Card catch',
				info: [
					{ name: 'Card', value: `${card.name} (${card.id})` },
					{ name: 'UUID', value: uuid },
					{ name: 'Guild', value: `${interaction.guild.name} (${interaction.guild.id})` },
					{ name: 'Live', value: `${live < 0 ? live : `+${live}`}` },
					{ name: 'Attacks', value: `${attacks < 0 ? attacks : `+${attacks}`}` },
				],
				content: 'Catch',
			});
			require('../../utils/functions/DiscordLogger').writeServer(client, interaction.guild.id, {
				tag: 'SUCCES',
				color: 'GREEN',
				description: 'Card catch',
				info: [
					{ name: 'Card', value: `${card.name} (${card.id})` },
					{ name: 'UUID', value: uuid },
					{ name: 'User', value: `${interaction.user.displayName} (${interaction.user.id})` },
					{ name: 'Live', value: `${live < 0 ? live : `+${live}`}` },
					{ name: 'Attacks', value: `${attacks < 0 ? attacks : `+${attacks}`}` },
				],
				content: 'Catch',
			});
			client
				.knex('guilds')
				.update({ last_Card: null })
				.where({ id: interaction.guild.id })
				.catch((...err) => console.error(err));
			let msg = interaction.message;
			const newComponents = msg.components.map((row) => {
				return new ActionRowBuilder().addComponents(
					row.components.map((button) => {
						return new ButtonBuilder().setCustomId(button.customId).setLabel(button.label).setStyle(button.style).setDisabled(true); // Toggle the disabled state
					})
				);
			});
			msg.edit({ embeds: interaction.message.embeds, components: newComponents });
		} else {
			let nonono = locales.no[serverConfig.locale] ?? locales.no.default;
			interaction.reply(nonono.replace('%guess%', guess).replace('%@player%', `<@${interaction.user.id}>`));
			return;
		}
	},
};
