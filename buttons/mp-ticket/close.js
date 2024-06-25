const { EmbedBuilder } = require("discord.js");
const ticket = require("../../DB/ticket.json");
const config = require("../../config");
const fs = require("fs");

module.exports = {
  name: "close",
  run: async (client, interaction) => {
    let i = 10;
    let guild = await client.guilds.cache.get(config.server.ID);
    let member = await client.users.cache.get(ticket.thread[interaction.channel.id].user);
    let embed = new EmbedBuilder()
      .setTitle("Status de votre Ticket")
      .setDescription("Votre ticket vien d'etre férme, en cas de besoin, demandé un copie en recréant un ticket")
      .setColor("Red");
    member.send({ embeds: [embed] }).catch((err) => {});
    delete ticket.thread[interaction.channel.id];
    ticket.user[member.id].channel = "";
    fs.writeFile("./DB/ticket.json", JSON.stringify(ticket), async (err) => {});
    interaction.reply(`Fermeture du ticket dans ${i} secondes`).then((msg) => {
      close(interaction, msg, i);
    });
  },
};

function close(interaction, msg, i) {
  setTimeout(() => {
    if (i == 0) {
      return interaction.channel.delete();
    }
    i = i - 1;
    msg.edit(`Fermeture du ticket dans ${i} secondes`);
    close(interaction, msg, i);
  }, 1000);
}
