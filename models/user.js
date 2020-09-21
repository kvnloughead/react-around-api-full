const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        const pattern = /^(http:\/\/|https:\/\/)(www.)?[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]+#?$/igm;
        return pattern.test(v);
      },
    },
  },
});

module.exports = mongoose.model('user', userSchema);
