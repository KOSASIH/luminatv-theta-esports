import React, { useState, useEffect } from 'eact';
import { useSelector, useDispatch } from 'edux-react';
import { chatActions } from '../store/chatSlice';
import { socket } from '../socket';

const Chat = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const chatId = useSelector((state) => state.chat.chatId);

  useEffect(() => {
    const handleConnect = () => {
      socket.emit('join-chat', chatId);
    };

    const handleReceiveMessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    const handleDisconnect = () => {
      setError('Disconnected from chat');
    };

    socket.on('connect', handleConnect);
    socket.on('receive-message', handleReceiveMessage);
    socket.on('disconnect', handleDisconnect);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('receive-message', handleReceiveMessage);
      socket.off('disconnect', handleDisconnect);
    };
  }, [chatId]);

  const handleSendMessage = async () => {
    if (!input.trim()) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chatId,
          text: input,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      setMessages((prevMessages) => [...prevMessages, data]);
      setInput('');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            <strong>{message.author}:</strong> {message.text}
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSendMessage();
          }
        }}
      />
      <button onClick={handleSendMessage} disabled={isLoading}>
        Send Message
      </button>
    </div>
  );
};

export default Chat;
