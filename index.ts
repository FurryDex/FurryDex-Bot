const yaml = require('js-yaml');
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
		const manager = new ShardingManager('./bot.js', { token: config.bot.token });

		manager.on('shardCreate', (shard) => require('./utils/Logger.ts').shard(null, `Lancement de la shard #${shard.id}`));

		manager.spawn();
	} catch (error) {
		require('./utils/Logger.ts').error(null, 'Error au lancement de shard !', error);
	}
} else {
	require('./bot.js');
}
