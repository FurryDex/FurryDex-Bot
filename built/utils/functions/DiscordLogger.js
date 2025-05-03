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
Object.defineProperty(exports, "__esModule", { value: true });
exports.write = write;
exports.writePlayer = writePlayer;
exports.writeServer = writeServer;
var _a = require('discord.js'), EmbedBuilder = _a.EmbedBuilder, ThreadAutoArchiveDuration = _a.ThreadAutoArchiveDuration;
var knex_channel, type;
function write(client, destination, embed) {
    return __awaiter(this, void 0, void 0, function () {
        var categoryList, color, logEmbed, logGuild, category, channel;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    categoryList = client.config.log.category;
                    if (!client.config.log.enable)
                        return [2 /*return*/];
                    color = require('../colors.json').find(function (x) { return x.name == embed.color.toUpperCase(); });
                    logEmbed = new EmbedBuilder()
                        .setTitle("[".concat(embed.tag, "] ").concat(embed.content))
                        .setColor(color.hex)
                        .setDescription(embed.description || ' ')
                        .setFields(embed.info)
                        .setTimestamp();
                    return [4 /*yield*/, client.guilds.cache.get((_a = client.config.log.guild) !== null && _a !== void 0 ? _a : client.config.bot.guild)];
                case 1:
                    logGuild = _b.sent();
                    return [4 /*yield*/, logGuild.channels.cache.get(categoryList[destination.category.forum])];
                case 2:
                    category = (_b.sent());
                    if (!category)
                        return [2 /*return*/];
                    return [4 /*yield*/, category.threads.cache.get(destination.channel)];
                case 3:
                    channel = _b.sent();
                    channel.send({ embeds: [logEmbed] });
                    return [2 /*return*/];
            }
        });
    });
}
function writePlayer(client, playerId, embed) {
    return __awaiter(this, void 0, void 0, function () {
        var categoryList, color, userDb, user, logGuild, category, playerEmbed, channel, message, logEmbed, content;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    categoryList = client.config.log.category;
                    if (!client.config.log.enable)
                        return [2 /*return*/];
                    playerId = playerId.toString();
                    knex_channel = client.config.log.mysql;
                    color = require('../colors.json').find(function (x) { return x.name == embed.color.toUpperCase(); });
                    return [4 /*yield*/, client
                            .knex('users')
                            .first('*')
                            .where({ id: playerId })
                            .catch(function (err) { return console.error(err); })];
                case 1:
                    userDb = _a.sent();
                    return [4 /*yield*/, client.users.cache.get(playerId)];
                case 2:
                    user = _a.sent();
                    return [4 /*yield*/, client.guilds.cache.get(client.config.log.guild)];
                case 3:
                    logGuild = _a.sent();
                    return [4 /*yield*/, logGuild.channels.cache.get(categoryList['player'])];
                case 4:
                    category = (_a.sent());
                    playerEmbed = new EmbedBuilder()
                        .setTitle("".concat(user.displayName, " (").concat(playerId, ")"))
                        .setColor('Orange')
                        .setDescription("Log from the player `".concat(user.displayName, "` for furry dex"))
                        .setFields([
                        {
                            name: '[FD] Premium',
                            value: "".concat(userDb.premium == 1 ? 'Yes' : 'No'),
                        },
                        {
                            name: '[FD] Cards',
                            value: "".concat(userDb.card_number, " cards (").concat(userDb.card_completion, " %) "),
                        },
                        {
                            name: '[FD] Anti-cheat',
                            value: "".concat(userDb.anticheat, " %"),
                        },
                        {
                            name: 'Created at',
                            value: "<t:".concat(user.createdTimestamp, ":F>"),
                        },
                        {
                            name: 'Mention',
                            value: "<@".concat(user.id, ">"),
                        },
                    ])
                        .setTimestamp();
                    return [4 /*yield*/, category.threads.cache.get(userDb[knex_channel])];
                case 5:
                    channel = _a.sent();
                    if (!(!userDb[knex_channel] || !channel)) return [3 /*break*/, 7];
                    return [4 /*yield*/, category.threads
                            .create({
                            name: "".concat(client.config.log.prefix).concat(user.displayName, " (").concat(playerId, ")"),
                            autoArchiveDuration: ThreadAutoArchiveDuration.OneWeek,
                            message: {
                                content: 'Initialising...',
                            },
                        })
                            .then(function (log) {
                            var _a;
                            client
                                .knex('users')
                                .update((_a = {}, _a[knex_channel] = log.id, _a))
                                .where({ id: playerId })
                                .catch(function (err) { return console.error(err); });
                        })
                            .catch(function (err) { return console.log(err); })];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7: return [4 /*yield*/, client
                        .knex('users')
                        .first('*')
                        .where({ id: playerId })
                        .catch(function (err) { return console.error(err); })];
                case 8:
                    userDb = _a.sent();
                    _a.label = 9;
                case 9: return [4 /*yield*/, category.threads.cache.get(userDb[knex_channel])];
                case 10:
                    channel = _a.sent();
                    _a.label = 11;
                case 11:
                    if (!channel) return [3 /*break*/, 9];
                    _a.label = 12;
                case 12: return [4 /*yield*/, channel.fetchStarterMessage()];
                case 13:
                    message = _a.sent();
                    message.edit({ content: 'Log', embeds: [playerEmbed] });
                    logEmbed = new EmbedBuilder()
                        .setTitle("[".concat(embed.tag, "] ").concat(embed.content))
                        .setColor(color.hex)
                        .setDescription(embed.description || ' ')
                        .setFields(embed.info)
                        .setTimestamp();
                    content = !!embed.mention ? "<@".concat(embed.mention, ">") : '';
                    channel.send({ content: content, embeds: [logEmbed] });
                    return [2 /*return*/];
            }
        });
    });
}
function writeServer(client, serverId, embed) {
    return __awaiter(this, void 0, void 0, function () {
        var categoryList, color, serverConfig, cardsDb, guild, logGuild, category, guildEmbed, channel, message, logEmbed;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    categoryList = client.config.log.category;
                    if (!client.config.log.enable)
                        return [2 /*return*/];
                    knex_channel = client.config.log.mysql;
                    color = require('../colors.json').find(function (x) { return x.name == embed.color.toUpperCase(); });
                    return [4 /*yield*/, client
                            .knex('guilds')
                            .first('*')
                            .where({ id: serverId })
                            .catch(function (err) { return console.error(err); })];
                case 1:
                    serverConfig = _b.sent();
                    return [4 /*yield*/, client
                            .knex('user_cards')
                            .select('*')
                            .where({ guild: serverId })
                            .catch(function (err) { return console.error(err); })];
                case 2:
                    cardsDb = _b.sent();
                    return [4 /*yield*/, client.guilds.cache.get(serverId)];
                case 3:
                    guild = _b.sent();
                    return [4 /*yield*/, client.guilds.cache.get((_a = client.config.log.guild) !== null && _a !== void 0 ? _a : client.config.bot.guild)];
                case 4:
                    logGuild = _b.sent();
                    return [4 /*yield*/, logGuild.channels.cache.get(categoryList['server'])];
                case 5:
                    category = _b.sent();
                    if (!category)
                        return [2 /*return*/];
                    guildEmbed = new EmbedBuilder()
                        .setTitle("".concat(guild.name, " (").concat(serverId, ")"))
                        .setColor('Orange')
                        .setDescription("Log from the guild `".concat(guild.name, "` for furry dex"))
                        .setFields([
                        {
                            name: '[FD] Enable',
                            value: "".concat(serverConfig.enabled == 1 ? 'Yes' : 'No'),
                        },
                        {
                            name: '[FD] Premium',
                            value: "".concat(serverConfig.premium == 1 ? 'Yes' : 'No'),
                        },
                        {
                            name: '[FD] Cards',
                            value: "".concat((cardsDb !== null && cardsDb !== void 0 ? cardsDb : []).length, " cards"),
                        },
                        {
                            name: 'Created at',
                            value: "<t:".concat(guild.createdTimestamp, ":F>"),
                        },
                        {
                            name: 'Joined at',
                            value: "<t:".concat(guild.joinedTimestamp, ":F>"),
                        },
                        {
                            name: 'Owner',
                            value: "<@".concat(guild.ownerId, ">"),
                        },
                        {
                            name: 'Member count',
                            value: "".concat(guild.memberCount),
                        },
                    ])
                        .setTimestamp();
                    return [4 /*yield*/, category.threads.cache.get(serverConfig[knex_channel])];
                case 6:
                    channel = _b.sent();
                    if (!(!serverConfig[knex_channel] || !channel)) return [3 /*break*/, 8];
                    return [4 /*yield*/, category.threads
                            .create({
                            name: "".concat(client.config.log.prefix).concat(guild.name, " (").concat(serverId, ")"),
                            autoArchiveDuration: ThreadAutoArchiveDuration.OneWeek,
                            message: {
                                content: 'Initialising...',
                            },
                        })
                            .then(function (log) {
                            var _a;
                            client
                                .knex('guilds')
                                .update((_a = {}, _a[knex_channel] = log.id, _a))
                                .where({ id: serverId })
                                .catch(function (err) { return console.error(err); });
                        })
                            .catch(function (err) { return console.log(err); })];
                case 7:
                    _b.sent();
                    _b.label = 8;
                case 8: return [4 /*yield*/, client
                        .knex('guilds')
                        .first('*')
                        .where({ id: serverId })
                        .catch(function (err) { return console.error(err); })];
                case 9:
                    serverConfig = _b.sent();
                    _b.label = 10;
                case 10: return [4 /*yield*/, category.threads.cache.get(serverConfig[knex_channel])];
                case 11:
                    channel = _b.sent();
                    _b.label = 12;
                case 12:
                    if (!channel) return [3 /*break*/, 10];
                    _b.label = 13;
                case 13: return [4 /*yield*/, channel.fetchStarterMessage()];
                case 14:
                    message = _b.sent();
                    message.edit({ content: "Log", embeds: [guildEmbed] });
                    logEmbed = new EmbedBuilder()
                        .setTitle("[".concat(embed.tag, "] ").concat(embed.content))
                        .setColor(color.hex)
                        .setDescription(embed.description || ' ')
                        .setFields(embed.info)
                        .setTimestamp();
                    channel.send({ embeds: [logEmbed] });
                    return [2 /*return*/];
            }
        });
    });
}
exports.default = {
    write: write,
    writePlayer: writePlayer,
    writeServer: writeServer,
};
