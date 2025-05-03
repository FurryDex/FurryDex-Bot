"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
module.exports = {
    name: 'send',
    description: 'Send a message',
    category: 'mod',
    permissions: discord_js_1.PermissionFlagsBits.ManageMessages,
    run: function (client, message, args) { },
    options: [
        {
            name: 'channel',
            description: 'Channel where the message will be send',
            type: discord_js_1.ApplicationCommandOptionType.Channel,
            required: true,
        },
        {
            name: 'message',
            description: 'Message to send',
            type: discord_js_1.ApplicationCommandOptionType.String,
            required: true,
        },
    ],
    runSlash: function (client, interaction) {
        var channel = interaction.options.getChannel('channel');
        var message = interaction.options.getString('message');
        channel.send(message);
    },
};
