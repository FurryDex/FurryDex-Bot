import { glob } from 'glob';
import Logger from '../Logger';
import { FDClient } from '../../bot';

module.exports = async (client: FDClient) => {
	(await glob(`./selects/*/*.ts`)).map(async (smFile) => {
		const sm = require(`${process.cwd()}/${smFile}`);
		if (!sm.name) return Logger.warn(client, `Nom Non Definie\nFile: ${smFile}`);
		client.selects.set(sm.name, sm);
	});
};
