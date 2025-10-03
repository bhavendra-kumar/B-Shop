import { Routes, Route, Link } from 'react-router-dom';
import { FiShoppingCart, FiUser } from 'react-icons/fi';
import Login from './pages/Login';
import Register from './pages/Register'
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ProductPage from './pages/ProductPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  const totalItems = 0;

  return (
    <div>
      <nav className="bg-white shadow p-4 flex justify-between items-center">
        {/* Attractive App Name */}
        <Link
          to="/home"
          className="text-3xl font-extrabold text-transparent bg-clip-text 
             bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700
             drop-shadow-lg hover:scale-110 hover:drop-shadow-2xl transition-transform duration-300"
        >
          B-Shop
        </Link>

        {/* Icons: Cart & Profile */}
        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative">
            <FiShoppingCart className="text-2xl text-gray-800 hover:text-blue-600 transition-colors" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2">
                {totalItems}
              </span>
            )}
          </Link>
          <Link to="/profile">
            <FiUser className="text-2xl text-gray-800 hover:text-blue-600 transition-colors" />
          </Link>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/profile" element={<ProfilePage />} /> 
      </Routes>
    </div>
  );
}

export default App;
