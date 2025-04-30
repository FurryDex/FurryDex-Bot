import { glob } from 'glob';
import Logger from '../Logger';

module.exports = async (client) => {
	(await glob(`./events/*/*.ts`, {})).map(async (eventFile) => {
		const event = require(`${process.cwd()}/${eventFile}`);

		if (!eventList.includes(event.name) || !event.name) {
			return Logger.warn(client, `Nom Non Derfinie\nFile: ${eventFile}`);
		}

		if (event.once) {
			client.once(event.name, (...args) => event.execute(client, ...args));
		} else {
			client.on(event.name, (...args) => event.execute(client, ...args));
		}

		Logger.event(null, `Chargé: ${event.name}`);
	});
};

const eventList = [
	'apiRequest',
	'apiResponse',
	'applicationCommandCreate',
	'applicationCommandDelete',
	'applicationCommandUpdate',
	'channelCreate',
	'channelDelete',
	'channelPinsUpdate',
	'channelUpdate',
	'debug',
	'emojiCreate',
	'emojiDelete',
	'emojiUpdate',
	'error',
	'guildBanAdd',
	'guildBanRemove',
	'guildCreate',
	'guildDelete',
	'guildIntegrationsUpdate',
	'guildMemberAdd',
	'guildMemberAvailable',
	'guildMemberRemove',
	'guildMembersChunk',
	'guildMemberUpdate',
	'guildScheduledEventCreate',
	'guildScheduledEventDelete',
	'guildScheduledEventUpdate',
	'guildScheduledEventUserAdd',
	'guildScheduledEventUserRemove',
	'guildUnavailable',
	'guildUpdate',
	'interaction',
	'interactionCreate',
	'invalidated',
	'invalidRequestWarning',
	'inviteCreate',
	'inviteDelete',
	'message',
	'messageCreate',
	'messageDelete',
	'messageDeleteBulk',
	'messageReactionAdd',
	'messageReactionRemove',
	'messageReactionRemoveAll',
	'messageReactionRemoveEmoji',
	'messageUpdate',
	'presenceUpdate',
	'rateLimit',
	'ready',
	'roleCreate',
	'roleDelete',
	'roleUpdate',
	'shardDisconnect',
	'shardError',
	'shardReady',
	'shardReconnecting',
	'shardResume',
	'stageInstanceCreate',
	'stageInstanceDelete',
	'stageInstanceUpdate',
	'stickerCreate',
	'stickerDelete',
	'stickerUpdate',
	'threadCreate',
	'threadDelete',
	'threadListSync',
	'threadMembersUpdate',
	'threadMemberUpdate',
	'threadUpdate',
	'typingStart',
	'userUpdate',
	'voiceStateUpdate',
	'warn',
	'webhookUpdate',
];
