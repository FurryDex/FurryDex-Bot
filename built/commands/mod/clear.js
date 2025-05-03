var _a = require('discord.js'), ApplicationCommandOptionType = _a.ApplicationCommandOptionType, PermissionFlagsBits = _a.PermissionFlagsBits;
module.exports = {
    name: 'clear',
    description: 'delete a wanted number message',
    category: 'mod',
    permissions: PermissionFlagsBits.ManageMessages,
    run: function (client, message, args) { },
    options: [
        {
            name: 'message',
            description: 'number of message you want to delete (1 - 99)',
            type: ApplicationCommandOptionType.Integer,
            required: true,
        },
    ],
    runSlash: function (client, interaction) {
        var message = interaction.options.getInteger('message');
        if (message >= 1 && message <= 99) {
            interaction.channel.bulkDelete(message).catch(function (err) { return console.error(err); });
            interaction
                .reply("Tout est dans l'odre !")
                .then(function (msg) {
                setTimeout(function () {
                    msg.delete();
                }, 5000);
            })
                .catch(function (err) { return console.error(err); });
        }
        else
            interaction.reply('Error, Usage: `/clear {Number of message (1-99)}`');
    },
};
