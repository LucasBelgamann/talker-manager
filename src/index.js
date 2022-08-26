const express = require('express');
const bodyParser = require('body-parser');
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
  const talker = JSON.parse(await fs.readFile(talkerJson));
  if (talker.length === 0) {
    return res.status(200).json(talker);
  } 
    return res.status(200).json([]);
});

app.listen(PORT, () => {
  console.log('Online');
});

// a verdade é essa, aeh!
