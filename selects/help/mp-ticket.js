const { ModalBuilder, ActionRowBuilder } = require('@discordjs/builders');
const BDD = require('../../DB/temp.json');
const { TextInputBuilder, TextInputStyle } = require('discord.js');
const fs = require('fs');

const modal = new ModalBuilder()
	.setTitle('Créer un ticket')
	.setCustomId('mp-ticket')
	.setComponents(
		new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('title').setLabel('Comment pouvons nous vous aidez ?').setPlaceholder('Expliquez-nous comment on peut vous aider').setRequired(true).setStyle(TextInputStyle.Paragraph)),
		new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('description').setLabel('Des information suplémentaire ?').setPlaceholder('Donnez-nous des informations si besoin.').setRequired(true).setStyle(TextInputStyle.Short))
	);

const cardModal = new ModalBuilder()
	.setTitle('Créer une Carte')
	.setCustomId('mp-ticket')
	.setComponents(
		new ActionRowBuilder().addComponents(
			new TextInputBuilder()
				.setCustomId('title')
				.setLabel('Information Nécessaire')
				.setPlaceholder(
					`Rareté:
Nom: 
Auteur: 
Vie:
Attaque:
Couleur:
Nom possible:`
				)
				.setRequired(true)
				.setStyle(TextInputStyle.Paragraph).setValue(`Rareté: 0.75
Nom: Flyzar
Auteur: Flyzar73
Vie: 250
Attaque: 275
Couleur: #883fe7
Nom possible: flyzar73 / flyzar / fly / flyzar_off`)
		),

		new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('description').setLabel('Information Suplémentaire').setPlaceholder('Expliquez-nous comment on peut mieu vous comprendre').setRequired(true).setStyle(TextInputStyle.Short))
	);

module.exports = {
	name: 'mp-ticket',
	async run(client, interaction) {
		if (!BDD[interaction.user.id]) {
			BDD[interaction.user.id] = {};
		}
		BDD[interaction.user.id].ticket = interaction.values[0];
		if (require('../../DB/ticket.json').user[interaction.user.id]) {
			if (require('../../DB/ticket.json').user[interaction.user.id].channel) return interaction.reply('vous ne pouvez pas créer plusieur ticket.');
		}
		fs.writeFile('./DB/temp.json', JSON.stringify(BDD), async (err) => {});
		if (interaction.values[0] == 'card') {
			await interaction.showModal(cardModal);
		} else {
			await interaction.showModal(modal);
		}
	},
};
