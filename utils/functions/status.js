const { EmbedBuilder } = require('discord.js');
const config = require('../../config');

let statusId = { STABLE: '1313907016451756044', CANARY: '1313907771967537213' };
let messageList = [
	{
		message: 'offline',
		label: '<:atlanta_online:616613445424513028> - Offline',
		color: 'RED',
	},
	{
		message: 'online',
		label: '<:atlanta_offline:616613445487558696> - Offline',
		color: 'GREEN',
	},
];

let type;

async function updateStatus(client, message) {
	if (client.user.id == config.bot.Stable) {
		type = 'STABLE';
	} else {
		type = 'CANARY';
	}

	client.actualMessage = message;

	const guild = client.guilds.cache.get(config.server.ID);
	const channel = guild.channels.cache.get(config.status.channel);
	const msgToEdit = await channel.messages.cache.get(statusId[type]);

	let color = require('../colors.json').find((color) => (color.name = messageList.find((msg) => msg.message == message).color)).hex;
	let embed = new EmbedBuilder()
		.setTitle('Status')
		.setColor(color)
		.addFields(
			{
				name: 'Status',
				value: `\`\`\`${messageList.find((msg) => msg.message == message).label}\`\`\``,
				inline: false,
			},
			{
				name: 'Latency',
				value: `\`\`\`${client.ws.ping} ms\`\`\``,
				inline: true,
			}
		)
		.setTimestamp();

	msgToEdit.edit(embed);
}

async function automaticUpdate(client) {
	setTimeout(() => {
		updateStatus(client, client.actualMessage);
	}, 30000);
}

module.exports = { updateStatus, automaticUpdate };
