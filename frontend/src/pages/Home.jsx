import { useEffect, useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { IoCheckmarkCircle } from 'react-icons/io5';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCategoryMobile, setSelectedCategoryMobile] = useState('Mobiles');
  const [toast, setToast] = useState({ show: false, message: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get('/products');
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    let cart = localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : [];
    const existing = cart.find((item) => item._id === product._id);
    if (existing) existing.qty += 1;
    else cart.push({ ...product, qty: 1 });
    localStorage.setItem('cart', JSON.stringify(cart));

    // Show toast
    setToast({ show: true, message: `${product.name} added to cart!` });
    setTimeout(() => setToast({ show: false, message: '' }), 2500);
  };

  const categoriesList = [
    'All',
    'Mobiles',
    'Laptops',
    'Accessories',
    'Console',
    'Fashion',
    'Groceries',
  ];

  const filteredProducts = products.filter((p) => {
    const productCategory = p.category ? p.category.toLowerCase() : '';

    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      productCategory.includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory.toLowerCase() === 'all' ||
      selectedCategoryMobile.toLowerCase() === 'mobiles' ||
      productCategory === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="relative min-h-screen p-6 overflow-hidden bg-white">
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-6 right-6 bg-green-500 text-white px-5 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2 animate-slide-in-out">
          <IoCheckmarkCircle className="text-2xl animate-bounce" />
          <span className="font-semibold">{toast.message}</span>
        </div>
      )}

      {/* Diagonal Light Blue & White Animated Gradient Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-100 via-white to-blue-200 animate-gradient-diagonal"></div>

      {/* Search Bar */}
      <div className="mb-6 flex flex-col items-center gap-4 relative z-10">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md p-3 rounded-xl border border-blue-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Category Filter Buttons */}
        <div className="flex overflow-x-auto gap-3 py-2 px-1 scrollbar-hide">
          {categoriesList.map((cat) => {
            const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-full font-semibold transition-all duration-200
                  ${isActive
                    ? 'bg-blue-400 text-white shadow-md border-2 border-black scale-105'
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-300 hover:text-white hover:scale-105'
                  }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Grid */}
      <div className="relative z-10 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.length === 0 && (
            <p className="text-center col-span-full text-gray-500">No products found.</p>
          )}
          {filteredProducts.map((p) => {
            const hasDiscount = Math.random() > 0.5;
            const discount = hasDiscount ? [10, 20, 30, 40][Math.floor(Math.random() * 4)] : 0;
            const discountedPrice = hasDiscount ? Math.round(p.price * (1 - discount / 100)) : p.price;

            return (
              <div
                key={p._id}
                className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 flex flex-col border-2 border-black hover:-translate-y-2 hover:shadow-lg animate-float cursor-pointer"
                onClick={() => navigate(`/product/${p._id}`)}
              >
                <div className="relative overflow-hidden h-60">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-contain transition-transform duration-300 transform hover:scale-105"
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-lg font-semibold mb-1 text-gray-900">{p.name}</h2>
                  <p className="text-gray-600 mb-1 text-sm">{p.category || 'know more...'}</p>

                  {/* Price and discount */}
                  <div className="mb-4 flex items-center gap-2 relative">
                    <span className={`text-gray-800 font-bold ${hasDiscount ? 'line-through text-sm' : ''}`}>
                      ${p.price.toLocaleString()}
                    </span>
                    {hasDiscount && (
                      <span className="text-gray-900 font-bold">${discountedPrice.toLocaleString()}</span>
                    )}
                    {hasDiscount && (
                      <span className="absolute -top-3 right-0 bg-red-500 text-white text-xs font-bold px-2 py-0.5 shadow-lg">
                        {discount}% OFF
                      </span>
                    )}
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-between mt-auto gap-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); addToCart(p); }}
                      className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all font-semibold shadow-lg transform hover:scale-105"
                    >
                      <FiShoppingCart className="text-lg" />
                      Add to Cart
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); navigate(`/product/${p._id}`); }}
                      className="flex-1 text-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all font-semibold shadow-lg transform hover:scale-105"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tailwind Custom Animations */}
      <style>
        {`
          @keyframes gradient-diagonal {
            0%, 100% {background-position: 0% 0%;}
            50% {background-position: 100% 100%;}
          }
          .animate-gradient-diagonal {
            background-size: 200% 200%;
            animation: gradient-diagonal 15s ease infinite;
          }

          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }

          @keyframes slide-in-out {
            0% { opacity: 0; transform: translateX(50px); }
            10% { opacity: 1; transform: translateX(0); }
            90% { opacity: 1; transform: translateX(0); }
            100% { opacity: 0; transform: translateX(50px); }
          }
          .animate-slide-in-out {
            animation: slide-in-out 2.5s ease forwards;
          }

          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-4px); }
          }
          .animate-bounce {
            animation: bounce 0.7s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Home;
