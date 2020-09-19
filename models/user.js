const mongoose = require("mongoose");

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
        // regex link for debugging - https://regex101.com/r/il9tko/1
        const pattern = /^(http:\/\/|https:\/\/)(www.)?[a-z0-9.\-/]+#?$/igm;
        return pattern.test(v);
      },
    },
  },
});

module.exports = mongoose.model('user', userSchema);
