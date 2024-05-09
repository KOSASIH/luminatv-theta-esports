// Chat.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Chat from '../../components/Chat';

describe('Chat', () => {
  it('renders the chat component with correct text', () => {
    const { getByText } = render(<Chat />);
    const chatText = getByText(/Chat/i);
    expect(chatText).toBeInTheDocument();
  });

  it('renders the chat input field', () => {
    const { getByLabelText } = render(<Chat />);
    const chatInput = getByLabelText(/Send a message/i);
    expect(chatInput).toBeInTheDocument();
  });

  it('renders the chat messages', () => {
    const { getByTestId } = render(<Chat />);
    const chatMessages = getByTestId('chat-messages');
    expect(chatMessages).toBeInTheDocument();
  });

  it('allows users to send messages', () => {
    const { getByLabelText, getByTestId } = render(<Chat />);
    const chatInput = getByLabelText(/Send a message/i);
    const chatMessages = getByTestId('chat-messages');
    fireEvent.change(chatInput, { target: { value: 'Hello, world!' } });
    fireEvent.submit(chatInput);
    expect(chatMessages.children.length).toBeGreaterThan(0);
  });

  // Add more test cases as needed
});
