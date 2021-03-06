const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const connectDB = require('./db/mongoose');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

const BOT_NAME = 'Chat Chord BOT';

// Connect to MONGO DB
connectDB();

app.use(cors());
app.use(express.json());

server.listen(process.env.PORT, () =>
  console.log(`Server listening to port ${process.env.PORT}`)
);
