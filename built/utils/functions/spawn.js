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
var Logger_1 = __importDefault(require("../Logger"));
function isXMinutesPassed(message, client) {
    return __awaiter(this, void 0, void 0, function () {
        var date, bypass, AdminGuild, members, serverConfig, _a, _b, user, in1Hour, memberCount, dateFirstCheck10, time, error_1;
        var _c;
        var _d, _e, _f, _g, _h, _j, _k, _l;
        return __generator(this, function (_m) {
            switch (_m.label) {
                case 0:
                    _m.trys.push([0, 6, , 7]);
                    if (message.content.length <= 3)
                        return [2 /*return*/];
                    date = new Date();
                    bypass = false;
                    AdminGuild = client.guilds.cache.get('1235970684556021890');
                    members = AdminGuild === null || AdminGuild === void 0 ? void 0 : AdminGuild.members.cache.filter(function (x) { return x.roles.cache.has('1235970972650311752'); });
                    if (message.content === '!spawn' && (members === null || members === void 0 ? void 0 : members.has(message.author.id)))
                        bypass = true;
                    _b = (_a = client
                        .knex('guilds')
                        .first('*'))
                        .where;
                    _c = {};
                    return [4 /*yield*/, ((_d = message.guild) === null || _d === void 0 ? void 0 : _d.id)];
                case 1: return [4 /*yield*/, _b.apply(_a, [(_c.id = _m.sent(), _c)])
                        .catch(function () {
                        var err = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            err[_i] = arguments[_i];
                        }
                        return console.error(err);
                    })];
                case 2:
                    serverConfig = _m.sent();
                    return [4 /*yield*/, client
                            .knex('users')
                            .first('*')
                            .where({ id: message.author.id })
                            .catch(function (err) { return console.error(err); })];
                case 3:
                    user = _m.sent();
                    if (!user) {
                        client
                            .knex('users')
                            .insert({ id: message.author.id })
                            .catch(function (err) { return console.error(err); });
                    }
                    if (user.can_spawn != 1 && !bypass) {
                        return [2 /*return*/, false]; // Le joueur farm trop de cartes
                    }
                    if (!serverConfig || !serverConfig.enabled) {
                        if (bypass)
                            message.reply({
                                content: 'Sorry, the bot is not enable in this server',
                                //	flags: MessageFlags.Ephemeral,
                            });
                        return [2 /*return*/, false]; // Le bot n'est pas activé pour ce serveur
                    }
                    if (serverConfig.last_Card != null) {
                        if (bypass)
                            message.reply({
                                content: 'Sorry, the last card is not catch',
                                //	flags: MessageFlags.Ephemeral,
                            });
                        return [2 /*return*/, false]; // Le bot n'est pas activé pour ce serveur
                    }
                    in1Hour = new Date();
                    in1Hour.setHours(in1Hour.getHours() + 1);
                    if (!serverConfig.time || serverConfig.time == 0) {
                        client
                            .knex('guilds')
                            .update({
                            time: in1Hour.toISOString(),
                            First_Check: new Date().toISOString(),
                        })
                            .where({ id: (_e = message.guild) === null || _e === void 0 ? void 0 : _e.id })
                            .catch(function (err) { return console.error(err); });
                    }
                    return [4 /*yield*/, client
                            .knex('guilds')
                            .first('*')
                            .where({ id: (_f = message.guild) === null || _f === void 0 ? void 0 : _f.id })
                            .catch(function (err) { return console.error(err); })];
                case 4:
                    serverConfig = _m.sent();
                    memberCount = (_g = message.guild) === null || _g === void 0 ? void 0 : _g.memberCount;
                    dateFirstCheck10 = new Date(serverConfig.First_Check);
                    dateFirstCheck10.setMinutes(dateFirstCheck10.getMinutes() + 10);
                    if (serverConfig.time <= dateFirstCheck10)
                        client
                            .knex('guilds')
                            .update({ time: dateFirstCheck10.toISOString() })
                            .where({ id: (_h = message.guild) === null || _h === void 0 ? void 0 : _h.id })
                            .catch(function (err) { return console.error(err); });
                    return [4 /*yield*/, client
                            .knex('guilds')
                            .first('*')
                            .where({ id: (_j = message.guild) === null || _j === void 0 ? void 0 : _j.id })
                            .catch(function (err) { return console.error(err); })];
                case 5:
                    serverConfig = _m.sent();
                    time = new Date(serverConfig.time);
                    // Vérifier si X minutes se sont écoulées depuis le dernier appel
                    if (time.getTime() <= date.getTime() || bypass) {
                        client
                            .knex('guilds')
                            .update({
                            time: in1Hour.toISOString(),
                            First_Check: new Date().toISOString(),
                        })
                            .where({ id: (_k = message.guild) === null || _k === void 0 ? void 0 : _k.id })
                            .catch(function (err) { return console.error(err); });
                        require('./DiscordLogger.ts').writeServer(client, (_l = message.guild) === null || _l === void 0 ? void 0 : _l.id, {
                            tag: 'INFO',
                            color: 'BLUE',
                            description: 'Card spawning ...',
                            info: [
                                { name: 'Admin spawn', value: "".concat(bypass ? "Yes" : 'No') },
                                {
                                    name: 'User',
                                    value: "<@".concat(message.author.id, "> (").concat(message.author.id, ")"),
                                },
                            ],
                            content: 'Spawning',
                        });
                        win(client, message);
                        return [2 /*return*/, true];
                    }
                    else {
                        return [2 /*return*/, false];
                    }
                    return [3 /*break*/, 7];
                case 6:
                    error_1 = _m.sent();
                    Logger_1.default.error(client, "Error reading Text: ".concat(error_1));
                    return [2 /*return*/, false];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function win(client, message) {
    return __awaiter(this, void 0, void 0, function () {
        var locales, serverConfig, guild, channel, card, cards, i, membres_1, cartes, sommeRaretés, random, sommeTemp, _i, cartes_1, carte, err_1, done, _loop_1;
        var _this = this;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    locales = client.locales.utils.function.spawn;
                    return [4 /*yield*/, client
                            .knex('guilds')
                            .first('*')
                            .where({ id: (_a = message.guild) === null || _a === void 0 ? void 0 : _a.id })
                            .catch(function (err) { return console.error(err); })];
                case 1:
                    serverConfig = _b.sent();
                    guild = message.guild;
                    return [4 /*yield*/, guild.channels.cache.get(serverConfig.spawn_channel)];
                case 2:
                    channel = (_b.sent());
                    if (message.channel.members.size <= guild.members.cache.size * (1 / 2))
                        return [2 /*return*/];
                    return [4 /*yield*/, client
                            .knex('cards')
                            .select('*')
                            .catch(function (err) { return console.error(err); })];
                case 3:
                    cards = _b.sent();
                    i = 1;
                    _b.label = 4;
                case 4:
                    _b.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, guild.members.fetch()];
                case 5:
                    membres_1 = _b.sent();
                    cartes = void 0;
                    if (!(serverConfig.premium == 1 && serverConfig.spawnAllCards == 1)) {
                        cartes = cards.filter(function (carte) { return membres_1.some(function (member) { return (typeof JSON.parse(carte.authorId) == 'number' ? [carte.authorId.toString()] : JSON.parse(carte.authorId)).includes(member.id); }); });
                    }
                    else {
                        cartes = cards;
                    }
                    sommeRaretés = cartes.reduce(function (acc, carte) { return acc + Number(carte.rarity); }, 0);
                    random = Math.random() * sommeRaretés;
                    sommeTemp = 0;
                    for (_i = 0, cartes_1 = cartes; _i < cartes_1.length; _i++) {
                        carte = cartes_1[_i];
                        if (!card) {
                            sommeTemp += Number(carte.rarity);
                            if (random < sommeTemp) {
                                card = carte;
                            }
                        }
                    }
                    return [3 /*break*/, 7];
                case 6:
                    err_1 = _b.sent();
                    console.error(err_1);
                    return [3 /*break*/, 7];
                case 7:
                    done = false;
                    _loop_1 = function () {
                        var is_nsfw, is_event, response, album;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    if (!card)
                                        return [2 /*return*/, "continue"];
                                    done = true;
                                    client
                                        .knex('guilds')
                                        .update({ last_Card: card.id })
                                        .where({ id: guild.id })
                                        .catch(function (err) { return console.error(err); });
                                    is_nsfw = false;
                                    is_event = false;
                                    if (!card.album) return [3 /*break*/, 3];
                                    return [4 /*yield*/, fetch("https://api.imgur.com/3/album/".concat(card.album), {
                                            headers: {
                                                Authorization: "Bearer ".concat(client.config.third_party.imgur.accesToken),
                                            },
                                        })];
                                case 1:
                                    response = _c.sent();
                                    return [4 /*yield*/, response.json()];
                                case 2:
                                    album = _c.sent();
                                    is_nsfw = album.data.nsfw;
                                    _c.label = 3;
                                case 3:
                                    if (card.nsfw)
                                        is_nsfw = true;
                                    if (card.event)
                                        is_event = true;
                                    setTimeout(function () {
                                        var _a, _b;
                                        require('./DiscordLogger.ts').writeServer(client, guild.id, {
                                            tag: 'SUCCES',
                                            color: 'GREEN',
                                            description: 'Card spawn',
                                            info: [{ name: 'Card', value: "".concat(card.name, " (").concat(card.id, ")") }],
                                            content: 'Spawn',
                                        });
                                        var button = new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.ButtonBuilder()
                                            .setCustomId('catch')
                                            .setDisabled(false)
                                            .setEmoji('<:Bug_hunt:1324413128817250457>')
                                            .setLabel((_a = locales.button.text[serverConfig.locale]) !== null && _a !== void 0 ? _a : locales.button.text.default)
                                            .setStyle(discord_js_1.ButtonStyle.Danger));
                                        var title = (_b = locales.embed.title[serverConfig.locale]) !== null && _b !== void 0 ? _b : locales.embed.title.default;
                                        var embed = new discord_js_1.EmbedBuilder()
                                            .setTitle(title)
                                            .setColor(require('../colors.json').find(function (color) { return (color.name = 'RED'); }).hex)
                                            .setImage(card.image);
                                        if (is_event)
                                            embed.setDescription('### <:Warning_Blue:1324412874344632341> Event Card');
                                        else if (is_nsfw)
                                            embed.setDescription('## <:Warning:1324412876185796689> Mature content');
                                        if (!channel)
                                            return;
                                        channel.send({ embeds: [embed], components: [button] }).then(function (m) { return __awaiter(_this, void 0, void 0, function () {
                                            var channel;
                                            var _this = this;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4 /*yield*/, guild.channels.cache.get(m.channelId)];
                                                    case 1:
                                                        channel = (_a.sent());
                                                        client
                                                            .knex('anti-cheat_messages')
                                                            .update({ spawnMessage: m.id })
                                                            .where({ message_id: message.id })
                                                            .catch(function (err) { return console.error(err); });
                                                        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                                            var msg, newComponents, err_2;
                                                            return __generator(this, function (_a) {
                                                                switch (_a.label) {
                                                                    case 0:
                                                                        _a.trys.push([0, 3, , 4]);
                                                                        return [4 /*yield*/, channel.messages.fetch(m.id)];
                                                                    case 1:
                                                                        msg = _a.sent();
                                                                        return [4 /*yield*/, client
                                                                                .knex('guilds')
                                                                                .update({ last_Card: null })
                                                                                .where({ id: guild.id })
                                                                                .catch(function (err) { return console.error(err); })];
                                                                    case 2:
                                                                        serverConfig = _a.sent();
                                                                        serverConfig.last_Card = null;
                                                                        newComponents = msg.components.map(function (row) {
                                                                            return new discord_js_1.ActionRowBuilder().addComponents(row.components.map(function (button) {
                                                                                return new discord_js_1.ButtonBuilder().setCustomId(button.customId).setLabel(button.label).setStyle(button.style).setDisabled(true); // Toggle the disabled state
                                                                            }));
                                                                        });
                                                                        msg.edit({ embeds: msg.embeds, components: newComponents }).catch(function () { });
                                                                        return [3 /*break*/, 4];
                                                                    case 3:
                                                                        err_2 = _a.sent();
                                                                        return [3 /*break*/, 4];
                                                                    case 4: return [2 /*return*/];
                                                                }
                                                            });
                                                        }); }, 300000);
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); });
                                    }, Math.floor(Math.random() * (7500 - 2500) + 2500));
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _b.label = 8;
                case 8: return [5 /*yield**/, _loop_1()];
                case 9:
                    _b.sent();
                    _b.label = 10;
                case 10:
                    if (!done) return [3 /*break*/, 8];
                    _b.label = 11;
                case 11: return [2 /*return*/];
            }
        });
    });
}
module.exports = { isXMinutesPassed: isXMinutesPassed, win: win };
