import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Specials from './pages/special_items';
import BookingPage from './pages/booking_page';
import Footer from './components/footer';
import ConfirmedBooking from './components/confirmation';
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