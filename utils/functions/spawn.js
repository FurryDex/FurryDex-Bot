const { EmbedBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const config = require('../../config');
const Logger = require('../Logger.js');
const locales = require('../../locales/utils/function/spawn.json');

async function isXMinutesPassed(message, client) {
	try {
		if (message.content.length <= 3) return;
		const date = new Date();

		// Admin bypass system
		let bypass = false;
		let AdminGuild = client.guilds.cache.get('1235970684556021890');
		let members = AdminGuild.members.cache.filter((x) => x.roles.cache.hasAny('1235970972650311752'));
		if (message.content === '!spawn' && members.hasAny(message.author.id)) bypass = true;

		// Trouver la configuration pour le serveur actuel
		let serverConfig = await client
			.knex('guilds')
			.first('*')
			.where({ id: message.guild.id })
			.catch((...err) => console.error(err));
		let user = await client
			.knex('users')
			.first('*')
			.where({ id: message.author.id })
			.catch((...err) => console.error(err));

		if (!user) {
			client
				.knex('users')
				.insert({ id: message.author.id })
				.catch((...err) => console.error(err));
		}

		if (!serverConfig || !serverConfig.enabled || serverConfig.last_Card != null) {
			return false; // Le bot n'est pas activé pour ce serveur
		}

		let in1Hour = new Date();
		in1Hour.setHours(in1Hour.getHours() + 1);

		if (!serverConfig.time || serverConfig.time == 0) {
			client
				.knex('guilds')
				.update({ time: in1Hour.toISOString(), First_Check: new Date().getTime() })
				.where({ id: message.guild.id })
				.catch((...err) => console.error(err));
		}

		serverConfig = await client
			.knex('guilds')
			.first('*')
			.where({ id: message.guild.id })
			.catch((...err) => console.error(err));

		// Récupérer le nombre de membres dans le serveur
		const memberCount = message.guild.memberCount;

		// Calculer le temps en minutes en fonction du nombre de membres
		//serverConfig.time = parseInt(serverConfig.time - (Math.floor(Math.random() * (250 - 10) + 10) * (message.content.length / 15)) / memberCount); //FIXME Don't calculate the good time

		let dateFirstCheck10 = new Date(serverConfig.First_Check);
		dateFirstCheck10.setMinutes(dateFirstCheck10.getMinutes() + 10);
		if (serverConfig.time <= dateFirstCheck10)
			client
				.knex('guilds')
				.update({ time: dateFirstCheck10 })
				.where({ id: message.guild.id })
				.catch((...err) => console.error(err));

		serverConfig = await client
			.knex('guilds')
			.first('*')
			.where({ id: message.guild.id })
			.catch((...err) => console.error(err));

		// Vérifier si X minutes se sont écoulées depuis le dernier appel
		if (new Date(serverConfig.time).getTime() <= date.getTime() || bypass) {
			client
				.knex('guilds')
				.update({ time: in1Hour.toISOString(), First_Check: new Date().getTime() })
				.where({ id: message.guild.id })
				.catch((...err) => console.error(err));
			require('./DiscordLogger').writeServer(client, message.guild.id, {
				tag: 'INFO',
				color: 'BLUE',
				description: 'Card spawning ...',
				info: [
					{ name: 'Admin spawn', value: `${bypass ? `Yes` : 'No'}` },
					{ name: 'User', value: `<@${message.author.id}> (${message.author.id})` },
				],
				content: 'Spawning',
			});
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
	let serverConfig = await client
		.knex('guilds')
		.first('*')
		.where({ id: message.guild.id })
		.catch((...err) => console.error(err));
	const guild = await client.guilds.cache.get(message.guild.id);
	const channel = await guild.channels.cache.get(serverConfig.spawn_channel);

	let card = [];

	if (message.channel.members.size <= guild.members.size * (1 / 2)) return;

	let cards = await client
		.knex('cards')
		.select('*')
		.catch((...err) => console.error(err));

	console.log(1);

	let done = false;
	let i = 1;
	do {
		// Convertir l'objet JSON en un tableau de cartes avec leur rareté
		const cartes = Object.entries(cards).map(([id, carte]) => ({ id, ...carte }));

		if (!(serverConfig.spawnAllCards == 1 && serverConfig.premium == 1)) {
			cartes.filter((carte) => guild.members.cache.get(carte.authorId) != undefined);
		}

		// Calculer la somme totale des raretés
		const sommeRaretés = cartes.reduce((acc, carte) => acc + carte.rarity, 0);

		// Générer un nombre aléatoire entre 0 et la somme des raretés
		const random = Math.random() * sommeRaretés;

		// Choisir la carte en fonction du nombre aléatoire
		let sommeTemp = 0;
		for (const carte of cartes) {
			if (done) return;
			sommeTemp += carte.rarity;
			if (random < sommeTemp) {
				card = carte;
				done = true;
			} else done = false;
		}
		i++;

		console.log(2);
	} while (!(done && i == 20));

	console.log(3);

	if (!done) return console.log('No Author in Guild');

	client
		.knex('guilds')
		.update({ last_Card: card.id })
		.where({ id: message.guild.id })
		.catch((...err) => console.error(err));

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
		const embed = new EmbedBuilder()
			.setTitle(title)
			.setImage(card.image)
			.setColor(require('../colors.json').find((color) => (color.name = 'RED')).hex);
		if (!channel) return;
		channel.send({ embeds: [embed], components: [button] }).then(async (message) => {
			let channel = await guild.channels.cache.get(message.channelId);
			setTimeout(async () => {
				let msg = await channel.messages.fetch(message.id);

				serverConfig = await client
					.knex('guilds')
					.update({ last_Card: null })
					.where({ id: guild.id })
					.catch((...err) => console.error(err));
				serverConfig.last_Card = null;
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

module.exports = { isXMinutesPassed, win };
