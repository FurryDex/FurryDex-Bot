const { EmbedBuilder, time, TimestampStyles } = require('discord.js');
const fs = require('fs');
const client = require('../../bot.js');
const locales = require('../../locales/utils/function/cards.json');

function cardEmbed(client, cardId, locale) {
	const cardF = {};
	const originalCardF = {};
	card(cardId).then((card) => {
		cardF = card;
	});
	originalCard(cardF.card_id).then((card) => {
		originalCardF = card;
	});
	//let creator = client.users.fetch(originalCardF.author);
	let date = new Date(cardF.date);
	let description = locales.embed.description[locale] ?? locales.embed.description.default;
	description = description
		.replace('%emoji_1%', '<:atlanta_crown:598174064183607317>')
		.replace('%author%', `<@${originalCardF.authorId}>`)
		.replace('%emoji_2%', '<:atlanta_id:598162717232332811>')
		.replace('%id%', cardF.id)
		.replace('%emoji_3%', '🪪')
		.replace('%name%', originalCardF.name)
		.replace('%emoji_4%', '📅')
		.replace('%time%', `${time(date, TimestampStyles.LongDateTime)} (${time(date, TimestampStyles.RelativeTime)})`)
		.replace('%emoji_5%', '❤️')
		.replace('%live%', cardF.live < 0 ? originalCardF.live - (originalCardF.live * cardF.live.replace('-', '')) / 100 : originalCardF.live + (originalCardF.live * cardF.live) / 100) //cardF.live < 0 ? originalCardF.live-(originalCardF.live*cardF.live/100) : originalCardF.live+(originalCardF.live*cardF.live/100)
		.replace('%live_2%', cardF.live)
		.replace('%emoji_6%', '<:atlanta_minecraft:598170502963396620>')
		.replace('%attacks%', cardF.attacks < 0 ? originalCardF.attacks - (originalCardF.attacks * cardF.attacks.replace('-', '')) / 100 : originalCardF.attacks + (originalCardF.attacks * cardF.attacks) / 100) //cardF.attacks < 0 ? originalCardF.attacks-(originalCardF.attacks*cardF.attacks/100) : originalCardF.attacks+(originalCardF.attacks*cardF.attacks/100)
		.replace('%attacks_2%', cardF.attacks);
	if (cardF.gived) {
		description = description.replace('%gived%', `${(locales.embed.giveBy[locale] ?? locales.embed.giveBy.default).replace('%emoji%', '<:atlanta_add:598176235700355083>').replace('%giver%', `<@${cardF.gived}>`)}\n`);
	} else {
		description = description.replace('%gived%', ``);
	}
	let embed = new EmbedBuilder()
		.setColor(originalCardF.color)
		.setTitle(`${originalCardF.name}`)
		.setDescription(description)
		//%emoji_1%, <:atlanta_crown:598174064183607317> | %author%, originalCardF.author | %emoji_2%, <:atlanta_id:598162717232332811> | %id%, cardF.id | %emoji_3%, 🪪
		//%name%`, originalCardF.name | %emoji_4%, 📅 | %time%, ${time(date, TimestampStyles.LongDateTime)} (${time(date, TimestampStyles.RelativeTime)}) | %emoji_5%, ❤️
		//%live%, originalCardF.live | %live_2%, cardF.live | %emoji_6%, <:atlanta_minecraft:598170502963396620> | %attacks%, originalCardF.attacks | %attacks_2%, cardF.attacks
		.setImage(originalCardF.card);
	return embed;
}

async function originalCard(client, cardId) {
	return await client.knex('cards').first('*').where({ id: cardId });
}

async function card(client, cardId) {
	return await client.knex('user_cards').first('*').where({ id: cardId });
}

module.exports = { card, cardEmbed, originalCard };
