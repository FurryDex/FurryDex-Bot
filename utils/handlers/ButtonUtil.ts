import { glob } from 'glob';
import Logger from '../Logger';
import { FDClient } from '../../bot';

module.exports = async (client: FDClient) => {
	(await glob(`./buttons/*/*.ts`, {})).map(async (btnFile) => {
		const btn = require(`${process.cwd()}/${btnFile}`);
		if (!btn.name) return Logger.warn(client, `\n-----\nERROR: btn: No Name\nFile: ${btnFile}\n-----\n`);
		client.buttons.set(btn.name, btn);
	});
};
