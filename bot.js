const { ShardingManager } = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();

const manager = new ShardingManager("./index.js", { token: process.env.DISCORD_TOKEN });

manager.on("shardCreate", (shard) => require("./utils/Logger").shard(`Lancement de la shard #${shard.id}`));

manager.spawn();
