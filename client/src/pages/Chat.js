import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import io from 'socket.io-client';
import queryString from 'query-string';
import BOT from '../assets/bot.png';
import { Button } from '../components/Button/Button.styles';

const socket = io.connect('http://localhost:5000');

export const Chat = ({ location }) => {
  const authContext = useContext(AuthContext);

  const { user, loadUser } = authContext;
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const { username, room } = queryString.parse(location.search);
    setRoom(room);

    loadUser();

    if (user) {
      // Join chatroom
      socket.emit('joinRoom', { id: user._id, name: username, room });

      const fetchData = async (room) => {
        const res = await axios.get(`/api/chats/${room}`);
        const data = res.data;
        setMessages(data);
      };
      fetchData(room);

      const chatMessages = document.getElementById('chat-messages');
      setTimeout(() => {
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }, 100);
    }

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    socket.on('roomUsers', ({ room, users }) => {
      setRoom(room);
      setUsers(users);
    });
  }, [users]);

  useEffect(() => {
    socket.on('message', (msg) => {
      setMessages([...messages, msg]);
    });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    socket.emit('chatMessage', { id: user._id, message });
    setMessage('');
    e.target.children.message.focus();
    const chatMessages = document.getElementById('chat-messages');
    setTimeout(() => {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 100);
  };

  const handleDisconnect = () => {
    socket.emit('removeRoomUser', user._id);
    socket.disconnect();
    window.location.href = '/';
  };

  return (
    <div className='chat-container'>
      <main className='chat-main'>
        <div className='chat-sidebar'>
          <Button style={{ marginBottom: '2rem' }} onClick={handleDisconnect}>
            Leave Room
          </Button>
          <h3>
            <i className='fas fa-comments'></i> Room Name:
          </h3>
          <h2 id='room-name'>{room}</h2>
          <h3>
            <i className='fas fa-users'></i> Users
          </h3>
          <ul id='users'>
            {users.map((user) => {
              return <li key={user._id}>{user.name}</li>;
            })}
          </ul>
        </div>
        <div className='chat-messages' id='chat-messages'>
          {messages.map((msg, index) => {
            return (
              <div
                className={`message ${msg.user === user._id ? 'me' : ''}`}
                key={index}
              >
                <div className='image-container'>
                  <img src={msg.avatar ? msg.avatar : BOT} alt={msg.name} />
                </div>
                <div className='chats-container'>
                  <p className='meta'>
                    {msg.name} <span>{msg.time}</span>
                  </p>
                  <p className='text'>{msg.message}</p>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <div className='chat-form-container'>
        <form id='chat-form' onSubmit={handleSubmit}>
          <input
            id='message'
            type='text'
            placeholder='Enter Message'
            required
            name='message'
            autoComplete='off'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className='buttons' style={{ width: '10rem' }}>
            <Button>
              <i className='fas fa-paper-plane'></i> Send
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
