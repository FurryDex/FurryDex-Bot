import dayjs from 'dayjs';
import { FDClient } from '../bot';
import chalk from 'chalk';

const format = '{tstamp} {tag} {text}';

export function error(client: FDClient | null | undefined, ...content: [string] | string[]) {
	write(client, content.join('\n'), 'black', 'bgRed', 'ERR', true);
}

export function warn(client: FDClient | null | undefined, ...content: [string] | string[]) {
	write(client, content.join('\n'), 'black', 'bgYellow', 'WARN', false);
}

export function typo(client: FDClient | null | undefined, ...content: [string] | string[]) {
	write(client, content.join('\n'), 'black', 'bgCyan', 'TYP0', false);
}

export function command(client: FDClient | null | undefined, ...content: [string] | string[]) {
	write(client, content.join('\n'), 'magenta', 'bgBlack', 'CMD', false);
}

export function event(client: FDClient | null | undefined, ...content: [string] | string[]) {
	write(client, content.join('\n'), 'green', 'bgBlack', 'EVT', false);
}

export function client(client: FDClient | null | undefined, ...content: [string] | string[]) {
	write(client, content.join('\n'), 'cyan', 'bgBlack', 'CLT', false);
}

export function shard(client: FDClient | null | undefined, ...content: [string] | string[]) {
	write(client, content.join('\n'), 'red', 'bgBlack', 'SHRD', false);
}

export function succes(client: FDClient | null | undefined, ...content: [string] | string[]) {
	write(client, content.join('\n'), 'black', 'bgGreen', 'SUCCES', false);
}

export function info(client: FDClient | null | undefined, ...content: [string] | string[]) {
	write(client, content.join('\n'), 'black', 'bgBlue', 'INFO', false);
}

function write(client: FDClient | null | undefined, content: string, tagColor: string = 'black', bgTagColor: string, tag: string, error: boolean = false) {
	const timestamp = `[${dayjs().format('DD/MM - HH:mm:ss')}]`;
	const logTag = `[${tag}]`;
	const stream = error ? process.stderr : process.stdout;

	const item = format
		.replace('{tstamp}', chalk.gray(timestamp))
		.replace('{tag}', (chalk[bgTagColor] as any)[tagColor](logTag))
		.replace('{text}', chalk.white(content));

	stream.write(item + '\n');

	let color = bgTagColor.replace('bg', 'light');

	if (color == 'Black' || color == 'lightBlack') {
		color = tagColor;
	}

	if (client && client != null && client != undefined && client.guilds && !error) {
		async () => (await import('./functions/DiscordLogger')).write(client, { category: 'other', channel: client.config.log.thread.bot }, { tag: tag, color: color, description: '', info: [{ name: 'Write in host console', value: 'Yes' }], content: content });
	} else if (client && client != null && client != undefined && client.guilds && error) {
		async () =>
			(await import('./functions/DiscordLogger')).write(
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
