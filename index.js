const { ShardingManager } = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();

try {
  const manager = new ShardingManager("./bot.js", { token: process.env.DISCORD_TOKEN });

  manager.on("shardCreate", (shard) => require("./utils/Logger").shard(`Lancement de la shard #${shard.id}`));

  manager.spawn();
} catch {
  return require("./utils/Logger").error("Error au lancement de shard !");
}
