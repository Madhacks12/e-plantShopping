import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

function CartItem({ onContinueShopping, onPlantsClick, onAboutUsClick }) {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      const itemCost = parseFloat(item.cost.substring(1));
      return total + (itemCost * item.quantity);
    }, 0).toFixed(2);
  };

  const calculateTotalCost = (item) => {
    const itemCost = parseFloat(item.cost.substring(1));
    return (itemCost * item.quantity).toFixed(2);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({
      name: item.name,
      quantity: item.quantity + 1
    }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({
        name: item.name,
        quantity: item.quantity - 1
      }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping();
  };

  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div>
      <div className="navbar">
        <div className="luxury-navbar">
          <div className="navbar-brand" onClick={onPlantsClick}>
            <img 
              src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" 
              alt="Paradise Nursery Logo" 
              className="navbar-logo"
            />
            <span className="navbar-title">Paradise Nursery</span>
          </div>
          <div className="navbar-links">
            <a href="#" onClick={onPlantsClick}>Plants</a>
            <a href="#" onClick={onAboutUsClick}>About Us</a>
          </div>
          <div className="navbar-cart">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
          </div>
        </div>
      </div>

      <div className="cart-container">
        <h2 className="cart-title">Total Cart Amount: ${calculateTotalAmount()}</h2>
        
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <button onClick={handleContinueShopping} className="continue-shopping-button">
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item, index) => (
                <div key={index} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <p className="cart-item-cost">Unit Price: {item.cost}</p>
                    <p className="cart-item-subtotal">Subtotal: ${calculateTotalCost(item)}</p>
                    
                    <div className="quantity-controls">
                      <button 
                        onClick={() => handleDecrement(item)}
                        className="quantity-button"
                      >
                        -
                      </button>
                      <span className="quantity-display">{item.quantity}</span>
                      <button 
                        onClick={() => handleIncrement(item)}
                        className="quantity-button"
                      >
                        +
                      </button>
                      <button 
                        onClick={() => handleRemove(item)}
                        className="delete-button"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="cart-total">
                <h3>Total Items: {totalItems}</h3>
                <h3>Total Cost: ${calculateTotalAmount()}</h3>
              </div>
              <div className="cart-actions">
                <button onClick={handleContinueShopping} className="continue-shopping-button">
                  Continue Shopping
                </button>
                <button onClick={handleCheckoutShopping} className="checkout-button">
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartItem;
