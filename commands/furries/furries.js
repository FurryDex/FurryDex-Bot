const { ApplicationCommandOptionType, StringSelectMenuBuilder, ActionRowBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const locales = require("../../locales/commands/furries.json");

module.exports = {
  name: "furries",
  description: "base furry command",
  category: "furries",
  fullyTranslated: true,
  permissions: null,
  run: (client, message, args) => {},
  options: [
    {
      name: "list",
      nameLocalizations: locales.options[0].name,
      description: "List your furries cards.",
      descriptionLocalizations: locales.options[0].description,
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "user",
          description: "The user who you wan't to see card",
          required: false,
          type: ApplicationCommandOptionType.User,
        },
      ],
    },
    {
      name: "completion",
      nameLocalizations: locales.options[1].name,
      description: "Show your current completion of the Furries Dex.",
      descriptionLocalizations: locales.options[1].description,
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "user",
          description: "The user who you wan't to see card",
          required: false,
          type: ApplicationCommandOptionType.User,
        },
      ],
    },
    {
      name: "last",
      nameLocalizations: locales.options[2].name,
      description: "Display info of your or another users last caught card.",
      descriptionLocalizations: locales.options[2].description,
      type: ApplicationCommandOptionType.Subcommand,
    },
    {
      name: "give",
      nameLocalizations: locales.options[3].name,
      description: "Give a card to a user.",
      descriptionLocalizations: locales.options[3].description,
      type: ApplicationCommandOptionType.Subcommand,
    },
    {
      name: "count",
      nameLocalizations: locales.options[4].name,
      description: "Count how many card you have.",
      descriptionLocalizations: locales.options[4].description,
      type: ApplicationCommandOptionType.Subcommand,
    },
    {
      name: "info",
      nameLocalizations: locales.options[5].name,
      description: "Display info from a specific card.",
      descriptionLocalizations: locales.options[5].description,
      type: ApplicationCommandOptionType.Subcommand,
    },
    {
      name: "favorite",
      nameLocalizations: locales.options[6].name,
      description: "Set a card to favorite.",
      descriptionLocalizations: locales.options[6].description,
      type: ApplicationCommandOptionType.Subcommand,
    },
  ],
  runSlash: (client, interaction) => {
    const subcommand = interaction.options.getSubcommand();
    const user = interaction.options.getUser("user") ?? interaction.user;
    let cardsBDD = JSON.parse(fs.readFileSync("./DB/cards.json", "utf8"));
    let cardlistBDD = JSON.parse(fs.readFileSync("./DB/cardlist.json", "utf8"));
    const list = new StringSelectMenuBuilder().setCustomId("cards").setPlaceholder("Make a choice").setMinValues(1).setMaxValues(1);

    if (subcommand == "list") {
      if (!cardsBDD.users[user.id]) {
        cardsBDD.users[user.id] = {
          id: user.id,
          cards: [],
        };
        fs.writeFile(`./DB/cards.json`, JSON.stringify(cardsBDD), (err) => {
          if (err) {
            Logger.error(err);
          }
        });
      }
      if (!cardsBDD.users[user.id].cards || cardsBDD.users[user.id].cards == [])
        return interaction.reply({ content: locales.run["no-furry"][interaction.locale] ?? locales.run["no-furry"].default, ephemeral: true });

      cardsBDD.users[user.id].cards.forEach((card) => {
        let date = new Date(card.date);
        cd = (num) => num.toString().padStart(2, 0);
        let description = locales.run.list[interaction.locale] ?? locales.run.list.default;
        list.addOptions([
          {
            label: `(#${card.id}) ${cardlistBDD[card.cardid].name}`,
            value: `${card.id}`,
            emoji: `${cardlistBDD[card.cardid].emoji}`,
            description: description
              .replace("%attacks%", card.attacks)
              .replace("%live%", card.live)
              .replace("%date%", `${cd(date.getDate())}/${cd(date.getMonth())}/${cd(date.getFullYear())} ${cd(date.getHours())}H${cd(date.getMinutes())}`),
          },
        ]);
      });
      const ActionRowList = new ActionRowBuilder().addComponents(list);

      interaction.reply({ components: [ActionRowList], content: interaction.options.getUser("user") ? `Card of <@${interaction.options.getUser("user").id}>` : "" });
    } else if (subcommand == "completion") {
      let havedCards = [];
      let notHavedCards = [];
      let cards = 0;
      userCards = cardsBDD.users[user.id].cards ?? [];
      for (const [id, card] of Object.entries(cardlistBDD)) {
        let hasCardorNot = hasCard(userCards, card.id) ?? false;
        if (hasCardorNot) {
          havedCards.push({ id: card.id, emoji: card.emoji });
        } else {
          notHavedCards.push({ id: card.id, emoji: card.emoji });
        }
        cards++;
      }

      const embed = new EmbedBuilder()
        .setTitle(`Furry Dex Completion`)
        .setDescription(
          `Dex of <@${user.id}>\nFurries Dex progression: *${Math.round((havedCards.length / cards) * 100)}%*\n\n__**Owned Furries Cards**__\n${havedCards
            .map((card) => card.emoji)
            .join(" ")}\n\n__**Missing Furries Cards**__\n${notHavedCards.map((card) => card.emoji).join(" ")}`
        )
        .setColor("#FF9700")
        .setTimestamp();

      interaction.reply({ embeds: [embed] });
    }
  },
};

function hasCard(userCards, wantedId) {
  let yes = false;
  userCards.forEach((card) => {
    if (card.cardid == wantedId) {
      yes = true;
    }
  });
  if (yes) return true;
  else return false;
}

// carte / carteTotal * 100
