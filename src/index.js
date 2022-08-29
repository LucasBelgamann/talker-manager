const express = require('express');
const bodyParser = require('body-parser');
const talker = require('./talker');

const validationLogin = require('./middlewares/login');
const {
  validateName,
  validateAge,
  validateTalk,
  validateRate,
  validateWatchedAt,
  validateToken,
} = require('./middlewares/middlewareName');

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
    return res
      .status(404)
      .json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(person[0]);
});

app.post('/login', validationLogin, async (req, res) => {
  const { email } = req.body;
  const { password } = req.body;
  const token = talker.generateToken();
  res.status(200).json({ email, password, token });
});

app.post(
  '/talker',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateRate,
  validateWatchedAt,
  async (req, res) => {
    try {
      const file = await talker.readFile();
      const person = { id: file.length + 1, ...req.body };
      file.push(person);
      await talker.writeTalkerTrybeFile(file);
      return res.status(201).json(person);
    } catch (error) {
      return null;
    }
  },
);

app.put(
  '/talker/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  async (req, res) => {
    const file = await talker.readFile();
    const id = Number(req.params.id);

    const updateTalkker = { id, ...req.body };
    file[id] = updateTalkker;
    await talker.writeTalkerTrybeFile(file);
    return res.status(200).json(file[id]);
  },
);

app.listen(PORT, () => {
  console.log('Online');
});

// a verdade é essa, aeh!
