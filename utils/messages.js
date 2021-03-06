const moment = require('moment');
const Message = require('../models/message');

const formatMessage = async (id, name, message, room) => {
  const msg = new Message({
    user: id,
    name,
    message,
    avatar: `${process.env.SERVER}/api/users/${id}/avatar`,
    room: room.toLowerCase(),
    time: moment().format('h:mm a'),
  });

  console.log(msg);

  await msg.save();
  return msg;
};

const botMessage = (name, message) => {
  return {
    name,
    message,
    avatar: null,
    time: moment().format('h:mm a'),
  };
};

module.exports = { formatMessage, botMessage };
