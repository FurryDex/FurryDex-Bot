const { ApplicationCommandOptionType, PermissionFlagsBits } = require("discord.js");

module.exports = {
  name: "guild",
  description: "send all guild",
  category: "admin",
  permissions: PermissionFlagsBits.Administrator,
  ownerOnly: true,
  run: (client, message, args) => {},
  runSlash: (client, interaction) => {
    interaction.reply(`Guild: \n${client.guilds.cache.map((guild, index) => `> [${index}] ${guild.name} (${guild.memberCount})\n`)}`);
  },
};
