import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LiveStream from '../../components/LiveStream';

describe('LiveStream', () => {
  it('renders the live stream page with correct text', () => {
    render(<LiveStream />);
    const liveStreamText = screen.getByText(/Live Stream/i);
    expect(liveStreamText).toBeInTheDocument();
  });

  it('renders the live stream video player', () => {
    render(<LiveStream />);
    const videoPlayer = screen.getByTestId('video-player');
    expect(videoPlayer).toBeInTheDocument();
  });

  it('renders the live stream chat', () => {
    render(<LiveStream />);
    const chat = screen.getByTestId('chat');
    expect(chat).toBeInTheDocument();
  });

  it('renders the live stream schedule', () => {
    render(<LiveStream />);
    const schedule = screen.getByTestId('schedule');
    expect(schedule).toBeInTheDocument();
  });

  it('renders the live stream sponsors', () => {
    render(<LiveStream />);
    const sponsors = screen.getByTestId('sponsors');
    expect(sponsors).toBeInTheDocument();
  });

  // Add more test cases as needed
});
