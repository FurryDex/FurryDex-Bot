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
var card_1 = require("../../utils/functions/card");
module.exports = {
    name: 'furry',
    description: 'base furry command',
    category: 'furry',
    fullyTranslated: true,
    permissions: null,
    contexts: [discord_js_1.InteractionContextType.PrivateChannel, discord_js_1.InteractionContextType.Guild, discord_js_1.InteractionContextType.BotDM],
    options: [
        {
            name: 'list',
            description: 'Send a deck of all your/user card.',
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'user',
                    description: 'The user you want to see all cards.',
                    required: false,
                    type: discord_js_1.ApplicationCommandOptionType.User,
                },
            ],
        },
        {
            name: 'completion',
            description: 'Show your current completion/progress of Furry Cards.',
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'user',
                    description: 'The user you want to see their progress.',
                    required: false,
                    type: discord_js_1.ApplicationCommandOptionType.User,
                },
                {
                    name: 'category',
                    description: 'Get a completion from a specific category of card.',
                    required: false,
                    type: discord_js_1.ApplicationCommandOptionType.String,
                    choices: [
                        { name: 'Normal', value: '1' },
                        { name: 'Classic', value: '2' },
                        { name: 'Special', value: '3' },
                        { name: 'Furry Dex', value: '4' },
                        { name: 'Furry Dex Special', value: '5' },
                        { name: 'Director', value: '6' },
                        { name: 'Tiktok', value: '7' },
                        { name: 'Instagram', value: '8' },
                        { name: 'Celebration', value: '9' },
                        { name: 'Youtuber', value: '10' },
                        { name: 'Twitch', value: '11' },
                        { name: 'Musician', value: '12' },
                    ],
                },
            ],
        },
        //{
        //	name: 'last',
        //	description: 'Display info of your or another users last caught card.',
        //	type: ApplicationCommandOptionType.Subcommand,
        //},
        {
            name: 'give',
            description: 'Give a card to a user.',
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'give-to',
                    description: 'The user you want to give a card to.',
                    required: true,
                    type: discord_js_1.ApplicationCommandOptionType.User,
                },
            ],
        },
        {
            name: 'count',
            description: 'Count how many card you have.',
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'user',
                    description: 'The user you want to count cards.',
                    required: false,
                    type: discord_js_1.ApplicationCommandOptionType.User,
                },
            ],
        },
        //{
        //	name: 'info',
        //	//nameLocalizations: locales.options[5].name,
        //	description: 'Display info from a specific card.',
        //	//descriptionLocalizations: locales.options[5].description,
        //	type: ApplicationCommandOptionType.Subcommand,
        //},
        //{
        //	name: 'favorite',
        //	//nameLocalizations: locales.options[6].name,
        //	description: 'Set a card to favorite.',
        //	//descriptionLocalizations: locales.options[6].description,
        //	type: ApplicationCommandOptionType.Subcommand,
        //},
    ],
    runSlash: function (client, interaction) { return __awaiter(void 0, void 0, void 0, function () {
        var locales, subcommand, user, user_cards, allCards, userData, embed, buttonRow, AllOptions_1, category, embed_1, cards, havedCards, notHavedCards, embed, giveTo_1, AllOptions_2;
        var _a, _b, _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0: return [4 /*yield*/, interaction.deferReply()];
                case 1:
                    _f.sent();
                    locales = client.locales.commands.furry;
                    subcommand = interaction.options.getSubcommand();
                    user = (_a = interaction.options.getUser('user')) !== null && _a !== void 0 ? _a : interaction.user;
                    return [4 /*yield*/, client
                            .knex('user_cards')
                            .select('*')
                            .where({ user_id: user.id })
                            .catch(function (err) {
                            console.error(err);
                        })];
                case 2:
                    user_cards = _f.sent();
                    return [4 /*yield*/, client
                            .knex('cards')
                            .select('*')
                            .catch(function (err) {
                            console.error(err);
                        })];
                case 3:
                    allCards = _f.sent();
                    return [4 /*yield*/, client
                            .knex('users')
                            .first('*')
                            .where({ id: interaction.user.id })
                            .catch(function (err) {
                            console.error(err);
                        })];
                case 4:
                    userData = _f.sent();
                    if (!!userData) return [3 /*break*/, 6];
                    client
                        .knex('users')
                        .insert({ id: interaction.user.id })
                        .catch(function (err) { return console.error(err); });
                    return [4 /*yield*/, client
                            .knex('users')
                            .first('*')
                            .where({ id: interaction.user.id })
                            .catch(function (err) {
                            console.error(err);
                        })];
                case 5:
                    userData = _f.sent();
                    _f.label = 6;
                case 6:
                    if (userData.ToS != 1) {
                        embed = new discord_js_1.EmbedBuilder()
                            .setTitle('Wait, wait, wait !')
                            .setDescription("Sorry, but you need to accept the ToS for continue !\n\nLegal Documents (ToS & Privacy policy): https://FurryDex.github.io/legal/ \nBy clicking on \"Accept\", you accept the ToS")
                            .setColor('Green');
                        buttonRow = new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.ButtonBuilder().setCustomId("accept-tos").setLabel('Accept').setStyle(discord_js_1.ButtonStyle.Primary));
                        interaction.editReply({
                            embeds: [embed],
                            components: [buttonRow], //flags: MessageFlags.Ephemeral
                        });
                        return [2 /*return*/];
                    }
                    if (!(subcommand == 'list')) return [3 /*break*/, 7];
                    if (user_cards.length == 0)
                        return [2 /*return*/, interaction.editReply({
                                content: (_b = locales.run['no-furry'][interaction.locale]) !== null && _b !== void 0 ? _b : locales.run['no-furry'].default, //flags: MessageFlags.Ephemeral
                            })];
                    AllOptions_1 = [];
                    user_cards.forEach(function (card, key) { return __awaiter(void 0, void 0, void 0, function () {
                        var date, cd, description, card_info;
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    date = new Date(card.date);
                                    cd = function (num) { return num.toString().padStart(2, 0); };
                                    description = (_a = locales.run.list[interaction.locale]) !== null && _a !== void 0 ? _a : locales.run.list.default;
                                    return [4 /*yield*/, client
                                            .knex('cards')
                                            .first('*')
                                            .where({ id: card.card_id })
                                            .catch(function (err) {
                                            console.error(err);
                                        })];
                                case 1:
                                    card_info = _b.sent();
                                    AllOptions_1.push({
                                        label: "(#".concat(card.id, ") ").concat(card_info.name),
                                        value: "".concat(card.id),
                                        emoji: "".concat(card_info.emoji),
                                        description: description
                                            .replace('%attacks%', card.attacks)
                                            .replace('%live%', card.live)
                                            .replace('%date%', "".concat(cd(date.getDate()), "/").concat(cd(date.getMonth()), "/").concat(cd(date.getFullYear()), " ").concat(cd(date.getHours()), "H").concat(cd(date.getMinutes()))),
                                    });
                                    if (user_cards.length == key + 1) {
                                        sendMenu(AllOptions_1, interaction, function (params) { return __awaiter(void 0, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4 /*yield*/, interaction.editReply(params)];
                                                    case 1: return [2 /*return*/, _a.sent()];
                                                }
                                            });
                                        }); }, 0, 25, 'cards', function (response) { return __awaiter(void 0, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                (0, card_1.cardEmbed)(client, response.values[0], response.locale).then(function (embed) {
                                                    response.update({ embeds: [embed], components: [], content: ' ' }).catch(function (err) {
                                                        console.error(err, response.values[0]);
                                                    });
                                                });
                                                return [2 /*return*/];
                                            });
                                        }); });
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [3 /*break*/, 14];
                case 7:
                    if (!(subcommand == 'completion')) return [3 /*break*/, 13];
                    category = (_c = interaction.options.getString('category')) !== null && _c !== void 0 ? _c : '';
                    if (!category) return [3 /*break*/, 9];
                    return [4 /*yield*/, client
                            .knex('cards')
                            .select('*')
                            .where({ category: category })
                            .catch(function (err) {
                            console.error(err);
                        })];
                case 8:
                    allCards = _f.sent();
                    if (allCards.length == 0) {
                        embed_1 = new discord_js_1.EmbedBuilder().setTitle("Furry Dex Completion").setDescription("There no card in this category").setColor('#FF9700').setTimestamp();
                        interaction.editReply({ embeds: [embed_1] });
                    }
                    return [3 /*break*/, 10];
                case 9:
                    category = undefined;
                    _f.label = 10;
                case 10:
                    cards = 0;
                    return [4 /*yield*/, require('../../utils/functions/card').getUserCards(client, user.id, category)];
                case 11:
                    havedCards = _f.sent();
                    return [4 /*yield*/, require('../../utils/functions/card').getMissingCards(client, user.id, category)];
                case 12:
                    notHavedCards = _f.sent();
                    embed = new discord_js_1.EmbedBuilder()
                        .setTitle("Furry Dex Completion")
                        .setDescription("Dex of <@".concat(user.id, ">\nFurries Dex progression: *").concat(Math.round((havedCards.length / allCards.length) * 100), "%*\n\n__**Owned Furries Cards**__\n").concat(havedCards.map(function (card) { return "".concat(card.emoji); }).join(' '), "\n\n__**Missing Furries Cards**__\n").concat(notHavedCards
                        .map(function (card) { return card.emoji; })
                        .join(' ')))
                        .setColor('#FF9700')
                        .setTimestamp();
                    interaction.editReply({ embeds: [embed] });
                    return [3 /*break*/, 14];
                case 13:
                    if (subcommand == 'count') {
                        if (user_cards.length == 0)
                            return [2 /*return*/, interaction.editReply({
                                    content: (_d = locales.run['no-furry'][interaction.locale]) !== null && _d !== void 0 ? _d : locales.run['no-furry'].default, //flags: MessageFlags.Ephemeral
                                })];
                        return [2 /*return*/, interaction.editReply({ content: "The deck got `%number%` cards".replace('%number%', user_cards.length) })];
                    }
                    else if (subcommand == 'give') {
                        if (user_cards.length == 0)
                            return [2 /*return*/, interaction.editReply({
                                    content: (_e = locales.run['no-furry'][interaction.locale]) !== null && _e !== void 0 ? _e : locales.run['no-furry'].default, //flags: MessageFlags.Ephemeral
                                })];
                        giveTo_1 = interaction.options.getUser('give-to');
                        AllOptions_2 = [];
                        user_cards.forEach(function (card, key) { return __awaiter(void 0, void 0, void 0, function () {
                            var date, cd, description, card_info;
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        date = new Date(card.date);
                                        cd = function (num) { return num.toString().padStart(2, 0); };
                                        description = (_a = locales.run.list[interaction.locale]) !== null && _a !== void 0 ? _a : locales.run.list.default;
                                        return [4 /*yield*/, client
                                                .knex('cards')
                                                .first('*')
                                                .where({ id: card.card_id })
                                                .catch(function (err) {
                                                console.error(err);
                                            })];
                                    case 1:
                                        card_info = _b.sent();
                                        AllOptions_2.push({
                                            label: "(#".concat(card.id, ") ").concat(card_info.name),
                                            value: "".concat(card.id),
                                            emoji: "".concat(card_info.emoji),
                                            description: description
                                                .replace('%attacks%', card.attacks)
                                                .replace('%live%', card.live)
                                                .replace('%date%', "".concat(cd(date.getDate()), "/").concat(cd(date.getMonth()), "/").concat(cd(date.getFullYear()), " ").concat(cd(date.getHours()), "H").concat(cd(date.getMinutes()))),
                                        });
                                        if (user_cards.length == key + 1) {
                                            sendMenu(AllOptions_2, interaction, function (params) { return __awaiter(void 0, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0: return [4 /*yield*/, interaction.editReply(params)];
                                                        case 1: return [2 /*return*/, _a.sent()];
                                                    }
                                                });
                                            }); }, 0, 25, 'giveTo', function (response) { return __awaiter(void 0, void 0, void 0, function () {
                                                var user, card, date, cardO, message;
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0: return [4 /*yield*/, client
                                                                .knex('users')
                                                                .first('*')
                                                                .where({ id: giveTo_1.id })
                                                                .catch(function (err) { return console.error(err); })];
                                                        case 1:
                                                            user = _a.sent();
                                                            if (!user) {
                                                                client
                                                                    .knex('users')
                                                                    .insert({ user_id: giveTo_1.id })
                                                                    .catch(function (err) { return console.error(err); });
                                                            }
                                                            return [4 /*yield*/, client
                                                                    .knex('user_cards')
                                                                    .first('*')
                                                                    .where({ user_id: response.user.id, id: response.values[0] })
                                                                    .catch(function (err) { return console.error(err); })];
                                                        case 2:
                                                            card = _a.sent();
                                                            if (!card)
                                                                return [2 /*return*/, response.reply('You are not the owner of the card')];
                                                            date = new Date();
                                                            client
                                                                .knex('user_cards')
                                                                .update({ user_id: giveTo_1.id, gived: response.user.id, giveDate: date.toISOString() })
                                                                .where({ user_id: response.user.id, id: response.values[0] })
                                                                .catch(function (err) { return console.error(err); });
                                                            require('../../utils/functions/DiscordLogger.ts').writePlayer(client, response.user.id, {
                                                                tag: 'GIVE',
                                                                color: 'PINK',
                                                                description: 'Card Give',
                                                                info: [
                                                                    { name: 'to', value: "<@".concat(giveTo_1.id, ">") },
                                                                    { name: 'card', value: "".concat(response.values[0]) },
                                                                ],
                                                                content: 'Give',
                                                            });
                                                            require('../../utils/functions/DiscordLogger.ts').writePlayer(client, giveTo_1.id, {
                                                                tag: 'GIVE',
                                                                color: 'PINK',
                                                                description: 'Card Recieved',
                                                                info: [
                                                                    { name: 'from', value: "".concat(response.user.id) },
                                                                    { name: 'card', value: "".concat(response.values[0]) },
                                                                ],
                                                                content: 'Give',
                                                            });
                                                            return [4 /*yield*/, client
                                                                    .knex('cards')
                                                                    .first('*')
                                                                    .where({ id: card.card_id })
                                                                    .catch(function (err) { return console.error(err); })];
                                                        case 3:
                                                            cardO = _a.sent();
                                                            message = '%cardEmoji% `%cardName%` (`#%cardId%`)';
                                                            response.reply("card ".concat(message
                                                                .replace('%cardEmoji%', cardO.emoji)
                                                                .replace('%cardName%', cardO.name)
                                                                .replace('%cardId%', "".concat(card.id, ", ").concat(card.live < 0 ? card.live : "+".concat(card.live), "%/").concat(card.attacks < 0 ? card.attacks : "+".concat(card.attacks), "%"))
                                                                .replace('%@player%', "<@".concat(response.user.id, ">")), " from <@").concat(response.user.id, "> to <@").concat(giveTo_1.id, "> was give succefully"));
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            }); });
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                    }
                    else {
                        return [2 /*return*/, interaction.editReply({
                                content: 'Sorry, this *command* is disable. Er0r: 403',
                                //ephemerel: true,
                            })];
                    }
                    _f.label = 14;
                case 14: return [2 /*return*/];
            }
        });
    }); },
};
/**
 *
 * @callback callback
 * @param {Object}  options - List of options for the menu
 * @param {BaseInteraction, Message}  interaction - The interaction
 * @param {Boolean} isMessage - Is message ? (default false)
 * @param {Number} page - The page (default 0)
 * @param {Number} chunkSize - The chunk size (default 25, max 25)
 * @param {String} customId - The customId
 * @param {callback} callback - The callback
 * @param {String} content - The content of the interaction / message
 * @returns {Promise<SelectMenuInteraction>}
 * @example
 * sendMenu(options, interaction, message, page, chunkSize, customId, callback);
 * @example
 * sendMenu(options, interaction, false, 0, 25, 'cards', callback);
 *
 */
function sendMenu(options_1, interaction_1, update_command_1) {
    return __awaiter(this, arguments, void 0, function (options, interaction, update_command, page, chunkSize, customId, callback, content) {
        var chunkedOptions, currentOptions, row, rows, buttonRow, message, response;
        var _this = this;
        if (page === void 0) { page = 0; }
        if (chunkSize === void 0) { chunkSize = 25; }
        if (content === void 0) { content = 'Select a card: '; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    chunkedOptions = chunkArray(options, chunkSize);
                    currentOptions = chunkedOptions[page];
                    row = new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.StringSelectMenuBuilder().setCustomId(customId).addOptions(currentOptions));
                    if (!row)
                        return [2 /*return*/];
                    rows = [row];
                    if (chunkedOptions.length == 0)
                        return [2 /*return*/, interaction.editReply({ content: 'No options to select', flags: discord_js_1.MessageFlags.Ephemeral })];
                    if (chunkedOptions.length > 1) {
                        buttonRow = new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.ButtonBuilder()
                            .setCustomId("".concat(customId, "--prev"))
                            .setLabel('«')
                            .setStyle(page == 0 ? discord_js_1.ButtonStyle.Danger : discord_js_1.ButtonStyle.Primary)
                            .setDisabled(page == 0), new discord_js_1.ButtonBuilder()
                            .setCustomId("".concat(customId, "--nothing"))
                            .setLabel("".concat(Number(page) + 1))
                            .setStyle(discord_js_1.ButtonStyle.Success)
                            .setDisabled(chunkedOptions.length == 1), new discord_js_1.ButtonBuilder()
                            .setCustomId("".concat(customId, "--next"))
                            .setLabel('»')
                            .setStyle(page == chunkedOptions.length - 1 ? discord_js_1.ButtonStyle.Danger : discord_js_1.ButtonStyle.Primary)
                            .setDisabled(page == chunkedOptions.length - 1));
                        rows.push(buttonRow);
                    }
                    return [4 /*yield*/, (update_command !== null && update_command !== void 0 ? update_command : interaction.editReply)({ content: content, components: rows }).catch(function (err) {
                            console.error(err, currentOptions);
                        })];
                case 1:
                    message = _a.sent();
                    return [4 /*yield*/, message.awaitMessageComponent().catch(function (err) { return require('../../utils/Logger.ts').error(null, err); })];
                case 2:
                    response = _a.sent();
                    _a.label = 3;
                case 3:
                    if (!response.customId)
                        return [2 /*return*/];
                    if (!(response.customId == "".concat(customId, "--prev"))) return [3 /*break*/, 5];
                    return [4 /*yield*/, sendMenu(options, interaction, function (params) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                response.update(params);
                                return [2 /*return*/, response.message];
                            });
                        }); }, page - 1, chunkSize, customId, callback, content)];
                case 4: return [2 /*return*/, _a.sent()];
                case 5:
                    if (!(response.customId == "".concat(customId, "--nothing"))) return [3 /*break*/, 7];
                    return [4 /*yield*/, sendMenu(options, interaction, function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                response.reply({ content: "Eh! I have a secret told you!\n\n||There is no point in pressing a button in this range||", flags: discord_js_1.MessageFlags.Ephemeral });
                                return [2 /*return*/, response.message];
                            });
                        }); }, page, chunkSize, customId, callback, content)];
                case 6: return [2 /*return*/, _a.sent()];
                case 7:
                    if (!(response.customId == "".concat(customId, "--next"))) return [3 /*break*/, 9];
                    return [4 /*yield*/, sendMenu(options, interaction, function (params) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                response.update(params);
                                return [2 /*return*/, response.message];
                            });
                        }); }, page + 1, chunkSize, customId, callback, content)];
                case 8: return [2 /*return*/, _a.sent()];
                case 9:
                    if (response.customId == customId) {
                        callback(response);
                        return [2 /*return*/, response];
                    }
                    _a.label = 10;
                case 10:
                    if (true) return [3 /*break*/, 3];
                    _a.label = 11;
                case 11: return [2 /*return*/];
            }
        });
    });
}
function chunkArray(array, chunkSize) {
    if (chunkSize === void 0) { chunkSize = 25; }
    var chunks = [];
    for (var i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
}
