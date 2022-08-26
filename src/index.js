const express = require('express');
const bodyParser = require('body-parser');
const talker = require('./talker');

const validationLogin = require('./middlewares/login');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const json = await talker.readFile();
  res.status(200).json(json);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const person = await talker.getById(Number(id));
  if (person.length === 0) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(person[0]);
});

app.post('/login', validationLogin, async (req, res) => {
  const { email } = req.body;
  const { password } = req.body;
  const token = talker.generateToken();
  res.status(200).json({ email, password, token });
});

app.listen(PORT, () => {
  console.log('Online');
});

// a verdade é essa, aeh!
