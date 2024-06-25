const { glob } = require("glob");
const { promisify } = require("util");
const Logger = require("../Logger");
const pGlob = promisify(glob);

module.exports = async (client) => {
  (await pGlob(`./selects/*/*.js`)).map(
    async (smFile) => {
      const sm = require(smFile.replace(".", process.cwd()));
      if (!sm.name) return Logger.warn(`Nom Non Definie\nFile: ${smFile}`);
      client.selects.set(sm.name, sm);
    }
  );
};
