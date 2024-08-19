import React, { useState, useEffect } from 'react';
import '../component-styles/booking-form.css';
import { fetchAPI } from '../api/api';

function BookingForm({ availableTimes = [], dispatch, onSubmit }) {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [guests, setGuests] = useState(1);
    const [occasion, setOccasion] = useState('Birthday');
    const [touched, setTouched] = useState({
        name: false,
        date: false,
        time: false,
        guests: false
    });
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        if (date) {
            const fetchTimes = async () => {
                const times = await fetchAPI(new Date(date));
                dispatch({ type: 'date_change', times });
            };
            fetchTimes();
        }
    }, [date, dispatch]);

    useEffect(() => {

        const newErrors = {};
        if (touched.name && name.trim() === '') newErrors.name = 'Name is required.';
        if (touched.date && date.trim() === '') newErrors.date = 'Date is required.';
        if (touched.time && time.trim() === '') newErrors.time = 'Time is required.';
        if (touched.guests && (guests <= 0 || guests > 10)) newErrors.guests = 'Number of guests must be between 1 and 10.';

        setErrors(newErrors);
        setIsFormValid(Object.keys(newErrors).length === 0);
    }, [name, date, time, guests, touched]);

    const handleBlur = (field) => {
        setTouched((prev) => ({ ...prev, [field]: true }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = {
            name,
            date,
            time,
            guests,
            occasion
        };
        onSubmit(formData);


        setName('');
        setDate('');
        setTime('');
        setGuests(1);
        setOccasion('Birthday');
        setTouched({
            name: false,
            date: false,
            time: false,
            guests: false
        });
    };

    return (
        <form
            className="reserve-form"
            onSubmit={handleSubmit}
            style={{ display: 'grid', maxWidth: '300px', gap: '20px' }}
            aria-label="Booking Form"
        >
            <label htmlFor="res-name">Name:</label>
            <input
                type="text"
                id="res-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => handleBlur('name')}
                required
                aria-required="true"
                aria-label="Enter your name"
            />
            {touched.name && errors.name && (
                <p className="error-message" aria-live="polite">{errors.name}</p>
            )}

            <label htmlFor="res-date">Choose date:</label>
            <input
                type="date"
                id="res-date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                onBlur={() => handleBlur('date')}
                min={new Date().toISOString().split('T')[0]}
                required
                aria-required="true"
                aria-label="Select the reservation date"
            />
            {touched.date && errors.date && (
                <p className="error-message" aria-live="polite">{errors.date}</p>
            )}

            <label htmlFor="res-time">Choose time:</label>
            <select
                id="res-time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                onBlur={() => handleBlur('time')}
                required
                aria-required="true"
                aria-label="Select the reservation time"
            >
                {availableTimes.length > 0 ? (
                    availableTimes.map((time, index) => (
                        <option key={index} value={time}>
                            {time}
                        </option>
                    ))
                ) : (
                    <option value="">No available times</option>
                )}
            </select>
            {touched.time && errors.time && (
                <p className="error-message" aria-live="polite">{errors.time}</p>
            )}

            <label htmlFor="guests">Number of guests:</label>
            <input
                type="number"
                id="guests"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                onBlur={() => handleBlur('guests')}
                min="1"
                max="10"
                required
                aria-required="true"
                aria-label="Enter the number of guests"
            />
            {touched.guests && errors.guests && (
                <p className="error-message" aria-live="polite">{errors.guests}</p>
            )}

            <label htmlFor="occasion">Occasion:</label>
            <select
                id="occasion"
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                required
                aria-required="true"
                aria-label="Select the occasion"
            >
                <option value="Birthday">Birthday</option>
                <option value="Engagement">Engagement</option>
                <option value="Anniversary">Anniversary</option>
            </select>

            <button
                type="submit"
                className="booking-button"
                disabled={!isFormValid}
                aria-disabled={!isFormValid}
                aria-label="Submit your reservation"
            >
                Make Your Reservation
            </button>
        </form>
    );
}

export default BookingForm;