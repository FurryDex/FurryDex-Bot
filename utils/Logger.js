const chalk = require("chalk");
const dayjs = require("dayjs");

const format = "{tstamp} {tag} {text}";

function error(...content) {
  content = content.join(`\n`);
  write(content, "black", "bgRed", "ERROR", true);
}

function warn(...content) {
  content = content.join(`\n`);
  write(content, "black", "bgYellow", "WARN", false);
}

function typo(...content) {
  content = content.join(`\n`);
  write(content, "black", "bgCyan", "TYP0", false);
}

function command(...content) {
  content = content.join(`\n`);
  write(content, "magenta", "bgBlack", "CMD", false);
}

function event(...content) {
  content = content.join(`\n`);
  write(content, "green", "bgBlack", "EVT", false);
}

function client(...content) {
  content = content.join(`\n`);
  write(content, "cyan", "bgBlack", "CLIENT", false);
}

function shard(...content) {
  content = content.join(`\n`);
  write(content, "red", "bgBlack", "SHARD", false);
}

function succes(...content) {
  content = content.join(`\n`);
  write(content, "black", "bgGreen", "SUCCES", false);
}

function info(...content) {
  content = content.join(`\n`);
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
