const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');
const cardFilePath = './DB/cards.json';

module.exports = {
	name: 'generate-id',
	description: 'Generate an ID for card',
	category: 'admin',
	permissions: PermissionFlagsBits.Administrator,
	ownerOnly: true,
	run: (client, message, args) => {},
	options: [
		{
			name: 'card',
			description: 'cardId',
			type: ApplicationCommandOptionType.String,
			required: true,
		},
		{
			name: 'user',
			description: 'user',
			type: ApplicationCommandOptionType.User,
			required: false,
		},
		{
			name: 'date',
			description: 'date',
			type: ApplicationCommandOptionType.String,
			required: false,
		},
		{
			name: 'guild',
			description: 'guildId',
			type: ApplicationCommandOptionType.String,
			required: false,
		},
		{
			name: 'live',
			description: 'live',
			type: ApplicationCommandOptionType.String,
			required: false,
		},
		{
			name: 'attacks',
			description: 'attacks',
			type: ApplicationCommandOptionType.String,
			required: false,
		},
	],
	runSlash: (client, interaction) => {
		let cardId = client.guilds.cache.get(interaction.options.getString('card'));
		let user = interaction.options.getUser('user') ?? interaction.user;
		let dateOption = interaction.options.getString('date') ?? new Date();
		let guild = client.guilds.cache.get(interaction.options.getString('guild')) ?? interaction.guild;
		let live = client.guilds.cache.get(interaction.options.getString('live')) ?? Math.round(Math.floor(Math.random() * (25 - -25)) + -25);
		let attacks = client.guilds.cache.get(interaction.options.getString('attacks')) ?? Math.round(Math.floor(Math.random() * (25 - -25)) + -25);
		let date = new Date(dateOption).toISOString();

		const uid = function () {
			return date.toString(36) + Math.random().toString(36).substr(2);
		};

		knex('user_cards')
			.insert({ id: uid(), user_id: user.id, card_id: cardId, guild: guild, date: date, live: live, attacks: attacks })
			.catch((...err) => console.error(err));
	},
};
