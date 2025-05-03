"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.error = error;
exports.warn = warn;
exports.typo = typo;
exports.command = command;
exports.event = event;
exports.client = client;
exports.shard = shard;
exports.succes = succes;
exports.info = info;
var dayjs_1 = __importDefault(require("dayjs"));
var chalk_1 = __importDefault(require("chalk"));
var format = '{tstamp} {tag} {text}';
function error(client) {
    var content = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        content[_i - 1] = arguments[_i];
    }
    write(client, content.join('\n'), 'black', 'bgRed', 'ERR', true);
}
function warn(client) {
    var content = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        content[_i - 1] = arguments[_i];
    }
    write(client, content.join('\n'), 'black', 'bgYellow', 'WARN', false);
}
function typo(client) {
    var content = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        content[_i - 1] = arguments[_i];
    }
    write(client, content.join('\n'), 'black', 'bgCyan', 'TYP0', false);
}
function command(client) {
    var content = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        content[_i - 1] = arguments[_i];
    }
    write(client, content.join('\n'), 'magenta', 'bgBlack', 'CMD', false);
}
function event(client) {
    var content = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        content[_i - 1] = arguments[_i];
    }
    write(client, content.join('\n'), 'green', 'bgBlack', 'EVT', false);
}
function client(client) {
    var content = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        content[_i - 1] = arguments[_i];
    }
    write(client, content.join('\n'), 'cyan', 'bgBlack', 'CLT', false);
}
function shard(client) {
    var content = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        content[_i - 1] = arguments[_i];
    }
    write(client, content.join('\n'), 'red', 'bgBlack', 'SHRD', false);
}
function succes(client) {
    var content = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        content[_i - 1] = arguments[_i];
    }
    write(client, content.join('\n'), 'black', 'bgGreen', 'SUCCES', false);
}
function info(client) {
    var content = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        content[_i - 1] = arguments[_i];
    }
    write(client, content.join('\n'), 'black', 'bgBlue', 'INFO', false);
}
function write(client, content, tagColor, bgTagColor, tag, error) {
    var _this = this;
    if (tagColor === void 0) { tagColor = 'black'; }
    if (error === void 0) { error = false; }
    var timestamp = "[".concat((0, dayjs_1.default)().format('DD/MM - HH:mm:ss'), "]");
    var logTag = "[".concat(tag, "]");
    var stream = error ? process.stderr : process.stdout;
    var item = format
        .replace('{tstamp}', chalk_1.default.gray(timestamp))
        .replace('{tag}', chalk_1.default[bgTagColor][tagColor](logTag))
        .replace('{text}', chalk_1.default.white(content));
    stream.write(item + '\n');
    var color = bgTagColor.replace('bg', 'light');
    if (color == 'Black' || color == 'lightBlack') {
        color = tagColor;
    }
    if (client && client != null && client != undefined && client.guilds && !error) {
        (function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require('./functions/DiscordLogger')); })];
                case 1: return [2 /*return*/, (_a.sent()).write(client, { category: 'other', channel: client.config.log.thread.bot }, { tag: tag, color: color, description: '', info: [{ name: 'Write in host console', value: 'Yes' }], content: content })];
            }
        }); }); });
    }
    else if (client && client != null && client != undefined && client.guilds && error) {
        (function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require('./functions/DiscordLogger')); })];
                    case 1: return [2 /*return*/, (_a.sent()).write(client, { category: 'other', channel: '1284433362307780658' }, {
                            tag: tag,
                            color: color,
                            description: '',
                            info: [
                                { name: 'Write in host console', value: 'Yes' },
                                { name: 'ERROR', value: content },
                            ],
                            content: 'ERREUR',
                        })];
                }
            });
        }); });
    }
}
exports.default = {
    error: error,
    warn: warn,
    typo: typo,
    command: command,
    event: event,
    client: client,
    shard: shard,
    succes: succes,
    info: info,
    write: write,
};
