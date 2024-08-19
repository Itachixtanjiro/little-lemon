
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookingPage from './BookingPage';
import { fetchAPI, submitAPI } from './api';
import { BrowserRouter as Router } from 'react-router-dom';


jest.mock('./api', () => ({
  fetchAPI: jest.fn(),
  submitAPI: jest.fn()
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}));

describe('BookingPage', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useNavigate.mockImplementation(() => mockNavigate);
  });

  test('renders BookingPage component', () => {
    fetchAPI.mockResolvedValue(['10:00 AM', '11:00 AM', '12:00 PM']);

    render(
      <Router>
        <BookingPage />
      </Router>
    );

    expect(screen.getByText(/reserve a table at little lemon/i)).toBeInTheDocument();
    expect(screen.getByText(/we are excited to have you dine with us!/i)).toBeInTheDocument();
  });

  test('fetches available times on mount', async () => {
    fetchAPI.mockResolvedValue(['10:00 AM', '11:00 AM', '12:00 PM']);

    render(
      <Router>
        <BookingPage />
      </Router>
    );

    await waitFor(() => expect(fetchAPI).toHaveBeenCalled());
    await waitFor(() => expect(screen.getByLabelText(/choose time/i)).toBeInTheDocument());
  });

  test('submits form data successfully and navigates to confirmation page', async () => {
    fetchAPI.mockResolvedValue(['10:00 AM', '11:00 AM']);
    submitAPI.mockResolvedValue(true);

    render(
      <Router>
        <BookingPage />
      </Router>
    );


    fireEvent.change(screen.getByLabelText(/enter your name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/select the reservation date/i), { target: { value: '2024-08-20' } });
    fireEvent.change(screen.getByLabelText(/select the reservation time/i), { target: { value: '10:00 AM' } });
    fireEvent.change(screen.getByLabelText(/enter the number of guests/i), { target: { value: '4' } });
    fireEvent.change(screen.getByLabelText(/select the occasion/i), { target: { value: 'Anniversary' } });


    fireEvent.click(screen.getByRole('button', { name: /make your reservation/i }));

    await waitFor(() => expect(submitAPI).toHaveBeenCalledWith({
      name: 'John Doe',
      date: '2024-08-20',
      time: '10:00 AM',
      guests: 4,
      occasion: 'Anniversary'
    }));
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/confirmed'));
  });

  test('shows alert on form submission failure', async () => {
    fetchAPI.mockResolvedValue(['10:00 AM', '11:00 AM']);
    submitAPI.mockResolvedValue(false);
    window.alert = jest.fn();

    render(
      <Router>
        <BookingPage />
      </Router>
    );


    fireEvent.change(screen.getByLabelText(/enter your name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/select the reservation date/i), { target: { value: '2024-08-20' } });
    fireEvent.change(screen.getByLabelText(/select the reservation time/i), { target: { value: '10:00 AM' } });
    fireEvent.change(screen.getByLabelText(/enter the number of guests/i), { target: { value: '4' } });
    fireEvent.change(screen.getByLabelText(/select the occasion/i), { target: { value: 'Anniversary' } });

    fireEvent.click(screen.getByRole('button', { name: /make your reservation/i }));

    await waitFor(() => expect(window.alert).toHaveBeenCalledWith('Reservation failed.'));
  });
});