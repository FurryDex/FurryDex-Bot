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
var yaml = require('js-yaml');
var fs = require('fs');
var config = yaml.load(fs.readFileSync('./config/config.yaml', 'utf8'));
var discord_js_1 = require("discord.js");
var client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMembers,
        discord_js_1.GatewayIntentBits.GuildBans,
        discord_js_1.GatewayIntentBits.GuildEmojisAndStickers,
        discord_js_1.GatewayIntentBits.GuildIntegrations,
        discord_js_1.GatewayIntentBits.GuildWebhooks,
        discord_js_1.GatewayIntentBits.GuildInvites,
        discord_js_1.GatewayIntentBits.GuildPresences,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.GuildMessageReactions,
        discord_js_1.GatewayIntentBits.GuildMessageTyping,
        discord_js_1.GatewayIntentBits.DirectMessages,
        discord_js_1.GatewayIntentBits.DirectMessageReactions,
        discord_js_1.GatewayIntentBits.DirectMessageTyping,
        discord_js_1.GatewayIntentBits.MessageContent,
        discord_js_1.GatewayIntentBits.GuildScheduledEvents,
        discord_js_1.GatewayIntentBits.AutoModerationConfiguration,
        discord_js_1.GatewayIntentBits.AutoModerationExecution,
        discord_js_1.GatewayIntentBits.DirectMessagePolls,
        discord_js_1.GatewayIntentBits.GuildMessagePolls,
        discord_js_1.GatewayIntentBits.GuildModeration,
        discord_js_1.GatewayIntentBits.GuildVoiceStates,
    ],
    partials: [discord_js_1.Partials.User, discord_js_1.Partials.Channel, discord_js_1.Partials.GuildMember, discord_js_1.Partials.Message, discord_js_1.Partials.Reaction, discord_js_1.Partials.GuildScheduledEvent, discord_js_1.Partials.ThreadMember],
});
client.login(config.bot.token);
var knex = require('knex')(config.database);
client.on('ready', function () {
    console.log('Bot is ready');
    client.user.setPresence({ activities: [{ name: 'MAINTENANCE :/', type: discord_js_1.ActivityType.Custom }], status: 'dnd' });
    TEST();
});
function TEST() {
    return __awaiter(this, void 0, void 0, function () {
        var guild, userId, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    guild = client.guilds.cache.get('1235970684556021890');
                    userId = '643835326485233716';
                    _b = (_a = console).log;
                    return [4 /*yield*/, knex('user_cards')
                            .select('*')
                            .where({ user_id: userId })
                            .distinct('card_id')
                            .catch(function (err) {
                            console.error(err);
                        })];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    return [2 /*return*/];
            }
        });
    });
}
