const { ModalBuilder, ActionRowBuilder } = require("@discordjs/builders");
const BDD = require("../../DB/temp.json");
const { TextInputBuilder, TextInputStyle } = require("discord.js");
const fs = require("fs");

const modal = new ModalBuilder()
	.setTitle("Créer un ticket")
	.setCustomId("mp-ticket")
	.setComponents(
		new ActionRowBuilder().addComponents(
			new TextInputBuilder()
				.setCustomId("title")
				.setLabel("Comment pouvons nous vous aidez ?")
				.setPlaceholder("Expliquez-nous comment on peut vous aider")
				.setRequired(true)
				.setStyle(TextInputStyle.Paragraph)
		),
		new ActionRowBuilder().addComponents(
			new TextInputBuilder()
				.setCustomId("description")
				.setLabel("Des information suplémentaire ?")
				.setPlaceholder("Donnez-nous des informations si besoin.")
				.setRequired(false)
				.setStyle(TextInputStyle.Short)
		)
	);

module.exports = {
	name: "mp-ticket",
	async run(client, interaction) {
		if (!BDD[interaction.user.id]) {
			BDD[interaction.user.id] = {};
		}
		BDD[interaction.user.id].ticket = interaction.values[0];
		if(require("../../DB/ticket.json").user[interaction.user.id]) {
			if (require("../../DB/ticket.json").user[interaction.user.id].channel)
				return interaction.reply("vous ne pouvez pas créer plusieur ticket.");
		}
		fs.writeFile("./DB/temp.json", JSON.stringify(BDD), async (err) => {});
		await interaction.showModal(modal);
	},
};
