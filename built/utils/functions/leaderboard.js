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
var EmbedBuilder = require('discord.js').EmbedBuilder;
var Logger_1 = __importDefault(require("../Logger"));
function leaderboard_start(client) {
    var _this = this;
    leaderboard_update(client);
    setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            leaderboard_update(client);
            return [2 /*return*/];
        });
    }); }, 60 * 1000);
}
function leaderboard_update(client) {
    return __awaiter(this, void 0, void 0, function () {
        var serverConfig;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.knex('guilds').catch(function (err) { return console.error(err); })];
                case 1:
                    serverConfig = _a.sent();
                    serverConfig.forEach(function (guildConfig) { return __awaiter(_this, void 0, void 0, function () {
                        var guild_1, members_1, channel, embeds, leaderboard, embed, users_1, done_1, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, embed, users_2, done_2, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, embed, users_3, done_3, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, embed, users_4, done_4, _45, _46, _47, _48, _49, _50, _51, _52, _53, _54, _55, _56, _57, _58, _59, _60, _61, _62, _63, _64, _65, _66, _67, embed, users_5, done_5, _68, _69, _70, _71, _72, _73, _74, _75, _76, _77, _78, _79, _80, _81, _82, _83, _84, _85, _86, _87, _88, _89, _90, message_1;
                        var _91, _92, _93, _94, _95, _96, _97, _98, _99, _100, _101, _102, _103, _104, _105, _106, _107, _108, _109, _110, _111, _112, _113, _114, _115, _116, _117, _118, _119, _120, _121, _122, _123, _124, _125, _126, _127, _128, _129, _130, _131, _132, _133, _134, _135, _136, _137, _138, _139, _140;
                        var _this = this;
                        var _141;
                        return __generator(this, function (_142) {
                            switch (_142.label) {
                                case 0:
                                    if (!(guildConfig.leaderboard && guildConfig.leaderboard_channel)) return [3 /*break*/, 182];
                                    guild_1 = client.guilds.cache.get(guildConfig.id);
                                    if (!guild_1)
                                        return [2 /*return*/];
                                    return [4 /*yield*/, guild_1.members.fetch()];
                                case 1:
                                    members_1 = _142.sent();
                                    if (!members_1)
                                        return [2 /*return*/];
                                    if ((_141 = guild_1.members.cache.hasAny(client.config.bot.disable.bot[0])) !== null && _141 !== void 0 ? _141 : '.')
                                        return [2 /*return*/];
                                    return [4 /*yield*/, guild_1.channels.cache.get(guildConfig.leaderboard_channel)];
                                case 2:
                                    channel = _142.sent();
                                    if (!channel)
                                        return [2 /*return*/];
                                    embeds = [];
                                    leaderboard = JSON.parse(guildConfig.leaderboard);
                                    if (!leaderboard.includes('1')) return [3 /*break*/, 37];
                                    embed = new EmbedBuilder().setDescription('# Cards completion Leaderboard').setColor('Orange').setTimestamp();
                                    return [4 /*yield*/, client.knex('users').catch(function (err) { return Logger_1.default.error(err); })];
                                case 3:
                                    users_1 = _142.sent();
                                    users_1 = users_1.filter(function (user) { return client.users.cache.has(user.id); });
                                    users_1 = users_1.filter(function (user) { return members_1.has(user.id); });
                                    users_1.forEach(function (user, key) { return __awaiter(_this, void 0, void 0, function () {
                                        var user_cards, _a, _b;
                                        var _this = this;
                                        return __generator(this, function (_c) {
                                            switch (_c.label) {
                                                case 0: return [4 /*yield*/, client
                                                        .knex('user_cards')
                                                        .where({ user_id: user.id })
                                                        .catch(function (err) { return Logger_1.default.error(err); })];
                                                case 1:
                                                    user_cards = _c.sent();
                                                    _a = users_1[key];
                                                    _b = user_cards.filter(function (card) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0: return [4 /*yield*/, client.knex('cards').first('*').where({ id: card.card_id }).authorId];
                                                            case 1: return [2 /*return*/, _a.sent()];
                                                        }
                                                    }); }); }).length;
                                                    return [4 /*yield*/, client.knex('cards')];
                                                case 2:
                                                    _a.card_completion = (_b / (_c.sent()).length) * 100;
                                                    done_1 = key == users_1.length - 1;
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); });
                                    _142.label = 4;
                                case 4:
                                    if (!!done_1) return [3 /*break*/, 6];
                                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 5); })];
                                case 5:
                                    _142.sent();
                                    return [3 /*break*/, 4];
                                case 6:
                                    users_1.sort(function (a, b) { return b.card_completion - a.card_completion; }).slice(0, 10);
                                    _b = (_a = embed).addFields;
                                    _91 = {};
                                    _c = "\uD83E\uDD47 \u2022 `".concat;
                                    if (!users_1[0]) return [3 /*break*/, 8];
                                    return [4 /*yield*/, client.users.fetch(users_1[0].id).then(function (user) { return user.displayName; })];
                                case 7:
                                    _d = _142.sent();
                                    return [3 /*break*/, 9];
                                case 8:
                                    _d = '---';
                                    _142.label = 9;
                                case 9:
                                    _e = [
                                        (_91.name = _c.apply("\uD83E\uDD47 \u2022 `", [_d, "`"]), _91.value = "\u21AA ***".concat(users_1[0] ? users_1[0].card_completion : '---', "%***"), _91)
                                    ];
                                    _92 = {};
                                    _f = "\uD83E\uDD48 \u2022 `".concat;
                                    if (!users_1[1]) return [3 /*break*/, 11];
                                    return [4 /*yield*/, client.users.fetch(users_1[1].id).then(function (user) { return user.displayName; })];
                                case 10:
                                    _g = _142.sent();
                                    return [3 /*break*/, 12];
                                case 11:
                                    _g = '---';
                                    _142.label = 12;
                                case 12:
                                    _e = _e.concat([
                                        (_92.name = _f.apply("\uD83E\uDD48 \u2022 `", [_g, "`"]), _92.value = "\u21AA ***".concat(users_1[1] ? users_1[1].card_completion : '---', "%***"), _92)
                                    ]);
                                    _93 = {};
                                    _h = "\uD83E\uDD49 \u2022 `".concat;
                                    if (!users_1[2]) return [3 /*break*/, 14];
                                    return [4 /*yield*/, client.users.fetch(users_1[2].id).then(function (user) { return user.displayName; })];
                                case 13:
                                    _j = _142.sent();
                                    return [3 /*break*/, 15];
                                case 14:
                                    _j = '---';
                                    _142.label = 15;
                                case 15:
                                    _e = _e.concat([
                                        (_93.name = _h.apply("\uD83E\uDD49 \u2022 `", [_j, "`"]), _93.value = "\u21AA ***".concat(users_1[2] ? users_1[2].card_completion : '---', "%***"), _93)
                                    ]);
                                    _94 = {};
                                    _k = "4. \u2022 `".concat;
                                    if (!users_1[3]) return [3 /*break*/, 17];
                                    return [4 /*yield*/, client.users.fetch(users_1[3].id).then(function (user) { return user.displayName; })];
                                case 16:
                                    _l = _142.sent();
                                    return [3 /*break*/, 18];
                                case 17:
                                    _l = '---';
                                    _142.label = 18;
                                case 18:
                                    _e = _e.concat([
                                        (_94.name = _k.apply("4. \u2022 `", [_l, "`"]), _94.value = "\u21AA ***".concat(users_1[3] ? users_1[3].card_completion : '---', "%***"), _94)
                                    ]);
                                    _95 = {};
                                    _m = "5. \u2022 `".concat;
                                    if (!users_1[4]) return [3 /*break*/, 20];
                                    return [4 /*yield*/, client.users.fetch(users_1[4].id).then(function (user) { return user.displayName; })];
                                case 19:
                                    _o = _142.sent();
                                    return [3 /*break*/, 21];
                                case 20:
                                    _o = '---';
                                    _142.label = 21;
                                case 21:
                                    _e = _e.concat([
                                        (_95.name = _m.apply("5. \u2022 `", [_o, "`"]), _95.value = "\u21AA ***".concat(users_1[4] ? users_1[4].card_completion : '---', "%***"), _95)
                                    ]);
                                    _96 = {};
                                    _p = "6. \u2022 `".concat;
                                    if (!users_1[5]) return [3 /*break*/, 23];
                                    return [4 /*yield*/, client.users.fetch(users_1[5].id).then(function (user) { return user.displayName; })];
                                case 22:
                                    _q = _142.sent();
                                    return [3 /*break*/, 24];
                                case 23:
                                    _q = '---';
                                    _142.label = 24;
                                case 24:
                                    _e = _e.concat([
                                        (_96.name = _p.apply("6. \u2022 `", [_q, "`"]), _96.value = "\u21AA ***".concat(users_1[5] ? users_1[5].card_completion : '---', "%***"), _96)
                                    ]);
                                    _97 = {};
                                    _r = "7. \u2022 `".concat;
                                    if (!users_1[6]) return [3 /*break*/, 26];
                                    return [4 /*yield*/, client.users.fetch(users_1[6].id).then(function (user) { return user.displayName; })];
                                case 25:
                                    _s = _142.sent();
                                    return [3 /*break*/, 27];
                                case 26:
                                    _s = '---';
                                    _142.label = 27;
                                case 27:
                                    _e = _e.concat([
                                        (_97.name = _r.apply("7. \u2022 `", [_s, "`"]), _97.value = "\u21AA ***".concat(users_1[6] ? users_1[6].card_completion : '---', "%***"), _97)
                                    ]);
                                    _98 = {};
                                    _t = "8. \u2022 `".concat;
                                    if (!users_1[7]) return [3 /*break*/, 29];
                                    return [4 /*yield*/, client.users.fetch(users_1[7].id).then(function (user) { return user.displayName; })];
                                case 28:
                                    _u = _142.sent();
                                    return [3 /*break*/, 30];
                                case 29:
                                    _u = '---';
                                    _142.label = 30;
                                case 30:
                                    _e = _e.concat([
                                        (_98.name = _t.apply("8. \u2022 `", [_u, "`"]), _98.value = "\u21AA ***".concat(users_1[7] ? users_1[7].card_completion : '---', "%***"), _98)
                                    ]);
                                    _99 = {};
                                    _v = "9. \u2022 `".concat;
                                    if (!users_1[8]) return [3 /*break*/, 32];
                                    return [4 /*yield*/, client.users.fetch(users_1[8].id).then(function (user) { return user.displayName; })];
                                case 31:
                                    _w = _142.sent();
                                    return [3 /*break*/, 33];
                                case 32:
                                    _w = '---';
                                    _142.label = 33;
                                case 33:
                                    _e = _e.concat([
                                        (_99.name = _v.apply("9. \u2022 `", [_w, "`"]), _99.value = "\u21AA ***".concat(users_1[8] ? users_1[8].card_completion : '---', "%***"), _99)
                                    ]);
                                    _100 = {};
                                    _x = "10.\u2022 `".concat;
                                    if (!users_1[9]) return [3 /*break*/, 35];
                                    return [4 /*yield*/, client.users.fetch(users_1[9].id).then(function (user) { return user.displayName; })];
                                case 34:
                                    _y = _142.sent();
                                    return [3 /*break*/, 36];
                                case 35:
                                    _y = '---';
                                    _142.label = 36;
                                case 36:
                                    _b.apply(_a, [_e.concat([
                                            (_100.name = _x.apply("10.\u2022 `", [_y, "`"]), _100.value = "\u21AA ***".concat(users_1[9] ? users_1[9].card_completion : '---', "%***"), _100)
                                        ])]);
                                    embeds.push(embed);
                                    _142.label = 37;
                                case 37:
                                    if (!leaderboard.includes('2')) return [3 /*break*/, 72];
                                    embed = new EmbedBuilder().setDescription('# Cards Leaderboard').setColor('Orange').setTimestamp();
                                    return [4 /*yield*/, client.knex('users').catch(function (err) { return Logger_1.default.error(err); })];
                                case 38:
                                    users_2 = _142.sent();
                                    users_2 = users_2.filter(function (user) { return client.users.cache.has(user.id); });
                                    users_2 = users_2.filter(function (user) { return members_1.has(user.id); });
                                    users_2.forEach(function (user, key) { return __awaiter(_this, void 0, void 0, function () {
                                        var user_cards;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, client
                                                        .knex('user_cards')
                                                        .where({ user_id: user.id })
                                                        .catch(function (err) { return Logger_1.default.error(err); })];
                                                case 1:
                                                    user_cards = _a.sent();
                                                    users_2[key].card_number = user_cards.length;
                                                    done_2 = key == users_2.length - 1;
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); });
                                    _142.label = 39;
                                case 39:
                                    if (!!done_2) return [3 /*break*/, 41];
                                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 5); })];
                                case 40:
                                    _142.sent();
                                    return [3 /*break*/, 39];
                                case 41:
                                    users_2.sort(function (a, b) { return b.card_number - a.card_number; }).slice(0, 10);
                                    _0 = (_z = embed).addFields;
                                    _101 = {};
                                    _1 = "\uD83E\uDD47 \u2022 `".concat;
                                    if (!users_2[0]) return [3 /*break*/, 43];
                                    return [4 /*yield*/, client.users.fetch(users_2[0].id).then(function (user) { return user.displayName; })];
                                case 42:
                                    _2 = _142.sent();
                                    return [3 /*break*/, 44];
                                case 43:
                                    _2 = '---';
                                    _142.label = 44;
                                case 44:
                                    _3 = [
                                        (_101.name = _1.apply("\uD83E\uDD47 \u2022 `", [_2, "`"]), _101.value = "\u21AA ***".concat(users_2[0] ? users_2[0].card_number : '---', "***"), _101)
                                    ];
                                    _102 = {};
                                    _4 = "\uD83E\uDD48 \u2022 `".concat;
                                    if (!users_2[1]) return [3 /*break*/, 46];
                                    return [4 /*yield*/, client.users.fetch(users_2[1].id).then(function (user) { return user.displayName; })];
                                case 45:
                                    _5 = _142.sent();
                                    return [3 /*break*/, 47];
                                case 46:
                                    _5 = '---';
                                    _142.label = 47;
                                case 47:
                                    _3 = _3.concat([
                                        (_102.name = _4.apply("\uD83E\uDD48 \u2022 `", [_5, "`"]), _102.value = "\u21AA ***".concat(users_2[1] ? users_2[1].card_number : '---', "***"), _102)
                                    ]);
                                    _103 = {};
                                    _6 = "\uD83E\uDD49 \u2022 `".concat;
                                    if (!users_2[2]) return [3 /*break*/, 49];
                                    return [4 /*yield*/, client.users.fetch(users_2[2].id).then(function (user) { return user.displayName; })];
                                case 48:
                                    _7 = _142.sent();
                                    return [3 /*break*/, 50];
                                case 49:
                                    _7 = '---';
                                    _142.label = 50;
                                case 50:
                                    _3 = _3.concat([
                                        (_103.name = _6.apply("\uD83E\uDD49 \u2022 `", [_7, "`"]), _103.value = "\u21AA ***".concat(users_2[2] ? users_2[2].card_number : '---', "***"), _103)
                                    ]);
                                    _104 = {};
                                    _8 = "4. \u2022 `".concat;
                                    if (!users_2[3]) return [3 /*break*/, 52];
                                    return [4 /*yield*/, client.users.fetch(users_2[3].id).then(function (user) { return user.displayName; })];
                                case 51:
                                    _9 = _142.sent();
                                    return [3 /*break*/, 53];
                                case 52:
                                    _9 = '---';
                                    _142.label = 53;
                                case 53:
                                    _3 = _3.concat([
                                        (_104.name = _8.apply("4. \u2022 `", [_9, "`"]), _104.value = "\u21AA ***".concat(users_2[3] ? users_2[3].card_number : '---', "***"), _104)
                                    ]);
                                    _105 = {};
                                    _10 = "5. \u2022 `".concat;
                                    if (!users_2[4]) return [3 /*break*/, 55];
                                    return [4 /*yield*/, client.users.fetch(users_2[4].id).then(function (user) { return user.displayName; })];
                                case 54:
                                    _11 = _142.sent();
                                    return [3 /*break*/, 56];
                                case 55:
                                    _11 = '---';
                                    _142.label = 56;
                                case 56:
                                    _3 = _3.concat([
                                        (_105.name = _10.apply("5. \u2022 `", [_11, "`"]), _105.value = "\u21AA ***".concat(users_2[4] ? users_2[4].card_number : '---', "***"), _105)
                                    ]);
                                    _106 = {};
                                    _12 = "6. \u2022 `".concat;
                                    if (!users_2[5]) return [3 /*break*/, 58];
                                    return [4 /*yield*/, client.users.fetch(users_2[5].id).then(function (user) { return user.displayName; })];
                                case 57:
                                    _13 = _142.sent();
                                    return [3 /*break*/, 59];
                                case 58:
                                    _13 = '---';
                                    _142.label = 59;
                                case 59:
                                    _3 = _3.concat([
                                        (_106.name = _12.apply("6. \u2022 `", [_13, "`"]), _106.value = "\u21AA ***".concat(users_2[5] ? users_2[5].card_number : '---', "***"), _106)
                                    ]);
                                    _107 = {};
                                    _14 = "7. \u2022 `".concat;
                                    if (!users_2[6]) return [3 /*break*/, 61];
                                    return [4 /*yield*/, client.users.fetch(users_2[6].id).then(function (user) { return user.displayName; })];
                                case 60:
                                    _15 = _142.sent();
                                    return [3 /*break*/, 62];
                                case 61:
                                    _15 = '---';
                                    _142.label = 62;
                                case 62:
                                    _3 = _3.concat([
                                        (_107.name = _14.apply("7. \u2022 `", [_15, "`"]), _107.value = "\u21AA ***".concat(users_2[6] ? users_2[6].card_number : '---', "***"), _107)
                                    ]);
                                    _108 = {};
                                    _16 = "8. \u2022 `".concat;
                                    if (!users_2[7]) return [3 /*break*/, 64];
                                    return [4 /*yield*/, client.users.fetch(users_2[7].id).then(function (user) { return user.displayName; })];
                                case 63:
                                    _17 = _142.sent();
                                    return [3 /*break*/, 65];
                                case 64:
                                    _17 = '---';
                                    _142.label = 65;
                                case 65:
                                    _3 = _3.concat([
                                        (_108.name = _16.apply("8. \u2022 `", [_17, "`"]), _108.value = "\u21AA ***".concat(users_2[7] ? users_2[7].card_number : '---', "***"), _108)
                                    ]);
                                    _109 = {};
                                    _18 = "9. \u2022 `".concat;
                                    if (!users_2[8]) return [3 /*break*/, 67];
                                    return [4 /*yield*/, client.users.fetch(users_2[8].id).then(function (user) { return user.displayName; })];
                                case 66:
                                    _19 = _142.sent();
                                    return [3 /*break*/, 68];
                                case 67:
                                    _19 = '---';
                                    _142.label = 68;
                                case 68:
                                    _3 = _3.concat([
                                        (_109.name = _18.apply("9. \u2022 `", [_19, "`"]), _109.value = "\u21AA ***".concat(users_2[8] ? users_2[8].card_number : '---', "***"), _109)
                                    ]);
                                    _110 = {};
                                    _20 = "10.\u2022 `".concat;
                                    if (!users_2[9]) return [3 /*break*/, 70];
                                    return [4 /*yield*/, client.users.fetch(users_2[9].id).then(function (user) { return user.displayName; })];
                                case 69:
                                    _21 = _142.sent();
                                    return [3 /*break*/, 71];
                                case 70:
                                    _21 = '---';
                                    _142.label = 71;
                                case 71:
                                    _0.apply(_z, [_3.concat([
                                            (_110.name = _20.apply("10.\u2022 `", [_21, "`"]), _110.value = "\u21AA ***".concat(users_2[9] ? users_2[9].card_number : '---', "***"), _110)
                                        ])]);
                                    embeds.push(embed);
                                    _142.label = 72;
                                case 72:
                                    if (!leaderboard.includes('3')) return [3 /*break*/, 107];
                                    embed = new EmbedBuilder().setDescription('# Global Cards completion Leaderboard').setColor('Blue').setTimestamp();
                                    return [4 /*yield*/, client.knex('users').catch(function (err) { return Logger_1.default.error(err); })];
                                case 73:
                                    users_3 = _142.sent();
                                    users_3 = users_3.filter(function (user) { return client.users.cache.has(user.id); });
                                    users_3.forEach(function (user, key) { return __awaiter(_this, void 0, void 0, function () {
                                        var user_cards, _a, _b;
                                        var _this = this;
                                        return __generator(this, function (_c) {
                                            switch (_c.label) {
                                                case 0: return [4 /*yield*/, client
                                                        .knex('user_cards')
                                                        .where({ user_id: user.id })
                                                        .catch(function (err) { return Logger_1.default.error(err); })];
                                                case 1:
                                                    user_cards = _c.sent();
                                                    _a = users_3[key];
                                                    _b = user_cards.filter(function (card) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0: return [4 /*yield*/, client.knex('cards').first('*').where({ id: card.card_id }).authorId];
                                                            case 1: return [2 /*return*/, _a.sent()];
                                                        }
                                                    }); }); }).length;
                                                    return [4 /*yield*/, client.knex('cards')];
                                                case 2:
                                                    _a.card_completion = (_b / (_c.sent()).length) * 100;
                                                    done_3 = key == users_3.length - 1;
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); });
                                    _142.label = 74;
                                case 74:
                                    if (!!done_3) return [3 /*break*/, 76];
                                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 5); })];
                                case 75:
                                    _142.sent();
                                    return [3 /*break*/, 74];
                                case 76:
                                    users_3.sort(function (a, b) { return b.card_completion - a.card_completion; }).slice(0, 10);
                                    _23 = (_22 = embed).addFields;
                                    _111 = {};
                                    _24 = "\uD83E\uDD47 \u2022 `".concat;
                                    if (!users_3[0]) return [3 /*break*/, 78];
                                    return [4 /*yield*/, client.users.fetch(users_3[0].id).then(function (user) { return user.displayName; })];
                                case 77:
                                    _25 = _142.sent();
                                    return [3 /*break*/, 79];
                                case 78:
                                    _25 = '---';
                                    _142.label = 79;
                                case 79:
                                    _26 = [
                                        (_111.name = _24.apply("\uD83E\uDD47 \u2022 `", [_25, "`"]), _111.value = "\u21AA ***".concat(users_3[0] ? users_3[0].card_completion : '---', "%***"), _111)
                                    ];
                                    _112 = {};
                                    _27 = "\uD83E\uDD48 \u2022 `".concat;
                                    if (!users_3[1]) return [3 /*break*/, 81];
                                    return [4 /*yield*/, client.users.fetch(users_3[1].id).then(function (user) { return user.displayName; })];
                                case 80:
                                    _28 = _142.sent();
                                    return [3 /*break*/, 82];
                                case 81:
                                    _28 = '---';
                                    _142.label = 82;
                                case 82:
                                    _26 = _26.concat([
                                        (_112.name = _27.apply("\uD83E\uDD48 \u2022 `", [_28, "`"]), _112.value = "\u21AA ***".concat(users_3[1] ? users_3[1].card_completion : '---', "%***"), _112)
                                    ]);
                                    _113 = {};
                                    _29 = "\uD83E\uDD49 \u2022 `".concat;
                                    if (!users_3[2]) return [3 /*break*/, 84];
                                    return [4 /*yield*/, client.users.fetch(users_3[2].id).then(function (user) { return user.displayName; })];
                                case 83:
                                    _30 = _142.sent();
                                    return [3 /*break*/, 85];
                                case 84:
                                    _30 = '---';
                                    _142.label = 85;
                                case 85:
                                    _26 = _26.concat([
                                        (_113.name = _29.apply("\uD83E\uDD49 \u2022 `", [_30, "`"]), _113.value = "\u21AA ***".concat(users_3[2] ? users_3[2].card_completion : '---', "%***"), _113)
                                    ]);
                                    _114 = {};
                                    _31 = "4. \u2022 `".concat;
                                    if (!users_3[3]) return [3 /*break*/, 87];
                                    return [4 /*yield*/, client.users.fetch(users_3[3].id).then(function (user) { return user.displayName; })];
                                case 86:
                                    _32 = _142.sent();
                                    return [3 /*break*/, 88];
                                case 87:
                                    _32 = '---';
                                    _142.label = 88;
                                case 88:
                                    _26 = _26.concat([
                                        (_114.name = _31.apply("4. \u2022 `", [_32, "`"]), _114.value = "\u21AA ***".concat(users_3[3] ? users_3[3].card_completion : '---', "%***"), _114)
                                    ]);
                                    _115 = {};
                                    _33 = "5. \u2022 `".concat;
                                    if (!users_3[4]) return [3 /*break*/, 90];
                                    return [4 /*yield*/, client.users.fetch(users_3[4].id).then(function (user) { return user.displayName; })];
                                case 89:
                                    _34 = _142.sent();
                                    return [3 /*break*/, 91];
                                case 90:
                                    _34 = '---';
                                    _142.label = 91;
                                case 91:
                                    _26 = _26.concat([
                                        (_115.name = _33.apply("5. \u2022 `", [_34, "`"]), _115.value = "\u21AA ***".concat(users_3[4] ? users_3[4].card_completion : '---', "%***"), _115)
                                    ]);
                                    _116 = {};
                                    _35 = "6. \u2022 `".concat;
                                    if (!users_3[5]) return [3 /*break*/, 93];
                                    return [4 /*yield*/, client.users.fetch(users_3[5].id).then(function (user) { return user.displayName; })];
                                case 92:
                                    _36 = _142.sent();
                                    return [3 /*break*/, 94];
                                case 93:
                                    _36 = '---';
                                    _142.label = 94;
                                case 94:
                                    _26 = _26.concat([
                                        (_116.name = _35.apply("6. \u2022 `", [_36, "`"]), _116.value = "\u21AA ***".concat(users_3[5] ? users_3[5].card_completion : '---', "%***"), _116)
                                    ]);
                                    _117 = {};
                                    _37 = "7. \u2022 `".concat;
                                    if (!users_3[6]) return [3 /*break*/, 96];
                                    return [4 /*yield*/, client.users.fetch(users_3[6].id).then(function (user) { return user.displayName; })];
                                case 95:
                                    _38 = _142.sent();
                                    return [3 /*break*/, 97];
                                case 96:
                                    _38 = '---';
                                    _142.label = 97;
                                case 97:
                                    _26 = _26.concat([
                                        (_117.name = _37.apply("7. \u2022 `", [_38, "`"]), _117.value = "\u21AA ***".concat(users_3[6] ? users_3[6].card_completion : '---', "%***"), _117)
                                    ]);
                                    _118 = {};
                                    _39 = "8. \u2022 `".concat;
                                    if (!users_3[7]) return [3 /*break*/, 99];
                                    return [4 /*yield*/, client.users.fetch(users_3[7].id).then(function (user) { return user.displayName; })];
                                case 98:
                                    _40 = _142.sent();
                                    return [3 /*break*/, 100];
                                case 99:
                                    _40 = '---';
                                    _142.label = 100;
                                case 100:
                                    _26 = _26.concat([
                                        (_118.name = _39.apply("8. \u2022 `", [_40, "`"]), _118.value = "\u21AA ***".concat(users_3[7] ? users_3[7].card_completion : '---', "%***"), _118)
                                    ]);
                                    _119 = {};
                                    _41 = "9. \u2022 `".concat;
                                    if (!users_3[8]) return [3 /*break*/, 102];
                                    return [4 /*yield*/, client.users.fetch(users_3[8].id).then(function (user) { return user.displayName; })];
                                case 101:
                                    _42 = _142.sent();
                                    return [3 /*break*/, 103];
                                case 102:
                                    _42 = '---';
                                    _142.label = 103;
                                case 103:
                                    _26 = _26.concat([
                                        (_119.name = _41.apply("9. \u2022 `", [_42, "`"]), _119.value = "\u21AA ***".concat(users_3[8] ? users_3[8].card_completion : '---', "%***"), _119)
                                    ]);
                                    _120 = {};
                                    _43 = "10.\u2022 `".concat;
                                    if (!users_3[9]) return [3 /*break*/, 105];
                                    return [4 /*yield*/, client.users.fetch(users_3[9].id).then(function (user) { return user.displayName; })];
                                case 104:
                                    _44 = _142.sent();
                                    return [3 /*break*/, 106];
                                case 105:
                                    _44 = '---';
                                    _142.label = 106;
                                case 106:
                                    _23.apply(_22, [_26.concat([
                                            (_120.name = _43.apply("10.\u2022 `", [_44, "`"]), _120.value = "\u21AA ***".concat(users_3[9] ? users_3[9].card_completion : '---', "%***"), _120)
                                        ])]);
                                    embeds.push(embed);
                                    _142.label = 107;
                                case 107:
                                    if (!leaderboard.includes('4')) return [3 /*break*/, 142];
                                    embed = new EmbedBuilder().setDescription('# Global Cards Leaderboard').setColor('Blue').setTimestamp();
                                    return [4 /*yield*/, client.knex('users').catch(function (err) { return Logger_1.default.error(err); })];
                                case 108:
                                    users_4 = _142.sent();
                                    users_4 = users_4.filter(function (user) { return client.users.cache.has(user.id); });
                                    users_4.forEach(function (user, key) { return __awaiter(_this, void 0, void 0, function () {
                                        var user_cards;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, client
                                                        .knex('user_cards')
                                                        .where({ user_id: user.id })
                                                        .catch(function (err) { return Logger_1.default.error(err); })];
                                                case 1:
                                                    user_cards = _a.sent();
                                                    users_4[key].card_number = user_cards.length;
                                                    done_4 = key == users_4.length - 1;
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); });
                                    _142.label = 109;
                                case 109:
                                    if (!!done_4) return [3 /*break*/, 111];
                                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 5); })];
                                case 110:
                                    _142.sent();
                                    return [3 /*break*/, 109];
                                case 111:
                                    users_4.sort(function (a, b) { return b.card_number - a.card_number; }).slice(0, 10);
                                    _46 = (_45 = embed).addFields;
                                    _121 = {};
                                    _47 = "\uD83E\uDD47 \u2022 `".concat;
                                    if (!users_4[0]) return [3 /*break*/, 113];
                                    return [4 /*yield*/, client.users.fetch(users_4[0].id).then(function (user) { return user.displayName; })];
                                case 112:
                                    _48 = _142.sent();
                                    return [3 /*break*/, 114];
                                case 113:
                                    _48 = '---';
                                    _142.label = 114;
                                case 114:
                                    _49 = [
                                        (_121.name = _47.apply("\uD83E\uDD47 \u2022 `", [_48, "`"]), _121.value = "\u21AA ***".concat(users_4[0] ? users_4[0].card_number : '---', "***"), _121)
                                    ];
                                    _122 = {};
                                    _50 = "\uD83E\uDD48 \u2022 `".concat;
                                    if (!users_4[1]) return [3 /*break*/, 116];
                                    return [4 /*yield*/, client.users.fetch(users_4[1].id).then(function (user) { return user.displayName; })];
                                case 115:
                                    _51 = _142.sent();
                                    return [3 /*break*/, 117];
                                case 116:
                                    _51 = '---';
                                    _142.label = 117;
                                case 117:
                                    _49 = _49.concat([
                                        (_122.name = _50.apply("\uD83E\uDD48 \u2022 `", [_51, "`"]), _122.value = "\u21AA ***".concat(users_4[1] ? users_4[1].card_number : '---', "***"), _122)
                                    ]);
                                    _123 = {};
                                    _52 = "\uD83E\uDD49 \u2022 `".concat;
                                    if (!users_4[2]) return [3 /*break*/, 119];
                                    return [4 /*yield*/, client.users.fetch(users_4[2].id).then(function (user) { return user.displayName; })];
                                case 118:
                                    _53 = _142.sent();
                                    return [3 /*break*/, 120];
                                case 119:
                                    _53 = '---';
                                    _142.label = 120;
                                case 120:
                                    _49 = _49.concat([
                                        (_123.name = _52.apply("\uD83E\uDD49 \u2022 `", [_53, "`"]), _123.value = "\u21AA ***".concat(users_4[2] ? users_4[2].card_number : '---', "***"), _123)
                                    ]);
                                    _124 = {};
                                    _54 = "4. \u2022 `".concat;
                                    if (!users_4[3]) return [3 /*break*/, 122];
                                    return [4 /*yield*/, client.users.fetch(users_4[3].id).then(function (user) { return user.displayName; })];
                                case 121:
                                    _55 = _142.sent();
                                    return [3 /*break*/, 123];
                                case 122:
                                    _55 = '---';
                                    _142.label = 123;
                                case 123:
                                    _49 = _49.concat([
                                        (_124.name = _54.apply("4. \u2022 `", [_55, "`"]), _124.value = "\u21AA ***".concat(users_4[3] ? users_4[3].card_number : '---', "***"), _124)
                                    ]);
                                    _125 = {};
                                    _56 = "5. \u2022 `".concat;
                                    if (!users_4[4]) return [3 /*break*/, 125];
                                    return [4 /*yield*/, client.users.fetch(users_4[4].id).then(function (user) { return user.displayName; })];
                                case 124:
                                    _57 = _142.sent();
                                    return [3 /*break*/, 126];
                                case 125:
                                    _57 = '---';
                                    _142.label = 126;
                                case 126:
                                    _49 = _49.concat([
                                        (_125.name = _56.apply("5. \u2022 `", [_57, "`"]), _125.value = "\u21AA ***".concat(users_4[4] ? users_4[4].card_number : '---', "***"), _125)
                                    ]);
                                    _126 = {};
                                    _58 = "6. \u2022 `".concat;
                                    if (!users_4[5]) return [3 /*break*/, 128];
                                    return [4 /*yield*/, client.users.fetch(users_4[5].id).then(function (user) { return user.displayName; })];
                                case 127:
                                    _59 = _142.sent();
                                    return [3 /*break*/, 129];
                                case 128:
                                    _59 = '---';
                                    _142.label = 129;
                                case 129:
                                    _49 = _49.concat([
                                        (_126.name = _58.apply("6. \u2022 `", [_59, "`"]), _126.value = "\u21AA ***".concat(users_4[5] ? users_4[5].card_number : '---', "***"), _126)
                                    ]);
                                    _127 = {};
                                    _60 = "7. \u2022 `".concat;
                                    if (!users_4[6]) return [3 /*break*/, 131];
                                    return [4 /*yield*/, client.users.fetch(users_4[6].id).then(function (user) { return user.displayName; })];
                                case 130:
                                    _61 = _142.sent();
                                    return [3 /*break*/, 132];
                                case 131:
                                    _61 = '---';
                                    _142.label = 132;
                                case 132:
                                    _49 = _49.concat([
                                        (_127.name = _60.apply("7. \u2022 `", [_61, "`"]), _127.value = "\u21AA ***".concat(users_4[6] ? users_4[6].card_number : '---', "***"), _127)
                                    ]);
                                    _128 = {};
                                    _62 = "8. \u2022 `".concat;
                                    if (!users_4[7]) return [3 /*break*/, 134];
                                    return [4 /*yield*/, client.users.fetch(users_4[7].id).then(function (user) { return user.displayName; })];
                                case 133:
                                    _63 = _142.sent();
                                    return [3 /*break*/, 135];
                                case 134:
                                    _63 = '---';
                                    _142.label = 135;
                                case 135:
                                    _49 = _49.concat([
                                        (_128.name = _62.apply("8. \u2022 `", [_63, "`"]), _128.value = "\u21AA ***".concat(users_4[7] ? users_4[7].card_number : '---', "***"), _128)
                                    ]);
                                    _129 = {};
                                    _64 = "9. \u2022 `".concat;
                                    if (!users_4[8]) return [3 /*break*/, 137];
                                    return [4 /*yield*/, client.users.fetch(users_4[8].id).then(function (user) { return user.displayName; })];
                                case 136:
                                    _65 = _142.sent();
                                    return [3 /*break*/, 138];
                                case 137:
                                    _65 = '---';
                                    _142.label = 138;
                                case 138:
                                    _49 = _49.concat([
                                        (_129.name = _64.apply("9. \u2022 `", [_65, "`"]), _129.value = "\u21AA ***".concat(users_4[8] ? users_4[8].card_number : '---', "***"), _129)
                                    ]);
                                    _130 = {};
                                    _66 = "10.\u2022 `".concat;
                                    if (!users_4[9]) return [3 /*break*/, 140];
                                    return [4 /*yield*/, client.users.fetch(users_4[9].id).then(function (user) { return user.displayName; })];
                                case 139:
                                    _67 = _142.sent();
                                    return [3 /*break*/, 141];
                                case 140:
                                    _67 = '---';
                                    _142.label = 141;
                                case 141:
                                    _46.apply(_45, [_49.concat([
                                            (_130.name = _66.apply("10.\u2022 `", [_67, "`"]), _130.value = "\u21AA ***".concat(users_4[9] ? users_4[9].card_number : '---', "***"), _130)
                                        ])]);
                                    embeds.push(embed);
                                    _142.label = 142;
                                case 142:
                                    if (!leaderboard.includes('5')) return [3 /*break*/, 177];
                                    embed = new EmbedBuilder().setDescription('# Server Cards completion Leaderboard').setColor('Red').setTimestamp();
                                    return [4 /*yield*/, client.knex('users').catch(function (err) { return Logger_1.default.error(err); })];
                                case 143:
                                    users_5 = _142.sent();
                                    users_5 = users_5.filter(function (user) { return client.users.cache.has(user.id); });
                                    users_5 = users_5.filter(function (user) { return members_1.has(user.id); });
                                    users_5.forEach(function (user, key) { return __awaiter(_this, void 0, void 0, function () {
                                        var user_cards, _a, _b;
                                        var _this = this;
                                        return __generator(this, function (_c) {
                                            switch (_c.label) {
                                                case 0: return [4 /*yield*/, client
                                                        .knex('user_cards')
                                                        .where({ user_id: user.id })
                                                        .catch(function (err) { return Logger_1.default.error(err); })];
                                                case 1:
                                                    user_cards = _c.sent();
                                                    _a = users_5[key];
                                                    _b = user_cards.filter(function (card) { return __awaiter(_this, void 0, void 0, function () { var _a, _b; return __generator(this, function (_c) {
                                                        switch (_c.label) {
                                                            case 0:
                                                                _b = (_a = members_1).has;
                                                                return [4 /*yield*/, client.knex('cards').first('*').where({ id: card.card_id })];
                                                            case 1: return [2 /*return*/, _b.apply(_a, [(_c.sent()).authorId]) && [5, 9].includes(card.category)];
                                                        }
                                                    }); }); }).length;
                                                    return [4 /*yield*/, client.knex('cards')];
                                                case 2:
                                                    _a.serverCompletion =
                                                        (_b /
                                                            (_c.sent()).filter(function (card) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                                                return [2 /*return*/, members_1.has(card.authorId) && [5, 9].includes(card.category)];
                                                            }); }); }).length) *
                                                            100;
                                                    done_5 = key == users_5.length - 1;
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); });
                                    _142.label = 144;
                                case 144:
                                    if (!!done_5) return [3 /*break*/, 146];
                                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 5); })];
                                case 145:
                                    _142.sent();
                                    return [3 /*break*/, 144];
                                case 146:
                                    users_5.sort(function (a, b) { return b.serverCompletion - a.serverCompletion; }).slice(0, 10);
                                    _69 = (_68 = embed).addFields;
                                    _131 = {};
                                    _70 = "\uD83E\uDD47 \u2022  `".concat;
                                    if (!users_5[0]) return [3 /*break*/, 148];
                                    return [4 /*yield*/, client.users.fetch(users_5[0].id).then(function (user) { return user.displayName; })];
                                case 147:
                                    _71 = _142.sent();
                                    return [3 /*break*/, 149];
                                case 148:
                                    _71 = '---';
                                    _142.label = 149;
                                case 149:
                                    _72 = [
                                        (_131.name = _70.apply("\uD83E\uDD47 \u2022  `", [_71, "`"]), _131.value = "\u21AA ***".concat(users_5[0] ? users_5[0].serverCompletion : '---', "%***"), _131)
                                    ];
                                    _132 = {};
                                    _73 = "\uD83E\uDD48 \u2022 `".concat;
                                    if (!users_5[1]) return [3 /*break*/, 151];
                                    return [4 /*yield*/, client.users.fetch(users_5[1].id).then(function (user) { return user.displayName; })];
                                case 150:
                                    _74 = _142.sent();
                                    return [3 /*break*/, 152];
                                case 151:
                                    _74 = '---';
                                    _142.label = 152;
                                case 152:
                                    _72 = _72.concat([
                                        (_132.name = _73.apply("\uD83E\uDD48 \u2022 `", [_74, "`"]), _132.value = "\u21AA ***".concat(users_5[1] ? users_5[1].serverCompletion : '---', "%***"), _132)
                                    ]);
                                    _133 = {};
                                    _75 = "\uD83E\uDD49 \u2022 `".concat;
                                    if (!users_5[2]) return [3 /*break*/, 154];
                                    return [4 /*yield*/, client.users.fetch(users_5[2].id).then(function (user) { return user.displayName; })];
                                case 153:
                                    _76 = _142.sent();
                                    return [3 /*break*/, 155];
                                case 154:
                                    _76 = '---';
                                    _142.label = 155;
                                case 155:
                                    _72 = _72.concat([
                                        (_133.name = _75.apply("\uD83E\uDD49 \u2022 `", [_76, "`"]), _133.value = "\u21AA ***".concat(users_5[2] ? users_5[2].serverCompletion : '---', "%***"), _133)
                                    ]);
                                    _134 = {};
                                    _77 = "4. \u2022 `".concat;
                                    if (!users_5[3]) return [3 /*break*/, 157];
                                    return [4 /*yield*/, client.users.fetch(users_5[3].id).then(function (user) { return user.displayName; })];
                                case 156:
                                    _78 = _142.sent();
                                    return [3 /*break*/, 158];
                                case 157:
                                    _78 = '---';
                                    _142.label = 158;
                                case 158:
                                    _72 = _72.concat([
                                        (_134.name = _77.apply("4. \u2022 `", [_78, "`"]), _134.value = "\u21AA ***".concat(users_5[3] ? users_5[3].serverCompletion : '---', "%***"), _134)
                                    ]);
                                    _135 = {};
                                    _79 = "5. \u2022 `".concat;
                                    if (!users_5[4]) return [3 /*break*/, 160];
                                    return [4 /*yield*/, client.users.fetch(users_5[4].id).then(function (user) { return user.displayName; })];
                                case 159:
                                    _80 = _142.sent();
                                    return [3 /*break*/, 161];
                                case 160:
                                    _80 = '---';
                                    _142.label = 161;
                                case 161:
                                    _72 = _72.concat([
                                        (_135.name = _79.apply("5. \u2022 `", [_80, "`"]), _135.value = "\u21AA ***".concat(users_5[4] ? users_5[4].serverCompletion : '---', "%***"), _135)
                                    ]);
                                    _136 = {};
                                    _81 = "6. \u2022 `".concat;
                                    if (!users_5[5]) return [3 /*break*/, 163];
                                    return [4 /*yield*/, client.users.fetch(users_5[5].id).then(function (user) { return user.displayName; })];
                                case 162:
                                    _82 = _142.sent();
                                    return [3 /*break*/, 164];
                                case 163:
                                    _82 = '---';
                                    _142.label = 164;
                                case 164:
                                    _72 = _72.concat([
                                        (_136.name = _81.apply("6. \u2022 `", [_82, "`"]), _136.value = "\u21AA ***".concat(users_5[5] ? users_5[5].serverCompletion : '---', "%***"), _136)
                                    ]);
                                    _137 = {};
                                    _83 = "7. \u2022 `".concat;
                                    if (!users_5[6]) return [3 /*break*/, 166];
                                    return [4 /*yield*/, client.users.fetch(users_5[6].id).then(function (user) { return user.displayName; })];
                                case 165:
                                    _84 = _142.sent();
                                    return [3 /*break*/, 167];
                                case 166:
                                    _84 = '---';
                                    _142.label = 167;
                                case 167:
                                    _72 = _72.concat([
                                        (_137.name = _83.apply("7. \u2022 `", [_84, "`"]), _137.value = "\u21AA ***".concat(users_5[6] ? users_5[6].serverCompletion : '---', "%***"), _137)
                                    ]);
                                    _138 = {};
                                    _85 = "8. \u2022 `".concat;
                                    if (!users_5[7]) return [3 /*break*/, 169];
                                    return [4 /*yield*/, client.users.fetch(users_5[7].id).then(function (user) { return user.displayName; })];
                                case 168:
                                    _86 = _142.sent();
                                    return [3 /*break*/, 170];
                                case 169:
                                    _86 = '---';
                                    _142.label = 170;
                                case 170:
                                    _72 = _72.concat([
                                        (_138.name = _85.apply("8. \u2022 `", [_86, "`"]), _138.value = "\u21AA ***".concat(users_5[7] ? users_5[7].serverCompletion : '---', "%***"), _138)
                                    ]);
                                    _139 = {};
                                    _87 = "9. \u2022 `".concat;
                                    if (!users_5[8]) return [3 /*break*/, 172];
                                    return [4 /*yield*/, client.users.fetch(users_5[8].id).then(function (user) { return user.displayName; })];
                                case 171:
                                    _88 = _142.sent();
                                    return [3 /*break*/, 173];
                                case 172:
                                    _88 = '---';
                                    _142.label = 173;
                                case 173:
                                    _72 = _72.concat([
                                        (_139.name = _87.apply("9. \u2022 `", [_88, "`"]), _139.value = "\u21AA ***".concat(users_5[8] ? users_5[8].serverCompletion : '---', "%***"), _139)
                                    ]);
                                    _140 = {};
                                    _89 = "10.\u2022 `".concat;
                                    if (!users_5[9]) return [3 /*break*/, 175];
                                    return [4 /*yield*/, client.users.fetch(users_5[9].id).then(function (user) { return user.displayName; })];
                                case 174:
                                    _90 = _142.sent();
                                    return [3 /*break*/, 176];
                                case 175:
                                    _90 = '---';
                                    _142.label = 176;
                                case 176:
                                    _69.apply(_68, [_72.concat([
                                            (_140.name = _89.apply("10.\u2022 `", [_90, "`"]), _140.value = "\u21AA ***".concat(users_5[9] ? users_5[9].serverCompletion : '---', "%***"), _140)
                                        ])]);
                                    embeds.push(embed);
                                    _142.label = 177;
                                case 177:
                                    if (!channel)
                                        return [2 /*return*/];
                                    if (!guildConfig.leaderboard_edit) return [3 /*break*/, 181];
                                    if (!guildConfig.leaderboard_msg) return [3 /*break*/, 179];
                                    return [4 /*yield*/, channel.messages.fetch(guildConfig.leaderboard_msg)];
                                case 178:
                                    message_1 = _142.sent();
                                    if (!message_1)
                                        channel.send({ embeds: embeds }).then(function (msg) {
                                            message_1 = msg;
                                            client
                                                .knex('guilds')
                                                .update({ leaderboard_msg: msg.id })
                                                .where({ id: guild_1.id })
                                                .catch(function (err) {
                                                console.error(err);
                                            });
                                        });
                                    else
                                        message_1.edit({ embeds: embeds });
                                    return [3 /*break*/, 180];
                                case 179:
                                    channel.send({ embeds: embeds }).then(function (msg) {
                                        client
                                            .knex('guilds')
                                            .update({ leaderboard_msg: msg.id })
                                            .where({ id: guild_1.id })
                                            .catch(function (err) {
                                            console.error(err);
                                        });
                                    });
                                    _142.label = 180;
                                case 180: return [3 /*break*/, 182];
                                case 181:
                                    channel.send({ embeds: embeds }).then(function (msg) {
                                        client
                                            .knex('guilds')
                                            .update({ leaderboard_msg: msg.id })
                                            .where({ id: guild_1.id })
                                            .catch(function (err) {
                                            console.error(err);
                                        });
                                    });
                                    _142.label = 182;
                                case 182: return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
            }
        });
    });
}
module.exports = { leaderboard_start: leaderboard_start, leaderboard_update: leaderboard_update };
