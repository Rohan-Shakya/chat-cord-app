const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  loginID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  name: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
});

const RoomUser = mongoose.model('RoomUser', UserSchema);

module.exports = RoomUser;
