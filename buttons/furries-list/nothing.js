const { ModalBuilder, TextInputStyle, ActionRowBuilder, TextInputBuilder } = require("discord.js");
const locales = require("../../locales/buttons/catch.json");

module.exports = {
  name: "catch",
  run: async (client, interaction) => {
    interaction.reply({ content: `Eh ! J'ai un secret a te raconté !\n\n||Ca ne sert a rien de cliquer sur son bouton, Il ne fais rien||`, ephemeral: true });
  },
};
