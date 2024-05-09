// Poll.test.js
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Poll from '../../components/Poll';

describe('Poll', () => {
  it('renders the poll component with correct text', () => {
    const { getByText } = render(<Poll />);
    const pollText = getByText(/Poll/i);
    expect(pollText).toBeInTheDocument();
  });

  it('renders the poll question', () => {
    const { getByText } = render(<Poll question="What is your favorite color?" />);
    const pollQuestion = getByText(/What is your favorite color?/i);
    expect(pollQuestion).toBeInTheDocument();
  });

  it('renders the poll options', () => {
    const { getAllByRole } = render(
      <Poll question="What is your favorite color?">
        <option value="red">Red</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
      </Poll>
    );
    const pollOptions = getAllByRole('option');
    expect(pollOptions.length).toBeGreaterThan(0);
  });

  it('allows users to select a poll option', () => {
    const { getByRole } = render(
      <Poll question="What is your favorite color?">
        <option value="red">Red</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
      </Poll>
    );
    const redOption = getByRole('option', { name: /Red/i });
    fireEvent.click(redOption);
    // Add code to check that the red option was selected
  });

  // Add more test cases as needed
});
