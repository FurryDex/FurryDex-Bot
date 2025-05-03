"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
module.exports = {
    name: 'emit',
    description: 'Emettre un evenement',
    category: 'admin',
    permissions: discord_js_1.PermissionFlagsBits.Administrator,
    ownerOnly: true,
    options: [
        {
            name: 'event',
            description: 'Choose the event to emit',
            type: discord_js_1.ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: 'guildMemberAdd',
                    value: 'guildMemberAdd',
                },
                {
                    name: 'guildMemberRemove',
                    value: 'guildMemberRemove',
                },
            ],
        },
    ],
    runSlash: function (client, interaction) {
        var eventChoices = interaction.options.getString('event');
        if (eventChoices == 'guildMemberAdd') {
            client.emit('guildMemberAdd', interaction.member);
            interaction.reply({ content: 'Event Emis !', flags: discord_js_1.MessageFlags.Ephemeral });
        }
        if (eventChoices == 'guildMemberRemove') {
            client.emit('guildMemberRemove', interaction.member);
            interaction.reply({ content: 'Event Emis !', flags: discord_js_1.MessageFlags.Ephemeral });
        }
    },
};
