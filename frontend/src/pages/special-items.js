import React from 'react';
import '../component-styles/special-item.css';
import { Link } from 'react-router-dom';
import restauranfood from 'frontend/assets/restauranfood.jpg';
import greek_salad from 'frontend/assets/greek salad.jpg';
import bruchetta from 'frontend/assets/bruchetta.svg';
import lemon_dessert from 'frontend/assets/lemon dessert.jpg';

function Specials() {
    return (
        <>
            <div className="grid-container specials">
                <div className="column">
                    <h1 className="h1" style={{ color: 'var(--primary-yellow)' }}>Little Lemon</h1>
                    <h2>Chicago</h2>
                    <p className="lead-text">We are a family-owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>
                    <Link to="/reserve">
                        <button className="highlight">Reserve a Table</button>
                    </Link>
                </div>
                <div className="column column-2">
                    <img src={restauranfood} alt='Restaurant food' className='logo-img' />
                </div>
            </div>

            <section className='weekly-specials'>
                <div className="grid-container">
                    <div className="column column-1">
                        <h2 className="section-title">This week's specials!</h2>
                    </div>
                    <div className="column column-2">
                        <button className="highlight" style={{ marginTop: 8 }} >Online Menu</button>
                    </div>
                </div>
                <div className='specials-grid'>
                    <div className='special'>
                        <img src={greek_salad} alt='Greek Salad' className='logo-img' />
                        <div className="price-delivery">
                            <p className="card-title">Greek Salad</p>
                            <p className="price">$12.99</p>
                        </div>
                        <p>This famous Greek salad of crispy lettuce, peppers, olives, and  Chicago-style feta cheese, garnished with crunchy garlic and rosemary croutons.</p>
                        <p className="delivery">Order a delivery &#x1F6F4;</p>
                    </div>
                    <div className='special'>
                        <img src={bruchetta} alt='Bruschetta' className='logo-img' />
                        <div className="price-delivery">
                            <p className="card-title">Bruschetta</p>
                            <p className="price">$5.99</p>
                        </div>
                        <p>Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.</p>
                        <p className="delivery">Order a delivery &#x1F6F4;</p>

                    </div>
                    <div className='special'>
                        <img src={lemon_dessert} alt='Lemon Dessert' style={{ height: 200 }} className='logo-img' />
                        <div className="price-delivery">
                            <p className="card-title">Lemon Dessert</p>
                            <p className="price">$5.00</p>
                        </div>
                        <p>This comes straight from grandma’s recipe book, every last ingredient has been sourced and is as authentic as can be imagined.</p>
                        <p className="delivery">Order a delivery &#x1F6F4;</p>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Specials;