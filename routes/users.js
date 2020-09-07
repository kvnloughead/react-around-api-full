const router = require('express').Router();
const path = require('path');
const fs = require('fs');

router.get('/', (req, res) => {
  const filePath = path.join(__dirname, '..', 'data', 'users.json');
  fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const users = JSON.parse(data);
    res.send(users);
  });
});

module.exports = router;
