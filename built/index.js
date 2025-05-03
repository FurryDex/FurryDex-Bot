"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var js_yaml_1 = __importDefault(require("js-yaml"));
var fs = require('fs');
var config;
try {
    config = js_yaml_1.default.load(fs.readFileSync('./config/config.yaml', 'utf8'));
}
catch (e) {
    console.error('Config file does not exist !', e);
}
if (config.bot.shard) {
    var ShardingManager = require('discord.js').ShardingManager;
    if (config.bot.api.enable)
        require('./api/server');
    try {
        var manager = new ShardingManager('./bot.ts', { token: config.bot.token });
        manager.on('shardCreate', function (shard) { return require('./utils/Logger').shard(null, "Lancement de la shard #".concat(shard.id)); });
        manager.spawn();
    }
    catch (error) {
        require('./utils/Logger').error(null, 'Erreur au lancement de shard !', error);
    }
}
else {
    require('./bot.ts');
}
