import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Chat from '../../components/Chat';

describe('Chat', () => {
  it('renders the Chat component', () => {
    const { getByText } = render(<Chat />);
    const chatTitle = getByText(/Chat/i);
    expect(chatTitle).toBeInTheDocument();
  });

  it('renders the chat messages', () => {
    const messages = ['Hello, world!', 'This is a test message.'];
    const { getByTestId } = render(<Chat messages={messages} />);
    const chatMessages = getByTestId('chat-messages');
    expect(chatMessages).toHaveLength(messages.length);
  });

  it('allows users to send messages', () => {
    const { getByLabelText, getByTestId } = render(<Chat />);
    const chatInput = getByLabelText(/Send a message/i);
    const chatMessages = getByTestId('chat-messages');
    fireEvent.change(chatInput, { target: { value: 'Hello, test!' } });
    fireEvent.submit(chatInput);
    expect(chatMessages.children).toHaveLength(1);
  });
});
