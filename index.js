let config;

try {
	config = yaml.load(fs.readFileSync('./config/config.yaml', 'utf8'));
} catch (e) {
	return console.error('Config file does not exist !', e);
}

if (config.bot.shard) {
	const { ShardingManager } = require('discord.js');
	if (config.bot.api.enable) require('./api/server');

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
