const { StringSelectMenuBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuOptionBuilder } = require('discord.js');
const fs = require('fs');
const locales = require('../../locales/commands/furries.json');

module.exports = {
	name: 'next_x_x_y',
	run: async (client, interaction) => {
		let user = interaction.options.getUser('user') ?? interaction.user;
		let user_cards = await client
			.knex('user_cards')
			.select('*')
			.where({ user_id: user.id })
			.catch((err) => {
				console.error(err);
			});
		const args = interaction.customId.toString().split('_');
		args.shift();
		const userId = args[0];

		AllOptions = [];
		user_cards.forEach(async (card, key) => {
			let date = new Date(card.date);
			cd = (num) => num.toString().padStart(2, 0);
			let description = locales.run.list[interaction.locale] ?? locales.run.list.default;
			let card_info = await client
				.knex('cards')
				.select('*')
				.where({ id: card.card_id })
				.catch((err) => {
					console.error(err);
				});
			AllOptions.push({
				label: `(#${card.id}) ${card_info.name}`,
				value: `${card.id}`,
				emoji: `${card_info.emoji}`,
				description: description
					.replace('%attacks%', card.attacks)
					.replace('%live%', card.live)
					.replace('%date%', `${cd(date.getDate())}/${cd(date.getMonth())}/${cd(date.getFullYear())} ${cd(date.getHours())}H${cd(date.getMinutes())}`),
			});
			if (user_cards.length == key + 1) {
				sendMenu(AllOptions, interaction, userId, true, args[1], 25, args[2]);
			}
		});
	},
};

function hasCard(userCards, wantedId) {
	let yes = false;
	userCards.forEach((card) => {
		if (card.cardid == wantedId) {
			yes = true;
		}
	});
	if (yes) return true;
	else return false;
}

async function sendMenu(options, interaction, id, edit = false, page = 0, chunkSize = 25, customId) {
	const chunkedOptions = chunkArray(options, chunkSize);
	const currentOptions = chunkedOptions[page];

	const row = new ActionRowBuilder().addComponents(new StringSelectMenuBuilder().setCustomId(customId).setPlaceholder('Select a card').addOptions(currentOptions));

	const buttonRow = new ActionRowBuilder().addComponents(
		new ButtonBuilder()
			.setCustomId(`prev_${id}_${Number(page) - 1}_{${customId}}`)
			.setLabel('«')
			.setStyle(page == 0 ? ButtonStyle.Primary : ButtonStyle.Danger)
			.setDisabled(page == 0),
		new ButtonBuilder()
			.setCustomId(`nothing`)
			.setLabel(`${Number(page) + 1}`)
			.setStyle(ButtonStyle.Success)
			.setDisabled(chunkedOptions.length == 1),
		new ButtonBuilder()
			.setCustomId(`next_${id}_${Number(page) + 1}_{${customId}}`)
			.setLabel('»')
			.setStyle(page == chunkedOptions.length - 1 ? ButtonStyle.Primary : ButtonStyle.Danger)
			.setDisabled(page == chunkedOptions.length - 1)
	);

	if (!edit) {
		await interaction.reply({ content: 'Please select a card:', components: [row, buttonRow] });
	} else {
		await interaction.update({ components: [row, buttonRow] });
	}
}

// carte / carteTotal * 100
function chunkArray(array, chunkSize = 25) {
	const chunks = [];
	for (let i = 0; i < array.length; i += chunkSize) {
		chunks.push(array.slice(i, i + chunkSize));
	}
	return chunks;
}
