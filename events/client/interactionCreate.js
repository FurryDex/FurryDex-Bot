const { InteractionType, EmbedBuilder, MessageFlags } = require('discord.js');
const Logger = require('../../utils/Logger.js');
module.exports = {
	name: 'interactionCreate',
	once: false,
	async execute(client, interaction) {
		if (interaction.type === InteractionType.ApplicationCommand) {
			const cmd = client.commands.get(interaction.commandName);
			if (!cmd) {
				Logger.warn(client, `Command "${interaction.commandName}" dosn't exist`);
				return interaction.reply({
					content: "Sorry, this *command* dosn't exit. Er0r: 404",
					ephemerel: true,
				});
			}

			if (cmd.permissions) {
				if (!interaction.member.permissions.has([cmd.permissions]))
					return interaction.reply({
						content: "You dosn't have the nescessary permission",
						flags: MessageFlags.Ephemeral,
					});
			}
			if (cmd.ownerOnly) {
				if (interaction.user.id != client.config.owner) return interaction.reply('You need to be the creator for execute this command.');
			}

			cmd.runSlash(client, interaction);
		} else if (interaction.isButton()) {
			if (interaction.customId.includes('--')) return;
			const btn = client.buttons.get(interaction.customId);
			if (!btn) {
				Logger.warn(client, `Button "${interaction.customId}" dosn't exist`);
				return interaction.reply({
					content: "Sorry, this *button* dosn't exit. Er0r: 404",
					flags: MessageFlags.Ephemeral,
				});
			}
			interaction.customId = interaction.customId.replace(/{*}*/g, '');
			btn.run(client, interaction);
		} else if (interaction.type === InteractionType.ModalSubmit) {
			const modal = client.modals.get(interaction.customId);
			if (!modal) {
				Logger.warn(client, `Modal "${interaction.customId}" dosn't exist`);
				return interaction.reply({
					content: "Sorry, this *form* dosn't exit. Er0r: 404",
					flags: MessageFlags.Ephemeral,
				});
			}
			modal.run(client, interaction);
		} else if (interaction.isStringSelectMenu()) {
			const select = client.selects.get(interaction.customId);
			if (!select) {
				Logger.warn(client, `Select "${interaction.customId}" dosn't exist`);
				return interaction.reply({
					content: "Sorry, this *select menu* dosn't exit. Er0r: 404",
					flags: MessageFlags.Ephemeral,
				});
			}
			select.run(client, interaction);
		}
	},
};
