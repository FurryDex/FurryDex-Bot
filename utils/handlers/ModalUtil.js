const { glob } = require("glob");
const { promisify } = require("util");
const Logger = require("../Logger");
const pGlob = promisify(glob);

module.exports = async (client) => {
  (await pGlob(`./modals/*/*.js`)).map(async (modalFile) => {
    const modal = require(modalFile.replace(".", process.cwd()));
    if (!modal.name) return Logger.warn(client, `Nom Non Definie\nFile: ${modalFile}`);
    client.modals.set(modal.name, modal);
  });
};
