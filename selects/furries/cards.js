const { cardEmbed } = require('../../utils/functions/card.js');

module.exports = {
	name: 'cards',
	async run(client, interaction) {
		cardEmbed(client, interaction.values[0], interaction.locale).then((embed) => {
			interaction.reply({ embeds: [embed] });
		});
	},
};
