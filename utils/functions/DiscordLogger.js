const { EmbedBuilder, ThreadAutoArchiveDuration } = require('discord.js');
const config = require('../../config');

const categoryList = { other: '1284433127095140444', player: '1284433157168562237', server: '1284433198629126198' };
const dbFilePath = './DB/guild_config.json';
const CardsFilePath = './DB/cards.json';
const fs = require('fs');
async function write(client, destination, embed) {
	let color = require('../colors.json').find((x) => x.name == embed.color.toUpperCase());

	let logEmbed = new EmbedBuilder()
		.setTitle(`[${embed.tag}] ${embed.content}`)
		.setColor(color.hex)
		.setDescription(embed.description || ' ')
		.setFields(embed.info)
		.setTimestamp();
	const logGuild = await client.guilds.cache.get(config.server.ID);
	const category = await logGuild.channels.cache.get(categoryList[destination.category]);
	const channel = await category.threads.cache.get(destination.channel);
	channel.send({ embeds: [logEmbed] });
}

async function writePlayer(client, playerId, embed) {
	let color = require('../colors.json').find((x) => x.name == embed.color.toUpperCase());

	let cardsDb = JSON.parse(fs.readFileSync(CardsFilePath, 'utf8'));
	let userDb = cardsDb.users[playerId];
	const user = await client.users.cache.get(playerId);

	if (!userDb.premium) userDb.premium = false;

	const logGuild = await client.guilds.cache.get(config.server.ID);
	const category = await logGuild.channels.cache.get(categoryList['player']);

	let playerEmbed = new EmbedBuilder()
		.setTitle(`${user.displayName} (${playerId})`)
		.setColor('Orange')
		.setDescription(`Log from the serveur \`${user.displayName}\` for furry dex`)
		.setFields([
			{
				name: '[FD] Premium',
				value: `${userDb.premium ? 'Yes' : 'No'}`,
			},
			{
				name: '[FD] Cards',
				value: `${(userDb.cards ?? []).length} cards`,
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

	let channel = await category.threads.cache.get(userDb.logChannel);

	if (!userDb.logChannel || !channel) {
		await category.threads
			.create({
				name: `${user.displayName} (${playerId})`,
				autoArchiveDuration: ThreadAutoArchiveDuration.OneWeek,
				message: {
					content: 'Initialising...',
				},
			})
			.then((log) => {
				userDb.logChannel = log.id;
				fs.writeFileSync(CardsFilePath, JSON.stringify(cardsDb, null, 2));
			})
			.catch((err) => console.log(err));
	}

	channel = await category.threads.cache.get(userDb.logChannel);
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
	let color = require('../colors.json').find((x) => x.name == embed.color.toUpperCase());

	let guildConfig = JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));
	let serverConfig = guildConfig.find((config) => config.guild_id === serverId);
	const guild = await client.guilds.cache.get(serverId);

	const logGuild = await client.guilds.cache.get(config.server.ID);
	const category = await logGuild.channels.cache.get(categoryList['server']);

	let guildEmbed = new EmbedBuilder()
		.setTitle(`${guild.name} (${serverId})`)
		.setColor('Orange')
		.setDescription(`Log from the serveur \`${guild.name}\` for furry dex`)
		.setFields([
			{
				name: '[FD] Enable',
				value: `${serverConfig.enabled ? 'Yes' : 'No'}`,
			},
			{
				name: '[FD] Premium',
				value: `${serverConfig.premium ? 'Yes' : 'No'}`,
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

	let channel = await category.threads.cache.get(serverConfig.logChannel);

	if (!serverConfig.logChannel || !channel) {
		await category.threads
			.create({
				name: `${guild.name} (${serverId})`,
				autoArchiveDuration: ThreadAutoArchiveDuration.OneWeek,
				message: {
					content: 'Initialising...',
				},
			})
			.then((log) => {
				serverConfig.logChannel = log.id;
				fs.writeFileSync(dbFilePath, JSON.stringify(guildConfig, null, 2));
			})
			.catch((err) => console.log(err));
	}

	channel = await category.threads.cache.get(serverConfig.logChannel);
	if (!channel) return;
	let message = await channel.fetchStarterMessage();
	message.edit({ content: 'Log', embeds: [guildEmbed] });

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
