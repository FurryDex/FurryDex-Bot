import { ApplicationCommandOptionType, PermissionFlagsBits, MessageFlags, CommandInteraction, CommandInteractionOptionResolver, Guild, GuildMember } from 'discord.js';
import { FDClient } from '../../bot';

module.exports = {
	name: 'emit',
	description: 'Emettre un evenement',
	category: 'admin',
	permissions: PermissionFlagsBits.Administrator,
	ownerOnly: true,
	options: [
		{
			name: 'event',
			description: 'Choose the event to emit',
			type: ApplicationCommandOptionType.String,
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
	runSlash: (client: FDClient, interaction: CommandInteraction) => {
		const eventChoices = (interaction.options as CommandInteractionOptionResolver).getString('event');

		if (eventChoices == 'guildMemberAdd') {
			client.emit('guildMemberAdd', interaction.member as GuildMember);
			interaction.reply({ content: 'Event Emis !', flags: MessageFlags.Ephemeral });
		}
		if (eventChoices == 'guildMemberRemove') {
			client.emit('guildMemberRemove', interaction.member as GuildMember);
			interaction.reply({ content: 'Event Emis !', flags: MessageFlags.Ephemeral });
		}
	},
};
