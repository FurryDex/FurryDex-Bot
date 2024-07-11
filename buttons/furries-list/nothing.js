const { ModalBuilder, TextInputStyle, ActionRowBuilder, TextInputBuilder } = require("discord.js");
const locales = require("../../locales/buttons/catch.json");

module.exports = {
  name: "nothing",
  run: async (client, interaction) => {
    interaction.reply({ content: `Eh! I have a secret told you!\n\n||There is no point in pressing a button in this range||`, ephemeral: true });
  },
};
