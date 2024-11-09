const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const config = require('../../config');
const users = require('../../DB/users.json');
const fs = require('fs');

const option = new ActionRowBuilder().addComponents(
	new StringSelectMenuBuilder()
		.setCustomId('mp-help')
		.setPlaceholder('How can I help you?                          ')
		.setMinValues(1)
		.setMaxValues(1)
		.addOptions([
			{
				label: 'Open a ticket',
				value: 'ticket',
				emoji: '<:atlanta_title:598169749935095818>',
			},
		])
);

module.exports = {
	name: 'messageCreate',
	once: false,
	async execute(client, message) {
		if (message.author.bot) return;
		if (message.mentions != null) {
			if (message.mentions.users.get('1070398623638110319')) {
				let embed = new EmbedBuilder().setTitle('How can i help you ?').setDescription('Select an option for i can help you !');

				message.author.send({ embeds: [embed], components: [option] }).catch((err) => {
					message.reply('An error has occurred, check that you have your PM open or mention me by MP! error:');
					console.log(err);
				});
			}
		}
		if (message.channel.type == 11) {
			if (message.channel.parent.id == config.ticket.channel) {
				if (message.content.startsWith('$')) return;

				const guild = await client.guilds.cache.get(config.server.ID);
				const membre = await guild.members.cache.get(require('../../DB/ticket.json').thread[message.channel.id].user);

				let embed = new EmbedBuilder().setTitle(message.author.username).setDescription(message.content || ' ');

				membre.send({ embeds: [embed] }).catch((err) => {});
				if (message.attachments) {
					let attachments = Array.from(message.attachments.values());
					attachments.forEach((attachment) => membre.send({ files: [attachment] }).catch((err) => {}));
				}
			}
		}
		if (message.channel.type == 1) {
			if (!require('../../DB/ticket.json').user[message.author.id]) return;
			if (!require('../../DB/ticket.json').user[message.author.id].channel) return;
			if (message.mentions != null) {
				if (message.mentions.users.get('1070398623638110319')) {
					return;
				}
			}
			if (message.author.bot) return;

			const guild = await client.guilds.cache.get(config.server.ID);
			const thread = await guild.channels.cache.get(require('../../DB/ticket.json').user[message.author.id].channel);

			let embed = new EmbedBuilder().setTitle(message.author.username).setDescription(message.content || ' ');

			thread.send({ embeds: [embed] }).catch((err) => {});
			if (message.attachments) {
				let attachments = Array.from(message.attachments.values());
				attachments.forEach((attachment) =>
					thread
						.send({ files: [attachment] })
						.catch((err) => {})
						.then(() => {
							console.log(attachment);
						})
				);
			}
		}
	},
};
