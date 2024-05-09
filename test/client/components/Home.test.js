import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from '../../components/Home';

describe('Home', () => {
  it('renders the home page with correct text', () => {
    render(<Home />);
    const homeText = screen.getByText(/Welcome to Luminatv Theta Esports/i);
    expect(homeText).toBeInTheDocument();
  });

  it('renders the latest news section', () => {
    render(<Home />);
    const latestNewsTitle = screen.getByText(/Latest News/i);
    expect(latestNewsTitle).toBeInTheDocument();
  });

  it('renders the featured tournaments section', () => {
    render(<Home />);
    const featuredTournamentsTitle = screen.getByText(/Featured Tournaments/i);
    expect(featuredTournamentsTitle).toBeInTheDocument();
  });

  it('renders the upcoming events section', () => {
    render(<Home />);
    const upcomingEventsTitle = screen.getByText(/Upcoming Events/i);
    expect(upcomingEventsTitle).toBeInTheDocument();
  });

  it('renders the social media links section', () => {
    render(<Home />);
    const socialMediaLinks = screen.getAllByRole('link', { name: /Follow us on/i });
    expect(socialMediaLinks.length).toBeGreaterThan(0);
  });

  // Add more test cases as needed
});
