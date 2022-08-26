const express = require('express');
const bodyParser = require('body-parser');
const { join } = require('path');
const fs = require('fs').promises;

const talkerJson = './talker.json';

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const talker = await fs.readFile(join(__dirname, talkerJson), 'utf-8');
  try {
    const json = JSON.parse(talker);
    return res.status(200).json(json);
  } catch (error) {
    return [];
  }
});

app.listen(PORT, () => {
  console.log('Online');
});

// a verdade é essa, aeh!
