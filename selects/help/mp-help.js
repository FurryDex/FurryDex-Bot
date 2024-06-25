const {
  ActionRowBuilder,
  StringSelectMenuBuilder,
  EmbedBuilder,
} = require("discord.js");
const config = require("../../config");

const secteur = new ActionRowBuilder().addComponents(
  new StringSelectMenuBuilder()
    .setCustomId("mp-ticket")
    .setPlaceholder("Are you sure ?                                           ")
    .setMinValues(1)
    .setMaxValues(1)
    .addOptions([
      {
        label: "Card Sector",
        description:
          "You wan't to import a Fursona to us card ? Select this option !",
        value: "card",
        emoji: "<:atlanta_id:598162717232332811>",
      },
      {
        label: "General Sector",
        description:
          "You need help but you don't know the category or other ? Select this option !",
        value: "gene",
        emoji: "<:atlanta_general_category:789030444167200808>",
      },
    ])
);

module.exports = {
  name: "mp-help",
  async run(client, interaction) {
    const guild = await client.guilds.cache.get(config.server.ID);
    if (interaction.values[0] == "ticket") {
      if (!config.ticket.enable)
        return interaction.reply("Tickets are currently not available.");
      if (require("../../DB/ticket.json").user[interaction.user.id]) {
        if (require("../../DB/ticket.json").user[interaction.user.id].channel)
          return interaction.reply("You can't create two tickets !");
      }
      let embed = new EmbedBuilder()
        .setTitle("What sector ?")
        .setColor("Gold")
        .setDescription(
          "This ticket will be send to the Official Staff of the server, Be carefull. \n**What sector you want to contact ?**"
        );
      interaction.reply({ embeds: [embed], components: [secteur] });
    }
  },
};
