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
var Logger_1 = __importDefault(require("../../utils/Logger"));
module.exports = {
    name: 'interactionCreate',
    once: false,
    execute: function (client, interaction) {
        return __awaiter(this, void 0, void 0, function () {
            var cmd, btn, modal, select;
            var _a;
            return __generator(this, function (_b) {
                if (interaction.type === discord_js_1.InteractionType.ApplicationCommand) {
                    cmd = client.commands.get(interaction.commandName);
                    if (!cmd) {
                        Logger_1.default.warn(client, "Command \"".concat(interaction.commandName, "\" dosn't exist"));
                        return [2 /*return*/, interaction.reply({
                                content: "Sorry, this *command* dosn't exit. Er0r: 404",
                                //ephemerel: true,
                            })];
                    }
                    if (cmd.permissions) {
                        if (!((_a = interaction.member) === null || _a === void 0 ? void 0 : _a.permissions.has([cmd.permissions])))
                            return [2 /*return*/, interaction.reply({
                                    content: "You dosn't have the nescessary permission",
                                    flags: discord_js_1.MessageFlags.Ephemeral,
                                })];
                    }
                    if (cmd.ownerOnly) {
                        if (interaction.user.id != client.config.owner)
                            return [2 /*return*/, interaction.reply('You need to be the creator for execute this command.')];
                    }
                    if (cmd.staffOnly) {
                        if (!client.config.staff.includes(interaction.user.id))
                            return [2 /*return*/, interaction.reply('You need to be a staff for execute this command.')];
                    }
                    cmd.runSlash(client, interaction);
                }
                else if (interaction.isButton()) {
                    if (interaction.customId.includes('--'))
                        return [2 /*return*/];
                    btn = client.buttons.get(interaction.customId);
                    if (!btn) {
                        Logger_1.default.warn(client, "Button \"".concat(interaction.customId, "\" dosn't exist"));
                        return [2 /*return*/, interaction.reply({
                                content: "Sorry, this *button* dosn't exit. Er0r: 404",
                                flags: discord_js_1.MessageFlags.Ephemeral,
                            })];
                    }
                    interaction.customId = interaction.customId.replace(/{*}*/g, '');
                    btn.run(client, interaction);
                }
                else if (interaction.type === discord_js_1.InteractionType.ModalSubmit) {
                    modal = client.modals.get(interaction.customId);
                    if (!modal) {
                        Logger_1.default.warn(client, "Modal \"".concat(interaction.customId, "\" dosn't exist"));
                        return [2 /*return*/, interaction.reply({
                                content: "Sorry, this *form* dosn't exit. Er0r: 404",
                                flags: discord_js_1.MessageFlags.Ephemeral,
                            })];
                    }
                    modal.run(client, interaction);
                }
                else if (interaction.isStringSelectMenu()) {
                    select = client.selects.get(interaction.customId);
                    if (!select) {
                        Logger_1.default.warn(client, "Select \"".concat(interaction.customId, "\" dosn't exist"));
                        return [2 /*return*/, interaction.reply({
                                content: "Sorry, this *select menu* dosn't exit. Er0r: 404",
                                flags: discord_js_1.MessageFlags.Ephemeral,
                            })];
                    }
                    select.run(client, interaction);
                }
                return [2 /*return*/];
            });
        });
    },
};
