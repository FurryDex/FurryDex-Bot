const fs = require('fs');

module.exports = {
	name: 'giveTo',
	async run(client, interaction) {
		const args = interaction.values[0].toString().split('_');

		let user = await client
			.knex('users')
			.first('*')
			.where({ id: args[1] })
			.catch((err) => console.error(err));

		if (!user) {
			client
				.knex('users')
				.insert({ user_id: args[1] })
				.catch((err) => console.error(err));
		}
		let date = new Date();
		client
			.knex('user_cards')
			.update({ user_id: args[1], gived: interaction.user.id, giveDate: date.toISOString() })
			.where({ user_id: interaction.user.id, id: args[0] })
			.catch((err) => console.error(err));

		require('../../utils/functions/DiscordLogger').writePlayer(client, interaction.user.id, {
			tag: 'GIVE',
			color: 'PINK',
			description: 'Card Give',
			info: [
				{ name: 'to', value: `${args[1]}` },
				{ name: 'card', value: `${args[0]}` },
			],
			content: 'Catch',
		});

		require('../../utils/functions/DiscordLogger').writePlayer(client, args[1], {
			tag: 'GIVE',
			color: 'PINK',
			description: 'Card Recieved',
			info: [
				{ name: 'from', value: `${interaction.user.id}` },
				{ name: 'card', value: `${args[0]}` },
			],
			content: 'Catch',
		});

		interaction.reply(`card \#${args[0]}\` from <@${interaction.user.id}> to <@${args[1]}> was give succefully`);
	},
};
