const { ApplicationCommandOptionType, StringSelectMenuBuilder, ActionRowBuilder, PermissionFlagsBits } = require("discord.js");

const cardsBDD = require("../../DB/cards.json");
const cardlistBDD = require("../../DB/cardlist.json");
const fs = require("fs");
const locales = require("../../locales/commands/config.json");

const dbFilePath = "./DB/guild_config.json";
module.exports = {
  name: "config",
  description: "base config command",
  permissions: PermissionFlagsBits.Administrator,
  category: "admin",
  fullyTranslated: true,
  run: (client, message, args) => {},
  options: [
    {
      name: "enable",
      description: "enable or disable the card spawn.",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "enable",
          description: "enable or disable the card spawn.",
          type: ApplicationCommandOptionType.String,
          required: true,
          choices: [
            {
              name: "Enable",
              value: "true",
            },
            {
              name: "Disable",
              value: "false",
            },
          ],
        },
      ],
    },
    {
      name: "channel",
      description: "Channel where card will spawn.",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "channel",
          description: "The channel where card will spawn",
          type: ApplicationCommandOptionType.Channel,
          required: true,
        },
      ],
    },
    {
      name: "locale",
      description: "Set the base-lang for the server.",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "lang",
          description: "Set the base-lang for the server.",
          type: ApplicationCommandOptionType.String,
          required: true,
          choices: [
            {
              name: "German",
              value: "de",
            },
            {
              name: "English",
              value: "en-US",
            },
            {
              name: "Spanish",
              value: "es",
            },
            {
              name: "French",
              value: "fr",
            },
            {
              name: "Italian",
              value: "it",
            },
            {
              name: "Dutch",
              value: "du",
            },
            {
              name: "Norwegian",
              value: "no",
            },
            {
              name: "Polish",
              value: "pl",
            },
            {
              name: "Portugese",
              value: "pt-BR",
            },
            {
              name: "Romanian",
              value: "ro",
            },
            {
              name: "Finish",
              value: "fi",
            },
            {
              name: "Swedish",
              value: "sv-SE",
            },
            {
              name: "Bulgarian",
              value: "bg",
            },
            {
              name: "Russian",
              value: "ru",
            },
            {
              name: "Ukrainian",
              value: "uk",
            },
            {
              name: "Chinese",
              value: "zh-CN",
            },
            {
              name: "Japanese",
              value: "ja",
            },
            {
              name: "Korean",
              value: "ko",
            },
          ],
        },
      ],
    },
    {
      name: "auto-locale",
      description: "Automatic set the base-lang for the server.",
      type: ApplicationCommandOptionType.Subcommand,
    },
  ],
  runSlash: (client, interaction) => {
    const subcommand = interaction.options.getSubcommand();

    if (subcommand == "enable") {
      let guildConfig = JSON.parse(fs.readFileSync(dbFilePath, "utf8"));
      let serverConfig = guildConfig.find((config) => config.guild_id === interaction.guild.id);
      serverConfig.enabled = interaction.options.getString("enable") == "true" ? true : false;
      fs.writeFileSync(dbFilePath, JSON.stringify(guildConfig, null, 2));
      let message = locales.run.changedEna[interaction.locale] ?? locales.run.changedEna.default;
      interaction.reply(message.replace("%enable%", interaction.options.getString("enable") == "true" ? "Enable" : "Disable"));
    }
    if (subcommand == "channel") {
      let guildConfig = JSON.parse(fs.readFileSync(dbFilePath, "utf8"));
      let serverConfig = guildConfig.find((config) => config.guild_id === interaction.guild.id);
      serverConfig.spawn_channel = interaction.options.getChannel("channel").id;
      fs.writeFileSync(dbFilePath, JSON.stringify(guildConfig, null, 2));
      let message = locales.run.changedChan[interaction.locale] ?? locales.run.changedChan.default;
      interaction.reply(message.replace("%channel%", interaction.options.getChannel("channel").name));
    }
    if (subcommand == "locale") {
      let guildConfig = JSON.parse(fs.readFileSync(dbFilePath, "utf8"));
      let serverConfig = guildConfig.find((config) => config.guild_id === interaction.guild.id);
      serverConfig.locale = interaction.options.getString("lang");
      fs.writeFileSync(dbFilePath, JSON.stringify(guildConfig, null, 2));
      let message = locales.run.changed[interaction.locale] ?? locales.run.changed.default;
      interaction.reply(message.replace("%lang%", interaction.options.getString("lang")));
    }
    if (subcommand == "auto-locale") {
      let guildConfig = JSON.parse(fs.readFileSync(dbFilePath, "utf8"));
      let serverConfig = guildConfig.find((config) => config.guild_id === interaction.guild.id);
      let guild = client.guilds.cache.get(serverConfig.guild_id);
      let local = "";
      if (guild.preferredLocale) {
        local = guild.preferredLocale;
      } else {
        local = interaction.locale;
      }
      serverConfig.locale = local;
      fs.writeFileSync(dbFilePath, JSON.stringify(guildConfig, null, 2));
      let message = locales.run.changed[interaction.locale] ?? locales.run.changed.default;
      interaction.reply(message.replace("%lang%", local));
    }
  },
};
