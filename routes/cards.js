const router = require('express').Router();
// const path = require('path');
// const fs = require('fs');

const { createCard, getCards, deleteCardById } = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:id', deleteCardById);

// router.get('/', (req, res) => {
//   const filePath = path.join(__dirname, '..', 'data', 'cards.json');
//   fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
//     if (err) {
//       res.status(500).json({ message: 'Requested resource not found' });
//       console.log(err);
//       return;
//     }
//     const cards = JSON.parse(data);
//     res.send(cards);
//   });
// });

module.exports = router;
