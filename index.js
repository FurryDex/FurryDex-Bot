const config = require('./config.json');

if (config.shard) {
	const { ShardingManager } = require('discord.js');
	const dotenv = require('dotenv');
	dotenv.config();
	require('./api/server');

	try {
		const manager = new ShardingManager('./bot.js', { token: config.token });

		manager.on('shardCreate', (shard) => require('./utils/Logger').shard(null, `Lancement de la shard #${shard.id}`));

		manager.spawn();
	} catch (error) {
		return require('./utils/Logger').error(null, 'Error au lancement de shard !', error);
	}
} else {
	require('./bot.js');
}
