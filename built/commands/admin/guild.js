"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
module.exports = {
    name: 'guild',
    description: 'send all guild',
    category: 'admin',
    permissions: discord_js_1.PermissionFlagsBits.Administrator,
    ownerOnly: true,
    runSlash: function (client, interaction) {
        interaction.reply({ content: "Guild: ".concat(client.guilds.cache.map(function (guild, index) { return "\n> [".concat(index, "] ").concat(guild.name, " (").concat(guild.memberCount, ")"); }).join('')), flags: discord_js_1.MessageFlags.Ephemeral });
    },
};
