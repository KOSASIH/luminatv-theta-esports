// StreamController.test.js
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StreamController from '../../components/StreamController';

describe('StreamController', () => {
  it('renders the stream controller component with correct text', () => {
    const { getByText } = render(<StreamController />);
    const streamControllerText = getByText(/Stream Controller/i);
    expect(streamControllerText).toBeInTheDocument();
  });

  it('renders the stream title', () => {
    const { getByText } = render(<StreamController title="Live Stream" />);
    const streamTitle = getByText(/Live Stream/i);
    expect(streamTitle).toBeInTheDocument();
  });

  it('renders the stream description', () => {
    const { getByText } = render(<StreamController title="Live Stream" description="Join us for a live stream of our latest product launch." />);
    const streamDescription = getByText(/Join us for a live stream of our latest product launch./i);
    expect(streamDescription).toBeInTheDocument();
  });

  it('renders the stream schedule', () => {
    const { getByTestId } = render(<StreamController title="Live Stream" description="Join us for a live stream of our latest product launch." schedule="Today at 3pm ET" />);
    const streamSchedule = getByTestId('stream-schedule');
    expect(streamSchedule).toBeInTheDocument();
  });

  it('renders the stream sponsors', () => {
    const { getByTestId } = render(<StreamController title="Live Stream" description="Join us for a live stream of our latest product launch." schedule="Today at 3pm ET" sponsors="Acme Corp, Corp Inc" />);
    const streamSponsors = getByTestId('stream-sponsors');
    expect(streamSponsors).toBeInTheDocument();
  });

  // Add more test cases as needed
});
