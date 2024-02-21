import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "./CartContext";

const ProductPage = ({ productId }) => {
  const [product, setProduct] = useState({
    id: "your-product-id",
    title: "Product Title",
    price: 99.99,
    company: "Disney",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    imageSrc: "https://via.placeholder.com/400",
    dynamicRating: null,
  });
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(null);

  useEffect(() => {
    // Check if productId is truthy before making the API request
    if (productId) {
      // Fetch product details from the backend
      axios
        .get(`http://localhost:8000/api/product/${productId}`)
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => {
          console.error("Error fetching product details:", error);
        });
    }

    // Fetch user's rating from local storage
    const storedRating = localStorage.getItem(`${productId}-rating`);
    if (storedRating !== null) {
      setRating(parseInt(storedRating, 10));
    }
  }, [productId]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);

    // Save the rating to local storage
    localStorage.setItem(`${productId}-rating`, newRating);

    // Send the rating to the backend using Axios
    axios
      .post(`your-rating-api-endpoint`, {
        productId: productId,
        name: product.title,
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
      name: product.title,
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
        name: product.title,
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
    <div className="container mx-auto mt-8 mb-8 flex">
      <div className="flex flex-col space-y-4 mr-8">
        <img
          src="https://via.placeholder.com/100"
          alt="Product"
          className="w-full rounded-lg shadow-lg"
        />
        <img
          src="https://via.placeholder.com/100"
          alt="Product"
          className="w-full rounded-lg shadow-lg"
        />
        <img
          src="https://via.placeholder.com/100"
          alt="Product"
          className="w-full rounded-lg shadow-lg"
        />
        <img
          src="https://via.placeholder.com/100"
          alt="Product"
          className="w-full rounded-lg shadow-lg"
        />
      </div>
      <div className="w-1/2">
        <img
          src={product.imageSrc}
          alt="Product"
          className="w-full rounded-lg shadow-lg"
        />
      </div>
      <div className="w-1/2 pl-8">
        <h2 className="text-3xl font-semibold mb-4">{product.title}</h2>
        <p className="text-2xl mb-4">${product.price}</p>
        {product.dynamicRating !== null && (
          <p className="text-lg mb-4">
            Dynamic Rating: {product.dynamicRating}
          </p>
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
          <h5 className="text-xl mb-4">{product.company}</h5>
          <h3 className="text-2xl font-semibold mb-4">Product Description</h3>
          <p className="text-lg text-gray-700">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
