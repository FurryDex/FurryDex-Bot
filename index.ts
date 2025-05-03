import yaml from 'js-yaml';
const fs = require('fs');

let config;
try {
	config = yaml.load(fs.readFileSync('./config/config.yaml', 'utf8'));
} catch (e) {
	console.error('Config file does not exist !', e);
}

if (config.bot.shard) {
	const { ShardingManager } = require('discord.js');
	if (config.bot.api.enable) require('./api/server');

	try {
		const manager = new ShardingManager('./bot.ts', { token: config.bot.token });

		manager.on('shardCreate', (shard: any) => require('./utils/Logger').shard(null, `Lancement de la shard #${shard.id}`));

		manager.spawn();
	} catch (error) {
		require('./utils/Logger').error(null, 'Erreur au lancement de shard !', error);
	}
} else {
	require('./bot.ts');
}
