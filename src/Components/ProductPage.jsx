import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "./CartContext";
import { useParams } from "react-router-dom";

const ProductPage = () => {
  const { id } = useParams();

  const [product, setProduct] = useState([]);
  const [description, setDescription] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(null);

  const infoItems = [
    { label: "Category", value: description.category },
    { label: "Age", value: description.age },
    { label: "Gender", value: description.gender },
    { label: "Holiday", value: description.holiday },
    { label: "Skill Development", value: description.skill_development },
    { label: "Play Pattern", value: description.play_pattern },
  ];

  console.log("ProductPage.js: id:", product.id);
  useEffect(() => {
    // Check if id is truthy before making the API request
    if (id) {
      // Fetch product details from the backend
      axios
        .get(`http://localhost:8000/api/products/${id}`)
        .then((response) => {
          console.log("Product data:", response.data);
          setProduct(response.data.product);
          setDescription(response.data.description);
        })
        .catch((error) => {
          console.error("Error fetching product details:", error);
        });
    }

    // Fetch user's rating from local storage
    const storedRating = localStorage.getItem(`${id}-rating`);
    if (storedRating !== null) {
      setRating(parseInt(storedRating, 10));
    }
  }, [id]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);

    // Save the rating to local storage
    localStorage.setItem(`${id}-rating`, newRating);

    // Send the rating to the backend using Axios
    axios
      .post(`your-rating-api-endpoint`, {
        productId: id,
        name: product.name,
        rating: newRating,
      })
      .then((response) => {
        console.log("Rating sent to backend successfully");
      })
      .catch((error) => {
        console.error("Error sending rating to backend:", error);
      });
  };

  const { addToCart, updateCartItemQuantity } = useCart();

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToBag = () => {
    const existingCartItem = addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      rating: rating,
    });

    // Save the cart items to local storage
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === product.id
    );

    if (existingItemIndex !== -1) {
      // If the product is already in the cart, update the quantity and rating
      cartItems[existingItemIndex].quantity += quantity;
      cartItems[existingItemIndex].rating = rating;
    } else {
      // Otherwise, add a new item to the cart
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

    // If the product is already in the cart, update the quantity in the UI
    if (existingCartItem) {
      updateCartItemQuantity(product.id, existingCartItem.quantity + quantity);
    }
  };

  return (
    <div className="container mx-auto mt-4 mb-8 flex">
      <div className="w-1/2">
        <img
          src={product.image}
          alt="Product"
          className="w-full rounded-lg shadow-lg"
          style={{ maxWidth: "100%", height: "95%" }}
        />
      </div>
      <div className="w-1/2 pl-8">
        <h2 className="text-3xl font-semibold mb-4">{product.name}</h2>
        <p className="text-2xl mb-4">${product.price}</p>
        {product.dynamicRating !== null && (
          <p className="text-lg mb-4">Rating: {product.dynamicRating}</p>
        )}
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
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Add to Bag
        </button>
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
          <h3 className="text-2xl font-semibold mb-4">Product Description</h3>
          <p className="text-lg text-gray-700">{description.description}</p>
          {console.log("ProductPage.js: id:", product)}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
