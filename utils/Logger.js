const chalk = require("chalk");
const dayjs = require("dayjs");

const format = "{tstamp} {tag} {text}";

function error(content) {
  write(content, "black", "bgRed", "ERROR", true);
}

function warn(content) {
  write(content, "black", "bgYellow", "WARN", false);
}

function typo(content) {
  write(content, "black", "bgCyan", "TYP0", false);
}

function command(content) {
  write(content, "magenta", "bgBlack", "CMD", false);
}

function event(content) {
  write(content, "green", "bgBlack", "EVT", false);
}

function client(content) {
  write(content, "cyan", "bgBlack", "CLIENT", false);
}

function shard(content) {
  write(content, "red", "bgBlack", "SHARD", false);
}

function succes(content) {
  write(content, "black", "bgGreen", "SUCCES", false);
}

function info(content) {
  write(content, "black", "bgBlue", "INFO", false);
}

function write(content, tagColor = "black", bgTagColor, tag, error = false) {
  const timestamp = `[${dayjs().format("DD/MM - HH:mm:ss")}]`;
  const logTag = `[${tag}]`;
  const stream = error ? process.stderr : process.stdout;

  const item = format.replace("{tstamp}", chalk.gray(timestamp)).replace("{tag}", chalk[bgTagColor][tagColor](logTag)).replace("{text}", chalk.white(content));

  stream.write(item + "\n");
}

module.exports = { error, warn, command, event, typo, client, shard, succes, info };
