const { InteractionType, EmbedBuilder } = require("discord.js");
const config = require("../../config");
const Logger = require("../../utils/Logger.js");
module.exports = {
  name: "interactionCreate",
  once: false,
  async execute(client, interaction) {
    if (interaction.type === InteractionType.ApplicationCommand) {
      const cmd = client.commands.get(interaction.commandName);
      if (!cmd) {
        Logger.warn(`Command "${interaction.commandName}" dosn't exist`);
        return interaction.reply({
          content: "Sorry, this *command* dosn't exit. Er0r: 404",
          ephemerel: true,
        });
      }

      if (cmd.permissions) {
        if (!interaction.member.permissions.has([cmd.permissions]))
          return interaction.reply({
            content: "You dosn't have the nescessary permission",
            ephemeral: true,
          });
      }
      if (cmd.ownerOnly) {
        if (interaction.user.id != config.creator) return interaction.reply("You need to be the creator for execute this command.");
      }

      cmd.runSlash(client, interaction);
    } else if (interaction.isButton()) {
      const btn = client.buttons.get(interaction.customId);
      if (!btn) {
        Logger.warn(`Button "${interaction.customId}" dosn't exist`);
        return interaction.reply({
          content: "Sorry, this *button* dosn't exit. Er0r: 404",
          ephemeral: true,
        });
      }
      btn.run(client, interaction);
    } else if (interaction.type === InteractionType.ModalSubmit) {
      const modal = client.modals.get(interaction.customId);
      if (!modal) {
        Logger.warn(`Modal "${interaction.customId}" dosn't exist`);
        return interaction.reply({
          content: "Sorry, this *form* dosn't exit. Er0r: 404",
          ephemeral: true,
        });
      }
      modal.run(client, interaction);
    } else if (interaction.isStringSelectMenu()) {
      const select = client.selects.get(interaction.customId);
      if (!select) {
        Logger.warn(`Select "${interaction.customId}" dosn't exist`);
        return interaction.reply({
          content: "Sorry, this *select menu* dosn't exit. Er0r: 404",
          ephemeral: true,
        });
      }
      select.run(client, interaction);
    }
  },
};
