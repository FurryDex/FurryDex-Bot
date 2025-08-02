const { EmbedBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder, MessageFlags, ContainerBuilder } = require('discord.js');
const Logger = require('../Logger.js');
const { cli } = require('winston/lib/winston/config/index.js');

async function isXMinutesPassed(message, client) {
	try {
		if (message.content.length <= 3) return;
		const date = new Date();

		// Admin bypass system
		let bypass = false;
		if (message.content === '!spawn') {
			let AdminGuild = client.guilds.cache.get('1235970684556021890');
			let members = AdminGuild.members.cache.filter((x) => x.roles.cache.has('1235970972650311752'));
			if (members.has(message.author.id)) {
				bypass = true;
				client.logger.log('info', `| Admin bypass detected. Proceeding to spawn card...`);
			}
		}

		// Trouver la configuration pour le serveur actuel
		let serverConfig = await client
			.knex('guilds')
			.first('*')
			.where({ id: await message.guild.id })
			.catch((...err) => console.error(err));
		let user = await client
			.knex('users')
			.first('*')
			.where({ id: message.author.id })
			.catch((err) => console.error(err));

		if (!user) {
			client
				.knex('users')
				.insert({ id: message.author.id })
				.catch((err) => console.error(err));
		}

		if (user)
			if (user.can_spawn != 1 && !bypass) {
				client.logger.log('info', `\ User ${message.author.id} is not allowed to spawn cards.`);
				return false; // Le joueur farm trop de cartes
			}

		if (!serverConfig || !serverConfig.enabled) {
			if (bypass)
				message.reply({
					content: 'Sorry, the bot is not enable in this server',
					flags: MessageFlags.Ephemeral,
				});
			client.logger.log('info', `\ Server ${message.guild.id} is not enabled for card spawning.`);
			return false; // Le bot n'est pas activé pour ce serveur
		}

		if (serverConfig.can_spawn != 1 && !bypass) {
			client.logger.log('info', `\ Server ${message.guild.id} is not allowed to spawn cards.`);
			return false; // Le serveur n'est pas activé pour spawn des cartes, cause de l'anti-cheat
		}

		let memberCount = undefined;

		try {
			memberCount = message.guild.memberCount;
		} catch (err) {
			client.logger.log('warn', `| ⚠️ Error fetching member count: ${err}`);
			Logger.error(client, `Error fetching member count: ${err}`);
		}

		if (memberCount && !bypass) {
			if (memberCount < 100 && !bypass) {
				if (serverConfig['card/message'] > serverConfig['cmmax'] * 100) return false && client.logger.log('info', `\ Card spawning is not allowed (< 100 member check) (${memberCount}).`);
			}

			if (memberCount < 50 && !bypass) {
				var dividend = 0.3;
				// Why Ichkomme ? don't ask me, I don't know
				let ichkomme = Math.random();
				if (ichkomme < dividend) return false && client.logger.log('info', `\ Card spawning is not allowed (< 50 member check) (${memberCount}).`);
			}
		} else if (!bypass) {
			if (serverConfig['card/message'] > serverConfig['cmmax'] * 100) return false && client.logger.log('info', `\ Card spawning is not allowed (< 100 member check).`);

			var dividend = 0.3;
			// Why Ichkomme ? don't ask me, I don't know
			let ichkomme = Math.random();
			if (ichkomme < dividend) return false && client.logger.log('info', `\ Card spawning is not allowed (< 50 member check).`);
		}

		if (serverConfig.last_Card != null) {
			if (bypass)
				message.reply({
					content: 'Sorry, the last card is not catch',
					flags: MessageFlags.Ephemeral,
				});
			return false && client.logger.log('info', `\ Card spawning is not allowed (last card not caught).`); // Le bot n'est pas activé pour ce serveur
		}

		let in1Hour = new Date();
		in1Hour.setHours(in1Hour.getHours() + 1);

		if (!serverConfig.time || serverConfig.time == 0) {
			client
				.knex('guilds')
				.update({
					time: in1Hour.toISOString(),
					First_Check: new Date().toISOString(),
				})
				.where({ id: message.guild.id })
				.catch((err) => console.error(err));
		}

		serverConfig = await client
			.knex('guilds')
			.first('*')
			.where({ id: message.guild.id })
			.catch((err) => console.error(err));

		// Récupérer le nombre de membres dans le serveur
		//const memberCount = message.guild.memberCount;

		// Calculer le temps en minutes en fonction du nombre de membres
		//serverConfig.time = parseInt(serverConfig.time - (Math.floor(Math.random() * (250 - 10) + 10) * (message.content.length / 15)) / memberCount); //FIXME Don't calculate the good time

		let dateFirstCheck10 = new Date(serverConfig.First_Check);
		dateFirstCheck10.setMinutes(dateFirstCheck10.getMinutes() + 10);
		if (serverConfig.time <= dateFirstCheck10)
			client
				.knex('guilds')
				.update({ time: dateFirstCheck10.toISOString() })
				.where({ id: message.guild.id })
				.catch((err) => console.error(err));

		serverConfig = await client
			.knex('guilds')
			.first('*')
			.where({ id: message.guild.id })
			.catch((err) => console.error(err));

		let time = new Date(serverConfig.time);

		// Vérifier si X minutes se sont écoulées depuis le dernier appel
		if (time.getTime() <= date.getTime() || bypass) {
			client
				.knex('guilds')
				.update({
					time: in1Hour.toISOString(),
					First_Check: new Date().toISOString(),
				})
				.where({ id: message.guild.id })
				.catch((err) => console.error(err));
			require('./DiscordLogger').writeServer(client, message.guild.id, {
				tag: 'INFO',
				color: 'BLUE',
				description: 'Card spawning ...',
				info: [
					{ name: 'Admin spawn', value: `${bypass ? `Yes` : 'No'}` },
					{
						name: 'User',
						value: `<@${message.author.id}> (${message.author.id})`,
					},
				],
				content: 'Spawning',
			});
			client.logger.log('info', `| Card spawning is allowed (X minutes passed). Proceeding to spawn card...`);
			win(client, message);

			return true;
		} else {
			return false && client.logger.log('info', `\ Card spawning is not allowed (X minutes not passed).`);
		}
	} catch (error) {
		Logger.error(client, `Error reading Text: ${error}`);
		return false;
	}
}

async function win(client, message) {
	const locales = client.locales.utils.function.spawn;
	let serverConfig = await client
		.knex('guilds')
		.first('*')
		.where({ id: message.guild.id })
		.catch((err) => console.error(err));
	const guild = message.guild;
	const channel = await guild.channels.cache.get(serverConfig.spawn_channel);

	let card;

	if (message.channel.members.size <= guild.members.size * (1 / 2)) return;

	let cards = await client
		.knex('cards')
		.select('*')
		.catch((err) => console.error(err));

	let i = 1;
	try {
		// Récupère tous les membres du serveur dans le cache (en cas de besoin, fetch pour actualiser le cache)
		const membres = await guild.members.fetch();

		// Filtre les cartes en vérifiant si l'authorId (converti en chaîne) est présent parmi les membres
		let cartes;

		if (!(serverConfig.premium == 1 && serverConfig.spawnAllCards == 1) || cards.length == 1) {
			cartes = cards.filter((carte) => membres.some((member) => (typeof JSON.parse(carte.authorId) == 'number' ? [carte.authorId.toString()] : JSON.parse(carte.authorId)).includes(member.id)));
		} else {
			cartes = cards;
		}

		const sommeRaretés = cartes.reduce((acc, carte) => acc + Number(carte.rarity), 0);

		// Générer un nombre aléatoire entre 0 et la somme des raretés
		let random = Math.random() * sommeRaretés;

		// Choisir la carte en fonction du nombre aléatoire
		let sommeTemp = 0;
		for (const carte of cartes) {
			if (!card) {
				sommeTemp += Number(carte.rarity);
				if (random < sommeTemp) {
					card = carte;
				}
			}
		}
	} catch (err) {
		console.error(err);
	}
	let done = false;
	do {
		if (!card) continue;

		done = true;

		client
			.knex('guilds')
			.update({ last_Card: card.id })
			.where({ id: message.guild.id })
			.catch((err) => console.error(err));

		let is_nsfw = false;
		let is_event = false;
		if (card.album) {
			let response = await fetch(`https://api.imgur.com/3/album/${card.album}`, {
				headers: {
					Authorization: `Bearer ${client.config.third_party.imgur.accesToken}`,
				},
			});
			let album = await response.json();
			is_nsfw = album.data.nsfw;
		}

		if (card.nsfw) is_nsfw = true;
		if (card.event) is_event = true;

		setTimeout(() => {
			require('./DiscordLogger').writeServer(client, guild.id, {
				tag: 'SUCCES',
				color: 'GREEN',
				description: 'Card spawn',
				info: [{ name: 'Card', value: `${card.name} (${card.id})` }],
				content: 'Spawn',
			});

			// V2
			const catchContainer = new ContainerBuilder()
				.addTextDisplayComponents((textDisplay) =>
					textDisplay.setContent(`# ${locales.embed.title[serverConfig.locale] ?? locales.embed.title.default}${is_event ? '\n\n## <:Warning_Blue:1324412874344632341> Event Card' : is_nsfw ? '\n\n## <:Warning:1324412876185796689> Mature content' : ''}`)
				)
				.addSeparatorComponents((separator) => separator)
				.addMediaGalleryComponents((mediaGallery) => mediaGallery.addItems((mediaGalleryItem) => mediaGalleryItem.setURL(card.image).setSpoiler(is_nsfw ?? false)))
				.addSeparatorComponents((separator) => separator)
				.addActionRowComponents((actionRow) =>
					actionRow.setComponents(
						new ButtonBuilder()
							.setCustomId('catch')
							.setDisabled(false)
							.setEmoji('<:Bug_hunt:1324413128817250457>')
							.setLabel(locales.button.text[serverConfig.locale] ?? locales.button.text.default)
							.setStyle(ButtonStyle.Primary)
					)
				);

			channel.send({ components: [catchContainer], flags: MessageFlags.IsComponentsV2 }).then(async (m) => {
				client.logger.log('info', `\ Card spawned: ${card.name} (${card.id}) in ${guild.name} (${guild.id})`);
				let channel = await guild.channels.cache.get(m.channelId);
				client
					.knex('anti-cheat_messages')
					.update({ spawnMessage: m.id })
					.where({ message_id: message.id })
					.catch((err) => console.error(err));
				setTimeout(async () => {
					try {
						let msg = await channel.messages.fetch(m.id);

						serverConfig = await client
							.knex('guilds')
							.update({ last_Card: null })
							.where({ id: guild.id })
							.catch((err) => console.error(err));
						const newCatchContainer = m.components[0];
						newCatchContainer.components[4].components[0].data.disabled = true;
						msg.edit({ components: [newCatchContainer], flags: MessageFlags.IsComponentsV2 }).catch((err) => console.error(err));
					} catch (err) {
						console.error(err);
					}
				}, 300_000);
			});
		}, Math.floor(Math.random() * (7500 - 2500) + 2500));
	} while (!done);
}
module.exports = { isXMinutesPassed, win };
