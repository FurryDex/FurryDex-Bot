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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var fs = require('node:fs');
var process = require('node:process');
var yaml = require('js-yaml');
var client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMembers,
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
var Logger_1 = __importDefault(require("./utils/Logger"));
try {
    client.config = yaml.load(fs.readFileSync('./config/config.yaml', 'utf8'));
}
catch (e) {
    console.error('Config file does not exist !', e);
}
var debug = client.config.dev.debug;
if (!client.config.bot.shard && client.config.bot.api.enable)
    require('./api/server');
var isXMinutesPassed = require('./utils/functions/spawn').isXMinutesPassed;
['EventUtil', 'ButtonUtil', 'ModalUtil', 'SelectMenuUtil'].forEach(function (handler) {
    require("./utils/handlers/".concat(handler))(client);
});
client.locales = {};
function locales() {
    return __awaiter(this, void 0, void 0, function () {
        var response, _a, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 6, , 7]);
                    if (!client.config.third_party.crowdin.Crowdin_to_Discord_API) return [3 /*break*/, 4];
                    return [4 /*yield*/, fetch(client.config.third_party.crowdin.Crowdin_to_Discord_API)];
                case 1:
                    response = _b.sent();
                    if (!response) return [3 /*break*/, 3];
                    _a = client;
                    return [4 /*yield*/, response.json()];
                case 2:
                    _a.locales = _b.sent();
                    fs.writeFileSync('./locales.json', JSON.stringify(client.locales));
                    _b.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    no_locales('No locales API');
                    _b.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    err_1 = _b.sent();
                    no_locales(err_1);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function no_locales(err) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            Logger_1.default.warn(null, "Error for Locales modules: ".concat(err));
            if (err == 'No locales API')
                client.locales = require('./src/locales.js');
            else
                try {
                    client.locales = JSON.parse(fs.readFileSync('./locales.json'));
                }
                catch (err) {
                    console.error(err);
                }
            return [2 /*return*/];
        });
    });
}
locales().then(function () {
    require("./utils/handlers/CommandUtil.ts")(client);
});
if (!debug) {
    process.on('exit', function (code) {
        Logger_1.default.error(client, "Bot stopped with code: ".concat(code));
    });
    process.on('uncaughtException', function (err, origin) {
        Logger_1.default.error(client, "".concat('uncaughtException'.toUpperCase(), ": ").concat(err, "\nOrigin: ").concat(String(origin)));
    });
    process.on('unhandledRejection', function (reason, promise) {
        console.log('Unhandled Rejection at:', promise, 'reason:', reason);
        Logger_1.default.error(client, "".concat('unhandledRejection'.toUpperCase(), ": at"), promise, 'reason:', reason);
    });
    process.on('warning', function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return Logger_1.default.warn.apply(Logger_1.default, __spreadArray([null], args, false));
    });
    client.rest.on('rateLimited', function (rateLimited) {
        Logger_1.default.warn(client, "".concat('rateLimited'.toUpperCase(), ": ").concat(rateLimited));
    });
    client.rest.on('invalidRequestWarning', function (invalidRequestWarningData) {
        Logger_1.default.warn(client, "".concat('invalidRequestWarning'.toUpperCase(), ": ").concat(invalidRequestWarningData));
    });
    client.on('warn', function (info) {
        Logger_1.default.warn(client, "".concat('warn'.toUpperCase(), ": ").concat(info));
    });
    client.on('error', function (info) {
        Logger_1.default.error(client, "".concat('error'.toUpperCase(), ": ").concat(info));
    });
    client.on('shardDisconnect', function (event, id) {
        Logger_1.default.shard(client, "".concat('shardDisconnect'.toUpperCase(), " - ID: ").concat(id, ": ").concat(event));
    });
    client.on('shardError', function (event, id) {
        Logger_1.default.error(client, "".concat('shardError'.toUpperCase(), " - ID: ").concat(id, ": ").concat(event));
    });
    client.on('shardReady', function (event, id) {
        Logger_1.default.shard(client, "".concat('shardReady'.toUpperCase(), " - ID: ").concat(id, ": ").concat(event));
    });
    client.on('shardReconnecting', function (id) {
        Logger_1.default.shard(client, "".concat('shardReconnecting'.toUpperCase(), " - ID: ").concat(id));
    });
    client.on('shardResume', function (id, event) {
        Logger_1.default.shard(client, "".concat('shardResume'.toUpperCase(), " - ID: ").concat(id, ": ").concat(event));
    });
}
client.knex = require('knex')(client.config.database);
client.login(client.config.bot.token);
// --------- COG & SPAWN ----------
client.on('messageCreate', function (message) {
    var _a;
    var _b;
    if (message.channel.isDMBased())
        return;
    if (client.config.bot.disable.bot)
        if ((_b = message.guild) === null || _b === void 0 ? void 0 : (_a = _b.members.cache).hasAny.apply(_a, client.config.bot.disable.bot))
            return;
    if (message.author.bot)
        return;
    isXMinutesPassed(message, client).then(function (result) {
        require('./utils/functions/anticheat.js').anticheat_message(client, message, message.author.id, result ? 1 : 0);
    });
});
var callAmount = 0;
process.on('SIGINT', function () {
    if (callAmount < 1) {
        Logger_1.default.succes(client, '✅ - Desactivation du bot ...', 'Veuillez patientez');
        client.destroy();
        setTimeout(function () { return process.exit(0); }, 1000);
    }
    callAmount++;
});
