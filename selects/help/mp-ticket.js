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

const cardModal = new ModalBuilder()
  .setTitle("Créer une Carte")
  .setCustomId("mp-card")
  .setComponents(
    new ActionRowBuilder().addComponents(
      new TextInputBuilder().setCustomId("name").setLabel("Nom de la carte").setPlaceholder("Flyzar73").setRequired(true).setStyle(TextInputStyle.Short)
    ),
    new ActionRowBuilder().addComponents(
      new TextInputBuilder()
        .setCustomId("author")
        .setLabel("Autheur de la carte - Si ce n'est pas vous, mettez un ID")
        .setPlaceholder("Flyzar_Off")
        .setRequired(true)
        .setStyle(TextInputStyle.Short)
    ),
    new ActionRowBuilder().addComponents(
      new TextInputBuilder().setCustomId("live").setLabel("Vie de la carte - entre 0 et 1000").setPlaceholder("250").setRequired(true).setStyle(TextInputStyle.Short)
    ),
    new ActionRowBuilder().addComponents(
      new TextInputBuilder().setCustomId("attacks").setLabel("Attaque de la carte - entre 0 et 1000").setPlaceholder("275").setRequired(true).setStyle(TextInputStyle.Short)
    ),
    new ActionRowBuilder().addComponents(
      new TextInputBuilder()
        .setCustomId("color")
        .setLabel("Couleur de la carte - en HEX si possible")
        .setPlaceholder("#883fe7")
        .setRequired(true)
        .setStyle(TextInputStyle.Short)
    ),
    new ActionRowBuilder().addComponents(
      new TextInputBuilder()
        .setCustomId("rarity")
        .setLabel("Rareté - 1 = Commun, 0.75 = peu commun, ...")
        .setPlaceholder("0.75")
        .setRequired(true)
        .setStyle(TextInputStyle.Short)
    ),
    new ActionRowBuilder().addComponents(
      new TextInputBuilder()
        .setCustomId("names")
        .setLabel("Nom possible")
        .setPlaceholder("Flyzar / Fly / Flyzou / FlyzarOff / ...")
        .setRequired(true)
        .setStyle(TextInputStyle.Paragraph)
    )
  );

module.exports = {
  name: "mp-ticket",
  async run(client, interaction) {
    if (!BDD[interaction.user.id]) {
      BDD[interaction.user.id] = {};
    }
    BDD[interaction.user.id].ticket = interaction.values[0];
    if (require("../../DB/ticket.json").user[interaction.user.id]) {
      if (require("../../DB/ticket.json").user[interaction.user.id].channel) return interaction.reply("vous ne pouvez pas créer plusieur ticket.");
    }
    fs.writeFile("./DB/temp.json", JSON.stringify(BDD), async (err) => {});
    if (interaction.values[0] == "card") {
      await interaction.showModal(cardModal);
    } else {
      await interaction.showModal(modal);
    }
  },
};
