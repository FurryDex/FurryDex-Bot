import { AnySelectMenuInteraction, Guild } from 'discord.js';
import { FDClient } from '../../bot';

module.exports = {
	name: 'leaderboard',
	async run(client: FDClient, interaction: AnySelectMenuInteraction) {
		await interaction.deferReply();
		client
			.knex('guilds')
			.update({ leaderboard: JSON.stringify(interaction.values) || '[]' })
			.where({ id: (interaction.guild as Guild).id })
			.catch((err: any) => console.log(err));
		interaction.editReply({ content: 'The different leaderboards to show have been edited' });
	},
};
