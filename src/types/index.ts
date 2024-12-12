export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  manufacturer: string;
  stock: number;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  totalAmount: number;
  shippingAddress: string;
  trackingNumber?: string;
  createdAt: Date;
}