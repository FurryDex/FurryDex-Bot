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
var discord_js_1 = require("discord.js");
var uid = function () {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
module.exports = {
    name: 'catch',
    run: function (client, interaction) {
        return __awaiter(this, void 0, void 0, function () {
            var guess, locales, serverConfig, message, card, live, attacks, glitchCard, hasGlitchCard, uuid, user, message, msg, newComponents, nonono;
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        guess = interaction.fields.getTextInputValue('guess').toLowerCase();
                        locales = client.locales.modals.catch;
                        return [4 /*yield*/, client
                                .knex('guilds')
                                .first('*')
                                .where({ id: interaction.guild.id })
                                .catch(function (err) { return console.error(err); })];
                    case 1:
                        serverConfig = _d.sent();
                        if (serverConfig.last_Card == null) {
                            message = (_a = locales.already[serverConfig.locale]) !== null && _a !== void 0 ? _a : locales.already.default;
                            interaction.reply(message.replace('%@player%', "<@".concat(interaction.user.id, ">")));
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, client
                                .knex('cards')
                                .first('*')
                                .where({ id: serverConfig.last_Card })
                                .catch(function (err) { return console.error(err); })];
                    case 2:
                        card = _d.sent();
                        if (!card.possible_name.includes(guess)) return [3 /*break*/, 5];
                        live = Math.round(Math.floor(Math.random() * (25 - -25)) + -25);
                        attacks = Math.round(Math.floor(Math.random() * (25 - -25)) + -25);
                        glitchCard = Math.random() > 0.999;
                        return [4 /*yield*/, client
                                .knex('user_cards')
                                .first('*')
                                .where({ user_id: interaction.user.id, card_id: 19 })
                                .catch(function (err) { return console.error(err); })];
                    case 3:
                        hasGlitchCard = _d.sent();
                        if (glitchCard && !hasGlitchCard) {
                            live = 0;
                            attacks = 0;
                            serverConfig.last_Card = 19;
                        }
                        uuid = uid();
                        return [4 /*yield*/, client
                                .knex('users')
                                .first('*')
                                .where({ id: interaction.user.id })
                                .catch(function (err) { return console.error(err); })];
                    case 4:
                        user = _d.sent();
                        if (!user) {
                            client
                                .knex('users')
                                .insert({ user_id: interaction.user.id })
                                .catch(function (err) { return console.error(err); });
                        }
                        client
                            .knex('user_cards')
                            .insert({
                            id: uuid,
                            user_id: interaction.user.id,
                            card_id: serverConfig.last_Card,
                            guild: interaction.guild.id,
                            date: new Date().toISOString(),
                            live: "".concat(live < 0 ? live : "+".concat(live)),
                            attacks: "".concat(attacks < 0 ? attacks : "+".concat(attacks)),
                        })
                            .catch(function (err) { return console.error(err); });
                        message = (_b = locales.congrat[serverConfig.locale]) !== null && _b !== void 0 ? _b : locales.congrat.default;
                        interaction.reply(message
                            .replace('%cardEmoji%', card.emoji)
                            .replace('%cardName%', card.name)
                            .replace('%cardId%', "".concat(uuid, ", ").concat(live < 0 ? live : "+".concat(live), "%/").concat(attacks < 0 ? attacks : "+".concat(attacks), "%"))
                            .replace('%@player%', "<@".concat(interaction.user.id, ">")));
                        require('../../utils/functions/DiscordLogger.ts').writePlayer(client, interaction.user.id, {
                            tag: 'SUCCES',
                            color: 'GREEN',
                            description: 'Card catch',
                            info: [
                                { name: 'Card', value: "".concat(card.name, " (").concat(card.id, ")") },
                                { name: 'UUID', value: uuid },
                                { name: 'Guild', value: "".concat(interaction.guild.name, " (").concat(interaction.guild.id, ")") },
                                { name: 'Live', value: "".concat(live < 0 ? live : "+".concat(live)) },
                                { name: 'Attacks', value: "".concat(attacks < 0 ? attacks : "+".concat(attacks)) },
                            ],
                            content: 'Catch',
                        });
                        require('../../utils/functions/DiscordLogger.ts').writeServer(client, interaction.guild.id, {
                            tag: 'SUCCES',
                            color: 'GREEN',
                            description: 'Card catch',
                            info: [
                                { name: 'Card', value: "".concat(card.name, " (").concat(card.id, ")") },
                                { name: 'UUID', value: uuid },
                                { name: 'User', value: "".concat(interaction.user.displayName, " (").concat(interaction.user.id, ")") },
                                { name: 'Live', value: "".concat(live < 0 ? live : "+".concat(live)) },
                                { name: 'Attacks', value: "".concat(attacks < 0 ? attacks : "+".concat(attacks)) },
                            ],
                            content: 'Catch',
                        });
                        client
                            .knex('guilds')
                            .update({ last_Card: null })
                            .where({ id: interaction.guild.id })
                            .catch(function (err) { return console.error(err); });
                        msg = interaction.message;
                        newComponents = msg.components.map(function (row) {
                            return new discord_js_1.ActionRowBuilder().addComponents(row.components.map(function (button) {
                                return new discord_js_1.ButtonBuilder().setCustomId(button.customId).setLabel(button.label).setStyle(button.style).setDisabled(true); // Toggle the disabled state
                            }));
                        });
                        client
                            .knex('anti-cheat_messages')
                            .update({ userCard: interaction.user.id })
                            .where({ spawnMessage: interaction.message.id })
                            .catch(function (err) { return console.error(err); });
                        msg.edit({ embeds: interaction.message.embeds, components: newComponents });
                        return [3 /*break*/, 6];
                    case 5:
                        nonono = (_c = locales.no[serverConfig.locale]) !== null && _c !== void 0 ? _c : locales.no.default;
                        interaction.reply(nonono.replace('%guess%', guess).replace('%@player%', "<@".concat(interaction.user.id, ">")));
                        return [2 /*return*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    },
};
