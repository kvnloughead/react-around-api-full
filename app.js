const express = require('express');
const path = require('path');
const users = require('./routes/users.js');
const cards = require('./routes/cards.js');

const { PORT = 3000 } = process.env;
const app = express();

app.use('/users', users);
app.use('/cards', cards);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
