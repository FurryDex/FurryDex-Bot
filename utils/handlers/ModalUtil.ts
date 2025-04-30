import { glob } from 'glob';
import Logger from '../Logger';

module.exports = async (client) => {
	(await glob(`./modals/*/*.ts`)).map(async (modalFile) => {
		const modal = require(`${process.cwd()}/${modalFile}`);
		if (!modal.name) return Logger.warn(client, `Nom Non Definie\nFile: ${modalFile}`);
		client.modals.set(modal.name, modal);
	});
};
