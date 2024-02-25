import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import ConfirmModal from "../Confirm/ConfirmModal";

const DashboardPage = () => {
  const [toys, setToys] = useState([]);
  const [selectedToyId, setSelectedToyId] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  useEffect(() => {
    // Fetch toys data from the API when the component mounts
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("adminToken");

        const response = await axios.get("http://localhost:8000/api/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setToys(response.data);
      } catch (error) {
        console.error(
          "Error fetching toys:",
          error.response?.data || error.message
        );
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  const handleDelete = (toyId) => {
    setSelectedToyId(toyId);
    setIsConfirmModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      await axios.delete(`http://localhost:8000/api/products/${selectedToyId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setToys((prevToys) => prevToys.filter((toy) => toy.id !== selectedToyId));
    } catch (error) {
      console.error(
        `Error deleting toy with ID ${selectedToyId}:`,
        error.response?.data || error.message
      );
    } finally {
      setSelectedToyId(null);
      setIsConfirmModalOpen(false);
    }
  };

  const closeConfirmModal = () => {
    setSelectedToyId(null);
    setIsConfirmModalOpen(false);
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Toy Dashboard</h2>
      <Link
        to="/add-product"
        className="flex items-center bg-blue-500 w-40 text-white py-2 px-4 rounded-md mb-4"
      >
        <FaPlus className="mr-2" />
        Add New Toy
      </Link>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">Toy Name</th>
            <th className="border p-2">Quantity</th>
            {/* <th className="border p-2">Age</th> */}
            <th className="border p-2">Price</th>
            {/* <th className="border p-2">Category</th> */}
            <th className="border p-2">Image</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {toys.map((toy) => (
            <tr key={toy.id}>
              <td className="border p-2">{toy.name}</td>
              <td className="border p-2">{toy.quantity}</td>
              <td className="border p-2">{toy.age}</td>
              <td className="border p-2">{toy.price}</td>
              <td className="border p-2">{toy.category}</td>
              <td className="border p-2">
                <img
                  src={toy.imageUrl}
                  alt={toy.name}
                  className="w-16 h-16 object-cover"
                />
              </td>
              <td className="border p-2">
                <div className="flex items-center">
                  <Link
                    to={`/edit-product/${toy.id}`}
                    className="text-green-500 mx-2"
                  >
                    <FaEdit />
                  </Link>
                  <span> | </span>
                  <button
                    className="text-red-500 mx-2"
                    onClick={() => handleDelete(toy.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onConfirm={confirmDelete}
        onClose={closeConfirmModal}
        message="Are you sure you want to delete this toy?"
      />
    </div>
  );
};

export default DashboardPage;
