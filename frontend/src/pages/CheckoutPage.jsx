import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import { FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi';

// Simple Toast Component
const Toast = ({ message, type, onClose }) => {
  let bgColor = 'bg-blue-500';
  if (type === 'success') bgColor = 'bg-green-500';
  if (type === 'error') bgColor = 'bg-red-500';
  if (type === 'info') bgColor = 'bg-yellow-500';

  return (
    <div className={`${bgColor} text-white px-4 py-2 rounded shadow-md fixed top-4 right-4 z-50 animate-slide-in`}>
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 font-bold">&times;</button>
      </div>
    </div>
  );
};

const CheckoutPage = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Razorpay');
  const [toast, setToast] = useState(null); // toast state
  const [orderConfirmed, setOrderConfirmed] = useState(false); // show confirmation modal

  const deliveryFee = 20;
  const totalItemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const totalPrice = totalItemsPrice + deliveryFee;

  useEffect(() => {
    const storedCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    setCartItems(storedCart);
  }, []);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const updateQuantity = (id, qty) => {
    const updated = cartItems.map(item =>
      item._id === id ? { ...item, qty: qty > 0 ? qty : 1 } : item
    );
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const removeItem = (id) => {
    const updated = cartItems.filter(item => item._id !== id);
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const handlePlaceOrder = async () => {
    if (!name || !address || !city || !postalCode || !country) {
      return showToast('Please fill in all delivery details.', 'error');
    }
    if (cartItems.length === 0) return showToast('Cart is empty!', 'error');

    const orderItems = cartItems.map(item => ({
      name: item.name,
      qty: item.qty,
      price: item.price,
      product: item._id,
    }));

    try {
      await API.post('/orders', {
        orderItems,
        shippingAddress: { name, address, city, postalCode, country },
        paymentMethod,
        totalPrice,
      });

      setCartItems([]);
      localStorage.removeItem('cart');

      setOrderConfirmed(true); // Show confirmation modal

      if (paymentMethod !== 'Cash on Delivery') {
        showToast('💰 Payment successful & order placed!', 'success');
      } else {
        showToast('💵 Order placed! Pay cash on delivery.', 'info');
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Order placement failed!', 'error');
    }
  };

  const handleRazorpayPayment = async () => {
    try {
      const { data: order } = await API.post('/razorpay/create-order', { totalPrice });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: 'INR',
        name: 'Bhavi mart',
        description: 'Order Payment',
        order_id: order.id,
        handler: function (response) {
          handlePlaceOrder();
        },
        prefill: {
          name,
          email: 'customer@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.log(err);
      if (err.response?.status === 401) {
        showToast('⚠ Not authenticated / No token!', 'error');
      } else {
        showToast('Payment failed!', 'error');
      }
    }
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 grid grid-cols-1 md:grid-cols-3 gap-6 relative">
      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Order Confirmation Modal */}
      {orderConfirmed && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-8 text-center animate-scale-in shadow-lg max-w-sm w-full">
            <h2 className="text-3xl font-bold mb-4 text-green-600">🎉 Order Confirmed!</h2>
            <p className="mb-6 text-gray-700">Your order has been successfully placed.</p>
            <button
              onClick={handleContinueShopping}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}

      {/* Delivery Info */}
      <div className="md:col-span-2 space-y-4">
        <h2 className="text-2xl font-bold mb-2">Delivery Information</h2>
        <div className="space-y-3">
          <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} className="border w-full p-2 rounded" />
          <input type="text" placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} className="border w-full p-2 rounded" />
          <input type="text" placeholder="City" value={city} onChange={e => setCity(e.target.value)} className="border w-full p-2 rounded" />
          <input type="text" placeholder="Postal Code" value={postalCode} onChange={e => setPostalCode(e.target.value)} className="border w-full p-2 rounded" />
          <input type="text" placeholder="Country" value={country} onChange={e => setCountry(e.target.value)} className="border w-full p-2 rounded" />
        </div>

        <div className="border p-4 rounded shadow-md mt-4">
          <h2 className="text-2xl font-bold mb-2">Payment Method</h2>
          <div className="flex flex-col gap-2">
            {['Razorpay', 'Credit Card', 'Debit Card', 'UPI', 'Cash on Delivery'].map(method => (
              <label key={method} className="flex items-center gap-2">
                <input type="radio" name="payment" value={method} checked={paymentMethod === method} onChange={e => setPaymentMethod(e.target.value)} className="form-radio" />
                {method}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="md:col-span-1">
        <div className="sticky top-4 border p-4 rounded shadow bg-white flex flex-col h-[calc(100vh-2rem)]">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

          {cartItems.length === 0 ? (
            <p className="flex-1">Your cart is empty.</p>
          ) : (
            <div className="flex flex-col flex-1 overflow-y-auto space-y-3">
              {cartItems.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">₹{item.price} each</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQuantity(item._id, item.qty - 1)} className="p-1 bg-gray-200 rounded hover:bg-gray-300"><FiMinus /></button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQuantity(item._id, item.qty + 1)} className="p-1 bg-gray-200 rounded hover:bg-gray-300"><FiPlus /></button>
                    <span className="ml-4 font-semibold">₹{item.price * item.qty}</span>
                    <button onClick={() => removeItem(item._id)} className="ml-2 text-red-500 hover:text-red-700"><FiTrash2 /></button>
                  </div>
                </div>
              ))}

              <div className="flex justify-between mt-3 font-semibold">
                <span>Items Total</span>
                <span>₹{totalItemsPrice}</span>
              </div>
              <div className="flex justify-between mt-1 font-semibold">
                <span>Delivery Fee</span>
                <span>₹{deliveryFee}</span>
              </div>
              <div className="flex justify-between mt-1 text-xl font-bold">
                <span>Total</span>
                <span>₹{totalPrice}</span>
              </div>

              {paymentMethod === 'Razorpay' ? (
                <button onClick={handleRazorpayPayment} className="mt-4 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 font-semibold shadow-lg transition transform hover:scale-105">
                  Pay Now
                </button>
              ) : (
                <button onClick={handlePlaceOrder} className="mt-4 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 font-semibold shadow-lg transition transform hover:scale-105">
                  Place Order
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
