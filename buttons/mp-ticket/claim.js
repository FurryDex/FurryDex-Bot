const { EmbedBuilder } = require("discord.js");
const ticket = require("../../DB/ticket.json");
const config = require("../../config");
const fs = require("fs");

module.exports = {
	name: "claim",
	run: async (client, interaction) => {
		const guild = await client.guilds.cache.get(config.server.ID);
		const member = await guild.members.cache.get(
			ticket.thread[interaction.channel.id].user
		);
		ticket.thread[interaction.channel.id].claimer = interaction.user.id;
		if (ticket.thread[interaction.channel.id].claimer) {
			if (
				(ticket.thread[interaction.channel.id].claimer = interaction.user.id)
			) {
			} else {
			}
		} else {
			ticket.thread[interaction.channel.id].claimer = interaction.user.id;
			let embed = new EmbedBuilder()
				.setTitle("Claim")
				.setDescription(
					`Le ticket vien d'etre claim par: <@${interaction.user.id}>`
				);
			interaction.reply({ embeds: [embed] });
			member.send({ embeds: [embed] });
		}
	},
};
