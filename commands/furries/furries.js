const { ApplicationCommandOptionType, StringSelectMenuBuilder, ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const fs = require('fs');
const locales = require('../../locales/commands/furries.json');

module.exports = {
	name: 'furries',
	description: 'base furry command',
	category: 'furries',
	fullyTranslated: true,
	permissions: null,
	run: (client, message, args) => {},
	options: [
		{
			name: 'list',
			description: 'List your furries cards.',
			type: ApplicationCommandOptionType.Subcommand,
			options: [
				{
					name: 'user',
					description: "The user who you wan't to see card",
					required: false,
					type: ApplicationCommandOptionType.User,
				},
			],
		},
		{
			name: 'completion',
			description: 'Show your current completion of the Furries Dex.',
			type: ApplicationCommandOptionType.Subcommand,
			options: [
				{
					name: 'user',
					description: "The user who you wan't to see completion",
					required: false,
					type: ApplicationCommandOptionType.User,
				},
				{
					name: 'category',
					description: 'The category completion',
					required: false,
					type: ApplicationCommandOptionType.String,
					choices: [
						{ name: 'Normal', value: '1' },
						{ name: 'Classic', value: '2' },
						{ name: 'Special', value: '3' },
						{ name: 'Furry Dex', value: '4' },
						{ name: 'Furry Dex Special', value: '5' },
						{ name: 'Director', value: '6' },
						{ name: 'Tiktok', value: '7' },
						{ name: 'Instagram', value: '8' },
						{ name: 'Celebration', value: '9' },
						{ name: 'Youtube', value: '10' },
						{ name: 'Twitch', value: '11' },
						{ name: 'Musicien', value: '12' },
					],
				},
			],
		},
		{
			name: 'last',
			description: 'Display info of your or another users last caught card.',
			type: ApplicationCommandOptionType.Subcommand,
		},
		{
			name: 'give',
			description: 'Give a card to a user.',
			type: ApplicationCommandOptionType.Subcommand,
			options: [
				{
					name: 'give-to',
					description: "The user who you wan't to give a card",
					required: true,
					type: ApplicationCommandOptionType.User,
				},
			],
		},
		{
			name: 'count',
			description: 'Count how many card you have.',
			type: ApplicationCommandOptionType.Subcommand,
			options: [
				{
					name: 'user',
					description: "The user who you wan't to know the number of card",
					required: false,
					type: ApplicationCommandOptionType.User,
				},
			],
		},
		{
			name: 'info',
			//nameLocalizations: locales.options[5].name,
			description: 'Display info from a specific card.',
			//descriptionLocalizations: locales.options[5].description,
			type: ApplicationCommandOptionType.Subcommand,
		},
		{
			name: 'favorite',
			//nameLocalizations: locales.options[6].name,
			description: 'Set a card to favorite.',
			//descriptionLocalizations: locales.options[6].description,
			type: ApplicationCommandOptionType.Subcommand,
		},
	],
	runSlash: async (client, interaction) => {
		await interaction.deferReply();
		const subcommand = interaction.options.getSubcommand();
		let user = interaction.options.getUser('user') ?? interaction.user;
		let user_cards = await client
			.knex('user_cards')
			.select('*')
			.where({ user_id: user.id })
			.catch((err) => {
				console.error(err);
			});
		let allCards = await client
			.knex('cards')
			.select('*')
			.catch((err) => {
				console.error(err);
			});

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
				.insert({ user_id: interaction.user.id })
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
				.setDescription(`Sorry, but you need to accept the ToS for continue !\n\nLegal Documents (ToS & Privacy policy): https://flyzar73.github.io/legal/ \nBy clicking on "Accept", you accept the ToS`)
				.setColor('Green');

			const buttonRow = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId(`accept-tos`).setLabel('Accept').setStyle(ButtonStyle.Primary));

			interaction.editReply({ embeds: [embed], components: [buttonRow], ephemeral: true });

			return;
		}

		if (subcommand == 'list') {
			if (user_cards.length == 0) return interaction.editReply({ content: locales.run['no-furry'][interaction.locale] ?? locales.run['no-furry'].default, ephemeral: true });
			AllOptions = [];
			user_cards.forEach(async (card, key) => {
				let date = new Date(card.date);
				cd = (num) => num.toString().padStart(2, 0);
				let description = locales.run.list[interaction.locale] ?? locales.run.list.default;
				let card_info = await client
					.knex('cards')
					.first('*')
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
					sendMenu(AllOptions, interaction, user.id, false, 0, 25, 'cards');
				}
			});
		} else if (subcommand == 'completion') {
			let category = interaction.options.getString('category') ?? '';
			if (category) {
				allCards = await client
					.knex('cards')
					.select('*')
					.where({ category: category })
					.catch((err) => {
						console.error(err);
					});
				if (allCards.length == 0) {
					const embed = new EmbedBuilder().setTitle(`Furry Dex Completion`).setDescription(`There no card in this category`).setColor('#FF9700').setTimestamp();
					interaction.editReply({ embeds: [embed] });
				}
			}
			let havedCards = [];
			let notHavedCards = [];
			let cards = 0;
			allCards.forEach(async (card, key) => {
				let user_this_cards = await client
					.knex('user_cards')
					.select('*')
					.where({ card_id: card.id, user_id: user.id })
					.catch((err) => {
						console.error(err);
					});
				if (user_this_cards.length != 0) {
					havedCards.push({ id: card.id, emoji: card.emoji, number: user_this_cards.length });
				} else {
					notHavedCards.push({ id: card.id, emoji: card.emoji });
				}
				cards++;
				if (allCards.length == key + 1) {
					const embed = new EmbedBuilder()
						.setTitle(`Furry Dex Completion`)
						.setDescription(
							`Dex of <@${user.id}>\nFurries Dex progression: *${Math.round((havedCards.length / cards) * 100)}%*\n\n__**Owned Furries Cards**__\n${havedCards
								.map((card) => `${card.emoji} ${card.number == 1 ? '' : `x ${card.number}`}`)
								.join(' ')}\n\n__**Missing Furries Cards**__\n${notHavedCards.map((card) => card.emoji).join(' ')}`
						)
						.setColor('#FF9700')
						.setTimestamp();
					interaction.editReply({ embeds: [embed] });
				}
			});
		} else if (subcommand == 'count') {
			if (user_cards.length == 0) return interaction.editReply({ content: locales.run['no-furry'][interaction.locale] ?? locales.run['no-furry'].default, ephemeral: true });
			return interaction.editReply({ content: `The deck got \`%number%\` cards`.replace('%number%', user_cards.length) });
		} else if (subcommand == 'give') {
			if (user_cards.length == 0) return interaction.editReply({ content: locales.run['no-furry'][interaction.locale] ?? locales.run['no-furry'].default, ephemeral: true });
			let giveTo = interaction.options.getUser('give-to');
			AllOptions = [];
			user_cards.forEach(async (card, key) => {
				let date = new Date(card.date);
				cd = (num) => num.toString().padStart(2, 0);
				let description = locales.run.list[interaction.locale] ?? locales.run.list.default;
				let card_info = await client
					.knex('cards')
					.first('*')
					.where({ id: card.card_id })
					.catch((err) => {
						console.error(err);
					});
				AllOptions.push({
					label: `(#${card.id}) ${card_info.name}`,
					value: `${card.id}_${giveTo.id}`,
					emoji: `${card_info.emoji}`,
					description: description
						.replace('%attacks%', card.attacks)
						.replace('%live%', card.live)
						.replace('%date%', `${cd(date.getDate())}/${cd(date.getMonth())}/${cd(date.getFullYear())} ${cd(date.getHours())}H${cd(date.getMinutes())}`),
				});
				if (user_cards.length == key + 1) {
					sendMenu(AllOptions, interaction, user.id, false, 0, 25, 'giveTo');
				}
			});
		} else {
			return interaction.editReply({
				content: 'Sorry, this *command* is disable. Er0r: 403',
				ephemerel: true,
			});
		}
	},
};

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
		await interaction.editReply({ content: 'Please select a card:', components: [row, buttonRow] });
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

//(3 - card.rarity) * 10
