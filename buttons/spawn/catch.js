const { ModalBuilder, TextInputStyle, ActionRowBuilder, TextInputBuilder } = require("discord.js");
const locales = require("../../locales/buttons/catch.json");

module.exports = {
  name: "catch",
  run: async (client, interaction) => {
    const modal = new ModalBuilder()
      .setTitle(locales.models.title[interaction.locale] ?? locales.models.title.default)
      .setCustomId("catch")
      .setComponents(
        new ActionRowBuilder().addComponents(
          new TextInputBuilder()
            .setCustomId("guess")
            .setLabel(locales.models.question[interaction.locale] ?? locales.models.question.default)
            .setPlaceholder(locales.models.placeholder[interaction.locale] ?? locales.models.placeholder.default)
            .setRequired(true)
            .setStyle(TextInputStyle.Short)
        )
      );
    await interaction.showModal(modal);
  },
};
