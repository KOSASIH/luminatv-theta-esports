// ChatController.test.js
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ChatController from '../../components/ChatController';

describe('ChatController', () => {
  it('renders the chat controller component with correct text', () => {
    const { getByText } = render(<ChatController />);
    const chatControllerText = getByText(/Chat Controller/i);
    expect(chatControllerText).toBeInTheDocument();
  });

  it('renders the chat title', () => {
    const { getByText } = render(<ChatController title="Chat" />);
    const chatTitle = getByText(/Chat/i);
    expect(chatTitle).toBeInTheDocument();
  });

  it('renders the chat messages', () => {
    const { getByTestId } = render(<ChatController title="Chat" messages={['Hello, world!', 'This is a test message.']} />);
    const chatMessages = getByTestId('chat-messages');
    expect(chatMessages).toBeInTheDocument();
  });

  it('allows users to send messages', () => {
    const { getByLabelText, getByTestId } = render(<ChatController title="Chat" messages={['Hello, world!', 'This is a test message.']} />);
    const chatInput = getByLabelText(/Send a message/i);
    const chatMessages = getByTestId('chat-messages');
    fireEvent.change(chatInput, { target: { value: 'Hello, test!' } });
    fireEvent.submit(chatInput);
    expect(chatMessages.children.length).toBeGreaterThan(2);
  });

  // Add more test cases as needed
});
