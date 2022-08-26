const fs = require('fs').promises;
const { join } = require('path');

const talkerJson = './talker.json';

const readFile = async () => {
    try {
      const talker = await fs.readFile(join(__dirname, talkerJson), 'utf-8');
      return JSON.parse(talker);
    } catch (error) {
      return [];
    }
  };

  const getById = async (id) => {
  const json = await readFile();
  return json
    .filter((talke) => talke.id === id);
  };

module.exports = {
    readFile,
    getById,
};