import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './CartItem.css';

import { removeItem, updateQuantity,clearCart } from './CartSlice';


const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);//cart m data store se aa rha h
  const dispatch = useDispatch();//data bhejne k liye store m

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
  let total = 0;

  cart.forEach(item => {
    total += Number(item.cost)* item.quantity;
  });

  return total;
  };


const handleContinueShopping = (e) => {
//  e.preventDefault();
  console.log("Button clicked"); // 🔥 debug
  onContinueShopping(e); //its parent function which i want to execute on click of btn in child
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
  }

  };

  const handleRemove = (item) => {
 
  dispatch(removeItem(item.name));

  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
      return Number(item.cost) * item.quantity;
  };

  const handleCheckout = () => {

  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  alert("Order placed successfully! 🎉");

  dispatch(clearCart());
};

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1"  onClick={(e) => handleCheckout(e)} >Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


