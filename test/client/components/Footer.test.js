import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Footer from '../../components/Footer';

describe('Footer', () => {
  it('renders the footer with correct text', () => {
    const { getByText } = render(<Footer />);
    const footerText = getByText(/Copyright © 2023 Luminatv Theta Esports/i);
    expect(footerText).toBeInTheDocument();
  });

  it('navigates to the about page when the about button is clicked', () => {
    const { getByText } = render(<Footer />);
    const aboutButton = getByText(/About/i);
    fireEvent.click(aboutButton);
    // Add code to check that the about page was navigated to
  });

  it('navigates to the contact page when the contact button is clicked', () => {
    const { getByText } = render(<Footer />);
    const contactButton = getByText(/Contact/i);
    fireEvent.click(contactButton);
    // Add code to check that the contact page was navigated to
  });

  // Add more test cases as needed
});
