import React from 'react';
import { ShoppingCart, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export function Navbar() {
  const { state } = useCart();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-blue-600">
              MedSupply
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600">
              Products
            </Link>
            <Link to="/orders" className="text-gray-700 hover:text-blue-600">
              Orders
            </Link>
            <Link to="/track" className="text-gray-700 hover:text-blue-600">
              Track Shipment
            </Link>
            <Link to="/cart" className="relative p-2">
              <ShoppingCart className="h-6 w-6 text-gray-700" />
              {state.items.length > 0 && (
                <span className="absolute top-0 right-0 bg-blue-600 text-white rounded-full h-5 w-5 text-xs flex items-center justify-center">
                  {state.items.length}
                </span>
              )}
            </Link>
          </div>
          
          <div className="md:hidden flex items-center">
            <button className="p-2">
              <Menu className="h-6 w-6 text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}