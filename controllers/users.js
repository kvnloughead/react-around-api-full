const assert = require('assert');
const bcrypt = require('bcrypt');
const User = require('../models/user');

User.on('index', (err) => {
  assert.ifError(err);
});

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Data validation failed:  user cannot be created' });
      } else if (err.name === 'CastError') {
        res.status(404).send({ message: 'User not found.' });
      } else {
        res.status(500).send({ message: 'Internal server error' });
      }
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        res.status(404).send({ message: 'User not found.' });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Data validation failed:  user cannot be created' });
      } else if (err.name === 'CastError') {
        res.status(404).send({ message: 'User not found.' });
      } else {
        res.status(500).send({ message: 'Internal server error' });
      }
    });
};

module.exports.createUser = (req, res) => {
  const
    {
      name, about, avatar, email, password,
    } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      about,
      avatar,
      email,
      name,
      password: hash,
    }))
  // User.create(
  //   {
  //     name, about, avatar, email, password,
  //   },
  // )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Data validation failed:  user cannot be created' });
      } else if (err.name === 'CastError') {
        res.status(404).send({ message: 'User not found.' });
      } else {
        res.status(500).send({ message: 'Internal server error' });
      }
    });
};

module.exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.user._id },
    { $set: { name: req.body.name, about: req.body.about } },
    { new: true, runValidators: true },
  )
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Data validation failed:  user cannot be created' });
      } else if (err.name === 'CastError') {
        res.status(404).send({ message: 'User not found.' });
      } else {
        res.status(500).send({ message: 'Internal server error' });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.user._id },
    { avatar: req.body.avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Data validation failed:  user cannot be created' });
      } else if (err.name === 'CastError') {
        res.status(404).send({ message: 'User not found.' });
      } else {
        res.status(500).send({ message: 'Internal server error' });
      }
    });
};
