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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var EmbedBuilder = require('discord.js').EmbedBuilder;
function anticheat_start(client) {
    var _this = this;
    setTimeout(function () {
        anticheat_update(client);
        setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                anticheat_update(client);
                return [2 /*return*/];
            });
        }); }, 1 * 60 * 1000);
    }, 1000);
}
function anticheat_update(client) {
    return __awaiter(this, void 0, void 0, function () {
        var anticheat_messages, users;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client
                        .knex('anti-cheat_messages')
                        .select('*')
                        .catch(function (err) { return console.error(err); })];
                case 1:
                    anticheat_messages = _a.sent();
                    anticheat_messages.forEach(function (x) {
                        var date = new Date(x.dateTime);
                        date.setHours(date.getHours() + x.expire);
                        if (date <= new Date()) {
                            client
                                .knex('anti-cheat_messages')
                                .delete()
                                .where({ message_id: x.message_id })
                                .catch(function (err) { return console.error(err); });
                        }
                    });
                    return [4 /*yield*/, client.knex('users').catch(function (err) { return console.error(err); })];
                case 2:
                    users = _a.sent();
                    users.forEach(function (user) { return __awaiter(_this, void 0, void 0, function () {
                        var messages, spawn, pourcent, before, after;
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, client
                                        .knex('anti-cheat_messages')
                                        .select('*')
                                        .where({ user_id: user.id })
                                        .catch(function (err) { return console.error(err); })];
                                case 1:
                                    messages = _b.sent();
                                    return [4 /*yield*/, client
                                            .knex('anti-cheat_messages')
                                            .select('*')
                                            .where({ userCard: user.id })
                                            .catch(function (err) { return console.error(err); })];
                                case 2:
                                    spawn = _b.sent();
                                    if (messages.length <= 7)
                                        return [2 /*return*/]; // Pas assez de messages pour calculer le pourcentage
                                    pourcent = (((_a = __spreadArray(__spreadArray([], messages.map(function (x) { return x.have_spawn_card / 2 + (x.userCard == x.user_id ? 3 + 1 / 2 : 0); }), true), spawn.map(function (x) { return 1; }), true)) === null || _a === void 0 ? void 0 : _a.reduce(function (a, b) { return a + b; }, 0)) / messages.length) * 100;
                                    pourcent = pourcent > 100 ? 100 : pourcent < 0 ? 0 : pourcent;
                                    if (!pourcent)
                                        return [2 /*return*/];
                                    before = user.anticheat;
                                    after = pourcent;
                                    if (before < 50 && after >= 50)
                                        client
                                            .knex('users')
                                            .update({ ToS: 0 })
                                            .where({ id: user.id })
                                            .catch(function (err) { return console.error(err); });
                                    client
                                        .knex('users')
                                        .update({ anticheat: pourcent, can_spawn: pourcent < 65 ? 1 : pourcent >= 75 ? 0 : undefined })
                                        .where({ id: user.id })
                                        .catch(function (err) { return console.error(err); });
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
            }
        });
    });
}
function anticheat_message(client, message, user_id, have_spawn_card, expire) {
    if (have_spawn_card === void 0) { have_spawn_card = 0; }
    if (expire === void 0) { expire = 720; }
    client
        .knex('anti-cheat_messages')
        .insert({ message_id: message.id, user_id: user_id, have_spawn_card: have_spawn_card, expire: expire })
        .catch(function (err) { return console.error(err); });
}
module.exports = { anticheat_start: anticheat_start, anticheat_update: anticheat_update, anticheat_message: anticheat_message };
