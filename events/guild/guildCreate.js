const fs = require("fs");

module.exports = {
  name: "guildCreate",
  once: false,
  async execute(client, guild) {
    guild.commands.set(client.commands.map((cmd) => cmd));

    const guildConfig = JSON.parse(fs.readFileSync("./DB/guild_config.json", "utf8"));

    guildConfig.push({
      guild_id: guild.id,
      spawn_channel: null,
      enabled: false,
      time: 0,
      First_Check: 0,
      locale: "en-US",
      last_Card: null,
    });

    fs.writeFileSync("./DB/guild_config.json", JSON.stringify(guildConfig, null, 2));
  },
};
