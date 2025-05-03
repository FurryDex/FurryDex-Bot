"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var glob_1 = require("glob");
var Logger_1 = __importDefault(require("../Logger"));
var process = require('process');
module.exports = function (client) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, glob_1.glob)("./commands/*/*.ts")];
            case 1:
                (_a.sent()).map(function (cmdFile) { return __awaiter(void 0, void 0, void 0, function () {
                    var cmd;
                    return __generator(this, function (_a) {
                        cmd = require("".concat(process.cwd(), "/").concat(cmdFile));
                        if (!cmd.name)
                            return [2 /*return*/, Logger_1.default.warn(null, "Nom Non Definie\nFichier: ".concat(cmdFile))];
                        if (cmd.name == 'furry' && client.config.bot.base_command)
                            cmd.name = client.config.bot.base_command;
                        if (!cmd.description)
                            return [2 /*return*/, Logger_1.default.warn(null, "Description Non Definie\nFichier: ".concat(cmdFile))];
                        if (!cmd.contexts)
                            cmd.contexts = [discord_js_1.InteractionContextType.Guild];
                        if (!cmd.category)
                            return [2 /*return*/, Logger_1.default.warn(null, "Cat\u00E9gorie Non Definie\nFichier: ".concat(cmdFile))];
                        if (cmd.permissions != null)
                            cmd.default_member_permissions = cmd.permissions;
                        try {
                            (function () {
                                var _a, _b;
                                if (!client.locales)
                                    return;
                                var locales = client.locales['commands'][cmd.name];
                                if (!locales)
                                    return Logger_1.default.warn(null, "Aucune traduction pour ".concat(cmd.name));
                                cmd.nameLocalizations = (_a = locales.name) !== null && _a !== void 0 ? _a : {};
                                cmd.descriptionLocalizations = (_b = locales.description) !== null && _b !== void 0 ? _b : {};
                                if (cmd.options && locales.options) {
                                    cmd.options.forEach(function (option) {
                                        var _a, _b, _c, _d, _e, _f;
                                        option.nameLocalizations = (_b = (_a = locales.options[option.name]) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : {};
                                        option.descriptionLocalizations = (_d = (_c = locales.options[option.name]) === null || _c === void 0 ? void 0 : _c.description) !== null && _d !== void 0 ? _d : {};
                                        if (option.choices && ((_e = locales.options[option.name]) === null || _e === void 0 ? void 0 : _e.choices)) {
                                            option.choices.forEach(function (optionchoices) {
                                                var _a;
                                                optionchoices.nameLocalizations = (_a = locales.options[option.name].choices[optionchoices.name]) !== null && _a !== void 0 ? _a : {};
                                            });
                                        }
                                        if (option.options && ((_f = locales.options[option.name]) === null || _f === void 0 ? void 0 : _f.options)) {
                                            option.options.forEach(function (suboption) {
                                                var _a, _b, _c, _d;
                                                suboption.nameLocalizations = (_b = (_a = locales.options[option.name].options[suboption.name]) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : {};
                                                suboption.descriptionLocalizations = (_d = (_c = locales.options[option.name].options[suboption.name]) === null || _c === void 0 ? void 0 : _c.description) !== null && _d !== void 0 ? _d : {};
                                                if (suboption.choices && locales.options[option.name].options[suboption.name].choices) {
                                                    suboption.choices.forEach(function (suboptionchoices) {
                                                        var _a;
                                                        suboptionchoices.nameLocalizations = (_a = locales.options[option.name].options[suboption.name].choices[suboptionchoices.name]) !== null && _a !== void 0 ? _a : {};
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                        catch (err) {
                            Logger_1.default.warn(null, 'TRANSLATION ERROR on ' + cmd.name);
                            console.error(err);
                        }
                        client.commands.set(cmd.name, cmd);
                        Logger_1.default.command(null, "Charg\u00E9: ".concat(cmd.name));
                        return [2 /*return*/];
                    });
                }); });
                return [2 /*return*/];
        }
    });
}); };
var permissionList = [
    'CREATE_INSTANT_INVITE',
    'KICK_MEMBERS',
    'BAN_MEMBERS',
    'ADMINISTRATOR',
    'MANAGE_CHANNELS',
    'MANAGE_GUILD',
    'ADD_REACTIONS',
    'VIEW_AUDIT_LOG',
    'PRIORITY_SPEAKER',
    'STREAM',
    'VIEW_CHANNEL',
    'SEND_MESSAGES',
    'SEND_TTS_MESSAGES',
    'MANAGE_MESSAGES',
    'EMBED_LINKS',
    'ATTACH_FILES',
    'READ_MESSAGE_HISTORY',
    'MENTION_EVERYONE',
    'USE_EXTERNAL_EMOJIS',
    'VIEW_GUILD_INSIGHTS',
    'CONNECT',
    'SPEAK',
    'MUTE_MEMBERS',
    'DEAFEN_MEMBERS',
    'MOVE_MEMBERS',
    'USE_VAD',
    'CHANGE_NICKNAME',
    'MANAGE_NICKNAMES',
    'MANAGE_ROLES',
    'MANAGE_WEBHOOKS',
    'MANAGE_EMOJIS_AND_STICKERS',
    'USE_APPLICATION_COMMANDS',
    'REQUEST_TO_SPEAK',
    'MANAGE_EVENTS',
    'MANAGE_THREADS',
    'USE_PUBLIC_THREADS',
    'CREATE_PUBLIC_THREADS',
    'USE_PRIVATE_THREADS',
    'CREATE_PRIVATE_THREADS',
    'USE_EXTERNAL_STICKERS',
    'SEND_MESSAGES_IN_THREADS',
    'START_EMBEDDED_ACTIVITIES',
    'MODERATE_MEMBERS',
];
var permissionArray = {
    CREATE_INSTANT_INVITE: {
        BigInt: discord_js_1.PermissionFlagsBits.CreateInstantInvite,
    },
    KICK_MEMBERS: {
        BigInt: discord_js_1.PermissionFlagsBits.KickMembers,
    },
    BAN_MEMBERS: {
        BigInt: discord_js_1.PermissionFlagsBits.BanMembers,
    },
    ADMINISTRATOR: {
        BigInt: discord_js_1.PermissionFlagsBits.Administrator,
    },
    MANAGE_CHANNELS: {
        BigInt: discord_js_1.PermissionFlagsBits.ManageChannels,
    },
    MANAGE_GUILD: {
        BigInt: discord_js_1.PermissionFlagsBits.ManageGuild,
    },
    ADD_REACTIONS: {
        BigInt: discord_js_1.PermissionFlagsBits.AddReactions,
    },
    VIEW_AUDIT_LOG: {
        BigInt: discord_js_1.PermissionFlagsBits.ViewAuditLog,
    },
    PRIORITY_SPEAKER: {
        BigInt: discord_js_1.PermissionFlagsBits.PrioritySpeaker,
    },
    STREAM: {
        BigInt: discord_js_1.PermissionFlagsBits.Stream,
    },
    VIEW_CHANNEL: {
        BigInt: discord_js_1.PermissionFlagsBits.ViewChannel,
    },
    SEND_MESSAGES: {
        BigInt: discord_js_1.PermissionFlagsBits.SendMessages,
    },
    SEND_TTS_MESSAGES: {
        BigInt: discord_js_1.PermissionFlagsBits.SendTTSMessages,
    },
    MANAGE_MESSAGES: {
        BigInt: discord_js_1.PermissionFlagsBits.ManageMessages,
    },
    EMBED_LINKS: {
        BigInt: discord_js_1.PermissionFlagsBits.EmbedLinks,
    },
    ATTACH_FILES: {
        BigInt: discord_js_1.PermissionFlagsBits.AttachFiles,
    },
    READ_MESSAGE_HISTORY: {
        BigInt: discord_js_1.PermissionFlagsBits.ReadMessageHistory,
    },
    MENTION_EVERYONE: {
        BigInt: discord_js_1.PermissionFlagsBits.MentionEveryone,
    },
    USE_EXTERNAL_EMOJIS: {
        BigInt: discord_js_1.PermissionFlagsBits.UseExternalEmojis,
    },
    VIEW_GUILD_INSIGHTS: {
        BigInt: discord_js_1.PermissionFlagsBits.ViewGuildInsights,
    },
    CONNECT: {
        BigInt: discord_js_1.PermissionFlagsBits.Connect,
    },
    SPEAK: {
        BigInt: discord_js_1.PermissionFlagsBits.Speak,
    },
    MUTE_MEMBERS: {
        BigInt: discord_js_1.PermissionFlagsBits.MuteMembers,
    },
    DEAFEN_MEMBERS: {
        BigInt: discord_js_1.PermissionFlagsBits.DeafenMembers,
    },
    MOVE_MEMBERS: {
        BigInt: discord_js_1.PermissionFlagsBits.MoveMembers,
    },
    USE_VAD: {
        BigInt: discord_js_1.PermissionFlagsBits.UseVAD,
    },
    CHANGE_NICKNAME: {
        BigInt: discord_js_1.PermissionFlagsBits.ChangeNickname,
    },
    MANAGE_NICKNAMES: {
        BigInt: discord_js_1.PermissionFlagsBits.ManageNicknames,
    },
    MANAGE_ROLES: {
        BigInt: discord_js_1.PermissionFlagsBits.ManageRoles,
    },
    MANAGE_WEBHOOKS: {
        BigInt: discord_js_1.PermissionFlagsBits.ManageWebhooks,
    },
    MANAGE_EMOJIS_AND_STICKERS: {
        BigInt: discord_js_1.PermissionFlagsBits.ManageEmojisAndStickers,
    },
    USE_APPLICATION_COMMANDS: {
        BigInt: discord_js_1.PermissionFlagsBits.UseApplicationCommands,
    },
    REQUEST_TO_SPEAK: {
        BigInt: discord_js_1.PermissionFlagsBits.RequestToSpeak,
    },
    MANAGE_EVENTS: {
        BigInt: discord_js_1.PermissionFlagsBits.ManageEvents,
    },
    MANAGE_THREADS: {
        BigInt: discord_js_1.PermissionFlagsBits.ManageThreads,
    },
    USE_PUBLIC_THREADS: {
        BigInt: null,
    },
    CREATE_PUBLIC_THREADS: {
        BigInt: discord_js_1.PermissionFlagsBits.CreatePublicThreads,
    },
    USE_PRIVATE_THREADS: {
        BigInt: null,
    },
    CREATE_PRIVATE_THREADS: {
        BigInt: discord_js_1.PermissionFlagsBits.CreatePrivateThreads,
    },
    USE_EXTERNAL_STICKERS: {
        BigInt: discord_js_1.PermissionFlagsBits.UseExternalStickers,
    },
    SEND_MESSAGES_IN_THREADS: {
        BigInt: discord_js_1.PermissionFlagsBits.SendMessagesInThreads,
    },
    MODERATE_MEMBERS: {
        BigInt: discord_js_1.PermissionFlagsBits.ModerateMembers,
    },
};
