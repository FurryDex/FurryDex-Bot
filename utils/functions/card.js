const { EmbedBuilder, time, TimestampStyles } = require('discord.js');
const Logger = require('../Logger');

async function cardEmbed(client, cardId, locale) {
	const locales = client.locales.utils.function.cards;
	let cardF = {};
	let originalCardF = {};
	await card(client, cardId).then((card) => {
		cardF = card;
	});
	await originalCard(client, cardF.card_id).then((card) => {
		originalCardF = card;
	});
	//let creator = client.users.fetch(originalCardF.author);
	let species = [];
	await JSON.parse(originalCardF.species).forEach(async (species_id) => {
		let species_name = await client
			.knex('species')
			.first('*')
			.where({ id: species_id })
			.catch((err) => {
				console.error(err);
			});
		species.push(species_name.name);
	});

	let data_type = await client
		.knex('category')
		.first('*')
		.where({ id: originalCardF.category })
		.catch((err) => {
			console.error(err);
		});
	let temp_type = data_type.name;
	let type = temp_type.charAt(0).toUpperCase() + temp_type.slice(1);

	let color = require('../colors.json').find((color) => color.name == (data_type.color ?? originalCardF.color))?.hex ?? '#000000';

	if (color == '#000000') {
		Logger.warn('Color Error at card ' + cardF.card_id);
	}

	let date = new Date(cardF.date);

	let description = locales.embed.description[locale] ?? locales.embed.description['en-US'];
	description = description
		.replace('%author%', `<@${originalCardF.authorId}>`)
		.replace('%id%', cardF.id)
		.replace('%name%', originalCardF.name)
		.replace('%time%', `${time(date, TimestampStyles.LongDateTime)} (${time(date, TimestampStyles.RelativeTime)})`)
		.replace('%type%', type)
		.replace('%species%', formatArrayToText(species))
		.replace('%live%', cardF.live < 0 ? originalCardF.live - (originalCardF.live * cardF.live.replace('-', '')) / 100 : originalCardF.live + (originalCardF.live * cardF.live) / 100) //cardF.live < 0 ? originalCardF.live-(originalCardF.live*cardF.live/100) : originalCardF.live+(originalCardF.live*cardF.live/100)
		.replace('%live_2%', cardF.live)
		.replace('%attacks%', cardF.attacks < 0 ? originalCardF.attacks - (originalCardF.attacks * cardF.attacks.replace('-', '')) / 100 : originalCardF.attacks + (originalCardF.attacks * cardF.attacks) / 100) //cardF.attacks < 0 ? originalCardF.attacks-(originalCardF.attacks*cardF.attacks/100) : originalCardF.attacks+(originalCardF.attacks*cardF.attacks/100)
		.replace('%attacks_2%', cardF.attacks);
	if (cardF.gived != 0) {
		let giveDate = new Date(cardF.giveDate);
		description = description.replace(
			'%gived%',
			`${(locales.embed.giveBy[locale] ?? locales.embed.giveBy['en-US']).replace('%giver%', `<@${cardF.gived}>`).replace('%giveTime%', `${time(giveDate, TimestampStyles.LongDateTime)} (${time(giveDate, TimestampStyles.RelativeTime)})`)}\n`
		);
	} else {
		description = description.replace('%gived%', ``);
	}
	if (originalCardF.birthday) {
		let birthday = new Date(originalCardF.birthday);
		let nextBirthday = new Date(originalCardF.birthday);
		nextBirthday.setFullYear(new Date().getFullYear());
		if (nextBirthday < new Date()) nextBirthday.setFullYear(new Date().getFullYear() + 1);
		description = description.replace(
			'%birthday%',
			`${(locales.embed.birthday[locale] ?? locales.embed.birthday['en-US']).replace('%birthday%', `${time(birthday, TimestampStyles.ShortDateTime)} (${time(birthday, TimestampStyles.RelativeTime)}) → ${time(nextBirthday, TimestampStyles.RelativeTime)}`)}\n`
		);
	} else {
		description = description.replace('%birthday%', ``).replace('%nextBirthday%', ``);
	}
	let embed = new EmbedBuilder()
		.setColor(color)
		.setTitle(`${originalCardF.emoji} ${originalCardF.name}`)
		.setDescription(description)
		//%emoji_1%, <:atlanta_crown:598174064183607317> | %author%, originalCardF.author | %emoji_2%, <:atlanta_id:598162717232332811> | %id%, cardF.id | %emoji_3%, 🪪
		//%name%`, originalCardF.name | %emoji_4%, 📅 | %time%, ${time(date, TimestampStyles.LongDateTime)} (${time(date, TimestampStyles.RelativeTime)}) | %emoji_5%, ❤️
		//%live%, originalCardF.live | %live_2%, cardF.live | %emoji_6%, <:atlanta_minecraft:598170502963396620> | %attacks%, originalCardF.attacks | %attacks_2%, cardF.attacks
		.setImage(originalCardF.card);
	return embed;
}

async function originalCard(client, cardId) {
	return await client
		.knex('cards')
		.first('*')
		.where({ id: cardId })
		.catch((err) => {
			console.error(err);
		});
}

async function card(client, cardId) {
	return await client
		.knex('user_cards')
		.first('*')
		.where({ id: cardId })
		.catch((err) => {
			console.error(err);
		});
}

function formatArrayToText(array) {
	if (array.length === 0) return '';

	// Met la première lettre de chaque mot en majuscule
	const capitalizedArray = array.map((word) => word.charAt(0).toUpperCase() + word.slice(1));

	// Gère le format de la chaîne de texte finale
	if (capitalizedArray.length === 1) {
		return capitalizedArray[0];
	} else {
		const lastItem = capitalizedArray.pop();
		return capitalizedArray.join(', ') + ' and ' + lastItem;
	}
}

module.exports = { card, cardEmbed, originalCard };
