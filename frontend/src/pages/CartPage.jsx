import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    setCartItems(storedCart);
  }, []);

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item._id} className="flex items-center justify-between bg-white p-4 rounded-xl shadow">
              <div className="flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-contain" />
                <div>
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-gray-600">Qty: {item.qty}</p>
                  <p className="text-gray-600">Price: ${item.price.toLocaleString()}</p>
                </div>
              </div>
              <button
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                onClick={() => removeFromCart(item._id)}
              >
                Remove
              </button>
            </div>
          ))}
          <h2 className="text-xl font-bold mt-4">Total: ${totalPrice.toLocaleString()}</h2>
          <Link
            to="/checkout"
            className="inline-block mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Buy Now
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
