const router = require('express').Router();
const path = require('path');
const fs = require('fs');

router.get('/', (req, res) => {
  const filePath = path.join(__dirname, '..', 'data', 'users.json');
  fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      res.status(404).json({ message: 'Requested resource not found' });
      console.log(err);
      return;
    }
    const users = JSON.parse(data);
    res.send(users);
  });
});

router.get('/:id', (req, res) => {
  const filePath = path.join(__dirname, '..', 'data', 'users.json');
  fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      res.status(404).json({ message: 'Requested resource not found' });
      console.log(err);
      return;
    }
    const users = JSON.parse(data);
    const user = users.filter((item) => item._id === req.params.id)[0];
    if (user) {
      res.send(user);
    } else {
      res.status(404).json({ message: 'User ID not found' });
    }
  });
});

module.exports = router;
