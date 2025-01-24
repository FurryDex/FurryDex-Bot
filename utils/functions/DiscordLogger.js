const { EmbedBuilder, ThreadAutoArchiveDuration } = require('discord.js');
let knex_channel, type;

const categoryList = client.config.log.category;

async function write(client, destination, embed) {
	if (!client.config.log.enable) return;
	let color = require('../colors.json').find((x) => x.name == embed.color.toUpperCase());

	let logEmbed = new EmbedBuilder()
		.setTitle(`[${embed.tag}] ${embed.content}`)
		.setColor(color.hex)
		.setDescription(embed.description || ' ')
		.setFields(embed.info)
		.setTimestamp();
	const logGuild = await client.guilds.cache.get(config.server.ID);
	const category = await logGuild.channels.cache.get(categoryList[destination.category.forum]);
	const channel = await category.threads.cache.get(destination.channel);
	channel.send({ embeds: [logEmbed] });
}

async function writePlayer(client, playerId, embed) {
	if (!client.config.log.enable) return;
	playerId = playerId.toString();

	knex_channel = client.config.log.data;

	let color = require('../colors.json').find((x) => x.name == embed.color.toUpperCase());

	let userDb = await client
		.knex('users')
		.first('*')
		.where({ id: playerId })
		.catch((err) => console.error(err));
	let cardsDb = await client
		.knex('user_cards')
		.select('*')
		.where({ user_id: playerId })
		.catch((err) => console.error(err));
	const user = await client.users.cache.get(playerId);
	const logGuild = await client.guilds.cache.get(client.config.bot.guild);
	const category = await logGuild.channels.cache.get(categoryList['player']);

	let playerEmbed = new EmbedBuilder()
		.setTitle(`${user.displayName} (${playerId})`)
		.setColor('Orange')
		.setDescription(`Log from the player \`${user.displayName}\` for furry dex`)
		.setFields([
			{
				name: '[FD] Premium',
				value: `${userDb.premium == 1 ? 'Yes' : 'No'}`,
			},
			{
				name: '[FD] Cards',
				value: `${(cardsDb ?? []).length} cards`,
			},
			{
				name: 'Created at',
				value: `<t:${user.createdTimestamp}:F>`,
			},
			{
				name: 'Mention',
				value: `<@${user.id}>`,
			},
		])
		.setTimestamp();

	let channel = await category.threads.cache.get(userDb[knex_channel]);

	if (!userDb[knex_channel] || !channel) {
		await category.threads
			.create({
				name: `${client.config.log.prefix}${user.displayName} (${playerId})`,
				autoArchiveDuration: ThreadAutoArchiveDuration.OneWeek,
				message: {
					content: 'Initialising...',
				},
			})
			.then((log) => {
				client
					.knex('users')
					.update({ [knex_channel]: log.id })
					.where({ id: playerId })
					.catch((err) => console.error(err));
			})
			.catch((err) => console.log(err));
	}

	userDb = await client
		.knex('users')
		.first('*')
		.where({ id: playerId })
		.catch((err) => console.error(err));
	do {
		channel = await category.threads.cache.get(userDb[knex_channel]);
	} while (!channel);
	let message = await channel.fetchStarterMessage();
	message.edit({ content: 'Log', embeds: [playerEmbed] });

	let logEmbed = new EmbedBuilder()
		.setTitle(`[${embed.tag}] ${embed.content}`)
		.setColor(color.hex)
		.setDescription(embed.description || ' ')
		.setFields(embed.info)
		.setTimestamp();
	channel.send({ embeds: [logEmbed] });
}

async function writeServer(client, serverId, embed) {
	if (!client.config.log.enable) return;

	knex_channel = client.config.log.data;

	let color = require('../colors.json').find((x) => x.name == embed.color.toUpperCase());

	let serverConfig = await client
		.knex('guilds')
		.first('*')
		.where({ id: serverId })
		.catch((err) => console.error(err));
	let cardsDb = await client
		.knex('user_cards')
		.select('*')
		.where({ guild: serverId })
		.catch((err) => console.error(err));
	const guild = await client.guilds.cache.get(serverId);

	const logGuild = await client.guilds.cache.get(client.config.bot.guild);
	const category = await logGuild.channels.cache.get(categoryList['server']);

	let guildEmbed = new EmbedBuilder()
		.setTitle(`${guild.name} (${serverId})`)
		.setColor('Orange')
		.setDescription(`Log from the guild \`${guild.name}\` for furry dex`)
		.setFields([
			{
				name: '[FD] Enable',
				value: `${serverConfig.enabled == 1 ? 'Yes' : 'No'}`,
			},
			{
				name: '[FD] Premium',
				value: `${serverConfig.premium == 1 ? 'Yes' : 'No'}`,
			},
			{
				name: '[FD] Cards',
				value: `${(cardsDb ?? []).length} cards`,
			},
			{
				name: 'Created at',
				value: `<t:${guild.createdTimestamp}:F>`,
			},
			{
				name: 'Joined at',
				value: `<t:${guild.joinedTimestamp}:F>`,
			},
			{
				name: 'Owner',
				value: `<@${guild.ownerId}>`,
			},
			{
				name: 'Member count',
				value: `${guild.memberCount}`,
			},
		])
		.setTimestamp();

	let channel = await category.threads.cache.get(serverConfig[knex_channel]);

	if (!serverConfig[knex_channel] || !channel) {
		await category.threads
			.create({
				name: `${client.config.log.prefix}${guild.name} (${serverId})`,
				autoArchiveDuration: ThreadAutoArchiveDuration.OneWeek,
				message: {
					content: 'Initialising...',
				},
			})
			.then((log) => {
				client
					.knex('guilds')
					.update({ [knex_channel]: log.id })
					.where({ id: serverId })
					.catch((err) => console.error(err));
			})
			.catch((err) => console.log(err));
	}

	serverConfig = await client
		.knex('guilds')
		.first('*')
		.where({ id: serverId })
		.catch((err) => console.error(err));

	do {
		channel = await category.threads.cache.get(serverConfig[knex_channel]);
	} while (!channel);
	let message = await channel.fetchStarterMessage();

	message.edit({ content: `Log`, embeds: [guildEmbed] });

	let logEmbed = new EmbedBuilder()
		.setTitle(`[${embed.tag}] ${embed.content}`)
		.setColor(color.hex)
		.setDescription(embed.description || ' ')
		.setFields(embed.info)
		.setTimestamp();
	channel.send({ embeds: [logEmbed] });
}

//{ category: "other", channel: "1284433362307780658" },
//{ tag: tag, color: bgTagColor, description: "", info: {}, content: content }

module.exports = { write, writePlayer, writeServer };
