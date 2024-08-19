import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';


const renderWithRouter = (ui) => {
  return render(<Router>{ui}</Router>);
};

test('renders Header and Footer', () => {
  renderWithRouter(<App />);


  expect(screen.getByRole('banner')).toBeInTheDocument();
  expect(screen.getByRole('contentinfo')).toBeInTheDocument();
});

test('renders Specials page by default', () => {
  renderWithRouter(<App />);


  expect(screen.getByText(/Specials Page/i)).toBeInTheDocument();
});

test('navigates to BookingPage when clicking on the reserve link', () => {
  renderWithRouter(<App />);


  fireEvent.click(screen.getByText(/Reserve/i));


  expect(screen.getByText(/Booking Page/i)).toBeInTheDocument();
});

test('navigates to ConfirmedBooking page when booking is confirmed', () => {
  renderWithRouter(<App />);


  fireEvent.click(screen.getByText(/Confirmed/i));


  expect(screen.getByText(/Booking Confirmed/i)).toBeInTheDocument();
});