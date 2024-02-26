import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faMinus,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const ShoppingCart = ({
  cartItems,
  showCart,
  setShowCart,
  handleRemoveItem,
  handleAddItem,
  handleDeleteAllItems,
  handleBuyClick,
  calculateTotalPrice,
}) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white p-6 rounded-md shadow-lg max-w-md w-full">
        <div className="flex justify-end">
          <button
            className="text-2xl cursor-pointer hover:text-gray-600"
            onClick={() => setShowCart(false)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="mb-4 border-b border-gray-300 pb-4 flex items-center"
              >
                {/* Product Image */}
                <img
                  src={item.imageSrc}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded mr-4"
                />
                {/* Product Details */}
                <div className="flex-1">
                  <p className="text-lg font-semibold">{item.name}</p>
                  <p className="text-gray-500">Quantity: {item.quantity}</p>
                  <p className="text-gray-500">${item.price}</p>
                </div>
                {/* Quantity Controls */}
                <div className="flex items-center space-x-2">
                  <button
                    className="text-red-500 hover:text-red-600 transition duration-150 ease-in-out"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    {/* Minus Icon */}
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <button
                    className="text-green-500 hover:text-green-600 transition duration-150 ease-in-out"
                    onClick={() => handleAddItem(item.id)}
                  >
                    {/* Plus Icon */}
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        {cartItems.length > 0 && (
          <div className="flex justify-between mt-4">
            <button
              className="text-red-500 hover:text-red-600 transition duration-150 ease-in-out"
              onClick={handleDeleteAllItems}
            >
              {/* Delete All Icon */}
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <div className="flex items-center">
              <p
                className="text-lg font-semibold"
                style={{ minWidth: "100px" }}
              >
                Total: ${calculateTotalPrice().toFixed(2)}
              </p>
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600 transition duration-150 ease-in-out"
              onClick={handleBuyClick}
            >
              Buy Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
