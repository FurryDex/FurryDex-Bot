import { ButtonBuilder, ActionRowBuilder, Guild, Message, ModalSubmitInteraction } from 'discord.js';
import { FDClient } from '../../bot';
const uid = function () {
	return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
module.exports = {
	name: 'catch',
	async run(client: FDClient, interaction: ModalSubmitInteraction) {
		const guess = interaction.fields.getTextInputValue('guess').toLowerCase();
		const locales = client.locales.modals.catch;
		let serverConfig = await client
			.knex('guilds')
			.first('*')
			.where({ id: (interaction.guild as Guild).id })
			.catch((err: any) => console.error(err));
		if (serverConfig.last_Card == null) {
			let message = locales.already[serverConfig.locale] ?? locales.already.default;
			interaction.reply(message.replace('%@player%', `<@${interaction.user.id}>`));
			return;
		}

		let card = await client
			.knex('cards')
			.first('*')
			.where({ id: serverConfig.last_Card })
			.catch((err: any) => console.error(err));

		if (card.possible_name.includes(guess)) {
			let live = Math.round(Math.floor(Math.random() * (25 - -25)) + -25);
			let attacks = Math.round(Math.floor(Math.random() * (25 - -25)) + -25);
			let glitchCard = Math.random() > 0.999;
			let hasGlitchCard = await client
				.knex('user_cards')
				.first('*')
				.where({ user_id: interaction.user.id, card_id: 19 })
				.catch((err: any) => console.error(err));
			if (glitchCard && !hasGlitchCard) {
				live = 0;
				attacks = 0;
				serverConfig.last_Card = 19;
			}
			let uuid = uid();
			let user = await client
				.knex('users')
				.first('*')
				.where({ id: interaction.user.id })
				.catch((err: any) => console.error(err));

			if (!user) {
				client
					.knex('users')
					.insert({ user_id: interaction.user.id })
					.catch((err: any) => console.error(err));
			}
			client
				.knex('user_cards')
				.insert({
					id: uuid,
					user_id: interaction.user.id,
					card_id: serverConfig.last_Card,
					guild: (interaction.guild as Guild).id,
					date: new Date().toISOString(),
					live: `${live < 0 ? live : `+${live}`}`,
					attacks: `${attacks < 0 ? attacks : `+${attacks}`}`,
				})
				.catch((err: any) => console.error(err));
			let message = locales.congrat[serverConfig.locale] ?? locales.congrat.default;
			interaction.reply(
				message
					.replace('%cardEmoji%', card.emoji)
					.replace('%cardName%', card.name)
					.replace('%cardId%', `${uuid}, ${live < 0 ? live : `+${live}`}%/${attacks < 0 ? attacks : `+${attacks}`}%`)
					.replace('%@player%', `<@${interaction.user.id}>`)
			);
			require('../../utils/functions/DiscordLogger.ts').writePlayer(client, interaction.user.id, {
				tag: 'SUCCES',
				color: 'GREEN',
				description: 'Card catch',
				info: [
					{ name: 'Card', value: `${card.name} (${card.id})` },
					{ name: 'UUID', value: uuid },
					{ name: 'Guild', value: `${(interaction.guild as Guild).name} (${(interaction.guild as Guild).id})` },
					{ name: 'Live', value: `${live < 0 ? live : `+${live}`}` },
					{ name: 'Attacks', value: `${attacks < 0 ? attacks : `+${attacks}`}` },
				],
				content: 'Catch',
			});
			require('../../utils/functions/DiscordLogger.ts').writeServer(client, (interaction.guild as Guild).id, {
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
				.where({ id: (interaction.guild as Guild).id })
				.catch((err: any) => console.error(err));
			let msg = interaction.message as Message;
			const newComponents = msg.components.map((row: any) => {
				return new ActionRowBuilder<ButtonBuilder>().addComponents(
					row.components.map((button: any) => {
						return new ButtonBuilder().setCustomId(button.customId).setLabel(button.label).setStyle(button.style).setDisabled(true); // Toggle the disabled state
					})
				);
			});

			client
				.knex('anti-cheat_messages')
				.update({ userCard: interaction.user.id })
				.where({ spawnMessage: (interaction.message as Message).id })
				.catch((err: any) => console.error(err));
			msg.edit({ embeds: (interaction.message as Message).embeds, components: newComponents });
		} else {
			let nonono = locales.no[serverConfig.locale] ?? locales.no.default;
			interaction.reply(nonono.replace('%guess%', guess).replace('%@player%', `<@${interaction.user.id}>`));
			return;
		}
	},
};
