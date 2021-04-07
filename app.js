const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const {
  celebrate, Joi, errors, isCelebrateError,
} = require('celebrate');
const cors = require('cors');

const { requestLogger, errorLogger } = require('./middleware/logger');
const users = require('./routes/users.js');
const cards = require('./routes/cards.js');
const { login, createUser } = require('./controllers/users');
const auth = require('./middleware/auth');
const BadRequestError = require('./errors/BadRequestError');

const { PORT = 3000, MONGO_URI } = process.env;
const app = express();

app.use(cors());
app.options('*', cors());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

// mongodb://127.0.0.1:27017/aroundb
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.use('/users', auth, users);
app.use('/cards', auth, cards);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().uri({ scheme: ['http', 'https'] }),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

app.use(express.static(path.join(__dirname, 'public')));

app.use(errorLogger);
app.use((err, req, res, next) => {
  if (isCelebrateError(err)) {
    throw new BadRequestError('Data validation error.  Request cannot be completed.');
  }
  next(err);
});
app.use(errors());

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.log(err);
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'An error has occured on the server' : message });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Requested resource not found' });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`App listening at port ${PORT}`);
});
