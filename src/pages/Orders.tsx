import React from 'react';
import { Package } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function Orders() {
  const { state } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Orders</h1>
      <div className="space-y-6">
        {state.orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-lg font-semibold">Order #{order.id}</h2>
                <p className="text-sm text-gray-600">
                  Placed on {order.createdAt.toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium capitalize">
                  {order.status}
                </span>
              </div>
            </div>
            <div className="border-t border-b border-gray-200 py-4 my-4">
              {order.items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center gap-4 mb-4 last:mb-0"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="font-medium">{item.product.name}</h3>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Total Amount:</p>
                <p className="text-lg font-bold text-blue-600">
                  ${order.totalAmount.toFixed(2)}
                </p>
              </div>
              {order.trackingNumber && (
                <div className="text-right">
                  <p className="text-sm text-gray-600">Tracking Number:</p>
                  <p className="font-medium">{order.trackingNumber}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}