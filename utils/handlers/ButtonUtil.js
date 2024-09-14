const { glob } = require("glob");
const { promisify } = require("util");
const Logger = require("../Logger");

const pGlob = promisify(glob);

module.exports = async (client) => {
  (await pGlob(`./buttons/*/*.js`)).map(async (btnFile) => {
    const btn = require(btnFile.replace(".", process.cwd()));
    if (!btn.name) return Logger.warn(client, `\n-----\nERROR: btn: No Name\nFile: ${btnFile}\n-----\n`);
    client.buttons.set(btn.name, btn);
  });
};
