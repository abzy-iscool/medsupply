import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export function Cart() {
  const { state, dispatch } = useCart();

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

  const handleRemoveItem = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  if (state.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Add some products to your cart to get started</p>
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        {state.items.map((item) => (
          <div
            key={item.product.id}
            className="flex items-center py-6 border-b border-gray-200 last:border-0"
          >
            <img
              src={item.product.image}
              alt={item.product.name}
              className="w-24 h-24 object-cover rounded-md"
            />
            <div className="flex-1 ml-6">
              <h3 className="text-lg font-semibold">{item.product.name}</h3>
              <p className="text-gray-600">{item.product.manufacturer}</p>
              <p className="text-blue-600 font-bold mt-2">
                ${(item.product.price * item.quantity).toFixed(2)}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    handleUpdateQuantity(item.product.id, item.quantity - 1)
                  }
                  className="p-1 rounded-md hover:bg-gray-100"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() =>
                    handleUpdateQuantity(item.product.id, item.quantity + 1)
                  }
                  className="p-1 rounded-md hover:bg-gray-100"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button
                onClick={() => handleRemoveItem(item.product.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-md"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
        <div className="mt-8 flex justify-between items-center">
          <div>
            <p className="text-lg font-semibold">Total:</p>
            <p className="text-2xl font-bold text-blue-600">
              ${state.total.toFixed(2)}
            </p>
          </div>
          <Link
            to="/checkout"
            className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}