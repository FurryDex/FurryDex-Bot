"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var readdirSync = require('fs').readdirSync;
var commandFolder = readdirSync('./commands');
var prefix = '/';
var categoryName = {
    admin: {
        default: '🟥 Administrator',
        fr: '🟥 Administration',
    },
    furries: {
        default: '🐺 Furries',
        fr: '🐺 Furries',
    },
    mod: {
        default: '🔰 Moderator',
        fr: '🔰 Modération',
    },
    utils: {
        default: '🟢 Utils',
        fr: '🟢 Utilitaire',
    },
};
module.exports = {
    name: 'help',
    category: 'utils',
    usage: 'help <command>',
    examples: ['help ping', 'help furries'],
    description: 'Need help ?',
    permissions: null,
    contexts: [discord_js_1.InteractionContextType.PrivateChannel, discord_js_1.InteractionContextType.Guild, discord_js_1.InteractionContextType.BotDM],
    run: function (client, message, args) { },
    options: [
        {
            name: 'command',
            description: 'Write the name of your command',
            type: discord_js_1.ApplicationCommandOptionType.String,
            require: false,
        },
    ],
    runSlash: function (client, interaction) {
        var cmdName = interaction.options.getString('command');
        if (!cmdName) {
            var noArgsEmbed = new discord_js_1.EmbedBuilder().setColor('#f54ea7').setDescription('List of commands of the bot. Use `/help <commands>` For see more commands information');
            var _loop_1 = function (category) {
                noArgsEmbed.addFields([
                    {
                        name: "".concat(categoryName[category] ? "".concat(categoryName[category][interaction.locale] ? categoryName[category][interaction.locale] : categoryName[category]['default']) : "\uD83D\uDD38 ".concat(category.replace(/(^\w|\s\w)/g, function (firstLetter) { return firstLetter.toUpperCase(); }))),
                        value: "`".concat(client.commands
                            .filter(function (cmd) { return cmd.category == category.toLowerCase(); })
                            .filter(function (cmd) { return cmd.ownerOnly != true; })
                            .map(function (cmd) { return cmd.name; })
                            .join(', '), "`"),
                    },
                ]);
            };
            for (var _i = 0, commandFolder_1 = commandFolder; _i < commandFolder_1.length; _i++) {
                var category = commandFolder_1[_i];
                _loop_1(category);
            }
            return interaction.reply({ embeds: [noArgsEmbed], flags: discord_js_1.MessageFlags.Ephemeral });
        }
        var cmd = client.commands.get(cmdName);
        if (!cmd)
            return interaction.reply("This commands dosn't exist!");
        return interaction.reply("\n```makefile\n[Help: Command -> ".concat(cmd.name, "] ").concat(cmd.ownerOnly ? "⚠️ Command reserved to bot's owner ⚠️" : cmd.staffOnly ? "🔰 Command reserved to bot's staff 🔰" : '', "\n\n").concat(cmd.description, "\n").concat(cmd.usage ? "\nUsage: ".concat(prefix).concat(cmd.usage).concat(cmd.examples ? "Examples: ".concat(prefix).concat(cmd.examples.join(" | ".concat(prefix))) : "", "\n") : '', "\n- - -\n\n").concat(prefix, " = prefix used by the bot (/commands is also possible)\n{} = sub-command(s) possible | [] = required option(s) | <> = optional(s) option(s)\nDo not includes thes caracter -> {}, [] and <> in your commands\n```"));
    },
};
//`🔸 ${category.replace(/(^\w|\s\w)/g, (firstLetter) => firstLetter.toUpperCase())}`,
//`\`${client.commands
//  .filter((cmd) => cmd.category == category.toLowerCase())
//  .map((cmd) => cmd.name)
//  .join(", ")}\``
