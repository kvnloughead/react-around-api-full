/* eslint-disable consistent-return */
const assert = require('assert');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

User.on('index', (err) => {
  assert.ifError(err);
});

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: '1 Data validation failed:  user cannot be created' });
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
        res.status(400).send({ message: '2 Data validation failed:  user cannot be created' });
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
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      console.log(err)
      if (err.name === 'ValidationError') {
        console.log(err);
        res.status(400).send({ message: '3 Data validation failed:  user cannot be created' });
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
        res.status(400).send({ message: '4 Data validation failed:  user cannot be created' });
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
        res.status(400).send({ message: '5 Data validation failed:  user cannot be created' });
      } else if (err.name === 'CastError') {
        res.status(404).send({ message: 'User not found.' });
      } else {
        res.status(500).send({ message: 'Internal server error' });
      }
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        Promise.reject(new Error('Incorrect password or email'));
      } else {
        return bcrypt.compare(password, user.password);
      }
    })
    .then((matched) => {
      if (!matched) {
        return Promise.reject(new Error('Incorrect password or email'));
      }
      const token = jwt.sign({ _id: req._id }, 'super-strong-secret', { expiresIn: '7d' });
      res.cookie('token', token, { httpOnly: true });
      res.json({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};
