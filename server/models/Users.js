const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  habit: { type: String, required: true },
  date: { type: Date, default: Date.now },
  done: { type: Boolean, default: false }
});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;
