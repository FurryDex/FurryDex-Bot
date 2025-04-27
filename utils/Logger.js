const chalk = require('chalk');
const dayjs = require('dayjs');

const format = '{tstamp} {tag} {text}';

function error(client, ...content) {
	content = content.join(`\n`);
	write(client, content, 'black', 'bgRed', 'ERROR', true);
}

function warn(client, ...content) {
	content = content.join(`\n`);
	write(client, content, 'black', 'bgYellow', 'WARN', false);
}

function typo(client, ...content) {
	content = content.join(`\n`);
	write(client, content, 'black', 'bgCyan', 'TYP0', false);
}

function command(client, ...content) {
	content = content.join(`\n`);
	write(client, content, 'magenta', 'bgBlack', 'CMD', false);
}

function event(client, ...content) {
	content = content.join(`\n`);
	write(client, content, 'green', 'bgBlack', 'EVT', false);
}

function client(client, ...content) {
	content = content.join(`\n`);
	write(client, content, 'cyan', 'bgBlack', 'CLIENT', false);
}

function shard(client, ...content) {
	content = content.join(`\n`);
	write(client, content, 'red', 'bgBlack', 'SHARD', false);
}

function succes(client, ...content) {
	content = content.join(`\n`);
	write(client, content, 'black', 'bgGreen', 'SUCCES', false);
}

function info(client, ...content) {
	content = content.join(`\n`);
	write(client, content, 'black', 'bgBlue', 'INFO', false);
}

function write(client, content, tagColor = 'black', bgTagColor, tag, error = false) {
	const timestamp = `[${dayjs().format('DD/MM - HH:mm:ss')}]`;
	const logTag = `[${tag}]`;
	const stream = error ? process.stderr : process.stdout;

	const item = format.replace('{tstamp}', chalk.gray(timestamp)).replace('{tag}', chalk[bgTagColor][tagColor](logTag)).replace('{text}', chalk.white(content));

	stream.write(item + '\n');

	color = bgTagColor.replace('bg', 'light');

	if (color == 'Black' || color == 'lightBlack') {
		color = tagColor;
	}

	if (client && client != null && client != undefined && client.guilds && !error) {
		require('./functions/DiscordLogger').write(client, { category: 'other', channel: client.config.log.thread.bot }, { tag: tag, color: color, description: '', info: [{ name: 'Write in host console', value: 'Yes' }], content: content });
	} else if (client && client != null && client != undefined && client.guilds && error) {
		require('./functions/DiscordLogger').write(
			client,
			{ category: 'other', channel: '1284433362307780658' },
			{
				tag: tag,
				color: color,
				description: '',
				info: [
					{ name: 'Write in host console', value: 'Yes' },
					{ name: 'ERROR', value: content },
				],
				content: 'ERREUR',
			}
		);
	}
}

module.exports = { error, warn, command, event, typo, client, shard, succes, info };
