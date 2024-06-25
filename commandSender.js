const { REST, Routes, PermissionFlagsBits } = require("discord.js");
const { clientId, guildId, token } = require("./config.json");
const fs = require("node:fs");
const path = require("node:path");

const commands = [];
// Grab all the command folders from the commands directory you created earlier
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

const permissionArray = {
  CREATE_INSTANT_INVITE: {
    BigInt: PermissionFlagsBits.CreateInstantInvite,
  },
  KICK_MEMBERS: {
    BigInt: PermissionFlagsBits.KickMembers,
  },
  BAN_MEMBERS: {
    BigInt: PermissionFlagsBits.BanMembers,
  },
  ADMINISTRATOR: {
    BigInt: PermissionFlagsBits.Administrator,
  },
  MANAGE_CHANNELS: {
    BigInt: PermissionFlagsBits.ManageChannels,
  },
  MANAGE_GUILD: {
    BigInt: PermissionFlagsBits.ManageGuild,
  },
  ADD_REACTIONS: {
    BigInt: PermissionFlagsBits.AddReactions,
  },
  VIEW_AUDIT_LOG: {
    BigInt: PermissionFlagsBits.ViewAuditLog,
  },
  PRIORITY_SPEAKER: {
    BigInt: PermissionFlagsBits.PrioritySpeaker,
  },
  STREAM: {
    BigInt: PermissionFlagsBits.Stream,
  },
  VIEW_CHANNEL: {
    BigInt: PermissionFlagsBits.ViewChannel,
  },
  SEND_MESSAGES: {
    BigInt: PermissionFlagsBits.SendMessages,
  },
  SEND_TTS_MESSAGES: {
    BigInt: PermissionFlagsBits.SendTTSMessages,
  },
  MANAGE_MESSAGES: {
    BigInt: PermissionFlagsBits.ManageMessages,
  },
  EMBED_LINKS: {
    BigInt: PermissionFlagsBits.EmbedLinks,
  },
  ATTACH_FILES: {
    BigInt: PermissionFlagsBits.AttachFiles,
  },
  READ_MESSAGE_HISTORY: {
    BigInt: PermissionFlagsBits.ReadMessageHistory,
  },
  MENTION_EVERYONE: {
    BigInt: PermissionFlagsBits.MentionEveryone,
  },
  USE_EXTERNAL_EMOJIS: {
    BigInt: PermissionFlagsBits.UseExternalEmojis,
  },
  VIEW_GUILD_INSIGHTS: {
    BigInt: PermissionFlagsBits.ViewGuildInsights,
  },
  CONNECT: {
    BigInt: PermissionFlagsBits.Connect,
  },
  SPEAK: {
    BigInt: PermissionFlagsBits.Speak,
  },
  MUTE_MEMBERS: {
    BigInt: PermissionFlagsBits.MuteMembers,
  },
  DEAFEN_MEMBERS: {
    BigInt: PermissionFlagsBits.DeafenMembers,
  },
  MOVE_MEMBERS: {
    BigInt: PermissionFlagsBits.MoveMembers,
  },
  USE_VAD: {
    BigInt: PermissionFlagsBits.UseVAD,
  },
  CHANGE_NICKNAME: {
    BigInt: PermissionFlagsBits.ChangeNickname,
  },
  MANAGE_NICKNAMES: {
    BigInt: PermissionFlagsBits.ManageNicknames,
  },
  MANAGE_ROLES: {
    BigInt: PermissionFlagsBits.ManageRoles,
  },
  MANAGE_WEBHOOKS: {
    BigInt: PermissionFlagsBits.ManageWebhooks,
  },
  MANAGE_EMOJIS_AND_STICKERS: {
    BigInt: PermissionFlagsBits.ManageEmojisAndStickers,
  },
  USE_APPLICATION_COMMANDS: {
    BigInt: PermissionFlagsBits.UseApplicationCommands,
  },
  REQUEST_TO_SPEAK: {
    BigInt: PermissionFlagsBits.RequestToSpeak,
  },
  MANAGE_EVENTS: {
    BigInt: PermissionFlagsBits.ManageEvents,
  },
  MANAGE_THREADS: {
    BigInt: PermissionFlagsBits.ManageThreads,
  },
  USE_PUBLIC_THREADS: {
    BigInt: null,
  },
  CREATE_PUBLIC_THREADS: {
    BigInt: PermissionFlagsBits.CreatePublicThreads,
  },
  USE_PRIVATE_THREADS: {
    BigInt: null,
  },
  CREATE_PRIVATE_THREADS: {
    BigInt: PermissionFlagsBits.CreatePrivateThreads,
  },
  USE_EXTERNAL_STICKERS: {
    BigInt: PermissionFlagsBits.UseExternalStickers,
  },
  SEND_MESSAGES_IN_THREADS: {
    BigInt: PermissionFlagsBits.SendMessagesInThreads,
  },
  START_EMBEDDED_ACTIVITIES: {
    BigInt: PermissionFlagsBits.START_EMBEDDED_ACTIVITIES,
  },
  MODERATE_MEMBERS: {
    BigInt: PermissionFlagsBits.ModerateMembers,
  },
};

for (const folder of commandFolders) {
  // Grab all the command files from the commands directory you created earlier
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".js"));
  // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    const cmd = command;
    if (!cmd.default_member_permissions) cmd.default_member_permissions = [];
    if (!cmd.dm_permission) cmd.dm_permission = false;

    //if (!cmd.permissions) cmd.permissions = [];
    //cmd.permissions.forEach((permission) => {
    //  cmd.default_member_permissions.push(permissionArray[permission].Big);
    //});

    if (cmd.fullyTranslated) {
      try {
        let locales = require(`../../locales/commands/${cmd.name}.json`);
        cmd.nameLocalizations = locales.name;
        cmd.descriptionLocalizations = locales.description;
        if (cmd.options) {
          cmd.options.forEach((option, index) => {
            option.nameLocalizations = locales.options[index].name;
            option.descriptionLocalizations = locales.options[index].description;
            if (option.choices) {
              suboption.choices.forEach((optionchoices, indexchoices) => {
                optionchoices.nameLocalizations = locales.options[index].choices[indexchoices].name;
              });
            }
            if (option.options) {
              option.options.forEach((suboption, subindex) => {
                suboption.nameLocalizations = locales.options[index].options[subindex].name;
                suboption.descriptionLocalizations = locales.options[index].options[subindex].description;
                if (option.choices) {
                  suboption.choices.forEach((suboptionchoices, subindexchoices) => {
                    suboptionchoices.nameLocalizations = locales.options[index].options[subindex].choices[subindexchoices].name;
                  });
                }
              });
            }
          });
        }
      } catch {}
    }
    if ("name" in command && "description" in command && "runSlash" in command) {
      commands.push(command);
    } else {
      console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
  }
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

// and deploy your commands!
(async () => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(Routes.applicationCommands(clientId), { body: commands });

    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();
