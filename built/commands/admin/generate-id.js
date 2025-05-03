"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
module.exports = {
    name: 'generate-id',
    description: 'Generate an ID for card',
    category: 'admin',
    permissions: discord_js_1.PermissionFlagsBits.Administrator,
    ownerOnly: true,
    runSlash: function (client, interaction) {
        var uid = function () {
            return Date.now().toString(36) + Math.random().toString(36).substr(2);
        };
        interaction.reply("".concat(uid(), "\n").concat(new Date().toISOString()));
    },
};
