const { StringSelectMenuBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuOptionBuilder } = require("discord.js");
const fs = require("fs");
const locales = require("../../locales/commands/furries.json");

module.exports = {
  name: "prev_x_x",
  run: (client, interaction) => {
    const args = interaction.customId.toString().split("_");
    args.shift();
    const userId = args[0];
    let cardsBDD = JSON.parse(fs.readFileSync("./DB/cards.json", "utf8"));
    let cardlistBDD = JSON.parse(fs.readFileSync("./DB/cardlist.json", "utf8"));

    if (!cardsBDD.users[userId].cards || cardsBDD.users[userId].cards == [])
      return interaction.reply({ content: locales.run["no-furry"][interaction.locale] ?? locales.run["no-furry"].default, ephemeral: true });
    AllOptions = [];
    cardsBDD.users[userId].cards.forEach((card) => {
      let date = new Date(card.date);
      cd = (num) => num.toString().padStart(2, 0);
      let description = locales.run.list[interaction.locale] ?? locales.run.list.default;
      AllOptions.push({
        label: `(#${card.id}) ${cardlistBDD[card.cardid].name}`,
        value: `${card.id}`,
        emoji: `${cardlistBDD[card.cardid].emoji}`,
        description: description
          .replace("%attacks%", card.attacks)
          .replace("%live%", card.live)
          .replace("%date%", `${cd(date.getDate())}/${cd(date.getMonth())}/${cd(date.getFullYear())} ${cd(date.getHours())}H${cd(date.getMinutes())}`),
      });
    });

    sendMenu(AllOptions, interaction, userId, true, args[1], 25);
  },
};

async function sendMenu(options, interaction, id, edit = false, page = 0, chunkSize = 25) {
  const chunkedOptions = chunkArray(options, chunkSize);
  const currentOptions = chunkedOptions[page];

  const row = new ActionRowBuilder().addComponents(new StringSelectMenuBuilder().setCustomId(`cards`).setPlaceholder("Select a card").addOptions(currentOptions));

  const buttonRow = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId(`prev_${id}_${Number(page) - 1}`)
      .setLabel("«")
      .setStyle(ButtonStyle.Primary)
      .setDisabled(page == 0),
    new ButtonBuilder()
      .setCustomId(`nothing`)
      .setLabel(`${Number(page) + 1}`)
      .setStyle(ButtonStyle.Success)
      .setDisabled(chunkedOptions.length == 1),
    new ButtonBuilder()
      .setCustomId(`next_${id}_${Number(page) + 1}`)
      .setLabel("»")
      .setStyle(ButtonStyle.Primary)
      .setDisabled(page == chunkedOptions.length - 1)
  );

  if (!edit) {
    await interaction.reply({ content: "Please select a card:", components: [row, buttonRow] });
  } else {
    await interaction.update({ components: [row, buttonRow] });
  }
}

// carte / carteTotal * 100
function chunkArray(array, chunkSize = 25) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}
