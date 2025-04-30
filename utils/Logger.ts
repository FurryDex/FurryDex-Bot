import chalk from 'chalk';
import dayjs from 'dayjs';

const format = '{tstamp} {tag} {text}';

export function error(client, ...content) {
	write(client, content.join(`\n`), 'black', 'bgRed', 'ERROR', true);
}

export function warn(client, ...content) {
	write(client, content.join(`\n`), 'black', 'bgYellow', 'WARN', false);
}

export function typo(client, ...content) {
	write(client, content.join(`\n`), 'black', 'bgCyan', 'TYP0', false);
}

export function command(client, ...content) {
	write(client, content.join(`\n`), 'magenta', 'bgBlack', 'CMD', false);
}

export function event(client, ...content) {
	write(client, content.join(`\n`), 'green', 'bgBlack', 'EVT', false);
}

export function client(client, ...content) {
	write(client, content.join(`\n`), 'cyan', 'bgBlack', 'CLIENT', false);
}

export function shard(client, ...content) {
	write(client, content.join(`\n`), 'red', 'bgBlack', 'SHARD', false);
}

export function succes(client, ...content) {
	write(client, content.join(`\n`), 'black', 'bgGreen', 'SUCCES', false);
}

export function info(client, ...content) {
	write(client, content.join(`\n`), 'black', 'bgBlue', 'INFO', false);
}

function write(client, content, tagColor = 'black', bgTagColor, tag, error = false) {
	const timestamp = `[${dayjs().format('DD/MM - HH:mm:ss')}]`;
	const logTag = `[${tag}]`;
	const stream = error ? process.stderr : process.stdout;

	const item = format.replace('{tstamp}', chalk.gray(timestamp)).replace('{tag}', chalk[bgTagColor][tagColor](logTag)).replace('{text}', chalk.white(content));

	stream.write(item + '\n');

	let color = bgTagColor.replace('bg', 'light');

	if (color == 'Black' || color == 'lightBlack') {
		color = tagColor;
	}

	if (client && client != null && client != undefined && client.guilds && !error) {
		require('./functions/DiscordLogger.ts').write(client, { category: 'other', channel: client.config.log.thread.bot }, { tag: tag, color: color, description: '', info: [{ name: 'Write in host console', value: 'Yes' }], content: content });
	} else if (client && client != null && client != undefined && client.guilds && error) {
		require('./functions/DiscordLogger.ts').write(
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

export default {
	error,
	warn,
	typo,
	command,
	event,
	client,
	shard,
	succes,
	info,
	write,
};
