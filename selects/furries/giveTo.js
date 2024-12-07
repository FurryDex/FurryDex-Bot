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
		client
			.knex('user_cards')
			.update({ user_id: args[1] })
			.where({ user_id: interaction.user.id })
			.catch((err) => console.error(err));

		interaction.reply(`carte pour ${args[0]} de ${args[1]}, ID: ${args[2]}`);
	},
};
