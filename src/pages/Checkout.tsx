import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export function Checkout() {
  const navigate = useNavigate();
  const { state, dispatch } = useCart();
  const [shippingAddress, setShippingAddress] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: 'PLACE_ORDER', payload: { shippingAddress } });
    navigate('/orders');
  };

  if (state.items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          {state.items.map((item) => (
            <div
              key={item.product.id}
              className="flex items-center py-4 border-b border-gray-200 last:border-0"
            >
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div className="ml-4 flex-1">
                <h3 className="font-medium">{item.product.name}</h3>
                <p className="text-sm text-gray-600">
                  Quantity: {item.quantity} x ${item.product.price}
                </p>
              </div>
              <p className="font-semibold">
                ${(item.product.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
          <div className="mt-4 text-right">
            <p className="text-lg font-bold">
              Total: ${state.total.toFixed(2)}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            <textarea
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              placeholder="Enter your shipping address"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}