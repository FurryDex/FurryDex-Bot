const config = require("../../config");
const Logger = require("../../utils/Logger");

const { REST, Routes } = require("discord.js");
const { clientId, token } = require("../../config.json");

let activity = "count my card ...";

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    Logger.client("Je suis prêt !");
    Logger.succes("Bot démaré avec succès !");

    //const rest = new REST().setToken(token);
    //await rest.put(Routes.applicationCommands(clientId), { body: client.commands });

    client.application.commands.set(client.commands.map((cmd) => cmd));

    client.user.setPresence({
      activities: [{ name: activity }],
    });
  },
};
