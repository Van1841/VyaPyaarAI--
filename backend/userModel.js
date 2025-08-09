// mongoose lib to interact with mongoDB 

const mongoose = require('mongoose');

// created a schema for user data
// which includes username, password, and email fields
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;



//  note mongo db ka link is in server.js line ok?
