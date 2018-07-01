const mongoose = require('mongoose');

const { Schema } = mongoose;

const user = new Schema({
  firstName: String,
  lastName: String,
  phone: String,
  email: String,
  token: String
});
const UserModel = mongoose.model('UserModel', user);

module.exports = UserModel;
