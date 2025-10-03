import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);
  const [qty, setQty] = useState(1);

  // Reviews
  const [reviews, setReviews] = useState([]);
  const [userName, setUserName] = useState('');
  const [userComment, setUserComment] = useState('');
  const [userRating, setUserRating] = useState(0);

  // Fullscreen image
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Styled messages
  const [cartMessage, setCartMessage] = useState('');
  const [reviewMessage, setReviewMessage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await API.get(`/products/${id}`);
        const discountPercent = Math.floor(Math.random() * 21) + 30; // 30%-50%
        const originalPrice = Math.round(data.price / (1 - discountPercent / 100));
        setProduct({ ...data, originalPrice, discountPercent });
        setReviews(data.reviews || []);

        // Related products (max 10)
        const { data: relatedData } = await API.get(`/products?category=${data.category}`);
        setRelated(relatedData.filter(p => p._id !== id).slice(0, 10));
      } catch (err) {
        alert(err.response?.data?.message || 'Unable to fetch product details.');
      }
    };
    fetchProduct();
  }, [id]);

  // Add product to cart
  const addToCart = () => {
    const storedCart = localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : [];

    const existingIndex = storedCart.findIndex(item => item._id === product._id);
    if (existingIndex >= 0) storedCart[existingIndex].qty += qty;
    else storedCart.push({ ...product, qty });

    localStorage.setItem('cart', JSON.stringify(storedCart));

    // Stylish cart message
    setCartMessage(`"${product.name}" added to your cart`);
    setTimeout(() => setCartMessage(''), 3000);
  };

  const goToCheckout = () => navigate('/checkout');

  // Submit review
  const submitReview = () => {
    if (!userName || !userComment || !userRating) {
      setReviewMessage('⚠️ Please fill all fields and select a rating.');
      setTimeout(() => setReviewMessage(''), 3000);
      return;
    }
    const newReview = { user: userName, comment: userComment, rating: userRating, date: Date.now() };
    setReviews([newReview, ...reviews]);
    setUserName('');
    setUserComment('');
    setUserRating(0);
    setReviewMessage('✅ Your review has been submitted!');
    setTimeout(() => setReviewMessage(''), 3000);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) stars.push(<FaStar key={i} className="text-yellow-500 inline" />);
      else if (rating >= i - 0.5) stars.push(<FaStarHalfAlt key={i} className="text-yellow-500 inline" />);
      else stars.push(<FaRegStar key={i} className="text-yellow-500 inline" />);
    }
    return stars;
  };

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((acc, r) => acc + (r.rating || 0), 0) / reviews.length).toFixed(1)
      : 0;

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8 relative">

      {/* Stylish Cart Message */}
      {cartMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-5 py-3 rounded-lg shadow-xl font-semibold flex items-center gap-2 z-50 animate-bounce transform scale-105">
          <FiShoppingCart className="text-lg" />
          {cartMessage}
        </div>
      )}

      {/* Stylish Review Message */}
      {reviewMessage && (
        <div className="fixed top-20 right-4 bg-blue-500 text-white px-5 py-3 rounded-lg shadow-xl font-semibold flex items-center gap-2 z-50 animate-bounce transform scale-105">
          {reviewMessage}
        </div>
      )}

      {/* Product Image */}
      <div className="border p-4 flex justify-center items-center bg-white rounded shadow relative">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-96 object-contain cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        />
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
            onClick={() => setIsModalOpen(false)}
          >
            <img src={product.image} alt={product.name} className="max-h-full max-w-full" />
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="flex flex-col justify-start">
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

        {/* Ratings */}
        <div className="flex items-center mb-4">
          <div className="flex">{renderStars(averageRating)}</div>
          <span className="ml-2 text-gray-600">{reviews.length} Reviews</span>
        </div>

        {/* Price */}
        <div className="mb-4 flex items-center gap-3">
          <span className="text-2xl font-bold text-green-700">₹{product.price}</span>
          {product.originalPrice && (
            <>
              <span className="line-through text-gray-500">₹{product.originalPrice}</span>
              <span className="bg-red-500 text-white px-2 py-0.5 text-sm rounded">
                {product.discountPercent}% OFF
              </span>
            </>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-700 mb-6">{product.description}</p>

        {/* Quantity */}
        <div className="flex items-center mb-6">
          <label className="mr-2 font-semibold">Quantity:</label>
          <input
            type="number"
            min="1"
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            className="border px-3 py-1 w-20 rounded"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <button
            onClick={addToCart}
            className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all font-semibold shadow-lg transform hover:scale-105"
          >
            <FiShoppingCart className="text-lg" />
            Add to Cart
          </button>
          <button
            onClick={goToCheckout}
            className="flex-1 bg-blue-600 text-white font-semibold py-2 px-6 rounded hover:bg-blue-700 transition shadow-lg transform hover:scale-105"
          >
            Buy Now
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="md:col-span-2 mt-8">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>

        {/* Review Form */}
        <div className="border p-4 rounded mb-6">
          <h3 className="font-semibold mb-2">Write a Review</h3>
          <input
            type="text"
            placeholder="Your Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="border w-full p-2 mb-2 rounded"
          />
          <textarea
            placeholder="Your Comment.."
            value={userComment}
            onChange={(e) => setUserComment(e.target.value)}
            className="border w-full p-2 mb-2 rounded"
          />
          <div className="mb-2 flex items-center gap-2">
            <span>Rating:</span>
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => setUserRating(n)}
                className={n <= userRating ? 'text-yellow-500' : 'text-gray-400'}
              >
                <FaStar />
              </button>
            ))}
          </div>
          <button
            onClick={submitReview}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-semibold shadow-lg"
          >
            Submit Review
          </button>
        </div>

        {/* Display Reviews */}
        <div className="space-y-4">
          {reviews.map((r, i) => (
            <div key={i} className="border p-3 rounded shadow hover:shadow-lg flex gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                {r.user[0]}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold">{r.user}</p>
                  <span className="text-sm text-gray-500">| Verified Purchase</span>
                </div>
                <div className="flex mb-1">{renderStars(r.rating)}</div>
                <p className="text-gray-700">{r.comment}</p>
                <p className="text-xs text-gray-400 mt-1">{new Date(r.date || Date.now()).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Related Products Carousel */}
      {related.length > 0 && (
        <div className="md:col-span-2 mt-12">
          <h2 className="text-2xl font-bold mb-4">You May Also Like</h2>
          <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide snap-x snap-mandatory">
            {related.map((item) => {
              const fakeOriginal = Math.round(item.price / (0.6 + Math.random() * 0.1)); // 30%-50%
              const discountPercent = Math.round(((fakeOriginal - item.price) / fakeOriginal) * 100);

              return (
                <div
                  key={item._id}
                  className="min-w-[200px] border p-3 rounded shadow hover:shadow-lg transform hover:scale-105 transition cursor-pointer snap-start"
                  onClick={() => navigate(`/product/${item._id}`)}
                >
                  <img src={item.image} alt={item.name} className="h-40 w-full object-contain mb-2" />
                  <h3 className="font-semibold text-sm">{item.name}</h3>
                  <p className="text-xs text-gray-500">{item.category}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-green-700 font-bold">₹{item.price}</span>
                    <span className="line-through text-gray-400 text-sm">₹{fakeOriginal}</span>
                    <span className="bg-red-500 text-white px-1 text-xs rounded">{discountPercent}% OFF</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
