import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { FiEdit, FiTrash2, FiChevronDown, FiChevronUp } from "react-icons/fi";

const ProfilePage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    profilePic: "",
    language: "English",
  });

  const [orders, setOrders] = useState([]);
  const [expandedOrders, setExpandedOrders] = useState({});
  const [editing, setEditing] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchUserProfile();
    fetchOrders();
    getCurrentLocation();

    const interval = setInterval(fetchOrders, 30000); // live refresh
    return () => clearInterval(interval);
  }, []);

  const showToast = (msg, type = "info") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchUserProfile = async () => {
    try {
      const { data } = await API.get("/users/profile");
      setUser(prev => ({ ...prev, ...data }));
    } catch (err) {
      console.log(err);
      showToast("Failed to fetch profile", "error");
    }
  };

  const fetchOrders = async () => {
    try {
      const { data } = await API.get("/orders/myorders");
      setOrders(data);
    } catch (err) {
      console.log(err);
      showToast("Failed to fetch orders", "error");
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const currentAddress = `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`;
          setUser(prev => ({ ...prev, address: currentAddress }));
        },
        () => showToast("Could not fetch location", "error")
      );
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setUser(prev => ({ ...prev, profilePic: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    try {
      await API.put("/users/profile", user);
      showToast("Profile updated successfully!", "success");
      setEditing(false);
    } catch (err) {
      console.log(err);
      showToast("Failed to update profile", "error");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const toggleOrder = (orderId) => {
    setExpandedOrders(prev => ({ ...prev, [orderId]: !prev[orderId] }));
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 flex flex-col items-center">
      {toast && (
        <div className={`fixed top-4 right-4 px-4 py-2 rounded shadow-md text-white ${toast.type === "success" ? "bg-green-500" : toast.type === "error" ? "bg-red-500" : "bg-blue-500"}`}>
          {toast.msg}
        </div>
      )}

      <div className="w-full max-w-3xl bg-white rounded-lg shadow p-6 space-y-6">
        {/* Profile Info */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <img
              src={user.profilePic || "https://via.placeholder.com/120"}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border"
            />
            {editing && (
              <input type="file" accept="image/*" onChange={handleProfilePicChange} className="absolute bottom-0 right-0 w-10 h-10 opacity-0 cursor-pointer" />
            )}
          </div>

          {editing ? (
            <div className="flex flex-col gap-2 w-full">
              <input type="text" name="name" value={user.name} onChange={handleProfileChange} placeholder="Full Name" className="border p-2 rounded w-full" />
              <input type="email" name="email" value={user.email} onChange={handleProfileChange} placeholder="Email" className="border p-2 rounded w-full" />
              <input type="text" name="phone" value={user.phone} onChange={handleProfileChange} placeholder="Mobile Number" className="border p-2 rounded w-full" />
            </div>
          ) : (
            <div className="text-center space-y-1">
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-600">{user.phone}</p>
            </div>
          )}

          <div className="flex gap-4 mt-2 justify-center">
            {editing ? (
              <>
                <button onClick={handleSaveProfile} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Save</button>
                <button onClick={() => setEditing(false)} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">Cancel</button>
              </>
            ) : (
              <button onClick={() => setEditing(true)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2">
                <FiEdit /> Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Address */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Saved Address</h3>
          <p className="text-gray-700">{user.address}</p>
        </div>

        {/* Language */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Language</h3>
          <select value={user.language} onChange={handleProfileChange} name="language" className="border p-2 rounded w-full">
            <option>English</option>
            <option>Hindi</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
        </div>

        {/* Confirmed Orders */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Confirmed Orders</h3>
          {orders.length === 0 ? (
            <p className="text-gray-600">No confirmed orders yet.</p>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {orders.map(order => (
                <div key={order._id} className="border rounded shadow-sm bg-gray-50">
                  <button
                    onClick={() => toggleOrder(order._id)}
                    className="w-full flex justify-between items-center p-3 font-semibold text-left bg-gray-100 hover:bg-gray-200"
                  >
                    <span>Order #{order._id.slice(-6)}</span>
                    <span className="flex items-center gap-1">
                      <span className="text-sm text-gray-600 capitalize">{order.status}</span>
                      {expandedOrders[order._id] ? <FiChevronUp /> : <FiChevronDown />}
                    </span>
                  </button>

                  {expandedOrders[order._id] && (
                    <div className="p-3 space-y-2">
                      {order.orderItems.map(item => (
                        <div key={item.product} className="flex justify-between text-gray-700">
                          <span>{item.name} x {item.qty}</span>
                          <span>₹{item.price * item.qty}</span>
                        </div>
                      ))}
                      <div className="flex justify-between font-semibold border-t pt-2">
                        <span>Total</span>
                        <span>₹{order.totalPrice}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Ordered on: {new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* B-Shop Help Center */}
        <div className="border-t pt-4">
          <h3 className="text-xl font-semibold mb-2">B-Shop Help Center</h3>
          <p className="text-gray-600">For assistance, contact us at <a href="mailto:help@bshop.com" className="text-blue-600">help@bshop.com</a> or call +91 99999 99999.</p>
        </div>

        {/* Logout */}
        <div className="flex justify-center mt-4">
          <button onClick={handleLogout} className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
