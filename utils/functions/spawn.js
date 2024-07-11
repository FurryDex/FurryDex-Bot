const fs = require("fs");
const { EmbedBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const config = require("../../config");
const Logger = require("../Logger.js");
const locales = require("../../locales/utils/function/spawn.json");

// Chemin du fichier de la base de données JSON
const dbFilePath = "./DB/guild_config.json";

function isXMinutesPassed(message, client) {
  try {
    // Charger la configuration du serveur à partir du fichier JSON
    let guildConfig = JSON.parse(fs.readFileSync(dbFilePath, "utf8"));

    const date = new Date();

    // Trouver la configuration pour le serveur actuel
    let serverConfig = guildConfig.find((config) => config.guild_id === message.guild.id);

    if (!serverConfig || !serverConfig.enabled || serverConfig.last_Card != null) {
      return false; // Le bot n'est pas activé pour ce serveur
    }
    if (!serverConfig.time || serverConfig.time == 0) {
      serverConfig.time = date.getTime() + 3_600_00;
      serverConfig.First_Check = date.getTime();
    }

    // Récupérer le nombre de membres dans le serveur
    const memberCount = message.guild.memberCount;

    // Calculer le temps en minutes en fonction du nombre de membres

    serverConfig.time = parseInt(serverConfig.time - (Math.floor(Math.random() * (60000 - 1000 + 1)) + 1000) / memberCount);

    //serverConfig.time = Math.max(serverConfig.time, serverConfig.First_Check + 600000);

    // Enregistrer la configuration mise à jour dans le fichier JSON
    fs.writeFileSync(dbFilePath, JSON.stringify(guildConfig, null, 2));

    // Vérifier si X minutes se sont écoulées depuis le dernier appel
    if (serverConfig.time <= date.getTime()) {
      serverConfig.time = date.getTime() + 3_600_000;
      serverConfig.First_Check = date.getTime();
      fs.writeFileSync(dbFilePath, JSON.stringify(guildConfig, null, 2));
      win(client, message);
      Logger.info("Apparition de la carte ...");
      return true;
    } else {
      return false;
    }
  } catch (error) {
    Logger.error("Error reading or writing database file:", error);
    return false;
  }
}

async function win(client, message) {
  let guildConfig = JSON.parse(fs.readFileSync(dbFilePath, "utf8"));
  let serverConfig = guildConfig.find((config) => config.guild_id === message.guild.id);
  const guild = await client.guilds.cache.get(serverConfig.guild_id);
  const channel = await guild.channels.cache.get(serverConfig.spawn_channel);
  const logGuild = await client.guilds.cache.get(config.server.ID);
  const logChannel = await logGuild.channels.cache.get(config.server.log);
  const card = IsAuthorInGuild(guild);

  if (!card) return console.log("No Author in Guild");

  serverConfig.last_Card = card.id;
  fs.writeFileSync(dbFilePath, JSON.stringify(guildConfig, null, 2));
  let guild_name = guild.name;
  if (guild.id == "1235970684556021890" || guild.id == "1177901864092708904" || guild.id == "1231289498286035054" || guild.id == "1139590285203083365") {
    guild_name = `👑 • ${guild.name}`;
  } else if (serverConfig.premium) {
    guild_name = `⭐ • ${guild.name}`;
  }
  setTimeout(async () => {
    if (config.server.enable_log) {
      let embed = new EmbedBuilder()
        .setTitle("Spawn")
        .setColor("Green")
        .setDescription(`***Guild**:* \`${guild_name}\` (\`${guild.id}\`)\n***Card**:* \`${card.name}\` (\`${card.id}\`)`)
        .setTimestamp();
      Logger.succes("Carte apparus.");
      logChannel.send({ embeds: [embed] });
    }
    const button = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("catch")
        .setDisabled(false)
        .setEmoji("<:hunt:1251975665398583387>")
        .setLabel(locales.button.text[serverConfig.locale] ?? locales.button.text.default)
        .setStyle(ButtonStyle.Danger)
    );
    let title = locales.embed.title[serverConfig.locale] ?? locales.embed.title.default;
    const embed = new EmbedBuilder().setTitle(title).setImage(card.image).setColor("Red");
    channel.send({ embeds: [embed], components: [button] }).then((msg) => {
      setTimeout(() => {
        // Charger la configuration du serveur à partir du fichier JSON
        let guildConfig = JSON.parse(fs.readFileSync(dbFilePath, "utf8"));

        // Trouver la configuration pour le serveur actuel
        let serverConfig = guildConfig.find((config) => config.guild_id === message.guild.id);
        serverConfig.last_Card = null;
        fs.writeFileSync(dbFilePath, JSON.stringify(guildConfig, null, 2));
        const newComponents = msg.components.map((row) => {
          return new ActionRowBuilder().addComponents(
            row.components.map((button) => {
              return new ButtonBuilder().setCustomId(button.customId).setLabel(button.label).setStyle(button.style).setDisabled(true); // Toggle the disabled state
            })
          );
        });
        msg.edit({ embeds: msg.embeds, components: newComponents }).catch(() => {});
      }, 300_000);
    });
  }, Math.floor(Math.random() * (15000 - 5000 + 1)) + 5000);
}

function randomCard() {
  let database = require("../../DB/cardlist.json");
  // Convertir l'objet JSON en un tableau de cartes avec leur rareté
  const cartes = Object.entries(database).map(([id, carte]) => ({ id, ...carte }));

  // Calculer la somme totale des raretés
  const sommeRaretés = cartes.reduce((acc, carte) => acc + carte.rarity, 0);

  // Générer un nombre aléatoire entre 0 et la somme des raretés
  const random = Math.random() * sommeRaretés;

  // Choisir la carte en fonction du nombre aléatoire
  let sommeTemp = 0;
  for (const carte of cartes) {
    sommeTemp += carte.rarity;
    if (random < sommeTemp) {
      return carte;
    }
  }
}

function IsAuthorInGuild(guild) {
  //  let i = 0;
  //  let carte = {};
  //  while (i != 21) {
  //    if ((i = 20)) {
  //      return false;
  //    }
  //    carte = new randomCard();
  //    if (guild.members.cache.get(carte.authorId) || carte.authorId == "0") {
  //      return carte;
  //    } else console.log(`Author: ${carte.author}, is not in guild: ${guild.name}`);
  //    i++;
  //    carte = {};
  //  }

  do {
    card = randomCard();
    member = guild.members.cache.get(card.authorId);
  } while (!member);

  return card;
}

module.exports = { isXMinutesPassed };
