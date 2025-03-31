const { ApplicationCommandOptionType, StringSelectMenuBuilder, ActionRowBuilder, PermissionFlagsBits, MessageFlags } = require('discord.js');
const leaderboard = require('../../selects/mod/leaderboard');

module.exports = {
	name: 'config',
	description: 'base config command',
	permissions: PermissionFlagsBits.Administrator,
	category: 'admin',
	fullyTranslated: true,
	run: (client, message, args) => {},
	options: [
		{
			name: 'enable',
			description: 'enable or disable the card spawn.',
			type: ApplicationCommandOptionType.Subcommand,
			options: [
				{
					name: 'enable',
					description: 'enable or disable the card spawn.',
					type: ApplicationCommandOptionType.String,
					required: true,
					choices: [
						{
							name: 'Enable',
							value: 'true',
						},
						{
							name: 'Disable',
							value: 'false',
						},
					],
				},
			],
		},
		{
			name: 'channel',
			description: 'Channel where card will spawn.',
			type: ApplicationCommandOptionType.Subcommand,
			options: [
				{
					name: 'channel',
					description: 'The channel where card will spawn',
					type: ApplicationCommandOptionType.Channel,
					required: true,
				},
			],
		},
		{
			name: 'locale',
			description: 'Set the base-lang for the server.',
			type: ApplicationCommandOptionType.Subcommand,
			options: [
				{
					name: 'lang',
					description: 'Set the base-lang for the server.',
					type: ApplicationCommandOptionType.String,
					required: true,
					choices: [
						{
							name: 'German',
							value: 'de',
						},
						{
							name: 'English',
							value: 'en-US',
						},
						{
							name: 'Spanish',
							value: 'es',
						},
						{
							name: 'French',
							value: 'fr',
						},
						{
							name: 'Italian',
							value: 'it',
						},
						{
							name: 'Dutch',
							value: 'du',
						},
						{
							name: 'Norwegian',
							value: 'no',
						},
						{
							name: 'Polish',
							value: 'pl',
						},
						{
							name: 'Portugese',
							value: 'pt-BR',
						},
						{
							name: 'Romanian',
							value: 'ro',
						},
						{
							name: 'Finish',
							value: 'fi',
						},
						{
							name: 'Swedish',
							value: 'sv-SE',
						},
						{
							name: 'Bulgarian',
							value: 'bg',
						},
						{
							name: 'Russian',
							value: 'ru',
						},
						{
							name: 'Ukrainian',
							value: 'uk',
						},
						{
							name: 'Chinese',
							value: 'zh-CN',
						},
						{
							name: 'Japanese',
							value: 'ja',
						},
						{
							name: 'Korean',
							value: 'ko',
						},
					],
				},
			],
		},
		{
			name: 'auto-locale',
			description: 'Automatic set the base-lang for the server.',
			type: ApplicationCommandOptionType.Subcommand,
		},
		{
			name: 'leaderboard_channel',
			description: 'Set the channel for the leaderboard.',
			type: ApplicationCommandOptionType.Subcommand,
			options: [
				{
					name: 'channel',
					description: 'The channel where card will spawn',
					type: ApplicationCommandOptionType.Channel,
					required: true,
				},
			],
		},
		{
			name: 'leaderboard',
			description: 'Set the different leaderboards to show.',
			type: ApplicationCommandOptionType.Subcommand,
		},
		{
			name: 'leaderboard_edit',
			description: 'Replace the leaderboard message instead of send another one.',
			type: ApplicationCommandOptionType.Subcommand,
			options: [
				{
					name: 'enable',
					description: 'Enable or disable the leaderboard edit function.',
					type: ApplicationCommandOptionType.String,
					required: true,
					choices: [
						{
							name: 'Enable',
							value: 'true',
						},
						{
							name: 'Disable',
							value: 'false',
						},
					],
				},
			],
		},
	],
	runSlash: async (client, interaction) => {
		const subcommand = interaction.options.getSubcommand();

		await interaction.deferReply();
		const locales = client.locales.commands.config;
		let serverConfig = await client
			.knex('guilds')
			.first('*')
			.where({ id: interaction.guild.id })
			.catch((err) => console.error(err));

		if (!serverConfig) {
			await client.knex('guilds').insert({
				id: interaction.guild.id,
			});
			serverConfig = await client
				.knex('guilds')
				.first('*')
				.where({ id: interaction.guild.id })
				.catch((err) => console.error(err));
		}

		if (subcommand == 'enable') {
			let guild = await client.guilds.cache.get(interaction.guild.id);
			let channel = await guild.channels.cache.get(serverConfig.spawn_channel);
			if (!channel) {
				client
					.knex('guilds')
					.update({ enabled: interaction.options.getString('enable') == 'true' ? true : false })
					.where({ id: interaction.guild.id })
					.catch((err) => console.error(err));
			} else {
				return interaction.editReply('Cannot enable bot if the channel is not set, use `/config channel <channel>`');
			}
			let message = locales.run.changedEna[interaction.locale] ?? locales.run.changedEna.default;
			interaction.editReply(message.replace('%enable%', interaction.options.getString('enable') == 'true' ? 'Enable' : 'Disable'));
		}
		if (subcommand == 'channel') {
			await client
				.knex('guilds')
				.update({ spawn_channel: interaction.options.getChannel('channel').id })
				.where({ id: interaction.guild.id })
				.catch((err) => console.error(err));
			let message = locales.run.changedChan[interaction.locale] ?? locales.run.changedChan.default;
			interaction.editReply(message.replace('%channel%', interaction.options.getChannel('channel').name));
		}
		if (subcommand == 'locale') {
			await client
				.knex('guilds')
				.update({ locale: interaction.options.getString('lang') })
				.where({ id: interaction.guild.id })
				.catch((err) => console.error(err));
			let message = locales.run.changed[interaction.locale] ?? locales.run.changed.default;
			interaction.editReply(message.replace('%lang%', interaction.options.getString('lang')));
		}
		if (subcommand == 'auto-locale') {
			let guild = client.guilds.cache.get(interaction.guild.id);
			let local = '';
			if (guild.preferredLocale) {
				local = guild.preferredLocale;
			} else {
				local = interaction.locale;
			}
			await client
				.knex('guilds')
				.update({ locale: local })
				.where({ id: interaction.guild.id })
				.catch((err) => console.error(err));
			let message = locales.run.changed[interaction.locale] ?? locales.run.changed.default;
			interaction.editReply(message.replace('%lang%', local));
		}
		if (subcommand == 'leaderboard_channel') {
			await client
				.knex('guilds')
				.update({ leaderboard_channel: interaction.options.getChannel('channel').id })
				.where({ id: interaction.guild.id })
				.catch((err) => console.error(err));
			let message = locales.run.changedLeaderChan[interaction.locale] ?? locales.run.changedLeaderChan.default;
			interaction.editReply(message.replace('%channel%', interaction.options.getChannel('channel').name));
		}
		if (subcommand == 'leaderboard') {
			let option = JSON.parse(
				await client
					.knex('guilds')
					.update({ leaderboard: JSON.stringify(interaction.values) })
					.where({ id: interaction.guild.id })
					.catch((err) => console.log(err))
			);
			const row = new ActionRowBuilder().addComponents(
				new StringSelectMenuBuilder()
					.setCustomId('leaderboard')
					.setPlaceholder('Select different leaderboards to show')
					.addOptions([
						{ label: `1. Cards completion Leaderboard`, value: `1`, default: option.has('1') },
						{ label: `2. Cards Leaderboard`, value: `2`, default: option.has('2') },
						{ label: `3. Global Cards completion Leaderboard`, value: `3`, default: option.has('3') },
						{ label: `4. Global Cards Leaderboard`, value: `4`, default: option.has('4') },
					])
					.setMaxValues(4)
					.setMinValues(0)
			);

			await interaction.editReply({ content: 'Please select different leaderboards to show:', components: [row], flags: MessageFlags.Ephemeral });
		}

		if (subcommand == 'leaderboard_edit') {
			let guild = await client.guilds.cache.get(interaction.guild.id);
			let channel = await guild.channels.cache.get(serverConfig.leaderboard_edit);
			if (!channel) {
				client
					.knex('guilds')
					.update({ leaderboard_edit: interaction.options.getString('enable') == 'true' ? true : false })
					.where({ id: interaction.guild.id })
					.catch((err) => console.error(err));
			} else {
				return interaction.editReply('Cannot enable leaderboard if the channel is not set, use `/config leaderboard_channel <channel>`');
			}
			let message = locales.run.changedLeaderEna[interaction.locale] ?? locales.run.changedLeaderEna.default;
			interaction.editReply(message.replace('%enable%', interaction.options.getString('enable') == 'true' ? 'Enable' : 'Disable'));
		}
	},
};
