const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const users = require('./routes/users.js');
const cards = require('./routes/cards.js');

const { login, createUser } = require('./controllers/users');
const auth = require('./middleware/auth');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/aroundb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use('/users', auth, users);
app.use('/cards', auth, cards);
app.post('/signin', login);
app.post('/signup', createUser);

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res) => {
  res.status(404).json({ message: 'Requested resource not found' });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
