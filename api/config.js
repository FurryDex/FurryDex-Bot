const yaml = require('js-yaml');
const fs = require('fs');

let YAMLConfig = yaml.load(fs.readFileSync('./config/config.yaml', 'utf8'));

module.exports = {
	DISCORD_TOKEN: YAMLConfig.bot.token,
	DISCORD_CLIENT_ID: YAMLConfig.bot.discord_client_id,
	DISCORD_CLIENT_SECRET: YAMLConfig.bot.discord_client_secret,
	DISCORD_REDIRECT_URI: YAMLConfig.bot.discord_redirect_uri,
	COOKIE_SECRET: YAMLConfig.bot.cookie_secret,
};
