const express = require('express');
const router = express.Router();
const Message = require('../models/message');

/*
    @route  GET /api/chats/:room
    @desc   Get room chats
    @access Private
*/
router.get('/:room', async (req, res) => {
  const room = req.params.room.toLowerCase();
  try {
    const data = await Message.find({ room });
    res.json(data);
  } catch (err) {
    res.status(400).send('Server Error');
  }
});

module.exports = router;
