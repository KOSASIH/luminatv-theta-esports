import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Primus } from 'primus';
import io from 'socket.io-client';

const Chat = () => {
  const { chatId } = useParams();
  const [primus, setPrimus] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    const primus = new Primus('https://api.luminatv.com', {
      transformer: 'websockets',
      transport: io,
    });

    setPrimus(primus);

    primus.on('connection', () => {
      primus.write({
        action: 'join',
        chatId,
      });
    });

    primus.on('data', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      primus.end();
    };
  }, [chatId]);

  const sendMessage = () => {
    primus.write({
      action: 'sendMessage',
      chatId,
      message: messageInput,
    });

    setMessageInput('');
  };

  return (
    <div>
      <h1>Chat</h1>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            <strong>{message.username}:</strong> {message.text}
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            sendMessage();
          }
        }}
      />
    </div>
  );
};

export default Chat;
