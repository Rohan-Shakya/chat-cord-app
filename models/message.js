const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  room: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
