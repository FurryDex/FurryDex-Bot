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
exports.cardEmbed = cardEmbed;
var discord_js_1 = require("discord.js");
var Logger_1 = __importDefault(require("../Logger"));
function cardEmbed(client, cardId, locale) {
    return __awaiter(this, void 0, void 0, function () {
        var locales, cardF, originalCardF, speciesNames, data_type, temp_type, type, color, date, description, giveDate, birthday, nextBirthday, embed;
        var _this = this;
        var _a, _b, _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    locales = client.locales.utils.function.cards;
                    return [4 /*yield*/, card(client, cardId)];
                case 1:
                    cardF = (_f.sent());
                    return [4 /*yield*/, originalCard(client, cardF.card_id)];
                case 2:
                    originalCardF = (_f.sent());
                    speciesNames = [];
                    return [4 /*yield*/, JSON.parse(originalCardF.species).forEach(function (species_id) { return __awaiter(_this, void 0, void 0, function () {
                            var species_name;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, client
                                            .knex('species')
                                            .first('*')
                                            .where({ id: species_id })
                                            .catch(function (err) {
                                            console.error(err);
                                        })];
                                    case 1:
                                        species_name = _a.sent();
                                        speciesNames.push(species_name.name);
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 3:
                    _f.sent();
                    return [4 /*yield*/, client
                            .knex('category')
                            .first('*')
                            .where({ id: originalCardF.category })
                            .catch(function (err) {
                            console.error(err);
                        })];
                case 4:
                    data_type = _f.sent();
                    temp_type = data_type.name;
                    type = temp_type.charAt(0).toUpperCase() + temp_type.slice(1);
                    color = (_b = (_a = require('../colors.json').find(function (color) { var _a; return color.name == ((_a = data_type.color) !== null && _a !== void 0 ? _a : originalCardF.color); })) === null || _a === void 0 ? void 0 : _a.hex) !== null && _b !== void 0 ? _b : '#000000';
                    if (color == '#000000') {
                        Logger_1.default.warn(null, 'Color Error at card ' + cardF.card_id);
                    }
                    date = new Date(cardF.date);
                    description = (_c = locales.embed.description[locale]) !== null && _c !== void 0 ? _c : locales.embed.description['en-US'];
                    description = description
                        .replace('%author%', formatArrayToText((typeof JSON.parse(originalCardF.authorId) == 'number' ? [originalCardF.authorId.toString()] : JSON.parse(originalCardF.authorId)).map(function (x) { return "<@".concat(x, ">"); })))
                        .replace('%id%', cardF.id)
                        .replace('%name%', originalCardF.name)
                        .replace('%time%', "".concat((0, discord_js_1.time)(date, discord_js_1.TimestampStyles.LongDateTime), " (").concat((0, discord_js_1.time)(date, discord_js_1.TimestampStyles.RelativeTime), ")"))
                        .replace('%type%', type)
                        .replace('%species%', formatArrayToText(speciesNames))
                        .replace('%live%', cardF.live < 0 ? originalCardF.live - (originalCardF.live * Number("".concat(cardF.live).replace('-', ''))) / 100 : originalCardF.live + (originalCardF.live * cardF.live) / 100) //cardF.live < 0 ? originalCardF.live-(originalCardF.live*cardF.live/100) : originalCardF.live+(originalCardF.live*cardF.live/100)
                        .replace('%live_2%', cardF.live)
                        .replace('%attacks%', cardF.attacks < 0 ? originalCardF.attacks - (originalCardF.attacks * Number("".concat(cardF.attacks).replace('-', ''))) / 100 : originalCardF.attacks + (originalCardF.attacks * cardF.attacks) / 100) //cardF.attacks < 0 ? originalCardF.attacks-(originalCardF.attacks*cardF.attacks/100) : originalCardF.attacks+(originalCardF.attacks*cardF.attacks/100)
                        .replace('%attacks_2%', cardF.attacks);
                    if (cardF.gived != '0') {
                        if (cardF.giveDate == null)
                            return [2 /*return*/];
                        giveDate = new Date(cardF.giveDate);
                        description = description.replace('%gived%', "".concat(((_d = locales.embed.giveBy[locale]) !== null && _d !== void 0 ? _d : locales.embed.giveBy['en-US']).replace('%giver%', "<@".concat(cardF.gived, ">")).replace('%giveTime%', "".concat((0, discord_js_1.time)(giveDate, discord_js_1.TimestampStyles.LongDateTime), " (").concat((0, discord_js_1.time)(giveDate, discord_js_1.TimestampStyles.RelativeTime), ")")), "\n"));
                    }
                    else {
                        description = description.replace('%gived%', "");
                    }
                    if (originalCardF.birthday) {
                        birthday = new Date(originalCardF.birthday);
                        nextBirthday = new Date(originalCardF.birthday);
                        nextBirthday.setFullYear(new Date().getFullYear());
                        if (nextBirthday < new Date())
                            nextBirthday.setFullYear(new Date().getFullYear() + 1);
                        description = description.replace('%birthday%', "".concat(((_e = locales.embed.birthday[locale]) !== null && _e !== void 0 ? _e : locales.embed.birthday['en-US']).replace('%birthday%', "".concat((0, discord_js_1.time)(birthday, discord_js_1.TimestampStyles.ShortDateTime), " (").concat((0, discord_js_1.time)(birthday, discord_js_1.TimestampStyles.RelativeTime), ") \u2192 ").concat((0, discord_js_1.time)(nextBirthday, discord_js_1.TimestampStyles.RelativeTime))), "\n"));
                    }
                    else {
                        description = description.replace('%birthday%', "");
                    }
                    embed = new discord_js_1.EmbedBuilder()
                        .setColor(color)
                        .setTitle("".concat(originalCardF.emoji, " ").concat(originalCardF.name))
                        .setDescription(description)
                        //%emoji_1%, <:atlanta_crown:598174064183607317> | %author%, originalCardF.author | %emoji_2%, <:atlanta_id:598162717232332811> | %id%, cardF.id | %emoji_3%, 🪪
                        //%name%`, originalCardF.name | %emoji_4%, 📅 | %time%, ${time(date, TimestampStyles.LongDateTime)} (${time(date, TimestampStyles.RelativeTime)}) | %emoji_5%, ❤️
                        //%live%, originalCardF.live | %live_2%, cardF.live | %emoji_6%, <:atlanta_minecraft:598170502963396620> | %attacks%, originalCardF.attacks | %attacks_2%, cardF.attacks
                        .setImage(originalCardF.card);
                    return [2 /*return*/, embed];
            }
        });
    });
}
// Fonction pour récupérer les cartes possédées par un utilisateur
function getUserCards(client, userId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client
                        .knex('cards')
                        .whereIn('id', function (knexInstance) { return knexInstance.select('card_id').from('user_cards').where({ user_id: userId }); })
                        .select('*')
                        .catch(function (err) {
                        console.error(err);
                        return null;
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
// Fonction pour récupérer les cartes que l'utilisateur n'a pas
function getMissingCards(client_1, userId_1) {
    return __awaiter(this, arguments, void 0, function (client, userId, category) {
        if (category === void 0) { category = ''; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client
                        .knex('cards')
                        .whereNotIn('id', function (knexInstance) { return knexInstance.select('card_id').from('user_cards').where({ user_id: userId }); })
                        .select('*')
                        .catch(function (err) {
                        console.error(err);
                        return null;
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function originalCard(client, cardId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client
                        .knex('cards')
                        .first('*')
                        .where({ id: cardId })
                        .catch(function (err) {
                        console.error(err);
                        return null;
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function card(client, cardId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client
                        .knex('user_cards')
                        .first('*')
                        .where({ id: cardId })
                        .catch(function (err) {
                        console.error(err);
                        return null;
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function formatArrayToText(array) {
    if (array.length === 0)
        return '';
    // Met la première lettre de chaque mot en majuscule
    var capitalizedArray = array.map(function (word) { return word.charAt(0).toUpperCase() + word.slice(1); });
    // Gère le format de la chaîne de texte finale
    if (capitalizedArray.length === 1) {
        return capitalizedArray[0];
    }
    else {
        var lastItem = capitalizedArray.pop();
        return capitalizedArray.join(', ') + ' and ' + lastItem;
    }
}
exports.default = { card: card, cardEmbed: cardEmbed, originalCard: originalCard, getMissingCards: getMissingCards, getUserCards: getUserCards };
