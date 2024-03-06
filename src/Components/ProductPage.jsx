import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../Context/CartContext";
import { useParams } from "react-router-dom";
import LoadingAnimation from "../Layout/Loading/LoadingAnimation";
import Warning from "../Layout/Modal/Warning/Warning";

const ProductPage = () => {
  const { id } = useParams();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const { addToCart, updateCartItemQuantity, itemAddedToCart, cartItems } =
    useCart();

  useEffect(() => {
    // Check if the user is logged in
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const [product, setProduct] = useState([]);
  const [description, setDescription] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(null);
  const [loading, setLoading] = useState(true);

  const infoItems = [
    { label: "Category", value: description.category },
    { label: "Age", value: description.age },
    { label: "Gender", value: description.gender },
    { label: "Holiday", value: description.holiday },
    { label: "Skill Development", value: description.skill_development },
    { label: "Play Pattern", value: description.play_pattern },
  ];

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios
        .get(`http://localhost:8000/api/products/${id}`)
        .then((response) => {
          setProduct(response.data.product);
          setDescription(response.data.description);
        })
        .catch((error) => {
          console.error("Error fetching product details:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    const storedRating = localStorage.getItem(`${id}-rating`);
    if (storedRating !== null) {
      setRating(parseInt(storedRating, 10));
    }
  }, [id]);

  const handleRatingChange = (newRating) => {
    if (!isLoggedIn) {
      alert("Please login to rate this product");
      return;
    }
    setRating(newRating);

    localStorage.setItem(`${id}-rating`, newRating);

    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token not found in localStorage");
      return;
    }

    axios
      .post(
        `http://localhost:8000/api/Review/${id}/rating=${newRating}`,
        {
          productId: id,
          rating: newRating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Rating sent to backend successfully");
      })
      .catch((error) => {
        console.error("Error sending rating to backend:", error);
      });
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToBag = () => {
    if (!isLoggedIn) {
      setShowWarningModal(true);
      return;
    }

    const existingCartItem = addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
    });
    setShowSuccessAlert(true);
    // Clear the flag after a certain time (e.g., 5 seconds)
    // setItemAddedToCart(true);
    setTimeout(() => {
      setShowSuccessAlert(false);
      // setItemAddedToCart(false);
      // Reload the page after the success message is displayed
      window.location.reload();
    }, 1000);

    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === product.id
    );

    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].quantity += quantity;
      cartItems[existingItemIndex].rating = rating;
    } else {
      cartItems.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        rating: rating,
      });
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    console.log(`Added ${quantity} item(s) to the bag with rating ${rating}`);

    if (existingCartItem) {
      updateCartItemQuantity(product.id, existingCartItem.quantity + quantity);
    }
  };

  const closeModal = () => {
    setShowWarningModal(false);
  };

  return (
    <>
      {/* Display a success alert */}
      {showSuccessAlert && (
        <div className="bg-green-500 text-white px-4 py-4 rounded-md">
          Item added to the bag successfully!
        </div>
      )}
      <div className="container mx-auto mt-4 mb-8 flex">
        {loading && <LoadingAnimation />}{" "}
        {/* Render loading animation when loading is true */}
        {!loading && (
          <React.Fragment>
            <div className="w-1/2">
              <img
                src={product.image}
                alt="Product"
                className="w-full rounded-lg shadow-lg"
                style={{ maxWidth: "100%", height: "80%" }}
              />
            </div>
            <div className="w-1/2 pl-8">
              <h2 className="text-3xl font-semibold mb-4">{product.name}</h2>
              <p className="text-2xl mb-4">${product.price}</p>
              {product.dynamicRating !== null && isLoggedIn && (
                <p className="text-lg mb-4">Rating: {product.dynamicRating}</p>
              )}
              {isLoggedIn && (
                <div className="flex items-center mb-4">
                  <p className="text-lg mb-2"></p>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRatingChange(star)}
                      className={`text-xl mx-1 ${
                        rating >= star ? "text-yellow-500" : "text-gray-300"
                      }`}
                    >
                      &#9733;
                    </button>
                  ))}
                </div>
              )}
              <div className="flex items-center mb-4">
                <button
                  onClick={handleDecreaseQuantity}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-l"
                >
                  -
                </button>
                <span className="px-4 text-2xl">{quantity}</span>
                <button
                  onClick={handleIncreaseQuantity}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-r"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToBag}
                className={`bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 ${
                  !isLoggedIn ? "cursor-not-allowed" : "hover:bg-blue-600"
                } transition duration-300`}
              >
                Add to Bag
              </button>
              {!isLoggedIn && showWarningModal && (
                <Warning
                  message="Please login to add this product to your bag."
                  onClose={closeModal}
                />
              )}
              <div className="mt-8">
                {/* Dynamic Information Section */}
                <div className="mb-8 bg-gray-100 p-6 rounded-md shadow-lg">
                  <h3 className="text-lg font-extrabold mb-4 text-black">
                    Product Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
                    {infoItems.map((item) => (
                      <div
                        key={item.label}
                        className="flex flex-col items-center p-4 bg-white rounded-md shadow-md
                  hover:bg-gray-200 transition duration-300"
                      >
                        <span className="text-md font-semibold mb-2 text-gray-600">
                          {item.label}
                        </span>
                        <p className="text-sm text-indigo-700">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <h5 className="text-xl mb-4">{product.company}</h5>
                <h3 className="text-2xl font-semibold mb-4">
                  Product Description
                </h3>
                <p className="text-lg text-gray-700">
                  {description.description}
                </p>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    </>
  );
};

export default ProductPage;
