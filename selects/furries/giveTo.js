const { cardEmbed } = require('../../utils/functions/card.js');
const fs = require('fs');

module.exports = {
	name: 'giveTo',
	async run(client, interaction) {
		const args = interaction.values[0].toString().split('_');
		let cardsBDD = JSON.parse(fs.readFileSync('./DB/cards.json', 'utf8'));
		let cardlistBDD = JSON.parse(fs.readFileSync('./DB/cardlist.json', 'utf8'));

		if (!cardsBDD.users[args[0]]) {
			cardsBDD.users[args[0]] = { id: [args[0]], cards: [] };
		}

		userCards = cardsBDD.users[args[1]].cards;
		let card = userCards.splice(userCards.indexOf({ date: args[2] }), 1);
		card = card[0];
		toUserCards = cardsBDD.users[args[0]].cards;
		card.gived = args[1];
		toUserCards.push(card);
		fs.writeFileSync('./DB/cards.json', JSON.stringify(cardsBDD, null, 2));

		interaction.reply(`carte pour ${args[0]} de ${args[1]}, ID: ${args[2]}`);
	},
};
