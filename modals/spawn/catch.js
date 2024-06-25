const locales = require("../../locales/modals/catch.json");
const fs = require("fs");
const { ActionRowBuilder, ButtonBuilder } = require("discord.js");
const dbFilePath = "./DB/guild_config.json";
const cardFilePath = "./DB/cards.json";
const cardlistFilePath = "./DB/cardlist.json";
const uid = function () {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
module.exports = {
  name: "catch",
  async run(client, interaction) {
    const guess = interaction.fields.getTextInputValue("guess").toLowerCase();
    let guildConfig = JSON.parse(fs.readFileSync(dbFilePath, "utf8"));
    let cards = JSON.parse(fs.readFileSync(cardFilePath, "utf8"));
    let cardlist = JSON.parse(fs.readFileSync(cardlistFilePath, "utf8"));
    const serverConfig = guildConfig.find((config) => config.guild_id === interaction.guild.id);
    if (serverConfig.last_Card == null) {
      let message = locales.already[serverConfig.locale] ?? locales.already.default;
      interaction.reply(message.replace("%@player%", `<@${interaction.user.id}>`));
      return;
    }
    const card = cardlist[serverConfig.last_Card];

    if (card.possibleName.includes(guess)) {
      let live = Math.round(Math.floor(Math.random() * (25 - -25)) + -25);
      let attacks = Math.round(Math.floor(Math.random() * (25 - -25)) + -25);
      let uuid = uid();
      if (!cards.users[interaction.user.id]) {
        cards.users[interaction.user.id] = { id: interaction.user.id, cards: [] };
      }
      cards.users[interaction.user.id].cards.push({
        id: uuid,
        cardid: serverConfig.last_Card,
        guilds: interaction.guild.id,
        date: Date.now(),
        live: `${live < 0 ? live : `+${live}`}`,
        attacks: `${attacks < 0 ? attacks : `+${attacks}`}`,
      });
      let message = locales.congrat[serverConfig.locale] ?? locales.congrat.default;
      interaction.reply(message.replace("%cardName%", card.name).replace("%cardId%", uuid).replace("%@player%", `<@${interaction.user.id}>`));
      fs.writeFileSync(cardFilePath, JSON.stringify(cards, null, 2));
      serverConfig.last_Card = null;
      fs.writeFileSync(dbFilePath, JSON.stringify(guildConfig, null, 2));
      let msg = interaction.message;
      const newComponents = msg.components.map((row) => {
        return new ActionRowBuilder().addComponents(
          row.components.map((button) => {
            return new ButtonBuilder().setCustomId(button.customId).setLabel(button.label).setStyle(button.style).setDisabled(true); // Toggle the disabled state
          })
        );
      });
      msg.edit({ embeds: interaction.message.embeds, components: newComponents });
    } else {
      let nonono = locales.no[serverConfig.locale] ?? locales.no.default;
      interaction.reply(nonono.replace("%guess%", guess).replace("%@player%", `<@${interaction.user.id}>`));
      return;
    }
  },
};
