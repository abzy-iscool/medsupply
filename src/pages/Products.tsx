import React, { useState, useMemo } from 'react';
import { ProductCard } from '../components/ProductCard';
import { SearchBar } from '../components/SearchBar';
import { useCart } from '../context/CartContext';
import type { Product } from '../types';

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Ibuprofen 200mg',
    description: 'Anti-inflammatory medication for pain relief',
    price: 12.99,
    category: 'Pain Relief',
    manufacturer: 'PharmaCorp',
    stock: 500,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '2',
    name: 'Amoxicillin 500mg',
    description: 'Antibiotic for bacterial infections',
    price: 24.99,
    category: 'Antibiotics',
    manufacturer: 'MediLabs',
    stock: 200,
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '3',
    name: 'Omeprazole 20mg',
    description: 'Proton pump inhibitor for acid reflux',
    price: 18.99,
    category: 'Digestive Health',
    manufacturer: 'HealthPharm',
    stock: 350,
    image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '4',
    name: 'Lisinopril 10mg',
    description: 'ACE inhibitor for high blood pressure',
    price: 15.99,
    category: 'Cardiovascular',
    manufacturer: 'CardioMed',
    stock: 400,
    image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '5',
    name: 'Metformin 500mg',
    description: 'Oral diabetes medicine to control blood sugar levels',
    price: 19.99,
    category: 'Diabetes',
    manufacturer: 'DiabeCare',
    stock: 300,
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80&w=800',
  },
];

export function Products() {
  const { dispatch } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [products] = useState<Product[]>(SAMPLE_PRODUCTS);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.manufacturer.toLowerCase().includes(query)
    );
  }, [products, searchQuery]);

  const handleAddToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Featured Products</h1>
        <div className="w-full md:w-96">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by name, category, or manufacturer..."
          />
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No products found matching your search criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
}