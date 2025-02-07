const { EmbedBuilder } = require('discord.js');
const Logger = require('../Logger');

function leaderboard_start(client) {
	leaderboard_update(client);
	setInterval(async () => {
		leaderboard_update(client);
	}, 60 * 60 * 1000);
}

async function leaderboard_update(client) {
	let serverConfig = await client.knex('guilds').catch((err) => console.error(err));

	serverConfig.forEach(async (guildConfig) => {
		if (guildConfig.leaderboard && guildConfig.leaderboard_channel) {
			let guild = client.guilds.cache.get(guildConfig.id);
			let members = await guild.members.fetch();
			let channel = guild.channels.cache.get(guildConfig.leaderboard_channel);
			let embeds = [];
			let leaderboard = JSON.parse(guildConfig.leaderboard);
			if (leaderboard.includes('1')) {
				let embed = new EmbedBuilder().setDescription('# Cards completion Leaderboard').setColor('Orange').setTimestamp();
				let users = await client.knex('users').catch((err) => Logger.error(err));
				users = users.filter((user) => members.has(user.id));
				users.sort((a, b) => b.card_completion - a.card_completion).slice(0, 10);
				embed.addFields([
					{ name: `🥇 •  \`${users[0] ? await client.users.fetch(users[0].id).then((user) => user.displayName) : '---'}\``, value: `↪ ***${users[0] ? users[0].card_completion : '---'}%***` },
					{ name: `🥈 • \`${users[1] ? await client.users.fetch(users[1].id).then((user) => user.displayName) : '---'}\``, value: `↪ ***${users[1] ? users[1].card_completion : '---'}%***` },
					{ name: `🥉 • \`${users[2] ? await client.users.fetch(users[2].id).then((user) => user.displayName) : '---'}\``, value: `↪ ***${users[2] ? users[2].card_completion : '---'}%***` },
					{ name: `4. • \`${users[3] ? await client.users.fetch(users[3].id).then((user) => user.displayName) : '---'}\``, value: `↪ ***${users[3] ? users[3].card_completion : '---'}%***` },
					{ name: `5. • \`${users[4] ? await client.users.fetch(users[4].id).then((user) => user.displayName) : '---'}\``, value: `↪ ***${users[4] ? users[4].card_completion : '---'}%***` },
					{ name: `6. • \`${users[5] ? await client.users.fetch(users[5].id).then((user) => user.displayName) : '---'}\``, value: `↪ ***${users[5] ? users[5].card_completion : '---'}%***` },
					{ name: `7. • \`${users[6] ? await client.users.fetch(users[6].id).then((user) => user.displayName) : '---'}\``, value: `↪ ***${users[6] ? users[6].card_completion : '---'}%***` },
					{ name: `8. • \`${users[7] ? await client.users.fetch(users[7].id).then((user) => user.displayName) : '---'}\``, value: `↪ ***${users[7] ? users[7].card_completion : '---'}%***` },
					{ name: `9. • \`${users[8] ? await client.users.fetch(users[8].id).then((user) => user.displayName) : '---'}\``, value: `↪ ***${users[8] ? users[8].card_completion : '---'}%***` },
					{ name: `10.• \`${users[9] ? await client.users.fetch(users[9].id).then((user) => user.displayName) : '---'}\``, value: `↪ ***${users[9] ? users[9].card_completion : '---'}%***` },
				]);
				embeds.push(embed);
			}
			if (leaderboard.includes('2')) {
				let embed = new EmbedBuilder().setDescription('# Cards Leaderboard').setColor('Orange').setTimestamp();
				let users = await client.knex('users').catch((err) => Logger.error(err));
				users = users.filter((user) => members.has(user.id));
				users.sort((a, b) => b.card_number - a.card_number).slice(0, 10);
				embed.addFields([
					{ name: `🥇 •  \`${users[0] ? await client.users.fetch(users[0].id).then((user) => user.displayName) : '---'}\``, value: `↪ ***${users[0] ? users[0].card_number : '---'}***` },
					{ name: `🥈 • \`${users[1] ? await client.users.fetch(users[1].id).then((user) => user.displayName) : '---'}\``, value: `↪ ***${users[1] ? users[1].card_number : '---'}***` },
					{ name: `🥉 • \`${users[2] ? await client.users.fetch(users[2].id).then((user) => user.displayName) : '---'}\``, value: `↪ ***${users[2] ? users[2].card_number : '---'}***` },
					{ name: `4. • \`${users[3] ? await client.users.fetch(users[3].id).then((user) => user.displayName) : '---'}\``, value: `↪ ***${users[3] ? users[3].card_number : '---'}***` },
					{ name: `5. • \`${users[4] ? await client.users.fetch(users[4].id).then((user) => user.displayName) : '---'}\``, value: `↪ ***${users[4] ? users[4].card_number : '---'}***` },
					{ name: `6. • \`${users[5] ? await client.users.fetch(users[5].id).then((user) => user.displayName) : '---'}\``, value: `↪ ***${users[5] ? users[5].card_number : '---'}***` },
					{ name: `7. • \`${users[6] ? await client.users.fetch(users[6].id).then((user) => user.displayName) : '---'}\``, value: `↪ ***${users[6] ? users[6].card_number : '---'}***` },
					{ name: `8. • \`${users[7] ? await client.users.fetch(users[7].id).then((user) => user.displayName) : '---'}\``, value: `↪ ***${users[7] ? users[7].card_number : '---'}***` },
					{ name: `9. • \`${users[8] ? await client.users.fetch(users[8].id).then((user) => user.displayName) : '---'}\``, value: `↪ ***${users[8] ? users[8].card_number : '---'}***` },
					{ name: `10.• \`${users[9] ? await client.users.fetch(users[9].id).then((user) => user.displayName) : '---'}\``, value: `↪ ***${users[9] ? users[9].card_number : '---'}***` },
				]);
				embeds.push(embed);
			}
			if (leaderboard.includes('3')) {
				let embed = new EmbedBuilder().setDescription('# Global Cards completion Leaderboard').setColor('Blue').setTimestamp();
				let users = await client.knex('users').catch((err) => Logger.error(err));
				users.map;
				users.sort((a, b) => b.card_completion - a.card_completion).slice(0, 10);
				embed.addFields([
					{ name: `🥇 •  \`${users[0] ? await client.users.fetch(users[0].id).then((user) => user.displayName) : '---'}\``, value: `↪ ***${users[0] ? users[0].card_completion : '---'}%***` },
					{ name: `🥈 • \`${users[1] ? await client.users.fetch(users[1].id).then((user) => user.displayName) : '---'}\``, value: `↪ ***${users[1] ? users[1].card_completion : '---'}%***` },
					{ name: `🥉 • \`${users[2] ? await client.users.fetch(users[2].id).then((user) => user.displayName) : '---'}\``, value: `↪ ***${users[2] ? users[2].card_completion : '---'}%***` },
					{ name: `4. • \`${users[3] ? await client.users.fetch(users[3].id).then((user) => user.displayName) : '---'}\``, value: `↪ ***${users[3] ? users[3].card_completion : '---'}%***` },
					{ name: `5. • \`${users[4] ? await client.users.fetch(users[4].id).then((user) => user.displayName) : '---'}\``, value: `↪ ***${users[4] ? users[4].card_completion : '---'}%***` },
					{ name: `6. • \`${users[5] ? await client.users.fetch(users[5].id).then((user) => user.displayName) : '---'}\``, value: `↪ ***${users[5] ? users[5].card_completion : '---'}%***` },
					{ name: `7. • \`${users[6] ? await client.users.fetch(users[6].id).then((user) => user.displayName) : '---'}\``, value: `↪ ***${users[6] ? users[6].card_completion : '---'}%***` },
					{ name: `8. • \`${users[7] ? await client.users.fetch(users[7].id).then((user) => user.displayName) : '---'}\``, value: `↪ ***${users[7] ? users[7].card_completion : '---'}%***` },
					{ name: `9. • \`${users[8] ? await client.users.fetch(users[8].id).then((user) => user.displayName) : '---'}\``, value: `↪ ***${users[8] ? users[8].card_completion : '---'}%***` },
					{ name: `10.• \`${users[9] ? await client.users.fetch(users[9].id).then((user) => user.displayName) : '---'}\``, value: `↪ ***${users[9] ? users[9].card_completion : '---'}%***` },
				]);
				embeds.push(embed);
			}
			if (leaderboard.includes('4')) {
				let embed = new EmbedBuilder().setDescription('# Global Cards Leaderboard').setColor('Blue').setTimestamp();
				let users = await client.knex('users').catch((err) => Logger.error(err));
				users.sort((a, b) => b.card_number - a.card_number).slice(0, 10);
				embed.addFields([
					{ name: `🥇 •  \`${users[0] ? await client.users.fetch(users[0].id).then((user) => user.displayName) : '---'}\``, value: `↪ ***${users[0] ? users[0].card_number : '---'}***` },
					{ name: `🥈 • \`${users[1] ? await client.users.fetch(users[1].id).then((user) => user.displayName) : '---'}\``, value: `↪ ***${users[1] ? users[1].card_number : '---'}***` },
					{ name: `🥉 • \`${users[2] ? await client.users.fetch(users[2].id).then((user) => user.displayName) : '---'}\``, value: `↪ ***${users[2] ? users[2].card_number : '---'}***` },
					{ name: `4. • \`${users[3] ? await client.users.fetch(users[3].id).then((user) => user.displayName) : '---'}\``, value: `↪ ***${users[3] ? users[3].card_number : '---'}***` },
					{ name: `5. • \`${users[4] ? await client.users.fetch(users[4].id).then((user) => user.displayName) : '---'}\``, value: `↪ ***${users[4] ? users[4].card_number : '---'}***` },
					{ name: `6. • \`${users[5] ? await client.users.fetch(users[5].id).then((user) => user.displayName) : '---'}\``, value: `↪ ***${users[5] ? users[5].card_number : '---'}***` },
					{ name: `7. • \`${users[6] ? await client.users.fetch(users[6].id).then((user) => user.displayName) : '---'}\``, value: `↪ ***${users[6] ? users[6].card_number : '---'}***` },
					{ name: `8. • \`${users[7] ? await client.users.fetch(users[7].id).then((user) => user.displayName) : '---'}\``, value: `↪ ***${users[7] ? users[7].card_number : '---'}***` },
					{ name: `9. • \`${users[8] ? await client.users.fetch(users[8].id).then((user) => user.displayName) : '---'}\``, value: `↪ ***${users[8] ? users[8].card_number : '---'}***` },
					{ name: `10.• \`${users[9] ? await client.users.fetch(users[9].id).then((user) => user.displayName) : '---'}\``, value: `↪ ***${users[9] ? users[9].card_number : '---'}***` },
				]);
				embeds.push(embed);
			}
			if (guildConfig.leaderboard_edit) {
				if (guildConfig.leaderboard_msg) {
					let message = (await channel.messages.fetch(guildConfig.leaderboard_msg)) ?? null;
					if (!message)
						channel.send({ embeds }).then((msg) => {
							message = msg;
							client
								.knex('guilds')
								.update({ leaderboard_msg: msg.id })
								.where({ id: guild.id })
								.catch((err) => {
									console.error(err);
								});
						});
					else message.edit({ embeds });
				} else {
					channel.send({ embeds }).then((msg) => {
						message = msg;
						client
							.knex('guilds')
							.update({ leaderboard_msg: msg.id })
							.where({ id: guild.id })
							.catch((err) => {
								console.error(err);
							});
					});
				}
			} else channel.send({ embeds });
		}
	});
}

module.exports = { leaderboard_start, leaderboard_update };
