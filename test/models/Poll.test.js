import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Poll from '../../components/Poll';

describe('Poll', () => {
  it('renders the Poll component', () => {
    const { getByText } = render(<Poll />);
    const pollTitle = getByText(/Poll/i);
    expect(pollTitle).toBeInTheDocument();
  });

  it('renders the poll question and options', () => {
    const question = 'What is your favorite color?';
    const options = ['Red', 'Blue', 'Green'];
    const { getByText } = render(<Poll question={question} options={options} />);
    const pollQuestion = getByText(question);
    const pollOptions = options.map((option) => getByText(option));
    expect(pollQuestion).toBeInTheDocument();
    expect(pollOptions).toHaveLength(options.length);
  });

  it('allows users to vote', () => {
    const question = 'What is your favorite color?';
    const options = ['Red', 'Blue', 'Green'];
    const { getByLabelText, getByText } = render(<Poll question={question} options={options} />);
    const pollOptions = options.map((option) => getByLabelText(option));
    fireEvent.click(pollOptions[0]);
    const pollResults = getByText(/Results/i);
    expect(pollResults).toBeInTheDocument();
  });
});
