const { cardEmbed } = require('../../utils/functions/card.js');

module.exports = {
	name: 'cards',
	async run(client, interaction) {
		interaction.reply({ embeds: [cardEmbed(interaction.values[0], interaction.locale)] });
	},
};
