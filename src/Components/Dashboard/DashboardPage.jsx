import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import ConfirmModal from "../Confirm/ConfirmModal";
import Pagination from "../../SideBarWithPagination/Pagination";
import LoadingAnimation from "../../Loading/LoadingAnimation";

const DashboardPage = () => {
  const navigate = useNavigate();

  const [toys, setToys] = useState([]);
  const [selectedToyId, setSelectedToyId] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [toysPerPage] = useState(10); // Set the number of toys per page
  const [loading, setLoading] = useState(true); // Loading state

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
      } finally {
        // Set loading to false after fetching data
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  // Get current toys
  const indexOfLastToy = currentPage * toysPerPage;
  const indexOfFirstToy = indexOfLastToy - toysPerPage;
  const currentToys = toys.slice(indexOfFirstToy, indexOfLastToy);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = (toyId) => {
    setSelectedToyId(toyId);
    setIsConfirmModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      await axios.delete(`http://localhost:8000/api/delete/${selectedToyId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Filter out the deleted toy from the toys state
      setToys((prevToys) => prevToys.filter((toy) => toy.id !== selectedToyId));
      // setIsConfirmModalOpen(false);

      // Log a success message to the console
      console.log(`Toy with ID ${selectedToyId} deleted successfully`);
    } catch (error) {
      console.error(
        `Error deleting toy with ID ${selectedToyId}:`,
        error.response?.data || error.message
      );
    } finally {
      closeConfirmModal();
    }
    navigate("/dashboard-page");
  };

  const closeConfirmModal = () => {
    setSelectedToyId(null);
    setIsConfirmModalOpen(false);
  };

  // Render the LoadingAnimation while data is being fetched
  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Toy Dashboard</h2>
      <Link
        to="/add-toy"
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
          {currentToys.map((toy) => (
            <tr key={toy.id}>
              <td className="border p-2">{toy.name}</td>
              <td className="border p-2">{toy.quantity}</td>
              {/* <td className="border p-2">{toy.age}</td> */}
              <td className="border p-2">{toy.price}</td>
              {/* <td className="border p-2">{toy.category}</td> */}
              <td className="border p-2">
                <img
                  src={toy.image}
                  alt={toy.name}
                  className="w-24 h-24 object-cover"
                />
              </td>
              <td className="border p-2">
                <div className="flex items-center">
                  <Link
                    to={`/edit-toy/${toy.id}`}
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
      <div className="pb-6">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(toys.length / toysPerPage)}
          paginate={paginate}
        />
      </div>
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
