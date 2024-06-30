const { ThreadAutoArchiveDuration, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const config = require("../../config");
const temp = require("../../DB/temp.json");
const fs = require("fs");

const button = new ActionRowBuilder().addComponents(
  new ButtonBuilder().setCustomId("claim").setDisabled(false).setEmoji("<:6979newticket:1222626208244564152>").setLabel("Claim le ticket").setStyle(ButtonStyle.Success),
  new ButtonBuilder().setCustomId("close").setDisabled(false).setEmoji("<:7157deleteticket:1222626237147516979>").setLabel("Fermé le ticket").setStyle(ButtonStyle.Danger)
);

let secteur = "general";
let color = "Grey";
let tag;

module.exports = {
  name: "mp-card",
  async run(client, interaction) {
    interaction.reply("Creation du ticket en cours.").then(async (msg) => {
      const guild = await client.guilds.cache.get(config.server.ID);
      const forum = await guild.channels.cache.get(config.ticket.channel);

      if (temp[interaction.user.id].ticket == "card") {
        secteur = "Card";
        color = "Red";
        tag = "1235985300249907221";
      } else if (temp[interaction.user.id].ticket == "gene") {
        secteur = "General";
        color = "DarkGrey";
        tag = "1235985381384519700";
      }

      let embed = new EmbedBuilder().setColor(color).setTitle(`Ticket de ${interaction.user.username}`).setDescription(`Ticket de \`${interaction.user.username}\`
        ticket en direction du secteur \`${secteur}\`
        Information:
        \`\`\`Nom: ${interaction.fields.getTextInputValue("name")}\`\`\`
        \`\`\`Autheur: ${interaction.fields.getTextInputValue("author")}\`\`\`
        \`\`\`Vie: ${interaction.fields.getTextInputValue("live")}\`\`\`
        \`\`\`Attaque: ${interaction.fields.getTextInputValue("attacks")}\`\`\`
        \`\`\`Couleur: ${interaction.fields.getTextInputValue("color")}\`\`\`
        \`\`\`Rareté: ${interaction.fields.getTextInputValue("rarity")}\`\`\`
        \`\`\`Nom possibles: ${interaction.fields.getTextInputValue("names")}\`\`\`
        `);

      forum.threads
        .create({
          name: `${secteur} - ${interaction.user.username}`,
          autoArchiveDuration: ThreadAutoArchiveDuration.OneWeek,
          message: {
            embeds: [embed],
            content: `<@${interaction.user.id}>`,
            components: [button],
          },
        })
        .then((thread) => {
          const ticket = require("../../DB/ticket.json");
          thread.setAppliedTags([tag]);

          ticket.user[interaction.user.id] = { channel: thread.id };
          ticket.thread[thread.id] = { user: interaction.user.id };

          fs.writeFile("./DB/ticket.json", JSON.stringify(ticket), async (err) => {});
        })
        .catch((err) => console.log(err));
      msg.edit("Ticket créer !");
    });
  },
};
