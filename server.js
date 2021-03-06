const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const connectDB = require('./db/mongoose');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

const io = socketIO(server, {
  cors: {
    origin: process.env.CLIENT,
    method: ['GET', 'POST'],
  },
});
const BOT_NAME = 'Chat Chord BOT';

// Connect to MONGO DB
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./router/auth'));
app.use('/api/users', require('./router/users'));
app.use('/api/chats', require('./router/chat'));

io.on('connection', (socket) => {
  socket.on('joinRoom', async ({ id, name, room }) => {
    const user = new RoomUser({
      loginID: id,
      name,
      room,
    });
    await user.save();

    socket.join(room);

    // Welcome current user
    socket.emit('message', botMessage(botName, 'Welcome to ChatCord!'));

    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit('message', botMessage(botName, `${user.name} has joined the chat`));

    // Send users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: await RoomUser.find({ room }),
    });
  });

  // Listen for chatMessage
  socket.on('chatMessage', async ({ id, message }) => {
    const user = await RoomUser.findOne({ loginID: id });
    io.to(user.room).emit(
      'message',
      await formatMessage(id, user.name, message, user.room)
    );
  });

  socket.on('removeRoomUser', async (id) => {
    const user = await RoomUser.findOneAndDelete({ loginID: id });

    if (user) {
      io.to(user.room).emit(
        'message',
        botMessage(botName, `${user.name} has left the chat`)
      );

      // Send users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: await RoomUser.find({ room: user.room }),
      });
    }
  });

  // Runs when client disconnects
  socket.on('disconnect', async () => {
    console.log('disconnected');
  });
});

server.listen(process.env.PORT, () =>
  console.log(`Server listening to port ${process.env.PORT}`)
);
