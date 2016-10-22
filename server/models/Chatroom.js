const mongoose = require('mongoose');

const chatRoomSchema = new mongoose.Schema({
  name: { type: String },
  messages: { type: Array },
  createdAt: { type: Date, default: Date.now }
});

const Chatroom = mongoose.model('Chatroom', chatRoomSchema);

module.exports = Chatroom;
