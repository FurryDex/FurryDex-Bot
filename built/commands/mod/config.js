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
module.exports = {
    name: 'config',
    description: 'base config command',
    permissions: discord_js_1.PermissionFlagsBits.Administrator,
    category: 'admin',
    fullyTranslated: true,
    run: function (client, message, args) { },
    options: [
        {
            name: 'enable',
            description: 'enable or disable the card spawn.',
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'enable',
                    description: 'enable or disable the card spawn.',
                    type: discord_js_1.ApplicationCommandOptionType.String,
                    required: true,
                    choices: [
                        {
                            name: 'Enable',
                            value: 'true',
                        },
                        {
                            name: 'Disable',
                            value: 'false',
                        },
                    ],
                },
            ],
        },
        {
            name: 'channel',
            description: 'Channel where card will spawn.',
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'channel',
                    description: 'The channel where card will spawn',
                    type: discord_js_1.ApplicationCommandOptionType.Channel,
                    required: true,
                },
            ],
        },
        {
            name: 'locale',
            description: 'Set the base-lang for the server.',
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'lang',
                    description: 'Set the base-lang for the server.',
                    type: discord_js_1.ApplicationCommandOptionType.String,
                    required: true,
                    choices: [
                        {
                            name: 'German',
                            value: 'de',
                        },
                        {
                            name: 'English',
                            value: 'en-US',
                        },
                        {
                            name: 'Spanish',
                            value: 'es',
                        },
                        {
                            name: 'French',
                            value: 'fr',
                        },
                        {
                            name: 'Italian',
                            value: 'it',
                        },
                        {
                            name: 'Dutch',
                            value: 'du',
                        },
                        {
                            name: 'Norwegian',
                            value: 'no',
                        },
                        {
                            name: 'Polish',
                            value: 'pl',
                        },
                        {
                            name: 'Portugese',
                            value: 'pt-BR',
                        },
                        {
                            name: 'Romanian',
                            value: 'ro',
                        },
                        {
                            name: 'Finish',
                            value: 'fi',
                        },
                        {
                            name: 'Swedish',
                            value: 'sv-SE',
                        },
                        {
                            name: 'Bulgarian',
                            value: 'bg',
                        },
                        {
                            name: 'Russian',
                            value: 'ru',
                        },
                        {
                            name: 'Ukrainian',
                            value: 'uk',
                        },
                        {
                            name: 'Chinese',
                            value: 'zh-CN',
                        },
                        {
                            name: 'Japanese',
                            value: 'ja',
                        },
                        {
                            name: 'Korean',
                            value: 'ko',
                        },
                    ],
                },
            ],
        },
        {
            name: 'auto-locale',
            description: 'Automatic set the base-lang for the server.',
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
        },
        {
            name: 'leaderboard_channel',
            description: 'Set the channel for the leaderboard.',
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'channel',
                    description: 'The channel where card will spawn',
                    type: discord_js_1.ApplicationCommandOptionType.Channel,
                    required: true,
                },
            ],
        },
        {
            name: 'leaderboard',
            description: 'Set the different leaderboards to show.',
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
        },
        {
            name: 'leaderboard_edit',
            description: 'Replace the leaderboard message instead of send another one.',
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'enable',
                    description: 'Enable or disable the leaderboard edit function.',
                    type: discord_js_1.ApplicationCommandOptionType.String,
                    required: true,
                    choices: [
                        {
                            name: 'Enable',
                            value: 'true',
                        },
                        {
                            name: 'Disable',
                            value: 'false',
                        },
                    ],
                },
            ],
        },
    ],
    runSlash: function (client, interaction) { return __awaiter(void 0, void 0, void 0, function () {
        var subcommand, locales, serverConfig, channel, message, message, message, guild, local, message, message, option, _a, _b, row, channel, message;
        var _c, _d, _e, _f, _g, _h, _j;
        return __generator(this, function (_k) {
            switch (_k.label) {
                case 0:
                    subcommand = interaction.options.getSubcommand();
                    return [4 /*yield*/, interaction.deferReply()];
                case 1:
                    _k.sent();
                    locales = client.locales.commands.config;
                    return [4 /*yield*/, client
                            .knex('guilds')
                            .first('*')
                            .where({ id: interaction.guild.id })
                            .catch(function (err) { return console.error(err); })];
                case 2:
                    serverConfig = _k.sent();
                    if (!!serverConfig) return [3 /*break*/, 5];
                    return [4 /*yield*/, client.knex('guilds').insert({
                            id: interaction.guild.id,
                        })];
                case 3:
                    _k.sent();
                    return [4 /*yield*/, client
                            .knex('guilds')
                            .first('*')
                            .where({ id: interaction.guild.id })
                            .catch(function (err) { return console.error(err); })];
                case 4:
                    serverConfig = _k.sent();
                    _k.label = 5;
                case 5:
                    if (!(subcommand == 'enable')) return [3 /*break*/, 7];
                    return [4 /*yield*/, interaction.guild.channels.cache.get(serverConfig.spawn_channel)];
                case 6:
                    channel = _k.sent();
                    if (channel) {
                        client
                            .knex('guilds')
                            .update({ enabled: interaction.options.getString('enable') == 'true' ? true : false })
                            .where({ id: interaction.guild.id })
                            .catch(function (err) { return console.error(err); });
                    }
                    else {
                        return [2 /*return*/, interaction.editReply('Cannot enable bot if the channel is not set, use `/config channel <channel>`')];
                    }
                    message = (_c = locales.run.changedEna[interaction.locale]) !== null && _c !== void 0 ? _c : locales.run.changedEna.default;
                    interaction.editReply(message.replace('%enable%', interaction.options.getString('enable') == 'true' ? 'Enable' : 'Disable'));
                    _k.label = 7;
                case 7:
                    if (!(subcommand == 'channel')) return [3 /*break*/, 9];
                    return [4 /*yield*/, client
                            .knex('guilds')
                            .update({ spawn_channel: interaction.options.getChannel('channel').id })
                            .where({ id: interaction.guild.id })
                            .catch(function (err) { return console.error(err); })];
                case 8:
                    _k.sent();
                    message = (_d = locales.run.changedChan[interaction.locale]) !== null && _d !== void 0 ? _d : locales.run.changedChan.default;
                    interaction.editReply(message.replace('%channel%', interaction.options.getChannel('channel').name));
                    _k.label = 9;
                case 9:
                    if (!(subcommand == 'locale')) return [3 /*break*/, 11];
                    return [4 /*yield*/, client
                            .knex('guilds')
                            .update({ locale: interaction.options.getString('lang') })
                            .where({ id: interaction.guild.id })
                            .catch(function (err) { return console.error(err); })];
                case 10:
                    _k.sent();
                    message = (_e = locales.run.changed[interaction.locale]) !== null && _e !== void 0 ? _e : locales.run.changed.default;
                    interaction.editReply(message.replace('%lang%', interaction.options.getString('lang')));
                    _k.label = 11;
                case 11:
                    if (!(subcommand == 'auto-locale')) return [3 /*break*/, 13];
                    guild = interaction.guild;
                    local = '';
                    if (guild.preferredLocale) {
                        local = guild.preferredLocale;
                    }
                    else {
                        local = interaction.locale;
                    }
                    return [4 /*yield*/, client
                            .knex('guilds')
                            .update({ locale: local })
                            .where({ id: interaction.guild.id })
                            .catch(function (err) { return console.error(err); })];
                case 12:
                    _k.sent();
                    message = (_f = locales.run.changed[interaction.locale]) !== null && _f !== void 0 ? _f : locales.run.changed.default;
                    interaction.editReply(message.replace('%lang%', local));
                    _k.label = 13;
                case 13:
                    if (!(subcommand == 'leaderboard_channel')) return [3 /*break*/, 15];
                    return [4 /*yield*/, client
                            .knex('guilds')
                            .update({ leaderboard_channel: interaction.options.getChannel('channel').id })
                            .where({ id: interaction.guild.id })
                            .catch(function (err) { return console.error(err); })];
                case 14:
                    _k.sent();
                    message = (_g = locales.run.changedLeaderChan[interaction.locale]) !== null && _g !== void 0 ? _g : locales.run.changedLeaderChan.default;
                    interaction.editReply(message.replace('%channel%', interaction.options.getChannel('channel').name));
                    _k.label = 15;
                case 15:
                    if (!(subcommand == 'leaderboard')) return [3 /*break*/, 18];
                    _b = (_a = JSON).parse;
                    return [4 /*yield*/, client
                            .knex('guilds')
                            .update({ leaderboard: JSON.stringify(interaction.values) })
                            .where({ id: interaction.guild.id })
                            .catch(function (err) { return console.log(err); })];
                case 16:
                    option = _b.apply(_a, [(_h = (_k.sent())) !== null && _h !== void 0 ? _h : '[]']);
                    row = new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.StringSelectMenuBuilder()
                        .setCustomId('leaderboard')
                        .setPlaceholder('Select different leaderboards to show')
                        .addOptions([
                        { label: "1. Cards completion Leaderboard", value: "1", default: option.includes('1') },
                        { label: "2. Cards Leaderboard", value: "2", default: option.includes('2') },
                        { label: "3. Global Cards completion Leaderboard", value: "3", default: option.includes('3') },
                        { label: "4. Global Cards Leaderboard", value: "4", default: option.includes('4') },
                        { label: "5. Server Cards Completion Leaderboard", value: "5", default: option.includes('5') },
                    ])
                        .setMaxValues(5)
                        .setMinValues(0));
                    return [4 /*yield*/, interaction.editReply({ content: 'Please select different leaderboards to show:', components: [row], flags: discord_js_1.MessageFlags.Ephemeral })];
                case 17:
                    _k.sent();
                    _k.label = 18;
                case 18:
                    if (!(subcommand == 'leaderboard_edit')) return [3 /*break*/, 20];
                    return [4 /*yield*/, interaction.guild.channels.cache.get(serverConfig.leaderboard_edit)];
                case 19:
                    channel = _k.sent();
                    if (!channel) {
                        client
                            .knex('guilds')
                            .update({ leaderboard_edit: interaction.options.getString('enable') == 'true' ? true : false })
                            .where({ id: interaction.guild.id })
                            .catch(function (err) { return console.error(err); });
                    }
                    else {
                        return [2 /*return*/, interaction.editReply('Cannot enable leaderboard if the channel is not set, use `/config leaderboard_channel <channel>`')];
                    }
                    message = (_j = locales.run.changedLeaderEna[interaction.locale]) !== null && _j !== void 0 ? _j : locales.run.changedLeaderEna.default;
                    interaction.editReply(message.replace('%enable%', interaction.options.getString('enable') == 'true' ? 'Enable' : 'Disable'));
                    _k.label = 20;
                case 20: return [2 /*return*/];
            }
        });
    }); },
};
