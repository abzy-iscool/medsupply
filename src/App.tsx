import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Products } from './pages/Products';
import { Cart } from './pages/Cart';
import { Orders } from './pages/Orders';
import { TrackShipment } from './pages/TrackShipment';
import { Checkout } from './pages/Checkout';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { useAuthStore } from './store/AuthStore';
import { AuthPage } from './pages/Auth';

function App() {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) {
    return <AuthPage />;
  }
  
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Routes>
              <Route path="/" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/track" element={<TrackShipment />} />
            </Routes>
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;