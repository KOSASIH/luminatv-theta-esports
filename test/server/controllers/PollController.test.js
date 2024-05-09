// PollController.test.js
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PollController from '../../components/PollController';

describe('PollController', () => {
  it('renders the poll controller component with correct text', () => {
    const { getByText } = render(<PollController />);
    const pollControllerText = getByText(/Poll Controller/i);
    expect(pollControllerText).toBeInTheDocument();
  });

  it('renders the poll title', () => {
    const { getByText } = render(<PollController title="Poll" />);
    const pollTitle = getByText(/Poll/i);
    expect(pollTitle).toBeInTheDocument();
  });

  it('renders the poll options', () => {
    const { getAllByRole } = render(
      <PollController title="Poll" options={[{ value: 'red', label: 'Red' }, { value: 'blue', label: 'Blue' }, { value: 'green', label: 'Green' }]} />
    );
    const pollOptions = getAllByRole('option');
    expect(pollOptions.length).toBeGreaterThan(0);
  });

  it('allows users to select a poll option', () => {
    const { getByRole } = render(
      <PollController title="Poll" options={[{ value: 'red', label: 'Red' }, { value: 'blue', label: 'Blue' }, { value: 'green', label: 'Green' }]} />
    );
    const redOption = getByRole('option', { name: /Red/i });
    fireEvent.click(redOption);
    // Add code to check that the red option was selected
  });

  // Add more test cases as needed
});
