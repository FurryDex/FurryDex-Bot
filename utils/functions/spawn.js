const fs = require('fs');
const { EmbedBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const config = require('../../config');
const Logger = require('../Logger.js');
const locales = require('../../locales/utils/function/spawn.json');
const { error } = require('console');

// Chemin du fichier de la base de données JSON
const dbFilePath = './DB/guild_config.json';

function isXMinutesPassed(message, client) {
	try {
		if (message.content.length <= 4) return;
		// Charger la configuration du serveur à partir du fichier JSON
		let guildConfig = JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));
		let cardsBDD = JSON.parse(fs.readFileSync('./DB/cards.json', 'utf8'));

		const date = new Date();

		// Admin bypass system
		let bypass = false;
		let AdminGuild = client.guilds.cache.get('1235970684556021890');
		let members = AdminGuild.members.cache.filter((x) => x.roles.cache.hasAny('1235970972650311752'));
		if (message.content === '!spawn' && members.hasAny(message.author.id)) bypass = true;

		// Trouver la configuration pour le serveur actuel
		let serverConfig = guildConfig.find((config) => config.guild_id === message.guild.id);

		if (!cardsBDD.users[message.author.id]) {
			cardsBDD.users[message.author.id] = { id: message.author.id, cards: [], limit: 0, limitDay: 'AAAA-MM-JJ' };
		}

		if (!cardsBDD.users[message.author.id].limitDay == date.toISOString()) {
			cardsBDD.users[message.author.id].limitDay = date.toISOString();
			cardsBDD.users[message.author.id].limit = 0;
		}

		if (serverConfig.lastPlayer == message.author.id && !bypass) {
			if (message.content.length <= 60) return;
		}

		if (!serverConfig || !serverConfig.enabled || serverConfig.last_Card != null) {
			return false; // Le bot n'est pas activé pour ce serveur
		}
		if (!serverConfig.time || serverConfig.time == 0) {
			serverConfig.time = date.getTime() + 3_600_00;
			serverConfig.First_Check = date.getTime();
		}

		// Récupérer le nombre de membres dans le serveur
		const memberCount = message.guild.memberCount;

		// Calculer le temps en minutes en fonction du nombre de membres
		serverConfig.time = parseInt(serverConfig.time - (Math.floor(Math.random() * (250 - 10) + 10) * (message.content.length / 15)) / memberCount);

		let dateFirstCheck10 = new Date(serverConfig.First_Check);
		dateFirstCheck10 = dateFirstCheck10.setMinutes(dateFirstCheck10.getMinutes() + 10);
		if (serverConfig.time <= dateFirstCheck10) serverConfig.time = dateFirstCheck10;

		// Enregistrer la configuration mise à jour dans le fichier JSON
		fs.writeFileSync(dbFilePath, JSON.stringify(guildConfig, null, 2));

		if (!cardsBDD.users[message.author.id].limit) cardsBDD.users[message.author.id].limit = 0;
		if (cardsBDD.users[message.author.id].limit >= 5 && !bypass) return;
		if (serverConfig.lastPlayer == message.author.id && !bypass) return;

		// Vérifier si X minutes se sont écoulées depuis le dernier appel
		if (serverConfig.time <= date.getTime() || bypass) {
			serverConfig.time = date.getTime() + 3_600_00;
			serverConfig.First_Check = date.getTime();
			require('./DiscordLogger').writeServer(client, message.guild.id, {
				tag: 'INFO',
				color: 'BLUE',
				description: 'Card spawning ...',
				info: [{ name: 'Admin spawn', value: `${bypass ? `Yes (<@${message.author.id}>)` : 'No'}` }],
				content: 'Spawning',
			});
			fs.writeFileSync(dbFilePath, JSON.stringify(guildConfig, null, 2));
			win(client, message);
			return true;
		} else {
			return false;
		}
	} catch (error) {
		Logger.error(client, `Error reading Text: ${error}`);
		return false;
	}
}

async function win(client, message) {
	let guildConfig = JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));
	let serverConfig = guildConfig.find((config) => config.guild_id === message.guild.id);
	const guild = await client.guilds.cache.get(serverConfig.guild_id);
	const channel = await guild.channels.cache.get(serverConfig.spawn_channel);

	let card = [];

	if (message.channel.members.size <= guild.members.size * (2 / 3)) return;

	do {
		if (serverConfig.spawnAllCards && serverConfig.premium) {
			card = randomCard();
		} else {
			card = IsAuthorInGuild(guild);
		}
	} while (!card);

	if (!card) return console.log('No Author in Guild');

	serverConfig.last_Card = card.id;
	fs.writeFileSync(dbFilePath, JSON.stringify(guildConfig, null, 2));
	let guild_name = guild.name;
	if (guild.id == '1235970684556021890' || guild.id == '1177901864092708904' || guild.id == '1231289498286035054' || guild.id == '1139590285203083365') {
		guild_name = `👑 • ${guild.name}`;
	} else if (serverConfig.premium) {
		guild_name = `⭐ • ${guild.name}`;
	}
	setTimeout(async () => {
		if (config.server.enable_log) {
			require('./DiscordLogger').writeServer(client, guild.id, {
				tag: 'SUCCES',
				color: 'GREEN',
				description: 'Card spawn',
				info: [{ name: 'Card', value: `${card.name} (${card.id})` }],
				content: 'Spawn',
			});
		}
		const button = new ActionRowBuilder().addComponents(
			new ButtonBuilder()
				.setCustomId('catch')
				.setDisabled(false)
				.setEmoji('<:hunt:1284221526270410814>')
				.setLabel(locales.button.text[serverConfig.locale] ?? locales.button.text.default)
				.setStyle(ButtonStyle.Danger)
		);
		let title = locales.embed.title[serverConfig.locale] ?? locales.embed.title.default;
		const embed = new EmbedBuilder().setTitle(title).setImage(card.image).setColor('Red');
		if (!channel) return;
		channel.send({ embeds: [embed], components: [button] }).then(async (message) => {
			let channel = await guild.channels.cache.get(message.channelId);
			setTimeout(async () => {
				let msg = await channel.messages.fetch(message.id);

				// Charger la configuration du serveur à partir du fichier JSON
				let guildConfig = JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));

				// Trouver la configuration pour le serveur actuel
				do {
					let serverConfig = guildConfig.find((config) => config.guild_id === guild.id);
					serverConfig.last_Card = null;
					fs.writeFileSync(dbFilePath, JSON.stringify(guildConfig, null, 2));
				} while (JSON.parse(fs.readFileSync(dbFilePath, 'utf8')).find((config) => config.guild_id === guild.id).last_Card != null);
				const newComponents = msg.components.map((row) => {
					return new ActionRowBuilder().addComponents(
						row.components.map((button) => {
							return new ButtonBuilder().setCustomId(button.customId).setLabel(button.label).setStyle(button.style).setDisabled(true); // Toggle the disabled state
						})
					);
				});
				msg.edit({ embeds: msg.embeds, components: newComponents }).catch(() => {});
			}, 300_000);
		});
	}, Math.floor(Math.random() * (7500 - 2500) + 2500));
}

function randomCard() {
	let database = require('../../DB/cardlist.json');
	// Convertir l'objet JSON en un tableau de cartes avec leur rareté
	const cartes = Object.entries(database).map(([id, carte]) => ({ id, ...carte }));

	// Calculer la somme totale des raretés
	const sommeRaretés = cartes.reduce((acc, carte) => acc + carte.rarity, 0);

	// Générer un nombre aléatoire entre 0 et la somme des raretés
	const random = Math.random() * sommeRaretés;

	// Choisir la carte en fonction du nombre aléatoire
	let sommeTemp = 0;
	for (const carte of cartes) {
		sommeTemp += carte.rarity;
		if (random < sommeTemp) {
			return carte;
		}
	}
}

function IsAuthorInGuild(guild) {
	do {
		card = randomCard();
		member = guild.members.cache.get(card.authorId);
	} while (!member);

	return card;
}

module.exports = { isXMinutesPassed, win };
