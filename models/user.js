const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Kevin Loughead',
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Web Developer',
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        const pattern = /^(http:\/\/|https:\/\/)(www.)?[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]+\.[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]{2,}#?$/igm;
        return pattern.test(v);
      },
    },
    default: 'https://thelinksroadanimalclinic.com/files/2014/02/ricky-800x534-266x300.jpg',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'That is not a valid email address',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
