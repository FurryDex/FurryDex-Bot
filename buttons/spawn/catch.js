const { ModalBuilder, TextInputStyle, ActionRowBuilder, TextInputBuilder } = require("discord.js");
const locales = require("../../locales/buttons/catch.json");

module.exports = {
  name: "catch",
  run: async (client, interaction) => {
    let cardsBDD = JSON.parse(fs.readFileSync("./DB/cards.json", "utf8"));
    let guildConfig = JSON.parse(fs.readFileSync(dbFilePath, "utf8"));
    const serverConfig = guildConfig.find((config) => config.guild_id === interaction.guild.id);

    let date = new Date().toISOString();

    if (!serverConfig.noCoolDown) {
      if (!cardsBDD.users[interaction.user.id].premium && cardsBDD.users[interaction.user.id].cooldown <= date)
        return interaction.reply({ content: "You got 2 minutes of cooldown #ANTI-SPAM", ephemeral: true });
    }

    const penalityByLimit = { 0: 0, 1: 0, 2: 0, 3: 5, 4: 7.5, 5: 10, 6: 15 };

    let Penality_time = penalityByLimit[cardsBDD.users[interaction.user.id].limit] + (serverConfig.lastPlayer == interaction.user.id ? 2.5 : 0);
    let penality = new Date().setSeconds(new Date().getSeconds() + Penality_time).toISOString();

    if (penality >= date) return interaction.reply({ content: `**PENALITY**: You got ${Penality_time} of penality #ANTI-SPAM`, ephemeral: true });

    if (cardsBDD.users[interaction.user.id].limit >= 7)
      return interaction.reply({ content: `**LIMIT**: You cannot get this card due to limit (7/7) #ANTI-SPAM`, ephemeral: true });

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
