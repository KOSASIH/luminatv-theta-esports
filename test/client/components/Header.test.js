import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from '../../components/Header';

describe('Header', () => {
  it('renders the header with correct text', () => {
    const { getByText } = render(<Header />);
    const headerText = getByText(/Luminatv Theta Esports/i);
    expect(headerText).toBeInTheDocument();
  });

  it('navigates to the home page when the logo is clicked', () => {
    const { getByAltText } = render(<Header />);
    const logo = getByAltText(/Luminatv Theta Esports logo/i);
    fireEvent.click(logo);
    // Add code to check that the home page was navigated to
  });

  it('navigates to the live stream page when the live stream button is clicked', () => {
    const { getByText } = render(<Header />);
    const liveStreamButton = getByText(/Live Stream/i);
    fireEvent.click(liveStreamButton);
    // Add code to check that the live stream page was navigated to
  });

  // Add more test cases as needed
});
