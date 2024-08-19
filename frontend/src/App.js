import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Specials from './Specials';
import BookingPage from './BookingPage';
import Footer from './Footer';
import ConfirmedBooking from './ConfirmedBooking';
import './App.css';

function App() {
  return (
    <div className="app-container">
    <Router>
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Specials />} />
          <Route path="/reserve" element={<BookingPage />} />
          <Route path="/confirmed" element={<ConfirmedBooking />} />
        </Routes>
        </div>
      <Footer />
    </Router>
    </div>
  );
}

export default App;